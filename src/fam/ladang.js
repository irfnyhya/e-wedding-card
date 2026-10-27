/* ladang: an art-print card. An Impressionist field (Monet, Hassam; public domain) is printed full-bleed on matte cotton
   with a fine white keyline; the lower part of the print is covered by a heavy cream cotton sheet whose top edge has been
   torn by hand, so the white core of the paper shows along the rip. The names are set big in a modern Didone italic, the
   date as large numerals, the rest in a clean grotesk; a round rubber-stamp postmark with the date straddles the tear.
   Cover: tap "Buka Jemputan" and the torn sheet slides down off the print, which comes forward.
   Page: the painting across the top, the torn sheet below with the details on a ruled grid.
   Skin: cream cards with a torn top edge, grotesk caps headings with a swatch of the painting. */
needFont('Playfair+Display:ital,wght@0,400;0,500;1,400;1,500');
let ldN=0;
const ldDP=o=>{const d=new Date((o.date||'')+'T00:00:00');if(isNaN(d))return null;return {d:String(d.getDate()).padStart(2,'0'),m:String(d.getMonth()+1).padStart(2,'0'),y:d.getFullYear(),mon:MONTHS[o.lang][d.getMonth()],day:DAYS[o.lang][d.getDay()]}};
// a round rubber-stamp postmark: two rings, the date and place running round, initials in the middle
const ldStamp=o=>{const p=ldDP(o),id='ldgp'+(++ldN),[a,b]=K.initials(o);
  const ring=`${p?`${p.day} · ${p.d}.${p.m}.${p.y}`:''} · ${o.venue||''} · `.toUpperCase();
  return `<svg class="ldg-stamp" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="${id}" d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1 -86 0"/></defs>
    <circle cx="60" cy="60" r="56" class="r1"/><circle cx="60" cy="60" r="52.5" class="r2"/><circle cx="60" cy="60" r="33" class="r2"/>
    <text class="tp"><textPath href="#${id}" textLength="268" lengthAdjust="spacingAndGlyphs">${esc(ring.slice(0,60))}</textPath></text>
    <text x="60" y="66" class="mono">${esc(a)}&amp;${esc(b)}</text><path class="r2" d="M40 74H80M44 48H76"/></svg>`};
