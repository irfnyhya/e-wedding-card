/* kubah: a laser-cut tunnel card. Three sheets of heavy coloured stock stand one behind the other, each cut with a
   smaller arch (a plain pointed arch, a second stepped arch, then a cusped arch in a strong colour or gilt paper), so the
   edges step down into the opening like a carved portal. Through it, a garden painting (Hassam / Monet, public domain).
   The front sheet is pierced with a ring of tiny stars round the arch and foil-ruled with an alfiz frame; the names are
   printed below the window in a classical roman and italic.
   Cover: tap "Buka Jemputan" and we walk through the arches: each sheet swings past in turn and the garden comes close.
   Page: the same portal, smaller, the couple's photo in the deepest arch if they have one. Skin: stepped-paper cards. */
needFont('Cormorant+SC:wght@400;500');
let kbN=0;
const kbF=v=>v.toFixed(1);
// a pointed (two-centred) arch: sides at xl/xr, springing at s, apex at a, sill at b
function kbArch(xl,xr,s,a,b){const w=(xr-xl)/2,h=s-a,r=(w*w+h*h)/(2*w),m=xl+w;
  return {d:`M${kbF(xl)} ${kbF(b)}V${kbF(s)}A${kbF(r)} ${kbF(r)} 0 0 1 ${kbF(m)} ${kbF(a)}A${kbF(r)} ${kbF(r)} 0 0 1 ${kbF(xr)} ${kbF(s)}V${kbF(b)}Z`,r,m,w,h}}
// points evenly along the arch curve (both arcs), for cusps and pierced stars
function kbAlong(xl,xr,s,a,n,off=0){const {r,m,w}=kbArch(xl,xr,s,a,0),cxl=xl+r,cxr=xr-r,t0=Math.PI,t1=Math.PI+Math.acos((r-w)/r)*1;
  // left arc: centre (cxl,s), angle from PI (at xl) to angle at apex; right arc mirrored
  const aApex=Math.atan2(a-s,m-cxl);const pts=[];
  for(let i=0;i<=n;i++){const t=i/n;let x,y;
    if(t<=.5){const ang=Math.PI+(aApex+Math.PI*2-Math.PI)*(t/.5);x=cxl+Math.cos(ang)*(r+off);y=s+Math.sin(ang)*(r+off)}
    else{const ang=(Math.PI-aApex)+(Math.PI*2-(Math.PI-aApex))*((t-.5)/.5);x=cxr+Math.cos(ang)*(r+off);y=s+Math.sin(ang)*(r+off)}
    pts.push([x,y])}return pts}
// a cusped (multifoil) arch: the pointed arch with lobes cut into its curve
function kbCusp(xl,xr,s,a,b,n){const p=kbAlong(xl,xr,s,a,n);let d=`M${kbF(xl)} ${kbF(b)}V${kbF(s)}`;
  for(let i=1;i<p.length;i++){const [x0,y0]=p[i-1],[x1,y1]=p[i],ch=Math.hypot(x1-x0,y1-y0),rr=ch*.56;d+=`A${kbF(rr)} ${kbF(rr)} 0 0 1 ${kbF(x1)} ${kbF(y1)}`}
  return d+`V${kbF(b)}Z`}
const kbStar=(x,y,r)=>{let d='';for(let i=0;i<16;i++){const a=-Math.PI/2+i*Math.PI/8,rr=i%2?r*.5:r;d+=(i?'L':'M')+kbF(x+Math.cos(a)*rr)+' '+kbF(y+Math.sin(a)*rr)}return d+'Z'};
// geometry of the three sheets, in a 400 x H box; the window spans y top..sill
function kbGeo(H,top,sill){const spring=top+(sill-top)*.48;
  return [{xl:58,xr:342,s:spring,a:top,b:sill},{xl:76,xr:324,s:spring+6,a:top+24,b:sill-12},{xl:96,xr:304,s:spring+12,a:top+50,b:sill-24}]}
