/* kalkir: a portrait envelope folded from 112gsm translucent vellum, sealed with wax. Inside, seen softly through the
   vellum, a deckle-edged cotton card printed in gold, with a real pressed flower laid on it. A small printed cotton
   address label on the front carries the guest's name; a deckled RSVP card lies under the envelope.
   Cover: tap the seal: it lifts, the vellum flap folds back and the card slides up out of the envelope.
   Page: the card out on the table, the opened envelope behind it, the pressed flower on its corner, a vellum tag (link).
   Skin: cotton cards with a vellum strip behind each script heading. */
needFont('Mrs+Saint+Delafield');
const kkParts=o=>{const m=String(o.date||'').match(/^(\d{4})-(\d{2})-(\d{2})/);return m?[m[3],m[2],m[1]]:['00','00','0000']};
const kkNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="klk-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${tag}>`};
const kkNum=o=>{const [d,m,y]=kkParts(o);return `<p class="klk-num klk-gold">${d}<i></i>${m}<i></i>${y}</p>`};
const kkMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="klk-jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `${esc(a)}<i>&amp;</i>${esc(b)}`};
// the fold lines of the vellum envelope: side flaps and a bottom flap, drawn as faint creases (0-100 box)
const kkFolds=()=>`<svg class="klk-folds" ${NS} viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100L50 56L100 100" fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.95)" stroke-width="1" vector-effect="non-scaling-stroke"/><path d="M0 0L44 58M100 0L56 58" stroke="rgba(255,255,255,.7)" stroke-width=".8" fill="none" vector-effect="non-scaling-stroke"/><path d="M0 100L50 56L100 100" fill="none" stroke="rgba(0,0,0,.12)" stroke-width=".5" transform="translate(0 .4)" vector-effect="non-scaling-stroke"/></svg>`;
FAMILY({key:'kalkir',name:'Kalkir',meaning:'Vellum envelope',
  blurb:'A sealed envelope of translucent vellum with a gold-printed cotton card and a pressed flower showing softly through it, the guest\'s name on a little cotton label. Break the seal and the card slides out.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Mrs Saint Delafield', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-kalkir${c.dark?' klk-dark':''}"><div class="klk-bed"></div>
      <div class="klk-lay">
        <div class="klk-penv reveal d1"><i class="klk-pflap"></i><i class="klk-pseal" style="background-image:url(${A}seal-${c.seal}.webp)"></i></div>
        <div class="klk-card klk-pcard reveal"><div class="klk-in">
          <img class="klk-flower klk-pflower" src="${A}pd-obj-pressed-flower.webp" alt="">
          ${o.bismillah?'<p class="klk-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="klk-k kicker">${ev(o,L)}</p>${kkNames(o,'h1')}
          ${kkNum(o)}
          <p class="klk-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="klk-hj">${esc(o.hijri)}</p>`:''}
          ${o.venue?`<p class="klk-ven">${esc(o.venue)}</p>`:''}</div></div>
        <a class="klk-tag reveal d3" data-go="when" href="#"><i class="klk-eye"></i><small>${en?'Tap for':'Tekan untuk'}</small><b>${en?'Event details':'Maklumat Majlis'}</b></a>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-kalkir${c.dark?' klk-dark':''}"><div class="klk-bed"></div>
      <div class="klk-rsvp"><b>R.S.V.P.</b></div>
      <div class="klk-env">
        <div class="klk-back"></div>
        <div class="klk-card klk-ccard"><div class="klk-in">
          <img class="klk-flower klk-cflower" src="${A}pd-obj-pressed-flower.webp" alt="">
          <p class="klk-k">${ev(o,L)}</p>${kkNames(o)}${kkNum(o)}</div></div>
        <div class="klk-pocket">${kkFolds()}</div>
        <div class="klk-flap"><i></i><svg class="klk-fedge" ${NS} viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0L50 100L100 0" fill="none" stroke="rgba(0,0,0,.16)" stroke-width="2.2" vector-effect="non-scaling-stroke" transform="translate(0 1.2)"/><path d="M0 0L50 100L100 0" fill="none" stroke="rgba(255,255,255,.95)" stroke-width="1.2" vector-effect="non-scaling-stroke"/></svg></div>
        <div class="klk-label">${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:`<small>${en?'With love from':'Dengan kasih'}</small><b>${esc(coverNames(o).join(' & '))}</b>`}</div>
        <${tag} class="klk-seal" ${attr} aria-label="${en?'Open invitation':'Buka Jemputan'}" style="background-image:url(${A}seal-${c.seal}.webp)"><span>${kkMono(o)}</span></${tag}>
      </div>
      <p class="klk-hint">${en?'Open invitation':'Buka Jemputan'}</p></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--onacc',th.c.sheet);el.classList.toggle('klk-dark',!!th.c.dark);
    const pg=$('.pg-kalkir',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){img.removeAttribute('style');img.className='klk-photo';$('.klk-k',pg).before(img);pg.classList.add('has-photo');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory cotton, gold seal',c:{ground:'#ddd3c3',sheet:'#f8f2e6',ink:'#4a4034',accent:'#7a5a2c',gold:'#b8924e',pagefg:'#3e3428',seal:'emas'}},
    {k:'sage',n:'Sage',desc:'Cotton on sage, sage seal',c:{ground:'#c8ccbd',sheet:'#f5f3ea',ink:'#3c4234',accent:'#56613a',gold:'#a88d4d',pagefg:'#30362a',seal:'sage'}},
    {k:'jambu',n:'Jambu',desc:'Cotton on blush, red seal',c:{ground:'#e3d0c9',sheet:'#faf1ec',ink:'#4c3434',accent:'#8a4d45',gold:'#b98a64',pagefg:'#46302f',seal:'merah'}},
    {k:'biru',n:'Biru',desc:'Cotton on dusty blue, blue seal',c:{ground:'#c8d0d8',sheet:'#f4f3ef',ink:'#2f3a48',accent:'#3f5470',gold:'#a88d58',pagefg:'#26313e',seal:'biru'}},
    {k:'terakota',n:'Terakota',desc:'Cotton on clay, red seal',c:{ground:'#d8c6b4',sheet:'#f8f0e4',ink:'#4a3326',accent:'#93492b',gold:'#b5824b',pagefg:'#42291c',seal:'merah'}},
    {k:'hitam',n:'Hitam',desc:'Cotton on charcoal, gold seal',c:{ground:'#24221f',sheet:'#f5f0e6',ink:'#2e2a25',accent:'#6d5530',gold:'#b8955a',pagefg:'#efe7da',seal:'emas',dark:'1'}},
    {k:'lumut',n:'Lumut',desc:'Cotton on forest, ivory seal',c:{ground:'#253226',sheet:'#f5f2e6',ink:'#2d3527',accent:'#4d5a32',gold:'#ad9258',pagefg:'#e9ede0',seal:'gading',dark:'1'}},
    {k:'nila',n:'Nila',desc:'Cotton on navy, ivory seal',c:{ground:'#1b2336',sheet:'#f6f3eb',ink:'#28304a',accent:'#2f416a',gold:'#b09456',pagefg:'#e8e8ee',seal:'gading',dark:'1'}},
  ]});
