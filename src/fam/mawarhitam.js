/* mawarhitam: "Mawar Malam". A cream card with a gilt edge lying on black velvet, deep red roses from a Dutch still life
   (Abraham Mignon, public domain) heaped behind it and spilling out from under one corner.
   Cover: tap "Buka Jemputan"; the roses sink back into the dark while the card lifts towards you and straightens.
   Page: the rose heap across the top, the gilt-edged card in front of it. Skin: gilt-edged cream cards on velvet,
   script headings over a hairline with a small rose-bud. */
const MW_IMG={'pd-still-3.jpg':[1000,1306],'pd-still-1.jpg':[1000,1289],'pd-still-4.jpg':[1000,1257]};
// put painting point (cx,cy) at the centre of a box of aspect a (w/h), the painting z times as wide as the box
const mwCrop=(f,cx,cy,z,a)=>{const [iw,ih]=MW_IMG[f],r=z*ih/iw,px=(cx*z-.5)/(z-1)*100,py=(cy*r-.5/a)/(r-1/a)*100;
  return `background-image:url(${A}${f});background-size:${z*100}% auto;background-position:${px.toFixed(1)}% ${py.toFixed(1)}%;aspect-ratio:${a}`};
// a gilt corner flourish, drawn for the top-left corner; the other three are mirrored in CSS
const MW_CN=svgUriSq(`<svg ${NS} viewBox="0 0 60 60" fill="none" stroke="#b08a43" stroke-linecap="round">
  <path d="M3 57V19C3 10 10 3 19 3H57" stroke-width="1"/><path d="M8 52V22C8 14 14 8 22 8H52" stroke-width=".55"/>
  <path d="M13 30c0-9 8-17 17-17M13 30c4 0 6-3 6-6s-3-4-5-2" stroke-width=".7"/><path d="M30 13c0 4-3 6-6 6s-4-3-2-5" stroke-width=".7"/>
  <path d="M19 19l2.4-4.4L23.8 19l-2.4 4.4z" fill="#b08a43" stroke="none"/><circle cx="34" cy="13" r=".9" fill="#b08a43" stroke="none"/><circle cx="13" cy="34" r=".9" fill="#b08a43" stroke="none"/></svg>`);
