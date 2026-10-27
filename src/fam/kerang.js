/* kerang: a scallop shell die-cut from thick cotton paper, its ribs and growth lines blind-debossed and finely engraved,
   lying on linen beside a single pearl. Cover: tap "Buka Jemputan" and the shell opens on its hinge to show the
   nacre inside, then the scene fades. Page: the open shell with its pearl resting on the corner of the card, a seed-pearl necklace (Met Museum, public domain) beside it.
   Skin: paper cards with a scalloped top edge and engraved headings. */
needFont('Mrs+Saint+Delafield');
let keU=0;
const kq=v=>(+v).toFixed(2);
// shell geometry (200 x 200): disc centred (100,98) r 86, ears at the hinge, ribs fanning from the hinge
const KE=(()=>{const N=18,cx=100,cy=98,R=86,hx=100,hy=188,a0=-142,a1=142,P=a=>[cx+R*Math.sin(a*Math.PI/180),cy-R*Math.cos(a*Math.PI/180)];
  const tips=Array.from({length:N+1},(_,i)=>P(a0+(a1-a0)*i/N));
  let edge='';tips.forEach((p,i)=>{if(!i){edge+=`M${kq(p[0])} ${kq(p[1])}`;return}
    const q=tips[i-1],m=P(a0+(a1-a0)*(i-.5)/N),ox=(m[0]-cx)/R*5.5,oy=(m[1]-cy)/R*5.5;edge+=`Q${kq(m[0]+ox)} ${kq(m[1]+oy)} ${kq(p[0])} ${kq(p[1])}`});
  const [rx,ry]=tips[N],[lx,ly]=tips[0];
  const outline=edge+`L${kq(rx+3)} ${kq(ry+3)}L152 176L154 193Q100 197 46 193L48 176L${kq(lx-3)} ${kq(ly+3)}Z`;
  const ribs=Array.from({length:N},(_,i)=>P(a0+(a1-a0)*(i+.5)/N)).map(p=>[p[0]+(p[0]-cx)/R*3,p[1]+(p[1]-cy)/R*3]);
  return {outline,ribs,hx,hy,N}})();
