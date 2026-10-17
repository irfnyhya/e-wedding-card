
/* ================= art: public-domain botanical plates (P.-J. Redouté and others, via Wikimedia Commons) ================= */
const A='assets/';
const ASP={"anemones":0.812,"blush-rose":0.818,"cabbage-rose":0.764,"forget-me-not":0.695,"hibiscus":0.814,"iris":0.745,"jasmine":0.682,"lotus":0.817,"pink-rose":0.887,"red-rose":0.818,"white-roses":0.837,"wild-rose":0.872};
const FL=(n,style='',cls='')=>`<img class="fl ${cls}" src="${A}flower-${n}.webp" alt="" style="${style}" decoding="async">`;
const ENG=(n,style='',cls='')=>`<i class="eng ${cls}" style="--m:url(${A}eng-${n}.webp);aspect-ratio:${ASP[n]};${style}"></i>`;
const star8svg=c=>`<svg viewBox="0 0 40 40" fill="none" stroke="${c||'currentColor'}" stroke-width="1.2"><rect x="10" y="10" width="20" height="20"/><rect x="10" y="10" width="20" height="20" transform="rotate(45 20 20)"/><circle cx="20" cy="20" r="3.2" fill="${c||'currentColor'}"/></svg>`;
const latticeUri=(c,o=.5)=>svgUri(`<svg ${NS} width="64" height="64" viewBox="0 0 64 64"><g fill="none" stroke="${c}" stroke-width="1" stroke-opacity="${o}"><path d="M32 4l8 20 20 8-20 8-8 20-8-20-20-8 20-8z"/><path d="M0 0l12 12M64 0L52 12M0 64l12-12M64 64L52 52"/><rect x="26" y="26" width="12" height="12" transform="rotate(45 32 32)"/></g></svg>`);
const ARCH_D='M0 150V55C0 30 28 14 50 0C72 14 100 30 100 55V150Z';
const archMask=svgUri(`<svg ${NS} viewBox="0 0 100 150" preserveAspectRatio="none"><path d="${ARCH_D}" fill="#000"/></svg>`);
const archOutline=c=>`<svg class="outline" viewBox="-5 -5 110 160" preserveAspectRatio="none"><path d="M-3.5 155V54.5C-3.5 27 26 10 50 -4C74 10 103.5 27 103.5 54.5V155" fill="none" stroke="${c}" stroke-width="1.4" vector-effect="non-scaling-stroke"/><path d="M0 155V55C0 30 28 14 50 0C72 14 100 30 100 55V155" fill="none" stroke="${c}" stroke-width=".7" vector-effect="non-scaling-stroke"/></svg>`;

