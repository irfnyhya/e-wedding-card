/* kolam: Monet's water-lily pond (public domain, 1906) with a blush envelope standing open on it; a lace doily card waits inside.
   Cover: tap "Buka Jemputan", the envelope sinks away and the lace card rises and grows to fill the screen.
   Page: the lace card over the pond. Skin: lace-edged cards floating over the painting. */
// a doily: rectangle with scalloped edges and an eyelet in every scallop, holes cut with evenodd
function kolamLace(w,h,n,c,uid){const d=6,r=1.5;let p='',holes='';
  const side=(ax,ay,bx,by,k)=>{const nx=(by-ay),ny=-(bx-ax),L=Math.hypot(nx,ny),ox=nx/L,oy=ny/L;let s='';
    for(let i=0;i<k;i++){const t0=i/k,t1=(i+1)/k,tm=(t0+t1)/2,X=t=>ax+(bx-ax)*t,Y=t=>ay+(by-ay)*t;
      s+=`Q${(X(tm)+ox*d*1.9).toFixed(2)} ${(Y(tm)+oy*d*1.9).toFixed(2)} ${X(t1).toFixed(2)} ${Y(t1).toFixed(2)}`;
      const hx=X(tm)+ox*d*.42,hy=Y(tm)+oy*d*.42;holes+=`M${(hx-r).toFixed(2)} ${hy.toFixed(2)}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0Z`}return s};
  const kx=n,ky=Math.round(n*h/w);
  p=`M${d} ${d}`+side(d,d,w-d,d,kx)+side(w-d,d,w-d,h-d,ky)+side(w-d,h-d,d,h-d,kx)+side(d,h-d,d,d,ky)+'Z';
  // a second ring of tiny holes just inside the edge
  let ring='';const g=11,s0=d+7;for(let x=s0;x<=w-s0+.1;x+=(w-2*s0)/Math.round((w-2*s0)/g)){ring+=`M${(x-.8).toFixed(2)} ${s0}a.8 .8 0 1 0 1.6 0a.8 .8 0 1 0 -1.6 0ZM${(x-.8).toFixed(2)} ${h-s0}a.8 .8 0 1 0 1.6 0a.8 .8 0 1 0 -1.6 0Z`}
  for(let y=s0;y<=h-s0+.1;y+=(h-2*s0)/Math.round((h-2*s0)/g)){ring+=`M${s0-.8} ${y.toFixed(2)}a.8 .8 0 1 0 1.6 0a.8 .8 0 1 0 -1.6 0ZM${w-s0-.8} ${y.toFixed(2)}a.8 .8 0 1 0 1.6 0a.8 .8 0 1 0 -1.6 0Z`}
  return `<svg class="klm-lace" viewBox="-4 -4 ${w+8} ${h+8}" preserveAspectRatio="none"><defs><filter id="kn${uid}"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="${uid}"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .07 0"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>
    <path d="${p}${holes}${ring}" style="fill:${c.lace}" fill-rule="evenodd"/><path d="${p}" fill="#000" filter="url(#kn${uid})" opacity=".8"/>
    <rect x="${d+12}" y="${d+12}" width="${w-2*d-24}" height="${h-2*d-24}" fill="none" style="stroke:${c.accent}" stroke-width=".5" stroke-dasharray="1.6 1.6" opacity=".55"/></svg>`}
let kn=0;
const klCard=(o,L,big)=>{const [n1,n2]=coverNames(o);return `<div class="klm-doily${big?' big':''}">${kolamLace(200,big?280:190,big?15:13,{lace:'var(--sheet)',accent:'var(--accent)'},++kn)}
  <div class="klm-txt"><p class="klm-k kicker">${ev(o,L)}</p><p class="klm-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="klm-date">${esc(fmtDate(o.date,o.lang))}</p>${big&&o.venue?`<p class="klm-ven">${esc(o.venue)}</p>`:''}</div></div>`};
FAMILY({key:'kolam',name:'Kolam',meaning:'Lily pond',
  blurb:'A blush envelope standing open on Monet’s water-lily pond, with a lace doily card inside that rises out when guests open it.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const en=o.lang==='en';return `<section class="page pg-kolam"><div class="klm-paint"></div><div class="klm-veil"></div>
    <div class="reveal">${klCard(o,L,true)}</div>
    <a class="klm-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-kolam"><div class="klm-paint"></div><div class="klm-veil"></div>
    ${guest?`<p class="klm-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
    <div class="klm-stage"><div class="klm-env klm-rear"><div class="klm-flap"></div><div class="klm-back"></div></div><div class="klm-in">${klCard(o,L,false)}</div><div class="klm-env klm-front"><div class="klm-pocket"></div><i class="klm-pearl"></i></div></div>
    <${tag} class="klm-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Blush envelope on the lily pond',c:{ground:'#9fb3c9',sheet:'#fffaf5',ink:'#3b2c33',accent:'#8c4f63',gold:'#b89a6a',pagefg:'#ffffff',env:'#e7c3c6'}},
    {k:'lavender',n:'Lavender',desc:'Lilac envelope on the lily pond',c:{ground:'#a3acc8',sheet:'#fdfbff',ink:'#33304a',accent:'#6d5c93',gold:'#a99872',pagefg:'#ffffff',env:'#cbbfe0'}},
    {k:'sage',n:'Sage',desc:'Sage envelope on the lily pond',c:{ground:'#9db3a9',sheet:'#fbfcf7',ink:'#2d352e',accent:'#56704f',gold:'#a8955f',pagefg:'#ffffff',env:'#b7c7ad'}},
    {k:'biru',n:'Biru',desc:'Powder blue envelope on the lily pond',c:{ground:'#93a9c4',sheet:'#fbfdff',ink:'#26324a',accent:'#3f5f8c',gold:'#b49a62',pagefg:'#ffffff',env:'#b9cde3'}},
    {k:'pic',n:'Pic',desc:'Peach envelope on the lily pond',c:{ground:'#a8b4c4',sheet:'#fffaf4',ink:'#3a2c26',accent:'#a5604a',gold:'#bf9a62',pagefg:'#ffffff',env:'#f0cdb6'}},
    {k:'gading',n:'Gading',desc:'Ivory envelope on the lily pond',c:{ground:'#a9b6c4',sheet:'#ffffff',ink:'#2f2b28',accent:'#6e5a3e',gold:'#b29a6a',pagefg:'#ffffff',env:'#f3ece0'}},
    {k:'marun',n:'Marun',desc:'Wine envelope on the lily pond',c:{ground:'#7e8fa8',sheet:'#fffaf6',ink:'#341d24',accent:'#7a2638',gold:'#b8955e',pagefg:'#ffffff',env:'#8e3b4b'}},
    {k:'zamrud',n:'Zamrud',desc:'Deep green envelope on the lily pond',c:{ground:'#7f998f',sheet:'#fbfcf6',ink:'#22301f',accent:'#2f5a3a',gold:'#b49a5e',pagefg:'#ffffff',env:'#3f6b4b'}},
  ]});
