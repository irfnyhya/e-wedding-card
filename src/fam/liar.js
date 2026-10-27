/* liar: "Bunga Liar". A wildflower meadow card. Single blooms cut from Redouté's plates (public domain) are scattered
   round a plain white card on tinted watercolour paper, each on a fine hand-drawn SVG stem with tiny leaves and buds.
   Cover: tap "Buka Jemputan" and the meadow drifts outward while the card lifts away.
   Page: the white card with sprays growing in from the corners. Skin: white cards with a pressed bloom and a drawn sprig rule. */
needFont('Parisienne');
const BL_W={anemones:617,'blush-rose':622,'cabbage-rose':581,'forget-me-not':528,hibiscus:619,iris:566,jasmine:518,lotus:621,'pink-rose':674,'red-rose':622,'white-roses':636,'wild-rose':663};
// one bloom from a plate: [plate, centre x, centre y (0-1 of the plate), width of the crop as a share of the plate]
const BL_B={anR:['anemones',.65,.5,.26],anU:['anemones',.5,.31,.24],anP:['anemones',.33,.39,.22],anW:['anemones',.25,.64,.26],anV:['anemones',.79,.64,.22],
  blush:['blush-rose',.45,.45,.4],cab:['cabbage-rose',.5,.25,.48],hib:['hibiscus',.33,.39,.34],hib2:['hibiscus',.57,.55,.32],
  jas:['jasmine',.8,.135,.2],jas2:['jasmine',.42,.45,.22],lot:['lotus',.35,.27,.34],red:['red-rose',.54,.08,.2],red2:['red-rose',.81,.23,.18],
  wh:['white-roses',.5,.24,.3],wh2:['white-roses',.77,.21,.22],wh3:['white-roses',.47,.45,.26],wild:['wild-rose',.55,.48,.24],pink:['pink-rose',.5,.1,.27],
  fmn:['forget-me-not',.83,.32,.32],fmn2:['forget-me-not',.78,.49,.3],iris:['iris',.47,.28,.5]};
const blBg=k=>{const [f,cx,cy,s]=BL_B[k]||BL_B.wild,iw=BL_W[f],z=1/s,r=z*760/iw,px=(cx*z-.5)/(z-1)*100,py=(cy*r-.5)/(r-1)*100;
  return {img:`url(${A}flower-${f}.webp)`,size:`${(z*100).toFixed(1)}% auto`,pos:`${px.toFixed(1)}% ${py.toFixed(1)}%`}};
const blBloom=(k,st)=>{const b=blBg(k);return `<i class="blr-f" style="${st};background-image:${b.img};background-size:${b.size};background-position:${b.pos}"></i>`};
// a fine stem from (x1,y1) to (x2,y2), bowed by `bend`, with alternate leaves and the odd bud
const blStem=(x1,y1,x2,y2,bend,seed,buds)=>{const R=rng(seed),dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,cx=(x1+x2)/2+nx*bend,cy=(y1+y2)/2+ny*bend;
  const pt=t=>[(1-t)*(1-t)*x1+2*(1-t)*t*cx+t*t*x2,(1-t)*(1-t)*y1+2*(1-t)*t*cy+t*t*y2],tg=t=>Math.atan2(2*(1-t)*(cy-y1)+2*t*(y2-cy),2*(1-t)*(cx-x1)+2*t*(x2-cx))*180/Math.PI;
  let s=`<path class="st" d="M${x1.toFixed(1)} ${y1.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
  const n=Math.max(1,Math.round(L/9));for(let i=0;i<n;i++){const t=.22+(i+R()*.5)/n*.7,[px,py]=pt(t),side=i%2?1:-1,a=tg(t)+side*(38+R()*20),k=(.55+R()*.5)*Math.min(1.25,L/16);
    s+=`<path class="lf" transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${a.toFixed(0)}) scale(${k.toFixed(2)})" d="M0 0C1.3-1.2 3.4-1.3 4.6 0C3.4 1.2 1.3 1.2 0 0Z"/>`}
  if(buds){const [bx,by]=pt(.08),a=tg(.08)+180;s+=`<g transform="translate(${bx.toFixed(1)} ${by.toFixed(1)}) rotate(${(a+30).toFixed(0)})"><path class="st" d="M0 0l2.4 0"/><ellipse class="bd" cx="3.3" cy="0" rx="1.1" ry=".75"/></g><g transform="translate(${bx.toFixed(1)} ${by.toFixed(1)}) rotate(${(a-35).toFixed(0)})"><path class="st" d="M0 0l2 0"/><circle class="bd" cx="2.7" cy="0" r=".6"/></g>`}
  return s};
