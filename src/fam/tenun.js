/* tenun: Pua Kumbu, the Iban warp-ikat cloth of Sarawak. Rust, black and cream lozenges with hooks and spirals,
   with the soft feathered edges that real ikat dye leaves along the warp.
   Cover: the cloth lies folded in three under a paper band; touched, it unfolds (two folds) and fades into the page.
   Page: a cream card with ikat end-bands and fringe. Skin: woven-edge cards with ikat band dividers. */
const f1=n=>+n.toFixed(1);
// a curl that winds inward: the "ensepit" fern-hook of pua kumbu
function curl(x,y,r,a0,dir){let d='';const N=16;for(let i=0;i<=N;i++){const t=i/N,a=a0+dir*t*Math.PI*2.1,rr=r*(1-t*.78);d+=(i?'L':'M')+f1(x+Math.cos(a)*rr-Math.cos(a0)*r)+' '+f1(y+Math.sin(a)*rr-Math.sin(a0)*r)}return d}
const dia=(cx,cy,a,b)=>`M${f1(cx)} ${f1(cy-b)}L${f1(cx+a)} ${f1(cy)}L${f1(cx)} ${f1(cy+b)}L${f1(cx-a)} ${f1(cy)}Z`;
// one hooked lozenge: nested diamonds, hooks off the vertices, spirals in the quarters, a cream heart
function lozenge(cx,cy,a,b){let p='',h='';
  p+=dia(cx,cy,a,b)+dia(cx,cy,a*.66,b*.66);
  // hooks: from each vertex of the middle diamond out toward the outer one, ending in a curl
  [[0,-1],[1,0],[0,1],[-1,0]].forEach(([dx,dy],i)=>{const x0=cx+dx*a*.66,y0=cy+dy*b*.66,x1=cx+dx*a*.86,y1=cy+dy*b*.86;
    h+=`M${f1(x0)} ${f1(y0)}L${f1(x1)} ${f1(y1)}`;const ang=Math.atan2(dy,dx);
    h+=curl(x1,y1,a*.09,ang+Math.PI/2,1)+curl(x1,y1,a*.09,ang-Math.PI/2,-1)});
  // spirals in each quarter between the outer and middle diamonds
  [[1,-1],[1,1],[-1,1],[-1,-1]].forEach(([sx,sy],i)=>{const x=cx+sx*a*.42,y=cy+sy*b*.42;h+=curl(x,y,a*.15,Math.atan2(sy,sx)+Math.PI,i%2?1:-1)});
  // sawtooth teeth along the inside of the outer diamond
  let t='';const T=7;[[0,-b,a,0],[a,0,0,b],[0,b,-a,0],[-a,0,0,-b]].forEach(([x0,y0,x1,y1])=>{for(let i=1;i<T;i++){const u=i/T,x=cx+x0+(x1-x0)*u,y=cy+y0+(y1-y0)*u;const ix=(cx-x)*.12,iy=(cy-y)*.12;t+=`M${f1(x)} ${f1(y)}l${f1(ix)} ${f1(iy)}`}});
  return {p,h,t,core:dia(cx,cy,a*.3,b*.3),eye:dia(cx,cy,a*.12,b*.12)}}
