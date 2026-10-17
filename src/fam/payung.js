/* payung: the oil-paper umbrella (payung kertas). On the cover it lies closed across the card: pleated painted paper,
   a bamboo shaft with nodes, a corded handle and a silk tassel, over a fine-line rib rosette.
   Touched, it opens radially (seen from above: bamboo ribs, painted blossoms, waxed sheen) and lifts away.
   Page: a half-open canopy rising above the names. Skin: headings with radiating ribs, scalloped card tops. */
const q=n=>+n.toFixed(1);
let U=0;
const P=(r,a)=>[q(Math.cos(a)*r),q(Math.sin(a)*r)];
const D=Math.PI/180;
// one 45-degree sector of the open canopy, seen from above (4 rib segments)
function sector(c,id){const a0=-90*D,a1=-45*D,R=190;let seg='',ribs='',edge='';
  for(let i=0;i<4;i++){const s0=a0+i*11.25*D,s1=s0+11.25*D,sm=(s0+s1)/2;const [x0,y0]=P(R,s0),[x1,y1]=P(R,s1),[cx,cy]=P(R-7,sm);
    seg+=`<path d="M0 0L${x0} ${y0}Q${cx} ${cy} ${x1} ${y1}Z" fill="${i%2?'#000':'#fff'}" opacity="${i%2?.07:.06}"/>`;
    edge+=(i?'':`M${x0} ${y0}`)+`Q${cx} ${cy} ${x1} ${y1}`;
    const [rx,ry]=P(R+2,s0),[ix,iy]=P(26,s0);ribs+=`M${ix} ${iy}L${rx} ${ry}`}
  const [ex,ey]=P(R+2,a1),[jx,jy]=P(26,a1);ribs+=`M${jx} ${jy}L${ex} ${ey}`;
  // painted spray along the middle of the sector
  const am=(a0+a1)/2,fl=(r,da,s)=>{const [x,y]=P(r,am+da*D);return `<g transform="translate(${x} ${y}) scale(${s})">${[0,72,144,216,288].map(a=>`<path d="M0 0C-4 -3 -5 -9 -1.5 -11L0 -9.6L1.5 -11C5 -9 4 -3 0 0Z" transform="rotate(${a})" fill="${c.flower}"/>`).join('')}<circle r="2.2" fill="${c.flowerC}"/></g>`};
  const lf=(r,da,rot,s)=>{const [x,y]=P(r,am+da*D);return `<path d="M0 0C3 -3 3 -8 0 -12C-3 -8 -3 -3 0 0Z" transform="translate(${x} ${y}) rotate(${q(rot)}) scale(${s})" fill="${c.leaf}"/>`};
  const [b0x,b0y]=P(70,am-14*D),[b1x,b1y]=P(118,am+6*D),[b2x,b2y]=P(150,am-8*D);
  const spray=`<path d="M${b0x} ${b0y}Q${b1x} ${b1y} ${b2x} ${b2y}" stroke="${c.branch}" stroke-width="1.6" fill="none"/>${lf(96,-2,(am/D)+150,1.1)}${lf(128,2,(am/D)+20,1)}${lf(84,-12,(am/D)-40,.9)}${fl(112,-6,1.3)}${fl(146,-7,1.05)}${fl(86,4,.9)}${fl(136,10,.75)}`;
  const ringBand=(r0,r1,col)=>{const [p0x,p0y]=P(r1,a0),[p1x,p1y]=P(r1,a1),[p2x,p2y]=P(r0,a1),[p3x,p3y]=P(r0,a0);return `<path d="M${p0x} ${p0y}A${r1} ${r1} 0 0 1 ${p1x} ${p1y}L${p2x} ${p2y}A${r0} ${r0} 0 0 0 ${p3x} ${p3y}Z" fill="${col}"/>`};
  let dots='';for(let i=0;i<8;i++){const [x,y]=P(170,a0+(i+.5)*45/8*D);dots+=`<circle cx="${x}" cy="${y}" r="2" fill="${c.flower}"/>`}
  let sc='';for(let i=0;i<8;i++){const t0=a0+i*45/8*D,t1=t0+45/8*D;const [x0,y0]=P(158,t0),[x1,y1]=P(158,t1),[xm,ym]=P(152,(t0+t1)/2);sc+=`M${x0} ${y0}Q${xm} ${ym} ${x1} ${y1}`}
  const [w0x,w0y]=P(R,a0),[w1x,w1y]=P(R,a1);
  return `<svg viewBox="-200 -200 400 400" ${NS}><defs><clipPath id="${id}"><path d="M0 0L${w0x} ${w0y}${edge.replace(/^M[^Q]+/,'')}Z"/></clipPath></defs>
   <g clip-path="url(#${id})"><circle r="200" fill="url(#${id}g)"/>
    ${ringBand(164,178,c.band)}${dots}${ringBand(44,60,c.band)}<path d="${sc}" fill="none" stroke="${c.band}" stroke-width="1.2"/>
    ${spray}${seg}
    <path d="${ribs}" stroke="${c.rib}" stroke-width="1.6" opacity=".55"/><path d="${ribs}" stroke="#fff" stroke-width=".5" opacity=".35" transform="translate(.6 .6)"/></g>
   <path d="${edge}" fill="none" stroke="${c.canopyD}" stroke-width="1.4"/></svg>`.replace(`url(#${id}g)`,c.canopyFill)}
