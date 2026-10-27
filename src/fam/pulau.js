/* pulau: "Pulau". A white card with a soft watercolour seaside painted across its top: a pale sky, a far island,
   turquoise sea in brushed bands, a line of surf on the sand and coconut palms leaning out over the water. The painting
   (procedural SVG through a wet-edge filter) bleeds raggedly into the cold-pressed paper. Names in a fine Bodoni.
   Cover: the card on a sand-coloured linen; tap "Buka Jemputan" and the card glides down off the table.
   Page: the full card under the painting. Skin: paper cards with a turquoise wash along the top and a wave rule. */
let pulN=0;
const f1=n=>(+n).toFixed(1),PI=Math.PI;
const qp=(a,b,c,t)=>{const u=1-t;return [u*u*a[0]+2*u*t*b[0]+t*t*c[0],u*u*a[1]+2*u*t*b[1]+t*t*c[1]]};
const qa=(a,b,c,t)=>Math.atan2(2*(1-t)*(b[1]-a[1])+2*t*(c[1]-b[1]),2*(1-t)*(b[0]-a[0])+2*t*(c[0]-b[0]));
// a wobbly horizontal band, for washes of sea and sand
const band=(r,y0,y1,amp,x0=-20,x1=420)=>{let d=`M${x0} ${f1(y0)}`;for(let x=x0;x<=x1;x+=20)d+=`L${x} ${f1(y0+(r()-.5)*amp)}`;d+=`L${x1} ${f1(y1)}`;for(let x=x1;x>=x0;x-=20)d+=`L${x} ${f1(y1+(r()-.5)*amp)}`;return d+'Z'};
// a coconut palm: base (x,y), height h, lean (+ right)
function pulPalm(x,y,h,lean,C,r){const b=[x,y],c=[x+lean*h*.12,y-h*.55],t=[x+lean*h*.42,y-h];let tr='',rings='';
  const L=[],R=[];for(let i=0;i<=16;i++){const s=i/16,[px,py]=qp(b,c,t,s),a=qa(b,c,t,s),w=h*(.03-.014*s);L.push([px+Math.sin(a)*w,py-Math.cos(a)*w]);R.push([px-Math.sin(a)*w,py+Math.cos(a)*w]);
    if(i&&i<16){rings+=`M${f1(L[i][0])} ${f1(L[i][1])}Q${f1(px+Math.cos(a)*1.5)} ${f1(py+Math.sin(a)*1.5)} ${f1(R[i][0])} ${f1(R[i][1])}`}}
  tr=L.map((p,i)=>(i?'L':'M')+f1(p[0])+' '+f1(p[1])).join('')+R.reverse().map(p=>'L'+f1(p[0])+' '+f1(p[1])).join('')+'Z';
  // the crown: arching fronds with drooping leaflets
  let fr='';const angs=[-172,-150,-124,-98,-72,-46,-22,4,-188,22];
  angs.forEach((a0,k)=>{const a=(a0+(r()-.5)*12)*PI/180,len=h*(.36+r()*.12),s0=t,e=[t[0]+Math.cos(a)*len,t[1]+Math.sin(a)*len+len*.45],m=[t[0]+Math.cos(a)*len*.55,t[1]+Math.sin(a)*len*.55-len*.12];
    const col=k%3===0?C.l1:k%3===1?C.l2:C.l3;let lf='';
    for(let i=2;i<=18;i++){const s=i/18,[px,py]=qp(s0,m,e,s),ra=qa(s0,m,e,s),ll=h*.085*(1-s*.55);
      for(const sd of [-1,1]){const d=ra+sd*1.05,ex=px+Math.cos(d)*ll*.75,ey=py+Math.sin(d)*ll*.75+ll*.55;lf+=`M${f1(px)} ${f1(py)}Q${f1(px+Math.cos(d)*ll*.5)} ${f1(py+Math.sin(d)*ll*.5)} ${f1(ex)} ${f1(ey)}`}}
    fr+=`<path d="${lf}" stroke="${col}" stroke-width="${f1(h*.012+.4)}" stroke-linecap="round" fill="none" opacity=".88"/><path d="M${f1(s0[0])} ${f1(s0[1])}Q${f1(m[0])} ${f1(m[1])} ${f1(e[0])} ${f1(e[1])}" stroke="${C.l1}" stroke-width="${f1(h*.01+.3)}" fill="none"/>`});
  const nuts=[[-1,1.5],[1.4,1.2],[0,2.6]].map(([dx,dy])=>`<circle cx="${f1(t[0]+dx*h*.022)}" cy="${f1(t[1]+dy*h*.022)}" r="${f1(h*.022)}" fill="${C.trunk}" opacity=".9"/>`).join('');
  return `<path d="${tr}" fill="${C.trunk}" opacity=".85"/><path d="${rings}" stroke="#2b2118" stroke-width=".5" opacity=".35" fill="none"/>${nuts}${fr}`}
