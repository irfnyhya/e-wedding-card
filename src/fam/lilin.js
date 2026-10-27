/* lilin: "Cahaya Lilin". A tall, narrow envelope of dyed cotton paper lying on a linen tablecloth at night, lit by one candle
   just out of the picture. The pointed flap is closed with a hand-poured wax seal pressed with the couple's initials, ; a small deckled tag on a silk ribbon,
   slipped under the envelope, carries the guest's name.
   The names are foiled in copperplate across the envelope; one rose from a Mignon still life (public domain) lies on the cloth.
   Cover: tap the tag; the seal cracks in two, the flap opens on a painted liner (Ruysch, CC0) and the card rises out.
   Page: the card out on the cloth, the open envelope behind it, the broken seal beside it, the tag holding the links.
   Skin: deckled cotton cards in the candlelight, copperplate headings under a drop of wax. */
const lnNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="lln-names"><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
const lnMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `<span>${esc(a)}<i>&amp;</i>${esc(b)}</span>`};
// a wax seal; split=true gives two halves along a jagged crack, so it can break
const LN_CRACK=[[0,0],[52,0],[47,17],[55,33],[46,52],[54,70],[48,86],[51,100],[0,100]];
const lnClip=side=>`polygon(${(side?LN_CRACK.map(([x,y])=>[x===0?100:x,y]):LN_CRACK).map(([x,y])=>`${x}% ${y}%`).join(',')})`;
const lnSeal=(o,c,cls)=>`<span class="lln-seal ${cls}" style="--seal:url(${A}seal-${c.seal}.webp)">${[0,1].map(s=>`<i class="lln-half h${s}" style="clip-path:${lnClip(s)}">${lnMono(o)}</i>`).join('')}</span>`;
const lnRose=c=>c.light?`<img class="lln-pressed" src="${A}pd-obj-pressed-flower.webp" alt="">`
  :`<i class="lln-rose" style="background-image:url(${A}pd-still-3.jpg)"></i>`;
// an out-of-focus taper burning at the top right: a translucent wax body, a melt pool, one drip and the flame
const LN_CANDLE=`<div class="lln-candle"><i class="lln-wax"></i><i class="lln-drip"></i><i class="lln-wick"></i><i class="lln-flame"></i></div>`;
// the silk ribbon's tail, from under the envelope through the tag's eyelet (drawn in the cover's own 0-100 box)
let lnN=0;
const lnTail=c=>{const u=++lnN;return `<svg class="lln-tail" ${NS} viewBox="0 0 100 100" preserveAspectRatio="none"><defs><linearGradient id="lnr${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.rib}" stop-opacity=".9"/><stop offset=".5" style="stop-color:color-mix(in srgb,${c.rib} 55%,#fff)"/><stop offset="1" stop-color="${c.rib}"/></linearGradient></defs>
  <path d="M55 58C57 66 66 67 70.6 75.6" stroke="#000" stroke-opacity=".35" stroke-width="10" fill="none" vector-effect="non-scaling-stroke" transform="translate(.8 .9)"/>
  <path d="M55 58C57 66 66 67 70.6 75.6" stroke="url(#lnr${u})" stroke-width="9" fill="none" vector-effect="non-scaling-stroke"/>
  <path d="M55.4 58.6C57.6 65.6 65.6 67 70.2 75" stroke="#fff" stroke-opacity=".35" stroke-width="1.4" fill="none" vector-effect="non-scaling-stroke"/></svg>`};
const lnDate=o=>esc(fmtShort(o.date)).replace(/\./g,' · ');
const lnVars=c=>`--lin:url(${A}pd-still-4.jpg);--table:${c.table};--glow:${c.glow};--env:${c.env};--rib:${c.rib};--envink:${c.envink}`;
// the envelope, back up: liner, card inside, the pocket with its side folds, the flap, the ribbon and the seal
const lnEnv=(o,c,L,inner)=>`<div class="lln-env">
  <i class="lln-back"><i class="lln-liner"></i></i>
  <div class="lln-card"><p class="lln-ck">${ev(o,L)}</p>${lnNames(o)}</div>
  <i class="lln-pocket"></i>
  <div class="lln-flap"><i class="lln-flapface"></i><i class="lln-flapin"></i></div>
  ${inner}${lnSeal(o,c,'lcs')}</div>`;
