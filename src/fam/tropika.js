/* tropika: "Tropika". A white cotton card printed with lush painted tropical leaves: monstera, coconut palm and banana
   leaves drawn as layered watercolour glazes (SVG with gradient washes, light veins, wet edges and a paper grain filter)
   that spill in from two opposite corners and are cut off by the card's edge. The names sit in the calm white space.
   Cover: the card on a leaf-green linen ground; tap "Buka Jemputan" and the card turns on its axis and away.
   Page: the full card with the leaves at its corners. Skin: white cards with a painted leaf sprig in one corner. */
let trkN=0;
const f1=n=>(+n).toFixed(1),PI=Math.PI;
const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
// a closed, smoothed outline through points
const smo=p=>{const n=p.length,m=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2],s=m(p[n-1],p[0]);let d=`M${f1(s[0])} ${f1(s[1])}`;
  for(let i=0;i<n;i++){const q=m(p[i],p[(i+1)%n]);d+=`Q${f1(p[i][0])} ${f1(p[i][1])} ${f1(q[0])} ${f1(q[1])}`}return d+'Z'};
// watercolour: a slightly wandering edge and a paper grain in the pigment
const trkWc=(id,seed)=>`<filter id="${id}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="${seed}" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="${seed+3}" result="g"/>
  <feColorMatrix in="g" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -.3 1.1" result="ga"/>
  <feComposite in="d" in2="ga" operator="in"/></filter>`;

