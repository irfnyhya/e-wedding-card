/* quilling: rolled paper strips standing on edge. Tight and loose coils, teardrops, marquise leaves and scrolls
   build flowers and a heart-shaped frame round the names, each strip shaded on its upright edge.
   Cover: a deep shadow-box with the quilled heart; touching the heart lifts it towards you, then the box fades.
   Page: quilled flower clusters in two corners. Skin: coil bullets on headings and the programme. */
needFont('Parisienne');
const f1=v=>(+v).toFixed(1);
// a wound strip: an Archimedean spiral bent to a shape, finished with one full outer wrap
function spiral(turns,R,shape,core=[0,0],steps=15){let d='';const N=Math.round(turns*steps);
  for(let i=0;i<=N;i++){const t=i/N,a=t*turns*Math.PI*2,r=R*Math.pow(t,.8)*shape(a),x=core[0]*(1-t)+Math.cos(a)*r,y=core[1]*(1-t)+Math.sin(a)*r;d+=(i?'L':'M')+f1(x)+' '+f1(y)}
  for(let i=1;i<=steps;i++){const a=turns*Math.PI*2+i/steps*Math.PI*2,r=R*shape(a);d+='L'+f1(Math.cos(a)*r)+' '+f1(Math.sin(a)*r)}
  return d}
const ROUND=()=>1;
const TEAR=a=>1+1.15*Math.pow((1+Math.cos(a+Math.PI/2))/2,7);          // point towards -y
const EYE=a=>.58+.62*Math.pow(Math.abs(Math.cos(a)),5);                 // points towards ±x
const scrollPath=(kind)=>{const sp=(cx,cy,a0,dir,turns,R,inward)=>{let d='';const N=Math.round(turns*14);for(let i=0;i<=N;i++){const t=i/N,u=inward?t:1-t,a=a0+dir*(inward?t:(t-1))*turns*Math.PI*2,r=R*(inward?1-t*.92:.08+t*.92);d+='L'+f1(cx+Math.cos(a)*r)+' '+f1(cy+Math.sin(a)*r)}return d};
  const s1=sp(-12,0,-Math.PI/2,1,2.2,4.4,false).replace(/^L/,'M');
  return kind==='S'?s1+'C-4 -4.4 4 4.4 12 4.4'+sp(12,0,Math.PI/2,-1,2.2,4.4,true):s1+'C-5 -13 5 -13 12 -4.4'+sp(12,0,-Math.PI/2,1,2.2,4.4,true)};
// each shape as three strokes: the cast shadow, the strip in its colour (currentColor) and its lit upper edge
function defs(u){const piece=(id,d,w=1.35)=>`<g id="${id}${u}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${d}" stroke="rgba(40,25,15,.2)" stroke-width="${w+1.6}" transform="translate(.9 1.4)"/><path d="${d}" stroke="currentColor" stroke-width="${w}"/><path d="${d}" stroke="rgba(0,0,0,.18)" stroke-width="${f1(w*.5)}" transform="translate(.35 .45)"/><path d="${d}" stroke="rgba(255,255,255,.6)" stroke-width=".42" transform="translate(-.35 -.4)"/></g>`;
  return `<defs><g fill="none" stroke-linecap="round" stroke-linejoin="round">
   ${piece('qt',spiral(7,5.2,ROUND),1.15)}${piece('ql',spiral(4.2,7.4,ROUND,[2.2,-1.6]))}${piece('qd',spiral(5,7.2,TEAR,[0,2.6]))}
   ${piece('qe',spiral(3.6,7.2,EYE,[1.2,0]))}${piece('qs',scrollPath('S'))}${piece('qc',scrollPath('C'))}</g></defs>`}
const use=(id,u,x,y,rot,s,col)=>`<use href="#${id}${u}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})" style="color:${col}"/>`;
// a quilled flower: teardrop petals meeting at a tight coil, with optional marquise leaves
function flower(u,x,y,s,c,col,n=6,rot=0,leaves=true){let g='';
  if(leaves)[-1,1].forEach(k=>{g+=use('qe',u,x+k*16*s,y+9*s,k*25+rot,(s*1.15).toFixed(2),c.leaf)});
  for(let i=0;i<n;i++){const a=rot*Math.PI/180+i/n*Math.PI*2,d=10.6*s;g+=use('qd',u,x+Math.cos(a)*d,y+Math.sin(a)*d,a*180/Math.PI-90,(s*1.05).toFixed(2),col)}
  return g+use('qt',u,x,y,0,(s*.9).toFixed(2),c.gold)}
