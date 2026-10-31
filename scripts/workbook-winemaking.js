/* Supplied original assignments: separate from self-authored map checks. */
const legacyWorkbookView=workbookView,legacyBindWorkbook=bindWorkbook;
function winemakingWorkbookSession(id){return winemakingWorkbook.sessions.find(s=>s.id===Number(id));}
function winemakingWorkbookFields(q){return q.rows?q.rows.flatMap(r=>r.fields):q.fields;}
function winemakingWorkbookKey(q,f){return `s${q.session}-${q.id}-${f.id}`;}
function saveWinemakingWorkbookQuestion(session,id,values){
 const q=winemakingWorkbook.questions.find(q=>q.session===Number(session)&&q.id===id);
 if(!q||!Array.isArray(values)||values.length!==winemakingWorkbookFields(q).length||values.some(v=>typeof v!=='string'))return false;
 const fields=winemakingWorkbookFields(q);for(let i=0;i<fields.length;i++)if(!save(notesKey('workbook-'+winemakingWorkbookKey(q,fields[i])),values[i]))return false;
 return true;
}
function winemakingWorkbookField(q,f){return workbookField(winemakingWorkbookKey(q,f),`${f.zh} · ${f.en}`).replace(' data-note=',' data-workbook-note data-note=').replace('<textarea', (f.note?`<small class="wm-wb-cell-note">${safe(f.note)}</small>`:'')+'<textarea');}
function winemakingWorkbookQuestion(q,i){
 const fields=winemakingWorkbookFields(q),filled=fields.filter(f=>String(read(notesKey('workbook-'+winemakingWorkbookKey(q,f)), '')).trim()).length;
 const grid=fs=>`<div class="wm-wb-fields ${fs.length===3?'wm-wb-three':fs.length===2?'wm-wb-two':''}">${fs.map(f=>`<div>${winemakingWorkbookField(q,f)}</div>`).join('')}</div>`;
 const body=q.rows?q.rows.map(row=>`<fieldset class="wm-wb-row"><legend>${safe(row.title)} <span>${row.marks} 分 / ${row.marks} ${row.marks===1?'mark':'marks'}</span></legend>${grid(row.fields)}</fieldset>`).join(''):grid(fields);
 return `<section id="wbq-s${q.session}-${q.id}" class="quiz-card wb-question wm-wb-question" data-wm-workbook="${q.session}/${q.id}"><div class="eyebrow">QUESTION ${i+1} · ${q.marks} 分 / MARKS · 练习册 p.${winemakingWorkbookSession(q.session).page}</div><h2>${safe(q.zh)}</h2><p class="wb-english" lang="en">${safe(q.en)}</p>${q.context?`<p class="wm-wb-context">${safe(q.context)}</p>`:''}${q.marksNote?`<p class="fine">${safe(q.marksNote)}</p>`:''}<details class="wm-wb-answer"><summary><strong>展开作答</strong><span data-wm-wb-count>已填 ${filled} / ${fields.length} 栏</span></summary><div class="wm-wb-answer-body">${body}<div class="wm-wb-save"><button type="button" class="primary" data-wm-wb-save>保存本题</button><p data-wm-wb-status role="status">${filled?'已恢复当前浏览器中的作答。':'填写后自动保存，也可点击“保存本题”。'}</p></div></div></details><details class="recall"><summary>复习提示 · 自编，非机构答案</summary><p>${safe(q.hint)}</p><div class="wm-wb-refs">${q.refs.map(r=>`<a href="${r.href}">回看「${safe(r.label)}」 ↗</a>`).join('')}</div></details></section>`;
}
workbookView=function(which){
 const s=winemakingWorkbookSession(which);if(!s)return legacyWorkbookView(which);
 const qs=winemakingWorkbook.questions.filter(q=>q.session===s.id);
 return `<main id="main" class="wrap wb-page wm-wb-page"><div class="page-intro"><a class="back" href="#practice">← 全部课程练习</a><div class="eyebrow">WORKBOOK / SESSION ${s.id} · PAGE ${s.page}</div><h1 class="page-title">${s.label} · 练习册</h1><p>${s.title} · 原练习册第 ${s.page} 页 · ${qs.length} 道题 · 共 ${s.marks} 分</p><nav class="wb-tabs" aria-label="酿造课程练习册">${winemakingWorkbook.sessions.map(t=>`<a href="#workbook/${t.id}" ${t.id===s.id?'aria-current="page"':''}>${t.label} · 第 ${t.page} 页</a>`).join('')}</nav><div class="wm-wb-refs">${s.chapters.map(ch=>`<a href="#chapter/${ch}">回看第 ${ch} 章 →</a>`).join('')}</div></div><aside class="callout"><strong>原题作答</strong><p>按提供的照片保留中英文题干、原表分项与分值。先独立作答，再看自编提示；尚未收到机构参考答案，不自动评分。</p><small>作答自动保存在当前浏览器，不跨设备同步。每题可展开、收起及手动保存；保存失败会在该题下提示。</small></aside><nav class="wm-wb-question-nav" aria-label="本课题目">${qs.map((q,i)=>`<a href="#workbook/${s.id}/wbq-s${s.id}-${q.id}">第 ${i+1} 题 · ${q.marks} 分</a>`).join('')}</nav>${qs.map(winemakingWorkbookQuestion).join('')}</main>`;
};
bindWorkbook=function(){
 legacyBindWorkbook();
 for(const section of document.querySelectorAll('[data-wm-workbook]')){
  const [session,id]=section.dataset.wmWorkbook.split('/'),q=winemakingWorkbook.questions.find(q=>q.session===Number(session)&&q.id===id),inputs=[...section.querySelectorAll('[data-workbook-note]')];
  if(!q)continue;
  const persist=manual=>{const values=inputs.map(x=>x.value),ok=saveWinemakingWorkbookQuestion(session,id,values),status=section.querySelector('[data-wm-wb-status]');status.dataset.state=ok?'saved':'error';status.textContent=ok?(manual?'本题已保存。':'已自动保存。'):'保存失败，当前输入仍在；请复制备份或点击“保存本题”重试。';section.querySelector('[data-wm-wb-count]').textContent=`已填 ${values.filter(v=>v.trim()).length} / ${values.length} 栏`;return ok;};
  for(const input of inputs)input.addEventListener('input',()=>persist(false));
  section.querySelector('[data-wm-wb-save]').addEventListener('click',()=>persist(true));
 }
};
function winemakingWorkbookHub(){return `<section class="wm-wb-hub"><div class="hub-section-head"><h2>第三、四课 · 原练习册</h2><span>第 5、6 页已收录</span></div><div class="practice-courses">${winemakingWorkbook.sessions.map(s=>`<article class="practice-course"><div class="eyebrow">SESSION 0${s.id} · WORKBOOK p.${s.page}</div><h3>${s.title}</h3><p>${s.label} · ${winemakingWorkbook.questions.filter(q=>q.session===s.id).length} 道原题 · ${s.marks} 分</p><p class="fine">${s.id===3?'葡萄醪调节、培养酵母、旧橡木桶与甜酒对比':'桃红工艺、新橡木桶、MLC 与霞多丽工艺'}</p><a class="primary" href="#workbook/${s.id}">打开${s.label}练习册 →</a></article>`).join('')}</div><p class="fine">原题按照片转录，复习提示为自编；与下方知识地图自查分别使用。</p></section>`;}
