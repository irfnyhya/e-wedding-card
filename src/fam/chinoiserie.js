/* chinoiserie: Biru Putih. A large blue-and-white porcelain charger hung on a silk damask wall: a kraak-style rim of
   flower panels and tassel panels, a ruyi cavetto, and a cobalt landscape of rock, peonies, willow and pavilion.
   Cover: touched, the plate tilts and lifts off the wall. Page: the plate rim frames the names.
   Skin: porcelain-rim cards with cobalt brush borders. */
needFont('Cormorant+SC:wght@400;500');
const q=n=>+n.toFixed(1);
let U=0;
const pt=(r,a)=>[200+Math.cos(a)*r,200+Math.sin(a)*r];
const arc=(r0,r1,a0,a1)=>{const [x0,y0]=pt(r1,a0),[x1,y1]=pt(r1,a1),[x2,y2]=pt(r0,a1),[x3,y3]=pt(r0,a0),lg=(a1-a0)>Math.PI?1:0;
  return `M${q(x0)} ${q(y0)}A${r1} ${r1} 0 ${lg} 1 ${q(x1)} ${q(y1)}L${q(x2)} ${q(y2)}A${r0} ${r0} 0 ${lg} 0 ${q(x3)} ${q(y3)}Z`};
// a small flower spray for the rim panels, drawn upright at 0 0 then placed
const spray=(c)=>`<path d="M0 12C1 4 -1 -2 2 -8" fill="none" stroke="${c.cob}" stroke-width="1"/><path d="M1 2C6 0 9 2 10 5C6 6 3 5 1 2ZM1 -2C-4 -4 -8 -2 -9 1C-5 2 -2 1 1 -2Z" fill="${c.cob}" fill-opacity=".55" stroke="${c.cob}" stroke-width=".6"/>
  <g transform="translate(2 -10)">${[0,1,2,3,4].map(i=>`<ellipse cx="0" cy="-4" rx="2.8" ry="4" transform="rotate(${i*72})" fill="${c.cob}" fill-opacity=".35" stroke="${c.cob}" stroke-width=".6"/>`).join('')}<circle r="1.6" fill="${c.cobD}"/></g>`;
