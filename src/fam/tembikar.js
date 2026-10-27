/* tembikar: "Biru Putih". An ivory card hand-painted like blue-and-white porcelain: a cobalt border of peonies,
   lanceolate leaves, curling vines, buds and seed dots (procedural SVG brushwork: pale washes inside darker drawn
   outlines, leaves in solid cobalt with the veins left white), and a double ruled edge. A real Ming dish (pd-asia-1,
   public domain) lies on the cloth beside it. Cover: tap "Buka Jemputan" and the card and the dish slide apart.
   Page: the card with the dish as its crest (the couple photo sits in the dish's well). Skin: ivory cards with a
   double cobalt rule and painted corner sprigs. Blue colourways plus celadon green and rose pink. */
let tbkN=0;
const f1=n=>(+n).toFixed(1),PI=Math.PI;
// a petal: a fan from radius r0 to an outer scalloped edge at radius r1, between angles a-w and a+w (around cx,cy)
function tbkPetal(cx,cy,a,w,r0,r1,sc,r){const P=(rr,an)=>[cx+Math.cos(an)*rr,cy+Math.sin(an)*rr];
  const [bx,by]=P(r0,a-w*.35),[ex,ey]=P(r0,a+w*.35);let d=`M${f1(bx)} ${f1(by)}`;const [s0x,s0y]=P(r1*.9,a-w);d+=`Q${f1(P(r1*.55,a-w*1.05)[0])} ${f1(P(r1*.55,a-w*1.05)[1])} ${f1(s0x)} ${f1(s0y)}`;
  for(let i=0;i<sc;i++){const a0=a-w+2*w*i/sc,a1=a-w+2*w*(i+1)/sc,am=(a0+a1)/2,[qx,qy]=P(r1*(1.06+(r()-.5)*.06),am),[x1,y1]=P(r1*(i===sc-1?.9:.93),a1);d+=`Q${f1(qx)} ${f1(qy)} ${f1(x1)} ${f1(y1)}`}
  d+=`Q${f1(P(r1*.55,a+w*1.05)[0])} ${f1(P(r1*.55,a+w*1.05)[1])} ${f1(ex)} ${f1(ey)}Z`;return d}
// a peony rosette seen from above: three rings of ruffled petals, the cobalt pooling darker towards the heart
function tbkPeony(cx,cy,R,c,r){const rot=r()*PI,id='tbk'+(++tbkN);let o='',m='',s='',st='';
  for(let i=0;i<10;i++){const a=rot+i/10*2*PI+(r()-.5)*.12;o+=`<path d="${tbkPetal(cx,cy,a,.34,R*.3,R*(.92+r()*.1),3,r)}"/>`;
    for(const k of [-.15,-.05,.05,.15]){const a2=a+k,l0=R*(.38+r()*.08),l1=R*(.7+r()*.16);st+=`M${f1(cx+Math.cos(a2)*l0)} ${f1(cy+Math.sin(a2)*l0)}L${f1(cx+Math.cos(a2)*l1)} ${f1(cy+Math.sin(a2)*l1)}`}}
  for(let i=0;i<8;i++){const a=rot+PI/8+i/8*2*PI+(r()-.5)*.15;m+=`<path d="${tbkPetal(cx,cy,a,.42,R*.16,R*(.6+r()*.08),3,r)}"/>`}
  for(let i=0;i<5;i++){const a=rot+i/5*2*PI+.3;s+=`<path d="${tbkPetal(cx,cy,a,.66,R*.05,R*(.32+r()*.05),2,r)}"/>`}
  let dots='';for(let i=0;i<11;i++){const a=i/11*2*PI;dots+=`<circle cx="${f1(cx+Math.cos(a)*R*.13)}" cy="${f1(cy+Math.sin(a)*R*.13)}" r="${f1(R*.028+.3)}"/>`}
  const sw=f1(R*.012+.45);
  return `<defs><radialGradient id="${id}" cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R)}" gradientUnits="userSpaceOnUse"><stop offset=".15" stop-color="${c.ink2}" stop-opacity=".75"/><stop offset=".55" stop-color="${c.ink2}" stop-opacity=".32"/><stop offset="1" stop-color="${c.ink2}" stop-opacity=".08"/></radialGradient></defs>
    <g fill="url(#${id})" stroke="${c.ink}" stroke-width="${sw}" stroke-linejoin="round">${o}</g><path d="${st}" stroke="${c.ink}" stroke-width=".4" opacity=".75" fill="none"/>
    <g fill="url(#${id})" stroke="${c.ink}" stroke-width="${sw}">${m}</g><g fill="${c.ink2}" fill-opacity=".9" stroke="${c.ink}" stroke-width=".6">${s}</g><g fill="${c.wash}">${dots}</g>`}
