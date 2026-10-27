/* hibiskus: "Bunga Sepatu". A folded cream card with big painted hibiscus blooms (bunga raya) in two opposite
   corners: five ruffled petals in watercolour glazes that deepen to a dark eye, fine petal veins, the long staminal
   column dusted with pollen, serrated leaves and a twisted bud (all procedural SVG through a wet-edge filter).
   Names in a coral script. Cover: the folded card; tap "Buka Jemputan" and its front panel folds up and back.
   Page: the inside of the card, blooms in the corners. Skin: cream cards with a bloom tucked into one corner. */
needFont('Great+Vibes');
let hbsN=0;
const f1=n=>(+n).toFixed(1),PI=Math.PI;
const smo=p=>{const n=p.length,m=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2],s=m(p[n-1],p[0]);let d=`M${f1(s[0])} ${f1(s[1])}`;
  for(let i=0;i<n;i++){const q=m(p[i],p[(i+1)%n]);d+=`Q${f1(p[i][0])} ${f1(p[i][1])} ${f1(q[0])} ${f1(q[1])}`}return d+'Z'};
const rot=(p,a,cx,cy)=>[cx+p[0]*Math.cos(a)-p[1]*Math.sin(a),cy+p[0]*Math.sin(a)+p[1]*Math.cos(a)];
// one petal, pointing along +x from the centre, ruffled at its broad tip
function hbsPetal(R,r,sq=1){const pts=[[R*.05,-R*.05],[R*.28,-R*.3*sq],[R*.55,-R*.5*sq],[R*.78,-R*.5*sq]];
  for(let i=0;i<=9;i++){const a=-1.05+2.1*i/9,rr=R*.4*(1+(i%2?.045:-.03)+(r()-.5)*.05);pts.push([R*.6+Math.cos(a)*rr,Math.sin(a)*rr*1.12*sq])}
  pts.push([R*.78,R*.5*sq],[R*.55,R*.5*sq],[R*.28,R*.3*sq],[R*.05,R*.05]);return pts}
// a hibiscus bloom seen from the front
function hbsBloom(cx,cy,R,a0,colA,c,r){const id='hbs'+(++hbsN);let petals='',veins='';
  for(let i=0;i<5;i++){const a=a0+i*2*PI/5+(r()-.5)*.1,pts=hbsPetal(R*(.95+r()*.1),r,.98+r()*.12).map(p=>rot(p,a,cx,cy)),d=smo(pts);
    petals+=`<path d="${d}" fill="url(#${id})"/><path d="${d}" fill="none" stroke="${c.p1}" stroke-width="${f1(R*.012+.4)}" stroke-opacity=".45"/>`;
    // the shade where the next petal lies over this one, and a soft light down the middle
    const sh=[[R*.1,R*.02],[R*.5,R*.42],[R*.92,R*.3],[R*.6,R*.1]].map(p=>rot(p,a,cx,cy));
    petals+=`<path d="${smo(sh)}" fill="${c.p1}" opacity=".18"/>`;
    const hl=[[R*.35,-R*.06],[R*.85,-R*.16],[R*.9,R*.02],[R*.4,R*.02]].map(p=>rot(p,a,cx,cy));petals+=`<path d="${smo(hl)}" fill="#fff" opacity=".13"/>`;
    for(let k=-4;k<=4;k++){const b=a+k*.085,l0=R*.14,l1=R*(.62+r()*.25),bend=(r()-.5)*.08;
      veins+=`M${f1(cx+Math.cos(b)*l0)} ${f1(cy+Math.sin(b)*l0)}Q${f1(cx+Math.cos(b+bend)*l1*.6)} ${f1(cy+Math.sin(b+bend)*l1*.6)} ${f1(cx+Math.cos(b+bend*2)*l1)} ${f1(cy+Math.sin(b+bend*2)*l1)}`}}
  // the staminal column, curving out over the petals
  const ca=colA,L=R*1.02,ex=cx+Math.cos(ca)*L,ey=cy+Math.sin(ca)*L,mx=cx+Math.cos(ca+.2)*L*.55,my=cy+Math.sin(ca+.2)*L*.55;let pol='';
  for(let i=0;i<22;i++){const t=.58+i/22*.36,u=1-t,px=u*u*cx+2*u*t*mx+t*t*ex,py=u*u*cy+2*u*t*my+t*t*ey,o=(r()-.5)*R*.12,qx=px-Math.sin(ca)*o,qy=py+Math.cos(ca)*o;
    pol+=`<path d="M${f1(px)} ${f1(py)}L${f1(qx)} ${f1(qy)}" stroke="${c.col}" stroke-width=".5"/><circle cx="${f1(qx)}" cy="${f1(qy)}" r="${f1(R*.022+.3)}" fill="${i%3?'#e9b23c':'#d4891f'}"/>`}
  let stig='';for(let i=0;i<5;i++){const b=ca-.8+i*.4,sx=ex+Math.cos(b)*R*.06,sy=ey+Math.sin(b)*R*.06;stig+=`<path d="M${f1(ex)} ${f1(ey)}L${f1(sx)} ${f1(sy)}" stroke="${c.eye}" stroke-width=".8"/><circle cx="${f1(sx)}" cy="${f1(sy)}" r="${f1(R*.026+.4)}" fill="${c.eye}"/>`}
  return `<defs><radialGradient id="${id}" cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R*1.1)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c.eye}"/><stop offset=".17" stop-color="${c.eye}"/><stop offset=".26" stop-color="${c.p1}"/><stop offset=".55" stop-color="${c.p2}"/><stop offset="1" stop-color="${c.p3}"/></radialGradient></defs>
    ${petals}<path d="${veins}" stroke="${c.p1}" stroke-width=".55" opacity=".4" fill="none"/>
    <circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R*.1)}" fill="${c.eye}" opacity=".7"/>
    <path d="M${f1(cx)} ${f1(cy)}Q${f1(mx)} ${f1(my)} ${f1(ex)} ${f1(ey)}" stroke="${c.col}" stroke-width="${f1(R*.045)}" stroke-linecap="round" fill="none"/>
    <path d="M${f1(cx)} ${f1(cy)}Q${f1(mx)} ${f1(my)} ${f1(ex)} ${f1(ey)}" stroke="#fff" stroke-width="${f1(R*.012)}" stroke-linecap="round" fill="none" opacity=".45"/>${pol}${stig}`}
