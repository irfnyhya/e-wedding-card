/* taman: an English garden. A gilt trellis arch hung with a cascade of wisteria (hundreds of tiny pea-flowers,
   pale at the top of each raceme, deep at the buds) over a gravel path between clipped hedges.
   Cover: touch the little hanging plaque and the wisteria curtain parts. Page: the arch over the names. Skin: lattice-bordered cards. */
needFont('Cormorant+SC:wght@500');
const f1=n=>n.toFixed(1);
const mix=(a,b,t)=>{const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)),A=p(a),B=p(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
/* one hanging raceme of wisteria from x,y */
function raceme(x,y,len,r,c,sway){const cx=x+sway,cy=y+len*.5,ex=x+sway*.6,ey=y+len;let s=`<path d="M${f1(x)} ${f1(y)}Q${f1(cx)} ${f1(cy)} ${f1(ex)} ${f1(ey)}" stroke="${c.vine}" stroke-width=".6" fill="none"/>`;
  const n=Math.round(len/2.1),hue=r();
  for(let i=0;i<=n;i++){const t=i/n,u=1-t,px=u*u*x+2*u*t*cx+t*t*ex,py=u*u*y+2*u*t*cy+t*t*ey,W=10*Math.pow(1-t,.75)*(len/120)**.3+1.2;
    const fx=px+(r()*2-1)*W,fy=py+(r()-.5)*2,sz=(3.3-t*1.9)*(.85+r()*.3);
    const col=t<.4?mix(c.w1,c.w2,t/.4*(.7+hue*.3)):t<.8?mix(c.w2,c.w3,(t-.4)/.4*.7):mix(c.w2,c.w3,.75+r()*.25);
    s+=`<ellipse cx="${f1(fx)}" cy="${f1(fy)}" rx="${f1(sz)}" ry="${f1(sz*.7)}" transform="rotate(${Math.round((r()-.5)*70)} ${f1(fx)} ${f1(fy)})" fill="${col}"/>`;
    if(t<.8)s+=`<ellipse cx="${f1(fx+(r()-.5)*1.5)}" cy="${f1(fy+sz*.5)}" rx="${f1(sz*.45)}" ry="${f1(sz*.3)}" fill="${c.w3}" opacity=".55"/>`}
  return `<g>${s}</g>`}
/* a pinnate wisteria leaf, hanging */
function wleaf(x,y,len,ang,c){let s=`<path d="M0 0V${len}" stroke="${c.vine}" stroke-width=".5"/>`;
  for(let i=1;i<=5;i++){const yy=len*i/5.6,l=7-i*.4;s+=`<ellipse cx="${-l*.7}" cy="${f1(yy)}" rx="${f1(l)}" ry="2" transform="rotate(30 ${-l*.7} ${f1(yy)})" fill="${c.leaf}"/><ellipse cx="${l*.7}" cy="${f1(yy)}" rx="${f1(l)}" ry="2" transform="rotate(-30 ${l*.7} ${f1(yy)})" fill="${c.leaf2}"/>`}
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${ang})">${s}<ellipse cx="0" cy="${f1(len+4)}" rx="2" ry="5" fill="${c.leaf}"/></g>`}
/* the wisteria curtain for one half: hangs from the inner edge of the arch, longer towards the posts */
function curtain(c,side,seed,short){const r=rng(seed),A=[180,250],R=124;let back='',front='';
  const N=short?7:15;
  for(let i=0;i<N;i++){const f=(i+.5)/N,a=Math.PI*(side<0?1-f*.5:.5-f*.5+.0),ang=side<0?Math.PI+f*Math.PI*.5:Math.PI*1.5+f*Math.PI*.5;
    const x=A[0]+Math.cos(ang)*R*(.96+r()*.06),y=A[1]+Math.sin(ang)*R*(.96+r()*.06);
    const edge=side<0?1-f:f;                     // 0 at the apex, 1 at the post
    let len=short?36+edge*80+r()*26:64+edge*150+r()*36;
    const g=raceme(x,y-4,len*(.75+r()*.25),r,c,(r()-.5)*10);(i%2?back+=g:front+=g);
    if(r()<.6)back+=wleaf(x+(r()-.5)*12,y-6,26+r()*16,(r()-.5)*40,c)}
  // a second, deeper row from the outer edge so the arch itself is dressed
  for(let i=0;i<N-3;i++){const f=(i+.7)/N,ang=side<0?Math.PI+f*Math.PI*.5:Math.PI*1.5+f*Math.PI*.5,x=A[0]+Math.cos(ang)*146,y=A[1]+Math.sin(ang)*146;
    back=raceme(x,y,(short?30:44)+r()*40,r,c,(r()-.5)*8)+back}
  return back+front}
/* gilt trellis arch: posts and an arched band filled with diagonal lattice */
function arch(c,id){const L=[];for(let k=-800;k<800;k+=11)L.push(`M${k} 0l720 720M${k} 720l720 -720`);const lat=L.join('');
  const band=`M34 250A146 146 0 0 1 326 250H302A122 122 0 0 0 58 250Z`;
  const posts=`M34 250H58V646H34ZM302 250H326V646H302Z`;
  let spokes='';for(let i=1;i<14;i++){const a=Math.PI+i/14*Math.PI,x1=180+Math.cos(a)*122,y1=250+Math.sin(a)*122,x2=180+Math.cos(a)*146,y2=250+Math.sin(a)*146;spokes+=`M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}`}
  return `<defs><linearGradient id="tg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.gold}"/><stop offset=".35" stop-color="${mix(c.gold,'#ffffff',.45)}"/><stop offset=".6" stop-color="${c.gold}"/><stop offset="1" stop-color="${mix(c.gold,'#000000',.3)}"/></linearGradient>
   <clipPath id="tc${id}"><path d="${band}${posts}"/></clipPath></defs>
   <g clip-path="url(#tc${id})"><path d="${lat}" stroke="url(#tg${id})" stroke-width=".7" fill="none"/></g>
   <g fill="none" stroke="url(#tg${id})"><path d="${band}${posts}" stroke-width="1.4"/><path d="M38 250A142 142 0 0 1 322 250M62 250A118 118 0 0 1 298 250" stroke-width=".5"/>
   <path d="${spokes}" stroke-width=".6"/><path d="M28 646H64M296 646H332M30 652H62M298 652H330M28 244H64M296 244H332" stroke-width="1"/>
   <circle cx="180" cy="98" r="5" stroke-width=".9"/><path d="M180 93V84M176 88h8" stroke-width=".8"/>
   <path d="M46 238c-4-8 0-14 0-14s4 6 0 14M314 238c-4-8 0-14 0-14s4 6 0 14" stroke-width=".8"/></g>`}
/* the gravel path, a lawn wash and stippled box hedges, seen through the arch */
function garden(c,seed){const r=rng(seed);let g='',grass='',hedge='';const HW=y=>5+(y-452)/192*92;
  for(let i=0;i<650;i++){const v=Math.pow(r(),.7),y=452+v*192,hw=HW(y),x=180+(r()*2-1)*hw,sz=.25+v*1.3;g+=`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(sz)}" ry="${f1(sz*.6)}" fill="${[c.grav1,c.grav2,c.grav3][i%3]}"/>`}
  for(let i=0;i<260;i++){const v=Math.pow(r(),.8),y=456+v*188,sd=r()<.5?-1:1,x=180+sd*(HW(y)+4+r()*(14+v*110)),h=1.2+v*4.5;if(Math.abs(x-180)<126)grass+=`M${f1(x)} ${f1(y)}l${f1((r()-.5)*2)} ${f1(-h)}`}
  for(const sd of [-1,1])for(let i=0;i<7;i++){const t=i/6,y=462+t*168,rad=2.5+t*15,x=180+sd*(HW(y)+10+rad*1.1);
    hedge+=`<ellipse cx="${f1(x+sd*2)}" cy="${f1(y+1)}" rx="${f1(rad*1.3)}" ry="${f1(rad*.35)}" fill="#000" opacity=".12"/><ellipse cx="${f1(x)}" cy="${f1(y-rad*.75)}" rx="${f1(rad*1.1)}" ry="${f1(rad*.85)}" fill="${c.hedge}"/>`;
    const n=Math.round(8+rad*2.4);for(let k=0;k<n;k++){const a=r()*Math.PI*2,d=Math.sqrt(r())*rad*.95;const px=x+Math.cos(a)*d*1.1,py=y-rad*.75+Math.sin(a)*d*.85,up=py<y-rad*.9;
      hedge+=`<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(.5+rad*.07)}" fill="${up?c.leaf2:c.leaf}" opacity="${up?.9:.6}"/>`}}
  return `<defs><linearGradient id="tl${seed}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.leaf2}" stop-opacity=".05"/><stop offset="1" stop-color="${c.leaf2}" stop-opacity=".38"/></linearGradient></defs>
   <path d="M58 452H302V646H58Z" fill="url(#tl${seed})"/>${far(c,r)}
   <path d="M175 452H185L${f1(180+HW(644))} 644H${f1(180-HW(644))}Z" fill="${c.path}"/><path d="M175 452L${f1(180-HW(644))} 644M185 452L${f1(180+HW(644))} 644" stroke="${c.grav3}" stroke-width=".6" fill="none"/>${g}
   <path d="${grass}" stroke="${c.leaf}" stroke-width=".5" fill="none" opacity=".8"/>${hedge}<path d="M40 646H320" stroke="${c.grav3}" stroke-width=".6"/>`}
/* a distant clipped hedge and tree tops along the horizon */
function far(c,r){let s='',d='';for(let x=56;x<306;x+=6+r()*5){const rr=5+r()*7,y=452-rr*.55-(Math.abs(x-180)<30?0:r()*6);s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(rr)}"/>`;
  for(let k=0;k<5;k++)d+=`<circle cx="${f1(x+(r()-.5)*rr*1.4)}" cy="${f1(y+(r()-.5)*rr*1.2)}" r="${f1(.6+r())}"/>`}
  return `<g fill="${c.leaf2}" opacity=".42">${s}</g><g fill="${c.leaf}" opacity=".45">${d}</g><path d="M58 452H302" stroke="${c.leaf}" stroke-width=".4" opacity=".4"/>`}
