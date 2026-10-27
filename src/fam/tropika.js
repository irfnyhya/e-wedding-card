/* tropika: "Taman Tropika". A tall, tea-length cotton card with deckled, edge-painted sides, slid into a frosted vellum
   sleeve and laid over Childe Hassam's lush water garden (public domain). A kraft tag hangs from the sleeve on a
   cotton string, lettered with the guest's name; the tag is the button.
   Cover: pull the tag and the vellum sleeve slides down off the card.
   Page: the card out of its sleeve over the garden, the sleeve and tag lying beside it.
   Skin: deckled cotton cards with a painted edge, italic headings over a fine rule, the garden behind. */
const trkDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const trkMon=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':MONTHS[o.lang][d.getMonth()]};
const trkD=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':String(d.getDate())};
const trkY=o=>(o.date||'').slice(0,4);
const trkNames=(o,cls='')=>{const [n1,n2]=coverNames(o);return `<h1 class="trk-names ${cls}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
// the big date: day numeral with the month and year set beside it
const trkDate=o=>`<div class="trk-dt"><b>${esc(trkD(o))}</b><span><em>${esc(trkDay(o))}</em><small>${esc(trkMon(o))}</small><small>${esc(trkY(o))}</small></span></div>`;
// a blind-embossed monogram roundel: a ring of dots and the initials, pressed into the cotton
const trkMono=o=>{const [a,b]=K.initials(o);const dots=K.ring(36,27,30,30).map(([x,y])=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r=".7"/>`).join('');
  return `<span class="trk-mono"><svg ${NS} viewBox="0 0 60 60"><g fill="currentColor">${dots}</g><circle cx="30" cy="30" r="23.5" fill="none" stroke="currentColor" stroke-width=".6"/></svg><b>${esc(a)}<i>&amp;</i>${esc(b)}</b></span>`};
const trkTag=(L,guest,en)=>`<span class="trk-tagp"><span class="trk-hole"></span>${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:''}<em>${en?'Open invitation':'Buka Jemputan'}</em></span>`;

const troV=c=>`--edge:${c.edge};--veil:${c.veil}`;
FAMILY({key:'tropika',name:'Taman Tropika',meaning:'Garden card in vellum',
  blurb:'A tall deckled cotton card in a frosted vellum sleeve, laid over a lush painted water garden. Guests pull the kraft tag and the sleeve slides away.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section style="${troV(th.c)}" class="page pg-tropika ${th.c.dark?'trk-dk':''}"><div class="trk-paint"></div><div class="trk-veil"></div>
      <div class="trk-sleeve lay"></div>
      <div class="trk-card big reveal"><div class="trk-face">
        ${o.bismillah?`<p class="trk-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="trk-k kicker">${ev(o,L)}</p>
        ${trkNames(o)}
        <span class="trk-rule"></span>
        ${trkDate(o)}
        ${o.hijri?`<p class="trk-hj">${esc(o.hijri)}</p>`:''}
        ${t?`<p class="trk-time">${esc(t)}</p>`:''}
        ${o.venue?`<a href="#" class="trk-ven" data-go="loc">${esc(o.venue)}</a>`:''}
        <div class="trk-links"><a data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">${en?'RSVP':'Sahkan Kehadiran'}</a>`:''}</div>
      </div></div>
      <span class="trk-tag lay reveal d2"><span class="trk-tagp"><span class="trk-hole"></span><small>${en?'Kindly reply':'Mohon jawab'}</small><b>RSVP</b></span></span>
    </section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div style="${troV(th.c)}" class="cover cv-tropika ${th.c.dark?'trk-dk':''}"><div class="trk-paint"></div><div class="trk-veil"></div>
      <div class="trk-stage">
        <div class="trk-pack"><div class="trk-card"><div class="trk-face">
          <p class="trk-k">${ev(o,L)}</p>
          ${trkNames(o,'cv')}
          <span class="trk-rule"></span>
          ${trkDate(o)}
          ${trkMono(o)}
        </div></div>
        <div class="trk-sleeve"><i></i>${o.venue?`<p class="trk-cven">${esc(o.venue)}</p>`:''}</div></div>
        <svg class="trk-string" ${NS} viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M2 2C30 6 48 30 62 58C70 74 76 86 80 96" fill="none" stroke-width="1.1"/><path d="M2 2C14 0 22 6 26 14" fill="none" stroke-width="1.1"/></svg>
        <${tag} class="trk-tag" ${attr}>${trkTag(L,guest,en)}</${tag}>
      </div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--edge',th.c.edge);el.style.setProperty('--veil',th.c.veil);el.classList.toggle('trk-dk',!!th.c.dark);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}));
    const rt=$('.pg-tropika .trk-tag',el);if(rt){const s=$('[data-s="rsvp"]',el);if(s)rt.addEventListener('click',()=>sc&&sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'}));else rt.remove()}},
  themes:[
    {k:'hijau',n:'Hijau Daun',desc:'Cotton card, leaf-green painted edge',c:{ground:'#1f3a2a',sheet:'#fbf9f1',ink:'#26322b',accent:'#24503a',gold:'#9c8a55',pagefg:'#eef1e6',edge:'#2f6a46',veil:'rgba(20,40,25,.18)'}},
    {k:'putih',n:'Putih',desc:'White cotton, pale celadon edge',c:{ground:'#dfe6dc',sheet:'#ffffff',ink:'#2b332d',accent:'#2f5a42',gold:'#a3946a',pagefg:'#2b332d',edge:'#a8c4ad',veil:'rgba(240,245,238,.18)'}},
    {k:'zamrud',n:'Zamrud',desc:'Cotton card, emerald edge',c:{ground:'#0f3a35',sheet:'#fbfcf8',ink:'#203330',accent:'#11524a',gold:'#a9965e',pagefg:'#e8f0ea',edge:'#11524a',veil:'rgba(8,40,36,.4)'}},
    {k:'krim',n:'Krim',desc:'Cream card, olive edge',c:{ground:'#e8dfcb',sheet:'#fcf8ec',ink:'#33301f',accent:'#4a5a2c',gold:'#b08a4c',pagefg:'#33301f',edge:'#8a9a58',veil:'rgba(240,228,200,.15)'}},
    {k:'malam',n:'Malam',desc:'Forest-black card, gold type',c:{ground:'#0b1310',sheet:'#16241d',ink:'#ece8d6',accent:'#dcc58c',gold:'#c2a464',pagefg:'#ece8d6',edge:'#c2a464',veil:'rgba(4,10,8,.55)',dark:1}},
    {k:'nila',n:'Nila',desc:'Cotton card, indigo edge',c:{ground:'#1c2b44',sheet:'#fcfcf8',ink:'#24303a',accent:'#22406a',gold:'#a3946a',pagefg:'#e9edf2',edge:'#2b4a7a',veil:'rgba(16,26,48,.38)'}},
    {k:'terakota',n:'Terakota',desc:'Cotton card, terracotta edge',c:{ground:'#a95c40',sheet:'#fdfaf4',ink:'#30281f',accent:'#8e4429',gold:'#b37a52',pagefg:'#fbf1e8',edge:'#b8603e',veil:'rgba(90,40,20,.25)'}},
    {k:'jambu',n:'Jambu',desc:'Cotton card, blush edge',c:{ground:'#efd8d0',sheet:'#fffdfa',ink:'#30282a',accent:'#9a4f5c',gold:'#c08f7c',pagefg:'#30282a',edge:'#e3a9a8',veil:'rgba(250,225,220,.18)'}},
  ]});
