/* kaset: a compact cassette in a clear case with a printed J-card filled in by hand.
   Cover: the case stands upright, the J-card front is a mixtape form with the names written in.
   Opening: the lid swings open on its hinge and the cassette slides up out of the tray.
   Page: the cassette label with reels, above the unfolded J-card tracklist. Skin: J-card track headings. */
needFont('Caveat:wght@400;600');
let ksN=0;
const KF=(n,d=1)=>n.toFixed(d);
// a reel hub: ring with six drive teeth
const ksHub=(cx,cy,c)=>`<circle cx="${cx}" cy="${cy}" r="7.6" fill="${c.sheet}" stroke="${c.ink}" stroke-opacity=".5" stroke-width=".5"/><circle cx="${cx}" cy="${cy}" r="4.4" fill="#1d1a18"/>`+
  K.ring(6,4.4,cx,cy).map(([x,y,a])=>`<rect x="${KF(x-1)}" y="${KF(y-1)}" width="2" height="2.2" fill="${c.sheet}" transform="rotate(${KF(a*180/Math.PI+90)} ${KF(x)} ${KF(y)})"/>`).join('')+
  K.ring(3,6,cx,cy,0).map(([x,y])=>`<circle cx="${KF(x)}" cy="${KF(y)}" r=".7" fill="${c.ink}" opacity=".45"/>`).join('');
function ksTape(o,c,uid,big){const [n1,n2]=coverNames(o),en=o.lang==='en',nm=`${n1} & ${n2}`,fs=nm.length>18?11:13.5;
  const screw=(x,y)=>`<circle cx="${x}" cy="${y}" r="2.5" fill="${c.shell2}" stroke="${c.ink}" stroke-opacity=".45" stroke-width=".4"/><path d="M${x-1.5} ${y}h3M${x} ${y-1.5}v3" stroke="${c.ink}" stroke-opacity=".55" stroke-width=".5"/>`;
  const ticks=Array.from({length:21},(_,i)=>`<path d="M${KF(84+i*1.6)} 74.2v${i%5?1.2:2.2}" stroke="${c.sheet}" stroke-width=".3" opacity=".8"/>`).join('');
  return `<svg class="kaset-cas" viewBox="0 0 200 128" aria-hidden="true"><defs>
    <linearGradient id="ksg${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.shell}"/><stop offset="1" stop-color="${c.shell2}"/></linearGradient>
    <clipPath id="ksw${uid}"><rect x="52" y="47" width="96" height="28" rx="3"/></clipPath>
    <pattern id="ksl${uid}" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 4L4 0" stroke="${c.accent}" stroke-width=".35" opacity=".5"/></pattern></defs>
   <rect x=".8" y=".8" width="198.4" height="126.4" rx="7" fill="url(#ksg${uid})" stroke="${c.ink}" stroke-opacity=".55" stroke-width=".6"/>
   <rect x="3.6" y="3.6" width="192.8" height="120.8" rx="5" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".5"/>
   <path d="M18 .8h10v3h-10zM172 .8h10v3h-10z" fill="${c.ink}" opacity=".35"/>
   <rect x="14" y="8.5" width="172" height="80" rx="3" fill="${c.sheet}"/>
   <rect x="14" y="8.5" width="172" height="80" rx="3" fill="url(#ksl${uid})" opacity=".18"/>
   <path d="M17 8.5h166a3 3 0 0 1 3 3V21H14v-9.5a3 3 0 0 1 3-3z" fill="${c.accent}"/>
   <path d="M14 23h172M14 24.6h172" stroke="${c.gold}" stroke-width=".55"/><path d="M14 26.2h172" stroke="${c.accent}" stroke-width=".35"/>
   <text x="20" y="18" font-family="Jost,sans-serif" font-size="7" letter-spacing="1.6" fill="${c.sheet}" font-weight="500">${en?'SIDE':'SISI'}</text>
   <text x="44" y="18.6" font-family="Jost,sans-serif" font-size="10" fill="${c.sheet}" font-weight="600">A</text>
   <text x="180" y="17.6" text-anchor="end" font-family="Jost,sans-serif" font-size="5.6" letter-spacing="1.2" fill="${c.sheet}">TYPE I · NORMAL · C60</text>
   <text x="100" y="38.5" text-anchor="middle" font-family="Caveat,cursive" font-size="${fs}" font-weight="600" fill="${c.pen}">${esc(nm)}</text>
   <path d="M22 41.4h156" stroke="${c.ink}" stroke-width=".3" opacity=".45"/>
   <rect x="49" y="44.5" width="102" height="33" rx="4.5" fill="none" stroke="${c.gold}" stroke-width=".6"/>
   <rect x="52" y="47" width="96" height="28" rx="3" fill="#2a2522" opacity=".9"/>
   <g clip-path="url(#ksw${uid})"><circle cx="76" cy="61" r="${big?24:20}" fill="#4a3226"/><circle cx="76" cy="61" r="${big?24:20}" fill="none" stroke="#7a5a44" stroke-width=".3" stroke-dasharray="1 2"/><circle cx="124" cy="61" r="${big?12:16}" fill="#4a3226"/>
    <path d="M52 74.6h96" stroke="#5a3e30" stroke-width="1.2"/>${ticks}</g>
   ${ksHub(76,61,c)}${ksHub(124,61,c)}
   <rect x="52" y="47" width="96" height="28" rx="3" fill="#fff" opacity=".06"/><path d="M56 49l20 0-6 24h-20z" fill="#fff" opacity=".07"/>
   <text x="22" y="85" font-family="Jost,sans-serif" font-size="5.4" letter-spacing=".9" fill="${c.ink}" opacity=".75">${esc(fmtShort(o.date))}</text>
   <text x="178" y="85" text-anchor="end" font-family="Jost,sans-serif" font-size="5.4" letter-spacing=".9" fill="${c.ink}" opacity=".75">STEREO · 2 × 30 MIN</text>
   <path d="M46 127.2L53 98h94l7 29.2" fill="${c.shell2}" stroke="${c.ink}" stroke-opacity=".45" stroke-width=".5"/>
   <path d="M50 127L56 101h88l6 26" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width=".4"/>
   <circle cx="66" cy="114" r="3.6" fill="#1d1a18"/><circle cx="134" cy="114" r="3.6" fill="#1d1a18"/>
   <rect x="91" y="117" width="18" height="10" rx="1" fill="#1d1a18"/><rect x="76" y="119" width="7" height="8" rx="1" fill="#1d1a18"/><rect x="117" y="119" width="7" height="8" rx="1" fill="#1d1a18"/>
   <rect x="60" y="121" width="5" height="6" rx="1" fill="#1d1a18"/><rect x="135" y="121" width="5" height="6" rx="1" fill="#1d1a18"/>
   ${screw(9,9)}${screw(191,9)}${screw(9,119)}${screw(191,119)}${screw(100,93.5)}</svg>`}
