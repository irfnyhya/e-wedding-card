/* qandil: a cluster of pierced brass lanterns hanging at different heights against a night-blue (or deep green) plaster wall.
   Three lantern shapes (onion-domed hexagon, globe, tall cylinder) in shaded brass, each pierced with eight-point stars over a
   warm inner glow, on fine link chains; their light throws a field of small stars across the wall. Names in gold below.
   Cover: tap "Buka Jemputan" and the lanterns are drawn up out of sight as the stars of light spread and fade.
   Page: a smaller cluster above the names. Skin: dark plaster cards lit warmly from above, star-pierced dividers. */
let qdN=0;
const qdF=v=>v.toFixed(1);
// one lantern at (x,y) (y = where its chain ends), type a|b|c, scale s
function qdLamp(t,x,y,s,u){const g=`url(#qdb${u})`,h=`url(#qdh${u})`,w=`url(#qdw${u})`,p=`url(#qdp${u})`,sh=`url(#qds${u})`;
  let body='';
  if(t==='a')body=`<path d="M0 0V8" stroke="${g}" stroke-width="1.6"/><circle cy="9" r="2" fill="${g}"/>
    <path d="M-15 32C-15 20 -4 16 0 10C4 16 15 20 15 32Z" fill="${g}"/><path d="M-15 32C-15 20 -4 16 0 10C4 16 15 20 15 32Z" fill="${p}" opacity=".9"/>
    <path d="M-18 32H18V38H-18Z" fill="${g}"/>
    <path d="M-17 38L-21 50V88L-15 98H15L21 88V50L17 38Z" fill="${w}"/><path d="M-17 38L-21 50V88L-15 98H15L21 88V50L17 38Z" fill="${p}"/><path d="M-17 38L-21 50V88L-15 98H15L21 88V50L17 38Z" fill="${sh}"/>
    <path d="M-7 38V98M7 38V98M-21 50H21M-21 88H21" stroke="${g}" stroke-width="1.5"/><path d="M-17 38L-21 50V88L-15 98H15L21 88V50L17 38Z" fill="none" stroke="${g}" stroke-width="1.6"/>
    <path d="M-15 98L0 114L15 98Z" fill="${g}"/><path d="M0 114V122" stroke="${g}" stroke-width="1.2"/><circle cy="124" r="2.6" fill="${g}"/>`;
  if(t==='b')body=`<path d="M0 0V10" stroke="${g}" stroke-width="1.5"/><path d="M-9 22Q0 6 9 22Z" fill="${g}"/><path d="M-11 22H11V26H-11Z" fill="${g}"/>
    <circle cy="50" r="24" fill="${w}"/><circle cy="50" r="24" fill="${p}"/><circle cy="50" r="24" fill="${sh}"/>
    <g fill="none" stroke="${g}" stroke-width="1.3"><ellipse cy="50" rx="9" ry="24"/><ellipse cy="50" rx="18" ry="24"/><path d="M-24 50H24M-21 38H21M-21 62H21" stroke-width="1"/><circle cy="50" r="24" stroke-width="1.6"/></g>
    <path d="M-8 73Q0 80 8 73L0 88Z" fill="${g}"/><circle cy="90" r="2.2" fill="${g}"/>`;
  if(t==='c')body=`<path d="M0 0V6" stroke="${g}" stroke-width="1.5"/><path d="M-4 6H4L13 22H-13Z" fill="${g}"/><path d="M-4 6H4L13 22H-13Z" fill="${p}" opacity=".8"/>
    <path d="M-14 22H14V27H-14Z" fill="${g}"/>
    <path d="M-12 27H12V96H-12Z" fill="${w}"/><path d="M-12 27H12V96H-12Z" fill="${p}"/><path d="M-12 27H12V96H-12Z" fill="${sh}"/>
    <path d="M-12 27H12V96H-12ZM-12 50H12M-12 74H12M0 27V96" fill="none" stroke="${g}" stroke-width="1.4"/>
    <path d="M-14 96H14V101H-14Z" fill="${g}"/><path d="M-9 101L0 112L9 101Z" fill="${g}"/><circle cy="114" r="2" fill="${g}"/>`;
  const cy=t==='a'?66:t==='b'?50:60;
  let ch='';for(let i=0;i<y-2;i+=4.4)ch+=`<ellipse cx="${x}" cy="${qdF(i+2.2)}" rx="${(i/4.4)%2?.7:1.6}" ry="2.2"/>`;
  return `<g class="qdl-lamp"><g fill="none" stroke="${g}" stroke-width=".8">${ch}</g>
    <circle class="qdl-halo" cx="${x}" cy="${qdF(y+cy*s)}" r="${qdF(70*s)}" fill="${h}"/>
    <g transform="translate(${x} ${y}) scale(${s})">${body}</g></g>`}
