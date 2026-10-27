/* kastil: "Istana Lama". An engraved view of an old palace with a formal garden, drawn line by line in SVG like a
   copperplate print: hatched sky, a domed centre pavilion, mansard wings and pyramid-roofed towers, wooded groves
   behind, parterres, clipped cones and a fountain on the allée, all fading into the paper as a vignette.
   It sits at the head of a tall cotton card with a fine double border and letterpress names.
   Cover: tap "Buka Jemputan" and the view draws you in through the palace door. Page: the same card, taller.
   Skin: cotton cards with a debossed etching plate-mark and spaced letterpress headings. */
let ksN=0;
const kf=v=>(+v).toFixed(1);
// fine hatching: horizontal or vertical lines filling a box
const ksH=(x,y,w,h,st)=>{let d='';for(let yy=y+st/2;yy<y+h;yy+=st)d+=`M${kf(x)} ${kf(yy)}h${kf(w)}`;return d};
const ksV=(x,y,w,h,st)=>{let d='';for(let xx=x+st/2;xx<x+w;xx+=st)d+=`M${kf(xx)} ${kf(y)}v${kf(h)}`;return d};
// an arched window, dark inside with vertical hatching
const ksWin=(x,y,w,h)=>({o:`M${kf(x)} ${kf(y+h)}V${kf(y+w/2)}A${w/2} ${w/2} 0 0 1 ${kf(x+w)} ${kf(y+w/2)}V${kf(y+h)}Z`,h:ksV(x+.3,y+w*.45,w-.6,h-w*.45,1.05)+`M${kf(x-.8)} ${kf(y+h+.8)}h${kf(w+1.6)}`});
// a woodland clump: a bumpy outline plus little curved strokes for leaves
function ksTree(cx,cy,R,seed){const r=rng(seed);let o='',t='';const n=13;
  for(let i=0;i<=n;i++){const a=Math.PI+i/n*Math.PI,rr=R*(.86+r()*.22),x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr*.95;
    if(!i)o=`M${kf(cx-R)} ${kf(cy+R*.35)}L${kf(x)} ${kf(y)}`;else{const pa=a-Math.PI/n/2,pr=rr*1.14;o+=`Q${kf(cx+Math.cos(pa)*pr)} ${kf(cy+Math.sin(pa)*pr*.95)} ${kf(x)} ${kf(y)}`}}
  o+=`L${kf(cx+R)} ${kf(cy+R*.35)}Z`;
  for(let i=0;i<R*3.2;i++){const a=Math.PI*(1+r()),rr=R*Math.sqrt(r())*.9,x=cx+Math.cos(a)*rr,y=cy+Math.sin(a)*rr*.9+R*.15,s=1.2+r()*1.4,dark=x>cx-R*.1;
    t+=`M${kf(x)} ${kf(y)}q${kf(s*.6)} ${kf(-s*.7)} ${kf(s*1.3)} 0`+(dark&&r()<.6?`M${kf(x+.4)} ${kf(y+1)}h${kf(s*1.1)}`:'')}
  return {o,t}}