// a little tape strip with reels, used for dividers
const ksStrip=c=>svgUriSq(`<svg ${NS} viewBox="0 0 220 16"><path d="M14 8H206" stroke="${c.tape}" stroke-width="2.2"/><path d="M14 8H206" stroke="${c.gold}" stroke-width=".4" stroke-dasharray="1 5"/><g fill="none" stroke="${c.accent}" stroke-width="1"><circle cx="8" cy="8" r="6.5"/><circle cx="212" cy="8" r="6.5"/></g><g fill="${c.accent}"><circle cx="8" cy="8" r="2.4"/><circle cx="212" cy="8" r="2.4"/></g></svg>`);
const ksPin=c=>svgUriSq(`<svg ${NS} width="10" height="10" viewBox="0 0 10 10"><path d="M0 2.5h10M0 5h10M0 7.5h10" stroke="${c}" stroke-width=".6" opacity=".9"/></svg>`);

// fine gold linework: two reels joined by the tape path
function ksReels(c){const reel=cx=>`<circle cx="${cx}" cy="20" r="16"/><circle cx="${cx}" cy="20" r="12.5" stroke-dasharray=".6 1.6"/><circle cx="${cx}" cy="20" r="4.2"/>`+
    K.ring(6,4.2,cx,20).map(([x,y,a])=>`<path d="M${KF(x)} ${KF(y)}L${KF(cx+Math.cos(a)*9)} ${KF(20+Math.sin(a)*9)}"/>`).join('');
  return `<svg class="kaset-reels" viewBox="0 0 160 40" fill="none" stroke="${c.gold}" stroke-width=".8">${reel(36)}${reel(124)}<path d="M36 36H124M20 20C20 34 30 38 40 38H120C130 38 140 34 140 20" stroke-width=".5"/><path d="M60 30h40l-3 6H63z" stroke-width=".6"/><circle cx="80" cy="12" r="1.2" fill="${c.gold}"/><path d="M68 12h7M85 12h7" stroke-width=".5"/></svg>`}
