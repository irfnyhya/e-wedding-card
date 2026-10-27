/* catur (redesign): a quiet still life. A turned ebony king and an ivory queen stand close on a polished board,
   lit from one side, the board falling out of focus into the dark.
   Cover: tap "Buka Jemputan" and the view sinks toward the board as the scene dims.
   Page: the same still life above an elegant scoresheet card: the two players, the moves (date, time, place), result ½–½.
   Skin: scoresheet cards with a double hairline, Cinzel headings with a tiny two-square mark. */
let ctN=0;
const CF=(n,d=2)=>(+n).toFixed(d);
function ctCurve(p){let d=`M${CF(p[0][0])} ${CF(p[0][1])}`;
  for(let i=0;i<p.length-1;i++){const p0=p[i-1]||p[i],p1=p[i],p2=p[i+1],p3=p[i+2]||p2;
    d+=`C${CF(p1[0]+(p2[0]-p0[0])/6)} ${CF(p1[1]+(p2[1]-p0[1])/6)} ${CF(p2[0]-(p3[0]-p1[0])/6)} ${CF(p2[1]-(p3[1]-p1[1])/6)} ${CF(p2[0])} ${CF(p2[1])}`}
  return d}
const ctOutline=half=>{const R=half.map(([x,y])=>[30+x,y]),Lf=half.slice().reverse().map(([x,y])=>[30-x,y]);return ctCurve([...R,...Lf])+'Z'};
// Staunton half-profiles (x from the axis, y down, base at 146); doubled points keep the turned edges crisp
const CT_KING=[[0,15],[5,15],[8.6,17],[10.8,21],[10.8,21],[9.4,24],[7.6,28],[7.2,31],[7.2,31],[10.4,32],[10.4,35.5],[10.4,35.5],[7,36.6],[6.1,42],[5.8,56],[6.4,74],[7.8,92],[9.8,103],[9.8,103],[13.2,105],[13.2,108.6],[13.2,108.6],[10.8,109.6],[12.6,113],[16.4,119],[17.4,122.5],[17.4,122.5],[15.6,124],[19.4,128],[21.4,133],[21.4,137],[21.4,137],[23.4,138],[23.4,143.6],[22.6,146],[0,146]];
const CT_QUEEN=[[0,25],[10.4,22.6],[10.4,22.6],[9.2,27],[7.2,31.5],[7,33.6],[7,33.6],[9.8,34.6],[9.8,38],[9.8,38],[6.6,39],[5.7,46],[5.4,62],[6.1,80],[7.6,96],[9.4,104],[9.4,104],[12.6,106],[12.6,109.4],[12.6,109.4],[10.4,110.4],[12,113.6],[15.4,119],[16.4,122.4],[16.4,122.4],[14.8,124],[18.4,128],[20.4,133],[20.4,137],[20.4,137],[22.4,138],[22.4,143.6],[21.6,146],[0,146]];
const CT_RINGS={k:[[31,7.2],[35.5,10.4],[103,9.8],[108.6,13.2],[122.5,17.4],[137,21.4],[143.6,23.4]],q:[[33.6,7],[38,9.8],[104,9.4],[109.4,12.6],[122.4,16.4],[137,20.4],[143.6,22.4]]};
// a turned piece, lit from the upper left with a faint rim light on the right
function ctPiece(kind,u){const king=kind==='k',id=`ct${kind}${u}`;
  const tone=king?['#060505','#2a2523','#6d655d','#171413','#0b0a09','#3a3430','#050404']:['#8b7a5c','#d8ccb1','#fffaf0','#efe5cf','#c9b893','#e9dcc0','#7d6d50'];
  const stops=[0,.13,.3,.48,.78,.91,1].map((o,i)=>`<stop offset="${o}" stop-color="${tone[i]}"/>`).join('');
  const out=ctOutline(king?CT_KING:CT_QUEEN);
  const top=king?`<path d="M28.6 1.6h2.8v3.2h3.2v2.8h-3.2v6.6h-2.8V7.6h-3.2V4.8h3.2z"/><ellipse cx="30" cy="15.2" rx="5.2" ry="1.6"/>`
    :`<circle cx="30" cy="11.4" r="4.1"/>${[-9.6,-6.4,-3.2,0,3.2,6.4,9.6].map((x,i)=>`<circle cx="${CF(30+x,1)}" cy="${CF(22.4-(Math.abs(x)>8?-.4:i%2?.6:1.1),1)}" r="${i%2?1.25:1.6}"/>`).join('')}<path d="M24.4 16.6Q30 14.4 35.6 16.6L34 22H26z"/>`;
  const rings=CT_RINGS[kind].map(([y,r])=>`<path d="M${CF(30-r)} ${y}A${r} ${CF(r*.2)} 0 0 0 ${CF(30+r)} ${y}" fill="none" stroke="${king?'#000':'#6b5a3c'}" stroke-opacity="${king?.7:.45}" stroke-width=".7"/><path d="M${CF(30-r*.92)} ${CF(y+1)}A${r} ${CF(r*.2)} 0 0 0 ${CF(30+r*.92)} ${CF(y+1)}" fill="none" stroke="#fff" stroke-opacity="${king?.16:.55}" stroke-width=".45"/>`).join('');
  return `<svg class="ct-pc ct-${kind}" viewBox="0 0 60 150" aria-hidden="true"><defs><linearGradient id="${id}">${stops}</linearGradient>
    <linearGradient id="${id}v" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="${king?.08:.15}"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${king?.5:.32}"/></linearGradient>
    <filter id="${id}b"><feGaussianBlur stdDeviation=".7"/></filter></defs>
    <g fill="url(#${id})">${top}<path d="${out}"/></g><path d="${out}" fill="url(#${id}v)"/>${rings}
    <path d="M${king?'25.6 44':'26 48'}C${king?'25 70 25.2 88 23.6 100':'25.4 70 25.4 88 23.8 101'}" fill="none" stroke="#fff" stroke-opacity="${king?.22:.7}" stroke-width="1.6" stroke-linecap="round" filter="url(#${id}b)"/>
    <path d="M${king?'35.6 44':'35.4 48'}C${king?'36.4 70 36.4 88 38 100':'36 70 36 88 37.6 101'}" fill="none" stroke="#fff" stroke-opacity="${king?.12:.25}" stroke-width=".8" stroke-linecap="round" filter="url(#${id}b)"/></svg>`}
