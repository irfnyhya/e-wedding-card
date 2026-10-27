/* akhbar: a 1950s Malayan broadsheet, folded in half and lying on the table. Blackletter masthead, a dateline
   between double rules, the names as the headline, an engraved view of old Malaya (public-domain postcard, redrawn as
   line engraving) and the announcement set in justified columns with a drop cap.
   Cover: the folded paper; tap it and the lower half unfolds towards you.
   Page: the whole front page, crease and all; the couple photo runs as a halftone under the dateline.
   Skin: newsprint clippings on the table, each headed like a column with a small spot-colour kicker. */
const NW_CAP={kl:['Pejabat Percetakan Kerajaan, Kuala Lumpur','Government Printing Office, Kuala Lumpur'],masjid:["Masjid Dato' Dagang, 1930","Masjid Dato' Dagang, 1930"],
  pinang:['Pantai di Pulau Pinang','The shore at Penang'],pasar:['Pasar Besar, Kuala Lumpur','Central Market, Kuala Lumpur']};
const nwSk=(c,en,cls='',f='figure',fc='figcaption')=>`<${f} class="nw-fig ${cls}"><i class="nw-sk" style="--sk:url(${A}sk-${c.sk}.webp)"></i><${fc} class="nw-cap">${esc(NW_CAP[c.sk][en?1:0])}</${fc}></${f}>`;
const nwRoman=n=>{const r=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let s='';for(const [v,t] of r)while(n>=v){s+=t;n-=v}return s};
function nwLead(o,en){const [n1,n2]=coverNames(o),h=esc(o.hosts||''),t=esc(fmtTime(o.start,o.lang)),v=esc(o.venue||''),d=esc(fmtDate(o.date,o.lang));
  return en?[`With joy and gratitude, ${h||'the family'} invite you and your family to the wedding of ${esc(n1)} and ${esc(n2)}.`,
      `The celebration will be held on ${d}, from ${t}, at ${v}. Your presence and prayers would mean a great deal to us.`]
    :[`Dengan penuh kesyukuran, ${h||'keluarga kami'} menjemput tuan/puan sekeluarga ke majlis perkahwinan ${esc(n1)} dan ${esc(n2)}.`,
      `Majlis akan berlangsung pada ${d}, mulai ${t}, di ${v}. Kehadiran dan doa restu tuan/puan amat kami hargai.`]}
const nwMast=(o,L,en)=>{const y=new Date((o.date||'2026-01-01')+'T00:00:00').getFullYear()||2026;
  return `<div class="nw-ears"><span class="nw-ear">${en?'Special<br>edition':'Edisi<br>khas'}</span><span class="nw-mast" style="font-size:${en?7.2:9.4}cqi">${en?'The Wedding Times':'Berita Kahwin'}</span><span class="nw-ear">${en?'Price:<br>your prayers':'Harga:<br>doa restu'}</span></div>
  <div class="nw-date"><span>${en?'No. 1':'Bil. 1'}</span><span>${esc(fmtDate(o.date,o.lang))}</span><span>${o.hijri?esc(o.hijri):(en?'Vol. ':'Jilid ')+nwRoman(y-1949)}</span></div>`};
