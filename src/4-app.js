<script>
/* ================= storage: shared db when the viewer provides it, this browser otherwise ================= */
const Store=(()=>{
  let db=null,mode='local';const KEY='sanding-v1';let mem={};
  try{mem=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){mem={}}
  const subs=new Set();
  const parent=p=>p.split('/').slice(0,-1).join('/');
  const listLocal=col=>Object.entries(mem).filter(([k])=>parent(k)===col).map(([k,v])=>({...v,id:k.split('/').pop()}));
  const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(mem))}catch(e){throw new Error('This browser has no room left to save the card. Remove some photos and try again.')}};
  const emit=col=>subs.forEach(s=>s.col===col&&s.cb(listLocal(col)));
  const ready=(async()=>{if(!window.claude||typeof window.claude.use!=='function')return;try{const d=await window.claude.use('db');if(d){db=d;mode='db'}}catch(e){}})();
  const friendly=e=>{const c=e&&e.code;if(c==='invalid_argument')return new Error('You don’t have permission to save here. Ask the card owner for access.');if(c==='quota_exceeded')return new Error('Storage for this card is full.');if(c==='resource_exhausted')return new Error('Too many saves at once. Wait a moment and try again.');return e instanceof Error?e:new Error('Could not save. Check your connection and try again.')};
  const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
  return{ready,get mode(){return mode},newId,
    sub(col,cb){let un=null,dead=false;ready.then(()=>{if(dead)return;if(mode==='db'){un=db.collection(col).onSnapshot(s=>cb(s.docs.map(d=>({...d.data(),id:d.id}))),e=>console.warn('db',e))}else{const s={col,cb};subs.add(s);cb(listLocal(col));un=()=>subs.delete(s)}});return()=>{dead=true;un&&un()}},
    async set(path,data){await ready;try{if(mode==='db')await db.doc(path).set(data);else{mem[path]=data;persist();emit(parent(path))}}catch(e){throw friendly(e)}},
    async update(path,patch){await ready;try{if(mode==='db')await db.doc(path).update(patch);else{mem[path]={...mem[path],...patch};persist();emit(parent(path))}}catch(e){throw friendly(e)}},
    async del(path){await ready;try{if(mode==='db')await db.doc(path).delete();else{delete mem[path];persist();emit(parent(path))}}catch(e){throw friendly(e)}},
    async add(col,data){const id=newId();await this.set(col+'/'+id,data);return id}};
})();
const ls={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const clone=o=>JSON.parse(JSON.stringify(o));
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('on');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('on'),2400)}

/* ================= packages ================= */
const PKGS=[
 {id:'asas',name:'Asas',price:29,days:60,feats:['Any design with its own opening','Bahasa Melayu or English','Waze, Google Maps & livestream link','Countdown, Google, Apple & Outlook calendar','RSVP with pax limit, deadline and notes','Petal, gold dust or jasmine effect','Card opens counted in your dashboard','Online for 60 days']},
 {id:'premium',name:'Permata',price:59,days:120,feats:['Everything in Asas','Ucapan wall with moderation','Background music','Swipe gallery, up to 6 photos','Salam kaut: 3 accounts & DuitNow QR','Gift wishlist with reservations','Live attendance count on the card','Contacts with call & WhatsApp','Online for 120 days']},
 {id:'diraja',name:'Diraja',price:99,days:365,feats:['Everything in Permata','Personal guest links with names','Guest e-pass with QR check-in on the day','WhatsApp reminders to every guest','Custom accent colour','Guest list CSV export','Online for 1 year']}];
const ADDON_OWN=10;
const PKG=Object.fromEntries(PKGS.map(p=>[p.id,p]));const rank=id=>PKGS.findIndex(p=>p.id===id);
function needPkg(o){const why={diraja:[],premium:[]};if(o.x_guestlinks)why.diraja.push('guest links');if(o.useAccent)why.diraja.push('custom colour');if(o.x_epass)why.diraja.push('e-pass check-in');
  [['x_wishes','ucapan'],['x_music','music'],['x_gallery','gallery'],['x_gift','salam kaut'],['x_contacts','contacts'],['x_wishlist','wishlist'],['x_counter','attendance count']].forEach(([k,l])=>o[k]&&why.premium.push(l));
  const id=why.diraja.length?'diraja':why.premium.length?'premium':'asas';return{id,why:(why.diraja.length?why.diraja:why.premium)}}
const BANKS=['Maybank','CIMB Bank','Bank Islam','Public Bank','RHB Bank','Hong Leong Bank','AmBank','Bank Rakyat','BSN','Bank Muamalat','Affin Bank','Alliance Bank','Touch ’n Go eWallet'];

/* ================= orders feed ================= */
let ORDERS=[];let ordersLoaded;const ordersListeners=new Set();
let ordersReady=false;ordersLoaded=new Promise(res=>{setTimeout(res,9000);Store.sub('orders',list=>{ORDERS=list.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));ordersReady=true;res();ordersListeners.forEach(f=>f())})});
Store.ready.then(()=>{const c=$('#conn');c.classList.toggle('live',Store.mode==='db');c.querySelector('span').textContent=Store.mode==='db'?'Synced · updates live':'Saved in this browser only'});

