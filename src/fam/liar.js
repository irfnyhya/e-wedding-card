/* liar: "Bunga Liar". A tall, narrow card of handmade cotton rag with a torn deckle all round, lying slightly askew on
   linen. A sprig of real pressed wildflowers and a few Redouté blooms (public domain) are pressed flat on it, held by a
   woven silk rose ribbon wrapped round the card as a band; a cotton-string tag on the ribbon carries the guest's name.
   Cover: tap the ribbon (or its tag) and the band slides off the card, which then lifts.
   Page: the card laid straight, with the ribbon and two tags (details, location) below it.
   Skin: deckled cotton cards on linen, a calligraphic heading over a snip of the same ribbon. */
needFont('Monsieur+La+Doulaise');
const BL_W={anemones:617,'blush-rose':622,'cabbage-rose':581,'forget-me-not':528,hibiscus:619,iris:566,jasmine:518,lotus:621,'pink-rose':674,'red-rose':622,'white-roses':636,'wild-rose':663};
// one bloom from a Redouté plate: [plate, centre x, centre y (0-1 of the plate), width of the crop as a share of the plate]
const BL_B={anR:['anemones',.65,.5,.26],anU:['anemones',.5,.31,.24],anP:['anemones',.33,.39,.22],anW:['anemones',.25,.64,.26],anV:['anemones',.79,.64,.22],
  blush:['blush-rose',.45,.45,.4],cab:['cabbage-rose',.5,.25,.48],jas:['jasmine',.8,.135,.2],red:['red-rose',.54,.08,.2],red2:['red-rose',.81,.23,.18],
  wh:['white-roses',.5,.24,.3],wh2:['white-roses',.77,.21,.22],wild:['wild-rose',.55,.48,.24],pink:['pink-rose',.5,.1,.27],fmn:['forget-me-not',.83,.32,.32],fmn2:['forget-me-not',.78,.49,.3]};
const blBg=k=>{const [f,cx,cy,s]=BL_B[k]||BL_B.wild,iw=BL_W[f],z=1/s,r=z*760/iw,px=(cx*z-.5)/(z-1)*100,py=(cy*r-.5)/(r-1)*100;
  return {img:`url(${A}flower-${f}.webp)`,size:`${(z*100).toFixed(1)}% auto`,pos:`${px.toFixed(1)}% ${py.toFixed(1)}%`}};
