/* pelamin: the wedding dais. Tiered swags with gold trim, a carved backdrop panel, two throne chairs as
   gold silhouettes, flower mounds on the steps. Cover: a sheer voile hangs in front; touching the tassel
   gathers it upward. Page: the dais with the names carved on the backdrop. Skin: swag valances on each card. */
let uid=0;
const f1=v=>(+v).toFixed(1);
const PANEL='M105 560V262C105 240 128 232 150 222C168 214 184 198 195 176C206 198 222 214 240 222C262 232 285 240 285 262V560Z';
const scl=(k,cx=195,cy=380)=>`transform="translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})"`;
function chair(x,y,s,flip,id){return `<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})">
  <path d="M-23 0V-58C-23 -80 -12 -92 0 -97C12 -92 23 -80 23 -58V0Z" fill="url(#plg${id})"/>
  <path d="M-10 -94C-9 -104 -2 -106 0 -116C2 -106 9 -104 10 -94Z" fill="url(#plg${id})"/><circle cx="0" cy="-119" r="3" fill="url(#plg${id})"/>
  <path d="M-23 -70c-8-2-12-10-8-16s12-4 10 2" class="pelamin-gl"/><path d="M23 -70c8-2 12-10 8-16s-12-4-10 2" class="pelamin-gl"/>
  <path d="M-16 -5V-57C-16 -73 -8 -83 0 -87C8 -83 16 -73 16 -57V-5Z" class="pelamin-uph"/>
  <path d="M-16 -5V-57C-16 -73 -8 -83 0 -87C8 -83 16 -73 16 -57V-5Z" class="pelamin-ul"/>
  ${[[-8,-62],[8,-62],[0,-48],[-8,-34],[8,-34],[0,-20],[0,-74]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="1.1" class="pelamin-tuft"/>`).join('')}
  <path d="M-23 -34C-36 -36 -40 -22 -33 -12C-29 -6 -32 0 -30 4M23 -34C36 -36 40 -22 33 -12C29 -6 32 0 30 4" class="pelamin-arm"/>
  <path d="M-31 0H31C31 8 26 12 0 12C-26 12 -31 8 -31 0Z" class="pelamin-uph"/>
  <path d="M-28 12H28V17H-28Z" fill="url(#plg${id})"/><path d="M-24 17C-27 26 -21 32 -27 41M24 17C27 26 21 32 27 41M-8 17V24M8 17V24" class="pelamin-arm"/></g>`}
function swags(y,depth,w,cls,phase,tas){let d='',trim='',folds='',t='';const n=Math.ceil(390/w)+2;
  for(let i=-1;i<n;i++){const x=i*w+phase;d+=`M${x} ${y}Q${x+w/2} ${y+depth*2} ${x+w} ${y}Z`;trim+=`M${x} ${y}Q${x+w/2} ${y+depth*2} ${x+w} ${y}`;
    for(const k of [.35,.62,.82])folds+=`M${f1(x+w*.08)} ${y+2}Q${x+w/2} ${f1(y+depth*2*k)} ${f1(x+w*.92)} ${y+2}`;
    if(tas)t+=`<g transform="translate(${x} ${y})" class="pelamin-tas"><circle r="3.4"/><path d="M-2.5 3h5l1.5 14h-8z"/><path d="M-3.4 17.5h6.8" class="pelamin-tl"/></g>`}
  return `<path d="${d}" class="${cls}"/><path d="${folds}" class="pelamin-fold"/><path d="${trim}" class="pelamin-trim"/><path d="${trim}" class="pelamin-trim2" transform="translate(0 -3)"/>${t}`}
function drape(side,id){const m=side<0?'':'transform="translate(390 0) scale(-1 1)"';
  return `<g ${m}><path d="M0 0H86C76 160 58 330 40 418C60 470 74 620 70 760H0Z" fill="url(#plv${id})"/>
   <path d="M18 0C16 150 14 320 12 420M38 0C34 160 28 330 24 418C30 500 34 640 30 760M60 0C54 160 44 320 32 418C44 490 52 630 50 760" class="pelamin-fold"/>
   <path d="M86 0C76 160 58 330 40 418C60 470 74 620 70 760" class="pelamin-trim"/><path d="M82 0C72 160 54 330 36 418C56 470 70 620 66 760" class="pelamin-trim2"/>
   <path d="M10 412Q36 404 50 416Q36 428 10 422" class="pelamin-rope3"/><path d="M10 412Q36 404 50 416Q36 428 10 422" class="pelamin-rope4"/><g transform="translate(46 418)" class="pelamin-tas"><circle r="4.4"/><path d="M-3 4h6l3.5 28h-13z"/><path d="M-3.5 12h7M-4.5 20h9M-5.4 28h10.8" class="pelamin-tl"/><path d="M-6.5 32.5h13" class="pelamin-tl"/></g></g>`}
function bloom(cx,cy,R,n,seed){const r=rng(seed);let s='';for(let i=0;i<n;i++){const a=r()*Math.PI,d=Math.sqrt(r())*R,x=cx+Math.cos(a)*d*1.3*(r()<.5?-1:1),y=cy-Math.sin(a)*d*.9,k=2.6+r()*1.6;
    s+=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(r()*72)})">${[0,72,144,216,288].map(t=>`<ellipse cx="0" cy="${f1(-k*.55)}" rx="${f1(k*.42)}" ry="${f1(k*.6)}" transform="rotate(${t})" class="${i%3?'pelamin-fl':'pelamin-fl2'}"/>`).join('')}<circle r="${f1(k*.28)}" class="pelamin-flc"/></g>`}return s}
