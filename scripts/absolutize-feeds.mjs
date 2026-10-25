#!/usr/bin/env node
// RSS/sitemap 的 <loc>/<link> 与 robots.txt 的 Sitemap 行必须是绝对地址（机器可读规范要求）。
// HTML 保持根相对以便换域名重建，只有这些产物按发布站点地址补全。
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT = resolve(process.argv[2] || "dist");
const BASE = (process.argv[3] || "").replace(/\/+$/, "");
if (!existsSync(OUT)) {
  console.error(`✗ 导出目录不存在：${OUT}`);
  process.exit(1);
}
if (!/^https?:\/\/[^/]+$/.test(BASE)) {
  console.error("✗ 缺少站点地址参数：node scripts/absolutize-feeds.mjs dist https://<host>");
  process.exit(1);
}

function walk(dir, base = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const rel = base ? `${base}/${name}` : name;
    if (statSync(join(dir, name)).isDirectory()) out.push(...walk(join(dir, name), rel));
    else out.push(rel);
  }
  return out;
}

const files = new Set(walk(OUT));

// 与链接门禁同一口径：站点托管不做目录 index 回退，所以必须落到具体文件
function lands(rootRelative) {
  let decoded;
  try {
    decoded = decodeURIComponent(rootRelative.split(/[?#]/)[0]);
  } catch {
    return false;
  }
  const rel = decoded.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!rel) return false;
  return files.has(rel) || files.has(`${rel}/index.html`);
}

const problems = [];
let rewritten = 0;
let checked = 0;
let touched = 0;

function checkValue(pageRef, value) {
  checked += 1;
  if (value.startsWith(`${BASE}/`)) {
    if (!lands(value.slice(BASE.length))) problems.push(`${pageRef}: 地址落不到文件 ${value}`);
    return;
  }
  problems.push(`${pageRef}: 地址不是本站绝对链接 ${value}`);
}

function rewriteTag(pageRef, tag, value) {
  if (value.startsWith(`${BASE}/`)) return value;
  if (!value.startsWith("/") || value.startsWith("//")) {
    problems.push(`${pageRef}: <${tag}> 无法绝对化 ${value}`);
    return value;
  }
  if (!lands(value)) {
    problems.push(`${pageRef}: <${tag}> 落不到文件 ${value}`);
    return value;
  }
  rewritten += 1;
  return `${BASE}${value}`;
}

for (const rel of [...files].filter((f) => f.endsWith(".xml")).sort()) {
  const path = join(OUT, rel);
  const before = readFileSync(path, "utf8");
  const after = before.replace(
    /<(loc|link)>([^<]*)<\/\1>/g,
    (whole, tag, value) => `<${tag}>${rewriteTag(rel, tag, value)}</${tag}>`,
  );
  if (after !== before) {
    writeFileSync(path, after);
    touched += 1;
  }
  for (const m of after.matchAll(/<(?:loc|link)>([^<]*)<\/(?:loc|link)>/g)) checkValue(rel, m[1]);
}

if (files.has("robots.txt")) {
  const path = join(OUT, "robots.txt");
  const before = readFileSync(path, "utf8");
  const after = before.replace(/^Sitemap:\s*(\S+)\s*$/m, (whole, value) => {
    const next = rewriteTag("robots.txt", "Sitemap", value);
    return `Sitemap: ${next}`;
  });
  if (after !== before) {
    writeFileSync(path, after);
    touched += 1;
  }
  const m = after.match(/^Sitemap:\s*(\S+)$/m);
  if (m) checkValue("robots.txt", m[1]);
}

if (problems.length) {
  console.error(`✗ 订阅产物校验失败 ${problems.length} 项：`);
  for (const p of [...new Set(problems)].slice(0, 30)) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(`✓ 订阅产物已按 ${BASE} 补全并校验（${checked} 个地址、${touched} 个文件）`);