// the engraving, 300 x 210
function ksView(u){
  let thin='',mid='',fill='',sky='',tf='',tl='',tt='';
  // sky
  for(let y=6;y<64;y+=2.4){const r=rng(Math.round(y*7));let x=8;while(x<292){const L=14+r()*40;sky+=`M${kf(x)} ${kf(y+(r()-.5)*.3)}h${kf(Math.min(L,292-x))}`;x+=L+2+r()*6}}
  // groves behind
  const trees=[[30,106,30,3],[12,122,24,5],[50,100,20,7],[270,106,30,4],[288,122,24,6],[250,100,20,8]].map(a=>ksTree(...a));
  trees.forEach(t=>{tf+=`<path d="${t.o}" class="kst-pp"/>`;tl+=t.o;tt+=t.t});
  // the palace silhouette, filled with paper so the groves sit behind it
  const half=[
    'M40 130V76L52 50L64 76V130Z',            // tower
    'M64 130V86H122V130Z','M68 86L72 74H120V86Z', // wing + mansard
    'M122 130V72H150V130Z'];
  const mir=d=>d.replace(/([MLHVQCA ])\s*([\d.]+)(?:\s+([\d.]+))?/g,(m,c,a,b)=>c==='V'?m:c==='H'?`H${kf(300-a)}`:b!==undefined?`${c}${kf(300-a)} ${b}`:m);
  const body=[...half,...half.map(mir),'M132 62H168V72H132Z','M128 62C128 38 172 38 172 62Z','M145 32H155V40H145Z'];
  body.forEach(d=>{fill+=`<path d="${d}" class="kst-pp"/>`;mid+=d});
  // pediment, cornices, pilasters
  mid+='M122 72L150 60L178 72M126 72L150 62.4L174 72M64 89H236M64 86.6H122M178 86.6H236M40 79H64M236 79H260M38 130H262M34 133H266M30 136H270';
  thin+=ksV(66,82,54,4,1.6)+ksV(180,82,54,4,1.6);
  [126,130,170,174].forEach(x=>{mid+=`M${x} 74V130`});
  // mansard slates, tower roofs (shaded on the right), dome ribs and shading
  thin+=ksV(72,74.6,48,11.4,1.3)+ksV(180,74.6,48,11.4,1.3);
  for(let i=0;i<10;i++){const x=52+i*1.2;thin+=`M${kf(x)} ${kf(50+i*2.6)}L${kf(52+i*1.2)} 76`}
  for(let i=0;i<10;i++){const x=248+i*1.2;thin+=`M${kf(x)} ${kf(50+i*2.6)}L${kf(x)} 76`}
  mid+='M52 50V42M248 50V42M150 32V18M146 32H154';fill+='<circle cx="52" cy="41" r="1.4" class="kst-ip"/><circle cx="248" cy="41" r="1.4" class="kst-ip"/><circle cx="150" cy="17" r="1.6" class="kst-ip"/>';
  [134,140,146,154,160,166].forEach((x,i)=>{mid+=`M${x} 62Q${x+(x-150)*.08} 46 150 41`});
  for(let i=0;i<9;i++){const x=152+i*2.2;thin+=`M${kf(x)} 61.5Q${kf(x+1)} 48 ${kf(150+i*.5)} 42`}
  thin+=ksV(133,63,34,8,2.2)+'M146 40V32M154 40V32';
  // windows: towers, wings (two storeys), dormers, the centre bay and its door
  const W=[];[52].forEach(c=>{W.push([c-3,86,6,11],[c-3,104,6,16])});
  [72,82,92,102,112].forEach(c=>{W.push([c-2.6,92,5.2,10],[c-2.6,108,5.2,16])});
  [80,96,112].forEach(c=>{W.push([c-1.8,76.5,3.6,6])});
  [138,162].forEach(c=>{W.push([c-3,78,6,12],[c-3,98,6,14])});
  const wins=[...W,...W.map(([x,y,w,h])=>[300-x-w,y,w,h])].filter(([x])=>x<134||x>162);
  wins.forEach(a=>{const w=ksWin(...a);mid+=w.o;thin+=w.h});
  [[138-3,78,6,12],[138-3,98,6,14],[162-3,78,6,12],[162-3,98,6,14]].forEach(a=>{const w=ksWin(...a);mid+=w.o;thin+=w.h});
  const door=ksWin(143,106,14,24);mid+=door.o+'M141 130V104A9 9 0 0 1 159 104V130';thin+=ksV(143.4,113,13.2,17,.85);
  // shadow under the cornices
  thin+=ksH(64,89,58,3,1)+ksH(178,89,58,3,1)+ksH(40,79,24,2.4,1)+ksH(236,79,24,2.4,1);
  // the garden in perspective, vanishing at the door
  const X=(X0,y)=>150+(X0-150)*(y-118)/92;
  const rows=[134,142,152,166,186,212],cols=[[8,62],[68,118],[182,232],[238,292]];
  mid+=`M${kf(X(124,131))} 131L${kf(X(124,212))} 212M${kf(X(176,131))} 131L${kf(X(176,212))} 212`;
  for(let i=0;i<rows.length-1;i++){const y0=rows[i]+1.2,y1=rows[i+1]-1.2;
    cols.forEach(([a,b])=>{const p=[[X(a,y0),y0],[X(b,y0),y0],[X(b,y1),y1],[X(a,y1),y1]],q=p.map(v=>kf(v[0])+' '+kf(v[1]));
      mid+=`M${q[0]}L${q[1]}L${q[2]}L${q[3]}Z`;
      const m=(i0,i1)=>[(p[i0][0]+p[i1][0])/2,(p[i0][1]+p[i1][1])/2],[t,r,bt,l]=[m(0,1),m(1,2),m(2,3),m(3,0)],c=[(t[0]+bt[0])/2,(t[1]+bt[1])/2];
      thin+=`M${kf(t[0])} ${kf(t[1])}Q${kf(c[0]+(r[0]-c[0])*.2)} ${kf(c[1])} ${kf(r[0])} ${kf(r[1])}Q${kf(c[0])} ${kf(c[1]+(bt[1]-c[1])*.2)} ${kf(bt[0])} ${kf(bt[1])}Q${kf(c[0]-(c[0]-l[0])*.2)} ${kf(c[1])} ${kf(l[0])} ${kf(l[1])}Q${kf(c[0])} ${kf(c[1]-(c[1]-t[1])*.2)} ${kf(t[0])} ${kf(t[1])}`;
      const st=.9+(y0-130)*.03;for(let y=y0+st;y<y1;y+=st){const xa=X(a,y)+.8,xb=X(b,y)-.8,cx=(X(a,y)+X(b,y))/2,hw=(xb-xa)*.18;thin+=`M${kf(xa)} ${kf(y)}H${kf(cx-hw)}M${kf(cx+hw)} ${kf(y)}H${kf(xb)}`}});
    // clipped cones along the allée
    [118,182].forEach(X0=>{const y=rows[i+1],x=X(X0,y)+(X0<150?-1:1)*1,s=(y-118)/92,h=5+16*s,w=h*.42;
      fill+=`<path d="M${kf(x-w/2)} ${kf(y)}L${kf(x)} ${kf(y-h)}L${kf(x+w/2)} ${kf(y)}Z" class="kst-pp"/>`;mid+=`M${kf(x-w/2)} ${kf(y)}L${kf(x)} ${kf(y-h)}L${kf(x+w/2)} ${kf(y)}Z`;
      for(let k=1;k<6;k++)thin+=`M${kf(x+w*.04*k)} ${kf(y-h+h*.12*k)}L${kf(x+w*.1*k)} ${kf(y)}`;thin+=`M${kf(x-w*.7)} ${kf(y+.8)}h${kf(w*1.6)}`})}
  // the fountain on the allée
  fill+='<ellipse cx="150" cy="171" rx="17" ry="4.4" class="kst-pp"/>';mid+='M133 171a17 4.4 0 1 0 34 0a17 4.4 0 1 0 -34 0M136 171a14 3.2 0 1 0 28 0M133 171v2.6M167 171v2.6M133 173.6a17 4.4 0 0 0 34 0M150 170V150';
  thin+='M150 150C146 152 142 158 140 168M150 150C154 152 158 158 160 168M150 154C148 156 146 162 145 169M150 154C152 156 154 162 155 169'+ksH(137,171.6,26,2.6,.8);
  return `<svg class="kst-view" viewBox="16 6 268 196" ${NS} aria-hidden="true"><defs>
    <radialGradient id="ksg${u}" cx=".5" cy=".5" r=".58"><stop offset=".7" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <mask id="ksm${u}" maskContentUnits="userSpaceOnUse"><rect width="300" height="210" fill="url(#ksg${u})"/></mask></defs>
    <g mask="url(#ksm${u})"><path d="${sky}" class="kst-i t s"/>${tf}<path d="${tt}" class="kst-i t"/><path d="${tl}" class="kst-i"/>${fill}<path d="${thin}" class="kst-i t"/><path d="${mid}" class="kst-i"/></g></svg>`}
