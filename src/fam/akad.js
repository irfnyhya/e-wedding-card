/* akad: a tall nikah card on heavy cotton, letterpressed in Bodoni with a gilt (gold-painted) edge and a blind-embossed
   eight-point star lattice round the margin. The lower half sits in a printed vellum jacket held by a gold wax seal, so the
   big "19" of the date shows through the vellum. It lies a little crooked on a linen cloth (velvet for the dark colourways)
   beside a string of seed pearls and a sprig of jasmine; the guest's name is written on a small place card.
   Cover: tap the seal; it lifts, the vellum slides away and the card straightens and comes forward.
   Page: the card, laid straight, with its vellum jacket and pearls beside it and two place cards as links.
   Skin: cotton cards with a gilt edge and an embossed lattice band, Bodoni spaced caps under a foil star. */
needFont('Playfair+Display:ital,wght@0,400..700;1,400..700');
let akN=0;
const akF=v=>v.toFixed(2);
// an eight-point star (two squares) of radius r at (x,y)
const akStar=(x,y,r)=>{let d='';for(let i=0;i<16;i++){const a=-Math.PI/2+i*Math.PI/8,rr=i%2?r*.72:r;d+=(i?'L':'M')+akF(x+Math.cos(a)*rr)+' '+akF(y+Math.sin(a)*rr)}return d+'Z'};
// the embossed lattice: one 24-unit tile of eight-point stars joined by fine lines, in a given stroke colour
const akLat=col=>K.uri(`<svg ${NS} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="${col}" stroke-width=".7"><path d="${akStar(12,12,6.4)}"/><path d="M12 5.6V0M12 18.4V24M5.6 12H0M18.4 12H24"/><path d="${akStar(0,0,3)}${akStar(24,0,3)}${akStar(0,24,3)}${akStar(24,24,3)}"/></svg>`);
const AK_HI=akLat('#ffffff'),AK_LO=akLat('#5a4630');
// a foil roundel: an eight-point star inside a ring of beads, used at the head of the card
function akRound(cls=''){const u=++akN;let beads='';K.ring(24,17,20,20).forEach(([x,y])=>{beads+=`<circle cx="${akF(x)}" cy="${akF(y)}" r=".9"/>`});
  return `<svg class="akd-rd ${cls}" viewBox="0 0 40 40"><defs><linearGradient id="akr${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8f6a2c"/><stop offset=".35" stop-color="#f0d993"/><stop offset=".55" stop-color="#a8813b"/><stop offset=".8" stop-color="#ecd38a"/><stop offset="1" stop-color="#8a6428"/></linearGradient></defs>
    <g fill="url(#akr${u})">${beads}</g><circle cx="20" cy="20" r="14.2" fill="none" stroke="url(#akr${u})" stroke-width=".6"/>
    <path d="${akStar(20,20,11)}" fill="none" stroke="url(#akr${u})" stroke-width=".9"/><path d="${akStar(20,20,6)}" fill="url(#akr${u})"/><circle cx="20" cy="20" r="1.6" fill="#fff8e6"/></svg>`}
// printed rule: hairline, a small diamond, hairline
const akRule=`<i class="akd-rule"><b></b></i>`;
const akDateBlock=(o,big)=>{const d=new Date(o.date+'T00:00:00'),en=o.lang==='en';
  const ok=!isNaN(d);const day=ok?d.getDate():'';
  const mon=ok?(en?['January','February','March','April','May','June','July','August','September','October','November','December']:['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'])[d.getMonth()]:'';
  const wd=ok?(en?['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']:['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'])[d.getDay()]:'';
  return ok?`<div class="akd-db${big?' big':''}">${akRule}<p class="akd-wd">${wd}</p><p class="akd-day">${day}</p><p class="akd-my">${mon} ${d.getFullYear()}</p>${akRule}</div>`:`<p class="akd-my">${esc(fmtDate(o.date,o.lang))}</p>`};
