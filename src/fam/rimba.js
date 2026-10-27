/* rimba: "Rimba Malam". A deep forest-green botanical card. Hassam's water garden (public domain), darkened to dusk, fills the ground;
   leaves cropped from Dutch still lifes (Ruysch, Mignon; public domain), washed green, crowd in from the edges;
   a deckled cream card in the clearing carries the names in green ink under a small engraved sprig.
   Cover: tap "Buka Jemputan"; the leaves in front drift past you and out of view, as if you walked into the clearing.
   Page: the card among the leaves. Skin: deckled cream cards on the dark garden, italic headings over a fern frond. */
const RB_IMG={'pd-still-1.jpg':[1000,1289],'pd-still-3.jpg':[1000,1306],'pd-still-2.jpg':[1000,1423]};
const rbCrop=(f,cx,cy,z,a)=>{const [iw,ih]=RB_IMG[f],r=z*ih/iw,px=(cx*z-.5)/(z-1)*100,py=(cy*r-.5/a)/(r-1/a)*100;
  return `background-image:url(${A}${f});background-size:${z*100}% auto;background-position:${px.toFixed(1)}% ${py.toFixed(1)}%;aspect-ratio:${a}`};
// leaves: [class, painting, cx, cy, zoom, aspect]
const RB_LEAVES=[['tl','pd-still-1.jpg',.72,.24,2.3,.9],['tr','pd-still-3.jpg',.12,.44,2.6,.8],['ml','pd-still-1.jpg',.62,.72,2.8,.7],['br','pd-still-3.jpg',.2,.73,2.4,.9],['bl','pd-still-1.jpg',.55,.36,2.6,1]];
const rbLeaves=(c,set)=>c.light?['tl','br'].map(k=>`<i class="rmb-eng ${k}" style="-webkit-mask-image:url(${A}eng-${k==='tl'?'iris':'anemones'}.webp);mask-image:url(${A}eng-${k==='tl'?'iris':'anemones'}.webp)"></i>`).join('')
  :RB_LEAVES.filter(l=>set.includes(l[0])).map(([k,f,x,y,z,a])=>`<i class="rmb-lf ${k}" style="${rbCrop(f,x,y,z,a)}"></i>`).join('');
// a fern frond, drawn as a fine line: a curved stem with paired leaflets shrinking toward the tip
const RB_FERN=(()=>{let d='M4 10C40 9 80 8 116 10';for(let i=0;i<12;i++){const x=10+i*9,s=1-i/14,l=7*s+1.5;d+=`M${x} 9.6q${(3*s).toFixed(1)} ${(-l).toFixed(1)} ${(7*s).toFixed(1)} ${(-l-1).toFixed(1)}M${x} 10.2q${(3*s).toFixed(1)} ${l.toFixed(1)} ${(7*s).toFixed(1)} ${(l+1).toFixed(1)}`}
  return svgUriSq(`<svg ${NS} viewBox="0 0 120 20" fill="none" stroke="#000" stroke-width=".8" stroke-linecap="round"><path d="${d}"/></svg>`)})();
const rbNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="rmb-names"><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
const rbSprig=c=>`<i class="rmb-sprig" style="-webkit-mask-image:url(${A}eng-${c.sprig||'forget-me-not'}.webp);mask-image:url(${A}eng-${c.sprig||'forget-me-not'}.webp)"></i>`;
const rbVars=c=>`--bgf:${c.bgf};--lff:${c.lff}`;
FAMILY({key:'rimba',name:'Rimba Malam',meaning:'Forest at dusk',
  blurb:'A deep green botanical card: a garden painting darkened to dusk, leaves from old Dutch still lifes crowding in from the edges, and a deckled cream card with the names in green ink. The leaves drift past as it opens.',
  fonts:{d:"'IM Fell English SC', serif",s:"'IM Fell English', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-rimba ${c.light?'rmb-light':''}" style="${rbVars(c)}"><i class="rmb-bg" style="background-image:url(${A}pd-paint-hassam-water.jpg)"></i><i class="rmb-tint"></i>${rbLeaves(c,['tl','tr','br','bl'])}
      <div class="rmb-cardw big reveal"><div class="rmb-card">
        ${rbSprig(c)}${o.bismillah?'<p class="rmb-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="rmb-k kicker">${ev(o,L)}</p>${rbNames(o,'h1')}<i class="rmb-fern" style="-webkit-mask-image:${RB_FERN};mask-image:${RB_FERN}"></i>
        <p class="rmb-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="rmb-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="rmb-ven">${esc(o.venue)}</p>`:''}</div></div>
      <div class="rmb-pills reveal d2"><a class="rmb-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="rmb-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-rimba ${c.light?'rmb-light':''}" style="${rbVars(c)}"><i class="rmb-bg" style="background-image:url(${A}pd-paint-hassam-water.jpg)"></i><i class="rmb-tint"></i>
      <div class="rmb-cardw cc"><div class="rmb-card">${rbSprig(c)}<p class="rmb-k">${ev(o,L)}</p>${rbNames(o)}<i class="rmb-fern" style="-webkit-mask-image:${RB_FERN};mask-image:${RB_FERN}"></i><p class="rmb-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
      ${rbLeaves(c,['tl','tr','ml','br','bl'])}
      <div class="rmb-foot">${guest?`<p class="rmb-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="rmb-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('rmb-light',!!c.light);el.style.setProperty('--bgf',c.bgf);
    $$('.sheet > .sec > h2',el).forEach(h=>{if(!h.nextElementSibling||!h.nextElementSibling.classList.contains('rmb-fern'))h.insertAdjacentHTML('afterend',`<i class="rmb-fern" style="-webkit-mask-image:${RB_FERN};mask-image:${RB_FERN}"></i>`)});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'rimba',n:'Rimba',desc:'Cream card in a dark green garden',c:{ground:'#0c1a12',sheet:'#f5f0e1',ink:'#26322a',accent:'#1f4a32',gold:'#8a9a6a',pagefg:'#e6ecdc',bgf:'brightness(.5) saturate(.75) contrast(1.1)',lff:'grayscale(.55) sepia(.35) hue-rotate(48deg) saturate(1.3) brightness(.62) contrast(1.2)'}},
    {k:'lumut',n:'Lumut',desc:'Ivory card among olive moss greens',c:{ground:'#171a0c',sheet:'#f6f1e0',ink:'#2f3022',accent:'#46502a',gold:'#9a9562',pagefg:'#ebead6',bgf:'brightness(.5) saturate(.6) sepia(.3) contrast(1.1)',lff:'grayscale(.6) sepia(.6) hue-rotate(15deg) saturate(1.2) brightness(.62) contrast(1.2)'}},
    {k:'zamrud',n:'Zamrud',desc:'White card among emerald leaves',c:{ground:'#06191a',sheet:'#f5f3ea',ink:'#1e2f2c',accent:'#0f4a44',gold:'#7f9e92',pagefg:'#e2ece8',bgf:'brightness(.46) saturate(.8) hue-rotate(18deg) contrast(1.1)',lff:'grayscale(.5) sepia(.3) hue-rotate(95deg) saturate(1.4) brightness(.6) contrast(1.2)'}},
    {k:'hitam',n:'Hitam',desc:'Cream card in a garden at night',c:{ground:'#070b08',sheet:'#f3eee0',ink:'#252b26',accent:'#24402e',gold:'#8a9478',pagefg:'#e4e8de',bgf:'brightness(.32) saturate(.5) contrast(1.1)',lff:'grayscale(.7) sepia(.3) hue-rotate(50deg) saturate(1.1) brightness(.5) contrast(1.25)'}},
    {k:'laut',n:'Laut',desc:'Ivory card among deep teal leaves',c:{ground:'#081620',sheet:'#f4f1e8',ink:'#1f2c33',accent:'#174456',gold:'#86a0a4',pagefg:'#e0eaee',bgf:'brightness(.46) saturate(.6) hue-rotate(40deg) contrast(1.1)',lff:'grayscale(.6) sepia(.3) hue-rotate(140deg) saturate(1.2) brightness(.56) contrast(1.2)'}},
    {k:'senja',n:'Senja',desc:'Cream card among green leaves at a rust dusk',c:{ground:'#1a120b',sheet:'#f6efe0',ink:'#33291f',accent:'#3b4a2a',gold:'#a8875a',pagefg:'#efe4d2',bgf:'brightness(.48) saturate(.7) sepia(.45) contrast(1.1)',lff:'grayscale(.5) sepia(.5) hue-rotate(28deg) saturate(1.2) brightness(.62) contrast(1.2)'}},
    {k:'sage',n:'Sage',desc:'Green ink on ivory with engraved leaves on pale sage',c:{ground:'#c9d0bd',sheet:'#fbf9f1',ink:'#27302a',accent:'#2c4a35',gold:'#7f8f6c',pagefg:'#22301f',light:1,sprig:'jasmine',bgf:'brightness(1.08) saturate(.35) contrast(.8)',lff:'none'}},
    {k:'pucuk',n:'Pucuk',desc:'Green ink on white with engraved leaves on young-leaf green',c:{ground:'#d6dcc0',sheet:'#fdfcf5',ink:'#2a3324',accent:'#3d5a2c',gold:'#8e9a62',pagefg:'#26301e',light:1,sprig:'wild-rose',bgf:'brightness(1.1) saturate(.45) contrast(.8)',lff:'none'}},
  ]});
