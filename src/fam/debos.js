/* debos: a rigid presentation box wrapped in thick coloured stock. The lid is blind-debossed, tone on tone: a huge date
   in a light Garamond pressed deep into the board so it shows only as shadow and a lit lip, a raised double frame round
   the edge, the names letterpressed in spaced caps, and a cream label set into a pressed recess with the guest's name.
   A grosgrain pull ribbon comes out from under the lid.
   Cover: tap the ribbon "Buka Jemputan": the lid lifts and rises off the box, showing the card lying in the tray.
   Page: the open tray with the card in it; the ribbon (a link) hangs out at the foot.
   Skin: coloured-stock cards with a pressed frame, debossed headings and a pressed rule. */
let dbN=0;
const dbParts=o=>{const m=String(o.date||'').match(/^(\d{4})-(\d{2})-(\d{2})/);return m?{d:m[3],m:m[2],y:m[1]}:{d:'00',m:'00',y:''}};
// pressed type: the glyphs filled a shade darker than the stock, an inner shadow along their upper-left walls, a lit lip under them
function dbPress(text,c,W,H,size,cls,ls=0,weight=300,anchor='middle',x='50%'){const u=++dbN,dk=!!c.dark;
  return `<svg class="${cls}" ${NS} viewBox="0 0 ${W} ${H}"><defs><filter id="dbf${u}" x="-5%" y="-10%" width="110%" height="120%">
    <feFlood flood-color="#000" flood-opacity="${dk?.8:.5}"/><feComposite in2="SourceAlpha" operator="out" result="inv"/>
    <feOffset in="inv" dx="${(size*.02).toFixed(2)}" dy="${(size*.03).toFixed(2)}"/><feGaussianBlur stdDeviation="${(size*.018).toFixed(2)}"/><feComposite in2="SourceAlpha" operator="in" result="ish"/>
    <feOffset in="SourceAlpha" dx="${(size*.008).toFixed(2)}" dy="${(size*.012).toFixed(2)}"/><feGaussianBlur stdDeviation="${(size*.004).toFixed(2)}"/><feComposite in2="SourceAlpha" operator="out" result="rim"/>
    <feFlood flood-color="#fff" flood-opacity="${dk?.2:.7}"/><feComposite in2="rim" operator="in" result="hl"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="ish"/><feMergeNode in="hl"/></feMerge></filter></defs>
    <text x="${x}" y="${(H*.5+size*.34).toFixed(1)}" text-anchor="${anchor}" font-size="${size}" letter-spacing="${ls}" font-weight="${weight}" class="dbs-glyph" filter="url(#dbf${u})">${text}</text></svg>`}
