/* akuarel (redesign): an impressionist painting (Monet, Hassam, Hokusai; public domain) laid on cold-press paper as a loose
   wash that bleeds out into the white, wrapped with a woven silk rose ribbon (Met, CC0) and a small paper tag.
   Cover: tap the ribbon's tag ("Buka Jemputan"); the ribbon slips off and the card lifts towards the guest.
   Page: the painted card with the names set in a quiet italic. Skin: cold-press cards topped with a strip of the same wash. */
const aqWash=(th,cls='')=>`<div class="aq2-wash aq2-bleed ${cls}"><i style="background-image:url(${A}pd-paint-${th.pt}.jpg);background-position:${th.pos}"></i></div><div class="aq2-wash ${cls}"><i style="background-image:url(${A}pd-paint-${th.pt}.jpg);background-position:${th.pos}"></i></div>`;
FAMILY({key:'akuarel',name:'Akuarel',meaning:'Watercolour wash',
  blurb:'A painted garden bleeding across cold-press paper, wrapped in a silk rose ribbon. The ribbon slips off when guests open the card.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1350,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-akuarel2${th.c.dark?' aq2-dkc':''}"><div class="aq2-ground"></div>
      <div class="aq2-card aq2-big reveal">${aqWash(th)}
        <div class="aq2-txt"><p class="aq2-k kicker">${ev(o,L)}</p><h1 class="aq2-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="aq2-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="aq2-ven">${esc(o.venue)}</p>`:''}</div></div>
      <a class="aq2-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-akuarel2${th.c.dark?' aq2-dkc':''}"><div class="aq2-ground"></div>
      <div class="aq2-card">${aqWash(th)}
        <div class="aq2-txt"><p class="aq2-k">${ev(o,L)}</p><p class="aq2-cn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="aq2-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>
        ${guest?`<p class="aq2-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}</div>
        <${tag} class="aq2-band" ${attr}><span class="aq2-rib"></span><span class="aq2-tag">${en?'Open invitation':'Buka Jemputan'}</span></${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--paint',`url(${A}pd-paint-${th.pt}.jpg)`);el.style.setProperty('--ppos',th.pos);el.classList.toggle('aq2-dk',!!th.c.dark);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    // [key, name, desc, ground, ink, accent, wash tint, painting, position, dark]
    ...[['terakota','Terakota','Monet’s poppy field on terracotta','#efe1d5','#33261f','#9c4a30','#d98a6a','monet-poppies','50% 100%'],
    ['biru','Biru','Hokusai’s summer sky in indigo','#e2e7ee','#22293a','#1d3b6e','#8fa9cf','hokusai-fuji','50% 2%'],
    ['sage','Sage','Hassam’s water garden in sage','#e5e8dc','#2c3327','#3e5a3f','#b8c6a6','hassam-water','50% 28%'],
    ['lavender','Lavender','Monet’s irises at Giverny','#e9e5ef','#2f2a3c','#5d4a8a','#c7b8e6','monet-irises','50% 72%'],
    ['pic','Pic','Hassam’s poppies in peach','#f4e4da','#3a2a26','#a3465f','#f4b99b','hassam-island','50% 42%'],
    ['laut','Laut','Hassam’s lily pond on deep teal','#163636','#1f2f2f','#0f5656','#8cc5bd','hassam-water','50% 86%',1],
    ['pandan','Pandan','Hassam’s water garden in pandan green','#e3e7d8','#26302a','#0d4a32','#7fa36a','hassam-water','50% 55%'],
    ['kopi','Kopi Susu','Hassam’s poppies on walnut','#382a22','#33271f','#6b4a3a','#c9a982','hassam-island','50% 82%',1],
    ['hujan','Biru Hujan','Monet’s irises in rain-blue','#dfe4e9','#26303a','#3a5570','#6f8aa6','monet-irises','50% 22%'],
    ['fajar','Fajar','Hassam’s poppies at dawn','#f5e3dd','#3a2530','#a3465f','#f0a46c','hassam-island','50% 12%'],
    ].map(([k,n,desc,ground,ink,accent,wash,pt,pos,dark])=>({k,n,desc,c:{ground,sheet:'#fdfbf7',ink,accent,gold:wash,wash1:wash,pagefg:dark?'#f2eee6':ink,dark:dark?1:0},extra:{pt,pos}}))]});
