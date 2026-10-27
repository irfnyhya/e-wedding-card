/* rama: Rama-rama, a butterfly specimen box. Malaysian butterflies pinned in rows on linen, each with a tiny typed
   label, behind a glass lid in a mitred wooden frame. Cover: touch the brass plate and the glass slides away.
   Page: one large specimen above the names. Skin: cards headed by typed specimen labels, a small pinned butterfly. */
needFont('Italianno');
const f1=n=>n.toFixed(1);
/* simplified real species of the peninsula: wing colours, border, spots and bands */
const SP={
  troides:{n:'Troides amphrysus',fw:'#1c1a17',fw2:'#3a3630',hw:'#e8b928',hw2:'#c98c12',edge:'#15130f',streak:'#9a958a',shape:'long',hwEdge:1},
  graphium:{n:'Graphium sarpedon',fw:'#16191a',fw2:'#22282a',hw:'#16191a',hw2:'#22282a',band:'#4fb8b0',tail:1},
  delias:{n:'Delias hyparete',fw:'#f4f1e8',fw2:'#e9e3d2',hw:'#f6eecf',hw2:'#efd98a',edge:'#2a2622',vein:'#2a2622',dots:'#e05a3a'},
  danaus:{n:'Danaus chrysippus',fw:'#d9822b',fw2:'#c0621a',hw:'#de8d33',hw2:'#c7691e',edge:'#1d1612',apex:1,dots:'#f6f2ea'},
  idea:{n:'Idea stolli',fw:'#f1eee4',fw2:'#e0dbc9',hw:'#f1eee4',hw2:'#e0dbc9',vein:'#3a3530',spots:'#262220',shape:'round'},
  hypolimnas:{n:'Hypolimnas bolina',fw:'#1e1a1e',fw2:'#2c252c',hw:'#1e1a1e',hw2:'#2c252c',patch:'#e8e4f2',patch2:'#6a5ab0',dots:'#efe9f2'},
  papilio:{n:'Papilio memnon',fw:'#1f2433',fw2:'#2f3a52',hw:'#1f2433',hw2:'#34405c',streak:'#7f8fae',shape:'long',eye:'#c8432c'},
  catopsilia:{n:'Catopsilia pomona',fw:'#f2dd6e',fw2:'#e6c33c',hw:'#f4e48a',hw2:'#e9cc52',edge:'#8a6a1c',shape:'round'},
  appias:{n:'Appias libythea',fw:'#f8f6f0',fw2:'#e8e4da',hw:'#f8f6f0',hw2:'#ece6d6',edge:'#3b3632',vein:'#7a746c'},
};
let gid=0;
function wings(s){const L=s.shape==='long',R=s.shape==='round';
  const fw=L?'M2 -3C12 -22 32 -38 54 -38C54 -26 48 -12 38 -3C26 -1 12 1 3 2Z':R?'M2 -3C8 -24 26 -38 42 -38C52 -30 52 -14 42 -2C28 0 14 1 3 2Z':'M2 -3C12 -20 30 -34 47 -36C50 -26 46 -12 38 -2C26 0 12 1 3 2Z';
  const hw=s.tail?'M3 1C16 2 32 4 37 12C40 22 32 30 26 33L28 48 22 34C14 36 6 28 2 10Z':R?'M3 1C18 2 36 6 39 16C41 28 30 38 18 38C8 38 4 26 2 10Z':L?'M3 1C14 2 32 6 36 14C38 24 30 32 20 34C10 34 4 24 2 10Z':'M3 1C16 2 34 4 38 12C40 24 30 34 18 36C10 36 4 26 2 10Z';
  return [fw,hw]}
