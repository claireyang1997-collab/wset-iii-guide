/* Detailed material studies retain the original explanatory notes as HTML. */
function wmMaterialFigure(d){
 if(d.type==='filtration')return wmElegantFiltrationFigure(d);
 const filtration=d.type==='filtration';
 const panels=filtration?[
  {label:'深层过滤',image:'assets/filtration-depth-study-v3.svg',alt:'厚滤材局部剖面：交织纤维内，颗粒截留在不同深度；酒液由左向右流动。',notes:['较厚、多孔的介质','颗粒截留在介质内部']},
  {label:'表面过滤',image:'assets/filtration-surface-study-v3.svg',alt:'薄膜局部剖面：酒液穿过微孔，颗粒停留在左侧上游表面。',notes:['细膜孔径形成屏障','微小颗粒留在上游表面']}
 ]:[
  {label:'天然软木塞',image:'assets/closure-natural-study-v3.svg',alt:'天然软木塞的立体材质图，显示整块软木的顶面、不规则纹理和皮孔。',notes:['整块软木；个体透氧有差异','需控制TCA污染']},
  {label:'技术软木塞',image:'assets/closure-technical-study-v3.svg',alt:'技术软木塞的立体材质图，显示不规则大小的软木颗粒。',notes:['处理后的软木颗粒等构成','性能取决于等级及工艺']},
  {label:'合成塞',image:'assets/closure-synthetic-study-v3.svg',alt:'合成塞的立体材质图，显示圆柱表面与浅色材料截面。',notes:['石化或植物来源材料','按隔氧表现与饮用期选择']},
  {label:'螺旋盖',image:'assets/closure-screwcap-study-v3.svg',alt:'螺旋盖分解示意：压纹金属盖、独立内衬和带螺纹的玻璃瓶口沿同一轴线对应。内衬控制透氧。',notes:['金属盖＋内衬','可再封，也适合高品质酒']}
 ];
 const caption=filtration?'图中箭头为酒液方向。课本还展示滤芯及金属外壳、旋转滚筒和板框式过滤设备；过滤方法不能只凭机器外形判断。':'外形只帮助辨认类型；保存表现要结合具体材料、内衬、装瓶与储存条件。';
 return `<figure id="wmfig-${wmEscape(d.id||d.type)}" class="wm-plate wm-material-plate" data-wm-figure="${wmEscape(d.type)}"><div class="wm-plate-title">${wmEscape(d.title||(filtration?'过滤机制示意 · 深层与表面过滤':'封口材料与保存表现示意'))}</div><div class="wm-material-grid">${panels.map(p=>`<section class="wm-material-panel"><h3>${wmEscape(p.label)}</h3><a class="wm-material-image" href="${p.image}" target="_blank" rel="noopener" aria-label="查看${wmEscape(p.label)}大图"><img src="${p.image}" width="600" height="500" alt="${wmEscape(p.alt)}" loading="lazy" decoding="async"></a><ul>${p.notes.map(t=>`<li>${wmEscape(t)}</li>`).join('')}</ul></section>`).join('')}</div><p class="wm-material-key">${filtration?'蓝色箭头：酒液方向；酒红色颗粒：被截留物。滤材与微孔为概念放大，尺寸不按比例。':'材质细节用于辨认类型；螺旋盖以分解图展示金属盖、内衬和瓶口。内衬控制透氧，具体结构随产品而异。'}</p><figcaption>${wmEscape(d.caption||caption)}</figcaption></figure>`;
}

function wmElegantFiltrationFigure(d){
 const panels=[
  {number:'01',label:'深层过滤',en:'DEPTH FILTRATION',image:'assets/filtration-depth-elegant-v4.svg',alt:'深层过滤平面剖面：酒液从左向右流动，颗粒留在较厚、多孔的滤材内部的不同深度。',notes:['较厚、多孔的介质','颗粒截留在介质内部']},
  {number:'02',label:'表面过滤',en:'SURFACE FILTRATION',image:'assets/filtration-surface-elegant-v4.svg',alt:'表面过滤平面剖面：酒液从左向右穿过薄膜微孔，颗粒留在膜的左侧上游表面。',notes:['细膜孔径形成屏障','微小颗粒留在上游表面']}
 ];
 return `<figure id="wmfig-${wmEscape(d.id||d.type)}" class="wm-plate wm-material-plate wm-filter-elegant" data-wm-figure="filtration"><div class="wm-plate-title">${wmEscape(d.title||'过滤机制示意 · 深层与表面过滤')}</div><div class="wm-material-grid wm-filter-grid">${panels.map(p=>`<section class="wm-material-panel wm-filter-panel"><h3><span class="wm-filter-number" aria-hidden="true">${p.number}</span><span>${p.label}<small>${p.en}</small></span></h3><a class="wm-material-image" href="${p.image}" target="_blank" rel="noopener" aria-label="查看${p.label}大图"><img src="${p.image}" width="600" height="460" alt="${p.alt}" loading="lazy" decoding="async"></a><ul>${p.notes.map(t=>`<li>${t}</li>`).join('')}</ul></section>`).join('')}</div><p class="wm-material-key"><span class="wm-filter-flow-key">蓝色箭头：酒液方向</span>；<span class="wm-filter-particle-key">酒红色颗粒：被截留物</span>。滤材与微孔为概念放大，尺寸不按比例。</p><figcaption>${wmEscape(d.caption||'图中箭头为酒液方向。课本还展示滤芯及金属外壳、旋转滚筒和板框式过滤设备；过滤方法不能只凭机器外形判断。')}</figcaption></figure>`;
}
