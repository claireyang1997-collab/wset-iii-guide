/* Book chapters are the only reading hierarchy. Original classes keep their assignments. */
const bookChapters=[
 {id:4,title:'葡萄藤',en:'THE VINE',pages:'30–35',desc:'结构与木龄 → 葡萄种与品种 → 繁殖 → 根瘤蚜、砧木与嫁接',icon:'vine',art:'assets/roots-editorial.webp',artAlt:'葡萄藤枝叶、果串与根系的植物插画'},
 {id:5,title:'生长环境',en:'THE GROWING ENVIRONMENT',pages:'36–46',desc:'生长条件 → 热量与阳光 → 水分 → 气候 → 土壤与养分',icon:'sun',art:'assets/climate-editorial.webp',artAlt:'山坡、水体与日照中的葡萄园插画'},
 {id:6,title:'葡萄园管理',en:'VINEYARD MANAGEMENT',pages:'47–61',desc:'选址与栽种 → 年周期 → 整枝、修剪与冠层 → 密度、产量与实例 → 病虫害、栽培与采收',icon:'rows',art:'assets/session2-management.webp',artAlt:'葡萄园冬季修剪与绿色冠层的期刊插画'}
];
const bookHref=u=>`#read/${u.chapter}/${u.id}`;
const bookDone=()=>{const a=read('wset3-book-completed',[]);return Array.isArray(a)?a:[]};
const bookUnitDone=u=>bookDone().includes(`${u.chapter}/${u.id}`);
function bookChapterIcon(kind){const c=studyPalette;const b=kind==='sun'?`<circle cx="60" cy="52" r="24" fill="none" stroke="${c.cane}" stroke-width="3"/>${[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return `<path d="M${60+Math.cos(a)*33} ${52+Math.sin(a)*33}L${60+Math.cos(a)*41} ${52+Math.sin(a)*41}"/>`}).join('')}<path d="M20 108Q57 75 101 108"/>`:kind==='rows'?'<path d="M12 110L45 33M43 110L61 33M78 110L78 33M111 110L95 33M21 84H106M31 60H99"/>':'<path d="M61 115V50M61 72L30 54M61 72L92 54M61 112L39 134M61 112L84 134"/><path d="M28 52Q7 25 29 24Q48 25 56 50M91 52Q114 25 93 24Q73 25 65 50"/>';return `<svg viewBox="0 0 124 150" aria-hidden="true" fill="none" stroke="${c.wood}" stroke-width="3" stroke-linecap="round">${b}</svg>`}
function bookHome(){const done=bookDone().filter(k=>bookUnits.some(u=>k===`${u.chapter}/${u.id}`)).length,next=bookUnits.find(u=>!bookUnitDone(u))||bookUnits[0];return `<main id="main" class="wrap book-home"><section class="book-intro"><div class="book-intro-copy"><div class="eyebrow">THE WINE STUDY JOURNAL</div><h1><span>从葡萄藤，</span><span>读懂杯中风味。</span></h1><p>从葡萄藤的结构读起，再学环境与管理。当前已整理课本第4–6章。</p><div class="hero-actions"><a class="primary" href="${bookHref(next)}">${done?'继续阅读':'开始阅读'} →</a><a href="#map">查看知识地图 ↗</a></div><div class="book-home-progress">${bookChapters.length} 章 · ${bookUnits.length} 个阅读单元 · 已读 ${done} / ${bookUnits.length}</div></div><figure class="book-hero-art"><div class="book-hero-image"><img src="assets/vineyard.webp" alt="金色阳光下的葡萄园与挂满葡萄的枝叶，学习期刊封面" fetchpriority="high" width="1536" height="1024"><div class="book-cover-label"><span>Ⅲ</span><div>从土地，读懂风味。<small>THE WINE STUDY JOURNAL</small></div></div></div><figcaption><span>FIELD NOTES / THE VINEYARD</span><span>读懂每一杯的来处。</span></figcaption></figure></section><div class="hub-section-head"><h2>章节目录</h2><span>按已提供课本顺序</span></div><section class="book-chapter-grid" aria-label="课本章节">${bookChapters.map(ch=>{const us=bookUnits.filter(u=>u.chapter===ch.id),n=us.filter(bookUnitDone).length;return `<article class="book-chapter-card"><a class="book-chapter-cover" href="#chapter/${ch.id}" aria-label="进入第 ${ch.id} 章：${ch.title}"><img src="${ch.art}" alt="${ch.artAlt}" loading="lazy" width="1536" height="1024"><span>${String(ch.id).padStart(2,'0')}</span></a><div class="eyebrow">CHAPTER ${ch.id} · ${ch.en}</div><h2><a href="#chapter/${ch.id}">${ch.title}</a></h2><p>${ch.desc}</p><small>课本 p.${ch.pages} · ${us.length} 个阅读单元</small><div class="book-progress"><span><i style="width:${n/us.length*100}%"></i></span><small>已读 ${n} / ${us.length}</small></div><a class="primary" href="#chapter/${ch.id}">进入章节 →</a></article>`}).join('')}</section><section class="hub-review"><div><div class="eyebrow">CONNECT & RECALL</div><h2>练习与检查</h2></div><p>读完一个主题，到知识地图试着解释原因，再用练习册写完整答案。</p><div><a href="#map">知识地图 ↗</a><a href="#practice">自测与练习册 ↗</a></div></section><details class="book-class-records"><summary>原课程资料与学习记录</summary><p>Session 1、2 的作业继续按原课程保留；知识正文已归入课本章节。</p><div><a href="#workbook/1">Session 1 练习册 ↗</a><a href="#workbook/2">Session 2 练习册 ↗</a><a href="#guide">第一课资料索引 ↗</a><a href="#session2sources">第二课资料索引 ↗</a></div><p class="fine">原阅读记录：第一课 ${count()} / 6；第二课 ${s2Done().length} / 6。原笔记保留在对应新单元下方。章节阅读进度另行记录。</p></details></main>`}
function bookChapterView(id){const ch=bookChapters.find(c=>c.id===Number(id))||bookChapters[0],us=bookUnits.filter(u=>u.chapter===ch.id);return `<main id="main" class="wrap book-chapter-page"><a class="back" href="#home">← 全部章节</a><div class="page-intro book-chapter-intro"><div class="book-chapter-copy"><div class="eyebrow">CHAPTER ${ch.id} · ${ch.en}</div><h1 class="page-title">第 ${ch.id} 章 · ${ch.title}</h1><p>${ch.desc}</p><p class="fine">课本 p.${ch.pages} · 已读 ${us.filter(bookUnitDone).length} / ${us.length}</p><a class="review-entry" href="#review/${ch.id}">资料与配图核对记录 →</a></div><figure class="book-chapter-art"><img src="${ch.art}" alt="${ch.artAlt}" width="1536" height="1024"><figcaption>CHAPTER ${String(ch.id).padStart(2,'0')} / ${ch.en}</figcaption></figure></div><div class="book-unit-list">${us.map((u,i)=>`<a href="${bookHref(u)}"><span class="book-unit-number">${ch.id}.${i+1}</span><div><h2>${u.title}</h2><p>${u.desc}</p></div><small>${bookUnitDone(u)?'✓ 已读':'阅读 →'}</small></a>`).join('')}</div><nav class="book-chapter-footer" aria-label="相邻章节">${bookChapters.filter(c=>Math.abs(c.id-ch.id)===1).map(c=>`<a href="#chapter/${c.id}">${c.id<ch.id?'← ':''}第 ${c.id} 章 · ${c.title}${c.id>ch.id?' →':''}</a>`).join('')}</nav></main>`}
function bookOutline(body){const links=[...body.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map(m=>[m[1],m[2]]);if(!links.length)return '';return `<details class="unit-outline"><summary><svg class="outline-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M7 5h10M7 10h10M7 15h10M3 5h.5M3 10h.5M3 15h.5" stroke-linecap="round"/></svg><span class="outline-name">本节目录</span><span class="outline-current">${links[0][1]}</span><span class="outline-count">01 / ${String(links.length).padStart(2,'0')}</span></summary><nav aria-label="本节段落跳转"><ol>${links.map(([id,t],i)=>`<li><a href="#${id}" data-book-jump="${id}"><span class="outline-number">${String(i+1).padStart(2,'0')}</span><span class="outline-text">${t}</span><span class="outline-arrow" aria-hidden="true">→</span></a></li>`).join('')}</ol></nav></details>`}
function bookSidebar(current){return `<aside class="sidebar book-sidebar"><a href="#home" class="back">← 章节目录</a><nav aria-label="课本章节阅读">${bookChapters.map(ch=>`<details ${current.chapter===ch.id?'open':''}><summary>第 ${ch.id} 章 · ${ch.title}</summary><ol>${bookUnits.filter(u=>u.chapter===ch.id).map(u=>`<li><a href="${bookHref(u)}" ${current===u?'class="active" aria-current="page"':''}>${u.title}${bookUnitDone(u)?'<span aria-label="已读">✓</span>':''}</a></li>`).join('')}</ol></details>`).join('')}</nav></aside>`}
function bookLegacyNotes(u){const route=bookHref(u),keys=Object.entries(bookLegacy).filter(([,dest])=>dest===route).map(([id])=>id),notes=[];for(const key of keys){const [session,id]=key.split('/'),noteId=session==='1'?id:'session2-'+id,value=read(notesKey(noteId),'');if(typeof value==='string'&&value.trim()){const original=(session==='1'?lessons:s2Units).find(x=>x.id===id);notes.push(`<details class="legacy-note"><summary>原${session==='1'?'第一':'第二'}课「${original.short}」笔记</summary><textarea data-note="${noteId}" aria-label="原课程笔记">${safe(value)}</textarea></details>`)}}return notes.length?`<div class="legacy-notes">${notes.join('')}</div>`:''}
/* Single-unit textbook-photo trial. Keep other units and source diagram renderers intact. */
function bookStructureFigure(key){
 if(key==='shoot')return bookShootIllustration();
 if(key==='wood-ages')return `<section class="study-plate textbook-original-plate" id="study-wood-ages" data-study-figure="wood-ages" aria-label="一年生木与多年生木实物对照"><div class="study-plate-head"><strong>先看实物：细枝与永久骨架</strong><span>课本图 4.2、4.3</span></div><div class="textbook-photo-pair"><figure class="textbook-photo-card"><a class="textbook-original-link" href="assets/textbook-4-2-spurs.webp" target="_blank" rel="noopener" aria-label="查看这幅课本图的清晰原图" title="查看清晰原图"><img src="assets/textbook-4-2-spurs.webp" alt="课本图4.2：西班牙短枝修剪葡萄藤，顶部短小枝段与粗糙主干、干臂的对照，保留原图箭头" width="1390" height="900" loading="lazy"></a><figcaption><strong>图 4.2 · 西班牙：短枝修剪</strong><p>上方两支箭头指向<strong>一年生短枝</strong>；中部箭头指干臂，下方箭头指主干。粗糙的主干与干臂属于<strong>多年生木</strong>。</p></figcaption></figure><figure class="textbook-photo-card"><a class="textbook-original-link" href="assets/textbook-4-3-cane.webp" target="_blank" rel="noopener" aria-label="查看这幅课本图的清晰原图" title="查看清晰原图"><img src="assets/textbook-4-3-cane.webp" alt="课本图4.3：法国阿尔萨斯替换长枝修剪葡萄藤，上方弯曲的一年生长枝与下方多年生主干，保留原图箭头" width="1400" height="920" loading="lazy"></a><figcaption><strong>图 4.3 · 阿尔萨斯：替换长枝修剪</strong><p>上方箭头指向弯曲的<strong>一年生长枝</strong>；下方箭头指<strong>多年生主干</strong>。长枝比短枝长，但两者都属于一年生木。</p></figcaption></figure></div><p class="textbook-photo-takeaway">辨认木龄看枝条形成的时间。长短与是否水平，都不能单独用来判断木龄。</p></section>`;
 if(key==='wood-renewal')return `<figure class="study-plate textbook-original-plate" id="study-wood-renewal" data-study-figure="wood-renewal"><div class="study-plate-head"><strong>再看水平枝条：短枝与干臂属于不同木龄</strong><span>课本图 4.4 · p.32</span></div><a class="textbook-original-link" href="assets/textbook-4-4-cordon-v2.webp" target="_blank" rel="noopener" aria-label="查看这幅课本图的清晰原图" title="查看清晰原图"><img class="textbook-cordon-original" src="assets/textbook-4-4-cordon-v2.webp" alt="课本图4.4原图：澳大利亚短枝修剪葡萄藤，水平多年生干臂上留有一年生短枝，下方为多年生主干，保留原图箭头" width="1800" height="1206" loading="lazy"></a><figcaption><strong>图 4.4 · 澳大利亚：水平干臂上的短枝</strong><p>上方箭头指<strong>一年生短枝</strong>；中间斜箭头指<strong>多年生干臂</strong>；下方箭头指<strong>多年生主干</strong>。水平的粗木臂是长期保留的骨架，不能把它当作每年替换的一年生长枝。</p><p class="textbook-season-line"><strong>跨年顺序：</strong>当年绿色新梢 → 木质化，到次年春季称一年生木 → 保留的芽再萌发出新梢。果串通常长在这些新梢上；更早保留的木质结构也继续增加木龄。</p></figcaption></figure>`;
 return studyDiagram(key);
}

/* Original textbook photos replace matching panels; other mechanisms remain visible. */
const bookOriginalAssets={"textbook-4-5-bench-join":{"src":"assets/textbook-4-5-bench-join.webp","width":1693,"height":1589},"textbook-4-5-bench-planted":{"src":"assets/textbook-4-5-bench-planted.webp","width":1670,"height":1593},"textbook-4-6-head-new":{"src":"assets/textbook-4-6-head-new.webp","width":1566,"height":1485},"textbook-4-6-head-established":{"src":"assets/textbook-4-6-head-established.webp","width":1562,"height":1472},"textbook-5-1-needs":{"src":"assets/textbook-5-1-needs.webp","width":1800,"height":1084},"textbook-5-2-latitude":{"src":"assets/textbook-5-2-latitude.webp","width":1310,"height":1058},"textbook-5-3-priorat":{"src":"assets/textbook-5-3-priorat.webp","width":1800,"height":1342},"textbook-5-4-heaters":{"src":"assets/textbook-5-4-heaters.webp","width":1800,"height":1050},"textbook-5-5-site":{"src":"assets/textbook-5-5-site.webp","width":1800,"height":882},"textbook-5-6-drip":{"src":"assets/textbook-5-6-drip.webp","width":1800,"height":1087},"textbook-5-7-hail":{"src":"assets/textbook-5-7-hail.webp","width":1800,"height":1121},"textbook-5-8-chlorosis":{"src":"assets/textbook-5-8-chlorosis.webp","width":1800,"height":1764}};
function bookOriginalImage(name,alt){const a=bookOriginalAssets[name];return `<a class="textbook-original-link" href="${a.src}" target="_blank" rel="noopener" aria-label="查看这幅课本图的清晰原图" title="查看清晰原图"><img src="${a.src}" alt="${alt}" width="${a.width}" height="${a.height}" loading="lazy"></a>`}
function bookOriginalCard(name,title,alt,caption){return `<figure class="textbook-photo-card">${bookOriginalImage(name,alt)}<figcaption><strong>${title}</strong><p>${caption}</p></figcaption></figure>`}
function bookReplaceCardImage(html,title,name,alt,label){
 const start=html.indexOf('<h4>'+title+'</h4>');if(start<0)throw Error('Missing textbook photo target: '+title);
 const at=html.indexOf('<svg',start),end=html.indexOf('</svg>',at)+6;
 if(at<0||end<6)throw Error('Missing illustration for '+title);
 return html.slice(0,at)+bookOriginalImage(name,alt)+`<p class="textbook-image-label">${label}</p>`+html.slice(end);
}
function bookTextbookFigure(key){
 const refined=bookRefinedStudyFigure(key);if(refined!==null)return refined;
 if(key==='frost')return bookFrostIllustration();
 if(key==='propagation')return bookPropagationIllustration();
 if(key==='graft')return bookGraftIllustration();
 if(key==='needs')return bookNeedsIllustration();
 if(key==='latitude')return bookLatitudeIllustration();
 if(key==='site')return bookColdAirIllustration();
 if(key==='coastal-altitude')return bookSiteClimateIllustration();
 if(key==='stone-heat')return bookStoneHeatIllustration();
 if(key==='classification')return bookClassificationMap();
 if(key==='crossing')return bookPropagationMap();
 if(key==='training-comparison')return bookTrainingIllustrated();
 if(key==='graft-methods')return `<section class="study-plate textbook-original-plate" id="study-graft-methods" data-study-figure="graft-methods" aria-label="室内嫁接与田间换接的课本实物照片"><div class="study-plate-head"><strong>室内嫁接：用于培育新植株</strong><span>课本图 4.5</span></div><div class="textbook-photo-pair">${bookOriginalCard('textbook-4-5-bench-join','图 4.5① · 刚接合的枝条','室内嫁接近照，接穗与砧木的接合位置以及接穗上的芽清晰可见','先找接穗上的芽，再找两段枝条的接合处。上段是所需欧亚葡萄品种，下段提供砧木根系；接口须固定并保护。')}${bookOriginalCard('textbook-4-5-bench-planted','图 4.5② · 栽种后的嫁接苗','室内嫁接苗栽入土中，新梢长出，红蜡覆盖并保护接合部位','红蜡用于保护接口，芽萌发后长出绿色新梢。建新园通常需经过育苗、栽种与幼藤建立期，至少第三年才有商业收成。')}</div><div class="study-plate-head textbook-subhead"><strong>田间换接：利用现有主干与根系换种</strong><span>课本图 4.6</span></div><div class="textbook-photo-pair">${bookOriginalCard('textbook-4-6-head-new','图 4.6① · 春季刚换接的主干','原有主干上换接两段接穗，以条带绑紧并涂保护材料','看粗大的原有主干与其上新接的细枝。条带固定接穗，剪口涂保护材料；地下既有根系继续保留。')}${bookOriginalCard('textbook-4-6-head-established','图 4.6② · 田间换接的常见形态','保留原有主干、换接后长出枝叶和果串的葡萄藤','沿原有主干向上看新的分枝。成功后可在下一年结出新品种果实，通常比拔园重植更快、成本更低；这两幅为课本中的不同植株示例。')}</div></section>`;
 let html=studyDiagram(key);
 if(key==='ripening-curves')return html.replace('<figcaption>横轴从转色开始向右推进；糖、酸曲线与绿色成熟箭头分别读。曲线为讲义趋势示意，没有浓度刻度，不代表所有品种的固定生长曲线。</figcaption>','');
 if(key==='terraces'){
  html=html.replace('侧面看：台面种植，边缘挡土','Priorat：前景石块，背景梯田');
  return bookReplaceCardImage(html,'Priorat：前景石块，背景梯田','textbook-5-3-priorat','课本图5.3：西班牙Priorat葡萄园，前景是片状石块，背景是陡坡梯田','图 5.3 · 前景石块能吸热并再辐射热量；背景阶梯状台面提供陡坡上的种植空间。石块与梯田分别对应热量和地形，不能混成一个概念。');
 }
 if(key==='frost-tools')return bookReplaceCardImage(html,'加热器 Heaters','textbook-5-4-heaters','课本图5.4：纳帕县葡萄园中的两座加热装置','图 5.4 · 纳帕县的加热器：燃烧供热，加热空气并促进流动，用于降低春季霜冻风险。');
 if(key==='irrigation')return bookReplaceCardImage(html,'滴灌','textbook-5-6-drip','课本图5.6：新西兰葡萄园，黑色滴灌管沿葡萄行延伸并在根区附近供水','图 5.6 · 沿黑色管线找滴头：在每株根区附近局部供水，较精准、可控。滴灌管与支撑枝条的铁丝不是同一设施。');
 if(key==='nets')return bookReplaceCardImage(html,'防雹网：上方拦截冰雹','textbook-5-7-hail','课本图5.7：阿根廷葡萄园的架空防雹网，网面位于冠层上方','图 5.7 · 防雹网架在冠层上方，拦截冰雹。高风险园地可能接受较高架设成本；与包覆果区的防鸟网分开识别。');
 if(key==='chlorosis')return bookReplaceCardImage(html,'黄化叶片','textbook-5-8-chlorosis','课本图5.8：法国马孔内一株黄化病葡萄藤，叶片明显变黄','图 5.8 · 马孔内的黄化病植株：与左侧绿色叶片对照，黄色叶片的光合作用能力受影响。');
 return html;
}

/* Keep each seasonal illustration beside its own explanation, including on phones. */
const bookTrainingArt=[
 {src:'assets/training-head-spur.webp',name:'头状短枝',split:44},
 {src:'assets/training-head-cane.webp',name:'头状替换长枝（单居由）',split:50},
 {src:'assets/training-cordon-spur.webp',name:'主蔓短枝',split:50}
];
function bookTrainingImage(a,summer){
 const portion=summer?100-a.split:a.split,ratio=2*portion/100,fit=Math.min(100,100*ratio),offset=summer?-a.split/portion*100:0;
 const alt=summer?`${a.name}：转色后的冠层，绿色当年新梢从保留枝条的芽长出，果串长在新梢上`:`${a.name}：冬季修剪后，粗糙多年生木与细的一年生结果母枝对照`;
 return `<a class="training-art-link" href="${a.src}" target="_blank" rel="noopener" aria-label="查看${a.name}完整冬夏对照插画"><span class="training-art-stage"><span class="training-art-slice" style="width:${fit}%;aspect-ratio:${ratio};--art-width:${10000/portion}%;--art-left:${offset}%"><img src="${a.src}" alt="${alt}" width="1774" height="887" loading="lazy"></span></span></a>`;
}
function bookTrainingIllustrated(){
 let example=0;
 return studyDiagram('training-comparison').replace(/<article class="study-example">[\s\S]*?<\/article>/g,article=>{
  const art=bookTrainingArt[example++];if(!art)return article.replace(/<svg\b[\s\S]*?<\/svg>/g,()=>bookRefinedArt('sylvoz',null,'Sylvoz：粗糙永久主蔓上保留三条下弯的一年生长枝')+bookRefinedLabels(['深棕水平臂：多年生主蔓','赭色下弯枝：一年生长枝','冬剪后的骨架']));
  let phase=0;
  return article.replace(/<svg\b[\s\S]*?<\/svg>/g,()=>bookTrainingImage(art,phase++===1));
 });
}

function bookFrostIllustration(){
 const panels=[
  {title:'冬季冻害',phase:'休眠期 · 没有绿色冠层',alt:'休眠期葡萄藤：保留芽、一年生短枝和粗糙多年生木，没有绿色新梢',paths:[['M790 120L590 255'],['M210 530L470 520']],pins:[[825,95,1],[170,530,2]],notes:[['1','芽与枝条','看枝上的芽和木质部分；极端低温可伤芽、永久木，严重时伤及整株。'],['2','主干与多年生木','粗糙的深棕色部分是永久骨架，冬季保护也需要考虑这些部位。']],result:'严重受冻可能需要重植，并等待产量恢复。',response:'必要时培土／埋土保护。'},
  {title:'萌芽后春霜',phase:'萌芽后 · 嫩芽和新梢已出现',alt:'萌芽后葡萄藤：保留木上长出绿色嫩梢，部分嫩梢顶端受霜后褐变、萎蔫，与健康绿色组织对照',paths:[['M480 70L390 120'],['M840 250L760 260']],pins:[[510,45,1],[880,245,2]],notes:[['1','褐变、萎蔫的嫩梢','看顶部下垂的褐色组织：萌芽后的嫩芽和绿色新梢容易受到春霜伤害。'],['2','绿色幼嫩组织','绿色部分用于辨认生长阶段；图中保留绿色组织作对照。']],result:'当年的结果新梢受损，潜在产量可能下降。',response:'加热、风机、喷灌各有适用条件，具体机制见上表。'}
 ];
 const cards=panels.map((p,i)=>`<section class="study-card frost-stage-card"><h4>${p.title}</h4><p class="figure-stage">${p.phase}</p><div class="frost-stage-art"><div class="propagation-art-slice ${i?'layering-art':''}"><img src="assets/frost-stages-botanical.webp" width="1774" height="887" loading="lazy" alt="${p.alt}"></div>${bookBotanicalOverlay('frost-stage-'+i,p.paths,p.pins,'0 0 1000 1000')}</div><div class="figure-panel-notes">${p.notes.map(([n,t,d])=>`<section><h5><b>${n}</b>${t}</h5><p>${d}</p></section>`).join('')}<dl><div><dt>后果</dt><dd>${p.result}</dd></div><div><dt>应对</dt><dd>${p.response}</dd></div></dl></div></section>`).join('');
 return studyPlate('frost','低温发生在不同阶段，受害部位也不同',`<div class="study-pair">${cards}</div>`,'课本 p.39–40','插画用于比较生长阶段与受害部位；风机依赖暖空气层，防霜喷灌靠持续结冰释放潜热，需要正确运行和连续供水。');
}
function bookBotanicalOverlay(key,paths,pins,viewBox='0 0 1536 1024'){
 return `<svg class="botanical-callouts" viewBox="${viewBox}" aria-hidden="true"><defs><marker id="${key}-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L7 4L1 7" fill="none" stroke="#763e4b" stroke-width="1.2"/></marker><marker id="${key}-oxygen" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L7 4L1 7" fill="none" stroke="#4a7d94" stroke-width="1.2"/></marker></defs><g fill="none" stroke-width="4" stroke-linecap="round">${paths.map(([d,out])=>`<path d="${d}" stroke="${out?'#4a7d94':'#763e4b'}" marker-end="url(#${key}-${out?'oxygen':'arrow'})"/>`).join('')}</g>${pins.map(([x,y,n,out])=>`<g><circle cx="${x}" cy="${y}" r="28" fill="#fbfaf5" stroke="${out?'#4a7d94':'#763e4b'}" stroke-width="2"/><text x="${x}" y="${y+10}" text-anchor="middle" fill="${out?'#4a7d94':'#763e4b'}" font-size="31" font-family="Georgia,serif">${n}</text></g>`).join('')}</svg>`;
}
function bookPropagationIllustration(){
 let i=0;return studyDiagram('propagation').replace(/<svg\b[\s\S]*?<\/svg>/g,()=>{const right=i++===1;return `<div class="propagation-art-slice ${right?'layering-art':'cutting-art'}"><img src="assets/branch-propagation-botanical.webp" width="2048" height="1024" loading="lazy" alt="${right?'母株与压条枝连续相连，中段埋土长出新根，右侧枝梢露出地面':'剪下的带芽一年生枝段下端埋入土中，从埋入部分生根，上方芽长出绿色新梢'}"></div><div class="botanical-panel-labels">${right?'<span>母株仍相连</span><span>枝梢露出</span><span>埋土部分生根</span>':'<span>① 剪下带芽枝段</span><span>② 培育生根</span><span>新根由埋入部分长出</span>'}</div>`;});
}
function bookGraftIllustration(){
 const art=`<div class="botanical-art-frame graft-botanical-art"><img src="assets/roots-editorial.webp" width="1536" height="1024" loading="lazy" alt="复用植物插画：上部所需品种的接穗与下部砧木相接，嫁接点高于地面，地下可见细密砧木根系">${bookBotanicalOverlay('graft-detail',[['M410 430L650 350'],['M1110 510L770 490'],['M400 830L600 780']],[[375,430,1],[1145,510,2],[365,830,3]])}</div><div class="botanical-key-grid graft-detail-keys"><section><h4><b>1</b>接穗：所需酿酒品种</h4><p>接口上方，保留所需品种的地上部分。</p></section><section><h4><b>2</b>嫁接点</h4><p>接穗与砧木接合的位置，高于地面。</p></section><section><h4><b>3</b>砧木及根系</h4><p>接口下方，包括地下根系；提供根部抗性与环境适应性。</p></section></div>`;
 return studyDiagram('graft').replace(/<svg\b[\s\S]*?<\/svg>/,art);
}
function bookNeedsIllustration(){
 const items=[['热量','太阳、土壤的反射。'],['二氧化碳','来自大气层。'],['阳光','太阳、水面的反射。'],['水分','降雨、灌溉、储存在土壤中的水分。'],['养分','土壤颗粒、腐殖质、肥料。'],['氧气 · 光合作用','树叶将二氧化碳与水分结合，产生葡萄糖和氧气。']];
 const art=`<div class="botanical-art-frame needs-botanical-art"><img src="assets/vine-growing-needs-botanical.webp" width="1536" height="1024" loading="lazy" alt="葡萄藤生长所需条件：红色编号1热量、2二氧化碳、3阳光、4水分、5养分指向植株；蓝色6表示叶片光合作用释放氧气">${bookBotanicalOverlay('needs-detail',[['M180 170L550 310'],['M770 65V240'],['M1400 190L980 250'],['M170 850L610 800'],['M1380 850L980 820'],['M520 300L170 420',true]],[[145,155,1],[770,30,2],[1435,175,3],[135,860,4],[1415,860,5],[135,420,6,true]])}</div><div class="botanical-key-grid needs-detail-keys">${items.map(([title,text],i)=>`<section><h4><b class="${i===5?'oxygen-label':''}">${i+1}</b>${title}</h4><p>${text}</p></section>`).join('')}</div><p class="botanical-arrow-key"><span>酒红箭头：五项生长输入</span><span>蓝色箭头：释放氧气</span></p>`;
 return studyDiagram('needs').replace(/<svg\b[\s\S]*?<\/svg>/,art);
}

function bookLatitudeIllustration(){
 const art=`<div class="latitude-botanical-art"><img src="assets/latitude-sunlight-botanical.webp" width="1536" height="1024" loading="lazy" alt="五束等宽平行阳光照向地球；赤道附近直射更集中，高纬度斜射时同量太阳能分散到更大表面积"><span class="latitude-north">北极</span><span class="latitude-equator">赤道</span><span class="latitude-south">南极</span></div><p class="textbook-image-label"><strong>图 5.2 · 纬度。</strong>黄色带代表相同的太阳能量：赤道附近集中在较小面积，高纬度斜射时分散到更大面积，因此单位面积获得的能量较少。</p>`;
 return studyDiagram('latitude').replace(/<img\b[^>]*>/,art);
}
function bookColdAirIllustration(){
 const art=`<div class="botanical-art-frame"><img src="assets/cold-air-slope-botanical.webp" width="1536" height="1024" loading="lazy" alt="侧面看葡萄园山坡：坡中部保持排冷通道；冷空气向坡下移动，在右侧封闭低洼地积聚；蓝色薄雾代表冷空气，不是水体">${bookBotanicalOverlay('cold-air-detail',[['M480 400L650 520',true],['M680 530L850 630',true],['M880 640L1050 710',true]],[[650,570,1,true],[1170,740,2,true]])}</div><div class="botanical-key-grid"><section><h4><b>1</b>坡中部：保持排冷通道</h4><p>冷空气顺坡下沉，通道畅通时能继续流走。</p></section><section><h4><b>2</b>洼地易积冷</h4><p>封闭低洼处聚集冷空气，增加嫩芽遭遇春霜的风险。</p></section><section><h4>土层、风与朝向仍需另判</h4><p>排冷只是园地条件之一，不能单凭海拔或坡位判断全部生长条件。</p></section></div>`;
 return studyDiagram('site').replace(/<svg\b[\s\S]*?<\/svg>/,art);
}
function bookSiteClimateIllustration(){
 const descriptions=[
  ['海拔','气温随着海拔的升高而下降。高海拔对靠近赤道的地区有利，否则这些地区的气温可能会过高。'],
  ['朝向','面向太阳的斜坡接收到热量和阳光最多。在北半球，如图所示，这些山坡朝南。在南半球，这些山坡朝北。可以从这张图上看到，太阳的能量主要集中在斜坡的中部（与顶部和底部相比），这意味着这个位置能接收到最多的热量和阳光。'],
  ['霜冻 · ①封闭洼地与②开放坡面','可以利用葡萄园的地理位置来减少霜冻的风险。冷空气下降，而暖空气上升。在①号位置上，冷空气被周围的丘陵困住，增加了霜冻的风险。在②号位置上，冷空气能够流动，不会停留在葡萄园，这就减少了霜冻的风险。'],
  ['海洋的降温效应 · ③沿海谷地','寒冷的洋流可以给沿海的葡萄酒产区降温。在如图所示的③号位置上，如果冷空气和雾气能够吹上岸，便可加强这种效应。请注意，虽然这里没有图解说明，但温暖的洋流可以产生相反的效应。']
 ];
 let overlay=bookBotanicalOverlay('site-climate-detail',[['M850 150L820 260',true],['M1000 230L880 290',true],['M520 320Q350 420 180 420',true],['M1080 900Q1130 700 960 520',true]],[[820,310,1],[450,400,2],[1050,610,3]]);
 overlay=overlay.replace('</svg>','<g stroke="#c9a449" stroke-width="8"><path d="M1510 240L1280 490M1510 300L1330 550"/></g><g transform="translate(270 840) rotate(-35)" fill="#343d31" stroke="#343d31" stroke-width="2"><path d="M0 -40V40M-40 0H40M-7 -23L0 -40L7 -23" fill="none"/><g stroke="none" font-size="25" text-anchor="middle" font-family="Georgia,serif"><text y="-49">N</text><text x="57" y="9">E</text><text y="66">S</text><text x="-57" y="9">W</text></g></g></svg>');
 return studyPlate('coastal-altitude','影响葡萄园气候的因素',`<div class="botanical-art-frame"><img src="assets/vineyard-site-climate-botanical.webp" width="1536" height="1024" loading="lazy" alt="北半球沿海地形示意：①丘陵围成的封闭洼地，②可排冷的开放坡面，③海风与雾可吹入的沿海谷地；高山在内陆，海洋在前景，金色线条表示阳光">${overlay}</div><div class="botanical-key-grid site-climate-keys">${descriptions.map(([title,text])=>`<section><h4>${title}</h4><p>${text}</p></section>`).join('')}</div>`,'参照课本图 5.5 · 北半球示意','坡中部受光的比较针对图示坡面；实际受热还需结合纬度、季节、坡度、遮挡和风。海拔、坡向与积冷应分别判断。');
}
function bookStoneHeatIllustration(){
 let i=0;return studyDiagram('stone-heat').replace(/<svg\b[\s\S]*?<\/svg>/g,()=>{const after=i++===1,paths=after?[['M240 620V300'],['M560 650V300'],['M840 670V300']]:[['M180 180L240 640'],['M220 180L560 690'],['M260 180L840 700']];return `<div class="propagation-art-slice botanical-art-frame stone-heat-art ${after?'layering-art':''}"><img src="assets/soil-stones-heat-botanical.webp" width="2048" height="1024" loading="lazy" alt="${after?'同一组石块与表土在吸热后向周围再辐射热量，箭头从石块向空气':'白天太阳照向深色表土与三块自然石头，箭头指向受热表面'}">${bookBotanicalOverlay('stone-'+(after?'after':'day'),paths,[],'0 0 1000 1000')}</div><p class="stone-heat-art-label">${after?'可帮助凉爽园地成熟':'深色表土、石块吸热'}</p>`;});
}

function bookShootIllustration(){
 const notes=[
  ['卷须','葡萄藤无法支撑自身，所以用卷须来抓住支撑结构以保持向上直立。一旦卷须感觉触碰到像葡萄架铁丝这样的物体，就会紧紧地缠绕其上来保持新枝直立。'],
  ['叶子','叶子是植物的发动机，主要负责进行光合作用，在这个过程中，植物利用阳光将水和二氧化碳转化成葡萄糖和氧气。葡萄糖是供葡萄树生长和使成熟葡萄变甜的糖分。'],
  ['花和果实','花是葡萄藤的繁殖器官。每朵葡萄花都既有雄性部分也有雌性部分，为雌雄同体，这些花集合成一束，被称为花序。每一朵授粉成功的花可发育成一颗浆果，因此一束花序就会变成一串葡萄，生长期结束时即可采摘。葡萄藤进化的结果是能够结出吸引动物的甜味葡萄以传播种子。'],
  ['嫩芽','嫩芽长在叶子与新枝的接合处，可称为腋芽。嫩芽一旦萌发，当年就能在芽管内发育成熟，形成完整的微型结构，第二年长成新枝、叶片、花朵和卷须。']
 ];
 return `<figure class="study-plate shoot-botanical-plate" id="study-shoot" data-study-figure="shoot"><div class="study-plate-head"><strong>葡萄藤的绿色部分</strong><span>参照课本图 4.1 重绘</span></div><div class="shoot-annotated-layout"><div class="shoot-botanical-art"><img src="assets/grape-shoot-botanical.webp" width="1024" height="1536" alt="当年绿色新梢从下方一年生木上的芽长出；编号1指卷须，2指叶片，3指花序，4指叶腋的芽" loading="lazy"><svg class="shoot-callout-arrows" viewBox="0 0 1024 1536" aria-hidden="true"><defs><marker id="shoot-detail-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M1 1L7 4L1 7" fill="none" stroke="#763e4b" stroke-width="1.2"/></marker></defs><g fill="none" stroke="#763e4b" stroke-width="2.5" marker-end="url(#shoot-detail-arrow)"><path d="M130 150L240 140"/><path d="M70 1050H210"/><path d="M940 460H825"/><path d="M920 1280H600"/></g>${[[95,150,1],[35,1050,2],[975,460,3],[955,1280,4]].map(([x,y,n])=>`<g><circle cx="${x}" cy="${y}" r="30" fill="#fbfaf5" stroke="#763e4b" stroke-width="2"/><text x="${x}" y="${y+11}" text-anchor="middle" fill="#763e4b" font-size="33" font-family="Georgia,serif">${n}</text></g>`).join('')}</svg></div>${notes.map(([title,body],i)=>`<section class="shoot-note shoot-note-${i+1}"><h4><b>${i+1}</b>${title}</h4><p>${body}</p></section>`).join('')}</div><figcaption><p><strong>读图：</strong>中央绿色枝条是当年新梢，花序、叶片、卷须和芽都位于其上；下方棕色枝段是一年生木。</p><p>花的说明针对常见酿酒葡萄。芽的跨年顺序是：当年在芽内形成来年器官的微小结构，越冬后萌发；并非到冬季才开始形成。</p></figcaption></figure>`;
}

function bookStructureTeachingFigure(key){
 let html=bookStructureFigure(key);if(key!=='wood-ages')return html;
 const drawing=`<div class="wood-age-illustration"><div class="wood-age-art">${bookTrainingImage(bookTrainingArt[1],true)}<span class="wood-age-marker wood-marker-trunk" aria-hidden="true">1</span><span class="wood-age-marker wood-marker-cane" aria-hidden="true">2</span><span class="wood-age-marker wood-marker-shoot" aria-hidden="true">3</span></div><dl class="wood-age-labels"><div><dt><b>1</b> 多年生木：主干</dt><dd>粗糙、较粗，长期保留，构成骨架。</dd></div><div><dt><b>2</b> 一年生木：横绑长枝</dt><dd>细、黄褐色，带芽；上一季的新梢木质化而成。</dd></div><div><dt><b>3</b> 当年新梢：绿色结果枝</dt><dd>从长枝的芽萌发，上面有叶片、卷须和果串。</dd></div></dl></div><p class="wood-age-bridge">这三种木龄同时存在于一株藤上。图示为头状替换长枝：横着的细长枝会逐年替换，<strong>不是永久主蔓</strong>。<a href="#read/6/pruning/study-training-comparison">冬剪前后怎样对应 →</a></p>`;
 html=html.replace('先看实物：细枝与永久骨架','先认木龄：主干、长枝与新梢');
 html=html.replace('<span>课本图 4.2、4.3</span>','<span>讲义木龄示意 · 实物图 4.2、4.3</span>');
 html=html.replace('<div class="textbook-photo-pair">',drawing+'<details class="wood-age-originals"><summary>实物对照：课本图 4.2、4.3</summary><div class="textbook-photo-pair">');
 return html.replace('</div><p class="textbook-photo-takeaway">','</div></details><p class="textbook-photo-takeaway">');
}
function bookContent(u){
 let body=u.body;
 body=body.replace(/<table class="comparison">(?=<thead><tr><th scope="col">(?:观察情境|亲本关系|品种例子|因素)<\/th>)/g,'<table class="comparison name-column-comparison">');
 // An overview precedes the detailed methods; do not repeat the same map below.
 if(u.chapter===4&&u.id==='propagation')body='<div data-study-plate="crossing"></div>'+body.replace('<div data-study-plate="crossing"></div>','');
 return body.replace(/<div data-study-plate="([^"]+)"><\/div>/g,(_,key)=>u.chapter===4&&u.id==='structure'?bookStructureTeachingFigure(key):bookTextbookFigure(key));
}

