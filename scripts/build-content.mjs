#!/usr/bin/env node
// 把 AI动态 日报 Markdown 拆成 Hugo 内容：每条动态一篇 post，整份日报一篇 edition。
// 零依赖，只读 ../AI动态/AI动态-*.md，写 content/ 与 data/。
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.env.DIGEST_SRC || join(ROOT, "..", "AI动态");
const OUT_POSTS = join(ROOT, "content", "posts");
const OUT_EDITIONS = join(ROOT, "content", "editions");

const DIRECTIONS = [
  { key: "AI coding", label: "AI coding", desc: "编码模型、IDE/CLI 工具链、代码代理与工程实践" },
  { key: "Agent", label: "Agent", desc: "智能体产品、编排框架、计算机使用与治理" },
  { key: "AIOS", label: "AIOS", desc: "系统级运行时、端侧模型、沙箱与模型服务" },
  { key: "AI Audio", label: "AI Audio", desc: "TTS、ASR、语音对话与音频理解" },
  { key: "AI Multimedia", label: "AI Multimedia", desc: "图像、视频、世界模型与多模态生成" },
  { key: "泛AI", label: "泛AI", desc: "模型发布、开源权重、芯片算力、融资并购、监管政策与科研" },
];
const DIRECTION_KEYS = DIRECTIONS.map((d) => d.key);

const ENTITY_PATTERNS = JSON.parse(
  readFileSync(join(ROOT, "data", "entities.json"), "utf8"),
).map((e) => ({ ...e, re: e.patterns.map((p) => new RegExp(p, "i")) }));

const ENTRY_HEADING = /^(#{2,3})\s+(\d+)\s*[.、]\s*(.+)$/;

function readSources() {
  return readdirSync(SRC)
    .filter((f) => /^AI动态-2026-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .map((f) => ({ file: f, date: f.match(/(\d{4}-\d{2}-\d{2})/)[1] }));
}

function stripBom(s) {
  return s.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

/** 抓取字段：优先「发生了什么」「为什么值得关注」，兼容三种日报排版 */
function pickField(body, name) {
  const re = new RegExp(`\\*\\*${name}[:：]?\\*\\*[:：]?\\s*([\\s\\S]*?)(?=\\n\\s*(?:\\*\\*(?:发生了什么|为什么值得关注|方向|日期|来源)|来源[:：]|方向标签[:：])|$)`, "m");
  const m = body.match(re);
  if (!m) return "";
  return m[1].replace(/^[:：]\s*/, "").trim();
}

function pickMetaLine(body) {
  // 兼容 `**方向：** X | **日期：** Y`、`- **方向**：X | **日期**：Y`、`方向标签：X｜日期：Y`
  const m =
    body.match(/\*\*方向\s*[:：]?\*\*\s*[:：]?\s*([^\n]*)/) ||
    body.match(/方向标签\s*[:：]\s*([^\n]*)/);
  if (!m) return "";
  const line = m[1].replace(/^-+\s*/, "");
  const after = body.slice(body.indexOf(m[0]) + m[0].length);
  const tail = after.match(/^([^\n]*)/);
  return `${line}${tail ? tail[1] : ""}`.trim();
}

function parseDate(text) {
  const full = text.match(/(20\d{2})-(\d{2})-(\d{2})/);
  if (full) return full[0];
  const short = text.match(/(\d{1,2})-(\d{1,2})(?!\d)/);
  if (short) return `2026-${short[1].padStart(2, "0")}-${short[2].padStart(2, "0")}`;
  return "";
}

function splitDateRange(text) {
  // 只取「日期」标记之后的片段，避免把「关联台账 2026-09-18」这类引用日期当事件日期
  const idx = text.lastIndexOf("日期");
  const seg = idx >= 0 ? text.slice(idx) : text;
  const dates = [...seg.matchAll(/20\d{2}-\d{2}-\d{2}|\d{1,2}-\d{1,2}(?!\d)/g)].map((m) => parseDate(m[0]));
  return dates.filter(Boolean);
}

function parseDirections(raw) {
  const cleaned = raw.replace(/\*\*/g, "").replace(/[|｜].*$/g, "").replace(/\s+/g, "");
  const subs = [];
  for (const m of cleaned.matchAll(/[（(]([^）)]+)[）)]/g)) {
    subs.push(...m[1].split(/[\/、,]/).map((s) => s.trim()).filter(Boolean));
  }
  const keepSub = (s) => !/关联台账|补录|后续进展|纠正|GA\b|预览/.test(s) && !/20\d{2}-\d{2}|\d{1,2}-\d{1,2}/.test(s);
  const bare = cleaned.replace(/[（(][^）)]*[）)]/g, "").replace(/[,，]/g, "/");
  const tags = new Set();
  for (const token of bare.split("/")) {
    const t = token.trim();
    if (!t) continue;
    const key = DIRECTION_KEYS.find((k) => {
      const kk = k.toLowerCase().replace(/\s/g, "");
      return t.toLowerCase().startsWith(kk);
    });
    if (key) tags.add(key);
    else if (/^[A-Za-z]/.test(t)) tags.add(t);
  }
  const ordered = DIRECTION_KEYS.filter((k) => tags.has(k));
  const extras = [...tags].filter((t) => !ordered.includes(t));
  return { tags: [...ordered, ...extras], subs: [...new Set(subs.filter(keepSub))] };
}

function parseLinks(text) {
  const out = [];
  for (const m of text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)) {
    out.push({ title: m[1].trim(), url: m[2].trim() });
  }
  return out;
}

