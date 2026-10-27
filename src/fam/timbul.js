/* timbul: a thick cotton card, blind-embossed white on white: a raised floral border heavy at two corners and an oval cameo,
   lit from the upper left so the relief shows only as light and shadow. Names letterpressed in one ink colour.
   Cover: tap "Buka Jemputan"; the card tilts in the light (a sheen runs across it) and lifts towards you.
   Page: the same card, larger, with a small cameo for the monogram (or the couple's photo). Skin: cotton cards with a blind-embossed rule. */
// ---- relief drawing: a greyscale height map (white = high, black = groove), turned into light and shade by a lighting filter
const tbF=n=>n.toFixed(1);
const tbLeaf=(x,y,a,l,w)=>`<g transform="translate(${tbF(x)} ${tbF(y)}) rotate(${tbF(a)})"><path d="M0 0C${tbF(l*.3)} ${tbF(-w)} ${tbF(l*.72)} ${tbF(-w*.8)} ${tbF(l)} 0C${tbF(l*.72)} ${tbF(w*.8)} ${tbF(l*.3)} ${tbF(w)} 0 0Z" fill="#e8e8e8"/>
  <path d="M${tbF(l*.1)} 0L${tbF(l*.86)} 0" stroke="#111" stroke-width=".6"/>${[.3,.5,.68].map(t=>`<path d="M${tbF(l*t)} 0l${tbF(l*.12)} ${tbF(-w*.55)}M${tbF(l*t)} 0l${tbF(l*.12)} ${tbF(w*.55)}" stroke="#555" stroke-width=".35"/>`).join('')}</g>`;
// a garden rose: two rings of overlapping petals, each outlined by a groove, a tight centre
const tbRose=(x,y,r,rot=0)=>{let s='';const ring=(n,d,pr,fill,off)=>{for(let i=0;i<n;i++){const a=rot+off+i/n*Math.PI*2;s+=`<circle cx="${tbF(x+Math.cos(a)*d)}" cy="${tbF(y+Math.sin(a)*d)}" r="${tbF(pr)}" fill="${fill}" stroke="#222" stroke-width=".7"/>`}};
  ring(6,r*.52,r*.5,'#c8c8c8',0);ring(5,r*.3,r*.34,'#e6e6e6',.4);
  s+=`<circle cx="${tbF(x)}" cy="${tbF(y)}" r="${tbF(r*.24)}" fill="#fff" stroke="#222" stroke-width=".6"/><path d="M${tbF(x-r*.12)} ${tbF(y)}a${tbF(r*.12)} ${tbF(r*.12)} 0 1 1 ${tbF(r*.12)} ${tbF(r*.1)}" fill="none" stroke="#222" stroke-width=".5"/>`;return s};
// a five-petal blossom
const tbBloom=(x,y,r,rot=0)=>{let s='';for(let i=0;i<5;i++){const a=rot+i/5*360;s+=`<ellipse cx="${tbF(x)}" cy="${tbF(y-r*.52)}" rx="${tbF(r*.34)}" ry="${tbF(r*.52)}" transform="rotate(${tbF(a)} ${tbF(x)} ${tbF(y)})" fill="#ececec" stroke="#222" stroke-width=".55"/>`}
  return s+`<circle cx="${tbF(x)}" cy="${tbF(y)}" r="${tbF(r*.2)}" fill="#fff"/>`};
