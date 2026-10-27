/* ladang: a calm countryside card. An Impressionist field painting (Monet's poppies, Hassam's island garden; public
   domain) laid in as a soft watercolour band with ragged, bleeding edges, and a deckle-edged cotton card beneath it.
   Cover: tap "Buka Jemputan" and the two part: the painting lifts away, the card slides down.
   Page: the band across the top, the card below. Skin: deckle-edged cards, each with a thin strip of the painting. */
// watercolour band: a rectangle whose top and bottom edges are pushed about by noise, with a fainter outer bleed
const ldBand=seed=>{const f=(id,sc,b)=>`<filter id="${id}" x="-10%" y="-30%" width="120%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".022 .05" numOctaves="4" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="${sc}" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="${b}"/></filter>`;
  return svgUriSq(`<svg ${NS} viewBox="0 0 200 100" preserveAspectRatio="none"><defs>${f('a',16,1.4)}${f('b',26,4)}</defs>
    <rect x="-20" y="7" width="240" height="86" fill="#fff" fill-opacity=".4" filter="url(#b)"/><rect x="-20" y="12" width="240" height="76" fill="#fff" filter="url(#a)"/><rect x="-20" y="22" width="240" height="56" fill="#fff"/></svg>`)};
// deckled paper edge, used as a 9-slice mask so it holds at any card height
const LD_DECKLE=svgUriSq(`<svg ${NS} viewBox="0 0 120 120"><defs><filter id="d" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="3" seed="7"/><feDisplacementMap in="SourceGraphic" scale="3.4" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation=".35"/></filter></defs><rect x="5" y="5" width="110" height="110" fill="#000" filter="url(#d)"/></svg>`);
const ldNames=(o,cls)=>{const [n1,n2]=coverNames(o);return `<h1 class="ldg-names ${cls||''}"><span>${esc(n1)}</span><i>${o.lang==='en'?'and':'dan'}</i><span>${esc(n2)}</span></h1>`};
const ldDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const ldArt=(c,cls,seed)=>{const m=ldBand(seed);return `<div class="ldg-band ${cls}" style="-webkit-mask-image:${m};mask-image:${m}"><i class="ldg-art" style="background-image:url(${A}${c.art});background-position:${c.ap}"></i><i class="ldg-grain"></i></div>`};
// a small hand-ruled divider: a hairline with a seed head in the middle
const LD_RULE=`<svg class="ldg-rule" viewBox="0 0 140 12"><path d="M2 6H58M82 6H138"/><path d="M70 10.5V2.5M70 5.5L66.8 3M70 5.5L73.2 3M70 8L67 6M70 8L73 6"/><circle cx="70" cy="2" r="1"/></svg>`;
FAMILY({key:'ladang',name:'Ladang',meaning:'Countryside painting',
  blurb:'A calm, elegant card: a soft watercolour band of an Impressionist country field above a deckle-edged cotton card with the names in fine italic. The painting lifts away and the card slides down to open it.',
  fonts:{d:"'Marcellus', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1350,
  page(o,th,L){const en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-ladang">${ldArt(th.c,'top',9)}
      <div class="ldg-card" style="-webkit-mask-box-image:${LD_DECKLE} 14 / 14px stretch"><div class="ldg-body">
        ${o.bismillah?`<p class="ldg-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="ldg-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${ldNames(o)}</div>${LD_RULE}
        <p class="ldg-date reveal d2">${esc(ldDay(o))}<b>${esc(fmtDate(o.date,o.lang,false))}</b></p>${o.hijri?`<p class="ldg-hj reveal d2">${esc(o.hijri)}</p>`:''}
        <dl class="ldg-dl reveal d2">
          ${t?`<div><dt>${en?'Time':'Masa'}</dt><dd>${esc(t)}</dd></div>`:''}
          ${o.venue?`<div><dt>${en?'Venue':'Tempat'}</dt><dd>${esc(o.venue)}${o.address?`<small>${esc(o.address)}</small>`:''}</dd></div>`:''}
        </dl>
        <div class="ldg-pills reveal d3"><a class="ldg-pill" data-go="${o.x_rsvp?'rsvp':'when'}" href="#">${o.x_rsvp?(en?'Kindly reply':'Sahkan Kehadiran'):(en?'Event details':'Maklumat Majlis')}</a><a class="ldg-pill ghost" data-go="loc" href="#">${en?'Map':'Peta'}</a></div>
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-ladang">${ldArt(th.c,'cv',4)}
      <div class="ldg-card cv" style="-webkit-mask-box-image:${LD_DECKLE} 14 / 14px stretch"><div class="ldg-in">
        <p class="ldg-k">${ev(o,L)}</p>${ldNames(o,'sm')}${LD_RULE}
        <p class="ldg-date"><b>${esc(fmtShort(o.date)).replace(/\./g,' · ')}</b></p>${o.venue?`<p class="ldg-ven">${esc(o.venue)}</p>`:''}
        <div class="ldg-foot">${guest?`<p class="ldg-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="ldg-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
      </div></div>
    </div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--ldg-art',`url(${A}${th.c.art})`);el.style.setProperty('--ldg-ap',th.c.sp||th.c.ap);
    el.style.setProperty('--ldg-deckle',LD_DECKLE);el.style.setProperty('--ldg-band',ldBand(21));
    const pg=$('.pg-ladang',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const v=$('.ldg-band.top',pg);img.className='ldg-photo';img.removeAttribute('style');v.classList.add('has-photo');v.prepend(img);ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah Popi',desc:'Monet’s poppy field on cream cotton',c:{ground:'#ebe5da',sheet:'#fdfaf3',ink:'#36302a',accent:'#9a4a3c',gold:'#c9b294',pagefg:'#36302a',art:'pd-paint-monet-poppies.jpg',ap:'50% 80%',sp:'50% 45%'}},
    {k:'biru',n:'Biru Langit',desc:'Poppy field and summer sky, cool paper',c:{ground:'#e2e7ea',sheet:'#fbfcfb',ink:'#2a333b',accent:'#456682',gold:'#b5c0c6',pagefg:'#2a333b',art:'pd-paint-monet-poppies.jpg',ap:'50% 40%',sp:'50% 30%'}},
    {k:'pic',n:'Pic',desc:'Hassam’s island garden, peach paper',c:{ground:'#f1e4d8',sheet:'#fefaf5',ink:'#40302a',accent:'#a35f43',gold:'#d6b89e',pagefg:'#40302a',art:'pd-paint-hassam-island.jpg',ap:'50% 40%',sp:'50% 50%'}},
    {k:'hijau',n:'Hijau Padang',desc:'A green water meadow, sage paper',c:{ground:'#e2e7dc',sheet:'#fbfcf7',ink:'#2c372c',accent:'#4e6b49',gold:'#b5c1a6',pagefg:'#2c372c',art:'pd-paint-hassam-water.jpg',ap:'50% 35%',sp:'50% 40%'}},
    {k:'ungu',n:'Ungu Iris',desc:'Monet’s iris garden, lilac paper',c:{ground:'#e8e3ec',sheet:'#fcfafd',ink:'#342f42',accent:'#62558a',gold:'#c0b6cf',pagefg:'#342f42',art:'pd-paint-monet-irises.jpg',ap:'50% 55%',sp:'50% 60%'}},
    {k:'krim',n:'Krim',desc:'Poppies on warm cotton',c:{ground:'#ece4d3',sheet:'#fefbf2',ink:'#39322a',accent:'#7b5f3d',gold:'#ccb791',pagefg:'#39322a',art:'pd-paint-monet-poppies.jpg',ap:'50% 62%',sp:'50% 68%'}},
    {k:'kolam',n:'Kolam',desc:'A lily pond, mist blue paper',c:{ground:'#dfe6e6',sheet:'#fafcfb',ink:'#283436',accent:'#3f6a6d',gold:'#afc2c0',pagefg:'#283436',art:'pd-paint-hassam-water.jpg',ap:'50% 88%',sp:'50% 90%'}},
    {k:'malam',n:'Malam',desc:'Island garden on a deep slate ground',c:{ground:'#2d3338',sheet:'#fbf8f2',ink:'#2f2b27',accent:'#8a4a3a',gold:'#c4ad8f',pagefg:'#efe8de',art:'pd-paint-hassam-island.jpg',ap:'50% 30%',sp:'50% 40%'}},
  ]});
