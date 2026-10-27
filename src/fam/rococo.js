/* rococo: "Rococo". A hand-inked rococo cartouche on an aged, deckle-edged card: C- and S-scrolls ending in
   tight curls, a rocaille shell at the crown, acanthus leaves, small roses washed in blush and a ribbon bow at the
   foot, all drawn in fine red-brown ink with a slight hand wobble. Romantic script names inside.
   Cover: the card lies on silk; tap "Buka Jemputan" and it is drawn aside. Page: the same cartouche, taller.
   Skin: aged paper cards with a small inked scroll crest over each heading. */
needFont('Monsieur+La+Doulaise');
let rcN=0;
const rf=v=>(+v).toFixed(1);
const rcN2=(x,y)=>{const l=Math.hypot(x,y)||1;return [x/l,y/l]};
// a spiral curl leaving point p in travel direction t, turning right (s=1) or left (s=-1)
function rcCurl(p,t,r,s,turns=1.3){const n=[-t[1],t[0]],c=[p[0]+n[0]*r*s,p[1]+n[1]*r*s],a0=Math.atan2(p[1]-c[1],p[0]-c[0]),T=turns*Math.PI*2,N=36;let d='',e=p;
  for(let i=1;i<=N;i++){const k=i/N,a=a0+s*k*T,rr=r*Math.pow(.18,k);e=[c[0]+Math.cos(a)*rr,c[1]+Math.sin(a)*rr];d+=`L${rf(e[0])} ${rf(e[1])}`}
  return {d,e}}
const rcBez=(P,t)=>{const u=1-t;return [0,1].map(k=>u*u*u*P[0][k]+3*u*u*t*P[1][k]+3*u*t*t*P[2][k]+t*t*t*P[3][k])};
const rcDer=(P,t)=>{const u=1-t;return rcN2(...[0,1].map(k=>3*u*u*(P[1][k]-P[0][k])+6*u*t*(P[2][k]-P[1][k])+3*t*t*(P[3][k]-P[2][k])))};
// a small pointed leaf from 0,0 along angle a (radians), length L
const rcLeaf=(x,y,a,L,cls='rc-lf')=>{const w=L*.32;return `<g transform="translate(${rf(x)} ${rf(y)}) rotate(${rf(a*180/Math.PI)})"><path d="M0 0C${rf(L*.3)} ${rf(-w)} ${rf(L*.72)} ${rf(-w)} ${rf(L)} 0C${rf(L*.72)} ${rf(w*.8)} ${rf(L*.3)} ${rf(w*.8)} 0 0Z" class="${cls}"/><path d="M${rf(L*.08)} 0L${rf(L*.8)} 0" class="rc-thin"/></g>`};
// one scroll: a cubic from p0 to p3, optional curls at either end, optional leaves [t, side, length]
function rcScroll(P,o={}){let d=`M${rf(P[0][0])} ${rf(P[0][1])}C${P.slice(1).map(p=>rf(p[0])+' '+rf(p[1])).join(' ')}`,dots='',leaves='';
  if(o.e){const t=rcN2(P[3][0]-P[2][0],P[3][1]-P[2][1]),c=rcCurl(P[3],t,o.e[0],o.e[1]);d+=c.d;dots+=`<circle cx="${rf(c.e[0])}" cy="${rf(c.e[1])}" r="1.5" class="rc-dot"/>`}
  if(o.b){const t=rcN2(P[0][0]-P[1][0],P[0][1]-P[1][1]),c=rcCurl(P[0],t,o.b[0],o.b[1]);d+=`M${rf(P[0][0])} ${rf(P[0][1])}`+c.d;dots+=`<circle cx="${rf(c.e[0])}" cy="${rf(c.e[1])}" r="1.5" class="rc-dot"/>`}
  (o.l||[]).forEach(([t,s,L])=>{const p=rcBez(P,t),dv=rcDer(P,t),a=Math.atan2(dv[1],dv[0])+s*(Math.PI/2-.75);leaves+=rcLeaf(p[0],p[1],a,L)});
  return `<path d="${d}" class="rc-ink"/><path d="${d}" class="rc-ink2"/>${dots}${leaves}`}
