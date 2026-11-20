/* Session 7 chapter rendering and source links. */
const s7Photos = {
 'alsace-slope':['assets/s7-alsace-vineyard.jpg','阿尔萨斯特级园的坡度与朝向',1295,863,'藤行沿山坡展开，不同坡面的坡度与朝向影响园地接收的阳光。平原则有不同的春霜管理需求。'],
 'alsace-cellar':['assets/s7-alsace-cellar.jpg','阿尔萨斯酒窖的三种容器',525,468,'课本图 17.3 局部。前方的大旧桶、左侧小桶和后方钢罐并存，分别对应传统的中性发酵、部分红酒的用桶选择及现代控温。'],
 'sancerre-soil':['assets/s7-sancerre-vineyard.jpg','桑塞尔的石质坡地',1800,1200,'桑塞尔镇坐落在山丘上，葡萄园沿坡分布。前景藤行之间可见浅色石块，多石坡地有利于排水。'],
 'savennieres-vines':['assets/s7-savennieres-vines.jpg','萨维涅尔的杯状整形白诗南',806,371,'课本图 18.3 局部。前景为分开的杯状藤体，后方可见不同高度及朝向的坡地。']
};

const s7DiagramImages = {
 alsace:['assets/s7-alsace-map.jpg',449,433,'地图上孚日山脉在西、莱茵河在东，葡萄园带夹在山麓与平原之间'],
 loire:['assets/s7-loire-map-supplied.png',1343,800,'卢瓦尔河从中央产区流经图赖讷、安茹–索米尔和南特，向西注入大西洋'],
 vouvray:['assets/s7-vouvray-profile.jpg',694,402,'剖面依次显示高原、白垩斜坡、酒窖与河岸冲积土']
};