// the still life: board in perspective, soft focus far and near, the two pieces with reflections and shadows
const ctScene=(cls='')=>{const u=++ctN;return `<div class="ct-scene ${cls}"><div class="ct-light"></div>
  <div class="ct-persp"><div class="ct-board"><i class="ct-grain"></i></div></div><div class="ct-dof"></div>
  <div class="ct-pair"><i class="ct-sh k"></i><i class="ct-sh q"></i>
    <div class="ct-ref k">${ctPiece('k',u+'r')}</div><div class="ct-ref q">${ctPiece('q',u+'r')}</div>
    <div class="ct-st k">${ctPiece('k',u)}</div><div class="ct-st q">${ctPiece('q',u)}</div></div></div>`};
FAMILY({key:'catur',name:'Catur',meaning:'Chess still life',
  blurb:'A turned ebony king and an ivory queen standing close on a polished board, lit softly in the dark; inside, the day is written as an elegant scoresheet.',
  fonts:{d:"'Cinzel', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    const mv=[[en?'Date':'Tarikh',fmtDate(o.date,o.lang)],[en?'Time':'Masa',[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ')],[en?'Place':'Tempat',o.venue]].filter(r=>r[1]);
    return `<section class="page pg-catur2${ctCls(th)}" style="${ctVars(th)}">${ctScene('pg')}
      <div class="ct-card reveal d1"><div class="ct-in">
        <p class="ct-k kicker">${ev(o,L)}</p><h1 class="ct-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        ${o.hijri?`<p class="ct-hj">${esc(o.hijri)}</p>`:''}
        <ol class="ct-moves">${mv.map(([k,v],i)=>`<li><b>${i+1}.</b><span>${k}</span><em>${esc(v)}</em></li>`).join('')}</ol>
        <p class="ct-res"><b>½ – ½</b><span>${en?'Both win':'Sama-sama menang'}</span></p></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-catur2${ctCls(th)}" style="${ctVars(th)}">${ctScene('cv')}<i class="ct-scrim"></i>
      <div class="ct-top"><p class="ct-k">${ev(o,L)}</p><p class="ct-cn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="ct-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
      <div class="ct-foot">${guest?`<p class="ct-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="ct-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.setAttribute('style',(el.getAttribute('style')||'')+';'+ctVars(th));el.classList.toggle('ct-lite',!!th.c.lite);el.classList.toggle('ct-wood',!!th.c.wood)},
  themes:[
    {k:'marmar',n:'Marmar',desc:'White marble board, soft daylight',c:{ground:'#d9d5ce',sheet:'#f8f5ef',ink:'#2b2b2e',accent:'#3b3f45',gold:'#a88a52',pagefg:'#2b2b2e',sqL:'#f1eee8',sqD:'#8e8b86',lite:1}},
    {k:'kayu',n:'Kayu',desc:'Walnut and maple in lamplight',c:{ground:'#140d08',sheet:'#f3e7d0',ink:'#2e2116',accent:'#7a4a26',gold:'#d4aa60',pagefg:'#eadcc4',sqL:'#b98d5c',sqD:'#3d2414',wood:1}},
    {k:'hitam',n:'Hitam',desc:'Black marble, one low light',c:{ground:'#0b0b0c',sheet:'#f2ede3',ink:'#1d1c1a',accent:'#2a2a2c',gold:'#cfae6c',pagefg:'#e8e1d2',sqL:'#55524e',sqD:'#121213'}},
    {k:'zamrud',n:'Zamrud',desc:'Malachite and ivory in the dark',c:{ground:'#08160f',sheet:'#f2eee3',ink:'#1d2a24',accent:'#1f5a45',gold:'#cfae6a',pagefg:'#e6e2d2',sqL:'#cfc8b6',sqD:'#1d4d3c'}},
    {k:'merah',n:'Merah',desc:'Red lacquer and ivory in the dark',c:{ground:'#17070a',sheet:'#f7eee2',ink:'#2d1c1c',accent:'#7c1c26',gold:'#d4ae6a',pagefg:'#efe0cf',sqL:'#d9cbb6',sqD:'#5e141c'}},
    {k:'nila',n:'Nila',desc:'Blue-grey marble, cool daylight',c:{ground:'#d3d9e2',sheet:'#f8f8f5',ink:'#1e2638',accent:'#24345a',gold:'#a68d5c',pagefg:'#1e2638',sqL:'#eef0f3',sqD:'#5d6b86',lite:1}},
    {k:'gading',n:'Gading',desc:'Ivory and taupe marble, warm daylight',c:{ground:'#e2d9c9',sheet:'#fbf8f1',ink:'#3a3128',accent:'#7d6a52',gold:'#a8854a',pagefg:'#3a3128',sqL:'#f4eee3',sqD:'#a8987e',lite:1}},
    {k:'jambu',n:'Jambu',desc:'Rose quartz marble, soft daylight',c:{ground:'#e8d8d5',sheet:'#fdf8f6',ink:'#3e2a2e',accent:'#94586a',gold:'#a88450',pagefg:'#3e2a2e',sqL:'#f6edeb',sqD:'#bf9a98',lite:1}},
  ]});
function ctVars(th){const c=th.c;return `--sqL:${c.sqL};--sqD:${c.sqD}`+(c.lite?';--lite:1':';--lite:0')}
function ctCls(th){return (th.c.lite?' ct-lite':'')+(th.c.wood?' ct-wood':'')}
