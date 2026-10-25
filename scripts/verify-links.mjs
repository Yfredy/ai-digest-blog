#!/usr/bin/env node
// 链接门禁：把导出产物里每个站内链接解析成真实文件，缺一处即报警。
// Qoder Sites 托管在域名根路径且不做目录 index 回退，/tags/x/ 这类「目录式」链接必须能落成具体文件。
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const OUT = resolve(process.argv[2] || "dist");

function walk(dir, base = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const rel = base ? `${base}/${name}` : name;
    if (statSync(join(dir, name)).isDirectory()) out.push(...walk(join(dir, name), rel));
    else out.push(rel);
  }
  return out;
}

if (!existsSync(OUT)) {
  console.error(`✗ 导出目录不存在：${OUT}`);
  process.exit(1);
}

const files = new Set(walk(OUT));
const html = [...files].filter((f) => f.endsWith(".html"));
const needed = new Map();

function remember(pageRef, raw) {
  if (!raw || /^(?:[a-z]+:|\/\/|#|mailto:|tel:|data:)/i.test(raw)) return;
  let pathPart;
  try {
    pathPart = new URL(raw, "http://x.invalid").pathname;
  } catch {
    return;
  }
  if (/^\/(?:ai-digest-blog|localhost|127\.0\.0\.1)/.test(pathPart)) {
    needed.set(`${pageRef} → ${raw}`, `绝对子路径未根化：${raw}`);
    return;
  }
  let decoded;
  try {
    decoded = decodeURIComponent(pathPart);
  } catch {
    needed.set(`${pageRef} → ${raw}`, "路径无法解码");
    return;
  }
  const rel = decoded.startsWith("/")
    ? decoded.replace(/^\/+/, "")
    : join(dirname(pageRef), decoded).replace(/\\/g, "/").replace(/^(\.\.\/)+/, "");
  if (!rel || rel.endsWith("/")) {
    needed.set(`${pageRef} → ${raw}`, "目录式链接（站点托管不做目录 index 回退）");
    return;
  }
  if (!files.has(rel) && !files.has(`${rel}/index.html`)) {
    needed.set(`${pageRef} → ${raw}`, `目标文件不存在：${rel}`);
  }
}

for (const ref of html) {
  const txt = readFileSync(join(OUT, ref), "utf8");
  // minify 会省掉属性引号，两种写法都要抓
  for (const m of txt.matchAll(/(?:href|src)="([^"]+)"|(?:href|src)=([^\s>"'=]+)/g)) {
    remember(ref, m[1] || m[2]);
  }
}

// 搜索页的链接来自 index.json 的 permalink，不经过 HTML，必须单独校验
if (files.has("index.json")) {
  const index = JSON.parse(readFileSync(join(OUT, "index.json"), "utf8"));
  for (const item of index) {
    const rel = decodeURIComponent((item.permalink || "").replace(/^\/+/, "")).replace(/\/+$/, "");
    if (rel && !files.has(rel) && !files.has(`${rel}.html`) && !files.has(`${rel}/index.html`)) {
      needed.set(`index.json → ${item.permalink}`, "搜索结果指向的页面不存在");
    }
  }
}

// 首页与检索依赖的机器可读产物
for (const must of ["index.html", "index.json", "index.xml", "sitemap.xml"]) {
  if (!files.has(must)) needed.set(`产物/${must}`, "缺失");
}

if (needed.size) {
  console.error(`✗ 链接校验失败 ${needed.size} 项：`);
  for (const [k, v] of [...needed].slice(0, 30)) console.error(`  - ${k}：${v}`);
  if (needed.size > 30) console.error(`  … 其余 ${needed.size - 30} 项`);
  process.exit(1);
}

console.log(`✓ 链接校验通过（${html.length} 个 HTML 页面、${files.size} 个产物文件，站内链接全部落地）`);
