/* tekan: Bunga Tekan, pressed flowers on cotton paper.
   Cover: a deckled cotton card with real pressed sprays, wrapped in a translucent vellum band tied with twine and a wax seal.
   Opening: the vellum band slides down off the card. Page: pressed flowers scattered round the names. Skin: deckled cotton cards, a pressed sprig on each. */
const f2=n=>n.toFixed(1);
// quadratic bezier point + angle
const qp=(a,b,c,t)=>{const u=1-t;return [u*u*a[0]+2*u*t*b[0]+t*t*c[0],u*u*a[1]+2*u*t*b[1]+t*t*c[1]]};
const qa=(a,b,c,t)=>{const dx=2*(1-t)*(b[0]-a[0])+2*t*(c[0]-b[0]),dy=2*(1-t)*(b[1]-a[1])+2*t*(c[1]-b[1]);return Math.atan2(dy,dx)*180/Math.PI};
// a pressed leaf pointing along +x, with a midrib and side veins
function leaf(x,y,ang,len,w,col,vein){const v=[.3,.5,.7].map(t=>`M${f2(len*t)} 0l${f2(len*.12)} ${f2(-w*.42)}M${f2(len*t)} 0l${f2(len*.12)} ${f2(w*.42)}`).join('');
  return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${f2(ang)})"><path d="M0 0C${f2(len*.25)} ${f2(-w)} ${f2(len*.75)} ${f2(-w*.8)} ${f2(len)} 0C${f2(len*.75)} ${f2(w*.8)} ${f2(len*.25)} ${f2(w)} 0 0Z" fill="${col}" opacity=".82"/><path d="M0 0H${f2(len*.94)}${v}" stroke="${vein}" stroke-width=".35" fill="none" opacity=".75"/></g>`}
// a fern frond along a curve: alternating pinnae that shrink towards the tip
function fern(a,b,c,n,size,col,vein){let s=`<path d="M${a[0]} ${a[1]}Q${b[0]} ${b[1]} ${c[0]} ${c[1]}" stroke="${vein}" stroke-width=".7" fill="none"/>`;
  for(let i=1;i<n;i++){const t=i/n,[x,y]=qp(a,b,c,t),an=qa(a,b,c,t),l=size*Math.pow(1-t,.55)*(.55+.45*Math.sin(Math.min(1,t*3)*Math.PI/2));
    s+=leaf(x,y,an-58,l,l*.26,col,vein)+leaf(x,y,an+58,l,l*.26,col,vein)}return s}
// a sprig: stem with alternate small leaves
function sprig(a,b,c,n,size,col,vein,r){let s=`<path d="M${a[0]} ${a[1]}Q${b[0]} ${b[1]} ${c[0]} ${c[1]}" stroke="${vein}" stroke-width=".8" fill="none"/>`;
  for(let i=1;i<=n;i++){const t=i/(n+.4),[x,y]=qp(a,b,c,t),an=qa(a,b,c,t),l=size*(.7+.3*r());s+=leaf(x,y,an+(i%2?-42:42),l,l*.36,col,vein)}
  const [x,y]=qp(a,b,c,1);return s+leaf(x,y,qa(a,b,c,1),size*.8,size*.26,col,vein)}
// a tiny pressed five-petal flower (forget-me-not / alyssum)
function bloom(x,y,r,col,eye,rot){let p='';for(let i=0;i<5;i++)p+=`<path d="M0 0C${f2(r*.55)} ${f2(-r*.25)} ${f2(r*.5)} ${f2(-r)} 0 ${f2(-r)}C${f2(-r*.5)} ${f2(-r)} ${f2(-r*.55)} ${f2(-r*.25)} 0 0Z" transform="rotate(${i*72})" fill="${col}" opacity=".78"/><path d="M0 ${f2(-r*.2)}V${f2(-r*.8)}" stroke="${eye}" stroke-width=".3" opacity=".5" transform="rotate(${i*72})"/>`;
  return `<g transform="translate(${f2(x)} ${f2(y)}) rotate(${rot})">${p}<circle r="${f2(r*.22)}" fill="${eye}"/></g>`}
