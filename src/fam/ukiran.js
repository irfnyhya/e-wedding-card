/* ukiran: a carved plaster panel (ukiran plaster, like the stucco of old mosques and palaces) in raking morning light:
   star-and-cross strapwork in relief, the hollows washed with the colourway's ink, and a smooth recessed medallion with the names painted in it.
   Cover: tap "Buka Jemputan", a band of sunlight passes over the carving and the panel gives way to the page.
   Page: the medallion between two carved friezes. Skin: plaster cards under a carved frieze, headings in old-style small caps. */
let ukN=0;
const u2=n=>n.toFixed(2);
// a polylobed medallion: an ellipse with n shallow lobes
const ukLobed=(cx,cy,rx,ry,n,dep)=>{let d='';for(let i=0;i<n;i++){const a0=i/n*Math.PI*2-Math.PI/2,a1=(i+1)/n*Math.PI*2-Math.PI/2,am=(a0+a1)/2;
  const P=(a,k)=>[cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k];const [x0,y0]=P(a0,1),[x1,y1]=P(a1,1),[qx,qy]=P(am,1+dep);
  d+=(i?'':`M${u2(x0)} ${u2(y0)}`)+`Q${u2(qx)} ${u2(qy)} ${u2(x1)} ${u2(y1)}`}return d+'Z'};
// one tile of strapwork: an 8-point star outline, a rosette at its heart, a small cross between stars
const ukTile=s=>{const h=s/2;return `<path d="${K.star(8,h*.96,h*.6,h,h)}" fill="none" stroke-width="${u2(s*.085)}" stroke-linejoin="round"/>
  <path d="${K.star(8,h*.38,h*.2,h,h)}"/><circle cx="${h}" cy="${h}" r="${u2(s*.03)}" fill="none" stroke-width="${u2(s*.02)}"/>
  ${[[0,0],[s,0],[0,s],[s,s]].map(([x,y])=>`<path d="${K.star(4,s*.17,s*.06,x,y)}"/>`).join('')}`};
const ukRelief=uid=>`<filter id="ukr${uid}" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur in="SourceAlpha" stdDeviation=".35" result="b"/>
  <feDiffuseLighting in="b" surfaceScale="1.7" diffuseConstant="1" lighting-color="#fffaf0" result="d"><feDistantLight azimuth="225" elevation="56"/></feDiffuseLighting>
  <feComposite in="d" in2="SourceGraphic" operator="arithmetic" k1=".62" k2=".44" result="lit"/><feComposite in="lit" in2="SourceAlpha" operator="in" result="top"/>
  <feOffset in="SourceAlpha" dx=".45" dy=".6"/><feGaussianBlur stdDeviation=".45"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .08  0 0 0 0 .05  0 0 0 .32 0" result="sh"/>
  <feMerge><feMergeNode in="sh"/><feMergeNode in="top"/></feMerge></filter>`;
// the panel: viewBox 100 x H; carving everywhere but the medallion
function ukPanel(uid,H,my,mrx,mry){const med=ukLobed(50,my,mrx,mry,16,.06),rim=ukLobed(50,my,mrx+2.2,mry+2.2,16,.06);
  return `<svg class="uk-svg" viewBox="0 0 100 ${H}" preserveAspectRatio="xMidYMid slice" ${NS} aria-hidden="true"><defs>${ukRelief(uid)}
    <pattern id="ukp${uid}" width="19" height="19" patternUnits="userSpaceOnUse" x="-9.5" y="${u2(my-9.5)}"><g class="uk-plaster">${ukTile(19)}</g></pattern>
    <mask id="ukm${uid}"><rect x="-10" y="-10" width="120" height="${H+20}" fill="#fff"/><path d="${rim}" fill="#000"/></mask>
    <filter id="uki${uid}"><feGaussianBlur stdDeviation="1.4"/></filter></defs>
    <rect x="-10" y="-10" width="120" height="${H+20}" class="uk-wash"/>
    <rect x="-10" y="-10" width="120" height="${H+20}" fill="url(#ukp${uid})" mask="url(#ukm${uid})" filter="url(#ukr${uid})"/>
    <path d="${rim}" class="uk-smooth"/>
    <path d="${med}" fill="none" stroke="#2a2016" stroke-opacity=".35" stroke-width="2.2" filter="url(#uki${uid})" clip-path="url(#ukc${uid})"/>
    <clipPath id="ukc${uid}"><path d="${med}"/></clipPath>
    <g class="uk-plaster" filter="url(#ukr${uid})"><path d="${rim}" fill="none" stroke-width="1.5"/><path d="${ukLobed(50,my,mrx+4.4,mry+4.4,16,.06)}" fill="none" stroke-width=".5"/></g>
    <path d="${ukLobed(50,my,mrx-2.6,mry-2.6,16,.06)}" fill="none" class="uk-ink" stroke-width=".3" stroke-dasharray=".6 .9"/>
  </svg>`}
