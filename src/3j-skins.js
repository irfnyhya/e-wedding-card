<script>
/* ================= openers, rebuilt, and per-family content hooks ================= */
const SONGKET_H=svgUriSq(`<svg ${NS} width="48" height="28" viewBox="0 0 48 28"><path d="M0 2H48M0 26H48" stroke="#000" stroke-width="1.6"/><path d="M24 5L33 14L24 23L15 14Z" fill="none" stroke="#000" stroke-width="1.8"/><path d="M24 9.5L28.5 14L24 18.5L19.5 14Z"/><path d="M0 5L6 14L0 23ZM48 5L42 14L48 23Z"/></svg>`);
const JALI=c=>svgUriSq(`<svg ${NS} width="40" height="40" viewBox="0 0 40 40"><g fill="none" stroke="${c}" stroke-width="2.2"><path d="M20 3l5 12 12 5-12 5-5 12-5-12-12-5 12-5z"/><circle cx="20" cy="20" r="4.5"/><path d="M0 0l7 7M40 0l-7 7M0 40l7-7M40 40l-7-7"/></g></svg>`);
const BM_NUM=['Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Lapan','Sembilan','Sepuluh','Sebelas','Dua Belas'];
const EN_NUM=['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve'];
const ROMAN=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];

/* finer wrought-iron gate: thin pickets, double rails, C-scrolls and a rosette */
function gateSvg2(col){let p='';for(let x=4;x<48;x+=4.4)p+=`<path d="M${x.toFixed(1)} 146V30"/><path d="M${(x-1.3).toFixed(1)} 31L${x.toFixed(1)} 25L${(x+1.3).toFixed(1)} 31" fill="${col}"/>`;
  const curl=(x,y,s)=>`<path d="M${x} ${y}c${8*s} 0 ${10*s} -8 ${4*s} -10s${-8*s} 4 ${-4*s} 6"/>`;
  return `<svg viewBox="0 0 50 150" preserveAspectRatio="none" fill="none" stroke="${col}" stroke-width="1.4" style="vector-effect:non-scaling-stroke" vector-effect="non-scaling-stroke">
   <path d="M1.5 148V20Q25 4 48.5 20V148Z" stroke-width="2.6"/><path d="M4 22Q25 9 46 22" />${p}
   <path d="M1.5 58H48.5M1.5 62H48.5M1.5 108H48.5M1.5 112H48.5M1.5 142H48.5"/>
   ${curl(6,80,1)}${curl(44,80,-1)}${curl(6,96,1)}${curl(44,96,-1)}
   <circle cx="25" cy="85" r="9" fill="${col}" fill-opacity=".12"/><circle cx="25" cy="85" r="9"/>${[0,60,120,180,240,300].map(a=>`<circle cx="${(25+Math.cos(a*Math.PI/180)*5.4).toFixed(2)}" cy="${(85+Math.sin(a*Math.PI/180)*5.4).toFixed(2)}" r="2.6"/>`).join('')}<circle cx="25" cy="85" r="1.8" fill="${col}"/>
   ${[9,18,32,41].map(x=>`<circle cx="${x}" cy="126" r="4.5"/>`).join('')}
   <path d="M10 40c0 8 15 8 15 14M40 40c0 8-15 8-15 14"/><circle cx="25" cy="36" r="3"/></svg>`}

