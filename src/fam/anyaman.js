/* anyaman: a mengkuang mat, plaited on the diagonal with dyed strips, rolled up and tied with cord, a paper tag hanging from it.
   The weave is drawn strip by strip: a 2/2 twill where every visible stretch of strip is shaded darker where it dips under its
   neighbour, with fine fibre lines along its length.
   Cover: tap "Buka Jemputan", the tag drops away and the mat unrolls down the screen.
   Page: the unrolled mat with the card laid on it. Skin: paper cards on the mat, each with a woven band along the top. */
needFont('Marcellus');
let ayN=0;
const a2=v=>+v.toFixed(2);
// one repeat of the plait: 16 x 16 strips, s units each; returns the <pattern> body (colours + shading), axis-aligned
function ayTile(c,s=7){const P=16,r=rng(7);const nat=['#dcbd7e','#d3b273','#e0c48a','#cfac6c','#d8b878','#e3c78e'];
  const dyeAt={3:c.dye,4:c.dye,11:c.dye,12:c.dye,8:c.dye2},col=i=>dyeAt[i]||nat[Math.floor(r()*nat.length)];
  const rows=Array.from({length:P},(_,j)=>col(j)),cols=Array.from({length:P},(_,i)=>col(i));
  let g='';
  for(let j=0;j<P;j++)for(let i=0;i<P;i++){const h=(((i-j)%4)+4)%4<2;g+=`<rect x="${i*s}" y="${j*s}" width="${s}" height="${s}" fill="${h?rows[j]:cols[i]}"/>`}
  // shading: each visible stretch spans two cells; darker at both ends, a sheen in the middle, a hairline gap along its sides
  let sh='';const H=(x,y)=>`<rect x="${x}" y="${y}" width="${2*s}" height="${s}" fill="url(#ayh)"/><path d="M${x} ${y+s*.3}h${2*s}M${x} ${y+s*.64}h${2*s}" stroke="#6a4a20" stroke-width=".22" opacity=".4"/>`,
    V=(x,y)=>`<rect x="${x}" y="${y}" width="${s}" height="${2*s}" fill="url(#ayv)"/><path d="M${x+s*.32} ${y}v${2*s}M${x+s*.66} ${y}v${2*s}" stroke="#6a4a20" stroke-width=".22" opacity=".4"/>`;
  for(let j=0;j<P;j++)for(let i=0;i<P;i++){const m=(((i-j)%4)+4)%4;
    if(m===0)sh+=H(i*s,j*s);if(m===1&&i===0)sh+=H(-s,j*s);
    if(m===3)sh+=V(i*s,j*s);if(m===2&&j===0)sh+=V(i*s,-s)}
  return {P:P*s,body:`<linearGradient id="ayh"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".16" stop-color="#000" stop-opacity=".06"/><stop offset=".5" stop-color="#fff" stop-opacity=".2"/><stop offset=".84" stop-color="#000" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
    <linearGradient id="ayv" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".16" stop-color="#000" stop-opacity=".06"/><stop offset=".5" stop-color="#fff" stop-opacity=".2"/><stop offset=".84" stop-color="#000" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>`,
    cells:g,shade:sh}}
// the mat as an inline svg filling its box, plaited on the diagonal
const ayMat=(c,cls='ay-mat',scale=1)=>{const u=++ayN,t=ayTile(c);
  return `<svg class="${cls}" ${NS} preserveAspectRatio="none"><defs>${t.body}<pattern id="ayp${u}" width="${t.P}" height="${t.P}" patternUnits="userSpaceOnUse" patternTransform="rotate(45) scale(${scale})">${t.cells}${t.shade}</pattern></defs><rect width="100%" height="100%" fill="url(#ayp${u})"/></svg>`};
// the same weave as a CSS tile for the skin (the diagonal lattice repeats every P*sqrt2 on both axes)
const ayTileUri=c=>{const t=ayTile(c,6),T=a2(t.P*Math.SQRT2);
  return {T,uri:K.uri(`<svg ${NS} width="${T}" height="${T}" viewBox="0 0 ${T} ${T}"><defs>${t.body}<pattern id="q" width="${t.P}" height="${t.P}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">${t.cells}${t.shade}</pattern></defs><rect width="${T}" height="${T}" fill="url(#q)"/></svg>`)}};
const ayGo=(el)=>{const sc=$('.scroller',el);
  $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))};
