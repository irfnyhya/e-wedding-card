/* mihrab: an illuminated manuscript frontispiece. A vellum leaf ruled in gold, blue and black (jadwal) lies on dark leather;
   on it a pointed arch whose frame and spandrels are filled with real gold illumination (pd-illum-1, Met Museum, public domain).
   Cover: tap "Buka Jemputan", a gleam runs over the gold and the leaf settles into place as the front page.
   Page: the same leaf, larger, with the names in the arch. Skin: vellum leaves with jadwal rules and a gilt roundel over each heading. */
let mhN=0;
// the arch panel, drawn in a 100 x 150 box: illumination fills everything outside the arch
const mhArch=(uid)=>{const arch='M15 140V62C15 40 36 30 50 12C64 30 85 40 85 62V140Z';
  const ring=K.ring(8,2.6,50,27).map(([x,y])=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="1.25" fill="url(#mhg${uid})"/>`).join('');
  return `<svg class="mh-arch" viewBox="0 0 100 150" ${NS} aria-hidden="true"><defs>
    <linearGradient id="mhg${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e2a4"/><stop offset=".45" stop-color="#c99a45"/><stop offset=".7" stop-color="#8a6324"/><stop offset="1" stop-color="#e4c47c"/></linearGradient>
    <clipPath id="mhc${uid}"><path d="M6 4H94V146H6Z${arch}" clip-rule="evenodd"/></clipPath>
    <radialGradient id="mhv${uid}" cx=".5" cy=".42" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <g clip-path="url(#mhc${uid})"><image href="${A}pd-illum-1.jpg" x="-22" y="-4" width="144" height="158" preserveAspectRatio="xMidYMid slice"/>
      <rect x="0" y="0" width="100" height="150" fill="#3a2508" opacity=".12"/></g>
    <path d="${arch}" fill="url(#mhv${uid})"/>
    <rect x="6" y="4" width="88" height="142" fill="none" stroke="url(#mhg${uid})" stroke-width="1.3"/>
    <rect x="4.3" y="2.3" width="91.4" height="145.4" fill="none" stroke="#1d1a17" stroke-width=".3"/>
    <rect x="6.9" y="4.9" width="86.2" height="140.2" fill="none" stroke="#1d1a17" stroke-width=".25"/>
    <path d="${arch}" fill="none" stroke="#1d1a17" stroke-width="1.5"/><path d="${arch}" fill="none" stroke="url(#mhg${uid})" stroke-width="1"/>
    <path d="M18 138V62.5C18 42.5 38 33 50 17C62 33 82 42.5 82 62.5V138Z" fill="none" class="mh-in" stroke-width=".35" stroke-dasharray="1 .9"/>
    <path d="M50 22l1.2 3.3 3.3 1.2-3.3 1.2L50 31l-1.2-3.3-3.3-1.2 3.3-1.2Z" fill="url(#mhg${uid})"/>${ring}
    <path d="${K.scallop(12,4.6,1.3,50,3)}" fill="url(#mhg${uid})" stroke="#1d1a17" stroke-width=".22"/><circle cx="50" cy="3" r="3.2" fill="#27508f" stroke="#1d1a17" stroke-width=".2"/>
    <path d="${K.star(8,2.5,1.1,50,3)}" fill="url(#mhg${uid})"/><circle cx="50" cy="3" r=".55" fill="#b8402c"/>
  </svg>`};
const mhLeaf=(o,L,big)=>{const [n1,n2]=coverNames(o),u=++mhN;return `<div class="mh-leaf${big?' big':''}"><div class="mh-block">${mhArch(u)}
  <div class="mh-txt">${big&&o.bismillah?'<p class="mh-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
    <p class="mh-k${big?' kicker':''}">${ev(o,L)}</p><p class="mh-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
    <p class="mh-date">${esc(big?fmtDate(o.date,o.lang):fmtShort(o.date).replace(/\./g,' · '))}</p>${big&&o.hijri?`<p class="mh-hj">${esc(o.hijri)}</p>`:''}${big&&o.venue?`<p class="mh-ven">${esc(o.venue)}</p>`:''}</div>
  </div><i class="mh-gleam"></i></div>`};
const MHD='#efe6d4',MHL='#2c2620';
const mhT=(k,n,desc,ground,accent,light)=>({k,n,desc,c:{ground,sheet:'#f7f0e1',ink:'#2c2620',accent,gold:'#b8924e',pagefg:light?MHL:MHD,leather:light?'1':''}});
FAMILY({key:'mihrab',name:'Mihrab',meaning:'Illuminated arch',
  blurb:'A vellum manuscript leaf on leather, ruled in gold, with your names inside a pointed arch framed by real gold illumination.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en';return `<section class="page pg-mihrab2"><div class="mh-leath"></div>
    <div class="reveal" style="width:100%;display:flex;justify-content:center">${mhLeaf(o,L,true)}</div>
    <div class="mh-tabs reveal d2"><a class="mh-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="mh-pill" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-mihrab2"><div class="mh-leath"></div>
    <div class="mh-stage">${mhLeaf(o,L,false)}</div>
    <div class="mh-foot">${guest?`<p class="mh-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="mh-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    mhT('zamrud','Zamrud','Gold illumination on emerald leather','#0f3a30','#1f5a48'),
    mhT('gading','Gading Emas','Gold illumination on ivory calf','#e3d8c2','#7d5f2f',1),
    mhT('biru','Biru Malam','Gold illumination on midnight leather','#18233a','#27406e'),
    mhT('merah','Merah Bata','Gold illumination on brick leather','#521b18','#7a2a22'),
    mhT('terakota','Terakota','Gold illumination on terracotta leather','#6e301f','#8a3f28'),
    mhT('sage','Sage','Gold illumination on sage leather','#4f5c47','#55654b'),
    mhT('nila','Nila','Gold illumination on indigo leather','#16213b','#2a3c6e'),
    mhT('ungu','Ungu','Gold illumination on plum leather','#371b31','#5a2d50'),
    mhT('champagne','Champagne','Gold illumination on champagne calf','#cdbb98','#7d5f2f',1),
    mhT('mauve','Mauve Zaitun','Gold illumination on mulberry leather','#4f1a27','#6e3a4f'),
    mhT('pic','Pic Sage','Gold illumination on olive leather, peach ink','#465341','#a8573a'),
    mhT('kunyit','Kunyit Nila','Gold illumination on indigo leather, saffron ink','#1b2846','#a24a22'),
    mhT('lavender','Lavender Arang','Gold illumination on charcoal leather, lilac ink','#36343c','#5f5296'),
    mhT('karang','Teal Karang','Gold illumination on teal leather','#0b4444','#0f6060'),
    mhT('pandan','Pandan','Gold illumination on pandan leather','#0d4430','#145a3e'),
    mhT('kopi','Kopi Susu','Gold illumination on coffee leather','#36271f','#6b4a3a'),
    mhT('hujan','Biru Hujan','Gold illumination on slate leather','#24364a','#3a5570'),
    mhT('fajar','Fajar','Gold illumination on dusk leather, rose ink','#432034','#9a3f58'),
  ]});
