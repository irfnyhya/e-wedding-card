/* kalkir: a deckle-edged cotton card under a sheet of translucent vellum printed with the names in gold foil,
   the two tied together with a silk ribbon and a sprig of dried pampas tucked under the knot.
   Cover: tap "Buka Jemputan": the ribbon slips off and the vellum lifts away from the card.
   Page: the cotton card with a vellum band wrapped round it, still tied with the ribbon and pampas.
   Skin: cotton cards with a vellum tab under each heading. */
needFont('Mrs+Saint+Delafield');
const kkF=n=>n.toFixed(1);
// the bow: two loops, two cut tails, a knot; silk lit from the top left
function kkBow(c,u){const r=c.rib,dk=c.ribdk,lt=c.riblt;
  return `<svg class="klk-bow" ${NS} viewBox="0 0 120 100"><defs>
    <linearGradient id="kkb${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${lt}"/><stop offset=".45" stop-color="${r}"/><stop offset="1" stop-color="${dk}"/></linearGradient>
    <linearGradient id="kkt${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dk}"/><stop offset=".3" stop-color="${r}"/><stop offset=".6" stop-color="${lt}"/><stop offset="1" stop-color="${r}"/></linearGradient>
    <filter id="kks${u}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
    <g opacity=".35" filter="url(#kks${u})" transform="translate(2 3)"><path d="M60 42C44 12 6 12 10 36C14 56 44 50 60 42ZM60 42C76 12 114 12 110 36C106 56 76 50 60 42ZM57 46C50 62 40 80 26 97L38 99C49 82 55 64 61 48ZM63 46C70 62 80 80 94 97L82 99C71 82 65 64 59 48Z" fill="#000"/></g>
    <path d="M57 46C50 62 40 80 26 97L32 93L38 99C49 82 55 64 61 48Z" fill="url(#kkt${u})"/>
    <path d="M63 46C70 62 80 80 94 97L88 93L82 99C71 82 65 64 59 48Z" fill="url(#kkt${u})"/>
    <path d="M60 42C44 12 6 12 10 36C14 56 44 50 60 42Z" fill="url(#kkb${u})"/>
    <path d="M60 42C76 12 114 12 110 36C106 56 76 50 60 42Z" fill="url(#kkb${u})"/>
    <path d="M58 40C44 22 20 20 16 34M58 43C42 46 26 46 18 40" fill="none" stroke="${dk}" stroke-width=".8" opacity=".55"/>
    <path d="M62 40C76 22 100 20 104 34M62 43C78 46 94 46 102 40" fill="none" stroke="${dk}" stroke-width=".8" opacity=".55"/>
    <path d="M20 27C28 19 40 20 50 30" fill="none" stroke="#fff" stroke-width="1.6" opacity=".45" stroke-linecap="round"/>
    <path d="M70 30C80 21 92 19 100 26" fill="none" stroke="#fff" stroke-width="1.6" opacity=".35" stroke-linecap="round"/>
    <rect x="53" y="34" width="14" height="16" rx="5" fill="url(#kkt${u})"/><path d="M55 37C59 36 62 36 65 37" stroke="#fff" stroke-width="1" opacity=".5" fill="none"/>
    <path d="M55 48C59 49 62 49 65 48" stroke="${dk}" stroke-width="1" opacity=".6" fill="none"/></svg>`}
