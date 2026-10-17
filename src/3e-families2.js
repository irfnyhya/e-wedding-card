
/* ================= round two: eight more families, fifty more designs ================= */
Object.assign(FAMILIES,{
 songket:{name:'Songket',meaning:'Woven gold',blurb:'Gold pucuk rebung bands woven down silk. The two panels of cloth part at the clasp.',f:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 tiket:{name:'Tiket',meaning:'Boarding pass',blurb:'A passport opens on a boarding pass from one name to the other, with gate, seat and barcode.',f:{d:"'IBM Plex Mono', monospace",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"}},
 herb:{name:'Herbarium',meaning:'Pressed flowers',blurb:'One pressed flower taped to handmade paper, with a typed specimen label. It slides out of a glassine sleeve.',f:{d:"'Special Elite', monospace",s:"'Homemade Apple', cursive",b:"'Cormorant Garamond', serif"}},
 tipografi:{name:'Tipografi',meaning:'The date, set large',blurb:'The date in tall Bodoni numerals, names in italic. A split curtain parts to show it.',f:{d:"'Jost', sans-serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"}},
 deco:{name:'Deco',meaning:'Art deco gold',blurb:'Stepped corners and fanned rays in gold. Lift doors slide open under a floor dial.',f:{d:"'Poiret One', sans-serif",s:"'Poiret One', sans-serif",b:"'Cormorant Garamond', serif"}},
 baldu:{name:'Baldu',meaning:'Velvet folio',blurb:'A velvet folio with a satin ribbon and a gilt name plate. The cover swings open on the card.',f:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 bingkai:{name:'Bingkai',meaning:'Gilt frame',blurb:'An engraved baroque frame in gold or ink around your names. It comes forward as the card opens.',f:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 poskad:{name:'Poskad',meaning:'Old postcard',blurb:'A hand-coloured postcard of old Malaya. Flip it to read the invitation, stamped and postmarked with your date.',f:{d:"'Cormorant Garamond', serif",s:"'Homemade Apple', cursive",b:"'Cormorant Garamond', serif"}},
});
const T2=(id,fam,name,desc,c,extra={})=>({id,fam,name,desc,c:{line:'rgba(40,30,25,.18)',...c},...extra});
THEMES.push(
 // one more colourway for each of the first four families
 T2('sampul-biru','sampul','Biru Nila','Indigo envelope, blue seal',{ground:'#1c2740',env:'#2d3d63',envInk:'#eef0f5',liner:'#e9e4d8',sheet:'#fbf9f4',ink:'#26324a',accent:'#2d3d63',gold:'#8a99b8'},{seal:'biru',fl:['iris','forget-me-not'],emb:'iris'}),
 T2('mihrab-merah','mihrab','Merah Bata','Brick doors, anemones',{ground:'#5a1d1a',door:'#6a2420',sheet:'#f7f0e4',ink:'#3a2420',accent:'#6a2420',gold:'#c49a5c'},{fl:['anemones','red-rose']}),
 T2('ukiran-merah','ukiran','Dakwat Merah','Oxblood ink, roses',{ground:'#f3ece2',sheet:'#f3ece2',ink:'#6e1a26',accent:'#6e1a26',gold:'#6e1a26',line:'rgba(110,26,38,.22)'},{eng:['red-rose','cabbage-rose']}),
 T2('catair-ungu','catair','Ungu Senja','Iris and anemones',{ground:'#fcfbfd',sheet:'#fcfbfd',ink:'#3a3349',accent:'#5d4a8a',gold:'#a99cc8',line:'rgba(58,51,73,.16)'},{fl:['iris','anemones']}),
 // songket
 ...[['merah','Merah Diraja','Royal red silk','#5c0f1c','#d4a54f','emas'],['nila','Biru Nila','Indigo silk','#15224a','#d2ad62','emas'],['zamrud','Hijau Zamrud','Emerald silk','#0f3d2e','#d0aa5a','emas'],['hitam','Hitam Malam','Black silk','#161313','#cfa860','emas'],['terung','Ungu Terung','Aubergine silk','#3b1838','#d6ae6a','emas'],['gading','Gading','Ivory silk, dark gold','#eadfc8','#9a7535','merah']]
   .map(([k,n,d,g,au,seal])=>T2('songket-'+k,'songket',n,d,{ground:g,gold:au,sheet:'#f6efe0',pagefg:k==='gading'?'#3a2a1c':'#f6efe0',ink:'#2e2620',accent:k==='gading'?'#6e1a26':g},{seal})),
 // tiket
 ...[['laut','Biru Laut','Navy passport','#e9edf2','#1d2b4a','#1d2b4a'],['merah','Merah','Maroon passport','#efe7df','#5e1622','#7a1b29'],['hutan','Hutan','Forest passport','#e8ebe2','#1f3a2c','#2c5a43'],['malam','Malam','Black and gold','#e9e5dc','#151515','#151515'],['jambu','Jambu','Blush passport','#f6ece9','#b77a83','#a3465f'],['langit','Langit','Sky blue','#eef4f8','#5b86b0','#3c6a96']]
   .map(([k,n,d,g,cv,ac])=>T2('tiket-'+k,'tiket',n,d,{ground:g,cover:cv,gold:'#d8b46a',sheet:'#fffdf8',ink:'#26262a',accent:ac})),
 // herbarium
 ...[['melati','Melati','Pressed jasmine','jasmine','#d9cdb9','#a3465f','#c9a77a'],['raya','Bunga Raya','Pressed hibiscus','hibiscus','#cfc3b2','#9c3a52','#d9a7b5'],['iris','Iris','Pressed iris','iris','#c9cdd3','#2d4b78','#a9bbd6'],['lupa','Lupa Jangan','Forget-me-nots','forget-me-not','#d3d6cc','#3c5f8a','#b8c7a0'],['anemone','Anemone','Pressed anemones','anemones','#d8cbbd','#8a2a2a','#c9b06a'],['mawar','Mawar Liar','Pressed wild rose','wild-rose','#d2d0c0','#6e3a4a','#d1a3a3']]
   .map(([k,n,d,f,g,ac,tape])=>T2('herb-'+k,'herb',n,d,{ground:g,sheet:'#fbf8f1',ink:'#3a3128',accent:ac,gold:ac,tape},{fl:[f,f]})),
 // tipografi
 ...[['gading','Gading','Black on ivory','#f4efe5','#151413','#151413'],['batu','Batu','Ivory on taupe','#6b625a','#f2ece2','#f2ece2'],['cili','Cili','Chilli red on cream','#f6efe4','#2a211d','#b3261e'],['zaitun','Zaitun','Olive on stone','#e6e3d6','#2a2e22','#5d6b3a'],['kobalt','Kobalt','Cobalt on white','#f7f7f4','#1b2140','#2341a8'],['arang','Arang','Ivory on charcoal','#232220','#efe9df','#d9c7a6']]
   .map(([k,n,d,g,ink,ac])=>T2('tipografi-'+k,'tipografi',n,d,{ground:g,sheet:k==='batu'||k==='arang'?'#f7f3ec':g,ink:k==='batu'||k==='arang'?'#2a2420':ink,accent:k==='batu'||k==='arang'?'#2a2420':ac,pageAccent:ac,gold:ac,line:'rgba(40,30,25,.2)',pageInk:ink},{})),
 // deco
 ...[['noir','Noir','Gold on black','#111111'],['zamrud','Zamrud','Gold on emerald','#0d3a2f'],['nila','Nila','Gold on navy','#141d38'],['wain','Wain','Gold on burgundy','#3e0f1a'],['gading','Gading','Gold on ivory','#efe7d6']]
   .map(([k,n,d,g])=>T2('deco-'+k,'deco',n,d,{ground:g,gold:k==='gading'?'#9a7535':'#d2ad62',sheet:'#f4ede0',pagefg:k==='gading'?'#2d241a':'#f4ede0',ink:'#29231d',accent:k==='gading'?'#6b4f22':'#8a6a2c'},{})),
 // baldu
 ...[['wain','Merah Wain','Wine velvet','#4a0f1c','#7a1b29','red-rose'],['zamrud','Zamrud','Emerald velvet','#0f3b2e','#c9a25a','white-roses'],['diraja','Biru Diraja','Royal blue velvet','#16244e','#c9a25a','iris'],['champagne','Champagne','Champagne velvet','#b8a68a','#efe6d4','blush-rose'],['hitam','Hitam','Black velvet','#151314','#7a1b29','cabbage-rose']]
   .map(([k,n,d,g,rib,f])=>T2('baldu-'+k,'baldu',n,d,{ground:g,ribbon:rib,gold:'#d6b06a',sheet:'#fbf7ef',ink:'#2e2622',accent:g==='#b8a68a'?'#7a5c3a':g},{fl:[f,f]})),
);

THEMES.forEach(t=>{THEME[t.id]=t});

/* ---------- shared bits ---------- */
const svgUriSq=s=>`url('data:image/svg+xml,${encodeURIComponent(s)}')`;
const SONGKET_BAND=svgUriSq(`<svg ${NS} width="60" height="48" viewBox="0 0 60 48"><path d="M2 0V48M6 0V48M54 0V48M58 0V48" stroke="#000" stroke-width="1.6"/><path d="M30 6L44 24L30 42L16 24Z" fill="none" stroke="#000" stroke-width="2"/><path d="M30 14L37 24L30 34L23 24Z"/><path d="M8 0L17 12L8 24ZM8 24L17 36L8 48Z"/><path d="M52 0L43 12L52 24ZM52 24L43 36L52 48Z"/><circle cx="30" cy="0" r="2.6"/><circle cx="30" cy="48" r="2.6"/></svg>`);
const TABUR=svgUriSq(`<svg ${NS} width="96" height="96" viewBox="0 0 96 96"><g transform="translate(24 24)">${[0,45,90,135].map(a=>`<ellipse rx="2.2" ry="7" transform="rotate(${a})"/>`).join('')}<circle r="2.2" fill="#fff"/></g><g transform="translate(72 72)">${[0,45,90,135].map(a=>`<ellipse rx="2.2" ry="7" transform="rotate(${a})"/>`).join('')}<circle r="2.2" fill="#fff"/></g></svg>`);
const PLANE='<svg viewBox="0 0 54 30" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 26C14 6 40 6 52 26" stroke-dasharray="3 3"/><path d="M27 4l4 3-7 1-3 3-2-1 2-3-4-1 1-1 5 0 4-1z" fill="currentColor" stroke="none" transform="translate(-1 1)"/></svg>';
function barcode(seed){let h=0;for(const ch of seed)h=(h*31+ch.charCodeAt(0))>>>0;const r=rng(h||7);let x=0,s='';while(x<200){const w=1+Math.floor(r()*3.2);if(r()>.42)s+=`<rect x="${x}" y="0" width="${w}" height="46"/>`;x+=w+1}return `<svg class="bar" viewBox="0 0 200 46" preserveAspectRatio="none" fill="currentColor">${s}</svg>`}
function decoFrame(gold,uid){const g=`url(#dg${uid})`;let rays='';for(let a=15;a<=165;a+=10){const rad=a*Math.PI/180;rays+=`<path d="M${50+Math.cos(rad)*14} ${4+Math.sin(rad)*9} L${50+Math.cos(rad)*(a%20?24:30)} ${4+Math.sin(rad)*(a%20?16:20)}"/>`}
  return `<svg viewBox="0 0 100 150" preserveAspectRatio="none" style="width:100%;height:100%"><defs><linearGradient id="dg${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${gold}"/><stop offset=".45" stop-color="#f6e2a8"/><stop offset=".55" stop-color="${gold}"/><stop offset="1" stop-color="#8a6a2c"/></linearGradient></defs><g fill="none" stroke="${g}" stroke-width="1.1" vector-effect="non-scaling-stroke" style="vector-effect:non-scaling-stroke">
  <rect x="0.5" y="0.5" width="99" height="149"/><rect x="3" y="2.5" width="94" height="145"/>
  <path d="M3 14H9V10H14V2.5M97 14H91V10H86V2.5M3 136H9V140H14V147.5M97 136H91V140H86V147.5"/>
  <path d="M38 4A12 8 0 0 0 62 4M32 4A18 12 0 0 0 68 4M26 4A24 16 0 0 0 74 4"/>${rays}
  <path d="M6 30V120M7.6 34V116M94 30V120M92.4 34V116"/>
  <path d="M40 146L50 139L60 146M44 146L50 142L56 146"/></g></svg>`}
function decoDial(gold){let t='';for(let a=200;a<=340;a+=20){const r=a*Math.PI/180;t+=`<path d="M${50+Math.cos(r)*36} ${46+Math.sin(r)*36}L${50+Math.cos(r)*42} ${46+Math.sin(r)*42}"/>`}
  return `<svg class="dial" viewBox="0 0 100 50" fill="none" stroke="${gold}" stroke-width="1.2"><path d="M4 46A46 46 0 0 1 96 46Z"/><path d="M12 46A38 38 0 0 1 88 46"/>${t}<path d="M50 46L72 22" stroke-width="2"/><circle cx="50" cy="46" r="3" fill="${gold}"/></svg>`}

/* ---------- renderers ---------- */
const FAM2={
 songket:{ms:1150,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c;const band=`<div class="band foil fmask l" style="--m:${SONGKET_BAND};--ms:100% auto;--mr:repeat-y"></div><div class="band foil fmask r" style="--m:${SONGKET_BAND};--ms:100% auto;--mr:repeat-y"></div>`;
   return `<section class="page pg-songket silk">${band}<div class="tabur foil fmask" style="--m:${TABUR};--ms:120px;opacity:.4"></div><div class="mid">
    ${o.jawi?`<p class="mono foil-text reveal">${esc(o.jawi)}</p>`:''}<p class="kicker reveal" style="color:var(--gold)">${esc(L.ev[o.eventTitle]||L.ev.walimah)}</p>
    <h1 class="names foil-text reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="small it reveal d2">${esc(o.hijri)}</p>`:''}<p class="small reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o);const cl=s=>`<div class="cloth ${s} silk"><div class="band foil fmask" style="--m:${SONGKET_BAND};--ms:100% auto;--mr:repeat-y"></div><div class="foil fmask" style="position:absolute;inset:0;--m:${TABUR};--ms:96px;opacity:.6"></div></div>`;
   return `<div class="cover cv-songket">${cl('l')}${cl('r')}${guest?`<div class="to"><span class="caps" style="font-size:10px;color:var(--gold)">${L.dear}</span><b class="foil-text" style="display:block;font-family:var(--s);font-size:26px;font-weight:400;margin-top:4px">${esc(guest)}</b></div>`:''}
    <${tag} class="clasp" ${attr} style="--seal:url(${A}seal-${th.seal}.webp)" aria-label="${L.open}"><span>${esc(o.jawi||((n1||'A')[0]+(n2||'A')[0]))}</span></${tag}><p class="hint">${L.tapSeal.replace(/mohor|seal/,o.lang==='en'?'clasp':'kancing')}</p></div>`}},
 tiket:{ms:1300,
  page(o,th,L){const [n1,n2]=coverNames(o);const code=s=>esc((s||'XXX').normalize('NFD').replace(/[^A-Za-z]/g,'').slice(0,3).toUpperCase());const en=o.lang==='en';
   return `<section class="page pg-tiket linen"><div class="ticket reveal"><div class="hd"><span>${en?'Boarding pass':'Pas masuk'}</span><span>SND ${esc(fmtShort(o.date).slice(0,5).replace('.',''))}</span></div>
    <div class="route"><div><span>${en?'From':'Dari'}</span><b>${code(n1)}</b></div>${PLANE}<div class="to"><span>${en?'To':'Ke'}</span><b>${code(n2)}</b></div></div>
    <div class="names-row">${esc(n1)} &amp; ${esc(n2)}</div>
    <div class="grid"><div><span>${en?'Date':'Tarikh'}</span><b>${esc(fmtShort(o.date))}</b></div><div><span>${en?'Boarding':'Masa'}</span><b>${esc(fmtTime(o.start,o.lang))}</b></div><div style="grid-column:1/-1"><span>${en?'Gate':'Pintu'}</span><b>${esc(o.venue)}</b></div><div><span>${en?'Class':'Kelas'}</span><b>${en?'Honoured guest':'Tetamu kehormat'}</b></div><div><span>${en?'Occasion':'Majlis'}</span><b>${esc(L.ev[o.eventTitle]||L.ev.walimah)}</b></div></div>
    <div class="perf"></div><div class="stub">${barcode(n1+n2+o.date)}<div class="seat">${en?'Seat':'Kerusi'}<b>VIP</b></div></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o);const en=o.lang==='en';
   return `<div class="cover cv-tiket linen">${guest?`<div class="to" style="color:var(--ink)"><span class="caps" style="font-size:10px">${L.dear}</span><b style="display:block;font-family:'Pinyon Script',cursive;font-weight:400;font-size:26px;margin-top:2px">${esc(guest)}</b></div>`:''}
    <${tag} class="passport velvet" ${attr}><span class="pt foil-text">${en?'Passport':'Pasport'}</span><span class="emblem foil">${PLANE.replace('stroke-dasharray="3 3"','')}</span><span class="pt foil-text" style="font-size:10px">${esc(n1)} &amp; ${esc(n2)}</span><span class="pn foil-text">${en?'One-way to forever':'Sehala ke selamanya'}</span></${tag}><p class="hint" style="color:var(--ink)">${en?'Tap the passport to check in':'Sentuh pasport untuk daftar masuk'}</p></div>`}},
 herb:{ms:1100,
  page(o,th,L){const [n1,n2]=coverNames(o),f=th.fl[0];const en=o.lang==='en';const latin={jasmine:'Jasminum sambac',hibiscus:'Hibiscus syriacus',iris:'Iris germanica','forget-me-not':'Myosotis','anemones':'Anemone coronaria','wild-rose':'Rosa canina'}[f]||'';
   return `<section class="page pg-herb linen"><div class="herb-sheet tex">
    <div class="press reveal"><span class="tape" style="left:-10%;top:16%;transform:rotate(-24deg)"></span>${`<img src="${A}flower-${f}.webp" alt="" decoding="async">`}<span class="tape" style="right:-12%;bottom:22%;transform:rotate(-18deg)"></span></div>
    <p class="kicker reveal d1" style="font-family:'Special Elite',monospace;letter-spacing:.2em;color:var(--ink)">${esc(L.ev[o.eventTitle]||L.ev.walimah)}</p>
    <h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
    <div class="label reveal d2"><div class="lt"><span>${en?'Specimen':'Spesimen'}</span><span>No. ${esc(fmtShort(o.date).replace(/\./g,''))}</span></div>${esc(latin)}<br>${en?'Pressed on':'Ditekan pada'}: ${esc(fmtDate(o.date,o.lang))}<br>${en?'Found at':'Ditemui di'}: ${esc(o.venue)}</div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-herb"><div class="glassine"><div class="sticker">${en?'For':'Untuk'}<b>${esc(guest||(en?'our dear guest':'tetamu kami'))}</b></div><${tag} class="open-btn" ${attr} style="font-family:'Special Elite',monospace">${en?'Slide it out':'Keluarkan'}</${tag}></div></div>`}},
 tipografi:{ms:1000,
  page(o,th,L){const [n1,n2]=coverNames(o);const [y,m,d]=(o.date||'2026-01-01').split('-');const en=o.lang==='en';
   return `<section class="page pg-tipo"><div class="top reveal"><span>${esc(L.ev[o.eventTitle]||L.ev.walimah)}</span><span>${esc(fmtTime(o.start,o.lang))}</span></div>
    <div class="nums reveal d1">${d}<br>${m}<br>${y.slice(2)}</div>
    <div class="who reveal d2"><h1 class="names">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p>${esc(o.venue)}<br>${esc(DAYS[o.lang][new Date(o.date+'T00:00:00').getDay()]||'')}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o);return `<div class="cover cv-tipo"><div class="half t"><b>${esc(n1)}</b></div><div class="half b"><b>&amp; ${esc(n2)}</b></div>${guest?`<div class="to">${L.dear}<b>${esc(guest)}</b></div>`:''}<div class="bar"><${tag} ${attr}>${L.openVellum}</${tag}></div></div>`}},
 deco:{ms:1200,
  page(o,th,L){const [n1,n2]=coverNames(o),u=(FAM2.n=(FAM2.n||0)+1);return `<section class="page pg-deco linen"><div class="frame">${decoFrame(th.c.gold,u)}</div><div class="mid">
    <p class="kicker reveal" style="font-family:var(--s);letter-spacing:.3em">${esc(L.ev[o.eventTitle]||L.ev.walimah)}</p><h1 class="names foil-text reveal d1">${esc(n1)}<span class="amp" style="display:block">&amp;</span>${esc(n2)}</h1>
    <p class="caps reveal d2" style="font-family:var(--s);letter-spacing:.3em">${esc(fmtShort(o.date))}</p><p class="small reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const u=(FAM2.n=(FAM2.n||0)+1);const door=s=>`<div class="door ${s} linen"><div style="position:absolute;inset:8px;${s==='r'?'transform:scaleX(-1)':''}">${decoFrame(th.c.gold,u+s)}</div></div>`;
   return `<div class="cover cv-deco linen"><div class="dial">${decoDial(th.c.gold)}</div>${door('l')}${door('r')}${guest?`<div class="to"><span class="caps" style="font-size:10px;color:var(--gold)">${L.dear}</span><b class="foil-text">${esc(guest)}</b></div>`:''}
    <${tag} class="call" ${attr} aria-label="${L.open}"><i class="foil"></i></${tag}><p class="lbl foil-text">${o.lang==='en'?'Call the lift':'Panggil lif'}</p></div>`}},
 baldu:{ms:1350,
  page(o,th,L){const [n1,n2]=coverNames(o),f=th.fl[0];return `<section class="page pg-baldu velvet"><div class="inset tex">${FL(f,'width:58%;right:-14%;top:-6%;transform:rotate(180deg)')}${FL(f,'width:54%;left:-14%;bottom:-6%')}<div class="fline foil"></div>
    <p class="kicker reveal">${esc(L.ev[o.eventTitle]||L.ev.walimah)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><div class="rule reveal d2"><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o);return `<div class="cover cv-baldu"><div class="folio velvet"><div class="ribbon"></div>${guest?`<div class="to"><span class="caps" style="font-size:10px">${L.dear}</span><b>${esc(guest)}</b></div>`:''}
    <${tag} class="plate foil" ${attr} aria-label="${L.open}"><span>${esc((n1||'A')[0])}&amp;${esc((n2||'A')[0])}</span></${tag}><p class="hint">${o.lang==='en'?'Tap the plate to open':'Sentuh plat untuk membuka'}</p></div></div>`}},
 bingkai:{ms:1000,
  page(o,th,L){const [n1,n2]=coverNames(o);return `<section class="page pg-bingkai linen" style="color:var(--pagefg)">${gframe(th)}<div class="oval-c"></div><div class="mid">
    <p class="kicker reveal" style="color:var(--pageAccent)">${esc(L.ev[o.eventTitle]||L.ev.walimah)}</p><h1 class="names reveal d1" style="color:var(--pageAccent)">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p class="caps reveal d2" style="font-size:11px">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){return `<div class="cover cv-bingkai linen" style="color:var(--pagefg)">${gframe(th)}<div class="mid"><div class="oval-c" style="position:absolute"></div>${guest?`<p class="to-line" style="position:relative">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="kicker" style="position:relative;color:var(--pageAccent)">${esc(L.ev[o.eventTitle]||L.ev.walimah)}</p><${tag} class="open-btn" ${attr} style="position:relative;color:var(--pagefg);border-color:var(--pagefg)">${L.openVellum}</${tag}></div></div>`}},
};
function postmark(o,c){const d=fmtShort(o.date);return `<svg class="postmark" viewBox="0 0 80 80" fill="none" stroke="${c}"><circle cx="40" cy="40" r="36" stroke-width="1.6"/><circle cx="40" cy="40" r="24" stroke-width="1"/><defs><path id="pm-arc" d="M12 40a28 28 0 0 1 56 0"/></defs><text font-family="IBM Plex Mono, monospace" font-size="7.5" fill="${c}" stroke="none" letter-spacing="1.5"><textPath href="#pm-arc" startOffset="50%" text-anchor="middle">${esc((o.venue||'').toUpperCase().slice(0,20))}</textPath></text><text x="40" y="43" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8" fill="${c}" stroke="none">${esc(d)}</text><path d="M76 30h40M76 38h40M76 46h40M76 54h40" stroke-width="1.4"/></svg>`}
FAM2.poskad={ms:1300,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';return `<section class="page pg-poskad linen">
    <div class="pc photo reveal"><div class="img" style="background-image:url(${A}pc-${th.pc}.jpg)"></div><p class="cap">${esc(th.cap)}</p></div>
    <div class="pc back reveal d1"><div class="ttl"><span>${en?'Post card':'Poskad'}</span><span>${esc(L.ev[o.eventTitle]||L.ev.walimah)}</span></div>
     <div class="msg">${en?'With love, from':'Dengan kasih,'}<br><span class="names">${esc(n1)} &amp; ${esc(n2)}</span><br>${en?'Please join us on':'Jemputlah hadir pada'} ${esc(fmtDate(o.date,o.lang))}, ${esc(fmtTime(o.start,o.lang))}.</div>
     <div class="addr"><span class="stamp"><span class="in" style="--stampbg:url(${A}flower-${th.stamp}.webp);--stampc:${th.c.accent}">${esc(fmtShort(o.date).slice(-4))}</span></span>${postmark(o,th.c.accent)}<p>${esc(o.venue)}</p><p>${esc((o.address||'').split(',').slice(-2).join(',').trim())}</p><p>${esc(o.hijri||'')}</p></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-poskad linen">${guest?`<p class="to">${en?'To':'Kepada'} ${esc(guest)}</p>`:''}<${tag} class="pcflip" ${attr} aria-label="${L.open}"><span class="face"><span class="img" style="background-image:url(${A}pc-${th.pc}.jpg)"></span><span class="cap">${esc(th.cap)}</span></span><span class="face bk"></span></${tag}><p class="hint">${en?'Tap the postcard to turn it over':'Sentuh poskad untuk membalikkannya'}</p></div>`}};
function gframe(th){return `<div class="gframe fmask ${th.foil===false?'':'foil'}" style="--m:url(${A}eng-frame-${th.frame}.webp);--ms:contain;--mr:no-repeat;--mp:center;${th.foil===false?'background:var(--gold)':''}"></div>`}
THEMES.push(...[
  ['gading','Gading Emas','Gold frame on ivory','a','#f3ecdc','#b08d4a','#3a2c20','#7a5a2a',true],
  ['hitam','Emas Hitam','Gold frame on black','b','#141210','#d2ad62','#efe6d2','#e3c27a',true],
  ['dakwat','Dakwat','Sepia ink frame','c','#f6f2ea','#4b3a2a','#3a2c20','#4b3a2a',false],
  ['sage','Sage','Gold frame on sage','a','#dfe3d3','#9a8146','#2f3a2c','#55654b',true],
  ['jambu','Jambu','Rose-gold frame on blush','b','#f3e3de','#b07a6a','#4a3437','#9c5a5a',true],
  ['nila','Nila','Gold frame on navy','c','#17203a','#d2ad62','#eef0f5','#e3c27a',true],
].map(([k,n,d,fr,g,au,fg,ac,foil])=>T2('bingkai-'+k,'bingkai',n,d,{ground:g,gold:au,pagefg:fg,pageAccent:ac,sheet:'#fbf8f1',ink:'#2e2620',accent:['hitam','nila'].includes(k)?'#7a5a2a':ac},{frame:fr,foil})));
THEMES.push(...[
  ['kl','Kuala Lumpur','Government Printing Office, c.1910','kl','Kuala Lumpur, 1910','#c9b9a0','#9c3a2e','hibiscus'],
  ['pasar','Pasar Besar','Central Market, Kuala Lumpur','pasar','Pasar Besar, Kuala Lumpur','#b9b3a6','#2f5a3c','jasmine'],
  ['masjid','Masjid Lama',"Masjid Dato' Dagang, 1930",'masjid',"Masjid Dato' Dagang, 1930",'#cbc3b0','#2e4637','white-roses'],
  ['pinang','Pulau Pinang','The Penang shore','pinang','Pulau Pinang','#bfc4bd','#2d4b78','forget-me-not'],
  ['boyan','Kampong Boyan','A river kampong, hand-coloured','boyan','Kampong Boyan','#c7cfd2','#3c5f8a','lotus'],
  ['timah','Bukit Timah','A country road, hand-coloured','timah','Bukit Timah','#bfc6b0','#55654b','wild-rose'],
].map(([k,n,d,pc,cap,g,ac,st])=>T2('poskad-'+k,'poskad',n,d,{ground:g,sheet:'#f8f3e8',ink:'#3a3128',accent:ac,gold:ac},{pc,cap,stamp:st})));
THEMES.forEach(t=>{THEME[t.id]=t});
CATS=[['all','All'],...Object.entries(FAMILIES).filter(([k])=>THEMES.some(t=>t.fam===k)).map(([k,f])=>[k,f.name])];
</script>
