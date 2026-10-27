/* tirai: "Tirai Kaca". An art-nouveau leaded-glass panel lit from behind: a border of jewel-coloured glass with
   round cabochons at the corners, irises climbing the side lights on green stems, a sunrise fan over an arched
   panel of pale opalescent glass that holds the names, and a row of tulips at the foot.
   Cover: the panel hangs on the wall glowing; tap "Buka Jemputan" and it rises away like a sash.
   Page: the same window, taller, with the invitation on its pale centre. Skin: cream glass cards under a transom of coloured glass. */
let trN=0;
const trf=v=>(+v).toFixed(1);
const trP=(r,a)=>{const t=a*Math.PI/180;return [150+Math.cos(t)*r,150+Math.sin(t)*r]};
const trSec=(r0,r1,a0,a1)=>{const [x0,y0]=trP(r1,a0),[x1,y1]=trP(r1,a1),[x2,y2]=trP(r0,a1),[x3,y3]=trP(r0,a0);
  return `M${trf(x0)} ${trf(y0)}A${r1} ${r1} 0 0 1 ${trf(x1)} ${trf(y1)}L${trf(x2)} ${trf(y2)}A${r0} ${r0} 0 0 0 ${trf(x3)} ${trf(y3)}Z`};
const trJewel=(x,y,c,col,id)=>`<circle cx="${x}" cy="${y}" r="5.4" fill="${col}"/><circle cx="${x-1.6}" cy="${y-1.8}" r="1.7" fill="#fff" fill-opacity=".55" stroke="none"/>`;
// an iris in a side light, centred on x=38 (the stem), top near y
const trIris=(g,y)=>`<path d="M38 ${y+26}C32 ${y+18} 32 ${y+8} 38 ${y}C44 ${y+8} 44 ${y+18} 38 ${y+26}Z" fill="${g.bloom[1]}"/>
  <path d="M38 ${y+26}C30 ${y+24} 21 ${y+28} 19 ${y+37}C26 ${y+39} 33 ${y+34} 38 ${y+28}Z" fill="${g.bloom[0]}"/><path d="M38 ${y+26}C46 ${y+24} 55 ${y+28} 57 ${y+37}C50 ${y+39} 43 ${y+34} 38 ${y+28}Z" fill="${g.bloom[0]}"/>
  <path d="M35 ${y+24}L38 ${y+33}L41 ${y+24}Z" fill="${g.sun[0]}"/>`;
const trBand=(g,x,y,w,h,step,horiz,o=0)=>{let s='';const n=Math.ceil((horiz?w:h)/step);for(let i=0;i<n;i++){const f=g.bd[(i+o)%g.bd.length];
  s+=horiz?`<rect x="${x+i*step}" y="${y}" width="${Math.min(step,w-i*step)}" height="${h}" fill="${f}"/>`:`<rect x="${x}" y="${y+i*step}" width="${w}" height="${Math.min(step,h-i*step)}" fill="${f}"/>`}return s};
