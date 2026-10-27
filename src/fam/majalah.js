/* majalah: a high-fashion magazine cover. Masthead MEMPELAI, coverlines, the issue date is the wedding date,
   and a large botanical art block (engraved bloom, colour-field sun and arch) in place of a cover photograph.
   Opening: the cover page turns on its spine to the contents page. Skin: section tabs with editorial numbering. */
needFont('Abril+Fatface');
needFont('Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900');
needFont('Jost:wght@300;400;500;600');
let mjN=0;
const MJ_MAST='MEMPELAI';
function mjArt(o,th,small){const c=th.c;
  return `<span class="majalah-art"><i class="majalah-sun"></i><i class="majalah-ring"></i><i class="majalah-arch"></i>
   ${ENG(c.fl||'anemones',`left:${small?'14%':'20%'};bottom:-4%;height:${small?'100%':'82%'};background:var(--mast)`,'majalah-eng')}<i class="majalah-grain"></i></span>`}
function mjBars(seed){const r=rng(seed);let x=0,s='';while(x<92){const w=r()<.5?1:r()<.6?2:3;if(r()>.42)s+=`<rect x="${x}" y="0" width="${w}" height="34"/>`;x+=w}return `<svg viewBox="0 0 92 34" preserveAspectRatio="none">${s}</svg>`}
function mjContents(o,th,L,compact){const [n1,n2]=coverNames(o),en=o.lang==='en',d=new Date((o.date||'')+'T00:00:00'),ok=!isNaN(d);
  const mon=ok?`${(MONTHS[o.lang]||MONTHS.ms)[d.getMonth()]} ${d.getFullYear()}`:'';
  const row=(n,k,t,s='')=>`<li><b>${n}</b><span><small>${k}</small><em>${t}</em>${s?`<i>${s}</i>`:''}</span></li>`;
  const items=[row('04',en?'The occasion':'Majlis',ev(o,L),esc(o.hosts||'')),
    row('11',en?'Date':'Tarikh',esc(fmtDate(o.date,o.lang)),esc(o.hijri||'')),
    row('12',en?'Time':'Masa',`${esc(fmtTime(o.start,o.lang))} – ${esc(fmtTime(o.end,o.lang))}`),
    row('19',en?'Venue':'Tempat',esc(o.venue),esc(o.address||''))];
  if(o.deadline&&!compact)items.push(row('26','RSVP',(en?'Kindly reply by ':'Mohon maklum balas sebelum ')+esc(fmtDate(o.deadline,o.lang,false))));
  return `<div class="majalah-top"><span>${MJ_MAST}</span><span>${esc(mon)} · No. ${ok?d.getDate():1}</span></div>
   <div class="majalah-ttl"><h2>${en?'Contents':'Kandungan'}</h2><span>${en?'In this issue':'Dalam edisi ini'}</span></div>
   <div class="majalah-feat"><div class="majalah-thumb">${mjArt(o,th,true)}<span class="majalah-cap">${en?'On the cover':'Muka depan'}</span></div>
    <div class="majalah-who"><small>${en?'Cover story':'Kisah utama'}</small><h1 class="names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1><p>${en?'Two families, one celebration, and you are invited.':'Dua keluarga, satu raikan, dan anda dijemput hadir.'}</p></div></div>
   <ol class="majalah-list">${items.join('')}</ol>
   <div class="majalah-folio"><span>3</span><span>${MJ_MAST} · ${esc(mon)}</span></div>`}

