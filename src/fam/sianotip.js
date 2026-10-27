/* sianotip: a cyanotype sun print. Prussian blue brushed onto cotton paper, white botanical silhouettes where ferns,
   lace umbels, grasses and leaves were laid in the sun. Cover: touch the sun mark and the print develops (shapes sharpen,
   the blue deepens) and the sheet dissolves. Page: a print panel with the names in white. Skin: brushed blue cards. */
const f1=n=>n.toFixed(1);
const qp=(a,b,c,t)=>{const u=1-t;return [u*u*a[0]+2*u*t*b[0]+t*t*c[0],u*u*a[1]+2*u*t*b[1]+t*t*c[1]]};
const qa=(a,b,c,t)=>Math.atan2(2*(1-t)*(b[1]-a[1])+2*t*(c[1]-b[1]),2*(1-t)*(b[0]-a[0])+2*t*(c[0]-b[0]));
const pol=(x,y,a,d)=>[x+Math.cos(a)*d,y+Math.sin(a)*d];
// one fern pinna: a row of rounded pinnules either side of a fine axis
function pinna(x,y,a,len){let s='';const n=Math.max(3,Math.round(len/4.6)),[ex,ey]=pol(x,y,a,len);
  s+=`M${f1(x)} ${f1(y)}L${f1(ex)} ${f1(ey)}`;let e='';
  for(let i=0;i<n;i++){const t=(i+.6)/(n+.4),[px,py]=pol(x,y,a,len*t),r=Math.max(1,len*.09*(1-t*.65));
    for(const sd of [-1,1]){const aa=a+sd*1.05,[cx,cy]=pol(px,py,aa,r*.9);e+=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(r*1.05)}" ry="${f1(r*.62)}" transform="rotate(${f1(aa*180/Math.PI)} ${f1(cx)} ${f1(cy)})"/>`}}
  return [s,e]}
function frond(a,b,c,n,size){let line=`M${a[0]} ${a[1]}Q${b[0]} ${b[1]} ${c[0]} ${c[1]}`,el='';
  for(let i=1;i<n;i++){const t=i/n,[x,y]=qp(a,b,c,t),an=qa(a,b,c,t),l=size*Math.pow(Math.sin(Math.PI*(.12+t*.86)),.7)*(1-t*.35);
    for(const sd of [-1,1]){const [s,e]=pinna(x,y,an+sd*1.08-sd*t*.25,l);line+=s;el+=e}}
  return `<path d="${line}" fill="none" stroke-width=".9"/>${el}`}
// Queen Anne's lace: a dome of rays, each ending in a tiny umbellet of dots
function umbel(x0,y0,cx,cy,R,r){let s=`<path d="M${x0} ${y0}Q${f1((x0+cx)/2+12)} ${f1((y0+cy)/2+10)} ${cx} ${cy}" fill="none" stroke-width="1.4"/>`,d='',dots='';
  for(let i=0;i<15;i++){const a=-Math.PI*.92+i/14*Math.PI*.84,rr=R*(.82+r()*.18),[ex,ey]=pol(cx,cy,a,rr);d+=`M${cx} ${cy}L${f1(ex)} ${f1(ey)}`;
    for(let j=0;j<9;j++){const b=a-1+j/8*2,[fx,fy]=pol(ex,ey,b,7+r()*2);d+=`M${f1(ex)} ${f1(ey)}L${f1(fx)} ${f1(fy)}`;dots+=`<circle cx="${f1(fx)}" cy="${f1(fy)}" r="${f1(1.2+r()*.8)}"/>`}}
  return s+`<path d="${d}" fill="none" stroke-width=".6"/>${dots}`}
function grass(a,b,c,r){let s=`<path d="M${a[0]} ${a[1]}Q${b[0]} ${b[1]} ${c[0]} ${c[1]}" fill="none" stroke-width="1"/>`,g='';
  for(let i=0;i<22;i++){const t=.5+i/44,[x,y]=qp(a,b,c,t),an=qa(a,b,c,t)+(i%2?-.5:.5),[gx,gy]=pol(x,y,an,6);
    g+=`<path d="M${f1(x)} ${f1(y)}L${f1(gx)} ${f1(gy)}" fill="none" stroke-width=".5"/><ellipse cx="${f1(gx)}" cy="${f1(gy)}" rx="${f1(4.2-t*1.6)}" ry="1.5" transform="rotate(${f1(an*180/Math.PI)} ${f1(gx)} ${f1(gy)})"/>`}
  return s+g}
// a serrated leaf with negative veins
function leaf(x,y,ang,len,w,vein){let up='',dn='';const n=18;
  for(let i=0;i<=n;i++){const t=i/n,h=w*Math.pow(Math.sin(Math.PI*t),.85)*(1-t*.25)+(i%2?1.3:0)*(t>0&&t<1);up+=`${i?'L':'M'}${f1(len*t)} ${f1(-h)}`;dn=`L${f1(len*t)} ${f1(h)}`+dn}
  let v=`M2 0H${f1(len*.95)}`;for(let i=1;i<7;i++){const t=i/7.5;v+=`M${f1(len*t)} 0l${f1(len*.1)} ${f1(-w*.7*Math.sin(Math.PI*t))}M${f1(len*t)} 0l${f1(len*.1)} ${f1(w*.7*Math.sin(Math.PI*t))}`}
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${ang})"><path d="${up}${dn}Z"/><path d="M-14 0H2" fill="none" stroke-width="1.1"/><path d="${v}" fill="none" stroke="${vein}" stroke-width=".7" opacity=".55"/></g>`}
/* the botanicals laid on a 360x720 sheet; `full` adds more around the edges for the cover */
function plants(c,seed,full){const r=rng(seed);
  return `<g class="sn-pl" fill="${c.sheet}" stroke="${c.sheet}">
   <g opacity=".95">${frond([10,716],[10,560],[128,440],30,50)}</g>
   <g opacity=".9">${frond([366,-10],[350,110],[262,206],26,42)}</g>
   <g opacity=".85">${umbel(-6,300,86,112,64,r)}${umbel(380,470,322,400,30,r)}</g>
   <g opacity=".92">${grass([366,708],[330,600],[268,486],r)}${grass([366,712],[350,610],[316,482],r)}${grass([360,716],[300,640],[226,580],r)}</g>
   ${full?`<g opacity=".8">${leaf(176,94,-28,52,15,c.accent)}${leaf(196,664,-150,46,14,c.accent)}${leaf(42,316,70,34,10,c.accent)}${leaf(322,330,112,38,11,c.accent)}</g>`:`<g opacity=".8">${leaf(196,664,-150,46,14,c.accent)}</g>`}
  </g>`}
let uid=0;
/* the print: brushed emulsion edge (turbulence-displaced) with streaky coating and a deeper "developed" layer */
function print(c,id,seed,box){const [x,y,w,h]=box;let bristle='';const r=rng(seed+5);
  for(let i=0;i<26;i++){const yy=y+r()*h,l=8+r()*26;bristle+=`<rect x="${f1(x-l*.6)}" y="${f1(yy)}" width="${f1(l)}" height="${f1(.8+r()*1.8)}"/><rect x="${f1(x+w-l*.4)}" y="${f1(y+r()*h)}" width="${f1(l)}" height="${f1(.8+r()*1.8)}"/>`}
  return `<defs><filter id="sb${id}" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency=".018 .16" numOctaves="3" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G"/></filter>
   <filter id="ss${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .06" numOctaves="4" seed="${seed+2}"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1.1 -.42"/></filter>
   <filter id="sd${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="${seed+4}"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .9 -.55"/></filter>
   <mask id="sm${id}"><g filter="url(#sb${id})" fill="#fff"><rect x="${x}" y="${y}" width="${w}" height="${h}"/>${bristle}</g></mask></defs>
   <g mask="url(#sm${id})"><rect width="100%" height="100%" fill="${c.accent}"/><rect class="sn-deep" width="100%" height="100%" fill="${c.deep}"/>
    <rect width="100%" height="100%" filter="url(#ss${id})" opacity=".16"/><rect width="100%" height="100%" filter="url(#sd${id})" opacity=".35"/></g>`}
function sun(c){let d='';for(let i=0;i<24;i++){const a=i/24*Math.PI*2,[x1,y1]=pol(30,30,a,15.5),[x2,y2]=pol(30,30,a,i%2?21:26);d+=`M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}`}
  return `<svg viewBox="0 0 60 60"><path d="${d}" stroke="${c.sheet}" stroke-width=".8" stroke-linecap="round"/><circle cx="30" cy="30" r="12.5" fill="none" stroke="${c.sheet}" stroke-width="1"/><circle cx="30" cy="30" r="10" fill="none" stroke="${c.sheet}" stroke-width=".5" stroke-dasharray="0 2.2" stroke-linecap="round"/></svg>`}
FAMILY({key:'sianotip',name:'Sianotip',meaning:'Cyanotype sun print',
  blurb:'A Prussian-blue sun print with white fern, lace and grass silhouettes. Touch the sun and the print develops.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id='p'+(++uid);return `<section class="page pg-sianotip" style="--deep:${c.deep}"><div class="sn-paper reveal">
    <svg class="sn-print" viewBox="0 0 360 720" preserveAspectRatio="xMidYMid slice">${print(c,id,7,[22,24,316,640])}${plants(c,11,false)}</svg>
    <div class="sn-in"><p class="sn-k reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="sn-rule reveal d2"><i></i><b></b><i></i></div><p class="sn-d reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="sn-v reveal d3">${esc(o.venue)}</p></div>
    <p class="sn-pencil">${en?'cyanotype':'sianotip'} &middot; ${esc(fmtShort(o.date))}<span>${esc(n1)} &amp; ${esc(n2)}</span></p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id='c'+(++uid);
    return `<div class="cover cv-sianotip" style="--deep:${c.deep}"><div class="sn-paper">
     <svg class="sn-print" viewBox="0 0 360 720" preserveAspectRatio="xMidYMid slice">${print(c,id,3,[22,24,316,640])}${plants(c,5,true)}</svg>
     <div class="sn-txt"><p class="sn-k">${ev(o,L)}</p><p class="sn-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</p>
      <div class="sn-rule"><i></i><b></b><i></i></div><p class="sn-d">${esc(fmtDate(o.date,o.lang))}</p>
      ${guest?`<p class="sn-to">${L.dear}<b>${esc(guest)}</b></p>`:''}</div>
     <${tag} class="sn-sun" ${attr} aria-label="${L.open}">${sun(c)}</${tag}>
     <p class="sn-hint">${en?'Open invitation':'Buka Jemputan'}</p>
     <p class="sn-pencil">${en?'cyanotype':'sianotip'} &middot; ${esc(fmtShort(o.date))}<span>No. 1/1</span></p></div></div>`},
  skin(el,o,th){const c=th.c;K.cards(el);el.style.setProperty('--snP',c.sheet);el.style.setProperty('--snB',c.accent);el.style.setProperty('--snD',c.deep);el.style.setProperty('--deep',c.deep);
    el.style.setProperty('--snMask',K.uri(`<svg ${NS} viewBox="0 0 300 400" preserveAspectRatio="none"><filter id="b" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".02 .2" numOctaves="3" seed="4"/><feDisplacementMap in="SourceGraphic" scale="14" xChannelSelector="R" yChannelSelector="G"/></filter><rect x="10" y="10" width="280" height="380" fill="#fff" filter="url(#b)"/></svg>`));
    const r=rng(17);
    K.secs(el).forEach((s,i)=>{const g=i%3===0?frond([0,120],[10,60],[60,20],14,16):i%3===1?umbel(-4,120,40,50,34,r):grass([0,124],[30,80],[86,30],r);
      s.insertAdjacentHTML('afterbegin',`<i class="sn-bg"></i><svg class="sn-sk ${i%2?'r':'l'}" viewBox="0 0 120 120" fill="${c.sheet}" stroke="${c.sheet}">${g}</svg>`);
      const h=s.querySelector('h2');if(h)h.insertAdjacentHTML('afterend','<div class="sn-rule"><i></i><b></b><i></i></div>')})},
  themes:[
    {k:'biru',n:'Biru Prusia',desc:'Classic Prussian blue on stone',c:{ground:'#d9d3c6',sheet:'#f8f5ee',ink:'#2b3442',accent:'#2a5c94',deep:'#173d70',gold:'#8fb2d6',pagefg:'#26303d'}},
    {k:'nila',n:'Nila',desc:'Deep indigo on night slate',c:{ground:'#141b2c',sheet:'#f6f3ec',ink:'#232a3e',accent:'#2a3f7a',deep:'#17224f',gold:'#9fb0dc',pagefg:'#e9edf6'}},
    {k:'laut',n:'Laut',desc:'Sea teal on pale grey',c:{ground:'#dde3e1',sheet:'#f7f7f2',ink:'#22383d',accent:'#1f6a7c',deep:'#114a5a',gold:'#8cc0c8',pagefg:'#22383d'}},
    {k:'ungu',n:'Ungu',desc:'Tannin violet on lilac',c:{ground:'#e2dbe4',sheet:'#f8f5f1',ink:'#2f2a3e',accent:'#4a3f7e',deep:'#2f2758',gold:'#b6aad6',pagefg:'#2f2a3e'}},
    {k:'teh',n:'Teh',desc:'Tea-toned sepia on walnut',c:{ground:'#2b221b',sheet:'#f6efe2',ink:'#3a2c22',accent:'#6a4e36',deep:'#4a3422',gold:'#d2b48a',pagefg:'#f1e6d4'}},
    {k:'hitam',n:'Hitam',desc:'Black-toned print on ash',c:{ground:'#cfccc5',sheet:'#f7f6f2',ink:'#25272b',accent:'#3a3f47',deep:'#1f2228',gold:'#a9aeb8',pagefg:'#25272b'}},
    {k:'hijau',n:'Hijau',desc:'Green-toned print on forest',c:{ground:'#18221d',sheet:'#f4f3ea',ink:'#22332b',accent:'#2e5a49',deep:'#1b3c30',gold:'#9cc1ae',pagefg:'#e7efe9'}},
    {k:'senja',n:'Senja',desc:'Rose-toned print on blush',c:{ground:'#eadcd7',sheet:'#fbf7f3',ink:'#3e2730',accent:'#7a3b54',deep:'#55243a',gold:'#d8a9b8',pagefg:'#3e2730'}},
  ]});
