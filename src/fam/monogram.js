/* monogram: a heraldic crest on thick cotton paper. The couple's initials interlace inside a foil ring,
   under a pearled coronet, framed by a blind-embossed laurel wreath tied with a ribbon scroll.
   Cover: touching the crest presses the emboss deeper, then the card lifts away.
   Page: deep-impression letterpress capitals on the same plate-marked cotton card.
   Skin: plate-marked cotton cards with blind-embossed heading badges between foil laurel sprigs. */
const f1=v=>(+v).toFixed(1);
const LEAF='M0 0C4.4-4.6 4.6-12 0-19C-4.6-12-4.4-4.6 0 0Z';
const CX=120,CY=138,RW=80;
// one laurel branch, bottom to top round the left side of the ring
function branch(){const P=(r,d)=>{const a=d*Math.PI/180;return [CX+Math.cos(a)*r,CY+Math.sin(a)*r]};
  const t0=104,t1=246,N=13;let leaves='',berries='';
  for(let k=0;k<N;k++){const t=t0+k*(t1-t0)/(N-1),[x,y]=P(RW,t),phi=t+90,s=1.05-.42*k/(N-1);
    leaves+=`<path d="${LEAF}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(phi-42+90)}) scale(${f1(s)})"/>`;
    leaves+=`<path d="${LEAF}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(phi+40+90)}) scale(${f1(s*.92)})"/>`;
    if(k%3===1){const [bx,by]=P(RW+9*s,t+4);berries+=`<circle cx="${f1(bx)}" cy="${f1(by)}" r="${f1(2.3*s)}"/>`}}
  const [ex,ey]=P(RW,t1+2),[sx,sy]=P(RW,t0);
  leaves+=`<path d="${LEAF}" transform="translate(${f1(ex)} ${f1(ey)}) rotate(${t1+2+90+90}) scale(.62)"/>`;
  const stem=`<path d="M${f1(sx)} ${f1(sy)}A${RW} ${RW} 0 0 1 ${f1(ex)} ${f1(ey)}" fill="none" stroke="#000" stroke-width="1.8"/><path d="M${f1(sx)} ${f1(sy)}L${CX+18} ${CY+RW+18}" fill="none" stroke="#000" stroke-width="1.8" stroke-linecap="round"/>`;
  return stem+leaves+berries}
const RIB={band:`M46 214Q120 202 194 214V236Q120 224 46 236Z`,l:`M52 220H14L25 231.5L14 243H52Z`,r:`M188 220H226L215 231.5L226 243H188Z`};
// blind emboss: wreath + ribbon (mask, black = raised)
const EMB=svgUriSq(`<svg ${NS} viewBox="0 0 240 262"><g fill="#000">${branch()}<g transform="translate(240 0) scale(-1 1)">${branch()}</g>
  <path d="${RIB.l}"/><path d="${RIB.r}"/><path d="${RIB.band}"/></g></svg>`);
// gold foil: coronet, the double ring, ribbon edges and folds
const FOIL=svgUriSq(`<svg ${NS} viewBox="0 0 240 262" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="${CX}" cy="${CY}" r="58" stroke-width="1.6"/><circle cx="${CX}" cy="${CY}" r="54.2" stroke-width=".6"/><circle cx="${CX}" cy="${CY}" r="61.2" stroke-width=".7" stroke-dasharray="0 3.2"/>
  <g transform="translate(0 -6)">
   <path d="M84 56Q120 62 156 56V66Q120 72 84 66Z M120 58l2.6 3.4-2.6 3.4-2.6-3.4z M98.6 61a3.4 2 0 1 0 6.8 0a3.4 2 0 1 0-6.8 0z M134.6 61a3.4 2 0 1 0 6.8 0a3.4 2 0 1 0-6.8 0z" fill="#000" fill-rule="evenodd" stroke-width=".8"/>
   <path d="M84 56L79 31Q92 43 102 36L120 23L138 36Q148 43 161 31L156 56Q120 50 84 56Z" stroke-width="1.3"/>
   <path d="M88 52L86 40Q96 47 104 42L120 31L136 42Q144 47 154 40L152 52" stroke-width=".6"/>
   <g fill="#000" stroke="none"><circle cx="79" cy="29" r="3.2"/><circle cx="102" cy="33.5" r="2.6"/><circle cx="120" cy="19.5" r="3.6"/><circle cx="138" cy="33.5" r="2.6"/><circle cx="161" cy="29" r="3.2"/>
    <circle cx="111" cy="40" r="1.2"/><circle cx="129" cy="40" r="1.2"/><path d="M120 34l3 5-3 5-3-5z"/></g>
  </g>
  <path d="${RIB.band}" stroke-width="1.1"/><path d="M50 218Q120 207 190 218M50 232Q120 221 190 232" stroke-width=".5" stroke-dasharray="1.6 2"/>
  <path d="${RIB.l}" stroke-width=".9"/><path d="${RIB.r}" stroke-width=".9"/><path d="M46 236L52 243V236M194 236L188 243V236" stroke-width=".8"/>
 </svg>`);
