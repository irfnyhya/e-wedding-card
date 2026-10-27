/* kastil: "Kunci Istana". A tall, narrow cotton card (about DL size) printed by letterpress from an engraved plate:
   a deep plate-mark, a fine double rule with engraved rosettes in the corners, the date cut large as a numeral
   and the names in an engraved italic. A silk cord runs from a wax seal at its head to an antique gilt chamberlain's
   key lying on the velvet beside it, and on to a cotton tag with the guest's name.
   Cover: tap the tag, the key and cord slide away and the card lifts to you. Page: the card squared up on velvet,
   the key resting at its foot. Skin: plate-marked cotton cards with spaced engraved capitals and a rosette rule. */
let ksN=0;
const ksf=v=>(+v).toFixed(2);
// an engraved rosette for the plate corners: petals, a ring of beads and a centre
const ksRosette=()=>{const pet=K.ring(8,5.4,10,10).map(([x,y,a])=>`<ellipse cx="${ksf(x)}" cy="${ksf(y)}" rx="1.5" ry="3.6" transform="rotate(${ksf(a*180/Math.PI+90)} ${ksf(x)} ${ksf(y)})"/>`).join('');
  const beads=K.ring(16,9,10,10).map(([x,y])=>`<circle cx="${ksf(x)}" cy="${ksf(y)}" r=".5"/>`).join('');
  return `<svg class="kst-ros" viewBox="0 0 20 20" ${NS} aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width=".45">${pet}<circle cx="10" cy="10" r="7.6"/></g><g fill="currentColor">${beads}<circle cx="10" cy="10" r="1.4"/></g></svg>`};
