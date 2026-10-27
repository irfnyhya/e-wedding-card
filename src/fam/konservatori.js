/* konservatori: "Rumah Kaca". A delicate illustrated Victorian glasshouse, drawn in fine pale-green line with a glass
   wash and the blur of palms inside, set on a soft pastel sky; Redouté blooms (public domain) are banked round its base.
   Cover: the glasshouse with the names set below it; tap "Buka Jemputan" and we walk in through the open door.
   Page: an arched panel with the glasshouse in its crown. Skin: arch-topped cards with a glazing-bar band. */
needFont('Italianno');
const RK_W={anemones:617,'blush-rose':622,'cabbage-rose':581,'forget-me-not':528,hibiscus:619,iris:566,jasmine:518,lotus:621,'pink-rose':674,'red-rose':622,'white-roses':636,'wild-rose':663};
const RK_B={anR:['anemones',.65,.5,.26],anU:['anemones',.5,.31,.24],anP:['anemones',.33,.39,.22],anW:['anemones',.25,.64,.26],anV:['anemones',.79,.64,.22],bouq:['anemones',.5,.45,.9],
  blush:['blush-rose',.45,.45,.4],cab:['cabbage-rose',.5,.25,.48],hib:['hibiscus',.33,.39,.34],hib2:['hibiscus',.57,.55,.32],hibB:['hibiscus',.45,.45,.8],
  jas:['jasmine',.8,.135,.2],jas2:['jasmine',.42,.45,.22],red:['red-rose',.54,.08,.2],red2:['red-rose',.81,.23,.18],
  wh:['white-roses',.5,.24,.3],wh2:['white-roses',.77,.21,.22],wh3:['white-roses',.47,.45,.26],whB:['white-roses',.55,.35,.75],wild:['wild-rose',.55,.48,.24],wildB:['wild-rose',.55,.5,.8],pink:['pink-rose',.5,.1,.27],
  fmn:['forget-me-not',.83,.32,.32],fmn2:['forget-me-not',.78,.49,.3],iris:['iris',.45,.4,.75],blushB:['blush-rose',.5,.45,.85]};
const rkBloom=(k,st)=>{const [f,cx,cy,s]=RK_B[k]||RK_B.wild,iw=RK_W[f],z=1/s,r=z*760/iw,px=z>1?(cx*z-.5)/(z-1)*100:50,py=(cy*r-.5)/(r-1)*100;
  return `<i class="rkc-f" style="${st};background-image:url(${A}flower-${f}.webp);background-size:${(z*100).toFixed(1)}% auto;background-position:${px.toFixed(1)}% ${py.toFixed(1)}%"></i>`};
