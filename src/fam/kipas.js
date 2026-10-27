/* kipas: a folding fan of painted silk with a lace edge on carved sandalwood sticks, hung with a silk tassel.
   Cover: the fan rests nearly closed on a silk ground; touching it spreads the sticks into a half circle, then it fades.
   Page: the open fan above the names. Skin: a small open fan crowning each section heading, lace-edged silk cards. */
const f1=v=>(+v).toFixed(2);
const N=16,D=10,R=100,R0=40;                      // pleats, degrees per pleat, outer and inner radius
const P=(deg,r)=>{const a=deg*Math.PI/180;return [Math.sin(a)*r,-Math.cos(a)*r]};
const pt=(deg,r)=>P(deg,r).map(f1).join(' ');
const wedge=(a0,a1,r0,r1)=>`M${pt(a0,r0)}L${pt(a0,r1)}A${r1} ${r1} 0 0 1 ${pt(a1,r1)}L${pt(a1,r0)}A${r0} ${r0} 0 0 0 ${pt(a0,r0)}Z`;
// the painted leaf, in open-fan coordinates (-80deg to 80deg)
function painting(c,u){const fl=c.fl||['blush-rose','jasmine','pink-rose'];
  let lace='';for(let a=-80;a<80;a+=5){lace+=`<path d="M${pt(a,91)}A4.2 4.2 0 0 1 ${pt(a+5,91)}" fill="${c.lace}" stroke="${c.gold}" stroke-width=".35"/><circle cx="${P(a+2.5,93.4)[0].toFixed(1)}" cy="${P(a+2.5,93.4)[1].toFixed(1)}" r=".9" fill="${c.leaf}"/>`}
  let eye='';for(let a=-78;a<80;a+=4)eye+=`<circle cx="${P(a,86.5)[0].toFixed(1)}" cy="${P(a,86.5)[1].toFixed(1)}" r=".75"/>`;
  const spray=(deg,r,w,img,flip)=>{const [x,y]=P(deg,r);return `<image href="assets/flower-${img}.webp" x="${f1(x-w/2)}" y="${f1(y-w*.62)}" width="${w}" height="${f1(w*1.24)}" transform="rotate(${deg} ${f1(x)} ${f1(y)})" preserveAspectRatio="xMidYMid meet"/>`};
  const vine=(a0,a1)=>{let d='';for(let a=a0;a<=a1;a+=2){const r=66+Math.sin((a-a0)/6)*5;d+=(a===a0?'M':'L')+pt(a,r)}return `<path d="${d}" fill="none" stroke="${c.gold}" stroke-width=".5" opacity=".8"/>`};
  return `<g id="kpp${u}"><path d="${wedge(-80,80,R0,89)}" fill="url(#kps${u})"/>
   <path d="${wedge(-80,80,R0,52)}" fill="${c.band}" opacity=".9"/>
   ${vine(-74,-50)}${vine(-34,-10)}${vine(12,36)}${vine(52,74)}
   ${spray(-52,64,34,fl[0])}${spray(0,64,36,fl[1])}${spray(52,64,34,fl[2],1)}${spray(-26,70,18,fl[1])}${spray(26,70,18,fl[0],1)}
   <g fill="none" stroke="${c.gold}"><path d="M${pt(-80,52.5)}A52.5 52.5 0 0 1 ${pt(80,52.5)}" stroke-width=".7"/><path d="M${pt(-80,55)}A55 55 0 0 1 ${pt(80,55)}" stroke-width=".35"/>
    <path d="M${pt(-80,88.5)}A88.5 88.5 0 0 1 ${pt(80,88.5)}" stroke-width=".6"/><path d="M${pt(-80,84.5)}A84.5 84.5 0 0 1 ${pt(80,84.5)}" stroke-width=".3"/></g>
   <g fill="${c.gold}">${eye}</g>${lace}</g>`}
// a sandalwood stick; guards are wider and carved through
function stick(guard,c,u){const w=guard?3.6:1.5,L=guard?99:93;let holes='';
  if(guard){for(let y=-10;y>-92;y-=7)holes+=`<path d="M0 ${y}l1.6 2.6-1.6 2.6-1.6-2.6z" fill="${c.woodd}"/>`;holes+=`<path d="M-1.2 -8V-95M1.2 -8V-95" stroke="${c.gold}" stroke-width=".35" opacity=".8"/>`}
  else for(let y=-9;y>-38;y-=5)holes+=`<ellipse cx="0" cy="${y}" rx=".55" ry="1.5" fill="${c.woodd}"/>`;
  return `<path d="M${-w} -3L${-w*.62} ${-L}Q0 ${-L-3} ${w*.62} ${-L}L${w} -3Z" fill="url(#kpw${guard?'g':'s'}${u})" stroke="${c.woodd}" stroke-width=".3"/>${holes}`}
