/* bauhaus: a printed geometric poster (circle, half and quarter discs, bars, construction grid) on off-white stock.
   Cover: the poster taped to a wall; on tap the shapes slide home into a locked composition, then the poster lifts away.
   Page: a full-bleed poster with the names set lowercase in a geometric grotesque. Skin: numbered geometric heading blocks. */
needFont('Jost:wght@300;400;500;600;700;800');
const F="'Jost', sans-serif",MONO="'IBM Plex Mono', monospace";
// a halftone of circles inside a disc, darker towards (dx,dy); one path for all dots
function dots(cx,cy,R,step,dx,dy,maxR,bias=.15){let d='';const a=.26,ca=Math.cos(a),sa=Math.sin(a);
  for(let i=-R-step;i<=R+step;i+=step)for(let j=-R-step;j<=R+step;j+=step){const x=i*ca-j*sa,y=i*sa+j*ca;if(x*x+y*y>(R-1)*(R-1))continue;
    const t=Math.max(0,Math.min(1,((x*dx+y*dy)/R+bias)/(1+bias)));const r=maxR*Math.pow(t,1.15);if(r<.28)continue;
    const X=(cx+x-r).toFixed(1),Y=(cy+y).toFixed(1);d+=`M${X} ${Y}a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(2*r).toFixed(2)} 0a${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(-2*r).toFixed(2)} 0`}
  return d}
const fit=(s,max,fs,k=.56)=>Math.min(fs,max/Math.max(1,(s||'').length*k));
const reg=(x,y,c)=>`<g fill="none" stroke="${c}" stroke-width=".55"><circle cx="${x}" cy="${y}" r="3.4"/><path d="M${x-6} ${y}h12M${x} ${y-6}v12"/></g>`;
const crop=(x,y,sx,sy,c)=>`<path d="M${x+sx*3} ${y}h${sx*9}M${x} ${y+sy*3}v${sy*9}" stroke="${c}" stroke-width=".5" fill="none"/>`;
function strip(c,x,y){const cols=[c.ink,c.accent,c.gold,c.c3];return `<g>${cols.map((k,i)=>`<rect x="${x+i*9}" y="${y}" width="8" height="5" fill="${k}"/>`).join('')}
  <rect x="${x+36}" y="${y}" width="8" height="5" fill="${c.ink}" opacity=".7"/>
  <rect x="${x+45}" y="${y}" width="8" height="5" fill="${c.ink}" opacity=".45"/></g>`}
