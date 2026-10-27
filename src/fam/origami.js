/* origami: a square of patterned washi folded in the classic blintz fold (four corners to the centre),
   held by a small foil sticker. Cover: touching it unfolds the paper in two steps, top and bottom flaps first,
   then the sides, opening into a plain creased sheet. Page: crease-lined paper with a folded crane.
   Skin: cards with a folded-down corner and crease-line dividers. */
needFont('Italianno');
// seigaiha (blue-sea waves) tile for the washi face
const WAVES=(bg,ln)=>{const set=(x,y)=>[20,15,10,5].map(r=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${bg}" stroke="${ln}" stroke-width=".7"/>`).join('');
  return svgUriSq(`<svg ${NS} width="40" height="20" viewBox="0 0 40 20">${set(0,0)}${set(40,0)}${set(20,10)}${set(0,20)}${set(40,20)}</svg>`)};
// a folded crane, side view, in faceted paper
function crane(c,col){const a=col||c.accent,F=(pts,br)=>`<path d="M${pts}Z" fill="${a}"${br?` style="filter:brightness(${br})"`:''}/>`;
  return `<svg class="or-crane" viewBox="0 0 140 100"><g stroke="rgba(255,255,255,.5)" stroke-width=".45" stroke-linejoin="round">
   ${F('64 62L36 4L74 58',.6)}${F('64 62L48 26L74 58',.5)}
   ${F('10 28L57 62L54 66',.95)}${F('10 28L54 66L51 70',.7)}
   ${F('126 26L82.5 62.5L86 66',1.02)}${F('126 26L86 66L89.5 69.5',.74)}${F('126 26L137 39L128 31',.62)}
   ${F('56 67L70 59L84 67L70 86',.9)}${F('70 59L70 86L84 67',.72)}
   ${F('66 64L102 0L80 60')}${F('66 64L90 22L80 60',1.15)}
  </g><ellipse cx="70" cy="94" rx="36" ry="3.4" fill="rgba(0,0,0,.13)"/></svg>`}
const creases=`<svg class="or-cr" viewBox="0 0 100 100" preserveAspectRatio="none"><g fill="none" vector-effect="non-scaling-stroke">
  <path d="M0 0L100 100M100 0L0 100M50 0V100M0 50H100" stroke="rgba(0,0,0,.09)" stroke-width="1" vector-effect="non-scaling-stroke"/>
  <path d="M50 0L100 50L50 100L0 50Z" stroke="rgba(0,0,0,.08)" stroke-width="1" vector-effect="non-scaling-stroke"/>
  <path d="M0 0L100 100M100 0L0 100M50 0V100M0 50H100M50 0L100 50L50 100L0 50Z" stroke="rgba(255,255,255,.7)" stroke-width="1" vector-effect="non-scaling-stroke" transform="translate(.4 .4)"/></g></svg>`;
const flap=k=>`<span class="or-f ${k}"><i class="fr"></i><i class="bk"></i></span>`;
FAMILY({key:'origami',name:'Origami',meaning:'Folded paper',
  blurb:'A square of patterned washi folded corner to centre and held by a small gold sticker. Touch it and it unfolds into your card.',
  fonts:{d:"'Jost', sans-serif",s:"'Italianno', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c;
    return `<section class="page pg-origami" style="--waves:${WAVES(c.accent,c.pat)}"><div class="or-sheet">${creases}<i class="or-band t"></i><i class="or-band b"></i>
     <div class="or-crane-w reveal">${crane(c)}</div>
     <p class="or-k reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="or-rule reveal d2"><i></i><b></b><i></i></div>
     <p class="or-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="or-venue reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',[a,b]=K.initials(o);
    return `<div class="cover cv-origami" style="--waves:${WAVES(c.accent,c.pat)};--ornm:${c.nm||c.accent}"><div class="or-ground"></div>
     <div class="or-head"><p class="or-k">${ev(o,L)}</p><p class="or-names">${esc(n1)} <i>&amp;</i> ${esc(n2)}</p><div class="or-rule"><i></i><b></b><i></i></div></div>
     <${tag} class="or-fold" ${attr} aria-label="${L.open}"><span class="or-sq"><span class="or-base">${creases}</span>${flap('t')}${flap('b')}${flap('l')}${flap('r')}<i class="or-tips"></i><i class="or-edge"></i></span>
      <span class="or-seal"><b>${esc(a)}${esc(b)}</b></span></${tag}>
     <div class="or-bird">${crane(c,c.nm||c.accent)}</div><div class="or-foot"><p class="or-date">${esc(fmtDate(o.date,o.lang))}</p>${guest?`<p class="or-to">${L.dear}</p><p class="or-guest">${esc(guest)}</p>`:''}
      <p class="or-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--waves',WAVES(th.c.accent,th.c.pat));
    $$('.sec h2',el).forEach(h=>h.insertAdjacentHTML('afterbegin','<i class="or-hm"></i>'));
    $$('.sec',el).forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="or-dog"></i>'))},
  themes:[
    {k:'merah',n:'Merah',desc:'Vermilion washi with gold waves',c:{ground:'#efe8dd',sheet:'#fbf8f1',ink:'#2c2522',accent:'#b3362c',gold:'#c09a52',pat:'#e0b866',pagefg:'#2c2522'}},
    {k:'nila',n:'Nila',desc:'Indigo washi with white waves',c:{ground:'#e6e5e0',sheet:'#fbfaf6',ink:'#232633',accent:'#22386a',gold:'#b89a5e',pat:'#dfe4ef',pagefg:'#232633'}},
    {k:'sakura',n:'Sakura',desc:'Blossom pink washi, soft gold',c:{ground:'#f3e5e3',sheet:'#fffaf8',ink:'#3a2a2c',accent:'#c9677c',gold:'#bf9a5c',pat:'#fbe3e6',pagefg:'#3a2a2c'}},
    {k:'matcha',n:'Matcha',desc:'Tea green washi on rice paper',c:{ground:'#e9e7da',sheet:'#fcfbf3',ink:'#2a2d20',accent:'#58733a',gold:'#b6964e',pat:'#d9c98a',pagefg:'#2a2d20'}},
    {k:'laut',n:'Laut',desc:'Sea teal washi with white waves',c:{ground:'#dbe7e8',sheet:'#fbfcfa',ink:'#1f2f33',accent:'#2b7482',gold:'#b89a5e',pat:'#d8eef0',pagefg:'#1f2f33'}},
    {k:'emas',n:'Emas',desc:'Gold washi on a charcoal table',c:{ground:'#26231f',sheet:'#f7f2e7',ink:'#2b251d',accent:'#a9853d',gold:'#c9a65e',pat:'#f3e6c4',pagefg:'#efe6d2',nm:'#d9b46a'}},
    {k:'hitam',n:'Hitam',desc:'Black washi with gold waves',c:{ground:'#3a3835',sheet:'#f5f1e8',ink:'#24211d',accent:'#1f1e1d',gold:'#c4a15a',pat:'#c4a15a',pagefg:'#f0e9dc',nm:'#d2b06a'}},
    {k:'ungu',n:'Ungu',desc:'Plum washi on dusk violet',c:{ground:'#2b2337',sheet:'#fbf8f4',ink:'#2c2433',accent:'#6b4789',gold:'#c4a15a',pat:'#e6d3f0',pagefg:'#efe8f4',nm:'#c9a8e6'}},
  ]});
