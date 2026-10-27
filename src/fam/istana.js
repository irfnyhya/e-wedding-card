/* istana: royal Malay. A palace façade with tiered roofs and crossed gable boards drawn in gold line on deep
   green, a royal-yellow banner embroidered with crossed keris beneath a tanjak, ringed by padi.
   Cover: the banner hangs from a gold rod; touching it rolls it up to show the palace. Page: the façade with
   the names. Skin: royal plaques with tasselled corners and banded heading plaques. */
let uid=0;
const f1=v=>(+v).toFixed(1);
// a keris pointing up from 0,0: wavy blade (luk), ganja, bent hulu
function keris(){let l='',r='';const n=48;for(let i=0;i<=n;i++){const t=i/n,y=-14-t*132,w=(1-Math.pow(t,.8)*.88)*6.2+.4,o=Math.sin(t*Math.PI*7)*2.6*(1-t*.7);l+=`${i?'L':'M'}${f1(o-w)} ${f1(y)}`;r=`L${f1(o+w)} ${f1(y)}`+r}
  return `<path d="${l}L0 -149${r}Z" class="is-bl"/><path d="M0 -16V-136" class="is-blc"/>
   <path d="M-11 -14Q0 -20 11 -14L9 -10Q0 -13 -9 -10Z" class="is-gd"/>
   <path d="M-3 -10C-4 0 -2 8 -6 16C-8 20 -4 24 0 22C6 20 8 14 5 10C3 6 4 -2 3 -10Z" class="is-gd"/><path d="M-2 -6C-2 2 -1 8 -4 14" class="is-hl"/>`}
function crest(){const C=[[90,186],[52,178],[28,132],[38,70]],pt=t=>{const u=1-t;return[0,1].map(k=>u*u*u*C[0][k]+3*u*u*t*C[1][k]+3*u*t*t*C[2][k]+t*t*t*C[3][k])};
  let gr='';for(let i=0;i<13;i++){const t=.22+i*.06,[x,y]=pt(t),[x2,y2]=pt(t+.01),a=Math.atan2(y2-y,x2-x)*180/Math.PI;for(const sd of [1,-1]){const g=`<ellipse cx="0" cy="${-sd*5.5}" rx="2.2" ry="5" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a+90+sd*-28)})"/>`;gr+=g}}
  const stalk=`M${C[0]}C${C[1]} ${C[2]} ${C[3]}`;
  return `<svg class="is-crest" viewBox="0 0 200 200">
   <g class="is-padi"><path d="${stalk}" class="is-stalk"/><g class="is-gr">${gr}</g></g><g class="is-padi" transform="translate(200 0) scale(-1 1)"><path d="${stalk}" class="is-stalk"/><g class="is-gr">${gr}</g></g>
   <g transform="translate(100 182) rotate(-36) scale(.86)">${keris()}</g><g transform="translate(100 182) rotate(36) scale(-.86 .86)">${keris()}</g>
   <g transform="translate(100 104) scale(.82) translate(-100 -104)">
   <path d="M64 120C70 92 94 66 122 50C119 74 128 98 136 120Q100 129 64 120Z" class="is-tj"/>
   <path d="M122 50C112 70 100 92 92 122M110 60C102 78 92 98 80 121M126 84C116 98 110 110 108 124" class="is-tjl"/>
   <path d="M58 140Q100 152 142 140L136 118Q100 128 64 118Z" class="is-tjb"/><path d="M62 129Q100 140 139 129" class="is-tjl"/>
   ${[74,88,100,112,126].map(x=>`<circle cx="${x}" cy="${f1(133+3.4*(1-Math.pow((x-100)/30,2)))}" r="1.7" class="is-dot"/>`).join('')}</g>
   <circle cx="100" cy="188" r="4" class="is-gd"/><path d="M96 190l-10 8M104 190l10 8" class="is-stalk"/>
  </svg>`}
