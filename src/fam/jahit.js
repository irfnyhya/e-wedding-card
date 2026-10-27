/* jahit: hand embroidery on natural linen, still in its wooden hoop, with the needle and thread left in.
   Every stitch is drawn: fishbone leaves, stem-stitch stalks, lazy-daisy petals, satin-stitch roses, French knots,
   and the names worked in satin stitch over a script letterform.
   Cover: tap "Buka Jemputan", the outer hoop lifts off and the embroidered linen comes forward.
   Page: the finished piece laid flat on the table with the empty hoop beside it.
   Skin: linen cards with a running-stitch border. */
needFont('Parisienne');
let jhN=0;
const j2=v=>v.toFixed(2);
// fishbone leaf: angled stitches from each edge into the centre vein, from base (0,0) to tip (len,0), then placed
function jhLeaf(x,y,rot,len,wid,col,hi){let d='';const n=Math.round(len/1.05);
  for(let i=1;i<n;i++){const t=i/n,w=wid*Math.sin(Math.PI*Math.pow(t,.8))*.5,cx=Math.min(len,t*len+wid*.45);
    d+=`M${j2(t*len)} ${j2(-w)}L${j2(cx)} 0M${j2(t*len)} ${j2(w)}L${j2(cx)} 0`}
  return `<g transform="translate(${j2(x)} ${j2(y)}) rotate(${j2(rot)})"><path d="${d}" stroke="${col}" stroke-width="1.05" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${hi}" stroke-width=".35" stroke-linecap="round" fill="none" opacity=".55" transform="translate(-.2 -.25)"/></g>`}
// stem stitch: short overlapping slanted stitches along a path, faked with a dashed thread and a lighter twist on top
const jhStem=(d,col,hi)=>`<path d="${d}" fill="none" stroke="${col}" stroke-width="1.3" stroke-dasharray="2.4 .5" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${hi}" stroke-width=".45" stroke-dasharray="1.2 1.7" opacity=".6"/>`;
// lazy daisy: each petal a chain loop held with a tiny stitch at the tip
const jhDaisy=(x,y,r,col,ctr,rot=0)=>{let s='';for(let i=0;i<5;i++){const a=rot+i*72;
  s+=`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 -1.2C2.4 -${r*.35} 1.9 -${r*.95} 0 -${r}C-1.9 -${r*.95} -2.4 -${r*.35} 0 -1.2Z" fill="none" stroke="${col}" stroke-width="1"/><path d="M0 -${r}v-1.3" stroke="${col}" stroke-width=".9"/></g>`}
  return s+jhKnot(x,y,1.3,ctr)};
// french knot: a raised bead of thread
const jhKnot=(x,y,r,col)=>`<circle cx="${j2(x)}" cy="${j2(y)}" r="${r}" fill="${col}"/><circle cx="${j2(x-r*.3)}" cy="${j2(y-r*.35)}" r="${j2(r*.42)}" fill="#fff" opacity=".35"/>`;
// satin-stitch rose: petals filled with close parallel stitches, two shades
function jhRose(x,y,r,c1,c2){let s='';const ring=(rr,n,col,off)=>{for(let i=0;i<n;i++){const a=(i/n)*Math.PI*2+off,px=x+Math.cos(a)*rr*.55,py=y+Math.sin(a)*rr*.55;
    let d='';const m=Math.round(rr*1.6);for(let k=0;k<=m;k++){const t=k/m-.5,ox=Math.cos(a+Math.PI/2)*t*rr*1.05,oy=Math.sin(a+Math.PI/2)*t*rr*1.05,h=Math.sqrt(Math.max(0,.25-t*t))*rr*1.1;
      d+=`M${j2(px+ox-Math.cos(a)*h)} ${j2(py+oy-Math.sin(a)*h)}L${j2(px+ox+Math.cos(a)*h)} ${j2(py+oy+Math.sin(a)*h)}`}
    s+=`<path d="${d}" stroke="${col}" stroke-width=".95" stroke-linecap="round"/>`}};
  ring(r,6,c1,0);ring(r*.62,5,c2,.6);return s+jhKnot(x,y,r*.22,c2)}
