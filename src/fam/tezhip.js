/* tezhip: an Ottoman illuminated leaf. A cream burnished page framed by a real gold-and-lapis arabesque border
   (pd-illum-6, the outer margin of a 14th-century illuminated folio, Met Museum, CC0; text-free) with gilt corner rosettes
   and jadwal rules in gold, lapis and black. At its heart a şemse rosette medallion cut from the ornamental centre of
   pd-illum-1, ringed by a scalloped gold rim with pendants. Names in an elegant italic serif.
   Cover: the leaf on dark leather; the medallion is the button. Tap it and the view passes into the rosette.
   Page: the leaf, larger. Skin: cream leaves with an illuminated band at top and bottom and jadwal rules. */
let tzN=0;
const tzF=v=>v.toFixed(1);
// a strip of the illuminated border; side l|r|t|b (t/b are the same strip turned so the lapis faces outwards)
const tzStrip=s=>s==='t'||s==='b'?`<i class="tzp-s ${s}"><b></b></i>`:`<i class="tzp-s ${s}"></i>`;
// a small gilt corner rosette
const tzCorner=(cls)=>{const u=++tzN;let p='';K.ring(8,6.2,12,12).forEach(([x,y,a])=>{p+=`<ellipse cx="${tzF(x)}" cy="${tzF(y)}" rx="3.2" ry="1.7" transform="rotate(${tzF(a*180/Math.PI)} ${tzF(x)} ${tzF(y)})"/>`});
  return `<svg class="tzp-c ${cls}" viewBox="0 0 24 24"><defs><radialGradient id="tzg${u}" cx=".4" cy=".35"><stop offset="0" stop-color="#f6e3a1"/><stop offset=".55" stop-color="#c9a24f"/><stop offset="1" stop-color="#8a6526"/></radialGradient></defs>
    <rect width="24" height="24" fill="url(#tzg${u})"/><rect x="1.2" y="1.2" width="21.6" height="21.6" fill="none" stroke="#5a3f15" stroke-width=".5"/>
    <circle cx="12" cy="12" r="9" fill="#21407c"/><g fill="url(#tzg${u})">${p}</g><circle cx="12" cy="12" r="3" fill="#b8402e" stroke="#f3dc93" stroke-width=".8"/></svg>`};
// the şemse: the illuminated rosette in a scalloped gilt rim with a pendant above and below
function tzMedal(){const u=++tzN;let dots='';K.ring(32,54.5,60,74).forEach(([x,y])=>{dots+=`<circle cx="${tzF(x)}" cy="${tzF(y)}" r=".9"/>`});
  const pend=(y,s)=>`<path d="M60 ${y}C55 ${y-s*4} 52 ${y-s*9} 60 ${y-s*16}C68 ${y-s*9} 65 ${y-s*4} 60 ${y}Z" fill="url(#tzm${u})" stroke="#6b4c1c" stroke-width=".5"/><circle cx="60" cy="${y-s*9}" r="2.4" fill="#21407c" stroke="#f1d98f" stroke-width=".5"/><path d="M60 ${y-s*16}V${y-s*22}" stroke="#a37d36" stroke-width=".8"/><circle cx="60" cy="${y-s*23.5}" r="1.5" fill="url(#tzm${u})"/>`;
  return `<svg class="tzp-rim" viewBox="0 0 120 148"><defs><linearGradient id="tzm${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e6a6"/><stop offset=".35" stop-color="#c79f4c"/><stop offset=".6" stop-color="#f0d68b"/><stop offset="1" stop-color="#8c6727"/></linearGradient></defs>
    ${pend(26,1)}${pend(122,-1)}
    <path d="${K.scallop(24,52,5.5,60,74)}" fill="url(#tzm${u})" stroke="#6b4c1c" stroke-width=".6"/>
    <circle cx="60" cy="74" r="50.5" fill="#21407c"/><g fill="#f3dc93">${dots}</g><circle cx="60" cy="74" r="47.5" fill="none" stroke="url(#tzm${u})" stroke-width="2"/></svg>`}
