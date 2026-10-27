/* retro (redesign): 1970s wedding stationery done with restraint. A thick cream card with rounded corners,
   an arched window holding a soft-focus field of flowers (Monet and Hassam, public domain) warmed like a period photograph,
   a soft gold-foil sunburst rising behind the arch, the names in Fraunces italic.
   Cover: tap "Buka Jemputan" and the card turns over. Page: the card again with the day set beneath the arch.
   Skin: rounded cream cards with a small foil sun over each heading. */
needFont('Fraunces:ital,opsz,wght,SOFT@0,9..144,300..600,0..100;1,9..144,300..600,0..100');
let rtN=0;
// the sunburst: fine wedge rays from the top of the arch, drawn as a mask for the foil
const RT_RAYS=(()=>{let d='';const cx=100,cy=100,n=36;for(let i=0;i<n;i++){const a0=Math.PI+(i/n)*Math.PI,a1=a0+Math.PI/n*.5;
  d+=`M${cx} ${cy}L${(cx+Math.cos(a0)*140).toFixed(1)} ${(cy+Math.sin(a0)*140).toFixed(1)}L${(cx+Math.cos(a1)*140).toFixed(1)} ${(cy+Math.sin(a1)*140).toFixed(1)}Z`}
  return K.uri(`<svg ${NS} viewBox="0 0 200 100" preserveAspectRatio="none"><path d="${d}" fill="#000"/></svg>`)})();
const rtWin=(th,cls='')=>`<div class="rt2-win ${cls}"><div class="rt2-photo" style="--pic:url(${A}${th.c.pic});--pos:${th.c.pos||'50% 60%'}"></div></div>`;
const rtArch=(th,cls)=>`<div class="rt2-arch ${cls}"><i class="rt2-sun" style="--rays:${RT_RAYS}"></i>${rtWin(th)}</div>`;
FAMILY({key:'retro',name:'Retro 70-an',meaning:'Seventies stationery',
  blurb:'A thick cream card from the seventies: an arched window of soft-focus flowers, a gold-foil sunburst behind it and the names in a warm italic. It turns over to open.',
  fonts:{d:"'Fraunces', serif",s:"'Fraunces', serif",b:"'Jost', sans-serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-retro2" style="${rtVars(th)}"><div class="rt2-ground"></div>
      <div class="rt2-card reveal"><div class="rt2-face">
        ${rtArch(th,'pg')}
        <p class="rt2-k kicker">${ev(o,L)}</p><h1 class="rt2-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="rt2-date">${esc(fmtDate(o.date,o.lang))}</p>${t?`<p class="rt2-time">${esc(t)}</p>`:''}${o.venue?`<p class="rt2-ven">${esc(o.venue)}</p>`:''}
        ${o.hijri?`<p class="rt2-hj">${esc(o.hijri)}</p>`:''}</div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',[a,b]=K.initials(o);
    return `<div class="cover cv-retro2" style="${rtVars(th)}"><div class="rt2-ground"></div>
      <div class="rt2-flip"><div class="rt2-card"><div class="rt2-face">
        ${rtArch(th,'cv')}
        <p class="rt2-k">${ev(o,L)}</p><p class="rt2-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
        <p class="rt2-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>
        ${guest?`<p class="rt2-to"><small>${L.dear}</small>${esc(guest)}</p>`:''}</div></div>
        <div class="rt2-card rt2-back"><i class="rt2-sun" style="--rays:${RT_RAYS}"></i><p>${esc(a)}<span>&amp;</span>${esc(b)}</p></div></div>
      <div class="rt2-foot"><${tag} class="rt2-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el)},
  themes:[
    {k:'klasik',n:'Klasik',desc:'Cream card, poppy field, rust and gold',c:{ground:'#d9c29b',sheet:'#f8eedb',ink:'#4a2a17',accent:'#a5481f',gold:'#c8963e',pagefg:'#4a2a17',s1:'#6b3418',s2:'#c2551f',s3:'#e0a33a',pic:'pd-paint-monet-poppies.jpg',pos:'50% 72%'}},
    {k:'coklat',n:'Coklat',desc:'Chocolate ground, poppy field, gold',c:{ground:'#3a2317',sheet:'#f6ead3',ink:'#3e2416',accent:'#9a4420',gold:'#cf9d48',pagefg:'#f2e3c8',s1:'#7a3418',s2:'#cf5a22',s3:'#e7ae45',pic:'pd-paint-monet-poppies.jpg',pos:'50% 64%'}},
    {k:'alpukat',n:'Alpukat',desc:'Avocado ground, iris garden, harvest gold',c:{ground:'#b6ad7a',sheet:'#f6efd9',ink:'#363016',accent:'#6a6a22',gold:'#c39a3c',pagefg:'#2e2a12',s1:'#4b5320',s2:'#828a2c',s3:'#d9a62e',pic:'pd-paint-monet-irises.jpg',pos:'50% 60%'}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose, flower bank, rose gold',c:{ground:'#e3c0b0',sheet:'#fbefe4',ink:'#4a1f24',accent:'#a3474f',gold:'#c48a6a',pagefg:'#4a1f24',s1:'#6e1f2e',s2:'#b83f55',s3:'#e9886f',pic:'pd-paint-hassam-island.jpg',pos:'50% 55%'}},
    {k:'laut',n:'Laut',desc:'Sea green, water garden, mustard',c:{ground:'#a9b8a6',sheet:'#f5f0de',ink:'#1f3433',accent:'#2c6763',gold:'#c4983e',pagefg:'#1d2e2c',s1:'#1f4e57',s2:'#2b8584',s3:'#e0a83a',pic:'pd-paint-hassam-water.jpg',pos:'50% 50%'}},
    {k:'senja',n:'Senja',desc:'Dusky plum, poppy field, sunset gold',c:{ground:'#3b2433',sheet:'#f7e9d4',ink:'#3a2030',accent:'#a3444a',gold:'#d9a250',pagefg:'#f3e2cd',s1:'#8e3b6e',s2:'#d9534f',s3:'#f0a64b',pic:'pd-paint-monet-poppies.jpg',pos:'50% 40%'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric ground, flower bank, brown',c:{ground:'#d8a641',sheet:'#fbf0d6',ink:'#4a2614',accent:'#9a4a1c',gold:'#b9852f',pagefg:'#3d1f10',s1:'#5a2e1a',s2:'#b8481f',s3:'#ef7f2d',pic:'pd-paint-hassam-island.jpg',pos:'50% 70%'}},
    {k:'lumut',n:'Lumut',desc:'Forest green, iris garden, gold',c:{ground:'#28331f',sheet:'#f5ead0',ink:'#2a3220',accent:'#5e6b2a',gold:'#d0a64c',pagefg:'#efe4c8',s1:'#5d6e2f',s2:'#a8421f',s3:'#e0a43e',pic:'pd-paint-monet-irises.jpg',pos:'50% 45%'}},
  ]});
function rtVars(th){const c=th.c;return `--s1:${c.s1};--s2:${c.s2};--s3:${c.s3}`}
