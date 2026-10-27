/* kubah: a garden courtyard seen through a pointed mosque arch. The arch is carved plaster: an alfiz frame with a running
   star border, painted spandrels with rosettes, voussoirs in alternating tints, slender colonnettes in the jambs and a sill;
   through it, a sunlit flower garden (Hassam / Monet, public domain). The names sit on a cream panel set into the wall below.
   Cover: tap "Buka Jemputan" and the whole wall sinks away, leaving the garden; then the page.
   Page: the arch with the garden and the names panel. Skin: cream panels on the plaster, each heading under a small arched garden window. */
needFont('Playfair+Display:ital,wght@0,400;1,400');
let kbN=0;
const kbF=v=>v.toFixed(1);
const KB_R=105,KB_S=170,KB_B=396;
const kbAy=o=>KB_S-Math.sqrt((KB_R+o)*(KB_R+o)-225);
// the pointed arch, offset o outwards from the opening (o<0 = inside)
const kbArch=(o,B=KB_B)=>`M${kbF(60-o)} ${B}V${KB_S}A${KB_R+o} ${KB_R+o} 0 0 1 150 ${kbF(kbAy(o))}A${KB_R+o} ${KB_R+o} 0 0 1 ${kbF(240+o)} ${KB_S}V${B}`;
const kbPt=(cx,a,r)=>`${kbF(cx+Math.cos(a)*r)} ${kbF(KB_S+Math.sin(a)*r)}`;
// voussoirs: wedges between joints on both arcs, every other one tinted
function kbVous(){let w='',j='';const a1=Math.atan2(kbAy(0)-KB_S,150-165)+Math.PI*2,n=8,A0=t=>Math.PI+(a1-Math.PI)*t;
  for(const [cx,f] of [[165,a=>a],[135,a=>Math.PI-a]])for(let i=0;i<n;i++){const g0=f(A0(i/n)),g1=f(A0((i+1)/n));
    j+=`M${kbPt(cx,g0,KB_R)}L${kbPt(cx,g0,KB_R+16)}`;
    if(i%2)w+=`M${kbPt(cx,g0,KB_R)}L${kbPt(cx,g0,KB_R+16)}L${kbPt(cx,g1,KB_R+16)}L${kbPt(cx,g1,KB_R)}Z`}
  return `<path d="${w}" fill="var(--tile)" opacity=".22"/><path d="${j}" stroke="var(--line)" stroke-width=".5" opacity=".7"/>`}