/* ================= router ================= */
const VIEWS=['home','designs','create','checkout','success','dashboard'];let curView='home';
function show(view,{scroll}={}){
  Music.stop();
  curView=view;$$('.view').forEach(v=>v.classList.toggle('on',v.id==='v-'+view));
  $$('.nav a').forEach(a=>{if(a.dataset.go===view&&!a.dataset.scroll)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
  $('#mobile-preview').classList.toggle('on',view==='create');
  ({home:initHome,designs:initDesigns,create:initEditor,checkout:initCheckout,dashboard:renderDash}[view]||(()=>{}))();
  if(scroll){requestAnimationFrame(()=>document.getElementById(scroll)?.scrollIntoView({behavior:'smooth'}))}else window.scrollTo(0,0);
}
function go(view,opts){try{if(location.hash!=='#'+view)history.pushState(null,'','#'+view)}catch(e){}show(view,opts)}
function route(){const h=decodeURIComponent(location.hash.slice(1));if(h.startsWith('i-')){openBySlug(h.slice(2));return}closeInvite(true);show(VIEWS.includes(h)?h:'home')}
window.addEventListener('popstate',route);
document.addEventListener('click',e=>{const a=e.target.closest('[data-go]');if(!a)return;e.preventDefault();if(a.dataset.go==='create'&&editingId){startNew();return}go(a.dataset.go,{scroll:a.dataset.scroll})});

/* ================= invitation overlay ================= */
let invReturn='home';
function openInvite(order,opts={}){
  const root=$('#inv-root');root.innerHTML=`<div class="inv-overlay"><div class="inv-host"></div><button type="button" class="inv-close">${opts.closeLabel||'← Back to Sanding'}</button></div>`;
  document.body.style.overflow='hidden';
  renderInvite($('.inv-host',root),order,{mode:'live',...opts});
  $('.inv-close',root).addEventListener('click',()=>{closeInvite();if(location.hash.startsWith('#i-')){try{history.pushState(null,'','#'+invReturn)}catch(e){}show(invReturn)}});
}
function closeInvite(silent){const root=$('#inv-root');if(!root.firstChild)return;Music.stop();root.innerHTML='';document.body.style.overflow=''}
async function openBySlug(token){
  const [slug,guestRaw]=token.split('~');const guest=guestRaw?guestRaw.replace(/_/g,' '):'';
  if(slug==='contoh'){openInvite(SAMPLE,{guest});return}
  await ordersLoaded;const o=ORDERS.find(x=>x.slug===slug);
  if(!o){$('#inv-root').innerHTML=`<div class="inv-overlay" style="align-items:center;padding:24px"><div class="card" style="max-width:380px;text-align:center"><h2 style="font-size:26px">Card not found</h2><p class="muted">No card uses the link <b>${esc(slug)}</b>. Check the spelling, or ask the couple to send it again.</p><button class="btn btn-primary" id="nf-back">Go to Sanding</button></div></div>`;$('#nf-back').onclick=()=>{closeInvite();go('home')};return}
  openLive(o,guest);
}
function openLive(o,guest){
  const key='sanding-rsvp-'+o.id;
  const vk='sanding-view-'+o.id+'-'+new Date().toISOString().slice(0,10);if(!ls.get(vk,false)){ls.set(vk,true);Store.add(`orders/${o.id}/views`,{at:Date.now(),guest:guest||''}).catch(()=>{})}
  openInvite(o,{guest,
    rsvpDone:()=>ls.get(key,null),
    onRsvp:async d=>{if(o.deadline&&new Date(o.deadline+'T23:59:59+08:00')<new Date())throw new Error(T[o.lang].closed);const id=await Store.add(`orders/${o.id}/rsvps`,d);const pass={name:d.name,pax:d.pax,code:rsvpCode(id),qr:`SANDING:${o.slug}:${id}`};ls.set(key,pass);return pass},
    subscribeReserves:o.x_wishlist?cb=>Store.sub(`orders/${o.id}/reserves`,cb):null,
    onReserve:(k,d)=>Store.set(`orders/${o.id}/reserves/${k}`,d),
    onUnreserve:k=>Store.del(`orders/${o.id}/reserves/${k}`),
    subscribeRsvps:o.x_counter?cb=>Store.sub(`orders/${o.id}/rsvps`,cb):null,
    onWish:d=>Store.add(`orders/${o.id}/wishes`,d),
    subscribeWishes:o.x_wishes?cb=>Store.sub(`orders/${o.id}/wishes`,cb):null});
}

/* ================= home ================= */
const thumbRO=new ResizeObserver(es=>es.forEach(e=>{const s=$('.scale',e.target);if(s)s.style.transform=`scale(${e.contentRect.width/360})`}));
function fitThumbs(root=document){$$('.mini',root).forEach(t=>thumbRO.observe(t))}
const lazyIO=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;lazyIO.unobserve(e.target);e.target.__paint&&e.target.__paint()}),{rootMargin:'600px 0px'});
function mini(tpl,style='',face){const d=document.createElement('div');d.className='mini';d.setAttribute('style',style);d.innerHTML='<div class="scale"></div>';d.__paint=()=>{renderInvite($('.scale',d),{...SAMPLE,template:tpl},{mode:'thumb',face});d.__paint=null};lazyIO.observe(d);thumbRO.observe(d);return d}
let homeInit=false,demoFam='sampul';
function initHome(){
  if(homeInit)return;homeInit=true;
  $('#pricing-cards').innerHTML=PKGS.map((p,i)=>`<div class="price-row"><div class="top"><h3>${p.name}</h3><span class="lead-dots"></span><b>RM${p.price}</b></div><p>${p.feats.map(esc).join(' · ')}</p><div class="row-cta"><a href="#create" data-go="create" class="btn ${i===1?'btn-primary':'btn-ghost'} btn-sm">Start with ${p.name}</a></div></div>`).join('');
  // flat-lay: three real cards, a loose seal and a cut rose on a linen table
  const tb=$('#hero-table');
  tb.append(mini('mihrab-zamrud','width:40%;left:52%;top:5%;transform:rotate(7deg)','page'),mini('sampul-gading','width:42%;left:6%;top:9%;transform:rotate(-8deg)','cover'),mini('ukiran-sepia','width:40%;left:31%;top:40%;transform:rotate(2deg);z-index:2','page'));
  tb.insertAdjacentHTML('beforeend',`<img class="prop" src="${A}flower-cabbage-rose.webp" alt="" style="width:38%;right:-9%;bottom:-6%;transform:rotate(-28deg);z-index:3;filter:drop-shadow(0 10px 10px rgba(30,18,10,.35))"><img class="prop" src="${A}seal-merah.webp" alt="" style="width:15%;left:9%;bottom:8%;z-index:3;transform:rotate(18deg);filter:drop-shadow(0 4px 4px rgba(30,18,10,.4))">`);
  // families
  const fams=$('#families');
  Object.entries(FAMILIES).forEach(([k,f])=>{const list=THEMES.filter(t=>t.fam===k);if(!list.length)return;const card=document.createElement('article');card.className='fam';
    card.innerHTML=`<div class="slot"></div><div><p class="mean">${esc(f.meaning)}</p><h3>${esc(f.name)}</h3></div><p>${esc(f.blurb)}</p><div class="dots" role="group" aria-label="${esc(f.name)} colourways">${list.map((t,i)=>`<button type="button" aria-pressed="${i===0}" aria-label="${esc(t.name)}" data-t="${t.id}" style="background:${dotColor(t)}"></button>`).join('')}<span>${esc(list[0].name)}</span></div>`;
    const slot=$('.slot',card);
    const put=id=>{const m=mini(id,'',k==='sampul'?'cover':'page');m.tabIndex=0;m.setAttribute('role','button');m.setAttribute('aria-label','Open '+themeOf(id).name);const go=()=>{invReturn='home';openInvite({...SAMPLE,template:id},{closeLabel:'← Back'})};m.onclick=go;m.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();go()}};slot.replaceChildren(m)};
    put(list[0].id);
    $$('[data-t]',card).forEach(b=>b.onclick=()=>{$$('[data-t]',card).forEach(x=>x.setAttribute('aria-pressed',x===b));$('.dots span',card).textContent=themeOf(b.dataset.t).name;put(b.dataset.t)});
    fams.append(card)});
  // live demo
  const tabs=$('#demo-tabs');tabs.innerHTML=Object.entries(FAMILIES).map(([k,f])=>`<button type="button" data-fam="${k}" aria-pressed="${k===demoFam}">${esc(f.name)}</button>`).join('');
  const paint=()=>{Music.stop();const id=THEMES.find(t=>t.fam===demoFam).id;renderInvite($('#demo-screen'),{...SAMPLE,template:id},{mode:'preview'})};paint();
  $$('[data-fam]',tabs).forEach(b=>b.onclick=()=>{demoFam=b.dataset.fam;$$('[data-fam]',tabs).forEach(x=>x.setAttribute('aria-pressed',x===b));paint()});
  $('#demo-replay').onclick=()=>{Music.stop();$('#demo-screen .inv')?.reopen?.()};
}

/* ================= designs ================= */
let dFilter='all',dTone='all';
function initDesigns(){
  $('#filters').innerHTML=CATS.map(([k,l])=>`<button type="button" class="chip" data-f="${k}" aria-pressed="${k===dFilter}">${l}</button>`).join('');
  $$('#filters [data-f]').forEach(b=>b.onclick=()=>{dFilter=b.dataset.f;initDesigns()});
  $('#tones').innerHTML=TONES.map(([k,l])=>`<button type="button" class="chip" data-tone="${k}" aria-pressed="${k===dTone}">${k==='all'?'':`<i style="width:10px;height:10px;border-radius:50%;display:inline-block;background:${{merah:'#a3263a',coklat:'#a8834a',hijau:'#3c6a4a',biru:'#2d4b78',ungu:'#5d3a6a',gelap:'#1b1b1b',cerah:'#f3eee5',neutral:'#9b948a'}[k]};border:1px solid var(--line)"></i>`}${l}</button>`).join('');
  $$('#tones [data-tone]').forEach(b=>b.onclick=()=>{dTone=b.dataset.tone;initDesigns()});
  const pick=t=>(dFilter==='all'||t.fam===dFilter)&&(dTone==='all'||toneOf(t)===dTone);
  $('#d-count').textContent=`${THEMES.filter(pick).length} of ${THEMES.length} designs`;
  const grid=$('#design-grid');grid.innerHTML='';
  Object.entries(FAMILIES).filter(([k])=>THEMES.some(t=>t.fam===k&&pick(t))).forEach(([k,f])=>{
    const blk=document.createElement('section');blk.className='fam-block';
    blk.innerHTML=`<div class="about"><p class="eyebrow">${esc(f.meaning)}</p><h2>${esc(f.name)}</h2><p class="muted">${esc(f.blurb)}</p></div><div class="row"></div>`;
    THEMES.filter(t=>t.fam===k&&pick(t)).forEach(t=>{const c=document.createElement('article');c.className='dcard';
      c.innerHTML=`<div class="slot"></div><div class="meta"><div style="min-width:0"><h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p></div><button type="button" class="btn btn-ghost btn-sm" data-use="${t.id}">Use</button></div>`;
      const m=mini(t.id,'',k==='sampul'?'cover':'page');m.tabIndex=0;m.setAttribute('role','button');m.setAttribute('aria-label','Preview '+t.name);m.insertAdjacentHTML('beforeend','<div class="hover"><span class="btn btn-sm" style="background:#fbf8f2;color:#221b17">Open card</span></div>');
      const go=()=>{invReturn='designs';openInvite({...SAMPLE,template:t.id},{closeLabel:'← Back to the collection'})};m.onclick=go;m.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}};
      $('.slot',c).append(m);$('[data-use]',c).onclick=()=>startNew(t.id);$('.row',blk).append(c)});
    grid.append(blk)});
}

/* ================= editor ================= */
let draft=null,editingId=null,tab=0,previewOpened=false;
const blankExtras={hideSecs:[],secTitles:{},customSecs:[],tradition:'malay',monoScript:'',txtSalam:'',txtIntro:'',txtDoaT:'',txtDoa:'',ytMusic:'',ytStart:'',photos:[],qr:'',contacts:[],schedule:[],wishlist:[],gifts:null,effect:'none',ownDesign:''};
function startNew(tpl){editingId=null;draft=ls.get('sanding-draft',null)||{...clone(SAMPLE),id:null,slug:''};if(tpl)draft.template=tpl;tab=0;go('create')}
function initEditor(){
  if(!draft){draft=ls.get('sanding-draft',null)||{...clone(SAMPLE),id:null,slug:''};editingId=null}
  draft={...blankExtras,...draft};if(!draft.gifts)draft.gifts=[{bank:draft.bank||'Maybank',accName:draft.accName||'',accNo:draft.accNo||''}];
  $('#ed-title').textContent=editingId?'Edit card':'Create your card';
  $('#ed-eyebrow').textContent=editingId?`Editing sanding.my/${draft.slug}`:'New card · filled with example details, replace them with yours';
  fillForm();setTab(tab);paintPreview(true);
}
function fillForm(){const f=$('#ed-form');for(const el of f.elements){if(!el.name)continue;const v=draft[el.name];if(el.type==='checkbox')el.checked=!!v;else if(v!=null)el.value=v}
  renderTplPick();renderSched();renderContacts();renderUploads();renderMusicPick();renderTradition();renderContent();renderGifts();renderWl();renderFx();syncDisabled()}