function plateSvg(c,simple){const id=`ch${++U}`;let rim='';const N=8;
  for(let i=0;i<N;i++){const a0=-Math.PI/2+(i/N)*Math.PI*2,aw=Math.PI*2/N,ab=a0+aw*.68;
    // wide panel with a spray
    rim+=`<path d="${arc(150,183,a0+.02,ab-.02)}" fill="#fff" fill-opacity=".0" stroke="${c.cob}" stroke-width="1.1"/><path d="${arc(153,180,a0+.045,ab-.045)}" fill="none" stroke="${c.cob}" stroke-width=".45"/>`;
    const am=(a0+ab)/2,[sx,sy]=pt(167,am);rim+=`<g transform="translate(${q(sx)} ${q(sy)}) rotate(${q(am*57.3+90)}) scale(1.3)">${spray(c)}</g>`;
    // narrow panel: cobalt wash with a hanging tassel of beads
    rim+=`<path d="${arc(150,183,ab+.01,a0+aw-.01)}" fill="${c.cob}" fill-opacity=".62" stroke="${c.cobD}" stroke-width=".9"/>`;
    {const g=[];for(let k=0;k<7;k++){const u=ab+.02+(a0+aw-ab-.04)*k/6;const [x0,y0]=pt(151,u),[x1,y1]=pt(182,u+.06);g.push(`M${q(x0)} ${q(y0)}L${q(x1)} ${q(y1)}`)}rim+=`<path d="${g.join('')}" stroke="#fff" stroke-opacity=".35" stroke-width=".5"/>`}
    const an=(ab+a0+aw)/2;for(let k=0;k<5;k++){const [bx,by]=pt(178-k*6,an);rim+=`<circle cx="${q(bx)}" cy="${q(by)}" r="${k===4?2.4:1.5}" fill="#fff" fill-opacity=".9" stroke="${c.cobD}" stroke-width=".4"/>`}
    const [tx,ty]=pt(178,an),[ux,uy]=pt(152,an);rim+=`<path d="M${q(tx)} ${q(ty)}L${q(ux)} ${q(uy)}" stroke="#fff" stroke-opacity=".7" stroke-width=".5"/>`}
  let ruyi='';for(let i=0;i<16;i++){ruyi+=`<g transform="rotate(${i*22.5} 200 200)"><path d="M200 70C196 70 190 69 190 64C190 59 195 58 197 60C196 56 198 53 200 53C202 53 204 56 203 60C205 58 210 59 210 64C210 69 204 70 200 70Z" transform="translate(0 4)" fill="${c.cob}" fill-opacity=".5" stroke="${c.cob}" stroke-width=".7"/><circle cx="200" cy="54" r="1.3" fill="${c.cob}"/></g><g transform="rotate(${i*22.5+11.25} 200 200)"><path d="M196 52C198 48 202 48 204 52C202 50 198 50 196 52Z" fill="${c.cob}" opacity=".7"/><path d="M200 57V50" stroke="${c.cob}" stroke-width=".5"/></g>`}
  // cracked-ice diaper in the cavetto ground
  ruyi=`<path d="${arc(123,149,0,Math.PI*2-.0001)}" fill="${c.cob}" fill-opacity=".14"/>`+ruyi;
  // willow: arching branches from a gnarled trunk, fronds hanging along each arch
  let wil='',wl='',br='';const R=rng(7);
  const arches=[[198,150,150,128,128,150],[200,146,228,112,262,132],[204,170,236,150,266,166],[196,168,176,150,156,166],[201,138,206,116,214,108]];
  arches.forEach(([x0,y0,cx,cy,x1,y1],j)=>{br+=`M${x0} ${y0}Q${cx} ${cy} ${x1} ${y1}`;
    for(let i=0;i<9;i++){const t=.18+i/9*.82,x=(1-t)*(1-t)*x0+2*t*(1-t)*cx+t*t*x1,y=(1-t)*(1-t)*y0+2*t*(1-t)*cy+t*t*y1,l=(18+R()*30)*(j===4?.6:1),sw=(R()-.5)*7;
      wil+=`M${q(x)} ${q(y)}C${q(x+1)} ${q(y+l*.4)} ${q(x+sw)} ${q(y+l*.7)} ${q(x+sw*1.2)} ${q(y+l)}`;
      for(let k=1;k<5;k++){const u=k/5,lx=x+sw*1.2*u*u,ly=y+l*u;wl+=`M${q(lx)} ${q(ly)}l${q(R()<.5?-2:2)} 2.6`}}});
  const peon=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">${[0,1,2,3,4,5,6].map(i=>`<path d="M0 0C-5 -4 -6 -11 0 -14C6 -11 5 -4 0 0Z" transform="rotate(${i*51.4})" fill="${c.cob}" fill-opacity=".38" stroke="${c.cob}" stroke-width=".7"/>`).join('')}${[0,1,2,3,4].map(i=>`<path d="M0 0C-3 -3 -4 -7 0 -9C4 -7 3 -3 0 0Z" transform="rotate(${i*72+20})" fill="${c.cob}" fill-opacity=".55" stroke="${c.cobD}" stroke-width=".6"/>`).join('')}<circle r="2.2" fill="${c.cobD}"/></g>`;
  const lf=(x,y,r,s)=>`<path d="M0 0C4 -4 5 -10 0 -16C-5 -10 -4 -4 0 0Z" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" fill="${c.cob}" fill-opacity=".6" stroke="${c.cobD}" stroke-width=".6"/><path d="M0 -1V-14" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" stroke="#fff" stroke-opacity=".6" stroke-width=".5"/>`;
  const scene=`<g filter="url(#${id}br)">
    <path d="M226 176C238 156 252 150 264 162C272 150 286 148 298 160C306 154 314 158 320 166V180H226Z" fill="${c.cob}" fill-opacity=".16"/><path d="M226 176C238 156 252 150 264 162C272 150 286 148 298 160C306 154 314 158 320 166" fill="none" stroke="${c.cob}" stroke-width=".6" opacity=".6"/><path d="M118 132c4 -6 12 -6 14 0c4 -4 10 -2 10 3c-6 2 -18 2 -24 -3Z" fill="none" stroke="${c.cob}" stroke-width=".7"/><path d="M100 268C130 262 160 270 190 264S250 260 300 266" fill="none" stroke="${c.cob}" stroke-width="1"/>
    ${[0,1,2,3].map(i=>`<path d="M${108+i*8} ${276+i*6}c8 -3 14 3 22 0s14 -3 22 0 14 3 22 0 14 -3 22 0 14 3 22 0" fill="none" stroke="${c.cob}" stroke-width=".7" opacity=".8"/>`).join('')}
    <path d="M96 262L196 250M96 248L196 238" stroke="${c.cob}" stroke-width=".9"/>${Array.from({length:11},(_,i)=>`<path d="M${100+i*9} ${q(264-i*1.2)}V${q(240-i*1)}M${100+i*9} ${q(262-i*1.2)}L${109+i*9} ${q(249-i*1.2)}M${100+i*9} ${q(250-i*1.2)}L${109+i*9} ${q(261-i*1.2)}" stroke="${c.cob}" stroke-width=".7"/>`).join('')}
    <path d="M104 240C96 222 108 208 102 192C98 178 110 168 120 172C118 158 130 148 142 154C146 142 162 142 166 154C176 156 178 170 170 178C178 190 170 204 162 206C170 218 164 236 172 246C150 252 122 250 104 240Z" fill="${c.cob}" fill-opacity=".42" stroke="${c.cobD}" stroke-width="1.1"/><path d="M112 228C118 214 112 200 118 190M128 240C132 226 128 214 136 204M150 236C146 222 154 214 150 202M156 190c-6 -6 -4 -14 2 -18M128 166c6 -2 10 2 10 6" fill="none" stroke="${c.cobD}" stroke-width=".7" opacity=".8"/><path d="M106 214l6 2M110 196l5 3M144 220l6 1M160 226l5 -2M124 200l4 3M138 230l3 4" stroke="${c.cobD}" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
    <path d="M118 170c4 -6 12 -4 12 3s-9 8 -12 2M140 196c3 -5 10 -3 10 2s-7 6 -10 1M122 214c4 -4 9 -2 8 3s-7 4 -8 -3M150 168c2 -3 6 -2 6 1" fill="${c.ground0}" stroke="${c.cobD}" stroke-width=".8"/>
    <path d="M110 200C116 206 114 220 122 226M150 150C146 162 156 170 152 182" stroke="${c.cobD}" stroke-width=".7" fill="none"/>
    ${lf(150,160,-40,1.1)}${lf(164,150,30,1)}${lf(120,186,-70,1)}${lf(132,180,20,.9)}${lf(176,170,60,.9)}${peon(156,156,1.25)}${peon(124,182,1)}${peon(176,182,.8)}
    <path d="M186 258C192 236 186 212 194 190C198 176 196 160 200 146" stroke="${c.cobD}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M190 240C192 232 190 226 193 220M195 200c2 -4 1 -8 3 -12" stroke="#fff" stroke-opacity=".6" stroke-width=".8" fill="none"/><path d="${br}" stroke="${c.cobD}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="${wil}" stroke="${c.cob}" stroke-width=".6" fill="none"/><path d="${wl}" stroke="${c.cob}" stroke-width="1.3" stroke-linecap="round" fill="none" opacity=".8"/>
    <path d="M214 236H292L288 242H218Z" fill="${c.cob}" fill-opacity=".7" stroke="${c.cobD}" stroke-width=".8"/>
    <path d="M224 236V206M282 236V206M246 236V212M262 236V212" stroke="${c.cobD}" stroke-width="1.6"/>
    <path d="M222 226H284M222 230H284" stroke="${c.cob}" stroke-width=".7"/>${[0,1,2,3,4,5,6,7].map(i=>`<path d="M${226+i*7.4} 226V230" stroke="${c.cob}" stroke-width=".6"/>`).join('')}
    <path d="M200 208C214 206 226 198 236 186L253 176L270 186C280 198 292 206 306 208C296 210 284 206 276 202H230C222 206 210 210 200 208Z" fill="${c.cob}" fill-opacity=".75" stroke="${c.cobD}" stroke-width=".9"/>
    <path d="M236 186H270M240 192H266M232 198H274" stroke="#fff" stroke-opacity=".55" stroke-width=".6"/><path d="M253 176V168M248 171H258" stroke="${c.cobD}" stroke-width="1"/>
    <path d="M232 202H274V206H232Z" fill="${c.cobD}"/>
    <path d="M232 268C244 254 262 254 274 268" fill="none" stroke="${c.cobD}" stroke-width="1.4"/><path d="M228 268H278M240 260L240 268M262 260V268" stroke="${c.cob}" stroke-width=".8"/>
    <path d="M150 112c4 -4 8 -4 10 0c2 -4 6 -4 10 0M174 100c3 -3 6 -3 8 0c2 -3 5 -3 8 0" fill="none" stroke="${c.cobD}" stroke-width="1.1" stroke-linecap="round"/>
    <path d="M244 132C260 124 278 126 292 136M252 142C266 136 282 138 294 146" fill="none" stroke="${c.cob}" stroke-width=".8" opacity=".7"/>
   </g>`;
  return `<svg viewBox="0 0 400 400" ${NS}><defs>
   <radialGradient id="${id}gl" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="${c.glazeL}"/><stop offset=".7" stop-color="${c.glaze}"/><stop offset="1" stop-color="${c.glazeD}"/></radialGradient>
   <radialGradient id="${id}cv" cx=".5" cy=".5" r=".5"><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset=".95" stop-color="#1a2a44" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".25"/></radialGradient>
   <linearGradient id="${id}sp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
   <filter id="${id}br" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation=".35" result="s"/><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="3" seed="11"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.3 .25" result="m"/><feComposite in="s" in2="m" operator="arithmetic" k1="1"/></filter>
   <clipPath id="${id}m"><circle cx="200" cy="200" r="114"/></clipPath></defs>
   <circle cx="200" cy="200" r="194" fill="url(#${id}gl)"/>
   <circle cx="200" cy="200" r="193" fill="none" stroke="${c.glazeD}" stroke-width="2"/><circle cx="200" cy="200" r="190.5" fill="none" stroke="#fff" stroke-width="1.2" opacity=".8"/>
   <g filter="url(#${id}br)"><circle cx="200" cy="200" r="186" fill="none" stroke="${c.cob}" stroke-width="2.4"/><circle cx="200" cy="200" r="183" fill="none" stroke="${c.cob}" stroke-width=".6"/>${rim}
   <circle cx="200" cy="200" r="150" fill="none" stroke="${c.cob}" stroke-width="1.4"/>${simple?'':ruyi}<circle cx="200" cy="200" r="122" fill="none" stroke="${c.cob}" stroke-width="1"/><circle cx="200" cy="200" r="118" fill="none" stroke="${c.cob}" stroke-width="2"/></g>
   <circle cx="200" cy="200" r="150" fill="url(#${id}cv)"/>
   ${simple?'':`<g clip-path="url(#${id}m)">${scene}</g>`}
   <path d="M86 112C110 70 160 44 214 40" fill="none" stroke="url(#${id}sp)" stroke-width="9" stroke-linecap="round" opacity=".55"/><path d="M98 104C118 76 150 58 186 52" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
  </svg>`}
