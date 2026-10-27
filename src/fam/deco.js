/* deco: a black-lacquer panel with a gold-foil sunburst, stepped frame and speed lines, all drawn to exact geometry.
   Cover: the lacquered lid; tap "Buka Jemputan" and it tilts back and lifts away. Page: the inner panel, the same sunburst over the names.
   Skin: lacquer cards with a hairline foil frame and stepped corners. */
// the ornament is drawn once per size as black strokes and used as a mask over foil, so it reads as stamped gold
const dcCache={};
function dcOrn(w,h){const key=w+'x'+h;if(dcCache[key])return dcCache[key];
  const f=n=>n.toFixed(2),cx=w/2,R=w*.4,cy=h*.47,r0=R*.32;let s='';
  // frames: outer, inner, and stepped corners
  const step=(x,y,sx,sy)=>`M${f(x)} ${f(y+sy*22)}V${f(y+sy*12)}H${f(x+sx*6)}V${f(y+sy*6)}H${f(x+sx*12)}V${f(y)}H${f(x+sx*22)}`;
  s+=`<rect x="5" y="5" width="${w-10}" height="${h-10}" fill="none" stroke="#000" stroke-width="1.3"/>`;
  s+=`<rect x="9.5" y="9.5" width="${w-19}" height="${h-19}" fill="none" stroke="#000" stroke-width=".45"/>`;
  s+=`<path d="${[step(15,15,1,1),step(w-15,15,-1,1),step(15,h-15,1,-1),step(w-15,h-15,-1,-1)].join('')}" fill="none" stroke="#000" stroke-width=".8"/>`;
  // the arch that holds the sunburst
  const ax=cx-R-6,aw=(R+6)*2,ay=cy;
  s+=`<path d="M${f(ax)} ${f(ay+R*.42)}V${f(ay)}A${f(R+6)} ${f(R+6)} 0 0 1 ${f(ax+aw)} ${f(ay)}V${f(ay+R*.42)}" fill="none" stroke="#000" stroke-width=".9"/>`;
  s+=`<path d="M${f(ax-5)} ${f(ay+R*.42)}V${f(ay)}A${f(R+11)} ${f(R+11)} 0 0 1 ${f(ax+aw+5)} ${f(ay)}V${f(ay+R*.42)}" fill="none" stroke="#000" stroke-width=".35"/>`;
  // rays: alternating long wedges and short hairlines, upper half only
  const N=36;for(let i=0;i<=N;i++){const a=Math.PI+i/N*Math.PI,long=i%2===0,r1=long?R:R*.82,da=long?.021:.005;
    const p=(rr,aa)=>`${f(cx+Math.cos(aa)*rr)} ${f(cy+Math.sin(aa)*rr)}`;
    s+=`<path d="M${p(r0+3,a-da)}L${p(r1,a)}L${p(r0+3,a+da)}Z" fill="#000"/>`}
  // the rising sun: concentric half rings
  [r0,r0-4,r0-8.5,r0-13].forEach((r,i)=>{s+=`<path d="M${f(cx-r)} ${f(cy)}A${f(r)} ${f(r)} 0 0 1 ${f(cx+r)} ${f(cy)}" fill="none" stroke="#000" stroke-width="${i?'.5':'1.1'}"/>`});
  s+=`<path d="M${f(cx-r0-14)} ${f(cy)}H${f(cx+r0+14)}" stroke="#000" stroke-width=".9"/>`;
  // speed lines down both sides, and chevrons at the top
  [0,4.5,9].forEach(d=>{s+=`<path d="M${f(24+d)} ${f(cy+R*.55)}V${f(h-48)}M${f(w-24-d)} ${f(cy+R*.55)}V${f(h-48)}" stroke="#000" stroke-width="${d?'.4':'.7'}"/>`});
  [0,6,12].forEach(d=>{s+=`<path d="M${f(cx-16+d*.0)} ${f(26+d)}L${f(cx)} ${f(18+d)}L${f(cx+16)} ${f(26+d)}" fill="none" stroke="#000" stroke-width=".55"/>`});
  // a diamond rule near the foot
  const fy=h-34;s+=`<path d="M${f(cx-70)} ${fy}H${f(cx-8)}M${f(cx+8)} ${fy}H${f(cx+70)}" stroke="#000" stroke-width=".5"/><path d="M${cx} ${fy-4}L${cx+4} ${fy}L${cx} ${fy+4}L${cx-4} ${fy}Z" fill="#000"/>`;
  return dcCache[key]=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${s}</svg>`)}
const dcMix=(a,b,t)=>'#'+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t).toString(16).padStart(2,'0')).join('');
// foil ramp and button ink per colourway: light lacquer gets a deeper, darker foil so it reads
const dcVars=c=>`--fhi:${c.fhi};--flo:${c.flo};--btn:${c.btn}`;
const dcPanel=(o,L,big)=>{const [n1,n2]=coverNames(o),en=o.lang==='en',w=300,h=big?484:450;
  return `<div class="dc-panel${big?' big':''}" style="aspect-ratio:${w}/${h}"><i class="dc-foil" style="--orn:${dcOrn(w,h)}"></i>
    <p class="dc-k${big?' kicker':''}">${ev(o,L)}</p>
    <${big?'h1':'p'} class="dc-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${big?'h1':'p'}>
    <p class="dc-date">${esc(big?fmtDate(o.date,o.lang):fmtShort(o.date).replace(/\./g,' · '))}</p>
    ${big?`${o.venue?`<p class="dc-ven">${esc(o.venue)}</p>`:''}<div class="dc-links"><a data-go="when" href="#">${en?'Details':'Butiran'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}</div>`:''}</div>`};
FAMILY({key:'deco',name:'Deco',meaning:'Art deco lacquer',
  blurb:'A black-lacquer panel with a gold-foil sunburst and a stepped frame, drawn with exact geometry. The lid tilts back and lifts away.',
  fonts:{d:"'Poiret One', sans-serif",s:"'Bodoni Moda', serif",b:"'Bodoni Moda', serif"},ms:1400,
  page(o,th,L){return `<section class="page pg-deco2" style="${dcVars(th.c)}"><div class="dc-lac"></div><div class="dc-wrap reveal">${dcPanel(o,L,true)}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-deco2" style="${dcVars(th.c)}"><div class="dc-lac"></div>
      ${guest?`<p class="dc-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
      <div class="dc-stage"><div class="dc-lid">${dcPanel(o,L,false)}</div></div>
      <${tag} class="dc-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);const sc=$('.scroller',el);['fhi','flo','btn'].forEach(k=>el.style.setProperty('--'+k,th.c[k]));
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    ['noir','Noir','Black lacquer, yellow gold','#121111','#d2ad62'],
    ['zamrud','Zamrud','Emerald lacquer, yellow gold','#0c2f26','#d4b06a'],
    ['nila','Nila','Midnight lacquer, pale gold','#111a33','#d6b878'],
    ['wain','Wain','Wine lacquer, rose gold','#3a0e18','#dcae86'],
    ['gading','Gading','Ivory lacquer, antique gold','#efe7d6','#8a6428',1],
    ['marun','Marun','Maroon lacquer, yellow gold','#431120','#d6ae62'],
    ['ungu','Ungu','Plum lacquer, pale gold','#2b1829','#d4b67c'],
    ['teal','Teal','Teal lacquer, yellow gold','#0d3537','#d6b26a'],
    ['arang','Arang','Charcoal lacquer, silver','#232425','#c9ccd1'],
    ['champagne','Champagne','Champagne lacquer, bronze','#e3d3b4','#6e4f1e',1],
    ['mauve','Mauve','Mauve lacquer, rose gold','#4f1a29','#d6a98a'],
    ['pic','Pic','Olive lacquer, copper','#3e4a38','#d39c6c'],
    ['kunyit','Kunyit','Navy lacquer, saffron gold','#16213d','#e3b04a'],
    ['lavender','Lavender','Slate lacquer, champagne','#36343d','#d6c9a6'],
    ['karang','Karang','Deep teal lacquer, coral gold','#0b4044','#e0b07e'],
    ['pandan','Pandan','Pandan lacquer, yellow gold','#0c3f2b','#d8b65c'],
    ['kopi','Kopi','Coffee lacquer, caramel gold','#2f221c','#cfa66c'],
    ['hujan','Hujan','Storm-blue lacquer, platinum','#22324a','#cfcbbd'],
    ['fajar','Fajar','Aubergine lacquer, peach gold','#3d1d30','#e3b386'],
  ].map(([k,n,desc,ground,gold,light])=>({k,n,desc,c:light?{ground,gold,sheet:'#f6f0e2',ink:'#2a2219',accent:gold,pagefg:'#2a2219',line:'rgba(60,45,20,.25)',lac:ground,fhi:dcMix(gold,'#000000',.05),flo:dcMix(gold,'#000000',.5),btn:dcMix(gold,'#000000',.55)}
    :{ground,gold,sheet:dcMix(ground,'#ffffff',.1),ink:'#efe7d6',accent:gold,pagefg:'#efe7d6',line:'rgba(255,240,210,.18)',lac:ground,fhi:dcMix(gold,'#ffffff',.5),flo:dcMix(gold,'#000000',.25),btn:dcMix(gold,'#ffffff',.15)}}))});
