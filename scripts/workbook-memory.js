/* Self-study memory aids. Original questions, marks, fields and saving remain untouched. */
function workbookMemoryItems(session){const g=workbookMemoryData.groups.find(g=>g.session===Number(session));return g?g.items.map(id=>workbookMemoryData.items.find(t=>t.id===id)):[];}
function workbookMemoryTopicNav(session,items){return `<nav class="wb-memory-topics" aria-label="本课速记考点跳转">${items.map(t=>`<a href="#workbook/${session}/wb-memory-${session}-${t.id}">${safe(t.zh)}</a>`).join('')}</nav>`;}
const workbookVarietiesBeforeMemory=workbookVarieties;
workbookVarieties=function(kind){
 const cue=kind==='white'?'甜度 → 酸度 → 酒体 → 香气':'颜色深度 → 酸度 → 单宁 → 香气';
 const tip=kind==='white'?'甜度由残糖决定，不能只凭品种名固定为干或甜。':'颜色深不等于单宁高，要把颜色与口感分开记。';
 return workbookVarietiesBeforeMemory(kind).replace('<div class="wb-variety-tools">',`<aside class="wb-variety-memory" id="wb-variety-memory-${kind}"><strong>四格记忆：${cue}</strong><p>先选产区或典型酒款，再填四格；${tip}先遮住答案回忆，再核对。</p></aside><div class="wb-variety-tools">`);
};
function workbookMemoryAnswer(item){
 if(!item.answerZh)return '';
 return `<aside class="wb-memory-example"><strong>参考作答 · A → B → C</strong><p>${safe(item.answerZh)}</p>${item.answerEn?`<p lang="en">${safe(item.answerEn)}</p>`:''}<p class="fine">${safe(item.source||'根据已提供资料整理，非机构评分表。')}</p><p class="wb-memory-limit">${safe(item.limit)}</p></aside>`;
}
function workbookPriceMethod(session){
 if(![5,6].includes(Number(session))||!workbookMemoryData.priceMethod)return '';
 const m=workbookMemoryData.priceMethod,id=`wb-price-method-${session}`;
 const open=location.hash===`#workbook/${session}/${id}`?' open':'';
 return `<details class="wb-price-method" id="${id}"${open}><summary><strong>${safe(m.title)}</strong><span>答题逻辑图 · 葡萄园 → 酒庄 → 价格、风格、品质</span></summary><div class="wb-price-body"><p>${safe(m.intro)}</p><figure class="wb-price-map" id="wb-price-map-${session}"><div class="wb-price-stages">${m.stages.map((stage,i)=>`<section class="wb-price-stage"><h3><span>0${i+1}</span> ${safe(stage.title)} <small lang="en">${safe(stage.en)}</small></h3><div class="wb-price-steps">${stage.steps.map(step=>`<div class="wb-price-step"><h4>${safe(step.title)}</h4><small>${safe(step.subtitle)}</small><p>${safe(step.text)}</p></div>`).join('')}</div></section><p class="wb-price-bridge"><span aria-hidden="true">↓</span>${safe(stage.bridge)}</p>`).join('')}</div><div class="wb-price-outcomes">${m.outcomes.map(o=>`<section><h3>${safe(o.title)} <small lang="en">${safe(o.en)}</small></h3><p>${safe(o.text)}</p></section>`).join('')}</div><figcaption>${safe(m.caption)}</figcaption></figure><aside class="wb-price-check"><strong>把图变成答案</strong><p>${safe(m.check)}</p></aside><section class="wb-price-example"><h3>${safe(m.exampleTitle)}</h3><p>${safe(m.exampleIntro)}</p><ol>${m.examples.map(e=>`<li><h4>${safe(e.stage)}</h4><p>${safe(e.cause)}</p><p class="wb-price-effect"><span aria-hidden="true">→</span> ${safe(e.effect)}</p></li>`).join('')}</ol><p class="fine">${safe(m.sourceNote)}</p><nav aria-label="价格题知识回看">${m.links.map(l=>`<a href="${l.href}">${safe(l.label)} →</a>`).join('')}</nav></section></div></details>`;
}
function workbookMemoryLinks(session,id){
 const items=workbookMemoryItems(session).filter(t=>t.questions.includes(`${session}/${id}`));
 const method=workbookMemoryData.priceMethod?.questions.includes(`${session}/${id}`)?`<p><a href="#workbook/${session}/wb-price-method-${session}">为什么贵？按葡萄园到酒庄的顺序答 →</a></p>`:'';
 return (items.length?`<p class="wb-memory-question-links"><strong>本题答案重点：</strong>${items.map(t=>`<a href="#workbook/${session}/wb-memory-${session}-${t.id}">${safe(t.zh)} →</a>`).join(' ')}</p>${items.map(workbookMemoryAnswer).join('')}`:'')+method;
}
const workbookQuestionBeforeMemory=workbookQuestion;
workbookQuestion=function(q,i){return workbookQuestionBeforeMemory(q,i).replace('</details></section>',workbookMemoryLinks(q[0],q[1])+'</details></section>');};
const winemakingWorkbookQuestionBeforeMemory=winemakingWorkbookQuestion;
winemakingWorkbookQuestion=function(q,i){return winemakingWorkbookQuestionBeforeMemory(q,i).replace('</details></section>',workbookMemoryLinks(q.session,q.id)+'</details></section>');};
function workbookMemoryPanel(session){
 const items=workbookMemoryItems(session);if(!items.length)return '';
 const open=location.hash.startsWith(`#workbook/${session}/wb-memory-`)?' open':'';
 return `<details class="wb-memory" id="wb-memory-${session}"${open}><summary><span><strong>本课答案重点速记</strong><small>展开复习 · ${items.length} 个要点</small></span></summary><div class="wb-memory-body"><p class="wb-memory-intro">按 <strong>措施／条件 → 作用机制 → 风格、品质或成本</strong> 记忆。只写技术名称通常不够；作答时根据题目要求展开。</p><p class="fine">自查整理，非机构标准答案或逐分评分表。</p>${workbookMemoryTopicNav(session,items)}<table class="wb-memory-table"><thead><tr><th scope="col">考点／措施</th><th scope="col">为什么</th><th scope="col">结果与适用条件</th></tr></thead><tbody>${items.map(t=>`<tr id="wb-memory-${session}-${t.id}"><th scope="row"><strong>${safe(t.zh)}</strong><span lang="en">${safe(t.en)}</span><small>${safe(t.cue)}</small></th><td data-label="作用机制">${safe(t.cause)}</td><td data-label="结果与条件"><p>${safe(t.result)}</p><p class="wb-memory-limit">${safe(t.limit)}</p><a href="${t.href}">回看知识正文 →</a></td></tr>`).join('')}</tbody></table>${[2,6].includes(Number(session))?'<aside class="wb-memory-example"><strong>把关键词写成因果链</strong><p>选择性人工采收 → 只选达到合适贵腐程度的葡萄 → 原料更符合优质甜酒目标；失水和严格挑选使可用汁液减少，多轮采收增加人工成本。</p><p lang="en">Selective hand harvesting → only suitably botrytised grapes are picked → better-suited fruit for quality sweet wine; lower usable yields and higher production costs.</p></aside>':''}</div></details>`;
}
const workbookViewBeforeMemory=workbookView;
workbookView=function(which){
 const session=Number(which)||1;
 const index=`<nav class="wb-memory-index" aria-label="练习册重点速记"><strong>重点速记</strong>${workbookMemoryData.groups.map(g=>`<a href="#workbook/${g.session}/wb-memory-${g.session}"${session===g.session?' aria-current="page"':''}>第${g.session}课 · ${safe(g.title)}</a>`).join('')}</nav>`;
 return workbookViewBeforeMemory(which).replace('</aside>','</aside>'+index+workbookPriceMethod(session)+workbookMemoryPanel(session));
};