Object.assign(FAM2.skrol,{ms:1700,cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-skrol2 linen">
  <p class="sk-to">${guest?`${L.dear}<b>${esc(guest)}</b>`:`<b>${en?'A letter for you':'Sepucuk warkah'}</b>`}</p>
  <${tag} class="roll" ${attr} aria-label="${L.open}"><span class="unroll tex"><span class="ur-text">${ev(o,L)}</span></span>
   <span class="cyl"><span class="end l"></span><span class="end r"></span><span class="fin l"></span><span class="fin r"></span><span class="tie"></span><span class="bow"></span><span class="sealx"></span></span></${tag}>
  <p class="sk-hint">${en?'Break the seal to unroll the letter':'Pecahkan mohor untuk membuka warkah'}</p></div>`}});
Object.assign(FAM2.gerbang,{cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),m=th.c.metal,en=o.lang==='en';return `<div class="cover cv-gate2" style="--metal:${m}">
  <div class="glow"></div><div class="pillar l"></div><div class="pillar r"></div>
  <div class="plaque"><span class="pl-k">${ev(o,L)}</span><span class="pl-n">${esc(n1)} &amp; ${esc(n2)}</span></div>
  <span class="gate l">${gateSvg2(m)}</span><span class="gate r"><span style="display:block;height:100%;transform:scaleX(-1)">${gateSvg2(m)}</span></span>
  <${tag} class="knock" ${attr} aria-label="${L.open}"><i></i></${tag}>
  <p class="g-to">${guest?`${L.dear} <b>${esc(guest)}</b>`:''}<span>${en?'Tap the ring to open the gates':'Sentuh gelang untuk membuka pintu pagar'}</span></p></div>`}});
Object.assign(FAM2.pawagam,{ms:1500,cover(o,th,L,guest,tag,attr){const en=o.lang==='en';const serial=String(fmtShort(o.date)).replace(/\D/g,'').slice(0,6);return `<div class="cover cv-cinema">
  <div class="curtain l"></div><div class="curtain r"></div><div class="valance"></div><div class="spot"></div>
  <${tag} class="tk" ${attr}><span class="tk-main"><span class="tk-row"><span>${en?'Picture house':'Panggung wayang'}</span><span>No. ${serial}</span></span><b class="tk-adm">${en?'ADMIT ONE':'MASUK SEORANG'}</b><span class="tk-film">${en?'A Love Story':'Kisah Cinta'}</span><span class="tk-who">${guest?esc(guest):(en?'Honoured guest':'Tetamu kehormat')}</span><span class="tk-row"><span>${esc(fmtShort(o.date))}</span><span>${esc(fmtTime(o.start,o.lang))}</span><span>${en?'Row':'Baris'} A · ${en?'Seat':'Kerusi'} 1</span></span></span><span class="tk-stub"><span>${en?'Tear':'Koyak'}</span><b>${serial}</b></span></${tag}>
  <p class="tk-hint">${en?'Tap the ticket to go in':'Sentuh tiket untuk masuk panggung'}</p></div>`}});
Object.assign(FAM2.label,{cover(o,th,L,guest,tag,attr){const c=th.c,[n1,n2]=coverNames(o);const sprig=c.ink;return `<div class="cover cv-label linen">
  <svg class="twine" viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M50 0 C46 20 54 34 50 58" stroke="#c9ad7a" stroke-width="1.6" fill="none"/><path d="M50 0 C55 18 45 36 50 58" stroke="#b39463" stroke-width="1.2" fill="none"/></svg>
  <${tag} class="hangtag2" ${attr}>${tagSvg(c.sheet,c.accent)}<i class="grommet"></i>${ENG(th.eng||'jasmine','width:46%;left:-8%;top:8%;transform:rotate(-24deg);background:var(--accent);opacity:.85')}
   <span class="in"><span class="mono-c">${esc((n1||'A')[0])}&amp;${esc((n2||'A')[0])}</span><span class="small">${guest?`${L.dear}`:ev(o,L)}</span>${guest?`<b>${esc(guest)}</b>`:''}<span class="caps" style="font-size:10px">${L.openVellum}</span></span></${tag}></div>`}});
THEMES.filter(t=>t.fam==='label').forEach(t=>{t.eng=t.eng||({gading:'white-roses',nila:'iris',marun:'red-rose',zamrud:'jasmine',jambu:'blush-rose',sage:'white-roses',hitam:'cabbage-rose',terakota:'wild-rose'}[t.id.split('-')[1]]||'jasmine')});
Object.assign(FAM2.anyaman,{cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o);return `<div class="cover cv-anyaman2" style="--weave:${weaveUri('#d9c08a','#c9ab70')};--weave2:${weaveUri(th.c.accent,th.c.dye2)};--dia:${DIA}"><div class="weave-band" style="top:10%"></div><div class="weave-band" style="bottom:10%"></div>
  <div class="wcard tex"><p class="kicker">${ev(o,L)}</p><p class="names" style="font-size:40px">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</p>${guest?`<p class="to-line">${L.dear}<b>${esc(guest)}</b></p>`:''}<${tag} class="open-btn" ${attr}>${L.openVellum}</${tag}></div></div>`}});
Object.assign(FAM2.mancis,{cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';return `<div class="cover cv-mancis"><${tag} class="mbox" ${attr}><span class="drawer"></span><span class="sleeve2 mb2"><i class="strk l"></i><i class="strk r"></i>
  <span class="mb-in"><span class="caps" style="font-size:9px;letter-spacing:.3em">${en?'Safety matches':'Mancis keselamatan'}</span><span class="mb-art" style="--m:url(${A}eng-${th.eng}.webp)"></span><b>${esc(n1)} &amp; ${esc(n2)}</b><span class="banner" style="font-size:13px">${en?'A perfect match':'Padanan sempurna'}</span><span class="caps" style="font-size:9px">${guest?`${L.dear} ${esc(guest)}`:(en?'Push the drawer to open':'Tolak laci untuk buka')}</span></span></span></${tag}></div>`}});
Object.assign(FAM2.jubin,{cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o);return `<div class="cover cv-jubin" style="--tiles:${tileUri(th.c.accent,th.c.sheet)}"><${tag} class="tile-medal tm2" ${attr}><span class="tm-ring"></span><span class="kicker" style="color:var(--accent)">${ev(o,L)}</span><b class="tm-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</b>${guest?`<span class="small">${L.dear} ${esc(guest)}</span>`:''}<span class="caps" style="font-size:10px">${L.openVellum}</span></${tag}></div>`}});
Object.assign(FAM2.jahit,{cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,cols={r:c.accent,y:c.gold,g:'#5f7a4a'};return `<div class="cover cv-jahit linen"><${tag} class="hoop2" ${attr}><span class="hoop-wood"></span><span class="clamp"></span><span class="fabric aida">${motifSvg(cols,4)}${stitchSvg([n1||'',`& ${n2||''}`],c.accent,4)}<span class="small" style="color:var(--ink)">${guest?`${L.dear} ${esc(guest)}`:L.openVellum}</span></span></${tag}></div>`}});
Object.assign(FAM2.buku,{cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',e='white-roses';return `<div class="cover cv-buku"><${tag} class="bookcov bk2 linen" ${attr} style="border:0;cursor:pointer;font:inherit"><span class="spine"></span>
  ${[['left:12%;top:2%','rotate(180deg)'],['right:-4%;top:2%','rotate(180deg) scaleX(-1)'],['left:12%;bottom:2%','none'],['right:-4%;bottom:2%','scaleX(-1)']].map(([pos,tr])=>`<i class="eng foil" style="--m:url(${A}eng-${e}.webp);aspect-ratio:${ASP[e]};width:30%;${pos};transform:${tr};opacity:.9"></i>`).join('')}
  <span class="bk-label"><span class="ttl foil-text">${en?'Our Story':'Kisah Kita'}</span><span class="foil-text" style="font-family:'Pinyon Script',cursive;font-size:28px">${esc(n1)} &amp; ${esc(n2)}</span></span>
  ${guest?`<span class="small" style="color:var(--gold);position:relative">${L.dear} ${esc(guest)}</span>`:''}<span class="caps" style="font-size:10px;color:var(--gold);position:relative">${en?'Open the book':'Buka buku'}</span><span class="bookmark"></span></${tag}></div>`}});
Object.assign(FAM2.vinyl,{cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';return `<div class="cover cv-vinyl"><div class="sleeve-wrap"><div class="disc"><div class="lbl"></div></div><${tag} class="sleeve sl2" ${attr}><span class="sl-ring"></span><span class="sl-sticker">${en?'Limited<br>edition':'Edisi<br>terhad'}</span>
  <span class="sl-top">${en?'The wedding album':'Album perkahwinan'} · ${esc(fmtShort(o.date))}</span><b>${esc(n1)}<br>&amp; ${esc(n2)}</b><span class="sl-tracks">${(o.schedule||[]).filter(s=>s.label).slice(0,4).map((s,i)=>`A${i+1} ${esc(s.label)}`).join(' · ')}</span><span class="caps" style="font-size:10px">${guest?`${L.dear} ${esc(guest)}`:(en?'Tap to play':'Sentuh untuk main')}</span></${tag}></div></div>`}});
Object.assign(FAM2.baldu,{cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';return `<div class="cover cv-baldu"><div class="folio velvet"><div class="ribbon-h"></div>${guest?`<div class="to">${L.dear}<b>${esc(guest)}</b></div>`:`<div class="to"><b>${esc(n1)} &amp; ${esc(n2)}</b></div>`}
  <${tag} class="plate2" ${attr} aria-label="${L.open}"><span>${esc((n1||'A')[0])}&amp;${esc((n2||'A')[0])}</span></${tag}><p class="hint">${en?'Tap the brass plate to open':'Sentuh plat tembaga untuk membuka'}</p></div></div>`}});
const _decoCover=FAM2.deco.cover;FAM2.deco.cover=(o,th,L,guest,tag,attr)=>{const [n1,n2]=coverNames(o);return _decoCover(o,th,L,guest||`${n1} & ${n2}`,tag,attr).replace('<div class="dial">',`<p class="transom foil-text">${ev(o,L)}</p><div class="dial">`)};
const _songCover=FAM2.songket.cover;FAM2.songket.cover=(o,th,L,guest,tag,attr)=>{const [n1,n2]=coverNames(o);return _songCover(o,th,L,guest||`${n1} & ${n2}`,tag,attr)};

/* ---------- per-family content hooks (run after the card renders) ---------- */
const secs=el=>$$('.sheet > .sec',el);
const cards=el=>el.classList.add('cardsecs');

/* kaligrafi: a niche of girih panels that part down the middle, a hanging lamp and an eight-point khatam seal */
const GIRIH=c=>svgUriSq(`<svg ${NS} width="64" height="64" viewBox="0 0 64 64"><g fill="none" stroke="${c}" stroke-width="1.1" stroke-opacity=".5"><rect x="18" y="18" width="28" height="28"/><rect x="18" y="18" width="28" height="28" transform="rotate(45 32 32)"/><circle cx="32" cy="32" r="6"/><path d="M18 18L0 0M46 18L64 0M18 46L0 64M46 46L64 64M32 12.2V0M32 51.8V64M12.2 32H0M51.8 32H64"/><path d="M0 16l8 8-8 8M64 16l-8 8 8 8M16 0l8 8 8-8 8 8 8-8M16 64l8-8 8 8 8-8 8 8" opacity=".6"/></g></svg>`);
const STAR8=svgUriSq(`<svg ${NS} viewBox="0 0 100 100"><path d="M50 2l12.6 17.4 21.3-3.3-3.3 21.3L98 50 80.6 62.6l3.3 21.3-21.3-3.3L50 98 37.4 80.6l-21.3 3.3 3.3-21.3L2 50l17.4-12.6-3.3-21.3 21.3 3.3z"/></svg>`);
function kalArt(th){const g=th.c.gold;return `<div class="kp-in"><svg class="kal-frame" viewBox="0 0 100 150" preserveAspectRatio="none" fill="none" stroke="${g}">
  <rect x="2.5" y="2" width="95" height="146" stroke-width="1.4" vector-effect="non-scaling-stroke"/><rect x="5" y="3.6" width="90" height="142.8" stroke-width=".7" vector-effect="non-scaling-stroke"/>
  <path class="niche" d="M15 143V58C15 38 34 26 50 12C66 26 85 38 85 58V143Z" stroke-width="1.6" vector-effect="non-scaling-stroke"/>
  <path d="M11.5 143V57C11.5 35 32 22 50 7.5C68 22 88.5 35 88.5 57V143" stroke-width=".7" vector-effect="non-scaling-stroke"/>
  </svg>
  <i class="ros tl"></i><i class="ros tr"></i><i class="ros bl"></i><i class="ros br"></i></div>`}
Object.assign(FAM2.kaligrafi,{ms:1500,cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',f=th.foil?'foil-text':'';
  return `<div class="cover cv-kal2" style="--girih:${GIRIH(th.c.gold)};--star8:${STAR8}">
  <div class="kp l">${kalArt(th)}</div><div class="kp r">${kalArt(th)}</div>
  <div class="lamp"><i class="chain"></i><svg viewBox="0 0 40 64"><path d="M20 0v8M12 8h16l-3 6H15zM9 14h22c0 10-4 18-11 24C13 32 9 24 9 14zM15 38h10l-2 6h-6zM20 44v6" fill="${th.c.gold}" fill-opacity=".9" stroke="${th.c.gold}"/><circle cx="20" cy="24" r="4" fill="#fff3c4"/></svg><i class="halo"></i></div>
  <div class="kal-txt"><p class="kal-ev">${ev(o,L)}</p><p class="callig ${f}" style="color:var(--gold)">${CALLIG}</p><p class="kal-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
   ${guest?`<p class="kal-to"><span>${L.dear}</span><b>${esc(guest)}</b></p>`:''}</div>
  <${tag} class="star8" ${attr} aria-label="${L.open}"><i class="ring"></i><i class="st ${th.foil?'foil':''}"></i><span class="callig">${esc(o.jawi||'بارك')}</span><small>${en?'Open':'Buka'}</small></${tag}></div>`}});


/* gerbang, take three: a fine-line wrought-iron leaf in gold foil on paper. Quiet motion: the leaves part a little and the cover fades. */
const GATE_LEAF=(()=>{let p='';const top=x=>104-(x-3)/94*58;
  for(let x=13;x<=89;x+=8){const y=top(x)+5;p+=`<path d="M${x} ${y.toFixed(1)}V150"/><circle cx="${x}" cy="${(y-3.4).toFixed(1)}" r="1.5"/><path d="M${x-2} ${(y+1).toFixed(1)}h4"/>`}
  for(let x=9;x<=81;x+=16)p+=`<path d="M${x} 288V266a8 8 0 0 1 16 0V288"/><circle cx="${x+8}" cy="277" r="2.2"/>`;
  return `<svg ${NS} viewBox="0 0 100 300" fill="none" stroke="#000" stroke-width="1.1" stroke-linecap="round">
  <path d="M3 297V96C3 72 40 54 97 40V297Z" stroke-width="1.6"/><path d="M7.5 293V99C7.5 77 42 60 92.5 47.5V293Z" stroke-width=".8"/>
  <path d="M7.5 150H92.5M7.5 154.5H92.5M7.5 238H92.5M7.5 242.5H92.5M7.5 258H92.5" />
  ${p}
  <circle cx="50" cy="196" r="23"/><circle cx="50" cy="196" r="17" stroke-width=".8"/><circle cx="50" cy="196" r="4"/>
  ${[0,45,90,135].map(a=>`<ellipse cx="50" cy="196" rx="15" ry="4.6" transform="rotate(${a} 50 196)" stroke-width=".8"/>`).join('')}
  <path d="M27 196c-8 0-13-6-11-12s9-6 10-1-4 6-5 3"/><path d="M73 196c8 0 13-6 11-12s-9-6-10-1 4 6 5 3"/>
  <path d="M27 196c-8 0-13 6-11 12s9 6 10 1-4-6-5-3"/><path d="M73 196c8 0 13 6 11 12s-9 6-10 1 4-6 5-3"/>
  <path d="M50 159v14M50 219v19M12 160c6 4 8 10 6 16M88 160c-6 4-8 10-6 16M12 232c6-4 8-10 6-16M88 232c-6-4-8-10-6-16"/>
  <path d="M11 140c2-16 14-22 24-18s8 16 0 16-6-8-1-8" stroke-width=".9"/><path d="M89 140c-2-16-14-22-24-18s-8 16 0 16 6-8 1-8" stroke-width=".9"/>
  </svg>`})();
const GATE_URI=svgUriSq(GATE_LEAF);
Object.assign(FAM2.gerbang,{ms:1150,
 page(o,th,L){const [n1,n2]=coverNames(o);return `<section class="page pg-gate3" style="--leaf:${GATE_URI}"><div class="g3card tex"><i class="g3leaf l"></i><i class="g3leaf r"></i>
   <p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><div class="rule reveal d2"><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
 cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';return `<div class="cover cv-gate3" style="--leaf:${GATE_URI}"><div class="g3sheet tex">
  <div class="g3head"><p class="g3k">${ev(o,L)}</p><p class="g3n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p>${guest?`<p class="g3to">${L.dear}<b>${esc(guest)}</b></p>`:''}</div>
  <div class="g3gate"><i class="g3leaf l"></i><i class="g3leaf r"></i>
  <${tag} class="g3lock" ${attr} aria-label="${L.open}"><span>${esc((n1||'A')[0])}${esc((n2||'A')[0])}</span></${tag}></div>
  <p class="g3hint">${en?'Touch the monogram to open':'Sentuh monogram untuk membuka'}</p></div></div>`}});


/* label, front page take two: a board of vintage apothecary labels */
const ROMN=n=>{let r='';for(const [a,t] of [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']])while(n>=a){r+=t;n-=a}return r};
const DAMASK=c=>svgUriSq(`<svg ${NS} width="56" height="56" viewBox="0 0 56 56"><g fill="${c}" opacity=".09"><path d="M28 6c4 6 4 10 0 14-4-4-4-8 0-14zM28 50c4-6 4-10 0-14-4 4-4 8 0 14zM6 28c6-4 10-4 14 0-4 4-8 4-14 0zM50 28c-6-4-10-4-14 0 4 4 8 4 14 0z"/><circle cx="28" cy="28" r="3"/><circle cx="0" cy="0" r="2"/><circle cx="56" cy="0" r="2"/><circle cx="0" cy="56" r="2"/><circle cx="56" cy="56" r="2"/></g></svg>`);
function lbFrame(c){const notch=(i,r)=>{const a=i,b=300-i,t=i,d=400-i;return `M${a+r} ${t}H${b-r}A${r} ${r} 0 0 0 ${b} ${t+r}V${d-r}A${r} ${r} 0 0 0 ${b-r} ${d}H${a+r}A${r} ${r} 0 0 0 ${a} ${d-r}V${t+r}A${r} ${r} 0 0 0 ${a+r} ${t}Z`};
  const flr=(x,y,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot})" fill="${c.gold}"><path d="M0-7c2.6 2.6 2.6 4.4 0 7-2.6-2.6-2.6-4.4 0-7z"/><path d="M-9 0c3-1.6 5-1.6 7 0-2 1.6-4 1.6-7 0zM9 0c-3-1.6-5-1.6-7 0 2 1.6 4 1.6 7 0z" opacity=".8"/></g>`;
  return `<svg class="lb-frame" viewBox="0 0 300 400"><path d="${notch(0,26)}" fill="${c.sheet}"/><path d="${notch(7,24)}" fill="none" stroke="${c.accent}" stroke-width="2"/><path d="${notch(12,22)}" fill="none" stroke="${c.accent}" stroke-width=".7"/>
   <path d="${notch(18,20)}" fill="none" stroke="${c.gold}" stroke-width="1.4" stroke-dasharray="0 4.2" stroke-linecap="round"/>${flr(150,12,0)}${flr(150,388,180)}${flr(12,200,-90)}${flr(288,200,90)}</svg>`}
function lbRibbon(c){return `<svg class="lb-rib" viewBox="0 0 340 74" preserveAspectRatio="none"><path d="M0 22H52V64H0L16 43Z" fill="${c.accent}" style="filter:brightness(.72)"/><path d="M340 22H288V64H340L324 43Z" fill="${c.accent}" style="filter:brightness(.72)"/>
  <path d="M30 52L52 64V52Z" fill="#000" opacity=".35"/><path d="M310 52L288 64V52Z" fill="#000" opacity=".35"/><rect x="30" y="8" width="280" height="44" fill="${c.accent}"/><path d="M30 13H310M30 47H310" stroke="${c.sheet}" stroke-width=".8" opacity=".55" stroke-dasharray="3 3"/></svg>`}
function lbSticker(c){let d='';const n=26,R=50,r=46;for(let i=0;i<=n;i++){const a=i/n*Math.PI*2,rr=i%1?r:R;const x=60+Math.cos(a)*R,y=60+Math.sin(a)*R;d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);const a2=(i+.5)/n*Math.PI*2;if(i<n)d+=`L${(60+Math.cos(a2)*r).toFixed(1)} ${(60+Math.sin(a2)*r).toFixed(1)}`}
  return `<svg viewBox="0 0 120 120"><path d="${d}Z" fill="${c.sheet}"/><circle cx="60" cy="60" r="40" fill="none" stroke="${c.accent}" stroke-width="1.4"/><circle cx="60" cy="60" r="36.5" fill="none" stroke="${c.gold}" stroke-width=".8" stroke-dasharray="0 3" stroke-linecap="round"/></svg>`}
FAM2.label.page=(o,th,L)=>{const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';const d=new Date((o.date||'2026-01-01')+'T00:00:00');const no=isNaN(d)?'':`№ ${d.getDate()} · ${ROMN(d.getMonth()+1)} · ${ROMN(d.getFullYear())}`;
  return `<section class="page pg-label2" style="--damask:${DAMASK(c.sheet)}">
  <div class="lb-main reveal">${lbFrame(c)}<div class="lb-in">
   ${ENG(th.eng||'jasmine','position:relative;width:34%;background:url(assets/foil.jpg) 0 0/220px,var(--gold);background-blend-mode:overlay','lb-eng')}
   <p class="lb-no">${no}</p><p class="kicker">${ev(o,L)}</p><h1 class="names">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
   <div class="lb-rule"><i></i><b></b><i></i></div><p class="lb-host">${en?'Hosted by':'Anjuran'} ${esc((o.hosts||'').split('&')[0].trim())}</p></div></div>
  <div class="lb-ribbon reveal d1">${lbRibbon(c)}<span>${esc(fmtDate(o.date,o.lang))}</span></div>
  <div class="lb-row reveal d2"><div class="lb-st">${lbSticker(c)}<span><small>${en?'From':'Mula'}</small><b>${esc(fmtTime(o.start,o.lang))}</b></span></div>
   <div class="lb-seal"><span>${esc((n1||'A')[0])}&amp;${esc((n2||'A')[0])}</span></div>
   <div class="lb-st">${lbSticker(c)}<span><small>${en?'At':'Di'}</small><b class="v">${esc(o.venue)}</b></span></div></div></section>`};


/* jubin, take three: a zellige rosette medallion set into a tiled wall panel */
function zelligeRosette(c,small){const P=(r,a)=>[(100+Math.cos(a)*r).toFixed(2),(100+Math.sin(a)*r).toFixed(2)];
  let star='';for(let i=0;i<32;i++){const [x,y]=P(i%2?84:98,i/32*Math.PI*2-Math.PI/2);star+=(i?'L':'M')+x+' '+y}
  let star2='';for(let i=0;i<32;i++){const [x,y]=P(i%2?76:88,(i+1)/32*Math.PI*2-Math.PI/2);star2+=(i?'L':'M')+x+' '+y}
  if(small)return `<svg viewBox="0 0 200 200"><path d="${star}Z" fill="${c.accent}" stroke="${c.sheet}" stroke-width="3"/><path d="${star2}Z" fill="${c.gold}"/><circle cx="100" cy="100" r="40" fill="${c.sheet}"/><circle cx="100" cy="100" r="22" fill="${c.accent}"/></svg>`;
  const pet=Array.from({length:16},(_,i)=>{const a=i/16*360;return `<ellipse cx="100" cy="30" rx="6.5" ry="11.5" transform="rotate(${a} 100 100)" fill="${i%2?c.gold:c.accent}" stroke="${c.sheet}" stroke-width="1.2"/>`}).join('');
  const leaf=Array.from({length:16},(_,i)=>{const a=(i+.5)/16*360;return `<path d="M100 22l3 7-3 6-3-6z" transform="rotate(${a} 100 100)" fill="${c.accent}"/>`}).join('');
  const dia=Array.from({length:32},(_,i)=>{const a=i/32*360;return `<path d="M100 40.5l2.2 2.7-2.2 2.7-2.2-2.7z" transform="rotate(${a} 100 100)" fill="${i%2?c.sheet:c.gold}"/>`}).join('');
  return `<svg viewBox="0 0 200 200"><path d="${star}Z" fill="${c.accent}" stroke="${c.gold}" stroke-width="1"/><path d="${star2}Z" fill="${c.sheet}" opacity=".96"/>
   <circle cx="100" cy="100" r="77" fill="none" stroke="${c.accent}" stroke-width=".8"/>${pet}${leaf}
   <circle cx="100" cy="100" r="60" fill="${c.sheet}" stroke="${c.accent}" stroke-width="1.2"/><circle cx="100" cy="100" r="57" fill="${c.accent}"/>${dia}
   <circle cx="100" cy="100" r="51.5" fill="${c.sheet}"/><circle cx="100" cy="100" r="49" fill="none" stroke="${c.gold}" stroke-width=".7"/><circle cx="100" cy="100" r="46.5" fill="none" stroke="${c.accent}" stroke-width=".5" stroke-dasharray="0 2.4" stroke-linecap="round"/></svg>`}
Object.assign(FAM2.jubin,{ms:1200,cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',corner=zelligeRosette(c,true);
  return `<div class="cover cv-jub3" style="--tiles:${tileUri(c.accent,c.sheet)}"><div class="j3-wall"></div>
  <div class="j3-panel"><i class="j3-c tl">${corner}</i><i class="j3-c tr">${corner}</i><i class="j3-c bl">${corner}</i><i class="j3-c br">${corner}</i>
   <p class="j3-k">${ev(o,L)}</p>
   <${tag} class="j3-med" ${attr} aria-label="${L.open}">${zelligeRosette(c)}<span class="j3-in"><b class="j3-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</b><span class="j3-d">${esc(fmtShort(o.date))}</span></span></${tag}>
   ${guest?`<p class="j3-to"><span>${L.dear}</span><b>${esc(guest)}</b></p>`:''}
   <p class="j3-h">${en?'Touch the medallion to open':'Sentuh medalion untuk membuka'}</p></div></div>`}});

