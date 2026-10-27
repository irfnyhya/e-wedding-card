/* tingkap: a carved timber window of a Malay house on a lime-washed wall. The fanlight is pierced awan-larat carving with daylight
   coming through it; the panelled shutters have small carved panels and brass knobs. Behind them, a hand-tinted view of old Malaya
   (public-domain postcards) or Hassam's garden painting.
   Cover: tap "Buka Jemputan" and the shutters swing open onto the view. Page: the open window, a card resting on the sill.
   Skin: plaster cards framed by a thin timber moulding with a carved head. */
let tkN=0;
const tkF=v=>(+v).toFixed(1);
// wood grain: stretched fractal noise as dark streaks; layered over the theme's wood colour
const tkGrain=(fx,fy,seed,w,h,k=1)=>K.uri(`<svg ${NS} width="${w}" height="${h}"><filter id="g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="4" seed="${seed}" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .06  0 0 0 0 .04  0 0 0 0 .02  ${-1.5*k} 0 0 0 ${.84*k}"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>`);
const TK_GV=tkGrain(.15,.004,7,240,600),TK_GH=tkGrain(.004,.15,11,600,240),TK_GVL=tkGrain(.15,.004,7,240,600,.22),TK_GHL=tkGrain(.004,.15,11,600,240,.22);
// weathering, all procedural noise: chipped paint showing bare timber, dense chips for worn edges, uneven paint and grime, lime-wash stains
const tkNoise=(w,h,freq,oct,seed,mat,afunc)=>K.uri(`<svg ${NS} width="${w}" height="${h}"><filter id="n" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${oct}" seed="${seed}" stitchTiles="stitch"/><feColorMatrix values="${mat}"/>${afunc?`<feComponentTransfer><feFuncA type="${afunc[0]}" tableValues="${afunc[1]}"/></feComponentTransfer>`:''}</filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`);
const BARE='0 0 0 0 .56  0 0 0 0 .47  0 0 0 0 .36';
const TK_CHIP=tkNoise(260,260,'.16 .045',4,3,`${BARE}  1 0 0 0 0`,['discrete','0 0 0 0 0 0 0 0 0 0 .95 1']);
const TK_EDGE=tkNoise(200,200,'.09 .2',3,8,`${BARE}  1 0 0 0 0`,['discrete','0 0 0 0 0 .9 1 1']);
const TK_MOT=tkNoise(320,320,'.012',3,21,'0 0 0 0 .14  0 0 0 0 .09  0 0 0 0 .05  1.1 0 0 0 -.46',null);
const TK_LIME=tkNoise(420,420,'.006 .022',4,5,'0 0 0 0 .5  0 0 0 0 .42  0 0 0 0 .3  .75 0 0 0 -.32',null);
const TK_PLAS=tkNoise(160,160,'.7',2,9,'0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -1.2 0 0 0 .7',null);
// a spiral curl as a polyline: starts at (x,y) heading a0, winds inward
function tkCurl(x,y,a0,r,turns,dir){let d=`M${tkF(x)} ${tkF(y)}`,a=a0,cx=x,cy=y;const n=28;
  for(let i=1;i<=n;i++){const t=i/n,step=r*(1-t*.82)*(turns*2*Math.PI/n);a+=dir*turns*2*Math.PI/n;cx+=Math.cos(a)*step;cy+=Math.sin(a)*step;d+=`L${tkF(cx)} ${tkF(cy)}`}return d}
