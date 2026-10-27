/* kerongsang: a kerongsang set (one heart-shaped ibu and two round anak, granulated gold with rose-cut stones) pinned to an
   ivory card that lies on a length of songket (a public-domain woven textile from the Met Museum).
   Cover: tap "Buka Jemputan", the brooch is unpinned and lifted away, then the card is drawn up off the cloth.
   Page: the card with the ibu pinned at its top, the two anak below it on a fine chain, each leading to a section.
   Skin: ivory cards on the songket, each heading under a small anak brooch. */
let krU=0;
const kf=v=>(+v).toFixed(2);
// heart (daun sirih) outline, centre (50,46)
const krH=(t,k)=>{const x=16*Math.pow(Math.sin(t),3),y=-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t));return[50+2.75*x*k,47+2.75*y*k]};
const krHeart=k=>{let d='';for(let i=0;i<=96;i++){const [x,y]=krH(i/96*Math.PI*2,k);d+=`${i?'L':'M'}${kf(x)} ${kf(y)}`}return d+'Z'};
// gradients shared by one brooch: gold bead, gold wire, deep backing, white stone, coloured stone
const krDefs=u=>`<defs>
  <radialGradient id="kb${u}" cx=".34" cy=".3" r=".75"><stop offset="0" stop-color="#fff6d6"/><stop offset=".35" stop-color="#e6bf68"/><stop offset=".8" stop-color="#9a6c22"/><stop offset="1" stop-color="#5e3f10"/></radialGradient>
  <linearGradient id="kw${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe7a8"/><stop offset=".3" stop-color="#d7a94f"/><stop offset=".55" stop-color="#8f6420"/><stop offset=".75" stop-color="#e9c975"/><stop offset="1" stop-color="#7a5418"/></linearGradient>
  <radialGradient id="kd${u}" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#a77a2c"/><stop offset=".7" stop-color="#6a4812"/><stop offset="1" stop-color="#3e2808"/></radialGradient>
  <radialGradient id="ks${u}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#e7ebee"/><stop offset="1" stop-color="#8d98a2"/></radialGradient>
  <radialGradient id="kg${u}" cx=".4" cy=".35" r=".75"><stop offset="0" style="stop-color:color-mix(in srgb,var(--gem) 45%,#fff)"/><stop offset=".45" style="stop-color:var(--gem)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--gem) 40%,#000)"/></radialGradient></defs>`;
// a rose-cut stone in a gold collet: fine facet lines, one glint
const krStone=(x,y,r,u,fill)=>{const f=K.ring(6,r*.55,x,y).map(([a,b])=>`M${kf(x)} ${kf(y)}L${kf(a)} ${kf(b)}`).join('');
  return `<circle cx="${kf(x)}" cy="${kf(y)}" r="${kf(r*1.28)}" fill="url(#kw${u})"/><circle cx="${kf(x)}" cy="${kf(y)}" r="${kf(r)}" fill="url(#${fill}${u})"/>
  <path d="${f}" stroke="rgba(0,0,0,.28)" stroke-width="${kf(r*.07)}" fill="none"/><circle cx="${kf(x)}" cy="${kf(y)}" r="${kf(r*.55)}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="${kf(r*.07)}"/>
  <circle cx="${kf(x-r*.36)}" cy="${kf(y-r*.4)}" r="${kf(r*.16)}" fill="#fff" opacity=".9"/>`};