// little cross-hook filling the gaps where four lozenges meet
function gap(cx,cy,s){let h=dia(cx,cy,s*.5,s*.62);[[0,-1],[1,0],[0,1],[-1,0]].forEach(([dx,dy])=>{const x=cx+dx*s*.95,y=cy+dy*s*1.15;h+=`M${f1(cx+dx*s*.5)} ${f1(cy+dy*s*.62)}L${f1(x)} ${f1(y)}`+curl(x,y,s*.22,Math.atan2(dy,dx)+Math.PI/2,1)});return h}
const IKAT=(id,s=6)=>`<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.6 0.014" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 .5  0 1.3 0 0 -.15  0 0 0 0 0  0 0 0 0 1" result="m"/><feDisplacementMap in="SourceGraphic" in2="m" scale="${s}" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="0.2 0.75"/></filter>`;
const MOTTLE=`<filter id="mo" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.035 0.006" numOctaves="3" seed="3"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -.9 .62"/></filter>`;
const WARP=(c)=>`<pattern id="wp" width="1.7" height="3" patternUnits="userSpaceOnUse"><path d="M.4 0V3" stroke="#000" stroke-width=".5" opacity=".16"/><path d="M0 1.5H1.7" stroke="#fff" stroke-width=".35" opacity=".07"/></pattern>`;
function ends(c,y,flip){const k=flip?-1:1,Y=v=>f1(y+k*v);let s='';
  s+=`<rect x="0" y="${Math.min(Y(0),Y(8))}" width="300" height="8" fill="${c.dye}"/>`;
  let tri='';for(let x=0;x<300;x+=10)tri+=`M${x} ${Y(10)}L${x+5} ${Y(22)}L${x+10} ${Y(10)}Z`;
  s+=`<rect x="0" y="${Math.min(Y(9),Y(23))}" width="300" height="14" fill="${c.dye}"/><path d="${tri}" fill="${c.motif}"/>`;
  let row='',rh='';for(let x=15;x<300;x+=30){row+=dia(x,y+k*35,11,9)+dia(x,y+k*35,4.5,3.6);rh+=`M${x+11} ${Y(35)}h8`}
  s+=`<rect x="0" y="${Math.min(Y(23),Y(48))}" width="300" height="25" fill="${c.field}"/><path d="${row}" fill="none" stroke="${c.dye}" stroke-width="4"/><path d="${row}" fill="none" stroke="${c.motif}" stroke-width="1.6"/><path d="${rh}" stroke="${c.dye}" stroke-width="3"/><path d="${rh}" stroke="${c.motif}" stroke-width="1"/>`;
  s+=`<rect x="0" y="${Math.min(Y(48),Y(54))}" width="300" height="6" fill="${c.dye}"/><path d="M0 ${Y(51)}H300" stroke="${c.motif}" stroke-width="1.2" stroke-dasharray="6 4"/>`;
  return s}
function clothSvg(c){let P='',H='',Tt='',core='',eye='',G='';
  const x0=18,y0=60,tw=88,th=105;
  for(let r=0;r<4;r++)for(let q=0;q<3;q++){const L=lozenge(x0+tw*q+tw/2,y0+th*r+th/2,tw/2-2,th/2-2);P+=L.p;H+=L.h;Tt+=L.t;core+=L.core;eye+=L.eye}
  for(let r=0;r<=4;r++)for(let q=0;q<=3;q++)G+=gap(x0+tw*q,y0+th*r,7);
  const sel=x=>`<rect x="${x}" y="0" width="16" height="540" fill="${c.dye}"/><path d="M${x+3} 0V540M${x+13} 0V540" stroke="${c.field}" stroke-width="2.2"/><path d="M${x+8} 0V540" stroke="${c.motif}" stroke-width="1.6" stroke-dasharray="7 5"/>`;
  return `<svg ${NS} viewBox="0 0 300 540" preserveAspectRatio="none"><defs>${IKAT('ik')}${MOTTLE}${WARP(c)}</defs>
   <rect width="300" height="540" fill="${c.field}"/>
   <g filter="url(#ik)">
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
     <path d="${P}" stroke="${c.dye}" stroke-width="7.5"/><path d="${H}" stroke="${c.dye}" stroke-width="5"/><path d="${G}" stroke="${c.dye}" stroke-width="4.4"/><path d="${Tt}" stroke="${c.dye}" stroke-width="3.6"/>
     <path d="${P}" stroke="${c.motif}" stroke-width="2.8"/><path d="${H}" stroke="${c.motif}" stroke-width="1.7"/><path d="${G}" stroke="${c.motif}" stroke-width="1.5"/><path d="${Tt}" stroke="${c.motif}" stroke-width="1.1"/>
    </g>
    <path d="${core}" fill="${c.motif}" stroke="${c.dye}" stroke-width="3"/><path d="${eye}" fill="${c.field}" stroke="${c.dye}" stroke-width="1.6"/>
    ${ends(c,0,false)}${ends(c,540,true)}${sel(0)}${sel(284)}
   </g>
   <rect width="300" height="540" filter="url(#mo)"/><rect width="300" height="540" fill="url(#wp)"/></svg>`}