/* every leaf is drawn pointing up (-y) from its stalk at 0,0; C = {d,m,l,y} dark, mid, light, yellow-green */
function trkMon(L,C,r){const id='trk'+(++trkN),W=L*.47;
  const E=(ph,s,k=1)=>[s*W*Math.sin(ph)*k*(1+.06*Math.sin(2*ph)),-L*.5-L*.5*Math.cos(ph)*k-(k===1?L*.13*Math.exp(-Math.pow((PI-ph)/.42,2)):0)];
  const pts=[[0,-L*1.02]];for(let i=1;i<=34;i++)pts.push(E(i/34*PI*.985,1));pts.push([0,-L*.13]);for(let i=34;i>=1;i--)pts.push(E(i/34*PI*.985,-1));
  const o=smo(pts);let cut='',vn='';const n=5+(r()<.5?1:0);
  for(const s of [-1,1]){const ph=[];for(let k=0;k<n;k++)ph.push(.55+k*(2.1/(n-1))+(r()-.5)*.1);
    ph.forEach((p,k)=>{const e=E(p,s,1.05),e1=E(p,s,1),my=Math.max(-L*.95,Math.min(-L*.16,e1[1]+L*.17)),m=[0,my],dep=.6+r()*.25,
        ins=lerp(e1,m,dep),mid=lerp(e,ins,.5),w=L*(.024+r()*.014),nx=-(ins[1]-e[1]),ny=ins[0]-e[0],nl=Math.hypot(nx,ny)||1,ux=nx/nl*w,uy=ny/nl*w;
      cut+=`<path d="M${f1(e[0]+ux*1.3)} ${f1(e[1]+uy*1.3)}Q${f1(mid[0]+ux)} ${f1(mid[1]+uy)} ${f1(ins[0])} ${f1(ins[1])}Q${f1(mid[0]-ux)} ${f1(mid[1]-uy)} ${f1(e[0]-ux*1.3)} ${f1(e[1]-uy*1.3)}Z"/>`;
      // the lobe between this split and the next: its vein, and sometimes a window near the midrib
      const q=k<n-1?(p+ph[k+1])/2:p+.22,qe=E(Math.min(q,PI*.97),s,1),qm=[0,Math.max(-L*.95,Math.min(-L*.15,qe[1]+L*.17))];
      vn+=`M${f1(qm[0])} ${f1(qm[1])}Q${f1(lerp(qm,qe,.5)[0])} ${f1(lerp(qm,qe,.5)[1]-L*.03)} ${f1(lerp(qm,qe,.96)[0])} ${f1(lerp(qm,qe,.96)[1])}`;
      if(k<n-1&&r()<.75){const h=lerp(qm,qe,.26+r()*.08),a=Math.atan2(qe[1]-qm[1],qe[0]-qm[0])*180/PI;
        cut+=`<ellipse cx="${f1(h[0])}" cy="${f1(h[1])}" rx="${f1(L*(.03+r()*.015))}" ry="${f1(L*.012)}" transform="rotate(${f1(a)} ${f1(h[0])} ${f1(h[1])})"/>`}})}
  let half='M0 '+f1(-L*1.02);for(let i=1;i<=34;i++){const p=E(i/34*PI*.985,1);half+=`L${f1(p[0])} ${f1(p[1])}`}half+=`L0 ${f1(-L*.13)}Z`;
  return `<defs><linearGradient id="${id}g" x1="0" y1="1" x2=".35" y2="0"><stop offset="0" stop-color="${C.d}"/><stop offset=".55" stop-color="${C.m}"/><stop offset="1" stop-color="${C.l}"/></linearGradient>
    <radialGradient id="${id}h"><stop offset="0" stop-color="${C.y}" stop-opacity=".55"/><stop offset="1" stop-color="${C.y}" stop-opacity="0"/></radialGradient>
    <mask id="${id}" maskUnits="userSpaceOnUse" x="${f1(-L)}" y="${f1(-L*1.2)}" width="${f1(2*L)}" height="${f1(L*1.7)}"><path d="${o}" fill="#fff"/><g fill="#000">${cut}</g></mask></defs>
   <path d="M${f1(L*.06)} ${f1(L*.42)}Q${f1(-L*.02)} ${f1(L*.1)} 0 ${f1(-L*.13)}" stroke="${C.m}" stroke-width="${f1(L*.024)}" fill="none" stroke-linecap="round" opacity=".9"/>
   <g mask="url(#${id})"><path d="${o}" fill="url(#${id}g)"/><path d="${half}" fill="${C.d}" opacity=".32"/>
    <ellipse cx="${f1(-W*.4)}" cy="${f1(-L*.62)}" rx="${f1(W*.55)}" ry="${f1(L*.32)}" fill="url(#${id}h)"/>
    <path d="${vn}" stroke="${C.y}" stroke-width="${f1(L*.005+.3)}" opacity=".55" fill="none"/>
    <path d="M0 ${f1(-L*.13)}Q${f1(L*.025)} ${f1(-L*.6)} 0 ${f1(-L*1)}" stroke="${C.y}" stroke-width="${f1(L*.012)}" fill="none" opacity=".75"/>
    <path d="${o}" fill="none" stroke="${C.d}" stroke-width="2.2" opacity=".45"/></g>`}

