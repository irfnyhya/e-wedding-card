/* pergola: a gatefold card. The two front panels are heavy cream board, edge-painted, with an arched trellis window
   laser-cut through both halves; an Impressionist garden (Hassam, Monet; public domain) printed on the inside panel shows
   through the lattice, and Redouté roses (public domain) climb over the cut-work. A printed paper belly band holds the
   gates shut, with a foiled monogram roundel; a small tent card in front carries the guest's name.
   Cover: tap the band; it slides down and the two trellis gates swing open onto the garden.
   Page: the inside of the fold, the garden with a cream card mounted on it with gilt photo corners.
   Skin: cream cards with a strip of trellis over the garden at the top and an engraved-caps heading. */
// the cut-work, as an alpha mask in a 100 x 176 box: solid board everywhere except an arched window; lattice bars in the window
const PGL_WIN='M13 150V58C13 30 31 14 50 14C69 14 87 30 87 58V150Z';
const pglLattice=(()=>{let l='';for(let k=-24;k<=24;k++){const x=50+k*8.5;l+=`M${x-90} 176L${x+90} -4M${x+90} 176L${x-90} -4`}
  return svgUriSq(`<svg ${NS} viewBox="0 0 100 176" preserveAspectRatio="none"><defs><clipPath id="w"><path d="${PGL_WIN}"/></clipPath></defs>
    <path fill-rule="evenodd" d="M0 0H100V176H0Z${PGL_WIN}"/><g clip-path="url(#w)"><path d="${l}" fill="none" stroke="#000" stroke-width="1.7"/><path d="M50 0V176" stroke="#000" stroke-width="3"/></g>
    <path d="${PGL_WIN}" fill="none" stroke="#000" stroke-width="2.6"/></svg>`)})();
