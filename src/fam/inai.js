/* inai: Malam Berinai, the henna night. A large mehndi medallion drawn in fine henna strokes on parchment:
   a lotus centre holding the initials, rings of petals, teardrops, a net, scallops, paisleys and a petal crown,
   with vine flourishes running to the edges, an inai cone lying across the lower corner and a brass bowl of
   fresh inai leaves. Cover: the henna is part-drawn over a faint stencil; touching it finishes every line,
   which glows gold, then the cover fades. Page: medallion quarters in the corners around the names.
   Skin: henna-stroke dividers, paisley headings, a medallion fragment in each card. */
let uid=0;
const f1=v=>(+v).toFixed(1);
const P=(d,c='ih-l')=>`<path d="${d}" class="${c}" pathLength="1"/>`;
const C=(x,y,r,c='ih-l')=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" class="${c}" pathLength="1"/>`;
const paisley=(x,y,s,r)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${P('M0 0C12-14 30-10 28 6C26 20 8 26-2 16C-8 9-4 2 3 4C8 6 7 12 2 12')}${P('M3 -3C12-10 24-6 23 6C22 15 10 20 3 14')}${P('M28 6C34 2 38-6 34-14')}${[[10,-6],[17,-4],[21,3],[17,11],[9,13]].map(([a,b])=>C(a,b,.9,'ih-d')).join('')}</g>`;
const pol=(r,a)=>[r*Math.sin(a*Math.PI/180),-r*Math.cos(a*Math.PI/180)];
const rot=(a,body)=>`<g transform="rotate(${f1(a)})">${body}</g>`;
const lotus=()=>{let s='';for(let i=0;i<10;i++)s+=rot(i*36+18,P('M-7 -24C-9 -32-3 -40 0 -43C3 -40 9 -32 7 -24'));
  for(let i=0;i<10;i++)s+=rot(i*36,P('M-9 -24C-12 -36-4 -46 0 -51C4 -46 12 -36 9 -24')+P('M-4.5 -26C-5.5 -33-2 -39 0 -42C2 -39 5.5 -33 4.5 -26')+C(0,-31,.9,'ih-d'));
  return s+C(0,0,24)+C(0,0,20.5,'ih-l ih-dash')};
// the medallion, centred on 0,0, radius about 150; vines=true adds the flourishes to the edges
function medal(vines){let s=lotus();
  s+=C(0,0,53)+K.ring(40,56.5,0,0).map(([x,y])=>C(x,y,.9,'ih-d')).join('');
  for(let i=0;i<20;i++)s+=rot(i*18,P('M0 -60q5.5-6.5 0-13q-5.5 6.5 0 13z')+P('M0 -63v-6'))+rot(i*18+9,C(0,-70,1.1,'ih-f'));
  s+=C(0,0,76);
  {let n='';for(let i=0;i<48;i++){const a=i*7.5,[x1,y1]=pol(76,a),[x2,y2]=pol(90,a+7.5),[x3,y3]=pol(76,a+7.5),[x4,y4]=pol(90,a);n+=`M${f1(x1)} ${f1(y1)}L${f1(x2)} ${f1(y2)}M${f1(x3)} ${f1(y3)}L${f1(x4)} ${f1(y4)}`}s+=P(n,'ih-l ih-net')}
  s+=C(0,0,90)+P(K.scallop(30,90,7))+K.ring(30,94.5,0,0,-Math.PI/2+Math.PI/30).map(([x,y])=>C(x,y,1,'ih-f')).join('');
  s+=C(0,0,104);
  for(let i=0;i<12;i++){s+=rot(i*30,`<g transform="translate(-7 -112) scale(.5)">${paisley(0,0,1,-20)}</g>`);
    s+=rot(i*30+15,K.ring(5,3.4,0,-115).map(([x,y,a])=>`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="1.6" ry="3.2" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(x)} ${f1(y)})" class="ih-l" pathLength="1"/>`).join('')+C(0,-115,1,'ih-f'))}
  s+=C(0,0,126,'ih-l ih-dash')+C(0,0,129);
  for(let i=0;i<36;i++)s+=rot(i*10,P('M-4.6 -129Q-4 -137 0 -143Q4 -137 4.6 -129')+C(0,-147.5,1.1,'ih-f'))+rot(i*10+5,C(0,-133,.8,'ih-d'));
  if(vines){const v=P('M140 -48C160 -60 168 -88 190 -96c8-3 12 4 6 8s-8-2-4-4')+P('M142 50C164 62 170 94 196 104c7 2 9-5 4-8s-8 3-3 5')+P('M148 -6C168 -4 180-14 200-10');
    const lv=[[160,-62,40],[176,-88,10],[162,66,140],[180,96,170],[178,-8,80]].map(([x,y,a])=>`<path d="M0 0q4.5-6.5 0-13q-4.5 6.5 0 13z" transform="translate(${x} ${y}) rotate(${a})" class="ih-l" pathLength="1"/>`).join('')+[[170,-74],[172,82],[190,-10]].map(([x,y])=>C(x,y,1.2,'ih-f')).join('');
    s+=v+lv+`<g transform="scale(-1 1)">${v+lv}</g>`}
  return s}
