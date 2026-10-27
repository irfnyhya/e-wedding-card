/* pelamin: the bridal dais behind heavy velvet curtains with gold-embroidered borders, under a fringed pelmet.
   Cover: the curtains closed, an embroidered silk medallion with the names hung on gold cords in front.
   Tap "Buka Jemputan": the medallion rises away and the curtains draw apart to the sides.
   Page: the dais itself, a gilt arch over embroidered silk with the names, curtains tied back, two carpeted steps.
   Skin: ivory silk cards with an embroidered gold band at the top and spaced-cap headings. */
// velvet folds: a run of soft cylinders of uneven width, as one gradient
function plFolds(seed,n=7){const r=rng(seed);let x=0,st=[];const ws=Array.from({length:n},()=>.6+r()*.9),T=ws.reduce((a,b)=>a+b,0);
  ws.forEach(w=>{const W=w/T*100,d=(.28+r()*.2).toFixed(2),h=(.1+r()*.12).toFixed(2);
    st.push(`rgba(0,0,0,${d}) ${x.toFixed(2)}%`,`rgba(255,255,255,${h}) ${(x+W*.42).toFixed(2)}%`,`rgba(0,0,0,.04) ${(x+W*.7).toFixed(2)}%`);x+=W});
  st.push(`rgba(0,0,0,.3) 100%`);return `linear-gradient(90deg,${st.join(',')})`}
// a strip of embroidery: a running vine of leaves and seed beads between two couched gold lines (used as a mask)
const PL_BAND=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 24"><g fill="none" stroke="#000" stroke-width=".9"><path d="M0 2.5H40M0 21.5H40"/><path d="M0 12C6 6 14 6 20 12S34 18 40 12" stroke-width="1"/></g>
  <path d="M8 8.6c2-3.4 5.4-3.6 7-2.4-1.8 2.4-4.6 3.2-7 2.4ZM28 15.4c2 3.4 5.4 3.6 7 2.4-1.8-2.4-4.6-3.2-7-2.4ZM20 12m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M3 12m-.9 0a.9.9 0 1 0 1.8 0a.9.9 0 1 0-1.8 0M37 12m-.9 0a.9.9 0 1 0 1.8 0a.9.9 0 1 0-1.8 0"/>
  <path d="M0 6.5h40M0 17.5h40" stroke="#000" stroke-width=".35" stroke-dasharray="1 1.6"/></svg>`);
const PL_BANDV=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 40"><g transform="rotate(90) translate(0 -24)"><g fill="none" stroke="#000" stroke-width=".9"><path d="M0 2.5H40M0 21.5H40"/><path d="M0 12C6 6 14 6 20 12S34 18 40 12" stroke-width="1"/></g>
  <path d="M8 8.6c2-3.4 5.4-3.6 7-2.4-1.8 2.4-4.6 3.2-7 2.4ZM28 15.4c2 3.4 5.4 3.6 7 2.4-1.8-2.4-4.6-3.2-7-2.4ZM20 12m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0"/>
  <path d="M0 6.5h40M0 17.5h40" stroke="#000" stroke-width=".35" stroke-dasharray="1 1.6"/></g></svg>`);
// pucuk rebung: a row of bamboo-shoot triangles, for the pelmet and the silk
const PL_REBUNG=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30"><path d="M0 1H24M0 29H24" stroke="#000" stroke-width=".8"/><path d="M2 27L12 5L22 27Z" fill="none" stroke="#000" stroke-width=".9"/><path d="M7 27L12 15L17 27Z"/><circle cx="12" cy="10.5" r="1"/></svg>`);
// bunga tabur: small scattered eight-petal flowers woven into the silk
const PL_TABUR=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><g>${[0,1,2,3,4,5,6,7].map(i=>`<ellipse cx="10" cy="6.6" rx="1.1" ry="2.6" transform="rotate(${i*45} 10 10)"/>`).join('')}<circle cx="10" cy="10" r="1.2"/></g>
  <g transform="translate(20 20)">${[0,1,2,3].map(i=>`<ellipse cx="10" cy="7.4" rx=".8" ry="2" transform="rotate(${i*90+45} 10 10)"/>`).join('')}<circle cx="10" cy="10" r=".9"/></g></svg>`);
// a tassel hanging from a cord
const plTassel=(cls='')=>`<svg class="pl-tassel ${cls}" viewBox="0 0 20 54"><defs><linearGradient id="plg" x1="0" x2="1"><stop offset="0" style="stop-color:color-mix(in srgb,var(--gold) 60%,#000)"/><stop offset=".45" style="stop-color:color-mix(in srgb,var(--gold) 70%,#fff)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--gold) 70%,#000)"/></linearGradient></defs>
  <g fill="url(#plg)"><circle cx="10" cy="6" r="4.4"/><path d="M6.5 10h7l1 5h-9z"/><path d="M5.2 15h9.6c1.6 10 2.6 22 3.6 37H1.6c1-15 2-27 3.6-37z"/></g>
  <g stroke="rgba(0,0,0,.28)" stroke-width=".5">${[4,6.5,9,11.5,14,16].map(x=>`<path d="M${10+(x-10)*.55} 17L${x} 51"/>`).join('')}</g></svg>`;
// the medallion's embroidered rim: scalloped edge, a ring of seed pearls, a couched line
function plRim(){const pts=K.ring(40,94,100,100).map(([x,y])=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.5"/>`).join('');
  const leaves=K.ring(16,84,100,100).map(([x,y,a])=>{const d=a*180/Math.PI+90;return `<path transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${d.toFixed(1)})" d="M0 -4C2.6 -2 2.6 2 0 4C-2.6 2 -2.6 -2 0 -4Z"/>`}).join('');
  return `<svg class="pl-rim" viewBox="0 0 200 200"><path d="${K.scallop(40,97,4.5,100,100)}" fill="none" style="stroke:var(--gold)" stroke-width="1.6"/>
    <g style="fill:color-mix(in srgb,var(--gold) 80%,#fff)">${pts}</g><circle cx="100" cy="100" r="89" fill="none" style="stroke:var(--gold)" stroke-width=".8"/>
    <g style="fill:var(--gold)">${leaves}</g><circle cx="100" cy="100" r="79" fill="none" style="stroke:var(--gold)" stroke-width=".6" stroke-dasharray="1.4 1.8"/></svg>`}
