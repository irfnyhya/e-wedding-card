/* mughal "Mahal": a white-marble (or sandstone) Mughal palace bay. A cusped arch framed by pietra-dura inlay bands,
   jharokha balconies flanking the title, and behind a pierced marble jali a painted miniature garden:
   cypress avenues, a water channel, a far pavilion and a lotus pond under a gilded sky.
   Cover: tap the jali and it sinks down out of view, unveiling the garden; then the scene fades.
   Page: the same cusped arch with inlay around the names. Skin: cusped-arch headings and inlay borders. */
const hx=h=>{h=h.replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const f1=v=>+v.toFixed(1);
let uid=0;

/* ---- cusped (multifoil) arch geometry ---- */
function archSide(x0,ys,cx,ya,steps=40){const h=ys-ya,w=cx-x0,pts=[];
  const P0=[x0,ys],P1=[x0,ys-h*.62],P2=[cx-w*.42,ya+h*.16],P3=[cx,ya];
  for(let i=0;i<=steps;i++){const t=i/steps,u=1-t;pts.push([u*u*u*P0[0]+3*u*u*t*P1[0]+3*u*t*t*P2[0]+t*t*t*P3[0],u*u*u*P0[1]+3*u*u*t*P1[1]+3*u*t*t*P2[1]+t*t*t*P3[1]])}return pts}
function archPts(x0,x1,ys,ya){const cx=(x0+x1)/2,L=archSide(x0,ys,cx,ya),R=archSide(x1,ys,cx,ya).reverse();return L.concat(R.slice(1))}
function plainArch(x0,x1,ys,ya,yb){const p=archPts(x0,x1,ys,ya);return `M${f1(x0)} ${yb}V${ys}`+p.map(q=>`L${f1(q[0])} ${f1(q[1])}`).join('')+`V${yb}`}
function cuspArch(x0,x1,ys,ya,yb,n=9,k=.6){const p=archPts(x0,x1,ys,ya),len=[0];
  for(let i=1;i<p.length;i++)len.push(len[i-1]+Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]));
  const T=len[len.length-1],at=s=>{let i=1;while(i<len.length-1&&len[i]<s)i++;const t=(s-len[i-1])/(len[i]-len[i-1]||1);return [p[i-1][0]+(p[i][0]-p[i-1][0])*t,p[i-1][1]+(p[i][1]-p[i-1][1])*t]};
  let d=`M${f1(x0)} ${yb}V${ys}`;let prev=p[0];
  for(let i=1;i<=n;i++){const q=at(T*i/n),ch=Math.hypot(q[0]-prev[0],q[1]-prev[1]);d+=`A${f1(ch*k)} ${f1(ch*k)} 0 0 1 ${f1(q[0])} ${f1(q[1])}`;prev=q}
  return d+`V${yb}`}

/* ---- pietra dura: stone flowers with a soft tonal gradient and hairline joints ---- */
const PET='M0 0C2.6-1.4 3.6-5 0-10C-3.6-5-2.6-1.4 0 0Z';
const LEAF='M0 0C3-2 4.4-6.6 0-12C-4.4-6.6-3-2 0 0Z';
function stoneDefs(c,id){const g=(n,col)=>`<linearGradient id="${n}${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${mix(col,'#000000',.28)}"/><stop offset=".55" stop-color="${col}"/><stop offset="1" stop-color="${mix(col,'#ffffff',.38)}"/></linearGradient>`;
  return g('ga',c.accent)+g('gl',c.leaf)+g('gb',c.lapis)+g('gg',c.gold)}
