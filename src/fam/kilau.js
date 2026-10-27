/* kilau: a 1000gsm duplexed card, A5 portrait, gilt-edged on all four sides, foil-stamped in gold with a big Didone
   monogram inside a laurel ring, the names in high-contrast caps and the date as large foil numerals. The card is held by
   a belly band of dark coloured stock, foil-stamped with the guest's name; a small RSVP card is tucked behind it.
   Cover: tap "Buka Jemputan" on the band: the band slides down off the card and the card lifts into the light.
   Page: the card out of its band, the band lying across the foot (a link) and the RSVP card peeking out.
   Skin: heavy cards with painted gilt edges, foil caps headings over a foil lozenge rule. */
needFont('Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900');
const kiF=n=>n.toFixed(1);
// the laurel ring: a mask (white on transparent) that the foil shows through
function kiRing(){let s='';const cx=100,cy=100;
  s+=`<circle cx="${cx}" cy="${cy}" r="70" fill="none" stroke="#fff" stroke-width="1.1"/><circle cx="${cx}" cy="${cy}" r="66" fill="none" stroke="#fff" stroke-width=".5"/>`;
  [-1,1].forEach(sd=>{for(let i=0;i<13;i++){const a=(90+sd*(26+i*9.4))*Math.PI/180,r=80,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r,t=a*180/Math.PI+(sd>0?90:-90),l=11.5-i*.42,w=3.9-i*.13;
      [-1,1].forEach(k=>{const tt=t+k*sd*-38+(sd>0?0:180);s+=`<path transform="translate(${kiF(x)} ${kiF(y)}) rotate(${kiF(tt)})" d="M0 0C${kiF(l*.35)} ${kiF(-w)} ${kiF(l*.75)} ${kiF(-w*.8)} ${kiF(l)} 0C${kiF(l*.75)} ${kiF(w*.55)} ${kiF(l*.35)} ${kiF(w*.7)} 0 0Z" fill="#fff"/>`})}
    const a0=(90+sd*22)*Math.PI/180,a1=(90+sd*140)*Math.PI/180;s+=`<path d="M${kiF(cx+Math.cos(a0)*80)} ${kiF(cy+Math.sin(a0)*80)}A80 80 0 0 ${sd>0?1:0} ${kiF(cx+Math.cos(a1)*80)} ${kiF(cy+Math.sin(a1)*80)}" fill="none" stroke="#fff" stroke-width=".9"/>`});
  s+=`<circle cx="100" cy="182" r="2.4" fill="#fff"/><circle cx="94" cy="179" r="1.6" fill="#fff"/><circle cx="106" cy="179" r="1.6" fill="#fff"/><path d="${K.star(4,5,1.4,100,19)}" fill="#fff"/>`;
  for(let i=0;i<36;i++){const a=i/36*Math.PI*2;if(Math.abs(Math.sin(a))>.97&&Math.cos(a)<0)continue;s+=`<circle cx="${kiF(cx+Math.cos(a)*61)}" cy="${kiF(cy+Math.sin(a)*61)}" r=".7" fill="#fff"/>`}
  return `<svg ${NS} viewBox="0 0 200 200">${s}</svg>`}
