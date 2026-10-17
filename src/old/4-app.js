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
 {id:'asas',name:'Asas',price:29,days:60,feats:['Any of the 10 designs','Bahasa Melayu or English','Date, venue, Waze & Google Maps','Countdown & add to calendar','RSVP with pax limit and deadline','Online for 60 days']},
 {id:'premium',name:'Premium',price:59,days:120,feats:['Everything in Asas','Ucapan wall with moderation','Background music','Photo gallery','Salam kaut & DuitNow QR','Contacts with WhatsApp buttons','Online for 120 days']},
 {id:'diraja',name:'Diraja',price:99,days:365,feats:['Everything in Premium','Personal guest links with names','Custom accent colour','Guest list CSV export','Online for 1 year']}];
const PKG=Object.fromEntries(PKGS.map(p=>[p.id,p]));const rank=id=>PKGS.findIndex(p=>p.id===id);
function needPkg(o){const why={diraja:[],premium:[]};if(o.x_guestlinks)why.diraja.push('guest links');if(o.useAccent)why.diraja.push('custom colour');
  [['x_wishes','ucapan'],['x_music','music'],['x_gallery','gallery'],['x_gift','salam kaut'],['x_contacts','contacts']].forEach(([k,l])=>o[k]&&why.premium.push(l));
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
  openInvite(o,{guest,
    rsvpDone:()=>ls.get(key,null),
    onRsvp:async d=>{if(o.deadline&&new Date(o.deadline+'T23:59:59+08:00')<new Date())throw new Error(T[o.lang].closed);await Store.add(`orders/${o.id}/rsvps`,d);ls.set(key,d.name)},
    onWish:d=>Store.add(`orders/${o.id}/wishes`,d),
    subscribeWishes:o.x_wishes?cb=>Store.sub(`orders/${o.id}/wishes`,cb):null});
}

/* ================= home ================= */
let heroTimer=null,heroInit=false;
function initHome(){
  if(!$('#pricing-cards').children.length)$('#pricing-cards').innerHTML=PKGS.map((p,i)=>`<div class="plan ${i===1?'best':''}"><div style="display:flex;justify-content:space-between;align-items:center"><h3>${p.name}</h3>${i===1?'<span class="tag">Most chosen</span>':''}</div><div class="price">RM${p.price}<small> one-time</small></div><ul>${p.feats.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><a href="#create" data-go="create" class="btn ${i===1?'btn-primary':'btn-ghost'}">Start with ${p.name}</a></div>`).join('');
  if(heroInit)return;heroInit=true;
  const st=$('#hero-stage');
  st.innerHTML=`<div class="phone behind"><div class="screen"></div><div class="notch"></div></div><div class="phone behind2"><div class="screen"></div><div class="notch"></div></div><div class="phone" id="hero-main"><div class="screen"></div><div class="notch"></div></div><p class="hero-caption" id="hero-cap"></p>`;
  const [b1,b2,main]=$$('.screen',st);
  renderInvite(b1,{...SAMPLE,template:'bungaraya'},{mode:'thumb'});renderInvite(b2,{...SAMPLE,template:'zamrud'},{mode:'thumb'});
  let i=0;const order=['songket','malam','sage','noir','nyonya','lavender','moden','kraft'];
  const paint=()=>{const t=order[i%order.length];renderInvite(main,{...SAMPLE,template:t},{mode:'preview',autoplay:true});$('#hero-cap').innerHTML=`${esc(THEME[t].name)} · sample card. Tap <b>Buka Jemputan</b> to explore.`};paint();
  heroTimer=setInterval(()=>{if(curView!=='home'||document.hidden)return;i++;paint()},4200);
  main.addEventListener('pointerdown',()=>{clearInterval(heroTimer)},{once:true});
}

