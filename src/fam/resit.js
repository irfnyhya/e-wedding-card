/* resit: a letterpress receipt slip from an old receipt book, on cotton paper. Printed in one ink with a red serial number,
   filled in by hand (the guest's name, the date) and finished with a round rubber stamp "Dijemput".
   Cover: the slip still in the book with its stub; tap "Buka Jemputan" and it is torn off along the perforation.
   Page: the torn slip with the full details, the programme written in as the items. Skin: ruled cotton slips with a perforated top. */
let rsN=0;
const rsVars=c=>`--stamp:${c.stamp};--num:${c.num};--pen:${c.pen};--slip:${c.slip||c.sheet}`;
const rsNo=o=>{const d=new Date((o.date||'')+'T00:00:00');return isNaN(d)?'0001':String(d.getDate()).padStart(2,'0')+String(d.getMonth()+1).padStart(2,'0')};
const rsHand=o=>{const d=new Date((o.date||'')+'T00:00:00');if(isNaN(d))return esc(fmtShort(o.date));const m=(o.lang==='en'?['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']:['Jan','Feb','Mac','Apr','Mei','Jun','Jul','Ogo','Sep','Okt','Nov','Dis'])[d.getMonth()];return `${d.getDate()} ${m} ${d.getFullYear()}`};
// the rubber stamp: two rings, the couple's names around, the word in the middle; worn a little by a noise mask
function rsStamp(o,L,uid){const [n1,n2]=coverNames(o),en=o.lang==='en',ring=`${n1} & ${n2} · ${rsHand(o)} · `.toUpperCase();
  return `<svg class="rs-stamp" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="rsp${uid}" d="M60 60m-41 0a41 41 0 1 1 82 0a41 41 0 1 1 -82 0"/>
    <filter id="rsf${uid}" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="${uid}"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.7 1.6"/><feComposite in="SourceGraphic" operator="in"/></filter></defs>
   <g filter="url(#rsf${uid})" fill="currentColor" stroke="currentColor">
    <circle cx="60" cy="60" r="56" fill="none" stroke-width="2.6"/><circle cx="60" cy="60" r="51.5" fill="none" stroke-width=".9"/><circle cx="60" cy="60" r="31" fill="none" stroke-width=".9"/>
    <text font-family="'IM Fell English SC',serif" font-size="9.6" letter-spacing="1.6" stroke="none"><textPath href="#rsp${uid}" textLength="252">${esc(ring)}</textPath></text>
    <path d="M27 52h66M27 68h66" stroke-width=".9"/>
    <text x="60" y="64.2" text-anchor="middle" font-family="'IM Fell English SC',serif" font-size="12.5" letter-spacing="1.4" stroke="none">${en?'INVITED':'DIJEMPUT'}</text></g></svg>`};
const rsHead=(o,L,pg)=>{const [n1,n2]=coverNames(o),en=o.lang==='en';return `<div class="rs-head">
    <p class="rs-no">N<sup>o</sup> ${rsNo(o)}</p><svg class="rs-orn" viewBox="0 0 60 12" aria-hidden="true"><path d="M2 6.5C10 6.5 12 2 19 3.4S25 9 22 9.4 18.6 6 22 5.4M58 6.5C50 6.5 48 2 41 3.4S35 9 38 9.4 41.4 6 38 5.4" fill="none" stroke="currentColor" stroke-width=".8" stroke-linecap="round"/><path d="M30 2.2L33.6 6 30 9.8 26.4 6Z" fill="currentColor"/><circle cx="30" cy="6" r="1" fill="var(--sheet)"/></svg>
    <p class="rs-title">${en?'Receipt':'Resit'}</p><i class="rs-dbl"></i>
    <p class="rs-k${pg?' kicker':''}">${ev(o,L)}</p>
    ${pg?`<h1 class="names rs-names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1>`:`<p class="rs-names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p>`}
    ${o.venue?`<p class="rs-ven">${esc(o.venue)}</p>`:''}</div>`};
const rsLine=(lab,val,cls='')=>`<p class="rs-line ${cls}"><span>${lab}</span><b>${val}</b></p>`;

