/* retro: a 1970s screen-printed card. Stacked wavy names, a rainbow arch of brown, orange and mustard bands, a sunburst.
   Cover: the arch rises from the foot of the card; tap the sun sticker and the bands slide out sideways, inner first.
   Page: the stacked arch with the sun on its sill. Skin: rounded cards under striped bands. */
needFont('Shrikhand');
needFont('Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..800');
const FR="'Fraunces', serif",SHR="'Shrikhand', cursive";
let uid=0;
const fit=(s,max,fs,k=.64)=>Math.min(fs,max/Math.max(1,(s||'').length*k));
// half of a rainbow arch: bands between offsets o[i] and o[i+1] from the outer edge; W = half width, cy = centre of the arch circle, B = bottom
function halfArch(cols,o,W,cy,B,side,cls=''){return cols.map((col,i)=>{const a=o[i],b=o[i+1],R=W-a,r=W-b;
  const d=side==='l'?`M${a} ${B}V${cy}A${R} ${R} 0 0 1 ${W} ${cy-R}V${cy-r}A${r} ${r} 0 0 0 ${b} ${cy}V${B}Z`:`M${W-a} ${B}V${cy}A${R} ${R} 0 0 0 0 ${cy-R}V${cy-r}A${r} ${r} 0 0 1 ${W-b} ${cy}V${B}Z`;
  const mid=(a+b)/2,Rm=W-mid,dm=side==='l'?`M${mid} ${B}V${cy}A${Rm} ${Rm} 0 0 1 ${W} ${cy-Rm}`:`M${W-mid} ${B}V${cy}A${Rm} ${Rm} 0 0 0 0 ${cy-Rm}`;
  return `<g class="rt-band ${cls}" style="--i:${i}"><path d="${d}" fill="${col}"/><path d="${dm}" fill="none" stroke="#fff" stroke-opacity=".16" stroke-width=".8" stroke-dasharray="1 5" stroke-linecap="round"/>
   <path d="${side==='l'?`M${b} ${B}V${cy}A${r} ${r} 0 0 1 ${W} ${cy-r}`:`M${W-b} ${B}V${cy}A${r} ${r} 0 0 0 0 ${cy-r}`}" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="1.6"/></g>`}).join('')}
// full arch for the page
function arch(cols,o,W,cy,B){return `<g>${halfArch(cols,o,W,cy,B,'l')}</g><g transform="translate(${W} 0)">${halfArch(cols,o,W,cy,B,'r')}</g>`}
// wavy stacked type: three layers (shadow block, cream keyline, colour face)
function wavy(txt,y,fs,amp,c,id,face){const p=`M10 ${y}C90 ${y-amp} 130 ${y+amp} 200 ${y}S310 ${y-amp} 390 ${y}`;const t=`<textPath href="#${id}" startOffset="50%" text-anchor="middle">${txt}</textPath>`;
  return `<path id="${id}" d="${p}" fill="none"/><text class="rt-w" font-size="${fs.toFixed(1)}" transform="translate(4 5)" fill="${c.s1}" stroke="${c.s1}" stroke-width="7" stroke-linejoin="round">${t}</text>
  <text class="rt-w" font-size="${fs.toFixed(1)}" fill="${face}" stroke="${c.sheet}" stroke-width="6" stroke-linejoin="round" paint-order="stroke">${t}</text>
  <text class="rt-w" font-size="${fs.toFixed(1)}" fill="${face}">${t}</text>`}
const spark=(x,y,s,col)=>`<path d="M${x} ${y-s}C${x+s*.12} ${y-s*.12} ${x+s*.12} ${y-s*.12} ${x+s} ${y}C${x+s*.12} ${y+s*.12} ${x+s*.12} ${y+s*.12} ${x} ${y+s}C${x-s*.12} ${y+s*.12} ${x-s*.12} ${y+s*.12} ${x-s} ${y}C${x-s*.12} ${y-s*.12} ${x-s*.12} ${y-s*.12} ${x} ${y-s}Z" fill="${col}"/>`;
function nameBlock(o,L,c,top){const [n1,n2]=coverNames(o),u=++uid;const f1=fit(n1,330,60),f2=fit(n2,330,60);
  return `<svg class="rt-names" viewBox="0 0 400 ${top?250:236}" aria-hidden="true"><path id="rk${u}" d="M70 64Q200 14 330 64" fill="none"/>
   <text class="rt-k" fill="${c.ink}" font-size="13"><textPath href="#rk${u}" startOffset="50%" text-anchor="middle">${ev(o,L)}</textPath></text>
   ${spark(46,54,9,c.s4)}${spark(354,54,9,c.s4)}${spark(30,82,4.5,c.s2)}${spark(370,82,4.5,c.s2)}
   ${wavy(esc(n1),112,f1,11,c,'ra'+u,c.s2)}
   <text x="200" y="${150}" text-anchor="middle" class="rt-amp" fill="${c.s1}" font-size="26">&amp;</text>
   ${wavy(esc(n2),196,f2,11,c,'rb'+u,c.s3)}
   ${spark(364,166,6,c.s4)}${spark(38,210,6,c.s4)}</svg>`}
