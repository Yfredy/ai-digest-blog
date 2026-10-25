#!/usr/bin/env node
// Sites 导出：根相对路径 + 显式 .html 文件，然后改写目录式链接。
// 走 spawn 传参，避免 shell 把 "--baseURL /" 的路径参数改写成本机绝对路径。
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, process.env.DIST_DIR || "dist");
const HUGO = process.env.HUGO_BIN || "hugo";

// baseURL/uglyURLs 是配置项而非 CLI flag，用 Hugo 支持的 HUGO_ 前缀环境变量注入
// HTML 里保持根相对链接：与托管域名无关；SITES_FEED_BASE 只把 RSS/sitemap 的 <loc> 补成绝对地址（规范要求）
const args = ["--gc", "--minify", `--destination=${OUT}`];
const env = { ...process.env, HUGO_BASEURL: "/", HUGO_UGLYURLS: "true" };
const run = spawnSync(HUGO, args, { cwd: ROOT, stdio: "inherit", env });
if (run.error) {
  console.error(`✗ 无法执行 ${HUGO}：${run.error.message}（本地可用 HUGO_BIN=.tools/hugo.exe）`);
  process.exit(1);
}
if (run.status !== 0) process.exit(run.status);

const flat = spawnSync(process.execPath, [resolve(ROOT, "scripts/flatten-dir-links.mjs"), OUT], { stdio: "inherit" });
if (flat.status !== 0) process.exit(flat.status);

if (process.env.SITES_FEED_BASE) {
  const feeds = spawnSync(process.execPath, [resolve(ROOT, "scripts/absolutize-feeds.mjs"), OUT, process.env.SITES_FEED_BASE], {
    stdio: "inherit",
  });
  process.exit(feeds.status);
}
process.exit(0);
