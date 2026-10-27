/* Learning support is self-authored; original questions and saved records stay separate. */
knowledgeTopics.push(...learnerSupport.topics);
knowledgeCases.push(...learnerSupport.cases);
Object.assign(knowledgeFuture.find(f=>f.id==='winemaking'),{added:true,status:'正文与自编自查已收录',summary:'第7–10章：通用工艺 → 白／甜 → 红／桃红 → 成本与价格。已有12个自查主题与2个跨主题情境；原练习册第5、6页仍待提供。'});
let learnerLastMapRoute='';
function learnerMapRoute(){const route=location.hash;if(route===learnerLastMapRoute)return;learnerLastMapRoute=route;const match=route.match(/^#map\/chapter\/(4|5|6|7|8|9|10)$/);if(match)knowledgeMapFilter={stage:'all',session:match[1],state:'all',query:''};}
function learnerChapterPractice(ch){return `<a href="#map/chapter/${ch}">第 ${ch} 章 · 解释与应用自查 →</a>`;}
function learnerPracticeSection(){return `<section class="learner-practice"><div class="eyebrow">EXPLAIN IT YOURSELF</div><h2>第 7–10 章 · 自编解释练习</h2><p>先不看材料，写出原因、比较与情境判断，再展开提示核对。共12个主题、36项自查，另有2个跨主题情境；属于自评，不自动判分。</p><div class="learner-chapters">${[7,8,9,10].map(ch=>`<article><h3>第 ${ch} 章 · ${bookChapters.find(c=>c.id===ch).short||bookChapters.find(c=>c.id===ch).title}</h3><p>${learnerSupport.topics.filter(t=>t.chapter===ch).length} 个自查主题</p>${learnerChapterPractice(ch)}</article>`).join('')}</div><p class="fine">这里是根据现有正文整理的自编练习。机构练习册第5、6页尚未收到，收到后将按原题另行整理。</p></section>`;}
function learnerStartView(){return `<main id="main" class="wrap learner-start"><a class="back" href="#home">← 返回章节目录</a><header class="page-intro"><div class="eyebrow">START WITH THE QUESTION</div><h1 class="page-title"><span>第一次来，</span><span>从这里开始</span></h1><p>每节都要能回答：对象是什么，为什么变化，在什么条件下怎样选，最后带来什么结果。</p><p class="fine">当前学习范围为已提供课本第4–10章（p.30–102）及配套讲义与课堂转写。本站是个人学习整理，不是完整的 WSET Ⅲ 课程。</p></header><section><h2>顺着这条线读</h2><ol class="learner-path">${[
 [4,'先认清葡萄藤','分开多年生木、一年生木与当年新梢。结论：葡萄长在当年新梢上，新梢通常由一年生木上的芽长出。'],
 [5,'理解成熟需要什么','用光、热、水与养分解释糖、酸与风味；每种条件都有不足、适量和过量的区别。'],
 [6,'把条件变成管理选择','种植者通过留芽、冠层、负载、防病和采收回应环境，兼顾成熟、产量与成本。'],
 [7,'认识酿造的共用工具','按原料→处理→发酵→陈年／混合→稳定与包装理解。去梗、浸皮、MLF、橡木等须看目标决定。'],
 [8,'应用到白葡萄酒与甜酒','比较保护果香或增加质感的选择；分清浓缩原料糖分与最终保留残糖。'],
 [9,'应用到红葡萄酒与桃红','抓住皮汁接触、提取和分离时间，再判断整串、酒帽、陈年及桃红的不同路线。'],
 [10,'解释每瓶成本与最终售价','把投入和可销售产量一起算，再分开生产成本、渠道、税与市场力量。']
 ].map(([ch,title,body])=>`<li><div><small>第 ${ch} 章</small><h3><a href="#chapter/${ch}">${title} →</a></h3><p>${body}</p></div></li>`).join('')}</ol></section><section><h2>每个单元怎样学</h2><ol><li>先读开头的问题，带着问题看正文、图和图注；遇到不懂的词，用顶部搜索定位具体段落。</li><li>合上正文，用笔记写一句结论，再补“因为……所以……；但如果……就……”。例如：旧桶木香少，仍可缓慢接氧，所以不能把没有桶味等同于没有氧气影响。</li><li>进入本章自查，先写解释，再看提示，确认能解释、比较与应用后保存。勾选已读只记录阅读，不自动认定掌握。</li><li>到“练习与复习”写原练习册答案。隔一段时间再独立回答；答不出时回到对应段落，而不是只重看目录。</li></ol><p class="fine">笔记、作答和自查仅保存在当前浏览器，不跨设备同步。保存失败时页面会提示，重要答案可另行复制备份。</p></section><section><h2>先分清这六组词</h2><div class="learner-terms">${[
 ['干型、甜度与涩感','干型描述残糖很少；甜度与糖有关。涩感主要与单宁有关，两者不是同一感受，果香浓也不代表酒甜。','#read/7/fermentation/book-7-fermentation-4'],
 ['酸度、单宁与酒体','酸度带来酸感与清新感；单宁可带来口腔干涩感；酒体是整体轻重饱满的感觉，受酒精、糖等多种因素影响。','#read/7/fermentation/book-7-fermentation-6'],
 ['潜在酒精度与实际酒精度','潜在酒精度按葡萄糖量估计可发酵出的酒精；实际酒精度取决于有多少糖真正发酵、是否中断及其他工艺。高糖原料仍可能留下大量残糖。','#read/7/adjustments/book-7-adjustments-1'],
 ['一类、二类与三类香气','一类来自葡萄与酒精发酵；二类与后续酿造影响有关，如酒泥、MLF、橡木；三类随熟化与陈年发展。按来源分类，不是从低到高的品质等级。','#read/7/oxygen/book-7-oxygen-1'],
 ['酒精发酵与 MLF','酒精发酵由酵母把糖转成酒精等物质；苹果酸—乳酸转化由乳酸菌改变酸。是否干型与是否做了MLF是两个判断。','#read/7/fermentation/book-7-fermentation-5'],
 ['浓郁、复杂与品质','浓郁描述强度，复杂描述可辨别风味的多样性；品质还需综合平衡、余味等因素。颜色深、桶味重、价格高都不能单独证明品质好。','#read/9/extraction/book-9-extraction-5']
 ].map(([title,text,href])=>`<article><h3>${title}</h3><p>${text}</p><a href="${href}">回到具体解释 →</a></article>`).join('')}</div><p class="fine">香气分类已核对 <a href="${learnerSupport.aromaSource}" target="_blank" rel="noopener">WSET Level 3 Wine-Lexicon（2022，第2页）</a>。这里仅解释阅读所需术语；系统品鉴训练与实际品酒判断仍需另学。</p></section><section id="learner-source-status"><h2>目前还差哪些资料</h2><ul><li><strong>机构练习册第5、6页原题：</strong>尚未提供；现在可先做酿造自编自查，不能把它算作原练习册完成。</li><li><strong>机构参考答案／评分细则：</strong>现有原练习册已保留8道题和品种填写表，但未收到机构答案。站内思路提示不是官方评分标准。</li><li><strong>原课堂音频中的待辨片段：</strong>目前依据三份新课Word转写及前两课转写整理，未核听原音频。个别专名、数字和法规语句仍不清；有明确课本依据的原理已写入，具体疑点见各章核对页。</li></ul><p>产区专章、起泡酒／加强酒专章以及系统品鉴训练不在本批第4–10章资料范围内；正文中的相关例子不等于已学完整专题。</p><details><summary>查看逐章资料去向与待确认记录</summary><div class="learner-review-links">${bookChapters.map(ch=>`<a href="#review/${ch.id}">第 ${ch.id} 章核对记录 ↗</a>`).join('')}</div></details></section><div class="learner-actions"><a class="primary" href="#read/4/structure">从葡萄藤结构开始 →</a><a href="#practice">查看练习安排 →</a></div></main>`;}
