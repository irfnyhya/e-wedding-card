<script>
/* ================= round four: five more families and palette colourways (262 designs) ================= */
Object.assign(FAMILIES,{
 renda:{name:'Renda',meaning:'Lace',blurb:'A paper card edged in lace. It arrives wrapped in a lace sheet tied with a satin ribbon.',f:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 kertas:{name:'Kertas',meaning:'Torn paper',blurb:'Layers of handmade paper with torn edges, sealed with wax. The layers slide away when the seal breaks.',f:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 akuarel:{name:'Akuarel',meaning:'Watercolour wash',blurb:'A loose watercolour wash bleeding across cotton paper, with quiet type.',f:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 peta:{name:'Peta',meaning:'Old map',blurb:'An old map of Malaya with your route marked between two pins and a compass rose. It unfolds like a real map.',f:{d:"'IM Fell English SC', serif",s:"'Pinyon Script', cursive",b:"'IM Fell English', serif"}},
 kaca:{name:'Kaca',meaning:'Stained glass',blurb:'An arched stained-glass window around your names. It lights up as if the sun came out.',f:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
});

/* lace: a 90px border-image (scallops, eyelets and corner rosettes) drawn in the theme's lace colour */
function laceBorder(c){let s=`<svg ${NS} width="90" height="90" viewBox="0 0 90 90"><path fill="${c}" fill-rule="evenodd" d="M6 6H84V84H6Z M28 28V62H62V28Z`;
  for(let i=7.5;i<90;i+=15){for(const [x,y] of [[i,17],[i,73],[17,i],[73,i]]){if(x>26&&x<64&&y>26&&y<64)continue;s+=` M${x+2.6} ${y}a2.6 2.6 0 1 0 -5.2 0a2.6 2.6 0 1 0 5.2 0Z`}}
  s+=`"/>`;for(let i=7.5;i<90;i+=15)for(const [x,y] of [[i,6],[i,84],[6,i],[84,i]])s+=`<circle cx="${x}" cy="${y}" r="6" fill="${c}"/>`;
  for(const [x,y] of [[17,17],[73,17],[17,73],[73,73]])s+=`<g fill="${c}" opacity=".9">${[0,90,180,270].map(a=>`<circle cx="${x+Math.cos(a*Math.PI/180)*5}" cy="${y+Math.sin(a*Math.PI/180)*5}" r="3.4"/>`).join('')}</g>`;
  return svgUriSq(s+'</svg>')}
const LACE_TILE=(()=>{const T=48,holes=[],ros=[[24,24],[0,0],[48,0],[0,48],[48,48]];const near=(x,y)=>ros.some(([a,b])=>Math.hypot(x-a,y-b)<15);
  for(let y=3;y<T;y+=6)for(let x=(y/6|0)%2?6:3;x<T;x+=6)if(!near(x,y))holes.push([x,y,1.3]);
  ros.forEach(([cx,cy])=>{holes.push([cx,cy,3.6]);for(let k=0;k<6;k++){const a=k*Math.PI/3;holes.push([cx+Math.cos(a)*8.5,cy+Math.sin(a)*8.5,2.8])}});
  return svgUriSq(`<svg ${NS} width="${T}" height="${T}" viewBox="0 0 ${T} ${T}"><path fill-rule="evenodd" d="M0 0H${T}V${T}H0Z${holes.map(([x,y,r])=>` M${(x+r).toFixed(2)} ${y.toFixed(2)}a${r} ${r} 0 1 0 ${-2*r} 0a${r} ${r} 0 1 0 ${2*r} 0Z`).join('')}"/></svg>`)})();
function compassSvg(c){let t='';for(let a=0;a<360;a+=45){const r=a%90?22:36,rad=(a-90)*Math.PI/180,rr=6;t+=`<path d="M40 40L${40+Math.cos(rad-.5)*rr} ${40+Math.sin(rad-.5)*rr}L${40+Math.cos(rad)*r} ${40+Math.sin(rad)*r}L${40+Math.cos(rad+.5)*rr} ${40+Math.sin(rad+.5)*rr}Z" fill="${a%90?'none':c}" stroke="${c}" stroke-width=".8"/>`}
  return `<svg class="compass" viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="none" stroke="${c}" stroke-width=".7"/><circle cx="40" cy="40" r="27" fill="none" stroke="${c}" stroke-width=".4" stroke-dasharray="1.5 2"/>${t}<text x="40" y="9" text-anchor="middle" font-size="7" fill="${c}" font-family="serif">U</text></svg>`}
function routeSvg(o,c){const [n1,n2]=coverNames(o);const pin=(x,y,l)=>`<g transform="translate(${x} ${y})"><path d="M0 0c-4-5-6-8-6-11a6 6 0 0 1 12 0c0 3-2 6-6 11z" fill="${c}"/><circle cy="-11" r="2.2" fill="#fff"/><text y="10" text-anchor="middle" font-size="7.5" font-family="IM Fell English, serif" fill="${c}">${esc(l)}</text></g>`;
  return `<svg class="route" viewBox="0 0 100 150" preserveAspectRatio="none"><path d="M18 128 C 30 100, 70 112, 64 84 S 40 46, 80 26" fill="none" stroke="${c}" stroke-width="1.1" stroke-dasharray="2.4 2" vector-effect="non-scaling-stroke" style="vector-effect:non-scaling-stroke"/></svg><svg class="route" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid meet" style="overflow:visible">${pin(18,128,n1||'')}${pin(80,26,n2||'')}<path d="M62 84c-1.6-1.6-4.2-1-4.2 1.4 0 2 2.2 3.2 4.2 4.8 2-1.6 4.2-2.8 4.2-4.8 0-2.4-2.6-3-4.2-1.4z" fill="${c}"/></svg>`}
function glassSvg(th,uid){const P=th.glass,lead=th.c.lead||'#1e1a18',cells=[];const r=rng(uid*31+P.length);
  for(let j=-1;j<17;j++)for(let i=-1;i<12;i++){const x=i*10+(j%2?5:0),y=j*10;cells.push(`<path d="M${x} ${y-6}L${x+5} ${y}L${x} ${y+6}L${x-5} ${y}Z" fill="${P[Math.floor(r()*P.length)]}"/>`)}
  return `<svg viewBox="0 0 100 150" preserveAspectRatio="none"><defs><clipPath id="ga${uid}"><path d="${ARCH_D}"/></clipPath><linearGradient id="gl${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient></defs>
  <g clip-path="url(#ga${uid})"><rect width="100" height="150" fill="${lead}"/><g stroke="${lead}" stroke-width=".9" opacity=".92">${cells.join('')}</g><rect width="100" height="150" fill="url(#gl${uid})"/></g>
  <path d="M14 150V60C14 40 34 26 50 15C66 26 86 40 86 60V150Z" fill="${th.c.sheet}" stroke="${lead}" stroke-width="1.6" vector-effect="non-scaling-stroke"/>
  <path d="M10.5 150V58C10.5 37 31 22 50 10C69 22 89.5 37 89.5 58V150" fill="none" stroke="${th.c.gold}" stroke-width="1.2" vector-effect="non-scaling-stroke"/>
  <path d="${ARCH_D}" fill="none" stroke="${lead}" stroke-width="3" vector-effect="non-scaling-stroke"/></svg>`}

Object.assign(FAM2,{
 renda:{ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o);return `<section class="page pg-renda linen" style="--lace:${laceBorder(th.c.lace)}"><div class="lace-card tex">
   <p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><div class="rule reveal d2"><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-renda" style="--lacetile:${LACE_TILE};--lacec:${th.c.lace}"><div class="lacesheet"></div><div class="ribbonh"></div><${tag} class="knot" ${attr}>${guest?`<span class="small">${L.dear}</span><b>${esc(guest)}</b>`:`<b>${en?'Untie the ribbon':'Buka reben'}</b>`}<span class="caps" style="font-size:10px">${L.openVellum}</span></${tag}></div>`}},
 kertas:{ms:1300,
  page(o,th,L){const [n1,n2]=coverNames(o),[a,b,c]=th.layers;return `<section class="page pg-kertas tex">
   <div class="torn flip" style="top:-30px;height:110px;background:${a}"></div><div class="torn flip" style="top:-46px;height:110px;background:${b}"></div>
   <div class="mid"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div>
   <div class="torn" style="bottom:0;height:190px;background:${a}"></div><div class="torn" style="bottom:0;height:150px;background:${b}"></div><div class="torn" style="bottom:0;height:105px;background:${c}"></div>
   <span class="seal-s" style="--seal:url(${A}seal-${th.seal}.webp);bottom:118px"></span></section>`},
  cover(o,th,L,guest,tag,attr){const [a,b,c]=th.layers;const lay=(col,top,d)=>`<div class="layer" style="top:${top}%;height:${100-top+2}%;background:${col};transition-delay:${d}s"></div>`;
   return `<div class="cover cv-kertas tex" style="background:${th.c.sheet}">${lay(a,-6,.25)}${lay(b,28,.12)}${lay(c,58,0)}${guest?`<p class="to" style="color:var(--pagefg)"><span class="small">${L.dear}</span><b style="display:block;font-family:var(--s);font-weight:400;font-size:26px">${esc(guest)}</b></p>`:''}<${tag} class="sealbtn" ${attr} style="--seal:url(${A}seal-${th.seal}.webp)" aria-label="${L.open}"></${tag}></div>`}},
 akuarel:{ms:1100,
  page(o,th,L){const [n1,n2]=coverNames(o);return `<section class="page pg-akuarel tex"><div class="wash" style="--wm:url(${A}wash-corner.png);background:${th.c.wash1}"></div><div class="wash band" style="--wm:url(${A}wash-band.png);background:${th.c.wash2}"></div>
   <div class="mid"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><div class="rule reveal d2"><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){return `<div class="cover cv-akuarel tex"><div class="wash" style="--wm:url(${A}wash-corner.png);background:${th.c.wash1}"></div><div class="wash band" style="--wm:url(${A}wash-band.png);background:${th.c.wash2}"></div><div class="mid">${guest?`<p class="to-line">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="kicker">${ev(o,L)}</p><${tag} class="open-btn" ${attr}>${L.openVellum}</${tag}></div></div>`}},
 peta:{ms:1350,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';return `<section class="page pg-peta tex" style="--sep:${th.sep}"><div class="mapimg" style="background-image:url(${A}map-${th.map}.jpg)"></div>${routeSvg(o,th.c.accent)}${compassSvg(th.c.accent)}
   <div class="cartouche reveal"><p class="kicker" style="color:var(--ink)">${en?'A map of our journey':'Peta perjalanan kami'}</p><h1 class="names">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p class="caps" style="font-size:10px">${esc(fmtDate(o.date,o.lang))}</p><p class="small it">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';const f=s=>`<div class="fold ${s} tex"><div class="mapimg" style="background-image:url(${A}map-${th.map}.jpg);--sep:${th.sep}"></div></div>`;
   return `<div class="cover cv-peta">${f('l')}${f('r')}<${tag} class="tag" ${attr}>${guest?`<span class="small">${L.dear}</span><b>${esc(guest)}</b>`:`<b>${en?'Unfold the map':'Buka peta'}</b>`}<span class="caps" style="font-size:10px">${en?'Unfold':'Buka lipatan'}</span></${tag}></div>`}},
 kaca:{ms:1200,
  page(o,th,L){const [n1,n2]=coverNames(o),u=(FAM2.n=(FAM2.n||0)+1);return `<section class="page pg-kaca"><div class="glass">${glassSvg(th,u)}</div><div class="mid">
   ${o.bismillah&&th.bism?`<p class="bismillah reveal" style="font-size:20px">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}<p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p class="caps reveal d2" style="font-size:10px">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const u=(FAM2.n=(FAM2.n||0)+1);return `<div class="cover cv-kaca"><div class="glass">${glassSvg(th,u)}</div><div class="mid">${guest?`<p class="to-line">${L.dear}<b>${esc(guest)}</b></p>`:''}<${tag} class="open-btn" ${attr}>${o.lang==='en'?'Let the light in':'Biar cahaya masuk'}</${tag}></div></div>`}},
});

/* ---------- the 30 designs of the new families ---------- */
THEMES.push(
 ...[['gading','Gading','Ivory lace on sage','#a8b59a','#fbf8f1','#fffdf8','#4f5d47'],['putih','Putih','White lace on dusty blue','#7d95b4','#fbfbfa','#ffffff','#2d4b78'],['marun','Marun','Cream lace on burgundy','#5a1a2a','#f6efe2','#f3eadb','#5a1a2a'],['jambu','Jambu','White lace on blush','#e8c4c0','#fffaf8','#ffffff','#9c4a5a'],['hitam','Hitam','Ivory lace on black','#1d1b1a','#fbf6ec','#efe6d4','#3a2c20'],['zaitun','Zaitun','Cream lace on olive','#6b7a3e','#fbf7ec','#f4ecda','#4a5530']]
  .map(([k,n,d,g,sheet,lace,ac])=>T2('renda-'+k,'renda',n,d,{ground:g,sheet,lace,ink:'#33302b',accent:ac,gold:'#b49a62'})),
 ...[['bumi','Bumi','Ochre, terracotta, mocha','#fbf7ef',['#c9a36e','#b5593b','#6b4a3a'],'emas','#6b4a3a'],['sage','Sage','Cream, sage, forest','#fbfaf3',['#d7d2bd','#a8b59a','#4f5d47'],'gading','#4f5d47'],['laut','Laut','Sand, dusty blue, navy','#fbfaf6',['#e6d6b8','#7d95b4','#1d2b4a'],'emas','#1d2b4a'],['mawar','Mawar','Blush, rose, burgundy','#fffaf6',['#efd1c9','#c98b8b','#5a1a2a'],'gading','#5a1a2a'],['lavender','Lavender','Silver, lilac, charcoal','#fbfaff',['#d9d6e2','#a79bd1','#3f3d46'],'gading','#3f3d46'],['karang','Karang','Peach, coral, teal','#fffaf5',['#f6cdb3','#ef8a72','#0f6b6b'],'emas','#0f6b6b']]
  .map(([k,n,d,sheet,layers,seal,ac])=>T2('kertas-'+k,'kertas',n,d,{ground:sheet,sheet,ink:'#33302b',accent:ac,gold:layers[1],pagefg:'#33302b'},{layers,seal})),
 ...[['terakota','Terakota','Terracotta and sand washes','#fffbf6','#d98a6a','#e9cfa8','#9c4a30'],['biru','Biru','Indigo washes','#fbfcfd','#8fa9cf','#3d5f96','#1d3b6e'],['sage','Sage','Sage and eucalyptus','#fcfcf7','#b8c6a6','#7f977a','#3e5a3f'],['lavender','Lavender','Lilac washes','#fcfbfe','#c7b8e6','#9c8fc9','#5d4a8a'],['pic','Pic','Peach and blush','#fffaf6','#f4b99b','#f0c8c4','#a3465f'],['laut','Laut','Teal and seafoam','#f9fcfb','#8cc5bd','#2f7f7d','#0f5656']]
  .map(([k,n,d,sheet,w1,w2,ac])=>T2('akuarel-'+k,'akuarel',n,d,{ground:sheet,sheet,ink:'#33302b',accent:ac,gold:w2,wash1:w1,wash2:w2})),
 ...[['carta','Carta','Admiralty chart, sepia','carta','#f5ecd9','#7a3a22',.45],['carta-nila','Carta Nila','Admiralty chart, navy route','carta','#f1ede3','#1d2b4a',.25],['selat','Negeri Selat','Straits Settlements atlas','straits','#f8f2e4','#7a1b29',.15],['selat-hijau','Selat Hijau','Straits atlas, green route','straits','#f6f2e6','#2f5a3c',.25],['hindia','Hindia Timur','East India Isles, 1801','hindia','#f7f0e0','#6b1a2a',.2],['hindia-biru','Hindia Biru','East India Isles, blue route','hindia','#f4f1e8','#2d4b78',.3]]
  .map(([k,n,d,map,sheet,ac,sep])=>T2('peta-'+k,'peta',n,d,{ground:sheet,sheet,ink:'#3a3128',accent:ac,gold:ac},{map,sep})),
 ...[['mawar','Mawar','Rose, gold and green glass','#2a1f1c',['#b8475e','#d9a441','#4f7a4a','#e7c2a0','#7a2e3e'],'white-roses',false],['zamrud','Zamrud','Emerald and amber glass','#14231d',['#2f7a5a','#d9a441','#1f5a46','#a8c27a','#e3c27a'],'jasmine',true],['nila','Nila','Cobalt and gold glass','#141a2a',['#2d4b9a','#d9a441','#5f86c4','#1d2b6a','#a7c0e0'],'iris',true],['lavender','Lavender','Lilac and sage glass','#221f28',['#9c8fc9','#b8c6a6','#6f62a8','#e6d9f2','#d9a441'],'iris',false],['senja','Senja','Sunset glass','#271a16',['#d9673f','#e8a33c','#b8475e','#f2cf86','#7a2e3e'],'anemones',false],['teal','Teal','Teal and coral glass','#132424',['#1f7a7a','#ef8a72','#7fbfb5','#d9a441','#0f4a4a'],'lotus',true]]
  .map(([k,n,d,g,glass,fl,bism])=>T2('kaca-'+k,'kaca',n,d,{ground:g,sheet:'#fbf6ec',ink:'#2e2620',accent:glass[0],gold:'#d9a441',lead:'#1e1a18'},{glass,fl:[fl,fl],bism})),
);

/* ---------- 70 colourways from five Pinterest palettes ---------- */
const PALS=[
 {k:'mauve',n:'Mauve Zaitun',dark:'#5a1a2a',mid:'#8a6474',alt:'#6b7a3e',light:'#f4ecec',table:'#cbbcbc',gold:'#c2a46a',text:'#6e4a5a',seal:'merah',fl:['anemones','blush-rose'],eng:['anemones','blush-rose'],motif:'anemones',frame:'a'},
 {k:'pic',n:'Pic Sage',dark:'#4f5d47',mid:'#e9a07f',alt:'#a8b59a',light:'#fcf4ed',table:'#d9cbbd',gold:'#c99b6a',text:'#b4603f',seal:'sage',fl:['wild-rose','white-roses'],eng:['wild-rose','white-roses'],motif:'wild-rose',frame:'b'},
 {k:'kunyit',n:'Kunyit Nila',dark:'#1d2b4a',mid:'#e3a72f',alt:'#b5562b',light:'#f7f0e1',table:'#d6cbb6',gold:'#e3b04a',text:'#a24a22',seal:'emas',fl:['anemones','cabbage-rose'],eng:['cabbage-rose','anemones'],motif:'cabbage-rose',frame:'c'},
 {k:'lavender',n:'Lavender Arang',dark:'#3f3d46',mid:'#a79bd1',alt:'#b9b6c7',light:'#f6f4fa',table:'#cfccd6',gold:'#cfc3a2',text:'#6f62a8',seal:'gading',fl:['iris','forget-me-not'],eng:['iris','forget-me-not'],motif:'iris',frame:'a'},
 {k:'karang',n:'Teal Karang',dark:'#0b4a4a',mid:'#ef8a72',alt:'#0f6b6b',light:'#fcf5ef',table:'#c9d3cf',gold:'#d9b47a',text:'#0f6b6b',seal:'emas',fl:['lotus','pink-rose'],eng:['lotus','hibiscus'],motif:'lotus',frame:'b'},
];
const MAKE={
 sampul:P=>T2('sampul-'+P.k,'sampul',P.n,P.n+' envelope',{ground:P.dark,env:P.alt,envInk:'#f6efe4',liner:P.light,sheet:'#fffcf6',ink:'#3a2a24',accent:P.text,gold:P.gold},{seal:P.seal,fl:P.fl,emb:P.eng[0]}),
 mihrab:P=>T2('mihrab-'+P.k,'mihrab',P.n,P.n+' doors',{ground:P.dark,door:P.dark,sheet:P.light,ink:'#2e2a24',accent:P.text,gold:P.gold},{fl:P.fl}),
 ukiran:P=>T2('ukiran-'+P.k,'ukiran',P.n,P.n+' ink',{ground:P.light,sheet:P.light,ink:P.dark,accent:P.dark,gold:P.dark},{eng:P.eng}),
 catair:P=>T2('catair-'+P.k,'catair',P.n,P.n+' watercolour',{ground:P.light,sheet:P.light,ink:'#33302b',accent:P.text,gold:P.gold},{fl:P.fl}),
 songket:P=>T2('songket-'+P.k,'songket',P.n,P.n+' silk',{ground:P.dark,gold:P.gold,sheet:'#f6efe0',pagefg:'#f6efe0',ink:'#2e2620',accent:P.dark},{seal:'emas'}),
 tiket:P=>T2('tiket-'+P.k,'tiket',P.n,P.n+' passport',{ground:P.light,cover:P.dark,gold:'#d8b46a',sheet:'#fffdf8',ink:'#26262a',accent:P.text}),
 herb:P=>T2('herb-'+P.k,'herb',P.n,P.n+' pressed flower',{ground:P.table,sheet:'#fbf8f1',ink:'#3a3128',accent:P.text,gold:P.text,tape:P.mid},{fl:[P.fl[0],P.fl[0]]}),
 tipografi:P=>T2('tipografi-'+P.k,'tipografi',P.n,P.n+' numerals',{ground:P.light,sheet:P.light,ink:'#2a2420',accent:P.text,pageAccent:P.text,gold:P.text,pageInk:'#2a2420',line:'rgba(40,30,25,.2)'}),
 deco:P=>T2('deco-'+P.k,'deco',P.n,P.n+' deco',{ground:P.dark,gold:P.gold,sheet:'#f4ede0',pagefg:'#f4ede0',ink:'#29231d',accent:P.dark}),
 baldu:P=>T2('baldu-'+P.k,'baldu',P.n,P.n+' velvet',{ground:P.dark,ribbon:P.mid,gold:'#d6b06a',sheet:'#fbf7ef',ink:'#2e2622',accent:P.dark},{fl:[P.fl[0],P.fl[0]]}),
 bingkai:P=>T2('bingkai-'+P.k,'bingkai',P.n,P.n+' frame',{ground:P.light,gold:'#9a7a45',pagefg:'#3a2c20',pageAccent:P.text,sheet:'#fbf8f1',ink:'#2e2620',accent:P.text},{frame:P.frame,foil:true}),
 batik:P=>T2('batik-'+P.k,'batik',P.n,P.n+' batik',{ground:P.dark,gold:P.gold,wax:P.gold,pagefg:'#f4ecdc',sheet:'#fbf7ef',ink:'#2a241f',accent:P.dark},{motif:P.motif}),
 marmar:P=>T2('marmar-'+P.k,'marmar',P.n,P.n+' marble',{ground:P.light,gold:'#a8823e',pagefg:'#3a3128',sheet:'#fbf8f2',ink:'#2e2620',accent:P.text},{dark:false,veins:true}),
 kaligrafi:P=>T2('kaligrafi-'+P.k,'kaligrafi',P.n,P.n+' calligraphy',{ground:P.dark,gold:P.gold,pagefg:'#efe7da',sheet:'#fbf8f1',ink:'#2a2622',accent:P.dark},{foil:true}),
};
Object.values(MAKE).forEach(make=>PALS.forEach(P=>THEMES.push(make(P))));
THEMES.forEach(t=>{THEME[t.id]=t});
CATS=[['all','All'],...Object.entries(FAMILIES).filter(([k])=>THEMES.some(t=>t.fam===k)).map(([k,f])=>[k,f.name])];
</script>
