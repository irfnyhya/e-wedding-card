/* muzium: a gallery wall under a track spotlight. A carved gilt frame holds an abstract colour-field painting,
   a wall placard beside it, a brass-post rope barrier in front. Opening: the spotlight brightens and the frame fades.
   Page: the placard, the couple as "the work", the date and venue as provenance. Skin: museum-placard labels. */
let mzN=0;
// carved gilt corner: scrolls and a shell fan, gold gradient with a dark tooled line
function mzCorner(c,u){const sh=Array.from({length:7},(_,i)=>{const a=(-90+i*15)*Math.PI/180+Math.PI/4*0;const r=13;return `<path d="M15 15L${(15+Math.cos((i*15)*Math.PI/180)*r).toFixed(1)} ${(15+Math.sin((i*15)*Math.PI/180)*r).toFixed(1)}" />`}).join('');
  return `<svg class="muzium-cn" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="mzg${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2c4"/><stop offset=".3" stop-color="${c.gold}"/><stop offset=".62" stop-color="#7a5820"/><stop offset="1" stop-color="${c.gold}"/></linearGradient></defs>
   <g fill="url(#mzg${u})" stroke="#4a3412" stroke-width=".6" stroke-linejoin="round">
    <path d="M2 2H44C38 4 34 8 33 13C32 19 37 22 40 19C43 16 40 12 37 14C38 9 43 7 49 8C42 11 41 20 35 24C29 28 22 24 20 20C17 26 22 31 18 36C14 41 8 40 8 46C7 40 4 38 2 38Z"/>
    <path d="M10 10C18 6 27 8 30 14C26 12 20 12 16 16C12 20 12 26 14 30C8 27 6 18 10 10Z" opacity=".95"/>
    <circle cx="11" cy="11" r="3.2"/><path d="M44 2C50 3 54 6 56 10C52 8 48 8 46 9Z"/><path d="M2 44C3 50 6 54 10 56C8 52 8 48 9 46Z"/></g>
   <g fill="none" stroke="#fff2c4" stroke-opacity=".55" stroke-width=".5">${sh}</g></svg>`}
function mzPainting(){return `<span class="muzium-canvas"><i class="muzium-b a"></i><i class="muzium-b b"></i><i class="muzium-b c"></i><i class="muzium-tex"></i></span>`}
function mzFrame(c,u,small){return `<span class="muzium-frame${small?' sm':''}"><i class="muzium-bead"></i><i class="muzium-cove"></i><i class="muzium-slip"></i>${mzPainting()}
  ${['tl','tr','bl','br'].map(k=>`<i class="muzium-cw ${k}">${mzCorner(c,u)}</i>`).join('')}<i class="muzium-crest t"></i><i class="muzium-crest b"></i></span>`}
const MZ_CREST=svgUriSq(`<svg ${NS} viewBox="0 0 60 24"><path d="M30 2C34 8 40 10 48 9C44 13 38 14 34 13C36 17 40 19 46 19C40 23 33 21 30 16C27 21 20 23 14 19C20 19 24 17 26 13C22 14 16 13 12 9C20 10 26 8 30 2Z"/></svg>`);
function mzPlacard(o,L,big){const [n1,n2]=coverNames(o),en=o.lang==='en',d=new Date((o.date||'')+'T00:00:00'),ok=!isNaN(d);
  const acc=ok?`${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`:'';
  if(!big)return `<span class="muzium-pl"><b>${esc(n1)} &amp; ${esc(n2)}</b><small>${en?'Malaysia, b.':'Malaysia, l.'} ${ok?d.getFullYear():''}</small><i>${ev(o,L)}</i><small>${en?'Love, prayers and blessings on canvas':'Kasih, doa dan restu di atas kanvas'}</small><em>No. ${acc}</em></span>`;
  return `<div class="muzium-plc"><p class="muzium-acc"><span>No. ${acc}</span><span>${en?'Gallery':'Galeri'} 1</span></p>
   <h1 class="names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1><p class="muzium-orig">${en?'The bride and groom · Malaysia, b.':'Pengantin · Malaysia, l.'} ${ok?d.getFullYear():''}</p>
   <p class="muzium-title"><i>${ev(o,L)}</i>, ${ok?d.getFullYear():''}</p><p class="muzium-med">${en?'Love, prayers and blessings on the canvas of life':'Kasih, doa dan restu di atas kanvas kehidupan'}</p>
   <p class="muzium-lab">${en?'Provenance':'Provenans'}</p><p class="muzium-txt">${en?'On view':'Dipamerkan pada'} ${esc(fmtDate(o.date,o.lang))}${o.hijri?` (${esc(o.hijri)})`:''}, ${esc(fmtTime(o.start,o.lang))} – ${esc(fmtTime(o.end,o.lang))}, ${en?'at':'di'} <b>${esc(o.venue)}</b>${o.address?`, ${esc(o.address)}`:''}.</p>
   ${o.hosts?`<p class="muzium-lab">${en?'Courtesy of':'Ihsan'}</p><p class="muzium-txt">${esc(o.hosts)}</p>`:''}
   <p class="muzium-note">${en?'Your presence completes the collection.':'Kehadiran anda melengkapkan koleksi ini.'}</p></div>`}

