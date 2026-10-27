/* baroque: "Barok". A corner of a panelled room: a carved Louis XIV gilt frame (Met Museum, CC0) holding a Dutch flower
   piece (Ruysch / de Heem / Mignon, public domain) hangs on a damask wall above a chair rail, lit from above. A heavy
   deckle-edged invitation card leans against the frame's lower corner, fixed to the gilding with a blob of red sealing wax.
   An engraved brass plaque on the wall carries the guest's name, like the title of the work.
   Cover: tap the card; it is taken off the frame and brought up to you.
   Page: the card in your hand in front of the painting; three small brass plates below for the details.
   Skin: cotton cards in a fine gilt slip on the damask, spaced roman capitals between scrolled rules. */
needFont('Italianno');
const BQ_FR={2:{f:'pd-frame-2.webp',a:900/1204,o:'left:15.6%;top:11.5%;width:69.4%;height:76.3%'},3:{f:'pd-frame-3.webp',a:900/1097,o:'left:15.3%;top:12.1%;width:69.6%;height:75.7%'}};
// the damask: an ogee net with a palmette in every lens, tone on tone (literal colour so it works as a data URI)
const bqDamask=col=>{const palm=(x,y,s)=>{let p='';[-58,-30,0,30,58].forEach((r,i)=>{const l=(i===2?11:i%2?9:7)*s;p+=`<ellipse cx="${x}" cy="${(y-l/2-2*s).toFixed(1)}" rx="${(2.2*s).toFixed(1)}" ry="${(l/2).toFixed(1)}" transform="rotate(${r} ${x} ${y})"/>`});
    return p+`<path d="M${x} ${y}c${-6*s} ${2*s} ${-9*s} ${7*s} ${-6*s} ${11*s}M${x} ${y}c${6*s} ${2*s} ${9*s} ${7*s} ${6*s} ${11*s}" fill="none" stroke="${col}" stroke-width="${(.9*s).toFixed(2)}"/><circle cx="${x}" cy="${y+2*s}" r="${1.4*s}"/><path d="M${x} ${y+4*s}v${9*s}" fill="none" stroke="${col}" stroke-width="${(.8*s).toFixed(2)}"/>`};
  const lens=(cx,cy)=>`<path d="M${cx} ${cy-45}C${cx+40} ${cy-25} ${cx+40} ${cy+25} ${cx} ${cy+45}C${cx-40} ${cy+25} ${cx-40} ${cy-25} ${cx} ${cy-45}Z"/>`;
  return svgUriSq(`<svg ${NS} width="60" height="90" viewBox="0 0 60 90"><g fill="none" stroke="${col}" stroke-width="1">${lens(30,45)}${lens(0,0)}${lens(60,0)}${lens(0,90)}${lens(60,90)}</g>
    <g fill="${col}">${palm(30,42,1)}${palm(0,-3,.8)}${palm(60,-3,.8)}${palm(0,87,.8)}${palm(60,87,.8)}<circle cx="30" cy="0" r="1.6"/><circle cx="30" cy="90" r="1.6"/><circle cx="0" cy="45" r="1.6"/><circle cx="60" cy="45" r="1.6"/></g></svg>`)};
// a scrolled rule: two C-scrolls back to back with a lozenge, for the card and the skin headings
const BQ_SCROLL=svgUriSq(`<svg ${NS} viewBox="0 0 120 16" fill="none" stroke="#000" stroke-width=".9" stroke-linecap="round">
  <path d="M2 8H44M76 8H118"/><path d="M44 8c4 0 6-5 10-5 3 0 4 3 2 4.6-1.6 1.2-3.4-.4-2.4-1.8"/><path d="M76 8c-4 0-6-5-10-5-3 0-4 3-2 4.6 1.6 1.2 3.4-.4 2.4-1.8"/>
  <path d="M44 8c4 0 6 5 10 5 3 0 4-3 2-4.6M76 8c-4 0-6 5-10 5-3 0-4-3-2-4.6"/><path d="M60 3.6L64.4 8 60 12.4 55.6 8Z" fill="#000"/></svg>`);