const FAMILIES={
 sampul:{name:'Sampul',meaning:'The envelope',blurb:'A sealed envelope. Your guest breaks the wax seal, the flap lifts and the card slides out.',f:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 mihrab:{name:'Mihrab',meaning:'The arch',blurb:'Carved lattice doors swing open onto an arched page with the Bismillah and flowers at its base.',f:{d:"'Marcellus', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"}},
 ukiran:{name:'Ukiran',meaning:'The engraving',blurb:'Botanical engravings printed in a single ink, under a sheet of vellum that lifts away.',f:{d:"'IM Fell English SC', serif",s:"'IM Fell English', serif",b:"'IM Fell English', serif"}},
 catair:{name:'Cat Air',meaning:'Watercolour',blurb:'Hand-painted flowers, wide white space and quiet type, like a museum print.',f:{d:"'Cormorant Garamond', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"}},
};
const THEMES=[
 {id:'sampul-merah',fam:'sampul',name:'Merah Hati',desc:'Maroon envelope, gold seal',seal:'emas',fl:['red-rose','white-roses'],emb:'cabbage-rose',
  c:{ground:'#3b0e16',env:'#7a1b29',envInk:'#f1e2c6',liner:'#e8dac0',sheet:'#f8f2e6',ink:'#3a2621',accent:'#7a1b29',gold:'#a8834a',line:'rgba(58,38,33,.18)'}},
 {id:'sampul-sage',fam:'sampul',name:'Hijau Pandan',desc:'Sage envelope, ivory seal',seal:'gading',fl:['white-roses','forget-me-not'],emb:'white-roses',
  c:{ground:'#56634d',env:'#8c9a7f',envInk:'#f6f3e8',liner:'#efe9da',sheet:'#fbf8f0',ink:'#2f3a2c',accent:'#55654b',gold:'#9c8a62',line:'rgba(47,58,44,.18)'}},
 {id:'sampul-gading',fam:'sampul',name:'Gading',desc:'Ivory envelope, red seal',seal:'merah',fl:['cabbage-rose','blush-rose'],emb:'cabbage-rose',
  c:{ground:'#c9bba3',env:'#efe6d4',envInk:'#6b4a32',liner:'#7a1b29',sheet:'#fffdf8',ink:'#3b2c22',accent:'#7a1b29',gold:'#a8834a',line:'rgba(59,44,34,.16)'}},
 {id:'mihrab-zamrud',fam:'mihrab',name:'Zamrud',desc:'Emerald doors, ivory arch',fl:['white-roses','blush-rose'],
  c:{ground:'#0f3a30',door:'#13453a',sheet:'#f6f0e1',ink:'#2b2a22',accent:'#0f3a30',gold:'#b8975a',line:'rgba(43,42,34,.18)'}},
 {id:'mihrab-gading',fam:'mihrab',name:'Gading Emas',desc:'Ivory doors, gold arch',fl:['anemones','cabbage-rose'],
  c:{ground:'#e6dcc6',door:'#ece3cf',sheet:'#fdf9f0',ink:'#3d3226',accent:'#7d5f2f',gold:'#a8864a',line:'rgba(61,50,38,.18)'}},
 {id:'mihrab-biru',fam:'mihrab',name:'Biru Malam',desc:'Midnight doors, water lilies',fl:['lotus','iris'],
  c:{ground:'#1b2840',door:'#22314f',sheet:'#f5f1e8',ink:'#26324a',accent:'#22314f',gold:'#c2a46a',line:'rgba(38,50,74,.18)'}},
 {id:'ukiran-sepia',fam:'ukiran',name:'Sepia',desc:'Brown ink on aged paper',eng:['cabbage-rose','anemones'],
  c:{ground:'#efe2c6',sheet:'#efe2c6',ink:'#5b3d24',accent:'#5b3d24',gold:'#5b3d24',line:'rgba(91,61,36,.25)'}},
 {id:'ukiran-dakwat',fam:'ukiran',name:'Dakwat Biru',desc:'Blue ink, iris and wild rose',eng:['iris','wild-rose'],
  c:{ground:'#f1ede3',sheet:'#f1ede3',ink:'#253a63',accent:'#253a63',gold:'#253a63',line:'rgba(37,58,99,.22)'}},
 {id:'ukiran-melati',fam:'ukiran',name:'Melati',desc:'Green ink, jasmine',eng:['jasmine','white-roses'],
  c:{ground:'#f0efe6',sheet:'#f0efe6',ink:'#2e4637',accent:'#2e4637',gold:'#2e4637',line:'rgba(46,70,55,.22)'}},
 {id:'catair-raya',fam:'catair',name:'Bunga Raya',desc:'Hibiscus and pink roses',fl:['hibiscus','pink-rose'],
  c:{ground:'#fffaf5',sheet:'#fffaf5',ink:'#4a3437',accent:'#a3465f',gold:'#c08a98',line:'rgba(74,52,55,.16)'}},
 {id:'catair-teratai',fam:'catair',name:'Teratai',desc:'Water lilies and forget-me-nots',fl:['lotus','forget-me-not'],
  c:{ground:'#fbfcfc',sheet:'#fbfcfc',ink:'#2d3a4c',accent:'#3c5f8a',gold:'#8ea4c2',line:'rgba(45,58,76,.16)'}},
 {id:'catair-taman',fam:'catair',name:'Taman',desc:'Anemones and wild roses',fl:['anemones','wild-rose'],
  c:{ground:'#fffdf6',sheet:'#fffdf6',ink:'#3b3027',accent:'#9c3a2e',gold:'#c79a6a',line:'rgba(59,48,39,.16)'}},
];
const THEME=Object.fromEntries(THEMES.map(t=>[t.id,t]));
const LEGACY={songket:'sampul-merah',bungaraya:'catair-raya',moden:'ukiran-dakwat',sage:'sampul-sage',malam:'mihrab-biru',zamrud:'mihrab-zamrud',nyonya:'catair-taman',kraft:'ukiran-sepia',lavender:'catair-teratai',noir:'sampul-merah'};
const themeOf=id=>THEME[id]||THEME[LEGACY[id]]||THEMES[0];
let CATS=[];
const swatchBg=t=>{const c=t.c;switch(t.fam){case'sampul':return `linear-gradient(135deg, ${c.env} 0 50%, ${c.ground} 50%)`;case'mihrab':return `radial-gradient(ellipse 34% 46% at 50% 58%, ${c.sheet} 98%, transparent 100%), ${c.ground}`;case'songket':case'deco':return `linear-gradient(90deg, ${c.gold} 0 9%, ${c.ground} 9% 91%, ${c.gold} 91%)`;case'baldu':return `linear-gradient(90deg, ${c.ground} 0 66%, ${c.ribbon} 66% 76%, ${c.ground} 76%)`;case'tiket':return `linear-gradient(90deg, ${c.cover} 0 42%, ${c.sheet} 42%)`;case'tipografi':return `linear-gradient(90deg, ${c.ground} 0 60%, ${c.pageAccent||c.accent} 60%)`;case'bingkai':case'poskad':case'herb':return c.ground;case'batik':case'bahagia':case'kaligrafi':return `linear-gradient(90deg, ${c.ground} 0 72%, ${c.gold} 72% 80%, ${c.ground} 80%)`;case'marmar':return `linear-gradient(120deg, ${c.ground} 0 46%, ${c.gold} 46% 48%, ${c.ground} 48%)`;case'tingkap':return `linear-gradient(90deg, ${c.ground} 0 25%, ${c.wood} 25% 75%, ${c.ground} 75%)`;case'foto':return 'linear-gradient(160deg,#5b5a55,#1f1e1c)';case'pawagam':return `repeating-conic-gradient(from 0deg at 50% 60%, rgba(255,255,255,.3) 0 8deg, transparent 8deg 18deg), ${c.ground}`;case'akhbar':case'telegram':return `repeating-linear-gradient(0deg, ${c.ink} 0 1px, transparent 1px 7px), ${c.sheet}`;case'vinyl':return `radial-gradient(circle at 50% 50%, ${c.accent} 0 14%, #111 15% 46%, ${c.ground} 47%)`;case'tekat':case'buku':case'mancis':case'label':case'skrol':case'gerbang':return `radial-gradient(circle at 50% 50%, ${c.gold} 0 12%, ${c.ground} 13%)`;case'renda':return `radial-gradient(circle at 50% 50%, ${c.sheet} 0 34%, ${c.lace} 35% 44%, ${c.ground} 45%)`;case'kertas':return `linear-gradient(180deg, ${c.sheet} 0 46%, ${t.layers[0]} 46% 62%, ${t.layers[1]} 62% 80%, ${t.layers[2]} 80%)`;case'akuarel':return `radial-gradient(circle at 90% 10%, ${c.wash1} 0 30%, transparent 55%), linear-gradient(0deg, ${c.wash2} 0 26%, ${c.sheet} 40%)`;case'peta':return `url(${A}map-${t.map}.jpg) center/cover, ${c.sheet}`;case'kaca':return `linear-gradient(90deg, ${t.glass.map((g,i)=>`${g} ${i*20}% ${(i+1)*20}%`).join(',')})`;default:return `linear-gradient(160deg, ${c.sheet} 60%, ${c.accent} 220%)`}};
const dotColor=t=>t.fam==='kaca'?t.glass[0]:t.fam==='akuarel'?t.c.accent:t.fam==='renda'?t.c.ground:t.c.env||t.c.cover||(['songket','deco','baldu','mihrab','bingkai','batik','bahagia','marmar','kaligrafi'].includes(t.fam)?t.c.ground:t.fam==='tipografi'?(t.c.pageAccent||t.c.accent):t.c.accent);
const swatchEl=t=>t.fam==='catair'?`<div class="sw" style="background:url(${A}flower-${t.fl[0]}.webp) right -8px bottom -14px/52% no-repeat,${t.c.sheet}"></div>`:t.fam==='ukiran'?`<div class="sw" style="background:${t.c.sheet}"><i style="display:block;height:100%;background:${t.c.ink};-webkit-mask:url(${A}eng-${t.eng[0]}.webp) right -8px bottom -14px/52% no-repeat;mask:url(${A}eng-${t.eng[0]}.webp) right -8px bottom -14px/52% no-repeat"></i></div>`:`<div class="sw" style="background:${swatchBg(t)}"></div>`;
