/* nouveau: an Art Nouveau panel in the manner of a Mucha poster, without a figure.
   A round-topped arch in fine gold-foil linework: whiplash stems, stylised lilies climbing the side columns,
   poppies at their feet, a mosaic halo framing the names and a dark lettering panel below.
   Cover: touching the halo turns it a little while the whole arch lifts away. Page: a taller arch round the names.
   Skin: arched paper cards with whiplash flourishes either side of each heading. */
needFont('Federo');
const W=300;
const f1=v=>(+v).toFixed(1);
// one stylised lily (three recurved petals, stamens), drawn pointing up from 0,0
const LILY='M0 0C-2.6-7-3.4-15 0-24C3.4-15 2.6-7 0 0Z M0 0C-4-5-9.5-9.5-13-17C-14.5-20.5-18.5-21-19.6-18.4C-20.4-16.4-18-15-16.6-16.6 M0 0C4-5 9.5-9.5 13-17C14.5-20.5 18.5-21 19.6-18.4C20.4-16.4 18-15 16.6-16.6 M-1.6-3C-6-8-8.8-12-9.6-15.6 M1.6-3C6-8 8.8-12 9.6-15.6 M-2-6L-5-20M2-6L5-20M0-5V-21';
const LILYFILL='M0 0C-2.6-7-3.4-15 0-24C3.4-15 2.6-7 0 0Z M0 0C-4-5-9.5-9.5-13-17C-14-19.5-16-19.6-16.6-16.6C-12-10-6-4 0 0Z M0 0C4-5 9.5-9.5 13-17C14-19.5 16-19.6 16.6-16.6C12-10 6-4 0 0Z';
const STAMEN=[[-5,-20],[5,-20],[0,-21]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="1.1" ry="1.9"/>`).join('');
// a poppy seen from the side: a cup of four round petals with a crown on the pod
const POPPY='M0 0C-11-1-15-13-8-18C-6-23 1-24 3-19C8-23 15-18 12-11C17-6 11 1 0 0Z M-8-18C-3-12-2-6 0 0 M3-19C3-12 2-6 0 0 M12-11C7-7 4-4 0 0';
const POPPYFILL='M0 0C-11-1-15-13-8-18C-6-23 1-24 3-19C8-23 15-18 12-11C17-6 11 1 0 0Z';
const BLADE='M0 0C-5-9-4-22 2-32C3-21 3-10 0 0Z';
// a corner flourish: a whiplash that winds into a tight curl
const CURL='M0 0C10 2 22 10 26 22C29 31 22 37 16 33C11 30 14 23 19 25';

function frame(H,uid,c){
  const AY=160,R=106,PY=H-122,cx=150;   // arch centre, radius, foot of the arch
  const arch=(r,x0=cx-r,x1=cx+r)=>`M${x0} ${PY}V${AY}A${r} ${r} 0 0 1 ${x1} ${AY}V${PY}`;
  const lilyAt=(x,y,r,s)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="${LILY}"/></g>`;
  const L1=[25,AY-74,28,1.05],L2=[38,PY-142,38,.8],L3=[16,PY-196,-24,.62];
  const sideL=`
   <path d="M25 ${PY-8}C33 ${PY-50} 17 ${PY-92} 25 ${PY-132}S35 ${AY+34} 24 ${AY-8}S19 ${AY-56} 25 ${AY-74}"/>
   <path d="M24 ${PY-124}C30 ${PY-132} 34 ${PY-136} 38 ${PY-142}" stroke-width=".8"/>
   <path d="M22 ${PY-150}C18 ${PY-166} 18 ${PY-182} 16 ${PY-196}" stroke-width=".8"/>
   <path d="M29 ${PY-8}C20 ${PY-56} 33 ${PY-96} 29 ${PY-138}" stroke-width=".6"/>
   <g transform="translate(25 ${PY-110}) rotate(-14)"><path d="${BLADE}"/><path d="M0 0C-1-10-0-20 1.6-30" stroke-width=".5"/></g>
   <g transform="translate(27 ${PY-52}) rotate(16) scale(1.1)"><path d="${BLADE}"/><path d="M0 0C1-10 1.4-20 1.6-30" stroke-width=".5"/></g>
   <g transform="translate(24 ${AY+30}) rotate(-6) scale(.85)"><path d="${BLADE}"/></g>
   ${lilyAt(...L1)}${lilyAt(...L2)}${lilyAt(...L3)}
   <g transform="translate(22 ${PY-6}) scale(1.15)"><path d="${POPPY}"/></g>
   <g transform="translate(33 ${PY-30}) rotate(24) scale(.5)"><path d="M0 0C-5-4-5-12 0-16C5-12 5-4 0 0Z"/></g>
   <path d="M14 ${AY-88}C30 ${AY-112} 50 ${AY-136} 84 ${AY-144}C108 ${AY-150} 128 ${AY-142} 127 ${AY-131}C126 ${AY-123} 116 ${AY-124} 117 ${AY-130}C118 ${AY-134} 122 ${AY-134} 122 ${AY-131}"/>
   <path d="M14 ${AY-104}C26 ${AY-122} 42 ${AY-140} 66 ${AY-146}" stroke-width=".6"/>
   <path d="M40 ${AY-96}C50 ${AY-114} 70 ${AY-128} 96 ${AY-128}" stroke-width=".6"/>
   ${[[52,AY-131],[62,AY-136],[73,AY-139]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".9"/>`).join('')}
   <g transform="translate(12 12)"><path d="${CURL}"/></g>`;
  const corner=(x,y,sx,sy)=>`<g transform="translate(${x} ${y}) scale(${sx} ${sy})"><path d="M0 0H14M0 0V14" stroke-width="1.2"/><circle cx="5.5" cy="5.5" r="1.6"/></g>`;
  // the bottom lettering panel with notched corners
  const panel=(i)=>{const x0=18+i,x1=282-i,y0=PY+8+i,y1=H-20-i,n=8;return `M${x0+n} ${y0}H${x1-n}A${n} ${n} 0 0 0 ${x1} ${y0+n}V${y1-n}A${n} ${n} 0 0 0 ${x1-n} ${y1}H${x0+n}A${n} ${n} 0 0 0 ${x0} ${y1-n}V${y0+n}A${n} ${n} 0 0 0 ${x0+n} ${y0}Z`};
  const finial=`<g transform="translate(150 ${AY-R-8})"><path d="M0 0C-3-6-3-13 0-19C3-13 3-6 0 0Z"/><path d="M0-1C-6-5-12-5-16-1C-19 2-23 1-23-2M0-1C6-5 12-5 16-1C19 2 23 1 23-2" stroke-width=".8"/><circle cy="-23" r="1.5"/></g>`;
  const under=`<path d="M150 ${AY+118}C138 ${AY+118} 120 ${AY+122} 104 ${AY+134}C92 ${AY+143} 80 ${AY+140} 82 ${AY+131}C84 ${AY+124} 92 ${AY+126} 91 ${AY+131}" stroke-width=".8"/>
   <path d="M150 ${AY+118}C162 ${AY+118} 180 ${AY+122} 196 ${AY+134}C208 ${AY+143} 220 ${AY+140} 218 ${AY+131}C216 ${AY+124} 208 ${AY+126} 209 ${AY+131}" stroke-width=".8"/><path d="M150 ${AY+113}l3 5-3 5-3-5z" stroke-width=".7"/>`;
  const line=`<svg ${NS} viewBox="0 0 ${W} ${H}" fill="none" stroke="#000" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">
   <rect x="3.5" y="3.5" width="293" height="${H-7}" stroke-width="1.5"/><rect x="8" y="8" width="284" height="${H-16}" stroke-width="1.7" stroke-dasharray="0 5.2"/><rect x="12" y="12" width="276" height="${H-24}" stroke-width=".6"/>
   <path d="${arch(R+6)}" stroke-width="1.5"/><path d="${arch(R)}" stroke-width=".7"/><path d="${arch(R-4)}" stroke-width=".9" stroke-dasharray="0 3.4"/>
   <path d="M12 ${PY}H${cx-R-6}M${cx+R+6} ${PY}H288" stroke-width=".6"/>
   ${sideL}<g transform="translate(300 0) scale(-1 1)">${sideL}</g>
   ${finial}${under}
   <path d="${panel(0)}" stroke-width="1.4"/><path d="${panel(4)}" stroke-width=".6"/>
   ${corner(26,PY+16,1,1)}${corner(274,PY+16,-1,1)}${corner(26,H-28,1,-1)}${corner(274,H-28,-1,-1)}
   <g transform="translate(150 ${PY+8})"><path d="M-22 0C-14 0-8-5 0-9C8-5 14 0 22 0" stroke-width=".9"/><circle cy="-3.2" r="1.4"/></g>
  </svg>`;
  const lf=[L1,L2,L3].map(([x,y,r,s])=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="${LILYFILL}"/></g>`).join(''),
   st=[L1,L2,L3].map(([x,y,r,s])=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${STAMEN}</g>`).join(''),
   pf=`<g transform="translate(22 ${PY-6}) scale(1.15)"><path d="${POPPYFILL}"/></g>`,
   lv=`<g transform="translate(25 ${PY-110}) rotate(-14)"><path d="${BLADE}"/></g><g transform="translate(27 ${PY-52}) rotate(16) scale(1.1)"><path d="${BLADE}"/></g><g transform="translate(24 ${AY+30}) rotate(-6) scale(.85)"><path d="${BLADE}"/></g>`,
   M=s=>`${s}<g transform="translate(300 0) scale(-1 1)">${s}</g>`;
  const fill=`<svg class="nv-fill" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>
    <radialGradient id="ng${uid}" cx="50%" cy="${(AY/H*100).toFixed(0)}%" r="72%"><stop offset="0" stop-color="${c.sheet}"/><stop offset=".55" stop-color="${c.sheet}"/><stop offset="1" stop-color="${c.nvtint}"/></radialGradient>
    <linearGradient id="nc${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.nvcol}" stop-opacity=".5"/><stop offset="1" stop-color="${c.nvcol}"/></linearGradient></defs>
   <rect width="${W}" height="${H}" fill="${c.sheet}"/>
   <path d="M12 12H288V${PY}H12Z" fill="url(#nc${uid})"/>
   <path d="${arch(R+6)}Z" fill="${c.sheet}"/><path d="${arch(R)}Z" fill="url(#ng${uid})"/>
   <g fill="${c.accent}" opacity=".18">${M(lv)}</g>
   <g fill="${c.sheet}">${M(lf)}</g><g fill="${c.gold}" opacity=".9">${M(st)}</g>
   <g fill="${c.accent}" opacity=".32">${M(pf)}</g><circle cx="150" cy="${AY}" r="${R}" fill="${c.gold}" opacity=".1"/>
   <path d="${panel(0)}" fill="${c.accent}"/></svg>`;
  return {line:svgUriSq(line),fill,AY,PY,R};
}
// the mosaic halo: five rings of small tesserae set in a pattern, gold rules, a lobed outer edge and a scalloped inner rim
function halo(uid,c){const P=(r,a)=>`${f1(Math.cos(a)*r)} ${f1(Math.sin(a)*r)}`;
  const sec=(r0,r1,a0,a1)=>`M${P(r1,a0)}A${r1} ${r1} 0 0 1 ${P(r1,a1)}L${P(r0,a1)}A${r0} ${r0} 0 0 0 ${P(r0,a0)}Z`;
  const rnd=rng(11);let tiles='';
  const rings=[[92.2,96.4,96,i=>[c.gold,.62+rnd()*.38]],[88,91.6,84,i=>i%6===0?[c.accent,.95]:[c.nvcol,.75+rnd()*.25]],
    [83.2,87.4,72,i=>i%2?[c.accent,.8+rnd()*.2]:[c.gold,.85]],[79,82.6,64,i=>i%8<2?[c.gold,.9]:[c.nvcol,.7+rnd()*.3]],[75.4,78.4,56,i=>[c.accent,.55+rnd()*.4]]];
  rings.forEach(([r0,r1,n,pick],ri)=>{const g=.55/r1,off=ri*.03;for(let i=0;i<n;i++){const a0=i/n*Math.PI*2+g+off,a1=(i+1)/n*Math.PI*2-g+off;const [f,op]=pick(i);
    tiles+=`<path d="${sec(r0,r1,a0,a1)}" fill="${f}" opacity="${f1(op)}"/>`}});
  const lobes=K.scallop(40,97.6,3,0,0);
  const sc=K.scallop(36,71.4,3.2,0,0);
  const dots=K.ring(40,102.2,0,0,-Math.PI/2+Math.PI/40).map(([x,y])=>`<circle cx="${f1(x)}" cy="${f1(y)}" r=".95"/>`).join('');
  return `<svg class="nv-ring" viewBox="-104 -104 208 208"><path d="${lobes}" fill="${c.sheet}" stroke="${c.gold}" stroke-width=".9"/><circle r="96.9" fill="${c.sheet}"/>${tiles}
   <g fill="none" stroke="${c.gold}"><circle r="96.9" stroke-width=".9"/><circle r="74.9" stroke-width="1"/></g>
   <g fill="${c.gold}">${dots}</g>
   <path d="${sc}" fill="${c.sheet}" stroke="${c.gold}" stroke-width=".8"/><circle r="67" fill="none" stroke="${c.accent}" stroke-width=".55" stroke-dasharray="0 2.6" stroke-linecap="round"/><circle r="64" fill="none" stroke="${c.gold}" stroke-width=".4"/></svg>`}
// background wallpaper: a small repeat of lily buds and whiplash tendrils
const PAPER=c=>svgUriSq(`<svg ${NS} width="72" height="72" viewBox="0 0 72 72"><g fill="none" stroke="${c}" stroke-width=".8" opacity=".22" stroke-linecap="round"><path d="M36 64C30 52 42 44 36 32S30 14 36 8"/><path d="M36 8C33 4 33 0 36-4C39 0 39 4 36 8Z"/><path d="M36 40C44 38 50 30 48 24C47 20 42 21 44 25"/><path d="M36 50C28 48 22 40 24 34C25 30 30 31 28 35"/><path d="M0 36C6 30 12 34 10 38M72 36C66 30 60 34 62 38"/></g></svg>`);
let n=0;
FAMILY({key:'nouveau',name:'Nouveau',meaning:'Art Nouveau arch',
  blurb:'A Mucha-style arch in gold foil, with whiplash lilies, poppies and a mosaic halo round your names. Touch the halo and the arch lifts away.',
  fonts:{d:"'Federo', 'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',u=++n,F=frame(560,u,th.c),[a,b]=K.initials(o);
    return `<section class="page pg-nouveau" style="--nvpaper:${PAPER(th.c.gold)}"><div class="nv-card nv-tall reveal" style="--nvline:${F.line}">${F.fill}<i class="nv-line"></i>
     <div class="nv-halo s">${halo(u,th.c)}<span class="nv-ini">${esc(a)}<i>&amp;</i>${esc(b)}</span></div>
     <div class="nv-ptxt"><p class="nv-k">${ev(o,L)}</p><h1 class="names">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1></div>
     <div class="nv-panel"><b>${esc(fmtDate(o.date,o.lang))}</b><span>${esc(o.venue)}</span></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',u=++n,F=frame(520,u,th.c);
    return `<div class="cover cv-nouveau" style="--nvpaper:${PAPER(th.c.gold)}"><div class="nv-bg"></div>
     <div class="nv-card" style="--nvline:${F.line}">${F.fill}<i class="nv-line"></i>
      <${tag} class="nv-halo" ${attr} aria-label="${L.open}">${halo(u,th.c)}<span class="nv-names">${esc(n1)}<i>&amp;</i>${esc(n2)}</span></${tag}>
      <div class="nv-mid">${guest?`<p class="nv-to">${L.dear}</p><p class="nv-guest">${esc(guest)}</p>`:`<p class="nv-to">${en?'Together with their families':'Bersama keluarga tercinta'}</p>`}</div>
      <div class="nv-panel"><span class="nv-ev">${ev(o,L)}</span><b>${esc(fmtDate(o.date,o.lang))}</b></div></div>
     <p class="nv-hint">${en?'Touch the halo to open':'Sentuh lingkaran untuk membuka'}</p></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--nvpaper',PAPER(th.c.gold));
    $$('.sec h2',el).forEach(h=>{h.innerHTML=`<i class="nv-wl"></i><span>${h.innerHTML}</span><i class="nv-wl r"></i>`})},
  themes:[
    {k:'zamrud',n:'Zamrud',desc:'Emerald and gold, ivory paper',c:{ground:'#17322d',sheet:'#f5ecd6',ink:'#28291f',accent:'#2c5446',gold:'#b8914a',pagefg:'#efe3c4',nvcol:'#c9d3b5',nvtint:'#e6e2c6'}},
    {k:'marun',n:'Marun',desc:'Maroon with antique gold',c:{ground:'#3a1820',sheet:'#f7ede0',ink:'#2e2224',accent:'#76232f',gold:'#c39a55',pagefg:'#f3e3cf',nvcol:'#e3c7b6',nvtint:'#f0dccb'}},
    {k:'nila',n:'Nila',desc:'Indigo night, pale gold',c:{ground:'#1a2240',sheet:'#f3ede0',ink:'#232634',accent:'#2c3c6c',gold:'#bf9b58',pagefg:'#ece6d6',nvcol:'#c8cbd6',nvtint:'#e3dfd2'}},
    {k:'hitam',n:'Hitam',desc:'Black lacquer and gold',c:{ground:'#121110',sheet:'#efe6d1',ink:'#1f1c18',accent:'#2b2722',gold:'#c8a45c',pagefg:'#ebdfc4',nvcol:'#d8c9a5',nvtint:'#e4d8bb'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric and olive, poster colours',c:{ground:'#4f3c12',sheet:'#f8eed4',ink:'#33281a',accent:'#7a4b10',gold:'#c3973b',pagefg:'#f4e6c4',nvcol:'#e3cf98',nvtint:'#f0e2bb'}},
    {k:'senja',n:'Senja',desc:'Peach dusk with terracotta',c:{ground:'#ead2bc',sheet:'#fcf5ea',ink:'#3a2a22',accent:'#93432c',gold:'#ad8644',pagefg:'#3a2a22',nvcol:'#efc9ad',nvtint:'#f6e2cf'}},
    {k:'sage',n:'Sage',desc:'Sage green on cream',c:{ground:'#c8d0bb',sheet:'#f9f6ec',ink:'#2c3326',accent:'#46623f',gold:'#a3854a',pagefg:'#2c3326',nvcol:'#d2dcc2',nvtint:'#eaeedd'}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose and old gold',c:{ground:'#e6c8c2',sheet:'#fdf5f0',ink:'#3c2a2c',accent:'#8e4152',gold:'#b08b55',pagefg:'#3c2a2c',nvcol:'#ecc8c8',nvtint:'#f6e3de'}},
  ]});
