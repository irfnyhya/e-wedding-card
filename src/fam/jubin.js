/* jubin: a wall of real hand-painted Ottoman tiles (Met Museum, public domain: pd-illum-3/4/5) with one plain glazed plaque set into it,
   its cusped arch and rosettes painted by hand in the colourway's glaze.
   Cover: tap "Buka Jemputan", the plaque comes forward off the wall while the wall dims.
   Page: the plaque over the wall with three small glazed tiles that link to the details, RSVP and location.
   Skin: glazed cream plaques with a painted double rule and a rosette over each heading. */
let jbN=0;
// an Iznik rosette: eight teardrop petals outlined in the glaze colour, cream centres, a red heart
const jbRose=(cx,cy,r)=>{const pet=K.ring(8,0,cx,cy).map(([x,y,a])=>{const d=(a*180/Math.PI+90).toFixed(1);
    return `<path d="M${cx} ${cy-r*.3}C${cx+r*.32} ${cy-r*.55} ${cx+r*.3} ${cy-r*.92} ${cx} ${cy-r}C${cx-r*.3} ${cy-r*.92} ${cx-r*.32} ${cy-r*.55} ${cx} ${cy-r*.3}Z" transform="rotate(${d} ${cx} ${cy})"/>`}).join('');
  return `<g class="jb-rose">${pet}<circle cx="${cx}" cy="${cy}" r="${(r*.3).toFixed(2)}" class="jb-red"/></g>`};
// the plaque: a cusped arch painted on cream glaze; the strokes wobble slightly like a brush
const JB_ARCH='M5 137V46C5 33 16 29 26 25C36 21 44 15 50 5C56 15 64 21 74 25C84 29 95 33 95 46V137Z';
const JB_MASK=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 142" preserveAspectRatio="none"><path d="${JB_ARCH}"/></svg>`);
const jbPlaque=(uid)=>{const arch=JB_ARCH;
  const inner='M11 131V49C11 38 20 35 28 31.5C37 27.5 45 22 50 14C55 22 63 27.5 72 31.5C80 35 89 38 89 49V131Z';
  return `<svg class="jb-svg" viewBox="0 0 100 142" preserveAspectRatio="none" ${NS} aria-hidden="true"><defs>
    <filter id="jbw${uid}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".12" numOctaves="2" seed="${uid}"/><feDisplacementMap in="SourceGraphic" scale=".7"/></filter>
    <linearGradient id="jbg${uid}" x1="0" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".28" stop-color="#fff" stop-opacity="0"/><stop offset=".85" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".08"/></linearGradient></defs>
    <path d="${arch}" class="jb-glaze"/>
    <g filter="url(#jbw${uid})"><path d="${arch}" fill="none" class="jb-band" stroke-width="2.8"/><path d="${inner}" fill="none" class="jb-line" stroke-width=".55"/>
      ${jbRose(50,29,5)}</g>
    <path d="${arch}" fill="url(#jbg${uid})"/></svg>`};
const jbInner=(o,L,big)=>{const [n1,n2]=coverNames(o);return `<div class="jb-txt"><p class="jb-k${big?' kicker':''}">${ev(o,L)}</p><p class="jb-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
  <p class="jb-date">${esc(big?fmtDate(o.date,o.lang):fmtShort(o.date).replace(/\./g,' · '))}</p>${big&&o.hijri?`<p class="jb-hj">${esc(o.hijri)}</p>`:''}</div>`};
const jbWall=th=>`<div class="jb-wall" style="--wall:url(${A}pd-illum-${th.c.tile}.jpg);--wallf:${th.c.wallf||'none'}"></div>`;
const jbT=(k,n,desc,ground,accent,tile,extra={})=>({k,n,desc,c:{ground,sheet:'#fbf8f1',ink:'#2a2622',accent,gold:'#b89a5e',pagefg:'#2a2622',tile,...extra}});
FAMILY({key:'jubin',name:'Jubin',meaning:'Painted tiles',
  blurb:'A wall of hand-painted Ottoman tiles with one plain glazed plaque set into it, your names painted inside a cusped arch.',
  fonts:{d:"'Marcellus', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const en=o.lang==='en';return `<section class="page pg-jubin2">${jbWall(th)}<div class="jb-veil"></div>
    <div class="jb-plaque big reveal" style="--jbm:${JB_MASK}">${jbPlaque(++jbN)}${jbInner(o,L,true)}</div>
    <div class="jb-tiles reveal d2">
      <a class="jb-tile" data-go="when" href="#"><small>${en?'Event':'Butiran'}</small><b>${en?'Details':'Majlis'}</b></a>
      ${o.x_rsvp?`<a class="jb-tile" data-go="rsvp" href="#"><small>${en?'Reply':'Sudi hadir?'}</small><b>RSVP</b></a>`:''}
      <a class="jb-tile" data-go="loc" href="#"><small>${en?'Find us':'Cari kami'}</small><b>${en?'Location':'Lokasi'}</b></a></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-jubin2">${jbWall(th)}<div class="jb-shade"></div>
    <div class="jb-stage"><div class="jb-plaque" style="--jbm:${JB_MASK}">${jbPlaque(++jbN)}${jbInner(o,L,false)}</div></div>
    <div class="jb-foot">${guest?`<p class="jb-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="jb-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--wall',`url(${A}pd-illum-${th.c.tile}.jpg)`);el.style.setProperty('--wallf',th.c.wallf||'none');el.classList.toggle('jb-dark',!!th.c.dark);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    jbT('gading','Gading','Ochre glaze on a cream Iznik wall','#f3ecdf','#8a6a2c','5'),
    jbT('nila','Nila','Cobalt glaze on a blue tulip wall','#eef0f4','#1f3a7a','4'),
    jbT('marun','Marun','Oxblood glaze on a coral Iznik wall','#f5ece6','#7a1b29','5'),
    jbT('zamrud','Zamrud','Green glaze on a blue garden wall','#edf1eb','#1f5a44','3'),
    jbT('jambu','Merah Jambu','Rose glaze on a soft Iznik wall','#f8eeec','#a3465f','5',{wallf:'saturate(.7) brightness(1.05)'}),
    jbT('sage','Sage','Sage glaze on a faded tile wall','#eff0e9','#55654b','4',{wallf:'grayscale(.75) sepia(.35) hue-rotate(35deg) brightness(1.04)'}),
    jbT('hitam','Hitam','Ink glaze on a dusk-lit tile wall','#1b1918','#1d1b1a','3',{pagefg:'#efe8dc',dark:'1',wallf:'brightness(.55) saturate(.8)'}),
    jbT('terakota','Terakota','Terracotta glaze on a coral Iznik wall','#f5ebe1','#a24a22','5',{wallf:'sepia(.2)'}),
  ]});
