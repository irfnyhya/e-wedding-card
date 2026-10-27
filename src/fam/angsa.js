/* angsa: "Tasik Angsa". A romantic card: a misty pastel lake painted in SVG (soft sky, hazy hills, mist bands and
   shimmering water) with two white swans whose necks make a heart, set in an oval wreathed with Redouté roses (public domain).
   Cover: tap "Buka Jemputan" and a morning mist rises over the lake. Page: the lake medallion over the names and details.
   Skin: paper cards with a rose in the corner and a ripple rule under script headings. */
needFont('Alex+Brush');
const AG_W={anemones:617,'blush-rose':622,'cabbage-rose':581,'forget-me-not':528,hibiscus:619,iris:566,jasmine:518,lotus:621,'pink-rose':674,'red-rose':622,'white-roses':636,'wild-rose':663};
const AG_B={pink:['pink-rose',.5,.1,.27],blush:['blush-rose',.45,.45,.4],bud:['blush-rose',.3,.08,.3],cab:['cabbage-rose',.5,.25,.48],wild:['wild-rose',.55,.48,.24],
  wh:['white-roses',.5,.24,.3],wh2:['white-roses',.77,.21,.22],red2:['red-rose',.81,.23,.18],anP:['anemones',.33,.39,.22],
  leafA:['blush-rose',.3,.7,.5],leafB:['pink-rose',.35,.4,.45],leafC:['white-roses',.3,.72,.5],leafD:['wild-rose',.4,.75,.5]};
const agCrop=k=>{const [f,cx,cy,s]=AG_B[k]||AG_B.pink,iw=AG_W[f],z=1/s,r=z*760/iw;return {img:`url(${A}flower-${f}.webp)`,size:`${(z*100).toFixed(1)}% auto`,pos:`${((cx*z-.5)/(z-1)*100).toFixed(1)}% ${((cy*r-.5)/(r-1)*100).toFixed(1)}%`}};
const agBloom=(k,st,cls)=>{const b=agCrop(k);return `<i class="ags-f ${cls||''}" style="${st};background-image:${b.img};background-size:${b.size};background-position:${b.pos}"></i>`};
// one swan facing right, waterline at y=0; the neck is a stroke so it stays fine and even
const AG_SWAN=`<path class="sw" d="M-6 -8C2 -20 26 -26 42 -14C48 -9 48 -2 44 0L4 0C-2 0 -5 -4 -6 -8Z"/>
  <path class="nk" d="M41 -9C30 -28 29 -57 45 -62C53 -64 58 -59 58.5 -53"/><ellipse class="sw" cx="54.5" cy="-58" rx="5.2" ry="3.7" transform="rotate(32 54.5 -58)"/>
  <path class="bk" d="M57.5 -56L62.5 -47.5L57 -52Z"/><path class="fe" d="M8 -15C18 -21 30 -21 38 -15M3 -10C13 -16 25 -16 33 -11M-1 -7C7 -11 15 -11 22 -8"/>`;
const agPair=`<g transform="translate(37 0)">${AG_SWAN}</g><g transform="translate(163 0) scale(-1 1)">${AG_SWAN}</g>`;
// the lake, viewBox 0 0 200 260
const agLake=uid=>{let sh='';const R=rng(77);for(let i=0;i<26;i++){const y=140+R()*110,x=R()*180,w=8+R()*34;sh+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)}h${w.toFixed(1)}" stroke-opacity="${(.25+R()*.45).toFixed(2)}"/>`}
  return `<svg class="ags-lake" viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice"><defs>
    <linearGradient id="ags${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="s1"/><stop offset=".5" class="s2"/></linearGradient>
    <linearGradient id="agw${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="w1"/><stop offset="1" class="w2"/></linearGradient>
    <linearGradient id="agb${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".7" stop-color="#fff"/><stop offset="1" class="sb"/></linearGradient>
    <filter id="agf${uid}" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="agg${uid}" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="1.2"/></filter></defs>
    <rect width="200" height="140" fill="url(#ags${uid})"/>
    <circle class="sun" cx="128" cy="118" r="34" filter="url(#agf${uid})"/>
    <path class="h1" d="M-10 132C20 112 44 108 70 118C92 104 120 100 150 114C170 106 190 108 212 118V140H-10Z" filter="url(#agg${uid})"/>
    <path class="h2" d="M-10 138C14 126 36 124 56 130C84 120 110 122 132 132C160 124 186 126 212 134V142H-10Z" filter="url(#agg${uid})"/>
    <g class="trees" filter="url(#agf${uid})"><ellipse cx="6" cy="132" rx="22" ry="14"/><ellipse cx="22" cy="136" rx="14" ry="9"/><ellipse cx="192" cy="133" rx="20" ry="12"/></g>
    <rect y="138" width="200" height="122" fill="url(#agw${uid})"/>
    <g class="refl" filter="url(#agf${uid})"><ellipse cx="128" cy="150" rx="26" ry="10"/></g>
    <g class="shim">${sh}</g>
    <g class="mist" filter="url(#agf${uid})"><ellipse cx="60" cy="140" rx="80" ry="7"/><ellipse cx="160" cy="146" rx="70" ry="6"/><ellipse cx="100" cy="128" rx="110" ry="5"/></g>
    <g class="ripple"><ellipse cx="100" cy="203" rx="78" ry="6"/><ellipse cx="100" cy="206" rx="96" ry="8.5"/></g>
    <g transform="translate(0 201) scale(1 -1)" class="swrefl" filter="url(#agg${uid})">${agPair}</g>
    <g transform="translate(0 200)" class="swans" style="--grad:url(#agb${uid})">${agPair}</g>
    <g class="reeds">${[[6,260,2,206],[11,260,8,214],[15,260,17,222],[190,260,196,210],[186,260,183,218],[194,260,192,226]].map(([x1,y1,x2,y2])=>`<path d="M${x1} ${y1}Q${(x1+x2)/2+3} ${(y1+y2)/2} ${x2} ${y2}"/>`).join('')}</g>
  </svg>`};
