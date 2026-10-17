/* kunci: a vintage brass room key with an engraved fob tag (the room number is the date), in an ornate escutcheon
   on a panelled door. Opening: the key turns a quarter in the lock, then the plate fades.
   Page: the escutcheon above the names. Skin: door-panel cards with key-tag headings. */
let uid=0;
const f=v=>(+v).toFixed(2);
// right half of the Victorian escutcheon as cubic segments [c1,c2,p]; the left half is its mirror
const ESC_R=[[[56,2],[59,8],[57,13]],[[63,12],[67,17],[64,23]],[[71,25],[73,33],[66,39]],[[75,43],[77,53],[71,61]],[[79,67],[80,80],[72,88]],[[73,104],[73,118],[72,132]],[[80,140],[79,154],[70,160]],[[77,168],[75,178],[66,182]],[[72,188],[70,198],[62,201]],[[60,210],[54,216],[50,218]]];
function escPath(s=1,cx=50,cy=110){const T=([x,y])=>`${f(cx+(x-cx)*s)} ${f(cy+(y-cy)*s)}`,M=([x,y])=>[100-x,y];
  let d=`M${T([50,2])}`;ESC_R.forEach(([a,b,p])=>d+=`C${T(a)} ${T(b)} ${T(p)}`);
  const pts=[[50,2],...ESC_R.map(s=>s[2])];for(let i=ESC_R.length-1;i>=0;i--){const [a,b]=ESC_R[i],p=pts[i];d+=`C${T(M(b))} ${T(M(a))} ${T(M(p))}`}return d+'Z'}
const grads=(id,c)=>`<linearGradient id="b${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.b1}"/><stop offset=".3" stop-color="${c.b2}"/><stop offset=".5" stop-color="${c.b1}"/><stop offset=".75" stop-color="${c.b3}"/><stop offset="1" stop-color="${c.b2}"/></linearGradient>
 <linearGradient id="v${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.b3}"/><stop offset=".35" stop-color="${c.b1}"/><stop offset=".6" stop-color="${c.b2}"/><stop offset="1" stop-color="${c.b3}"/></linearGradient>
 <radialGradient id="r${id}" cx="40%" cy="30%" r="80%"><stop offset="0" stop-color="${c.b1}"/><stop offset=".6" stop-color="${c.b2}"/><stop offset="1" stop-color="${c.b3}"/></radialGradient>`;
const curl=(x,y,s,r,col)=>`<path d="M0 0c4-9 16-11 21-4s0 15-8 13-6-9 0-9" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" fill="none" stroke="${col}" stroke-width="${f(.7/s)}" stroke-linecap="round"/>`;
function plate(c,id,hole=true){const e=c.b4,sym=(x,y,s,r)=>curl(x,y,s,r,e)+`<g transform="translate(100 0) scale(-1 1)">${curl(x,y,s,r,e)}</g>`;
  const leaves=[[50,40],[50,184]].map(([x,y])=>`<path d="M${x} ${y-9}c5 4 5 12 0 18-5-6-5-14 0-18z" fill="none" stroke="${e}" stroke-width=".6"/><path d="M${x} ${y-5}v10" stroke="${e}" stroke-width=".4"/>`).join('');
  const screw=(x,y)=>`<circle cx="${x}" cy="${y}" r="3.6" fill="url(#r${id})" stroke="${e}" stroke-width=".5"/><path d="M${x-2.6} ${y+1}l5.2-2" stroke="${e}" stroke-width=".8"/>`;
  return `<svg class="kc-plate" viewBox="0 0 100 220"><defs>${grads(id,c)}<filter id="pf${id}" x="-20%" y="-10%" width="140%" height="125%"><feDropShadow dx="1.2" dy="2.6" stdDeviation="1.8" flood-opacity=".45"/></filter></defs>
   <path d="${escPath()}" fill="url(#b${id})" stroke="${e}" stroke-width=".7" filter="url(#pf${id})"/>
   <path d="${escPath(.93)}" fill="none" stroke="${c.b1}" stroke-width=".6" opacity=".8"/><path d="${escPath(.9)}" fill="none" stroke="${e}" stroke-width=".55"/>
   <path d="${escPath(.83)}" fill="none" stroke="${e}" stroke-width=".4" stroke-dasharray=".1 2.2" stroke-linecap="round"/>
   ${sym(38,64,.9,-60)}${sym(36,92,.8,-20)}${sym(38,150,.8,40)}${sym(40,172,.7,80)}${leaves}
   <path d="M50 54c-6 6-6 14 0 20 6-6 6-14 0-20zM50 166c-6 6-6 14 0 20 6-6 6-14 0-20z" fill="url(#r${id})" stroke="${e}" stroke-width=".5"/>
   ${screw(50,24)}${screw(50,201)}
   ${hole?`<ellipse cx="50" cy="118" rx="13" ry="16" fill="none" stroke="${e}" stroke-width=".6"/><ellipse cx="50" cy="118" rx="10.5" ry="13.5" fill="none" stroke="${c.b1}" stroke-width=".8" opacity=".8"/>
   <path d="M50 108.5a5.6 5.6 0 0 1 3.4 10l2.4 12.5h-11.6l2.4-12.5a5.6 5.6 0 0 1 3.4-10z" fill="${c.hole}" stroke="${c.b1}" stroke-width=".7"/>`:''}</svg>`}
