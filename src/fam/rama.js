/* rama: a natural-history plate of Malayan butterflies, engraved and lightly hand-tinted, set in a glazed wooden
   shadow box on a quiet wall. A handwritten label in the middle of the plate carries the names. No pins: the
   butterflies are drawings on the plate, as in a 19th-century natural-history book.
   Cover: tap the box (or "Buka Jemputan") and its glazed door swings open on the left hinge.
   Page: the plate taken out of the box, the couple photo as an oval vignette among the figures.
   Skin: plate-paper cards with a printed double rule, italic headings numbered like plates. */
let lpN=0;
/* wing outlines for the right half (x > 0), in a box of about 100 x 140 units centred on the body */
const LP_SHAPE={
  bird:{fw:'M3 -6C20 -40 58 -66 100 -70C96 -52 84 -28 70 -8C50 -2 22 0 3 0Z',hw:'M3 1C30 0 62 6 70 22C72 40 54 56 34 58C20 58 8 40 3 10Z',
    fv:[[100,-70],[96,-52],[88,-36],[78,-20],[66,-8],[40,-2]],hv:[[66,14],[70,30],[60,48],[44,58],[26,56],[12,40]]},
  kite:{fw:'M3 -5C14 -46 48 -72 84 -70C98 -56 96 -28 82 -6C56 -1 26 0 3 0Z',hw:'M3 1C34 0 74 10 80 32C82 56 58 72 34 70C16 66 6 44 3 10Z',
    fv:[[84,-70],[96,-52],[94,-34],[86,-16],[70,-4],[40,-1]],hv:[[76,20],[82,40],[72,60],[52,70],[30,68],[12,48]]},
  tail:{fw:'M3 -6C18 -42 56 -64 92 -66C92 -46 82 -24 70 -6C48 -1 22 0 3 0Z',hw:'M3 1C30 0 58 6 64 20C66 34 56 46 46 52L52 84L40 56C26 58 10 44 3 10Z',
    fv:[[92,-66],[92,-48],[86,-32],[78,-18],[66,-6],[40,-1]],hv:[[62,14],[64,30],[52,48],[46,70],[30,56],[12,42]]},
  pierid:{fw:'M3 -5C14 -42 44 -62 76 -62C82 -44 78 -22 68 -5C46 -1 24 0 3 0Z',hw:'M3 1C30 1 62 8 66 26C66 46 46 58 28 56C14 52 6 38 3 10Z',
    fv:[[76,-62],[82,-46],[80,-30],[74,-16],[64,-5],[40,-1]],hv:[[62,16],[66,32],[56,48],[40,56],[24,54],[10,40]]},
};
/* species of the peninsula, drawn in the plate's palette: tint, border, hatching and markings */
const LP_SP={
  brookiana:{n:'Trogonoptera brookiana',shape:'bird',tint:'#2a2a26',hatch:'light',border:0,
    mark:(u)=>{let d='';for(let i=0;i<7;i++){const t=i/6,x=16+t*66,y=-12-t*44,w=7-t*2.2;d+=`M${x-w*.4} ${y+8-t*2}L${x+w} ${y-2}L${x+w*.4} ${y+10-t*2}Z`}
      return `<path d="${d}" fill="#6aa287" opacity=".9"/><path d="M8 6C24 6 46 12 56 22C52 34 40 44 28 46C18 40 10 26 8 6Z" fill="#6aa287" opacity=".85"/>${[[64,40],[56,50],[46,56],[34,58]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.6" fill="#f3efe4"/>`).join('')}`}},
  idea:{n:'Idea stolli',shape:'kite',tint:'#f3efe3',hatch:'ink',border:2.2,
    mark:()=>[[30,-30],[46,-44],[60,-30],[74,-50],[42,-14],[70,-14],[30,24],[48,30],[62,44],[40,50],[24,46]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="${3.6-(i%3)*.6}" ry="${2.8-(i%3)*.4}" fill="#2b2824"/>`).join('')},
  delias:{n:'Delias hyparete',shape:'pierid',tint:'#f6f1e1',hatch:'ink',border:4.4,
    mark:()=>`<path d="M8 6C26 8 50 14 58 26C56 40 42 50 28 50C16 44 9 28 8 6Z" fill="#e3c463" opacity=".7"/>${[[58,30],[52,42],[40,50],[28,50],[18,44]].map(([x,y])=>`<path d="M${x-3} ${y}l3 -4l3 4l-3 4Z" fill="#c8492e"/>`).join('')}`},
  graphium:{n:'Graphium agamemnon',shape:'tail',tint:'#3a3227',hatch:'light',border:0,
    mark:()=>[[24,-14],[34,-24],[44,-34],[56,-42],[70,-48],[30,-6],[42,-14],[56,-22],[16,10],[28,16],[40,24],[48,36],[36,40]].map(([x,y],i)=>`<ellipse cx="${x}" cy="${y}" rx="${3.4-i%2*.6}" ry="${2.4}" transform="rotate(-30 ${x} ${y})" fill="#9cc48a" opacity=".9"/>`).join('')},
  catopsilia:{n:'Catopsilia pomona',shape:'pierid',tint:'#f1df86',hatch:'ink',border:2.4,
    mark:()=>`<circle cx="40" cy="-30" r="2.4" fill="#8a6a1c" opacity=".7"/><path d="M30 -42C44 -50 60 -54 70 -54" stroke="#e2b93c" stroke-width="6" fill="none" opacity=".55"/>`},
};
/* engraver's hatching: parallel strokes at 38 degrees, kept near the body by a circular clip */
const LP_HATCH=(()=>{let d='';const t=Math.tan(38*Math.PI/180);for(let x=-220;x<=112;x+=2.3)d+=`M${x.toFixed(1)} -80L${(x+170/t).toFixed(1)} 90`;return d})();
function lpFly(key,ink){const s=LP_SP[key],sh=LP_SHAPE[s.shape],u='lp'+(++lpN);
  const veins=(pts,o)=>pts.map(([x,y])=>`M${o[0]} ${o[1]}Q${(o[0]+x)/2+4} ${(o[1]+y)/2+(y<0?6:-6)} ${x*1.08} ${y*1.08}`).join('');
  const hatchCol=s.hatch==='light'?'rgba(243,239,228,.32)':ink;
  const half=`<g clip-path="url(#${u}f)"><path d="${sh.fw}" fill="${s.tint}"/><g clip-path="url(#${u}c)"><path d="${LP_HATCH}" fill="none" stroke="${hatchCol}" stroke-width=".4" opacity="${s.hatch==='light'?1:.5}"/></g>${s.mark(u)}
      ${s.border?`<path d="${sh.fw}" fill="none" stroke="${ink}" stroke-width="${s.border*2}" opacity=".85"/>`:''}<path d="${veins(sh.fv,[4,-2])}" fill="none" stroke="${s.hatch==='light'?'rgba(243,239,228,.4)':ink}" stroke-width=".55"/></g>
    <g clip-path="url(#${u}h2)"><path d="${sh.hw}" fill="${s.tint}"/><g clip-path="url(#${u}c)"><path d="${LP_HATCH}" fill="none" stroke="${hatchCol}" stroke-width=".4" opacity="${s.hatch==='light'?1:.45}"/></g>${s.mark(u)}
      ${s.border?`<path d="${sh.hw}" fill="none" stroke="${ink}" stroke-width="${s.border*1.8}" opacity=".85"/>`:''}<path d="${veins(sh.hv,[4,2])}" fill="none" stroke="${s.hatch==='light'?'rgba(243,239,228,.4)':ink}" stroke-width=".5"/></g>
    <path d="${sh.fw}${sh.hw}" fill="none" stroke="${ink}" stroke-width=".6"/>`;
  return `<g class="lp-fly"><defs><clipPath id="${u}c"><ellipse cx="0" cy="0" rx="44" ry="40"/></clipPath><clipPath id="${u}f"><path d="${sh.fw}"/></clipPath><clipPath id="${u}h2"><path d="${sh.hw}"/></clipPath></defs>
    ${half}<g transform="scale(-1 1)">${half}</g>
    <path d="M-1 -12Q-10 -34 -16 -46M1 -12Q10 -34 16 -46" stroke="${ink}" stroke-width=".6" fill="none"/><ellipse cx="-16.4" cy="-46.6" rx="1.3" ry="2" fill="${ink}"/><ellipse cx="16.4" cy="-46.6" rx="1.3" ry="2" fill="${ink}"/>
    <ellipse cx="0" cy="-12" rx="2.6" ry="2.4" fill="${ink}"/><ellipse cx="0" cy="-3" rx="3" ry="7.5" fill="${ink}"/><path d="M0 4C3 10 2.4 26 0 34C-2.4 26 -3 10 0 4Z" fill="${ink}"/>
    <path d="M-1.6 -6h3.2M-1.8 -2h3.6M-1.6 8h3.2M-1.4 13h2.8M-1.2 18h2.4M-1 23h2" stroke="rgba(243,239,228,.45)" stroke-width=".35"/></g>`}
