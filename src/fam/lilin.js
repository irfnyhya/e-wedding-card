/* lilin: "Cahaya Lilin". A candlelit still life at home: turned brass candlesticks with tall tapers on a linen-covered table,
   a cream card standing in the warm pool of their light, a few dark roses lying on the cloth.
   Cover: tap "Buka Jemputan"; the candlelight swells and the card lifts into it. The flames breathe very slowly.
   Page: the card in the light with the candles behind it. Skin: candlelit paper cards, a tiny flame over spaced caps headings. */
let lnN=0;
// one brass candlestick with its taper. s = stick height, t = taper height (viewBox units, 100 wide); returns svg + where the flame is (0-1)
function lnStick(s,t,c){const u=++lnN,H=s+t+46,top=46,ty=top+0,sy=top+t,base=H-4;
  const brass=`url(#lnb${u})`;
  // a baluster profile: knops and a dished drip pan, the outline as a symmetric path around x=50
  const p=[[8,0],[9,1.5],[17,2.5],[17,4.5],[7,7.5],[5.5,11],[10,16],[5,22],[3.6,.6*s],[7.5,.65*s],[3.8,.71*s],[5,.8*s],[11,.89*s],[21,.95*s],[27,s-2.5],[27,s]];
  const L=p.map(([w,y])=>`${(50-w).toFixed(1)} ${(sy+y).toFixed(1)}`),R=p.slice().reverse().map(([w,y])=>`${(50+w).toFixed(1)} ${(sy+y).toFixed(1)}`);
  const body=`M${L.join('L')}L${R.join('L')}Z`;
  const rings=[3.5,16,.65*s,.89*s,s-2.5].map(y=>`<path d="M${50-12} ${(sy+y).toFixed(1)}h24" stroke="${c.lite}" stroke-opacity=".55" stroke-width=".6"/>`).join('');
  return {svg:`<svg class="lln-stick" ${NS} viewBox="0 0 100 ${H}"><defs>
    <linearGradient id="lnb${u}" x1="0" x2="1"><stop offset="0" stop-color="${c.brass0}"/><stop offset=".28" stop-color="${c.brass1}"/><stop offset=".42" stop-color="${c.lite}"/><stop offset=".55" stop-color="${c.brass1}"/><stop offset=".85" stop-color="${c.brass0}"/><stop offset="1" stop-color="#1a1006"/></linearGradient>
    <linearGradient id="lnc${u}" x1="0" x2="1"><stop offset="0" stop-color="${c.wax}" stop-opacity=".75"/><stop offset=".35" stop-color="#fffaf0"/><stop offset=".7" stop-color="${c.wax}"/><stop offset="1" stop-color="${c.wax}" stop-opacity=".55"/></linearGradient>
    <linearGradient id="lnt${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3cf"/><stop offset=".25" stop-color="#ffd27a" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
    <radialGradient id="lnf${u}" cx=".5" cy=".72" r=".6"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#fff2c4"/><stop offset=".7" stop-color="#ffb648"/><stop offset="1" stop-color="#e2701c" stop-opacity="0"/></radialGradient>
    <filter id="lns${u}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.1"/></filter></defs>
    <path d="${body}" fill="${brass}"/>${rings}
    <ellipse cx="50" cy="${(sy+.9*s).toFixed(1)}" rx="11" ry="1.6" fill="${c.lite}" fill-opacity=".35"/>
    <ellipse cx="50" cy="${(sy+3).toFixed(1)}" rx="13" ry="2.2" fill="${c.brass0}" fill-opacity=".6"/>
    <rect x="43" y="${ty}" width="14" height="${t}" fill="url(#lnc${u})"/>
    <rect x="43" y="${ty}" width="14" height="${t}" fill="url(#lnt${u})" opacity=".55"/>
    <path d="M56 ${ty+2}c1.6 5 1.4 9 .2 13" stroke="${c.wax}" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".8"/>
    <ellipse cx="50" cy="${ty}" rx="7" ry="1.4" fill="#fff6dc"/>
    <path d="M50 ${ty}v-4" stroke="#2a1a0e" stroke-width=".9" stroke-linecap="round"/>
    <g class="lln-flame"><path d="M50 ${ty-29}C46 ${ty-20} 44.5 ${ty-12} 45.6 ${ty-7}C46.6 ${ty-2.6} 53.4 ${ty-2.6} 54.4 ${ty-7}C55.5 ${ty-12} 54 ${ty-20} 50 ${ty-29}Z" fill="url(#lnf${u})" filter="url(#lns${u})"/>
    <ellipse cx="50" cy="${ty-7}" rx="1.6" ry="3.2" fill="#6a8cff" fill-opacity=".45"/></g></svg>`,H,fy:(ty-14)/H}}
const lnCrop=(cx,cy,z,a)=>{const iw=1000,ih=1306,r=z*ih/iw,px=(cx*z-.5)/(z-1)*100,py=(cy*r-.5/a)/(r-1/a)*100;
  return `background-image:url(${A}pd-still-3.jpg);background-size:${z*100}% auto;background-position:${px.toFixed(1)}% ${py.toFixed(1)}%;aspect-ratio:${a}`};
const lnNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="lln-names"><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
// the candles: [left %, stick, taper, width %] ; the halo around each flame is a positioned glow
const lnCandles=(c,set)=>set.map(([x,s,t,w],i)=>{const k=lnStick(s,t,c);
  return `<div class="lln-cs" style="left:${x}%;width:${w}%;--fy:${(k.fy*100).toFixed(2)}%;--d:${i*1.7}s">${k.svg}<i class="lln-halo"></i></div>`}).join('');
