#!/usr/bin/env node
// 构建前门禁：校验内容一致性、链接完整性与仓库安全（不含任何密钥文件）。
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIRS = ["AI coding", "Agent", "AIOS", "AI Audio", "AI Multimedia", "泛AI"];
const problems = [];
const info = [];

function read(p) {
  return readFileSync(join(ROOT, p), "utf8");
}

function listFiles(dir) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];
  // _index.md 是栏目页，不计入条目/期次数量
  return readdirSync(abs).filter((f) => f.endsWith(".md") && f !== "_index.md");
}

function walk(dir, out = []) {
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = join(dir, name);
    if (statSync(join(ROOT, rel)).isDirectory()) walk(rel, out);
    else out.push(rel.replace(/\\/g, "/"));
  }
  return out;
}

const cfg = read("hugo.yaml");

// 1. baseURL 必须是 https 且以 / 结尾
const base = (cfg.match(/^baseURL:\s*["']?([^"'\n]+)["']?/m) || [, ""])[1];
if (!/^https:\/\//.test(base) || !base.endsWith("/")) problems.push(`hugo.yaml baseURL 异常：${base || "(缺失)"}`);
else info.push(`baseURL=${base}`);

// 2. 主题存在且为子模块
if (!existsSync(join(ROOT, "themes/PaperMod/theme.toml"))) problems.push("themes/PaperMod 缺失（需 git submodule）");
if (!/themes\/PaperMod/.test(read(".gitmodules"))) problems.push(".gitmodules 未登记 themes/PaperMod");

// 3. 内容数量一致性：posts 目录 == digest-index.json == 各期 entryCount 之和
const postFiles = listFiles("content/posts").filter((f) => !f.startsWith("_"));
const editionFiles = listFiles("content/editions").filter((f) => !f.startsWith("_"));
const index = JSON.parse(read("data/digest-index.json"));
if (postFiles.length !== index.entries.length) problems.push(`posts 文件数 ${postFiles.length} != digest-index ${index.entries.length}`);
const declaredTotal = index.editions.reduce((a, e) => a + e.count, 0);
info.push(`editions=${editionFiles.length} posts=${postFiles.length} indexEntries=${index.entries.length} 日报声明条目=${declaredTotal}`);
if (editionFiles.length !== index.editions.length) problems.push(`editions 文件数 ${editionFiles.length} != index ${index.editions.length}`);

// 4. 逐篇 front matter 校验
const entityLabels = new Set(JSON.parse(read("data/entities.json")).map((e) => e.label));
const editionBases = new Set(editionFiles.map((f) => f.replace(/\.md$/, "")));
let checkedEntries = 0;
for (const f of postFiles) {
  const txt = read(join("content/posts", f));
  const fm = txt.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) { problems.push(`${f}: 缺 front matter`); continue; }
  const head = fm[1];
  const body = txt.slice(fm[0].length);
  const g = (re) => (head.match(re) || [, ""])[1];
  const title = g(/^title:\s*(.+)$/m);
  if (!title) problems.push(`${f}: 缺 title`);
  if (!/^\s+eventDate: "20\d\d-\d\d-\d\d"$/m.test(head.trim())) problems.push(`${f}: eventDate 缺失或格式错`);
  const tagsLine = g(/^tags:\s*\[(.*)\]$/m);
  const tags = tagsLine ? tagsLine.split('", "').map((s) => s.replace(/^"|"$/g, "")) : [];
  if (!tags.length) problems.push(`${f}: tags 为空`);
  for (const t of tags) if (!DIRS.includes(t)) problems.push(`${f}: 未知方向标签 "${t}"`);
  if (!/## 发生了什么/.test(body)) problems.push(`${f}: 缺「发生了什么」`);
  if (!/## 来源/.test(body)) problems.push(`${f}: 缺「来源」`);
  if (!/^    - \{ title:/m.test(head)) problems.push(`${f}: params.sources 为空`);
  const ed = g(/^  edition: "(.*)"/m);
  if (!editionBases.has(ed)) problems.push(`${f}: 引用了不存在的期次 ${ed}`);
  if (!body.includes(`ref "/editions/${ed}.md"`)) problems.push(`${f}: 正文缺本期 ref 链接`);
  const ents = (g(/^entities:\s*\[(.*)\]$/m) || "").split('", "').map((s) => s.replace(/^"|"$/g, "")).filter(Boolean);
  for (const e of ents) if (!entityLabels.has(e)) problems.push(`${f}: 主体 "${e}" 不在 data/entities.json`);
  checkedEntries++;
}
info.push(`已校验条目 ${checkedEntries} 篇`);

// 5. 期次页：窗口口径与条目数一致
for (const f of editionFiles) {
  const txt = read(join("content/editions", f));
  const declared = Number((txt.match(/^  entryCount: (\d+)$/m) || [, "0"])[1]);
  const base = f.replace(/\.md$/, "");
  const actual = postFiles.filter((p) => p.startsWith(base + "-e")).length;
  if (declared !== actual) problems.push(`${f}: 声明 ${declared} 条，实际 ${actual} 篇（命名 ${base}-eNN）`);
  if (!/窗口/.test(txt) && !/^  window: ".+"/m.test(txt)) problems.push(`${f}: 未写明时间窗口`);
  // 期次页的 params.edition 被条目页「收录期次」与动态库期次下拉依赖，必须是带引号的日期串
  const editionParam = (txt.match(/^  edition: (.+)$/m) || [, ""])[1].replace(/^"|"$/g, "");
  if (editionParam !== base) problems.push(`${f}: params.edition 应为 "${base}"，实际 ${editionParam || "缺失"}`);
}

// 6. 菜单指向的页面都存在
const TAXONOMY_ROUTES = { tags: "tag", categories: "category", entities: "entity" };
const menuTargets = [...cfg.matchAll(/url:\s*"\/([^"]*)"/g)].map((m) => m[1].replace(/\/+$/, ""));
for (const t of menuTargets) {
  if (TAXONOMY_ROUTES[t]) {
    if (!new RegExp(`^  ${TAXONOMY_ROUTES[t]}: ${t}$`, "m").test(cfg)) problems.push(`菜单 /${t}/ 的分类法未在 hugo.yaml 注册为 ${TAXONOMY_ROUTES[t]}: ${t}`);
  } else if (["", "posts", "editions"].includes(t)) {
    if (t && !existsSync(join(ROOT, "content", t, "_index.md"))) problems.push(`菜单 /${t}/ 缺 content/${t}/_index.md`);
  } else if (!existsSync(join(ROOT, "content", `${t}.md`)) && !existsSync(join(ROOT, "content", t))) {
    problems.push(`菜单 /${t}/ 无对应内容页`);
  }
}

// 7. 仓库内不得有密钥/环境文件；主题子模块除外
const offenders = walk("content").concat(walk("static"), walk("assets"), walk("scripts"), walk("data"), walk("layouts")).filter((p) =>
  /(^|\/)\.env|\.key$|\.pem$|id_rsa|secret(s)?\.json$|token/i.test(p),
);
if (offenders.length) problems.push(`发现疑似敏感文件：${offenders.join(", ")}`);

// 8. 日报窗口连续性：凡是写成「X 09:00 ～ Y 09:00」的期次，后一期起点须等于前一期终点
const windows = index.editions.map((e) => {
  const m = (e.window || "").match(/(20\d\d-\d\d-\d\d)\s*09:00\s*[～~]\s*(20\d\d-\d\d-\d\d)\s*09:00/);
  return m ? { date: e.date, from: m[1], to: m[2] } : null;
});
const strict = windows.filter(Boolean);
if (!index.editions.some((e) => e.window)) problems.push("没有任何一期日报写出时间窗口");
if (strict.length >= 2) info.push(`严格窗口口径期次 ${strict.length} 期，连续性已校验`);
if (strict.length < index.editions.length) {
  info.push(`另有 ${index.editions.length - strict.length} 期使用叙述式窗口（早期日报），只做存在性校验`);
}
for (let i = 1; i < strict.length; i++) {
  if (strict[i].from !== strict[i - 1].to) problems.push(`窗口空档：${strict[i - 1].date} 止于 ${strict[i - 1].to}，${strict[i].date} 起于 ${strict[i].from}`);
}

console.log(info.map((s) => `  · ${s}`).join("\n"));
if (problems.length) {
  console.error(`\n✗ 校验失败 ${problems.length} 项：\n` + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log(`\n✓ 全部校验通过（${checkedEntries} 条动态 / ${editionFiles.length} 期日报）`);