/* vines twisting up the posts */
function vines(c,seed){const r=rng(seed);let s='';for(const x0 of [46,314]){let d=`M${x0} 650`;for(let y=650;y>250;y-=20){d+=`Q${x0+(y%40?14:-14)} ${y-10} ${x0} ${y-20}`}s+=`<path d="${d}" stroke="${c.vine}" stroke-width="1" fill="none"/>`;
  for(let y=630;y>260;y-=26){const sd=(y/26|0)%2?1:-1;s+=`<ellipse cx="${x0+sd*12}" cy="${y}" rx="5" ry="2" transform="rotate(${sd*35} ${x0+sd*12} ${y})" fill="${r()<.5?c.leaf:c.leaf2}"/>`}}return s}
let uid=0;
const scene=(c,id,short)=>`<svg class="taman-back" viewBox="0 0 360 720" preserveAspectRatio="xMidYMid slice">${garden(c,id.length*7+3)}${arch(c,id)}${vines(c,5)}</svg>
  <svg class="taman-cur l" viewBox="0 0 360 720" preserveAspectRatio="xMidYMid slice">${curtain(c,-1,11,short)}</svg>
  <svg class="taman-cur r" viewBox="0 0 360 720" preserveAspectRatio="xMidYMid slice">${curtain(c,1,23,short)}</svg>`;
