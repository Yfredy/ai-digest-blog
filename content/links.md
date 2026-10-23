---
title: "资源"
slug: "links"
description: "做每日核实时优先使用的一手来源清单"
Summary: "一手来源清单：官方 changelog、模型托管、评测基准与权威媒体"
weight: 70
---

检索时按「官方一手 → 模型仓库与论文 → 权威媒体 → 从业者一手发言」的顺序取证，同一事件至少两个独立来源才收录。

## 厂商官方与变更日志

- [GitHub Changelog](https://github.blog/changelog/) —— Copilot 模型上下线、Agent 能力转正式的主要依据。
- [Microsoft Command Line Blog](https://commandline.microsoft.com/) / [Windows Experience Blog](https://blogs.windows.com/windowsexperience/) —— Windows 端侧模型与 Agent 沙箱。
- [Azure AI Foundry 博客](https://techcommunity.microsoft.com/blog/azure-ai-foundry-blog) —— 开源权重上架云目录的时间点。
- [Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/) 与 [Entra Agent ID 文档](https://learn.microsoft.com/entra/agent-id/) —— Agent 身份与治理。
- [OpenAI News](https://openai.com/news/) 与 [ChatGPT Release Notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) —— 应用层与模型档位变化。
- [Anthropic News](https://www.anthropic.com/news) 与 [Claude Code Docs](https://docs.anthropic.com/) —— 发布与威胁情报报告。
- [xAI News](https://x.ai/news) 与 [Grok Bot Changelog](https://x.ai/changelog/bot) —— Grok 系列与语音/视频模型。
- [Google DeepMind Blog](https://deepmind.google/discover/blog/) 与 [The Keyword](https://blog.google/technology/ai/) —— Gemini 系。
- [Meta AI Blog](https://ai.meta.com/blog/) 与 [PyTorch Blog](https://pytorch.org/blog/) —— Muse/Llama 系与训练推理链路。
- [NVIDIA Developer Blog](https://developer.nvidia.com/blog/) —— Nemotron、端侧硬件与软件栈。
- [ServiceNow Newsroom](https://newsroom.servicenow.com/) —— 企业 Agent 治理组件。

## 开源权重与数据托管

- [Hugging Face Blog](https://huggingface.co/blog) / [HF Papers](https://huggingface.co/papers) / [模型仓库](https://huggingface.co/models) —— 权重发布、许可证与首日工具链支持。
- [ModelScope 魔搭](https://modelscope.cn/) —— 国内权重分发的对照来源。
- [GitHub Trending / Releases](https://github.com/releases) —— 沙箱、Agent 运行时等基础设施项目。

## 论文、评测与算力

- [arXiv cs.CL](https://arxiv.org/list/cs.CL/recent) / [cs.SD](https://arxiv.org/list/cs.SD/recent) / [eess.AS](https://arxiv.org/list/eess.AS/recent) —— 语音与语言方向预印本。
- [Artificial Analysis](https://artificialanalysis.ai/) —— 模型与 TTS/语音榜单的第三方口径。
- [OpenRouter](https://openrouter.ai/models) —— 实际调用价格与上下文长度对照。
- [SemiAnalysis](https://www.semianalysis.com/) / [Epoch AI](https://epoch.ai/data) —— 算力、数据中心与训练成本。

## 政策、安全与财经

- [NIST](https://www.nist.gov/) / [FTC](https://www.ftc.gov/news-events) / [美国国会](https://www.congress.gov/) —— 标准与监管动作。
- [欧盟委员会 AI Act 页面](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) —— 域外合规口径。
- [路透社 Technology](https://www.reuters.com/technology/) / [彭博](https://www.bloomberg.com/technology) / [FT](https://www.ft.com/technology) / 《华尔街日报》 —— 融资、并购与谈判类消息的可靠来源。
- [量子位](https://www.qbitai.com/) / [机器之心](https://www.jiqizhixin.com/) / [IT之家](https://www.ithome.com/) / [芯东西](https://zhidx.com/) / [财联社](https://www.cls.cn/) —— 国内发布、融资与产业政策的一手中文报道。

## 与 Agent 协作的入口

站点根目录同时输出 `index.json` 与 `llms.txt`（若已生成），可直接被抓取工具消费；仓库内 `data/digest-index.json` 是全部条目的结构化清单（方向、细分、主体、事件日期、期次、来源数量），适合批量分析。
