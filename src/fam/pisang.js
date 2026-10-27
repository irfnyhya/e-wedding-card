/* pisang: "Daun Pisang". An off-white card laid on fresh banana leaves, the way a kampung kenduri table is set:
   broad glossy blades with a pale midrib, hundreds of fine parallel ribs, natural tears running in along the ribs and
   a dry, yellowing edge here and there (procedural SVG). A narrow strip of banana leaf is wrapped round the card like a
   belly band, carrying a small cream label. Cover: tap the band ("Buka Jemputan") and it slides off the card.
   Page: the card framed by leaves top and bottom. Skin: off-white cards edged at the top with a strip of leaf. */
needFont('Italianno');
let psgN=0;
const f1=n=>(+n).toFixed(1),PI=Math.PI;
/* a banana leaf pointing up from 0,0: length L, half-width W */
function psgLeaf(L,W,c,r,dry){const id='psg'+(++psgN),w=t=>W*Math.pow(Math.max(0,1-Math.pow(2*t-1,10)),.5)*Math.pow(Math.min(1,t/.06),.6),
    sl=.32;  // the ribs climb outwards towards the tip
  const side=s=>{let d='M0 0';for(let i=1;i<=60;i++){const t=i/60;d+=`L${f1(s*w(t)*(1+(r()-.5)*.012))} ${f1(-L*t)}`}return d+`L0 ${f1(-L)}Z`};
  // tears: wedges along a rib, from the margin in towards the midrib
  let tears='';for(const s of [-1,1]){let t=.1+r()*.08;while(t<.9){const ww=w(t+.02),dep=r()<.3?.97:.3+r()*.5,y0=-L*t,ex=s*ww*1.05,ey=y0-ww*sl,ix=s*ww*(1-dep),iy=y0-ww*sl*(1-dep),g=2.4+r()*4;
      tears+=`<path d="M${f1(ex)} ${f1(ey-g)}L${f1(ix)} ${f1(iy)}L${f1(ex)} ${f1(ey+g)}Z"/>`;t+=.035+r()*.1}}
  let rib='',rib2='';for(const s of [-1,1])for(let y=6;y<L*.995;y+=2.7){const t=y/L,ww=w(Math.min(1,t+.02));if(ww<2)continue;const p=`M${f1(s*W*.02)} ${f1(-y)}L${f1(s*ww)} ${f1(-y-ww*sl)}`;(Math.round(y/2.7)%5?rib+=p:rib2+=p)}
  let spots='';if(dry)for(let k=0;k<5;k++){const t=.15+r()*.75,s=r()<.5?-1:1;spots+=`<ellipse cx="${f1(s*w(t)*.92)}" cy="${f1(-L*t)}" rx="${f1(4+r()*7)}" ry="${f1(10+r()*16)}" fill="${c.dry}" opacity="${f1(.25+r()*.25)}"/>`}
  return `<defs><linearGradient id="${id}a" gradientUnits="userSpaceOnUse" x1="${f1(-W)}" y1="0" x2="0" y2="0"><stop offset="0" stop-color="${c.b1}"/><stop offset=".55" stop-color="${c.b2}"/><stop offset=".95" stop-color="${c.b3}"/></linearGradient>
    <linearGradient id="${id}b" gradientUnits="userSpaceOnUse" x1="${f1(W)}" y1="0" x2="0" y2="0"><stop offset="0" stop-color="${c.b0}"/><stop offset=".6" stop-color="${c.b1}"/><stop offset=".97" stop-color="${c.b2}"/></linearGradient>
    <linearGradient id="${id}g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${f1(-L)}"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".35" stop-color="#000" stop-opacity="0"/><stop offset=".7" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
    <mask id="${id}" maskUnits="userSpaceOnUse" x="${f1(-W*1.3)}" y="${f1(-L*1.05)}" width="${f1(W*2.6)}" height="${f1(L*1.15)}"><path d="${side(-1)}" fill="#fff"/><path d="${side(1)}" fill="#fff"/><g fill="#000">${tears}</g></mask></defs>
   <g mask="url(#${id})"><path d="${side(-1)}" fill="url(#${id}a)"/><path d="${side(1)}" fill="url(#${id}b)"/>${spots}
    <path d="${rib}" stroke="${c.rib}" stroke-width=".55" opacity=".32" fill="none"/><path d="${rib2}" stroke="${c.b0}" stroke-width=".8" opacity=".35" fill="none"/>
    <rect x="${f1(-W*1.2)}" y="${f1(-L)}" width="${f1(W*2.4)}" height="${f1(L)}" fill="url(#${id}g)"/>
    <path d="${side(-1)}" fill="none" stroke="${c.dry}" stroke-width="2.2" opacity=".35"/><path d="${side(1)}" fill="none" stroke="${c.dry}" stroke-width="2.2" opacity=".3"/></g>
   <path d="M${f1(-W*.035)} ${f1(L*.04)}L${f1(-W*.012)} ${f1(-L*.99)}L${f1(W*.012)} ${f1(-L*.99)}L${f1(W*.035)} ${f1(L*.04)}Z" fill="${c.mid}"/>
   <path d="M${f1(W*.034)} ${f1(L*.03)}L${f1(W*.012)} ${f1(-L*.99)}" stroke="${c.b0}" stroke-width=".8" opacity=".5"/>`}
