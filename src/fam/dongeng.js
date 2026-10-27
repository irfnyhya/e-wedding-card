/* dongeng: "Dongeng". A page from an old storybook: warm parchment inside a painted border of winding vines,
   leaves, small flowers and little birds, gilt corner blocks, and a gold illuminated initial opening a short
   "Alkisah..." line before the names. The page lies on the book's cloth cover with its page edges showing.
   Cover: tap "Buka Jemputan" and the page turns. Page: the same illuminated page, taller.
   Skin: parchment cards with a vine band across the top and a gilt initial-style heading mark. */
needFont('Uncial+Antiqua');
let dgN=0;
const df=v=>(+v).toFixed(1);
// a five-petal flower, a leaf, a perched bird (no people), in the book's palette p
const dgFlower=(x,y,r,f,p)=>{let d='';for(let i=0;i<5;i++){const a=(i*72-90)*Math.PI/180;d+=`<circle cx="${df(x+Math.cos(a)*r*.62)}" cy="${df(y+Math.sin(a)*r*.62)}" r="${df(r*.5)}"/>`}
  return `<g fill="${f}" stroke="${p.ink}" stroke-width=".45">${d}</g><circle cx="${x}" cy="${y}" r="${df(r*.34)}" fill="${p.gold}" stroke="${p.ink}" stroke-width=".4"/>`};
const dgLeaf=(x,y,a,L,p,k=0)=>`<g transform="translate(${df(x)} ${df(y)}) rotate(${df(a)})"><path d="M0 0C${df(L*.3)} ${df(-L*.32)} ${df(L*.75)} ${df(-L*.3)} ${df(L)} 0C${df(L*.7)} ${df(L*.26)} ${df(L*.3)} ${df(L*.26)} 0 0Z" fill="${k?p.leaf2:p.leaf}" stroke="${p.ink}" stroke-width=".45"/><path d="M${df(L*.1)} 0H${df(L*.8)}" stroke="${p.ink}" stroke-width=".3" opacity=".6"/></g>`;
const dgBird=(x,y,s,flip,f,p)=>`<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})">
  <path d="M-12 1L-20 6L-17 0L-21-2L-11-2Z" fill="${f}" stroke="${p.ink}" stroke-width=".5" stroke-linejoin="round"/>
  <path d="M-12-1C-10-8-2-11 4-9C7-12 12-11 13-8L17-7L13-5C13 1 6 6-2 6C-7 6-11 3-12-1Z" fill="${f}" stroke="${p.ink}" stroke-width=".55" stroke-linejoin="round"/>
  <path d="M-8-1C-4-6 2-6 6-2C2 0-3 2-8-1Z" fill="${p.wing}" stroke="${p.ink}" stroke-width=".4"/><path d="M-6 0C-3-2 0-2 3-1" stroke="${p.ink}" stroke-width=".3" fill="none"/>
  <circle cx="9.6" cy="-7.4" r=".9" fill="${p.ink}"/><path d="M-1 6L-2 10M3 6L3 10M-4 10H6" stroke="${p.ink}" stroke-width=".5" fill="none"/></g>`;
// a gilt corner block with a small rosette
const dgCorner=(x,y,p)=>`<rect x="${x}" y="${y}" width="22" height="22" fill="${p.gold}" stroke="${p.ink}" stroke-width=".6"/><rect x="${x+2.5}" y="${y+2.5}" width="17" height="17" fill="${p.blue}" stroke="${p.ink}" stroke-width=".4"/>
  ${dgFlower(x+11,y+11,6,p.red,p)}<path d="M${x+2.5} ${y+2.5}l3 3M${x+19.5} ${y+2.5}l-3 3M${x+2.5} ${y+19.5}l3-3M${x+19.5} ${y+19.5}l-3-3" stroke="${p.gold}" stroke-width=".8"/>`;
