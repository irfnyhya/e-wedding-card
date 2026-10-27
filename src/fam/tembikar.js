/* tembikar: "Biru Putih". A square keepsake box covered in blue-and-white Iznik tile paper (public domain), tied with
   ivory satin ribbon under a round letterpressed label with the names, lying on linen beside a Ming porcelain dish
   (public domain). A folded place card in front carries the guest's name and the button.
   Cover: tap "Buka Jemputan" and the lid lifts off the box.
   Page: the dish holding a round card with the names, a folded details card below it, the lid set aside.
   Skin: ivory cards edged with a strip of the tile paper, engraved roman headings between cobalt rules. */
const TBK_ROM=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
const tbkEd=o=>{if(!o.date)return'';const [y,m,d]=o.date.split('-');return `${+d} · ${TBK_ROM[(+m)-1]||''} · ${y}`};
const tbkDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const tbkNames=(o,cls='')=>{const [n1,n2]=coverNames(o);return `<h1 class="tbk-names ${cls}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
// the label's printed border: two cobalt rings and a ring of seed dots between them
const tbkRing=()=>{const dots=K.ring(64,45.6,50,50).map(([x,y])=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r=".55"/>`).join('');
  const ticks=K.ring(16,41.2,50,50).map(([x,y,a])=>`<path d="M${(50+Math.cos(a)*40.2).toFixed(2)} ${(50+Math.sin(a)*40.2).toFixed(2)}L${(50+Math.cos(a)*42.2).toFixed(2)} ${(50+Math.sin(a)*42.2).toFixed(2)}"/>`).join('');
  return `<svg class="tbk-ring" ${NS} viewBox="0 0 100 100"><g fill="none" stroke="currentColor"><circle cx="50" cy="50" r="48" stroke-width=".9"/><circle cx="50" cy="50" r="47" stroke-width=".3"/><circle cx="50" cy="50" r="43.4" stroke-width=".35"/><circle cx="50" cy="50" r="39.6" stroke-width=".3"/><g stroke-width=".45">${ticks}</g></g><g fill="currentColor">${dots}</g></svg>`};

const temV=c=>`--filt:${c.filt}`;
FAMILY({key:'tembikar',name:'Biru Putih',meaning:'Porcelain keepsake box',
  blurb:'A square keepsake box covered in blue-and-white tile paper and tied with ivory satin under a round letterpressed label, beside a Ming porcelain dish. The lid lifts off to open.',
  fonts:{d:"'Cinzel', serif",s:"'Cinzel', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section style="${temV(th.c)}" class="page pg-tembikar ${th.c.dark?'tbk-dk':''}"><div class="tbk-linen"></div>
      <div class="tbk-lidaside"><div class="tbk-paper"></div></div>
      <div class="tbk-dishwrap reveal"><div class="tbk-dish"></div><div class="tbk-round">${tbkRing()}<div class="tbk-rin">
        ${o.bismillah?`<p class="tbk-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="tbk-k kicker">${ev(o,L)}</p>${tbkNames(o)}</div></div></div>
      <div class="tbk-det reveal d2">
        <p class="tbk-date"><small>${esc(tbkDay(o))}</small>${esc(fmtDate(o.date,o.lang,false))}</p>
        ${o.hijri?`<p class="tbk-hj">${esc(o.hijri)}</p>`:''}
        ${t?`<p class="tbk-time">${esc(t)}</p>`:''}
        ${o.venue?`<a href="#" class="tbk-ven" data-go="loc">${esc(o.venue)}</a>`:''}
        <div class="tbk-pills"><a class="tbk-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="tbk-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div style="${temV(th.c)}" class="cover cv-tembikar ${th.c.dark?'tbk-dk':''}"><div class="tbk-linen"></div><div class="tbk-dish aside"></div>
      <div class="tbk-box"><div class="tbk-inner"></div>
        <div class="tbk-lid"><div class="tbk-paper"></div><i class="tbk-rib"></i><i class="tbk-rib h"></i><i class="tbk-rim"></i>
          <div class="tbk-round">${tbkRing()}<div class="tbk-rin"><p class="tbk-k">${ev(o,L)}</p>${tbkNames(o,'cv')}<p class="tbk-ed">${esc(tbkEd(o))}</p></div></div>
        </div></div>
      <div class="tbk-place"><div class="tbk-pin">${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:`<small>${esc(ev(o,L))}</small>`}
        <${tag} class="tbk-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>
    </div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--filt',th.c.filt);el.classList.toggle('tbk-dk',!!th.c.dark);
    const ph=$('.pg-tembikar .couple-ph.front',el),dw=$('.pg-tembikar .tbk-dishwrap',el);if(ph&&dw)dw.appendChild(ph);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'biru',n:'Biru Kobalt',desc:'Cobalt tile paper on porcelain-blue linen',c:{ground:'#d5dde8',sheet:'#fcfaf3',ink:'#1d2c55',accent:'#1b3a87',gold:'#1b3a87',pagefg:'#1a2a4a',filt:'saturate(1)'}},
    {k:'nila',n:'Nila',desc:'Cobalt box on deep navy linen',c:{ground:'#1b2850',sheet:'#fbf9f2',ink:'#1d2c55',accent:'#1d3d8c',gold:'#1d3d8c',pagefg:'#e7ebf4',filt:'saturate(1)'}},
    {k:'delft',n:'Delft',desc:'Soft delft blue on pale grey linen',c:{ground:'#e6e8ec',sheet:'#ffffff',ink:'#28344a',accent:'#3a62a8',gold:'#3a62a8',pagefg:'#28344a',filt:'saturate(.65) brightness(1.08)'}},
    {k:'tinta',n:'Tinta',desc:'Ultramarine box on cobalt linen',c:{ground:'#25389a',sheet:'#fbfaf5',ink:'#1b2266',accent:'#22309a',gold:'#22309a',pagefg:'#eef0fb',filt:'hue-rotate(10deg) saturate(1.35)'}},
    {k:'kabus',n:'Kabus',desc:'Misty grey-blue on oatmeal linen',c:{ground:'#dcdad2',sheet:'#fbf8ef',ink:'#2e3a4a',accent:'#4a6890',gold:'#4a6890',pagefg:'#2e3a4a',filt:'saturate(.4) brightness(1.06)'}},
    {k:'malam',n:'Malam',desc:'Porcelain white on a midnight box',c:{ground:'#0e1530',sheet:'#17244f',ink:'#e6ebf6',accent:'#eef2fa',gold:'#b9c8e6',pagefg:'#e8ecf6',dark:1,filt:'saturate(1.15) brightness(.88)'}},
    {k:'hijau',n:'Hijau Seladon',desc:'Celadon green tile paper on sage linen',c:{ground:'#dbe3d8',sheet:'#fbfaf3',ink:'#22332b',accent:'#2d6650',gold:'#2d6650',pagefg:'#22332b',filt:'hue-rotate(-85deg) saturate(.75)'}},
    {k:'jambu',n:'Merah Jambu',desc:'Rose tile paper on blush linen',c:{ground:'#f0dcdc',sheet:'#fdf9f5',ink:'#4a2532',accent:'#a8445f',gold:'#a8445f',pagefg:'#4a2532',filt:'hue-rotate(105deg) saturate(.85)'}},
  ]});
