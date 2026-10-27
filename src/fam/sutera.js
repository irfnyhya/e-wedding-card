/* sutera: a small stack of cards laid on a length of kain songket. The cloth is a real songket (pd-textile-2, Rijksmuseum
   CC0: bunga tabur field and a pucuk rebung kepala), re-dyed in the colourway with its gold thread kept gold. On it, a deckled
   ivory card, a jewel-coloured card carrying the guest's name in gold, and on top the main card: heavy ivory with a gold
   pucuk rebung border, the names in a swash script, held by a gold-foil belly band that is the button.
   Cover: tap the band; it slides off, the main card lifts away and the stack fans out.
   Page: the main card laid straight on the cloth, the other two fanned behind it, the band beside it.
   Skin: ivory cards with a foil pucuk rebung border on the songket colour, script headings. */
needFont('Pinyon+Script');
let suN=0;
const suF=v=>v.toFixed(2);
// the songket, re-dyed: the cloth colour as a ground, the gold thread (bright parts of the photo) kept as gold
function suCloth(c,cls){const u=++suN,g=c.thread.match(/\w\w/g).map(h=>(parseInt(h,16)/255).toFixed(3));
  return `<svg class="sut-cloth ${cls}" viewBox="0 0 756 900" preserveAspectRatio="xMidYMid slice"><defs>
    <filter id="suf${u}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 ${g[0]}  0 0 0 0 ${g[1]}  0 0 0 0 ${g[2]}  ${(.3*c.tk).toFixed(2)} ${(.59*c.tk).toFixed(2)} ${(.11*c.tk).toFixed(2)} 0 ${c.tb}"/></filter>
    <linearGradient id="sus${u}" x1="0" y1="0" x2="1" y2=".8"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".55" stop-color="#000" stop-opacity=".18"/><stop offset=".7" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient></defs>
    <rect width="756" height="900" style="fill:${c.ground}"/>
    <image href="assets/pd-textile-2.jpg" width="900" height="756" transform="translate(756 0) rotate(90)" filter="url(#suf${u})"/>
    <rect width="756" height="900" fill="url(#sus${u})"/></svg>`}
