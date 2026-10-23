---
title: "【补录 10-15～16】Perplexity 开源 SPACE：跑在生产环境的 Firecracker Agent 沙箱"
date: 2026-10-15T09:00:00+08:00
slug: 2026-10-18-e02-perplexity-space-firecracker-agent
tags: ["Agent", "AIOS"]
categories: ["Agent沙箱", "基础设施"]
entities: ["Perplexity", "微软与GitHub", "OpenAI", "监管与政府机构"]
summary: "补录｜【补录 10-15～16】Perplexity 开源 SPACE：跑在生产环境的 Firecracker Agent 沙箱"
weight: 998
params:
  kind: entry
  eventDate: "2026-10-15"
  edition: "2026-10-18"
  entryNo: 2
  flags: ["补录"]
  sources:
    - { title: "Perplexity 官方博客", url: "https://www.perplexity.ai/hub/blog/open-sourcing-space" }
    - { title: "Perplexity 官方 X", url: "https://x.com/perplexity_ai/status/2110778478312481167" }
    - { title: "MarkTechPost 报道", url: "https://www.marktechpost.com/2026-10-16/perplexity-open-sources-space-firecracker-microvm-sandbox-ai-agents/" }
---

> 一句话要点：补录｜【补录 10-15～16】Perplexity 开源 SPACE：跑在生产环境的 Firecracker Agent 沙箱

## 发生了什么

Perplexity 于 10 月 15 日宣布、16 日铺开传播，把支撑 Perplexity Computer 每一个任务的沙箱平台 SPACE 以 Apache 2.0 开源（Rust 实现，仓库 github.com/perplexityai/SPACE）。设计要点是每个 Agent 任务独占一个 Firecracker microVM、各带独立 guest kernel；官方明确「凭证与出网流量在 VM 外侧统一控制」，并提供 warm pool（预热池）、基础快照与 E2B 兼容层，便于既有工具直接迁移。该平台自今年 7 月起就在生产环境承载全部 Computer 会话。

## 为什么值得关注

这是本期最直接的「Agent 运行时基础设施」供给——过去只有云厂商内部实现的 per-task 微虚机隔离，现在给了可审计的开源参考，且默认把身份与网络边界放在 VM 之外，正好对应本期 CERT-In 通告与 OpenAI 失准报告暴露的越权路径；对比微软 Execution Containers（10-07 已推送）走 OS 原生路线，Apache 2.0 的 SPACE 更可能被第三方 Agent 框架直接采用。

## 来源

- [Perplexity 官方博客](https://www.perplexity.ai/hub/blog/open-sourcing-space)
- [Perplexity 官方 X](https://x.com/perplexity_ai/status/2110778478312481167)
- [MarkTechPost 报道](https://www.marktechpost.com/2026-10-16/perplexity-open-sources-space-firecracker-microvm-sandbox-ai-agents/)

<!--meta-->

方向：Agent / AIOS ｜ 细分：Agent沙箱、基础设施 ｜ 事件日期：2026-10-15 ｜ 涉及主体：Perplexity、微软与GitHub、OpenAI、监管与政府机构 ｜ 标记：补录 ｜ 收录于：[2026-10-18 日报]({{< ref "/editions/2026-10-18.md" >}})