const ksNames=(o,tag='h1')=>{const [n1,n2]=coverNames(o);return `<${tag} class="kst-names"><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
// a small engraved fleuron for rules
const KS_FLEU=`<svg class="kst-fl" viewBox="0 0 120 14" ${NS} aria-hidden="true"><path d="M2 7H46M74 7H118M60 2C56 6 52 7 47 7C52 7 56 8 60 12C64 8 68 7 73 7C68 7 64 6 60 2Z" class="kst-i"/><circle cx="60" cy="7" r="1.5" class="kst-ip"/></svg>`;
FAMILY({key:'kastil',name:'Istana Lama',meaning:'Engraved palace',
  blurb:'A tall cotton card headed by a fine engraving of an old palace and its formal garden, with letterpress names beneath. Opening draws you in through the palace door.',
  fonts:{d:"'Old Standard TT', serif",s:"'Old Standard TT', serif",b:"'Old Standard TT', serif"},ms:1450,
  page(o,th,L){const u=++ksN,c=th.c,en=o.lang==='en';
    return `<section class="page pg-kastil${c.dark?' kst-dark':''}"><i class="kst-bg"></i>
      <div class="kst-pw reveal"><div class="kst-card"><i class="kst-rule"></i>
        <div class="kst-plate">${ksView(u)}</div>
        <div class="kst-col">
          ${o.bismillah?`<p class="kst-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
          <p class="kst-k kicker">${ev(o,L)}</p>${ksNames(o)}${KS_FLEU}
          <p class="kst-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="kst-hj">${esc(o.hijri)}</p>`:''}
          ${o.venue?`<p class="kst-ven">${esc(o.venue)}</p>`:''}
          <div class="kst-pills"><a class="kst-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="kst-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
        </div></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const u=++ksN,c=th.c,en=o.lang==='en';
    return `<div class="cover cv-kastil${c.dark?' kst-dark':''}"><i class="kst-bg"></i>
      <div class="kst-cw"><div class="kst-card"><i class="kst-rule"></i>
        <div class="kst-plate">${ksView(u)}</div>
        <div class="kst-col"><p class="kst-k">${ev(o,L)}</p>${ksNames(o,'p')}${KS_FLEU}<p class="kst-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${o.venue?`<p class="kst-cven">${esc(o.venue)}</p>`:''}</div>
      </div></div>
      <div class="kst-foot">${guest?`<p class="kst-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="kst-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('kst-dark',!!th.c.dark);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'perang',n:'Perang',desc:'Sepia engraving on ivory cotton',c:{ground:'#ddd3c1',sheet:'#f7f1e3',ink:'#3c2f24',accent:'#4a3828',gold:'#8a7050',pagefg:'#3c2f24'}},
    {k:'nila',n:'Nila',desc:'Indigo engraving on white cotton',c:{ground:'#ccd3dd',sheet:'#f8f6f0',ink:'#1f2a40',accent:'#24345a',gold:'#6a7896',pagefg:'#1f2a40'}},
    {k:'hijau',n:'Hijau',desc:'Garden-green engraving on cream',c:{ground:'#cbd2c2',sheet:'#f7f4e8',ink:'#24342a',accent:'#2c4636',gold:'#6f8068',pagefg:'#24342a'}},
    {k:'arang',n:'Arang',desc:'Black engraving on soft white',c:{ground:'#d8d6d1',sheet:'#f8f7f3',ink:'#252525',accent:'#2a2a2a',gold:'#7a7670',pagefg:'#252525'}},
    {k:'jambu',n:'Jambu',desc:'Rose engraving on blush cotton',c:{ground:'#e7d6d1',sheet:'#fbf4ef',ink:'#4a2a32',accent:'#6e3242',gold:'#a07480',pagefg:'#4a2a32'}},
    {k:'malam',n:'Malam',desc:'Indigo engraving, midnight ground',c:{ground:'#18203a',sheet:'#f5f0e3',ink:'#1f2a40',accent:'#24345a',gold:'#6a7896',pagefg:'#e8e8f0',dark:1}},
    {k:'marun',n:'Marun',desc:'Wine engraving, wine ground',c:{ground:'#36141b',sheet:'#f6efe2',ink:'#3e1c24',accent:'#5e1f2c',gold:'#9a6a6a',pagefg:'#f3e4dc',dark:1}},
    {k:'zamrud',n:'Zamrud',desc:'Green engraving, forest ground',c:{ground:'#15281f',sheet:'#f5f1e4',ink:'#22322a',accent:'#2a4434',gold:'#6f8068',pagefg:'#e8ece2',dark:1}},
  ]});
