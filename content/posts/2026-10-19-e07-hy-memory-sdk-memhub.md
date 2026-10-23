---
title: "【补录 10-15～16】腾讯混元开源 Hy Memory 2.0：模型 + SDK + MemHub 应用三层"
date: 2026-10-15T09:00:00+08:00
slug: 2026-10-19-e07-hy-memory-sdk-memhub
tags: ["AI coding", "Agent"]
categories: ["记忆"]
entities: ["腾讯", "OpenAI", "Anthropic", "阿里与Qwen"]
summary: "补录｜【补录 10-15～16】腾讯混元开源 Hy Memory 2.0：模型 + SDK + MemHub 应用三层"
weight: 993
params:
  kind: entry
  eventDate: "2026-10-15"
  edition: "2026-10-19"
  entryNo: 7
  flags: ["补录"]
  sources:
    - { title: "腾讯混元记忆官方站", url: "https://memory.hunyuan.tencent.com/" }
    - { title: "IT之家", url: "https://www.ithome.com/" }
    - { title: "新浪财经", url: "https://finance.sina.com.cn/" }
---

> 一句话要点：补录｜【补录 10-15～16】腾讯混元开源 Hy Memory 2.0：模型 + SDK + MemHub 应用三层

## 发生了什么

腾讯混元 10 月 15 日放出权重、16 日正式官宣 Hy Memory 2.0，按三层开源（github.com/Tencent-Hunyuan/Hy-Memory，PyPI 包 hy-memory==2.0.1）：专用记忆写入模型 Hy-Memory-30B-A3B（30B 总参、约 3B 激活）、记忆框架与 Python SDK、以及让 10 款 AI 编程工具共享本地记忆的 MemHub 应用。官方称框架在 4 项公开记忆基准上排名第一，模型在 4 套基准的均分 55.49，高于 Opus 5、DeepSeek V4.1 Flash 与 Qwen3-30B-A3B。

## 为什么值得关注

Agent 记忆此前基本靠「把历史塞回上下文」或第三方向量库，本条第一次给出「专用记忆写入小模型 + 标准 SDK + 跨工具共享层」的完整开源组合，而 MemHub 直接对准编程工具这一最高频场景——台账里的编程 Agent 动态（Codex、Claude Code、Amp）都缺这一块。均分 55.49 这类自评数字需第三方复现，但架构分层值得作为参考实现。

## 来源

- [腾讯混元记忆官方站](https://memory.hunyuan.tencent.com/)
- [IT之家](https://www.ithome.com/)
- [新浪财经](https://finance.sina.com.cn/)

<!--meta-->

方向：AI coding / Agent ｜ 细分：记忆 ｜ 事件日期：2026-10-15 ｜ 涉及主体：腾讯、OpenAI、Anthropic、阿里与Qwen ｜ 标记：补录 ｜ 收录于：[2026-10-19 日报]({{< ref "/editions/2026-10-19.md" >}})
