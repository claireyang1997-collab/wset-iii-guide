/* Session 7 chapter rendering and source links. */
const s7Photos = {
 'alsace-slope':['assets/s7-alsace-slope.jpg','阿尔萨斯特级园的坡度与朝向',741,395,'课本图 17.2 局部。村落背后的山坡与坡脚高差明显。坡度和朝向影响截获的阳光，平原则有不同的春霜管理需求。'],
 'alsace-cellar':['assets/s7-alsace-cellar.jpg','阿尔萨斯酒窖的三种容器',525,468,'课本图 17.3 局部。前方的大旧桶、左侧小桶和后方钢罐并存，分别对应传统的中性发酵、部分红酒的用桶选择及现代控温。'],
 'sancerre-soil':['assets/s7-sancerre-soil.jpg','桑塞尔的石质坡地',748,343,'课本图 18.2 局部。前景藤行可见排水良好的多石土，后方翻整地块准备重新栽植。'],
 'savennieres-vines':['assets/s7-savennieres-vines.jpg','萨维涅尔的杯状整形白诗南',806,371,'课本图 18.3 局部。前景为分开的杯状藤体，后方可见不同高度及朝向的坡地。']
};

const s7DiagramImages = {
 alsace:['assets/s7-alsace-map.jpg',449,433,'地图上孚日山脉在西、莱茵河在东，葡萄园带夹在山麓与平原之间'],
 loire:['assets/s7-loire-map.jpg',1069,637,'卢瓦尔河从中央产区流经图赖讷、安茹–索米尔和南特，向西注入大西洋'],
 vouvray:['assets/s7-vouvray-profile.jpg',694,402,'剖面依次显示高原、白垩斜坡、酒窖与河岸冲积土']
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
  caption:'上方地图为讲义局部。城市沿产区由北到南排列，雨影示意从西向东横切孚日山、东麓与平原。法国东北部的莱茵河对岸是德国。'
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
  caption:'上方是讲义地图局部，图下按课本图 18.1 的地理顺序列出四区。酒色为图中酒款的典型例子。塞夫勒–曼恩在南特东南，莱昂丘沿安茹南侧支流莱昂河，希侬在图尔西南的维埃纳河一带。图赖讷东段有谢尔河，北侧有卢瓦尔河的支流卢瓦河（Loir）。南特附近可见塞夫勒南特河，波瓦第尔（Poitiers）位于葡萄园带南侧。'
 },
 'alsace-labels': {
  title:'阿尔萨斯酒标读法',
  cells:[['Alsace','Hugel Pinot Gris','先找产区，再看单品种标示。'],
   ['Gentil','Hugel Gentil','Gentil 指混合酒。'],
   ['Alsace Grand Cru','Schlossberg','地块名指向特级园，连同年份一起读。'],
   ['Sélection de Grains Nobles','Sommerberg','在地块名之外，SGN 说明粒选贵腐。']],
  caption:'按讲义酒标重排关键字段。产区或地块、品种和成熟度术语分别提供不同信息。'
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

function s7DiagramCells(cells) {
 return `<ol class="s7-diagram-cells">${cells.map(([zh,en,detail])=>
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
 const photo=s7Photos[id];
 if(photo){
  const [src,title,width,height,caption]=photo;
  return `<figure class="s5-figure s7-figure" id="s7-${id}"><h3>${title}</h3><img src="${src}" alt="${title}" width="${width}" height="${height}" loading="lazy"><figcaption>${caption}</figcaption></figure>`;
 }
 const {title,directions,cells,regions,profile,caption}=s7Diagrams[id];
 const image=s7DiagramImages[id];
 const map=image?`<a class="s7-map-image" href="${image[0]}" target="_blank" rel="noopener"><img src="${image[0]}" width="${image[1]}" height="${image[2]}" alt="${image[3]}" loading="lazy"><span>查看大图 ↗</span></a>`:'';
 return `<figure class="s7-figure s7-diagram" id="s7-${id}"><h3>${wmEscape(title)}</h3>
  ${map}
  ${directions?`<div class="s7-map-direction">${wmEscape(directions)}</div>`:''}
  ${regions?s7RegionCells(regions):s7DiagramCells(cells)}
  ${profile?`<h4>从西往东看雨影</h4>${s7DiagramCells(profile)}`:''}
  <figcaption>${wmEscape(caption)}</figcaption></figure>`;
}

function s7UnitBody(u) {
 return `<p class="wm-orientation">${wmEscape(u.intro)}</p>`+u.sections.map((s,i)=>
  `<section class="article-section wm-content-section"><h2 id="book-${u.chapter}-${u.id}-${i+1}">${wmEscape(s.title)}</h2>
  ${s.items.map(item=>item.table?wmTable(item.table):item.figure?s7Figure(item.figure):`<p>${wmEscape(item.text)}</p>`).join('')}</section>`
 ).join('');
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
  ${chapter.id===17?'<p>课本照片 47 从半句开始。第 17 章开头（含图 17.1）仍待课本原页，地理导读与雨影图依据讲义整理。</p>':''}
  ${table(regionsSession7.pages)}</section>
  <section><h2>课堂转写</h2><p>两份 Word 只含转写文字。第二份开头有多处识别失真，清楚的段落已按主题归入正文。</p>${table(regionsSession7.transcripts)}</section>
  <section><h2>练习册与版本</h2><p>第七课作业为机构练习册第 12–13 页，原题页待提供。可先使用<a href="#map/chapter/${chapter.id}">本站自编自查 →</a></p>
  ${chapter.id===17?'<p>课堂讲义以四个白葡萄贵族品种为主。现行文本有指定特级园的红酒例外，正文注明了核对版本。统计数据保留讲义口径。</p>':'<p>讲义的桃红 30% Cabernet、尚皮尼 85% 品丽珠，以及图赖讷白品种简表，均按讲义原表登记。用于答题时优先写代表品种与风格。武弗雷的白诗南为主和少量 Orbois 例外已并入正文，查法规比例时注意区分种植比例和成酒配比。</p>'}
  <ul>${regionsSession7.references.map(([label,url])=>`<li><a href="${url}" target="_blank" rel="noopener">${wmEscape(label)} ↗</a></li>`).join('')}</ul></section></main>`;
};

const s7PreviousAudit=fullSourceAuditView;
fullSourceAuditView=function() {
 return s7PreviousAudit().replace('</header>',`<p>第七课逐页记录 · <a href="#review/17">阿尔萨斯 →</a> · <a href="#review/18">卢瓦尔河谷 →</a></p></header>`);
};