// the three masks (white = paper, holes = cuts) and the foil linework on the front sheet
function kbSheets(H,top,sill,c){const g=kbGeo(H,top,sill),u=++kbN,box=`M0 0H400V${H}H0Z`;
  const a1=kbArch(g[0].xl,g[0].xr,g[0].s,g[0].a,g[0].b),a2=kbArch(g[1].xl,g[1].xr,g[1].s,g[1].a,g[1].b);
  let stars='';kbAlong(g[0].xl,g[0].xr,g[0].s,g[0].a,22,15).forEach(([x,y],i)=>{if(i&&i<22)stars+=kbStar(x,y,i%2?2.6:3.6)});
  for(let y=g[0].s+18;y<g[0].b-8;y+=19){stars+=kbStar(g[0].xl-15,y,2.6)+kbStar(g[0].xr+15,y,2.6)}
  const m1=K.uri(`<svg ${NS} viewBox="0 0 400 ${H}" preserveAspectRatio="none"><path fill-rule="evenodd" fill="#fff" d="${box}${a1.d}${stars}"/></svg>`);
  const m2=K.uri(`<svg ${NS} viewBox="0 0 400 ${H}" preserveAspectRatio="none"><path fill-rule="evenodd" fill="#fff" d="${box}${a2.d}"/></svg>`);
  const m3=K.uri(`<svg ${NS} viewBox="0 0 400 ${H}" preserveAspectRatio="none"><path fill-rule="evenodd" fill="#fff" d="${box}${kbCusp(g[2].xl,g[2].xr,g[2].s,g[2].a,g[2].b,9)}"/></svg>`);
  // foil: alfiz (rectangular frame round the arch), an outline just outside the cut, rosettes in the spandrels, a sill rule
  const ax=g[0].xl-30,ay=g[0].a-26,aw=g[0].xr-g[0].xl+60;
  const ros=(x,y)=>`<circle cx="${x}" cy="${y}" r="7" stroke-width=".7"/><path d="${kbStar(x,y,5.4)}" stroke-width=".6"/><circle cx="${x}" cy="${y}" r="1.4" fill="url(#kbg${u})" stroke="none"/>`;
  const foil=`<svg class="kbh-foil" viewBox="0 0 400 ${H}" preserveAspectRatio="none" fill="none" stroke="url(#kbg${u})"><defs><linearGradient id="kbg${u}" x1="0" y1="0" x2="1" y2=".6"><stop offset="0" stop-color="#8f6a2c"/><stop offset=".3" stop-color="#f0d993"/><stop offset=".5" stop-color="#a8813b"/><stop offset=".75" stop-color="#ecd38a"/><stop offset="1" stop-color="#8a6428"/></linearGradient></defs>
    <rect x="${ax}" y="${ay}" width="${aw}" height="${g[0].b-ay}" stroke-width="1"/><rect x="${ax+4}" y="${ay+4}" width="${aw-8}" height="${g[0].b-ay-4}" stroke-width=".5"/>
    <path d="${kbArch(g[0].xl-27,g[0].xr+27,g[0].s,g[0].a-25,g[0].b).d.replace(/Z$/,'')}" stroke-width=".6"/>
    ${ros(ax+22,ay+22)}${ros(ax+aw-22,ay+22)}
    <path d="M${ax-6} ${g[0].b}H${ax+aw+6}M${ax-2} ${g[0].b+4}H${ax+aw+2}" stroke-width=".8"/></svg>`;
  return {m1,m2,m3,foil}}
const kbPortal=(c,H,top,sill,cls)=>{const s=kbSheets(H,top,sill,c);
  return `<div class="kbh-portal ${cls}"><div class="kbh-paint"></div>
    <div class="kbh-L l3"><i style="-webkit-mask-image:${s.m3};mask-image:${s.m3}"></i></div>
    <div class="kbh-L l2"><i style="-webkit-mask-image:${s.m2};mask-image:${s.m2}"></i></div>
    <div class="kbh-L l1"><i style="-webkit-mask-image:${s.m1};mask-image:${s.m1}"></i>${s.foil}</div></div>`};
