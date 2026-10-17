/* neon: script names bent in glass tube, mounted on clear acrylic with standoffs against a brick or tiled wall, clips and a cable.
   Cover: the names are unlit glass while the small gold line glows; press the wall switch and they flicker on once, light the wall, then fade to the page.
   Page: a smaller lit sign over a brass plaque. Skin: dark cards with neon-tube heading frames. */
needFont('Sacramento');
needFont('Tilt+Neon');
const SC="'Sacramento', cursive",TN="'Tilt Neon', sans-serif",J="'Jost', sans-serif";
let uid=0;
const fit=(s,max,fs,k=.44)=>Math.min(fs,max/Math.max(1,(s||'').length*k));
function wall(c){const r=K.rnd(7);
  if(c.wt==='t'){let t='';for(let y=0;y<4;y++)for(let x=-1;x<3;x++){const ox=(y%2)*22,v=(r()*.16-.08);t+=`<rect x="${x*44+ox+1.5}" y="${y*22+1.5}" width="41" height="19" rx="2.5" fill="${c.wall}" style="filter:brightness(${(1+v).toFixed(2)})"/><path d="M${x*44+ox+4} ${y*22+4.5}h35" stroke="#fff" stroke-opacity=".09" stroke-width="1.2"/>`}
    return K.uri(`<svg ${NS} width="88" height="88" viewBox="0 0 88 88"><rect width="88" height="88" fill="${c.mortar}"/>${t}</svg>`)}
  let b='';for(let y=0;y<4;y++)for(let x=-1;x<3;x++){const ox=(y%2)*31,v=r()*.3-.15,w=r()*.5;b+=`<rect x="${x*62+ox+1.6}" y="${y*24+1.6}" width="58.8" height="20.8" rx="1.2" fill="${c.wall}" opacity="${(.86+v*.4).toFixed(2)}"/>${w>.3?`<rect x="${x*62+ox+6+r()*20}" y="${y*24+5+r()*8}" width="${(6+r()*14).toFixed(1)}" height="${(2+r()*3).toFixed(1)}" fill="#000" opacity=".12"/>`:''}<path d="M${x*62+ox+2} ${y*24+2.4}h58" stroke="#fff" stroke-opacity=".06"/>`}
  return K.uri(`<svg ${NS} width="124" height="96" viewBox="0 0 124 96"><rect width="124" height="96" fill="${c.mortar}"/>${b}</svg>`)}
// one neon line: glass tube underlay, glow (filter) and hot core
function tube(txt,x,y,fs,col,cls,font,u,anchor='middle'){const a=`x="${x}" y="${y}" text-anchor="${anchor}" font-size="${fs.toFixed(1)}"`;
  return `<g class="nn-line ${cls}"><text ${a} class="nn-glass ${font}" fill="none" stroke="${col}" stroke-width="3.2" stroke-linejoin="round">${txt}</text><text ${a} class="nn-glass2 ${font}" fill="none" stroke="#fff" stroke-width=".7" transform="translate(-.6 -.8)">${txt}</text>
   <g class="nn-on" filter="url(#ng${u})"><text ${a} class="${font}" fill="${col}" stroke="${col}" stroke-width="2.4" stroke-linejoin="round">${txt}</text></g><text ${a} class="nn-core ${font}" fill="#fff" fill-opacity=".9" stroke="#fff" stroke-width=".6">${txt}</text></g>`}
