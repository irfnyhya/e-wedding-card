/* kaset: a cassette in a clear case, shot like a product photo on linen. The J-card is a small piece of print design:
   a public-domain painting full-bleed, a cloth-coloured band with the names set in serif italic.
   Cover: tap "Buka Jemputan"; the case lid swings open on its hinge and shows the tape lying in the tray.
   Page: the J-card unfolded flat (front, spine, inside flap with the programme as Side A) with the tape laid across it.
   Skin: J-card panels, each with a narrow printed band carrying the side and track number, and a fold line between rows. */
let ksN=0;
const KF=(n,d=1)=>n.toFixed(d);
const ksVars=c=>`--board:${c.board};--shell:${c.shell};--tape:${c.tape};--art:url(${A}${c.art});--artpos:${c.artpos||'50% 40%'};--artsize:${c.artsize||'cover'};--artbg:${c.artbg||c.sheet};--bandink:${c.bandink}`;
// the tape: a clear-smoke shell, a printed label, the window with two reels of brown tape
function ksTape(o,c,uid){const [n1,n2]=coverNames(o),en=o.lang==='en',nm=`${n1} & ${n2}`,fs=nm.length>20?10:nm.length>15?11.5:13;
  const screw=(x,y)=>`<circle cx="${x}" cy="${y}" r="2.3" fill="${c.shell2}" stroke="#000" stroke-opacity=".35" stroke-width=".4"/><path d="M${x-1.3} ${y-1.3}l2.6 2.6" stroke="#000" stroke-opacity=".45" stroke-width=".5"/>`;
  const hub=(cx,cy)=>`<circle cx="${cx}" cy="${cy}" r="7" fill="#f4f1ea" stroke="#000" stroke-opacity=".3" stroke-width=".4"/><circle cx="${cx}" cy="${cy}" r="4.2" fill="#1b1816"/>`+
    K.ring(6,4.2,cx,cy).map(([x,y,a])=>`<rect x="${KF(x-.9)}" y="${KF(y-1)}" width="1.8" height="2" fill="#f4f1ea" transform="rotate(${KF(a*180/Math.PI+90)} ${KF(x)} ${KF(y)})"/>`).join('');
  return `<svg class="ks-cas" viewBox="0 0 200 128" aria-hidden="true"><defs>
    <linearGradient id="ksg${uid}" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="${c.shell}"/><stop offset="1" stop-color="${c.shell2}"/></linearGradient>
    <linearGradient id="ksh${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset=".25" stop-color="#fff" stop-opacity="0"/><stop offset=".42" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <clipPath id="ksw${uid}"><rect x="56" y="50" width="88" height="26" rx="13"/></clipPath></defs>
   <rect x=".8" y=".8" width="198.4" height="126.4" rx="7" fill="url(#ksg${uid})" stroke="#000" stroke-opacity=".35" stroke-width=".6"/>
   <rect x="3.4" y="3.4" width="193.2" height="121.2" rx="5" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width=".5"/>
   <rect x="13" y="9" width="174" height="80" rx="2.5" fill="${c.sheet}"/>
   <rect x="13" y="9" width="174" height="12" rx="2.5" fill="${c.board}"/><rect x="13" y="16" width="174" height="5" fill="${c.board}"/>
   <path d="M13 23.4h174" stroke="${c.gold}" stroke-width=".5"/>
   <text x="19" y="17.6" font-family="Jost,sans-serif" font-size="6" letter-spacing="1.8" fill="${c.sheet}">${en?'SIDE A':'SISI A'}</text>
   <text x="181" y="17.6" text-anchor="end" font-family="Jost,sans-serif" font-size="5" letter-spacing="1.4" fill="${c.sheet}">${esc(fmtShort(o.date))}</text>
   <text x="100" y="39" text-anchor="middle" font-family="'Cormorant Garamond',serif" font-style="italic" font-size="${fs}" fill="${c.ink}">${esc(nm)}</text>
   <path d="M30 44h140" stroke="${c.ink}" stroke-width=".25" opacity=".4"/>
   <rect x="52" y="47" width="96" height="32" rx="16" fill="${c.shell2}" opacity=".55"/>
   <g clip-path="url(#ksw${uid})"><rect x="56" y="50" width="88" height="26" fill="#2a2522"/>
    <circle cx="76" cy="63" r="17" fill="${c.tape}"/><circle cx="124" cy="63" r="11" fill="${c.tape}"/>
    <circle cx="76" cy="63" r="17" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="3" stroke-dasharray=".4 1.4"/></g>
   ${hub(76,63)}${hub(124,63)}
   <rect x="56" y="50" width="88" height="26" rx="13" fill="none" stroke="#000" stroke-opacity=".35" stroke-width=".5"/>
   <path d="M44 127.2L51 101h98l7 26.2" fill="${c.shell2}" stroke="#000" stroke-opacity=".3" stroke-width=".5"/>
   <circle cx="72" cy="114" r="3.2" fill="#1b1816" opacity=".75"/><circle cx="128" cy="114" r="3.2" fill="#1b1816" opacity=".75"/><rect x="94" y="108" width="12" height="8" rx="1" fill="#1b1816" opacity=".55"/>
   ${screw(7,7)}${screw(193,7)}${screw(7,121)}${screw(193,121)}${screw(100,95)}
   <rect x=".8" y=".8" width="198.4" height="126.4" rx="7" fill="url(#ksh${uid})"/></svg>`}