// the horizontal vine for the top and bottom bands (x 36..264, centre y)
function dgHVine(y,p,seed){const r=rng(seed);let d=`M36 ${y}`,deco='';
  for(let i=0;i<8;i++){const x0=36+i*28.5,x1=x0+28.5,s=i%2?1:-1;d+=`C${df(x0+9)} ${df(y+5*s)} ${df(x1-9)} ${df(y+5*s)} ${df(x1)} ${y}`;
    deco+=dgLeaf(x0+14,y+3.6*s,s>0?40:-40,10,p,i%2);if(i%2===0&&i!==4)deco+=dgFlower(x0+21,y-3*s,5.4,[p.red,p.blue,p.rose][i/2%3|0],p);else if(i!==3&&i!==4)deco+=`<circle cx="${df(x0+22)}" cy="${df(y-4*s)}" r="1.6" fill="${p.red}" stroke="${p.ink}" stroke-width=".35"/>`}
  return `<path d="${d}" fill="none" stroke="${p.leaf}" stroke-width="1.5"/><path d="${d}" fill="none" stroke="${p.ink}" stroke-width=".4" transform="translate(0 .9)" opacity=".55"/>${deco}`}
function dgTop(p,flipped){const g=`<path d="M14 14H286V74H14ZM36 36V74H264V36Z" fill="${p.band}" fill-rule="evenodd"/>
  <path d="M14 74V14H286V74M36 74V36H264V74" fill="none" stroke="${p.ink}" stroke-width=".8"/><path d="M11 74V11H289V74M39 74V39H261V74" fill="none" stroke="${p.gold}" stroke-width=".6"/>
  ${dgHVine(25,p,flipped?3:1)}
  <path d="M25 36C21 46 29 54 25 64C23 70 25 74 25 74M275 36C279 46 271 54 275 64C277 70 275 74 275 74" fill="none" stroke="${p.leaf}" stroke-width="1.5"/>
  ${dgLeaf(25,50,-130,8,p)}${dgLeaf(275,50,-50,8,p,1)}
  ${dgCorner(14,14,p)}${dgCorner(264,14,p)}`;
  const birds=flipped?dgBird(222,-9,.9,1,p.rose,p):dgBird(150,-10,.95,0,p.blue,p)+dgBird(78,-8,.7,1,p.rose,p);
  return `<svg class="dg-${flipped?'bot':'top'}" viewBox="0 0 300 74" ${NS} aria-hidden="true">${flipped?`<g transform="translate(0 74) scale(1 -1)">${g}</g><g transform="translate(0 54)">${birds}</g>`:`${g}<g transform="translate(0 32)">${birds}</g>`}</svg>`}
// one repeat of the side band, 50 x 120: rules, a winding vine, leaves, a flower and berries
const dgTile=(p,flip)=>K.uri(`<svg ${NS} width="50" height="120" viewBox="0 0 50 120"><g ${flip?'transform="translate(50 0) scale(-1 1)"':''}>
  <rect x="14" y="0" width="22" height="120" fill="${p.band}"/><path d="M14 0V120M36 0V120" stroke="${p.ink}" stroke-width=".8"/><path d="M11 0V120M39 0V120" stroke="${p.gold}" stroke-width=".6"/>
  <path d="M25 0C31 10 31 20 25 30C19 40 19 50 25 60C31 70 31 80 25 90C19 100 19 110 25 120" fill="none" stroke="${p.leaf}" stroke-width="1.5"/>
  ${dgLeaf(28,14,-50,10,p)}${dgLeaf(22,44,-130,10,p,1)}${dgLeaf(28,74,-50,10,p,1)}${dgLeaf(22,104,-130,10,p)}
  ${dgFlower(21,26,5.4,flip?p.blue:p.red,p)}${dgFlower(29,86,5.4,flip?p.rose:p.blue,p)}
  <circle cx="30" cy="52" r="1.6" fill="${p.red}" stroke="${p.ink}" stroke-width=".35"/><circle cx="20" cy="112" r="1.6" fill="${p.red}" stroke="${p.ink}" stroke-width=".35"/></g></svg>`);
