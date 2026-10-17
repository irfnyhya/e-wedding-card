/* kerongsang: the front of a kebaya in fine voile with embroidered lace edges, fastened with a set of three
   gold filigree brooches (one kerongsang ibu, two anak) linked by fine chains.
   Cover: touching the brooch set lifts it away and the two lace panels part. Page: a lace border with a
   single brooch above the names. Skin: lace-edged cards with brooch bullets. */
let uid=0;
const f1=v=>(+v).toFixed(1);
// the neckline edge of the left panel: a cubic from the left edge down to the centre seam
const P=[[-6,150],[74,158],[168,226],[195,306]];
const bz=t=>{const u=1-t;return[0,1].map(k=>u*u*u*P[0][k]+3*u*u*t*P[1][k]+3*u*t*t*P[2][k]+t*t*t*P[3][k])};
const bzd=t=>{const u=1-t;return[0,1].map(k=>3*u*u*(P[1][k]-P[0][k])+6*u*t*(P[2][k]-P[1][k])+3*t*t*(P[3][k]-P[2][k]))};
// points every ~step px along the neckline then down the seam, with the normal pointing into the voile
function edgePts(step){const pts=[];let len=0,prev=bz(0);
  for(let i=0;i<=400;i++){const t=i/400,p=bz(t);len+=Math.hypot(p[0]-prev[0],p[1]-prev[1]);prev=p;
    if(len>=step||i===0){len=0;const d=bzd(t),L=Math.hypot(d[0],d[1]);pts.push([p[0],p[1],-d[1]/L,d[0]/L])}}
  for(let y=P[3][1]+step;y<=1010;y+=step)pts.push([195,y,-1,0]);
  return pts}
const at=(p,o)=>[p[0]+p[2]*o,p[1]+p[3]*o];
const sprig=(x,y,r,a)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})">${[0,72,144,216,288].map(t=>`<ellipse cy="-${f1(r)}" rx="${f1(r*.5)}" ry="${f1(r)}" transform="rotate(${t})"/>`).join('')}</g>`;
function panel(){const id=++uid,E=edgePts(7);
  const shape=`M${P[0][0]} ${P[0][1]}C${P[1].join(' ')} ${P[2].join(' ')} ${P[3].join(' ')}L195 1010H-10V${P[0][1]}Z`;
  let sc='',holes='',fl='',vine1='',vine2='',lf='';
  E.forEach((p,i)=>{if(i){const q=E[i-1],m=at([(p[0]+q[0])/2,(p[1]+q[1])/2,p[2],p[3]],-5.2);sc+=`M${f1(q[0])} ${f1(q[1])}Q${f1(m[0])} ${f1(m[1])} ${f1(p[0])} ${f1(p[1])}`}
    const h=at(p,5.5);if(i%2===0)holes+=`<circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="1.5"/>`;
    const a=at(p,3),b=at(p,20);vine1+=`${i?'L':'M'}${f1(a[0])} ${f1(a[1])}`;vine2+=`${i?'L':'M'}${f1(b[0])} ${f1(b[1])}`;
    if(i%4===2){const f=at(p,12.5);fl+=sprig(f[0],f[1],2.6,i*17)}
    if(i%4===0&&i){const f=at(p,12.5),ang=Math.atan2(p[3],p[2])*180/Math.PI;lf+=`<path d="M0 0q3-4 0-8q-3 4 0 8z" transform="translate(${f1(f[0])} ${f1(f[1])}) rotate(${f1(ang+90+50)})"/><path d="M0 0q3-4 0-8q-3 4 0 8z" transform="translate(${f1(f[0])} ${f1(f[1])}) rotate(${f1(ang+90-50)})"/>`}});
  // scattered sulam flowers on the voile
  const R=rng(5);let scat='';for(let i=0;i<52;i++){const x=10+R()*175,y=200+R()*800;const e=E.reduce((m,p)=>Math.min(m,Math.hypot(p[0]-x,p[1]-y)),1e9);if(e<34)continue;scat+=sprig(x,y,2.2+R()*1.2,R()*72)}
  return `<svg class="kerongsang-psvg" viewBox="0 0 195 1000" preserveAspectRatio="none"><defs><clipPath id="krc${id}"><path d="${shape}"/></clipPath></defs>
   <path d="${sc}" class="kerongsang-scal"/>
   <path d="${shape}" class="kerongsang-voile"/>
   <g clip-path="url(#krc${id})"><g class="kerongsang-scat">${scat}</g>
    
    <path d="${vine1}" class="kerongsang-v1"/><path d="${vine2}" class="kerongsang-v2"/><g class="kerongsang-holes">${holes}</g><g class="kerongsang-fl">${fl}</g><g class="kerongsang-lf">${lf}</g></g>
   <path d="${sc}" class="kerongsang-scl"/></svg>`}
