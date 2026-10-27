/* wayang: the gunungan (tree-of-life leaf) of the Kelantan shadow play, made as a real puppet: translucent rawhide punched with
   hundreds of tiny holes (tatahan), painted in gold prada and one colour, on a dark horn rod, glowing from the lamp behind it.
   No figures, only the tree, its branches, cloud scrolls and the small gateway at its foot.
   Cover: the puppet held still in lamplight. Tap "Buka Jemputan" and it sweeps aside, as the dalang opens a play.
   Page: the kelir screen with the gunungan's soft shadow behind the names. Skin: screen-cloth cards edged with punched hide. */
let wyN=0;
const f1=v=>(+v).toFixed(1);
// the leaf outline from a half-width profile, so the edge flames and inner borders can follow it
const W=t=>t<.62?92*Math.pow(Math.sin(t/.62*Math.PI/2),1.55)+.4:92-34*Math.pow((t-.62)/.38,1.6);
const Y=t=>4+268*t;
function edge(k){let r='';for(let i=0;i<=60;i++){const t=i/60;r+=`${i?'L':'M'}${f1(100+W(t)*k)} ${f1(Y(t))}`}let l='';for(let i=60;i>=0;i--){const t=i/60;l+=`L${f1(100-W(t)*k)} ${f1(Y(t))}`}return r+l}
function flames(){let d='';for(let i=3;i<58;i+=2){const t=i/60,t2=(i+1)/60,x=W(t),y=Y(t),dx=W(t2)-x,dy=Y(t2)-y,L=Math.hypot(dx,dy),nx=dy/L,ny=-dx/L;
  for(const s of [1,-1]){const bx=100+s*x,tx=bx+s*nx*6+dx*.5,ty=y+ny*6+dy*.5;d+=`M${f1(bx)} ${f1(y)}Q${f1(bx+s*nx*2)} ${f1(y+ny*2-1.5)} ${f1(tx)} ${f1(ty)}Q${f1(bx+s*nx*1.5+dx*.6)} ${f1(y+ny*1.5+dy*.6)} ${f1(100+s*W(t2+.004))} ${f1(Y(t2+.004))}`}}return d}
// spiral branch, s = side
function branch(x0,y0,s,L,turn){let d=`M${x0} ${y0}`;let x=x0,y=y0,a=-Math.PI/2+s*1.15,st=L/16;const pts=[];
  for(let i=0;i<22;i++){const k=i/22;a+=s*(.02+k*k*turn*1.6);const r=st*(1-k*.55);x+=Math.cos(a)*r;y+=Math.sin(a)*r;d+=`L${f1(x)} ${f1(y)}`;pts.push([x,y,a])}
  return {d,pts}}
// the tree: branches and leaves (computed once)
let BR='',LV='';
for(const [y,L,tu] of [[64,50,.4],[100,84,.36],[142,104,.34],[184,96,.38]])for(const s of [-1,1]){const b=branch(100,y,s,L,tu);BR+=b.d;
  b.pts.forEach(([x,y2,a],i)=>{if(i%2!==1||i>19)return;const deg=a*180/Math.PI;LV+=`<path d="M0 0q2.8-5.4 0-11q-2.8 5.4 0 11z" transform="translate(${f1(x)} ${f1(y2)}) rotate(${f1(deg+s*(((i-1)/2)%2?55:-55)-90+180)})"/>`})}