const s7DetailImages = {
 'rain-shadow':['assets/s7-rain-shadow.webp',1250,302,'孚日山雨影剖面','从左往右看：西风带来湿空气，孚日山迎风坡降雨，东侧背风坡的葡萄园较干燥。再向东是平原和莱茵河。'],
 'soil-profile':['assets/s7-soil-profile.webp',1250,254,'阿尔萨斯土壤样本与地质剖面','左边是 13 类土壤样本，右边是地质剖面。沿山麓到谷底会经过不同岩层和沉积物，同一山麓也有不同的土壤。'],
 'riesling-grapes':['assets/s7-riesling-grapes.webp',610,850,'雷司令 Riesling','图中为浅色果粒。杯中重点看高酸、柑橘和核果。'],
 'gewurztraminer-grapes':['assets/s7-gewurztraminer-grapes.webp',521,850,'琼瑶浆 Gewurztraminer','淡粉色果皮可使部分酒款呈较深的金黄色。'],
 'pinot-gris-grapes':['assets/s7-pinot-gris-grapes.webp',596,850,'灰皮诺 Pinot Gris','果皮可呈灰粉或紫灰色。成酒颜色可接近琼瑶浆，香气通常更含蓄。'],
 'muscat-grapes':['assets/s7-muscat-grapes.webp',636,850,'麝香 Muscat','阿尔萨斯主要对照小粒白麝香和奥托奈麝香，复习时同时记住香气、坐果率和产量稳定性。'],
 'hugel-pinot-gris':['assets/s7-hugel-pinot-gris.webp',701,628,'大区单品种','找 Alsace 和 Pinot Gris，分别读出产区和葡萄品种。'],
 'hugel-gentil':['assets/s7-hugel-gentil.webp',1044,743,'大区混酿','找 Gentil，读出阿尔萨斯混酿的标示。'],
 'schlossberg':['assets/s7-schlossberg.webp',774,805,'特级园单品种','找 Alsace Grand Cru、Schlossberg 和 Riesling，分别读出等级、地块和品种。'],
 'sommerberg-sgn':['assets/s7-sommerberg-sgn.webp',799,779,'特级园粒选贵腐','找 Sommerberg、Riesling、2009 和 Sélection de Grains Nobles，分别读出地块、品种、年份和采收术语。'],
 'loire-textbook-map':['assets/s7-loire-textbook-map-redrawn.svg',1120,594,'图 18.1 · 卢瓦尔河谷','从大西洋沿河向东找南特、安茹–索米尔、图赖讷和中央产区，再沿莱昂河找莱昂丘、沿维埃纳河找希侬。'],
 'loire-melon':['assets/s7-loire-melon.png',470,634,'白瓜','南特 · 密斯卡岱干白','Melon de Bourgogne'],
 'loire-chenin':['assets/s7-loire-chenin.png',1232,1702,'白诗南','安茹–索米尔、图赖讷 · 干白、甜白与起泡酒','Chenin Blanc'],
 'loire-sauvignon':['assets/s7-loire-sauvignon.png',760,960,'长相思','中央产区 · 桑塞尔干白、普依–芙美','Sauvignon Blanc'],
 'loire-cabernet-franc':['assets/s7-loire-cabernet-franc.png',295,429,'品丽珠','图赖讷、安茹–索米尔 · 希侬红、索米尔–尚皮尼','Cabernet Franc'],
 'chenin-grapes':['assets/s7-chenin-grapes-supplied.png',1920,1080,'白诗南果串','同一串葡萄也可能成熟不均。分批入园，挑选符合起泡、干白或甜酒所需成熟度的葡萄。'],
 'nantais-map':['assets/s7-nantais-map.webp',1250,715,'南特与密斯卡岱','先找南特，再向东南找 Muscadet Sèvre et Maine。Muscadet 覆盖面积更大，Sèvre et Maine 的产量更大。'],
 'lees-vessel':['assets/s7-lees-vessel.webp',702,850,'酒泥熟化的容器','结合时间线看，酒在容器内与细酒泥接触越冬，次年装瓶。'],
 'rose-press':['assets/s7-rose-press.webp',1023,670,'桃红酿造的压榨设备','直接压榨在压榨时短暂接触果皮。短时浸皮则先让汁液与果皮接触，再分离果皮。'],
 'cabernet-anjou-label':['assets/s7-cabernet-anjou-label.webp',800,483,'Cabernet d’Anjou 酒标','留意完整产区名。安茹卡贝内通常为半干至半甜，用品丽珠与赤霞珠。'],
 'loire-red-map':['assets/s7-loire-red-map.webp',1246,850,'安茹–索米尔与图赖讷的红酒产区','沿河向东找索米尔、索米尔–尚皮尼，再找河岸两侧的希侬和布尔格伊。'],
 'saumur-champigny-label':['assets/s7-saumur-champigny-label.webp',458,850,'Saumur-Champigny 酒标','图中是 Clos Rougeard 酒瓶。Saumur-Champigny 是产区名，成酒以品丽珠为主。'],
 'anjou-map':['assets/s7-anjou-map.webp',1250,714,'萨维涅尔、莱昂丘与甜酒产区','找昂热附近的萨维涅尔，再沿莱昂河找莱昂丘、Quarts de Chaume 和 Bonnezeaux。'],
 'savennieres-label':['assets/s7-savennieres-label.webp',498,850,'Coulée de Serrant 酒标','这是萨维涅尔一带的白诗南实例。认清酒标中的地名，再回看向阳片岩坡地与干白风格。'],
 'quarts-chaume-label':['assets/s7-quarts-chaume-label.webp',530,850,'Quarts de Chaume 酒标','与地图一起读：这是莱昂河谷的独立甜酒产区，采用白诗南。'],
 'vouvray-map':['assets/s7-vouvray-map.webp',1250,700,'武弗雷与图赖讷局部地图','武弗雷在图尔以东、卢瓦尔河北岸，Jasnières 在较北的卢瓦河（Loir）一带。'],
 'tuffeau-cellar':['assets/s7-tuffeau-cellar.webp',736,850,'石灰岩内的洞窖','tuffeau 易于开凿。洞窖环境利于储酒，也用于传统法起泡酒的熟化。'],
 'vouvray-cliff':['assets/s7-vouvray-cliff.webp',595,850,'武弗雷石灰岩崖壁','先看崖壁与洞口，再对照剖面图的坡地和白垩岩层。'],
 'central-map':['assets/s7-central-map.webp',1250,707,'中央产区五个地名','桑塞尔与普依–芙美隔卢瓦尔河相望，默讷图–萨隆在桑塞尔西南，坎西和勒伊靠近谢尔河一带。'],
 'pouilly-fume-bottle':['assets/s7-pouilly-fume-bottle-supplied.png',353,566,'普依–芙美酒瓶上的燧石图案','瓶身的燧石图案呼应烟熏和打火石的品鉴联想。复习时分别记住当地的土壤与杯中的风味。']
};

