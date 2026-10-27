/* bungaraya: the hibiscus, Malaysia's national flower. A large painted bloom of five layered petals with fine veins,
   a deep throat and a long stamen, set among fine-line gold-foil leaves and buds on textured paper.
   Cover: touching the bloom opens it; the petals part outward and fall away, revealing the names.
   Page: hibiscus sprigs framing the names. Skin: petal-shaped heading badges, leaf sprig corners. */
needFont('Great+Vibes');
const r1=n=>+n.toFixed(1);
let U=0;
// one petal, base at 0 0, pointing up; wide ruffled crown
function petalD(R,w,L){let d=`M0 0C${r1(-w*.12)} ${r1(-L*.14)} ${r1(-w*.74)} ${r1(-L*.34)} ${r1(-w)} ${r1(-L*.62)}`;
  d+=`C${r1(-w*1.08)} ${r1(-L*.8)} ${r1(-w*.88)} ${r1(-L*.95)} ${r1(-w*.62)} ${r1(-L*.98)}`;
  const n=5,yE=x=>-L*(1.0-.13*(x/w)*(x/w));let x0=-w*.62;
  for(let i=0;i<n;i++){const span=w*1.24/n,x1=i===n-1?w*.62:-w*.62+(i+1)*span+(R()-.5)*span*.3,qx=(x0+x1)/2+(R()-.5)*6,qy=yE(qx)-2-R()*7,ey=yE(x1)+R()*3.5;d+=`Q${r1(qx)} ${r1(qy)} ${r1(x1)} ${r1(ey)}`;x0=x1}
  d+=`C${r1(w*.88)} ${r1(-L*.95)} ${r1(w*1.08)} ${r1(-L*.8)} ${r1(w)} ${r1(-L*.62)}`;
  d+=`C${r1(w*.74)} ${r1(-L*.34)} ${r1(w*.12)} ${r1(-L*.14)} 0 0Z`;return d}
function veinsD(R,w,L,n){let v='',f='';for(let k=-n;k<=n;k++){const u=k/n,ex=u*w*.95,ey=-L*(.97-.08*u*u)+2+R()*3,cx=u*w*.12+(R()-.5)*5,cy=-L*.55;
    v+=`M0 -8Q${r1(cx)} ${r1(cy)} ${r1(ex)} ${r1(ey)}`;
    if(k!==0&&R()<.6){const t=.6+R()*.15,mx=cx*2*t*(1-t)+ex*t*t,my=cy*2*t*(1-t)-8*(1-t)*(1-t)+ey*t*t,sg=Math.sign(k)||1;f+=`M${r1(mx)} ${r1(my)}Q${r1(mx+sg*3)} ${r1(my-L*.1)} ${r1(mx+sg*(4+R()*4))} ${r1(my-L*.2)}`}}
  return {v,f}}
