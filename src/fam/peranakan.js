/* peranakan: Nyonya. A famille-rose kamcheng jar (pink, turquoise and yellow enamels with peonies, ruyi collar and lotus panels)
   on a rosewood stand, inside a manik beadwork border with Peranakan tile corners.
   Cover: the lid lifts off and the jar sinks away. Page: a beaded frame. Skin: beaded headings, tile-corner cards. */
needFont('Playfair+Display+SC:wght@400');
const q=n=>+n.toFixed(1);
let U=0;
// famille-rose peony: three rings of scalloped petals, a deep heart
function peony(x,y,s,c,id){const ring=(n,r,pr,col,rot)=>Array.from({length:n},(_,i)=>{const a=rot+i/n*Math.PI*2,px=Math.cos(a)*r,py=Math.sin(a)*r*.82;
    return `<ellipse cx="${q(px)}" cy="${q(py)}" rx="${pr}" ry="${q(pr*.8)}" transform="rotate(${q(a*57.3)} ${q(px)} ${q(py)})" fill="${col}" stroke="${c.peonyD}" stroke-width=".5"/>`}).join('');
  return `<g transform="translate(${q(x)} ${q(y)}) scale(${s})">${ring(8,9,6.4,`url(#${id}pa)`,0)}${ring(6,5.6,5,`url(#${id}pb)`,.4)}${ring(4,2.6,3.6,c.peony,.9)}<circle r="2.4" fill="${c.peonyD}"/><circle r="1" cx="-.6" cy="-.6" fill="${c.yellow}"/>
   ${Array.from({length:8},(_,i)=>{const a=i/8*Math.PI*2+.2;return `<path d="M${q(Math.cos(a)*3)} ${q(Math.sin(a)*2.5)}Q${q(Math.cos(a)*8)} ${q(Math.sin(a)*6)} ${q(Math.cos(a)*13)} ${q(Math.sin(a)*10.5)}" stroke="${c.peonyD}" stroke-width=".35" fill="none" opacity=".6"/>`}).join('')}</g>`}
function leaf(x,y,rot,s,c){return `<g transform="translate(${q(x)} ${q(y)}) rotate(${rot}) scale(${s})"><path d="M0 0C4 -5 5 -12 0 -20C-5 -12 -4 -5 0 0Z" fill="${c.leaf}" stroke="${c.leafD}" stroke-width=".5"/><path d="M0 -1V-18M0 -6l3 -3M0 -10l-3 -3M0 -13l2.5 -2.5" stroke="${c.leafD}" stroke-width=".4" fill="none"/></g>`}
// ruyi cloud-collar head, pointing down
const RUYI='M0 12C-3 9 -9 9 -9 4C-9 0 -5 -1 -3 1C-4 -3 -2 -6 0 -6C2 -6 4 -3 3 1C5 -1 9 0 9 4C9 9 3 9 0 12Z';
function jarSvg(c){const id=`pk${++U}`,cx=100;
  // body silhouette (viewed slightly from above)
  const body='M58 66C24 74 10 106 15 138C20 170 42 194 54 202L146 202C158 194 180 170 185 138C190 106 176 74 142 66Z';
  // wrap a row of motifs around the body: x by sin, scale by cos
  const wrap=(n,R,y,fn,ph=0)=>Array.from({length:n},(_,i)=>{const t=ph+i/n*Math.PI*2;if(Math.cos(t)<.08)return '';return fn(cx+Math.sin(t)*R,y,Math.cos(t),i)}).join('');
  const LAP='M-11 0C-11 5 -5 5 -4 8C-3 11 0 14 0 14C0 14 3 11 4 8C5 5 11 5 11 0Z';
  const collar=`<path d="M0 64H200V82Q100 90 0 82Z" fill="${c.band}"/>`+wrap(13,86,82,(x,y,k)=>`<g transform="translate(${q(x)} ${y}) scale(${q(k*1.15)} 1.15)"><path d="${LAP}" fill="${c.band}" stroke="${c.goldL}" stroke-width=".7"/><path d="M-7 1C-7 4 -3 4 -2 6C-1 8 0 10 0 10C0 10 1 8 2 6C3 4 7 4 7 1" fill="none" stroke="${c.goldL}" stroke-width=".4"/><circle cy="4" r="2.2" fill="${c.peonyL}" stroke="${c.peonyD}" stroke-width=".4"/><circle cy="4" r=".8" fill="${c.yellow}"/></g>`,.12)+wrap(26,86,72,(x,y,k)=>`<circle cx="${q(x)}" cy="${y}" r="${q(1.3*k)}" fill="${c.goldL}" opacity=".9"/>`,.06);
  const lotus=wrap(16,82,186,(x,y,k)=>`<path d="M0 16V2C0 -6 -6 -11 -6 -11S-12 -6 -12 2V16" transform="translate(${q(x+6*k)} ${y}) scale(${q(k)} 1)" fill="${c.band2}" stroke="${c.goldL}" stroke-width=".8"/><path d="M-6 -7C-9 -2 -9 6 -9 14M-6 -7C-3 -2 -3 6 -3 14" transform="translate(${q(x+6*k)} ${y}) scale(${q(k)} 1)" stroke="${c.goldL}" stroke-width=".4" fill="none" opacity=".8"/>`);
  const tend=(x,y,k,sg)=>`<path d="M${q(x)} ${q(y)}c${q(sg*6*k)} -6 ${q(sg*14*k)} -4 ${q(sg*15*k)} 3c${q(sg*1*k)} 5 ${q(-sg*4*k)} 7 ${q(-sg*6*k)} 4c${q(-sg*1.5*k)} -2 0 -4 ${q(sg*1.5*k)} -3" fill="none" stroke="${c.goldD}" stroke-width=".6"/>`;
  const flowers=wrap(6,72,134,(x,y,k,i)=>{const yy=y+(i%2?-13:11),s=.45+k*.55;return tend(x-10*k,yy-16,k,-1)+tend(x+10*k,yy+16,k,1)+leaf(x-17*k,yy+7,-118,1.35*s,c)+leaf(x+18*k,yy+5,112,1.25*s,c)+leaf(x-6*k,yy-17,-24,1.15*s,c)+leaf(x+9*k,yy+19,160,1.0*s,c)+peony(x,yy,1.32*s,c,id)},.25);
  const buds=wrap(6,84,132,(x,y,k,i)=>`<g transform="translate(${q(x)} ${y+(i%2?16:-17)}) scale(${q(k*.85+.15)})"><circle r="3.6" fill="url(#${id}pa)" stroke="${c.peonyD}" stroke-width=".5"/><path d="M-2.5 -1.5Q0 -5 2.5 -1.5" stroke="${c.peonyD}" stroke-width=".4" fill="none"/>${leaf(-2,2,-140,.55,c)}${leaf(2,2,140,.55,c)}</g>`,.25+Math.PI/6)+wrap(12,80,154,(x,y,k,i)=>`<g transform="translate(${q(x)} ${y+(i%2?2:-3)}) scale(${q(k)} 1)">${[0,1,2,3].map(j=>`<ellipse cx="${[0,1.8,0,-1.8][j]}" cy="${[-1.8,0,1.8,0][j]}" rx="1.3" ry="1.3" fill="${c.white}"/>`).join('')}<circle r=".9" fill="${c.yellow}"/></g>`,.1);
  const sgraf=`<pattern id="${id}sg" width="9" height="9" patternUnits="userSpaceOnUse"><path d="M1 6c1.5-3 4-3.5 5-1.5s-1 3-2 2" fill="none" stroke="${c.jarD}" stroke-width=".45" opacity=".55"/></pattern>`;
  const lidRuyi=`<path d="M40 44H160V52H40Z" fill="${c.band}"/>`+Array.from({length:9},(_,i)=>{const t=-1.2+i*.3,x=cx+Math.sin(t)*40,k=Math.cos(t);return `<g transform="translate(${q(x)} 44) scale(${q(k*.85)} -.8)"><path d="${LAP}" fill="${c.band}" stroke="${c.goldL}" stroke-width=".7"/><circle cy="4" r="2" fill="${c.peonyL}"/></g>`}).join('');
  return `<svg viewBox="0 0 200 222" ${NS}><defs>
   <radialGradient id="${id}b" cx=".38" cy=".38" r=".75"><stop offset="0" stop-color="${c.jarL}"/><stop offset=".55" stop-color="${c.jar}"/><stop offset="1" stop-color="${c.jarD}"/></radialGradient>
   <radialGradient id="${id}sh" cx=".4" cy=".4" r=".72"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></radialGradient>
   <radialGradient id="${id}pa" cx=".4" cy=".35"><stop offset="0" stop-color="${c.peonyL}"/><stop offset="1" stop-color="${c.peony}"/></radialGradient>
   <radialGradient id="${id}pb" cx=".4" cy=".35"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${c.peonyL}"/></radialGradient>
   <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.goldL}"/><stop offset=".5" stop-color="${c.goldD}"/><stop offset="1" stop-color="${c.goldL}"/></linearGradient>
   <linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.wood2}"/><stop offset="1" stop-color="${c.wood}"/></linearGradient>
   <clipPath id="${id}c"><path d="${body}"/></clipPath>${sgraf}</defs>
   <g class="pk-body">
   <ellipse cx="100" cy="214" rx="78" ry="7" fill="#000" opacity=".28"/>
   <path d="M34 204H166L160 214H40Z" fill="url(#${id}w)"/><path d="M40 214C38 218 34 219 30 219M160 214C162 218 166 219 170 219M70 214V219M130 214V219" stroke="${c.wood}" stroke-width="2.2" fill="none" stroke-linecap="round"/>
   <path d="M38 206H162" stroke="${c.goldL}" stroke-width=".5" opacity=".6"/><ellipse cx="100" cy="204" rx="66" ry="4" fill="${c.wood2}"/>
   <path d="M54 200H146L142 208H58Z" fill="${c.jarD}"/><path d="M56 202H144" stroke="url(#${id}g)" stroke-width="1.2"/>
   <path d="${body}" fill="url(#${id}b)"/><path d="${body}" fill="url(#${id}sg)"/>
   <g clip-path="url(#${id}c)">
    
    ${collar}
    <path d="M10 101Q100 110 190 101" fill="none" stroke="url(#${id}g)" stroke-width="1.2"/><path d="M10 104Q100 113 190 104" fill="none" stroke="${c.goldL}" stroke-width=".5"/>
    ${buds}${flowers}
    <path d="M10 172Q100 182 190 172" fill="none" stroke="url(#${id}g)" stroke-width="1.4"/><path d="M10 175Q100 185 190 175" fill="none" stroke="${c.goldL}" stroke-width=".5"/>
    <rect x="0" y="176" width="200" height="30" fill="${c.jarD}" opacity=".12"/>${lotus}
    <path d="${body}" fill="url(#${id}sh)"/>
    <ellipse cx="66" cy="112" rx="14" ry="30" transform="rotate(18 66 112)" fill="#fff" opacity=".22"/><ellipse cx="62" cy="104" rx="4" ry="12" transform="rotate(18 62 104)" fill="#fff" opacity=".45"/>
   </g>
   <path d="${body}" fill="none" stroke="${c.goldD}" stroke-width=".8" opacity=".6"/>
   <ellipse cx="100" cy="66" rx="42" ry="7" fill="${c.jarD}"/><ellipse cx="100" cy="65" rx="40" ry="5.5" fill="${c.band}"/>
   </g>
   <g class="pk-lid">
    <path d="M56 64C56 58 58 54 62 52C66 34 84 26 100 26C116 26 134 34 138 52C142 54 144 58 144 64C130 70 70 70 56 64Z" fill="url(#${id}b)"/>
    <path d="M56 64C70 70 130 70 144 64" fill="none" stroke="url(#${id}g)" stroke-width="2"/>
    <path d="M62 56C78 61 122 61 138 56" fill="none" stroke="url(#${id}g)" stroke-width="1.1"/>
    <clipPath id="${id}lc"><path d="M62 52C66 34 84 26 100 26C116 26 134 34 138 52C120 58 80 58 62 52Z"/></clipPath>
    <g clip-path="url(#${id}lc)">${lidRuyi}${peony(100,36,.55,c,id)}${leaf(88,40,-110,.7,c)}${leaf(112,40,110,.7,c)}
     <path d="M62 52C66 34 84 26 100 26C116 26 134 34 138 52Z" fill="url(#${id}sh)"/><ellipse cx="80" cy="38" rx="8" ry="4" transform="rotate(-20 80 38)" fill="#fff" opacity=".35"/></g>
    <path d="M62 52C66 34 84 26 100 26C116 26 134 34 138 52" fill="none" stroke="url(#${id}g)" stroke-width="1.1"/>
    <path d="M92 27C92 22 95 20 100 20C105 20 108 22 108 27Z" fill="url(#${id}g)"/>
    <path d="M100 20C95 18 93 13 96 9C97 6 100 3 100 3C100 3 103 6 104 9C107 13 105 18 100 20Z" fill="url(#${id}pa)" stroke="url(#${id}g)" stroke-width="1"/><path d="M100 6V18M97 10C98 13 99 15 100 17M103 10C102 13 101 15 100 17" stroke="${c.goldD}" stroke-width=".5" fill="none"/>
   </g></svg>`}
// manik beadwork: a band tile drawn bead by bead on a thread grid
const BEADGRID=['GGGGGGGGGGGG','............','a.....a.....','............','..pPp...ll..','.pPYPp.lLLl.','.PYyYP..ll.L','.pPYPp...LL.','..pPp.......','............','a.....a.....','............','GGGGGGGGGGGG'];
function beadSvg(c,rot){const P=4,cols=12,rows=BEADGRID.length,map={G:c.goldB,'.':c.beadBg,a:c.band,p:c.peonyL,P:c.peony,Y:c.yellow,y:'#fff6d0',l:c.leafL,L:c.leaf};
  let b='';BEADGRID.forEach((r,j)=>[...r].forEach((ch,i)=>{const x=i*P+P/2,y=j*P+P/2;b+=`<circle cx="${x}" cy="${y}" r="1.75" fill="${map[ch]}"/>`}));
  const w=cols*P,h=rows*P;
  return `<svg ${NS} width="${rot?h:w}" height="${rot?w:h}" viewBox="0 0 ${rot?h:w} ${rot?w:h}"><defs><radialGradient id="h" cx=".35" cy=".3" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></radialGradient><pattern id="hl" width="${P}" height="${P}" patternUnits="userSpaceOnUse"><circle cx="${P/2}" cy="${P/2}" r="1.75" fill="url(#h)"/><circle cx="${P/2}" cy="${P/2}" r="1.75" fill="none" stroke="#000" stroke-opacity=".28" stroke-width=".35"/></pattern></defs>
   <g ${rot?`transform="translate(${h} 0) rotate(90)"`:''}><rect width="${w}" height="${h}" fill="${c.thread}"/>${b}<rect width="${w}" height="${h}" fill="url(#hl)"/></g></svg>`}
// Peranakan relief tile for the corners
function tileSvg(c){const id=`pt${++U}`;const corner=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})">${[0,1,2].map(i=>`<ellipse cx="${q(Math.cos(i*.785)*8)}" cy="${q(Math.sin(i*.785)*8)}" rx="5" ry="3.2" transform="rotate(${i*45} ${q(Math.cos(i*.785)*8)} ${q(Math.sin(i*.785)*8)})" fill="${c.leaf}" stroke="${c.leafD}" stroke-width=".5"/>`).join('')}<circle r="4" fill="${c.yellow}" stroke="${c.goldD}" stroke-width=".5"/></g>`;
  const pet=Array.from({length:8},(_,i)=>{const a=i*45;return `<path d="M0 -6C5 -9 7 -16 0 -21C-7 -16 -5 -9 0 -6Z" transform="rotate(${a})" fill="url(#${id}p)" stroke="${c.peonyD}" stroke-width=".6"/>`}).join('');
  const sm=Array.from({length:8},(_,i)=>`<path d="M0 -16L3 -22L0 -27L-3 -22Z" transform="rotate(${i*45+22.5})" fill="${c.band}" stroke="${c.goldD}" stroke-width=".4"/>`).join('');
  return `<svg ${NS} viewBox="0 0 60 60"><defs><radialGradient id="${id}p" cx=".5" cy=".9" r=".9"><stop offset="0" stop-color="${c.peony}"/><stop offset="1" stop-color="${c.peonyL}"/></radialGradient><linearGradient id="${id}e" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient></defs>
   <rect width="60" height="60" fill="${c.tileBg}"/><rect x="1.5" y="1.5" width="57" height="57" fill="none" stroke="${c.band2}" stroke-width="3"/><rect x="4.5" y="4.5" width="51" height="51" fill="none" stroke="${c.goldD}" stroke-width=".5"/>
   ${corner(4,4,0)}${corner(56,4,90)}${corner(56,56,180)}${corner(4,56,270)}
   <g transform="translate(30 30)"><circle r="25" fill="none" stroke="${c.band}" stroke-width=".8"/>${sm}${pet}<circle r="6" fill="${c.yellow}" stroke="${c.goldD}" stroke-width=".6"/><circle r="2.5" fill="${c.peonyD}"/></g>
   <rect width="60" height="60" fill="url(#${id}e)"/><rect x=".5" y=".5" width="59" height="59" fill="none" stroke="#000" stroke-opacity=".25"/></svg>`}
