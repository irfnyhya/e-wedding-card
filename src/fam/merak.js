/* merak: a peacock's train, closed into a slender sheaf of feathers with eyes (bronze, green, turquoise, a midnight heart)
   and fine barbs, rising from a gold-and-enamel brooch. Iridescent gradients, a faint sheen.
   Cover: tap the brooch and the train fans open once into a full display, then the scene fades.
   Page: the names with a single feather laid across as the divider. Skin: feather-eye bullets and heading marks. */
needFont('Great+Vibes');
const hx=h=>{h=h.replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const f1=v=>+v.toFixed(1);
let uid=0;

function pal(th){const c={...th.c};if(c.white){Object.assign(c,{vane:'#e9edf0',vane2:'#cfd6dd',eo:'#d9dee4',eg:'#f4f6f8',et:'#c6d0d9',ec:'#9aa8b6',shaft:'#ffffff',barb:'#e2e7ec'})}
  else Object.assign(c,{vane:c.vane||'#2f7a4a',vane2:c.vane2||'#9a7a2a',eo:c.eo||'#b88a3a',eg:c.eg||'#2f8a52',et:c.et||'#1d8f96',ec:c.ec||'#14245a',shaft:c.shaft||'#e8dcb4',barb:c.barb||'#3a8a5a'});return c}
function defs(c,id){return `<linearGradient id="vn${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.vane}"/><stop offset=".3" stop-color="${mix(c.vane,c.et,.45)}"/><stop offset=".7" stop-color="${c.vane2}"/><stop offset="1" stop-color="${mix(c.vane2,c.vane,.5)}" stop-opacity=".2"/></linearGradient>
  <radialGradient id="eo${id}" cx=".5" cy=".42" r=".6"><stop offset=".6" stop-color="${mix(c.eo,'#ffffff',.25)}"/><stop offset="1" stop-color="${mix(c.eo,'#3a2a08',.3)}"/></radialGradient>
  <radialGradient id="eg${id}" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="${mix(c.eg,'#ffffff',.3)}"/><stop offset="1" stop-color="${mix(c.eg,'#06200f',.35)}"/></radialGradient>
  <radialGradient id="et${id}" cx=".45" cy=".38" r=".6"><stop offset="0" stop-color="${mix(c.et,'#ffffff',.35)}"/><stop offset="1" stop-color="${mix(c.et,'#06202a',.3)}"/></radialGradient>
  <radialGradient id="ec${id}" cx=".42" cy=".35" r=".7"><stop offset="0" stop-color="${mix(c.ec,'#8a9ae8',.35)}"/><stop offset="1" stop-color="${mix(c.ec,'#000000',.4)}"/></radialGradient>`}
/* the eye (ocellus), centred at 0,0, about 34 x 46 */
function eye(id,c){return `<ellipse rx="17" ry="23" fill="url(#eo${id})" stroke="${mix(c.eo,'#2a1a04',.4)}" stroke-width=".4"/><ellipse cy="1.5" rx="13" ry="17.5" fill="url(#eg${id})"/><ellipse cy="2.4" rx="9.6" ry="12.6" fill="url(#et${id})"/>
  <path d="M0-6.4C2.6-8.6 7.2-7.4 7.2-1.6C7.2 3.6 3.6 8.6 0 9.8C-3.6 8.6-7.2 3.6-7.2-1.6C-7.2-7.4-2.6-8.6 0-6.4Z" fill="url(#ec${id})"/><ellipse cx="-2" cy="-1.6" rx="1.8" ry="3" fill="#ffffff" opacity=".22" transform="rotate(-20 -2 -1.6)"/>
  <ellipse cy="1.5" rx="13" ry="17.5" fill="none" stroke="${mix(c.eo,'#ffffff',.2)}" stroke-width=".35" opacity=".8"/><ellipse cy="2.4" rx="9.6" ry="12.6" fill="none" stroke="${mix(c.eg,'#000000',.3)}" stroke-width=".35"/>`}
/* a whole feather in a 60 x 300 box, base at the bottom */
function feather(id,c,seed){const R=rng(seed);let b='';
  for(let y=292;y>64;y-=2.6){const t=(292-y)/228,len=4+t*12+R()*3,ang=38+t*20;for(const s of [-1,1]){const x2=30+s*len*Math.sin(ang*Math.PI/180),y2=y-len*Math.cos(ang*Math.PI/180);b+=`M30 ${f1(y)}Q${f1(30+s*len*.4)} ${f1(y-len*.15)} ${f1(x2)} ${f1(y2)}`}}
  let v='';for(let y=96;y>6;y-=1.8){const t=(96-y)/90,len=12+Math.sin(t*Math.PI)*12,ang=46-t*18;for(const s of [-1,1]){const x2=30+s*len*Math.sin(ang*Math.PI/180),y2=y-len*Math.cos(ang*Math.PI/180);v+=`M30 ${f1(y)}Q${f1(30+s*len*.45)} ${f1(y-len*.2)} ${f1(x2)} ${f1(y2)}`}}
  return `<path d="M30 6C42 12 50 30 50 50C50 74 40 92 30 102C20 92 10 74 10 50C10 30 18 12 30 6Z" fill="url(#vn${id})" opacity=".42"/>
   <path d="${b}" fill="none" stroke="${c.barb}" stroke-width=".45" opacity=".75"/><path d="${v}" fill="none" stroke="${mix(c.vane,c.et,.3)}" stroke-width=".4" opacity=".9"/>
   <path d="M30 300C30.6 220 30.4 140 30 30" fill="none" stroke="${c.shaft}" stroke-width="1.1"/>
   <g transform="translate(30 44)">${eye(id,c)}</g>`}
/* fine gold line-art of a fanned train, for the page */
function lineFan(c){let o='';const N=17;for(let i=0;i<N;i++){const a=-80+i*160/(N-1),L=i%2?150:176;
    let barbs='';for(let t=.18;t<.78;t+=.05){const y=-L*t,w=4+t*14;barbs+=`M0 ${f1(y)}l${f1(-w)} ${f1(-w*.9)}M0 ${f1(y)}l${f1(w)} ${f1(-w*.9)}`}
    o+=`<g transform="rotate(${f1(a)})"><path d="M0 0V${-L+18}" stroke-width=".7"/><path d="${barbs}" stroke-width=".3" opacity=".6"/>
     <g transform="translate(0 ${-L})"><ellipse rx="11" ry="15" stroke-width=".7"/><ellipse cy="1" rx="8" ry="11" stroke-width=".5"/><ellipse cy="1.6" rx="5.4" ry="7.4" stroke-width=".45"/><path d="M0-3C2-4.6 4.4-3.4 4-.6C3.6 2.4 1.6 4.4 0 5.4C-1.6 4.4-3.6 2.4-4-.6C-4.4-3.4-2-4.6 0-3Z" fill="${c.gold}" stroke="none" opacity=".75"/></g></g>`}
  return `<svg class="mk-fan" viewBox="-200 -200 400 210"><g fill="none" stroke="${c.gold}">${o}</g><path d="M-30 0A30 30 0 0 1 30 0" fill="none" stroke="${c.gold}" stroke-width=".8"/><path d="M-22 0A22 22 0 0 1 22 0" fill="none" stroke="${c.gold}" stroke-width=".5"/></svg>`}
function brooch(c,n1,n2,en){return `<svg viewBox="-50 -50 100 100"><defs><radialGradient id="bz" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="${mix(c.et,'#ffffff',.25)}"/><stop offset=".7" stop-color="${c.et}"/><stop offset="1" stop-color="${mix(c.ec,'#000000',.2)}"/></radialGradient></defs>
  <path d="${K.scallop(24,44,3.4)}" fill="${c.gold}" stroke="${mix(c.gold,'#000000',.4)}" stroke-width=".5"/><circle r="41" fill="none" stroke="${mix(c.gold,'#ffffff',.4)}" stroke-width=".6"/>
  <circle r="37" fill="url(#bz)" stroke="${mix(c.gold,'#000000',.3)}" stroke-width="1.2"/><circle r="33.5" fill="none" stroke="${c.gold}" stroke-width=".6" stroke-dasharray=".1 2.4" stroke-linecap="round"/>
  ${K.ring(12,39.5).map(([x,y])=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="1.3" fill="${mix(c.gold,'#ffffff',.5)}"/>`).join('')}</svg>`}
function featherRow(c,id,big){/* staggered lengths so the eyes sit at many heights along the closed train */
  const out=[];const N=big?13:9;for(let i=0;i<N;i++){const p=i===0?0:(i%2?-1:1)*Math.ceil(i/2),L=big?(60-i*2.2):(33-i*1.5);
    const a0=p*(big?1.5:2.2),a1=p*(big?13.5:19);out.push({L,a0,a1,seed:i*13+(big?1:7)})}
  return out}

FAMILY({key:'merak',name:'Merak',meaning:'Peacock train',
  blurb:'A peacock\'s closed train of iridescent eye feathers rising from an enamel brooch; touch it and the tail fans open into a full display.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1550,
  page(o,th,L){const [n1,n2]=coverNames(o),c=pal(th),id='p'+(++uid);
    const fh=`<svg class="mk-div reveal d2" viewBox="0 0 300 60"><defs>${defs(c,id)}</defs><g transform="translate(300 30) rotate(-90) translate(-30 -300) scale(1 1)">${feather(id,c,5)}</g></svg>`;
    return `<section class="page pg-merak${c.light?' mk-light':''}" style="--mk-eye:${K.uri(`<svg ${NS} viewBox="-20 -26 40 52"><defs>${defs(c,id+'e')}</defs>${eye(id+'e',c)}</svg>`)}"><div class="mk-silk"></div><i class="mk-pframe"><b class="tl"></b><b class="tr"></b><b class="bl"></b><b class="br"></b></i>${lineFan(c)}
     <div class="mk-ptxt"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
      ${fh}<p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=pal(th),id='c'+(++uid);
    const fs=[...featherRow(c,id,1),...featherRow(c,id,0)].sort((a,b)=>b.L-a.L).map(f=>`<i class="mk-f" style="--L:${f1(f.L)};--a0:${f1(f.a0)}deg;--a1:${f1(f.a1)}deg"><svg viewBox="0 0 60 300">${feather(id,c,f.seed)}</svg></i>`).join('');
    return `<div class="cover cv-merak${c.light?' mk-light':''}" style="--mk-eye:${K.uri(`<svg ${NS} viewBox="-20 -26 40 52"><defs>${defs(c,id+'e')}</defs>${eye(id+'e',c)}</svg>`)}"><div class="mk-silk"></div><i class="mk-pframe cv"><b class="tl"></b><b class="tr"></b><b class="bl"></b><b class="br"></b></i><svg width="0" height="0" style="position:absolute"><defs>${defs(c,id)}</defs></svg>
     <div class="mk-head"><p class="mk-k">${ev(o,L)}</p><p class="mk-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="mk-d">${esc(fmtDate(o.date,o.lang))}</p>
      ${guest?`<p class="mk-to">${L.dear}<b>${esc(guest)}</b></p>`:''}</div>
     <div class="mk-train">${fs}</div>
     <${tag} class="mk-brooch" ${attr} aria-label="${L.open}">${brooch(c)}<span>${esc((n1||'A')[0])}<i>&amp;</i>${esc((n2||'A')[0])}</span></${tag}>
     <p class="mk-hint">${en?'Open invitation':'Buka Jemputan'}</p></div>`},
  skin(el,o,th){K.cards(el);const c=pal(th),id='s';
    el.style.setProperty('--mk-eye',K.uri(`<svg ${NS} viewBox="-20 -26 40 52"><defs>${defs(c,id)}</defs>${eye(id,c)}</svg>`));
    el.style.setProperty('--mk-plume',K.uri(`<svg ${NS} viewBox="0 0 300 60"><defs>${defs(c,id)}</defs><g transform="translate(300 30) rotate(-90) translate(-30 -300)">${feather(id,c,9)}</g></svg>`));
    $$('.sec h2',el).forEach(h=>h.classList.add('mk-h2'));
    $$('.sheet > .sec',el).forEach(s=>s.insertAdjacentHTML('beforeend','<i class="mk-plume"></i>'))},
  themes:[
    {k:'merak',n:'Merak',desc:'Peacock teal with gold',c:{ground:'#0b2a2c',sheet:'#f6f1e4',ink:'#1d2826',accent:'#0f5a5a',gold:'#d4af5a',pagefg:'#f1ead6'}},
    {k:'nila',n:'Nila',desc:'Midnight blue and bronze',c:{ground:'#0d1934',sheet:'#f4f0e6',ink:'#1b2134',accent:'#1d3a7a',gold:'#d2ad62',pagefg:'#eee8d8'}},
    {k:'hitam',n:'Hitam',desc:'Black silk, jewel feathers',c:{ground:'#0c0c0e',sheet:'#f3eee2',ink:'#1c1b1a',accent:'#14605a',gold:'#d6b060',pagefg:'#efe8d6'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald and old gold',c:{ground:'#0d2618',sheet:'#f4f0e2',ink:'#1b261e',accent:'#1d6a42',gold:'#cfa94e',pagefg:'#eee9d6'}},
    {k:'ungu',n:'Ungu',desc:'Plum night, violet hearts',c:{ground:'#1d1230',sheet:'#f5f0f2',ink:'#261d30',accent:'#4e2f78',gold:'#d4ae66',ec:'#2a1a62',pagefg:'#efe8f0'}},
    {k:'gading',n:'Gading',desc:'Feathers on ivory paper',c:{ground:'#f3ecdc',sheet:'#fbf7ee',ink:'#2a2a24',accent:'#0f5a5a',gold:'#b08a3a',pagefg:'#2a2a24',light:1}},
    {k:'jed',n:'Jed',desc:'Pale jade and bronze',c:{ground:'#e2ede6',sheet:'#f8fbf8',ink:'#1e2c26',accent:'#1d6a5a',gold:'#a8823a',pagefg:'#1e2c26',light:1}},
    {k:'putih',n:'Merak Putih',desc:'The white peacock, silver',c:{ground:'#d9e0e8',sheet:'#fbfcfd',ink:'#26303c',accent:'#3a4a62',gold:'#9aa6b4',pagefg:'#26303c',light:1,white:1}},
  ]});