// a small laurel sprig for the skin headings (mask)
const SPRIG=svgUriSq(`<svg ${NS} viewBox="0 0 60 20"><g fill="#000"><path d="M2 10C20 8 40 9 58 10" fill="none" stroke="#000" stroke-width="1"/>${[8,18,28,38,48].map((x,i)=>`<path d="${LEAF}" transform="translate(${x} 9.6) rotate(${-62}) scale(${f1(.5-i*.04)})"/><path d="${LEAF}" transform="translate(${x+3} 10.2) rotate(${-118}) scale(${f1(.46-i*.04)})"/>`).join('')}<circle cx="58" cy="10" r="1.6"/></g></svg>`);
// a blind-embossed corner spray: laurel along both edges from a small rosette (mask)
const CORNER=(()=>{let g='';const spray=(rot)=>{let l='';for(let i=0;i<6;i++){const x=16+i*10.5,s=.82-i*.08;l+=`<path d="${LEAF}" transform="translate(${f1(x)} 8) rotate(${-55}) scale(${f1(s)})"/><path d="${LEAF}" transform="translate(${f1(x+3)} 8.6) rotate(${-125+180}) scale(${f1(s*.9)})"/>`}
  return `<g transform="${rot}"><path d="M12 8.2C34 7.6 58 8 82 9" fill="none" stroke="#000" stroke-width="1.1"/>${l}</g>`};
  g=spray('')+spray('matrix(0 1 1 0 0 0)');
  return svgUriSq(`<svg ${NS} viewBox="0 0 90 90"><g fill="#000">${g}<circle cx="8" cy="8" r="4.4"/><circle cx="8" cy="8" r="7" fill="none" stroke="#000" stroke-width="1"/></g></svg>`)})();
const corners=()=>['tl','tr','bl','br'].map(k=>`<span class="monogram-cn ${k}"><i class="lo"></i><i class="hi"></i><i class="base"></i></span>`).join('');
const crest=(o,c,big)=>{const [a,b]=K.initials(o);return `<span class="monogram-emb"><i class="lo"></i><i class="hi"></i><i class="base"></i></span><i class="monogram-foil"></i>
  <span class="monogram-mono"><b class="a foil-text">${esc(a)}</b><b class="b">${esc(b)}</b></span>
  <span class="monogram-rib">${big?esc(fmtShort(o.date).replace(/\./g,' · ')):esc(fmtShort(o.date).replace(/\./g,' · '))}</span>`};