// silk damask wallpaper
const DAMASK=col=>K.uri(`<svg ${NS} width="64" height="96" viewBox="0 0 64 96"><g id="h" fill="none" stroke="${col}" stroke-width=".8" stroke-linecap="round">
  <path d="M32 0C22 10 9 18 9 46C9 74 22 84 32 96"/><path d="M32 6C26 12 15 20 15 46C15 72 26 80 32 90" stroke-width=".45"/>
  <path d="M32 24C27 30 23 37 26 46C28 51 32 54 32 54" fill="${col}" fill-opacity=".55"/><path d="M32 30C24 26 18 31 20 38C22 44 28 42 27 37"/><path d="M32 42C26 40 22 44 24 49"/>
  <path d="M32 62C29 67 29 74 32 80" fill="${col}" fill-opacity=".55"/><path d="M32 66C27 64 23 68 25 72M32 12C30 15 30 18 32 20"/>
  <path d="M0 40C4 44 4 52 0 56" fill="${col}" fill-opacity=".45"/><path d="M0 30C6 34 8 40 6 44M0 66C6 62 8 56 6 52" stroke-width=".5"/><circle cx="3" cy="2" r="1" fill="${col}"/><circle cx="3" cy="94" r="1" fill="${col}"/></g><use href="#h" transform="translate(64 0) scale(-1 1)"/></svg>`);
