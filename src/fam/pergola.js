/* pergola: a white painted garden arch of fine timber lattice, dripping with Redouté climbing roses (public domain),
   framing a misty Impressionist garden (Hassam, Monet; public domain) softened and blurred into the distance.
   Cover: the names sit in the mist inside the arch; tap "Buka Jemputan" and the arch parts, the garden opening out.
   Page: the arch again, the details inside it. Skin: arch-topped cards with a rose at the crown and a lattice rule. */
const PG_W={anemones:617,'blush-rose':622,'cabbage-rose':581,'forget-me-not':528,hibiscus:619,iris:566,jasmine:518,lotus:621,'pink-rose':674,'red-rose':622,'white-roses':636,'wild-rose':663};
const PG_B={pink:['pink-rose',.5,.1,.27],blush:['blush-rose',.45,.45,.4],blushBud:['blush-rose',.3,.08,.3],cab:['cabbage-rose',.5,.25,.48],wild:['wild-rose',.55,.48,.24],
  wh:['white-roses',.5,.24,.3],wh2:['white-roses',.77,.21,.22],wh3:['white-roses',.47,.45,.26],red:['red-rose',.54,.08,.2],red2:['red-rose',.81,.23,.18],
  leafA:['blush-rose',.3,.7,.5],leafB:['pink-rose',.35,.4,.45],leafC:['white-roses',.3,.72,.5],leafD:['wild-rose',.4,.75,.5],jas:['jasmine',.8,.135,.2]};
const pgBloom=(k,st,cls)=>{const [f,cx,cy,s]=PG_B[k]||PG_B.pink,iw=PG_W[f],z=1/s,r=z*760/iw,px=(cx*z-.5)/(z-1)*100,py=(cy*r-.5)/(r-1)*100;
  return `<i class="pgl-f ${cls||''}" style="${st};background-image:url(${A}flower-${f}.webp);background-size:${(z*100).toFixed(1)}% auto;background-position:${px.toFixed(1)}% ${py.toFixed(1)}%"></i>`};
const g1=n=>n.toFixed(1);
// the arch, viewBox 0 0 300 600: window x 50-250, springing at y 230, posts to y 584
const PG_CX=150,PG_CY=230;
const pgRing=(r1,r2)=>`M${PG_CX-r2} ${PG_CY}A${r2} ${r2} 0 0 1 ${PG_CX+r2} ${PG_CY}L${PG_CX+r1} ${PG_CY}A${r1} ${r1} 0 0 0 ${PG_CX-r1} ${PG_CY}Z`;
const pgArch=uid=>{let lat='',solid='';
  // lattice in the arch band: spokes and a zig-zag
  for(let a=180;a>=0;a-=7.5){const t=a*Math.PI/180;lat+=`<path d="M${g1(PG_CX+106*Math.cos(t))} ${g1(PG_CY-106*Math.sin(t))}L${g1(PG_CX+118*Math.cos(t))} ${g1(PG_CY-118*Math.sin(t))}"/>`}
  let z='';for(let a=180,i=0;a>=0;a-=3.75,i++){const t=a*Math.PI/180,r=i%2?117:107;z+=(i?'L':'M')+g1(PG_CX+r*Math.cos(t))+' '+g1(PG_CY-r*Math.sin(t))}lat+=`<path d="${z}"/>`;
  // lattice in the posts: diagonal trellis
  [[32,44],[256,268]].forEach(([a,b])=>{for(let y=236;y<580;y+=12){lat+=`<path d="M${a} ${y}L${b} ${y+12}M${b} ${y}L${a} ${y+12}"/>`}});
  solid+=`<path d="${pgRing(118,124)}"/><path d="${pgRing(100,106)}"/>`;
  [[26,32],[44,50],[250,256],[268,274]].forEach(([a,b])=>solid+=`<rect x="${a}" y="${PG_CY}" width="${b-a}" height="${584-PG_CY}"/>`);
  for(let y=290;y<580;y+=72)solid+=`<rect x="26" y="${y}" width="24" height="3"/><rect x="250" y="${y}" width="24" height="3"/>`;
  solid+=`<rect x="22" y="582" width="32" height="10" rx="1"/><rect x="246" y="582" width="32" height="10" rx="1"/><rect x="22" y="226" width="32" height="6"/><rect x="246" y="226" width="32" height="6"/>`;
  solid+=`<path d="M150 106V94M144 100Q150 84 156 100Z"/><circle cx="150" cy="90" r="3"/>`;
  return `<svg class="pgl-arch" viewBox="0 0 300 600"><defs><linearGradient id="pgw${uid}" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset=".55" class="w2"/><stop offset="1" class="w3"/></linearGradient>
    <filter id="pgs${uid}" x="-10%" y="-10%" width="130%" height="120%"><feDropShadow dx="2.5" dy="4" stdDeviation="3" flood-opacity=".22"/></filter></defs>
    <g filter="url(#pgs${uid})"><g class="lat">${lat}</g><g class="solid" fill="url(#pgw${uid})">${solid}</g></g></svg>`};