FAMILY({key:'muzium',name:'Muzium',meaning:'Gallery painting',
  blurb:'A carved gilt frame under a gallery spotlight, an abstract painting and a wall placard; the light brightens, the frame fades, and the placard names the couple as the work.',
  fonts:{d:"'Jost', sans-serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const c=th.c,en=o.lang==='en',u=++mzN;
    return `<section class="page pg-muzium" style="--p1:${c.p1};--p2:${c.p2};--p3:${c.p3};--crest:${MZ_CREST}"><div class="muzium-wall"></div><i class="muzium-pool"></i>
     <p class="muzium-wt reveal">${en?'Exhibition':'Pameran'} · <b>${ev(o,L)}</b></p>
     <div class="muzium-mini reveal d1">${mzFrame(c,u,true)}</div>
     <div class="reveal d2 muzium-plw">${mzPlacard(o,L,true)}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en',u=++mzN,[n1,n2]=coverNames(o);
    return `<div class="cover cv-muzium" style="--p1:${c.p1};--p2:${c.p2};--p3:${c.p3};--crest:${MZ_CREST}"><div class="muzium-wall"></div>
     <i class="muzium-rail"></i><i class="muzium-lamp"></i><i class="muzium-cone"></i><i class="muzium-pool"></i><i class="muzium-glow"></i>
     <div class="muzium-head"><p class="muzium-ex">${en?'Exhibition':'Pameran'}</p><p class="muzium-ttl">${ev(o,L)}</p><p class="muzium-who">${esc(n1)} &amp; ${esc(n2)}</p></div>
     <${tag} class="muzium-tap" ${attr} aria-label="${L.open}">${mzFrame(c,u,false)}</${tag}>
     ${mzPlacard(o,L,false)}
     <i class="muzium-floor"></i><i class="muzium-post l"></i><i class="muzium-post r"></i><svg class="muzium-rope" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M4 6C80 52 220 52 296 6" fill="none" stroke="${c.rope}" stroke-width="7" stroke-linecap="round"/><path d="M4 6C80 52 220 52 296 6" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2" stroke-dasharray="3 4" transform="translate(0 -1.5)"/></svg>
     <div class="muzium-foot">${guest?`<p class="muzium-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="muzium-hint">${en?'Touch the painting':'Sentuh lukisan'}</p></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c,en=o.lang==='en',d=new Date((o.date||'')+'T00:00:00'),y=isNaN(d)?'':d.getFullYear();
    el.style.setProperty('--p1',c.p1);el.style.setProperty('--p2',c.p2);el.style.setProperty('--p3',c.p3);
    $$('.sec',el).forEach((s,i)=>{s.classList.add('muzium-sec');const h=$('h2',s);if(!h)return;
      h.innerHTML=`<span class="muzium-hp"><em>No. ${y}.${String(i+1).padStart(2,'0')}</em><b>${h.innerHTML}</b><i>${ev(o,L)}, ${y}</i></span>`})},
  themes:[
    {k:'hijau',n:'Hijau Galeri',desc:'Museum-green wall, terracotta canvas',c:{ground:'#2f4a40',sheet:'#f7f4ee',ink:'#22201c',accent:'#a5482f',gold:'#c9a24f',pagefg:'#efe9dc',p1:'#b0503a',p2:'#e2b46a',p3:'#3d2a2a',rope:'#6e1a22'}},
    {k:'merah',n:'Merah',desc:'Oxblood wall, blue and sand canvas',c:{ground:'#5a1e22',sheet:'#f8f4ec',ink:'#241c1a',accent:'#1f3a5a',gold:'#d0aa58',pagefg:'#f3e6d6',p1:'#1f3a5a',p2:'#d9c39a',p3:'#7a2a24',rope:'#1e2a3c'}},
    {k:'putih',n:'Putih',desc:'White gallery, blue and ochre canvas',c:{ground:'#e9e6e0',sheet:'#ffffff',ink:'#22201d',accent:'#2e4a6b',gold:'#c39a4c',pagefg:'#2a2622',p1:'#2e4a6b',p2:'#d7a541',p3:'#a33b2e',rope:'#7a1f28'}},
    {k:'nila',n:'Nila',desc:'Navy wall, rust and cream canvas',c:{ground:'#1d2a44',sheet:'#f7f4ee',ink:'#1e2230',accent:'#b0563a',gold:'#d2ac60',pagefg:'#ece6d8',p1:'#c2603e',p2:'#ead7b5',p3:'#2a3f5f',rope:'#7a2228'}},
    {k:'kelabu',n:'Kelabu',desc:'Slate wall, ochre and teal canvas',c:{ground:'#5f5e5a',sheet:'#f7f5f0',ink:'#22211f',accent:'#3b5a54',gold:'#cfaa5c',pagefg:'#f1ece2',p1:'#d4a64a',p2:'#3b5a54',p3:'#e8dcc4',rope:'#2c2a28'}},
    {k:'jambu',n:'Jambu',desc:'Blush wall, plum and peach canvas',c:{ground:'#d4b2ac',sheet:'#fffaf7',ink:'#2e2224',accent:'#7a2f3f',gold:'#b88f4e',pagefg:'#3a2628',p1:'#7a2f3f',p2:'#e8c9a8',p3:'#4a5a4e',rope:'#5a1f2c'}},
    {k:'hitam',n:'Hitam',desc:'Black wall, deep red and gold canvas',c:{ground:'#171616',sheet:'#f6f2ea',ink:'#1d1b18',accent:'#8a2f2a',gold:'#cfa75c',pagefg:'#ece4d4',p1:'#8a2f2a',p2:'#c49a52',p3:'#2d2b28',rope:'#5c1a1e'}},
    {k:'sage',n:'Sage',desc:'Sage wall, forest and wheat canvas',c:{ground:'#949f88',sheet:'#fbf9f2',ink:'#1f241c',accent:'#2f4a3a',gold:'#c3a058',pagefg:'#1f241c',p1:'#2f4a3a',p2:'#e3cfa0',p3:'#9a4a30',rope:'#2f4a3a'}},
  ]});
