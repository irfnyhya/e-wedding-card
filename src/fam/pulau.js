/* pulau: "Pulau Bunga". A heavy folded card printed like a fine-art plate: Childe Hassam's island garden (public domain)
   tipped in under four gilt photo corners inside a debossed plate mark, the names set large in a Didone below it and
   the guest's name pencilled under the plate as a printmaker signs an edition. The card fills the screen.
   Cover: tap "Buka Jemputan" and the front of the card swings open on its fold.
   Page: the inside of the fold, a strip of the painting along the spine, a big Didone date.
   Skin: plate-marked cards, Didone headings with a roman section number. */
const pulDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const PUL_ROM=['i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii'];
const pulEd=o=>{if(!o.date)return'';const [y,m,d]=o.date.split('-');return `${+d} · ${PUL_ROM[(+m)-1]||''} · ${y}`};
const pulNum=o=>{if(!o.date)return'';const [,m,d]=o.date.split('-');return `${d}<i>·</i>${m}`};
const pulNames=(o,cls='')=>{const [n1,n2]=coverNames(o);return `<h1 class="pul-names ${cls}"><span>${esc(n1)}</span><span><i>&amp;</i>${esc(n2)}</span></h1>`};
const pulCorners='<i class="pul-c tl"></i><i class="pul-c tr"></i><i class="pul-c bl"></i><i class="pul-c br"></i>';

const pulV=c=>`--stock:${c.stock}`;
FAMILY({key:'pulau',name:'Pulau Bunga',meaning:'Fine-art plate card',
  blurb:'A heavy folded card printed like a fine-art plate: an island flower garden painting under gilt photo corners, the names set large in a Didone and the guest’s name pencilled beneath. The front swings open on its fold.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section style="${pulV(th.c)}" class="page pg-pulau ${th.c.dark?'pul-dk':''}"><div class="pul-stock"></div><div class="pul-strip"></div><div class="pul-flap"></div>
      <div class="pul-in">
        ${o.bismillah?`<p class="pul-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="pul-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${pulNames(o)}</div>
        <div class="pul-big reveal d1"><b>${pulNum(o)}</b><span>${esc(pulDay(o))}<br>${esc((o.date||'').slice(0,4))}</span></div>
        ${o.hijri?`<p class="pul-hj reveal d2">${esc(o.hijri)}</p>`:''}
        <div class="pul-meta reveal d2">${t?`<p><small>${en?'Time':'Masa'}</small>${esc(t)}</p>`:''}${o.venue?`<p><small>${en?'Venue':'Tempat'}</small><a href="#" data-go="loc">${esc(o.venue)}</a></p>`:''}</div>
        <div class="pul-pills reveal d3"><a class="pul-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="pul-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div style="${pulV(th.c)}" class="cover cv-pulau ${th.c.dark?'pul-dk':''}"><div class="pul-inside"></div>
      <div class="pul-front"><div class="pul-stock"></div><i class="pul-spine"></i>
        <div class="pul-head"><p class="pul-k">${ev(o,L)}</p><p class="pul-no">No. ${esc(fmtShort(o.date).slice(0,5).replace('.','·'))}</p></div>
        <div class="pul-mark"><div class="pul-plate"></div>${pulCorners}</div>
        <div class="pul-pencil"><span>${guest?`${en?'for':'untuk'} ${esc(guest)}`:esc(ev(o,L))}</span><span>${esc(pulEd(o))}</span></div>
        ${pulNames(o,'cv')}
        <div class="pul-foot">${o.venue?`<p class="pul-cven">${esc(o.venue)}</p>`:'<p></p>'}<${tag} class="pul-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
      </div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--stock',th.c.stock);el.classList.toggle('pul-dk',!!th.c.dark);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'laut',n:'Laut',desc:'Ivory stock, sea-teal Didone',c:{ground:'#efe9dc',sheet:'#fbf8f0',ink:'#2a3436',accent:'#1f5d68',gold:'#b39a68',pagefg:'#2a3436',stock:'#f4efe3'}},
    {k:'pagi',n:'Pagi',desc:'Mist-blue stock, slate type',c:{ground:'#dfe6ea',sheet:'#fbfcfc',ink:'#273440',accent:'#2f5878',gold:'#a8997a',pagefg:'#273440',stock:'#e3eaee'}},
    {k:'senja',n:'Senja',desc:'Blush stock, rosewood type',c:{ground:'#f0dfd6',sheet:'#fffaf6',ink:'#3a2c2c',accent:'#8a4a52',gold:'#c39b7a',pagefg:'#3a2c2c',stock:'#f3e2d9'}},
    {k:'pasir',n:'Pasir',desc:'Sand stock, olive type',c:{ground:'#e3d6bd',sheet:'#fdf9ef',ink:'#36301f',accent:'#5a6a3a',gold:'#b08a52',pagefg:'#36301f',stock:'#e9dcc2'}},
    {k:'nila',n:'Nila',desc:'Indigo stock, ivory type, gilt corners',c:{ground:'#1c2a44',sheet:'#223252',ink:'#ece8de',accent:'#f2ecdf',gold:'#c8ab6e',pagefg:'#ece8de',stock:'#1f2f4d',dark:1}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald stock, ivory type',c:{ground:'#123a33',sheet:'#18453c',ink:'#ebeee6',accent:'#f1eee2',gold:'#c6aa6a',pagefg:'#ebeee6',stock:'#164139',dark:1}},
    {k:'karang',n:'Karang',desc:'Coral stock, deep red type',c:{ground:'#e6b3a2',sheet:'#fdf5f1',ink:'#3a2420',accent:'#8e3a30',gold:'#b8805e',pagefg:'#3a2420',stock:'#ebbcab'}},
    {k:'malam',n:'Malam',desc:'Black stock, gilt and ivory',c:{ground:'#121418',sheet:'#1c1f24',ink:'#ebe6da',accent:'#efe7d4',gold:'#c9ab6a',pagefg:'#ebe6da',stock:'#16191d',dark:1}},
  ]});