const tkLeaf=(x,y,deg,s=1)=>`<path d="M0 0C${4*s} ${-3*s} ${10*s} ${-3*s} ${15*s} 0C${10*s} ${3*s} ${4*s} ${3*s} 0 0Z" transform="translate(${tkF(x)} ${tkF(y)}) rotate(${tkF(deg)})"/>`;
// fanlight carving, viewBox 300x84: wood is opaque, cut-outs transparent (used as a mask)
function tkFanSvg(){let half='';
  // main stem from the bud to the right edge, rising and falling
  half+=`<path d="M164 42C182 26 200 26 214 40S246 58 262 42S284 28 290 34" fill="none" stroke="#000" stroke-width="4.2" stroke-linecap="round"/>`;
  half+=`<path d="${tkCurl(214,40,-2.2,7.5,1.15,-1)}" fill="none" stroke="#000" stroke-width="3.3" stroke-linecap="round"/>`;
  half+=`<path d="${tkCurl(238,52,2.4,7,1.1,1)}" fill="none" stroke="#000" stroke-width="3.3" stroke-linecap="round"/>`;
  half+=`<path d="${tkCurl(186,30,-2.6,8,1.2,-1)}" fill="none" stroke="#000" stroke-width="3.3" stroke-linecap="round"/>`;
  half+=`<path d="${tkCurl(270,38,-1.6,6,1.1,-1)}" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>`;
  half+=`<path d="M176 34C172 22 178 14 188 12M200 54C206 66 220 70 228 66M250 50C254 62 266 66 276 62" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round"/>`;
  half+=`<g fill="#000">${tkLeaf(188,12,-15,1.15)}${tkLeaf(228,66,-20,1.15)}${tkLeaf(276,62,-25,1)}${tkLeaf(196,40,40,1)}${tkLeaf(250,38,-40,1)}${tkLeaf(168,54,25,1)}${tkLeaf(226,24,-150,.9)}${tkLeaf(262,22,-160,.8)}</g>`;
  // centre bud: eight petals around a boss
  const pet=K.ring(8,10,150,42).map(([x,y,a])=>`<ellipse cx="${tkF(x)}" cy="${tkF(y)}" rx="6.4" ry="3.2" transform="rotate(${tkF(a*180/Math.PI)} ${tkF(x)} ${tkF(y)})"/>`).join('');
  return `<svg ${NS} viewBox="0 0 300 84" preserveAspectRatio="none"><rect x="2.5" y="2.5" width="295" height="79" fill="none" stroke="#000" stroke-width="5"/><rect x="8.5" y="8.5" width="283" height="67" fill="none" stroke="#000" stroke-width="1.6"/>
    <g fill="#000">${pet}<circle cx="150" cy="42" r="5.2"/></g><circle cx="150" cy="42" r="16" fill="none" stroke="#000" stroke-width="2"/>
    ${half}<g transform="translate(300 0) scale(-1 1)">${half}</g>
    <path d="M150 9V24M150 60V75" stroke="#000" stroke-width="2.6"/></svg>`}
// small pierced panel for the top of each shutter, viewBox 60x64: a lozenge with a four-petal flower, quarter flowers in the corners
function tkPanelSvg(){const flower=(x,y,r)=>[0,90,180,270].map(a=>`<ellipse cx="${tkF(x+Math.cos(a*Math.PI/180)*r*.55)}" cy="${tkF(y+Math.sin(a*Math.PI/180)*r*.55)}" rx="${tkF(r*.55)}" ry="${tkF(r*.3)}" transform="rotate(${a} ${tkF(x+Math.cos(a*Math.PI/180)*r*.55)} ${tkF(y+Math.sin(a*Math.PI/180)*r*.55)})"/>`).join('')+`<circle cx="${x}" cy="${y}" r="${tkF(r*.2)}"/>`;
  return `<svg ${NS} viewBox="0 0 60 64" preserveAspectRatio="none"><g fill="none" stroke="#000"><rect x="2" y="2" width="56" height="60" stroke-width="4"/><rect x="6.5" y="6.5" width="47" height="51" stroke-width="1.2"/>
    <path d="M30 7L53 32L30 57L7 32Z" stroke-width="2.6"/><path d="M30 13L47 32L30 51L13 32Z" stroke-width="1.1"/></g>
    <g fill="#000">${flower(30,32,11)}${flower(6,6,7)}${flower(54,6,7)}${flower(6,58,7)}${flower(54,58,7)}</g></svg>`}
const TK_FAN=K.uri(tkFanSvg()),TK_PAN=K.uri(tkPanelSvg());
const TK_VIEW={timah:'pc-timah.jpg',boyan:'pc-boyan.jpg',stjames:'pc-stjames.jpg',pinang:'pc-pinang.jpg',hassam:'pd-paint-hassam-water.jpg'};
const TK_POS={timah:'50% 50%',boyan:'30% 50%',stjames:'50% 55%',pinang:'45% 50%',hassam:'50% 60%'};
const tkVars=c=>`--gv:${c.paint?TK_GVL:TK_GV};--gh:${c.paint?TK_GHL:TK_GH};--fan:${TK_FAN};--chip:${TK_CHIP};--edge:${TK_EDGE};--mot:${TK_MOT};--lime:${TK_LIME};--plas:${TK_PLAS};--pan:${TK_PAN};--view:url(${A}${TK_VIEW[c.view]});--vpos:${TK_POS[c.view]};--skyf:${c.paint?"blur(4px) brightness(.62) saturate(.8)":"blur(5px) brightness(1.55) saturate(.6) contrast(.8)"};--bloom:${c.paint?.25:1}`;
const tkShut=s=>`<span class="tgk-shut ${s}"><i class="tgk-pw"><i class="tgk-sky"></i><i class="tgk-pc"></i></i><i class="tgk-raise"><i class="tgk-field"></i></i><i class="tgk-knob"></i><i class="tgk-wear"></i></span>`;
const tkWindow=(inner,open)=>`<span class="tgk-win${open?' open':''}"><span class="tgk-arch"><span class="tgk-fanw"><i class="tgk-sky"></i><i class="tgk-fan"></i></span><i class="tgk-tran"></i>
  <span class="tgk-open"><i class="tgk-view"></i>${tkShut('l')}${tkShut('r')}</span></span><i class="tgk-sill"><i class="tgk-wear"></i></i><i class="tgk-wear"></i>${inner||''}</span>`;
