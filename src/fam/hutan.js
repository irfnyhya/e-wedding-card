/* hutan: Hutan Tropika. Layered monstera, palm, banana and fern leaves in many greens, with veins and splits,
   hiding a gold-lined frame. Cover: a clearing in the leaves shows the names; touch the seal and the leaves part.
   Page: the frame with leaf clusters on its corners. Skin: cards with a leaf cluster tucked into a corner. */
needFont('Italiana');needFont('Allura');
const f1=n=>n.toFixed(1),PI=Math.PI;
const qp=(a,b,c,t)=>{const u=1-t;return [u*u*a[0]+2*u*t*b[0]+t*t*c[0],u*u*a[1]+2*u*t*b[1]+t*t*c[1]]};
const qa=(a,b,c,t)=>Math.atan2(2*(1-t)*(b[1]-a[1])+2*t*(c[1]-b[1]),2*(1-t)*(b[0]-a[0])+2*t*(c[0]-b[0]));
const grad=(id,a,b)=>`<linearGradient id="${id}" x1="0" y1="1" x2=".3" y2="0"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
let gid=0;
/* every leaf is drawn pointing up (-y) from its base at 0,0 */
function monstera(L,c1,c2,vein,r){const id='hm'+(++gid),R=.5*L,C=-.5*L;
  // broad heart: a slightly egg-shaped outline with a sinus at the base
  const rr=t=>R*(.9+.1*Math.cos(t))*(1-.82*Math.exp(-Math.pow((PI-t)/.2,2)));
  const P=(t,s,k=1)=>[s*Math.sin(t)*rr(t)*k*.86,C-Math.cos(t)*rr(t)*k];
  let o='';for(let i=0;i<=40;i++){const [x,y]=P(i/40*PI,1);o+=(i?'L':'M')+f1(x)+' '+f1(y)}for(let i=40;i>=0;i--){const [x,y]=P(i/40*PI,-1);o+='L'+f1(x)+' '+f1(y)}o+='Z';
  const base=C+rr(PI);let cut='',vn='';const n=6;
  for(const s of [-1,1])for(let k=1;k<=n;k++){const t=.42+k*(2.2/(n+1))+(r()-.5)*.08,[ex,ey]=P(t,s,1.06),[e2x,e2y]=P(t,s,1),dep=.5+r()*.32;
    // the split runs from the margin in towards the midrib, parallel to the lobe veins
    const mx=0,my=Math.min(base,e2y+L*.16),ix=e2x+(mx-e2x)*dep,iy=e2y+(my-e2y)*dep,w=L*(.018+r()*.012);
    cut+=`<path d="M${f1(ex)} ${f1(ey-w*1.4)}Q${f1((ex+ix)/2)} ${f1((ey+iy)/2-w)} ${f1(ix)} ${f1(iy)}Q${f1((ex+ix)/2)} ${f1((ey+iy)/2+w)} ${f1(ex)} ${f1(ey+w*1.4)}Z"/>`;
    if(k<n&&r()<.8){const tt=t+.17,[qx,qy]=P(tt,s,1),hx=qx*.32,hy=qy+(Math.min(base,qy+L*.16)-qy)*.62;cut+=`<ellipse cx="${f1(hx)}" cy="${f1(hy)}" rx="${f1(L*.03)}" ry="${f1(L*.011)}" transform="rotate(${f1(s*-28)} ${f1(hx)} ${f1(hy)})"/>`}
    const tm=t+.17,[v3,v4]=P(tm,s,.97);vn+=`M0 ${f1(Math.min(base,v4+L*.16))}Q${f1(v3*.5)} ${f1(v4+L*.1)} ${f1(v3)} ${f1(v4)}`}
  let half='';for(let i=0;i<=40;i++){const [x,y]=P(i/40*PI,1);half+=(i?'L':'M')+f1(x)+' '+f1(y)}half+='L0 '+f1(base)+'Z';
  return `<defs>${grad(id+'g',c1,c2)}<radialGradient id="${id}h"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><mask id="${id}" maskUnits="userSpaceOnUse" x="${-L}" y="${-1.2*L}" width="${2*L}" height="${1.6*L}"><path d="${o}" fill="#fff"/><g fill="#000">${cut}</g></mask></defs>
   <path d="M0 ${f1(L*.32)}Q${f1(L*.02)} ${f1(-L*.1)} 0 ${f1(base)}" stroke="${c1}" stroke-width="${f1(L*.026)}" fill="none" stroke-linecap="round"/>
   <g mask="url(#${id})"><path d="${o}" fill="url(#${id}g)"/><path d="${half}" fill="#000" opacity=".16"/><path d="${vn}" stroke="${vein}" stroke-width="${f1(L*.004+.35)}" opacity=".5" fill="none"/>
   <path d="M0 ${f1(base)}Q${f1(L*.03)} ${f1(-L*.7)} 0 ${f1(-L*.99)}" stroke="${vein}" stroke-width="${f1(L*.012)}" fill="none" opacity=".75"/>
   <ellipse cx="${f1(-L*.12)}" cy="${f1(-L*.62)}" rx="${f1(L*.22)}" ry="${f1(L*.3)}" fill="url(#${id}h)"/><path d="${o}" fill="none" stroke="#000" stroke-width="1.2" opacity=".18"/></g>`}
function palm(L,bend,c1,c2,vein){const a=[0,0],b=[bend*L*.3,-L*.55],c=[bend*L*.5,-L];let s='',vv='';
  for(let i=2;i<34;i++){const t=i/34,[x,y]=qp(a,b,c,t),an=qa(a,b,c,t),ll=L*.38*Math.pow(Math.sin(PI*(.06+.92*t)),.6)*(1-.25*t);
    for(const sd of [-1,1]){const d=an+sd*.8,ex=x+Math.cos(d)*ll,ey=y+Math.sin(d)*ll+ll*.18,cx=x+Math.cos(d)*ll*.5,cy=y+Math.sin(d)*ll*.5-ll*.06,nx=-Math.sin(d)*2.6,ny=Math.cos(d)*2.6;
      s+=`<path d="M${f1(x)} ${f1(y)}Q${f1(cx+nx)} ${f1(cy+ny)} ${f1(ex)} ${f1(ey)}Q${f1(cx-nx)} ${f1(cy-ny)} ${f1(x)} ${f1(y)}Z" fill="${(i+(sd>0))%3?c1:c2}"/>`;vv+=`M${f1(x)} ${f1(y)}Q${f1(cx)} ${f1(cy)} ${f1(ex)} ${f1(ey)}`}}
  return `${s}<path d="${vv}" stroke="${vein}" stroke-width=".35" opacity=".5" fill="none"/><path d="M0 0Q${f1(b[0])} ${f1(b[1])} ${f1(c[0])} ${f1(c[1])}" stroke="${vein}" stroke-width="1.6" fill="none"/>`}
function banana(L,c1,c2,vein,r){const id='hb'+(++gid),W=t=>L*.16*Math.pow(Math.sin(PI*Math.min(1,t*1.05)),.45)*(1-.15*t);let o='M0 0',back='';
  for(let i=1;i<=30;i++){const t=i/30;o+=`L${f1(W(t))} ${f1(-L*t)}`;back=`L${f1(-W(t)*(1+.05*Math.sin(t*9)))} ${f1(-L*t)}`+back}o+=back+'Z';
  let v='',tear='';for(let y=6;y<L*.98;y+=3.2){const t=y/L,w=W(t);v+=`M0 ${f1(-y)}l${f1(w)} ${f1(-w*.45)}M0 ${f1(-y)}l${f1(-w)} ${f1(-w*.45)}`}
  for(let k=0;k<6;k++){const t=.2+r()*.7,s=r()<.5?-1:1,w=W(t),dep=.3+r()*.6;tear+=`<path d="M${f1(s*w*1.1)} ${f1(-L*t-1.4)}L${f1(s*w*(1-dep))} ${f1(-L*t-w*dep*.45)}L${f1(s*w*1.1)} ${f1(-L*t+1.4)}Z"/>`}
  return `<defs>${grad(id+'g',c1,c2)}<mask id="${id}" maskUnits="userSpaceOnUse" x="${-L}" y="${-1.2*L}" width="${2*L}" height="${1.4*L}"><path d="${o}" fill="#fff"/><g fill="#000">${tear}</g></mask></defs>
   <g mask="url(#${id})"><path d="${o}" fill="url(#${id}g)"/><rect x="0" y="${f1(-L)}" width="${f1(L*.3)}" height="${f1(L*1.1)}" fill="#000" opacity=".14"/><path d="${v}" stroke="${vein}" stroke-width=".35" opacity=".45" fill="none"/></g>
   <path d="M0 ${f1(L*.1)}L0 ${f1(-L*.97)}" stroke="${vein}" stroke-width="${f1(L*.012)}" opacity=".85"/>`}
function fern(L,bend,c1,vein){const a=[0,0],b=[bend*L*.25,-L*.5],c=[bend*L*.45,-L];let s='';
  for(let i=2;i<40;i++){const t=i/40,[x,y]=qp(a,b,c,t),an=qa(a,b,c,t),ll=L*.13*Math.pow(Math.sin(PI*(.05+.95*t)),.5);
    for(const sd of [-1,1]){const d=an+sd*1.15,ex=x+Math.cos(d)*ll,ey=y+Math.sin(d)*ll,cx=x+Math.cos(d)*ll*.5,cy=y+Math.sin(d)*ll*.5,nx=-Math.sin(d)*ll*.22,ny=Math.cos(d)*ll*.22;
      s+=`<path d="M${f1(x)} ${f1(y)}Q${f1(cx+nx)} ${f1(cy+ny)} ${f1(ex)} ${f1(ey)}Q${f1(cx-nx)} ${f1(cy-ny)} ${f1(x)} ${f1(y)}Z"/>`}}
  return `<g fill="${c1}">${s}</g><path d="M0 0Q${f1(b[0])} ${f1(b[1])} ${f1(c[0])} ${f1(c[1])}" stroke="${vein}" stroke-width="1" fill="none"/>`}
/* place a list of leaves: [type, x, y, rotation, length, shade 0..3, bend] */
function leaves(c,list,seed){const r=rng(seed),G=[c.g1,c.g2,c.g3,c.g4],fid='hs'+(++gid);
  return list.map(([ty,x,y,rot,L,sh,bend=.4])=>{const a=G[sh],b=G[Math.min(3,sh+1)],v=c.vein;
    const body=ty==='m'?monstera(L,a,b,v,r):ty==='p'?palm(L,bend,a,b,v):ty==='b'?banana(L,a,b,v,r):fern(L,bend,b,v);
    return `<g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#${fid})">${body}</g>`}).join('')+`<defs>${SH(fid)}</defs>`}
