/* This table records reviewed learning conclusions, separate from the lesson. */
function bookLogicReviewView(chapter){
 const rows=bookLogicReview.units.filter(u=>u.chapter===Number(chapter));
 if(!rows.length)return '';
 const changed=rows.filter(u=>u.disposition==='已修订').length;
 return `<section class="logic-review" id="logic-review-${chapter}"><h2>本轮逻辑核对 · ${bookLogicReview.date}</h2><p>本章逐单元核对 ${rows.length} 个主题，修订 ${changed} 个。下表列出读完应能得出的结论；具体条件与实例仍在正文。</p><details class="review-fold" open><summary>主题结论与本次处理</summary><div class="comparison-wrap"><table class="comparison logic-review-table"><thead><tr><th scope="col">阅读单元</th><th scope="col">应能得出的判断</th><th scope="col">本次处理</th></tr></thead><tbody>${rows.map(u=>`<tr><th scope="row"><a href="#read/${u.route}">${u.title} →</a><small>${u.pages.startsWith('讲义')?u.pages:'课本 p.'+u.pages}</small></th><td>${u.answer}</td><td><strong>${u.disposition}</strong><p>${u.note}</p></td></tr>`).join('')}</tbody></table></div></details><details class="review-fold"><summary>核对方法、边界与延伸依据</summary><p>${bookLogicReview.method}</p><p>${bookLogicReview.limitations}</p><ul>${bookLogicReview.sources.map(s=>`<li><a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a></li>`).join('')}</ul></details></section>`;
}
const bookReviewBeforeLogic=bookReviewView;
bookReviewView=function(id){
 const html=bookReviewBeforeLogic(id).replace('更新 '+bookReview.date,'此前资料核对 '+bookReview.date),panel=bookLogicReviewView(id);
 return Number(id)>=7?html.replace('<div class="wm-review-status">',panel+'<div class="wm-review-status">'):
 html.replace('<section><h2>本章检查结果</h2>',panel+'<section><h2>此前资料与配图整理</h2>');
};