function petalSvg(c,i,ang,uid,clip){const R=rng(31+i*7),w=56+R()*8,L=[110,100,114,104,108][i%5],d=petalD(R,w,L),V=veinsD(R,w,L,15),id=`bp${uid}_${i}`;
  const pleat=[-.55,-.05,.5].map(u=>`M0 -12Q${r1(u*w*.25)} ${r1(-L*.5)} ${r1(u*w*.95)} ${r1(-L*.92)}`).join('');
  return `<svg viewBox="-130 -130 260 260" ${NS}><defs>
   <radialGradient id="${id}g" cx="0" cy="0" r="${L}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c.eye}"/><stop offset=".16" stop-color="${c.eye}"/><stop offset=".3" stop-color="${c.petalD}"/><stop offset=".6" stop-color="${c.petal}"/><stop offset=".92" stop-color="${c.petalL}"/><stop offset="1" stop-color="${c.petal}"/></radialGradient>
   <radialGradient id="${id}m" cx="0" cy="0" r="${L}" gradientUnits="userSpaceOnUse"><stop offset=".12" stop-color="#fff" stop-opacity="0"/><stop offset=".3" stop-color="#fff"/><stop offset=".75" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
   <mask id="${id}k" maskUnits="userSpaceOnUse" x="-130" y="-130" width="260" height="260"><rect x="-130" y="-130" width="260" height="260" fill="url(#${id}m)"/></mask>
   <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".12"/><stop offset=".38" stop-color="#fff" stop-opacity=".16"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient>
   <filter id="${id}b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.6"/></filter>
   <clipPath id="${id}c"><path d="${d}"/></clipPath>${clip?`<clipPath id="${id}h"><rect x="-140" y="-140" width="140" height="150"/></clipPath>`:''}</defs>
   <g transform="rotate(${ang})" ${clip?`clip-path="url(#${id}h)"`:''}><path d="${d}" fill="url(#${id}g)"/>
   <g clip-path="url(#${id}c)" fill="none" stroke-linecap="round">
    <g filter="url(#${id}b)"><path d="${pleat}" stroke="#000" stroke-opacity=".16" stroke-width="6"/><path d="${pleat}" stroke="#fff" stroke-opacity=".14" stroke-width="5" transform="translate(5 1)"/></g>
    <g mask="url(#${id}k)"><path d="${V.v}" stroke="${c.vein}" stroke-opacity=".32" stroke-width=".42"/><path d="${V.v}" stroke="#fff" stroke-opacity=".12" stroke-width=".4" transform="translate(.7 0)"/><path d="${V.f}" stroke="${c.vein}" stroke-opacity=".22" stroke-width=".35"/></g>
    <rect x="-80" y="-120" width="160" height="125" fill="url(#${id}s)"/>
    <path d="${d}" stroke="#000" stroke-opacity=".12" stroke-width="5" filter="url(#${id}b)"/></g>
   <path d="${d}" fill="none" stroke="${c.petalL}" stroke-opacity=".55" stroke-width=".6"/></g></svg>`}
function stamenSvg(c,uid){const id=`bs${uid}`;let an='';const R=rng(5);const X=t=>t*76+Math.sin(t*2.6)*10,Y=t=>-t*128;
  for(let i=0;i<34;i++){const t=.56+i/34*.38,x=X(t),y=Y(t),a=-Math.PI/2+(R()-.5)*3.4,l=4+R()*6,ex=x+Math.cos(a)*l,ey=y+Math.sin(a)*l;
    an+=`<path d="M${r1(x)} ${r1(y)}Q${r1((x+ex)/2+1)} ${r1((y+ey)/2)} ${r1(ex)} ${r1(ey)}" stroke="${c.stamen}" stroke-width=".55" fill="none"/><ellipse cx="${r1(ex)}" cy="${r1(ey)}" rx="2.1" ry="1.4" transform="rotate(${r1(a*57)} ${r1(ex)} ${r1(ey)})" fill="${c.pollen}" stroke="${c.pollenD}" stroke-width=".45"/>`}
  const tx=X(1),ty=Y(1);
  const tip=[-60,-30,0,30,60].map(a=>{const ra=(a-68)*Math.PI/180,x=tx+Math.cos(ra)*8,y=ty+Math.sin(ra)*8;return `<path d="M${r1(tx)} ${r1(ty)}L${r1(x)} ${r1(y)}" stroke="${c.stigma}" stroke-width="1"/><circle cx="${r1(x)}" cy="${r1(y)}" r="2.7" fill="${c.stigma}" stroke="#000" stroke-opacity=".3" stroke-width=".4"/><circle cx="${r1(x-.7)}" cy="${r1(y-.8)}" r=".8" fill="#fff" opacity=".5"/>`}).join('');
  let col=`M-3 0`;for(let i=1;i<=10;i++){const t=i/10;col+=`L${r1(X(t)-3*(1-t)-.9)} ${r1(Y(t))}`}for(let i=10;i>=0;i--){const t=i/10;col+=`L${r1(X(t)+3*(1-t)+.9)} ${r1(Y(t)+.6)}`}
  return `<svg viewBox="-130 -130 260 260" ${NS}><defs><linearGradient id="${id}" x1="0" y1="1" x2=".6" y2="0"><stop offset="0" stop-color="${c.eye}"/><stop offset=".45" stop-color="${c.stamen}"/><stop offset="1" stop-color="${c.petalL}"/></linearGradient></defs>
   <path d="${col}Z" fill="url(#${id})"/><path d="M0 -6${Array.from({length:9},(_,i)=>{const t=(i+1)/10;return `L${r1(X(t)-.6)} ${r1(Y(t))}`}).join('')}" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width=".7"/>${an}${tip}</svg>`}
