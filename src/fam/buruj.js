/* buruj: an engraved star chart under a brass astrolabe (pierced rete, engraved limb scale, throne and shackle).
   Opening: the rete turns a quarter on its pin and the astrolabe fades off the chart. Page: a planisphere of the
   sky round the names. Skin: chart-grid cards, a small constellation on each heading, dotted star lines between cards.
   Constellations carry their Malay names: Belantik (Orion), Pari (the Southern Cross), Biduk (the Plough). */
let uid=0;
const f=v=>(+v).toFixed(1);
const dark=c=>{const h=c.ground.replace('#','');const [r,g,b]=[0,2,4].map(i=>parseInt(h.substr(i,2),16));return (r*.3+g*.59+b*.11)<110};
const vars=c=>`--chart:${c.chart};--brjn:${dark(c)?c.gold:c.accent}`;
const pol=(cx,cy,r,deg)=>{const a=(deg-90)*Math.PI/180;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r]};
// constellations: stars [x,y,size] and the lines between them (indices)
const CONS={
  belantik:{s:[[0,0,2.2],[30,4,1.6],[10,34,1],[15,36,1],[20,38,1],[-2,70,1.6],[30,72,2.1],[16,-16,.9]],e:[[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[0,7],[1,7]]},
  pari:{s:[[0,0,1.7],[0,40,2],[-16,18,1.5],[18,16,1.3],[6,26,.8]],e:[[0,1],[2,3]]},
  biduk:{s:[[0,0,1.6],[22,-4,1.5],[44,-2,1.4],[62,6,1.3],[64,30,1.6],[88,30,1.5],[90,6,1.4]],e:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]},
  cass:{s:[[0,0,1.4],[14,14,1.5],[28,4,1.6],[42,18,1.3],[56,8,1.2]],e:[[0,1],[1,2],[2,3],[3,4]]},
  cygnus:{s:[[0,0,1.9],[0,22,1.3],[0,44,1.1],[0,64,1.2],[-22,18,1.1],[22,26,1.1]],e:[[0,1],[1,2],[2,3],[4,1],[1,5]]},
  lyra:{s:[[0,0,2],[6,12,.9],[2,22,.9],[12,26,.9],[14,14,.9]],e:[[0,1],[1,2],[2,3],[3,4],[4,1]]},
};
function cons(name,x,y,sc,rot,col,label,lab){const C=CONS[name],P=C.s.map(([a,b,m])=>{const r=rot*Math.PI/180;return [x+(a*Math.cos(r)-b*Math.sin(r))*sc,y+(a*Math.sin(r)+b*Math.cos(r))*sc,m]});
  let s=C.e.map(([i,j])=>`<path d="M${f(P[i][0])} ${f(P[i][1])}L${f(P[j][0])} ${f(P[j][1])}"/>`).join('');
  s=`<g stroke="${col}" stroke-width=".6" stroke-dasharray="2 1.6" opacity=".75">${s}</g>`;
  s+=P.map(([a,b,m])=>`<circle cx="${f(a)}" cy="${f(b)}" r="${f(m*1.15)}" fill="${col}"/>${m>1.7?`<path d="M${f(a)} ${f(b-m*3.2)}V${f(b+m*3.2)}M${f(a-m*3.2)} ${f(b)}H${f(a+m*3.2)}" stroke="${col}" stroke-width=".4"/>`:''}`).join('');
  if(label)s+=`<text x="${f(x+lab[0])}" y="${f(y+lab[1])}" font-size="7.5" font-style="italic" fill="${col}" opacity=".85" letter-spacing=".6">${label}</text>`;
  return s}