const mwCard=(inner,cls='')=>`<div class="mwh-card ${cls}"><div class="mwh-face">${['tl','tr','bl','br'].map(k=>`<i class="mwh-cn ${k}" style="-webkit-mask-image:${MW_CN};mask-image:${MW_CN}"></i>`).join('')}<div class="mwh-in">${inner}</div></div></div>`;
const mwNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="mwh-names"><span>${esc(n1)}</span><em>&amp;</em><span>${esc(n2)}</span></${tag}>`};
// the roses: c.r = [[painting,cx,cy,zoom], ...] for the heap (behind the card, top right) and the stem (bottom left)
const mwRoses=(c,pg)=>`<i class="mwh-rose heap" style="${mwCrop(...c.r[0],.86)}"></i><i class="mwh-rose stem" style="${mwCrop(...c.r[1],1)}"></i>${pg?'':`<i class="mwh-rose bud" style="${mwCrop(...c.r[2],1)}"></i>`}`;
const R_RED=[['pd-still-3.jpg',.62,.56,2.2],['pd-still-3.jpg',.85,.6,3.3],['pd-still-3.jpg',.3,.875,3.8]];
FAMILY({key:'mawarhitam',name:'Mawar Malam',meaning:'Roses at night',
  blurb:'A gilt-edged cream card on black velvet, with deep red roses from an old Dutch painting heaped behind it. The roses sink into the dark as the card lifts to open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-mawarhitam" style="--rf:${c.rf||'none'}"><i class="mwh-vel"></i><i class="mwh-rose top" style="${mwCrop(...c.r[0],1.1)}"></i>
      <div class="mwh-pgwrap reveal">${mwCard(`${o.bismillah?'<p class="mwh-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="mwh-k kicker">${ev(o,L)}</p>${mwNames(o,'h1')}<i class="mwh-rule"></i>
        <p class="mwh-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="mwh-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="mwh-ven">${esc(o.venue)}</p>`:''}`,'big')}</div>
      <div class="mwh-pills reveal d2"><a class="mwh-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="mwh-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-mawarhitam" style="--rf:${c.rf||'none'};--rf2:${c.rf2||'sepia(.45) saturate(2.4) hue-rotate(-28deg) brightness(.66) contrast(1.25)'}"><i class="mwh-vel"></i><i class="mwh-glow"></i>${mwRoses(c)}
      ${mwCard(`<p class="mwh-k">${ev(o,L)}</p>${mwNames(o)}<i class="mwh-rule"></i><p class="mwh-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>`,'cc')}
      <div class="mwh-foot">${guest?`<p class="mwh-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="mwh-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'hitam',n:'Hitam',desc:'Red roses and a cream card on black velvet',c:{ground:'#0b0909',sheet:'#f7f0e3',ink:'#2d2420',accent:'#8a6526',gold:'#b8914a',pagefg:'#efe4d0',r:R_RED,rf:'saturate(1.2) hue-rotate(-10deg) brightness(.8) contrast(1.2)'}},
    {k:'marun',n:'Marun',desc:'Red roses and a cream card on maroon velvet',c:{ground:'#22090f',sheet:'#f8efe2',ink:'#33201f',accent:'#86602a',gold:'#bd954c',pagefg:'#f3e3d2',r:R_RED,rf:'saturate(1.1) hue-rotate(-10deg) brightness(.92) contrast(1.15)'}},
    {k:'delima',n:'Merah Delima',desc:'Crimson roses and a blush card on black',c:{ground:'#0e0809',sheet:'#f6e6e0',ink:'#3a2224',accent:'#8c4a4c',gold:'#b98a62',pagefg:'#f2e2db',r:R_RED,rf:'sepia(.35) saturate(1.7) hue-rotate(-24deg) brightness(.72) contrast(1.25)'}},
    {k:'zamrud',n:'Zamrud',desc:'Red roses and an ivory card on bottle-green velvet',c:{ground:'#0a1913',sheet:'#f6f1e4',ink:'#22302a',accent:'#7f6427',gold:'#b8954c',pagefg:'#ebeadb',r:R_RED,rf:'saturate(1.1) hue-rotate(-8deg) brightness(.9) contrast(1.15)'}},
    {k:'nila',n:'Nila',desc:'Red roses and an ivory card on midnight velvet',c:{ground:'#0a0f1e',sheet:'#f6f2ea',ink:'#232838',accent:'#7f6430',gold:'#b8984f',pagefg:'#e9e7e3',r:R_RED,rf:'saturate(1.1) hue-rotate(-12deg) brightness(.88) contrast(1.15)'}},
    {k:'koko',n:'Koko',desc:'Rust roses and a cream card on cocoa velvet',c:{ground:'#1a100b',sheet:'#f7efe1',ink:'#33261d',accent:'#875f28',gold:'#bc924c',pagefg:'#f1e5d2',r:[['pd-still-1.jpg',.42,.48,2.4],['pd-still-3.jpg',.85,.6,3.3],['pd-still-1.jpg',.86,.36,3.4]],rf:'saturate(1.05) brightness(.9) contrast(1.15)'}},
    {k:'ungu',n:'Ungu',desc:'Dark roses and a cream card on plum velvet',c:{ground:'#170b17',sheet:'#f7f0ea',ink:'#33232f',accent:'#80603a',gold:'#b8935a',pagefg:'#f1e5e6',r:[['pd-still-4.jpg',.55,.47,2.1],['pd-still-3.jpg',.85,.6,3.3],['pd-still-4.jpg',.62,.38,3.6]],rf:'sepia(.25) saturate(1.5) hue-rotate(-18deg) brightness(.82) contrast(1.2)'}},
    {k:'perak',n:'Perak',desc:'Red roses and a silver-edged white card on charcoal',c:{ground:'#121214',sheet:'#f6f5f2',ink:'#26272b',accent:'#5a5d64',gold:'#a3a7ae',pagefg:'#ececea',silver:1,r:R_RED,rf:'saturate(1.1) hue-rotate(-8deg) brightness(.9) contrast(1.15)'}},
  ]});
