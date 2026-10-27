/* konservatori: "Rumah Kaca". An arch-topped card printed edge to edge with an Impressionist garden (Hassam, Monet;
   public domain), edge-painted in the colourway, wrapped in a translucent vellum jacket. The vellum is printed in white
   ink with the iron glazing of a Victorian glasshouse door (a fanlight, side lights and a centre pane) and in deep ink
   with the names, so the garden glows through it as if seen through glass. A wax seal at the foot holds the vellum shut.
   Cover: tap the seal; it lifts off and the vellum folds up and away, leaving the painting.
   Page: the painted arch with its glazing, a vellum panel with the details laid over its foot, the seal beside it.
   Skin: arch-topped cards on pale paper, a fanlight ornament and a Didone italic heading. */
// glazing in a 100 x h box whose top is a half-ellipse of height ry (matches border-radius 50%/ry)
needFont('Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700');
const rkGlaze=(h,ry,low)=>{const cx=50,i=4.2,rx=50-i,iy=ry-i*0.9,top=ry,P=(a,r1,r2)=>[cx+Math.cos(a)*r1,top-Math.sin(a)*r2];
  let d=`M${i} ${h}V${top}A${rx} ${iy} 0 0 1 ${100-i} ${top}V${h}`;
  d+=`M${i} ${top}H${100-i}M${i} ${top+2.4}H${100-i}`;
  const hub=10;d+=`M${cx-hub} ${top}A${hub} ${hub*.92} 0 0 1 ${cx+hub} ${top}`;
  d+=`M${cx-rx*.62} ${top}A${rx*.62} ${iy*.62} 0 0 1 ${cx+rx*.62} ${top}`;
  for(let k=1;k<12;k++){const a=k/12*Math.PI,[x1,y1]=P(a,hub,hub*.92),[x2,y2]=P(a,rx,iy);d+=`M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`}
  const pT=top+2.4,pB=h-(low||8);
  d+=`M18 ${pT}V${pB}M82 ${pT}V${pB}M${i} ${pB}H${100-i}M${i} ${pB+1.8}H${100-i}`;
  const n=6;for(let k=1;k<n;k++){const y=(pT+(pB-pT)*k/n).toFixed(2);d+=`M${i} ${y}H18M82 ${y}H${100-i}`}
  let dots='';for(let k=0;k<=n;k++){const y=(pT+(pB-pT)*k/n).toFixed(2);dots+=`<circle cx="18" cy="${y}" r=".9"/><circle cx="82" cy="${y}" r=".9"/>`}
  // a small fleuron at the hub
  const fl=`<path class="rkc-fl" d="M${cx} ${top-hub*.92+1.2}c-1.6 2-1.6 4 0 5.4c1.6-1.4 1.6-3.4 0-5.4Z"/>`;
  return `<svg class="rkc-glz" viewBox="0 0 100 ${h}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/>${dots}${fl}</svg>`};