function syncDisabled(){[['x_rsvp','x-rsvp'],['x_music','x-music'],['x_gallery','x-gallery'],['x_gift','x-gift'],['x_contacts','x-contacts'],['x_wishlist','x-wishlist'],['useAccent','f-useAccent']].forEach(([k,id])=>{const body=$('#'+id).closest('.toggle-row').querySelector('.body');$$('.fieldset,.uploads,#music-pick,.rows,input[type=color]',body).forEach(x=>x.style.opacity=draft[k]?'1':'.45')})}
let saveT=null,pvT=null;
function changed(){clearTimeout(saveT);saveT=setTimeout(()=>{if(!editingId)ls.set('sanding-draft',draft)},400);clearTimeout(pvT);pvT=setTimeout(()=>paintPreview(),220);syncDisabled();if(tab===5)renderReview()}
$('#ed-form').addEventListener('input',e=>{const el=e.target;if(!el.name)return;draft[el.name]=el.type==='checkbox'?el.checked:el.type==='number'?+el.value:el.value;if(el.name==='x_music'&&!el.checked)Music.stop();changed()});
$('#ed-form').addEventListener('submit',e=>e.preventDefault());
$('#f-ytMusic').addEventListener('input',e=>{const v=e.target.value.trim();$('#yt-bad').hidden=!v||!!ytIdOf(v);if(ytIdOf(v)&&!draft.x_music){draft.x_music=true;$('#x-music').checked=true}});
function paintPreview(){const host=$('#ed-preview');const old=$('.scroller',host);const st=old?old.scrollTop:0;const opened=$('.inv',host)?.classList.contains('opened');
  renderInvite(host,draft,{mode:'preview',opened:opened??previewOpened});const sc=$('.scroller',host);if(sc)sc.scrollTop=st}
$('#pv-cover').onclick=()=>{$('#ed-preview .inv')?.reopen?.()};
$('#pv-full').onclick=$('#mobile-preview').onclick=()=>{invReturn='create';openInvite(clone(draft),{closeLabel:'← Back to editor',guest:draft.x_guestlinks?(draft.lang==='en'?'Mr Ahmad & family':'Encik Ahmad & keluarga'):''})};
// design picker: one real mini card per design; tapping it opens that design's colours underneath
let openFam=null;
function miniFor(tpl,fam){const d=document.createElement('div');d.className='mini';d.innerHTML='<div class="scale"></div>';
  d.__paint=()=>{renderInvite($('.scale',d),{...SAMPLE,brideShort:draft.brideShort,groomShort:draft.groomShort,side:draft.side,lang:draft.lang,template:tpl},{mode:'thumb',face:fam==='sampul'?'cover':'page'});d.__paint=null};lazyIO.observe(d);thumbRO.observe(d);return d}
function pickDesign(id){draft.template=id;renderTplPick();Music.stop();clearTimeout(pvT);renderInvite($('#ed-preview'),draft,{mode:'preview'});changed()}
function renderTplPick(){const box=$('#tpl-pick'),cur=themeOf(draft.template);if(openFam===null)openFam=cur.fam;box.className='fam-pick';box.innerHTML='';
  $('#tpl-current').textContent=cur.desc;
  Object.entries(FAMILIES).filter(([k])=>THEMES.some(t=>t.fam===k)).forEach(([k,f])=>{const list=THEMES.filter(t=>t.fam===k),mine=cur.fam===k,shown=mine?cur:list[0];
    const b=document.createElement('button');b.type='button';b.className='fam-tile';b.setAttribute('aria-pressed',mine);b.setAttribute('aria-expanded',openFam===k);
    b.append(miniFor(shown.id,k));b.insertAdjacentHTML('beforeend',`<span class="ft-name">${esc(f.name)}</span><span class="ft-mean">${esc(f.meaning)} · ${list.length} colours</span>`);
    b.onclick=()=>{openFam=openFam===k?'':k;if(!mine)pickDesign(list[0].id);else renderTplPick()};box.append(b);
    if(openFam===k){const p=document.createElement('div');p.className='fam-colours';p.setAttribute('role','group');p.setAttribute('aria-label',f.name+' colours');
      p.innerHTML=`<div class="fc-head"><b>${esc(f.name)}</b><span>${esc(f.blurb)}</span></div><div class="fc-row"></div>`;
      list.forEach(t=>{const o=document.createElement('button');o.type='button';o.className='fc-opt';o.setAttribute('aria-pressed',cur.id===t.id);o.append(miniFor(t.id,k));o.insertAdjacentHTML('beforeend',`<span>${esc(t.name)}</span>`);o.onclick=()=>pickDesign(t.id);$('.fc-row',p).append(o)});
      box.append(p)}})}
function renderMusicPick(){const box=$('#music-pick');box.innerHTML=Object.entries(Music.tracks).map(([k,t])=>`<button type="button" class="chip" data-trk="${k}" aria-pressed="${draft.music===k}">${esc(t.label)}</button>`).join('')+`<button type="button" class="btn btn-ghost btn-sm" id="trk-play">${Music.playing()?'Stop':'Play'}</button>`;
  $$('[data-trk]',box).forEach(b=>b.onclick=()=>{draft.music=b.dataset.trk;if(!draft.x_music){draft.x_music=true;$('#x-music').checked=true}if(Music.playing())Music.play(draft.music);renderMusicPick();changed()});
  $('#trk-play').onclick=()=>{Music.playing()?Music.stop():Music.play(draft.music||'sax');renderMusicPick()}}
function renderSched(){const box=$('#sched-rows');box.innerHTML=draft.schedule.map((s,i)=>`<div class="row-line"><input type="time" data-i="${i}" data-k="time" value="${esc(s.time)}" aria-label="Time"><input type="text" data-i="${i}" data-k="label" value="${esc(s.label)}" aria-label="Item"><button type="button" class="icon-btn" data-del="${i}" aria-label="Remove item">✕</button></div>`).join('')||'<p class="muted" style="font-size:13px">No items yet.</p>';
  $$('input',box).forEach(x=>x.oninput=e=>{e.stopPropagation();draft.schedule[x.dataset.i][x.dataset.k]=x.value;changed()});
  $$('[data-del]',box).forEach(b=>b.onclick=()=>{draft.schedule.splice(+b.dataset.del,1);renderSched();changed()})}
$('#add-sched').onclick=()=>{draft.schedule.push({time:'',label:''});renderSched();changed();$$('#sched-rows input[data-k=label]').pop()?.focus()};
function renderContacts(){const box=$('#contact-rows');box.innerHTML=draft.contacts.map((c,i)=>`<div class="row-line c3"><input type="text" data-i="${i}" data-k="name" value="${esc(c.name)}" placeholder="Name" aria-label="Contact name"><input type="text" data-i="${i}" data-k="role" value="${esc(c.role)}" placeholder="Role, e.g. Bapa pengantin" aria-label="Role"><input type="tel" data-i="${i}" data-k="phone" value="${esc(c.phone)}" placeholder="012-345 6789" aria-label="Phone"><button type="button" class="icon-btn" data-del="${i}" aria-label="Remove contact">✕</button></div>`).join('');
  $('#add-contact').disabled=draft.contacts.length>=3;
  $$('input',box).forEach(x=>x.oninput=e=>{e.stopPropagation();draft.contacts[x.dataset.i][x.dataset.k]=x.value;changed()});
  $$('[data-del]',box).forEach(b=>b.onclick=()=>{draft.contacts.splice(+b.dataset.del,1);renderContacts();changed()})}