// a meadow in a box of viewBox 100 x vh: items [x, y, size (% of box width), bloom, base x, base y, bend]; grass [x, y, x2, y2, bend]
const blMead=(items,grass,vh,cls,seed)=>{let svg='',fl='';
  items.forEach((it,i)=>{const [x,y,s,k,bx,by,bend]=it,dx=(x-50),dy=(y-vh/2),m=Math.hypot(dx,dy)||1;
    svg+=blStem(bx,by,x,y,bend||0,seed+i*7,i%3===0);
    fl+=blBloom(k,`left:${x}%;top:${(y/vh*100).toFixed(2)}%;width:${(s*1.2).toFixed(1)}%;--dx:${(dx/m*34).toFixed(0)}cqi;--dy:${(dy/m*34).toFixed(0)}cqi;--r:${((i%5)-2)*9}deg;transition-delay:${(i%4)*.04}s`)});
  (grass||[]).forEach((g,i)=>{svg+=blStem(g[2],g[3],g[0],g[1],g[4]||0,seed+99+i*5,true)});
  return `<div class="blr-mead ${cls}"><svg class="blr-stems" viewBox="0 0 100 ${vh}" preserveAspectRatio="none">${svg}</svg>${fl}</div>`};
// the cover meadow, in a 100 x 195 box (a phone screen)
const BL_COVER=[[8,11,17,'anR',-4,-3,4],[25,18,10,'fmn',30,-3,-3],[42,7,13,'wild',38,-3,2],[60,15,10,'jas',64,-3,-2],[77,8,15,'blush',82,-3,3],[94,21,11,'anU',104,6,3],
  [5,54,11,'red2',-3,64,3],[8,92,13,'hib',-3,104,-3],[4,128,10,'fmn2',-3,138,4],[95,62,12,'wh2',103,72,-3],[93,101,10,'jas2',103,110,3],[96,137,13,'anP',103,150,-3],
  [6,175,17,'cab',0,198,4],[21,186,11,'anV',19,198,-2],[36,178,13,'wh',40,198,3],[52,188,10,'red',50,198,-2],[66,178,14,'pink',70,198,3],[80,186,11,'fmn',78,198,-2],[94,172,16,'anW',98,198,-4],
  [17,32,8,'jas',8,36,3],[85,163,9,'wild',96,170,-2],[84,30,8,'fmn2',100,40,-2],[14,160,8,'anU',-3,166,2],[6,30,8,'wh3',-3,40,2],[95,155,7,'jas',103,160,1],[3,108,7,'anV',-3,114,-1],[98,118,7,'red',103,124,1]];