const rkDP=o=>{const d=new Date((o.date||'')+'T00:00:00');if(isNaN(d))return null;return {d:String(d.getDate()).padStart(2,'0'),m:String(d.getMonth()+1).padStart(2,'0'),y:d.getFullYear(),mon:MONTHS[o.lang][d.getMonth()],day:DAYS[o.lang][d.getDay()]}};
const rkNames=(o,cls='')=>{const [n1,n2]=coverNames(o),m=Math.max(String(n1).length,String(n2).length),fit=m>=10?' xl':m>=8?' lg':'';return `<h1 class="rkc-names names ${cls}${fit}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
const rkDate=o=>{const p=rkDP(o);return p?`<p class="rkc-date"><b>${p.d}</b><i></i><b>${p.m}</b><i></i><b>${String(p.y).slice(2)}</b></p><p class="rkc-day">${esc(p.day)} · ${esc(p.mon)} ${p.y}</p>`:''};
const rkMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="rkc-jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `${esc(a)}<i>&amp;</i>${esc(b)}`};
const rkVars=c=>`--art:url(${A}${c.art});--ap:${c.ap};--edge:${c.edge}`;
FAMILY({key:'konservatori',name:'Rumah Kaca',meaning:'Glasshouse vellum',
  blurb:'A garden painting on an arched card, wrapped in vellum printed with the glazing of a Victorian glasshouse and closed with a wax seal. The seal lifts and the vellum folds back.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const en=o.lang==='en',c=th.c,t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-konservatori" style="${rkVars(c)}"><i class="rkc-ground"></i>
      <div class="rkc-parch reveal"><i class="rkc-paint"></i>${rkGlaze(112,50,6)}</div>
      <div class="rkc-pvel reveal d1">
        ${o.bismillah?`<p class="rkc-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="rkc-k kicker">${ev(o,L)}</p>${rkNames(o,'pg')}${rkDate(o)}
        ${o.hijri?`<p class="rkc-sm">${esc(o.hijri)}</p>`:''}${t?`<p class="rkc-sm">${esc(t)}</p>`:''}
        ${o.venue?`<p class="rkc-ven">${esc(o.venue)}</p>`:''}
        <div class="rkc-links"><a data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}<a data-go="loc" href="#">${en?'Location':'Lokasi'}</a></div>
        <i class="rkc-pseal" style="--seal:url(${A}seal-${c.seal}.webp)"><span>${rkMono(o)}</span></i>
      </div>
    </section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-konservatori" style="${rkVars(c)}"><i class="rkc-ground"></i>
      <div class="rkc-card"><i class="rkc-paint"></i>
        <div class="rkc-vel"><i class="rkc-frost"></i>${rkGlaze(172,48,7)}
          <div class="rkc-pane">
            <p class="rkc-k">${ev(o,L)}</p>${rkNames(o)}${rkDate(o)}
            ${o.venue?`<p class="rkc-ven">${esc(o.venue)}</p>`:''}
            ${guest?`<p class="rkc-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
          </div>
        </div>
      </div>
      <${tag} class="rkc-open" ${attr}><span class="rkc-seal" style="--seal:url(${A}seal-${c.seal}.webp)"><span>${rkMono(o)}</span></span><span class="rkc-lbl">${en?'Open invitation':'Buka Jemputan'}</span></${tag}>
    </div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--edge',c.edge);
    const pg=$('.pg-konservatori',el),ph=pg&&$('.couple-ph.front',pg),ar=pg&&$('.rkc-parch',pg);if(ph&&ar){ph.classList.add('rkc-ph');ar.appendChild(ph)}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'pudina',n:'Pudina',desc:'Mint vellum over Hassam’s water garden',c:{ground:'#e8eee6',sheet:'#fbfdf9',ink:'#22342c',accent:'#3f6a58',gold:'#a9bfae',pagefg:'#22342c',edge:'#5f8f78',seal:'sage',art:'pd-paint-hassam-water.jpg',ap:'40% 40%'}},
    {k:'jambu',n:'Jambu',desc:'Blush edge, Hassam’s poppy garden',c:{ground:'#f3e5e2',sheet:'#fffbfa',ink:'#3a2629',accent:'#8e4656',gold:'#d5b2b5',pagefg:'#3a2629',edge:'#c98d98',seal:'gading',art:'pd-paint-hassam-island.jpg',ap:'50% 50%'}},
    {k:'biru',n:'Biru Pagi',desc:'Morning blue, Monet’s poppy field',c:{ground:'#e6edf2',sheet:'#fbfdfe',ink:'#1f2d3b',accent:'#38597a',gold:'#a9bccb',pagefg:'#1f2d3b',edge:'#6f8fb0',seal:'biru',art:'pd-paint-monet-poppies.jpg',ap:'50% 40%'}},
    {k:'lavender',n:'Lavender',desc:'Lilac edge, Monet’s iris garden',c:{ground:'#ece8f1',sheet:'#fdfcfe',ink:'#2e2840',accent:'#5e4e85',gold:'#c3b9d5',pagefg:'#2e2840',edge:'#9a8bbf',seal:'gading',art:'pd-paint-monet-irises.jpg',ap:'50% 60%'}},
    {k:'krim',n:'Krim',desc:'Cream and gold over the water garden',c:{ground:'#f0ebe0',sheet:'#fffdf8',ink:'#33302a',accent:'#6b5a33',gold:'#c9bc96',pagefg:'#33302a',edge:'#b89a5c',seal:'emas',art:'pd-paint-hassam-water.jpg',ap:'70% 70%'}},
    {k:'pic',n:'Pic',desc:'Apricot edge, a poppy garden by the sea',c:{ground:'#f6e9df',sheet:'#fffcf8',ink:'#3c2a23',accent:'#9a5638',gold:'#dfbca2',pagefg:'#3c2a23',edge:'#dc9b78',seal:'emas',art:'pd-paint-hassam-island.jpg',ap:'30% 80%'}},
    {k:'sage',n:'Sage',desc:'Fern green, lilies under glass',c:{ground:'#e2e8dc',sheet:'#fbfcf7',ink:'#26321f',accent:'#4a6640',gold:'#b2c2a3',pagefg:'#26321f',edge:'#7f9a6f',seal:'sage',art:'pd-paint-hassam-water.jpg',ap:'20% 90%'}},
    {k:'senja',n:'Senja',desc:'The glasshouse at dusk, irises in the dark',c:{ground:'#332d3d',sheet:'#fbf8fb',ink:'#2f2838',accent:'#6a4d7a',gold:'#c9b4cf',pagefg:'#f3ecf5',edge:'#b597c4',seal:'gading',art:'pd-paint-monet-irises.jpg',ap:'50% 30%',dark:1}},
  ]});