$('#add-contact').onclick=()=>{if(draft.contacts.length<3){draft.contacts.push({name:'',role:'',phone:''});renderContacts();changed()}};
function shrink(file,max,type,q){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const k=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,c.height);g.drawImage(img,0,0,c.width,c.height);res(c.toDataURL(type,q))};img.onerror=()=>rej(new Error('That file is not an image we can read.'));img.src=r.result};r.onerror=rej;r.readAsDataURL(file)})}
function renderUploads(){
  const g=$('#gal-uploads');g.innerHTML=draft.photos.map((p,i)=>`<div class="ph"><img src="${p}" alt="Photo ${i+1}"><button type="button" data-rm="${i}" aria-label="Remove photo">✕</button></div>`).join('')+(draft.photos.length<6?`<label class="add" for="gal-in">Add photo<input type="file" id="gal-in" accept="image/*"></label>`:'');
  $$('[data-rm]',g).forEach(b=>b.onclick=()=>{draft.photos.splice(+b.dataset.rm,1);renderUploads();changed()});
  $('#gal-in')?.addEventListener('change',async e=>{e.stopPropagation();const f=e.target.files[0];if(!f)return;try{draft.photos.push(await shrink(f,560,'image/jpeg',.62));if(!draft.x_gallery){draft.x_gallery=true;$('#x-gallery').checked=true}renderUploads();changed()}catch(err){toast(err.message)}});
  const q=$('#qr-upload');q.innerHTML=draft.qr?`<div class="ph"><img src="${draft.qr}" alt="DuitNow QR"><button type="button" data-rmqr aria-label="Remove QR">✕</button></div>`:`<label class="add" for="qr-in">Upload QR<input type="file" id="qr-in" accept="image/*"></label>`;
  $('[data-rmqr]',q)?.addEventListener('click',()=>{draft.qr='';renderUploads();changed()});
  $('#qr-in')?.addEventListener('change',async e=>{e.stopPropagation();const f=e.target.files[0];if(!f)return;try{draft.qr=await shrink(f,320,'image/png');renderUploads();changed()}catch(err){toast(err.message)}});
  const ow=$('#own-upload');ow.innerHTML=draft.ownDesign?`<div class="ph tall"><img src="${draft.ownDesign}" alt="Your design"><button type="button" data-rmown aria-label="Remove your design">✕</button></div>`:`<label class="add" for="own-in" style="height:150px">Upload artwork<input type="file" id="own-in" accept="image/*"></label>`;
  $('[data-rmown]',ow)?.addEventListener('click',()=>{draft.ownDesign='';renderUploads();changed()});
  $('#own-in')?.addEventListener('change',async e=>{e.stopPropagation();const f=e.target.files[0];if(!f)return;try{draft.ownDesign=await shrink(f,1000,'image/jpeg',.7);renderUploads();changed()}catch(err){toast(err.message)}});
}
/* Jawi initials: an on-screen letter pad (most phones have no Jawi keyboard) and a best guess from the names */
const JAWI_KEYS='ا ب ت ث ج چ ح خ د ذ ر ز س ش ص ض ط ظ ع غ ڠ ف ڤ ق ک ݢ ل م ن و ۏ ه ة ء ي ڽ'.split(' ');
const JAWI_FIRST={a:'ا',b:'ب',c:'چ',d:'د',e:'ا',f:'ف',g:'ݢ',h:'ح',i:'ا',j:'ج',k:'ک',l:'ل',m:'م',n:'ن',o:'ا',p:'ڤ',q:'ق',r:'ر',s:'س',t:'ت',u:'ا',v:'ۏ',w:'و',x:'ک',y:'ي',z:'ز'};
// common names whose Jawi spelling starts with a different letter than the Rumi guess
const JAWI_NAME={aisyah:'ع',aishah:'ع',ali:'ع',alia:'ع',aliya:'ع',aliyah:'ع',abdul:'ع',abd:'ع',abdullah:'ع',umar:'ع',uthman:'ع',usman:'ع',ain:'ع',aina:'ع',izzah:'ع',izzati:'ع',iffah:'ع',imran:'ع',isa:'ع',adib:'ا',syafiq:'ش',syahirah:'ش',syazwani:'ش',sharifah:'ش',syed:'س',safiyyah:'ص',sabrina:'ص',solehah:'ص',zahra:'ز',zulaikha:'ز',hakim:'ح',hawa:'ح',harith:'ح',hana:'ه',hani:'ه',hidayah:'ه',taufiq:'ت',tahir:'ط',thahirah:'ط',dhia:'ض',khadijah:'خ',khairul:'خ',ghazali:'غ',qistina:'ق',qaisara:'ق'};
function jawiInitial(name){const w=String(name||'').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').split(/\s+/)[0]||'';if(!w)return'';
  if(JAWI_NAME[w])return JAWI_NAME[w];if(w.startsWith('sy'))return'ش';if(w.startsWith('kh'))return'خ';if(w.startsWith('gh'))return'غ';if(w.startsWith('ng'))return'ڠ';if(w.startsWith('ny'))return'ڽ';return JAWI_FIRST[w[0]]||''}
(()=>{const inp=$('#f-jawi'),kb=$('#jawi-kb'),tg=$('#jawi-toggle');if(!inp||!kb)return;
  kb.innerHTML='<div class="jawi-digits">'+'١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ٠'.split(' ').map(k=>`<button type="button" data-k="${k}" aria-label="${k}">${k}</button>`).join('')+'</div>'+JAWI_KEYS.map(k=>`<button type="button" data-k="${k}" aria-label="${k}">${k}</button>`).join('')+'<button type="button" class="wide" data-k=" ">Space</button><button type="button" class="wide" data-k="del">Delete</button><button type="button" class="wide" data-k="clr">Clear</button>';
  const put=v=>{inp.value=v;inp.dispatchEvent(new Event('input',{bubbles:true}))};
  kb.addEventListener('mousedown',e=>e.preventDefault()); // keep the caret in the field
  kb.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;const k=b.dataset.k,v=inp.value;let st=inp.selectionStart??v.length,en=inp.selectionEnd??v.length;
    if(k==='clr'){put('');return}
    if(k==='del'){if(st===en&&st>0)st--;put(v.slice(0,st)+v.slice(en));inp.setSelectionRange(st,st);return}
    put(v.slice(0,st)+k+v.slice(en));inp.setSelectionRange(st+k.length,st+k.length)});
  tg.onclick=()=>{kb.hidden=!kb.hidden;tg.setAttribute('aria-expanded',!kb.hidden);if(!kb.hidden)inp.focus()};
  $('#jawi-auto').onclick=()=>{const scr=draft.monoScript||TRAD_DEFAULT[draft.tradition||'malay'].monoScript;if(scr==='latin'){const [x,y]=K.initials(draft);put(`${x} & ${y}`);toast(`Filled in: ${x} & ${y}.`);return}
    if(scr!=='jawi'){toast(scr==='chinese'?'Type the Chinese characters with your phone keyboard, e.g. 囍 or your surnames 李 王.':'Type the letters with your phone keyboard, e.g. அ & அ.');inp.focus();return}
    const nm=coverNames(draft||{}),ls2=nm.map(jawiInitial),v=ls2.filter(Boolean).join(' ');if(!v){toast('Add both cover names first (step 2).');return}
    const how=nm.map((n,i)=>n&&ls2[i]?`${String(n).trim().split(/\s+/)[0]} → ${ls2[i]}`:'').filter(Boolean).join(', ');
    if(v===inp.value.trim()){toast(`Already filled: ${how}.`);inp.focus();return}put(v);toast(`Filled in: ${how}. Check the letters before you publish.`)};
})();
/* wedding tradition, monogram script and the card's wording */
function renderTradition(){const tr=draft.tradition||'malay',ms=draft.monoScript||TRAD_DEFAULT[tr].monoScript;
  $('#trad-pick').innerHTML=Object.entries(TRADITIONS).map(([k,l])=>`<button type="button" class="chip" data-trad="${k}" aria-pressed="${tr===k}">${l}</button>`).join('');
  $$('#trad-pick [data-trad]').forEach(b=>b.onclick=()=>{const k=b.dataset.trad;if(k===tr)return;Object.assign(draft,{tradition:k,...TRAD_DEFAULT[k]});
    if(TRAD_DEFAULT[k].monoScript!=='jawi'&&/[\u0600-\u06FF]/.test(draft.jawi||''))draft.jawi='';
    fillForm();changed()});
  $('#mono-pick').innerHTML=Object.entries(MONO_SCRIPTS).map(([k,l])=>`<button type="button" class="chip" data-mono="${k}" aria-pressed="${ms===k}">${l}</button>`).join('');
  $$('#mono-pick [data-mono]').forEach(b=>b.onclick=()=>{draft.monoScript=b.dataset.mono;renderTradition();changed()});
  $('#jawi-toggle').hidden=ms!=='jawi';if(ms!=='jawi')$('#jawi-kb').hidden=true;
  $('#f-jawi').placeholder={jawi:'ع ا',latin:'A & A',chinese:'囍 or 李 王',tamil:'அ & அ'}[ms];
  // event titles that fit the tradition
  const sel=$('#f-eventTitle'),L=T[draft.lang]||T.ms,keep=TRAD_EVENTS[tr].includes(draft.eventTitle)?draft.eventTitle:TRAD_EVENTS[tr][0];
  sel.innerHTML=TRAD_EVENTS[tr].map(k=>`<option value="${k}">${esc(T.ms.ev[k])}${draft.lang==='en'?' · '+esc(T.en.ev[k]):''}</option>`).join('');sel.value=keep;draft.eventTitle=keep;
  renderWording();if(typeof renderContent==="function"&&$("#sec-rows").children.length)renderContent()}
function renderWording(){const d=defaultCopy(draft);
  $('#f-txtSalam').placeholder=d.salam;$('#f-txtIntro').placeholder=plainOf(d.intro('{hosts}',draft.side));$('#f-txtDoaT').placeholder=plainOf(d.doaT);$('#f-txtDoa').placeholder=plainOf(d.doa)}