const krBeads=(pts,r,u)=>pts.map(([x,y])=>`<circle cx="${kf(x)}" cy="${kf(y)}" r="${r}" fill="url(#kb${u})"/>`).join('');
// kerongsang ibu
function krIbu(){const u=++krU,n=50;
  const outer=Array.from({length:n},(_,i)=>krH(i/n*Math.PI*2,1.1));
  const stones=Array.from({length:10},(_,i)=>krH((i+.5)/10*Math.PI*2,.68)).map(([x,y])=>krStone(x,y,3.1,u,'ks')).join('');
  const fil=Array.from({length:10},(_,i)=>`<path d="M50 30c6-7 15-5 15 2s-8 8-10 3 3-6 5-3" transform="rotate(${i*36+18} 50 47)"/>`).join('')+
    Array.from({length:10},(_,i)=>`<path d="M50 17q4.5 5 0 10q-4.5-5 0-10z" transform="rotate(${i*36} 50 47)"/>`).join('');
  return `<svg class="kr-ibu" viewBox="-6 -14 112 126" aria-hidden="true">${krDefs(u)}
    <path d="M44.5 -3q5.5-6 11 0l-1.6 7h-7.8z" fill="url(#kw${u})"/><circle cx="50" cy="-7" r="3" fill="none" stroke="url(#kw${u})" stroke-width="1.6"/>
    <path d="${krHeart(1.03)}" fill="url(#kd${u})"/>
    ${krBeads(outer,2.15,u)}
    <path d="${krHeart(1.0)}" fill="none" stroke="url(#kw${u})" stroke-width="2.3"/>
    <path d="${krHeart(.92)}" fill="none" stroke="#f3d68a" stroke-width="1" stroke-dasharray="1.1 .7" opacity=".9"/>
    <g fill="none" stroke="url(#kw${u})" stroke-width="1.05" stroke-linecap="round">${fil}</g>
    ${stones}
    <circle cx="50" cy="47" r="14.2" fill="url(#kw${u})"/>${krBeads(K.ring(20,12.6,50,47),.95,u)}
    ${krStone(50,47,9.6,u,'kg')}</svg>`}
// kerongsang anak: a round flower brooch
function krAnak(cls=''){const u=++krU;
  const pet=K.ring(8,15.5,30,30).map(([x,y,a])=>`<path d="M0 -8.6c5 1.5 5.6 12 0 17.2c-5.6-5.2-5-15.7 0-17.2z" transform="translate(${kf(x)} ${kf(y)}) rotate(${kf(a*180/Math.PI+90)})" fill="url(#kd${u})" stroke="url(#kw${u})" stroke-width="1.5"/>`).join('');
  const st=K.ring(8,16,30,30).map(([x,y])=>krStone(x,y,2.5,u,'ks')).join('');
  return `<svg class="kr-anak ${cls}" viewBox="0 0 60 60" aria-hidden="true">${krDefs(u)}${krBeads(K.ring(32,26.6,30,30,0),1.15,u)}${pet}${st}
    <circle cx="30" cy="30" r="9.6" fill="url(#kw${u})"/>${krBeads(K.ring(14,8.5,30,30),.7,u)}${krStone(30,30,6.2,u,'kg')}</svg>`}