/* ================= designs ================= */
let dFilter='all';
function initDesigns(){
  $('#filters').innerHTML=CATS.map(([k,l])=>`<button type="button" class="chip" data-f="${k}" aria-pressed="${k===dFilter}">${l}</button>`).join('');
  $$('#filters [data-f]').forEach(b=>b.onclick=()=>{dFilter=b.dataset.f;initDesigns()});
  const grid=$('#design-grid');const list=THEMES.filter(t=>dFilter==='all'||t.cat===dFilter);
  grid.innerHTML=list.map(t=>`<article class="dcard"><div class="thumb" data-prev="${t.id}" role="button" tabindex="0" aria-label="Preview ${esc(t.name)}"><div class="scale"></div><div class="hover"><span class="btn btn-sm" style="background:#fff;color:#111">Preview</span></div></div>
    <div class="meta"><div style="min-width:0"><h3>${esc(t.name)}</h3><p class="muted">${esc(t.desc)}</p></div><button type="button" class="btn btn-ghost btn-sm" data-use="${t.id}">Use</button></div></article>`).join('');
  $$('.dcard',grid).forEach((c,ix)=>{const sc=$('.scale',c);renderInvite(sc,{...SAMPLE,template:list[ix].id},{mode:'thumb'});});
  fitThumbs();
  $$('[data-prev]',grid).forEach(b=>{const fn=()=>{invReturn='designs';openInvite({...SAMPLE,template:b.dataset.prev},{closeLabel:'← Back to designs'})};b.onclick=fn;b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn()}}});
  $$('[data-use]',grid).forEach(b=>b.onclick=()=>{startNew(b.dataset.use)});
}
const thumbRO=new ResizeObserver(es=>es.forEach(e=>{const s=$('.scale',e.target);if(s)s.style.transform=`scale(${e.contentRect.width/360})`}));
function fitThumbs(){$$('.dcard .thumb').forEach(t=>thumbRO.observe(t))}

/* ================= editor ================= */
let draft=null,editingId=null,tab=0,previewOpened=false;
const blankExtras={photos:[],qr:'',contacts:[],schedule:[]};
function startNew(tpl){editingId=null;draft=ls.get('sanding-draft',null)||{...clone(SAMPLE),id:null,slug:''};if(tpl)draft.template=tpl;tab=0;go('create')}
function initEditor(){
  if(!draft){draft=ls.get('sanding-draft',null)||{...clone(SAMPLE),id:null,slug:''};editingId=null}
  draft={...blankExtras,...draft};
  $('#ed-title').textContent=editingId?'Edit card':'Create your card';
  $('#ed-eyebrow').textContent=editingId?`Editing sanding.my/${draft.slug}`:'New card · filled with example details, replace them with yours';
  $('#f-bank').innerHTML=BANKS.map(b=>`<option>${esc(b)}</option>`).join('');
  fillForm();setTab(tab);paintPreview(true);
}
function fillForm(){const f=$('#ed-form');for(const el of f.elements){if(!el.name)continue;const v=draft[el.name];if(el.type==='checkbox')el.checked=!!v;else if(v!=null)el.value=v}
  renderTplPick();renderSched();renderContacts();renderUploads();renderMusicPick();syncDisabled()}
function syncDisabled(){[['x_rsvp','x-rsvp'],['x_music','x-music'],['x_gallery','x-gallery'],['x_gift','x-gift'],['x_contacts','x-contacts'],['useAccent','f-useAccent']].forEach(([k,id])=>{const body=$('#'+id).closest('.toggle-row').querySelector('.body');$$('.fieldset,.uploads,#music-pick,.rows,input[type=color]',body).forEach(x=>x.style.opacity=draft[k]?'1':'.45')})}
let saveT=null,pvT=null;
function changed(){clearTimeout(saveT);saveT=setTimeout(()=>{if(!editingId)ls.set('sanding-draft',draft)},400);clearTimeout(pvT);pvT=setTimeout(()=>paintPreview(),220);syncDisabled();if(tab===4)renderReview()}
$('#ed-form').addEventListener('input',e=>{const el=e.target;if(!el.name)return;draft[el.name]=el.type==='checkbox'?el.checked:el.type==='number'?+el.value:el.value;if(el.name==='x_music'&&!el.checked)Music.stop();changed()});
$('#ed-form').addEventListener('submit',e=>e.preventDefault());
function paintPreview(){const host=$('#ed-preview');const old=$('.scroller',host);const st=old?old.scrollTop:0;const opened=$('.inv',host)?.classList.contains('opened');
  renderInvite(host,draft,{mode:'preview',opened:opened??previewOpened});const sc=$('.scroller',host);if(sc)sc.scrollTop=st}
