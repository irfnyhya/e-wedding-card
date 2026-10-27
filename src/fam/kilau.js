/* kilau: a heavy ivory card (gilt-edged, 700gsm) with the names stamped big in gold foil in a high-contrast serif,
   a large foil monogram in a fine laurel ring, and deep letterpress impression. The foil is a real gradient sheen
   over the foil.jpg grain, and the light slowly travels across it.
   Cover: tap "Buka Jemputan": light runs across the foil and the card rises off the table.
   Page: the card again, larger, on a small foil date tag. Skin: ivory cards with gilt edges and foil caps headings. */
needFont('Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900');
const kiF=n=>n.toFixed(1);
// the laurel ring: a mask (white on transparent) that the foil shows through
function kiRing(){let s='';const cx=100,cy=100;
  s+=`<circle cx="${cx}" cy="${cy}" r="70" fill="none" stroke="#fff" stroke-width="1.1"/><circle cx="${cx}" cy="${cy}" r="66" fill="none" stroke="#fff" stroke-width=".5"/>`;
  // two laurel branches climbing each side from the bottom
  [-1,1].forEach(sd=>{for(let i=0;i<13;i++){const a=(90+sd*(26+i*9.4))*Math.PI/180,r=80,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r,t=a*180/Math.PI+(sd>0?90:-90),l=11.5-i*.42,w=3.9-i*.13;
      [-1,1].forEach(k=>{const tt=t+k*sd*-38+(sd>0?0:180);s+=`<path transform="translate(${kiF(x)} ${kiF(y)}) rotate(${kiF(tt)})" d="M0 0C${kiF(l*.35)} ${kiF(-w)} ${kiF(l*.75)} ${kiF(-w*.8)} ${kiF(l)} 0C${kiF(l*.75)} ${kiF(w*.55)} ${kiF(l*.35)} ${kiF(w*.7)} 0 0Z" fill="#fff"/>`})}
    const a0=(90+sd*22)*Math.PI/180,a1=(90+sd*140)*Math.PI/180;s+=`<path d="M${kiF(cx+Math.cos(a0)*80)} ${kiF(cy+Math.sin(a0)*80)}A80 80 0 0 ${sd>0?1:0} ${kiF(cx+Math.cos(a1)*80)} ${kiF(cy+Math.sin(a1)*80)}" fill="none" stroke="#fff" stroke-width=".9"/>`});
  // a small knot of berries at the base and a tiny star at the crown
  s+=`<circle cx="100" cy="182" r="2.4" fill="#fff"/><circle cx="94" cy="179" r="1.6" fill="#fff"/><circle cx="106" cy="179" r="1.6" fill="#fff"/><path d="${K.star(4,5,1.4,100,19)}" fill="#fff"/>`;
  for(let i=0;i<36;i++){const a=i/36*Math.PI*2;if(Math.abs(Math.sin(a))>.97&&Math.cos(a)<0)continue;s+=`<circle cx="${kiF(cx+Math.cos(a)*61)}" cy="${kiF(cy+Math.sin(a)*61)}" r=".7" fill="#fff"/>`}
  return `<svg ${NS} viewBox="0 0 200 200">${s}</svg>`}