// a chrysanthemum: many narrow petals
function tbkMum(cx,cy,R,c,r){let p='';const ring=(n,r0,r1,w,op)=>{let d='';for(let i=0;i<n;i++){const a=i/n*2*PI+r()*.1,l=r1*(.9+r()*.12),x0=cx+Math.cos(a)*r0,y0=cy+Math.sin(a)*r0,x1=cx+Math.cos(a)*l,y1=cy+Math.sin(a)*l,nx=-Math.sin(a)*w,ny=Math.cos(a)*w,mx=(x0+x1)/2,my=(y0+y1)/2;
    d+=`M${f1(x0)} ${f1(y0)}Q${f1(mx+nx)} ${f1(my+ny)} ${f1(x1)} ${f1(y1)}Q${f1(mx-nx)} ${f1(my-ny)} ${f1(x0)} ${f1(y0)}Z`}return `<path d="${d}" fill="${c.ink2}" fill-opacity="${op}" stroke="${c.ink}" stroke-width=".5"/>`};
  return ring(24,R*.25,R,R*.09,.18)+ring(18,R*.15,R*.66,R*.08,.4)+`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R*.2)}" fill="${c.ink}"/>`+`<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R*.08)}" fill="${c.wash}"/>`}
// a small spray: a stem with alternating tiny leaves
function tbkSpray(x,y,len,ang,c,r){const a=ang*PI/180,ux=Math.cos(a),uy=Math.sin(a);let o=`<path d="M${f1(x)} ${f1(y)}l${f1(ux*len)} ${f1(uy*len)}" stroke="${c.ink}" stroke-width=".7"/>`;
  for(let i=1;i<=5;i++){const t=i/6,px=x+ux*len*t,py=y+uy*len*t,s=i%2?1:-1;o+=tbkLeaf(px,py,len*.28*(1-t*.4),ang+s*42,c,r,.36)}return o+tbkLeaf(x+ux*len,y+uy*len,len*.22,ang,c,r,.36)}
// a five-petal blossom
function tbkBlossom(cx,cy,R,c,r){const rot=r()*PI;let p='';for(let i=0;i<5;i++){const a=rot+i/5*2*PI;p+=`<path d="${tbkPetal(cx,cy,a,.5,R*.12,R,2,r)}"/>`}
  return `<g fill="${c.ink2}" fill-opacity=".3" stroke="${c.ink2}" stroke-width="${f1(R*.06+.4)}">${p}</g><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R*.24)}" fill="${c.ink2}"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(R*.09)}" fill="${c.wash}"/>`}
// a lanceolate leaf in solid cobalt, the veins left as paper
function tbkLeaf(x,y,len,ang,c,r,wd=.3){const a=ang*PI/180,ux=Math.cos(a),uy=Math.sin(a),nx=-uy,ny=ux,w=len*wd*(.85+r()*.3),bend=(r()-.5)*len*.2;
  const tx=x+ux*len+nx*bend,ty=y+uy*len+ny*bend,mx=x+ux*len*.45+nx*bend*.5,my=y+uy*len*.45+ny*bend*.5;
  const d=`M${f1(x)} ${f1(y)}Q${f1(mx+nx*w)} ${f1(my+ny*w)} ${f1(tx)} ${f1(ty)}Q${f1(mx-nx*w)} ${f1(my-ny*w)} ${f1(x)} ${f1(y)}Z`;
  let v=`M${f1(x+ux*len*.08)} ${f1(y+uy*len*.08)}Q${f1(mx)} ${f1(my)} ${f1(x+(tx-x)*.9)} ${f1(y+(ty-y)*.9)}`;
  for(const t of [.3,.5,.7])for(const s of [-1,1]){const px=x+(tx-x)*t+nx*bend*.3*(1-t),py=y+(ty-y)*t+ny*bend*.3*(1-t);v+=`M${f1(px)} ${f1(py)}l${f1((ux*.5+nx*s*.8)*w*.55)} ${f1((uy*.5+ny*s*.8)*w*.55)}`}
  return `<path d="${d}" fill="${c.ink}"/><path d="${v}" stroke="${c.wash}" stroke-width="${f1(len*.018+.3)}" fill="none" stroke-linecap="round" opacity=".9"/>`}