// the wreath: an open ring of stems, leaves and flowers, gap at the top
function jhWreath(c,R=70,cx=100,cy=100){let s='';const L=c.leaf,LH=c.leafhi||'#e8f0d8';
  const arc=(a0,a1)=>{const p=a=>[cx+Math.cos(a)*R,cy+Math.sin(a)*R];const [x0,y0]=p(a0),[x1,y1]=p(a1);return `M${j2(x0)} ${j2(y0)}A${R} ${R} 0 0 ${a1>a0?1:0} ${j2(x1)} ${j2(y1)}`};
  const D=Math.PI/180;s+=jhStem(arc(-62*D,90*D),L,LH)+jhStem(arc(242*D,90*D),L,LH);
  for(let a=-56;a<=236;a+=12){if(a>78&&a<102)continue;const r=a*D,px=cx+Math.cos(r)*R,py=cy+Math.sin(r)*R,g=a<90?a-90:a+90;
    s+=jhLeaf(px,py,g-34,10,4.6,L,LH)+jhLeaf(px,py,g+34,9,4.2,L,LH)}
  const fl=[[100,c.fl,c.fl2,8],[30,c.fl2,c.fl,6],[150,c.fl2,c.fl,6],[-20,c.fl,c.fl2,5],[200,c.fl,c.fl2,5]];
  fl.forEach(([a,c1,c2,r])=>{const px=cx+Math.cos(a*D)*R,py=cy+Math.sin(a*D)*R;s+=jhRose(px,py,r,c1,c2)});
  [[62,c.fl2],[118,c.fl2],[-40,c.fl],[220,c.fl],[8,c.fl],[172,c.fl]].forEach(([a,col])=>{const px=cx+Math.cos(a*D)*(R+7),py=cy+Math.sin(a*D)*(R+7);s+=jhDaisy(px,py,4.2,col,c.gold,a)});
  [[-30,4],[210,4],[78,-6],[102,-6],[45,7],[135,7]].forEach(([a,o])=>{const px=cx+Math.cos(a*D)*(R+o),py=cy+Math.sin(a*D)*(R+o);s+=jhKnot(px,py,1.1,c.gold)+jhKnot(px+2.6,py+1.2,1,c.gold)+jhKnot(px-1.4,py+2.4,1,c.gold)});
  return s}
// names in satin stitch: a script letterform filled with slanted thread, a shadow underneath for the raised thread
function jhNames(o,c,u,y0=90,sz=31){const [n1,n2]=coverNames(o);const fit=t=>Math.min(sz,sz*8/Math.max(8,String(t).length));
  const t=(txt,y,s)=>`<text x="100" y="${y}" font-size="${j2(s)}" text-anchor="middle" font-family="Parisienne,cursive">${esc(txt)}</text>`;
  const body=t(n1,y0,fit(n1))+`<text x="100" y="${y0+15}" font-size="13" text-anchor="middle" font-family="'Cormorant Garamond',serif" font-style="italic">&amp;</text>`+t(n2,y0+40,fit(n2));
  return `<defs><pattern id="jhs${u}" width="1.5" height="1.5" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)"><rect width="1.5" height="1.5" fill="${c.accent}"/><rect width="1.5" height=".42" y=".2" fill="#fff" opacity=".28"/><rect width="1.5" height=".18" y="1.25" fill="#000" opacity=".25"/></pattern></defs>
    <g fill="#000" opacity=".28" transform="translate(.45 .6)">${body}</g><g fill="url(#jhs${u})" stroke="${c.accent}" stroke-width=".18">${body}</g>`}
const jhCloth=(o,c,names=true)=>{const u=++jhN;return `<svg class="jh-emb" viewBox="0 0 200 200" ${NS}><g fill="none">${jhWreath(c)}</g>${names?jhNames(o,c,u):''}</svg>`};
const jhGo=(el)=>{const sc=$('.scroller',el);
  $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))};
// needle and thread left in the cloth
const jhNeedle=c=>`<svg class="jh-needle" viewBox="0 0 200 200" ${NS}><defs><linearGradient id="jhm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f4f2"/><stop offset=".5" stop-color="#9a9da2"/><stop offset="1" stop-color="#5d6066"/></linearGradient></defs>
  <path d="M171 178C180 192 196 190 206 196C218 203 214 222 226 232" fill="none" stroke="${c.accent}" stroke-width="1.3" stroke-dasharray="2.4 .4"/>
  <g transform="rotate(42 150 157)"><rect x="150" y="156" width="30" height="1.8" rx=".9" fill="url(#jhm)"/><ellipse cx="176.5" cy="156.9" rx="2" ry=".45" fill="#3a3a3a" opacity=".7"/></g></svg>`;