let uid=0;
function poster(o,th,L,guest){const c=th.c,u=++uid,[n1,n2]=coverNames(o),en=o.lang==='en';
  const d=new Date((o.date||'2026-01-01')+'T00:00:00'),dd=String(d.getDate()).padStart(2,'0'),mm=String(d.getMonth()+1).padStart(2,'0');
  const f1=fit(n1,236,50),f2=fit('& '+n2,236,50);
  const grid=Array.from({length:7},(_,i)=>`M${20+i*43.3} 46V504`).join('')+Array.from({length:12},(_,i)=>`M20 ${46+i*41.3}H280`).join('');
  return `<svg class="bh-art" viewBox="0 0 300 520" aria-hidden="true">
  <defs><clipPath id="bhc${u}"><circle cx="188" cy="146" r="88"/></clipPath><clipPath id="bhq${u}"><rect x="0" y="0" width="300" height="520"/></clipPath></defs>
  <path d="${grid}" stroke="${c.ink}" stroke-width=".35" opacity=".16" fill="none"/>
  ${crop(20,20,-1,-1,c.ink)}${crop(280,20,1,-1,c.ink)}${crop(20,500,-1,1,c.ink)}${crop(280,500,1,1,c.ink)}
  ${reg(150,9,c.ink)}${reg(150,511,c.ink)}${strip(c,224,7)}
  <text x="20" y="13" class="bh-mono" fill="${c.ink}" font-size="5.4">${en?'proof 01 · offset litho':'pruf 01 · cetakan offset'}</text>
  <g class="bh-s bh-arcs" fill="none" stroke="${c.ink}" stroke-width=".5" stroke-dasharray="1.5 2.5" opacity=".5"><circle cx="280" cy="520" r="138"/><circle cx="280" cy="520" r="152"/><circle cx="188" cy="146" r="101"/><path d="M188 36V258M78 146H298" stroke-dasharray="none" opacity=".55"/></g>
  <g class="bh-s bh-circ"><circle cx="188" cy="146" r="88" fill="${c.accent}"/><path d="${dots(188,146,88,4.6,-.62,.78,2.25,.05)}" fill="${c.ink}" opacity=".78"/>
   <circle cx="188" cy="146" r="56" fill="none" stroke="${c.sheet}" stroke-width=".8" opacity=".7"/><circle cx="188" cy="146" r="3" fill="${c.sheet}"/></g>
  <rect x="20" y="52" width="10" height="210" fill="${c.ink}"/>
  <text class="bh-cap" transform="translate(13 258) rotate(-90)" fill="${c.ink}" font-size="6.6">${ev(o,L)} &#8212; ${esc(fmtShort(o.date))}</text>
  <g class="bh-s bh-half"><path d="M34 262a58 58 0 0 1 116 0Z" fill="${c.c3}"/><path d="M56 262a36 36 0 0 1 72 0" fill="none" stroke="${c.sheet}" stroke-width="5"/><path d="M71 262a21 21 0 0 1 42 0Z" fill="${c.ink}"/></g>
  <rect x="20" y="262" width="260" height="13" fill="${c.ink}"/>
  <g class="bh-s bh-sq"><rect x="236" y="284" width="22" height="22" fill="${c.accent}"/><rect x="262" y="284" width="18" height="22" fill="none" stroke="${c.ink}" stroke-width="1"/></g>
  <circle cx="212" cy="295" r="5.5" fill="${c.ink}"/>
  <text x="20" y="36" class="bh-k" fill="${c.ink}" font-size="8.4">${en?'invitation':'kad jemputan'}</text>
  <text x="280" y="36" text-anchor="end" class="bh-mono" fill="${c.ink}" font-size="7.6">no. ${dd} / ${mm}</text>
  <path d="M20 42H280" stroke="${c.ink}" stroke-width="1.3"/>
  <text x="18" y="334" class="bh-name" fill="${c.ink}" font-size="${f1.toFixed(1)}">${esc(n1)}</text>
  <text x="18" y="${(334+f2*.98).toFixed(1)}" class="bh-name" fill="${c.ink}" font-size="${f2.toFixed(1)}"><tspan fill="${c.accent}">&amp;</tspan> ${esc(n2)}</text>
  <g class="bh-s bh-quart" clip-path="url(#bhq${u})"><path d="M280 404a116 116 0 0 0-116 116H280Z" fill="${c.gold}"/><path d="M280 438a82 82 0 0 0-82 82" fill="none" stroke="${c.sheet}" stroke-width=".7" opacity=".6"/>
   <text x="272" y="500" text-anchor="end" class="bh-num" fill="${c.sheet}" font-size="34">${dd}<tspan font-size="16" dx="2">.${mm}</tspan></text></g>
  <path d="M20 414H190" stroke="${c.ink}" stroke-width=".8"/>
  <g class="bh-info" fill="${c.ink}"><text x="20" y="431" class="bh-lab" font-size="6.4">${en?'date':'tarikh'}</text><text x="62" y="431" class="bh-val" font-size="9.4">${esc(fmtDate(o.date,o.lang))}</text>
   <text x="20" y="447" class="bh-lab" font-size="6.4">${en?'time':'masa'}</text><text x="62" y="447" class="bh-val" font-size="9.4">${esc(fmtTime(o.start,o.lang))}</text>
   <text x="20" y="463" class="bh-lab" font-size="6.4">${en?'venue':'tempat'}</text><text x="62" y="463" class="bh-val" font-size="9.4">${esc(o.venue)}</text></g>
  ${guest?`<path d="M20 474H150" stroke="${c.ink}" stroke-width=".5" opacity=".5"/><text x="20" y="488" class="bh-lab" fill="${c.ink}" font-size="6.4">${en?'for':'kepada'}</text><text x="62" y="488" class="bh-val bh-guest" fill="${c.accent}" font-size="9.6">${esc(guest)}</text>`:''}
  </svg>`}