function rosette(x,y,s,n,id,c,fill='ga'){let p='';for(let i=0;i<n;i++)p+=`<path d="${PET}" transform="rotate(${i*360/n})" fill="url(#${fill}${id})" stroke="${c.joint}" stroke-width=".35"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${p}<circle r="2.4" fill="url(#gg${id})" stroke="${c.joint}" stroke-width=".35"/><circle r=".9" fill="${c.joint}"/></g>`}
function tulip(id,c){return `<path d="M0 0C-4-2-5-8-3.4-12L-1.2-8.6 0-13.4 1.2-8.6 3.4-12C5-8 4-2 0 0Z" fill="url(#ga${id})" stroke="${c.joint}" stroke-width=".35"/><path d="M0-1V-9" stroke="${c.joint}" stroke-width=".3" opacity=".6"/>`}
function spray(x,y,s,rot,id,c,kind=0){const leaf=(lx,ly,a,sc=1)=>`<path d="${LEAF}" transform="translate(${lx} ${ly}) rotate(${a}) scale(${sc})" fill="url(#gl${id})" stroke="${c.joint}" stroke-width=".35"/><path d="M0 -1L0 -10" transform="translate(${lx} ${ly}) rotate(${a}) scale(${sc})" stroke="${c.joint}" stroke-width=".25" opacity=".55"/>`;
  const head=kind===0?`<g transform="translate(0 -34)">${tulip(id,c)}</g>`:rosette(0,-38,.62,8,id,c,kind===2?'gb':'ga');
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0C-2-10 2-22 0-34" fill="none" stroke="url(#gl${id})" stroke-width="1.3" stroke-linecap="round"/>
   ${leaf(-.6,-8,-48,.9)}${leaf(.6,-14,44,.8)}${leaf(-.4,-22,-38,.62)}
   <path d="M0-20C4-23 7-24 9-28" fill="none" stroke="url(#gl${id})" stroke-width=".8"/><g transform="translate(9 -28) rotate(30) scale(.55)">${tulip(id,c)}</g>
   <path d="M0-26C-4-28-6-30-7-33" fill="none" stroke="url(#gl${id})" stroke-width=".7"/><circle cx="-7.2" cy="-34" r="1.8" fill="url(#gb${id})" stroke="${c.joint}" stroke-width=".3"/>
   ${head}</g>`}
/* an inlay band tile, 24 x 12: marble ground, onyx hairlines, a tiny flower and a pair of leaves on a running stem */
function bandTile(c,vertical){const g=`<rect width="24" height="12" fill="${c.marble}"/><path d="M0 .6H24M0 11.4H24" stroke="${c.joint}" stroke-width=".7"/><path d="M0 2H24M0 10H24" stroke="${c.gold}" stroke-width=".45"/>
   <path d="M0 6C4 3 8 3 12 6S20 9 24 6" fill="none" stroke="${c.leaf}" stroke-width=".55"/>
   <g transform="translate(6 6)">${[0,90,180,270].map(a=>`<path d="M0 0C1-.6 1.4-2 0-3.6C-1.4-2-1-.6 0 0Z" transform="rotate(${a})" fill="${c.accent}"/>`).join('')}<circle r=".8" fill="${c.gold}"/></g>
   <path d="M18 6C19.5 4 21 3.6 22 3.8C21.4 5.2 19.8 6 18 6ZM18 6C16.5 8 15 8.4 14 8.2C14.6 6.8 16.2 6 18 6Z" fill="${c.leaf}"/>`;
  return vertical?`<svg ${NS} width="12" height="24" viewBox="0 0 12 24"><g transform="translate(12 0) rotate(90)">${g}</g></svg>`:`<svg ${NS} width="24" height="12" viewBox="0 0 24 12">${g}</svg>`}

/* ---- the painted miniature behind the jali ---- */
function cypress(x,y,h,c){const w=h*.2;return `<g transform="translate(${f1(x)} ${f1(y)})"><path d="M0 0C${f1(w*.62)} ${f1(-h*.28)} ${f1(w*.5)} ${f1(-h*.78)} 0 ${f1(-h)}C${f1(-w*.5)} ${f1(-h*.78)} ${f1(-w*.62)} ${f1(-h*.28)} 0 0Z" fill="${c.cyp}"/>
  <path d="M0 ${f1(-h*.96)}V${f1(-h*.06)}" stroke="${c.cypHi}" stroke-width="${f1(Math.max(.3,h*.012))}" opacity=".7"/>${[.25,.42,.59,.76].map(t=>`<path d="M${f1(-w*.32)} ${f1(-h*t+h*.05)}L0 ${f1(-h*t)}L${f1(w*.32)} ${f1(-h*t+h*.05)}" fill="none" stroke="${c.cypHi}" stroke-width="${f1(Math.max(.25,h*.01))}" opacity=".55"/>`).join('')}</g>`}
function blossom(x,y,r,c,seed){const R=rng(seed);let d='';for(let i=0;i<9;i++)d+=`<circle cx="${f1(x+(R()-.5)*r*1.3)}" cy="${f1(y-r+(R()-.5)*r*1.1)}" r="${f1(r*.16)}" fill="${c.bloom}"/>`;
  return `<path d="M${f1(x)} ${f1(y)}V${f1(y-r*.6)}" stroke="${c.trunk}" stroke-width="${f1(r*.12)}"/><circle cx="${f1(x)}" cy="${f1(y-r)}" r="${f1(r*.82)}" fill="${c.crown}"/>${d}`}
function lotus(x,y,s,c){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0C-3-1-4.6-4-4-6.6C-2.6-5.4-1.4-4 0-3.6C1.4-4 2.6-5.4 4-6.6C4.6-4 3-1 0 0Z" fill="${c.lotus}"/><path d="M0-.6C-1.2-2.6-1.2-5.4 0-8C1.2-5.4 1.2-2.6 0-.6Z" fill="${mix(c.lotus,'#ffffff',.35)}"/><path d="M-5 .3H5" stroke="${c.cyp}" stroke-width=".6"/></g>`}
function pad(x,y,r,c){return `<path d="M${x} ${y}m${r} 0a${r} ${f1(r*.42)} 0 1 1 -${f1(r*.3)} -${f1(r*.38)}L${x} ${y}Z" fill="${c.padC}" stroke="${c.cyp}" stroke-width=".3"/>`}
function miniature(c,id){const sky=`<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.skyTop}"/><stop offset=".55" stop-color="${c.skyMid}"/><stop offset="1" stop-color="${c.skyLow}"/></linearGradient>
   <linearGradient id="wt${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(c.lapis,'#ffffff',.55)}"/><stop offset="1" stop-color="${mix(c.lapis,'#ffffff',.15)}"/></linearGradient>
   <linearGradient id="lw${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.lawnFar}"/><stop offset="1" stop-color="${c.lawn}"/></linearGradient>`;
  const H=176; // horizon
  let trees='';const rows=[[184,30,9],[196,46,16],[214,64,24],[240,88,34],[276,118,48]];
  rows.forEach(([y,h,dx],i)=>{const off=14+i*i*3.4+dx*.6;trees+=blossom(150-off-h*.28,y-1,h*.16,c,i*7+1)+blossom(150+off+h*.28,y-1,h*.16,c,i*7+3)+cypress(150-off,y,h,c)+cypress(150+off,y,h,c)});
  const cloud=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${c.cloud}" stroke="${c.gold}" stroke-width=".5"><path d="M0 0C6-6 14-6 18-1C22-5 30-5 33 0C37-3 43-2 45 2C38 4 30 3 26 6C20 3 12 6 6 4C3 6-2 4 0 0Z"/><path d="M6 1C9-2 13-2 15 1M24 1C26-1 29-1 31 1" fill="none"/></g>`;
  const pav=`<g transform="translate(150 ${H+2})"><path d="M-22 0V-12H22V0Z" fill="${c.marble}" stroke="${c.gold}" stroke-width=".4"/><path d="M-5 0V-7A5 5 0 0 1 5-7V0Z" fill="${mix(c.lapis,'#000000',.2)}"/><path d="M-15 0V-6A3 3 0 0 1-9-6V0ZM9 0V-6A3 3 0 0 1 15-6V0Z" fill="${mix(c.lapis,'#000000',.25)}"/>
    <path d="M-12-12C-12-22-4-26 0-30C4-26 12-22 12-12Z" fill="${c.marble}" stroke="${c.gold}" stroke-width=".4"/><path d="M0-30V-35" stroke="${c.gold}" stroke-width=".7"/><circle cy="-36" r="1" fill="${c.gold}"/>
    <path d="M-21-12V-20M21-12V-20" stroke="${c.marble}" stroke-width="2"/><path d="M-23.5-20C-23.5-24-21-25.5-21-27C-21-25.5-18.5-24-18.5-20ZM18.5-20C18.5-24 21-25.5 21-27C21-25.5 23.5-24 23.5-20Z" fill="${c.marble}" stroke="${c.gold}" stroke-width=".35"/></g>`;
  let rip='';for(let y=H+8;y<392;y+=y<260?7:10){const t=(y-H)/(392-H),hw=4+t*38;rip+=`<path d="M${f1(150-hw*.7)} ${y}h${f1(hw*.5)}M${f1(150+hw*.2)} ${y+2}h${f1(hw*.5)}" stroke="#ffffff" stroke-width=".5" opacity=".55"/>`}
  let pond='';const P=[[96,352,9],[122,366,7],[178,350,8],[206,368,9],[140,384,6],[234,346,6],[66,370,7]];
  P.forEach(([x,y,r],i)=>{pond+=pad(x,y,r,c);if(i%2===0)pond+=lotus(x+r*.3,y-2,.9+r/12,c)});
  let dots='';const R=rng(11);for(let i=0;i<70;i++){const y=H+10+R()*150,x=R()*300;dots+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(.5+R()*.6)}" fill="${R()<.5?c.bloom:c.marble}" opacity=".8"/>`}
  return `<defs>${sky}</defs><rect x="0" y="0" width="300" height="${H}" fill="url(#sk${id})"/>
   ${cloud(64,74,1)}${cloud(176,56,.8)}${cloud(120,112,.6)}
   <path d="M0 ${H}L0 ${H-18}C30 ${H-30} 54 ${H-20} 80 ${H-26}S130 ${H-14} 150 ${H-18}S210 ${H-34} 240 ${H-24}S290 ${H-28} 300 ${H-20}V${H}Z" fill="${c.hill2}"/>
   <path d="M0 ${H}V${H-8}C40 ${H-16} 70 ${H-6} 110 ${H-12}S170 ${H-6} 200 ${H-12}S270 ${H-8} 300 ${H-12}V${H}Z" fill="${c.hill1}"/>
   <rect x="0" y="${H}" width="300" height="${400-H}" fill="url(#lw${id})"/>${dots}${pav}
   <path d="M146 ${H+2}H154L196 330H104Z" fill="url(#wt${id})" stroke="${c.marble}" stroke-width="1.2"/>${rip}
   ${trees}
   <path d="M30 330H270L300 400H0Z" fill="url(#wt${id})"/><path d="M30 330H270" stroke="${c.marble}" stroke-width="2.4"/><path d="M30 331.8H270" stroke="${c.gold}" stroke-width=".5"/>
   ${pond}
   <path d="M0 0H300V400H0Z" fill="none" stroke="${c.gold}" stroke-width="0"/>`}

/* ---- jharokha: a bracketed balcony window with a bangla roof ---- */
function jharokha(c){return `<svg class="mughal-jh" viewBox="0 0 60 130" fill="none" stroke="${c.gold}" stroke-width=".8">
  <path d="M6 44C6 30 16 22 30 14C44 22 54 30 54 44Z" fill="${c.wallHi}" />
  <path d="M10 44C10 32 19 25 30 18.5C41 25 50 32 50 44" stroke-width=".5"/>
  <path d="M30 14V7M30 4.6a1.6 1.6 0 1 0 .01 0" /><circle cx="30" cy="3" r="1.4" fill="${c.gold}"/>
  <path d="M2 48C14 43 46 43 58 48L56 51C44 47 16 47 4 51Z" fill="${c.wallHi}"/>
  <path d="M10 51V92M50 51V92" stroke-width="2.2" stroke="${c.wallHi}"/><path d="M8.6 51V92M11.4 51V92M48.6 51V92M51.4 51V92" stroke-width=".5"/>
  <path d="${cuspArch(14,46,72,56,92,5,.62)}" fill="${c.recess}" stroke-width=".7"/>
  <path d="M30 63v24M22 70v20M38 70v20" stroke="${c.gold}" stroke-width=".3" opacity=".5"/>
  <path d="M4 92H56V106H4Z" fill="${c.wallHi}"/><path d="M6 95H54V103H6Z" stroke-width=".45"/>
  ${[10,18,26,34,42,50].map(x=>`<path d="M${x} 103V97.5a2 2 0 0 1 4 0V103" stroke-width=".4"/>`).join('')}
  <path d="M8 106C8 116 14 120 18 128M30 106V129M52 106C52 116 46 120 42 128" stroke-width=".7"/><path d="M14 106C14 112 18 115 22 118M46 106C46 112 42 115 38 118" stroke-width=".5"/>
  <path d="M20 106C22 110 26 111 30 111S38 110 40 106" stroke-width=".5"/></svg>`}
/* kangura parapet: a row of lotus-bud merlons */
function parapet(c,w=300){let d='';for(let x=0;x<w;x+=12)d+=`M${x} 10V6C${x+2} 6 ${x+3} 4 ${x+6} 0C${x+9} 4 ${x+10} 6 ${x+12} 6V10`;
  return `<path d="${d}" fill="${c.wallHi}" stroke="${c.gold}" stroke-width=".55"/>`}

/* ---- the portal: masonry linework, inlay, spandrels, the jali and its medallion ---- */
function portal(c,id,withJali){const X0=50,X1=250,YS=176,YA=44,YB=414;
  const op=cuspArch(X0,X1,YS,YA,YB,9,.6),ext=plainArch(X0-12,X1+12,YS,YA-16,YB),ext2=plainArch(X0-15.5,X1+15.5,YS,YA-21,YB);
  const jtile=K.star(8,5.6,3.6,7.5,7.5);
  const pat=`<pattern id="jp${id}" width="15" height="15" patternUnits="userSpaceOnUse" x="${X0}"><path fill-rule="evenodd" d="M0 0H15V15H0Z${jtile}M0-2.3L2.3 0 0 2.3-2.3 0ZM15-2.3L17.3 0 15 2.3 12.7 0ZM0 12.7L2.3 15 0 17.3-2.3 15ZM15 12.7L17.3 15 15 17.3 12.7 15Z" fill="${c.marble}"/>
    <path d="${jtile}" fill="none" stroke="${c.gold}" stroke-width=".35" opacity=".8"/></pattern>
   <pattern id="bt${id}" width="24" height="12" patternUnits="userSpaceOnUse">${bandTile(c).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</pattern>
   <pattern id="bv${id}" width="12" height="24" patternUnits="userSpaceOnUse">${bandTile(c,1).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</pattern>
   <clipPath id="op${id}"><path d="${op}"/></clipPath>
   <filter id="sh${id}" x="-5%" y="-5%" width="110%" height="110%"><feDropShadow dx="0" dy="1.4" stdDeviation="1" flood-color="#000" flood-opacity=".45"/></filter>
   <radialGradient id="dk${id}" cx=".5" cy=".42" r=".7"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>`;
  const spand=s=>`<g transform="translate(150 0) scale(${s} 1) translate(-150 0)">
    <path d="M58 60C72 54 80 44 96 41C108 39 116 33 124 26" fill="none" stroke="url(#gl${id})" stroke-width="1"/>
    <path d="M32 70C30 90 30 120 31 160" fill="none" stroke="url(#gl${id})" stroke-width="1"/>
    ${spray(64,62,.62,58,id,c,1)}${spray(99,42,.5,72,id,c,0)}${spray(84,48,.34,20,id,c,2)}${spray(122,30,.34,80,id,c,2)}
    ${spray(30,112,.52,-4,id,c,0)}${spray(31,150,.46,4,id,c,2)}${spray(31,174,.4,-3,id,c,1)}
    <circle cx="45" cy="49" r="17.5" fill="${c.marble}" stroke="${c.gold}" stroke-width="1"/><circle cx="45" cy="49" r="15" fill="none" stroke="${c.gold}" stroke-width=".4" stroke-dasharray=".1 1.8" stroke-linecap="round"/>
    ${rosette(45,49,1.25,10,id,c)}${rosette(45,49,.55,6,id,c,'gb')}</g>`;
  const jali=withJali?`<g class="mughal-jali" clip-path="url(#op${id})"><g class="mughal-jmove"><rect x="${X0}" y="${YA-6}" width="${X1-X0}" height="${YB-YA+6}" fill="url(#jp${id})" filter="url(#sh${id})"/>
     <path d="${cuspArch(X0+9,X1-9,YS+8,YA+12,YB-10,9,.6)}Z" fill="none" stroke="${c.marble}" stroke-width="7"/><path d="${cuspArch(X0+9,X1-9,YS+8,YA+12,YB-10,9,.6)}Z" fill="none" stroke="${c.gold}" stroke-width=".7"/>
     <path d="M${X0} ${YB-10}H${X1}" stroke="${c.gold}" stroke-width=".6"/>
     <g transform="translate(150 246)"><circle r="40" fill="none" stroke="${c.marble}" stroke-width="6" filter="url(#sh${id})"/><circle r="36" fill="${c.marble}" filter="url(#sh${id})"/><circle r="33" fill="none" stroke="${c.gold}" stroke-width="1"/><circle r="30.6" fill="none" stroke="${c.gold}" stroke-width=".45" stroke-dasharray=".1 2.2" stroke-linecap="round"/>
      ${rosette(0,0,1.9,12,id,c)}${rosette(0,0,.95,8,id,c,'gb')}
      ${K.ring(12,24.4).map(([x,y,a])=>`<path d="${LEAF}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a*180/Math.PI+90)}) scale(.38)" fill="url(#gl${id})"/>`).join('')}</g>
     <path d="M126 296H174L180 301.5 174 307H126L120 301.5Z" fill="${c.marble}" stroke="${c.gold}" stroke-width=".7" filter="url(#sh${id})"/><path d="M128 298H172L176 301.5 172 305H128L124 301.5Z" fill="none" stroke="${c.gold}" stroke-width=".35"/><text x="150" y="304.2" text-anchor="middle" font-family="Marcellus,serif" font-size="7.2" letter-spacing="3" fill="${c.ink}" opacity=".75">${c.openWord}</text></g></g>`:'';
  return `<defs>${stoneDefs(c,id)}${pat}</defs>
   ${withJali?`<g clip-path="url(#op${id})"><svg x="${X0}" y="${YA-8}" width="${X1-X0}" height="${YB-YA+8}" viewBox="0 0 300 400" preserveAspectRatio="xMidYMax slice">${miniature(c,id)}</svg><rect x="${X0}" y="${YA-8}" width="${X1-X0}" height="${YB-YA+8}" fill="url(#dk${id})"/></g>${jali}`:`<path d="${op}Z" fill="${c.sheetFill}"/>`}
   <rect x="6" y="14" width="288" height="12" fill="url(#bt${id})"/><rect x="6" y="26" width="12" height="${YB-26}" fill="url(#bv${id})"/><rect x="282" y="26" width="12" height="${YB-26}" fill="url(#bv${id})"/>
   <path d="M3.5 11.5H296.5V${YB}M3.5 ${YB}V11.5" fill="none" stroke="${c.gold}" stroke-width="1"/><path d="M21 29H279V${YB}M21 ${YB}V29" fill="none" stroke="${c.gold}" stroke-width=".7"/>
   <path d="M24.5 32.5H275.5V${YB}M24.5 ${YB}V32.5" fill="none" stroke="${c.gold}" stroke-width=".4"/>
   ${spand(1)}${spand(-1)}
   <path d="${ext2}" fill="none" stroke="${c.gold}" stroke-width=".45"/><path d="${ext}" fill="none" stroke="${c.gold}" stroke-width="1.1"/>
   <path d="${op}" fill="none" stroke="${c.gold}" stroke-width="2.6"/><path d="${op}" fill="none" stroke="${c.marble}" stroke-width="1.4"/>
   <path d="M${X0-12} ${YS}H${X0}M${X1} ${YS}H${X1+12}" stroke="${c.gold}" stroke-width=".7"/>
   <circle cx="150" cy="${YA-10}" r="2.2" fill="${c.gold}"/><path d="M150 ${YA-22}V${YA-14}" stroke="${c.gold}" stroke-width=".8"/>
   ${sill(c,'bt'+id,YB)}`}
function sill(c,pid,y){return `<path d="M0 ${y}H300" stroke="${c.gold}" stroke-width="1.2"/><rect x="0" y="${y+1}" width="300" height="8" fill="${c.wallHi}"/><path d="M0 ${y+9.5}H300M0 ${y+12}H300" stroke="${c.gold}" stroke-width=".6"/>
   <rect x="0" y="${y+14}" width="300" height="12" fill="url(#${pid})"/>`}

/* ---- per-theme derived colours ---- */
function cols(th,en){const c={...th.c};const dark=!!c.dark;
  c.marble=c.marble||mix(c.sheet,'#ffffff',.3);c.joint=mix(c.ink,c.sheet,.15);
  c.wallHi=dark?mix(c.ground,'#ffffff',.12):mix(c.ground,'#ffffff',.5);c.recess=dark?mix(c.ground,'#000000',.45):mix(c.ink,c.ground,.55);
  c.skyTop=mix(c.lapis,'#ffffff',.25);c.skyMid=mix(c.gold,'#ffffff',.55);c.skyLow=mix(c.gold,'#fff8ea',.82);c.cloud=mix(c.sheet,'#ffffff',.5);
  c.hill2=mix(c.leaf,c.skyLow,.66);c.hill1=mix(c.leaf,c.skyLow,.45);c.lawnFar=mix(c.leaf,'#f3ecd2',.45);c.lawn=mix(c.leaf,'#000000',.05);
  c.cyp=mix(c.leaf,'#0c1d14',.55);c.cypHi=mix(c.leaf,'#ffffff',.25);c.crown=mix(c.leaf,'#d9e4b8',.3);c.bloom=mix(c.accent,'#ffffff',.45);c.trunk=mix(c.ink,c.leaf,.3);
  c.lotus=mix(c.accent,'#ffd9de',.55);c.padC=mix(c.leaf,'#ffffff',.12);c.sheetFill=c.sheet;c.openWord=en?'OPEN':'BUKA';return c}

FAMILY({key:'mughal',name:'Mahal',meaning:'Mughal palace',
  blurb:'A white-marble Mughal bay with pietra-dura inlay and jharokha balconies; the pierced jali sinks away to reveal a painted garden of cypress and lotus.',
  fonts:{d:"'Marcellus', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1550,
  page(o,th,L){const [n1,n2]=coverNames(o),c=cols(th,o.lang==='en'),id='p'+(++uid);
    const head=`<svg class="mughal-head" viewBox="0 0 300 186">${portal(c,id,false)}</svg>`;
    const side=K.uri(`<svg ${NS} width="50" height="24" viewBox="0 0 50 24"><g transform="translate(6 0)">${bandTile(c,1).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g><path d="M3.5 0V24" stroke="${c.gold}" stroke-width="1"/><path d="M21 0V24" stroke="${c.gold}" stroke-width=".7"/><path d="M24.5 0V24M34.5 0V24" stroke="${c.gold}" stroke-width=".45"/><path d="M38 0V24" stroke="${c.gold}" stroke-width="1.1"/><path d="M49.3 0V24" stroke="${c.gold}" stroke-width="1.4"/></svg>`);
    const strip=`<svg class="mughal-strip" viewBox="0 0 300 196" preserveAspectRatio="xMidYMid slice"><g transform="translate(0 -146)">${miniature(c,id+'m')}</g></svg>`;
    return `<section class="page pg-mughal${c.dark?' mughal-dark':''}" style="--mg-side:${side};--hi:${c.hi}">
    <div class="mughal-pframe"><div class="mughal-headwrap">${head}</div>
     <div class="mughal-body"><i class="mughal-side l"></i><i class="mughal-side r"></i>
      <div class="mughal-txt"><p class="kicker reveal">${ev(o,L)}</p>
       <h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
       <div class="mughal-rule reveal d2"><svg viewBox="0 0 120 14"><defs>${stoneDefs(c,id+'r')}</defs><path d="M4 7H46M74 7H116" stroke="${c.gold}" stroke-width=".7"/><path d="M12 9.6H44M76 9.6H108" stroke="${c.gold}" stroke-width=".35"/>${rosette(60,7,.58,8,id+'r',c)}<circle cx="50" cy="7" r="1.3" fill="${c.leaf}"/><circle cx="70" cy="7" r="1.3" fill="${c.leaf}"/></svg></div>
       <p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div>
      <div class="mughal-stripwrap">${strip}</div></div>
     <svg class="mughal-sill" viewBox="0 0 300 26"><defs><pattern id="sb${id}" width="24" height="12" patternUnits="userSpaceOnUse">${bandTile(c).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</pattern></defs>${sill(c,'sb'+id,0)}</svg></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=cols(th,en),id='c'+(++uid);
    return `<div class="cover cv-mughal${c.dark?' mughal-dark':''}" style="--hi:${c.hi}"><div class="mughal-wall"></div>
     <div class="mughal-top"><svg class="mughal-par" viewBox="0 0 300 10" preserveAspectRatio="none">${parapet(c)}</svg>
      ${jharokha(c).replace('class="mughal-jh"','class="mughal-jh l"')}${jharokha(c).replace('class="mughal-jh"','class="mughal-jh r"')}
      <p class="mughal-k">${ev(o,L)}</p><p class="mughal-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="mughal-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <${tag} class="mughal-portal" ${attr} aria-label="${L.open}"><svg viewBox="0 0 300 440" preserveAspectRatio="xMidYMid meet">${portal(c,id,true)}</svg></${tag}>
     <div class="mughal-foot">${guest?`<p class="mughal-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="mughal-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=cols(th,o.lang==='en');
    el.style.setProperty('--mg-band',K.uri(bandTile(c)));el.style.setProperty('--mg-bandv',K.uri(bandTile(c,1)));el.style.setProperty('--mg-marble',c.marble);
    el.style.setProperty('--mg-ros',K.uri(`<svg ${NS} viewBox="-12 -12 24 24"><defs>${stoneDefs(c,'s')}</defs><circle r="11" fill="${c.marble}" stroke="${c.gold}" stroke-width=".8"/>${rosette(0,0,.95,8,'s',c)}</svg>`));
    const arch=K.uri(`<svg ${NS} viewBox="0 0 200 110" preserveAspectRatio="none"><path d="${cuspArch(6,194,108,8,110,11,.6)}" fill="none" stroke="${c.gold}" stroke-width="1.3"/><path d="${cuspArch(12,188,108,16,110,11,.6)}" fill="none" stroke="${c.gold}" stroke-width=".5"/></svg>`);
    $$('.sec h2',el).forEach(h=>{h.classList.add('mughal-h2');h.insertAdjacentHTML('afterbegin',`<i class="mughal-ha" style="background:${arch} center/100% 100% no-repeat"></i>`)});
    $$('.sheet > .sec',el).forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="mughal-cn tl"></i><i class="mughal-cn tr"></i><i class="mughal-cn bl"></i><i class="mughal-cn br"></i>'))},
  themes:[
    {k:'pualam',n:'Pualam',desc:'White marble, carnelian and lapis inlay',c:{ground:'#efe9dd',sheet:'#fbf8f1',ink:'#2b2622',accent:'#9b2c2c',gold:'#a8823a',leaf:'#3f6b4a',lapis:'#2e4a7d',pagefg:'#2b2622',hi:'#7d2424'}},
    {k:'merah',n:'Merah Bata',desc:'Red sandstone with white marble inlay',c:{ground:'#7a3324',sheet:'#f7efe2',ink:'#2b2018',accent:'#8e3226',gold:'#d6b06a',leaf:'#3d6a4c',lapis:'#2c4878',pagefg:'#f8ecd8',hi:'#fbf1df',dark:1}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald stone, gold and garnet',c:{ground:'#1f4537',sheet:'#f5f0e3',ink:'#22251f',accent:'#9a2a3a',gold:'#d3ae5e',leaf:'#4b7a52',lapis:'#2f4f86',pagefg:'#f3ead6',hi:'#f6ecd4',dark:1}},
    {k:'nila',n:'Nila',desc:'Midnight lapis with gold',c:{ground:'#1b2444',sheet:'#f4efe4',ink:'#1f2233',accent:'#a3343b',gold:'#d2ad62',leaf:'#3f6e55',lapis:'#3a5ca0',pagefg:'#efe7d4',hi:'#f3e9d2',dark:1}},
    {k:'gading',n:'Gading',desc:'Ivory marble, amber and jade',c:{ground:'#efe3cb',sheet:'#fcf7ec',ink:'#3b2a1c',accent:'#b0582a',gold:'#a27a34',leaf:'#4f7a50',lapis:'#36577f',pagefg:'#3b2a1c',hi:'#7a3f1c'}},
    {k:'jambu',n:'Jambu',desc:'Rose marble with ruby flowers',c:{ground:'#f1e1dc',sheet:'#fdf7f4',ink:'#45282e',accent:'#a3384f',gold:'#a8804a',leaf:'#4c7559',lapis:'#3f5a8a',pagefg:'#45282e',hi:'#8c2f45'}},
    {k:'hitam',n:'Hitam Oniks',desc:'Black onyx with gold inlay',c:{ground:'#191715',sheet:'#f3ede0',ink:'#1e1b18',accent:'#a3342c',gold:'#cfa75a',leaf:'#47755a',lapis:'#3a5a96',pagefg:'#efe6d3',hi:'#ecd9a8',dark:1}},
    {k:'kunyit',n:'Kunyit',desc:'Saffron sandstone, lapis flowers',c:{ground:'#ecd39a',sheet:'#fdf6e4',ink:'#3a2614',accent:'#2f4f8a',gold:'#94692a',leaf:'#4a7449',lapis:'#2f4f8a',pagefg:'#3a2614',hi:'#6e3214'}},
  ]});