const AWAN=s=>`M${100+s*14} 232c${s*10} -2 ${s*22} -10 ${s*20} -22c${-s*2} -9 ${-s*14} -10 ${-s*16} -2c${-s*1} 6 ${s*6} 8 ${s*8} 3M${100+s*40} 238c${s*8} -2 ${s*16} -10 ${s*14} -18c${-s*2} -6 ${-s*10} -6 ${-s*11} 0`;
const TRUNK='M100 236C98 206 103 180 99 150C96 120 102 90 100 40';
const ROOF='M54 232L68 218H132L146 232ZM68 218L80 207H120L132 218ZM80 207L93 196H107L120 207Z';
const BASE='M62 272V232H138V272ZM44 272H156V280H44ZM36 280H164V288H36Z';
// the hide: solid leather, punched with a lattice of small holes inside the border, with the tree and gateway left solid
const WY_MASK=K.uri(`<svg ${NS} viewBox="-12 -6 224 300"><defs>
  <pattern id="p" width="4.6" height="4" patternUnits="userSpaceOnUse"><circle cx="1.15" cy="1" r=".72"/><circle cx="3.45" cy="3" r=".72"/></pattern>
  <clipPath id="c"><path d="${edge(.9)}Z"/></clipPath>
  <mask id="m" maskUnits="userSpaceOnUse" x="-12" y="-6" width="224" height="300">
   <path d="${edge(1)}Z${flames()}" fill="#fff"/><path d="${ROOF}${BASE}" fill="#fff"/>
   <rect x="0" y="0" width="200" height="232" fill="url(#p)" clip-path="url(#c)"/>
   <path d="${edge(.91)}" fill="none" stroke="#000" stroke-width="1.1" stroke-dasharray="3 2.2"/>
   <g fill="none" stroke="#fff" stroke-linecap="round"><path d="${TRUNK}" stroke-width="7"/><path d="${BR}" stroke-width="3.4"/><path d="${AWAN(1)}${AWAN(-1)}" stroke-width="3.4"/></g>
   <g fill="#fff" stroke="#fff" stroke-width="1.6">${LV}</g><path d="M100 14l7 11-7 11-7-11z" fill="#fff"/><circle cx="100" cy="11" r="3.4" fill="#fff"/>
   <path d="M58 230.5L69 220H131L142 230.5M71 216L81 209H119L129 216M83 205L94 198H106L117 205" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="2 1.6"/>
   <path d="M71 267V241H95V267ZM105 267V241H129V267Z" fill="#000"/><path d="M48 276H152M40 284H160" stroke="#000" stroke-width="1" stroke-dasharray="1.6 1.6"/>
  </mask></defs><rect x="-12" y="-6" width="224" height="300" mask="url(#m)"/></svg>`);
// paint on the hide: gold prada lines and one colour, drawn in the same box; uses the theme through CSS variables
const wyPaint=()=>`<svg class="wy-paint" viewBox="-12 -6 224 300" aria-hidden="true">
  <path d="${flames()}" style="fill:var(--accent)" opacity=".75"/>
  <path d="${edge(.955)}Z" fill="none" style="stroke:var(--gold)" stroke-width="2.2"/><path d="${edge(.975)}Z" fill="none" style="stroke:var(--accent)" stroke-width="1"/>
  <g fill="none" stroke-linecap="round"><path d="${TRUNK}" style="stroke:var(--accent)" stroke-width="4.6"/><path d="${TRUNK}" style="stroke:var(--gold)" stroke-width="1.6"/>
   <path d="${BR}" style="stroke:var(--gold)" stroke-width="1.5"/><path d="${AWAN(1)}${AWAN(-1)}" style="stroke:var(--gold)" stroke-width="1.5"/></g>
  <g style="fill:var(--accent)" opacity=".9">${LV}</g><path d="M100 17l4.6 8-4.6 8-4.6-8z" style="fill:var(--gold)"/>
  <path d="${ROOF}" style="fill:var(--accent)"/><path d="M54 232L68 218H132L146 232M68 218L80 207H120L132 218M80 207L93 196H107L120 207" fill="none" style="stroke:var(--gold)" stroke-width="1.2"/>
  <path d="M62 272V232H138V272Z" fill="none" style="stroke:var(--gold)" stroke-width="1.4"/><path d="M71 267V241H95V267ZM105 267V241H129V267Z" fill="none" style="stroke:var(--gold)" stroke-width="1.2"/>
  <path d="M44 272H156V280H44ZM36 280H164V288H36Z" style="fill:var(--accent)" opacity=".8"/><path d="M44 272H156M36 280H164M36 288H164" style="stroke:var(--gold)" stroke-width=".9"/></svg>`;
