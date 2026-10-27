/* renda2 (Renda Diraja): a layered invitation suite laid flat on a deep velvet ground.
   An arched, die-cut lace card (SVG scallops with punched eyelets, the paper itself shows through a mask),
   a coloured envelope with a painted floral liner, a wax seal on a silk tassel and a small vellum details card.
   Cover: tap "Buka Jemputan"; the envelope and vellum fan out to the sides and the lace card lifts towards you.
   Page: the same pieces as a flat-lay, each one a link (details, RSVP, location).
   Skin: lace-edged paper cards on velvet, script headings over a hairline and a punched eyelet row.
   Classes use cv-rdiraja / pg-rdiraja / rj-* (the older "renda" family already uses *-renda2 names). */
needFont('Great+Vibes');
// outline of an arched card (clockwise, y down), resampled into n equal steps
function rjOutline(W,H,ay,r){const P=[];
  for(let i=0;i<=400;i++){const t=Math.PI+i/400*Math.PI;P.push([W/2+W/2*Math.cos(t),ay+ay*Math.sin(t)])}
  for(let i=1;i<=100;i++)P.push([W,ay+(H-r-ay)*i/100]);
  for(let i=1;i<=40;i++){const t=i/40*Math.PI/2;P.push([W-r+r*Math.cos(t),H-r+r*Math.sin(t)])}
  for(let i=1;i<=100;i++)P.push([W-r-(W-2*r)*i/100,H]);
  for(let i=1;i<=40;i++){const t=Math.PI/2+i/40*Math.PI/2;P.push([r+r*Math.cos(t),H-r+r*Math.sin(t)])}
  for(let i=1;i<=100;i++)P.push([0,H-r-(H-r-ay)*i/100]);
  const cum=[0];for(let i=1;i<P.length;i++)cum.push(cum[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));
  const tot=cum[cum.length-1];
  return step=>{const n=Math.round(tot/step),out=[];let j=0;
    for(let k=0;k<=n;k++){const s=k/n*tot;while(j<cum.length-2&&cum[j+1]<s)j++;const f=(s-cum[j])/((cum[j+1]-cum[j])||1);
      out.push([P[j][0]+(P[j+1][0]-P[j][0])*f,P[j][1]+(P[j+1][1]-P[j][1])*f])}return out}}
const f2=v=>v.toFixed(2);
const rjHole=(x,y,r)=>`M${f2(x-r)} ${f2(y)}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0Z`;
// the die-cut lace card: returns {mask, line} svg strings in a W x H box (8 units of margin for the scallops)
function rjLace(W,H,ay){const M=8,res=rjOutline(W,H,ay,10),pts=res(11),n=pts.length-1;
  const nrm=i=>{const a=pts[i],b=pts[(i+1)%n];const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1;return[dy/L,-dx/L]};
  let d='',holes='',inner='',dots='';
  for(let i=0;i<n;i++){const a=pts[i],b=pts[i+1],[nx,ny]=nrm(i),mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
    d+=(i?'':`M${f2(a[0])} ${f2(a[1])}`)+`Q${f2(mx+nx*9)} ${f2(my+ny*9)} ${f2(b[0])} ${f2(b[1])}`;
    holes+=rjHole(mx+nx*1.6,my+ny*1.6,1.45);                          // an eyelet in every scallop
    holes+=rjHole(a[0]-nx*4.2,a[1]-ny*4.2,.75);                       // a pin-prick between scallops
    holes+=rjHole(mx-nx*7.6,my-ny*7.6,.95);                           // second, smaller row
    const ix=mx-nx*12.5,iy=my-ny*12.5;inner+=(i?'L':'M')+f2(ix)+' '+f2(iy);
    dots+=(i?'L':'M')+f2(mx-nx*16)+' '+f2(my-ny*16)}
  const vb=`${-M} ${-M} ${W+2*M} ${H+2*M}`;
  const mask=`<svg ${NS} viewBox="${vb}" preserveAspectRatio="none"><path d="${d}Z${holes}" fill-rule="evenodd" fill="#000"/></svg>`;
  const line=`<svg class="rj-line" viewBox="${vb}" preserveAspectRatio="none"><path d="${inner}Z" fill="none" stroke="var(--gold)" stroke-width=".7" opacity=".85"/><path d="${dots}Z" fill="none" stroke="var(--accent)" stroke-width=".45" stroke-dasharray=".6 1.8" stroke-linecap="round" opacity=".7"/></svg>`;
  return {mask:K.uri(mask),line,ar:`${W+2*M}/${H+2*M}`}}