/* a butterfly centred on 0,0 with a ~100 unit wingspan; pin=true adds the pin head */
function bfly(key,pin){const s=SP[key],id='rb'+(++gid),[fw,hw]=wings(s);let half='';
  const veins=(pts,o)=>pts.map(([x,y])=>`M${o[0]} ${o[1]}L${x} ${y}`).join('');
  const fv=veins([[46,-34],[48,-26],[46,-18],[42,-10],[36,-4],[28,-1]],[4,-1]),hv=veins([[36,10],[38,18],[34,26],[26,32],[16,35],[8,30]],[4,2]);
  let extra='';
  if(s.streak)extra+=`<path d="${veins([[44,-33],[46,-27],[44,-20],[40,-13]],[10,-4])}" stroke="${s.streak}" stroke-width="2.2" opacity=".55" stroke-linecap="round"/>`;
  if(s.band)extra+=[[14,-14,4],[20,-18,3.4],[26,-22,3],[31,-26,2.4],[10,-6,4.4],[12,8,4.6],[18,12,4.2],[24,17,3.6],[29,22,3]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.75}" fill="${s.band}" opacity=".9"/>`).join('');
  if(s.apex)extra+=`<path d="M30 -32C40 -37 50 -38 47 -36C50 -26 47 -18 42 -12C38 -18 33 -24 30 -32Z" fill="#1d1612"/>${[[38,-30],[42,-25],[40,-20],[44,-31]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.5" fill="#f6f2ea"/>`).join('')}`;
  if(s.patch)extra+=`<ellipse cx="22" cy="-14" rx="7" ry="5" fill="${s.patch}" opacity=".95"/><ellipse cx="22" cy="-14" rx="9.5" ry="7" fill="none" stroke="${s.patch2}" stroke-width="2" opacity=".7"/><ellipse cx="20" cy="16" rx="8" ry="6.5" fill="${s.patch}"/><ellipse cx="20" cy="16" rx="10.5" ry="8.5" fill="none" stroke="${s.patch2}" stroke-width="2.2" opacity=".7"/>`;
  if(s.spots)extra+=[[20,-20],[30,-24],[36,-14],[26,-10],[16,12],[26,18],[30,26],[14,24]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.3" fill="${s.spots}"/>`).join('');
  if(s.eye)extra+=`<ellipse cx="12" cy="8" rx="6" ry="4" fill="${s.eye}" opacity=".85"/>`;
  const edge=s.edge?`<path d="${fw}" fill="none" stroke="${s.edge}" stroke-width="${s.hwEdge?2.4:4}"/>${s.hwEdge||s.shape!=='round'?`<path d="${hw}" fill="none" stroke="${s.edge}" stroke-width="${s.hwEdge?5:3.6}"/>`:''}`:'';
  const dots=s.dots?[[47,-30],[46,-22],[43,-14],[38,-7],[36,13],[36,21],[31,28],[24,33],[15,35]].map(([x,y])=>`<circle cx="${x-2}" cy="${y}" r="1.1" fill="${s.dots}"/>`).join(''):'';
  half=`<g clip-path="url(#${id}h)"><path d="${hw}" fill="url(#${id}b)"/>${extra}<path d="${hv}" stroke="${s.vein||'#000'}" stroke-width=".5" opacity="${s.vein?.8:.35}"/>${edge}${dots}</g>
   <g clip-path="url(#${id}f)"><path d="${fw}" fill="url(#${id}a)"/>${extra}<path d="${fv}" stroke="${s.vein||'#000'}" stroke-width=".5" opacity="${s.vein?.8:.35}"/>${edge}${dots}</g>
   <path d="${hw}" fill="none" stroke="#000" stroke-width=".4" opacity=".35"/><path d="${fw}" fill="none" stroke="#000" stroke-width=".4" opacity=".35"/>`;
  return `<g><defs><linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="-.6"><stop offset="0" stop-color="${s.fw2}"/><stop offset="1" stop-color="${s.fw}"/></linearGradient>
    <linearGradient id="${id}b" x1="0" y1="0" x2="1" y2=".7"><stop offset="0" stop-color="${s.hw2}"/><stop offset="1" stop-color="${s.hw}"/></linearGradient>
    <clipPath id="${id}f"><path d="${fw}"/></clipPath><clipPath id="${id}h"><path d="${hw}"/></clipPath></defs>
   <g opacity=".22" transform="translate(3 5)" filter="url(#rmBlur)"><path d="${fw}${hw}" fill="#000"/><path d="${fw}${hw}" transform="scale(-1 1)" fill="#000"/></g>
   ${half}<g transform="scale(-1 1)">${half}</g>
   <path d="M-.6 -10Q-6 -24 -9 -30M.6 -10Q6 -24 9 -30" stroke="#1b1612" stroke-width=".55" fill="none"/><circle cx="-9" cy="-30" r=".9" fill="#1b1612"/><circle cx="9" cy="-30" r=".9" fill="#1b1612"/>
   <ellipse cx="0" cy="-6" rx="2.3" ry="5" fill="#2a221c"/><ellipse cx="0" cy="8" rx="1.7" ry="10" fill="#2f2620"/><circle cx="0" cy="-11.5" r="2" fill="#241d18"/>
   ${pin?`<circle cx="2" cy="-3" r="2.6" fill="#000" opacity=".25"/><circle cx="0" cy="-6" r="2.6" fill="url(#rmPin)"/>`:''}</g>`}
