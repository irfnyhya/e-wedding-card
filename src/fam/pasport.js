/* pasport: a leather passport booklet with a gold-foil crest. The cover swings open on its spine to the data page.
   Page: the open booklet held upright, visa page above (entry stamps with the date and venue), data page below
   (the couple as holders, guilloché ground, MRZ lines). Skin: visa pages with rubber-stamp headings. */
let ppN=0;
const PPF=(n,d=1)=>n.toFixed(d);
// guilloché: interlaced sine-modulated rings
function ppRose(cx,cy,R,A,lobes,count,sw,col,op){let out='';
  for(let k=0;k<count;k++){let d='';const ph=k/count*Math.PI*2/lobes;
    for(let i=0;i<=240;i++){const t=i/240*Math.PI*2,r=R+A*Math.sin(lobes*t+ph*lobes);d+=(i?'L':'M')+PPF(cx+Math.cos(t)*r)+' '+PPF(cy+Math.sin(t)*r)}
    out+=`<path d="${d}Z"/>`}
  return `<g fill="none" stroke="${col}" stroke-width="${sw}" stroke-opacity="${op}">${out}</g>`}
// guilloché band tile (repeats horizontally)
function ppWaveTile(col,w=60,h=20,op=.26){let p='';
  for(let k=0;k<10;k++){let d='';for(let i=0;i<=48;i++){const x=i/48*w,y=h/2+(h*.3)*Math.sin(x/w*Math.PI*2+k*.62)+(h*.08)*Math.sin(x/w*Math.PI*6-k*.4);d+=(i?'L':'M')+PPF(x,2)+' '+PPF(y,2)}p+=`<path d="${d}"/>`}
  return svgUriSq(`<svg ${NS} width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><g fill="none" stroke="${col}" stroke-width=".32" stroke-opacity="${op}">${p}</g></svg>`)}
// the crest on the cover: laurel wreath, star rosette, ribbon — black for use as a mask
const PP_CREST=(()=>{const branch=()=>{let out='';for(let i=1;i<=9;i++){const t=i/10.5,q=1-t;const x=q*q*18+2*q*t*7+t*t*38,y=q*q*80+2*q*t*42+t*t*15;
    const ang=Math.atan2(2*q*(42-80)+2*t*(15-42),2*q*(7-18)+2*t*(38-7))*180/Math.PI;const sc=1.15-t*.45;
    out+=`<path d="M0 0c2.6-2.4 7.2-2.6 10.4 0-3.2 2.6-7.8 2.4-10.4 0z" transform="translate(${PPF(x)} ${PPF(y)}) rotate(${PPF(ang-38)}) scale(${PPF(sc,2)})"/><path d="M0 0c2.6-2.4 7.2-2.6 10.4 0-3.2 2.6-7.8 2.4-10.4 0z" transform="translate(${PPF(x)} ${PPF(y)}) rotate(${PPF(ang+38)}) scale(${PPF(sc,2)})"/>`}
    return `<path d="M18 80Q7 42 38 15" fill="none" stroke="#000" stroke-width="1"/>${out}`};
  const star=K.star(12,15,9.5,50,48),ring=K.ring(24,21.5,50,48).map(([x,y])=>`<circle cx="${PPF(x)}" cy="${PPF(y)}" r=".9"/>`).join('');
  return `<svg ${NS} viewBox="0 0 100 100"><g fill="#000">
   ${branch()}<g transform="translate(100 0) scale(-1 1)">${branch()}</g>
   <circle cx="50" cy="48" r="25" fill="none" stroke="#000" stroke-width="1.3"/><circle cx="50" cy="48" r="18" fill="none" stroke="#000" stroke-width=".7"/>${ring}
   <path d="${star}" fill="none" stroke="#000" stroke-width=".9"/><path d="${K.star(12,9,5.6,50,48)}"/>
   <path d="M43.5 43.2a7.4 7.4 0 1 0 9.6 9.6 6 6 0 1 1-9.6-9.6z" fill="none"/>
   <path d="M30 78h40l-3 5 3 5H30l3-5z" fill="none" stroke="#000" stroke-width="1.1"/><path d="M30 78l-8 2 4 4-4 4 8-2M70 78l8 2-4 4 4 4-8-2" fill="none" stroke="#000" stroke-width=".9"/>
   <path d="M50 18l2 4h-4z"/><circle cx="50" cy="14" r="1.6"/></g></svg>`})();
