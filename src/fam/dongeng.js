/* dongeng: "Panggung Dongeng". A paper toy theatre, built in layers like a Victorian card theatre: a painted backdrop
   (a public-domain Monet or Hassam garden), botanical-print rose bushes as the side wings, a paper banner hanging
   on two threads with the names, velvet curtains tied back with gold cord under a scalloped pelmet, and the
   coloured-paper proscenium printed with gilt rules, a title cartouche and a row of footlights on the apron.
   Cover: tap "Buka Jemputan" on the apron, the banner rises into the flies and the stage comes towards you, each
   layer at its own pace. Page: the stage itself, the banner lowered with the full invitation.
   Skin: cream playbill cards with a scalloped pelmet edge and an old-style heading between printer's fleurons. */
let dgN=0;
const DG_ART={poppies:'pd-paint-monet-poppies.jpg',water:'pd-paint-hassam-water.jpg',island:'pd-paint-hassam-island.jpg',irises:'pd-paint-monet-irises.jpg'};
// the proscenium: coloured paper with an arched opening (evenodd); drawn in a 100 x 100 box, stretched to the screen
const DG_ARCH='M9 78V30C9 19 22 14 32 13C40 12 44 8 50 6C56 8 60 12 68 13C78 14 91 19 91 30V78Z';
const DG_PROS=K.uri(`<svg ${NS} viewBox="0 0 100 100" preserveAspectRatio="none"><path fill-rule="evenodd" d="M0 0H100V100H0Z${DG_ARCH}"/></svg>`);
const DG_GILT=`<svg class="dg-gilt" viewBox="0 0 100 100" preserveAspectRatio="none" ${NS} aria-hidden="true"><g fill="none" vector-effect="non-scaling-stroke">
  <path d="M7.4 79.4V29.6C7.4 17.8 21 12.4 31.6 11.4C39.4 10.6 43.6 6.6 50 4.4C56.4 6.6 60.6 10.6 68.4 11.4C79 12.4 92.6 17.8 92.6 29.6V79.4Z" vector-effect="non-scaling-stroke"/>
  <path d="M6 80.6V29.2C6 16.6 20.4 10.8 31.4 9.8C39 9 43.2 5 50 2.6C56.8 5 61 9 68.6 9.8C79.6 10.8 94 16.6 94 29.2V80.6Z" vector-effect="non-scaling-stroke" class="t"/>
  <path d="M2.4 1.6H97.6V98.4H2.4Z" vector-effect="non-scaling-stroke" class="t"/><path d="M3.6 2.6H96.4V97.4H3.6Z" vector-effect="non-scaling-stroke"/>
  <path d="M8 84H92M8 85.4H92" vector-effect="non-scaling-stroke" class="t"/></g></svg>`;