function dust(w,h,n,seed,col){const r=rng(seed);let s='';for(let i=0;i<n;i++)s+=`<circle cx="${f(r()*w)}" cy="${f(r()*h)}" r="${(.3+r()*r()*.9).toFixed(2)}" fill="${col}" opacity="${(.3+r()*.5).toFixed(2)}"/>`;return s}
// the full-bleed chart on the cover: polar grid, ecliptic, constellations with labels
function chartSvg(c,id){const col=c.chart,W=390,H=760,cx=195,cy=400;let g='';
  for(let r=70;r<=560;r+=70)g+=`<circle cx="${cx}" cy="${cy}" r="${r}" ${r%140?'stroke-dasharray="1 3"':''}/>`;
  for(let a=0;a<360;a+=15){const [x,y]=pol(cx,cy,620,a),[x0,y0]=pol(cx,cy,a%45?70:20,a);g+=`<path d="M${f(x0)} ${f(y0)}L${f(x)} ${f(y)}" ${a%45?'stroke-dasharray="1 3"':''}/>`}
  return `<svg class="brj-chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
   <g fill="none" stroke="${col}" stroke-width=".5" opacity=".5">${g}<ellipse cx="${cx}" cy="${cy-30}" rx="300" ry="250" stroke-width=".8" stroke-dasharray="6 2 1 2" transform="rotate(-18 ${cx} ${cy})"/></g>
   <g opacity=".55">${dust(W,H,140,id*7+3,col)}</g>
   ${cons('biduk',34,96,1,8,col,'Biduk',[2,30])}${cons('cass',272,92,1,-10,col,'Cassiopeia',[0,36])}
   ${cons('belantik',326,636,.78,6,col,'Belantik',[-58,30])}${cons('pari',44,640,.85,-12,col,'Pari',[20,48])}
   ${cons('cygnus',336,270,.9,20,col,'',[0,0])}${cons('lyra',30,300,1,0,col,'Vega',[12,4])}</svg>`}
