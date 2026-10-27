/* muzium: a quiet gallery wall. One public-domain painting in a carved gilt frame under a brass picture light,
   the couple's names set as the exhibition title, and a museum wall label with the date, time and venue.
   Cover: tap "Buka Jemputan" and the view walks along the wall to the next room.
   Page: the next wall: the couple photo framed like a gallery print (or the painting again), the names and a
   wall text, with small room signs that lead to the details. Skin: white museum text panels on the wall colour. */
const GM_ART={
  'still-1':['Rachel Ruysch','Still Life with Flowers','c. 1750'],'still-2':['Jan Davidsz. de Heem','Vase of Flowers','c. 1670'],
  'still-3':['Abraham Mignon','Flowers in a Metal Vase','c. 1670'],'still-4':['Rachel Ruysch','Flowers in a Glass Vase','1686'],
  'paint-monet-irises':['Claude Monet',"The Artist's Garden in Giverny",'1900'],'paint-monet-poppies':['Claude Monet','Poppy Field (Giverny)','1890–91'],
  'paint-hassam-island':['Childe Hassam','The Island Garden','1892'],'paint-hassam-water':['Childe Hassam','The Water Garden','1909'],
  'paint-hokusai-fuji':['Katsushika Hokusai','Fine Wind, Clear Weather','c. 1830–31']};
