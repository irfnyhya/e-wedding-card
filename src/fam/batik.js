/* batik: a folded length of hand-drawn batik (a 19th-century Javanese sarong, public domain) held by a paper band with the names.
   Cover: tap "Buka Jemputan", the band slips off and the cloth opens out to fill the screen.
   Page: the batik laid out flat, a deckled card resting on it. Skin: paper cards with a strip of the batik border down one edge.
   Most colourways re-dye the cloth in one colour (like indigo or soga batik); a few keep the cloth's own colours. */
const BK_IMG=`${A}pd-textile-3.jpg`;
const bkGo=(el)=>{const sc=$('.scroller',el);
  $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
    if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
    const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))};
// a gradient map (dark dye -> dye -> unbleached cotton) turns the photo into a two-tone batik in the colourway's dye
const hx=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);
const bkDuo=th=>{const c=th.c;if(!c.dye)return '';const d=hx(c.dye),k=d.map(v=>v*.32),w=hx(c.cotton||'#efe5cf'),m=d.map((v,i)=>v*.55+w[i]*.12);
  const f=i=>`tableValues="${[k[i],d[i]*.85,d[i]*.55+w[i]*.45,w[i]*.97,w[i]].map(v=>Math.min(1,v).toFixed(3)).join(' ')}"`;
  return `<svg class="bk-svg" width="0" height="0" aria-hidden="true"><filter id="bkd-${th.k}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".3 .59 .11 0 0 .3 .59 .11 0 0 .3 .59 .11 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" ${f(0)}/><feFuncG type="table" ${f(1)}/><feFuncB type="table" ${f(2)}/></feComponentTransfer></filter></svg>`};
const bkVars=th=>{const c=th.c;return `--duo:${c.dye?`url(#bkd-${th.k})`:'none'};--fold:${c.dye||'#6e2a20'};--band:${c.band||c.sheet}`};
FAMILY({key:'batik',name:'Batik Tulis',meaning:'Hand-drawn batik',
  blurb:'A folded length of hand-drawn batik held by a paper band with your names. The band slips off and the cloth opens out.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-batik2" style="${bkVars(th)}">${bkDuo(th)}<div class="bk-cloth bk-flat"></div><div class="bk-dim"></div>
      <div class="bk-card reveal"><div class="bk-cin">
        <p class="bk-k kicker">${ev(o,L)}</p>
        <h1 class="bk-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <i class="bk-rule"></i>
        <p class="bk-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="bk-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="bk-ven">${esc(o.venue)}</p>`:''}
        <a class="bk-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-batik2" style="${bkVars(th)}">${bkDuo(th)}<div class="bk-table"></div>
      <p class="bk-k bk-top">${ev(o,L)}</p>
      <div class="bk-stage"><div class="bk-under"><div class="bk-cloth"></div></div><div class="bk-fold"><div class="bk-cloth"></div><i class="bk-crease"></i></div>
        <div class="bk-band"><p class="bk-bn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="bk-bd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
      <div class="bk-foot">${guest?`<p class="bk-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="bk-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--duo',th.c.dye?`url(#bkd-${th.k})`:'none');bkGo(el)},
  themes:[
    {k:'nila',n:'Nila',desc:'Indigo batik, ivory band',c:{ground:'#18223f',sheet:'#fbf6ea',ink:'#26262b',accent:'#1f2e5c',gold:'#b8955a',pagefg:'#efe7d6',dye:'#2a4a8c'}},
    {k:'marun',n:'Marun',desc:'The cloth in its own madder red and green',c:{ground:'#3a1016',sheet:'#fbf5ea',ink:'#2c2420',accent:'#6e1d27',gold:'#b8914f',pagefg:'#f1e6d4'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald batik, ivory band',c:{ground:'#0f2b22',sheet:'#fbf7ec',ink:'#24292a',accent:'#1d4a3a',gold:'#b8975a',pagefg:'#ece6d4',dye:'#2c6a52'}},
    {k:'soga',n:'Soga',desc:'Soga-brown batik, cream band',c:{ground:'#3a2416',sheet:'#fbf4e6',ink:'#2e241c',accent:'#6a3e22',gold:'#b8904f',pagefg:'#f1e5cf',dye:'#8a5228'}},
    {k:'hitam',n:'Hitam',desc:'Charcoal batik, ivory band',c:{ground:'#131212',sheet:'#f8f4ec',ink:'#232120',accent:'#2a2725',gold:'#b49456',pagefg:'#ece6da',dye:'#4a4744'}},
    {k:'gading',n:'Gading',desc:'Indigo batik on ivory linen',c:{ground:'#ece4d4',sheet:'#fdfaf3',ink:'#2a2a30',accent:'#24366a',gold:'#a88b55',pagefg:'#24304e',dye:'#2c4a8a'}},
    {k:'mauve',n:'Mauve Zaitun',desc:'Mauve batik, olive-cream band',c:{ground:'#3b2230',sheet:'#f8f3ea',ink:'#2e2629',accent:'#6b3c55',gold:'#a89660',pagefg:'#efe4e8',dye:'#8a5a76'}},
    {k:'pic',n:'Pic Sage',desc:'Sage batik, peach band',c:{ground:'#3c4637',sheet:'#fcf3ea',ink:'#2c2e28',accent:'#4f5d47',gold:'#c08f68',pagefg:'#eee9dc',dye:'#6f8466',band:'#f6e2d2'}},
    {k:'kunyit',n:'Kunyit Nila',desc:'Turmeric and indigo batik',c:{ground:'#1a2440',sheet:'#fcf6e8',ink:'#26262b',accent:'#1d2b4a',gold:'#c99630',pagefg:'#f1e6cc',dye:'#c08a1e'}},
    {k:'lavender',n:'Lavender Arang',desc:'Lavender-grey batik on charcoal',c:{ground:'#2b2a31',sheet:'#f8f6f6',ink:'#2a2930',accent:'#4e4a62',gold:'#a8a08a',pagefg:'#ebe8f0',dye:'#7c74a4'}},
    {k:'karang',n:'Teal Karang',desc:'Teal batik, coral band',c:{ground:'#0c3434',sheet:'#fdf4ee',ink:'#2a2a2a',accent:'#0f4f4f',gold:'#d08a6e',pagefg:'#ecefe8',dye:'#1f7a78',band:'#f8ddd2'}},
    {k:'pandan',n:'Pandan',desc:'Pandan-green batik, gold band',c:{ground:'#0f3324',sheet:'#fbf7e8',ink:'#232a24',accent:'#14533a',gold:'#c6a24a',pagefg:'#eef0de',dye:'#3a8a52'}},
    {k:'kopi',n:'Kopi Susu',desc:'The cloth in its own colours, on coffee brown',c:{ground:'#2e2019',sheet:'#fbf5ea',ink:'#2e241c',accent:'#5a3a28',gold:'#b8935e',pagefg:'#f1e6d4'}},
    {k:'hujan',n:'Biru Hujan',desc:'Rain-blue batik, pearl band',c:{ground:'#1f2f40',sheet:'#f8f8f5',ink:'#25292e',accent:'#2c4560',gold:'#a8a593',pagefg:'#e9eef2',dye:'#5a7a9a'}},
    {k:'fajar',n:'Fajar',desc:'Dawn-rose batik, apricot band',c:{ground:'#3a1c2c',sheet:'#fdf4ec',ink:'#2e2428',accent:'#6a2e4a',gold:'#d0a070',pagefg:'#f6e6e2',dye:'#a85a6e',band:'#fbe4d2'}},
  ]});