const tbBud=(x,y,a,l)=>`<g transform="translate(${tbF(x)} ${tbF(y)}) rotate(${tbF(a)})"><path d="M0 0L${tbF(l*.5)} 0" stroke="#fff" stroke-width="1"/><path d="M${tbF(l*.45)} 0C${tbF(l*.6)} ${tbF(-l*.22)} ${tbF(l)} ${tbF(-l*.16)} ${tbF(l)} 0C${tbF(l)} ${tbF(l*.16)} ${tbF(l*.6)} ${tbF(l*.22)} ${tbF(l*.45)} 0Z" fill="#e0e0e0" stroke="#222" stroke-width=".45"/></g>`;
// the heavy corner garland; local origin is the inside corner, x runs along the top edge, y down the side
function tbCorner(seed){const R=rng(seed);let s='';
  s+=`<path d="M12 30C56 14 110 28 176 12" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M30 12C14 56 28 110 12 176" fill="none" stroke="#fff" stroke-width="1.8"/>
    <path d="M58 30C82 46 96 44 112 58" fill="none" stroke="#fff" stroke-width="1.2"/><path d="M30 58C46 82 44 96 58 112" fill="none" stroke="#fff" stroke-width="1.2"/>`;
  [[62,20,-30],[78,26,28],[104,22,-24],[128,22,24],[152,16,-18],[166,14,22]].forEach(([x,y,a],i)=>{s+=tbLeaf(x,y,a,15-i*1.4,5.2-i*.5)});
  [[20,62,120],[26,78,62],[22,104,114],[22,128,66],[16,152,108],[14,166,68]].forEach(([x,y,a],i)=>{s+=tbLeaf(x,y,a,15-i*1.4,5.2-i*.5)});
  s+=tbLeaf(64,52,35,17,6)+tbLeaf(52,64,55,17,6)+tbLeaf(98,50,40,12,4.2)+tbLeaf(50,98,50,12,4.2)+tbLeaf(112,60,20,10,3.6)+tbLeaf(60,112,70,10,3.6);
  s+=tbBloom(70,44,7,15)+tbBloom(44,70,7,40);
  s+=tbRose(36,36,24,.3)+tbRose(92,30,12,1.1)+tbRose(30,92,12,2.2)+tbBloom(116,40,6,0)+tbBloom(40,116,6,20)+tbBloom(140,30,4.5,10)+tbBloom(30,140,4.5,30);
  s+=tbBud(170,13,-10,11)+tbBud(13,170,100,11)+tbBud(120,58,30,9)+tbBud(58,120,60,9);
  for(let i=0;i<10;i++){const x=70+R()*80,y=34+R()*12;s+=i%2?`<circle cx="${tbF(y)}" cy="${tbF(x)}" r="1.5" fill="#fff"/>`:`<circle cx="${tbF(x)}" cy="${tbF(y)}" r="1.5" fill="#fff"/>`}
  return s}
// the light corner: a single leafy twig
const tbTwig=()=>`<path d="M8 8C26 22 40 30 62 34" fill="none" stroke="#fff" stroke-width="1.2"/>${tbLeaf(22,18,-40,11,4)+tbLeaf(32,26,60,11,4)+tbLeaf(44,30,-20,10,3.6)+tbLeaf(52,34,50,9,3.2)}${tbBloom(64,35,4.6,8)}`;
// oval cameo: a raised plateau, a rolled rim, a ring of beads, a small rose crest above and crossed sprigs below
function tbCameo(cx,cy,rx,ry,crest=true){let s=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#585858"/><ellipse cx="${cx}" cy="${cy}" rx="${rx+3}" ry="${ry+3}" fill="none" stroke="#fff" stroke-width="2.6"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx-4}" ry="${ry-4}" fill="none" stroke="#9a9a9a" stroke-width=".6"/>`;
  const n=Math.round(Math.PI*(rx+ry)/4.6);for(let i=0;i<n;i++){const a=i/n*Math.PI*2;s+=`<circle cx="${tbF(cx+Math.cos(a)*(rx+8.5))}" cy="${tbF(cy+Math.sin(a)*(ry+8.5))}" r="1.25" fill="#fff"/>`}
  s+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx+13}" ry="${ry+13}" fill="none" stroke="#bdbdbd" stroke-width=".6"/>`;
  if(crest){const y=cy-ry-13;s+=tbLeaf(cx-6,y+1,200,15,5)+tbLeaf(cx+6,y+1,-20,15,5)+tbLeaf(cx-14,y+5,170,11,3.8)+tbLeaf(cx+14,y+5,10,11,3.8)+tbBloom(cx,y,8,0)}
  const yb=cy+ry+13;s+=`<path d="M${cx-46} ${yb-14}Q${cx-20} ${yb+6} ${cx+4} ${yb+2}M${cx+46} ${yb-14}Q${cx+20} ${yb+6} ${cx-4} ${yb+2}" fill="none" stroke="#fff" stroke-width="1.2"/>`;
  [[-40,-9,150],[-30,-3,165],[-20,1,175],[40,-9,30],[30,-3,15],[20,1,5]].forEach(([dx,dy,a],i)=>{s+=tbLeaf(cx+dx,yb+dy,a+(i%2?28:-28),10,3.6)});
  s+=tbBloom(cx,yb+2,5.5,18);return s}