// a horizontal ikat strip that tiles left to right (for page bands and skin dividers)
function bandSvg(c){let row='',hk='',tri='',tri2='';
  for(let x=0;x<120;x+=10){tri+=`M${x} 8L${x+5} 17L${x+10} 8Z`;tri2+=`M${x} 64L${x+5} 55L${x+10} 64Z`}
  for(let x=0;x<120;x+=40){row+=dia(x+20,36,16,13)+dia(x+20,36,8,6.5);hk+=`M${x+36} 36h8`+curl(x+20,23,3.4,Math.PI/2,1)+curl(x+20,49,3.4,-Math.PI/2,-1)+dia(x+40,36,3,3)}
  return `<svg ${NS} width="120" height="72" viewBox="0 0 120 72" preserveAspectRatio="none"><defs>${IKAT('ik',4)}<pattern id="wp" width="1.7" height="3" patternUnits="userSpaceOnUse"><path d="M.4 0V3" stroke="#000" stroke-width=".5" opacity=".14"/></pattern></defs>
   <rect width="120" height="72" fill="${c.field}"/><g filter="url(#ik)"><rect width="120" height="6" fill="${c.dye}"/><rect y="66" width="120" height="6" fill="${c.dye}"/>
   <rect y="7" width="120" height="11" fill="${c.dye}"/><path d="${tri}" fill="${c.motif}"/><rect y="54" width="120" height="11" fill="${c.dye}"/><path d="${tri2}" fill="${c.motif}"/>
   <g fill="none" stroke-linecap="round"><path d="${row}" stroke="${c.dye}" stroke-width="5"/><path d="${hk}" stroke="${c.dye}" stroke-width="3.4"/><path d="${row}" stroke="${c.motif}" stroke-width="1.9"/><path d="${hk}" stroke="${c.motif}" stroke-width="1.1"/></g></g>
   <rect width="120" height="72" fill="url(#wp)"/></svg>`}