// roses along the arch: angle on the band (deg) or a post point; [where, size % of arch width, bloom]
const pgOnArch=(a,r)=>{const t=a*Math.PI/180;return [(PG_CX+r*Math.cos(t))/3,(PG_CY-r*Math.sin(t))/6]};
const PG_ROSES=[
  // foliage first, under the blooms
  ['a',172,30,'leafA'],['a',140,30,'leafB'],['a',108,26,'leafC'],['a',60,28,'leafD'],['a',30,30,'leafA'],['a',6,28,'leafB'],['p',38,300,26,'leafC'],['p',262,280,24,'leafD'],['p',38,380,22,'leafB'],['p',262,360,22,'leafA'],
  ['a',178,20,'pink'],['a',160,18,'blush'],['a',146,13,'wh2'],['a',130,20,'cab'],['a',116,12,'red2'],['a',98,16,'wh'],['a',84,11,'blushBud'],['a',70,17,'pink'],['a',52,21,'blush'],['a',36,13,'wild'],['a',20,19,'cab'],['a',4,16,'wh3'],
  ['p',36,262,16,'wild'],['p',40,302,13,'pink'],['p',34,340,10,'wh2'],['p',40,392,9,'blushBud'],['p',38,446,7,'red'],
  ['p',264,256,15,'wh'],['p',260,292,12,'pink'],['p',266,334,9,'red2'],['p',262,384,8,'wild'],
  ['p',30,560,14,'leafD'],['p',44,566,12,'pink'],['p',270,560,14,'leafA'],['p',256,566,11,'wh2']];
const pgRoses=side=>PG_ROSES.map((r,i)=>{let x,y,s,k;if(r[0]==='a'){[x,y]=pgOnArch(r[1],112);s=r[2];k=r[3]}else{x=r[1]/3;y=r[2]/6;s=r[3];k=r[4]}
  if(side==='l'&&x>52||side==='r'&&x<48)return'';const leaf=k.startsWith('leaf');
  return pgBloom(k,`left:${g1(x)}%;top:${g1(y)}%;width:${s}%;--r:${((i*37)%30)-15}deg`,leaf?'leaf':'')}).join('');
