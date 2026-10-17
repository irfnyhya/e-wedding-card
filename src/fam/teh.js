/* teh: an afternoon-tea invitation. A vintage lithographed tea tin with a gold-bordered label,
   a fine porcelain cup and saucer with gilt rims, a botanical tea sprig and a little bunting overhead.
   Cover: touching the tin lifts its lid away, then the table fades. Page: a tea card with a dotted-leader menu of the details.
   Skin: porcelain saucer badges over the headings, gilt-ruled cards on a fine ticking cloth. */
needFont('Great+Vibes');
const f1=v=>(+v).toFixed(1);
// a camellia (tea) sprig: serrated leaves, a white flower with gold stamens and a bud
function sprig(c,w='100%'){const leaf=(x,y,r,s)=>{let d='M0 0';for(let i=1;i<=8;i++){const t=i/8,yy=-t*30,xx=Math.sin(t*Math.PI)*9.5;d+=`L${f1(xx+(i%2?1.1:0))} ${f1(yy)}`}for(let i=7;i>=0;i--){const t=i/8,yy=-t*30,xx=-Math.sin(t*Math.PI)*9.5;d+=`L${f1(xx-(i%2?1.1:0))} ${f1(yy)}`}
   return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="${d}Z" fill="${c.leaf}"/><path d="M0 0V-30" stroke="${c.sheet}" stroke-width=".5" opacity=".7"/>${[-8,-14,-20].map(v=>`<path d="M0 ${v}l5 -4M0 ${v}l-5 -4" stroke="${c.sheet}" stroke-width=".35" opacity=".55"/>`).join('')}</g>`};
  const pet=Array.from({length:6},(_,i)=>`<ellipse cx="0" cy="-6.5" rx="4.4" ry="6.2" transform="rotate(${i*60})" fill="#fffdf8" stroke="rgba(0,0,0,.18)" stroke-width=".4"/>`).join('');
  return `<svg class="th-sprig" viewBox="0 0 120 90" style="width:${w}"><path d="M8 82C30 70 52 56 70 40S98 16 112 10" fill="none" stroke="${c.wood||'#6b4a2e'}" stroke-width="1.4" stroke-linecap="round"/>
   ${leaf(30,68,-118,1)}${leaf(44,60,-30,.9)}${leaf(62,46,-120,.85)}${leaf(78,34,-28,.8)}${leaf(96,22,-110,.62)}
   <g transform="translate(52 56)">${pet}<circle r="3" fill="${c.gold}"/>${Array.from({length:12},(_,i)=>`<circle cx="${f1(Math.cos(i/12*6.28)*3.6)}" cy="${f1(Math.sin(i/12*6.28)*3.6)}" r=".6" fill="${c.gold}"/>`).join('')}</g>
   <g transform="translate(110 11) rotate(40)"><ellipse rx="3" ry="4.4" fill="#fffdf8" stroke="${c.leaf}" stroke-width=".8"/><path d="M-3 1C-2 5 2 5 3 1" fill="${c.leaf}"/></g></svg>`}
// porcelain cup and saucer, gilt rims, a band of tiny painted roses, tea showing at the brim
function cup(c,u){const roses=[34,50,66,82,98,114,126].map((x,i)=>{const y=40+Math.pow((x-80)/56,2)*-2;return `<g transform="translate(${x} ${f1(y+3)})"><circle r="2.6" fill="${c.accent}" opacity=".85"/><circle r="1.1" fill="#fff" opacity=".5"/><path d="M2.4 1.4l3 1.4M-2.4 1.4l-3 1.4" stroke="${c.leaf}" stroke-width="1.1" stroke-linecap="round"/></g>`}).join('');
  return `<svg class="th-cup" viewBox="0 0 170 112"><defs>
   <linearGradient id="tpc${u}" x1="0" x2="1"><stop offset="0" stop-color="#d9d6d0"/><stop offset=".3" stop-color="#ffffff"/><stop offset=".62" stop-color="#f6f4ef"/><stop offset="1" stop-color="#bdb8b0"/></linearGradient>
   <radialGradient id="tps${u}" cx=".45" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#eeebe5"/><stop offset="1" stop-color="#cfcac2"/></radialGradient>
   <radialGradient id="tpt${u}" cx=".4" cy=".4" r=".7"><stop offset="0" stop-color="${c.tea}" stop-opacity=".75"/><stop offset="1" stop-color="${c.tea}"/></radialGradient></defs>
   <ellipse cx="82" cy="100" rx="78" ry="11" fill="rgba(0,0,0,.18)"/>
   <ellipse cx="80" cy="94" rx="76" ry="14" fill="url(#tps${u})"/><ellipse cx="80" cy="94" rx="74.5" ry="12.8" fill="none" stroke="${c.gold}" stroke-width="1.5"/><ellipse cx="80" cy="94" rx="70" ry="10.6" fill="none" stroke="${c.gold}" stroke-width=".5"/>
   <ellipse cx="80" cy="93" rx="38" ry="6.5" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="1.4"/>
   <path d="M134 44C156 40 160 64 140 72C134 75 128 76 124 76" fill="none" stroke="url(#tpc${u})" stroke-width="7" stroke-linecap="round"/><path d="M134 44C156 40 160 64 140 72C134 75 128 76 124 76" fill="none" stroke="${c.gold}" stroke-width=".8"/>
   <path d="M66 90H94L92 96H68Z" fill="#e7e3dc"/>
   <path d="M22 34H138C137 70 114 92 80 92C46 92 23 70 22 34Z" fill="url(#tpc${u})"/>
   <path d="M24 42H136" stroke="${c.gold}" stroke-width=".7" opacity=".9"/><path d="M27 52C46 55 114 55 133 52" stroke="${c.gold}" stroke-width=".6" fill="none"/>${roses}
   <path d="M40 78C54 88 106 88 120 78" stroke="${c.gold}" stroke-width=".5" fill="none" opacity=".8"/>
   <ellipse cx="80" cy="34" rx="58" ry="8.5" fill="#f4f1ec"/><ellipse cx="80" cy="35" rx="53" ry="6.6" fill="url(#tpt${u})"/><ellipse cx="70" cy="34" rx="16" ry="1.6" fill="#fff" opacity=".25"/>
   <ellipse cx="80" cy="34" rx="58" ry="8.5" fill="none" stroke="${c.gold}" stroke-width="1.6"/></svg>`}
// bunting on a fine cord: little pennants in turn plain, dotted and striped, stitched along their edges
function bunting(c,u){let g='';const n=11;
  for(let i=0;i<n;i++){const t=(i+.5)/n,x=8+t*374,y=10+Math.sin(t*Math.PI)*26,ang=Math.cos(t*Math.PI)*-12,col=[c.buntA||c.accent,c.gold,c.bunt][i%3],pat=i%3===1?`url(#tbd${u})`:i%3===2?`url(#tbs${u})`:'none';
    g+=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})"><path d="M-12 0H12L0 26Z" fill="${col}"/>${pat!=='none'?`<path d="M-12 0H12L0 26Z" fill="${pat}"/>`:''}<path d="M-9.6 2H9.6L0 22Z" fill="none" stroke="rgba(255,255,255,.65)" stroke-width=".5" stroke-dasharray="1.6 1.4"/><path d="M-12 0H12" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/></g>`}
  return `<svg class="th-bunt" viewBox="0 0 390 52" preserveAspectRatio="xMidYMin meet"><defs><pattern id="tbd${u}" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r=".9" fill="#fff" opacity=".7"/></pattern>
   <pattern id="tbs${u}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(90)"><rect width="1.6" height="4" fill="#fff" opacity=".45"/></pattern></defs>
   <path d="M0 6Q195 66 390 6" fill="none" stroke="${c.ink}" stroke-width=".8" opacity=".6"/>${g}</svg>`}