$('#txt-reset').onclick=()=>{['txtSalam','txtIntro','txtDoaT','txtDoa'].forEach(k=>{draft[k]='';$('#f-'+k).value=''});changed()};
['f-lang','f-side'].forEach(id=>$('#'+id).addEventListener('change',()=>setTimeout(renderTradition)));
/* content step: show / hide / rename sections, the couple's own sections */
function renderContent(){const L=copyFor(draft),hide=new Set(draft.hideSecs||[]),tt=draft.secTitles||{};
  $('#sec-rows').innerHTML=CARD_SECTIONS.map(([k,f])=>`<label class="sec-row"><input type="checkbox" data-sk="${k}" ${hide.has(k)?'':'checked'}><input type="text" data-st="${k}" value="${esc(tt[k]||'')}" placeholder="${esc(plainOf(f(L)||''))}" maxlength="60" aria-label="Heading"></label>`).join('');
  $$('#sec-rows [data-sk]').forEach(c=>c.onchange=e=>{e.stopPropagation();const h=new Set(draft.hideSecs||[]);c.checked?h.delete(c.dataset.sk):h.add(c.dataset.sk);draft.hideSecs=[...h];changed()});
  $$('#sec-rows [data-st]').forEach(x=>x.oninput=e=>{e.stopPropagation();draft.secTitles={...(draft.secTitles||{}),[x.dataset.st]:x.value};changed()});
  const cs=draft.customSecs||(draft.customSecs=[]);
  $('#csec-rows').innerHTML=cs.map((x,i)=>`<div class="csec"><div class="row-line" style="grid-template-columns:1fr auto"><input type="text" data-ci="${i}" data-ck="title" value="${esc(x.title)}" placeholder="Title, e.g. Parking" maxlength="60" aria-label="Section title"><button type="button" class="icon-btn" data-cdel="${i}" aria-label="Remove section">✕</button></div><textarea data-ci="${i}" data-ck="text" rows="3" maxlength="600" placeholder="What guests should know" aria-label="Section text">${esc(x.text)}</textarea></div>`).join('')||'<p class="muted" style="font-size:13px">None yet.</p>';
  $('#add-csec').disabled=cs.length>=6;
  $$('#csec-rows [data-ci]').forEach(x=>x.oninput=e=>{e.stopPropagation();cs[x.dataset.ci][x.dataset.ck]=x.value;changed()});
  $$('#csec-rows [data-cdel]').forEach(b=>b.onclick=()=>{cs.splice(+b.dataset.cdel,1);renderContent();changed()})}
$('#add-csec').onclick=()=>{(draft.customSecs||(draft.customSecs=[])).push({title:'',text:''});renderContent();changed();$$('#csec-rows [data-ck=title]').pop()?.focus()};
function renderGifts(){const box=$('#gift-rows');box.innerHTML=draft.gifts.map((g,i)=>`<div class="row-line c4"><select data-i="${i}" data-k="bank" aria-label="Bank">${BANKS.map(b=>`<option ${b===g.bank?'selected':''}>${esc(b)}</option>`).join('')}</select><input type="text" data-i="${i}" data-k="accName" value="${esc(g.accName)}" placeholder="Account holder" aria-label="Account holder"><input type="text" data-i="${i}" data-k="accNo" value="${esc(g.accNo)}" placeholder="Account or phone no." inputmode="numeric" aria-label="Account number"><button type="button" class="icon-btn" data-del="${i}" aria-label="Remove account" ${draft.gifts.length<2?'disabled':''}>✕</button></div>`).join('');
  $('#add-gift').disabled=draft.gifts.length>=3;
  $$('input,select',box).forEach(x=>x.oninput=x.onchange=e=>{e.stopPropagation();draft.gifts[x.dataset.i][x.dataset.k]=x.value;const g0=draft.gifts[0];Object.assign(draft,{bank:g0.bank,accName:g0.accName,accNo:g0.accNo});changed()});
  $$('[data-del]',box).forEach(b=>b.onclick=()=>{draft.gifts.splice(+b.dataset.del,1);renderGifts();changed()})}
$('#add-gift').onclick=()=>{if(draft.gifts.length<3){draft.gifts.push({bank:'Touch ’n Go eWallet',accName:'',accNo:''});renderGifts();changed()}};
function renderWl(){const box=$('#wl-rows');box.innerHTML=draft.wishlist.map((w,i)=>`<div class="row-line wl"><input type="text" data-i="${i}" data-k="name" value="${esc(w.name)}" placeholder="Item, e.g. Periuk nasi" aria-label="Item"><input type="text" data-i="${i}" data-k="price" value="${esc(w.price||'')}" placeholder="RM120" aria-label="Price"><input type="url" data-i="${i}" data-k="link" value="${esc(w.link||'')}" placeholder="Shop link (optional)" aria-label="Shop link"><button type="button" class="icon-btn" data-del="${i}" aria-label="Remove item">✕</button></div>`).join('')||'<p class="muted" style="font-size:13px">No items yet.</p>';
  $('#add-wl').disabled=draft.wishlist.length>=12;
  $$('input',box).forEach(x=>x.oninput=e=>{e.stopPropagation();draft.wishlist[x.dataset.i][x.dataset.k]=x.value;changed()});
  $$('[data-del]',box).forEach(b=>b.onclick=()=>{draft.wishlist.splice(+b.dataset.del,1);renderWl();changed()})}
$('#add-wl').onclick=()=>{if(draft.wishlist.length<12){draft.wishlist.push({name:'',price:'',link:''});if(!draft.x_wishlist){draft.x_wishlist=true;$('#x-wishlist').checked=true}renderWl();changed();$$('#wl-rows input[data-k=name]').pop()?.focus()}};
function renderFx(){const box=$('#fx-pick');box.innerHTML=Object.entries(EFFECTS).map(([k,f])=>`<button type="button" class="chip" data-fx="${k}" aria-pressed="${(draft.effect||'none')===k}">${esc(f.label)}</button>`).join('');
  $$('[data-fx]',box).forEach(b=>b.onclick=()=>{draft.effect=b.dataset.fx;renderFx();changed()})}
function setTab(i){tab=i;$$('#ed-tabs [data-tab]').forEach(b=>b.setAttribute('aria-selected',+b.dataset.tab===i));$$('#ed-form .panel').forEach(p=>p.classList.toggle('on',+p.dataset.panel===i));
  $('#ed-prev').style.visibility=i?'visible':'hidden';
  if(i===5)renderReview();else $('#ed-next').textContent='Next'}
$$('#ed-tabs [data-tab]').forEach(b=>b.onclick=()=>setTab(+b.dataset.tab));
$('#ed-prev').onclick=()=>{setTab(Math.max(0,tab-1));window.scrollTo({top:0})};
$('#ed-next').onclick=()=>{if(tab<5){setTab(tab+1);window.scrollTo({top:0});return}proceed()};
function renderReview(){const o=draft,L=T[o.lang],pk=needPkg(o),p=PKG[pk.id];
  const extras=[['x_rsvp','RSVP'],['x_counter','Attendance count'],['x_epass','E-pass'],['x_wishes','Ucapan'],['x_music','Music'],['x_gallery','Gallery'],['x_gift','Salam kaut'],['x_wishlist','Wishlist'],['x_contacts','Contacts'],['x_guestlinks','Guest links']].filter(([k])=>o[k]).map(([,l])=>l).concat(o.effect&&o.effect!=='none'?[EFFECTS[o.effect].label]:[],o.livestream?['Livestream']:[],o.ownDesign?['Own design (+RM10)']:[]).join(', ')||'None';
  $('#review-dl').innerHTML=[['Design',themeOf(o.template).name],['Couple',`${o.brideShort||'—'} & ${o.groomShort||'—'}`],['Event',L.ev[o.eventTitle]],['Date',fmtDate(o.date,o.lang)||'—'],['Time',`${fmtTime(o.start,o.lang)} – ${fmtTime(o.end,o.lang)}`],['Venue',o.venue||'—'],['Language',o.lang==='en'?'English':'Bahasa Melayu'],['Extras',extras]].map(([a,b])=>`<dt>${a}</dt><dd>${esc(b)}</dd>`).join('');
  $('#pkg-name').textContent=p.name;
  const paidPkg=editingId?ORDERS.find(x=>x.id===editingId)?.package:null;
  if(editingId&&rank(pk.id)<=rank(paidPkg)){$('#pkg-price').textContent='Paid';$('#pkg-why').textContent=`Your ${PKG[paidPkg].name} package covers these changes.`;$('#pkg-name').textContent=PKG[paidPkg].name;$('#ed-next').textContent='Save changes'}
  else if(editingId){$('#pkg-price').textContent=`+RM${p.price-PKG[paidPkg].price}`;$('#pkg-why').textContent=`Upgrade needed for ${pk.why.join(', ')}`;$('#ed-next').textContent='Upgrade and save'}
  else{$('#pkg-price').textContent=`RM${p.price+(o.ownDesign?ADDON_OWN:0)}`;$('#pkg-why').textContent=pk.why.length?`Needed for ${pk.why.join(', ')}`:'Covers everything you turned on';$('#ed-next').textContent='Continue to payment'}}
async function proceed(){
  const req=[['brideShort',1,'the bride’s cover name'],['groomShort',1,'the groom’s cover name'],['date',2,'the date'],['venue',2,'the venue']];
  for(const [k,t,l] of req)if(!String(draft[k]||'').trim()){setTab(t);toast(`Add ${l} first.`);const el=$(`[name=${k}]`);el&&el.focus();return}
  if(JSON.stringify(draft).length>420000){setTab(4);toast('Photos are too large together. Remove one photo and try again.');return}
  const pk=needPkg(draft).id;
  if(editingId){const cur=ORDERS.find(x=>x.id===editingId);if(cur&&rank(pk)<=rank(cur.package)&&!(draft.ownDesign&&!cur.addonOwn)){const upd={...draft,addonOwn:cur.addonOwn,package:cur.package,paid:cur.paid,createdAt:cur.createdAt,updatedAt:Date.now(),slug:cur.slug,status:'live',validUntil:cur.validUntil};delete upd.id;try{await Store.set('orders/'+editingId,upd);toast('Changes saved');selectedId=editingId;draft=null;editingId=null;go('dashboard')}catch(e){toast(e.message)}return}}
  go('checkout');
}

