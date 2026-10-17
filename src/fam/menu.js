/* menu: a fine-dining menu in a leather folder with engraved gold corners, laid between a fork and a knife.
   Opening: the folder's cover lifts up on its top hinge to show the menu card. Page: the menu card, the
   programme listed as courses. Skin: course headings and dotted-leader menu lines. */
let mnN=0;
const MF=(n,d=1)=>n.toFixed(d);
// an engraved gold corner protector (top-left; others are rotated copies)
function mnCorner(c,u){return `<svg class="menu-cn" viewBox="0 0 60 60" aria-hidden="true"><defs><linearGradient id="mng${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.gold}"/><stop offset=".35" stop-color="#fff6d8"/><stop offset=".55" stop-color="${c.gold}"/><stop offset="1" stop-color="#6a5124"/></linearGradient></defs>
  <path d="M0 0H60L56 4C40 6 30 10 22 18S6 40 4 56L0 60Z" fill="url(#mng${u})"/>
  <path d="M5 5H48C35 8 27 12 20 19S8 35 5 48Z" fill="none" stroke="#5a4320" stroke-opacity=".55" stroke-width=".6"/>
  <path d="M9 9c8 0 13 2 15 6s-2 7-5 5 0-5 3-4M9 9c0 8 2 13 6 15s7-2 5-5-5 0-4 3" fill="none" stroke="#5a4320" stroke-opacity=".7" stroke-width=".7"/>
  <circle cx="9" cy="9" r="2" fill="#5a4320" fill-opacity=".5"/><path d="M28 6c4 2 6 1 9-1M6 28c2 4 1 6-1 9" stroke="#5a4320" stroke-opacity=".55" stroke-width=".6" fill="none"/></svg>`}
// cartouche linework around the title block
const MN_CART=svgUriSq(`<svg ${NS} viewBox="0 0 200 260" preserveAspectRatio="none"><g fill="none" stroke="#000" stroke-width="1.2" vector-effect="non-scaling-stroke"><path d="M18 2H182A16 16 0 0 0 198 18V242A16 16 0 0 0 182 258H18A16 16 0 0 0 2 242V18A16 16 0 0 0 18 2Z"/></g></svg>`);
function mnFork(u){return `<svg class="menu-fork" viewBox="0 0 30 300" aria-hidden="true"><defs><linearGradient id="mnf${u}" x1="0" x2="1"><stop offset="0" stop-color="#8d8a86"/><stop offset=".4" stop-color="#f4f2ee"/><stop offset=".6" stop-color="#c9c6c0"/><stop offset="1" stop-color="#77746f"/></linearGradient></defs>
  <path d="M7 4v44c0 9 4 14 6 18l-1 20c-1 40-3 120-3 170 0 20 3 34 6 34s6-14 6-34c0-50-2-130-3-170l-1-20c2-4 6-9 6-18V4h-1.6v40h-2V4h-1.6v40h-2V4h-1.6v40h-2V4h-1.6v40h-2V4z" fill="url(#mnf${u})" stroke="#5f5c58" stroke-width=".4"/>
  <path d="M15 120c-1 40-2 90-2 130" stroke="#fff" stroke-opacity=".7" stroke-width=".8" fill="none"/><path d="M11 262c2 6 6 6 8 0" stroke="#5f5c58" stroke-width=".4" fill="none"/></svg>`}
function mnKnife(u){return `<svg class="menu-knife" viewBox="0 0 30 300" aria-hidden="true"><defs><linearGradient id="mnk${u}" x1="0" x2="1"><stop offset="0" stop-color="#8d8a86"/><stop offset=".45" stop-color="#f4f2ee"/><stop offset=".62" stop-color="#c9c6c0"/><stop offset="1" stop-color="#77746f"/></linearGradient></defs>
  <path d="M13 4c6 6 9 30 9 70 0 12-2 22-3 30l-1 6c0 46-1 110-1 150 0 20-1 34-3 34s-4-14-4-34c0-40 1-104 1-150l-1-50C10 40 10 10 13 4z" fill="url(#mnk${u})" stroke="#5f5c58" stroke-width=".4"/>
  <path d="M12 110h7" stroke="#5f5c58" stroke-width=".5"/><path d="M14 126c0 40 0 90-1 128" stroke="#fff" stroke-opacity=".7" stroke-width=".8" fill="none"/></svg>`}
const MN_COURSE={ms:['Pembuka Selera','Hidangan Utama','Santapan Beradab','Pencuci Mulut','Minuman Penutup','Manisan'],en:['Amuse-bouche','First Course','Main Course','Dessert','Petit Fours','Digestif']};
function mnCard(o,th,L,compact){const [n1,n2]=coverNames(o),en=o.lang==='en',sc=(o.schedule||[]).filter(s=>s.label),C=MN_COURSE[en?'en':'ms'];
  const items=sc.length?sc.slice(0,compact?3:5).map((s,i)=>[C[i]||'',s.label,fmtTime(s.time,o.lang)])
    :[[C[0],ev(o,L),fmtTime(o.start,o.lang)],[C[1],o.venue,fmtTime(o.end,o.lang)]];
  return `<div class="menu-card">${['tl','tr','bl','br'].map(k=>`<span class="menu-pc ${k}"></span>`).join('')}
   <p class="menu-k">${ev(o,L)}</p><p class="menu-ttl">Menu</p><p class="menu-nm">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p>
   <p class="menu-dt">${esc(fmtDate(o.date,o.lang))}</p><i class="menu-orn"></i>
   <ol class="menu-list">${items.map(([cr,lab,t])=>`<li><small>${esc(cr)}</small><b>${esc(lab)}</b><em>${esc(t)}</em></li>`).join('')}</ol>
   <i class="menu-orn b"></i><p class="menu-at">${en?'Served at':'Disajikan di'} <b>${esc(o.venue)}</b></p></div>`}