/* photographed carved gilt frames (Met Museum, CC0); the opening of each, as % of the image */
const GM_FR={2:{ar:'900/1204',o:'left:15.6%;top:11.5%;width:69.4%;height:76.3%'},3:{ar:'900/1097',o:'left:15.3%;top:12.1%;width:69.6%;height:75.7%'}};
const gmFrame=(c,cls='')=>{const f=GM_FR[c.fr]||GM_FR[2];return `<span class="gm-frame ${cls}" style="aspect-ratio:${f.ar}"><span class="gm-canvas" style="${f.o}"><img src="${A}pd-${c.art}.jpg" alt="" style="object-position:${c.pos||'50% 50%'}"><i class="gm-varnish"></i></span><img class="gm-gilt" src="${A}pd-frame-${c.fr||2}.webp" alt=""></span>`};
const gmCredit=c=>{const a=GM_ART[c.art];return a?`${esc(a[0])}, <i>${esc(a[1])}</i>, ${esc(a[2])}`:''};
FAMILY({key:'muzium',name:'Galeri',meaning:'Museum gallery wall',
  blurb:'A gallery wall with one real painting in a gilt frame under a warm picture light, the names as the exhibition title and the details on a museum label.',
  fonts:{d:"'Jost', sans-serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',photo=typeof couplePhotoOf==='function'&&couplePhotoOf(o);
    return `<section class="page pg-muzium"><i class="gm-wall"></i><i class="gm-glow gm-pglow"></i>
      ${photo?'':`<div class="gm-pframe reveal"><i class="gm-lamp"></i>${gmFrame(c)}</div>`}
      <p class="gm-k kicker reveal d1">${ev(o,L)}</p>
      <h1 class="names gm-names reveal d1">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
      <p class="gm-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p>
      ${o.hosts?`<p class="gm-intro reveal d2">${en?`${esc(o.hosts)} warmly invite you to celebrate with us.`:`${esc(o.hosts)} menjemput tuan/puan meraikan hari bahagia ini bersama kami.`}</p>`:''}
      <nav class="gm-signs reveal d3"><a data-go="when" href="#"><small>${en?'Room 1':'Bilik 1'}</small>${en?'Details':'Butiran'}<i>&rarr;</i></a>${o.x_rsvp?`<a data-go="rsvp" href="#"><small>${en?'Room 2':'Bilik 2'}</small>RSVP<i>&rarr;</i></a>`:''}<a data-go="loc" href="#"><small>${en?'Way in':'Arah'}</small>${en?'Map':'Lokasi'}<i>&rarr;</i></a></nav></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',y=String(o.date||'').slice(0,4);
    return `<div class="cover cv-muzium"><div class="gm-room"><i class="gm-wall"></i><i class="gm-glow"></i>
      <div class="gm-title"><p class="gm-k">${ev(o,L)}</p><p class="gm-tn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div>
      <div class="gm-hang"><i class="gm-lamp"></i>${gmFrame(c)}</div>
      <div class="gm-label"><b>${esc(n1)} &amp; ${esc(n2)}</b><em>${ev(o,L)}, ${esc(y)}</em>
        <span>${esc(fmtDate(o.date,o.lang))} · ${esc(fmtTime(o.start,o.lang))}</span><span>${esc(o.venue)}</span>
        ${guest?`<span class="gm-for">${L.dear} <strong>${esc(guest)}</strong></span>`:''}
        <small>${en?'On the wall':'Di dinding'}: ${gmCredit(c)}</small></div>
      </div>
      <${tag} class="gm-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th){K.cards(el);el.classList.toggle('gm-dark',!!th.c.dark);const sc=$('.scroller',el),en=o.lang==='en';
    $$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(h)h.dataset.room=(en?'Room ':'Bilik ')+(i+1)});
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'hijau',n:'Hijau Galeri',desc:'Museum-green wall, Dutch flower painting',c:{ground:'#2f4a40',sheet:'#f8f5ee',ink:'#22201c',accent:'#2f4a40',gold:'#c9a24f',pagefg:'#efe9dc',art:'still-2',fr:2,pos:'50% 40%',dark:1}},
    {k:'merah',n:'Merah',desc:'Oxblood wall, Dutch flower painting',c:{ground:'#5a1e22',sheet:'#f8f4ec',ink:'#241c1a',accent:'#5a1e22',gold:'#d0aa58',pagefg:'#f3e6d6',art:'still-1',fr:3,pos:'50% 35%',dark:1}},
    {k:'putih',n:'Putih',desc:'White gallery, Monet poppy field',c:{ground:'#e9e6e0',sheet:'#ffffff',ink:'#22201d',accent:'#6b4a2e',gold:'#c39a4c',pagefg:'#2a2622',art:'paint-monet-poppies',fr:2,pos:'50% 60%'}},
    {k:'nila',n:'Nila',desc:'Navy wall, Hokusai red Fuji',c:{ground:'#1d2a44',sheet:'#f7f4ee',ink:'#1e2230',accent:'#1d2a44',gold:'#d2ac60',pagefg:'#ece6d8',art:'paint-hokusai-fuji',fr:3,pos:'50% 50%',dark:1}},
    {k:'kelabu',n:'Kelabu',desc:'Slate wall, Hassam water garden',c:{ground:'#5f5e5a',sheet:'#f7f5f0',ink:'#22211f',accent:'#3b5a54',gold:'#cfaa5c',pagefg:'#f1ece2',art:'paint-hassam-water',fr:2,pos:'50% 50%',dark:1}},
    {k:'jambu',n:'Jambu',desc:'Blush wall, Hassam island garden',c:{ground:'#d9bcb5',sheet:'#fffaf7',ink:'#2e2224',accent:'#7a2f3f',gold:'#b88f4e',pagefg:'#3a2628',art:'paint-hassam-island',fr:3,pos:'50% 50%'}},
    {k:'hitam',n:'Hitam',desc:'Black wall, Dutch flower painting',c:{ground:'#171616',sheet:'#f6f2ea',ink:'#1d1b18',accent:'#3a2a1c',gold:'#cfa75c',pagefg:'#ece4d4',art:'still-3',fr:3,pos:'50% 35%',dark:1}},
    {k:'sage',n:'Sage',desc:'Sage wall, Monet iris garden',c:{ground:'#a3ac97',sheet:'#fbf9f2',ink:'#1f241c',accent:'#2f4a3a',gold:'#c3a058',pagefg:'#1f241c',art:'paint-monet-irises',fr:2,pos:'50% 50%'}},
  ]});