const SH=id=>`<filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="2" dy="7" stdDeviation="6" flood-color="#000" flood-opacity=".38"/></filter>`;
// left side of the cover (the right side reuses it mirrored with a different seed and order)
const COVER_L=[['p',-20,40,112,240,0,.5],['b',-30,270,40,300,1],['m',-30,160,72,200,1],['p',-30,700,74,260,0,-.4],['b',-20,800,52,320,1],
  ['f',-34,540,12,270,2,.5],['m',-60,400,82,150,2],['m',-10,810,36,250,2],['m',20,770,62,190,3],['m',-40,100,100,140,3]];
const COVER_R=[['m',-40,40,124,210,0],['b',-30,140,96,270,1],['p',-30,360,10,236,1,.5],['m',-56,480,70,150,2],['p',-30,660,84,240,0,.4],
  ['f',-10,790,30,300,2,.4],['m',-20,770,68,230,3],['b',-40,860,44,280,3]];
const CORNER=[['b',-20,-10,128,190,0],['p',-10,20,100,200,1,.4],['m',-30,10,140,170,1],['f',0,-10,112,180,2,-.3],['p',-20,40,150,150,0,-.3],['m',-10,-20,104,120,3],['m',20,-30,166,110,2]];
function cornerSvg(c,seed,cls){return `<svg class="ht-cn ${cls}" viewBox="-20 -20 200 200">${leaves(c,CORNER,seed)}</svg>`}
function frameSvg(c){const cut=(i,k)=>`M${i+k} ${i}H${300-i-k}L${300-i} ${i+k}V${440-i-k}L${300-i-k} ${440-i}H${i+k}L${i} ${440-i-k}V${i+k}Z`;
  return `<svg class="ht-fr" viewBox="0 0 300 440" preserveAspectRatio="none"><path d="${cut(8,14)}" fill="none" stroke="${c.gold}" stroke-width="1.3"/><path d="${cut(13,13)}" fill="none" stroke="${c.gold}" stroke-width=".55"/>
   <path d="${cut(19,11)}" fill="none" stroke="${c.gold}" stroke-width=".7" stroke-dasharray="0 3.4" stroke-linecap="round"/></svg>`}
