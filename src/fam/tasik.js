/* tasik: a light watercolour card. A lakeside garden painting (Hassam, Monet; public domain) softened into a watercolour
   vignette that bleeds into the paper, framed down both sides by tall Redouté stems.
   Cover: the vignette as a soft oval with the names below; tap "Buka Jemputan" and the painting blooms open to fill the screen.
   Page: the full card: vignette, names, a details row with tiny line icons (each a link) and an RSVP pill.
   Skin: paper cards with a printed hairline frame and script headings. */
// watercolour edge: an ellipse pushed around by fractal noise and blurred, with a fainter outer bleed (used as a mask)
const tsMask=(seed,rx,ry,cy,vh=200)=>{const f=(id,sc,b)=>`<filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="4" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="${sc}" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="${b}"/></filter>`;
  return svgUriSq(`<svg ${NS} viewBox="0 0 200 ${vh}" preserveAspectRatio="none"><defs>${f('a',18,2.6)}${f('b',30,6)}</defs>
    <ellipse cx="100" cy="${cy}" rx="${rx+8}" ry="${ry+8}" fill="#fff" fill-opacity=".38" filter="url(#b)"/>
    <ellipse cx="100" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" filter="url(#a)"/><ellipse cx="100" cy="${cy}" rx="${rx*.8}" ry="${ry*.8}" fill="#fff"/></svg>`)};
const tsVig=(c,cls,mask)=>`<div class="tk2-vig ${cls}" style="-webkit-mask-image:${mask};mask-image:${mask}"><i class="tk2-art" style="background-image:url(${A}${c.art});background-position:${c.ap}"></i><i class="tk2-grain"></i></div>`;
// a tall stem cut-out; the bottom of each plate holds a pencilled caption, so the box only shows the top 88%
const TS_W={anemones:617,'blush-rose':622,'cabbage-rose':581,'forget-me-not':528,hibiscus:619,iris:566,jasmine:518,lotus:621,'pink-rose':674,'red-rose':622,'white-roses':636,'wild-rose':663};
const tsStem=(n,cls)=>`<i class="tk2-stem ${cls}" style="background-image:url(${A}flower-${n}.webp);aspect-ratio:${((TS_W[n]||600)/(760*.87)).toFixed(3)}"></i>`;
const TS_IC={
  cal:`<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14" rx="1.5"/><path d="M4 9.5h16M8.5 3.5v4M15.5 3.5v4"/><circle cx="12" cy="14.5" r="1.1"/></svg>`,
  time:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12.5" r="8"/><path d="M12 8v4.6l3 2"/></svg>`,
  pin:`<svg viewBox="0 0 24 24"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>`};