FAMILY({key:'majalah',name:'Majalah',meaning:'Magazine cover',
  blurb:'A fashion-magazine cover with the MEMPELAI masthead, coverlines and a botanical art block; the issue date is the wedding date and the cover turns to a contents page.',
  fonts:{d:"'Jost', sans-serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const c=th.c;return `<section class="page pg-majalah" style="--mast:${c.mast};--art2:${c.art2}"><div class="majalah-pg reveal">${mjContents(o,th,L,false)}</div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',d=new Date((o.date||'')+'T00:00:00'),ok=!isNaN(d);
    const iss=ok?`${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`:'';
    const mon=ok?`${(MONTHS[o.lang]||MONTHS.ms)[d.getMonth()]} ${d.getFullYear()}`:'';
    return `<div class="cover cv-majalah" style="--mast:${c.mast};--art2:${c.art2}"><div class="majalah-floor"></div>
    <div class="majalah-stage">
     <div class="majalah-under">${mjContents(o,th,L,true)}</div>
     <div class="majalah-cov"><div class="majalah-face front">${mjArt(o,th,false)}
       <p class="majalah-pre"><span>${en?'The wedding issue':'Edisi perkahwinan'}</span><span>${esc(mon)}</span></p>
       <p class="majalah-mast">${MJ_MAST}</p>
       <p class="majalah-cl a"><small>${en?'Special edition':'Edisi khas'}</small><em>${ev(o,L)}</em></p>
       <p class="majalah-cl b"><small>${en?'The vows':'Akad &amp; jamuan'}</small><b>${esc(fmtTime(o.start,o.lang))}</b></p>
       <p class="majalah-cl c"><small>${en?'Where':'Di'}</small><em>${esc(o.venue)}</em></p>
       <p class="majalah-main"><small>${en?'Exclusive':'Eksklusif'}</small><em>${esc(n1)} <span>&amp;</span> ${esc(n2)}</em></p>
       <span class="majalah-bc">${mjBars(7)}<i>${iss}</i></span><span class="majalah-price">${en?'Free · by invitation':'Percuma · jemputan'}</span>
       <i class="majalah-shade"></i></div>
      <div class="majalah-face back"><i class="majalah-shade"></i></div></div>
     <${tag} class="majalah-tap" ${attr} aria-label="${L.open}"></${tag}>
    </div>
    <div class="majalah-foot">${guest?`<p class="majalah-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="majalah-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th,L){K.cards(el);const en=o.lang==='en',d=new Date((o.date||'')+'T00:00:00');el.style.setProperty('--mast',th.c.mast);el.style.setProperty('--art2',th.c.art2);
    const KK={intro:en?'Opening':'Pembuka',when:en?'Agenda':'Agenda',count:en?'Countdown':'Detik',sched:en?'Programme':'Aturcara',gallery:en?'Gallery':'Galeri',doa:en?'Prayer':'Doa',rsvp:'RSVP',wishes:en?'Notes':'Ucapan',gift:en?'Gifts':'Hadiah',wishlist:en?'Wishlist':'Hajat',contact:en?'Contact':'Hubungi'};
    const mon=isNaN(d)?'':`${(MONTHS[o.lang]||MONTHS.ms)[d.getMonth()]} ${d.getFullYear()}`;
    $$('.sec',el).forEach((s,i)=>{s.classList.add('majalah-sec');const n=String(i+1).padStart(2,'0');
      s.insertAdjacentHTML('afterbegin',`<span class="majalah-tab"><b>${n}</b><i>${KK[s.dataset.s]||''}</i></span>`);
      s.insertAdjacentHTML('beforeend',`<span class="majalah-fol"><span>${MJ_MAST}</span><span>${esc(mon)}</span><span>${4+i*3}</span></span>`)})},
  themes:[
    {k:'merah',n:'Merah',desc:'Red colour field, gold sun, ivory masthead',c:{ground:'#e4dcd2',sheet:'#f6f1ea',ink:'#1a1716',accent:'#b3242c',gold:'#f0b84a',pagefg:'#1a1716',mast:'#f7efe3',art2:'#7a121a',fl:'anemones'}},
    {k:'nila',n:'Nila',desc:'Cobalt field, peach sun, night table',c:{ground:'#141a2c',sheet:'#f4f2ee',ink:'#151a26',accent:'#203f86',gold:'#f2c6a8',pagefg:'#f0ebe0',mast:'#f6f1e8',art2:'#13285a',fl:'iris'}},
    {k:'sage',n:'Sage',desc:'Sage field, cream sun, dark masthead',c:{ground:'#e6e8de',sheet:'#f5f4ee',ink:'#1d241c',accent:'#9fae8c',gold:'#efe2c4',pagefg:'#1d241c',mast:'#1e2a1e',art2:'#5f7352',fl:'white-roses'}},
    {k:'hitam',n:'Hitam',desc:'Black cover, gold sun',c:{ground:'#0c0c0c',sheet:'#f3efe7',ink:'#151515',accent:'#161616',gold:'#c9a35a',pagefg:'#efe7d8',mast:'#f3ece0',art2:'#2a2a2a',fl:'cabbage-rose'}},
    {k:'jambu',n:'Jambu',desc:'Blush field, crimson sun',c:{ground:'#f3e6e2',sheet:'#fbf5f2',ink:'#2e1d22',accent:'#e9b7b9',gold:'#b7253a',pagefg:'#3a1a22',mast:'#3a1a22',art2:'#c27380',fl:'pink-rose'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric field, rust sun',c:{ground:'#efe2c2',sheet:'#fbf6ea',ink:'#24180e',accent:'#e3a72f',gold:'#7a2a16',pagefg:'#2a160c',mast:'#2a160c',art2:'#c4781c',fl:'hibiscus'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald field, champagne sun',c:{ground:'#0c2a22',sheet:'#f4f1e8',ink:'#14241f',accent:'#0f5a48',gold:'#e7c37a',pagefg:'#efe7d4',mast:'#f4ecd8',art2:'#0a3d31',fl:'lotus'}},
    {k:'ungu',n:'Ungu',desc:'Lilac field, apricot sun',c:{ground:'#e9e4ef',sheet:'#f7f4f8',ink:'#221c2e',accent:'#8a78b8',gold:'#f3d6a6',pagefg:'#221c2e',mast:'#fbf6ee',art2:'#5f4f91',fl:'jasmine'}},
  ]});