// gold filigree brooches
const gem=(cx,cy,r,id,cls='kerongsang-stone')=>`<circle cx="${cx}" cy="${cy}" r="${f1(r)}" fill="url(#krs${id})" class="${cls}"/><path d="M${f1(cx-r*.55)} ${f1(cy-r*.2)}L${cx} ${f1(cy-r*.62)}L${f1(cx+r*.55)} ${f1(cy-r*.2)}L${cx} ${f1(cy+r*.5)}Z" class="kerongsang-facet"/><circle cx="${f1(cx-r*.32)}" cy="${f1(cy-r*.36)}" r="${f1(r*.2)}" class="kerongsang-glint"/>`;
function defs(id){return `<defs><radialGradient id="krg${id}" cx=".35" cy=".3" r=".8"><stop offset="0" style="stop-color:color-mix(in srgb,var(--gold) 40%,#fff)"/><stop offset=".5" style="stop-color:var(--gold)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--gold) 50%,#000)"/></radialGradient>
  <radialGradient id="krs${id}" cx=".38" cy=".32" r=".75"><stop offset="0" style="stop-color:color-mix(in srgb,var(--gem,var(--accent)) 40%,#fff)"/><stop offset=".45" style="stop-color:var(--gem,var(--accent))"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--gem,var(--accent)) 45%,#000)"/></radialGradient>
  <radialGradient id="krw${id}" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#e9eef2"/><stop offset="1" stop-color="#9aa6ae"/></radialGradient></defs>`}
function ibu(){const id=++uid;const H=t=>[50+2.85*16*Math.pow(Math.sin(t),3),46-2.85*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))];
  const heart=k=>{let d='';for(let i=0;i<=72;i++){const t=i/72*Math.PI*2,[x,y]=H(t);d+=`${i?'L':'M'}${f1(50+(x-50)*k)} ${f1(46+(y-46)*k)}`}return d+'Z'};
  const beads=k=>Array.from({length:40},(_,i)=>{const t=i/40*Math.PI*2,[x,y]=H(t);return `<circle cx="${f1(50+(x-50)*k)}" cy="${f1(46+(y-46)*k)}" r="1.15"/>`}).join('');
  const stones=Array.from({length:10},(_,i)=>{const t=(i+.5)/10*Math.PI*2,[x,y]=H(t);return gem(+f1(50+(x-50)*.68),+f1(46+(y-46)*.68),3.3,id,'kerongsang-wst')}).join('').replaceAll(`url(#krs${id})`,`url(#krw${id})`);
  const scr=Array.from({length:12},(_,i)=>`<path d="M50 31c5-6 13-6 15 0s-4 9-8 6 0-6 3-4" transform="rotate(${i*30} 50 46)" class="kerongsang-fil"/>`).join('')+Array.from({length:12},(_,i)=>`<path d="M50 19q4 5 0 9q-4-4 0-9z" transform="rotate(${i*30+15} 50 46)" class="kerongsang-fil2"/>`).join('');
  return `<svg viewBox="-4 -16 108 116">${defs(id)}<path d="M45-4q5-5 10 0l-1.5 6h-7z" fill="url(#krg${id})"/><circle cx="50" cy="-6" r="2.4" fill="url(#krg${id})"/>
   <g class="kerongsang-ball">${Array.from({length:44},(_,i)=>{const t=i/44*Math.PI*2,[x,y]=H(t);return `<circle cx="${f1(50+(x-50)*1.12)}" cy="${f1(46+(y-46)*1.12)}" r="1.9" fill="url(#krg${id})"/>`}).join('')}</g><path d="${heart(1.06)}" fill="url(#krg${id})" class="kerongsang-rim"/><path d="${heart(.95)}" class="kerongsang-in"/><clipPath id="krh${id}"><path d="${heart(.95)}"/></clipPath><pattern id="krp${id}" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="3.1" class="kerongsang-mesh"/><circle cx="0" cy="0" r=".9" class="kerongsang-meshd"/><circle cx="9" cy="0" r=".9" class="kerongsang-meshd"/><circle cx="0" cy="9" r=".9" class="kerongsang-meshd"/><circle cx="9" cy="9" r=".9" class="kerongsang-meshd"/></pattern><rect x="-10" y="-10" width="120" height="120" fill="url(#krp${id})" clip-path="url(#krh${id})"/><g class="kerongsang-bead">${beads(.99)}</g>
   <g class="kerongsang-filg">${scr}</g>${stones}
   <circle cx="50" cy="46" r="15" fill="url(#krg${id})" class="kerongsang-rim"/><g class="kerongsang-bead">${K.ring(18,13.2,50,46).map(([x,y])=>`<circle cx="${f1(x)}" cy="${f1(y)}" r=".9"/>`).join('')}</g>
   ${gem(50,46,10.5,id)}</svg>`}