$('#pv-cover').onclick=()=>{$('#ed-preview .inv')?.reopen?.()};
$('#pv-full').onclick=$('#mobile-preview').onclick=()=>{invReturn='create';openInvite(clone(draft),{closeLabel:'← Back to editor',guest:draft.x_guestlinks?(draft.lang==='en'?'Mr Ahmad & family':'Encik Ahmad & keluarga'):''})};
function renderTplPick(){$('#tpl-pick').innerHTML=THEMES.map(t=>`<button type="button" data-tpl="${t.id}" aria-pressed="${draft.template===t.id}"><div class="sw" style="background:${swatchBg(t)};color:${t.v.names};font-family:${t.f.script.replace(/"/g,"'")}">${esc((draft.brideShort||'A')[0])}&amp;${esc((draft.groomShort||'A')[0])}</div><div class="nm">${esc(t.name)}</div></button>`).join('');
  $('#tpl-current').textContent=THEME[draft.template]?.desc||'';
  $$('[data-tpl]').forEach(b=>b.onclick=()=>{draft.template=b.dataset.tpl;renderTplPick();changed()})}
function renderMusicPick(){const box=$('#music-pick');box.innerHTML=Object.entries(Music.tracks).map(([k,t])=>`<button type="button" class="chip" data-trk="${k}" aria-pressed="${draft.music===k}">${esc(t.label)}</button>`).join('')+`<button type="button" class="btn btn-ghost btn-sm" id="trk-play">${Music.playing()?'Stop':'Play'}</button>`;
  $$('[data-trk]',box).forEach(b=>b.onclick=()=>{draft.music=b.dataset.trk;if(!draft.x_music){draft.x_music=true;$('#x-music').checked=true}if(Music.playing())Music.play(draft.music);renderMusicPick();changed()});
  $('#trk-play').onclick=()=>{Music.playing()?Music.stop():Music.play(draft.music||'musicbox');renderMusicPick()}}
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
  const g=$('#gal-uploads');g.innerHTML=draft.photos.map((p,i)=>`<div class="ph"><img src="${p}" alt="Photo ${i+1}"><button type="button" data-rm="${i}" aria-label="Remove photo">✕</button></div>`).join('')+(draft.photos.length<3?`<label class="add" for="gal-in">Add photo<input type="file" id="gal-in" accept="image/*"></label>`:'');
  $$('[data-rm]',g).forEach(b=>b.onclick=()=>{draft.photos.splice(+b.dataset.rm,1);renderUploads();changed()});
  $('#gal-in')?.addEventListener('change',async e=>{e.stopPropagation();const f=e.target.files[0];if(!f)return;try{draft.photos.push(await shrink(f,640,'image/jpeg',.68));if(!draft.x_gallery){draft.x_gallery=true;$('#x-gallery').checked=true}renderUploads();changed()}catch(err){toast(err.message)}});
  const q=$('#qr-upload');q.innerHTML=draft.qr?`<div class="ph"><img src="${draft.qr}" alt="DuitNow QR"><button type="button" data-rmqr aria-label="Remove QR">✕</button></div>`:`<label class="add" for="qr-in">Upload QR<input type="file" id="qr-in" accept="image/*"></label>`;
  $('[data-rmqr]',q)?.addEventListener('click',()=>{draft.qr='';renderUploads();changed()});
  $('#qr-in')?.addEventListener('change',async e=>{e.stopPropagation();const f=e.target.files[0];if(!f)return;try{draft.qr=await shrink(f,320,'image/png');renderUploads();changed()}catch(err){toast(err.message)}});
}
function setTab(i){tab=i;$$('#ed-tabs [data-tab]').forEach(b=>b.setAttribute('aria-selected',+b.dataset.tab===i));$$('#ed-form .panel').forEach(p=>p.classList.toggle('on',+p.dataset.panel===i));
  $('#ed-prev').style.visibility=i?'visible':'hidden';
  if(i===4)renderReview();else $('#ed-next').textContent='Next'}
