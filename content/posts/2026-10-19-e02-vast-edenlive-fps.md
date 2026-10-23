---
title: "VAST 开源实时世界模型 EdenLive：单卡 5090 跑到 720P、24FPS 以上"
date: 2026-10-18T09:00:00+08:00
slug: 2026-10-19-e02-vast-edenlive-fps
tags: ["AI Multimedia"]
categories: ["世界模型", "开源"]
entities: ["VAST", "腾讯", "智源FlagOS"]
summary: "VAST-AI 于 10 月 18 日发布并开源实时世界模型 EdenLive，代码开源于 github.com/VAST-AI-Research/EdenLive，权重在 huggingface.co/VAST-AI/EdenLive。核心规格是单张消费级显卡（RTX 5090"
weight: 998
params:
  kind: entry
  eventDate: "2026-10-18"
  edition: "2026-10-19"
  entryNo: 2
  flags: []
  sources:
    - { title: "量子位报道", url: "https://www.qbitai.com/" }
    - { title: "VAST 官方 X / GitHub", url: "https://github.com/VAST-AI-Research/EdenLive" }
    - { title: "Hugging Face 权重页", url: "https://huggingface.co/VAST-AI/EdenLive" }
    - { title: "163 科技转载", url: "https://www.163.com/" }
---

## 发生了什么

VAST-AI 于 10 月 18 日发布并开源实时世界模型 EdenLive，代码开源于 github.com/VAST-AI-Research/EdenLive，权重在 huggingface.co/VAST-AI/EdenLive。核心规格是单张消费级显卡（RTX 5090）即可输出 720P、超过 24FPS 的实时画面；架构上延续其 Project Eden 的「状态与渲染解耦」思路——世界状态与交互规则由上游交互系统维护，EdenLive 只承担实时渲染呈现，因此支持状态存档、多人及多智能体并发。

## 为什么值得关注

世界模型此前最大的落地障碍是「只能在演示机/云上跑」，本条把它压到单张 5090，等于给了本地 Agent 一个可自托管的可交互环境；而「状态在外、渲染在内」的分工正好补上台账里 AgentGarten 论文（10-11）留的缺口——练习世界的状态可以由符号系统精确控制，模型只负责观感，评估结果因此更可复现。与本期 5（FlagOS 2.2 把世界模型列为具身智能底座）、7（混元记忆层开源）合看，「世界模型 + 记忆 + 端侧算力」这条链在同一周内被补齐。

## 来源

- [量子位报道](https://www.qbitai.com/)
- [VAST 官方 X / GitHub](https://github.com/VAST-AI-Research/EdenLive)
- [Hugging Face 权重页](https://huggingface.co/VAST-AI/EdenLive)
- [163 科技转载](https://www.163.com/)

<!--meta-->

方向：AI Multimedia ｜ 细分：世界模型、开源 ｜ 事件日期：2026-10-18 ｜ 涉及主体：VAST、腾讯、智源FlagOS ｜ 收录于：[2026-10-19 日报]({{< ref "/editions/2026-10-19.md" >}})
