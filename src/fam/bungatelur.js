/* bungatelur: the egg-flower stand. A brass pahar holds a domed songket base; dozens of fine gold stems
   fan out like fireworks, each tipped with a paper flower and an egg in its cup. Fine foil linework on paper.
   Cover: the arrangement on a stationery card; touching it lifts the spray away. Page: egg-flower stems as
   side borders. Skin: paper cards, egg-flower bullets on headings, dotted gold dividers. */
let uid=0;
const f1=v=>(+v).toFixed(1);
// one egg in its cup above a ring of paper petals, drawn pointing up at 0,0
function tip(s,petals){const P=K.ring(petals,3.6*s,0,0).map(([x,y,a])=>`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(1.7*s)}" ry="${f1(3.6*s)}" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(x)} ${f1(y)})"/>`).join('');
  return `<g class="bt-pt">${P}</g><circle r="${f1(1.6*s)}" class="bt-gd"/>
   <path d="M${f1(-2.6*s)} ${f1(-2.4*s)}h${f1(5.2*s)}l${f1(-.9*s)} ${f1(2.6*s)}h${f1(-3.4*s)}z" class="bt-gd"/>
   <ellipse cy="${f1(-6.4*s)}" rx="${f1(2.9*s)}" ry="${f1(3.9*s)}" class="bt-egg"/><path d="M${f1(-1.2*s)} ${f1(-8.6*s)}q${f1(-.9*s)} ${f1(1.6*s)} 0 ${f1(3.4*s)}" class="bt-hi"/>`}
