/* gerbang: a carved timber palace gateway, its awan larat scrolls and pucuk rebung borders picked out in gold leaf,
   opening onto a sunlit water garden (Childe Hassam, The Water Garden, public domain). The names sit on the carved name board over the arch.
   Cover: tap "Buka Jemputan" and you walk through the arch into the garden.
   Page: the garden seen through the arch, the names below. Skin: dark timber cards edged with gilt pucuk rebung. */
let gbN=0;
const f2=n=>n.toFixed(2);
// a carved spiral (awan larat): a tapering coil with a leaf at its tail
function gbCoil(cx,cy,r,dir,a0){let d='';const n=26,turns=1.35;
  for(let i=0;i<=n;i++){const t=i/n,a=a0+dir*t*turns*Math.PI*2,rr=r*(1-t*.78);d+=(i?'L':'M')+f2(cx+Math.cos(a)*rr)+' '+f2(cy+Math.sin(a)*rr)}
  const lx=cx+Math.cos(a0)*r,ly=cy+Math.sin(a0)*r,ang=a0*180/Math.PI+90*dir;
  return `<path d="${d}" fill="none" stroke-width="${f2(r*.2)}" stroke-linecap="round"/><path d="M0 0C${f2(r*.35)} ${f2(-r*.25)} ${f2(r*.55)} ${f2(-r*.7)} 0 ${f2(-r*1.05)}C${f2(-r*.55)} ${f2(-r*.7)} ${f2(-r*.35)} ${f2(-r*.25)} 0 0Z" transform="translate(${f2(lx)} ${f2(ly)}) rotate(${f2(ang)})"/>`}
// the spandrel carving for the left half (the right is mirrored): a bud at the crown, a stem running down the arch into coils
const gbSpandrel=()=>`<path d="M50 40.5C46 42.5 41 43 36.5 42.8C31 42.6 26.5 44.5 24 48.5C21.5 52.5 20.5 56 18.5 59" fill="none" stroke-width=".9" stroke-linecap="round"/>
  ${gbCoil(30,46.6,3.3,-1,-Math.PI*.55)}${gbCoil(19.2,47.2,4.2,1,Math.PI*1.05)}${gbCoil(40.5,40.2,2.2,1,Math.PI*.9)}${gbCoil(16.5,60.5,2.4,-1,-Math.PI*.2)}
  <path d="M50 31.2C51.9 33.4 52.1 35.6 50 38.6C47.9 35.6 48.1 33.4 50 31.2Z"/><path d="M50 38.6C47.5 37.8 45.5 38.6 44.4 40.4C46.8 40.9 48.6 40.2 50 38.6Z"/>
  <circle cx="35.5" cy="39.6" r=".7"/><circle cx="25.6" cy="41.5" r=".7"/><circle cx="21.6" cy="55" r=".6"/>`;
// side bands: a running vine with small coils turning to alternate sides
const gbVine=(x,y0,y1)=>{let d=`M${x} ${y1}`,coils='';const P=13;for(let y=y1,k=0;y>y0+P;y-=P,k++){const s=k%2?1:-1;
  d+=`C${f2(x+s*3)} ${f2(y-P*.3)} ${f2(x+s*3)} ${f2(y-P*.7)} ${x} ${f2(y-P)}`;coils+=gbCoil(x+s*2.1,y-P*.5,1.9,s,s>0?Math.PI:0)}
  return `<path d="${d}" fill="none" stroke-width=".95"/>${coils}`};
const GB_ARCH='M23 151V72C23 56 38 49 50 41C62 49 77 56 77 72V151Z';
function gbGate(th,uid){const c=th.c,m=c.metal;
  const relief=`<filter id="gbr${uid}" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur in="SourceAlpha" stdDeviation=".45" result="b"/>
      <feDiffuseLighting in="b" surfaceScale="2.4" diffuseConstant="1.15" lighting-color="#fff" result="d"><feDistantLight azimuth="235" elevation="38"/></feDiffuseLighting>
      <feSpecularLighting in="b" surfaceScale="2.4" specularConstant=".9" specularExponent="16" lighting-color="#fff3d2" result="s"><feDistantLight azimuth="235" elevation="44"/></feSpecularLighting>
      <feComposite in="d" in2="SourceGraphic" operator="arithmetic" k1="1.15" result="lit"/><feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>
      <feComposite in="lit" in2="s2" operator="arithmetic" k2="1" k3=".8" result="o"/><feComposite in="o" in2="SourceAlpha" operator="in" result="top"/>
      <feOffset in="SourceAlpha" dx=".5" dy=".8"/><feGaussianBlur stdDeviation=".5"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .7 0" result="sh"/>
      <feMerge><feMergeNode in="sh"/><feMergeNode in="top"/></feMerge></filter>`;
  const grain=`<filter id="gbw${uid}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".22 .012" numOctaves="4" seed="${uid}"/>
      <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -.7 .5" result="g"/><feComposite in="g" in2="SourceGraphic" operator="in" result="g2"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="g2"/></feMerge></filter>`;
  const half=`<g class="gb-carve">${gbSpandrel()}${gbVine(8.5,38,148)}</g>`;
  return `<svg class="gb-gate" viewBox="0 0 100 152" ${NS} aria-hidden="true"><defs>${relief}${grain}
    <clipPath id="gba${uid}"><path d="${GB_ARCH}"/></clipPath>
    <linearGradient id="gbs${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".3" stop-color="#000" stop-opacity="0"/></linearGradient></defs>
    <g clip-path="url(#gba${uid})"><image class="gb-paint" href="${A}pd-paint-${c.paint}.jpg" x="8" y="36" width="84" height="116" preserveAspectRatio="xMidYMid slice"/><rect x="0" y="0" width="100" height="152" fill="url(#gbs${uid})"/></g>
    <path d="M1 152V3H99V152H77V72C77 56 62 49 50 41C38 49 23 56 23 72V152Z" fill="${c.wood}" filter="url(#gbw${uid})"/>
    <path d="M1 3H99" stroke="#000" stroke-opacity=".35" stroke-width=".6"/>
    <g fill="${m}" stroke="${m}" filter="url(#gbr${uid})">
      ${half}<g transform="translate(100 0) scale(-1 1)">${half}</g>
      <path d="M4 37.5H96M4 151V37.5M96 151V37.5M13 151V37.5M87 151V37.5" fill="none" stroke-width=".7"/>
      <path d="M2.5 9H97.5M2.5 6H97.5" fill="none" stroke-width=".7"/>
      ${K.ring(22,0).map((_,i)=>`<circle cx="${f2(4.5+i*4.3)}" cy="7.5" r=".9" stroke="none"/>`).join('')}
      <path d="M20.5 151V72C20.5 54.5 36.5 46.5 50 37.6C63.5 46.5 79.5 54.5 79.5 72V151" fill="none" stroke-width=".9"/>
      <path d="M17 14H83C86 14 88 17 88 23.5C88 30 86 33 83 33H17C14 33 12 30 12 23.5C12 17 14 14 17 14Z" fill="none" stroke-width="1"/>
      ${[[9,23.5],[91,23.5]].map(([x,y])=>`<path d="${K.star(8,2.4,1.1,x,y)}" stroke="none"/>`).join('')}
    </g>
    <path d="${GB_ARCH}" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="2.2" style="filter:blur(.8px)"/>
  </svg>`}
