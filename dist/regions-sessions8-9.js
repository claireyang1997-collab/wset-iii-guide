/* Regional chapters from Sessions 8 and 9. */
function sessions89Figure(id) {
 const anchor = `s89-${id}`;
 const group = regionsSessions89.photoGroups[id];
 if (group) return `<div class="s89-figure-pair">${group.map(sessions89Figure).join('')}</div>`;
 const flow = regionsSessions89.flows[id];
 if (flow) {
  const [title, steps, caption] = flow;
  return `<figure class="s7-figure s89-flow" id="${anchor}">
   <h3>${wmEscape(title)}</h3>
   ${s7DiagramCells(steps, 's89-flow-steps')}
   <figcaption>${wmEscape(caption)}</figcaption>
  </figure>`;
 }
 const [src, width, height, title, caption] = regionsSessions89.photos[id];
 return `<figure class="s7-figure s7-detail-figure" id="${anchor}">
  <h3>${wmEscape(title)}</h3>
  <a class="textbook-original-link" href="${src}" target="_blank" rel="noopener" aria-label="放大查看${wmEscape(title)}">
   <img src="${src}" width="${width}" height="${height}" alt="${wmEscape(title)}" loading="lazy">
  </a>
  <figcaption>${wmEscape(caption)}</figcaption>
 </figure>`;
}

function sessions89UnitBody(unit) {
 return `<p class="wm-orientation">${wmEscape(unit.intro)}</p>` + unit.sections.map((section, index) => {
  const heading = `book-${unit.chapter}-${unit.id}-${index + 1}`;
  const rowHeading = label => {
   const isCavaGrapeList = heading === 'book-30-grapes-2' && label.startsWith('马卡贝澳 Macabeo、');
   return heading === 'book-21-appellations-1' || isCavaGrapeList
    ? label.split('、').map(wmEscape).join('<br>')
    : wmEscape(label);
  };
  const content = section.items.map(item => {
   if (item.table) return wmTable(item.table, rowHeading);
   if (item.figure) return sessions89Figure(item.figure);
   return `<p>${wmEscape(item.text)}</p>`;
  }).join('');
  return `<section class="article-section wm-content-section s89-content-section">
   <h2 id="${heading}">${wmEscape(section.title)}</h2>
   ${content}
  </section>`;
 }).join('');
}

for (const chapter of regionsSessions89.chapters) bookChapters.push({...chapter, framework:false});
for (const unit of regionsSessions89.units) {
 bookUnits.push({...unit, framework:false, origins:[], body:sessions89UnitBody(unit)});
 const route = `${unit.chapter}/${unit.id}`;
 const href = `#read/${route}`;
 const checks = [['explain','解释机制'], ['compare','比较区别'], ['apply','应用到情境']];
 knowledgeTopics.push({
  id:`s89:${route}`, chapter:unit.chapter, chapters:[unit.chapter], stage:'wine',
  title:unit.title, summary:unit.desc, bookUnits:[route], href, requires:[], quiz:[],
  checks:regionsSessions89.checks[route].map(([question, hint, section], i) => ({
   id:checks[i][0], label:checks[i][1], question, hint, href:`${href}/book-${unit.chapter}-${unit.id}-${section}`
  }))
 });
}
Object.assign(knowledgeFuture.find(item => item.id === 'regions'), {
 added:true, status:'法国与西班牙专章已收录',
 summary:'第 13–21 章覆盖法国主要产区，第 30 章按六个地理区域说明西班牙的风格、品质与价格。'
});

function sessions89ReviewTable(records, chapter) {
 const rows = records.flatMap(([source, detail, ...routes]) => {
  const links = routes.filter(route => route.startsWith(chapter.id + '/')).map(route => {
   const [, slug, anchor] = route.split('/');
   const unit = bookUnits.find(unit => unit.chapter === chapter.id && unit.id === slug);
   const destination = anchor?.startsWith('s89-') ? ' · 对应图示' : anchor ? ' · 对应小节' : '';
   return `<a href="#read/${route}">${wmEscape(unit.title)}${destination} →</a>`;
  });
  if (!links.length) return [];
  return `<tr><th scope="row">${wmEscape(source)}</th><td>${wmEscape(detail)}</td><td>${links.join('<br>')}</td></tr>`;
 });
 return `<div class="comparison-wrap"><table class="comparison wm-review-table">
  <thead><tr><th scope="col">资料</th><th scope="col">核对内容</th><th scope="col">正文去向</th></tr></thead>
  <tbody>${rows.join('')}</tbody>
 </table></div>`;
}

const earlierBookReview = bookReviewView;
bookReviewView = function(id) {
 const chapter = regionsSessions89.chapters.find(chapter => chapter.id === Number(id));
 if (!chapter) return earlierBookReview(id);
 const references = regionsSessions89.references[id] || [];
 return `<main id="main" class="wrap book-review wm-review"><a class="back" href="#chapter/${id}">← 第 ${id} 章</a>
  <header class="page-intro"><div class="eyebrow">CHAPTER ${id} · SOURCE RECORD</div>
  <h1 class="page-title">资料与配图核对记录</h1><p>${chapter.title} · 第 ${id === '30' ? '9' : '8'} 课</p></header>
  <section><h2>课本逐页</h2>${sessions89ReviewTable(regionsSessions89.pages, chapter)}</section>
  <section><h2>讲义图与知识点</h2>${sessions89ReviewTable(regionsSessions89.handouts, chapter)}</section>
  <section><h2>课堂转写</h2><p>已将 11 月 18 日三份 Word 转写按主题与正文对照。原始音频待提供。</p>${sessions89ReviewTable(regionsSessions89.transcripts, chapter)}</section>
  <section><h2>练习与品鉴</h2><p>第 8、9 课练习册原题页待提供。可先做<a href="#map/chapter/${id}">本站自编自查 →</a></p>
  <p>照片 164 是品鉴词汇表，可到<a href="#tasting">SAT 系统品鉴 →</a>查阅相应术语。</p></section>
  ${references.length ? `<section><h2>产区规则与数据</h2><ul>${references.map(([label,url]) =>
   `<li><a href="${url}" target="_blank" rel="noopener">${wmEscape(label)} ↗</a></li>`
  ).join('')}</ul></section>` : ''}
 </main>`;
};

const earlierSourceAudit = fullSourceAuditView;
fullSourceAuditView = function() {
 const links = regionsSessions89.chapters.map(chapter =>
  `<a href="#review/${chapter.id}">${wmEscape(chapter.title)} →</a>`
 ).join(' · ');
 return earlierSourceAudit().replace('</header>', `<p>第 8、9 课逐页记录 · ${links}</p></header>`);
};
