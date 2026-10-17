/* azulejo: a wall of Portuguese blue-and-white pattern tiles (padrao, four-tile repeat) with a baroque framed
   cartouche panel in the middle, and a sprig of real lemons with glossy leaves and blossom laid across it, casting soft shadows.
   Cover: tap the panel and a band of daylight crosses the glazed tiles as the wall eases forward, then fades.
   Page: a frieze-tile border with lemon sprigs at the corners. Skin: white tile cards with corner ornaments and a lemon on each heading. */
const hx=h=>{h=h.replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const f1=v=>+v.toFixed(1);
let uid=0;
const svg=(w,h,body)=>`<svg ${NS} width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

/* ---- the pattern tile, 64 x 64; quarter rosettes at the corners meet across four tiles ---- */
function tileBody(c){const I=c.tink,W=c.tink2,B=c.tbg;
  const ros=(x,y)=>`<g transform="translate(${x} ${y})"><circle r="17" fill="${W}"/>${Array.from({length:8},(_,i)=>`<path d="M0-4C-4-6-5-12 0-16C5-12 4-6 0-4Z" transform="rotate(${i*45+22.5})" fill="${B}" stroke="${I}" stroke-width=".7"/>`).join('')}<circle r="17" fill="none" stroke="${I}" stroke-width="1.2"/><circle r="5" fill="${I}"/><circle r="2" fill="${B}"/></g>`;
  const arm=a=>`<g transform="rotate(${a} 32 32)"><path d="M32 22C28 16 22 14 17 16M32 22C36 16 42 14 47 16" fill="none" stroke="${I}" stroke-width="1.1"/><path d="M32 8C29 4 30 1 32 0C34 1 35 4 32 8Z" fill="${I}"/><circle cx="24" cy="9" r="1.2" fill="${I}"/><circle cx="40" cy="9" r="1.2" fill="${I}"/></g>`;
  return `<rect width="64" height="64" fill="${B}"/>${ros(0,0)}${ros(64,0)}${ros(0,64)}${ros(64,64)}
   <path d="M32 18L46 32 32 46 18 32Z" fill="${W}" stroke="${I}" stroke-width="1"/>${[0,90,180,270].map(arm).join('')}
   <g transform="translate(32 32)">${[0,90,180,270].map(a=>`<path d="M0-1.5C-3-3-4-8 0-11C4-8 3-3 0-1.5Z" transform="rotate(${a})" fill="${I}"/>`).join('')}${[45,135,225,315].map(a=>`<path d="M0-3C-1.4-4-1.6-6 0-7.4C1.6-6 1.4-4 0-3Z" transform="rotate(${a})" fill="${W}" stroke="${I}" stroke-width=".5"/>`).join('')}<circle r="2" fill="${B}" stroke="${I}" stroke-width=".7"/></g>
   <path d="M.4 .4H63.6V63.6H.4Z" fill="none" stroke="${c.joint}" stroke-width=".8"/><path d="M1.4 1.4H62.6" stroke="#ffffff" stroke-width=".8" opacity=".6"/>`}
const tileUri=c=>K.uri(svg(64,64,tileBody(c)));
/* frieze tile for borders, 32 x 16: white acanthus C-scrolls on the blue band */
function friezeBody(c){const I=c.tink,B=c.tbg;return `<rect width="32" height="16" fill="${I}"/><path d="M0 1.2H32M0 14.8H32" stroke="${B}" stroke-width=".8"/>
  <path d="M2 11C2 6 6 4 9 6S10 11 7 11 5 8 7 7.4M30 5C30 10 26 12 23 10S22 5 25 5 27 8 25 8.6" fill="none" stroke="${B}" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M9 6C12 3 14 3 16 8C18 13 20 13 23 10" fill="none" stroke="${B}" stroke-width=".9"/><path d="M16 8C15 5 16 3.4 18 3C18 5 17.4 6.6 16 8ZM16 8C17 11 16 12.6 14 13C14 11 14.6 9.4 16 8Z" fill="${B}"/>`}
const friezeH=c=>K.uri(svg(32,16,friezeBody(c))),friezeV=c=>K.uri(svg(16,32,`<g transform="translate(16 0) rotate(90)">${friezeBody(c)}</g>`));

/* ---- lemons ---- */
function lemonDefs(c,id){return `<radialGradient id="lm${id}" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#fff6b8"/><stop offset=".35" stop-color="${c.lemon}"/><stop offset=".85" stop-color="${mix(c.lemon,'#b8700a',.45)}"/><stop offset="1" stop-color="${mix(c.lemon,'#7a4a08',.55)}"/></radialGradient>
  <linearGradient id="lf${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${mix(c.leaf,'#d8f0a0',.35)}"/><stop offset=".5" stop-color="${c.leaf}"/><stop offset="1" stop-color="${mix(c.leaf,'#0c2410',.45)}"/></linearGradient>
  <filter id="cs${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter>`}
function lemon(id,x,y,s,a){const R=rng(Math.round(x*7+y*3));let dots='';for(let i=0;i<14;i++){const px=(R()-.5)*30,py=(R()-.5)*18;if(px*px/225+py*py/81<.8)dots+=`<circle cx="${f1(px)}" cy="${f1(py)}" r=".55" fill="#9a6a08" opacity=".22"/>`}
  return `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M-17 0C-17-8-9-11.5 0-11.5S16-9 18-3C20-3 22-1 22 0S20 3 18 3C16 9 8 11.5 0 11.5S-17 8-17 0Z" fill="url(#lm${id})" stroke="${mix('#c08a10','#6a4206',.3)}" stroke-width=".5"/>
   <path d="M-17 0C-18.6-1-19.4-.2-19.4 0S-18.6 1-17 0" fill="${mix('#a8c040','#6a7a20',.3)}"/>${dots}<ellipse cx="-5" cy="-5.6" rx="6" ry="2.2" fill="#fffbe0" opacity=".6" transform="rotate(-12 -5 -5.6)"/></g>`}
function leaf(id,x,y,s,a,c){return `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0 0C6-7 18-8 30 0C18 8 6 7 0 0Z" fill="url(#lf${id})" stroke="${mix(c.leaf,'#000000',.4)}" stroke-width=".45"/><path d="M0 0C10 -.6 20-.4 29 0" fill="none" stroke="${mix(c.leaf,'#ffffff',.45)}" stroke-width=".6"/>
  ${[6,11,16,21].map(t=>`<path d="M${t} -.2Q${t+3} -3.4 ${t+5} -4.4M${t} .2Q${t+3} 3.4 ${t+5} 4.4" fill="none" stroke="${mix(c.leaf,'#ffffff',.3)}" stroke-width=".35" opacity=".8"/>`).join('')}<path d="M3-2.4C10-6 20-6 27-2" fill="none" stroke="#ffffff" stroke-width=".7" opacity=".35"/></g>`}
function blossom(x,y,s){return `<g transform="translate(${x} ${y}) scale(${s})">${[0,72,144,216,288].map(a=>`<path d="M0 0C-3-2-3.6-6 0-8.4C3.6-6 3-2 0 0Z" transform="rotate(${a})" fill="#fffdf6" stroke="#d9c6d6" stroke-width=".45"/>`).join('')}${Array.from({length:10},(_,i)=>{const a=i/10*Math.PI*2;return `<path d="M0 0L${f1(Math.cos(a)*3.4)} ${f1(Math.sin(a)*3.4)}" stroke="#d8b02a" stroke-width=".35"/><circle cx="${f1(Math.cos(a)*3.6)}" cy="${f1(Math.sin(a)*3.6)}" r=".5" fill="#e0a818"/>`}).join('')}</g>`}
/* a sprig: woody stem, leaves, lemons, blossom; drawn twice, once as a blurred cast shadow */
function sprig(c,id,kind){const L=(x,y,s,a)=>leaf(id,x,y,s,a,c);
  const body=kind?`<path d="M300 10C250 30 210 40 170 70C150 84 136 100 126 118" fill="none" stroke="${c.wood}" stroke-width="3" stroke-linecap="round"/><path d="M210 44C214 60 212 74 204 88" fill="none" stroke="${c.wood}" stroke-width="1.6"/>
     ${L(250,26,1.1,160)}${L(232,34,1,200)}${L(186,58,1.05,150)}${L(170,72,1,210)}${L(146,92,1,140)}${L(140,98,.9,240)}${L(272,18,.9,190)}
     ${lemon(id,204,104,1.15,80)}${lemon(id,126,130,1,100)}${blossom(160,64,1)}${blossom(282,26,.8)}`
    :`<path d="M-10 20C30 30 70 40 110 70C140 92 170 100 210 104C240 106 262 98 280 86" fill="none" stroke="${c.wood}" stroke-width="3.2" stroke-linecap="round"/><path d="M110 70C116 90 116 104 112 118M210 104C214 118 212 130 206 140" fill="none" stroke="${c.wood}" stroke-width="1.8"/>
     ${L(20,26,1.1,-20)}${L(40,30,1.05,30)}${L(70,46,1.15,-30)}${L(88,56,1,40)}${L(130,84,1.1,-10)}${L(150,92,1,50)}${L(176,100,1.1,-20)}${L(236,104,1.05,20)}${L(258,96,1,-40)}${L(196,104,.9,70)}${L(60,40,.9,80)}
     ${lemon(id,112,140,1.3,95)}${lemon(id,206,160,1.25,80)}${lemon(id,158,126,1.05,60)}${blossom(84,52,1.05)}${blossom(276,86,.9)}${blossom(250,112,.75)}`;
  return `<g transform="translate(7 10)" opacity=".28" filter="url(#cs${id})">${body.replace(/fill="(?!none)[^"]*"/g,'fill="#0a1830"').replace(/stroke="(?!none)[^"]*"/g,'stroke="#0a1830"')}</g>${body}`}

/* ---- the baroque cartouche frame, 300 x 400 ---- */
function cartouche(c,id){const I=c.tink,B=c.tbg;
  const scroll=(x,y,sx,sy)=>`<g transform="translate(${x} ${y}) scale(${sx} ${sy})" fill="none" stroke="${I}" stroke-linecap="round"><path d="M0 0C10-14 30-18 44-10C54-4 52 8 42 8S32-2 40-2" stroke-width="2.2"/><path d="M6-4C14-12 28-14 38-8" stroke-width=".7"/>
   <path d="M44-10C52-20 50-30 40-34" stroke-width="1.6"/><path d="M40-34C34-36 30-32 32-28" stroke-width="1.2"/><path d="M18-12C16-20 20-26 26-28C24-22 22-16 18-12Z" fill="${I}" stroke="none"/><path d="M28-12C30-18 36-20 40-20C38-16 34-12 28-12Z" fill="${I}" stroke="none"/></g>`;
  return `<defs><pattern id="fh${id}" width="32" height="16" patternUnits="userSpaceOnUse" x="0" y="34">${friezeBody(c)}</pattern><pattern id="fv${id}" width="16" height="32" patternUnits="userSpaceOnUse" x="14" y="0"><g transform="translate(16 0) rotate(90)">${friezeBody(c)}</g></pattern>
    <filter id="sh${id}" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity=".3"/></filter></defs>
   <g filter="url(#sh${id})"><path d="M14 50H120C130 50 134 34 150 26C166 34 170 50 180 50H286V350H180C170 350 166 366 150 374C134 366 130 350 120 350H14Z" fill="${B}"/></g>
   <rect x="14" y="50" width="272" height="16" fill="url(#fh${id})"/><rect x="14" y="334" width="272" height="16" fill="url(#fh${id})"/><rect x="14" y="66" width="16" height="268" fill="url(#fv${id})"/><rect x="270" y="66" width="16" height="268" fill="url(#fv${id})"/>
   <path d="M14 50H286V350H14Z" fill="none" stroke="${I}" stroke-width="1.4"/><path d="M34 70H266V330H34Z" fill="none" stroke="${I}" stroke-width=".9"/><path d="M38 74H262V326H38Z" fill="none" stroke="${I}" stroke-width=".4"/>
   ${scroll(104,50,1,1)}${scroll(196,50,-1,1)}${scroll(104,350,1,-1)}${scroll(196,350,-1,-1)}
   <g transform="translate(150 34)"><path d="M0 -14C-8-14-14-8-14 0H14C14-8 8-14 0-14Z" fill="${c.tink2}" stroke="${I}" stroke-width="1"/>${[-60,-30,0,30,60].map(a=>`<path d="M0 0L0-13" transform="rotate(${a})" stroke="${I}" stroke-width=".7"/>`).join('')}<circle r="2.2" fill="${I}"/></g>
   <g transform="translate(150 368) scale(1 -1)"><path d="M0 -14C-8-14-14-8-14 0H14C14-8 8-14 0-14Z" fill="${c.tink2}" stroke="${I}" stroke-width="1"/>${[-60,-30,0,30,60].map(a=>`<path d="M0 0L0-13" transform="rotate(${a})" stroke="${I}" stroke-width=".7"/>`).join('')}<circle r="2.2" fill="${I}"/></g>
   ${[[14,50],[286,50],[14,350],[286,350]].map(([x,y])=>`<g transform="translate(${x} ${y})"><circle r="9" fill="${B}" stroke="${I}" stroke-width="1.2"/>${[0,90,180,270].map(a=>`<path d="M0-1.5C-2.4-3-2.8-6 0-7.6C2.8-6 2.4-3 0-1.5Z" transform="rotate(${a})" fill="${I}"/>`).join('')}</g>`).join('')}
`}

function cols(th){const c={...th.c};c.tbg=c.inv?c.ink2||c.accent:c.tile||mix(c.sheet,'#ffffff',.5);c.tink=c.inv?mix(c.sheet,'#ffffff',.4):c.accent;c.tink2=c.inv?mix(c.accent,c.sheet,.35):mix(c.accent,c.tbg,.72);c.joint=c.inv?mix(c.tbg,'#000000',.4):mix(c.tbg,'#7a8090',.45);
  c.lemon=c.lemon||'#f2c625';c.txt=c.inv?'#f6f7f2':c.accent;c.txt2=c.inv?'#dfe6f2':c.ink;c.leaf=c.leaf||'#3f7a32';c.wood=c.wood||'#6a5a3a';return c}

FAMILY({key:'azulejo',name:'Azulejo',meaning:'Portuguese tiles',
  blurb:'Blue-and-white Portuguese tiles with a baroque framed panel and a sprig of real lemons; daylight crosses the glaze as it opens.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=cols(th),id='p'+(++uid);
    return `<section class="page pg-azulejo" style="--az-txt:${c.txt};--az-txt2:${c.txt2};--az-tile:${tileUri(c)};--az-fh:${friezeH(c)};--az-fv:${friezeV(c)};--az-tbg:${c.tbg};--az-ink:${c.tink}">
     <div class="az-field"></div><div class="az-border"></div>
     <svg class="az-spr a" viewBox="-10 0 320 200">${'<defs>'+lemonDefs(c,id)+'</defs>'+sprig(c,id,0)}</svg><svg class="az-spr b" viewBox="0 0 320 180">${'<defs>'+lemonDefs(c,id+'b')+'</defs>'+sprig(c,id+'b',1)}</svg>
     <div class="az-ptxt"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
      <div class="az-rule reveal d2"><i></i><svg viewBox="-9 -9 18 18">${[0,90,180,270].map(a=>`<path d="M0-1.5C-2.4-3-2.8-6 0-7.6C2.8-6 2.4-3 0-1.5Z" transform="rotate(${a})" fill="${c.tink}"/>`).join('')}</svg><i></i></div>
      <p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=cols(th),id='c'+(++uid);
    return `<div class="cover cv-azulejo" style="--az-txt:${c.txt};--az-txt2:${c.txt2};--az-tile:${tileUri(c)};--az-tbg:${c.tbg};--az-ink:${c.tink}"><div class="az-wall"></div><i class="az-sheen"></i>
     <${tag} class="az-panel" ${attr} aria-label="${L.open}"><svg viewBox="0 0 300 400">${cartouche(c,id)}</svg>
      <span class="az-in"><span class="az-k">${ev(o,L)}</span><span class="az-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</span><span class="az-d">${esc(fmtDate(o.date,o.lang))}</span>
      ${guest?`<span class="az-to">${L.dear}<b>${esc(guest)}</b></span>`:''}</span></${tag}>
     <svg class="az-spr top" viewBox="-10 0 320 200"><defs>${lemonDefs(c,id)}</defs>${sprig(c,id,0)}</svg>
     <svg class="az-spr bot" viewBox="0 0 320 180"><defs>${lemonDefs(c,id+'b')}</defs>${sprig(c,id+'b',1)}</svg>
     <p class="az-hint">${en?'Touch the panel to open':'Sentuh panel untuk membuka'}</p></div>`},
  skin(el,o,th){K.cards(el);const c=cols(th),id='s';
    el.style.setProperty('--az-tile',tileUri(c));el.style.setProperty('--az-tbg',c.tbg);el.style.setProperty('--az-ink',c.tink);
    {const I=c.tink,B=c.tbg;el.style.setProperty('--az-corner',K.uri(svg(56,56,`<path d="M0 0H56V3H3V56H0Z" fill="${I}"/><path d="M0 0H22A22 22 0 0 1 0 22Z" fill="${c.tink2}" stroke="${I}" stroke-width="1"/>${[0,1,2,3].map(i=>`<path d="M0 0L${f1(Math.cos((i+.5)/4*Math.PI/2)*20)} ${f1(Math.sin((i+.5)/4*Math.PI/2)*20)}" stroke="${I}" stroke-width=".8"/><path d="M0-1.6C-2.4-3-2.8-6 0-7.6C2.8-6 2.4-3 0-1.6Z" transform="translate(${f1(Math.cos((i+.5)/4*Math.PI/2)*14)} ${f1(Math.sin((i+.5)/4*Math.PI/2)*14)}) rotate(${f1((i+.5)/4*90+90)})" fill="${B}"/>`).join('')}<circle cx="4" cy="4" r="3" fill="${I}"/>
      <path d="M24 7C30 3 38 4 42 9S40 17 36 15 35 10 38 10M7 24C3 30 4 38 9 42S17 40 15 36 10 35 10 38" fill="none" stroke="${I}" stroke-width="1.2" stroke-linecap="round"/><path d="M42 9C46 8 50 8 54 9M9 42C8 46 8 50 9 54" fill="none" stroke="${I}" stroke-width=".7"/><circle cx="48" cy="6" r="1.1" fill="${I}"/><circle cx="6" cy="48" r="1.1" fill="${I}"/>`)))}
    el.style.setProperty('--az-lemon',K.uri(`<svg ${NS} viewBox="0 0 90 40"><defs>${lemonDefs(c,id)}</defs><path d="M2 14C20 10 40 12 60 20" fill="none" stroke="${c.wood}" stroke-width="1.6"/>${leaf(id,14,12,.7,-20,c)}${leaf(id,34,13,.65,30,c)}${leaf(id,52,18,.6,-10,c)}${lemon(id,62,24,.85,20)}</svg>`));
    $$('.sec h2',el).forEach(h=>{h.classList.add('az-h2');h.insertAdjacentHTML('afterbegin','<i class="az-hl"></i>')});
    $$('.sheet > .sec',el).forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="az-cn tl"></i><i class="az-cn tr"></i><i class="az-cn bl"></i><i class="az-cn br"></i>'))},
  themes:[
    {k:'biru',n:'Biru Lisboa',desc:'Cobalt on white with lemons',c:{ground:'#e9eef5',sheet:'#fbfbf7',ink:'#1d2a48',accent:'#1f4a9a',gold:'#d8b23a',pagefg:'#1d2a48'}},
    {k:'nila',n:'Nila',desc:'Deep indigo tiles',c:{ground:'#e6e8f0',sheet:'#fafaf6',ink:'#1a2040',accent:'#253278',gold:'#d8b23a',pagefg:'#1a2040'}},
    {k:'laut',n:'Laut',desc:'Sea-teal tiles, Porto',c:{ground:'#e3efee',sheet:'#fbfcf9',ink:'#173a3e',accent:'#1d6e78',gold:'#d8b23a',pagefg:'#173a3e'}},
    {k:'ungu',n:'Ungu',desc:'Manganese purple tiles',c:{ground:'#ece6ef',sheet:'#fcfbf9',ink:'#2c2238',accent:'#5a3a7c',gold:'#d8b23a',pagefg:'#2c2238'}},
    {k:'hijau',n:'Hijau',desc:'Green Coimbra tiles',c:{ground:'#e6eee6',sheet:'#fbfbf6',ink:'#1e3326',accent:'#2e6b4a',gold:'#d8b23a',leaf:'#4a7a2a',pagefg:'#1e3326'}},
    {k:'kuning',n:'Kuning',desc:'Blue tiles on warm cream',c:{ground:'#f3ecd8',sheet:'#fdf8ea',ink:'#2a2a3c',accent:'#2a4f96',gold:'#d49a28',tile:'#fbf3dc',pagefg:'#2a2a3c'}},
    {k:'malam',n:'Malam',desc:'White on cobalt, reversed',c:{ground:'#12244e',sheet:'#f6f7f2',ink:'#1d2a48',accent:'#1f4a9a',ink2:'#1c3f88',gold:'#e0bc48',inv:1,pagefg:'#eef1f7'}},
    {k:'senja',n:'Senja',desc:'White on deep teal, reversed',c:{ground:'#0f2f33',sheet:'#f6f6f0',ink:'#173a3e',accent:'#1d6e78',ink2:'#155e66',gold:'#e0bc48',inv:1,pagefg:'#ecf2ef'}},
  ]});