const pal=c=>({white:c.white||'#fffaf2',jar:c.jar,jarL:c.jarL,jarD:c.jarD,band:c.band,band2:c.band2,peony:c.peony||'#d9487a',peonyL:c.peonyL||'#f7b8cc',peonyD:c.peonyD||'#9b1f4b',leaf:c.leaf||'#4f9a6a',leafL:c.leafL||'#8fcf9c',leafD:c.leafD||'#24583a',yellow:c.yellow||'#f2c94c',goldL:c.goldL||'#f3d98b',goldD:c.goldD||'#a07a2c',goldB:c.goldB||'#c9a24a',wood:c.wood||'#3a1d12',wood2:c.wood2||'#6a3a22',beadBg:c.beadBg||'#fbf6ec',thread:c.thread||'#b9ab94',tileBg:c.tileBg||'#fbf7ee'});
FAMILY({key:'peranakan',name:'Nyonya',meaning:'Peranakan kamcheng',
  blurb:'A famille-rose kamcheng with peonies inside a manik beadwork border and Peranakan tile corners; the lid lifts and the jar sinks away.',
  fonts:{d:"'Playfair Display SC', 'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=pal(th.c),en=o.lang==='en',tile=K.uri(tileSvg(c));
    return `<section class="page pg-peranakan" style="--bead:${K.uri(beadSvg(c,0))};--beadv:${K.uri(beadSvg(c,1))};--tile:${tile}"><div class="pk-bg"></div>
     <div class="pk-beads"><i class="t"></i><i class="b"></i><i class="l"></i><i class="r"></i></div><i class="pk-tl a"></i><i class="pk-tl b"></i><i class="pk-tl c"></i><i class="pk-tl d"></i>
     <div class="pk-card"><div class="pk-peony reveal">${jarSvg(c)}</div>
      <p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
      <div class="pk-rule reveal d2"><i></i><b></b><b></b><b></b><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="pk-v reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=pal(th.c),en=o.lang==='en',tile=K.uri(tileSvg(c));
    return `<div class="cover cv-peranakan" style="--bead:${K.uri(beadSvg(c,0))};--beadv:${K.uri(beadSvg(c,1))};--tile:${tile}"><div class="pk-bg"></div>
     <div class="pk-beads"><i class="t"></i><i class="b"></i><i class="l"></i><i class="r"></i></div><i class="pk-tl a"></i><i class="pk-tl b"></i><i class="pk-tl c"></i><i class="pk-tl d"></i>
     <div class="pk-head"><p class="pk-k">${ev(o,L)}</p><p class="pk-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="pk-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <${tag} class="pk-jar" ${attr} aria-label="${L.open}">${jarSvg(c)}</${tag}>
     <div class="pk-foot">${guest?`<p class="pk-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="pk-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=pal(th.c);el.style.setProperty('--bead',K.uri(beadSvg(c,0)));el.style.setProperty('--tile',K.uri(tileSvg(c)));
    $$('.sec h2',el).forEach(h=>{h.insertAdjacentHTML('beforebegin','<i class="pk-hb"></i>')});
    K.secs(el).forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="pk-tc a"></i><i class="pk-tc b"></i><i class="pk-tc c"></i><i class="pk-tc d"></i>'))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Pink kamcheng on mint',c:{ground:'#dcefe6',sheet:'#fffaf3',ink:'#2f2a2a',accent:'#b0325f',gold:'#b38a3e',pagefg:'#2f3a33',jar:'#f2a7bf',jarL:'#fbd6e1',jarD:'#c96b8c',band:'#4fb3a6',band2:'#3d8f86',beadBg:'#fbf6ec',thread:'#a9c8bb',tileBg:'#fbf7ee'}},
    {k:'firus',n:'Firus',desc:'Turquoise kamcheng on blush',c:{ground:'#f6dfe2',sheet:'#fffaf6',ink:'#2d2a2c',accent:'#1f7f7a',gold:'#b38a3e',pagefg:'#3a2c30',jar:'#5cc2b5',jarL:'#a8e6dc',jarD:'#2d8a80',band:'#e9739a',band2:'#c94f78',thread:'#d6b5bc'}},
    {k:'kuning',n:'Kuning',desc:'Imperial yellow kamcheng',c:{ground:'#e7f0f5',sheet:'#fffcf3',ink:'#2e2a22',accent:'#9b2d55',gold:'#ad8638',pagefg:'#26323a',jar:'#f2cf58',jarL:'#fcecaa',jarD:'#c99b26',band:'#5aa0c8',band2:'#3d7aa3',yellow:'#ffe48a',thread:'#b7c7d0'}},
    {k:'hijau',n:'Hijau Pucuk',desc:'Leaf-green kamcheng on cream',c:{ground:'#f7efe0',sheet:'#fffbf2',ink:'#2c2b25',accent:'#3e7d4f',gold:'#b08a42',pagefg:'#36312a',jar:'#8fcf8f',jarL:'#cdeec4',jarD:'#4c9a5c',band:'#e46f8f',band2:'#c94f78',leaf:'#2f7a52',leafL:'#7cc095',thread:'#cfc2a6'}},
    {k:'nila',n:'Nila',desc:'Pink kamcheng on midnight blue',c:{ground:'#152238',sheet:'#fbf6ee',ink:'#2b2a33',accent:'#b0325f',gold:'#d2b36c',pagefg:'#f1eadc',jar:'#f2a7bf',jarL:'#fbd6e1',jarD:'#c96b8c',band:'#4fb3a6',band2:'#3d8f86',thread:'#4c5a72',beadBg:'#eef0f2',goldB:'#d2b36c'}},
    {k:'marun',n:'Marun',desc:'Turquoise kamcheng on maroon',c:{ground:'#3a1220',sheet:'#fbf3ec',ink:'#2e2226',accent:'#8e2346',gold:'#d6b56e',pagefg:'#f5e6dc',jar:'#5cc2b5',jarL:'#a8e6dc',jarD:'#2d8a80',band:'#f2a7bf',band2:'#d4688e',thread:'#6a3446',goldB:'#d6b56e'}},
    {k:'hitam',n:'Hitam',desc:'Yellow kamcheng on black lacquer',c:{ground:'#151313',sheet:'#fbf6ec',ink:'#262222',accent:'#a3284f',gold:'#d4b26a',pagefg:'#f0e8da',jar:'#f2cf58',jarL:'#fcecaa',jarD:'#c99b26',band:'#4fb3a6',band2:'#e46f8f',thread:'#3c3633',goldB:'#d4b26a',beadBg:'#f2ece0'}},
    {k:'ungu',n:'Ungu',desc:'Lilac kamcheng on pale lavender',c:{ground:'#ece6f3',sheet:'#fffaf6',ink:'#2f2a35',accent:'#7a3f8f',gold:'#b08a42',pagefg:'#352c40',jar:'#c9a8e0',jarL:'#e9dcf4',jarD:'#9070b0',band:'#5cc2b5',band2:'#e46f8f',thread:'#c7bcd5'}},
  ]});
