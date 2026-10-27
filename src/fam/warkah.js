/* warkah: a linen envelope with a lace-edged flap and a gold wax seal, lying on draped satin with Redouté roses.
   Cover: touch the seal, the flap lifts and the letter slides up out of the envelope.
   Page: the letter, a lace label and a gilt RSVP tag laid out like a stationery flat-lay; each piece is a link.
   Skin: deckled paper cards on satin, script headings over a fine gold rule. */
// lace edging along the flap's two edges: scallops with eyelets, drawn in the flap's own 0-100 box
function warkahLace(c){const n=11,pts=[];
  const edge=(x0,y0,x1,y1)=>{let d='';for(let i=0;i<n;i++){const t0=i/n,t1=(i+1)/n,tm=(t0+t1)/2;
    const P=t=>[x0+(x1-x0)*t,y0+(y1-y0)*t];const [ax,ay]=P(t0),[bx,by]=P(t1),[mx,my]=P(tm);
    // outward normal (below the edge)
    const nx=-(y1-y0),ny=(x1-x0),L=Math.hypot(nx,ny),ox=nx/L*3.2,oy=ny/L*3.2;
    d+=(i?'':`M${ax.toFixed(2)} ${ay.toFixed(2)}`)+`Q${(mx+ox*1.6).toFixed(2)} ${(my+oy*1.6).toFixed(2)} ${bx.toFixed(2)} ${by.toFixed(2)}`;
    pts.push([mx+ox*.62,my+oy*.62])}return d};
  const a=edge(0,0,50,62),b=edge(50,62,100,0);
  return `<svg class="wk-lace" viewBox="0 -2 100 72" preserveAspectRatio="none"><path d="M0 0L50 62L100 0" fill="none" stroke="${c.lace}" stroke-width="4.6" stroke-linejoin="round"/><path d="${a}" fill="none" stroke="${c.lace}" stroke-width="1.5"/><path d="${b}" fill="none" stroke="${c.lace}" stroke-width="1.5"/>
    ${pts.map(([x,y])=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r=".55" fill="${c.lace}"/>`).join('')}
    <path d="M1.6 1L50 59.2L98.4 1" fill="none" stroke="${c.accent}" stroke-width=".35" stroke-dasharray=".9 .9" opacity=".8"/></svg>`}
const wkFl=(n,style)=>`<img class="wk-fl" src="${A}flower-${n}.webp" alt="" style="${style}">`;
const wkMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="wk-jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `${esc(a)}<i>&amp;</i>${esc(b)}`};
FAMILY({key:'warkah',name:'Mohor Emas',meaning:'Sealed love letter',
  blurb:'A linen envelope with a lace-edged flap and a gold wax seal, resting on satin with painted roses. Touch the seal and the letter slides out.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1650,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-warkah" style="--lace:${th.c.lace}"><div class="wk-satin"></div>
      ${wkFl(th.c.fl1,'width:50%;left:-18%;top:-6%;transform:rotate(160deg)')}
      <div class="wk-letter reveal"><div class="wk-in">
        <p class="wk-k kicker">${ev(o,L)}</p><h1 class="wk-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="wk-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="wk-hj">${esc(o.hijri)}</p>`:''}</div></div>
      <div class="wk-tiles">
        <a class="wk-tile wk-label reveal d1" data-go="when" href="#"><small>${en?'Tap for':'Tekan untuk'}</small><b>${en?'Event details':'Butiran Majlis'}</b></a>
        ${o.x_rsvp?`<a class="wk-tile wk-rsvp reveal d2" data-go="rsvp" href="#"><small>${en?'Kindly reply':'Sudi hadir?'}</small><b>RSVP</b></a>`:''}
        <a class="wk-tile wk-loc reveal d3" data-go="loc" href="#"><b>${en?'Location':'Lokasi'}</b><small>${esc(o.venue)}</small></a>
      </div>
      ${wkFl(th.c.fl2,'width:46%;right:-16%;bottom:6%;transform:rotate(-30deg)')}</section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-warkah" style="--lace:${c.lace}"><div class="wk-satin"></div>
      <div class="wk-top"><p class="wk-k">${ev(o,L)}</p><p class="wk-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div>
      <div class="wk-env">
        <div class="wk-back"></div>
        <div class="wk-card"><p class="wk-k">${ev(o,L)}</p><p class="wk-cn">${esc(n1)}<br><span>&amp;</span> ${esc(n2)}</p><p class="wk-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
        <div class="wk-pocket"></div>
        <div class="wk-flap"><div class="wk-flapface"></div>${warkahLace(c)}</div>
        <${tag} class="wk-seal" ${attr} aria-label="${L.open}" style="--seal:url(${A}seal-${c.seal}.webp)"><span>${wkMono(o)}</span></${tag}>
        ${wkFl(c.fl2,'width:40%;left:-12%;bottom:-36%;transform:rotate(-100deg)')}${wkFl(c.fl1,'width:50%;left:-24%;bottom:-46%;transform:rotate(-140deg)')}${wkFl(c.fl1,'width:50%;right:-24%;top:-46%;transform:rotate(40deg)')}${wkFl(c.fl2,'width:38%;right:-14%;top:-36%;transform:rotate(80deg)')}
      </div>
      <div class="wk-foot">${guest?`<p class="wk-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<p class="wk-hint">${en?'Touch the seal to open':'Sentuh mohor untuk buka'}</p></div></div>`},
  skin(el,o,th,L){K.cards(el);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'zamrud',n:'Zamrud',desc:'Green linen, gold seal, ivory satin',c:{ground:'#ece4d6',sheet:'#fbf7ef',ink:'#2b2a24',accent:'#2f4a2c',gold:'#b08a3e',pagefg:'#2b2a24',lace:'#f6f1e6',seal:'emas',fl1:'cabbage-rose',fl2:'blush-rose',env:'#33502f'}},
    {k:'marun',n:'Marun',desc:'Maroon linen, gold seal, champagne satin',c:{ground:'#eadbcb',sheet:'#fcf7ef',ink:'#33221f',accent:'#6e1f2a',gold:'#b38b45',pagefg:'#33221f',lace:'#f8efe3',seal:'emas',fl1:'cabbage-rose',fl2:'anemones',env:'#6a1f29'}},
    {k:'nila',n:'Nila',desc:'Navy linen, ivory seal, pearl satin',c:{ground:'#e6e6e2',sheet:'#fbfaf6',ink:'#1f2433',accent:'#1f2f55',gold:'#a9884a',pagefg:'#1f2433',lace:'#f4f2ec',seal:'gading',fl1:'anemones',fl2:'wild-rose',env:'#22345c'}},
    {k:'jambu',n:'Jambu',desc:'Dusty pink linen, gold seal, blush satin',c:{ground:'#f1e1dc',sheet:'#fffaf6',ink:'#3a2a2a',accent:'#9c5a62',gold:'#b5904f',pagefg:'#3a2a2a',lace:'#fffaf5',seal:'emas',fl1:'blush-rose',fl2:'wild-rose',env:'#c99096'}},
    {k:'sage',n:'Sage',desc:'Sage linen, ivory seal, cream satin',c:{ground:'#ebe7dc',sheet:'#fbf9f2',ink:'#2c3027',accent:'#56664c',gold:'#a88d4d',pagefg:'#2c3027',lace:'#f8f6ee',seal:'gading',fl1:'wild-rose',fl2:'blush-rose',env:'#8b9a7c'}},
    {k:'gading',n:'Gading',desc:'Ivory linen, sage seal, white satin',c:{ground:'#e9e6df',sheet:'#fffdf8',ink:'#2d2a25',accent:'#6b5a3e',gold:'#a8894c',pagefg:'#2d2a25',lace:'#ffffff',seal:'sage',fl1:'blush-rose',fl2:'cabbage-rose',env:'#efe6d3'}},
    {k:'biru',n:'Biru',desc:'Powder blue linen, gold seal, pearl satin',c:{ground:'#e4e8ea',sheet:'#fbfcfb',ink:'#24303a',accent:'#4d6a86',gold:'#b08f50',pagefg:'#24303a',lace:'#f6f8f8',seal:'emas',fl1:'wild-rose',fl2:'anemones',env:'#93abc2'}},
    {k:'terakota',n:'Terakota',desc:'Terracotta linen, red seal, sand satin',c:{ground:'#ece0d2',sheet:'#fcf6ee',ink:'#33261f',accent:'#9a4b2f',gold:'#b08a4a',pagefg:'#33261f',lace:'#faf3ea',seal:'merah',fl1:'cabbage-rose',fl2:'wild-rose',env:'#a6573a'}},
  ]});
