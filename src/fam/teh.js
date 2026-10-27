/* teh: an afternoon-tea flat-lay shot from above. A Ming blue-and-white dish (Met Museum, public domain) used as the
   saucer, a porcelain cup of tea on it, a folded linen napkin in the colourway's colour, all on a linen cloth.
   Cover: tap "Buka Jemputan" and the dish slides away across the cloth. Page: a menu card with the names, the cup at its
   corner, a place card and a tea-bag tag that lead to the details and RSVP. Skin: paper cards ruled like a china band. */
needFont('Great+Vibes');
let thU=0;
// a porcelain cup seen from directly above: lip, inner wall in shade, tea with a window reflection, handle to the right
const thCup=()=>{const u=++thU;return `<svg class="th-cup" viewBox="0 0 120 100" aria-hidden="true"><defs>
  <radialGradient id="thl${u}" cx="45%" cy="40%" r="60%"><stop offset=".8" stop-color="#fdfcf9"/><stop offset="1" stop-color="#e4e0d8"/></radialGradient>
  <linearGradient id="thw${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfc9be"/><stop offset=".45" stop-color="#ece8e1"/><stop offset="1" stop-color="#fffefb"/></linearGradient>
  <radialGradient id="tht${u}" cx="56%" cy="58%" r="58%"><stop offset="0" stop-color="#8a4a1c"/><stop offset=".55" stop-color="#6a3310"/><stop offset=".9" stop-color="#43200a"/><stop offset="1" stop-color="#2e1606"/></radialGradient>
  <linearGradient id="thh${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffefb"/><stop offset=".6" stop-color="#ebe7df"/><stop offset="1" stop-color="#d2ccc1"/></linearGradient>
  <filter id="thb${u}"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
  <path d="M84 41c9-3 22-3 25 7s-8 15-24 12" fill="none" stroke="url(#thh${u})" stroke-width="6.5" stroke-linecap="round"/>
  <path d="M84 41c9-3 22-3 25 7s-8 15-24 12" fill="none" stroke="rgba(120,110,95,.35)" stroke-width=".5" transform="translate(0 3.1)"/>
  <circle cx="50" cy="50" r="41" fill="url(#thl${u})"/>
  <circle cx="50" cy="50" r="39.6" fill="none" stroke="var(--gold)" stroke-width=".7" opacity=".9"/>
  <circle cx="50" cy="50" r="37.8" fill="url(#thw${u})"/>
  <circle cx="50" cy="50" r="30.5" fill="url(#tht${u})"/>
  <path d="M22 44a30 30 0 0 1 34 -24.5a33 33 0 0 0 -34 24.5z" fill="rgba(0,0,0,.28)" filter="url(#thb${u})"/>
  <ellipse cx="41" cy="38" rx="11" ry="5" transform="rotate(-32 41 38)" fill="#fff6e8" opacity=".22" filter="url(#thb${u})"/>
  <circle cx="50" cy="50" r="30.2" fill="none" stroke="rgba(255,226,180,.45)" stroke-width=".6"/></svg>`};
const thDish=(cls='')=>`<div class="th-dish ${cls}"><img class="th-ming" src="${A}pd-asia-1.webp" alt="">${thCup()}</div>`;
const thFl=(th,style)=>th.c.dark?'':`<img class="th-fl" src="${A}flower-jasmine.webp" alt="" style="${style}">`;
FAMILY({key:'teh',name:'Petang Teh',meaning:'Afternoon tea',
  blurb:'An afternoon-tea table seen from above: a Ming blue-and-white dish, a cup of tea and a linen napkin. Open it and the dish slides away to the menu card.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-teh2"><div class="th-cloth"></div>
      ${thDish('th-pgdish')}
      <div class="th-menu reveal"><div class="th-mi">
        <p class="th-k kicker">${ev(o,L)}</p><h1 class="th-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="th-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="th-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<a class="th-ven" data-go="loc" href="#">${esc(o.venue)}</a>`:''}</div></div>
      <div class="th-pieces">
        <a class="th-place reveal d1" data-go="when" href="#"><small>${en?'Tap for':'Tekan untuk'}</small><b>${en?'Event details':'Butiran Majlis'}</b></a>
        ${o.x_rsvp?`<a class="th-tag reveal d2" data-go="rsvp" href="#"><i></i><b>RSVP</b><small>${en?'Kindly reply':'Sudi hadir?'}</small></a>`:''}
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-teh2" style="--nm:${th.c.nm||th.c.accent};--btn:${th.c.dark?'rgba(0,0,0,.25)':'rgba(255,255,255,.35)'}"><div class="th-cloth"></div>
      <div class="th-top"><p class="th-k">${ev(o,L)}</p><p class="th-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="th-d">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
      <div class="th-set">${thFl(th,'width:46%;left:-14%;top:-8%;transform:rotate(-24deg)')}<div class="th-nap"></div>${thDish()}</div>
      <div class="th-foot">${guest?`<p class="th-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="th-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('th-dark',!!th.c.dark);el.style.setProperty('--nap',th.c.nap);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Crimson napkin on a cream cloth',c:{ground:'#ebe3d6',sheet:'#fdf9f1',ink:'#33251f',accent:'#8e2430',gold:'#b8914a',pagefg:'#33251f',nap:'#8e2a33'}},
    {k:'hijau',n:'Hijau',desc:'Bottle-green napkin, oat linen',c:{ground:'#e6e2d5',sheet:'#fcfaf2',ink:'#25302a',accent:'#1f5040',gold:'#b8914a',pagefg:'#25302a',nap:'#2c5a48'}},
    {k:'biru',n:'Biru',desc:'Indigo napkin to match the porcelain',c:{ground:'#e3e5e4',sheet:'#fcfcf8',ink:'#232b3a',accent:'#23395f',gold:'#b29256',pagefg:'#232b3a',nap:'#2b3f66'}},
    {k:'jambu',n:'Jambu',desc:'Rose napkin on blush linen',c:{ground:'#f0e2dd',sheet:'#fffaf6',ink:'#3b2a2b',accent:'#a84a60',gold:'#b8915a',pagefg:'#3b2a2b',nap:'#d49aa3'}},
    {k:'kuning',n:'Kuning',desc:'Mustard napkin on wheat linen',c:{ground:'#ece4d0',sheet:'#fdfaf0',ink:'#33291b',accent:'#8a5f12',gold:'#b8923f',pagefg:'#33291b',nap:'#c9952e'}},
    {k:'laut',n:'Laut',desc:'Teal napkin on sea-glass linen',c:{ground:'#dce5e2',sheet:'#fbfcf8',ink:'#1f2f30',accent:'#24656b',gold:'#b29252',pagefg:'#1f2f30',nap:'#3f7b7e'}},
    {k:'hitam',n:'Hitam',desc:'Ivory napkin on a charcoal cloth',c:{ground:'#29241f',sheet:'#fbf6ec',ink:'#2a221c',accent:'#6a2a22',gold:'#cfa95c',pagefg:'#efe4d2',nap:'#ece3d2',nm:'#e6cf9e',dark:1}},
    {k:'ungu',n:'Ungu',desc:'Lilac napkin on a plum cloth',c:{ground:'#2e2334',sheet:'#fcf8f3',ink:'#2d2430',accent:'#5b3466',gold:'#c9a35a',pagefg:'#efe6f0',nap:'#b7a0c4',nm:'#dcc5e4',dark:1}},
  ]});
