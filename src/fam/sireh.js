/* sireh: the tepak sireh, an engraved brass betel box built in CSS 3D and seen at a slight angle.
   Cover: the closed box on velvet, its lid worked in repoussé; touching it slides the lid back to show the
   velvet-lined compartments with their cembul. Page: the open tepak, names engraved inside the upright lid.
   Skin: cream cards on velvet with brass plaque headings. */
let uid=0;
const f1=v=>(+v).toFixed(1);
// raised (repoussé) linework: a light copy above, a dark copy below, the line itself in the middle
const emb=(d,w0=1,w=w0*1.5)=>`<path d="${d}" class="ts-hi" stroke-width="${w}" transform="translate(-.5 -.6)"/><path d="${d}" class="ts-lo" stroke-width="${w}" transform="translate(.5 .6)"/><path d="${d}" class="ts-mid" stroke-width="${w*.8}"/>`;
// a flower made of embossed petals
function rose(cx,cy,R){let s='';
  for(const [r,n,w,rot] of [[R,8,R*.42,0],[R*.66,8,R*.3,22.5],[R*.38,6,R*.2,0]]){for(let i=0;i<n;i++){const a=rot+i*360/n,d=`M${cx} ${cy}q${f1(w)} ${f1(-r*.55)} 0 ${f1(-r)}q${f1(-w)} ${f1(r*.45)} 0 ${f1(r)}`;s+=`<g transform="rotate(${f1(a)} ${cx} ${cy})">${emb(d,.9)}</g>`}}
  return s+`<circle cx="${cx}" cy="${cy}" r="${f1(R*.14)}" class="ts-boss"/>`}
// a curling leaf scroll (sulur), mirrored with s=-1
const scroll=(x,y,s,k=1)=>{const d=`M${x} ${y}c${f1(s*14*k)} ${f1(-12*k)} ${f1(s*34*k)} ${f1(-10*k)} ${f1(s*42*k)} ${f1(2*k)}c${f1(s*6*k)} ${f1(9*k)} ${f1(-s*2*k)} ${f1(18*k)} ${f1(-s*10*k)} ${f1(14*k)}c${f1(-s*6*k)} ${f1(-3*k)} ${f1(-s*4*k)} ${f1(-10*k)} ${f1(s*2*k)} ${f1(-9*k)}`;
  const lf=`M${f1(x+s*20*k)} ${f1(y-8*k)}q${f1(s*2*k)} ${f1(-10*k)} ${f1(s*12*k)} ${f1(-12*k)}q${f1(-s*2*k)} ${f1(9*k)} ${f1(-s*12*k)} ${f1(12*k)}M${f1(x+s*8*k)} ${f1(y-4*k)}q${f1(-s*1*k)} ${f1(-9*k)} ${f1(s*6*k)} ${f1(-14*k)}`;
  return emb(d,1)+emb(lf,.8)};
