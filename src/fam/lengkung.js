/* lengkung (Lengkung Bunga): a vintage engraved arch, drawn in fine line (beaded and hatched mouldings, a shell crest,
   C-scrolls, volutes and acanthus feet), standing on aged cream paper and wreathed with Redouté flowers.
   Dark colourways stand the paper arch in front of a Dutch flower painting instead (public domain, see CREDITS).
   Cover: tap "Buka Jemputan"; the arch parts down the middle, the two halves slide away and the view steps through.
   Page: the arch again with the names in rouge script. Skin: arch-topped paper cards with an inner engraved line. */
needFont('Alex+Brush');
const LG_L=14,LG_R=286,LG_S=150,LG_B=446,LG_RR=136;
const lgF=v=>v.toFixed(1);
// the arch outline at an inset of k units
const lgArch=k=>`M${LG_L+k} ${LG_B-k}V${LG_S}A${LG_RR-k} ${LG_RR-k} 0 0 1 ${LG_R-k} ${LG_S}V${LG_B-k}`;
// an inward spiral, for volutes and the ends of C-scrolls
const lgSpiral=(cx,cy,r,turns,a0,dir)=>{let d='';const N=Math.round(turns*28);
  for(let i=0;i<=N;i++){const t=i/N,a=a0+dir*t*turns*Math.PI*2,rr=r*(1-t*.82);d+=(i?'L':'M')+lgF(cx+Math.cos(a)*rr)+' '+lgF(cy+Math.sin(a)*rr)}return d};
// a small engraved leaf: outline and midrib
const lgLeaf=(x,y,ang,len,w)=>`<path transform="translate(${lgF(x)} ${lgF(y)}) rotate(${ang})" d="M0 0Q${lgF(len*.45)} ${lgF(-w)} ${lgF(len)} 0Q${lgF(len*.45)} ${lgF(w)} 0 0ZM${lgF(len*.08)} 0L${lgF(len*.8)} 0"/>`;
// one side of the ornament (mirrored for the other)
function lgSide(){let s='';
  // C-scroll along the top of the arch, from the crest out to a curl over the shoulder
  s+=`<path d="M136 6C112 -6 84 -2 64 14C50 25 44 38 47 50"/>`+`<path d="${lgSpiral(55,49,8,1.15,Math.PI,-1)}"/>`;
  s+=`<path d="M138 12C118 4 96 6 78 18" stroke-width=".45"/>`;
  [[118,-2,-160,11,3.2],[100,-3,-150,12,3.4],[84,2,-135,11,3.2],[70,10,-120,10,3],[124,1,25,9,2.6],[106,0,30,10,2.8],[89,5,40,9,2.6]].forEach(a=>s+=lgLeaf(...a));
  // little buds on stems above the scroll
  s+=`<path d="M96 -4C92 -14 86 -18 80 -18M80 -18m-2.4 0a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0 -4.8 0" stroke-width=".55"/>`;
  s+=`<path d="M112 -6C112 -16 108 -22 104 -25M104 -25m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" stroke-width=".55"/>`;
  // volute at the springing of the arch
  s+=`<path d="M${LG_L} 214C2 204 -4 186 0 170C3 158 10 150 6 140"/>`+`<path d="${lgSpiral(0,136,7,1.2,0,-1)}"/>`;
  [[3,186,-200,12,3.2],[0,168,-215,11,3],[8,200,-160,10,2.8]].forEach(a=>s+=lgLeaf(...a));
  // a hanging bell-flower drop under the volute
  s+=`<path d="M6 214V236" stroke-width=".45"/><path d="M6 236m-2.6 0a2.6 3.4 0 1 0 5.2 0a2.6 3.4 0 1 0 -5.2 0M6 244m-1.8 0a1.8 2.4 0 1 0 3.6 0a1.8 2.4 0 1 0 -3.6 0M6 250m-1.2 0a1.2 1.6 0 1 0 2.4 0a1.2 1.6 0 1 0 -2.4 0" stroke-width=".5"/>`;
  // acanthus foot curling out at the base
  s+=`<path d="M${LG_L} 400C0 408 -8 424 -4 436C-1 444 8 446 12 440"/>`+`<path d="${lgSpiral(5,436,6,1.1,Math.PI*.9,1)}"/>`;
  [[-4,420,-120,12,3.4],[-2,408,-80,10,3],[6,446,10,10,2.6]].forEach(a=>s+=lgLeaf(...a));
  // a swag of beads hanging inside the arch top
  let sw='';for(let i=0;i<=14;i++){const t=i/14,x=90+t*60,y=76+Math.sin(t*Math.PI)*10*(1-t*.2)+t*6;sw+=`<circle cx="${lgF(x)}" cy="${lgF(y)}" r="${(1.25-Math.abs(t-.5)*.6).toFixed(2)}"/>`}
  s+=`<g fill="currentColor" stroke="none" opacity=".85">${sw}</g>`;
  return s}
