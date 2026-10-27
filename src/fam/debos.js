/* debos: a thick card of coloured stock, debossed tone-on-tone. A giant date is pressed into it, lit from the upper left,
   so it shows only as shadow inside the strokes and a lit lip below them; the names are printed small in spaced caps.
   The card rests in a recess pressed into a board of the same colour.
   Cover: tap "Buka Jemputan": the card lifts out of its recess and slides away. Page: the card, larger, with the details.
   Skin: coloured-stock cards with debossed headings and a pressed rule. */
let dbN=0;
const dbParts=o=>{const m=String(o.date||'').match(/^(\d{4})-(\d{2})-(\d{2})/);return m?{d:m[3],m:m[2],y:m[1]}:{d:'00',m:'00',y:''}};
// pressed type: the glyphs filled a shade darker than the stock, an inner shadow along their upper-left walls, a lit lip under them
function dbPress(text,c,W,H,size,cls,ls=0,weight=500){const u=++dbN,dk=!!c.dark;
  return `<svg class="${cls}" ${NS} viewBox="0 0 ${W} ${H}"><defs><filter id="dbf${u}" x="-5%" y="-10%" width="110%" height="120%">
    <feFlood flood-color="#000" flood-opacity="${dk?.75:.42}"/><feComposite in2="SourceAlpha" operator="out" result="inv"/>
    <feOffset in="inv" dx="${(size*.018).toFixed(2)}" dy="${(size*.026).toFixed(2)}"/><feGaussianBlur stdDeviation="${(size*.016).toFixed(2)}"/><feComposite in2="SourceAlpha" operator="in" result="ish"/>
    <feOffset in="SourceAlpha" dx="${(size*.008).toFixed(2)}" dy="${(size*.012).toFixed(2)}"/><feGaussianBlur stdDeviation="${(size*.004).toFixed(2)}"/><feComposite in2="SourceAlpha" operator="out" result="rim"/>
    <feFlood flood-color="#fff" flood-opacity="${dk?.16:.6}"/><feComposite in2="rim" operator="in" result="hl"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="ish"/><feMergeNode in="hl"/></feMerge></filter></defs>
    <text x="50%" y="${(H*.5+size*.34).toFixed(1)}" text-anchor="middle" font-size="${size}" letter-spacing="${ls}" font-weight="${weight}" class="dbs-glyph" filter="url(#dbf${u})">${text}</text></svg>`}
const dbDate=(o,c,cls='dbs-big')=>{const p=dbParts(o);return dbPress(`${p.d}<tspan dx="${-6}" class="dbs-dot">·</tspan><tspan dx="-6">${p.m}</tspan>`,c,300,150,128,cls,-2,500)};
const dbYear=o=>`<p class="dbs-yr">${esc(dbParts(o).y)}</p>`;
const dbNames=(o,tag='p',cls='')=>{const [n1,n2]=coverNames(o);return `<${tag} class="dbs-names ${cls}">${esc(n1)}<i>&amp;</i>${esc(n2)}</${tag}>`};
FAMILY({key:'debos',name:'Debos',meaning:'Debossed date',
  blurb:'A thick card of coloured stock with a giant date pressed tone-on-tone into it, the names printed small in spaced caps. Only light and shadow show the press. The card lifts out of its recess to open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-debos${c.dark?' dbs-dark':''}"><div class="dbs-board"></div>
      <div class="dbs-card dbs-pcard reveal"><i class="dbs-light"></i>
        <div class="dbs-ph"></div>
        ${o.bismillah?'<p class="dbs-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="dbs-k kicker">${ev(o,L)}</p>${dbNames(o,'h1')}
        ${dbDate(o,c)}${dbYear(o)}
        <i class="dbs-rule"></i>
        <p class="dbs-day">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="dbs-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="dbs-ven">${esc(o.venue)}</p>`:''}</div>
      <a class="dbs-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-debos${c.dark?' dbs-dark':''}"><div class="dbs-board"></div>
      <div class="dbs-well"><div class="dbs-card dbs-ccard"><i class="dbs-light"></i>
        <p class="dbs-k">${ev(o,L)}</p>
        ${dbDate(o,c)}${dbYear(o)}
        <i class="dbs-rule"></i>${dbNames(o)}${o.venue?`<p class="dbs-cv">${esc(o.venue)}</p>`:''}</div></div>
      <div class="dbs-foot">${guest?`<p class="dbs-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="dbs-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--onacc',th.c.sheet);el.classList.toggle('dbs-dark',!!th.c.dark);
    const pg=$('.pg-debos',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){img.removeAttribute('style');img.className='dbs-photo';$('.dbs-ph',pg).append(img);pg.classList.add('has-photo');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'sage',n:'Sage',desc:'Sage stock',c:{ground:'#a9b39c',sheet:'#b9c2ad',ink:'#2d3527',accent:'#2f3a28',gold:'#8e9a80',pagefg:'#26301f'}},
    {k:'biru',n:'Biru',desc:'Dusty blue stock',c:{ground:'#a5b4c3',sheet:'#b7c4d1',ink:'#223040',accent:'#1f2f45',gold:'#8696a8',pagefg:'#1c2a3b'}},
    {k:'terakota',n:'Terakota',desc:'Terracotta stock',c:{ground:'#bf8a6e',sheet:'#cc9a7f',ink:'#3e2215',accent:'#3a1e12',gold:'#a77459',pagefg:'#341b10'}},
    {k:'jambu',n:'Jambu',desc:'Blush stock',c:{ground:'#dcbcb2',sheet:'#e6cac1',ink:'#4a2c28',accent:'#5a3430',gold:'#c09f95',pagefg:'#43282a'}},
    {k:'pasir',n:'Pasir',desc:'Sand stock',c:{ground:'#d3c3a8',sheet:'#dfd1b8',ink:'#3b2f1f',accent:'#3f3120',gold:'#b5a283',pagefg:'#34291b'}},
    {k:'lumut',n:'Lumut',desc:'Olive stock',c:{ground:'#5e6345',sheet:'#6c7152',ink:'#f1eedd',accent:'#f4f0de',gold:'#8a8e6c',pagefg:'#f1eedd',dark:'1'}},
    {k:'nila',n:'Nila',desc:'Navy stock',c:{ground:'#202b40',sheet:'#2a364d',ink:'#e8eaf0',accent:'#f0f1f5',gold:'#4c5a74',pagefg:'#e8eaf0',dark:'1'}},
    {k:'marun',n:'Marun',desc:'Oxblood stock',c:{ground:'#4f1e24',sheet:'#5e262d',ink:'#f6e6e2',accent:'#f8ebe7',gold:'#7e3e45',pagefg:'#f6e6e2',dark:'1'}},
  ]});