const beads=(x0,x1,y,n)=>Array.from({length:n},(_,i)=>`<circle cx="${f1(x0+(x1-x0)*i/(n-1))}" cy="${y}" r=".9"/>`).join('');
const beadsV=(x,y0,y1,n)=>Array.from({length:n},(_,i)=>`<circle cx="${x}" cy="${f1(y0+(y1-y0)*i/(n-1))}" r=".9"/>`).join('');
// lid top, flat; CSS lays it down in 3D
function lidTop(){return `<svg viewBox="0 0 268 178" preserveAspectRatio="none">
  <rect x="5" y="5" width="258" height="168" class="ts-eng" stroke-width="1.1"/><rect x="10" y="10" width="248" height="158" class="ts-eng" stroke-width=".6"/>
  <g class="ts-bead">${beads(16,252,16,48)}${beads(16,252,162,48)}${beadsV(16,22,156,27)}${beadsV(252,22,156,27)}</g>
  <rect x="22" y="22" width="224" height="134" class="ts-eng" stroke-width=".6"/>
  ${[[22,22,0],[246,22,90],[246,156,180],[22,156,270]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})">${emb('M0 26Q2 2 26 0M0 16Q4 4 16 0',.8)}<circle cx="8" cy="8" r="2.4" class="ts-boss"/></g>`).join('')}
  ${rose(134,89,34)}${scroll(98,96,-1,1.05)}${scroll(170,96,1,1.05)}${scroll(98,82,-1,.7)}${scroll(170,82,1,.7)}
  ${emb('M134 40v-10M134 138v10M118 46l-6-8M150 46l6-8M118 132l-6 8M150 132l6 8',.8)}
  </svg>`}
// front face, with its engraved bands and a lock plate
function front(){return `<svg viewBox="0 0 260 76" preserveAspectRatio="none">
  <rect x="3" y="3" width="254" height="70" class="ts-eng" stroke-width=".9"/><rect x="7" y="7" width="246" height="62" class="ts-eng" stroke-width=".5"/>
  <g class="ts-bead">${beads(10,250,66,40)}</g>
  ${Array.from({length:13},(_,i)=>`<path d="M${12+i*18.6} 59l9.3-9 9.3 9" class="ts-eng" stroke-width=".6"/><path d="M${18.2+i*18.6} 59l3.1-3 3.1 3" class="ts-eng" stroke-width=".5"/>`).join('')}
  ${scroll(104,40,-1,.82)}${scroll(156,40,1,.82)}
  <path d="M130 14l18 15-18 15-18-15z" class="ts-plate"/><path d="M130 19l12 10-12 10-12-10z" class="ts-eng" stroke-width=".6"/><path d="M130 25v8M128 33h4" class="ts-eng" stroke-width="1.2"/>
  </svg>`}
const side=()=>`<svg viewBox="0 0 160 76" preserveAspectRatio="none"><rect x="3" y="3" width="154" height="70" class="ts-eng" stroke-width=".9"/><rect x="7" y="7" width="146" height="62" class="ts-eng" stroke-width=".5"/>${scroll(80,44,-1,.7)}${scroll(80,44,1,.7)}<g class="ts-bead">${beads(10,150,66,24)}</g></svg>`;
// a cembul seen from above: brass pot with a domed, engraved lid
function cembul(cx,cy,r,id){return `<ellipse cx="${cx+3}" cy="${cy+5}" rx="${r}" ry="${r}" class="ts-csh"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#tsr${id})"/><circle cx="${cx}" cy="${cy}" r="${f1(r*.86)}" class="ts-eng" stroke-width=".6"/>
  <g class="ts-bead">${K.ring(16,r*.74,cx,cy).map(([x,y])=>`<circle cx="${f1(x)}" cy="${f1(y)}" r=".7"/>`).join('')}</g>
  ${K.ring(8,r*.38,cx,cy).map(([x,y,a])=>`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r*.12)}" ry="${f1(r*.26)}" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(x)} ${f1(y)})" class="ts-eng" stroke-width=".6"/>`).join('')}
  <circle cx="${cx}" cy="${cy}" r="${f1(r*.16)}" fill="url(#tsr${id})" class="ts-knob"/>`}
// heart-shaped betel leaf
const leaf=(x,y,r,s)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0 22C-14 12-20 0-16-10-12-18-4-18 0-12 4-18 12-18 16-10 20 0 14 12 0 22Z" class="ts-leaf"/><path d="M0 20V-12M0 6l-9-6M0 6l9-6M0-2l-8-7M0-2l8-7" class="ts-vein"/></g>`;
function floor(id){return `<svg viewBox="0 0 260 170" preserveAspectRatio="none"><defs><radialGradient id="tsr${id}" cx=".35" cy=".3" r=".8"><stop offset="0" style="stop-color:color-mix(in srgb,var(--gold) 45%,#fff)"/><stop offset=".55" style="stop-color:var(--gold)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--gold) 45%,#000)"/></radialGradient></defs>
  ${cembul(40,40,22,id)}${cembul(100,40,22,id)}${cembul(160,40,22,id)}${cembul(220,40,22,id)}
  ${leaf(70,118,-28,1.25)}${leaf(92,112,-10,1.3)}${leaf(116,112,12,1.3)}${leaf(138,118,30,1.25)}
  <g transform="translate(196 120) rotate(-18)" class="ts-kacip"><path d="M-30 2C-18-4 4-6 26-2c3 1 3 4 0 5C6 6-16 6-30 2Z"/><path d="M-30 6C-16 12 6 12 22 10c3 0 3 3 0 4C4 18-18 16-30 6Z"/><circle cx="-24" cy="4" r="2.4" class="ts-knob"/></g>
  <circle cx="176" cy="148" r="6" class="ts-nut"/><circle cx="190" cy="152" r="5" class="ts-nut"/><path d="M172 146q4-3 8 0M186 150q4-3 7 0" class="ts-vein"/>
  </svg>`}
