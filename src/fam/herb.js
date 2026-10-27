/* herb (redesign): a herbarium specimen sheet. A real botanical plate (public domain) "pressed" on heavy mounting paper,
   held by strips of washi tape, with a typed specimen label, a catalogue number and a round ink stamp.
   Cover: tap "Buka Jemputan" and the sheet is drawn aside off the table.
   Page: the specimen sheet laid out with the names typed on its label. Skin: mounting-paper cards with a strip of washi tape. */
const hbTape=(x,y,w,rot,seed)=>{const r=rng(seed),z=[];for(let i=0;i<=6;i++)z.push(`${(r()*7).toFixed(1)}% ${(i/6*100).toFixed(1)}%`);
  const zr=[];for(let i=6;i>=0;i--)zr.push(`${(93+r()*7).toFixed(1)}% ${(i/6*100).toFixed(1)}%`);
  return `<i class="hb2-tape" style="left:${x}%;top:${y}%;width:${w}%;transform:rotate(${rot}deg);clip-path:polygon(${z.join(',')},${zr.join(',')})"></i>`};
// a round rubber stamp: ring of spaced caps around the date
const hbStamp=(o,L,uid)=>{const t=String(ev(o,L)).replace(/&amp;/g,'&').toUpperCase(),d=esc(fmtShort(o.date));
  return `<svg class="hb2-stamp" viewBox="0 0 100 100"><defs><path id="hbp${uid}" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1 -72 0"/></defs>
    <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="50" cy="50" r="43.5" fill="none" stroke="currentColor" stroke-width=".7"/><circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" stroke-width=".8"/>
    <text font-family="Special Elite, monospace" font-size="8.4" letter-spacing="2" fill="currentColor"><textPath href="#hbp${uid}" startOffset="2%">${esc(t)} · ${esc(t)} ·</textPath></text>
    <text x="50" y="54" text-anchor="middle" font-family="Special Elite, monospace" font-size="9" fill="currentColor">${d}</text></svg>`};
