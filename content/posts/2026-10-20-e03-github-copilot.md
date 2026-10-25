---
title: "GitHub Copilot 六款模型 10-19 退役生效：全系体验与全部计划范围内下线"
date: 2026-10-19T09:00:00+08:00
slug: 2026-10-20-e03-github-copilot
tags: ["AI coding"]
categories: []
entities: ["微软与GitHub", "OpenAI", "Anthropic", "xAI与Grok"]
summary: "GitHub 于 10 月 19 日按 9 月 18 日发布的公告执行本轮模型退役，下线 Gemini 3.7 Flash、GPT-5.5、GPT-5.4、GPT-5.4 mini、GPT-5…"
weight: 997
params:
  kind: entry
  eventDate: "2026-10-19"
  edition: "2026-10-20"
  entryNo: 3
  flags: ["后续进展"]
  sources:
    - { title: "GitHub Changelog（9-18 公告）", url: "https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october/" }
    - { title: "GitHub Changelog（10-15 下一批）", url: "https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november/" }
    - { title: "退役清单与迁移指引", url: "https://qcode.cc/en/github-copilot-model-retirement-2026-10-19" }
    - { title: "社区讨论", url: "https://github.com/orgs/community/discussions/177743" }
---

## 发生了什么

GitHub 于 10 月 19 日按 9 月 18 日发布的公告执行本轮模型退役，下线 Gemini 3.7 Flash、GPT-5.5、GPT-5.4、GPT-5.4 mini、GPT-5 mini、Grok 4.5（官方口径为「选定模型」六款，部分第三方另列出 Gemini 3.6 Flash），指定替代为 GPT-5.6 Sol/Luna、Gemini 3.8 Flash 与 Grok 4.6；影响范围覆盖 Copilot Chat、内联编辑、ask 与 agent 模式、代码补全，对所有计划生效。这是本月的第二批：台账 10-15 记录的那批（Claude Opus 4.8 / Opus 5 / GPT-5.6 Terra）将于 11 月 16 日退役，与今日生效批次不同。

## 为什么值得关注

生效日才是真正的影响面——已把模型 ID 固定写进策略文件或工作流（`chat-models` 允许列表、Copilot CLI 配置）的团队今天起会直接失败，第三方梳理也提示需先盘点固定引用的模型 ID。连续两批共九款模型在一个月内下线，说明 Copilot 的模型目录已进入快速轮换状态，选型的默认假设应从「选定模型」转向「选定档位 + 可替换映射」。

## 来源

- [GitHub Changelog（9-18 公告）](https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october/)
- [GitHub Changelog（10-15 下一批）](https://github.blog/changelog/2026-10-15-upcoming-deprecation-of-selected-github-copilot-models-in-mid-november/)
- [退役清单与迁移指引](https://qcode.cc/en/github-copilot-model-retirement-2026-10-19)
- [社区讨论](https://github.com/orgs/community/discussions/177743)

<!--meta-->

方向：AI coding ｜ 事件日期：2026-10-19 ｜ 涉及主体：微软与GitHub、OpenAI、Anthropic、xAI与Grok ｜ 标记：后续进展 ｜ 收录于：[2026-10-20 日报]({{< ref "/editions/2026-10-20.md" >}})
