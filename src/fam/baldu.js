/* baldu: a velvet keepsake box, the names hot-foiled in gold on the lid, tied with a satin ribbon in a flat knot.
   Cover: tap "Buka Jemputan", the ribbon slips off, the lid lifts away and the satin-lined tray with the card comes forward.
   Page: looking down into the open box: velvet walls, ivory satin lining, the card resting inside.
   Skin: paper cards on velvet, a satin ribbon caught across one corner of each. */
const bdHex=(a,b,t)=>'#'+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t).toString(16).padStart(2,'0')).join('');
const bdGo=(el)=>{const sc=$('.scroller',el);
  $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))};
const bdVars=c=>`--vel:${c.vel};--rib:${c.rib}`;
const bdRibbon=()=>`<div class="bd-ribbon"><i class="bd-band"></i><i class="bd-tail t1"></i><i class="bd-tail t2"></i><i class="bd-knot"></i></div>`;
// [key, name, description, velvet, ribbon, light?]
const BD=[['wain','Merah Wain','Wine velvet, ivory satin','#5a1424','#efe4d0'],['zamrud','Zamrud','Emerald velvet, gold satin','#13483a','#d9bf86'],
  ['diraja','Biru Diraja','Royal blue velvet, gold satin','#1c2c5e','#d9bf86'],['champagne','Champagne','Champagne velvet, ivory satin','#c4ad8c','#f8f2e8',1],
  ['hitam','Hitam','Black velvet, wine satin','#1d1b1c','#8a2232'],['sage','Sage','Sage velvet, cream satin','#66755a','#f1ebdc'],
  ['biru-lembut','Biru Lembut','Soft blue velvet, cream satin','#5c7594','#efe4cc'],['ungu','Ungu','Plum velvet, gold satin','#47213f','#d9bf86'],
  ['terakota','Terakota','Terracotta velvet, cream satin','#8a3e28','#efe2c8'],['merah-jambu','Merah Jambu','Dusty rose velvet, pearl satin','#b67a80','#fbf3ee',1],
  ['mauve','Mauve Zaitun','Mauve velvet, olive satin','#6a3248','#a3a16a'],['pic','Pic Sage','Sage velvet, peach satin','#55654c','#efb08f'],
  ['kunyit','Kunyit Nila','Indigo velvet, turmeric satin','#1e2d52','#e0a832'],['lavender','Lavender Arang','Charcoal velvet, lavender satin','#3c3a42','#b3a6d8'],
  ['karang','Teal Karang','Teal velvet, coral satin','#0d4e4e','#ef8a72'],['pandan','Pandan','Pandan velvet, gold satin','#14573c','#d6b450'],
  ['kopi','Kopi Susu','Coffee velvet, milky satin','#4a3226','#d8bc98'],['hujan','Biru Hujan','Rain-blue velvet, mist satin','#2c4258','#b4c4d2'],
  ['fajar','Fajar','Aubergine velvet, apricot satin','#562a44','#f2a876']];
FAMILY({key:'baldu',name:'Kotak Baldu',meaning:'Velvet keepsake box',
  blurb:'A velvet keepsake box with your names foiled in gold on the lid, tied with a satin ribbon. The lid lifts to show the card inside.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<section class="page pg-baldu2" style="${bdVars(c)}"><div class="bd-surface"></div>
      <div class="bd-tray reveal"><div class="bd-lining">
        <div class="bd-card"><p class="bd-k kicker">${ev(o,L)}</p>
          <h1 class="bd-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
          <i class="bd-rule"></i>
          <p class="bd-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="bd-hj">${esc(o.hijri)}</p>`:''}
          ${o.venue?`<p class="bd-ven">${esc(o.venue)}</p>`:''}
          <a class="bd-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></div></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<div class="cover cv-baldu2${c.light?' bd-light':''}" style="${bdVars(c)}"><div class="bd-surface"></div>
      <div class="bd-stage"><div class="bd-body"></div>
        <div class="bd-inside"><div class="bd-icard"><p class="bd-k">${ev(o,L)}</p><p class="bd-in">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div></div>
        <div class="bd-lid"><div class="bd-top"><div class="bd-foil"><p class="bd-k">${ev(o,L)}</p><p class="bd-fn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="bd-fd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>${bdRibbon()}</div><div class="bd-edge"></div></div></div>
      <div class="bd-foot">${guest?`<p class="bd-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="bd-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--vel',th.c.vel);el.style.setProperty('--rib',th.c.rib);bdGo(el)},
  themes:BD.map(([k,n,desc,vel,rib,light])=>({k,n,desc,c:light
    ?{ground:bdHex(vel,'#ffffff',.72),sheet:'#fffbf4',ink:'#2e2622',accent:bdHex(vel,'#000000',.5),gold:'#b08a46',pagefg:bdHex(vel,'#000000',.62),vel,rib,cover:vel,light:1}
    :{ground:bdHex(vel,'#000000',.6),sheet:'#fbf7ef',ink:'#2e2622',accent:bdHex(vel,'#000000',.15),gold:'#d6b06a',pagefg:'#f1e8d8',vel,rib,cover:vel}}))});