const PSG_SH=id=>`<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="3" dy="8" stdDeviation="7" flood-color="#000" flood-opacity=".42"/></filter>`;
// the leaves under the card: [x, y, rotation, length, half-width, dry]
const PSG_COVER=[[-50,860,24,980,128,1],[450,-90,204,980,122,0],[-90,-20,122,640,104,1],[480,820,-58,600,100,0],[-60,420,62,420,80,0]];
function psgBed(c,seed,list,cls,vb='0 0 390 760'){const r=rng(seed),fid='psg'+(++psgN);
  return `<svg class="psg-bed ${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" ${NS}><defs>${PSG_SH(fid)}</defs>${list.map(([x,y,a,L,W,d])=>`<g transform="translate(${x} ${y}) rotate(${a})" filter="url(#${fid})">${psgLeaf(L,W,c,r,d)}</g>`).join('')}</svg>`}
// the belly band: a strip cut across a leaf, so its ribs run across the band
function psgBand(c,seed){const r=rng(seed),id='psg'+(++psgN);let rib='';for(let x=-6;x<406;x+=2.4){const sk=7;rib+=`M${f1(x)} 0L${f1(x+sk)} 56`}
  let tears='';for(let k=0;k<4;k++){const x=40+r()*320,top=r()<.5;tears+=`<path d="M${f1(x-1.6)} ${top?-1:57}L${f1(x+(top?3:-3))} ${f1(top?10+r()*12:46-r()*12)}L${f1(x+1.6)} ${top?-1:57}Z"/>`}
  return `<svg class="psg-strip" viewBox="0 0 400 56" preserveAspectRatio="none" ${NS}><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.b0}"/><stop offset=".25" stop-color="${c.b2}"/><stop offset=".55" stop-color="${c.b3}"/><stop offset=".8" stop-color="${c.b1}"/><stop offset="1" stop-color="${c.b0}"/></linearGradient>
    <mask id="${id}m"><rect width="400" height="56" fill="#fff"/><g fill="#000">${tears}</g></mask></defs>
    <g mask="url(#${id}m)"><rect width="400" height="56" fill="url(#${id})"/><path d="${rib}" stroke="${c.rib}" stroke-width=".5" opacity=".35"/>
    <path d="M0 .8H400M0 55.2H400" stroke="${c.dry}" stroke-width="1.4" opacity=".45"/></g></svg>`}