const DEFS=c=>`<defs><filter id="rmBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2"/></filter><radialGradient id="rmPin" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="${c.pin}"/><stop offset="1" stop-color="#000"/></radialGradient></defs>`;
const ROWS=[['troides','graphium','danaus'],['delias','hypolimnas','catopsilia'],['papilio','idea','appias']];
let uid=0;
function tray(c,o){let s='';const no=(r,k)=>String(r*3+k+1).padStart(2,'0');const d=new Date((o.date||'2026-01-01')+'T00:00:00'),ds=isNaN(d)?'':`${d.getDate()}.${['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][d.getMonth()]}.${d.getFullYear()}`;
  ROWS.forEach((row,r)=>row.forEach((k,j)=>{const x=60+j*120,y=52+r*124;
    s+=`<g transform="translate(${x} ${y}) scale(.86) rotate(${(j-1)*3+(r-1)*2})">${bfly(k,true)}</g>
     <g transform="translate(${x} ${y+56})"><rect x="-34" y="-8" width="68" height="17" fill="${c.label}" stroke="${c.ink}" stroke-width=".35"/><text y="-.6" text-anchor="middle" font-family="IM Fell English, serif" font-style="italic" font-size="6.4" fill="${c.ink}">${SP[k].n}</text>
     <text y="6.4" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="4.4" letter-spacing=".3" fill="${c.ink}" opacity=".75">No.${no(r,j)} · ${ds}</text></g>`}));
  return `<svg class="rm-tray" viewBox="0 0 360 380">${DEFS(c)}${s}</svg>`}
