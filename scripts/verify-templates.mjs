#!/usr/bin/env node
// 模板静态门禁：在无法本地运行 hugo 时，先挡住 Go 模板最常见的结构性错误。
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const rel = join(dir, name);
    if (statSync(rel).isDirectory()) out.push(...walk(rel));
    else if (rel.endsWith(".html")) out.push(rel);
  }
  return out;
}

const OPENERS = /\{\{-?\s*(?:if|range|with|block|define|template)\b/g;
const ELSES = /\{\{-?\s*(?:else|else if)\b/g;
const CLOSERS = /\{\{-?\s*end\s*-?\}\}/g;
// Hugo 里不存在或已废弃、写出来只会静默失效的东西
const BANNED = [
  [/\brelRef\b/, "relRef 不是 Hugo 模板函数，改用 site.GetPage 或 relURL"],
  [/\{\{-?\s*with\s+\.\w+\s*\}\}\s*\{\{-?\s*else\s*\}\}\s*\{\{-?\s*end\s*-?\}\}/, "空的 with/else 分支"],
];

const files = walk(join(ROOT, "layouts"));
const problems = [];
let checkedBlocks = 0;

for (const f of files) {
  const txt = readFileSync(f, "utf8");
  const rel = f.slice(ROOT.length + 1).replace(/\\/g, "/");
  const open = (txt.match(OPENERS) || []).length;
  const close = (txt.match(CLOSERS) || []).length;
  const els = (txt.match(ELSES) || []).length;
  checkedBlocks += open;
  if (open !== close) problems.push(`${rel}: 模板块不配对（开 ${open} / 闭 ${close}，含 else ${els}）`);
  for (const [re, msg] of BANNED) if (re.test(txt)) problems.push(`${rel}: ${msg}`);
  // 双花括号必须成对，否则 hugo 解析直接失败
  const cOpen = (txt.match(/\{\{/g) || []).length;
  const cClose = (txt.match(/\}\}/g) || []).length;
  if (cOpen !== cClose) problems.push(`${rel}: 双花括号不配对（${cOpen} vs ${cClose}）`);
}

const themePartials = readdirSync(join(ROOT, "themes/PaperMod/layouts/_partials"));
for (const f of files) {
  const txt = readFileSync(f, "utf8");
  const rel = f.slice(ROOT.length + 1).replace(/\\/g, "/");
  for (const m of txt.matchAll(/partial\s+"([^"]+)"/g)) {
    const name = m[1];
    const mine = readdirSync(join(ROOT, "layouts/_partials")).includes(name);
    const fromTheme = themePartials.includes(name);
    if (!mine && !fromTheme) problems.push(`${rel}: partial "${name}" 在主题与本项目中都不存在`);
  }
}

if (problems.length) {
  console.error(`✗ 模板校验失败 ${problems.length} 项：\n` + problems.map((p) => `  - ${p}`).join("\n"));
  process.exit(1);
}
console.log(`✓ 模板校验通过（${files.length} 个文件，${checkedBlocks} 个模板块）`);