function sourceSection(body) {
  const m = body.match(/(?:\*\*来源\s*[:：]?\*\*|来源\s*[:：])\s*([\s\S]*?)(?=\n\s*(?:\*?\*|方向标签|$)|\n\n)/m);
  return m ? m[1] : "";
}

function detectEntities(title, body) {
  const inTitle = [];
  const inBody = [];
  for (const e of ENTITY_PATTERNS) {
    if (e.re.some((re) => re.test(title))) inTitle.push(e.label);
    else if (e.re.some((re) => re.test(body))) inBody.push(e.label);
  }
  return [...new Set([...inTitle, ...inBody])].slice(0, 4);
}

function slugify(title, edition, idx) {
  const latin = (title.match(/[A-Za-z][A-Za-z0-9+._-]{1,}|(?:GPT|Claude|Gemini|Copilot|NVIDIA|Muse|Ming|Kling|Whirlpo)/gi) || [])
    .map((s) => s.toLowerCase().replace(/^[.-]+|[.-]+$/g, ""))
    .filter((s) => s.length > 1 && !["https", "http"].includes(s))
    .slice(0, 5);
  const base = latin.join("-").slice(0, 48) || "entry";
  return `${edition}-e${String(idx).padStart(2, "0")}-${base}`;
}

function yamlQuote(s) {
  return JSON.stringify(String(s).replace(/\u3000/g, " ").trim());
}

// \u5217\u8868\u4e0e\u641c\u7d22\u7528\u7684\u6458\u8981\uff1a\u53d6\u300c\u53d1\u751f\u4e86\u4ec0\u4e48\u300d\u7684\u5f00\u5934\u5e76\u6309\u53e5\u8bfb\u6536\u5c3e\uff0c\u4e0d\u62ff\u6807\u9898\u91cd\u590d\u4e00\u904d
function leadOf(src, limit = 96) {
  const clean = String(src || "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return "";
  if (clean.length <= limit) return clean;
  const head = clean.slice(0, limit);
  const stops = [...head.matchAll(/[\u3002\uff01\uff1f\uff1b;]/g)];
  const last = stops[stops.length - 1];
  if (last && last.index >= Math.floor(limit * 0.5)) return head.slice(0, last.index + 1);
  return head.replace(/[,\uff0c\u3001:\uff1a\s]+$/, "") + "\u2026";
}

function frontMatter(p) {
  const lines = [
    "---",
    `title: ${yamlQuote(p.title)}`,
    `date: ${p.date}T09:00:00+08:00`,
    `slug: ${p.slug}`,
    `tags: [${p.tags.map(yamlQuote).join(", ")}]`,
    `categories: [${p.subs.map(yamlQuote).join(", ")}]`,
    `entities: [${p.entities.map(yamlQuote).join(", ")}]`,
    "summary: " + yamlQuote(leadOf(p.happened)),
    "weight: " + p.weight,
    "params:",
    "  kind: entry",
    `  eventDate: ${yamlQuote(p.eventDate)}`,
    `  edition: ${yamlQuote(p.edition)}`,
    `  entryNo: ${p.indexNo}`,
    "  flags: [" + p.flags.map(yamlQuote).join(", ") + "]",
    "  sources:",
    ...p.sources.map((s) => `    - { title: ${yamlQuote(s.title)}, url: ${yamlQuote(s.url)} }`),
    "---",
    "",
  ];
  return lines.join("\n");
}

function entryBody(p) {
  const parts = [];
  parts.push(`## 发生了什么\n\n${p.happened}\n`);
  if (p.why) parts.push(`## 为什么值得关注\n\n${p.why}\n`);
  if (p.sources.length) {
    parts.push("## 来源\n\n" + p.sources.map((s) => `- [${s.title}](${s.url})`).join("\n") + "\n");
  }
  const meta = [
    `方向：${p.directions.map((d) => d.label).join(" / ")}`,
    p.subs.length ? `细分：${p.subs.join("、")}` : "",
    `事件日期：${p.eventDate}`,
    p.entities.length ? `涉及主体：${p.entities.join("、")}` : "",
    p.flags.length ? `标记：${p.flags.join("、")}` : "",
    `收录于：[${p.edition} 日报]({{< ref "/editions/${p.edition}.md" >}})`,
  ].filter(Boolean);
  parts.push("<!--meta-->\n\n" + meta.join(" ｜ ") + "\n");
  return parts.join("\n");
}

function cleanMd(dir) {
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".md"))) {
    for (let i = 0; i < 3; i++) {
      try {
        rmSync(join(dir, f));
        break;
      } catch (e) {
        if (i === 2) throw e;
        const t = Date.now() + 300;
        while (Date.now() < t) {}
      }
    }
  }
}

