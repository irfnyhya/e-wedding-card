/* renda: a card folded inside a lace handkerchief, the four corners brought to the middle and held with a pearl pin.
   Cover: tap "Buka Jemputan", the pin lifts, the four lace corners fold back and the card comes forward.
   Page: the card lying on the opened handkerchief, lace corners spreading out round it.
   Skin: ivory cards with a scalloped lace edge top and bottom.
   The lace is drawn here: a tulle net, a solid border band with a row of eyelets, a scalloped edge with picots,
   and a cutwork flower spray in each corner. */
needFont('Great+Vibes');
let rdN=0;
const f2=v=>v.toFixed(2);
// one corner of the handkerchief, drawn pointing down in a 200x100 box: base along y=0, tip at (100,TIP)
function rdFlap(lace,u){const TIP=90,W=6.5,n=7,G=15;
  const A=[G,0],T=[100,TIP],B=[200-G,0],cen=[100,TIP*.33];
  // scallops along a->b, bulging away from the middle of the flap; one eyelet per scallop in the band, a picot at each join
  let eyes='',pic='';
  const edge=(a,b,first)=>{let d=first?`M${f2(a[0])} ${f2(a[1])}`:'';const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);
    let nx=-dy/L,ny=dx/L;const mx=(a[0]+b[0])/2-cen[0],my=(a[1]+b[1])/2-cen[1];if(nx*mx+ny*my<0){nx=-nx;ny=-ny}
    for(let i=0;i<n;i++){const t0=i/n,t1=(i+1)/n,tm=(t0+t1)/2,P=t=>[a[0]+dx*t,a[1]+dy*t];const m=P(tm),e=P(t1);
      d+=`Q${f2(m[0]+nx*10)} ${f2(m[1]+ny*10)} ${f2(e[0])} ${f2(e[1])}`;
      eyes+=`<circle cx="${f2(m[0]-nx*3.2)}" cy="${f2(m[1]-ny*3.2)}" r="1.25"/><circle cx="${f2(m[0]+nx*2.4)}" cy="${f2(m[1]+ny*2.4)}" r="1.5"/><circle cx="${f2(m[0]+dx/L*5-nx*3.2)}" cy="${f2(m[1]+dy/L*5-ny*3.2)}" r=".6"/><circle cx="${f2(m[0]-dx/L*5-nx*3.2)}" cy="${f2(m[1]-dy/L*5-ny*3.2)}" r=".6"/>`;
      if(i<n-1)pic+=`<circle cx="${f2(e[0]+nx*1.6)}" cy="${f2(e[1]+ny*1.6)}" r=".8"/>`;pic+=`<circle cx="${f2(m[0]+nx*10.6)}" cy="${f2(m[1]+ny*10.6)}" r=".7"/>`}
    return d};
  const outline=edge(B,T,true)+edge(T,A,false)+'Z';
  // the inner edge of the band: the triangle pulled in by W
  const off=(P,Q)=>{const dx=Q[0]-P[0],dy=Q[1]-P[1],L=Math.hypot(dx,dy);let nx=-dy/L,ny=dx/L;if(nx*(cen[0]-P[0])+ny*(cen[1]-P[1])<0){nx=-nx;ny=-ny}return[[P[0]+nx*W,P[1]+ny*W],[dx,dy]]};
  const x0=([p,d])=>p[0]-d[0]*p[1]/d[1],[l1,l2]=[off(A,T),off(T,B)];
  const t=((l2[0][0]-l1[0][0])*l2[1][1]-(l2[0][1]-l1[0][1])*l2[1][0])/(l1[1][0]*l2[1][1]-l1[1][1]*l2[1][0]),ap=[l1[0][0]+l1[1][0]*t,l1[0][1]+l1[1][1]*t];
  const inner=`M${f2(x0(l1))} 0L${f2(ap[0])} ${f2(ap[1])}L${f2(x0(l2))} 0Z`;
  // a cutwork petal: solid with a slit of net showing inside
  const petal=(x,y,r,s)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0 0C4.5-3 4.6-10 0-14C-4.6-10-4.5-3 0 0ZM0-3.2C1.6-5 1.6-8.6 0-10.6C-1.6-8.6-1.6-5 0-3.2Z" fill-rule="evenodd"/></g>`;
  const leaf=(x,y,r,s)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0 0C3-2 7-2 11 0C7 2 3 2 0 0Z"/><path d="M1 0H9" stroke="rgba(0,0,0,.18)" stroke-width=".35" fill="none"/></g>`;
  const flower=(x,y,s)=>`${[0,60,120,180,240,300].map(r=>petal(x,y,r,s)).join('')}<circle cx="${x}" cy="${y}" r="${2.2*s}" fill="none" stroke="${lace}" stroke-width="${1.4*s}"/>`;
  const spray=`<path d="M100 40C88 34 76 30 62 31M100 40C112 34 124 30 138 31M100 40C96 48 98 56 100 62" fill="none" stroke="${lace}" stroke-width=".9"/>
    ${leaf(86,35,200,1)}${leaf(74,31.5,190,.9)}${leaf(114,35,-20,1)}${leaf(126,31.5,-10,.9)}${leaf(99,52,95,.8)}
    ${flower(100,30,1.05)}${flower(60,31,.55)}${flower(140,31,.55)}
    ${[[52,22],[148,22],[84,58],[116,58],[100,70]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.1"/><circle cx="${x+2.6}" cy="${y+1.4}" r=".7"/><circle cx="${x-2.6}" cy="${y+1.4}" r=".7"/>`).join('')}`;
  return `<defs><clipPath id="rdc${u}"><path d="${outline}"/></clipPath>
    <pattern id="rdt${u}" width="3.6" height="6.24" patternUnits="userSpaceOnUse"><path d="M0 0L1.8 1.04V3.12L0 4.16M1.8 1.04L3.6 0M1.8 3.12L3.6 4.16M0 4.16V6.24M3.6 4.16V6.24" fill="none" stroke="${lace}" stroke-width=".38" opacity=".95"/></pattern>
    <mask id="rdm${u}"><path d="${outline}" fill="#fff"/><path d="${inner}" fill="#000"/><g fill="#000">${eyes}</g></mask></defs>
    <g clip-path="url(#rdc${u})"><rect width="200" height="100" fill="url(#rdt${u})"/></g>
    <rect width="200" height="100" fill="${lace}" mask="url(#rdm${u})"/>
    <path d="${inner}" fill="none" stroke="rgba(0,0,0,.16)" stroke-width=".5"/>
    <path d="${outline}" fill="none" stroke="rgba(0,0,0,.14)" stroke-width=".45"/>
    <g fill="${lace}">${pic}</g>
    <g fill="${lace}" stroke="rgba(0,0,0,.16)" stroke-width=".3">${spray}</g>
    <path d="M${G} .8H${200-G}" stroke="${lace}" stroke-width="1.6"/>`}
// four corners folded to the middle of a square, each its own layer so it can fold back
const rdPacket=(c)=>{const u=++rdN;const g=(r,i)=>`<svg class="rd-flap rd-f${i}" viewBox="0 0 200 200" ${NS}><g transform="rotate(${r} 100 100)">${rdFlap(c.lace,u+'_'+i)}</g></svg>`;
  return g(180,2)+g(90,3)+g(-90,4)+g(0,1)};
const rdOpen=(c)=>{const u=++rdN;return [1,2].map(i=>`<svg class="rd-op rd-o${i}" viewBox="0 0 200 100" ${NS}>${rdFlap(c.lace,u+'_'+i)}</svg>`).join('')+
  [3,4].map(i=>`<svg class="rd-op rd-o${i}" viewBox="0 0 100 200" ${NS} preserveAspectRatio="xMinYMid meet"><g transform="translate(0 200) rotate(-90)">${rdFlap(c.lace,u+'_'+i)}</g></svg>`).join('')};
const rdGo=(el)=>{const sc=$('.scroller',el);
  $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))};
// a scalloped lace edging for the section cards
const rdStrip=lace=>{const h=(x,y,r)=>`M${x-r} ${y}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0Z`;
  return K.uri(`<svg ${NS} width="24" height="12" viewBox="0 0 24 12"><path fill-rule="evenodd" fill="${lace}" d="M0 0H24V4Q18 12.5 12 4Q6 12.5 0 4Z${h(6,6.4,1.5)}${h(18,6.4,1.5)}${h(3,2,.6)}${h(9,2,.6)}${h(15,2,.6)}${h(21,2,.6)}"/><circle cx="12" cy="5.6" r=".8" fill="${lace}"/><circle cx="0" cy="5.6" r=".8" fill="${lace}"/><circle cx="24" cy="5.6" r=".8" fill="${lace}"/></svg>`)};
FAMILY({key:'renda',name:'Sapu Tangan Renda',meaning:'Lace handkerchief',
  blurb:'Your card folded inside a lace handkerchief and held with a pearl pin. The four lace corners fold back to open it.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<section class="page pg-renda2" style="--lace:${c.lace};--card:${c.card}"><div class="rd-silk"></div>
      <div class="rd-sheet reveal">${rdOpen(c)}<div class="rd-paper">
        <p class="rd-k kicker">${ev(o,L)}</p>
        <h1 class="rd-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="rd-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="rd-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="rd-ven">${esc(o.venue)}</p>`:''}
        <a class="rd-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<div class="cover cv-renda2" style="--lace:${c.lace};--card:${c.card}"><div class="rd-silk"></div>
      <div class="rd-top"><p class="rd-k">${ev(o,L)}</p><p class="rd-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="rd-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
      <div class="rd-pack"><div class="rd-card"></div>${rdPacket(c)}<i class="rd-pin"></i></div>
      <div class="rd-foot">${guest?`<p class="rd-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="rd-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--rdstrip',rdStrip(th.c.lace));rdGo(el)},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory lace on sage silk',c:{ground:'#b7c0a6',sheet:'#fdfbf4',lace:'#fffdf6',ink:'#2f322b',accent:'#4f5d47',gold:'#a8935e',pagefg:'#2c3327',card:'#56664c'}},
    {k:'putih',n:'Putih',desc:'White lace on cornflower silk',c:{ground:'#5f7898',sheet:'#fcfcfb',lace:'#ffffff',ink:'#2b3038',accent:'#2d4b78',gold:'#b29a66',pagefg:'#ffffff',card:'#2d4670'}},
    {k:'marun',n:'Marun',desc:'Cream lace on maroon silk',c:{ground:'#4e1624',sheet:'#fbf6ec',lace:'#f6eddc',ink:'#33292a',accent:'#6a1f30',gold:'#b8955e',pagefg:'#f6ecdf',card:'#7a2a3c'}},
    {k:'jambu',n:'Jambu',desc:'White lace on blush silk',c:{ground:'#e6c3be',sheet:'#fffaf7',lace:'#ffffff',ink:'#3a2d30',accent:'#9c4a5a',gold:'#b49064',pagefg:'#4a2e36',card:'#a8606c'}},
    {k:'hitam',n:'Hitam',desc:'Ivory lace on black silk',c:{ground:'#171616',sheet:'#fbf7ef',lace:'#efe6d4',ink:'#2c2826',accent:'#3a2c20',gold:'#b49a62',pagefg:'#efe6d4',card:'#2a2624'}},
    {k:'zaitun',n:'Zaitun',desc:'Cream lace on olive silk',c:{ground:'#5d6a37',sheet:'#fbf8ee',lace:'#f6efdc',ink:'#2f3226',accent:'#4a5530',gold:'#b49a5a',pagefg:'#f4efdc',card:'#4a5530'}},
    {k:'pandan',n:'Pandan',desc:'Cream lace on pandan-green silk',c:{ground:'#2f5a3e',sheet:'#fdfbf3',lace:'#f6f1e2',ink:'#25302a',accent:'#0d4a32',gold:'#c6a44e',pagefg:'#f3f0e0',card:'#1d5a3e'}},
    {k:'kopi',n:'Kopi Susu',desc:'Cream lace on milky-coffee silk',c:{ground:'#c6a684',sheet:'#fffcf6',lace:'#fbf5ea',ink:'#33291f',accent:'#6b4a3a',gold:'#a8875a',pagefg:'#3a2a20',card:'#7a5442'}},
    {k:'hujan',n:'Biru Hujan',desc:'Pearl lace on rain-blue silk',c:{ground:'#5c7690',sheet:'#fcfcfa',lace:'#f6f7f8',ink:'#2a3038',accent:'#3a5570',gold:'#aea58c',pagefg:'#f4f6f8',card:'#3a5570'}},
    {k:'fajar',n:'Fajar',desc:'Ivory lace on dawn-rose silk',c:{ground:'#c9667e',sheet:'#fffaf6',lace:'#fff6ef',ink:'#3a2a2e',accent:'#a3465f',gold:'#c89a6a',pagefg:'#fff6f0',card:'#8e3550'}},
  ]});
