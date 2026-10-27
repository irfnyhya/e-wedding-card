/* sutera: jewel-coloured silk (emerald, sapphire, ruby…) with a pointed arch embroidered in gold thread: a twisted couched cord,
   climbing vines whose leaves are worked in satin stitch (two slanting halves), five-petal blossoms with french-knot centres,
   and a padded cream silk inset holding the names. Drawn in fine SVG over the silk texture, silk.jpg.
   Cover: tap "Buka Jemputan"; a sheen runs across the silk and the embroidered panel comes forward and dissolves into the page.
   Page: the same arch, taller. Skin: cream silk panels edged with a couched gold cord and a small embroidered sprig. */
needFont('Parisienne');
let suN=0;
const suF=v=>v.toFixed(1);
const SU_S=200,SU_R=124;
const suAy=k=>SU_S-Math.sqrt((SU_R-k)*(SU_R-k)-400);
const suArch=(k,B)=>`M${suF(46+k)} ${B}V${SU_S}A${SU_R-k} ${SU_R-k} 0 0 1 150 ${suF(suAy(k))}A${SU_R-k} ${SU_R-k} 0 0 1 ${suF(254-k)} ${SU_S}V${B}`;
// a point and its direction along the left half of the arch at offset k: s from 0 (bottom, y=B) to 1 (apex)
function suAt(k,B,s){const Lv=B-SU_S,a0=Math.PI,a1=Math.atan2(suAy(k)-SU_S,150-170)+Math.PI*2,r=SU_R-k,La=r*(a1-a0),d=s*(Lv+La);
  if(d<=Lv)return [46+k,B-d,-Math.PI/2];const a=a0+(d-Lv)/r;return [170+Math.cos(a)*r,SU_S+Math.sin(a)*r,a+Math.PI/2]}
const suDeg=a=>suF(a*180/Math.PI);
// a satin-stitched leaf at (x,y) pointing at angle a (radians), length l
const suLeaf=(x,y,a,l,u)=>{const w=l*.36;return `<g transform="translate(${suF(x)} ${suF(y)}) rotate(${suDeg(a)})"><path d="M0 0Q${suF(l*.45)} ${suF(-w)} ${suF(l)} 0Z" fill="url(#sug${u})"/><path d="M0 0Q${suF(l*.45)} ${suF(-w)} ${suF(l)} 0Z" fill="url(#sua${u})"/>
  <path d="M0 0Q${suF(l*.45)} ${suF(w)} ${suF(l)} 0Z" fill="url(#sud${u})"/><path d="M0 0Q${suF(l*.45)} ${suF(w)} ${suF(l)} 0Z" fill="url(#sub${u})"/></g>`};
// a five-petal blossom with a french-knot centre
function suFlower(x,y,r,rot,u){let p='';for(let i=0;i<5;i++){p+=`<g transform="rotate(${rot+i*72})"><path d="M0 0C${suF(-r*.62)} ${suF(-r*.35)} ${suF(-r*.48)} ${suF(-r)} 0 ${suF(-r*.92)}C${suF(r*.48)} ${suF(-r)} ${suF(r*.62)} ${suF(-r*.35)} 0 0Z" fill="url(#sug${u})"/><path d="M0 0C${suF(-r*.62)} ${suF(-r*.35)} ${suF(-r*.48)} ${suF(-r)} 0 ${suF(-r*.92)}C${suF(r*.48)} ${suF(-r)} ${suF(r*.62)} ${suF(-r*.35)} 0 0Z" fill="url(#suc${u})"/></g>`}
  let kn='';K.ring(7,r*.22,0,0).forEach(([kx,ky])=>{kn+=`<circle cx="${suF(kx)}" cy="${suF(ky)}" r="${suF(r*.11)}"/>`});
  return `<g transform="translate(${suF(x)} ${suF(y)})">${p}<circle r="${suF(r*.3)}" fill="#5c3d0e"/><g fill="url(#suk${u})">${kn}<circle r="${suF(r*.11)}"/></g></g>`}