// a rosette for the spandrels: an eight-point star inside petals and a ring
function kbRose(x,y,r){let p='';K.ring(16,r*.72,x,y).forEach(([px,py,a])=>{p+=`<ellipse cx="${kbF(px)}" cy="${kbF(py)}" rx="${kbF(r*.24)}" ry="${kbF(r*.1)}" transform="rotate(${kbF(a*180/Math.PI)} ${kbF(px)} ${kbF(py)})"/>`});
  return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="var(--frame)" stroke="var(--line)" stroke-width=".6"/><circle cx="${x}" cy="${y}" r="${kbF(r-2.4)}" fill="none" stroke="var(--line)" stroke-width=".35"/>
    <g fill="var(--gold)" opacity=".85">${p}</g><path d="${K.star(8,r*.5,r*.3,x,y)}" fill="var(--tile)" stroke="var(--frame)" stroke-width=".5"/><circle cx="${x}" cy="${y}" r="${kbF(r*.14)}" fill="var(--frame)"/></g>`}
// the arch frame. giant=true also draws the plaster wall around it (the cover), so the wall and the arch move as one
function kbFrame(c,giant){const u=++kbN;
  let stars='';for(let x=26;x<=274;x+=12.4){stars+=K.star(8,3.2,1.6,x,22)+K.star(8,3.2,1.6,x,404)}for(let y=34;y<=396;y+=12.4){stars+=K.star(8,3.2,1.6,20,y)+K.star(8,3.2,1.6,280,y)}
  let scroll='';[[1,0],[-1,300]].forEach(([s,ox])=>{const X=v=>kbF(ox+s*v);
    scroll+=`M${X(36)} 150C${X(36)} 120 ${X(48)} 108 ${X(64)} 104M${X(36)} 150C${X(30)} 160 ${X(40)} 166 ${X(44)} 158M${X(64)} 104C${X(80)} 100 ${X(90)} 112 ${X(84)} 120C${X(80)} 126 ${X(72)} 120 ${X(76)} 114M${X(96)} 36C${X(110)} 44 ${X(118)} 40 ${X(124)} 34M${X(100)} 40C${X(98)} 50 ${X(104)} 54 ${X(110)} 50`});
  const open=kbArch(0)+'Z';
  return `<svg class="kbh-frame" viewBox="0 0 300 420" fill="none"><defs>
    <pattern id="kbp${u}" width="160" height="160" patternUnits="userSpaceOnUse"><image href="${A}paper.jpg" width="160" height="160"/></pattern>
    <pattern id="kbt${u}" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M7 0L9 5L14 7L9 9L7 14L5 9L0 7L5 5Z M0 0L2 2M14 0L12 2M0 14L2 12M14 14L12 12" fill="none" stroke="var(--frame)" stroke-width=".45" opacity=".5"/><circle cx="7" cy="7" r=".9" fill="var(--frame)" opacity=".6"/></pattern>
    <radialGradient id="kbl${u}" cx=".5" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></radialGradient>
    <clipPath id="kbc${u}"><path d="${open}"/></clipPath>
    <filter id="kbb${u}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>
    <filter id="kbs${u}" x="-10%" y="-10%" width="120%" height="130%"><feGaussianBlur stdDeviation="3"/></filter></defs>
   ${giant?`<path d="M-2000 -2000H2300V2400H-2000Z${open}" fill-rule="evenodd" fill="var(--wall)"/><path d="M-2000 -2000H2300V2400H-2000Z${open}" fill-rule="evenodd" fill="url(#kbp${u})" style="mix-blend-mode:multiply" opacity=".5"/>`:''}
   <path d="M14 412H286" stroke="#000" stroke-opacity=".28" stroke-width="8" filter="url(#kbs${u})"/>
   <path d="M14 14H286V410H14Z${open}" fill-rule="evenodd" fill="var(--frame)"/>
   <path d="M26 30H274V${KB_S}H${kbF(240+18)}A${KB_R+18} ${KB_R+18} 0 0 0 150 ${kbF(kbAy(18))}A${KB_R+18} ${KB_R+18} 0 0 0 ${kbF(60-18)} ${KB_S}H26Z" fill="var(--tile)"/>
   <path d="M26 30H274V${KB_S}H${kbF(240+18)}A${KB_R+18} ${KB_R+18} 0 0 0 150 ${kbF(kbAy(18))}A${KB_R+18} ${KB_R+18} 0 0 0 ${kbF(60-18)} ${KB_S}H26Z" fill="url(#kbt${u})"/>
   <path d="${scroll}" stroke="var(--frame)" stroke-width=".9" stroke-linecap="round" opacity=".7"/>
   ${kbRose(62,64,18)}${kbRose(238,64,18)}
   <path d="M14 14H286V410H14Z${open}" fill-rule="evenodd" fill="url(#kbp${u})" style="mix-blend-mode:multiply" opacity=".45"/>
   ${kbVous()}
   <g fill="var(--line)" opacity=".5"><path d="${stars}"/></g>
   <path d="M14 14H286V410H14ZM26 26H274V404" stroke="var(--line)" stroke-width=".7"/><path d="M26 30H274" stroke="var(--line)" stroke-width=".5"/>
   <path d="M26 30V${KB_B}M274 30V${KB_B}" stroke="var(--line)" stroke-width=".5"/>
   <path d="${kbArch(18,KB_S)}" stroke="var(--line)" stroke-width=".8"/><path d="${kbArch(20,KB_S)}" stroke="var(--line)" stroke-width=".4"/>
   <path d="${kbArch(16)}" stroke="var(--line)" stroke-width=".5"/>
   ${[51,249].map(x=>`<g stroke="var(--line)"><path d="M${x-9} ${KB_S-5}H${x+9}V${KB_S}H${x-9}Z" fill="var(--frame)" stroke-width=".6"/><path d="M${x-6} ${KB_S}L${x-3} ${KB_S+10}M${x+6} ${KB_S}L${x+3} ${KB_S+10}M${x-5} ${KB_S+4}H${x+5}" stroke-width=".5"/>
     <path d="M${x-3} ${KB_S+10}V${KB_B-14}M${x+3} ${KB_S+10}V${KB_B-14}" stroke-width=".6"/><path d="M${x-3} ${KB_S+60}H${x+3}M${x-3} ${KB_S+62}H${x+3}" stroke-width=".4"/>
     <path d="M${x-7} ${KB_B-14}H${x+7}L${x+9} ${KB_B}H${x-9}Z" fill="var(--frame)" stroke-width=".6"/></g>`).join('')}
   <g clip-path="url(#kbc${u})"><path d="${kbArch(-5)}" stroke="var(--line)" stroke-width="10" opacity=".35"/><path d="${open}" stroke="#000" stroke-opacity=".5" stroke-width="22" filter="url(#kbb${u})"/></g>
   <path d="${open}" stroke="var(--line)" stroke-width="1"/>
   <path d="M30 ${KB_B}H270V408H30Z" fill="var(--frame)"/><path d="M30 ${KB_B}H270V408H30Z" fill="url(#kbp${u})" style="mix-blend-mode:multiply" opacity=".45"/><path d="M30 ${KB_B}H270V408H30ZM30 ${KB_B+3}H270" stroke="var(--line)" stroke-width=".6"/>
   <path d="M14 14H286V410H14Z${open}" fill-rule="evenodd" fill="url(#kbl${u})"/>
  </svg>`.replace(/var\(--(wall|frame|tile|line|gold)\)/g,(m,k)=>c[k])}
const kbVars=c=>`--wall:${c.wall};--frame:${c.frame};--tile:${c.tile};--line:${c.line};--paint:url(${A}${c.paint});--ppos:${c.ppos||'50% 50%'};`;
const kbPanel=(o,L,page)=>{const [n1,n2]=coverNames(o);
  return `<div class="kbh-panel${page?' reveal d1':''}"><p class="kbh-k${page?' kicker':''}">${ev(o,L)}</p>
    <${page?'h1':'p'} class="kbh-names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</${page?'h1':'p'}>
    <p class="kbh-date">${esc(fmtDate(o.date,o.lang))}</p>${page&&o.hijri?`<p class="kbh-hj">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="kbh-ven">${esc(o.venue)}</p>`:''}</div>`};
FAMILY({key:'kubah',name:'Kubah',meaning:'Garden arch',
  blurb:'A sunlit flower garden seen through a carved plaster arch with painted spandrels, the names on a cream panel set into the wall below. The wall sinks away to let guests into the garden.',
  fonts:{d:"'Marcellus', serif",s:"'Playfair Display', serif",b:"'Playfair Display', serif"},ms:1500,
  page(o,th,L){const c=th.c,en=o.lang==='en';
    return `<section class="page pg-kubah${c.dark?' kbh-dark':''}" style="${kbVars(c)}">
      ${o.bismillah?'<p class="kbh-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
      <div class="kbh-wrap reveal"><div class="kbh-view"></div>${kbFrame(c,false)}</div>
      ${kbPanel(o,L,true)}
      <div class="kbh-pills reveal d2"><a class="kbh-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="kbh-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-kubah${c.dark?' kbh-dark':''}" style="${kbVars(c)}"><div class="kbh-garden"></div>
      <div class="kbh-stage"><div class="kbh-wrap">${kbFrame(c,true)}</div>${kbPanel(o,L,false)}
      <div class="kbh-foot">${guest?`<p class="kbh-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="kbh-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('kbh-dk',!!c.dark);
    ['wall','frame','tile','line'].forEach(k=>el.style.setProperty('--'+k,c[k]));el.style.setProperty('--paint',`url(${A}${c.paint})`);el.style.setProperty('--ppos',c.ppos||'50% 50%');
    el.style.setProperty('--kbarch',K.uri(`<svg ${NS} viewBox="0 0 40 52"><path d="M2 52V24A21 21 0 0 1 20 1A21 21 0 0 1 38 24V52Z"/></svg>`));
    const sc=$('.scroller',el);
    $$('.pg-kubah [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'putih',n:'Putih',desc:'White plaster arch, blue spandrels, a water garden',c:{ground:'#ece6da',sheet:'#fbf7ee',ink:'#33302b',accent:'#2c4a66',gold:'#a8874c',pagefg:'#33302b',wall:'#ebe4d7',frame:'#f4efe5',tile:'#3d6688',line:'#8b7c66',paint:'pd-paint-hassam-water.jpg',ppos:'45% 60%'}},
    {k:'pasir',n:'Pasir',desc:'Sandstone arch, terracotta spandrels, an iris garden',c:{ground:'#e2cfb0',sheet:'#fbf5e9',ink:'#3d2f22',accent:'#8a3f2a',gold:'#a8823f',pagefg:'#3d2f22',wall:'#dfcaa8',frame:'#ecdcc0',tile:'#a65537',line:'#8a6c48',paint:'pd-paint-monet-irises.jpg',ppos:'50% 70%'}},
    {k:'jambu',n:'Jambu',desc:'Rose plaster arch, sage spandrels, an iris garden',c:{ground:'#ead6cd',sheet:'#fdf7f3',ink:'#3f2e2c',accent:'#8e4256',gold:'#ad8a56',pagefg:'#3f2e2c',wall:'#e8d2c8',frame:'#f3e6df',tile:'#6e8b6c',line:'#9a7a70',paint:'pd-paint-monet-irises.jpg',ppos:'60% 50%'}},
    {k:'sage',n:'Sage',desc:'Sage plaster arch, teal spandrels, a lily-pond garden',c:{ground:'#d9dccb',sheet:'#fafaf2',ink:'#2d3329',accent:'#3d5a4c',gold:'#a08a52',pagefg:'#2d3329',wall:'#d6dac7',frame:'#e8eadc',tile:'#3b6a6e',line:'#76806a',paint:'pd-paint-hassam-water.jpg',ppos:'50% 60%'}},
    {k:'biru',n:'Biru',desc:'Pale blue arch, cobalt spandrels, an iris garden',c:{ground:'#d5dee5',sheet:'#fbfbf8',ink:'#26303b',accent:'#2b4570',gold:'#a48a55',pagefg:'#26303b',wall:'#d3dde5',frame:'#e8eef2',tile:'#2d4f86',line:'#6f8193',paint:'pd-paint-monet-irises.jpg',ppos:'40% 50%'}},
    {k:'terakota',n:'Terakota',desc:'Terracotta wall, teal spandrels, a water garden',c:{ground:'#c48463',sheet:'#fbf3e8',ink:'#3a2a20',accent:'#8a3a22',gold:'#a77e45',pagefg:'#2e1f16',wall:'#c3825f',frame:'#d99c7a',tile:'#2f5d5f',line:'#7e4a30',paint:'pd-paint-hassam-water.jpg',ppos:'50% 60%'}},
    {k:'malam',n:'Malam',desc:'Indigo wall at dusk, gilt lines, a lily-pond garden',c:{ground:'#1c2536',sheet:'#f8f3e8',ink:'#2a2b33',accent:'#2b3b60',gold:'#b8975a',pagefg:'#ece6d8',wall:'#1e2839',frame:'#2a3549',tile:'#7d6337',line:'#b8975a',paint:'pd-paint-hassam-water.jpg',ppos:'50% 55%',dark:1}},
    {k:'zamrud',n:'Zamrud',desc:'Deep green wall, gilt lines, an iris garden',c:{ground:'#18322a',sheet:'#f8f3e6',ink:'#2a2f29',accent:'#24493a',gold:'#b8975a',pagefg:'#ebe7d8',wall:'#1a362c',frame:'#24463a',tile:'#8c6a36',line:'#b8975a',paint:'pd-paint-monet-irises.jpg',ppos:'50% 60%',dark:1}},
  ]});