// a fine engraved line just inside the window, printed on the board (not cut)
const PGL_LINE=`<svg class="pgl-eng" viewBox="0 0 100 176" preserveAspectRatio="none" aria-hidden="true"><path d="M9 154V58C9 27 29 10 50 10C71 10 91 27 91 58V154Z"/><path class="t" d="M5 5H95V171H5Z"/></svg>`;
const pglDP=o=>{const d=new Date((o.date||'')+'T00:00:00');if(isNaN(d))return null;const R=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];return {d:d.getDate(),r:R[d.getMonth()],y:d.getFullYear(),mon:MONTHS[o.lang][d.getMonth()],day:DAYS[o.lang][d.getDay()]}};
const pglMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<b class="pgl-jw">${esc(j)}</b>`;const [a,b]=K.initials(o);return `<b>${esc(a)}</b><i></i><b>${esc(b)}</b>`};
const pglRose=(f,st)=>`<img class="pgl-rose" src="${A}flower-${f}.webp" alt="" style="${st}">`;
const pglVars=c=>`--art:url(${A}${c.art});--ap:${c.ap};--az:${c.az||'cover'};--edge:${c.edge};--lat:${pglLattice}`;
FAMILY({key:'pergola',name:'Pergola',meaning:'Trellis gatefold',
  blurb:'A gatefold card with an arched trellis laser-cut through its doors, roses climbing over it and a garden painting behind. The band slides off and the gates swing open.',
  fonts:{d:"'Cinzel', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const en=o.lang==='en',c=th.c,[n1,n2]=coverNames(o),p=pglDP(o),t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-pergola${c.dark?' pgl-dark':''}" style="${pglVars(c)}"><i class="pgl-ground"></i>
      <div class="pgl-inside reveal"><i class="pgl-paint"></i>
        <div class="pgl-side l"><i class="pgl-face"></i></div><div class="pgl-side r"><i class="pgl-face"></i></div>
        ${pglRose(c.r1,'left:-14%;bottom:-3%;width:46%;transform:rotate(8deg)')}${pglRose(c.r2,'right:-12%;top:-4%;width:40%;transform:rotate(196deg)')}
        <div class="pgl-mount">
          <i class="pgl-corner tl"></i><i class="pgl-corner tr"></i><i class="pgl-corner bl"></i><i class="pgl-corner br"></i>
          ${o.bismillah?`<p class="pgl-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
          <p class="pgl-k kicker">${ev(o,L)}</p>
          <h1 class="pgl-names names"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>
          ${p?`<p class="pgl-date"><b>${p.d}</b><span>·</span><b>${p.r}</b><span>·</span><b>${p.y}</b></p><p class="pgl-day">${esc(p.day)}, ${p.d} ${esc(p.mon)}</p>`:''}
          ${o.hijri?`<p class="pgl-sm">${esc(o.hijri)}</p>`:''}${t?`<p class="pgl-sm">${esc(t)}</p>`:''}
          ${o.venue?`<p class="pgl-ven">${esc(o.venue)}</p>`:''}
          <div class="pgl-links"><a data-go="when" href="#">${en?'Details':'Butiran'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}<a data-go="loc" href="#">${en?'Location':'Lokasi'}</a></div>
        </div>
      </div>
    </section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c,[n1,n2]=coverNames(o),p=pglDP(o);
    return `<div class="cover cv-pergola${c.dark?' pgl-dark':''}" style="${pglVars(c)}"><i class="pgl-ground"></i>
      <div class="pgl-fold">
        <i class="pgl-paint"></i>
        <div class="pgl-gate l"><i class="pgl-face"></i>${PGL_LINE}${pglRose(c.r1,'left:-30%;bottom:-6%;width:118%;transform:rotate(6deg)')}${pglRose(c.r2,'left:-6%;top:-7%;width:70%;transform:rotate(168deg)')}</div>
        <div class="pgl-gate r"><i class="pgl-face"></i>${PGL_LINE}${pglRose(c.r2,'right:-34%;bottom:-4%;width:112%;transform:scaleX(-1) rotate(4deg)')}${pglRose(c.r1,'right:-8%;top:-5%;width:66%;transform:rotate(200deg)')}</div>
        <${tag} class="pgl-band" ${attr}>
          <span class="pgl-roundel">${pglMono(o)}</span>
          <span class="pgl-k">${ev(o,L)}</span>
          <span class="pgl-bn">${esc(n1)} <i>&amp;</i> ${esc(n2)}</span>
          ${p?`<span class="pgl-bd">${p.d} · ${p.r} · ${p.y}</span>`:''}
          <span class="pgl-go">${en?'Open invitation':'Buka Jemputan'}</span>
        </${tag}>
      </div>
      ${guest?`<div class="pgl-place"><small>${L.dear}</small><b>${esc(guest)}</b></div>`:''}
    </div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--art',`url(${A}${c.art})`);el.style.setProperty('--ap',c.ap);el.style.setProperty('--az',c.az||'cover');el.style.setProperty('--edge',c.edge);el.style.setProperty('--lat',pglLattice);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Rose-edged gates over a water garden',c:{ground:'#efe2dd',sheet:'#fdf9f5',ink:'#3f2e2e',accent:'#8f4a56',gold:'#c7a07a',pagefg:'#3f2e2e',edge:'#c48791',art:'pd-paint-hassam-water.jpg',ap:'50% 30%',r1:'pink-rose',r2:'blush-rose'}},
    {k:'gading',n:'Gading',desc:'Ivory gates, Monet’s iris garden',c:{ground:'#ebe5d8',sheet:'#fdfbf5',ink:'#37322a',accent:'#6a5838',gold:'#c3a46a',pagefg:'#37322a',edge:'#c9b07c',art:'pd-paint-monet-irises.jpg',ap:'50% 30%',r1:'white-roses',r2:'blush-rose'}},
    {k:'lavender',n:'Lavender',desc:'Lilac-edged gates, an iris walk',c:{ground:'#e8e2ee',sheet:'#fcfafd',ink:'#352f45',accent:'#62528a',gold:'#b9a37a',pagefg:'#352f45',edge:'#a593c4',art:'pd-paint-monet-irises.jpg',ap:'50% 70%',r1:'blush-rose',r2:'wild-rose'}},
    {k:'pic',n:'Pic',desc:'Apricot edge, Hassam’s poppy garden',c:{ground:'#f3e4d8',sheet:'#fefaf6',ink:'#41302a',accent:'#9a5638',gold:'#cfa275',pagefg:'#41302a',edge:'#de9f7d',art:'pd-paint-hassam-island.jpg',ap:'50% 30%',r1:'wild-rose',r2:'pink-rose'}},
    {k:'sage',n:'Sage',desc:'Sage-edged gates, a green garden',c:{ground:'#e1e7db',sheet:'#fafcf7',ink:'#2d382c',accent:'#4d6845',gold:'#b9a676',pagefg:'#2d382c',edge:'#8fa682',art:'pd-paint-hassam-water.jpg',ap:'80% 80%',r1:'white-roses',r2:'wild-rose'}},
    {k:'biru',n:'Biru',desc:'Blue-edged gates, a summer meadow',c:{ground:'#e0e7ed',sheet:'#fafcfd',ink:'#28323d',accent:'#435f80',gold:'#b49e74',pagefg:'#28323d',edge:'#8aa4c0',art:'pd-paint-monet-poppies.jpg',ap:'35% 100%',az:'auto 175%',r1:'pink-rose',r2:'white-roses'}},
    {k:'krim',n:'Krim',desc:'Cream and gold, a poppy field',c:{ground:'#ece3d2',sheet:'#fefbf4',ink:'#3a3226',accent:'#7f5a34',gold:'#c39a5e',pagefg:'#3a3226',edge:'#c79f6a',art:'pd-paint-monet-poppies.jpg',ap:'65% 100%',az:'auto 175%',r1:'cabbage-rose',r2:'blush-rose'}},
    {k:'senja',n:'Senja',desc:'Gates at dusk on a deep plum ground, red roses',c:{ground:'#3e2a33',sheet:'#fdf6f2',ink:'#3e2a2f',accent:'#86394f',gold:'#c79d72',pagefg:'#f5e8ea',edge:'#b85c72',art:'pd-paint-hassam-water.jpg',ap:'40% 60%',r1:'red-rose',r2:'pink-rose',dark:1}},
  ]});