function fan(c,u,open){const defs=`<svg class="kipas-defs" width="0" height="0" aria-hidden="true"><defs>
   <radialGradient id="kps${u}" cx="0" cy="0" r="90" gradientUnits="userSpaceOnUse"><stop offset=".45" stop-color="${c.silk2}"/><stop offset=".75" stop-color="${c.silk}"/><stop offset="1" stop-color="${c.silk2}"/></radialGradient>
   <linearGradient id="kpws${u}" x1="0" x2="1"><stop offset="0" stop-color="${c.woodd}"/><stop offset=".45" stop-color="${c.wood}"/><stop offset="1" stop-color="${c.woodd}"/></linearGradient>
   <linearGradient id="kpwg${u}" x1="0" x2="1"><stop offset="0" stop-color="${c.woodd}"/><stop offset=".35" stop-color="${c.wood}"/><stop offset=".6" stop-color="${c.wood}"/><stop offset="1" stop-color="${c.woodd}"/></linearGradient>
   <clipPath id="kpc${u}"><path d="${wedge(0,D,R0,96)}"/></clipPath>
   ${painting(c,u)}</defs></svg>`;
  let ribs='';
  for(let i=0;i<=N;i++){const o=-80+i*D,cl=i<N?-26+i*3.2:-26+(N-1)*3.2+D;
    const leaf=i<N?`<g clip-path="url(#kpc${u})"><use href="#kpp${u}" transform="rotate(${-o})"/><path d="${wedge(0,D/2,R0,90)}" fill="#fff" opacity=".12"/><path d="${wedge(D/2,D,R0,90)}" fill="#000" opacity=".08"/><path d="M${pt(D,R0)}L${pt(D,90)}" stroke="#000" stroke-width=".3" opacity=".22"/></g>`:'';
    ribs+=`<i class="kipas-rib" style="--c:${open?o:cl}deg;--o:${o}deg;z-index:${i+1}"><svg viewBox="-100 -100 200 104">${i>0&&i<N?stick(false,c,u):''}${leaf}${i===0||i===N?stick(true,c,u):''}</svg></i>`}
  return defs+ribs+`<i class="kipas-pin"></i>`}
const TASSEL=c=>{let th='';for(let i=0;i<15;i++){const x=-7+i;th+=`<path d="M${x*.6} 66Q${x*.9} 90 ${x*1.1+(i%3-1)*.6} 114" stroke="${i%4?c.accent:c.gold}" stroke-width=".75" opacity="${i%4?.95:.8}"/>`}
  return `<svg class="kipas-tassel" viewBox="-20 0 40 120" fill="none" stroke-linecap="round"><path d="M-1.4 0C-4 14 -3 30 -1 46M1.4 0C4 14 3 30 1 46" stroke="${c.gold}" stroke-width="1"/>
   <circle cy="49" r="4.2" fill="${c.gold}"/><circle cy="48" r="1.6" fill="#fff" opacity=".45"/><path d="M-5 54H5L6.5 66H-6.5Z" fill="${c.accent}"/><path d="M-5 56.5H5M-5.6 60H5.6M-6 63.5H6" stroke="${c.gold}" stroke-width=".6"/>${th}</svg>`};
const FANHEAD=c=>{let d='';for(let a=-80;a<=80;a+=10)d+=`<path d="M${pt(a,10)}L${pt(a,46)}" stroke="${c.gold}" stroke-width=".6"/>`;
  let sc='';for(let a=-80;a<80;a+=10)sc+=`<path d="M${pt(a,46)}A3.8 3.8 0 0 1 ${pt(a+10,46)}" fill="${c.accent}" stroke="${c.gold}" stroke-width=".5"/>`;
  return svgUriSq(`<svg ${NS} viewBox="-52 -54 104 58"><path d="${wedge(-80,80,12,46)}" fill="${c.accent}"/><path d="${wedge(-80,80,12,30)}" fill="${c.sheet}" opacity=".25"/>${sc}${d}<path d="M${pt(-80,40)}A40 40 0 0 1 ${pt(80,40)}" fill="none" stroke="${c.gold}" stroke-width=".5"/><circle r="3" fill="${c.gold}"/></svg>`)};
