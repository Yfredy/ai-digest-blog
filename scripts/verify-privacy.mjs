#!/usr/bin/env node
// 隐私门禁：站点是公开访问的，产物里不允许出现站主的任何可识别信息。
// 命中即失败——姓名、账号、邮箱、本机路径、参考站作者，一处都不能漏进 dist/。
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT = resolve(process.argv[2] || "dist");
if (!existsSync(OUT)) {
  console.error(`✗ 目录不存在：${OUT}`);
  process.exit(1);
}

const RULES = [
  { label: "站主姓名", re: /姚越/g },
  { label: "站主账号", re: /yfredy|yaoyue/gi },
  { label: "参考站作者", re: /nanless/gi },
  { label: "邮箱地址", re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g },
  { label: "本机路径", re: /\b[a-z]:[\\/](?:users|下载|program files)/gi },
  { label: "posix 家目录", re: /\/(?:home|Users)\/[a-z0-9._-]{2,}\b/gi },
];

// 只扫文本产物；图片等二进制不参与
const TEXT_EXT = new Set([".html", ".htm", ".xml", ".json", ".txt", ".md", ".css", ".js", ".svg"]);

function walk(dir, base = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    const rel = base ? `${base}/${name}` : name;
    if (statSync(join(dir, name)).isDirectory()) out.push(...walk(join(dir, name), rel));
    else if (TEXT_EXT.has(name.slice(name.lastIndexOf(".")).toLowerCase()) || !name.includes(".")) out.push(rel);
  }
  return out;
}

const hits = [];
let scanned = 0;

for (const rel of walk(OUT)) {
  const txt = readFileSync(join(OUT, rel), "utf8");
  if (/[\x00\x01\x02]/.test(txt.slice(0, 512))) continue;
  scanned += 1;
  for (const rule of RULES) {
    rule.re.lastIndex = 0;
    let m;
    while ((m = rule.re.exec(txt))) {
      const line = txt.slice(0, m.index).split("\n").length;
      hits.push(`${rel}:${line} ${rule.label} → ${m[0]}`);
    }
  }
}

if (hits.length) {
  console.error(`✗ 隐私校验失败 ${hits.length} 处（已扫描 ${scanned} 个产物文件）：`);
  for (const h of [...new Set(hits)].slice(0, 25)) console.error(`  - ${h}`);
  console.error("  公开站点不得出现站主个人信息，请改源码后重新导出。");
  process.exit(1);
}

console.log(`✓ 隐私校验通过（${scanned} 个产物文件，无姓名/账号/邮箱/本机路径）`);