// the key, hanging from the keyhole: shaft, collar, filigree bow, and the loop for the fob ring
function key(c,id){const e=c.b4;let pet='';for(let i=0;i<8;i++)pet+=`<ellipse cx="50" cy="147" rx="5" ry="12" transform="rotate(${i*45} 50 165)" fill="none" stroke="url(#v${id})" stroke-width="3"/>`;
  return `<svg class="kc-key" viewBox="0 0 100 210"><defs>${grads(id,c)}</defs>
   <rect x="46.5" y="0" width="7" height="104" rx="2" fill="url(#v${id})" stroke="${e}" stroke-width=".5"/>
   <path d="M48 6v92" stroke="${c.b1}" stroke-width=".8" opacity=".7"/>
   ${[100,107,114].map((y,i)=>`<rect x="${42-i}" y="${y}" width="${16+i*2}" height="5" rx="2.5" fill="url(#v${id})" stroke="${e}" stroke-width=".5"/>`).join('')}
   <path d="M44 120h12l3 8H41z" fill="url(#v${id})" stroke="${e}" stroke-width=".5"/>
   <circle cx="50" cy="165" r="34" fill="none" stroke="url(#b${id})" stroke-width="6"/><circle cx="50" cy="165" r="37" fill="none" stroke="${e}" stroke-width=".5"/><circle cx="50" cy="165" r="31" fill="none" stroke="${e}" stroke-width=".5"/>
   ${pet}<g fill="none" stroke="${e}" stroke-width=".35">${pet.replace(/stroke="url\(#v\d+\)" stroke-width="3"/g,'')}</g>
   <circle cx="50" cy="165" r="7" fill="url(#r${id})" stroke="${e}" stroke-width=".6"/><circle cx="50" cy="165" r="2.4" fill="${e}"/>
   ${[0,90,180,270].map(a=>`<circle cx="50" cy="128" r="3" transform="rotate(${a} 50 165)" fill="url(#r${id})" stroke="${e}" stroke-width=".5"/>`).join('')}
   <circle cx="50" cy="204" r="5" fill="none" stroke="url(#v${id})" stroke-width="2.6"/></svg>`}