const BL_GRASS=[[13,168,15,198,3],[29,172,28,198,-2],[45,174,46,198,2],[59,170,57,198,-3],[73,171,74,198,2],[88,166,86,198,-2],[33,10,30,-3,2],[69,9,71,-3,-2],[3,80,-3,84,2],[97,88,103,92,-2]];
// page sprays: top-left and bottom-right of the card, in a 100 x 100 box
const BL_TOP=[[9,15,15,'anR',5,-4,3],[22,27,9,'fmn',25,-4,-2],[34,11,12,'wild',31,-4,2],[47,24,8,'jas',49,-4,-2],[60,10,13,'blush',64,-4,2],[73,25,9,'anV',70,-4,-3],[86,13,13,'wh',90,-4,2],[97,31,8,'red2',101,-4,-2],[16,36,7,'jas2',12,-4,2],[55,33,6,'fmn2',57,-4,1]];
const BL_BOT=[[6,30,14,'cab',3,48,-3],[19,20,9,'anP',21,48,2],[31,34,11,'wh2',28,48,-2],[44,24,8,'red',46,48,2],[57,33,12,'pink',54,48,-2],[70,22,9,'fmn',72,48,2],[83,31,13,'anW',80,48,-3],[95,19,10,'jas',97,48,2],[38,12,6,'jas2',40,48,1],[64,10,6,'anU',62,48,-1]];
const blVars=c=>`--stem:${c.stem};--bud:${c.bud};--w1:${c.w1};--w2:${c.w2}`;
const blNames=(o,cls)=>{const [n1,n2]=coverNames(o);return `<h1 class="blr-names ${cls||''}"><span>${esc(n1)}</span><i>${o.lang==='en'?'and':'dan'}</i><span>${esc(n2)}</span></h1>`};
const blDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const BL_RULE=`<svg class="blr-rule" viewBox="0 0 120 10"><path d="M4 5H50M70 5H116"/><path d="M60 8.5C59 6 59.3 3.5 60 1.5M60 5.5C58 4.4 56.2 4.5 55 5.6C56.6 6.4 58.4 6.4 60 5.5ZM60 4.8C62 3.7 63.8 3.8 65 4.9C63.4 5.7 61.6 5.7 60 4.8Z"/><circle cx="60" cy="1.3" r="1"/></svg>`;
FAMILY({key:'liar',name:'Bunga Liar',meaning:'Wildflower meadow',
  blurb:'An airy white card on watercolour paper, with hand-painted wildflowers on fine drawn stems scattered all round it. The meadow drifts apart to open it.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Parisienne', cursive",b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-liar" style="${blVars(th.c)}"><i class="blr-wash"></i><div class="blr-sheet">
      ${blMead(BL_TOP,null,44,'top',31)}${blMead(BL_BOT,[[12,26,11,48,2],[25,30,26,48,-2],[50,28,51,48,2],[76,27,77,48,-2],[89,24,90,48,2]],44,'bot',57)}
      <div class="blr-body">
        ${o.bismillah?`<p class="blr-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="blr-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${blNames(o)}</div>
        ${BL_RULE}
        <p class="blr-date reveal d2">${esc(blDay(o))} · ${esc(fmtDate(o.date,o.lang,false))}</p>${o.hijri?`<p class="blr-hj reveal d2">${esc(o.hijri)}</p>`:''}
        ${t?`<p class="blr-time reveal d2">${esc(t)}</p>`:''}
        ${o.venue?`<p class="blr-ven reveal d2">${esc(o.venue)}</p>`:''}${o.address?`<p class="blr-addr reveal d2">${esc(o.address)}</p>`:''}
        <div class="blr-pills reveal d3"><a class="blr-pill" data-go="when" href="#">${en?'Details':'Butiran Majlis'}</a><a class="blr-pill ghost" data-go="loc" href="#">${en?'Directions':'Lokasi'}</a></div>
        ${o.x_rsvp?`<a class="blr-link reveal d3" data-go="rsvp" href="#">${en?'Kindly reply':'Sahkan kehadiran'} →</a>`:''}
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-liar" style="${blVars(th.c)}"><i class="blr-wash"></i>
      <div class="blr-card"><div class="blr-in">
        <p class="blr-k">${ev(o,L)}</p>${blNames(o,'sm')}${BL_RULE}
        <p class="blr-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${o.venue?`<p class="blr-ven">${esc(o.venue)}</p>`:''}
        <div class="blr-foot">${guest?`<p class="blr-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="blr-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
      </div></div>
      ${blMead(BL_COVER,BL_GRASS,195,'cv',11)}
    </div>`},
  skin(el,o,th,L){K.cards(el);
    const b=blBg(th.c.sprig||'wild');['stem','bud','w1','w2'].forEach(k=>el.style.setProperty('--'+k,th.c[k]));el.style.setProperty('--blr-img',b.img);el.style.setProperty('--blr-size',b.size);el.style.setProperty('--blr-pos',b.pos);
    const pg=$('.pg-liar',el),ph=pg&&$('.couple-ph.front',pg);if(ph){ph.classList.add('blr-ph');const kk=$('.blr-k',pg);if(kk)kk.before(ph)}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Blush watercolour paper, sage stems',c:{ground:'#f2e1dc',sheet:'#fffdfb',ink:'#3d2f2e',accent:'#a35a66',gold:'#d4aeb0',pagefg:'#3d2f2e',stem:'#7f9475',bud:'#d98b97',w1:'#f4c9cf',w2:'#dfe7cf',sprig:'wild'}},
    {k:'sage',n:'Sage',desc:'Pale sage paper, olive stems',c:{ground:'#e3e9da',sheet:'#fffffb',ink:'#2f3a2d',accent:'#5c7653',gold:'#b7c6a6',pagefg:'#2f3a2d',stem:'#6f8a63',bud:'#e3a4ae',w1:'#cfe0c4',w2:'#f3dccf',sprig:'jas'}},
    {k:'biru',n:'Biru Langit',desc:'Sky blue paper, forget-me-nots',c:{ground:'#dfe8ef',sheet:'#fdfeff',ink:'#28323d',accent:'#4f6e92',gold:'#b2c3d6',pagefg:'#28323d',stem:'#738c78',bud:'#94acd8',w1:'#c9daea',w2:'#efe0d6',sprig:'fmn'}},
    {k:'lavender',n:'Lavender',desc:'Lilac paper, anemones and violets',c:{ground:'#e7e1ee',sheet:'#fefcff',ink:'#35304a',accent:'#76609a',gold:'#c6b8d8',pagefg:'#35304a',stem:'#7f8f74',bud:'#b49ad4',w1:'#dccfeb',w2:'#e2ebd6',sprig:'anV'}},
    {k:'pic',n:'Pic',desc:'Peach paper, coral blooms',c:{ground:'#f6e4d6',sheet:'#fffcf8',ink:'#43302a',accent:'#b0644a',gold:'#e0b89a',pagefg:'#43302a',stem:'#7d9068',bud:'#ee9e83',w1:'#f7d0bc',w2:'#e3ead2',sprig:'red'}},
    {k:'kuning',n:'Kuning Mentega',desc:'Butter paper, white roses',c:{ground:'#f3ecd3',sheet:'#fffdf5',ink:'#3a3424',accent:'#8f7330',gold:'#d8c48c',pagefg:'#3a3424',stem:'#7a8d5f',bud:'#e8c35e',w1:'#f2e2a8',w2:'#e0e9d0',sprig:'wh'}},
    {k:'krim',n:'Krim',desc:'Cream paper, mixed wildflowers',c:{ground:'#ede5d8',sheet:'#fffdf8',ink:'#3a3128',accent:'#7d5f45',gold:'#cdb79a',pagefg:'#3a3128',stem:'#80906c',bud:'#dc9aa0',w1:'#efd9c7',w2:'#dde5cf',sprig:'anR'}},
    {k:'senja',n:'Senja',desc:'Dusky rose ground, ivory card',c:{ground:'#d7b8b8',sheet:'#fffaf7',ink:'#3f2a2c',accent:'#8e4252',gold:'#c99aa0',pagefg:'#3a2426',stem:'#6e8466',bud:'#c87482',w1:'#e7c3c3',w2:'#d7c4b7',sprig:'pink'}},
  ]});
