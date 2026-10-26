/* Reference-led, code-native teaching plates. Geometry follows the supplied book/handout.
   Dark brown = permanent wood; ochre = one-year wood; green = current shoots.
   All references below were visually checked against local source pages. */
const studyPalette={wood:'#71513c',cane:'#b77b3e',green:'#62804c',leaf:'#8fa373',berry:'#80506a',water:'#7196a0',ink:'#343d31',line:'#b4baa5'};
let studyIllustrationSerial=0;
function studySvg(title,body,h=280){
 const id='botanical-'+(++studyIllustrationSerial),defs=`<defs>
 <linearGradient id="${id}-leaf" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#bcc584"/><stop offset=".43" stop-color="#899c60"/><stop offset="1" stop-color="#4c6b3e"/></linearGradient>
 <linearGradient id="${id}-wood" gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="310" y2="180"><stop stop-color="#624735"/><stop offset=".38" stop-color="#947356"/><stop offset=".65" stop-color="#71513c"/><stop offset="1" stop-color="#5c4434"/></linearGradient>
 <linearGradient id="${id}-cane" gradientUnits="userSpaceOnUse" x1="20" y1="0" x2="310" y2="180"><stop stop-color="#805933"/><stop offset=".4" stop-color="#c49a66"/><stop offset=".75" stop-color="#b17b43"/><stop offset="1" stop-color="#8b6038"/></linearGradient>
 <radialGradient id="${id}-berry" cx=".32" cy=".25" r=".8"><stop stop-color="#a18b9e"/><stop offset=".35" stop-color="#876a87"/><stop offset=".8" stop-color="#684b6b"/><stop offset="1" stop-color="#533d58"/></radialGradient>
 <radialGradient id="${id}-greenberry" cx=".3" cy=".25" r=".8"><stop stop-color="#d8dba6"/><stop offset=".45" stop-color="#a8b479"/><stop offset="1" stop-color="#7e9357"/></radialGradient>
 <radialGradient id="${id}-goldberry" cx=".3" cy=".25" r=".8"><stop stop-color="#f0e4b3"/><stop offset=".5" stop-color="#c9c589"/><stop offset="1" stop-color="#a6a064"/></radialGradient>
 <radialGradient id="${id}-brownberry" cx=".3" cy=".25" r=".8"><stop stop-color="#c3a17a"/><stop offset=".48" stop-color="#a58565"/><stop offset="1" stop-color="#76583f"/></radialGradient>
 <radialGradient id="${id}-sun"><stop stop-color="#efd6a0"/><stop offset="1" stop-color="#d7b66b"/></radialGradient>
 <pattern id="${id}-soil" width="37" height="31" patternUnits="userSpaceOnUse"><rect width="37" height="31" fill="#e8ddc5"/><path d="M5 10q2 -2 5 -1l1 2q-3 2 -6 -1Z" fill="#c8b694" opacity=".35"/><ellipse cx="27" cy="25" rx="2.7" ry="1.3" fill="#bca482" opacity=".3"/><circle cx="28" cy="7" r="1" fill="#ac936f" opacity=".4"/><circle cx="12" cy="26" r=".7" fill="#ac936f" opacity=".4"/></pattern>
 <pattern id="${id}-paper" width="31" height="29" patternUnits="userSpaceOnUse"><circle cx="4" cy="7" r=".35" fill="#877457" opacity=".16"/><circle cx="21" cy="19" r=".45" fill="#877457" opacity=".12"/><path d="M10 23l3 -1M25 5l2 1" stroke="#877457" stroke-width=".25" opacity=".15"/></pattern>
 <filter id="${id}-yellow-leaf" x="-.03" y="-.03" width="1.06" height="1.06"><feColorMatrix type="matrix" values="1.1 .15 0 0 .12 0 .95 0 0 .04 0 0 .48 0 0 0 0 0 1 0"/></filter>
 </defs>`;
 let art=body.replace(/BOTANICAL-/g,id+'-');
 const fills={'#e8dfca':'soil','#e7dcc4':'soil','#dfd2b9':'soil','#d9b96c':'sun','#d6bb79':'sun','#80506a':'berry','#93a267':'greenberry'};
 art=art.replace(/fill="(#[a-fA-F0-9]{6})"/g,(m,c)=>fills[c]?`fill="url(#${id}-${fills[c]})"`:m);
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 ${h}" role="img" aria-label="${safe(title)}" font-family="PingFang SC,Microsoft YaHei,sans-serif" font-size="15" fill="${studyPalette.ink}" data-illustration="botanical"><title>${safe(title)}</title>${defs}<rect width="360" height="${h}" fill="#f8f5eb"/><rect width="360" height="${h}" fill="url(#${id}-paper)"/>${art}</svg>`;
}
function studyPath(d,c=studyPalette.wood,w=8,dash=''){
 const wood=c===studyPalette.wood&&w>=4,cane=c===studyPalette.cane&&w>=4;
 const stroke=wood?'url(#BOTANICAL-wood)':cane?'url(#BOTANICAL-cane)':c;
 let out=`<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${dash?` stroke-dasharray="${dash}"`:''}/>`;
 if(wood||cane){out+=`<path d="${d}" fill="none" stroke="${wood?'#b99d78':'#edd3a3'}" stroke-width="${Math.max(.45,w*.11)}" opacity=".38" stroke-linecap="round" stroke-dasharray="${wood?'5 3 9 4':'11 4'}" transform="translate(${w*.15} ${-w*.08})"/>`;
 if(wood)out+=`<path d="${d}" fill="none" stroke="#423429" stroke-width="${Math.max(.4,w*.07)}" opacity=".3" stroke-dasharray="2 7 4 5" transform="translate(${-w*.18} ${w*.07})"/>`;}
 return out;
}
function studyText(x,y,t,anchor='start',size=15){return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}">${t}</text>`}
function studyArrow(x1,y1,x2,y2,c=studyPalette.line){const a=Math.atan2(y2-y1,x2-x1),s=7;return studyPath(`M${x1} ${y1}L${x2} ${y2}`,c,2)+studyPath(`M${x2-s*Math.cos(a-.5)} ${y2-s*Math.sin(a-.5)}L${x2} ${y2}L${x2-s*Math.cos(a+.5)} ${y2-s*Math.sin(a+.5)}`,c,2)}
function studyBud(x,y){return `<g transform="translate(${x} ${y}) rotate(23)"><path d="M0 6C-6 3 -5 -3 0 -8C5 -4 6 3 0 6Z" fill="url(#BOTANICAL-cane)" stroke="#775032" stroke-width=".7"/><path d="M-3 2Q0 -2 0 -6M0 5Q3 0 3 -2" fill="none" stroke="#e1bb83" stroke-width=".65" opacity=".8"/></g>`}
function studyLeaf(x,y,r=0){
 return `<g transform="translate(${x} ${y}) rotate(${r})" data-botanical-part="grape-leaf"><image href="assets/grape-leaf-botanical.webp" x="-20" y="-33" width="40" height="37" preserveAspectRatio="xMidYMax meet"/></g>`;
}
function studyBerries(x,y,c=studyPalette.berry){
 const points=[[0,0],[8,0],[16,0],[4,8],[12,8],[8,16]],normal=c===studyPalette.berry;
 return `<g transform="translate(${x} ${y})" data-botanical-part="fruit-cluster">${studyPath('M8 -9V7M8 -5L0 0M8 -5L16 0',studyPalette.green,1)}${points.map(([a,b],i)=>`<ellipse cx="${a}" cy="${b}" rx="5.1" ry="5.5" fill="${normal?'url(#BOTANICAL-berry)':c}" stroke="#f8f5e5" stroke-width=".3"/><path d="M${a-2.5} ${b-2}q1 -1.8 2.5 -1.7" stroke="#e4dfe4" fill="none" stroke-width=".5" opacity=".5"/>`).join('')}</g>`;
}
function studyGround(y=228){return `<path d="M20 ${y+3}Q82 ${y} 133 ${y+3}T240 ${y+2}T340 ${y+3}" fill="none" stroke="#e2d8bf" stroke-width="5" opacity=".7"/>`+studyPath(`M20 ${y}Q86 ${y-1} 144 ${y}T266 ${y}T340 ${y}`,'#b8ad91',1)+[36,97,253,314].map((x,i)=>`<path d="M${x} ${y+3}l4 1 -2 2 -5 -1Z" fill="#bca98a" opacity=".45"/>`).join('')}
function studyShoot(x,y,height=105,fruit=true,lean=0){
 let t=studyPath(`M${x} ${y}Q${x+lean*.4} ${y-height*.55} ${x+lean} ${y-height}`,studyPalette.green,3)+studyPath(`M${x+.7} ${y-3}Q${x+lean*.4+.6} ${y-height*.55} ${x+lean+.5} ${y-height+3}`,'#b4c18e',.7);
 for(const [f,side]of [[.3,-1],[.55,1],[.8,-1]]){
  const sx=x+lean*f,sy=y-height*f;t+=studyPath(`M${sx} ${sy}l${side*4} -4`,studyPalette.green,1)+`<g transform="translate(${sx+side*3} ${sy-3}) scale(.88)">${studyLeaf(0,0,side*55)}</g>`;
  t+=`<ellipse cx="${sx}" cy="${sy}" rx="2.6" ry="1.1" fill="#779054"/>`;
 }
 if(height>65){const tx=x+lean*.67,ty=y-height*.67;t+=studyPath(`M${tx} ${ty}q12 -5 14 -15q1 -7 -5 -6q-5 3 0 6`,studyPalette.green,1);}
 if(fruit)t+=studyBerries(x+5,y-30);
 return t;
}
function studyWires(){return [55,95,135,175].map(y=>studyPath(`M24 ${y}H336`,'#c1c6ba',1)).join('')+studyPath('M28 45V231M332 45V231','#a6ad9d',4)}
function studyVine(kind,summer=false){
 let t=studyGround()+((kind==='head-cane'||kind==='cordon')?studyWires():'');
 t+=studyPath(kind==='head-cane'?'M72 225Q68 202 72 166':'M180 225Q174 202 180 166',studyPalette.wood,14);
 if(kind==='head-spur'){
  t+=studyPath('M180 172L133 150M180 172L180 143M180 172L227 150',studyPalette.wood,10);
  for(const [x,y,dx]of [[133,150,-12],[180,143,0],[227,150,12]]){t+=studyPath(`M${x} ${y}L${x+dx} ${y-31}`,studyPalette.cane,5)+studyBud(x+dx/2+5,y-12)+studyBud(x+dx+4,y-30);if(summer)t+=studyShoot(x+dx,y-30,85,true,dx*2)}
 }else if(kind==='head-cane'){
  t+=studyPath('M72 166Q132 175 306 175',studyPalette.cane,5);
  for(const x of [86,116,146,176,206,236,266,296]){t+=studyBud(x,170);if(summer)t+=studyShoot(x,170,101,true,3)}
  t+=studyPath('M70 166L58 145',studyPalette.cane,5)+studyBud(60,147);
 }else if(kind==='cordon'){
  t+=studyPath('M180 166Q160 173 58 173M180 166Q204 173 302 173',studyPalette.wood,11);
  for(const x of [76,114,152,208,246,284]){t+=studyPath(`M${x} 172l0 -22`,studyPalette.cane,5)+studyBud(x+4,158)+studyBud(x+4,148);if(summer)t+=studyShoot(x,148,90,true,2)}
 }else if(kind==='sylvoz'){
  t+=studyWires()+studyPath('M180 168L180 93Q236 87 313 90',studyPalette.wood,11);
  for(const x of [197,241,285]){t+=studyPath(`M${x} 91Q${x+32} 86 ${x+27} 122Q${x+20} 153 ${x+8} 181`,studyPalette.cane,4);for(const dy of [112,140,165])t+=studyBud(x+22-(dy-112)/5,dy)}
 }
 return t;
}
function studyWoodLegend(){return `<div class="study-legend"><span><i style="background:${studyPalette.wood}"></i>多年生木：主干、干臂／主蔓</span><span><i style="background:${studyPalette.cane}"></i>一年生木：长枝／短枝</span><span><i style="background:${studyPalette.green}"></i>当年新梢：长叶、开花结果</span></div>`}
function studyCut(x,y){return studyPath(`M${x-8} ${y-6}l16 12M${x-8} ${y+6}l16 -12`,'#a74e56',3)}
function studyOperationsDiagram(key){
 const P=studyPalette,card=(title,svg,text)=>studyCard(title,studySvg(title,svg),text),pair=cards=>`<div class="study-pair">${cards.join('')}</div>`,steps=cards=>`<div class="study-grid three study-steps">${cards.join('')}</div>`;
 if(key==='wood-renewal')return studyPlate(key,'同一根枝条，跨年后名称怎样变？',studyWoodLegend()+steps([
 card('① 生长季：当年新梢',studyPath('M180 228V173',P.wood,12)+studyPath('M180 173H110',P.cane,6)+studyShoot(126,173,115,true,0)+studyText(224,94,'绿色新梢')+studyArrow(219,99,137,112),'绿色枝是当年新梢，叶与果串长在它上面；下方赭色枝是它萌发时所在的一年生木。'),
 card('② 木质化后：一年生木',studyPath('M180 228V173',P.wood,12)+studyPath('M180 173H110',P.wood,7)+studyPath('M126 173V58',P.cane,5)+[84,112,140].map(y=>studyBud(131,y)).join('')+studyText(221,94,'芽仍留在枝上')+studyArrow(217,101,139,112),'同一根新梢在生长季后段逐渐木质化，落叶后已成熟木质化，来春为一年生木。冬剪选择性留下枝与芽；落叶不代表芽消失。'),
 card('③ 下一春：芽萌发新梢',studyPath('M180 228V173',P.wood,12)+studyPath('M180 173H110',P.wood,7)+studyPath('M126 173V106',P.cane,5)+studyShoot(126,117,68,true,52)+studyText(219,102,'下一年的新梢')+studyArrow(216,110,158,79),'下一年的绿色结果新梢从保留的一年生木上的芽萌发；光秃木枝本身不会直接长出一串葡萄。')
 ]),'课本 p.30–31 · 讲义幻灯片 103、112','示意聚焦同一部位的跨年变化；进入下一年，较早的木质结构也随之增加木龄。');
 if(key==='spur-renewal'){
 const base=studyGround(232)+studyPath('M75 231V186H294',P.wood,12)+studyPath('M170 186V160',P.wood,7);
 return studyPlate(key,'短枝修剪：截短的是新的一年生枝',studyWoodLegend()+steps([
 card('① 冬剪前',base+studyPath('M170 164L142 61M170 164L235 55',P.cane,5)+[0,1,2,3].map(i=>studyBud(171-i*6,147-i*23)+studyBud(184+i*16,147-i*25)).join('')+studyText(30,30,'上一季长出的枝已木质化'),'主蔓上一个结果部位的局部图：上方赭色长枝由上一季新梢木质化而来；下方深棕色主蔓继续保留。'),
 card('② 选择、截短',base+studyPath('M170 164L159 124',P.cane,5)+studyBud(171,149)+studyBud(165,130)+studyPath('M159 124L142 61M170 164L235 55','#c8b5a5',3,'5 5')+studyCut(158,120)+studyCut(180,151)+studyText(30,30,'红叉：剪除；虚线：将移除'),'选择适合的枝，剪短到通常2–3芽，并去掉多余枝。图示保留2芽；不能把整根多年生主蔓也剪掉。'),
 card('③ 冬剪后',base+studyPath('M170 164L159 124',P.cane,5)+studyBud(171,149)+studyBud(165,130)+studyText(30,30,'留下新的一年生短枝')+studyText(180,265,'下个生长季由保留芽萌发','middle'),'留下的是今年新形成的一年生短枝，不是让同一根短枝永远不更新；来春芽再长出绿色新梢。')
 ]),'课本 p.51–52 · 讲义幻灯片 102–106 · 课堂 15:57–25:08','这是单个结果部位的更新示意，省略相邻部位；枝条选择与实际剪口须结合具体系统。');
 }
 if(key==='cane-renewal'){
 const trunk=studyGround(232)+studyPath('M86 231V169',P.wood,14),candidate=studyPath('M87 169L136 63',P.cane,5)+[0,1,2,3].map(i=>studyBud(103+i*10,145-i*23)).join('');
 return studyPlate(key,'替换长枝：旧结果枝退出，新枝接替',studyWoodLegend()+steps([
 card('① 冬剪前辨认两代枝',trunk+studyPath('M88 176H312',P.wood,7)+[180,238,296].map(x=>studyPath(`M${x} 176V82`,P.cane,4)+studyBud(x+5,110)).join('')+candidate+studyPath('M80 170L54 104',P.cane,5)+studyText(24,29,'右侧：上一轮用过的结果长枝'),'右侧横枝上一轮已承载绿色结果新梢，如今连同其上枝条准备剪除。主干附近选留新的、已木质化的一年生枝。'),
 card('② 去旧、留新',trunk+studyPath('M99 176H312','#c8b5a5',4,'5 5')+studyCut(101,176)+candidate+studyPath('M80 170L69 143',P.cane,5)+studyBud(75,151)+studyBud(72,140)+studyText(24,29,'新长枝 ＋ 更新短枝'),'剪去上一轮用过的结果长枝；图示另留一条新结果长枝和一条更新短枝，后者为之后继续更新提供新梢。'),
 card('③ 弯绑新结果长枝',trunk+studyPath('M86 170Q143 179 308 175',P.cane,5)+[111,139,167,195,223,251,279,303].map(x=>studyBud(x,170)).join('')+studyPath('M80 169L69 143',P.cane,5)+studyBud(75,151)+studyBud(72,140)+studyPath('M35 181H329','#a6ad9d',1)+studyText(24,29,'横绑的是新的一年生长枝'),'将选留的新结果长枝绑到铁丝上，使芽分布开；主干长期保留，水平结果长枝逐年替换。图示单居由。')
 ]),'课本 p.52 · 讲义幻灯片 109–112 · 课堂视频 1:34:18–1:34:33','淡色虚线表示剪除部分；图示说明枝条代际关系，不代表整株统一留芽数。');
 }
 if(key==='guyot'){
 const v=double=>{const b=studyGround(231)+studyPath('M180 230V165',P.wood,13)+studyPath('M30 176H330','#a6ad9d',1);return b+studyPath('M180 165Q222 174 312 171',P.cane,5)+(double?studyPath('M180 165Q138 174 48 171',P.cane,5):'')+[202,229,256,283,308,...(double?[52,79,106,133,158]:[])].map(x=>studyBud(x,167)).join('')+studyPath('M174 166L161 142',P.cane,5)+studyBud(164,147)+studyText(180,54,double?'两条结果长枝，向两侧绑':'一条结果长枝','middle')};
 return studyPlate(key,'单居由与双居由：看结果长枝条数',studyWoodLegend()+pair([
 card('单居由 Single Guyot',v(false),'头状替换长枝系统中，图示保留一条一年生结果长枝。短的更新枝不计作第二条结果长枝。'),
 card('双居由 Double Guyot',v(true),'图示向两侧各绑一条一年生结果长枝；两条都须逐年更新，仍没有永久水平主蔓。')
 ]),'课本 p.52 · 单居由／双居由','图中芽数仅帮助识别，不用于规定总负载；双居由也不意味着酒质必然更高或产量必然翻倍。');
 }
 if(key==='bud-fruitfulness')return studyPlate(key,'芽会不会萌发，与新梢能否结果，是两件事',studyWoodLegend()+pair([
 card('基部芽也可能萌发',studyPath('M70 231V176',P.wood,12)+studyPath('M70 176H312',P.cane,6)+studyShoot(100,176,101,false,0)+studyBud(197,171)+studyBud(291,171)+studyText(180,31,'示意：基部芽萌发，但新梢无果','middle',14),'左端靠近枝条基部的芽已长出绿色新梢，图示没有果串。“结果力低”说的是较少产生结果新梢，不能直接改写为“芽不会发”。'),
 card('较远芽的结果潜力',studyPath('M70 231V176',P.wood,12)+studyPath('M70 176H312',P.cane,6)+studyBud(100,171)+studyShoot(197,176,101,true,0)+studyBud(291,171)+studyText(180,31,'示意：较远芽长出带果新梢','middle',14),'对于基部芽结果力较低的品种，保留较长一年生枝可保留更远位置的芽；具体是否适合，还要看品种、芽结果力和目标负载。')
 ]),'课堂 23:16–24:10、29:36–31:41 · 短枝与长枝的选择','此图只解释两个概念的区别，不能据此推断所有品种的每个芽都按同样模式结果；转写不清的品种名称未填入。');
 if(key==='summer-actions'){
 const shoot=studyPath('M180 231V202',P.wood,10)+studyShoot(180,202,149,true,0);
 return studyPlate(key,'冠层操作：先看剪的是哪里',steps([
 card('修剪树冠 Trimming',shoot+studyCut(180,88)+studyPath('M180 85V48','#a74e56',3,'4 4')+studyText(25,28,'处理超出目标冠层的新梢顶端'),'图中红叉位于新梢上段：控制过长枝叶和冠层体积。它不是移除葡萄果串的摘青，也不是冬季留芽。'),
 card('果区摘叶 Leaf removal',shoot+`<ellipse cx="180" cy="163" rx="44" ry="34" fill="none" stroke="#a74e56" stroke-width="2" stroke-dasharray="4 4"/>`+studyText(25,28,'按需要去掉果区部分叶片'),'红圈标出果区附近叶片：改善果串受光、通风与喷药覆盖；炎热强光处要保留适当遮阴，避免过度暴露。'),
 card('疏除多余新梢 Shoot thinning',studyPath('M180 231V181',P.wood,10)+studyPath('M120 181H244',P.cane,6)+studyShoot(145,181,100,true,-10)+studyShoot(216,181,100,true,10)+studyCut(215,170)+studyText(25,28,'从基部去掉不需要的新梢'),'红叉靠近其中一根新梢的基部：减少拥挤与相互遮蔽；处理对象是整根新梢，区别于只剪顶端或只摘叶。')
 ]),'课本 p.51–53 · 讲义幻灯片 98–100、117','这些操作改变绿色冠层；永久骨架属于整枝，冬季保留一年生枝与芽属于冬剪。不能把所有操作都写成“剪掉一些东西”。');
 }
 if(key==='green-harvest')return studyPlate(key,'摘青：减的是果串，时机也重要',pair([
 card('摘青前：评估果实负载',studyPath('M180 235V201',P.wood,10)+studyShoot(180,201,150,false,0)+studyBerries(145,155,'#8ea36d')+studyBerries(191,126,'#8ea36d')+studyBerries(152,99,'#8ea36d')+studyText(24,28,'绿色果串＝尚未完全成熟'),'结合叶幕供糖、资源和目标风格，判断果实负载是否超过成熟能力。果串多并不自动等于质量差。'),
 card('摘青后：保留部分果串',studyPath('M180 235V201',P.wood,10)+studyShoot(180,201,150,false,0)+studyBerries(191,126,'#8ea36d')+studyPath('M143 151L165 175','#a74e56',2,'4 4')+studyCut(150,160)+studyText(24,28,'去掉部分果串，叶幕仍保留'),'摘青直接减少部分果串，而摘叶处理的是叶片。过早可能由剩余果粒膨大补偿；太晚又可能改善成熟有限，并增加人工成本。')
 ]),'课本 p.54 · 讲义幻灯片 119–120 · 课堂 52:29–54:06','课堂以转色前后帮助理解时点；是否摘青和具体时机须按负载、品种及园地判断，不能理解为每年必须执行。');
 if(key==='aspect'){
 const v=north=>`<circle cx="${north?278:82}" cy="53" r="22" fill="#d6bb79"/>`+studyPath('M35 204L180 110L325 204','#a2ad8a',3)+studyArrow(north?263:97,83,north?234:126,149,P.cane)+studyText(58,241,'北侧')+studyText(267,241,'南侧')+studyText(180,29,north?'太阳偏南':'太阳偏北','middle')+studyText(north?268:89,182,north?'朝南坡':'朝北坡','middle');
 return studyPlate(key,'坡向：先判断半球，再找朝赤道的坡',pair([
 card('北半球',v(true),'右侧朝南坡面朝向赤道，通常获得较多太阳能；凉爽产区可借此增加热量。左侧是同一山坡的朝北面。'),
 card('南半球',v(false),'左侧朝北坡面朝向赤道，通常获得较多太阳能。不能把北半球“朝南有利”的判断原样搬来。')
 ]),'课本 p.39 · 讲义 p.17','横剖面示意，不是地形图；效果还取决于纬度、季节、坡度、云、风和遮挡，热区未必追求最大受热。');
 }
 if(key==='frost-tools')return studyPlate(key,'四类春霜对策：作用机制各不同',pair([
 card('加热器 Heaters',studyGround(225)+`<rect x="153" y="142" width="52" height="80" rx="4" fill="#b49472"/>`+studyPath('M162 117Q147 97 162 73M182 117Q167 97 182 73M202 117Q187 97 202 73',P.cane,3)+studyText(180,41,'燃烧 → 向周围供热','middle'),'提高附近空气温度；设备、燃料与人工都有成本。示意的热源不能替代冬季埋土保护木质结构。'),
 card('风机 Wind machines',`<rect x="24" y="45" width="312" height="44" fill="#e9dac0"/><rect x="24" y="178" width="312" height="46" fill="#c7d8dc"/>`+studyPath('M180 226V104',P.line,7)+studyPath('M150 99H210M180 69V129',P.line,5)+studyArrow(243,80,243,183,P.water)+studyText(37,72,'上层较暖')+studyText(38,205,'近地较冷'),'把上方较暖空气与近地冷空气混合。需要存在可利用的暖空气层，不能假设所有霜冻天气都有效。'),
 card('防霜喷灌 Sprinklers',studyPath('M180 226V161',P.wood,9)+studyShoot(180,161,80,false,0)+studyPath('M65 221V102',P.water,4)+studyPath('M65 102Q133 48 252 133',P.water,2,'4 5')+studyText(180,39,'水持续结冰 → 释放潜热','middle'),'关键是持续结冰释放潜热来保护组织，不是冰本身发热；需要专门设计、正确持续运行及足够水源。'),
 card('园地设计与整枝',`<path d="M28 138L133 115L257 211H330" fill="none" stroke="#9ca882" stroke-width="3"/>`+studyArrow(164,105,216,158,P.water)+studyPath('M111 128V59',P.wood,9)+studyBud(116,63)+studyText(180,35,'排冷通道 ＋ 较高结果部位','middle')+studyText(270,245,'避开积冷洼地','middle'),'选址和园地布局帮助冷空气排走；较高主干可使嫩芽远离最冷近地层。这是在规划与结构上降低暴露。')
 ]),'课本 p.39–40 · 图 5.4、5.5','四图说明各自机制；工具是否合适取决于霜冻类型、地形、供水、能源及成本。');
 if(key==='pest-pathways')return studyPlate(key,'病虫害：先找受害部位，再看后果',steps([
 card('根系受害',studyGround(120)+studyPath('M180 120V69',P.wood,8)+studyPath('M180 120L125 208M180 120L228 208M180 156L181 229',P.wood,4)+`<circle cx="144" cy="177" r="20" fill="none" stroke="#a74e56" stroke-width="2"/>`+studyText(180,36,'地下吸收功能受损','middle'),'根瘤蚜或线虫伤根，可降低水分与养分吸收；部分线虫还能传播病毒。抗性砧木和健康材料针对地下风险。'),
 card('叶片受害',`<g transform="translate(180 210) scale(4.5)">${studyLeaf(0,0)}</g>`+`<circle cx="171" cy="148" r="20" fill="none" stroke="#a74e56" stroke-width="2"/>`+studyText(180,36,'叶片功能受损','middle'),'昆虫、螨类或叶片病害影响叶面积与光合作用，间接妨碍果实成熟。图示只定位部位，不能据此诊断具体病。'),
 card('果实受害',`<g transform="translate(90 76) scale(5)">${studyBerries(0,0)}</g>`+`<circle cx="171" cy="121" r="23" fill="none" stroke="#a74e56" stroke-width="2"/>`+studyText(180,36,'损失果实与健康度','middle'),'鸟啄、昆虫取食及真菌腐烂会直接损伤果实；伤口也可增加后续腐烂风险。防鸟网、监测与针对性防治各有用途。')
 ]),'课本 p.57–58 · 讲义幻灯片 123–128','红圈是受害部位示意，不是病斑照片。冠层通风有助减少部分真菌压力，不能治愈病毒或细菌感染。');
 return '';
}
function studyCard(title,svg,text){return `<div class="study-card">${title?`<h4>${title}</h4>`:''}${svg}${text?`<p>${text}</p>`:''}</div>`}
function studyPlate(key,title,inside,reference,caption=''){return `<figure id="study-${key}" class="study-plate" data-study-figure="${key}"><div class="study-plate-head"><strong>${title}</strong><span>${reference}</span></div>${inside}${caption?`<figcaption>${caption}</figcaption>`:''}</figure>`}
function studyTrainingComparison(){
 const examples=[['head-spur','头状 × 短枝','Bush / Gobelet','顶部短干臂是多年生木；其上保留带 2–3 芽的一年生短枝。夏季新梢自然展开，可形成遮阴。'],['head-cane','头状 × 替换长枝','Guyot · 居由式','横着绑的是一年生结果长枝（图示单居由），通常保留 1–2 条，每条约 8–20 芽，并逐年替换；永久主干保留。'],['cordon','主蔓 × 短枝','Midwire cordon','粗的水平木臂是长久保留的主蔓；上面分布一年生短枝，新梢可向上定位。']];
 const winter={
 'head-spur':'头状短枝：深棕色主干与短干臂长期保留；赭色短枝是一年生木，每条通常留2–3芽。',
 'head-cane':'头状替换长枝：横绑的赭色长枝是一年生木；图示单居由。它会逐年替换，不能认作永久主蔓。',
 'cordon':'主蔓短枝：粗的深棕色水平臂是永久主蔓；赭色一年生短枝分布在它上面。'};
 const summer={
 'head-spur':'头状短枝的夏季：绿色新梢从短枝上的芽长出，果串在新梢上；冠层自然展开，可形成遮阴。',
 'head-cane':'头状长枝的夏季：横绑长枝上的芽萌发绿色结果新梢；向上定位的是新梢，下面长枝仍是一年生结果母枝。',
 'cordon':'主蔓短枝的夏季：短枝上的芽长出绿色结果新梢；永久主蔓保留，新梢可沿铁丝向上定位。'};
 const rows=examples.map(([kind,name,en])=>`<article class="study-example"><h3>${name}<small>${en}</small></h3><div class="study-pair">${studyCard('① 冬季修剪后',studySvg(name+'冬季木质结构',studyVine(kind)),winter[kind])}${studyCard('② 转色后的冠层',studySvg(name+'夏季新梢与果串',studyVine(kind,true)),summer[kind])}</div></article>`).join('');
 const sylvoz=`<article class="study-example"><h3>主蔓 × 长枝<small>Sylvoz · 讲义补充</small></h3>${studyCard('冬剪后的骨架',studySvg('Sylvoz：永久主蔓上保留向下弯绑的一年生长枝',studyVine('sylvoz')),'主蔓长枝：深棕色水平臂是永久主蔓，赭色向下弯绑的枝是其上保留的一年生长枝。有长枝也可以是主蔓整枝，判断依据是永久骨架。')}</article>`;
 return studyPlate('training-comparison','逐项看：骨架、留枝与夏季冠层',studyWoodLegend()+rows+sylvoz,'课本图 6.3 · 讲义幻灯片 92–93、113','前三组按课本图 6.3 的冬剪／夏季对照关系重绘；Sylvoz 按讲义单列。芽和枝条为识别示意，不代表整株实际总留芽量。');
}
function studyDiagram(key){
 const sourceGap=studySourceGapDiagram(key);if(sourceGap)return sourceGap;
 const P=studyPalette;
 const extra=studyOperationsDiagram(key);if(extra)return extra;
 if(key==='training-comparison')return studyTrainingComparison();
 if(key==='new-vines')return studyPlate(key,'新园设施各做什么',studySvg('幼藤保护套管、支柱铁丝和滴灌管各有用途',studyGround(220)+studyPath('M68 35V220M295 35V220','#a5aa95',7)+studyPath('M68 70H295M68 123H295','#a5aa95',2)+studyPath('M178 220V102',P.wood,5)+`<rect x="162" y="127" width="32" height="92" rx="3" fill="#cad8c4" stroke="#93a48a" opacity=".8"/>`+studyPath('M68 197H295',P.water,3)+studyText(91,31,'支柱与铁丝：支撑')+studyText(23,159,'套管')+studyArrow(67,154,159,163)+studyText(223,254,'滴灌管：供水','middle')+studyArrow(250,237,258,200)),'课本图 6.1','保护套管减少幼苗被动物损伤；支撑与供水设施不能互相替代。');
 if(key==='stone-heat')return studyPlate(key,'地表吸热与放热',`<div class="study-pair">${studyCard('白天：吸收太阳能',studySvg('阳光使石块和土壤升温',`<circle cx="70" cy="57" r="23" fill="#d6bb79"/>`+studyGround(211)+[0,1,2].map(i=>`<ellipse cx="${90+i*90}" cy="194" rx="30" ry="16" fill="#ac9d83"/>`+studyArrow(90+i*40,91,90+i*90,167,P.cane)).join('')+studyText(180,256,'深色表土、石块吸热','middle')),'土壤湿度也影响升温所需能量。')}${studyCard('之后：再辐射热量',studySvg('升温后的石块向周围释放热量',studyGround(211)+[0,1,2].map(i=>`<ellipse cx="${90+i*90}" cy="194" rx="30" ry="16" fill="#ac9d83"/>`+studyArrow(90+i*90,169,90+i*90,104,P.cane)).join('')+studyText(180,256,'可帮助凉爽园地成熟','middle')),'并非石块越多，所有园地都越适合。')}</div>`,'课本 p.38–39 · 图 5.3','课本 Priorat 图同时展示石块与梯田；这里分别解释热量机制，坡地与作业条件仍见正文。');
 if(key==='chlorosis')return studyPlate(key,'黄化影响叶片工作',`<div class="study-pair">${studyCard('绿色叶片',studySvg('绿色叶片对照',studyLargeLeaf()+studyText(180,280,'正常叶色作对照','middle'),300),'保持健康叶片，支持光合作用。')}${studyCard('黄化叶片',studySvg('黄化的叶片可影响光合作用',studyLargeLeaf('#d4c877')+studyText(180,280,'黄化 → 叶片功能受限','middle'),300),'查明养分可利用性等原因，不能见黄叶就无限施肥。')}</div>`,'课本 p.46 · 图 5.8','这里只对比叶色和功能，不用于凭外观判断所有病因。');
 if(key==='nets')return studyPlate(key,'网的位置与防护对象要对应',`<div class="study-pair">${studyCard('防雹网：上方拦截冰雹',studySvg('冰雹在顶部网面被拦截，不直接打击冠层',studyGround()+studyPath('M55 227V54M306 227V54','#a3aa95',5)+studyPath('M55 55Q180 79 306 55','#a3aa95',3)+[0,1,2,3,4,5].map(i=>studyPath(`M${65+i*44} 58l4 15`,'#b3bba7',1)).join('')+[0,1,2,3,4].map(i=>`<circle cx="${80+i*45}" cy="${26+(i%2)*10}" r="4" fill="#a5bdc4"/>`).join('')+studyPath('M180 227V160',P.wood,8)+studyShoot(180,160,60,true,0)),'回应冰雹直接伤叶、伤果和伤藤的风险。')}${studyCard('防鸟网：覆盖果区',studySvg('网覆盖果区以减少鸟啄食果实',studyGround()+studyPath('M180 227V158',P.wood,8)+studyShoot(180,158,70,true,0)+`<path d="M116 125Q180 97 243 125V203H116Z" fill="#e6eadc" fill-opacity=".3" stroke="#a1aa91" stroke-width="2"/>`+[0,1,2,3,4,5].map(i=>studyPath(`M${121+i*22} 127V201`,'#adb69c',1)).join('')+[0,1,2,3,4].map(i=>studyPath(`M117 ${132+i*16}H241`,'#adb69c',1)).join('')),'减少啄食与果粒伤口；铺设材料和人工也有成本。')}</div>`,'课本图 5.7、6.6','防雹与防鸟的材料、架设方式会因园地而异，不能仅见白网就混同用途。');
 if(key==='harvest-methods')return studyPlate(key,'采收对象：整串还是果粒？',`<div class="study-pair">${studyCard('人工：剪下完整果串',studySvg('人工剪串时保留果梗，完整果串可用于整串工艺',studyPath('M180 48V99M180 99L145 129M180 99L211 129',P.green,4)+[0,1,2,3].map(i=>studyBerries(148+(i%2)*24,128+Math.floor(i/2)*28)).join('')+studyText(24,46,'剪断串梗')+studyArrow(109,43,172,69)+studyText(180,253,'果串保留果梗','middle')),'可选果、多次进园；轻放浅筐，减少挤压。')}${studyCard('机械：振落并收集果粒',studySvg('果梗留藤，振落的果粒被接住并输送',studyPath('M180 48V91M180 91L143 124M180 91L214 124',P.green,4)+[0,1,2,3,4,5].map(i=>`<circle cx="${142+(i%3)*37}" cy="${145+Math.floor(i/3)*32}" r="8" fill="${P.berry}"/>`).join('')+studyArrow(270,138,270,196,P.cane)+studyPath('M102 197Q180 219 258 197',P.line,5)+studyText(24,47,'果梗通常留藤')+studyText(180,253,'接果 → 输送 → 容器','middle')),'跨行设备速度快，可凉夜采收；果粒需迅速处理。')}</div>`,'课本 p.60–61 · 图 6.7、6.8','此图解释采收对象，省略机器结构。常规机器不能提供完整果串；两种方法都可用于优质酒。');


 if(key==='wood-ages')return studyPlate(key,'同一株藤，四类结构',studyWoodLegend()+studySvg('主蔓葡萄藤的根系、多年生木、一年生短枝与当年新梢',studyGround(205)+`<path d="M40 206H320V290H40Z" fill="#e8dfca"/>`+studyPath('M180 225L180 205M180 224L135 262M180 224L216 265M180 224L174 281',P.wood,4)+studyPath('M180 205V150M180 150H70M180 150H290',P.wood,12)+[90,150,215,272].map(x=>studyPath(`M${x} 150v-21`,P.cane,5)+studyShoot(x,129,70,true,0)).join('')+studyText(25,25,'当年新梢')+studyArrow(108,29,139,69)+studyText(225,183,'一年生短枝')+studyArrow(228,171,216,137)+studyText(25,183,'多年生主干与主蔓')+studyArrow(157,178,178,177)+studyText(31,266,'根系')+studyArrow(75,261,132,246),305),'课本 p.30–32 · 图 4.1–4.4','果串长在当年的绿色结果新梢上；新梢从一年生木上的芽萌发。根系吸收、固定并储存碳水化合物。');
 if(key==='shoot'){
  const s=studyPath('M176 250Q171 170 178 48',P.green,5)+studyPath('M176 185L113 155M177 128L232 104',P.green,3)+studyLeaf(113,155,-60)+studyLeaf(232,104,48)+studyPath('M178 85Q150 60 151 42Q152 24 166 30Q178 37 164 42',P.green,2)+studyPath('M179 157L210 143',P.green,2)+[0,1,2,3,4].map(i=>`<g fill="#a0ad6e">${[0,1,2].map(j=>`<circle cx="${210+i*5+j*3}" cy="${139-i*7+j*6}" r="2.5"/>`).join('')}</g>`).join('')+studyBud(176,177)+studyText(24,60,'卷须 · 攀附')+studyArrow(119,56,148,50)+studyText(15,129,'叶片 · 光合作用')+studyArrow(130,130,122,146)+studyText(245,151,'花序')+studyArrow(242,145,227,132)+studyText(219,218,'芽 · 叶腋处')+studyArrow(219,208,182,181);
  return studyPlate(key,'沿新梢辨认四个部位',studySvg('叶片、卷须、花序与叶腋芽，标注直接指向对应结构',s),'课本图 4.1','一朵受精花可形成一颗浆果，一束花序可形成果串；芽内可在当年形成下一年新梢的微小结构。');
 }
 if(key==='propagation'){
  const cut=studyGround(195)+`<path d="M20 196H340V253H20Z" fill="#e8dfca"/>`+studyPath('M160 218L181 95',P.cane,6)+studyBud(179,118)+studyBud(173,153)+studyPath('M164 202l-25 22M167 188l24 30M162 214l5 25',P.wood,2)+studyShoot(180,116,44,false,20)+studyText(26,49,'① 剪下带芽枝段')+studyText(26,76,'② 培育生根')+studyText(227,227,'新根');
  const lay=studyGround(175)+`<path d="M20 176H340V253H20Z" fill="#e8dfca"/>`+studyPath('M63 174V101M63 120Q93 109 120 178Q165 228 243 190Q265 167 279 116',P.cane,6)+studyPath('M145 204l-18 28M180 207l-4 31M219 204l12 27',P.wood,2)+studyShoot(279,116,58,false,8)+studyText(26,43,'母株仍相连')+studyArrow(96,52,76,121)+studyText(167,259,'埋土部分生根','middle')+studyText(275,25,'枝梢露出','middle')+studyArrow(312,39,287,117);
  return studyPlate(key,'扦插与压条：是否先离开母株？',`<div class="study-pair">${studyCard('扦插 Cutting',studySvg('扦插先剪下枝段，再培育新根',cut),'先剪下，再生根。')}${studyCard('压条 Layering',studySvg('压条保持与母株相连，枝条中段入土生根',lay),'生根时仍相连，数年后再切断。')}</div>`,'课本 p.32 · 讲义繁殖部分','两者都是无性繁殖，延续母株品种；压条长出的根仍来自原品种，不能提供抗性砧木的保护。');
 }
 if(key==='crossing')return studyPlate(key,'有性繁殖的步骤',`<ol class="study-process"><li><b>亲本授粉、受精</b><span>同种亲本：crossing<br>不同种亲本：hybrid</span></li><li><b>形成种子</b><span>基因组合发生重组</span></li><li><b>播种并筛选幼苗</b><span>观察生长、抗性及果实<br>不是直接复制原品种</span></li></ol>`,'课本 p.33–34','嫁接不经过这条授粉与种子的路径。');
 if(key==='graft')return studyPlate(key,'接穗与砧木在接口相接',studySvg('地上接穗保持品种，嫁接点下方为砧木和根系',studyGround(195)+studyPath('M180 195V134',P.wood,10)+studyPath('M180 134V83M180 99L150 73M180 99L207 72',P.cane,8)+studyLeaf(150,73,-40)+studyLeaf(207,72,35)+studyPath('M180 195L180 220M180 214L137 251M180 214L222 250',P.wood,5)+`<rect x="168" y="126" width="24" height="20" rx="3" fill="#b69479" stroke="${P.wood}"/>`+studyText(20,30,'接穗：所需酿酒品种')+studyArrow(154,40,183,90)+studyText(234,139,'嫁接点')+studyArrow(230,135,195,135)+studyText(23,241,'砧木及根系')+studyArrow(121,235,166,212),280),'课本 p.30、34–35 · 图 4.5','图中接口高于地面。根部抗性与环境适应性帮助植株生长，接穗仍保持原品种身份。');
 if(key==='graft-methods')return studyPlate(key,'新园育苗与原园换种',`<div class="study-pair">${studyCard('室内嫁接 Bench grafting',studySvg('短段接穗有芽，与砧木接合后保护接口',studyPath('M180 224V128',P.wood,11)+studyPath('M180 128V70',P.cane,8)+studyBud(187,83)+`<rect x="165" y="117" width="30" height="24" rx="4" fill="#9e5862"/>`+studyText(23,40,'有芽的接穗')+studyArrow(129,45,179,80)+studyText(235,135,'保护接口')+studyArrow(230,131,197,130)+studyText(83,252,'愈合、育苗后栽入新园')),'常见于建新园；新植通常至少第三年有商业收成。')}${studyCard('田间换接 Head grafting',studySvg('原有主干上换接新品种，保留主干及根系',studyGround(214)+studyPath('M180 213V142',P.wood,29)+studyPath('M180 213L146 258M180 213L216 257',P.wood,4)+studyPath('M169 146V88M191 146V88',P.cane,7)+studyBud(174,98)+studyBud(196,108)+`<rect x="158" y="138" width="44" height="25" rx="4" fill="#9e5862"/>`+studyText(25,40,'换接新品种')+studyArrow(122,45,168,91)+studyText(231,188,'保留主干')+studyArrow(224,184,198,184)+studyText(49,260,'既有根系')),'成功后可在下一年结新品种果实，通常比拔园重植更快。')}</div>`,'课本图 4.5、4.6','接口须固定与保护；此图解释结构与用途，不是切口操作教程。');
 if(key==='needs')return studyPlate(key,'五个输入条件，作用各不同',studySvg('光和二氧化碳进入叶片，水和养分由根吸收，热量支持生长，氧气释放到空气',studyGround(190)+studyPath('M180 190V115',P.wood,10)+studyShoot(180,118,55,false,0)+studyPath('M180 190L145 244M180 190L219 243',P.wood,3)+studyText(15,41,'阳光 → 光能')+studyArrow(106,48,158,85,'#c8a253')+studyText(231,42,'CO₂ · 空气')+studyArrow(244,51,196,82,P.water)+studyText(239,105,'氧气释放')+studyArrow(202,94,237,96,P.water)+studyText(16,150,'适当热量')+studyText(16,171,'支持生长')+studyText(21,235,'水分')+studyArrow(63,229,143,213,P.water)+studyText(277,235,'养分')+studyArrow(274,227,216,212,P.cane)+studyText(180,275,'叶片制糖 → 生长、成熟与储备','middle'),295),'课本图 5.1','水和 CO₂ 是光合作用原料；光提供能量。热量与养分支持功能，糖不从土壤直接吸收。');
 if(key==='latitude')return studyPlate(key,'相同能量，在不同纬度的分布',`<img class="study-latitude" src="assets/textbook-latitude.svg" alt="高纬度斜射把相同太阳能量分散到较大面积；赤道附近更集中">`,'课本图 5.2','高纬度夏季白昼更长，可部分补偿较低的日照强度。');
 if(key==='temperature-ranges')return studyPlate(key,'两个时间尺度，别混淆',`<div class="study-pair">${studyCard('大陆度：一年中的月温差',studySvg('冬季低、夏季高；最热月和最冷月温差为大陆度',studyPath('M42 40V207H326',P.line,1.5)+studyPath('M45 181Q101 193 147 77Q182 19 218 89Q265 198 325 180',P.cane,3)+studyText(51,231,'冬')+studyText(183,231,'夏','middle')+studyText(318,231,'冬','end')+studyText(183,260,'比较最热月与最冷月','middle')),'水体升温、降温慢，常缓和季节温差。')}${studyCard('昼夜温差：同一天',studySvg('白天气温升高、夜间下降；同日高低温之差',studyPath('M42 40V207H326',P.line,1.5)+studyPath('M46 171Q105 179 144 75Q186 24 224 123Q268 181 324 177',P.water,3)+studyText(51,231,'清晨')+studyText(183,231,'白天','middle')+studyText(318,231,'夜晚','end')+studyText(183,260,'比较同一天的昼与夜','middle')),'凉夜有利于保留酸与香气，云和水体也会调节。')}</div>`,'课本 p.39','曲线只表示时间尺度与趋势，不是某一产区的实测温度。');
 if(key==='site')return studyPlate(key,'坡面排冷，洼地积冷',studySvg('冷空气沿坡面下沉并聚集于低洼处',`<path d="M20 145Q90 84 149 140Q228 229 340 197V270H20Z" fill="#e3e7d5"/>`+studyPath('M20 145Q90 84 149 140Q228 229 340 197','#9ca882',2)+[0,1,2].map(i=>studyArrow(145+i*27,111+i*21,170+i*27,143+i*20,P.water)).join('')+`<ellipse cx="276" cy="201" rx="55" ry="17" fill="#b9cfd2" opacity=".75"/>`+studyText(30,40,'坡中部：注意保持排冷通道')+studyText(251,244,'洼地易积冷','middle')+studyText(29,184,'土层、风与朝向仍需另判')),'课本 p.39–41','相同海拔不代表相同霜冻风险。坡面、封闭洼地与排冷通道共同影响嫩芽暴露。');
 if(key==='frost')return studyPlate(key,'低温发生阶段不同，受害对象也不同',`<div class="study-pair">${studyCard('冬季冻害',studySvg('休眠期的芽、木质部分和整株均可能被严重低温伤害',studyVine('head-spur')+studyText(26,35,'休眠：没有绿色冠层')+studyText(26,262,'极冷可伤芽、永久木与整株')),'必要时培土／埋土保护；仍有重植与恢复产量的成本。')}${studyCard('萌芽后春霜',studySvg('春霜伤嫩芽和绿色新梢',studyGround()+studyPath('M180 226V163',P.wood,12)+studyPath('M180 163L180 140',P.cane,5)+studyShoot(180,140,73,false,18)+`<rect x="20" y="180" width="320" height="47" fill="#c3d6db" opacity=".4"/>`+studyText(24,35,'萌芽后：幼嫩组织易受损')+studyText(24,262,'近地冷空气 → 潜在产量下降')),'加热、风机、喷灌各有适用条件；机制见上表。')}</div>`,'课本 p.39–40','风机依赖暖空气层；喷灌靠持续结冰释放潜热，需要正确运行和连续供水。');
 if(key==='irrigation'){
  const root=studyGround(160)+studyPath('M180 160V118',P.wood,7)+studyLeaf(180,118)+studyPath('M180 160L155 210M180 165L214 212',P.wood,2);
  return studyPlate(key,'三种灌溉，水怎样到根区？',`<div class="study-grid three">${studyCard('滴灌',studySvg('管线上的滴头在根区附近供水',root+studyPath('M36 150H324',P.water,4)+studyArrow(170,154,170,193,P.water)+studyText(25,42,'管线 → 滴头 → 根区')+studyText(180,252,'较精准、可控','middle')),'每株附近局部供水，可配合电脑控制。')}${studyCard('喷灌',studySvg('喷头向空中喷水，再落到土壤',root+studyPath('M76 161V94',P.water,4)+studyPath('M76 93Q112 50 236 129M76 93Q108 77 151 139',P.water,2,'4 5')+studyText(25,42,'喷头 → 地表 → 下渗')+studyText(180,252,'耗水较多，环境更湿','middle')),'可增加潮湿病害压力；防霜须专门设计、正确运行。')}${studyCard('漫灌',studySvg('大量水铺展于平坦地面后下渗',root+`<rect x="23" y="149" width="314" height="12" fill="#b4ced3"/>`+studyArrow(89,167,89,205,P.water)+studyArrow(269,167,269,205,P.water)+studyText(25,42,'地表铺水 → 大范围下渗')+studyText(180,252,'平地与大量近水源','middle')),'成本较低，需平坦或很缓的地形和充足水源。')}</div>`,'课本 p.42–43 · 图 5.6','水源、法规、园地需求和成本共同限制灌溉选择。');
 }
 if(key==='soil-water')return studyPlate(key,'排水与保水同时存在',`<div class="study-pair">${studyCard('较粗颗粒：排水较快',studySvg('粗颗粒之间较大的孔隙允许水向下移动',`<rect x="24" y="45" width="312" height="184" rx="4" fill="#e8dfca"/>`+[0,1,2].map(r=>[0,1,2,3].map(c=>`<ellipse cx="${60+c*74}" cy="${85+r*58}" rx="23" ry="16" fill="#bba37e"/>`).join('')).join('')+studyArrow(98,48,98,223,P.water)+studyArrow(245,48,245,223,P.water)+studyText(180,260,'大孔隙让多余水流出','middle')),'避免长期积水；储水不足且少补水时仍会干旱。')}${studyCard('黏土、腐殖质：帮助留水',studySvg('较细颗粒与有机质能结合部分水分',`<rect x="24" y="45" width="312" height="184" rx="4" fill="#ded3bc"/>`+[0,1,2,3,4].map(r=>[0,1,2,3,4,5].map(c=>`<ellipse cx="${48+c*50}" cy="${65+r*33}" rx="15" ry="8" fill="#a89171"/>${(c+r)%2?'':`<circle cx="${65+c*50}" cy="${80+r*33}" r="4" fill="${P.water}"/>`}`).join('')).join('')+studyText(180,260,'保留部分可用水','middle')),'结构不佳且黏土过多时可能排水不良。')}</div>`,'课本 p.45–46','图示比较颗粒与孔隙，实际供水还取决于结构、土层、雨量、蒸发和根系。');
 if(key==='training-types')return studyPlate(key,'整枝看的是长期保留的骨架',studyWoodLegend()+`<div class="study-grid three">${studyCard('头状 Head',studySvg('头状的多年生木主要为主干与顶部短干臂',studyGround()+studyPath('M180 226V149M180 164L136 139M180 164L222 139',P.wood,12)+studyText(180,63,'无长久水平主蔓','middle')+studyText(180,261,'顶端可有短干臂','middle')),'有水平绑缚的长枝，也可能仍是头状。')}${studyCard('主蔓 Cordon',studySvg('主蔓保留永久水平木臂',studyGround()+studyPath('M180 226V151M64 151H296',P.wood,12)+studyText(180,63,'保留水平多年生木臂','middle')+studyText(180,261,'常见单主蔓或双主蔓','middle')),'建立骨架需时间，规则结构便于机械管理。')}${studyCard('大树型 Big vines',studySvg('俯视看一株四臂大树型，四根永久主蔓占据更大空间',`<rect x="30" y="45" width="300" height="180" rx="5" fill="#e5e8d8"/>`+studyPath('M180 135L83 73M180 135L277 73M180 135L83 197M180 135L277 197',P.wood,12)+`<circle cx="180" cy="135" r="13" fill="${P.wood}"/>`+studyText(180,35,'俯视：示意四根主蔓','middle')+studyText(180,262,'较大骨架，需要更多株间空间','middle')),'两个以上主蔓；可分配肥沃多雨园地的旺盛长势。')}</div>`,'课本 p.51 · 讲义幻灯片 92–94','图中只画永久木，刻意省去冬剪留枝和绿色冠层；修剪与搭架在后面分别比较。');
 if(key==='height'){
  const v=(tall)=>studySvg(tall?'高干把嫩芽位置抬离最冷近地层':'矮干的结果部位靠近地表蓄热',`<rect x="22" y="186" width="316" height="42" fill="#c4d5da" opacity=".65"/>`+studyGround()+studyPath(`M180 226V${tall?108:175}M135 ${tall?108:175}H225`,P.wood,10)+studyText(180,37,tall?'高干：结果部位较高':'矮干：结果部位靠近地面','middle')+studyText(180,260,tall?'较远离最冷近地空气':'可更多利用地表热量','middle')+studyBud(155,tall?101:168)+studyBud(206,tall?101:168));
  return studyPlate(key,'同一种骨架，也可改变主干高度',`<div class="study-pair">${studyCard('矮干',v(false),'低位可受地表蓄热影响；也更接近最冷的近地空气。')}${studyCard('高干',v(true),'萌芽后春霜条件下，较高结果部位可降低暴露。')}</div>`,'课本 p.51 · 讲义幻灯片 95','蓝色仅表示近地冷空气层。高度取舍仍受地点、热量需求和作业条件影响。');
 }
 if(key==='vsp'){
  const v=(drop)=>studySvg(drop?'调整型VSP顶部不绑缚，向外下垂遮护果区':'VSP新梢垂直排列并绑缚，形成较窄冠层',studyVine('cordon',false)+[76,114,152,208,246,284].map(x=>studyShoot(x,148,82,true,0)+(drop?studyPath(`M${x} 66Q${x+20} 24 ${x+36} 116`,P.green,3)+studyLeaf(x+36,116,70):'')).join('')+studyText(180,28,drop?'顶梢不继续绑缚，允许下垂':'新梢向上定位、绑到铁丝','middle',14));
  return studyPlate(key,'VSP 与调整型：改变的是绿色冠层',`<div class="study-pair">${studyCard('VSP · 垂直新梢定位',v(false),'新梢排开，促进受光和通风。')}${studyCard('调整型 VSP',v(true),'炎热强光处，让顶部下垂产生遮阴。')}</div>`,'课本 p.52–53 · 图 6.3','示意均采用主蔓短枝骨架；VSP 也可配合头状替换长枝。它不是一种单独的永久骨架。');
 }
 if(key==='density'){
  const v=(dense)=>{const x=dense?60:77,x2=dense?107:178,y=dense?63:71,y2=dense?107:129;return studySvg(dense?'同面积较多植株；横向标株距，纵向标行距':'同面积较少植株；横向标株距，纵向标行距',`<rect x="35" y="42" width="285" height="174" fill="#e5e8d8" stroke="#b4baa5"/>`+Array.from({length:dense?4:3},(_,r)=>Array.from({length:dense?6:3},(_,c)=>`<circle cx="${dense?60+c*47:77+c*101}" cy="${dense?63+r*44:71+r*58}" r="6" fill="${P.green}"/>`).join('')).join('')+studyText(180,26,'俯视：每个点代表一株','middle',14)+studyArrow(x,234,x2,234,P.water)+studyArrow(x2,234,x,234,P.water)+studyText((x+x2)/2,256,'株距','middle',14)+studyArrow(332,y,332,y2,P.water)+studyArrow(332,y2,332,y,P.water)+studyText(332,y2+24,'行距','middle',13)+studyText(180,291,dense?'更多竞争；单株空间较小':'较少竞争；单株空间较大','middle',14),310)};
  return studyPlate(key,'同面积比较，密度才有意义',`<div class="study-pair">${studyCard('较低密度',v(false),'缺水时减少争水；资源丰富时也可配合大树型分配长势。')}${studyCard('较高密度',v(true),'水足而土壤较贫瘠时，可与适合留芽量配合限制单株旺长。')}</div>`,'课本 p.54–56 · 讲义幻灯片 89–90','两块地的面积相同。横向箭头是同一行内的株距，纵向箭头是两行之间的行距；此处两者均作改变，密度也可只通过改变其中之一调整。点数不对应具体株／公顷，行距还须允许所用机械通行。');
 }
 return '';
}

