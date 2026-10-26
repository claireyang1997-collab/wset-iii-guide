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
 return `<figure id="wmfig-${wmEscape(d.id)}" class="wm-plate wm-photo-plate" data-wm-figure="${wmEscape(d.type)}">
 <div class="wm-plate-title">${wmEscape(d.title)}</div>
 <div class="wm-plate-grid wm-plate-${count}">${d.photos.map(p=>`<div class="wm-plate-panel wm-photo-panel"><h3>${wmEscape(p.title)}</h3><img src="${wmEscape(p.image)}" alt="${wmEscape(p.title)}" loading="lazy" decoding="async"><p class="wm-photo-caption">${wmEscape(p.caption)}</p></div>`).join('')}</div>
 ${d.caption?`<figcaption>${wmEscape(d.caption)}</figcaption>`:''}</figure>`;
}
function wmDiagram(d){
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
 const capTank=(x=45,y=30,w=200,h=170)=>`${rect(x,y,w,h,'#f5f3e9','#7b8986',7)}${juice(x+2,y+70,w-4,h-72)}${rect(x+2,y+50,w-4,25,'#673c4c',wine,0)}${Array.from({length:12},(_,i)=>ellipse(x+10+i*16,y+60,7,5,'#8e5a6d',wine)).join('')}`;
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
 }else if(n==='filtration'){
  title='图 7.6 · 过滤介质在哪里截留颗粒';panels=[
  {label:'深层过滤',svg:`${rect(105,25,80,170,'#d3d9bd','#a2ad8e')}${Array.from({length:35},(_,i)=>line(108+i%7*11,30+Math.floor(i/7)*35,125+i%7*9,52+Math.floor(i/7)*31,'#a2ad8e',1)).join('')}${line(18,105,100,105,blue,4,true)}${line(188,105,267,105,blue,4,true)}${[60,85,125,150].map((x,i)=>ellipse(x,78+i%2*48,5,5,wine,wine)).join('')}`,notes:['较厚、多孔的介质','颗粒截留在介质内部']},
  {label:'表面过滤',svg:`${rect(145,25,8,170,'#9caa8e','#7b8e6c',0)}${line(18,105,138,105,blue,4,true)}${line(158,105,267,105,blue,4,true)}${[0,1,2,3,4].map(i=>ellipse(136,50+i*30,5,5,wine,wine)).join('')}`,notes:['细膜孔径形成屏障','微小颗粒留在上游表面']}];caption='图中箭头为酒液方向。课本还展示滤芯及金属外壳、旋转滚筒和板框式过滤设备；过滤方法不能只凭机器外形判断。';
 }else if(n==='packaging'){
  title='图 7.7 · 包装形式';const bottle=(x,c)=>`${rect(x+24,20,22,44,c,'#758879',3)}<path d="M${x+24} 62Q${x+24} 75 ${x+8} 85V190H${x+62}V85Q${x+46} 75 ${x+46} 62Z" fill="${c}" stroke="#758879" stroke-width="2"/>${rect(x+10,114,50,40,'#eee9d7','#d2d0bc',1)}`;panels=[
  {label:'玻璃瓶',svg:bottle(108,'#73866c'),notes:['惰性，长期陈年表现成熟','重量与运输空间较大']},
  {label:'塑料瓶',svg:bottle(108,'#cbd6b9'),notes:['较轻、较易运输','逐渐透氧，适合较快饮用']},
  {label:'袋装盒',svg:`${rect(55,30,170,165,'#e2d8bd','#a79878')}${rect(75,52,125,118,'#c7c7b3','#9a9f8c',15)}${line(197,160,242,160,blue,7)}${line(242,160,242,182,blue,7)}`,notes:['倒酒时内袋逐渐收缩','袋材仍透氧，不用于长期陈年']}];caption='包装和封口共同影响保护能力；还须结合目标饮用时间与运输成本。';
 }else if(n==='closures'){
  title='图 7.8 · 封口结构对照';panels=[
   {label:'天然软木塞',svg:`${rect(98,35,88,150,'#c6a56f','#a17b4b',10)}${Array.from({length:22},(_,i)=>line(107+i%5*15,49+Math.floor(i/5)*28,113+i%5*15,52+Math.floor(i/5)*28,'#89693e',2)).join('')}`,notes:['整块软木；个体透氧有差异','需控制TCA污染']},
   {label:'技术软木塞',svg:`${rect(98,35,88,150,'#ccb186','#a17b4b',10)}${Array.from({length:40},(_,i)=>ellipse(107+i%6*13,49+Math.floor(i/6)*20,4,3,i%2?'#a17b4b':'#e2c596','#b6925e')).join('')}`,notes:['处理后的软木颗粒等构成','性能取决于等级及工艺']},
   {label:'合成塞',svg:`${rect(98,35,88,150,'#e0c9a1','#ae956e',10)}${line(108,46,108,174,'#eedfc6',4)}`,notes:['石化或植物来源材料','按隔氧表现与饮用期选择']},
   {label:'螺旋盖',svg:`${rect(80,50,122,100,'#bac6bd','#78877c',8)}${[75,85,95,105].map(y=>line(82,y,200,y,'#7e8f84',2)).join('')}${rect(80,145,122,18,'#8e9f8d','#78877c',2)}${txt(142,190,'内衬控制透氧',15)}`,notes:['金属盖＋内衬','可再封，也适合高品质酒']}];caption='外形只帮助辨认类型；保存表现要结合具体材料、内衬、装瓶与储存条件。';
 }else if(n==='lees'){
  title='图 8.2 · 酒泥接触与搅桶';panels=[
   {label:'静置：酒泥沉在底部',svg:`${tank(85,25,115,165)}${rect(89,166,107,20,'#baa974','#978657',1)}${txt(140,135,'酒液',17)}${line(205,175,266,175,gold,2,true)}`,notes:['移除粗酒泥','可按风格保留细酒泥接触']},
   {label:'搅动：细酒泥重新悬浮',svg:`${tank(85,25,115,165)}${line(145,0,130,175,wood,6)}<path d="M110 130Q170 85 179 140Q185 170 125 175" fill="none" stroke="${gold}" stroke-width="3" marker-end="url(#wm-arrow)"/>${Array.from({length:15},(_,i)=>ellipse(101+i%5*19,90+Math.floor(i/5)*32,3,3,'#b6a877','#b6a877')).join('')}`,notes:['搅桶使酒液与细酒泥接触','可增加质感、面包及饼干类特征']}];caption='细酒泥主要包括死亡酵母等沉淀。搅桶是可选操作，不等于所有沉淀都应长期留酒。';
 }else if(n==='freeze'){
  title='图 8.3 · 冰冻葡萄与浓缩汁';panels=[
   {label:'冻态采收',svg:`${berries(115,75,1.8,'#a59f7c')}${[75,100,125,150,175,200].map((x,i)=>`${line(x,145,x+12,135,'#b6d5da',2)}${line(x+2,132,x+10,148,'#b6d5da',2)}`).join('')}`,notes:['水的一部分结成冰','葡萄须保持冰冻进入压榨']},
   {label:'冻态压榨',svg:`${rect(55,45,172,112,'#cbd7ce','#82998a')}${rect(65,65,150,25,'#a9b7b0','#82998a')}${line(140,14,140,61,wine,3,true)}${txt(140,120,'冰留在压榨机中',15)}${line(230,145,265,145,blue,4,true)}${ellipse(266,177,8,15,'#ceae58','#b9984e')}`,notes:['含糖汁液流出','分离部分水，糖与酸浓缩']}];caption='冰酒仍需把浓缩汁发酵成酒。成酒的甜度取决于剩余糖分，不是“加冰”产生的甜味。';
 }else if(n==='cap'){
  title='图 9.1、9.2 · 酒帽管理的四条路径';panels=[
   {label:'压帽 Punching down',svg:`${capTank()}${line(145,0,145,105,'#7d8b7d',7)}${rect(108,95,75,12,'#9aa89b','#7d8b7d',1)}${line(205,5,205,90,blue,3,true)}`,notes:['工具把上浮酒帽压回酒液','增加接触，强度可调']},
   {label:'淋皮 Pumping over',svg:`${capTank()}<path d="M245 175H275V8H145V42" fill="none" stroke="${blue}" stroke-width="5" marker-end="url(#wm-arrow)"/>${ellipse(273,174,13,13,'#c1ceca',blue)}`,notes:['从底部抽酒、泵到顶部','酒液淋过酒帽并回到罐内']},
   {label:'倒罐返浇 Rack and return',svg:`${capTank(25,30,145,170)}${rect(202,130,70,70,'#e6e7dc','#82998a')}${juice(204,160,66,38)}<path d="M170 180H202M238 125V5H95V40" fill="none" stroke="${blue}" stroke-width="4" marker-end="url(#wm-arrow)"/>`,notes:['先排出酒液，再整体返浇','与持续小量淋皮区分']},
   {label:'旋转式发酵',svg:`<g transform="rotate(-15 145 115)">${rect(30,65,230,110,'#dee3db','#82998a',45)}${juice(65,120,160,40)}</g><path d="M85 30Q170 -10 233 42" fill="none" stroke="${blue}" stroke-width="3" marker-end="url(#wm-arrow)"/>${line(50,185,35,215,'#82998a',6)}${line(240,185,255,215,'#82998a',6)}`,notes:['容器转动使皮渣与汁液混合','设备、效率与提取强度一起考虑']}];caption='深色带为酒帽，红色为酒液，蓝色箭头为操作方向。提取效果还取决于温度、频率、时间及原料。';
 }else if(n==='temperature'){
  title='讲义示意 · 温度与发酵进程';panels=[{label:'适宜范围内，较温暖通常更快',svg:`${line(45,185,45,22,ink,1.5,true)}${line(45,185,275,185,ink,1.5,true)}<path d="M48 40C100 40 95 162 195 175" fill="none" stroke="${wine}" stroke-width="3"/><path d="M48 40C140 40 160 115 260 175" fill="none" stroke="${blue}" stroke-width="3"/>${txt(9,88,'残',13)}${txt(9,106,'糖',13)}${txt(160,220,'发酵时间 →',14)}${txt(92,144,'较温暖',13,wine)}${txt(209,100,'较凉爽',13,blue)}`,notes:['纵轴：剩余糖的相对水平；横轴：时间','酒红线较快消耗糖，蓝线较慢','过热会使酵母停工，不能把曲线无限外推']}];caption='参照讲义169的速度关系重画；曲线为趋势示意，未使用实测数据或固定天数。温度、菌株、糖分与营养都会影响实际速度。';
 }else if(n==='extraction'){
  title='讲义示意 · 色素与单宁的萃取阶段';panels=[{label:'三类物质的高峰不在同一阶段',svg:`${line(45,185,45,22,ink,1.5,true)}${line(45,185,275,185,ink,1.5,true)}<path d="M48 183C78 175 78 30 102 42S122 168 265 182" fill="none" stroke="${wine}" stroke-width="3"/><path d="M48 183C110 175 130 122 163 98S210 153 265 182" fill="none" stroke="${blue}" stroke-width="3"/><path d="M48 183C135 183 153 140 193 125S240 150 265 182" fill="none" stroke="${gold}" stroke-width="3"/>${txt(10,54,'相',12)}${txt(10,72,'对',12)}${txt(10,90,'萃',12)}${txt(10,108,'取',12)}${txt(10,126,'速',12)}${txt(10,144,'率',12)}${txt(160,220,'接触时间 →',14)}`,notes:['酒红线：色素较早出现明显萃取高峰','蓝线：果皮单宁；金线：籽单宁，明显萃取通常较后','曲线比较萃取速率的阶段，不代表成酒浓度或固定天数']}];caption='参照讲义198重画的定性示意，无实测坐标或单位。酒精、温度、品种和成熟度会改变曲线；萃取速率下降不等于酒中已提取的物质同时全部消失。';
 }else if(n==='steep'){
  title='图 10.1 · 陡坡如何转化为成本';panels=[
   {label:'陡坡与梯田',svg:`<path d="M5 210L55 175H90V142H125V110H165V78H205V45H275V220H5Z" fill="#dadfc7" stroke="#97a27d" stroke-width="2"/>${[60,105,145,187,235].map((x,i)=>`${line(x,168-i*29,x,135-i*29,wood,5)}${line(x-13,140-i*29,x+13,140-i*29,'#74834e',4)}`).join('')}${ellipse(146,85,8,8,'#b29a77')}${line(146,94,137,115,wine,4)}${line(137,115,123,126,wine,4)}${line(137,115,151,124,wine,4)}`,notes:['机械进入和作业受限制','人工操作与搬运更困难']},
   {label:'连到酒价，而非直接等同品质',svg:`${rect(25,35,230,45,'#e9e6d2','#c7c4ab')}${txt(140,64,'更多人工／较慢作业',17)}${line(140,85,140,115,gold,3,true)}${rect(25,125,230,50,'#e5d8d8','#c9b4b7')}${txt(140,156,'单位葡萄的生产成本增加',16)}`,notes:['还取决于产量、工资及规模','售价也受需求、声誉和利润影响']}];caption='摩泽尔陡坡葡萄园是地形限制机械化的例子；高生产成本并不保证市场愿意支付更高售价。';
 }
 if(!panels.length)return '';
 const defs=`<defs><linearGradient id="wm-steel" x2="1"><stop stop-color="#9caaa7"/><stop offset=".3" stop-color="#edf0e8"/><stop offset=".65" stop-color="#bcc8c2"/><stop offset="1" stop-color="#8c9d97"/></linearGradient><linearGradient id="wm-oak" x2="1"><stop stop-color="#a47c45"/><stop offset=".4" stop-color="#d5b578"/><stop offset="1" stop-color="#9b713c"/></linearGradient><marker id="wm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="context-stroke" stroke-width="1.6"/></marker></defs>`;
 return `<figure id="wmfig-${wmEscape(d.id||n)}" class="wm-plate" data-wm-figure="${wmEscape(n)}"><div class="wm-plate-title">${wmEscape(title)}</div><div class="wm-plate-grid wm-plate-${panels.length}">${panels.map((p,i)=>`<div class="wm-plate-panel"><h3>${wmEscape(p.label)}</h3><svg viewBox="0 0 ${p.w||290} ${p.h||235}" role="img" aria-label="${wmEscape(p.label)}" preserveAspectRatio="xMidYMid meet">${(defs+p.svg).replace(/wm-(steel|oak|arrow)/g, 'wm-'+(d.id||n)+'-'+i+'-$1')}</svg><ul>${p.notes.map(t=>`<li>${wmEscape(t)}</li>`).join('')}</ul></div>`).join('')}</div><figcaption>${wmEscape(d.caption||caption)}</figcaption></figure>`;
}