const SKINS={
 sampul:cards,
 mihrab(el,o,th){cards(el);el.style.setProperty('--lattice',`${latticeUri(th.c.gold,.35)} 0 0/64px`);const cv=$('.cv-mihrab',el);if(cv){cv.style.setProperty('--lattice',JALI(th.c.gold));$$('.door',cv).forEach((d,i)=>d.insertAdjacentHTML('beforeend',`<i class="handle ${i?'r':'l'}"></i>`));const [n1,n2]=coverNames(o);cv.insertAdjacentHTML('beforeend',`<p class="door-names">${esc(n1)} &amp; ${esc(n2)}</p>`)}},
 songket(el){el.style.setProperty('--band',SONGKET_H)},
 tiket(el,o){cards(el);const en=o.lang==='en';secs(el).forEach((s,i)=>s.dataset.gate=`${en?'GATE':'PINTU'} A${i+1}  ·  ${en?'BOARDING':'MENAIKI'}  ·  SND ${fmtShort(o.date).slice(0,5).replace('.','')}`)},
 herb:cards,baldu:cards,bingkai:cards,bahagia:cards,telegram:cards,mancis:cards,label:cards,
 poskad(el,o,th){cards(el);secs(el).forEach(s=>s.insertAdjacentHTML('afterbegin',`<span class="stamp pstamp"><span class="in" style="--stampbg:url(${A}flower-${th.stamp}.webp);--stampc:${th.c.accent}"></span></span>`))},
 batik(el,o,th){el.style.setProperty('--motif',`url(${A}eng-${th.motif}.webp)`)},
 tingkap(el,o,th){cards(el);el.style.setProperty('--lat',latticeSq('#000'))},
 foto(el,o){const ph=(o.photos||[]).filter(Boolean),src=ph[1]||ph[0]||SAMPLE_PHOTO;['when','sched'].forEach((k,i)=>{const s=$(`[data-s="${k}"]`,el);s&&s.insertAdjacentHTML('afterend',`<div class="spread" style="background-image:url(${ph[i+1]||src});background-position:${i?'30% 70%':'70% 30%'}"></div>`)})},
 renda(el,o,th){cards(el);el.style.setProperty('--lace',laceBorder(th.c.lace))},
 kertas(el,o,th){const [a,b,c]=th.layers;el.style.setProperty('--l1',a);el.style.setProperty('--l2',b);el.style.setProperty('--l3',c)},
 akuarel(el,o,th){el.style.setProperty('--wash1',th.c.wash1);el.style.setProperty('--wash2',th.c.wash2)},
 peta(el,o,th){el.style.setProperty('--mapbg',`url(${A}map-${th.map}.jpg)`)},
 kaca(el,o,th){cards(el);const g=th.glass;el.style.setProperty('--glassbg',`repeating-linear-gradient(45deg,${g[0]} 0 10px,#1e1a18 10px 11px,${g[1]} 11px 21px,#1e1a18 21px 22px,${g[2]} 22px 32px,#1e1a18 32px 33px,${g[3]} 33px 43px,#1e1a18 43px 44px)`)},
 akhbar(el,o){const en=o.lang==='en';const K=en?{intro:'Announcement',when:'Details',count:'Countdown',sched:'Programme',gallery:'Pictures',doa:'Prayer',rsvp:'Reply form',wishes:'Letters to the editor',gift:'Notices',contact:'Enquiries'}:{intro:'Pengumuman',when:'Butiran majlis',count:'Detik demi detik',sched:'Jadual',gallery:'Gambar',doa:'Doa',rsvp:'Borang jawapan',wishes:'Surat pembaca',gift:'Iklan',contact:'Pertanyaan'};secs(el).forEach(s=>{const h=$('h2',s);if(h)h.dataset.kicker=K[s.dataset.s]||''})},
 vinyl(el,o){const en=o.lang==='en';$$('.sec h2',el).forEach((h,i)=>h.dataset.side=`${en?'Side':'Sisi'} ${i<4?'A':'B'} · ${en?'Track':'Lagu'} ${i+1}`)},
 buku(el,o){const en=o.lang==='en',N=en?EN_NUM:BM_NUM;secs(el).forEach((s,i)=>{s.dataset.page=i+2;const h=$('h2',s);if(h)h.dataset.chap=`${en?'Chapter':'Bab'} ${N[i+1]||i+2}`})},
 jahit(el,o,th){const c=th.c;$$('.sec h2',el).forEach(h=>{h.innerHTML=stitchSvg([h.textContent.toUpperCase()],c.accent,3)});secs(el).forEach(s=>s.insertAdjacentHTML('beforeend',heartRow(c.accent,10,3).replace('<svg ','<svg class="stitchrule" ')))},
 jubin(el,o,th){cards(el);el.style.setProperty('--tiles',tileUri(th.c.accent,th.c.sheet))},
 pawagam(){},
 gerbang(el,o,th){cards(el);el.style.setProperty('--metal',th.c.metal)},
 lakaran(el,o,th){const others=Object.keys(SK_AR).filter(k=>k!==th.sk);['when','rsvp'].forEach((k,i)=>{const s=$(`[data-s="${k}"]`,el);const sk=others[(i*2+1)%others.length];s&&s.insertAdjacentHTML('afterbegin',`<div class="sketchv" style="--m:url(${A}sk-${sk}.webp);aspect-ratio:${SK_AR[sk]}"></div>`)})},
 anyaman(el,o,th){cards(el);el.style.setProperty('--weave',weaveUri('#d9c08a','#c9ab70'))},
};
</script>