const s7ImageGroups = {
 'loire-grapes':['卢瓦尔河谷四个代表品种',['loire-melon','loire-chenin','loire-sauvignon','loire-cabernet-franc']],
 'sauvignon-photos':['桑塞尔与普依–芙美',['sancerre-soil','pouilly-fume-bottle']],
 'alsace-grapes':['阿尔萨斯贵族品种图组',['riesling-grapes','gewurztraminer-grapes','pinot-gris-grapes','muscat-grapes']],
 'alsace-labels':['阿尔萨斯酒标实物',['hugel-pinot-gris','hugel-gentil','schlossberg','sommerberg-sgn']],
 'vouvray-cellars':['武弗雷的石灰岩与洞窖',['vouvray-cliff','tuffeau-cellar']],
 'anjou-chenin-labels':['安茹白诗南的干型与甜型酒标',['savennieres-label','quarts-chaume-label']],
 'loire-rose-examples':['桃红酒的压榨与酒标',['rose-press','cabernet-anjou-label']]
};

const s7LoireAreas = [
 ['波尔多',107748], ['罗讷河谷',64467], ['卢瓦尔河谷',47475], ['朗格多克',33000],
 ['勃艮第',32301], ['阿尔萨斯',15529], ['博若莱',13500]
];

const s7TextbookPhotos = {
 'alsace-slope':['assets/s7-alsace-slope.jpg','图 17.2 · 特级园全景',741,395,'地形的坡度和朝向会影响葡萄园截获的阳光。'],
 'sancerre-soil':['assets/s7-sancerre-soil.jpg','图 18.2 · 桑塞尔葡萄园',748,343,'前景是排水良好的多石土，背景地块已经清理，准备重栽。']
};