function medallion(ini){const id=++uid;
  return `<svg class="ih-med" viewBox="-184 -156 368 312"><defs><radialGradient id="ihw${id}"><stop offset="0" style="stop-color:color-mix(in srgb,var(--gold) 30%,transparent)"/><stop offset="1" style="stop-color:transparent"/></radialGradient></defs>
   <circle r="150" fill="url(#ihw${id})" class="ih-warm"/>
   <g class="ih-guide">${medal(true)}</g><g class="ih-ink">${medal(true)}</g>
   <text y="7" class="ih-ini">${esc(ini)}</text></svg>`}
// the inai cone: rolled paper with a twist, henna showing at the nib
const CONE=`<svg class="ih-cone" viewBox="-30 -8 60 150"><path d="M0 0L23 104Q0 112-23 104Z" class="ih-paperl"/><path d="M0 0L23 104Q12 108 4 108Z" class="ih-shade"/>
  <path d="M-12 56Q4 52 16 70M-17 80Q2 74 20 92M-6 28Q4 26 10 40" class="ih-fold"/>
  <path d="M0 0L4.5 20Q0 22-4.5 20Z" class="ih-henna"/><circle cy="-4" r="2" class="ih-henna"/>
  <path d="M-23 104Q-26 116-14 122Q-6 116 0 124Q6 116 14 122Q26 116 23 104Q0 112-23 104Z" class="ih-paperl"/>
  <path d="M-14 122Q-8 132-2 140M14 122Q8 132 2 140M0 124V138" class="ih-fold"/></svg>`;
// a brass bowl heaped with fresh inai leaves
function bowl(){const id=++uid,R=rng(3);let lv='';for(let i=0;i<34;i++){const a=R()*Math.PI,r=Math.sqrt(R()),x=50+Math.cos(a)*r*34*(R()<.5?-1:1),y=34-Math.sin(a)*r*22,t=R()*360;
    lv+=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(t)})"><ellipse rx="2.8" ry="6" class="ih-leaf"/><path d="M0 -5V5" class="ih-vein"/></g>`}
  return `<svg class="ih-bowl" viewBox="0 0 100 72"><defs><linearGradient id="ihb${id}" x1="0" x2="1"><stop offset="0" style="stop-color:color-mix(in srgb,var(--gold) 50%,#000)"/><stop offset=".35" style="stop-color:color-mix(in srgb,var(--gold) 55%,#fff)"/><stop offset=".6" style="stop-color:var(--gold)"/><stop offset="1" style="stop-color:color-mix(in srgb,var(--gold) 45%,#000)"/></linearGradient></defs>
   <ellipse cx="50" cy="66" rx="34" ry="4" class="ih-sh"/>
   ${lv}<path d="M10 36C12 58 88 58 90 36Z" fill="url(#ihb${id})"/><ellipse cx="50" cy="36" rx="40" ry="6" fill="url(#ihb${id})"/><ellipse cx="50" cy="36" rx="40" ry="6" class="ih-eng"/>
   <path d="M16 44Q50 52 84 44M22 50Q50 56 78 50" class="ih-eng"/><path d="M38 56H62L66 64H34Z" fill="url(#ihb${id})"/>
   <g transform="translate(14 64) rotate(-30)"><ellipse rx="2.6" ry="5.6" class="ih-leaf"/></g><g transform="translate(88 63) rotate(60)"><ellipse rx="2.6" ry="5.6" class="ih-leaf"/></g></svg>`}
