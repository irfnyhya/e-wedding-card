/* kunci: an antique iron key with a pierced rosette bow (Met Museum, public domain) tied with cotton thread to a paper tag that carries the
   names, lying on marble or velvet. Cover: tap "Buka Jemputan" and the tag turns over toward you while the key slips away.
   Page: the tag stood upright with the key across its corner; two small tags lead to the details and RSVP.
   Skin: paper cards with an eyelet at the top, headings set in spaced caps over a fine rule. */
let knU=0;
// the key: a 15th-century iron key with a pierced rosette bow (Met Museum, public domain), bow on the left
const knKey=(cls='')=>`<img class="kn-key ${cls}" src="${A}pd-obj-key-iron.webp" alt="">`;
// thread from the tag's eyelet to the key's bow (drawn in the tag+key box, 0-100 each way)
const knThread=d=>`<svg class="kn-thread" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" class="kn-t1"/><path d="${d}" class="kn-t2"/></svg>`;
const knTag=(o,L,inner,cls='')=>`<div class="kn-tag ${cls}"><div class="kn-paper"></div><i class="kn-eye"></i><div class="kn-ti">${inner}</div></div>`;
const knVars=c=>`--b1:${c.b1};--b2:${c.b2};--b3:${c.b3};--b4:${c.b4};--tag:${c.tag||c.sheet};--nm:${c.nm||c.accent};--btn:${c.dark?'rgba(0,0,0,.3)':'rgba(255,255,255,.4)'}`;
FAMILY({key:'kunci',name:'Kunci',meaning:'Antique key',
  blurb:'A fifteenth-century iron key tied with thread to a paper tag bearing the names, on marble or velvet. Open it and the tag turns over toward you.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-kunci2${c.dark?' kn-dark':''}" style="${knVars(c)}"><div class="kn-surf"></div>
      <div class="kn-pwrap reveal">${knTag(o,L,`<p class="kn-k kicker">${ev(o,L)}</p><h1 class="kn-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="kn-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="kn-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<a class="kn-ven" data-go="loc" href="#">${esc(o.venue)}</a>`:''}`,'kn-ptag')}
        ${knKey('kn-pkey')}</div>
      <div class="kn-links reveal d2"><a data-go="when" href="#"><i></i>${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#"><i></i>RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-kunci2${c.dark?' kn-dark':''}" style="${knVars(c)}"><div class="kn-surf"></div>
      <p class="kn-k kn-top">${ev(o,L)}</p>
      <div class="kn-set">${knThread('M11 27C-2 44 0 70 15 80')}
        ${knTag(o,L,`<p class="kn-cn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="kn-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>`,'kn-ctag')}
        ${knKey('kn-ckey')}</div>
      <div class="kn-foot">${guest?`<p class="kn-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="kn-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('kn-dark',!!c.dark);el.style.setProperty('--tag',c.tag||c.sheet);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'hijau',n:'Hijau',desc:'Iron key on forest-green velvet',c:{ground:'#1d362c',sheet:'#f8f3e6',ink:'#1f2a24',accent:'#1e4a3a',gold:'#c9a24e',pagefg:'#f1ead6',b1:'#fbe6a2',b2:'#cc9c48',b3:'#87601f',b4:'#4a3410',nm:'#1e4a3a',dark:1}},
    {k:'biru',n:'Biru',desc:'Iron key on navy velvet',c:{ground:'#1b2843',sheet:'#f6f3ea',ink:'#1d2230',accent:'#22365e',gold:'#cfa755',pagefg:'#eeebe0',b1:'#fbe7a8',b2:'#cf9f4a',b3:'#896120',b4:'#4a3410',dark:1}},
    {k:'marun',n:'Marun',desc:'Iron key on oxblood velvet',c:{ground:'#45171f',sheet:'#fbf3ec',ink:'#2d1b1d',accent:'#6e1f30',gold:'#d2a467',pagefg:'#f6e6dc',b1:'#f6dca6',b2:'#c79650',b3:'#7f5726',b4:'#432a12',dark:1}},
    {k:'hitam',n:'Hitam',desc:'Iron key on black velvet',c:{ground:'#151517',sheet:'#f4efe5',ink:'#19191b',accent:'#3a3024',gold:'#d4ae5c',pagefg:'#efe7d4',b1:'#fdebb0',b2:'#d6a750',b3:'#8e6421',b4:'#4b3410',dark:1}},
    {k:'krim',n:'Krim',desc:'Iron key on cream marble',c:{ground:'#ece6da',sheet:'#fffaf0',ink:'#2c251c',accent:'#6d4a1f',gold:'#a8823c',pagefg:'#2c251c',b1:'#f9e3a0',b2:'#c99a46',b3:'#83601f',b4:'#4a3410',tag:'#efe2c4'}},
    {k:'sage',n:'Sage',desc:'Iron key on sage marble',c:{ground:'#d4dccd',sheet:'#fbfaf2',ink:'#24302a',accent:'#3d5a47',gold:'#94783c',pagefg:'#1f2a24',b1:'#f6e2a4',b2:'#c79c4c',b3:'#80601f',b4:'#47340f'}},
    {k:'jambu',n:'Jambu',desc:'Iron key on blush marble',c:{ground:'#efdcd7',sheet:'#fffaf6',ink:'#38242a',accent:'#84394c',gold:'#a97a5e',pagefg:'#38242a',b1:'#fbe1cf',b2:'#d09b7c',b3:'#87553d',b4:'#4a2a1c'}},
    {k:'kelabu',n:'Kelabu',desc:'Iron key on slate velvet',c:{ground:'#3c4247',sheet:'#f6f6f4',ink:'#22262b',accent:'#38424e',gold:'#c3c7cd',pagefg:'#eef0f2',b1:'#ffffff',b2:'#c2c6cc',b3:'#7a7f87',b4:'#3a3e44',dark:1}},
  ]});
