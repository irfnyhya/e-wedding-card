/* kampung: an antique print of a seaside kampung in Penang (a public-domain photograph c. 1910, pc-pinang, with its etched
   line version sk-pinang), pulled in the colourway's ink on deckled cotton paper with an embossed plate mark and lightly hand-tinted.
   Cover: the print lies on a cloth-covered board, titled beneath in script like an artist's proof. Tap "Buka Jemputan" and the
   sheet lifts away. Page: the print with the names set under it. Skin: paper cards with a plate mark and old-style type. */
let kpN=0;
const kpHex=h=>{h=String(h).replace('#','');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255)};
// grey of the photograph -> ink (dark) ... paper (light): a photogravure in any ink
function kpFilter(id,ink,paper){const a=kpHex(ink),b=kpHex(paper),curve=[0,.06,.24,.5,.74,.9,.98,1];
  const tv=i=>curve.map(k=>(a[i]+(b[i]-a[i])*k).toFixed(3)).join(' ');
  return `<svg class="kp-defs" width="0" height="0" aria-hidden="true"><filter id="${id}" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">
    <feColorMatrix type="matrix" values=".3 .55 .15 0 0 .3 .55 .15 0 0 .3 .55 .15 0 0 0 0 0 1 0"/>
    <feComponentTransfer><feFuncR type="table" tableValues="${tv(0)}"/><feFuncG type="table" tableValues="${tv(1)}"/><feFuncB type="table" tableValues="${tv(2)}"/></feComponentTransfer></filter></svg>`}
const kpPlate=(cls)=>`<span class="kp-plate ${cls||''}"><i class="kp-img"></i><i class="kp-lines"></i><i class="kp-tint"></i></span>`;
const kpVars=(c,id)=>`--kpfx:url(#${id});--wash1:${c.wash1};--wash2:${c.wash2}`;
FAMILY({key:'kampung',name:'Kampung',meaning:'Village print',
  blurb:'An antique print of a seaside kampung, pulled in coloured ink on deckled cotton paper with a plate mark and a touch of hand tint. The sheet lifts away to open.',
  fonts:{d:"'IM Fell English SC', serif",s:"'Pinyon Script', cursive",b:"'IM Fell English', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id='kpf'+(++kpN);
    return `<section class="page pg-kampung2" style="${kpVars(c,id)}">${kpFilter(id,c.ink,c.sheet)}<i class="kp-board"></i>
      <div class="kp-sheetw reveal"><div class="kp-sheet big">${kpPlate('wide')}
        <p class="kp-k kicker">${ev(o,L)}</p><h1 class="kp-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="kp-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="kp-ven">${esc(o.venue)}</p>`:''}</div></div>
      <a class="kp-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id='kpf'+(++kpN);
    return `<div class="cover cv-kampung2" style="${kpVars(c,id)}">${kpFilter(id,c.ink,c.sheet)}<i class="kp-board"></i>
      <div class="kp-lift"><div class="kp-sheetw"><div class="kp-sheet">${kpPlate()}
        <p class="kp-cap"><span>${ev(o,L)}</span><span>${esc(fmtShort(o.date))}</span></p>
        <p class="kp-title">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div></div></div>
      <div class="kp-foot">${guest?`<p class="kp-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="kp-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'senja',n:'Senja',desc:'Sepia print on a plum board',c:{ground:'#3a2a4c',sheet:'#f6eedc',ink:'#3b2a1e',accent:'#5a3a52',gold:'#9a7a52',pagefg:'#f3e9da',wash1:'#f0c6a8',wash2:'#a9c4bf'}},
    {k:'jingga',n:'Jingga',desc:'Bistre print on a burnt-orange board',c:{ground:'#7a3a22',sheet:'#f8ecd8',ink:'#4a2516',accent:'#8a3e22',gold:'#a8794a',pagefg:'#fbefe0',wash1:'#f4c08e',wash2:'#b8c7a6'}},
    {k:'merah',n:'Merah',desc:'Brown-black print on a deep red board',c:{ground:'#561a26',sheet:'#f7eee2',ink:'#2f1a18',accent:'#7a2232',gold:'#a37a5a',pagefg:'#f8e9e2',wash1:'#efb9a6',wash2:'#b5c6b8'}},
    {k:'biru',n:'Biru',desc:'Indigo print on a navy board',c:{ground:'#1b2b4e',sheet:'#f3f0e7',ink:'#1d2a48',accent:'#24406e',gold:'#8a7a5a',pagefg:'#ece8de',wash1:'#d9d2c0',wash2:'#9fbccf'}},
    {k:'hijau',n:'Hijau',desc:'Green-black print on a forest board',c:{ground:'#24412f',sheet:'#f4f1e4',ink:'#1f2e22',accent:'#2f5a3a',gold:'#8f8256',pagefg:'#eef0e2',wash1:'#e9d9b0',wash2:'#a8c7a5'}},
    {k:'ungu',n:'Ungu',desc:'Plum print on a violet board',c:{ground:'#372451',sheet:'#f6f0ee',ink:'#2f2240',accent:'#5b3d78',gold:'#9a8268',pagefg:'#f1eaf4',wash1:'#efc3c6',wash2:'#b2b8d4'}},
    {k:'pagi',n:'Pagi',desc:'Blue-grey print on a pale morning board',c:{ground:'#cfdbe0',sheet:'#fbf9f2',ink:'#2b3a44',accent:'#36556a',gold:'#8a8066',pagefg:'#22323c',wash1:'#f2e2c4',wash2:'#a6c8d4'}},
    {k:'emas',n:'Emas',desc:'Umber print on an ochre board',c:{ground:'#7a4c18',sheet:'#f8eed6',ink:'#3a2812',accent:'#7a4c18',gold:'#a8823e',pagefg:'#fff3d8',wash1:'#f2cf8a',wash2:'#b9c49a'}},
  ]});