function eyeSvg(c,uid){let s='';const R=rng(9);for(let i=0;i<60;i++){const a=i/60*Math.PI*2,l=16+R()*16;s+=`M${r1(Math.cos(a)*4)} ${r1(Math.sin(a)*4)}L${r1(Math.cos(a)*l)} ${r1(Math.sin(a)*l)}`}
  return `<svg viewBox="-130 -130 260 260" ${NS}><defs><radialGradient id="be${uid}"><stop offset="0" stop-color="${c.eye}"/><stop offset=".55" stop-color="${c.eye}" stop-opacity=".85"/><stop offset="1" stop-color="${c.eye}" stop-opacity="0"/></radialGradient></defs><circle r="28" fill="url(#be${uid})"/><path d="${s}" stroke="${c.eye}" stroke-width=".7" opacity=".55"/><circle r="5" fill="${c.eye}"/></svg>`}
function bloom(c,cls,tag='div',attr=''){const uid=++U,base=-18;
  let p='';for(let i=0;i<5;i++){const a=base+i*72+[0,7,-4,9,-3][i],rad=(a-90)*Math.PI/180;p+=`<i class="br-pet" style="--tx:${r1(Math.cos(rad)*60)}%;--ty:${r1(Math.sin(rad)*60)}%;--rt:${[14,-10,16,-12,10][i]}deg;--dl:${[0,.05,.02,.07,.04][i]}s">${petalSvg(c,i,a,uid,false)}</i>`;
    if(i===4)p+=`<i class="br-pet" style="--tx:${r1(Math.cos((base-90)*Math.PI/180)*60)}%;--ty:${r1(Math.sin((base-90)*Math.PI/180)*60)}%;--rt:14deg;--dl:0s">${petalSvg(c,0,base,uid,true)}</i>`}
  return `<${tag} class="br-bloom ${cls}" ${attr}>${p}<i class="br-eye">${eyeSvg(c,uid)}</i><i class="br-sta">${stamenSvg(c,uid)}</i></${tag}>`}
// fine-line leaf: serrated ovate outline with midrib and veins
function leafD(x,y,rot,s){const pts=[];const N=22;for(let i=0;i<=N;i++){const t=i/N,yy=-t*100,ww=38*Math.sin(Math.PI*Math.pow(t,.8))*(1-.15*t),tooth=i%2?2.4:0;pts.push([-(ww+tooth),yy])}
  let d='M0 0';pts.forEach(([px,py])=>d+=`L${r1(px)} ${r1(py)}`);for(let i=pts.length-1;i>=0;i--){d+=`L${r1(-pts[i][0])} ${r1(pts[i][1])}`}d+='Z';
  let v='M0 6L0 -98';for(let k=1;k<=6;k++){const yy=-k*14;v+=`M0 ${yy}Q-14 ${yy-8} ${r1(-30*Math.sin(Math.PI*k/7.5))} ${yy-20}M0 ${yy}Q14 ${yy-8} ${r1(30*Math.sin(Math.PI*k/7.5))} ${yy-20}`}
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="${d}" stroke-width="${r1(1.1/s)}"/><path d="${v}" stroke-width="${r1(.7/s)}"/></g>`}
function budD(x,y,rot,s){return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0C-9 -14 -9 -34 0 -52C9 -34 9 -14 0 0Z" stroke-width="${r1(1.1/s)}"/><path d="M0 -50C-4 -34 2 -16 0 -2M-5 -40C0 -28 5 -18 3 -6" stroke-width="${r1(.6/s)}"/><path d="M0 2C-10 -4 -14 -14 -12 -22C-6 -14 -3 -8 0 -6C3 -8 6 -14 12 -22C14 -14 10 -4 0 2Z" stroke-width="${r1(.9/s)}"/><path d="M-9 -12l-6 -8M9 -12l6 -8M-4 -6l-3 -12M4 -6l3 -12" stroke-width="${r1(.6/s)}"/><path d="M0 2C0 14 -2 26 -8 38" stroke-width="${r1(1/s)}"/></g>`}
const lf=(ang,s,off)=>{const r=(ang-90)*Math.PI/180;return leafD(r1(200+Math.cos(r)*off),r1(200+Math.sin(r)*off),ang,s)};
const bd=(ang,s,off)=>{const r=(ang-90)*Math.PI/180;return budD(r1(200+Math.cos(r)*off),r1(200+Math.sin(r)*off),ang,s)};
const LEAVES=K.uri(`<svg ${NS} viewBox="0 0 400 400"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">
  ${lf(-138,1.05,78)}${lf(-108,.8,92)}${lf(142,1.0,82)}${lf(112,.78,96)}${lf(-30,.7,120)}${lf(40,.72,118)}
  ${bd(-160,.95,150)}${bd(166,.85,150)}
  <path d="M200 200L${r1(200+Math.cos((-160-90)*Math.PI/180)*150)} ${r1(200+Math.sin((-160-90)*Math.PI/180)*150)}M200 200L${r1(200+Math.cos((166-90)*Math.PI/180)*150)} ${r1(200+Math.sin((166-90)*Math.PI/180)*150)}" stroke-width="1"/></g></svg>`);
