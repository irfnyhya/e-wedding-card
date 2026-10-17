/* wayang: the kelir screen of the Kelantan shadow play, glowing amber from the lamp behind it.
   Only the gunungan (the tree-of-life mountain leaf) is shown, in pierced-leather lattice; no figures.
   Cover: the gunungan stands on the screen; touching it lifts it up and away as the lamplight warms.
   Page: a smaller gunungan with the names printed on the screen. Skin: amber screen cards with dark pierced borders. */
let uid=0;
const f1=v=>(+v).toFixed(1);
// the leaf outline from a half-width profile, so the edge flames and inner borders can follow it
const W=t=>t<.62?92*Math.pow(Math.sin(t/.62*Math.PI/2),1.55)+.4:92-34*Math.pow((t-.62)/.38,1.6);
const Y=t=>4+268*t;
const OUT=edge(1)+'Z';
function edge(k){let r='';for(let i=0;i<=60;i++){const t=i/60;r+=`${i?'L':'M'}${f1(100+W(t)*k)} ${f1(Y(t))}`}let l='';for(let i=60;i>=0;i--){const t=i/60;l+=`L${f1(100-W(t)*k)} ${f1(Y(t))}`}return r+l}
function flames(){let d='';for(let i=3;i<58;i+=2){const t=i/60,t2=(i+1)/60,x=W(t),y=Y(t),dx=W(t2)-x,dy=Y(t2)-y,L=Math.hypot(dx,dy),nx=dy/L,ny=-dx/L;
  for(const s of [1,-1]){const bx=100+s*x,tx=bx+s*nx*6+dx*.5,ty=y+ny*6+dy*.5;d+=`M${f1(bx)} ${f1(y)}Q${f1(bx+s*nx*2)} ${f1(y+ny*2-1.5)} ${f1(tx)} ${f1(ty)}Q${f1(bx+s*nx*1.5+dx*.6)} ${f1(y+ny*1.5+dy*.6)} ${f1(100+s*W(t2+.004))} ${f1(Y(t2+.004))}`}}return d}
// spiral branch, s = side
function branch(x0,y0,s,L,turn){let d=`M${x0} ${y0}`;let x=x0,y=y0,a=-Math.PI/2+s*1.15,st=L/16;const pts=[];
  for(let i=0;i<22;i++){const k=i/22;a+=s*(.02+k*k*turn*1.6);const r=st*(1-k*.55);x+=Math.cos(a)*r;y+=Math.sin(a)*r;d+=`L${f1(x)} ${f1(y)}`;pts.push([x,y,a])}
  return {d,pts}}
function gunungan(small){const id=++uid,R=rng(11);let br='',lv='';
  for(const [y,L,tu] of [[64,50,.4],[100,84,.36],[142,104,.34],[184,96,.38]])for(const s of [-1,1]){const b=branch(100,y,s,L,tu);br+=b.d;
    b.pts.forEach(([x,y2,a],i)=>{if(i%2!==1||i>19)return;const deg=a*180/Math.PI;lv+=`<path d="M0 0q2.6-5 0-10q-2.6 5 0 10z" transform="translate(${f1(x)} ${f1(y2)}) rotate(${f1(deg+s*(((i-1)/2)%2?55:-55)-90+180)})"/>`})}
  const awan=s=>`<path d="M${100+s*14} 232c${s*10} -2 ${s*22} -10 ${s*20} -22c${-s*2} -9 ${-s*14} -10 ${-s*16} -2c${-s*1} 6 ${s*6} 8 ${s*8} 3" class="wy-br"/><path d="M${100+s*40} 238c${s*8} -2 ${s*16} -10 ${s*14} -18c${-s*2} -6 ${-s*10} -6 ${-s*11} 0" class="wy-br"/>`;
  return `<svg class="wy-g" viewBox="-12 -6 224 344"><defs><clipPath id="wyc${id}"><path d="${edge(.9)}Z"/></clipPath>
   <pattern id="wyp${id}" width="5" height="4.4" patternUnits="userSpaceOnUse"><circle cx="1.25" cy="1.1" r=".62"/><circle cx="3.75" cy="3.3" r=".62"/></pattern></defs>
   <path d="M98.4 280V336M101.6 280V336" class="wy-rod"/><path d="M100 300l3 4-3 4-3-4z" class="wy-sil"/>
   <path d="${flames()}" class="wy-sil"/>
   <path d="${OUT}" class="wy-sil"/>
   <g class="wy-cut">
    <rect x="0" y="0" width="200" height="290" fill="url(#wyp${id})" clip-path="url(#wyc${id})" class="wy-lat"/>
    <path d="${edge(.955)}" class="wy-holes"/><path d="${edge(.91)}" class="wy-slit"/>
    <path d="M100 236C98 206 103 180 99 150C96 120 102 90 100 40" class="wy-trunk"/>
    <path d="M100 236C98 206 103 180 99 150C96 120 102 90 100 40" class="wy-trunkh"/>
    <path d="${br}" class="wy-br"/><g class="wy-lv">${lv}</g>${awan(1)}${awan(-1)}
    <path d="M100 18l5 8-5 8-5-8z"/><circle cx="100" cy="12" r="2.2"/>
   </g>
   <path d="M62 272V232H138V272Z" class="wy-sil"/><path d="M54 232L68 218H132L146 232ZM68 218L80 207H120L132 218ZM80 207L93 196H107L120 207Z" class="wy-sil"/>
   <g class="wy-cut"><path d="M58 230.5L69 220H131L142 230.5M71 216L81 209H119L129 216M83 205L94 198H106L117 205" class="wy-slit"/>
    <path d="M60 232H140M70 218H130M82 207H118" class="wy-holes"/>
    <path d="M70 268V240H96V268ZM104 268V240H130V268Z" class="wy-door"/>
    <path d="M83 246l6 8-6 8-6-8zM117 246l6 8-6 8-6-8z" class="wy-door"/><circle cx="100" cy="190" r="2"/></g>
   <path d="M44 272H156V280H44Z" class="wy-sil"/><path d="M36 280H164V288H36Z" class="wy-sil"/><g class="wy-cut"><path d="M48 276H152M40 284H160" class="wy-holes"/></g>
  </svg>`}
