#!/usr/bin/env node
// Qoder Sites 托管不做目录 index 回退：把产物里的「目录式」站内链接改写成确实存在的具体文件。
// uglyURLs 模式下同一页面的落点有两种：根级自定义页是 <path>.html，栏目/分类页是 <path>/index.html。
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

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

function resolveDirLink(pathPart) {
  const clean = decodeURIComponent(pathPart).replace(/^\/+|\/+$/g, "");
  const candidates = clean ? [`${clean}.html`, `${clean}/index.html`] : ["index.html"];
  return candidates.find((c) => existsSync(join(OUT, c))) || null;
}

const htmlFiles = walk(OUT).filter((f) => f.endsWith(".html"));
const rewritten = new Map();
const unresolved = new Map();

for (const ref of htmlFiles) {
  const path = join(OUT, ref);
  const src = readFileSync(path, "utf8");
  const next = src.replace(/(href|src)=(?:"([^"]+)"|([^\s>"'=]+))/g, (whole, attr, quoted, bare) => {
    const value = quoted ?? bare;
    const m = value.match(/^\/(?:([^?#]*)\/)?(\?[^#]*)?(#.*)?$/);
    if (!m) return whole;
    const target = resolveDirLink(m[1] || "");
    if (!target) {
      unresolved.set(value, (unresolved.get(value) || 0) + 1);
      return whole;
    }
    rewritten.set(value, target);
    const fixed = `/${target}${m[2] || ""}${m[3] || ""}`;
    return quoted !== undefined ? `${attr}="${fixed}"` : `${attr}=${fixed}`;
  });
  if (next !== src) writeFileSync(path, next, "utf8");
}

const entries = [...rewritten].map(([from, to]) => `${from} → /${to}`);
console.log(`目录式链接改写 ${[...rewritten.values()].length} 处，覆盖 ${entries.length} 种目标`);
if (entries.length <= 12) for (const e of entries) console.log(`  ${e}`);
if (unresolved.size) {
  console.error(`✗ ${unresolved.size} 个目录式链接找不到落点：`);
  for (const [v, n] of [...unresolved].slice(0, 15)) console.error(`  - ${v}（${n} 处）`);
  process.exit(1);
}