function scene(id){const lat=`<pattern id="pll${id}" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M6 0L12 6 6 12 0 6Z" fill="none" class="pelamin-latp"/><circle cx="6" cy="6" r=".8" class="pelamin-latd"/></pattern>`;
  const awan=`<pattern id="pla${id}" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M3 15c0-7 8-9 11-4s-2 8-5 5 1-5 3-3M14 4c4 0 6 3 4 6" fill="none" class="pelamin-awp"/></pattern>`;
  const dam=`<pattern id="pld${id}" width="44" height="52" patternUnits="userSpaceOnUse"><path d="M22 6c6 8 6 14 0 20-6-6-6-12 0-20zM22 46c6-8 6-14 0-20-6 6-6 12 0 20zM0 26c8-4 12-4 16 0-4 4-8 4-16 0zM44 26c-8-4-12-4-16 0 4 4 8 4 16 0z" class="pelamin-dm"/></pattern>`;
  return `<svg class="pelamin-svg" viewBox="0 0 390 760" preserveAspectRatio="xMidYMax slice"><defs>${lat}${awan}${dam}
   <linearGradient id="plg${id}" x1="0" x2="1" y1="0" y2="1"><stop offset="0" style="stop-color:color-mix(in srgb,var(--gold) 45%,#fff)"/><stop offset=".45" style="stop-color:var(--gold)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--gold) 55%,#000)"/></linearGradient>
   <linearGradient id="plv${id}" x1="0" x2="1"><stop offset="0" style="stop-color:color-mix(in srgb,var(--accent) 60%,#000)"/><stop offset=".35" style="stop-color:var(--accent)"/><stop offset=".6" style="stop-color:color-mix(in srgb,var(--accent) 82%,#fff)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--accent) 70%,#000)"/></linearGradient><radialGradient id="pls${id}" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
   <rect width="390" height="760" class="pelamin-wall"/><rect width="390" height="760" fill="url(#pld${id})"/><rect width="390" height="760" fill="url(#pls${id})"/>
   ${[72,285].map(x=>`<path d="M${x} 560V346C${x} 334 ${x+8} 326 ${x+16.5} 322C${x+25} 326 ${x+33} 334 ${x+33} 346V560Z" class="pelamin-wing"/><path d="M${x+5} 556V348C${x+5} 338 ${x+11} 332 ${x+16.5} 329C${x+22} 332 ${x+28} 338 ${x+28} 348V556Z" fill="url(#pll${id})" class="pelamin-wl"/>`).join('')}
   <path d="${PANEL}" class="pelamin-panel b"/><path d="${PANEL}" fill="url(#pla${id})"/>
   <path d="${PANEL}" ${scl(.9)} class="pelamin-panel"/><path d="${PANEL}" ${scl(.9)} fill="url(#pll${id})" opacity=".55"/>
   <path d="${PANEL}" class="pelamin-edge" stroke-width="1.4"/><path d="${PANEL}" ${scl(.955)} class="pelamin-edge" stroke-width=".6"/><path d="${PANEL}" ${scl(.9)} class="pelamin-edge" stroke-width=".9"/><path d="${PANEL}" ${scl(.875)} class="pelamin-edge" stroke-width=".5" stroke-dasharray="1 2.4"/>
   <path d="M195 176c-4-10-2-18 0-26 2 8 4 16 0 26zM195 150c-3-4-3-9 0-12 3 3 3 8 0 12z" fill="url(#plg${id})"/><path d="M181 186c-10-4-14-14-8-20 4 6 8 10 8 20zM209 186c10-4 14-14 8-20-4 6-8 10-8 20z" fill="url(#plg${id})"/>
   <g class="pelamin-chairs">${chair(163,531,.72,false,id)}${chair(227,531,.72,true,id)}</g>
   <path d="M60 560H330V584H60Z" class="pelamin-step"/><path d="M36 584H354V610H36Z" class="pelamin-step b"/><path d="M10 610H380V638H10Z" class="pelamin-step c"/>
   <path d="M60 563H330M36 587H354M10 613H380" class="pelamin-trim"/><path d="M60 581H330M36 607H354M10 635H380" class="pelamin-trim2"/>
   <path d="M155 560H235L262 638H128Z" class="pelamin-carpet"/><path d="M160 560L134 638M230 560L256 638" class="pelamin-trim2"/>
   <path d="M128 638H262L300 760H90Z" class="pelamin-carpet f"/>
   <rect y="638" width="390" height="122" class="pelamin-floor"/><path d="M128 638H262L300 760H90Z" class="pelamin-carpet f"/><path d="M134 638L98 760M256 638L292 760" class="pelamin-trim2"/>
   ${[[56,556],[334,556]].map(([x,y])=>`<path d="M${x-10} ${y+4}h20l-4 26h-12z" fill="url(#plg${id})"/><path d="M${x-14} ${y+4}h28" class="pelamin-trim"/>${bloom(x,y,20,26,x)}`).join('')}
   ${bloom(118,584,24,30,7)}${bloom(272,584,24,30,9)}${bloom(80,612,22,24,3)}${bloom(310,612,22,24,5)}
   ${drape(-1,id)}${drape(1,id)}
   ${swags(0,62,130,'pelamin-sw3',-40,false)}${swags(0,50,112,'pelamin-sw2',22,false)}${swags(0,40,112,'pelamin-sw1',-34,true)}
  </svg>`}