/* ================= checkout ================= */
let pm='fpx',bank='Maybank2u',promo=0;
const slugify=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40);
function slugState(s){if(!/^[a-z0-9](?:[a-z0-9-]{1,38})[a-z0-9]$/.test(s))return'Use 3 to 40 letters, numbers or dashes.';if(s==='contoh'||ORDERS.some(o=>o.slug===s&&o.id!==editingId))return'That link is taken. Try adding the date, like '+s+'-1912.';return''}
function initCheckout(){
  if(!draft){go('create');return}
  const cur=editingId?ORDERS.find(x=>x.id===editingId):null;
  const slugIn=$('#co-slug');slugIn.value=cur?cur.slug:(draft.slug||slugify(`${coverNames(draft).join('-')}`));slugIn.disabled=!!cur;
  const checkSlug=()=>{const s=slugIn.value=slugIn.value.toLowerCase().replace(/[^a-z0-9-]/g,'-').replace(/-+/g,'-').slice(0,40);const m=cur?'':slugState(s);const el=$('#co-slug-msg');el.className=m?'err-msg':'ok-msg';el.textContent=cur?'Your link stays the same.':m||`sanding.my/${s} is available.`;$('#co-pay').disabled=!!m;return!m};
  slugIn.oninput=()=>{draft.slug=slugIn.value;checkSlug()};checkSlug();
  $('#co-title').textContent=cur?'Upgrade your card':'Publish your card';
  const t=themeOf(draft.template);$('#co-swatch').style.background=swatchBg(t);$('#co-names').textContent=`${coverNames(draft).join(' & ')}`;$('#co-meta').textContent=`${t.name} · ${fmtDate(draft.date,'en')}`;
  const drawBanks=()=>{const list=pm==='fpx'?['Maybank2u','CIMB Clicks','Bank Islam','RHB Now','PBe','Hong Leong Connect']:pm==='ewallet'?['Touch ’n Go','GrabPay','Boost','ShopeePay']:[];
    if(!list.includes(bank))bank=list[0]||'';$('#co-banks').innerHTML=list.length?list.map(b=>`<button type="button" data-bank="${esc(b)}" aria-pressed="${b===bank}">${esc(b)}</button>`).join(''):`<p class="muted" style="grid-column:1/-1;font-size:13px">A DuitNow QR code appears after you press Pay. Scan it with any banking app.</p>`;
    $$('[data-bank]').forEach(b=>b.onclick=()=>{bank=b.dataset.bank;drawBanks()})};
  $$('[data-pm]').forEach(b=>{b.setAttribute('aria-pressed',b.dataset.pm===pm);b.onclick=()=>{pm=b.dataset.pm;$$('[data-pm]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawBanks()}});drawBanks();
  const lines=()=>{const p=PKG[needPkg(draft).id];const already=cur?PKG[cur.package].price:0;const addon=draft.ownDesign&&!cur?.addonOwn?ADDON_OWN:0;const sub=p.price-already+addon;const disc=Math.round(sub*promo*100)/100;const total=Math.max(0,sub-disc);
    $('#co-lines').innerHTML=`<div><span>${p.name} package</span><span>RM${p.price.toFixed(2)}</span></div>${cur?`<div><span>Already paid (${PKG[cur.package].name})</span><span>−RM${already.toFixed(2)}</span></div>`:''}${addon?`<div><span>Own design add-on</span><span>RM${addon.toFixed(2)}</span></div>`:''}${disc?`<div><span>Promo SANDING10</span><span>−RM${disc.toFixed(2)}</span></div>`:''}<div class="total"><span>Total</span><span>RM${total.toFixed(2)}</span></div>`;
    $('#co-pay').textContent=`Pay RM${total.toFixed(2)}`;return{p,total}};lines();
  $('#co-apply').onclick=()=>{const c=$('#co-promo').value.trim().toUpperCase();const m=$('#co-promo-msg');if(c==='SANDING10'){promo=.1;m.textContent='10% off applied.';m.className='ok-msg'}else{promo=0;m.textContent=c?'That code isn’t valid.':'Try SANDING10 for 10% off.';m.className=c?'err-msg':'muted'}lines()};
  $('#co-pay').onclick=async()=>{if(!cur&&!checkSlug())return;const {p,total}=lines();const card=$('#co-pay-card');const keep=card.innerHTML;
    card.innerHTML=`<div class="processing"><div class="spinner"></div><b>${pm==='duitnow'?'Waiting for DuitNow payment':'Connecting to '+esc(bank)}…</b><span class="muted" style="font-size:13px">Demo payment, nothing is charged.</span></div>`;$('#co-pay').disabled=true;
    await new Promise(r=>setTimeout(r,1600));
    const id=cur?cur.id:Store.newId();const now=Date.now();
    const order={...draft,slug:cur?cur.slug:slugIn.value,package:p.id,paid:(cur?.paid||0)+total,status:'live',createdAt:cur?.createdAt||now,updatedAt:now,validUntil:(cur?.createdAt||now)+p.days*864e5,payMethod:pm==='duitnow'?'DuitNow QR':bank,addonOwn:!!(draft.ownDesign||cur?.addonOwn)};
    delete order.id;
    try{await Store.set('orders/'+id,order)}catch(e){card.innerHTML=keep;initCheckout();toast(e.message);return}
    ls.set('sanding-draft',null);const done={...order,id};draft=null;editingId=null;promo=0;selectedId=id;showSuccess(done);
  };
}
function showSuccess(o){go('success');const link=`sanding.my/${o.slug}`;const wa=`https://wa.me/?text=${encodeURIComponent(`${greetingFor(o)}. Dengan segala hormatnya kami menjemput anda ke ${T[o.lang].ev[o.eventTitle]} ${coverNames(o).join(' & ')} pada ${fmtDate(o.date,'ms')}. Kad jemputan: https://${link}`)}`;
  $('#success-body').innerHTML=`<div class="seal"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><h1 style="font-size:clamp(30px,5vw,46px)">${esc(coverNames(o).join(' & '))}, your card is live</h1>
  <p class="muted" style="max-width:52ch">${esc(PKG[o.package].name)} package, paid RM${o.paid.toFixed(2)}. Your card stays online until ${new Date(o.validUntil).toLocaleDateString('en-MY',{day:'numeric',month:'long',year:'numeric'})}.</p>
  <div class="linkbox"><code>${esc(link)}</code><button type="button" class="btn btn-ghost btn-sm" id="s-copy">Copy</button></div>
  <p class="muted" style="font-size:12px;max-width:52ch">sanding.my is the production address format. In this prototype, open the card with the button below.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="btn btn-primary" id="s-open">Open card</button><a class="btn btn-ghost" href="${wa}" target="_blank" rel="noopener">Share on WhatsApp</a><a class="btn btn-ghost" href="#dashboard" data-go="dashboard">Go to dashboard</a></div>`;
  $('#s-copy').onclick=()=>copyText('https://'+link,()=>toast('Link copied'));$('#s-open').onclick=()=>{invReturn='success';openLive(o,'')};
}

/* ================= dashboard ================= */
let selectedId=null,dashTab='rsvp',unsubs=[],RSVPS=[],WISHES=[],RESERVES=[],CHECKINS=[],OPENS=[],confirmDel=false,ciQuery='',scanStop=null;
ordersListeners.add(()=>{if(curView==='dashboard')renderDash()});
function renderDash(){
  const body=$('#dash-body');
  if(!ordersReady){body.innerHTML='<div class="processing"><div class="spinner"></div><span class="muted">Loading your cards…</span></div>';return}
  if(!ORDERS.length){unsubs.forEach(f=>f());unsubs=[];body.innerHTML=`<div class="empty" style="margin-block:28px 80px"><h2 style="font-size:28px">No cards yet</h2><p class="muted" style="max-width:46ch">Create your first card and it shows up here with its RSVPs, total pax and ucapan, updating as guests reply.</p><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><a class="btn btn-primary" href="#create" data-go="create">Create a card</a><button class="btn btn-ghost" id="d-sample">Open the sample card</button></div></div>`;$('#d-sample').onclick=()=>{invReturn='dashboard';openInvite(SAMPLE,{closeLabel:'← Back to dashboard'})};return}
  if(!ORDERS.some(o=>o.id===selectedId)){selectedId=ORDERS[0].id;}
  if(!body.querySelector('.dash')){body.innerHTML=`<div class="dash"><div><div class="order-list" id="d-list"></div><a class="btn btn-ghost" href="#create" data-go="create" style="width:100%;margin-top:12px" id="d-new">New card</a></div><div id="d-detail" style="min-width:0"></div></div>`;$('#d-new').addEventListener('click',e=>{e.stopPropagation();e.preventDefault();startNew()})}
  $('#d-list').innerHTML=ORDERS.map(o=>{const t=themeOf(o.template);return`<button type="button" class="order-item" data-sel="${o.id}" aria-current="${o.id===selectedId}"><span class="sw" style="background:${swatchBg(t)}"></span><span class="t"><b>${esc(coverNames(o).join(' & '))}</b><span>${esc(fmtDate(o.date,'en',false))} · ${esc(PKG[o.package]?.name||'')}</span></span></button>`}).join('');
  $$('[data-sel]').forEach(b=>b.onclick=()=>{selectedId=b.dataset.sel;confirmDel=false;renderDash()});
  subscribeDetail();drawDetail();
}
let subFor=null;
function subscribeDetail(){if(subFor===selectedId)return;unsubs.forEach(f=>f());RSVPS=[];WISHES=[];RESERVES=[];CHECKINS=[];OPENS=[];subFor=selectedId;
  const redraw=()=>{if(curView==='dashboard')drawDetail()};
  unsubs=[Store.sub(`orders/${selectedId}/reserves`,l=>{RESERVES=l;redraw()}),Store.sub(`orders/${selectedId}/checkins`,l=>{CHECKINS=l;redraw()}),Store.sub(`orders/${selectedId}/views`,l=>{OPENS=l;redraw()}),Store.sub(`orders/${selectedId}/rsvps`,l=>{RSVPS=l.sort((a,b)=>b.at-a.at);if(curView==='dashboard')drawDetail()}),Store.sub(`orders/${selectedId}/wishes`,l=>{WISHES=l.sort((a,b)=>b.at-a.at);if(curView==='dashboard')drawDetail()})]}
function drawDetail(){
  const o=ORDERS.find(x=>x.id===selectedId);const box=$('#d-detail');if(!o||!box)return;
  if(dashTab!=='checkin'&&scanStop){scanStop();scanStop=null}
  const keepQ=document.activeElement&&document.activeElement.id==='ci-q';const caret=keepQ?document.activeElement.selectionStart:0;
  const inSet=new Set(CHECKINS.map(c=>c.id));
  const yes=RSVPS.filter(r=>r.attending),no=RSVPS.filter(r=>!r.attending),pax=yes.reduce((s,r)=>s+(+r.pax||0),0);
  const days=Math.ceil((new Date(o.date+'T00:00:00+08:00')-new Date())/864e5);const diraja=o.package==='diraja';
  const tot=RSVPS.length||1;
  box.innerHTML=`<div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:start;margin-bottom:18px">
    <div style="min-width:0"><h2 style="font-size:32px">${esc(coverNames(o).join(' & '))}</h2><p class="muted" style="margin-top:6px">${esc(themeOf(o.template).name)} · ${esc(fmtDate(o.date,'en'))} · <span class="tag">${esc(PKG[o.package]?.name)}</span></p><p style="margin-top:6px;font-size:13px"><code>sanding.my/${esc(o.slug)}</code></p></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" id="d-open">Open card</button><button class="btn btn-ghost btn-sm" id="d-edit">Edit</button><button class="btn btn-danger btn-sm" id="d-del">Delete</button></div></div>
    ${confirmDel?`<div class="confirm-bar" style="margin-bottom:16px"><span>Delete this card and its ${RSVPS.length} RSVPs and ${WISHES.length} ucapan? Guests will no longer be able to open it.</span><button class="btn btn-sm" style="background:var(--danger);color:#fff" id="d-del-yes">Delete card</button><button class="btn btn-ghost btn-sm" id="d-del-no">Keep it</button></div>`:''}
    <div class="kpis k6"><div class="kpi"><b>${pax}</b><span>Total pax attending</span></div><div class="kpi"><b>${yes.length}</b><span>RSVPs attending</span></div><div class="kpi"><b>${no.length}</b><span>Can’t attend</span></div><div class="kpi"><b>${OPENS.length}</b><span>Card opens</span></div><div class="kpi"><b>${yes.filter(r=>inSet.has(r.id)).reduce((s,r)=>s+(+r.pax||0),0)}</b><span>Pax checked in</span></div><div class="kpi"><b>${days>0?days:days===0?'Today':'Done'}</b><span>${days>0?'Days to the majlis':'Majlis day'}</span></div></div>
    <div style="margin-block:14px 22px"><div class="meter" role="img" aria-label="${yes.length} attending, ${no.length} not attending"><i style="width:${RSVPS.length?yes.length/tot*100:0}%;background:var(--ok)"></i><i style="width:${RSVPS.length?no.length/tot*100:0}%;background:var(--danger)"></i></div>
      <p class="muted" style="font-size:12px;margin-top:6px">${RSVPS.length} replies${o.deadline?` · RSVP closes ${esc(fmtDate(o.deadline,'en',false))}`:''}${o.maxPax?` · up to ${o.maxPax} pax each`:''}</p></div>
    <div class="tabs" role="tablist"><button role="tab" data-dt="rsvp" aria-selected="${dashTab==='rsvp'}">RSVP list</button><button role="tab" data-dt="wishes" aria-selected="${dashTab==='wishes'}">Ucapan <span class="muted">${WISHES.length}</span></button><button role="tab" data-dt="links" aria-selected="${dashTab==='links'}">Guest links</button>${o.x_wishlist?`<button role="tab" data-dt="wishlist" aria-selected="${dashTab==='wishlist'}">Wishlist <span class="muted">${RESERVES.length}/${(o.wishlist||[]).filter(w=>w.name).length}</span></button>`:''}<button role="tab" data-dt="checkin" aria-selected="${dashTab==='checkin'}">Check-in</button></div>
    <div id="d-tab"></div>`;
  $('#d-open').onclick=()=>{invReturn='dashboard';openLive(o,'')};
  $('#d-edit').onclick=()=>{draft=clone(o);editingId=o.id;tab=0;go('create')};
  $('#d-del').onclick=()=>{confirmDel=true;drawDetail()};
  $('#d-del-no')&&($('#d-del-no').onclick=()=>{confirmDel=false;drawDetail()});
  $('#d-del-yes')&&($('#d-del-yes').onclick=async()=>{try{for(const r of RSVPS)await Store.del(`orders/${o.id}/rsvps/${r.id}`);for(const w of WISHES)await Store.del(`orders/${o.id}/wishes/${w.id}`);for(const [col,l] of [['reserves',RESERVES],['checkins',CHECKINS],["views",OPENS]])for(const x of l)await Store.del(`orders/${o.id}/${col}/${x.id}`);await Store.del('orders/'+o.id);confirmDel=false;subFor=null;toast('Card deleted')}catch(e){toast(e.message)}});
  $$('[data-dt]',box).forEach(b=>b.onclick=()=>{dashTab=b.dataset.dt;drawDetail()});
  const tb=$('#d-tab');
  if(dashTab==='rsvp'){
    tb.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px"><span class="muted" style="font-size:13px">Newest first</span><span style="display:flex;gap:8px;align-items:center">${diraja?'':'<span class="tag brass">Diraja</span>'}<button class="btn btn-ghost btn-sm" id="d-csv" ${diraja&&RSVPS.length?'':'disabled'}>Export CSV</button></span></div>
      ${RSVPS.length?`<div class="tbl-wrap"><table><thead><tr><th>Name</th><th>Phone</th><th>Reply</th><th style="text-align:right">Pax</th><th>Note</th><th>Via link</th><th>Received</th><th></th></tr></thead><tbody>${RSVPS.map(r=>`<tr><td>${esc(r.name)}</td><td>${esc(r.phone)}</td><td><span class="pill ${r.attending?'yes':'no'}">${r.attending?'Attending':'Can’t attend'}</span></td><td style="text-align:right;font-variant-numeric:tabular-nums">${r.attending?r.pax:'—'}</td><td>${esc(r.note||'—')}</td><td>${esc(r.guestLink||'—')}</td><td>${new Date(r.at).toLocaleString('en-MY',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'})}</td><td>${diraja&&r.attending&&r.phone?`<a class="btn btn-ghost btn-sm" href="${remindUrl(o,r)}" target="_blank" rel="noopener">Remind</a>`:''}</td></tr>`).join('')}</tbody></table></div>${diraja?'':'<p class="muted" style="font-size:12px;margin-top:8px"><span class="tag brass">Diraja</span> adds a WhatsApp reminder button for every attending guest.</p>'}`
      :`<div class="empty"><b>No replies yet</b><p class="muted" style="max-width:44ch">Replies appear here as soon as guests send them from the card. Open the card and send a test reply to see it.</p></div>`}`;
    $('#d-csv').onclick=()=>exportCsv(o);
  }else if(dashTab==='wishes'){
    tb.innerHTML=WISHES.length?`<div class="wish-admin">${WISHES.map(w=>`<div class="w ${w.hidden?'hidden-w':''}"><div style="min-width:0"><b>${esc(w.name)}</b> <span class="muted" style="font-size:12px">${new Date(w.at).toLocaleDateString('en-MY',{day:'numeric',month:'short'})}${w.hidden?' · hidden from guests':''}</span><p style="margin-top:4px;overflow-wrap:anywhere">${esc(w.msg)}</p></div><div style="display:flex;gap:6px;flex:0 0 auto"><button class="btn btn-ghost btn-sm" data-hide="${w.id}">${w.hidden?'Show':'Hide'}</button><button class="btn btn-danger btn-sm" data-wdel="${w.id}">Delete</button></div></div>`).join('')}</div>`
      :`<div class="empty"><b>No ucapan yet</b><p class="muted">Wishes from guests appear here. Hide any message before others see it.</p></div>`;
    $$('[data-hide]',tb).forEach(b=>b.onclick=async()=>{const w=WISHES.find(x=>x.id===b.dataset.hide);try{await Store.update(`orders/${o.id}/wishes/${w.id}`,{hidden:!w.hidden})}catch(e){toast(e.message)}});
    $$('[data-wdel]',tb).forEach(b=>b.onclick=async()=>{try{await Store.del(`orders/${o.id}/wishes/${b.dataset.wdel}`);toast('Ucapan deleted')}catch(e){toast(e.message)}});
  }else if(dashTab==='wishlist'){
    const items=(o.wishlist||[]).filter(w=>w.name);const R=Object.fromEntries(RESERVES.map(r=>[r.id,r]));
    tb.innerHTML=`<div class="tbl-wrap"><table><thead><tr><th>Item</th><th>Price</th><th>Reserved by</th><th>When</th><th></th></tr></thead><tbody>${items.map((w,i)=>{const r=R['i'+i];return`<tr><td>${esc(w.name)}</td><td>${esc(w.price||'—')}</td><td>${r?`<span class="pill yes">${esc(r.name)}</span>`:'<span class="muted">Available</span>'}</td><td>${r?new Date(r.at).toLocaleDateString('en-MY',{day:'numeric',month:'short'}):'—'}</td><td>${r?`<button class="btn btn-ghost btn-sm" data-free="i${i}">Release</button>`:''}</td></tr>`}).join('')}</tbody></table></div>`;
    $$('[data-free]',tb).forEach(b=>b.onclick=async()=>{try{await Store.del(`orders/${o.id}/reserves/${b.dataset.free}`);toast('Item released')}catch(e){toast(e.message)}});
  }else if(dashTab==='checkin'){
    if(!diraja||!o.x_epass){tb.innerHTML=`<div class="empty"><span class="tag brass">Diraja</span><b>Check guests in on the day</b><p class="muted" style="max-width:48ch">Every attending guest gets an e-pass with a QR code. At the reception desk, scan it with this page or search by name or code, and watch the pax count fill up. Turn on the e-pass in Edit, then Extras, then RSVP.</p></div>`;return}
    const q=ciQuery.trim().toLowerCase();const list=yes.filter(r=>!q||r.name.toLowerCase().includes(q)||rsvpCode(r.id).toLowerCase().includes(q)||String(r.phone||'').includes(q));
    const canScan='BarcodeDetector' in window&&navigator.mediaDevices?.getUserMedia;
    tb.innerHTML=`<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px"><input id="ci-q" type="search" placeholder="Search name, phone or 6-letter code" value="${esc(ciQuery)}" style="flex:1;min-width:200px">${canScan?`<button class="btn btn-primary btn-sm" id="ci-scan">${scanStop?'Stop camera':'Scan QR'}</button>`:''}</div>
      <div id="ci-cam"></div>
      <p class="muted" style="font-size:13px;margin-bottom:10px">${CHECKINS.length} of ${yes.length} parties arrived</p>
      ${list.length?`<div class="tbl-wrap"><table><thead><tr><th>Code</th><th>Name</th><th style="text-align:right">Pax</th><th>Status</th><th></th></tr></thead><tbody>${list.map(r=>{const isIn=inSet.has(r.id);return`<tr><td><code>${rsvpCode(r.id)}</code></td><td>${esc(r.name)}</td><td style="text-align:right">${r.pax}</td><td>${isIn?'<span class="pill in">Arrived</span>':'<span class="muted">Expected</span>'}</td><td><button class="btn ${isIn?'btn-ghost':'btn-primary'} btn-sm" data-ci="${r.id}">${isIn?'Undo':'Check in'}</button></td></tr>`}).join('')}</tbody></table></div>`:`<div class="empty"><b>${q?'No guest matches':'No attending guests yet'}</b></div>`}`;
    const qi=$('#ci-q');qi.oninput=()=>{ciQuery=qi.value;drawDetail()};if(keepQ){qi.focus();qi.setSelectionRange(caret,caret)}
    $$('[data-ci]',tb).forEach(b=>b.onclick=()=>toggleCheckin(o,b.dataset.ci,inSet.has(b.dataset.ci)));
    $('#ci-scan')&&($('#ci-scan').onclick=()=>{if(scanStop){scanStop();scanStop=null;drawDetail()}else startScan(o)});
    if(scanStop&&!$('#ci-cam video')){scanStop();scanStop=null}
  }else{
    const names=ls.get('sanding-guests-'+o.id,'');
    tb.innerHTML=diraja?`<div class="field"><label for="d-guests">Guest names, one per line</label><textarea id="d-guests" rows="5" placeholder="Pak Long Hashim & keluarga&#10;Cikgu Rohani">${esc(names)}</textarea></div><div id="d-glinks" class="rows" style="margin-top:14px"></div>`
      :`<div class="empty"><span class="tag brass">Diraja</span><b>Personal guest links</b><p class="muted" style="max-width:46ch">Put each guest's name on the cover of their card. Upgrade this card to Diraja from Edit, then Extras.</p></div>`;
    const draw=()=>{const list=$('#d-guests').value.split('\n').map(s=>s.trim()).filter(Boolean);ls.set('sanding-guests-'+o.id,$('#d-guests').value);
      $('#d-glinks').innerHTML=list.map((n,i)=>{const tok=n.replace(/[^A-Za-z0-9.\- ]/g,'').trim().replace(/\s+/g,'_');const link=`sanding.my/${o.slug}~${tok}`;const wa=`https://wa.me/?text=${encodeURIComponent(`Kepada ${n}, dengan segala hormatnya kami menjemput anda ke majlis kami. Kad jemputan: https://${link}`)}`;
        return`<div class="order-item" style="cursor:default"><span class="t"><b>${esc(n)}</b><span>${esc(link)}</span></span><button class="btn btn-ghost btn-sm" data-gopen="${esc(tok)}">Preview</button><a class="btn btn-ghost btn-sm" href="${wa}" target="_blank" rel="noopener">WhatsApp</a></div>`}).join('')||'<p class="muted" style="font-size:13px">Links appear here as you type names.</p>';
      $$('[data-gopen]').forEach(b=>b.onclick=()=>{invReturn='dashboard';openLive(o,b.dataset.gopen.replace(/_/g,' '))})};
    if(diraja){$('#d-guests').oninput=draw;draw()}
  }
}
function remindUrl(o,r){const L=T[o.lang]||T.ms;const msg=o.lang==='en'?`Hi ${r.name}, a reminder for ${L.ev[o.eventTitle]} ${coverNames(o).join(' & ')} on ${fmtDate(o.date,'en')} at ${o.venue}, ${fmtTime(o.start,'en')}. Your guest code: ${rsvpCode(r.id)}. Card: https://sanding.my/${o.slug}`:`${greetingFor(o)} ${r.name}. Peringatan mesra untuk ${L.ev[o.eventTitle]} ${coverNames(o).join(' & ')} pada ${fmtDate(o.date,'ms')}, ${fmtTime(o.start,'ms')} di ${o.venue}. Kod tetamu anda: ${rsvpCode(r.id)}. Kad: https://sanding.my/${o.slug}`;return`https://wa.me/${waNum(r.phone)}?text=${encodeURIComponent(msg)}`}
async function toggleCheckin(o,id,isIn){try{if(isIn)await Store.del(`orders/${o.id}/checkins/${id}`);else{await Store.set(`orders/${o.id}/checkins/${id}`,{at:Date.now()});const r=RSVPS.find(x=>x.id===id);r&&toast(`${r.name} checked in, ${r.pax} pax`)}}catch(e){toast(e.message)}}
async function startScan(o){const cam=$('#ci-cam');let stream;try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}})}catch(e){toast('Camera not available. Search by code instead.');return}
  cam.innerHTML='<div class="scan-box"><video playsinline muted></video><span class="muted" style="font-size:13px">Point the camera at the guest’s pass</span></div>';const v=$('video',cam);v.srcObject=stream;await v.play().catch(()=>{});
  const det=new BarcodeDetector({formats:['qr_code']});let alive=true,last='';
  scanStop=()=>{alive=false;stream.getTracks().forEach(t=>t.stop())};$('#ci-scan')&&($('#ci-scan').textContent='Stop camera');
  const tick=async()=>{if(!alive)return;try{const c=await det.detect(v);const raw=c[0]?.rawValue||'';if(raw&&raw!==last){last=raw;const id=raw.split(':').pop();const r=RSVPS.find(x=>x.id===id);
      if(!r||!raw.startsWith('SANDING:'+o.slug+':'))toast('That pass is not for this card');else if(CHECKINS.some(c=>c.id===id))toast(`${r.name} is already checked in`);else await toggleCheckin(o,id,false)}}catch(e){}setTimeout(tick,350)};tick()}
async function exportCsv(o){const q=s=>`"${String(s??'').replace(/"/g,'""')}"`;
  const inSet=new Set(CHECKINS.map(c=>c.id));
  const csv=['Name,Phone,Reply,Pax,Note,Code,Checked in,Guest link,Received',...RSVPS.map(r=>[r.name,r.phone,r.attending?'Attending':'Not attending',r.attending?r.pax:0,r.note||'',rsvpCode(r.id),inSet.has(r.id)?'Yes':'',r.guestLink||'',new Date(r.at).toISOString()].map(q).join(','))].join('\n');
  const fname=`rsvp-${o.slug}.csv`;
  try{const dl=(window.claude&&window.claude.use)?await window.claude.use('downloads'):null;if(dl){await dl.save({filename:fname,data:csv});toast('Guest list saved');return}}catch(e){if(e&&e.code==='declined')return}
  copyText(csv,()=>toast('CSV copied to clipboard. Paste it into a spreadsheet.'));
}

/* ================= boot ================= */
route();
</script>
