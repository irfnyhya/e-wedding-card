/* riso (redesign): a true two-ink risograph print. A pair of bullfinches on a blossoming branch (Kubo Shunman, c. 1815,
   public domain) separated into two inks: the warm ink takes the birds' breasts and the buds, the key ink takes the line.
   Each ink is stochastic grain, slightly out of register, overprinting where they meet, on toothy paper.
   Cover: the poster pinned flat; tap "Buka Jemputan" and it is lifted away. Page: the same print with the details set in mono.
   Skin: riso cards: paper grain, serif headings with a misregistered second ink, key-ink hairlines. */
needFont('Instrument+Serif:ital@0;1');
let rsN=0;
// the art crop: the two birds, the branch and the blossoms, without the poem
const RS_VB='0 470 690 628';
// one ink: alpha is pulled from the picture by a colour matrix, then dithered against fine noise like a riso drum
const rsInk=(id,m,seed,col,blur=0)=>`<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${m}" result="a"/>
  <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="${seed}" result="t"/>
  <feColorMatrix in="t" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="n"/>
  <feComposite in="a" in2="n" operator="arithmetic" k1="0" k2="3.4" k3="-3.4" k4=".62" result="d"/>
  ${blur?`<feGaussianBlur in="d" stdDeviation="${blur}" result="d"/>`:''}
  <feFlood flood-color="${col}"/><feComposite in2="d" operator="in"/></filter>`;
function rsArt(c,cls=''){const u=++rsN,A=c.accent,B=c.gold;
  // warm ink: (R - B) of the print; key ink: darkness of the print
  const warm='4.6 0 -4.6 0 -.62',key='-1.05 -1.05 -1.05 0 1.98';
  return `<svg class="rs2-art ${cls}" viewBox="${RS_VB}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
    ${rsInk('rsa'+u,warm,11+u,A)}${rsInk('rsb'+u,key,29+u,B)}
    <filter id="rsf${u}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="1" seed="${5+u}" result="t"/>
      <feColorMatrix in="t" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="n"/>
      <feComposite in="SourceAlpha" in2="n" operator="arithmetic" k1="0" k2="1" k3="-3.4" k4=".78" result="d"/><feFlood flood-color="${A}"/><feComposite in2="d" operator="in"/></filter></defs>
    <g class="rs2-ink a"><circle cx="455" cy="700" r="196" fill="#000" filter="url(#rsf${u})"/>
      <image href="${A_}pd-asia-3.jpg" width="1000" height="1098" filter="url(#rsa${u})"/></g>
    <g class="rs2-ink b"><image href="${A_}pd-asia-3.jpg" width="1000" height="1098" filter="url(#rsb${u})"/></g></svg>`}
const A_=A;
const rsDate=o=>{const d=new Date((o.date||'2026-01-01')+'T00:00:00');return [String(d.getDate()).padStart(2,'0'),String(d.getMonth()+1).padStart(2,'0'),String(d.getFullYear())]};
FAMILY({key:'riso',name:'Risograf',meaning:'Two-ink riso print',
  blurb:'A two-ink risograph print of two bullfinches on a blossoming branch, grainy and a touch out of register, with the names set large in a fine serif.',
  fonts:{d:"'Instrument Serif', serif",s:"'Instrument Serif', serif",b:"'IBM Plex Mono', monospace"},ms:1300,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',[d,m,y]=rsDate(o);
    const rows=[[en?'Date':'Tarikh',fmtDate(o.date,o.lang)],[en?'Time':'Masa',[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ')],[en?'Venue':'Tempat',o.venue]].filter(r=>r[1]);
    return `<section class="page pg-riso2${th.c.blend==='screen'?' rs2-dark':''}"><div class="rs2-poster reveal">
      <div class="rs2-head"><span>${en?'Invitation':'Kad Jemputan'}</span><span>No. ${d}${m}</span><span>${y}</span></div>
      ${rsArt(th.c,'pg')}
      <div class="rs2-body"><p class="rs2-k kicker">${ev(o,L)}</p><h1 class="rs2-names">${esc(n1)}<span><i>&amp;</i> ${esc(n2)}</span></h1>
      <dl class="rs2-rows">${rows.map(([k,v])=>`<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>${o.hijri?`<p class="rs2-hj">${esc(o.hijri)}</p>`:''}</div>
      <i class="rs2-grain"></i></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',[d,m,y]=rsDate(o);
    return `<div class="cover cv-riso2${th.c.blend==='screen'?' rs2-dark':''}"><div class="rs2-wall"></div>
      <div class="rs2-poster">
        <div class="rs2-head"><span>${en?'Invitation':'Kad Jemputan'}</span><span>No. ${d}${m}</span><span>${y}</span></div>
        ${rsArt(th.c,'cv')}
        <div class="rs2-body"><p class="rs2-k">${ev(o,L)}</p><p class="rs2-names">${esc(n1)}<span><i>&amp;</i> ${esc(n2)}</span></p>
        <p class="rs2-date">${d} · ${m} · ${y}</p>${guest?`<p class="rs2-to"><small>${L.dear}</small> ${esc(guest)}</p>`:''}</div>
        <i class="rs2-grain"></i></div>
      <div class="rs2-foot"><${tag} class="rs2-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('rs2-dark',th.c.blend==='screen')},
  themes:[
    {k:'jambu',n:'Jambu Biru',desc:'Fluorescent pink and blue on cream',c:{ground:'#3a3a40',sheet:'#f4efe4',ink:'#0b4f8a',accent:'#ff48b0',gold:'#0078bf',pagefg:'#f4efe4'}},
    {k:'merah',n:'Merah Teal',desc:'Bright red and teal on chalk',c:{ground:'#d4cfc3',sheet:'#f2ede2',ink:'#005f66',accent:'#ff665e',gold:'#00838a',pagefg:'#23302f'}},
    {k:'kuning',n:'Kuning',desc:'Yellow and medium blue',c:{ground:'#24304f',sheet:'#f7f2e6',ink:'#25418a',accent:'#ffc400',gold:'#3255a4',pagefg:'#f7f2e6'}},
    {k:'oren',n:'Oren Hijau',desc:'Fluorescent orange and green',c:{ground:'#e2ddd0',sheet:'#f4efe4',ink:'#00703c',accent:'#ff6c2f',gold:'#00a95c',pagefg:'#22301f'}},
    {k:'ungu',n:'Ungu',desc:'Purple and fluorescent pink on lilac',c:{ground:'#2c2438',sheet:'#efe9ef',ink:'#4f3a85',accent:'#ff48b0',gold:'#765ba7',pagefg:'#efe9ef'}},
    {k:'emas',n:'Emas Marun',desc:'Burgundy and sunflower on cream',c:{ground:'#e9dfcc',sheet:'#f6eddc',ink:'#7a3b5e',accent:'#ffb511',gold:'#914e72',pagefg:'#3b2230'}},
    {k:'hitam',n:'Hitam',desc:'Pink and yellow on black stock',c:{ground:'#0e0e10',sheet:'#1d1d21',ink:'#ffe800',accent:'#ff48b0',gold:'#ffe800',blend:'screen',pagefg:'#f2efe8'}},
    {k:'laut',n:'Laut',desc:'Coral and mint on navy stock',c:{ground:'#0f1428',sheet:'#1d2340',ink:'#9be3df',accent:'#ff7477',gold:'#82d8d5',blend:'screen',pagefg:'#eef2f6'}},
  ]});
