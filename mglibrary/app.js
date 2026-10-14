'use strict';
const entries=window.MOTION_LIBRARY;
const $=id=>document.getElementById(id);
let category='All treatments',savedOnly=false,current=null;
let saved=new Set();try{saved=new Set(JSON.parse(localStorage.getItem('bombbomb-saved-v1')||'[]'));}catch{}
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categories=['All treatments',...new Set(entries.map(e=>e.category))];
$('total').textContent=entries.length;document.querySelector('.all-prompts').textContent=`Download all ${entries.length} prompts ↓`;
$('categories').innerHTML=categories.map(c=>`<button data-category="${escapeHtml(c)}" class="${c===category?'active':''}"><span>${escapeHtml(c)}</span><span class="count">${c===category?entries.length:entries.filter(e=>e.category===c).length}</span></button>`).join('');
$('categories').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;category=b.dataset.category;render();});
const visibleEntries=()=>{const q=$('search').value.trim().toLowerCase();return entries.filter(e=>(category==='All treatments'||e.category===category)&&(!savedOnly||saved.has(e.id))&&[e.name,e.description,e.category,e.use,e.id].join(' ').toLowerCase().includes(q));};
function stopPreviews(){document.querySelectorAll('.card-media video').forEach(v=>{v.pause();v.parentElement.classList.remove('playing');});}
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting){const v=e.target.querySelector('video');if(v)v.pause();e.target.classList.remove('playing');}}));
function render(){
 stopPreviews();observer.disconnect();
 const filtered=visibleEntries();
 $('section-title').textContent=savedOnly?'Saved ideas':category;
 $('results').textContent=`${filtered.length} ${filtered.length===1?'treatment':'treatments'} · Hover to preview`;
 $('saved-count').textContent=saved.size;$('saved').setAttribute('aria-pressed',savedOnly);
 document.querySelectorAll('[data-category]').forEach(b=>{b.classList.toggle('active',b.dataset.category===category);b.setAttribute('aria-pressed',b.dataset.category===category);});
 $('grid').innerHTML=filtered.map(e=>`<article class="card" data-id="${e.id}"><button class="card-media" data-open="${e.id}" aria-label="Preview ${escapeHtml(e.name)}"><img src="${e.poster}" alt="${escapeHtml(e.name)} preview" loading="lazy" width="960" height="540"><span class="play">▶ Preview</span><span class="duration">0:06</span></button><div class="card-info"><div><button class="card-title" data-open="${e.id}">${escapeHtml(e.name)}</button><div class="card-meta"><span>${escapeHtml(e.category)}</span><span>·</span><span>${String(e.number).padStart(2,'0')}</span></div></div><button class="bookmark" data-save="${e.id}" aria-pressed="${saved.has(e.id)}" aria-label="${saved.has(e.id)?'Unsave':'Save'} ${escapeHtml(e.name)}">${saved.has(e.id)?'♥':'♡'}</button></div></article>`).join('');
 $('empty').hidden=filtered.length>0;
 document.querySelectorAll('.card-media').forEach(b=>{
  observer.observe(b);
  b.addEventListener('pointerenter',()=>{if(reduceMotion)return;stopPreviews();let v=b.querySelector('video');if(!v){v=document.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.preload='none';v.src=entries.find(e=>e.id===b.dataset.open).video;v.setAttribute('aria-hidden','true');b.insertBefore(v,b.querySelector('.play'));}v.play().then(()=>b.classList.add('playing')).catch(()=>{});});
  b.addEventListener('pointerleave',()=>{b.querySelector('video')?.pause();b.classList.remove('playing');});
 });
}
$('search').addEventListener('input',render);
$('saved').addEventListener('click',()=>{savedOnly=!savedOnly;render();});
$('reset').addEventListener('click',()=>{category='All treatments';savedOnly=false;$('search').value='';render();});
$('grid').addEventListener('click',e=>{const save=e.target.closest('[data-save]');if(save){const id=save.dataset.save;saved.has(id)?saved.delete(id):saved.add(id);try{localStorage.setItem('bombbomb-saved-v1',JSON.stringify([...saved]));}catch{toast('Saved for this session. Browser storage is unavailable.');}render();return;}const open=e.target.closest('[data-open]');if(open)openDetail(open.dataset.open);});
const detailTabs=['model','recipe','source'];
function setTab(selected){for(const id of detailTabs){const active=id===selected;$(id).hidden=!active;$(id+'-tab').setAttribute('aria-selected',String(active));$(id+'-tab').tabIndex=active?0:-1;}}
for(const [index,id] of detailTabs.entries()){
 const tab=$(id+'-tab');
 tab.addEventListener('click',()=>setTab(id));
 tab.addEventListener('keydown',event=>{
  let next;if(event.key==='ArrowRight')next=(index+1)%detailTabs.length;else if(event.key==='ArrowLeft')next=(index+detailTabs.length-1)%detailTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=detailTabs.length-1;else return;
  event.preventDefault();setTab(detailTabs[next]);$(detailTabs[next]+'-tab').focus();
 });
}
function openDetail(id,updateHash=true){
 const e=entries.find(e=>e.id===id);if(!e)return;current=e;stopPreviews();
 $('detail-title').textContent=e.name;$('detail-category').textContent=e.category+' / '+String(e.number).padStart(2,'0');
 for(const [target,key] of [['description','description'],['use','use'],['guidance','guardrails'],['editable','editable'],['prompt','prompt']])$(target).textContent=e[key];
 $('detail-video').src=e.video;$('detail-video').poster=e.poster;
 $('download').href=e.video;$('download').download=e.id+'.mp4';
 $('detail-specs').textContent='6 seconds · 960 × 540 · 30 fps · Silent';
 $('inspiration').innerHTML=e.inspiration?`Motion idea informed by <a href="${e.inspiration}" target="_blank" rel="noopener">React Video Editor’s Lower Third ↗</a>. Original implementation.`:'';
 const sources=[e.source,...(e.sourceComponent?[e.sourceComponent]:[])];
 $('source-links').innerHTML=sources.map(s=>`<a href="${s}" target="_blank" rel="noopener">${escapeHtml(s.split('/').pop())} ↗</a>`).join('');
 $('code').textContent=window.MOTION_SOURCES?.[e.sourceComponent||e.source]||'Open the linked source file.';
 $('copy-fallback').hidden=true;$('model-prompt').value=e.generationPrompt||e.prompt;$('model-prompt').scrollTop=0;setTab('model');
 if(!$('detail').open)$('detail').showModal();
 $('detail').scrollTop=0;
 if(updateHash)history.replaceState(null,'','#'+e.id);
 if(!reduceMotion)$('detail-video').play().catch(()=>{});
}

