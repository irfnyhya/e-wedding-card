/* rimba: "Rimba Malam". A two-card suite bundled with cotton twine, lying askew on dark moss linen among leaves.
   The main card is thick cream cotton with a plate-mark pressed into it; a garden painting (Childe Hassam, public domain) is
   tipped in at the top with four photo corners, the names letterpressed beneath it in an old engraved roman. Under it a
   forest-green card with the date in gold foil. A pressed sprig (public domain specimen) is tucked under the twine, and a
   ruled botanical label slipped under the twine carries the guest's name: the guest pulls it to open.
   Cover: the twine slips off and the two cards fan apart.
   Page: the cards laid out: the plate card with everything on it, the green card below with the links in foil.
   Skin: plate-marked cotton cards on the moss linen, engraved small-caps headings over a fern frond. */
// a fern frond, drawn as a fine line: a curved stem with paired leaflets shrinking toward the tip
const RB_FERN=(()=>{let d='M4 10C40 9 80 8 116 10';for(let i=0;i<12;i++){const x=10+i*9,s=1-i/14,l=7*s+1.5;d+=`M${x} 9.6q${(3*s).toFixed(1)} ${(-l).toFixed(1)} ${(7*s).toFixed(1)} ${(-l-1).toFixed(1)}M${x} 10.2q${(3*s).toFixed(1)} ${l.toFixed(1)} ${(7*s).toFixed(1)} ${(l+1).toFixed(1)}`}
  return svgUriSq(`<svg ${NS} viewBox="0 0 120 20" fill="none" stroke="#000" stroke-width=".8" stroke-linecap="round"><path d="${d}"/></svg>`)})();
const RB_IMG={'pd-still-1.jpg':[1000,1289],'pd-still-3.jpg':[1000,1306]};
const rbCrop=(f,cx,cy,z,a)=>{const [iw,ih]=RB_IMG[f],r=z*ih/iw,px=(cx*z-.5)/(z-1)*100,py=(cy*r-.5/a)/(r-1/a)*100;
  return `background-image:url(${A}${f});background-size:${z*100}% auto;background-position:${px.toFixed(1)}% ${py.toFixed(1)}%;aspect-ratio:${a}`};
// leaves from the still lifes at the corners (dark themes); engraved leaves on the pale ones
const RB_LEAVES=[['tl','pd-still-1.jpg',.72,.24,2.3,.9],['br','pd-still-3.jpg',.2,.73,2.4,.9],['tr','pd-still-3.jpg',.12,.44,2.6,.8]];
const rbLeaves=c=>c.light?['tl','br'].map(k=>`<i class="rmb-eng ${k}" style="-webkit-mask-image:url(${A}eng-${k==='tl'?'iris':'anemones'}.webp);mask-image:url(${A}eng-${k==='tl'?'iris':'anemones'}.webp)"></i>`).join('')
  :RB_LEAVES.map(([k,f,x,y,z,a])=>`<i class="rmb-lf ${k}" style="${rbCrop(f,x,y,z,a)}"></i>`).join('');
