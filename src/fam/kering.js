/* kering: Bunga Kering, a dried boho bouquet. Pampas plumes, bunny tails and bleached palm spears fan out behind
   an arch-topped card that sits in a terracotta sleeve on oat linen. Cover: touch the stamp and the arch card slides
   up out of its sleeve. Page: the arch with dried sprigs. Skin: arch-topped cards. */
needFont('Cormorant+Upright:wght@500;600');needFont('Parisienne');
const f1=n=>n.toFixed(1),D=Math.PI/180;
/* pampas: a stem whose top half is a soft plume of hundreds of fine barbs */
function plume(len,bend,c,r){let s=`<path d="M0 0Q${f1(bend*.5)} ${f1(-len*.5)} ${f1(bend)} ${f1(-len)}" stroke="${c.stem}" stroke-width="1" fill="none"/>`,b1='',b2='';
  const W=len*.13;for(let i=0;i<300;i++){const t=.42+.58*Math.pow(r(),.75),u=1-t,x=2*u*t*bend*.5+t*t*bend,y=-(2*u*t*len*.5+t*t*len);
    const env=Math.pow(Math.sin(Math.PI*(t-.42)/.58),.55),sd=r()<.5?-1:1,a=(-90+sd*(18+r()*40))*D,l=W*env*(.45+r()*.65);
    const ex=x+Math.cos(a)*l,ey=y+Math.sin(a)*l-l*.15,cx=x+Math.cos(a)*l*.5+sd*1.5,cy=y+Math.sin(a)*l*.5;
    const d=`M${f1(x)} ${f1(y)}Q${f1(cx)} ${f1(cy)} ${f1(ex)} ${f1(ey)}`;(i%3?b1+=d:b2+=d)}
  return s+`<path d="${b1}" stroke="${c.p1}" stroke-width=".55" fill="none" opacity=".8"/><path d="${b2}" stroke="${c.p2}" stroke-width=".55" fill="none" opacity=".85"/>`}
/* bunny tail grass: a hair-thin stem and a fluffy oval head with fine awns */
function bunny(len,bend,c,r){const hx=bend,hy=-len;let s=`<path d="M0 0Q${f1(bend*.4)} ${f1(-len*.5)} ${f1(hx)} ${f1(hy+8)}" stroke="${c.stem}" stroke-width=".7" fill="none"/>`,h='';
  for(let i=0;i<70;i++){const a=r()*Math.PI*2,rx=5.5,ry=10,px=hx+Math.cos(a)*rx*.7,py=hy+Math.sin(a)*ry*.7,l=2+r()*3;h+=`M${f1(px)} ${f1(py)}l${f1(Math.cos(a)*l)} ${f1(Math.sin(a)*l)}`}
  let aw='';for(let i=0;i<8;i++){const a=(-90+(r()-.5)*90)*D;aw+=`M${f1(hx)} ${f1(hy-6)}l${f1(Math.cos(a)*14)} ${f1(Math.sin(a)*14)}`}
  return s+`<ellipse cx="${f1(hx)}" cy="${f1(hy)}" rx="5.4" ry="9.6" fill="${c.bt}"/><path d="${h}" stroke="${c.bt}" stroke-width=".6" fill="none"/><path d="${aw}" stroke="${c.bt}" stroke-width=".35" opacity=".8" fill="none"/>`}
/* a bleached palm spear: a narrow pleated blade with frayed edges */
function spear(len,bend,col,c,r){const w=len*.075;let o=`M0 0`,b='';const N=24;
  for(let i=1;i<=N;i++){const t=i/N,x=bend*t*t+w*Math.pow(Math.sin(Math.PI*Math.min(1,t*1.15)),.8)*(1-t*.5),y=-len*t;o+=`L${f1(x+(i%2?.8:0))} ${f1(y)}`}
  for(let i=N;i>=1;i--){const t=i/N,x=bend*t*t-w*Math.pow(Math.sin(Math.PI*Math.min(1,t*1.15)),.8)*(1-t*.5),y=-len*t;b+=`L${f1(x-(i%2?.8:0))} ${f1(y)}`}
  let f='';for(const k of [-.6,-.3,0,.3,.6])f+=`M${f1(k*w*.9)} ${f1(-len*.08)}Q${f1(bend*.3+k*w)} ${f1(-len*.5)} ${f1(bend)} ${f1(-len*.99)}`;
  return `<path d="M0 ${f1(len*.06)}L0 0" stroke="${c.stem}" stroke-width="1.4"/><path d="${o}${b}Z" fill="${col}"/><path d="${f}" stroke="${c.stem}" stroke-width=".45" opacity=".55" fill="none"/>`}