const BRUSH=c=>K.uri(`<svg ${NS} width="80" height="16" viewBox="0 0 80 16"><defs><filter id="b"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="2"/><feDisplacementMap in="SourceGraphic" scale="1.4"/></filter></defs><g filter="url(#b)" fill="none" stroke="${c.cob}"><path d="M0 2H80M0 14H80" stroke-width="1.6"/><path d="M0 5H80M0 11H80" stroke-width=".5"/><path d="M4 8c4 -3 8 -3 12 0s8 3 12 0 8 -3 12 0 8 3 12 0 8 -3 12 0 8 3 12 0" stroke-width="1"/></g></svg>`);
const pal=c=>({cob:c.cob||'#1f3f8f',cobD:c.cobD||'#122a66',glaze:c.glaze||'#f3f6f9',glazeL:c.glazeL||'#ffffff',glazeD:c.glazeD||'#d9e1ea',ground0:c.glazeL||'#fff'});
FAMILY({key:'chinoiserie',name:'Biru Putih',meaning:'Blue and white',
  blurb:'A blue-and-white porcelain charger painted in cobalt hangs on a silk damask wall; touch it and it lifts away.',
  fonts:{d:"'Cormorant SC', 'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,p=pal(c),en=o.lang==='en';
    return `<section class="page pg-chinoiserie" style="--damask:${DAMASK(c.damask)}"><div class="ch-wall"></div>
     <div class="ch-pplate">${plateSvg(p,true)}<div class="ch-pin"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><div class="ch-rule reveal d2"><i></i><b></b><i></i></div><p class="caps reveal d2">${esc(fmtShort(o.date))}</p></div></div>
     <div class="ch-pfoot reveal d3"><p class="caps">${esc(fmtDate(o.date,o.lang))}</p><p class="ch-v">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,p=pal(c),en=o.lang==='en';
    return `<div class="cover cv-chinoiserie" style="--damask:${DAMASK(c.damask)}"><div class="ch-wall"></div>
     <div class="ch-head"><p class="ch-k">${ev(o,L)}</p><p class="ch-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="ch-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <div class="ch-hang"><i class="ch-wire"></i><${tag} class="ch-plate" ${attr} aria-label="${L.open}">${plateSvg(p)}<i class="ch-clip a"></i><i class="ch-clip b"></i><i class="ch-clip c"></i></${tag}></div>
     <div class="ch-foot">${guest?`<p class="ch-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="ch-hint">${en?'Touch the plate to lift it':'Sentuh pinggan untuk membuka'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--brush',BRUSH(pal(th.c)));el.style.setProperty('--damask',DAMASK(th.c.damask));
    $$('.sec h2',el).forEach(h=>h.insertAdjacentHTML('afterbegin','<i class="ch-hs"></i>'));
    K.secs(el).forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="ch-bb t"></i><i class="ch-bb b"></i>'))},
  themes:[
    {k:'biru',n:'Biru',desc:'Cobalt plate on duck-egg silk',c:{ground:'#d9e4ea',sheet:'#fbfcfd',ink:'#1d2b45',accent:'#1f3f8f',gold:'#a88a50',pagefg:'#1d2b45',damask:'#f4f8fa',cob:'#1f3f8f',cobD:'#13296a'}},
    {k:'nila',n:'Nila',desc:'Cobalt plate on midnight silk',c:{ground:'#14213d',sheet:'#fbfcfd',ink:'#1d2b45',accent:'#1f3f8f',gold:'#c9aa6a',pagefg:'#eef2f7',damask:'#2c3f68',cob:'#1f3f8f',cobD:'#13296a'}},
    {k:'putih',n:'Putih',desc:'Indigo plate on white silk',c:{ground:'#f3f2ee',sheet:'#ffffff',ink:'#1f2638',accent:'#22357a',gold:'#a88a50',pagefg:'#1f2638',damask:'#d9dce4',cob:'#22357a',cobD:'#141f52'}},
    {k:'merah',n:'Merah Lakuer',desc:'Blue and white on red lacquer',c:{ground:'#7e1c1c',sheet:'#fbfaf7',ink:'#1d2b45',accent:'#1f3f8f',gold:'#d8b46a',pagefg:'#f6ebe0',damask:'#a3352e',cob:'#1f3f8f',cobD:'#13296a'}},
    {k:'emas',n:'Emas',desc:'Cobalt plate on gold silk',c:{ground:'#d8c38f',sheet:'#fffdf7',ink:'#1d2b45',accent:'#1f3f8f',gold:'#8c6a2a',pagefg:'#2a2414',damask:'#efe2bb',cob:'#1f3f8f',cobD:'#13296a'}},
    {k:'hijau',n:'Seladon',desc:'Cobalt plate on celadon silk',c:{ground:'#b9cfc2',sheet:'#fbfdfb',ink:'#1b2e3a',accent:'#264a86',gold:'#8e7a4a',pagefg:'#1b2e2a',damask:'#d6e6dc',cob:'#264a86',cobD:'#152f60'}},
    {k:'hitam',n:'Hitam',desc:'Blue and white on black lacquer',c:{ground:'#151619',sheet:'#fbfcfd',ink:'#1d2b45',accent:'#2a4a9a',gold:'#c8a865',pagefg:'#ecebe6',damask:'#2a2d33',cob:'#24479a',cobD:'#152d6e'}},
    {k:'ungu',n:'Ungu Senja',desc:'Violet-blue plate on dove grey',c:{ground:'#cfcbd6',sheet:'#fdfcfe',ink:'#2a2840',accent:'#3a3a8c',gold:'#9a8456',pagefg:'#2a2840',damask:'#e3e0ea',cob:'#363a92',cobD:'#22246a'}},
  ]});