// the whole seaside, 400 x 300, horizon at y 150
function pulScene(c,seed,cls){const r=rng(seed),id='pul'+(++pulN);
  const sea=[0,1,2,3,4,5].map(i=>{const y=150+i*11;return `<path d="${band(r,y,y+13+r()*5,3)}" fill="${i<2?c.sea1:i<4?c.sea2:c.sea3}" opacity="${f1(.55+r()*.25)}"/>`}).join('');
  let streaks='';for(let i=0;i<26;i++){const y=153+r()*58,x=r()*400,w=20+r()*70;streaks+=`<path d="M${f1(x)} ${f1(y)}q${f1(w/2)} ${f1((r()-.5)*1.5)} ${f1(w)} 0" stroke="${r()<.5?c.sea1:'#ffffff'}" stroke-width="${f1(.6+r()*1.1)}" opacity="${f1(.25+r()*.35)}" fill="none" stroke-linecap="round"/>`}
  let foam='';for(let i=0;i<3;i++){const y=212+i*4;let d=`M-10 ${y}`;for(let x=-10;x<=410;x+=16)d+=`Q${x+8} ${f1(y-2.5-r()*2)} ${x+16} ${f1(y+r()*1.5)}`;foam+=`<path d="${d}" stroke="#ffffff" stroke-width="${f1(1.6-i*.4)}" opacity="${f1(.85-i*.2)}" fill="none"/>`}
  const isl=`<path d="M-20 152C30 150 50 128 92 127C126 126 140 142 172 147C190 150 210 151 230 152Z" fill="${c.hill}" opacity=".55"/><path d="M-20 153C10 150 30 140 60 141C84 142 98 150 120 153Z" fill="${c.hill2}" opacity=".6"/>`;
  const boat=`<g opacity=".7" transform="translate(286 158)"><path d="M-9 0h18l-3 3h-12z" fill="${c.trunk}"/><path d="M0 -1V-15L8 -2Z" fill="${c.sail}"/><path d="M-1 -1V-12L-7 -2Z" fill="${c.sail}" opacity=".75"/></g>`;
  const palms=pulPalm(352,268,175,-.85,c,r)+pulPalm(318,262,120,-.55,c,r)+pulPalm(24,270,96,.5,c,r);
  return `<svg class="pul-scene ${cls||''}" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" ${NS}><defs>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.sky1}"/><stop offset=".7" stop-color="${c.sky2}"/><stop offset="1" stop-color="${c.sky2}" stop-opacity=".2"/></linearGradient>
    <linearGradient id="${id}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.sand}" stop-opacity=".9"/><stop offset="1" stop-color="${c.sand}" stop-opacity="0"/></linearGradient>
    <filter id="${id}w" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="3" seed="${seed}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation=".35"/></filter>
    <filter id="${id}e" x="-10%" y="-20%" width="120%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="4" seed="${seed+4}"/><feDisplacementMap in="SourceGraphic" scale="44" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="3.5"/></filter>
    <mask id="${id}m" maskUnits="userSpaceOnUse" x="-20" y="-40" width="440" height="380"><path d="M-30 -40H430V252C360 270 300 262 240 272C170 282 90 262 -30 276Z" fill="#fff" filter="url(#${id}e)"/></mask></defs>
    <g mask="url(#${id}m)"><g filter="url(#${id}w)">
      <rect x="-20" y="-20" width="440" height="176" fill="url(#${id}s)"/>
      <path d="M40 60c30-14 70-10 96 2c-30 10-70 10-96-2zM250 40c40-12 90-6 118 8c-40 8-86 6-118-8z" fill="#ffffff" opacity=".55"/>
      ${isl}${boat}${sea}${streaks}
      <path d="${band(r,206,300,5)}" fill="url(#${id}d)"/>${foam}${palms}
    </g></g></svg>`}
