/* pawagam (round 7 redesign of the old picture-house poster): an old Malayan panggung wayang.
   Cover: a velvet house curtain under a swagged pelmet with gold fringe, lit by a warm lamp; in front of it a letterpress
   programme with a perforated admission stub carrying the guest's name. Tap "Buka Jemputan": the programme is put away and the curtain rises.
   Page: the stage, curtains tied back, the programme and three ticket stubs that lead to the sections.
   Skin: letterpress programme cards with a double printed rule on the velvet backdrop. */
// the pelmet: gilded moulding, a pleated band and four swags edged with braid and fringe (drawn in a 400 x 92 box)
function pwValance(c,u){const sw=4,w=400/sw;let swags='',fringe='',tass='';
  for(let i=0;i<sw;i++){const x0=i*w,x1=x0+w,xm=x0+w/2;
    swags+=`<path d="M${x0-2} 30Q${xm} 92 ${x1+2} 30Z" fill="url(#pwS${u})"/><path d="M${x0+6} 34Q${xm} 80 ${x1-6} 34" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="1.2"/><path d="M${x0+14} 34Q${xm} 70 ${x1-14} 34" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="1"/>`;
    for(let t=.04;t<.97;t+=.032){const q=(a,b,cc)=>(1-t)*(1-t)*a+2*(1-t)*t*b+t*t*cc;const x=q(x0-2,xm,x1+2),y=q(30,92,30)-1.2;
      fringe+=`M${x.toFixed(1)} ${y.toFixed(1)}v6.5`}
    swags+=`<path d="M${x0-2} 30Q${xm} 92 ${x1+2} 30" fill="none" stroke="${c.gold}" stroke-width="2.2"/><path d="M${x0-2} 30Q${xm} 92 ${x1+2} 30" fill="none" stroke="rgba(255,240,200,.55)" stroke-width=".6" stroke-dasharray="1.4 1.6"/>`;
    if(i)tass+=`<g transform="translate(${x0} 30)"><path d="M0 0v14" stroke="${c.gold}" stroke-width="1"/><circle cy="15" r="2.6" fill="${c.gold}"/><path d="M-3.4 17h6.8l1.6 15h-10z" fill="${c.gold}"/><path d="M-3 19v12M-1 19v13M1 19v13M3 19v12" stroke="rgba(60,40,10,.45)" stroke-width=".5"/></g>`}
  return `<svg class="pw-val" viewBox="0 0 400 104" preserveAspectRatio="xMidYMin slice" aria-hidden="true"><defs>
    <linearGradient id="pwS${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.curtain}"/><stop offset=".6" stop-color="${c.curtain}"/><stop offset="1" stop-color="#000" stop-opacity=".9"/></linearGradient>
    <linearGradient id="pwG${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4318"/><stop offset=".35" stop-color="#f0d897"/><stop offset=".6" stop-color="#b48a3e"/><stop offset="1" stop-color="#5a4318"/></linearGradient>
    <pattern id="pwP${u}" width="9" height="30" patternUnits="userSpaceOnUse"><rect width="9" height="30" fill="${c.curtain}"/><rect width="3" height="30" fill="#000" opacity=".28"/><rect x="5" width="2" height="30" fill="#fff" opacity=".08"/></pattern></defs>
    <rect y="0" width="400" height="32" fill="url(#pwP${u})"/><rect y="0" width="400" height="32" fill="url(#pwS${u})" opacity=".35"/>
    ${swags}<path d="${fringe}" stroke="${c.gold}" stroke-width=".9" opacity=".95"/>${tass}
    <rect y="0" width="400" height="9" fill="url(#pwG${u})"/><path d="M0 9.5h400" stroke="#3a2a0c" stroke-width=".8"/><path d="M0 3.6h400" stroke="#fff6d8" stroke-width=".5" stroke-dasharray="1.2 2.2" opacity=".8"/></svg>`}
