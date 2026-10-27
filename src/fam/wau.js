/* wau: the Kelantan moon kite (wau bulan), layered paper cutwork with awan larat scrolls.
   Cover: the kite hangs in a dusk sky on its string; touching it sends it up and away.
   Page: a smaller kite over the names inside an awan larat frame. Skin: sky cards with kite headings. */
const WAU='M100 14C122 30 134 58 128 92C150 92 178 86 196 70C192 104 160 128 118 132C116 150 118 166 124 184C146 182 168 178 186 168C178 220 140 252 100 252C60 252 22 220 14 168C32 178 54 182 76 184C82 166 84 150 82 132C40 128 8 104 4 70C22 86 50 92 72 92C66 58 78 30 100 14Z';
// awan larat: a curling cloud-scroll, drawn once and mirrored
const CURL='M0 0c6-10 20-12 26-4s0 18-9 16-8-11-1-12';
function wauSvg(c,uid){const inset=(s,fill,extra='')=>`<path d="${WAU}" transform="translate(100 140) scale(${s}) translate(-100 -140)" fill="${fill}" ${extra}/>`;
  const curls=[[64,112,-20,1],[136,112,20,-1],[40,96,-8,1],[160,96,8,-1],[70,200,-160,1],[130,200,160,-1],[52,218,-140,1],[148,218,140,-1]]
    .map(([x,y,r,s])=>`<path d="${CURL}" transform="translate(${x} ${y}) rotate(${r}) scale(${s} 1)" fill="none" stroke="${c.accent}" stroke-width="2.2" stroke-linecap="round"/>`).join('');
  const petals=K.ring(8,10,100,62).map(([x,y,a])=>`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="5" ry="2.6" transform="rotate(${(a*180/Math.PI).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${c.gold}"/>`).join('');
  const fringe=x=>Array.from({length:7},(_,i)=>`<path d="M${x+(i-3)*1.6} 74q${(i-3)*1.2} 10 ${(i-3)*2} 22" stroke="${c.gold}" stroke-width=".9" fill="none"/>`).join('');
  return `<svg class="wau-k" viewBox="0 -4 200 266"><defs><clipPath id="wc${uid}"><path d="${WAU}"/></clipPath><pattern id="wp${uid}" width="11" height="11" patternUnits="userSpaceOnUse"><path d="M5.5 1l1.4 3.1 3.1 1.4-3.1 1.4-1.4 3.1-1.4-3.1-3.1-1.4 3.1-1.4z" fill="${c.accent}" opacity=".2"/></pattern></defs>
   <path d="M30 98Q100 70 170 98" fill="none" stroke="${c.ink}" stroke-width="1.2"/>
   ${inset(1,c.accent,`stroke="${c.ink}" stroke-width="1.4"`)}${inset(.93,'none',`stroke="${c.sheet}" stroke-width=".8" stroke-dasharray="2 2"`)}${inset(.88,c.gold)}${inset(.84,c.ink)}${inset(.82,c.sheet)}${inset(.82,`url(#wp${uid})`)}
   <g clip-path="url(#wc${uid})" opacity=".9">${curls}</g>
   ${inset(.62,'none',`stroke="${c.accent}" stroke-width="1" stroke-dasharray="1 3" stroke-linecap="round"`)}
   <circle cx="100" cy="62" r="17" fill="${c.accent}"/><circle cx="100" cy="62" r="13" fill="${c.sheet}"/>${petals}<circle cx="100" cy="62" r="4" fill="${c.accent}"/>
   <path d="M100 196l9 12-9 12-9-12z" fill="${c.accent}"/><path d="M100 202l4.5 6-4.5 6-4.5-6z" fill="${c.gold}"/>
   <path d="M100 100V176" stroke="${c.accent}" stroke-width="1.6"/>${fringe(196)}${fringe(4)}</svg>`}
let n=0;
FAMILY({key:'wau',name:'Wau',meaning:'Moon kite',
  blurb:'A Kelantan wau bulan in layered paper cutwork, hanging in a dusk sky. Touch it and it flies.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c;return `<section class="page pg-wau"><div class="wau-sky"></div>
    <div class="wau-frame"></div><div class="wau-mini reveal">${wauSvg(c,++n)}</div>
    <p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
    <div class="rule reveal d2"><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';return `<div class="cover cv-wau"><div class="wau-sky"></div><i class="wau-cloud a"></i><i class="wau-cloud b"></i>
    <div class="wau-head"><p class="kicker">${ev(o,L)}</p><p class="wau-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div>
    <${tag} class="wau-fly" ${attr} aria-label="${L.open}">${wauSvg(c,++n)}<svg class="wau-str" viewBox="0 0 40 300" preserveAspectRatio="none"><path d="M20 0C32 90 6 180 22 300" fill="none" stroke="${c.sheet}" stroke-width="1" opacity=".75"/></svg></${tag}>
    <div class="wau-foot">${guest?`<p class="to-line">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="wau-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el){K.cards(el);$$('.sec h2',el).forEach(h=>h.insertAdjacentHTML('afterbegin','<i class="wau-h"></i>'))},
  themes:[
    {k:'merah',n:'Merah',desc:'Red wau in a blue dusk',c:{ground:'#1f3a5f',sheet:'#fbf5e8',ink:'#2a2320',accent:'#b3262e',gold:'#d9a43a',pagefg:'#f6eedd'}},
    {k:'kuning',n:'Kuning Diraja',desc:'Royal yellow on deep blue',c:{ground:'#16294a',sheet:'#fff8e6',ink:'#2a2320',accent:'#d8a21b',gold:'#7a1d2b',pagefg:'#f6eedd'}},
    {k:'hijau',n:'Hijau',desc:'Emerald wau at sunset',c:{ground:'#7a3b2e',sheet:'#fbf5e8',ink:'#20261f',accent:'#1f6b4a',gold:'#e0b04a',pagefg:'#fbefe0'}},
    {k:'biru',n:'Biru',desc:'Indigo wau in a morning sky',c:{ground:'#7fa7c9',sheet:'#fdfaf2',ink:'#1d2533',accent:'#1f3f7a',gold:'#c9973a',pagefg:'#fdfaf2'}},
    {k:'ungu',n:'Ungu',desc:'Plum wau on lilac dusk',c:{ground:'#4a3a66',sheet:'#fbf6ee',ink:'#2a2330',accent:'#6b2d5c',gold:'#d6a84e',pagefg:'#f5eefa'}},
    {k:'jingga',n:'Jingga',desc:'Orange wau over the sea',c:{ground:'#2a5a6b',sheet:'#fff7ea',ink:'#2a2320',accent:'#d0632a',gold:'#f0c35a',pagefg:'#f3f0e6'}},
    {k:'malam',n:'Malam',desc:'Gold wau in a night sky',c:{ground:'#0f1424',sheet:'#f6efdc',ink:'#1b1712',accent:'#b8862f',gold:'#7a1d2b',pagefg:'#efe6d0'}},
    {k:'pastel',n:'Pastel',desc:'Blush wau in a pale sky',c:{ground:'#c9d8e6',sheet:'#fffdf8',ink:'#3a2f2b',accent:'#c97a86',gold:'#8fa98a',pagefg:'#3a2f2b'}},
  ]});