function pageArt(o,th){const c=th.c,u=++uid;const d=new Date((o.date||'2026-01-01')+'T00:00:00'),dd=String(d.getDate()).padStart(2,'0');
  return `<svg class="bh-part" viewBox="0 0 350 292" aria-hidden="true"><defs><clipPath id="bpq${u}"><rect width="350" height="292"/></clipPath></defs>
  <g fill="none" stroke="${c.ink}" stroke-width=".5" stroke-dasharray="1.5 2.5" opacity=".5"><circle cx="0" cy="0" r="138"/><circle cx="0" cy="0" r="152"/><circle cx="236" cy="128" r="118"/><path d="M236 0V280M100 128H350" stroke-dasharray="none" opacity=".5"/></g>
  <g clip-path="url(#bpq${u})"><path d="M0 0H122A122 122 0 0 1 0 122Z" fill="${c.c3}"/><path d="M0 92A92 92 0 0 0 92 0" fill="none" stroke="${c.sheet}" stroke-width="5"/></g>
  <circle cx="236" cy="128" r="104" fill="${c.accent}"/><path d="${dots(236,128,104,4.8,-.6,.8,2.4,.05)}" fill="${c.ink}" opacity=".78"/>
  <circle cx="236" cy="128" r="66" fill="none" stroke="${c.sheet}" stroke-width=".8" opacity=".7"/><circle cx="236" cy="128" r="3.2" fill="${c.sheet}"/>
  <text x="14" y="226" class="bh-num" fill="${c.ink}" font-size="118" letter-spacing="-6">${dd}</text>
  <rect x="0" y="232" width="350" height="14" fill="${c.ink}"/>
  <path d="M150 232a46 46 0 0 1 92 0Z" fill="${c.gold}"/><path d="M168 232a28 28 0 0 1 56 0" fill="none" stroke="${c.sheet}" stroke-width="4"/>
  <rect x="300" y="254" width="22" height="22" fill="${c.accent}"/><rect x="326" y="254" width="22" height="22" fill="none" stroke="${c.ink}"/><circle cx="284" cy="265" r="6" fill="${c.ink}"/>
  <text x="14" y="264" class="bh-mono" fill="${c.ink}" font-size="8">${esc(fmtShort(o.date))}</text></svg>`}
