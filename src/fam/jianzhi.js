/* jianzhi: Potong Kertas, the Chinese papercut. Three sheets of cut red paper stacked like a shadow box:
   a far layer of clouds and plum blossom, a lattice wall pierced by a round moon-gate, and a front frame of
   peonies and cloud scrolls. Each layer casts a soft shadow on the one behind.
   Cover: touched, the layers part and drift past into depth, through the gate. Page: a papercut moon-gate around the names.
   Skin: papercut-edged section frames with a cut rosette on each heading. */
needFont('Great+Vibes');
const q=n=>+n.toFixed(1);
const GX=200,GY=356,GR=124;
const ring=(n,r,cx,cy,f)=>Array.from({length:n},(_,i)=>{const a=-Math.PI/2+i/n*Math.PI*2;return f(cx+Math.cos(a)*r,cy+Math.sin(a)*r,a*57.2958,i)}).join('');
// xiangyun cloud: a double-line curl, cut as a slit inside a paper band
function cloud(x,y,s,flip){const P='M0 0C-4 -14 10 -24 20 -16C26 -11 22 -2 15 -4C10 -5 11 -11 15 -11M0 0C6 -6 16 -4 18 4C30 -2 42 6 38 16C35 23 26 22 25 16C24 12 29 10 31 13M0 0C-10 -2 -20 4 -18 14C-16 22 -6 22 -6 16C-6 12 -11 12 -11 15';
  const t=`translate(${x} ${y}) scale(${flip?-s:s} ${s})`;
  return `<path d="${P}" transform="${t}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="${P}" transform="${t}" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round"/>`}
// a papercut peony: lobed petals in three rings, each with an inner slit and crescent cuts
function peony(x,y,s){let o=`<g transform="translate(${x} ${y}) scale(${s})">`;
  const pet='M0 0C-12 -4 -18 -16 -12 -26C-8 -32 -2 -30 0 -26C2 -30 8 -32 12 -26C18 -16 12 -4 0 0Z';
  o+=ring(7,10,0,0,(px,py,a)=>`<path d="${pet}" transform="translate(${q(px)} ${q(py)}) rotate(${q(a+90)}) scale(1.05)" fill="#fff"/>`);
  o+=ring(7,10,0,0,(px,py,a)=>`<path d="${pet}" transform="translate(${q(px)} ${q(py)}) rotate(${q(a+90)}) scale(.7) translate(0 -5)" fill="none" stroke="#000" stroke-width="1.4"/>`);
  o+=ring(5,6,0,0,(px,py,a)=>`<path d="${pet}" transform="translate(${q(px)} ${q(py)}) rotate(${q(a+126)}) scale(.75)" fill="#fff" stroke="#000" stroke-width="1.4"/>`);
  o+=ring(5,6,0,0,(px,py,a)=>`<path d="M-5 -10Q0 -15 5 -10" transform="translate(${q(px)} ${q(py)}) rotate(${q(a+126)})" fill="none" stroke="#000" stroke-width="1.2"/>`);
  o+=`<circle r="9" fill="#fff" stroke="#000" stroke-width="1.4"/>`+ring(8,5,0,0,(px,py)=>`<circle cx="${q(px)}" cy="${q(py)}" r="1.3" fill="#000"/>`)+`<circle r="2" fill="#000"/>`;
  return o+'</g>'}
function leaf(x,y,rot,s){const L='M0 0C10 -8 12 -26 0 -42C-12 -26 -10 -8 0 0Z';let t=`translate(${x} ${y}) rotate(${rot}) scale(${s})`;
  let cuts='';for(let k=1;k<6;k++){const yy=-k*6.5;cuts+=`M0 ${yy}l5 -5M0 ${yy}l-5 -5`}
  return `<path d="${L}" transform="${t}" fill="#fff"/><path d="M0 -4V-36${cuts}" transform="${t}" stroke="#000" stroke-width="1.3" fill="none"/>`}
