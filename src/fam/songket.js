/* songket: a folded length of real songket (a 19th-c. Malay silk-and-gold-thread cloth, public domain photograph, pd-textile-2),
   recoloured per colourway with an SVG duotone so the gold thread stays photographic.
   Cover: the folded cloth lies on a linen table, held by a paper band with the names. Tap "Buka Jemputan": the band slips off
   and the cloth lifts away. Page: the invitation card lying on the open cloth. Skin: paper cards edged with a woven strip. */
let sgN=0;
const sgHex=h=>{h=String(h).replace('#','');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255)};
const sgMix=(a,b,t)=>{const A=sgHex(a),B=sgHex(b);return '#'+A.map((v,i)=>Math.round((v+(B[i]-v)*t)*255).toString(16).padStart(2,'0')).join('')};
// grey value of the photo -> ground colour (dark) ... thread colour (light). The curve pushes the silk down and lifts the gold.
function sgFilter(id,ground,thread){const g=sgHex(ground),t=sgHex(thread),curve=[0,0,.04,.3,.72,.95,1,1.04];
  const tv=i=>curve.map(k=>Math.max(0,Math.min(1,g[i]+(t[i]-g[i])*k)).toFixed(3)).join(' ');
  return `<svg class="sg-defs" width="0" height="0" aria-hidden="true"><filter id="${id}" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">
    <feColorMatrix type="matrix" values=".33 .5 .17 0 0 .33 .5 .17 0 0 .33 .5 .17 0 0 0 0 0 1 0"/>
    <feComponentTransfer><feFuncR type="table" tableValues="${tv(0)}"/><feFuncG type="table" tableValues="${tv(1)}"/><feFuncB type="table" tableValues="${tv(2)}"/></feComponentTransfer></filter></svg>`}
const sgVars=c=>`--cloth:${c.cloth};--thread:${c.thread}`;
FAMILY({key:'songket',name:'Songket',meaning:'Woven gold',
  blurb:'A folded length of real songket, gold thread on silk, held by a paper band with your names. The band slips off and the cloth lifts away.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id='sgf'+(++sgN);
    return `<section class="page pg-songket2" style="${sgVars(c)};--sgfx:url(#${id})">${sgFilter(id,c.cloth,c.thread)}
      <div class="sg-bed"><i class="sg-weave"></i><i class="sg-sheen"></i></div>
      <div class="sg-cardw reveal"><div class="sg-card"><div class="sg-cin">
        <p class="sg-k kicker">${ev(o,L)}</p>
        <h1 class="sg-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <i class="sg-rule"></i>
        <p class="sg-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="sg-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="sg-ven">${esc(o.venue)}</p>`:''}</div></div></div>
      <a class="sg-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id='sgf'+(++sgN);
    return `<div class="cover cv-songket2" style="${sgVars(c)};--sgfx:url(#${id})">${sgFilter(id,c.cloth,c.thread)}<i class="sg-table"></i>
      <p class="sg-k sg-top">${ev(o,L)}</p>
      <div class="sg-parcel"><i class="sg-under b"></i><i class="sg-under a"></i>
        <div class="sg-cloth"><i class="sg-weave"></i><i class="sg-sheen"></i><i class="sg-fold"></i></div>
        <div class="sg-band"><p class="sg-k">${en?'Together with their families':'Dengan penuh kesyukuran'}</p>
          <p class="sg-bn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="sg-bd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
      <div class="sg-foot">${guest?`<p class="sg-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="sg-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--cloth',c.cloth);el.style.setProperty('--thread',c.thread);
    const f=$('.pg-songket2 .sg-defs filter',el);if(f)el.style.setProperty('--sgfx',`url(#${f.id})`);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    // [key, name, desc, cloth, thread]; light cloths get a dark walnut table
    ['merah','Merah Diraja','Royal red silk, gold thread','#5c0f1c','#e2b862'],
    ['nila','Biru Nila','Indigo silk, gold thread','#15224a','#dcb769'],
    ['zamrud','Hijau Zamrud','Emerald silk, gold thread','#0f3d2e','#d8b462'],
    ['hitam','Hitam Malam','Black silk, gold thread','#161313','#d8b46a'],
    ['terung','Ungu Terung','Aubergine silk, gold thread','#3b1838','#dfb874'],
    ['gading','Gading','Ivory silk, dark gold thread','#efe5cf','#8a6428'],
    ['terakota','Terakota','Terracotta silk, gold thread','#7a3522','#eac27a'],
    ['biru-lembut','Biru Lembut','Dusty blue silk, pale gold','#4f6684','#ecd9ae'],
    ['sage','Sage','Sage silk, gold thread','#55634b','#e3c890'],
    ['champagne','Champagne','Champagne silk, dark gold','#dccaa4','#6e5020'],
    ['marun','Marun Tua','Deep burgundy silk, gold thread','#3e0f1a','#dcb46e'],
    ['mauve','Mauve Zaitun','Mauve silk, gold thread','#5a1a2a','#d2b072'],
    ['pic','Pic Sage','Sage-green silk, peach gold','#4f5d47','#e8b58c'],
    ['kunyit','Kunyit Nila','Navy silk, turmeric gold','#1d2b4a','#e8b44e'],
    ['lavender','Lavender Arang','Charcoal silk, pale gold','#3f3d46','#d8cca8'],
    ['karang','Teal Karang','Teal silk, gold thread','#0b4a4a','#e2bd80'],
    ['pandan','Pandan','Pandan-green silk, gold thread','#0d4a32','#dcbb62'],
    ['kopi','Kopi Susu','Coffee silk, gold thread','#3b2a22','#d6b077'],
    ['hujan','Biru Hujan','Rain-blue silk, silver-gold','#26394d','#d6d0bc'],
    ['fajar','Fajar','Dawn plum silk, gold thread','#4a2238','#e8bb84'],
  ].map(([k,n,desc,cloth,thread])=>{const light=sgHex(cloth).reduce((a,b)=>a+b)>1.8;
    const ground=light?'#3d3129':sgMix('#eee8dd',cloth,.07);
    return {k,n,desc,c:{ground,sheet:'#fcf8ef',ink:'#2e2620',accent:light?'#6e1a26':cloth,gold:light?thread:sgMix(thread,'#8a6428',.35),pagefg:light?'#f3ead9':'#2e2620',cover:cloth,cloth,thread}}})});