const dgVars=c=>`--parch:${c.sheet};--band:${c.p.band};--dgl:${dgTile(c.p)};--dgr:${dgTile(c.p,1)};--red:${c.p.red};--blue:${c.p.blue}`;
// the illuminated initial: a gilt square, a coloured field with white filigree, the letter in gold
const dgInit=(ch,p)=>`<span class="dg-init" aria-hidden="true"><svg viewBox="0 0 60 60" ${NS}><rect x="1" y="1" width="58" height="58" fill="${p.gold}" stroke="${p.ink}" stroke-width=".8"/><rect x="5" y="5" width="50" height="50" fill="${p.blue}" stroke="${p.ink}" stroke-width=".5"/>
  <g fill="none" stroke="#fff" stroke-opacity=".55" stroke-width=".7"><path d="M9 51C16 44 12 36 19 31S28 22 24 14M51 9C44 16 48 24 41 29S32 38 36 46"/><path d="M15 40c-3-2-5-1-6 1M19 31c3-3 6-2 7 0M41 29c-3 3-6 2-7 0M45 20c3 2 5 1 6-1"/></g>
  <g fill="#fff" fill-opacity=".6"><circle cx="12" cy="12" r="1.2"/><circle cx="48" cy="48" r="1.2"/><circle cx="48" cy="12" r="1"/><circle cx="12" cy="48" r="1"/></g></svg><b>${esc(ch)}</b></span>`;