function bookClassificationMap(){return `<figure class="study-plate concept-map taxonomy-map" id="study-classification" data-study-figure="classification"><div class="study-plate-head"><strong>先认层级，再看用途</strong><span>属 → 种 → 品种 → 品系</span></div><div class="concept-root"><small>属 · Genus</small><strong>葡萄属 <i>Vitis</i></strong></div><div class="concept-branches"><section class="concept-branch"><h3>欧亚葡萄</h3><div class="concept-node"><small>种 · Species</small><strong><i>Vitis vinifera</i></strong><span>欧亚葡萄种</span></div><div class="concept-connector" aria-hidden="true">↓</div><div class="taxon-varieties" role="group" aria-label="品种 Variety"><span class="taxon-level-label">品种 · Variety</span><div class="concept-node"><small>品种 · Variety</small><strong>赤霞珠</strong><span>Cabernet Sauvignon</span></div><div class="concept-node"><small>品种 · Variety</small><strong>黑皮诺</strong><span>Pinot Noir</span></div><div class="concept-node taxon-clone-path"><small>品种 · Variety</small><strong>霞多丽</strong><span>Chardonnay</span><div class="taxon-clone"><small>其中一个品系 · Clone</small><strong>Gingin</strong></div></div></div><p class="concept-caption">同一种内有很多品种；同一品种内还可有不同品系。多数常见酿酒品种属于欧亚葡萄种。</p></section><section class="concept-branch"><h3>美洲葡萄种 · 常见例子</h3><div class="taxon-american"><div class="concept-node"><small>种 · Species</small><strong>冬葡萄</strong><span><i>Vitis berlandieri</i></span></div><div class="concept-node"><small>种 · Species</small><strong>河岸葡萄</strong><span><i>Vitis riparia</i></span></div><div class="concept-node"><small>种 · Species</small><strong>沙地葡萄</strong><span><i>Vitis rupestris</i></span></div></div><div class="concept-use"><strong>主要学习用途：抗性砧木育种</strong><p>利用根系抗性等特征；“用于砧木”是用途，不是下一级分类。</p></div></section></div><figcaption>分叉表示包含关系。“欧亚／美洲”在这里是地理分组，不是额外的分类等级；图列常见例子，并非葡萄属的完整分类。</figcaption></figure>`}