function suFrame(c,H){const u=++suN,B=H-34;
  // vines up both sides: the stem follows the arch outside it; leaves alternate; blossoms at the foot, the side, the shoulder
  let side='';const k=-15;
  side+=`<path d="${suArch(k,B).split('A')[0]}A${SU_R-k} ${SU_R-k} 0 0 1 ${suF(150)} ${suF(suAy(k))}" fill="none" stroke="url(#sug${u})" stroke-width="1.7"/>`;
  for(let i=0;i<30;i++){const s=.04+i*.031;if(s>.94)break;const [x,y,a]=suAt(k,B,s),o=i%2?1:-1,l=i%3?13:16;side+=suLeaf(x,y,a+o*.9,l,u);if(i%4===1){const [x2,y2]=[x+Math.cos(a+o*1.4)*9,y+Math.sin(a+o*1.4)*9];side+=`<path d="M${suF(x)} ${suF(y)}L${suF(x2)} ${suF(y2)}" stroke="url(#sug${u})" stroke-width=".9"/><circle cx="${suF(x2)}" cy="${suF(y2)}" r="2.6" fill="url(#suk${u})"/>`}}
  const fl=[[.02,14,10],[.3,9,30],[.52,11,12],[.72,8,0],[.88,8,40]];fl.forEach(([s,r,rot])=>{const [x,y]=suAt(k,B,s);side+=suFlower(x,y,r,rot,u)});
  const [bx,by]=suAt(k,B,.2);side+=`<path d="M${suF(bx)} ${suF(by)}q14 -4 18 -18" fill="none" stroke="url(#sug${u})" stroke-width="1.2"/>${suFlower(bx+18,by-19,6,15,u)}`;
  const crownY=suAy(k)-4;
  return `<svg class="sut-svg" viewBox="0 0 300 ${H}"><defs>
    <linearGradient id="sug${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e3a3"/><stop offset=".35" stop-color="#cfa452"/><stop offset=".55" stop-color="#f3d98f"/><stop offset=".8" stop-color="#a77c30"/><stop offset="1" stop-color="#e2c070"/></linearGradient>
    <linearGradient id="sud${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9a052"/><stop offset=".5" stop-color="#9d7329"/><stop offset="1" stop-color="#c79f4f"/></linearGradient>
    <radialGradient id="suk${u}" cx=".35" cy=".3"><stop offset="0" stop-color="#fff2c4"/><stop offset=".6" stop-color="#d2a650"/><stop offset="1" stop-color="#7c5718"/></radialGradient>
    <pattern id="sua${u}" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(52)"><path d="M0 1H2" stroke="#6a4810" stroke-width=".35" opacity=".55"/></pattern>
    <pattern id="sub${u}" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(-52)"><path d="M0 1H2" stroke="#5a3c0c" stroke-width=".35" opacity=".5"/></pattern>
    <pattern id="suc${u}" width="1.8" height="1.8" patternUnits="userSpaceOnUse"><path d="M.9 0V1.8" stroke="#6a4810" stroke-width=".3" opacity=".5"/></pattern>
    <pattern id="sus${u}" width="120" height="120" patternUnits="userSpaceOnUse"><image href="${A}silk.jpg" width="120" height="120"/></pattern>
    <radialGradient id="suh${u}" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".08"/></radialGradient></defs>
   <path d="${suArch(9,B)}Z" fill="${c.sheet}"/><path d="${suArch(9,B)}Z" fill="url(#sus${u})" style="mix-blend-mode:multiply" opacity=".14"/><path d="${suArch(9,B)}Z" fill="url(#suh${u})"/>
   <g class="sut-emb">
    <path d="${suArch(0,B)}" fill="none" stroke="url(#sug${u})" stroke-width="3.4"/><path d="${suArch(0,B)}" fill="none" stroke="#5c3d0e" stroke-width="3.4" stroke-dasharray=".7 1.5" opacity=".55"/>
    <path d="${suArch(5.5,B)}" fill="none" stroke="url(#sug${u})" stroke-width="1.1" stroke-dasharray="2.2 .7"/>
    <path d="M24 ${B+9}H276" stroke="url(#sug${u})" stroke-width="3"/><path d="M24 ${B+9}H276" stroke="#5c3d0e" stroke-width="3" stroke-dasharray=".7 1.5" opacity=".4"/>
    ${side}<g transform="translate(300 0) scale(-1 1)">${side}</g>
    ${suLeaf(150,crownY,-Math.PI*.5-.95,15,u)}${suLeaf(150,crownY,-Math.PI*.5+.95,15,u)}${suLeaf(150,crownY-4,Math.PI+.25,13,u)}${suLeaf(150,crownY-4,-.25,13,u)}
    ${suFlower(150,crownY-14,13,0,u)}
    ${suLeaf(150,B+9,Math.PI+.2,16,u)}${suLeaf(150,B+9,-.2,16,u)}${suFlower(150,B+9,9,36,u)}
   </g></svg>`}