$('detail').querySelector('.close').addEventListener('click',()=>$('detail').close());
$('detail').addEventListener('click',e=>{if(e.target===$('detail')){const r=$('detail').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('detail').close();}});
$('detail').addEventListener('close',()=>{$('detail-video').pause();$('detail-video').removeAttribute('src');$('detail-video').load();history.replaceState(null,'',location.pathname+location.search);});
function navigate(delta){const list=visibleEntries(),available=list.some(e=>e.id===current.id)?list:entries;const i=available.findIndex(e=>e.id===current.id);openDetail(available[(i+delta+available.length)%available.length].id);}
$('previous').addEventListener('click',()=>navigate(-1));$('next').addEventListener('click',()=>navigate(1));
function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');setTimeout(()=>$('toast').classList.remove('visible'),2200);}
$('copy').addEventListener('click',async()=>{try{if(!navigator.clipboard)throw new Error('No clipboard');await navigator.clipboard.writeText(current.prompt);toast('Creative direction copied.');}catch{$('copy-fallback').hidden=false;$('copy-fallback').value=current.prompt;$('copy-fallback').select();toast('Select and copy the direction below.');}});
$('copy-model').addEventListener('click',async()=>{
 const prompt=$('model-prompt').value;
 try{if(!navigator.clipboard)throw new Error('No clipboard');await navigator.clipboard.writeText(prompt);toast('Model prompt copied. Paste it into another model.');}
 catch{$('model-prompt').focus();$('model-prompt').select();toast('Prompt selected. Press ⌘C or Ctrl+C to copy.');}
});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!$('detail').open&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();$('search').focus();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopPreviews();$('detail-video').pause();}});
window.addEventListener('hashchange',()=>{const id=decodeURIComponent(location.hash.slice(1));if(id)openDetail(id,false);});
render();if(location.hash)openDetail(decodeURIComponent(location.hash.slice(1)),false);