const dgTale=(o,p)=>{const en=o.lang==='en';return `<p class="dg-tale">${dgInit(en?'O':'A',p)}${en?'nce upon a time, two hearts found each other, and now their day has come.':'lkisah, dua hati telah dipertemukan, dan kini tibalah hari mereka disatukan.'}</p>`};
const dgPair=p=>`<svg class="dg-pair" viewBox="0 0 120 40" ${NS} aria-hidden="true"><path d="M8 32C30 27 50 34 60 31S96 26 112 30" fill="none" stroke="${p.ink}" stroke-width="1.1"/>${dgLeaf(22,30,-160,9,p)}${dgLeaf(98,29,-20,9,p,1)}${dgLeaf(60,31,90,7,p,1)}${dgFlower(12,30,4,p.red,p)}${dgFlower(108,29,4,p.blue,p)}<g transform="translate(0 21)">${dgBird(44,0,.82,0,p.blue,p)}${dgBird(76,0,.82,1,p.rose,p)}</g></svg>`;
const dgNames=(o,tag='h1')=>{const [n1,n2]=coverNames(o);return `<${tag} class="dg-names"><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
const dgPage=(c,inner)=>`<div class="dg-page">${dgTop(c.p)}<div class="dg-mid"><i class="dg-side l"></i><div class="dg-in">${inner}</div><i class="dg-side r"></i></div>${dgTop(c.p,1)}</div>`;
FAMILY({key:'dongeng',name:'Dongeng',meaning:'Storybook page',
  blurb:'A page from an old storybook: a painted border of vines, flowers and little birds, gilt corners and a gold illuminated initial opening the tale, resting on the book\'s cloth cover. The page turns to open.',
  fonts:{d:"'Uncial Antiqua', serif",s:"'Uncial Antiqua', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const c=th.c,en=o.lang==='en';
    const inner=`<div class="dg-col">
      ${o.bismillah?`<p class="dg-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
      ${dgTale(o,c.p)}<p class="dg-k kicker">${ev(o,L)}</p>${dgNames(o)}<i class="dg-rule"></i>
      <p class="dg-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="dg-hj">${esc(o.hijri)}</p>`:''}
      ${o.venue?`<p class="dg-ven">${esc(o.venue)}</p>`:''}
      <div class="dg-pills"><a class="dg-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="dg-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></div>`;
    return `<section class="page pg-dongeng${c.dark?' dg-dark':''}" style="${dgVars(c)}"><i class="dg-cloth"></i><div class="dg-pw reveal"><div class="dg-stack">${dgPage(c,inner)}<i class="dg-gutter"></i></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en';
    const inner=`<div class="dg-ctext">${dgTale(o,c.p)}<p class="dg-k">${ev(o,L)}</p>${dgNames(o,'p')}<i class="dg-rule"></i><p class="dg-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${dgPair(c.p)}</div>`;
    return `<div class="cover cv-dongeng${c.dark?' dg-dark':''}" style="${dgVars(c)}"><i class="dg-cloth"></i>
      <div class="dg-book"><div class="dg-under"><i class="dg-gutter"></i></div><div class="dg-leaf"><div class="dg-front">${dgPage(c,inner)}<i class="dg-gutter"></i></div><i class="dg-back"></i></div></div>
      <div class="dg-foot">${guest?`<p class="dg-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="dg-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c,p=c.p;el.classList.toggle('dg-dark',!!c.dark);
    [['--parch',c.sheet],['--band',p.band],['--red',p.red],['--blue',p.blue]].forEach(([k,v])=>el.style.setProperty(k,v));
    el.style.setProperty('--dg-band',K.uri(`<svg ${NS} width="228" height="22" viewBox="36 14 228 22">${dgHVine(25,p,1)}</svg>`));
    el.style.setProperty('--dg-mark',K.uri(`<svg ${NS} width="120" height="20" viewBox="0 0 120 20"><path d="M2 10C20 4 36 16 52 10M118 10C100 4 84 16 68 10" fill="none" stroke="${p.leaf}" stroke-width="1.2"/>${dgLeaf(18,9,-30,7,p)}${dgLeaf(102,9,-150,7,p,1)}<rect x="53" y="3" width="14" height="14" fill="${p.gold}" stroke="${p.ink}" stroke-width=".6" transform="rotate(45 60 10)"/>${dgFlower(60,10,4,p.red,p)}</svg>`));
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:(()=>{const P=(o)=>({ink:'#4a3424',gold:'#c39a46',red:'#a8493a',blue:'#55708e',rose:'#c98478',leaf:'#6f7d48',leaf2:'#8c9a5c',wing:'#e9dcc0',band:'#f6ecd4',...o});
    return [
    {k:'hijau',n:'Hijau',desc:'Storybook page on a green cloth cover',c:{ground:'#3e5639',sheet:'#f2e5c9',ink:'#3e2e22',accent:'#7a3a2a',gold:'#a27a32',pagefg:'#efe6d0',dark:1,p:P({})}},
    {k:'merah',n:'Merah',desc:'Storybook page on a red cloth cover',c:{ground:'#73291f',sheet:'#f3e6cb',ink:'#3e2e22',accent:'#7e2e22',gold:'#a27a32',pagefg:'#f5e6d4',dark:1,p:P({red:'#b04a36',blue:'#4f6a86'})}},
    {k:'biru',n:'Biru',desc:'Storybook page on a blue cloth cover',c:{ground:'#2c4262',sheet:'#f2e7cf',ink:'#2e2a26',accent:'#2e4466',gold:'#a27a32',pagefg:'#e9ecf2',dark:1,p:P({blue:'#4a6890',rose:'#c48a82'})}},
    {k:'coklat',n:'Coklat',desc:'Storybook page on a brown leather cover',c:{ground:'#4f3422',sheet:'#f1e2c3',ink:'#3e2e22',accent:'#6e3a22',gold:'#a27a32',pagefg:'#f2e5d0',dark:1,p:P({red:'#a65a32',blue:'#5f7a7a',rose:'#cf9a6e'})}},
    {k:'hitam',n:'Hitam',desc:'Storybook page on a black cloth cover',c:{ground:'#1e1b18',sheet:'#f2e5c9',ink:'#3e2e22',accent:'#6e2a22',gold:'#a27a32',pagefg:'#eee4d2',dark:1,p:P({})}},
    {k:'gading',n:'Gading',desc:'Storybook page on an ivory linen cover',c:{ground:'#e3d8c0',sheet:'#f8eed8',ink:'#3e2e22',accent:'#7a3a2a',gold:'#a27a32',pagefg:'#3e2e22',p:P({band:'#fbf3df'})}},
    {k:'jambu',n:'Jambu',desc:'Storybook page on a dusty-rose cover',c:{ground:'#d8b8ae',sheet:'#f8ecdc',ink:'#3e2a26',accent:'#8a3a40',gold:'#a27a32',pagefg:'#3e2a26',p:P({red:'#b2505a',rose:'#d99a9a',blue:'#6a7f9a',band:'#fbf0e2'})}},
    {k:'kunyit',n:'Kunyit',desc:'Storybook page on a mustard cover',c:{ground:'#c2953e',sheet:'#f6eacd',ink:'#3e2e22',accent:'#7a3a22',gold:'#a27a32',pagefg:'#2e2418',p:P({red:'#b0503a',blue:'#4e6a7e',leaf:'#6a7a3e'})}},
  ]})()});
