/* lentera: a pierced brass Moroccan lantern hanging on its chain against a dark tadelakt wall.
   An onion dome with a pierced finial, a crown of tiny arches, six panels with pointed-arch windows of star piercing,
   and a pierced drop below. Cover: tap the lantern and it lights; stars of light spill across the wall, then the scene fades.
   Page: the lantern's star light thrown around the names. Skin: star-pierced brass headings. */
const hx=h=>{h=h.replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const f1=v=>+v.toFixed(1);
let uid=0;

/* holes in a pointed-arch window: a staggered net of eight-point stars with diamonds between */
function winPath(x0,x1,y0,y1){const cx=(x0+x1)/2,w=x1-x0;return `M${x0} ${y1}V${f1(y0+w*.75)}C${x0} ${f1(y0+w*.3)} ${f1(cx-w*.2)} ${f1(y0+w*.1)} ${cx} ${y0}C${f1(cx+w*.2)} ${f1(y0+w*.1)} ${x1} ${f1(y0+w*.3)} ${x1} ${f1(y0+w*.75)}V${y1}Z`}
function holes(x0,x1,y0,y1,step=8.4){let d='';for(let r=0,y=y0+5;y<y1;r++,y+=step*.82){for(let x=x0+(r%2?step/2:0)+3;x<x1;x+=step){d+=K.star(8,2.9,1.45,f1(x),f1(y));d+=`M${f1(x+step/2)} ${f1(y-1.5)}l1.1 1.5-1.1 1.5-1.1-1.5Z`}}return d}
function lantern(c,id){const W=[42,78],S=[[24,42],[78,96]];
  const g=`<linearGradient id="br${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.bDark}"/><stop offset=".28" stop-color="${c.bLight}"/><stop offset=".5" stop-color="${c.gold}"/><stop offset=".78" stop-color="${c.bMid}"/><stop offset="1" stop-color="${c.bDark}"/></linearGradient>
   <linearGradient id="sd${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.bDark}"/><stop offset="1" stop-color="${c.bMid}"/></linearGradient><linearGradient id="sd2${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.bMid}"/><stop offset="1" stop-color="${c.bDark}"/></linearGradient>
   <radialGradient id="in${id}" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="${c.glow}"/><stop offset=".6" stop-color="${mix(c.glow,c.gold,.5)}"/><stop offset="1" stop-color="${mix(c.gold,'#3a1a00',.4)}"/></radialGradient>
   <clipPath id="fw${id}"><path d="${winPath(46,74,116,206)}"/></clipPath><clipPath id="lw${id}"><path d="${winPath(28,40,124,204)}"/></clipPath><clipPath id="rw${id}"><path d="${winPath(80,92,124,204)}"/></clipPath>
   <filter id="gw${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  // pierced holes shared by the dark (unlit) and glowing (lit) layers
  const domeHoles=(()=>{let d='';[[52,3,3],[59,5,3.4],[66,7,3.8],[74,9,4.1]].forEach(([y,n,sp])=>{for(let i=0;i<n;i++){const x=60+(i-(n-1)/2)*sp*1.9;d+=`M${f1(x)} ${y-2.4}C${f1(x+1.6)} ${y-.4} ${f1(x+1.2)} ${y+1.6} ${f1(x)} ${y+2.2}C${f1(x-1.2)} ${y+1.6} ${f1(x-1.6)} ${y-.4} ${f1(x)} ${y-2.4}Z`}});return d})();
  const crown=(()=>{let d='';for(let x=27;x<=91;x+=8)d+=`M${x} 96V92.4a2.4 2.4 0 0 1 4.8 0V96Z`;return d})();
  const dropHoles=(()=>{let d='';[[230,7,5.2],[240,5,4.6],[250,3,4]].forEach(([y,n,sp])=>{for(let i=0;i<n;i++){const x=60+(i-(n-1)/2)*sp*1.6;d+=K.star(8,2.1,1.05,f1(x),y)}});return d})();
  const front=`<g clip-path="url(#fw${id})"><path d="${holes(44,76,116,206)}"/></g>`;
  const sides=`<g clip-path="url(#lw${id})"><g transform="translate(34 0) scale(.5 1) translate(-34 0)"><path d="${holes(20,48,122,206)}"/></g></g><g clip-path="url(#rw${id})"><g transform="translate(86 0) scale(.5 1) translate(-86 0)"><path d="${holes(72,100,122,206)}"/></g></g>`;
  const allHoles=`<path d="${domeHoles}${crown}${dropHoles}"/>${front}${sides}`;
  return `<defs>${g}</defs>
   <circle cx="60" cy="9" r="5.4" fill="none" stroke="url(#br${id})" stroke-width="2.2"/><path d="M60 14.6V22" stroke="${c.gold}" stroke-width="2"/>
   <path d="M60 20C62.6 22 63 26 60 30C57 26 57.4 22 60 20Z" fill="url(#br${id})"/><circle cx="60" cy="33" r="3.4" fill="url(#br${id})"/><path d="M55.6 37H64.4L62.6 40H57.4Z" fill="url(#br${id})"/>
   <path d="M60 40C70 46 86 56 90 70C92 78 92 82 92 84H28C28 82 28 78 30 70C34 56 50 46 60 40Z" fill="url(#br${id})" stroke="${c.bDark}" stroke-width=".6"/>
   <path d="M60 41C64 52 68 66 68 84M60 41C56 52 52 66 52 84M60 41V84M60 42C74 52 82 64 84 84M60 42C46 52 38 64 36 84" fill="none" stroke="${c.bDark}" stroke-width=".45" opacity=".55"/>
   <path d="M24 84H96V88H24Z" fill="url(#br${id})" stroke="${c.bDark}" stroke-width=".5"/><path d="M26 88H94V97H26Z" fill="url(#br${id})" stroke="${c.bDark}" stroke-width=".5"/>
   <path d="M20 97H100L96 104H24Z" fill="url(#br${id})" stroke="${c.bDark}" stroke-width=".5"/>
   <path d="M24 104H42V214H24Z" fill="url(#sd${id})"/><path d="M78 104H96V214H78Z" fill="url(#sd2${id})"/><path d="M42 104H78V214H42Z" fill="url(#br${id})"/>
   <g class="ln-dark" fill="${c.hole}">${allHoles}</g>
   <g class="ln-lit" fill="${c.glowHi}" filter="url(#gw${id})">${allHoles}</g>
   <g fill="none" stroke="${c.bDark}" stroke-width=".6"><path d="${winPath(46,74,116,206)}"/><path d="${winPath(44.4,75.6,113.6,207.6)}" stroke="${c.bLight}" stroke-width=".5"/><path d="${winPath(28,40,124,204)}"/><path d="${winPath(80,92,124,204)}"/></g>
   <path d="M42 104V214M78 104V214" stroke="${c.bLight}" stroke-width="1.2" opacity=".8"/><path d="M42.8 104V214M77.2 104V214" stroke="${c.bDark}" stroke-width=".5"/>
   <path d="M22 214H98V220H22Z" fill="url(#br${id})" stroke="${c.bDark}" stroke-width=".5"/><path d="M24 220H96L90 226H30Z" fill="url(#br${id})" stroke="${c.bDark}" stroke-width=".5"/>
   <path d="M30 226H90C88 238 78 252 60 262C42 252 32 238 30 226Z" fill="url(#br${id})" stroke="${c.bDark}" stroke-width=".6"/>
   <g class="ln-dark2" fill="${c.hole}"><path d="${dropHoles}"/></g><g class="ln-lit" fill="${c.glowHi}" filter="url(#gw${id})"><path d="${dropHoles}"/></g>
   <path d="M60 262V268" stroke="${c.gold}" stroke-width="1.6"/><circle cx="60" cy="272" r="4.2" fill="url(#br${id})"/><path d="M60 276C63 282 62.4 288 60 294C57.6 288 57 282 60 276Z" fill="url(#br${id})"/>
   <path d="M30 84C30 80 31 74 33 70M90 84C90 80 89 74 87 70" fill="none" stroke="${c.bLight}" stroke-width=".6" opacity=".6"/>
   ${[33,87].map(x=>`<circle cx="${x}" cy="100.5" r="1.4" fill="${c.bLight}"/>`).join('')}
   <path d="${Array.from({length:12},(_,i)=>`M${28+i*5.33} 84a2.66 2.66 0 0 0 5.33 0`).join('')}" fill="none" stroke="${c.bDark}" stroke-width=".5"/>
   ${Array.from({length:19},(_,i)=>`<circle cx="${f1(24+i*4)}" cy="217" r=".9" fill="${c.bLight}" stroke="${c.bDark}" stroke-width=".25"/>`).join('')}
   <path d="M42 108H78M42 210H78M24 108H42M78 108H96M24 210H42M78 210H96" stroke="${c.bDark}" stroke-width=".45" opacity=".7"/>
   <path d="${Array.from({length:10},(_,i)=>`M${f1(30+i*6)} 226l3 4 3-4`).join('')}" fill="none" stroke="${c.bDark}" stroke-width=".5"/>`}
/* the star light thrown on the wall, as a tile */
function lightTile(col,a=1){return `<svg ${NS} width="64" height="64" viewBox="0 0 64 64"><g fill="${col}" opacity="${a}"><path d="${K.star(8,9,4.6,32,32)}"/><path d="${K.star(8,4.4,2.2,0,0)}${K.star(8,4.4,2.2,64,0)}${K.star(8,4.4,2.2,0,64)}${K.star(8,4.4,2.2,64,64)}"/>
  ${[[32,9],[32,55],[9,32],[55,32]].map(([x,y])=>`<path d="M${x} ${y-2.6}l2 2.6-2 2.6-2-2.6Z"/>`).join('')}${[[16,16],[48,16],[16,48],[48,48]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6"/>`).join('')}</g></svg>`}
function cols(th){const c={...th.c};c.bLight=mix(c.gold,'#ffffff',.5);c.bMid=mix(c.gold,'#000000',.2);c.bDark=mix(c.gold,'#000000',.55);
  c.hole=mix(c.ground,'#000000',.35);c.glowHi=mix(c.glow,'#ffffff',.55);c.glass=c.glass||mix(c.gold,'#3a1a08',.55);return c}
function chain(c){return K.uri(`<svg ${NS} width="8" height="14" viewBox="0 0 8 14"><rect x="2" y=".8" width="4" height="7.4" rx="2" fill="none" stroke="${c.gold}" stroke-width="1.1"/><path d="M4 8.2V14" stroke="${mix(c.gold,'#000000',.35)}" stroke-width="1.3"/></svg>`)}

FAMILY({key:'lentera',name:'Lentera',meaning:'Moroccan lantern',
  blurb:'A pierced brass lantern hangs on its chain against a dark plaster wall; touch it and it lights, throwing stars of light across the wall.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1650,
  page(o,th,L){const [n1,n2]=coverNames(o),c=cols(th),id='p'+(++uid);
    return `<section class="page pg-lentera${c.light?' ln-light':''}" style="--ln-light:${K.uri(lightTile(c.glow,.95))};--ln-glow:${c.glow};--ln-ch:${chain(c)}">
     <div class="ln-wall"></div><div class="ln-stars"></div><div class="ln-stars s2"></div>
     <div class="ln-mini reveal"><i class="ln-chain"></i><svg viewBox="0 0 120 300">${lantern(c,id)}</svg><i class="ln-halo"></i></div>
     <div class="ln-ptxt"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
      <div class="ln-rule reveal d2"><i></i><svg viewBox="-6 -6 12 12"><path d="${K.star(8,5.6,2.8)}" fill="${c.gold}"/></svg><i></i></div>
      <p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=cols(th),id='c'+(++uid);
    return `<div class="cover cv-lentera${c.light?' ln-light':''}" style="--ln-st:${K.uri(`<svg ${NS} viewBox="-10 -10 20 20"><path d="${K.star(8,9.4,4.6)}" fill="none" stroke="${c.gold}" stroke-width=".9"/><circle r="1.6" fill="${c.gold}"/></svg>`)};--ln-light:${K.uri(lightTile(c.glow,.95))};--ln-glow:${c.glow};--ln-ch:${chain(c)}"><div class="ln-wall"></div>
     <div class="ln-stars"></div><div class="ln-stars s2"></div><i class="ln-halo big"></i>
     <i class="ln-frame"><b class="tl"></b><b class="tr"></b><b class="bl"></b><b class="br"></b></i>
     <span class="ln-bg l"><i class="ln-chain"></i><svg viewBox="0 0 120 300">${lantern(c,id+'l')}</svg></span><span class="ln-bg r"><i class="ln-chain"></i><svg viewBox="0 0 120 300">${lantern(c,id+'r')}</svg></span>
     <${tag} class="ln-lamp" ${attr} aria-label="${L.open}"><i class="ln-chain"></i><svg viewBox="0 0 120 300">${lantern(c,id)}</svg></${tag}>
     <div class="ln-txt"><p class="ln-k">${ev(o,L)}</p><p class="ln-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="ln-d">${esc(fmtDate(o.date,o.lang))}</p>
      ${guest?`<p class="ln-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="ln-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=cols(th);
    const band=`<svg ${NS} width="40" height="18" viewBox="0 0 40 18"><defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.bLight}"/><stop offset=".5" stop-color="${c.gold}"/><stop offset="1" stop-color="${c.bDark}"/></linearGradient></defs><rect width="40" height="18" fill="url(#b)"/><path fill="${c.glowHi}" d="${K.star(8,5.4,2.7,10,9)}${K.star(8,5.4,2.7,30,9)}M20 6.4l2 2.6-2 2.6-2-2.6ZM0 6.4l2 2.6-2 2.6-2-2.6ZM40 6.4l2 2.6-2 2.6-2-2.6Z"/><path d="M0 1H40M0 17H40" stroke="${c.bDark}" stroke-width=".8"/><path d="M0 2.6H40M0 15.4H40" stroke="${c.bLight}" stroke-width=".4"/></svg>`;
    el.style.setProperty('--ln-band',K.uri(band));el.style.setProperty('--ln-glow',c.glow);el.style.setProperty('--ln-light',K.uri(lightTile(c.glow,.95)));
    el.style.setProperty('--ln-star',K.uri(`<svg ${NS} viewBox="-10 -10 20 20"><path d="${K.star(8,9.4,4.8)}" fill="none" stroke="${c.gold}" stroke-width="1"/><path d="${K.star(8,5,2.6)}" fill="${c.gold}"/></svg>`));
    $$('.sec h2',el).forEach(h=>{h.classList.add('ln-h2')});
    $$('.sheet > .sec',el).forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="ln-band"></i>'))},
  themes:[
    {k:'malam',n:'Malam',desc:'Brass lantern on a charcoal wall',c:{ground:'#17181b',sheet:'#f6efe0',ink:'#2a241c',accent:'#8a5a1c',gold:'#c99a46',glow:'#ffd98a',pagefg:'#f1e4c8'}},
    {k:'nila',n:'Nila',desc:'Indigo wall, warm light',c:{ground:'#121a33',sheet:'#f5efe3',ink:'#1f2235',accent:'#2c3a78',gold:'#cfa24c',glow:'#ffd690',pagefg:'#eee6d4'}},
    {k:'zamrud',n:'Zamrud',desc:'Deep teal tadelakt',c:{ground:'#0f2a2a',sheet:'#f3efe2',ink:'#1d2826',accent:'#1d5c55',gold:'#c9a04e',glow:'#ffdc94',glass:'#2a5a50',pagefg:'#ecebdc'}},
    {k:'marun',n:'Marun',desc:'Burgundy wall, ruby glass',c:{ground:'#2c1115',sheet:'#f7eee4',ink:'#2e1b1d',accent:'#7a1f2b',gold:'#cf9f52',glow:'#ffc98a',glass:'#6a1a22',pagefg:'#f3e2d4'}},
    {k:'terakota',n:'Terakota',desc:'Marrakech red plaster',c:{ground:'#6b2f1f',sheet:'#fbf1e4',ink:'#33201a',accent:'#9a3e22',gold:'#d8aa58',glow:'#ffe2a4',pagefg:'#fbeedd'}},
    {k:'ungu',n:'Ungu',desc:'Plum wall, amethyst glass',c:{ground:'#22172e',sheet:'#f5eff4',ink:'#2a2032',accent:'#5a3474',gold:'#c8a058',glow:'#ffd9a0',glass:'#4a2a62',pagefg:'#efe6f0'}},
    {k:'perak',n:'Perak',desc:'Nickel-silver lantern on slate',c:{ground:'#1a1f25',sheet:'#f2f3f3',ink:'#20252b',accent:'#3a4a5c',gold:'#b8bec6',glow:'#eaf2ff',glass:'#30404e',pagefg:'#e9edf1'}},
    {k:'pasir',n:'Pasir',desc:'Sand plaster in the evening',c:{ground:'#bfa47c',sheet:'#fbf5ea',ink:'#2e2216',accent:'#7a4a1c',gold:'#9a6a2a',glow:'#fff0c0',pagefg:'#2b1f12',light:1}},
  ]});
