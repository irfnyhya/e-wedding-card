/* lukisan: a carved, gilded oval frame (Met Museum, public domain) hung over a Jan van Huysum flower painting (public domain).
   The names sit on velvet inside the frame.
   Cover: tap "Buka Jemputan" and the view moves into the frame until the velvet fills the screen.
   Page: the painting fades into velvet, with the frame and names below it. Skin: velvet cards edged with fine gold rules. */
// the frame image is 885x1004; its opening is an ellipse at (50.2%, 58.7%) sized 65.8% x 76.5%
const LK_OVAL='left:17.3%;top:20.4%;width:65.8%;height:76.5%';
const lkFrame=(o,L,inner,cls='')=>`<div class="lk-frame ${cls}"><div class="lk-velvet" style="${LK_OVAL}"><div class="lk-in">${inner}</div></div><img class="lk-gilt" src="${A}pd-frame.webp" alt=""></div>`;
const lkNames=o=>{const [n1,n2]=coverNames(o);return `<p class="lk-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>`};
FAMILY({key:'lukisan',name:'Bingkai Emas',meaning:'Gilded frame',
  blurb:'A carved gilt oval frame hung over a Dutch flower painting, the names set on velvet inside it. Guests step into the frame to open the card.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en';return `<section class="page pg-lukisan"><div class="lk-band"></div><div class="lk-vel"></div>
    <p class="lk-k kicker reveal">${ev(o,L)}</p>
    <div class="reveal d1" style="width:82%;max-width:330px">${lkFrame(o,L,`${o.bismillah?'<p class="lk-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}${lkNames(o)}`)}</div>
    <p class="lk-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="lk-ven reveal d2">${esc(o.venue)}</p>`:''}
    <a class="lk-pill reveal d3" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-lukisan"><div class="lk-paint"></div><div class="lk-shade"></div>
    <p class="lk-k lk-top">${ev(o,L)}</p>
    <div class="lk-stage">${lkFrame(o,L,`${lkNames(o)}<p class="lk-d">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>`)}</div>
    <div class="lk-foot">${guest?`<p class="lk-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="lk-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--vel',th.c.vel);el.classList.toggle('lk-silver',!!th.c.silver);
    // with a couple photo, the photo fills the oval and the names move below the frame
    const pg=$('.pg-lukisan',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const vel=$('.lk-velvet',pg),nm=$('.lk-names',pg),fr=nm&&nm.closest('.reveal');
      img.className='lk-photo';img.removeAttribute('style');vel.classList.add('has-photo');vel.prepend(img);ph.remove();
      if(fr){const out=document.createElement('div');out.className='lk-under reveal d2';$$('.lk-bis,.lk-names',pg).forEach(x=>out.appendChild(x));fr.after(out)}}const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'marun',n:'Marun',desc:'Gilt frame on maroon velvet',c:{ground:'#2a0f15',sheet:'#3a161e',ink:'#f3e7d3',accent:'#e2c58a',gold:'#c9a35a',pagefg:'#f3e7d3',vel:'#5a1a26'}},
    {k:'hitam',n:'Hitam',desc:'Gilt frame on black velvet',c:{ground:'#0f0d0c',sheet:'#1d1a18',ink:'#efe6d6',accent:'#dcc08a',gold:'#c4a05c',pagefg:'#efe6d6',vel:'#24201d'}},
    {k:'zamrud',n:'Zamrud',desc:'Gilt frame on emerald velvet',c:{ground:'#0d1f19',sheet:'#16302a',ink:'#efe9d8',accent:'#dfc48c',gold:'#c6a45e',pagefg:'#efe9d8',vel:'#1d4a3c'}},
    {k:'nila',n:'Nila',desc:'Gilt frame on midnight blue velvet',c:{ground:'#0e1426',sheet:'#18213a',ink:'#ece6da',accent:'#e0c78f',gold:'#c7a560',pagefg:'#ece6da',vel:'#22305a'}},
    {k:'ungu',n:'Ungu',desc:'Gilt frame on plum velvet',c:{ground:'#1c0f1f',sheet:'#2b1830',ink:'#f1e7e0',accent:'#e3c690',gold:'#c8a45f',pagefg:'#f1e7e0',vel:'#46224d'}},
    {k:'koko',n:'Koko',desc:'Gilt frame on cocoa velvet',c:{ground:'#1d130d',sheet:'#2c1e15',ink:'#f2e8d6',accent:'#e0c48a',gold:'#c6a25c',pagefg:'#f2e8d6',vel:'#4a3022'}},
    {k:'perak',n:'Perak',desc:'Silver frame on navy velvet',c:{ground:'#0f1522',sheet:'#1a2234',ink:'#eef0f4',accent:'#dfe3ea',gold:'#b9c0cc',pagefg:'#eef0f4',vel:'#26324c',silver:'1'}},
    {k:'kelabu',n:'Kelabu',desc:'Silver frame on charcoal velvet',c:{ground:'#141516',sheet:'#212325',ink:'#eeeeec',accent:'#e2e2de',gold:'#b8bbbe',pagefg:'#eeeeec',vel:'#33373b',silver:'1'}},
  ]});
