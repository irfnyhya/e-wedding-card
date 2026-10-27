/* lanskap: a public-domain landscape painting seen through an ornate cream lace-paper frame with a die-cut scalloped window.
   The names sit in white script directly on the painting, like a save-the-date from the countryside.
   Cover: tap "Buka Jemputan", the lace frame lifts off and the painting settles to full bleed.
   Page: the painting full bleed with a fine cream inset rule, names on it and a small die-cut lace label.
   Skin: cream paper cards with scalloped die-cut edges over the softened painting. */
needFont('Italianno');
// sample a closed outline (array of segment functions t->[x,y]) into evenly spaced points
function lsOutline(W,H,m){const {x0,y0,x1,y1,r,crest}=m,pts=[],cx=W/2;
  const line=(ax,ay,bx,by)=>{const n=Math.max(2,Math.ceil(Math.hypot(bx-ax,by-ay)));for(let i=0;i<n;i++){const t=i/n;pts.push([ax+(bx-ax)*t,ay+(by-ay)*t])}};
  const arc=(ox,oy,a0,a1)=>{const n=Math.ceil(Math.abs(a1-a0)*r);for(let i=0;i<n;i++){const a=a0+(a1-a0)*i/n;pts.push([ox+Math.cos(a)*r,oy+Math.sin(a)*r])}};
  // top edge with a rococo crest rising into the paper at the centre; bottom mirrored
  const edge=(y,dir)=>{const w=crest.w,hgt=crest.h,xa=x0+r,xb=x1-r,n=Math.ceil(xb-xa);
    for(let i=0;i<n;i++){const t=i/n,x=dir>0?xa+(xb-xa)*t:xb-(xb-xa)*t,u=(x-cx)/w;let dy=0;
      if(Math.abs(u)<1){const k=Math.cos(u*Math.PI/2);dy=hgt*k*k*(1+.35*Math.cos(u*Math.PI*3))/1.35}
      pts.push([x,y-dir*dy])}};
  const P=Math.PI;
  edge(y0,1);arc(x1,y0,P,P/2);line(x1,y0+r,x1,y1-r);arc(x1,y1,3*P/2,P);edge(y1,-1);arc(x0,y1,2*P,3*P/2);line(x0,y1-r,x0,y0+r);arc(x0,y0,P/2,0);
  return pts}
// walk the outline at a fixed step; return chords with their inward normals (towards the window)
function lsChords(pts,step){const L=[0];for(let i=1;i<=pts.length;i++){const a=pts[i-1],b=pts[i%pts.length];L.push(L[i-1]+Math.hypot(b[0]-a[0],b[1]-a[1]))}
  const tot=L[pts.length],n=Math.round(tot/step),at=s=>{let i=1;while(i<L.length-1&&L[i]<s)i++;const a=pts[i-1],b=pts[i%pts.length],f=(s-L[i-1])/((L[i]-L[i-1])||1);return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f]};
  const out=[];for(let i=0;i<n;i++){const a=at(i*tot/n),b=at((i+1)*tot/n),dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;out.push({a,b,m:[(a[0]+b[0])/2,(a[1]+b[1])/2],n:[-dy/l,dx/l]})}return out}