const SPRIG=`<svg class="ts-sprig" viewBox="-48 -15 96 30"><path d="M-46 0H-22M46 0H22"/><g transform="translate(-9 -1) rotate(-62) scale(.55)"><path d="M0 22C-14 12-20 0-16-10-12-18-4-18 0-12 4-18 12-18 16-10 20 0 14 12 0 22Z"/><path d="M0 20V-12M0 6l-8-5M0 6l8-5"/></g><g transform="translate(9 -1) rotate(62) scale(.55)"><path d="M0 22C-14 12-20 0-16-10-12-18-4-18 0-12 4-18 12-18 16-10 20 0 14 12 0 22Z"/><path d="M0 20V-12M0 6l-8-5M0 6l8-5"/></g><circle r="2.2"/><circle cx="-22" r="1.2"/><circle cx="22" r="1.2"/></svg>`;
function box(lid){const id=++uid;return `<div class="ts-box"><i class="ts-f ts-shadow"></i>
  <i class="ts-f ts-pl ts-plt"></i><i class="ts-f ts-pl ts-plf"></i><i class="ts-f ts-pl ts-plr"></i><i class="ts-f ts-pl ts-pll"></i><i class="ts-f ts-floor">${floor(id)}</i><i class="ts-f ts-inback"></i><i class="ts-f ts-inl"></i><i class="ts-f ts-inr"></i><i class="ts-f ts-div"></i>
  <i class="ts-f ts-front">${front()}</i><i class="ts-f ts-right">${side()}</i><i class="ts-f ts-left">${side()}</i>
  <i class="ts-f ts-rimf"></i><i class="ts-f ts-rimb"></i>
  ${lid?`<div class="ts-lid"><i class="ts-f ts-ltop">${lidTop()}</i><i class="ts-f ts-lfront"></i><i class="ts-f ts-lr"></i><i class="ts-f ts-ll"></i></div>`:''}</div>`}
