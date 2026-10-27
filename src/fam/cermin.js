/* cermin: a 3mm gold-mirror acrylic plaque, laser-cut with an arched window, held on four polished standoff pins
   over a 600gsm cotton card. The date is laser-frosted in large Didone numerals into the mirror's base; the names are
   printed on the card and seen through the arch. A strand of pearls lies across the corner, and a frosted acrylic place
   card in front carries the guest's name and the button.
   Cover: tap "Buka Jemputan": the mirror lifts off its pins towards you and the card is left in the light.
   Page: the card, now rimmed in mirror gold, with the pearls and the place card (a link) beside it.
   Skin: arch-topped cotton cards rimmed in mirror gold, script headings over a pearl rule. */
needFont('Great+Vibes');
needFont('Playfair+Display:ital,wght@0,400..700;1,400..700');
const crF=n=>n.toFixed(1);
const crHex=h=>{h=h.replace('#','');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const crMix=(a,b,t)=>{const A1=crHex(a),B1=crHex(b);return '#'+A1.map((v,i)=>Math.round(v+(B1[i]-v)*t).toString(16).padStart(2,'0')).join('')};
let crN=0;
// the acrylic: W x H, side border s, top border t, base band b; the window is an arch
function crPanel(c,W,H,s,t,b){const u=++crN,g=c.gold,dk=crMix(g,'#1e1204',.55),md=g,lt=crMix(g,'#ffffff',.42),br=crMix(g,'#ffffff',.8);
  const r=(W-2*s)/2,ax=s,ay=t+r,wy=H-b;
  const win=`M${ax} ${wy}V${ay}A${r} ${r} 0 0 1 ${W-s} ${ay}V${wy}Z`;
  const outer=`M0 0H${W}V${H}H0Z`;
  const stud=(x,y)=>`<g><circle cx="${x+1}" cy="${y+2}" r="7.5" fill="#000" opacity=".3" filter="url(#crb${u})"/><circle cx="${x}" cy="${y}" r="7" fill="url(#crs${u})"/><circle cx="${x}" cy="${y}" r="7" fill="none" stroke="${dk}" stroke-width=".6"/><circle cx="${x}" cy="${y}" r="3.4" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width=".6"/><ellipse cx="${x-2.2}" cy="${y-2.6}" rx="2.4" ry="1.4" fill="#fff" opacity=".8"/></g>`;
  // a fine engraved line following the arch, cut into the mirror 7 units out from the window
  const e=7,ewin=`M${ax-e} ${wy+e}V${ay}A${r+e} ${r+e} 0 0 1 ${W-s+e} ${ay}V${wy+e}Z`;
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
      <path d="${ewin}" fill="none" stroke="${dk}" stroke-opacity=".55" stroke-width=".8"/><path d="${ewin}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width=".5" transform="translate(.6 .7)"/>
      <path d="M${W/2-14} ${wy+e+10}H${W/2+14}" stroke="${dk}" stroke-opacity=".5" stroke-width=".6"/>
      <rect x=".75" y=".75" width="${W-1.5}" height="${H-1.5}" fill="none" stroke="${br}" stroke-opacity=".85" stroke-width="1.5"/>
      <path d="${win}" fill="none" stroke="${dk}" stroke-opacity=".9" stroke-width="3" transform="translate(1.4 1.6)"/>
      <path d="${win}" fill="none" stroke="${br}" stroke-width="1.6" transform="translate(-.6 -.7)"/>
      ${stud(14,14)}${stud(W-14,14)}${stud(14,H-14)}${stud(W-14,H-14)}
    </g></svg>`}
// a fine crown-like cartouche printed at the top of the card: a pearl-dotted arc over a small lozenge
const crCrest=()=>{let s='<path d="M10 30Q50 2 90 30" fill="none" stroke="#fff" stroke-width=".8"/>';
  for(let i=1;i<12;i++){const t=i/12,x=(1-t)*(1-t)*10+2*(1-t)*t*50+t*t*90,y=(1-t)*(1-t)*30+2*(1-t)*t*2+t*t*30;s+=`<circle cx="${crF(x)}" cy="${crF(y-3.2)}" r="${i===6?1.6:1}" fill="#fff"/>`}
  s+='<path d="M50 22L54 27L50 32L46 27Z" fill="#fff"/><path d="M28 30H44M56 30H72" stroke="#fff" stroke-width=".6"/><circle cx="10" cy="30" r="1.4" fill="#fff"/><circle cx="90" cy="30" r="1.4" fill="#fff"/>';
  return `<svg ${NS} viewBox="0 0 100 36">${s}</svg>`};
const crPearlRule=()=>{let s='';for(let i=0;i<9;i++){const x=20+i*10,r=i===4?2.4:1.4+(4-Math.abs(4-i))*.15;s+=`<circle cx="${x}" cy="5" r="${r.toFixed(2)}" fill="#fff"/>`}return `<svg ${NS} viewBox="0 0 120 10"><path d="M0 5H14M106 5H120" stroke="#fff" stroke-width=".6"/>${s}</svg>`};
const crParts=o=>{const m=String(o.date||'').match(/^(\d{4})-(\d{2})-(\d{2})/);return m?[m[3],m[2],m[1]]:['00','00','0000']};
const crNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="crm-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${tag}>`};
const crVars=c=>`--crest:${K.uri(crCrest())};--prule:${K.uri(crPearlRule())}`;
const crPearls=(cls,style)=>`<img class="crm-pearls ${cls}" src="${A}pd-obj-pearls.webp" alt="" style="${style}">`;
FAMILY({key:'cermin',name:'Cermin',meaning:'Gold mirror and pearls',
  blurb:'A gold-mirror acrylic arch on four polished pins over a cotton card, the date frosted large into the mirror, a strand of pearls across the corner and a frosted place card with the guest\'s name. The mirror lifts away to open.',
  fonts:{d:"'Playfair Display', serif",s:"'Great Vibes', cursive",b:"'Playfair Display', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',[d,m,y]=crParts(o);
    return `<section class="page pg-cermin${th.c.dark?' crm-dark':''}" style="${crVars(th.c)}"><div class="crm-bed"></div>
      <div class="crm-play">
        <div class="crm-parch reveal"><div class="crm-pin">
          <i class="crm-crest"></i>
          ${o.bismillah?'<p class="crm-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="crm-k kicker">${ev(o,L)}</p>${crNames(o,'h1')}
          <i class="crm-prule"></i>
          <p class="crm-num">${d}<i>·</i>${m}<i>·</i>${y}</p>
          <p class="crm-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="crm-hj">${esc(o.hijri)}</p>`:''}
          ${o.venue?`<p class="crm-ven">${esc(o.venue)}</p>`:''}</div></div>
        ${crPearls('crm-ppearls reveal d2','')}
        <a class="crm-place crm-pplace reveal d3" data-go="when" href="#"><small>${en?'Tap for':'Tekan untuk'}</small><b>${en?'Event details':'Maklumat Majlis'}</b></a>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',[d,m,y]=crParts(o);
    return `<div class="cover cv-cermin${th.c.dark?' crm-dark':''}" style="${crVars(th.c)}"><div class="crm-bed"></div>
      <div class="crm-obj crm-cobj"><div class="crm-card"></div><div class="crm-win"><i class="crm-crest"></i>
          <p class="crm-k">${ev(o,L)}</p>${crNames(o)}<i class="crm-prule"></i>${o.venue?`<p class="crm-cv">${esc(o.venue)}</p>`:''}</div>
        <div class="crm-acr">${crPanel(th.c,300,452,24,24,92)}<p class="crm-base"><b>${d}<i>·</i>${m}</b><span>${y}</span></p></div></div>
      ${crPearls('crm-cpearls','')}
      <div class="crm-place crm-cplace">${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:`<small>${en?'You are invited':'Jemputan khas'}</small>`}
        <${tag} class="crm-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--onacc',th.c.sheet);el.style.setProperty('--prule',K.uri(crPearlRule()));
    const pg=$('.pg-cermin',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){img.removeAttribute('style');img.className='crm-photo';$('.crm-crest',pg).replaceWith(img);pg.classList.add('has-photo');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'emas',n:'Emas',desc:'Gold mirror on cream linen',c:{ground:'#e3d8c6',sheet:'#fbf6ec',ink:'#3e3428',accent:'#6d5226',gold:'#c9a253',pagefg:'#3e3428'}},
    {k:'perak',n:'Perak',desc:'Silver mirror on dove grey',c:{ground:'#d4d5d6',sheet:'#fafaf8',ink:'#33363b',accent:'#3f4650',gold:'#b8bdc4',pagefg:'#2c2f33'}},
    {k:'jambu',n:'Jambu',desc:'Rose gold mirror on blush',c:{ground:'#e8d3cb',sheet:'#fdf6f2',ink:'#4a3230',accent:'#86504a',gold:'#d19c86',pagefg:'#4a3230'}},
    {k:'sage',n:'Sage',desc:'Gold mirror on sage linen',c:{ground:'#c3c9b6',sheet:'#fbf9f1',ink:'#353b2d',accent:'#55603f',gold:'#c4a055',pagefg:'#2c3125'}},
    {k:'hitam',n:'Hitam',desc:'Gold mirror on black velvet',c:{ground:'#141210',sheet:'#fbf6ec',ink:'#3a3026',accent:'#6a4f22',gold:'#d0a656',pagefg:'#efe5d2',dark:'1'}},
    {k:'nila',n:'Nila',desc:'Gold mirror on midnight velvet',c:{ground:'#121a2c',sheet:'#fbf7ef',ink:'#28304a',accent:'#2b3a62',gold:'#cfa75a',pagefg:'#e9e6df',dark:'1'}},
    {k:'zamrud',n:'Zamrud',desc:'Gold mirror on emerald velvet',c:{ground:'#0e2a22',sheet:'#fbf8ef',ink:'#203229',accent:'#1f4a3a',gold:'#cda555',pagefg:'#e8efe6',dark:'1'}},
    {k:'marun',n:'Marun',desc:'Rose gold mirror on wine velvet',c:{ground:'#2e1016',sheet:'#fdf6f1',ink:'#3e2226',accent:'#7a2836',gold:'#d6a08a',pagefg:'#f5e6dd',dark:'1'}},
  ]});