FAMILY({key:'monogram',name:'Monogram',meaning:'Embossed crest',
  blurb:'Your initials interlaced in gold foil under a coronet, framed by a blind-embossed laurel wreath on thick cotton paper.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<section class="page pg-monogram" style="--mgemb:${EMB};--mgcorner:${CORNER};--mgfoil:${FOIL};--mghi:${c.hi};--mglo:${c.lo}"><div class="monogram-card tex"><i class="monogram-plate"></i>${corners()}
     <div class="monogram-crest sm reveal">${crest(o,c)}</div>
     <p class="monogram-k reveal d1">${ev(o,L)}</p>
     <h1 class="monogram-lp reveal d1"><span>${esc(n1)}</span><i class="foil-text">&amp;</i><span>${esc(n2)}</span></h1>
     <div class="monogram-rule reveal d2"><i></i><b></b><i></i></div>
     <p class="monogram-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="monogram-venue reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<div class="cover cv-monogram" style="--mgemb:${EMB};--mgcorner:${CORNER};--mgfoil:${FOIL};--mghi:${c.hi};--mglo:${c.lo}"><div class="monogram-table"></div>
     <div class="monogram-card tex"><i class="monogram-plate"></i>${corners()}
      <p class="monogram-k">${ev(o,L)}</p>
      <${tag} class="monogram-crest" ${attr} aria-label="${L.open}">${crest(o,c)}</${tag}>
      <p class="monogram-names">${esc(n1)} <i>&amp;</i> ${esc(n2)}</p>
      <p class="monogram-date">${esc(fmtDate(o.date,o.lang))}</p>
      <div class="monogram-rule"><i></i><b></b><i></i></div>
      ${guest?`<p class="monogram-to">${L.dear}</p><p class="monogram-guest">${esc(guest)}</p>`:`<p class="monogram-to">${esc(o.venue)}</p>`}
      <p class="monogram-hint">${en?'Press the crest to open':'Tekan lambang untuk membuka'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--mgsprig',SPRIG);el.style.setProperty('--mghi',th.c.hi);el.style.setProperty('--mglo',th.c.lo);
    $$('.sec h2',el).forEach(h=>{h.innerHTML=`<i class="monogram-sp"></i><span class="monogram-badge">${h.innerHTML}</span><i class="monogram-sp r"></i>`})},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory cotton, navy ink, gold foil',c:{ground:'#2a2a2d',sheet:'#f6f1e6',ink:'#2a2622',accent:'#1f2f4f',gold:'#b9975b',pagefg:'#efe8da',hi:'rgba(255,255,255,.95)',lo:'rgba(60,45,25,.5)'}},
    {k:'marun',n:'Marun',desc:'Maroon ink and antique gold',c:{ground:'#45141f',sheet:'#f7f0e5',ink:'#2e2224',accent:'#6e1a28',gold:'#c2a160',pagefg:'#f3e3d6',hi:'rgba(255,255,255,.95)',lo:'rgba(70,30,25,.48)'}},
    {k:'zamrud',n:'Zamrud',desc:'Forest green ink on cream',c:{ground:'#163a30',sheet:'#f4f0e2',ink:'#22281f',accent:'#1f4a3a',gold:'#b8975a',pagefg:'#eae6d4',hi:'rgba(255,255,255,.95)',lo:'rgba(40,50,25,.48)'}},
    {k:'nila',n:'Nila',desc:'Midnight blue, silver-gold foil',c:{ground:'#18213b',sheet:'#f4f2ec',ink:'#22283a',accent:'#22355e',gold:'#aea489',pagefg:'#e8e8ee',hi:'rgba(255,255,255,.95)',lo:'rgba(30,35,60,.46)'}},
    {k:'hitam',n:'Hitam',desc:'Black cotton with gold foil',c:{ground:'#0d0d0e',sheet:'#262422',ink:'#e8dfcb',accent:'#e2cf9f',gold:'#c9a85f',pagefg:'#e8dfcb',line:'rgba(232,223,203,.2)',hi:'rgba(255,240,210,.22)',lo:'rgba(0,0,0,.7)'}},
    {k:'jambu',n:'Jambu',desc:'Blush cotton, rose ink',c:{ground:'#e9d4d1',sheet:'#fdf8f4',ink:'#3a2b2c',accent:'#843f4f',gold:'#b6955e',pagefg:'#3a2b2c',hi:'rgba(255,255,255,1)',lo:'rgba(110,60,60,.42)'}},
    {k:'sage',n:'Sage',desc:'Soft sage and white cotton',c:{ground:'#cdd5c5',sheet:'#fbfaf4',ink:'#2c3328',accent:'#455e40',gold:'#a98d58',pagefg:'#2c3328',hi:'rgba(255,255,255,1)',lo:'rgba(60,70,50,.42)'}},
    {k:'biru',n:'Biru',desc:'Powder blue and white cotton',c:{ground:'#d1dbe5',sheet:'#fbfaf6',ink:'#263040',accent:'#2b4669',gold:'#a99064',pagefg:'#263040',hi:'rgba(255,255,255,1)',lo:'rgba(40,55,80,.42)'}},
  ]});
