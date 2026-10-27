/* orkid: "Orkid". An art-nouveau die-cut card: a cream card cut to a domed nouveau arch, framed by tall pink
   orchid sprays on whiplash stems rising from broad orchid leaves, all in fine SVG linework with soft colour,
   double gilt hairlines following the cut edge and names in a nouveau display face.
   Cover: tap "Buka Jemputan" and the card turns over in the hand. Page: a taller arched card with the sprays
   hanging along its shoulders. Skin: arched paper cards with an orchid sprig over each heading. */
needFont('Federo');
let okN=0;
const okf=v=>(+v).toFixed(1);
// the card outline, 300 x 470: a domed arch with a small finial dome, notched bottom corners
const OK_SHAPE='M0 150C0 100 36 76 80 62C112 52 128 34 134 20C140 6 160 6 166 20C172 34 188 52 220 62C264 76 300 100 300 150V456A14 14 0 0 0 286 470H14A14 14 0 0 0 0 456Z';
// the arch alone (for the page head), closed flat at y=150 and carried down to 160
const OK_ARCH='M0 160V150C0 100 36 76 80 62C112 52 128 34 134 20C140 6 160 6 166 20C172 34 188 52 220 62C264 76 300 100 300 150V160Z';
const OK_MASK=K.uri(`<svg ${NS} width="300" height="470" viewBox="0 0 300 470" preserveAspectRatio="none"><path d="${OK_SHAPE}"/></svg>`);
const OK_MASKH=K.uri(`<svg ${NS} width="300" height="160" viewBox="0 0 300 160" preserveAspectRatio="none"><path d="${OK_ARCH}"/></svg>`);
// one phalaenopsis-style orchid, ~13 units across at s=1: dorsal and two lateral sepals, two broad petals, a frilled lip
const OK_SEP='M0 0C-3.4-4-3.8-10-.2-13C3.6-10.2 3.6-4 0 0Z';
const OK_PET='M0 0C-1.6-5.4-6.6-9.8-11-8.4C-14.6-7.2-14.4-1.6-10.6 1.2C-7.4 3.6-3 2.6 0 0Z';
const OK_LIP='M0 1.2C-2.6 1.6-4.6 4.2-3.6 6.8C-3 8.6-1.4 9.8 0 9.2C1.4 9.8 3 8.6 3.6 6.8C4.6 4.2 2.6 1.6 0 1.2Z';
const OK_LOBE='M-1.4 2C-4.4 1.2-6.6 2.8-6 4.8C-5.4 6.2-3.2 5.6-2 4M1.4 2C4.4 1.2 6.6 2.8 6 4.8C5.4 6.2 3.2 5.6 2 4';
function okFlower(x,y,s,r,g){return `<g transform="translate(${okf(x)} ${okf(y)}) rotate(${r}) scale(${s})">
  <path d="${OK_SEP}" class="ok-pt" fill="url(#${g})"/><path d="${OK_SEP}" class="ok-pt" fill="url(#${g})" transform="rotate(128)"/><path d="${OK_SEP}" class="ok-pt" fill="url(#${g})" transform="rotate(-128)"/>
  <path d="${OK_PET}" class="ok-pt" fill="url(#${g})" transform="rotate(8)"/><path d="${OK_PET}" class="ok-pt" fill="url(#${g})" transform="scale(-1 1) rotate(8)"/>
  <path d="M0 0L-8.6-5.2M0 0L-9.4-2M0 0L8.6-5.2M0 0L9.4-2M0 0V-9.6M0 0L-6 6.4M0 0L6 6.4" class="ok-vein"/>
  <path d="${OK_LOBE}" class="ok-lobe"/><path d="${OK_LIP}" class="ok-lip"/><path d="M-1.6 7.4C-.6 8.6.6 8.6 1.6 7.4" class="ok-vein"/>
  <ellipse cx="0" cy=".2" rx="1.3" ry="1.9" class="ok-col"/></g>`}