// a little rose: blush wash, five petals round an inner spiral, two leaves
function rcRose(x,y,r,rot=0){let pet='';for(let i=0;i<5;i++){const a=(rot+i*72)*Math.PI/180,b=a+72*Math.PI/180,m=(a+b)/2;
    pet+=`${i?'':`M${rf(x+Math.cos(a)*r)} ${rf(y+Math.sin(a)*r)}`}Q${rf(x+Math.cos(m)*r*1.38)} ${rf(y+Math.sin(m)*r*1.38)} ${rf(x+Math.cos(b)*r)} ${rf(y+Math.sin(b)*r)}`}
  const sp=rcCurl([x+r*.62,y],[0,1],r*.34,1,1.6),a1=(rot+150)*Math.PI/180,a2=(rot+215)*Math.PI/180;
  return `${rcLeaf(x+Math.cos(a1)*r*.9,y+Math.sin(a1)*r*.9,a1,r*1.7,'rc-lf w')}${rcLeaf(x+Math.cos(a2)*r*.9,y+Math.sin(a2)*r*.9,a2,r*1.5,'rc-lf w')}
    <circle cx="${rf(x)}" cy="${rf(y)}" r="${rf(r*1.12)}" class="rc-wash"/><path d="${pet}Z" class="rc-ink t"/><path d="M${rf(x+r*.62)} ${rf(y)}${sp.d}" class="rc-ink t"/>
    <path d="M${rf(x-r*.8)} ${rf(y+r*.2)}C${rf(x-r*.6)} ${rf(y+r*.8)} ${rf(x+r*.6)} ${rf(y+r*.8)} ${rf(x+r*.8)} ${rf(y+r*.2)}" class="rc-ink t"/>`}
const rcBud=(x,y,a,s=1)=>`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0 0C-3-3-3-8 0-11C3-8 3-3 0 0Z" class="rc-wash"/><path d="M0 0C-3-3-3-8 0-11C3-8 3-3 0 0M0-1C-1-4-1-7 0-10" class="rc-ink t"/><path d="M0 0C-2 2-5 2-6 0M0 0C2 2 5 2 6 0M0 0V7" class="rc-ink t"/></g>`;
// the rocaille shell at the crown
function rcShell(x,y,R){let ribs='',edge='';const A=[];for(let i=0;i<=8;i++)A.push((196+i*18.5)*Math.PI/180);
  A.forEach((a,i)=>{ribs+=`M${x} ${y}L${rf(x+Math.cos(a)*R)} ${rf(y+Math.sin(a)*R)}`;if(i){const b=A[i-1],m=(a+b)/2;edge+=`Q${rf(x+Math.cos(m)*R*1.16)} ${rf(y+Math.sin(m)*R*1.16)} ${rf(x+Math.cos(a)*R)} ${rf(y+Math.sin(a)*R)}`}else edge+=`M${rf(x+Math.cos(a)*R)} ${rf(y+Math.sin(a)*R)}`});
  return `<path d="${edge}L${x} ${y}Z" class="rc-wash s"/><path d="${ribs}" class="rc-ink t"/><path d="${edge}" class="rc-ink"/>
   <path d="M${rf(x-R*.42)} ${rf(y-R*.06)}A${rf(R*.42)} ${rf(R*.42)} 0 0 1 ${rf(x+R*.42)} ${rf(y-R*.06)}" class="rc-ink t"/>
   ${rcScroll([[x,y+2],[x-6,y+8],[x-14,y+8],[x-18,y+3]],{e:[3.6,1]})}${rcScroll([[x,y+2],[x+6,y+8],[x+14,y+8],[x+18,y+3]],{e:[3.6,-1]})}`}