$$('#ed-tabs [data-tab]').forEach(b=>b.onclick=()=>setTab(+b.dataset.tab));
$('#ed-prev').onclick=()=>{setTab(Math.max(0,tab-1));window.scrollTo({top:0})};
$('#ed-next').onclick=()=>{if(tab<4){setTab(tab+1);window.scrollTo({top:0});return}proceed()};
function renderReview(){const o=draft,L=T[o.lang],pk=needPkg(o),p=PKG[pk.id];
  const extras=[['x_rsvp','RSVP'],['x_wishes','Ucapan'],['x_music','Music'],['x_gallery','Gallery'],['x_gift','Salam kaut'],['x_contacts','Contacts'],['x_guestlinks','Guest links']].filter(([k])=>o[k]).map(([,l])=>l).join(', ')||'None';
  $('#review-dl').innerHTML=[['Design',THEME[o.template].name],['Couple',`${o.brideShort||'—'} & ${o.groomShort||'—'}`],['Event',L.ev[o.eventTitle]],['Date',fmtDate(o.date,o.lang)||'—'],['Time',`${fmtTime(o.start,o.lang)} – ${fmtTime(o.end,o.lang)}`],['Venue',o.venue||'—'],['Language',o.lang==='en'?'English':'Bahasa Melayu'],['Extras',extras]].map(([a,b])=>`<dt>${a}</dt><dd>${esc(b)}</dd>`).join('');
  $('#pkg-name').textContent=p.name;
  const paidPkg=editingId?ORDERS.find(x=>x.id===editingId)?.package:null;
  if(editingId&&rank(pk.id)<=rank(paidPkg)){$('#pkg-price').textContent='Paid';$('#pkg-why').textContent=`Your ${PKG[paidPkg].name} package covers these changes.`;$('#pkg-name').textContent=PKG[paidPkg].name;$('#ed-next').textContent='Save changes'}
  else if(editingId){$('#pkg-price').textContent=`+RM${p.price-PKG[paidPkg].price}`;$('#pkg-why').textContent=`Upgrade needed for ${pk.why.join(', ')}`;$('#ed-next').textContent='Upgrade and save'}
  else{$('#pkg-price').textContent=`RM${p.price}`;$('#pkg-why').textContent=pk.why.length?`Needed for ${pk.why.join(', ')}`:'Covers everything you turned on';$('#ed-next').textContent='Continue to payment'}}
