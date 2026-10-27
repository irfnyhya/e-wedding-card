/* vinyl (Piring Hitam): a collector's-edition record. A heavyweight cloth-bound sleeve with a public-domain painting
   tipped on, the names foil-stamped below it, and the black record standing in the sleeve, half risen.
   Cover: tap "Buka Jemputan"; the sleeve sinks away and the record rises out of it.
   Page: the record above a cotton liner-notes card that holds the names, date and the programme as a tracklist.
   Skin: liner-notes cards with track numbers before each heading and a fine double rule. */
const vyVars=c=>`--board:${c.board};--label:${c.label};--foil:${c.foil};--art:url(${A}${c.art});--artpos:${c.artpos||'50% 40%'}`;
const vyDate=o=>esc(fmtShort(o.date)).replace(/\./g,' · ');
const vyMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<b class="vy-jw">${esc(j)}</b>`;const [a,b]=K.initials(o);return `<b>${esc(a)}<i>&amp;</i>${esc(b)}</b>`};
// the record: grooves, sheen and a printed paper label
const vyDisc=(o,L,cls='')=>{const en=o.lang==='en';return `<div class="vy-disc ${cls}"><i class="vy-sheen"></i><div class="vy-label">
  <svg class="vy-ring" viewBox="0 0 100 100"><defs><path id="vyc${cls}" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1 -76 0"/></defs>
   <circle cx="50" cy="50" r="46.5" fill="none" stroke="currentColor" stroke-width=".5" opacity=".7"/><circle cx="50" cy="50" r="44.6" fill="none" stroke="currentColor" stroke-width=".25" opacity=".6"/>
   <text font-size="5.6" letter-spacing="2.2" fill="currentColor"><textPath href="#vyc${cls}" startOffset="2%">${en?'SIDE A · 33⅓ RPM · STEREO · WEDDING EDITION':'SISI A · 33⅓ RPM · STEREO · EDISI PERKAHWINAN'}</textPath></text></svg>
  <span class="vy-lm">${vyMono(o)}</span><i class="vy-hole"></i></div></div>`};
FAMILY({key:'vinyl',name:'Piring Hitam',meaning:'Vinyl record',
  blurb:'A collector’s-edition record: a cloth sleeve with a classic painting tipped on and your names in gold foil. The record rises out of the sleeve to open the card.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',tr=(o.schedule||[]).filter(s=>s.label).slice(0,4);
    return `<section class="page pg-vinyl2${th.c.dark?' vy-dark':''}" style="${vyVars(th.c)}"><div class="vy-cloth"></div>
      <div class="vy-prec reveal">${vyDisc(o,L,'pg')}</div>
      <div class="vy-notes reveal d1"><div class="vy-nin">
        <p class="vy-k kicker">${ev(o,L)}</p>
        <h1 class="names vy-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="vy-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="vy-ven">${esc(o.venue)}</p>`:''}
        ${tr.length?`<div class="vy-rule"></div><ol class="vy-tracks">${tr.map((s,i)=>`<li><b>A${i+1}</b><span>${esc(s.label)}</span><i>${esc(fmtTime(s.time,o.lang))}</i></li>`).join('')}</ol>`:''}
        <div class="vy-pills"><a class="vy-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="vy-pill" data-go="rsvp" href="#">RSVP</a>`:''}</div>
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-vinyl2${th.c.dark?' vy-dark':''}" style="${vyVars(th.c)}"><div class="vy-cloth"></div>
      <p class="vy-k vy-top">${ev(o,L)}</p>
      <div class="vy-stage">
        <div class="vy-rec">${vyDisc(o,L,'cv')}</div>
        <div class="vy-sleeve"><i class="vy-mouth"></i>
          <div class="vy-tip"><div class="vy-art"></div></div>
          <div class="vy-title"><p class="vy-sn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="vy-sd">${vyDate(o)}</p></div>
          <i class="vy-spine"></i></div>
      </div>
      <div class="vy-foot">${guest?`<p class="vy-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="vy-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c,en=o.lang==='en';
    el.setAttribute('style',(el.getAttribute('style')||'')+';'+vyVars(c));el.classList.toggle('vy-dark',!!c.dark);
    $$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(h&&!h.querySelector('.vy-no'))h.insertAdjacentHTML('afterbegin',`<small class="vy-no">${i<5?'A':'B'}${i<5?i+1:i-4}</small>`)});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory cloth sleeve, Dutch flower painting, gold foil',c:{ground:'#e9e2d5',sheet:'#fbf8f1',ink:'#2c2721',accent:'#7a5a2a',gold:'#b8914a',pagefg:'#2c2721',board:'#efe6d4',label:'#7a5a2a',foil:'#b8914a',art:'pd-still-1.jpg',artpos:'50% 30%',dark:''}},
    {k:'nila',n:'Nila',desc:'Navy cloth sleeve, Hokusai’s red Fuji, gold foil',c:{ground:'#171d2b',sheet:'#f6f3ec',ink:'#1f2433',accent:'#22345c',gold:'#c9a660',pagefg:'#e9e4d8',board:'#22304f',label:'#b8473a',foil:'#d8b66e',art:'pd-paint-hokusai-fuji.jpg',artpos:'50% 26%',dark:'1'}},
    {k:'marun',n:'Marun',desc:'Maroon cloth sleeve, tulips in oil, gold foil',c:{ground:'#e8ddd2',sheet:'#fcf7f0',ink:'#33221f',accent:'#6e1f2a',gold:'#b38b45',pagefg:'#33221f',board:'#5f1b25',label:'#e9dcc4',foil:'#d6b06a',art:'pd-still-3.jpg',artpos:'50% 22%',dark:''}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald cloth sleeve, Hassam’s garden, gold foil',c:{ground:'#e3e4da',sheet:'#fafaf4',ink:'#24302a',accent:'#1f4a3a',gold:'#b39050',pagefg:'#24302a',board:'#1f4536',label:'#efe6d0',foil:'#d4b26c',art:'pd-paint-hassam-water.jpg',artpos:'50% 40%',dark:''}},
    {k:'jambu',n:'Merah Jambu',desc:'Blush cloth sleeve, a field of poppies, rose-gold foil',c:{ground:'#f2e6e1',sheet:'#fffaf7',ink:'#3a2a2c',accent:'#9c4a5e',gold:'#b98a6a',pagefg:'#3a2a2c',board:'#e3c3c0',label:'#9c4a5e',foil:'#a8735a',art:'pd-paint-hassam-island.jpg',artpos:'50% 45%',dark:''}},
    {k:'sage',n:'Sage',desc:'Sage cloth sleeve, Monet’s irises, gold foil',c:{ground:'#e7e8df',sheet:'#fbfbf5',ink:'#2c3027',accent:'#4f5f45',gold:'#a98f55',pagefg:'#2c3027',board:'#6c7c5e',label:'#4f5f45',foil:'#efe2bd',art:'pd-paint-monet-irises.jpg',artpos:'50% 55%',dark:''}},
    {k:'hitam',n:'Hitam',desc:'Black cloth sleeve, a still life in oil, gold foil',c:{ground:'#141312',sheet:'#f3eee4',ink:'#211e1b',accent:'#5a4630',gold:'#c9a660',pagefg:'#ece5d8',board:'#1e1c1b',label:'#c9a660',foil:'#d9b874',art:'pd-still-4.jpg',artpos:'50% 30%',dark:'1'}},
    {k:'terakota',n:'Terakota',desc:'Terracotta cloth sleeve, Monet’s poppy field, gold foil',c:{ground:'#eee3d8',sheet:'#fcf6ee',ink:'#33261f',accent:'#9a4524',gold:'#b5884a',pagefg:'#33261f',board:'#a24f30',label:'#f1e4cc',foil:'#f0d79c',art:'pd-paint-monet-poppies.jpg',artpos:'50% 60%',dark:''}},
  ]});