// a sprig of dried pampas: a curved stem, a soft plume of fine fibres, and a little seed grass beside it
function kkPampas(c,seed){const R=rng(seed),p=c.pampas,pd=c.pampasdk;let s='',f='';
  const q=(t,a,b,e)=>(1-t)*(1-t)*a+2*(1-t)*t*b+t*t*e;
  // stem
  s+=`<path d="M46 200Q24 105 40 10" fill="none" stroke="${pd}" stroke-width="1.3"/>`;
  for(let i=0;i<300;i++){const t=.4+R()*.6,x=q(t,46,24,40),y=q(t,200,105,10);const side=R()<.5?-1:1,len=7+R()*22*(1-Math.abs(t-.74)*1.4),a=(-90+side*(18+R()*38))*Math.PI/180;
    const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len,cx=x+Math.cos(a)*len*.5+side*2,cy=y+Math.sin(a)*len*.5+2;
    f+=`<path d="M${kkF(x)} ${kkF(y)}Q${kkF(cx)} ${kkF(cy)} ${kkF(x2)} ${kkF(y2)}" stroke="${R()<.3?pd:p}" stroke-width="${(.45+R()*.8).toFixed(2)}" opacity="${(.55+R()*.4).toFixed(2)}" fill="none" stroke-linecap="round"/>`}
  // a fine seed grass beside it
  let g=`<path d="M50 200Q60 120 74 52" fill="none" stroke="${pd}" stroke-width=".8"/>`;
  for(let i=0;i<14;i++){const t=.55+i*.032,x=50+2*(1-t)*t*10+t*t*24,y=200-2*(1-t)*t*80-t*t*148;g+=`<ellipse cx="${kkF(x+(i%2?3:-3))}" cy="${kkF(y)}" rx="1.3" ry="3.2" fill="${pd}" opacity=".8" transform="rotate(${i%2?25:-25} ${kkF(x+(i%2?3:-3))} ${kkF(y)})"/>`}
  const fl=`<defs><filter id="kkp${seed}" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="3.2"/></filter></defs><path d="M34 120Q27 70 40 14" fill="none" stroke="${p}" stroke-width="15" stroke-linecap="round" opacity=".55" filter="url(#kkp${seed})"/>`;
  return `<svg class="klk-pampas" ${NS} viewBox="0 0 90 200">${fl}${g}${s}<g>${f}</g></svg>`}