FAMILY({key:'taman',name:'Taman',meaning:'English garden',
  blurb:'A gilt trellis arch dripping with wisteria over a gravel garden path. Touch the plaque and the wisteria parts.',
  fonts:{d:"'Cormorant SC', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';return `<section class="page pg-taman"><div class="taman-paper reveal">${scene(c,'p'+(++uid),true)}
    <div class="taman-in"><p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
    <p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p></div>
    <p class="taman-foot reveal d3">${esc(fmtTime(o.start,o.lang))} &middot; ${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',[a,b]=K.initials(o);
    return `<div class="cover cv-taman"><div class="taman-paper">${scene(c,'c'+(++uid),false)}
     <div class="taman-txt"><p class="taman-k">${ev(o,L)}</p><p class="taman-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</p><p class="taman-d">${esc(fmtDate(o.date,o.lang))}</p></div>
     <${tag} class="taman-plq" ${attr} aria-label="${L.open}"><svg viewBox="0 0 60 90"><path d="M30 0V24M30 0L14 30M30 0L46 30" stroke="${c.gold}" stroke-width=".6" stroke-dasharray="1.6 1.2" fill="none"/></svg><span>${esc(a)}<i>&amp;</i>${esc(b)}</span></${tag}>
     <div class="taman-low">${guest?`<p class="taman-to">${L.dear}<b>${esc(guest)}</b></p>`:`<p class="taman-to"><b>${esc(o.venue)}</b></p>`}</div></div>
     <p class="taman-hint">${en?'Touch the plaque to part the wisteria':'Sentuh plak untuk menyelak wisteria'}</p></div>`},
  skin(el,o,th){const c=th.c;K.cards(el);const r=rng(4);
    K.secs(el).forEach((s,i)=>{let w='';for(let k=0;k<4;k++)w+=raceme(10+k*9,0,30+r()*36-k*5,r,c,(r()-.5)*6);
      s.insertAdjacentHTML('afterbegin',`<i class="taman-lat"></i><svg class="taman-sw l" viewBox="0 -4 60 80">${w}</svg><svg class="taman-sw r" viewBox="0 -4 60 80">${w}</svg>`);
      const h=s.querySelector('h2');if(h)h.insertAdjacentHTML('afterend',`<svg class="taman-div" viewBox="0 0 140 12" fill="none" stroke="${c.gold}" stroke-width=".7"><path d="M0 6H44M96 6H140"/>${[0,1,2,3,4].map(k=>`<path d="M${50+k*10} 6l5-5 5 5-5 5z"/>`).join('')}<path d="M55 1v10M65 1v10M75 1v10M85 1v10" stroke-width=".4"/></svg>`)})},
  themes:[
    {k:'ungu',n:'Ungu Wisteria',desc:'Lilac wisteria, gilt arch',c:{ground:'#e7e1ec',sheet:'#fbf8f2',ink:'#373044',accent:'#5a4682',gold:'#b39656',pagefg:'#373044',w1:'#ece4f6',w2:'#b9a2de',w3:'#6e52a6',vine:'#7b6a55',leaf:'#8ea56c',leaf2:'#a9bb82',path:'#ece5d8',grav1:'#c9bfae',grav2:'#a89d8b',grav3:'#8a8070',hedge:'#5f7a4c'}},
    {k:'putih',n:'Putih',desc:'White wisteria, sage garden',c:{ground:'#dfe5d9',sheet:'#fbfbf6',ink:'#2f3a2e',accent:'#4a5c44',gold:'#a8955c',pagefg:'#2f3a2e',w1:'#ffffff',w2:'#ecebf3',w3:'#b8b7cc',vine:'#7a6e58',leaf:'#86a066',leaf2:'#a5b884',path:'#ebe6da',grav1:'#c6bfae',grav2:'#a69e8c',grav3:'#878070',hedge:'#58744a'}},
    {k:'jambu',n:'Jambu',desc:'Pink wisteria, blush paper',c:{ground:'#f0dfe3',sheet:'#fdf8f6',ink:'#3e2a33',accent:'#8a3d62',gold:'#b58e5c',pagefg:'#3e2a33',w1:'#fae6ee',w2:'#e8a9c4',w3:'#b45a86',vine:'#7d6655',leaf:'#8ba46c',leaf2:'#a8ba84',path:'#efe6dc',grav1:'#cbbfae',grav2:'#aa9c8a',grav3:'#8c8070',hedge:'#5d784c'}},
    {k:'biru',n:'Biru',desc:'Blue-violet wisteria on mist',c:{ground:'#dee4ee',sheet:'#fafaf7',ink:'#2a3045',accent:'#36437c',gold:'#a8955e',pagefg:'#2a3045',w1:'#e2e7f8',w2:'#a2b1e2',w3:'#5161a8',vine:'#6f6656',leaf:'#86a06c',leaf2:'#a3b788',path:'#e9e6de',grav1:'#c3bdb0',grav2:'#a39c8e',grav3:'#857f72',hedge:'#567250'}},
    {k:'malam',n:'Malam',desc:'Moonlit garden, deep violet',c:{ground:'#1c1a2c',sheet:'#f7f3ea',ink:'#2e2a3c',accent:'#4b3a78',gold:'#c4a45e',pagefg:'#ece8f4',w1:'#e4dcf2',w2:'#a58fd2',w3:'#5a3f96',vine:'#6e604e',leaf:'#7f9a62',leaf2:'#9db27c',path:'#e8e2d6',grav1:'#c2b8a8',grav2:'#9f9584',grav3:'#7f7666',hedge:'#4f6a42'}},
    {k:'sage',n:'Sage',desc:'Sage lawn, lilac blooms',c:{ground:'#7b8a6f',sheet:'#f8f7ef',ink:'#2f352a',accent:'#54447a',gold:'#a99456',pagefg:'#f7f6ee',w1:'#ece4f4',w2:'#bda9dc',w3:'#7458a8',vine:'#766a54',leaf:'#7f9a5e',leaf2:'#a0b47c',path:'#ebe5d8',grav1:'#c5bdac',grav2:'#a49a88',grav3:'#857c6c',hedge:'#53704a'}},
    {k:'senja',n:'Senja',desc:'Dusk plum, mauve blooms',c:{ground:'#3b2a3e',sheet:'#fbf5f0',ink:'#3a2a38',accent:'#6e3a68',gold:'#c39a62',pagefg:'#f4e8ee',w1:'#f1e0ee',w2:'#cf9fc8',w3:'#8a4a86',vine:'#7a6452',leaf:'#879e66',leaf2:'#a6b682',path:'#ede4da',grav1:'#c8bcac',grav2:'#a69888',grav3:'#877a6c',hedge:'#5a7448'}},
    {k:'emas',n:'Emas',desc:'Gold lattice on dark olive',c:{ground:'#2a2a1c',sheet:'#fbf6e8',ink:'#36301f',accent:'#5a4a7e',gold:'#c9a24c',pagefg:'#f2ecd8',w1:'#ebe2f4',w2:'#b4a0da',w3:'#6a4fa2',vine:'#7d6a4e',leaf:'#879c5c',leaf2:'#a6b47a',path:'#eee6d4',grav1:'#cabfa8',grav2:'#a89c84',grav3:'#897e68',hedge:'#586e42'}},
  ]});