// the heart frame
function heart(c,u){const S=9,Y=4,P=t=>[16*Math.pow(Math.sin(t),3)*S,-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*S+Y];
  const M=600,pts=[],len=[0];for(let i=0;i<=M;i++){pts.push(P(i/M*Math.PI*2));if(i)len.push(len[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]))}
  const L=len[M],K=60;let g='',flw='';
  const at=f=>{const target=f*L;let i=len.findIndex(v=>v>=target);i=Math.max(1,Math.min(M,i));const [x,y]=pts[i],[px,py]=pts[i-1];let nx=y-py,ny=-(x-px);const h=Math.hypot(nx,ny)||1;nx/=h;ny/=h;
    if(nx*x+ny*(y-30)<0){nx=-nx;ny=-ny}return {x,y,nx,ny,ta:Math.atan2(y-py,x-px)*180/Math.PI}};
  const skip=f=>[0,.5].some(p=>Math.min(Math.abs(f-p),1-Math.abs(f-p))<.03)||[.25,.75].some(p=>Math.abs(f-p)<.026);
  for(let k=0;k<K;k++){const f=k/K;if(skip(f))continue;const q=at(f),na=Math.atan2(q.ny,q.nx)*180/Math.PI;
    g+=use('qd',u,q.x+q.nx*5,q.y+q.ny*5,na+90,.95,k%2?c.q2:c.accent);
    g+=k%2?use('qt',u,q.x-q.nx*9,q.y-q.ny*9,k*41,.62,c.gold):use('qe',u,q.x-q.nx*8,q.y-q.ny*8,q.ta,.62,c.leaf)}
  const top=at(0),bot=at(.5),l=at(.25),r=at(.75);
  flw+=flower(u,top.x,top.y-8,1.15,c,c.accent,7,0)+flower(u,bot.x,bot.y+4,1.05,c,c.q2,6,90,false)
     +flower(u,l.x+4,l.y,.82,c,c.q2,5,-90,false)+flower(u,r.x-4,r.y,.82,c,c.q2,5,90,false);
  [-1,1].forEach(k=>{flw+=use('qc',u,k*26,top.y+4,k*24+(k<0?180:0),.8,c.gold)});
  return `<svg class="ql-heart" viewBox="-168 -140 336 312">${defs(u)}${g}${flw}</svg>`}
// a quilled band: scrolls and coils in a row, for the top and foot of the box
function band(c,u){let g='';for(let i=0;i<7;i++){const x=24+i*42;g+=use('qs',u,x,16,0,1.05,i%2?c.gold:c.leaf)+use('qt',u,x+21,16,0,.7,i%2?c.accent:c.q2)}
  return `<svg class="ql-band" viewBox="0 0 316 32">${defs(u)}${use('qt',u,4,16,0,.6,c.gold)}${g}</svg>`}
// a corner cluster for the page
function cluster(c,u){return `<svg class="ql-cl" viewBox="0 0 170 150">${defs(u)}
  ${use('qs',u,92,26,-12,1.3,c.gold)}${use('qc',u,30,96,70,1.2,c.gold)}${use('qe',u,70,62,40,1.2,c.leaf)}${use('qe',u,52,40,-60,1.1,c.leaf)}${use('qe',u,110,46,10,1,c.leaf)}
  ${flower(u,40,32,1.35,c,c.accent,7,10,false)}${flower(u,96,68,.95,c,c.q2,6,0,false)}${flower(u,24,92,.75,c,c.accent,5,30,false)}
  ${use('ql',u,130,24,0,.9,c.accent)}${use('qt',u,146,40,0,.7,c.gold)}${use('ql',u,62,104,40,.8,c.q2)}${use('qt',u,46,124,0,.7,c.gold)}${use('qt',u,124,92,0,.6,c.accent)}</svg>`}
