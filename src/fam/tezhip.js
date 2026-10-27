/* tezhip: an Ottoman-style leather binding. A goatskin board, blind-tooled with a double frame and a gilt fillet, gilt
   corner pieces (köşebent) and at its centre a round şemse medallion inlaid with real illumination (the star-and-rosette
   centre of pd-illum-1, Met Museum CC0, text-free) inside a scalloped gold rim with pendants. The names are gold-tooled
   into the leather. A silk bookmark hangs from the bottom edge with a small card tag that carries the guest's name.
   Cover: tap "Buka Jemputan" and the board swings open on its spine, showing the illuminated first leaf.
   Page: that leaf: a Maghrebi illuminated headpiece (pd-illum-2, CC0, no text) over the names, ruled with jadwal lines.
   Skin: cream leaves with jadwal rules (gold, lapis, black) on the leather, a small illuminated rosette over each heading. */
let tzN=0;
const tzF=v=>v.toFixed(2);
const TZG=u=>`<linearGradient id="tzg${u}" x1="0" y1="0" x2="1" y2=".7"><stop offset="0" stop-color="#8a6326"/><stop offset=".28" stop-color="#f1d98f"/><stop offset=".5" stop-color="#a77f37"/><stop offset=".74" stop-color="#ecd087"/><stop offset="1" stop-color="#7f5a22"/></linearGradient>`;
// the board's tooling, drawn in a 300 x 430 box: blind double frame, gilt fillet, chain of gilt dots, corner pieces
function tzTool(){const u=++tzN,W=300,H=430;let dots='';
  for(let x=34;x<=W-34;x+=8)dots+=`<circle cx="${x}" cy="27" r=".9"/><circle cx="${x}" cy="${H-27}" r=".9"/>`;
  for(let y=35;y<=H-35;y+=8)dots+=`<circle cx="27" cy="${y}" r=".9"/><circle cx="${W-27}" cy="${y}" r=".9"/>`;
  // a corner piece: a quarter ogee, gilt, with a tooled inner line and a small trefoil
  const corner=`<path d="M0 0H58C58 14 50 20 40 22C30 24 24 30 22 40C20 50 14 58 0 58Z" fill="url(#tzg${u})"/><path d="M5 5H46C44 13 38 16 31 17C23 18 18 23 17 31C16 38 13 44 5 46Z" fill="none" stroke="rgba(60,35,10,.55)" stroke-width=".7"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" fill="rgba(60,35,10,.45)"/>`;
  return `<svg class="tzp-tool" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>${TZG(u)}</defs>
    <g fill="none" stroke-linecap="round">
      <rect x="10" y="10" width="${W-20}" height="${H-20}" stroke="rgba(0,0,0,.42)" stroke-width="1.6"/><rect x="11" y="11" width="${W-20}" height="${H-20}" stroke="rgba(255,255,255,.12)" stroke-width=".8"/>
      <rect x="18" y="18" width="${W-36}" height="${H-36}" stroke="url(#tzg${u})" stroke-width="1.1"/>
      <rect x="36" y="36" width="${W-72}" height="${H-72}" stroke="rgba(0,0,0,.4)" stroke-width="1.2"/><rect x="37" y="37" width="${W-72}" height="${H-72}" stroke="rgba(255,255,255,.1)" stroke-width=".7"/>
      <rect x="40" y="40" width="${W-80}" height="${H-80}" stroke="url(#tzg${u})" stroke-width=".55"/></g>
    <g fill="url(#tzg${u})">${dots}</g>
    <g transform="translate(40 40) scale(.8)">${corner}</g><g transform="translate(${W-40} 40) scale(-.8 .8)">${corner}</g>
    <g transform="translate(40 ${H-40}) scale(.8 -.8)">${corner}</g><g transform="translate(${W-40} ${H-40}) scale(-.8 -.8)">${corner}</g></svg>`}
// the şemse: a round inlay of illumination in a scalloped gold rim, with a pendant above and below
function tzSemse(){const u=++tzN;const sc=K.scallop(16,41,4.5,50,50),sc2=K.scallop(16,37.5,3,50,50);let beads='';K.ring(32,45.6,50,50).forEach(([x,y])=>{beads+=`<circle cx="${tzF(x)}" cy="${tzF(y)}" r=".95"/>`});
  return `<div class="tzp-semse"><i class="tzp-inlay"></i><svg viewBox="0 -18 100 136"><defs>${TZG(u)}<mask id="tzm${u}"><rect x="-10" y="-30" width="120" height="160" fill="#fff"/><circle cx="50" cy="50" r="35.6" fill="#000"/></mask></defs>
    <path d="${sc}" fill="url(#tzg${u})" mask="url(#tzm${u})"/><path d="${sc2}" fill="none" stroke="rgba(60,35,10,.55)" stroke-width=".5"/>
    <circle cx="50" cy="50" r="35.6" fill="none" stroke="rgba(60,35,10,.6)" stroke-width=".8"/><g fill="url(#tzg${u})">${beads}</g>
    <path d="M50 -16C54 -10 58 -8 58 -3C58 1 54 2 50 4C46 2 42 1 42 -3C42 -8 46 -10 50 -16ZM50 116C54 110 58 108 58 103C58 99 54 98 50 96C46 98 42 99 42 103C42 108 46 110 50 116Z" fill="url(#tzg${u})"/>
    <path d="M50 -10V0M50 100V110" stroke="rgba(60,35,10,.5)" stroke-width=".6"/></svg></div>`}
