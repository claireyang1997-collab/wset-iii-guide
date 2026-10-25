/* New course intake: textbook-first framework, independent of old chapter generators. */
function winemakingUnitBody(u){
 const section=(id,title,body)=>`<section class="article-section"><h2 id="${id}">${title}</h2>${body}</section>`;
 let html=`<p class="wm-orientation">${u.intro}</p>`;
 html+=u.sections.map((s,i)=>section(`book-${u.chapter}-${u.id}-${i+1}`,s.title,`<ul class="wm-topic-points">${s.points.map(p=>`<li>${p}</li>`).join('')}</ul>`)).join('');
 if(u.links.length)html+=`<nav class="wm-related" aria-label="相关知识"><strong>连起前后知识</strong><div>${u.links.map(l=>`<a href="#read/${l.route}">${l.label} →</a>`).join('')}</div></nav>`;
 if(u.figures.length)html+=`<details class="wm-figure-plan"><summary>配图清单 · ${u.figures.length} 项，待制作</summary><ul>${u.figures.map(f=>`<li>${f}</li>`).join('')}</ul></details>`;
 return html;
}
for(const ch of winemakingData.chapters)bookChapters.push({...ch,framework:true});
for(const u of winemakingData.units)bookUnits.push({...u,framework:true,origins:[],body:winemakingUnitBody(u)});
function bookChapterCover(ch){return ch.art?`<img src="${ch.art}" alt="${ch.artAlt}" loading="lazy" width="1536" height="1024"><span>${String(ch.id).padStart(2,'0')}</span>`:`<div class="wm-type-cover wm-cover-${ch.id}"><small>WINEMAKING NOTES</small><b>${String(ch.id).padStart(2,'0')}</b><div>${ch.cover.map(t=>`<span>${t}</span>`).join('')}</div></div>`;}
function bookChapterCard(ch){const us=bookUnits.filter(u=>u.chapter===ch.id),n=us.filter(bookUnitDone).length;return `<article class="book-chapter-card ${ch.framework?'wm-framework-card':''}"><a class="book-chapter-cover" href="#chapter/${ch.id}" aria-label="进入第 ${ch.id} 章：${ch.title}">${bookChapterCover(ch)}</a><div class="eyebrow">CHAPTER ${ch.id} · ${ch.en}</div><h2><a href="#chapter/${ch.id}">${ch.short||ch.title}</a></h2><p>${ch.desc}</p><small>课本 p.${ch.pages} · ${us.length} 个阅读单元${ch.framework?' · 框架预览':''}</small>${ch.framework?'':`<div class="book-progress"><span><i style="width:${n/us.length*100}%"></i></span><small>已读 ${n} / ${us.length}</small></div>`}<a class="primary" href="#chapter/${ch.id}">${ch.framework?'查看框架':'进入章节'} →</a></article>`;}
function winemakingStatus(chapter){return `<div class="wm-status"><span>框架预览</span><p>主题已归位，完整正文、课堂解释和配图待整合。</p><a href="#review/${chapter}">资料状态 →</a></div>`;}
function winemakingChapterAside(ch){const us=bookUnits.filter(u=>u.chapter===ch.id);return `<aside class="wm-chapter-guide" aria-label="本章学习顺序"><span class="eyebrow">CHAPTER ${String(ch.id).padStart(2,'0')}</span><p>这一章怎么读</p><ol>${ch.cover.map(t=>`<li>${t}</li>`).join('')}</ol><small>${us.length} 个阅读单元 · 配图按主题预留</small></aside>`;}
function winemakingCourseRecords(){return `<section class="wm-course-records"><div class="hub-section-head"><h2>新课记录</h2><span>线上课 3、4</span></div><div class="wm-course-grid">${winemakingData.courses.map(c=>`<article><small>${c.date} · ${c.time}</small><h3>${c.title}</h3><p>${c.teacher} · 课本第 ${c.chapters.join('、')} 章</p><p class="wm-assignment">作业：练习册第 ${c.workbookPage} 页 <span>待提供原题</span></p><div>${c.chapters.map(n=>`<a href="#chapter/${n}">第 ${n} 章框架 →</a>`).join('')}</div></article>`).join('')}</div></section>`;}
function winemakingReviewView(id){
 const ch=winemakingData.chapters.find(c=>c.id===Number(id));if(!ch)return '';
 const units=winemakingData.units.filter(u=>u.chapter===ch.id),figs=winemakingData.figures.filter(f=>f.routes.some(r=>r.startsWith(ch.id+'/'))),handouts=winemakingData.handoutMap.filter(h=>h.routes.some(r=>r.startsWith(ch.id+'/')));
 const unitLink=route=>{const u=winemakingData.units.find(u=>`${u.chapter}/${u.id}`===route);return u?`<a href="#read/${route}">${u.title} →</a>`:'';};
 return `<main id="main" class="wrap book-review wm-review"><a class="back" href="#chapter/${ch.id}">← 返回第 ${ch.id} 章</a>
 <div class="page-intro"><div class="eyebrow">CHAPTER ${ch.id} · INTAKE RECORD</div><h1 class="page-title">资料与配图进度</h1><p>第 ${ch.id} 章 · ${ch.title} · 课本 p.${ch.pages}</p></div>
 <div class="wm-review-status"><strong>当前：章节框架</strong><p>已搭好 ${units.length} 个阅读单元。导读用于认识结构，尚未完成逐页知识整合与完整性验收。</p></div>
 <section><h2>资料状态</h2><dl class="wm-source-list">
 <div><dt>课本</dt><dd>第 62–102 页共 ${winemakingData.intake.uniquePages} 页已收齐，第 63、97 页已补入。全批 ${winemakingData.intake.photos} 张照片中，p.68 重复，编号 179 未拍到课本。</dd></div>
 <div><dt>讲义</dt><dd>收到 ${winemakingData.intake.handoutPhotos} 张，印刷页 p.39–65，幻灯片 145–240。主题已对应到章节，详细内容与配图待整合。</dd></div>
 <div><dt>课堂转写</dt><dd>收到 3 份 Word 转写，已提取文字；分段归位、术语与例子待核对。未收到原始音频，未核听。</dd></div>
 <div><dt>练习册</dt><dd>第 5、6 页原题待提供。</dd></div></dl></section>
 <section><h2>课本主题去向</h2><div class="comparison-wrap"><table class="comparison wm-review-table"><thead><tr><th>课本页</th><th>阅读单元</th><th>状态</th></tr></thead><tbody>${units.map(u=>`<tr><td>p.${u.pages}</td><td>${unitLink(`${u.chapter}/${u.id}`)}</td><td>框架预览</td></tr>`).join('')}</tbody></table></div></section>
 <details class="review-fold"><summary>讲义主题去向 · ${handouts.length} 张</summary><div class="comparison-wrap"><table class="comparison wm-review-table"><thead><tr><th>讲义页</th><th>主题</th><th>对应单元</th></tr></thead><tbody>${handouts.map(h=>`<tr><td>p.${h.page}</td><td>${h.topic}${h.duplicateOfPage?'；重复图仅保留一份规划':''}</td><td>${h.routes.filter(r=>r.startsWith(ch.id+'/')).map(unitLink).join('<br>')}</td></tr>`).join('')}</tbody></table></div></details>
 ${figs.length?`<section><h2>课本编号配图 · ${figs.length} 组</h2><ul class="wm-figure-list">${figs.map(f=>`<li><strong>${f.title}</strong><span>已定位，尚未制作</span></li>`).join('')}</ul><p class="fine">讲义流程图与对照图也已列入各阅读单元的配图清单，待指定后制作。</p></section>`:''}
 <details class="review-fold"><summary>本批转写文件</summary><ul>${winemakingData.intake.transcripts.map(t=>`<li>${t}</li>`).join('')}</ul><p>接收与框架记录不等同于完整内容验收。</p></details></main>`;
}
