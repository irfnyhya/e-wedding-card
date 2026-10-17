/* catur: a marble (or walnut) chessboard seen in perspective, an ebony king and an ivory queen standing together.
   Opening: the board tilts away into the distance and fades. Page: a scoresheet card, the names set as the two
   players, the date and venue written as moves. Skin: chequered dividers and square-coordinate headings. */
let ctN=0;
const CF=(n,d=1)=>n.toFixed(d);
const ctHex=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16))};
const ctMix=(a,b,t)=>'#'+ctHex(a).map((v,i)=>Math.round(v+(ctHex(b)[i]-v)*t).toString(16).padStart(2,'0')).join('');
// Catmull-Rom through the points; a repeated point makes a crisp corner
function ctCurve(p){let d=`M${CF(p[0][0],2)} ${CF(p[0][1],2)}`;
  for(let i=0;i<p.length-1;i++){const p0=p[i-1]||p[i],p1=p[i],p2=p[i+1],p3=p[i+2]||p2;
    d+=`C${CF(p1[0]+(p2[0]-p0[0])/6,2)} ${CF(p1[1]+(p2[1]-p0[1])/6,2)} ${CF(p2[0]-(p3[0]-p1[0])/6,2)} ${CF(p2[1]-(p3[1]-p1[1])/6,2)} ${CF(p2[0],2)} ${CF(p2[1],2)}`}
  return d}
const ctOutline=half=>{const R=half.map(([x,y])=>[30+x,y]),Lf=half.slice().reverse().map(([x,y])=>[30-x,y]);return ctCurve([...R,...Lf])+'Z'};
// right-hand half profiles (x from the axis, y down), base at y=146
const CT_KING=[[0,15],[5,15],[8.6,17],[10.8,21],[10.8,21],[9.4,24],[7.6,28],[7.2,31],[7.2,31],[10.4,32],[10.4,35.5],[10.4,35.5],[7,36.6],[6.1,42],[5.8,56],[6.4,74],[7.8,92],[9.8,103],[9.8,103],[13.2,105],[13.2,108.6],[13.2,108.6],[10.8,109.6],[12.6,113],[16.4,119],[17.4,122.5],[17.4,122.5],[15.6,124],[19.4,128],[21.4,133],[21.4,137],[21.4,137],[23.4,138],[23.4,143.6],[22.6,146],[0,146]];
const CT_QUEEN=[[0,25],[10.4,22.6],[10.4,22.6],[9.2,27],[7.2,31.5],[7,33.6],[7,33.6],[9.8,34.6],[9.8,38],[9.8,38],[6.6,39],[5.7,46],[5.4,62],[6.1,80],[7.6,96],[9.4,104],[9.4,104],[12.6,106],[12.6,109.4],[12.6,109.4],[10.4,110.4],[12,113.6],[15.4,119],[16.4,122.4],[16.4,122.4],[14.8,124],[18.4,128],[20.4,133],[20.4,137],[20.4,137],[22.4,138],[22.4,143.6],[21.6,146],[0,146]];
const ctRing=(y,r,col,w=.55)=>`<path d="M${CF(30-r)} ${y}Q30 ${CF(y+r*.3)} ${CF(30+r)} ${y}" fill="none" stroke="${col}" stroke-width="${w}"/>`;
function ctPiece(kind,c,uid){const king=kind==='k',body=king?ctMix(c.accent,'#000000',.55):ctMix(c.sheet,'#ffffff',.3),dark=king?'#0b0a0a':ctMix(c.sheet,c.gold,.45),hi=king?ctMix(c.accent,'#ffffff',.28):'#ffffff',g=c.gold,id=`ctg${kind}${uid}`;
  const top=king?`<path d="M30 3.6l2.6 4.4-2.6 2.2-2.6-2.2z" fill="url(#${id})" stroke="${g}" stroke-width=".55"/><circle cx="30" cy="12.4" r="3.4" fill="url(#${id})" stroke="${g}" stroke-width=".55"/>`+
      `<path d="M21.2 20.6h17.6" stroke="${g}" stroke-width=".5"/>${[-7.5,-3.75,0,3.75,7.5].map(x=>`<path d="M${CF(30+x)} 16v4" stroke="${g}" stroke-width=".45"/>`).join('')}`
    :`<circle cx="30" cy="12.6" r="4.4" fill="url(#${id})" stroke="${g}" stroke-width=".55"/>${[-10,-6.6,-3.2,0,3.2,6.6,10].map((x,i)=>`<circle cx="${CF(30+x)}" cy="${CF(21.6-(i%2?0:1.4)-(Math.abs(x)>8?-.6:0))}" r="${i%2?1.3:1.7}" fill="url(#${id})" stroke="${g}" stroke-width=".45"/>`).join('')}`;
  const outline=ctOutline(king?CT_KING:CT_QUEEN);
  const rings=king?ctRing(31,7.2,g)+ctRing(35.5,10.4,g)+ctRing(103,9.8,g)+ctRing(108.6,13.2,g)+ctRing(122.5,17.4,g)+ctRing(137,21.4,g)
    :ctRing(33.6,7,g)+ctRing(38,9.8,g)+ctRing(104,9.4,g)+ctRing(109.4,12.6,g)+ctRing(122.4,16.4,g)+ctRing(137,20.4,g);
  return `<svg class="catur-pc ${kind}" viewBox="0 0 60 150" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="${dark}"/><stop offset=".3" stop-color="${hi}"/><stop offset=".52" stop-color="${body}"/><stop offset="1" stop-color="${dark}"/></linearGradient></defs>
   <path d="${outline}" fill="url(#${id})" stroke="${g}" stroke-width=".7"/>${top}${rings}
   <path d="M${king?'25 44':'25.4 48'}C${king?'24.4 70 24.6 88 23 100':'24.8 70 24.8 88 23.2 101'}" fill="none" stroke="#fff" stroke-opacity="${king?.18:.5}" stroke-width="1.4" stroke-linecap="round"/></svg>`}