// the J-card front: painting above, cloth band with the names below
const ksJ=(o,L,small)=>{const [n1,n2]=coverNames(o),en=o.lang==='en';return `<div class="ks-jc"><div class="ks-art"></div>
  <div class="ks-band"><p class="ks-ser">${en?'Wedding recordings':'Rakaman Perkahwinan'} · Vol. I</p><p class="ks-nm">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="ks-dt">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>`};

FAMILY({key:'kaset',name:'Kaset',meaning:'Cassette in a case',
  blurb:'A cassette in a clear case with a beautifully printed J-card: a classic painting and your names in serif italic. The lid swings open to show the tape inside.',
  fonts:{d:"'Jost', sans-serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const c=th.c,en=o.lang==='en',u=++ksN,[n1,n2]=coverNames(o),tr=(o.schedule||[]).filter(s=>s.label).slice(0,4);
    return `<section class="page pg-kaset2${c.dark?' ks-dark':''}" style="${ksVars(c)}"><div class="ks-linen"></div>
    <div class="ks-unf reveal">
      <div class="ks-panel ks-front"><div class="ks-art"></div></div>
      <div class="ks-panel ks-spine"><span>${esc(n1)} &amp; ${esc(n2)}</span><b>${esc(fmtShort(o.date))}</b></div>
      <div class="ks-panel ks-flap">
        <p class="ks-k kicker">${ev(o,L)}</p>
        <h1 class="names ks-names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1>
        <p class="ks-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="ks-ven">${esc(o.venue)}</p>`:''}
        ${tr.length?`<p class="ks-side">${en?'Side A':'Sisi A'}</p><ol class="ks-tr">${tr.map((s,i)=>`<li><b>${i+1}</b><span>${esc(s.label)}</span><i>${esc(fmtTime(s.time,o.lang))}</i></li>`).join('')}</ol>`:''}
        <div class="ks-pills"><a class="ks-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="ks-pill" data-go="rsvp" href="#">RSVP</a>`:''}</div>
      </div>
    </div>
    <div class="ks-ptape reveal d2">${ksTape(o,c,'p'+u)}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en',u=++ksN;
    return `<div class="cover cv-kaset2${c.dark?' ks-dark':''}" style="${ksVars(c)}"><div class="ks-linen"></div>
    <p class="ks-k ks-top">${ev(o,L)}</p>
    <div class="ks-case">
      <div class="ks-tray"><i class="ks-ridge"></i><div class="ks-in">${ksTape(o,c,'c'+u)}</div></div>
      <div class="ks-lid"><div class="ks-face">${ksJ(o,L)}<i class="ks-gloss"></i><i class="ks-hinge"></i></div><div class="ks-back"><i class="ks-gloss"></i></div></div>
    </div>
    <div class="ks-foot">${guest?`<p class="ks-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="ks-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c,en=o.lang==='en';
    el.setAttribute('style',(el.getAttribute('style')||'')+';'+ksVars(c));el.classList.toggle('ks-dark',!!c.dark);
    $$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(h&&!s.querySelector('.ks-strip'))s.insertAdjacentHTML('afterbegin',`<p class="ks-strip"><span>${en?'Side':'Sisi'} ${i<5?'A':'B'}</span><b>${String(i<5?i+1:i-4).padStart(2,'0')}</b></p>`)});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'krim',n:'Krim',desc:'Cream J-card, Hassam’s flower garden, on oatmeal linen',c:{ground:'#e6ddcf',sheet:'#fbf7ef',ink:'#2c2620',accent:'#8a4a2e',gold:'#b8925a',pagefg:'#2c2620',board:'#efe5d2',shell:'#efeae0',shell2:'#d9d1c3',tape:'#4a3226',art:'pd-paint-hassam-island.jpg',artpos:'50% 40%',bandink:'#3a2c22',dark:''}},
    {k:'hitam',n:'Hitam',desc:'Black J-card, a still life in oil, on charcoal linen',c:{ground:'#171615',sheet:'#f3eee4',ink:'#221f1b',accent:'#6a4e2c',gold:'#c9a660',pagefg:'#ece5d8',board:'#1c1a19',shell:'#55524f',shell2:'#3a3836',tape:'#3e2a20',art:'pd-still-2.jpg',artpos:'50% 30%',bandink:'#e8dcc2',dark:'1'}},
    {k:'biru',n:'Biru',desc:'Blue-and-white plate on an ivory J-card, navy linen',c:{ground:'#1c2738',sheet:'#f6f3ec',ink:'#1f2635',accent:'#24467e',gold:'#c7a35e',pagefg:'#e9e6dc',board:'#203a66',shell:'#e8ecf0',shell2:'#c6ced8',tape:'#4a3428',art:'pd-asia-1.webp',artpos:'50% 50%',artsize:'118%',artbg:'#f3efe4',bandink:'#efe7d4',dark:'1'}},
    {k:'pic',n:'Pic',desc:'Bullfinches on a blossom branch, peach J-card',c:{ground:'#efdccd',sheet:'#fff8f1',ink:'#3a2a24',accent:'#a9553c',gold:'#b8894a',pagefg:'#3a2a24',board:'#e7b9a2',shell:'#fff6ee',shell2:'#ead9ca',tape:'#5a3a2a',art:'pd-asia-3.jpg',artpos:'50% 45%',bandink:'#4a2a20',dark:''}},
    {k:'sage',n:'Sage',desc:'A long-tailed bird print, sage J-card, pale linen',c:{ground:'#dfe3d6',sheet:'#f9f9f2',ink:'#25302a',accent:'#4d6b4c',gold:'#a98f55',pagefg:'#25302a',board:'#7d8f72',shell:'#f2f2ea',shell2:'#d4d8cb',tape:'#4e3a2a',art:'pd-asia-2.jpg',artpos:'50% 30%',bandink:'#f6f2e4',dark:''}},
    {k:'ungu',n:'Ungu',desc:'Monet’s irises, plum J-card, dusk linen',c:{ground:'#261f31',sheet:'#f8f3f4',ink:'#2a2330',accent:'#6a3d7a',gold:'#d2ab60',pagefg:'#efe6f2',board:'#4a2d58',shell:'#dcd5e4',shell2:'#b5abc2',tape:'#4a3028',art:'pd-paint-monet-irises.jpg',artpos:'50% 55%',bandink:'#f1e6ef',dark:'1'}},
    {k:'marun',n:'Marun',desc:'A gold songket J-card, maroon linen',c:{ground:'#33141a',sheet:'#fbf3ea',ink:'#2d1f1c',accent:'#7a1d2b',gold:'#d4ac62',pagefg:'#f1e3cf',board:'#5c1620',shell:'#efe6dc',shell2:'#d3c4b4',tape:'#4a3026',art:'pd-textile-1.jpg',artpos:'30% 40%',bandink:'#f1dfbf',dark:'1'}},
    {k:'kunyit',n:'Kunyit',desc:'Loquats on silk, turmeric J-card',c:{ground:'#eadcb6',sheet:'#fffaf0',ink:'#33281c',accent:'#94591a',gold:'#9a7034',pagefg:'#33281c',board:'#d9a441',shell:'#fbf4e2',shell2:'#e3d3b0',tape:'#5a3a28',art:'pd-asia-4.jpg',artpos:'40% 40%',bandink:'#3a2810',dark:''}},
  ]});