// the head of the window, 300 x 150
function trTop(g,u){
  let fan='';for(let i=0;i<15;i++)fan+=`<path d="${trSec(88,112,180+i*12,192+i*12)}" fill="${g.sun[i%2]}"/>`;
  let rays='';for(let a=192;a<360;a+=24){const [x0,y0]=trP(112,a),[x1,y1]=trP(260,a);rays+=`M${trf(x0)} ${trf(y0)}L${trf(x1)} ${trf(y1)}`}
  const corner=(x)=>`<path d="M${x-12} 52C${x-20} 60 ${x-24} 70 ${x-26} 82C${x-18} 74 ${x-12} 66 ${x-8} 56Z" fill="${g.leaf[1]}"/>
    <path d="M${x+12} 32C${x+20} 26 ${x+28} 22 ${x+36} 21C${x+28} 29 ${x+20} 33 ${x+12} 36Z" fill="${g.leaf[0]}"/>
    <circle cx="${x}" cy="42" r="14" fill="${g.bloom[0]}"/><path d="M${x-14} 42H${x+14}M${x} 28V56" fill="none"/><circle cx="${x}" cy="42" r="5" fill="${g.sun[0]}"/>`;
  return `<svg class="tr-top" viewBox="0 0 300 150" ${NS} aria-hidden="true"><defs><clipPath id="trc${u}"><rect x="62" y="14" width="176" height="136"/></clipPath></defs>
   <g stroke="${g.lead}" stroke-width="2.2" stroke-linejoin="round">
    ${trBand(g,0,0,300,14,30,1)}${trBand(g,0,14,14,136,34,0,1)}${trBand(g,286,14,14,136,34,0,2)}
    <rect x="14" y="14" width="48" height="136" fill="${g.sky[1]}"/><rect x="238" y="14" width="48" height="136" fill="${g.sky[1]}"/>
    <rect x="36" y="58" width="4" height="96" fill="${g.leaf[0]}"/>
    <path d="M37 150C30 128 24 110 21 92C30 106 35 124 38 150Z" fill="${g.leaf[1]}"/><path d="M39 150C46 134 52 118 56 102C51 120 45 134 40 150Z" fill="${g.leaf[0]}"/>
    ${trIris(g,30)}
    <g transform="translate(300 0) scale(-1 1)"><rect x="36" y="58" width="4" height="96" fill="${g.leaf[0]}"/>
    <path d="M37 150C30 128 24 110 21 92C30 106 35 124 38 150Z" fill="${g.leaf[1]}"/><path d="M39 150C46 134 52 118 56 102C51 120 45 134 40 150Z" fill="${g.leaf[0]}"/>${trIris(g,30)}</g>
    <g clip-path="url(#trc${u})"><rect x="62" y="14" width="176" height="136" fill="${g.sky[0]}"/><path d="${rays}" fill="none"/>${fan}
     <path d="M62 96C80 92 92 98 102 108M238 96C220 92 208 98 198 108" fill="none"/>
     ${corner(90)}<g transform="translate(300 0) scale(-1 1)">${corner(90)}</g></g>
    <path d="M61 151A89 89 0 0 1 239 151Z" fill="${g.cream}" stroke="none"/><path d="M62 150A88 88 0 0 1 238 150" fill="none"/>
    <path d="M62 14V150M238 14V150" fill="none"/>
    ${trJewel(7,7,0,g.jewel)}${trJewel(293,7,0,g.jewel)}${trJewel(150,7,0,g.jewel)}${trJewel(7,82,0,g.jewel)}${trJewel(293,82,0,g.jewel)}
   </g></svg>`}
// the foot, 300 x 100: leaf clumps at the base of the side lights, a row of tulips under the pale panel
function trFoot(g){
  const tulip=(x,k)=>`<g transform="translate(${x} 68)"><rect x="-1.6" y="0" width="3.2" height="20" fill="${g.leaf[0]}"/>
    <path d="M-1 15C-8 11-14 5-16-4C-8 0-4 6-1 10Z" fill="${g.leaf[1]}"/><path d="M1 15C8 11 14 5 16-4C8 0 4 6 1 10Z" fill="${g.leaf[0]}"/>
    <path d="M-8 0C-9-8-7-14-4-15L-2-9L0-16L2-9L4-15C7-14 9-8 8 0C5 3-5 3-8 0Z" fill="${g.bloom[k]}"/></g>`;
  const clump=`<rect x="36" y="-2" width="4" height="40" fill="${g.leaf[0]}"/><path d="M38 86C30 66 22 46 18 24C28 44 34 64 40 86Z" fill="${g.leaf[1]}"/><path d="M38 86C46 70 52 54 58 38C52 58 44 72 40 86Z" fill="${g.leaf[0]}"/><path d="M37 86C33 72 32 58 33 46C37 58 39 72 40 86Z" fill="${g.leaf[1]}"/>`;
  return `<svg class="tr-foot" viewBox="0 0 300 100" ${NS} aria-hidden="true"><g stroke="${g.lead}" stroke-width="2.2" stroke-linejoin="round">
    ${trBand(g,0,0,14,86,43,0,1)}${trBand(g,286,0,14,86,43,0,0)}${trBand(g,0,86,300,14,30,1,2)}
    <rect x="14" y="-2" width="48" height="88" fill="${g.sky[1]}"/><rect x="238" y="-2" width="48" height="88" fill="${g.sky[1]}"/>
    ${clump}<g transform="translate(300 0) scale(-1 1)">${clump}</g>
    <rect x="62" y="-4" width="176" height="48" fill="${g.cream}"/><rect x="62" y="44" width="176" height="42" fill="${g.sky[0]}"/>
    <path d="M62 66C90 60 120 72 150 64S210 60 238 68" fill="none"/>
    ${tulip(106,1)}${tulip(150,0)}${tulip(194,1)}
    ${trJewel(7,93,0,g.jewel)}${trJewel(293,93,0,g.jewel)}${trJewel(150,93,0,g.jewel)}
   </g></svg>`}