const gbBoard=(o,L,big)=>{const [n1,n2]=coverNames(o);return `<div class="gb-board"><p class="gb-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p></div>`};
const gbT=(k,n,desc,ground,wood,accent,extra={})=>({k,n,desc,c:{ground,sheet:wood,ink:'#f1e8d8',accent,gold:'#d2ad62',pagefg:'#f1e8d8',wood,metal:'#c9a14e',paint:'hassam-water',...extra}});
FAMILY({key:'gerbang',name:'Gerbang',meaning:'Carved gateway',
  blurb:'A carved timber palace gateway with gold-leaf scrolls, your names on the name board over the arch and a water garden beyond. Guests walk through the arch to open the card.',
  fonts:{d:"'Cinzel', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';return `<section class="page pg-gerbang2" style="--paint:url(${A}pd-paint-${th.c.paint}.jpg);--metal:${th.c.metal};--wood:${th.c.wood}"><div class="gb-ground"></div>
    <div class="gb-view reveal"><div class="gb-arch"></div></div>
    ${o.bismillah?'<p class="gb-bis reveal d1">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
    <p class="gb-k kicker reveal d1">${ev(o,L)}</p><p class="gb-pnames">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
    <p class="gb-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="gb-hj reveal d2">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="gb-ven reveal d2">${esc(o.venue)}</p>`:''}
    <a class="gb-pill reveal d3" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-gerbang2" style="--metal:${th.c.metal};--wood:${th.c.wood}"><div class="gb-ground"></div>
    <div class="gb-stage">${gbGate(th,++gbN)}${gbBoard(o,L)}</div>
    <div class="gb-foot"><p class="gb-k">${ev(o,L)} · ${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${guest?`<p class="gb-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="gb-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const m=th.c.metal;
    el.style.setProperty('--paint',`url(${A}pd-paint-${th.c.paint}.jpg)`);el.style.setProperty('--wood',th.c.wood);el.style.setProperty('--metal',m);
    let d='';for(let x=0;x<120;x+=8)d+=`<path d="M${x+.6} 9.4L${x+4} 1.2L${x+7.4} 9.4Z" fill="none" stroke="${m}" stroke-width=".8"/><path d="M${x+4} 8.6V4.6" stroke="${m}" stroke-width=".6"/>`;
    el.style.setProperty('--rebung',K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 10" preserveAspectRatio="xMidYMid slice"><filter id="r"><feGaussianBlur in="SourceAlpha" stdDeviation=".35" result="b"/><feDiffuseLighting in="b" surfaceScale="2" lighting-color="#fff" result="d"><feDistantLight azimuth="235" elevation="40"/></feDiffuseLighting><feComposite in="d" in2="SourceGraphic" operator="arithmetic" k1="1.2"/><feComposite in2="SourceAlpha" operator="in"/></filter><g filter="url(#r)">${d}<path d="M0 .4H120M0 9.6H120" stroke="${m}" stroke-width=".7"/></g></svg>`));
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    gbT('gading','Gading','Golden teak gateway, gilt carving','#2e231a','#5a4130','#e6c98c'),
    gbT('nila','Nila','Indigo-stained gateway, gilt carving','#141b2e','#253556','#e2c88e'),
    gbT('marun','Marun','Maroon lacquered gateway, gilt carving','#3a1018','#5e1b26','#e6c58a'),
    gbT('zamrud','Zamrud','Emerald lacquered gateway, gilt carving','#0c241c','#18402f','#e2c88c'),
    gbT('jambu','Merah Jambu','Rose-washed gateway, ivory carving','#3e1f27','#7a4250','#f2d9d6',{metal:'#efe4d2',paint:'monet-irises'}),
    gbT('sage','Sage','Sage-washed gateway, ivory carving','#262e24','#4c5a46','#e9eedf',{metal:'#efe7d4'}),
    gbT('hitam','Hitam','Ebony gateway, gilt carving','#100e0d','#26211d','#e2c48a'),
    gbT('terakota','Terakota','Terracotta gateway, gilt carving','#3a1a10','#7a3a22','#f0cfa6',{paint:'monet-irises'}),
  ]});