// the full spray. full=false gives just the fan of stems, for the page crest
function spray(full){const id=++uid,R=rng(7),stems=[],tips=[],leaves=[];
  const ox=150,oy=full?262:200;
  const tier=(n,a0,a1,L0,L1,s,pet)=>{for(let i=0;i<n;i++){const t=n===1?.5:i/(n-1),th=(a0+(a1-a0)*t+(R()-.5)*4)*Math.PI/180,L=(L0+(L1-L0)*R())*(.55+.6*Math.cos(th));
    const sx=ox+Math.sin(th)*22,sy=oy+(1-Math.cos(th))*30+8,ex=sx+Math.sin(th)*L,ey=sy-Math.cos(th)*L+Math.pow(Math.sin(th),2)*L*.22;
    const cx=sx+Math.sin(th)*L*.55,cy=sy-Math.cos(th)*L*.78;
    stems.push(`M${f1(sx)} ${f1(sy)}Q${f1(cx)} ${f1(cy)} ${f1(ex)} ${f1(ey)}`);
    const ang=Math.atan2(ey-cy,ex-cx)*180/Math.PI+90;
    tips.push(`<g transform="translate(${f1(ex)} ${f1(ey)}) rotate(${f1(ang)})">${tip(s,pet)}</g>`);
    if(L>90){const mx=(sx+2*cx+ex)/4,my=(sy+2*cy+ey)/4;leaves.push(`<path d="M${f1(mx)} ${f1(my)}l-3.6 -4.4M${f1(mx)} ${f1(my)}l3.6 -4.4" transform="rotate(${f1(ang)} ${f1(mx)} ${f1(my)})"/>`)}}};
  tier(17,-76,76,170,192,1.05,8);tier(14,-66,66,118,136,.95,8);tier(9,-52,52,72,84,.85,6);tier(3,-14,14,34,38,.8,6);
  const tinsel=Array.from({length:22},(_,i)=>{const th=(-80+160*i/21)*Math.PI/180,L=40+R()*30,sx=ox+Math.sin(th)*24,sy=oy+(1-Math.cos(th))*30+6;
    return `M${f1(sx)} ${f1(sy)}l${f1(Math.sin(th)*L)} ${f1(-Math.cos(th)*L)}`}).join('');
  const defs=`<defs><linearGradient id="btm${id}" x1="0" x2="1"><stop offset="0" style="stop-color:color-mix(in srgb,var(--gold) 55%,#000)"/><stop offset=".3" style="stop-color:color-mix(in srgb,var(--gold) 60%,#fff)"/><stop offset=".55" style="stop-color:var(--gold)"/><stop offset=".8" style="stop-color:color-mix(in srgb,var(--gold) 70%,#fff)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--gold) 50%,#000)"/></linearGradient>
   <pattern id="bts${id}" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M5 1.2l2.6 3.8-2.6 3.8-2.6-3.8z" fill="none" style="stroke:var(--gold)" stroke-width=".6"/><circle cx="5" cy="5" r=".7" style="fill:var(--gold)"/><circle cx="0" cy="0" r=".5" style="fill:var(--gold)"/><circle cx="10" cy="10" r=".5" style="fill:var(--gold)"/></pattern>
   <radialGradient id="btr${id}" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient><pattern id="btf${id}" width="200" height="200" patternUnits="userSpaceOnUse"><image href="assets/foil.jpg" width="200" height="200"/></pattern></defs>`;
  const fan=`<path class="bt-tin" d="${tinsel}"/><path class="bt-st" d="${stems.join('')}"/><g class="bt-lf">${leaves.join('')}</g>${tips.join('')}`;
  if(!full)return `<svg class="bt-fan" viewBox="0 0 300 226">${defs}${fan}<circle cx="150" cy="208" r="12" class="bt-pt"/><circle cx="150" cy="208" r="8" class="bt-gd"/></svg>`;
  // dome base wrapped in songket, with a gold band, on the pahar
  const dome='M96 334C94 290 118 256 150 250C182 256 206 290 204 334Z';
  const rimSc=Array.from({length:21},(_,i)=>{const x=52+i*9.8;return `<path d="M${f1(x)} 0q4.9 6 9.8 0"/>`}).join('');
  const rebung=Array.from({length:18},(_,i)=>{const x=-6+i*17.4;return `<path d="M${x} 404l8.5-9 8.5 9z"/><path d="M${x+4} 404l4.5-4.6 4.5 4.6" class="bt-in"/>`}).join('');
  const fringe=Array.from({length:76},(_,i)=>`M${f1(-4+i*4.1)} 414v${f1(4+(i%3))}`).join('');
  return `<svg class="bt-art" viewBox="0 -8 300 432">${defs}
   <ellipse cx="150" cy="404" rx="128" ry="9" class="bt-sh"/>
   <g class="bt-run"><path d="M-6 392H306V414H-6Z" class="bt-runf"/><path d="M-6 395.5H306M-6 410.5H306" class="bt-ln"/><g class="bt-reb">${rebung}</g><path d="${fringe}" class="bt-fr"/></g>
   ${fan}
   <g class="bt-metal">
    <path d="M128 360C130 374 112 386 98 398H202C188 386 170 374 172 360Z" fill="url(#btm${id})"/>
    <ellipse cx="150" cy="398" rx="52" ry="5" fill="url(#btm${id})"/><path d="M100 398.5Q150 404 200 398.5" class="bt-eng"/>
    <path d="M110 390H190M119 383.5H181" class="bt-eng"/>
    <ellipse cx="150" cy="360" rx="23" ry="5.5" fill="url(#btm${id})"/><ellipse cx="150" cy="360" rx="23" ry="5.5" class="bt-eng"/>
    <path d="M52 336C62 356 238 356 248 336Z" fill="url(#btm${id})"/>
    <path d="${Array.from({length:15},(_,i)=>{const t=(i+1)/16,a=Math.PI*t,x=150-Math.cos(a)*96,y=336+Math.sin(a)*8.5,bx=150-Math.cos(a)*22,by=354;return `M${f1(x)} ${f1(y)}Q${f1((x+bx)/2)} ${f1(Math.max(y,by)+1)} ${f1(bx)} ${f1(by)}`}).join('')}" class="bt-eng"/>
    <path d="${Array.from({length:9},(_,i)=>{const k=i-4;return `M${f1(150+k*4.4)} 365L${f1(150+k*10.5)} 396`}).join('')}" class="bt-eng"/>
    <path d="${Array.from({length:24},(_,i)=>{const P=a=>[150-Math.cos(a)*98,336+Math.sin(a)*9],a0=Math.PI*i/24,a1=Math.PI*(i+1)/24,am=(a0+a1)/2,[x0,y0]=P(a0),[x1,y1]=P(a1);return `M${f1(x0)} ${f1(y0)}Q${f1(150-Math.cos(am)*101)} ${f1(336+Math.sin(am)*9+3.2)} ${f1(x1)} ${f1(y1)}Z`}).join('')}" fill="url(#btm${id})" class="bt-lip"/>
    <path d="M70 346Q150 360 230 346M84 351.5Q150 361 216 351.5" class="bt-eng"/>
    ${Array.from({length:25},(_,i)=>{const a=Math.PI*(i+.5)/25;return `<circle cx="${f1(150-Math.cos(a)*95)}" cy="${f1(336+Math.sin(a)*7.8)}" r=".9" class="bt-bead"/>`}).join('')}
    <ellipse cx="150" cy="336" rx="98" ry="9" fill="url(#btm${id})"/><ellipse cx="150" cy="336" rx="92" ry="6.6" class="bt-dish"/>
    <clipPath id="btc${id}"><path d="M128 360C130 374 112 386 98 398H202C188 386 170 374 172 360Z"/><ellipse cx="150" cy="398" rx="52" ry="5"/><ellipse cx="150" cy="360" rx="23" ry="5.5"/><path d="M52 336C62 356 238 356 248 336Z"/><ellipse cx="150" cy="336" rx="98" ry="9"/></clipPath>
    <rect x="40" y="320" width="220" height="90" fill="url(#btf${id})" class="bt-foil" clip-path="url(#btc${id})"/>
   </g>
   <path d="${dome}" class="bt-dome"/><path d="${dome}" fill="url(#bts${id})" opacity=".8"/>
   <path d="M96 334C96 322 98 312 101 304H199C202 312 204 322 204 334Z" class="bt-band"/>
   <path d="M101 304H199M98 316H202M97 326H203" class="bt-ln"/>
   ${Array.from({length:9},(_,i)=>`<path d="M${108+i*10.5} 310l3 -3 3 3 -3 3z" class="bt-gd"/>`).join('')}
   <path d="${dome}" fill="url(#btr${id})"/><path d="${dome}" class="bt-domeo"/>
   <circle cx="150" cy="250" r="7" class="bt-pt"/><circle cx="150" cy="250" r="4" class="bt-gd"/>
  </svg>`}