// the rose wreath: blooms round an ellipse (angles in degrees, 0 = right, 90 = top), heavier at the lower left and upper right
const AG_WREATH=[[200,30,'leafA'],[232,34,'leafB'],[262,28,'leafC'],[40,30,'leafD'],[68,26,'leafA'],[300,22,'leafB'],[150,22,'leafC'],[118,18,'leafD'],
  [212,30,'cab'],[240,24,'blush'],[188,19,'pink'],[262,18,'anP'],[282,14,'pink'],[166,15,'wild'],
  [50,28,'blush'],[26,20,'pink'],[76,19,'cab'],[100,13,'wild'],[6,14,'anP'],[318,14,'blush'],[136,12,'pink']];
const agWreath=()=>AG_WREATH.map(([a,s,k],i)=>{const t=a*Math.PI/180,x=50+Math.cos(t)*51,y=50-Math.sin(t)*51;
  return agBloom(k,`left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;width:${s}%;--r:${((i*41)%36)-18}deg`,k.startsWith('leaf')?'leaf':'')}).join('');
const agMedal=(uid,cls)=>`<div class="ags-medal ${cls||''}"><i class="ags-mount"></i><div class="ags-oval">${agLake(uid)}<i class="ags-glow"></i></div><i class="ags-ring"></i>${agWreath()}</div>`;
const agNames=(o,cls)=>{const [n1,n2]=coverNames(o);return `<h1 class="ags-names ${cls||''}"><span>${esc(n1)}</span><i>&amp;</i><span>${esc(n2)}</span></h1>`};
const agDay=o=>{if(!o.date)return'';const d=new Date(o.date+'T00:00:00');return isNaN(d)?'':DAYS[o.lang][d.getDay()]};
const agVars=c=>`--sky1:${c.sky1};--sky2:${c.sky2};--water:${c.water};--hill:${c.hill};--cname:${c.cname||c.accent};--cink:${c.pagefg}`;
const AG_RULE=`<svg class="ags-rule" viewBox="0 0 120 12"><path d="M30 6Q60 1 90 6M40 8.5Q60 5 80 8.5M50 11Q60 9 70 11"/></svg>`;
FAMILY({key:'angsa',name:'Tasik Angsa',meaning:'Swan lake',
  blurb:'A romantic card: two white swans on a misty pastel lake, framed in an oval of painted pink roses, with the names in flowing script below. A soft mist rises over the lake to open it.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Alex Brush', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-angsa" style="${agVars(th.c)}"><i class="ags-paper"></i>
      <div class="ags-card">${agMedal('p','pg reveal')}
        <div class="ags-body">
          ${o.bismillah?`<p class="ags-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
          <p class="ags-k kicker reveal">${ev(o,L)}</p>
          <div class="reveal d1">${agNames(o)}</div>${AG_RULE}
          <p class="ags-date reveal d2">${esc(agDay(o))}<b>${esc(fmtDate(o.date,o.lang,false))}</b></p>${o.hijri?`<p class="ags-hj reveal d2">${esc(o.hijri)}</p>`:''}
          ${t?`<p class="ags-time reveal d2">${esc(t)}</p>`:''}${o.venue?`<p class="ags-ven reveal d2">${esc(o.venue)}</p>`:''}${o.address?`<p class="ags-addr reveal d2">${esc(o.address)}</p>`:''}
          <div class="ags-pills reveal d3"><a class="ags-pill" data-go="${o.x_rsvp?'rsvp':'when'}" href="#">${o.x_rsvp?(en?'Kindly reply':'Sahkan Kehadiran'):(en?'Event details':'Maklumat Majlis')}</a><a class="ags-pill ghost" data-go="loc" href="#">${en?'Map':'Lokasi'}</a></div>
        </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-angsa ${th.c.mount?'ags-mounted':''}" style="${agVars(th.c)}"><i class="ags-paper"></i>
      <p class="ags-k top">${ev(o,L)}</p>${agMedal('c','cv')}
      <div class="ags-cbody">${agNames(o,'sm')}<p class="ags-date"><b>${esc(fmtShort(o.date)).replace(/\./g,' · ')}</b></p>${o.venue?`<p class="ags-ven">${esc(o.venue)}</p>`:''}
        ${guest?`<p class="ags-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="ags-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
      <i class="ags-rise"></i>
    </div>`},
  skin(el,o,th,L){K.cards(el);['sky1','sky2','water','hill'].forEach(k=>el.style.setProperty('--'+k,th.c[k]));
    const b=agCrop(th.c.corner||'pink');el.style.setProperty('--ags-img',b.img);el.style.setProperty('--ags-size',b.size);el.style.setProperty('--ags-pos',b.pos);
    const pg=$('.pg-angsa',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const v=$('.ags-oval',pg);img.className='ags-photo';img.removeAttribute('style');v.classList.add('has-photo');v.prepend(img);ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Blush paper, a pink dawn over the lake',c:{ground:'#f4e4e2',sheet:'#fffaf9',ink:'#40303a',accent:'#a0566a',gold:'#d8b0b6',pagefg:'#40303a',sky1:'#f2cfd6',sky2:'#fbe9df',water:'#c9d3e4',hill:'#c7b8d2',corner:'pink'}},
    {k:'lavender',n:'Lavender',desc:'Lilac paper, a lavender evening',c:{ground:'#ebe4f1',sheet:'#fdfbfe',ink:'#363049',accent:'#6e5b95',gold:'#c6b9da',pagefg:'#363049',sky1:'#ddd0ee',sky2:'#f6e4ec',water:'#c4cde6',hill:'#b7aed0',corner:'blush'}},
    {k:'biru',n:'Biru Kabus',desc:'Mist blue paper, a pale morning',c:{ground:'#e3ebf1',sheet:'#fbfdfe',ink:'#29343f',accent:'#4d6b8a',gold:'#b5c5d4',pagefg:'#29343f',sky1:'#d6e4f2',sky2:'#f6ece6',water:'#bccfdf',hill:'#b4c0d4',corner:'wh'}},
    {k:'pic',n:'Pic',desc:'Peach paper, a golden hour',c:{ground:'#f6e6da',sheet:'#fffbf7',ink:'#41302b',accent:'#a6614a',gold:'#e0bea5',pagefg:'#41302b',sky1:'#f8d5c0',sky2:'#fbeedd',water:'#d3d6e2',hill:'#d0bccb',corner:'wild'}},
    {k:'gading',n:'Gading',desc:'Ivory paper, white roses, a silver lake',c:{ground:'#eeeadf',sheet:'#fefcf7',ink:'#37332c',accent:'#76663f',gold:'#cdbf9a',pagefg:'#37332c',sky1:'#ece6db',sky2:'#f7f1e6',water:'#cfd6dc',hill:'#c5c2c8',corner:'wh'}},
    {k:'mawar',n:'Mawar',desc:'Rose paper, deep pink roses',c:{ground:'#efd6d8',sheet:'#fff8f8',ink:'#432a31',accent:'#8f3c55',gold:'#d3a2ae',pagefg:'#432a31',sky1:'#efc3cd',sky2:'#f9e2e0',water:'#cdcbe0',hill:'#c6a9c3',corner:'cab'}},
    {k:'sage',n:'Sage',desc:'Sage paper, a green morning lake',c:{ground:'#e3e9df',sheet:'#fbfcf8',ink:'#2e3a30',accent:'#58714f',gold:'#b8c6aa',pagefg:'#2e3a30',sky1:'#e4ead7',sky2:'#f6efe2',water:'#c2d4d0',hill:'#b7c4b6',corner:'pink'}},
    {k:'malam',n:'Malam',desc:'Night plum ground, a moonlit lake',c:{ground:'#3a2c3c',sheet:'#fdf8fb',ink:'#382c3a',accent:'#7d4a72',gold:'#cfb2c8',pagefg:'#f6ecf3',cname:'#f0cfe2',mount:1,sky1:'#3b2a45',sky2:'#9c7896',water:'#43344f',hill:'#5d4866',corner:'pink'}},
  ]});
