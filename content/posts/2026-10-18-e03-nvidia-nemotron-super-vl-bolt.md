---
title: "【补录 10-15～16】NVIDIA 开源 Nemotron 3.5 双模型：Super VL 120B 与 Bolt 74B"
date: 2026-10-15T09:00:00+08:00
slug: 2026-10-18-e03-nvidia-nemotron-super-vl-bolt
tags: ["AIOS", "泛AI"]
categories: ["开源权重", "端侧"]
entities: ["NVIDIA"]
summary: "NVIDIA 在 10 月 15 日发布、16 日经官方博客铺开两款开放模型：Nemotron 3.5 Super VL（120B 总参/12B 激活的视觉-语言模型，1M 上下文，面向服务器…"
weight: 997
params:
  kind: entry
  eventDate: "2026-10-15"
  edition: "2026-10-18"
  entryNo: 3
  flags: ["补录"]
  sources:
    - { title: "NVIDIA 开发者论坛发布公告", url: "https://forums.developer.nvidia.com/t/nvidia-nemotron-3-5-bolt-74b-a9b-24gb-and-nemotron-3-5-super-vl-120b-a12b-published-nvidias-new-general-purpose-models-especially-for-gb10/385978" }
    - { title: "ZDNet", url: "https://www.zdnet.com/innovation/nvidia-nemotron-3-5-super-vl-model-us-open-weight-ai/" }
    - { title: "技术细节梳理", url: "https://cellcog.ai/blog/nemotron-3-5-super-vl-bolt/" }
---

## 发生了什么

NVIDIA 在 10 月 15 日发布、16 日经官方博客铺开两款开放模型：Nemotron 3.5 Super VL（120B 总参/12B 激活的视觉-语言模型，1M 上下文，面向服务器端 Agent 与多模态任务）与 Nemotron 3.5 Bolt（74B 总参/9B 激活、256K 上下文、约 24GB 显存占用，专为 GB10/DGX Spark 级设备调优）。除权重外，数据集与训练配方一并开放，许可为 OpenMDW-1.1（真正的开放元数据/开放权重条款）。

## 为什么值得关注

同一家硬件厂商把「开放权重 + 数据 + 训练配方」三件套和 OpenMDW 许可一起给出，等于同时补上开源生态最难复现的两环；Bolt 的 24GB 规格与 4（RTX Spark 端侧机型）形成配套，意味着「端侧跑可用规模的 Agent 模型」开始有官方优化路径，而不是靠社区量化猜测。

## 来源

- [NVIDIA 开发者论坛发布公告](https://forums.developer.nvidia.com/t/nvidia-nemotron-3-5-bolt-74b-a9b-24gb-and-nemotron-3-5-super-vl-120b-a12b-published-nvidias-new-general-purpose-models-especially-for-gb10/385978)
- [ZDNet](https://www.zdnet.com/innovation/nvidia-nemotron-3-5-super-vl-model-us-open-weight-ai/)
- [技术细节梳理](https://cellcog.ai/blog/nemotron-3-5-super-vl-bolt/)

<!--meta-->

方向：AIOS / 泛AI ｜ 细分：开源权重、端侧 ｜ 事件日期：2026-10-15 ｜ 涉及主体：NVIDIA ｜ 标记：补录 ｜ 收录于：[2026-10-18 日报]({{< ref "/editions/2026-10-18.md" >}})