function sun(c,cls,inner){const rays=Array.from({length:24},(_,i)=>`<path d="M100 100L${(100+Math.cos(i/24*Math.PI*2)*100).toFixed(1)} ${(100+Math.sin(i/24*Math.PI*2)*100).toFixed(1)}" />`).join('');
  return `<svg class="${cls}" viewBox="0 0 200 200"><path d="${K.scallop(22,64,7,100,100)}" fill="${c.s4}"/><circle cx="100" cy="100" r="58" fill="${c.sheet}"/><circle cx="100" cy="100" r="53" fill="none" stroke="${c.s2}" stroke-width="1.4"/><circle cx="100" cy="100" r="49" fill="none" stroke="${c.s1}" stroke-width=".8" stroke-dasharray="1 3.2" stroke-linecap="round"/>${inner||''}</svg>`}
FAMILY({key:'retro',name:'Retro 70-an',meaning:'Seventies rainbow print',
  blurb:'A 1970s screen print: stacked wavy names over a rainbow arch of brown, orange and mustard with a sunburst; the bands slide out sideways to open.',
  fonts:{d:FR,s:SHR,b:FR},ms:1350,
  page(o,th,L){const c=th.c,u=++uid,en=o.lang==='en',cols=[c.s1,c.s2,c.s3,c.s4],o4=[8,30,52,74,96];
    return `<section class="page pg-retro" style="--s1:${c.s1};--s2:${c.s2};--s3:${c.s3};--s4:${c.s4}"><i class="rt-grain"></i><i class="rt-frame"></i>
    <div class="rt-pn reveal">${nameBlock(o,L,c,true)}</div>
    <p class="rt-pill reveal d1"><span>${esc(fmtDate(o.date,o.lang))}</span></p>
    <p class="rt-host reveal d2">${esc(o.hijri||'')}</p><p class="rt-host2 reveal d2">${en?'Hosted by':'Anjuran'} <b>${esc(o.hosts||'')}</b></p>
    <div class="rt-parch reveal d2"><i class="rt-burst"></i><svg viewBox="0 0 400 360" preserveAspectRatio="xMidYMax meet">${arch(cols,o4,200,226,360)}</svg>
     <div class="rt-sill">${sun(c,'rt-psun')}<span class="rt-t"><small>${en?'from':'mula'}</small><b>${esc(fmtTime(o.start,o.lang))}</b></span></div>
     <p class="rt-ven">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en',cols=[c.s1,c.s2,c.s3,c.s4],o4=[12,33,54,75,96];
    const d=new Date((o.date||'2026-01-01')+'T00:00:00'),dd=String(d.getDate()).padStart(2,'0'),mm=String(d.getMonth()+1).padStart(2,'0'),yy=String(d.getFullYear()).slice(2);
    const u=++uid;
    return `<div class="cover cv-retro" style="--s1:${c.s1};--s2:${c.s2};--s3:${c.s3};--s4:${c.s4}"><div class="rt-bg"></div><i class="rt-grain"></i><i class="rt-frame"></i>
    <div class="rt-top">${nameBlock(o,L,c)}${guest?`<p class="rt-to"><span>${L.dear}</span><b>${esc(guest)}</b></p>`:''}</div>
    <div class="rt-arch"><i class="rt-burst"></i>
     <svg class="rt-half l" viewBox="0 0 200 520" preserveAspectRatio="xMaxYMax meet">${halfArch(cols,o4,200,312,520,'l')}</svg>
     <svg class="rt-half r" viewBox="0 0 200 520" preserveAspectRatio="xMinYMax meet">${halfArch(cols,o4,200,312,520,'r')}</svg>
     <${tag} class="rt-sun" ${attr} aria-label="${L.open}">${sun(c,'rt-sunsvg',`<path id="rs${u}" d="M58 104A42 42 0 0 1 142 104" fill="none"/><text class="rt-k" font-size="11" fill="${c.ink}"><textPath href="#rs${u}" startOffset="50%" text-anchor="middle">${esc(fmtDate(o.date,o.lang).split(',')[0])}</textPath></text>
       <text x="100" y="122" text-anchor="middle" class="rt-d" fill="${c.s2}" font-size="30">${dd}.${mm}</text><text x="100" y="138" text-anchor="middle" class="rt-k" fill="${c.ink}" font-size="9">&#8217;${yy} &#183; ${en?'open':'buka'}</text>`)}</${tag}>
     <p class="rt-ven">${esc(o.venue)}</p></div>
    <p class="rt-hint">${en?'Tap the sun to open':'Sentuh matahari untuk membuka'}</p></div>`},
  skin(el,o,th){K.cards(el);const c=th.c;['s1','s2','s3','s4'].forEach(k=>el.style.setProperty('--'+k,c[k]));
    $$('.sheet > .sec',el).forEach((s,i)=>{s.insertAdjacentHTML('afterbegin',`<i class="rt-bands ${i%2?'r':''}"><i></i><i></i><i></i><i></i></i>`);const h=$('h2',s);if(h)h.insertAdjacentHTML('afterend','<i class="rt-hsun"></i>')})},
  themes:[
    {k:'klasik',n:'Klasik',desc:'Brown, orange and mustard on cream',c:{ground:'#f1e1c0',sheet:'#f7ead0',ink:'#4a2814',accent:'#c2551f',gold:'#e8a92f',s1:'#6b3418',s2:'#c2551f',s3:'#e48a2a',s4:'#e8b23a',pagefg:'#4a2814',line:'rgba(74,40,20,.28)'}},
    {k:'coklat',n:'Coklat',desc:'Warm bands on chocolate brown',c:{ground:'#3a2116',sheet:'#f4e4c4',ink:'#3a2116',accent:'#c2551f',gold:'#e8b23a',s1:'#7a3418',s2:'#cf5a22',s3:'#ec8f2c',s4:'#efbd45',pagefg:'#f4e4c4',line:'rgba(58,33,22,.28)'}},
    {k:'alpukat',n:'Alpukat',desc:'Avocado, harvest gold and rust',c:{ground:'#ebe0bf',sheet:'#f5ecd2',ink:'#3a3317',accent:'#7d8429',gold:'#d9a62e',s1:'#4b5320',s2:'#828a2c',s3:'#d9a62e',s4:'#c9692b',pagefg:'#3a3317',line:'rgba(58,51,23,.28)'}},
    {k:'jambu',n:'Jambu',desc:'Burgundy, rose and salmon',c:{ground:'#f6dccd',sheet:'#fbeadf',ink:'#4a1a24',accent:'#b83f55',gold:'#ee8a7f',s1:'#6e1f2e',s2:'#b83f55',s3:'#e9776f',s4:'#f2ae8f',pagefg:'#4a1a24',line:'rgba(74,26,36,.26)'}},
    {k:'laut',n:'Laut',desc:'Teal and mustard with a coral sun',c:{ground:'#e6e0c8',sheet:'#f4eed9',ink:'#1d3338',accent:'#2b7f80',gold:'#e8b23a',s1:'#1f4e57',s2:'#2b8584',s3:'#e8b23a',s4:'#e4703a',pagefg:'#1d3338',line:'rgba(29,51,56,.26)'}},
    {k:'senja',n:'Senja',desc:'Sunset bands on dusky plum',c:{ground:'#2b1d33',sheet:'#f5e6cb',ink:'#2f1f35',accent:'#d9534f',gold:'#f6c453',s1:'#8e3b6e',s2:'#d9534f',s3:'#f08a4b',s4:'#f6c453',pagefg:'#f5e6cb',line:'rgba(47,31,53,.26)'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric yellow with brown and orange',c:{ground:'#f0bf48',sheet:'#fcefd2',ink:'#4a2614',accent:'#b8481f',gold:'#f7d68a',s1:'#5a2e1a',s2:'#b8481f',s3:'#ef7f2d',s4:'#f7d68a',pagefg:'#3d1f10',line:'rgba(74,38,20,.28)'}},
    {k:'lumut',n:'Lumut',desc:'Gold and rust on forest green',c:{ground:'#25321f',sheet:'#f3e4c4',ink:'#25321f',accent:'#c0562a',gold:'#e9b949',s1:'#5d6e2f',s2:'#a8421f',s3:'#d9772e',s4:'#e9b949',pagefg:'#f3e4c4',line:'rgba(37,50,31,.26)'}},
  ]});
