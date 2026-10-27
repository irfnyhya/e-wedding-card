/* baroque: "Barok". A carved, gilt Louis XIV frame (Met Museum, public domain) hung on a dark damask wall, lit from above by a
   brass picture light; inside it a cream panel holds the names.
   Cover: tap "Buka Jemputan"; the frame swings open on its left side like a cabinet door.
   Page: a small gallery wall: the portrait frame with the names, and a little landscape frame below with the date and venue.
   Skin: cream panels with a gilt moulding on the damask, spaced caps headings between two hairlines. */
// frame images and their openings (percent of the image box)
const BQ_FR={2:{f:'pd-frame-2.webp',a:900/1204,o:'left:15.6%;top:11.5%;width:69.4%;height:76.3%'},3:{f:'pd-frame-3.webp',a:900/1097,o:'left:15.3%;top:12.1%;width:69.6%;height:75.7%'},5:{f:'pd-frame-5.webp',a:900/776,o:'left:20.2%;top:22.9%;width:60.1%;height:54.4%'}};
// the damask: an ogee net with a palmette in every lens, tone on tone (literal colour so it works as a data URI)
const bqDamask=col=>{const palm=(x,y,s)=>{let p='';[-58,-30,0,30,58].forEach((r,i)=>{const l=(i===2?11:i%2?9:7)*s;p+=`<ellipse cx="${x}" cy="${(y-l/2-2*s).toFixed(1)}" rx="${(2.2*s).toFixed(1)}" ry="${(l/2).toFixed(1)}" transform="rotate(${r} ${x} ${y})"/>`});
    return p+`<path d="M${x} ${y}c${-6*s} ${2*s} ${-9*s} ${7*s} ${-6*s} ${11*s}M${x} ${y}c${6*s} ${2*s} ${9*s} ${7*s} ${6*s} ${11*s}" fill="none" stroke="${col}" stroke-width="${(.9*s).toFixed(2)}"/><circle cx="${x}" cy="${y+2*s}" r="${1.4*s}"/><path d="M${x} ${y+4*s}v${9*s}" fill="none" stroke="${col}" stroke-width="${(.8*s).toFixed(2)}"/>`};
  const lens=(cx,cy)=>`<path d="M${cx} ${cy-45}C${cx+40} ${cy-25} ${cx+40} ${cy+25} ${cx} ${cy+45}C${cx-40} ${cy+25} ${cx-40} ${cy-25} ${cx} ${cy-45}Z"/>`;
  return svgUriSq(`<svg ${NS} width="60" height="90" viewBox="0 0 60 90"><g fill="none" stroke="${col}" stroke-width="1">${lens(30,45)}${lens(0,0)}${lens(60,0)}${lens(0,90)}${lens(60,90)}</g>
    <g fill="${col}">${palm(30,42,1)}${palm(0,-3,.8)}${palm(60,-3,.8)}${palm(0,87,.8)}${palm(60,87,.8)}<circle cx="30" cy="0" r="1.6"/><circle cx="30" cy="90" r="1.6"/><circle cx="0" cy="45" r="1.6"/><circle cx="60" cy="45" r="1.6"/></g></svg>`)};
// the brass picture light: a hooded trough on a curved arm
let bqN=0;
const bqLamp=()=>{const u=++bqN;return `<svg class="brq-lamp" viewBox="0 0 200 60"><defs><linearGradient id="brqL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5dc9c"/><stop offset=".35" stop-color="#c49548"/><stop offset=".7" stop-color="#7a5418"/><stop offset="1" stop-color="#3a2508"/></linearGradient>
  <linearGradient id="brqA" x1="0" x2="1"><stop offset="0" stop-color="#5a3c10"/><stop offset=".5" stop-color="#e8c77e"/><stop offset="1" stop-color="#5a3c10"/></linearGradient></defs>
  <path d="M96 60C96 44 98 34 100 26C102 34 104 44 104 60Z" fill="url(#brqA)"/><path d="M100 26C100 18 100 14 100 12" stroke="url(#brqA)" stroke-width="3"/>
  <path d="M14 18C14 10 22 6 30 6H170C178 6 186 10 186 18L180 24H20Z" fill="url(#brqL)"/><path d="M20 24H180" stroke="#fff3cf" stroke-width="1.2" stroke-opacity=".8"/>
  <path d="M30 9H170" stroke="#fff6dc" stroke-width=".8" stroke-opacity=".7"/><circle cx="12" cy="16" r="3" fill="url(#brqL)"/><circle cx="188" cy="16" r="3" fill="url(#brqL)"/></svg>`.replace(/brq([LA])/g,`brq$1${u}`)};