const lsF=v=>v.toFixed(1);
const lsHole=(x,y,r)=>`M${lsF(x-r)} ${lsF(y)}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0Z`;
// the lace paper: mask (where the paper is) + an emboss overlay. W x H is the frame size in px-like units
function lsLace(W,H,m){const pts=lsOutline(W,H,m),ch=lsChords(pts,13),d=6.5;
  let win='',holes='',ridge='',ridge2='';
  ch.forEach((c,i)=>{const [mx,my]=c.m,[nx,ny]=c.n;
    win+=(i?'':`M${lsF(c.a[0])} ${lsF(c.a[1])}`)+`Q${lsF(mx+nx*d*2)} ${lsF(my+ny*d*2)} ${lsF(c.b[0])} ${lsF(c.b[1])}`;
    holes+=lsHole(mx+nx*d*.5,my+ny*d*.5,1.5);                      // an eyelet in every scallop
    holes+=lsHole(c.a[0]-nx*6,c.a[1]-ny*6,.65);                     // a row of pin-pricks behind
    {const cx=mx-nx*14,cy=my-ny*14,tx=-ny,ty=nx,ry=2.7,rx=1;              // a pierced petal in the band behind every scallop
      holes+=`M${lsF(cx-nx*ry)} ${lsF(cy-ny*ry)}Q${lsF(cx+tx*rx*2)} ${lsF(cy+ty*rx*2)} ${lsF(cx+nx*ry)} ${lsF(cy+ny*ry)}Q${lsF(cx-tx*rx*2)} ${lsF(cy-ty*rx*2)} ${lsF(cx-nx*ry)} ${lsF(cy-ny*ry)}Z`}
    if(i%2===0)holes+=lsHole(c.b[0]-nx*21.5,c.b[1]-ny*21.5,1.05);      // and a dot between every other pair
    ridge+=(i?'L':'M')+lsF(mx-nx*27)+' '+lsF(my-ny*27);ridge2+=(i?'L':'M')+lsF(mx-nx*29.5)+' '+lsF(my-ny*29.5)});
  win+='Z';ridge+='Z';ridge2+='Z';
  // a rosette pressed into each concave corner, and one above / below the crest
  const {x0,y0,x1,y1}=m,ros=(x,y,R)=>{let s='';K.ring(10,R,x,y).forEach(([px,py])=>s+=lsHole(px,py,1.1));return s+lsHole(x,y,2.2)};
  const mask=`<svg ${NS} viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path fill="#fff" fill-rule="evenodd" d="M0 0H${W}V${H}H0Z${win}${holes}"/></svg>`;
  const deco=`<svg class="ls-emb" ${NS} viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
    <path d="${ridge}" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.1" transform="translate(.6 .9)"/>
    <path d="${ridge}" fill="none" stroke="#000" stroke-opacity=".16" stroke-width=".9"/>
    <path d="${ridge2}" fill="none" stroke="#000" stroke-opacity=".1" stroke-width=".6"/><path d="${ridge2}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width=".7" transform="translate(.5 .8)"/>
    <path d="${win}" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="1" transform="translate(-.4 -.6)"/></svg>`;
  return {mask,deco}}
// a small die-cut label: rounded oblong with scalloped edge and eyelets
function lsLabel(W,H){const pts=[],r=H/2;
  for(let a=0;a<Math.PI;a+=1/r)pts.push([W-r+Math.sin(a)*r,r-Math.cos(a)*r]);
  for(let x=W-r;x>r;x--)pts.push([x,H]);
  for(let a=0;a<Math.PI;a+=1/r)pts.push([r-Math.sin(a)*r,r+Math.cos(a)*r]);
  for(let x=r;x<W-r;x++)pts.push([x,0]);
  const ch=lsChords(pts,11),d=5;let p='',holes='';
  ch.forEach((c,i)=>{const [mx,my]=c.m,[nx,ny]=c.n;p+=(i?'':`M${lsF(c.a[0])} ${lsF(c.a[1])}`)+`Q${lsF(mx-nx*d*2)} ${lsF(my-ny*d*2)} ${lsF(c.b[0])} ${lsF(c.b[1])}`;holes+=lsHole(mx-nx*d*.45,my-ny*d*.45,1.2)});
  return `<svg ${NS} viewBox="-12 -12 ${W+24} ${H+24}" preserveAspectRatio="none"><path fill="#fff" fill-rule="evenodd" d="${p}Z${holes}"/></svg>`}
