/* kerang: a scallop shell and a pearl on rippled sand. The shell lies hinge-away; touch it and the upper valve
   lifts on its hinge to show a pearl on the nacre, then the scene fades. Page: a pearl-strand border with small
   scallops at the corners. Skin: pearl swags on each card and pearl-strand dividers. */
needFont('Bodoni+Moda:ital,wght@0,400;1,400');needFont('Mrs+Saint+Delafield');
const f1=n=>n.toFixed(1),PI=Math.PI;
const mix=(a,b,t)=>{const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),A=p(a),B=p(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
let gid=0;
/* pearl gradient defs, one per svg */
const pearlDef=(id,c)=>`<radialGradient id="${id}" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${c.pearl1}"/><stop offset=".7" stop-color="${c.pearl2}"/><stop offset="1" stop-color="${c.pearl3}"/></radialGradient>`;
const pearl=(x,y,r,id)=>`<circle cx="${f1(x)}" cy="${f1(y+r*.25)}" r="${f1(r)}" fill="#000" opacity=".12"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="url(#${id})"/><ellipse cx="${f1(x-r*.32)}" cy="${f1(y-r*.38)}" rx="${f1(r*.22)}" ry="${f1(r*.14)}" fill="#fff" opacity=".85" transform="rotate(-30 ${f1(x-r*.32)} ${f1(y-r*.38)})"/>`;
/* scallop geometry: umbo at U, a near-circular margin of n scalloped ribs, ears on a straight hinge line */
const U=[150,40],RHO=116,CC=[150,40+RHO*1.02],F0=-38*PI/180,F1=218*PI/180;
const M=(f,k=1)=>[CC[0]+Math.cos(f)*RHO*k,CC[1]+Math.sin(f)*RHO*k];
const toU=(p,s)=>[U[0]+(p[0]-U[0])*s,U[1]+(p[1]-U[1])*s];
function outline(n,k=1){let d=`M${U[0]} ${U[1]+4}`;
  for(let i=0;i<n;i++){const g0=F0+(F1-F0)*i/n,g1=F0+(F1-F0)*(i+1)/n,fm=(g0+g1)/2,[x0,y0]=M(g0,k),[x1,y1]=M(g1,k),[qx,qy]=M(fm,k*1.09);d+=(i?'':`L${f1x(x0)} ${f1x(y0)}`)+`Q${f1x(qx)} ${f1x(qy)} ${f1x(x1)} ${f1x(y1)}`}
  return d+'Z'}
const f1x=n=>n.toFixed(1);
function lid(c,uid){const n=17;let ribs='',grads='',stri='',grow='';
  for(let i=0;i<n;i++){const g0=F0+(F1-F0)*i/n,g1=F0+(F1-F0)*(i+1)/n,fm=(g0+g1)/2,w=g1-g0;
    const a=M(fm-w*.4),b=M(fm+w*.4),q=M(fm,1.1),ua=toU(M(fm-w*.4),.02),ub=toU(M(fm+w*.4),.02);
    grads+=`<linearGradient id="kr${uid}_${i}" gradientUnits="userSpaceOnUse" x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}"><stop offset="0" stop-color="${c.shellD}"/><stop offset=".42" stop-color="${mix(c.shell,'#ffffff',.55)}"/><stop offset=".62" stop-color="${c.shell}"/><stop offset="1" stop-color="${c.shellD}"/></linearGradient>`;
    ribs+=`<path d="M${f1(ua[0])} ${f1(ua[1])}L${f1(a[0])} ${f1(a[1])}Q${f1(q[0])} ${f1(q[1])} ${f1(b[0])} ${f1(b[1])}L${f1(ub[0])} ${f1(ub[1])}Z" fill="url(#kr${uid}_${i})"/>`;
    const e=M(g0);stri+=`M${U[0]} ${U[1]}L${f1(e[0])} ${f1(e[1])}`;for(const g of [-.2,0,.2]){const p=M(fm+w*g,1.04),u=toU(p,.2);stri+=`M${f1(u[0])} ${f1(u[1])}L${f1(p[0])} ${f1(p[1])}`}}
  for(let j=0;j<20;j++){const s=.22+j*.04+(j%3)*.006;let d='';for(let i=0;i<=48;i++){const p=toU(M(F0+(F1-F0)*i/48),s);d+=(i?'L':'M')+f1(p[0])+' '+f1(p[1])}grow+=d}
  const ear=sd=>{const e=M(sd>0?F0:F1);return `<path d="M150 40L${150+sd*76} 33Q${150+sd*80} 56 ${f1(e[0])} ${f1(e[1])}L150 46Z" fill="${c.shell}" stroke="${c.shellD}" stroke-width=".8"/>${[0,1,2,3,4,5].map(i=>`<path d="M${150+sd*(14+i*11)} ${f1(46+i*6)}L${150+sd*(14+i*11)} ${f1(38-i*.8)}" stroke="${c.shellD}" stroke-width=".5" opacity=".7"/>`).join('')}`};
  const o=outline(n);
  return `<defs>${grads}<linearGradient id="ks${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe4ee"/><stop offset=".3" stop-color="#e2fff4"/><stop offset=".55" stop-color="#ece4ff"/><stop offset=".8" stop-color="#fff4dc"/><stop offset="1" stop-color="#e4f2ff"/></linearGradient>
    <radialGradient id="kd${uid}" cx=".5" cy=".55" r=".6"><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></radialGradient>
    <clipPath id="kc${uid}"><path d="${o}"/></clipPath></defs>
   ${ear(-1)}${ear(1)}<path d="${o}" fill="${c.shell}"/>
   <g clip-path="url(#kc${uid})">${ribs}<path d="${grow}" fill="none" stroke="${c.shellD}" stroke-width=".45" opacity=".5"/><path d="${stri}" fill="none" stroke="${c.shellD}" stroke-width=".4" opacity=".55"/>
    <rect width="300" height="300" fill="url(#ks${uid})" opacity=".5" style="mix-blend-mode:soft-light"/><rect width="300" height="300" fill="url(#kd${uid})"/></g>
   <path d="${o}" fill="none" stroke="${c.shellD}" stroke-width="1"/><path d="M146 40h8" stroke="${c.shellD}" stroke-width="2" stroke-linecap="round"/>`}
/* the lower valve seen from inside: smooth nacre with faint ribs and the pearl */
function inside(c,uid){const o=outline(17,.98);let rib='';
  for(let k=0;k<=17;k++){const p=M(F0+(F1-F0)*k/17,.96),u=toU(p,.25);rib+=`M${f1(u[0])} ${f1(u[1])}L${f1(p[0])} ${f1(p[1])}`}
  return `<defs><radialGradient id="kn${uid}" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#fffdfb"/><stop offset=".55" stop-color="${c.nacre1}"/><stop offset="1" stop-color="${c.nacre2}"/></radialGradient>
   <linearGradient id="ki${uid}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ffd6e6"/><stop offset=".35" stop-color="#d6fff0"/><stop offset=".65" stop-color="#e2d8ff"/><stop offset="1" stop-color="#fff0d0"/></linearGradient>${pearlDef('kp'+uid,c)}
   <clipPath id="kq${uid}"><path d="${o}"/></clipPath></defs>
   <path d="${outline(17,1.03)}" fill="${c.shellD}"/><path d="${o}" fill="url(#kn${uid})"/>
   <g clip-path="url(#kq${uid})"><rect width="300" height="300" fill="url(#ki${uid})" opacity=".35" style="mix-blend-mode:soft-light"/><path d="${rib}" stroke="${c.shellD}" stroke-width="2" opacity=".14"/></g>
   <ellipse cx="150" cy="182" rx="30" ry="9" fill="#000" opacity=".12"/>${pearl(150,162,24,'kp'+uid)}`}
/* rippled sand: grain from turbulence plus soft wind ripples */
function sand(c,uid){let rp='';const r=rng(5);for(let i=0;i<16;i++){const y=30+i*48+r()*14;let d=`M-10 ${f1(y)}`;for(let x=0;x<=420;x+=60)d+=`Q${x+30} ${f1(y+(r()-.5)*16)} ${x+60} ${f1(y+(r()-.5)*6)}`;rp+=`<path d="${d}" stroke="#fff" stroke-width="1.6" opacity="${c.dark?.07:.22}" fill="none"/><path d="${d}" transform="translate(0 2.4)" stroke="#000" stroke-width="1.2" opacity=".07" fill="none"/>`}
  return `<svg class="kg-sand" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice"><defs><filter id="kgr${uid}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="${uid}"/><feColorMatrix values="0 0 0 0 .3 0 0 0 0 .22 0 0 0 0 .12 0 0 0 1.4 -.72"/></filter></defs>${rp}<rect width="400" height="800" filter="url(#kgr${uid})" opacity=".5"/></svg>`}
/* a loose strand of pearls draped on the sand, spaced evenly along a cubic */
function drape(c,id){const P=[[252,476],[296,566],[180,592],[52,586]],pts=[];let last=null;
  for(let i=0;i<=400;i++){const t=i/400,u=1-t,x=u*u*u*P[0][0]+3*u*u*t*P[1][0]+3*u*t*t*P[2][0]+t*t*t*P[3][0],y=u*u*u*P[0][1]+3*u*u*t*P[1][1]+3*u*t*t*P[2][1]+t*t*t*P[3][1];
    if(!last||Math.hypot(x-last[0],y-last[1])>=8.6){pts.push([x,y]);last=[x,y]}}
  return `<svg class="kg-neck" viewBox="0 0 390 760" preserveAspectRatio="xMidYMid slice"><defs>${pearlDef(id,c)}</defs>${pts.map(([x,y])=>pearl(x,y,4.1,id)).join('')}${pearl(318,604,5.2,id)}${pearl(334,592,3.8,id)}</svg>`}
/* a strand of pearls along a path of points, graduated towards the middle */
function strand(pts,rmin,rmax,id){return pts.map(([x,y],i)=>{const t=1-Math.abs(i/(pts.length-1)*2-1);return pearl(x,y,rmin+(rmax-rmin)*t,id)}).join('')}
function mini(c,uid,x,y,s,rot){return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-150 -150)">${lid(c,uid)}</g>`}
let uid=0;
FAMILY({key:'kerang',name:'Kerang',meaning:'Seashell and pearl',
  blurb:'A ribbed scallop with a pearly sheen lies on rippled sand. Touch it and the shell opens on a single pearl.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Mrs Saint Delafield', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u=++uid,id='pp'+u;
    const top=Array.from({length:23},(_,i)=>[30+i*15.45,30]),bot=top.map(([x])=>[x,770]),lft=Array.from({length:47},(_,i)=>[30,45.6+i*15.2]),rgt=lft.map(([,y])=>[370,y]);
    const all=[...top,...bot,...lft,...rgt].map(([x,y])=>pearl(x,y,5.6,id)).join('');
    return `<section class="page pg-kerang" style="--kgn:${c.nm}">${sand(c,u)}<svg class="kg-border" viewBox="0 0 400 800" preserveAspectRatio="none"><defs>${pearlDef(id,c)}</defs>
     <rect x="44" y="44" width="312" height="712" fill="none" stroke="${c.gold}" stroke-width=".8"/><rect x="49" y="49" width="302" height="702" fill="none" stroke="${c.gold}" stroke-width=".4"/>${all}</svg>
     <svg class="kg-cs tl" viewBox="0 0 300 300">${mini(c,'q'+u+'a',150,150,1,-45)}</svg><svg class="kg-cs tr" viewBox="0 0 300 300">${mini(c,'q'+u+'b',150,150,1,45)}</svg>
     <svg class="kg-cs bl" viewBox="0 0 300 300">${mini(c,'q'+u+'c',150,150,1,-135)}</svg><svg class="kg-cs br" viewBox="0 0 300 300">${mini(c,'q'+u+'d',150,150,1,135)}</svg>
     <div class="kg-in"><svg class="kg-top" viewBox="0 0 300 300">${lid(c,'t'+u)}</svg><p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
      <svg class="kg-str reveal d2" viewBox="0 0 200 20"><defs>${pearlDef(id+'s',c)}</defs>${strand(Array.from({length:13},(_,i)=>[28+i*12,8+Math.sin(i/12*PI)*4]),2.6,4.6,id+'s')}</svg>
      <p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(fmtTime(o.start,o.lang))} &middot; ${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u=++uid;
    return `<div class="cover cv-kerang" style="--kgn:${c.nm}">${sand(c,u)}<i class="kg-frame"></i>${drape(c,'kn'+u+'d')}
     <div class="kg-head"><p class="kg-k">${ev(o,L)}</p><p class="kg-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</p></div>
     <${tag} class="kg-shell" ${attr} aria-label="${L.open}"><svg class="kg-low" viewBox="0 0 300 300">${inside(c,u)}</svg><svg class="kg-lid" viewBox="0 0 300 300">${lid(c,u)}</svg></${tag}>
     <div class="kg-foot"><svg class="kg-str" viewBox="0 0 200 20"><defs>${pearlDef('kz'+u,c)}</defs>${strand(Array.from({length:13},(_,i)=>[28+i*12,8+Math.sin(i/12*PI)*4]),2.6,4.6,'kz'+u)}</svg>
      <p class="kg-d">${esc(fmtDate(o.date,o.lang))}</p>${guest?`<p class="kg-to">${L.dear}<b>${esc(guest)}</b></p>`:`<p class="kg-to"><b>${esc(o.venue)}</b></p>`}
      <p class="kg-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){const c=th.c;K.cards(el);
    K.secs(el).forEach((s,i)=>{const id='sk'+(++gid);
      const swag=Array.from({length:27},(_,k)=>{const t=k/26;return [14+t*332,6+Math.sin(t*PI)*24]});
      s.insertAdjacentHTML('afterbegin',`<svg class="kg-swag" viewBox="0 0 360 40" preserveAspectRatio="none"><defs>${pearlDef(id,c)}</defs>${strand(swag,3,3,id)}</svg>`);
      const h=s.querySelector('h2');if(h)h.insertAdjacentHTML('afterend',`<svg class="kg-str" viewBox="0 0 200 20"><defs>${pearlDef(id+'d',c)}</defs>${strand(Array.from({length:13},(_,k)=>[28+k*12,8+Math.sin(k/12*PI)*4]),2.4,4.4,id+'d')}</svg>`)})},
  themes:[
    {k:'mutiara',n:'Mutiara',desc:'Ivory sand, blush shell',c:{ground:'#eee4d4',sheet:'#fcf9f4',ink:'#4a4038',accent:'#7a5a50',gold:'#b5986a',pagefg:'#4a4038',nm:'#7a5a50',shell:'#f4e6dc',shellD:'#c9ab98',nacre1:'#f6ece8',nacre2:'#dccbd0',pearl1:'#fbf6f1',pearl2:'#e6dcd6',pearl3:'#b8aaa4'}},
    {k:'laut',n:'Laut',desc:'Pale sand, sea-blue script',c:{ground:'#e8e2d4',sheet:'#fbfaf6',ink:'#2f3d45',accent:'#2e5b6e',gold:'#a8956a',pagefg:'#2f3d45',nm:'#2e5b6e',shell:'#f2e9df',shellD:'#bfa892',nacre1:'#eef2f2',nacre2:'#cfd8dc',pearl1:'#f8f8f6',pearl2:'#dfe2e2',pearl3:'#a7aeb2'}},
    {k:'jambu',n:'Jambu',desc:'Pink sand, rose shell',c:{ground:'#f1dfd6',sheet:'#fdf8f5',ink:'#4a3434',accent:'#9a5462',gold:'#b58d6a',pagefg:'#4a3434',nm:'#9a5462',shell:'#f7e0d8',shellD:'#d4a49a',nacre1:'#fbecec',nacre2:'#e8c8cc',pearl1:'#fff6f4',pearl2:'#efdcdc',pearl3:'#c4a8aa'}},
    {k:'emas',n:'Emas',desc:'Golden sand, warm pearl',c:{ground:'#e6d2ad',sheet:'#fcf6ea',ink:'#463822',accent:'#7a5a26',gold:'#b08a42',pagefg:'#463822',nm:'#6e5020',shell:'#f5e8d2',shellD:'#c4a274',nacre1:'#f8f0e2',nacre2:'#e2cfb0',pearl1:'#fffaf0',pearl2:'#ece0c8',pearl3:'#bba684'}},
    {k:'hijau',n:'Buih Laut',desc:'Seafoam sand, green script',c:{ground:'#dfe6dc',sheet:'#fafbf7',ink:'#2f3d36',accent:'#3d6656',gold:'#a8966a',pagefg:'#2f3d36',nm:'#3d6656',shell:'#f0eadf',shellD:'#b6a890',nacre1:'#eef4f0',nacre2:'#d0dcd6',pearl1:'#f9faf7',pearl2:'#e0e4df',pearl3:'#a9b0aa'}},
    {k:'ungu',n:'Ungu',desc:'Lilac dusk, mauve pearl',c:{ground:'#e5dde5',sheet:'#fbf8fb',ink:'#3e3446',accent:'#6a4e7a',gold:'#a8936e',pagefg:'#3e3446',nm:'#6a4e7a',shell:'#f1e6e8',shellD:'#c0a6b0',nacre1:'#f3ecf4',nacre2:'#d8cadc',pearl1:'#fbf8fb',pearl2:'#e6dde8',pearl3:'#aea0b4'}},
    {k:'malam',n:'Malam',desc:'Night shore, silver shell',c:{ground:'#1c2732',sheet:'#f8f6f2',ink:'#2e3640',accent:'#3f5468',gold:'#c4ad80',pagefg:'#e8e4dc',dark:1,nm:'#f0e8dc',shell:'#ece6e0',shellD:'#a89c94',nacre1:'#eef0f2',nacre2:'#c8ccd4',pearl1:'#ffffff',pearl2:'#e2e4e8',pearl3:'#9ca2ac'}},
    {k:'nila',n:'Nila',desc:'Deep indigo sea, cream shell',c:{ground:'#17243e',sheet:'#fbf8f2',ink:'#27304a',accent:'#2e3f6e',gold:'#c8a868',pagefg:'#ece6da',dark:1,nm:'#f2e6d2',shell:'#f3e8da',shellD:'#b39d84',nacre1:'#f4eee8',nacre2:'#d6ccc8',pearl1:'#fffdf8',pearl2:'#e9e2d8',pearl3:'#aaa094'}},
  ]});