// fine-line foil emblem: a hooked lozenge drawn in thin strokes
function emblem(){const L=lozenge(50,50,46,46);return `<svg viewBox="0 0 100 100" ${NS}><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round"><path d="${L.p}" stroke-width="1.6"/><path d="${dia(50,50,49,49)}" stroke-width=".7"/><path d="${L.h}" stroke-width="1.1"/><path d="${L.t}" stroke-width=".8"/><path d="${L.core}" stroke-width="1.2"/><path d="${L.eye}" fill="#000"/></g></svg>`}
const EMB=K.uri(emblem());
const CORN=K.uri(`<svg ${NS} viewBox="0 0 40 40"><g fill="none" stroke="#000" stroke-width="1" stroke-linecap="round"><path d="M2 2H38M2 2V38M6 6H26M6 6V26"/><path d="${dia(14,14,6,6)}"/><path d="${curl(26,6,3,Math.PI/2,1)}"/><path d="${curl(6,26,3,0,-1)}"/><circle cx="14" cy="14" r="1.2" fill="#000"/></g></svg>`);
const LAT=c=>K.uri(`<svg ${NS} width="46" height="56" viewBox="0 0 46 56"><path d="M23 0L46 28L23 56L0 28Z M23 14L34.5 28L23 42L11.5 28Z" fill="none" stroke="${c.gold}" stroke-width=".8"/><circle cx="23" cy="28" r="1.4" fill="${c.gold}"/></svg>`);
const pal=c=>({field:c.field||c.accent,dye:c.dye||'#1b120e',motif:c.motif||'#efe3c9'});
FAMILY({key:'tenun',name:'Pua Kumbu',meaning:'Iban ikat cloth',
  blurb:'A folded Pua Kumbu cloth of rust, black and cream ikat under a paper band; touch it and it unfolds.',
  fonts:{d:"'Marcellus', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';const band=K.uri(bandSvg(pal(c)));
    return `<section class="page pg-tenun" style="--band:${band};--emb:${EMB};--corn:${CORN}"><div class="tn-card tex">
     <i class="tn-b t"></i><i class="tn-b b"></i><i class="tn-sel l"></i><i class="tn-sel r"></i>
     <i class="tn-wm"></i><i class="tn-ic tl"></i><i class="tn-ic tr"></i><i class="tn-ic bl"></i><i class="tn-ic br"></i><div class="tn-in"><i class="tn-emb reveal"></i>
     <p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="tn-rule reveal d2"><i></i><b></b><i></i></div>
     <p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="tn-v reveal d3">${esc(o.venue)}</p></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',[i1,i2]=K.initials(o);const cloth=K.uri(clothSvg(pal(c)));
    return `<div class="cover cv-tenun" style="--cloth:${cloth};--lat:${LAT(c)};--emb:${EMB};--corn:${CORN}"><div class="tn-bg"></div>
     <div class="tn-frame"><i class="tl"></i><i class="tr"></i><i class="bl"></i><i class="br"></i></div>
     <div class="tn-head"><p class="tn-k">${ev(o,L)}</p><p class="tn-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="tn-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <${tag} class="tn-pack" ${attr} aria-label="${L.open}">
      <span class="tn-p mid"><span class="f"></span></span>
      <span class="tn-p top"><span class="f"></span><span class="b"></span></span>
      <span class="tn-p bot"><span class="f"></span><span class="b"></span></span>
      <span class="tn-band"><span class="tn-tag"><span class="tn-mono">${esc(i1)}<em>&amp;</em>${esc(i2)}</span></span></span>
     </${tag}>
     <div class="tn-foot">${guest?`<p class="tn-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="tn-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--band',K.uri(bandSvg(pal(th.c))));el.style.setProperty('--emb',EMB);
    $$('.sec h2',el).forEach(h=>h.insertAdjacentHTML('afterbegin','<i class="tn-h"></i>'));
    K.secs(el).forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="tn-strip"></i><i class="tn-fr"></i>'))},
  themes:[
    {k:'merah',n:'Merah Engkudu',desc:'Rust red ikat on dark umber',c:{ground:'#1e1512',sheet:'#f5ecdb',ink:'#2b1d16',accent:'#9a3523',gold:'#c79d5b',pagefg:'#f2e6d0',field:'#9a3523',dye:'#1a100c',motif:'#efe2c6'}},
    {k:'terakota',n:'Terakota',desc:'Brick ikat on raw cotton',c:{ground:'#e8dcc5',sheet:'#fbf6ec',ink:'#33221a',accent:'#a3432a',gold:'#a77b3e',pagefg:'#3a2419',field:'#a3432a',dye:'#25160f',motif:'#f1e6cf'}},
    {k:'nila',n:'Nila',desc:'Indigo ikat, cream motifs',c:{ground:'#111827',sheet:'#f3eee3',ink:'#1e2433',accent:'#33497a',gold:'#bf9d60',pagefg:'#e8e2d4',field:'#2f4471',dye:'#0e1424',motif:'#ece4d0'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric ikat on pale linen',c:{ground:'#efe5cf',sheet:'#fffaf0',ink:'#3a2a18',accent:'#8a5a1c',gold:'#a98142',pagefg:'#3b2a18',field:'#b67a2c',dye:'#2a1a0e',motif:'#f6ecd4'}},
    {k:'marun',n:'Marun',desc:'Deep maroon ikat at night',c:{ground:'#250d10',sheet:'#f6ece0',ink:'#2e1a1a',accent:'#7a2328',gold:'#cfa463',pagefg:'#f3e3d2',field:'#6e1f24',dye:'#170809',motif:'#f0e1cb'}},
    {k:'hitam',n:'Hitam',desc:'Black ikat with rust motifs',c:{ground:'#141110',sheet:'#f2eadc',ink:'#221a16',accent:'#8e3624',gold:'#c3a06a',pagefg:'#eee3d0',field:'#2a201b',dye:'#0c0807',motif:'#d9a184'}},
    {k:'lumut',n:'Lumut',desc:'Moss ikat on undyed cotton',c:{ground:'#e6e2cf',sheet:'#fbf9f0',ink:'#2c2b1e',accent:'#545224',gold:'#9c8746',pagefg:'#2f2d1c',field:'#5e5c30',dye:'#1d1c10',motif:'#efe9d3'}},
    {k:'senja',n:'Senja',desc:'Dusty rose ikat at dusk',c:{ground:'#f0e2d9',sheet:'#fffaf6',ink:'#3c2724',accent:'#8f4a3d',gold:'#ad7f5a',pagefg:'#3c2724',field:'#a1584a',dye:'#2a1613',motif:'#f6e8de'}},
  ]});
