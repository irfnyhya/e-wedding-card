/* editorial: quiet-luxury magazine typography. Huge high-contrast Didone initials, hairline rules, crop marks, folios, a tiny caption.
   Cover: a title page; on tap a single hairline wipes slowly down the sheet and the page's letter-spacing settles.
   Page: an editorial spread with a pull quote and a notes column. Skin: numbered sections on hairlines. */
needFont('Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900');
needFont('Jost:wght@300;400;500;600');
const BD="'Bodoni Moda', serif",SANS="'Jost', sans-serif";
const ROM=n=>{let r='';for(const [a,t] of [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']])while(n>=a){r+=t;n-=a}return r};
const crops='<i class="ed-crop tl"></i><i class="ed-crop tr"></i><i class="ed-crop bl"></i><i class="ed-crop br"></i>';
function dparts(o){const d=new Date((o.date||'2026-01-01')+'T00:00:00');return {d:d.getDate(),m:d.getMonth()+1,y:d.getFullYear()}}
FAMILY({key:'editorial',name:'Editorial',meaning:'Quiet luxury magazine',
  blurb:'A quiet-luxury title page: towering Bodoni initials, hairline rules, crop marks and folios; a single hairline wipes slowly down to open it.',
  fonts:{d:SANS,s:BD,b:BD},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',p=dparts(o),[i1]=K.initials(o);
    const q=en?'And among His signs is that He created for you spouses from among yourselves, that you may find tranquillity in them.':'Dan di antara tanda-tanda kebesaran-Nya, Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.';
    return `<section class="page pg-editorial">${crops}
    <header class="ed-mast ed-ls"><span>${String(p.d).padStart(2,'0')}</span><span>${ev(o,L)}</span><span>${String(p.m).padStart(2,'0')}</span></header>
    <div class="ed-spread">
     <aside class="ed-notes reveal d1">
      <p><i>01</i><span>${en?'Date':'Tarikh'}</span><b>${esc(fmtDate(o.date,o.lang))}</b>${o.hijri?`<em>${esc(o.hijri)}</em>`:''}</p>
      <p><i>02</i><span>${en?'Time':'Masa'}</span><b>${esc(fmtTime(o.start,o.lang))}${o.end?` &#8211; ${esc(fmtTime(o.end,o.lang))}`:''}</b></p>
      <p><i>03</i><span>${en?'Venue':'Tempat'}</span><b>${esc(o.venue)}</b></p>
     </aside>
     <div class="ed-main">
      <p class="ed-kick ed-ls reveal">${en?'The wedding of':'Majlis perkahwinan'}</p>
      <h1 class="names ed-pn reveal d1"><span class="ed-big">${esc(i1)}</span><span class="ed-n1">${esc(n1)}</span><span class="ed-and">${en?'and':'dan'}</span><span class="ed-n2">${esc(n2)}</span></h1>
      <blockquote class="ed-q reveal d2"><p>${q}</p><cite>${en?'Ar-Rum, 30 : 21':'Surah Ar-Rum, 21'}</cite></blockquote>
     </div></div>
    <footer class="ed-foot reveal d3"><span>${en?'Hosted by':'Anjuran'} ${esc((o.hosts||'').split('&')[0].trim())}</span><b>&#8212; 02 &#8212;</b><span>${ROM(p.y)}</span></footer></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',p=dparts(o),[i1,i2]=K.initials(o);
    return `<div class="cover cv-editorial"><div class="ed-sheet">${crops}<i class="ed-reg t"></i><i class="ed-reg b"></i>
    <header class="ed-mast"><span><em>N&#186;</em> ${String(p.d).padStart(2,'0')}</span><span>${en?'Wedding issue':'Edisi walimah'}</span><span>${ROM(p.m)} &#183; ${ROM(p.y)}</span></header>
    <p class="ed-run">${ev(o,L)} &#183; ${esc(fmtShort(o.date))} &#183; ${esc(o.venue)}</p>
    <div class="ed-plate"><span class="ed-i1">${esc(i1)}</span><span class="ed-amp">&amp;</span><span class="ed-i2">${esc(i2)}</span><i class="ed-base"></i>
     <p class="ed-cap"><b>Fig. 1</b> &#8212; ${esc(n1)} &amp; ${esc(n2)}<sup>1</sup></p></div>
    <div class="ed-col">
     <p class="ed-lede"><span class="ed-cn">${esc(n1)}</span> <i>${en?'and':'dan'}</i> <span class="ed-cn">${esc(n2)}</span></p>
     <dl class="ed-dl"><div><dt>${en?'Date':'Tarikh'}</dt><dd>${esc(fmtDate(o.date,o.lang))}</dd></div><div><dt>${en?'Time':'Masa'}</dt><dd>${esc(fmtTime(o.start,o.lang))}</dd></div><div><dt>${en?'Venue':'Tempat'}</dt><dd>${esc(o.venue)}</dd></div></dl>
     ${guest?`<p class="ed-to"><sup>1</sup> ${en?'Prepared for':'Khas untuk'} <b>${esc(guest)}</b></p>`:''}
    </div>
    <footer class="ed-foot"><span>${en?'Sanding edition':'Edisi Sanding'}</span><b>&#8212; 01 &#8212;</b><${tag} class="ed-open" ${attr}>${en?'Open':'Buka'} <i>&#8594;</i></${tag}></footer>
    </div><i class="ed-wipe"></i></div>`},
  skin(el,o,th){const s=$$('.sheet > .sec',el);s.forEach((x,i)=>{x.classList.add('ed-sec');x.insertAdjacentHTML('afterbegin',`<div class="ed-shd"><b>${String(i+1).padStart(2,'0')}</b><i></i><span>${String(i+1).padStart(2,'0')} / ${String(s.length).padStart(2,'0')}</span></div>`)})},
  themes:[
    {k:'putih',n:'Putih',desc:'Black Didone on bright white, oxblood notes',c:{ground:'#f7f5f0',sheet:'#fbfaf6',ink:'#141414',accent:'#6d1f2a',gold:'#a49a8a',pagefg:'#141414',line:'rgba(20,20,20,.22)'}},
    {k:'gading',n:'Gading',desc:'Espresso ink on ivory, bronze notes',c:{ground:'#f2ebdd',sheet:'#f7f1e5',ink:'#2a2420',accent:'#8a6a3b',gold:'#b5a58a',pagefg:'#2a2420',line:'rgba(42,36,32,.22)'}},
    {k:'hitam',n:'Hitam',desc:'Ivory type on black, gold notes',c:{ground:'#0f0f0f',sheet:'#161615',ink:'#ece6da',accent:'#c7a76a',gold:'#6f675b',pagefg:'#ece6da',line:'rgba(236,230,218,.2)'}},
    {k:'nila',n:'Nila',desc:'Ivory on midnight navy',c:{ground:'#0f192b',sheet:'#132036',ink:'#e9e3d6',accent:'#c9a86a',gold:'#5d6880',pagefg:'#e9e3d6',line:'rgba(233,227,214,.2)'}},
    {k:'zamrud',n:'Zamrud',desc:'Forest green on chalk',c:{ground:'#f1efe8',sheet:'#f7f5ef',ink:'#11261f',accent:'#1f5a45',gold:'#9aa597',pagefg:'#11261f',line:'rgba(17,38,31,.22)'}},
    {k:'jambu',n:'Jambu',desc:'Plum ink on blush paper',c:{ground:'#f3e6e0',sheet:'#f8eee9',ink:'#2a1a1d',accent:'#8c3b4a',gold:'#c4a49f',pagefg:'#2a1a1d',line:'rgba(42,26,29,.22)'}},
    {k:'pasir',n:'Pasir',desc:'Umber on warm sand',c:{ground:'#e7ddcc',sheet:'#eee6d8',ink:'#2b241d',accent:'#7a5134',gold:'#b09c80',pagefg:'#2b241d',line:'rgba(43,36,29,.24)'}},
    {k:'marun',n:'Marun',desc:'Champagne type on deep maroon',c:{ground:'#2a0f14',sheet:'#321419',ink:'#f1e6dc',accent:'#d8b48a',gold:'#7c4c52',pagefg:'#f1e6dc',line:'rgba(241,230,220,.2)'}},
  ]});