// pucuk rebung: a row of bamboo-shoot triangles with an inner line, for the card's printed border
const SU_PR=K.uri(`<svg ${NS} viewBox="0 0 16 12" fill="none" stroke="#000"><path d="M0 11.5H16M0 .5H16" stroke-width=".8"/><path d="M1 11L8 2L15 11" stroke-width=".8"/><path d="M4.2 11L8 6L11.8 11" stroke-width=".6"/><circle cx="8" cy="9.6" r=".9" fill="#000" stroke="none"/></svg>`);
const SU_BT=K.uri(`<svg ${NS} viewBox="0 0 40 40"><g fill="#000"><path d="M20 13C21.5 16 24 18.5 27 20C24 21.5 21.5 24 20 27C18.5 24 16 21.5 13 20C16 18.5 18.5 16 20 13Z"/><circle cx="0" cy="0" r="1.6"/><circle cx="40" cy="0" r="1.6"/><circle cx="0" cy="40" r="1.6"/><circle cx="40" cy="40" r="1.6"/></g></svg>`);
const suNames=(o,tag)=>{const [n1,n2]=coverNames(o);return `<${tag} class="sut-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${tag}>`};
const suVars=c=>`--thread:${c.thread};--jewel:${c.jewel};--sut-pr:${SU_PR};--sut-bt:${SU_BT}`;
FAMILY({key:'sutera',name:'Sutera',meaning:'Cards on songket',
  blurb:'A small stack of cards on a length of gold-threaded songket: the main card held by a gold belly band, the guest’s name on a jewel-coloured card beneath. The band slides off and the stack fans open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const c=th.c,en=o.lang==='en';
    return `<section class="page pg-sutera" style="${suVars(c)}">${suCloth(c,'')}
      <div class="sut-pstack reveal"><div class="sut-c3"></div><div class="sut-c2"></div><i class="sut-pband"></i>
        <div class="sut-c1 sut-pmain"><div class="sut-in">
          ${o.bismillah?'<p class="sut-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="sut-k kicker">${ev(o,L)}</p>${suNames(o,'h1')}<i class="sut-rule"></i>
          <p class="sut-d">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="sut-hj">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="sut-ven">${esc(o.venue)}</p>`:''}</div></div></div>
      <div class="sut-tabs reveal d2"><a class="sut-tab" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="sut-tab" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-sutera" style="${suVars(c)}">${suCloth(c,'')}
      <div class="sut-stack">
        <div class="sut-c3"></div>
        <div class="sut-c2">${guest?`<div class="sut-to"><small>${L.dear}</small><b>${esc(guest)}</b></div>`:`<div class="sut-to"><small>${esc(fmtDate(o.date,o.lang))}</small></div>`}</div>
        <div class="sut-c1"><div class="sut-in"><p class="sut-k">${ev(o,L)}</p>${suNames(o,'p')}<i class="sut-rule"></i><p class="sut-d">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="sut-ven">${esc(o.venue)}</p>`:''}</div>
          <${tag} class="sut-band" ${attr}><span>${en?'Open invitation':'Buka Jemputan'}</span></${tag}></div>
      </div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('sut-lt',!!c.light);
    el.style.setProperty('--thread',c.thread);el.style.setProperty('--jewel',c.jewel);el.style.setProperty('--sut-pr',SU_PR);el.style.setProperty('--sut-bt',SU_BT);
    const sc=$('.scroller',el);
    $$('.pg-sutera [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'zamrud',n:'Zamrud',desc:'Emerald songket, gold thread, ivory cards',c:{ground:'#0f4232',sheet:'#fbf5e6',ink:'#2b2f28',accent:'#14543d',gold:'#b89346',pagefg:'#f1ead6',thread:'#d9b66a',jewel:'#14543d',tk:2.3,tb:-.36}},
    {k:'nila',n:'Nila',desc:'Sapphire songket, gold thread, ivory cards',c:{ground:'#152a5c',sheet:'#fbf6ea',ink:'#262b38',accent:'#1d3a7a',gold:'#b89346',pagefg:'#eef0f6',thread:'#d9b66a',jewel:'#1d3a7a',tk:2.3,tb:-.36}},
    {k:'merah',n:'Merah',desc:'Ruby songket, gold thread, ivory cards',c:{ground:'#5e0f1e',sheet:'#fcf5ea',ink:'#3a2427',accent:'#7d1428',gold:'#b89346',pagefg:'#f7e9e2',thread:'#dcb768',jewel:'#7d1428',tk:2.3,tb:-.36}},
    {k:'ungu',n:'Ungu',desc:'Amethyst songket, gold thread, ivory cards',c:{ground:'#3c1d52',sheet:'#fbf5ee',ink:'#33283a',accent:'#55286f',gold:'#b89346',pagefg:'#f2eaf4',thread:'#d9b66a',jewel:'#55286f',tk:2.3,tb:-.36}},
    {k:'laut',n:'Laut',desc:'Deep teal songket, gold thread, ivory cards',c:{ground:'#0b434a',sheet:'#f9f6ea',ink:'#22302f',accent:'#0f525a',gold:'#b89346',pagefg:'#e8f1ef',thread:'#d9b66a',jewel:'#0f525a',tk:2.3,tb:-.36}},
    {k:'hitam',n:'Hitam',desc:'Black songket, gold thread, ivory cards',c:{ground:'#17171a',sheet:'#faf5ea',ink:'#2a2826',accent:'#3a3530',gold:'#b89346',pagefg:'#efe9dc',thread:'#d6b36a',jewel:'#2a2a2e',tk:2.3,tb:-.36}},
    {k:'gading',n:'Gading',desc:'Ivory songket, gold thread, a sage card',c:{ground:'#e6dac2',sheet:'#fffcf4',ink:'#3a3127',accent:'#6e5124',gold:'#a8853f',pagefg:'#3a3127',thread:'#a8823c',jewel:'#5f7a5c',tk:2.0,tb:-.32,light:1}},
    {k:'jambu',n:'Jambu',desc:'Blush songket, gold thread, a rose card',c:{ground:'#e3bfb8',sheet:'#fffaf6',ink:'#40292b',accent:'#8e3d4f',gold:'#a8853f',pagefg:'#40292b',thread:'#a8823c',jewel:'#8e3d4f',tk:2.0,tb:-.32,light:1}},
  ]});