const EGG=c=>svgUriSq(`<svg ${NS} viewBox="-12 -16 24 24"><g fill="${c.bloom||c.accent}">${K.ring(8,3.8,0,0).map(([x,y,a])=>`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="1.8" ry="3.8" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(x)} ${f1(y)})"/>`).join('')}</g><circle r="1.7" fill="${c.gold}"/><path d="M-2.7-2.4h5.4l-.9 2.6h-3.6z" fill="${c.gold}"/><ellipse cy="-6.6" rx="3" ry="4" fill="${c.sheet}" stroke="${c.gold}" stroke-width=".7"/></svg>`);
// a tall stem with alternating egg-flower branches, tiled down the page edges
const BORDER=c=>svgUriSq(`<svg ${NS} width="56" height="96" viewBox="0 0 56 96"><g fill="none" stroke="${c.gold}" stroke-width=".9" stroke-linecap="round"><path d="M28 0V96"/><path d="M28 30Q28 18 14 12M28 78Q28 66 42 60"/><path d="M28 48l-4-5M28 48l4-5M28 4l-3-4M28 4l3-4" stroke-width=".7"/></g>
  <g transform="translate(14 12) rotate(-52)">${tipFlat(c)}</g><g transform="translate(42 60) rotate(52)">${tipFlat(c)}</g><circle cx="28" cy="48" r="1.4" fill="${c.gold}"/></svg>`);