const rcBow=(x,y)=>`<path d="M${x} ${y}C${x-14} ${y-14} ${x-34} ${y-12} ${x-32} ${y-2}C${x-30} ${y+8} ${x-12} ${y+6} ${x} ${y}Z M${x} ${y}C${x+14} ${y-14} ${x+34} ${y-12} ${x+32} ${y-2}C${x+30} ${y+8} ${x+12} ${y+6} ${x} ${y}Z" class="rc-wash"/>
  <path d="M${x} ${y}C${x-14} ${y-14} ${x-34} ${y-12} ${x-32} ${y-2}C${x-30} ${y+8} ${x-12} ${y+6} ${x} ${y}Z M${x} ${y}C${x+14} ${y-14} ${x+34} ${y-12} ${x+32} ${y-2}C${x+30} ${y+8} ${x+12} ${y+6} ${x} ${y}Z" class="rc-ink"/>
  <path d="M${x-4} ${y-3}C${x-14} ${y-8} ${x-24} ${y-8} ${x-28} ${y-3}M${x+4} ${y-3}C${x+14} ${y-8} ${x+24} ${y-8} ${x+28} ${y-3}" class="rc-ink t"/>
  <path d="M${x-2} ${y+2}C${x-8} ${y+14} ${x-18} ${y+22} ${x-30} ${y+26}L${x-26} ${y+30}L${x-34} ${y+31}C${x-20} ${y+26} ${x-8} ${y+16} ${x+1} ${y+3}M${x+2} ${y+2}C${x+8} ${y+14} ${x+18} ${y+22} ${x+30} ${y+26}L${x+26} ${y+30}L${x+34} ${y+31}C${x+20} ${y+26} ${x+8} ${y+16} ${x-1} ${y+3}" class="rc-ink"/>
  <ellipse cx="${x}" cy="${y}" rx="4.4" ry="3.6" class="rc-wash d"/><ellipse cx="${x}" cy="${y}" rx="4.4" ry="3.6" class="rc-ink"/>`;
const rcMir=s=>`${s}<g transform="translate(300 0) scale(-1 1)">${s}</g>`;
const rcFilt=u=>`<filter id="rcw${u}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="${u%9+2}"/><feDisplacementMap in="SourceGraphic" scale="1.4"/></filter>`;
// the head of the cartouche, 300 x 150
function rcTop(u){
  const half=`${rcScroll([[126,50],[112,40],[94,38],[84,48]],{e:[8,-1],l:[[.35,-1,9],[.65,-1,8]]})}
    ${rcScroll([[98,66],[70,52],[30,58],[28,96]],{b:[6,1],e:[10,-1],l:[[.25,-1,10],[.5,-1,11],[.75,-1,9]]})}
    ${rcScroll([[42,108],[30,118],[28,136],[30,150]],{b:[5,1]})}
    <path d="M56 150C56 112 96 92 150 90" class="rc-ink t"/><path d="M60 150C60 116 98 97 150 95" class="rc-dash"/>
    ${rcScroll([[52,98],[46,110],[46,124],[52,134]],{e:[4,1],l:[[.3,-1,7],[.65,-1,6]]})}${rcScroll([[112,62],[118,72],[112,80],[104,78]],{e:[3.5,1]})}
    ${rcRose(108,26,6.5,10)}${rcBud(88,24,-50,.9)}${rcRose(62,84,7.5,40)}${rcBud(74,96,30,.8)}`;
  return `<svg class="rc-top" viewBox="0 0 300 150" ${NS} aria-hidden="true"><defs>${rcFilt(u)}</defs><g filter="url(#rcw${u})">${rcShell(150,50,24)}${rcMir(half)}</g></svg>`}