// the puppet: horn rod, leather (masked), paint (masked), and a grain pass over both
const wyPuppet=()=>`<span class="wy-pup"><i class="wy-rod"></i><span class="wy-hide"><i class="wy-skin"></i><span class="wy-pt">${wyPaint()}</span><i class="wy-grain"></i></span></span>`;
const wyVars=c=>`--wymask:${WY_MASK};--hide:${c.hide}`;
FAMILY({key:'wayang',name:'Wayang Kulit',meaning:'Shadow-play puppet',
  blurb:'A gunungan made as a real shadow-play puppet: punched rawhide painted in gold, glowing in lamplight. It sweeps aside to open, and its shadow falls on the screen behind your names.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-wayang2" style="${wyVars(c)}"><i class="wy-dark"></i>
      <div class="wy-screen reveal"><i class="wy-lamp"></i><i class="wy-shadow"></i>
        <div class="wy-txt"><p class="wy-k kicker">${ev(o,L)}</p><h1 class="wy-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <i class="wy-rule"></i><p class="wy-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="wy-ven">${esc(o.venue)}</p>`:''}</div></div>
      <a class="wy-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-wayang2" style="${wyVars(c)}"><i class="wy-dark"></i><i class="wy-lamp"></i>
      <div class="wy-head"><p class="wy-k">${ev(o,L)}</p><p class="wy-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div>
      <div class="wy-stage">${wyPuppet()}</div>
      <div class="wy-foot">${guest?`<p class="wy-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="wy-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.cssText+=';'+wyVars(th.c);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Red-painted gunungan in lamplight',c:{ground:'#1a0f0a',sheet:'#f6e6c6',ink:'#2a170c',accent:'#8c1f1c',gold:'#d9a441',pagefg:'#f3e2c0',hide:'#c99a5a'}},
    {k:'biru',n:'Biru',desc:'Indigo-painted gunungan, night blue',c:{ground:'#0b1323',sheet:'#f3e7cc',ink:'#141a2b',accent:'#24406e',gold:'#d6a64b',pagefg:'#eae2cf',hide:'#c69c62'}},
    {k:'hijau',n:'Hijau',desc:'Green-painted gunungan, forest dark',c:{ground:'#0d1911',sheet:'#f1e6c6',ink:'#13200f',accent:'#2f5d3a',gold:'#cfa24a',pagefg:'#e9e2c8',hide:'#c49a5c'}},
    {k:'senja',n:'Senja',desc:'Rose-painted gunungan at dusk',c:{ground:'#28101e',sheet:'#f8e2cc',ink:'#2a1220',accent:'#8a2c4c',gold:'#e0a65a',pagefg:'#f6e0d6',hide:'#cc9a66'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric light, umber ground',c:{ground:'#2e1c06',sheet:'#fbeab8',ink:'#2b1906',accent:'#8a4614',gold:'#e8b640',pagefg:'#fbedc9',hide:'#d1a050'}},
    {k:'gading',n:'Gading',desc:'Pale hide on an ivory ground',c:{ground:'#e8dcc4',sheet:'#fff6e2',ink:'#2d2116',accent:'#7a3b22',gold:'#b88a3e',pagefg:'#2d2116',hide:'#c9a06a'}},
    {k:'malam',n:'Malam',desc:'Black-and-gold gunungan, one lamp',c:{ground:'#070708',sheet:'#ecdcb4',ink:'#0d0b09',accent:'#2a211a',gold:'#d2a650',pagefg:'#e9dcc0',hide:'#b98c50'}},
    {k:'ungu',n:'Ungu',desc:'Plum-painted gunungan in amber light',c:{ground:'#1c1028',sheet:'#f3e4cc',ink:'#1e1129',accent:'#5b2d7a',gold:'#d4a457',pagefg:'#ede0ee',hide:'#c89a62'}},
  ]});