const LS_COVER={x0:38,y0:66,x1:352,y1:694,r:34,crest:{w:84,h:22}};
let lsCache=null;const lsCoverLace=()=>lsCache||(lsCache=lsLace(390,760,LS_COVER));
let lsLab=null;const lsLabelUri=()=>lsLab||(lsLab=K.uri(lsLabel(300,96)));
const lsHush=(c,cls)=>`<div class="ls-hush ${cls}" style="--hb:${c.hb||2}px;--hd:${c.hd||.9}"></div>`;
const lsPaint=c=>`<div class="ls-paint" style="background-image:url(${A}${c.paint});background-position:${c.pos||'center'};${c.tone?`filter:${c.tone}`:''}"></div>`;
FAMILY({key:'lanskap',name:'Lanskap',meaning:'Painted landscape',
  blurb:'A landscape painting framed by cream lace paper with a die-cut scalloped edge, the names written over it in white script. The lace lifts away to open it.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Italianno', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-lanskap" style="--lace:${c.lace}">${lsPaint(c)}<div class="ls-veil"></div>${lsHush(c,'h-mid')}<i class="ls-inset"></i>
      <div class="ls-mid">
        ${o.bismillah?'<p class="ls-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="ls-k kicker reveal">${ev(o,L)}</p>
        <h1 class="ls-names reveal d1">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="ls-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="ls-hj reveal d2">${esc(o.hijri)}</p>`:''}
      </div>
      <div class="ls-labelwrap reveal d3"><a class="ls-label" data-go="when" href="#" style="--lab:${lsLabelUri()}"><small>${o.venue?esc(o.venue):(en?'Event details':'Maklumat Majlis')}</small><b>${en?'Event details':'Maklumat Majlis'}</b></a></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',lace=lsCoverLace();
    return `<div class="cover cv-lanskap" style="--lace:${c.lace}">${lsPaint(c)}<div class="ls-veil"></div>
      ${lsHush(c,'h-top')}${lsHush(c,'h-foot')}<div class="ls-frame"><div class="ls-paper" style="-webkit-mask-image:${K.uri(lace.mask)};mask-image:${K.uri(lace.mask)}"></div>${lace.deco}</div>
      <div class="ls-txt">
        <p class="ls-k">${ev(o,L)}</p>
        <p class="ls-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
        <p class="ls-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>
        ${o.venue?`<p class="ls-ven">${esc(o.venue)}</p>`:''}
      </div>
      <div class="ls-foot">${guest?`<p class="ls-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="ls-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;
    el.style.setProperty('--paint',`url(${A}${c.paint})`);el.style.setProperty('--ppos',c.pos||'center');
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'popi',n:'Popi',desc:'Monet’s poppy field in ivory lace',c:{ground:'#5d6b74',sheet:'#fbf7ee',ink:'#33302a',accent:'#7a4a36',gold:'#b2925c',pagefg:'#ffffff',lace:'#f6efe1',paint:'pd-paint-monet-poppies.jpg',pos:'50% 70%',cover:'#c45a3e'}},
    {k:'teratai',n:'Teratai',desc:'Monet’s water lilies in cream lace',c:{ground:'#53677a',sheet:'#fbf8f0',ink:'#2c3138',accent:'#405a72',gold:'#ad9560',pagefg:'#ffffff',lace:'#f3ecdc',paint:'pd-monet.jpg',pos:'40% 50%',cover:'#6f8fa6'}},
    {k:'ungu',n:'Ungu',desc:'Monet’s iris garden in pearl lace',c:{hb:4,hd:.82,ground:'#5a5a6e',sheet:'#fbf9f6',ink:'#302d38',accent:'#5e4e7c',gold:'#a8956a',pagefg:'#ffffff',lace:'#f4f0ea',paint:'pd-paint-monet-irises.jpg',pos:'50% 55%',cover:'#8070a6'}},
    {k:'taman',n:'Taman',desc:'Monet’s orchard at Giverny in blush lace',c:{hb:3,hd:.85,ground:'#6b6a5a',sheet:'#fff9f5',ink:'#3a2c28',accent:'#8e4f4a',gold:'#b8956a',pagefg:'#ffffff',lace:'#f6e8e1',paint:'pd-paint-monet-irises.jpg',pos:'50% 4%',cover:'#c98f86'}},
    {k:'lumut',n:'Lumut',desc:'Hassam’s water garden in sage lace',c:{hb:4,hd:.74,ground:'#4a5a48',sheet:'#fafaf2',ink:'#2a3027',accent:'#4a6040',gold:'#a6935e',pagefg:'#ffffff',lace:'#e9ead9',paint:'pd-paint-hassam-water.jpg',pos:'50% 50%',cover:'#6f8a5a'}},
    {k:'gunung',n:'Gunung',desc:'Hokusai’s red Fuji in ivory lace',c:{ground:'#3b5566',sheet:'#fbf7ef',ink:'#2d2a28',accent:'#8c3b2c',gold:'#b0925a',pagefg:'#ffffff',lace:'#f5eee0',paint:'pd-paint-hokusai-fuji.jpg',pos:'50% 50%',cover:'#b5523a'}},
    {k:'senja',n:'Senja',desc:'The poppy field at dusk in champagne lace',c:{ground:'#5a4a3e',sheet:'#fcf6ea',ink:'#3a2e24',accent:'#7d5230',gold:'#b38d50',pagefg:'#ffffff',lace:'#eedfc4',paint:'pd-paint-monet-poppies.jpg',pos:'50% 35%',tone:'sepia(.35) saturate(1.1) brightness(.88)',cover:'#b98a55'}},
    {k:'laut',n:'Laut',desc:'The lily pond in misty blue lace',c:{ground:'#475a6e',sheet:'#f8fafb',ink:'#26303a',accent:'#3a5670',gold:'#a3956f',pagefg:'#ffffff',lace:'#e6ebee',paint:'pd-monet.jpg',pos:'75% 30%',tone:'saturate(.8) brightness(.95)',cover:'#5f7d96'}},
  ]});