const pulNames=(o,cls='')=>{const [n1,n2]=coverNames(o);return `<h1 class="pul-names ${cls}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
const pulDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const PUL_WAVE=c=>`<svg ${NS} viewBox="0 0 120 10"><path d="M2 5q7.5-5 15 0t15 0 15 0 15 0 15 0 15 0 15 0 15 0" fill="none" stroke="${c.sea1}" stroke-width="1" stroke-linecap="round"/></svg>`;
const PUL_WASH=c=>`<svg ${NS} viewBox="0 0 400 60" preserveAspectRatio="none"><defs><filter id="w" x="-5%" y="-30%" width="110%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="4" seed="3"/><feDisplacementMap in="SourceGraphic" scale="16" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="1.4"/></filter>
  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.sea2}" stop-opacity=".75"/><stop offset="1" stop-color="${c.sea3}" stop-opacity=".25"/></linearGradient></defs>
  <path d="M-20 -20H420V30C340 44 280 36 200 42C120 48 60 36 -20 44Z" fill="url(#g)" filter="url(#w)"/></svg>`;

FAMILY({key:'pulau',name:'Pulau',meaning:'Watercolour seaside',
  blurb:'A white card with a soft watercolour seaside across the top: palms leaning over a turquoise sea and a ribbon of surf, the names set below in a fine serif. The card glides away to open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const c=th.c,en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-pulau"><div class="pul-card">${pulScene(c,23,'top')}
      <div class="pul-body">
        <div class="pul-ph"></div>
        ${o.bismillah?`<p class="pul-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="pul-k kicker reveal">${ev(o,L)}</p>
        <div class="reveal d1">${pulNames(o)}</div>
        <i class="pul-wave reveal d1"></i>
        <div class="pul-when reveal d2"><span>${esc(pulDay(o))}</span><b>${esc(fmtDate(o.date,o.lang,false))}</b>${t?`<span>${esc(t)}</span>`:''}</div>
        ${o.hijri?`<p class="pul-hj reveal d2">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<a href="#" class="pul-ven reveal d2" data-go="loc"><small>${en?'at':'bertempat di'}</small>${esc(o.venue)}</a>`:''}
        <div class="pul-pills reveal d3"><a class="pul-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="pul-pill ghost" data-go="rsvp" href="#">${en?'RSVP':'Sahkan Kehadiran'}</a>`:''}</div>
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    return `<div class="cover cv-pulau"><div class="pul-card">${pulScene(c,9,'cv')}
      <div class="pul-cbody"><p class="pul-k">${ev(o,L)}</p>${pulNames(o,'cv')}<i class="pul-wave"></i><p class="pul-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>
        ${o.venue?`<p class="pul-cven">${esc(o.venue)}</p>`:''}</div>
      <div class="pul-foot">${guest?`<p class="pul-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="pul-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
    </div></div>`},
  skin(el,o,th,L){K.cards(el);
    el.style.setProperty('--pul-wave',K.uri(PUL_WAVE(th.c)));el.style.setProperty('--pul-wash',K.uri(PUL_WASH(th.c)));
    const pg=$('.pg-pulau',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const slot=$('.pul-ph',pg);img.removeAttribute('style');slot.appendChild(img);slot.classList.add('on');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'laut',n:'Laut',desc:'Turquoise sea, white card on sand linen',c:{ground:'#e6dccb',sheet:'#fffdf8',ink:'#2a3436',accent:'#1f5d68',gold:'#b39a72',pagefg:'#2a3436',
      sky1:'#a9d3e3',sky2:'#e3f1f2',sea1:'#1f8ea3',sea2:'#3fb6bd',sea3:'#9fdcd2',sand:'#ecd9b5',hill:'#6f9fa0',hill2:'#5c8a7a',trunk:'#7a6550',sail:'#f2e7d2',l1:'#2c5b44',l2:'#3f7c55',l3:'#6a9e62'}},
    {k:'pagi',n:'Pagi',desc:'Pale morning sea, mist-blue ground',c:{ground:'#dbe5ea',sheet:'#fdfefe',ink:'#273440',accent:'#2f5878',gold:'#a79a7e',pagefg:'#273440',
      sky1:'#c6dcec',sky2:'#eef4f6',sea1:'#4a90b0',sea2:'#7cbccb',sea3:'#c0e2df',sand:'#efe2c8',hill:'#89a7b6',hill2:'#7b9c98',trunk:'#7d6c5b',sail:'#fbf4e6',l1:'#365e52',l2:'#4f7e66',l3:'#7ba27a'}},
    {k:'senja',n:'Senja',desc:'Sunset sky over a teal sea, blush ground',c:{ground:'#eed8cc',sheet:'#fffaf6',ink:'#3a2c2c',accent:'#8a4a52',gold:'#c39b7a',pagefg:'#3a2c2c',
      sky1:'#f2c3b1',sky2:'#fbe6d4',sea1:'#2b7d8c',sea2:'#5aa9a8',sea3:'#b7d9cc',sand:'#efd6b8',hill:'#a08f9f',hill2:'#7f8a86',trunk:'#6b5144',sail:'#fff3e6',l1:'#2d4f40',l2:'#456f50',l3:'#73955e'}},
    {k:'pasir',n:'Pasir',desc:'Warm sand ground, aqua sea',c:{ground:'#d9c7a8',sheet:'#fffcf3',ink:'#36301f',accent:'#5a6a3a',gold:'#b08a52',pagefg:'#36301f',
      sky1:'#bcdcde',sky2:'#eef4ec',sea1:'#2d9a9e',sea2:'#62c0b6',sea3:'#b8e2cf',sand:'#e9d0a2',hill:'#86a28a',hill2:'#6d8f6c',trunk:'#7a5f45',sail:'#f6ead2',l1:'#3a5a33',l2:'#55794a',l3:'#86a462'}},
    {k:'nila',n:'Nila',desc:'White card on deep indigo linen',c:{ground:'#1f2f4a',sheet:'#fdfdfb',ink:'#222c3a',accent:'#1d4e75',gold:'#a8956e',pagefg:'#e8eef4',
      sky1:'#a3c6e0',sky2:'#e6f0f4',sea1:'#1b6f9c',sea2:'#3a9ab8',sea3:'#a5d6d8',sand:'#ecdcbc',hill:'#6c8fa8',hill2:'#58808a',trunk:'#6d5d4e',sail:'#f7efe0',l1:'#28503f',l2:'#3d7052',l3:'#679a6a'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald linen, green island water',c:{ground:'#17423b',sheet:'#fcfdf9',ink:'#20322e',accent:'#17594d',gold:'#a99a6c',pagefg:'#e7f0ea',
      sky1:'#b6dcd8',sky2:'#eaf4f0',sea1:'#16857e',sea2:'#3cb3a0',sea3:'#a6e0c8',sand:'#ead9b4',hill:'#5d9283',hill2:'#4a7d65',trunk:'#6f5c45',sail:'#f4ecd8',l1:'#23503b',l2:'#367250',l3:'#62995d'}},
    {k:'karang',n:'Karang',desc:'Coral ground, white card, turquoise sea',c:{ground:'#e3a28f',sheet:'#fffdf9',ink:'#3a2a26',accent:'#a04a3f',gold:'#c08c6a',pagefg:'#3a2420',
      sky1:'#f5cdb8',sky2:'#fbeee2',sea1:'#22909e',sea2:'#4fbcb8',sea3:'#aee0d2',sand:'#f0d7b5',hill:'#9aa69a',hill2:'#76917c',trunk:'#7a5a48',sail:'#fff4e8',l1:'#2e5642',l2:'#477a56',l3:'#77a265'}},
    {k:'malam',n:'Malam',desc:'Moonlit blue sea on a midnight ground',c:{ground:'#11161f',sheet:'#fbfaf6',ink:'#232a33',accent:'#26476a',gold:'#b29b6a',pagefg:'#e6e2d6',
      sky1:'#7d9cbc',sky2:'#d9e2ea',sea1:'#1e4f78',sea2:'#3d7898',sea3:'#97bcc6',sand:'#e2d6bf',hill:'#56708c',hill2:'#4a6670',trunk:'#4f4438',sail:'#efe8da',l1:'#1f3d35',l2:'#2f5a48',l3:'#557f5f'}},
  ]});