function canopy(c,cls,count=8){const id=`pu${++U}`;const grad=`url(#${id}rg)`;
  const cc={...c,canopyFill:grad};
  const secs=Array.from({length:count},(_,k)=>`<i class="pu-sec" style="--a:${k*45}deg;--d:${(k*.025).toFixed(3)}s">${sector(cc,`${id}c${k}`).replace('<defs>',`<defs><radialGradient id="${id}rg" cx="0" cy="0" r="200" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c.canopyD}"/><stop offset=".2" stop-color="${c.canopy}"/><stop offset=".75" stop-color="${c.canopyL}"/><stop offset=".97" stop-color="${c.canopy}"/><stop offset="1" stop-color="${c.canopyD}"/></radialGradient>`)}</i>`).join('');
  let th='';for(let i=0;i<48;i++){const a=i/48*Math.PI*2,[x0,y0]=P(28,a),[x1,y1]=P(38,a+.06);th+=`<path d="M${x0} ${y0}L${x1} ${y1}" stroke="${[c.thread1,c.thread2,c.thread3][i%3]}" stroke-width="2.2"/>`}
  const cap=`<svg viewBox="-200 -200 400 400" ${NS}><defs><radialGradient id="${id}cap" cx="-.3" cy="-.3" r="1"><stop offset="0" stop-color="${c.bambooL}"/><stop offset="1" stop-color="${c.bambooD}"/></radialGradient></defs>${th}<circle r="26" fill="${c.canopyD}"/><circle r="22" fill="${c.band}"/><circle r="16" fill="${c.canopy}" stroke="${c.flower}" stroke-width="1"/><circle r="9" fill="url(#${id}cap)"/><circle r="3" fill="${c.bambooD}"/></svg>`;
  return `<div class="pu-can ${cls}">${secs}<i class="pu-cap">${cap}</i><i class="pu-gl"></i></div>`}
