---
title: "蚂蚁 inclusionAI 开源 Ming-3.0：五款语音模型覆盖 TTS/音频理解/ASR，MIT 许可"
date: 2026-10-19T09:00:00+08:00
slug: 2026-10-20-e02-inclusionai-ming-3.0-tts-asr-mit
tags: ["AI Audio", "泛AI"]
categories: ["开源权重"]
entities: ["蚂蚁inclusionAI", "阿里与Qwen", "FishAudio", "开源生态与研究"]
summary: "蚂蚁集团 inclusionAI（Ant Ling 团队）于 10 月 19 日开源 Ming-3.0 系列五款模型，横跨三个家族：Ming-3.0-tts-0.5B（稠密，主打声音设计与副语言线索控制）、Ming-3.0-tts-tiny（7.9B 总参/1.3B 激活）、Mi"
weight: 998
params:
  kind: entry
  eventDate: "2026-10-19"
  edition: "2026-10-20"
  entryNo: 2
  flags: []
  sources:
    - { title: "蚂蚁开源动态（Ant Ling X）", url: "https://x.com/AntLingAGI/status/2112210811997540475" }
    - { title: "vLLM day-0 支持", url: "https://x.com/vllm_project/status/2112220256941085002" }
    - { title: "inclusionAI HF 集合", url: "https://huggingface.co/inclusionAI/collections" }
    - { title: "AICoder 规格梳理", url: "https://aicoder.com/news/news-20261019-ant-ling-ming-3-0-open-source-speech-models" }
    - { title: "Artificial Analysis TTS 榜", url: "https://artificialanalysis.ai/text-to-speech/leaderboard/provider-voice" }
---

## 发生了什么

蚂蚁集团 inclusionAI（Ant Ling 团队）于 10 月 19 日开源 Ming-3.0 系列五款模型，横跨三个家族：Ming-3.0-tts-0.5B（稠密，主打声音设计与副语言线索控制）、Ming-3.0-tts-tiny（7.9B 总参/1.3B 激活）、Ming-3.0-audio-flash（126B 总参/6.5B 激活的 MoE 音频理解模型）、Ming-3.0-audio-tiny（9.3B/2.7B）与 Ming-3.0-asr-tiny（8.6B/2B，支持方言与口音、可用热词与上文对话做上下文 ASR）。许可为 MIT，权重在 Hugging Face 与 ModelScope，vLLM（vLLM-Omni）与 SGLang 提供 day-0 支持。据其自述与第三方榜单，tts-0.5B 在「受控语音」开源权重项排第一（约 1069 Elo）、发音鲁棒性 93.2%，asr-tiny 在四类 ASR 任务平均错误率 4.41%、覆盖 15 组方言集；Artificial Analysis 开源权重 TTS 榜上 Ming-3.0-tts 以约 1188 Elo 位列第三，前两位是 Fish Audio Drama 3 Preview（1247）与 Breeze TTS 2（1222）——注意 1069 与 1188 分属不同评测分项，不可直接比较。另需留意：有第三方指出 tts-0.5B 的权重早在 9 月 24 日即已上架 HF、10 月 19 日释出的是推理代码，官方未发公告。

## 为什么值得关注

这是本期 AI Audio 唯一的新发布，且一次补齐三类能力——上周 Fish Audio Drama 3（10-13～14）解决「开源表演级 TTS」，本条解决「开源大参数音频理解 + 可带热词/上文的 ASR」，而 MIT 许可 + vLLM/SGLang day-0 意味着可直接进生产链路。对做语音 Agent、字幕校对与方言语音的人，126B 音频理解模型开源是本期最实质的一步。

## 来源

- [蚂蚁开源动态（Ant Ling X）](https://x.com/AntLingAGI/status/2112210811997540475)
- [vLLM day-0 支持](https://x.com/vllm_project/status/2112220256941085002)
- [inclusionAI HF 集合](https://huggingface.co/inclusionAI/collections)
- [AICoder 规格梳理](https://aicoder.com/news/news-20261019-ant-ling-ming-3-0-open-source-speech-models)
- [Artificial Analysis TTS 榜](https://artificialanalysis.ai/text-to-speech/leaderboard/provider-voice)

<!--meta-->

方向：AI Audio / 泛AI ｜ 细分：开源权重 ｜ 事件日期：2026-10-19 ｜ 涉及主体：蚂蚁inclusionAI、阿里与Qwen、FishAudio、开源生态与研究 ｜ 收录于：[2026-10-20 日报]({{< ref "/editions/2026-10-20.md" >}})
