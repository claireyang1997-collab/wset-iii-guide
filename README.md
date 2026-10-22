# WSET Ⅲ 通关指南

葡萄酒期刊风格的个人学习站点，用于整理 WSET 三级课程讲义、课堂笔记与复习练习。

## 当前内容

Session 1：砧木与嫁接、繁殖与品种、葡萄藤年周期、生长条件与风险、气候与天气、地形与土壤。

Session 2：密度与整枝、冬剪与夏剪、搭架与冠层、产量与品质、风险与栽培方式、采收与贵腐。包含 14 页讲义覆盖索引、约 1 小时 40 分钟课堂转写的主题核对、差异与待核对记录，以及独立的阅读笔记与 8 道自编小测。

两课共十二个阅读单元，包含插画、知识地图、自测题、课程任务和待核对记录。

## 本地预览

站点是原生 HTML、CSS 与 JavaScript，无需安装依赖或构建。

```sh
python3 -m http.server 8000 --directory dist
```

在浏览器打开 http://localhost:8000 。也可以直接打开 `dist/index.html`。

## 文件结构

- `dist/index.html`：页面入口
- `dist/style.css`：版式与响应式样式
- `dist/app.js`：页面路由、阅读单元、自测与交互
- `dist/supplement.js`：Session 1 补充内容与来源索引
- `dist/session2.js`：Session 2 内容、目录、自测与来源索引
- `dist/assets/`：插画与图标

阅读进度、笔记与作业勾选保存在当前浏览器的 localStorage 中；不同浏览器与域名之间不自动同步。

## 内容维护

编辑 `dist/` 后刷新页面即可。补充新课程时应对照讲义和课堂记录逐项核查，保留来源标注，并将不确定内容标记为待核对。

本站为个人学习资料整理，非 WSET 官方网站。课程资料与相关商标的权利归各自权利人所有。原始讲义、录音及其完整转写不包含在本源码包中。考试要求应以报考时的官方及授课机构通知为准。


## Official textbook update · 2026-10-22

Supplied textbook pages 30–46 are integrated into Session 1; pages 47–61 into Session 2. Both source pages contain page-by-page and figure-by-figure indexes (22 original figure references). Content is paraphrased, with new teaching illustrations; original textbook photographs and transcripts are not published. Page 30 has been supplied and integrated into the Session 1 structure and roots units. External chapter references and unclear classroom audio remain unverified. Existing per-session progress and notes are preserved.

## Workbook
Four supplied blank workbook photographs are transcribed into separate Session 1 and 2 routes (#workbook/1 and #workbook/2). Session 1: four questions (16 marks), 16 white and 10 red varieties, four fields each. Session 2: four questions (20 marks), including four harvest scenarios. Original bilingual questions and marks are preserved. No answer key supplied; optional study prompts are labelled as supplemental, not official marking guidance. Answers use separate local-browser note keys.

## Integrated course structure
The homepage is a peer course index. #session1 and #session2 open equal course records; #practice opens a shared review hub. Each of the twelve reading units now combines textbook, handout and classroom knowledge by topic. Duplicate explanations are merged; distinctive examples, conditions, numerical details and terminology are retained. Source indexes and uncertain transcript fragments remain on separate audit pages. Legacy lesson/quiz/workbook routes and browser storage keys are preserved.

## Variety workbook editor
The 26 varieties use collapsed, searchable rows with empty/draft/completed states. Expand one to edit the original four fields, then save and close or save and continue. Inputs save drafts immediately. A complete marker requires all four nonblank fields and an explicit save; subsequent edits return the card to draft. Existing answer keys are preserved, completion metadata is stored separately with a value fingerprint, and failed saves keep the editor open with a copy-backup message. Progress and filters update without replacing active inputs. Answers remain local to the current browser.

## Knowledge logic map
The knowledge map is data-driven: 12 topics across two sessions, 36 targeted explain/compare/apply prompts and three four-stage cross-course reasoning cases. Reading, self-assessment and all 16 linked quiz answers remain distinct; none is presented as an official mastery score. Prerequisite gaps and wrong linked quiz answers guide the next review. Self-checks require written reasoning plus explicit confirmation; editing a response clears relevant confirmations. Drafts, checks and case reasoning use new local-storage keys, preserving existing lesson/workbook records. Failed writes retain a temporary in-page draft and show a retry/backup message. Future-course directions are marked as not added and excluded from current counts. Add topic/case records to map-data.js; session filters and totals derive from the registry.

## Typography and concise copy
Shared semantic type roles cover both courses, source guides, workbook and knowledge map: 16px reading text and answer inputs, 13px metadata, 14px controls, and consistent serif heading levels. Source indexes use native collapsible sections; course tasks remain visible. Repeated instructions and editorial filler are shortened while retaining topic details, numbers, conditions, examples, workbook prompts and storage keys.
