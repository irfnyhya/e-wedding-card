<script>
/* ================= guest features added after the jemputan.me comparison =================
   wishlist with reservations, several gift accounts, call + WhatsApp contacts, Apple/Outlook calendar,
   livestream link, live attendance counter, quiet particle effects, own-design front page,
   swipe gallery with lightbox, and the guest e-pass (QR) used for check-in on the day. */
Object.assign(T.ms.ev,{tunang:'Majlis Pertunangan',nikah:'Majlis Akad Nikah'});
Object.assign(T.en.ev,{tunang:'The Engagement of',nikah:'The Solemnisation of'});
Object.assign(T.ms,{wl:'Senarai Hadiah',wlSub:'Jika ingin memberi hadiah, tempah satu supaya tiada hadiah yang sama.',reserve:'Tempah',reserved:'Sudah ditempah',yours:'Tempahan anda',cancel:'Batal',shop:'Lihat kedai',yourName:'Nama anda',confirm:'Sahkan',
  call:'Telefon',appleCal:'Apple / Outlook',live:'Tonton siaran langsung',liveSub:'Tidak dapat hadir? Saksikan majlis secara langsung.',going:'Hadir',notGoing:'Tidak hadir',note:'Nota (pilihan)',notePh:'Contoh: kerusi roda, vegetarian',
  pass:'Pas Tetamu',passSub:'Tunjukkan kod ini di kaunter penyambut tetamu.',paxN:n=>`${n} orang`,code:'Kod',savePass:'Simpan gambar pas'});
Object.assign(T.en,{wl:'Gift Wishlist',wlSub:'If you would like to give a gift, reserve one so no two guests bring the same thing.',reserve:'Reserve',reserved:'Reserved',yours:'Your reservation',cancel:'Cancel',shop:'View shop',yourName:'Your name',confirm:'Confirm',
  call:'Call',appleCal:'Apple / Outlook',live:'Watch the livestream',liveSub:'Can’t be there? Watch the ceremony live.',going:'Attending',notGoing:'Not attending',note:'Note (optional)',notePh:'E.g. wheelchair access, vegetarian',
  pass:'Guest Pass',passSub:'Show this code at the reception desk.',paxN:n=>`${n} ${n>1?'guests':'guest'}`,code:'Code',savePass:'Save pass image'});
Object.assign(ICON,{
  callp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z" fill="currentColor"/></svg>',
  bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>'});

const giftList=o=>(o.gifts&&o.gifts.length?o.gifts:[{bank:o.bank,accName:o.accName,accNo:o.accNo}]).filter(g=>g&&(g.accNo||g.accName)).slice(0,3);
const safeUrl=u=>/^https?:\/\/[^\s"'<>]+$/i.test(String(u||'').trim())?String(u).trim():'';
const rsvpCode=id=>String(id||'').replace(/[^a-z0-9]/gi,'').slice(-6).toUpperCase();

/* ---------- calendar file for Apple Calendar and Outlook ---------- */
function icsText(o){const s=new Date(`${o.date}T${o.start||'11:00'}:00+08:00`),e=new Date(`${o.date}T${o.end||'16:00'}:00+08:00`);if(isNaN(s))return'';
  const f=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');const x=s=>String(s||'').replace(/([,;\\])/g,'\\$1').replace(/\n/g,'\\n');
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Sanding//Kad Jemputan//MS','BEGIN:VEVENT',`UID:${o.slug||'sanding'}-${o.date}@sanding.my`,`DTSTAMP:${f(new Date())}`,`DTSTART:${f(s)}`,`DTEND:${f(e)}`,
    `SUMMARY:${x(`${(T[o.lang]||T.ms).ev[o.eventTitle]||''} ${coverNames(o).join(' & ')}`)}`,`LOCATION:${x((o.venue||'')+', '+(o.address||''))}`,'BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:Majlis esok','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n')}
async function saveFile(filename,data,type){
  try{const dl=(window.claude&&window.claude.use)?await window.claude.use('downloads'):null;if(dl){await dl.save({filename,data});return true}}catch(e){if(e&&e.code==='declined')return false}
  try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type}));a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);return true}catch(e){return false}}