function lgFrame(){const side=lgSide();
  // the shell crest: ribs fanned out, a scalloped rim, and a small rosette
  let ribs='',rim='';const n=13;for(let i=0;i<n;i++){const a=Math.PI*(1.12+i/(n-1)*.76),x=150+Math.cos(a)*30,y=24+Math.sin(a)*30;ribs+=`M150 24L${lgF(x)} ${lgF(y)}`;
    if(i){const ap=Math.PI*(1.12+(i-1)/(n-1)*.76),am=(a+ap)/2;rim+=`Q${lgF(150+Math.cos(am)*35)} ${lgF(24+Math.sin(am)*35)} ${lgF(x)} ${lgF(y)}`}else rim+=`M${lgF(x)} ${lgF(y)}`}
  return `<svg class="lg-frame" viewBox="-24 -44 348 506" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
    <path d="${lgArch(0)}" stroke-width="1.5"/><path d="${lgArch(4)}" stroke-width=".55"/>
    <path d="${lgArch(8.5)}" stroke-width="1.9" stroke-dasharray="0 4.6"/>
    <path d="${lgArch(12.5)}" stroke-width=".55"/><path d="${lgArch(16.5)}" stroke-width="5" stroke-dasharray=".32 2.3" opacity=".5"/>
    <path d="${lgArch(20.5)}" stroke-width="1.1"/><path d="${lgArch(25)}" stroke-width=".45"/>
    <path d="M-2 ${LG_B}H302M-6 ${LG_B+5}H306M-8 ${LG_B+11}H308" stroke-width=".9"/><path d="M-6 ${LG_B+8}H306" stroke-width="3" stroke-dasharray=".35 1.6" opacity=".7"/>
    ${side}<g transform="translate(300 0) scale(-1 1)">${side}</g>
    <path d="${ribs}" stroke-width=".55"/><path d="${rim}" stroke-width=".9"/><path d="M128 26Q150 34 172 26" stroke-width=".9"/>
    <circle cx="150" cy="24" r="3.4" stroke-width=".7"/><circle cx="150" cy="24" r="1.2" fill="currentColor"/>
    <path d="M150 34V44M146 40L150 46L154 40" stroke-width=".6"/></svg>`}
// the arch's paper panel is clipped to the outline at inset 0
const LG_MASK=K.uri(`<svg ${NS} viewBox="-24 -44 348 506" preserveAspectRatio="none"><path d="${lgArch(0)}Z" fill="#000"/></svg>`);
const LG_FRAME=lgFrame();
const lgPanel=()=>`<div class="lg-panel" style="-webkit-mask:${LG_MASK} center/100% 100% no-repeat;mask:${LG_MASK} center/100% 100% no-repeat"></div>${LG_FRAME}`;
const lgFl=(n,style,cls='')=>n?`<img class="lg-fl ${cls}" src="${A}flower-${n}.webp" alt="" style="${style}">`:'';
// flowers wreathing the arch on the light colourways (over light paper only)
const lgWreath=(c,page)=>c.dark?'':page
  ?lgFl(c.fl2,'width:28%;left:-13%;top:30%;transform:rotate(-24deg) scaleX(-1)','l')+lgFl(c.fl1,'width:36%;left:-17%;bottom:-3%;transform:rotate(-6deg)','l')+lgFl(c.fl3,'width:27%;right:-10%;top:19%;transform:rotate(10deg)','r')+lgFl(c.fl1,'width:34%;right:-16%;bottom:-2%;transform:rotate(8deg) scaleX(-1)','r')
  :lgFl(c.fl2,'width:30%;left:-6%;bottom:6%;transform:rotate(-30deg);z-index:1','l')+lgFl(c.fl2,'width:28%;right:-5%;bottom:8%;transform:rotate(34deg) scaleX(-1);z-index:1','r')+lgFl(c.fl2,'width:28%;left:-13%;top:30%;transform:rotate(-24deg) scaleX(-1)','l')+lgFl(c.fl1,'width:36%;left:-17%;bottom:-3%;transform:rotate(-6deg)','l')+lgFl(c.fl3,'width:27%;right:-10%;top:19%;transform:rotate(10deg)','r')+lgFl(c.fl1,'width:34%;right:-16%;bottom:-2%;transform:rotate(8deg) scaleX(-1)','r');
const lgText=(o,L,page)=>{const [n1,n2]=coverNames(o);return `<p class="lg-k${page?' kicker':''}">${ev(o,L)}</p>${page&&o.bismillah?'<p class="lg-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
  <${page?'h1':'p'} class="lg-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${page?'h1':'p'}>
  <svg class="lg-rule" viewBox="0 0 120 12" fill="none" stroke="currentColor"><path d="M8 6H46M74 6H112" stroke-width=".6"/><path d="M60 1.5C56 1.5 54 6 50 6C54 6 56 10.5 60 10.5C64 10.5 66 6 70 6C66 6 64 1.5 60 1.5Z" stroke-width=".7"/><circle cx="60" cy="6" r="1.2" fill="currentColor"/></svg>
  <p class="lg-date">${esc(fmtDate(o.date,o.lang))}</p>${page&&o.hijri?`<p class="lg-hj">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="lg-ven">${esc(o.venue)}</p>`:''}`};