// tiles for the page border and the skin
const BAND=c=>svgUriSq(`<svg ${NS} width="36" height="22" viewBox="0 0 36 22"><g fill="none" stroke="${c.accent}" stroke-width=".8" stroke-linecap="round"><path d="M0 3H36M0 6H36"/><path d="M0 6q4.5 8 9 0q4.5 8 9 0q4.5 8 9 0q4.5 8 9 0"/><path d="M18 14q2.6-4 0-8q-2.6 4 0 8zM0 14q2.6-4 0-8M36 14q-2.6-4 0-8"/></g><g fill="${c.accent}"><circle cx="9" cy="16" r=".9"/><circle cx="27" cy="16" r=".9"/><circle cx="18" cy="19" r="1.2"/><circle cx="0" cy="19" r="1.2"/><circle cx="36" cy="19" r="1.2"/></g></svg>`);
const VINE=c=>svgUriSq(`<svg ${NS} width="22" height="48" viewBox="0 0 22 48"><g fill="none" stroke="${c.accent}" stroke-width=".8" stroke-linecap="round"><path d="M11 0C4 12 18 24 11 36S4 44 11 48"/><path d="M11 12q6-1 8-7q-6 0-8 7zM11 36q-6-1-8-7q6 0 8 7z"/></g><g fill="${c.accent}"><circle cx="17" cy="20" r=".9"/><circle cx="5" cy="44" r=".9"/></g></svg>`);
const PAIS=c=>svgUriSq(`<svg ${NS} viewBox="-6 -16 40 40"><g fill="none" stroke="${c.accent}" stroke-width="1.3" stroke-linecap="round"><path d="M0 0C12-14 30-10 28 6C26 20 8 26-2 16C-8 9-4 2 3 4C8 6 7 12 2 12"/><path d="M3 -3C12-10 24-6 23 6C22 15 10 20 3 14"/><path d="M28 6C34 2 38-6 34-14"/></g><g fill="${c.accent}"><circle cx="10" cy="-6" r="1.2"/><circle cx="17" cy="-4" r="1.2"/><circle cx="21" cy="3" r="1.2"/><circle cx="17" cy="11" r="1.2"/></g></svg>`);
const DIV=c=>svgUriSq(`<svg ${NS} width="180" height="24" viewBox="0 0 180 24"><g fill="none" stroke="${c.accent}" stroke-width=".8" stroke-linecap="round"><path d="M4 12H66M114 12H176"/><path d="M20 12q4-6 8 0q4-6 8 0q4-6 8 0q4-6 8 0q4-6 8 0M108 12q4 6 8 0q4 6 8 0q4 6 8 0q4 6 8 0q4 6 8 0" transform="translate(0 0)"/><circle cx="90" cy="12" r="9"/><circle cx="90" cy="12" r="5.5"/>${K.ring(10,9,90,12).map(([x,y,a])=>`<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="1.4" ry="2.6" transform="rotate(${f1(a*180/Math.PI+90)} ${f1(x)} ${f1(y)})"/>`).join('')}</g><g fill="${c.accent}"><circle cx="90" cy="12" r="2.2"/><circle cx="72" cy="12" r="1.2"/><circle cx="108" cy="12" r="1.2"/><circle cx="4" cy="12" r="1.3"/><circle cx="176" cy="12" r="1.3"/></g></svg>`);
const vars=c=>`--ih-leaf:${c.leaf||'#5b7a36'};--ih-band:${BAND(c)};--ih-vine:${VINE(c)};--ih-pais:${PAIS(c)};--ih-div:${DIV(c)}`;
const mand=ini=>`<svg class="ih-mand" viewBox="-62 -62 124 124">${lotus()}${C(0,0,55)}${K.ring(40,58.5,0,0).map(([x,y])=>C(x,y,.9,'ih-d')).join('')}<text y="7" class="ih-ini">${esc(ini)}</text></svg>`;
FAMILY({key:'inai',name:'Malam Berinai',meaning:'Henna night',
  blurb:'A mehndi medallion drawn in fine henna on parchment, with an inai cone and a bowl of leaves; touch it and the last lines draw themselves and glow.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1600,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',[a1,a2]=K.initials(o);
    const q=`<svg viewBox="-152 -152 304 304">${medal(false)}</svg>`;
    return `<section class="page pg-inai ${c.dk?'ih-dk':''}" style="${vars(c)}"><div class="ih-card"><i class="ih-b t"></i><i class="ih-b b"></i>
     <i class="ih-qc tl">${q}</i><i class="ih-qc tr">${q}</i><i class="ih-qc bl">${q}</i><i class="ih-qc br">${q}</i>
     <div class="ih-pm reveal">${mand(a1+'·'+a2)}</div>
     <p class="kicker reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <i class="ih-div reveal d2"></i><p class="ih-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="ih-ven reveal d3">${esc(o.venue)}<br><span>${en?'from':'jam'} ${esc(fmtTime(o.start,o.lang))}</span></p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',[a1,a2]=K.initials(o);
    return `<div class="cover cv-inai ${c.dk?'ih-dk':''}" style="${vars(c)}"><div class="ih-paper"></div><i class="ih-fr"></i><i class="ih-p tl"></i><i class="ih-p tr"></i><i class="ih-p bl"></i><i class="ih-p br"></i>
     <div class="ih-head"><p class="ih-k">${ev(o,L)}</p><p class="ih-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="ih-dt">${esc(fmtDate(o.date,o.lang))}</p></div>
     <${tag} class="ih-tap" ${attr} aria-label="${L.open}">${medallion(a1+'·'+a2)}</${tag}>
     <i class="ih-conew">${CONE}</i><i class="ih-bowlw">${bowl()}</i>
     <div class="ih-foot">${guest?`<p class="ih-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="ih-hint">${en?'Touch the henna':'Sentuh inai'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=th.c;el.style.cssText+=';'+vars(c);if(c.dk)el.classList.add('ih-dk');
    $$('.sec h2',el).forEach(h=>{h.insertAdjacentHTML('afterbegin','<i class="ih-hp"></i>');h.insertAdjacentHTML('beforeend','<i class="ih-hp r"></i>')});
    $$('.sec .rule',el).forEach(r=>r.outerHTML='<i class="ih-div"></i>');
    const q=`<i class="ih-sq"><svg viewBox="-152 -152 304 304">${medal(false)}</svg></i>`;$$('.sheet > .sec',el).forEach(s=>s.insertAdjacentHTML('beforeend','<i class="ih-sd"></i>'+q))},
  themes:[
    {k:'inai',n:'Inai',desc:'Henna on parchment, deep henna ground',c:{ground:'#5a2a1a',sheet:'#f8ecd8',ink:'#3a2418',accent:'#8a3b1c',gold:'#c08a3e',pagefg:'#f6e6cf'}},
    {k:'merah',n:'Merah',desc:'Henna on ivory, crimson ground',c:{ground:'#6a1420',sheet:'#fbf0e2',ink:'#3a1f1a',accent:'#962a22',gold:'#c79343',pagefg:'#f8e6d6'}},
    {k:'hijau',n:'Hijau',desc:'Henna on sage paper, bottle green',c:{ground:'#1f3a2c',sheet:'#eef0e0',ink:'#2f2a1c',accent:'#7f3f1c',gold:'#bf9040',pagefg:'#efe8d2'}},
    {k:'biru',n:'Biru',desc:'Henna on mist-blue paper, indigo night',c:{ground:'#1c2a4a',sheet:'#edf0f2',ink:'#2c2420',accent:'#843a20',gold:'#c3924a',pagefg:'#ece6d8'}},
    {k:'jambu',n:'Jambu',desc:'Rose henna on blush paper',c:{ground:'#e3c0ba',sheet:'#fff6f1',ink:'#3d2622',accent:'#a1443a',gold:'#b98c50',pagefg:'#3d2622'}},
    {k:'kunyit',n:'Kunyit',desc:'Henna on turmeric-washed paper',c:{ground:'#d9a441',sheet:'#fff3d6',ink:'#2e1d0e',accent:'#86391a',gold:'#a8742a',pagefg:'#2e1d0e'}},
    {k:'malam',n:'Malam',desc:'Gold henna on dark paper',c:{ground:'#110c09',sheet:'#2a1e16',ink:'#f1e2c8',accent:'#dcae5e',gold:'#c79a4c',pagefg:'#f1e2c8',line:'rgba(241,226,200,.2)',dk:1}},
    {k:'ungu',n:'Ungu',desc:'Henna on lilac paper, plum ground',c:{ground:'#33203f',sheet:'#f3ecf2',ink:'#2f2226',accent:'#823c28',gold:'#c4964e',pagefg:'#f1e6ee'}},
  ]});
