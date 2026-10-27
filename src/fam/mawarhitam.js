/* mawarhitam: "Mawar Malam". One heavy black-core card, printed edge to edge with a Ruysch rose still life (public domain),
   edges painted gold, the names hot-foiled in big Didone capitals over the dark of the painting and the date foiled as large
   numerals at the foot. A frosted vellum belly band wraps the card, printed with the guest's name.
   Cover: tap the band; it slides off the card, and the card comes up towards you.
   Page: the same card, unwrapped, with the band laid across its foot as the way into the details.
   Skin: black duplex cards with painted gilt edges, foil Didone capitals over a lozenge rule. */
needFont('Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400');
const MW_A=n=>`${A}${n}`;
// the painting, placed in the card: [file, background-size, position-x, position-y]
const mwPaint=c=>`<i class="mwh-paint" style="background-image:url(${MW_A(c.p[0])});height:${c.p[1]};background-position:${c.p[2]} ${c.p[3]};filter:${c.rf||'none'}"></i>`;
// names in Didone capitals, sized by their length so long names still sit on one line each
const mwNames=(o,tag='p',k=1)=>{const [n1,n2]=coverNames(o),len=Math.max(String(n1).length,String(n2).length,4),fs=Math.min(15.5,90/len)*k;
  return `<${tag} class="mwh-names" style="font-size:${fs.toFixed(2)}cqi"><span>${esc(n1)}</span><em>&amp;</em><span>${esc(n2)}</span></${tag}>`};