let uid=0;
const mono=o=>{const [a,b]=K.initials(o);return `${esc(a)}<i>&amp;</i>${esc(b)}`};
FAMILY({key:'hutan',name:'Hutan Tropika',meaning:'Tropical leaves',
  blurb:'Layers of monstera, palm, banana and fern leaves hide a gold-lined frame. Touch the seal and the leaves part.',
  fonts:{d:"'Italiana', serif",s:"'Allura', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';return `<section class="page pg-hutan"><div class="ht-card reveal"><i class="ht-tex"></i>${frameSvg(c)}
    <div class="ht-in"><p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
    <div class="ht-rule reveal d2"><i></i><b></b><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(fmtTime(o.start,o.lang))} &middot; ${esc(o.venue)}</p></div></div>
    ${cornerSvg(c,3,'tl')}${cornerSvg(c,9,'tr')}${cornerSvg(c,13,'bl')}${cornerSvg(c,21,'br')}</section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';++uid;
    return `<div class="cover cv-hutan" style="--hv:${c.vig||c.ground}"><i class="ht-glow"></i>
     <div class="ht-card"><i class="ht-tex"></i>${frameSvg(c)}<div class="ht-txt"><p class="ht-k">${ev(o,L)}</p><p class="ht-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</p>
      <div class="ht-rule"><i></i><b></b><i></i></div><p class="ht-d">${esc(fmtDate(o.date,o.lang))}</p>${guest?`<p class="ht-to">${L.dear}<b>${esc(guest)}</b></p>`:''}</div></div>
     <svg class="ht-side l" viewBox="0 0 260 760" preserveAspectRatio="xMinYMid slice">${leaves(c,COVER_L,uid*7+1)}</svg>
     <svg class="ht-side r" viewBox="0 0 260 760" preserveAspectRatio="xMinYMid slice">${leaves(c,COVER_R,uid*7+4)}</svg>
     <i class="ht-vig"></i><${tag} class="ht-seal" ${attr} aria-label="${L.open}"><span>${mono(o)}</span></${tag}>
     <p class="ht-hint">${en?'Touch the seal to part the leaves':'Sentuh meterai untuk menyelak dedaun'}</p></div>`},
  skin(el,o,th){const c=th.c;K.cards(el);
    K.secs(el).forEach((s,i)=>{s.insertAdjacentHTML('afterbegin',cornerSvg(c,30+i*5,'sk '+(i%2?'r':'l')));
      const h=s.querySelector('h2');if(h)h.insertAdjacentHTML('afterend','<div class="ht-rule"><i></i><b></b><i></i></div>')})},
  themes:[
    {k:'zamrud',n:'Zamrud',desc:'Emerald jungle, gold frame',c:{ground:'#0f2a20',sheet:'#f7f2e5',ink:'#22302a',accent:'#1f5a3e',gold:'#c4a055',pagefg:'#eef3ea',g1:'#0c2f1f',g2:'#174f31',g3:'#2c7040',g4:'#5c9443',vein:'#a9cf8a'}},
    {k:'malam',n:'Malam',desc:'Night forest, moonlit leaves',c:{ground:'#0a1411',sheet:'#efe9d8',ink:'#1f2a26',accent:'#234a3d',gold:'#c3a160',pagefg:'#e8eee8',g1:'#0d2a22',g2:'#18463a',g3:'#2b6650',g4:'#568b6c',vein:'#9cc4ad'}},
    {k:'gading',n:'Gading',desc:'Ivory with bright greens',c:{ground:'#efe9dc',sheet:'#fffdf7',ink:'#2a3529',accent:'#2c5a3a',gold:'#b48c45',pagefg:'#2a3529',g1:'#1f4f2e',g2:'#336f3b',g3:'#56904a',g4:'#8fb35a',vig:'#14301f40',vein:'#d6ebb0'}},
    {k:'jambu',n:'Jambu',desc:'Blush with soft greens',c:{ground:'#ead2c9',sheet:'#fffaf6',ink:'#3a2c2c',accent:'#8a4a52',gold:'#b5875a',pagefg:'#3a2c2c',g1:'#2b5c46',g2:'#467c5a',g3:'#6e9d73',g4:'#9fbe8a',vig:'#14301f40',vein:'#d4e8c8'}},
    {k:'lumut',n:'Lumut',desc:'Olive moss, antique gold',c:{ground:'#262b19',sheet:'#f4efdc',ink:'#2e3220',accent:'#4d5828',gold:'#c39f50',pagefg:'#f0eedd',g1:'#2e3c1b',g2:'#4a5c27',g3:'#6f8036',g4:'#9ea24e',vein:'#d6d99a'}},
    {k:'laut',n:'Laut',desc:'Teal lagoon leaves',c:{ground:'#0c2729',sheet:'#eef3ee',ink:'#1e3233',accent:'#1b585a',gold:'#bda66c',pagefg:'#e6f0ee',g1:'#114541',g2:'#1f675c',g3:'#3b8873',g4:'#73ae92',vein:'#b4dccb'}},
    {k:'emas',n:'Emas Senja',desc:'Golden hour canopy',c:{ground:'#33240f',sheet:'#fbf3e1',ink:'#3a2c1a',accent:'#6a4a1f',gold:'#d0a24a',pagefg:'#f6ead2',g1:'#263d1c',g2:'#405e25',g3:'#6a7d30',g4:'#a8963f',vein:'#e4d48e'}},
    {k:'terakota',n:'Terakota',desc:'Clay wall, deep greens',c:{ground:'#7e432e',sheet:'#fbf3ea',ink:'#3a2a22',accent:'#7a3a28',gold:'#d6a55a',pagefg:'#fbefe4',g1:'#1b3f2b',g2:'#2f5f3a',g3:'#4f7e45',g4:'#86a65c',vein:'#cfe3a8'}},
  ]});