const akBis=o=>o.bismillah?'<p class="akd-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':akRound();
const akNames=(o,tag)=>{const [n1,n2]=coverNames(o);return `<${tag} class="akd-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${tag}>`};
const akSeal=(o,c)=>{const j=String(o.jawi||'').trim(),[a,b]=K.initials(o);return `<span class="akd-sealimg" style="background-image:url(${A}seal-${c.seal}.webp)"></span><span class="akd-mono">${j?`<em>${esc(j)}</em>`:`${esc(a)}<i>&amp;</i>${esc(b)}`}</span>`};
FAMILY({key:'akad',name:'Akad',meaning:'Nikah card',
  blurb:'A tall cotton card with a gilt edge and an embossed star lattice, its lower half in a vellum jacket held by a gold wax seal, lying beside seed pearls and jasmine. Guests break the seal to open it.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Pinyon Script', cursive",b:"'Bodoni Moda', serif"},ms:1400,
  page(o,th,L){const c=th.c,en=o.lang==='en';
    return `<section class="page pg-akad${c.dark?' akd-dark':''}" style="--edge:${c.edge};--akhi:${AK_HI};--aklo:${AK_LO}"><div class="akd-cloth"></div>
      <img class="akd-pearl pg" src="${A}pd-obj-pearls.webp" alt="">
      <div class="akd-vel pg"><span class="akd-sealimg" style="background-image:url(${A}seal-${c.seal}.webp)"></span></div>
      ${c.dark?'':`<img class="akd-jas pg" src="${A}flower-jasmine.webp" alt="">`}
      <div class="akd-card pg reveal"><div class="akd-in">
        ${akBis(o)}<p class="akd-k kicker">${ev(o,L)}</p>${akNames(o,'h1')}
        ${akDateBlock(o,true)}${o.hijri?`<p class="akd-hj">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="akd-ven">${esc(o.venue)}</p>`:''}</div></div>
      <div class="akd-tiles reveal d2">
        <a class="akd-place" data-go="when" href="#"><small>${en?'Event':'Butiran'}</small><b>${en?'Details':'Majlis'}</b></a>
        ${o.x_rsvp?`<a class="akd-place r" data-go="rsvp" href="#"><small>${en?'Kindly reply':'Sudi hadir?'}</small><b>RSVP</b></a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-akad${c.dark?' akd-dark':''}" style="--edge:${c.edge};--akhi:${AK_HI};--aklo:${AK_LO}"><div class="akd-cloth"></div>
      <img class="akd-pearl" src="${A}pd-obj-pearls.webp" alt="">
      ${c.dark?'':`<img class="akd-jas" src="${A}flower-jasmine.webp" alt="">`}
      <div class="akd-card cv"><div class="akd-in">
        ${akBis(o)}<p class="akd-k">${ev(o,L)}</p>${akNames(o,'p')}${akDateBlock(o,false)}</div>
        <div class="akd-vel"><p class="akd-open-l">${en?'Open invitation':'Buka Jemputan'}</p></div>
        <${tag} class="akd-seal" ${attr} aria-label="${en?'Open invitation':'Buka Jemputan'}">${akSeal(o,c)}</${tag}>
      </div>
      ${guest?`<div class="akd-pc"><small>${L.dear}</small><b>${esc(guest)}</b></div>`:''}</div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('akd-dk',!!th.c.dark);
    el.style.setProperty('--akhi',AK_HI);el.style.setProperty('--edge',th.c.edge);el.style.setProperty('--aklo',AK_LO);
    const sc=$('.scroller',el);
    $$('.pg-akad [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory cotton, gilt edge, gold seal, on oatmeal linen',c:{ground:'#e6ddcc',sheet:'#fdfaf2',ink:'#3a3128',accent:'#6e5124',gold:'#a8833f',pagefg:'#3a3128',seal:'emas',edge:'#c9a457'}},
    {k:'putih',n:'Putih',desc:'White cotton, green ink, ivory seal, on pale linen',c:{ground:'#e3e2db',sheet:'#ffffff',ink:'#2f342f',accent:'#2c4e3f',gold:'#a8853f',pagefg:'#2f342f',seal:'gading',edge:'#c4a35a'}},
    {k:'jambu',n:'Jambu',desc:'Ivory cotton, rose ink, gold seal, on blush linen',c:{ground:'#ead6cf',sheet:'#fffaf6',ink:'#43302f',accent:'#8e3e52',gold:'#ad8848',pagefg:'#43302f',seal:'emas',edge:'#d39aa5'}},
    {k:'sage',n:'Sage',desc:'Ivory cotton, sage edge, sage seal, on sage linen',c:{ground:'#d6dbc9',sheet:'#fcfbf4',ink:'#2f352b',accent:'#47603e',gold:'#a3884a',pagefg:'#2f352b',seal:'sage',edge:'#8fa07f'}},
    {k:'biru',n:'Biru',desc:'Ivory cotton, navy ink, blue seal, on misty blue linen',c:{ground:'#d3dae1',sheet:'#fdfcf8',ink:'#26303c',accent:'#2b4266',gold:'#a8894c',pagefg:'#26303c',seal:'biru',edge:'#7f97b5'}},
    {k:'zamrud',n:'Zamrud',desc:'Ivory cotton and pearls on emerald velvet',c:{ground:'#123227',sheet:'#fcf8ee',ink:'#2b3029',accent:'#1f4a39',gold:'#b8954f',pagefg:'#efe9d8',seal:'emas',edge:'#c9a457',dark:1}},
    {k:'marun',n:'Marun',desc:'Ivory cotton and pearls on maroon velvet',c:{ground:'#45141d',sheet:'#fdf8f0',ink:'#3a2a28',accent:'#7b2232',gold:'#b8924f',pagefg:'#f3e6dc',seal:'merah',edge:'#c9a457',dark:1}},
    {k:'nila',n:'Nila',desc:'Ivory cotton and pearls on midnight velvet',c:{ground:'#151c30',sheet:'#fcfaf4',ink:'#262b38',accent:'#2b3b63',gold:'#b49752',pagefg:'#e8eaf2',seal:'gading',edge:'#c9a457',dark:1}},
  ]});