// a single coil for bullets
const coil=(col,R=6)=>`<svg viewBox="-9 -9 18 18" class="ql-coil"><g fill="none" stroke-linecap="round"><path d="${spiral(4,R,ROUND,[1.4,-1])}" stroke="rgba(40,25,15,.22)" stroke-width="2.4" transform="translate(.6 .9)"/><path d="${spiral(4,R,ROUND,[1.4,-1])}" stroke="${col}" stroke-width="1.2"/><path d="${spiral(4,R,ROUND,[1.4,-1])}" stroke="rgba(255,255,255,.55)" stroke-width=".35" transform="translate(-.25 -.3)"/></g></svg>`;
let n=0;
FAMILY({key:'quilling',name:'Quilling',meaning:'Rolled paper art',
  blurb:'A heart of hand-rolled paper coils, teardrops and scrolls standing on edge in a deep shadow box, with quilled flowers. Touch it and it lifts.',
  fonts:{d:"'Marcellus', serif",s:"'Parisienne', cursive",b:"'Cormorant Garamond', serif"},ms:1350,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,u='p'+(++n);
    return `<section class="page pg-quilling"><div class="ql-box"><div class="ql-paper">
     <div class="ql-corner tl">${cluster(c,u)}</div><div class="ql-corner br">${cluster(c,u+'b')}</div>
     <p class="ql-k reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="ql-rule reveal d2">${coil(c.gold,5)}<i></i>${coil(c.accent,6)}<i></i>${coil(c.gold,5)}</div>
     <p class="ql-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="ql-venue reveal d3">${esc(o.venue)}</p></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u='c'+(++n);
    return `<div class="cover cv-quilling"><div class="ql-box"><div class="ql-paper"><i class="ql-bd t">${band(c,u+'t')}</i><i class="ql-bd b">${band(c,u+'b')}</i>
     <p class="ql-k">${ev(o,L)}</p>
     <${tag} class="ql-frame" ${attr} aria-label="${L.open}">${heart(c,u)}<span class="ql-in"><b>${esc(n1)}</b><i>&amp;</i><b>${esc(n2)}</b></span></${tag}>
     <p class="ql-date">${esc(fmtDate(o.date,o.lang))}</p>
     ${guest?`<p class="ql-to">${L.dear}</p><p class="ql-guest">${esc(guest)}</p>`:''}
     <p class="ql-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div></div>`},
  skin(el,o,th){K.cards(el);const c=th.c;
    $$('.sec h2',el).forEach(h=>{h.innerHTML=`<i class="ql-hb">${coil(c.accent)}</i><span>${h.innerHTML}</span><i class="ql-hb">${coil(c.accent)}</i>`});
    $$('.timeline li',el).forEach(li=>li.insertAdjacentHTML('afterbegin',`<i class="ql-li">${coil(c.gold,5)}</i>`));
    $$('.sec',el).forEach((s,i)=>s.insertAdjacentHTML('beforeend',`<i class="ql-sc">${coil(i%2?c.q2:c.accent,5)}${coil(c.gold,4)}${coil(i%2?c.accent:c.q2,5)}</i>`))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Rose and blush strips on ivory',c:{ground:'#e9dcd2',sheet:'#fbf7f0',ink:'#3b2c2a',accent:'#c0566e',gold:'#c9a35a',pagefg:'#3b2c2a',q2:'#e8a3ae',leaf:'#7d9b6a'}},
    {k:'lavender',n:'Ungu Muda',desc:'Lavender and lilac on white',c:{ground:'#ddd8e6',sheet:'#fcfbf8',ink:'#33293d',accent:'#7a5aa6',gold:'#c3a45f',pagefg:'#33293d',q2:'#b9a3d9',leaf:'#7f9a72'}},
    {k:'pic',n:'Pic',desc:'Peach and coral on cream',c:{ground:'#efdccb',sheet:'#fdf8f0',ink:'#3c2b22',accent:'#d9694f',gold:'#c9a35a',pagefg:'#3c2b22',q2:'#f2b08f',leaf:'#7d9b6a'}},
    {k:'biru',n:'Biru',desc:'Cornflower and sky on white',c:{ground:'#d6e0ea',sheet:'#fbfcfb',ink:'#24303f',accent:'#3e6aa8',gold:'#c3a45f',pagefg:'#24303f',q2:'#94b7de',leaf:'#6f9677'}},
    {k:'kuning',n:'Kuning',desc:'Marigold and sage on linen',c:{ground:'#e6e0cc',sheet:'#fdfaf0',ink:'#34301f',accent:'#b4720c',gold:'#b5893a',pagefg:'#34301f',q2:'#efc96a',leaf:'#6c8a56'}},
    {k:'marun',n:'Marun',desc:'Maroon and gold on a dark box',c:{ground:'#3d1a20',sheet:'#f8f1e7',ink:'#36252a',accent:'#8c2236',gold:'#c9a35a',pagefg:'#f3e3dc',q2:'#d07c88',leaf:'#6e8a5a'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald and white on deep green',c:{ground:'#173a31',sheet:'#f8f6ee',ink:'#21302a',accent:'#2b7a5e',gold:'#c9a35a',pagefg:'#e8efe9',q2:'#86c2a5',leaf:'#4f7a46'}},
    {k:'malam',n:'Malam',desc:'Gold and ivory strips on midnight',c:{ground:'#141a2c',sheet:'#1f2740',ink:'#ece6d6',accent:'#e6d3a3',gold:'#c9a35a',pagefg:'#ece6d6',q2:'#9fb2d9',leaf:'#7f9a7a',line:'rgba(236,230,214,.2)'}},
  ]});
