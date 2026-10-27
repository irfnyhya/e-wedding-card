/* akad: a quiet ivory nikah card. A slim gold header (the bismillah when the couple wants it, otherwise a fine arabesque),
   a pointed-arch panel ruled in hairline gold, the card face around it faintly embossed with an eight-point star lattice,
   and two small pierced lanterns hanging on fine chains at the top corners. Lots of white space.
   Cover: the card on linen (or velvet for the dark colourways); tap "Buka Jemputan" and the card comes up towards you.
   Page: the same card, taller, with the names in the arch. Skin: ivory cards with a double gold rule and an arch ornament over each heading. */
needFont('Great+Vibes');
let akN=0;
const akF=v=>v.toFixed(1);
// the pointed arch at an inset k (k>0 = smaller); sides at x=44 and 256, springing at y=180, arcs of radius 120
const akArch=(k,B)=>{const r=120-k,ay=180-Math.sqrt(r*r-14*14);return `M${44+k} ${B-k}V180A${r} ${r} 0 0 1 150 ${akF(ay)}A${r} ${r} 0 0 1 ${256-k} 180V${B-k}`};
// a small pierced lantern hanging from (x,y0) on a chain of length len, drawn in hairline gold
function akLantern(x,y0,len,u,s=1){const y=y0+len;let ch='';for(let i=0;i<len-2;i+=3.2)ch+=`<ellipse cx="${x}" cy="${akF(y0+i+1.6)}" rx="${i/3.2%2?.5:1}" ry="1.5"/>`;
  return `<g class="akd-lamp" fill="none" stroke="url(#akg${u})" stroke-width=".55">${ch}
   <g transform="translate(${x} ${y}) scale(${s})">
    <circle r="22" cy="25" fill="url(#akh${u})" stroke="none"/>
    <path d="M0 0V3M-4 8Q0 1.6 4 8Z" stroke-width=".6"/><path d="M-7 8H7L6 10.5H-6Z" fill="url(#akg${u})" stroke="none"/>
    <path d="M-6 10.5L-8.4 17V31L-5.6 37H5.6L8.4 31V17L6 10.5Z" fill="url(#akl${u})"/>
    <path d="M-2.6 10.5L-3 17V31L-2 37M2.6 10.5L3 17V31L2 37M-8.4 17H8.4M-8.4 31H8.4" stroke-width=".4"/>
    <path d="M-7.2 29V22Q-7.2 18.6 -5.7 18Q-4.2 18.6 -4.2 22V29ZM-1.5 29V21.6Q-1.5 18.2 0 17.4Q1.5 18.2 1.5 21.6V29ZM4.2 29V22Q4.2 18.6 5.7 18Q7.2 18.6 7.2 22V29Z" stroke-width=".35"/>
    <path d="M-5.6 37L0 45L5.6 37" fill="url(#akg${u})" fill-opacity=".35"/><path d="M0 45V50" stroke-width=".5"/><circle cy="51.6" r="1.4" fill="url(#akg${u})" stroke="none"/>
   </g></g>`}
// the slim header ornament: tapering gold lines either side of a small eight-point star
const akOrn=u=>`<g fill="none" stroke="url(#akg${u})" stroke-linecap="round">
  <path d="M150 26m-6 0l6 -6l6 6l-6 6Z M150 26m-4.2 -4.2h8.4v8.4h-8.4Z" stroke-width=".7"/><circle cx="150" cy="26" r="1.3" fill="url(#akg${u})" stroke="none"/>
  <path d="M138 26H96M162 26H204" stroke-width=".7"/><path d="M134 26C126 26 124 21 118 21C112 21 112 26 106 26M166 26C174 26 176 21 182 21C188 21 188 26 194 26" stroke-width=".5"/>
  <path d="M134 26C126 26 124 31 118 31C112 31 112 26 106 26M166 26C174 26 176 31 182 31C188 31 188 26 194 26" stroke-width=".5"/>
  <circle cx="92" cy="26" r="1" fill="url(#akg${u})"/><circle cx="208" cy="26" r="1" fill="url(#akg${u})"/></g>`;