// small flat piece icons for notation (king and queen heads)
const ctIcon=(kind,col)=>`<svg class="catur-ic" viewBox="0 0 60 150" aria-hidden="true"><path d="${ctOutline(kind==='k'?CT_KING:CT_QUEEN)}" fill="${col}"/>${kind==='k'?`<circle cx="30" cy="12.4" r="3.6" fill="${col}"/><path d="M30 3l3 5-3 2.4-3-2.4z" fill="${col}"/>`:`<circle cx="30" cy="12.6" r="4.6" fill="${col}"/>`}</svg>`;
const ctChecks=(a,b,s=8)=>svgUriSq(`<svg ${NS} width="${s*2}" height="${s*2}" viewBox="0 0 2 2"><rect width="2" height="2" fill="${b}"/><path d="M0 0h1v1H0zM1 1h1v1H1z" fill="${a}"/></svg>`);
const ROM=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];

FAMILY({key:'catur',name:'Catur',meaning:'Chess checkmate',
  blurb:'An ebony king and an ivory queen on a marble chessboard; the board tilts away and the game is written as a scoresheet. Checkmate.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1350,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',d=new Date((o.date||'2026-01-01')+'T00:00:00'),ok=!isNaN(d);
    const dt=ok?`${d.getDate()} · ${ROM[d.getMonth()]} · ${d.getFullYear()}`:'';
    const mv=(n,a,b)=>`<li><b>${n}.</b><span>${a}</span><em>${b}</em></li>`;
    return `<section class="page pg-catur" style="--chk:${ctChecks(c.accent,c.sheet)};--chk2:${ctChecks(c.gold,'transparent',6)}"><div class="catur-floor"></div>
    <div class="catur-sheet reveal"><div class="catur-band"></div>
     <div class="catur-diag"><div class="catur-dsq"></div><span class="catur-dp q">${ctIcon('q',c.sheet)}</span><span class="catur-dp k">${ctIcon('k',c.ink)}</span></div>
     <p class="kicker">${ev(o,L)}</p>
     <div class="catur-pl"><span class="catur-sq">${en?'White':'Putih'} · d1</span><h1 class="names">${esc(n1)}</h1></div>
     <p class="catur-vs"><i></i><span>${en?'and':'dan'}</span><i></i></p>
     <div class="catur-pl"><h1 class="names">${esc(n2)}</h1><span class="catur-sq">${en?'Black':'Hitam'} · e8</span></div>
     <ol class="catur-moves">${mv(1,en?'Date':'Tarikh',esc(dt))}${mv(2,en?'Time':'Masa',esc(fmtTime(o.start,o.lang)))}${mv(3,en?'Venue':'Gelanggang',esc(o.venue))}</ol>
     <p class="catur-mate"><b>${en?'Checkmate':'Skak mat'}</b><span>½ – ½</span></p>
     <p class="catur-note">${en?'A drawn game: both hearts win.':'Seri: kedua-dua hati menang.'}</p>
     <div class="catur-band b"></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u=++ctN;
    const files='abcdefgh'.split('').map(f=>`<i>${f}</i>`).join(''),ranks=[8,7,6,5,4,3,2,1].map(r=>`<i>${r}</i>`).join('');
    return `<div class="cover cv-catur" style="--chk:${ctChecks(c.accent,c.sheet)};--frame:${c.frame}"><div class="catur-floor"></div>
    <div class="catur-head"><p class="catur-k">${ev(o,L)}</p><p class="catur-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p>
     <p class="catur-line"><i></i><b>${en?'Checkmate':'Skak Mat'}</b><i></i></p><p class="catur-sub">${en?'two hearts, one final move':'dua hati, satu langkah terakhir'}</p></div>
    <div class="catur-scene"><div class="catur-board ${th.c.tx||'marble'}">
      <i class="catur-vein"></i><div class="catur-sqs"></div><div class="catur-files">${files}</div><div class="catur-ranks">${ranks}</div>
      <i class="catur-sh q"></i><i class="catur-sh k"></i></div>
      <div class="catur-at k">${ctPiece('k',c,u)}</div><div class="catur-at q">${ctPiece('q',c,u)}</div></div>
    <${tag} class="catur-tap" ${attr} aria-label="${L.open}"></${tag}>
    <div class="catur-foot">${guest?`<p class="catur-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="catur-hint">${en?'Touch the board to begin':'Sentuh papan untuk bermula'}</p></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--chk',ctChecks(c.accent,c.sheet));el.style.setProperty('--chk2',ctChecks(c.gold,'transparent',5));
    const sq=['e4','d5','c6','f3','g2','b7','h1','a8','e2','d7','f6'];
    $$('.sec',el).forEach((s,i)=>{s.classList.add('catur-sec');const h=$('h2',s);if(!h)return;h.insertAdjacentHTML('afterbegin',`<em class="catur-co">${sq[i%sq.length]}</em>`)})},
  themes:[
    {k:'marmar',n:'Marmar',desc:'White and grey marble, gold inlay',c:{ground:'#e7e3dc',sheet:'#f7f4ee',ink:'#2b2b2e',accent:'#3b3f45',gold:'#b8995a',pagefg:'#2b2b2e',frame:'#d6d0c6'}},
    {k:'kayu',n:'Kayu',desc:'Walnut and maple on a dark table',c:{ground:'#24180f',sheet:'#f1e2c6',ink:'#2e2116',accent:'#6b3f22',gold:'#d4aa60',pagefg:'#f0e3cc',frame:'#3d2414',tx:'wood'}},
    {k:'hitam',n:'Hitam',desc:'Black marble with bright gold',c:{ground:'#141414',sheet:'#f0eadf',ink:'#1d1c1a',accent:'#232325',gold:'#d6b065',pagefg:'#ece2cc',frame:'#1c1c1d'}},
    {k:'zamrud',n:'Zamrud',desc:'Malachite green, gold rules',c:{ground:'#0f2a22',sheet:'#f2eee3',ink:'#1d2a24',accent:'#1f5a45',gold:'#d2ac60',pagefg:'#eee6d2',frame:'#15392d'}},
    {k:'merah',n:'Merah',desc:'Red lacquer and ivory',c:{ground:'#3a1015',sheet:'#f7eee2',ink:'#2d1c1c',accent:'#7c1c26',gold:'#d8b26b',pagefg:'#f3e4d0',frame:'#2a0b0f'}},
    {k:'nila',n:'Nila',desc:'Navy marble on pale stone',c:{ground:'#e1e5ec',sheet:'#f8f7f3',ink:'#1e2638',accent:'#24345a',gold:'#b8975a',pagefg:'#24345a',frame:'#cdd3de'}},
    {k:'gading',n:'Gading',desc:'Ivory and taupe, soft gold',c:{ground:'#eee7da',sheet:'#fbf8f1',ink:'#3a3128',accent:'#8a7864',gold:'#ac8648',pagefg:'#4a3f33',frame:'#e0d6c3'}},
    {k:'jambu',n:'Jambu',desc:'Rose quartz and champagne',c:{ground:'#f1e2e0',sheet:'#fdf8f6',ink:'#3e2a2e',accent:'#a1636b',gold:'#b08950',pagefg:'#4b3236',frame:'#e8d2ce'}},
  ]});
