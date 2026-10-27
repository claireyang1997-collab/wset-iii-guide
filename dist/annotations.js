/* Private reading annotations. No network requests; one localStorage key per unit. */
(() => {
 'use strict';
 const prefix = 'wset3-annotations-v1-';
 let root, route, records = [], pending, editing, available = true;
 const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const notice = message => typeof toast === 'function' && toast(message);
 const element = (tag, className) => {const el = document.createElement(tag); el.className = className; return el;};
 const toolbar = element('div', 'annotation-toolbar');
 toolbar.hidden = true;
 toolbar.setAttribute('role', 'group');
 toolbar.setAttribute('aria-label', '选中文字的操作');
 toolbar.innerHTML = '<span>选中文字</span><button type="button" data-action="highlight">高亮</button><button type="button" data-action="comment">添加点评</button><button type="button" data-action="dismiss" aria-label="关闭选中文字操作">×</button>';
 document.body.append(toolbar);
 const editor = element('dialog', 'annotation-dialog');
 editor.setAttribute('aria-labelledby', 'annotation-editor-title');
 editor.innerHTML = '<form><div class="annotation-dialog-head"><h2 id="annotation-editor-title">高亮与点评</h2><button type="button" data-action="cancel" aria-label="关闭点评">×</button></div><blockquote></blockquote><label for="annotation-note">我的点评</label><textarea id="annotation-note" maxlength="5000" placeholder="写下理解、疑问或想补充的内容……"></textarea><p class="annotation-error" role="alert"></p><div class="annotation-actions"><button type="button" data-action="delete-record" hidden>删除高亮与点评</button><button type="button" data-action="delete-comment" hidden>仅删除点评</button><button type="button" data-action="cancel">取消</button><button type="submit" class="primary">保存</button></div></form>';
 document.body.append(editor);
 const list = element('dialog', 'annotation-dialog');
 list.setAttribute('aria-labelledby', 'annotation-list-title');
 list.innerHTML = '<div class="annotation-dialog-head"><h2 id="annotation-list-title">本页高亮与点评</h2><button type="button" aria-label="关闭高亮与点评">×</button></div><div class="annotation-list"></div>';
 document.body.append(list);
 const key = () => prefix + route;
 function loadRecords() {
  try {
   const data = JSON.parse(localStorage.getItem(key()) || '[]');
   if (!Array.isArray(data) || data.some(r => !r || typeof r.id !== 'string' || typeof r.quote !== 'string' || !r.quote || !Number.isInteger(r.start) || r.start < 0 || typeof r.note !== 'string')) throw Error('Invalid annotations');
   available = true; records = data;
  } catch { available = false; records = []; notice('本页批注暂时无法读取，原有记录未改动。'); }
 }
 function persist(next) {
  if (!available) {notice('当前无法保存批注，原有记录未改动。'); return false;}
  try { localStorage.setItem(key(), JSON.stringify(next)); records = next; return true; }
  catch {notice('保存失败，请复制点评备份后重试。'); return false;}
 }
 function textNodes() {
  const nodes = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {acceptNode(node) {
   return node.parentElement.closest('svg,script,style,button,input,textarea,[aria-hidden="true"]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  }});
  let node; while ((node = walker.nextNode())) nodes.push(node);
  return nodes;
 }
 function fullText() {return textNodes().map(n => n.data).join('');}
 // Exact quote plus surrounding context prevents a repeated sentence attaching elsewhere.
 function locate(record, text) {
  if (text.slice(record.start, record.start + record.quote.length) === record.quote &&
      (!record.before || text.slice(Math.max(0, record.start - record.before.length), record.start) === record.before) &&
      (!record.after || text.slice(record.start + record.quote.length, record.start + record.quote.length + record.after.length) === record.after)) return record.start;
  const matches = []; let at = -1;
  while ((at = text.indexOf(record.quote, at + 1)) !== -1) matches.push(at);
  if (matches.length === 1) return matches[0];
  const contextual = matches.filter(at =>
   (!record.before || text.slice(Math.max(0, at - record.before.length), at) === record.before) &&
   (!record.after || text.slice(at + record.quote.length, at + record.quote.length + record.after.length) === record.after));
  return contextual.length === 1 ? contextual[0] : -1;
 }
 function clearMarks() {
  root.querySelectorAll('mark[data-annotation]').forEach(mark => mark.replaceWith(...mark.childNodes));
  root.normalize();
 }
 function markRecord(record, start) {
  let offset = 0; const end = start + record.quote.length;
  for (const node of textNodes()) {
   const next = offset + node.length;
   if (next > start && offset < end) {
    const from = Math.max(0, start - offset), to = Math.min(node.length, end - offset);
    const selected = node.splitText(from); selected.splitText(to - from);
    const mark = element('mark', 'reading-highlight');
    mark.dataset.annotation = record.id;
    mark.tabIndex = 0;
    mark.setAttribute('role', 'button');
    mark.setAttribute('aria-label', record.note ? '查看或修改点评：' + record.note : '查看或修改高亮');
    mark.title = record.note || '点击添加点评或修改高亮';
    if (record.note) mark.classList.add('has-comment');
    selected.replaceWith(mark); mark.append(selected);
   }
   offset = next;
  }
 }
 function paint() {
  if (!root?.isConnected) return;
  clearMarks(); const text = fullText();
  for (const r of records) {const start = locate(r, text); if (start >= 0) markRecord(r, start);}
  const button = document.getElementById('annotation-open');
  if (button) button.textContent = `本页高亮与点评 · ${records.length}`;
 }
 function captureSelection() {
  if (!root?.isConnected || editor.open || list.open) return;
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || !selection.rangeCount) {toolbar.hidden = true; pending = null; return;}
  const range = selection.getRangeAt(0);
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) {toolbar.hidden = true; pending = null; return;}
  const nodes = textNodes(); let offset = 0, start = null, end = null;
  for (const node of nodes) {
   if (range.intersectsNode(node)) {
    const from = node === range.startContainer ? range.startOffset : 0;
    const to = node === range.endContainer ? range.endOffset : node.length;
    // Boundary contact alone can produce an empty slice.
    if (to > from) {if (start === null) start = offset + from; end = offset + to;}
   }
   offset += node.length;
  }
  const text = fullText();
  if (start === null || end === null || !text.slice(start, end).trim()) {toolbar.hidden = true; pending = null; return;}
  pending = {start, quote:text.slice(start, end), before:text.slice(Math.max(0, start - 32), start), after:text.slice(end, end + 32)};
  toolbar.hidden = false;
 }
 function overlaps(record) {
  const text = fullText();
  return records.some(r => {const start = locate(r, text); return start >= 0 && record.start < start + r.quote.length && record.start + record.quote.length > start;});
 }
 function newRecord() {
  if (!pending) return null;
  if (overlaps(pending)) {notice('选区包含已有高亮，点击已有高亮即可修改点评。'); return null;}
  return {...pending, id:crypto.randomUUID(), note:'', createdAt:new Date().toISOString()};
 }
 function openEditor(record) {
  editing = {...record}; toolbar.hidden = true;
  editor.querySelector('blockquote').textContent = record.quote;
  editor.querySelector('textarea').value = record.note;
  editor.querySelector('.annotation-error').textContent = '';
  const saved = records.some(r => r.id === record.id);
  editor.querySelector('[data-action="delete-record"]').hidden = !saved;
  editor.querySelector('[data-action="delete-comment"]').hidden = !saved || !record.note;
  list.close(); editor.showModal(); editor.querySelector('textarea').focus();
 }
 function renderList() {
  const text = fullText();
  list.querySelector('.annotation-list').innerHTML = records.length ? records.map(r => `<article data-record="${esc(r.id)}"><blockquote>${esc(r.quote)}</blockquote>${r.note ? `<p>${esc(r.note)}</p>` : '<p class="annotation-muted">仅高亮 · 暂无点评</p>'}${locate(r, text) < 0 ? '<p class="annotation-muted">正文已有变化，暂未定位到原文；记录仍保留。</p>' : ''}<div class="annotation-actions"><button type="button" data-action="locate">回到原文</button><button type="button" data-action="edit">编辑点评</button><button type="button" data-action="delete">删除</button></div></article>`).join('') : '<p>还没有高亮。选中正文，再点“高亮”或“添加点评”。</p>';
 }
 function openList() {toolbar.hidden = true; renderList(); list.showModal();}
 toolbar.addEventListener('pointerdown', e => {if (e.pointerType !== 'touch') e.preventDefault();});
 toolbar.addEventListener('click', e => {
  const action = e.target.closest('button')?.dataset.action;
  if (action === 'dismiss') {toolbar.hidden = true; pending = null; window.getSelection()?.removeAllRanges(); return;}
  if (!['highlight','comment'].includes(action)) return;
  const record = newRecord(); if (!record) return;
  if (action === 'comment') openEditor(record);
  else if (persist([...records, record])) {toolbar.hidden = true; pending = null; window.getSelection()?.removeAllRanges(); paint(); notice('高亮已保存到当前浏览器。');}
 });
 editor.querySelectorAll('[data-action="cancel"]').forEach(b => b.addEventListener('click', () => editor.close()));
 editor.addEventListener('click', e => {
  const action = e.target.closest('button')?.dataset.action;
  if (!editing || !['delete-record','delete-comment'].includes(action)) return;
  const id = editing.id;
  const next = action === 'delete-record' ? records.filter(r => r.id !== id) : records.map(r => r.id === id ? {...r, note:''} : r);
  if (!persist(next)) {editor.querySelector('.annotation-error').textContent = '删除未能保存，请重试；原记录仍保留。'; return;}
  editor.close(); paint();
  notice(action === 'delete-record' ? '已删除高亮与点评。' : '已删除点评，高亮已保留。');
 });
 editor.addEventListener('close', () => {editing = null; pending = null; window.getSelection()?.removeAllRanges();});
 editor.querySelector('form').addEventListener('submit', e => {
  e.preventDefault(); if (!editing) return;
  const updated = {...editing, note:editor.querySelector('textarea').value.trim()};
  const next = records.some(r => r.id === updated.id) ? records.map(r => r.id === updated.id ? updated : r) : [...records, updated];
  if (!persist(next)) {editor.querySelector('.annotation-error').textContent = '未能保存，请保留并复制这段点评后重试。'; return;}
  editor.close(); paint(); notice('高亮与点评已保存到当前浏览器。');
 });
 list.querySelector('.annotation-dialog-head button').addEventListener('click', () => list.close());
 list.addEventListener('click', e => {
  const card = e.target.closest('[data-record]'), action = e.target.closest('button')?.dataset.action;
  if (!card || !action) return;
  const record = records.find(r => r.id === card.dataset.record); if (!record) return;
  if (action === 'edit') openEditor(record);
  if (action === 'delete' && persist(records.filter(r => r.id !== record.id))) {paint(); renderList(); notice('已删除这条高亮与点评。');}
  if (action === 'locate') {
   const mark = [...root.querySelectorAll('mark[data-annotation]')].find(m => m.dataset.annotation === record.id);
   if (!mark) {notice('正文已有变化，暂时找不到原文，点评仍已保留。'); return;}
   list.close(); mark.scrollIntoView({block:'center', behavior:'smooth'}); mark.focus({preventScroll:true});
  }
 });
 document.addEventListener('pointerup', e => {if (!e.target.closest('.annotation-toolbar,.annotation-dialog')) setTimeout(captureSelection, 0);});
 document.addEventListener('keyup', e => {if (e.key === 'Escape') {toolbar.hidden = true; pending = null;} else if (e.key.startsWith('Arrow') || e.key === 'Shift') captureSelection();});
 // Also covers touch selection handles without stealing the native selection menu.
 let selectionTimer;
 document.addEventListener('selectionchange', () => {clearTimeout(selectionTimer); selectionTimer = setTimeout(captureSelection, 180);});
 window.addEventListener('storage', e => {if (root?.isConnected && (e.key === key() || e.key === null)) {loadRecords(); paint(); if (list.open) renderList();}});
 window.readingAnnotationsMount = () => {
  editor.close(); list.close(); toolbar.hidden = true; pending = null;
  root = document.getElementById('reading-body'); if (!root) return;
  route = location.hash.split('/').slice(1,3).join('/');
  const bar = element('div', 'annotation-reading-tools');
  bar.innerHTML = '<button id="annotation-open" type="button">本页高亮与点评</button><small>选中文字即可高亮或点评 · 仅保存在当前浏览器</small>';
  root.before(bar); bar.querySelector('button').addEventListener('click', openList);
  const activate = e => {
   const mark = e.target.closest('mark[data-annotation]');
   if (!mark || !window.getSelection()?.isCollapsed || (e.type === 'keydown' && !['Enter',' '].includes(e.key))) return;
   const record = records.find(r => r.id === mark.dataset.annotation);
   if (record) {e.preventDefault(); openEditor(record);}
  };
  root.addEventListener('click', activate); root.addEventListener('keydown', activate);
  loadRecords(); paint();
 };
})();