// the palace: long tiered roofs, crossed gable boards (silang gunting), verandah on pillars, central stair
function facade(){const id=++uid;const tiles=(x0,x1,y0,y1,step)=>{let d='';for(let y=y0+step;y<y1;y+=step)d+=`M${x0} ${y}H${x1}`;return d};
  const gable=(cx,ty,by,hw,cls='')=>`<path d="M${cx-hw} ${by}L${cx} ${ty}L${cx+hw} ${by}Z" class="is-gab ${cls}"/>
   ${Array.from({length:9},(_,i)=>`M${cx} ${by-2}L${f1(cx-hw*.86+hw*1.72*i/8)} ${f1(by-2-(by-ty)*.86*(1-Math.abs(i/8-.5)*2)+(by-ty)*.0)}`).join('').replace(/^/,'<path d="').concat('" class="is-ray"/>')}
   <path d="M${cx-hw-8} ${by+7}L${cx+6} ${ty-10}M${cx+hw+8} ${by+7}L${cx-6} ${ty-10}" class="is-board"/>
   <path d="M${cx-hw+6} ${by-3}L${cx} ${ty+9}L${cx+hw-6} ${by-3}" class="is-ln"/>`;
  const pillars=Array.from({length:17},(_,i)=>{const x=32+i*18.5;return `M${f1(x)} 246V292M${f1(x+3)} 246V292`}).join('');
  const win=Array.from({length:10},(_,i)=>{const x=44+i*29;if(i===4||i===5)return '';return `<path d="M${x} 230V206Q${x+8} 196 ${x+16} 206V230Z" class="is-win"/><path d="M${x+8} 200V230M${x} 216H${x+16}" class="is-ln"/>`}).join('');
  const bal=Array.from({length:44},(_,i)=>`M${f1(30+i*6.9)} 234V244`).join('');
  return `<svg class="is-fac" viewBox="0 0 360 300">
   <path d="M0 292H360" class="is-ln"/>
   <path d="${pillars}" class="is-ln"/><path d="M28 246H332V250H28Z" class="is-body"/>
   <path d="M150 292H210L202 250H158Z" class="is-body"/><path d="${Array.from({length:7},(_,i)=>`M${f1(151+i*1.2)} ${292-i*6}H${f1(209-i*1.2)}`).join('')}" class="is-ln"/>
   <path d="M30 190H330V246H30Z" class="is-body"/>${win}
   <path d="M30 232H330M30 246H330" class="is-ln"/><path d="${bal}" class="is-ln thin"/>
   <path d="M164 246V204Q180 186 196 204V246" class="is-door"/><path d="M180 196V246" class="is-ln"/>
   <path d="M12 194L70 142H290L348 194Z" class="is-roof"/><path d="${tiles(20,340,142,194,6)}" class="is-tile" clip-path="url(#isr${id})"/>
   <defs><clipPath id="isr${id}"><path d="M12 194L70 142H290L348 194Z"/><path d="M60 146L104 112H256L300 146Z"/></clipPath></defs>
   <path d="M60 146L104 112H256L300 146Z" class="is-roof"/><path d="${tiles(60,300,112,146,6)}" class="is-tile" clip-path="url(#isr${id})"/>
   ${gable(70,118,192,40,'s')}${gable(290,118,192,40,'s')}
   <path d="M150 112V80H210V112Z" class="is-body"/><path d="M160 108V88H172V108ZM188 108V88H200V108Z" class="is-win"/>
   ${gable(180,52,112,56)}
   <path d="M150 84L180 40L210 84Z" class="is-roof"/><path d="M162 52L180 24L198 52Z" class="is-roof"/>
   <path d="M180 24V6M176 12L180 4 184 12" class="is-board"/><circle cx="180" cy="16" r="2.4" class="is-dotg"/>
  </svg>`}
