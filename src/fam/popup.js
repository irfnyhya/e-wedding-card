/* popup: a pop-up paper card of a domed pavilion (onion dome, chhatri, pointed arches, jali cutwork), minarets and a
   garden, cut from layered coloured card with gold-foil linework.
   Cover: the card lies open flat on the table. Opening: the back folds up and the layers rise one behind the other
   (rotateX), the view coming down to eye level. Page: the pavilion standing. Skin: layered paper-cut arch frames. */
let uid=0;
const arch=(x0,x1,yt,yb)=>{const xm=(x0+x1)/2,ys=yt+(x1-x0)*.55;return `M${x0} ${yb}V${ys}Q${x0} ${yt+(x1-x0)*.12} ${xm} ${yt}Q${x1} ${yt+(x1-x0)*.12} ${x1} ${ys}V${yb}Z`};
const dome=(cx,w,yb,h)=>`M${cx-w/2} ${yb}C${cx-w*.85} ${yb-h*.45} ${cx-w*.3} ${yb-h*.72} ${cx} ${yb-h}C${cx+w*.3} ${yb-h*.72} ${cx+w*.85} ${yb-h*.45} ${cx+w/2} ${yb}Z`;
// the pavilion layer, 300x300, base at the bottom
function pavilion(c,id){const g=c.gold;let jali='';for(let r=0;r<4;r++)for(let i=-r;i<=r;i++){const x=150+i*11-(r%2?0:0),y=68+r*13;if(Math.abs(i)*11<14+r*12)jali+=`<path d="M${x} ${y-4}l3 4-3 4-3-4z"/>`}
  let scal='';for(let x=56;x<=244;x+=8)scal+=`<circle cx="${x}" cy="176" r="4"/>`;
  const holes=`<g fill="#000">${arch(122,178,192,281)}${arch(74,112,206,281)}${arch(188,226,206,281)}${jali}${[105,125,175,195].map(x=>`<circle cx="${x}" cy="146" r="3.2"/>`).join('')}<path d="${arch(144,156,118,138)}"/>${Array.from({length:11},(_,i)=>`<path d="M${72+i*15.6} 181l2.4 3-2.4 3-2.4-3z"/>`).join('')}${[86,214].map(x=>`<path d="${arch(x-5,x+5,226,250)}" transform="translate(0 0)"/>`).join('')}</g>`;
  const solid=`<rect x="36" y="281" width="228" height="19"/><rect x="58" y="172" width="184" height="110"/><rect x="48" y="160" width="204" height="14" rx="2"/>${scal}
   <rect x="92" y="128" width="116" height="33"/><path d="${dome(150,124,132,98)}"/><rect x="148.6" y="10" width="2.8" height="26"/><circle cx="150" cy="30" r="4"/><circle cx="150" cy="19" r="2.6"/>
   ${[62,238].map(x=>`<path d="${dome(x,28,162,30)}"/><rect x="${x-1}" y="122" width="2" height="12"/><rect x="${x-12}" y="160" width="24" height="4"/>`).join('')}`;
  const lines=`<g fill="none" stroke="${g}" stroke-width=".9"><path d="${arch(118,182,186,281)}"/><path d="${arch(70,116,200,281)}"/><path d="${arch(184,230,200,281)}"/>
   <path d="M58 172H242M48 160H252M92 128H208M36 281H264M40 290H260"/><path d="${dome(150,112,130,88)}" stroke-dasharray="1 2.5"/>
   ${[66,118,182,234].map(x=>`<path d="M${x} 176V281"/>`).join('')}<path d="M100 140H200" stroke-dasharray="2 3"/></g>`;
  return `<svg viewBox="0 0 300 300"><defs><mask id="pm${id}"><rect width="300" height="300" fill="#fff"/>${holes}</mask></defs><g fill="${c.p2}" mask="url(#pm${id})">${solid}</g>${lines}
   <g mask="url(#pm${id})"><rect x="58" y="172" width="184" height="110" fill="url(#ps${id})"/></g><linearGradient id="ps${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></svg>`}