const ayVars=c=>`--dye:${c.dye};--cord:${c.cord||c.dye}`;
FAMILY({key:'anyaman',name:'Tikar Mengkuang',meaning:'Woven mat',
  blurb:'A plaited mengkuang mat with dyed strips, rolled up and tied with cord, a paper tag hanging from it. It unrolls to open.',
  fonts:{d:"'Marcellus', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<section class="page pg-anyaman2" style="${ayVars(c)}">${ayMat(c,'ay-mat ay-bg',1.25)}<div class="ay-light"></div>
      <div class="ay-card reveal"><i class="ay-eye"></i>
        <p class="ay-k kicker">${ev(o,L)}</p>
        <h1 class="ay-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <i class="ay-rule"></i>
        <p class="ay-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="ay-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="ay-ven">${esc(o.venue)}</p>`:''}
        <a class="ay-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<div class="cover cv-anyaman2" style="${ayVars(c)}"><div class="ay-floor"></div>
      <p class="ay-k ay-top">${ev(o,L)}</p>
      <div class="ay-flat">${ayMat(c,'ay-mat',1)}<div class="ay-flatshade"></div></div>
      <div class="ay-roll">${ayMat(c,'ay-mat',.9)}<i class="ay-cyl"></i><i class="ay-end"></i><i class="ay-cord" style="left:16%"></i><i class="ay-cord" style="left:80%"></i></div>
      <div class="ay-tag"><i class="ay-string"></i><i class="ay-eye"></i><p class="ay-tn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="ay-td">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
      <div class="ay-foot">${guest?`<p class="ay-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="ay-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const t=ayTileUri(th.c);el.style.setProperty('--weave',t.uri);el.style.setProperty('--wt',t.T+'px');ayGo(el)},
  themes:[
    {k:'gading',n:'Gading',desc:'Natural mengkuang with brown strips',c:{ground:'#ece3cf',sheet:'#fbf7ee',ink:'#2e2620',accent:'#5a3e22',gold:'#a8844a',pagefg:'#3a2c20',dye:'#8a6034',dye2:'#4a3220',cord:'#6a4a2a'}},
    {k:'nila',n:'Nila',desc:'Indigo strips, gold cord',c:{ground:'#1c263c',sheet:'#fbf7ee',ink:'#2a2a30',accent:'#1d2b4a',gold:'#c9a25a',pagefg:'#ece4d2',dye:'#2c4472',dye2:'#16203a',cord:'#c9a25a'}},
    {k:'marun',n:'Marun',desc:'Maroon strips, maroon cord',c:{ground:'#36121a',sheet:'#fbf6ec',ink:'#33241f',accent:'#5a1524',gold:'#c4974e',pagefg:'#f2e4d6',dye:'#7e1f30',dye2:'#2a1612',cord:'#8a2434'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald strips, natural cord',c:{ground:'#11302a',sheet:'#fbf7ee',ink:'#24302a',accent:'#0f3d2e',gold:'#c4a258',pagefg:'#e8ecdc',dye:'#1f5a44',dye2:'#2a1a14',cord:'#c8ab6e'}},
    {k:'jambu',n:'Merah Jambu',desc:'Rose strips on a blush floor',c:{ground:'#eed8d2',sheet:'#fffaf6',ink:'#3a2a2e',accent:'#7a3a4a',gold:'#b88a6a',pagefg:'#5a2e3a',dye:'#c4687a',dye2:'#7a3a4a',cord:'#b45a6c'}},
    {k:'sage',n:'Sage',desc:'Sage strips on a pale floor',c:{ground:'#e1e3d4',sheet:'#fcfaf2',ink:'#2c3027',accent:'#3e4a38',gold:'#a89462',pagefg:'#2e3628',dye:'#6f8466',dye2:'#3e4a38',cord:'#55684c'}},
    {k:'hitam',n:'Hitam',desc:'Black strips, red cord',c:{ground:'#191716',sheet:'#fbf7ee',ink:'#221f1d',accent:'#161414',gold:'#c4a058',pagefg:'#ece6da',dye:'#252120',dye2:'#a3263a',cord:'#a3263a'}},
    {k:'terakota',n:'Terakota',desc:'Terracotta strips, dark cord',c:{ground:'#45201a',sheet:'#fcf6ec',ink:'#33241c',accent:'#6b2e1c',gold:'#c99a5e',pagefg:'#f2e2d2',dye:'#a84a28',dye2:'#2a1a14',cord:'#3a2016'}},
  ]});
