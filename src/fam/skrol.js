/* skrol: a parchment scroll on two turned wooden rollers, tied with a silk ribbon and closed with a wax seal.
   Cover: the rolled scroll lies on velvet; tap "Buka Jemputan", the seal and ribbon fall away and the scroll unrolls down the screen.
   Page: the open scroll, the invitation written on it. Skin: parchment leaves with deckled edges and a ruled heading. */
let srN=0;
// a turned roller: rod, collars, necks, beads and ball finials, lit from above, with a faint grain
const srRoller=()=>{const u=++srN,g=`url(#srg${u})`;
  const end=x=>{const m=v=>x<0?-v:v,X=v=>160+m(v);
    return `<rect x="${Math.min(X(126),X(134))}" y="4" width="8" height="32" rx="1.5" fill="${g}"/><rect x="${Math.min(X(134),X(140))}" y="11" width="6" height="18" fill="${g}"/>
      <ellipse cx="${X(143)}" cy="20" rx="4.5" ry="11.5" fill="${g}"/><rect x="${Math.min(X(147),X(150))}" y="15" width="3" height="10" fill="${g}"/><circle cx="${X(153)}" cy="20" r="6.5" fill="${g}"/>`};
  return `<svg class="sr-roll" viewBox="0 0 320 40" aria-hidden="true"><defs>
    <linearGradient id="srg${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:color-mix(in srgb,var(--wood) 55%,#000)"/><stop offset=".26" style="stop-color:color-mix(in srgb,var(--wood) 55%,#fff)"/><stop offset=".42" style="stop-color:var(--wood)"/><stop offset=".8" style="stop-color:color-mix(in srgb,var(--wood) 70%,#000)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--wood) 40%,#000)"/></linearGradient>
    <filter id="srw${u}" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".012 .55" numOctaves="3" seed="${u}"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>
    <rect x="30" y="8.5" width="260" height="23" fill="${g}"/>${end(-1)}${end(1)}
    <rect x="30" y="8.5" width="260" height="23" fill="#2a1a0e" filter="url(#srw${u})" opacity=".35"/></svg>`};
const srSeal=(o,c)=>{const j=String(o.jawi||'').trim(),[a,b]=K.initials(o);
  return `<span class="sr-seal" style="--seal:url(${A}seal-${c.seal}.webp)">${j?`<b class="sr-jw">${esc(j)}</b>`:`<b>${esc(a)}<i>&amp;</i>${esc(b)}</b>`}</span>`};
