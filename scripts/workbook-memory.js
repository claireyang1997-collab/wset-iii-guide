/* Self-study memory aids. Original questions, marks, fields and saving remain untouched. */
function workbookMemoryItems(session){const g=workbookMemoryData.groups.find(g=>g.session===Number(session));return g?g.items.map(id=>workbookMemoryData.items.find(t=>t.id===id)):[];}
function workbookMemoryLinks(session,id){
 const items=workbookMemoryItems(session).filter(t=>t.questions.includes(`${session}/${id}`));
 return items.length?`<p class="wb-memory-question-links"><strong>本题答案重点：</strong>${items.map(t=>`<a href="#workbook/${session}/wb-memory-${session}-${t.id}">${safe(t.zh)} →</a>`).join(' ')}</p>`:'';
}
const workbookQuestionBeforeMemory=workbookQuestion;
workbookQuestion=function(q,i){return workbookQuestionBeforeMemory(q,i).replace('</details></section>',workbookMemoryLinks(q[0],q[1])+'</details></section>');};
const winemakingWorkbookQuestionBeforeMemory=winemakingWorkbookQuestion;
winemakingWorkbookQuestion=function(q,i){return winemakingWorkbookQuestionBeforeMemory(q,i).replace('</details></section>',workbookMemoryLinks(q.session,q.id)+'</details></section>');};
function workbookMemoryPanel(session){
 const items=workbookMemoryItems(session);if(!items.length)return '';
 const open=location.hash.startsWith(`#workbook/${session}/wb-memory-`)?' open':'';
 return `<details class="wb-memory" id="wb-memory-${session}"${open}><summary><span><strong>本课答案重点速记</strong><small>展开复习 · ${items.length} 个要点</small></span></summary><div class="wb-memory-body"><p class="wb-memory-intro">按 <strong>措施／条件 → 作用机制 → 风格、品质或成本</strong> 记忆。只写技术名称通常不够；作答时根据题目要求展开。</p><p class="fine">自查整理，非机构标准答案或逐分评分表。</p><table class="wb-memory-table"><thead><tr><th scope="col">技术／措施</th><th scope="col">为什么</th><th scope="col">结果与适用条件</th></tr></thead><tbody>${items.map(t=>`<tr id="wb-memory-${session}-${t.id}"><th scope="row"><strong>${safe(t.zh)}</strong><span lang="en">${safe(t.en)}</span><small>${safe(t.cue)}</small></th><td data-label="作用机制">${safe(t.cause)}</td><td data-label="结果与条件"><p>${safe(t.result)}</p><p class="wb-memory-limit">${safe(t.limit)}</p><a href="${t.href}">回看知识正文 →</a></td></tr>`).join('')}</tbody></table>${[2,6].includes(Number(session))?'<aside class="wb-memory-example"><strong>把关键词写成因果链</strong><p>选择性人工采收 → 只选达到合适贵腐程度的葡萄 → 原料更符合优质甜酒目标；失水和严格挑选使可用汁液减少，多轮采收增加人工成本。</p><p lang="en">Selective hand harvesting → only suitably botrytised grapes are picked → better-suited fruit for quality sweet wine; lower usable yields and higher production costs.</p></aside>':''}</div></details>`;
}
const workbookViewBeforeMemory=workbookView;
workbookView=function(which){
 const session=Number(which)||1;
 const index=`<nav class="wb-memory-index" aria-label="练习册重点速记"><strong>重点速记</strong>${workbookMemoryData.groups.map(g=>`<a href="#workbook/${g.session}/wb-memory-${g.session}"${session===g.session?' aria-current="page"':''}>第${g.session}课 · ${safe(g.title)}</a>`).join('')}</nav>`;
 return workbookViewBeforeMemory(which).replace('</aside>','</aside>'+index+workbookMemoryPanel(session));
};
