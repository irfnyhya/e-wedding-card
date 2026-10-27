/* permaidani: a Persian medallion carpet (lechek-toranj) laid on a plank floor.
   Knotted warp fringe at both ends, kilim end bands, an outer guard, a wide main border of rosettes and palmettes,
   an inner reciprocal guard, a field of scrolling vines, four corner quarter-medallions and the lobed central medallion
   with pendants; the couple's names sit in the ivory heart of the medallion.
   Cover: tap the carpet and it rolls up from the bottom; then the room fades. Page: the carpet borders frame the names.
   Skin: each section is bound in a carpet border band. */
const hx=h=>{h=h.replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const lum=a=>{const [r,g,b]=hx(a);return (r*.299+g*.587+b*.114)/255};
const f1=v=>+v.toFixed(1);
let uid=0;
const PET='M0 0C1.8-1.2 2.4-3.6 0-6.4C-2.4-3.6-1.8-1.2 0 0Z';
function ros(x,y,s,n,cp,cc,ci){let p='';for(let i=0;i<n;i++)p+=`<path d="${PET}" transform="rotate(${f1(i*360/n)})" fill="${cp}"/>`;return `<g transform="translate(${x} ${y}) scale(${s})">${p}<circle r="2.2" fill="${cc}"/><circle r=".9" fill="${ci}"/></g>`}
const PALM='M0 6C-6 4-9-2-6-8C-5-4-3-3-2-4C-3-8-1-11 0-14C1-11 3-8 2-4C3-3 5-4 6-8C9-2 6 4 0 6Z';
const svg=(w,h,body)=>`<svg ${NS} width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

/* ---- tiles ---- */
function mainTile(c,vert){const t=`<rect width="40" height="22" fill="${c.border}"/>
  <path d="M0 11C4 4 8 4 10 11S16 18 20 11S26 4 30 11S36 18 40 11" fill="none" stroke="${c.gold}" stroke-width=".6"/>
  ${ros(10,11,1.15,8,lum(c.border)>.6?c.field:c.ivory,lum(c.border)>.6?c.medal:c.field,c.gold)}<g transform="translate(30 11) rotate(90) scale(.62)"><path d="${PALM}" fill="${c.field}" stroke="${lum(c.border)>.6?c.medal:c.ivory}" stroke-width=".8"/><path d="M0 3V-9" stroke="${c.gold}" stroke-width=".8"/></g>
  ${[[20,5,30],[20,17,-30],[0,5,30],[40,17,-30]].map(([x,y,a])=>`<path d="M0 0C1.2-.8 3-.8 4 0C3 .8 1.2 .8 0 0Z" transform="translate(${x-2} ${y}) rotate(${a} 2 0)" fill="${c.leaf}"/>`).join('')}
  <path d="M0 .5H40M0 21.5H40" stroke="${c.ink}" stroke-width="1"/>`;
  return vert?svg(22,40,`<g transform="translate(22 0) rotate(90)">${t}</g>`):svg(40,22,t)}
function guardTile(c,vert){const t=`<rect width="10" height="7" fill="${c.ivory}"/><path d="M0 7V4.4C1.6 4.4 2-.2 2.5-.2S3.4 4.4 5 4.4 6.6 7 5 7ZM5 7V4.4C6.6 4.4 7-.2 7.5-.2S8.4 4.4 10 4.4V7Z" fill="${c.field}"/><circle cx="2.5" cy="4.6" r=".7" fill="${c.ivory}"/><circle cx="7.5" cy="4.6" r=".7" fill="${c.ivory}"/><path d="M0 .4H10M0 6.6H10" stroke="${c.ink}" stroke-width=".6"/>`;
  return vert?svg(7,10,`<g transform="translate(7 0) rotate(90)">${t}</g>`):svg(10,7,t)}
function outerTile(c){return svg(8,8,`<rect width="8" height="8" fill="${c.ivory2}"/><path d="M4 1.6L6.4 4 4 6.4 1.6 4Z" fill="${c.border}"/><circle cx="4" cy="4" r=".8" fill="${c.gold}"/><circle cx="0" cy="0" r=".8" fill="${c.field}"/><circle cx="8" cy="0" r=".8" fill="${c.field}"/><circle cx="0" cy="8" r=".8" fill="${c.field}"/><circle cx="8" cy="8" r=".8" fill="${c.field}"/>`)}
function fieldTile(c){const L=c.fline,F=c.fflow;return svg(36,36,`<rect width="36" height="36" fill="${c.field}"/>
  <g fill="none" stroke="${L}" stroke-width=".55"><path d="M0 0C8 4 10 14 18 18S28 32 36 36M36 0C28 4 26 14 18 18S8 32 0 36"/><path d="M18 0C14 6 14 12 18 18S22 30 18 36" opacity=".6"/></g>
  ${ros(18,18,.8,6,F,c.gold,c.field)}${ros(0,0,.7,8,c.fflow2,c.gold,c.field)}${ros(36,0,.7,8,c.fflow2,c.gold,c.field)}${ros(0,36,.7,8,c.fflow2,c.gold,c.field)}${ros(36,36,.7,8,c.fflow2,c.gold,c.field)}
  ${[[9,6,40],[27,6,140],[9,30,-40],[27,30,-140],[18,9,90],[18,27,-90]].map(([x,y,a])=>`<path d="M0 0C1.4-1 3.4-1 4.6 0C3.4 1 1.4 1 0 0Z" transform="translate(${x} ${y}) rotate(${a})" fill="${c.fleaf}"/>`).join('')}
  <circle cx="18" cy="2" r=".7" fill="${F}"/><circle cx="18" cy="34" r=".7" fill="${F}"/><circle cx="2" cy="18" r=".7" fill="${F}"/><circle cx="34" cy="18" r=".7" fill="${F}"/>`)}
function kilimTile(c){return svg(12,6,`<rect width="12" height="6" fill="${c.ivory2}"/><path d="M0 1.5H12" stroke="${c.field}" stroke-width="1"/><path d="M0 3.6H12" stroke="${c.border}" stroke-width=".7"/><path d="M0 5H12" stroke="${c.field}" stroke-width=".5" stroke-dasharray="2 2"/>`)}
function fringeTile(c){const s=mix(c.ivory2,'#8a7a62',.35);return svg(6,20,`<path d="M1.6 0C1.6 2 2.4 3 3 4.6M4.4 0C4.4 2 3.6 3 3 4.6" stroke="${c.ivory2}" stroke-width="1.1" fill="none"/><ellipse cx="3" cy="5.6" rx="1.4" ry="1.3" fill="${c.ivory2}" stroke="${s}" stroke-width=".4"/>
  <path d="M2.4 6.6C2 11 2.6 15 2 19.6M3 6.8V19.8M3.6 6.6C4 11 3.4 15 4 19.6" stroke="${c.ivory2}" stroke-width=".7" fill="none"/><path d="M3 7V19" stroke="${s}" stroke-width=".25"/>`)}
function cornerRos(c){return svg(30,30,`<rect width="30" height="30" fill="${c.border}"/><path d="M15 2L28 15 15 28 2 15Z" fill="${c.field}" stroke="${c.ivory}" stroke-width=".8"/>${ros(15,15,1.3,8,c.ivory,c.gold,c.border)}<path d="M.5 .5H29.5V29.5H.5Z" fill="none" stroke="${c.ink}" stroke-width="1"/>`)}

/* ---- medallion (lobed, with pendants) ---- */
function lobed(rx,ry,n,d,cx=100,cy=160){let p='';for(let i=0;i<n;i++){const a0=i/n*Math.PI*2,a1=(i+1)/n*Math.PI*2,am=(a0+a1)/2;const q=(a,k)=>[cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k];
  const [x0,y0]=q(a0,1),[x1,y1]=q(a1,1),[xm,ym]=q(am,1+d);p+=(i?'':`M${f1(x0)} ${f1(y0)}`)+`Q${f1(xm)} ${f1(ym)} ${f1(x1)} ${f1(y1)}`}return p+'Z'}
function pendant(c,line){const st=line?`fill="none" stroke="${c.lineCol}" stroke-width=".8"`:`fill="${c.medal}" stroke="${c.ivory}" stroke-width="1.2"`;
  return `<path d="M100 54C88 50 80 42 82 32C88 34 92 30 92 24C92 18 96 12 100 4C104 12 108 18 108 24C108 30 112 34 118 32C120 42 112 50 100 54Z" ${st}/>
   ${line?'':`<path d="M100 48C93 45 89 40 90 34C94 35 97 32 97 28C97 24 99 20 100 15C101 20 103 24 103 28C103 32 106 35 110 34C111 40 107 45 100 48Z" fill="${c.field}"/>${ros(100,36,.8,6,c.ivory,c.gold,c.medal)}`}
   <path d="M100 4V-2" stroke="${line?c.lineCol:c.gold}" stroke-width="1"/><circle cx="100" cy="-3.4" r="2" fill="${line?'none':c.gold}" stroke="${line?c.lineCol:'none'}" stroke-width=".6"/>`}
function medallion(c,id,line){const ring=(rx,ry,n,f)=>{let s='';for(let i=0;i<n;i++){const a=i/n*Math.PI*2,x=100+Math.cos(a)*rx,y=160+Math.sin(a)*ry;s+=f(x,y,a)}return s};
  if(line){const L=c.lineCol;return `<g fill="none" stroke="${L}"><path d="${lobed(92,116,22,.09)}" stroke-width="1"/><path d="${lobed(86,108,22,.07)}" stroke-width=".5"/><path d="${lobed(72,92,16,.06)}" stroke-width=".7"/>
     <ellipse cx="100" cy="160" rx="58" ry="74" stroke-width=".8"/><ellipse cx="100" cy="160" rx="54" ry="70" stroke-width=".4" stroke-dasharray=".1 2.6" stroke-linecap="round"/></g>
     ${ring(79,100,22,(x,y,a)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a*180/Math.PI+90)}) scale(.55)"><path d="${PET}" fill="${L}" opacity=".7"/></g>`)}
     ${pendant(c,1)}<g transform="translate(0 320) scale(1 -1)">${pendant(c,1)}</g>`}
  const arab=(()=>{let s='';for(let q=0;q<4;q++){const sx=q%2?-1:1,sy=q>1?-1:1;s+=`<g transform="translate(100 160) scale(${sx} ${sy})" fill="none" stroke="${c.gold}" stroke-width=".7">
     <path d="M4 -74C20 -70 34 -60 40 -44C44 -34 52 -28 60 -26"/><path d="M40 -44C36 -48 30 -48 28 -44S30 -38 34 -40"/><path d="M60 -6C64 -20 62 -34 56 -44"/><path d="M60 -6C56 -8 52 -6 52 -2S56 3 58 0"/></g>
     <g transform="translate(100 160) scale(${sx} ${sy})">${ros(22,-66,.62,6,c.ivory,c.gold,c.medal2)}${ros(64,-24,.62,6,c.ivory,c.gold,c.medal2)}${ros(46,-52,.5,5,c.ivory2,c.gold,c.medal2)}
      <path d="M0 0C1.6-1.2 4-1.2 5.4 0C4 1.2 1.6 1.2 0 0Z" transform="translate(30 -58) rotate(-40)" fill="${c.leaf}"/><path d="M0 0C1.6-1.2 4-1.2 5.4 0C4 1.2 1.6 1.2 0 0Z" transform="translate(54 -38) rotate(-70)" fill="${c.leaf}"/></g>`}return s})();
  return `<defs><clipPath id="mb${id}"><path d="${lobed(72,92,16,.06)}"/></clipPath><filter id="md${id}" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000" flood-opacity=".35"/></filter></defs>
   ${pendant(c)}<g transform="translate(0 320) scale(1 -1)">${pendant(c)}</g>
   <path d="${lobed(94,118,22,.09)}" fill="${c.ivory}" filter="url(#md${id})"/><path d="${lobed(92,116,22,.09)}" fill="${c.medal}"/><path d="${lobed(89,112.5,22,.09)}" fill="none" stroke="${c.ivory}" stroke-width=".7" stroke-dasharray=".1 2.2" stroke-linecap="round"/>
   ${ring(84,106,22,(x,y,a)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a*180/Math.PI+90)})">${ros(0,0,.55,5,c.ivory,c.gold,c.medal)}</g>`)}
   ${ring(84,106,22,(x,y,a)=>{const b=a+Math.PI/22;return `<circle cx="${f1(100+Math.cos(b)*84)}" cy="${f1(160+Math.sin(b)*106)}" r="1" fill="${c.gold}"/>`})}
   <path d="${lobed(72,92,16,.06)}" fill="${c.medal2}" stroke="${c.ivory}" stroke-width="1.2"/><g clip-path="url(#mb${id})">${arab}</g>
   <ellipse cx="100" cy="160" rx="58" ry="74" fill="${c.ivory}" stroke="${c.gold}" stroke-width="1.4"/><ellipse cx="100" cy="160" rx="54" ry="70" fill="none" stroke="${c.ink}" stroke-width=".5"/>
   <ellipse cx="100" cy="160" rx="51.5" ry="67.5" fill="none" stroke="${c.gold}" stroke-width=".6" stroke-dasharray=".1 2.4" stroke-linecap="round"/>`}
function lechek(c,line){const n=8;let lob='';for(let i=0;i<=n;i++){const a=i/n*Math.PI/2,am=(i+.5)/n*Math.PI/2;const r=58,x=Math.cos(a)*r,y=Math.sin(a)*r;if(i<n){const x1=Math.cos((i+1)/n*Math.PI/2)*r,y1=Math.sin((i+1)/n*Math.PI/2)*r;lob+=(i?'':`M0 0L${f1(x)} ${f1(y)}`)+`Q${f1(Math.cos(am)*r*1.12)} ${f1(Math.sin(am)*r*1.12)} ${f1(x1)} ${f1(y1)}`}}lob+='Z';
  if(line)return `<svg viewBox="0 0 70 70"><path d="${lob}" fill="none" stroke="${c.lineCol}" stroke-width="1"/><path d="M0 0L36 0A36 36 0 0 1 0 36Z" fill="none" stroke="${c.lineCol}" stroke-width=".6"/>${ros(16,16,1,8,c.lineCol,c.sheet,c.lineCol)}</svg>`;
  return `<svg viewBox="0 0 70 70"><path d="${lob}" fill="${c.medal}" stroke="${c.ivory}" stroke-width="1.4"/><path d="M0 0L42 0A42 42 0 0 1 0 42Z" fill="${c.medal2}" stroke="${c.gold}" stroke-width=".6"/>
   <path d="M0 30C10 30 22 22 26 10M30 0C30 12 24 24 10 30" fill="none" stroke="${c.gold}" stroke-width=".6"/>${ros(14,14,1.1,8,c.ivory,c.gold,c.medal)}${ros(30,4,.55,5,c.ivory,c.gold,c.medal2)}${ros(4,30,.55,5,c.ivory,c.gold,c.medal2)}
   ${[0,1,2,3,4,5,6].map(i=>{const a=(i+.5)/7*Math.PI/2;return `<circle cx="${f1(Math.cos(a)*50)}" cy="${f1(Math.sin(a)*50)}" r="1.3" fill="${c.ivory}"/>`}).join('')}</svg>`}

function cols(th){const c={...th.c};c.ivory=c.sheet;c.ivory2=mix(c.sheet,'#ffffff',.2);c.leaf=c.leaf||mix('#3d6a46',c.field,.2);
  const dk=lum(c.field)<.5;c.fline=dk?mix(c.field,c.gold,.55):mix(c.field,c.border,.5);c.fflow=dk?mix(c.field,c.ivory,.55):mix(c.field,c.border,.6);c.fflow2=dk?mix(c.field,c.medal,.6):mix(c.field,c.medal,.55);c.fleaf=dk?mix(c.field,c.leaf,.7):mix(c.field,c.leaf,.6);
  c.medal2=c.medal2||c.field;c.lineCol=c.gold;return c}
function vars(c){return `--pm-mh:${K.uri(mainTile(c))};--pm-mv:${K.uri(mainTile(c,1))};--pm-gh:${K.uri(guardTile(c))};--pm-gv:${K.uri(guardTile(c,1))};--pm-o:${K.uri(outerTile(c))};--pm-kl:${K.uri(kilimTile(c))};--pm-fr:${K.uri(fringeTile(c))};--pm-cr:${K.uri(cornerRos(c))};--pm-bc:${c.border};--pm-ink:${c.ink};--pm-iv:${c.ivory}`}
function rug(c,fieldBg,inner,cls=''){return `<div class="pm-rug ${cls}" style="${vars(c)};--pm-fd:${fieldBg}"><i class="pm-fringe t"></i><i class="pm-fringe b"></i>
  <div class="pm-kilim"><div class="pm-g1"><div class="pm-main"><i class="pm-cr tl"></i><i class="pm-cr tr"></i><i class="pm-cr bl"></i><i class="pm-cr br"></i><div class="pm-g2"><div class="pm-field">${inner}</div></div></div></div></div></div>`}

FAMILY({key:'permaidani',name:'Permaidani',meaning:'Persian carpet',
  blurb:'A hand-knotted medallion carpet with nested borders and a knotted fringe; touch it and it rolls up from the floor.',
  fonts:{d:"'Marcellus', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1550,
  page(o,th,L){const [n1,n2]=coverNames(o),c=cols(th),id='p'+(++uid);const pc={...c,field:c.sheet,fline:mix(c.sheet,c.gold,.32),fflow:mix(c.sheet,c.gold,.3),fflow2:mix(c.sheet,c.medal,.18),fleaf:mix(c.sheet,c.leaf,.25)};
    const lk=lechek(c);
    return `<section class="page pg-permaidani"><div class="pm-floor"></div>${rug(c,K.uri(fieldTile(pc)),`
     <i class="pm-lk tl">${lk}</i><i class="pm-lk tr">${lk}</i><i class="pm-lk bl">${lk}</i><i class="pm-lk br">${lk}</i>
     <svg class="pm-ghost" viewBox="-4 -8 208 336">${medallion({...c,lineCol:mix(c.sheet,c.gold,.55)},id,1)}</svg>
     <div class="pm-ptxt"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
      <div class="pm-rule reveal d2"><span></span></div>
      <p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div>`,'pm-page')}</section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=cols(th),id='c'+(++uid);const Ln=Math.max((n1||'').length,(n2||'').length,5),fs=Math.min(32,148/(Ln*.47));const lk=lechek(c);
    return `<div class="cover cv-permaidani"><div class="pm-floor"></div>
     <${tag} class="pm-tap" ${attr} aria-label="${L.open}">${rug(c,K.uri(fieldTile(c)),`
      <i class="pm-lk tl">${lk}</i><i class="pm-lk tr">${lk}</i><i class="pm-lk bl">${lk}</i><i class="pm-lk br">${lk}</i>
      <span class="pm-med"><svg viewBox="-4 -8 208 336">${medallion(c,id)}</svg><span class="pm-in"><span class="pm-k">${ev(o,L)}</span><span class="pm-n" style="font-size:${f1(fs)}px">${esc(n1)}<i>&amp;</i>${esc(n2)}</span><span class="pm-d">${esc(fmtShort(o.date))}</span></span></span>`)}</${tag}>
     <i class="pm-roll" style="--pm-bc:${c.border};--pm-fd2:${c.field};--pm-iv:${c.ivory}"></i>
     <div class="pm-foot">${guest?`<p class="pm-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="pm-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=cols(th);el.setAttribute('style',el.getAttribute('style')+';'+vars(c));
    el.style.setProperty('--pm-pend',K.uri(`<svg ${NS} viewBox="76 -8 48 66">${pendant(c)}</svg>`));
    $$('.sec h2',el).forEach(h=>{h.classList.add('pm-h2');h.insertAdjacentHTML('afterbegin','<i class="pm-hp"></i>')});
    $$('.sheet > .sec',el).forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="pm-cr tl"></i><i class="pm-cr tr"></i><i class="pm-cr bl"></i><i class="pm-cr br"></i>'))},
  themes:[
    {k:'merah',n:'Merah Tabriz',desc:'Madder red field, indigo border',c:{ground:'#2b1e18',sheet:'#f3e6cb',ink:'#1d1717',accent:'#8c1c22',gold:'#d6a548',field:'#8c1c22',border:'#1d2b4c',medal:'#1d2b4c',medal2:'#8c1c22',pagefg:'#f1e4c8',dark:1}},
    {k:'nila',n:'Nila',desc:'Indigo field, madder medallion',c:{ground:'#231a16',sheet:'#f2e5c9',ink:'#1b1a1e',accent:'#1e2a4e',gold:'#d6a548',field:'#1e2a4e',border:'#7c1e24',medal:'#8a2626',medal2:'#1e2a4e',pagefg:'#f1e4c8',dark:1}},
    {k:'gading',n:'Gading',desc:'Ivory field, rust and indigo',c:{ground:'#d8ccb6',sheet:'#f7efdd',ink:'#2a1f1a',accent:'#7a2a26',gold:'#b5853a',field:'#eadcbd',border:'#7a2a26',medal:'#26385e',medal2:'#7a2a26',pagefg:'#2e231b'}},
    {k:'zamrud',n:'Zamrud',desc:'Green field, camel border',c:{ground:'#261d17',sheet:'#f2e6cc',ink:'#1b1d18',accent:'#1f4a3a',gold:'#d8ae55',field:'#1f4a3a',border:'#8a6a34',medal:'#6e1e22',medal2:'#1f4a3a',pagefg:'#f0e3c6',dark:1}},
    {k:'jambu',n:'Jambu Kashan',desc:'Rose field, slate border',c:{ground:'#e6dbd3',sheet:'#fbf3ea',ink:'#2e2226',accent:'#8e3f45',gold:'#b08546',field:'#c98a80',border:'#3b4a6a',medal:'#3b4a6a',medal2:'#a85a58',pagefg:'#3a2a2e'}},
    {k:'hitam',n:'Hitam',desc:'Black field, red and gold',c:{ground:'#141110',sheet:'#efe2c6',ink:'#151313',accent:'#9a2228',gold:'#d4a548',field:'#1f1b1c',border:'#86202a',medal:'#86202a',medal2:'#1f1b1c',pagefg:'#ece0c4',dark:1}},
    {k:'biru',n:'Biru Kerman',desc:'Blue field, ivory border',c:{ground:'#1e1a19',sheet:'#f5ead2',ink:'#1c2230',accent:'#3b5f8a',gold:'#c99a48',field:'#3b5f8a',border:'#ecdcbb',medal:'#8c2a2a',medal2:'#2e4a70',pagefg:'#efe3c8',dark:1}},
    {k:'terakota',n:'Terakota',desc:'Terracotta field, forest border',c:{ground:'#e2d5c0',sheet:'#f8eedb',ink:'#2a1e16',accent:'#a4502e',gold:'#b8893c',field:'#a4502e',border:'#2e3b2c',medal:'#2e3b2c',medal2:'#a4502e',pagefg:'#2e2118'}},
  ]});