/* ---------- QR (qrcode-generator from cdnjs, loaded on first use) ---------- */
let _qrLib=null;
function loadQR(){if(window.qrcode)return Promise.resolve(window.qrcode);if(_qrLib)return _qrLib;
  _qrLib=new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';s.onload=()=>res(window.qrcode);s.onerror=()=>{_qrLib=null;rej(new Error('QR library did not load'))};document.head.appendChild(s)});return _qrLib}
async function qrSvg(text,dark='#1d1a17'){const qrcode=await loadQR();const q=qrcode(0,'M');q.addData(text);q.make();const n=q.getModuleCount();let d='';
  for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(q.isDark(r,c))d+=`M${c} ${r}h1v1h-1z`;
  return `<svg ${NS} viewBox="-2 -2 ${n+4} ${n+4}" shape-rendering="crispEdges"><rect x="-2" y="-2" width="${n+4}" height="${n+4}" fill="#fff"/><path d="${d}" fill="${dark}"/></svg>`}

/* ---------- guest pass ---------- */
function passHTML(o,p,L){return `<div class="epass"><div class="ep-head"><span>${L.pass}</span><b>${esc(coverNames(o).join(' & '))}</b></div>
  <div class="ep-qr" data-qr="${esc(p.qr)}"><span class="muted small">…</span></div>
  <div class="ep-row"><div><span>${L.name}</span><b>${esc(p.name)}</b></div><div><span>${o.lang==='en'?'Guests':'Bilangan'}</span><b>${esc(L.paxN(p.pax))}</b></div></div>
  <div class="ep-row"><div><span>${L.code}</span><b class="ep-code">${esc(p.code)}</b></div><div><span>${L.date}</span><b>${esc(fmtShort(o.date))}</b></div></div>
  <p class="small it">${L.passSub}</p></div>`}
async function fillPass(root){for(const box of $$('[data-qr]',root)){try{box.innerHTML=await qrSvg(box.dataset.qr)}catch(e){box.innerHTML=`<span class="small">${esc(box.dataset.qr.split(':').pop().slice(-6).toUpperCase())}</span>`}}}

/* ---------- quiet particle effects ---------- */
const EFFECTS={none:{label:'None'},kelopak:{label:'Rose petals'},emas:{label:'Gold dust'},melur:{label:'Jasmine'}};
function runEffect(el,kind,accent){
  if(!EFFECTS[kind]||kind==='none'||REDUCED)return;
  const cv=document.createElement('canvas');cv.className='fx';el.appendChild(cv);const g=cv.getContext('2d');let W=0,H=0,dpr=Math.min(2,devicePixelRatio||1);
  const size=()=>{const r=el.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0)};size();
  const N=kind==='emas'?26:12,R=Math.random;
  const mk=(y)=>({x:R()*W,y:y??R()*H,s:kind==='emas'?.6+R()*1.6:kind==='melur'?5+R()*3:6+R()*5,vx:(R()-.5)*.25,vy:kind==='emas'?-(.08+R()*.18):.25+R()*.35,a:R()*6.28,va:(R()-.5)*.02,t:R()*6.28,o:.35+R()*.45});
  const ps=Array.from({length:N},()=>mk());
  const petal=(p)=>{g.save();g.translate(p.x,p.y);g.rotate(p.a);g.scale(1,.45+.55*Math.abs(Math.sin(p.t)));g.globalAlpha=p.o;g.fillStyle=accent;g.beginPath();g.ellipse(0,0,p.s,p.s*.62,0,0,6.28);g.fill();g.globalAlpha=p.o*.35;g.fillStyle='#fff';g.beginPath();g.ellipse(-p.s*.25,-p.s*.15,p.s*.4,p.s*.18,0,0,6.28);g.fill();g.restore()};
  const jasmine=(p)=>{g.save();g.translate(p.x,p.y);g.rotate(p.a);g.globalAlpha=p.o;g.fillStyle='#fffdf6';g.strokeStyle='rgba(0,0,0,.08)';for(let i=0;i<5;i++){g.rotate(1.2566);g.beginPath();g.ellipse(0,-p.s*.55,p.s*.3,p.s*.55,0,0,6.28);g.fill();g.stroke()}g.fillStyle='#f0d77a';g.beginPath();g.arc(0,0,p.s*.16,0,6.28);g.fill();g.restore()};
  const dust=(p)=>{const tw=.5+.5*Math.sin(p.t*3);g.globalAlpha=p.o*tw;g.fillStyle='#f3d78a';g.beginPath();g.arc(p.x,p.y,p.s,0,6.28);g.fill();g.globalAlpha=p.o*tw*.25;g.beginPath();g.arc(p.x,p.y,p.s*3.2,0,6.28);g.fill()};
  let raf,last=0;const ro=new ResizeObserver(size);ro.observe(el);
  const step=(ts)=>{if(!cv.isConnected){cancelAnimationFrame(raf);ro.disconnect();return}raf=requestAnimationFrame(step);if(ts-last<33)return;last=ts;g.clearRect(0,0,W,H);
    for(const p of ps){p.t+=.03;p.a+=p.va;p.x+=p.vx+Math.sin(p.t)*.18;p.y+=p.vy;if(p.y>H+20)Object.assign(p,mk(-20));if(p.y<-20)Object.assign(p,mk(H+20));if(p.x<-20)p.x=W+20;if(p.x>W+20)p.x=-20;
      kind==='kelopak'?petal(p):kind==='melur'?jasmine(p):dust(p)}g.globalAlpha=1};
  raf=requestAnimationFrame(step)}

