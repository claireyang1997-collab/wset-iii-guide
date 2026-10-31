/* Teaching plates: code-native diagrams, with labels kept as selectable text. */
function wmGrapeFigure(d){
 const parts=d.parts||[];
 return `<figure class="wm-plate wm-grape-plate" id="wmfig-${wmEscape(d.id)}" data-wm-figure="berry" aria-labelledby="wm-grape-heading">
 <div class="wm-plate-title" id="wm-grape-heading">${wmEscape(d.title)}</div>
 <p class="wm-grape-intro">${wmEscape(d.intro)}</p>
 <div class="wm-grape-art">
 <img src="assets/grape-composition-7-1.png" width="1122" height="1402" alt="葡萄纵向剖面：外层深紫色果皮、内部黄绿色果肉和两颗棕色葡萄籽，顶部连接果梗。">
 <svg class="wm-grape-leaders" viewBox="0 0 100 125" aria-hidden="true"><title>葡萄各部分的标注引线</title><g fill="none" stroke="#654d43" stroke-width=".55" stroke-linecap="round" stroke-linejoin="round"><path d="M67 12H58L51 16"/><path d="M21 27H30L29 32"/><path d="M78 72H72L65 66"/><path d="M20 94H28L30 84"/></g><g fill="#7d4352" stroke="#fffdf6" stroke-width=".5"><circle cx="51" cy="16" r="1"/><circle cx="29" cy="32" r="1"/><circle cx="65" cy="66" r="1"/><circle cx="30" cy="84" r="1"/></g></svg>
 <span class="wm-grape-label wm-grape-stalk">① 果梗</span><span class="wm-grape-label wm-grape-skin">② 果皮</span><span class="wm-grape-label wm-grape-seed">① 葡萄籽</span><span class="wm-grape-label wm-grape-flesh">③ 果肉</span>
 </div><figcaption class="wm-grape-explanations">${parts.map((p,i)=>`<section class="wm-grape-part"><h3><span>${i+1}</span>${wmEscape(p.label)}</h3><p>${wmEscape(p.text)}</p></section>`).join('')}</figcaption>
 </figure>`;
}
function wmPhotoFigure(d){
 const count=d.photos.length;
 const media=p=>p.crop?`<svg class="wm-photo-media wm-photo-crop" viewBox="${p.crop.viewBox.join(' ')}" role="img" aria-label="${wmEscape(p.title)}" preserveAspectRatio="xMidYMid meet"><g transform="translate(0 ${p.crop.sourceWidth}) rotate(-90)"><image href="${wmEscape(p.image)}" width="${p.crop.sourceWidth}" height="${p.crop.sourceHeight}"/></g></svg>`:`<img class="wm-photo-media" src="${wmEscape(p.image)}" alt="${wmEscape(p.title)}"${p.width&&p.height?` width="${p.width}" height="${p.height}"`:""} loading="lazy" decoding="async">`;
 return `<figure id="wmfig-${wmEscape(d.id)}" class="wm-plate wm-photo-plate${d.wide?' wm-photo-wide':''}" data-wm-figure="${wmEscape(d.type)}">
 <div class="wm-plate-title">${wmEscape(d.title)}</div>
 <div class="wm-plate-grid wm-plate-${count}">${d.photos.map(p=>`<figure class="wm-plate-panel wm-photo-panel"><h3>${wmEscape(p.title)}</h3>${media(p)}<figcaption class="wm-photo-caption">${wmEscape(p.caption)}</figcaption></figure>`).join('')}</div>
 ${d.caption?`<figcaption>${wmEscape(d.caption)}</figcaption>`:''}</figure>`;
}
function wmCompositionFigure(d){
 return `<figure id="wmfig-${wmEscape(d.id)}" class="wm-plate wm-composition-plate" data-wm-figure="composition"><div class="wm-comp-heading"><strong>${wmEscape(d.title)}</strong><div><a href="${wmEscape(d.fullImage)}" target="_blank" rel="noopener">查看完整标注图 ↗</a><a href="${wmEscape(d.fullImage)}" download>下载 SVG ↓</a></div></div><div class="wm-comp-layout"><div class="wm-comp-art"><img src="${wmEscape(d.image)}" width="300" height="700" alt="葡萄酒瓶剖面示意；编号1水分、2乙醇、3糖分、4酸类、5单宁和颜色、6香气和风味物质。" loading="lazy" decoding="async"></div>${d.parts.map(p=>`<section class="wm-comp-note wm-comp-${p.id}" aria-labelledby="wm-comp-${p.id}-title"><h3 id="wm-comp-${p.id}-title"><span style="--component:${p.color}">${p.number}</span>${wmEscape(p.label)}<small>${wmEscape(p.range)}</small></h3>${p.paragraphs.map(t=>`<p>${wmEscape(t)}</p>`).join('')}</section>`).join('')}</div><p class="wm-comp-notice">${wmEscape(d.notice)}</p><figcaption>${wmEscape(d.caption)}</figcaption></figure>`;
}
function wmPackagingFigure(d){
 const panels=[
  {label:'玻璃瓶',image:'packaging-glass-clear.svg',width:500,height:540,alt:'放大的绿色玻璃葡萄酒瓶，标出瓶口与封口、玻璃瓶身和瓶底。',notes:['惰性，长期陈年表现成熟','重量与运输空间较大']},
  {label:'塑料瓶',image:'packaging-plastic-clear.svg',width:500,height:540,alt:'放大的透明塑料葡萄酒瓶，画出螺旋瓶盖、瓶口螺纹、瓶身与酒液。',notes:['较轻、较易运输','逐渐透氧，适合较快饮用']},
  {label:'袋装盒',image:'packaging-bag-clear.svg',width:1000,height:456,alt:'袋装盒倒酒前后的剖面对比：纸盒保持形状，柔性内袋随酒液减少而收缩。标出纸盒、内袋及出酒阀。',notes:['倒酒时内袋逐渐收缩','袋材仍透氧，不用于长期陈年']}
 ];
 return `<figure id="wmfig-${wmEscape(d.id||d.type)}" class="wm-plate wm-packaging-plate" data-wm-figure="packaging"><div class="wm-plate-title">${wmEscape(d.title||'包装特点示意')}</div><div class="wm-packaging-grid">${panels.map((p,i)=>`<section class="wm-package-panel${i===2?' wm-package-wide':''}"><h3>${wmEscape(p.label)}</h3><picture>${i===2?'<source media="(max-width:650px)" srcset="assets/packaging-bag-clear-mobile.svg" width="500" height="900">':''}<img src="assets/${p.image}" width="${p.width}" height="${p.height}" alt="${wmEscape(p.alt)}" loading="lazy" decoding="async"></picture><ul>${p.notes.map(t=>`<li>${wmEscape(t)}</li>`).join('')}</ul></section>`).join('')}</div><figcaption>${wmEscape(d.caption||'包装和封口共同影响保护能力；还须结合目标饮用时间与运输成本。')}</figcaption></figure>`;
}
function wmRefinedFigure(d){return d.type==='packaging'?wmPackagingFigure(d):wmMaterialFigure(d);}
function wmLeesFigure(d){
 const panels=[
  {label:'静置：酒泥沉在底部',image:'lees-settled-cutaway.svg',alt:'橡木桶剖面：细酒泥形成底部浅金色沉积层，上方为酒液。',notes:['移除粗酒泥','可按风格保留细酒泥接触']},
  {label:'搅动：细酒泥重新悬浮',image:'lees-stirred-cutaway.svg',alt:'橡木桶剖面：搅桶棒接触桶底，蓝色箭头表示酒液流动，金色颗粒离开沉积层并悬浮。',notes:['搅桶使酒液与细酒泥接触','可增加质感、面包及饼干类特征']}
 ];
 return `<figure id="wmfig-${wmEscape(d.id||d.type)}" class="wm-plate wm-lees-plate" data-wm-figure="lees"><div class="wm-plate-title">${wmEscape(d.title||'酒泥接触与搅桶机制示意')}</div><div class="wm-lees-grid">${panels.map(p=>`<section class="wm-lees-panel"><h3>${wmEscape(p.label)}</h3><img src="assets/${p.image}" width="600" height="600" alt="${wmEscape(p.alt)}" loading="lazy" decoding="async"><ul>${p.notes.map(t=>`<li>${wmEscape(t)}</li>`).join('')}</ul></section>`).join('')}</div><p class="wm-lees-key">金色颗粒表示细酒泥，蓝色箭头表示酒液流动；颗粒大小与循环路径为示意。</p><figcaption>${wmEscape(d.caption||'细酒泥主要包括死亡酵母等沉淀。搅桶是可选操作，不等于所有沉淀都应长期留酒。')}</figcaption></figure>`;
}
function wmFreezeFigure(d){
 const stages=[
  {number:'01',label:'冻态采收',image:'freeze-grape-cutaway-v2',alt:'带霜葡萄及果粒放大剖面：一部分水结成浅蓝色冰晶，其余金色汁液仍含溶解的糖和酸。',notes:['水的一部分结成冰','葡萄须保持冰冻进入压榨']},
  {number:'02',label:'冻态压榨',image:'freeze-press-cutaway-v2',alt:'篮式压榨原理剖面：压板下压，冰晶与果皮留在篮内；汁液穿过筛底进入集汁槽，由出汁口流入收集容器。',notes:['含糖汁液流出','分离部分水，糖与酸浓缩']}
 ];
 return `<figure id="wmfig-${wmEscape(d.id||d.type)}" class="wm-plate wm-freeze-plate" data-wm-figure="freeze"><div class="wm-plate-title">${wmEscape(d.title||'冰冻葡萄与浓缩汁 · 机制示意')}</div><div class="wm-freeze-grid">${stages.map(p=>`<section class="wm-freeze-stage"><h3><span>${p.number}</span>${wmEscape(p.label)}</h3><picture><source media="(max-width:540px)" srcset="assets/${p.image}-mobile.svg"><img src="assets/${p.image}.svg" width="620" height="620" alt="${wmEscape(p.alt)}" loading="lazy" decoding="async"></picture><ul>${p.notes.map(t=>`<li>${wmEscape(t)}</li>`).join('')}</ul></section>`).join('')}</div><div class="wm-freeze-result"><span class="wm-freeze-result-number">03</span><div><h3>获得少量浓缩汁</h3><p>部分水以冰的形式留在机内，流出的汁液量减少，糖与酸的浓度提高。</p></div></div><figcaption>${wmEscape(d.caption||'以篮式压榨剖面表现分离原理；颜色与形体比例为示意。浓缩汁仍需发酵成酒，成酒甜度取决于剩余糖分。')}</figcaption></figure>`;
}
function wmCapFigure(d){
 const panels=[
  {label:'压帽',english:'Punching down',image:'punch',alt:'发酵罐剖面：压帽棒的圆盘将局部酒帽压入酒液，周围的酒帽仍浮在表面。',notes:['工具把上浮酒帽压回酒液','增加接触，强度可调']},
  {label:'淋皮',english:'Pumping over',image:'pump-over',alt:'发酵罐底部抽出的酒液经过泵和外部管路，到顶部喷淋酒帽并回到罐内。',notes:['从底部抽酒、泵到顶部','酒液淋过酒帽并回到罐内']},
  {label:'倒罐返浇',english:'Rack and return',image:'rack-return',alt:'两个先后步骤：先将酒液排入接酒罐，酒帽落下；再将接酒罐中的酒液整体返浇到原罐顶部，冲散酒帽。',notes:['先排出酒液，再整体返浇','与持续小量淋皮区分']},
  {label:'旋转式发酵',english:'Rotary fermentation',image:'rotary',alt:'带支架、轴承和驱动装置的水平旋转发酵罐剖面；滚动使皮渣被带起，再与酒液反复混合。',notes:['容器转动使皮渣与汁液混合','设备、效率与提取强度一起考虑']}
 ];
 return `<figure id="wmfig-${wmEscape(d.id||d.type)}" class="wm-plate wm-cap-plate" data-wm-figure="cap"><div class="wm-plate-title">${wmEscape(d.title||'图 9.1、9.2 · 酒帽管理的四条路径')}</div><div class="wm-cap-key"><span><i class="wm-cap-skin"></i>酒帽／皮渣</span><span><i class="wm-cap-wine"></i>酒液</span><span><i class="wm-cap-arrow">→</i>操作或流动方向</span></div><div class="wm-cap-grid">${panels.map((p,i)=>`<section class="wm-cap-panel"><h3><span>${String(i+1).padStart(2,'0')}</span><div>${wmEscape(p.label)}<small>${wmEscape(p.english)}</small></div></h3><picture><source media="(max-width:540px)" srcset="assets/cap-${p.image}-cutaway-v2-mobile.svg"><img src="assets/cap-${p.image}-cutaway-v2.svg" width="620" height="640" alt="${wmEscape(p.alt)}" loading="lazy" decoding="async"></picture><ul>${p.notes.map(t=>`<li>${wmEscape(t)}</li>`).join('')}</ul></section>`).join('')}</div><figcaption>${wmEscape(d.caption||'设备剖面与流向为原理示意，非设备比例。提取效果还取决于温度、操作频率、接触时间及原料。')}</figcaption></figure>`;
}
function wmSteepFigure(d){
 const observations=[
  {number:'01',title:'坡度与通行空间',text:'机械进入和作业受限制',detail:'陡坡与狭窄行间，限制设备进入、转向和操作。'},
  {number:'02',title:'手工采收与园地操作',text:'需要更多人工',detail:'人工操作与搬运更困难，采收和园地管理需要投入更多人力。'},
  {number:'03',title:'沿坡搬运',text:'作业与搬运更耗时',detail:'在窄路和坡地运送葡萄，往返与作业可能更慢。'}
 ];
 return `<figure id="wmfig-${wmEscape(d.id||d.type)}" class="wm-plate wm-steep-plate wm-steep-editorial" data-wm-figure="steep"><div class="wm-plate-title">${wmEscape(d.title||'陡坡如何转化为成本 · 因果示意')}</div><div class="wm-steep-art"><a href="assets/steep-vineyard-work-v3.webp" target="_blank" rel="noopener" aria-label="查看陡坡作业场景插画大图"><img src="assets/steep-vineyard-work-v3.webp" width="1536" height="1024" alt="教材风场景插画：陡峭葡萄园中，工人在密集葡萄行间手工采收，另一人沿狭窄坡道搬运葡萄箱；下方的村落与道路显示坡地的高差。" loading="lazy" decoding="async"></a><p><span>场景插画：陡坡上的采收与搬运</span><a href="assets/steep-vineyard-work-v3.webp" target="_blank" rel="noopener">查看插画大图 ↗</a></p></div><div class="wm-steep-observations">${observations.map(p=>`<section><div class="wm-steep-observation-title"><span>${p.number}</span><h3>${wmEscape(p.title)}</h3></div><strong>${wmEscape(p.text)}</strong><p>${wmEscape(p.detail)}</p></section>`).join('')}</div><div class="wm-steep-outcome"><div><span>投入增加</span><strong>更多人工与更长作业时间</strong></div><span class="wm-steep-outcome-arrow" aria-hidden="true">→</span><div><span>成本结果</span><strong>单位葡萄生产成本增加</strong></div></div><div class="wm-steep-context"><p>还取决于产量、工资及规模。</p><p>售价也受需求、声誉和利润影响。</p></div><figcaption>${wmEscape(d.caption||'摩泽尔陡坡葡萄园是地形限制机械化的例子；高生产成本并不保证市场愿意支付更高售价。')}</figcaption></figure>`;
}
function wmDiagram(d){
 if(d.type==='closures')return wmMaterialFigure(d);
 if(d.type==='cap')return wmCapFigure(d);
 if(d.type==='steep')return wmSteepFigure(d);
 if(d.type==='freeze')return wmFreezeFigure(d);
 if(d.type==='lees')return wmLeesFigure(d);
 if(['filtration','packaging'].includes(d.type))return wmRefinedFigure(d);
 if(d.type==='composition'&&d.parts?.length)return wmCompositionFigure(d);
 if(d.photos?.length)return wmPhotoFigure(d);
 if(d.type==='berry')return wmGrapeFigure(d);
 const ink='#35412f',wine='#7d4352',blue='#568b9d',gold='#bb8442',wood='#865b39';
 const line=(x1,y1,x2,y2,c=ink,w=2,arrow=false)=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${c}" stroke-width="${w}"${arrow?' marker-end="url(#wm-arrow)"':''}/>`;
 const txt=(x,y,t,size=16,c=ink,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${c}" font-size="${size}">${wmEscape(t)}</text>`;
 const rect=(x,y,w,h,fill,stroke=ink,r=5)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
 const ellipse=(x,y,rx,ry,fill,stroke=ink)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="1.3"/>`;
 const juice=(x,y,w,h)=>rect(x,y,w,h,'#a9697b',wine,0);
 const berries=(x,y,scale=1,color='#74415d')=>`<g transform="translate(${x} ${y}) scale(${scale})">${[[0,0],[18,0],[36,0],[9,16],[27,16],[18,32]].map(([a,b])=>ellipse(a,b,10,11,color,'#f7f1e3')).join('')}${line(18,-30,18,-10,'#62764b',3)}${line(18,-10,0,0,'#62764b',2)}${line(18,-10,36,0,'#62764b',2)}</g>`;
 const tank=(x,y,w=100,h=135,fill='url(#wm-steel)')=>`${rect(x,y,w,h,fill,'#78868a',8)}${ellipse(x+w/2,y,w/2,10,'#d8e0df','#78868a')}${line(x+13,y+h,x+9,y+h+18,'#78868a',5)}${line(x+w-13,y+h,x+w-9,y+h+18,'#78868a',5)}${rect(x+w*.35,y+h*.5,w*.3,26,'#edf0e7','#78868a',12)}${line(x+w,y+h-15,x+w+20,y+h-15,blue,4)}`;
 const barrel=(x,y,w=110,h=130)=>`<path d="M${x+12} ${y}Q${x-10} ${y+h/2} ${x+12} ${y+h}H${x+w-12}Q${x+w+10} ${y+h/2} ${x+w-12} ${y}Z" fill="url(#wm-oak)" stroke="${wood}" stroke-width="2"/>${[.2,.8].map(n=>rect(x+2,y+h*n-5,w-4,10,'#77817b','#535f58',1)).join('')}${[.25,.42,.6,.77].map(n=>`<path d="M${x+w*n} ${y+2}Q${x+w*n-5} ${y+h/2} ${x+w*n} ${y+h-2}" stroke="#b68c53" fill="none"/>`).join('')}`;

 let panels=[],caption='',title=d.title||'',n=d.type;
 if(n==='vessels'){
  title='图 7.2 · 容器的外形与作用';panels=[
  {label:'不锈钢罐',svg:tank(85,35,110,145),notes:['密封隔氧，不添加橡木风味','夹套／盘管便于温控']},
  {label:'小橡木桶',svg:barrel(75,40,125,135),notes:['常见225／228升','接触比例高；新桶风味较明显']},
  {label:'大型橡木容器',svg:barrel(40,20,200,170),notes:['可超过2,000升','同条件下单位酒液的木接触较少']},
  {label:'水泥容器',svg:`<path d="M95 190Q60 140 75 78Q88 15 140 12Q192 15 205 78Q220 140 185 190Z" fill="#dddccc" stroke="#8b9281" stroke-width="2"/>${ellipse(140,125,23,20,'#edf0e3','#8b9281')}${line(195,160,222,160,blue,5)}`,notes:['方形罐或蛋形罐','是否涂层会影响透气与清洁维护']}];caption='橡木风味和氧气接触要分别判断：旧橡木桶风味可能很弱，仍可有缓慢氧气接触。';
 }else if(n==='reception'){
  title='图 7.3 · 分选、去梗、破碎各处理什么';panels=[
   {label:'① 分选',svg:`${rect(25,112,230,44,'#d9ded2','#7f8d7d')}${[50,225].map(x=>ellipse(x,168,13,13,'#aab3a5')).join('')}${berries(60,93,.7)}${berries(150,89,.8)}${line(210,30,185,75,wine,3,true)}${txt(210,22,'移除不合适原料',14)}`,notes:['按成熟度、健康度等选择','可整串或去梗后分选']},
   {label:'② 去梗',svg:`${rect(35,55,210,100,'#d9deda','#7f8d7d')}${Array.from({length:18},(_,i)=>ellipse(50+i%9*22,77+Math.floor(i/9)*35,5,5,'#f7f5ea','#9ba490')).join('')}${line(140,157,140,200,blue,3,true)}${berries(120,200,.5)}${line(246,105,272,105,'#738254',3,true)}${txt(250,140,'梗',14)}`,notes:['移除果梗；保留果粒','整串酿造时可跳过']},
   {label:'③ 破碎',svg:`${ellipse(110,100,38,38,'#c2cfc6','#7f8d7d')}${ellipse(185,100,38,38,'#c2cfc6','#7f8d7d')}${line(148,25,148,55,wine,3,true)}${line(148,142,148,185,blue,3,true)}${txt(148,212,'汁液＋果皮＋籽',16)}`,notes:['轻轻打开果皮、释放汁液','尽量避免压碎葡萄籽']}];caption='这三步不是同义词，也不是每款酒都全部采用；整串发酵等选择会改变顺序。';
 }else if(n==='press'){
  title='图 7.4 · 压榨：把液体与固体分开';panels=[
   {label:'篮式压榨',svg:`${rect(65,80,150,112,'#d2aa70',wood)}${Array.from({length:12},(_,i)=>line(71+i*12,82,71+i*12,190,wood,3)).join('')}${rect(54,185,173,14,'#9caaa5','#7f8d7d')}${rect(73,72,135,10,'#6e7c74','#46554b')}${line(140,10,140,70,'#7f8d7d',8)}${line(110,12,172,12,wood,5)}${line(140,30,140,61,wine,3,true)}${line(227,192,266,192,blue,4,true)}${txt(245,218,'汁液流出',14)}`,notes:['向下施压于葡萄／皮渣','液体穿过篮壁，固体留在篮中']},
   {label:'气囊压榨',svg:`${rect(25,62,240,105,'#dce2dc','#7f8d7d',45)}${rect(60,85,172,50,'#d1b5a6','#926a5e',22)}${line(140,85,140,66,wine,3,true)}${line(140,135,140,155,wine,3,true)}${line(40,178,250,178,blue,3)}${line(250,178,273,178,blue,3,true)}${txt(145,112,'膨胀气囊',15)}${txt(145,210,'液体由有孔桶壁流出',14)}`,notes:['气囊膨胀，把果实压向桶壁','可调压力，采用较温和的压榨']}];caption='白酒通常在发酵前压榨；红酒通常先带皮发酵，再分开自流酒与压榨酒。';
 }else if(n==='composition'){
  title='图 7.5 · 成酒的主要组成';panels=[{label:'从葡萄汁到葡萄酒',svg:`${rect(52,20,180,175,'#f1e9cf','#b3b79c',12)}${rect(55,60,174,132,'#d6d9b8','#b3b79c',7)}${txt(142,118,'水是最大组成',18)}${txt(142,45,'水约70–90%',17)}${txt(142,154,'酒精约8–22%',16)}`,notes:['发酵把部分糖变成酒精','糖、酸、单宁、色素和香气仍影响风格','下表范围各自比较，不应当相加为一款酒的配方']}];caption='组成比例因酒款而变；各项范围用于理解量级与作用，不能推出所有酒具有同一配方。';
 }else if(n==='temperature'){
  title='讲义示意 · 温度与发酵进程';panels=[{label:'适宜范围内，较温暖通常更快',svg:`${line(45,185,45,22,ink,1.5,true)}${line(45,185,275,185,ink,1.5,true)}<path d="M48 40C100 40 95 162 195 175" fill="none" stroke="${wine}" stroke-width="3"/><path d="M48 40C140 40 160 115 260 175" fill="none" stroke="${blue}" stroke-width="3"/>${txt(9,88,'残',13)}${txt(9,106,'糖',13)}${txt(160,220,'发酵时间 →',14)}${txt(92,144,'较温暖',13,wine)}${txt(209,100,'较凉爽',13,blue)}`,notes:['纵轴：剩余糖的相对水平；横轴：时间','酒红线较快消耗糖，蓝线较慢','过热会使酵母停工，不能把曲线无限外推']}];caption='参照讲义169的速度关系重画；曲线为趋势示意，未使用实测数据或固定天数。温度、菌株、糖分与营养都会影响实际速度。';
 }else if(n==='extraction'){
  title='讲义示意 · 色素与单宁的萃取阶段';panels=[{label:'三类物质的高峰不在同一阶段',svg:`${line(45,185,45,22,ink,1.5,true)}${line(45,185,275,185,ink,1.5,true)}<path d="M48 183C78 175 78 30 102 42S122 168 265 182" fill="none" stroke="${wine}" stroke-width="3"/><path d="M48 183C110 175 130 122 163 98S210 153 265 182" fill="none" stroke="${blue}" stroke-width="3"/><path d="M48 183C135 183 153 140 193 125S240 150 265 182" fill="none" stroke="${gold}" stroke-width="3"/>${txt(10,54,'相',12)}${txt(10,72,'对',12)}${txt(10,90,'萃',12)}${txt(10,108,'取',12)}${txt(10,126,'速',12)}${txt(10,144,'率',12)}${txt(160,220,'接触时间 →',14)}`,notes:['酒红线：色素较早出现明显萃取高峰','蓝线：果皮单宁；金线：籽单宁，明显萃取通常较后','曲线比较萃取速率的阶段，不代表成酒浓度或固定天数']}];caption='参照讲义198重画的定性示意，无实测坐标或单位。酒精、温度、品种和成熟度会改变曲线；萃取速率下降不等于酒中已提取的物质同时全部消失。';

 }
 if(!panels.length)return '';
 const defs=`<defs><linearGradient id="wm-steel" x2="1"><stop stop-color="#9caaa7"/><stop offset=".3" stop-color="#edf0e8"/><stop offset=".65" stop-color="#bcc8c2"/><stop offset="1" stop-color="#8c9d97"/></linearGradient><linearGradient id="wm-oak" x2="1"><stop stop-color="#a47c45"/><stop offset=".4" stop-color="#d5b578"/><stop offset="1" stop-color="#9b713c"/></linearGradient><marker id="wm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="context-stroke" stroke-width="1.6"/></marker></defs>`;
 return `<figure id="wmfig-${wmEscape(d.id||n)}" class="wm-plate" data-wm-figure="${wmEscape(n)}"><div class="wm-plate-title">${wmEscape(title)}</div><div class="wm-plate-grid wm-plate-${panels.length}">${panels.map((p,i)=>`<div class="wm-plate-panel"><h3>${wmEscape(p.label)}</h3><svg viewBox="0 0 ${p.w||290} ${p.h||235}" role="img" aria-label="${wmEscape(p.label)}" preserveAspectRatio="xMidYMid meet">${(defs+p.svg).replace(/wm-(steel|oak|arrow)/g, 'wm-'+(d.id||n)+'-'+i+'-$1')}</svg><ul>${p.notes.map(t=>`<li>${wmEscape(t)}</li>`).join('')}</ul></div>`).join('')}</div><figcaption>${wmEscape(d.caption||caption)}</figcaption></figure>`;
}
