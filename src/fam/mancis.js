/* mancis: an old safety-match box with a letterpress label: an ink field, a cream cartouche, an engraved flower in a dotted medallion,
   and a gritty striker strip down the side. Cover: the box stands at an angle; tap "Buka Jemputan" and the tray slides up out of the sleeve.
   Page: the label laid flat on the table with two smaller labels (details, RSVP). Skin: cream board cards printed with a fine ink border. */
// the medallion: a dotted ring with the motto set round it, the engraving sits inside
let mcN=0;
const mcMedal=(o,c)=>{const u=++mcN,en=o.lang==='en',t=en?'A perfect match · A perfect match ·':'Sepadan · Serasi · Sepadan · Serasi ·';
  const dots=K.ring(44,46.5,50,50).map(([x,y])=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r=".75"/>`).join('');
  return `<svg class="mc-ring" viewBox="0 0 100 100" aria-hidden="true"><defs><path id="mcp${u}" d="M50 50m-36.4 0a36.4 36.4 0 1 1 72.8 0a36.4 36.4 0 1 1 -72.8 0"/></defs>
    <g fill="currentColor">${dots}</g><circle cx="50" cy="50" r="43.5" fill="none" stroke="currentColor" stroke-width=".5"/><circle cx="50" cy="50" r="33" fill="none" stroke="currentColor" stroke-width=".5"/><circle cx="50" cy="50" r="31.6" fill="none" stroke="currentColor" stroke-width=".25"/>
    <text font-size="5.6" letter-spacing="1.25" fill="currentColor"><textPath href="#mcp${u}" startOffset="0">${t}</textPath></text></svg>${ENG(c.eng,'','mc-eng')}`};
// small corner fleuron, printed in the label ink
const mcCorner=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 1h10M1 1v10M4 4h5M4 4v5" fill="none" stroke="currentColor" stroke-width=".7"/><path d="M8 8q5 0 5 5q-3-.5-5-5z" fill="currentColor"/><circle cx="14.5" cy="14.5" r="1" fill="currentColor"/></svg>`;
const mcCorners=['tl','tr','bl','br'].map(k=>`<i class="mc-cor ${k}">${mcCorner}</i>`).join('');
// the printed label: cream board > ink field > cream cartouche
const mcLabel=(o,L,c,big)=>{const [n1,n2]=coverNames(o);
  return `<div class="mc-label${big?' big':''}"><div class="mc-field">${mcCorners}
    <p class="mc-band">${big?esc(o.hijri||fmtShort(o.date).replace(/\./g,' · ')):ev(o,L)}</p>
    <div class="mc-medal">${mcMedal(o,c)}</div>
    <div class="mc-cart">${big?`<p class="mc-k kicker">${ev(o,L)}</p>`:''}<${big?'h1':'p'} class="mc-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${big?'h1':'p'}></div>
    <p class="mc-band mc-date">${big?esc(fmtDate(o.date,o.lang)):esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>`};
// faint grain for the striker and board, drawn once
const mcGrit=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.4 -.55"/></filter><rect width="120" height="120" filter="url(#g)"/></svg>`);
const mcVars=c=>`--strike:${c.strike};--board:${c.board}`;
FAMILY({key:'mancis',name:'Mancis',meaning:'Matchbox',
  blurb:'An old safety-match box with a letterpress label and an engraved flower, standing on the table. The tray slides out to open the card.',
  fonts:{d:"'IM Fell English SC', serif",s:"'IM Fell English', serif",b:"'IM Fell English', serif"},ms:1500,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-mancis2" style="--grit:${mcGrit};${mcVars(c)}"><div class="mc-table"></div>
      <div class="mc-flat reveal">${mcLabel(o,L,c,true)}<i class="mc-strike"></i></div>
      <div class="mc-tiles">
        <a class="mc-tile reveal d1" data-go="when" href="#"><small>${en?'Date & venue':'Tarikh & tempat'}</small><b>${en?'Event details':'Butiran Majlis'}</b></a>
        ${o.x_rsvp?`<a class="mc-tile mc-round reveal d2" data-go="rsvp" href="#"><small>${en?'Kindly reply':'Sudi hadir?'}</small><b>RSVP</b></a>`:''}
      </div>
      ${o.venue?`<p class="mc-ven reveal d3">${esc(o.venue)}</p>`:''}</section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c,[n1,n2]=coverNames(o);
    return `<div class="cover cv-mancis2" style="--grit:${mcGrit};${mcVars(c)}"><div class="mc-table"></div>
      ${guest?`<p class="mc-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
      <div class="mc-scene"><i class="mc-shadow"></i><div class="mc-box">
        <div class="mc-tray"><i class="mc-floor"><span class="mc-note"><small>${en?'with love':'dengan kasih'}</small>${esc(n1)} &amp; ${esc(n2)}</span></i><i class="mc-tw l"></i><i class="mc-tw r"></i><i class="mc-te"></i></div>
        <div class="mc-front">${mcLabel(o,L,c,false)}</div>
        <div class="mc-side"></div><div class="mc-back"></div>
      </div></div>
      <${tag} class="mc-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);const sc=$('.scroller',el);el.style.setProperty('--grit',mcGrit);el.style.setProperty('--board',th.c.board);el.style.setProperty('--strike',th.c.strike);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Sepia label on an ivory table',c:{ground:'#e9e1d2',sheet:'#f7f0e1',ink:'#2e261d',accent:'#6b4b2a',gold:'#b08a4e',pagefg:'#2e261d',line:'rgba(60,40,20,.25)',eng:'jasmine',strike:'#6a4a36',board:'#d8c7a6'}},
    {k:'nila',n:'Nila',desc:'Indigo label on a midnight table',c:{ground:'#141c30',sheet:'#f5efe1',ink:'#232633',accent:'#1f3361',gold:'#c9a55e',pagefg:'#ece6d8',line:'rgba(31,51,97,.25)',eng:'iris',strike:'#5b4038',board:'#cdb991'}},
    {k:'marun',n:'Marun',desc:'Maroon label on a dark wine table',c:{ground:'#2a0d14',sheet:'#f7efe0',ink:'#2e1d1d',accent:'#7a1d2c',gold:'#c9a055',pagefg:'#f1e5d6',line:'rgba(122,29,44,.25)',eng:'cabbage-rose',strike:'#4e3430',board:'#d2bd96'}},
    {k:'zamrud',n:'Zamrud',desc:'Bottle-green label on a dark green table',c:{ground:'#0f2219',sheet:'#f4eedf',ink:'#1e2a22',accent:'#1d4a35',gold:'#c6a35a',pagefg:'#e9e6d6',line:'rgba(29,74,53,.25)',eng:'lotus',strike:'#5a4234',board:'#cdbb94'}},
    {k:'jambu',n:'Jambu',desc:'Rose label on a blush table',c:{ground:'#ecd9d3',sheet:'#fbf3ea',ink:'#3a2526',accent:'#9b4a5a',gold:'#b98f62',pagefg:'#3a2526',line:'rgba(155,74,90,.25)',eng:'wild-rose',strike:'#6b4640',board:'#dcc6a8'}},
    {k:'sage',n:'Sage',desc:'Sage label on an olive table',c:{ground:'#2c3428',sheet:'#f4f0e2',ink:'#262b22',accent:'#4f6347',gold:'#bfa064',pagefg:'#e8e6d8',line:'rgba(79,99,71,.25)',eng:'forget-me-not',strike:'#5a4636',board:'#cfc09a'}},
    {k:'hitam',n:'Hitam',desc:'Scarlet label on a black table',c:{ground:'#121011',sheet:'#f6efdf',ink:'#221c1a',accent:'#a3263a',gold:'#d2ad62',pagefg:'#ece4d6',line:'rgba(163,38,58,.25)',eng:'red-rose',strike:'#4a3631',board:'#d0bc94'}},
    {k:'terakota',n:'Terakota',desc:'Terracotta label on a clay table',c:{ground:'#3a1e14',sheet:'#f8efe2',ink:'#33231b',accent:'#a24a26',gold:'#d4a468',pagefg:'#f2e5d6',line:'rgba(162,74,38,.25)',eng:'hibiscus',strike:'#5b3e30',board:'#d6bf98'}},
  ]});
