---
title: "Meta 开源 Muse Spark Open：816B/42B、1M 上下文的美国最强开源权重模型"
date: 2026-10-16T09:00:00+08:00
slug: 2026-10-17-e01-meta-muse-spark-open
tags: ["AI coding", "泛AI"]
categories: ["开源权重"]
entities: ["Meta", "NVIDIA", "Scaleway与AMD", "开源生态与研究"]
summary: "10 月 16 日 Meta（MSL）在 Hugging Face 以 Muse Model License 发布 Muse Spark Open 权重，总参数 816B、每 token 激活…"
weight: 999
params:
  kind: entry
  eventDate: "2026-10-16"
  edition: "2026-10-17"
  entryNo: 1
  flags: []
  sources:
    - { title: "PyTorch 官方博客", url: "https://pytorch.org/blog/muse-spark-open/" }
    - { title: "Hugging Face 模型卡", url: "https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B" }
    - { title: "The Guardian", url: "https://www.theguardian.com/technology/2026/oct/16/meta-releases-muse-spark-open-a-new-open-weight-ai-model" }
---

## 发生了什么

10 月 16 日 Meta（MSL）在 Hugging Face 以 Muse Model License 发布 Muse Spark Open 权重，总参数 816B、每 token 激活 42B，上下文 1M token，与商业版 Muse Spark 1.3 共享同一基座，并针对「脱离系统护栏单独部署」追加了安全后训练。模型原生多模态，官方明确其具备音频与音视频感知能力，主打编码与 Agent 长任务（多文件重构、子智能体编排、桌面/移动/浏览器统一的 computer use）。PyTorch 侧同步交付：SGLang/vLLM 支持、Helion 内核在 NVIDIA GB300 上取得 1.03–3.95 倍算子加速、在 AMD MI350 上端到端吞吐再提升约 3%，TorchTitan 首日提供多轮 SFT、LoRA 与 TitanRL 微调定义。

## 为什么值得关注

这是本轮窗口分量最重的一次供给变化——前沿实验室把可用旗舰级编码基座放进开源权重，且配套给了可直接投产的内核与后训练工具链，本地/私有化部署的 Agent 编码能力下限被整体抬高。此前 10-12 Meta 发布 Muse Wonder/Full 走的是纯闭源 API 路线（关联条目），Open 版等于同时打开了第二市场。

## 来源

- [PyTorch 官方博客](https://pytorch.org/blog/muse-spark-open/)
- [Hugging Face 模型卡](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B)
- [The Guardian](https://www.theguardian.com/technology/2026/oct/16/meta-releases-muse-spark-open-a-new-open-weight-ai-model)

<!--meta-->

方向：AI coding / 泛AI ｜ 细分：开源权重 ｜ 事件日期：2026-10-16 ｜ 涉及主体：Meta、NVIDIA、Scaleway与AMD、开源生态与研究 ｜ 收录于：[2026-10-17 日报]({{< ref "/editions/2026-10-17.md" >}})