const SPRIG=K.uri(`<svg ${NS} viewBox="0 0 200 200"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 192C40 160 70 120 96 70C110 44 130 26 150 14" stroke-width="1.1"/><path d="M60 136C44 128 32 112 28 96M96 74C110 76 122 70 132 58" stroke-width=".9"/>
  ${leafD(46,152,-118,.62)}${leafD(84,98,64,.55)}${leafD(124,48,-80,.42)}${budD(150,14,52,.72)}${budD(28,96,-30,.5)}${budD(132,58,40,.48)}</g></svg>`);
const PETAL=`M0 0C-6 -9 -32 -18 -36 -38C-39 -50 -30 -60 -20 -61Q-14 -66 -8 -62Q-2 -67 4 -62Q10 -66 16 -61C28 -60 38 -50 36 -38C32 -18 6 -9 0 0Z`;
const BADGE=c=>K.uri(`<svg ${NS} viewBox="-42 -70 84 74"><defs><radialGradient id="g" cx="0" cy="0" r="66" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c.eye}"/><stop offset=".25" stop-color="${c.eye}"/><stop offset=".45" stop-color="${c.petalD}"/><stop offset="1" stop-color="${c.petalL}"/></radialGradient></defs><path d="${PETAL}" fill="url(#g)"/><g fill="none" stroke="${c.vein}" stroke-opacity=".55" stroke-width=".45">${[-6,-4,-2,0,2,4,6].map(k=>`<path d="M0 -3Q${k*1.5} -30 ${k*5.2} ${r1(-58+Math.abs(k)*1.2)}"/>`).join('')}</g><path d="${PETAL}" fill="none" stroke="${c.gold}" stroke-width="1"/></svg>`);
const pal=c=>({petal:c.petal||c.accent,petalD:c.petalD||c.accent,petalL:c.petalL||c.accent,eye:c.eye||'#4a0712',vein:c.vein||'#5a0a14',stamen:c.stamen||'#e9a0a0',pollen:c.pollen||'#f2c14e',pollenD:c.pollenD||'#9b6a12',stigma:c.stigma||'#b3122b',gold:c.gold});
FAMILY({key:'bungaraya',name:'Bunga Raya',meaning:'Hibiscus bloom',
  blurb:'A painted hibiscus among gold-foil leaves on textured paper; touch it and the petals open away to reveal the names.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Great Vibes', 'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1350,
  page(o,th,L){const [n1,n2]=coverNames(o),c=pal(th.c),en=o.lang==='en';
    return `<section class="page pg-bungaraya" style="--sprig:${SPRIG}"><div class="br-paper"></div><div class="br-fr"></div>
     <div class="br-spr tl">${bloom(c,'mini')}<i class="br-gl"></i></div><div class="br-spr br">${bloom(c,'mini')}<i class="br-gl"></i></div>
     <div class="br-txt"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="br-rule reveal d2"><i></i><b></b><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="br-v reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=pal(th.c),en=o.lang==='en';
    return `<div class="cover cv-bungaraya" style="--leaves:${LEAVES}"><div class="br-paper"></div><div class="br-fr"></div>
     <div class="br-head"><p class="br-k">${ev(o,L)}</p><p class="br-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="br-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <div class="br-stage"><i class="br-lv"></i>${bloom(c,'big',tag,`${attr} aria-label="${L.open}"`)}</div>
     <div class="br-foot">${guest?`<p class="br-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="br-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=pal(th.c);el.style.setProperty('--badge',BADGE(c));el.style.setProperty('--sprig',SPRIG);
    $$('.sec h2',el).forEach(h=>h.insertAdjacentHTML('afterbegin','<i class="br-bd"><i></i><i></i><i></i></i>'));
    K.secs(el).forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="br-cs a"></i><i class="br-cs b"></i>'))},
  themes:[
    {k:'merah',n:'Merah',desc:'Red hibiscus on ivory paper',c:{ground:'#f6efe3',sheet:'#fffaf2',ink:'#3a2420',accent:'#a3192b',gold:'#b08a48',pagefg:'#3a2420',petal:'#c8192e',petalD:'#9e0f22',petalL:'#ea4a52',eye:'#4a0712',vein:'#5c0814'}},
    {k:'malam',n:'Malam',desc:'Red hibiscus on a deep green night',c:{ground:'#0f1f1a',sheet:'#f7f0e4',ink:'#2a2320',accent:'#a3192b',gold:'#c9a35c',pagefg:'#f1e8d6',petal:'#d01f33',petalD:'#a3112a',petalL:'#f0585c',eye:'#3e0510',vein:'#5c0814'}},
    {k:'jambu',n:'Jambu',desc:'Pink hibiscus on blush paper',c:{ground:'#f8ebe8',sheet:'#fffaf8',ink:'#3e2a2c',accent:'#b23a5a',gold:'#b48c5a',pagefg:'#3e2a2c',petal:'#e77a96',petalD:'#cf4f74',petalL:'#f8b5c4',eye:'#7d1035',vein:'#8a1d42',stamen:'#f3b7c6',stigma:'#a3123c'}},
    {k:'kuning',n:'Kuning',desc:'Yellow hibiscus with a red heart',c:{ground:'#f7f1df',sheet:'#fffcf2',ink:'#3a2e1c',accent:'#9a6a12',gold:'#a88a4a',pagefg:'#3a2e1c',petal:'#f2c236',petalD:'#e3a51c',petalL:'#fbe183',eye:'#8c1420',vein:'#a5701a',stamen:'#f4d06a',pollen:'#fff1b0',stigma:'#b3122b'}},
    {k:'putih',n:'Putih',desc:'White hibiscus on slate',c:{ground:'#2b3138',sheet:'#f6f3ee',ink:'#272a2e',accent:'#8e1d33',gold:'#c4a670',pagefg:'#eeeae2',petal:'#f6f0ec',petalD:'#eadcd8',petalL:'#ffffff',eye:'#8e1d33',vein:'#b9a6a6',stamen:'#f1d7da',stigma:'#a3123c'}},
    {k:'jingga',n:'Jingga',desc:'Coral hibiscus on sand',c:{ground:'#f5ebdf',sheet:'#fffaf3',ink:'#3a2820',accent:'#b4472a',gold:'#ad8650',pagefg:'#3a2820',petal:'#ef7046',petalD:'#d84e2f',petalL:'#f9a679',eye:'#7d1420',vein:'#8f2d1a',stamen:'#f6b48f'}},
    {k:'marun',n:'Marun',desc:'Crimson bloom on maroon velvet',c:{ground:'#2c0a12',sheet:'#f7ece4',ink:'#2e1a1c',accent:'#8e1428',gold:'#d2a965',pagefg:'#f4e4d6',petal:'#b8122c',petalD:'#8a0c22',petalL:'#de3a48',eye:'#2a030a',vein:'#4a0712'}},
    {k:'zamrud',n:'Zamrud',desc:'Red hibiscus on emerald',c:{ground:'#0f3a2e',sheet:'#f8f2e6',ink:'#22302a',accent:'#a3192b',gold:'#d2b06a',pagefg:'#f2ead8',petal:'#d3243a',petalD:'#a3142c',petalL:'#f26a6a',eye:'#3e0510',vein:'#5c0814'}},
  ]});
