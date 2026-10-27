/* marmar: a polished marble tablet lying on linen, the names cut into it and gilded.
   The stone is the marble texture stretched along the grain and tinted, with a few long diagonal veins that branch and fade; four colourways carry a thread of gold.
   Cover: tap "Buka Jemputan" and the tablet lifts towards you, then the page settles.
   Page: the tablet with three small marble coasters (details, RSVP, location). Skin: thin polished stone cards. */
// veins: a few long veins running one way down the diagonal, wandering a little, branching and fading;
// each is a cloudy halo, a sharp core whose weight and strength change along its length, and some hairline cracks
function mmVeinSvg(seed,col,gold){const r=rng(seed),W=400,H=570,cl=v=>v.toFixed(1);let soft='',core='',crack='',gl='';
  const walk=(x,y,a,len,step=12)=>{const p=[[x,y]];let d=0;for(let i=0;i<len/step;i++){d=d*.8+(r()-.5)*.22;a+=d*.35+(r()-.5)*.06;x+=Math.cos(a)*step;y+=Math.sin(a)*step;p.push([x,y])}return p};
  const pl=p=>p.map(q=>cl(q[0])+' '+cl(q[1])).join(' ');
  const veinCore=(p,w0)=>{let ph=r()*6,o='';for(let i=1;i<p.length;i++){const t=i/p.length,str=Math.max(0,Math.sin(t*3.2+ph)*.5+.5*Math.sin(t*7+ph*2)),
      w=w0*(.25+str*.9)*Math.min(1,t*6,(1-t)*6+.2),op=.15+.85*str*str;if(op<.12)continue;
      o+=`<path d="M${cl(p[i-1][0])} ${cl(p[i-1][1])}L${cl(p[i][0])} ${cl(p[i][1])}" stroke-width="${w.toFixed(2)}" stroke-opacity="${op.toFixed(2)}"/>`}return o};
  const n=2+Math.floor(r()*2),base=1.02+(r()-.5)*.12;   // mostly one direction: about 58 degrees down to the right
  let first=null;
  for(let k=0;k<n;k++){const x0=-60+(k+r()*.8)*(W*.85/n),y0=-30-r()*60,p=walk(x0,y0,base+(r()-.5)*.14,H*1.35);if(!first||Math.abs(x0-W*.15)<Math.abs(first[0][0]-W*.15))first=p;
    soft+=`<polyline points="${pl(p)}" stroke-width="${cl(10+r()*14)}" stroke-opacity="${(.18+r()*.14).toFixed(2)}"/>`;
    core+=veinCore(p,1.4+r()*1.2);
    // one or two branches that split off, run at a shallower angle and fade out
    const nb=1+Math.floor(r()*2);for(let j=0;j<nb;j++){const at=p[Math.floor(p.length*(.2+r()*.55))],q=walk(at[0],at[1],base+(r()<.5?-.5:.45),60+r()*110,9);
      soft+=`<polyline points="${pl(q)}" stroke-width="6" stroke-opacity=".12"/>`;core+=veinCore(q,.8)}}
  for(let k=0;k<3;k++){const p=walk(r()*W,-20,base+(r()-.5)*.25,H*1.2,16);crack+=`<polyline points="${pl(p)}" stroke-width=".45" stroke-opacity="${(.25+r()*.25).toFixed(2)}"/>`}
  if(gold&&first){const s0=Math.floor(first.length*(.15+r()*.2)),seg=first.slice(s0,s0+Math.floor(first.length*.4));gl=veinCore(seg.map(q=>[q[0]+2.5,q[1]-1]),1.1)}
  const svg=g=>K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs><filter id="b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="7"/></filter>
    <filter id="e" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="3.5"/><feGaussianBlur stdDeviation=".25"/></filter></defs>${g}</svg>`);
  return {veins:svg(`<g fill="none" stroke="${col}" stroke-linecap="round" stroke-linejoin="round"><g filter="url(#b)">${soft}</g><g filter="url(#e)">${core}${crack}</g></g>`),
    gold:gold?svg(`<g fill="none" stroke="#000" stroke-linecap="round" filter="url(#e)">${gl}</g>`):'none'}}
const MM_V={};const mmV=c=>MM_V[c.seed]||(MM_V[c.seed]=mmVeinSvg(c.seed,c.vein,c.goldv));
const mmStoneVars=c=>`--stone:${c.sheet};--veins:${mmV(c).veins};--gveins:${mmV(c).gold}`;
const mmMono=o=>{const [a,b]=K.initials(o);return `${esc(a)}<i>&amp;</i>${esc(b)}`};
const mmTab=(o,L,big,c)=>{const [n1,n2]=coverNames(o);
  return `<div class="mm-tab${big?' big':''}">${c.goldv?'<i class="mm-gv"></i>':''}<i class="mm-sheen"></i><i class="mm-frame"></i>
    <div class="mm-in"><p class="mm-k${big?' kicker':''}">${ev(o,L)}</p><h1 class="mm-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1><i class="mm-rule"></i>
      <p class="mm-date">${esc(big?fmtDate(o.date,o.lang):fmtShort(o.date).replace(/\./g,' · '))}</p>${big&&o.venue?`<p class="mm-ven">${esc(o.venue)}</p>`:''}</div></div>`};
FAMILY({key:'marmar',name:'Marmar',meaning:'Marble tablet',
  blurb:'A polished marble tablet on linen, the names cut into the stone and gilded. It lifts towards guests as the card opens.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-marmar2${c.dark?' mm-dk':''}" style="${mmStoneVars(c)}"><div class="mm-linen"></div>
      <div class="reveal" style="width:84%;max-width:340px">${mmTab(o,L,true,c)}</div>
      <div class="mm-coasters">
        <a class="mm-co reveal d1" data-go="when" href="#"><small>${en?'Event':'Butiran'}</small><b>${en?'Details':'Majlis'}</b></a>
        ${o.x_rsvp?`<a class="mm-co reveal d2" data-go="rsvp" href="#"><small>${en?'Reply':'Sudi hadir?'}</small><b>RSVP</b></a>`:''}
        <a class="mm-co reveal d3" data-go="loc" href="#"><small>${en?'Find us':'Cari kami'}</small><b>${en?'Location':'Lokasi'}</b></a></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-marmar2${c.dark?' mm-dk':''}" style="${mmStoneVars(c)}"><div class="mm-linen"></div>
      <div class="mm-stage">${mmTab(o,L,false,c)}</div>
      <div class="mm-foot">${guest?`<p class="mm-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="mm-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('mm-dark',!!c.dark);
    el.style.setProperty('--stone',c.sheet);el.style.setProperty('--veins',mmV(c).veins);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  // the same colourway ids as the old marble family, so published cards keep working
  themes:[
    {k:'carrara',n:'Carrara',desc:'White Carrara, gold in the veins',c:{ground:'#d8d1c5',sheet:'#efece6',ink:'#2e2924',accent:'#6e5428',gold:'#b38d45',pagefg:'#3a3128',vein:'rgba(70,72,78,.42)',goldv:1,seed:3}},
    {k:'hijau',n:'Hijau Zamrud',desc:'Verde green marble, gold lettering',c:{ground:'#e2dccf',sheet:'#203f35',ink:'#ece6d6',accent:'#e0c58a',gold:'#d2ad62',pagefg:'#2c3128',vein:'rgba(214,232,220,0.67)',seed:11,dark:1}},
    {k:'hitam',n:'Hitam',desc:'Nero marble, gold in the veins',c:{ground:'#e3dbcf',sheet:'#1d1d1f',ink:'#ece8e0',accent:'#e0c48a',gold:'#d4af66',pagefg:'#2e2a26',vein:'rgba(235,235,238,0.51)',goldv:1,seed:19,dark:1}},
    {k:'jambu',n:'Merah Jambu',desc:'Rosa marble, gold in the veins',c:{ground:'#ece0db',sheet:'#ead3cd',ink:'#3a2629',accent:'#7f4250',gold:'#b38a4a',pagefg:'#3a2629',vein:'rgba(120,64,70,.34)',goldv:1,seed:7}},
    {k:'krim',n:'Krim',desc:'Cream travertine marble',c:{ground:'#d5cbb9',sheet:'#ebdfc9',ink:'#352a1e',accent:'#7a5a2a',gold:'#a8823e',pagefg:'#352a1e',vein:'rgba(120,92,58,.4)',seed:23}},
    {k:'biru',n:'Biru',desc:'Midnight blue marble, gold lettering',c:{ground:'#dfe1e2',sheet:'#22324d',ink:'#e8ebf0',accent:'#e0c78f',gold:'#d2b06a',pagefg:'#252c38',vein:'rgba(220,230,245,0.61)',seed:31,dark:1}},
    {k:'mauve',n:'Mauve',desc:'Mauve marble on stone linen',c:{ground:'#d3c4c3',sheet:'#ddc8cb',ink:'#3a2830',accent:'#6e4458',gold:'#b0905a',pagefg:'#3a2830',vein:'rgba(90,44,62,.34)',seed:37}},
    {k:'pic',n:'Pic',desc:'Peach marble on sand linen',c:{ground:'#ddd0c2',sheet:'#f2dfcf',ink:'#3c2a20',accent:'#9c5636',gold:'#b8905a',pagefg:'#3c2a20',vein:'rgba(150,92,62,.34)',seed:41}},
    {k:'kunyit',n:'Kunyit',desc:'Siena yellow marble, deep ink',c:{ground:'#e8e0cd',sheet:'#d9b464',ink:'#2e2210',accent:'#5a3a0e',gold:'#8a6420',pagefg:'#2e2a22',vein:'rgba(110,70,22,.45)',seed:43}},
    {k:'lavender',n:'Lavender',desc:'Lilac-grey marble, silver-gold',c:{ground:'#d4d1da',sheet:'#e0dbe8',ink:'#2f2b3a',accent:'#5b4f86',gold:'#a89a74',pagefg:'#2f2b3a',vein:'rgba(80,70,112,.34)',seed:47}},
    {k:'karang',n:'Karang',desc:'Deep teal marble, gold lettering',c:{ground:'#e4ded4',sheet:'#1e5552',ink:'#eaf0ec',accent:'#e6c991',gold:'#d6b06e',pagefg:'#22302e',vein:'rgba(226,240,234,0.64)',seed:53,dark:1}},
    {k:'pandan',n:'Pandan',desc:'Forest green marble, gold lettering',c:{ground:'#e5e0cf',sheet:'#2d5a44',ink:'#eef0e4',accent:'#e6cd8c',gold:'#d6b45a',pagefg:'#26302a',vein:'rgba(224,240,220,0.64)',seed:59,dark:1}},
    {k:'kopi',n:'Kopi',desc:'Emperador brown marble, cream veins',c:{ground:'#e2d7c7',sheet:'#4a3428',ink:'#f2e8da',accent:'#e6c991',gold:'#d3aa66',pagefg:'#33271f',vein:'rgba(236,216,190,0.75)',seed:61,dark:1}},
    {k:'hujan',n:'Hujan',desc:'Blue-grey marble on pale linen',c:{ground:'#e7e8e8',sheet:'#cad2da',ink:'#22303e',accent:'#2f4a68',gold:'#9c8c66',pagefg:'#22303e',vein:'rgba(48,66,88,.36)',seed:67}},
    {k:'fajar',n:'Fajar',desc:'Dawn pink marble, gold in the veins',c:{ground:'#dfcdc7',sheet:'#f0d8d2',ink:'#3c2429',accent:'#94404f',gold:'#b8905a',pagefg:'#3c2429',vein:'rgba(160,70,90,.3)',goldv:1,seed:71}},
  ]});