const s7Diagrams = {
 alsace: {
  title:'阿尔萨斯双语地图',
  directions:'北 → 南 · 葡萄园带',
  cells:[
   ['斯特拉斯堡','Strasbourg','北端主要城市'],
   ['塞莱斯塔','Sélestat','北段与中段之间'],
   ['科尔马','Colmar','中南段主要城市'],
   ['米卢斯','Mulhouse','南端主要城市']
  ],
  profile:[['西风','Westerlies','湿空气从西侧抬升降雨'],['孚日山','Vosges Mountains','迎风降雨，东坡形成雨影'],['东麓葡萄园','Vineyard slopes','阳光与坡面朝向有利成熟'],['阿尔萨斯平原','Alsace Plain','坡脚往东延至莱茵河 Rhine']],
  caption:'城市沿产区由北到南排列，雨影示意从西向东横切孚日山、东麓与平原。法国东北部的莱茵河对岸是德国。'
 },
 loire: {
  title:'卢瓦尔河谷双语地图',
  directions:'西 · 大西洋 ← 卢瓦尔河流向 ← 内陆 · 东',
  regions:[
   ['南特','Nantais','Nantes 南特',[['白','Muscadet · 密斯卡岱'],['白','Muscadet Sèvre et Maine · 塞夫勒–曼恩']]],
   ['安茹–索米尔','Anjou-Saumur','Angers 昂热 · Saumur 索米尔',[['白','Savennières · 萨维涅尔'],['白','Coteaux du Layon · 莱昂丘'],['红','Saumur-Champigny · 索米尔–尚皮尼'],['桃红','Rosé d’Anjou · 安茹桃红'],['起泡','Saumur · 索米尔']]],
   ['图赖讷','Touraine','Tours 图尔',[['白','Vouvray · 武弗雷'],['红','Chinon · 希侬'],['红','Bourgueil · 布尔格伊'],['白','Sauvignon de Touraine · 图赖讷长相思']]],
   ['中央产区','Central Vineyards','Orléans 奥尔良以南 · Nevers 讷韦尔附近',[['白','Pouilly-Fumé · 普依–芙美'],['白／红／桃红','Sancerre · 桑塞尔'],['白／红／桃红','Menetou-Salon · 默讷图–萨隆'],['白','Quincy · 坎西'],['白／红／桃红','Reuilly · 勒伊']]]
  ],
  caption:'四区按河谷地理顺序排列，酒色为代表酒款的例子。塞夫勒–曼恩在南特东南，莱昂丘沿安茹南侧支流莱昂河，希侬在图尔西南的维埃纳河一带。图赖讷东段有谢尔河，北侧有卢瓦尔河的支流卢瓦河（Loir）。南特附近可见塞夫勒南特河，波瓦第尔（Poitiers）位于葡萄园带南侧。'
 },
 white: {
  title:'阿尔萨斯白葡萄酒酿造选择',
  cells:[['分拣与破碎','Sorting & crushing','按果况选果，可按需要进行短时果皮接触。'],
   ['取汁与澄清','Pressing & clarification','分取压榨汁或自流汁，澄清后发酵。'],
   ['酒精发酵','Alcoholic fermentation','用控温钢罐或传统大旧桶，按目标控制残糖。'],
   ['发酵后','Post-fermentation','离开粗酒泥，视风格选择 MLC 和混合，以惰性容器、橡木或细酒泥熟化。']],
  caption:'按讲义工艺图重绘。干甜看原料成熟度与残糖，价位考虑选果、低出汁率、容器与熟化投入。'
 },
 chenin: {
  title:'白诗南分批采收与风格',
  cells:[['较早采收','Earlier pick','高酸、潜在酒精度约 10–11% → 起泡基酒'],
   ['成熟果','Ripe grapes','成熟果味与平衡的酸 → 干型静止酒'],
   ['更成熟的果','Riper grapes','糖分更高 → 可做半甜酒'],
   ['风干或贵腐','Passerillage or noble rot','进一步浓缩 → 可做甜型酒']],
  caption:'成熟度示意。一个果串也可能熟度不均。采收时分批筛选，酿造时再按目标决定残糖。'
 },
 vouvray: {
  title:'武弗雷坡地剖面与洞窖',
  cells:[['高原表层','Plateau','高原粉砂、砂砾，Bournais 等表土'],
   ['坡面','Slope','Perruches 等表土随地势变化，剖面标示约 20 米的燧石砂与黏土层'],
   ['白垩带','Turonian chalk','上部黄色白垩，下部含云母白垩，图示合计约 90 米。tuffeau 岩层可开凿为洞窖'],
   ['较低地层','Cenomanian marl','塞诺曼阶泥灰岩，河岸可见近代冲积物']],
  caption:'参照讲义照片 43 概括剖面。地表土壤随坡位变化，白垩岩体与洞窖提供理解当地传统法起泡熟化的线索。'
 },
 'sur-lie': {
  title:'密斯卡岱酒泥熟化',
  cells:[['白瓜干白','Melon dry white','用中性容器发酵，保留轻盈、高酸与青果。'],
   ['细酒泥越冬','Winter on fine lees','接触细酒泥，口感更圆润。'],
   ['次年装瓶','Bottling the following year','少搬动保留新鲜感，成酒通常没有明显酵母香。']],
  caption:'按课本的典型流程示意。Sur Lie 的酒标使用还受对应产区规范约束。'
 },
 red: {
  title:'卢瓦尔红葡萄酒酿造选择',
  cells:[['选果与入罐','Sorting & crushing','分拣，决定去梗或保留部分整串、破碎及发酵前浸渍。'],
   ['酒精发酵','Alcoholic fermentation','调节温度、酵母与萃取，按目标选择发酵后浸渍。'],
   ['分取与转化','Free run, press & MLC','分取自流酒与压榨酒，按风格与规范安排 MLC。'],
   ['混合与熟化','Blending & maturation','可在熟化前或后混合，按目标选惰性容器、橡木或酒泥。']],
  caption:'按讲义照片 46 重绘。轻盈果味型一般少萃取，原料成熟且希望更强结构时可增加萃取与熟化投入。'
 }
};

function s7DiagramCells(cells, className='s7-diagram-cells') {
 return `<ol class="${className}">${cells.map(([zh,en,detail])=>
  `<li><strong>${wmEscape(zh)}</strong><small lang="en">${wmEscape(en)}</small><span>${wmEscape(detail)}</span></li>`
 ).join('')}</ol>`;
}

function s7RegionCells(regions) {
 return `<ol class="s7-diagram-cells s7-region-cells">${regions.map(([zh,en,city,wines])=>
  `<li><strong>${wmEscape(zh)}</strong><small lang="en">${wmEscape(en)}</small><span>${wmEscape(city)}</span>
  <ul>${wines.map(([color,name])=>`<li><b data-color="${wmEscape(color)}">${wmEscape(color)}</b> ${wmEscape(name)}</li>`).join('')}</ul></li>`
 ).join('')}</ol>`;
}

