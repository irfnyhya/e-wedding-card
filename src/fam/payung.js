/* payung: an oil-paper umbrella (payung kertas) lying closed across a sheet of paper (velvet on the dark colourways):
   pleated waxed paper with a coloured band, tied with a cord, bamboo ribs gathered to the runner and a thread-wrapped handle.
   Cover: tap "Buka Jemputan" and the umbrella is lifted up and away off the paper.
   Page: the open canopy, seen from above, rises over the top of the screen like an arch above the card. Skin: paper cards with a fine rib fan
   over each heading. */
needFont('Marcellus');
const pq=n=>+n.toFixed(2);
const PN=32;
// the canopy edge: the paper sags a little between rib tips
const pyEdge=(()=>{const p=[];for(let i=0;i<PN*2;i++){const a=i/(PN*2)*Math.PI*2-Math.PI/2,r=i%2?49.2:50;p.push(`${pq(50+Math.cos(a)*r)}% ${pq(50+Math.sin(a)*r)}%`)}return `polygon(${p.join(',')})`})();
// fine work drawn over the paper: rim thread, rib tips, the band, thread rings and the wrapped cap
const pyLines=()=>{let rim='',tips='';
  for(let i=0;i<PN*2;i++){const a=i/(PN*2)*Math.PI*2-Math.PI/2,r=i%2?98.4:100;rim+=`${i?'L':'M'}${pq(Math.cos(a)*r)} ${pq(Math.sin(a)*r)}`}
  for(let i=0;i<PN;i++){const a=i/PN*Math.PI*2-Math.PI/2;tips+=`<circle cx="${pq(Math.cos(a)*98.6)}" cy="${pq(Math.sin(a)*98.6)}" r=".9"/>`}
  const rings=[13.4,14.4].map(r=>`<circle style="stroke:var(--thread)" r="${r}" fill="none" stroke-width=".4" opacity=".9"/>`).join('');
  const wrap=[6.2,7.2,8.2,9.2,10.2].map((r,i)=>`<circle r="${r}" fill="none" stroke="${i%2?'var(--thread)':'var(--band)'}" stroke-width=".9"/>`).join('');
  return `<svg class="py-lines" viewBox="-100 -100 200 200" aria-hidden="true">
    <defs><radialGradient id="pyc" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fffaf0" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></radialGradient>
    <filter id="pyb"><feGaussianBlur stdDeviation=".35"/></filter></defs>
    <path d="${rim}Z" fill="none" stroke="rgba(0,0,0,.22)" stroke-width=".6"/><path d="${rim}Z" fill="none" stroke="rgba(255,255,255,.3)" stroke-width=".4" transform="scale(.985)"/>
    <g fill="rgba(0,0,0,.45)">${tips}</g>
    ${rings}
    ${wrap}<circle style="fill:var(--canopy)" r="5.4"/><circle r="5.4" fill="url(#pyc)"/><circle cx="-1" cy="-1.2" r="1.3" fill="rgba(255,255,255,.45)"/></svg>`};
