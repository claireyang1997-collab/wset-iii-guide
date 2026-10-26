/* Integrated textbook, handout and teaching transcript chapter content. */
function wmEscape(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function wmTable(t){return `<div class="comparison-wrap wm-table-wrap"><table class="comparison wm-content-table"><thead><tr>${t.headers.map(h=>`<th scope="col">${wmEscape(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map((v,i)=>i===0?`<th scope="row">${wmEscape(v)}</th>`:`<td>${wmEscape(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function wmFlow(f){return `<figure ${f.id?`id="wmfig-${wmEscape(f.id)}"`:""} class="wm-flow" data-wm-figure="flow"><div class="wm-flow-lanes">${f.lanes.map(l=>`<div class="wm-flow-lane"><strong>${wmEscape(l.label)}</strong><ol>${l.steps.map(step=>`<li>${wmEscape(step)}</li>`).join('')}</ol></div>`).join('')}</div>${f.caption?`<figcaption>${wmEscape(f.caption)}</figcaption>`:''}</figure>`;}
function winemakingUnitBody(u){
 let html=`<p class="wm-orientation">${wmEscape(u.intro)}</p>`;
 html+=u.sections.map((s,i)=>`<section class="article-section wm-content-section"><h2 id="book-${u.chapter}-${u.id}-${i+1}">${wmEscape(s.title)}</h2>${(s.paragraphs||[]).map(p=>`<p>${wmEscape(p)}</p>`).join('')}${s.table?wmTable(s.table):''}${s.flow?wmFlow(s.flow):''}${s.photoFigure?wmPhotoFigure(s.photoFigure):''}${s.diagram?wmDiagram(s.diagram):''}${s.points?.length?`<ul class="wm-topic-points">${s.points.map(p=>`<li>${wmEscape(p)}</li>`).join('')}</ul>`:''}</section>`).join('');
 if(u.links.length)html+=`<nav class="wm-related" aria-label="相关知识"><strong>相关主题</strong><div>${u.links.map(l=>`<a href="#read/${l.route}">${wmEscape(l.label)} →</a>`).join('')}</div></nav>`;
 return html;
}
for(const ch of winemakingData.chapters)bookChapters.push({...ch,framework:false});
for(const u of winemakingData.units)bookUnits.push({...u,framework:false,origins:[],body:winemakingUnitBody(u)});
function bookChapterCover(ch){return `<img src="${ch.art}" alt="${ch.artAlt}" loading="lazy" width="1536" height="1024"><span>${String(ch.id).padStart(2,'0')}</span>`;}
function bookChapterCard(ch){const us=bookUnits.filter(u=>u.chapter===ch.id),n=us.filter(bookUnitDone).length;return `<article class="book-chapter-card ${ch.framework?'wm-framework-card':''}"><a class="book-chapter-cover" href="#chapter/${ch.id}" aria-label="进入第 ${ch.id} 章：${ch.title}">${bookChapterCover(ch)}</a><div class="eyebrow">CHAPTER ${ch.id} · ${ch.en}</div><h2><a href="#chapter/${ch.id}">${ch.short||ch.title}</a></h2><p>${ch.desc}</p><small>课本 p.${ch.pages} · ${us.length} 个阅读单元</small>${ch.framework?`<div class="book-progress wm-card-status"><small>框架预览</small><small>正文整理中</small></div>`:`<div class="book-progress"><span><i style="width:${n/us.length*100}%"></i></span><small>已读 ${n} / ${us.length}</small></div>`}<a class="primary" href="#chapter/${ch.id}">进入章节 →</a></article>`;}
function winemakingCourseRecords(){return `<section class="wm-course-records"><div class="hub-section-head"><h2>新课记录</h2><span>线上课 3、4</span></div><div class="wm-course-grid">${winemakingData.courses.map(c=>`<article><small>${c.date} · ${c.time}</small><h3>${c.title}</h3><p>${c.teacher} · 课本第 ${c.chapters.join('、')} 章</p><p class="wm-assignment">作业：练习册第 ${c.workbookPage} 页 <span>待提供原题</span></p><div>${c.chapters.map(n=>`<a href="#chapter/${n}">第 ${n} 章 →</a>`).join('')}</div></article>`).join('')}</div></section>`;}
function winemakingReviewView(id){
 const ch=winemakingData.chapters.find(c=>c.id===Number(id));if(!ch)return '';
 const units=winemakingData.units.filter(u=>u.chapter===ch.id),figs=winemakingData.figures.filter(f=>f.routes.some(r=>r.startsWith(ch.id+'/'))),handouts=winemakingData.handoutMap.filter(h=>h.routes.some(r=>r.startsWith(ch.id+'/')));
 const unitLink=route=>{const u=winemakingData.units.find(u=>`${u.chapter}/${u.id}`===route);return u?`<a href="#read/${route}">${u.title} →</a>`:'';};
 const figureLink=f=>`#read/${f.routes[0]}/wmfig-${['9.1','9.2'].includes(f.number)?'9-1-2':f.number.replace('.','-')}`;
 const lectureFigs=(winemakingData.lectureFigures||[]).filter(f=>f.route.startsWith(ch.id+'/'));
 return `<main id="main" class="wrap book-review wm-review"><a class="back" href="#chapter/${ch.id}">← 返回第 ${ch.id} 章</a>
 <div class="page-intro"><div class="eyebrow">CHAPTER ${ch.id} · INTAKE RECORD</div><h1 class="page-title">资料与配图进度</h1><p>第 ${ch.id} 章 · ${ch.title} · 课本 p.${ch.pages}</p></div>
 <div class="wm-review-status"><strong>课本、讲义与课堂转写已整合</strong><p>本章 ${units.length} 个阅读单元，按主题合并重复讲解，保留工艺、条件、数字与实例。下表可回到对应正文。</p></div>
 <section><h2>资料状态</h2><dl class="wm-source-list">
 <div><dt>课本</dt><dd>第 62–102 页共 ${winemakingData.intake.uniquePages} 页已收齐，第 63、97 页已补入。全批 ${winemakingData.intake.photos} 张照片中，p.68 重复，编号 179 未拍到课本。</dd></div>
 <div><dt>讲义</dt><dd>收到 ${winemakingData.intake.handoutPhotos} 张，印刷页 p.39–65，幻灯片 145–240。已按主题融入正文，流程与机制图放在对应段落。</dd></div>
 <div><dt>课堂转写</dt><dd>收到 3 份 Word 转写，教学内容已按主题整合。未收到原始音频，未核听；转写中的含混处不作确定事实。</dd></div>
 <div><dt>练习册</dt><dd>第 5、6 页原题待提供。</dd></div></dl></section>
 <section><h2>课本主题去向</h2><div class="comparison-wrap"><table class="comparison wm-review-table"><thead><tr><th>课本页</th><th>阅读单元</th><th>状态</th></tr></thead><tbody>${units.map(u=>`<tr><td>p.${u.pages}</td><td>${unitLink(`${u.chapter}/${u.id}`)}</td><td>已整合</td></tr>`).join('')}</tbody></table></div></section>
 <details class="review-fold"><summary>讲义主题去向 · ${handouts.length} 张</summary><div class="comparison-wrap"><table class="comparison wm-review-table"><thead><tr><th>讲义页</th><th>主题</th><th>对应单元</th></tr></thead><tbody>${handouts.map(h=>`<tr><td>p.${h.page}</td><td>${h.topic}${h.duplicateOfPage?'；重复图合并到同一解释':''}</td><td>${h.routes.filter(r=>r.startsWith(ch.id+'/')).map(unitLink).join('<br>')}</td></tr>`).join('')}</tbody></table></div></details>
 ${figs.length?`<section><h2>课本编号配图 · ${figs.length} 组</h2><ul class="wm-figure-list">${figs.map(f=>`<li><strong><a href="${figureLink(f)}">${f.title} →</a></strong><span>对应主题图解</span></li>`).join('')}</ul><p class="fine">流程图区分必经步骤与可选选择；结构图标出对象、作用与去向。</p></section>`:''}
 ${lectureFigs.length?`<section><h2>讲义趋势图</h2><ul class="wm-figure-list">${lectureFigs.map(f=>`<li><a href="#read/${f.route}/wmfig-${f.id}">${f.title} →</a><span>定性示意，非实测曲线</span></li>`).join('')}</ul></section>`:''}
 <details class="review-fold"><summary>资料中的差异与待确认项</summary><ul><li>讲义中的简化说法不作为固定规则：发酵并非一到 15% 酒精就停止；红酒苹果酸乳酸转化按主流做法讲解，不能脱离风格一概而论。</li><li>脱酸依据课本的碱性物质原理；讲义中与此不符的名称未直接照录。橡木香精的适用法规未核实，不作为通用工艺建议。</li><li>课堂关于二氧化硫敏感与食物用量的延伸说法未经独立确认，未作为医学或剂量结论。合作社也不等同于政府机构或低品质生产者。</li></ul></details><details class="review-fold"><summary>本批转写文件</summary><ul>${winemakingData.intake.transcripts.map(t=>`<li>${t}</li>`).join('')}</ul><p>原始音频与练习册第 5、6 页仍待提供。</p></details></main>`;
}