function qdCluster(lamps,H){const u=++qdN;
  return `<svg class="qdl-svg" viewBox="0 0 300 ${H}" preserveAspectRatio="xMidYMin meet"><defs>
    <linearGradient id="qdb${u}" x1="0" x2="1"><stop offset="0" stop-color="#4a2e0f"/><stop offset=".28" stop-color="#b98a3e"/><stop offset=".42" stop-color="#f3d58e"/><stop offset=".6" stop-color="#a8772f"/><stop offset="1" stop-color="#3a240b"/></linearGradient>
    <radialGradient id="qdh${u}"><stop offset="0" stop-color="#ffd585" stop-opacity=".8"/><stop offset=".35" stop-color="#ffb04a" stop-opacity=".3"/><stop offset="1" stop-color="#ffb04a" stop-opacity="0"/></radialGradient>
    <radialGradient id="qdw${u}" cy=".45" r=".6"><stop offset="0" stop-color="#fff7d8"/><stop offset=".45" stop-color="#ffd27a"/><stop offset="1" stop-color="#e08a2c"/></radialGradient>
    <linearGradient id="qds${u}" x1="0" x2="1"><stop offset="0" stop-color="#1a0d00" stop-opacity=".6"/><stop offset=".35" stop-color="#1a0d00" stop-opacity="0"/><stop offset=".6" stop-color="#1a0d00" stop-opacity="0"/><stop offset="1" stop-color="#1a0d00" stop-opacity=".65"/></linearGradient>
    <pattern id="qdp${u}" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 0H7V7H0Z${K.star(8,2.7,1.4,3.5,3.5)}M0 0m-.9 0a.9 .9 0 1 0 1.8 0a.9 .9 0 1 0 -1.8 0" fill="#8a5c1e" fill-rule="evenodd"/></pattern></defs>
    ${lamps.map(l=>qdLamp(l[0],l[1],l[2],l[3],u)).join('')}</svg>`}
const QD_COVER=[['a',44,150,.62],['b',258,190,.68],['b',92,86,.82],['c',210,108,.92],['a',150,138,1.12]];
const QD_PAGE=[['b',78,60,.66],['c',222,74,.72],['a',150,92,.9]];
// the stars of light thrown on the wall
const QD_STARS=K.uri(`<svg ${NS} width="52" height="52" viewBox="0 0 52 52"><g fill="#ffd590"><path d="${K.star(8,6.5,3.2,13,13)}"/><path d="${K.star(8,4,1.9,39,39)}"/><circle cx="39" cy="13" r="1.2"/><circle cx="13" cy="39" r="1.2"/></g></svg>`);
const qdText=(o,L,page)=>{const [n1,n2]=coverNames(o);
  return `<p class="qdl-k${page?' kicker':''}">${ev(o,L)}</p>
    <${page?'h1':'p'} class="qdl-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${page?'h1':'p'}>
    <svg class="qdl-rule" viewBox="0 0 120 12"><path d="M4 6H48M72 6H116" stroke="currentColor" stroke-width=".6"/><path d="${K.star(8,5,2.4,60,6)}" fill="currentColor"/></svg>
    <p class="qdl-date">${esc(fmtDate(o.date,o.lang))}</p>${page&&o.hijri?`<p class="qdl-hj">${esc(o.hijri)}</p>`:''}${page&&o.venue?`<p class="qdl-ven">${esc(o.venue)}</p>`:''}`};