function s7Figure(id) {
 const group=s7ImageGroups[id];
 if(group){
  const [title,images]=group;
  return `<section class="s7-image-group" id="s7-${id}" aria-labelledby="s7-${id}-title"><h3 id="s7-${id}-title">${wmEscape(title)}</h3><div class="s7-image-grid">${images.map(s7Figure).join('')}</div></section>`;
 }
 const detail=s7DetailImages[id];
 if(detail){
  const [src,width,height,title,caption,originalName]=detail;
  return s7DetailImage(id,src,title,width,height,caption,originalName);
 }
 if(id==='alsace-textbook-map')return `<aside class="s7-figure s7-figure-pending" id="s7-alsace-textbook-map"><strong>图 17.1 · 阿尔萨斯地图</strong><p>待补课本第 17 章首页。可先看<a href="#read/17/terroir/s7-alsace">阿尔萨斯双语地图 →</a></p></aside>`;
 if(id==='loire-area')return `<figure class="s7-figure" id="s7-loire-area"><h3>法国七个产区的 AOP 面积</h3><ul class="s7-area-bars">${s7LoireAreas.map(([name,area])=>`<li><span>${name}</span><span aria-hidden="true" class="s7-area-bar"><span style="width:${100*area/s7LoireAreas[0][1]}%"></span></span><span>${area.toLocaleString('en-US')} 公顷</span></li>`).join('')}</ul><figcaption>按讲义图所列七个产区比较，统计年份未注明。</figcaption></figure>`;
 const photo=s7Photos[id];
 if(photo){
  const [src,title,width,height,caption]=photo;
  const original=s7TextbookPhotos[id];
  const reference=original?`<details class="s7-map-detail"><summary>对照课本原图</summary>${s7DetailImage(`${id}-original`,...original)}</details>`:'';
  return `<figure class="s5-figure s7-figure" id="s7-${id}"><h3>${title}</h3><img src="${src}" alt="${title}" width="${width}" height="${height}" loading="lazy">${reference}<figcaption>${caption}</figcaption></figure>`;
 }
 const {title,directions,cells,regions,profile,caption}=s7Diagrams[id];
 const image=s7DiagramImages[id];
 const map=image?`<a class="s7-map-image" href="${image[0]}" target="_blank" rel="noopener"><img src="${image[0]}" width="${image[1]}" height="${image[2]}" alt="${image[3]}" loading="lazy"><span>查看大图 ↗</span></a>`:'';
 return `<figure class="s7-figure s7-diagram" id="s7-${id}"><h3>${wmEscape(title)}</h3>
  ${map}
  ${directions?`<div class="s7-map-direction">${wmEscape(directions)}</div>`:''}
  ${regions?s7RegionCells(regions):s7DiagramCells(cells,id==='sur-lie'?'s7-lees-flow':undefined)}
  ${profile?`<h4>从西往东看雨影</h4>${s7DiagramCells(profile)}`:''}
  ${id==='loire'?`<details class="s7-map-detail"><summary>查看图 18.1 重绘版</summary>${s7Figure('loire-textbook-map')}</details>`:''}
  <figcaption>${wmEscape(caption)}</figcaption></figure>`;
}

function s7DetailImage(id,src,title,width,height,caption,originalName) {
 return `<figure class="s7-figure s7-detail-figure" id="s7-${id}"><h3>${wmEscape(title)}${originalName?`<small lang="fr">${wmEscape(originalName)}</small>`:''}</h3><a class="textbook-original-link" href="${src}" target="_blank" rel="noopener" aria-label="放大查看${wmEscape(title)}"><img src="${src}" width="${width}" height="${height}" alt="${wmEscape(title)}" loading="lazy"></a><figcaption>${wmEscape(caption)}</figcaption></figure>`;
}

function s7PlaceNames(label) {
 return label.split('、').map(name=>{
  const [zh,...fr]=name.trim().split(' ');
  return `<span class="s7-place-name">${wmEscape(zh)}${fr.length?`<small lang="fr">${wmEscape(fr.join(' '))}</small>`:''}</span>`;
 }).join('');
}

function s7UnitBody(u) {
 return `<p class="wm-orientation">${wmEscape(u.intro)}</p>`+u.sections.map((s,i)=>{
  const heading=`book-${u.chapter}-${u.id}-${i+1}`;
  const rowHeading=heading==='book-18-reds-1'?s7PlaceNames:undefined;
  return `<section class="article-section wm-content-section"><h2 id="${heading}">${wmEscape(s.title)}</h2>
  ${s.items.map(item=>item.table?wmTable(item.table,rowHeading):item.figure?s7Figure(item.figure):`<p>${wmEscape(item.text)}</p>`).join('')}</section>`;
 }).join('');
}

