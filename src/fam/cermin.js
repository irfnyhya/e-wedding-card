/* cermin: a gold-mirror acrylic panel with an arched window, held off a cream card by four metal standoff pins.
   The mirror is drawn in SVG: a polished metal gradient, soft blurred reflections of the room, a bevelled cut edge
   round the arch, and the date laser-frosted into the base. The names are on the cream card seen through the arch.
   Cover: tap "Buka Jemputan" and the acrylic lifts off the card. Page: the same panel, larger.
   Skin: arch-topped cream cards rimmed in mirror gold. */
needFont('Great+Vibes');
const crF=n=>n.toFixed(1);
const crHex=h=>{h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const crMix=(a,b,t)=>{const A1=crHex(a),B1=crHex(b);return '#'+A1.map((v,i)=>Math.round(v+(B1[i]-v)*t).toString(16).padStart(2,'0')).join('')};
let crN=0;
// the acrylic: W x H, side border s, top border t, base band b; the window is an arch
function crPanel(c,W,H,s,t,b){const u=++crN,g=c.gold,dk=crMix(g,'#1e1204',.5),md=g,lt=crMix(g,'#ffffff',.42),br=crMix(g,'#ffffff',.78);
  const r=(W-2*s)/2,ax=s,ay=t+r,wy=H-b;
  const win=`M${ax} ${wy}V${ay}A${r} ${r} 0 0 1 ${W-s} ${ay}V${wy}Z`;
  const outer=`M0 0H${W}V${H}H0Z`;
  const stud=(x,y)=>`<g><circle cx="${x+1}" cy="${y+2}" r="7.5" fill="#000" opacity=".28" filter="url(#crb${u})"/><circle cx="${x}" cy="${y}" r="7" fill="url(#crs${u})"/><circle cx="${x}" cy="${y}" r="7" fill="none" stroke="${dk}" stroke-width=".6"/><circle cx="${x}" cy="${y}" r="3.4" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width=".6"/><ellipse cx="${x-2.2}" cy="${y-2.6}" rx="2.4" ry="1.4" fill="#fff" opacity=".8"/></g>`;
  return `<svg class="crm-svg" ${NS} viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>
    <linearGradient id="crg${u}" x1="0" y1="0" x2="1" y2="1.25"><stop offset="0" stop-color="${lt}"/><stop offset=".12" stop-color="${md}"/><stop offset=".26" stop-color="${dk}"/><stop offset=".38" stop-color="${md}"/><stop offset=".47" stop-color="${br}"/><stop offset=".55" stop-color="${lt}"/><stop offset=".68" stop-color="${md}"/><stop offset=".82" stop-color="${dk}"/><stop offset="1" stop-color="${md}"/></linearGradient>
    <radialGradient id="crs${u}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${br}"/><stop offset=".45" stop-color="${md}"/><stop offset="1" stop-color="${dk}"/></radialGradient>
    <filter id="crb${u}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter>
    <filter id="crr${u}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
    <clipPath id="crc${u}"><path d="${outer}${win}" clip-rule="evenodd"/></clipPath></defs>
    <g clip-path="url(#crc${u})">
      <rect width="${W}" height="${H}" fill="url(#crg${u})"/>
      <path d="M${-20} ${H*.18}L${W*.62} ${-20}L${W*.78} ${-20}L${-20} ${H*.34}Z" fill="#fff" opacity=".42" filter="url(#crr${u})"/>
      <path d="M${W*.1} ${H+20}L${W+20} ${H*.36}L${W+20} ${H*.44}L${W*.24} ${H+20}Z" fill="#fff" opacity=".3" filter="url(#crr${u})"/>
      <path class="crm-refl" d="M${W*.2} ${H+30}L${W*.5} -30L${W*.58} -30L${W*.28} ${H+30}Z" fill="#fff" opacity=".28" filter="url(#crr${u})"/>
      <ellipse cx="${W*.84}" cy="${H*.9}" rx="${W*.3}" ry="${H*.1}" fill="${dk}" opacity=".35" filter="url(#crr${u})"/>
      <rect x=".75" y=".75" width="${W-1.5}" height="${H-1.5}" fill="none" stroke="${br}" stroke-opacity=".8" stroke-width="1.5"/>
      <path d="${win}" fill="none" stroke="${dk}" stroke-opacity=".9" stroke-width="3" transform="translate(1.4 1.6)"/>
      <path d="${win}" fill="none" stroke="${br}" stroke-width="1.6" transform="translate(-.6 -.7)"/>
      ${stud(14,14)}${stud(W-14,14)}${stud(14,H-14)}${stud(W-14,H-14)}
    </g></svg>`}
const crNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="crm-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${tag}>`};
FAMILY({key:'cermin',name:'Cermin',meaning:'Gold mirror acrylic',
  blurb:'A gold-mirror acrylic panel with an arched window, pinned over a cream card; the names show through the arch and the date is frosted into the mirror. The acrylic lifts away to open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en';
    return `<section class="page pg-cermin"><div class="crm-bed"></div>
      <div class="crm-obj crm-pobj reveal"><div class="crm-card"></div><div class="crm-win">
          ${o.bismillah?'<p class="crm-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="crm-k kicker">${ev(o,L)}</p>${crNames(o,'h1')}
          <p class="crm-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="crm-hj">${esc(o.hijri)}</p>`:''}</div>
        <div class="crm-acr">${crPanel(th.c,300,470,24,24,74)}<p class="crm-base">${o.venue?esc(o.venue):esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
      <a class="crm-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-cermin"><div class="crm-bed"></div>
      <div class="crm-obj crm-cobj"><div class="crm-card"></div><div class="crm-win">
          <p class="crm-k">${ev(o,L)}</p>${crNames(o)}${o.venue?`<p class="crm-cv">${esc(o.venue)}</p>`:''}</div>
        <div class="crm-acr">${crPanel(th.c,300,430,24,24,70)}<p class="crm-base">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
      <div class="crm-foot">${guest?`<p class="crm-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="crm-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--onacc',th.c.sheet);
    const pg=$('.pg-cermin',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){img.removeAttribute('style');img.className='crm-photo';$('.crm-win',pg).prepend(img);pg.classList.add('has-photo');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'emas',n:'Emas',desc:'Gold mirror on cream',c:{ground:'#e3d8c6',sheet:'#fbf6ec',ink:'#3e3428',accent:'#6d5226',gold:'#c9a253',pagefg:'#3e3428'}},
    {k:'perak',n:'Perak',desc:'Silver mirror on dove grey',c:{ground:'#d4d5d6',sheet:'#fafaf8',ink:'#33363b',accent:'#3f4650',gold:'#b8bdc4',pagefg:'#2c2f33'}},
    {k:'jambu',n:'Jambu',desc:'Rose gold mirror on blush',c:{ground:'#e8d3cb',sheet:'#fdf6f2',ink:'#4a3230',accent:'#86504a',gold:'#d19c86',pagefg:'#4a3230'}},
    {k:'sage',n:'Sage',desc:'Gold mirror on sage linen',c:{ground:'#c3c9b6',sheet:'#fbf9f1',ink:'#353b2d',accent:'#55603f',gold:'#c4a055',pagefg:'#2c3125'}},
    {k:'hitam',n:'Hitam',desc:'Gold mirror on black velvet',c:{ground:'#141210',sheet:'#fbf6ec',ink:'#3a3026',accent:'#6a4f22',gold:'#d0a656',pagefg:'#efe5d2',dark:'1'}},
    {k:'nila',n:'Nila',desc:'Gold mirror on midnight velvet',c:{ground:'#121a2c',sheet:'#fbf7ef',ink:'#28304a',accent:'#2b3a62',gold:'#cfa75a',pagefg:'#e9e6df',dark:'1'}},
    {k:'zamrud',n:'Zamrud',desc:'Gold mirror on emerald velvet',c:{ground:'#0e2a22',sheet:'#fbf8ef',ink:'#203229',accent:'#1f4a3a',gold:'#cda555',pagefg:'#e8efe6',dark:'1'}},
    {k:'marun',n:'Marun',desc:'Rose gold mirror on wine velvet',c:{ground:'#2e1016',sheet:'#fdf6f1',ink:'#3e2226',accent:'#7a2836',gold:'#d6a08a',pagefg:'#f5e6dd',dark:'1'}},
  ]});
