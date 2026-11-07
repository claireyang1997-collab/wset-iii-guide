/* Course hub and shared reading presentation. Historical source indexes remain separate. */
// Viewports reuse existing illustrations without repeating unrelated panels.
const courseFigureFocus={
 'shoot':['当年新梢：叶、卷须、花序与芽',[0,0,.333,.495]],
 'wood-bud':['一年生木上的芽',[.333,0,.251,.495]],
 'layering':['压条：枝条仍与母株相连',[.584,0,.416,.495]],
 'bench-graft':['室内嫁接：接穗与砧木接合',[0,.495,.333,.505]],
 'head-graft':['田间换接：保留既有主干与根系',[.333,.495,.251,.505]],
 'ripening':['红葡萄转色成熟与白葡萄成熟对照',[.584,.495,.416,.505]],
 'cutting':['扦插：剪下枝段后培育生根',[0,0,.5,1]],
 'seedling':['有性繁殖：授粉、种子与幼苗',[.5,0,.5,1]],
 'frost-protection':['防霜工具：加热器、风机与喷灌',[.336,.005,.328,.489]],
 'drip-irrigation':['滴灌：水进入根区',[.671,.005,.325,.489]],
 'hail-net':['防雹网：保护果区与叶片',[.004,.502,.328,.491]],
 'chlorosis':['黄化叶与健康叶对照',[.336,.502,.328,.491]],
 'new-vines':['建园设施与幼苗保护',[.671,.503,.325,.492]],
 'winter-bud':['休眠期与萌芽期对照',[0,0,.666,.48]],
 'head-spur':['头状整枝与短枝修剪',[.004,.004,.326,.454]],
 'head-cane':['头状整枝与替换长枝修剪',[.335,.004,.330,.454]],
 'cordon-spur':['主蔓整枝与短枝修剪',[.672,.004,.324,.454]],
 'vsp-compare':['VSP：直立冠层与顶梢下垂对比',[.004,.468,.326,.527]],
 'manual':['人工采收：剪取完整果串',[.335,.468,.330,.527]],
 'machine':['机械采收：收集脱落果粒',[.672,.468,.324,.527]],
 'dry-bush':['炎热干燥园地：低密度灌木形',[0,0,.498,1]],
 'wet-vsp':['温和多雨园地：高密度搭架',[.503,0,.497,1]],
 'graft-structure':['接穗、嫁接点与砧木',[0,0,1,1]],
 'needs-inputs':['葡萄藤的五个生长条件',[0,0,1,1]],
 'site-climate':['海拔、坡面、风与水体',[0,0,1,1]],
 'soil-water':['排水与保水的区别',[0,0,1,1]]
};
function courseFigureWindow(path,rect,alt,marks=[]){
 const [x,y,w,h]=rect;
 return `<div class="figure-window" style="aspect-ratio:${1.5*w/h}"><img loading="lazy" src="${path}" alt="${safe(alt)}" style="width:${100/w}%;left:${-100*x/w}%;top:${-100*y/h}%">${marks.map(([label,mx,my])=>`<span class="figure-mark" aria-hidden="true" style="left:${mx*100}%;top:${my*100}%">${label}</span>`).join('')}</div>`;
}
function courseFigure(key,caption,focus=''){
 const paths={botany:'assets/textbook-botany.webp',environment:'assets/textbook-environment.webp',management:'assets/textbook-management.webp',cases:'assets/textbook-cases.webp',latitude:'assets/textbook-latitude.svg',needs:'assets/needs-editorial.webp',cycle:'assets/cycle-editorial.webp',roots:'assets/roots-editorial.webp',propagation:'assets/propagation-editorial.webp',climate:'assets/climate-editorial.webp',soil:'assets/soil-editorial.webp'};
 if(focus==='year-cycle'){
  const stages=['① 冬眠','② 萌芽','③ 开花与坐果','④ 转色与成熟','⑤ 采收','⑥ 落叶'];
  return `<figure class="course-figure cycle-sequence" data-figure="${key}"><div class="figure-sequence">${stages.map((name,i)=>`<div class="figure-stage">${courseFigureWindow(paths[key],[i%3/3,Math.floor(i/3)/2,1/3,.5],name)}<strong>${name}</strong></div>`).join('')}</div><figcaption>${caption}</figcaption></figure>`;
 }
 const detail=courseFigureFocus[focus];
 return `<figure class="course-figure ${detail?'focused-figure':''}" data-figure="${key}"${focus?` data-focus="${focus}"`:''}>${detail?`<div class="figure-label">${detail[0]}</div>`+courseFigureWindow(paths[key],detail[1],detail[0]+'。'+caption,focus==='shoot'?[['①',.25,.61],['②',.89,.34],['③',.26,.32],['④',.56,.66]]:[]):`<img loading="lazy" src="${paths[key]}" alt="${caption}">`}<figcaption>${caption}</figcaption></figure>`;
}
function courseProgress(n){return `<div class="course-progress"><span aria-hidden="true"><i style="width:${n/6*100}%"></i></span><small>已读 ${n} / 6</small></div>`}
function courseHome(){const a=count(),b=s2Done().filter(id=>s2Units.some(u=>u.id===id)).length;return `<main id="main" class="wrap course-hub"><section class="hub-intro"><div><div class="eyebrow">THE WINE STUDY JOURNAL</div><h1><span>课程记录</span></h1><p>按课程学习，用知识地图和练习检查理解。</p></div><div class="hub-stat"><span>02</span><p>堂课程记录</p><small>12 个阅读单元 · 已读 ${a+b} / 12</small></div></section><div class="hub-section-head"><h2>课程目录</h2><span>按上课顺序</span></div><section class="course-records" aria-label="全部课程"><article class="course-record"><a class="course-record-art" href="#session1"><img src="assets/vineyard.webp" alt="秋日山坡上的葡萄园与酒庄"><span>SESSION 01</span></a><div class="course-record-content"><div class="course-date">2026.10.17 · 线上课</div><h2><a href="#session1">葡萄藤与生长环境</a></h2><p>葡萄藤结构与繁殖；环境对成熟、风格和品质的影响。</p><div class="course-topics">砧木与嫁接 · 繁殖与品种 · 年周期<br>生长条件 · 气候与天气 · 地形与土壤</div>${courseProgress(a)}<div class="course-record-actions"><a class="primary" href="#session1">进入第一课 ↗</a><a href="#workbook/1">练习册 ↗</a><a href="#quiz">自测 ↗</a></div></div></article><article class="course-record"><a class="course-record-art" href="#session2"><img src="assets/session2-management.webp" alt="葡萄藤冬季修剪与夏季冠层管理"><span>SESSION 02</span></a><div class="course-record-content"><div class="course-date">2026.10.18 · 线上课</div><h2><a href="#session2">葡萄园管理</a></h2><p>从种植到采收，理解管理方法、适用条件与成本。</p><div class="course-topics">密度与整枝 · 冬剪与夏剪 · 搭架与冠层<br>产量与品质 · 风险与栽培方式 · 采收与贵腐</div>${courseProgress(b)}<div class="course-record-actions"><a class="primary" href="#session2">进入第二课 ↗</a><a href="#workbook/2">练习册 ↗</a><a href="#session2quiz">自测 ↗</a></div></div></article></section><section class="hub-review"><div><div class="eyebrow">CONNECT & RECALL</div><h2>复习与自查</h2></div><p>用知识地图梳理因果，用练习检查理解。</p><div><a href="#map">查看知识地图 ↗</a><a href="#practice">进入练习与复习 ↗</a></div></section></main>`}
function session1Overview(){return `<main id="main" class="wrap session-overview"><a href="#home" class="back">← 全部课程记录</a><section class="session-heading"><div><div class="issue-label"><b>SESSION 01</b><span>2026.10.17 · 线上课</span></div><div class="eyebrow">THE VINE & ITS ENVIRONMENT</div><h1><span>葡萄藤与</span><span>生长环境</span></h1><p>葡萄藤结构与繁殖，以及环境对成熟、风格、品质和成本的影响。</p><div class="hero-actions"><a class="primary" href="#lesson/${lessons.find(l=>!completed.includes(l.id))?.id||'roots'}">${count()===lessons.length?'复习本课':count()?'继续阅读':'开始阅读'} ↗</a><a href="#workbook/1">练习册 ↗</a><a href="#quiz">本课自测 ↗</a></div></div><img src="assets/vineyard.webp" alt="沿山坡延伸的葡萄园与酒庄"></section><div class="session-strip"><strong>第一课 · 已读 ${count()} / 6</strong><span>6 个阅读单元</span></div><div class="s2-unit-grid">${lessons.map(l=>`<a class="s2-unit" href="#lesson/${l.id}"><span class="s2-num">${l.n}</span><div class="eyebrow">${l.en}</div><h2>${l.short}</h2><p>${l.desc}</p><small>约 ${l.duration} 分钟 ${completed.includes(l.id)?'✓ 已读':'↗'}</small></a>`).join('')}</div><div class="session-end-links"><a href="#guide">资料索引 ↗</a><a href="#session2">下一课 · 葡萄园管理 →</a></div></main>`}
function practiceSessionInfo(which){
 const session=Number(which)===2?2:1,qs=workbookData.questions.filter(q=>q[0]===session);
 return {chapters:session===1?[4,5]:[6],session,label:session===1?'第一课':'第二课',title:session===1?'葡萄藤与生长环境':'葡萄园管理',quiz:session===1?'#quiz':'#session2quiz',course:session===1?'#chapter/4':'#chapter/6',quizCount:(session===1?questions:s2Checks).length,bookCount:qs.length,marks:qs.reduce((sum,q)=>sum+q[2],0),extra:session===1?`${workbookData.white.length+workbookData.red.length} 个品种填写表`:'含 4 种采收情境'};
}
function practiceModeNav(session,active){
 const info=practiceSessionInfo(session);
 return `<nav class="practice-mode-tabs" aria-label="${info.label}练习方式"><a href="${info.quiz}" ${active==='quiz'?'aria-current="page"':''}><strong>本站自编自测</strong><small>${info.quizCount} 道选择题 · 即时判分</small></a><a href="#workbook/${info.session}" ${active==='workbook'?'aria-current="page"':''}><strong>机构练习册原题</strong><small>简答与填写 · 保存自查</small></a></nav>`;
}
function practiceSourceBadge(kind){
 const labels={workbook:'机构练习册原题',classroom:'老师讲解 · 本站整理',self:'本站自编',notes:'本站整理 · 复习速记'};
 return `<span class="practice-source practice-source-${kind}">${labels[kind]||labels.self}</span>`;
}
function practiceWorkbooks(){
 return [1,2].map(n=>{const i=practiceSessionInfo(n);return {...i,id:n,count:i.bookCount,worksheets:0};}).concat(winemakingWorkbook.sessions.map(s=>{
  const qs=winemakingWorkbook.questions.filter(q=>q.session===s.id);
  const chapters=[...new Set([...s.chapters,...qs.flatMap(q=>(q.refs||[]).map(r=>Number(r.href.split('/')[1])).filter(Number.isFinite))])].sort((a,b)=>a-b);
  return {...s,chapters,count:qs.filter(q=>!q.unscored).length,extra:s.worksheets?`另有 ${s.worksheets} 张工艺表`:''};
 }));
}
function practiceChapterLinks(chapters){return chapters.map(ch=>`<a href="#chapter/${ch}">第 ${ch} 章</a>`).join('');}
function practiceOriginalShelf(){
 return `<section class="practice-panel" aria-labelledby="practice-panel-title"><div class="practice-panel-heading"><div>${practiceSourceBadge('workbook')}<h2 id="practice-panel-title">机构练习册</h2><p>按你提供的练习册保留题目、分值和课程归属。六课统一列在这里。</p></div><p class="practice-answer-status"><strong>机构参考答案尚未提供</strong><span>题后的提示、速记与参考作答均有单独来源标记。</span></p></div><div class="practice-workbook-list">${practiceWorkbooks().map(s=>`<article class="practice-workbook-row"><div class="practice-course-number"><span>第 ${s.id} 课</span>${s.page?`<small>练习册 p.${s.page}</small>`:'<small>机构练习册</small>'}</div><div class="practice-workbook-copy"><h3>${safe(s.title)}</h3><p>${s.count} 道简答题 · ${s.marks} 分${s.extra?' · '+safe(s.extra):''}</p><div class="practice-related"><span>相关课本</span>${practiceChapterLinks(s.chapters)}</div></div><a class="primary" href="#workbook/${s.id}">打开原题 <span aria-hidden="true">→</span></a></article>`).join('')}</div></section>`;
}
function practiceClassroomShelf(){
 return `<section class="practice-panel" aria-labelledby="practice-panel-title"><div class="practice-panel-heading"><div>${practiceSourceBadge('classroom')}<h2 id="practice-panel-title">老师讲解与答题方法</h2><p>依据你提供的课堂照片和讲解文字整理；补充说明有标注，不能当作机构标准答案或评分表。</p></div></div><div class="practice-resource-grid"><article class="practice-resource"><span class="practice-resource-kicker">第一课 · 嫁接题</span><h3>原因 → 作用 → 结果</h3><p>按老师的 A → B → C 逻辑，串起欧亚葡萄、抗性砧木与嫁接，附中英文参考作答。</p><p class="practice-resource-source">来源：Level 3 Logic 课堂讲义照片；由本站整理并补充适用条件。</p><a class="primary" href="#workbook/1/wb-reference-grafting">查看讲解 →</a></article><article class="practice-resource"><span class="practice-resource-kicker">第五、六课 · 价格题</span><h3>一款酒为什么贵？</h3><p>葡萄园的天、地、人 → 发酵前、中、后 → 价格、风格、品质。附按老师讲解顺序展开的苏玳示例。</p><p class="practice-resource-source">来源：课堂白板照片与老师讲解文字；由本站重画、整理。</p><a class="primary" href="#workbook/6/wb-price-method-6">查看逻辑图 →</a></article></div></section>`;
}
function practiceSelfShelf(){
 return `<section class="practice-panel" aria-labelledby="practice-panel-title"><div class="practice-panel-heading"><div>${practiceSourceBadge('self')}<h2 id="practice-panel-title">本站自编练习</h2><p>用于检查理解。这里的题目、解析与自查提示由本站编写，不是机构练习册或 WSET 官方试题。</p></div></div><div class="practice-resource-grid">${[1,2].map(n=>{const s=practiceSessionInfo(n);return `<article class="practice-resource"><span class="practice-resource-kicker">${s.label} · 第 ${s.chapters.join('、')} 章</span><h3>${safe(s.title)}</h3><p>${s.quizCount} 道自编选择题，附解析与解释练习。选择题即时反馈，解释题自行核对。</p><a class="primary" href="${s.quiz}">开始自编自测 →</a></article>`;}).join('')}<article class="practice-resource practice-resource-wide"><div><span class="practice-resource-kicker">按课本章节 · 全部已收录主题</span><h3>解释、比较与情境自查</h3><p>${knowledgeTopics.length} 个本站自编自查主题，${knowledgeCases.length} 个跨主题情境。保存自己的解释，再展开提示核对。</p></div><a class="primary" href="#practice/chapters">按章节选择 →</a><a class="practice-text-link" href="#map">打开知识地图 →</a></article></div><div class="practice-notes-library"><h3>${practiceSourceBadge('notes')}六课复习速记</h3><p>正文要点与因果链的本站归纳，供独立作答后自查。</p><div>${workbookMemoryData.groups.map(g=>`<a href="#workbook/${g.session}/wb-memory-${g.session}">第 ${g.session} 课 · ${safe(g.title)} →</a>`).join('')}</div></div></section>`;
}
function practiceChapterShelf(){
 const books=practiceWorkbooks(),groups=[{title:'葡萄藤与葡萄园',ids:[4,5,6]},{title:'酿造与价格',ids:[7,8,9,10]},{title:'法规与法国产区',ids:[11,12,13,14,15,16]}];
 return `<section class="practice-panel" aria-labelledby="practice-panel-title"><div class="practice-panel-heading"><div><span class="practice-source practice-source-index">课本章节索引</span><h2 id="practice-panel-title">按课本顺序查找</h2><p>章号沿用课本。课程与章节是不同的编号；一课可涉及多章，原练习册仍按课程保留。</p></div></div><div class="practice-chapter-index">${groups.map(g=>`<section><h3>${g.title}</h3>${g.ids.map(id=>{
  const ch=bookChapters.find(c=>c.id===id);if(!ch)return `<div class="practice-chapter-row is-pending"><span class="practice-chapter-number">第 ${id} 章</span><span>尚未提供，暂未收录</span></div>`;
  const count=knowledgeTopics.filter(t=>t.chapters.includes(id)).length,related=books.filter(s=>s.chapters.includes(id));
  return `<article class="practice-chapter-row"><div class="practice-chapter-name"><span class="practice-chapter-number">第 ${id} 章</span><h4>${safe(ch.short||ch.title)}</h4><a href="#chapter/${id}">阅读正文 →</a></div><div class="practice-chapter-exercises"><div><small>机构练习册 · 相关课程</small>${related.length?related.map(s=>`<a href="#workbook/${s.id}">第 ${s.id} 课原题 →</a>`).join(''):'<span>暂无对应原题</span>'}</div><div><small>本站自编</small>${count?`<a href="#map/chapter/${id}">${count} 个主题自查 →</a>`:'<span>暂无自查主题</span>'}${id<=6?`<a href="${id===6?'#session2quiz':'#quiz'}">选择自测 →</a>`:''}</div></div></article>`;
 }).join('')}</section>`).join('')}</div></section>`;
}
function practiceHub(){
 const tabs=[['workbook','机构练习册'],['classroom','老师讲解整理'],['self','本站自编练习'],['chapters','按章节查找']];
 const requested=location.hash.split('/')[1],active=tabs.some(([id])=>id===requested)?requested:'workbook';
 const panels={workbook:practiceOriginalShelf,classroom:practiceClassroomShelf,self:practiceSelfShelf,chapters:practiceChapterShelf};
 return `<main id="main" class="wrap practice-hub practice-shelf"><header class="page-intro"><div class="eyebrow">PRACTICE & REVIEW</div><h1 class="page-title">练习与复习</h1><p>原题、课堂讲解和本站练习，按来源分别查找。</p></header><nav class="practice-source-tabs" aria-label="练习资料分类">${tabs.map(([id,label])=>`<a href="#practice/${id}"${active===id?' aria-current="page"':''}>${label}</a>`).join('')}</nav>${panels[active]()}</main>`;
}