const okBud=(x,y,s,r)=>`<g transform="translate(${okf(x)} ${okf(y)}) rotate(${r}) scale(${s})"><path d="M0 0C-3.2-1-4-5-1.6-7.6C0-9 1.4-8 1.8-6.4C2.8-3.6 2.4-.6 0 0Z" class="ok-bud"/><path d="M-.4-.4C-.8-3-.6-5.6.6-7.4" class="ok-vein"/></g>`;
// broad orchid leaf from 0,0 pointing right, length ~1 * len
const okLeaf=(x,y,len,r,flip,lg)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${len/80} ${flip?-len/80:len/80})"><path d="M0 0C12-11 38-17 64-15C72-14.4 80-12 82-10C70-4 48 4 26 6C14 7 4 5 0 0Z" class="ok-leaf" fill="url(#${lg})"/><path d="M2-1C24-7 52-11 80-10.4" class="ok-rib"/><path d="M14-3.6L22-9M30-6L38-12.2M46-8L54-13.4M18 1.6L28-4.6M36 2.2L44-6.6" class="ok-rib t"/></g>`;
// one spray: stem from (x0,y0) climbing to an arching raceme. pts: [x,y,scale,rot] for flowers, buds at the tip
function okSpray(stem,fl,buds,g){return `<path d="${stem}" class="ok-stem"/><path d="${stem}" class="ok-stem2" transform="translate(3.2 1.4)"/>
  ${fl.map(p=>okFlower(p[0],p[1],p[2],p[3],g)).join('')}${buds.map(b=>okBud(...b)).join('')}`}
const okGrad=(g)=>`<linearGradient id="${g}l" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="82" y2="-6"><stop offset="0" class="ok-l0"/><stop offset="1" class="ok-l1"/></linearGradient><radialGradient id="${g}" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="13"><stop offset="0" class="ok-s0"/><stop offset=".55" class="ok-s1"/><stop offset="1" class="ok-s2"/></radialGradient>`;
// a small nouveau sun-and-drops finial
const okFinial=(x,y,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})" class="ok-gl"><circle r="6.5"/><circle r="9.2" stroke-width=".45"/><circle r="2.2" class="ok-gf"/>
  <path d="M0 9.2C-1.6 13-1.6 16 0 19C1.6 16 1.6 13 0 9.2Z" class="ok-gf"/><path d="M-9.2 0C-14 2-18-1-17.6-4.6C-17.2-7.2-14-7.6-13.2-5.4M9.2 0C14 2 18-1 17.6-4.6C17.2-7.2 14-7.6 13.2-5.4"/>
  <path d="M-6.5 6C-10 12-16 13-22 11M6.5 6C10 12 16 13 22 11" stroke-width=".55"/></g>`;
// the full cover card art, 300 x 470
function okCardArt(u){const g='okg'+u;
  const L=okSpray('M34 452C20 400 46 360 34 310C24 268 20 230 30 196C38 168 50 148 66 134C82 120 98 112 120 108',
    [[38,198,1.05,-14],[47,160,1.25,-2],[70,128,1.22,10],[96,113,1.02,22]],[[112,108,.95,74],[121,108,.75,82]],g);
  const L2=okSpray('M42 448C46 422 54 404 52 384C50 366 42 354 32 344',[[52,398,.92,-28],[45,366,1.02,-46]],[[33,346,.78,-112],[30,338,.6,-120]],g);
  const ins=(sx,sy)=>`translate(150 238) scale(${sx} ${sy}) translate(-150 -238)`;
  return `<svg class="ok-art" viewBox="0 0 300 470" ${NS} aria-hidden="true"><defs>${okGrad(g)}</defs>
    <path d="${OK_SHAPE}" class="ok-edge" transform="${ins(.945,.958)}"/><path d="${OK_SHAPE}" class="ok-edge t" transform="${ins(.922,.942)}"/>
    ${okFinial(150,36)}
    <g>${L}${L2}${okLeaf(34,452,84,-12,0,g+'l')}${okLeaf(36,450,70,-46,0,g+'l')}${okLeaf(30,452,58,-84,1,g+'l')}</g>
    <g transform="translate(300 0) scale(-1 1)">${L}${L2}${okLeaf(34,452,84,-12,0,g+'l')}${okLeaf(36,450,70,-46,0,g+'l')}${okLeaf(30,452,58,-84,1,g+'l')}</g>
    <path d="M118 420C132 414 142 418 150 426C158 418 168 414 182 420" class="ok-gl" stroke-width=".7"/><circle cx="150" cy="429" r="1.6" class="ok-gf"/></svg>`}
// the page card's three pieces: head (arch, border, sprays), stretched side stems, foot (stem bases and leaves)
function okHead(u){const g='okh'+u;
  const sp=okSpray('M22 240C20 206 24 176 34 154C46 128 64 112 86 102C100 96 112 94 124 92',
    [[27,206,1.1,-12],[38,166,1.28,-2],[60,128,1.25,10],[86,106,1.05,22]],[[108,96,.95,74],[118,93,.75,82]],g);
  return `<svg class="ok-head" viewBox="0 0 300 240" ${NS} aria-hidden="true"><defs>${okGrad(g)}</defs>
    <path d="M9 240V150C9 105 43 82 84 69C118 58 131 41 137 29C142 17 158 17 163 29C169 41 182 58 216 69C257 82 291 105 291 150V240" class="ok-edge"/>
    <path d="M11.5 240V150C11.5 107 45 85 85 72C119 61 133 44 139 32C143 22 157 22 161 32C167 44 181 61 215 72C255 85 288.5 107 288.5 150V240" class="ok-edge t"/>
    ${okFinial(150,48,.9)}${sp}<g transform="translate(300 0) scale(-1 1)">${sp}</g></svg>`}
const OK_SIDE=`<svg class="ok-side" viewBox="0 0 300 100" preserveAspectRatio="none" ${NS} aria-hidden="true"><path d="M22 0C30 30 14 66 24 100M278 0C270 30 286 66 276 100" class="ok-stem" vector-effect="non-scaling-stroke"/><path d="M25.2 0C33 30 17 66 27 100M274.8 0C267 30 283 66 273 100" class="ok-stem2" vector-effect="non-scaling-stroke"/></svg>`;
const okFoot=u=>{const g='okf'+u,half=`<path d="M24 0C30 34 22 70 30 112" class="ok-stem"/>${okLeaf(30,112,90,-12,0,g+'l')}${okLeaf(32,110,74,-44,0,g+'l')}${okLeaf(28,112,60,-80,1,g+'l')}`;
  return `<svg class="ok-foot" viewBox="0 0 300 130" ${NS} aria-hidden="true"><defs>${okGrad(g)}</defs>${half}<g transform="translate(300 0) scale(-1 1)">${half}</g>
    <path d="M114 100C130 92 142 96 150 106C158 96 170 92 186 100" class="ok-gl" stroke-width=".7"/><circle cx="150" cy="109" r="1.7" class="ok-gf"/></svg>`};
const okVars=c=>`--petal:${c.petal};--petal2:${c.petal2};--lip:${c.lip};--leaf:${c.leaf};--stem:${c.stem}`;
const okNames=(o,tag='h1')=>{const [n1,n2]=coverNames(o);return `<${tag} class="ok-names"><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
const okMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<b class="ok-jw">${esc(j)}</b>`;const [a,b]=K.initials(o);return `<b>${esc(a)}</b><i></i><b>${esc(b)}</b>`};
// small sprig for the skin headings
const okSprig=c=>`<svg ${NS} viewBox="0 0 120 34"><defs><radialGradient id="q" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="13"><stop offset="0" stop-color="${c.petal2}"/><stop offset=".45" stop-color="${c.petal}"/><stop offset="1" stop-color="#fffaf6"/></radialGradient></defs>
  <g fill="none" stroke="${c.gold}" stroke-width=".7" stroke-linecap="round"><path d="M4 26C24 30 40 18 60 18S96 30 116 26"/><path d="M14 30C30 31 44 23 60 22S90 31 106 30" stroke-width=".4"/></g>
  <g stroke="${c.petal2}" stroke-width=".35" style="--x:1">${okFlower(60,15,.95,0,'q').replace(/class="ok-pt"/g,'').replace(/class="ok-lip"/g,`fill="${c.lip}"`).replace(/class="ok-lobe"/g,`fill="${c.lip}" opacity=".7"`).replace(/class="ok-vein"/g,`fill="none" stroke="${c.lip}" stroke-opacity=".35"`).replace(/class="ok-col"/g,`fill="#f4d98a"`)}
  ${okBud(78,18,.8,70).replace('class="ok-bud"',`fill="${c.petal}"`).replace('class="ok-vein"','fill="none"')}${okBud(42,18,.8,-70).replace('class="ok-bud"',`fill="${c.petal}"`).replace('class="ok-vein"','fill="none"')}</g></svg>`;
FAMILY({key:'orkid',name:'Orkid',meaning:'Nouveau orchids',
  blurb:'An art-nouveau card cut to a domed arch, framed by tall pink orchids on whiplash stems, with fine gilt hairlines and nouveau lettering. The card turns over to open.',
  fonts:{d:"'Federo', sans-serif",s:"'Federo', sans-serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const u=++okN,en=o.lang==='en';
    return `<section class="page pg-orkid${th.c.dark?' ok-dark':''}" style="${okVars(th.c)}"><i class="ok-bg"></i>
      <div class="ok-pwrap reveal"><div class="ok-pshadow"><div class="ok-pcard" style="--okmh:${OK_MASKH}">
        ${okHead(u)}<i class="ok-rails"></i>${OK_SIDE}${okFoot(u)}
        <div class="ok-pcol">
          ${o.bismillah?`<p class="ok-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
          <p class="ok-k kicker">${ev(o,L)}</p>
          ${okNames(o)}
          <i class="ok-rule"></i>
          <p class="ok-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="ok-hj">${esc(o.hijri)}</p>`:''}
          ${o.venue?`<p class="ok-ven">${esc(o.venue)}</p>`:''}
          <div class="ok-pills"><a class="ok-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="ok-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
        </div></div></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const u=++okN,en=o.lang==='en';
    return `<div class="cover cv-orkid${th.c.dark?' ok-dark':''}" style="${okVars(th.c)}"><i class="ok-bg"></i>
      <div class="ok-stage"><div class="ok-flip">
        <div class="ok-face ok-front"><div class="ok-shadow"><div class="ok-card" style="--okm:${OK_MASK}">${okCardArt(u)}
          <div class="ok-text"><p class="ok-k">${ev(o,L)}</p>${okNames(o,'p')}<i class="ok-rule"></i><p class="ok-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${o.venue?`<p class="ok-cven">${esc(o.venue)}</p>`:''}</div></div></div></div>
        <div class="ok-face ok-back"><div class="ok-shadow"><div class="ok-card" style="--okm:${OK_MASK}">
          <svg class="ok-art" viewBox="0 0 300 470" ${NS} aria-hidden="true"><path d="${OK_SHAPE}" class="ok-edge" transform="translate(150 238) scale(.945 .958) translate(-150 -238)"/></svg>
          <span class="ok-mono">${okMono(o)}</span></div></div></div>
      </div></div>
      <div class="ok-foot2">${guest?`<p class="ok-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="ok-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('ok-dark',!!c.dark);
    el.style.setProperty('--ok-sprig',K.uri(okSprig(c)));
    el.style.setProperty('--ok-whip',K.uri(`<svg ${NS} viewBox="0 0 160 12"><g fill="none" stroke="${c.gold}" stroke-linecap="round"><path d="M2 6C30 6 50 2 72 6C76 7 78 9 80 11C82 9 84 7 88 6C110 2 130 6 158 6" stroke-width=".8"/><circle cx="80" cy="4" r="1.6" fill="${c.gold}" stroke="none"/></g></svg>`));
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Pink orchids on a blush ground',c:{ground:'#ead7d2',sheet:'#fbf6ee',ink:'#3d2c2e',accent:'#7e3150',gold:'#a8895a',pagefg:'#3d2c2e',petal:'#efb3c6',petal2:'#d97f9f',lip:'#9b2f5c',leaf:'#6f8a5c',stem:'#6a7d52'}},
    {k:'sage',n:'Sage',desc:'Pink orchids on sage',c:{ground:'#c5cfbb',sheet:'#fbf8f0',ink:'#2f3529',accent:'#4d5f40',gold:'#a3895a',pagefg:'#283022',petal:'#f1bfd0',petal2:'#dc8aa6',lip:'#a2416a',leaf:'#5f7c4e',stem:'#5c7149'}},
    {k:'gading',n:'Gading',desc:'White orchids on ivory',c:{ground:'#ebe3d3',sheet:'#fdfaf3',ink:'#3a3128',accent:'#6e5233',gold:'#ad9058',pagefg:'#3a3128',petal:'#fbf3ee',petal2:'#e8cfc6',lip:'#c0573f',leaf:'#6c7d53',stem:'#677550'}},
    {k:'ungu',n:'Ungu',desc:'Lilac orchids on mauve',c:{ground:'#d8cadf',sheet:'#fbf7f4',ink:'#352a3a',accent:'#5a2d68',gold:'#a58a62',pagefg:'#2f2434',petal:'#dcbbe8',petal2:'#b07fc6',lip:'#6b2a7c',leaf:'#62795a',stem:'#5e7151'}},
    {k:'pic',n:'Pic',desc:'Apricot orchids on peach',c:{ground:'#f0dccb',sheet:'#fdf8f0',ink:'#3e2d25',accent:'#8a4630',gold:'#ad8a56',pagefg:'#3e2d25',petal:'#f6c9a9',petal2:'#e59a72',lip:'#b0432e',leaf:'#6f8457',stem:'#6a7a4e'}},
    {k:'zamrud',n:'Zamrud',desc:'Pink orchids on deep green',c:{ground:'#18352b',sheet:'#f9f4e8',ink:'#283229',accent:'#2c5240',gold:'#b3955c',pagefg:'#efe8d8',petal:'#f1bccb',petal2:'#d9849f',lip:'#9b2f5c',leaf:'#56805a',stem:'#567550',dark:1}},
    {k:'nila',n:'Nila',desc:'Pale orchids on midnight blue',c:{ground:'#1b2440',sheet:'#faf7f1',ink:'#262b3a',accent:'#33406e',gold:'#b2995f',pagefg:'#ebe8f1',petal:'#ead5f0',petal2:'#c09ad2',lip:'#6b3a8a',leaf:'#5b7a5c',stem:'#5a7152',dark:1}},
    {k:'marun',n:'Marun',desc:'White orchids on wine',c:{ground:'#3d1520',sheet:'#fbf5ee',ink:'#3a2427',accent:'#7a2033',gold:'#b8935a',pagefg:'#f6e9df',petal:'#faeeea',petal2:'#e6c3c4',lip:'#8e2438',leaf:'#617752',stem:'#5f714d',dark:1}},
  ]});