// curtain: gathered at a tie-back about 62% down (also stretched)
const DG_DRAPE=K.uri(`<svg ${NS} viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0H100C92 18 66 44 44 60C40 63 40 66 44 70C58 80 66 90 70 100H0Z"/></svg>`);
const DG_SCALLOP=K.uri(`<svg ${NS} width="24" height="10" viewBox="0 0 24 10"><path d="M0 0H24V4C24 8 18 10 12 10S0 8 0 4Z"/></svg>`);
const dgFitP=o=>{const [a,b]=coverNames(o);const n=Math.max(String(a).length,String(b).length,1);return `font-size:${Math.min(10.2,128/n).toFixed(2)}cqi`};
const dgFit=o=>{const [a,b]=coverNames(o);const n=Math.max(String(a).length,String(b).length,1);return `font-size:${Math.min(9.4,98/n).toFixed(2)}cqi`};
const dgNames=(o,tag,st='')=>{const [n1,n2]=coverNames(o);return `<${tag} class="dg-names"${st?` style="${st}"`:''}><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
const dgTale=o=>o.lang==='en'?'And so our story begins':'Bermulalah kisah dua hati';
const dgFleuron=`<svg class="dg-fl" viewBox="0 0 40 14" ${NS} aria-hidden="true"><g fill="currentColor"><path d="M20 7C16 1 9 1 7 5C6 8 9 10 11 8C9 8 9 5 12 5C15 5 17 7 20 7C23 7 25 5 28 5C31 5 31 8 29 8C31 10 34 8 33 5C31 1 24 1 20 7Z"/><circle cx="20" cy="10.5" r="1.4"/><circle cx="2.5" cy="7" r="1"/><circle cx="37.5" cy="7" r="1"/></g></svg>`;
const DG_SPAND=cls=>`<svg class="dg-spand ${cls}" viewBox="0 0 60 40" ${NS} aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width=".8" stroke-linecap="round"><path d="M4 36C4 18 18 6 40 4"/><path d="M10 36C12 22 22 12 40 10C46 9.4 50 12 48 16C46 19 42 18 42 15"/><path d="M4 36C10 30 18 30 22 34C25 37 22 40 19 38"/><path d="M26 16C30 20 30 26 26 28"/></g><g fill="currentColor"><circle cx="40" cy="4" r="1.6"/><circle cx="52" cy="6" r="1"/><circle cx="57" cy="8" r=".7"/><path d="M26 22C22 18 22 14 26 12C30 14 30 18 26 22Z"/></g></svg>`;
const dgVars=c=>`--art:url(${A}${DG_ART[c.art]});--artpos:${c.artpos||'50% 40%'};--curtain:${c.curtain};--pros:${DG_PROS};--drape:${DG_DRAPE};--scal:${DG_SCALLOP}`;
const dgFl=(n,cls)=>`<img class="dg-wing ${cls}" src="${A}flower-${n}.webp" alt="">`;
FAMILY({key:'dongeng',name:'Panggung Dongeng',meaning:'Paper toy theatre',
  blurb:'A paper toy theatre: a garden painting for the backdrop, rose-print wings, velvet curtains and a banner with the names hanging on threads. The banner rises and the stage comes towards you.',
  fonts:{d:"'IM Fell English SC', serif",s:"'IM Fell English', serif",b:"'IM Fell English', serif"},ms:1500,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-dongeng${c.dark?' dg-dark':''}" style="${dgVars(c)}">
      <i class="dg-back"></i>${dgFl(c.w1,'l')}${dgFl(c.w2,'r')}
      <i class="dg-drape l"></i><i class="dg-drape r"></i><i class="dg-pelmet"></i>
      <div class="dg-banner big reveal"><i class="dg-thread l"></i><i class="dg-thread r"></i><div class="dg-bin">
        ${o.bismillah?`<p class="dg-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="dg-tale">${dgTale(o)}</p>
        <p class="dg-k kicker">${ev(o,L)}</p>
        ${dgNames(o,'h1',dgFitP(o))}
        ${dgFleuron}
        <p class="dg-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="dg-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="dg-ven">${esc(o.venue)}</p>`:''}
        <div class="dg-pills"><a class="dg-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="dg-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-dongeng${c.dark?' dg-dark':''}" style="${dgVars(c)}">
      <div class="dg-l0"><i class="dg-back"></i><i class="dg-floor"></i></div>
      <div class="dg-l1">${dgFl(c.w1,'l')}${dgFl(c.w2,'r')}</div>
      <div class="dg-l2"><div class="dg-banner"><i class="dg-thread l"></i><i class="dg-thread r"></i><div class="dg-bin">
        <p class="dg-tale">${dgTale(o)}</p>${dgNames(o,'p',dgFit(o))}${dgFleuron}<p class="dg-date">${esc(fmtDate(o.date,o.lang))}</p></div></div></div>
      <div class="dg-l3"><i class="dg-drape l"></i><i class="dg-drape r"></i><i class="dg-tie l"></i><i class="dg-tie r"></i><i class="dg-pelmet"></i></div>
      <div class="dg-l4"><i class="dg-pros"></i>${DG_GILT}
        ${DG_SPAND('l')}${DG_SPAND('r')}<p class="dg-cart"><span>${ev(o,L)}</span></p>
        <i class="dg-lights"></i>
        <div class="dg-apron">${guest?`<p class="dg-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
          <${tag} class="dg-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
      </div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('dg-dark',!!c.dark);el.style.setProperty('--curtain',c.curtain);el.style.setProperty('--scal',DG_SCALLOP);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'hijau',n:'Hijau',desc:'Green paper theatre, crimson curtains, poppy field',c:{ground:'#2f4a35',sheet:'#f6ecd6',ink:'#3a2c22',accent:'#7a2e24',gold:'#c9a35a',pagefg:'#f3ead6',curtain:'#8e2a2a',art:'poppies',w1:'wild-rose',w2:'white-roses',dark:1}},
    {k:'merah',n:'Merah',desc:'Red paper theatre, deep red curtains, iris garden',c:{ground:'#7a2620',sheet:'#f7eed9',ink:'#3a2a20',accent:'#7e2a20',gold:'#d2ab62',pagefg:'#f8ecd8',curtain:'#5e1418',art:'irises',w1:'blush-rose',w2:'wild-rose',dark:1}},
    {k:'biru',n:'Biru',desc:'Blue paper theatre, plum curtains, water garden',c:{ground:'#24395a',sheet:'#f5eedc',ink:'#2a2a2e',accent:'#2c4468',gold:'#cfae6a',pagefg:'#eef0f4',curtain:'#5a2440',art:'water',w1:'white-roses',w2:'wild-rose',dark:1}},
    {k:'coklat',n:'Coklat',desc:'Brown paper theatre, green curtains, poppy field',c:{ground:'#4a3020',sheet:'#f5e9d0',ink:'#3a2a1e',accent:'#6e3a22',gold:'#cfa860',pagefg:'#f3e6d0',curtain:'#2e4a36',art:'poppies',w1:'blush-rose',w2:'white-roses',dark:1}},
    {k:'hitam',n:'Hitam',desc:'Black paper theatre, crimson curtains, garden island',c:{ground:'#1c1a18',sheet:'#f5ecd6',ink:'#3a2c22',accent:'#7a2a22',gold:'#cba65e',pagefg:'#efe6d2',curtain:'#7e1e24',art:'island',w1:'wild-rose',w2:'white-roses',dark:1}},
    {k:'gading',n:'Gading',desc:'Ivory paper theatre, rose curtains, water garden',c:{ground:'#e9dfc8',sheet:'#fbf5e6',ink:'#3a2c22',accent:'#7a3a2a',gold:'#a8864a',pagefg:'#3a2c22',curtain:'#b0606a',art:'water',w1:'blush-rose',w2:'wild-rose'}},
    {k:'jambu',n:'Jambu',desc:'Dusty-rose paper theatre, wine curtains, garden island',c:{ground:'#dcbcb2',sheet:'#fbf2e6',ink:'#3e2a26',accent:'#8a3a40',gold:'#a8844c',pagefg:'#3a2622',curtain:'#7a2a3a',art:'island',w1:'white-roses',w2:'blush-rose'}},
    {k:'kunyit',n:'Kunyit',desc:'Mustard paper theatre, teal curtains, iris garden',c:{ground:'#c79a40',sheet:'#f8eed6',ink:'#3a2a1a',accent:'#7a3a22',gold:'#8a6a2a',pagefg:'#2e2214',curtain:'#2e5a5a',art:'irises',w1:'wild-rose',w2:'white-roses'}},
  ]});