FAMILY({key:'menu',name:'Menu',meaning:'Fine-dining menu',
  blurb:'A leather menu folder with engraved gold corners between a silver fork and knife; the cover lifts to a menu card listing the day as courses.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){return `<section class="page pg-menu" style="--hl:${th.c.hl||th.c.accent}"><div class="menu-cloth"></div><div class="menu-pgwrap reveal">${mnCard(o,th,L,false)}</div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u=++mnN,[i1,i2]=K.initials(o);
    const corners=['tl','tr','bl','br'].map(k=>`<span class="menu-cw ${k}">${mnCorner(c,u)}</span>`).join('');
    return `<div class="cover cv-menu" style="--cart:${MN_CART};--hl:${c.hl||c.accent}"><div class="menu-cloth"></div>
    ${mnFork(u)}${mnKnife(u)}
    <div class="menu-stage">
     <div class="menu-in"><div class="menu-inner">${mnCard(o,th,L,true)}</div></div>
     <div class="menu-cov"><div class="menu-face front"><i class="menu-stitch"></i><i class="menu-blind"></i>${corners}
        <span class="menu-cart"></span>
        <span class="menu-mono"><b>${esc(i1)}</b><i>&amp;</i><b>${esc(i2)}</b></span>
        <span class="menu-fk">${ev(o,L)}</span><span class="menu-fm">Menu</span>
        <span class="menu-fn">${esc(n1)} &amp; ${esc(n2)}</span><span class="menu-fd">${esc(fmtShort(o.date))}</span></div>
      <div class="menu-face back"><i class="menu-stitch"></i></div></div>
     <i class="menu-rib"></i>
     <${tag} class="menu-tap" ${attr} aria-label="${L.open}"></${tag}>
    </div>
    <div class="menu-foot">${guest?`<p class="menu-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="menu-hint">${en?'Touch the menu to open':'Sentuh menu untuk membuka'}</p></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--hl',th.c.hl||th.c.accent);
    $$('.sec',el).forEach(s=>{s.classList.add('menu-sec');s.insertAdjacentHTML('afterbegin','<span class="menu-pc tl"></span><span class="menu-pc tr"></span><span class="menu-pc bl"></span><span class="menu-pc br"></span>');
      const h=$('h2',s);if(h)h.innerHTML=`<span>${h.innerHTML}</span>`})},
  themes:[
    {k:'hitam',n:'Hitam',desc:'Black leather, gold corners, dark linen',c:{ground:'#1d1b1a',sheet:'#f7f1e4',ink:'#2a2420',accent:'#24201e',gold:'#cfa961',pagefg:'#efe5d0'}},
    {k:'marun',n:'Marun',desc:'Oxblood leather on a maroon cloth',c:{ground:'#3a1a1c',sheet:'#faf3e6',ink:'#2d1f1c',accent:'#5c1820',gold:'#d7b06a',pagefg:'#f3e4d0'}},
    {k:'coklat',n:'Coklat',desc:'Tan leather on white linen',c:{ground:'#e8e1d5',sheet:'#fbf6ec',ink:'#33261c',accent:'#6a4429',gold:'#c4a060',pagefg:'#3a2a1e'}},
    {k:'hijau',n:'Hijau',desc:'Bottle-green leather, pale linen',c:{ground:'#e3e5dc',sheet:'#fbf8ef',ink:'#1f2a24',accent:'#1f3b2e',gold:'#c9a45a',pagefg:'#22322a'}},
    {k:'nila',n:'Nila',desc:'Navy leather on a midnight cloth',c:{ground:'#151c2c',sheet:'#f8f4ea',ink:'#1e2433',accent:'#1c2846',gold:'#d2b06c',pagefg:'#ece6d6'}},
    {k:'krim',n:'Krim',desc:'Ivory leather, antique gold',c:{ground:'#2d2622',sheet:'#fffaf0',ink:'#2e2620',accent:'#d3c09f',gold:'#9c7634',pagefg:'#efe5d0',hl:'#7a5a2a'}},
    {k:'merah',n:'Merah',desc:'Red leather on ivory linen',c:{ground:'#efe7dd',sheet:'#fffaf2',ink:'#2d1e1c',accent:'#7a1f24',gold:'#c9a55e',pagefg:'#3a2422'}},
    {k:'kelabu',n:'Kelabu',desc:'Taupe leather, champagne gold',c:{ground:'#dcd7cf',sheet:'#fbf9f5',ink:'#2c2826',accent:'#5e5650',gold:'#c8ad80',pagefg:'#2c2826'}},
  ]});