// the closed umbrella lying on its side, tip to the right: a fat pleated bundle of painted paper
function closedSvg(c){const id=`pc${++U}`,N=16,tip=[552,60],R=rng(3);
  const hem=Array.from({length:N+1},(_,i)=>{const t=i/N;return [q(206+(i%2?7:0)+Math.sin(t*Math.PI)*-6),q(14+t*92)]});
  const outline=`M${tip[0]} ${tip[1]}C470 50 330 16 ${hem[0][0]} ${hem[0][1]}L${hem[N][0]} ${hem[N][1]}C330 104 470 70 ${tip[0]} ${tip[1]}Z`;
  let pl='';for(let i=0;i<N;i++){const [x0,y0]=hem[i],[x1,y1]=hem[i+1];pl+=`<path d="M${tip[0]} ${tip[1]}L${x0} ${y0}L${x1} ${y1}Z" fill="${i%2?c.canopyD:c.canopy}"/>`;
    const fold=(i%2?'#000':'#fff');pl+=`<path d="M${tip[0]} ${tip[1]}L${x1} ${y1}" stroke="${fold}" stroke-opacity=".18" stroke-width=".8"/>`;
    if(i%2===0){for(let k=0;k<2;k++){const t=.18+k*.3+R()*.12,fx=x0+(tip[0]-x0)*t,fy=(y0+y1)/2+(tip[1]-(y0+y1)/2)*t;const r=q((4.5-k*1.2)*(1-t*.5));pl+=`<g transform="translate(${q(fx)} ${q(fy)})">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="${q(-r*.6)}" rx="${q(r*.42)}" ry="${q(r*.6)}" transform="rotate(${a})" fill="${c.flower}" opacity=".9"/>`).join('')}<circle r="${q(r*.25)}" fill="${c.flowerC}"/></g>`}}}
  let hemband='',hemdots='';hem.forEach(([x,y],i)=>{hemband+=(i?'L':'M')+q(x+9)+' '+y;if(i<N&&i%2)hemdots+=`<circle cx="${q(x+9)}" cy="${q(y+2.8)}" r="1.3" fill="${c.flower}"/>`});
  let nodes='';[96,150].forEach(x=>nodes+=`<path d="M${x} 56.4V63.6" stroke="${c.bambooD}" stroke-width="1.6"/>`);
  let cord='';for(let x=18;x<88;x+=4.5)cord+=`M${q(x)} 54L${q(x+4)} 66`;
  let tas='';for(let i=0;i<18;i++){const yy=60+(i-8.5)*.8;tas+=`M-14 ${q(yy)}Q-36 ${q(yy+(i-8.5)*1.4+10)} -58 ${q(yy+(i-8.5)*2.2+18+R()*5)}`}
  let str='';for(let i=1;i<N;i+=2){const [x,y]=hem[i];str+=`M${x} ${y}L172 ${q(60+(y-60)*.12)}`}
  return `<svg viewBox="-70 -10 640 140" ${NS}><defs><linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.bambooL}"/><stop offset=".5" stop-color="${c.bamboo}"/><stop offset="1" stop-color="${c.bambooD}"/></linearGradient>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".3" stop-color="#fff" stop-opacity=".05"/><stop offset=".6" stop-color="#000" stop-opacity=".05"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></linearGradient>
    <clipPath id="${id}c"><path d="${outline}"/></clipPath></defs>
   
   <rect x="-6" y="56.4" width="572" height="7.2" rx="3.4" fill="url(#${id}b)"/>${nodes}
   <rect x="14" y="53" width="78" height="14" rx="5" fill="${c.cord}"/><path d="${cord}" stroke="#000" stroke-opacity=".28" stroke-width="1.3"/><rect x="14" y="53" width="78" height="14" rx="5" fill="url(#${id}s)"/>
   <path d="M-8 60C-8 50 -2 48 4 52" stroke="${c.tassel}" stroke-width="1.6" fill="none"/><rect x="-20" y="54" width="10" height="12" rx="3" fill="${c.tassel}"/><path d="M-20 57H-10M-20 63H-10" stroke="${c.flowerC}" stroke-width="1"/><path d="${tas}" stroke="${c.tassel}" stroke-width=".75" fill="none"/>
   <path d="${str}" stroke="${c.bambooD}" stroke-width=".9"/><path d="M164 54H182V66H164Z" fill="${c.bambooD}"/>${[167,171,175,179].map((x,i)=>`<path d="M${x} 53V67" stroke="${[c.thread1,c.thread2,c.thread3,c.thread1][i]}" stroke-width="1.8"/>`).join('')}
   <g clip-path="url(#${id}c)">${pl}<path d="${hemband}" stroke="${c.band}" stroke-width="7" fill="none"/>${hemdots}
    <path d="M378 0V120M386 0V120" stroke="${c.band}" stroke-width="3.2"/><rect x="0" y="0" width="560" height="120" fill="url(#${id}s)"/></g>
   <path d="${outline}" fill="none" stroke="${c.canopyD}" stroke-width="1"/>
   <path d="M382 26C394 40 394 80 382 94" stroke="${c.cord}" stroke-width="2.6" fill="none"/><path d="M383 94q8 8 3 18M383 94q-6 9 -2 17" stroke="${c.cord}" stroke-width="1.3" fill="none"/>
   <path d="M550 56H572Q580 60 572 64H550Z" fill="${c.bambooD}"/><circle cx="576" cy="60" r="2.4" fill="${c.bambooD}"/></svg>`}
const ROSETTE=K.uri(`<svg ${NS} viewBox="-200 -200 400 400"><g fill="none" stroke="#000"><circle r="196" stroke-width="1.2"/><circle r="188" stroke-width=".6"/><circle r="120" stroke-width=".5"/><circle r="40" stroke-width=".8"/>${Array.from({length:32},(_,i)=>{const [x0,y0]=P(40,i/32*Math.PI*2),[x1,y1]=P(188,i/32*Math.PI*2);return `<path d="M${x0} ${y0}L${x1} ${y1}" stroke-width=".5"/>`}).join('')}${Array.from({length:32},(_,i)=>{const a=(i+.5)/32*Math.PI*2,[x,y]=P(192,a);return `<circle cx="${x}" cy="${y}" r="1.4" fill="#000"/>`}).join('')}</g></svg>`);
const pal=c=>({canopy:c.canopy,canopyL:c.canopyL,canopyD:c.canopyD,band:c.band,flower:c.flower,flowerC:c.flowerC||'#f2c14e',leaf:c.leaf||'#3f6b4a',branch:c.branch||'#5a3a24',rib:c.rib||'#3a2416',bamboo:'#c9a26a',bambooL:'#ecd3a0',bambooD:'#7a5a32',cord:c.cord||'#2a2a2a',tassel:c.tassel||c.band,thread1:c.thread1||'#d23b3b',thread2:c.thread2||'#2f8a6a',thread3:c.thread3||'#f2c14e'});

// a painted plum-blossom branch for the cover corners
function blossomBranch(c,seed){const r=rng(seed);let bl='';
  const pts=[[40,120],[70,96],[96,80],[122,58],[150,46],[176,30],[86,108],[132,74],[160,62]];
  pts.forEach(([x,y],i)=>{const s=5+r()*4;let pet='';for(let k=0;k<5;k++){const a=k/5*Math.PI*2+r();pet+=`<ellipse cx="${(x+Math.cos(a)*s*.62).toFixed(1)}" cy="${(y+Math.sin(a)*s*.62).toFixed(1)}" rx="${(s*.55).toFixed(1)}" ry="${(s*.42).toFixed(1)}" transform="rotate(${(a*57.3).toFixed(0)} ${(x+Math.cos(a)*s*.62).toFixed(1)} ${(y+Math.sin(a)*s*.62).toFixed(1)})" fill="${c.flower}" stroke="${c.canopyD}" stroke-width=".5"/>`}
    bl+=`<g opacity="${(.85+r()*.15).toFixed(2)}">${pet}<circle cx="${x}" cy="${y}" r="${(s*.22).toFixed(1)}" fill="${c.flowerC}"/>${Array.from({length:6},(_,k)=>{const a=k/6*Math.PI*2;return `<path d="M${x} ${y}l${(Math.cos(a)*s*.5).toFixed(1)} ${(Math.sin(a)*s*.5).toFixed(1)}" stroke="${c.canopyD}" stroke-width=".4"/>`}).join('')}</g>`});
  const buds=[[58,104],[110,66],[188,22],[144,58]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2.6" ry="3.6" fill="${c.canopy}"/>`).join('');
  return `<svg viewBox="0 0 200 140"><path d="M0 140C30 126 52 106 76 98S118 70 138 56 172 30 200 14" stroke="${c.branch}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
   <path d="M76 98C80 110 92 114 100 112M122 66C128 76 140 80 150 78M150 46C150 36 158 30 166 28" stroke="${c.branch}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
   <path d="M0 140C30 126 52 106 76 98" stroke="#fff" stroke-opacity=".18" stroke-width="1" fill="none"/>${buds}${bl}</svg>`}