const suText=(o,L,page)=>{const [n1,n2]=coverNames(o);
  return `${page&&o.bismillah?'<p class="sut-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}<p class="sut-k${page?' kicker':''}">${ev(o,L)}</p>
    <${page?'h1':'p'} class="sut-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${page?'h1':'p'}>
    <i class="sut-rule"></i><p class="sut-date">${esc(fmtDate(o.date,o.lang))}</p>${page&&o.hijri?`<p class="sut-hj">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="sut-ven">${esc(o.venue)}</p>`:''}`};
FAMILY({key:'sutera',name:'Sutera',meaning:'Embroidered silk',
  blurb:'Jewel-coloured silk with a pointed arch embroidered in gold thread, vines and blossoms climbing it, and a cream silk inset holding the names. A sheen runs over the silk as it opens.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Parisienne', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const c=th.c,en=o.lang==='en';
    return `<section class="page pg-sutera${c.light?' sut-light':''}"><div class="sut-silk"></div>
      <div class="sut-panel sut-big reveal">${suFrame(c,540)}<div class="sut-txt">${suText(o,L,true)}</div></div>
      <div class="sut-pills reveal d2"><a class="sut-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="sut-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-sutera${c.light?' sut-light':''}"><div class="sut-silk"></div><i class="sut-sheen"></i>
      <div class="sut-panel sut-cp">${suFrame(c,470)}<div class="sut-txt">${suText(o,L,false)}</div></div>
      <div class="sut-foot">${guest?`<p class="sut-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="sut-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('sut-lt',!!c.light);
    const u='k';el.style.setProperty('--sutsprig',K.uri(`<svg ${NS} viewBox="0 0 120 30"><g fill="#000"><path d="M10 15H50M70 15H110" stroke="#000" stroke-width="1.4" stroke-dasharray="3 1"/>${[0,72,144,216,288].map(r=>`<path transform="translate(60 15) rotate(${r})" d="M0 0C-5 -3 -4 -9 0 -9C4 -9 5 -3 0 0Z"/>`).join('')}<path transform="translate(44 15) rotate(-20)" d="M0 0Q-6 -5 -12 0Q-6 5 0 0Z"/><path transform="translate(76 15) rotate(20)" d="M0 0Q6 -5 12 0Q6 5 0 0Z"/></g></svg>`));
    const sc=$('.scroller',el);
    $$('.pg-sutera [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'zamrud',n:'Zamrud',desc:'Gold embroidery on emerald silk',c:{ground:'#0f4a36',sheet:'#fbf5e6',ink:'#2b2f28',accent:'#14543d',gold:'#c9a352',pagefg:'#f1ead6'}},
    {k:'nila',n:'Nila',desc:'Gold embroidery on sapphire silk',c:{ground:'#17306a',sheet:'#fbf6ea',ink:'#262b38',accent:'#1d3a7a',gold:'#c9a352',pagefg:'#eef0f6'}},
    {k:'merah',n:'Merah',desc:'Gold embroidery on ruby silk',c:{ground:'#6e1022',sheet:'#fcf5ea',ink:'#3a2427',accent:'#7d1428',gold:'#c9a352',pagefg:'#f7e9e2'}},
    {k:'ungu',n:'Ungu',desc:'Gold embroidery on amethyst silk',c:{ground:'#45215c',sheet:'#fbf5ee',ink:'#33283a',accent:'#55286f',gold:'#c9a352',pagefg:'#f2eaf4'}},
    {k:'laut',n:'Laut',desc:'Gold embroidery on deep teal silk',c:{ground:'#0c4a52',sheet:'#f9f6ea',ink:'#22302f',accent:'#0f525a',gold:'#c9a352',pagefg:'#e8f1ef'}},
    {k:'hitam',n:'Hitam',desc:'Gold embroidery on onyx silk',c:{ground:'#18181b',sheet:'#faf5ea',ink:'#2a2826',accent:'#3a3530',gold:'#c9a352',pagefg:'#efe9dc'}},
    {k:'gading',n:'Gading',desc:'Gold embroidery on ivory silk',c:{ground:'#e8dcc3',sheet:'#fffcf4',ink:'#3a3127',accent:'#7a5a26',gold:'#b08a45',pagefg:'#3a3127',light:1}},
    {k:'jambu',n:'Jambu',desc:'Gold embroidery on blush silk',c:{ground:'#e6c3bd',sheet:'#fffaf6',ink:'#40292b',accent:'#8e3d4f',gold:'#b08a45',pagefg:'#40292b',light:1}},
  ]});