const blBloom=(k,st)=>{const b=blBg(k);return `<i class="blr-bl" style="${st};background-image:${b.img};background-size:${b.size};background-position:${b.pos}"></i>`};
const blVars=c=>`--tag:${c.tag};--card2:${c.card2};--stem:${c.stem}`;
const blDP=o=>{const d=new Date((o.date||'')+'T00:00:00');if(isNaN(d))return null;return {d:d.getDate(),y:d.getFullYear(),mon:MONTHS[o.lang][d.getMonth()],day:DAYS[o.lang][d.getDay()]}};
const blNames=(o,tag='h1',cls='')=>{const [n1,n2]=coverNames(o);return `<${tag} class="blr-names names ${cls}"><span class="a">${esc(n1)}</span><i>${o.lang==='en'?'and':'dan'}</i><span class="b">${esc(n2)}</span></${tag}>`};
// the date as a design element: a big letterpressed day, month / year / weekday stacked beside it
const blDate=o=>{const p=blDP(o);if(!p)return '';return `<div class="blr-date"><b>${p.d}</b><span><em>${esc(p.mon)}</em><em>${p.y}</em><em>${esc(p.day)}</em></span></div>`};
// a tiny printed sprig between two hairlines
const BL_RULE=`<svg class="blr-rule" viewBox="0 0 120 12" aria-hidden="true"><path d="M2 6H48M72 6H118"/><path class="f" d="M60 11C59.4 8 59.5 4.5 60 1.5M60 7C57.8 5.4 55.4 5.5 53.8 7C55.8 8.1 58 8.1 60 7ZM60 5.4C62.2 3.8 64.6 3.9 66.2 5.4C64.2 6.5 62 6.5 60 5.4Z"/><circle cx="60" cy="1.4" r="1.2"/><circle cx="48" cy="6" r=".9"/><circle cx="72" cy="6" r=".9"/></svg>`;
// cotton string from the ribbon to a tag (drawn in the tag's own box, in %)
const blString=(d)=>`<svg class="blr-str" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/></svg>`;
const blTag=(inner,cls,st)=>`<span class="blr-tag ${cls||''}" style="${st||''}"><span class="blr-tagp"><i class="blr-hole"></i>${inner}</span></span>`;
FAMILY({key:'liar',name:'Bunga Liar',meaning:'Pressed wildflowers',
  blurb:'A tall deckle-edged cotton card with pressed wildflowers, wrapped in a woven rose ribbon with a name tag on string. The ribbon slides off to open it.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Monsieur La Doulaise', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',c=th.c,t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-liar" style="${blVars(c)}"><i class="blr-linen"></i>
      <div class="blr-sheet reveal"><div class="blr-sface">
        <img class="blr-press" src="${A}pd-obj-pressed-flower.webp" alt="" style="right:-9%;top:-3%;width:46%;transform:rotate(200deg)">
        ${blBloom(c.b2,'right:5%;top:5%;width:17%;--r:-12deg')}
        ${o.bismillah?`<p class="blr-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="blr-k kicker">${ev(o,L)}</p>
        ${blNames(o,'h1','pg')}${BL_RULE}${blDate(o)}
        ${o.hijri?`<p class="blr-hj">${esc(o.hijri)}</p>`:''}${t?`<p class="blr-time">${esc(t)}</p>`:''}
        ${o.venue?`<p class="blr-ven">${esc(o.venue)}</p>`:''}
        ${blBloom(c.b1,'left:5%;bottom:3%;width:17%;--r:20deg')}
      </div></div>
      <div class="blr-lay reveal d2"><i class="blr-rib loose"></i>
        <a class="blr-ltag t1" data-go="when" href="#">${blString('M50 0C30 35 66 70 50 100')}${blTag(`<small>${en?'Tap for':'Tekan untuk'}</small><b>${en?'Event details':'Butiran Majlis'}</b>`)}</a>
        <a class="blr-ltag t2" data-go="${o.x_rsvp?'rsvp':'loc'}" href="#">${blString('M50 0C68 35 36 70 50 100')}${blTag(o.x_rsvp?`<small>${en?'Kindly reply':'Sudi hadir?'}</small><b>RSVP</b>`:`<small>${en?'Find us':'Cari kami'}</small><b>${en?'Location':'Lokasi'}</b>`)}</a>
      </div>
      ${o.x_rsvp?`<a class="blr-loc reveal d3" data-go="loc" href="#">${en?'Directions to':'Arah ke'} ${esc(o.venue||'')}</a>`:''}
    </section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-liar" style="${blVars(c)}"><i class="blr-linen"></i><img class="blr-loose" src="${A}pd-obj-pressed-flower.webp" alt="">
      <div class="blr-obj">
        <div class="blr-under"><i></i></div>
        <div class="blr-card"><div class="blr-face">
          <p class="blr-k">${ev(o,L)}</p>
          ${blNames(o,'p')}${BL_RULE}${blDate(o)}
          ${o.venue?`<p class="blr-ven">${esc(o.venue)}</p>`:''}${o.start?`<p class="blr-time">${esc([fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – '))}</p>`:''}
          ${blBloom(c.b1,'right:-3%;top:-1.5%;width:19%;--r:-14deg')}
          <img class="blr-press" src="${A}pd-obj-pressed-flower.webp" alt="" style="left:-14%;bottom:1%;width:66%;transform:rotate(-28deg)">
          ${blBloom(c.b2,'left:30%;bottom:12%;width:22%;--r:16deg')}${blBloom(c.b3,'left:2%;bottom:26%;width:17%;--r:-30deg')}
        </div></div>
        <${tag} class="blr-band" ${attr}><i class="blr-rib"></i><svg class="blr-wrap" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M18 0L40 100M58 0L80 100"/></svg>
          ${blString('M30 0C30 45 70 60 88 100')}
          ${blTag(`${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:''}<em>${en?'Open invitation':'Buka Jemputan'}</em>`,guest?'':'solo')}
        </${tag}>
      </div>
    </div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;
    const b=blBg(c.b1);el.style.setProperty('--blr-img',b.img);el.style.setProperty('--blr-size',b.size);el.style.setProperty('--blr-pos',b.pos);
    ['tag','card2','stem'].forEach(k=>el.style.setProperty('--'+k,c[k]));
    const pg=$('.pg-liar',el),ph=pg&&$('.couple-ph.front',pg);if(ph)ph.classList.add('blr-ph');
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Blush linen, rose ribbon, pressed anemones',c:{ground:'#ead6d0',sheet:'#fffcf7',ink:'#3d2f2e',accent:'#9b4f5d',gold:'#c9a3a3',pagefg:'#3d2f2e',tag:'#f3e3d6',card2:'#e9c3c5',stem:'#7f9475',b1:'pink',b2:'wild',b3:'fmn'}},
    {k:'sage',n:'Sage',desc:'Sage linen, white blooms',c:{ground:'#d9e0cf',sheet:'#fffffa',ink:'#2f3a2d',accent:'#4f6a47',gold:'#aebd9c',pagefg:'#2f3a2d',tag:'#efecdc',card2:'#c3d1b6',stem:'#6f8a63',b1:'wh2',b2:'fmn2',b3:'wh'}},
    {k:'biru',n:'Biru Langit',desc:'Sky linen, forget-me-nots',c:{ground:'#d5e0e9',sheet:'#fdfdfb',ink:'#28323d',accent:'#43638a',gold:'#a9bdd2',pagefg:'#28323d',tag:'#eef0ea',card2:'#bdd0e2',stem:'#738c78',b1:'fmn',b2:'wh2',b3:'fmn2'}},
    {k:'lavender',n:'Lavender',desc:'Lilac linen, violet anemones',c:{ground:'#dfd7e8',sheet:'#fefcfb',ink:'#35304a',accent:'#6a5592',gold:'#c0b2d4',pagefg:'#35304a',tag:'#f1ebe6',card2:'#cfc1e3',stem:'#7f8f74',b1:'anU',b2:'fmn',b3:'anW'}},
    {k:'pic',n:'Pic',desc:'Peach linen, coral roses',c:{ground:'#f0dccb',sheet:'#fffcf6',ink:'#43302a',accent:'#a65a3f',gold:'#dcb293',pagefg:'#43302a',tag:'#f6e8d8',card2:'#f0c4ac',stem:'#7d9068',b1:'red',b2:'wild',b3:'fmn'}},
    {k:'kuning',n:'Kuning Mentega',desc:'Butter linen, white roses',c:{ground:'#ede4c6',sheet:'#fffdf4',ink:'#3a3424',accent:'#86692a',gold:'#d3bf86',pagefg:'#3a3424',tag:'#f6efdc',card2:'#ecdca4',stem:'#7a8d5f',b1:'wh',b2:'wh2',b3:'fmn2'}},
    {k:'krim',n:'Krim',desc:'Oatmeal linen, mixed wildflowers',c:{ground:'#e5dccd',sheet:'#fffdf8',ink:'#3a3128',accent:'#7a5a40',gold:'#c9b296',pagefg:'#3a3128',tag:'#f3ead9',card2:'#e2cdb6',stem:'#80906c',b1:'anU',b2:'pink',b3:'fmn'}},
    {k:'senja',n:'Senja',desc:'Dusk mauve linen, ivory card, rose ribbon',c:{ground:'#5b4048',sheet:'#fffaf5',ink:'#3f2a2c',accent:'#8a3f50',gold:'#c99aa0',pagefg:'#f6e9e6',tag:'#f2e2dc',card2:'#c98d98',stem:'#6e8466',b1:'pink',b2:'red',b3:'wild',dark:1}},
  ]});