const KS_ROS=ksRosette();
const ksCorners=()=>['tl','tr','bl','br'].map(k=>`<i class="kst-c ${k}">${KS_ROS}</i>`).join('');
// a printed rule with a lozenge in the middle
const KS_RULE=`<svg class="kst-rule" viewBox="0 0 120 8" ${NS} aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width=".5"><path d="M2 4H50M70 4H118"/><path d="M8 2.2H50M70 2.2H112" stroke-width=".3"/><path d="M60 .6L64 4L60 7.4L56 4Z"/><circle cx="51.5" cy="4" r="1"/><circle cx="68.5" cy="4" r="1"/></g><circle cx="60" cy="4" r=".9" fill="currentColor"/></svg>`;
const ksFitP=o=>{const [a,b]=coverNames(o);const n=Math.max(String(a).length,String(b).length,1);return `font-size:${Math.min(10.4,118/n).toFixed(2)}cqi`};
const ksFit=o=>{const [a,b]=coverNames(o);const n=Math.max(String(a).length,String(b).length,1);return `font-size:${Math.min(8.8,84/n).toFixed(2)}cqi`};
const ksNames=(o,tag,st='')=>{const [n1,n2]=coverNames(o);return `<${tag} class="kst-names"${st?` style="${st}"`:''}><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
const ksMonth=o=>fmtDate(o.date,o.lang,false).replace(/^\d+\s*/,'').replace(/\s*\d{4}$/,'');
const ksYear=o=>(o.date||'').slice(0,4);
const ksDay=o=>String(+(o.date||'').slice(8,10)||'');
const ksMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<b class="kst-jw">${esc(j)}</b>`;const [a,b]=K.initials(o);return `<b>${esc(a)}</b><i>&amp;</i><b>${esc(b)}</b>`};
const ksVars=c=>`--cord:${c.cord}`;
FAMILY({key:'kastil',name:'Kunci Istana',meaning:'Engraved card and gilt key',
  blurb:'A tall letterpress card with a deep plate-mark and engraved rosettes, tied with a silk cord to an antique gilt key and a name tag, lying on velvet.',
  fonts:{d:"'Cinzel', serif",s:"'Old Standard TT', serif",b:"'Old Standard TT', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-kastil${c.dark?' kst-dark':''}" style="${ksVars(c)}"><i class="kst-velvet"></i>
      <div class="kst-pcard reveal"><i class="kst-seal" style="--seal:url(${A}seal-${c.seal}.webp)"><span>${ksMono(o)}</span></i>
        <div class="kst-plate">${ksCorners()}
          ${o.bismillah?`<p class="kst-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
          <p class="kst-k kicker">${ev(o,L)}</p>
          ${ksNames(o,'h1',ksFitP(o))}
          ${KS_RULE}
          <div class="kst-dt"><small>${esc(fmtDate(o.date,o.lang).split(',')[0])}</small><b>${esc(ksDay(o))}</b><small>${esc(ksMonth(o))} ${esc(ksYear(o))}</small></div>
          ${o.hijri?`<p class="kst-hj">${esc(o.hijri)}</p>`:''}
          ${o.venue?`<p class="kst-ven">${esc(o.venue)}</p>`:''}
          <div class="kst-pills"><a class="kst-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="kst-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
        </div></div>
      <img class="kst-key pg" src="${A}pd-obj-key-gilt.webp" alt=""></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-kastil${c.dark?' kst-dark':''}" style="${ksVars(c)}"><i class="kst-velvet"></i>
      <div class="kst-set">
        <div class="kst-card"><div class="kst-plate">${ksCorners()}
          <p class="kst-k">${ev(o,L)}</p>
          <div class="kst-big"><b>${esc(ksDay(o))}</b><small>${esc(ksMonth(o))}</small><small class="y">${esc(ksYear(o))}</small></div>
          ${KS_RULE}
          ${ksNames(o,'p',ksFit(o))}
          ${o.venue?`<p class="kst-cv">${esc(o.venue)}</p>`:''}
        </div></div>
        <svg class="kst-cord" viewBox="0 0 100 175" preserveAspectRatio="none" ${NS} aria-hidden="true">
          <path d="M34 9.5C46 5 62 10 70 24C74 31 76 38 78 44" />
          <path d="M80 48C88 64 90 88 84 104C80 116 74 124 70 130" />
          <path d="M34 9.5C46 5 62 10 70 24C74 31 76 38 78 44" class="tw"/>
          <path d="M80 48C88 64 90 88 84 104C80 116 74 124 70 130" class="tw"/>
        </svg>
        <img class="kst-key" src="${A}pd-obj-key-gilt.webp" alt="">
        <i class="kst-seal" style="--seal:url(${A}seal-${c.seal}.webp)"><span>${ksMono(o)}</span></i>
        <${tag} class="kst-tag" ${attr}><span class="kst-eye"></span>${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:''}<em>${en?'Open invitation':'Buka Jemputan'}</em></${tag}>
      </div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('kst-dark',!!c.dark);
    el.style.setProperty('--ksros',K.uri(KS_ROS.replace(/currentColor/g,c.accent).replace('<svg ',`<svg width="20" height="20" `)));
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'perang',n:'Perang',desc:'Sepia letterpress on ivory cotton, camel velvet',c:{ground:'#b59a78',sheet:'#f8f2e4',ink:'#3c2f24',accent:'#4a3828',gold:'#8a7050',pagefg:'#2e2318',cord:'#6e4a2e',seal:'merah'}},
    {k:'nila',n:'Nila',desc:'Indigo letterpress on white cotton, slate velvet',c:{ground:'#8c98ab',sheet:'#f9f7f1',ink:'#1f2a40',accent:'#24345a',gold:'#6a7896',pagefg:'#16203a',cord:'#24345a',seal:'biru'}},
    {k:'hijau',n:'Hijau',desc:'Green letterpress on cream cotton, sage velvet',c:{ground:'#97a58e',sheet:'#f8f5ea',ink:'#24342a',accent:'#2c4636',gold:'#6f8068',pagefg:'#1a271e',cord:'#2c4636',seal:'sage'}},
    {k:'arang',n:'Arang',desc:'Black letterpress on soft white, grey velvet',c:{ground:'#9d9a95',sheet:'#f9f8f4',ink:'#252525',accent:'#2a2a2a',gold:'#7a7670',pagefg:'#1c1c1c',cord:'#2a2a2a',seal:'emas'}},
    {k:'jambu',n:'Jambu',desc:'Rose letterpress on blush cotton, rose velvet',c:{ground:'#c9a3a3',sheet:'#fcf6f1',ink:'#4a2a32',accent:'#6e3242',gold:'#a07480',pagefg:'#3a1e26',cord:'#8a4a5a',seal:'emas'}},
    {k:'malam',n:'Malam',desc:'Indigo letterpress, midnight velvet',c:{ground:'#18203a',sheet:'#f6f1e4',ink:'#1f2a40',accent:'#24345a',gold:'#6a7896',pagefg:'#e8e8f0',cord:'#c9a86a',seal:'emas',dark:1}},
    {k:'marun',n:'Marun',desc:'Wine letterpress, wine velvet',c:{ground:'#3a141c',sheet:'#f7f0e3',ink:'#3e1c24',accent:'#5e1f2c',gold:'#9a6a6a',pagefg:'#f3e4dc',cord:'#c9a86a',seal:'emas',dark:1}},
    {k:'zamrud',n:'Zamrud',desc:'Green letterpress, forest velvet',c:{ground:'#15281f',sheet:'#f6f2e5',ink:'#22322a',accent:'#2a4434',gold:'#6f8068',pagefg:'#e8ece2',cord:'#c9a86a',seal:'emas',dark:1}},
  ]});