const plateSvg=()=>`<svg class="ts-pf" viewBox="0 0 300 330" preserveAspectRatio="none"><path d="M16 4H284L296 16V314L284 326H16L4 314V16Z" class="ts-eng" stroke-width="1.2"/><path d="M20 10H280L290 20V310L280 320H20L10 310V20Z" class="ts-eng" stroke-width=".6"/>
  <g class="ts-bead">${beads(26,274,16,46)}${beads(26,274,314,46)}</g>
  ${[[22,22,0],[278,22,90],[278,308,180],[22,308,270]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})">${emb('M0 34Q3 3 34 0M0 20Q5 5 20 0',.8)}<circle cx="9" cy="9" r="2.6" class="ts-boss"/></g>`).join('')}
  <g transform="translate(0 -4)">${scroll(146,42,-1,.8)}${scroll(154,42,1,.8)}</g><g transform="translate(0 288) scale(1 -1) translate(0 -40)">${scroll(146,42,-1,.8)}${scroll(154,42,1,.8)}</g></svg>`;
FAMILY({key:'sireh',name:'Tepak Sireh',meaning:'Brass betel box',
  blurb:'An engraved brass tepak sireh on velvet; its repoussé lid slides back to show the cembul inside and your names engraved in the lid.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-sireh ${c.lt?'ts-lt':''}" style="--lining:${c.lining||c.accent}"><div class="ts-velvet"></div><i class="ts-spot"></i>
     <div class="ts-plate reveal">${plateSvg()}<div class="ts-in">
      <p class="ts-k">${ev(o,L)}</p><h1 class="ts-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
      <p class="ts-date">${esc(fmtDate(o.date,o.lang))}</p></div></div>
     <div class="ts-stage ts-open reveal d1">${box(false)}</div>
     <p class="ts-ven reveal d2">${esc(o.venue)}</p><p class="ts-time reveal d3">${en?'from':'jam'} ${esc(fmtTime(o.start,o.lang))}</p></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-sireh ${c.lt?'ts-lt':''}" style="--lining:${c.lining||c.accent}"><div class="ts-velvet"></div><i class="ts-spot"></i><i class="ts-frame"></i>
     <div class="ts-head"><p class="ts-k">${ev(o,L)}</p><p class="ts-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="ts-d">${esc(fmtDate(o.date,o.lang))}</p>${SPRIG}</div>
     <${tag} class="ts-stage" ${attr} aria-label="${L.open}">${box(true)}</${tag}>
     <div class="ts-foot">${guest?`<p class="ts-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="ts-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);if(th.c.lt)el.classList.add('ts-lt');
    $$('.sec h2',el).forEach(h=>{h.classList.add('ts-plq');h.innerHTML=`<span>${h.innerHTML}</span>`})},
  themes:[
    {k:'merah',n:'Merah',desc:'Brass tepak on crimson velvet',c:{ground:'#3b0d13',sheet:'#fbf3e3',ink:'#2c211b',accent:'#8e1b26',gold:'#c9a24e',pagefg:'#f3e3c3'}},
    {k:'zamrud',n:'Zamrud',desc:'Brass on emerald velvet',c:{ground:'#0c2a20',sheet:'#f8f4e8',ink:'#1f2a24',accent:'#1d6449',gold:'#cfa851',pagefg:'#efe6cc'}},
    {k:'nila',n:'Nila',desc:'Brass on midnight-blue velvet',c:{ground:'#121935',sheet:'#f7f4ec',ink:'#1e2236',accent:'#2b3d7c',gold:'#cda75a',pagefg:'#ece6d6'}},
    {k:'ungu',n:'Ungu',desc:'Brass on plum velvet',c:{ground:'#2a1230',sheet:'#fbf5f8',ink:'#2d2230',accent:'#6a2a6b',gold:'#cfa65a',pagefg:'#f2e6f0'}},
    {k:'perak',n:'Perak',desc:'A silver tepak on slate velvet',c:{ground:'#1c252d',sheet:'#f6f6f3',ink:'#1f262c',accent:'#3d5a6e',gold:'#b9bec4',pagefg:'#e8ecef',lining:'#6e1f2c'}},
    {k:'hitam',n:'Hitam',desc:'Brass and garnet on black',c:{ground:'#0f0d0c',sheet:'#1d1a17',ink:'#efe5d1',accent:'#d7b46a',gold:'#c9a252',pagefg:'#efe5d1',line:'rgba(239,229,209,.2)',lining:'#6a1622'}},
    {k:'gading',n:'Gading',desc:'Brass on ivory linen, red lining',c:{ground:'#e6dbc4',sheet:'#fffaf0',ink:'#3a3027',accent:'#8a2a2e',gold:'#b8923f',pagefg:'#3a3027',lt:1}},
    {k:'jambu',n:'Jambu',desc:'Brass on blush linen, rose lining',c:{ground:'#ecd5cf',sheet:'#fff9f5',ink:'#3b2a2a',accent:'#a3485e',gold:'#b58f4a',pagefg:'#3b2a2a',lt:1}},
  ]});