const jhStyle=c=>`--leaf:${c.leaf};--fl:${c.fl}`;
FAMILY({key:'jahit',name:'Sulaman',meaning:'Hand embroidery',
  blurb:'Your names hand-embroidered in satin stitch on natural linen, framed by a stitched wreath and still held in a wooden hoop.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Parisienne', cursive",b:"'Cormorant Garamond', serif"},ms:1350,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-jahit2" style="${jhStyle(c)}"><div class="jh-table"></div>
      <div class="jh-panel reveal"><div class="jh-pin">
        <p class="jh-k kicker">${ev(o,L)}</p>
        <div class="names jh-nm">${jhCloth(o,c)}</div>
        <p class="jh-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="jh-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="jh-ven">${esc(o.venue)}</p>`:''}
        <a class="jh-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-jahit2" style="${jhStyle(c)}"><div class="jh-table"></div>
      <p class="jh-k jh-top">${ev(o,L)}</p>
      <div class="jh-stage"><div class="jh-drape"><div class="jh-cloth"></div></div>
        <div class="jh-hoop"><div class="jh-taut">${jhCloth(o,c)}</div><i class="jh-inner"></i><i class="jh-ring"></i><i class="jh-screw"></i></div>${jhNeedle(c)}</div>
      <p class="jh-cdate">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>
      <div class="jh-foot">${guest?`<p class="jh-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="jh-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);jhGo(el)},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory linen, honey and rose threads',c:{ground:'#d8c7a6',sheet:'#f4eee2',ink:'#3a2e24',accent:'#7a4a2a',gold:'#c99a3a',pagefg:'#3a2c20',fl:'#c97a6a',fl2:'#e8b49a',leaf:'#7d8a52'}},
    {k:'nila',n:'Nila',desc:'Ivory linen, indigo threads',c:{ground:'#8ea0b8',sheet:'#f3efe6',ink:'#232c40',accent:'#1d2f5a',gold:'#d4a84a',pagefg:'#16203a',fl:'#3e5c96',fl2:'#9fb3d6',leaf:'#5d7a6a'}},
    {k:'marun',n:'Marun',desc:'Ivory linen, wine and blush threads',c:{ground:'#5c2430',sheet:'#f4ede2',ink:'#3a2228',accent:'#6e1a2a',gold:'#d2a24c',pagefg:'#f4e6dc',fl:'#9a2a3c',fl2:'#e3a5a8',leaf:'#6f7d4e'}},
    {k:'zamrud',n:'Zamrud',desc:'Ivory linen, emerald threads',c:{ground:'#2f5444',sheet:'#f2eee3',ink:'#22302a',accent:'#0f4a36',gold:'#d2aa4e',pagefg:'#eef0e2',fl:'#e8d6b0',fl2:'#c98a7a',leaf:'#2f6a4a'}},
    {k:'jambu',n:'Merah Jambu',desc:'White linen, rose-pink threads',c:{ground:'#e6c6c2',sheet:'#f8f3ee',ink:'#4a2a34',accent:'#a3465f',gold:'#d6a85a',pagefg:'#5a2a3a',fl:'#d8728a',fl2:'#f2b8c2',leaf:'#86a07a'}},
    {k:'sage',n:'Sage',desc:'Oat linen, sage and cream threads',c:{ground:'#a9b49b',sheet:'#f3efe4',ink:'#2f3a2a',accent:'#46573e',gold:'#c4a45a',pagefg:'#26301f',fl:'#f2ead8',fl2:'#d9a48c',leaf:'#5d7550'}},
    {k:'hitam',n:'Hitam',desc:'Ivory linen, black and red threads',c:{ground:'#242222',sheet:'#f1ece2',ink:'#1c1a1a',accent:'#161414',gold:'#c99a3a',pagefg:'#eee6d8',fl:'#a3263a',fl2:'#d97080',leaf:'#4a5a3e'}},
    {k:'terakota',n:'Terakota',desc:'Ivory linen, terracotta threads',c:{ground:'#c98466',sheet:'#f5eee3',ink:'#4a2a1e',accent:'#8e3a1c',gold:'#d6a046',pagefg:'#3a1c12',fl:'#c25a32',fl2:'#efb48c',leaf:'#7a8048'}},
  ]});