const SH=['circ','quart','tri','sq','half','bar'];
FAMILY({key:'bauhaus',name:'Bauhaus',meaning:'Geometric print poster',
  blurb:'A printed Bauhaus poster of discs, half-discs and bars on off-white stock, the names set lowercase; the shapes lock into place and the poster lifts away.',
  fonts:{d:F,s:F,b:F},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-bauhaus" style="--c3:${c.c3}"><i class="bh-grid"></i><i class="bh-grain"></i>
    <header class="bh-hd reveal"><span>${en?'invitation':'kad jemputan'}</span><span>${ev(o,L)}</span><span>${esc(String(new Date((o.date||'2026')+'T00:00:00').getFullYear()))}</span></header>
    <div class="bh-pa reveal d1">${pageArt(o,th)}</div>
    <h1 class="names bh-nm reveal d1">${esc(n1)}<span class="amp"><em>&amp;</em> ${esc(n2)}</span></h1>
    <p class="bh-host reveal d2"><span>${en?'hosted by':'anjuran'}</span>${esc(o.hosts||'')}</p>
    <div class="bh-row reveal d2"><div><span>${en?'date':'tarikh'}</span><b>${esc(fmtDate(o.date,o.lang))}</b></div><div><span>${en?'time':'masa'}</span><b>${esc(fmtTime(o.start,o.lang))}</b></div><div class="w"><span>${en?'venue':'tempat'}</span><b>${esc(o.venue)}</b></div></div>
    <footer class="bh-ft reveal d3"><i style="background:var(--ink)"></i><i style="background:var(--accent)"></i><i style="background:var(--gold)"></i><i style="background:var(--c3)"></i><span>${esc(o.hijri||'')}</span></footer></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-bauhaus" style="--c3:${th.c.c3}"><div class="bh-wall"></div>
    <p class="bh-wtop">${en?'Kindly open':'Sila buka'} <b>&#8212;</b> ${ev(o,L)}</p>
    <${tag} class="bh-poster" ${attr} aria-label="${L.open}"><i class="bh-tape l"></i><i class="bh-tape r"></i>${poster(o,th,L,guest)}<i class="bh-grain"></i></${tag}>
    <p class="bh-hint"><i></i>${en?'Open invitation':'Buka Jemputan'}<i></i></p></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--c3',th.c.c3);
    $$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(!h)return;s.classList.add('bh-sec');
      h.insertAdjacentHTML('afterbegin',`<i class="bh-tile t-${SH[i%SH.length]}"></i><b class="bh-no">${String(i+1).padStart(2,'0')}</b>`);
      s.insertAdjacentHTML('afterbegin','<i class="bh-cbar"></i>')})},
  themes:[
    {k:'klasik',n:'Klasik',desc:'Red, blue and yellow on a dark wall',c:{ground:'#262421',sheet:'#efe9dc',ink:'#191919',accent:'#d33a25',gold:'#1f4f9e',c3:'#f0b31c',pagefg:'#efe9dc',line:'rgba(25,25,25,.85)'}},
    {k:'kertas',n:'Kertas',desc:'Primaries on a pale gallery wall',c:{ground:'#d8d2c5',sheet:'#f3eee3',ink:'#1a1a1a',accent:'#e0412b',gold:'#2557a8',c3:'#f2b820',pagefg:'#1a1a1a',line:'rgba(26,26,26,.85)'}},
    {k:'terakota',n:'Terakota',desc:'Earthy terracotta, ochre and teal',c:{ground:'#3b2a21',sheet:'#ece1cd',ink:'#2a201b',accent:'#c0582f',gold:'#2d5c56',c3:'#d9a033',pagefg:'#ece1cd',line:'rgba(42,32,27,.85)'}},
    {k:'lumut',n:'Lumut',desc:'Olive, rust and mustard on linen',c:{ground:'#e2dbc9',sheet:'#f3eddf',ink:'#23261f',accent:'#a8462f',gold:'#5d6d33',c3:'#e1b347',pagefg:'#23261f',line:'rgba(35,38,31,.85)'}},
    {k:'nila',n:'Nila',desc:'Orange and cobalt on navy',c:{ground:'#15213b',sheet:'#efe8d8',ink:'#15213b',accent:'#e65c37',gold:'#2c6db3',c3:'#f3c444',pagefg:'#efe8d8',line:'rgba(21,33,59,.85)'}},
    {k:'jambu',n:'Jambu',desc:'Rose, navy and saffron on blush',c:{ground:'#efd8d0',sheet:'#f8f0e7',ink:'#2a1f25',accent:'#d34f6a',gold:'#2b4785',c3:'#f0a52c',pagefg:'#2a1f25',line:'rgba(42,31,37,.85)'}},
    {k:'hitam',n:'Hitam',desc:'A black poster printed in bright primaries',c:{ground:'#0d0d0d',sheet:'#1d1c1a',ink:'#eee7d8',accent:'#e4472f',gold:'#3f78cc',c3:'#f2c12c',pagefg:'#eee7d8',line:'rgba(238,231,216,.7)'}},
    {k:'sage',n:'Sage',desc:'Coral and pine on a sage wall',c:{ground:'#9ba692',sheet:'#f1eee3',ink:'#1e2a24',accent:'#d4683a',gold:'#2f5a4c',c3:'#e7bf55',pagefg:'#16201b',line:'rgba(30,42,36,.85)'}},
  ]});