const lgVars=c=>`--line:${c.line};--panel:${c.panel};${c.paint?`--paint:url(${A}${c.paint});--paintpos:${c.paintpos||'50% 30%'};--paintsize:${c.paintsize||'cover'};`:''}`;
FAMILY({key:'lengkung',name:'Lengkung Bunga',meaning:'Flowered arch',
  blurb:'A finely engraved rococo arch on aged cream paper, wreathed with painted roses, the names in rouge script inside. The arch parts down the middle to let guests in.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Alex Brush', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const c=th.c,en=o.lang==='en';
    return `<section class="page pg-lengkung${c.dark?' lg-dark':''}" style="${lgVars(c)}"><div class="lg-bg"></div>
      <div class="lg-wrap reveal"><div class="lg-arch">${lgPanel()}<div class="lg-txt">${lgText(o,L,true)}</div></div>${lgWreath(c,true)}</div>
      <div class="lg-pills reveal d2"><a class="lg-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="lg-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-lengkung${c.dark?' lg-dark':''}" style="${lgVars(c)}"><div class="lg-bg"></div>
      <div class="lg-wrap"><div class="lg-arch">
        <div class="lg-half l">${lgPanel()}</div><div class="lg-half r">${lgPanel()}</div>
        <div class="lg-txt">${lgText(o,L,false)}</div></div>${lgWreath(c,false)}</div>
      <div class="lg-foot">${guest?`<p class="lg-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="lg-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('lg-dk',!!c.dark);el.style.setProperty('--line',c.line);el.style.setProperty('--panel',c.panel);
    const sc=$('.scroller',el);
    $$('.pg-lengkung [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'krim',n:'Krim',desc:'Sepia arch, rouge script, painted roses on cream',c:{ground:'#efe4cf',sheet:'#fbf5e8',ink:'#3d2c22',accent:'#9b2f3b',gold:'#a8844e',pagefg:'#3d2c22',line:'#6e4f37',panel:'#f8f0e0',fl1:'cabbage-rose',fl2:'blush-rose',fl3:'wild-rose'}},
    {k:'jambu',n:'Jambu',desc:'Rose-ink arch on blush paper, pink roses',c:{ground:'#f1dfd6',sheet:'#fdf6f1',ink:'#40292a',accent:'#a63c50',gold:'#b08a64',pagefg:'#40292a',line:'#8a5a58',panel:'#fbf0ea',fl1:'pink-rose',fl2:'blush-rose',fl3:'wild-rose'}},
    {k:'sage',n:'Sage',desc:'Green-ink arch on pale sage paper, white roses',c:{ground:'#e3e4d3',sheet:'#f8f8ef',ink:'#2f3529',accent:'#8c3a43',gold:'#9c9061',pagefg:'#2f3529',line:'#55624a',panel:'#f4f3e7',fl1:'white-roses',fl2:'wild-rose',fl3:'forget-me-not'}},
    {k:'gading',n:'Gading',desc:'Brown-ink arch on ivory, red roses',c:{ground:'#ebe2d0',sheet:'#fcf8ef',ink:'#36291f',accent:'#7f1d26',gold:'#a3814a',pagefg:'#36291f',line:'#5a432f',panel:'#f8f2e5',fl1:'red-rose',fl2:'cabbage-rose',fl3:'jasmine'}},
    {k:'marun',n:'Marun',desc:'Paper arch with gilt lines before a dark red-tulip painting',c:{ground:'#1e1210',sheet:'#f7efdf',ink:'#3a2a22',accent:'#8e2232',gold:'#b08a4c',pagefg:'#f1e6d4',line:'#a07d45',panel:'#f6eedd',dark:'1',paint:'pd-still-3.jpg',paintpos:'50% 18%'}},
    {k:'hitam',n:'Hitam',desc:'Paper arch with gilt lines before a dark Ruysch bouquet',c:{ground:'#141110',sheet:'#f6efe2',ink:'#352a22',accent:'#8b2b35',gold:'#b08c52',pagefg:'#efe6d6',line:'#a17f48',panel:'#f5eee0',dark:'1',paint:'pd-still-1.jpg',paintpos:'50% 20%'}},
    {k:'nila',n:'Nila',desc:'Paper arch with gilt lines before a soft blue and pink bouquet',c:{ground:'#11141a',sheet:'#f6f1e6',ink:'#2c2a2c',accent:'#8a3048',gold:'#ab8d58',pagefg:'#ece6dc',line:'#9c7f4c',panel:'#f5efe4',dark:'1',paint:'pd-still-4.jpg',paintpos:'50% 32%',paintsize:'auto 122%'}},
    {k:'zamrud',n:'Zamrud',desc:'Paper arch with gilt lines before a bright de Heem bouquet',c:{ground:'#121a14',sheet:'#f6f0e2',ink:'#2d2c24',accent:'#8f2a35',gold:'#ad8b50',pagefg:'#ebe7d8',line:'#9e7e46',panel:'#f5eedf',dark:'1',paint:'pd-still-2.jpg',paintpos:'50% 22%'}},
  ]});