const f1=n=>n.toFixed(1);
// the glasshouse, viewBox 0 0 300 250: two gabled wings, a domed pavilion, glazing bars, cresting and a fan-lit door
const rkHouse=uid=>{let g='',bars='';
  const L=(d,c)=>`<path class="${c||'ln'}" d="${d}"/>`;
  // wings
  [[30,108,69],[192,270,231]].forEach(([a,b,m])=>{
    for(let x=a+9.75;x<b-1;x+=9.75)bars+=L(`M${f1(x)} 150V214`,'th');
    bars+=L(`M${a} 172H${b}M${a} 196H${b}`,'th');
    for(let x=a+9.75;x<b-1;x+=9.75){const yTop=150-(38-Math.abs(x-m)*38/39)*.82;if(yTop<149)bars+=L(`M${f1(x)} 150V${f1(yTop)}`,'th')}
    g+=L(`M${a-4} 150L${m} 118L${b+4} 150Z`)+L(`M${a} 150H${b}V214H${a}Z`)+L(`M${a-4} 150H${b+4}`,'ln b');
    g+=`<circle class="ln" cx="${m}" cy="137" r="6"/><circle class="th" cx="${m}" cy="137" r="2"/>`;
    for(let k=0;k<8;k++){const an=k/8*Math.PI*2;g+=L(`M${f1(m+Math.cos(an)*2)} ${f1(137+Math.sin(an)*2)}L${f1(m+Math.cos(an)*6)} ${f1(137+Math.sin(an)*6)}`,'th')}
    // cresting along the gable
    for(let t=.08;t<.95;t+=.12){[[a-4,150,m,118],[m,118,b+4,150]].forEach(([x1,y1,x2,y2])=>{const x=x1+(x2-x1)*t,y=y1+(y2-y1)*t;g+=`<circle class="cr" cx="${f1(x)}" cy="${f1(y-2.6)}" r="1.1"/>`})}
    g+=L(`M${m} 118V108`)+`<circle class="cr" cx="${m}" cy="106.6" r="1.6"/>`});
  // pavilion walls
  for(let x=118.5;x<192;x+=10.5)bars+=L(`M${f1(x)} 130V214`,'th');
  for(let x=108;x<192;x+=10.5)bars+=L(`M${f1(x)} 131Q${f1(x+5.25)} 123 ${f1(x+10.5)} 131`,'th');
  bars+=L('M108 150H192M108 184H192','th');
  g+=L('M108 122H192V214H108Z')+L('M104 118H196V122H104Z','ln b');
  // the dome: outline, meridian ribs, rings
  const P=(f,t)=>{const x0=150,x1=150+14*f,x2=150+38*f,x3=150+40*f,y0=48,y1=56,y2=78,y3=118,u=1-t;return[u*u*u*x0+3*u*u*t*x1+3*u*t*t*x2+t*t*t*x3,u*u*u*y0+3*u*u*t*y1+3*u*t*t*y2+t*t*t*y3]};
  const dome='M110 118C112 78 136 56 150 48C164 56 188 78 190 118Z';
  [-2/3,-1/3,1/3,2/3].forEach(f=>bars+=L(`M150 48C${f1(150+14*f)} 56 ${f1(150+38*f)} 78 ${f1(150+40*f)} 118`,'th'));
  bars+=L('M150 48V118','th');
  [.38,.62,.84].forEach(t=>{const [x,y]=P(1,t);bars+=L(`M${f1(300-x)} ${f1(y)}Q150 ${f1(y+5)} ${f1(x)} ${f1(y)}`,'th')});
  g+=L(dome)+L('M150 48V30')+`<circle class="cr" cx="150" cy="38" r="2.2"/><circle class="cr" cx="150" cy="29" r="1.3"/>`;
  for(let t=.12;t<.96;t+=.11){[1,-1].forEach(f=>{const [x,y]=P(f,t);g+=`<circle class="cr" cx="${f1(x+f*1.8)}" cy="${f1(y-1.2)}" r=".9"/>`})}
  // door with a fanlight, and steps
  g+=`<path class="door" d="M136 214V178A14 14 0 0 1 164 178V214Z"/>`+L('M136 214V178A14 14 0 0 1 164 178V214')+L('M136 178H164M150 178V214','th');
  for(let k=1;k<6;k++){const an=Math.PI+k/6*Math.PI;g+=L(`M150 178L${f1(150+Math.cos(an)*14)} ${f1(178+Math.sin(an)*14)}`,'th')}
  g+=L('M130 214H170V218H130ZM126 218H174V222H126Z','th');
  // plinth with stone courses
  g+=L('M24 214H276V226H24Z');for(let x=36;x<276;x+=12)if(x<126||x>174)g+=L(`M${x} 214V226`,'th');
  const glass=`M26 150L69 118L112 150ZM30 150H108V214H30ZM188 150L231 118L274 150ZM192 150H270V214H192ZM108 122H192V214H108ZM104 118H196V122H104ZM110 118C112 78 136 56 150 48C164 56 188 78 190 118Z`;
  return `<svg class="rkc-house" viewBox="0 0 300 250"><defs>
    <linearGradient id="rkg${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="g1"/><stop offset=".42" class="g2"/><stop offset=".5" class="g3"/><stop offset=".58" class="g2"/><stop offset="1" class="g1"/></linearGradient>
    <clipPath id="rkc${uid}"><path d="${glass}"/></clipPath><filter id="rkb${uid}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter></defs>
    <g class="trees" filter="url(#rkb${uid})"><ellipse cx="30" cy="186" rx="18" ry="32"/><ellipse cx="270" cy="184" rx="18" ry="32"/><ellipse cx="150" cy="214" rx="140" ry="12"/></g><ellipse class="lawn" cx="150" cy="232" rx="150" ry="16"/><path class="path" d="M136 222L164 222L196 250H104Z"/>
    <path d="${glass}" fill="url(#rkg${uid})"/>
    <g clip-path="url(#rkc${uid})" filter="url(#rkb${uid})" class="plants"><ellipse cx="60" cy="206" rx="34" ry="22"/><ellipse cx="96" cy="196" rx="12" ry="26"/><ellipse cx="150" cy="140" rx="24" ry="50"/><ellipse cx="128" cy="110" rx="18" ry="12"/><ellipse cx="172" cy="106" rx="18" ry="12"/><ellipse cx="244" cy="204" rx="36" ry="24"/><ellipse cx="206" cy="196" rx="12" ry="24"/></g>
    <g class="bars">${bars}</g>${g}</svg>`};