function sign(o,th,L,small){const c=th.c,u=++uid,[n1,n2]=coverNames(o),f1=fit(n1,270,78),f2=fit(n2,270,78),en=o.lang==='en';
  const clip=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-1.8" y="-7" width="3.6" height="14" rx="1" fill="url(#nm${u})"/><rect x="-3.2" y="5" width="6.4" height="3" rx="1" fill="#3a3a3a"/></g>`;
  const ys=[118,214];
  return `<svg class="nn-sign" viewBox="0 0 320 300" aria-hidden="true"><defs>
   <filter id="ng${u}" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="1.4" result="a"/><feGaussianBlur stdDeviation="5" result="b"/><feGaussianBlur stdDeviation="14" result="d"/><feMerge><feMergeNode in="d"/><feMergeNode in="b"/><feMergeNode in="a"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <linearGradient id="nm${u}" x1="0" x2="1"><stop offset="0" stop-color="#6b6b6b"/><stop offset=".45" stop-color="#e9e9e9"/><stop offset="1" stop-color="#5a5a5a"/></linearGradient>
   <linearGradient id="na${u}" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#fff" stop-opacity=".1"/></linearGradient>
   <radialGradient id="ns${u}"><stop offset="0" stop-color="#f4f4f4"/><stop offset=".6" stop-color="#9a9a9a"/><stop offset="1" stop-color="#555"/></radialGradient></defs>
   <rect x="8" y="10" width="304" height="282" rx="14" fill="#000" opacity=".28" transform="translate(5 8)" class="nn-shadow"/>
   <rect x="8" y="10" width="304" height="282" rx="14" fill="url(#na${u})" stroke="#fff" stroke-opacity=".28" stroke-width="1"/>
   <rect x="11" y="13" width="298" height="276" rx="12" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="1"/>
   ${[[26,28],[294,28],[26,274],[294,274]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="url(#ns${u})"/><circle cx="${x}" cy="${y}" r="7" fill="none" stroke="#000" stroke-opacity=".35" stroke-width=".6"/><circle cx="${x-2}" cy="${y-2}" r="1.6" fill="#fff" opacity=".7"/>`).join('')}
   <g opacity=".8">${clip(98,ys[0]-6)}${clip(222,ys[0]-4)}${clip(104,ys[1]-5)}${clip(214,ys[1]-6)}</g>
   ${tube(ev(o,L).toUpperCase(),160,52,13.5,c.gold,'nn-k on',  'nn-tn',u)}
   ${tube(esc(n1),160,ys[0],f1,c.accent,'nn-n','nn-sc',u)}
   ${tube('&amp;',160,150,26,c.gold,'nn-amp on','nn-tn',u)}
   ${tube(esc(n2),160,ys[1],f2,c.accent,'nn-n','nn-sc',u)}
   ${tube(esc(fmtShort(o.date)).replace(/\./g,' &#183; '),160,262,15,c.gold,'nn-d'+(small?' on':''),'nn-tn',u)}
   <path d="M160 292v6" stroke="#111" stroke-width="3"/></svg>`}
const plaque=(o,L,guest,en)=>`<div class="nn-plaque"><i class="s l"></i><i class="s r"></i>${guest?`<p class="nn-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="nn-pl"><span>${esc(fmtDate(o.date,o.lang))}</span><span>${esc(fmtTime(o.start,o.lang))} &#183; ${esc(o.venue)}</span></p></div>`;
FAMILY({key:'neon',name:'Neon',meaning:'Neon sign on brick',
  blurb:'Script names bent in neon tube on clear acrylic against a brick or tiled wall; flick the switch and they flicker on, light the wall, and fade to the card.',
  fonts:{d:TN,s:SC,b:J},ms:1550,
  page(o,th,L){const en=o.lang==='en';return `<section class="page pg-neon" style="--wallp:${wall(th.c)};--plate:${th.c.plate||'#c6a15b'}"><i class="nn-wall"></i><i class="nn-light"></i>
    <div class="nn-ps reveal">${sign(o,th,L,true)}</div>
    <div class="reveal d1">${plaque(o,L,'',en)}</div>
    <p class="nn-host reveal d2">${en?'Hosted by':'Anjuran'}<b>${esc(o.hosts||'')}</b></p></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-neon" style="--wallp:${wall(th.c)};--plate:${th.c.plate||'#c6a15b'}"><i class="nn-wall"></i><i class="nn-light"></i><i class="nn-spot"></i>
    <div class="nn-cs">${sign(o,th,L,false)}<svg class="nn-cable" viewBox="0 0 60 300" preserveAspectRatio="none"><path d="M30 0C30 60 44 90 40 150S18 240 26 300" fill="none" stroke="#0b0b0b" stroke-width="3.4"/><path d="M30 0C30 60 44 90 40 150S18 240 26 300" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width=".8" transform="translate(-.8 0)"/></svg></div>
    ${plaque(o,L,guest,en)}
    <div class="nn-sw"><${tag} class="nn-switch" ${attr} aria-label="${L.open}"><i class="nn-plate"><i class="nn-tog"></i><i class="sc t"></i><i class="sc b"></i></i></${tag}><span>${en?'Switch on':'Hidupkan suis'}</span></div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--wallp',wall(th.c));$$('.sheet > .sec',el).forEach(s=>{const h=$('h2',s);if(h)h.insertAdjacentHTML('afterend','<i class="nn-hl"></i>')})},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Hot pink tubes on dark brick',c:{ground:'#1d1210',sheet:'#17121a',ink:'#f3e9ec',accent:'#ff4fa3',gold:'#ffcf8a',wall:'#4a2a24',mortar:'#21140f',wt:'b',pagefg:'#f6eef0',line:'rgba(255,255,255,.14)'}},
    {k:'biru',n:'Biru',desc:'Ice-blue tubes on charcoal tile',c:{ground:'#111317',sheet:'#15181e',ink:'#e8f1f5',accent:'#4fd8ff',gold:'#ff79c0',wall:'#2a2e36',mortar:'#14161a',wt:'t',pagefg:'#eef5f8',line:'rgba(255,255,255,.14)'}},
    {k:'ungu',n:'Ungu',desc:'Violet and amber on plum brick',c:{ground:'#170f1a',sheet:'#18121c',ink:'#f0e8f4',accent:'#c07bff',gold:'#ffb347',wall:'#3a2638',mortar:'#170f18',wt:'b',pagefg:'#f3ecf6',line:'rgba(255,255,255,.14)'}},
    {k:'hijau',n:'Hijau',desc:'Mint tubes on bottle-green tile',c:{ground:'#0b1712',sheet:'#111c18',ink:'#e6f5ee',accent:'#45ffb8',gold:'#f3f7ea',wall:'#17352b',mortar:'#0a1611',wt:'t',pagefg:'#eaf7f0',line:'rgba(255,255,255,.14)'}},
    {k:'emas',n:'Emas',desc:'Warm white and coral on red brick',c:{ground:'#1e120c',sheet:'#1a1310',ink:'#f6ece2',accent:'#ffd07a',gold:'#ff7a59',wall:'#5a3020',mortar:'#24150e',wt:'b',pagefg:'#f8efe5',line:'rgba(255,255,255,.14)'}},
    {k:'merah',n:'Merah',desc:'Red tubes on black brick',c:{ground:'#0f0c0c',sheet:'#151212',ink:'#f5e9e6',accent:'#ff4141',gold:'#ffe7dc',wall:'#2a2222',mortar:'#0d0a0a',wt:'b',pagefg:'#f7ecea',line:'rgba(255,255,255,.14)'}},
    {k:'kapur',n:'Kapur',desc:'Pink and blue tubes on whitewashed brick',c:{ground:'#d9d3ca',sheet:'#1c1a20',ink:'#f2eef2',accent:'#ff3f8e',gold:'#1fa6e8',wall:'#ece7df',mortar:'#c9c1b5',wt:'b',pagefg:'#26232a',line:'rgba(255,255,255,.14)'}},
    {k:'nila',n:'Nila',desc:'Cyan and magenta on navy tile',c:{ground:'#0c1220',sheet:'#111827',ink:'#e8eef8',accent:'#39e6ff',gold:'#ff4fd8',wall:'#1a2540',mortar:'#0b111d',wt:'t',pagefg:'#edf2fa',line:'rgba(255,255,255,.14)'}},
  ]});
