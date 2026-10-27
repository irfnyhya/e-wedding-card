/* kampung: a Malay stilt house at golden hour, in layered paper-cut planes: sky and sun, hazy hills, a tree
   line, the house with its crossed gable boards and carved fascia among coconut palms, paddy terraces,
   foreground fronds. Cover: touching the scene lets the planes drift apart in depth as the sky brightens.
   Page: the house small with pelita lamps lining the path, names above. Skin: cards framed like carved
   wooden fascia boards (papan cantik). */
let uid=0;
const f1=v=>(+v).toFixed(1);
// a coconut palm: curved trunk with rings, a crown of drooping fronds made of leaflets
function palm(x,y,h,lean,s,R){const tx=x+lean,ty=y-h;let d=`M${f1(x-4*s)} ${y}Q${f1(x+lean*.2-3*s)} ${f1(y-h*.55)} ${f1(tx-1.6*s)} ${f1(ty)}L${f1(tx+1.6*s)} ${f1(ty)}Q${f1(x+lean*.2+3*s)} ${f1(y-h*.55)} ${f1(x+4*s)} ${y}Z`;
  let fr='';for(const a of [-172,-148,-122,-96,-66,-38,-12,8]){const A=(a+(R()-.5)*10)*Math.PI/180,L=(44+R()*14)*s,ex=tx+Math.cos(A)*L,ey=ty+Math.sin(A)*L*.6+L*.38,cx=tx+Math.cos(A)*L*.5,cy=ty+Math.sin(A)*L*.5-6*s;
    fr+=`M${f1(tx)} ${f1(ty)}Q${f1(cx)} ${f1(cy)} ${f1(ex)} ${f1(ey)}`;
    for(let i=1;i<10;i++){const t=i/10,u=1-t,px=u*u*tx+2*u*t*cx+t*t*ex,py=u*u*ty+2*u*t*cy+t*t*ey,ll=(1-t*.55)*11*s;fr+=`M${f1(px)} ${f1(py)}l${f1(Math.cos(A+1.9)*ll)} ${f1(Math.abs(Math.sin(A+1.9))*ll+3*s)}M${f1(px)} ${f1(py)}l${f1(Math.cos(A-1.9)*ll)} ${f1(Math.abs(Math.sin(A-1.9))*ll+3*s)}`}}
  return `<path d="${d}"/><path d="${fr}" class="kampung-frond" stroke-width="${f1(1.3*s)}"/><circle cx="${f1(tx)}" cy="${f1(ty+3*s)}" r="${f1(4*s)}"/>`}
// the rumah kampung: stilts, verandah, stair, main gable with crossed boards and pendant fascia
function house(){const st=[154,178,202,226,250,274,298].map(x=>`M${x} 544h4.4v58h-4.4z`).join('');
  const pend=(x0,y0,x1,y1,n)=>Array.from({length:n},(_,i)=>{const t=(i+.5)/n,x=x0+(x1-x0)*t,y=y0+(y1-y0)*t;return `M${f1(x-3)} ${f1(y)}q3 7 6 0z`}).join('');
  return `<g class="kampung-house">
   <path d="${st}"/><path d="M146 540H306V547H146Z"/>
   <path d="M196 490H302V540H196Z"/><path d="M150 512H196V540H150Z"/>
   <path d="M144 514L170 482H200V514Z"/>
   <path d="M180 494L248 420L316 494Z"/>
   <path d="M174 500L252 414M322 500L244 414" class="kampung-board"/>
   <path d="${pend(184,494,248,425,9)}${pend(248,425,312,494,9)}${pend(146,514,170,486,4)}"/>
   <path d="M140 602L162 547H170L148 602Z"/><path d="M126 602L148 547H154L132 602Z"/>
   <path d="M150 512H196V515H150Z"/>
  </g>
  <g class="kampung-glow"><path d="M211 500h15v26h-15zM272 500h15v26h-15z"/><path d="M243 501h10v39h-10z"/>
   <path d="M215 480L248 446L281 480Z" class="kampung-gab"/>
   ${Array.from({length:6},(_,i)=>`<path d="M${157+i*6.6} 520h3v16h-3z"/>`).join('')}
   ${Array.from({length:5},(_,i)=>`<path d="M${f1(139.5+i*3.6)} ${f1(592-i*10)}h${f1(10-0)}v2h-10z"/>`).join('')}</g>
  <g class="kampung-house"><path d="M248 450V478M232 478L248 462L264 478M222 480H274" class="kampung-slat"/><path d="M218.5 500v26M279.5 500v26M211 513h15M272 513h15" class="kampung-slat"/></g>`}