function tipFlat(c){return `<g fill="${c.bloom||c.accent}">${K.ring(8,3.4,0,0).map(([x,y,a])=>`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="1.6" ry="3.4" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(x)} ${f1(y)})"/>`).join('')}</g><circle r="1.5" fill="${c.gold}"/><path d="M-2.4-2.2h4.8l-.8 2.4h-3.2z" fill="${c.gold}"/><ellipse cy="-6" rx="2.7" ry="3.6" fill="${c.sheet}" stroke="${c.gold}" stroke-width=".6"/>`}
const DOTS=c=>svgUriSq(`<svg ${NS} width="7" height="4" viewBox="0 0 7 4"><circle cx="3.5" cy="2" r=".9" fill="${c.gold}"/></svg>`);
const corner=c=>`<svg viewBox="0 0 40 40"><path d="M2 38V10Q2 2 10 2H38" fill="none" stroke="${c.gold}" stroke-width=".8"/><path d="M6 38V12Q6 6 12 6H38" fill="none" stroke="${c.gold}" stroke-width=".5" stroke-dasharray="1 2"/><g transform="translate(15 15) rotate(-45)">${tipFlat(c)}</g></svg>`;
const vars=c=>`--cloth:${c.cloth||c.accent};--bloom:${c.bloom||c.accent};--bt-egg:${EGG(c)};--bt-dots:${DOTS(c)};--bt-bord:${BORDER(c)}`;
FAMILY({key:'bungatelur',name:'Bunga Telur',meaning:'Egg-flower stand',
  blurb:'A brass pahar holding a tall spray of gold stems, each tipped with a paper flower and an egg in its cup, fanning out like fireworks.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-bungatelur ${c.dk?'bt-dk':''}" style="${vars(c)}"><div class="bt-card">
     <i class="bt-side l"></i><i class="bt-side r"></i><i class="bt-c tl">${corner(c)}</i><i class="bt-c tr">${corner(c)}</i><i class="bt-c bl">${corner(c)}</i><i class="bt-c br">${corner(c)}</i>
     <div class="bt-crest reveal">${spray(false)}</div>
     <p class="kicker reveal d1">${ev(o,L)}</p>
     <h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="bt-dot reveal d2"><i></i><b></b><i></i></div>
     <p class="bt-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p>
     <p class="bt-time reveal d3">${en?'from':'jam'} ${esc(fmtTime(o.start,o.lang))}</p>
     <p class="bt-ven reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-bungatelur ${c.dk?'bt-dk':''}" style="${vars(c)}"><div class="bt-paper"></div><i class="bt-fr1"></i><i class="bt-fr2"></i>
     <i class="bt-c tl">${corner(c)}</i><i class="bt-c tr">${corner(c)}</i><i class="bt-c bl">${corner(c)}</i><i class="bt-c br">${corner(c)}</i>
     <div class="bt-head"><p class="bt-k">${ev(o,L)}</p><p class="bt-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
      <div class="bt-dot"><i></i><b></b><i></i></div><p class="bt-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <${tag} class="bt-arr" ${attr} aria-label="${L.open}">${spray(true)}</${tag}>
     <div class="bt-foot">${guest?`<p class="bt-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="bt-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=th.c;el.style.cssText+=';'+vars(c);if(c.dk)el.classList.add('bt-dk');
    $$('.sec h2',el).forEach(h=>{h.insertAdjacentHTML('afterbegin','<i class="bt-hb"></i>');h.insertAdjacentHTML('beforeend','<i class="bt-hb"></i>')});
    $$('.sec .rule',el).forEach(r=>r.outerHTML='<div class="bt-dot"><i></i><b></b><i></i></div>')},
  themes:[
    {k:'merah',n:'Merah',desc:'Red paper flowers, brass pahar, ivory card',c:{ground:'#6a1820',sheet:'#fbf3e4',ink:'#2e221c',accent:'#a3212d',gold:'#b8893a',pagefg:'#f7ead2'}},
    {k:'jambu',n:'Jambu',desc:'Rose-pink flowers on blush paper',c:{ground:'#e8cbc4',sheet:'#fff8f2',ink:'#3d2b2b',accent:'#c4566d',gold:'#b08a4c',pagefg:'#3d2b2b'}},
    {k:'zamrud',n:'Zamrud',desc:'Gold on deep emerald',c:{ground:'#0c241d',sheet:'#143a2f',ink:'#f1e7cf',accent:'#f0cf86',gold:'#d6ae5c',pagefg:'#efe4c9',line:'rgba(240,225,190,.22)',dk:1,cloth:'#7a1f2b',bloom:'#f3d79a'}},
    {k:'gading',n:'Gading',desc:'Ivory, champagne and antique gold',c:{ground:'#d8ccb2',sheet:'#fffaf0',ink:'#3a3027',accent:'#8c6a32',gold:'#b8953f',pagefg:'#3a3027',bloom:'#c0837b'}},
    {k:'nila',n:'Nila',desc:'Blush flowers on midnight indigo',c:{ground:'#0f1730',sheet:'#1a2448',ink:'#eee6d6',accent:'#f2b9c2',gold:'#d2aa5e',pagefg:'#eee6d6',line:'rgba(238,230,214,.2)',dk:1,cloth:'#9c4a62'}},
    {k:'sage',n:'Sage',desc:'Soft sage with olive-gold stems',c:{ground:'#a9b5a0',sheet:'#f8f6ee',ink:'#2e3429',accent:'#6b7d55',gold:'#a88c4c',pagefg:'#262b22',bloom:'#b2675a'}},
    {k:'ungu',n:'Ungu',desc:'Violet flowers on lilac-white',c:{ground:'#3d2849',sheet:'#fbf6fb',ink:'#2f2433',accent:'#7a3f86',gold:'#b49152',pagefg:'#f3e9f5'}},
    {k:'hitam',n:'Hitam',desc:'Gold foil on black card',c:{ground:'#0b0b0c',sheet:'#181614',ink:'#eee4d0',accent:'#e0bd72',gold:'#c9a257',pagefg:'#eee4d0',line:'rgba(238,228,208,.2)',dk:1,cloth:'#7d1b26'}},
  ]});