function plum(x,y,s){return `<g transform="translate(${x} ${y}) scale(${s})">${ring(5,4.6,0,0,(px,py)=>`<circle cx="${q(px)}" cy="${q(py)}" r="4.4" fill="#fff"/>`)}${ring(5,4.6,0,0,(px,py)=>`<circle cx="${q(px)}" cy="${q(py)}" r="1.4" fill="#000"/>`)}<circle r="1.6" fill="#000"/></g>`}
// sawtooth slit along a path (the "jagged" texture of papercut)
const saw=(x0,y0,x1,y1,n,h)=>{let d='';for(let i=0;i<n;i++){const t0=i/n,t1=(i+.5)/n,t2=(i+1)/n,px=-(y1-y0),py=x1-x0,L=Math.hypot(px,py),ux=px/L*h,uy=py/L*h;
  d+=`${i?'L':'M'}${q(x0+(x1-x0)*t0)} ${q(y0+(y1-y0)*t0)}L${q(x0+(x1-x0)*t1+ux)} ${q(y0+(y1-y0)*t1+uy)}L${q(x0+(x1-x0)*t2)} ${q(y0+(y1-y0)*t2)}`}return d};
// layer C (back): clouds, a plum branch and a moon seen through the gate and the lattice
const LAYER_C=K.uri(`<svg ${NS} viewBox="0 0 400 760"><defs><mask id="m"><rect width="400" height="760" fill="#000"/>
  <path d="M60 470C80 448 110 452 122 468C134 446 170 446 180 470C196 452 226 456 232 474C248 456 280 458 288 476C304 462 330 466 340 486V520H60Z" fill="#fff"/>
  ${cloud(110,452,1,false)}${cloud(286,458,.9,true)}
  <path d="M66 330C80 350 90 372 92 398M78 352C90 350 100 356 104 366M88 380C98 384 104 392 104 402" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  ${plum(92,398,1.1)}${plum(104,366,.95)}${plum(104,402,.8)}${plum(84,346,.85)}
  <circle cx="306" cy="292" r="30" fill="#fff"/><circle cx="306" cy="292" r="25" fill="#000"/><circle cx="306" cy="292" r="23" fill="#fff"/>
  <path d="M286 298c5 -4 10 -4 15 0s10 4 15 0M290 307c4 -3 8 -3 12 0s8 3 12 0" stroke="#000" stroke-width="1.3" fill="none"/>
  <path d="M180 214H220" stroke="#fff"/></mask></defs><rect width="400" height="760" mask="url(#m)"/></svg>`);
// layer B (middle): a lattice wall with the round moon-gate and two round windows
const LAYER_B=(()=>{let lat='';for(let y=86;y<=200;y+=14)for(let x=50;x<=350;x+=14){const o=((y-86)/14)%2?7:0;if(x+o>350)continue;lat+=`<path d="M${x+o} ${y-5}l5 5-5 5-5-5z"/>`}
  const holes=ring(36,GR+13,GX,GY,(x,y,a)=>`<path d="M0 -3.4C2 -1 2 1 0 3.4C-2 1 -2 -1 0 -3.4Z" transform="translate(${q(x)} ${q(y)}) rotate(${q(a+90)})"/>`);
  const slits=ring(24,GR+5,GX,GY,(x,y,a,i)=>{const a0=a*Math.PI/180,a1=a0+Math.PI*2/24*.72;return `<path d="M${q(GX+Math.cos(a0)*(GR+5))} ${q(GY+Math.sin(a0)*(GR+5))}A${GR+5} ${GR+5} 0 0 1 ${q(GX+Math.cos(a1)*(GR+5))} ${q(GY+Math.sin(a1)*(GR+5))}" fill="none" stroke="#000" stroke-width="1.6"/>`});
  return K.uri(`<svg ${NS} viewBox="0 0 400 760"><defs><mask id="m"><rect width="400" height="760" fill="#fff"/>
   <g fill="#000"><rect x="44" y="80" width="312" height="126" fill="#fff"/>${lat}</g>
   <rect x="44" y="80" width="312" height="126" fill="none" stroke="#000" stroke-width="2"/><rect x="38" y="74" width="324" height="138" fill="none" stroke="#000" stroke-width="1.4" stroke-dasharray="10 4"/>
   ${saw(40,226,360,226,40,5).replace(/^/,'<path d="')}" fill="none" stroke="#000" stroke-width="1.3"/>
   <circle cx="${GX}" cy="${GY}" r="${GR}" fill="#000"/>${slits}<g fill="#000">${holes}</g>
   ${ring(12,GR+25,GX,GY,(x,y)=>`<circle cx="${q(x)}" cy="${q(y)}" r="2" fill="#000"/>`)}
   <path d="M60 520H340" stroke="#000" stroke-width="1.4" stroke-dasharray="12 5"/>${saw(60,528,340,528,40,5).replace(/^/,'<path d="')}" fill="none" stroke="#000" stroke-width="1.2"/>
   </mask></defs><rect width="400" height="760" mask="url(#m)"/></svg>`)})();