function tbkBud(x,y,len,ang,c){const a=ang*PI/180,ux=Math.cos(a),uy=Math.sin(a),nx=-uy,ny=ux,w=len*.32,tx=x+ux*len,ty=y+uy*len,mx=x+ux*len*.55,my=y+uy*len*.55;
  return `<path d="M${f1(x)} ${f1(y)}Q${f1(mx+nx*w*1.6)} ${f1(my+ny*w*1.6)} ${f1(tx)} ${f1(ty)}Q${f1(mx-nx*w*1.6)} ${f1(my-ny*w*1.6)} ${f1(x)} ${f1(y)}Z" fill="${c.ink2}" fill-opacity=".3" stroke="${c.ink2}" stroke-width=".9"/>
    <path d="M${f1(x)} ${f1(y)}Q${f1(x+ux*len*.4+nx*w*1.3)} ${f1(y+uy*len*.4+ny*w*1.3)} ${f1(x+ux*len*.5+nx*w*.3)} ${f1(y+uy*len*.5+ny*w*.3)}M${f1(x)} ${f1(y)}Q${f1(x+ux*len*.4-nx*w*1.3)} ${f1(y+uy*len*.4-ny*w*1.3)} ${f1(x+ux*len*.5-nx*w*.3)} ${f1(y+uy*len*.5-ny*w*.3)}" fill="${c.ink}" stroke="${c.ink}" stroke-width=".8"/>`}
const tbkDots=(x,y,s,c)=>`<g fill="${c.ink}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s)}"/><circle cx="${f1(x+s*2.6)}" cy="${f1(y-s*1.4)}" r="${f1(s*.8)}"/><circle cx="${f1(x+s*.8)}" cy="${f1(y+s*2.6)}" r="${f1(s*.7)}"/></g>`;
const tbkTendril=(x,y,s,dir,c)=>`<path d="M${f1(x)} ${f1(y)}c${f1(dir*s)} ${f1(-s*.6)} ${f1(dir*s*1.6)} ${f1(s*.4)} ${f1(dir*s*.9)} ${f1(s*.9)}c${f1(-dir*s*.4)} ${f1(s*.3)} ${f1(-dir*s*.7)} ${f1(-s*.2)} ${f1(-dir*s*.35)} ${f1(-s*.45)}" stroke="${c.ink}" stroke-width=".8" fill="none" stroke-linecap="round"/>`;

/* the corner spray (200 x 200, the card's corner at 0,0); its vines run off along the top (y 20) and the side (x 20) */
function tbkCorner(c,seed){const r=rng(seed);
  const vines=`<path d="M20 200C20 165 22 128 46 96M200 20C165 20 128 22 96 46M46 96C62 74 74 62 96 46" stroke="${c.ink}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M66 82C96 96 114 112 134 128M82 66C96 96 112 114 128 134M100 46C126 40 146 46 160 58M46 100C40 126 46 146 58 160" stroke="${c.ink}" stroke-width="1" fill="none" stroke-linecap="round"/>`;
  const L=[[104,70,36,16],[70,104,36,74],[124,44,28,-12],[44,124,28,102],[156,24,24,-6],[24,156,24,96],[116,116,26,45],[92,28,22,-62],[28,92,22,152],[140,128,18,12],[128,140,18,78],[184,16,18,6],[16,184,18,84],
    [100,100,20,30],[78,118,22,95],[118,78,22,-5],[150,60,20,40],[60,150,20,50],[170,40,16,-30],[40,170,16,120]];
  return `<svg ${NS} viewBox="0 0 200 200">${vines}
    ${L.map(([x,y,l,a])=>tbkLeaf(x,y,l,a,c,r)).join('')}
    ${tbkSpray(150,62,30,30,c,r)}${tbkSpray(62,150,30,60,c,r)}
    ${tbkBud(136,126,17,32,c)}${tbkBud(126,136,17,58,c)}${tbkBud(180,24,14,-28,c)}${tbkBud(24,180,14,118,c)}
    ${tbkMum(140,34,19,c,r)}${tbkBlossom(34,140,15,c,r)}${tbkBlossom(108,98,8,c,r)}${tbkBlossom(166,88,7,c,r)}${tbkBlossom(88,166,7,c,r)}
    ${tbkPeony(58,58,44,c,r)}
    ${tbkTendril(164,36,8,1,c)}${tbkTendril(36,166,8,-1,c)}${tbkDots(104,14,1.5,c)}${tbkDots(14,104,1.5,c)}${tbkDots(150,76,1.4,c)}${tbkDots(76,150,1.4,c)}${tbkDots(178,56,1.2,c)}${tbkDots(56,178,1.2,c)}</svg>`}