const ldTear=(cls,inner,after)=>`<div class="ldg-tear ${cls}"><i class="ldg-core"></i><div class="ldg-sheet">${inner}</div></div>${after||''}`;
const ldVars=c=>`--art:url(${A}${c.art});--ap:${c.ap};--az:${c.az||'cover'};--btnfg:${c.btnfg||'#fff'}`;
FAMILY({key:'ladang',name:'Ladang',meaning:'Torn art print',
  blurb:'An Impressionist field printed edge to edge, half covered by a hand-torn cotton sheet with the names, big date numerals and a round postmark. The sheet slides away to open it.',
  fonts:{d:"'Jost', sans-serif",s:"'Playfair Display', serif",b:"'Jost', sans-serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',c=th.c,[n1,n2]=coverNames(o),p=ldDP(o),t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-ladang${c.dark?' ldg-dk':''}" style="${ldVars(c)}"><i class="ldg-ground"></i>
      <div class="ldg-ptop"><i class="ldg-paint"></i><i class="ldg-key"></i></div>
      ${ldTear('pg reveal',`
        ${ldStamp(o)}
        ${o.bismillah?`<p class="ldg-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="ldg-k kicker">${ev(o,L)}</p>
        <h1 class="ldg-names names"><span>${esc(n1)}</span><span><i>&amp;</i> ${esc(n2)}</span></h1>
        ${p?`<div class="ldg-big"><b>${p.d}<i>.</i>${p.m}</b><span><em>${esc(p.day)}</em><em>${esc(p.mon)} ${p.y}</em>${o.hijri?`<em class="h">${esc(o.hijri)}</em>`:''}</span></div>`:''}
        <dl class="ldg-grid">
          ${t?`<div><dt>${en?'Time':'Masa'}</dt><dd>${esc(t)}</dd></div>`:''}
          ${o.venue?`<div><dt>${en?'Venue':'Tempat'}</dt><dd>${esc(o.venue)}${o.address?`<small>${esc(o.address)}</small>`:''}</dd></div>`:''}
        </dl>
        <div class="ldg-links"><a data-go="when" href="#">${en?'Details':'Butiran'}<i>→</i></a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP<i>→</i></a>`:''}<a data-go="loc" href="#">${en?'Map':'Lokasi'}<i>→</i></a></div>`)}
    </section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c,[n1,n2]=coverNames(o),p=ldDP(o);
    return `<div class="cover cv-ladang${c.dark?' ldg-dk':''}" style="${ldVars(c)}">
      <div class="ldg-print"><i class="ldg-paint"></i><i class="ldg-key"></i><p class="ldg-cap">${ev(o,L)}</p></div>
      ${ldTear('cv',`
        <p class="ldg-names"><span>${esc(n1)}</span><span><i>&amp;</i> ${esc(n2)}</span></p>
        ${p?`<div class="ldg-big"><b>${p.d}<i>.</i>${p.m}</b><span><em>${esc(p.day)}</em><em>${esc(p.mon)} ${p.y}</em>${o.venue?`<em class="v">${esc(o.venue)}</em>`:''}</span></div>`:''}
        <div class="ldg-foot">${guest?`<p class="ldg-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:'<p class="ldg-to"></p>'}<${tag} class="ldg-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}<i>→</i></${tag}></div>`,ldStamp(o))}
    </div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--art',`url(${A}${c.art})`);el.style.setProperty('--btnfg',c.btnfg||'#fff');el.classList.toggle('ldg-dk',!!c.dark);el.style.setProperty('--ap',c.sp||c.ap);
    const pg=$('.pg-ladang',el),ph=pg&&$('.couple-ph.front',pg),top=pg&&$('.ldg-ptop',pg);if(ph&&top){ph.classList.add('ldg-ph');top.appendChild(ph)}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah Popi',desc:'Monet’s poppy field on cream cotton',c:{ground:'#ebe5da',sheet:'#fbf7ef',ink:'#2f2a25',accent:'#a3402f',gold:'#c9b294',pagefg:'#2f2a25',art:'pd-paint-monet-poppies.jpg',ap:'45% 100%',az:'auto 150%',sp:'50% 85%'}},
    {k:'biru',n:'Biru Langit',desc:'Summer sky and poplars, cool paper',c:{ground:'#e2e7ea',sheet:'#fafbfa',ink:'#252e36',accent:'#3a5c7c',gold:'#b5c0c6',pagefg:'#252e36',art:'pd-paint-monet-poppies.jpg',ap:'50% 22%',sp:'50% 20%'}},
    {k:'pic',n:'Pic',desc:'Hassam’s island garden, peach paper',c:{ground:'#f1e4d8',sheet:'#fdf8f2',ink:'#3a2b25',accent:'#b0583a',gold:'#d6b89e',pagefg:'#3a2b25',art:'pd-paint-hassam-island.jpg',ap:'50% 40%',sp:'50% 50%'}},
    {k:'hijau',n:'Hijau Padang',desc:'A green water meadow, sage paper',c:{ground:'#e2e7dc',sheet:'#fafbf6',ink:'#27322a',accent:'#466a44',gold:'#b5c1a6',pagefg:'#27322a',art:'pd-paint-hassam-water.jpg',ap:'50% 35%',sp:'50% 40%'}},
    {k:'ungu',n:'Ungu Iris',desc:'Monet’s iris garden, lilac paper',c:{ground:'#e8e3ec',sheet:'#fbf9fc',ink:'#2f2a3c',accent:'#5d4f88',gold:'#c0b6cf',pagefg:'#2f2a3c',art:'pd-paint-monet-irises.jpg',ap:'50% 55%',sp:'50% 60%'}},
    {k:'krim',n:'Krim',desc:'Poppies on warm cotton',c:{ground:'#ece4d3',sheet:'#fdf9f0',ink:'#352e26',accent:'#8a5a2e',gold:'#ccb791',pagefg:'#352e26',art:'pd-paint-monet-poppies.jpg',ap:'70% 100%',az:'auto 200%',sp:'50% 90%'}},
    {k:'kolam',n:'Kolam',desc:'A lily pond, mist blue paper',c:{ground:'#dfe6e6',sheet:'#f9fbfa',ink:'#243133',accent:'#2f6468',gold:'#afc2c0',pagefg:'#243133',art:'pd-paint-hassam-water.jpg',ap:'30% 100%',az:'auto 190%',sp:'50% 90%'}},
    {k:'malam',n:'Malam',desc:'Island garden over torn slate-grey cotton',c:{ground:'#22272b',sheet:'#323a40',ink:'#f1ebe1',accent:'#f0a988',btnfg:'#2a2420',gold:'#c4ad8f',pagefg:'#eee7dc',art:'pd-paint-hassam-island.jpg',ap:'20% 10%',az:'auto 140%',sp:'50% 40%',dark:1}},
  ]});