/** 各期日报写窗口的方式不统一（统计窗口/时间窗口/检索时间窗口/正文叙述），逐一兜底 */
function pickWindow(raw) {
  const marked = raw.match(/窗口\*{0,2}\s*[:：]\s*([^\n]+)/);
  if (marked) return marked[1].trim();
  const prose = raw.match(/本期?窗口[^\n。]{4,160}[。]?/);
  if (prose) return prose[0].trim();
  return "";
}

function writeSectionIndex(dir, meta, body) {
  writeFileSync(join(dir, "_index.md"), `---\n${meta.join("\n")}\n---\n\n${body}\n`, "utf8");
}

function build() {
  for (const dir of [OUT_POSTS, OUT_EDITIONS]) cleanMd(dir);
  // cleanMd 会连栏目页一起清掉，所以每次重建后重新写入
  writeSectionIndex(
    OUT_POSTS,
    ['title: "动态条目"', 'description: "按条目切分的 AI 领域动态，每条一个独立页面，可用方向、主体、期次回溯。"'],
    "每条动态一个页面：发生了什么、为什么值得关注、来源，以及所属期次与方向标签。",
  );
  writeSectionIndex(
    OUT_EDITIONS,
    ['title: "每日日报"', 'description: "逐日成稿的 AI 领域当日重要动态，含本期要点与各方向小结。"'],
    "完整成稿按日归档，保留统计窗口与排除说明；条目级页面见「动态库」。",
  );
  const files = readSources();
  const posts = [];
  const editions = [];

  for (const { file, date: editionDate } of files) {
    const raw = stripBom(readFileSync(join(SRC, file), "utf8"));
    const lines = raw.split("\n");

    // 日报整篇 → edition
    const editionTitle = (raw.match(/^#\s+(.+)$/m) || [, `AI 领域当日重要动态（${editionDate}）`])[1];
    const editionBody = raw.replace(/^#\s+.+$/m, "").trim();
    const takeaways = [...raw.matchAll(/^- \*\*(.+?)\*\*：(.+)$/gm)].map((m) => ({ dir: m[1], text: m[2].trim() }));
    const windowLine = pickWindow(raw);
    const editionSlug = editionDate;

    // 拆分逐条 entry
    const blocks = [];
    let cur = null;
    for (const line of lines) {
      const m = line.match(ENTRY_HEADING);
      if (m) {
        cur = { index: Number(m[2]), title: m[3].trim(), body: [] };
        blocks.push(cur);
      } else if (cur) {
        if (/^(#{2,3})\s+(本期要点|各方向小结)/.test(line)) {
          cur = null;
          continue;
        }
        cur.body.push(line);
      }
    }

    for (const blk of blocks) {
      const body = blk.body.join("\n");
      let happened = pickField(body, "发生了什么");
      let why = pickField(body, "为什么值得关注");
      const metaLine = pickMetaLine(body);
      const dirs = parseDirections(metaLine);
      const eventDates = splitDateRange(metaLine);
      const eventDate = eventDates[0] || parseDate(blk.title) || editionDate;
      const sources = parseLinks(sourceSection(body));
      const flags = [];
      if (/补录/.test(blk.title + metaLine + body)) flags.push("补录");
      if (/后续进展/.test(blk.title + metaLine)) flags.push("后续进展");
      if (/纠正/.test(blk.title)) flags.push("纠正");
      if (!dirs.tags.length) dirs.tags = ["泛AI"];

      const title = blk.title.replace(/\s+/g, " ").trim();
      const p = {
        title,
        happened,
        why,
        tags: [...dirs.tags],
        directions: dirs.tags.map((label) => DIRECTIONS.find((d) => d.label === label) || { label }),
        subs: dirs.subs,
        entities: detectEntities(title, `${happened} ${why}`),
        sources,
        eventDate,
        date: eventDate || editionDate,
        edition: editionDate,
        flags,
        indexNo: blk.index,
        weight: 1000 - blk.index,
        slug: slugify(title, editionDate, blk.index),
      };
      if (!p.happened) {
        console.warn(`[skip] ${editionDate} #${blk.index} 缺「发生了什么」`);
        continue;
      }
      writeFileSync(join(OUT_POSTS, `${p.slug}.md`), frontMatter(p) + "\n" + entryBody(p), "utf8");
      posts.push(p);
    }

    const entryCount = posts.filter((p) => p.edition === editionDate).length;
    writeFileSync(
      join(OUT_EDITIONS, `${editionSlug}.md`),
      [
        "---",
        `title: ${yamlQuote(`日报 ${editionDate}｜${entryCount} 条`)}`,
        `date: ${editionDate}T09:30:00+08:00`,
        `slug: ${editionSlug}`,
        "layout: edition",
        `tags: ${JSON.stringify(["日报"])}`,
        "summary: " + yamlQuote(`窗口 ${windowLine || editionDate}`),
        "params:",
        "  kind: edition",
        `  edition: ${yamlQuote(editionDate)}`,
        `  entryCount: ${entryCount}`,
        `  window: ${yamlQuote(windowLine)}`,
        "  directionNotes:",
        ...takeaways.map((t) => `    - { dir: ${yamlQuote(t.dir)}, text: ${yamlQuote(t.text)}, short: ${yamlQuote(leadOf(t.text, 80))} }`),
        "---",
        "",
        "本页面是当日完整成稿。逐条独立页面见「动态库」，每条页面可用「收录于」反查本期。",
        "",
        editionBody,
        "",
      ].join("\n"),
      "utf8",
    );
    editions.push({ date: editionDate, count: entryCount, window: windowLine });
  }

  const dup = {};
  for (const p of posts) dup[p.slug] = (dup[p.slug] || 0) + 1;
  const collisions = Object.entries(dup).filter(([, n]) => n > 1);

  mkdirSync(join(ROOT, "data"), { recursive: true });
  writeFileSync(
    join(ROOT, "data", "digest-index.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString().slice(0, 10),
        directions: DIRECTIONS,
        editions,
        entries: posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          date: p.eventDate,
          edition: p.edition,
          tags: p.tags,
          subs: p.subs,
          entities: p.entities,
          flags: p.flags,
          sources: p.sources.length,
          happened: p.happened.slice(0, 120),
        })),
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  mkdirSync(join(ROOT, "static", "data"), { recursive: true });
  writeFileSync(
    join(ROOT, "static", "data", "search-index.json"),
    JSON.stringify(
      posts.map((p) => ({
        t: p.title,
        u: `posts/${p.slug}/`,
        d: p.eventDate,
        e: p.edition,
        g: p.tags,
        c: p.subs,
        n: p.entities,
        f: p.flags,
        x: [p.happened, p.why].join(" "),
      })),
    ) + "\n",
    "utf8",
  );

  console.log(`editions=${editions.length} entries=${posts.length} collisions=${collisions.length}`);
  if (collisions.length) console.log(collisions);
  const byTag = {};
  for (const p of posts) for (const t of p.tags) byTag[t] = (byTag[t] || 0) + 1;
  console.log(byTag);
}

build();