// layer A (front): a scalloped frame with cloud scrolls above and peony clusters rising at the foot
const LAYER_A=(()=>{let sc='';const x0=24,x1=376,y0=24,y1=736,r=8;
  let d=`M${x0} ${y0}`;for(let x=x0;x<x1;x+=2*r)d+=`A${r} ${r} 0 0 0 ${Math.min(x+2*r,x1)} ${y0}`;for(let y=y0;y<y1;y+=2*r)d+=`A${r} ${r} 0 0 0 ${x1} ${Math.min(y+2*r,y1)}`;
  for(let x=x1;x>x0;x-=2*r)d+=`A${r} ${r} 0 0 0 ${Math.max(x-2*r,x0)} ${y1}`;for(let y=y1;y>y0;y-=2*r)d+=`A${r} ${r} 0 0 0 ${x0} ${Math.max(y-2*r,y0)}`;
  const dots=[];for(let x=40;x<=360;x+=16){dots.push([x,12],[x,748])}for(let y=40;y<=720;y+=16){dots.push([12,y],[388,y])}
  return K.uri(`<svg ${NS} viewBox="0 0 400 760"><defs><mask id="m"><rect width="400" height="760" fill="#fff"/><path d="${d}Z" fill="#000"/>
   ${dots.map(([x,y])=>`<path d="M${x} ${y-3.4}l3.4 3.4-3.4 3.4-3.4-3.4z" fill="#000"/>`).join('')}
   ${cloud(64,64,1.25,false)}${cloud(336,64,1.25,true)}${cloud(60,128,.8,false)}${cloud(340,128,.8,true)}
   <path d="M24 40C40 46 50 56 52 70M376 40C360 46 350 56 348 70" stroke="#fff" stroke-width="8" fill="none"/>
   <path d="M24 736C40 700 60 664 92 640M376 736C360 700 340 664 308 640M40 736C62 712 80 700 106 696M360 736C338 712 320 700 294 696" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
   ${leaf(60,690,-60,1.1)}${leaf(78,652,-20,1.0)}${leaf(110,700,40,.9)}${leaf(340,690,60,1.1)}${leaf(322,652,20,1.0)}${leaf(290,700,-40,.9)}
   ${peony(92,632,1.25)}${peony(308,632,1.25)}${peony(44,700,.85)}${peony(356,700,.85)}${plum(128,676,1)}${plum(272,676,1)}
   </mask></defs><rect width="400" height="760" mask="url(#m)"/></svg>`)})();