const psgNames=(o,cls='')=>{const [n1,n2]=coverNames(o);return `<h1 class="psg-names ${cls}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
const psgDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const PSG_PAGE=[[-60,880,20,1000,130,1],[460,-100,200,1000,124,0],[-100,0,118,620,104,0],[500,800,-60,620,104,1],[420,380,-104,460,90,0]];

FAMILY({key:'pisang',name:'Daun Pisang',meaning:'Banana-leaf table',
  blurb:'An off-white card laid on fresh banana leaves with their ribs and natural tears, wrapped in a strip of leaf with a small cream label. Slide the leaf band off to open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Italianno', cursive",b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const c=th.c,en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-pisang ${c.dark?'psg-dk':''}">${psgBed(c,61,PSG_PAGE,'pg')}
      <div class="psg-card"><div class="psg-body">
        <div class="psg-ph"></div>
        ${o.bismillah?`<p class="psg-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="psg-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${psgNames(o)}</div>
        <i class="psg-rib reveal d1"></i>
        <p class="psg-date reveal d2"><span>${esc(psgDay(o))}</span><b>${esc(fmtDate(o.date,o.lang,false))}</b>${t?`<span>${esc(t)}</span>`:''}</p>
        ${o.hijri?`<p class="psg-hj reveal d2">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<a href="#" class="psg-ven reveal d2" data-go="loc">${esc(o.venue)}</a>`:''}
        <div class="psg-pills reveal d3"><a class="psg-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="psg-pill ghost" data-go="rsvp" href="#">${en?'RSVP':'Sahkan Kehadiran'}</a>`:''}</div>
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-pisang ${c.dark?'psg-dk':''}">${psgBed(c,5,PSG_COVER,'cv')}
      <div class="psg-card">
        <div class="psg-ctop"><p class="psg-k">${ev(o,L)}</p>${psgNames(o,'cv')}<p class="psg-sdate">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
        <div class="psg-cbot">${o.venue?`<p class="psg-cven">${esc(o.venue)}</p>`:''}${guest?`<p class="psg-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}</div>
      </div>
      <${tag} class="psg-band" ${attr}>${psgBand(c,3)}<span class="psg-label">${en?'Open invitation':'Buka Jemputan'}</span></${tag}>
    </div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('psg-dk',!!th.c.dark);
    el.style.setProperty('--psg-strip',K.uri(psgBand(th.c,9)));
    const pg=$('.pg-pisang',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const slot=$('.psg-ph',pg);img.removeAttribute('style');slot.appendChild(img);slot.classList.add('on');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'kayu',n:'Kayu',desc:'Fresh leaves on a dark teak table',c:{ground:'#3a2a1f',sheet:'#fbf8ef',ink:'#2d3326',accent:'#2f5a2c',gold:'#a88f5a',pagefg:'#f2ead8',b0:'#1f4a1c',b1:'#2f6a28',b2:'#4f8f3a',b3:'#7db552',rib:'#c9e39a',mid:'#c9dc8e',dry:'#9a8a3a'}},
    {k:'hijau',n:'Hijau',desc:'Deep green ground, glossy young leaves',c:{ground:'#143022',sheet:'#fcfaf2',ink:'#25322a',accent:'#245a35',gold:'#a8955e',pagefg:'#e9f0e2',b0:'#1a4d22',b1:'#2b6e2e',b2:'#4c9440',b3:'#86c25a',rib:'#d2eaa2',mid:'#d0e396',dry:'#a39540'}},
    {k:'tikar',n:'Tikar',desc:'A kraft-cream card on sunlit leaves',c:{ground:'#cdb98f',sheet:'#f4ead3',ink:'#33301f',accent:'#4b6a2a',gold:'#a8854c',pagefg:'#33301f',b0:'#2c5a22',b1:'#3e7a2e',b2:'#62a046',b3:'#9cc866',rib:'#dcefb0',mid:'#d9e7a0',dry:'#b19a45'}},
    {k:'putih',n:'Putih',desc:'White stone, cool green leaves',c:{ground:'#e7e5dd',sheet:'#ffffff',ink:'#2a3129',accent:'#2c5a3a',gold:'#9c9473',pagefg:'#2a3129',b0:'#1d4a2a',b1:'#2d6a3a',b2:'#4c8e50',b3:'#84ba72',rib:'#d0e8b6',mid:'#cfe2a8',dry:'#a19a52'}},
    {k:'hitam',n:'Hitam',desc:'A black card on dark leaves, gold type',c:{ground:'#141613',sheet:'#1b1e19',ink:'#ece6d4',accent:'#dcc58a',gold:'#bfa264',pagefg:'#ece6d4',dark:1,b0:'#163d18',b1:'#245c24',b2:'#3f8036',b3:'#6ea84c',rib:'#c4df94',mid:'#c3d68a',dry:'#8f8235'}},
    {k:'nila',n:'Nila',desc:'Leaves on an indigo batik-blue ground',c:{ground:'#1c2a3d',sheet:'#fcfbf5',ink:'#26302c',accent:'#2b5a40',gold:'#a3946a',pagefg:'#e8edf2',b0:'#1a4a2a',b1:'#2a6a38',b2:'#4a8e4c',b3:'#7fbc66',rib:'#cde8aa',mid:'#cce0a0',dry:'#9b9145'}},
    {k:'terakota',n:'Terakota',desc:'Leaves on a terracotta ground',c:{ground:'#9c5b3d',sheet:'#fdf9f0',ink:'#30291f',accent:'#3f5a2a',gold:'#b07a4c',pagefg:'#fbefe2',b0:'#22501f',b1:'#336f2b',b2:'#559340',b3:'#8cbe58',rib:'#d4eaa0',mid:'#d3e396',dry:'#a8913c'}},
    {k:'sage',n:'Sage',desc:'Soft sage ground, pale leaves',c:{ground:'#b7c2a6',sheet:'#fdfcf5',ink:'#2c3327',accent:'#3d5a32',gold:'#9a8f62',pagefg:'#24301f',b0:'#2d5a2a',b1:'#40763a',b2:'#64984f',b3:'#9cc276',rib:'#dcefbc',mid:'#d8e8ae',dry:'#a89a52'}},
  ]});