function bookPropagationMap(){return `<figure class="study-plate concept-map propagation-map" id="study-crossing" data-study-figure="crossing"><div class="study-plate-head"><strong>繁殖先分两条路：是否经过受精和种子？</strong><span>先看全图，再读下面的方法</span></div><div class="concept-root"><strong>从已有葡萄植株获得后代</strong></div><div class="concept-branches"><section class="concept-branch"><h3><small>路径 ①</small>无性繁殖</h3><p class="concept-brief">用枝条繁殖，延续母株的品种身份</p><div class="propagation-step"><b>扦插／压条</b><span>不经过授粉、受精与种子</span></div><div class="concept-connector" aria-hidden="true">↓</div><div class="propagation-step"><b>克隆后代 · Clone</b><span>同一品种；复制中偶尔仍会发生突变</span></div><p class="concept-caption"><strong>克隆选择</strong>是先挑选合适母株，再用上述方法延续性状；不是每次扦插都会产生新品系。</p></section><section class="concept-branch"><h3><small>路径 ②</small>有性繁殖</h3><p class="concept-brief">授粉 → 受精 → 种子 → 播种、筛选幼苗</p><div class="propagation-outcomes"><div class="propagation-step"><small>亲本属于同一种</small><b>种内杂交 · Crossing</b><span>例如品丽珠 × 长相思 → 赤霞珠</span></div><div class="propagation-step"><small>亲本属于不同种</small><b>种间杂交 · Hybrid</b><span>许多用于砧木育种；也有酿酒用途，如 Vidal</span></div></div><p class="concept-caption">基因重新组合，可筛选新品种；即使同品种亲本授粉，也不能保证复制原品种。</p></section></div><figcaption><strong>关键区别：</strong>品种与品系不是一回事；种内／种间看的是 species。嫁接连接接穗与砧木，不经过授粉与种子，也不因此产生杂交新品种。</figcaption></figure>`}
function bookQuizReview(session,index){
 const targets={1:[['4/grafting',4],['4/propagation',3],['6/cycle',2],['5/heat',5],['5/climate',3],['5/needs',2],['5/heat',6],['5/water',2]],2:[['6/training',2],['6/pruning',1],['6/canopy',1],['6/canopy',5],['6/yield',1],['6/farming',1],['6/harvest',3],['6/harvest',2]]};
 const [key,n]=targets[session][index],u=bookUnits.find(u=>u.chapter+'/'+u.id===key),anchor=`book-${key.replace('/','-')}-${n}`;
 return `<a href="#read/${key}/${anchor}">回看「${u.title}」对应段落 →</a>`;
}
function bookSourceLinks(html,session){
 const map=session===1?{6:['4/structure'],7:['4/types'],8:['4/grafting'],9:['4/propagation'],10:['4/grafting'],11:['4/propagation'],12:['4/varieties'],13:['4/varieties'],14:['6/cycle'],15:['5/needs'],16:['5/heat'],17:['5/light','5/heat'],18:['5/water'],19:['5/needs','5/climate'],20:['5/heat','5/climate'],21:['5/climate'],22:['5/heat'],23:['5/soil','5/water']}:{24:['6/training'],25:['6/density','6/training'],26:['6/training','6/cycle'],27:['6/pruning','6/canopy'],28:['6/pruning'],29:['6/pruning'],30:['6/pruning'],31:['6/pruning','6/canopy'],32:['6/canopy','6/yield'],33:['6/cycle','6/pests'],34:['6/pests'],35:['6/farming'],36:['6/harvest'],37:['6/harvest']};
 return html.replace(/<tr>([\s\S]*?)<\/tr>/g,(row,inside)=>{
  const cells=[...inside.matchAll(/<td>([\s\S]*?)<\/td>/g)];if(cells.length!==3)return row;
  const first=cells[0][1].replace(/<[^>]*>/g,''),m=first.match(/^(\d+)(?:\s|$|[／/])/),keys=m&&map[Number(m[1])];if(!keys||!cells[2][1].includes('href='))return row;
  const links=keys.map(k=>{const u=bookUnits.find(u=>u.chapter+'/'+u.id===k);return `<a href="#read/${k}">${u.title} ↗</a>`}).join('；');
  return '<tr>'+inside.slice(0,cells[2].index)+`<td>${links}</td>`+inside.slice(cells[2].index+cells[2][0].length)+'</tr>';
 });
}
function bookReadView(chapter,id){const u=bookUnits.find(u=>u.chapter===Number(chapter)&&u.id===id);if(!u)return bookChapterView(chapter);const ch=bookChapters.find(c=>c.id===u.chapter),idx=bookUnits.indexOf(u),next=bookUnits[idx+1],key=`book-${u.chapter}-${u.id}`,done=bookUnitDone(u);return `<main id="main" class="wrap lesson-layout book-reading">${bookSidebar(u)}<article class="lesson-content"><a class="back" href="#chapter/${u.chapter}">← 第 ${u.chapter} 章 · ${ch.title}</a><div class="eyebrow">CHAPTER ${u.chapter} / ${ch.en}</div><h1>${u.title}</h1><p class="lesson-deck">${u.desc}</p><div class="reading-meta"><span>第 ${u.chapter} 章 · ${ch.title}</span><span>${u.pages.startsWith('讲义')?u.pages:'课本 p.'+u.pages}</span></div>${bookOutline(u.body)}${bookContent(u)}<div class="notes"><label for="book-note-${u.chapter}-${u.id}">笔记 <small id="note-status">仅保存在当前浏览器</small></label><textarea id="book-note-${u.chapter}-${u.id}" data-note="${key}" placeholder="用自己的话回答本页开头的问题，或记录疑问…">${safe(read(notesKey(key),''))}</textarea></div>${bookLegacyNotes(u)}<div class="lesson-end"><button class="complete-btn ${done?'done':''}" data-book-complete="${u.chapter}/${u.id}">${done?'✓ 已完成阅读':'○ 标记本单元已读'}</button><a class="next-link" href="${next?bookHref(next):'#practice'}">${next?'下一单元 · '+next.title:'进入练习与复习'} →</a></div></article></main>`}
function bindBook(){document.querySelectorAll('[data-book-complete]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.bookComplete,a=bookDone(),next=a.includes(key)?a.filter(x=>x!==key):[...a,key];if(!save('wset3-book-completed',next)){toast('阅读进度保存失败，请重试。');return;}const y=window.scrollY;render();window.scrollTo(0,y);toast(next.includes(key)?'已保存阅读进度。':'已取消已读标记。')}))}
function bookCanonicalRoute(hash){const moved={'read/6/density/book-6-density-2':'read/6/cases/book-6-cases-1','read/6/density/book-6-density-3':'read/6/cases/book-6-cases-2'};if(moved[hash])return moved[hash];const a=hash.split('/');if(a[0]==='lesson')return (bookLegacy['1/'+a[1]]||'#chapter/4').slice(1);if(a[0]==='session2'&&a[1])return(bookLegacy['2/'+a[1]]||'#chapter/6').slice(1);if(a[0]==='session1')return'home';if(a[0]==='session2')return'chapter/6';return hash}
function initBook(){
 // Stable IDs keep map self-assessments and old quiz evidence intact.
 const topics={
 's1:needs':[5,['needs','heat','water']], 's1:climate':[5,['climate','heat']], 's1:soil':[5,['soil','water']],
 's1:propagation':[4,['types','propagation']], 's1:cycle':[4,['structure']], 's1:roots':[4,['grafting']],
 's2:training':[6,['training','density']], 's2:pruning':[6,['pruning','cycle']], 's2:canopy':[6,['canopy']],
 's2:balance':[6,['yield','density']], 's2:health':[6,['pests','farming']], 's2:harvest':[6,['harvest']]
 };
 for(const t of knowledgeTopics){const v=topics[t.id];if(v){t.chapter=v[0];t.bookUnits=v[1].map(id=>`${v[0]}/${id}`);t.href=`#read/${v[0]}/${v[1][0]}`;}if(t.id==='s1:cycle'){t.bookUnits=['4/structure','6/cycle'];t.title='结构与年周期';t.summary='用木龄解释结果位置，再将季节变化与管理作业对应起来。';}t.chapters=[...new Set(t.bookUnits.map(k=>Number(k.split('/')[0])))];t.image='';}
}
// Source indexes link by textbook page, not by the old lesson bucket.
const bookPageUnits={30:['4/structure','4/grafting'],31:['4/structure'],32:['4/types','4/propagation'],33:['4/propagation'],34:['4/grafting','4/propagation'],35:['4/grafting'],36:['5/needs','6/cycle'],37:['5/heat','5/needs'],38:['5/heat'],39:['5/heat'],40:['5/heat'],41:['5/heat','5/light'],42:['5/light','5/water'],43:['5/water'],44:['5/water','5/climate'],45:['5/climate','5/soil'],46:['5/water','5/soil'],47:['6/establish'],48:['6/establish','6/cycle'],49:['6/cycle'],50:['6/cycle'],51:['6/cycle','6/training','6/pruning'],52:['6/pruning','6/canopy'],53:['6/pruning','6/canopy'],54:['6/density','6/yield'],55:['6/cases'],56:['6/cases'],57:['6/pests'],58:['6/pests','6/farming'],59:['6/farming','6/harvest'],60:['6/harvest'],61:['6/harvest']};
function bookPageLinks(page){return (bookPageUnits[page]||[]).map(key=>{const [ch,id]=key.split('/'),u=bookUnits.find(u=>u.chapter===Number(ch)&&u.id===id);return u?`<a href="${bookHref(u)}">第 ${ch} 章 · ${u.title} ↗</a>`:''}).join('；')}
function bookFigureLink(f){const map={
 '4.1':['4/structure','shoot','新梢部位标注'], '4.2':['6/pruning','training-comparison','头状短枝的冬夏对照'], '4.3':['6/pruning','training-comparison','头状替换长枝的冬夏对照'], '4.4':['6/pruning','training-comparison','主蔓短枝的冬夏对照'], '4.5':['4/grafting','graft-methods','室内嫁接与接口保护'], '4.6':['4/grafting','graft-methods','田间换接保留的结构'],
 '5.1':['5/needs','needs','五个生长条件'], '5.2':['5/heat','latitude','纬度与能量分布'], '5.3':['5/heat','terraces','梯田台面与挡土结构；同节另有石块蓄热图'], '5.4':['5/heat','frost-tools','加热器、风机及防霜喷灌'], '5.5':['5/heat','coastal-altitude','海风、雾与海拔；同节另有排冷与坡向图'], '5.6':['5/water','irrigation','三种灌溉供水路径'], '5.7':['6/pests','nets','防雹网与防鸟网的区别'], '5.8':['5/soil','chlorosis','黄化与叶片功能'],
 '6.1':['6/establish','new-vines','幼藤套管、支撑与供水设施'], '6.2':['6/cycle','annual-cycle','阶段顺序、月份与作业表'], '6.3':['6/pruning','training-comparison','三种结构冬夏对照，Sylvoz 按讲义单列'], '6.4':['6/cases','case-dry','低密度独立灌木、冠层遮阴与争水'], '6.5':['6/cases','case-wet','高密度头状长枝与VSP园地组合'], '6.6':['6/pests','nets','果区防鸟网'], '6.7':['6/harvest','harvest-methods','机械采收果粒，果梗通常留藤'], '6.8':['6/harvest','harvest-methods','人工保留完整果串']
 };const v=map[f[1]];return v?`<a href="#read/${v[0]}/study-${v[1]}">${v[2]} ↗</a>`:bookPageLinks(f[2]);}

/* Refined remaining teaching illustrations. Source text and storage IDs stay in place.
   Captions live below their own panel; labels remain selectable and responsive. */
function bookRefinedArt(asset,side,alt){
 const src='assets/'+asset+'-refined.webp';
 return side===null?`<div class="refined-art"><img src="${src}" alt="${alt}" loading="lazy" width="1536" height="1024"></div>`:`<div class="refined-art refined-art-half ${side===1?'refined-art-right':''}"><img src="${src}" alt="${alt}" loading="lazy" width="1774" height="887"></div>`;
}
function bookRefinedLabels(labels){return labels.length?`<div class="botanical-panel-labels refined-panel-labels">${labels.map(t=>`<span>${t}</span>`).join('')}</div>`:''}
function bookRefinedSvgLabels(svg){return [...svg.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').trim()).filter(Boolean)}
function bookRefinedSwap(html,specs){let i=0;const out=html.replace(/<svg\b[\s\S]*?<\/svg>/g,svg=>{const a=specs[i++];if(!a)throw Error('Unmapped refined panel');const alt=svg.match(/<title>([\s\S]*?)<\/title>/)?.[1]||a[0];return (a[3]?`<div class="refined-annotated">${bookRefinedArt(a[0],a[1],alt)}${a[3]}</div>`:bookRefinedArt(a[0],a[1],alt))+bookRefinedLabels(a[2]||bookRefinedSvgLabels(svg));});if(i!==specs.length)throw Error('Refined panel count mismatch '+i);return out;}
function bookRefinedStudyFigure(key){
 const three=bookThreeColumnFigure(key);if(three!==null)return three;
 if(key==='light-reflection'){
  const overlay=bookBotanicalOverlay('light-paths-v2',[['M340 190L1000 350'],['M315 220L620 785L1000 490']],[[640,245,1],[690,685,2]]);
  return bookRefinedSwap(studyDiagram(key),[['light-reflection-v2',null,['① 直接日照：太阳 → 叶片','② 反射光：太阳 → 浅色地表／水面 → 叶片'],overlay]]);
 }
 const clarityPairs={'heat-hazards':'heat-hazards-v2','vsp':'vsp-comparison-v2','resource-yield':'resource-yield-v2'};
 if(clarityPairs[key])return bookRefinedSwap(studyDiagram(key),[[clarityPairs[key],0],[clarityPairs[key],1]]);
 const pairs={'soil-water':'soil-structure','fruit-set':'fruit-set','height':'height','guyot':'guyot','bud-fruitfulness':'bud-fruitfulness','green-harvest':'green-harvest','botrytis':'botrytis','harvest-methods':'harvest-methods'};
 if(pairs[key]){
  let html=studyDiagram(key);
  if(key==='fruit-set')html=html.replace('看果串是否稀疏：更多花没能形成幼果，果粒数量减少。虚线只是对照位置，并非会留在串上的器官。','看左图稀疏的果串和空出的分枝：更多花没能形成幼果，果粒数量减少。');
  if(key==='harvest-methods')html=html.replace('此图解释采收对象，省略机器结构。','左图看剪下的完整果串；右图看跨行采收机，右下角展示振落与接果过程。');
  const labels={
   'soil-water':[['大孔隙让多余水流出'],['细孔隙与水膜：保留部分可用水']],
   'fruit-set':[['落花：果粒数量减少，果串较稀疏'],['正常果粒与小而无籽果粒混合']],
   'height':[['矮干：结果部位靠近地面','可更多利用地表热量'],['高干：结果部位较高','较远离最冷近地空气']],
   'guyot':[['一条一年生结果长枝','短的更新枝另计'],['两条一年生结果长枝，向两侧绑','没有永久水平主蔓']],
   'harvest-methods':[['剪断串梗','果串保留果梗'],['果梗通常留藤','接果 → 输送 → 容器']]
  }[key];
  return bookRefinedSwap(html,[[pairs[key],0,labels?.[0]],[pairs[key],1,labels?.[1]]]);
 }
 if(key==='frost-tools'){
  let html=bookReplaceCardImage(studyDiagram(key),'加热器 Heaters','textbook-5-4-heaters','课本图5.4：纳帕县葡萄园中的两座加热装置','图 5.4 · 纳帕县的加热器：燃烧供热，加热空气并促进流动，用于降低春季霜冻风险。');
  const arrows=bookBotanicalOverlay('refined-wind',[["M600 210Q810 320 645 595",true],["M430 650Q290 500 410 310",true]],[], '0 0 887 887');
  return bookRefinedSwap(html,[['frost-equipment',0,['上层较暖','近地较冷','箭头：混合暖冷空气'],arrows],['frost-equipment',1,['水持续结冰 → 释放潜热']],['frost-site-design',null,['排冷通道 ＋ 较高结果部位','避开积冷洼地']]]).replace('class="study-card"><h4>风机','class="study-card wind-machine-card"><h4>风机');
 }
 if(key==='new-vines'){
  const overlay=bookBotanicalOverlay('refined-new-vines',[["M440 160L200 240"],["M1110 200L1090 305"],["M600 580L744 580"],["M1160 690L1010 770"]],[[420,140,1],[1130,180,2],[570,580,3],[1180,670,4]]);
  return bookRefinedSwap(studyDiagram(key),[['new-vines',null,['① 支柱：固定支撑','② 铁丝：支撑与定位枝条','③ 套管：保护幼藤','④ 滴灌管：根区供水'],overlay]]);
 }
 if(key==='case-dry'||key==='case-wet')return bookRefinedSwap(studyDiagram(key),[['vineyard-cases',key==='case-dry'?0:1]]);
 if(key==='nets')return bookRefinedSwap(bookReplaceCardImage(studyDiagram(key),'防雹网：上方拦截冰雹','textbook-5-7-hail','课本图5.7：阿根廷葡萄园的架空防雹网，网面位于冠层上方','图 5.7 · 防雹网架在冠层上方，拦截冰雹。高风险园地可能接受较高架设成本；与包覆果区的防鸟网分开识别。'),[['bird-net',null,['网沿果区包覆，叶幕可露在上方']]]);
 if(key==='density'){let i=0;return studyDiagram(key).replace(/<svg\b[\s\S]*?<\/svg>/g,()=>bookDensityIllustration(i++===1));}
 if(key==='france-climates')return studyDiagram(key).replace(/<svg\b[\s\S]*?<\/svg>/g,()=>bookFranceIllustration());
 return null;
}
function bookThreeColumnFigure(key){
 const arts={'irrigation':'irrigation-trio','training-types':'training-trio','spur-renewal':'spur-renewal-trio','cane-renewal':'cane-renewal-trio','summer-actions':'summer-actions-trio','pest-pathways':'pest-pathways-trio','pest-identities':'pest-identities-trio','disease-signs':'disease-signs-trio'};
 if(!arts[key]&&key!=='climate-patterns')return null;
 let i=0,html=studyDiagram(key);
 const marks=(paths=[],circles=[])=>`<svg class="botanical-callouts" viewBox="0 0 800 800" aria-hidden="true"><g fill="none" stroke="#a54e60" stroke-width="4" stroke-linecap="round">${paths.map(([x,y])=>`<path d="M${x-14} ${y-14}l28 28m-28 0l28 -28"/>`).join('')}${circles.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" stroke-dasharray="7 5"/>`).join('')}</g></svg>`;
 const overlays={
  'spur-renewal':['',marks([[270,375],[435,552]]),''],
  'cane-renewal':['',marks([[277,392]]),''],
  'summer-actions':[marks([[447,154]]),marks([],[[575,440,115]]),marks([[595,646]])],
  'pest-pathways':[marks([],[[235,630,95]]),marks([],[[445,500,100]]),marks([],[[600,445,110]])]
 };
 const labels={
  'irrigation':[['黑色管线 → 滴头 → 根区','局部供水，较精准、可控'],['喷头 → 地表 → 下渗','湿润范围较广，环境更湿'],['地表铺水 → 大范围下渗','平坦地形与充足水源']],
  'spur-renewal':[['上一季新梢已木质化'],['红叉：剪除位置','淡色：将移除的枝段','保留两芽短枝'],['留下新的一年生短枝','下个生长季由保留芽萌发']],
  'cane-renewal':[['右侧：上一轮用过的结果长枝'],['红叉：移除旧结果长枝','淡色：旧枝及其上枝条','新长枝 ＋ 更新短枝'],['横绑新的一年生结果长枝']],
  'summer-actions':[['红叉：新梢顶端'],['红圈：果区部分叶片'],['红叉：整根多余新梢的基部','淡色：待移除新梢']],
  'pest-pathways':[['红圈：地下根系受害部位'],['红圈：叶片受害部位'],['红圈：果实受害部位']],
  'pest-identities':[['根部放大示意','小型昆虫，六足'],['土壤中的微小蠕虫','无足，不是昆虫'],['叶片上的螨类放大示意','成螨八足，红色仅为例子']],
  'disease-signs':[['叶面黄斑','圆圈：叶背灰白绒状层'],['绿色组织表面的灰白粉层'],['果实灰色霉层与腐烂']]
 };
 html=html.replace(/<svg\b[\s\S]*?<\/svg>/g,svg=>{
  const n=i++;if(key==='climate-patterns')return bookClimatePanel(n);
  const alt=svg.match(/<title>([\s\S]*?)<\/title>/)?.[1]||key;
  const pic=`<div class="tri-art"><img src="assets/${arts[key]}-${n}.webp" alt="${alt}" width="800" height="800" loading="lazy"></div>`;
  return `<div class="refined-annotated">${pic}${overlays[key]?.[n]||''}</div>`+bookRefinedLabels(labels[key]?.[n]||bookRefinedSvgLabels(svg));
 });
 if(i!==3)throw Error('Expected 3 panels: '+key);
 html=html.replace('class="study-plate"','class="study-plate three-column-plate"').replace(/class="study-grid three(?: study-steps)?"/,'class="study-three-clear"');
 if(key==='spur-renewal')html=html.replace('红叉：剪除；虚线：将移除','红叉：剪除；淡色：将移除');
 if(key==='cane-renewal')html=html.replace('淡色虚线表示剪除部分','淡色枝条表示剪除部分');
 if(key==='irrigation')html=html.replace('每株附近局部供水，可配合电脑控制。','沿黑色管线找滴头：在每株根区附近局部供水，较精准、可控，可配合电脑控制；滴灌管与支撑铁丝不是同一设施。');
 return html;
}
function bookClimatePanel(index){
 const id='climate-compare-'+index;
 const curves=['M35 133C70 133 92 119 118 75S166 21 187 61S232 129 272 133','M35 113C80 113 100 98 122 83S163 60 186 80S230 112 272 113','M35 115C79 114 99 94 122 75S166 48 187 70S234 112 272 115'];
 const rains=[[28,34,25,32],[44,43,39,45],[60,35,9,40]][index];
 const seasons=['冬','春','夏','秋'];
 return `<div class="climate-clear"><div class="climate-chart-label"><b>温度</b><span>${index===0?'冬夏温差较大':'冬夏温差较小'}</span></div><svg viewBox="0 0 300 175" role="img" aria-label="${index===0?'大陆性：冬夏温度差较大':'水体调节下冬夏温度差较小'}，相对趋势示意"><defs><linearGradient id="${id}" x2="0" y2="1"><stop stop-color="#c79959" stop-opacity=".18"/><stop offset="1" stop-color="#c79959" stop-opacity="0"/></linearGradient></defs><path d="M34 25H279M34 80H279M34 140H279" stroke="#dedfce" stroke-dasharray="3 4" fill="none"/><path d="M34 20V140H279" stroke="#a7ad96" fill="none"/><path d="${curves[index]}L272 140H35Z" fill="url(#${id})"/><path d="${curves[index]}" fill="none" stroke="#ad793d" stroke-width="3"/><g font-family="sans-serif" font-size="13" fill="#68715b"><text x="8" y="32">高</text><text x="8" y="140">低</text>${['冬','春','夏','秋','冬'].map((s,i)=>`<text x="${35+i*59.25}" y="164" text-anchor="middle">${s}</text>`).join('')}</g></svg><div class="climate-chart-label"><b>降雨</b><span>${index===0?'雨型随地区而异':index===1?'全年较均匀':'冬雨夏干'}</span></div><svg viewBox="0 0 300 122" role="img" aria-label="${index===0?'大陆性地区降雨模式有差异，柱形仅为一例':index===1?'全年各季降雨较均匀':'冬季多雨，夏季少雨'}；相对雨量示意"><path d="M34 12V92H279" stroke="#a7ad96" fill="none"/>${rains.map((v,i)=>`<rect x="${49+i*58}" y="${92-v}" width="30" height="${v}" rx="3" fill="#759ba4"/>`).join('')}<g font-family="sans-serif" font-size="13" fill="#68715b"><text x="8" y="22">多</text><text x="8" y="92">少</text>${seasons.map((s,i)=>`<text x="${64+i*58}" y="114" text-anchor="middle">${s}</text>`).join('')}</g></svg>${index===0?'<div class="climate-region-note">夏季常干；具体雨型仍有地区差别。</div>':''}</div>`;
}
function bookDensityIllustration(dense){
 const rows=dense?4:3,cols=dense?6:3,x0=60,y0=50,dx=dense?65:162.5,dy=dense?66:99,w=dense?48:64;
 let plants='';for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)plants+=`<image href="assets/density-canopy-refined.webp" x="${x0+c*dx-w/2}" y="${y0+r*dy-w/2}" width="${w}" height="${w}"/>`;
 const id=dense?'high':'low';return `<svg class="refined-density" viewBox="0 0 500 330" role="img" aria-label="同面积俯视，${rows*cols}株，横向株距、纵向行距"><defs><marker id="density-${id}" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1L7 4L1 7" fill="none" stroke="#688d99" stroke-width="1.2"/></marker><pattern id="soil-${id}" width="23" height="19" patternUnits="userSpaceOnUse"><circle cx="3" cy="7" r=".7" fill="#b9aa8b" opacity=".3"/></pattern></defs><rect x="20" y="12" width="405" height="270" rx="5" fill="#eee8d9" stroke="#c8c4b1"/><rect x="20" y="12" width="405" height="270" fill="url(#soil-${id})"/>${Array.from({length:rows},(_,r)=>`<path d="M30 ${y0+r*dy}H415" stroke="#c8b98e" stroke-dasharray="3 5"/>`).join('')}${plants}<g stroke="#688d99" fill="none" stroke-width="1.6" marker-start="url(#density-${id})" marker-end="url(#density-${id})"><path d="M${x0} 300H${x0+dx}"/><path d="M450 ${y0}V${y0+dy}"/></g><g font-family="sans-serif" font-size="15" fill="#46533e"><text x="${x0+dx/2}" y="324" text-anchor="middle">株距</text><text x="466" y="${y0+dy/2-6}" text-anchor="middle">行<tspan x="466" dy="19">距</tspan></text></g></svg>${bookRefinedLabels(['俯视：每个叶冠代表一株',dense?'更多竞争；单株空间较小':'较少竞争；单株空间较大'])}`;
}
function bookFranceIllustration(){return `<div class="france-refined-layout"><svg class="refined-france" viewBox="0 0 720 550" role="img" aria-label="法国本土地理位置：西南波尔多、东北香槟和夏布利、地中海沿岸"><defs><linearGradient id="france-land" x2=".8" y2="1"><stop stop-color="#e6e9d8"/><stop offset="1" stop-color="#c7cfae"/></linearGradient><pattern id="france-sea" width="20" height="12" patternUnits="userSpaceOnUse"><path d="M0 8q5 -3 10 0t10 0" stroke="#96b1b7" stroke-width=".5" fill="none" opacity=".35"/></pattern></defs><rect width="720" height="550" rx="5" fill="#edf1ed"/><rect width="720" height="550" fill="url(#france-sea)"/><path d="M505.6 127.7 L521.2 140.3 L568.8 149.1 L552.1 182.0 L547.9 216.2 L538.8 224.4 L523.8 220.0 L524.9 232.2 L500.7 259.2 L500.2 280.9 L516.0 273.4 L527.3 294.4 L526.0 308.0 L535.7 326.0 L524.2 340.6 L532.7 377.8 L550.6 383.9 L546.9 404.7 L517.0 431.8 L451.9 418.8 L403.8 434.4 L400.0 463.3 L361.8 469.5 L324.7 447.8 L312.7 458.2 L251.9 436.4 L238.8 417.7 L255.8 388.9 L262.1 293.3 L228.1 242.9 L203.7 218.6 L153.3 200.2 L150.0 165.2 L192.7 154.7 L248.2 167.1 L237.7 112.7 L268.8 133.3 L345.7 95.9 L355.6 56.6 L384.4 46.9 L389.2 63.8 L404.6 64.5 L419.9 83.8 L442.9 106.4 L459.9 102.7 L488.7 124.6 L496.1 128.8 L505.6 127.7Z M590.1 455.9 L611.4 437.5 L617.0 478.7 L606.1 515.8 L591.1 506.0 L583.5 473.7 L590.1 455.9Z" fill="url(#france-land)" stroke="#7d8b6d" stroke-width="1.8" stroke-linejoin="round"/><g fill="#405040" font-size="17" font-family="sans-serif"><text x="28" y="252" fill="#688d99">大西洋</text><text x="442" y="482" fill="#688d99">地中海</text><text x="50" y="58">北 ↑</text></g><g fill="none" stroke-width="1.5"><path d="M95 270Q145 255 218 297" stroke="#688d99" stroke-dasharray="5 5"/><path d="M282 349L239 359H90" stroke="#688d99"/><path d="M434 138L490 92H660" stroke="#9a7c48"/><path d="M427 208L500 205H650" stroke="#9a7c48"/><path d="M464 419L563 390H660" stroke="#7c4656"/></g><g stroke="#fbfaf5" stroke-width="3"><circle cx="282" cy="349" r="7" fill="#688d99"/><circle cx="434" cy="138" r="7" fill="#9a7c48"/><circle cx="427" cy="208" r="7" fill="#9a7c48"/><circle cx="464" cy="419" r="7" fill="#7c4656"/></g><g fill="#35432f" font-family="sans-serif" font-size="17"><text x="90" y="387">波尔多</text><text x="510" y="82">香槟</text><text x="510" y="195">夏布利</text><text x="563" y="378">南部沿岸</text></g><text x="184" y="278" fill="#748262" font-family="serif" font-size="32" letter-spacing="9">FRANCE</text></svg><div class="france-climate-notes"><section><b>西部 · 海洋性</b><span>波尔多：大西洋影响</span></section><section><b>内陆 · 凉爽大陆性</b><span>香槟、夏布利</span></section><section><b>南部 · 地中海性</b><span>地中海沿岸：冬雨夏干</span></section></div></div>`;}