const lpSvg=(key,ink,cls,fig)=>`<svg class="${cls}" viewBox="-104 -74 208 162" aria-hidden="true">${lpFly(key,ink)}</svg>${fig?`<span class="lp-fig"><i>Fig. ${fig}.</i> ${LP_SP[key].n}</span>`:''}`;
const LP_ORDER=['brookiana','idea','delias','graphium','catopsilia'];
const lpSide=hero=>LP_ORDER.filter(k=>k!==hero).slice(0,2);
const lpPl=o=>['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][(new Date((o.date||'2026-01-01')+'T00:00:00').getMonth())||0]||'XII';
function lpPlate(o,th,L,inner){const c=th.c,[s1,s2]=lpSide(c.hero),en=o.lang==='en';
  return `<span class="lp-plate"><i class="lp-ptex"></i><span class="lp-rule"></span>
    <span class="lp-ph"><span>${en?'Plate':'Plat'} ${lpPl(o)}.</span><span>Lepidoptera Malayana</span></span>
    <span class="lp-hero">${lpSvg(c.hero,c.ink,'lp-svg',1)}</span>
    <span class="lp-s1">${lpSvg(s1,c.ink,'lp-svg',2)}</span><span class="lp-s2">${lpSvg(s2,c.ink,'lp-svg',3)}</span>
    ${ENG(c.eng,'','lp-spray')}${inner}</span>`}
FAMILY({key:'rama',name:'Rama-rama',meaning:'Natural-history plate',
  blurb:'An engraved, hand-tinted plate of Malayan butterflies in a glazed wooden shadow box, the names written on a small label in the middle. The glass door swings open.',
  fonts:{d:"'IM Fell English SC', serif",s:"'Pinyon Script', cursive",b:"'IM Fell English', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',[s1,s2]=lpSide(c.hero);
    return `<section class="page pg-rama" style="--wood:${c.wood};--woodL:${c.woodL}"><i class="lp-wall"></i>
      <div class="lp-sheet reveal"><i class="lp-ptex"></i><span class="lp-rule"></span>
        <p class="lp-ph"><span>${en?'Plate':'Plat'} ${lpPl(o)}.</span><span>Lepidoptera Malayana</span></p>
        <span class="lp-pa">${lpSvg(s1,c.ink,'lp-svg')}</span><span class="lp-pb">${lpSvg(c.hero,c.ink,'lp-svg')}</span>
        <p class="lp-k kicker">${ev(o,L)}</p>
        <h1 class="names lp-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="lp-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="lp-hj">${esc(o.hijri)}</p>`:''}
        <p class="lp-ven">${esc(o.venue)}</p>
        ${ENG(c.eng,'','lp-pspray')}
      </div>
      <nav class="lp-tags reveal d2"><a data-go="when" href="#">${en?'Details':'Butiran'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}<a data-go="loc" href="#">${en?'Location':'Lokasi'}</a></nav></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    const label=`<span class="lp-label"><span class="lp-lk">${ev(o,L)}</span><span class="lp-ln">${esc(n1)}<i>&amp;</i>${esc(n2)}</span><span class="lp-ld">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</span></span>`;
    return `<div class="cover cv-rama" style="--wood:${c.wood};--woodL:${c.woodL}"><i class="lp-wall"></i>
      ${guest?`<p class="lp-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
      <${tag} class="lp-stage" ${attr} aria-label="${L.open}">
        <span class="lp-box"><span class="lp-depth">${lpPlate(o,th,L,label)}</span>
          <span class="lp-door"><i class="lp-glass"></i></span></span>
        <span class="lp-btn">${en?'Open invitation':'Buka Jemputan'}</span>
      </${tag}></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--wood',th.c.wood);el.style.setProperty('--woodL',th.c.woodL);const sc=$('.scroller',el);
    const R=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV'];
    $$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(h)h.dataset.pl=(o.lang==='en'?'Plate ':'Plat ')+R[i%R.length]});
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'walnut',n:'Kayu Walnut',desc:'Walnut box on a warm stone wall',c:{ground:'#d9d0c2',sheet:'#f5efe2',ink:'#2c2620',accent:'#5a3a24',gold:'#a8844a',pagefg:'#2f2a24',wood:'#5a3a24',woodL:'#7e5636',hero:'brookiana',eng:'jasmine'}},
    {k:'hitam',n:'Hitam',desc:'Ebony box on a charcoal wall',c:{ground:'#1d1b19',sheet:'#efe8da',ink:'#26221e',accent:'#2c2620',gold:'#c4a15a',pagefg:'#ece4d6',wood:'#1e1b18',woodL:'#3a342d',hero:'brookiana',eng:'white-roses'}},
    {k:'oak',n:'Kayu Oak',desc:'Pale oak box on a chalk-white wall',c:{ground:'#ebe6dc',sheet:'#faf7f0',ink:'#33302a',accent:'#4a5a3a',gold:'#a8955a',pagefg:'#33302a',wood:'#b48d5e',woodL:'#d2b07f',hero:'idea',eng:'forget-me-not'}},
    {k:'mahogani',n:'Mahogani',desc:'Mahogany box on an oxblood wall',c:{ground:'#3b1f1b',sheet:'#f5ece2',ink:'#3a2622',accent:'#7a2f2c',gold:'#c39a5e',pagefg:'#f3e3d8',wood:'#5a2619',woodL:'#86402c',hero:'delias',eng:'wild-rose'}},
    {k:'sage',n:'Sage',desc:'Painted sage box on a pale green wall',c:{ground:'#d5dacb',sheet:'#f8f6ee',ink:'#2e342a',accent:'#4a5c3e',gold:'#a8955a',pagefg:'#2e342a',wood:'#7c8a6c',woodL:'#a0ad8e',hero:'catopsilia',eng:'jasmine'}},
    {k:'nila',n:'Nila',desc:'Indigo box on a midnight wall',c:{ground:'#1b2336',sheet:'#f2eee5',ink:'#252a38',accent:'#2c3a62',gold:'#c4a868',pagefg:'#e8e8ee',wood:'#22304e',woodL:'#3d4f78',hero:'graphium',eng:'iris'}},
    {k:'gading',n:'Gading',desc:'Ivory painted box with a gilt edge',c:{ground:'#e5dece',sheet:'#fbf8f1',ink:'#38322a',accent:'#7a5a3a',gold:'#b8944e',pagefg:'#38322a',wood:'#dcd2bd',woodL:'#f4ecda',hero:'idea',eng:'blush-rose'}},
    {k:'zamrud',n:'Zamrud',desc:'Deep green box on a forest wall',c:{ground:'#142a22',sheet:'#f3eee2',ink:'#24302a',accent:'#1f4a3a',gold:'#c4a45e',pagefg:'#e6eee8',wood:'#1c3a2e',woodL:'#335a48',hero:'brookiana',eng:'hibiscus'}},
  ]});
