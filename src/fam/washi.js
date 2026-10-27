/* washi: Japanese paper. Two shoji panels of fibrous washi in a fine kumiko frame, painted with a red sun rising
   over seigaiha waves and three abstract cranes, sealed at the join by a kamon-style crest of the couple's initials.
   Cover: touched, the shoji panels slide apart. Page: the crest above the names, with vertical text in the margins.
   Skin: washi cards headed by a red hanko stamp. */
needFont('Shippori+Mincho:wght@400;500;600');
const q=n=>+n.toFixed(1);
let U=0;
// kozo fibres scattered through the sheet
const FIBRE=(()=>{const R=rng(17);let a='',b='';for(let i=0;i<150;i++){const x=R()*300,y=R()*300,l=10+R()*34,an=R()*Math.PI*2,c=(R()-.5)*14;
    const ex=x+Math.cos(an)*l,ey=y+Math.sin(an)*l,mx=(x+ex)/2+Math.cos(an+1.57)*c,my=(y+ey)/2+Math.sin(an+1.57)*c;(i%3?a:b);
    if(i%3)a+=`M${q(x)} ${q(y)}Q${q(mx)} ${q(my)} ${q(ex)} ${q(ey)}`;else b+=`M${q(x)} ${q(y)}Q${q(mx)} ${q(my)} ${q(ex)} ${q(ey)}`}
  return K.uri(`<svg ${NS} width="300" height="300" viewBox="0 0 300 300"><path d="${a}" fill="none" stroke="#fff" stroke-width=".7" opacity=".75"/><path d="${b}" fill="none" stroke="#8a7a60" stroke-width=".5" opacity=".28"/></svg>`)})();
const SEIGAIHA=col=>K.uri(`<svg ${NS} width="40" height="20" viewBox="0 0 40 20"><g fill="none" stroke="${col}" stroke-width=".8"><g id="w">${[19,15,11,7,3].map(r=>`<path d="M${20-r} 20A${r} ${r} 0 0 1 ${20+r} 20"/>`).join('')}</g>
  <use href="#w" transform="translate(-20 -10)"/><use href="#w" transform="translate(20 -10)"/><use href="#w" transform="translate(0 -20)"/><use href="#w" transform="translate(-20 10)"/><use href="#w" transform="translate(20 10)"/></g>
  <g fill="${col}" opacity="0"/></svg>`);