// seed-head grass: hair-thin stem with a spray of grains
function grass(a,b,c,col,r){let s=`<path d="M${a[0]} ${a[1]}Q${b[0]} ${b[1]} ${c[0]} ${c[1]}" stroke="${col}" stroke-width=".55" fill="none"/>`;
  for(let i=0;i<12;i++){const t=.55+i/26,[x,y]=qp(a,b,c,t),an=qa(a,b,c,t)+(i%2?-24:24);s+=`<ellipse cx="${f2(x)}" cy="${f2(y)}" rx="2.6" ry=".9" transform="rotate(${f2(an)} ${f2(x)} ${f2(y)})" fill="${col}" opacity="${f2(.55+r()*.35)}"/>`}return s}
/* a whole pressed spray in a 200x200 box, varied by seed */
function spray(c,seed,kind){const r=rng(seed),L=c.leaf,L2=c.leaf2,V=c.vein,P=[c.petal,c.petal2,c.petal3];let s='';
  if(kind!=='b'){s+=fern([20,190],[60,120],[150+r()*20,40],18,27,L2,V)}
  s+=sprig([30,195],[40,120],[96,64+r()*10],6,18,L,V,r);
  s+=grass([40,196],[90,140],[170,92+r()*20],V,r);
  if(kind!=='a'){s+=sprig([24,196],[110,170],[180,150],4,13,L2,V,r)}
  const pts=kind==='b'?[[92,64],[150,120],[120,150],[70,110],[160,70],[108,96],[138,140],[60,80]]:[[100,60],[118,76],[90,82],[140,102],[60,120]];
  pts.forEach(([x,y],i)=>{s+=bloom(x+r()*6,y+r()*6,6+r()*3.5,P[i%3],c.eye,Math.round(r()*72))});
  for(let i=0;i<5;i++)s+=`<path d="M0 0c3-2 7-1 8 2-3 2-6 1-8-2z" transform="translate(${f2(40+r()*140)} ${f2(30+r()*150)}) rotate(${Math.round(r()*360)}) scale(${f2(1+r())})" fill="${P[i%3]}" opacity=".6"/>`;
  return s}
const sprayS=(c,seed,kind,cls,st)=>`<svg class="tekan-sp ${cls||''}" viewBox="0 0 200 200" style="${st||''}">${spray(c,seed,kind)}</svg>`;
const flw=(name,cls,st)=>`<img class="tekan-fl ${cls||''}" src="assets/flower-${name}.webp" alt="" style="${st||''}" decoding="async">`;
// twine: a twisted two-ply cord
function twine(d,c){return `<path d="${d}" stroke="${c.twine}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${c.vein}" stroke-width="2.6" fill="none" stroke-dasharray="1.1 2.3" opacity=".55"/><path d="${d}" stroke="#fff" stroke-width=".6" fill="none" stroke-dasharray="1.4 2" stroke-dashoffset="1.5" opacity=".45"/>`}
function cord(c){const tw=d=>twine(d,c);
  return `<svg class="tekan-cord" viewBox="0 0 360 120" preserveAspectRatio="none">${tw('M-4 57Q90 61 180 58T364 57')}${tw('M-4 62Q90 66 180 63T364 63')}</svg>
  <svg class="tekan-bow" viewBox="0 0 200 140">${tw('M100 62C78 34 40 30 38 50S70 70 100 64')}${tw('M100 62C122 34 160 30 162 50S130 70 100 64')}${tw('M98 66C84 78 62 88 30 96')}${tw('M102 66C118 80 140 86 172 92')}
   <path d="M30 96l-6 1M30 96l-5 4M31 95l-6-2M172 92l6 0M172 92l5 4M171 91l6-3" stroke="${c.twine}" stroke-width=".7"/></svg>`}