/* Missing visual concepts identified by viewing all 37 supplied handout pages and textbook pp.30–61.
   Source photographs are translated into explanatory schematics, not diagnostic photographs. */
function studyFruitCluster(colors,shrivel=false,small=false){
 const points=[[145,85],[178,77],[211,88],[128,116],[163,115],[198,118],[229,119],[146,150],[181,150],[215,152],[164,184],[198,184],[181,214]];
 const berryFill=c=>['#80506a','#6c4e67','#69485f'].includes(c)?'url(#BOTANICAL-berry)':['#91a168','#90a566','#93a267'].includes(c)?'url(#BOTANICAL-greenberry)':['#c3c380','#d6cd92','#a5a177'].includes(c)?'url(#BOTANICAL-goldberry)':'url(#BOTANICAL-brownberry)';
 let out=studyPath('M180 30Q177 65 180 192',studyPalette.green,2.7);
 out+=points.map(([x,y],i)=>studyPath(`M180 ${Math.max(58,y-19)}Q${(x+180)/2} ${y-12} ${x} ${y-7}`,studyPalette.green,1.35)).join('');
 out+=points.map(([x,y],i)=>{const c=colors[i%colors.length],r=small&&i%3?7:16;
 if(shrivel&&i%5!==0)return `<g><path d="M${x-11} ${y-10}q13 -9 22 2l-2 16q-9 10 -21 0l-2 -10Z" fill="url(#BOTANICAL-brownberry)" stroke="#795846" stroke-width=".8"/><path d="M${x-5} ${y-8}q-4 6 -3 14m11 -11q-4 8 -3 16M${x-9} ${y+1}q6 2 11 0" stroke="#d2b18b" fill="none" stroke-width=".8" opacity=".8"/></g>`;
 return `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*1.07}" fill="${berryFill(c)}" stroke="#f5efdc" stroke-width=".65"/><path d="M${x-r*.55} ${y-r*.33}q${r*.2} ${-r*.35} ${r*.55} ${-r*.3}" fill="none" stroke="#fcf6e6" opacity=".42" stroke-width="${r*.085}"/><ellipse cx="${x+1}" cy="${y+r*.65}" rx="${r*.32}" ry="${r*.13}" fill="#625c58" opacity=".09"/>`;
 }).join('');return out;
}
function studyLargeLeaf(fill='#8fa373',marks=''){
 const yellow=fill==='#d4c877';
 return `<g data-botanical-part="leaf-detail"><image href="assets/grape-leaf-botanical.webp" x="74" y="70" width="212" height="196" preserveAspectRatio="xMidYMid meet"${yellow?' filter="url(#BOTANICAL-yellow-leaf)"':''}/>${marks}</g>`;
}
function studySourceGapDiagram(key){
 const P=studyPalette,pair=a=>`<div class="study-pair">${a.join('')}</div>`,grid=a=>`<div class="study-grid three">${a.join('')}</div>`,card=(t,b,c,h=280)=>studyCard(t,studySvg(t,b,h),c);
 if(key==='classification')return studyPlate(key,'属、种、品种、品系：范围逐层缩小',studySvg('分类层级示例：葡萄属、欧亚葡萄种、霞多丽品种、Gingin品系',[
 ['属 · Genus','Vitis 葡萄属',25,310],['种 · Species','Vitis vinifera 欧亚葡萄',83,274],['品种 · Variety','Chardonnay 霞多丽',141,238],['品系 · Clone','Gingin',199,202]
 ].map(([a,b,y,w],i)=>`<rect x="${(360-w)/2}" y="${y}" width="${w}" height="49" rx="5" fill="${['#e1e6d6','#d8e0c9','#ccd8bd','#bdcba8'][i]}"/>${studyText(180,y+18,a,'middle',14)}${studyText(180,y+39,b,'middle',14)}${i<3?studyArrow(180,y+50,180,y+57):''}`).join(''),270),'讲义 p.7、9 · 幻灯片 25、27、35','从上往下是“其中的一部分”，不是四个并列的葡萄名称。图只选霞多丽这条路径；黑皮诺等品种与霞多丽处在同一层。');
 if(key==='clone-selection')return studyPlate(key,'克隆选择：从同品种中选母株，再无性繁殖',pair([
 card('① 比较并选择母株',studyGround(216)+[85,180,275].map((x,i)=>studyPath(`M${x} 214V151`,P.wood,7)+studyShoot(x,151,67,true,0)+(i===1?`<rect x="143" y="57" width="75" height="170" rx="8" fill="none" stroke="${P.berry}" stroke-width="2"/>`:'' )).join('')+studyText(180,34,'同一品种内也可能有差异','middle')+studyText(180,256,'选择合适的母株','middle'),'同品种内可因突变等出现差异；选出健康、符合目标的母株，继续观察与评价。'),
 card('② 扦插／压条延续性状',studyPath('M180 55V93',P.cane,6)+studyBud(187,67)+[85,180,275].map(x=>studyArrow(180,104,x,145)+studyPath(`M${x} 219V175`,P.cane,5)+studyShoot(x,175,34,false,8)+studyPath(`M${x} 218l-12 20M${x} 218l13 20`,P.wood,2)).join('')+studyText(180,35,'枝条材料 → 克隆后代','middle')+studyText(180,264,'没有经过授粉与种子','middle'),'挑选母株叫克隆选择；复制母株的手段是前面的扦插或压条。不是每次扦插都会创造新品系。')
 ]),'课本 p.32–33 · 讲义 p.9','克隆选择与扦插／压条的关系是“选谁繁殖”和“怎样繁殖”；有性繁殖则重新组合亲本遗传信息。');
 if(key==='ripening-curves'){
  const chart=hot=>studyText(25,28,'成分的相对变化')+studyPath('M40 47V222H329',P.line,1.5)+studyPath(hot?'M43 211C100 200 101 74 158 70S272 68 319 66':'M43 211C113 195 125 112 181 83S272 68 319 66',P.cane,3)+studyPath(hot?'M43 62C69 160 104 207 319 213':'M43 62C76 159 126 197 319 211',P.water,3)+studyText(269,59,'糖分','middle',14)+studyText(288,201,'酸度','middle',14)+studyArrow(62,44,hot?313:259,44,P.green)+studyText(178,39,'酚类逐渐成熟','middle',14)+studyPath(`M${hot?166:260} 62V224`,P.berry,1.5,'4 4')+studyText(hot?166:260,245,hot?'糖高时':'较易取得平衡','middle',14)+studyText(42,267,'转色开始', 'start',14)+studyText(327,267,'时间 →','end',14);
  return studyPlate(key,'适宜与过热：糖高，不代表各项都成熟',pair([
   card('适宜的品种与气候组合',chart(false),'糖分上升、酸度下降；到采收窗口，较可能与风味、酚类成熟取得合适平衡。'),
   card('对该品种而言过热',chart(true),'糖可能更早达到高水平，酸下降很快，此时酚类或风味仍未达到目标；只按糖决定采收会有取舍。')
  ]),'讲义 p.19 · 幻灯片 66','横轴从转色开始向右推进；糖、酸曲线与绿色成熟箭头分别读。曲线为讲义趋势示意，没有浓度刻度，不代表所有品种的固定生长曲线。');
 }
 if(key==='terraces')return studyPlate(key,'梯田：把陡坡分成可种植的小平台',card('侧面看：台面种植，边缘挡土',`<path d="M27 75H105V125H184V175H263V225H338V273H27Z" fill="#dfd2b9"/>`+studyPath('M27 75H105V125H184V175H263V225H338','#9f9076',3)+[63,144,224,304].map((x,i)=>studyPath(`M${x} ${75+i*50}v-34`,P.wood,5)+studyLeaf(x,41+i*50,20)).join('')+[105,184,263].map((x,i)=>[0,1,2,3].map(j=>`<rect x="${x-5}" y="${78+i*50+j*11}" width="10" height="8" rx="2" fill="#a5967d"/>`).join('')).join('')+studyText(180,26,'沿坡形成一层层平台','middle')+studyText(31,262,'石块蓄热：见上一组昼夜图','start',14),'每层较平的台面用于种植与通行，外缘可用挡土结构支撑。陡峭地形与窄平台仍可能限制机械、增加人工成本。'),'课本 p.38 · 图 5.3；讲义 p.37 的梯田照片','课本 Priorat 照片同时呈现石块和梯田：石块解释热量，阶梯状地形解释种植与作业空间；两者不是同一个概念。');
 if(key==='coastal-altitude')return studyPlate(key,'课本园地示意中的另外两条线索',pair([
  card('海水 → 海风／雾 → 沿岸园地',`<path d="M20 199H147L215 151L340 173V258H20Z" fill="#dfe4cd"/><path d="M20 199H147V258H20Z" fill="#c3d6d8"/>`+studyPath('M28 216Q58 203 88 216T143 216',P.water,2)+studyArrow(54,139,224,139,P.water)+studyPath('M128 106H214M146 118H229',P.line,5)+studyPath('M267 176v-43',P.wood,6)+studyShoot(267,133,43,false,0)+studyText(180,32,'水体升降温较慢，可缓和温差','middle',14)+studyText(180,63,'冷海风、雾可向内陆降温','middle',14)+studyText(51,244,'海水')+studyText(255,244,'园地'),'蓝色箭头是从海向陆的风，灰线是雾。雾也遮挡日照；影响能到多远，要看风向、山地和园地位置。'),
  card('海拔升高 → 通常更凉',`<path d="M25 229L241 74L338 229Z" fill="#dfe4cd"/>`+studyPath('M25 229L241 74L338 229',P.line,2)+studyPath('M100 175v-28M228 84v-27',P.wood,6)+studyLeaf(100,148)+studyLeaf(228,58)+studyArrow(51,190,51,80,P.water)+studyText(180,31,'高处通常更凉','middle')+studyText(112,211,'较低处')+studyText(249,103,'较高处')+studyText(180,265,'还要看朝向、风与年份','middle'),'同一纬度也可借海拔获得较凉条件；不要把海拔、坡向和洼地积冷混成同一个因素。')
 ]),'课本 p.38、41 · 图 5.5；讲义 p.22','先看海风与海拔这两图，再与上方坡面排冷、后面的半球坡向对照：同一块地往往同时受多种因素影响。');
 if(key==='light-reflection')return studyPlate(key,'直射光与反射光：叶片还可能接收第二条光路',card('浅色地表／水面反射',`<circle cx="63" cy="53" r="21" fill="#d9b96c"/>`+studyGround(223)+`<rect x="26" y="224" width="306" height="22" fill="#e7dfc8"/>`+studyPath('M248 222V138',P.wood,9)+studyShoot(248,138,53,false,0)+studyArrow(91,66,224,108,P.cane)+studyArrow(80,84,142,214,P.cane)+studyArrow(148,213,231,125,P.cane)+studyText(118,65,'直接日照')+studyText(35,170,'先照向地表')+studyText(178,187,'反射到植株')+studyText(180,270,'浅色土壤、水面可反射光','middle'),'直射箭头从太阳到叶片；折返箭头先到地表，再反射向植株。两条都解释光照，不等于地下根系直接吸收光能。'),'课本 p.41–42 · 讲义 p.17 幻灯片 59','反射是增加可用光的一个因素；朝向、日照时长和冠层遮阴也影响实际受光。');
 if(key==='climate-patterns'){
  const v=(kind)=>studyText(180,27,'冬 → 春 → 夏 → 秋 → 冬','middle',14)+studyPath('M35 59V157H329',P.line,1.3)+studyPath(kind==='continental'?'M40 146Q108 143 148 76Q183 28 222 87Q265 146 322 146':'M40 135Q110 132 148 96Q180 74 218 101Q268 135 322 135',P.cane,3)+studyText(180,177,kind==='continental'?'冬夏温差较大':'冬夏温差较小','middle',14)+[0,1,2,3,4].map((i)=>{const h=kind==='med'?[43,27,7,25,43][i]:kind==='maritime'?[35,34,28,36,35][i]:[20,24,18,24,20][i];return `<rect x="${52+i*55}" y="${245-h}" width="23" height="${h}" rx="2" fill="${P.water}"/>`;}).join('')+studyText(180,268,kind==='med'?'雨较集中在冬季':kind==='maritime'?'雨量全年较均匀':'夏季常干；雨型仍有地区差别','middle',14);
  return studyPlate(key,'三类气候：先看冬夏温差，再看雨在何时下',grid([
   card('大陆性 Continental',v('continental'),'大幅冬夏温差是核心特征；凉爽例子常有春霜、冬季冻害与成熟不足风险。'),
   card('海洋性 Maritime',v('maritime'),'水体缓和温度；全年降雨较均匀，生长季与采收期也要应对雨和病害。'),
   card('地中海 Mediterranean',v('med'),'冬季多雨、夏季干燥；要留意缺水、晒伤和酷热。温暖并不保证所有果实都能平衡成熟。')
  ]),'课本 p.44–45 · 讲义 p.20–21','赭色曲线比较冬夏温度走势，蓝柱表示各季相对雨量；无实测单位。用北半球季节顺序示意，南半球按季节对应，不照搬月份。');
 }
 if(key==='france-climates')return studyPlate(key,'法国例子：从西部海洋影响，读到内陆与南部',studySvg('法国示意定位：西部波尔多受大西洋影响，东北夏布利与香槟为凉爽大陆性例子，南部沿地中海',`<path d="M115 69L157 47L179 61L214 47L268 92L252 144L281 190L250 224L202 213L172 241L111 209L95 152L63 101Z" fill="#e2e7d6" stroke="#b4baa5" stroke-width="2"/>`+`<circle cx="125" cy="183" r="6" fill="${P.water}"/><circle cx="224" cy="87" r="6" fill="${P.cane}"/><circle cx="239" cy="210" r="6" fill="${P.berry}"/>`+studyText(17,159,'大西洋', 'start',14)+studyArrow(23,173,109,181,P.water)+studyText(38,225,'波尔多', 'start',14)+studyPath('M94 217L123 189',P.water,1.5)+studyText(238,48,'香槟／夏布利', 'middle',14)+studyPath('M237 57L226 79',P.cane,1.5)+studyText(294,172,'南部', 'middle',14)+studyPath('M288 180L244 205',P.berry,1.5)+studyText(278,256,'地中海', 'middle',14)+studyText(93,30,'北 ↑', 'start',14),280),'讲义 p.21 · 幻灯片 75','示意定位，不是精确产区边界：波尔多帮助理解海洋性，香槟／夏布利帮助理解凉爽大陆性，地中海沿岸帮助理解冬雨夏干。不是把全法国机械分成三块；边界、过渡区和局部气候仍须具体判断。');
 if(key==='annual-cycle'){
  const flowers=studyPath('M180 56V198M180 85L135 116M180 106L224 135M180 138L147 162',P.green,3)+[[132,116],[151,108],[224,135],[209,126],[147,162],[172,154],[188,185]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="#ded7a3"/>`+[0,1,2,3,4].map(i=>{const a=i*Math.PI*2/5;return studyPath(`M${x} ${y}l${Math.cos(a)*12} ${Math.sin(a)*12}`,P.green,1)+`<circle cx="${x+Math.cos(a)*12}" cy="${y+Math.sin(a)*12}" r="2" fill="#c8ad62"/>`;}).join('')).join('');
  const stages=[
   ['01 冬季休眠',studyGround(212)+studyPath('M180 211V136M180 155L135 120M180 155L226 120',P.wood,10)+studyPath('M135 120l-10 -30M226 120l10 -30',P.cane,4)+studyBud(129,103)+studyBud(235,94),'没有当年绿色冠层，芽和木质结构留存；冬剪安排下一季留芽。'],
   ['02 芽膨大、展开',studyPath('M174 220V163',P.cane,9)+`<g transform="translate(178 155) scale(3.1)">${studyBud(0,0)}</g><path d="M177 141C154 130 150 111 165 94Q185 102 183 125Q200 107 211 116Q210 136 183 144Z" fill="url(#BOTANICAL-leaf)" stroke="#6b8550" stroke-width="1.2"/><path d="M177 141L165 102M181 139L206 120" fill="none" stroke="#c2c995" stroke-width="1"/>`+studyText(180,257,'芽中组织开始展开','middle'),'芽内的幼嫩组织展开成为新梢。萌芽后春霜可伤害这些嫩组织。'],
   ['03 生枝长叶',studyPath('M180 222V180',P.cane,7)+studyShoot(180,180,130,false,0),'当年绿色新梢伸长，叶片与卷须展开；叶片逐渐承担制糖任务。'],
   ['04 开花',flowers,'花序上许多小花开放，成功授粉、受精后才可能形成浆果；不是花一开就成为成熟果串。'],
   ['05 坐果、幼果长大',`<g transform="translate(67 45) scale(.63)">${studyFruitCluster(['#90a566'])}</g>`+studyText(180,259,'绿、硬、低糖高酸','middle'),'成功发育的花形成幼果。坐果后的早期果粒仍绿且硬；一些花不会形成果粒。'],
   ['06 转色与成熟',`<g transform="translate(-4 45) scale(.6)">${studyFruitCluster(['#91a168','#a5a177','#80506a','#6c4e67'])}</g><g transform="translate(150 45) scale(.6)">${studyFruitCluster(['#91a168','#c3c380','#d6cd92'])}</g>`+studyText(100,253,'红葡萄','middle',14)+studyText(258,253,'白葡萄','middle',14),'左：红葡萄逐步转红紫；右：白葡萄也转色、变软、趋黄透明。同串发展可不同步，转色只是成熟开始。'],
   ['07 达到目标后采收',studyFruitCluster(['#80506a','#69485f'])+studyPath('M123 36L157 48M123 58L157 46',P.line,4)+studyText(180,267,'剪取果串：人工采收示意','middle',14),'按糖、酸、风味、单宁及健康状况选采收窗口；不是果皮变色就应立刻摘下。'],
   ['08 采后、落叶',studyGround(222)+studyPath('M180 221V151M180 164L137 122M180 164L224 122',P.wood,9)+studyLeaf(137,123,-45)+`<g filter="url(#BOTANICAL-yellow-leaf)">${studyLeaf(224,122,30)}</g>`+`<g transform="translate(260 182) scale(.6)" filter="url(#BOTANICAL-yellow-leaf)">${studyLeaf(0,0,65)}</g>`+studyArrow(262,143,270,170),'采后健康叶片仍可制糖、补充储备，随后逐渐落叶进入休眠；采收、落叶、休眠不是同一天。']
  ];
  return studyPlate(key,'按外观辨认八个阶段，再看下方月份与作业',grid(stages.map(([t,b,c])=>card(t,b,c))),'课本 p.49 · 图 6.2；讲义 p.14、26–27','按编号阅读。花序、幼果、转色果串分开画；月份随半球、地点、品种及年份改变，图不规定统一日历。');
 }
 if(key==='fruit-set'){
  const bunch=small=>studyFruitCluster(['#93a267'],false,small);
  return studyPlate(key,'坐果问题：是少了果粒，还是果粒大小不齐？',pair([
   card('落花 Coulure：更多花未成幼果',studyPath('M180 40V206M180 69L133 105M180 105L220 135M180 150L151 179',P.green,3)+[[133,105],[220,135],[151,179],[178,200]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="14" fill="#93a267"/>`).join('')+[[154,120],[206,177],[156,70],[215,92]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8" fill="none" stroke="${P.line}" stroke-dasharray="3 3"/>`).join('')+studyText(180,264,'虚线位置：未发育成果粒','middle',14),'看果串是否稀疏：更多花没能形成幼果，果粒数量减少。虚线只是对照位置，并非会留在串上的器官。'),
   card('小粒果 Millerandage：大小不齐',bunch(true)+studyText(180,264,'正常果粒与小而无籽果粒混合','middle',14),'看同串是否有明显小果粒：课本所述小粒果可能小而无籽，不能把它和正常转色时的颜色不齐混淆。')
  ]),'课本 p.50 · 开花和坐果；两课年周期讲解','寒冷阴雨可加重坐果问题。图强调“数量少”与“大小不齐”两种结果，不是两种独立害虫造成的症状。');
 }
 if(key==='case-dry'){
  const bush=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${studyPath('M0 0V-25M0 -20L-22 -41M0 -20L22 -41',P.wood,5)+studyShoot(-22,-41,24,true,-8)+studyShoot(22,-41,24,true,8)+studyShoot(0,-30,33,false,0)}</g>`;
  return studyPlate(key,'课本实例一：看见低密度、独立灌木与遮阴',card('西班牙部分干旱园地的管理组合',`<path d="M20 111H340V250H20Z" fill="#e7dcc4"/>`+[0,1].map(r=>[0,1,2].map(c=>bush(65+c*115,170+r*68,r?.9:.65)).join('')).join('')+`<circle cx="299" cy="39" r="20" fill="#d9b96c"/>`+studyText(28,37,'水有限、强光')+studyText(28,72,'无连续铁丝架')+studyText(180,274,'株间留出较大空间','middle',14),'图中每株低矮、独立，冠层自然展开。较低密度减少争水，叶片遮护果实；仍需要土壤储水支持，干旱严重时并非靠低密度就能解决。',295),'课本 p.55 · 图 6.4；讲义 p.25、31','这是课本情境的空间示意，不是所有西班牙园地的统一形式。密度、树型和叶幕共同回应水分与强光限制。');
 }
 if(key==='case-wet'){
  const row=y=>studyPath(`M26 ${y-18}H334`,P.line,1.5)+[39,121,203,285].map(x=>studyPath(`M${x} ${y+34}v-34`,P.wood,4)+studyPath(`M${x} ${y}h49`,P.cane,2.5)+[x,x+20,x+40].map((xx,i)=>studyPath(`M${xx} ${y}v-${i%2?55:43}`,P.green,2)+`<g transform="translate(${xx} ${y-(i%2?34:19)}) scale(.55)">${studyLeaf(0,0,i%2?-40:40)}</g>`).join('')).join('');
  return studyPlate(key,'课本实例二：密植＋头状长枝＋向上定位新梢',card('波尔多情境的管理组合',`<rect x="20" y="86" width="320" height="166" fill="#e4e8d7"/>`+row(139)+row(215)+studyText(180,28,'水充足，单株争取的资源较少','middle',14)+studyText(180,56,'留出行间通道，冠层保持开放','middle',14)+studyText(180,280,'图中赭色横枝逐年替换','middle',14),'每株横绑的细赭色枝是一年生长枝，不是永久主蔓；绿色新梢向上定位。与适量留芽配合限制单株旺长，开放叶幕促进受光、通风和干燥。',300),'课本 p.56 · 图 6.5；讲义 p.25、31–32','图强调高密度园地的行列与冠层；单株木龄辨认见修剪对照图。不能仅凭近海就推断必须密植，条件与机械通行仍需一起考虑。');
 }
 if(key==='disease-signs')return studyPlate(key,'病害外观对照：叶片正背面与果实要分开看',grid([
  card('霜霉病 Downy mildew',studyLargeLeaf('#a4b67f',`<path d="M146 156Q151 146 164 150Q176 151 174 161Q172 169 158 167Q146 167 146 156Z" fill="#d6c46c" opacity=".72"/><path d="M204 180Q208 169 222 172Q239 170 238 183Q237 195 222 195Q204 195 204 180Z" fill="#d6c46c" opacity=".72"/>`)+`<circle cx="279" cy="66" r="36" fill="#e4e8d7" stroke="#b4baa5"/>`+Array.from({length:21},(_,i)=>`<path d="M${256+(i%7)*7} ${52+Math.floor(i/7)*10}l3 -4 2 5" fill="none" stroke="#fffdf4" stroke-width="2"/>`).join('')+studyText(45,35,'叶面黄斑', 'start',14)+studyText(279,116,'叶背绒状层','middle',13),'主图看叶面黄斑，小圆圈看叶背灰白绒状生长。温暖潮湿时有利；花序与幼果也可受害。'),
  card('白粉病 Powdery mildew',studyLargeLeaf('#8fa373')+Array.from({length:75},(_,i)=>`<circle cx="${133+(i%15)*6+Math.sin(i*2.7)*4}" cy="${132+Math.floor(i/15)*9+Math.cos(i*1.9)*5}" r="${2+i%3}" fill="#f4f1e7" opacity=".8"/>`).join('')+studyText(180,35,'表面出现灰白粉层','middle',14),'看绿色组织表面的粉状覆盖，与霜霉的叶面黄斑／叶背绒层区分；果粒也可萎缩、开裂或成熟异常。'),
  card('灰腐 Grey rot',studyFruitCluster(['#92735e','#80506a','#92735e'])+Array.from({length:55},(_,i)=>`<circle cx="${136+(i%11)*8+Math.sin(i*3.2)*5}" cy="${105+Math.floor(i/11)*19+Math.cos(i*2.1)*6}" r="${2+i%3}" fill="#c6bfb1" opacity=".8"/>`).join('')+studyText(180,263,'果实腐烂，健康与风味受损','middle',14),'看果粒上的灰色霉层与腐烂；持续潮湿会加重破坏。贵腐另需成熟果实及合适的交替天气，见采收单元。')
 ]),'课本 p.57–58 · 讲义 p.34–35 幻灯片 128–129','依据资料列出的特征画成教学示意，不是诊断照片；真实病斑会变化、也可能混合发生。图用于理解区别，防治仍要先辨认原因。');
 if(key==='pest-identities')return studyPlate(key,'讲义中的小型害虫，外形与位置不要混淆',grid([
  card('根瘤蚜：小型昆虫',studyPath('M172 221L120 139M172 221L227 116',P.wood,7)+`<circle cx="185" cy="120" r="66" fill="#eee5d3" stroke="#b4baa5"/>`+`<ellipse cx="185" cy="121" rx="20" ry="29" fill="#c6a465"/><circle cx="185" cy="88" r="11" fill="#b99760"/>`+[-1,1].map(s=>[0,1,2].map(i=>studyPath(`M${185+s*17} ${105+i*14}l${s*21} 10`,P.wood,2)).join('')).join('')+studyText(180,35,'放大示意：实际很小','middle',14)+studyText(180,266,'酿酒园主要关注根部危害','middle',14),'圆圈放大虫体类别，下面是根系。课堂重点是根部损伤与抗性砧木，不是背虫体比例；美洲砧木保护根部。'),
  card('线虫：土壤中的微小蠕虫',`<rect x="31" y="62" width="298" height="177" rx="9" fill="#e7dcc4"/>`+studyPath('M84 91Q183 51 183 121T277 204',P.wood,9)+studyPath('M79 153Q101 115 121 160T158 197',P.cane,5)+studyText(180,35,'长条蠕虫，不是昆虫','middle',14)+studyText(180,266,'生活在土壤中，可伤根','middle',14),'弯曲长条对应讲义显微图中的蠕虫外形；侵袭根系、影响吸收，部分种类还可传播病毒。'),
  card('螨类：叶片上的另一类对象',studyLargeLeaf('#a4b67f')+`<circle cx="180" cy="146" r="44" fill="#eee5d3" stroke="#b4baa5"/><ellipse cx="180" cy="145" rx="14" ry="19" fill="#a65441"/>`+[-1,1].map(s=>[0,1,2,3].map(i=>studyPath(`M${180+s*11} ${132+i*8}l${s*16} ${i<2?-12:12}`, '#a65441',2)).join('')).join('')+studyText(180,35,'红色仅为讲义叶螨例子','middle',14),'圆圈放大叶螨类别，与线虫、根瘤蚜分开。它们可损伤叶片、影响光合作用，不能把所有小型害虫用同一防治方法处理。')
 ]),'讲义 p.8、34 · 幻灯片 31、126–127','虫体为依据讲义照片的类别示意，放大比例各不相同；不能用此图鉴定物种。鸟与哺乳动物的屏障措施见防鸟网图及上表。');
 if(key==='botrytis')return studyPlate(key,'同一种灰霉菌，天气与果实状态可带来不同结果',pair([
  card('合适条件下形成贵腐',studyFruitCluster(['#9a7859','#927052','#ad8b5f'],true)+studyText(180,266,'失水、皱缩，发展不同步','middle',14),'成熟白葡萄先有潮湿感染条件，随后温暖干燥促进失水。看图中皱缩果皮；需分批选择发展合适的果粒，并非所有霉果都可酿甜酒。'),
  card('持续潮湿：破坏性灰腐',studyFruitCluster(['#846651','#9d8271','#80506a'])+Array.from({length:63},(_,i)=>`<circle cx="${132+i%12*8+Math.sin(i*2.4)*5}" cy="${100+Math.floor(i/12)*20+Math.cos(i*2.1)*6}" r="3" fill="#c2bbb0" opacity=".85"/>`).join('')+studyText(180,266,'腐烂与风味受损','middle',14),'湿度持续不退，感染可向破坏性腐烂发展。右图强调灰色霉层；不能单凭有霉、变褐或皱缩，就判断为有益贵腐。')
 ])+`<ol class="study-process"><li><b>成熟葡萄＋湿雾早晨</b><span>有利 Botrytis 感染</span></li><li><b>温暖、干燥的下午</b><span>促进失水与浓缩</span></li><li><b>多次进园选果</b><span>发展程度不同，逐粒或局部挑选</span></li></ol>`,'讲义 p.37 · 幻灯片 137；课本灰腐与采收部分','两图帮助理解天气条件与结果，不能靠外观单独判定用途。失水、低出汁率和人工选果推高成本；感染也改变成分，不能把所有成分一概写成升高。');
 if(key==='management-controls')return studyPlate(key,'四种管理手段，一起作用于果实成熟',studySvg('整枝、修剪、搭架、种植密度分别管理不同对象，一起影响果实成熟',[
 ['整枝','多年生木的形状',22,32],['修剪','保留哪些枝、叶、芽',195,32],['搭架','支柱与铁丝的支撑',22,187],['密度','单位面积种几株',195,187]
 ].map(([t,b,x,y])=>`<rect x="${x}" y="${y}" width="143" height="56" rx="6" fill="#e1e7d4"/>${studyText(x+71,y+23,t,'middle',16)}${studyText(x+71,y+44,b,'middle',12)}`).join('')+`<ellipse cx="180" cy="139" rx="75" ry="26" fill="#e6d8dd"/>`+studyText(180,145,'平衡生长与成熟','middle',15)+studyArrow(100,90,138,115)+studyArrow(258,90,221,115)+studyArrow(100,185,139,162)+studyArrow(258,185,222,162)),'讲义 p.24 · 幻灯片 87–88','四个框分别对应下表的管理对象。它们要协调使用：永久骨架、冬剪留芽、绿色冠层和行列空间，不能相互替代。');
 if(key==='resource-yield'){
  const v=rich=>studyGround(224)+studyPath('M180 221V162M180 162H96M180 162H264',P.wood,9)+[105,155,205,255].map((x,i)=>studyShoot(x,159,rich?95:49,true,0)).join('')+studyText(180,35,rich?'足够资源支持更多有效叶片':'资源不足：叶片工作受限制','middle',14)+studyText(180,267,rich?'有潜力支持较高优质产量':'同样负载可能难以成熟','middle',14);
  return studyPlate(key,'判断负载：先看资源能支持多少成熟果实',pair([
   card('资源较充足，管理匹配',v(true),'足够的光、热、水和养分，以及有效受光叶片，可支持较高的优质产量；仍须控制过旺枝叶和病害。'),
   card('资源有限，同样果实负载',v(false),'图中果串数相同，能工作的叶幕却较少。若供给跟不上，成熟可能困难；减少负载也不能替代改善受光和供水等问题。')
  ]),'课本 p.54 · 讲义 p.32 幻灯片 119–120','为说明供给与负载，示意两株有相同果串数；真实产量还看果串重量、密度和年份。不能由“低产”直接推出“高品质”，也不能把过量施肥等同于资源配置良好。');
 }
 if(key==='heat-hazards')return studyPlate(key,'酷热与野火：果实受损有两条不同路径',pair([
  card('极端热量与缺水',`<circle cx="282" cy="58" r="25" fill="#d9b96c"/>`+studyPath('M180 222V163',P.wood,9)+studyPath('M180 164Q151 91 110 119M180 164Q211 91 251 130',P.green,4)+studyLeaf(110,119,-100)+studyLeaf(251,130,110)+`<g transform="translate(125 147) scale(2.7)">${studyBerries(0,0,'#9d775d')}</g>`+studyArrow(264,91,229,143,P.cane)+studyText(180,267,'晒伤、脱水、成熟受阻','middle',14),'看弯垂的绿色枝叶和褐色受损果粒：高温与缺水可共同伤害植株。极端高温即使供水充分，也可能让活动放缓或停止。'),
  card('野火：火烧与烟雾影响',`<path d="M51 221Q17 192 57 148Q46 180 77 172Q103 202 79 221Z" fill="#c18c55"/><path d="M81 120Q124 79 166 103T304 93M81 142Q153 106 203 127T316 117" fill="none" stroke="#c4c2b7" stroke-width="12" stroke-linecap="round"/>`+studyPath('M267 225V171',P.wood,9)+studyShoot(267,171,50,true,0)+studyArrow(158,89,230,98,P.line)+studyText(180,39,'烟可影响远于火焰的园地','middle',14)+studyText(180,267,'火烧损失 ≠ 烟熏污染','middle',14),'火焰可直接毁藤及设施；烟雾飘向成熟果实，可造成烟熏污染。没有烧到这株藤，也不等于完全没有烟的风险。')
 ]),'课本温度风险部分 · 讲义 p.16 幻灯片 55–56','两图解释不同损伤机制，颜色只用于识别受害对象，不是判定成熟果实品质或烟熏污染的检测方法。');
 return '';
}
