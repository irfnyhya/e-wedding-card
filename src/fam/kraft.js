/* kraft: a rustic parcel. Two kraft-paper flaps with machine-stitched edges, tied across with jute twine and a bow,
   a sprig of baby's breath tucked under the knot, rubber-stamped details and pen-written names.
   Cover: touching the bow slips it off the twine, then the flaps fold open. Page: a stitched kraft card with stamped text.
   Skin: kraft cards with stitched edges and rubber-stamp headings. */
needFont('Mrs+Saint+Delafield');
const f1=v=>(+v).toFixed(1);
// baby's breath: a forking spray of hair-thin stems ending in tiny white florets
function gyp(seed,c){const r=rng(seed);let st='',fl='';
  const go=(x,y,a,len,d)=>{const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len,mx=(x+x2)/2+Math.cos(a+1.57)*len*.08,my=(y+y2)/2+Math.sin(a+1.57)*len*.08;
    st+=`<path d="M${f1(x)} ${f1(y)}Q${f1(mx)} ${f1(my)} ${f1(x2)} ${f1(y2)}" stroke-width="${f1(.35+d*.22)}"/>`;
    if(!d){const s=1.5+r()*1.2;fl+=`<g transform="translate(${f1(x2)} ${f1(y2)})"><circle r="${f1(s)}"/><circle r="${f1(s*.42)}" fill="${c.gyc}"/></g>`;return}
    const n=d>2?2:2+(r()<.55?1:0);for(let i=0;i<n;i++){const da=(i-(n-1)/2)*(.5+r()*.3)+(r()-.5)*.25;go(x2,y2,a+da,len*(.62+r()*.16),d-1)}
    if(d<3&&r()<.6){fl+=`<circle cx="${f1(x2+1.5)}" cy="${f1(y2-1)}" r="1"/>`}};
  go(60,190,-1.62,46,5);go(58,188,-1.25,38,4);go(62,190,-1.95,34,4);
  return `<svg class="kraft-gyp" viewBox="0 0 120 200"><g fill="none" stroke="${c.stem}" stroke-linecap="round">${st}<path d="M60 190L62 200M58 188L56 200" stroke-width="1.2"/></g><g fill="${c.chalk}" stroke="rgba(0,0,0,.18)" stroke-width=".3">${fl}</g></svg>`}
// a rope stroke: base colour, dark twist bands, light fibre highlight
const rope=(d,c,w=3.3)=>`<path d="${d}" stroke="rgba(0,0,0,.28)" stroke-width="${w+.8}" transform="translate(.6 1)"/><path d="${d}" stroke="${c.gold}" stroke-width="${w}"/><path d="${d}" stroke="rgba(120,82,36,.42)" stroke-width="${w}" stroke-dasharray="1 1.6"/><path d="${d}" stroke="rgba(255,255,255,.35)" stroke-width=".5" transform="translate(-.4 -.5)" stroke-dasharray="2 1.2"/>`;
const BOW=c=>`<svg class="kraft-bow" viewBox="0 0 140 96" fill="none" stroke-linecap="round">
  ${rope('M70 44C60 54 54 72 42 92',c)}${rope('M70 44C78 56 88 70 104 88',c)}
  ${rope('M68 42C50 22 22 14 16 30C11 44 40 50 68 44',c)}${rope('M72 42C90 22 118 14 124 30C129 44 100 50 72 44',c)}
  ${rope('M64 40C66 36 74 36 76 40C78 46 72 50 68 48C62 46 62 42 64 40Z',c,3)}
  <path d="M42 92l-2 3M42 92l1 3.4M104 88l2.6 2.4M104 88l.6 3.6" stroke="${c.gold}" stroke-width=".7"/></svg>`;