// the tin's lithographed lattice and the porcelain badge for the skin
const LATTICE=c=>svgUriSq(`<svg ${NS} width="18" height="18" viewBox="0 0 18 18"><path d="M9 0L18 9L9 18L0 9Z" fill="none" stroke="${c.gold}" stroke-width=".6" opacity=".55"/><circle cx="9" cy="9" r="1.3" fill="${c.gold}" opacity=".6"/></svg>`);
const TICK=c=>svgUriSq(`<svg ${NS} width="14" height="14"><rect width="14" height="14" fill="none"/><path d="M0 0V14M7 0V14" stroke="${c.ink}" stroke-width=".5" opacity=".06"/></svg>`);
const SAUCER=c=>svgUriSq(`<svg ${NS} viewBox="0 0 60 60"><defs><radialGradient id="s" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".75" stop-color="#f1eee8"/><stop offset="1" stop-color="#d4cfc6"/></radialGradient></defs>
  <circle cx="30" cy="31.5" r="27" fill="rgba(0,0,0,.12)"/><circle cx="30" cy="30" r="27" fill="url(#s)"/><circle cx="30" cy="30" r="25.6" fill="none" stroke="${c.gold}" stroke-width="1.4"/><circle cx="30" cy="30" r="23" fill="none" stroke="${c.gold}" stroke-width=".4"/>
  ${Array.from({length:10},(_,i)=>{const a=i/10*Math.PI*2;return `<circle cx="${f1(30+Math.cos(a)*19)}" cy="${f1(30+Math.sin(a)*19)}" r="1.7" fill="${c.accent}" opacity=".85"/><circle cx="${f1(30+Math.cos(a+.16)*19.6)}" cy="${f1(30+Math.sin(a+.16)*19.6)}" r=".9" fill="${c.leaf}"/>`}).join('')}
  <circle cx="30" cy="30" r="13" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="1.6"/><circle cx="30" cy="30" r="11.4" fill="none" stroke="${c.gold}" stroke-width=".6"/><circle cx="30" cy="30" r="3" fill="${c.accent}" opacity=".8"/></svg>`);