const rbFern=()=>`<i class="rmb-fern" style="-webkit-mask-image:${RB_FERN};mask-image:${RB_FERN}"></i>`;
const rbNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="rmb-names"><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
// the tipped-in plate: the painting in a thin mount with four photo corners
const rbPlate=c=>`<div class="rmb-plate"><i class="rmb-art" style="background-image:url(${A}${c.art[0]});background-position:${c.art[1]};filter:${c.artf||'none'}"></i>${['tl','tr','bl','br'].map(k=>`<i class="rmb-pc ${k}"></i>`).join('')}</div>`;
const rbNum=o=>{const [d,m,y]=fmtShort(o.date).split('.');return d?`<p class="rmb-num"><b>${esc(d)}</b><i></i><b>${esc(m)}</b><small>${esc(y)}</small></p>`:''};
const RB_SPRIG=`<img class="rmb-sprig" src="${A}pd-obj-pressed-flower.webp" alt="">`;
const rbVars=c=>`--card2:${c.card2};--twine:${c.twine}`;
FAMILY({key:'rimba',name:'Rimba Malam',meaning:'Forest at dusk',
  blurb:'A cotton card with a tipped-in garden painting and a forest-green date card, bundled with twine and a pressed sprig on dark moss linen. The twine slips off and the cards fan apart.',
  fonts:{d:"'IM Fell English SC', serif",s:"'IM Fell English', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-rimba ${c.light?'rmb-light':''}" style="${rbVars(c)}"><i class="rmb-linen"></i>${rbLeaves(c)}
      <div class="rmb-main rpm reveal"><div class="rmb-in">${rbPlate(c)}
        ${o.bismillah?'<p class="rmb-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="rmb-k kicker">${ev(o,L)}</p>${rbNames(o,'h1')}${rbFern()}
        <p class="rmb-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="rmb-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="rmb-ven">${esc(o.venue)}</p>`:''}</div></div>
      ${RB_SPRIG}
      <div class="rmb-green rpg reveal d2">${rbNum(o)}<nav class="rmb-links"><a data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}<a data-go="loc" href="#">${en?'Location':'Lokasi'}</a></nav></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-rimba ${c.light?'rmb-light':''}" style="${rbVars(c)}"><i class="rmb-linen"></i>${rbLeaves(c)}
      <div class="rmb-stack">
        <div class="rmb-green rcg">${rbNum(o)}</div>
        <div class="rmb-main rcm"><div class="rmb-in">${rbPlate(c)}<p class="rmb-k">${ev(o,L)}</p>${rbNames(o)}${rbFern()}<p class="rmb-date">${esc(fmtDate(o.date,o.lang))}</p></div></div>
        <div class="rmb-tie"><i class="rmb-cord"></i><i class="rmb-cord b"></i>${RB_SPRIG}
          <svg class="rmb-knot" ${NS} viewBox="0 0 80 60"><g fill="none" stroke="${c.twine}" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="2 .8">
            <path d="M40 30c-10-14-30-16-30-6s20 10 30 6"/><path d="M40 30c8-16 30-20 31-9 1 10-21 12-31 9"/><path d="M40 30c-4 10-10 20-18 27"/><path d="M40 30c5 9 12 17 22 24"/></g>
            <circle cx="40" cy="30" r="3.6" fill="${c.twine}"/></svg>
          <${tag} class="rmb-label" ${attr}><small>${guest?L.dear:(en?'For you':'Untuk anda')}</small><b>${esc(guest||coverNames(o).join(' & '))}</b><span>${en?'Open invitation':'Buka Jemputan'}</span></${tag}></div>
      </div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('rmb-light',!!c.light);
    $$('.sheet > .sec > h2',el).forEach(h=>{if(!h.nextElementSibling||!h.nextElementSibling.classList.contains('rmb-fern'))h.insertAdjacentHTML('afterend',rbFern())});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'rimba',n:'Rimba',desc:'Garden plate and a forest-green card on dark moss linen',c:{ground:'#0f1c14',sheet:'#f5f0e1',ink:'#26322a',accent:'#1f4a32',gold:'#c8ab6a',pagefg:'#e6ecdc',card2:'#1d3d2b',twine:'#cdb88e',art:['pd-paint-hassam-water.jpg','50% 40%']}},
    {k:'lumut',n:'Lumut',desc:'Garden plate and an olive card on moss linen',c:{ground:'#191b0e',sheet:'#f6f1e0',ink:'#2f3022',accent:'#46502a',gold:'#c9ad6c',pagefg:'#ebead6',card2:'#3c4424',twine:'#cdb88e',art:['pd-paint-hassam-water.jpg','30% 60%'],artf:'sepia(.25)'}},
    {k:'zamrud',n:'Zamrud',desc:'Iris plate and an emerald card on deep green linen',c:{ground:'#081c1c',sheet:'#f5f3ea',ink:'#1e2f2c',accent:'#0f4a44',gold:'#c6ad72',pagefg:'#e2ece8',card2:'#0f3f39',twine:'#d4c4a0',art:['pd-paint-monet-irises.jpg','50% 70%']}},
    {k:'hitam',n:'Hitam',desc:'Garden plate and a black-green card on night linen',c:{ground:'#0a0d0b',sheet:'#f3eee0',ink:'#252b26',accent:'#24402e',gold:'#c4a868',pagefg:'#e4e8de',card2:'#16201a',twine:'#c9b48a',art:['pd-paint-hassam-water.jpg','70% 30%'],artf:'brightness(.92)'}},
    {k:'laut',n:'Laut',desc:'Iris plate and a deep teal card on blue-green linen',c:{ground:'#0a1820',sheet:'#f4f1e8',ink:'#1f2c33',accent:'#174456',gold:'#c4ad78',pagefg:'#e0eaee',card2:'#163c4a',twine:'#d2c4a4',art:['pd-paint-monet-irises.jpg','40% 40%']}},
    {k:'senja',n:'Senja',desc:'Poppy plate and a moss card on rust-dusk linen',c:{ground:'#1c130c',sheet:'#f6efe0',ink:'#33291f',accent:'#3b4a2a',gold:'#caa66a',pagefg:'#efe4d2',card2:'#34402a',twine:'#d0b88a',art:['pd-paint-hassam-island.jpg','50% 50%']}},
    {k:'sage',n:'Sage',desc:'Garden plate and a sage card on pale linen',c:{ground:'#cfd5c3',sheet:'#fbf9f1',ink:'#27302a',accent:'#2c4a35',gold:'#a8894a',pagefg:'#22301f',light:1,card2:'#465a44',twine:'#a08a5e',art:['pd-paint-hassam-water.jpg','50% 40%']}},
    {k:'pucuk',n:'Pucuk',desc:'Poppy plate and a young-leaf card on pale green linen',c:{ground:'#dbe0c6',sheet:'#fdfcf5',ink:'#2a3324',accent:'#3d5a2c',gold:'#a8894a',pagefg:'#26301e',light:1,card2:'#4b6234',twine:'#a08a5e',art:['pd-paint-hassam-island.jpg','50% 50%']}},
  ]});