const ukTxt=(o,L,big)=>{const [n1,n2]=coverNames(o);return `<div class="uk-txt">${big&&o.bismillah?'<p class="uk-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}<p class="uk-k${big?' kicker':''}">${ev(o,L)}</p>
  <p class="uk-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="uk-date">${esc(big?fmtDate(o.date,o.lang):fmtShort(o.date).replace(/\./g,' · '))}</p>
  ${big&&o.venue?`<p class="uk-ven">${esc(o.venue)}</p>`:''}</div>`};
const ukT=(k,n,desc,ground,ink,extra={})=>({k,n,desc,c:{ground,sheet:ground,ink,accent:ink,gold:ink,pagefg:ink,plaster:'#f4efe4',...extra}});
FAMILY({key:'ukiran',name:'Ukiran',meaning:'Carved plaster',
  blurb:'A carved plaster panel in raking morning light, star strapwork in relief washed with one ink colour, your names painted in a smooth medallion at its heart.',
  fonts:{d:"'IM Fell English SC', serif",s:"'IM Fell English', serif",b:"'IM Fell English', serif"},ms:1300,
  page(o,th,L){const en=o.lang==='en';return `<section class="page pg-ukiran2" style="--plaster:${th.c.plaster}"><div class="uk-wall"></div>${ukPanel(++ukN,195,80,41,64)}
    <div class="uk-med reveal">${ukTxt(o,L,true).replace(/<\/div>$/,`<a class="uk-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></div>`)}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-ukiran2" style="--plaster:${th.c.plaster}"><div class="uk-wall"></div>
    <div class="uk-panel">${ukPanel(++ukN,146,70,31,47)}<div class="uk-in">${ukTxt(o,L,false)}</div><i class="uk-sun"></i></div>
    <div class="uk-foot">${guest?`<p class="uk-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="uk-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('uk-dark',!!th.c.dark);el.style.setProperty('--plaster',th.c.plaster);
    el.style.setProperty('--frieze',K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 12.5"><defs>${ukRelief('s')}</defs><g fill="${th.c.plaster}" stroke="${th.c.plaster}" filter="url(#ukrs)">${ukTile(12.5)}<g transform="translate(12.5 0)">${ukTile(12.5)}</g><g transform="translate(25 0)">${ukTile(12.5)}</g><g transform="translate(37.5 0)">${ukTile(12.5)}</g></g></svg>`));
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    ukT('sepia','Sepia','Warm plaster, sepia wash','#efe4cc','#5b3d24',{plaster:'#f6eedc'}),
    ukT('dakwat','Dakwat Biru','White plaster, blue-black wash','#eceae3','#253a63'),
    ukT('melati','Melati','White plaster, jasmine-leaf green wash','#ecede4','#2e4637'),
    ukT('merah','Dakwat Merah','White plaster, oxblood wash','#f1e9df','#6e1a26'),
    ukT('hijau-tua','Hijau Tua','White plaster, deep green wash','#eaede3','#24412f'),
    ukT('ungu','Ungu','White plaster, plum wash','#f0eaec','#4a2541'),
    ukT('terakota','Terakota','Sand plaster, terracotta wash','#f1e7dc','#8a3f28'),
    ukT('arang','Arang','Charcoal plaster, chalk-white lines','#2e2d2b','#ece6da',{plaster:'#4a4844',dark:'1'}),
    ukT('nila','Nila','White plaster, indigo wash','#eaedf1','#1d2b4a'),
    ukT('mauve','Mauve Zaitun','Rose plaster, mulberry wash','#f2e7e6','#5a1a2a',{plaster:'#f8f0ee'}),
    ukT('pic','Pic Sage','Peach plaster, sage wash','#f8ece2','#4f5d47',{plaster:'#fbf3ec'}),
    ukT('kunyit','Kunyit Nila','Saffron plaster, indigo wash','#f5ead2','#1d2b4a',{plaster:'#f9f1df'}),
    ukT('lavender','Lavender Arang','Lilac plaster, charcoal wash','#f0edf5','#3f3d46',{plaster:'#f7f5fa'}),
    ukT('karang','Teal Karang','Coral plaster, teal wash','#f8ece4','#0b4a4a',{plaster:'#fbf3ee'}),
    ukT('pandan','Pandan','Cream plaster, pandan wash','#f2ecda','#0d4a32',{plaster:'#f7f2e4'}),
    ukT('kopi','Kopi Susu','Coffee plaster, cream lines','#4a382c','#f1e5d2',{plaster:'#63503f',dark:'1'}),
    ukT('hujan','Biru Hujan','Grey plaster, slate wash','#ebeef1','#26394d',{plaster:'#f4f6f8'}),
    ukT('fajar','Fajar','Blush plaster, plum wash','#f8ebe6','#4a2238',{plaster:'#fcf3ef'}),
  ]});