const tzMedalHtml=()=>`<span class="tzp-med"><i class="tzp-art"></i>${tzMedal()}</span>`;
const tzFrame=()=>`<div class="tzp-border">${['l','r','t','b'].map(tzStrip).join('')}${['tl','tr','bl','br'].map(tzCorner).join('')}</div>`;
const tzRule=`<svg class="tzp-rule" viewBox="0 0 140 14"><path d="M6 7H52M88 7H134" stroke="currentColor" stroke-width=".6"/><path d="M70 1L76 7L70 13L64 7Z" fill="none" stroke="currentColor" stroke-width=".7"/><circle cx="70" cy="7" r="1.6" fill="#21407c"/><circle cx="58" cy="7" r="1.1" fill="currentColor"/><circle cx="82" cy="7" r="1.1" fill="currentColor"/></svg>`;
const tzText=(o,L,page)=>{const [n1,n2]=coverNames(o);
  return `<p class="tzp-k${page?' kicker':''}">${ev(o,L)}</p>
    <${page?'h1':'p'} class="tzp-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${page?'h1':'p'}>${tzRule}
    <p class="tzp-date">${esc(fmtDate(o.date,o.lang))}</p>${page&&o.hijri?`<p class="tzp-hj">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="tzp-ven">${esc(o.venue)}</p>`:''}`};
FAMILY({key:'tezhip',name:'Tezhip',meaning:'Illuminated leaf',
  blurb:'A cream page framed by a real gold-and-lapis illuminated border, with a rosette medallion at its heart and the names in an elegant serif. Guests tap the rosette to open.',
  fonts:{d:"'Marcellus', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const c=th.c,en=o.lang==='en';
    return `<section class="page pg-tezhip${c.dark?' tzp-dark':''}"><div class="tzp-bg"></div>
      <div class="tzp-leaf reveal">${tzFrame()}<div class="tzp-in">
        ${o.bismillah?'<p class="tzp-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <div class="tzp-pm">${tzMedalHtml()}</div>${tzText(o,L,true)}</div></div>
      <div class="tzp-pills reveal d2"><a class="tzp-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="tzp-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-tezhip${c.dark?' tzp-dark':''}"><div class="tzp-bg"></div>
      <div class="tzp-leaf tzp-cl">${tzFrame()}<div class="tzp-in">${tzText(o,L,false)}
        <${tag} class="tzp-btn" ${attr}>${tzMedalHtml()}<small>${en?'Open invitation':'Buka Jemputan'}</small></${tag}></div></div>
      ${guest?`<p class="tzp-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}</div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('tzp-dk',!!th.c.dark);
    $$('.sheet > .sec',el).forEach(s=>{if(!s.querySelector(':scope > .tzp-band'))s.insertAdjacentHTML('afterbegin','<i class="tzp-band t"><b></b></i><i class="tzp-band b"><b></b></i>')});
    const sc=$('.scroller',el);
    $$('.pg-tezhip [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'lapis',n:'Lapis',desc:'Cream leaf on deep lapis leather',c:{ground:'#18264a',sheet:'#f7efdc',ink:'#2c2a2a',accent:'#1f3b72',gold:'#a37c34',pagefg:'#eee6d2',dark:1}},
    {k:'marun',n:'Marun',desc:'Cream leaf on oxblood leather',c:{ground:'#4a1a1c',sheet:'#f7efdc',ink:'#33282a',accent:'#7c2328',gold:'#a37c34',pagefg:'#f2e5d6',dark:1}},
    {k:'zamrud',n:'Zamrud',desc:'Cream leaf on emerald leather',c:{ground:'#163a2e',sheet:'#f7f0dd',ink:'#2a2f2a',accent:'#1d5a44',gold:'#a37c34',pagefg:'#ebe9d8',dark:1}},
    {k:'coklat',n:'Coklat',desc:'Cream leaf on tan-brown leather',c:{ground:'#3e2818',sheet:'#f6eedb',ink:'#33291f',accent:'#6b3a1c',gold:'#a37c34',pagefg:'#f1e5d2',dark:1}},
    {k:'hitam',n:'Hitam',desc:'Cream leaf on black leather',c:{ground:'#151413',sheet:'#f6eedc',ink:'#2a2826',accent:'#1f3b72',gold:'#a37c34',pagefg:'#ebe5d8',dark:1}},
    {k:'gading',n:'Gading',desc:'Cream leaf on an ivory desk',c:{ground:'#e9e0cc',sheet:'#fbf5e6',ink:'#30291f',accent:'#1f3b72',gold:'#a37c34',pagefg:'#30291f'}},
    {k:'firuz',n:'Firuz',desc:'Cream leaf on pale turquoise',c:{ground:'#cfe0db',sheet:'#fbf6e8',ink:'#26302e',accent:'#1c5e63',gold:'#a37c34',pagefg:'#26302e'}},
    {k:'jambu',n:'Jambu',desc:'Cream leaf on dusty rose',c:{ground:'#e6cfc8',sheet:'#fbf5ea',ink:'#3a2a2a',accent:'#8a2f3c',gold:'#a37c34',pagefg:'#3a2a2a'}},
  ]});