const PP_CHIP=svgUriSq(`<svg ${NS} viewBox="0 0 40 26"><g fill="none" stroke="#000" stroke-width="1.6"><rect x="1" y="1" width="38" height="24" rx="1"/><path d="M1 9h11M28 9h11M1 17h11M28 17h11"/><circle cx="20" cy="13" r="6.5"/></g></svg>`);
const PP_CRESTU=svgUriSq(PP_CREST);
const ppMonth=(o,i)=>(MONTHS[o.lang]||MONTHS.ms)[i].slice(0,3).toUpperCase();
function ppDate(o){const d=new Date((o.date||'2026-01-01')+'T00:00:00');return isNaN(d)?{d:'',m:'',y:'',num:'000000'}:{d:String(d.getDate()).padStart(2,'0'),m:ppMonth(o,d.getMonth()),y:String(d.getFullYear()),num:String(d.getDate()).padStart(2,'0')+String(d.getMonth()+1).padStart(2,'0')+String(d.getFullYear()).slice(2)}}
const ppMrzName=s=>String(s||'').normalize('NFD').replace(/[^A-Za-z ]/g,'').trim().toUpperCase().replace(/\s+/g,'<');
function ppMrz(o){const [n1,n2]=coverNames(o),dt=ppDate(o);
  const pad=s=>(s+'<'.repeat(44)).slice(0,44);
  const l1=pad(`P<WLM${ppMrzName(n1)}<<${ppMrzName(n2)}`);
  const l2=pad(`A${dt.num}<7WLM${dt.num.slice(4)}${dt.num.slice(2,4)}${dt.num.slice(0,2)}1<${ppMrzName(o.venue)}`);
  return [l1,l2].map(s=>esc(s)).join('<br>')}
// rough rubber-stamp ink: speckle + slight edge wobble
const ppInk=id=>`<filter id="${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="${id.length*7}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" result="d"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.2 1.75" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>`;
function ppRound(o,c,id,en){const dt=ppDate(o),top=en?'WALIMATUL URUS · ADMITTED ·':'WALIMATUL URUS · DIBENARKAN MASUK ·';
  return `<svg class="pasport-st round" viewBox="0 0 120 120"><defs>${ppInk(id)}<path id="${id}c" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0"/></defs><g filter="url(#${id})" fill="${c.stamp||c.accent}" stroke="${c.stamp||c.accent}">
   <circle cx="60" cy="60" r="56" fill="none" stroke-width="2.2"/><circle cx="60" cy="60" r="52" fill="none" stroke-width=".8"/><circle cx="60" cy="60" r="36" fill="none" stroke-width="1.2"/>
   <text font-family="IBM Plex Mono,monospace" font-size="8.6" letter-spacing="1.2" stroke="none" font-weight="600"><textPath href="#${id}c">${top}</textPath></text>
   <text x="60" y="52" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="8" stroke="none" font-weight="600">${en?'ENTRY':'MASUK'}</text>
   <text x="60" y="69" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="15" stroke="none" font-weight="700">${dt.d} ${dt.m}</text>
   <text x="60" y="82" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="9" stroke="none" font-weight="600">${dt.y}</text>
   <path d="M38 56h44M38 86h44" stroke-width=".8"/></g></svg>`}
function ppRect(o,c,id,en){const v=esc((o.venue||'').toUpperCase()),t=esc(fmtTime(o.start,o.lang).toUpperCase());
  return `<svg class="pasport-st rect" viewBox="0 0 170 92"><defs>${ppInk(id)}</defs><g filter="url(#${id})" fill="${c.stamp2||c.ink}" stroke="${c.stamp2||c.ink}">
   <path d="M8 2h154l6 6v76l-6 6H8l-6-6V8z" fill="none" stroke-width="2"/><path d="M10 7h150l3 3v72l-3 3H10l-3-3V10z" fill="none" stroke-width=".7"/>
   <text x="85" y="22" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="8.4" letter-spacing="1.6" stroke="none" font-weight="600">${en?'PLACE OF ENTRY':'TEMPAT MASUK'}</text>
   <path d="M18 28h134" stroke-width=".7"/>
   <text x="85" y="49" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="${v.length>18?10:12.5}" stroke="none" font-weight="700" textLength="${Math.min(140,Math.max(60,v.length*8.4))}" lengthAdjust="spacingAndGlyphs">${v}</text>
   <path d="M18 58h134" stroke-width=".7"/>
   <text x="85" y="76" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="9" letter-spacing="1" stroke="none" font-weight="600">${en?'FROM':'DARI'} ${t}</text></g></svg>`}