// minarets and a balustrade, 300x200
function minarets(c,id){const g=c.gold;const tower=x=>`<rect x="${x-9}" y="64" width="18" height="136"/><rect x="${x-14}" y="92" width="28" height="7" rx="1.5"/><rect x="${x-12}" y="60" width="24" height="6"/><path d="${dome(x,22,62,26)}"/><rect x="${x-.9}" y="20" width="1.8" height="18"/><circle cx="${x}" cy="24" r="2.4"/>`;
  let bal='';for(let x=86;x<214;x+=13)bal+=`<path d="${arch(x,x+8,170,194)}"/>`;
  return `<svg viewBox="0 0 300 200"><defs><mask id="mm${id}"><rect width="300" height="200" fill="#fff"/><g fill="#000">${bal}${[40,260].map(x=>`<path d="${arch(x-4,x+4,110,128)}"/><path d="${arch(x-4,x+4,140,158)}"/>`).join('')}</g></mask></defs>
   <g fill="${c.p3}" mask="url(#mm${id})">${tower(40)}${tower(260)}<rect x="74" y="160" width="152" height="40"/><rect x="70" y="156" width="160" height="6" rx="2"/>${[74,226].map(x=>`<rect x="${x-5}" y="148" width="10" height="52"/><circle cx="${x}" cy="146" r="5"/>`).join('')}</g>
   <g fill="none" stroke="${g}" stroke-width=".8"><path d="M31 99H49M251 99H269M31 64V200M49 64V200M251 64V200M269 64V200M70 162H230M74 196H226"/></g></svg>`}
// garden: leaves and five-petal flowers, 300x90
function garden(c,id){const r=rng(31+id);let s='';
  for(let i=0;i<34;i++){const x=r()*300,y=50+r()*36,a=-70+r()*140,L=14+r()*16;s+=`<path d="M0 0C${L*.35} ${-L*.3} ${L*.65} ${-L*.3} ${L} 0C${L*.65} ${L*.3} ${L*.35} ${L*.3} 0 0Z" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(a-90).toFixed(0)})" fill="${c.p4}"/>`}
  let fl='';for(let i=0;i<9;i++){const x=16+i*34+r()*8,y=44+r()*22;for(let k=0;k<5;k++)fl+=`<ellipse cx="${x}" cy="${y-4.5}" rx="2.6" ry="4.4" transform="rotate(${k*72} ${x} ${y})" fill="${c.p5}"/>`;fl+=`<circle cx="${x}" cy="${y}" r="1.8" fill="${c.gold}"/>`}
  return `<svg viewBox="0 0 300 90"><rect x="0" y="80" width="300" height="10" fill="${c.p4}"/>${s}${fl}<path d="M0 89H300" stroke="${c.gold}" stroke-width=".8"/></svg>`}
// printed back panel: stars and a lattice band in gold
function backArt(c,id){let st='';const r=rng(9+id);for(let i=0;i<30;i++){const x=r()*300,y=r()*180,s=.5+r()*1.4;st+=`<path d="M${x.toFixed(1)} ${(y-s*2.4).toFixed(1)}l${(s*.6).toFixed(2)} ${(s*1.8).toFixed(2)} ${(s*1.8).toFixed(2)} ${(s*.6).toFixed(2)}-${(s*1.8).toFixed(2)} ${(s*.6).toFixed(2)}-${(s*.6).toFixed(2)} ${(s*1.8).toFixed(2)}-${(s*.6).toFixed(2)}-${(s*1.8).toFixed(2)}-${(s*1.8).toFixed(2)}-${(s*.6).toFixed(2)} ${(s*1.8).toFixed(2)}-${(s*.6).toFixed(2)}z"/>`}
  return `<svg viewBox="0 0 300 330" preserveAspectRatio="none"><g fill="${c.gold}" opacity=".85">${st}</g>
   <path d="${arch(30,270,30,330)}" fill="none" stroke="${c.gold}" stroke-width="1.1"/><path d="${arch(38,262,40,330)}" fill="none" stroke="${c.gold}" stroke-width=".5"/>
   <circle cx="236" cy="62" r="13" fill="${c.p2}" opacity=".9"/><circle cx="242" cy="58" r="12" fill="${c.p1}"/></svg>`}
