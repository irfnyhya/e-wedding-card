/* bulan: moon phases in gold foil on a midnight sky.
   Cover: an arc of seven phases over one large moon inside an engraved lunar ring (28 day ticks, the Hijri date set round it).
   Opening: the large moon waxes from a crescent to full, then the sky fades. Page: a row of phases above the names.
   Skin: night cards with a crescent on each heading and a star divider between them. */
let uid=0;
const f2=v=>(+v).toFixed(2);
// lit part of a waxing moon at phase p (0 new, .5 full); waning phases are mirrored by the caller
function litPath(p,R,cx,cy){const k=Math.cos(p*2*Math.PI),rx=Math.abs(k)*R,sweep=k>0?0:1;
  return `M${f2(cx)} ${f2(cy-R)}A${R} ${R} 0 0 1 ${f2(cx)} ${f2(cy+R)}A${f2(rx)} ${R} 0 0 ${sweep} ${f2(cx)} ${f2(cy-R)}Z`}
// a small phase disc: hairline outline + lit area; dir 1 waxing (lit right), -1 waning
function phase(p,R,cx,cy,c,lw=.7){const wane=p>.5,q=wane?1-p:p;
  const lit=q>=.499?`<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${R}" fill="${c.moon}"/>`:q<.01?'':`<path d="${litPath(q,R,cx,cy)}" fill="${c.moon}" ${wane?`transform="translate(${f2(2*cx)} 0) scale(-1 1)"`:''}/>`;
  return `<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${R}" fill="${c.shade}"/>${lit}<circle cx="${f2(cx)}" cy="${f2(cy)}" r="${R}" fill="none" stroke="${c.gold}" stroke-width="${lw}"/>`}
// star dust: many tiny points and a few four-point glints, seeded so every render matches
function dust(w,h,n,seed,c,glints=7){const r=rng(seed);let s='';
  for(let i=0;i<n;i++){const x=r()*w,y=r()*h,rr=.25+Math.pow(r(),3)*1.1,o=.25+r()*.7;s+=`<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(rr)}" fill="${r()<.35?c.gold:c.star}" opacity="${f2(o)}"/>`}
  for(let i=0;i<glints;i++){const x=r()*w,y=r()*h,L=3+r()*4;s+=`<path d="M${f2(x)} ${f2(y-L)}Q${f2(x)} ${f2(y)} ${f2(x+L*.7)} ${f2(y)}Q${f2(x)} ${f2(y)} ${f2(x)} ${f2(y+L)}Q${f2(x)} ${f2(y)} ${f2(x-L*.7)} ${f2(y)}Q${f2(x)} ${f2(y)} ${f2(x)} ${f2(y-L)}Z" fill="${c.gold}" opacity=".85"/>`}
  return s}