// a serrated hibiscus leaf
function hbsLeaf(x,y,len,ang,c,r){const id='hbs'+(++hbsN),a=ang*PI/180,W=len*.36,pts=[[0,0]];
  const w=t=>W*Math.pow(Math.sin(PI*Math.min(1,t)),.8)*(1-.35*t);
  for(let i=1;i<=16;i++){const t=i/16;pts.push([len*t,-w(t)*(i%2?1.06:.94)])}for(let i=15;i>=1;i--){const t=i/16;pts.push([len*t,w(t)*(i%2?1.06:.94)])}
  const P=pts.map(p=>rot(p,a,x,y));let d=P.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('')+'Z';
  let v=`M${f1(x)} ${f1(y)}L${f1(rot([len*.97,0],a,x,y)[0])} ${f1(rot([len*.97,0],a,x,y)[1])}`;
  for(const t of [.2,.38,.56,.72])for(const s of [-1,1]){const p0=rot([len*t,0],a,x,y),p1=rot([len*(t+.16),s*w(t+.16)*.85],a,x,y);v+=`M${f1(p0[0])} ${f1(p0[1])}L${f1(p1[0])} ${f1(p1[1])}`}
  const g0=rot([0,0],a,x,y),g1=rot([len,0],a,x,y),half=[[0,0]];for(let i=1;i<=16;i++){const t=i/16;half.push([len*t,w(t)])}
  return `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${f1(g0[0])}" y1="${f1(g0[1])}" x2="${f1(g1[0])}" y2="${f1(g1[1])}"><stop offset="0" stop-color="${c.l1}"/><stop offset=".7" stop-color="${c.l2}"/><stop offset="1" stop-color="${c.l3}"/></linearGradient></defs>
    <path d="M${f1(x)} ${f1(y)}l${f1(-Math.cos(a)*len*.18)} ${f1(-Math.sin(a)*len*.18)}" stroke="${c.l1}" stroke-width="2"/>
    <path d="${d}" fill="url(#${id})" stroke="${c.l1}" stroke-width=".7" stroke-opacity=".5"/><path d="${half.map(p=>rot(p,a,x,y)).map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('')}Z" fill="${c.l1}" opacity=".25"/>
    <path d="${v}" stroke="${c.l3}" stroke-width=".7" opacity=".7" fill="none"/>`}
