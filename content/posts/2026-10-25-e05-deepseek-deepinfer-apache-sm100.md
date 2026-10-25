---
title: "DeepSeek 开源生产推理栈 DeepInfer：Apache 2.0，英伟达 SM100 与昇腾 950 同权"
date: 2026-10-20T09:00:00+08:00
slug: 2026-10-25-e05-deepseek-deepinfer-apache-sm100
tags: ["AIOS"]
categories: ["推理栈", "算力适配"]
entities: ["NVIDIA", "DeepSeek", "智源FlagOS", "开源生态与研究"]
summary: "DeepSeek 于 10 月 20 日把支撑自家 API 的推理框架 DeepInfer 全量开源，许可为 Apache 2.0。"
weight: 995
params:
  kind: entry
  eventDate: "2026-10-20"
  edition: "2026-10-25"
  entryNo: 5
  flags: []
  sources:
    - { title: "DeepSeek 官方", url: "https://x.com/deepseek_ai/status/2112476496283775135" }
    - { title: "The New Stack", url: "https://thenewstack.io/deepseek-deepinfer-huawei-nvidia/" }
    - { title: "MarkTechPost", url: "https://www.marktechpost.com/2026/10/20/deepseek-deepinfer-open-source-inference-framework/" }
    - { title: "TechTarget", url: "https://www.techtarget.com/ai/news/366652363/DeepSeek-makes-DeepInfer-open-source-to-cut-AI-costs" }
---

## 发生了什么

DeepSeek 于 10 月 20 日把支撑自家 API 的推理框架 DeepInfer 全量开源，许可为 Apache 2.0。它当前只服务 DeepSeek-V4.1-Flash 一个模型变体，硬件适配英伟达 SM100（Blackwell）与华为昇腾 950 两条线，官方数据为单机解码超过 25,000 tokens/s；代码衍生自 vLLM 但做了自底向上的重构，并一并放出生产用的分词/编码配方 deepseek-recipe。多位分析者指出它并未包含完整的生产服务组件（调度、路由等），更像「引擎」而非「平台」。

## 为什么值得关注

开源权重之外，推理栈才是把单位 token 成本压下去的地方。DeepInfer 让 V4.1-Flash 可以按 DeepSeek 自己的优化路径自托管，且把昇腾与英伟达放在同等位置——这对国内算力受限环境是直接可用的参考实现，也与 10-17 智源 FlagOS 2.2「跨 21 厂 35 款芯片」的方向一致。需要留意许可证与「单模型绑定」的局限，迁移成本不低。

## 来源

- [DeepSeek 官方](https://x.com/deepseek_ai/status/2112476496283775135)
- [The New Stack](https://thenewstack.io/deepseek-deepinfer-huawei-nvidia/)
- [MarkTechPost](https://www.marktechpost.com/2026/10/20/deepseek-deepinfer-open-source-inference-framework/)
- [TechTarget](https://www.techtarget.com/ai/news/366652363/DeepSeek-makes-DeepInfer-open-source-to-cut-AI-costs)

<!--meta-->

方向：AIOS ｜ 细分：推理栈、算力适配 ｜ 事件日期：2026-10-20 ｜ 涉及主体：NVIDIA、DeepSeek、智源FlagOS、开源生态与研究 ｜ 收录于：[2026-10-25 日报]({{< ref "/editions/2026-10-25.md" >}})
