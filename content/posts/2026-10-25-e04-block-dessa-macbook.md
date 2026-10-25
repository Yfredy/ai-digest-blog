---
title: "Block 发布 Dessa：纯语音训练的全双工语音模型，可在 MacBook 本地运行"
date: 2026-10-24T09:00:00+08:00
slug: 2026-10-25-e04-block-dessa-macbook
tags: ["AI Audio"]
categories: ["语音", "全双工"]
entities: ["OpenAI", "xAI与Grok", "NVIDIA"]
summary: "Jack Dorsey 的 Block 于 10 月 24 日发布 Dessa，一个全双工（边说边听）、语音到语音的对话模型：训练语料只有人类对话音频，不经过文本 token，因此保留语气、停…"
weight: 996
params:
  kind: entry
  eventDate: "2026-10-24"
  edition: "2026-10-25"
  entryNo: 4
  flags: []
  sources:
    - { title: "The Verge", url: "https://www.theverge.com/ai-artificial-intelligence/1017906/jack-dorsey-block-dessa-ai-voice-speech" }
    - { title: "Gizmodo", url: "https://gizmodo.com/check-out-the-many-uncanny-human-ish-voices-from-blocks-new-ai-model-2000830237" }
    - { title: "Techmeme", url: "https://www.techmeme.com/261024/p5" }
---

## 发生了什么

Jack Dorsey 的 Block 于 10 月 24 日发布 Dessa，一个全双工（边说边听）、语音到语音的对话模型：训练语料只有人类对话音频，不经过文本 token，因此保留语气、停顿与打断等副语言信息。官方称训练用了单台 NVIDIA GB200 NVL72 机架，模型可在 MacBook Pro M4 Max 及以上的本地硬件上运行；首批访问开放给安全研究者，尚未公布开源权重与定价。

## 为什么值得关注

现有语音 Agent 的主流做法是「ASR→LLM→TTS」，Dessa 把链路压成一段音频到音频的生成，延迟与轮次切换是它的核心卖点，本地可跑则意味着隐私敏感场景（医疗、客服录音）可以不走云。对照台账 10-14 的 Grok Voice 3.0（语音对语音指数 86.9）与 10-16 的 GPT-Live-1.1（13 音色/7 语言），语音这条线正从「音色更多」转向「交互更接近真人」；Dessa 的开放程度仍是变量。

## 来源

- [The Verge](https://www.theverge.com/ai-artificial-intelligence/1017906/jack-dorsey-block-dessa-ai-voice-speech)
- [Gizmodo](https://gizmodo.com/check-out-the-many-uncanny-human-ish-voices-from-blocks-new-ai-model-2000830237)
- [Techmeme](https://www.techmeme.com/261024/p5)

<!--meta-->

方向：AI Audio ｜ 细分：语音、全双工 ｜ 事件日期：2026-10-24 ｜ 涉及主体：OpenAI、xAI与Grok、NVIDIA ｜ 收录于：[2026-10-25 日报]({{< ref "/editions/2026-10-25.md" >}})