// brass astrolabe: throne + shackle, limb with engraved scale, plate engraving, pierced rete, rule, pin
function astrolabe(c,id){const C=[150,196],R=142,b=`url(#ab${id})`,bh=`url(#ah${id})`,ink=c.engr;
  let ticks='',nums='';for(let i=0;i<120;i++){const d=i*3,long=d%30===0,mid=d%15===0,[x0,y0]=pol(...C,R-(long?7:mid?5:3),d),[x1,y1]=pol(...C,R-.5,d);ticks+=`<path d="M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}" stroke-width="${long?.9:.5}"/>`}
  for(let d=30;d<=360;d+=30){const [x,y]=pol(...C,R-11.5,d);nums+=`<text x="${f(x)}" y="${f(y)}" transform="rotate(${d%360} ${f(x)} ${f(y)})" text-anchor="middle" dominant-baseline="central" font-size="6">${d}</text>`}
  // plate: tropics, almucantars round the zenith, azimuth arcs, unequal hour lines
  let pl=`<circle cx="${C[0]}" cy="${C[1]}" r="120"/><circle cx="${C[0]}" cy="${C[1]}" r="79"/><circle cx="${C[0]}" cy="${C[1]}" r="52"/>`;
  for(let i=0;i<9;i++){const t=i/9,r=118*(1-t)+5*t,cy=C[1]-44*t+(1-t)*14;pl+=`<circle cx="${C[0]}" cy="${f(cy)}" r="${f(r)}" ${i?'':'stroke-width=".9"'}/>`}
  for(let i=-4;i<=4;i++)if(i)pl+=`<path d="M150 ${C[1]-44}Q${f(150+i*30)} ${C[1]-10} ${f(150+i*22)} ${C[1]+70}"/>`;
  for(let i=1;i<6;i++)pl+=`<path d="M${f(30+i*6)} ${C[1]+40}Q150 ${f(C[1]+40+i*14)} ${f(270-i*6)} ${C[1]+40}" stroke-dasharray="2 1.5"/>`;
  // rete: Capricorn ring, eccentric ecliptic with ticks, equinoctial bars, flame star-pointers, scroll struts
  const ecy=C[1]-34;let et='';for(let i=0;i<72;i++){const [x0,y0]=pol(150,ecy,82,i*5),[x1,y1]=pol(150,ecy,i%6?84.5:86,i*5);et+=`<path d="M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}"/>`}
  const ptr=(deg,r0,r1,bend)=>{const [x0,y0]=pol(...C,r0,deg),[x1,y1]=pol(...C,r1,deg+bend),[xa,ya]=pol(...C,r0,deg-3),[xb,yb]=pol(...C,r0,deg+3),[xm,ym]=pol(...C,(r0+r1)/2,deg+bend*1.6);
    return `<path d="M${f(xa)} ${f(ya)}Q${f(xm)} ${f(ym)} ${f(x1)} ${f(y1)}Q${f(xm)} ${f(ym)} ${f(xb)} ${f(yb)}Z"/><circle cx="${f(x1)}" cy="${f(y1)}" r="1.3" fill="${c.engr}" stroke="none"/>`};
  const pts=[[20,114,92,8],[64,114,96,-10],[112,114,90,9],[150,114,98,-7],[205,114,92,10],[248,114,96,-9],[292,114,90,7],[330,114,100,-8],[38,52,70,12],[200,52,66,-12]].map(a=>ptr(...a)).join('');
  const strut=(deg,s)=>{const [x0,y0]=pol(...C,117,deg),[x1,y1]=pol(...C,66,deg+s*16),[xm,ym]=pol(...C,96,deg-s*14);return `<path d="M${f(x0)} ${f(y0)}Q${f(xm)} ${f(ym)} ${f(x1)} ${f(y1)}" fill="none" stroke-width="2.6"/>`};
  const struts=[95,265,175].map((d,i)=>strut(d,i%2?1:-1)).join('');
  const rete=`<g class="brj-rete">
    <g fill="none" stroke="${bh}" ><circle cx="${C[0]}" cy="${C[1]}" r="117" stroke-width="5.5"/><circle cx="150" cy="${ecy}" r="84" stroke-width="7"/>
     <path d="M33 ${C[1]}H267M150 ${C[1]}V313" stroke-width="3.4"/>${struts}</g>
    <g fill="none" stroke="${ink}" stroke-width=".5"><circle cx="${C[0]}" cy="${C[1]}" r="119.8"/><circle cx="${C[0]}" cy="${C[1]}" r="114.2"/><circle cx="150" cy="${ecy}" r="87.5"/><circle cx="150" cy="${ecy}" r="80.5"/>${et}</g>
    <g fill="${bh}" stroke="${ink}" stroke-width=".5">${pts}</g>
    <circle cx="150" cy="${ecy-84}" r="3.4" fill="${bh}" stroke="${ink}" stroke-width=".5"/></g>`;
  const rule=`<g class="brj-rule" transform="rotate(-32 ${C[0]} ${C[1]})"><path d="M150 ${C[1]-3.5}L${150+128} ${C[1]}L150 ${C[1]+3.5}L${150-128} ${C[1]}Z" fill="${b}" stroke="${ink}" stroke-width=".5"/><path d="M${150-118} ${C[1]}H${150+118}" stroke="${ink}" stroke-width=".4" opacity=".6"/></g>`;
  const throne=`<path d="M112 72C118 56 132 52 138 40C141 33 146 30 150 22C154 30 159 33 162 40C168 52 182 56 188 72Z" fill="${b}" stroke="${ink}" stroke-width=".6"/>
    <path d="M124 68C130 58 140 54 144 46C146 42 148 40 150 34C152 40 154 42 156 46C160 54 170 58 176 68" fill="none" stroke="${ink}" stroke-width=".5"/>
    <circle cx="150" cy="54" r="6" fill="${c.ground}" stroke="${ink}" stroke-width=".6"/><circle cx="141" cy="62" r="2.4" fill="${c.ground}"/><circle cx="159" cy="62" r="2.4" fill="${c.ground}"/>
    <ellipse cx="150" cy="14" rx="9.5" ry="10.5" fill="none" stroke="${b}" stroke-width="3.2"/><ellipse cx="150" cy="14" rx="9.5" ry="10.5" fill="none" stroke="${ink}" stroke-width=".4" opacity=".6"/><rect x="146.5" y="22" width="7" height="6" rx="1.5" fill="${b}" stroke="${ink}" stroke-width=".5"/>`;
  return `<svg class="brj-astro" viewBox="0 0 300 345"><defs>
   <linearGradient id="ab${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.b1}"/><stop offset=".28" stop-color="${c.b2}"/><stop offset=".52" stop-color="${c.b1}"/><stop offset=".78" stop-color="${c.b3}"/><stop offset="1" stop-color="${c.b2}"/></linearGradient>
   <linearGradient id="ah${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.b1}"/><stop offset=".6" stop-color="${c.b2}"/><stop offset="1" stop-color="${c.b3}"/></linearGradient>
   <radialGradient id="ap${id}" cx="42%" cy="36%" r="70%"><stop offset="0" stop-color="${c.b3}"/><stop offset=".75" stop-color="${c.b4}"/><stop offset="1" stop-color="${c.b4}"/></radialGradient>
   <clipPath id="ac${id}"><circle cx="${C[0]}" cy="${C[1]}" r="120"/></clipPath></defs>
   ${throne}
   <circle cx="${C[0]}" cy="${C[1]}" r="${R+3}" fill="${b}" stroke="${ink}" stroke-width=".7"/>
   <circle cx="${C[0]}" cy="${C[1]}" r="${R-16}" fill="url(#ap${id})" stroke="${ink}" stroke-width=".7"/>
   <circle cx="${C[0]}" cy="${C[1]}" r="${R-16}" fill="none" stroke="${c.b1}" stroke-width=".6" opacity=".5" transform="translate(.8 .8)"/>
   <g fill="none" stroke="${ink}"><circle cx="${C[0]}" cy="${C[1]}" r="${R}" stroke-width=".5"/><circle cx="${C[0]}" cy="${C[1]}" r="${R-7.5}" stroke-width=".4"/>${ticks}</g>
   <g fill="${ink}" font-family="'Cormorant Garamond',serif" font-weight="600">${nums}</g>
   <g fill="none" stroke="${c.b1}" stroke-width=".45" opacity=".55" clip-path="url(#ac${id})">${pl}</g>
   ${rete}${rule}
   <circle cx="${C[0]}" cy="${C[1]}" r="7" fill="${bh}" stroke="${ink}" stroke-width=".6"/><circle cx="${C[0]}" cy="${C[1]}" r="2.2" fill="${ink}" opacity=".7"/>
   <path d="M150 ${C[1]-4}l10-2v4z" fill="${c.b3}" stroke="${ink}" stroke-width=".4"/></svg>`}