// the card face: lattice, rules, arch panel, header, lanterns. H = card height in viewBox units (width 300)
function akCard(o,H){const u=++akN,B=H-26;
  let lat='';for(let i=0;i<8;i++){const a=i*Math.PI/4;lat+=`M${akF(12+Math.cos(a)*7)} ${akF(12+Math.sin(a)*7)}L${akF(12+Math.cos(a+Math.PI*.75)*7)} ${akF(12+Math.sin(a+Math.PI*.75)*7)}`}
  return `<svg class="akd-face" viewBox="0 0 300 ${H}" fill="none"><defs>
   <linearGradient id="akg${u}" x1="0" y1="0" x2="1" y2=".35"><stop offset="0" stop-color="#9c7634"/><stop offset=".3" stop-color="#e3c77f"/><stop offset=".5" stop-color="#a9843f"/><stop offset=".72" stop-color="#ecd796"/><stop offset="1" stop-color="#9a7331"/></linearGradient>
   <radialGradient id="akh${u}"><stop offset="0" stop-color="#ffd98c" stop-opacity=".7"/><stop offset="1" stop-color="#ffd98c" stop-opacity="0"/></radialGradient>
   <radialGradient id="akl${u}" cy=".45"><stop offset="0" stop-color="#fff6d8"/><stop offset=".6" stop-color="#f7dc98"/><stop offset="1" stop-color="#d9ac58"/></radialGradient>
   <pattern id="akp${u}" width="24" height="24" patternUnits="userSpaceOnUse"><g style="stroke:var(--gold);fill:var(--gold)"><path d="${lat}" fill="none" stroke-width=".45" opacity=".55"/><g stroke="none" opacity=".4"><circle r=".8"/><circle cx="24" cy="24" r=".8"/><circle cx="24" r=".8"/><circle cy="24" r=".8"/></g></g></pattern>
   <mask id="akm${u}"><rect width="300" height="${H}" fill="#fff"/><path d="${akArch(-6,B+6)}Z" fill="#000"/><rect x="60" y="8" width="180" height="40" fill="#000"/></mask></defs>
   <rect x="12" y="12" width="276" height="${H-24}" fill="url(#akp${u})" mask="url(#akm${u})" opacity=".55"/>
   <rect x="6" y="6" width="288" height="${H-12}" stroke="url(#akg${u})" stroke-width=".9"/><rect x="10" y="10" width="280" height="${H-20}" stroke="url(#akg${u})" stroke-width=".4"/>
   <path d="${akArch(0,B)}" stroke="url(#akg${u})" stroke-width="1.1"/><path d="${akArch(4,B)}" stroke="url(#akg${u})" stroke-width=".4"/>
   <path d="M150 ${akF(180-Math.sqrt(120*120-196))}V48M146 52Q150 46 154 52Q150 58 146 52Z" stroke="url(#akg${u})" stroke-width=".55"/>
   <path d="M32 ${B}H268" stroke="url(#akg${u})" stroke-width=".6"/><path d="M144 ${B+6}L150 ${B+2}L156 ${B+6}L150 ${B+10}Z" fill="url(#akg${u})"/>
   ${o.bismillah?'':akOrn(u)}
   ${akLantern(26,10,36,u,1.2)}${akLantern(274,10,50,u,1.2)}
  </svg>`}
const akText=(o,L,page)=>{const [n1,n2]=coverNames(o);
  return `<p class="akd-k${page?' kicker':''}">${ev(o,L)}</p>
   <${page?'h1':'p'} class="akd-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${page?'h1':'p'}>
   <i class="akd-rule"></i>
   <p class="akd-date">${esc(fmtDate(o.date,o.lang))}</p>${page&&o.hijri?`<p class="akd-hj">${esc(o.hijri)}</p>`:''}
   ${o.venue?`<p class="akd-ven">${esc(o.venue)}</p>`:''}`};