function prepareCourseBodies(){
 const labels={
  '1/roots':['根系、接穗与砧木','根瘤蚜与抗性砧木','室内嫁接与田间换接','嫁接与杂交的区别'],
  '1/propagation':['属、种、品种与品系','扦插与压条','突变与克隆选择','有性繁殖与杂交','红葡萄品种与别名','白葡萄品种与别名','四种红葡萄对照'],
  '1/cycle':['葡萄藤四部分结构','叶、卷须、花与芽','一年生木与结果','葡萄藤年周期','生长阶段与风险'],
  '1/needs':['生长条件与光合作用','光照强度与日照','冬季冻害与春霜','寒春、酷热与野火','水分限制与胁迫','降雨时点与冰雹'],
  '1/climate':['气候、天气与年份','生长季温度分类','大陆度与昼夜温差','三类主要气候','海拔、洋流与雾','糖、酸与风味成熟'],
  '1/soil':['园地与局地气候','颗粒、腐殖质与土层','土壤储热与升温','土壤排水与保水','养分供应与黄化','土壤、风土与风味'],
  '2/training':['建园地点与材料','种植、投产与更新','密度、整枝、修剪与搭架','密度与资源竞争','头状、主蔓与大树型','高干与矮干'],
  '2/pruning':['木龄、芽与结果新梢','年周期与季节作业','冬剪与夏剪','短枝修剪与更新','替换长枝修剪','整枝与修剪组合'],
  '2/canopy':['冠层管理目标','不搭架的灌木形','搭架的三个目的','VSP 与调整型 VSP','建园与作业成本'],
  '2/balance':['产量与成熟能力','产量单位与经营限制','冬剪与摘青','炎热干燥情境','温和多雨情境'],
  '2/health':['各阶段天气风险','根、叶与果实受害','霜霉、白粉与灰腐','病毒与细菌性病害','四种栽培方式','成本与品质取舍'],
  '2/harvest':['采收与目标成熟度','早采、正常采与晚采','贵腐条件与选果','机械采收取舍','人工采收与整串','全年管理与采收衔接']
 };
 for(const [session,units] of [[1,lessons],[2,s2Units]])for(const unit of units){
  let i=0;const links=[],short=labels[`${session}/${unit.id}`]||[];
  unit.body=unit.body.replace(/<h2>([\s\S]*?)<\/h2>/g,(_,title)=>{const index=i++,id=`topic-${session}-${unit.id}-${i}`;links.push([id,short[index]||title]);return `<h2 id="${id}">${title}</h2>`});
  if(!links.length)continue;
  unit.body=`<details class="unit-outline"><summary><svg class="outline-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M7 5h10M7 10h10M7 15h10M3 5h.5M3 10h.5M3 15h.5" stroke-linecap="round"/></svg><span class="outline-name">本节目录</span><span class="outline-current">${links[0][1]}</span><span class="outline-count" aria-label="第 1 个主题，共 ${links.length} 个主题">01 / ${String(links.length).padStart(2,'0')}</span></summary><nav aria-label="本节段落跳转"><ol>${links.map(([id,t],index)=>`<li><a href="#${id}" data-book-jump="${id}"><span class="outline-number" aria-hidden="true">${String(index+1).padStart(2,'0')}</span><span class="outline-text">${t}</span><span class="outline-arrow" aria-hidden="true">→</span></a></li>`).join('')}</ol></nav></details>`+unit.body;
 }
}