// the fob: an oval brass tag on a split ring, engraved with the date as the room number and the venue
function fob(o,c,id,en){const d=new Date((o.date||'2026-12-19')+'T00:00:00'),e=c.b4,no=isNaN(d)?'':`${d.getDate()}·${String(d.getMonth()+1).padStart(2,'0')}`;
  let rim='';for(let i=0;i<64;i++){const a=i/64*Math.PI*2;rim+=`<circle cx="${f(60+Math.cos(a)*49)}" cy="${f(100+Math.sin(a)*79)}" r=".9"/>`}
  return `<svg class="kc-fob" viewBox="0 0 120 200"><defs>${grads('f'+id,c)}<path id="fa${id}" d="M22 96A38 66 0 0 1 98 96"/><path id="fb${id}" d="M20 110A40 66 0 0 0 100 110"/><filter id="ff${id}" x="-20%" y="-10%" width="140%" height="130%"><feDropShadow dx="1.5" dy="3" stdDeviation="2" flood-opacity=".4"/></filter></defs>
   <ellipse cx="60" cy="100" rx="56" ry="88" fill="url(#bf${id})" stroke="${e}" stroke-width=".8" filter="url(#ff${id})"/>
   <ellipse cx="60" cy="100" rx="52" ry="84" fill="none" stroke="${c.b1}" stroke-width=".7" opacity=".8"/><g fill="${e}" opacity=".75">${rim}</g>
   <ellipse cx="60" cy="100" rx="44" ry="74" fill="none" stroke="${e}" stroke-width=".6"/>
   <circle cx="60" cy="24" r="6.5" fill="${c.ground}" stroke="${e}" stroke-width=".8"/><circle cx="60" cy="24" r="8.5" fill="none" stroke="${c.b1}" stroke-width=".6"/>
   <text font-family="Cinzel, serif" font-size="6.6" letter-spacing="2.2" fill="${e}" text-anchor="middle"><textPath href="#fa${id}" startOffset="50%">${en?'ROOM':'BILIK'}</textPath></text>
   <text x="60" y="108" text-anchor="middle" font-family="'Bodoni Moda', serif" font-weight="600" font-size="30" fill="${e}">${no}</text>
   <text x="60.5" y="108.8" text-anchor="middle" font-family="'Bodoni Moda', serif" font-weight="600" font-size="30" fill="${c.b1}" opacity=".35">${no}</text>
   <path d="M38 118h44" stroke="${e}" stroke-width=".5"/><text x="60" y="130" text-anchor="middle" font-family="Cinzel, serif" font-size="8" letter-spacing="3" fill="${e}">${isNaN(d)?'':d.getFullYear()}</text>
   <text font-family="'Cormorant Garamond', serif" font-style="italic" font-size="8" fill="${e}" text-anchor="middle"><textPath href="#fb${id}" startOffset="50%">${esc(o.venue||'')}</textPath></text></svg>`}