const kbVars=c=>`--l1:${c.l1};--l2:${c.l2};--l3:${c.l3};--nm:${c.nm};--paint:url(${A}${c.paint});--ppos:${c.ppos}`;
const kbDate=o=>{const p=String(o.date||'').split('-');return p.length===3?`${+p[2]} · ${+p[1]} · ${p[0]}`:esc(fmtShort(o.date))};
FAMILY({key:'kubah',name:'Kubah',meaning:'Layered arches',
  blurb:'Three laser-cut sheets stand one behind another, each cut with a smaller arch, so the edges step down into a garden painting. Guests walk through the arches to open it.',
  fonts:{d:"'Cormorant SC', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const c=th.c,en=o.lang==='en',[n1,n2]=coverNames(o);
    return `<section class="page pg-kubah${c.dark?' kbh-dark':''}" style="${kbVars(c)}"><div class="kbh-paper"></div>
      <div class="kbh-pwrap reveal">${kbPortal(c,420,40,404,'kbh-pg')}</div>
      <p class="kbh-k kicker reveal d1">${ev(o,L)}</p>
      <h1 class="kbh-names reveal d1">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1>
      <p class="kbh-date reveal d2"><i></i>${kbDate(o)}<i></i></p>
      <p class="kbh-ven reveal d2">${esc(fmtDate(o.date,o.lang))}${o.venue?` · ${esc(o.venue)}`:''}</p>
      <div class="kbh-tabs reveal d3"><a class="kbh-tab" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="kbh-tab" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en',[n1,n2]=coverNames(o);
    return `<div class="cover cv-kubah${c.dark?' kbh-dark':''}" style="${kbVars(c)}">
      ${kbPortal(c,780,62,452,'kbh-cv')}
      <div class="kbh-txt">
        <p class="kbh-k">${ev(o,L)}</p>
        <p class="kbh-names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p>
        <p class="kbh-date"><i></i>${kbDate(o)}<i></i></p>
        ${o.venue?`<p class="kbh-ven">${esc(o.venue)}</p>`:''}
        ${guest?`<p class="kbh-to">${L.dear} <b>${esc(guest)}</b></p>`:''}
        <${tag} class="kbh-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('kbh-dk',!!c.dark);
    ['l1','l2','l3','nm'].forEach(k=>el.style.setProperty('--'+k,c[k]));
    el.style.setProperty('--kbarch',K.uri(`<svg ${NS} viewBox="0 0 60 40" fill="none" stroke="#000"><path d="${kbArch(14,46,22,2,40).d.replace(/Z$/,'')}" stroke-width="1.6"/><path d="${kbArch(20,40,24,9,40).d.replace(/Z$/,'')}" stroke-width="1.1"/><path d="${kbArch(25.5,34.5,26,17,40).d.replace(/Z$/,'')}" stroke-width=".9"/><path d="M0 39H12M48 39H60" stroke-width="1"/></svg>`));
    el.style.setProperty('--kbstar',K.uri(`<svg ${NS} viewBox="0 0 16 16"><path d="${kbStar(8,8,4)}"/></svg>`));
    // the couple's photo goes into the deepest arch of the front page
    const pg=$('.pg-kubah',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const p=$('.kbh-paint',pg);img.className='kbh-photo';img.removeAttribute('style');p.appendChild(img);ph.remove()}
    const sc=$('.scroller',el);
    $$('.pg-kubah [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'putih',n:'Putih',desc:'White, pale blue and cobalt sheets over a water garden',c:{ground:'#f1ece2',sheet:'#fbf8f1',ink:'#33302b',accent:'#2c4a66',gold:'#a8874c',pagefg:'#33302b',l1:'#f3eee4',l2:'#d9e1e6',l3:'#34587a',nm:'#2c4a66',paint:'pd-paint-hassam-water.jpg',ppos:'45% 60%'}},
    {k:'pasir',n:'Pasir',desc:'Sand, buff and terracotta sheets over an iris garden',c:{ground:'#e6d4b6',sheet:'#fbf5e9',ink:'#3d2f22',accent:'#8a3f2a',gold:'#a8823f',pagefg:'#3d2f22',l1:'#e9d9bd',l2:'#d8bf98',l3:'#9e4f33',nm:'#8a3f2a',paint:'pd-paint-monet-irises.jpg',ppos:'50% 70%'}},
    {k:'jambu',n:'Jambu',desc:'Blush, rose and sage sheets over an iris garden',c:{ground:'#eedcd4',sheet:'#fdf7f3',ink:'#3f2e2c',accent:'#8e4256',gold:'#ad8a56',pagefg:'#3f2e2c',l1:'#f1e1da',l2:'#e2c3bb',l3:'#6b876a',nm:'#8e4256',paint:'pd-paint-monet-irises.jpg',ppos:'60% 50%'}},
    {k:'sage',n:'Sage',desc:'Sage, celadon and teal sheets over a lily-pond garden',c:{ground:'#dfe2d2',sheet:'#fafaf2',ink:'#2d3329',accent:'#3d5a4c',gold:'#a08a52',pagefg:'#2d3329',l1:'#e2e5d6',l2:'#c3ccb4',l3:'#356366',nm:'#3d5a4c',paint:'pd-paint-hassam-water.jpg',ppos:'50% 60%'}},
    {k:'biru',n:'Biru',desc:'Mist, sky and cobalt sheets over an iris garden',c:{ground:'#dce4ea',sheet:'#fbfbf8',ink:'#26303b',accent:'#2b4570',gold:'#a48a55',pagefg:'#26303b',l1:'#e0e7ec',l2:'#bccbd8',l3:'#2b4d84',nm:'#2b4570',paint:'pd-paint-monet-irises.jpg',ppos:'40% 50%'}},
    {k:'terakota',n:'Terakota',desc:'Terracotta, clay and teal sheets over a water garden',c:{ground:'#c48463',sheet:'#fbf3e8',ink:'#33241b',accent:'#6e2c18',gold:'#a77e45',pagefg:'#2e1f16',l1:'#c98a68',l2:'#e0b190',l3:'#2c5a5c',nm:'#5a2414',paint:'pd-paint-hassam-water.jpg',ppos:'50% 60%'}},
    {k:'malam',n:'Malam',desc:'Indigo sheets and gilt paper over a lily-pond garden',c:{ground:'#1c2536',sheet:'#232e43',ink:'#ece6d8',accent:'#e2c58a',gold:'#c4a15c',pagefg:'#ece6d8',l1:'#1f2a3d',l2:'#2d3a52',l3:'#b08d4f',nm:'#e6cb92',paint:'pd-paint-hassam-water.jpg',ppos:'50% 55%',dark:1}},
    {k:'zamrud',n:'Zamrud',desc:'Deep green sheets and gilt paper over an iris garden',c:{ground:'#18322a',sheet:'#1f3d33',ink:'#ebe7d8',accent:'#e0c58c',gold:'#c4a15c',pagefg:'#ebe7d8',l1:'#1b382e',l2:'#28493d',l3:'#b08d4f',nm:'#e3ca93',paint:'pd-paint-monet-irises.jpg',ppos:'50% 60%',dark:1}},
  ]});