FAMILY({key:'akhbar',name:'Akhbar',meaning:'Newspaper front page',
  blurb:'A 1950s Malayan broadsheet folded on the table: blackletter masthead, the names as the headline and an engraved view of old Malaya. It unfolds to open.',
  fonts:{d:"'Old Standard TT', serif",s:"'Old Standard TT', serif",b:"'Old Standard TT', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c,[p1,p2]=nwLead(o,en),photo=typeof couplePhotoOf==='function'&&couplePhotoOf(o);
    return `<section class="page pg-akhbar2"><i class="nw-tex"></i><i class="nw-crease"></i>
      <header class="nw-head reveal">${nwMast(o,L,en)}</header>
      ${photo?'':nwSk(c,en,'reveal d1')}
      <p class="nw-k kicker reveal d1">${ev(o,L)}</p>
      <h1 class="names nw-h reveal d1">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1>
      <p class="nw-deck reveal d2">${en?'To be wed on':'Akan diijabkabulkan pada'} ${esc(fmtDate(o.date,o.lang))}</p>
      <div class="nw-cols reveal d2">
        <div class="nw-story"><p><b class="nw-dc">${esc((p1.replace(/<[^>]+>/g,'')||'D')[0])}</b>${p1.slice(1)}</p><p>${p2}</p></div>
        <div class="nw-side">
          <a class="nw-box" data-go="when" href="#"><small>${en?'Details':'Butiran majlis'}</small><b>${esc(fmtTime(o.start,o.lang))}</b><span>${esc(o.venue)}</span><em>${en?'Read more':'Baca lanjut'} &rsaquo;</em></a>
          ${o.x_rsvp?`<a class="nw-ad" data-go="rsvp" href="#"><small>${en?'Notice':'Notis'}</small><b>RSVP</b><span>${en?'Kindly reply':'Sila maklumkan kehadiran'}</span></a>`:''}
        </div>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c,[p1,p2]=nwLead(o,en);
    const sched=(o.schedule||[]).slice(0,4).map(s=>`<span class="nw-li"><b>${esc(fmtTime(s.time,o.lang))}</b> ${esc(s.label)}</span>`).join('');
    return `<div class="cover cv-akhbar2"><i class="nw-table"></i>
      <${tag} class="nw-paper" ${attr} aria-label="${L.open}">
        <span class="nw-half nw-top"><i class="nw-tex"></i>${nwMast(o,L,en)}
          <span class="nw-k">${ev(o,L)}</span>
          <span class="nw-h">${esc(n1)} <span>&amp;</span> ${esc(n2)}</span>
          <span class="nw-deck">${en?'To be wed on':'Akan diijabkabulkan pada'} ${esc(fmtDate(o.date,o.lang))}</span>
          <span class="nw-row"><span class="nw-lc">${nwSk(c,en,'','span','span')}<span class="nw-sh">${en?'Programme':'Aturcara'}</span>${sched}</span><span class="nw-story"><span class="nw-p"><b class="nw-dc">${esc((p1.replace(/<[^>]+>/g,'')||'D')[0])}</b>${p1.slice(1)}</span><span class="nw-p">${p2}</span><span class="nw-box2"><small>${en?'Venue':'Tempat'}</small><b>${esc(o.venue)}</b>${o.address?`<i>${esc(o.address)}</i>`:''}</span></span></span>
          <i class="nw-foldshade"></i></span>
        <span class="nw-half nw-bot"><i class="nw-tex"></i>
          <span class="nw-row2"><span class="nw-col"><span class="nw-sh">${en?'Date':'Tarikh'}</span><span class="nw-p">${esc(fmtDate(o.date,o.lang))}<br>${esc(fmtTime(o.start,o.lang))}${o.end?' – '+esc(fmtTime(o.end,o.lang)):''}</span></span>
          <span class="nw-col"><span class="nw-sh">${en?'Venue':'Tempat'}</span><span class="nw-p">${esc(o.venue)}<br>${esc(o.address||'')}</span></span></span>
          <span class="nw-notice">${en?'Your presence is our honour':'Kehadiran tuan/puan penyeri majlis kami'}</span></span>
      </${tag}>
      <div class="nw-foot">${guest?`<p class="nw-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<p class="nw-open">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const en=o.lang==='en',sc=$('.scroller',el);
    const KK=en?{intro:'Announcement',when:'Details',count:'Countdown',sched:'Programme',gallery:'Pictures',doa:'Prayer',rsvp:'Reply form',wishes:'Letters',gift:'Notices',wishlist:'Notices',contact:'Enquiries'}
      :{intro:'Pengumuman',when:'Butiran majlis',count:'Detik demi detik',sched:'Jadual',gallery:'Gambar',doa:'Doa',rsvp:'Borang jawapan',wishes:'Surat pembaca',gift:'Notis',wishlist:'Notis',contact:'Pertanyaan'};
    $$('.sheet > .sec',el).forEach(s=>{const h=$('h2',s);if(h)h.dataset.kicker=KK[s.dataset.s]||(en?'News':'Berita')});
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Brown ink on newsprint, linen tablecloth',c:{ground:'#d6cab4',sheet:'#f2ece0',ink:'#1e1a15',accent:'#7a5a2a',gold:'#b08a4a',pagefg:'#2a231b',sk:'kl'}},
    {k:'nila',n:'Nila',desc:'Navy ink on newsprint, dark table',c:{ground:'#1a2235',sheet:'#f1ede3',ink:'#1a2238',accent:'#2c4a7c',gold:'#c9a65e',pagefg:'#ece6d8',sk:'masjid'}},
    {k:'marun',n:'Marun',desc:'Maroon spot colour, walnut table',c:{ground:'#33171a',sheet:'#f3ede1',ink:'#1e1816',accent:'#7a1b29',gold:'#c9a25a',pagefg:'#f0e4d6',sk:'pinang'}},
    {k:'zamrud',n:'Zamrud',desc:'Green spot colour, dark green table',c:{ground:'#11281f',sheet:'#f1eee3',ink:'#18201b',accent:'#1f5a40',gold:'#c8a65e',pagefg:'#e6ece6',sk:'masjid'}},
    {k:'jambu',n:'Merah Jambu',desc:'Rose spot colour, blush tablecloth',c:{ground:'#e2cbc5',sheet:'#f6f0e8',ink:'#2a1e20',accent:'#a3465f',gold:'#c09a74',pagefg:'#3a2628',sk:'pinang'}},
    {k:'sage',n:'Sage',desc:'Olive ink, sage tablecloth',c:{ground:'#c5ccba',sheet:'#f3f1e8',ink:'#1f251c',accent:'#55654b',gold:'#a8955a',pagefg:'#252b22',sk:'masjid'}},
    {k:'hitam',n:'Hitam',desc:'Black ink and red masthead rules, ebony table',c:{ground:'#151413',sheet:'#efe9de',ink:'#171513',accent:'#8e1f2c',gold:'#c9a65e',pagefg:'#ece5d8',sk:'pasar'}},
    {k:'terakota',n:'Terakota',desc:'Rust spot colour, teak table',c:{ground:'#44261b',sheet:'#f4ece0',ink:'#22180f',accent:'#a24a22',gold:'#d2a468',pagefg:'#f3e6d8',sk:'kl'}},
  ]});