// planisphere for the front page: graduated ring, grid, constellations round a clear centre
function planisphere(c,id){const col=c.chart,C=[200,200];let t='',n='',g='';
  for(let i=0;i<180;i++){const d=i*2,L=d%30===0?8:d%10===0?5:2.6,[x0,y0]=pol(...C,190-L,d),[x1,y1]=pol(...C,190,d);t+=`<path d="M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}" stroke-width="${d%30?.4:.8}"/>`}
  for(let d=0;d<360;d+=30){const [x,y]=pol(...C,174,d);n+=`<text x="${f(x)}" y="${f(y)}" transform="rotate(${d} ${f(x)} ${f(y)})" text-anchor="middle" dominant-baseline="central" font-size="8">${d||360}</text>`}
  for(let r=110;r<=160;r+=25)g+=`<circle cx="200" cy="200" r="${r}" stroke-dasharray="1 2.5"/>`;
  for(let a=0;a<360;a+=30){const [x0,y0]=pol(...C,104,a),[x1,y1]=pol(...C,166,a);g+=`<path d="M${f(x0)} ${f(y0)}L${f(x1)} ${f(y1)}" stroke-dasharray="1 2.5"/>`}
  return `<svg class="brj-plan" viewBox="0 0 400 400"><g fill="none" stroke="${col}"><circle cx="200" cy="200" r="196" stroke-width="1.2"/><circle cx="200" cy="200" r="192" stroke-width=".5"/><circle cx="200" cy="200" r="190" stroke-width=".5"/>${t}<circle cx="200" cy="200" r="166" stroke-width=".8"/><circle cx="200" cy="200" r="104" stroke-width=".8"/><circle cx="200" cy="200" r="100" stroke-width=".4"/></g>
   <g fill="${col}" font-family="'Cormorant Garamond',serif">${n}</g><g fill="none" stroke="${col}" stroke-width=".5" opacity=".6">${g}</g>
   <g opacity=".6">${dust(400,400,90,id+31,col).replace(/<circle cx="(\d+\.\d)" cy="(\d+\.\d)"/g,(m,x,y)=>{const d=Math.hypot(x-200,y-200);return d<108||d>164?'<circle cx="-9" cy="-9"':m})}</g>
   ${cons('biduk',118,60,.9,30,col,'',[0,0])}${cons('cass',268,72,.9,40,col,'',[0,0])}${cons('belantik',300,232,.85,-20,col,'',[0,0])}${cons('pari',96,250,.9,30,col,'',[0,0])}${cons('cygnus',236,320,.7,70,col,'',[0,0])}${cons('lyra',58,152,.9,0,col,'',[0,0])}</svg>`}