const plVars=c=>`--drape:${c.drape};--folds-l:${plFolds(3)};--folds-r:${plFolds(11)};--band:${PL_BAND};--bandv:${PL_BANDV};--rebung:${PL_REBUNG};--tabur:${PL_TABUR}`;
const plPelmet=()=>`<div class="pl-pelmet"><i class="pl-reb"></i></div><div class="pl-fringe"></div>`;
FAMILY({key:'pelamin',name:'Pelamin',meaning:'Wedding dais',
  blurb:'Heavy velvet curtains with gold-embroidered borders and an embroidered silk medallion; they draw apart to show the dais with the names on silk under a gilt arch.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1600,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-pelamin${th.c.lite?' pl-lite':''}" style="${plVars(th.c)}"><div class="pl-hall"><i></i></div>
      <div class="pl-tie pl-tl"><i class="pl-hem"></i><i class="pl-edge"></i><span class="pl-knot">${plTassel()}</span></div>
      <div class="pl-tie pl-tr"><i class="pl-hem"></i><i class="pl-edge"></i><span class="pl-knot">${plTassel()}</span></div>
      ${plPelmet()}
      <div class="pl-dais reveal">
        <div class="pl-arch"><div class="pl-silk">
          ${o.bismillah?'<p class="pl-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}<p class="pl-k kicker">${ev(o,L)}</p>
          <h1 class="pl-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
          <p class="pl-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="pl-ven">${esc(o.venue)}</p>`:''}</div></div>
        <div class="pl-steps"><i></i><i></i><i></i></div></div>
      <a class="pl-pill reveal d2" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-pelamin${th.c.lite?' pl-lite':''}" style="${plVars(th.c)}"><div class="pl-hall"><i></i></div>
      <div class="pl-cur pl-l"><i class="pl-hem"></i><i class="pl-edge"></i></div><div class="pl-cur pl-r"><i class="pl-hem"></i><i class="pl-edge"></i></div>
      <div class="pl-glow"></div>${plPelmet()}
      <div class="pl-med"><i class="pl-cord"></i><div class="pl-disc">${plRim()}<div class="pl-mt"><p class="pl-k">${ev(o,L)}</p><p class="pl-mn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="pl-md">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>${plTassel('pl-mtas')}</div>
      <div class="pl-foot">${guest?`<p class="pl-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="pl-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--drape',th.c.drape);el.style.setProperty('--band',PL_BAND);el.classList.toggle('pl-lite',!!th.c.lite);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Crimson velvet, ivory silk, gold',c:{ground:'#2a0a0f',sheet:'#fbf3e2',ink:'#2d2018',accent:'#7e1624',gold:'#cfa24e',pagefg:'#f6e6c6',drape:'#7a1220'}},
    {k:'emas',n:'Emas',desc:'Old-gold velvet on cream silk',c:{ground:'#2e2109',sheet:'#fff8e8',ink:'#3a2a12',accent:'#8a6418',gold:'#d8b25a',pagefg:'#fbefd2',drape:'#8f6a22'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald velvet, ivory silk, gold',c:{ground:'#081d16',sheet:'#f8f3e3',ink:'#1e2a22',accent:'#165440',gold:'#d2aa55',pagefg:'#efe7cc',drape:'#11463a'}},
    {k:'biru',n:'Biru',desc:'Sapphire velvet, pearl silk, gold',c:{ground:'#0a1229',sheet:'#f6f3ea',ink:'#1b2236',accent:'#22408a',gold:'#cdb06a',pagefg:'#e9e6dc',drape:'#1b2f6a'}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose velvet on blush',c:{ground:'#e7d3cf',sheet:'#fff8f4',ink:'#3a2729',accent:'#9c4559',gold:'#b8924e',pagefg:'#3a2729',drape:'#c07f8a',lite:1}},
    {k:'sage',n:'Sage',desc:'Sage velvet, ivory silk and gold',c:{ground:'#dfe2d6',sheet:'#fbfaf2',ink:'#2c3327',accent:'#56664a',gold:'#b09454',pagefg:'#2a3126',drape:'#7d8f6c',lite:1}},
    {k:'ungu',n:'Ungu',desc:'Amethyst velvet and gold',c:{ground:'#1a0c22',sheet:'#fbf5fa',ink:'#2e2232',accent:'#5e2870',gold:'#d1a95c',pagefg:'#f1e5f2',drape:'#4c1e5e'}},
    {k:'krim',n:'Krim',desc:'Champagne velvet on cream, antique gold',c:{ground:'#ece3d2',sheet:'#fffaf1',ink:'#3a3027',accent:'#86672f',gold:'#b8954f',pagefg:'#3a3027',drape:'#cdb48a',lite:1}},
  ]});