// a foil rule with a lozenge in the middle
const kiRule=()=>`<svg ${NS} viewBox="0 0 120 10"><path d="M0 5H50M70 5H120" stroke="#fff" stroke-width=".8"/><path d="M60 1L64 5L60 9L56 5Z" fill="#fff"/><circle cx="53" cy="5" r=".9" fill="#fff"/><circle cx="67" cy="5" r=".9" fill="#fff"/></svg>`;
const kiMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<b class="kil-jw">${esc(j)}</b>`;const [a,b]=K.initials(o);return `<b>${esc(a)}</b><i>&amp;</i><b>${esc(b)}</b>`};
const kiNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="kil-names kil-foil">${esc(n1)}<span>&amp;</span>${esc(n2)}</${tag}>`};
const kiDate=o=>esc(fmtShort(o.date)).replace(/\./g,' · ');
FAMILY({key:'kilau',name:'Kilau Emas',meaning:'Gold foil letterpress',
  blurb:'A heavy gilt-edged ivory card with the names stamped big in gold foil and a foil monogram in a laurel ring, pressed deep into the paper. Light runs across the foil and the card rises to open.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',ring=K.uri(kiRing()),rule=K.uri(kiRule());
    return `<section class="page pg-kilau${th.c.dark?' kil-dark':''}" style="--kring:${ring};--krule:${rule};--edge:${th.c.edge}"><div class="kil-table"></div>
      <div class="kil-card kil-pcard reveal"><div class="kil-face">
        <div class="kil-mono"><i class="kil-ring kil-foilbg"></i><span class="kil-ini kil-foil">${kiMono(o)}</span></div>
        ${o.bismillah?'<p class="kil-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="kil-k kicker kil-foil">${ev(o,L)}</p>
        ${kiNames(o,'h1')}
        <i class="kil-rule kil-foilbg"></i>
        <p class="kil-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="kil-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="kil-ven">${esc(o.venue)}</p>`:''}</div></div>
      <a class="kil-pill reveal d3" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',ring=K.uri(kiRing()),rule=K.uri(kiRule());
    return `<div class="cover cv-kilau${th.c.dark?' kil-dark':''}" style="--kring:${ring};--krule:${rule};--edge:${th.c.edge}"><div class="kil-table"></div>
      <div class="kil-stage"><div class="kil-card kil-ccard"><div class="kil-face">
        <p class="kil-k kil-foil">${ev(o,L)}</p>
        <div class="kil-mono"><i class="kil-ring kil-foilbg"></i><span class="kil-ini kil-foil">${kiMono(o)}</span></div>
        ${kiNames(o)}
        <i class="kil-rule kil-foilbg"></i>
        <p class="kil-cd kil-foil">${kiDate(o)}</p>${o.venue?`<p class="kil-cv">${esc(o.venue)}</p>`:''}</div>
        <i class="kil-glint"></i></div></div>
      <div class="kil-foot">${guest?`<p class="kil-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="kil-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--onacc',th.c.sheet);el.style.setProperty('--krule',K.uri(kiRule()));el.style.setProperty('--edge',th.c.edge||th.c.gold);el.classList.toggle('kil-dark',!!th.c.dark);
    // with a couple photo, the photo sits inside the laurel ring instead of the initials
    const pg=$('.pg-kilau',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const m=$('.kil-mono',pg),ini=$('.kil-ini',m);img.removeAttribute('style');img.className='kil-photo';m.classList.add('has-photo');ini&&ini.replaceWith(img);ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory card, gold foil',c:{ground:'#d9cfbf',sheet:'#fbf7ee',ink:'#4a3f30',accent:'#7a5c2a',gold:'#c39a4a',pagefg:'#3f3424',edge:'#c39a4a'}},
    {k:'putih',n:'Putih',desc:'White card, champagne foil',c:{ground:'#e2e0dc',sheet:'#fdfdfb',ink:'#3e3c39',accent:'#73603e',gold:'#c7ad78',pagefg:'#36332e',edge:'#cdb98c'}},
    {k:'jambu',n:'Jambu',desc:'Blush card, rose gold foil',c:{ground:'#e3cfc8',sheet:'#fbf1ec',ink:'#4e3434',accent:'#8a4f4b',gold:'#c48a72',pagefg:'#4a2f2f',edge:'#c99a86'}},
    {k:'sage',n:'Sage',desc:'Pale sage card, gold foil',c:{ground:'#c4c9b8',sheet:'#f3f3ea',ink:'#38402f',accent:'#5b6440',gold:'#b9984f',pagefg:'#2f3527',edge:'#b9984f'}},
    {k:'perak',n:'Perak',desc:'Dove grey card, silver foil',c:{ground:'#c9cbcd',sheet:'#f4f4f3',ink:'#33373c',accent:'#4a5058',gold:'#8f959d',pagefg:'#2b2f34',edge:'#b3b7bd'}},
    {k:'nila',n:'Nila',desc:'Navy card, gold foil',c:{ground:'#151c2d',sheet:'#1f2a44',ink:'#ece4d2',accent:'#e3c88d',gold:'#d0a85a',pagefg:'#ece4d2',edge:'#d0a85a',dark:'1'}},
    {k:'hitam',n:'Hitam',desc:'Black card, gold foil',c:{ground:'#121110',sheet:'#1d1c1a',ink:'#eee6d6',accent:'#e0c48a',gold:'#cfa65a',pagefg:'#eee6d6',edge:'#cfa65a',dark:'1'}},
    {k:'marun',n:'Marun',desc:'Burgundy card, gold foil',c:{ground:'#2c0f15',sheet:'#5a1a26',ink:'#f5e8dc',accent:'#ebcd92',gold:'#d4ab5e',pagefg:'#f5e8dc',edge:'#d4ab5e',dark:'1'}},
  ]});
