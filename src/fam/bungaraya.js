/* bungaraya: a hand-coloured botanical plate of hibiscus (Redouté, public domain) kept in a bevel-cut mount board.
   Cover: the mount, the blooms showing through its window and the names in foil below it. Tap "Buka Jemputan"
   and the mount swings open on its left hinge, leaving the plate with the names printed as its caption.
   Page: the plate on linen with the opened mount behind it. Skin: plate paper cards with a pressed plate mark. */
const brVars=th=>`--mat:${th.c.mat};--mfg:${th.c.mfg}`,brCls=th=>(th.c.foil?'br-foil ':'')+(th.c.dark?'br-dk':'');
const brPlate=(o,L,cls='')=>{const [n1,n2]=coverNames(o);
  return `<div class="br-plate ${cls}"><div class="br-mark">
    <div class="br-print"><img src="${A}flower-hibiscus.webp" alt=""></div>
    <div class="br-cap"><p class="br-k kicker">${ev(o,L)}</p><p class="br-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
      <p class="br-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="br-ven">${esc(o.venue)}</p>`:''}</div></div></div>`};
const brMat=(o,L,cls='')=>{const [n1,n2]=coverNames(o);
  return `<div class="br-mat ${cls}"><div class="br-face"><i class="br-win"></i>
      <div class="br-mcap"><p class="br-k">${ev(o,L)}</p><p class="br-mn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="br-md">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
    <div class="br-backface"></div></div>`};
FAMILY({key:'bungaraya',name:'Bunga Raya',meaning:'Botanical plate',
  blurb:'A hand-coloured botanical plate of hibiscus kept in a bevel-cut mount, the names in gold foil below the window. The mount swings open to show the plate.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const en=o.lang==='en';
    return `<section class="page pg-bungaraya ${brCls(th)}" style="${brVars(th)}"><div class="br-ground"></div>
      <div class="br-lay reveal">${brMat(o,L,'br-under')}${brPlate(o,L)}</div>
      <a class="br-pill reveal d2" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-bungaraya ${brCls(th)}" style="${brVars(th)}"><div class="br-ground"></div>
      <div class="br-stage">${brPlate(o,L)}${brMat(o,L,'br-swing')}</div>
      <div class="br-foot">${guest?`<p class="br-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="br-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--mat',c.mat);el.style.setProperty('--mfg',c.mfg);el.classList.toggle('br-dark',!!c.dark);
    const sc=$('.scroller',el);
    $$('.sheet > .sec h2',el).forEach(h=>{if(!h.previousElementSibling?.classList?.contains('br-sprig'))h.insertAdjacentHTML('beforebegin',`<i class="br-sprig" style="--m:url(${A}eng-hibiscus.webp)"></i>`)});
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Crimson mount, gold foil, ivory linen',c:{ground:'#ece4d6',sheet:'#fbf7ee',ink:'#33241f',accent:'#8e1d2a',gold:'#c39a4e',pagefg:'#33241f',mat:'#8a1a27',mfg:'#f4e6cf',foil:1}},
    {k:'malam',n:'Malam',desc:'Night-green mount on dark velvet',c:{ground:'#0f1d18',sheet:'#fbf7ee',ink:'#2a2622',accent:'#8e1d2a',gold:'#cfa95e',pagefg:'#efe6d4',mat:'#183129',mfg:'#efe2c6',foil:1,dark:1}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose mount, plum lettering, blush linen',c:{ground:'#f1e2dd',sheet:'#fffaf6',ink:'#3e2a2c',accent:'#9a4a5c',gold:'#b38a4c',pagefg:'#3e2a2c',mat:'#c98e98',mfg:'#4e1f2b'}},
    {k:'kuning',n:'Kuning',desc:'Turmeric mount, ink lettering, cream linen',c:{ground:'#efe6d0',sheet:'#fffbf1',ink:'#3a2e1c',accent:'#8a5a12',gold:'#a8823e',pagefg:'#3a2e1c',mat:'#d9a93c',mfg:'#3b2a10'}},
    {k:'putih',n:'Putih',desc:'White mount on slate',c:{ground:'#2b3138',sheet:'#fbf9f4',ink:'#272a2e',accent:'#8e1d33',gold:'#c4a670',pagefg:'#eeeae2',mat:'#f3efe7',mfg:'#7d1a2e',dark:1}},
    {k:'jingga',n:'Jingga',desc:'Terracotta mount, cream lettering, sand linen',c:{ground:'#efe3d4',sheet:'#fffaf3',ink:'#3a2820',accent:'#a4472c',gold:'#c09656',pagefg:'#3a2820',mat:'#b5583a',mfg:'#fcf1e4'}},
    {k:'marun',n:'Marun',desc:'Maroon mount on wine velvet',c:{ground:'#2a0b12',sheet:'#fbf5ee',ink:'#2e1a1c',accent:'#861a2b',gold:'#d3ab66',pagefg:'#f4e4d6',mat:'#5c1522',mfg:'#f1dcc2',foil:1,dark:1}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald mount on deep green velvet',c:{ground:'#0c2a21',sheet:'#fbf7ee',ink:'#22302a',accent:'#8e1d2a',gold:'#d2b06a',pagefg:'#f2ead8',mat:'#174636',mfg:'#f0e4c8',foil:1,dark:1}},
  ]});
