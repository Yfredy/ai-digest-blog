---
title: "Torvalds 用 Claude Code 重写 Linux page cache，小读吞吐提升三倍"
date: 2026-10-11T09:00:00+08:00
slug: 2026-10-14-e05-torvalds-claude-code-linux-page
tags: ["AI coding"]
categories: []
entities: ["Anthropic", "开源生态与研究"]
summary: "Phoronix 10 月 11 日报道，Linus Torvalds 在 Linux 邮件列表提交 8 补丁的 page cache 改进系列，并称代码与测试主要由 Claude Code…"
weight: 995
params:
  kind: entry
  eventDate: "2026-10-11"
  edition: "2026-10-14"
  entryNo: 5
  flags: []
  sources:
    - { title: "Phoronix", url: "https://www.phoronix.com/news/Linus-Torvalds-Claude-Code" }
    - { title: "HWBusters", url: "https://hwbusters.com/news/linus-torvalds-uses-claude-code-to-rework-the-linux-page-cache-tripling-small-read-throughput/" }
    - { title: "iTFOSS", url: "https://itsfoss.com/news/linus-torvalds-claude-code-linux/" }
---

## 发生了什么

Phoronix 10 月 11 日报道，Linus Torvalds 在 Linux 邮件列表提交 8 补丁的 page cache 改进系列，并称代码与测试主要由 Claude Code 起草：该改动跳过页缓存读取中的冗余 folio 引用，其个人机器上 8 线程小文件读吞吐提升约 3 倍。Torvalds 同时公开表态「喜欢使用 AI」，但强调最后决定权在维护者。

## 为什么值得关注

全球最挑剔的开源项目负责人亲自用编程 Agent 产出内核级补丁，是对「AI 写关键系统代码」可信度的最强背书之一；对 AI coding 方向的意义在于示范「人导机写 + 严格评审」的工作流在高正确性要求场景已经可用。

## 来源

- [Phoronix](https://www.phoronix.com/news/Linus-Torvalds-Claude-Code)
- [HWBusters](https://hwbusters.com/news/linus-torvalds-uses-claude-code-to-rework-the-linux-page-cache-tripling-small-read-throughput/)
- [iTFOSS](https://itsfoss.com/news/linus-torvalds-claude-code-linux/)

<!--meta-->

方向：AI coding ｜ 事件日期：2026-10-11 ｜ 涉及主体：Anthropic、开源生态与研究 ｜ 收录于：[2026-10-14 日报]({{< ref "/editions/2026-10-14.md" >}})
