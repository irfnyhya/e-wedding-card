/* hibiskus: "Bunga Sepatu". A fanned stack of three pieces lying on silk beside a strand of pearls: a cotton card
   printed with a hand-coloured botanical hibiscus plate (public domain) bleeding off its corner, a vellum sheet under it,
   and a deckled, colour-dyed card at the back whose peeking edge carries the guest's name. A wax seal holds the stack.
   Cover: break the seal ("Buka Jemputan") and the three pieces fan apart.
   Page: the pieces laid out: the plate card with the names, the vellum with the time and place, the dyed card with links.
   Skin: cream cards with a dyed edge and a small engraved hibiscus, script headings. */
needFont('Great+Vibes');
const hibV=c=>`--flt:${c.flt};--back:${c.back}`;
const hbsDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const hbsNames=(o,cls='')=>{const [n1,n2]=coverNames(o);return `<h1 class="hbs-names ${cls}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
const hbsDate=o=>{if(!o.date)return'';const [y,m,d]=o.date.split('-');return `<p class="hbs-date"><span>${esc(hbsDay(o))}</span><b>${d}</b><i></i><b>${m}</b><i></i><b>${y}</b></p>`};
const hbsFl=cls=>`<img class="hbs-fl ${cls}" src="${A}flower-hibiscus.webp" alt="">`;

FAMILY({key:'hibiskus',name:'Bunga Sepatu',meaning:'Fanned hibiscus stack',
  blurb:'A stack of three pieces on silk: a cotton card printed with a hand-coloured hibiscus plate, a vellum sheet and a dyed deckled card, held by a wax seal. Break the seal and they fan apart.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const c=th.c,en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section style="${hibV(c)}" class="page pg-hibiskus ${c.dark?'hbs-dk':''}"><div class="hbs-silk"></div>
      <img class="hbs-pearls" src="${A}pd-obj-pearls.webp" alt="">
      <div class="hbs-main reveal"><div class="hbs-face">${hbsFl('pg')}
        ${o.bismillah?`<p class="hbs-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="hbs-k kicker">${ev(o,L)}</p>${hbsNames(o)}${hbsDate(o)}
        ${o.hijri?`<p class="hbs-hj">${esc(o.hijri)}</p>`:''}</div></div>
      <div class="hbs-low">
        <div class="hbs-cor reveal d2"><a data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}</div>
        <div class="hbs-vel reveal d1">${t?`<p class="hbs-time">${esc(t)}</p>`:''}${o.venue?`<a href="#" class="hbs-ven" data-go="loc">${esc(o.venue)}</a>`:''}</div>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div style="${hibV(c)}" class="cover cv-hibiskus ${c.dark?'hbs-dk':''}"><div class="hbs-silk"></div>
      <img class="hbs-pearls" src="${A}pd-obj-pearls.webp" alt="">
      <div class="hbs-stack">
        <div class="hbs-c hbs-c3"><div class="hbs-face"><p class="hbs-to">${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:`<b>${esc(ev(o,L))}</b>`}</p></div></div>
        <div class="hbs-c hbs-c2"></div>
        <div class="hbs-c hbs-c1"><div class="hbs-face">${hbsFl('cv')}<p class="hbs-k">${ev(o,L)}</p>${hbsNames(o,'cv')}${hbsDate(o)}${o.venue?`<p class="hbs-cven">${esc(o.venue)}</p>`:''}</div></div>
      </div>
      <${tag} class="hbs-seal" ${attr}><img src="${A}seal-${c.seal}.webp" alt=""><span>${en?'Open invitation':'Buka Jemputan'}</span></${tag}>
    </div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--flt',th.c.flt);el.style.setProperty('--back',th.c.back);el.classList.toggle('hbs-dk',!!th.c.dark);
    el.style.setProperty('--hbs-eng',`url(${A}eng-hibiscus.webp)`);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Hibiscus plate, coral card, ivory silk',c:{ground:'#efe3d6',sheet:'#fdf8ef',ink:'#3b2a24',accent:'#b8323a',gold:'#c39a6e',pagefg:'#3b2a24',back:'#d9614f',seal:'merah',flt:'saturate(1)'}},
    {k:'jambu',n:'Jambu',desc:'Hibiscus plate, blush card, pink silk',c:{ground:'#f3e0e0',sheet:'#fef9f5',ink:'#3e2a2f',accent:'#b23f66',gold:'#c7998a',pagefg:'#3e2a2f',back:'#e7a3b4',seal:'emas',flt:'saturate(1)'}},
    {k:'karang',n:'Karang',desc:'Hibiscus plate, apricot card, warm silk',c:{ground:'#f3e2cf',sheet:'#fef8ee',ink:'#3c2b22',accent:'#c0502f',gold:'#c79a68',pagefg:'#3c2b22',back:'#ef9a6e',seal:'emas',flt:'saturate(1)'}},
    {k:'kuning',n:'Kuning',desc:'Saffron card, white hibiscus plate, honey silk',c:{ground:'#f1e6c8',sheet:'#fefaee',ink:'#3a3022',accent:'#a8471f',gold:'#c39a55',pagefg:'#3a3022',back:'#e8b64a',seal:'merah',flt:'saturate(1)'}},
    {k:'putih',n:'Putih',desc:'Hibiscus plate, sage card, sage silk',c:{ground:'#e1e6da',sheet:'#fdfcf6',ink:'#2f3530',accent:'#8e3a4a',gold:'#a6a07c',pagefg:'#2f3530',back:'#c3cdb6',seal:'sage',flt:'saturate(.55) brightness(1.04)'}},
    {k:'ungu',n:'Ungu',desc:'Hibiscus plate, lilac card, lilac silk',c:{ground:'#ebe0ea',sheet:'#fdf8fb',ink:'#382a36',accent:'#8e2f78',gold:'#b69aa8',pagefg:'#382a36',back:'#c595c2',seal:'gading',flt:'saturate(1)'}},
    {k:'hijau',n:'Hijau Daun',desc:'Hibiscus plate on deep leaf-green silk',c:{ground:'#203a2d',sheet:'#fdf7ec',ink:'#3b2a24',accent:'#b8323a',gold:'#c9a46a',pagefg:'#f1ebdc',back:'#3f6a4c',seal:'emas',flt:'saturate(1)',dark:1}},
    {k:'malam',n:'Malam',desc:'Hibiscus plate on black silk, gold seal',c:{ground:'#141114',sheet:'#fbf4ec',ink:'#33221f',accent:'#a82a36',gold:'#cfa47c',pagefg:'#f1e6dc',back:'#7a1f2b',seal:'emas',flt:'saturate(1)',dark:1}},
  ]});