let n=0;
FAMILY({key:'kipas',name:'Kipas',meaning:'Folding fan',
  blurb:'A painted silk fan with a lace edge on carved sandalwood sticks, hung with a tassel. Touch it and it opens into a half circle.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1600,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,u='p'+(++n);
    return `<section class="page pg-kipas"><i class="kipas-silk"></i><i class="kipas-frame"></i>
     <div class="kipas-fan open reveal">${fan(c,u,true)}</div>
     <p class="kipas-k reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="kipas-rule reveal d2"><i></i><b></b><i></i></div>
     <p class="kipas-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="kipas-venue reveal d3">${esc(o.venue)}</p></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u='c'+(++n);
    return `<div class="cover cv-kipas"><i class="kipas-silk"></i><i class="kipas-frame"></i>
     <div class="kipas-head"><p class="kipas-k">${ev(o,L)}</p><p class="kipas-names">${esc(n1)}<i>&amp;</i>${esc(n2)}</p><div class="kipas-rule"><i></i><b></b><i></i></div><p class="kipas-date">${esc(fmtDate(o.date,o.lang))}</p>
      ${guest?`<p class="kipas-to">${L.dear}</p><p class="kipas-guest">${esc(guest)}</p>`:''}</div>
     <${tag} class="kipas-fan" ${attr} aria-label="${L.open}">${fan(c,u,false)}${TASSEL(c)}</${tag}>
     <p class="kipas-hint">${en?'Open invitation':'Buka Jemputan'}</p></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--kpfan',FANHEAD(th.c))},
  themes:[
    {k:'merah',n:'Merah',desc:'Crimson silk, ivory fan, gold',c:{ground:'#5b1620',sheet:'#fbf5ec',ink:'#2f2224',accent:'#8e2232',gold:'#c9a35a',pagefg:'#f6e8dc',silk:'#fdf8f0',silk2:'#f1e4d2',band:'#ead7c0',lace:'#fffaf2',leaf:'#c9a35a',wood:'#c69a68',woodd:'#7a5434',fl:['blush-rose','jasmine','pink-rose']}},
    {k:'zamrud',n:'Zamrud',desc:'Jade silk with a cream fan',c:{ground:'#123a33',sheet:'#f7f4ea',ink:'#22302b',accent:'#1f5d4c',gold:'#c9a35a',pagefg:'#e8efe6',silk:'#fbf9f0',silk2:'#e7e4cf',band:'#d8dcc4',lace:'#fffdf6',leaf:'#c9a35a',wood:'#c69a68',woodd:'#7a5434',fl:['white-roses','forget-me-not','wild-rose']}},
    {k:'nila',n:'Nila',desc:'Midnight silk, blue blossom fan',c:{ground:'#17213d',sheet:'#f6f4ee',ink:'#232a3a',accent:'#2b3f73',gold:'#c6a35e',pagefg:'#e9e8ef',silk:'#fbfaf6',silk2:'#e2e3ea',band:'#d3d8e6',lace:'#ffffff',leaf:'#c6a35e',wood:'#c69a68',woodd:'#6f4c30',fl:['forget-me-not','white-roses','forget-me-not']}},
    {k:'hitam',n:'Hitam',desc:'Black silk with a gilded fan',c:{ground:'#121112',sheet:'#f4efe4',ink:'#24201b',accent:'#2a2522',gold:'#cfa95c',pagefg:'#efe6d4',silk:'#f7f1e4',silk2:'#e3d6bb',band:'#d6c49c',lace:'#fbf6ea',leaf:'#cfa95c',wood:'#8a5a36',woodd:'#3e2716',fl:['white-roses','jasmine','white-roses']}},
    {k:'jambu',n:'Jambu',desc:'Blush silk and rose fan',c:{ground:'#ecd3cf',sheet:'#fffaf6',ink:'#3b2a2c',accent:'#a54a5e',gold:'#bf9758',pagefg:'#3b2a2c',silk:'#fffaf5',silk2:'#f5e0dc',band:'#efd0cf',lace:'#ffffff',leaf:'#bf9758',wood:'#d1a676',woodd:'#86603e',fl:['pink-rose','blush-rose','wild-rose']}},
    {k:'gading',n:'Gading',desc:'Ivory silk and lotus fan',c:{ground:'#e9e1d0',sheet:'#fdfaf3',ink:'#33291f',accent:'#8a6a3a',gold:'#bf9758',pagefg:'#33291f',silk:'#fffdf7',silk2:'#efe6d2',band:'#e3d6b8',lace:'#ffffff',leaf:'#bf9758',wood:'#c69a68',woodd:'#7a5434',fl:['lotus','jasmine','lotus']}},
    {k:'ungu',n:'Ungu',desc:'Plum silk with iris fan',c:{ground:'#352446',sheet:'#fbf8f4',ink:'#2d2433',accent:'#5e3b7c',gold:'#c9a35a',pagefg:'#efe7f4',silk:'#fcfaf7',silk2:'#e9e0ec',band:'#ddd0e4',lace:'#ffffff',leaf:'#c9a35a',wood:'#c69a68',woodd:'#6f4c30',fl:['wild-rose','forget-me-not','blush-rose']}},
    {k:'sage',n:'Sage',desc:'Sage silk and hibiscus fan',c:{ground:'#c9d2c0',sheet:'#fbfaf3',ink:'#2b3226',accent:'#4d6a45',gold:'#b39253',pagefg:'#2b3226',silk:'#fdfcf6',silk2:'#e7eadb',band:'#d9dfc8',lace:'#ffffff',leaf:'#b39253',wood:'#c69a68',woodd:'#7a5434',fl:['hibiscus','jasmine','hibiscus']}},
  ]});