const bqFrame=(k,inner,cls='')=>{const F=BQ_FR[k];return `<div class="brq-frame ${cls}" style="aspect-ratio:${F.a.toFixed(4)}"><div class="brq-panel" style="${F.o}"><div class="brq-in">${inner}</div></div><img class="brq-gilt" src="${A}${F.f}" alt=""></div>`};
const bqNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="brq-names"><span>${esc(n1)}</span><em>&amp;</em><span>${esc(n2)}</span></${tag}>`};
const bqWall=c=>`<i class="brq-wall" style="background-image:${bqDamask(c.dam)}"></i><i class="brq-light"></i>`;
FAMILY({key:'baroque',name:'Barok',meaning:'Baroque frame',
  blurb:'A carved gilt baroque frame on a dark damask wall, lit by a brass picture light, with the names on a cream panel inside. The frame swings open like a cabinet door.',
  fonts:{d:"'Old Standard TT', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-baroque ${c.silver?'brq-silver':''} ${c.light?'brq-pale':''}">${bqWall(c)}
      <div class="brq-hang reveal">${bqLamp()}${bqFrame(c.fr,`${o.bismillah?'<p class="brq-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}<p class="brq-k kicker">${ev(o,L)}</p>${bqNames(o,'h1')}`,'big')}</div>
      <div class="brq-small reveal d2">${bqFrame(5,`<p class="brq-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="brq-hj">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="brq-ven">${esc(o.venue)}</p>`:''}`,'land')}</div>
      <div class="brq-pills reveal d3"><a class="brq-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="brq-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-baroque ${c.silver?'brq-silver':''} ${c.light?'brq-pale':''}">${bqWall(c)}<i class="brq-niche"></i>
      <div class="brq-hang cc">${bqLamp()}<div class="brq-door">${bqFrame(c.fr,`<p class="brq-k">${ev(o,L)}</p>${bqNames(o)}<i class="brq-rule"></i><p class="brq-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>`)}</div></div>
      <div class="brq-foot">${guest?`<p class="brq-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="brq-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('brq-pale',!!c.light);el.style.setProperty('--damask',bqDamask(c.dam));
    // a couple photo hangs in the portrait frame; the names move under it on the panel
    const pg=$('.pg-baroque',el),ph=pg&&$('.couple-ph.front',pg);if(ph)ph.classList.add('brq-ph');
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Gilt frame on a crimson damask wall',c:{ground:'#2a080d',sheet:'#f7efe0',ink:'#33221c',accent:'#6a1a22',gold:'#b8914a',pagefg:'#f4e4d2',dam:'#43121c',fr:2}},
    {k:'hitam',n:'Hitam',desc:'Gilt frame on a black damask wall',c:{ground:'#0d0c0b',sheet:'#f7f0e2',ink:'#2c2520',accent:'#3a2a1e',gold:'#b8914a',pagefg:'#efe5d4',dam:'#22201c',fr:2}},
    {k:'zamrud',n:'Zamrud',desc:'Gilt frame on an emerald damask wall',c:{ground:'#08201a',sheet:'#f6f1e3',ink:'#22302a',accent:'#174034',gold:'#b8964e',pagefg:'#e8eee2',dam:'#11362b',fr:2}},
    {k:'nila',n:'Nila',desc:'Gilt frame on a midnight damask wall',c:{ground:'#0c1228',sheet:'#f6f3ea',ink:'#23283a',accent:'#22305a',gold:'#b8984f',pagefg:'#e8eaf2',dam:'#1a2448',fr:2}},
    {k:'marun',n:'Marun',desc:'Pierced gilt frame on a maroon damask wall',c:{ground:'#1f0a0e',sheet:'#f8efe2',ink:'#33221f',accent:'#5e1a24',gold:'#b8914a',pagefg:'#f3e3d4',dam:'#3a141c',fr:3}},
    {k:'koko',n:'Koko',desc:'Pierced gilt frame on a cocoa damask wall',c:{ground:'#1a110b',sheet:'#f7efe0',ink:'#33271d',accent:'#5a3a1e',gold:'#bc924c',pagefg:'#f1e5d2',dam:'#30221a',fr:3}},
    {k:'gading',n:'Gading',desc:'Gilt frame on an ivory damask wall',c:{ground:'#e6dccb',sheet:'#fbf7ef',ink:'#3a3026',accent:'#6a4a24',gold:'#a8823e',pagefg:'#33291f',dam:'#d6c8b0',fr:2,light:1}},
    {k:'kelabu',n:'Kelabu',desc:'Silver frame on a dove-grey damask wall',c:{ground:'#d4d4d2',sheet:'#fbfbf9',ink:'#2c2f33',accent:'#3e4550',gold:'#9aa0a8',pagefg:'#26292d',dam:'#c2c3c2',fr:2,light:1,silver:1}},
  ]});