FAMILY({key:'tingkap',name:'Tingkap',meaning:'The window',
  blurb:'A carved timber window on a lime-washed wall, daylight through its awan-larat fanlight. The shutters swing open onto a hand-tinted view of old Malaya.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-tingkap2" style="${tkVars(c)}"><i class="tgk-wall"></i>
      <div class="tgk-pw2 reveal">${tkWindow('',true)}</div>
      <div class="tgk-card reveal d1"><p class="tgk-k kicker">${ev(o,L)}</p><h1 class="tgk-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="tgk-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="tgk-ven">${esc(o.venue)}</p>`:''}</div>
      <a class="tgk-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-tingkap2" style="${tkVars(c)}"><i class="tgk-wall"></i><i class="tgk-light"></i>
      <div class="tgk-head"><p class="tgk-k">${ev(o,L)}</p><p class="tgk-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div>
      <div class="tgk-stage">${tkWindow()}</div>
      <div class="tgk-foot">${guest?`<p class="tgk-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="tgk-btn" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.cssText+=';'+tkVars(th.c);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'hijau',n:'Kayu Hijau',desc:'Green shutters, a river in Perak',c:{ground:'#ebe4d2',wood:'#2f5a3c',sheet:'#fbf8f1',ink:'#2e2620',accent:'#2f5a3c',gold:'#a8894c',pagefg:'#2e2620',view:'timah'}},
    {k:'biru',n:'Biru Laut',desc:'Blue shutters, a river kampung',c:{ground:'#ece6d6',wood:'#2d4b78',sheet:'#fbf8f1',ink:'#2a2a30',accent:'#2d4b78',gold:'#a8894c',pagefg:'#2a2a30',view:'boyan'}},
    {k:'jati',n:'Kayu Jati',desc:'Teak window, a lake village',c:{ground:'#efe6d4',wood:'#7a4a28',sheet:'#fbf8f1',ink:'#2e2620',accent:'#6b4226',gold:'#a8894c',pagefg:'#2e2620',view:'stjames'}},
    {k:'merah',n:'Merah Bata',desc:'Oxblood shutters, a garden painting',c:{ground:'#efe3d3',wood:'#6e1b25',sheet:'#fbf8f1',ink:'#2e2620',accent:'#7a1b29',gold:'#a8894c',pagefg:'#2e2620',view:'hassam'}},
    {k:'kuning',n:'Rumah Kedai',desc:'Yellow wall, green shutters, palms by the sea',c:{ground:'#e3bf62',wood:'#2c5a4a',sheet:'#fbf8f1',ink:'#2e2620',accent:'#2c5a4a',gold:'#8a6a2c',pagefg:'#2b2416',view:'pinang'}},
    {k:'putih',n:'Putih',desc:'White shutters on a grey wall',c:{paint:1,ground:'#cfc9bd',wood:'#efebe2',sheet:'#fbf8f1',ink:'#2e2620',accent:'#3b4a3f',gold:'#8f7a4f',pagefg:'#2a2a26',view:'timah'}},
    {k:'pandan',n:'Pandan',desc:'Pandan shutters, a garden painting',c:{ground:'#f3eedc',wood:'#0d4a32',sheet:'#fbf8f1',ink:'#23302a',accent:'#0d4a32',gold:'#a8894c',pagefg:'#23302a',view:'hassam'}},
    {k:'kopi',n:'Kopi Malam',desc:'Teak window on a dark evening wall',c:{ground:'#2b2420',wood:'#8a5e3c',sheet:'#f8f2e6',ink:'#2e2620',accent:'#6b4226',gold:'#c9a25a',pagefg:'#efe4d0',view:'stjames'}},
    {k:'hujan',n:'Biru Hujan',desc:'Slate-blue shutters, a river kampung',c:{ground:'#e2e6e8',wood:'#3a5570',sheet:'#fbfbf8',ink:'#24303a',accent:'#3a5570',gold:'#9a8a62',pagefg:'#24303a',view:'boyan'}},
    {k:'fajar',n:'Fajar',desc:'Plum shutters on a blush wall',c:{ground:'#f4e3da',wood:'#6a2e44',sheet:'#fffaf6',ink:'#33242a',accent:'#7a3550',gold:'#b08a5a',pagefg:'#33242a',view:'pinang'}},
  ]});