let n=0;
FAMILY({key:'teh',name:'Petang Teh',meaning:'Afternoon tea',
  blurb:'A lithographed tea tin with a gilt label, a porcelain cup and saucer, tea leaves and a little bunting. Touch the tin and its lid lifts.',
  fonts:{d:"'Old Standard TT', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u='p'+(++n);
    const row=(k,v)=>`<li><span>${k}</span><i></i><b>${esc(v)}</b></li>`;
    return `<section class="page pg-teh" style="--tick:${TICK(c)}"><div class="th-card">
     <div class="th-cupw reveal">${cup(c,u)}</div>
     <p class="th-k reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="th-orn reveal d1"><i></i><b></b><i></i></div>
     <ul class="th-menu reveal d2">${row(en?'Date':'Tarikh',fmtDate(o.date,o.lang))}${row(en?'Time':'Masa',fmtTime(o.start,o.lang)+' – '+fmtTime(o.end,o.lang))}${row(en?'Place':'Tempat',o.venue)}</ul>
     <div class="th-sp reveal d3">${sprig(c)}</div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u='c'+(++n),y=(o.date||'').slice(0,4);
    return `<div class="cover cv-teh" style="--tick:${TICK(c)};--lat:${LATTICE(c)}"><div class="th-table"></div>
     <div class="th-buntw">${bunting(c,u)}</div>
     <div class="th-top">${guest?`<p class="th-to">${L.dear}</p><p class="th-guest">${esc(guest)}</p>`:`<p class="th-to">${en?'You are warmly invited':'Dengan segala hormatnya'}</p>`}</div>
     <${tag} class="th-tin" ${attr} aria-label="${L.open}"><span class="th-body"><span class="th-band t"></span><span class="th-band b"></span>
       <span class="th-label"><span class="th-lk">${ev(o,L)}</span>${sprig(c,'34%')}<span class="th-ln">${esc(n1)}<i>&amp;</i>${esc(n2)}</span><span class="th-lr"></span><span class="th-ld">${esc(fmtShort(o.date).replace(/\./g,' · '))}</span><span class="th-le">${en?'Est.':'Sejak'} ${esc(y)}</span></span></span>
      <span class="th-lid"><span class="th-knob"></span></span></${tag}>
     <div class="th-cupc">${cup(c,u)}</div><div class="th-spc">${sprig(c)}</div>
     <p class="th-hint">${en?'Touch the tin to lift the lid':'Sentuh tin untuk membuka tudungnya'}</p></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--saucer',SAUCER(th.c));el.style.setProperty('--tick',TICK(th.c))},
  themes:[
    {k:'merah',n:'Merah',desc:'Crimson tin on a cream cloth',c:{ground:'#efe6d9',sheet:'#fdf9f1',ink:'#33251f',accent:'#8e2430',gold:'#c49a4c',pagefg:'#33251f',tea:'#7a4320',leaf:'#4f6b3a',bunt:'#e8d9c2',wood:'#6b4a2e'}},
    {k:'hijau',n:'Hijau',desc:'Bottle-green tin, gilt label',c:{ground:'#e7e3d4',sheet:'#fcfaf2',ink:'#25302a',accent:'#1f5040',gold:'#c49a4c',pagefg:'#25302a',tea:'#7a4320',leaf:'#4a6b3c',bunt:'#e9d9b9',wood:'#6b4a2e'}},
    {k:'biru',n:'Biru',desc:'Navy tin with blue porcelain',c:{ground:'#e3e6e6',sheet:'#fcfcf8',ink:'#232b3a',accent:'#23395f',gold:'#bf9a55',pagefg:'#232b3a',tea:'#7a4320',leaf:'#4f6b48',bunt:'#d9e1ec',wood:'#6b4a2e'}},
    {k:'jambu',n:'Jambu',desc:'Rose tin on blush linen',c:{ground:'#f3e5e1',sheet:'#fffaf6',ink:'#3b2a2b',accent:'#a84a60',gold:'#bf9758',pagefg:'#3b2a2b',tea:'#7a4320',leaf:'#5a7444',bunt:'#f2d5d6',wood:'#6b4a2e'}},
    {k:'kuning',n:'Kuning',desc:'Mustard tin, olive leaves',c:{ground:'#efe8d6',sheet:'#fdfaf0',ink:'#33291b',accent:'#8f6414',gold:'#c09a46',pagefg:'#33291b',tea:'#6e3c1c',leaf:'#56693a',bunt:'#ece0c0',wood:'#6b4a2e'}},
    {k:'laut',n:'Laut',desc:'Teal tin on a sea-glass cloth',c:{ground:'#dde8e5',sheet:'#fbfcf8',ink:'#1f2f30',accent:'#24656b',gold:'#c09a52',pagefg:'#1f2f30',tea:'#7a4320',leaf:'#4f6b48',bunt:'#d3e6e2',wood:'#6b4a2e'}},
    {k:'hitam',n:'Hitam',desc:'Black lacquer tin on dark wood',c:{ground:'#2b2420',sheet:'#fbf6ec',ink:'#2a221c',accent:'#1f1b19',gold:'#cfa95c',pagefg:'#efe4d2',tea:'#7a4320',leaf:'#5a7444',bunt:'#efe4d2',wood:'#6b4a2e',buntA:'#9a3a34'}},
    {k:'ungu',n:'Ungu',desc:'Plum tin at dusk',c:{ground:'#2e2334',sheet:'#fcf8f3',ink:'#2d2430',accent:'#5b3466',gold:'#c9a35a',pagefg:'#efe6f0',tea:'#7a4320',leaf:'#5a7444',bunt:'#e6d8ec',wood:'#6b4a2e',buntA:'#a06cb0'}},
  ]});