/* the side strip tile (40 x 120): a vine along x 20 with leaves, a blossom and seed dots; repeats down the card */
function tbkStrip(c,seed,horiz){const r=rng(seed);
  const g=`<path d="M20 0C27 15 27 45 20 60C13 75 13 105 20 120" stroke="${c.ink}" stroke-width="1.3" fill="none"/>
    ${tbkLeaf(24,14,16,-30,c,r,.34)}${tbkLeaf(16,42,16,210,c,r,.34)}${tbkLeaf(24,78,16,-30,c,r,.34)}${tbkLeaf(16,104,16,210,c,r,.34)}
    ${tbkLeaf(18,64,12,160,c,r,.34)}${tbkLeaf(22,120,12,-20,c,r,.34)}${tbkBud(22,28,9,-60,c)}${tbkBud(18,92,9,240,c)}
    ${tbkBlossom(20,60,7.5,c,r)}${tbkDots(31,96,1.1,c)}${tbkDots(7,26,1.1,c)}${tbkDots(31,46,.9,c)}${tbkDots(7,84,.9,c)}`;
  return horiz?`<svg ${NS} viewBox="0 0 120 40"><g transform="rotate(-90 20 20)translate(-80 0)">${g}</g></svg>`:`<svg ${NS} viewBox="0 0 40 120">${g}</svg>`}
// the four corners and four strips, as CSS custom properties (each one an svg url)
const tbkVars=c=>{const cn=K.uri(tbkCorner(c,5)),v=K.uri(tbkStrip(c,8,0)),h=K.uri(tbkStrip(c,8,1));return `--tbk-cn:${cn};--tbk-v:${v};--tbk-h:${h}`};
const tbkFrame=()=>`<i class="tbk-st l"></i><i class="tbk-st r"></i><i class="tbk-st t"></i><i class="tbk-st b"></i><i class="tbk-c tl"></i><i class="tbk-c tr"></i><i class="tbk-c bl"></i><i class="tbk-c br"></i>`;
const tbkNames=(o,cls='')=>{const [n1,n2]=coverNames(o);return `<h1 class="tbk-names ${cls}"><span>${esc(n1)}</span><i>${o.lang==='en'?'and':'dan'}</i><span>${esc(n2)}</span></h1>`};
const tbkDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
// a ruyi cloud for dividers
const TBK_RUYI=c=>`<svg ${NS} viewBox="0 0 120 16"><path d="M2 8H44M76 8H118" stroke="${c.ink}" stroke-width=".8"/><path d="M60 3c-3-3-8 0-6 4c-4-1-6 4-2 5.5c2 .8 4 0 5-1.5c1 1.5 3 2.3 5 1.5c4-1.5 2-6.5-2-5.5c2-4-3-7-6-4z" fill="none" stroke="${c.ink}" stroke-width="1"/><circle cx="60" cy="8.4" r="1.3" fill="${c.ink}"/><circle cx="48" cy="8" r="1.2" fill="${c.ink}"/><circle cx="72" cy="8" r="1.2" fill="${c.ink}"/></svg>`;

