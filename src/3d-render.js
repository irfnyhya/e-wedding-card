
Object.assign(T.ms,{tapSeal:'Sentuh mohor untuk membuka',openDoors:'Buka',openVellum:'Buka Jemputan',dear:'Dengan hormatnya kepada'});
Object.assign(T.en,{tapSeal:'Tap the seal to open',openDoors:'Open',openVellum:'Open Invitation',dear:'Kindly addressed to'});
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= sample content (used for gallery previews) ================= */
const SAMPLE={id:'sample',slug:'contoh',template:'sampul-merah',lang:'ms',bismillah:true,useAccent:false,accent:'#7a1b29',jawi:'ع ا',
  brideFull:'Nur Aisyah Humaira binti Ahmad Faizal',brideShort:'Aisyah',groomFull:'Muhammad Aiman Hakimi bin Rahman',groomShort:'Aiman',
  hosts:'Ahmad Faizal bin Yusof & Siti Khadijah binti Ismail',side:'bride',eventTitle:'walimah',
  date:'2026-12-19',hijri:'8 Rejab 1448H',start:'11:00',end:'16:00',venue:'Dewan Seri Melati',address:'Jalan Kristal 7/62, Seksyen 7, 40000 Shah Alam, Selangor',dress:'Maroon & gading',
  schedule:[{time:'11:00',label:'Ketibaan tetamu'},{time:'12:30',label:'Ketibaan pengantin'},{time:'13:00',label:'Makan beradab & bacaan doa'},{time:'16:00',label:'Majlis bersurai'}],
  x_rsvp:true,maxPax:5,deadline:'2026-12-05',x_wishes:true,x_music:true,music:'sax',ytMusic:'https://youtu.be/lY5V4hSLWY8',ytStart:'',x_gallery:false,photos:[],x_gift:true,bank:'Maybank',accName:'Nur Aisyah Humaira',accNo:'1621 8840 3317',qr:'',
  x_contacts:true,contacts:[{name:'Ahmad Faizal',role:'Bapa pengantin',phone:'012-345 6789'},{name:'Hafiz',role:'Abang pengantin',phone:'019-876 5432'}],x_guestlinks:false,
  events:[{label:'Majlis Akad Nikah',date:'2026-12-18',start:'20:30',end:'22:00',venue:'Masjid Sultan Salahuddin Abdul Aziz Shah',address:'Persiaran Masjid, Seksyen 14, 40000 Shah Alam, Selangor'}],ogImage:''};
const SAMPLE_WISHES=[{id:'s1',name:'Mak Ngah Rosnah',msg:'Selamat pengantin baru Aisyah & Aiman. Semoga berkekalan hingga ke jannah.',at:Date.now()-3600e3},{id:'s2',name:'Farah, rakan sekolah',msg:'Tahniah! Tak sabar nak datang. Semoga bahagia selalu.',at:Date.now()-7200e3},{id:'s3',name:'Keluarga Encik Zul',msg:'Barakallahu lakuma. Semoga dimurahkan rezeki.',at:Date.now()-86400e3}];

