/* neon: one line of script neon glowing on a plaster wall at dusk, with an engraved brass plaque under it.
   Cover: almost all darkness; the names in monoline glass tube light a pool of wall around them. Tap "Buka Jemputan":
   the tube brightens, the wall falls away into the same wall on the front page.
   Page: a smaller sign, the plaque with date and venue, and three little brass name plates that lead to the sections.
   Skin: dark plaster cards with a brass hairline and a softly lit script heading. */
needFont('Sacramento');
const NN_SC="'Sacramento', cursive";
// size the script to the longest name so two names never wrap past the wall
const nnFs=(o,max,room)=>{const [a,b]=coverNames(o),n=Math.max(5,(a||'').length,(b||'').length);return Math.min(max,room/(n*.4)).toFixed(1)};
const nnSign=(o,max,room,cls='')=>{const [n1,n2]=coverNames(o);
  return `<div class="nn-sign ${cls}" style="--fs:${nnFs(o,max,room)}cqi">
    <p class="nn-tube">${esc(n1)}</p><p class="nn-amp">&amp;</p><p class="nn-tube">${esc(n2)}</p></div>`};
const nnScrew=p=>`<i class="nn-screw" style="${p}"></i>`;
const nnPlaque=inner=>`<div class="nn-plaque">${nnScrew('left:9px;top:50%')}${nnScrew('right:9px;top:50%')}<div class="nn-eng">${inner}</div></div>`;
FAMILY({key:'neon',name:'Neon',meaning:'Neon at dusk',
  blurb:'One line of script neon glowing on a plaster wall at dusk, with an engraved brass plaque beneath. The light brightens as the card opens.',
  fonts:{d:"'Cormorant Garamond', serif",s:NN_SC,b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const en=o.lang==='en';
    return `<section class="page pg-neon2${th.c.day?' nn-day':''}" style="--wall:${th.c.wall}"><div class="nn-wall"></div>
      <p class="nn-k kicker reveal">${ev(o,L)}</p>
      <div class="reveal d1" style="width:100%">${nnSign(o,13.5,64,'sm')}</div>
      <div class="reveal d2" style="width:78%;max-width:320px">${nnPlaque(`<p class="nn-pd">${esc(fmtDate(o.date,o.lang))}</p><p class="nn-pt">${esc(fmtTime(o.start,o.lang))}${o.end?' – '+esc(fmtTime(o.end,o.lang)):''}</p>${o.venue?`<p class="nn-pv">${esc(o.venue)}</p>`:''}`)}</div>
      <div class="nn-plates reveal d3">
        <a class="nn-plate" data-go="when" href="#">${en?'Details':'Butiran'}</a>
        ${o.x_rsvp?`<a class="nn-plate" data-go="rsvp" href="#">RSVP</a>`:''}
        <a class="nn-plate" data-go="loc" href="#">${en?'Location':'Lokasi'}</a></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-neon2${th.c.day?' nn-day':''}" style="--wall:${th.c.wall}"><div class="nn-wall"></div>
      <div class="nn-stage">${nnSign(o,19,82)}</div>
      <div class="nn-plq">${nnPlaque(`<p class="nn-pk">${ev(o,L)}</p><p class="nn-pd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${o.venue?`<p class="nn-pv">${esc(o.venue)}</p>`:''}`)}</div>
      <div class="nn-foot">${guest?`<p class="nn-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="nn-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('nn-day',!!th.c.day);el.style.setProperty('--wall',th.c.wall);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Rose-pink neon on aubergine plaster',c:{ground:'#140c10',sheet:'#1d1418',ink:'#f2e6ea',accent:'#ff5fa8',gold:'#ffd9a8',wall:'#3a2530',pagefg:'#efe2e6',cover:'#ff5fa8'}},
    {k:'biru',n:'Biru',desc:'Ice-blue neon on charcoal concrete',c:{ground:'#0d0f13',sheet:'#171a20',ink:'#e6eef3',accent:'#6fdcff',gold:'#fff1d6',wall:'#2a2f37',pagefg:'#e4ecf1'}},
    {k:'ungu',n:'Ungu',desc:'Violet neon with an amber ampersand on plum plaster',c:{ground:'#130d17',sheet:'#1c1521',ink:'#efe7f3',accent:'#c58bff',gold:'#ffbf6b',wall:'#34253c',pagefg:'#ece3f0'}},
    {k:'hijau',n:'Hijau',desc:'Mint neon on bottle-green plaster',c:{ground:'#09130f',sheet:'#111c17',ink:'#e4f2eb',accent:'#5dffc0',gold:'#fff4dc',wall:'#1d3a30',pagefg:'#e2efe8'}},
    {k:'emas',n:'Emas',desc:'Warm-white neon on terracotta plaster',c:{ground:'#160d08',sheet:'#20150f',ink:'#f5eadf',accent:'#ffd38a',gold:'#ff8a66',wall:'#5a3222',pagefg:'#f3e7db'}},
    {k:'merah',n:'Merah',desc:'Red neon on black plaster',c:{ground:'#0b0909',sheet:'#151212',ink:'#f3e7e4',accent:'#ff4a4a',gold:'#ffe2d0',wall:'#2a2222',pagefg:'#efe3e0'}},
    {k:'kapur',n:'Kapur',desc:'Pink neon on a limewashed wall at first light',c:{ground:'#e6e1d8',sheet:'#f6f2ea',ink:'#2b262a',accent:'#f2387f',gold:'#2a9fd8',wall:'#e9e3d9',pagefg:'#2b262a',day:'1'}},
    {k:'nila',n:'Nila',desc:'Cyan neon with a pink ampersand on navy plaster',c:{ground:'#0a0f1b',sheet:'#121a2a',ink:'#e6edf8',accent:'#4fe6ff',gold:'#ff7ad9',wall:'#1d2944',pagefg:'#e4ebf6'}},
  ]});