const RC_SIDE=`<svg class="rc-side" viewBox="0 0 300 100" preserveAspectRatio="none" ${NS} aria-hidden="true">${rcMir(`<path d="M30 0C42 30 20 64 30 100" class="rc-ink" vector-effect="non-scaling-stroke"/><path d="M34 0C46 30 24 64 34 100" class="rc-ink2" vector-effect="non-scaling-stroke"/><path d="M56 0V100" class="rc-ink t" vector-effect="non-scaling-stroke"/><path d="M60 0V100" class="rc-dash" vector-effect="non-scaling-stroke"/>`)}</svg>`;
function rcFoot(u){
  const half=`${rcScroll([[30,0],[30,24],[34,40],[46,52]],{e:[7,-1],l:[[.5,1,9]]})}
    ${rcScroll([[42,74],[60,98],[100,108],[128,98]],{b:[8,1],e:[6,-1],l:[[.3,1,10],[.55,1,11],[.8,1,8]]})}
    <path d="M56 0V40C56 74 100 88 150 88" class="rc-ink t"/><path d="M60 0V40C60 70 102 83 150 83" class="rc-dash"/>
    ${rcScroll([[48,30],[52,18],[64,14],[72,20]],{e:[3.5,1],l:[[.45,-1,7]]})}${rcScroll([[96,96],[104,86],[116,86],[118,94]],{e:[3,1]})}
    ${rcRose(70,64,7,200)}${rcBud(56,82,140,.8)}${rcBud(110,110,200,.75)}`;
  return `<svg class="rc-foot" viewBox="0 0 300 140" ${NS} aria-hidden="true"><defs>${rcFilt(u+50)}</defs><g filter="url(#rcw${u+50})">${rcMir(half)}${rcBow(150,104)}</g></svg>`}