// the shell as a paper object; inner=true draws the inside of the lower valve (nacre)
function keShell(inner,cls=''){const u=++keU,{outline,ribs,hx,hy}=KE;
  const rib=ribs.map(([x,y])=>`M${hx} ${hy}L${kq(x)} ${kq(y)}`).join('');
  const growth=[34,58,82,104,124,142].map(r=>`<circle cx="${hx}" cy="${hy}" r="${r}"/>`).join('');
  const ear=Array.from({length:9},(_,i)=>`M${54+i*4.6} 180V192M${109+i*4.6} 180V192`).join('');
  if(inner)return `<svg class="ke-shell ke-in ${cls}" viewBox="0 0 200 200" aria-hidden="true"><defs><clipPath id="kc${u}"><path d="${outline}"/></clipPath>
      <radialGradient id="kn${u}" cx=".45" cy=".42" r=".7"><stop offset="0" style="stop-color:var(--nac1)"/><stop offset=".6" style="stop-color:var(--nac2)"/><stop offset="1" style="stop-color:var(--shellD)"/></radialGradient>
      <linearGradient id="ki${u}" x1="0" y1="0" x2="1" y2=".6"><stop offset="0" stop-color="#ffd9e6" stop-opacity=".0"/><stop offset=".35" stop-color="#ffe0ec" stop-opacity=".45"/><stop offset=".55" stop-color="#d8f0f0" stop-opacity=".4"/><stop offset=".8" stop-color="#e8e0ff" stop-opacity=".35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <path d="${outline}" style="fill:var(--shell)"/>
    <g clip-path="url(#kc${u})"><path d="${outline}" fill="url(#kn${u})" transform="translate(100 104) scale(.9) translate(-100 -104)"/>
      <path d="${outline}" fill="url(#ki${u})" transform="translate(100 104) scale(.9) translate(-100 -104)" style="mix-blend-mode:soft-light"/>
      <path d="${rib}" stroke="rgba(120,90,80,.22)" stroke-width="2.6" fill="none" filter="url(#kbl)"/>
      <path d="${rib}" stroke="rgba(255,255,255,.5)" stroke-width=".7" fill="none" transform="translate(-.8 0)"/></g>
    <path d="${outline}" fill="none" style="stroke:var(--shellD)" stroke-width=".8"/></svg>`;
  return `<svg class="ke-shell ${cls}" viewBox="0 0 200 200" aria-hidden="true"><defs><clipPath id="kc${u}"><path d="${outline}"/></clipPath>
      <linearGradient id="kl${u}" x1=".1" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#3a2a20" stop-opacity=".2"/></linearGradient>
      <pattern id="kh${u}" width="2.2" height="2.2" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><path d="M0 0V2.2" style="stroke:var(--eng)" stroke-width=".35"/></pattern></defs>
    <path d="${outline}" style="fill:var(--shell)"/>
    <g clip-path="url(#kc${u})">
      <image href="${A}paper.jpg" x="-20" y="-20" width="240" height="240" preserveAspectRatio="xMidYMid slice" style="mix-blend-mode:multiply" opacity=".55"/>
      <path d="M100 188L210 60V210H100Z" fill="url(#kh${u})" opacity=".35"/>
      <g fill="none" style="stroke:var(--eng)" stroke-width=".35" opacity=".5" stroke-dasharray="1.6 1.1">${growth}</g>
      <path d="${rib}" stroke="rgba(60,40,30,.16)" stroke-width="6" fill="none" transform="translate(2.2 1.2)" filter="url(#kbl)"/>
      <path d="${rib}" stroke="rgba(255,255,255,.75)" stroke-width="3.4" fill="none" transform="translate(-1.2 -.6)" filter="url(#kbl)"/>
      <path d="${rib}" stroke="rgba(60,40,30,.28)" stroke-width="1.5" fill="none" transform="translate(.9 .5)"/>
      <path d="${rib}" stroke="rgba(255,255,255,.85)" stroke-width="1.1" fill="none" transform="translate(-.7 -.3)"/>
      <path d="${rib}" style="stroke:var(--eng)" stroke-width=".4" fill="none" opacity=".75"/>
      <path d="${ear}" style="stroke:var(--eng)" stroke-width=".35" opacity=".55"/>
      <path d="M48 177Q100 171 152 177" fill="none" stroke="rgba(60,40,30,.25)" stroke-width="1"/><path d="M48 176Q100 170 152 176" fill="none" stroke="rgba(255,255,255,.8)" stroke-width=".7"/>
      <rect width="200" height="200" fill="url(#kl${u})"/></g>
    <path d="${outline}" fill="none" stroke="rgba(60,40,30,.35)" stroke-width=".6"/></svg>`}
