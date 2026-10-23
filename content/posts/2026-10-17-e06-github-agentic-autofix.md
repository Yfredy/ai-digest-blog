---
title: "【补录 10-15】GitHub：agentic autofix 转正，可一次修 25 条代码扫描告警"
date: 2026-10-15T09:00:00+08:00
slug: 2026-10-17-e06-github-agentic-autofix
tags: ["AI coding", "Agent"]
categories: ["安全"]
entities: ["微软与GitHub"]
summary: "补录｜【补录 10-15】GitHub：agentic autofix 转正，可一次修 25 条代码扫描告警"
weight: 994
params:
  kind: entry
  eventDate: "2026-10-15"
  edition: "2026-10-17"
  entryNo: 6
  flags: ["补录"]
  sources:
    - { title: "GitHub Changelog（GA）", url: "https://github.blog/changelog/2026-10-15-agentic-autofix-for-code-scanning-alerts-general-availability/" }
    - { title: "GitHub Docs", url: "https://docs.github.com/en/code-security/concepts/code-scanning/autofix-for-code-scanning" }
---

> 一句话要点：补录｜【补录 10-15】GitHub：agentic autofix 转正，可一次修 25 条代码扫描告警

## 发生了什么

GitHub 10 月 15 日发布 changelog，把 7 月 10 日起的 public preview 转正——agentic autofix 正式 GA，面向 GitHub Enterprise Cloud + Advanced Security 客户。开启后各条告警上免费的「Generate Fix」被「Assign to Copilot」取代：智能体自行探查相关文件、生成修复、重跑 CodeQL 确认告警被关闭，再开草稿 PR；一次最多可指派 25 条告警批量修复，目前仅覆盖默认分支上的告警，需企业管理员开启 Agentic autofix 策略并配置计费。同批 10-15 条目还包括 Copilot in Slack/Teams 支持多仓库，以及 AI Scan for pull requests 转正。

## 为什么值得关注

安全告警修复从「人看 diff 再点采纳」变成「Agent 自主探查—修复—自证—交 PR」的闭环，且给出 25 条的批量上限，这是企业侧少见的、已 GA 的实用型编码 Agent 场景；同时它把「Agent 能不能被信任改安全代码」的验证责任交给了 CodeQL 复跑这一确定性工具，是 Agent 落地的可复用范式。

## 来源

- [GitHub Changelog（GA）](https://github.blog/changelog/2026-10-15-agentic-autofix-for-code-scanning-alerts-general-availability/)
- [GitHub Docs](https://docs.github.com/en/code-security/concepts/code-scanning/autofix-for-code-scanning)

<!--meta-->

方向：AI coding / Agent ｜ 细分：安全 ｜ 事件日期：2026-10-15 ｜ 涉及主体：微软与GitHub ｜ 标记：补录 ｜ 收录于：[2026-10-17 日报]({{< ref "/editions/2026-10-17.md" >}})