function layers(){const id=++uid,R=rng(4);
  const grass=Array.from({length:70},(_,i)=>{const x=i*5.8-4,h=18+R()*30,l=(R()-.5)*14;return `M${f1(x)} 760L${f1(x+l)} ${f1(760-h-50)}L${f1(x+3)} 760Z`}).join('');
  const rows=(y0,amp,n)=>Array.from({length:n},(_,i)=>{const y=y0+i*5;return `M-10 ${y}C90 ${y-amp} 200 ${y+amp} 400 ${y-amp*.5}`}).join('');
  const sv=(k,body)=>`<span class="kampung-l ${k}"><svg viewBox="0 0 390 760" preserveAspectRatio="xMidYMax slice">${body}</svg></span>`;
  return sv('k1',`<path d="M-20 300C20 288 70 290 110 298C150 290 180 296 200 302C150 308 40 310 -20 300Z" class="kampung-cloud"/><path d="M230 250C270 240 330 242 370 252C390 246 420 250 430 256C380 262 260 262 230 250Z" class="kampung-cloud"/><circle cx="238" cy="408" r="44" class="kampung-sun"/>`)
   +sv('k2',`<path d="M0 470C40 440 80 430 120 448C160 466 200 420 250 416C300 412 340 446 390 438V760H0Z" class="kampung-hill"/>`)
   +sv('k3',`<path d="M0 506C20 494 30 500 44 492C58 484 70 496 86 490C100 484 118 498 136 494C160 488 172 500 196 496C224 490 240 502 266 496C290 490 310 500 332 494C352 488 372 500 390 494V760H0Z" class="kampung-tree"/><g class="kampung-tree">${palm(30,500,70,-8,.55,R)}${palm(110,496,58,6,.48,R)}${palm(330,498,76,10,.58,R)}${palm(372,500,52,-6,.45,R)}</g>`)
   +sv('k4',`<path d="M0 600C80 594 160 598 230 596C300 594 350 600 390 598V760H0Z" class="kampung-hs"/><g transform="translate(225 602) scale(1.16) translate(-225 -602)">${house()}</g><g class="kampung-hs">${palm(78,604,250,-22,1,R)}${palm(346,604,214,18,.9,R)}${palm(112,604,170,14,.72,R)}</g>`)
   +sv('k5',`<path d="M0 628C90 616 190 640 270 626C330 616 370 622 390 620V760H0Z" class="kampung-pad"/><path d="${rows(636,6,6)}" class="kampung-row"/><path d="M0 668C110 656 210 680 300 664C350 656 380 660 390 660V760H0Z" class="kampung-pad b"/><path d="${rows(676,8,7)}" class="kampung-row"/>`)
   +sv('k6',`<path d="${grass}" class="kampung-fg"/><g class="kampung-fg">${palm(-30,800,140,40,1.15,R)}</g><path d="M0 730C80 720 300 722 390 730V760H0Z" class="kampung-fg"/>`)}
const FASCIA=c=>{const w=c.wood||'#6b4a2a';return svgUriSq(`<svg ${NS} width="32" height="24" viewBox="0 0 32 24"><path d="M0 0H32V8H0Z" fill="${w}"/><path d="M0 8H16V12Q16 22 8 22Q0 22 0 12ZM16 8H32V12Q32 22 24 22Q16 22 16 12Z" fill="${w}"/><circle cx="8" cy="14" r="2.6" fill="${c.sheet}"/><circle cx="24" cy="14" r="2.6" fill="${c.sheet}"/><path d="M16 9.5V16" stroke="${c.sheet}" stroke-width="1.2"/><circle cx="16" cy="4" r="1.3" fill="${c.sheet}"/><circle cx="0" cy="4" r="1.3" fill="${c.sheet}"/><circle cx="32" cy="4" r="1.3" fill="${c.sheet}"/><path d="M0 1.5H32" stroke="#000" stroke-opacity=".25" stroke-width=".6"/></svg>`)};
const vars=c=>`--kp-fascia:${FASCIA(c)};--wood:${c.wood||'#6b4a2a'}`;
function lamps(){let s='';for(const [t,k] of [[0,.55],[.33,.72],[.66,.88],[1,1.05]]){const y=606+t*48;
  for(const x of [140-t*58,166+t*70])s+=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${k})"><circle cx="0" cy="-34" r="13" class="kampung-halo"/><path d="M-.9 0V-30h1.8V0Z" class="kampung-pole"/><path d="M-4 -30h8l-1.4 -6h-5.2z" class="kampung-pole"/><path d="M0 -37c-2.6-3-2.6-6 0-10c2.6 4 2.6 7 0 10z" class="kampung-flame"/></g>`}
  return s}
