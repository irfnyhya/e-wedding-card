/* qandil: a pierced card that behaves like a lantern. An arch-topped card of mirror-gold board slides into a sleeve of
   deep-coloured 600gsm stock, laser-cut all over with a lattice of eight-point stars, so the gold glints through every hole;
   a solid cartouche in the middle carries the names in gold foil and a solid band at the foot carries the guest's name.
   It stands against a plaster wall in a pool of warm light, scattered with the star-shaped light a pierced lantern throws.
   Cover: tap "Buka Jemputan"; the gold card rises out of the sleeve as the sleeve drops away and the stars of light spread.
   Page: the gold card on its own, a pierced border round it, the empty sleeve tucked behind. Skin: dark cards with a
   pierced band showing gold through the stars, Marcellus capitals. */
let qdN=0;
const qdF=v=>v.toFixed(2);
const qdStar=(x,y,r,k=.5)=>{let d='';for(let i=0;i<16;i++){const a=-Math.PI/2+i*Math.PI/8,rr=i%2?r*k:r;d+=(i?'L':'M')+qdF(x+Math.cos(a)*rr)+' '+qdF(y+Math.sin(a)*rr)}return d+'Z'};
// one tile of the lattice: an eight-point star in the middle, small four-point stars at the corners
const qdTile=`${qdStar(20,20,11.5,.64)}${qdStar(0,0,6,.55)}${qdStar(40,0,6,.55)}${qdStar(0,40,6,.55)}${qdStar(40,40,6,.55)}M20 1.5L22 5L20 8.5L18 5ZM20 31.5L22 35L20 38.5L18 35ZM1.5 20L5 18L8.5 20L5 22ZM31.5 20L35 18L38.5 20L35 22Z`;
// the sleeve: W x H in svg units, holes everywhere except a border, a central cartouche and a foot band; a thumb notch at the top
function qdSleeve(W,H,cartY,cartH,footY){const u=++qdN;
  const cx=W/2,cw=W*.74,cl=cx-cw/2,cr=cx+cw/2,cy0=cartY,cy1=cartY+cartH,lobe=cw*.16;
  // cartouche: a rectangle with ogee ends at top and bottom
  const cart=`M${cl} ${cy0+lobe}C${cl} ${cy0+lobe*.4} ${cx-cw*.2} ${cy0+lobe*.4} ${cx-cw*.12} ${cy0+lobe*.1}C${cx-cw*.05} ${cy0-lobe*.1} ${cx-6} ${cy0-lobe*.3} ${cx} ${cy0-lobe*.7}C${cx+6} ${cy0-lobe*.3} ${cx+cw*.05} ${cy0-lobe*.1} ${cx+cw*.12} ${cy0+lobe*.1}C${cx+cw*.2} ${cy0+lobe*.4} ${cr} ${cy0+lobe*.4} ${cr} ${cy0+lobe}V${cy1-lobe}C${cr} ${cy1-lobe*.4} ${cx+cw*.2} ${cy1-lobe*.4} ${cx+cw*.12} ${cy1-lobe*.1}C${cx+cw*.05} ${cy1+lobe*.1} ${cx+6} ${cy1+lobe*.3} ${cx} ${cy1+lobe*.7}C${cx-6} ${cy1+lobe*.3} ${cx-cw*.05} ${cy1+lobe*.1} ${cx-cw*.12} ${cy1-lobe*.1}C${cx-cw*.2} ${cy1-lobe*.4} ${cl} ${cy1-lobe*.4} ${cl} ${cy1-lobe}Z`;
  const B=14;
  return `<svg class="qdl-slv" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>
    <pattern id="qdp${u}" width="26" height="26" patternUnits="userSpaceOnUse" x="${(W/2-13)%26}" y="2"><path d="${qdTile}" fill="#000" transform="scale(.65)"/></pattern>
    <pattern id="qdt${u}" width="200" height="200" patternUnits="userSpaceOnUse"><image href="assets/paper.jpg" width="200" height="200"/></pattern>
    <linearGradient id="qdg${u}" x1="0" y1="0" x2="1" y2=".5"><stop offset="0" stop-color="#9a7434"/><stop offset=".3" stop-color="#f2dc98"/><stop offset=".5" stop-color="#b08a44"/><stop offset=".75" stop-color="#ecd28a"/><stop offset="1" stop-color="#8f6a2c"/></linearGradient>
    <linearGradient id="qdsh${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
    <mask id="qdm${u}" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fff"/><rect x="${B}" y="${B}" width="${W-2*B}" height="${footY-B-6}" fill="url(#qdp${u})"/>
      <path d="${cart}" fill="#fff" transform="translate(0 0)"/><path d="${cart}" fill="none" stroke="#fff" stroke-width="12"/><circle cx="${cx}" cy="0" r="17" fill="#000"/></mask></defs>
    <g mask="url(#qdm${u})"><rect width="${W}" height="${H}" style="fill:var(--slv)"/><rect width="${W}" height="${H}" fill="url(#qdt${u})" style="mix-blend-mode:soft-light" opacity=".28"/>
      <rect width="${W}" height="${H}" fill="url(#qdsh${u})"/></g>
    <path d="${cart}" fill="none" stroke="url(#qdg${u})" stroke-width="1.1"/><path d="${cart}" fill="none" stroke="url(#qdg${u})" stroke-width=".5" transform="translate(${cx} ${(cy0+cy1)/2}) scale(.94 .955) translate(${-cx} ${-(cy0+cy1)/2})"/>
    <rect x="${B-5}" y="${footY}" width="${W-2*B+10}" height=".8" fill="url(#qdg${u})"/></svg>`}