// a little anak brooch for the skin's headings, as a data URI (no gradients by id, so it is safe to repeat)
const krBul=c=>K.uri(`<svg ${NS} viewBox="0 0 60 60"><g fill="${c.gold}" stroke="#7a5418" stroke-width=".8">${K.ring(8,15.5,30,30).map(([x,y,a])=>`<path d="M0 -8.6c5 1.5 5.6 12 0 17.2c-5.6-5.2-5-15.7 0-17.2z" transform="translate(${kf(x)} ${kf(y)}) rotate(${kf(a*180/Math.PI+90)})"/>`).join('')}<circle cx="30" cy="30" r="9.6"/></g>${K.ring(8,16,30,30).map(([x,y])=>`<circle cx="${kf(x)}" cy="${kf(y)}" r="2.4" fill="#f4f6f8"/>`).join('')}<circle cx="30" cy="30" r="6.2" fill="${c.gem}"/><circle cx="28" cy="28" r="1.4" fill="#fff" opacity=".8"/></svg>`);
const krVars=c=>`--gem:${c.gem};--btn:${c.light?'rgba(255,255,255,.35)':'rgba(0,0,0,.28)'};--scrim:${c.light?'rgba(255,240,228,.8)':'rgba(10,4,4,.72)'};--txo:${c.light?.5:.9};--tx:url(${A}${c.tx==='b'?'pd-textile-1.jpg':'pd-textile-2.jpg'})`;
FAMILY({key:'kerongsang',name:'Kerongsang',meaning:'Kebaya brooches',
  blurb:'A gold kerongsang set with rose-cut stones pinned to an ivory card on a length of songket. Open it and the brooch is lifted off and the card drawn up.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-kerongsang2 kr-${c.tone?'tone':'orig'}" style="${krVars(c)}"><div class="kr-cloth"></div>
      <div class="kr-card kr-pcard reveal">${krIbu()}<div class="kr-ci">
        <p class="kr-k kicker">${ev(o,L)}</p><h1 class="kr-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="kr-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="kr-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<a class="kr-ven" data-go="loc" href="#">${esc(o.venue)}</a>`:''}</div></div>
      <div class="kr-set reveal d2"><svg class="kr-chain" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true"><path d="M40 12C80 40 120 40 160 12"/></svg>
        <a class="kr-pin" data-go="when" href="#">${krAnak()}<b>${en?'Event details':'Butiran Majlis'}</b></a>
        <a class="kr-pin" data-go="${o.x_rsvp?'rsvp':'count'}" href="#">${krAnak()}<b>${o.x_rsvp?'RSVP':(en?'Countdown':'Kira Detik')}</b></a></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-kerongsang2 kr-${c.tone?'tone':'orig'}" style="${krVars(c)}"><div class="kr-cloth"></div>
      <div class="kr-stage"><div class="kr-card"><div class="kr-ci">
        <p class="kr-k">${ev(o,L)}</p><p class="kr-cn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="kr-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
        <div class="kr-brooch">${krIbu()}</div></div>
      <div class="kr-scrim"></div><div class="kr-foot">${guest?`<p class="kr-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="kr-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--gem',c.gem);el.style.setProperty('--kr-bul',krBul(c));el.style.setProperty('--tx',`url(${A}${c.tx==='b'?'pd-textile-1.jpg':'pd-textile-2.jpg'})`);
    el.classList.toggle('kr-tone',!!c.tone);el.classList.toggle('kr-orig',!c.tone);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Ruby kerongsang on crimson songket',c:{ground:'#5a1420',sheet:'#fcf6ee',ink:'#2e221e',accent:'#8e1f33',gold:'#c9a050',pagefg:'#f8e8da',gem:'#9e1630'}},
    {k:'hijau',n:'Hijau',desc:'Emerald kerongsang on green songket',c:{ground:'#123f33',sheet:'#f8f8f1',ink:'#1f2a24',accent:'#1c5a45',gold:'#c9a35a',pagefg:'#eaf1e6',gem:'#1e7a55',tone:1}},
    {k:'biru',n:'Biru',desc:'Sapphire kerongsang on navy songket',c:{ground:'#1a2a52',sheet:'#f6f6f8',ink:'#1d2436',accent:'#2c4a8a',gold:'#c9a862',pagefg:'#e9eef8',gem:'#2a4ea8',tone:1}},
    {k:'jambu',n:'Jambu',desc:'Rose-quartz kerongsang on dusty-rose songket',c:{ground:'#8e4458',sheet:'#fdf6f4',ink:'#3c2a2e',accent:'#9a3d58',gold:'#c9a05a',pagefg:'#fff3f2',gem:'#d0708c',tone:1}},
    {k:'kunyit',n:'Kunyit',desc:'Emerald kerongsang on turmeric songket',c:{ground:'#8a5a12',sheet:'#fffaee',ink:'#3a2c14',accent:'#8a5612',gold:'#d8b052',pagefg:'#fff3d6',gem:'#2f6d55',tone:1}},
    {k:'ungu',n:'Ungu',desc:'Amethyst kerongsang on plum songket',c:{ground:'#3a2050',sheet:'#faf5fb',ink:'#2e2533',accent:'#5e3278',gold:'#cfa95e',pagefg:'#f2e8f6',gem:'#7a3fa0',tone:1}},
    {k:'hitam',n:'Hitam',desc:'Garnet kerongsang on black songket',c:{ground:'#151213',sheet:'#f6efe3',ink:'#2a231d',accent:'#6e1d2a',gold:'#cfa650',pagefg:'#efe6d6',gem:'#7a1426',tone:1,tx:'b'}},
    {k:'pic',n:'Pic',desc:'Coral kerongsang on peach songket, light and soft',c:{ground:'#e4b8a2',sheet:'#fffaf5',ink:'#3b2620',accent:'#a8502f',gold:'#b98f48',pagefg:'#3b2620',gem:'#d0643e',tone:1,light:1}},
  ]});