async function proceed(){
  const req=[['brideShort',1,'the bride’s cover name'],['groomShort',1,'the groom’s cover name'],['date',2,'the date'],['venue',2,'the venue']];
  for(const [k,t,l] of req)if(!String(draft[k]||'').trim()){setTab(t);toast(`Add ${l} first.`);const el=$(`[name=${k}]`);el&&el.focus();return}
  if(JSON.stringify(draft).length>240000){setTab(3);toast('Photos are too large together. Remove one photo and try again.');return}
  const pk=needPkg(draft).id;
  if(editingId){const cur=ORDERS.find(x=>x.id===editingId);if(cur&&rank(pk)<=rank(cur.package)){const upd={...draft,package:cur.package,paid:cur.paid,createdAt:cur.createdAt,updatedAt:Date.now(),slug:cur.slug,status:'live',validUntil:cur.validUntil};delete upd.id;try{await Store.set('orders/'+editingId,upd);toast('Changes saved');selectedId=editingId;draft=null;editingId=null;go('dashboard')}catch(e){toast(e.message)}return}}
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
  const t=THEME[draft.template];$('#co-swatch').style.background=swatchBg(t);$('#co-names').textContent=`${coverNames(draft).join(' & ')}`;$('#co-meta').textContent=`${t.name} · ${fmtDate(draft.date,'en')}`;
  const drawBanks=()=>{const list=pm==='fpx'?['Maybank2u','CIMB Clicks','Bank Islam','RHB Now','PBe','Hong Leong Connect']:pm==='ewallet'?['Touch ’n Go','GrabPay','Boost','ShopeePay']:[];
    if(!list.includes(bank))bank=list[0]||'';$('#co-banks').innerHTML=list.length?list.map(b=>`<button type="button" data-bank="${esc(b)}" aria-pressed="${b===bank}">${esc(b)}</button>`).join(''):`<p class="muted" style="grid-column:1/-1;font-size:13px">A DuitNow QR code appears after you press Pay. Scan it with any banking app.</p>`;
    $$('[data-bank]').forEach(b=>b.onclick=()=>{bank=b.dataset.bank;drawBanks()})};
  $$('[data-pm]').forEach(b=>{b.setAttribute('aria-pressed',b.dataset.pm===pm);b.onclick=()=>{pm=b.dataset.pm;$$('[data-pm]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawBanks()}});drawBanks();
  const lines=()=>{const p=PKG[needPkg(draft).id];const already=cur?PKG[cur.package].price:0;const sub=p.price-already;const disc=Math.round(sub*promo*100)/100;const total=Math.max(0,sub-disc);
    $('#co-lines').innerHTML=`<div><span>${p.name} package</span><span>RM${p.price.toFixed(2)}</span></div>${cur?`<div><span>Already paid (${PKG[cur.package].name})</span><span>−RM${already.toFixed(2)}</span></div>`:''}${disc?`<div><span>Promo SANDING10</span><span>−RM${disc.toFixed(2)}</span></div>`:''}<div class="total"><span>Total</span><span>RM${total.toFixed(2)}</span></div>`;
    $('#co-pay').textContent=`Pay RM${total.toFixed(2)}`;return{p,total}};lines();
  $('#co-apply').onclick=()=>{const c=$('#co-promo').value.trim().toUpperCase();const m=$('#co-promo-msg');if(c==='SANDING10'){promo=.1;m.textContent='10% off applied.';m.className='ok-msg'}else{promo=0;m.textContent=c?'That code isn’t valid.':'Try SANDING10 for 10% off.';m.className=c?'err-msg':'muted'}lines()};
  $('#co-pay').onclick=async()=>{if(!cur&&!checkSlug())return;const {p,total}=lines();const card=$('#co-pay-card');const keep=card.innerHTML;
    card.innerHTML=`<div class="processing"><div class="spinner"></div><b>${pm==='duitnow'?'Waiting for DuitNow payment':'Connecting to '+esc(bank)}…</b><span class="muted" style="font-size:13px">Demo payment, nothing is charged.</span></div>`;$('#co-pay').disabled=true;
    await new Promise(r=>setTimeout(r,1600));
    const id=cur?cur.id:Store.newId();const now=Date.now();
    const order={...draft,slug:cur?cur.slug:slugIn.value,package:p.id,paid:(cur?.paid||0)+total,status:'live',createdAt:cur?.createdAt||now,updatedAt:now,validUntil:(cur?.createdAt||now)+p.days*864e5,payMethod:pm==='duitnow'?'DuitNow QR':bank};
    delete order.id;
    try{await Store.set('orders/'+id,order)}catch(e){card.innerHTML=keep;initCheckout();toast(e.message);return}
    ls.set('sanding-draft',null);const done={...order,id};draft=null;editingId=null;promo=0;selectedId=id;showSuccess(done);
  };
}
function showSuccess(o){go('success');const link=`sanding.my/${o.slug}`;const wa=`https://wa.me/?text=${encodeURIComponent(`Assalamualaikum. Dengan segala hormatnya kami menjemput anda ke ${T[o.lang].ev[o.eventTitle]} ${coverNames(o).join(' & ')} pada ${fmtDate(o.date,'ms')}. Kad jemputan: https://${link}`)}`;
  $('#success-body').innerHTML=`<div class="seal"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><h1 style="font-size:clamp(30px,5vw,46px)">${esc(coverNames(o).join(' & '))}, your card is live</h1>
  <p class="muted" style="max-width:52ch">${esc(PKG[o.package].name)} package, paid RM${o.paid.toFixed(2)}. Your card stays online until ${new Date(o.validUntil).toLocaleDateString('en-MY',{day:'numeric',month:'long',year:'numeric'})}.</p>
  <div class="linkbox"><code>${esc(link)}</code><button type="button" class="btn btn-ghost btn-sm" id="s-copy">Copy</button></div>
  <p class="muted" style="font-size:12px;max-width:52ch">sanding.my is the production address format. In this prototype, open the card with the button below.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="btn btn-primary" id="s-open">Open card</button><a class="btn btn-ghost" href="${wa}" target="_blank" rel="noopener">Share on WhatsApp</a><a class="btn btn-ghost" href="#dashboard" data-go="dashboard">Go to dashboard</a></div>`;
  $('#s-copy').onclick=()=>copyText('https://'+link,()=>toast('Link copied'));$('#s-open').onclick=()=>{invReturn='success';openLive(o,'')};
}

/* ================= dashboard ================= */
let selectedId=null,dashTab='rsvp',unsubs=[],RSVPS=[],WISHES=[],confirmDel=false;
ordersListeners.add(()=>{if(curView==='dashboard')renderDash()});
function renderDash(){
  const body=$('#dash-body');
  if(!ordersReady){body.innerHTML='<div class="processing"><div class="spinner"></div><span class="muted">Loading your cards…</span></div>';return}
  if(!ORDERS.length){unsubs.forEach(f=>f());unsubs=[];body.innerHTML=`<div class="empty" style="margin-block:28px 80px"><h2 style="font-size:28px">No cards yet</h2><p class="muted" style="max-width:46ch">Create your first card and it shows up here with its RSVPs, total pax and ucapan, updating as guests reply.</p><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><a class="btn btn-primary" href="#create" data-go="create">Create a card</a><button class="btn btn-ghost" id="d-sample">Open the sample card</button></div></div>`;$('#d-sample').onclick=()=>{invReturn='dashboard';openInvite(SAMPLE,{closeLabel:'← Back to dashboard'})};return}
  if(!ORDERS.some(o=>o.id===selectedId)){selectedId=ORDERS[0].id;}
  if(!body.querySelector('.dash')){body.innerHTML=`<div class="dash"><div><div class="order-list" id="d-list"></div><a class="btn btn-ghost" href="#create" data-go="create" style="width:100%;margin-top:12px" id="d-new">New card</a></div><div id="d-detail" style="min-width:0"></div></div>`;$('#d-new').addEventListener('click',e=>{e.stopPropagation();e.preventDefault();startNew()})}
  $('#d-list').innerHTML=ORDERS.map(o=>{const t=THEME[o.template]||THEMES[0];return`<button type="button" class="order-item" data-sel="${o.id}" aria-current="${o.id===selectedId}"><span class="sw" style="background:${swatchBg(t)}"></span><span class="t"><b>${esc(coverNames(o).join(' & '))}</b><span>${esc(fmtDate(o.date,'en',false))} · ${esc(PKG[o.package]?.name||'')}</span></span></button>`}).join('');
  $$('[data-sel]').forEach(b=>b.onclick=()=>{selectedId=b.dataset.sel;confirmDel=false;renderDash()});
  subscribeDetail();drawDetail();
}
let subFor=null;
function subscribeDetail(){if(subFor===selectedId)return;unsubs.forEach(f=>f());RSVPS=[];WISHES=[];subFor=selectedId;
  unsubs=[Store.sub(`orders/${selectedId}/rsvps`,l=>{RSVPS=l.sort((a,b)=>b.at-a.at);if(curView==='dashboard')drawDetail()}),Store.sub(`orders/${selectedId}/wishes`,l=>{WISHES=l.sort((a,b)=>b.at-a.at);if(curView==='dashboard')drawDetail()})]}
function drawDetail(){
  const o=ORDERS.find(x=>x.id===selectedId);const box=$('#d-detail');if(!o||!box)return;
  const yes=RSVPS.filter(r=>r.attending),no=RSVPS.filter(r=>!r.attending),pax=yes.reduce((s,r)=>s+(+r.pax||0),0);
  const days=Math.ceil((new Date(o.date+'T00:00:00+08:00')-new Date())/864e5);const diraja=o.package==='diraja';
  const tot=RSVPS.length||1;
  box.innerHTML=`<div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:start;margin-bottom:18px">
    <div style="min-width:0"><h2 style="font-size:32px">${esc(coverNames(o).join(' & '))}</h2><p class="muted" style="margin-top:6px">${esc(THEME[o.template]?.name)} · ${esc(fmtDate(o.date,'en'))} · <span class="tag">${esc(PKG[o.package]?.name)}</span></p><p style="margin-top:6px;font-size:13px"><code>sanding.my/${esc(o.slug)}</code></p></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" id="d-open">Open card</button><button class="btn btn-ghost btn-sm" id="d-edit">Edit</button><button class="btn btn-danger btn-sm" id="d-del">Delete</button></div></div>
    ${confirmDel?`<div class="confirm-bar" style="margin-bottom:16px"><span>Delete this card and its ${RSVPS.length} RSVPs and ${WISHES.length} ucapan? Guests will no longer be able to open it.</span><button class="btn btn-sm" style="background:var(--danger);color:#fff" id="d-del-yes">Delete card</button><button class="btn btn-ghost btn-sm" id="d-del-no">Keep it</button></div>`:''}
    <div class="kpis"><div class="kpi"><b>${pax}</b><span>Total pax attending</span></div><div class="kpi"><b>${yes.length}</b><span>RSVPs attending</span></div><div class="kpi"><b>${no.length}</b><span>Can’t attend</span></div><div class="kpi"><b>${days>0?days:days===0?'Today':'Done'}</b><span>${days>0?'Days to the majlis':'Majlis day'}</span></div></div>
    <div style="margin-block:14px 22px"><div class="meter" role="img" aria-label="${yes.length} attending, ${no.length} not attending"><i style="width:${RSVPS.length?yes.length/tot*100:0}%;background:var(--ok)"></i><i style="width:${RSVPS.length?no.length/tot*100:0}%;background:var(--danger)"></i></div>
      <p class="muted" style="font-size:12px;margin-top:6px">${RSVPS.length} replies${o.deadline?` · RSVP closes ${esc(fmtDate(o.deadline,'en',false))}`:''}${o.maxPax?` · up to ${o.maxPax} pax each`:''}</p></div>
    <div class="tabs" role="tablist"><button role="tab" data-dt="rsvp" aria-selected="${dashTab==='rsvp'}">RSVP list</button><button role="tab" data-dt="wishes" aria-selected="${dashTab==='wishes'}">Ucapan <span class="muted">${WISHES.length}</span></button><button role="tab" data-dt="links" aria-selected="${dashTab==='links'}">Guest links</button></div>
    <div id="d-tab"></div>`;
  $('#d-open').onclick=()=>{invReturn='dashboard';openLive(o,'')};
  $('#d-edit').onclick=()=>{draft=clone(o);editingId=o.id;tab=0;go('create')};
  $('#d-del').onclick=()=>{confirmDel=true;drawDetail()};
  $('#d-del-no')&&($('#d-del-no').onclick=()=>{confirmDel=false;drawDetail()});
  $('#d-del-yes')&&($('#d-del-yes').onclick=async()=>{try{for(const r of RSVPS)await Store.del(`orders/${o.id}/rsvps/${r.id}`);for(const w of WISHES)await Store.del(`orders/${o.id}/wishes/${w.id}`);await Store.del('orders/'+o.id);confirmDel=false;subFor=null;toast('Card deleted')}catch(e){toast(e.message)}});
  $$('[data-dt]',box).forEach(b=>b.onclick=()=>{dashTab=b.dataset.dt;drawDetail()});
  const tb=$('#d-tab');
  if(dashTab==='rsvp'){
    tb.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px"><span class="muted" style="font-size:13px">Newest first</span><span style="display:flex;gap:8px;align-items:center">${diraja?'':'<span class="tag brass">Diraja</span>'}<button class="btn btn-ghost btn-sm" id="d-csv" ${diraja&&RSVPS.length?'':'disabled'}>Export CSV</button></span></div>
      ${RSVPS.length?`<div class="tbl-wrap"><table><thead><tr><th>Name</th><th>Phone</th><th>Reply</th><th style="text-align:right">Pax</th><th>Via link</th><th>Received</th></tr></thead><tbody>${RSVPS.map(r=>`<tr><td>${esc(r.name)}</td><td>${esc(r.phone)}</td><td><span class="pill ${r.attending?'yes':'no'}">${r.attending?'Attending':'Can’t attend'}</span></td><td style="text-align:right;font-variant-numeric:tabular-nums">${r.attending?r.pax:'—'}</td><td>${esc(r.guestLink||'—')}</td><td>${new Date(r.at).toLocaleString('en-MY',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'})}</td></tr>`).join('')}</tbody></table></div>`
      :`<div class="empty"><b>No replies yet</b><p class="muted" style="max-width:44ch">Replies appear here as soon as guests send them from the card. Open the card and send a test reply to see it.</p></div>`}`;
    $('#d-csv').onclick=()=>exportCsv(o);
  }else if(dashTab==='wishes'){
    tb.innerHTML=WISHES.length?`<div class="wish-admin">${WISHES.map(w=>`<div class="w ${w.hidden?'hidden-w':''}"><div style="min-width:0"><b>${esc(w.name)}</b> <span class="muted" style="font-size:12px">${new Date(w.at).toLocaleDateString('en-MY',{day:'numeric',month:'short'})}${w.hidden?' · hidden from guests':''}</span><p style="margin-top:4px;overflow-wrap:anywhere">${esc(w.msg)}</p></div><div style="display:flex;gap:6px;flex:0 0 auto"><button class="btn btn-ghost btn-sm" data-hide="${w.id}">${w.hidden?'Show':'Hide'}</button><button class="btn btn-danger btn-sm" data-wdel="${w.id}">Delete</button></div></div>`).join('')}</div>`
      :`<div class="empty"><b>No ucapan yet</b><p class="muted">Wishes from guests appear here. Hide any message before others see it.</p></div>`;
    $$('[data-hide]',tb).forEach(b=>b.onclick=async()=>{const w=WISHES.find(x=>x.id===b.dataset.hide);try{await Store.update(`orders/${o.id}/wishes/${w.id}`,{hidden:!w.hidden})}catch(e){toast(e.message)}});
    $$('[data-wdel]',tb).forEach(b=>b.onclick=async()=>{try{await Store.del(`orders/${o.id}/wishes/${b.dataset.wdel}`);toast('Ucapan deleted')}catch(e){toast(e.message)}});
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
async function exportCsv(o){const q=s=>`"${String(s??'').replace(/"/g,'""')}"`;
  const csv=['Name,Phone,Reply,Pax,Guest link,Received',...RSVPS.map(r=>[r.name,r.phone,r.attending?'Attending':'Not attending',r.attending?r.pax:0,r.guestLink||'',new Date(r.at).toISOString()].map(q).join(','))].join('\n');
  const fname=`rsvp-${o.slug}.csv`;
  try{const dl=(window.claude&&window.claude.use)?await window.claude.use('downloads'):null;if(dl){await dl.save({filename:fname,data:csv});toast('Guest list saved');return}}catch(e){if(e&&e.code==='declined')return}
  copyText(csv,()=>toast('CSV copied to clipboard. Paste it into a spreadsheet.'));
}

/* ================= boot ================= */
route();
</script>