const RING=c=>`<svg class="kc-ring" viewBox="0 0 30 30"><circle cx="15" cy="15" r="11" fill="none" stroke="${c.b2}" stroke-width="2.4"/><circle cx="15" cy="15" r="11" fill="none" stroke="${c.b4}" stroke-width=".4"/><path d="M8 7a11 11 0 0 1 9-3" stroke="${c.b1}" stroke-width="1" fill="none"/></svg>`;
FAMILY({key:'kunci',name:'Kunci',meaning:'Room key',
  blurb:'A vintage brass room key in an ornate escutcheon, its fob engraved with the date; touch it and the key turns.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    return `<section class="page pg-kunci"><div class="kc-door"><i class="kc-pan"></i></div>
     <div class="kc-pplate reveal">${plate(c,'p'+id)}</div>
     <p class="kc-k reveal d1">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="kc-rule reveal d2"><i></i><b></b><i></i></div>
     <p class="kc-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="kc-hj reveal d2">${esc(o.hijri)}</p>`:''}
     <p class="kc-ven reveal d3">${esc(o.venue)} <i>·</i> ${esc(fmtTime(o.start,o.lang))}</p></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    return `<div class="cover cv-kunci"><div class="kc-door"><i class="kc-pan"></i></div>
     <div class="kc-head kc-fade"><p class="kc-k">${ev(o,L)}</p><p class="kc-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div>
     <${tag} class="kc-lock" ${attr} aria-label="${L.open}"><span class="kc-pw">${plate(c,id)}</span>
      <span class="kc-fw">${RING(c)}${fob(o,c,id,en)}</span><span class="kc-kw">${key(c,id)}</span></${tag}>
     <div class="kc-foot kc-fade">${guest?`<p class="kc-to"><span>${L.dear}</span><b>${esc(guest)}</b></p>`:''}<p class="kc-hint">${en?'Touch the key to unlock':'Sentuh kunci untuk membuka'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--hole',th.c.hole);
    $$('.sheet > .sec',el).forEach(s=>{const h=$('h2',s);if(h&&!h.dataset.kc){h.dataset.kc=1;h.innerHTML=`<span class="kc-tag"><i></i><span>${h.innerHTML}</span></span>`}})},
  themes:[
    {k:'hijau',n:'Hijau',desc:'Brass on a forest-green door',c:{ground:'#1f3b30',sheet:'#f8f3e6',ink:'#1f2a24',accent:'#1e4a3a',gold:'#c9a24e',pagefg:'#f1ead6',b1:'#fbe6a2',b2:'#cc9c48',b3:'#87601f',b4:'#4a3410',hole:'#120d06'}},
    {k:'biru',n:'Biru',desc:'Brass on a navy door',c:{ground:'#1c2a46',sheet:'#f6f3ea',ink:'#1d2230',accent:'#22365e',gold:'#cfa755',pagefg:'#eeebe0',b1:'#fbe7a8',b2:'#cf9f4a',b3:'#896120',b4:'#4a3410',hole:'#0d0a06',line:'rgba(34,54,94,.2)'}},
    {k:'marun',n:'Marun',desc:'Antique brass on oxblood',c:{ground:'#4a1a22',sheet:'#fbf3ec',ink:'#2d1b1d',accent:'#6e1f30',gold:'#d2a467',pagefg:'#f6e6dc',b1:'#f6dca6',b2:'#c79650',b3:'#7f5726',b4:'#432a12',hole:'#120806',line:'rgba(110,31,48,.2)'}},
    {k:'hitam',n:'Hitam',desc:'Polished brass on a black door',c:{ground:'#151517',sheet:'#f4efe5',ink:'#19191b',accent:'#3a3024',gold:'#d4ae5c',pagefg:'#efe7d4',b1:'#fdebb0',b2:'#d6a750',b3:'#8e6421',b4:'#4b3410',hole:'#000',line:'rgba(58,48,36,.22)'}},
    {k:'krim',n:'Krim',desc:'Brass on a cream door',c:{ground:'#e9e0cc',sheet:'#fffaf0',ink:'#2c251c',accent:'#6d4a1f',gold:'#a8823c',pagefg:'#2c251c',b1:'#f9e3a0',b2:'#c99a46',b3:'#83601f',b4:'#4a3410',hole:'#1a120a'}},
    {k:'sage',n:'Sage',desc:'Brass on a sage door',c:{ground:'#b9c6b0',sheet:'#fbfaf2',ink:'#24302a',accent:'#3d5a47',gold:'#94783c',pagefg:'#1f2a24',b1:'#f6e2a4',b2:'#c79c4c',b3:'#80601f',b4:'#47340f',hole:'#140f08',line:'rgba(61,90,71,.22)'}},
    {k:'jambu',n:'Jambu',desc:'Rose brass on a blush door',c:{ground:'#e6c9c3',sheet:'#fffaf6',ink:'#38242a',accent:'#84394c',gold:'#a97a5e',pagefg:'#38242a',b1:'#fbe1cf',b2:'#d09b7c',b3:'#87553d',b4:'#4a2a1c',hole:'#1a0d0a',line:'rgba(132,57,76,.2)'}},
    {k:'kelabu',n:'Kelabu',desc:'Nickel on a slate-grey door',c:{ground:'#4b5258',sheet:'#f6f6f4',ink:'#22262b',accent:'#38424e',gold:'#c3c7cd',pagefg:'#eef0f2',b1:'#ffffff',b2:'#c2c6cc',b3:'#7a7f87',b4:'#3a3e44',hole:'#0b0c0e',line:'rgba(56,66,78,.2)'}},
  ]});