FAMILY({key:'pelamin',name:'Pelamin',meaning:'Wedding dais',
  blurb:'A pelamin of tiered swags, a carved backdrop and two gold throne chairs behind a sheer voile that gathers upward when touched.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-pelamin"><div class="pelamin-stage">${scene(++uid)}
      <div class="pelamin-txt reveal"><p class="pelamin-k">${ev(o,L)}</p><p class="pelamin-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="pelamin-d">${esc(fmtShort(o.date))}</p></div>
      <div class="pelamin-low reveal d2"><p class="pelamin-date">${esc(fmtDate(o.date,o.lang))}</p><p class="pelamin-ven">${esc(o.venue)} · ${en?'from':'jam'} ${esc(fmtTime(o.start,o.lang))}</p></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-pelamin"><div class="pelamin-stage">${scene(++uid)}
      <div class="pelamin-sheer"><i class="pelamin-hem"></i></div>
      <div class="pelamin-txt"><p class="pelamin-k">${ev(o,L)}</p><p class="pelamin-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="pelamin-d">${esc(fmtShort(o.date))}</p></div>
      <${tag} class="pelamin-cord" ${attr} aria-label="${L.open}"><svg viewBox="0 0 40 120"><path d="M20 0V54" class="pelamin-rope"/><path d="M20 0V54" class="pelamin-rope2"/><circle cx="20" cy="60" r="7" class="pelamin-knot"/><path d="M14 66h12l5 44H9z" class="pelamin-knot"/><path d="M12 76h16M11 84h18M10.5 92h19M10 100h20" class="pelamin-tl"/><path d="M9 110h22" class="pelamin-tl"/></svg></${tag}>
      <div class="pelamin-foot">${guest?`<p class="pelamin-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="pelamin-hint">${en?'Pull the tassel to raise the voile':'Tarik jumbai untuk menyingkap tirai'}</p></div></div></div>`},
  skin(el,o,th){K.cards(el);const c=th.c;
    const sw=svgUriSq(`<svg ${NS} width="64" height="34" viewBox="0 0 64 34"><path d="M0 0Q32 34 64 0Z" fill="${c.accent}"/><path d="M5 2Q32 22 59 2M9 2Q32 13 55 2" fill="none" stroke="#000" stroke-opacity=".18" stroke-width=".8"/><path d="M0 0Q32 34 64 0" fill="none" stroke="${c.gold}" stroke-width="1.6"/><path d="M0 -2.6Q32 31.4 64 -2.6" fill="none" stroke="${c.gold}" stroke-width=".6"/><circle cx="0" cy="2" r="2.6" fill="${c.gold}"/><circle cx="64" cy="2" r="2.6" fill="${c.gold}"/><path d="M-1.8 4h3.6l1 9h-5.6zM62.2 4h3.6l1 9h-5.6z" fill="${c.gold}"/></svg>`);
    el.style.setProperty('--pl-sw',sw)},
  themes:[
    {k:'merah',n:'Merah',desc:'Crimson swags, ivory panel, gold',c:{ground:'#3a0e14',sheet:'#fbf3e2',ink:'#2d2018',accent:'#8e1b28',gold:'#cfa24e',pagefg:'#f6e6c6'}},
    {k:'emas',n:'Emas',desc:'Royal gold on cream',c:{ground:'#5a3f12',sheet:'#fff8e8',ink:'#3a2a12',accent:'#b38328',gold:'#d8b25a',pagefg:'#fbefd2'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald velvet swags',c:{ground:'#0e2a20',sheet:'#f8f3e3',ink:'#1e2a22',accent:'#1c5e45',gold:'#d2aa55',pagefg:'#efe7cc'}},
    {k:'biru',n:'Biru',desc:'Sapphire and silver-gold',c:{ground:'#101b38',sheet:'#f6f3ea',ink:'#1b2236',accent:'#24438a',gold:'#cdb06a',pagefg:'#e9e6dc'}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose on blush',c:{ground:'#d9b7b4',sheet:'#fff8f4',ink:'#3a2729',accent:'#b0566a',gold:'#b8924e',pagefg:'#3a2729'}},
    {k:'sage',n:'Sage',desc:'Sage swags, ivory and gold',c:{ground:'#b8c2ad',sheet:'#fbfaf2',ink:'#2c3327',accent:'#6e7f5c',gold:'#b09454',pagefg:'#2a3126'}},
    {k:'ungu',n:'Ungu',desc:'Amethyst drapes and gold',c:{ground:'#2a1435',sheet:'#fbf5fa',ink:'#2e2232',accent:'#6c2f7d',gold:'#d1a95c',pagefg:'#f1e5f2'}},
    {k:'krim',n:'Krim',desc:'Champagne drapes on cream, antique gold',c:{ground:'#d8cbb3',sheet:'#fffaf1',ink:'#3a3027',accent:'#9a7a44',gold:'#c3a160',pagefg:'#3a3027'}},
  ]});