let hbN=0;
const hbNo=o=>{const m=String(o.date||'').match(/\d{4}-(\d\d)-(\d\d)/);return m?`${m[2]}${m[1]}`:'1912'};
const hbPlant=(fl,cls)=>`<div class="hb2-plant ${cls}"><i class="hb2-pl" style="background-image:url(${A}flower-${fl}.webp)"></i>${hbTape(37,83,26,-9,3)}${hbTape(41,60,20,14,5)}</div>`;
FAMILY({key:'herb',name:'Herbarium',meaning:'Pressed specimen',
  blurb:'A pressed flower taped to a herbarium sheet with a typed specimen label and an ink stamp. Guests draw the sheet aside to open the card.',
  fonts:{d:"'Special Elite', monospace",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1350,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',fl=th.fl[0];
    return `<section class="page pg-herb2"><div class="hb2-table"></div>
      <div class="hb2-sheet hb2-big reveal"><span class="hb2-no">No. ${hbNo(o)}</span>${hbStamp(o,L,++hbN)}
        ${hbPlant(fl,'hb2-pp')}
        <p class="hb2-k kicker">${ev(o,L)}</p><h1 class="hb2-names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1>
        <div class="hb2-label"><p><small>${en?'Date':'Tarikh'}</small><b>${esc(fmtDate(o.date,o.lang))}</b></p>${o.venue?`<p><small>${en?'Venue':'Tempat'}</small><b>${esc(o.venue)}</b></p>`:''}${o.start?`<p><small>${en?'Time':'Masa'}</small><b>${esc(fmtTime(o.start,o.lang))}</b></p>`:''}</div></div>
      <a class="hb2-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',fl=th.fl[0];
    return `<div class="cover cv-herb2${th.c.dark?' hb2-dk':''}"><div class="hb2-table"></div>
      <div class="hb2-sheet"><span class="hb2-no">No. ${hbNo(o)}</span>${hbStamp(o,L,++hbN)}
        ${hbPlant(fl,'')}
        <div class="hb2-label hb2-cl">${guest?`<p class="hb2-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
          <p class="hb2-k">${ev(o,L)}</p><p class="hb2-cn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p>
          <p><small>${en?'Date':'Tarikh'}</small><b>${esc(fmtShort(o.date))}</b></p>${o.venue?`<p><small>${en?'Venue':'Tempat'}</small><b>${esc(o.venue)}</b></p>`:''}</div></div>
      <${tag} class="hb2-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('hb2-dk',!!th.c.dark);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    // [key, name, desc, table, accent, tape, plate, dark]
    ...[['melati','Melati','Pressed jasmine, sand tape','#d9cdb9','#7a3a4a','#c9a77a','jasmine'],
    ['raya','Bunga Raya','Pressed hibiscus, rose tape','#cfc3b2','#9c3a52','#d9a7b5','hibiscus'],
    ['iris','Iris','Pressed iris, blue tape','#c9cdd3','#2d4b78','#a9bbd6','iris'],
    ['lupa','Lupa Jangan','Pressed forget-me-nots, celadon tape','#d3d6cc','#3c5f8a','#b8c7a0','forget-me-not'],
    ['anemone','Anemone','Pressed anemones, ochre tape','#d8cbbd','#8a2a2a','#c9b06a','anemones'],
    ['mawar','Mawar Liar','Pressed wild rose, pink tape','#d2d0c0','#6e3a4a','#d1a3a3','wild-rose'],
    ['teratai','Teratai','Pressed water lily, mist tape','#cdd5d6','#2d4b78','#b9cadb','lotus'],
    ['mawar-putih','Mawar Putih','Pressed white roses, straw tape','#d6d2c4','#4a5a3f','#d9c9a0','white-roses'],
    ['jambu','Jambu','Pressed blush rose, pink tape','#dccfc8','#9c4a5a','#e3b9b9','blush-rose'],
    ['merah','Merah','Pressed red rose on oxblood','#3e2024','#7a1b29','#c9a77a','red-rose',1],
    ['kubis','Mawar Kubis','Pressed cabbage rose, kraft tape','#d3cdbd','#6b4a3a','#c9b48a','cabbage-rose'],
    ['mauve','Mauve Zaitun','Pressed anemones, mauve tape','#cbbcbc','#6e4a5a','#b896a4','anemones'],
    ['pic','Pic Sage','Pressed wild rose, peach tape','#d9cbbd','#b4603f','#e9a07f','wild-rose'],
    ['kunyit','Kunyit Nila','Pressed anemones, turmeric tape','#d6cbb6','#a24a22','#e3a72f','anemones'],
    ['lavender','Lavender Arang','Pressed iris, lilac tape','#cfccd6','#6f62a8','#a79bd1','iris'],
    ['karang','Teal Karang','Pressed water lily, coral tape','#c9d3cf','#0f6b6b','#ef8a72','lotus'],
    ['pandan','Pandan','Pressed jasmine on pandan green','#24392d','#0d4a32','#c9a43f','jasmine',1],
    ['kopi','Kopi Susu','Pressed cabbage rose on walnut','#3a2c23','#6b4a3a','#c9a982','cabbage-rose',1],
    ['hujan','Biru Hujan','Pressed forget-me-nots on slate','#2c3844','#3a5570','#8fa7bd','forget-me-not',1],
    ['fajar','Fajar','Pressed pink rose, apricot tape','#ddc9c4','#a3465f','#f0a46c','pink-rose'],
    ].map(([k,n,desc,ground,accent,tape,fl,dark])=>({k,n,desc,c:{ground,sheet:'#fbf8f1',ink:'#33291f',accent,gold:accent,tape,pagefg:dark?'#f3ede3':'#33291f',dark:dark?1:0},extra:{fl:[fl,fl]}}))]});