const tzNames=(o,tag,cls='')=>{const [n1,n2]=coverNames(o);return `<${tag} class="tzp-names ${cls}">${esc(n1)}<span>&amp;</span>${esc(n2)}</${tag}>`};
const tzVars=c=>`--lea:${c.lea};--lapis:${c.lapis}`;
FAMILY({key:'tezhip',name:'Tezhip',meaning:'Illuminated binding',
  blurb:'A goatskin binding tooled in gold, with gilt corners and a round inlay of illumination at its heart. The cover swings open on its spine to show an illuminated leaf.',
  fonts:{d:"'IM Fell English SC', serif",s:"'IM Fell English', serif",b:"'IM Fell English', serif"},ms:1500,
  page(o,th,L){const c=th.c,en=o.lang==='en';
    return `<section class="page pg-tezhip${c.dark?' tzp-dark':''}" style="${tzVars(c)}"><div class="tzp-desk"></div>
      <div class="tzp-open reveal"><div class="tzp-pboard"></div>
        <div class="tzp-pleaf"><div class="tzp-head"></div><div class="tzp-jad">
          ${o.bismillah?'<p class="tzp-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="tzp-k kicker">${ev(o,L)}</p>${tzNames(o,'h1')}
          <p class="tzp-d">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="tzp-hj">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="tzp-ven">${esc(o.venue)}</p>`:''}</div></div>
        <i class="tzp-mark"></i></div>
      <div class="tzp-tabs reveal d2"><a class="tzp-tab" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="tzp-tab" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-tezhip${c.dark?' tzp-dark':''}" style="${tzVars(c)}"><div class="tzp-desk"></div>
      <div class="tzp-book">
        <div class="tzp-block"></div>
        <div class="tzp-leaf"><div class="tzp-head"></div></div>
        <div class="tzp-board"><div class="tzp-face"><i class="tzp-lth"></i>${tzTool()}
          <div class="tzp-fc"><p class="tzp-k">${ev(o,L)}</p>${tzSemse()}${tzNames(o,'p','gilt')}<p class="tzp-d gilt">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
          <div class="tzp-inside"></div></div>
        <i class="tzp-ribbon"></i>
      </div>
      ${guest?`<div class="tzp-tag"><small>${L.dear}</small><b>${esc(guest)}</b></div>`:''}
      <${tag} class="tzp-btn" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('tzp-dk',!!c.dark);el.style.setProperty('--lea',c.lea);el.style.setProperty('--lapis',c.lapis);
    const sc=$('.scroller',el);
    $$('.pg-tezhip [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'lapis',n:'Lapis',desc:'Lapis-blue goatskin on a dark desk',c:{ground:'#141b2c',sheet:'#f7efdc',ink:'#2c2a2a',accent:'#1f3b72',gold:'#a37c34',pagefg:'#eee6d2',lea:'#22366b',lapis:'#1f3b72',dark:1}},
    {k:'marun',n:'Marun',desc:'Oxblood goatskin on a dark desk',c:{ground:'#1f1213',sheet:'#f7efdc',ink:'#33282a',accent:'#7c2328',gold:'#a37c34',pagefg:'#f2e5d6',lea:'#6a1f24',lapis:'#1f3b72',dark:1}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald goatskin on a dark desk',c:{ground:'#0f1d18',sheet:'#f7f0dd',ink:'#2a2f2a',accent:'#1d5a44',gold:'#a37c34',pagefg:'#ebe9d8',lea:'#1c4c3b',lapis:'#1f3b72',dark:1}},
    {k:'coklat',n:'Coklat',desc:'Tan-brown goatskin on a walnut desk',c:{ground:'#24170e',sheet:'#f6eedb',ink:'#33291f',accent:'#6b3a1c',gold:'#a37c34',pagefg:'#f1e5d2',lea:'#6a4126',lapis:'#1f3b72',dark:1}},
    {k:'hitam',n:'Hitam',desc:'Black goatskin on a dark desk',c:{ground:'#2a2622',sheet:'#f6eedc',ink:'#2a2826',accent:'#1f3b72',gold:'#a37c34',pagefg:'#ebe5d8',lea:'#1a1816',lapis:'#1f3b72',dark:1}},
    {k:'gading',n:'Gading',desc:'Cognac goatskin on ivory linen',c:{ground:'#e6dccb',sheet:'#fbf5e6',ink:'#30291f',accent:'#1f3b72',gold:'#a37c34',pagefg:'#30291f',lea:'#8a5a32',lapis:'#1f3b72'}},
    {k:'firuz',n:'Firuz',desc:'Turquoise goatskin on pale linen',c:{ground:'#d9e4df',sheet:'#fbf6e8',ink:'#26302e',accent:'#1c5e63',gold:'#a37c34',pagefg:'#26302e',lea:'#22686b',lapis:'#1c5e63'}},
    {k:'jambu',n:'Jambu',desc:'Rose goatskin on blush linen',c:{ground:'#ecdcd6',sheet:'#fbf5ea',ink:'#3a2a2a',accent:'#8a2f3c',gold:'#a37c34',pagefg:'#3a2a2a',lea:'#8c3d4a',lapis:'#1f3b72'}},
  ]});
