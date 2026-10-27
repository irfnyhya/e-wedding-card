/* catair (redesign): a folded cold-press watercolour card with a real botanical plate (Redouté and friends, public domain)
   painted onto the front, lying on a linen tablecloth.
   Cover: tap "Buka Jemputan" and the front of the card swings open on its fold to show the inside.
   Page: the open card laid flat, the plate bleeding off its corner. Skin: deckled cold-press cards with a small painted sprig. */
const caFl=(n,cls,style='')=>`<img class="ca2-fl ${cls}" src="${A}flower-${n}.webp" alt="" style="${style}">`;
FAMILY({key:'catair',name:'Cat Air',meaning:'Watercolour',
  blurb:'A folded watercolour card with a painted botanical plate, lying on linen. Guests open it on its fold like a real greeting card.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',[f1,f2]=th.fl;
    return `<section class="page pg-catair2"><div class="ca2-linen"></div>
      <div class="ca2-sheet reveal">${caFl(f1,'ca2-pf1')}${caFl(f2,'ca2-pf2')}
        <div class="ca2-txt"><p class="ca2-k kicker">${ev(o,L)}</p><h1 class="ca2-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="ca2-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="ca2-ven">${esc(o.venue)}</p>`:''}</div></div>
      <div class="ca2-acts reveal d2"><a class="ca2-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',[f1,f2]=th.fl,d=esc(fmtShort(o.date)).replace(/\./g,' · ');
    return `<div class="cover cv-catair2${th.c.dark?' ca2-dark':''}"><div class="ca2-linen"></div>
      ${guest?`<p class="ca2-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
      <div class="ca2-card">
        ${th.c.dark?'':caFl(f2,'ca2-sprig')}
        <div class="ca2-inside"><div class="ca2-txt"><p class="ca2-k">${ev(o,L)}</p><p class="ca2-cn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="ca2-cd">${d}</p></div></div>
        <div class="ca2-front"><div class="ca2-face"><i class="ca2-plate" style="background-image:url(${A}flower-${f1}.webp)"></i>
          <div class="ca2-ftxt"><p class="ca2-k">${ev(o,L)}</p><p class="ca2-fn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="ca2-cd">${d}</p></div></div><div class="ca2-back"></div></div>
      </div>
      <${tag} class="ca2-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--sprig',`url(${A}flower-${th.fl[1]}.webp)`);el.classList.toggle('ca2-dk',!!th.c.dark);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    // [key, name, desc, linen, paper, ink, accent, gold, plates, dark]
    ...[['raya','Bunga Raya','Hibiscus and pink roses on blush linen','#e9dcd6','#fffaf5','#4a3437','#a3465f','#c08a98',['hibiscus','pink-rose']],
    ['teratai','Teratai','Water lilies and forget-me-nots on mist linen','#dde3e6','#fbfcfc','#2d3a4c','#3c5f8a','#8ea4c2',['lotus','forget-me-not']],
    ['taman','Taman','Anemones and wild roses on oat linen','#e6dfd2','#fffdf6','#3b3027','#9c3a2e','#c79a6a',['anemones','wild-rose']],
    ['ungu','Ungu Senja','Irises and anemones on lilac-grey linen','#e2dee8','#fcfbfd','#3a3349','#5d4a8a','#a99cc8',['iris','anemones']],
    ['terakota','Terakota','Wild rose and anemone, terracotta type','#ead9cc','#fffaf4','#3a2d26','#b5593b','#c98d6a',['wild-rose','anemones']],
    ['biru-lembut','Biru Lembut','Forget-me-nots on dusty blue linen','#dbe2e8','#f9fbfc','#2e3946','#56708f','#93a8bf',['forget-me-not','iris']],
    ['sage','Sage','White roses on sage linen','#dfe2d6','#fbfbf6','#2f352b','#5f6d55','#a3ac8f',['white-roses','jasmine']],
    ['merah','Merah','Red roses on burgundy linen','#4a1a24','#fffaf6','#3a2025','#6b1a2a','#c9a47a',['red-rose','blush-rose'],1],
    ['champagne','Champagne','Blush roses on champagne linen','#e8dfcf','#fdf8ef','#3b3226','#8f7340','#c2a46a',['blush-rose','cabbage-rose']],
    ['nila','Nila','Iris and lotus on navy linen','#1e2840','#fafbfd','#22293a','#1d2b4a','#c2a66a',['iris','lotus'],1],
    ['raya-putih','Melati','Jasmine and hibiscus on ivory linen','#e4e2d6','#fffdf8','#2b3a30','#2e4637','#b49a5e',['jasmine','hibiscus']],
    ['mauve','Mauve Zaitun','Anemones and blush roses on mauve linen','#dccdcf','#fbf6f5','#3b2e33','#6e4a5a','#b39a6a',['anemones','blush-rose']],
    ['pic','Pic Sage','Wild and white roses on peach linen','#efdccd','#fffaf4','#3a2e27','#b4603f','#c99b6a',['wild-rose','white-roses']],
    ['kunyit','Kunyit Nila','Anemones and cabbage roses on turmeric linen','#e7d6ad','#fffaf0','#33291f','#a24a22','#c99a3a',['anemones','cabbage-rose']],
    ['lavender','Lavender Arang','Iris and forget-me-nots on charcoal linen','#33323a','#f8f6fb','#2e2b38','#6f62a8','#cfc3a2',['iris','forget-me-not'],1],
    ['karang','Teal Karang','Lotus and pink rose on coral linen','#ecd5c8','#fffaf6','#22302f','#0f6b6b','#d9a07a',['lotus','pink-rose']],
    ['pandan','Pandan','Jasmine and white roses on pandan linen','#203a2e','#fbf8ee','#26332b','#0d4a32','#d6b45a',['jasmine','white-roses'],1],
    ['kopi','Kopi Susu','Cabbage and wild roses on latte linen','#d9c8b3','#fbf6ee','#3a2c22','#6b4a3a','#b08a5a',['cabbage-rose','wild-rose']],
    ['hujan','Biru Hujan','Forget-me-nots and iris on rain-grey linen','#d5dbe0','#f8fafb','#26303a','#3a5570','#a9a28c',['forget-me-not','iris']],
    ['fajar','Fajar','Pink rose and hibiscus on dawn linen','#f0dcd2','#fffaf6','#3e2a30','#a3465f','#d9a16a',['pink-rose','hibiscus']],
    ].map(([k,n,desc,ground,sheet,ink,accent,gold,fl,dark])=>({k,n,desc,c:{ground,sheet,ink,accent,gold,pagefg:dark?'#f6f1ea':ink,dark:dark?1:0},extra:{fl}}))]});