// machine stitching along a flap edge (viewBox in approximate px so stitches keep their length)
const stitch=(d,c,w,h)=>`<svg class="kraft-st" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" fill="none"><path d="${d}" stroke="rgba(0,0,0,.3)" stroke-width="1.4" stroke-dasharray="5 3.4" transform="translate(.5 .7)"/><path d="${d}" stroke="${c.chalk}" stroke-width="1.3" stroke-dasharray="5 3.4" stroke-linecap="round"/></svg>`;
// a round rubber stamp with lettering on a circle
function seal(o,L,c,uid){const [a,b]=K.initials(o),y=(o.date||'').slice(0,4),en=o.lang==='en';
  return `<svg class="kraft-seal" viewBox="0 0 120 120"><defs><path id="kp${uid}" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0"/></defs>
   <g fill="none" stroke="currentColor"><circle cx="60" cy="60" r="56" stroke-width="2.4"/><circle cx="60" cy="60" r="51.5" stroke-width=".9"/><circle cx="60" cy="60" r="33" stroke-width=".9"/><circle cx="60" cy="60" r="30" stroke-width=".5" stroke-dasharray="1 2"/></g>
   <text font-family="'IM Fell English SC',serif" font-size="9" fill="currentColor"><textPath href="#kp${uid}" startOffset="0" textLength="272" lengthAdjust="spacing">${esc(ev(o,L).toUpperCase())} ✦ ${esc(y)} ✦ ${en?'WITH LOVE':'KASIH'} ✦</textPath></text>
   <text x="60" y="68" text-anchor="middle" font-family="'IM Fell English SC',serif" font-size="24" fill="currentColor">${esc(a)}<tspan font-size="14" dy="-2"> &amp; </tspan><tspan dy="2">${esc(b)}</tspan></text></svg>`}
