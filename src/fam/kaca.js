/* kaca: a leaded stained-glass window (qamariya) set deep in a dark plaster wall, star-and-cross glass lit from behind,
   its coloured light falling on the wall and the sill.
   Cover: tap "Buka Jemputan", the sun comes out behind the glass and its light fills the screen.
   Page: the window as a headpiece with light falling from it over the names. Skin: dark plaster cards under a leaded glass transom. */
let kcN=0;
const KC_ARCH='M4 148V58C4 32 26 17 50 4C74 17 96 32 96 58V148Z',KC_IN='M11 141V60C11 38 29 26 50 14C71 26 89 38 89 60V141Z';
// star-and-cross glass in a 100 x 150 box, clipped to the arch
function kcGlass(g,uid,s=16.5){let panes='',lead='';
  for(let j=0;j<20;j++)for(let i=-4;i<=4;i++){const cx=50+i*s+(j%2?s/2:0),cy=146-j*s*.5;if(cy<-4||cx<-8||cx>108)continue;
    const d=K.star(8,s*.46,s*.29,cx,cy),f=g[[0,2,4][(Math.abs(i)+j)%3]];
    panes+=`<path d="${d}" fill="${f}"/><circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${(s*.1).toFixed(2)}" fill="${g[1]}"/>`;
    lead+=`<path d="${d}"/><circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${(s*.1).toFixed(2)}"/>`}
  return `<svg class="kc-glass" viewBox="0 0 100 150" ${NS} aria-hidden="true"><defs>
    <clipPath id="kci${uid}"><path d="${KC_IN}"/></clipPath><mask id="kcm${uid}"><rect x="-5" y="-5" width="110" height="160" fill="#fff"/><circle cx="50" cy="50" r="17" fill="#000"/></mask>
    <filter id="kcn${uid}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="3" seed="${uid+3}"/>
      <feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  .9 0 0 0 0" result="n"/><feBlend in="SourceGraphic" in2="n" mode="soft-light" result="b"/><feComposite in="b" in2="SourceGraphic" operator="in"/></filter>
    <radialGradient id="kcl${uid}" cx=".5" cy=".3" r=".75"><stop offset="0" stop-color="#fff8e6" stop-opacity=".55"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
    <linearGradient id="kcr${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#000" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
    <filter id="kcb${uid}"><feGaussianBlur stdDeviation="1.6"/></filter>
    <filter id="kch${uid}" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur in="SourceGraphic" stdDeviation="1.1" result="bl"/><feColorMatrix in="bl" values="1.1 0 0 0 .05  0 1.1 0 0 .05  0 0 1.1 0 .05  0 0 0 .75 0" result="bl2"/><feBlend in="SourceGraphic" in2="bl2" mode="screen"/></filter></defs>
    <path d="M-4 152V57C-4 26 21 9 50 -5C79 9 104 26 104 57V152Z" class="kc-rev"/><path d="M-4 152V57C-4 26 21 9 50 -5C79 9 104 26 104 57V152Z" fill="url(#kcr${uid})"/>
    <g filter="url(#kch${uid})"><g filter="url(#kcn${uid})"><path d="${KC_ARCH}" fill="${g[1]}"/><g clip-path="url(#kci${uid})"><rect x="0" y="0" width="100" height="150" fill="${g[3]}"/>${panes}${(()=>{const pts=K.ring(16,13.5,50,50).map(([x,y])=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="2.6" fill="${g[2]}"/>`).join('');return `<circle cx="50" cy="50" r="17" fill="${g[4]}"/>${pts}<circle cx="50" cy="50" r="11" fill="${g[3]}"/><path d="${K.star(8,10.5,6,50,50)}" fill="${g[0]}"/><circle cx="50" cy="50" r="3.4" fill="${g[1]}"/>`})()}</g></g>
    <path d="${KC_ARCH}" fill="url(#kcl${uid})" style="mix-blend-mode:screen"/>
    <g clip-path="url(#kci${uid})" fill="none" stroke="#17130f" stroke-width="1" stroke-linejoin="round"><g mask="url(#kcm${uid})">${lead}</g>
      <circle cx="50" cy="50" r="17" stroke-width="1.5"/>${K.ring(16,13.5,50,50).map(([x,y])=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="2.6"/>`).join('')}<circle cx="50" cy="50" r="11"/><path d="${K.star(8,10.5,6,50,50)}"/><circle cx="50" cy="50" r="3.4"/></g>
    <path d="M7.5 144.5V59C7.5 35 27.5 21.5 50 9C72.5 21.5 92.5 35 92.5 59V144.5" fill="none" stroke="#17130f" stroke-width="6.4" stroke-dasharray=".7 4.6"/>
    <path d="${KC_IN}" fill="none" stroke="#17130f" stroke-width="1.3"/><path d="${KC_ARCH}" fill="none" stroke="#000" stroke-width="3" opacity=".55" filter="url(#kcb${uid})"/><path d="${KC_ARCH}" fill="none" stroke="#17130f" stroke-width="1.6"/>
    <path d="M0 96H100M0 120H100" stroke="#17130f" stroke-width="1.1" opacity=".85"/></g></svg>`}
const kcWin=(th,cls='')=>{const u=++kcN,g=th.glass;return `<div class="kc-win ${cls}" style="--g0:${g[0]};--g1:${g[1]};--g2:${g[2]}"><div class="kc-glow"></div>${kcGlass(g,u)}<div class="kc-sill"></div></div>`};
const kcNames=o=>{const [n1,n2]=coverNames(o);return `<p class="kc-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>`};
const kcLift=(h,a)=>'#'+[1,3,5].map(i=>Math.round(parseInt(h.substr(i,2),16)*(1-a)+255*a).toString(16).padStart(2,'0')).join('');
const kcT=(k,n,desc,ground,accent,glass,light)=>({k,n,desc,c:{ground,sheet:kcLift(ground,.06),ink:'#ece4d6',accent,gold:'#d9b06a',pagefg:'#efe7da',lit:light},extra:{glass}});
FAMILY({key:'kaca',name:'Kaca',meaning:'Stained glass',
  blurb:'A leaded stained-glass window set deep in a plaster wall, lit from behind. When guests open the card the sun comes out and its light fills the screen.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const en=o.lang==='en';return `<section class="page pg-kaca2" style="--lit:${th.c.lit}"><div class="kc-wall"></div>${kcWin(th,'small')}<div class="kc-beam"></div>
    ${o.bismillah?'<p class="kc-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
    <p class="kc-k kicker reveal">${ev(o,L)}</p>${kcNames(o)}
    <p class="kc-date reveal d1">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="kc-hj reveal d1">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="kc-ven reveal d2">${esc(o.venue)}</p>`:''}
    <a class="kc-pill reveal d3" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-kaca2" style="--lit:${th.c.lit}"><div class="kc-wall"></div>
    <p class="kc-k kc-top">${ev(o,L)}</p>
    <div class="kc-stage">${kcWin(th)}</div>
    <div class="kc-mid">${kcNames(o)}<p class="kc-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
    <div class="kc-foot">${guest?`<p class="kc-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="kc-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div><div class="kc-flood"></div></div>`},
  skin(el,o,th,L){K.cards(el);const g=th.glass;
    // a small leaded roundel over each heading
    const dots=K.ring(12,15,20,20).map(([x,y])=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="3.2" fill="${g[2]}" stroke="#17130f" stroke-width="1"/>`).join('');
    el.style.setProperty('--transom',K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="${g[4]}" stroke="#17130f" stroke-width="1.6"/>${dots}<circle cx="20" cy="20" r="11" fill="${g[3]}" stroke="#17130f" stroke-width="1.1"/><path d="${K.star(8,10,5.6,20,20)}" fill="${g[0]}" stroke="#17130f" stroke-width="1"/><circle cx="20" cy="20" r="3" fill="${g[1]}" stroke="#17130f" stroke-width=".9"/></svg>`));
    el.style.setProperty('--g0',g[0]);el.style.setProperty('--g1',g[1]);el.style.setProperty('--lit',th.c.lit);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    kcT('mawar','Mawar','Rose and amber glass in a dark wall','#251c1a','#b8475e',['#b8475e','#d9a441','#4f7a4a','#e7c2a0','#7a2e3e'],'#f2c7cf'),
    kcT('zamrud','Zamrud','Emerald and gold glass in a dark wall','#122019','#2f7a5a',['#2f7a5a','#d9a441','#1f5a46','#a8c27a','#e3c27a'],'#cfe6c4'),
    kcT('nila','Nila','Cobalt and sky glass in a dark wall','#121827','#2d4b9a',['#2d4b9a','#d9a441','#5f86c4','#1d2b6a','#a7c0e0'],'#c9d8f2'),
    kcT('lavender','Lavender','Lilac and sage glass in a dark wall','#1f1c25','#9c8fc9',['#9c8fc9','#b8c6a6','#6f62a8','#e6d9f2','#d9a441'],'#e2dbf4'),
    kcT('senja','Senja','Sunset glass in a dark wall','#241815','#d9673f',['#d9673f','#e8a33c','#b8475e','#f2cf86','#7a2e3e'],'#f6d2b8'),
    kcT('teal','Teal','Teal and coral glass in a dark wall','#112121','#1f7a7a',['#1f7a7a','#ef8a72','#7fbfb5','#d9a441','#0f4a4a'],'#c4e6e0'),
    kcT('pandan','Pandan','Pandan and cream glass in a dark wall','#141c17','#2f7a5a',['#2f7a5a','#d9a441','#7fa36a','#e9dcb8','#0d4a32'],'#dbe8c8'),
    kcT('kopi','Kopi Susu','Coffee and cream glass in a dark wall','#1e1915','#a07a5a',['#a07a5a','#c9a26a','#6b4a3a','#e6d3b3','#8a5a3a'],'#eedcc4'),
    kcT('hujan','Biru Hujan','Rain-blue and pearl glass in a dark wall','#161b22','#3a5f8a',['#3a5f8a','#8fa7bd','#c8c2b0','#26394d','#a7c0e0'],'#d4dfea'),
    kcT('fajar','Fajar','Dawn pink and peach glass in a dark wall','#221820','#d9708a',['#d9708a','#f0a46c','#e0b27a','#4a2238','#f6cdb3'],'#f6cfd8'),
  ]});
