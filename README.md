# AI 前沿动态速递

每日 AI 领域重要动态的公开归档站：一条动态一个页面，可按方向、细分、涉及主体、期次与日期筛选，并保留当日完整成稿。

站点基于 **Hugo + PaperMod 主题**，托管在 GitHub Pages，由 GitHub Actions 构建。内容不是手抄进站点的，而是由脚本从 `../AI动态/AI动态-YYYY-MM-DD.md` 日报原文转换生成。

## 目录结构

```
hugo.yaml                     站点配置（中文、时区、taxonomy、8 项导航、PaperMod params）
content/
  _index.md                   首页
  library.md                  动态库（layout: library，多维筛选）
  search.md                   搜索（PaperMod search，读 /index.json）
  archives.md                 归档（按日期）
  about.md  links.md          关于 / 资源
  posts/                      82 篇条目页（脚本生成，勿手改）
  editions/                   10 期日报页（脚本生成，勿手改）
layouts/
  library.html                动态库页模板
  edition.html                日报页模板（要点、各方向小结、本期条目）
  _partials/home_info.html    首页 Hero + 统计 + 方向卡片 + 最新条目
  _partials/extend_head.html  仅在动态库页注入 library.js
  _partials/extend_post_content.html  条目页右侧「条目档案」面板
assets/css/extended/zz-editorial.css   自定义样式（只用主题 CSS 变量）
static/js/library.js          客户端筛选（DOM 属性 + URL hash 可分享状态）
static/data/search-index.json 条目索引（供外部复用）
data/                         directions.json / entities.json / digest-index.json
scripts/
  build-content.mjs           日报 → content/ + data/ + static/data/
  verify-content.mjs          内容完整性门禁
  verify-templates.mjs        模板语法门禁
.github/workflows/hugo.yaml   校验 → 构建 Hugo 0.160.1 extended → 部署 Pages
themes/PaperMod               git submodule
```

## 常用命令

```bash
npm run content    # 重新转换日报（新增一天日报后必跑）
npm run verify     # 两道门禁：内容完整性 + 模板语法
npm run build      # 本地构建（需 hugo extended）
npm run serve      # 本地预览
```

`npm test` 等价于 `npm run verify`，CI 的 verify job 会先跑它，失败则不构建、不部署。

## 内容模型

日报里的每条 `## N. 标题` 转成一篇 post，front matter 含：

- `tags`：六个规范方向标签之一/多个（AI coding、Agent、AIOS、AI Audio、AI Multimedia、泛AI）
- `categories`：细分口径（治理、开源权重、芯片/算力…），由日报「方向标签」行的括号内容归一化而来
- `entities`：识别出的公司/产品/人物（标题命中优先，最多 4 个）
- `params.eventDate`：事件实际日期（区别于日报发布日期）
- `params.edition` / `entryNo` / `flags`（补录 / 后续进展 / 纠正）/ `sources`

正文固定三段：`## 发生了什么`、`## 为什么值得关注`、`## 来源`，结尾以 `{{< ref >}}` 链回本期日报。

## 门禁校验了什么

`verify-content.mjs`：baseURL 必须 https 且带尾斜杠；主题与 `.gitmodules` 存在；post 数 == 索引条目数 == 各期日报声明条目数；每条必须有事件日期、合法方向标签、`## 发生了什么`、`## 来源` 与来源链接；每个来源期次真实存在且 ref 匹配；每期的 `窗口` 字段存在，同一天 09:00→09:00 口径的期次做前后连续性校验；导航路由全部有对应模板或页面；仓库内不得出现 `.env`、私钥、token 类文件。

`verify-templates.mjs`：模板控制块开合配对、`{{`/`}}` 数量配对、被引用 partial 在 `layouts/_partials` 或主题内真实存在、禁用不存在的模板函数。

两道门禁都做过破坏性反证：故意改坏（删条目、改标签、断 ref、拆模板配对等）时全部报警。

## 部署

推送到 `main` 后 Actions 自动构建并发布。换域名或改子路径时，在仓库 Settings → Secrets and variables → Actions → Variables 里设置 `HUGO_BASE_URL`（同时把 `hugo.yaml` 的 `baseURL` 改成一致值，本地校验会检查尾斜杠与 https）。

## 已知边界

站点渲染效果以 Actions 构建产物为准；本仓库的两道门禁只保证内容与模板结构，不能替代一次真实的 `hugo --minify` 渲染。
