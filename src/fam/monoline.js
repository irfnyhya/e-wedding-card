/* monoline ("Moden"): an editorial suite of three cards on 700gsm stock of the same colour as the table, each edge
   painted in one strong colour. The main card is tall and narrow (DL), the date set as huge light grotesk numerals that
   are the ornament, the names in a fine italic serif; a details card is tucked behind it and a small place card with the
   guest's name and the button lies on top. Window light falls across the table.
   Cover: tap "Buka Jemputan": the stack fans apart and lifts away.
   Page: the suite laid out flat: the main card, and the details and RSVP cards (links) below it.
   Skin: plain cards with a painted edge, each section numbered with a big light numeral over spaced grotesk caps. */
needFont('Jost:wght@200;300;400;500;600');
const mlParts=o=>{const m=String(o.date||'').match(/^(\d{4})-(\d{2})-(\d{2})/);return m?[m[3],m[2],m[1]]:['00','00','0000']};
const mlNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="mln-names"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></${tag}>`};
const mlDay=o=>{const s=String(fmtDate(o.date,o.lang)||'');return esc(s.split(/[ ,]/)[0]||'')};
FAMILY({key:'monoline',name:'Moden',meaning:'Editorial suite',
  blurb:'An editorial suite of three tone-on-tone cards with painted edges: the date set huge as the ornament, the names in a fine italic, a place card with the guest\'s name on top. The stack fans apart to open.',
  fonts:{d:"'Jost', sans-serif",s:"'Cormorant Garamond', serif",b:"'Jost', sans-serif"},ms:1300,
  page(o,th,L){const en=o.lang==='en',[d,m,y]=mlParts(o);
    return `<section class="page pg-monoline${th.c.dark?' mln-dark':''}"><div class="mln-table"></div>
      <div class="mln-lay">
        <div class="mln-card mln-pmain reveal"><div class="mln-face">
          <div class="mln-top"><span>${en?'Together with their families':'Bersama keluarga'}</span><span>${y}</span></div>
          <div class="mln-ph"></div>
          <p class="mln-big"><b>${d}</b><b>${m}</b></p>
          ${o.bismillah?'<p class="mln-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="mln-k kicker">${ev(o,L)}</p>${mlNames(o,'h1')}
          <i class="mln-rule"></i>
          <div class="mln-meta"><p><b>${esc(fmtDate(o.date,o.lang))}</b>${o.hijri?`<span>${esc(o.hijri)}</span>`:''}</p>${o.venue?`<p class="mln-mv"><em>${esc(o.venue)}</em></p>`:''}</div></div></div>
        <div class="mln-pair">
          <a class="mln-card mln-mini mln-m1 reveal d2" data-go="when" href="#"><span class="mln-face"><small>01</small><b>${en?'Details':'Butiran'}</b><em>${en?'Time & place':'Masa & tempat'}</em></span></a>
          ${o.x_rsvp?`<a class="mln-card mln-mini mln-m2 reveal d3" data-go="rsvp" href="#"><span class="mln-face"><small>02</small><b>RSVP</b><em>${en?'Kindly reply':'Sudi hadir?'}</em></span></a>`:''}
        </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',[d,m,y]=mlParts(o);
    return `<div class="cover cv-monoline${th.c.dark?' mln-dark':''}"><div class="mln-table"></div>
      <div class="mln-card mln-c3"><div class="mln-face"><small>${en?'The details':'Butiran'}</small><b>${mlDay(o)}</b>${o.start?`<em>${esc(fmtTime(o.start,o.lang))}</em>`:''}</div></div>
      <div class="mln-card mln-c1"><div class="mln-face">
        <div class="mln-top"><span>${ev(o,L)}</span><span>${y}</span></div>
        <p class="mln-big"><b>${d}</b><b>${m}</b></p>
        ${mlNames(o)}
        <i class="mln-rule"></i>
        <div class="mln-meta"><p><b>${mlDay(o)}</b></p>${o.venue?`<p class="mln-mv"><em>${esc(o.venue)}</em></p>`:''}</div></div></div>
      <div class="mln-card mln-c2"><div class="mln-face">${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:`<small>${en?'You are invited':'Jemputan'}</small><b>${en?'With love':'Dengan kasih'}</b>`}
        <${tag} class="mln-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--onacc',th.c.sheet);el.style.setProperty('--edge',th.c.edge);el.classList.toggle('mln-dark',!!th.c.dark);
    const pg=$('.pg-monoline',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){img.removeAttribute('style');img.className='mln-photo';$('.mln-ph',pg).append(img);pg.classList.add('has-photo');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'kertas',n:'Kertas',desc:'Warm white, terracotta edge',c:{ground:'#e6e1d8',sheet:'#f8f6f1',ink:'#2f2c28',accent:'#2f2c28',gold:'#a89f92',pagefg:'#2f2c28',edge:'#b4553a'}},
    {k:'batu',n:'Batu',desc:'Stone grey, black edge',c:{ground:'#d3d2ce',sheet:'#ecebe8',ink:'#2d2e30',accent:'#2d2e30',gold:'#9a9a98',pagefg:'#2d2e30',edge:'#1f2022'}},
    {k:'pasir',n:'Pasir',desc:'Sand, olive edge',c:{ground:'#ded1bd',sheet:'#f0e8db',ink:'#3d3226',accent:'#4a3a28',gold:'#b29d80',pagefg:'#3d3226',edge:'#6b6a3a'}},
    {k:'sage',n:'Sage',desc:'Sage, forest edge',c:{ground:'#cfd5c6',sheet:'#e8ece1',ink:'#2c3327',accent:'#2f3a29',gold:'#99a38c',pagefg:'#2c3327',edge:'#3d5236'}},
    {k:'biru',n:'Biru',desc:'Powder blue, navy edge',c:{ground:'#cfd8e0',sheet:'#e9eef2',ink:'#24303c',accent:'#24364a',gold:'#91a1b1',pagefg:'#24303c',edge:'#22385a'}},
    {k:'jambu',n:'Jambu',desc:'Blush, berry edge',c:{ground:'#e7d4ce',sheet:'#f6ece8',ink:'#43302d',accent:'#5a3632',gold:'#c0a39b',pagefg:'#43302d',edge:'#a8475a'}},
    {k:'arang',n:'Arang',desc:'Charcoal, brass edge',c:{ground:'#232323',sheet:'#323231',ink:'#ecebe7',accent:'#f2f0ea',gold:'#77756f',pagefg:'#ecebe7',edge:'#c4a466',dark:'1'}},
    {k:'nila',n:'Nila',desc:'Navy, ivory edge',c:{ground:'#19212f',sheet:'#263143',ink:'#e8eaee',accent:'#f1f2f5',gold:'#6f7b8f',pagefg:'#e8eaee',edge:'#e9dcc0',dark:'1'}},
  ]});