for (const chapter of regionsSession7.chapters) bookChapters.push({...chapter,framework:false});
for (const u of regionsSession7.units) {
 bookUnits.push({...u,framework:false,origins:[],body:s7UnitBody(u)});
 const route=`${u.chapter}/${u.id}`, href=`#read/${route}`;
 const kinds=[['explain','解释机制'],['compare','比较区别'],['apply','应用到情境']];
 knowledgeTopics.push({
  id:`s7:${u.id}`,chapter:u.chapter,chapters:[u.chapter],stage:'wine',title:u.title,summary:u.desc,
  bookUnits:[route],href,requires:[],quiz:[],
  checks:regionsSession7.checks[route].map(([question,hint,section],i)=>({
   id:kinds[i][0],label:kinds[i][1],question,hint,href:`${href}/book-${u.chapter}-${u.id}-${section}`
  }))
 });
}
bookUnits.sort((a,b)=>a.chapter-b.chapter);
Object.assign(knowledgeFuture.find(f=>f.id==='regions'),{
 added:true,status:'六个法国产区专章已收录',
 summary:'第 13–18 章从波尔多到卢瓦尔河谷，按环境、品种和工艺解释风格、品质与成本。'
});

const s7PreviousReview=bookReviewView;
bookReviewView=function(id) {
 const chapter=regionsSession7.chapters.find(ch=>ch.id===Number(id));
 if(!chapter)return s7PreviousReview(id);
 const rows=list=>list.filter(([, ,...routes])=>routes.some(r=>r.startsWith(chapter.id+'/'))).map(([source,detail,...routes])=>
  `<tr><th scope="row">${wmEscape(source)}</th><td>${wmEscape(detail)}</td><td>${routes.map(r=>{
   const [number,slug,anchor]=r.split('/');
   const unit=bookUnits.find(u=>u.chapter===Number(number)&&u.id===slug);
   return `<a href="#read/${r}">${wmEscape(unit.title)}${anchor?' · 对应段落':''} →</a>`;
  }).join('<br>')}</td></tr>`
 ).join('');
 const table=list=>`<div class="comparison-wrap"><table class="comparison wm-review-table"><thead><tr><th scope="col">来源</th><th scope="col">核对内容</th><th scope="col">正文去向</th></tr></thead><tbody>${rows(list)}</tbody></table></div>`;
 return `<main id="main" class="wrap book-review wm-review"><a class="back" href="#chapter/${chapter.id}">← 第 ${chapter.id} 章</a>
  <header class="page-intro"><div class="eyebrow">CHAPTER ${chapter.id} · SOURCE RECORD</div><h1 class="page-title">资料与配图核对记录</h1><p>${chapter.title} · 第七课</p></header>
  <section><h2>逐页核对</h2><p>收到课本照片 47–56 共 10 张、讲义照片 24–46 共 23 张，以及两份 11 月 8 日 Word 转写。</p>
  ${chapter.id===17?'<p>课本 p.131 从半句开始。第 17 章首页（上一页，含图 17.1）待补，正文已留<a href="#read/17/terroir/s7-alsace-textbook-map">图 17.1 的位置 →</a>。</p>':''}
  ${table(regionsSession7.pages)}</section>
  <section><h2>课堂转写</h2><p>两份 Word 只含转写文字。第二份开头有多处识别失真，清楚的段落已按主题归入正文。</p>${table(regionsSession7.transcripts)}</section>
  <section><h2>练习册与版本</h2><p>第七课作业为机构练习册第 12–13 页，原题页待提供。可先使用<a href="#map/chapter/${chapter.id}">本站自编自查 →</a></p>
  ${chapter.id===17?'<p>讲义的法定品种表以四个白葡萄贵族品种为主。特级园白酒例外、指定特级园红酒与 Crémant 的品种规则见<a href="#read/17/labels/book-17-labels-2">品种速查 →</a>。统计数据保留讲义口径。</p>':'<p>尚皮尼的 85% 品丽珠按成酒配比理解，武弗雷的 5% Orbois 按种植比例理解。Rosé de Loire 的 30% Cabernet 是讲义口径，2026 年核准规范的成酒混合条款无该统一比例。通用 Touraine 干白以长相思为主。各处正文已注明。</p>'}
  <ul>${regionsSession7.references.map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener">${wmEscape(label)} ↗</a></li>`).join('')}</ul></section></main>`;
};

const s7PreviousAudit=fullSourceAuditView;
fullSourceAuditView=function() {
 return s7PreviousAudit().replace('</header>',`<p>第七课逐页记录 · <a href="#review/17">阿尔萨斯 →</a> · <a href="#review/18">卢瓦尔河谷 →</a></p></header>`);
};
