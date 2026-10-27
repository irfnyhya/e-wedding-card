/* monoline ("Moden"): editorial minimal. A tone-on-tone card on paper of the same colour, the names set big in a light
   serif and staggered, a very large italic ampersand printed tone-on-tone behind them, one fine rule, and the details in
   small spaced caps. Lots of white space; the paper texture and a soft shadow do the rest.
   Cover: tap "Buka Jemputan" and the card lifts towards you and dissolves. Page: the same layout as a full sheet.
   Skin: plain cards, one fine rule over a light italic heading. */
needFont('Jost:wght@300;400;500;600');
const mlNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="mln-names"><span class="mln-n1">${esc(n1)}</span><span class="mln-n2">${esc(n2)}</span></${tag}>`};
FAMILY({key:'monoline',name:'Moden',meaning:'Editorial minimal',
  blurb:'Clean editorial stationery: the names set big in a light serif with a large tone-on-tone ampersand, one fine rule and small spaced caps on soft, same-colour paper.',
  fonts:{d:"'Jost', sans-serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const en=o.lang==='en';
    return `<section class="page pg-monoline"><div class="mln-paper"></div>
      <div class="mln-sheet mln-psheet reveal">
        <div class="mln-top"><span>${en?'Together with their families':'Bersama keluarga'}</span><span>${esc(fmtShort(o.date))}</span></div>
        <div class="mln-ph"></div>
        <div class="mln-body"><i class="mln-amp">&amp;</i>
          ${o.bismillah?'<p class="mln-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="mln-k kicker">${ev(o,L)}</p>${mlNames(o,'h1')}</div>
        <i class="mln-rule"></i>
        <div class="mln-meta"><p><b>${esc(fmtDate(o.date,o.lang))}</b>${o.hijri?`<span>${esc(o.hijri)}</span>`:''}</p>${o.venue?`<p class="mln-mv"><em>${esc(o.venue)}</em></p>`:''}</div></div>
      <a class="mln-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-monoline"><div class="mln-paper"></div>
      <div class="mln-sheet mln-csheet">
        <div class="mln-top"><span>${ev(o,L)}</span><span>${esc(fmtShort(o.date))}</span></div>
        <div class="mln-body"><i class="mln-amp">&amp;</i>${mlNames(o)}</div>
        <i class="mln-rule"></i>
        <div class="mln-meta"><p><b>${esc(fmtDate(o.date,o.lang))}</b></p>${o.venue?`<p class="mln-mv"><em>${esc(o.venue)}</em></p>`:''}</div></div>
      <div class="mln-foot">${guest?`<p class="mln-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="mln-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--onacc',th.c.sheet);
    const pg=$('.pg-monoline',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){img.removeAttribute('style');img.className='mln-photo';$('.mln-ph',pg).append(img);pg.classList.add('has-photo');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'kertas',n:'Kertas',desc:'Warm white on white',c:{ground:'#ebe7e0',sheet:'#f8f6f1',ink:'#2f2c28',accent:'#2f2c28',gold:'#a89f92',pagefg:'#2f2c28'}},
    {k:'batu',n:'Batu',desc:'Stone grey on grey',c:{ground:'#d7d6d2',sheet:'#ecebe8',ink:'#2d2e30',accent:'#3a3c40',gold:'#9a9a98',pagefg:'#2d2e30'}},
    {k:'pasir',n:'Pasir',desc:'Sand on sand',c:{ground:'#e2d6c4',sheet:'#efe6d8',ink:'#3d3226',accent:'#5a4632',gold:'#b29d80',pagefg:'#3d3226'}},
    {k:'sage',n:'Sage',desc:'Sage on sage',c:{ground:'#d3d8cb',sheet:'#e6eadf',ink:'#2c3327',accent:'#3f4a37',gold:'#99a38c',pagefg:'#2c3327'}},
    {k:'biru',n:'Biru',desc:'Powder blue on blue',c:{ground:'#d3dbe2',sheet:'#e7ecf0',ink:'#24303c',accent:'#2f4255',gold:'#91a1b1',pagefg:'#24303c'}},
    {k:'jambu',n:'Jambu',desc:'Blush on blush',c:{ground:'#ead8d2',sheet:'#f5ebe7',ink:'#43302d',accent:'#6e4640',gold:'#c0a39b',pagefg:'#43302d'}},
    {k:'arang',n:'Arang',desc:'Charcoal on charcoal',c:{ground:'#262626',sheet:'#323231',ink:'#ecebe7',accent:'#f2f0ea',gold:'#77756f',pagefg:'#ecebe7'}},
    {k:'nila',n:'Nila',desc:'Navy on navy',c:{ground:'#1b2433',sheet:'#263143',ink:'#e8eaee',accent:'#f1f2f5',gold:'#6f7b8f',pagefg:'#e8eaee'}},
  ]});