// the date pressed huge on two lines: day high on the left, month low on the right, a fine pressed slash between
const dbBig=(o,c)=>{const p=dbParts(o);return `<div class="dbs-big">${dbPress(p.d,c,220,150,190,'dbs-d1',-4,300,'start','0')}${dbPress(p.m,c,220,150,190,'dbs-d2',-4,300,'end','100%')}<i class="dbs-slash"></i></div>`};
const dbNames=(o,tag='p',cls='')=>{const [n1,n2]=coverNames(o);return `<${tag} class="dbs-names ${cls}">${esc(n1)}<i>&amp;</i>${esc(n2)}</${tag}>`};
const dbRib=c=>`--rib:${c.rib};--ribink:${c.ribink}`;
FAMILY({key:'debos',name:'Debos',meaning:'Debossed box lid',
  blurb:'A rigid box wrapped in coloured stock, its lid blind-debossed with a huge date and a raised frame, the guest\'s name on a label pressed into it. Pull the ribbon and the lid lifts off.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',c=th.c,p=dbParts(o);
    return `<section class="page pg-debos${c.dark?' dbs-dark':''}" style="${dbRib(c)}"><div class="dbs-board"></div>
      <div class="dbs-tray dbs-ptray reveal"><div class="dbs-card dbs-pcard"><i class="dbs-light"></i>
        <div class="dbs-ph"></div>
        ${o.bismillah?'<p class="dbs-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="dbs-k kicker">${ev(o,L)}</p>${dbNames(o,'h1')}
        ${dbBig(o,c)}<p class="dbs-yr">${esc(p.y)}</p>
        <i class="dbs-rule"></i>
        <p class="dbs-day">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="dbs-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="dbs-ven">${esc(o.venue)}</p>`:''}</div></div>
      <a class="dbs-tab dbs-ptab reveal d2" data-go="when" href="#"><span>${en?'Event details':'Maklumat Majlis'}</span></a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c,p=dbParts(o);
    return `<div class="cover cv-debos${c.dark?' dbs-dark':''}" style="${dbRib(c)}"><div class="dbs-board"></div>
      <div class="dbs-box">
        <div class="dbs-tray dbs-ctray"><div class="dbs-card"><p class="dbs-k">${ev(o,L)}</p>${dbNames(o)}${dbBig(o,c)}</div></div>
        <div class="dbs-lid">
          <div class="dbs-top"><i class="dbs-light"></i><i class="dbs-frame"></i>
            <p class="dbs-k">${ev(o,L)}</p>
            ${dbBig(o,c)}
            <p class="dbs-yr">${esc(p.y)}</p>
            ${dbNames(o)}${o.venue?`<p class="dbs-cv">${esc(o.venue)}</p>`:''}
            <div class="dbs-well"><div class="dbs-label">${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:`<small>${en?'You are invited':'Jemputan khas'}</small><b>${en?'With love':'Dengan kasih'}</b>`}</div></div>
          </div>
          <${tag} class="dbs-tab dbs-ctab" ${attr}><span>${en?'Open invitation':'Buka Jemputan'}</span></${tag}>
        </div></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--onacc',th.c.sheet);el.classList.toggle('dbs-dark',!!th.c.dark);el.style.setProperty('--rib',th.c.rib);el.style.setProperty('--ribink',th.c.ribink);
    const pg=$('.pg-debos',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){img.removeAttribute('style');img.className='dbs-photo';$('.dbs-ph',pg).append(img);pg.classList.add('has-photo');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'sage',n:'Sage',desc:'Sage stock, forest ribbon',c:{ground:'#a3ad96',sheet:'#b9c2ad',ink:'#2d3527',accent:'#2f3a28',gold:'#8e9a80',pagefg:'#26301f',rib:'#3b4732',ribink:'#e6ead9'}},
    {k:'biru',n:'Biru',desc:'Dusty blue stock, navy ribbon',c:{ground:'#9fafbf',sheet:'#b7c4d1',ink:'#223040',accent:'#1f2f45',gold:'#8696a8',pagefg:'#1c2a3b',rib:'#1f2f47',ribink:'#e3e9f0'}},
    {k:'terakota',n:'Terakota',desc:'Terracotta stock, rust ribbon',c:{ground:'#b98468',sheet:'#cc9a7f',ink:'#3e2215',accent:'#3a1e12',gold:'#a77459',pagefg:'#341b10',rib:'#6a2f1a',ribink:'#f6e2d4'}},
    {k:'jambu',n:'Jambu',desc:'Blush stock, berry ribbon',c:{ground:'#d6b5ab',sheet:'#e6cac1',ink:'#4a2c28',accent:'#5a3430',gold:'#c09f95',pagefg:'#43282a',rib:'#7d3d43',ribink:'#f9e8e4'}},
    {k:'pasir',n:'Pasir',desc:'Sand stock, chocolate ribbon',c:{ground:'#cdbca0',sheet:'#dfd1b8',ink:'#3b2f1f',accent:'#3f3120',gold:'#b5a283',pagefg:'#34291b',rib:'#4f3a24',ribink:'#f3ead8'}},
    {k:'lumut',n:'Lumut',desc:'Olive stock, cream ribbon',c:{ground:'#565b3e',sheet:'#6c7152',ink:'#f1eedd',accent:'#f4f0de',gold:'#8a8e6c',pagefg:'#f1eedd',rib:'#e8e1c6',ribink:'#3f4429',dark:'1'}},
    {k:'nila',n:'Nila',desc:'Navy stock, champagne ribbon',c:{ground:'#1c263a',sheet:'#2a364d',ink:'#e8eaf0',accent:'#f0f1f5',gold:'#4c5a74',pagefg:'#e8eaf0',rib:'#d9c8a0',ribink:'#1f2a40',dark:'1'}},
    {k:'marun',n:'Marun',desc:'Oxblood stock, blush ribbon',c:{ground:'#481b21',sheet:'#5e262d',ink:'#f6e6e2',accent:'#f8ebe7',gold:'#7e3e45',pagefg:'#f6e6e2',rib:'#ead2c8',ribink:'#4f1e24',dark:'1'}},
  ]});