const bqRule=()=>`<i class="brq-scroll" style="-webkit-mask-image:${BQ_SCROLL};mask-image:${BQ_SCROLL}"></i>`;
const bqNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="brq-names"><span>${esc(n1)}</span><em>&amp;</em><span>${esc(n2)}</span></${tag}>`};
const bqWall=c=>`<i class="brq-wall" style="background-image:${bqDamask(c.dam)}"></i><i class="brq-light"></i><i class="brq-dado" style="--panel:${c.panel}"><b></b><b></b></i>`;
const bqFrame=(c,cls)=>{const F=BQ_FR[c.fr];return `<div class="brq-frame ${cls}" style="aspect-ratio:${F.a.toFixed(4)}"><i class="brq-paint" style="${F.o};background-image:url(${A}${c.paint[0]});background-position:${c.paint[1]}"></i><img class="brq-gilt" src="${A}${F.f}" alt=""></div>`};
const bqSeal=c=>`<i class="brq-wax" style="background-image:url(${A}seal-${c.seal}.webp)"></i>`;
FAMILY({key:'baroque',name:'Barok',meaning:'Baroque frame',
  blurb:'A carved gilt frame with a Dutch flower painting on a damask wall, a deckle-edged invitation fixed to its corner with sealing wax and the guest’s name on a brass plaque. The card is taken off the frame to open.',
  fonts:{d:"'Old Standard TT', serif",s:"'Italianno', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-baroque ${c.silver?'brq-silver':''} ${c.light?'brq-pale':''}">${bqWall(c)}${bqFrame(c,'bpf')}
      <div class="brq-card bpc reveal"><div class="brq-cin">
        ${o.bismillah?'<p class="brq-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="brq-k kicker">${ev(o,L)}</p>${bqNames(o,'h1')}${bqRule()}
        <p class="brq-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="brq-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="brq-ven">${esc(o.venue)}</p>`:''}</div></div>
      <div class="brq-plates reveal d2"><a class="brq-plate" data-go="when" href="#">${en?'Details':'Butiran'}</a>${o.x_rsvp?`<a class="brq-plate" data-go="rsvp" href="#">RSVP</a>`:''}<a class="brq-plate" data-go="loc" href="#">${en?'Location':'Lokasi'}</a></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-baroque ${c.silver?'brq-silver':''} ${c.light?'brq-pale':''}">${bqWall(c)}${bqFrame(c,'bcf')}
      ${guest?`<div class="brq-plate bcp"><small>${L.dear}</small><b>${esc(guest)}</b></div>`:''}
      <${tag} class="brq-card bcc" ${attr}><span class="brq-cin"><span class="brq-k">${ev(o,L)}</span>${bqNames(o,'span')}${bqRule()}<span class="brq-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</span><span class="brq-go">${en?'Open invitation':'Buka Jemputan'}</span></span>${bqSeal(c)}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('brq-pale',!!c.light);el.classList.toggle('brq-silver',!!c.silver);el.style.setProperty('--damask',bqDamask(c.dam));
    $$('.sheet > .sec > h2',el).forEach(h=>{if(!h.nextElementSibling||!h.nextElementSibling.classList.contains('brq-scroll'))h.insertAdjacentHTML('afterend',bqRule())});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Ruysch flowers in a gilt frame on crimson damask',c:{ground:'#2a080d',sheet:'#f7efe0',ink:'#33221c',accent:'#6a1a22',gold:'#c09a52',pagefg:'#f4e4d2',dam:'#43121c',fr:2,paint:['pd-still-1.jpg','50% 40%'],seal:'merah',panel:'#1c0508'}},
    {k:'hitam',n:'Hitam',desc:'Ruysch roses in a gilt frame on black damask',c:{ground:'#0d0c0b',sheet:'#f7f0e2',ink:'#2c2520',accent:'#4a2a1e',gold:'#c09a52',pagefg:'#efe5d4',dam:'#22201c',fr:2,paint:['pd-still-4.jpg','45% 50%'],seal:'merah',panel:'#070606'}},
    {k:'zamrud',n:'Zamrud',desc:'Ruysch flowers in a gilt frame on emerald damask',c:{ground:'#08201a',sheet:'#f6f1e3',ink:'#22302a',accent:'#174034',gold:'#c09c56',pagefg:'#e8eee2',dam:'#11362b',fr:2,paint:['pd-still-1.jpg','50% 40%'],seal:'emas',panel:'#04130f'}},
    {k:'nila',n:'Nila',desc:'Mignon flowers in a gilt frame on midnight damask',c:{ground:'#0c1228',sheet:'#f6f3ea',ink:'#23283a',accent:'#22305a',gold:'#c0a05a',pagefg:'#e8eaf2',dam:'#1a2448',fr:2,paint:['pd-still-3.jpg','50% 45%'],seal:'merah',panel:'#060a18'}},
    {k:'marun',n:'Marun',desc:'Mignon flowers in a pierced gilt frame on maroon damask',c:{ground:'#1f0a0e',sheet:'#f8efe2',ink:'#33221f',accent:'#5e1a24',gold:'#c09a52',pagefg:'#f3e3d4',dam:'#3a141c',fr:3,paint:['pd-still-3.jpg','50% 45%'],seal:'emas',panel:'#120507'}},
    {k:'koko',n:'Koko',desc:'Ruysch flowers in a pierced gilt frame on cocoa damask',c:{ground:'#1a110b',sheet:'#f7efe0',ink:'#33271d',accent:'#5a3a1e',gold:'#c4a058',pagefg:'#f1e5d2',dam:'#30221a',fr:3,paint:['pd-still-1.jpg','50% 40%'],seal:'merah',panel:'#0e0905'}},
    {k:'gading',n:'Gading',desc:'De Heem flowers in a gilt frame on ivory damask',c:{ground:'#e6dccb',sheet:'#fbf7ef',ink:'#3a3026',accent:'#6a4a24',gold:'#a8823e',pagefg:'#33291f',dam:'#d6c8b0',fr:2,paint:['pd-still-2.jpg','50% 40%'],seal:'merah',panel:'#cbbca2',light:1}},
    {k:'kelabu',n:'Kelabu',desc:'De Heem flowers in a silver frame on dove-grey damask',c:{ground:'#d4d4d2',sheet:'#fbfbf9',ink:'#2c2f33',accent:'#3e4550',gold:'#9aa0a8',pagefg:'#26292d',dam:'#c2c3c2',fr:2,paint:['pd-still-2.jpg','50% 40%'],seal:'gading',panel:'#b8b9b8',light:1,silver:1}},
  ]});
