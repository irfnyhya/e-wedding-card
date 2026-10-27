/* lakaran (redesign): a fine pen-and-ink drawing of an old Malayan building (drawn from 1900s postcards), printed in a
   debossed plate mark on heavy cotton paper, under a sheet of tissue printed with the guest's name.
   Cover: tap "Buka Jemputan" and the tissue lifts away on its top edge, showing the drawing crisp.
   Page: the card with the drawing and the names set in old-style type. Skin: cotton cards with a plate-mark border. */
const LR_AR={boatquay:720/399,collyer:614/474,kl:720/459,masjid:720/461,pasar:720/443,pinang:720/502};
const lrPlate=(sk,cls='')=>`<div class="lr2-plate ${cls}"><i class="lr2-ink" style="--m:url(${A}sk-${sk}.webp);aspect-ratio:${LR_AR[sk]||1.5}"></i></div>`;
const lrRule=()=>`<svg class="lr2-rule" viewBox="0 0 120 8"><path d="M2 4H50M70 4H118" stroke="currentColor" stroke-width=".6"/><path d="M60 1L63 4L60 7L57 4Z" fill="none" stroke="currentColor" stroke-width=".6"/><circle cx="53" cy="4" r=".9" fill="currentColor"/><circle cx="67" cy="4" r=".9" fill="currentColor"/></svg>`;
FAMILY({key:'lakaran',name:'Lakaran',meaning:'Pen-and-ink sketch',
  blurb:'A fine pen-and-ink drawing of an old Malayan building, pressed into heavy cotton paper under a sheet of printed tissue that lifts away.',
  fonts:{d:"'IM Fell English SC', serif",s:"'IM Fell English', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-lakaran2${th.c.dark?' lr2-dkc':''}"><div class="lr2-desk"></div>
      <div class="lr2-card lr2-big reveal">${lrPlate(th.sk)}
        <p class="lr2-k kicker">${ev(o,L)}</p><h1 class="lr2-names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1>${lrRule()}
        <p class="lr2-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="lr2-ven">${esc(o.venue)}</p>`:''}</div>
      <a class="lr2-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-lakaran2${th.c.dark?' lr2-dkc':''}"><div class="lr2-desk"></div>
      <div class="lr2-card">${lrPlate(th.sk)}
        <div class="lr2-ct"><p class="lr2-k">${ev(o,L)}</p><p class="lr2-cn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p>${lrRule()}<p class="lr2-cd">${esc(fmtDate(o.date,o.lang))}</p></div>
        <div class="lr2-tissue"><div class="lr2-tt"><small>${ev(o,L)}</small><b>${esc(n1)} <span>&amp;</span> ${esc(n2)}</b>${guest?`<p class="lr2-tg"><small>${L.dear}</small><i>${esc(guest)}</i></p>`:''}</div></div>
      </div>
      <${tag} class="lr2-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('lr2-dk',!!th.c.dark);
    const others=Object.keys(LR_AR).filter(k=>k!==th.sk),w=$('[data-s="when"]',el);
    if(w&&!$('.lr2-vig',w)){const h=$('h2',w);h&&h.insertAdjacentHTML('beforebegin',`<div class="lr2-vig">${lrPlate(others[1])}</div>`)}
    $$('.sheet > .sec > h2',el).forEach(h=>{if(!h.nextElementSibling?.classList.contains('lr2-rule'))h.insertAdjacentHTML('afterend',lrRule())});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    // [key, name, desc, desk, paper, ink, accent, sketch, dark]
    ...[['gading','Gading','Sepia ink, Sultan Abdul Samad building, on oak','#cdbfa8','#f8f3e8','#3a2c20','#7a5a2a','kl'],
    ['nila','Nila','Indigo ink, a mosque pavilion, on midnight','#1c2539','#f5f6f4','#1d2b4a','#1d2b4a','masjid',1],
    ['marun','Marun','Maroon ink, Penang shore, on rosewood','#d8c3bc','#faf4ef','#5a1524','#7a1b29','pinang'],
    ['zamrud','Zamrud','Green ink, Collyer Quay, on sage','#c3cbbd','#f6f7f1','#0f3d2e','#0f3d2e','collyer'],
    ['jambu','Merah Jambu','Rose ink, Sultan Abdul Samad building, on blush','#e3cfcb','#fdf6f4','#6e3242','#a3465f','kl'],
    ['sage','Sage','Olive ink, a mosque pavilion, on sage','#cfd3c4','#f7f8f2','#3e4a38','#55654b','masjid'],
    ['hitam','Hitam','Black ink, Boat Quay, on charcoal','#262422','#f4f1ea','#161414','#161414','boatquay',1],
    ['terakota','Terakota','Rust ink, Penang shore, on clay','#d9c2b0','#faf3ea','#6b2e1c','#a24a22','pinang'],
    ].map(([k,n,desc,ground,sheet,ink,accent,sk,dark])=>({k,n,desc,c:{ground,sheet,ink,accent,gold:accent,pagefg:dark?'#f1ede4':ink,dark:dark?1:0},extra:{sk}}))]});