function tbRelief(W,H,cam,uid,c,k=1){const m=13;
  const sh=c.shade.replace('#','').match(/../g).map(h=>parseInt(h,16)/255);
  const art=`<rect x="${m}" y="${m}" width="${W-2*m}" height="${H-2*m}" fill="none" stroke="#d0d0d0" stroke-width="1"/><rect x="${m+4.5}" y="${m+4.5}" width="${W-2*m-9}" height="${H-2*m-9}" fill="none" stroke="#7a7a7a" stroke-width=".5"/>
    <g transform="translate(${m+4} ${m+4}) scale(${k})">${tbCorner(uid*3+1)}</g><g transform="translate(${W-m-4} ${H-m-4}) rotate(180) scale(${k})">${tbCorner(uid*3+2)}</g>
    <g transform="translate(${W-m-4} ${m+4}) rotate(90)">${tbTwig()}</g><g transform="translate(${m+4} ${H-m-4}) rotate(-90)">${tbTwig()}</g>
    ${tbCameo(cam[0],cam[1],cam[2],cam[3],cam[4]!==false)}`;
  return `<svg class="tb-relief" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" ${NS}><defs>
    <filter id="tbe${uid}" x="0" y="0" width="${W}" height="${H}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feColorMatrix in="SourceGraphic" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="h"/>
      <feGaussianBlur in="h" stdDeviation="1.25" result="hb"/>
      <feDiffuseLighting in="hb" surfaceScale="2.6" diffuseConstant="1" lighting-color="#fff" result="d"><feDistantLight azimuth="225" elevation="30"/></feDiffuseLighting>
      <feColorMatrix in="d" result="sh" values="0 0 0 0 ${sh[0].toFixed(3)}  0 0 0 0 ${sh[1].toFixed(3)}  0 0 0 0 ${sh[2].toFixed(3)}  -1.0 0 0 0 .5"/>
      <feColorMatrix in="d" result="hi" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.5 0 0 0 -.75"/>
      <feMerge><feMergeNode in="sh"/><feMergeNode in="hi"/></feMerge></filter></defs>
    <g filter="url(#tbe${uid})">${art}</g></svg>`}
// a small embossed sprig for section headings (used as a background image)
function tbSprig(c){const sh=c.shade.replace('#','').match(/../g).map(h=>parseInt(h,16)/255);
  const art=`<path d="M8 15C40 9 80 9 112 15" fill="none" stroke="#fff" stroke-width="1.1"/>${tbLeaf(30,12,-160,10,3.4)+tbLeaf(38,13,160,10,3.4)+tbLeaf(90,12,-20,10,3.4)+tbLeaf(82,13,20,10,3.4)+tbBloom(60,11.5,6.5,0)+tbBud(18,14,195,8)+tbBud(102,14,-15,8)}`;
  return `<svg viewBox="0 0 120 26" width="120" height="26" ${NS}><defs><filter id="s" x="0" y="0" width="120" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feColorMatrix in="SourceGraphic" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"/><feGaussianBlur stdDeviation=".8"/><feDiffuseLighting surfaceScale="2.3" lighting-color="#fff" result="d"><feDistantLight azimuth="225" elevation="30"/></feDiffuseLighting>
    <feColorMatrix in="d" result="a" values="0 0 0 0 ${sh[0].toFixed(3)}  0 0 0 0 ${sh[1].toFixed(3)}  0 0 0 0 ${sh[2].toFixed(3)}  -1.0 0 0 0 .5"/><feColorMatrix in="d" result="b" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.5 0 0 0 -.75"/>
    <feMerge><feMergeNode in="a"/><feMergeNode in="b"/></feMerge></filter></defs><g filter="url(#s)">${art}</g></svg>`}
