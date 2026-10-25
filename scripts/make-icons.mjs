#!/usr/bin/env node
// 站点图标：零依赖手写 PNG（zlib + CRC）+ ICO（内嵌 32px PNG）。
// 设计：深底「速递」三条横线，末条截断并用琥珀色高亮，与小报站 identity 一致。
import { deflateSync } from "node:zlib";
import { writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "static");
const BG = [18, 26, 43, 255];
const FG = [245, 247, 250, 255];
const ACCENT = [240, 180, 41, 255];

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "latin1"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(size, pixelAt) {
  const raw = Buffer.alloc(size * (size * 4 + 1));
  let o = 0;
  for (let y = 0; y < size; y++) {
    raw[o++] = 0; // 每行的 filter 字节：None
    for (let x = 0; x < size; x++) for (const v of pixelAt(x, y)) raw[o++] = v;
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** 横线版式：x/y 归一化后判断落在哪条纹上 */
function mark(x, y, size) {
  const nx = x / size;
  const ny = y / size;
  const inKicker = ny >= 0.18 && ny < 0.23 && nx >= 0.16 && nx < 0.42;
  const rows = [
    { top: 0.34, left: 0.16, right: 0.84, color: FG },
    { top: 0.5, left: 0.16, right: 0.84, color: FG },
    { top: 0.66, left: 0.16, right: 0.58, color: ACCENT },
  ];
  const band = (top) => ny >= top && ny < top + 0.09;
  for (const r of rows) {
    if (band(r.top) && nx >= r.left && nx < r.right) return r.color;
  }
  if (inKicker) return ACCENT;
  return BG;
}

function pngFor(size) {
  const px = size / 128;
  return encodePng(size, (x, y) => mark(Math.floor(x / px), Math.floor(y / px), 128));
}

function icoFrom(pngBuf, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // 类型：图标
  header.writeUInt16LE(1, 4); // 条目数
  const entry = Buffer.alloc(16);
  entry[0] = size;
  entry[1] = size;
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4); // 颜色平面
  entry.writeUInt16LE(32, 6); // 位深
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(22, 12); // 数据偏移
  return Buffer.concat([header, entry, pngBuf]);
}

const files = [
  ["favicon-16x16.png", pngFor(16)],
  ["favicon-32x32.png", pngFor(32)],
  ["apple-touch-icon.png", pngFor(180)],
  ["favicon.ico", icoFrom(pngFor(32), 32)],
];

for (const [name, buf] of files) writeFileSync(join(OUT, name), buf);

// 回读校验：签名、IHDR 尺寸/色彩类型与 ICO 目录条目必须与写入意图一致
function readPng(buf, want) {
  if (buf.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") throw new Error(`${want}: PNG 签名不符`);
  const size = [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  if (buf[24] !== 8 || buf[25] !== 6) throw new Error(`${want}: 期望 8bit RGBA，实际 ${buf[24]}/${buf[25]}`);
  if (size[0] !== want || size[1] !== want) throw new Error(`${want}: IHDR 尺寸 ${size.join("x")}`);
  return size.join("x") + " 8bit RGBA";
}
const EXPECT = { "favicon-16x16.png": 16, "favicon-32x32.png": 32, "apple-touch-icon.png": 180 };
for (const [name, buf] of files) {
  if (name === "favicon.ico") {
    if (buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1 || buf.readUInt16LE(4) !== 1) throw new Error("ICO 头不符");
    const size = buf.readUInt8(6);
    const payload = buf.readUInt32LE(14);
    const offset = buf.readUInt32LE(18);
    if (buf.readUInt16LE(10) !== 1 || buf.readUInt16LE(12) !== 32) throw new Error("ICO 平面/位深不符");
    if (offset + payload !== buf.length) throw new Error("ICO 数据长度与文件长度不一致");
    readPng(buf.subarray(offset), size);
    console.log(`${name}  ${size}x${size} 1 plane 32bit  内嵌 PNG 校验通过  ${buf.length}B`);
  } else {
    console.log(`${name}  ${readPng(buf, EXPECT[name])}  ${buf.length}B`);
  }
}