FAMILY({key:'qandil',name:'Qandil',meaning:'Brass lanterns',
  blurb:'A cluster of pierced brass lanterns glowing at different heights against a night-blue wall, throwing stars of light around the names in gold. The lanterns rise away as the card opens.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en';
    return `<section class="page pg-qandil" style="--qstars:${QD_STARS}"><div class="qdl-wall"></div><div class="qdl-stars"></div>
      <div class="qdl-lamps reveal">${qdCluster(QD_PAGE,210)}</div>
      ${o.bismillah?'<p class="qdl-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
      <div class="qdl-txt reveal d1">${qdText(o,L,true)}</div>
      <div class="qdl-pills reveal d2"><a class="qdl-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="qdl-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-qandil" style="--qstars:${QD_STARS}"><div class="qdl-wall"></div><div class="qdl-stars"></div>
      <div class="qdl-lamps">${qdCluster(QD_COVER,330)}</div>
      <div class="qdl-txt">${qdText(o,L,false)}</div>
      <div class="qdl-foot">${guest?`<p class="qdl-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="qdl-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);
    el.style.setProperty('--qdiv',K.uri(`<svg ${NS} viewBox="0 0 160 14"><path d="M0 7H62M98 7H160" stroke="#000" stroke-width=".8"/><path d="${K.star(8,6,2.8,80,7)}"/><path d="${K.star(8,3,1.4,68,7)}${K.star(8,3,1.4,92,7)}"/></svg>`));
    const sc=$('.scroller',el);
    $$('.pg-qandil [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'nila',n:'Nila',desc:'Brass lanterns on a night-blue wall',c:{ground:'#121b33',sheet:'#1b2643',ink:'#efe6d2',accent:'#e6c67e',gold:'#c9a356',pagefg:'#efe6d2'}},
    {k:'zamrud',n:'Zamrud',desc:'Brass lanterns on a deep green wall',c:{ground:'#0f2a22',sheet:'#173a30',ink:'#ece7d4',accent:'#e6c67e',gold:'#c9a356',pagefg:'#ece7d4'}},
    {k:'malam',n:'Malam',desc:'Brass lanterns on an ink-black wall',c:{ground:'#0d0f16',sheet:'#181b26',ink:'#ebe6da',accent:'#e9c97f',gold:'#c9a356',pagefg:'#ebe6da'}},
    {k:'laut',n:'Laut',desc:'Brass lanterns on a deep teal wall',c:{ground:'#0e2a30',sheet:'#163b42',ink:'#e8ebe3',accent:'#e8c87e',gold:'#c9a356',pagefg:'#e8ebe3'}},
    {k:'ungu',n:'Ungu',desc:'Brass lanterns on a plum wall',c:{ground:'#24152e',sheet:'#321f3f',ink:'#efe4e6',accent:'#ebc983',gold:'#c9a356',pagefg:'#efe4e6'}},
    {k:'marun',n:'Marun',desc:'Brass lanterns on a maroon wall',c:{ground:'#2e0f15',sheet:'#43171f',ink:'#f2e4dc',accent:'#ecca82',gold:'#c9a356',pagefg:'#f2e4dc'}},
    {k:'kopi',n:'Kopi',desc:'Brass lanterns on a dark coffee wall',c:{ground:'#22170f',sheet:'#312218',ink:'#f0e6d6',accent:'#e9c67c',gold:'#c9a356',pagefg:'#f0e6d6'}},
    {k:'senja',n:'Senja',desc:'Brass lanterns on a dusk-violet wall',c:{ground:'#2b2a45',sheet:'#383857',ink:'#eeeaf0',accent:'#eccb86',gold:'#c9a356',pagefg:'#eeeaf0'}},
  ]});