/* ---------- sample data for previews ---------- */
const SAMPLE_WL=[{name:'Periuk nasi Philips HD3119',link:'https://shopee.com.my',price:'RM189'},{name:'Set cadar king, warna krim',link:'',price:'RM120'},{name:'Cerek elektrik keluli',link:'https://lazada.com.my',price:'RM99'},{name:'Baucar IKEA',link:'https://ikea.com.my',price:'RM100'}];
Object.assign(SAMPLE,{effect:'none',x_wishlist:true,wishlist:SAMPLE_WL,x_counter:true,livestream:'',gifts:[{bank:'Maybank',accName:'Nur Aisyah Humaira',accNo:'1621 8840 3317'},{bank:'Touch ’n Go eWallet',accName:'Muhammad Aiman Hakimi',accNo:'012-345 6789'}],x_epass:false,ownDesign:''});

/* ---------- the hook renderInvite calls before the family skin ---------- */
function FEATURES(el,o,th,L,mode,opts){
  const sheet=$('.sheet',el),sec=k=>$(`[data-s="${k}"]`,el),en=o.lang==='en';
  // own design as the front page
  if(o.ownDesign){const pg=$('.scroller > .page',el);if(pg)pg.outerHTML=`<section class="page pg-own"><img src="${esc(o.ownDesign)}" alt="${esc(coverNames(o).join(' & '))}"></section>`}
  // calendar: add the .ics button next to Google
  const ib=$('[data-s="when"] .ibtns',el);if(ib)ib.insertAdjacentHTML('beforeend',`<button type="button" class="ibtn" data-ics>${ICON.cal}${L.appleCal}</button>`);
  // livestream
  const live=safeUrl(o.livestream);if(live)sec('when')?.insertAdjacentHTML('beforeend',`<div class="live-box"><p class="small it">${L.liveSub}</p><a class="ibtn solid" href="${esc(live)}" target="_blank" rel="noopener">${ICON.play}${L.live}</a></div>`);
  // gallery: swipe strip with dots and a lightbox
  const gal=$('.gallery',el);if(gal){const imgs=$$('img',gal);gal.classList.add('gal2');gal.insertAdjacentHTML('afterend',`<div class="gal-dots">${imgs.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('')}</div>`);
    gal.addEventListener('scroll',()=>{const i=Math.round(gal.scrollLeft/gal.clientWidth);$$('.gal-dots i',el).forEach((d,j)=>d.classList.toggle('on',i===j))},{passive:true});
    imgs.forEach(im=>im.addEventListener('click',()=>{const bg=document.createElement('div');bg.className='lightbox';bg.innerHTML=`<img src="${im.src}" alt=""><button type="button" aria-label="Close">✕</button>`;bg.onclick=()=>bg.remove();el.appendChild(bg)}))}
  // several gift accounts
  const gc=$('[data-s="gift"] .giftcard',el);if(gc){const list=giftList(o);const qr=o.qr?`<img class="gift-qr" src="${esc(o.qr)}" alt="DuitNow QR">`:'';
    gc.outerHTML=`<div class="gifts">${list.map(g=>`<div class="giftcard"><span class="caps" style="font-size:10px">${esc(g.bank)}</span><span class="acc">${esc(g.accNo||'—')}</span><span>${esc(g.accName)}</span><button type="button" class="ibtn" data-copy="${esc((g.accNo||'').replace(/[\s-]/g,''))}">${ICON.copy}<span>${L.copy}</span></button></div>`).join('')}${qr}</div>`}
  // wishlist with reservations
  const items=(o.wishlist||[]).filter(w=>w&&w.name).slice(0,12);
  if(o.x_wishlist&&items.length){const html=`<section class="sec" data-s="wishlist"><h2>${L.wl}</h2><p class="it">${L.wlSub}</p><div class="wl" data-wl>${items.map((w,i)=>`<div class="wl-item" data-i="${i}"><div class="wl-t"><b>${esc(w.name)}</b>${w.price?`<span>${esc(w.price)}</span>`:''}</div><div class="wl-a">${safeUrl(w.link)?`<a class="ibtn" href="${esc(safeUrl(w.link))}" target="_blank" rel="noopener" aria-label="${L.shop}">${ICON.bag}</a>`:''}<button type="button" class="ibtn solid" data-res="${i}">${L.reserve}</button></div></div>`).join('')}</div></section>`;
    (sec('gift')||sec('rsvp')||sec('contact')||$('.foot',el)).insertAdjacentHTML(sec('gift')?'afterend':'beforebegin',html);
    const box=$('[data-wl]',el),mineKey='sanding-res-'+(o.id||'preview');let state={};
    const paint=()=>{const mine=ls.get(mineKey,{});items.forEach((w,i)=>{const row=$(`.wl-item[data-i="${i}"]`,box),r=state['i'+i],a=$('.wl-a',row);row.classList.toggle('taken',!!r);
      const shop=safeUrl(w.link)?`<a class="ibtn" href="${esc(safeUrl(w.link))}" target="_blank" rel="noopener" aria-label="${L.shop}">${ICON.bag}</a>`:'';
      const t=$('.wl-t',row);t.innerHTML=`<b>${esc(w.name)}</b>${w.price?`<span>${esc(w.price)}</span>`:''}${r?`<em class="wl-st ${mine['i'+i]?'mine':''}">${mine['i'+i]?L.yours:L.reserved}</em>`:''}`;
      a.innerHTML=r?(mine['i'+i]?`<button type="button" class="ibtn" data-unres="${i}">${L.cancel}</button>`:''):`${shop}<button type="button" class="ibtn solid" data-res="${i}">${L.reserve}</button>`})};
    box.addEventListener('click',async e=>{const b=e.target.closest('[data-res],[data-unres],[data-ok]');if(!b)return;
      if(b.dataset.res!=null){const i=b.dataset.res,row=$(`.wl-item[data-i="${i}"]`,box);$('.wl-a',row).innerHTML=`<input class="wl-name" maxlength="40" placeholder="${L.yourName}" aria-label="${L.yourName}" value="${esc(opts.guest||'')}"><button type="button" class="ibtn solid" data-ok="${i}">${L.confirm}</button>`;$('.wl-name',row).focus();return}
      if(b.dataset.ok!=null){const i=b.dataset.ok,name=$('.wl-name',box).value.trim();if(!name){$('.wl-name',box).focus();return}
        if(!opts.onReserve){state['i'+i]={name,at:Date.now()};const m=ls.get(mineKey,{});m['i'+i]=1;ls.set(mineKey,m);paint();return}
        if(state['i'+i]){paint();return}b.disabled=true;try{await opts.onReserve('i'+i,{name,item:items[i].name,at:Date.now()});const m=ls.get(mineKey,{});m['i'+i]=1;ls.set(mineKey,m)}catch(err){toast?.(err.message)}paint();return}
      if(b.dataset.unres!=null){const i=b.dataset.unres;const m=ls.get(mineKey,{});delete m['i'+i];ls.set(mineKey,m);if(opts.onUnreserve){try{await opts.onUnreserve('i'+i)}catch(err){}}else{delete state['i'+i]}paint()}});
    if(opts.subscribeReserves){const un=opts.subscribeReserves(list=>{if(!box.isConnected){un&&un();return}state=Object.fromEntries(list.map(r=>[r.id,r]));paint()})}
    else{if(mode==='preview')state={i1:{name:'Mak Ngah'}};paint()}}
  // contacts: call as well as WhatsApp
  $$('[data-s="contact"] .contact',el).forEach((row,i)=>{const c=(o.contacts||[]).filter(x=>x.name||x.phone)[i];if(!c||!c.phone)return;const tel=String(c.phone).replace(/[^\d+]/g,'');
    const wa=$('a.ibtn',row);const wrap=document.createElement('div');wrap.className='c-acts';wa.replaceWith(wrap);wrap.append(wa);wrap.insertAdjacentHTML('afterbegin',`<a class="ibtn" href="tel:${esc(tel)}" aria-label="${L.call} ${esc(c.name)}">${ICON.callp}</a>`)});
  // live attendance counter
  const rs=sec('rsvp');if(rs&&o.x_counter){rs.insertAdjacentHTML('beforeend',`<div class="att"><div><b data-att-yes>0</b><span>${L.going}</span></div><div><b data-att-no>0</b><span>${L.notGoing}</span></div></div>`);
    const set=(y,n)=>{const a=$('[data-att-yes]',el),b=$('[data-att-no]',el);if(a){a.textContent=y;b.textContent=n}};
    if(opts.subscribeRsvps){const un=opts.subscribeRsvps(list=>{if(!rs.isConnected){un&&un();return}const yes=list.filter(r=>r.attending);set(yes.reduce((s,r)=>s+(+r.pax||0),0),list.length-yes.length)})}else set(mode==='preview'?128:0,mode==='preview'?9:0)}
  // effects sit above the card but below the cover
  if(mode!=='thumb'&&o.effect&&o.effect!=='none')requestAnimationFrame(()=>runEffect(el,o.effect,o.effect==='kelopak'?(th.c.accent||'#b5475d'):th.c.gold));
}
/* the .ics button works in every mode */
document.addEventListener('click',e=>{const b=e.target.closest('[data-ics]');if(!b)return;const inv=b.closest('.inv');const o=inv&&inv.__order;if(!o)return;saveFile(`majlis-${o.slug||'sanding'}.ics`,icsText(o),'text/calendar')});
</script>