FAMILY({key:'payung',name:'Payung',meaning:'Oil-paper umbrella',
  blurb:'A painted oil-paper umbrella lies closed across the card; touch it and it opens radially, ribs and blossoms, then lifts away.',
  fonts:{d:"'Marcellus', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=pal(th.c),en=o.lang==='en';
    return `<section class="page pg-payung" style="--ros:${ROSETTE}"><div class="pu-bg"></div><div class="pu-half">${canopy(c,'half')}</div>
     <div class="pu-ptxt"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="pu-rule reveal d2"></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="pu-v reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=pal(th.c),en=o.lang==='en';
    return `<div class="cover cv-payung" style="--ros:${ROSETTE}"><div class="pu-bg"></div><i class="pu-frame"></i><i class="pu-ros"></i>
     <span class="pu-br a">${blossomBranch(c,7)}</span><span class="pu-br b">${blossomBranch(c,19)}</span>
     <span class="pu-seal">${esc(K.initials(o).join(''))}</span>
     <div class="pu-head"><p class="pu-k">${ev(o,L)}</p><p class="pu-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="pu-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <${tag} class="pu-tap" ${attr} aria-label="${L.open}"><span class="pu-closed">${closedSvg(c)}</span></${tag}>
     ${canopy(c,'open')}
     <div class="pu-foot">${guest?`<p class="pu-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="pu-hint">${en?'Touch the umbrella to open it':'Sentuh payung untuk membukanya'}</p></div></div>`},
  skin(el,o,th){K.cards(el);$$('.sec h2',el).forEach(h=>h.insertAdjacentHTML('afterbegin','<i class="pu-hr"></i>'))},
  themes:[
    {k:'merah',n:'Merah',desc:'Red umbrella with plum blossom',c:{ground:'#f3ebde',sheet:'#fcf8f0',ink:'#33241e',accent:'#a6262c',gold:'#b08a48',pagefg:'#33241e',canopy:'#c0303a',canopyL:'#d9524f',canopyD:'#8a1a24',band:'#1f3a5f',flower:'#fbe6dc',flowerC:'#f2c14e'}},
    {k:'malam',n:'Malam',desc:'Red umbrella on a night ground',c:{ground:'#17202b',sheet:'#f8f2e6',ink:'#2a2320',accent:'#a6262c',gold:'#c9a35c',pagefg:'#efe6d6',canopy:'#bb2f38',canopyL:'#d65450',canopyD:'#7d1820',band:'#e2b04a',flower:'#fbe6dc',cord:'#d8c08a'}},
    {k:'jed',n:'Jed',desc:'Jade umbrella with white blossom',c:{ground:'#eef1ea',sheet:'#fbfcf8',ink:'#24302a',accent:'#2c6a55',gold:'#a08a50',pagefg:'#24302a',canopy:'#3c8a6e',canopyL:'#62a98a',canopyD:'#235a47',band:'#c0303a',flower:'#f6f2e6',leaf:'#e2c05a',branch:'#1e3a2e'}},
    {k:'kuning',n:'Kuning',desc:'Saffron umbrella, red bands',c:{ground:'#f6efdf',sheet:'#fffbf2',ink:'#3a2c18',accent:'#a6262c',gold:'#a8823a',pagefg:'#3a2c18',canopy:'#e2a83a',canopyL:'#f0c766',canopyD:'#b07a1e',band:'#a6262c',flower:'#fff4dc',flowerC:'#a6262c',leaf:'#5a7a3a'}},
    {k:'nila',n:'Nila',desc:'Indigo umbrella on midnight',c:{ground:'#121a2e',sheet:'#f5f2ec',ink:'#1f2433',accent:'#2c4a8a',gold:'#c6a865',pagefg:'#e9e6df',canopy:'#2f4f8f',canopyL:'#4f72b2',canopyD:'#1a2f5c',band:'#e6c27a',flower:'#f3eee4',leaf:'#9fb8a0',cord:'#c6a865'}},
    {k:'jambu',n:'Jambu',desc:'Rose umbrella on blush',c:{ground:'#f8ece9',sheet:'#fffaf8',ink:'#3e2a2c',accent:'#b23a5a',gold:'#b48c5a',pagefg:'#3e2a2c',canopy:'#df7b93',canopyL:'#efa2b3',canopyD:'#b4506c',band:'#4a6a8a',flower:'#fff3f5',flowerC:'#e2b04a'}},
    {k:'hitam',n:'Hitam',desc:'Black lacquer umbrella, gold blossom',c:{ground:'#1a1817',sheet:'#f7f2ea',ink:'#262220',accent:'#9a2a2a',gold:'#d0ad62',pagefg:'#efe8dc',canopy:'#2a2624',canopyL:'#4a4440',canopyD:'#141210',band:'#b8323a',flower:'#e6c27a',flowerC:'#b8323a',leaf:'#8a7a50',branch:'#c9a35c',rib:'#000',cord:'#b8323a'}},
    {k:'ungu',n:'Ungu',desc:'Plum umbrella on lilac',c:{ground:'#efeaf3',sheet:'#fcfaff',ink:'#2e2836',accent:'#6e3a7e',gold:'#a08a6a',pagefg:'#2e2836',canopy:'#7e4a90',canopyL:'#a070b2',canopyD:'#55306a',band:'#e2b04a',flower:'#f6eefa',leaf:'#7aa080'}},
  ]});