// blooms banked along the base: [x%, y% of the stage, width%, bloom, tilt]
const RK_BED=[[3,85,26,'hibB',-6],[17,93,22,'blushB',4],[30,95,16,'anR',0],[42,98,12,'wh',-4],[58,98,12,'red2',5],[70,95,16,'pink',0],[84,93,22,'whB',-4],[97,85,26,'wildB',6],
  [9,74,12,'jas',8],[91,74,12,'fmn',-8],[50,101,9,'jas2',0]];
const rkBed=list=>list.map(([x,y,w,k,r],i)=>rkBloom(k,`left:${x}%;top:${y}%;width:${w}%;--r:${r}deg`)).join('');
const rkNames=(o,cls)=>{const [n1,n2]=coverNames(o);return `<h1 class="rkc-names ${cls||''}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
const rkVars=c=>`--line:${c.line};--glass:${c.glass};--sky1:${c.sky1};--sky2:${c.sky2};--lawn:${c.lawn}`;
const rkDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
FAMILY({key:'konservatori',name:'Rumah Kaca',meaning:'Garden glasshouse',
  blurb:'A delicate glasshouse drawn in pale green line and wash under a soft pastel sky, with painted flowers banked round it and the names set below. Guests walk in through its door.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Italianno', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-konservatori" style="${rkVars(th.c)}"><i class="rkc-sky"></i><div class="rkc-arch">
      <div class="rkc-stage sm">${rkHouse('p')}${rkBed(RK_BED)}</div>
      <div class="rkc-body">
        ${o.bismillah?`<p class="rkc-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="rkc-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${rkNames(o)}</div>
        <p class="rkc-date reveal d2"><span>${esc(rkDay(o))}</span>${esc(fmtDate(o.date,o.lang,false))}</p>${o.hijri?`<p class="rkc-hj reveal d2">${esc(o.hijri)}</p>`:''}
        <div class="rkc-panes reveal d2">
          <a href="#" data-go="when"><small>${en?'Time':'Masa'}</small><b>${esc(t)}</b></a>
          <a href="#" data-go="loc"><small>${en?'Venue':'Tempat'}</small><b>${esc(o.venue)}</b></a>
        </div>
        ${o.x_rsvp?`<a class="rkc-pill reveal d3" data-go="rsvp" href="#">${en?'Kindly reply':'Sahkan Kehadiran'}</a>`:`<a class="rkc-pill reveal d3" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>`}
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-konservatori" style="${rkVars(th.c)}"><i class="rkc-sky"></i>
      <p class="rkc-k top">${ev(o,L)}</p>
      <div class="rkc-stage">${rkHouse('c')}${rkBed(RK_BED)}</div>
      <div class="rkc-cbody">${rkNames(o,'sm')}<p class="rkc-date"><span>${esc(rkDay(o))}</span>${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${o.venue?`<p class="rkc-ven">${esc(o.venue)}</p>`:''}
        ${guest?`<p class="rkc-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="rkc-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
    </div>`},
  skin(el,o,th,L){K.cards(el);['line','glass','sky1','sky2','lawn'].forEach(k=>el.style.setProperty('--'+k,th.c[k]));
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'pudina',n:'Pudina',desc:'Mint glass under a peach sky',c:{ground:'#eef2ea',sheet:'#fcfdf9',ink:'#2d3a33',accent:'#4e7563',gold:'#a9bfae',pagefg:'#2d3a33',line:'#6f9a85',glass:'#cfe6dc',sky1:'#f8e3d6',sky2:'#dcebec',lawn:'#cfe0c2'}},
    {k:'jambu',n:'Jambu',desc:'Sage glass under a blush sky',c:{ground:'#f6eae7',sheet:'#fffcfb',ink:'#3e2f31',accent:'#9a5866',gold:'#d5b2b5',pagefg:'#3e2f31',line:'#7d9a86',glass:'#dbe9df',sky1:'#f7d9dc',sky2:'#efe6ee',lawn:'#d7e3c8'}},
    {k:'biru',n:'Biru Pagi',desc:'Celadon glass under a morning blue sky',c:{ground:'#eaf0f4',sheet:'#fbfdfe',ink:'#273541',accent:'#4a6b85',gold:'#a9bccb',pagefg:'#273541',line:'#6c958f',glass:'#d3e7e6',sky1:'#dbe9f5',sky2:'#f4ecdf',lawn:'#d0e1c6'}},
    {k:'lavender',n:'Lavender',desc:'Pale glass under a lilac dusk',c:{ground:'#efebf3',sheet:'#fdfcfe',ink:'#363047',accent:'#6e5e92',gold:'#c3b9d5',pagefg:'#363047',line:'#7f9a8c',glass:'#dde8e2',sky1:'#e7dcf0',sky2:'#f6e6e0',lawn:'#d6e2cb'}},
    {k:'krim',n:'Krim',desc:'Old green glass under a cream sky',c:{ground:'#f3eee3',sheet:'#fffdf8',ink:'#38332a',accent:'#6b6a43',gold:'#c9bc96',pagefg:'#38332a',line:'#7c9473',glass:'#dce7cf',sky1:'#f5ead3',sky2:'#e7eee4',lawn:'#d4dfbf'}},
    {k:'pic',n:'Pic',desc:'Mint glass under an apricot sky',c:{ground:'#f8ece2',sheet:'#fffcf8',ink:'#41302a',accent:'#a5654a',gold:'#dfbca2',pagefg:'#41302a',line:'#759a85',glass:'#d6e8dc',sky1:'#fbdcc6',sky2:'#f3e9e1',lawn:'#d5e2c4'}},
    {k:'sage',n:'Sage',desc:'Fern glass on a sage morning',c:{ground:'#e6ece1',sheet:'#fbfcf7',ink:'#2c372a',accent:'#55704a',gold:'#b2c2a3',pagefg:'#2c372a',line:'#5e8a6c',glass:'#cde1cf',sky1:'#eef0dc',sky2:'#dce8e4',lawn:'#c7d9b5'}},
    {k:'senja',n:'Senja',desc:'Glasshouse at dusk, rose and lavender sky',c:{ground:'#4d4559',sheet:'#fbf8fb',ink:'#372f40',accent:'#7a5a86',gold:'#c9b4cf',pagefg:'#f6eff6',line:'#7a988a',glass:'#d9e6e0',sky1:'#d9c2d9',sky2:'#f2d6cf',lawn:'#cbd8c2'}},
  ]});