function ppHex(o,c,id,en){const h=esc((o.hijri||'').toUpperCase());
  return `<svg class="pasport-st hex" viewBox="0 0 100 70"><defs>${ppInk(id)}</defs><g filter="url(#${id})" fill="${c.stamp||c.accent}" stroke="${c.stamp||c.accent}">
   <path d="M20 3h60l17 32-17 32H20L3 35z" fill="none" stroke-width="1.8"/><path d="M23 8h54l14 27-14 27H23L9 35z" fill="none" stroke-width=".6"/>
   <text x="50" y="27" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="7.4" letter-spacing="1" stroke="none" font-weight="600">${en?'VALID FOR':'SAH UNTUK'}</text>
   <text x="50" y="42" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="${h.length>14?7.6:9.4}" stroke="none" font-weight="700">${h||'1 + 1'}</text>
   <text x="50" y="54" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="6.6" letter-spacing="1" stroke="none">${en?'TWO HOLDERS':'DUA PEMEGANG'}</text></g></svg>`}

FAMILY({key:'pasport',name:'Pasport',meaning:'Passport booklet',
  blurb:'A leather passport with a gold-foil crest; the cover swings open on its spine to a data page naming the couple as holders, stamped with the date and venue.',
  fonts:{d:"'Marcellus', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',dt=ppDate(o),u=++ppN,[i1,i2]=K.initials(o);
    const ros=ppRose(60,60,34,6,9,10,.35,c.accent,.55)+ppRose(60,60,22,4,7,8,.3,c.gold,.7);
    const f=(lbm,lbe,val,cls='')=>`<div class="pasport-f ${cls}"><span>${lbm}${en?'':` / <i>${lbe}</i>`}</span><b>${val}</b></div>`;
    return `<section class="page pg-pasport" style="--wave:${ppWaveTile(c.accent)};--wave2:${ppWaveTile(c.gold,50,18,.42)}">
    <p class="kicker reveal">${ev(o,L)}</p>
    <div class="pasport-open reveal d1">
     <div class="pasport-pg visa"><div class="pasport-pghd"><span>VISA</span><span>${en?'Page':'Halaman'} 04</span></div>
      <div class="pasport-stamps">${ppRound(o,c,`ppi${u}a`,en)}${ppRect(o,c,`ppi${u}b`,en)}${o.hijri?ppHex(o,c,`ppi${u}c`,en):''}</div>
      <p class="pasport-perf">A${dt.num}</p></div>
     <div class="pasport-fold"></div>
     <div class="pasport-pg data"><div class="pasport-pghd"><span>${en?'PASSPORT':'PASPORT'}${en?'':' / <i>PASSPORT</i>'}</span><span>${en?'Type':'Jenis'} P · WLM · <b>A ${dt.num}</b></span></div>
      <svg class="pasport-wm" viewBox="0 0 120 120">${ppRose(60,60,40,7,11,14,.3,c.accent,.22)}${ppRose(60,60,25,4,7,10,.3,c.gold,.35)}</svg><div class="pasport-dbody"><div class="pasport-photo"><svg viewBox="0 0 120 120">${ros}</svg><b>${esc(i1)}<i>&amp;</i>${esc(i2)}</b></div>
       <div class="pasport-fields">${f('Nama pemegang','Holders',`<em>${esc(n1)} <i>&amp;</i> ${esc(n2)}</em>`,'nm')}
        ${f('Tarikh','Date',esc(fmtDate(o.date,o.lang,false)))}${f('Masa','Time',esc(fmtTime(o.start,o.lang)))}
        ${f('Tempat','Place',esc(o.venue),'full')}${f('Tandatangan','Signature',`<span class="pasport-sig">${esc(n1)} &amp; ${esc(n2)}</span>`,'full')}</div>
       <div class="pasport-ghost">${esc(i1)}${esc(i2)}</div></div>
      <p class="pasport-mrz">${ppMrz(o)}</p></div>
    </div>
    <p class="pasport-cap reveal d2">${esc(o.address||'')}</p></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',dt=ppDate(o);
    return `<div class="cover cv-pasport" style="--crest:${PP_CRESTU};--chip:${PP_CHIP};--wave:${ppWaveTile(c.accent)}">
    <div class="pasport-desk"></div>
        <div class="pasport-stage">
     <div class="pasport-book">
      <div class="pasport-inside"><div class="pasport-endp"></div><p class="pasport-inhd">${en?'This passport admits':'Pasport ini membenarkan'}</p><p class="pasport-inn">${esc(n1)} &amp; ${esc(n2)}</p></div>
      <div class="pasport-front">
       <span class="pasport-face out"><span class="pasport-grain"></span><span class="pasport-spine"></span><span class="pasport-blind"></span>
        <span class="pasport-emb pasport-names">${esc(n1)}<i>&amp;</i>${esc(n2)}</span>
        <span class="pasport-emb pasport-ev">${en?'Wedding of':'Walimatul Urus'}</span>
        <span class="pasport-emb pasport-crestw"><i class="pasport-crest"></i></span>
        <span class="pasport-emb pasport-word">${en?'Passport':'Pasport'}</span>
        <span class="pasport-emb pasport-sub">${dt.d} · ${dt.m} · ${dt.y}</span>
        <span class="pasport-emb pasport-chipw"><i class="pasport-chip"></i></span></span>
       <span class="pasport-face in"><span class="pasport-endp"></span></span>
      </div><${tag} class="pasport-tap" ${attr} aria-label="${L.open}"></${tag}>
     </div>
    </div>
    <div class="pasport-foot">${guest?`<p class="pasport-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="pasport-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th,L){K.cards(el);const u=++ppN,c=th.c,dt=ppDate(o);
    el.style.setProperty('--wave',ppWaveTile(c.accent,60,20,.14));el.style.setProperty('--stamp',c.stamp||c.accent);el.style.setProperty('--stamp2',c.stamp2||c.ink);
    el.style.setProperty('--rose',svgUriSq(`<svg ${NS} viewBox="0 0 120 120">${ppRose(60,60,40,7,11,12,.3,c.accent,.1)}${ppRose(60,60,24,4,7,8,.3,c.gold,.22)}</svg>`));
    el.insertAdjacentHTML('afterbegin',`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${ppInk('ppk'+u)}</defs></svg>`);
    $$('.sec',el).forEach((s,i)=>{s.classList.add('pasport-sec','pasport-v'+(i%3));const h=$('h2',s);if(!h)return;
      h.innerHTML=`<span class="pasport-hs" style="filter:url(#ppk${u})"><small>${['WLM','VISA','ENTRY'][i%3]} · ${dt.d}.${dt.num.slice(2,4)}.${dt.y.slice(2)}</small>${h.innerHTML}<small>№ ${String(i+1).padStart(2,'0')}</small></span>`;
      s.insertAdjacentHTML('beforeend',`<span class="pasport-pno">${String(i+5).padStart(2,'0')}</span>`)})},
  themes:[
    {k:'merah',n:'Merah Hati',desc:'Burgundy leather, gold crest, blush data page',c:{ground:'#e9e1d3',sheet:'#fbf3ef',ink:'#2e2226',accent:'#6e1a2a',gold:'#c9a253',pagefg:'#3a2a2c',stamp:'#7a1d33',stamp2:'#24406e',line:'rgba(110,26,42,.22)'}},
    {k:'nila',n:'Nila',desc:'Navy leather on a night desk',c:{ground:'#151b2a',sheet:'#f4f5f2',ink:'#1f2433',accent:'#1d2b4f',gold:'#d2ad5f',pagefg:'#ece6d6',stamp:'#8c2032',stamp2:'#1d2b4f',line:'rgba(29,43,79,.22)'}},
    {k:'zamrud',n:'Zamrud',desc:'Green leather, pale mint page',c:{ground:'#dfe3d8',sheet:'#f3f6ef',ink:'#1e2a24',accent:'#1d4a38',gold:'#c8a24e',pagefg:'#22342b',stamp:'#7b2635',stamp2:'#1d4a38',line:'rgba(29,74,56,.22)'}},
    {k:'hitam',n:'Hitam',desc:'Black leather with bright gold',c:{ground:'#3a3530',sheet:'#f6f2e8',ink:'#1b1a18',accent:'#1c1b1d',gold:'#d8b366',pagefg:'#eadfc7',stamp:'#8a2a2a',stamp2:'#2a3e66',line:'rgba(27,26,24,.2)'}},
    {k:'marun',n:'Marun',desc:'Deep maroon on a dark desk',c:{ground:'#2a1216',sheet:'#fbf4ea',ink:'#2d1f1c',accent:'#5a1420',gold:'#d6ae63',pagefg:'#f1e3cf',stamp:'#5a1420',stamp2:'#2f4a5c',line:'rgba(90,20,32,.22)'}},
    {k:'biru',n:'Biru Laut',desc:'Ocean blue cover, sky-tinted page',c:{ground:'#d9e2ea',sheet:'#f2f6f8',ink:'#1b2836',accent:'#21507a',gold:'#c5a35a',pagefg:'#1d3048',stamp:'#a03247',stamp2:'#21507a',line:'rgba(33,80,122,.22)'}},
    {k:'lumut',n:'Lumut',desc:'Moss leather on a walnut desk',c:{ground:'#2b2419',sheet:'#f6f3e6',ink:'#262a1d',accent:'#3d4a26',gold:'#d4b36a',pagefg:'#efe5cc',stamp:'#7e3a22',stamp2:'#3d4a26',line:'rgba(61,74,38,.22)'}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose cover, champagne foil',c:{ground:'#f1e6e2',sheet:'#fdf7f3',ink:'#3a2a2d',accent:'#874452',gold:'#e6c891',pagefg:'#4a3236',stamp:'#9a3a52',stamp2:'#4e5f7a',line:'rgba(154,84,98,.22)'}},
  ]});