const REBUNG=c=>svgUriSq(`<svg ${NS} width="20" height="16" viewBox="0 0 20 16"><path d="M0 16L10 2 20 16Z" fill="none" stroke="${c.gold}" stroke-width=".8"/><path d="M5 16L10 9 15 16" fill="none" stroke="${c.gold}" stroke-width=".6"/><circle cx="10" cy="13.5" r="1" fill="${c.gold}"/></svg>`);
const LATT=c=>svgUriSq(`<svg ${NS} width="34" height="34" viewBox="0 0 34 34"><g fill="none" stroke="${c.gold}" stroke-width=".6" opacity=".22"><path d="M17 3l14 14-14 14L3 17z"/><path d="M17 10l7 7-7 7-7-7z"/></g><circle cx="17" cy="17" r="1.2" fill="${c.gold}" opacity=".3"/><circle cx="0" cy="0" r="1" fill="${c.gold}" opacity=".3"/><circle cx="34" cy="34" r="1" fill="${c.gold}" opacity=".3"/></svg>`);
const vars=c=>`--is-ban:${c.ban};--is-bt:${c.bt||c.accent};--is-pn:${c.pn||c.ban};--is-reb:${REBUNG(c)};--is-lat:${LATT(c)}`;
const tassel=cls=>`<i class="is-tas ${cls}"><svg viewBox="0 0 20 46"><path d="M10 0V8" class="is-cord"/><circle cx="10" cy="11" r="4.4" class="is-tg"/><path d="M6.5 14h7l3 28h-13z" class="is-tg"/><path d="M7 20h6M6 28h8M5 36h10" class="is-tl"/><path d="M3.5 42.5h13" class="is-tl"/></svg></i>`;
FAMILY({key:'istana',name:'Istana',meaning:'Royal Malay palace',
  blurb:'A royal-yellow banner embroidered with crossed keris and tanjak hangs before a palace drawn in gold; touch it and it rolls up.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-istana ${c.lt?'is-lt':''}" style="${vars(c)}"><i class="is-frame"></i><i class="is-band t"></i><i class="is-band b"></i>
     <div class="is-pcrest reveal">${crest()}</div>
     <p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="is-pfac reveal d2">${facade()}</div>
     <p class="is-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="is-ven reveal d3">${esc(o.venue)} · ${en?'from':'jam'} ${esc(fmtTime(o.start,o.lang))}</p></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-istana ${c.lt?'is-lt':''}" style="${vars(c)}"><i class="is-frame"></i><i class="is-band t"></i><i class="is-band b"></i>
     <div class="is-cfac">${facade()}</div>
     <i class="is-rod"></i>
     <${tag} class="is-ban" ${attr} aria-label="${L.open}"><span class="is-cloth"><span class="is-in">
       <span class="is-k">${ev(o,L)}</span>${crest()}<span class="is-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</span><span class="is-d">${esc(fmtDate(o.date,o.lang))}</span></span></span>
      <span class="is-roll">${tassel('l')}${tassel('m')}${tassel('r')}</span></${tag}>
     <div class="is-foot">${guest?`<p class="is-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="is-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=th.c;el.style.cssText+=';'+vars(c);if(c.lt)el.classList.add('is-lt');
    $$('.sheet > .sec',el).forEach(s=>s.insertAdjacentHTML('beforeend',`<i class="is-ct l"></i><i class="is-ct r"></i>${tassel('sl')}${tassel('sr')}`));
    $$('.sec h2',el).forEach(h=>{h.classList.add('is-plq')})},
  themes:[
    {k:'kuning',n:'Kuning Hijau',desc:'Royal yellow banner on deep green',c:{ground:'#0d3828',sheet:'#fdf6dc',ink:'#1d2a20',accent:'#0d3828',gold:'#d6a83c',pagefg:'#f5e6ae',ban:'#f0bf2a'}},
    {k:'biru',n:'Kuning Biru',desc:'Royal yellow on royal blue',c:{ground:'#13245a',sheet:'#fdf7e0',ink:'#1a2240',accent:'#13245a',gold:'#d8ac45',pagefg:'#f2e6b8',ban:'#f2c232'}},
    {k:'marun',n:'Marun',desc:'Royal yellow on maroon',c:{ground:'#561019',sheet:'#fdf5df',ink:'#2c1a17',accent:'#561019',gold:'#d9aa48',pagefg:'#f6e3b4',ban:'#efbd2e'}},
    {k:'hitam',n:'Hitam',desc:'Yellow and gold on black',c:{ground:'#0e0e0d',sheet:'#fbf3dc',ink:'#1d1a14',accent:'#1d1a14',gold:'#cfa13e',pagefg:'#f1e2b0',ban:'#e9b82a'}},
    {k:'emas',n:'Emas',desc:'Pale-gold banner on dark olive',c:{ground:'#2a2510',sheet:'#fbf6e6',ink:'#2a2510',accent:'#2a2510',gold:'#d6b45a',pagefg:'#efe2b8',ban:'#e8d8a2'}},
    {k:'ungu',n:'Ungu',desc:'Royal yellow on imperial purple',c:{ground:'#2e1640',sheet:'#fdf6e2',ink:'#2a1b33',accent:'#2e1640',gold:'#d8ab48',pagefg:'#f3e3bb',ban:'#f1c13a'}},
    {k:'hijau',n:'Hijau Kuning',desc:'Green banner on royal-yellow ground',c:{ground:'#f0d775',sheet:'#fffaea',ink:'#1d2a20',accent:'#0f4a33',gold:'#a8822a',pagefg:'#1f2d22',ban:'#0f4a33',bt:'#f4d36a',pn:'#0f4a33',lt:1}},
    {k:'gading',n:'Gading',desc:'Maroon banner on ivory',c:{ground:'#efe5cc',sheet:'#fffbf0',ink:'#2c1a17',accent:'#6a1622',gold:'#b08a3a',pagefg:'#2c1a17',ban:'#6a1622',bt:'#f1cf6a',pn:'#6a1622',lt:1}},
  ]});