const PIERCE=c=>svgUriSq(`<svg ${NS} width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" fill="${c.ink}"/><path d="M8 3.2l2.2 4.8L8 12.8 5.8 8z" fill="${c.sheet}" opacity=".85"/><circle cx="0" cy="0" r="1" fill="${c.sheet}" opacity=".75"/><circle cx="16" cy="0" r="1" fill="${c.sheet}" opacity=".75"/><circle cx="0" cy="16" r="1" fill="${c.sheet}" opacity=".75"/><circle cx="16" cy="16" r="1" fill="${c.sheet}" opacity=".75"/><circle cx="8" cy="0" r=".6" fill="${c.sheet}" opacity=".6"/><circle cx="0" cy="8" r=".6" fill="${c.sheet}" opacity=".6"/></svg>`);
const KAWUNG=c=>svgUriSq(`<svg ${NS} width="22" height="22" viewBox="0 0 22 22"><g fill="none" stroke="${c.gold}" stroke-width=".7" opacity=".55"><ellipse cx="11" cy="5.5" rx="3" ry="4.6"/><ellipse cx="11" cy="16.5" rx="3" ry="4.6"/><ellipse cx="5.5" cy="11" rx="4.6" ry="3"/><ellipse cx="16.5" cy="11" rx="4.6" ry="3"/></g><circle cx="11" cy="11" r=".9" fill="${c.gold}" opacity=".6"/></svg>`);
const vars=c=>`--wy-pierce:${PIERCE(c)};--wy-kaw:${KAWUNG(c)};--wy-gn:${c.gn||c.gold}`;
FAMILY({key:'wayang',name:'Wayang Kulit',meaning:'Shadow-play screen',
  blurb:'A kelir screen glowing amber from the lamp behind it, with a gunungan in pierced-leather lattice that rises away when touched.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-wayang" style="${vars(c)}"><i class="wy-wood"></i><div class="wy-scr"><i class="wy-glow"></i><i class="wy-cloth"></i>
     <div class="wy-mini reveal">${gunungan(true)}</div>
     <p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="wy-rule reveal d2"><i></i><b></b><i></i></div>
     <p class="wy-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="wy-ven reveal d3">${esc(o.venue)} · ${esc(fmtTime(o.start,o.lang))}</p></div>
     <i class="wy-trunkbar"></i></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-wayang" style="${vars(c)}"><i class="wy-wood"></i>
     <div class="wy-val"><span>${ev(o,L)}</span></div>
     <div class="wy-scr"><i class="wy-glow"></i><i class="wy-warm"></i><i class="wy-cloth"></i>
      <${tag} class="wy-lift" ${attr} aria-label="${L.open}">${gunungan(false)}</${tag}>
      <div class="wy-nm"><p class="wy-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="wy-d">${esc(fmtDate(o.date,o.lang))}</p></div></div>
     <i class="wy-trunkbar"></i>
     <div class="wy-foot">${guest?`<p class="wy-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="wy-hint">${en?'Touch the gunungan to begin':'Sentuh gunungan untuk bermula'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.cssText+=';'+vars(th.c)},
  themes:[
    {k:'merah',n:'Merah',desc:'Amber screen, red valance, night-dark frame',c:{ground:'#1a0f0a',sheet:'#f7e3b9',ink:'#26140b',accent:'#8c1f1c',gold:'#d9a441',pagefg:'#f3e2c0'}},
    {k:'biru',n:'Biru',desc:'Amber screen in an indigo night',c:{ground:'#0b1323',sheet:'#f4e6c4',ink:'#141a2b',accent:'#24406e',gold:'#d6a64b',pagefg:'#eae2cf'}},
    {k:'hijau',n:'Hijau',desc:'Lamplight with forest-green cloth',c:{ground:'#0d1911',sheet:'#f0e3bd',ink:'#13200f',accent:'#2f5d3a',gold:'#cfa24a',pagefg:'#e9e2c8'}},
    {k:'senja',n:'Senja',desc:'Rose-amber screen at dusk',c:{ground:'#28101e',sheet:'#f9ddc2',ink:'#2a1220',accent:'#8a2c4c',gold:'#e0a65a',pagefg:'#f6e0d6'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric-gold screen, umber frame',c:{ground:'#3a2306',sheet:'#fbe7a8',ink:'#2b1906',accent:'#a3601a',gold:'#e8b640',pagefg:'#fbedc9'}},
    {k:'gading',n:'Gading',desc:'Pale screen in an ivory frame',c:{ground:'#e6d9bf',sheet:'#fff3d9',ink:'#2d2116',accent:'#7a3b22',gold:'#b88a3e',pagefg:'#2d2116',gn:'#7a3b22'}},
    {k:'malam',n:'Malam',desc:'A single lamp in deep black',c:{ground:'#060607',sheet:'#ead6a6',ink:'#0d0b09',accent:'#4a3a2a',gold:'#c79b49',pagefg:'#e9dcc0'}},
    {k:'ungu',n:'Ungu',desc:'Amber light, plum cloth',c:{ground:'#1c1028',sheet:'#f3e1c6',ink:'#1e1129',accent:'#5b2d7a',gold:'#d4a457',pagefg:'#ede0ee'}},
  ]});
