needFont('Playfair+Display:ital,wght@0,400..700;1,400..700');
/* tirai: "Tirai Lukis". A standing three-panel card made like a small lacquered folding screen: each panel is a
   lacquered wood frame with a gilt fillet, mounted with one continuous print of a public-domain garden painting
   (Monet's irises at Giverny, or Hassam's water garden). On the centre panel sits a gold-flecked silk-paper mount
   printed with the names; the screen stands on a cloth-covered table with a folded place card in front of it.
   Cover: tap the place card, the wings swing open and the screen comes towards you. Page: the screen unfolded flat,
   the mount holding the invitation. Skin: silk-paper mounts in thin lacquer frames, italic Didone headings. */
let trN=0;
const TR_ART={irises:'pd-paint-monet-irises.jpg',water:'pd-paint-hassam-water.jpg',poppies:'pd-paint-hassam-island.jpg'};
const trDate=o=>{const [d,m,y]=fmtShort(o.date).split('.');return {d,m,y}};
const trFitP=o=>{const [a,b]=coverNames(o);const n=Math.max(String(a).length,String(b).length,1);return `font-size:${Math.min(9.4,112/n).toFixed(2)}cqi`};
const trFit=o=>{const [a,b]=coverNames(o);const n=Math.max(String(a).length,String(b).length,1);return `font-size:${Math.min(8.2,58/n).toFixed(2)}cqi`};
const trNames=(o,tag,st='')=>{const [n1,n2]=coverNames(o);return `<${tag} class="tr-names"${st?` style="${st}"`:''}><span>${esc(n1)}</span><em>&amp;</em><span>${esc(n2)}</span></${tag}>`};
const trVars=c=>`--frame:${c.frame};--table:${c.table};--art:url(${A}${TR_ART[c.art]});--artpos:${c.artpos||'50% 50%'}`;
// a tiny brass hinge between two panels
const TR_HINGE=`<i class="tr-hinge" style="top:16%"></i><i class="tr-hinge" style="top:50%"></i><i class="tr-hinge" style="top:82%"></i>`;
FAMILY({key:'tirai',name:'Tirai Lukis',meaning:'Painted folding screen',
  blurb:'A small lacquered folding screen printed with a garden painting, the names on a silk-paper mount, standing on a table with a place card. The wings open and the screen comes to you.',
  fonts:{d:"'Jost', sans-serif",s:"'Playfair Display', serif",b:"'Jost', sans-serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',d=trDate(o),day=fmtDate(o.date,o.lang).split(',')[0];
    return `<section class="page pg-tirai${th.c.dark?' tr-dark':''}" style="${trVars(th.c)}"><i class="tr-wall"></i>
      <div class="tr-flat reveal">
        <div class="tr-fp l"><i class="tr-paint"></i></div>
        <div class="tr-fp c"><i class="tr-paint"></i>
          <div class="tr-mount">
            ${o.bismillah?`<p class="tr-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
            <p class="tr-k kicker">${ev(o,L)}</p>
            ${trNames(o,'h1',trFitP(o))}
            <div class="tr-big"><b>${esc(d.d)}</b><i></i><b>${esc(d.m)}</b></div>
            <p class="tr-yr">${esc(day)} &nbsp;·&nbsp; ${esc(d.y)}</p>${o.hijri?`<p class="tr-hj">${esc(o.hijri)}</p>`:''}
            ${o.venue?`<p class="tr-ven">${esc(o.venue)}</p>`:''}
            <div class="tr-pills"><a class="tr-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="tr-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
          </div></div>
        <div class="tr-fp r"><i class="tr-paint"></i></div>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',d=trDate(o);
    return `<div class="cover cv-tirai${th.c.dark?' tr-dark':''}" style="${trVars(th.c)}"><i class="tr-wall"></i><i class="tr-table"></i>
      <div class="tr-stage"><i class="tr-cast"></i><div class="tr-screen">
        <div class="tr-panel l"><i class="tr-paint"></i><i class="tr-feet"></i></div>
        <div class="tr-panel c"><i class="tr-paint"></i><i class="tr-feet"></i>${TR_HINGE}
          <div class="tr-mount sm"><p class="tr-k">${ev(o,L)}</p>${trNames(o,'p',trFit(o))}<div class="tr-big"><b>${esc(d.d)}</b><i></i><b>${esc(d.m)}</b></div><p class="tr-yr">${esc(d.y)}</p>${o.venue?`<p class="tr-ven">${esc(o.venue)}</p>`:''}</div></div>
        <div class="tr-panel r"><i class="tr-paint"></i><i class="tr-feet"></i></div>
      </div></div>
      <${tag} class="tr-place" ${attr}><span class="tr-tent"></span><span class="tr-pc">${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:''}<em>${en?'Open invitation':'Buka Jemputan'}</em></span></${tag}>
    </div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('tr-dark',!!c.dark);el.style.setProperty('--frame',c.frame);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'zamrud',n:'Zamrud',desc:'Green lacquer screen, Monet irises, dark wall',c:{ground:'#17231e',sheet:'#f6efdc',ink:'#2a2a24',accent:'#2d5a46',gold:'#b8954f',pagefg:'#ede6d4',frame:'#1f3a2d',table:'#3b4a3e',art:'irises',dark:1}},
    {k:'nila',n:'Nila',desc:'Indigo lacquer screen, water garden, midnight wall',c:{ground:'#141a2e',sheet:'#f5f1e5',ink:'#24273a',accent:'#2e3c78',gold:'#b89a5c',pagefg:'#e8e8f2',frame:'#1d2547',table:'#3a4058',art:'water',dark:1}},
    {k:'marun',n:'Marun',desc:'Oxblood lacquer screen, Monet irises, dark wall',c:{ground:'#221012',sheet:'#f7efdd',ink:'#33221f',accent:'#7e1d2c',gold:'#bf9654',pagefg:'#f3e6d6',frame:'#5a1820',table:'#4a2a2c',art:'irises',dark:1}},
    {k:'ungu',n:'Ungu',desc:'Aubergine lacquer screen, Monet irises, plum wall',c:{ground:'#1d1424',sheet:'#f7f1e7',ink:'#2e2533',accent:'#5a2c74',gold:'#bc9a62',pagefg:'#eee6ef',frame:'#3c2348',table:'#463a4c',art:'irises',dark:1}},
    {k:'senja',n:'Senja',desc:'Black lacquer screen, poppy garden, dusk wall',c:{ground:'#22171a',sheet:'#f7efdd',ink:'#33261e',accent:'#9a3a22',gold:'#c09656',pagefg:'#f3e7d6',frame:'#1c1514',table:'#4a3a34',art:'poppies',dark:1}},
    {k:'gading',n:'Gading',desc:'Ivory lacquer screen, poppy garden, cream wall',c:{ground:'#ece5d6',sheet:'#fdf9f0',ink:'#3a3128',accent:'#7a4a52',gold:'#a8874c',pagefg:'#3a3128',frame:'#d8cbb2',table:'#d9cdb8',art:'poppies'}},
    {k:'laut',n:'Laut',desc:'Celadon lacquer screen, water garden, grey-green wall',c:{ground:'#dde5e2',sheet:'#fbf8ef',ink:'#26302f',accent:'#2c5c78',gold:'#a0844a',pagefg:'#26302f',frame:'#5f7f7c',table:'#c4cfca',art:'water'}},
    {k:'lumut',n:'Lumut',desc:'Moss lacquer screen, Monet irises, linen wall',c:{ground:'#e6e2d1',sheet:'#faf6e9',ink:'#2f3022',accent:'#4f5e24',gold:'#a3843e',pagefg:'#2f3022',frame:'#5d6a3a',table:'#d3ccb4',art:'irises'}},
  ]});