// an abstract crane in flight, facing right
function crane(x,y,s,rot,c,flip){return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${flip?-s:s} ${s})" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 -4C2 -18 -10 -34 -30 -42C-18 -30 -8 -18 0 -4Z" fill="${c.sheet}" fill-opacity=".9" stroke="${c.ink}" stroke-width=".7" opacity=".7"/>
  <path d="M0 0C10 -4 22 -4 32 0C22 4 10 4 0 0Z" fill="${c.sheet}" stroke="${c.ink}" stroke-width=".8"/>
  <path d="M32 0C42 -2 50 -6 58 -6" fill="none" stroke="${c.ink}" stroke-width="1.6"/><path d="M58 -6L67 -4.6" stroke="${c.ink}" stroke-width=".9"/><circle cx="58.2" cy="-7.2" r="1.6" fill="${c.accent}"/>
  <path d="M2 1L-26 5M2 2L-25 7" stroke="${c.ink}" stroke-width=".7"/>
  <path d="M14 -2C18 -22 8 -42 -14 -56C-2 -40 2 -22 6 -3Z" fill="${c.sheet}" stroke="${c.ink}" stroke-width=".8"/>
  <path d="M-14 -56C-6 -50 -1 -44 2 -36L-4 -40Z" fill="${c.ink}"/>${[0,1,2,3].map(i=>`<path d="M${-12+i*3} ${-54+i*5}l-6 -3" stroke="${c.ink}" stroke-width=".8"/>`).join('')}
  <path d="M-30 -42C-24 -38 -20 -34 -18 -30L-24 -32Z" fill="${c.ink}" opacity=".7"/></g>`}
// kamon-style crest: double ring, three wave-crane wings in rotation, initials at the heart
function crest(o,c,cls=''){const [a,b]=K.initials(o),id=`wc${++U}`;
  const wing='M0 -40C10 -34 16 -24 14 -12C8 -18 2 -20 -6 -20C2 -26 4 -32 0 -40Z';
  return `<svg class="${cls}" viewBox="-50 -50 100 100" ${NS}><defs><filter id="${id}" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -1.6 1.25" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter></defs>
   <g filter="url(#${id})" fill="${c.accent}"><circle r="47" fill="none" stroke="${c.accent}" stroke-width="3.2"/><circle r="42.5" fill="none" stroke="${c.accent}" stroke-width="1"/>
   ${[0,120,240].map(r=>`<path d="${wing}" transform="rotate(${r})"/><path d="M0 -36C6 -32 9 -26 9 -18" transform="rotate(${r})" fill="none" stroke="${c.paper}" stroke-width=".8"/>`).join('')}
   <circle r="17" fill="${c.accent}"/><circle r="14.5" fill="none" stroke="${c.paper}" stroke-width=".7"/></g>
   <text x="0" y="5.5" text-anchor="middle" font-family="Shippori Mincho, serif" font-size="15" fill="${c.paper}" letter-spacing=".5">${esc(a)}${esc(b)}</text></svg>`}
function shojiArt(c,side){// the painting on one panel; each panel shows its half of a 400x760 picture
  const id=`ws${++U}`;
  return `<svg class="ws-art" viewBox="${side==='l'?0:200} 0 200 760" preserveAspectRatio="xMidYMid slice" ${NS}><defs>
   <radialGradient id="${id}s" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="${c.sunL}"/><stop offset=".8" stop-color="${c.accent}"/><stop offset="1" stop-color="${c.accent}" stop-opacity=".85"/></radialGradient>
   <linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".25" stop-color="#fff"/></linearGradient>
   <mask id="${id}m"><rect x="0" y="440" width="400" height="230" fill="url(#${id}f)"/></mask>
   <filter id="${id}b"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="3" seed="5"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .9 .35" result="m"/><feComposite in="SourceGraphic" in2="m" operator="arithmetic" k1="1"/></filter></defs>
   <circle cx="104" cy="474" r="56" fill="url(#${id}s)" filter="url(#${id}b)"/>
   ${crane(250,250,1.0,-10,c)}${crane(300,196,.66,-16,c)}${crane(238,180,.5,-6,c)}${crane(70,370,.42,-4,c)}
  </svg>`}
const pal=(c)=>({...c,paper:c.paper||c.sheet,sunL:c.sunL||'#e8634f',wave:c.wave||'#24386b'});
FAMILY({key:'washi',name:'Washi',meaning:'Japanese paper',
  blurb:'Two shoji panels of fibrous washi painted with a red sun, seigaiha waves and cranes, sealed with a crest; touch it and they slide apart.',
  fonts:{d:"'Shippori Mincho', 'Cormorant Garamond', serif",s:"'Shippori Mincho', 'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1350,
  page(o,th,L){const [n1,n2]=coverNames(o),c=pal(th.c),en=o.lang==='en';
    return `<section class="page pg-washi" style="--fib:${FIBRE};--sgp:${SEIGAIHA(c.wave)};--paper:${c.paper}"><div class="ws-sheet">
     <p class="ws-vt l reveal d2">${ev(o,L)}</p><p class="ws-vt r reveal d2">${esc(fmtShort(o.date))}</p>
     <svg class="ws-pc" viewBox="0 0 300 120" ${NS}>${crane(150,80,.9,-10,c)}${crane(222,52,.55,-14,c)}</svg>
     ${crest(o,c,'ws-pcrest reveal')}
     <h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <i class="ws-dot reveal d2"></i><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="ws-v reveal d3">${esc(o.venue)}</p>
     <i class="ws-sun"></i><i class="ws-waves"></i></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=pal(th.c),en=o.lang==='en';
    const head=`<div class="ws-head"><p class="ws-k">${ev(o,L)}</p><p class="ws-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="ws-d">${esc(fmtDate(o.date,o.lang))}</p></div>`;
    const vt=`<p class="ws-cvt"><span>${esc(o.venue)}</span><i></i><b>${esc(fmtShort(o.date))}</b></p>`;
    const panel=s=>`<div class="ws-pan ${s}"><i class="ws-glow"></i>${shojiArt(c,s)}<i class="ws-sea"></i><i class="ws-fib"></i><i class="ws-kumi"></i><i class="ws-koshi"></i><i class="ws-hik"></i>${s==='l'?head:vt}</div>`;
    return `<div class="cover cv-washi" style="--fib:${FIBRE};--sgp:${SEIGAIHA(c.wave)};--wood:${c.wood};--woodD:${c.woodD};--paper:${c.paper}">${panel('l')}${panel('r')}

     <${tag} class="ws-seal" ${attr} aria-label="${L.open}">${crest(o,c)}</${tag}>
     <div class="ws-foot">${guest?`<p class="ws-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="ws-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=pal(th.c),[a,b]=K.initials(o);el.style.setProperty('--fib',FIBRE);el.style.setProperty('--sgp',SEIGAIHA(c.wave));
    $$('.sec h2',el).forEach(h=>h.insertAdjacentHTML('afterbegin',`<i class="ws-hanko"><b>${esc(a)}</b><b>${esc(b)}</b></i>`))},
  themes:[
    {k:'merah',n:'Hinomaru',desc:'Red sun, indigo waves, pale cedar',c:{ground:'#efe8da',sheet:'#fbf8f0',ink:'#2a2a2e',accent:'#c0272d',gold:'#a88a50',pagefg:'#2a2a2e',wood:'#b08a5e',woodD:'#7a5634',wave:'#24386b'}},
    {k:'malam',n:'Malam',desc:'Lantern-lit shoji, dark walnut',c:{ground:'#1d1814',sheet:'#f8f1e2',ink:'#262220',accent:'#b8292b',gold:'#c9a35c',pagefg:'#efe6d4',wood:'#4a3222',woodD:'#2a1a10',wave:'#2a3a62',paper:'#f4e4c4'}},
    {k:'nila',n:'Nila',desc:'Indigo dyed, red sun',c:{ground:'#1c2a4a',sheet:'#f7f5ef',ink:'#1e2436',accent:'#bf2f36',gold:'#c4a670',pagefg:'#eef0f4',wood:'#6b5a48',woodD:'#3e3226',wave:'#1f3a7a',paper:'#eceff2'}},
    {k:'hitam',n:'Urushi',desc:'Black lacquer frame',c:{ground:'#121212',sheet:'#f6f2ea',ink:'#1a1a1a',accent:'#b3232b',gold:'#c8a865',pagefg:'#ece6da',wood:'#1c1a19',woodD:'#000000',wave:'#2b2b33'}},
    {k:'matcha',n:'Matcha',desc:'Green tea paper, cedar frame',c:{ground:'#e7ead9',sheet:'#fafaf2',ink:'#262b22',accent:'#b8352b',gold:'#9c8a52',pagefg:'#262b22',wood:'#a3825a',woodD:'#6c5236',wave:'#46603a',paper:'#eef0de'}},
    {k:'emas',n:'Kin',desc:'Gold sun on cream',c:{ground:'#f3ecdc',sheet:'#fdfaf2',ink:'#2d2a24',accent:'#b8862f',gold:'#a8823a',pagefg:'#2d2a24',wood:'#9a7a52',woodD:'#634a2e',wave:'#3a4a6a',sunL:'#f1cf7a'}},
    {k:'sumi',n:'Sumi',desc:'Ink grey with a vermilion sun',c:{ground:'#d9d7d2',sheet:'#f7f6f2',ink:'#232325',accent:'#d0442c',gold:'#8f8a80',pagefg:'#232325',wood:'#5c5650',woodD:'#36322e',wave:'#3a3a40',sunL:'#ec7a5a',paper:'#efeeea'}},
    {k:'senja',n:'Senja',desc:'Plum dusk, rose sun',c:{ground:'#3a2433',sheet:'#fbf5f3',ink:'#2c2228',accent:'#b8355a',gold:'#c9a07a',pagefg:'#f3e6ea',wood:'#6a4a52',woodD:'#3e2a30',wave:'#4a3a6a',sunL:'#e77a92',paper:'#f7e9e8'}},
  ]});
