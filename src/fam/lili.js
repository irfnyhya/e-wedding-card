/* lili: "Lili Malam". A dark, dramatic botanical card. Lilies, roses and tulips cropped from Dutch flower still lifes
   (Ruysch, de Heem, Mignon, van Huysum; public domain) spill in from the corners of a deep velvet ground; a gold-foil
   Jawi or Latin monogram and large italic names sit in the calm space between them.
   Cover: tap "Buka Jemputan" and the flowers part to the sides. Page: the flowers settle at the edges around the names.
   Skin: velvet cards edged with a fine foil rule, italic headings. The two light colourways use Redouté cut-outs instead. */
// the paintings' pixel sizes, to crop a point of each into a box
const LL_IMG={'pd-still-1.jpg':[1000,1289],'pd-still-2.jpg':[1000,1423],'pd-still-3.jpg':[1000,1306],'pd-still-4.jpg':[1000,1257],'pd-bouquet.jpg':[1000,1323]};
// put painting point (cx,cy) (0-1) at the centre of a box of aspect a (w/h), the painting z times as wide as the box
const llCrop=(f,cx,cy,z,a)=>{const [iw,ih]=LL_IMG[f],r=z*ih/iw,px=(cx*z-.5)/(z-1)*100,py=(cy*r-.5/a)/(r-1/a)*100;
  return `background-image:url(${A}${f});background-size:${z*100}% auto;background-position:${px.toFixed(1)}% ${py.toFixed(1)}%;aspect-ratio:${a}`};
// four corner pieces: [painting, cx, cy, zoom] for dark grounds, or a flower cut-out name for the light ones
const LL_W={anemones:617,'blush-rose':622,'cabbage-rose':581,'forget-me-not':528,hibiscus:619,iris:566,jasmine:518,lotus:621,'pink-rose':674,'red-rose':622,'white-roses':636,'wild-rose':663};
const llPieces=c=>['tl','tr','bl','br'].map((k,i)=>{const p=c.art[i];
  return typeof p==='string'?`<i class="ll-fl ll-cut ${k}" style="background-image:url(${A}flower-${p}.webp);aspect-ratio:${((LL_W[p]||600)/(760*.86)).toFixed(3)}"></i>`
    :`<i class="ll-fl ll-oil ${k}" style="${llCrop(p[0],p[1],p[2],p[3],k[0]==='t'?.8:.9)}"></i>`}).join('')+'<i class="ll-calm"></i>';