const rcNames=(o,tag='h1')=>{const [n1,n2]=coverNames(o);return `<${tag} class="rc-names"><span>${esc(n1)}</span><em>${o.lang==='en'?'&amp;':'&amp;'}</em><span>${esc(n2)}</span></${tag}>`};
const rcVars=c=>`--wash:${c.wash};--leafw:${c.leafw};--paper:${c.sheet}`;
function rcCard(u,inner,cls){return `<div class="rc-shadow ${cls}"><div class="rc-card">${rcTop(u)}<div class="rc-mid">${RC_SIDE}<div class="rc-in">${inner}</div></div>${rcFoot(u)}</div></div>`}
FAMILY({key:'rococo',name:'Rococo',meaning:'Inked rococo cartouche',
  blurb:'An aged, deckle-edged card with a hand-inked rococo frame: scrolls and curls, a shell crown, small blush roses and a ribbon bow, with romantic script names. The card is drawn aside to open.',
  fonts:{d:"'IM Fell English', serif",s:"'Monsieur La Doulaise', cursive",b:"'IM Fell English', serif"},ms:1400,
  page(o,th,L){const u=++rcN,c=th.c,en=o.lang==='en';
    const inner=`<div class="rc-col">
      ${o.bismillah?`<p class="rc-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
      <p class="rc-k kicker">${ev(o,L)}</p>${rcNames(o)}
      <p class="rc-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="rc-hj">${esc(o.hijri)}</p>`:''}
      ${o.venue?`<p class="rc-ven">${esc(o.venue)}</p>`:''}
      <div class="rc-pills"><a class="rc-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="rc-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></div>`;
    return `<section class="page pg-rococo${c.dark?' rc-dark':''}" style="${rcVars(c)}"><i class="rc-bg"></i><div class="rc-pw reveal">${rcCard(u,inner,'')}</div></section>`},
  cover(o,th,L,guest,tag,attr){const u=++rcN,c=th.c,en=o.lang==='en';
    const inner=`<div class="rc-ctext"><p class="rc-k">${ev(o,L)}</p>${rcNames(o,'p')}<p class="rc-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="rc-cven">${esc(o.venue)}</p>`:''}</div>`;
    return `<div class="cover cv-rococo${c.dark?' rc-dark':''}" style="${rcVars(c)}"><i class="rc-bg"></i>
      <div class="rc-cw">${rcCard(u,inner,'')}</div>
      <div class="rc-foot2">${guest?`<p class="rc-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="rc-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('rc-dark',!!c.dark);
    [['--wash',c.wash],['--leafw',c.leafw]].forEach(([k,v])=>el.style.setProperty(k,v));
    // a small inked crest: two C-scrolls back to back round a rose
    const svg=`<svg ${NS} viewBox="0 0 150 36" width="150" height="36"><g fill="none" stroke="${c.accent}" stroke-linecap="round" stroke-linejoin="round">${
      (rcScroll([[68,20],[52,8],[30,8],[22,20]],{e:[6,-1],l:[[.45,-1,8]]})+rcScroll([[82,20],[98,8],[120,8],[128,20]],{e:[6,1],l:[[.45,1,8]]})+rcRose(75,18,6,0))
      .replace(/class="rc-ink2"/g,'stroke-width=".4" opacity=".6"').replace(/class="rc-ink t"/g,'stroke-width=".55"').replace(/class="rc-ink"/g,'stroke-width=".95"').replace(/class="rc-thin"/g,'stroke-width=".35"')
      .replace(/class="rc-dot"/g,`fill="${c.accent}" stroke="none"`).replace(/class="rc-wash"/g,`fill="${c.wash}" stroke="none" opacity=".75"`).replace(/class="rc-lf w"/g,`fill="${c.leafw}" stroke-width=".55"`).replace(/class="rc-lf"/g,`fill="none" stroke-width=".7"`)}</g></svg>`;
    el.style.setProperty('--rc-crest',K.uri(svg));
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah Bata',desc:'Red-brown ink on aged cream, blush silk',c:{ground:'#e6cfc6',sheet:'#f5ead6',ink:'#4a2a22',accent:'#8a3b2c',gold:'#a0604a',pagefg:'#4a2a22',wash:'#eaa7a4',leafw:'#b9c4a2'}},
    {k:'jambu',n:'Jambu',desc:'Rose ink on pale cream, dusty pink silk',c:{ground:'#ead6d4',sheet:'#f8eee4',ink:'#4a2a32',accent:'#a0455c',gold:'#b06a7a',pagefg:'#4a2a32',wash:'#f0b4be',leafw:'#bfc9a8'}},
    {k:'perang',n:'Perang',desc:'Sepia ink on old paper, linen ground',c:{ground:'#d8cbb3',sheet:'#f2e6cc',ink:'#3e2e20',accent:'#6b4a2e',gold:'#8a6a44',pagefg:'#3e2e20',wash:'#e3b49a',leafw:'#b8bd94'}},
    {k:'sage',n:'Sage',desc:'Olive-green ink on cream, sage silk',c:{ground:'#c8d0bd',sheet:'#f6efdd',ink:'#2f3628',accent:'#4f6b44',gold:'#7a8a5a',pagefg:'#2a3024',wash:'#eab0ae',leafw:'#a8bb92'}},
    {k:'biru',n:'Biru',desc:'Blue ink on cream, powder-blue silk',c:{ground:'#c9d3de',sheet:'#f6f1e4',ink:'#24304a',accent:'#2f4672',gold:'#5f7096',pagefg:'#22304a',wash:'#e7b2b6',leafw:'#b2c0a8'}},
    {k:'marun',n:'Marun',desc:'Red-brown ink on cream, wine velvet',c:{ground:'#3a1219',sheet:'#f5ead6',ink:'#4a2a22',accent:'#8a3226',gold:'#a0604a',pagefg:'#f3e2d6',wash:'#eaa2a0',leafw:'#b6c29e',dark:1}},
    {k:'hitam',n:'Hitam',desc:'Sepia ink on old paper, black velvet',c:{ground:'#161312',sheet:'#f3e7cf',ink:'#3e2e20',accent:'#73422c',gold:'#8a6a44',pagefg:'#eee3d0',wash:'#e6ad9c',leafw:'#b8bd94',dark:1}},
    {k:'nila',n:'Nila',desc:'Blue ink on cream, midnight velvet',c:{ground:'#18203a',sheet:'#f6f1e4',ink:'#24304a',accent:'#2c4270',gold:'#5f7096',pagefg:'#e6e9f2',wash:'#e9b0b8',leafw:'#b0bfa6',dark:1}},
  ]});