FAMILY({key:'tembikar',name:'Biru Putih',meaning:'Blue-and-white porcelain',
  blurb:'An ivory card hand-painted like blue-and-white porcelain, a cobalt border of peonies, leaves and curling vines around navy script names, with an old Ming dish lying beside it. The card and the dish slide apart to open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const c=th.c,en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-tembikar ${c.dark?'tbk-dk':''}" style="${tbkVars(c)};--tbk-dish:${c.dish||'none'}"><div class="tbk-card">${tbkFrame()}
      <div class="tbk-body">
        <div class="tbk-crest reveal"><i class="tbk-dish"></i><span class="tbk-well"></span></div>
        ${o.bismillah?`<p class="tbk-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="tbk-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${tbkNames(o)}</div>
        <i class="tbk-ruyi reveal d1" style="background-image:${K.uri(TBK_RUYI(c))}"></i>
        <p class="tbk-date reveal d2">${esc(tbkDay(o))}${tbkDay(o)?'<br>':''}${esc(fmtDate(o.date,o.lang,false))}</p>
        ${o.hijri?`<p class="tbk-hj reveal d2">${esc(o.hijri)}</p>`:''}
        ${t?`<p class="tbk-time reveal d2">${esc(t)}</p>`:''}
        ${o.venue?`<a href="#" class="tbk-ven reveal d2" data-go="loc">${esc(o.venue)}</a>`:''}
        <div class="tbk-pills reveal d3"><a class="tbk-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="tbk-pill ghost" data-go="rsvp" href="#">${en?'RSVP':'Sahkan Kehadiran'}</a>`:''}</div>
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-tembikar ${c.dark?'tbk-dk':''}" style="${tbkVars(c)};--tbk-dish:${c.dish||'none'}"><i class="tbk-dish tbk-plate"></i>
      <div class="tbk-card">${tbkFrame()}
        <div class="tbk-cbody"><p class="tbk-k">${ev(o,L)}</p>${tbkNames(o,'cv')}<i class="tbk-ruyi" style="background-image:${K.uri(TBK_RUYI(c))}"></i>
          <p class="tbk-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${o.venue?`<p class="tbk-cven">${esc(o.venue)}</p>`:''}
          ${guest?`<p class="tbk-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
          <${tag} class="tbk-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
      </div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('tbk-dk',!!th.c.dark);
    const c=th.c,sp=K.uri(`<svg ${NS} viewBox="0 0 200 200"><g transform="scale(1)">${tbkCorner(c,12).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</g></svg>`);
    el.style.setProperty('--tbk-sp',sp);el.style.setProperty('--tbk-ruyi',K.uri(TBK_RUYI(c)));
    const pg=$('.pg-tembikar',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const w=$('.tbk-well',pg);img.removeAttribute('style');w.appendChild(img);w.classList.add('on');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'biru',n:'Biru Kobalt',desc:'Cobalt on ivory, porcelain-blue linen',c:{ground:'#d9e0ea',sheet:'#fcfaf3',ink:'#1b3a87',ink2:'#21459b',wash:'#fcfaf3',accent:'#1a2f6b',gold:'#1b3a87',pagefg:'#1a2a4a',dish:'none'}},
    {k:'nila',n:'Nila',desc:'Ivory card on deep navy linen',c:{ground:'#17244a',sheet:'#fbf9f2',ink:'#1d3d8c',ink2:'#2449a0',wash:'#fbf9f2',accent:'#16285e',gold:'#1d3d8c',pagefg:'#e7ebf4',dish:'none'}},
    {k:'delft',n:'Delft',desc:'Soft delft blue on white, pale grey ground',c:{ground:'#e7e9ec',sheet:'#ffffff',ink:'#3a62a8',ink2:'#4570b4',wash:'#ffffff',accent:'#28467e',gold:'#3a62a8',pagefg:'#28344a',dish:'saturate(.8) brightness(1.05)'}},
    {k:'tinta',n:'Tinta',desc:'Ultramarine brushwork, cobalt ground',c:{ground:'#22379a',sheet:'#fbfaf5',ink:'#22309a',ink2:'#2b3aa8',wash:'#fbfaf5',accent:'#1b2780',gold:'#22309a',pagefg:'#eef0fb',dish:'hue-rotate(8deg) saturate(1.3)'}},
    {k:'kabus',n:'Kabus',desc:'Misty grey-blue on cream',c:{ground:'#dcdcd6',sheet:'#fbf8ef',ink:'#4a6890',ink2:'#557499',wash:'#fbf8ef',accent:'#33496a',gold:'#4a6890',pagefg:'#2e3a4a',dish:'saturate(.6)'}},
    {k:'malam',n:'Malam',desc:'A navy card painted in porcelain white',c:{ground:'#0e1530',sheet:'#17244f',ink:'#dfe6f4',ink2:'#c9d6ee',wash:'#17244f',accent:'#eef2fa',gold:'#b9c8e6',pagefg:'#e8ecf6',dark:1,dish:'none'}},
    {k:'hijau',n:'Hijau Seladon',desc:'Celadon green brushwork on ivory',c:{ground:'#dfe5dc',sheet:'#fbfaf3',ink:'#2d6650',ink2:'#357259',wash:'#fbfaf3',accent:'#22503e',gold:'#2d6650',pagefg:'#22332b',dish:'hue-rotate(-95deg) saturate(.8)'}},
    {k:'jambu',n:'Merah Jambu',desc:'Rose-pink brushwork on ivory, blush ground',c:{ground:'#f0dcdc',sheet:'#fdf9f5',ink:'#b04a6c',ink2:'#bb5576',wash:'#fdf9f5',accent:'#8e3352',gold:'#b04a6c',pagefg:'#4a2532',dish:'hue-rotate(95deg) saturate(.9)'}},
  ]});
