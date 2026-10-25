#!/usr/bin/env node
// 本地静态预览：直接伺服 dist/，并复现托管方「无目录 index 回退」的行为，
// 这样任何仍以 /path/ 结尾的链接会返回 404，而不是被悄悄兜住。
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, resolve, extname } from "node:path";

const OUT = resolve(process.argv[2] || "dist");
const PORT = Number(process.argv[3] || 8123);
const TYPE = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

createServer(async (req, res) => {
  const url = decodeURIComponent((req.url || "/").split("?")[0].split("#")[0]);
  const path = url === "/" ? "/index.html" : url;
  try {
    const body = await readFile(join(OUT, path));
    res.writeHead(200, { "content-type": TYPE[extname(path)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end(`404 ${path}`);
  }
}).listen(PORT, "127.0.0.1", () => console.log(`静态预览 http://127.0.0.1:${PORT}/  ← ${OUT}`));