const kePearl=(cls='',style='')=>`<i class="ke-pearl ${cls}" style="${style}"></i>`;
const keVars=c=>`--shell:${c.shell};--shellD:${c.shellD};--nac1:${c.nacre1};--nac2:${c.nacre2};--p1:${c.pearl1};--p2:${c.pearl2};--p3:${c.pearl3};--eng:${c.eng||c.accent};--nm:${c.nm};--btn:${c.dark?'rgba(0,0,0,.3)':'rgba(255,255,255,.4)'}`;
const KBL=`<svg width="0" height="0" style="position:absolute"><filter id="kbl"><feGaussianBlur stdDeviation="1.2"/></filter></svg>`;
FAMILY({key:'kerang',name:'Kerang',meaning:'Seashell and pearl',
  blurb:'A scallop shell die-cut from thick cotton paper, its ribs pressed and engraved, lying on linen beside a pearl. Open it and the shell parts on its hinge to show the nacre.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Mrs Saint Delafield', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-kerang2${c.dark?' ke-dark':''}" style="${keVars(c)}">${KBL}<div class="ke-linen"></div>
      <div class="ke-pcard reveal"><div class="ke-pobj">${keShell(true)}${kePearl('ke-ppearl')}</div><div class="ke-ci">
        <p class="ke-k kicker">${ev(o,L)}</p><h1 class="ke-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="ke-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="ke-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<a class="ke-ven" data-go="loc" href="#">${esc(o.venue)}</a>`:''}</div></div>
      <img class="ke-neck" src="${A}pd-obj-pearls.webp" alt=""><div class="ke-links reveal d2"><a data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-kerang2${c.dark?' ke-dark':''}" style="${keVars(c)}">${KBL}<div class="ke-linen"></div>
      <div class="ke-top"><p class="ke-k">${ev(o,L)}</p><p class="ke-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="ke-d">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
      <div class="ke-obj"><div class="ke-low">${keShell(true)}${kePearl('ke-inpearl')}</div><div class="ke-up">${keShell(false)}</div>${kePearl('ke-loose')}</div>
      <div class="ke-foot">${guest?`<p class="ke-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="ke-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('ke-dark',!!c.dark);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'mutiara',n:'Mutiara',desc:'Ivory shell and pearl on sand linen',c:{ground:'#e9dfcf',sheet:'#fcf9f4',ink:'#4a4038',accent:'#7a5a50',gold:'#b5986a',pagefg:'#4a4038',nm:'#6e5048',shell:'#f8f1e6',shellD:'#c9ab98',nacre1:'#f6ece8',nacre2:'#dccbd0',pearl1:'#fbf6f1',pearl2:'#e6dcd6',pearl3:'#b8aaa4'}},
    {k:'laut',n:'Laut',desc:'Ivory shell on pale linen, sea-blue ink',c:{ground:'#e3ded2',sheet:'#fbfaf6',ink:'#2f3d45',accent:'#2e5b6e',gold:'#a8956a',pagefg:'#2f3d45',nm:'#2e5b6e',shell:'#f7f3ea',shellD:'#bfa892',nacre1:'#eef2f2',nacre2:'#cfd8dc',pearl1:'#f8f8f6',pearl2:'#dfe2e2',pearl3:'#a7aeb2'}},
    {k:'jambu',n:'Jambu',desc:'Blush shell on pink linen',c:{ground:'#eedbd2',sheet:'#fdf8f5',ink:'#4a3434',accent:'#9a5462',gold:'#b58d6a',pagefg:'#4a3434',nm:'#8e4a58',shell:'#fbeee8',shellD:'#d4a49a',nacre1:'#fbecec',nacre2:'#e8c8cc',pearl1:'#fff6f4',pearl2:'#efdcdc',pearl3:'#c4a8aa'}},
    {k:'emas',n:'Emas',desc:'Cream shell on golden sand linen',c:{ground:'#e3cfaa',sheet:'#fcf6ea',ink:'#463822',accent:'#7a5a26',gold:'#b08a42',pagefg:'#463822',nm:'#6e5020',shell:'#faf2e2',shellD:'#c4a274',nacre1:'#f8f0e2',nacre2:'#e2cfb0',pearl1:'#fffaf0',pearl2:'#ece0c8',pearl3:'#bba684'}},
    {k:'hijau',n:'Buih Laut',desc:'Ivory shell on seafoam linen',c:{ground:'#dbe3d8',sheet:'#fafbf7',ink:'#2f3d36',accent:'#3d6656',gold:'#a8966a',pagefg:'#2f3d36',nm:'#3d6656',shell:'#f6f3ea',shellD:'#b6a890',nacre1:'#eef4f0',nacre2:'#d0dcd6',pearl1:'#f9faf7',pearl2:'#e0e4df',pearl3:'#a9b0aa'}},
    {k:'ungu',n:'Ungu',desc:'Pale shell on lilac linen',c:{ground:'#e2dae3',sheet:'#fbf8fb',ink:'#3e3446',accent:'#6a4e7a',gold:'#a8936e',pagefg:'#3e3446',nm:'#6a4e7a',shell:'#f7f0f2',shellD:'#c0a6b0',nacre1:'#f3ecf4',nacre2:'#d8cadc',pearl1:'#fbf8fb',pearl2:'#e6dde8',pearl3:'#aea0b4'}},
    {k:'malam',n:'Malam',desc:'White shell on a night-blue cloth',c:{ground:'#1c2732',sheet:'#f8f6f2',ink:'#2e3640',accent:'#3f5468',gold:'#c4ad80',pagefg:'#e8e4dc',dark:1,nm:'#f0e8dc',shell:'#f2eee8',shellD:'#a89c94',nacre1:'#eef0f2',nacre2:'#c8ccd4',pearl1:'#ffffff',pearl2:'#e2e4e8',pearl3:'#9ca2ac',eng:'#5a6878'}},
    {k:'nila',n:'Nila',desc:'Cream shell on deep indigo cloth',c:{ground:'#17243e',sheet:'#fbf8f2',ink:'#27304a',accent:'#2e3f6e',gold:'#c8a868',pagefg:'#ece6da',dark:1,nm:'#f2e6d2',shell:'#f6efe4',shellD:'#b39d84',nacre1:'#f4eee8',nacre2:'#d6ccc8',pearl1:'#fffdf8',pearl2:'#e9e2d8',pearl3:'#aaa094',eng:'#5a5470'}},
  ]});
