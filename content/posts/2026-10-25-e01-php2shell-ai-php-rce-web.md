---
title: "PHP2Shell：AI 参与发现的 PHP 核心 RCE，影响超三分之二 Web 服务器"
date: 2026-10-20T09:00:00+08:00
slug: 2026-10-25-e01-php2shell-ai-php-rce-web
tags: ["AI coding", "泛AI"]
categories: ["安全"]
entities: ["微软与GitHub", "OpenAI", "Google与Gemini", "腾讯"]
summary: "PHP 项目于 10 月 20 日预告安全版本，10 月 21 日公开并修复两个内存破坏型未认证远程代码执行漏洞 CVE-2026-109618 与 CVE-2026-109619（CVSS…"
weight: 999
params:
  kind: entry
  eventDate: "2026-10-20"
  edition: "2026-10-25"
  entryNo: 1
  flags: []
  sources:
    - { title: "Google Cloud 安全博客", url: "https://cloud.google.com/blog/products/identity-security/responding-to-core-php-vulnerabilities-cve-2026-109618-cve-2026-109619" }
    - { title: "Recorded Future", url: "https://www.recordedfuture.com/blog/php2shell-vulnerability-exploitation" }
    - { title: "CERT-EU 公告", url: "https://cert.europa.eu/publications/security-advisories/2026-018" }
    - { title: "LevelBlue", url: "https://www.levelblue.com/blogs/spiderlabs-blog/php2shell-critical-rce-vulnerabilities-affect-a-large-majority-of-web-servers" }
    - { title: "The Hacker News", url: "https://thehackernews.com/2026/10/urgent-php-warns-of-another-unpatched.html" }
---

## 发生了什么

PHP 项目于 10 月 20 日预告安全版本，10 月 21 日公开并修复两个内存破坏型未认证远程代码执行漏洞 CVE-2026-109618 与 CVE-2026-109619（CVSS v4.0 9.2），修复版本为 PHP 8.5.12、8.4.27、8.3.36、8.2.35；Wiz Research 称受影响面覆盖超过三分之二的 Web 服务器。Google 云安全博客确认 Gemini 4 Argon 在漏洞发现、利用代码开发、攻击检测与补丁验证四个环节都起了关键作用（第三方梳理称 Wiz 同时使用了 Gemini 4 Argon 与 GPT-5.6 Sol）。Cloudflare 在公开披露前约 9 小时先行部署了 WAF 规则；据 Wired 引 AWS 的分析，至少有一个攻击方在 10-17（公开前四天）就尝试利用。披露两天后，PHP 又警告第三个尚未修复的 RCE 风险 CVE-2026-115560。

## 为什么值得关注

台账里 AI 与安全的交集此前多停在「Agent 越权」（微软 agentic insider、CERT-In 通告、腾讯高德事件），本条是另一条路径——模型作为防守方的漏洞研究工具，直接压缩了从发现到利用的时间窗。对本机与生产环境的直接动作是盘点 PHP 版本；对做 AI coding 的团队，这条也说明「模型找漏洞」已经进入可交付 exploit 与补丁验证的工程阶段，而非演示。

## 来源

- [Google Cloud 安全博客](https://cloud.google.com/blog/products/identity-security/responding-to-core-php-vulnerabilities-cve-2026-109618-cve-2026-109619)
- [Recorded Future](https://www.recordedfuture.com/blog/php2shell-vulnerability-exploitation)
- [CERT-EU 公告](https://cert.europa.eu/publications/security-advisories/2026-018)
- [LevelBlue](https://www.levelblue.com/blogs/spiderlabs-blog/php2shell-critical-rce-vulnerabilities-affect-a-large-majority-of-web-servers)
- [The Hacker News](https://thehackernews.com/2026/10/urgent-php-warns-of-another-unpatched.html)

<!--meta-->

方向：AI coding / 泛AI ｜ 细分：安全 ｜ 事件日期：2026-10-20 ｜ 涉及主体：微软与GitHub、OpenAI、Google与Gemini、腾讯 ｜ 收录于：[2026-10-25 日报]({{< ref "/editions/2026-10-25.md" >}})