const akBis=o=>o.bismillah?'<p class="akd-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':'';
FAMILY({key:'akad',name:'Akad',meaning:'Nikah card',
  blurb:'A quiet ivory card with a slim gold header, a pointed arch ruled in hairline gold and two small lanterns hanging at the corners. The card comes up towards guests as it opens.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1350,
  page(o,th,L){const c=th.c,en=o.lang==='en';
    return `<section class="page pg-akad${c.dark?' akd-dark':''}"><div class="akd-bg"></div>
      <div class="akd-card akd-big reveal">${akCard(o,520)}${akBis(o)}<div class="akd-txt">${akText(o,L,true)}</div></div>
      <div class="akd-pills reveal d2"><a class="akd-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="akd-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-akad${c.dark?' akd-dark':''}"><div class="akd-bg"></div>
      <div class="akd-card akd-cc">${akCard(o,440)}${akBis(o)}<div class="akd-txt">${akText(o,L,false)}</div></div>
      <div class="akd-foot">${guest?`<p class="akd-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="akd-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('akd-dk',!!th.c.dark);
    el.style.setProperty('--akorn',K.uri(`<svg ${NS} viewBox="0 0 120 30" fill="none" stroke="#000"><path d="M48 29V17A12 12 0 0 1 60 4A12 12 0 0 1 72 17V29" stroke-width="1"/><path d="M52 29V18A8.5 8.5 0 0 1 60 8.6A8.5 8.5 0 0 1 68 18V29" stroke-width=".6"/><path d="M60 0V3" stroke-width=".8"/><path d="M8 24H40M80 24H112" stroke-width=".8"/><circle cx="60" cy="21" r="1.6" fill="#000"/></svg>`));
    const sc=$('.scroller',el);
    $$('.pg-akad [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory card, hairline gold, on warm linen',c:{ground:'#e9e1d2',sheet:'#fdfaf3',ink:'#3a3128',accent:'#7a5a2c',gold:'#a8833f',pagefg:'#3a3128'}},
    {k:'putih',n:'Putih',desc:'White card, gold and deep green script, on pale linen',c:{ground:'#e7e6e0',sheet:'#ffffff',ink:'#2f342f',accent:'#2f5544',gold:'#a8853f',pagefg:'#2f342f'}},
    {k:'jambu',n:'Jambu',desc:'Ivory card with rose script on blush linen',c:{ground:'#ecd9d2',sheet:'#fffaf6',ink:'#43302f',accent:'#9a4558',gold:'#ad8848',pagefg:'#43302f'}},
    {k:'sage',n:'Sage',desc:'Ivory card on soft sage linen',c:{ground:'#d8dccb',sheet:'#fcfbf4',ink:'#2f352b',accent:'#4d6343',gold:'#a3884a',pagefg:'#2f352b'}},
    {k:'biru',n:'Biru',desc:'Ivory card with navy script on misty blue linen',c:{ground:'#d5dce2',sheet:'#fdfcf8',ink:'#26303c',accent:'#2e4566',gold:'#a8894c',pagefg:'#26303c'}},
    {k:'zamrud',n:'Zamrud',desc:'Ivory card on deep emerald velvet',c:{ground:'#123227',sheet:'#fcf8ee',ink:'#2b3029',accent:'#1f4a39',gold:'#b8954f',pagefg:'#efe9d8',dark:1}},
    {k:'marun',n:'Marun',desc:'Ivory card on maroon velvet',c:{ground:'#45141d',sheet:'#fdf8f0',ink:'#3a2a28',accent:'#7b2232',gold:'#b8924f',pagefg:'#f3e6dc',dark:1}},
    {k:'nila',n:'Nila',desc:'Ivory card on midnight velvet',c:{ground:'#151c30',sheet:'#fcfaf4',ink:'#262b38',accent:'#2b3b63',gold:'#b49752',pagefg:'#e8eaf2',dark:1}},
  ]});