// the closed umbrella as it lies on the table: tip at the top, pleated paper gathered round the shaft, a cord tied round it,
// the bamboo ribs gathered to the runner, then the bare shaft and a thread-wrapped handle (120 x 460 box)
let pyU=0;
const pyClosed=()=>{const u=++pyU,K=10,hem=Array.from({length:K+1},(_,i)=>30+i*60/K);
  const hy=x=>300+7*Math.sin((x-30)/60*Math.PI);
  const ctl=x=>[pq(60+(x-60)*.72),178];
  let fac='',lines='',scal='';
  for(let i=0;i<K;i++){const a=hem[i],b=hem[i+1],[ca,cy]=ctl(a),[cb]=ctl(b);
    fac+=`<path d="M60 32Q${ca} ${cy} ${pq(a)} ${pq(hy(a))}L${pq(b)} ${pq(hy(b))}Q${cb} ${cy} 60 32Z" fill="${i%2?'rgba(0,0,0,.14)':'rgba(255,255,255,.05)'}"/>`;
    const m=(a+b)/2;scal+=`<path d="M${pq(a)} ${pq(hy(a))}Q${pq(m)} ${pq(hy(m)+3.2)} ${pq(b)} ${pq(hy(b))}"/>`}
  hem.forEach(x=>{const [c,cy]=ctl(x);lines+=`M60 32Q${c} ${cy} ${pq(x)} ${pq(hy(x))}`});
  const out=`M57.5 30C46 120 33 230 29.6 300Q60 318 90.4 300C87 230 74 120 62.5 30Z`;
  const ribs=hem.map(x=>`M${pq(x)} ${pq(hy(x)+2)}L${pq(58+(x-30)/60*4)} 344`).join('');
  const wrap=Array.from({length:26},(_,i)=>`<path d="M56.6 ${pq(402+i*1.9)}H63.4" style="stroke:${i%6<3?'var(--band)':'var(--thread)'}" stroke-width="1.3"/>`).join('');
  return `<svg class="py-closed" viewBox="0 0 120 460" aria-hidden="true"><defs><clipPath id="pk${u}"><path d="${out}"/></clipPath>
    <linearGradient id="pc${u}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset=".3" stop-color="#fff" stop-opacity=".04"/><stop offset=".65" stop-color="#000" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
    <linearGradient id="pb${u}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e9cf9a"/><stop offset=".45" stop-color="#c9a062"/><stop offset="1" stop-color="#7d5a2a"/></linearGradient></defs>
    <rect x="58.6" y="6" width="2.8" height="18" rx="1.2" fill="url(#pb${u})"/>
    <rect x="57.9" y="354" width="4.2" height="48" fill="url(#pb${u})"/>
    <path d="M57.9 384h4.2" stroke="#7d5a2a" stroke-width=".7"/>
    <path d="M34 306L57 344H63L86 306Z" fill="rgba(40,25,10,.45)"/>
    <path d="${ribs}" fill="none" stroke="#b8925a" stroke-width="1.1"/>
    <path d="M42 318L78 318M48 328L72 328" style="stroke:var(--thread)" stroke-width=".45" stroke-dasharray="2 1.4"/>
    <rect x="56" y="342" width="8" height="14" rx="2" fill="url(#pb${u})"/><path d="M56 346h8M56 350h8" style="stroke:var(--band)" stroke-width="1"/>
    <rect x="56.2" y="400" width="7.6" height="52" rx="2.4" fill="url(#pb${u})"/>${wrap}
    <rect x="56.2" y="400" width="7.6" height="52" rx="2.4" fill="url(#pc${u})"/>
    <path d="M56.4 452h7.2v2.6a3.6 3.6 0 0 1-7.2 0z" fill="#5a3e1c"/>
    <path d="${out}" style="fill:var(--canopy)"/>
    <g clip-path="url(#pk${u})">
      <image href="${A}paper.jpg" x="0" y="0" width="240" height="460" preserveAspectRatio="xMidYMid slice" style="mix-blend-mode:multiply" opacity=".15"/>
      <rect x="0" y="62" width="120" height="13" style="fill:var(--band)" opacity=".95"/>
      <rect x="0" y="196" width="120" height="17" style="fill:var(--ring)" opacity=".9"/>
      ${fac}
      <path d="${lines}" fill="none" stroke="rgba(0,0,0,.22)" stroke-width=".4"/>
      <rect width="120" height="460" fill="url(#pc${u})"/></g>
    <g fill="none" stroke="rgba(0,0,0,.3)" stroke-width=".6">${scal}</g>
    <path d="${out}" fill="none" stroke="rgba(0,0,0,.25)" stroke-width=".5"/>
    <path d="M54.6 20h10.8l-1.4 12h-8z" style="fill:var(--band)"/><path d="M55 23.5h10M55.4 27h9.2" style="stroke:var(--thread)" stroke-width=".7"/>
    <path d="M37 252Q60 259 83 252M36.8 255.2Q60 262 83.2 255.2" fill="none" style="stroke:var(--thread)" stroke-width=".9"/>
    <circle cx="60" cy="259" r="1.6" style="fill:var(--thread)"/><path d="M59.4 260.4l-2.2 8.6M60.6 260.4l2.4 8" fill="none" style="stroke:var(--thread)" stroke-width=".7"/></svg>`};