FAMILY({key:'lilin',name:'Cahaya Lilin',meaning:'By candlelight',
  blurb:'A tall envelope on a linen cloth by candlelight, closed with a wax seal, the guest’s name on a tag slipped beneath it. The seal cracks, the flap opens and the card rises out.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-lilin ${c.light?'lln-light':''}" style="${lnVars(c)}"><i class="lln-cloth"></i><i class="lln-glow"></i>${LN_CANDLE}
      <div class="lln-penv"><i class="lln-back"><i class="lln-liner"></i></i><i class="lln-pocket"></i></div>
      ${lnRose(c)}
      <div class="lln-letter reveal"><div class="lln-lin">
        ${o.bismillah?'<p class="lln-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="lln-k kicker">${ev(o,L)}</p>${lnNames(o,'h1')}<i class="lln-rule"><b></b></i>
        <p class="lln-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="lln-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="lln-ven">${esc(o.venue)}</p>`:''}</div></div>
      ${lnSeal(o,c,'lps')}
      <div class="lln-tag lpt reveal d2"><i class="lln-eye"></i><a data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}<a data-go="loc" href="#">${en?'Location':'Lokasi'}</a></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-lilin ${c.light?'lln-light':''}" style="${lnVars(c)}"><i class="lln-cloth"></i><i class="lln-glow"></i>${LN_CANDLE}${lnRose(c)}${lnTail(c)}
      ${lnEnv(o,c,L,`<div class="lln-print"><p class="lln-k">${ev(o,L)}</p>${lnNames(o)}<p class="lln-cd">${lnDate(o)}</p></div>`)}
      <${tag} class="lln-tag lct" ${attr}><i class="lln-eye"></i>${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:`<b>${esc(coverNames(o).join(' & '))}</b>`}<span class="lln-go">${en?'Open invitation':'Buka Jemputan'}</span></${tag}></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('lln-light',!!c.light);
    el.style.setProperty('--glow',c.glow);el.style.setProperty('--table',c.table);el.style.setProperty('--seal',`url(${A}seal-${c.seal}.webp)`);
    $$('.sheet > .sec > h2',el).forEach(h=>{if(!h.previousElementSibling||!h.previousElementSibling.classList.contains('lln-drop'))h.insertAdjacentHTML('beforebegin','<i class="lln-drop"></i>')});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'coklat',n:'Coklat',desc:'Tobacco envelope, red seal, cocoa linen',c:{ground:'#150d08',table:'#24170e',sheet:'#f8efdf',ink:'#3a2a1c',accent:'#6e4a22',gold:'#c9a15a',pagefg:'#f3e3c8',env:'#4a2c1a',envink:'#ecd29a',rib:'#cdb07a',seal:'merah',glow:'255,184,96'}},
    {k:'hitam',n:'Hitam',desc:'Black envelope, gold seal, burgundy ribbon',c:{ground:'#0b0908',table:'#171412',sheet:'#f7f0e2',ink:'#2e261e',accent:'#6a4c26',gold:'#c6a05a',pagefg:'#efe3cd',env:'#1d1a19',envink:'#e9d29c',rib:'#7e1d2b',seal:'emas',glow:'255,178,90'}},
    {k:'marun',n:'Marun',desc:'Maroon envelope, gold seal, champagne ribbon',c:{ground:'#1e0a0c',table:'#2b1414',sheet:'#f8eedf',ink:'#3c2420',accent:'#7a3a2c',gold:'#c9a060',pagefg:'#f4e1cf',env:'#5c1922',envink:'#efd4a0',rib:'#dcc39c',seal:'emas',glow:'255,170,96'}},
    {k:'zamrud',n:'Zamrud',desc:'Bottle-green envelope, gold seal, ivory ribbon',c:{ground:'#0b1510',table:'#17201a',sheet:'#f7f1e2',ink:'#25302a',accent:'#4a5a34',gold:'#c4a35e',pagefg:'#ece9d6',env:'#1e3c2d',envink:'#e6d39e',rib:'#e2d6b8',seal:'emas',glow:'255,190,110'}},
    {k:'nila',n:'Nila',desc:'Midnight envelope, red seal, silver ribbon',c:{ground:'#0b0f1b',table:'#161a26',sheet:'#f6f1e6',ink:'#262a36',accent:'#5a4630',gold:'#c2a262',pagefg:'#ebe6dc',env:'#1c2746',envink:'#e4d4a8',rib:'#c9cdd6',seal:'merah',glow:'255,186,110'}},
    {k:'ungu',n:'Ungu',desc:'Plum envelope, gold seal, lilac ribbon',c:{ground:'#160b14',table:'#24151f',sheet:'#f8f0e8',ink:'#35232e',accent:'#6a3c4c',gold:'#c6a066',pagefg:'#f1e3e2',env:'#43203d',envink:'#ecd4a6',rib:'#d4bfd0',seal:'emas',glow:'255,176,110'}},
    {k:'krim',n:'Krim',desc:'Cream envelope, red seal, oxblood ribbon on cream linen',c:{ground:'#e9dcc6',table:'#e2d3ba',sheet:'#fdf8ee',ink:'#3a2e22',accent:'#6e3a22',gold:'#a8823e',pagefg:'#3a2e22',env:'#f4ecdb',envink:'#6e3a22',rib:'#7a1e2a',seal:'merah',glow:'255,190,110',light:1}},
    {k:'pic',n:'Pic',desc:'Peach envelope, gold seal, rust ribbon on peach linen',c:{ground:'#ecd2c0',table:'#e6cab6',sheet:'#fdf6ef',ink:'#3f2a22',accent:'#8a4a34',gold:'#ad8346',pagefg:'#3f2a22',env:'#f3dccd',envink:'#8a4a34',rib:'#9a4a32',seal:'emas',glow:'255,176,110',light:1}},
  ]});