function anak(){const id=++uid;const pet=K.ring(8,15,30,30).map(([x,y,a])=>`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="4.4" ry="7.4" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(x)} ${f1(y)})" fill="url(#krg${id})" class="kerongsang-rim"/>`).join('');
  const st=K.ring(8,15,30,30).map(([x,y])=>gem(+f1(x),+f1(y),2.5,id,'kerongsang-wst')).join('').replaceAll(`url(#krs${id})`,`url(#krw${id})`);
  return `<svg viewBox="0 0 60 60">${defs(id)}<path d="${K.scallop(16,24,3,30,30)}" class="kerongsang-filo"/>${pet}${st}<circle cx="30" cy="30" r="9.5" fill="url(#krg${id})" class="kerongsang-rim"/>
   <g class="kerongsang-bead">${K.ring(14,8.2,30,30).map(([x,y])=>`<circle cx="${f1(x)}" cy="${f1(y)}" r=".7"/>`).join('')}</g>${gem(30,30,6.2,id)}</svg>`}
const chain=(h)=>`<svg class="kerongsang-ch" viewBox="0 0 60 ${h}" preserveAspectRatio="none"><path d="M22 0C4 ${h*.35} 6 ${h*.7} 24 ${h}M38 0C56 ${h*.35} 54 ${h*.7} 36 ${h}" class="kerongsang-chain"/><path d="M30 0V${h}" class="kerongsang-chain2"/></svg>`;
const LACE=c=>svgUriSq(`<svg ${NS} width="28" height="16" viewBox="0 0 28 16"><path d="M0 0H28V9Q24.5 16 21 9Q17.5 16 14 9Q10.5 16 7 9Q3.5 16 0 9Z" fill="${c.sheet}"/><path d="M0 9Q3.5 16 7 9Q10.5 16 14 9Q17.5 16 21 9Q24.5 16 28 9" fill="none" stroke="${c.accent}" stroke-width=".7"/><path d="M0 2.5H28" stroke="${c.accent}" stroke-width=".5" opacity=".7"/><circle cx="7" cy="6" r="1.4" fill="${c.ground}"/><circle cx="21" cy="6" r="1.4" fill="${c.ground}"/><g fill="none" stroke="${c.accent}" stroke-width=".55"><circle cx="14" cy="6" r="2"/><path d="M14 2.6v-1M14 9.4v1M10.6 6h-1M17.4 6h1"/></g></svg>`);
const LACEV=c=>svgUriSq(`<svg ${NS} width="16" height="28" viewBox="0 0 16 28"><path d="M16 0V28H7Q0 24.5 7 21Q0 17.5 7 14Q0 10.5 7 7Q0 3.5 7 0Z" fill="${c.sheet}"/><path d="M7 0Q0 3.5 7 7Q0 10.5 7 14Q0 17.5 7 21Q0 24.5 7 28" fill="none" stroke="${c.accent}" stroke-width=".7"/><path d="M13.5 0V28" stroke="${c.accent}" stroke-width=".5" opacity=".7"/><circle cx="10" cy="7" r="1.4" fill="${c.ground}"/><circle cx="10" cy="21" r="1.4" fill="${c.ground}"/><g fill="none" stroke="${c.accent}" stroke-width=".55"><circle cx="10" cy="14" r="2"/></g></svg>`);
const vars=c=>`--kr-lace:${LACE(c)};--kr-lacev:${LACEV(c)};--gem:${c.gem||c.accent}${c.nm?';--kr-nm:'+c.nm:''}`;
const BUL=c=>svgUriSq(`<svg ${NS} viewBox="0 0 60 60"><g fill="${c.gold}">${K.ring(8,15,30,30).map(([x,y,a])=>`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="4.6" ry="7.6" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(x)} ${f1(y)})"/>`).join('')}<circle cx="30" cy="30" r="10"/></g><circle cx="30" cy="30" r="6.5" fill="${c.gem||c.accent}"/><circle cx="28" cy="28" r="1.8" fill="#fff" opacity=".8"/></svg>`);
FAMILY({key:'kerongsang',name:'Kerongsang',meaning:'Kebaya brooches',
  blurb:'The lace front of a kebaya fastened with three linked gold filigree brooches; touch them and the brooches lift as the lace panels part.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-kerongsang" style="${vars(c)}"><div class="kerongsang-sheet"><i class="kerongsang-ed t"></i><i class="kerongsang-ed b"></i><i class="kerongsang-ed l"></i><i class="kerongsang-ed r"></i>
     <div class="kerongsang-one reveal">${ibu()}</div>
     <p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="kerongsang-rule reveal d2"><i></i><b>${anak()}</b><i></i></div>
     <p class="kerongsang-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="kerongsang-ven reveal d3">${esc(o.venue)}<br><span>${en?'from':'jam'} ${esc(fmtTime(o.start,o.lang))}</span></p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',pn=panel();
    return `<div class="cover cv-kerongsang" style="${vars(c)}"><div class="kerongsang-under"></div><i class="kerongsang-tex"></i>
     <div class="kerongsang-stage"><div class="kerongsang-pan l">${pn}</div><div class="kerongsang-pan r">${pn}</div>
      <div class="kerongsang-head"><p class="kerongsang-k">${ev(o,L)}</p><p class="kerongsang-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="kerongsang-d">${esc(fmtDate(o.date,o.lang))}</p></div>
      <${tag} class="kerongsang-set" ${attr} aria-label="${L.open}"><i class="kerongsang-b ibu">${ibu()}</i>${chain(84)}<i class="kerongsang-b anak">${anak()}</i>${chain(72)}<i class="kerongsang-b anak">${anak()}</i></${tag}></div>
     <div class="kerongsang-foot">${guest?`<p class="kerongsang-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="kerongsang-hint">${en?'Touch the kerongsang to open':'Sentuh kerongsang untuk membuka'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=th.c;el.style.cssText+=';'+vars(c)+';--kr-bul:'+BUL(c);
    $$('.sec h2',el).forEach(h=>h.insertAdjacentHTML('afterbegin','<i class="kerongsang-hb"></i>'))},
  themes:[
    {k:'merah',n:'Merah',desc:'White voile, crimson lining, ruby brooches',c:{ground:'#6a1424',sheet:'#fcf6ee',ink:'#2e221e',accent:'#a3233b',gold:'#d2a64c',pagefg:'#f8e8da'}},
    {k:'hijau',n:'Hijau',desc:'White voile on emerald, emerald stones',c:{ground:'#11463a',sheet:'#f6f8f1',ink:'#1f2a24',accent:'#1c6a50',gold:'#d4ab55',pagefg:'#eaf1e6'}},
    {k:'biru',n:'Biru',desc:'Pale-blue voile, sapphire lining',c:{ground:'#1b2d5a',sheet:'#f1f5fb',ink:'#1d2436',accent:'#3557a0',gold:'#cfae62',pagefg:'#e9eef8'}},
    {k:'jambu',n:'Jambu',desc:'Blush voile, rose lining, pink stones',c:{ground:'#a9536a',sheet:'#fdf1f3',ink:'#3c2a2e',accent:'#b84d68',gold:'#d3a65a',pagefg:'#fff3f2'}},
    {k:'kunyit',n:'Kunyit',desc:'Cream voile on turmeric gold',c:{ground:'#8a5a10',sheet:'#fff9e8',ink:'#3a2c14',accent:'#a5671a',gold:'#e0b54e',pagefg:'#fff3d6',gem:'#2f6d55'}},
    {k:'ungu',n:'Ungu',desc:'Lilac voile, plum lining, amethysts',c:{ground:'#3c2150',sheet:'#f8f2fb',ink:'#2e2533',accent:'#6d3a86',gold:'#d4ab5d',pagefg:'#f2e8f6'}},
    {k:'hitam',n:'Hitam',desc:'Ivory voile on black, garnet brooches',c:{ground:'#141213',sheet:'#f6efe3',ink:'#2a231d',accent:'#7a1d2c',gold:'#d0a650',pagefg:'#efe6d6'}},
    {k:'pic',n:'Pic',desc:'Peach voile, coral lining, light and soft',c:{ground:'#dfa58b',sheet:'#fff7f1',ink:'#3b2620',accent:'#c0603f',gold:'#c39a4f',pagefg:'#3b2620',nm:'#7a3524'}},
  ]});