const ARCHF=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M0 40V22Q0 4 50 0Q100 4 100 22V40Z"/></svg>`);
FAMILY({key:'popup',name:'Pop-up',meaning:'Pop-up card',
  blurb:'A paper pop-up of a domed pavilion lying open on the table; touch it and the layers rise.',
  fonts:{d:"'Marcellus', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1600,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    return `<section class="page pg-popup" style="${pv(c)}"><div class="pp-bg"></div>
     <div class="pp-pcard reveal"><span class="pp-pback">${backArt(c,'p'+id)}</span>
      <span class="pp-pl l3">${pavilion(c,'p'+id)}</span><span class="pp-pl l2">${minarets(c,'p'+id)}</span><span class="pp-pl l1">${garden(c,id)}</span></div>
     <div class="pp-ptxt"><p class="pp-k reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
      <p class="pp-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="pp-ven reveal d3">${esc(o.venue)} <i>·</i> ${esc(fmtTime(o.start,o.lang))}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    return `<div class="cover cv-popup" style="${pv(c)}"><div class="pp-bg"></div>
     <div class="pp-head pp-fade"><p class="pp-k">${ev(o,L)}</p><p class="pp-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="pp-date">${esc(fmtDate(o.date,o.lang))}</p></div>
     <${tag} class="pp-scene" ${attr} aria-label="${L.open}"><span class="pp-card">
      <span class="pp-floor"></span><span class="pp-back">${backArt(c,id)}</span>
      <span class="pp-l l3">${pavilion(c,id)}</span><span class="pp-l l2">${minarets(c,id)}</span><span class="pp-l l1">${garden(c,id)}</span></span></${tag}>
     <div class="pp-foot pp-fade">${guest?`<p class="pp-to"><span>${L.dear}</span><b>${esc(guest)}</b></p>`:''}<p class="pp-hint">${en?'Touch the card to raise it':'Sentuh kad untuk menegakkannya'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.cssText+=';'+pv(th.c)+`;--pp-arch:${ARCHF}`},
  themes:[
    {k:'nila',n:'Nila',desc:'Ivory pavilion on an indigo night',c:{ground:'#e8e1d3',sheet:'#fbf7ee',ink:'#232638',accent:'#2b3266',gold:'#c09a4e',pagefg:'#232638',p1:'#2b3266',p2:'#fbf4e4',p3:'#c8a978',p4:'#3f6b55',p5:'#f4dfb0'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald and cream with gold',c:{ground:'#e6e3d6',sheet:'#fbf9f1',ink:'#1f2b25',accent:'#1d5a44',gold:'#b8954a',pagefg:'#1f2b25',p1:'#1d5a44',p2:'#fbf5e6',p3:'#e2c88f',p4:'#7a9a62',p5:'#fff7e0',line:'rgba(29,90,68,.2)'}},
    {k:'marun',n:'Marun',desc:'Maroon sky, blush pavilion',c:{ground:'#efe2da',sheet:'#fdf8f3',ink:'#2e1c20',accent:'#7a1f33',gold:'#bf9157',pagefg:'#2e1c20',p1:'#7a1f33',p2:'#fbefe6',p3:'#e3b5a5',p4:'#5e7a52',p5:'#fde2d6',line:'rgba(122,31,51,.2)'}},
    {k:'senja',n:'Senja',desc:'Dusk coral and lilac',c:{ground:'#f0e2dc',sheet:'#fffaf6',ink:'#33262e',accent:'#c0504a',gold:'#c3955a',pagefg:'#33262e',p1:'#e08a6a',p2:'#fff6ec',p3:'#b9a2c9',p4:'#6f8a6a',p5:'#ffe7cf',line:'rgba(192,80,74,.2)'}},
    {k:'laut',n:'Laut',desc:'Sea blue and white',c:{ground:'#e3ebee',sheet:'#fbfdfd',ink:'#1d2f3a',accent:'#2a5f80',gold:'#b7974f',pagefg:'#1d2f3a',p1:'#3b7ea1',p2:'#ffffff',p3:'#a9cfd9',p4:'#4f8a76',p5:'#f2f0dc',line:'rgba(42,95,128,.2)'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric and deep teal',c:{ground:'#efe6cf',sheet:'#fffaee',ink:'#2a2a22',accent:'#1f5560',gold:'#b5862c',pagefg:'#2a2a22',p1:'#1f5560',p2:'#fbf0d0',p3:'#e2ab3a',p4:'#5a7a3a',p5:'#fff3cf',line:'rgba(31,85,96,.2)'}},
    {k:'malam',n:'Malam',desc:'Midnight with a gold pavilion',c:{ground:'#141a2c',sheet:'#f7f3ea',ink:'#1d2232',accent:'#26305a',gold:'#d6b25c',pagefg:'#efe9da',pageAccent:'#e9cf8a',p1:'#0d1224',p2:'#e9cf8a',p3:'#3a4a7a',p4:'#24463a',p5:'#f3e2b4',line:'rgba(38,48,90,.2)'}},
    {k:'jambu',n:'Jambu',desc:'Blush pink and sage',c:{ground:'#f3e6e6',sheet:'#fffafa',ink:'#3a2729',accent:'#a54b5f',gold:'#bf946a',pagefg:'#3a2729',p1:'#d88c98',p2:'#fff8f4',p3:'#c7d3bd',p4:'#6f8c6c',p5:'#ffe0e4',line:'rgba(165,75,95,.2)'}},
  ]});
function pv(c){return `--p1:${c.p1};--p2:${c.p2};--p3:${c.p3};--p4:${c.p4}`}