// page gate: the lattice wall reduced to a moon-gate ring with peonies at the foot
const PAGE_GATE=(()=>{const cx=200,cy=330,R=150;
  const holes=ring(40,R+14,cx,cy,(x,y,a)=>`<path d="M0 -3.6C2 -1 2 1 0 3.6C-2 1 -2 -1 0 -3.6Z" transform="translate(${q(x)} ${q(y)}) rotate(${q(a+90)})" fill="#000"/>`);
  const slits=ring(28,R+6,cx,cy,(x,y,a)=>{const a0=a*Math.PI/180,a1=a0+Math.PI*2/28*.72;return `<path d="M${q(cx+Math.cos(a0)*(R+6))} ${q(cy+Math.sin(a0)*(R+6))}A${R+6} ${R+6} 0 0 1 ${q(cx+Math.cos(a1)*(R+6))} ${q(cy+Math.sin(a1)*(R+6))}" fill="none" stroke="#000" stroke-width="1.6"/>`});
  return K.uri(`<svg ${NS} viewBox="0 0 400 640"><defs><mask id="m"><rect width="400" height="640" fill="#000"/><circle cx="${cx}" cy="${cy}" r="${R+26}" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#000"/>${slits}${holes}
   ${ring(16,R+22,cx,cy,(x,y)=>`<circle cx="${q(x)}" cy="${q(y)}" r="1.8" fill="#000"/>`)}
   ${cloud(150,150,.9,false)}${cloud(250,150,.9,true)}
   ${leaf(116,486,-70,1.1)}${leaf(146,500,-30,.9)}${leaf(284,486,70,1.1)}${leaf(254,500,30,.9)}${peony(130,470,1.3)}${peony(270,470,1.3)}${peony(200,500,1.05)}${plum(168,452,1)}${plum(232,452,1)}
   </mask></defs><rect width="400" height="640" mask="url(#m)"/></svg>`)})();