/* a small dried ruscus sprig: zig-zag stem with pointed leaves */
function ruscus(len,bend,c,r){let s=`<path d="M0 0Q${f1(bend*.5)} ${f1(-len*.5)} ${f1(bend)} ${f1(-len)}" stroke="${c.stem}" stroke-width=".7" fill="none"/>`;
  for(let i=1;i<9;i++){const t=i/9,x=bend*t*t,y=-len*t,sd=i%2?1:-1,l=9-t*4;s+=`<path d="M${f1(x)} ${f1(y)}q${f1(sd*l*.6)} ${f1(-l*.2)} ${f1(sd*l)} ${f1(-l*.9)}q${f1(-sd*l*.2)} ${f1(l*.6)} ${f1(-sd*l)} ${f1(l*.9)}z" fill="${c.rus}"/>`}return s}
/* a fan of dried stems from one point; side -1 leans left, 1 leans right */
function bunch(c,seed,side,scale=1){const r=rng(seed);const items=[
   ['s',-58,250,c.sp1],['p',-40,300],['s',-22,230,c.sp2],['b',-70,170],['p',-10,330],['r',-48,170],['b',-30,200],['s',4,190,c.sp1],['p',16,260],['b',-4,150],['r',22,140],['b',30,170]];
  return items.map(([ty,a,l,col])=>{const L=l*scale*(.9+r()*.2),bend=(r()-.5)*30;const body=ty==='p'?plume(L,bend,c,r):ty==='b'?bunny(L,bend,c,r):ty==='s'?spear(L,bend*.5,col,c,r):ruscus(L,bend,c,r);
    return `<g transform="rotate(${f1(a*side)})">${body}</g>`}).join('')}
const bunchSvg=(c,seed,cls,scale)=>`<svg class="kering-bu ${cls}" viewBox="-200 -380 400 400"><g filter="url(#kb${seed})">${bunch(c,seed,cls.includes('r')?-1:1,scale)}</g><defs><filter id="kb${seed}"><feDropShadow dx="1" dy="3" stdDeviation="2.5" flood-color="#3a2416" flood-opacity=".25"/></filter></defs></svg>`;
/* the arch card's fine border, drawn to follow the arch */
function archLine(c){const A=(i,rr)=>`M${i} 520V${150}A${rr} ${rr} 0 0 1 ${300-i} 150V520`;
  return `<svg class="kering-al" viewBox="0 0 300 520" preserveAspectRatio="none"><path d="${A(12,138)}" fill="none" stroke="${c.gold}" stroke-width="1.1"/><path d="${A(17,133)}" fill="none" stroke="${c.gold}" stroke-width=".5"/>
   <path d="${A(23,127)}" fill="none" stroke="${c.gold}" stroke-width=".7" stroke-dasharray="0 3.4" stroke-linecap="round"/>
   <path d="M150 36l3 5-3 5-3-5z" fill="${c.gold}"/><path d="M128 41h16M156 41h16" stroke="${c.gold}" stroke-width=".6"/></svg>`}