/* ================= the front of each card ================= */
function frontPage(o,th,L){
  if(FAM2[th.fam])return FAM2[th.fam].page(o,th,L);
  const [n1,n2]=coverNames(o),c=th.c,ev=esc(L.ev[o.eventTitle]||L.ev.walimah);
  const names=(cls='')=>`<h1 class="names ${cls}">${esc(n1||'Nama')}<span class="amp">&amp;</span>${esc(n2||'Nama')}</h1>`;
  const dateLine=`<p class="caps">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="small it">${esc(o.hijri)}</p>`:''}`;
  if(th.fam==='sampul'){const [a,b]=th.fl;return `<section class="page pg-sampul linen"><div class="card tex">
    ${FL(a,`width:74%;left:-20%;top:-9%;transform:rotate(172deg)`)}${FL(b,`width:66%;right:-17%;bottom:-8%;transform:rotate(-8deg)`)}<div class="frame"></div>
    <p class="kicker reveal">${ev}</p>${names('reveal d1')}<div class="rule reveal d2"><i></i></div><div class="reveal d2">${dateLine}</div><p class="small reveal d3">${esc(o.venue)}</p></div></section>`}
  if(th.fam==='mihrab'){const [a,b]=th.fl;return `<section class="page pg-mihrab linen" style="--lattice:${latticeUri(c.gold)}"><div class="lattice"></div>
    <span class="keystone">${star8svg(c.gold)}</span>
    <div class="arch"><div class="arch-fill tex">${FL(a,`width:64%;left:-16%;bottom:-3%`)}${FL(b,`width:60%;right:-16%;bottom:-4%;transform:scaleX(-1)`)}
      ${o.bismillah?`<p class="bismillah reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}<p class="kicker reveal d1">${ev}</p>${names('reveal d1')}<div class="reveal d2">${dateLine}</div></div>${archOutline(c.gold)}</div></section>`}
  if(th.fam==='ukiran'){const [a,b]=th.eng;const mono=o.jawi?`<span class="jawi">${esc(o.jawi)}</span>`:`<span class="lat">${esc((n1||'A')[0])}&thinsp;&amp;&thinsp;${esc((n2||'A')[0])}</span>`;
    return `<section class="page pg-ukiran tex">${ENG(a,`width:70%;right:-15%;top:-7%;transform:rotate(180deg)`)}${ENG(b,`width:64%;left:-16%;bottom:-6%`)}<div class="border2"></div>
    <div class="oval reveal">${mono}</div><p class="kicker reveal d1" style="color:var(--ink)">${ev}</p>${names('reveal d1')}<div class="reveal d2">${dateLine}</div></section>`}
  const [a,b]=th.fl;
  return `<section class="page pg-catair tex">${FL(a,`width:72%;right:-20%;bottom:-3%`)}${FL(b,`width:50%;left:-12%;top:-8%;transform:rotate(180deg)`)}
    <div class="txt"><p class="small it reveal">${o.lang==='en'?'Together with their families':'Dengan penuh kesyukuran'}</p><p class="kicker reveal">${ev}</p>${names('reveal d1')}<p class="caps reveal d2" style="font-size:13px;letter-spacing:.3em">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`;
}

/* ================= covers: how each family opens ================= */
function coverHTML(o,th,L,guest,mode){
  if(FAM2[th.fam])return FAM2[th.fam].cover(o,th,L,guest,mode==='thumb'?'span':'button',mode==='thumb'?'':'type="button" data-open');
  const [n1,n2]=coverNames(o),c=th.c,btnTag=mode==='thumb'?'span':'button';
  const to=guest?`<p class="to-line">${L.dear}<b>${esc(guest)}</b></p>`:'';
  if(th.fam==='sampul'){
    return `<div class="cover cv-sampul"><div class="env">
      <div class="env-inside tex"></div>
      <div class="env-card tex"><p class="kicker">${esc(L.ev[o.eventTitle]||L.ev.walimah)}</p><p class="names">${esc(n1)} <span style="color:var(--gold)">&amp;</span> ${esc(n2)}</p></div>
      <div class="env-pocket"><div class="fold"></div><div class="emb" style="--m:url(${A}eng-${th.emb}.webp);left:-14%;bottom:-6%;aspect-ratio:${ASP[th.emb]}"><i class="hi"></i><i class="lo"></i></div><div class="emb" style="--m:url(${A}eng-${th.emb}.webp);right:-16%;bottom:-10%;aspect-ratio:${ASP[th.emb]};transform:scaleX(-1);width:54%"><i class="hi"></i><i class="lo"></i></div></div>
      <div class="env-flap"><div class="face"></div></div>
      ${guest?`<div class="env-to"><span class="caps">${L.dear}</span><b>${esc(guest)}</b></div>`:''}
      <${btnTag} class="seal" ${mode==='thumb'?'':'type="button" data-open'} style="--seal:url(${A}seal-${th.seal}.webp)" aria-label="${L.open}">${o.jawi&&String(o.jawi).trim()?`<span class="jw">${esc(String(o.jawi).trim())}</span>`:`<span>${esc((n1||'A')[0])}${esc((n2||'A')[0])}</span>`}</${btnTag}>
      <div class="env-meta"><span class="caps" style="font-size:13px">${esc(n1)} &amp; ${esc(n2)}</span><span class="hint">${L.tapSeal}</span></div>
    </div></div>`}
  if(th.fam==='mihrab'){
    const mono=o.jawi?`<span class="mono jawi">${esc(o.jawi)}</span>`:`<span class="mono">${esc((n1||'A')[0])}&amp;${esc((n2||'A')[0])}</span>`;
    const door=side=>`<div class="door ${side} linen"><div class="frame"></div><div class="jali"></div></div>`;
    return `<div class="cover cv-mihrab" style="--lattice:${latticeUri(c.gold,.9)}">${door('l')}${door('r')}
      ${guest?`<div class="door-to"><span class="caps" style="font-size:10px">${L.dear}</span><b>${esc(guest)}</b></div>`:''}
      <${btnTag} class="medal" ${mode==='thumb'?'':'type="button" data-open'}>${mono}<small>${L.openDoors}</small></${btnTag}></div>`}
  const isU=th.fam==='ukiran';
  return `<div class="cover ${isU?'cv-ukiran':'cv-catair'}"><div class="${isU?'vellum':'tissue'}">${to}<p class="kicker">${esc(L.ev[o.eventTitle]||L.ev.walimah)}</p>
    <${btnTag} class="open-btn" ${mode==='thumb'?'':'type="button" data-open'}>${L.openVellum}</${btnTag}></div></div>`;
}