FAMILY({key:'resit',name:'Resit',meaning:'Letterpress receipt',
  blurb:'A letterpress receipt slip on cotton paper, filled in by hand with the guest’s name and stamped “Dijemput”. Guests tear it off the book to open the card.',
  fonts:{d:"'IM Fell English SC', serif",s:"'Homemade Apple', cursive",b:"'IM Fell English', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',u=++rsN,tr=(o.schedule||[]).filter(s=>s.label).slice(0,4);
    return `<section class="page pg-resit2${th.c.dark?' rs-dark':''}" style="${rsVars(th.c)}"><div class="rs-counter"></div>
    <div class="rs-slip rs-torn reveal">${rsHead(o,L,true)}
      ${rsLine(en?'Date':'Tarikh',esc(fmtDate(o.date,o.lang)))}
      ${tr.length?`<div class="rs-tab"><p class="rs-th"><span>${en?'Particulars':'Butiran'}</span><span>${en?'Time':'Masa'}</span></p>
        ${tr.map(s=>`<p class="rs-tr"><span>${esc(s.label)}</span><b>${esc(fmtTime(s.time,o.lang))}</b></p>`).join('')}</div>`:''}
      <div class="rs-foot"><p class="rs-ty">${en?'Thank you. See you there.':'Terima kasih. Jumpa di majlis nanti.'}</p><div class="rs-st rs-st-pg">${rsStamp(o,L,'p'+u)}</div></div>
      <div class="rs-pills"><a class="rs-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="rs-pill" data-go="rsvp" href="#">RSVP</a>`:''}</div>
    </div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',u=++rsN;
    return `<div class="cover cv-resit2${th.c.dark?' rs-dark':''}" style="${rsVars(th.c)}"><div class="rs-counter"></div>
    <div class="rs-book">
      <div class="rs-stub"><p class="rs-sno">N<sup>o</sup> ${rsNo(o)}</p><p class="rs-sv">${en?'Counterfoil':'Salinan'}</p><p class="rs-sh">${guest?esc(guest):(en?'Guest':'Tetamu')}</p></div>
      <div class="rs-slip rs-main">${rsHead(o,L,false)}
        ${rsLine(en?'To':'Kepada',guest?esc(guest):(en?'Our honoured guest':'Tetamu yang dihormati'),'hand')}
        ${rsLine(en?'Date':'Tarikh',esc(rsHand(o)),'hand')}
        <div class="rs-tab"><p class="rs-th"><span>${en?'Particulars':'Perkara'}</span><span>${en?'Amount':'Jumlah'}</span></p>
          <p class="rs-tr"><span>${en?'Invitation to the wedding':'Jemputan ke majlis perkahwinan'}</span><b>${en?'With love':'Ikhlas'}</b></p>
          <p class="rs-tr"><span>${en?'Your prayers and blessings':'Doa restu tuan/puan'}</span><b>${en?'Much loved':'Dihargai'}</b></p>
          <p class="rs-tr rs-tot"><span>${en?'Total':'Jumlah'}</span><b>${en?'Priceless':'Tak ternilai'}</b></p></div>
        <div class="rs-st">${rsStamp(o,L,'c'+u)}</div>
      </div>
    </div>
    <${tag} class="rs-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);el.setAttribute('style',(el.getAttribute('style')||'')+';'+rsVars(th.c));el.classList.toggle('rs-dark',!!th.c.dark);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'putih',n:'Putih',desc:'White cotton slip, black letterpress, red stamp, on pale marble',c:{ground:'#dcd8d1',sheet:'#fbf9f4',ink:'#24211d',accent:'#24211d',gold:'#9c8458',pagefg:'#2b2824',stamp:'#b0303a',num:'#b0303a',pen:'#1f2f63',dark:''}},
    {k:'hitam',n:'Hitam',desc:'Ivory slip, black ink, red stamp, on black marble',c:{ground:'#1a1918',sheet:'#f6f2e8',ink:'#1f1d1a',accent:'#1f1d1a',gold:'#9c8458',pagefg:'#ece6da',stamp:'#a8323a',num:'#a8323a',pen:'#1f2f63',dark:'1'}},
    {k:'merah',n:'Merah',desc:'Cream slip, maroon ink and stamp, on a red counter',c:{ground:'#6a1d22',sheet:'#fbf6ee',ink:'#2a1c1c',accent:'#7a1d26',gold:'#a8844a',pagefg:'#f6ede2',stamp:'#9a1f2b',num:'#9a1f2b',pen:'#1f2f63',dark:'1'}},
    {k:'biru',n:'Biru',desc:'White slip, navy letterpress, blue stamp',c:{ground:'#d9e0e8',sheet:'#fbfbf8',ink:'#1d2433',accent:'#22385e',gold:'#9c8a62',pagefg:'#1d2433',stamp:'#2a4f8e',num:'#b0303a',pen:'#22385e',dark:''}},
    {k:'pic',n:'Pic',desc:'Warm slip, brown ink, coral stamp, peach counter',c:{ground:'#efd9c8',sheet:'#fffaf4',ink:'#3a2620',accent:'#5a3326',gold:'#a88358',pagefg:'#3a2620',stamp:'#c4573a',num:'#c4573a',pen:'#3a2a5a',dark:''}},
    {k:'hijau',n:'Hijau',desc:'Cream slip, green ink and stamp, forest counter',c:{ground:'#1f3229',sheet:'#f9f8f1',ink:'#1e2822',accent:'#24503c',gold:'#9c8a5a',pagefg:'#e6ece4',stamp:'#2f6b4f',num:'#a8323a',pen:'#1f2f63',dark:'1'}},
    {k:'ungu',n:'Ungu',desc:'White slip, plum ink, violet stamp, lilac counter',c:{ground:'#e3dde9',sheet:'#fcfbfd',ink:'#251f33',accent:'#45325f',gold:'#9a8a6a',pagefg:'#251f33',stamp:'#6a4a9a',num:'#6a4a9a',pen:'#45325f',dark:''}},
    {k:'kuning',n:'Kuning',desc:'Buttery slip, brown ink, red stamp, turmeric counter',c:{ground:'#e8d398',sheet:'#fffcf2',ink:'#2e2418',accent:'#5a3c12',gold:'#9a7034',pagefg:'#2b2418',stamp:'#b0303a',num:'#b0303a',pen:'#1f2f63',dark:''}},
  ]});