const pyUmb=(cls='')=>`<div class="py-umb ${cls}"><div class="py-paper" style="clip-path:${pyEdge}"></div>${pyLines()}</div>`;
const pyVars=c=>`--canopy:${c.canopy};--ring:${c.ring};--band:${c.band};--thread:${c.thread||c.gold};--nm:${c.nm||c.accent};--btn:${c.dark?'rgba(0,0,0,.3)':'rgba(255,255,255,.4)'}`;
FAMILY({key:'payung',name:'Payung',meaning:'Oil-paper umbrella',
  blurb:'A closed waxed-paper umbrella lying across a sheet of paper, its pleats, cord, bamboo ribs and wrapped handle finely drawn. Guests lift it away to open the card.',
  fonts:{d:"'Marcellus', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-payung2${c.dark?' py-dark':''}" style="${pyVars(c)}"><div class="py-ground"></div>
      <div class="py-archwrap" style="--ring:transparent">${pyUmb('py-arch')}</div>
      <div class="py-card reveal"><div class="py-ci">
        <p class="py-k kicker">${ev(o,L)}</p><h1 class="py-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="py-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="py-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<a class="py-ven" data-go="loc" href="#">${esc(o.venue)}</a>`:''}</div></div>
      <div class="py-links reveal d2"><a data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-payung2${c.dark?' py-dark':''}" style="${pyVars(c)}"><div class="py-ground"></div>
      <div class="py-top"><p class="py-k">${ev(o,L)}</p><p class="py-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="py-d">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
      <div class="py-lift">${pyClosed()}</div>
      <div class="py-foot">${guest?`<p class="py-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="py-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('py-dark',!!c.dark);el.style.setProperty('--canopy',c.canopy);el.style.setProperty('--band',c.band);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Red umbrella with an indigo band',c:{ground:'#efe7da',sheet:'#fcf8f0',ink:'#33241e',accent:'#a6262c',gold:'#b08a48',pagefg:'#33241e',canopy:'#b8282f',ring:'#f2e8d6',band:'#1f3a5f',thread:'#e9d9b4'}},
    {k:'malam',n:'Malam',desc:'Red umbrella on a night ground',c:{ground:'#18212c',sheet:'#f8f2e6',ink:'#2a2320',accent:'#a6262c',gold:'#c9a35c',pagefg:'#efe6d6',canopy:'#b02a33',ring:'#f0e4cc',band:'#d9a845',thread:'#f1e2c0',nm:'#efd9b0',dark:1}},
    {k:'jed',n:'Jed',desc:'Jade umbrella with a red band',c:{ground:'#ecefe7',sheet:'#fbfcf8',ink:'#24302a',accent:'#2c6a55',gold:'#a08a50',pagefg:'#24302a',canopy:'#3d8268',ring:'#f4efe2',band:'#b8323a',thread:'#f3ecd6'}},
    {k:'kuning',n:'Kuning',desc:'Saffron umbrella with a red band',c:{ground:'#f3ecdc',sheet:'#fffbf2',ink:'#3a2c18',accent:'#a6262c',gold:'#a8823a',pagefg:'#3a2c18',canopy:'#dda13a',ring:'#7a1e22',band:'#a6262c',thread:'#4a3418'}},
    {k:'nila',n:'Nila',desc:'Indigo umbrella on midnight',c:{ground:'#131b2e',sheet:'#f5f2ec',ink:'#1f2433',accent:'#2c4a8a',gold:'#c6a865',pagefg:'#e9e6df',canopy:'#2e4c8a',ring:'#efe6d2',band:'#e0bd72',thread:'#f1e8d4',nm:'#e6d3a6',dark:1}},
    {k:'jambu',n:'Jambu',desc:'Rose umbrella on blush paper',c:{ground:'#f5e9e5',sheet:'#fffaf8',ink:'#3e2a2c',accent:'#a83a58',gold:'#b48c5a',pagefg:'#3e2a2c',canopy:'#d9788f',ring:'#fff5f2',band:'#4a6a8a',thread:'#fff3f0'}},
    {k:'hitam',n:'Hitam',desc:'Black lacquer umbrella with a gold band',c:{ground:'#1b1918',sheet:'#f7f2ea',ink:'#262220',accent:'#9a2a2a',gold:'#d0ad62',pagefg:'#efe8dc',canopy:'#2b2725',ring:'#b8323a',band:'#c9a35c',thread:'#b8323a',nm:'#e6cf9e',dark:1}},
    {k:'ungu',n:'Ungu',desc:'Plum umbrella on lilac paper',c:{ground:'#ede8f1',sheet:'#fcfaff',ink:'#2e2836',accent:'#6e3a7e',gold:'#a08a6a',pagefg:'#2e2836',canopy:'#7a4a8e',ring:'#f4ecf6',band:'#e2b04a',thread:'#f4ecf6'}},
  ]});