let tbN=0;
const tbMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="tb-jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `${esc(a)}<i>&amp;</i>${esc(b)}`};
FAMILY({key:'timbul',name:'Timbul',meaning:'Blind embossed',
  blurb:'A thick cotton card blind-embossed white on white: a raised floral border and an oval cameo that show only in the light, the names letterpressed in one ink. The card tilts in the light and lifts.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',u=++tbN;
    return `<section class="page pg-timbul" style="--shade:${th.c.shade}"><div class="tb-ground"></div>
      <div class="tb-pwrap reveal"><div class="tb-card tb-pcard">${tbRelief(300,470,[150,104,46,56],u,th.c,.86)}
        <div class="tb-mono"><span>${tbMono(o)}</span></div>
        <div class="tb-ptxt">${o.bismillah?'<p class="tb-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="tb-k kicker">${ev(o,L)}</p>
          <h1 class="tb-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
          <p class="tb-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="tb-hj">${esc(o.hijri)}</p>`:''}
          ${o.venue?`<p class="tb-ven">${esc(o.venue)}</p>`:''}</div></div></div>
      <a class="tb-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',u=++tbN;
    return `<div class="cover cv-timbul" style="--shade:${th.c.shade}"><div class="tb-ground"></div>
      <div class="tb-stage"><div class="tb-card">${tbRelief(300,420,[150,196,84,112],u,th.c)}<i class="tb-sheen"></i>
        <div class="tb-ctxt"><p class="tb-k">${ev(o,L)}</p><p class="tb-cn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
          <p class="tb-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${o.venue?`<p class="tb-cv">${esc(o.venue)}</p>`:''}</div></div></div>
      <div class="tb-foot">${guest?`<p class="tb-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="tb-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--tbsprig',K.uri(tbSprig(th.c)));el.style.setProperty('--shade',th.c.shade);
    // with a couple photo, the photo sits in the cameo instead of the monogram
    const pg=$('.pg-timbul',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const mono=$('.tb-mono',pg);img.removeAttribute('style');img.className='tb-photo';mono.classList.add('has-photo');mono.replaceChildren(img);ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'putih',n:'Putih',desc:'White cotton, black ink',c:{ground:'#e4e2dd',sheet:'#fbfaf7',ink:'#3a3a3c',accent:'#2b2b2f',gold:'#9c9a96',pagefg:'#2b2b2f',shade:'#3c3a38'}},
    {k:'sage',n:'Sage',desc:'Ivory cotton, sage ink',c:{ground:'#e3dfd3',sheet:'#fbf8ef',ink:'#3d4238',accent:'#55654c',gold:'#a3a68f',pagefg:'#3d4238',shade:'#45402f'}},
    {k:'marun',n:'Marun',desc:'Cream cotton, burgundy ink',c:{ground:'#e4d9c7',sheet:'#f9f2e5',ink:'#442a2c',accent:'#6e2433',gold:'#b5a089',pagefg:'#442a2c',shade:'#4d3a28'}},
    {k:'nila',n:'Nila',desc:'Pale grey cotton, navy ink',c:{ground:'#d6d8d9',sheet:'#efefed',ink:'#2b3242',accent:'#23304f',gold:'#9aa0ab',pagefg:'#23304f',shade:'#2e3540'}},
    {k:'jambu',n:'Jambu',desc:'Blush cotton, rose ink',c:{ground:'#e6d3cc',sheet:'#f8ebe5',ink:'#4a3034',accent:'#984b5a',gold:'#c4a29c',pagefg:'#4a3034',shade:'#5a3a36'}},
    {k:'zaitun',n:'Zaitun',desc:'Stone cotton, olive ink',c:{ground:'#d9d3c6',sheet:'#efeadf',ink:'#3b3a2a',accent:'#58582c',gold:'#aaa58a',pagefg:'#3b3a2a',shade:'#454030'}},
    {k:'biru',n:'Biru',desc:'Dusty blue paper, navy ink',c:{ground:'#a9b8c6',sheet:'#c9d5df',ink:'#1f2c3d',accent:'#1d2f4c',gold:'#7f93a8',pagefg:'#1d2f4c',shade:'#24344a'}},
    {k:'lumut',n:'Lumut',desc:'Sage paper, forest ink',c:{ground:'#a9b39d',sheet:'#cad1bf',ink:'#26301f',accent:'#28361f',gold:'#8a967c',pagefg:'#26301f',shade:'#2b3524'}},
  ]});