function trkPalm(L,bend,C,r){const a=[0,0],b=[bend*L*.32,-L*.55],c=[bend*L*.55,-L*.98];let s='',vv='';
  const qp=t=>{const u=1-t;return [u*u*a[0]+2*u*t*b[0]+t*t*c[0],u*u*a[1]+2*u*t*b[1]+t*t*c[1]]},
    qa=t=>Math.atan2(2*(1-t)*(b[1]-a[1])+2*t*(c[1]-b[1]),2*(1-t)*(b[0]-a[0])+2*t*(c[0]-b[0]));
  const N=30,cols=[C.d,C.m,C.l];
  for(let i=3;i<N;i++){const t=i/N,[x,y]=qp(t),an=qa(t),ll=L*.44*Math.pow(Math.sin(PI*(.05+.93*t)),.55)*(1-.3*t)*(.9+r()*.2);
    for(const sd of [-1,1]){const d=an+sd*(.62+r()*.12),droop=sd*ll*.16,
        ex=x+Math.cos(d)*ll-Math.sin(an)*0+Math.cos(an+sd*PI/2)*droop*.4,ey=y+Math.sin(d)*ll+Math.sin(an+sd*PI/2)*droop*.4,
        cx=x+Math.cos(d)*ll*.5,cy=y+Math.sin(d)*ll*.5,w=ll*.075,nx=-Math.sin(d)*w,ny=Math.cos(d)*w;
      s+=`<path d="M${f1(x)} ${f1(y)}Q${f1(cx+nx)} ${f1(cy+ny)} ${f1(ex)} ${f1(ey)}Q${f1(cx-nx*.6)} ${f1(cy-ny*.6)} ${f1(x)} ${f1(y)}Z" fill="${cols[(i*2+(sd>0?1:0))%3]}" opacity=".88"/>`;
      vv+=`M${f1(x)} ${f1(y)}Q${f1(cx)} ${f1(cy)} ${f1(ex)} ${f1(ey)}`}}
  return `${s}<path d="${vv}" stroke="${C.y}" stroke-width=".45" opacity=".55" fill="none"/><path d="M0 0Q${f1(b[0])} ${f1(b[1])} ${f1(c[0])} ${f1(c[1])}" stroke="${C.d}" stroke-width="${f1(L*.012)}" fill="none" stroke-linecap="round"/>`}

