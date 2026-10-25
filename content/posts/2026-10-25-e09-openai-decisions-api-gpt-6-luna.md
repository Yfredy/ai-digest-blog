---
title: "OpenAI Decisions API 正式可用：gpt-6-luna 做「决策层」，原生接入语音与图像"
date: 2026-10-22T09:00:00+08:00
slug: 2026-10-25-e09-openai-decisions-api-gpt-6-luna
tags: ["Agent", "AIOS"]
categories: ["模型服务", "基础设施"]
entities: ["OpenAI", "微软与GitHub"]
summary: "OpenAI 于 10 月 22 日把 10-06 公测的 Decisions API 转为正式可用（GA），底层为 gpt-6-luna，输入定价 0.10 美元/百万 token、不收取输…"
weight: 991
params:
  kind: entry
  eventDate: "2026-10-22"
  edition: "2026-10-25"
  entryNo: 9
  flags: []
  sources:
    - { title: "OpenAI 官方", url: "https://openai.com/index/decisions-api/" }
    - { title: "OpenAI 开发者 changelog", url: "https://developers.openai.com/api/docs/changelog" }
    - { title: "官方社区公告", url: "https://community.openai.com/t/decisions-api-is-now-generally-available-with-new-updates/1408934" }
    - { title: "Azure AI Foundry", url: "https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/azure-openai-decisions-api-now-generally-available-in-microsoft-foundry/4567265" }
---

## 发生了什么

OpenAI 于 10 月 22 日把 10-06 公测的 Decisions API 转为正式可用（GA），底层为 gpt-6-luna，输入定价 0.10 美元/百万 token、不收取输出费用；GA 版新增原生 GPT-Live 语音集成、图像输入、复用上下文的 prompt caching，以及美国/欧盟推理驻留。它返回的是结构化判断（选项、概率、分数），面向 Agent 路由、分类、风控打分等「近实时做选择」的场景。Azure AI Foundry 于 10-24 同步上架。

## 为什么值得关注

Agent 系统的延迟与成本大头往往不在生成，而在「该调哪个模型/工具」的判断；把这一步拆成独立、极便宜的 API，是 OpenAI 对 Agent 基础设施的一次产品化。0.10 美元/百万输入的定价意味着它可以被高频调用，配合语音输入则直接覆盖实时客服场景。与本周 DeepInfer 的开源推理栈对照，一个是把决策层标准化，一个是把执行层成本打下来。

## 来源

- [OpenAI 官方](https://openai.com/index/decisions-api/)
- [OpenAI 开发者 changelog](https://developers.openai.com/api/docs/changelog)
- [官方社区公告](https://community.openai.com/t/decisions-api-is-now-generally-available-with-new-updates/1408934)
- [Azure AI Foundry](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog/azure-openai-decisions-api-now-generally-available-in-microsoft-foundry/4567265)

<!--meta-->

方向：Agent / AIOS ｜ 细分：模型服务、基础设施 ｜ 事件日期：2026-10-22 ｜ 涉及主体：OpenAI、微软与GitHub ｜ 收录于：[2026-10-25 日报]({{< ref "/editions/2026-10-25.md" >}})