FAMILY({key:'rama',name:'Rama-rama',meaning:'Butterfly specimen box',
  blurb:'Malaysian butterflies pinned in rows with tiny typed labels, under a glass lid that slides away.',
  fonts:{d:"'IBM Plex Mono', monospace",s:"'Italianno', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';return `<section class="page pg-rama" style="--wood:${c.wood};--woodL:${c.woodL};--label:${c.label}"><div class="rm-box reveal"><div class="rm-in"><i class="rm-lin"></i>
    <svg class="rm-big" viewBox="-60 -50 120 100">${DEFS(c)}${bfly(c.hero,true)}</svg>
    <p class="rm-sp reveal d1">${SP[c.hero].n} &middot; ${en?'specimen no.':'spesimen no.'} 1</p>
    <p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
    <div class="rm-rule reveal d2"><i></i><b></b><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(fmtTime(o.start,o.lang))} &middot; ${esc(o.venue)}</p></div><i class="rm-mitre"></i></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',[a,b]=K.initials(o);++uid;
    return `<div class="cover cv-rama" style="--wood:${c.wood};--woodL:${c.woodL};--label:${c.label}"><div class="rm-box"><div class="rm-in"><i class="rm-lin"></i>
      <div class="rm-title"><p class="rm-k">${ev(o,L)}</p><p class="rm-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</p><p class="rm-d">${esc(fmtDate(o.date,o.lang))}</p><i class="rm-tp l"></i><i class="rm-tp r"></i></div>
      ${tray(c,o)}
      <div class="rm-guest">${guest?`<span>${L.dear}</span><b>${esc(guest)}</b>`:`<b>${esc(o.venue)}</b>`}<i class="rm-tp l"></i></div></div>
      <div class="rm-glass"><i></i></div><i class="rm-mitre"></i>
      <${tag} class="rm-plate" ${attr} aria-label="${L.open}"><span>${esc(a)} &amp; ${esc(b)}</span></${tag}></div>
     <p class="rm-hint">${en?'Open invitation':'Buka Jemputan'}</p></div>`},
  skin(el,o,th){const c=th.c;K.cards(el);const keys=Object.keys(SP);el.style.setProperty("--wood",c.wood);el.style.setProperty("--woodL",c.woodL);el.style.setProperty("--label",c.label);
    K.secs(el).forEach((s,i)=>{s.insertAdjacentHTML('afterbegin',`<svg class="rm-sk ${i%2?'r':'l'}" viewBox="-60 -50 120 100">${DEFS(c)}<g transform="rotate(${i%2?14:-14})">${bfly(keys[(i*4+1)%keys.length],true)}</g></svg>`);
      const h=s.querySelector('h2');if(h){h.classList.add('rm-lab');h.insertAdjacentHTML('beforeend',`<small>No. ${String(i+1).padStart(2,'0')} &middot; ${esc(SP[keys[(i*4+1)%keys.length]].n)}</small>`)}})},
  themes:[
    {k:'walnut',n:'Kayu Walnut',desc:'Walnut frame, cream linen',c:{ground:'#d8cfc2',sheet:'#f4efe4',ink:'#2f2a24',accent:'#5a3a2a',gold:'#b8924e',pagefg:'#2f2a24',wood:'#5a3a24',woodL:'#7a5234',label:'#fbf8f0',pin:'#2a2a2a',hero:'troides'}},
    {k:'hitam',n:'Hitam',desc:'Ebony frame, ivory linen',c:{ground:'#1a1817',sheet:'#ece6da',ink:'#26221e',accent:'#2c2620',gold:'#c4a15a',pagefg:'#ece4d6',wood:'#1c1916',woodL:'#3a332c',label:'#fbf8f0',pin:'#b8924e',hero:'graphium'}},
    {k:'oak',n:'Kayu Oak',desc:'Pale oak, white linen',c:{ground:'#ece6dc',sheet:'#faf8f3',ink:'#33302a',accent:'#4a5a3a',gold:'#b49a5a',pagefg:'#33302a',wood:'#b08a5c',woodL:'#cfae80',label:'#ffffff',pin:'#2a2a2a',hero:'danaus'}},
    {k:'mahogani',n:'Mahogani',desc:'Mahogany frame, blush linen',c:{ground:'#3a1f1a',sheet:'#f5ebe4',ink:'#3a2622',accent:'#7a2f2c',gold:'#c39a5e',pagefg:'#f3e3d8',wood:'#5e2a1e',woodL:'#86402c',label:'#fdf7f2',pin:'#2a2a2a',hero:'hypolimnas'}},
    {k:'sage',n:'Sage',desc:'Painted sage frame, ivory',c:{ground:'#d9ddd0',sheet:'#f8f6ee',ink:'#2e342a',accent:'#4a5c3e',gold:'#a8955a',pagefg:'#2e342a',wood:'#7c8a6c',woodL:'#9aa888',label:'#fffdf6',pin:'#b8924e',hero:'catopsilia'}},
    {k:'nila',n:'Nila',desc:'Indigo frame, pale linen',c:{ground:'#1c2438',sheet:'#f2efe8',ink:'#252a38',accent:'#2c3a62',gold:'#c4a868',pagefg:'#e8e8ee',wood:'#22304e',woodL:'#3a4a6e',label:'#fbfaf6',pin:'#b8924e',hero:'papilio'}},
    {k:'gading',n:'Gading',desc:'Ivory painted frame, gilt',c:{ground:'#e6dfd2',sheet:'#fbf9f4',ink:'#38322a',accent:'#7a5a3a',gold:'#b8944e',pagefg:'#38322a',wood:'#e4dccb',woodL:'#f6f0e2',label:'#ffffff',pin:'#2a2a2a',hero:'delias'}},
    {k:'zamrud',n:'Zamrud',desc:'Deep green frame, cream',c:{ground:'#132a22',sheet:'#f3efe4',ink:'#24302a',accent:'#1f4a3a',gold:'#c4a45e',pagefg:'#e6eee8',wood:'#1c3a2e',woodL:'#2e5444',label:'#fbf8f0',pin:'#b8924e',hero:'idea'}},
  ]});