const LN_COVER=[[1,250,170,21],[75,190,150,18]],LN_PAGE=[[-1,200,150,18],[82,140,120,16]];
const lnVars=c=>`--table:${c.table};--glow:${c.glow}`;
const LN_FLAME=`<svg class="lln-fl" viewBox="0 0 12 20"><path d="M6 1C3.6 6 2.6 9.8 3 12.6c.6 4 5.4 4 6 0C9.4 9.8 8.4 6 6 1z"/><path d="M6 11v-3" stroke-width=".6"/></svg>`;
FAMILY({key:'lilin',name:'Cahaya Lilin',meaning:'By candlelight',
  blurb:'A warm candlelit still life: brass candlesticks on a linen table and a cream card standing in the pool of their light. The candlelight swells as the card opens.',
  fonts:{d:"'Marcellus', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-lilin ${c.light?'lln-light':''}" style="${lnVars(c)}"><i class="lln-wall"></i><i class="lln-pool"></i><i class="lln-table"></i>${lnCandles(c,LN_PAGE)}
      <div class="lln-card big reveal"><div class="lln-face">
        ${LN_FLAME}${o.bismillah?'<p class="lln-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="lln-k kicker">${ev(o,L)}</p>${lnNames(o,'h1')}
        <p class="lln-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="lln-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="lln-ven">${esc(o.venue)}</p>`:''}</div></div>
      <div class="lln-pills reveal d2"><a class="lln-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="lln-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-lilin ${c.light?'lln-light':''}" style="${lnVars(c)}"><i class="lln-wall"></i><i class="lln-pool"></i><i class="lln-table"></i>${lnCandles(c,LN_COVER)}
      ${c.light?'':`<i class="lln-rose" style="${lnCrop(.3,.875,3.6,1.3)}"></i>`}
      <div class="lln-card cc"><div class="lln-face">${LN_FLAME}<p class="lln-k">${ev(o,L)}</p>${lnNames(o)}<p class="lln-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
      <i class="lln-bloom"></i>
      <div class="lln-foot">${guest?`<p class="lln-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="lln-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('lln-light',!!th.c.light);el.style.setProperty('--table',th.c.table);el.style.setProperty('--glow',th.c.glow);
    $$('.sheet > .sec > h2',el).forEach(h=>{if(!h.querySelector('.lln-fl'))h.insertAdjacentHTML('afterbegin',LN_FLAME)});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'coklat',n:'Coklat',desc:'Brass candles on a cocoa room',c:{ground:'#150d08',sheet:'#f8efdf',ink:'#3a2a1c',accent:'#6e4a22',gold:'#b38a4c',pagefg:'#f3e3c8',table:'#2a1d14',brass0:'#4a3212',brass1:'#c49548',lite:'#f6dfa2',wax:'#efe2c6',glow:'255,184,96'}},
    {k:'hitam',n:'Hitam',desc:'Brass candles in a dark room',c:{ground:'#0b0908',sheet:'#f7f0e2',ink:'#2e261e',accent:'#6a4c26',gold:'#b28d50',pagefg:'#efe3cd',table:'#1b1714',brass0:'#45300f',brass1:'#c19245',lite:'#f5dc9c',wax:'#f1e6cc',glow:'255,178,90'}},
    {k:'marun',n:'Marun',desc:'Brass candles against a maroon wall',c:{ground:'#1e0a0c',sheet:'#f8eedf',ink:'#3c2420',accent:'#7a3a2c',gold:'#b88b4e',pagefg:'#f4e1cf',table:'#2e1514',brass0:'#4a3010',brass1:'#c6964a',lite:'#f7dfa4',wax:'#f0e2c8',glow:'255,170,96'}},
    {k:'zamrud',n:'Zamrud',desc:'Brass candles against a deep green wall',c:{ground:'#0b1510',sheet:'#f7f1e2',ink:'#25302a',accent:'#4a5a34',gold:'#b49352',pagefg:'#ece9d6',table:'#1a221b',brass0:'#45300f',brass1:'#c19245',lite:'#f5dc9c',wax:'#f0e6cc',glow:'255,190,110'}},
    {k:'nila',n:'Nila',desc:'Brass candles in a blue dusk',c:{ground:'#0b0f1b',sheet:'#f6f1e6',ink:'#262a36',accent:'#5a4630',gold:'#b49456',pagefg:'#ebe6dc',table:'#181c28',brass0:'#45300f',brass1:'#c19245',lite:'#f5dc9c',wax:'#f1e8d2',glow:'255,186,110'}},
    {k:'ungu',n:'Ungu',desc:'Brass candles against a plum wall',c:{ground:'#160b14',sheet:'#f8f0e8',ink:'#35232e',accent:'#6a3c4c',gold:'#b68e58',pagefg:'#f1e3e2',table:'#261722',brass0:'#45300f',brass1:'#c19245',lite:'#f5dc9c',wax:'#f1e6d4',glow:'255,176,110'}},
    {k:'krim',n:'Krim',desc:'Brass candles on a cream table at dusk',c:{ground:'#e9dcc6',sheet:'#fdf8ee',ink:'#3a2e22',accent:'#6e4a22',gold:'#a8823e',pagefg:'#3a2e22',table:'#e6d8bf',brass0:'#5a3c14',brass1:'#c49548',lite:'#f8e3a8',wax:'#f4ead4',glow:'255,190,110',light:1}},
    {k:'pic',n:'Pic',desc:'Brass candles on a peach table at dusk',c:{ground:'#ecd2c0',sheet:'#fdf6ef',ink:'#3f2a22',accent:'#8a4a34',gold:'#ad8346',pagefg:'#3f2a22',table:'#ead0bf',brass0:'#5a3c14',brass1:'#c49548',lite:'#f8e3a8',wax:'#f5e9d6',glow:'255,176,110',light:1}},
  ]});