let pwU=0;
const pwRule=()=>`<i class="pw-rule"><b></b></i>`;
const pwNames=o=>{const [n1,n2]=coverNames(o);return `<p class="pw-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>`};
const pwSerial=o=>String(fmtShort(o.date)).replace(/\D/g,'').slice(0,6)||'000001';
const pwVars=c=>`--curtain:${c.curtain};--stub:${c.stub}`;
FAMILY({key:'pawagam',name:'Pawagam',meaning:'Old picture house',
  blurb:'A velvet house curtain in an old Malayan panggung, lit by a warm lamp, with a letterpress programme and an admission stub. The curtain rises to open the card.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-pawagam2${c.light?' pw-light':''}" style="${pwVars(c)}"><div class="pw-back"></div>
      <div class="pw-drape l"></div><div class="pw-drape r"></div>${pwValance(c,++pwU)}<div class="pw-foot-l"></div>
      <p class="pw-k kicker reveal">${ev(o,L)}</p>
      <div class="pw-prog pw-big reveal d1"><div class="pw-in">
        <p class="pw-pre">${en?'A special screening':'Tayangan istimewa'}</p>${pwRule()}
        ${pwNames(o)}${pwRule()}
        <p class="pw-date">${esc(fmtDate(o.date,o.lang))}</p><p class="pw-time">${esc(fmtTime(o.start,o.lang))}</p>${o.venue?`<p class="pw-ven">${esc(o.venue)}</p>`:''}</div></div>
      <div class="pw-tix reveal d2">
        <a class="pw-tk" data-go="when" href="#"><small>${en?'Programme':'Aturcara'}</small><b>${en?'Details':'Butiran'}</b></a>
        ${o.x_rsvp?`<a class="pw-tk" data-go="rsvp" href="#"><small>${en?'Reply':'Sahkan'}</small><b>RSVP</b></a>`:''}
        <a class="pw-tk" data-go="loc" href="#"><small>${en?'Map':'Peta'}</small><b>${en?'Location':'Lokasi'}</b></a></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c,u=++pwU;
    return `<div class="cover cv-pawagam2${c.light?' pw-light':''}" style="${pwVars(c)}"><div class="pw-curtain"><i class="pw-lamp"></i></div>${pwValance(c,u)}
      <div class="pw-prog">
        <div class="pw-in"><p class="pw-pre">${en?'A special screening':'Tayangan istimewa'}</p>${pwRule()}<p class="pw-ev">${ev(o,L)}</p>
          ${pwNames(o)}${pwRule()}<p class="pw-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>${o.venue?`<p class="pw-ven">${esc(o.venue)}</p>`:''}</div>
        <div class="pw-stub"><div><small>${en?'Admit one':'Masuk seorang'}</small><b>${guest?esc(guest):(en?'Honoured guest':'Tetamu kehormat')}</b></div><span>No. ${pwSerial(o)}</span></div>
      </div>
      <div class="pw-stage"></div><div class="pw-foot"><${tag} class="pw-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--curtain',th.c.curtain);el.style.setProperty('--stub',th.c.stub);el.classList.toggle('pw-light',!!th.c.light);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  // same colourway ids as the old poster family, so published cards keep working
  themes:[
    {k:'gading',n:'Gading',desc:'Champagne velvet curtain, ivory programme',c:{ground:'#e9dfcd',sheet:'#fbf6ea',ink:'#2e2419',accent:'#7a2e22',gold:'#b8914a',pagefg:'#3a2c1e',curtain:'#b9a27a',stub:'#efe2c6',light:'1',cover:'#b9a27a'}},
    {k:'nila',n:'Nila',desc:'Midnight-blue velvet, ivory programme',c:{ground:'#0d1228',sheet:'#f8f2e4',ink:'#1d2238',accent:'#22336a',gold:'#c9a35a',pagefg:'#ece4d2',curtain:'#1d2b5c',stub:'#e3e2dc',cover:'#1d2b5c'}},
    {k:'marun',n:'Marun',desc:'Maroon velvet, cream programme',c:{ground:'#1e0a0e',sheet:'#faf3e6',ink:'#2c1c18',accent:'#7a1b29',gold:'#c9a35a',pagefg:'#f1e5d4',curtain:'#6c1520',stub:'#f0dccf',cover:'#6c1520'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald velvet, cream programme',c:{ground:'#081a15',sheet:'#f8f3e6',ink:'#1e2a24',accent:'#14523f',gold:'#c9a35a',pagefg:'#ebe5d4',curtain:'#0f4637',stub:'#e2e6d8',cover:'#0f4637'}},
    {k:'jambu',n:'Merah Jambu',desc:'Dusty-rose velvet, blush programme',c:{ground:'#f0e0dc',sheet:'#fdf7f2',ink:'#3a2629',accent:'#97424f',gold:'#b8914a',pagefg:'#4a2e33',curtain:'#b8737f',stub:'#f6e1df',light:'1',cover:'#b8737f'}},
    {k:'sage',n:'Sage',desc:'Sage velvet, cream programme',c:{ground:'#e6e6da',sheet:'#fbf9f1',ink:'#2a3026',accent:'#4c5e41',gold:'#b0904c',pagefg:'#2f3829',curtain:'#7e9070',stub:'#e8ebdc',light:'1',cover:'#7e9070'}},
    {k:'hitam',n:'Hitam',desc:'Black velvet, gold fringe, ivory programme',c:{ground:'#0b0a09',sheet:'#f6f0e2',ink:'#1d1a17',accent:'#1d1a17',gold:'#c9a35a',pagefg:'#ece4d4',curtain:'#1c1a19',stub:'#e8e1d0',cover:'#1c1a19'}},
    {k:'terakota',n:'Terakota',desc:'Rust velvet, sand programme',c:{ground:'#200f09',sheet:'#faf2e5',ink:'#2e2018',accent:'#8e3f22',gold:'#c9a35a',pagefg:'#f1e4d4',curtain:'#8a3d22',stub:'#f2dfcd',cover:'#8a3d22'}},
  ]});