function trkBan(L,C,r){const id='trk'+(++trkN),W=t=>L*.15*Math.pow(Math.sin(PI*Math.min(1,t*1.03)),.42)*(1-.12*t),cv=t=>L*.06*t*t;
  // each half of the blade is cut into strips at the tears; strips splay a little where they have split
  const tears=s=>{const T=[.1];let t=.1;while(t<.9){t+=.1+r()*.16;if(t<.95)T.push(t)}T.push(1);return T};
  let body='',veins='';
  for(const s of [-1,1]){const T=tears(s);
    for(let j=0;j<T.length-1;j++){const t0=T[j],t1=T[j+1],g=.006,sk=.07,pts=[];
      for(let k=0;k<=8;k++){const t=t0+(t1-t0)*k/8;pts.push([cv(t),-L*t])}
      for(let k=8;k>=0;k--){const t=Math.min(1,t0+g+(t1-t0-2*g)*k/8+sk);pts.push([cv(t)+s*W(t)*(1+(r()-.5)*.05),-L*t])}
      const rot=j?s*(r()*3):0,pv=[cv(t0),-L*t0],d=pts.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('')+'Z';
      body+=`<path d="${d}" fill="${s<0?`url(#${id}a)`:`url(#${id}b)`}" transform="rotate(${f1(rot)} ${f1(pv[0])} ${f1(pv[1])})" stroke="${C.d}" stroke-width="1.2" stroke-opacity=".35"/>`;
      for(let t=t0+.012;t<t1-.004;t+=.016){const x0=cv(t),y0=-L*t,t2=Math.min(1,t+sk*.9);
        veins+=`<path d="M${f1(x0)} ${f1(y0)}L${f1(cv(t2)+s*W(t2)*.97)} ${f1(-L*t2)}" transform="rotate(${f1(rot)} ${f1(pv[0])} ${f1(pv[1])})"/>`}}}
  return `<defs><linearGradient id="${id}a" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.d}"/><stop offset=".5" stop-color="${C.m}"/><stop offset="1" stop-color="${C.l}"/></linearGradient>
    <linearGradient id="${id}b" x1="0" y1="1" x2=".2" y2="0"><stop offset="0" stop-color="${C.d}"/><stop offset=".6" stop-color="${C.d}"/><stop offset="1" stop-color="${C.m}"/></linearGradient></defs>
   ${body}<g stroke="${C.y}" stroke-width=".4" opacity=".35" fill="none">${veins}</g>
   <path d="M0 ${f1(L*.12)}Q${f1(cv(.5))} ${f1(-L*.5)} ${f1(cv(.99))} ${f1(-L*.99)}" stroke="${C.y}" stroke-width="${f1(L*.014)}" fill="none" opacity=".8"/>`}

// a leafy corner: [type, x, y, rotation, length, palette (0 normal, 1 deeper, 2 lighter), bend]
function trkCorner(C,list,seed,cls){const r=rng(seed),fid='trk'+(++trkN)+'w';
  const pal=k=>k===1?{d:C.d,m:C.d2||C.d,l:C.m,y:C.l}:k===2?{d:C.m,m:C.l,l:C.y,y:'#f6f7e6'}:C;
  const body=list.map(([ty,x,y,rot,L,k,bend=.3])=>{const P=pal(k);
    return `<g transform="translate(${x} ${y}) rotate(${rot})">${ty==='m'?trkMon(L,P,r):ty==='p'?trkPalm(L,bend,P,r):trkBan(L,P,r)}</g>`}).join('');
  return `<svg class="trk-cn ${cls}" viewBox="0 0 300 330" ${NS}><defs>${trkWc(fid,seed%50)}</defs><g filter="url(#${fid})">${body}</g></svg>`}
const TRK_A=[['p',-20,120,98,300,1,.25],['p',40,-30,152,260,0,-.3],['b',-30,40,116,300,0],['b',210,-40,196,200,2],['m',-20,-20,138,250,0],['p',-25,250,96,180,2,.2],['m',-30,190,116,160,2],['m',130,-30,172,150,1]];
const TRK_B=[['p',-15,60,112,270,0,.35],['b',40,-35,150,260,1],['p',160,-25,170,200,2,-.3],['m',-20,0,132,220,1],['b',-35,180,104,200,2],['m',95,-30,162,150,2]];
const trkLeaves=(c,seed,small)=>trkCorner(c,TRK_A,seed,'tl'+(small?' sm':''))+trkCorner(c,TRK_B,seed+17,'br'+(small?' sm':''));
// a small sprig for headings and section corners
const trkSprig=c=>`<svg ${NS} viewBox="0 0 300 330">${trkCorner(c,[['p',-10,30,130,230,0,.3],['m',-10,-10,140,170,0],['b',90,-20,160,150,2]],7,'').replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>`;
const trkDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const trkNames=(o,cls='')=>{const [n1,n2]=coverNames(o);return `<h1 class="trk-names ${cls}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
const trkCol=c=>({d:c.l1,d2:c.l0,m:c.l2,l:c.l3,y:c.l4});

FAMILY({key:'tropika',name:'Tropika',meaning:'Painted tropical leaves',
  blurb:'A white cotton card with lush painted monstera, palm and banana leaves spilling in from two corners, the names set in fine italic serif in the calm space between. The card turns away to open.',
  fonts:{d:"'Marcellus', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1350,
  page(o,th,L){const c=th.c,en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-tropika ${c.dark?'trk-dk':''}"><div class="trk-card">${trkLeaves(trkCol(c),31,1)}
      <div class="trk-body">
        <div class="trk-ph"></div>
        ${o.bismillah?`<p class="trk-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="trk-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${trkNames(o)}</div>
        <span class="trk-rule reveal d1"></span>
        <p class="trk-date reveal d2">${esc(trkDay(o))}${trkDay(o)?' · ':''}${esc(fmtDate(o.date,o.lang,false))}</p>
        ${o.hijri?`<p class="trk-hj reveal d2">${esc(o.hijri)}</p>`:''}
        ${t?`<p class="trk-time reveal d2">${esc(t)}</p>`:''}
        ${o.venue?`<a href="#" class="trk-ven reveal d2" data-go="loc">${esc(o.venue)}</a>`:''}
        <div class="trk-pills reveal d3"><a class="trk-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="trk-pill ghost" data-go="rsvp" href="#">${en?'RSVP':'Sahkan Kehadiran'}</a>`:''}</div>
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-tropika ${c.dark?'trk-dk':''}"><div class="trk-stage"><div class="trk-card">${trkLeaves(trkCol(c),11,0)}
      <div class="trk-cbody"><p class="trk-k">${ev(o,L)}</p>${trkNames(o,'cv')}<span class="trk-rule"></span><p class="trk-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>
        ${o.venue?`<p class="trk-cven">${esc(o.venue)}</p>`:''}</div>
      <div class="trk-foot">${guest?`<p class="trk-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="trk-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
    </div></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('trk-dk',!!th.c.dark);
    el.style.setProperty('--trk-sprig',K.uri(trkSprig(trkCol(th.c))));
    const pg=$('.pg-tropika',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const slot=$('.trk-ph',pg);img.removeAttribute('style');slot.appendChild(img);slot.classList.add('on');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'hijau',n:'Hijau Daun',desc:'White card, deep leaf-green linen',c:{ground:'#1d3b2c',sheet:'#fdfcf7',ink:'#26322b',accent:'#1f4d36',gold:'#a8935c',pagefg:'#eef1e6',l0:'#0e2c1d',l1:'#17432c',l2:'#2f6e45',l3:'#6fa461',l4:'#c9dc95'}},
    {k:'putih',n:'Putih',desc:'White card on pale celadon',c:{ground:'#e3e9df',sheet:'#ffffff',ink:'#2b332d',accent:'#2b5a3f',gold:'#a3946a',pagefg:'#2b332d',l0:'#123522',l1:'#1d4b31',l2:'#3c7a4d',l3:'#80b46c',l4:'#d3e3a2'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald linen, teal-green leaves',c:{ground:'#0f3a35',sheet:'#fbfcf8',ink:'#203330',accent:'#11524a',gold:'#a9965e',pagefg:'#e8f0ea',l0:'#082a27',l1:'#0f4540',l2:'#257064',l3:'#62a58c',l4:'#c3e0bd'}},
    {k:'krim',n:'Krim',desc:'Cream card, olive leaves, warm linen',c:{ground:'#e8dfcb',sheet:'#fdfaf1',ink:'#33301f',accent:'#45542a',gold:'#b08a4c',pagefg:'#33301f',l0:'#26341a',l1:'#384b24',l2:'#5f7a37',l3:'#9db163',l4:'#dfe0a6'}},
    {k:'malam',n:'Malam',desc:'A night-green card, leaves and gold type',c:{ground:'#0b1310',sheet:'#13211b',ink:'#e9e8da',accent:'#dcc58c',gold:'#b8995a',pagefg:'#e9e8da',dark:1,l0:'#0a1d14',l1:'#16402b',l2:'#2c6a45',l3:'#5c9a5c',l4:'#a9c983'}},
    {k:'nila',n:'Nila',desc:'White card on indigo linen',c:{ground:'#1c2b44',sheet:'#fcfcf8',ink:'#24303a',accent:'#1d4a3c',gold:'#a3946a',pagefg:'#e9edf2',l0:'#0d2a22',l1:'#174335',l2:'#2f6e55',l3:'#6aa486',l4:'#c6e0c0'}},
    {k:'terakota',n:'Terakota',desc:'White card on terracotta linen',c:{ground:'#a95c40',sheet:'#fdfaf4',ink:'#30281f',accent:'#3a5131',gold:'#b37a52',pagefg:'#fbf1e8',l0:'#1d3220',l1:'#2a472c',l2:'#4c7a45',l3:'#8aae6a',l4:'#d6dfa2'}},
    {k:'jambu',n:'Jambu',desc:'White card on blush, fresh green leaves',c:{ground:'#efd8d0',sheet:'#fffdfa',ink:'#30282a',accent:'#2c5a40',gold:'#c08f7c',pagefg:'#30282a',l0:'#123522',l1:'#1d4b31',l2:'#3c7a4d',l3:'#80b46c',l4:'#d3e3a2'}},
  ]});