/* extra sessions after the main one (akad nikah, bertandang, a second venue): each with its own date, time and Maps/Waze */
const moreEvents=o=>(Array.isArray(o.events)?o.events:[]).filter(e=>e&&(e.date||String(e.venue||'').trim())).slice(0,2);
const timeRange=(a,b,lang)=>a?esc(fmtTime(a,lang))+(b?' – '+esc(fmtTime(b,lang)):''):'';
function moreEvHTML(o,L){return moreEvents(o).map(e=>`<div class="more-ev" data-ev>
  ${e.label?`<p class="caps more-lb">${esc(e.label)}</p>`:''}
  <div class="info">
    ${e.date?`<div class="full"><span>${L.date}</span><b>${esc(fmtDate(e.date,o.lang))}</b></div>`:''}
    ${e.start?`<div class="full"><span>${L.time}</span><b>${timeRange(e.start,e.end,o.lang)}</b></div>`:''}
    ${e.venue?`<div class="full"><span>${L.venue}</span><b>${esc(e.venue)}</b>${e.address?`<p class="small" style="margin:6px auto 0;font-size:14px">${esc(e.address)}</p>`:''}</div>`:''}
  </div>
  ${e.venue||e.address?`<div class="ibtns"><a class="ibtn" href="${mapsUrl(e)}" target="_blank" rel="noopener">${ICON.pin}${L.maps}</a><a class="ibtn" href="${wazeUrl(e)}" target="_blank" rel="noopener">${ICON.pin}${L.waze}</a></div>`:''}
</div>`).join('')}
const locItem=(e,L,label)=>`<div class="loc-item">${label?`<p class="caps more-lb">${esc(label)}</p>`:''}<p><b style="font-weight:400;font-size:18px">${esc(e.venue)}</b><br><span class="small">${esc(e.address)}</span></p><div class="ibtns"><a class="ibtn solid" href="${mapsUrl(e)}" target="_blank" rel="noopener">${ICON.pin}${L.maps}</a><a class="ibtn solid" href="${wazeUrl(e)}" target="_blank" rel="noopener">${ICON.pin}${L.waze}</a></div></div>`;

/* ================= invitation renderer =================
   mode: 'thumb' (front only, static) | 'preview' (editor/gallery, nothing saved) | 'live' (guests, saves RSVP + wishes) */