// a furled bud with its green calyx
function hbsBud(x,y,len,ang,c){const a=ang*PI/180,P=p=>rot(p,a,x,y),pts=[[0,-len*.12],[len*.45,-len*.17],[len*.85,-len*.08],[len,0],[len*.85,len*.07],[len*.45,len*.15],[0,len*.12]].map(P);
  const cal=[[-len*.05,-len*.15],[len*.32,-len*.2],[len*.22,0],[len*.32,len*.2],[-len*.05,len*.15]].map(P),tw=[P([len*.15,-len*.1]),P([len*.6,len*.02]),P([len*.97,0])];
  return `<path d="M${f1(x)} ${f1(y)}l${f1(-Math.cos(a)*len*.5)} ${f1(-Math.sin(a)*len*.5)}" stroke="${c.l1}" stroke-width="2.2" stroke-linecap="round"/><path d="${smo(pts)}" fill="${c.p2}"/><path d="M${f1(tw[0][0])} ${f1(tw[0][1])}Q${f1(tw[1][0])} ${f1(tw[1][1])} ${f1(tw[2][0])} ${f1(tw[2][1])}" stroke="${c.p1}" stroke-width="1" fill="none" opacity=".7"/><path d="${smo(cal)}" fill="${c.l2}"/>`}
// a corner cluster, the card's corner at 0,0
function hbsCluster(c,seed,cls){const r=rng(seed),fid='hbs'+(++hbsN);
  const body=hbsLeaf(150,40,120,-12,c,r)+hbsLeaf(40,150,120,102,c,r)+hbsLeaf(150,138,92,40,c,r)+hbsLeaf(10,40,90,60,c,r)+hbsLeaf(200,10,80,-30,c,r)+hbsBud(214,92,52,24,c)+hbsBud(70,224,46,80,c)
    +hbsBloom(196,52,46,.9,2.5,c,r)+hbsBloom(78,80,80,.3,.85,c,r);
  return `<svg class="hbs-cl ${cls}" viewBox="0 0 300 300" ${NS}><defs><filter id="${fid}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="3" seed="${seed%60}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="${seed%60+2}" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -.28 1.08" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter></defs>
    <g filter="url(#${fid})">${body}</g></svg>`}
