---
title: "Anthropic 用 Claude 对 123 个开源库做形式化验证：239 个入口、约 1.8 亿行证明"
date: 2026-10-22T09:00:00+08:00
slug: 2026-10-25-e06-anthropic-claude
tags: ["AI coding", "泛AI"]
categories: ["验证", "科研"]
entities: ["Anthropic", "监管与政府机构"]
summary: "Anthropic 于 10 月 22 日发布研究，称用 Claude 联合 Theorem 的 Rocq 工具链，对 123 个真实开源库、239 个 OSS-Fuzz 入口点生成机器可检验…"
weight: 994
params:
  kind: entry
  eventDate: "2026-10-22"
  edition: "2026-10-25"
  entryNo: 6
  flags: []
  sources:
    - { title: "Anthropic Research", url: "https://www.anthropic.com/research/formal-verification" }
    - { title: "DevOps.com", url: "https://devops.com/claude-writes-180-million-lines-of-proofs-to-verify-123-open-source-libraries" }
    - { title: "Unite.AI", url: "https://www.unite.ai/anthropic-says-claude-proved-security-properties-across-123-libraries/" }
    - { title: "explainx", url: "https://explainx.ai/blog/anthropic-claude-formal-verification-123-libraries-rocq-risc-v-proofs-2026" }
---

## 发生了什么

Anthropic 于 10 月 22 日发布研究，称用 Claude 联合 Theorem 的 Rocq 工具链，对 123 个真实开源库、239 个 OSS-Fuzz 入口点生成机器可检验的形式化证明，证明其「不会崩溃」等安全性质，累计约 1.8 亿行证明代码，并顺带发现了 fuzzing 多年未触达的缺陷。限制条件写得很明确：证明针对单线程、静态链接的 RISC-V 二进制，因此「形式化验证过」不等于「没有 bug」。

## 为什么值得关注

这是台账中继 10-16「Claude 还原 NIST 曲线种子」之后，模型承担研究级工作的第二个硬样本，但性质不同——上次是搜索与推理，这次是把「写证明」这种过去需要博士级人力的工作规模化。对 AI coding 的直接影响在验证而非生成：当证明可以批量生成，CI 里可能出现「证明覆盖率」这一新门禁；同时它也提示模型输出仍需工具链逐步检查，不能把「模型说已证明」当作结论。

## 来源

- [Anthropic Research](https://www.anthropic.com/research/formal-verification)
- [DevOps.com](https://devops.com/claude-writes-180-million-lines-of-proofs-to-verify-123-open-source-libraries)
- [Unite.AI](https://www.unite.ai/anthropic-says-claude-proved-security-properties-across-123-libraries/)
- [explainx](https://explainx.ai/blog/anthropic-claude-formal-verification-123-libraries-rocq-risc-v-proofs-2026)

<!--meta-->

方向：AI coding / 泛AI ｜ 细分：验证、科研 ｜ 事件日期：2026-10-22 ｜ 涉及主体：Anthropic、监管与政府机构 ｜ 收录于：[2026-10-25 日报]({{< ref "/editions/2026-10-25.md" >}})