function renderInvite(host,o,opts={}){
  const mode=opts.mode||'preview',L=copyFor(o),th=themeOf(o.template),fam=FAMILIES[th.fam],c={...th.c};
  if(o.useAccent&&o.accent){c.accent=o.accent}
  const el=document.createElement('div');el.className=`inv ${mode} fam-${th.fam} ${['ukiran','catair','tipografi'].includes(th.fam)?'flush':''}`;
  const vars={'--ground':c.ground,'--sheet':c.sheet,'--ink':c.ink,'--accent':c.accent,'--gold':c.gold,'--line':c.line,'--env':c.env,'--envInk':c.envInk,'--liner':c.liner,'--door':c.door,'--pagefg':c.pagefg||c.sheet,'--pageInk':c.pageInk||c.ink,'--pageAccent':c.pageAccent||c.accent,'--cover':c.cover,'--ribbon':c.ribbon,'--wax':c.wax||c.gold,'--wood':c.wood,'--tape':c.tape,'--d':fam.f.d,'--s':fam.f.s,'--b':fam.f.b,'--archmask':archMask};
  Object.entries(vars).forEach(([k,v])=>v&&el.style.setProperty(k,v));
  const guest=opts.guest||(mode!=='live'&&o.x_guestlinks?(o.lang==='en'?'Mr Ahmad & family':'Encik Ahmad & keluarga'):'');
  if(mode==='thumb'){const face=opts.face||(th.fam==='sampul'?'cover':'page');el.innerHTML=face==='cover'?coverHTML(o,th,L,'', 'thumb'):`<div class="scroller" style="overflow:hidden">${frontPage(o,th,L)}</div>`;host.replaceChildren(el);return el}

  const p1=o.side==='groom'?o.groomFull:o.brideFull,p2=o.side==='groom'?o.brideFull:o.groomFull;
  const deadline=o.deadline?fmtDate(o.deadline,o.lang,false):'';
  const rsvpClosed=o.deadline&&new Date(o.deadline+'T23:59:59+08:00')<new Date();
  const photos=(o.photos||[]).filter(Boolean);
  const contacts=(o.contacts||[]).filter(x=>x.name||x.phone);
  const dock=[['cal',ICON.cal,L.dock[0]],['loc',ICON.pin,L.dock[1]],o.x_rsvp&&['rsvp',ICON.rsvp,L.dock[2]],o.x_gift&&['gift',ICON.gift,L.dock[3]],o.x_contacts&&contacts.length&&['contact',ICON.phone,L.dock[4]],!o.x_rsvp&&o.x_wishes&&['wishes',ICON.wish,L.wishes]].filter(Boolean);
  const maxPax=Math.max(1,Math.min(20,+o.maxPax||1));
  const uid=(renderInvite.n=(renderInvite.n||0)+1);
  const orn=th.fam==='ukiran'?'<span class="orn" style="color:var(--ink)">❦</span>':th.fam==='mihrab'?`<span class="orn" style="width:22px">${star8svg()}</span>`:'<div class="rule"><i></i></div>';
  const vign=th.eng?ENG(th.eng[1],'width:42%;position:relative;transform:none','vignette'):th.fl?FL(th.fl[1],'width:48%;position:relative','vignette'):'';
  el.innerHTML=`<div class="scroller">${frontPage(o,th,L)}
   <div class="sheet tex">
    <section class="sec" data-s="intro">
      ${o.bismillah?`<p class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
      <p class="small it">${esc(L.salam)}</p>
      <p>${L.intro(esc(o.hosts),o.side)}</p>
      <p class="person" style="margin-top:8px">${esc(p1)}</p><p class="small it">${L.with}</p><p class="person">${esc(p2)}</p>
      ${vign}
    </section>
    <section class="sec" data-s="when"><h2>${L.when}</h2>${orn}
      <div class="info">
        <div class="full"><span>${L.date}</span><b>${esc(fmtDate(o.date,o.lang))}</b>${o.hijri?`<br><i class="small">${esc(o.hijri)}</i>`:''}</div>
        <div><span>${o.lang==='en'?'From':'Mula'}</span><b>${esc(fmtTime(o.start,o.lang))}</b></div><div><span>${o.lang==='en'?'Until':'Tamat'}</span><b>${esc(fmtTime(o.end,o.lang))}</b></div>
        <div class="full"><span>${L.venue}</span><b>${esc(o.venue)}</b><p class="small" style="margin:6px auto 0;font-size:14px">${esc(o.address)}</p></div>
        ${o.dress?`<div class="full"><span>${L.dress}</span><b>${esc(o.dress)}</b></div>`:''}
      </div>
      <div class="ibtns"><a class="ibtn" href="${mapsUrl(o)}" target="_blank" rel="noopener">${ICON.pin}${L.maps}</a><a class="ibtn" href="${wazeUrl(o)}" target="_blank" rel="noopener">${ICON.pin}${L.waze}</a><a class="ibtn" href="${calUrl(o)}" target="_blank" rel="noopener">${ICON.cal}${L.dock[0]}</a></div>
      ${moreEvHTML(o,L)}
    </section>
    <section class="sec" data-s="count"><h2>${L.count}</h2><div class="count" data-count>${L.units.map(u=>`<div><b>0</b><span>${u}</span></div>`).join('')}</div></section>
    ${(o.schedule||[]).filter(s=>s.label).length?`<section class="sec" data-s="sched"><h2>${L.sched}</h2>${orn}<ul class="timeline">${o.schedule.filter(s=>s.label).map(s=>`<li><b>${esc(fmtTime(s.time,o.lang))}</b><span>${esc(s.label)}</span></li>`).join('')}</ul></section>`:''}
    ${o.x_gallery&&photos.length?`<section class="sec" data-s="gallery"><h2>${L.gallery}</h2><div class="gallery">${photos.map(p=>`<img src="${p}" alt="">`).join('')}</div></section>`:''}
    ${o.bismillah||(o.tradition&&o.tradition!=='malay')||String(o.txtDoa||'').trim()?`<section class="sec" data-s="doa"><h2>${L.doaT}</h2><p class="it">${L.doa}</p></section>`:''}
    ${o.x_rsvp?`<section class="sec" data-s="rsvp"><h2>${L.rsvp}</h2>${deadline?`<p class="small it">${L.rsvpSub(esc(deadline))}</p>`:''}<div data-rsvp style="width:100%;display:flex;justify-content:center"></div></section>`:''}
    ${o.x_wishes?`<section class="sec" data-s="wishes"><h2>${L.wishes}</h2>
      <form data-wishform><input name="name" required maxlength="60" placeholder="${L.name}" aria-label="${L.name}"><textarea name="msg" required maxlength="400" rows="3" placeholder="${L.wishPh}" aria-label="${L.wishPh}"></textarea><button class="submit">${L.sendWish}</button><p class="note" data-wishnote hidden></p></form>
      <div class="wishes" data-wishes></div></section>`:''}
    ${o.x_gift?`<section class="sec" data-s="gift"><h2>${L.gift}</h2><p class="it">${L.giftSub}</p><div class="giftcard"><span class="caps" style="font-size:10px">${esc(o.bank)}</span><span class="acc">${esc(o.accNo||'—')}</span><span>${esc(o.accName)}</span><button type="button" class="ibtn" data-copy="${esc((o.accNo||'').replace(/\s/g,''))}">${ICON.copy}<span>${L.copy}</span></button>${o.qr?`<img src="${o.qr}" alt="DuitNow QR">`:''}</div></section>`:''}
    ${o.x_contacts&&contacts.length?`<section class="sec" data-s="contact"><h2>${L.contact}</h2>${contacts.map(x=>`<div class="contact"><div><b>${esc(x.name)}</b><span>${esc(x.role)}${x.role&&x.phone?' · ':''}${esc(x.phone)}</span></div><a class="ibtn" href="https://wa.me/${waNum(x.phone)}" target="_blank" rel="noopener" aria-label="WhatsApp ${esc(x.name)}">${ICON.wa}</a></div>`).join('')}</section>`:''}
    <div class="foot">${L.made}</div>
   </div>
   <nav class="dock" style="grid-template-columns:repeat(${dock.length},1fr)">${dock.map(([k,ic,lb])=>`<button type="button" data-dock="${k}">${ic}<span>${lb}</span></button>`).join('')}</nav>
  </div>
  ${coverHTML(o,th,L,guest,mode)}
  ${o.x_music&&(o.music||ytIdOf(o.ytMusic))?`<button type="button" class="music-btn" data-music hidden aria-label="Music">${ICON.music}</button>`:''}`;
  host.replaceChildren(el);
  const scroller=$('.scroller',el);
  el.__order=o;try{typeof FEATURES!=='undefined'&&FEATURES(el,o,th,L,mode,opts)}catch(e){console.warn('features',e)}
  el.classList.add('skin');try{typeof SKINS!=='undefined'&&SKINS[th.fam]&&SKINS[th.fam](el,o,th,L,mode)}catch(e){console.warn('skin',th.fam,e)}
  const musicBtn=$('[data-music]',el);
  const yt=o.x_music&&mode!=='thumb'?Tube.attach(el,ytIdOf(o.ytMusic),ytStartOf(o.ytStart)):null;
  const playSong=()=>yt?Tube.play(yt):Music.play(o.music),stopSong=()=>yt?Tube.pause(yt):Music.stop(),songOn=()=>yt?yt.playing:Music.playing();
  const setMusicIcon=()=>{if(!musicBtn)return;const on=songOn();musicBtn.classList.toggle('playing',on);musicBtn.innerHTML=on?ICON.music:ICON.mute};
  const timers=[];
  const open=(instant)=>{if(el.classList.contains('opening'))return;el.classList.add('opening');
    if(musicBtn){musicBtn.hidden=false;if(!instant&&opts.autoplay!==false)playSong();setMusicIcon()}
    if(instant||REDUCED){el.classList.add('card-out','opened');return}
    if(th.fam==='sampul'){timers.push(setTimeout(()=>el.classList.add('card-out'),950),setTimeout(()=>el.classList.add('opened'),2100))}
    else timers.push(setTimeout(()=>el.classList.add('opened'),FAM2[th.fam]?.ms||(th.fam==='mihrab'?1250:1000)));};
  $('[data-open]',el)?.addEventListener('click',()=>open(false));
  if(mode==='preview'&&opts.opened)open(true);
  musicBtn?.addEventListener('click',()=>{songOn()?stopSong():playSong();setMusicIcon()});
  el.reopen=()=>{timers.forEach(clearTimeout);el.classList.remove('opening','card-out','opened');scroller.scrollTop=0};
  // countdown
  const cd=$('[data-count]',el);
  if(cd){const target=new Date(`${o.date}T${o.start||'11:00'}:00+08:00`);let iv;const tick=()=>{if(!cd.isConnected){clearInterval(iv);return}const ms=target-new Date();if(isNaN(ms))return;if(ms<=0){cd.outerHTML=`<p>${L.done}</p>`;clearInterval(iv);return}
    const vals=[Math.floor(ms/864e5),Math.floor(ms/36e5)%24,Math.floor(ms/6e4)%60,Math.floor(ms/1e3)%60];$$('b',cd).forEach((b,i)=>b.textContent=String(vals[i]).padStart(2,'0'))};iv=setInterval(tick,1000);tick()}
  $$('[data-copy]',el).forEach(b=>b.addEventListener('click',()=>copyText(b.dataset.copy,()=>{b.querySelector('span').textContent=L.copied;setTimeout(()=>b.querySelector('span').textContent=L.copy,1600)})));
  const sheet=(title,body)=>{const bg=document.createElement('div');bg.className='sheet-bg';bg.innerHTML=`<div class="sheet-pop" role="dialog" aria-label="${esc(title)}"><h3>${esc(title)}</h3>${body}<button type="button" class="ibtn" data-x>${o.lang==='en'?'Close':'Tutup'}</button></div>`;bg.addEventListener('click',e=>{if(e.target===bg||e.target.closest('[data-x]'))bg.remove()});el.appendChild(bg)};
  $$('[data-dock]',el).forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.dock;
    if(k==='cal')sheet(L.dock[0],`<p class="small">${esc(fmtDate(o.date,o.lang))} · ${esc(fmtTime(o.start,o.lang))} – ${esc(fmtTime(o.end,o.lang))}</p><a class="ibtn solid" href="${calUrl(o)}" target="_blank" rel="noopener">${ICON.cal}${L.addCal}</a>`);
    else if(k==='loc'){const ev=moreEvents(o).filter(e=>e.venue||e.address);sheet(L.loc,locItem(o,L,ev.length?L.ev[o.eventTitle]:'')+ev.map(e=>locItem(e,L,e.label)).join(''))}
    else{const s=$(`[data-s="${k}"]`,el);if(s)scroller.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:REDUCED?'auto':'smooth'})}}));
  // RSVP
  const rsvpBox=$('[data-rsvp]',el);
  if(rsvpBox){
    const done=opts.rsvpDone?.();const doneName=done&&typeof done==='object'?done.name:done;
    const showPass=p=>{if(o.x_epass&&p&&p.qr&&typeof passHTML!=='undefined'){rsvpBox.insertAdjacentHTML('beforeend',passHTML(o,p,L));fillPass(rsvpBox)}};
    if(done){rsvpBox.innerHTML=`<p class="note">${L.thanks(esc(doneName))}</p>`;showPass(done)}
    else if(rsvpClosed&&mode==='live')rsvpBox.innerHTML=`<p class="note">${L.closed}</p>`;
    else{
      rsvpBox.innerHTML=`<form data-rsvpform><label for="r-name-${uid}">${L.name}</label><input id="r-name-${uid}" name="name" required maxlength="60" value="${esc(opts.guest||'')}">
        <label for="r-phone-${uid}">${L.phone}</label><input id="r-phone-${uid}" name="phone" type="tel" maxlength="20" required>
        <div class="seg" role="group"><button type="button" data-att="yes" aria-pressed="true">${L.yes}</button><button type="button" data-att="no" aria-pressed="false">${L.no}</button></div>
        <div data-paxwrap><label for="r-pax-${uid}">${L.pax}</label><select id="r-pax-${uid}" name="pax">${Array.from({length:maxPax},(_,i)=>`<option>${i+1}</option>`).join('')}</select></div>
        ${L.note?`<label for="r-note-${uid}">${L.note}</label><input id="r-note-${uid}" name="note" maxlength="120" placeholder="${L.notePh}">`:''}
        <button class="submit">${L.send}</button><p class="note" data-rsvpnote hidden></p></form>`;
      const f=$('form',rsvpBox);let att='yes';
      $$('[data-att]',f).forEach(b=>b.addEventListener('click',()=>{att=b.dataset.att;$$('[data-att]',f).forEach(x=>x.setAttribute('aria-pressed',x===b));$('[data-paxwrap]',f).hidden=att==='no'}));
      f.addEventListener('submit',async e=>{e.preventDefault();const note=$('[data-rsvpnote]',f);const fd=new FormData(f);const data={name:fd.get('name').trim(),phone:fd.get('phone').trim(),attending:att==='yes',pax:att==='yes'?+fd.get('pax'):0,note:String(fd.get('note')||'').trim(),guestLink:opts.guest||'',at:Date.now()};
        if(!opts.onRsvp){note.hidden=false;note.textContent=L.previewNote;return}
        const btn=$('.submit',f);btn.disabled=true;
        try{const pass=await opts.onRsvp(data);rsvpBox.innerHTML=`<p class="note">${L.thanks(esc(data.name))}</p>`;if(data.attending)showPass(pass)}catch(err){btn.disabled=false;note.hidden=false;note.textContent=err.message||'Could not save.'}});
    }
  }
  // wishes
  const wl=$('[data-wishes]',el);
  if(wl){
    const draw=list=>{const vis=list.filter(w=>!w.hidden).sort((a,b)=>b.at-a.at);wl.innerHTML=vis.length?vis.map(w=>`<div class="wish"><b>${esc(w.name)}</b><p>${esc(w.msg)}</p><time>${new Date(w.at).toLocaleDateString(o.lang==='en'?'en-MY':'ms-MY',{day:'numeric',month:'short'})}</time></div>`).join(''):`<p class="small it" style="text-align:center">${L.noWish}</p>`};
    if(opts.subscribeWishes){const un=opts.subscribeWishes(list=>{if(!wl.isConnected){un&&un();return}draw(list)})}else draw(mode==='preview'?SAMPLE_WISHES:[]);
    const wf=$('[data-wishform]',el);
    wf.addEventListener('submit',async e=>{e.preventDefault();const note=$('[data-wishnote]',wf);const fd=new FormData(wf);const data={name:fd.get('name').trim(),msg:fd.get('msg').trim(),at:Date.now(),hidden:false};
      if(!opts.onWish){note.hidden=false;note.textContent=L.previewNote;return}
      try{await opts.onWish(data);wf.reset();note.hidden=true}catch(err){note.hidden=false;note.textContent=err.message||'Could not save.'}});
  }
  return el;
}