let kkN=0;
const kkVars=c=>`--rib:${c.rib};--ribdk:${c.ribdk};--riblt:${c.riblt}`;
const kkNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="klk-names klk-gold">${esc(n1)}<span>&amp;</span>${esc(n2)}</${tag}>`};
const kkDate=o=>esc(fmtShort(o.date)).replace(/\./g,' · ');
FAMILY({key:'kalkir',name:'Kalkir',meaning:'Vellum and silk ribbon',
  blurb:'A deckle-edged cotton card under a sheet of vellum printed with the names in gold, tied with a silk ribbon and a sprig of dried pampas. The ribbon slips off and the vellum lifts to open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Mrs Saint Delafield', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',u=++kkN,c=th.c;
    return `<section class="page pg-kalkir" style="${kkVars(c)}"><div class="klk-bed"></div>
      <div class="klk-obj klk-pobj reveal"><div class="klk-cotton"><div class="klk-ptxt">
          ${o.bismillah?'<p class="klk-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
          <p class="klk-k kicker">${ev(o,L)}</p>${kkNames(o,'h1')}</div></div>
        <div class="klk-band"><p class="klk-bd">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="klk-bh">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="klk-bv">${esc(o.venue)}</p>`:''}</div>
        <div class="klk-tie klk-ptie"><i class="klk-rib"></i>${kkPampas(c,u*7+3)}${kkBow(c,u)}</div></div>
      <a class="klk-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',u=++kkN,c=th.c;
    return `<div class="cover cv-kalkir" style="${kkVars(c)}"><div class="klk-bed"></div>
      <div class="klk-obj klk-cobj">
        <div class="klk-cotton"><div class="klk-under"><p class="klk-k">${ev(o,L)}</p><p class="klk-ud">${kkDate(o)}</p>${o.venue?`<p class="klk-uv">${esc(o.venue)}</p>`:''}</div></div>
        <div class="klk-vellum"><p class="klk-vk klk-gold">${ev(o,L)}</p>${kkNames(o)}<p class="klk-vd klk-gold">${kkDate(o)}</p></div>
        <div class="klk-tie"><i class="klk-rib"></i>${kkPampas(c,u*7+3)}${kkBow(c,u)}</div></div>
      <div class="klk-foot">${guest?`<p class="klk-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="klk-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--onacc',th.c.sheet);['rib','ribdk','riblt'].forEach(k=>el.style.setProperty('--'+k,th.c[k]));
    const pg=$('.pg-kalkir',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){img.removeAttribute('style');img.className='klk-photo';$('.klk-ptxt',pg).prepend(img);pg.classList.add('has-photo');ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory cotton, champagne ribbon',c:{ground:'#ddd3c3',sheet:'#f5eee0',ink:'#4a4034',accent:'#8a6a3a',gold:'#c4a060',pagefg:'#3e3428',rib:'#e2d2b6',ribdk:'#b49c76',riblt:'#fbf3e4',pampas:'#d9c29c',pampasdk:'#a88b5e'}},
    {k:'sage',n:'Sage',desc:'Cotton, sage silk ribbon',c:{ground:'#c8ccbd',sheet:'#f3f1e6',ink:'#3c4234',accent:'#6a6a3e',gold:'#b89a58',pagefg:'#30362a',rib:'#a7b39a',ribdk:'#76846a',riblt:'#dfe7d4',pampas:'#d8c49f',pampasdk:'#a38a62'}},
    {k:'jambu',n:'Jambu',desc:'Cotton, dusty rose ribbon',c:{ground:'#e3d0c9',sheet:'#f8eee8',ink:'#4c3434',accent:'#8e5a4e',gold:'#c79a74',pagefg:'#46302f',rib:'#d4a6a0',ribdk:'#a6716c',riblt:'#f4d8d3',pampas:'#dcc3a2',pampasdk:'#aa8a66'}},
    {k:'biru',n:'Biru',desc:'Cotton, dusty blue ribbon',c:{ground:'#c8d0d8',sheet:'#f2f1ec',ink:'#2f3a48',accent:'#4a5e78',gold:'#b49a62',pagefg:'#26313e',rib:'#9fb2c6',ribdk:'#6d8199',riblt:'#dbe5ef',pampas:'#d7c39f',pampasdk:'#a28a64'}},
    {k:'terakota',n:'Terakota',desc:'Cotton, rust silk ribbon',c:{ground:'#d8c6b4',sheet:'#f6eee1',ink:'#4a3326',accent:'#9a5132',gold:'#c08d55',pagefg:'#42291c',rib:'#b8674a',ribdk:'#87422c',riblt:'#e3a589',pampas:'#d6bd96',pampasdk:'#a08058'}},
    {k:'hitam',n:'Hitam',desc:'Cotton on charcoal, black ribbon',c:{ground:'#24221f',sheet:'#f3eee3',ink:'#2e2a25',accent:'#6d5530',gold:'#c6a160',pagefg:'#efe7da',rib:'#2b2927',ribdk:'#0e0d0c',riblt:'#6a6560',pampas:'#e6d8bd',pampasdk:'#a88f6a'}},
    {k:'lumut',n:'Lumut',desc:'Cotton on forest, olive ribbon',c:{ground:'#253226',sheet:'#f3f0e3',ink:'#2d3527',accent:'#56603a',gold:'#c0a160',pagefg:'#e9ede0',rib:'#7d8456',ribdk:'#535a34',riblt:'#b8bd92',pampas:'#ebdfc6',pampasdk:'#ad9572'}},
    {k:'nila',n:'Nila',desc:'Cotton on navy, ivory ribbon',c:{ground:'#1b2336',sheet:'#f4f1e8',ink:'#28304a',accent:'#34466e',gold:'#c3a465',pagefg:'#e8e8ee',rib:'#efe6d6',ribdk:'#c2b296',riblt:'#ffffff',pampas:'#ece0c8',pampasdk:'#b29b74'}},
  ]});