let uid=0;
FAMILY({key:'tekan',name:'Bunga Tekan',meaning:'Pressed flowers',
  blurb:'Real pressed flowers on deckled cotton paper, wrapped in a vellum band with twine and a wax seal that slides away.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,f=c.fl,en=o.lang==='en';return `<section class="page pg-tekan"><div class="tekan-paper reveal">
    ${flw(f[0],'p1')}${flw(f[1],'p2')}${flw(f[2],'p3')}${sprayS(c,7,'a','p4')}${sprayS(c,19,'b','p5')}${sprayS(c,31,'c','p6')}
    <i class="tekan-deb"></i><div class="tekan-in"><p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
    <svg class="tekan-stem reveal d2" viewBox="0 0 200 24">${sprig([10,14],[100,8],[190,14],7,9,c.leaf,c.vein,rng(3))}${bloom(100,11,5,c.petal,c.eye,10)}</svg>
    <p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${en?'at':'di'} ${esc(o.venue)}</p></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,f=c.fl,en=o.lang==='en',[i1,i2]=K.initials(o);++uid;
    return `<div class="cover cv-tekan"><div class="tekan-card">
     ${flw(f[0],'c1')}${flw(f[1],'c2')}${sprayS(c,uid*3+5,'a','c3')}${sprayS(c,11,'b','c4')}${flw(f[2],'c5')}
     <svg class="tekan-sp c6" viewBox="0 0 100 300">${bloom(20,40,6,c.petal2,c.eye,12)}${bloom(80,120,5,c.petal,c.eye,40)}${bloom(14,230,5.5,c.petal3,c.eye,4)}${leaf(70,60,-30,16,4,c.leaf,c.vein)}${leaf(30,170,200,14,4,c.leaf2,c.vein)}${leaf(86,250,-70,13,3.6,c.leaf,c.vein)}</svg><i class="tekan-deb"></i>
     <div class="tekan-txt"><p class="tekan-k">${ev(o,L)}</p><p class="tekan-n"><b>${esc(n1)}</b><i>&amp;</i><b>${esc(n2)}</b></p>
      <svg class="tekan-stem" viewBox="0 0 200 24">${sprig([10,14],[100,8],[190,14],7,9,c.leaf,c.vein,rng(3))}${bloom(100,11,5,c.petal,c.eye,10)}</svg>
      <p class="tekan-d">${esc(fmtDate(o.date,o.lang))}</p></div></div>
     <div class="tekan-wrap"><div class="tekan-vel"><i class="tekan-foil"></i><p class="tekan-v1">${esc(o.venue)}</p>
      <div class="tekan-v2">${guest?`<span>${L.dear}</span><b>${esc(guest)}</b>`:`<span>${esc(fmtTime(o.start,o.lang))}</span>`}</div></div>
      ${cord(c)}<${tag} class="tekan-seal" ${attr} aria-label="${L.open}"><img src="assets/seal-${c.seal}.webp" alt=""><span>${esc(i1)}<em>&amp;</em>${esc(i2)}</span></${tag}></div>
     <p class="tekan-hint">${en?'Open invitation':'Buka Jemputan'}</p></div>`},
  skin(el,o,th){const c=th.c;K.cards(el);
    K.secs(el).forEach((s,i)=>{s.insertAdjacentHTML('afterbegin',`<i class="tekan-bg"></i>${sprayS(c,40+i*7,['a','b','c'][i%3],'tekan-sk '+(i%2?'r':'l'))}`);
      const h=s.querySelector('h2');if(h)h.insertAdjacentHTML('afterend',`<svg class="tekan-hr" viewBox="0 0 200 24">${sprig([10,14],[100,8+(i%3)],[190,14],7,8,c.leaf,c.vein,rng(9+i))}${bloom(100,11,4.5,[c.petal,c.petal2,c.petal3][i%3],c.eye,i*20)}</svg>`)})},
  themes:[
    {k:'krim',n:'Krim',desc:'Cotton on oat linen, ivory seal',c:{ground:'#e6ddcd',sheet:'#fbf8f0',ink:'#3d362e',accent:'#7a5548',gold:'#a8834f',pagefg:'#3d362e',seal:'gading',twine:'#b29a76',leaf:'#8a9468',leaf2:'#a3a479',vein:'#6c6447',petal:'#c79a95',petal2:'#9fa3c9',petal3:'#d8b968',eye:'#8c6a3a',fl:['wild-rose','forget-me-not','white-roses']}},
    {k:'sage',n:'Sage',desc:'Sage table, green seal',c:{ground:'#7c8a70',sheet:'#fbf9f2',ink:'#2f3528',accent:'#56653f',gold:'#a8955a',pagefg:'#f7f4ea',seal:'sage',twine:'#b8a27c',leaf:'#7f8f5c',leaf2:'#9aa274',vein:'#5c6040',petal:'#e2d4b8',petal2:'#a9b4d3',petal3:'#d9b56b',eye:'#7d6a3a',fl:['white-roses','forget-me-not','wild-rose']}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose, red seal',c:{ground:'#d7b5ab',sheet:'#fdf8f3',ink:'#40302d',accent:'#94545a',gold:'#b08a5e',pagefg:'#3e2b28',seal:'merah',twine:'#b49a7c',leaf:'#8a9468',leaf2:'#a5a07a',vein:'#6c5e47',petal:'#d29a9c',petal2:'#e4c0b4',petal3:'#b496bf',eye:'#8a5a3a',fl:['pink-rose','wild-rose','forget-me-not']}},
    {k:'marun',n:'Marun',desc:'Deep maroon, red seal',c:{ground:'#4b1e25',sheet:'#fbf6ee',ink:'#3a2427',accent:'#7c2a35',gold:'#b8905a',pagefg:'#f3e5dc',seal:'merah',twine:'#bba27d',leaf:'#7d8a5e',leaf2:'#9a9a70',vein:'#62573f',petal:'#b65d63',petal2:'#d9a7a0',petal3:'#d8b968',eye:'#6a3a2a',fl:['red-rose','wild-rose','white-roses']}},
    {k:'hitam',n:'Hitam',desc:'Charcoal slate, gold seal',c:{ground:'#24221f',sheet:'#faf7ef',ink:'#2d2a26',accent:'#4a3f35',gold:'#a8854c',pagefg:'#efe7d8',seal:'emas',twine:'#c0a77f',leaf:'#7f8a60',leaf2:'#9c9a72',vein:'#5d5840',petal:'#c9a6a0',petal2:'#a7a8c9',petal3:'#dcbf75',eye:'#7d6038',fl:['white-roses','forget-me-not','cabbage-rose']}},
    {k:'nila',n:'Nila',desc:'Indigo night, blue seal',c:{ground:'#1f2d45',sheet:'#fbf9f4',ink:'#26304a',accent:'#34496e',gold:'#a8905c',pagefg:'#ecf0f6',seal:'biru',twine:'#b9a27e',leaf:'#7a8a68',leaf2:'#98a07c',vein:'#5a5c48',petal:'#9ba7d4',petal2:'#d8cfe6',petal3:'#e1c47a',eye:'#6a5a3a',fl:['forget-me-not','white-roses','wild-rose']}},
    {k:'lumut',n:'Lumut',desc:'Moss green, sage seal',c:{ground:'#2f3a2b',sheet:'#faf8ef',ink:'#2c3226',accent:'#4d5e38',gold:'#a69457',pagefg:'#eef0e2',seal:'sage',twine:'#bca67f',leaf:'#7b8d58',leaf2:'#9ca46e',vein:'#5a5d3c',petal:'#e5d2a4',petal2:'#c99a95',petal3:'#a9b4d3',eye:'#76642f',fl:['white-roses','wild-rose','forget-me-not']}},
    {k:'terakota',n:'Terakota',desc:'Terracotta clay, gold seal',c:{ground:'#b2694a',sheet:'#fcf7ef',ink:'#3e2c24',accent:'#8c4630',gold:'#a77f48',pagefg:'#fff6ec',seal:'emas',twine:'#b49a74',leaf:'#8a9064',leaf2:'#a6a072',vein:'#6c5a40',petal:'#d48e6c',petal2:'#e2c38a',petal3:'#c9a0a0',eye:'#7a4a2a',fl:['cabbage-rose','wild-rose','forget-me-not']}},
  ]});