// papercut border for the skin cards (border-image)
const FRAME=col=>K.uri(`<svg ${NS} width="90" height="90" viewBox="0 0 90 90"><defs><mask id="m"><rect width="90" height="90" fill="#fff"/><rect x="18" y="18" width="54" height="54" fill="#000"/>
  ${[0,1,2].map(i=>`<path d="M${9+i*30} 0l6 6-6 6-6-6zM${9+i*30} 78l6 6-6 6-6-6zM0 ${9+i*30}l6 6-6 6-6-6zM78 ${9+i*30}l6 6-6 6-6-6z" fill="#000" transform="translate(${i===1?6:0} 0)"/>`).join('')}
  ${[[9,9],[81,9],[9,81],[81,81]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4.2" fill="#000"/><circle cx="${x}" cy="${y}" r="2" fill="#fff"/>`).join('')}
  <path d="M18 18H72V72H18Z" fill="none" stroke="#fff" stroke-width="3"/><path d="M14 14H76V76H14Z" fill="none" stroke="#000" stroke-width="1.2" stroke-dasharray="5 3"/></mask></defs><rect width="90" height="90" fill="${col}" mask="url(#m)"/></svg>`);
const PV=c=>`--paper:${c.paper};--paperB:${c.paperB};--paperC:${c.paperC};--gi:${c.gi||c.ink};--ga:${c.ga||c.accent}`;
const ROSE=K.uri(`<svg ${NS} viewBox="-30 -30 60 60"><defs><mask id="m"><rect x="-30" y="-30" width="60" height="60" fill="#000"/>${peony(0,0,.95)}</mask></defs><rect x="-30" y="-30" width="60" height="60" mask="url(#m)"/></svg>`);
FAMILY({key:'jianzhi',name:'Potong Kertas',meaning:'Chinese papercut',
  blurb:'Three layers of cut red paper, clouds, lattice and peonies, around a round moon-gate; touch it and the layers part into depth.',
  fonts:{d:"'Cinzel', serif",s:"'Great Vibes', 'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-jianzhi ${th.c.foil?'jz-foil':''}" style="--pg:${PAGE_GATE};${PV(th.c)}"><div class="jz-bg"></div>
     <div class="jz-pw"><i class="jz-pl"><i></i></i>
      <div class="jz-pin"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><div class="jz-rule reveal d2"><i></i><b></b><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="jz-v reveal d3">${esc(o.venue)}</p></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-jianzhi ${th.c.foil?'jz-foil':''}" style="--la:${LAYER_A};--lb:${LAYER_B};--lc:${LAYER_C};${PV(th.c)}"><div class="jz-bg"></div>
     <i class="jz-l c"><i></i></i>
     <div class="jz-gate"><p class="jz-k">${ev(o,L)}</p><p class="jz-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="jz-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <i class="jz-l b"><i></i></i><i class="jz-l a"><i></i></i>
     <${tag} class="jz-tap" ${attr} aria-label="${L.open}"></${tag}>
     <div class="jz-foot">${guest?`<p class="jz-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="jz-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);PV(th.c).split(';').forEach(kv=>{const [k,v]=kv.split(':');el.style.setProperty(k,v)});el.style.setProperty('--frame',FRAME(th.c.paper||th.c.accent));el.style.setProperty('--rose',ROSE);
    $$('.sec h2',el).forEach(h=>h.insertAdjacentHTML('afterbegin','<i class="jz-hr"></i>'))},
  themes:[
    {k:'merah',n:'Merah',desc:'Red papercut on rice paper',c:{ground:'#f4ecdc',sheet:'#fbf6ea',ink:'#3a2420',accent:'#b8152b',gold:'#b8933e',pagefg:'#fbf3e4',paper:'#c0162e',paperB:'#a51027',paperC:'#d9454a'}},
    {k:'emas',n:'Emas',desc:'Gold foil papercut on rice paper',c:{ground:'#f3e9d6',sheet:'#fbf3e3',ink:'#3a2420',accent:'#9a1426',gold:'#b8933e',pagefg:'#2a1606',paper:'#c9a04e',paperB:'#b58c3c',paperC:'#dcc07c',foil:1}},
    {k:'jambu',n:'Jambu',desc:'Rose papercut on blush',c:{ground:'#fbeeee',sheet:'#fffaf9',ink:'#3e2a2c',accent:'#c23b5a',gold:'#b48c5a',pagefg:'#fff4f4',paper:'#d4566f',paperB:'#bd4560',paperC:'#e98ea0'}},
    {k:'nila',n:'Nila',desc:'Indigo papercut on white',c:{ground:'#f3f2ee',sheet:'#ffffff',ink:'#1f2638',accent:'#24366e',gold:'#a88a50',pagefg:'#eef0f6',paper:'#26386f',paperB:'#1c2b58',paperC:'#5b6fa6'}},
    {k:'hitam',n:'Hitam',desc:'Black papercut on ivory',c:{ground:'#f2ebdd',sheet:'#fbf7ef',ink:'#221d1a',accent:'#9a1b2b',gold:'#a88a50',pagefg:'#f2ebdd',paper:'#1f1b19',paperB:'#2c2724',paperC:'#6b5f58'}},
    {k:'putih',n:'Putih',desc:'White papercut on lacquer red',c:{ground:'#8e1222',sheet:'#fbf6ee',ink:'#3a2420',accent:'#a3162c',gold:'#d6b05c',pagefg:'#8e1222',gi:'#fbf1e2',ga:'#fff6e8',paper:'#fbf4e8',paperB:'#efe4d2',paperC:'#e8cfc0'}},
    {k:'jed',n:'Jed',desc:'Jade papercut on celadon',c:{ground:'#eef3ec',sheet:'#fbfdf9',ink:'#22302a',accent:'#2d6a50',gold:'#a88a50',pagefg:'#f2f7f1',paper:'#2f6f55',paperB:'#255a45',paperC:'#78a892'}},
    {k:'ungu',n:'Ungu',desc:'Plum papercut on lilac',c:{ground:'#f1ecf4',sheet:'#fdfafe',ink:'#2f2a35',accent:'#6e2c6a',gold:'#a88a50',pagefg:'#f7f1f8',paper:'#6e2c6a',paperB:'#5a2257',paperC:'#a874a4'}},
  ]});