let n=0;
FAMILY({key:'kraft',name:'Kraft',meaning:'Twine-tied parcel',
  blurb:'A kraft-paper wrap with stitched edges, tied with jute twine and a sprig of baby\'s breath. Slip the bow and the flaps fold open.',
  fonts:{d:"'IM Fell English SC', serif",s:"'Mrs Saint Delafield', cursive",b:"'IM Fell English', serif"},ms:1550,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u=++n;
    return `<section class="page pg-kraft" style="--chalk:${c.chalk}"><div class="kraft-card">${stitch('M9 9H351V641H9Z',c,360,650)}
     <div class="kraft-stamp kraft-round reveal">${seal(o,L,c,'p'+u)}</div>
     <h1 class="kraft-names reveal d1">${esc(n1)}<i>&amp;</i>${esc(n2)}</h1>
     <div class="kraft-stamp kraft-box reveal d2"><small>${esc(fmtDate(o.date,o.lang).split(',')[0])}</small><b>${esc(fmtShort(o.date).replace(/\./g,' · '))}</b><span>${esc(fmtTime(o.start,o.lang))}</span></div>
     <p class="kraft-venue reveal d3">${esc(o.venue)}</p>
     <div class="kraft-tie"><i class="kraft-strand"></i><i class="kraft-strand b"></i>${gyp(5,c)}${gyp(9,c).replace("kraft-gyp","kraft-gyp b")}${BOW(c)}</div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u=++n;
    return `<div class="cover cv-kraft" style="--chalk:${c.chalk}"><div class="kraft-table"></div>
     <div class="kraft-wrap">
      <div class="kraft-top kraft-paper">${stitch('M9 368V9H334V368',c,343,368)}
       <p class="kraft-stamp kraft-k">${ev(o,L)}</p>
       <div class="kraft-stamp kraft-round">${seal(o,L,c,u)}</div>
       <p class="kraft-names">${esc(n1)}<i>&amp;</i>${esc(n2)}</p></div>
      <div class="kraft-botw"><div class="kraft-bot kraft-paper">${stitch('M9 308V24L171.5 9L334 24V308Z',c,343,317)}
       <div class="kraft-stamp kraft-box"><small>${esc(fmtDate(o.date,o.lang).split(',')[0])}</small><b>${esc(fmtShort(o.date).replace(/\./g,' · '))}</b><span>${esc(o.venue)}</span></div>
       ${guest?`<p class="kraft-to">${L.dear}</p><p class="kraft-guest">${esc(guest)}</p>`:''}
       <p class="kraft-hint">${en?'Slip the bow to open':'Leraikan reben untuk membuka'}</p></div></div>
      <div class="kraft-tie"><i class="kraft-strand"></i><i class="kraft-strand b"></i>${gyp(3,c)}${gyp(8,c).replace('kraft-gyp','kraft-gyp b')}
       <${tag} class="kraft-knot" ${attr} aria-label="${L.open}">${BOW(c)}</${tag}></div>
     </div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty("--chalk",th.c.chalk);$$('.sec h2',el).forEach(h=>{h.innerHTML=`<span class="kraft-hs">${h.innerHTML}</span>`})},
  themes:[
    {k:'asli',n:'Asli',desc:'Natural kraft, jute twine, red stamp',c:{ground:'#e8e2d6',sheet:'#c49c6c',ink:'#2e231a',accent:'#7c2a22',gold:'#eadfc6',pagefg:'#3a2e24',chalk:'#fbf7ef',stem:'#7d8a62',gyc:'#e6dcc0',line:'rgba(46,35,26,.28)'}},
    {k:'merah',n:'Merah',desc:'Kraft with red baker\'s twine',c:{ground:'#f0ebe3',sheet:'#c8a275',ink:'#2c2119',accent:'#9b2a2a',gold:'#b8322e',pagefg:'#3a2e24',chalk:'#fbf7ef',stem:'#7d8a62',gyc:'#e6dcc0',line:'rgba(44,33,25,.28)'}},
    {k:'hijau',n:'Hijau',desc:'Kraft on sage linen, green ink',c:{ground:'#cbd2c0',sheet:'#c19a6c',ink:'#2a2a1e',accent:'#38553a',gold:'#e9dfc6',pagefg:'#2a2f25',chalk:'#fbf7ef',stem:'#6e7f55',gyc:'#e3dcc2',line:'rgba(42,42,30,.28)'}},
    {k:'jambu',n:'Jambu',desc:'Kraft with blush twine',c:{ground:'#ecd9d4',sheet:'#c79f74',ink:'#33241c',accent:'#9a3f52',gold:'#e9c3c5',pagefg:'#3a2a26',chalk:'#fff8f4',stem:'#7d8a62',gyc:'#efd9d6',line:'rgba(51,36,28,.28)'}},
    {k:'putih',n:'Putih',desc:'White kraft on a walnut table',c:{ground:'#6e5641',sheet:'#ebe2cf',ink:'#3a2c20',accent:'#7a4a2a',gold:'#b89a6a',pagefg:'#f6efe4',chalk:'#fffdf8',stem:'#7d8a62',gyc:'#e9e0c8',line:'rgba(58,44,32,.22)'}},
    {k:'gelap',n:'Gelap',desc:'Dark kraft on slate, navy stamp',c:{ground:'#2e3336',sheet:'#ad865c',ink:'#24190f',accent:'#1c2f4a',gold:'#efe6d2',pagefg:'#ece6da',chalk:'#fbf7ef',stem:'#6e7f55',gyc:'#e6dcc0',line:'rgba(36,25,15,.3)'}},
    {k:'nila',n:'Nila',desc:'Kraft on indigo, cream twine',c:{ground:'#1f2a3d',sheet:'#c0976a',ink:'#24201c',accent:'#24365c',gold:'#f0e8d6',pagefg:'#e9e6df',chalk:'#fbf7ef',stem:'#6e7f55',gyc:'#e6dcc0',line:'rgba(36,32,28,.3)'}},
    {k:'hitam',n:'Hitam',desc:'Black kraft with white ink',c:{ground:'#d8d1c5',sheet:'#2b2724',ink:'#eee6d6',accent:'#dcbf90',gold:'#d8c7a3',pagefg:'#2b2724',chalk:'#fbf7ef',stem:'#8c9a70',gyc:'#d8cfb6',line:'rgba(238,230,214,.22)'}},
  ]});
