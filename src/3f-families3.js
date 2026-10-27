<script>
/* ================= round three: six more families and colourways across the collection (162 designs) ================= */
Object.assign(FAMILIES,{
 batik:{name:'Batik',meaning:'Foil batik',blurb:'Dyed paper with batik motifs in gold foil down one edge. It hangs under a cloth with a paper tag.',f:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 tingkap:{name:'Tingkap',meaning:'The window',blurb:'A timber window of a Malay house, with a carved fanlight and a view of old Malaya. The louvred shutters swing open.',f:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 foto:{name:'Foto',meaning:'Your photo',blurb:'Built around your own photo: a magazine cover, a film strip or a polaroid. It develops when it is opened.',f:{d:"'Jost', sans-serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 bahagia:{name:'Bahagia',meaning:'Double happiness',blurb:'Red and gold with the double happiness character, for Chinese-Malaysian couples. It slides out of a red packet.',f:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 marmar:{name:'Marmar',meaning:'Marble',blurb:'Polished marble with gold-leaf veins and foil lettering. The slab lifts away.',f:{d:"'Cormorant Garamond', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"}},
 kaligrafi:{name:'Kaligrafi',meaning:'Calligraphy',blurb:'Barakallahu lakuma set large in Ruqah script, in foil or ink. A round seal opens it.',f:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
});
const latticeSq=c=>svgUriSq(`<svg ${NS} width="64" height="64" viewBox="0 0 64 64"><g fill="none" stroke="${c}" stroke-width="3"><path d="M32 4l8 20 20 8-20 8-8 20-8-20-20-8 20-8z"/><circle cx="32" cy="32" r="5"/></g></svg>`);
const XI=svgUriSq(`<svg ${NS} width="70" height="70" viewBox="0 0 70 70"><text x="35" y="47" text-anchor="middle" font-size="32" font-weight="700" font-family="serif" fill="#000">囍</text></svg>`);
const CALLIG='بَارَكَ اللّٰهُ لَكُمَا';
const SAMPLE_PHOTO=A+'pc-timah.jpg';
/* the couple's photo if it is a safe image address, else '' */
function couplePhotoOf(o){const cp=String(o.couplePhoto||'').trim();
  return cp&&(/^https?:\/\//.test(cp)||/^\/?assets\/[\w.-]+$/.test(cp)||/^data:image\//.test(cp))&&!/["'<>\s()\;]/.test(cp.replace(/^data:image\/[a-z]+;base64,/,''))?cp:''}
/* the photo a photo design is built on: the couple photo, else the first gallery photo, else the sample */
const heroPhotoOf=o=>couplePhotoOf(o)||(o.photos||[]).find(Boolean)||SAMPLE_PHOTO;
const ev=(o,L)=>esc(L.ev[o.eventTitle]||L.ev.walimah);
function kframe(gold){return `<div class="kframe"><svg viewBox="0 0 100 150" preserveAspectRatio="none" fill="none" stroke="${gold}"><rect x=".5" y=".5" width="99" height="149" stroke-width="1" vector-effect="non-scaling-stroke"/><rect x="3" y="2.2" width="94" height="145.6" stroke-width=".6" vector-effect="non-scaling-stroke"/><path d="M50 8l3 3-3 3-3-3zM50 136l3 3-3 3-3-3z" fill="${gold}" stroke="none"/></svg></div>`}

Object.assign(FAM2,{
 batik:{ms:1100,
  page(o,th,L){const [n1,n2]=coverNames(o);return `<section class="page pg-batik linen" style="--m:url(${A}eng-${th.motif}.webp)"><div class="batik-band foil"></div>${ENG(th.motif,'width:56%;right:-12%;top:-5%;transform:rotate(180deg)','foil')}<div class="batik-crack" style="opacity:.1"></div>
   <div class="batik-mid"><p class="kicker reveal" style="color:var(--gold)">${ev(o,L)}</p><h1 class="names foil-text reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><div class="rule reveal d2"><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-batik"><div class="cloth linen" style="--m:url(${A}eng-${th.motif}.webp)"><div class="batik-motif foil"></div><div class="batik-crack"></div></div><span class="string"></span>
   <${tag} class="tag" ${attr}>${en?'For':'Untuk'}<b>${esc(guest||(en?'our dear guest':'tetamu kami'))}</b><span class="caps" style="font-size:10px">${en?'Lift the cloth':'Selak kain'}</span></${tag}></div>`}},
 tingkap:{ms:1300,
  page(o,th,L){const [n1,n2]=coverNames(o);return `<section class="page pg-tingkap linen" style="--wood:${th.c.wood};--lat:${latticeSq('#000')}"><div class="win reveal"><span class="shut l louvre"></span><span class="shut r louvre"></span><div class="fan"></div><div class="vista" style="height:56%;background-image:url(${A}pc-${th.view}.jpg)"></div><div class="rail"></div></div>
   <div class="plaque"><p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p class="caps reveal d2" style="font-size:11px">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-tingkap linen" style="--wood:${th.c.wood};--lat:${latticeSq('#000')}"><${tag} class="win" ${attr} style="border:0;cursor:pointer;font:inherit;display:block"><span class="fan" style="display:block"></span><span class="vista" style="display:block;height:56%;background-image:url(${A}pc-${th.view}.jpg)"><span class="shut l louvre" style="display:block"><i class="knob"></i></span><span class="shut r louvre" style="display:block"><i class="knob"></i></span></span><span class="rail" style="display:block"></span></${tag}>
   <div class="plaque">${guest?`<p class="to-line">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="small it">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`}},
 foto:{ms:1200,
  page(o,th,L){const [n1,n2]=coverNames(o),ph=heroPhotoOf(o),v=th.v;const en=o.lang==='en';
   if(v==='majalah')return `<section class="page pg-foto v-majalah"><div class="ph" style="background-image:url(${ph})"></div><div class="shade"></div><p class="mast reveal">${en?'Wedding':'Kahwin'}</p>
    <div class="txt"><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><div class="issue reveal d2"><span>${esc(fmtShort(o.date))}</span><span>${esc(o.venue)}</span></div></div></section>`;
   return `<section class="page pg-foto v-${v}"><div class="ph" style="background-image:url(${ph})"></div><div class="shade"></div><div class="txt"><p class="kicker reveal" style="color:${v==='polaroid'?'var(--accent)':'#fff'}">${ev(o,L)}</p><h1 class="names reveal d1 ${v==='emas'?'foil-text':''}">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p class="caps reveal d2" style="font-size:11px">${esc(fmtDate(o.date,o.lang))}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const ph=heroPhotoOf(o),en=o.lang==='en';return `<div class="cover cv-foto">${guest?`<p class="to-line" style="position:absolute;top:8%;left:0;right:0;text-align:center;color:#efe9df">${L.dear}<b>${esc(guest)}</b></p>`:''}<${tag} class="pol" ${attr}><span class="dev" style="display:block"><i style="background-image:url(${ph})"></i></span><span>${en?'Open invitation':'Buka Jemputan'}</span></${tag}></div>`}},
 bahagia:{ms:1200,
  page(o,th,L){const [n1,n2]=coverNames(o),[a,b]=th.fl;return `<section class="page pg-bahagia"><div class="xi-tile foil" style="--xi:${XI}"></div><div class="bh-card tex">${FL(a,'width:56%;left:-14%;top:-6%;transform:rotate(180deg)')}${FL(b,'width:50%;right:-12%;bottom:-6%')}
   <p class="xi ${th.foilXi?'foil-text':''} reveal" style="color:var(--accent)">囍</p><p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><div class="rule reveal d2"><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-bahagia"><div class="xi-tile foil" style="--xi:${XI}"></div><${tag} class="hongbao velvet" ${attr}><span class="flapv"></span><span class="coin foil"><span class="xi">囍</span></span>${guest?`<span class="to-line" style="color:var(--gold)">${L.dear}<b>${esc(guest)}</b></span>`:''}<small class="foil-text">${en?'Open the packet':'Buka sampul'}</small></${tag}></div>`}},
 marmar:{ms:1100,
  page(o,th,L){const [n1,n2]=coverNames(o);return `<section class="page pg-marmar marble ${th.dark?'dark':''}">${th.veins?'<div class="gold-veins foil"></div>':''}<div class="gl foil"></div><div class="gl in foil"></div><div class="mid">
   <div class="ring reveal"><span class="foil" style="position:absolute;inset:0;border-radius:50%;-webkit-mask:radial-gradient(circle,transparent 64%,#000 65.5%);mask:radial-gradient(circle,transparent 64%,#000 65.5%)"></span><span class="foil-text" style="font-family:'Pinyon Script',cursive;font-size:30px">${esc((n1||'A')[0])}${esc((n2||'A')[0])}</span></div>
   <p class="kicker reveal d1" style="color:var(--pagefg)">${ev(o,L)}</p><h1 class="names foil-text reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p class="caps reveal d2" style="font-size:11px">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o);return `<div class="cover cv-marmar marble ${th.dark?'dark':''}">${th.veins?'<div class="gold-veins foil"></div>':''}${guest?`<p class="to-line">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="etch">${esc(n1)} &amp; ${esc(n2)}</p><${tag} class="open-btn" ${attr} style="color:var(--pagefg);border-color:var(--pagefg)">${L.openVellum}</${tag}></div>`}},
 kaligrafi:{ms:1300,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';return `<section class="page pg-kaligrafi linen">${kframe(th.c.gold)}<p class="callig ${th.foil?'foil-text':''} reveal" style="color:var(--gold)">${CALLIG}</p><p class="small it reveal d1">${en?'May Allah bless you both':'Semoga Allah memberkati kalian berdua'}</p>
   <div class="rule reveal d1"><i></i></div><p class="kicker reveal d2" style="color:var(--pagefg)">${ev(o,L)}</p><h1 class="names reveal d2">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p class="caps reveal d3" style="font-size:11px">${esc(fmtDate(o.date,o.lang))}</p></section>`},
  cover(o,th,L,guest,tag,attr){return `<div class="cover cv-kaligrafi linen">${kframe(th.c.gold)}${guest?`<p class="to-line" style="position:relative;z-index:2">${L.dear}<b>${esc(guest)}</b></p>`:''}<${tag} class="khatam ${th.foil?'foil':''}" ${attr} style="${th.foil?'':'background:var(--gold)'}"><span class="callig">${esc(o.jawi||'بارك الله')}</span><small>${L.openDoors}</small></${tag}></div>`}},
});

/* ---------- the 36 designs of the new families ---------- */
THEMES.push(
 ...[['nila','Nila Emas','Navy paper, gold batik','#1c2a52','#d2ad62','hibiscus'],['marun','Marun','Maroon paper, gold batik','#5a1524','#d4a54f','jasmine'],['zamrud','Zamrud','Emerald paper, gold batik','#0f3d2e','#d0aa5a','cabbage-rose'],['soga','Soga','Soga brown, cream batik','#5b3620','#efdcb6','white-roses'],['hitam','Hitam','Black paper, gold batik','#161414','#cfa860','anemones'],['gading','Gading','Ivory paper, navy batik','#efe6d4','#1f3164','iris']]
  .map(([k,n,d,g,au,m])=>T2('batik-'+k,'batik',n,d,{ground:g,gold:au,wax:au,pagefg:k==='gading'?'#1f2a44':'#f4ecdc',sheet:'#fbf7ef',ink:'#2a241f',accent:k==='gading'?'#1f3164':g},{motif:m})),
 ...[['hijau','Kayu Hijau','Green shutters, Penang view','#e8e2cf','#2f5a3c','pinang'],['biru','Biru Laut','Blue shutters, river kampong','#ece6d6','#2d4b78','boyan'],['jati','Kayu Jati','Teak window, country road','#efe6d4','#6b4226','timah'],['merah','Merah Bata','Red shutters, old mosque','#efe3d3','#7a1b29','masjid'],['kuning','Rumah Kedai','Yellow wall, green shutters','#e9c86a','#2c5a4a','kl'],['putih','Putih','White shutters, Central Market','#cfc9bd','#f1ede4','pasar']]
  .map(([k,n,d,wall,wood,view])=>T2('tingkap-'+k,'tingkap',n,d,{ground:wall,wood,sheet:'#fbf8f1',ink:'#2e2620',accent:k==='putih'?'#3b4a3f':wood,gold:'#c9a25a'},{view})),
 ...[['putih','Putih','Script over your photo','putih'],['hitam','Hitam Putih','Black and white, Bodoni','hitam'],['emas','Emas','Warm tone, gold names','emas'],['filem','Filem','Film strip','filem'],['polaroid','Polaroid','A polaroid on linen','polaroid'],['majalah','Majalah','A magazine cover','majalah']]
  .map(([k,n,d,v])=>T2('foto-'+k,'foto',n,d,{ground:'#e8e2d6',sheet:'#fbf8f1',ink:'#2a2622',accent:k==='polaroid'?'#a3465f':'#2a2622',gold:'#d2ad62'},{v})),
 ...[['merah','Merah Emas','Red and gold','#a11a1f','#e0b45a',['red-rose','blush-rose'],true],['jambu','Jambu Emas','Pink and gold','#c2546a','#e6c27c',['blush-rose','pink-rose'],true],['krim','Krim Merah','Ivory with red','#efe4d2','#a11a1f',['red-rose','white-roses'],false],['hitam','Hitam Emas','Black and gold','#1a1414','#d8b46a',['cabbage-rose','blush-rose'],true],['porselin','Porselin','Blue and white porcelain','#e9eef4','#24427a',['iris','forget-me-not'],false],['teal','Teal Emas','Teal and gold','#0f4a4a','#d8b46a',['white-roses','blush-rose'],true]]
  .map(([k,n,d,g,au,fl,foilXi])=>T2('bahagia-'+k,'bahagia',n,d,{ground:g,gold:au,sheet:'#fbf6ec',ink:'#2e2420',accent:foilXi?(k==='hitam'||k==='teal'?'#a11a1f':g):au},{fl,foilXi})),
 ...[['carrara','Carrara','White marble, gold veins','#eeebe6',false,true],['hijau','Hijau Zamrud','Green marble','#2b4a40',true,false],['hitam','Hitam','Black marble, gold veins','#1d1d1f',true,true],['jambu','Merah Jambu','Rose marble','#ead3cf',false,true],['krim','Krim','Cream marble','#e8dcc6',false,false],['biru','Biru','Blue marble','#25344f',true,false]]
  .map(([k,n,d,g,dark,veins])=>T2('marmar-'+k,'marmar',n,d,{ground:g,gold:dark?'#d8b46a':'#a8823e',pagefg:dark?'#efe7da':'#3a3128',sheet:'#fbf8f2',ink:'#2e2620',accent:dark?g:'#7a5a2a'},{dark,veins})),
 ...[['hitam','Hitam Emas','Gold on black','#141414','#d8b46a','#efe7da',true],['hijau','Hijau Emas','Gold on green','#0f3a2e','#d8b46a','#efe7da',true],['dakwat','Dakwat','Black ink on cream','#f4eee2','#1c1c1c','#2a2622',false],['biru','Biru Emas','Gold on navy','#16233f','#d8b46a','#eef0f5',true],['krim','Krim Hijau','Green ink on cream','#efe8d6','#2e4637','#2e4637',false],['merah','Merah Emas','Gold on maroon','#5a1220','#d8b46a','#f3e6d0',true]]
  .map(([k,n,d,g,au,fg,foil])=>T2('kaligrafi-'+k,'kaligrafi',n,d,{ground:g,gold:au,pagefg:fg,sheet:'#fbf8f1',ink:'#2a2622',accent:['dakwat','krim'].includes(k)?au:g},{foil})),
);

/* ---------- 64 more colourways for the first twelve families ---------- */
const PAL={terracotta:'#b5593b',sage:'#8c9a7f',dusty:'#7d95b4',champagne:'#e6d6b8',burgundy:'#6b1a2a',navy:'#1d2b4a',emerald:'#0f3d2e',plum:'#4a2541',mocha:'#6b4a3a',blush:'#e8c4c0'};
THEMES.push(
 // sampul +6
 ...[['terakota','Terakota','Terracotta envelope, ivory seal','#8a3f28','#b5593b','gading',['wild-rose','white-roses'],'wild-rose'],['biru-lembut','Biru Lembut','Dusty blue envelope, gold seal','#56708f','#7d95b4','emas',['forget-me-not','white-roses'],'iris'],['champagne','Champagne','Champagne envelope, sage seal','#cdb994','#e6d6b8','sage',['blush-rose','white-roses'],'cabbage-rose'],['zamrud','Zamrud','Emerald envelope, gold seal','#0b2e23','#0f3d2e','emas',['white-roses','jasmine'],'white-roses'],['ungu','Ungu','Plum envelope, gold seal','#331a2d','#4a2541','emas',['iris','anemones'],'anemones'],['merah-jambu','Merah Jambu','Blush envelope, red seal','#c9a29e','#e8c4c0','merah',['pink-rose','blush-rose'],'pink-rose']]
  .map(([k,n,d,g,env,seal,fl,emb])=>{const light=['champagne','merah-jambu'].includes(k);return T2('sampul-'+k,'sampul',n,d,{ground:g,env,envInk:light?'#5a3a2e':'#f4ecdc',liner:light?'#7a1b29':'#efe6d4',sheet:'#fffcf6',ink:'#3a2a24',accent:light?'#8a3a3a':env,gold:'#a8834a'},{seal,fl,emb})}),
 // mihrab +5
 ...[['terakota','Terakota','Terracotta doors, wild roses','#7a3522','#8a3f28',['wild-rose','white-roses']],['sage','Sage','Sage doors, jasmine','#5f6d55','#6c7b60',['white-roses','forget-me-not']],['nila','Nila','Navy doors, iris','#16233f','#1d2b4a',['iris','white-roses']],['ungu','Ungu','Plum doors, anemones','#3a1d34','#4a2541',['anemones','blush-rose']],['champagne','Champagne','Champagne doors, roses','#cbb894','#d8c7a4',['blush-rose','cabbage-rose']]]
  .map(([k,n,d,g,door,fl])=>T2('mihrab-'+k,'mihrab',n,d,{ground:g,door,sheet:'#f8f2e6',ink:'#2e2a24',accent:k==='champagne'?'#7d5f2f':door,gold:k==='champagne'?'#8f7340':'#c9a76a'},{fl})),
 // ukiran +5
 ...[['hijau-tua','Hijau Tua','Forest ink, white roses','#eef0e6','#24412f',['white-roses','cabbage-rose']],['ungu','Ungu','Plum ink, anemones','#f3eef0','#4a2541',['anemones','iris']],['terakota','Terakota','Terracotta ink, wild rose','#f4ece2','#8a3f28',['wild-rose','hibiscus']],['arang','Arang','Charcoal ink, lotus','#efeeea','#2b2b2b',['lotus','iris']],['nila','Nila','Navy ink, jasmine','#eef0f3','#1d2b4a',['jasmine','forget-me-not']]]
  .map(([k,n,d,g,ink,eng])=>T2('ukiran-'+k,'ukiran',n,d,{ground:g,sheet:g,ink,accent:ink,gold:ink},{eng})),
 // catair +7
 ...[['terakota','Terakota','Wild rose and anemone, terracotta type','#fffaf4','#b5593b',['wild-rose','anemones']],['biru-lembut','Biru Lembut','Forget-me-nots, dusty blue','#f9fbfc','#56708f',['forget-me-not','iris']],['sage','Sage','White roses, sage type','#fbfbf6','#5f6d55',['white-roses','jasmine']],['merah','Merah','Red roses, burgundy type','#fffaf6','#6b1a2a',['red-rose','blush-rose']],['champagne','Champagne','Blush roses on cream','#fdf8ef','#8f7340',['blush-rose','cabbage-rose']],['nila','Nila','Iris and lotus, navy type','#fafbfd','#1d2b4a',['iris','lotus']],['raya-putih','Melati','Jasmine and hibiscus','#fffdf8','#2e4637',['jasmine','hibiscus']]]
  .map(([k,n,d,g,ac,fl])=>T2('catair-'+k,'catair',n,d,{ground:g,sheet:g,ink:'#33302b',accent:ac,gold:ac},{fl})),
 // songket +5
 ...[['terakota','Terakota','Terracotta silk','#7a3522','#e2b86a','emas'],['biru-lembut','Biru Lembut','Dusty blue silk, silver-gold','#4f6684','#e8d3a4','gading'],['sage','Sage','Sage silk','#55634b','#ddc188','emas'],['champagne','Champagne','Champagne silk, dark gold','#d8c7a4','#8a6a2c','merah'],['marun','Marun Tua','Deep burgundy silk','#3e0f1a','#d6ae6a','emas']]
  .map(([k,n,d,g,au,seal])=>T2('songket-'+k,'songket',n,d,{ground:g,gold:au,sheet:'#f6efe0',pagefg:k==='champagne'?'#3a2a1c':'#f6efe0',ink:'#2e2620',accent:k==='champagne'?'#6e1a26':g},{seal})),
 // tiket +5
 ...[['terakota','Terakota','Terracotta passport','#f3ebe3','#8a3f28','#b5593b'],['sage','Sage','Sage passport','#eceee6','#5f6d55','#5f6d55'],['champagne','Champagne','Champagne passport','#f4efe6','#b8a37c','#7d5f2f'],['ungu','Ungu','Plum passport','#f1ecef','#4a2541','#4a2541'],['zamrud','Zamrud','Emerald passport','#e9eee9','#0f3d2e','#0f3d2e']]
  .map(([k,n,d,g,cv,ac])=>T2('tiket-'+k,'tiket',n,d,{ground:g,cover:cv,gold:'#d8b46a',sheet:'#fffdf8',ink:'#26262a',accent:ac})),
 // herbarium +5
 ...[['teratai','Teratai','Pressed water lily','lotus','#cdd5d6','#2d4b78','#b9cadb'],['mawar-putih','Mawar Putih','Pressed white roses','white-roses','#d6d2c4','#4a5a3f','#d9c9a0'],['jambu','Jambu','Pressed blush rose','blush-rose','#dccfc8','#9c4a5a','#e3b9b9'],['merah','Merah','Pressed red rose','red-rose','#d5c9bb','#7a1b29','#c9a77a'],['kubis','Mawar Kubis','Pressed cabbage rose','cabbage-rose','#d3cdbd','#6b4a3a','#c9b48a']]
  .map(([k,n,d,f,g,ac,tape])=>T2('herb-'+k,'herb',n,d,{ground:g,sheet:'#fbf8f1',ink:'#3a3128',accent:ac,gold:ac,tape},{fl:[f,f]})),
 // tipografi +6
 ...[['terakota','Terakota','Terracotta on cream','#f5ece2','#2a211d','#b5593b'],['sage','Sage','Sage on ivory','#f2f1ea','#2a2e22','#6c7b60'],['biru-lembut','Biru Lembut','Dusty blue on white','#f6f7f8','#1f2836','#56708f'],['marun','Marun','Burgundy on blush','#f3e4e0','#2a1d1f','#6b1a2a'],['champagne','Champagne','Ivory on champagne','#cdb994','#2a2420','#fbf6ec'],['zamrud','Zamrud','Gold on emerald','#0f3d2e','#efe7da','#d8b46a']]
  .map(([k,n,d,g,ink,ac])=>{const dark=k==='zamrud';return T2('tipografi-'+k,'tipografi',n,d,{ground:g,sheet:dark||k==='champagne'?'#f7f3ec':g,ink:dark?'#2a2420':ink,accent:dark?'#0f3d2e':(k==='champagne'?'#6b4a3a':ac),pageAccent:ac,gold:ac,line:'rgba(40,30,25,.2)',pageInk:ink},{})}),
 // deco +5
 ...[['marun','Marun','Gold on burgundy','#4a1220'],['ungu','Ungu','Gold on plum','#2e1a2b'],['teal','Teal','Gold on teal','#0f3a3c'],['arang','Arang','Gold on charcoal','#262626'],['champagne','Champagne','Gold on champagne','#e4d5b7']]
  .map(([k,n,d,g])=>T2('deco-'+k,'deco',n,d,{ground:g,gold:k==='champagne'?'#8a6a2c':'#d2ad62',sheet:'#f4ede0',pagefg:k==='champagne'?'#2d241a':'#f4ede0',ink:'#29231d',accent:k==='champagne'?'#6b4f22':'#8a6a2c'})),
 // baldu +5
 ...[['sage','Sage','Sage velvet','#55634b','#efe6d4','white-roses'],['biru-lembut','Biru Lembut','Dusty blue velvet','#4f6684','#e6d6b8','forget-me-not'],['ungu','Ungu','Plum velvet','#3a1d34','#c9a25a','anemones'],['terakota','Terakota','Terracotta velvet','#7a3522','#e6d6b8','wild-rose'],['merah-jambu','Merah Jambu','Dusty rose velvet','#9c6a6e','#efe6d4','blush-rose']]
  .map(([k,n,d,g,rib,f])=>T2('baldu-'+k,'baldu',n,d,{ground:g,ribbon:rib,gold:'#d6b06a',sheet:'#fbf7ef',ink:'#2e2622',accent:g},{fl:[f,f]})),
 // bingkai +5
 ...[['terakota','Terakota','Gold frame on terracotta','a','#8a3f28','#e2c27a','#f6ecdd','#f3d9a0',true],['biru-lembut','Biru Lembut','Gold frame on dusty blue','b','#56708f','#ecd29a','#f4f1ea','#f6e2b0',true],['champagne','Champagne','Gold frame on champagne','c','#e6d6b8','#8f7340','#3a2c20','#6b4f22',true],['zamrud','Zamrud','Gold frame on emerald','a','#0f3d2e','#d8b46a','#efe7da','#e3c27a',true],['ungu','Ungu','Silver-gold frame on plum','b','#3a1d34','#d9c5a0','#f1e8ee','#e7d3a8',true]]
  .map(([k,n,d,fr,g,au,fg,ac,foil])=>T2('bingkai-'+k,'bingkai',n,d,{ground:g,gold:au,pagefg:fg,pageAccent:ac,sheet:'#fbf8f1',ink:'#2e2620',accent:'#7a5a2a'},{frame:fr,foil})),
 // poskad +5
 ...[['boatquay','Boat Quay','The river at Boat Quay, c.1906','boatquay','Boat Quay, 1906','#c4c0b4','#3a4a5a','white-roses'],['collyer','Collyer Quay','Sampans at Collyer Quay','collyer','Collyer Quay','#c9c3b5','#5a3a2a','cabbage-rose'],['stjames','Dari Bukit','View from St James','stjames','View from St James','#c3cbc4','#2f5a3c','lotus'],['kl-senja','KL Senja','Kuala Lumpur, dusk tones','kl','Kuala Lumpur, 1910','#b9a48c','#6b1a2a','red-rose'],['masjid-biru','Masjid, Biru','The old mosque, blue ink','masjid',"Masjid Dato' Dagang",'#b8c2c9','#1d2b4a','iris']]
  .map(([k,n,d,pc,cap,g,ac,st])=>T2('poskad-'+k,'poskad',n,d,{ground:g,sheet:'#f8f3e8',ink:'#3a3128',accent:ac,gold:ac},{pc,cap,stamp:st})),
);
THEMES.forEach(t=>{THEME[t.id]=t});

/* colour groups for the collection filter, worked out from each design's main colour */
function toneOf(t){const hex=dotColor(t).replace('#','');const [r,g,b]=[0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)/255);const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;
  let h=0;if(d){h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;if(h<0)h+=360}
  const s=d/(1-Math.abs(2*l-1)||1);if(l<.1||(l<.2&&s<.3))return'gelap';if(l>.82&&d<.18)return'cerah';if(s<.16)return l>.6?'cerah':'neutral';if(h<20||h>=330)return'merah';if(h<50)return'coklat';if(h<170)return'hijau';if(h<260)return'biru';return'ungu'}
const TONES=[['all','All colours'],['merah','Red & pink'],['coklat','Earth & gold'],['hijau','Green'],['biru','Blue'],['ungu','Purple'],['gelap','Dark'],['cerah','Light'],['neutral','Neutral']];
CATS=[['all','All'],...Object.entries(FAMILIES).filter(([k])=>THEMES.some(t=>t.fam===k)).map(([k,f])=>[k,f.name])];
</script>