const mwNum=o=>{const [d,m,y]=fmtShort(o.date).split('.');return d?`<p class="mwh-num"><b>${esc(d)}</b><i></i><b>${esc(m)}</b><small>${esc(y)}</small></p>`:''};
// a foil rule: two hairlines and a lozenge
const MW_RULE=`<i class="mwh-rule"><b></b></i>`;
const mwVars=c=>`--vel:${c.vel};--card:${c.card}`;
FAMILY({key:'mawarhitam',name:'Mawar Malam',meaning:'Roses at night',
  blurb:'A heavy black card printed edge to edge with a Dutch rose painting, the names foiled in gold capitals, wrapped in a frosted vellum band with the guest’s name. The band slides off to open.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-mawarhitam" style="${mwVars(c)}"><i class="mwh-vel"></i>
      <div class="mwh-card mpc"><i class="mwh-frame"></i>
        <div class="mwh-top reveal">${o.bismillah?'<p class="mwh-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="mwh-k kicker">${ev(o,L)}</p>${mwNames(o,'h1',.86)}${MW_RULE}
          <p class="mwh-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="mwh-hj">${esc(o.hijri)}</p>`:''}
          ${o.venue?`<p class="mwh-ven">${esc(o.venue)}</p>`:''}</div>
        ${mwPaint(c).replace('class="mwh-paint"','class="mwh-paint mpp"')}<i class="mwh-shade"></i>
        <div class="mwh-band mpb reveal d2"><a data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<i></i><a data-go="rsvp" href="#">RSVP</a>`:''}<i></i><a data-go="loc" href="#">${en?'Location':'Lokasi'}</a></div>
        ${mwNum(o)}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-mawarhitam" style="${mwVars(c)}"><i class="mwh-vel"></i>
      <div class="mwh-card mcc">${mwPaint(c)}<i class="mwh-shade"></i><i class="mwh-frame"></i>
        <div class="mwh-top"><p class="mwh-k">${ev(o,L)}</p>${mwNames(o)}${MW_RULE}</div>${mwNum(o)}</div>
      <${tag} class="mwh-band mcb" ${attr}><span class="mwh-bt">${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:`<b>${esc(coverNames(o).join(' & '))}</b>`}</span><span class="mwh-go">${en?'Open invitation':'Buka Jemputan'}<i></i></span></${tag}></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--vel',c.vel);el.style.setProperty('--card',c.card);
    $$('.sheet > .sec > h2',el).forEach(h=>{if(!h.nextElementSibling||!h.nextElementSibling.classList.contains('mwh-rule'))h.insertAdjacentHTML('afterend',MW_RULE)});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'hitam',n:'Hitam',desc:'Ruysch roses on a black card, gold foil, black velvet',c:{ground:'#0b0909',card:'#0d0c0b',sheet:'#151312',ink:'#efe6d6',accent:'#e6cf9a',gold:'#c4a15c',pagefg:'#efe4d0',vel:'rgba(246,240,229,.66)',p:['pd-still-4.jpg','80%','64%','100%'],rf:'brightness(.95) contrast(1.08)'}},
    {k:'marun',n:'Marun',desc:'Ruysch roses on a black card, gold foil, maroon velvet',c:{ground:'#22090f',card:'#120a0a',sheet:'#1d0d10',ink:'#f3e5d6',accent:'#e8cf98',gold:'#c6a15a',pagefg:'#f3e3d2',vel:'rgba(248,236,226,.66)',p:['pd-still-4.jpg','80%','64%','100%'],rf:'sepia(.2) saturate(1.2) hue-rotate(-12deg) brightness(.92) contrast(1.1)'}},
    {k:'delima',n:'Merah Delima',desc:'Mignon’s red peony and pink rose, gold foil, black',c:{ground:'#0e0809',card:'#0d0a09',sheet:'#170e0f',ink:'#f2e2db',accent:'#ebcf9e',gold:'#c79f62',pagefg:'#f2e2db',vel:'rgba(248,236,232,.66)',p:['pd-still-3.jpg','66%','30%','100%'],rf:'brightness(.9) contrast(1.08)'}},
    {k:'zamrud',n:'Zamrud',desc:'Ruysch bouquet on a black card, bottle-green velvet',c:{ground:'#0a1913',card:'#0b0d0b',sheet:'#0f1a15',ink:'#ebeadb',accent:'#e3cf9a',gold:'#bf9f58',pagefg:'#ebeadb',vel:'rgba(242,242,232,.66)',p:['pd-still-1.jpg','68%','50%','100%'],rf:'brightness(.92) contrast(1.06)'}},
    {k:'nila',n:'Nila',desc:'Ruysch roses on a black card, midnight velvet',c:{ground:'#0a0f1e',card:'#0b0c10',sheet:'#10141f',ink:'#e9e7e3',accent:'#e4d0a0',gold:'#c2a35e',pagefg:'#e9e7e3',vel:'rgba(240,241,246,.66)',p:['pd-still-4.jpg','80%','64%','100%'],rf:'saturate(.9) hue-rotate(6deg) brightness(.92) contrast(1.1)'}},
    {k:'koko',n:'Koko',desc:'Ruysch bouquet on a black card, cocoa velvet',c:{ground:'#1a100b',card:'#0f0b08',sheet:'#1a120c',ink:'#f1e5d2',accent:'#e8cf98',gold:'#c6a05a',pagefg:'#f1e5d2',vel:'rgba(246,238,226,.66)',p:['pd-still-1.jpg','68%','50%','100%'],rf:'sepia(.25) brightness(.92) contrast(1.08)'}},
    {k:'ungu',n:'Ungu',desc:'Ruysch roses in plum shadow, gold foil, plum velvet',c:{ground:'#170b17',card:'#0e0a0e',sheet:'#1a0f19',ink:'#f1e5e6',accent:'#e8cfa0',gold:'#c6a264',pagefg:'#f1e5e6',vel:'rgba(246,238,244,.66)',p:['pd-still-4.jpg','80%','64%','100%'],rf:'sepia(.15) saturate(1.15) hue-rotate(-24deg) brightness(.9) contrast(1.1)'}},
    {k:'perak',n:'Perak',desc:'Ruysch roses on a black card, silver foil, charcoal',c:{ground:'#121214',card:'#0c0c0d',sheet:'#161618',ink:'#ececea',accent:'#e4e6ea',gold:'#aeb3ba',pagefg:'#ececea',silver:1,vel:'rgba(242,243,246,.66)',p:['pd-still-4.jpg','80%','64%','100%'],rf:'saturate(.8) brightness(.95) contrast(1.08)'}},
  ]});