FAMILY({key:'kampung',name:'Rumah Kampung',meaning:'Village stilt house',
  blurb:'A Malay stilt house at golden hour among coconut palms and paddy, in layered paper cut; touch it and the planes drift apart as the sky brightens.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',R=rng(9);
    return `<section class="page pg-kampung" style="${vars(c)}"><i class="kampung-sky"></i><i class="kampung-paper"></i>
     <p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <p class="kampung-date reveal d1">${esc(fmtDate(o.date,o.lang))}</p>
     <div class="kampung-mini reveal d2"><svg viewBox="70 370 300 290"><path d="M60 596C160 590 260 594 380 590V670H60Z" class="kampung-hs"/><path d="M140 602H160L250 670H70Z" class="kampung-path"/>
      ${house()}<g class="kampung-hs">${palm(104,604,170,-14,.66,R)}${palm(338,604,190,12,.72,R)}</g>${lamps()}</svg></div>
     <div class="kampung-ground reveal d3"><p class="kampung-ven">${esc(o.venue)}</p><p class="kampung-time">${en?'from':'jam'} ${esc(fmtTime(o.start,o.lang))}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-kampung" style="${vars(c)}"><i class="kampung-sky"></i><i class="kampung-bright"></i>
     <${tag} class="kampung-scene" ${attr} aria-label="${L.open}">${layers()}</${tag}><i class="kampung-paper"></i>
     <div class="kampung-head"><p class="kampung-k">${ev(o,L)}</p><p class="kampung-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="kampung-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <div class="kampung-foot">${guest?`<p class="kampung-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="kampung-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.cssText+=';'+vars(th.c)},
  themes:[
    {k:'senja',n:'Senja',desc:'Violet dusk, amber sun, deep green',c:{ground:'#3a2a4c',sheet:'#fbf3e4',ink:'#2b241e',accent:'#22331f',gold:'#f2b45a',pagefg:'#fdf0d8',wood:'#5e3f24'}},
    {k:'jingga',n:'Jingga',desc:'Orange sunset, umber silhouettes',c:{ground:'#6b2f1e',sheet:'#fdf3e6',ink:'#2e2018',accent:'#2b2016',gold:'#f6a94a',pagefg:'#fff0dc',wood:'#6a3f22'}},
    {k:'merah',n:'Merah',desc:'Red dusk over the paddy',c:{ground:'#561a26',sheet:'#fbf1e6',ink:'#2d1f1c',accent:'#2a1b1c',gold:'#f09c58',pagefg:'#fde9dc',wood:'#5c2e22'}},
    {k:'biru',n:'Biru',desc:'Blue hour with lamplight',c:{ground:'#1b2b4e',sheet:'#f6f3ea',ink:'#1e2432',accent:'#141d2b',gold:'#e8c07a',pagefg:'#ece6d6',wood:'#4a3a2c'}},
    {k:'hijau',n:'Hijau',desc:'Green evening, soft gold',c:{ground:'#24412f',sheet:'#f7f4e6',ink:'#22281f',accent:'#16261a',gold:'#f0cf78',pagefg:'#f2ecd4',wood:'#5a4426'}},
    {k:'ungu',n:'Ungu',desc:'Plum sky and a pink sun',c:{ground:'#372451',sheet:'#fbf3f3',ink:'#2a2230',accent:'#211a2c',gold:'#f2b49c',pagefg:'#f7e8ee',wood:'#5a3a3a'}},
    {k:'pagi',n:'Pagi',desc:'Pale morning sky, fresh greens',c:{ground:'#8fb7cc',sheet:'#fbfaf4',ink:'#22302a',accent:'#2f4a32',gold:'#fbe1a0',pagefg:'#1d2a24',wood:'#7a5634'}},
    {k:'emas',n:'Emas',desc:'Golden-hour amber, warm brown',c:{ground:'#7a4c18',sheet:'#fff7e6',ink:'#2f2412',accent:'#33240f',gold:'#ffd98a',pagefg:'#fff3d8',wood:'#6e4a22'}},
  ]});