// a small engraved rule: hairlines and a diamond
const rjRule=()=>`<svg class="rj-rule" viewBox="0 0 120 10"><path d="M4 5H50M70 5H116" stroke="currentColor" stroke-width=".6"/><path d="M60 1L64 5L60 9L56 5Z" fill="none" stroke="currentColor" stroke-width=".7"/><circle cx="60" cy="5" r="1" fill="currentColor"/><circle cx="52" cy="5" r=".9" fill="currentColor"/><circle cx="68" cy="5" r=".9" fill="currentColor"/></svg>`;
// a silk tassel on a cord: knot, ridged cap and fine strands
let rjN=0;
function rjTassel(){const u=++rjN;let s='';for(let i=0;i<34;i++){const x=21+i*.5+(i%3)*.15,e=x+(x-29.5)*.55;s+=`<path d="M${f2(x)} 44Q${f2(x+(x-29.5)*.1)} 70 ${f2(e)} 96" stroke="url(#rjtg${u})" stroke-width=".7" fill="none" opacity="${(.65+(i%4)*.1).toFixed(2)}"/>`}
  return `<svg class="rj-tassel" viewBox="0 0 60 100"><defs><linearGradient id="rjtg${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--tassel)"/><stop offset="1" stop-color="color-mix(in srgb,var(--tassel) 70%,#000)"/></linearGradient>
    <linearGradient id="rjtc${u}" x1="0" x2="1"><stop offset="0" stop-color="color-mix(in srgb,var(--tassel) 55%,#000)"/><stop offset=".45" stop-color="color-mix(in srgb,var(--tassel) 70%,#fff)"/><stop offset="1" stop-color="color-mix(in srgb,var(--tassel) 50%,#000)"/></linearGradient></defs>
    <path d="M30 0C24 10 36 16 30 26" stroke="color-mix(in srgb,var(--tassel) 60%,#000)" stroke-width="2.2" fill="none"/><path d="M30 0C24 10 36 16 30 26" stroke="var(--tassel)" stroke-width="1.2" stroke-dasharray="1.4 1" fill="none"/>
    <ellipse cx="30" cy="28" rx="4.2" ry="3.6" fill="url(#rjtc${u})"/>${s}
    <path d="M21.5 33Q30 30 38.5 33L39 44Q30 47 21 44Z" fill="url(#rjtc${u})"/><path d="M21.5 37Q30 39.5 38.6 37M21.3 40.5Q30 43 38.8 40.5" stroke="rgba(0,0,0,.3)" stroke-width=".5" fill="none"/></svg>`}
const rjMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="rj-jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `${esc(a)}<i>&amp;</i>${esc(b)}`};
const rjEnv=(cls='')=>`<div class="rj-env ${cls}"><div class="rj-flap"><i></i></div><div class="rj-body"></div></div>`;
const RJ_COVER=rjLace(200,290,72),RJ_PAGE=rjLace(220,270,70);
const rjCard=(lace,inner,cls='')=>`<div class="rj-card ${cls}" style="aspect-ratio:${lace.ar}"><div class="rj-paper" style="-webkit-mask:${lace.mask} center/100% 100% no-repeat;mask:${lace.mask} center/100% 100% no-repeat"></div>${lace.line}<div class="rj-in">${inner}</div></div>`;
FAMILY({key:'renda2',name:'Renda Diraja',meaning:'Royal lace suite',
  blurb:'A die-cut lace card, a coloured envelope with a painted floral liner, a vellum details card and a wax seal on a silk tassel, laid out on velvet. The envelope fans aside and the lace card lifts to open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<section class="page pg-rdiraja" style="--env:${c.env};--envfg:${c.envfg||c.sheet};--liner:url(${A}${c.liner});--tassel:${c.tassel}"><div class="rj-ground"></div>
      <div class="rj-lay">
        <div class="rj-main reveal">${rjCard(RJ_PAGE,`<p class="rj-k kicker">${ev(o,L)}</p><h1 class="rj-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>${rjRule()}<p class="rj-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="rj-hj">${esc(o.hijri)}</p>`:''}`)}</div>
        <div class="rj-tiles">
          <a class="rj-t rj-t-env reveal d1" data-go="when" href="#">${rjEnv('mini')}<span class="rj-tl"><small>${en?'Tap for':'Tekan untuk'}</small><b>${en?'Event details':'Butiran Majlis'}</b></span></a>
          ${o.x_rsvp?`<a class="rj-t rj-t-rsvp reveal d2" data-go="rsvp" href="#"><span class="rj-vel"><small>${en?'Kindly reply':'Sudi hadir?'}</small><b>RSVP</b></span></a>`:''}
          <a class="rj-t rj-t-loc reveal d3" data-go="loc" href="#"><span class="rj-tag"><b>${en?'Location':'Lokasi'}</b><small>${esc(o.venue)}</small></span><span class="rj-seal sm" style="--seal:url(${A}seal-${c.seal}.webp)"><span>${rjMono(o)}</span></span></a>
        </div>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<div class="cover cv-rdiraja${c.light?' rj-light':''}" style="--env:${c.env};--liner:url(${A}${c.liner});--tassel:${c.tassel}"><div class="rj-ground"></div>
      ${guest?`<p class="rj-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
      <div class="rj-stage">
        ${rjEnv('big')}
        <div class="rj-vellum"><p class="rj-vk">${en?'The details':'Butiran'}</p><p class="rj-vd">${esc(fmtDate(o.date,o.lang))}</p><p class="rj-vt">${esc(fmtTime(o.start,o.lang))}</p>${o.venue?`<p class="rj-vv">${esc(o.venue)}</p>`:''}</div>
        ${rjCard(RJ_COVER,`<p class="rj-k">${ev(o,L)}</p><p class="rj-cn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>${rjRule()}<p class="rj-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>`,'lift')}
        <div class="rj-sealset">${rjTassel()}<span class="rj-seal" style="--seal:url(${A}seal-${c.seal}.webp)"><span>${rjMono(o)}</span></span></div>
      </div>
      <${tag} class="rj-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--env',th.c.env);el.classList.toggle('rj-lightg',!!th.c.light);
    const sc=$('.scroller',el);
    $$('.pg-rdiraja [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'marun',n:'Marun',desc:'Burgundy velvet, ivory lace, gold seal',c:{ground:'#3a0f18',sheet:'#fbf5ea',ink:'#3a2024',accent:'#7a1f2e',gold:'#b8924e',pagefg:'#f3e3d0',env:'#7c1d2c',liner:'pd-still-1.jpg',seal:'emas',tassel:'#c9a25a'}},
    {k:'delima',n:'Delima',desc:'Wine velvet, blush lace, wine seal',c:{ground:'#2b0b16',sheet:'#fbf1ec',ink:'#3b1d26',accent:'#6b1b36',gold:'#b58e57',pagefg:'#f2dfdc',env:'#5c1430',liner:'pd-still-3.jpg',seal:'merah',tassel:'#7a1a34'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald velvet, ivory lace, gold seal',c:{ground:'#0f2a22',sheet:'#fbf7ec',ink:'#22302a',accent:'#245241',gold:'#b8975a',pagefg:'#ecebdc',env:'#1f4d3c',liner:'pd-still-2.jpg',seal:'emas',tassel:'#c4a05e'}},
    {k:'nila',n:'Nila',desc:'Navy velvet, ivory lace, pearl seal',c:{ground:'#111a33',sheet:'#fbf8f1',ink:'#1f2438',accent:'#22305e',gold:'#b3965f',pagefg:'#e8e6e0',env:'#1f2c57',liner:'pd-still-4.jpg',seal:'gading',tassel:'#d8d0c0'}},
    {k:'koko',n:'Koko',desc:'Mocha suede, cream lace, gold seal',c:{ground:'#3a2a22',sheet:'#fbf5ec',ink:'#33261f',accent:'#6b4a36',gold:'#b8935a',pagefg:'#f0e4d6',env:'#7b5a46',liner:'pd-still-1.jpg',seal:'emas',tassel:'#c8a46a'}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose suede, white lace, wine seal',c:{ground:'#b98a8a',sheet:'#fffaf6',ink:'#3e2a2c',accent:'#8a4250',gold:'#b0895a',pagefg:'#fff8f4',env:'#8e4352',liner:'pd-still-4.jpg',seal:'merah',tassel:'#7d2b3b'}},
    {k:'sage',n:'Sage',desc:'Sage suede, ivory lace, sage seal',c:{ground:'#7d8a73',sheet:'#fbfaf2',ink:'#2c3327',accent:'#4d5e45',gold:'#a8915a',pagefg:'#fbfaf2',env:'#4f6047',liner:'pd-still-2.jpg',seal:'sage',tassel:'#e6dcc4'}},
    {k:'gading',n:'Gading',desc:'Ivory suede, white lace, gold seal',c:{ground:'#d9cdb9',sheet:'#fffdf8',ink:'#33291f',accent:'#7a5f3e',gold:'#a8894c',pagefg:'#33291f',env:'#efe5d2',liner:'pd-still-4.jpg',seal:'emas',tassel:'#b8955a',light:'1',envfg:'#5b4630'}},
  ]});