const qdNames=(o,tag)=>{const [n1,n2]=coverNames(o);return `<${tag} class="qdl-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</${tag}>`};
const qdMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="qdl-jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `${esc(a)}<i>·</i>${esc(b)}`};
const qdVars=c=>`--slv:${c.slv};--glow:${c.glow}`;
const QD_STARS=K.uri(`<svg ${NS} viewBox="0 0 40 40"><path d="${qdTile}" fill="#fff"/></svg>`);
FAMILY({key:'qandil',name:'Qandil',meaning:'Lantern light',
  blurb:'A mirror-gold card in a sleeve laser-cut with eight-point stars, standing in warm lantern light. The gold card rises out of the sleeve as it opens.',
  fonts:{d:"'Marcellus', serif",s:"'Marcellus', serif",b:"'Jost', sans-serif"},ms:1400,
  page(o,th,L){const c=th.c,en=o.lang==='en';
    return `<section class="page pg-qandil" style="${qdVars(c)};--qstars:${QD_STARS}"><div class="qdl-wall"></div><div class="qdl-cast"></div>
      <div class="qdl-pset reveal"><div class="qdl-psleeve">${qdSleeve(240,300,70,120,250)}</div>
        <div class="qdl-gold qdl-pcard"><div class="qdl-gin">
          ${o.bismillah?'<p class="qdl-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':`<p class="qdl-mono">${qdMono(o)}</p>`}
          <p class="qdl-k kicker">${ev(o,L)}</p>${qdNames(o,'h1')}
          <p class="qdl-d">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="qdl-hj">${esc(o.hijri)}</p>`:''}${o.venue?`<p class="qdl-ven">${esc(o.venue)}</p>`:''}</div></div></div>
      <div class="qdl-tabs reveal d2"><a class="qdl-tab" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="qdl-tab" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en',p=String(o.date||'').split('-');
    const dd=p.length===3?`${p[2]} · ${p[1]} · ${p[0]}`:esc(fmtShort(o.date));
    return `<div class="cover cv-qandil" style="${qdVars(c)};--qstars:${QD_STARS}"><div class="qdl-wall"></div><div class="qdl-cast"></div>
      <div class="qdl-set">
        <div class="qdl-gold qdl-card"><div class="qdl-top"><p class="qdl-mono">${qdMono(o)}</p><p class="qdl-k">${ev(o,L)}</p></div></div>
        <div class="qdl-sleeve">${qdSleeve(260,360,100,142,290)}
          <div class="qdl-cart">${qdNames(o,'p')}<p class="qdl-d">${dd}</p></div>
          <div class="qdl-foot">${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:`<small>${o.venue?esc(o.venue):''}</small>`}</div></div>
      </div>
      <${tag} class="qdl-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--slv',c.slv);el.style.setProperty('--glow',c.glow);el.style.setProperty('--qstars',QD_STARS);
    const sc=$('.scroller',el);
    $$('.pg-qandil [data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'nila',n:'Nila',desc:'Night-blue pierced sleeve, mirror gold, lamplight',c:{ground:'#121b33',sheet:'#1b2643',ink:'#efe6d2',accent:'#e6c67e',gold:'#c9a356',pagefg:'#efe6d2',slv:'#1a2547',glow:'#ffcf7a'}},
    {k:'zamrud',n:'Zamrud',desc:'Deep green pierced sleeve, mirror gold, lamplight',c:{ground:'#0f2a22',sheet:'#173a30',ink:'#ece7d4',accent:'#e6c67e',gold:'#c9a356',pagefg:'#ece7d4',slv:'#17402f',glow:'#ffd07c'}},
    {k:'malam',n:'Malam',desc:'Ink-black pierced sleeve, mirror gold, lamplight',c:{ground:'#0d0f16',sheet:'#181b26',ink:'#ebe6da',accent:'#e9c97f',gold:'#c9a356',pagefg:'#ebe6da',slv:'#16181f',glow:'#ffc970'}},
    {k:'laut',n:'Laut',desc:'Deep teal pierced sleeve, mirror gold, lamplight',c:{ground:'#0e2a30',sheet:'#163b42',ink:'#e8ebe3',accent:'#e8c87e',gold:'#c9a356',pagefg:'#e8ebe3',slv:'#123f47',glow:'#ffd27f'}},
    {k:'ungu',n:'Ungu',desc:'Plum pierced sleeve, mirror gold, lamplight',c:{ground:'#24152e',sheet:'#321f3f',ink:'#efe4e6',accent:'#ebc983',gold:'#c9a356',pagefg:'#efe4e6',slv:'#3a2148',glow:'#ffcd80'}},
    {k:'marun',n:'Marun',desc:'Maroon pierced sleeve, mirror gold, lamplight',c:{ground:'#2e0f15',sheet:'#43171f',ink:'#f2e4dc',accent:'#ecca82',gold:'#c9a356',pagefg:'#f2e4dc',slv:'#45131c',glow:'#ffc978'}},
    {k:'kopi',n:'Kopi',desc:'Coffee-brown pierced sleeve, mirror gold, lamplight',c:{ground:'#22170f',sheet:'#312218',ink:'#f0e6d6',accent:'#e9c67c',gold:'#c9a356',pagefg:'#f0e6d6',slv:'#3d2a1c',glow:'#ffcb78'}},
    {k:'senja',n:'Senja',desc:'Dusk-violet pierced sleeve, mirror gold, lamplight',c:{ground:'#2b2a45',sheet:'#383857',ink:'#eeeaf0',accent:'#eccb86',gold:'#c9a356',pagefg:'#eeeaf0',slv:'#3c3a63',glow:'#ffd08a'}},
  ]});
