/* resit: a thermal receipt coming out of a small receipt printer. "PESANAN: 1x Majlis Perkahwinan", a barcode.
   Opening: press FEED and the receipt feeds down out of the slot. Page: the whole receipt, torn with zig-zag edges.
   Skin: monospace receipt sections with zig-zag edges and dashed rules. */
let rsN=0;
const rsLum=h=>{h=h.replace('#','');const [r,g,b]=[0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255);return .2126*r+.7152*g+.0722*b};
function rsBars(seed,h=40){const r=rng(seed);let x=0,s='';const W=200;while(x<W-2){const w=[1,1,1,2,2,3][Math.floor(r()*6)];if(r()>.45)s+=`<rect x="${x}" y="0" width="${w}" height="${h}"/>`;x+=w+(r()<.3?1:0)}
  return `<svg class="resit-bc" viewBox="0 0 200 ${h}" preserveAspectRatio="none" aria-hidden="true"><rect x="0" y="0" width="2" height="${h}"/><rect x="3" y="0" width="1" height="${h}"/>${s}<rect x="196" y="0" width="1" height="${h}"/><rect x="198" y="0" width="2" height="${h}"/></svg>`}
const rsRow=(a,b,cls='')=>`<p class="resit-r ${cls}"><span>${a}</span><b>${b}</b></p>`;
function rsReceipt(o,th,L,guest,full){const [n1,n2]=coverNames(o),en=o.lang==='en',[i1,i2]=K.initials(o),d=new Date((o.date||'')+'T00:00:00'),ok=!isNaN(d);
  const no=ok?`${String(d.getDate()).padStart(2,'0')}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getFullYear()).slice(2)}`:'000000';
  const dd=ok?`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`:'';
  const sc=(o.schedule||[]).filter(s=>s.label);
  const free=en?'FREE':'PERCUMA',pl=en?'PRICELESS':'TAK TERNILAI';
  return `<div class="resit-head"><span class="resit-logo"><b>${esc(i1)}</b><i>&amp;</i><b>${esc(i2)}</b></span>
     <p class="resit-ev">${ev(o,L)}</p><p class="resit-nm">${esc(n1)} &amp; ${esc(n2)}</p>
     <p class="resit-c">${esc(o.venue)}</p>${o.address?`<p class="resit-c sm">${esc(o.address)}</p>`:''}</div>
    <p class="resit-hr"></p>
    ${rsRow(en?'RECEIPT NO':'NO. RESIT',`${no}-0001`)}${rsRow(en?'DATE':'TARIKH',esc(dd))}${rsRow(en?'TIME':'MASA',`${esc(fmtTime(o.start,o.lang))} – ${esc(fmtTime(o.end,o.lang))}`)}
    ${guest?rsRow(en?'GUEST':'TETAMU',esc(guest)):rsRow(en?'COUNTER':'KAUNTER',en?'Honoured guest':'Tetamu istimewa')}
    <p class="resit-hr"></p>
    <p class="resit-sub">${en?'ORDER':'PESANAN'}:</p>
    ${rsRow(`1x ${en?'Wedding reception':'Majlis Perkahwinan'}`,free,'od')}<p class="resit-note">${esc(n1)} &amp; ${esc(n2)}</p>
    ${rsRow(`1x ${en?'Prayers & blessings':'Doa restu'}`,free,'od')}
    ${rsRow(`1x ${en?'Your presence':'Kehadiran anda'}`,free,'od')}
    ${full&&sc.length?`<p class="resit-hr thin"></p><p class="resit-sub">${en?'PROGRAMME':'ATURCARA'}:</p>${sc.map(s=>rsRow(esc(s.label),esc(fmtTime(s.time,o.lang)),'sch')).join('')}`:''}
    <p class="resit-hr dbl"></p>
    ${rsRow(en?'TOTAL':'JUMLAH',pl,'tot')}${rsRow(en?'PAID BY':'BAYARAN',en?'Your prayers':'Doa anda')}
    ${full&&o.deadline?rsRow(en?'REPLY BY':'SAHKAN SEBELUM',esc(fmtDate(o.deadline,o.lang,false)).toUpperCase()):''}
    <p class="resit-hr"></p>
    <div class="resit-foot">${rsBars(no.split('').reduce((a,c)=>a*7+ +c,3)%997+11)}<p class="resit-c sm">${no} 0001 ${ok?d.getFullYear():''}</p>
     <p class="resit-ty">${en?'Thank you · see you there':'Terima kasih · jumpa di sana'}</p><p class="resit-c sm">*** ${en?'KEEP THIS RECEIPT':'SIMPAN RESIT INI'} ***</p></div>`}

