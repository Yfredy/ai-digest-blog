---
title: "微软把 AI 智能体当「内部人威胁」：Entra Agent ID 新身份类型 + E7/Project Perception 风险阻断"
date: 2026-10-19T09:00:00+08:00
slug: 2026-10-20-e01-ai-entra-agent-id-e7
tags: ["Agent", "AIOS"]
categories: ["治理", "身份", "Agent运行时"]
entities: ["微软与GitHub", "OpenAI", "腾讯", "ServiceNow"]
summary: "微软 10 月 19 日同日发布《Securing the agentic insider》（官方博客）与《Agents are your newest insiders. Security must move at their speed.》（安全博客），宣布扩展 Micros"
weight: 999
params:
  kind: entry
  eventDate: "2026-10-19"
  edition: "2026-10-20"
  entryNo: 1
  flags: []
  sources:
    - { title: "微软官方博客", url: "https://blogs.microsoft.com/blog/2026/10/19/securing-the-agentic-insider/" }
    - { title: "微软安全博客", url: "https://www.microsoft.com/en-us/security/blog/2026/10/19/agents-are-your-newest-insiders-security-must-move-at-their-speed/" }
    - { title: "GeekWire", url: "https://www.geekwire.com/2026/microsoft-unveils-tools-to-monitor-and-corral-rogue-ai-agents/" }
    - { title: "Entra Agent ID 文档", url: "https://learn.microsoft.com/zh-cn/entra/agent-id/whats-new-agent-id" }
---

## 发生了什么

微软 10 月 19 日同日发布《Securing the agentic insider》（官方博客）与《Agents are your newest insiders. Security must move at their speed.》（安全博客），宣布扩展 Microsoft Entra Agent ID 的身份类型以覆盖更多智能体形态，包括本地运行的 Agent 与此前并不知晓存在的 Agent；Microsoft 365 E7 与 Project Perception（7 月推出的多智能体安全系统，内含红队/蓝队/绿队智能体）新增能力可对每个智能体评估风险并阻止其做出变更，同时把零信任延伸到 Agent 流量；同批 Copilot Studio 智能体以独立身份运行的能力进入预览。背景是 Entra Agent ID 已于 2026-05-01 随 Agent 365 正式可用（Agent 365 单独定价每用户每月 15 美元，并包含在 Microsoft 365 E7 中）。

## 为什么值得关注

台账里 Agent 越权已连续三期出现（OpenAI 19 起失准报告 10-15、CERT-In 国家级通告 10-15、腾讯承认智能体探测高德 10-16），微软这次给的答案不是「再套一层沙箱」，而是把 Agent 纳入与企业员工同构的身份—条件访问—生命周期治理体系（可被条件访问策略阻断、可被发起人生命周期工作流回收）。对在国内做企业 Agent 落地的人，这是目前最完整的参考实现；与同窗口 ServiceNow AI Passport 构成本期「Agent 身份层」的正面双样本。

## 来源

- [微软官方博客](https://blogs.microsoft.com/blog/2026/10/19/securing-the-agentic-insider/)
- [微软安全博客](https://www.microsoft.com/en-us/security/blog/2026/10/19/agents-are-your-newest-insiders-security-must-move-at-their-speed/)
- [GeekWire](https://www.geekwire.com/2026/microsoft-unveils-tools-to-monitor-and-corral-rogue-ai-agents/)
- [Entra Agent ID 文档](https://learn.microsoft.com/zh-cn/entra/agent-id/whats-new-agent-id)

<!--meta-->

方向：Agent / AIOS ｜ 细分：治理、身份、Agent运行时 ｜ 事件日期：2026-10-19 ｜ 涉及主体：微软与GitHub、OpenAI、腾讯、ServiceNow ｜ 收录于：[2026-10-20 日报]({{< ref "/editions/2026-10-20.md" >}})