// one repeat of a side light, 62 x 64: border glass, a green stem with a leaf either side
const trTile=(g,flip)=>K.uri(`<svg ${NS} width="62" height="64" viewBox="0 0 62 64"><g ${flip?'transform="translate(62 0) scale(-1 1)"':''} stroke="${g.lead}" stroke-width="2.2" stroke-linejoin="round">
  <rect x="0" y="0" width="14" height="32" fill="${g.bd[flip?1:0]}"/><rect x="0" y="32" width="14" height="32" fill="${g.bd[2]}"/>
  <rect x="14" y="0" width="48" height="64" fill="${g.sky[1]}"/>
  <path d="M37 32C28 28 20 20 17 7C27 12 34 20 37 32Z" fill="${g.leaf[1]}"/><path d="M39 63C48 59 56 51 59 39C50 43 42 51 39 63Z" fill="${g.leaf[0]}"/>
  <rect x="36" y="-3" width="4" height="70" fill="${g.leaf[0]}"/></g></svg>`);
const TR_NOISE=K.uri(`<svg ${NS} width="220" height="220"><filter id="n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="3" seed="4"/><feColorMatrix values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 0 1"/></filter><rect width="220" height="220" filter="url(#n)"/></svg>`);
const trVars=c=>`--cream:${c.g.cream};--lead:${c.g.lead};--frame:${c.frame};--glow:${c.glow};--trl:${trTile(c.g)};--trr:${trTile(c.g,1)};--trn:${TR_NOISE}`;
const trNames=(o,tag='h1')=>{const [n1,n2]=coverNames(o);return `<${tag} class="tr-names"><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
function trPanel(c,u,inner,cls=''){return `<div class="tr-panel ${cls}">${trTop(c.g,u)}<div class="tr-mid"><i class="tr-strip l"></i><div class="tr-cream">${inner}</div><i class="tr-strip r"></i></div>${trFoot(c.g)}<i class="tr-noise"></i><i class="tr-light"></i></div>`}
FAMILY({key:'tirai',name:'Tirai Kaca',meaning:'Leaded glass panel',
  blurb:'An art-nouveau stained-glass panel glowing on the wall: irises and tulips in jewel-coloured glass, a sunrise fan, and the names on its pale centre. It rises away like a sash to open.',
  fonts:{d:"'Marcellus', serif",s:"'Marcellus', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const u=++trN,c=th.c,en=o.lang==='en';
    const inner=`<div class="tr-col">
      ${o.bismillah?`<p class="tr-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
      <p class="tr-k kicker">${ev(o,L)}</p>${trNames(o)}<i class="tr-rule"></i>
      <p class="tr-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="tr-hj">${esc(o.hijri)}</p>`:''}
      ${o.venue?`<p class="tr-ven">${esc(o.venue)}</p>`:''}
      <div class="tr-pills"><a class="tr-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="tr-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></div>`;
    return `<section class="page pg-tirai${c.dark?' tr-dark':''}" style="${trVars(c)}"><i class="tr-wall"></i><i class="tr-spill"></i>
      <div class="tr-hang reveal">${trPanel(c,u,inner)}</div></section>`},
  cover(o,th,L,guest,tag,attr){const u=++trN,c=th.c,en=o.lang==='en';
    return `<div class="cover cv-tirai${c.dark?' tr-dark':''}" style="${trVars(c)}"><i class="tr-wall"></i><i class="tr-spill"></i>
      <div class="tr-hang">${trPanel(c,u,'')}
        <div class="tr-ctext"><i class="tr-gem"></i><p class="tr-k">${ev(o,L)}</p>${trNames(o,'p')}<i class="tr-rule"></i><p class="tr-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
      <div class="tr-foot2">${guest?`<p class="tr-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="tr-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c,g=c.g;el.classList.toggle('tr-dark',!!c.dark);
    [['--cream',g.cream],['--lead',g.lead],['--frame',c.frame],['--glow',c.glow]].forEach(([k,v])=>el.style.setProperty(k,v));
    let band='';for(let i=0;i<6;i++)band+=`<rect x="${i*20}" y="0" width="20" height="16" fill="${g.bd[i%3]}"/>`;
    el.style.setProperty('--tr-band',K.uri(`<svg ${NS} width="120" height="16" viewBox="0 0 120 16"><g stroke="${g.lead}" stroke-width="2.2">${band}</g><circle cx="10" cy="8" r="3" fill="${g.jewel}" stroke="${g.lead}" stroke-width="1.4"/><circle cx="70" cy="8" r="3" fill="${g.sun[0]}" stroke="${g.lead}" stroke-width="1.4"/></svg>`));
    el.style.setProperty('--tr-gemrow',K.uri(`<svg ${NS} width="90" height="14" viewBox="0 0 90 14"><g stroke="${g.lead}" stroke-width="1.3" stroke-linejoin="round"><path d="M2 7H34M56 7H88" fill="none" stroke="${c.gold}" stroke-width=".8"/><path d="M45 1L51 7L45 13L39 7Z" fill="${g.bloom[0]}"/><path d="M33 7L36 4L39 7L36 10Z" fill="${g.sun[0]}"/><path d="M51 7L54 4L57 7L54 10Z" fill="${g.sun[0]}"/></g></svg>`));
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'zamrud',n:'Zamrud',desc:'Green and amber glass on a dark wall',c:{ground:'#141f1b',sheet:'#f4ecd6',ink:'#2a2a24',accent:'#2d5a46',gold:'#8f6a2c',pagefg:'#ede6d4',frame:'#3a2e22',glow:'rgba(232,196,110,.38)',dark:1,
      g:{sky:['#86bfae','#5f9c8c'],leaf:['#3d7a48','#62a058'],bloom:['#c43f74','#e27fa4'],sun:['#e8b14a','#f4d27a'],bd:['#2e6c58','#c08a2e','#7c2c4c'],jewel:'#d9584e',cream:'#f4ecd6',lead:'#221d19'}}},
    {k:'nila',n:'Nila',desc:'Blue and violet glass on a midnight wall',c:{ground:'#11152a',sheet:'#f3eedf',ink:'#24273a',accent:'#34408a',gold:'#8c6a2e',pagefg:'#e8e8f2',frame:'#2e2a30',glow:'rgba(150,170,255,.32)',dark:1,
      g:{sky:['#7c9ad6','#5675bd'],leaf:['#3c7a5c','#5f9870'],bloom:['#8452c2','#b28ae2'],sun:['#e8b04c','#f4d27e'],bd:['#2c3f8e','#c08a32','#6a3e9c'],jewel:'#e0a640',cream:'#f3eedf',lead:'#1e1c22'}}},
    {k:'marun',n:'Marun',desc:'Ruby and amber glass on a dark wall',c:{ground:'#1f0e0e',sheet:'#f6eedb',ink:'#33221f',accent:'#8a1f30',gold:'#8f6a2c',pagefg:'#f3e6d6',frame:'#3b2a20',glow:'rgba(240,170,90,.38)',dark:1,
      g:{sky:['#e0ae62','#c98c42'],leaf:['#4e7a38','#719646'],bloom:['#b8233a','#dc4a5c'],sun:['#f2c45a','#f8de8e'],bd:['#7e1a28','#c48a30','#2e5e3a'],jewel:'#3f7fc0',cream:'#f6eedb',lead:'#221a16'}}},
    {k:'ungu',n:'Ungu',desc:'Lilac and rose glass on a plum wall',c:{ground:'#1a1222',sheet:'#f5efe4',ink:'#2e2533',accent:'#5e2f7a',gold:'#8a6a34',pagefg:'#eee6ef',frame:'#33262c',glow:'rgba(220,170,240,.32)',dark:1,
      g:{sky:['#bba2da','#9c80c4'],leaf:['#4a7a58','#6c9670'],bloom:['#c2457a','#e480a6'],sun:['#e8b85a','#f3d68c'],bd:['#4c2e7c','#b98a3a','#8c2d5c'],jewel:'#4fa08a',cream:'#f5efe4',lead:'#211b22'}}},
    {k:'senja',n:'Senja',desc:'Sunset glass on a dark wall',c:{ground:'#1e1511',sheet:'#f6eedc',ink:'#33261e',accent:'#9a3a22',gold:'#8f6a2c',pagefg:'#f3e7d6',frame:'#3a2a1e',glow:'rgba(246,170,100,.4)',dark:1,
      g:{sky:['#f0b47c','#e09662'],leaf:['#557d3c','#789a4a'],bloom:['#c6402c','#e4704c'],sun:['#f5cf62','#f9e49c'],bd:['#8a3a22','#c8962e','#3e6a5a'],jewel:'#3f8fa0',cream:'#f6eedc',lead:'#231a14'}}},
    {k:'gading',n:'Gading',desc:'Pale opal glass on an ivory wall',c:{ground:'#ebe4d5',sheet:'#fbf6ea',ink:'#3a3128',accent:'#7a4a52',gold:'#8f7240',pagefg:'#3a3128',frame:'#b39d7c',glow:'rgba(240,200,170,.5)',
      g:{sky:['#cfe0d4','#b6cfc0'],leaf:['#7ea67a','#99ba8a'],bloom:['#df9fb3','#efc4d0'],sun:['#ead08a','#f4e3b0'],bd:['#a8c6c0','#d9b878','#d6a2b2'],jewel:'#c98aa0',cream:'#fbf6ea',lead:'#4a4036'}}},
    {k:'laut',n:'Laut',desc:'Sea-blue glass on a grey-green wall',c:{ground:'#dbe4e2',sheet:'#f8f5ec',ink:'#26302f',accent:'#2c5c78',gold:'#87703e',pagefg:'#26302f',frame:'#8e8a78',glow:'rgba(120,200,210,.45)',
      g:{sky:['#8fc8d0','#6eaebb'],leaf:['#4e8e72','#6faa86'],bloom:['#3e6eb4','#6e95d2'],sun:['#e6c06a','#f0d694'],bd:['#2e7e8a','#c79a46','#3e5ea0'],jewel:'#d0704e',cream:'#f8f5ec',lead:'#2c2a28'}}},
    {k:'lumut',n:'Lumut',desc:'Moss and marigold glass on a linen wall',c:{ground:'#e3e0cf',sheet:'#f8f4e6',ink:'#2f3022',accent:'#5a6a2a',gold:'#8a6a2e',pagefg:'#2f3022',frame:'#8c7a58',glow:'rgba(230,200,110,.45)',
      g:{sky:['#c6d19c','#acbd7e'],leaf:['#5e7e3a','#7a9a4a'],bloom:['#d0783a','#e8a05a'],sun:['#e6c25a','#f2da8c'],bd:['#6e7e3a','#c49a3e','#a5562e'],jewel:'#6a4e9a',cream:'#f8f4e6',lead:'#2e2a22'}}},
  ]});