function ksTracks(o,en){const L2=[];const sc=(o.schedule||[]).filter(s=>s.label);
  L2.push(['A1',en?'Date':'Tarikh',fmtDate(o.date,o.lang,false),fmtShort(o.date).slice(0,5).replace('.',':')]);
  L2.push(['A2',en?'Time':'Masa',`${fmtTime(o.start,o.lang)} – ${fmtTime(o.end,o.lang)}`,o.start||'']);
  L2.push(['A3',en?'Venue':'Tempat',o.venue||'','']);
  sc.slice(0,3).forEach((s,i)=>L2.push(['B'+(i+1),'',s.label,s.time||'']));
  return L2}

FAMILY({key:'kaset',name:'Kaset',meaning:'Mixtape cassette',
  blurb:'A cassette in a clear case with a hand-written J-card; the lid swings open and the tape slides out to its label and tracklist.',
  fonts:{d:"'Jost', sans-serif",s:"'Caveat', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const c=th.c,en=o.lang==='en',u=++ksN,tr=ksTracks(o,en);
    const row=([n,lab,val,t])=>`<li><b>${n}</b><span>${lab?`<small>${esc(lab)}</small>`:''}<em>${esc(val)}</em></span><i>${esc(t)}</i></li>`;
    return `<section class="page pg-kaset" style="--pin:${ksPin(c.gold)};--pen:${c.pen}"><div class="kaset-desk"></div>
    <p class="kicker reveal">${ev(o,L)}</p>
    <div class="kaset-pcas reveal d1">${ksTape(o,c,'p'+u,true)}</div>
    <div class="kaset-inlay reveal d2"><div class="kaset-ihd"><span class="kaset-side">${en?'Side':'Sisi'} A · B</span><span>${en?'Recorded for':'Dirakam untuk'} ${esc(coverNames(o).join(' & '))}</span></div>
     <ol class="kaset-list">${tr.slice(0,3).map(row).join('')}<li class="kaset-sep"><span>${en?'Side B':'Sisi B'}</span></li>${tr.slice(3).map(row).join('')}</ol>
     <p class="kaset-addr">${esc(o.address||'')}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u=++ksN,sc=(o.schedule||[]).filter(s=>s.label).slice(0,3);
    const line=(t,cls='')=>`<p class="kaset-ln ${cls}">${t}</p>`;
    return `<div class="cover cv-kaset" style="--pin:${ksPin(c.gold)};--pen:${c.pen}"><div class="kaset-desk"></div>
    <p class="kaset-top">${ev(o,L)}</p>
    <div class="kaset-stage">
     <div class="kaset-edge"><span>${esc(n1)} &amp; ${esc(n2)}</span><b>${esc(fmtShort(o.date))}</b><i class="kaset-glass"></i></div>
     <div class="kaset-tray"><i class="kaset-post a"></i><i class="kaset-post b"></i><div class="kaset-tape">${ksTape(o,c,'c'+u,false)}</div></div>
     <div class="kaset-lid"><div class="kaset-face front">
       <div class="kaset-jc"><div class="kaset-jhd"><span>Type I · Normal</span><b>C60</b></div>
        <div class="kaset-band"><i></i><span>${en?'Mixtape':'Kaset'}</span><i></i></div><p class="kaset-vol">${en?'Songs for us':'Lagu untuk kita'} · Vol. I</p>
        <p class="kaset-lab">${en?'Title':'Tajuk'}</p>${line(`${esc(n1)} <span>&amp;</span>`,'nm')}${line(esc(n2),'nm')}
        <p class="kaset-lab">${en?'Date':'Tarikh'}</p>${line(esc(fmtShort(o.date)))}
        <p class="kaset-lab">${en?'Side A':'Sisi A'}</p>${sc.length?sc.map((s,i)=>line(`${i+1}. ${esc(s.label)}`,'tr')).join(''):line(esc(o.venue),'tr')}
        <p class="kaset-lab">${en?'Side B':'Sisi B'}</p>${line(esc(o.venue),'tr')}
        ${ksReels(c)}
        <div class="kaset-foot"><i class="kaset-reel"></i><span>${en?'Stereo':'Stereo'} · 2 × 30</span><i class="kaset-reel"></i></div></div>
       <i class="kaset-glass"></i></div>
      <div class="kaset-face back"><i class="kaset-glass"></i></div></div>
     <${tag} class="kaset-tap" ${attr} aria-label="${L.open}"></${tag}>
    </div>
    <div class="kaset-bot">${guest?`<p class="kaset-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="kaset-hint">${en?'Touch the case to open':'Sentuh kotak kaset untuk membuka'}</p></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--strip',ksStrip(c));el.style.setProperty('--pin',ksPin(c.gold));el.style.setProperty('--pen',c.pen);
    const durs=['03:41','04:12','02:58','05:06','03:27','04:45','03:09','04:30','02:51','03:55','04:02'];
    $$('.sec',el).forEach((s,i)=>{s.classList.add('kaset-sec');const h=$('h2',s);if(!h)return;
      const n=i<5?'A'+(i+1):'B'+(i-4);h.innerHTML=`<b class="kaset-no">${n}</b><span class="kaset-ht">${h.innerHTML}</span><i class="kaset-dur">${durs[i%durs.length]}</i>`})},
  themes:[
    {k:'krim',n:'Krim',desc:'Cream shell, tomato-red J-card',c:{ground:'#e7dfd1',sheet:'#fbf6ea',ink:'#2a2420',accent:'#b0412e',gold:'#c39a4c',pagefg:'#3b302a',shell:'#f3eee4',shell2:'#ddd5c6',pen:'#1f3a6b',tape:'#5a3a28'}},
    {k:'hitam',n:'Hitam',desc:'Smoked shell on a black desk',c:{ground:'#141414',sheet:'#f3eee2',ink:'#22201c',accent:'#2b2a2c',gold:'#d2ad62',pagefg:'#ece2cc',shell:'#4a4847',shell2:'#2b2a29',pen:'#7a1d2b',tape:'#5a3a28',line:'rgba(34,32,28,.22)'}},
    {k:'biru',n:'Biru',desc:'Navy print, ivory card',c:{ground:'#1c2a42',sheet:'#f6f3ec',ink:'#1f2635',accent:'#24467e',gold:'#c79d4e',pagefg:'#ece6d6',shell:'#e6eaef',shell2:'#c8d0da',pen:'#24467e',tape:'#4e3426'}},
    {k:'pic',n:'Pic',desc:'Peach and coral on a pale desk',c:{ground:'#f2ddcc',sheet:'#fff8f0',ink:'#3a2a24',accent:'#c4573a',gold:'#b8894a',pagefg:'#4a322a',shell:'#fff6ee',shell2:'#ecdccd',pen:'#6b2f3a',tape:'#5a3a28'}},
    {k:'sage',n:'Sage',desc:'Sage green print, linen desk',c:{ground:'#d3dccb',sheet:'#f8f8f0',ink:'#25302a',accent:'#4d6b4c',gold:'#b5945a',pagefg:'#2c3a30',shell:'#f2f2ea',shell2:'#d4d8cb',pen:'#3a4f7a',tape:'#4e3a2a'}},
    {k:'ungu',n:'Ungu',desc:'Plum print on a dusk desk',c:{ground:'#2a2238',sheet:'#f8f3f6',ink:'#2a2330',accent:'#6a3d7a',gold:'#d2ab60',pagefg:'#efe6f2',shell:'#dcd5e4',shell2:'#b9afc6',pen:'#6a3d7a',tape:'#4a3028'}},
    {k:'marun',n:'Marun',desc:'Maroon print, gold pinstripe',c:{ground:'#3a1418',sheet:'#fbf3ea',ink:'#2d1f1c',accent:'#7a1d2b',gold:'#d4ac62',pagefg:'#f1e3cf',shell:'#efe6dc',shell2:'#d6c8b8',pen:'#7a1d2b',tape:'#4a3026'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric yellow and ink brown',c:{ground:'#ecdcae',sheet:'#fffaf0',ink:'#33281c',accent:'#a8661c',gold:'#6f4a24',pagefg:'#3a2c1c',shell:'#fbf4e2',shell2:'#e6d6b4',pen:'#2c3f6b',tape:'#5a3a28'}},
  ]});
