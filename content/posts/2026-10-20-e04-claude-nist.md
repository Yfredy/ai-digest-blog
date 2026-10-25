---
title: "【补录 10-16，10-17～19 持续发酵】Claude 还原 NIST 五条椭圆曲线种子的生成方式"
date: 2026-10-16T09:00:00+08:00
slug: 2026-10-20-e04-claude-nist
tags: ["Agent", "泛AI"]
categories: ["科研", "安全"]
entities: ["Anthropic", "监管与政府机构", "SakanaAI"]
summary: "Anthropic 前线红队（Frontier Red Team）10 月 16 日发布披露：一名员工把困扰密码学界二十多年的问题交给 Claude 内部研究模型、且未提供关键线索，模型在不到…"
weight: 996
params:
  kind: entry
  eventDate: "2026-10-16"
  edition: "2026-10-20"
  entryNo: 4
  flags: ["补录"]
  sources:
    - { title: "Anthropic 前线红队披露（10-16）", url: "https://www.anthropic.com/news" }
    - { title: "Unite.AI", url: "https://www.unite.ai/anthropic-says-claude-traced-nist-ecdsa-curve-seeds-to-a-1990s-rng/" }
    - { title: "技术梳理", url: "https://cellcog.ai/blog/claude-ecdsa-curve-seeds/" }
    - { title: "10-19 二次报道", url: "https://www.technology.org/2026/10/19/claude-nist-p256-curve-seeds-lrand48-timestamp/" }
    - { title: "量子位", url: "https://www.qbitai.com/2026/10/503910.html" }
---

## 发生了什么

Anthropic 前线红队（Frontier Red Team）10 月 16 日发布披露：一名员工把困扰密码学界二十多年的问题交给 Claude 内部研究模型、且未提供关键线索，模型在不到半小时内还原出 NIST P-192、P-224、P-256、P-384、P-521 五条公开曲线种子的生成方式——它们是 C 库伪随机函数 lrand48 的输出，种子取自 1997～1998 年间的六个 Unix 时间戳；这些数字由 NSA 于 2000 年提供给 NIST，但「如何选出」从未公开。结论意味着曲线种子并不来自官方暗示过的「无可指责的随机过程」，但 ECDSA 本身并未被破解，多个独立实现已可在数秒内复现。量子位 10 月 17 日、Technology.org 与加密媒体 10 月 19 日继续铺开，多位密码学者（含 Valsorda）确认复现成立。

## 为什么值得关注

这是台账里第一条「前沿模型解出真实世界长期悬案」并获同行独立验证的案例，性质不同于跑分（对比 Sakana 的 LLM 同行评审 10-10、AgentGarten 10-11 仍停在评测框架层）。对 AI coding 与安全方向的实际含义是：具备长链搜索与工具编排能力的模型可以承担研究级任务，而「标准里的神秘常数」这类审计问题从此有了自动化路径。

## 来源

- [Anthropic 前线红队披露（10-16）](https://www.anthropic.com/news)
- [Unite.AI](https://www.unite.ai/anthropic-says-claude-traced-nist-ecdsa-curve-seeds-to-a-1990s-rng/)
- [技术梳理](https://cellcog.ai/blog/claude-ecdsa-curve-seeds/)
- [10-19 二次报道](https://www.technology.org/2026/10/19/claude-nist-p256-curve-seeds-lrand48-timestamp/)
- [量子位](https://www.qbitai.com/2026/10/503910.html)

<!--meta-->

方向：Agent / 泛AI ｜ 细分：科研、安全 ｜ 事件日期：2026-10-16 ｜ 涉及主体：Anthropic、监管与政府机构、SakanaAI ｜ 标记：补录 ｜ 收录于：[2026-10-20 日报]({{< ref "/editions/2026-10-20.md" >}})
