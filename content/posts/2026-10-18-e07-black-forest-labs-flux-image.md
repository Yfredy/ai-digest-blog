---
title: "【补录 10-15】Black Forest Labs 开源 FLUX 3 Image Klein：5.6B、8GB 显存可跑"
date: 2026-10-15T09:00:00+08:00
slug: 2026-10-18-e07-black-forest-labs-flux-image
tags: ["AI Multimedia"]
categories: ["开源"]
entities: ["BlackForestLabs", "阿里与Qwen"]
summary: "BFL 10 月 15 日发布 FLUX 3 Image Klein（10-16 被 VentureBeat、The Decoder 等报道）：5.6B 参数的开放权重图像模型，覆盖文生图、图…"
weight: 993
params:
  kind: entry
  eventDate: "2026-10-15"
  edition: "2026-10-18"
  entryNo: 7
  flags: ["补录"]
  sources:
    - { title: "BFL 官方博客", url: "https://bfl.ai/blog/flux-3-image-klein" }
    - { title: "VentureBeat", url: "https://venturebeat.com/technology/black-forest-labs-opens-flux-3-image-klein-weights-with-free-commercial-use-limited-to-smaller-businesses" }
    - { title: "The Decoder", url: "https://the-decoder.com/black-forest-labs-open-weights-image-model-flux-3-image-klein-runs-on-consumer-gpus-with-just-8-gb-of-vram/" }
---

## 发生了什么

BFL 10 月 15 日发布 FLUX 3 Image Klein（10-16 被 VentureBeat、The Decoder 等报道）：5.6B 参数的开放权重图像模型，覆盖文生图、图像编辑与多参考生成，单次最多接受 10 张参考图；门槛极低，官方与第三方实测在 8GB 显存消费级卡（RTX 4070 级）或 DGX Spark 上即可运行；许可为开放权重但免费商用设企业规模上限（VentureBeat 指出仅限较小企业免费商用）。

## 为什么值得关注

上周 Qwen-Image-2.1-Turbo（10-10）与本条构成同一趋势：高质量图像生成/编辑正在下沉到消费级显存与可自托管许可，而 FLUX 3 家族本身是多模态（图/视频/音频联合训练）路线，Klein 是它的开放权重入口，对做本地素材管线与图像编辑 Agent 的人是最直接可用的一块。

## 来源

- [BFL 官方博客](https://bfl.ai/blog/flux-3-image-klein)
- [VentureBeat](https://venturebeat.com/technology/black-forest-labs-opens-flux-3-image-klein-weights-with-free-commercial-use-limited-to-smaller-businesses)
- [The Decoder](https://the-decoder.com/black-forest-labs-open-weights-image-model-flux-3-image-klein-runs-on-consumer-gpus-with-just-8-gb-of-vram/)

<!--meta-->

方向：AI Multimedia ｜ 细分：开源 ｜ 事件日期：2026-10-15 ｜ 涉及主体：BlackForestLabs、阿里与Qwen ｜ 标记：补录 ｜ 收录于：[2026-10-18 日报]({{< ref "/editions/2026-10-18.md" >}})