let uid=0;
FAMILY({key:'kering',name:'Bunga Kering',meaning:'Dried boho bouquet',
  blurb:'Pampas, bunny tails and palm spears fan behind an arch card in a terracotta sleeve. The card slides up out of the sleeve.',
  fonts:{d:"'Cormorant Upright', serif",s:"'Parisienne', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';uid++;return `<section class="page pg-kering">
    ${bunchSvg(c,uid*10+1,'pl',1.2)}${bunchSvg(c,uid*10+2,'pr',1.2)}
    <div class="kering-arch reveal"><i class="kering-tex"></i>${archLine(c)}<div class="kering-in">
     <p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="kering-rule reveal d2"><i></i><b></b><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(fmtTime(o.start,o.lang))}<br>${esc(o.venue)}</p></div></div>
    ${bunchSvg(c,uid*10+3,'fl',.55)}${bunchSvg(c,uid*10+4,'fr',.55)}</section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',[a,b]=K.initials(o);uid++;
    return `<div class="cover cv-kering" style="--sleeve:${c.sleeve};--sleeveInk:${c.sleeveInk}">${bunchSvg(c,uid*10+5,'cl',1.2)}${bunchSvg(c,uid*10+6,'cr',1.2)}
     <div class="kering-arch kering-card"><i class="kering-tex"></i>${archLine(c)}<div class="kering-txt"><p class="kering-k">${ev(o,L)}</p><p class="kering-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</p>
      <div class="kering-rule"><i></i><b></b><i></i></div><p class="kering-d">${esc(fmtDate(o.date,o.lang))}</p></div></div>
     <div class="kering-sw"><div class="kering-sleeve"><i class="kering-tex"></i><i class="kering-deb"></i>
      <div class="kering-to">${guest?`<span>${L.dear}</span><b>${esc(guest)}</b>`:`<b>${esc(o.venue)}</b>`}</div><svg class="kering-ss" viewBox="-60 -120 120 124" fill="none" stroke="${c.sleeveInk}">${[-38,-18,0,18,38].map((a,i)=>`<g transform="rotate(${a})"><path d="M0 0V${i%2?-80:-104}" stroke-width=".6"/>${Array.from({length:12},(_,k)=>`<path d="M0 ${-50-k*(i%2?2.5:4.4)}l${k%2?4:-4} -5" stroke-width=".45"/>`).join('')}</g>`).join('')}</svg><p class="kering-v">${esc(fmtTime(o.start,o.lang))} &middot; ${esc(o.venue)}</p></div></div>
     <${tag} class="kering-stamp" ${attr} aria-label="${L.open}"><span>${esc(a)}<i>&amp;</i>${esc(b)}</span></${tag}>
     <p class="kering-hint">${en?'Open invitation':'Buka Jemputan'}</p></div>`},
  skin(el,o,th){const c=th.c;K.cards(el);
    K.secs(el).forEach((s,i)=>{s.insertAdjacentHTML('afterbegin',`<i class="kering-tex"></i>${bunchSvg(c,70+i,'sk',.42)}`);
      const h=s.querySelector('h2');if(h)h.insertAdjacentHTML('afterend','<div class="kering-rule"><i></i><b></b><i></i></div>')})},
  themes:[
    {k:'terakota',n:'Terakota',desc:'Terracotta sleeve on oat linen',c:{ground:'#e7dccb',sheet:'#f9f3e8',ink:'#4a3427',accent:'#a3573a',gold:'#b5895a',pagefg:'#4a3427',sleeve:'#b0603e',sleeveInk:'#fbeee2',stem:'#9a7a58',p1:'#efe3cf',p2:'#d8c09e',bt:'#f1e7d6',sp1:'#eadcc2',sp2:'#c98b5e',rus:'#b98a5e'}},
    {k:'pasir',n:'Pasir',desc:'Camel sleeve on sand',c:{ground:'#efe7da',sheet:'#fcf8f1',ink:'#46392c',accent:'#8a6440',gold:'#b5915e',pagefg:'#46392c',sleeve:'#c49c74',sleeveInk:'#fffaf2',stem:'#9c8160',p1:'#f2e9da',p2:'#dcc7a6',bt:'#f6efe2',sp1:'#ece1cb',sp2:'#d7b48a',rus:'#bf9a6c'}},
    {k:'karat',n:'Karat',desc:'Rust sleeve on burnt clay',c:{ground:'#5b2f20',sheet:'#f8efe3',ink:'#4a2e22',accent:'#9a4a2c',gold:'#c9975c',pagefg:'#f6e6d6',sleeve:'#8e3f25',sleeveInk:'#fbe9da',stem:'#a7835c',p1:'#efe2cc',p2:'#d9bd96',bt:'#f2e6d2',sp1:'#e9d9bc',sp2:'#d48a5a',rus:'#c08a5a'}},
    {k:'sage',n:'Sage',desc:'Sage sleeve, cream pampas',c:{ground:'#e3e1d4',sheet:'#fbf9f1',ink:'#38402f',accent:'#5f6d4b',gold:'#a99062',pagefg:'#38402f',sleeve:'#8c9a7a',sleeveInk:'#fbfaf2',stem:'#8d7e60',p1:'#f0e8d8',p2:'#d6c6a6',bt:'#f4eee2',sp1:'#e8dfc8',sp2:'#b9a37a',rus:'#9aa07a'}},
    {k:'hitam',n:'Hitam',desc:'Charcoal sleeve, bleached grasses',c:{ground:'#2a2522',sheet:'#f6f0e6',ink:'#332b26',accent:'#5a4436',gold:'#c0985e',pagefg:'#efe6da',sleeve:'#3f3530',sleeveInk:'#f1e6d6',stem:'#a58a68',p1:'#f2e8d8',p2:'#dac7a8',bt:'#f5eee2',sp1:'#ece0c8',sp2:'#c9a27a',rus:'#b4946c'}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose sleeve on blush',c:{ground:'#efdfd8',sheet:'#fdf8f4',ink:'#4a3330',accent:'#9a5a52',gold:'#b8906a',pagefg:'#4a3330',sleeve:'#c48f84',sleeveInk:'#fff6f2',stem:'#9e8066',p1:'#f6ebe2',p2:'#e2c6b4',bt:'#f8efe8',sp1:'#efe0d0',sp2:'#d7a08e',rus:'#c2988a'}},
    {k:'kunyit',n:'Kunyit',desc:'Mustard sleeve on oat',c:{ground:'#ede3cf',sheet:'#fcf7ec',ink:'#47381f',accent:'#9a6a1e',gold:'#b58a42',pagefg:'#47381f',sleeve:'#c3963a',sleeveInk:'#fffaf0',stem:'#9a7e56',p1:'#f2e8d4',p2:'#dcc59c',bt:'#f6eedd',sp1:'#ecdfc2',sp2:'#d6a85a',rus:'#bf9a5c'}},
    {k:'coklat',n:'Coklat',desc:'Cocoa sleeve on dark walnut',c:{ground:'#3a2a20',sheet:'#f8f0e4',ink:'#45322a',accent:'#7a4e34',gold:'#c79a62',pagefg:'#f3e6d6',sleeve:'#7a4e34',sleeveInk:'#f8eadb',stem:'#a8885f',p1:'#f0e4ce',p2:'#d9c09a',bt:'#f3e9d6',sp1:'#eadcbf',sp2:'#c78e62',rus:'#b98e62'}},
  ]});
