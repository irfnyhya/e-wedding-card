/* alhambra: a Nasrid horseshoe arch in carved ivory stucco. A muqarnas honeycomb hangs from the arch,
   the spandrels are filled with ataurique scrolls on painted lapis, slender columns carry muqarnas capitals,
   and the opening is closed by a sebka lattice screen (lobed diamond net) bearing the couple's names.
   Cover: tap the screen and it lifts up behind the muqarnas, showing the moonlit Court of the Myrtles; then the scene fades.
   Page: the horseshoe arch over the names. Skin: sebka lattice section backgrounds. */
needFont('Great+Vibes');
const hx=h=>{h=h.replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const f1=v=>+v.toFixed(1);
let uid=0;
const CX=150,CY=170,RO=112,TH=22*Math.PI/180;
const P=(phi,r)=>[CX+r*Math.cos(phi),CY-r*Math.sin(phi)];
const pt=(phi,r)=>{const [x,y]=P(phi,r);return `${f1(x)} ${f1(y)}`};
const A0=-TH,A1=Math.PI+TH; // horseshoe: the arc runs past the half circle
function horseshoe(r,yb){const [xr,yr]=P(A0,r),[xl,yl]=P(A1,r);return `M${f1(xl)} ${yb}V${f1(yl)}A${r} ${r} 0 1 1 ${f1(xr)} ${f1(yr)}V${yb}`}

/* ---- muqarnas: three staggered tiers of niche cells hanging from the arch ---- */
function muqarnas(c,id){let s='',g='';const tiers=[[RO,99,23,0],[99,87,26,.5],[87,77,29,0]];
  tiers.forEach(([ro,ri,n,off],t)=>{if(!n)return;const span=(A1-A0),h=ro-ri;
    g+=`<radialGradient id="mq${id}${t}" gradientUnits="userSpaceOnUse" cx="${CX}" cy="${CY}" r="${ro}"><stop offset="${f1(ri/ro*100)/100}" stop-color="${c.cell}"/><stop offset="1" stop-color="${c.cellDeep}"/></radialGradient>`;
    s+=`<path d="M${pt(A1,ro)}A${ro} ${ro} 0 1 1 ${pt(A0,ro)}L${pt(A0,ri)}A${ri} ${ri} 0 1 0 ${pt(A1,ri)}Z" fill="${c.relief}"/>`;
    for(let i=0;i<n;i++){const a=A0+span*(i+off)/n,b=A0+span*(i+1+off)/n;if(b>A1+1e-6)continue;const m=(a+b)/2,e=(b-a)*.1;
      s+=`<path d="M${pt(a+e,ri+.6)}L${pt(a+e,ri+h*.42)}Q${pt(a+e,ro-h*.25)} ${pt(m,ro-.6)}Q${pt(b-e,ro-h*.25)} ${pt(b-e,ri+h*.42)}L${pt(b-e,ri+.6)}Z" fill="url(#mq${id}${t})" stroke="${c.line}" stroke-width=".35"/>`}
    const nn=n+1;for(let i=0;i<=n;i++){const b=A0+span*(i+off)/n;if(b<A0-1e-6||b>A1+1e-6)continue;const d=(span/n)*.16;
      s+=`<path d="M${pt(b-d,ri+.5)}Q${pt(b-d*.3,ri-2.6)} ${pt(b,ri-(t==2?5.4:3.6))}Q${pt(b+d*.3,ri-2.6)} ${pt(b+d,ri+.5)}Z" fill="${c.relief}" stroke="${c.line}" stroke-width=".3"/>`}
    s+=`<path d="M${pt(A1,ri)}A${ri} ${ri} 0 1 1 ${pt(A0,ri)}" fill="none" stroke="${c.gold}" stroke-width=".45"/>`});
  return `<defs>${g}</defs><g>${s}<path d="M${pt(A1,RO)}A${RO} ${RO} 0 1 1 ${pt(A0,RO)}" fill="none" stroke="${c.gold}" stroke-width=".9"/></g>`}

/* ---- ataurique: spiral scrolls ending in split palmettes ---- */
function spiral(x,y,r,dir,turns=1.4,a0=0){let d='';for(let i=0;i<=40;i++){const t=i/40,rr=r*(1-t*.82),a=a0+dir*t*turns*Math.PI*2;d+=(i?'L':'M')+f1(x+Math.cos(a)*rr)+' '+f1(y+Math.sin(a)*rr)}return d}
const PALM='M0 0C3-3 8-4.6 12-2.6C9-1.6 7.4 .4 6.6 2.6C8.8 2.4 10.6 3.4 11.6 5.6C7.4 7 3 5 0 0Z';
function ataurique(c,id){const line=(d,w)=>`<path d="${d}" transform="translate(.5 .7)" fill="none" stroke="${c.shadow}" stroke-width="${w+.4}"/><path d="${d}" fill="none" stroke="${c.relief}" stroke-width="${w}"/>`;
  const palm=(x,y,a,s=1)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)}) scale(${s})"><path d="${PALM}" transform="translate(.5 .7)" fill="${c.shadow}"/><path d="${PALM}" fill="${c.relief}"/><path d="M1 .4C4-1 7-1.2 9-.6" fill="none" stroke="${c.paint}" stroke-width=".35"/></g>`;
  const D=Math.PI/180;let stem='',out='';
  for(let f=204;f>=88;f-=2){const [x,y]=P(f*D,133);stem+=(stem?'L':'M')+f1(x)+' '+f1(y)}
  for(let f=176;f>=96;f-=2){const [x,y]=P(f*D,158);out+=(out?'L':'M')+f1(x)+' '+f1(y)}
  let br='';for(let k=0;k<13;k++){const f=(198-k*8.4)*D,[sx,sy]=P(f,133);
    if(k%2===0){const r=k%4===0?8.5:6.5,[cx,cy]=P(f,133+r),a0=Math.atan2(sy-cy,sx-cx),dir=k%4===0?1:-1;br+=line(spiral(cx,cy,r,dir,1.25,a0),1);br+=palm(...P(f+dir*.06,133+r*2.1),-f/D+dir*40,.62)}
    else br+=palm(sx,sy,-f/D-18,.8)}
  for(let k=0;k<6;k++){const f=(170-k*13)*D,[x,y]=P(f,158);br+=palm(x,y,-f/D+(k%2?30:-30),.7)}
  const half=`${line(stem,1.5)}${line(out,1)}${br}${line(spiral(56,46,17,1,1.35),1.3)}${palm(72,62,-38,1)}${palm(40,28,-160,.8)}${line(spiral(104,27,8,-1,1.2),1)}
    ${[[38,62],[80,24],[124,20],[30,96],[88,44]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.5" fill="${c.relief}"/><circle cx="${x}" cy="${y}" r=".55" fill="${c.gold}"/>`).join('')}`;
  return `<g clip-path="url(#sp${id})">${half}<g transform="translate(300 0) scale(-1 1)">${half}</g></g>`}

/* ---- sebka: the lobed-diamond net, carved ivory over painted lapis ---- */
function sebkaTile(c,w=26,h=34,bg=true){const side=`M${w/2} 0C${w/2+4} 4 ${w-4} 6 ${w-4} ${h/2-6}C${w-4} ${h/2-2} ${w-2} ${h/2-1} ${w} ${h/2}`;
  const sides=`<path d="${side}"/><path d="${side}" transform="translate(${w} 0) scale(-1 1)"/><path d="${side}" transform="translate(0 ${h}) scale(1 -1)"/><path d="${side}" transform="translate(${w} ${h}) scale(-1 -1)"/>`;
  const fl=(x,y)=>`<g transform="translate(${x} ${y})">${[0,90,180,270].map(a=>`<path d="M0 0C1.4-1 1.8-3.2 0-5.4C-1.8-3.2-1.4-1 0 0Z" transform="rotate(${a})" fill="${c.relief}"/>`).join('')}${[45,135,225,315].map(a=>`<circle cx="0" cy="-3.4" r=".55" transform="rotate(${a})" fill="${c.relief}"/>`).join('')}<circle r="1.1" fill="${c.gold}"/></g>`;
  return `${bg?`<rect width="${w}" height="${h}" fill="${c.paint}"/>`:''}<g fill="none" stroke-linecap="round"><g transform="translate(.6 .8)" stroke="${c.shadow}" stroke-width="2.6">${sides}</g><g stroke="${c.relief}" stroke-width="2.2">${sides}</g><g stroke="${c.gold}" stroke-width=".45">${sides}</g></g>
   ${fl(w/2,h/2)}${fl(0,0)}${fl(w,0)}${fl(0,h)}${fl(w,h)}`}
/* interlace band for the alfiz, 20 x 10 */
function bandTile(c){return `<rect width="20" height="10" fill="${c.paint}"/><g fill="none" stroke-linecap="round"><path d="M0 5C5 0 15 10 20 5M0 5C5 10 15 0 20 5" stroke="${c.shadow}" stroke-width="2.1" transform="translate(.4 .5)"/><path d="M0 5C5 0 15 10 20 5M0 5C5 10 15 0 20 5" stroke="${c.relief}" stroke-width="1.7"/><path d="M0 5C5 0 15 10 20 5M0 5C5 10 15 0 20 5" stroke="${c.gold}" stroke-width=".35"/></g><circle cx="5" cy="5" r="1" fill="${c.gold}"/><circle cx="15" cy="5" r="1" fill="${c.gold}"/><path d="M0 .4H20M0 9.6H20" stroke="${c.relief}" stroke-width=".8"/>`}

/* ---- the courtyard revealed behind the screen ---- */
function court(c,id){let arc='';for(let i=0;i<9;i++){const x=58+i*23;arc+=`<path d="M${x} 300V284A8 8 0 0 1 ${x+16} 284V300Z" fill="${c.nightDeep}" opacity=".85"/>`}
  let stars='';const R=rng(5);for(let i=0;i<26;i++)stars+=`<circle cx="${f1(40+R()*220)}" cy="${f1(60+R()*170)}" r="${f1(.4+R()*.7)}" fill="#fff8e0" opacity="${f1(.4+R()*.6)}"/>`;
  return `<defs><linearGradient id="ns${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.nightDeep}"/><stop offset=".6" stop-color="${c.night}"/><stop offset="1" stop-color="${c.dusk}"/></linearGradient>
   <linearGradient id="pw${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.dusk}"/><stop offset="1" stop-color="${c.nightDeep}"/></linearGradient></defs>
   <rect x="30" y="40" width="240" height="440" fill="url(#ns${id})"/>${stars}
   <path d="M196 92a14 14 0 1 0 8 25a11 11 0 1 1-8-25Z" fill="#fff4d6" opacity=".9"/>
   <path d="M30 312V270H128V214H172V270H270V312Z" fill="${c.facade}"/><path d="M134 222h32M134 230h32" stroke="${c.gold}" stroke-width=".5" opacity=".6"/>
   ${[140,150,160].map(x=>`<path d="M${x-3} 262V246A3 3 0 0 1 ${x+3} 246V262Z" fill="${c.nightDeep}" opacity=".8"/>`).join('')}${arc}
   <path d="M30 300H270" stroke="${c.gold}" stroke-width=".6" opacity=".7"/>
   <path d="M30 312H270V480H30Z" fill="${c.hedge}"/><path d="M110 312H190L236 480H64Z" fill="url(#pw${id})"/>
   <g opacity=".35" transform="translate(0 624) scale(1 -1)"><path d="M128 312V270H172V312Z" fill="${c.facade}"/></g>
   ${[330,356,392,440].map((y,i)=>`<path d="M${f1(150-30-i*12)} ${y}h${f1(18+i*6)}M${f1(150+10+i*4)} ${y+4}h${f1(16+i*6)}" stroke="#fff8e0" stroke-width=".5" opacity=".5"/>`).join('')}
   <path d="M30 318C60 312 90 316 108 314L62 480H30Z" fill="${c.myrtle}"/><path d="M270 318C240 312 210 316 192 314L238 480H270Z" fill="${c.myrtle}"/>`}

function cols(th){const c={...th.c},dark=!!c.dark;
  c.paint=c.paint||c.accent;c.relief=mix(c.sheet,'#ffffff',.25);c.shadow=mix(c.paint,'#000000',.45);c.line=mix(c.ink,c.sheet,.45);
  c.cell=mix(c.sheet,c.gold,.32);c.cellDeep=mix(c.sheet,c.ink,.55);
  c.nightDeep=mix(c.paint,'#060b1c',.6);c.night=mix(c.paint,'#2a3a6a',.35);c.dusk=mix(c.gold,'#f6d9a8',.4);c.facade=mix(c.sheet,c.gold,.35);
  c.hedge=mix('#1f3b2a',c.paint,.2);c.myrtle=mix('#2c4f35',c.paint,.15);c.stucco=dark?c.ground:mix(c.ground,c.sheet,.3);return c}
function defs(c,id){return `<linearGradient id="mq${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.cellDeep}"/><stop offset="1" stop-color="${c.cell}"/></linearGradient>
  <pattern id="sb${id}" width="26" height="34" patternUnits="userSpaceOnUse" x="${CX-13}" y="8">${sebkaTile(c)}</pattern>
  <pattern id="bd${id}" width="20" height="10" patternUnits="userSpaceOnUse" x="0" y="0">${bandTile(c)}</pattern>
  <pattern id="bdv${id}" width="10" height="20" patternUnits="userSpaceOnUse" x="0" y="0"><g transform="translate(10 0) rotate(90)">${bandTile(c)}</g></pattern>
  <clipPath id="sp${id}"><path fill-rule="evenodd" d="M30 16H270V212H30Z${horseshoe(126,212)}Z"/></clipPath>
  <clipPath id="op${id}"><path d="${horseshoe(RO,470)}Z"/></clipPath>
  <filter id="ds${id}" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity=".35"/></filter>`}
function column(x,c){return `<g transform="translate(${x} 0)"><path d="M-9 212H9L7 226H-7Z" fill="${c.relief}" stroke="${c.line}" stroke-width=".5"/>${[-6,-2,2,6].map(dx=>`<path d="M${dx-2} 226V220a2 2 0 0 1 4 0V226" fill="none" stroke="${c.line}" stroke-width=".4"/>`).join('')}
  <path d="M-10 212H10M-8 216.5H8" stroke="${c.gold}" stroke-width=".6"/><path d="M-6.5 226H6.5V229H-6.5Z" fill="${c.relief}" stroke="${c.line}" stroke-width=".4"/><path d="M-6.5 232H6.5" stroke="${c.gold}" stroke-width=".5"/>
  <path d="M-4 229H4V454H-4Z" fill="${c.relief}" stroke="${c.line}" stroke-width=".5"/><path d="M-1.4 232V452" stroke="${c.shadow}" stroke-width=".4" opacity=".35"/>
  <path d="M-6 454H6V458H-6ZM-7.5 458H7.5V466H-7.5Z" fill="${c.relief}" stroke="${c.line}" stroke-width=".45"/></g>`}
function portal(c,id,cover,names){const op=horseshoe(RO,470);
  const screen=cover?`<g clip-path="url(#op${id})"><g class="al-court">${court(c,id)}</g><g class="al-screen"><path d="M30 40H270V472H30Z" fill="url(#sb${id})"/>
     <rect x="30" y="40" width="240" height="432" fill="url(#vg${id})"/>
     <g transform="translate(150 286)" filter="url(#ds${id})"><path d="${K.scallop(16,58,5.5).replace(/[\d.-]+ [\d.-]+/g,m=>{const [x,y]=m.split(' ').map(Number);return `${f1(x)} ${f1(y*1.32)}`})}" fill="${c.relief}"/></g>
     <g transform="translate(150 286)"><path d="${K.scallop(16,54,5).replace(/[\d.-]+ [\d.-]+/g,m=>{const [x,y]=m.split(' ').map(Number);return `${f1(x)} ${f1(y*1.32)}`})}" fill="none" stroke="${c.gold}" stroke-width=".8"/>
      <ellipse rx="48" ry="64" fill="none" stroke="${c.gold}" stroke-width=".4" stroke-dasharray=".1 2.2" stroke-linecap="round"/></g>
     ${names}</g></g>`:`<path d="${op}Z" fill="${c.sheet}"/>`;
  return `<defs>${defs(c,id)}<radialGradient id="vg${id}" cx=".5" cy=".55" r=".6"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>
   ${screen}
   <path fill-rule="evenodd" d="M30 16H270V212H30Z${horseshoe(126,212)}Z" fill="${c.paint}"/>${ataurique(c,id)}
   ${muqarnas(c,id)}
   <path d="${horseshoe(126,212)}" fill="none" stroke="${c.gold}" stroke-width="1"/><path d="${horseshoe(122,212)}" fill="none" stroke="${c.relief}" stroke-width="5.5"/><path d="${horseshoe(122,212)}" fill="none" stroke="${c.gold}" stroke-width=".4" stroke-dasharray="1.2 2.4"/>
   <path d="${horseshoe(118.6,212)}" fill="none" stroke="${c.gold}" stroke-width=".6"/>
   <rect x="18" y="4" width="264" height="12" fill="url(#bd${id})"/><rect x="18" y="16" width="12" height="196" fill="url(#bdv${id})"/><rect x="270" y="16" width="12" height="196" fill="url(#bdv${id})"/>
   <path d="M15 1H285V212M15 212V1" fill="none" stroke="${c.gold}" stroke-width="1"/><path d="M30 16H270V212M30 212V16" fill="none" stroke="${c.gold}" stroke-width=".6"/>
   <path d="M15 212H46.2M253.8 212H285" stroke="${c.gold}" stroke-width=".8"/>
   ${[[24,10],[276,10]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="${K.star(8,7,3.6)}" fill="${c.relief}" stroke="${c.gold}" stroke-width=".6"/><circle r="1.6" fill="${c.gold}"/></g>`).join('')}
   ${column(41,c)}${column(259,c)}
   <path d="M10 470H290" stroke="${c.gold}" stroke-width="1"/><path d="M14 470H286V480H14ZM4 480H296V492H4Z" fill="${c.relief}" stroke="${c.line}" stroke-width=".5"/><path d="M14 473H286" stroke="${c.gold}" stroke-width=".4"/><rect x="6" y="481" width="288" height="10" fill="url(#bd${id})"/>`}
function namesSvg(n1,n2,c){const L=Math.max(n1.length,n2.length,4),fs=Math.min(27,128/(L*.48));
  return `<g text-anchor="middle" font-family="'Great Vibes',cursive" fill="${c.accent}"><text x="150" y="${f1(272-fs*.15)}" font-size="${f1(fs)}">${esc(n1)}</text>
   <text x="150" y="${f1(272+fs*.62)}" font-size="${f1(fs*.55)}" fill="${c.gold}" font-family="'Cormorant Garamond',serif" font-style="italic">&amp;</text>
   <text x="150" y="${f1(272+fs*1.5)}" font-size="${f1(fs)}">${esc(n2)}</text></g>`}

FAMILY({key:'alhambra',name:'Alhambra',meaning:'Nasrid palace arch',
  blurb:'A horseshoe arch of carved ivory stucco under a muqarnas honeycomb; the sebka lattice lifts away to a moonlit court of myrtles.',
  fonts:{d:"'Cinzel', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=cols(th),id='p'+(++uid);
    const side=K.uri(`<svg ${NS} width="46.2" height="20" viewBox="0 0 46.2 20"><path d="M37 0H45V20H37Z" fill="${c.relief}" stroke="${c.line}" stroke-width=".5"/><path d="M39.6 0V20" stroke="${c.shadow}" stroke-width=".4" opacity=".35"/></svg>`);
    return `<section class="page pg-alhambra${c.dark?' al-dark':''}" style="--al-sebka:${K.uri(`<svg ${NS} width="26" height="34" viewBox="0 0 26 34">${sebkaTile(c,26,34,false)}</svg>`)};--al-side:${side};--al-paint:${c.paint}">
     <div class="al-frame"><svg class="al-head" viewBox="0 0 300 226">${portal(c,id,false,'')}</svg>
      <div class="al-body"><i class="al-side l"></i><i class="al-side r"></i>
       <div class="al-txt"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
        <div class="al-rule reveal d2"><svg viewBox="0 0 120 16"><path d="M4 8H44M76 8H116" stroke="${c.gold}" stroke-width=".7"/><path d="${K.star(8,7,3.4,60,8)}" fill="none" stroke="${c.gold}" stroke-width=".8"/><circle cx="60" cy="8" r="1.4" fill="${c.gold}"/><path d="M48 8l2-2 2 2-2 2zM68 8l2-2 2 2-2 2z" fill="${c.gold}"/></svg></div>
        <p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></div>
      <svg class="al-base" viewBox="0 0 300 30"><g transform="translate(0 -458)">${column(41,c).replace(/<path d="M-9 212[\s\S]*?(?=<path d="M-6 454)/,'')}${column(259,c).replace(/<path d="M-9 212[\s\S]*?(?=<path d="M-6 454)/,'')}<path d="M10 470H290" stroke="${c.gold}" stroke-width="1"/><path d="M14 470H286V480H14ZM4 480H296V488H4Z" fill="${c.relief}" stroke="${c.line}" stroke-width=".5"/><path d="M14 473H286M4 483H296" stroke="${c.gold}" stroke-width=".4"/></g></svg></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=cols(th),id='c'+(++uid);
    return `<div class="cover cv-alhambra${c.dark?' al-dark':''}" style="--al-sebka:${K.uri(`<svg ${NS} width="26" height="34" viewBox="0 0 26 34">${sebkaTile(c,26,34,false)}</svg>`)}">
     <div class="al-wall"></div>
     <div class="al-top"><p class="al-k">${ev(o,L)}</p><svg class="al-rl" viewBox="0 0 120 12"><path d="M6 6H48M72 6H114" stroke="${c.gold}" stroke-width=".6"/><path d="${K.star(8,5.4,2.6,60,6)}" fill="none" stroke="${c.gold}" stroke-width=".7"/></svg><p class="al-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <${tag} class="al-portal" ${attr} aria-label="${L.open}"><svg viewBox="0 0 300 492" preserveAspectRatio="xMidYMid meet">${portal(c,id,true,namesSvg(n1||'',n2||'',c))}</svg></${tag}>
     <div class="al-foot">${guest?`<p class="al-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="al-hint">${en?'Touch the lattice to lift it':'Sentuh kekisi untuk mengangkatnya'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=cols(th);
    el.style.setProperty('--al-sebka',K.uri(`<svg ${NS} width="26" height="34" viewBox="0 0 26 34">${sebkaTile({...c,relief:mix(c.gold,c.sheet,.35),shadow:mix(c.sheet,c.ink,.18),gold:c.gold},26,34,false)}</svg>`));
    el.style.setProperty('--al-star',K.uri(`<svg ${NS} viewBox="-10 -10 20 20"><path d="${K.star(8,9,4.6)}" fill="none" stroke="${c.gold}" stroke-width="1"/><circle r="2" fill="${c.paint}"/></svg>`));
    const hs=(r,cx,cy,yb)=>{const t=22*Math.PI/180,xl=cx-r*Math.cos(t),xr=cx+r*Math.cos(t),y=cy+r*Math.sin(t);return `M${f1(xl)} ${yb}V${f1(y)}A${r} ${r} 0 1 1 ${f1(xr)} ${f1(y)}V${yb}`};
    let fr='';for(let i=0;i<=12;i++){const a=(-22+i*224/12)*Math.PI/180,x=36+Math.cos(a)*20,y=30-Math.sin(a)*20,x2=36+Math.cos(a)*16.6,y2=30-Math.sin(a)*16.6;fr+=`<circle cx="${f1(x2)}" cy="${f1(y2)}" r="1.25" fill="${c.gold}"/>`;void x;void y}
    el.style.setProperty('--al-arch',K.uri(`<svg ${NS} viewBox="0 0 72 52"><path d="${hs(25,36,30,52)}" fill="none" stroke="${c.gold}" stroke-width="1.1"/><path d="${hs(21,36,30,52)}" fill="none" stroke="${c.gold}" stroke-width=".5"/>${fr}<path d="${K.star(8,7.5,3.6,36,32)}" fill="none" stroke="${c.paint}" stroke-width=".9"/><circle cx="36" cy="32" r="1.6" fill="${c.paint}"/><path d="M4 51.5H68" stroke="${c.gold}" stroke-width=".6"/></svg>`));
    el.style.setProperty('--al-paint',c.paint);
    $$('.sec h2',el).forEach(h=>{h.classList.add('al-h2');h.insertAdjacentHTML('afterbegin','<i class="al-hi"></i>')})},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory stucco on lapis',c:{ground:'#efe5d1',sheet:'#fbf6ea',ink:'#2a2a35',accent:'#24427e',gold:'#b08a3e',paint:'#24427e',pagefg:'#2a2a35'}},
    {k:'nila',n:'Nila Malam',desc:'Lapis night, gold stucco',c:{ground:'#14244a',sheet:'#f6efdf',ink:'#1f2433',accent:'#24427e',gold:'#d6b162',paint:'#203d78',pagefg:'#f2e9d5',dark:1}},
    {k:'merah',n:'Merah Almagra',desc:'Ivory stucco on Nasrid red',c:{ground:'#f0e2d0',sheet:'#fbf5ea',ink:'#33221c',accent:'#8e2f25',gold:'#a8823c',paint:'#8e2f25',pagefg:'#33221c'}},
    {k:'zamrud',n:'Zamrud',desc:'Myrtle green and gold',c:{ground:'#173a31',sheet:'#f5f0e1',ink:'#1f2a24',accent:'#1f5a48',gold:'#d2ae60',paint:'#1f5a48',pagefg:'#f1e9d4',dark:1}},
    {k:'senja',n:'Senja',desc:'Rose dusk over the court',c:{ground:'#ecd8cc',sheet:'#fcf6f1',ink:'#3c2630',accent:'#7a3550',gold:'#a8804a',paint:'#6e3a5a',pagefg:'#3c2630'}},
    {k:'hitam',n:'Hitam',desc:'Black lacquer and gold',c:{ground:'#15130f',sheet:'#f4eddf',ink:'#1d1a15',accent:'#7a5a22',gold:'#d0a75a',paint:'#2a2620',pagefg:'#efe6d3',dark:1}},
    {k:'laut',n:'Laut',desc:'Turquoise and ivory',c:{ground:'#e3ecea',sheet:'#fafcf9',ink:'#1f3236',accent:'#1d6670',gold:'#a8894a',paint:'#1d6670',pagefg:'#1f3236'}},
    {k:'emas',n:'Emas',desc:'Ochre stucco, gilded',c:{ground:'#e6cf9c',sheet:'#fdf6e3',ink:'#3a2814',accent:'#6b3a1a',gold:'#94692a',paint:'#5a3a1e',pagefg:'#3a2814'}},
  ]});