const hbsNames=(o,cls='')=>{const [n1,n2]=coverNames(o);return `<h1 class="hbs-names ${cls}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
const hbsDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};

FAMILY({key:'hibiskus',name:'Bunga Sepatu',meaning:'Painted hibiscus',
  blurb:'A folded cream card with big painted hibiscus blooms in two corners, their petals deepening to a dark eye, and the names in a warm coral script. The front of the card folds up to open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const c=th.c,en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-hibiskus ${c.dark?'hbs-dk':''}"><div class="hbs-card">${hbsCluster(c,41,'tr')}${hbsCluster(c,52,'bl')}
      <div class="hbs-body">
        <div class="hbs-ph"></div>
        ${o.bismillah?`<p class="hbs-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="hbs-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${hbsNames(o)}</div>
        <p class="hbs-date reveal d2"><span>${esc(hbsDay(o))}</span><b>${esc(fmtDate(o.date,o.lang,false))}</b></p>
        ${o.hijri?`<p class="hbs-hj reveal d2">${esc(o.hijri)}</p>`:''}
        ${t?`<p class="hbs-time reveal d2">${esc(t)}</p>`:''}
        ${o.venue?`<a href="#" class="hbs-ven reveal d2" data-go="loc">${esc(o.venue)}</a>`:''}
        <div class="hbs-pills reveal d3"><a class="hbs-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="hbs-pill ghost" data-go="rsvp" href="#">${en?'RSVP':'Sahkan Kehadiran'}</a>`:''}</div>
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-hibiskus ${c.dark?'hbs-dk':''}"><div class="hbs-stage"><div class="hbs-inside">${hbsCluster(c,41,'tr')}</div><div class="hbs-card hbs-front">${hbsCluster(c,7,'tr')}${hbsCluster(c,19,'bl')}
      <div class="hbs-cbody"><p class="hbs-k">${ev(o,L)}</p>${hbsNames(o,'cv')}<p class="hbs-sdate">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${o.venue?`<p class="hbs-cven">${esc(o.venue)}</p>`:''}
        ${guest?`<p class="hbs-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="hbs-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
    </div></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('hbs-dk',!!th.c.dark);
    el.style.setProperty('--hbs-bloom',K.uri(hbsCluster(th.c,77,'')));
    const pg=$('.pg-hibiskus',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const slot=$('.hbs-ph',pg);img.removeAttribute('style');slot.appendChild(img);slot.classList.add('on');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Red hibiscus on cream, coral script',c:{ground:'#efe2d2',sheet:'#fdf7ec',ink:'#3b2a24',accent:'#cf4f43',gold:'#c39a6e',pagefg:'#3b2a24',eye:'#5c0b1c',p1:'#b0142f',p2:'#dd3448',p3:'#f49a90',col:'#f6c9c0',l1:'#24452c',l2:'#3e6e3f',l3:'#8bb06a'}},
    {k:'jambu',n:'Jambu',desc:'Pink hibiscus on blush cream',c:{ground:'#f3dfe0',sheet:'#fef8f4',ink:'#3e2a2f',accent:'#c74b70',gold:'#c7998a',pagefg:'#3e2a2f',eye:'#6e0f33',p1:'#c03769',p2:'#ea6d98',p3:'#f8bfd0',col:'#fbd9e2',l1:'#25472f',l2:'#41744a',l3:'#90b875'}},
    {k:'karang',n:'Karang',desc:'Coral-orange hibiscus on warm cream',c:{ground:'#f2e1cd',sheet:'#fef8ee',ink:'#3c2b22',accent:'#d0603f',gold:'#c79a68',pagefg:'#3c2b22',eye:'#7a1420',p1:'#d2412c',p2:'#f2794f',p3:'#fbb892',col:'#fbd4c0',l1:'#294a2f',l2:'#477445',l3:'#95b46a'}},
    {k:'kuning',n:'Kuning',desc:'Golden hibiscus with a red eye',c:{ground:'#efe7d2',sheet:'#fefaee',ink:'#3a3022',accent:'#c0612b',gold:'#c39a55',pagefg:'#3a3022',eye:'#951a24',p1:'#d98c1a',p2:'#f5c241',p3:'#fde7a0',col:'#fbe7b5',l1:'#2a4a2c',l2:'#4a7642',l3:'#9cb86a'}},
    {k:'putih',n:'Putih',desc:'White hibiscus with a crimson eye, sage ground',c:{ground:'#dfe5d8',sheet:'#fdfcf6',ink:'#2f3530',accent:'#a33a4c',gold:'#a6a07c',pagefg:'#2f3530',eye:'#9b1631',p1:'#d9b3b0',p2:'#f1e0da',p3:'#fffaf5',col:'#f5e3dc',l1:'#24452f',l2:'#40704a',l3:'#90b67c'}},
    {k:'ungu',n:'Ungu',desc:'Magenta hibiscus on lilac cream',c:{ground:'#ebdfe9',sheet:'#fdf8fb',ink:'#382a36',accent:'#9c3c86',gold:'#b69aa8',pagefg:'#382a36',eye:'#4f0d3e',p1:'#8f2878',p2:'#c75aa8',p3:'#eab0d8',col:'#f3d6ea',l1:'#25452f',l2:'#41704a',l3:'#90b67c'}},
    {k:'hijau',n:'Hijau Daun',desc:'Cream card on a deep leaf-green ground',c:{ground:'#1f3a2d',sheet:'#fdf7ec',ink:'#3b2a24',accent:'#cf4f43',gold:'#c39a6e',pagefg:'#f1ebdc',eye:'#5c0b1c',p1:'#b0142f',p2:'#dd3448',p3:'#f49a90',col:'#f6c9c0',l1:'#1d3d27',l2:'#3a6a3c',l3:'#86ac66'}},
    {k:'malam',n:'Malam',desc:'Red and pink blooms on a night card',c:{ground:'#121014',sheet:'#211b1f',ink:'#f1e6dc',accent:'#f2907e',gold:'#cfa47c',pagefg:'#f1e6dc',dark:1,eye:'#4a0614',p1:'#b8183a',p2:'#e4425a',p3:'#f6a3a0',col:'#f6c9c0',l1:'#1f3d29',l2:'#3c6c40',l3:'#7fa565'}},
  ]});
