/* pisang: "Daun Pisang". A kenduri parcel: a cream card wrapped in a square of fresh banana leaf, the two sides folded
   in over it and pinned with lidi (coconut-rib skewers), the way kuih and nasi are wrapped for a kampung feast. It lies on
   a hand-drawn batik cloth (public domain) with a kraft label tucked under one fold carrying the guest's name.
   Cover: tap "Buka Jemputan": the lidi slide out and the leaf folds open to either side.
   Page: the parcel opened flat, the card on its leaf. Skin: cream cards edged with a strip of leaf. */
const pisV=c=>`--b0:${c.b0};--b1:${c.b1};--b2:${c.b2};--b3:${c.b3};--mid:${c.mid};--rib:${c.rib}`;
const psgDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const psgNames=(o,cls='')=>{const [n1,n2]=coverNames(o);return `<h1 class="psg-names ${cls}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
// a cut piece of leaf: straight sides with small nicks and a tear or two running in along the ribs
function psgCut(seed,tears,mir){const r=rng(seed),p=[];const jag=(x0,y0,x1,y1,n)=>{for(let i=0;i<n;i++){const t=i/n;p.push([x0+(x1-x0)*t+(r()-.5)*.8,y0+(y1-y0)*t+(r()-.5)*.8])}};
  jag(0,0,100,0,9);jag(100,0,100,100,14);jag(100,100,0,100,9);
  // the left side carries the tears: notches cut in along the rib angle
  const T=[];for(let k=0;k<tears;k++)T.push(12+r()*76);T.sort((a,b)=>a-b);
  for(const t of T.reverse()){p.push([0,t+3]);p.push([6+r()*12,t-2.5]);p.push([0,t+.6]);}
  p.push([0,2]);return `polygon(${p.map(([x,y])=>`${(mir?100-x:x).toFixed(1)}% ${y.toFixed(1)}%`).join(',')})`};
const psgLidi=cls=>`<i class="psg-lidi ${cls}"><b></b><b></b></i>`;

FAMILY({key:'pisang',name:'Daun Pisang',meaning:'Banana-leaf parcel',
  blurb:'A cream card wrapped in a folded square of banana leaf and pinned with lidi skewers, lying on batik like a kenduri parcel. The skewers slide out and the leaf opens.',
  fonts:{d:"'IM Fell English SC', serif",s:"'Pinyon Script', cursive",b:"'IM Fell English', serif"},ms:1450,
  page(o,th,L){const c=th.c,en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section style="${pisV(c)}" class="page pg-pisang ${c.dark?'psg-dk':''}"><div class="psg-table"></div><div class="psg-cloth"></div>
      <div class="psg-leaf psg-flat" style="clip-path:${psgCut(41,3)}"></div>
      ${psgLidi('lay a')}${psgLidi('lay b')}
      <div class="psg-card big reveal">
        ${o.bismillah?`<p class="psg-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="psg-k kicker">${ev(o,L)}</p>${psgNames(o)}
        <p class="psg-date"><small>${esc(psgDay(o))}</small>${esc(fmtDate(o.date,o.lang,false))}</p>
        ${o.hijri?`<p class="psg-hj">${esc(o.hijri)}</p>`:''}
        ${t?`<p class="psg-time">${esc(t)}</p>`:''}
        ${o.venue?`<a href="#" class="psg-ven" data-go="loc">${esc(o.venue)}</a>`:''}
        <div class="psg-pills"><a class="psg-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="psg-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div style="${pisV(c)}" class="cover cv-pisang ${c.dark?'psg-dk':''}"><div class="psg-table"></div><div class="psg-cloth"></div>
      <div class="psg-parcel">
        <div class="psg-leaf psg-under" style="clip-path:${psgCut(7,2)}"></div>
        <div class="psg-card"><p class="psg-k">${ev(o,L)}</p>${psgNames(o,'cv')}<p class="psg-date"><small>${esc(psgDay(o))}</small>${esc(fmtDate(o.date,o.lang,false))}</p>${o.venue?`<p class="psg-cven">${esc(o.venue)}</p>`:''}</div>
        ${guest?`<p class="psg-label"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
        <div class="psg-fold l"><div class="psg-leaf" style="clip-path:${psgCut(12,1,1)}"></div></div>
        <div class="psg-fold r"><div class="psg-leaf" style="clip-path:${psgCut(19,1)}"></div></div>
        ${psgLidi('l')}${psgLidi('r')}
      </div>
      <${tag} class="psg-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}>
    </div>`},
  skin(el,o,th,L){K.cards(el);['b0','b1','b2','b3','mid','rib'].forEach(k=>el.style.setProperty('--'+k,th.c[k]));el.classList.toggle('psg-dk',!!th.c.dark);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'kayu',n:'Kayu',desc:'Fresh leaf on batik and dark teak',c:{ground:'#3a2a1f',sheet:'#fbf7ec',ink:'#2d3326',accent:'#2f5a2c',gold:'#a88f5a',pagefg:'#f2ead8',b0:'#1f4a1c',b1:'#2f6a28',b2:'#4f8f3a',b3:'#7db552',rib:'#c9e39a',mid:'#c9dc8e'}},
    {k:'hijau',n:'Hijau',desc:'Glossy young leaf on deep green',c:{ground:'#143022',sheet:'#fcfaf2',ink:'#25322a',accent:'#245a35',gold:'#a8955e',pagefg:'#e9f0e2',b0:'#1a4d22',b1:'#2b6e2e',b2:'#4c9440',b3:'#86c25a',rib:'#d2eaa2',mid:'#d0e396'}},
    {k:'tikar',n:'Tikar',desc:'Kraft-cream card on a pandan mat',c:{ground:'#cdb98f',sheet:'#f6eedb',ink:'#33301f',accent:'#4b6a2a',gold:'#a8854c',pagefg:'#33301f',b0:'#2c5a22',b1:'#3e7a2e',b2:'#62a046',b3:'#9cc866',rib:'#dcefb0',mid:'#d9e7a0'}},
    {k:'putih',n:'Putih',desc:'Cool leaf on white stone',c:{ground:'#e7e5dd',sheet:'#ffffff',ink:'#2a3129',accent:'#2c5a3a',gold:'#9c9473',pagefg:'#2a3129',b0:'#1d4a2a',b1:'#2d6a3a',b2:'#4c8e50',b3:'#84ba72',rib:'#d0e8b6',mid:'#cfe2a8'}},
    {k:'hitam',n:'Hitam',desc:'Dark leaf on black, ivory card',c:{ground:'#141613',sheet:'#f8f3e6',ink:'#2a2d24',accent:'#2c4a24',gold:'#bfa264',pagefg:'#ece6d4',dark:1,b0:'#163d18',b1:'#245c24',b2:'#3f8036',b3:'#6ea84c',rib:'#c4df94',mid:'#c3d68a'}},
    {k:'nila',n:'Nila',desc:'Leaf on an indigo ground',c:{ground:'#1c2a3d',sheet:'#fcfbf5',ink:'#26302c',accent:'#2b5a40',gold:'#a3946a',pagefg:'#e8edf2',b0:'#1a4a2a',b1:'#2a6a38',b2:'#4a8e4c',b3:'#7fbc66',rib:'#cde8aa',mid:'#cce0a0'}},
    {k:'terakota',n:'Terakota',desc:'Leaf on a terracotta ground',c:{ground:'#9c5b3d',sheet:'#fdf9f0',ink:'#30291f',accent:'#3f5a2a',gold:'#b07a4c',pagefg:'#fbefe2',b0:'#22501f',b1:'#336f2b',b2:'#559340',b3:'#8cbe58',rib:'#d4eaa0',mid:'#d3e396'}},
    {k:'sage',n:'Sage',desc:'Pale leaf on a soft sage ground',c:{ground:'#b7c2a6',sheet:'#fdfcf5',ink:'#2c3327',accent:'#3d5a32',gold:'#9a8f62',pagefg:'#24301f',b0:'#2d5a2a',b1:'#40763a',b2:'#64984f',b3:'#9cc276',rib:'#dcefbc',mid:'#d8e8ae'}},
  ]});