const pgFrame=uid=>['l','r'].map(s=>`<div class="pgl-half ${s}">${pgArch(uid+s)}${pgRoses(s)}</div>`).join('');
const pgNames=(o,cls)=>{const [n1,n2]=coverNames(o);return `<h1 class="pgl-names ${cls||''}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
const pgWin=c=>`<div class="pgl-win"><i class="pgl-art" style="background-image:url(${A}${c.art});background-position:${c.ap}"></i><i class="pgl-mist"></i></div>`;
const pgDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
FAMILY({key:'pergola',name:'Pergola',meaning:'Rose garden arch',
  blurb:'A white garden arch heavy with climbing roses, framing a soft, misty Impressionist garden, with the names set in the mist inside it. The arch parts to let guests through.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-pergola"><i class="pgl-paper"></i><div class="pgl-stage">${pgWin(th.c)}${pgFrame('p')}
      <div class="pgl-body">
        ${o.bismillah?`<p class="pgl-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="pgl-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${pgNames(o)}</div>
        <p class="pgl-date reveal d2">${esc(pgDay(o))}<b>${esc(fmtDate(o.date,o.lang,false))}</b></p>${o.hijri?`<p class="pgl-hj reveal d2">${esc(o.hijri)}</p>`:''}
        ${t?`<p class="pgl-time reveal d2">${esc(t)}</p>`:''}${o.venue?`<p class="pgl-ven reveal d2">${esc(o.venue)}</p>`:''}
        <div class="pgl-pills reveal d3"><a class="pgl-pill" data-go="when" href="#">${en?'Details':'Butiran'}</a><a class="pgl-pill ghost" data-go="${o.x_rsvp?'rsvp':'loc'}" href="#">${o.x_rsvp?'RSVP':(en?'Directions':'Lokasi')}</a></div>
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-pergola"><i class="pgl-paper"></i><div class="pgl-stage">${pgWin(th.c)}${pgFrame('c')}
      <div class="pgl-cbody"><p class="pgl-k">${ev(o,L)}</p>${pgNames(o,'sm')}<p class="pgl-date"><b>${esc(fmtShort(o.date)).replace(/\./g,' · ')}</b></p>${o.venue?`<p class="pgl-ven">${esc(o.venue)}</p>`:''}
        ${guest?`<p class="pgl-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="pgl-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
    </div></div>`},
  skin(el,o,th,L){K.cards(el);
    const b=PG_B[th.c.crown||'pink'],iw=PG_W[b[0]],z=1/b[3],r=z*760/iw;
    el.style.setProperty('--pgl-img',`url(${A}flower-${b[0]}.webp)`);el.style.setProperty('--pgl-size',`${(z*100).toFixed(1)}% auto`);el.style.setProperty('--pgl-pos',`${((b[1]*z-.5)/(z-1)*100).toFixed(1)}% ${((b[2]*r-.5)/(r-1)*100).toFixed(1)}%`);
    // a couple photo takes the garden's place inside the arch
    const pg=$('.pg-pergola',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const w=$('.pgl-win',pg);img.className='pgl-photo';img.removeAttribute('style');w.classList.add('has-photo');w.closest('.pgl-stage').classList.add('pgl-hasph');w.append(img);ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Pink roses, a misty water garden',c:{ground:'#f3e6e1',sheet:'#fdf8f5',ink:'#3f2e2e',accent:'#9b5560',gold:'#cfa9a6',pagefg:'#3f2e2e',art:'pd-paint-hassam-water.jpg',ap:'50% 30%',crown:'pink'}},
    {k:'gading',n:'Gading',desc:'Ivory, Monet’s iris garden',c:{ground:'#efe9dd',sheet:'#fdfbf5',ink:'#37322a',accent:'#6e5c3e',gold:'#c3b28f',pagefg:'#37322a',art:'pd-paint-monet-irises.jpg',ap:'50% 20%',crown:'wh'}},
    {k:'lavender',n:'Lavender',desc:'Lilac, an iris walk in the mist',c:{ground:'#ebe5f0',sheet:'#fcfafd',ink:'#352f45',accent:'#6c5a8e',gold:'#c0b3d3',pagefg:'#352f45',art:'pd-paint-monet-irises.jpg',ap:'50% 60%',crown:'blush'}},
    {k:'pic',n:'Pic',desc:'Peach, Hassam’s poppy garden',c:{ground:'#f5e7dc',sheet:'#fefaf6',ink:'#41302a',accent:'#a3603f',gold:'#dab79c',pagefg:'#41302a',art:'pd-paint-hassam-island.jpg',ap:'50% 30%',crown:'wild'}},
    {k:'sage',n:'Sage',desc:'Sage, a green lily pond',c:{ground:'#e3e9de',sheet:'#fafcf7',ink:'#2d382c',accent:'#55704c',gold:'#b4c3a6',pagefg:'#2d382c',art:'pd-monet.jpg',ap:'50% 70%',crown:'wh'}},
    {k:'biru',n:'Biru',desc:'Mist blue, a summer meadow',c:{ground:'#e1e8ee',sheet:'#fafcfd',ink:'#28323d',accent:'#4b6886',gold:'#b2c1cf',pagefg:'#28323d',art:'pd-paint-monet-poppies.jpg',ap:'50% 30%',crown:'pink'}},
    {k:'krim',n:'Krim',desc:'Cream, a poppy field',c:{ground:'#efe6d6',sheet:'#fefbf4',ink:'#3a3226',accent:'#87613a',gold:'#cfb68f',pagefg:'#3a3226',art:'pd-paint-monet-poppies.jpg',ap:'50% 70%',crown:'cab'}},
    {k:'senja',n:'Senja',desc:'Dusky rose ground, red roses and a water garden',c:{ground:'#d9b9bc',sheet:'#fdf6f4',ink:'#3e2a2f',accent:'#8d4357',gold:'#c99aa3',pagefg:'#3e2a2f',art:'pd-paint-hassam-water.jpg',ap:'50% 60%',crown:'red'}},
  ]});