const CONST_H=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 20"><g fill="none" stroke="#000" stroke-width=".8" stroke-dasharray="1.6 1.4"><path d="M4 14L18 6L32 12L44 4L56 10"/></g><g fill="#000"><circle cx="4" cy="14" r="1.6"/><circle cx="18" cy="6" r="2.2"/><circle cx="32" cy="12" r="1.5"/><circle cx="44" cy="4" r="1.9"/><circle cx="56" cy="10" r="1.4"/></g></svg>`);
const LINK=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"><g fill="none" stroke="#000" stroke-width=".8" stroke-dasharray="2 2"><path d="M100 0L84 18L112 30L92 44L100 60"/></g><g fill="#000"><circle cx="84" cy="18" r="2.4"/><circle cx="112" cy="30" r="3"/><circle cx="92" cy="44" r="2"/><path d="M112 22v16M104 30h16" stroke="#000" stroke-width=".6"/></g></svg>`);
FAMILY({key:'buruj',name:'Buruj',meaning:'Star chart',
  blurb:'A brass astrolabe with a pierced rete lies on an engraved star chart; touch it and the rete turns.',
  fonts:{d:"'IM Fell English SC', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    return `<section class="page pg-buruj ${dark(c)?'brj-dk':''}" style="${vars(c)}"><div class="brj-paper"></div><div class="brj-edge"></div>
     <p class="brj-k reveal">${ev(o,L)}</p>
     <div class="brj-pw reveal">${planisphere(c,id)}<div class="brj-mid"><h1 class="names">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1></div></div>
     <div class="brj-meta reveal d2"><p class="brj-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="brj-hj">${esc(o.hijri)}</p>`:''}
      <div class="brj-dots"></div><p class="brj-ven">${esc(o.venue)}</p><p class="brj-time">${en?'From':'Mulai'} ${esc(fmtTime(o.start,o.lang))}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    return `<div class="cover cv-buruj ${dark(c)?'brj-dk':''}" style="${vars(c)}"><div class="brj-paper"></div>${chartSvg(c,id)}<div class="brj-edge"></div>
     <div class="brj-head brj-fade"><p class="brj-k">${ev(o,L)}</p><p class="brj-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div>
     <${tag} class="brj-btn" ${attr} aria-label="${L.open}">${astrolabe(c,id)}</${tag}>
     <div class="brj-foot brj-fade"><p class="brj-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="brj-hj">${esc(o.hijri)}</p>`:''}
      ${guest?`<p class="brj-to"><span>${L.dear}</span><b>${esc(guest)}</b></p>`:''}<p class="brj-hint">${en?'Touch the astrolabe to open':'Sentuh astrolab untuk membuka'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--chart',th.c.chart);el.style.setProperty('--brjn',dark(th.c)?th.c.gold:th.c.accent);el.style.setProperty('--brj-h',CONST_H);el.style.setProperty('--brj-link',LINK);
    $$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(h&&!$('.brj-h',h))h.insertAdjacentHTML('beforebegin','<i class="brj-h" aria-hidden="true"></i>');
      s.insertAdjacentHTML('afterbegin',`<i class="brj-no" aria-hidden="true">${String(i+1).padStart(2,'0')} · ${['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][i%12]}</i>`);
      if(i)s.insertAdjacentHTML('beforebegin','<div class="brj-link" aria-hidden="true"></div>')})},
  themes:[
    {k:'kertas',n:'Kertas',desc:'Parchment chart, navy ink, brass',c:{ground:'#e9dfc8',sheet:'#f8f2e2',ink:'#22283a',accent:'#1f3358',gold:'#9a7432',pagefg:'#22283a',chart:'#2c3a5c',engr:'#3e2a10',b1:'#f6e3a6',b2:'#c99b4b',b3:'#8b6226',b4:'#5e3f17'}},
    {k:'malam',n:'Malam',desc:'Midnight chart in gold line',c:{ground:'#111c33',sheet:'#f5efe0',ink:'#1d2336',accent:'#1f3358',gold:'#d2ab5c',pagefg:'#efe6cf',chart:'#c9a75e',engr:'#3a2610',b1:'#f8e5aa',b2:'#cfa050',b3:'#8e6427',b4:'#5a3c15',line:'rgba(31,51,88,.2)'}},
    {k:'nila',n:'Nila',desc:'Indigo chart with silver lines',c:{ground:'#20224f',sheet:'#f3f2f7',ink:'#1f2140',accent:'#33307a',gold:'#b8bccb',pagefg:'#ecebf6',chart:'#b9bdd6',engr:'#2a2c3a',b1:'#f4f5f8',b2:'#b8bcc8',b3:'#7d8292',b4:'#4c505e',line:'rgba(51,48,122,.2)'}},
    {k:'krim',n:'Krim',desc:'Ivory paper in sepia ink',c:{ground:'#f1e8d8',sheet:'#fbf6ec',ink:'#3a2a1e',accent:'#6e3b1f',gold:'#a27a3a',pagefg:'#3a2a1e',chart:'#7a4a26',engr:'#3a2410',b1:'#f3dfa0',b2:'#c39448',b3:'#865d24',b4:'#573a14'}},
    {k:'zamrud',n:'Zamrud',desc:'Green-black chart, old brass',c:{ground:'#0f2721',sheet:'#f3efe2',ink:'#1a2621',accent:'#1c4d3d',gold:'#cfae64',pagefg:'#ecebdc',chart:'#c2a865',engr:'#33240f',b1:'#efdca0',b2:'#bf9548',b3:'#7f5a22',b4:'#4f3812',line:'rgba(28,77,61,.2)'}},
    {k:'marun',n:'Marun',desc:'Oxblood chart and rose brass',c:{ground:'#3b1420',sheet:'#fbf2ea',ink:'#2e1a1e',accent:'#7a1e34',gold:'#d4a27a',pagefg:'#f6e6dc',chart:'#d4a27a',engr:'#3e1e12',b1:'#f7dcc0',b2:'#cf9a72',b3:'#8e5a3a',b4:'#5a3422',line:'rgba(122,30,52,.2)'}},
    {k:'laut',n:'Laut',desc:'Sea-blue chart on pale paper',c:{ground:'#dbe5ea',sheet:'#fafcfb',ink:'#1b2d3c',accent:'#1f4b6b',gold:'#8f6d35',pagefg:'#1b2d3c',chart:'#2a5a7a',engr:'#3a2810',b1:'#f4e2a8',b2:'#c79a4c',b3:'#8a6226',b4:'#5c3f16',line:'rgba(31,75,107,.2)'}},
    {k:'hitam',n:'Hitam',desc:'Black chart, bright brass',c:{ground:'#0e0e10',sheet:'#f2ede3',ink:'#18181b',accent:'#3a2f1e',gold:'#d6b064',pagefg:'#ede6d5',chart:'#cdb071',engr:'#2e2010',b1:'#fbe8ad',b2:'#d2a452',b3:'#916626',b4:'#5b3e14',line:'rgba(58,47,30,.22)'}},
  ]});