const tsNames=(o,cls)=>{const [n1,n2]=coverNames(o);return `<h1 class="tk2-names ${cls||''}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
const tsDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
FAMILY({key:'tasik',name:'Tasik',meaning:'Lakeside watercolour',
  blurb:'A light watercolour card: a lakeside garden painting fading softly into the paper, tall painted stems down both sides and the names set in fine serif capitals. The painting blooms open to reveal the card.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const c=th.c,en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-tasik"><div class="tk2-card">
      ${tsVig(c,'tk2-top reveal',tsMask(11,86,66,80,170))}
      ${tsStem(c.fl1,'l')}${tsStem(c.fl2,'r')}
      <div class="tk2-body">
        ${o.bismillah?`<p class="tk2-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="tk2-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${tsNames(o)}</div>
        <p class="tk2-date reveal d2">${esc(fmtDate(o.date,o.lang,false))}</p>${o.hijri?`<p class="tk2-hj reveal d2">${esc(o.hijri)}</p>`:''}
        <div class="tk2-row reveal d2">
          <a href="#" data-go="when">${TS_IC.cal}<small>${esc(tsDay(o))}</small><b>${esc(fmtShort(o.date))}</b></a>
          <a href="#" data-go="when">${TS_IC.time}<small>${en?'Time':'Masa'}</small><b>${esc(t)}</b></a>
          <a href="#" data-go="loc">${TS_IC.pin}<small>${en?'Venue':'Tempat'}</small><b>${esc(o.venue)}</b></a>
        </div>
        ${o.x_rsvp?`<a class="tk2-pill reveal d3" data-go="rsvp" href="#">${en?'Kindly reply':'Sahkan Kehadiran'}</a>`:`<a class="tk2-pill reveal d3" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>`}
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-tasik"><div class="tk2-card">
      ${tsVig(c,'tk2-oval',tsMask(5,84,66,85,170))}
      ${tsStem(c.fl1,'l')}${tsStem(c.fl2,'r')}
      <div class="tk2-cbody"><p class="tk2-k">${ev(o,L)}</p>${tsNames(o,'sm')}<p class="tk2-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
      <div class="tk2-foot">${guest?`<p class="tk2-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="tk2-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
    </div></div>`},
  skin(el,o,th,L){K.cards(el);
    // a couple photo takes the painting's place inside the watercolour vignette
    const pg=$('.pg-tasik',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const v=$('.tk2-top',pg);img.className='tk2-photo';img.removeAttribute('style');v.classList.add('has-photo');v.prepend(img);ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory paper, water garden, iris and lotus',c:{ground:'#e9e3d6',sheet:'#fcfaf4',ink:'#38332c',accent:'#6a5a43',gold:'#b09670',pagefg:'#38332c',art:'pd-paint-hassam-water.jpg',ap:'50% 0%',fl1:'iris',fl2:'lotus'}},
    {k:'jambu',n:'Jambu',desc:'Blush paper, poppy garden, anemones and roses',c:{ground:'#eedcd6',sheet:'#fdf7f4',ink:'#43302f',accent:'#94545e',gold:'#bf9878',pagefg:'#43302f',art:'pd-paint-monet-poppies.jpg',ap:'50% 75%',fl1:'anemones',fl2:'blush-rose'}},
    {k:'sage',n:'Sage',desc:'Sage paper, water garden, iris and jasmine',c:{ground:'#dde2d3',sheet:'#f9faf3',ink:'#2e382e',accent:'#506a4a',gold:'#a8956a',pagefg:'#2e382e',art:'pd-paint-monet-irises.jpg',ap:'50% 0%',fl1:'iris',fl2:'white-roses'}},
    {k:'biru',n:'Biru Kabus',desc:'Mist blue paper, lily pond, iris and forget-me-nots',c:{ground:'#dbe3ea',sheet:'#f8fafb',ink:'#27313c',accent:'#4a6683',gold:'#a99674',pagefg:'#27313c',art:'pd-monet.jpg',ap:'50% 80%',fl1:'iris',fl2:'forget-me-not'}},
    {k:'ungu',n:'Ungu Lembut',desc:'Lilac paper, Monet’s irises, iris and anemones',c:{ground:'#e3deea',sheet:'#fbf9fd',ink:'#35304a',accent:'#6a5a8c',gold:'#a8957a',pagefg:'#35304a',art:'pd-paint-monet-irises.jpg',ap:'50% 45%',fl1:'iris',fl2:'anemones'}},
    {k:'pic',n:'Pic',desc:'Peach paper, poppy garden, hibiscus and wild rose',c:{ground:'#f1e0d2',sheet:'#fdf8f2',ink:'#3e2d25',accent:'#a0603f',gold:'#c09a70',pagefg:'#3e2d25',art:'pd-paint-hassam-island.jpg',ap:'50% 20%',fl1:'hibiscus',fl2:'wild-rose'}},
    {k:'krim',n:'Krim',desc:'Cream paper, poppy field, white roses and jasmine',c:{ground:'#ebe2cd',sheet:'#fdfaf0',ink:'#3a3226',accent:'#7a6240',gold:'#b49863',pagefg:'#3a3226',art:'pd-paint-monet-poppies.jpg',ap:'50% 58%',fl1:'white-roses',fl2:'wild-rose'}},
    {k:'pudina',n:'Pudina',desc:'Mint paper, lily pond, lotus and forget-me-nots',c:{ground:'#d8e6e0',sheet:'#f6fbf8',ink:'#26372f',accent:'#3d6a5c',gold:'#a59670',pagefg:'#26372f',art:'pd-monet.jpg',ap:'50% 85%',fl1:'lotus',fl2:'forget-me-not'}},
  ]});