// One reading navigator per rendered route; all global listeners are released on navigation.
let cleanupUnitOutline=()=>{};
function bindUnitOutline(){
 cleanupUnitOutline();
 const outline=document.querySelector('.lesson-content .unit-outline');
 if(!outline)return;
 const links=[...outline.querySelectorAll('[data-book-jump]')];
 if(!links.length)return;
 const headings=links.map(a=>document.getElementById(a.dataset.bookJump));
 if(headings.some(h=>!h))return;
 const summary=outline.querySelector('summary'),current=outline.querySelector('.outline-current'),count=outline.querySelector('.outline-count'),menu=outline.querySelector('nav');
 let frame=0,active=-1,disposed=false;
 const update=()=>{
  frame=0;if(disposed)return;
  // Native anchor scrolling leaves 100px above headings; include a small rounding tolerance.
  const edge=Math.max(104,summary.getBoundingClientRect().bottom+24);
  let index=0;headings.forEach((h,i)=>{if(h.getBoundingClientRect().top<=edge)index=i;});
  if(index!==active){
   active=index;current.textContent=links[index].querySelector('.outline-text').textContent;
   count.textContent=String(index+1).padStart(2,'0')+' / '+String(links.length).padStart(2,'0');
   count.setAttribute('aria-label',`第 ${index+1} 个主题，共 ${links.length} 个主题`);
   links.forEach((a,i)=>{a.classList.toggle('active',i===index);if(i===index)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
  }
  if(outline.open)menu.style.maxHeight=Math.max(96,Math.min(440,window.innerHeight-summary.getBoundingClientRect().bottom-16))+'px';
 };
 const schedule=()=>{if(!frame&&!disposed)frame=requestAnimationFrame(update);};
 const jump=e=>{const a=e.target.closest?.('[data-book-jump]');if(!a)return;e.preventDefault();e.stopPropagation();outline.open=false;focusReadingTarget(a.dataset.bookJump);schedule();};
 const escape=e=>{if(e.key==='Escape'&&outline.open){e.preventDefault();outline.open=false;summary.focus();}};
 const outside=e=>{if(outline.open&&!outline.contains(e.target))outline.open=false;};
 outline.addEventListener('click',jump);outline.addEventListener('toggle',schedule);
 document.addEventListener('keydown',escape);document.addEventListener('click',outside);
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 cleanupUnitOutline=()=>{disposed=true;if(frame)cancelAnimationFrame(frame);outline.removeEventListener('click',jump);outline.removeEventListener('toggle',schedule);document.removeEventListener('keydown',escape);document.removeEventListener('click',outside);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);cleanupUnitOutline=()=>{};};
 update();
}