FAMILY({key:'resit',name:'Resit',meaning:'Thermal receipt',
  blurb:'A receipt printer on a counter; press FEED and a thermal receipt rolls out: 1x Majlis Perkahwinan, total priceless, with a barcode.',
  fonts:{d:"'IBM Plex Mono', monospace",s:"'IBM Plex Mono', monospace",b:"'IBM Plex Mono', monospace"},ms:1500,
  page(o,th,L){return `<section class="page pg-resit"><div class="resit-counter"></div><div class="resit-shad reveal"><div class="resit-paper resit-zz">${rsReceipt(o,th,L,'',true)}</div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-resit" style="--pr:${c.pr};--prfg:${rsLum(c.pr)>.5?'#2a2723':'#e9e5dc'}"><div class="resit-counter"></div>
    <div class="resit-feed"><div class="resit-paper">${rsReceipt(o,th,L,guest,false)}</div><i class="resit-curl"></i></div>
    <div class="resit-pr"><i class="resit-seam"></i><i class="resit-lip"></i><i class="resit-slot"></i><i class="resit-tear"></i><i class="resit-led"></i>
     <span class="resit-plate">${en?'Thermal · 80 mm':'Terma · 80 mm'}</span><i class="resit-grille"></i>
     <span class="resit-hint">${en?'Press FEED to print':'Tekan FEED untuk mencetak'}</span>
     <${tag} class="resit-btn" ${attr} aria-label="${L.open}"><span>FEED</span></${tag}></div>
    </div>`},
  skin(el,o){K.cards(el);const d=new Date((o.date||'')+'T00:00:00'),dd=isNaN(d)?'':`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
    $$('.sec',el).forEach((s,i)=>{s.classList.add('resit-sec');s.insertAdjacentHTML('afterbegin',`<span class="resit-meta"><span>#${String(i+2).padStart(4,'0')}</span><span>${dd}</span></span>`);const h=$('h2',s);if(h)h.innerHTML=`<span>${h.innerHTML}</span>`})},
  themes:[
    {k:'putih',n:'Putih',desc:'White printer on a stone counter',c:{ground:'#d8d3cb',sheet:'#fbfaf6',ink:'#24211d',accent:'#24211d',gold:'#b89458',pagefg:'#2b2824',pr:'#f1efea'}},
    {k:'hitam',n:'Hitam',desc:'Black printer on a dark counter',c:{ground:'#1b1b1b',sheet:'#f8f6f0',ink:'#1f1d1a',accent:'#1f1d1a',gold:'#c8a45e',pagefg:'#ece6da',pr:'#2b2b2b'}},
    {k:'merah',n:'Merah',desc:'Red counter, red total',c:{ground:'#7a1f24',sheet:'#fbf8f3',ink:'#2a1c1c',accent:'#a3222b',gold:'#c9a35a',pagefg:'#f6ede2',pr:'#f4efe8'}},
    {k:'biru',n:'Biru',desc:'Navy printer, pale blue counter',c:{ground:'#dde5ee',sheet:'#fbfbf8',ink:'#1d2433',accent:'#2c4a7c',gold:'#b8975a',pagefg:'#1d2433',pr:'#26324a'}},
    {k:'pic',n:'Pic',desc:'Peach counter, coral print',c:{ground:'#f2d8c5',sheet:'#fffbf6',ink:'#3a2620',accent:'#c4573a',gold:'#b8894a',pagefg:'#3a2620',pr:'#fffaf5'}},
    {k:'hijau',n:'Hijau',desc:'Forest counter, sage printer',c:{ground:'#22362c',sheet:'#fafaf5',ink:'#1e2822',accent:'#2f5c46',gold:'#c4a45e',pagefg:'#e6ece4',pr:'#e7ebe4'}},
    {k:'ungu',n:'Ungu',desc:'Plum printer on lilac',c:{ground:'#e5dfee',sheet:'#fcfbfd',ink:'#251f33',accent:'#5d4686',gold:'#b8975a',pagefg:'#251f33',pr:'#3b2f52'}},
    {k:'kuning',n:'Kuning',desc:'Sunny counter, black printer',c:{ground:'#efd998',sheet:'#fffdf6',ink:'#26231f',accent:'#9a5f0c',gold:'#9a5f0c',pagefg:'#2b2418',pr:'#26231f'}},
  ]});