// the monogram: initials (or the couple's Jawi) inside a double foil hairline ring with a small lily-bud finial top and bottom
const LL_RING=`<svg class="ll-ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46.5"/><circle cx="50" cy="50" r="43" stroke-width=".45"/><path d="M50 1.5c1.6 2 1.6 3.6 0 5.4c-1.6-1.8-1.6-3.4 0-5.4zM50 98.5c1.6-2 1.6-3.6 0-5.4c-1.6 1.8-1.6 3.4 0 5.4z" class="f"/><circle cx="3.5" cy="50" r=".9" class="f"/><circle cx="96.5" cy="50" r=".9" class="f"/></svg>`;
const llMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="ll-mono">${LL_RING}<span class="ll-ini jw">${esc(j)}</span></span>`;const [a,b]=K.initials(o);return `<span class="ll-mono">${LL_RING}<span class="ll-ini"><b>${esc(a)}</b><i></i><b>${esc(b)}</b></span></span>`};
const llNames=o=>{const [n1,n2]=coverNames(o);return `<h1 class="ll-names"><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></h1>`};
const S2=[['pd-still-2.jpg',.42,.17,2.1],['pd-still-1.jpg',.6,.36,2.6],['pd-still-3.jpg',.3,.6,2.6],['pd-still-4.jpg',.55,.47,1.9]];
FAMILY({key:'lili',name:'Lili Malam',meaning:'Night lilies',
  blurb:'A dark, dramatic card: lilies and roses from old Dutch flower paintings spill in from the corners of a velvet ground, with a gold-foil monogram and large italic names. The flowers part to open it.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Bodoni Moda', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en';return `<section class="page pg-lili ${th.c.light?'ll-light':''}"><i class="ll-vel"></i>${llPieces(th.c)}
    <div class="ll-col">
      <div class="ll-crest reveal">${llMono(o)}</div>
      ${o.bismillah?`<p class="ll-bis reveal">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
      <p class="ll-k kicker reveal d1">${ev(o,L)}</p>
      <div class="reveal d1">${llNames(o)}</div>
      <p class="ll-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="ll-hj reveal d2">${esc(o.hijri)}</p>`:''}
      ${o.venue?`<p class="ll-ven reveal d2">${esc(o.venue)}</p>`:''}
      <div class="ll-pills reveal d3"><a class="ll-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="ll-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
    </div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';return `<div class="cover cv-lili ${th.c.light?'ll-light':''}"><i class="ll-vel"></i>${llPieces(th.c)}
    <div class="ll-mid">${llMono(o)}<p class="ll-k">${ev(o,L)}</p>${llNames(o)}<p class="ll-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
    <div class="ll-foot">${guest?`<p class="ll-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="ll-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('ll-light',!!th.c.light);
    // a couple photo takes the monogram's place, in a gold-ringed oval
    const pg=$('.pg-lili',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph);
    if(img){const cr=$('.ll-crest',pg);img.className='ll-photo';img.removeAttribute('style');cr.innerHTML='';cr.classList.add('has-photo');cr.appendChild(img);ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'hitam',n:'Hitam',desc:'White lilies and roses on black velvet',c:{ground:'#0d0b0a',sheet:'#1a1614',ink:'#efe6d6',accent:'#e3c88f',gold:'#c4a05c',pagefg:'#efe6d6',art:S2}},
    {k:'marun',n:'Marun',desc:'Tulips and poppies on wine velvet',c:{ground:'#2a0c13',sheet:'#3a141d',ink:'#f4e7d6',accent:'#e6c98e',gold:'#c9a35a',pagefg:'#f4e7d6',art:[['pd-still-1.jpg',.4,.3,2.2],['pd-still-2.jpg',.42,.17,2.4],['pd-still-1.jpg',.22,.62,2.6],['pd-still-3.jpg',.45,.48,2]]}},
    {k:'zamrud',n:'Zamrud',desc:'Lilies and roses on emerald velvet',c:{ground:'#0b1c17',sheet:'#132c25',ink:'#eee9d8',accent:'#e0c68c',gold:'#c6a45e',pagefg:'#eee9d8',art:[['pd-still-2.jpg',.42,.17,2.1],['pd-bouquet.jpg',.5,.2,2.4],['pd-still-2.jpg',.7,.55,2.6],['pd-bouquet.jpg',.45,.48,1.9]]}},
    {k:'nila',n:'Nila',desc:'Pale roses and lilies on midnight velvet',c:{ground:'#0c1224',sheet:'#161f38',ink:'#ece7dc',accent:'#e2c991',gold:'#c7a560',pagefg:'#ece7dc',art:[['pd-still-2.jpg',.42,.17,2.1],['pd-still-4.jpg',.6,.32,2.4],['pd-bouquet.jpg',.42,.5,2.4],['pd-still-4.jpg',.5,.48,1.9]]}},
    {k:'ungu',n:'Ungu',desc:'Lilies and pink roses on plum velvet',c:{ground:'#1b0e1f',sheet:'#2a172f',ink:'#f2e8e2',accent:'#e5c894',gold:'#c8a45f',pagefg:'#f2e8e2',art:[['pd-still-2.jpg',.42,.17,2.1],['pd-still-2.jpg',.72,.33,2.6],['pd-still-4.jpg',.4,.4,2.6],['pd-still-2.jpg',.62,.58,2.2]]}},
    {k:'coklat',n:'Coklat',desc:'Warm tulips and lilies on cocoa velvet',c:{ground:'#1c120c',sheet:'#2b1d14',ink:'#f3e9d7',accent:'#e2c58a',gold:'#c6a25c',pagefg:'#f3e9d7',art:[['pd-still-2.jpg',.3,.22,2.2],['pd-still-3.jpg',.35,.12,2.6],['pd-still-1.jpg',.2,.7,2.6],['pd-still-1.jpg',.42,.42,2]]}},
    {k:'gading',n:'Gading',desc:'White roses and irises on ivory',c:{ground:'#efe8dc',sheet:'#fbf7f0',ink:'#2e2924',accent:'#6b4e2e',gold:'#b08d50',pagefg:'#2e2924',light:1,art:['white-roses','anemones','wild-rose','blush-rose']}},
    {k:'jambu',n:'Jambu Kusam',desc:'Blush roses and anemones on dusty rose',c:{ground:'#e8d3cf',sheet:'#f8eeeb',ink:'#3c2628',accent:'#7a3442',gold:'#b08a5a',pagefg:'#3c2628',light:1,art:['blush-rose','anemones','wild-rose','pink-rose']}},
  ]});