const sky=(c,seed,w=390,h=760,n=230)=>`<svg class="bln-dust" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">${dust(w,h,n,seed,c)}</svg>`;
// the engraved lunar ring round the big moon (foil linework, drawn black for a mask)
function ringArt(){let t='';for(let i=0;i<28;i++){const a=i/28*Math.PI*2-Math.PI/2,big=i%7===0,r1=big?103:105,r2=111;
    t+=`<path d="M${f2(150+Math.cos(a)*r1)} ${f2(150+Math.sin(a)*r1)}L${f2(150+Math.cos(a)*r2)} ${f2(150+Math.sin(a)*r2)}" stroke-width="${big?1.3:.7}"/>`;
    if(!big)t+=`<circle cx="${f2(150+Math.cos(a+Math.PI/28)*108)}" cy="${f2(150+Math.sin(a+Math.PI/28)*108)}" r=".7" fill="#000" stroke="none"/>`}
  const diamonds=[0,90,180,270].map(a=>`<path d="M150 1l2.6 6-2.6 6-2.6-6z" transform="rotate(${a} 150 150)" fill="#000" stroke="none"/><circle cx="150" cy="40" r="1.6" transform="rotate(${a} 150 150)" fill="#000" stroke="none"/>`).join('');
  const scal=K.scallop(56,140,3.2,150,150);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" fill="none" stroke="#000" stroke-linecap="round">
   <circle cx="150" cy="150" r="98" stroke-width="1.1"/><circle cx="150" cy="150" r="100.5" stroke-width=".5"/>
   <circle cx="150" cy="150" r="114" stroke-width=".7"/><circle cx="150" cy="150" r="133" stroke-dasharray=".1 3.4" stroke-width="1.2"/>
   <circle cx="150" cy="150" r="136" stroke-width="1"/><path d="${scal}" stroke-width=".6"/>${t}${diamonds}</svg>`}
const RING=K.uri(ringArt());
// thin double frame with small crescents in the corners (mask)
const FRAME=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="#000"><rect x=".6" y=".6" width="98.8" height="98.8" stroke-width="1.2" vector-effect="non-scaling-stroke"/><rect x="2" y="1.4" width="96" height="97.2" stroke-width=".6" vector-effect="non-scaling-stroke"/></svg>`);
const CORNER=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M14 4a10 10 0 1 0 10 14 8 8 0 1 1-10-14z"/><circle cx="31" cy="7" r="1.3"/><circle cx="35" cy="14" r=".8"/><path d="M28 25l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1z"/></svg>`);
const CRES=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 2.5a9.6 9.6 0 1 0 12.4 13.2A8 8 0 1 1 9 2.5z"/></svg>`);
const STAR4=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0Q12.9 11.1 24 12 12.9 12.9 12 24 11.1 12.9 0 12 11.1 11.1 12 0z"/></svg>`);
// the big moon: lit disc with limb darkening and maria, a shadow that recedes (crescent -> full)
function bigMoon(c,id){const R=86,cx=150,cy=150;
  const maria=[[132,122,16,12,-20],[164,136,13,10,15],[146,168,19,11,8],[176,170,9,7,0],[120,158,8,6,0],[158,104,7,5,0]].map(([x,y,a,b,r])=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" transform="rotate(${r} ${x} ${y})"/>`).join('');
  const craters=[[184,120,4],[112,132,3],[150,196,3.4],[196,152,2.4],[128,184,2],[170,92,2.2]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c.ink}" stroke-opacity=".18" stroke-width=".7"/>`).join('');
  return `<svg class="bln-mv" viewBox="0 0 300 300"><defs>
   <radialGradient id="bm${id}" cx="44%" cy="40%" r="62%"><stop offset="0" stop-color="${c.moon}"/><stop offset=".72" stop-color="${c.moon}"/><stop offset="1" stop-color="${c.moonEdge}"/></radialGradient>
   <radialGradient id="bg${id}" cx="50%" cy="50%" r="50%"><stop offset=".55" stop-color="${c.moon}" stop-opacity=".22"/><stop offset="1" stop-color="${c.moon}" stop-opacity="0"/></radialGradient>
   <filter id="bf${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter>
   <clipPath id="bc${id}"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>
   <mask id="bk${id}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff"/><rect class="bln-sl" x="${cx-R-1}" y="${cy-R-1}" width="${R+1}" height="${2*R+2}" fill="#000"/><ellipse class="bln-se" cx="${cx}" cy="${cy}" rx="${R+.6}" ry="${R+.6}" fill="#000"/><ellipse class="bln-le" cx="${cx}" cy="${cy}" rx="${R}" ry="${R}" fill="#fff"/></mask></defs>
   <circle class="bln-glow" cx="${cx}" cy="${cy}" r="${R+44}" fill="url(#bg${id})"/>
   <g clip-path="url(#bc${id})">
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#bm${id})"/>
    <rect class="bln-sl" x="${cx-R-1}" y="${cy-R-1}" width="${R+1}" height="${2*R+2}" fill="${c.shade}"/>
    <ellipse class="bln-se" cx="${cx}" cy="${cy}" rx="${R+.6}" ry="${R+.6}" fill="${c.shade}"/>
    <ellipse class="bln-le" cx="${cx}" cy="${cy}" rx="${R}" ry="${R}" fill="url(#bm${id})"/>
    <g mask="url(#bk${id})"><g fill="${c.ink}" opacity=".1" filter="url(#bf${id})">${maria}</g>${craters}</g>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${c.ink}" stroke-opacity=".12" stroke-width="6"/>
   </g>
   <circle cx="${cx}" cy="${cy}" r="${R+.5}" fill="none" stroke="${c.gold}" stroke-width=".9"/></svg>`}
// the arc of seven phases (waxing crescent .. waning crescent) with an engraved orbit line
function arcPhases(c){const ps=[.1,.25,.38,.5,.62,.75,.9];let s='';
  ps.forEach((p,i)=>{const t=(i-3)/3,x=200+t*160,y=58+t*t*30,R=i===3?17:12.5-Math.abs(t)*1.5;s+=phase(p,R,x,y,c,.8)});
  const dots=Array.from({length:6},(_,i)=>{const t=(i-2.5)/3,x=200+t*160,y=58+t*t*30;return `<path d="M${f2(x)} ${f2(y-3)}l1 3-1 3-1-3z" fill="${c.gold}"/>`}).join('');
  return `<svg class="bln-arc" viewBox="0 0 400 110"><path d="M28 92Q200 22 372 92" fill="none" stroke="${c.gold}" stroke-width=".6" stroke-dasharray="1 3" opacity=".9"/>
   <path d="M30 100Q200 30 370 100" fill="none" stroke="${c.gold}" stroke-width=".5" opacity=".55"/>${dots}${s}</svg>`}
function rowPhases(c){const ps=[0,.12,.25,.38,.5,.62,.75,.88,1];let s='';
  ps.forEach((p,i)=>{const x=20+i*45,R=i===4?14:10;s+=phase(p%1,R,x,24,c,.8)});
  return `<svg class="bln-row" viewBox="0 0 400 48"><path d="M0 24H400" stroke="${c.gold}" stroke-width=".5" opacity=".7"/>${s}</svg>`}
const foil=(cls,uri)=>`<i class="bln-foil ${cls}" style="-webkit-mask-image:${uri};mask-image:${uri}"></i>`;
const hijri=o=>o.hijri?esc(o.hijri):'';
FAMILY({key:'bulan',name:'Bulan',meaning:'Moon phases',
  blurb:'An arc of moon phases in gold foil over a midnight sky; touch the moon and it waxes to full.',
  fonts:{d:"'Marcellus', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    return `<section class="page pg-bulan ${c.light?'bln-lt':''}" style="--moon:${c.moon}"><div class="bln-sky"></div>${sky(c,77+id,390,760,170)}
     ${foil('bln-frame',FRAME)}${['tl','tr','bl','br'].map(k=>foil('bln-cn '+k,CORNER)).join('')}
     <div class="bln-halo">${foil('bln-ring',RING)}</div>
     <div class="bln-pin">
      <p class="bln-k reveal">${ev(o,L)}</p>
      <div class="bln-rowwrap reveal">${rowPhases(c)}</div>
      <h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
      <div class="bln-rule reveal d2"><i></i>${foil('bln-st',STAR4)}<i></i></div>
      <p class="bln-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p>
      ${o.hijri?`<p class="bln-hj reveal d2">${hijri(o)}</p>`:''}
      <p class="bln-ven reveal d3">${esc(o.venue)}</p>
      <p class="bln-time reveal d3">${en?'From':'Mulai'} ${esc(fmtTime(o.start,o.lang))}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    const ringTxt=`${(o.hijri||'').toUpperCase()}  ·  ${fmtShort(o.date)}  ·  ${(o.hijri||'').toUpperCase()}  ·  ${fmtShort(o.date)}`;
    return `<div class="cover cv-bulan ${c.light?'bln-lt':''}" style="--moon:${c.moon}"><div class="bln-sky"></div>${sky(c,11+id)}
     ${foil('bln-frame',FRAME)}${['tl','tr','bl','br'].map(k=>foil('bln-cn '+k,CORNER)).join('')}
     <p class="bln-k bln-fade">${ev(o,L)}</p>
     <div class="bln-arcw bln-fade">${arcPhases(c)}</div>
     <div class="bln-stage">${foil('bln-ring',RING)}
      <svg class="bln-rt bln-fade" viewBox="0 0 300 300"><defs><path id="rp${id}" d="M150 150m-124 0a124 124 0 1 1 248 0a124 124 0 1 1-248 0"/></defs><text font-size="7.4" letter-spacing="2.6" fill="${c.gold}"><textPath href="#rp${id}" startOffset="0">${esc(ringTxt)}</textPath></text></svg>
      <${tag} class="bln-moon" ${attr} aria-label="${L.open}">${bigMoon(c,id)}</${tag}></div>
     <div class="bln-txt bln-fade"><p class="bln-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
      <div class="bln-rule"><i></i>${foil('bln-st',STAR4)}<i></i></div><p class="bln-date">${esc(fmtDate(o.date,o.lang))}</p>
      ${guest?`<p class="bln-to"><span>${L.dear}</span><b>${esc(guest)}</b></p>`:''}</div>
     <p class="bln-hint bln-fade">${en?'Touch the moon to open':'Sentuh bulan untuk membuka'}</p></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--bln-cres',CRES);el.style.setProperty('--bln-star',STAR4);
    el.style.setProperty('--bln-dust',K.uri(`<svg xmlns="http://www.w3.org/2000/svg" width="260" height="300">${dust(260,300,60,5,th.c,2)}</svg>`));
    $$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(h&&!$('.bln-h',h)){h.insertAdjacentHTML('afterbegin','<i class="bln-h"></i>')}
      if(i)s.insertAdjacentHTML('beforebegin','<div class="bln-div" aria-hidden="true"><i></i><b></b><s></s><b></b><i></i></div>')})},
  themes:[
    {k:'malam',n:'Malam',desc:'Ivory moon, gold foil, midnight navy',c:{ground:'#0f1a33',sheet:'#f7f1e3',ink:'#1d2233',accent:'#1f2d55',gold:'#cfa75a',pagefg:'#f3ead6',moon:'#f4ecd8',moonEdge:'#d9cdb0',shade:'#1a2645',star:'#fdf6e3'}},
    {k:'nila',n:'Nila',desc:'Indigo night with a silver moon',c:{ground:'#1c1f4a',sheet:'#f4f2f8',ink:'#20223d',accent:'#36307a',gold:'#c7b07a',pagefg:'#eeeaf7',moon:'#eef0f5',moonEdge:'#c9cdd9',shade:'#272b5e',star:'#ffffff'}},
    {k:'marun',n:'Marun',desc:'Maroon dusk, rose-gold foil',c:{ground:'#3a1220',sheet:'#fbf3ea',ink:'#2d1a1e',accent:'#7a1d33',gold:'#d6a374',pagefg:'#f8e9df',moon:'#f8ebdc',moonEdge:'#e0c4ad',shade:'#4b1a2a',star:'#fde9dc'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald night and pale gold',c:{ground:'#0d2a24',sheet:'#f5f1e4',ink:'#16261f',accent:'#14523f',gold:'#d0b26a',pagefg:'#eef0e2',moon:'#f2eedc',moonEdge:'#d3cdb2',shade:'#163a32',star:'#fbf8e8'}},
    {k:'hitam',n:'Hitam',desc:'Black velvet sky, bright gold',c:{ground:'#0c0c0e',sheet:'#f3eee4',ink:'#17171a',accent:'#2a2a30',gold:'#d4ae5c',pagefg:'#efe8d8',moon:'#efe9dc',moonEdge:'#cfc6b2',shade:'#1b1b20',star:'#fff8e6'}},
    {k:'gading',n:'Gading',desc:'Navy linework on ivory paper',c:{light:1,ground:'#efe7d6',sheet:'#fffaf0',ink:'#20263a',accent:'#1f2d55',gold:'#94702f',pagefg:'#20263a',moon:'#fffdf7',moonEdge:'#e9dcc0',shade:'#ddd1b9',star:'#9b7a3c',line:'rgba(31,45,85,.2)'}},
    {k:'jambu',n:'Jambu',desc:'Dawn blush with a pearl moon',c:{light:1,ground:'#f1dcd8',sheet:'#fffaf6',ink:'#3a2329',accent:'#8c3a52',gold:'#9a6d3f',pagefg:'#3a2329',moon:'#fffaf6',moonEdge:'#ecd3cd',shade:'#e3c6c1',star:'#a87c55',line:'rgba(140,58,82,.2)'}},
    {k:'laut',n:'Laut',desc:'Pale sea-blue morning, soft gold',c:{light:1,ground:'#d8e3ea',sheet:'#fbfcfb',ink:'#1e2f3d',accent:'#24506e',gold:'#8a6a35',pagefg:'#1e2f3d',moon:'#ffffff',moonEdge:'#d6e0e6',shade:'#c4d3dd',star:'#8a7445',line:'rgba(36,80,110,.2)'}},
  ]});