// a foil rule with a lozenge in the middle
const kiRule=()=>`<svg ${NS} viewBox="0 0 120 10"><path d="M0 5H50M70 5H120" stroke="#fff" stroke-width=".8"/><path d="M60 1L64 5L60 9L56 5Z" fill="#fff"/><circle cx="53" cy="5" r=".9" fill="#fff"/><circle cx="67" cy="5" r=".9" fill="#fff"/></svg>`;
// an engraved border for the card: a fine double rule with small fleurons in the corners
const kiCorner=()=>`<svg ${NS} viewBox="0 0 40 40"><path d="M2 38V14C2 7 7 2 14 2H38" fill="none" stroke="#fff" stroke-width="1"/><path d="M8 38V18C8 12 12 8 18 8H38" fill="none" stroke="#fff" stroke-width=".5"/><path d="M12 12L17 7L17 12L12 17Z" fill="#fff"/><circle cx="24" cy="5" r="1.2" fill="#fff"/><circle cx="5" cy="24" r="1.2" fill="#fff"/><path d="M30 2Q34 5 38 2M2 30Q5 34 2 38" fill="none" stroke="#fff" stroke-width=".6"/></svg>`;
const kiMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<b class="kil-jw">${esc(j)}</b>`;const [a,b]=K.initials(o);return `<b>${esc(a)}</b><i>&amp;</i><b>${esc(b)}</b>`};
const kiNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="kil-names kil-foil">${esc(n1)}<span>&amp;</span>${esc(n2)}</${tag}>`};
const kiParts=o=>{const m=String(o.date||'').match(/^(\d{4})-(\d{2})-(\d{2})/);return m?[m[3],m[2],m[1].slice(2)]:['00','00','00']};
const kiNum=o=>{const [d,m,y]=kiParts(o);return `<p class="kil-num kil-foil">${d}<i>·</i>${m}<i>·</i>${y}</p>`};
const kiVars=c=>`--kring:${K.uri(kiRing())};--krule:${K.uri(kiRule())};--kcorner:${K.uri(kiCorner())};--edge:${c.edge};--band:${c.band};--bandink:${c.bandink}`;
const kiFace=inner=>`<i class="kil-edge"></i><div class="kil-face"><i class="kil-c kil-c1 kil-foilbg"></i><i class="kil-c kil-c2 kil-foilbg"></i><i class="kil-c kil-c3 kil-foilbg"></i><i class="kil-c kil-c4 kil-foilbg"></i>${inner}</div>`;
FAMILY({key:'kilau',name:'Kilau Emas',meaning:'Gold foil and belly band',
  blurb:'A heavy gilt-edged card stamped in gold foil, a big monogram in a laurel ring and the date in large foil numerals, held by a dark belly band with the guest\'s name. The band slides off to open.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-kilau${c.dark?' kil-dark':''}" style="${kiVars(c)}"><div class="kil-table"></div>
      <div class="kil-lay">
        ${o.x_rsvp?`<a class="kil-rsvp reveal d2" data-go="rsvp" href="#"><i class="kil-edge"></i><span class="kil-rface"><b class="kil-foil">R·S·V·P</b><small>${en?'Kindly reply':'Sudi hadir?'}</small></span></a>`:''}
        <div class="kil-card kil-pcard reveal">${kiFace(`
          <div class="kil-mono"><i class="kil-ring kil-foilbg"></i><span class="kil-ini kil-foil">${kiMono(o)}</span></div>
          ${o.bismillah?'<p class="kil-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="kil-k kicker kil-foil">${ev(o,L)}</p>
          ${kiNames(o,'h1')}
          <i class="kil-rule kil-foilbg"></i>
          ${kiNum(o)}
          <p class="kil-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="kil-hj">${esc(o.hijri)}</p>`:''}
          ${o.venue?`<p class="kil-ven">${esc(o.venue)}</p>`:''}`)}</div>
        <a class="kil-band kil-pband reveal d3" data-go="when" href="#"><small class="kil-foil">${en?'Tap for':'Tekan untuk'}</small><b class="kil-foil">${en?'Event details':'Maklumat Majlis'}</b></a>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-kilau${c.dark?' kil-dark':''}" style="${kiVars(c)}"><div class="kil-table"></div>
      <div class="kil-stage">
        <div class="kil-rsvp kil-crsvp"><i class="kil-edge"></i><span class="kil-rface"><b class="kil-foil">R·S·V·P</b></span></div>
        <div class="kil-card kil-ccard">${kiFace(`
          <p class="kil-k kil-foil">${ev(o,L)}</p>
          <div class="kil-mono"><i class="kil-ring kil-foilbg"></i><span class="kil-ini kil-foil">${kiMono(o)}</span></div>
          ${kiNames(o)}
          <i class="kil-rule kil-foilbg"></i>
          ${kiNum(o)}
          ${o.venue?`<p class="kil-cv">${esc(o.venue)}</p>`:''}`)}
          <i class="kil-glint"></i>
          <div class="kil-band kil-cband"><i class="kil-bfold kil-bf1"></i><i class="kil-bfold kil-bf2"></i>
            ${guest?`<p class="kil-to"><small class="kil-foil">${L.dear}</small><b class="kil-foil">${esc(guest)}</b></p>`:`<p class="kil-to"><small class="kil-foil">${en?'You are invited':'Jemputan khas'}</small></p>`}
            <${tag} class="kil-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
        </div></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--onacc',th.c.sheet);el.style.setProperty('--krule',K.uri(kiRule()));el.style.setProperty('--edge',th.c.edge||th.c.gold);el.classList.toggle('kil-dark',!!th.c.dark);
    // with a couple photo, the photo sits inside the laurel ring instead of the initials
    const pg=$('.pg-kilau',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const m=$('.kil-mono',pg),ini=$('.kil-ini',m);img.removeAttribute('style');img.className='kil-photo';m.classList.add('has-photo');ini&&ini.replaceWith(img);ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory card, gold foil, chocolate band',c:{ground:'#d9cfbf',sheet:'#fbf7ee',ink:'#4a3f30',accent:'#7a5c2a',gold:'#c39a4a',pagefg:'#3f3424',edge:'#c39a4a',band:'#3b2a1c',bandink:'#f3e6cc'}},
    {k:'putih',n:'Putih',desc:'White card, champagne foil, dove band',c:{ground:'#e2e0dc',sheet:'#fdfdfb',ink:'#3e3c39',accent:'#73603e',gold:'#c7ad78',pagefg:'#36332e',edge:'#cdb98c',band:'#57524b',bandink:'#f4efe4'}},
    {k:'jambu',n:'Jambu',desc:'Blush card, rose gold foil, berry band',c:{ground:'#e3cfc8',sheet:'#fbf1ec',ink:'#4e3434',accent:'#8a4f4b',gold:'#c48a72',pagefg:'#4a2f2f',edge:'#c99a86',band:'#6b3238',bandink:'#f8e4dc'}},
    {k:'sage',n:'Sage',desc:'Pale sage card, gold foil, forest band',c:{ground:'#c4c9b8',sheet:'#f3f3ea',ink:'#38402f',accent:'#5b6440',gold:'#b9984f',pagefg:'#2f3527',edge:'#b9984f',band:'#2f3b2a',bandink:'#eef0e2'}},
    {k:'perak',n:'Perak',desc:'Dove grey card, silver foil, slate band',c:{ground:'#c9cbcd',sheet:'#f4f4f3',ink:'#33373c',accent:'#4a5058',gold:'#7f8790',pagefg:'#2b2f34',edge:'#b3b7bd',band:'#2c3138',bandink:'#eef0f2'}},
    {k:'nila',n:'Nila',desc:'Navy card, gold foil, ivory band',c:{ground:'#151c2d',sheet:'#1f2a44',ink:'#ece4d2',accent:'#e3c88d',gold:'#d0a85a',pagefg:'#ece4d2',edge:'#d0a85a',band:'#efe7d6',bandink:'#1f2a44',dark:'1'}},
    {k:'hitam',n:'Hitam',desc:'Black card, gold foil, ivory band',c:{ground:'#121110',sheet:'#1d1c1a',ink:'#eee6d6',accent:'#e0c48a',gold:'#cfa65a',pagefg:'#eee6d6',edge:'#cfa65a',band:'#ece4d2',bandink:'#1d1c1a',dark:'1'}},
    {k:'marun',n:'Marun',desc:'Burgundy card, gold foil, blush band',c:{ground:'#2c0f15',sheet:'#5a1a26',ink:'#f5e8dc',accent:'#ebcd92',gold:'#d4ab5e',pagefg:'#f5e8dc',edge:'#d4ab5e',band:'#f1dcd2',bandink:'#5a1a26',dark:'1'}},
  ]});