const srText=(o,L,big)=>{const [n1,n2]=coverNames(o),en=o.lang==='en';
  return `${o.bismillah?`<p class="sr-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
    <p class="sr-k kicker">${ev(o,L)}</p>
    <${big?'h1':'p'} class="sr-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${big?'h1':'p'}>
    <p class="sr-rule"><i></i></p>
    <p class="sr-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="sr-hj">${esc(o.hijri)}</p>`:''}
    ${big?`${o.venue?`<p class="sr-ven">${esc(o.venue)}</p>`:''}<a class="sr-go" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>`:''}`};
const srVars=c=>`--wood:${c.wood};--ribbon:${c.ribbon}`;
FAMILY({key:'skrol',name:'Warkah',meaning:'Royal scroll',
  blurb:'A parchment scroll on two turned wooden rollers, tied with silk ribbon and a wax seal. It unrolls down the screen to open.',
  fonts:{d:"'IM Fell English SC', serif",s:"'Pinyon Script', cursive",b:"'IM Fell English', serif"},ms:1650,
  page(o,th,L){return `<section class="page pg-skrol2" style="${srVars(th.c)}"><div class="sr-vel"></div>
    <div class="sr-scroll open reveal"><div class="sr-sheet"><div class="sr-text">${srText(o,L,true)}</div></div><div class="sr-r t">${srRoller()}</div><div class="sr-r b">${srRoller()}</div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-skrol3" style="${srVars(c)}"><div class="sr-vel"></div>
      <div class="sr-head"><p class="sr-hk">${ev(o,L)}</p><p class="sr-hn">${esc(coverNames(o)[0])}<span>&amp;</span>${esc(coverNames(o)[1])}</p><p class="sr-hd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
      ${guest?`<p class="sr-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
      <div class="sr-scroll"><div class="sr-sheet"><div class="sr-text">${srText(o,L,false)}</div></div>
        <div class="sr-r t">${srRoller()}</div><div class="sr-r b">${srRoller()}</div>
        <i class="sr-ribbon"></i>${srSeal(o,c)}</div>
      <${tag} class="sr-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--wood',th.c.wood);el.style.setProperty('--ribbon',th.c.ribbon);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Oak rollers, gold seal, ivory linen',c:{ground:'#e7dfd0',sheet:'#f3e8cf',ink:'#3a2c20',accent:'#6e4f24',gold:'#b08a4a',pagefg:'#3a2c20',line:'rgba(80,55,25,.25)',wood:'#8a5e34',ribbon:'#b8975a',seal:'emas'}},
    {k:'nila',n:'Nila',desc:'Walnut rollers, blue seal, midnight velvet',c:{ground:'#141c31',sheet:'#f2e6c9',ink:'#2e2a2a',accent:'#22355f',gold:'#c9a55e',pagefg:'#ece6d8',line:'rgba(34,53,95,.25)',wood:'#6a4426',ribbon:'#2b4170',seal:'biru'}},
    {k:'marun',n:'Marun',desc:'Walnut rollers, red seal, wine velvet',c:{ground:'#2c0d15',sheet:'#f2e5c8',ink:'#3a2420',accent:'#7a1b29',gold:'#c9a055',pagefg:'#f1e5d6',line:'rgba(122,27,41,.25)',wood:'#6a4224',ribbon:'#7a1b29',seal:'merah'}},
    {k:'zamrud',n:'Zamrud',desc:'Walnut rollers, gold seal, emerald velvet',c:{ground:'#0e231b',sheet:'#f1e6c8',ink:'#2e2a22',accent:'#1d4a35',gold:'#c6a35a',pagefg:'#e9e6d6',line:'rgba(29,74,53,.25)',wood:'#6b4527',ribbon:'#1f5a40',seal:'emas'}},
    {k:'jambu',n:'Jambu',desc:'Oak rollers, ivory seal, blush linen',c:{ground:'#efdcd6',sheet:'#f6ead3',ink:'#3a2a28',accent:'#9b4f5e',gold:'#b98f62',pagefg:'#3a2a28',line:'rgba(155,79,94,.25)',wood:'#8a5c3a',ribbon:'#c48a94',seal:'gading'}},
    {k:'sage',n:'Sage',desc:'Walnut rollers, sage seal, olive velvet',c:{ground:'#29321f',sheet:'#f1e7cc',ink:'#2c2e24',accent:'#4f6347',gold:'#bfa064',pagefg:'#e8e6d8',line:'rgba(79,99,71,.25)',wood:'#6e4a2a',ribbon:'#6f8462',seal:'sage'}},
    {k:'hitam',n:'Hitam',desc:'Ebony rollers, red seal, black velvet',c:{ground:'#121011',sheet:'#f0e3c4',ink:'#2e2620',accent:'#7a5a2a',gold:'#d2ad62',pagefg:'#ece4d6',line:'rgba(122,90,42,.25)',wood:'#3a2a20',ribbon:'#8f1d2a',seal:'merah'}},
    {k:'terakota',n:'Terakota',desc:'Walnut rollers, red seal, clay velvet',c:{ground:'#3a1d13',sheet:'#f3e5c7',ink:'#3a2a20',accent:'#a24a26',gold:'#d4a468',pagefg:'#f2e5d6',line:'rgba(162,74,38,.25)',wood:'#6e4426',ribbon:'#a8532e',seal:'merah'}},
  ]});
