/* riso: a two-colour risograph poster. Each ink is its own layer (halftone screens at different angles, speckled coverage),
   overprinting where they meet, slightly out of register. Cover: on tap the two layers slide into register, then the sheet slides away.
   Page: a riso poster with the names. Skin: overprinted grainy headings and halftone corners. */
needFont('Bricolage+Grotesque:opsz,wght@12..96,400..800');
const BG="'Bricolage Grotesque', sans-serif",MONO="'IBM Plex Mono', monospace";
let uid=0;
const fit=(s,max,fs,k=.6)=>Math.min(fs,max/Math.max(1,(s||'').length*k));
// halftone dots on a rotated screen inside a box; f(x,y) -> 0..1 dot size
function ht(x0,y0,w,h,step,ang,maxR,f){let d='';const a=ang*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),cx=x0+w/2,cy=y0+h/2,R=Math.hypot(w,h)/2+step;
  for(let i=-R;i<=R;i+=step)for(let j=-R;j<=R;j+=step){const x=cx+i*ca-j*sa,y=cy+i*sa+j*ca;if(x<x0||x>x0+w||y<y0||y>y0+h)continue;const t=f(x,y);if(t<=.04)continue;
    const r=+Math.min(maxR,maxR*Math.sqrt(Math.min(1,t))).toFixed(1);if(r<.3)continue;d+=`M${(x-r).toFixed(1)} ${y.toFixed(1)}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0`}
  return d}
const flower=(cx,cy,r,rot=0)=>Array.from({length:5},(_,i)=>`<ellipse cx="${cx}" cy="${(cy-r*.55).toFixed(1)}" rx="${(r*.36).toFixed(1)}" ry="${(r*.55).toFixed(1)}" transform="rotate(${rot+i*72} ${cx} ${cy})"/>`).join('');
const leaf=(x,y,l,rot)=>`<path d="M0 0C${l*.3} ${-l*.28} ${l*.7} ${-l*.28} ${l} 0C${l*.7} ${l*.28} ${l*.3} ${l*.28} 0 0Z" transform="translate(${x} ${y}) rotate(${rot})"/>`;
// paper speckle: ink drops out where the noise is high, like a riso drum running a little dry
const inkF=(id,seed)=>`<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.15" numOctaves="1" seed="${seed}" result="n"/><feColorMatrix in="n" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -5 3.9" result="m"/><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="2" seed="${seed+7}" result="b"/><feColorMatrix in="b" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.75" result="bm"/><feComposite in="m" in2="bm" operator="in" result="mm"/><feComposite in="SourceGraphic" in2="mm" operator="in"/></filter>`;
function layers(o,th,L,guest,mode){const c=th.c,u=++uid,[n1,n2]=coverNames(o),en=o.lang==='en',A=c.accent,B=c.gold;
  const d=new Date((o.date||'2026-01-01')+'T00:00:00'),dd=String(d.getDate()).padStart(2,'0'),mm=String(d.getMonth()+1).padStart(2,'0'),yy=String(d.getFullYear());
  const N1=(n1||'').toUpperCase(),N2=(n2||'').toUpperCase(),f1=fit(N1,262,64),f2=fit(N2,232,64);
  const page=mode==='page';const H=page?560:600;
  // ink one (accent): halftone sun, flowers, overprint blocks
  const sunY=page?150:168,sunX=page?196:178;
  const a=`<svg class="rs-l rs-a" viewBox="0 0 300 ${H}" aria-hidden="true"><defs>${inkF('ra'+u,3+u%5)}</defs><g filter="url(#ra${u})" fill="${A}"><g fill="none" stroke="${A}" stroke-width=".7"><circle cx="150" cy="14" r="4.2"/><path d="M143 14h14M150 7v14"/><circle cx="14" cy="${H-14}" r="4.2"/><path d="M7 ${H-14}h14M14 ${H-21}v14"/></g>
   <path d="${ht(sunX-112,sunY-112,224,224,5.6,15,2.7,(x,y)=>{const r=Math.hypot(x-sunX,y-sunY)/112;return r>1?0:1.08-r*.95})}"/>
   <circle cx="${sunX}" cy="${sunY}" r="46"/>
   <g transform="translate(${page?262:34} ${page?268:92})">${flower(0,0,26,8)}</g><g transform="translate(${page?78:262} ${page?40:300})">${flower(0,0,15,30)}</g><g transform="translate(${page?260:250} ${page?312:52})">${flower(0,0,12,-10)}</g>
   <rect x="${page?14:18}" y="${page?268:316}" width="${page?150:120}" height="${page?54:58}"/>
   <path d="${ht(170,H-210,130,210,5,15,2.4,(x,y)=>1.1-Math.hypot(300-x,H-y)/165)}"/>
   ${page?`<text x="14" y="214" class="rs-big" font-size="118">${dd}</text>`:`<text x="282" y="${H-38}" text-anchor="end" class="rs-big" font-size="64">${dd}.${mm}</text>`}
   <path d="M${page?20:22} ${page?236:278}h${page?132:96}" stroke="${A}" stroke-width="5"/>
  </g></svg>`;
  // ink two (gold slot = second drum): type, rings, rules, info
  const ny=page?300:356;
  const b=`<svg class="rs-l rs-b" viewBox="0 0 300 ${H}" aria-hidden="true"><defs>${inkF('rb'+u,11+u%5)}</defs><g filter="url(#rb${u})" fill="${B}"><g fill="none" stroke="${B}" stroke-width=".7"><circle cx="150" cy="14" r="4.2"/><path d="M143 14h14M150 7v14"/><circle cx="14" cy="${H-14}" r="4.2"/><path d="M7 ${H-14}h14M14 ${H-21}v14"/></g>
   <g transform="translate(0 ${page?26:0})"><text x="22" y="36" class="rs-mono" font-size="8.6">${en?'INVITATION':'KAD JEMPUTAN'} &#8212; NO.${dd}/${mm}</text><text x="278" y="36" text-anchor="end" class="rs-mono" font-size="8.6">${yy}</text>
   <rect x="22" y="44" width="256" height="2.2"/></g>
   <g fill="none" stroke="${B}" stroke-width="6.5"><circle cx="${sunX-24}" cy="${sunY+6}" r="40"/><circle cx="${sunX+26}" cy="${sunY+6}" r="40"/></g>
   <path d="M${sunX-24} ${sunY-48}l8 9-8 9-8-9z"/><path d="M${sunX-36} ${sunY-48}h24" stroke="${B}" stroke-width="1.6"/>
   <g>${[[34,92],[262,300],[250,52]].slice(0,page?0:3).map(([x,y],i)=>`<circle cx="${x+2}" cy="${y-1}" r="${[7,4.5,3.6][i]}"/>`).join('')}${page?`<circle cx="264" cy="267" r="7"/><circle cx="80" cy="39" r="4.5"/><circle cx="262" cy="311" r="3.6"/>`:''}</g>
   ${page?'':`<g stroke="${B}" stroke-width="1.6" fill="none"><path d="M${page?40:34} ${page?104:118}C${page?44:38} ${page?150:170} ${page?30:26} ${page?190:200} ${page?36:30} ${page?230:262}"/></g>
   ${leaf(31,166,22,-30)}${leaf(29,198,18,200)}`}
   <text x="20" y="${ny-58}" class="rs-mono" font-size="9">${ev(o,L).toUpperCase()}</text>
   <text x="18" y="${ny}" class="rs-name" font-size="${f1.toFixed(1)}">${esc(N1)}</text>
   <text x="18" y="${(ny+f2*.92+4).toFixed(1)}" class="rs-name" font-size="${f2.toFixed(1)}"><tspan class="rs-amp" font-size="${(f2*.7).toFixed(1)}">&amp;</tspan>${esc(N2)}</text>
   <g class="rs-info"><rect x="22" y="${H-150}" width="${page?150:160}" height="1.4"/>
    <text x="22" y="${H-134}" class="rs-mono" font-size="8">${en?'DATE':'TARIKH'}</text><text x="22" y="${H-120}" class="rs-val" font-size="12.5">${esc(fmtDate(o.date,o.lang))}</text>
    <text x="22" y="${H-102}" class="rs-mono" font-size="8">${en?'TIME':'MASA'}</text><text x="22" y="${H-88}" class="rs-val" font-size="12.5">${esc(fmtTime(o.start,o.lang))}${o.end?' &#8211; '+esc(fmtTime(o.end,o.lang)):''}</text>
    <text x="22" y="${H-70}" class="rs-mono" font-size="8">${en?'VENUE':'TEMPAT'}</text><text x="22" y="${H-56}" class="rs-val" font-size="12.5">${esc(o.venue)}</text>
    ${guest?`<text x="22" y="${H-34}" class="rs-mono" font-size="8">${en?'FOR':'KEPADA'}</text><text x="${en?50:64}" y="${H-34}" class="rs-val rs-g" font-size="11">${esc(guest)}</text>`:''}</g>
   ${page?'':`<text x="280" y="${H-14}" text-anchor="end" class="rs-mono" font-size="6.5">${en?'printed in two inks':'dicetak dua warna'} &#183; riso</text>`}
  </g></svg>`;
  return a+b}
FAMILY({key:'riso',name:'Risograf',meaning:'Two-colour riso print',
  blurb:'A two-colour risograph poster in fluorescent ink, halftones and speckled grain, slightly out of register; the inks slide into register and the sheet slides away.',
  fonts:{d:BG,s:BG,b:BG},ms:1400,
  page(o,th,L){return `<section class="page pg-riso" style="--blend:${th.c.blend||'multiply'}"><div class="rs-sheet">${layers(o,th,L,'','page')}<i class="rs-grain"></i></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-riso" style="--blend:${th.c.blend||'multiply'}"><div class="rs-table"></div>
    <${tag} class="rs-paper" ${attr} aria-label="${L.open}">${layers(o,th,L,guest,'cover')}<i class="rs-grain"></i><span class="rs-tab">${en?'Tap to open':'Sentuh untuk buka'} &#8594;</span></${tag}></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--blend',th.c.blend||'multiply');$$('.sheet > .sec',el).forEach((s,i)=>{s.classList.add(i%2?'rs-odd':'rs-even');const h=$('h2',s);if(h)h.setAttribute('data-t',h.textContent)})},
  themes:[
    {k:'jambu',n:'Jambu Biru',desc:'Fluorescent pink and blue on cream',c:{ground:'#3a3a40',sheet:'#f4efe4',ink:'#0b4f8a',accent:'#ff48b0',gold:'#0078bf',pagefg:'#f4efe4',line:'rgba(0,120,191,.35)'}},
    {k:'merah',n:'Merah Teal',desc:'Bright red and teal on chalk',c:{ground:'#d9d4c8',sheet:'#f2ede2',ink:'#00646a',accent:'#ff665e',gold:'#00838a',pagefg:'#23302f',line:'rgba(0,131,138,.35)'}},
    {k:'kuning',n:'Kuning',desc:'Yellow and medium blue',c:{ground:'#24304f',sheet:'#f7f2e6',ink:'#25418a',accent:'#ffd400',gold:'#3255a4',pagefg:'#f7f2e6',line:'rgba(50,85,164,.35)'}},
    {k:'oren',n:'Oren Hijau',desc:'Fluorescent orange and green',c:{ground:'#e6e1d4',sheet:'#f4efe4',ink:'#00753f',accent:'#ff6c2f',gold:'#00a95c',pagefg:'#22301f',line:'rgba(0,169,92,.35)'}},
    {k:'ungu',n:'Ungu',desc:'Purple and fluorescent pink on lilac',c:{ground:'#2c2438',sheet:'#efe9ef',ink:'#5a4290',accent:'#ff48b0',gold:'#765ba7',pagefg:'#efe9ef',line:'rgba(118,91,167,.35)'}},
    {k:'emas',n:'Emas Marun',desc:'Burgundy and sunflower on cream',c:{ground:'#efe5d3',sheet:'#f6eddc',ink:'#7a3b5e',accent:'#ffb511',gold:'#914e72',pagefg:'#3b2230',line:'rgba(145,78,114,.35)'}},
    {k:'hitam',n:'Hitam',desc:'Pink and yellow on black stock',c:{ground:'#0e0e10',sheet:'#1d1d21',ink:'#ffe800',accent:'#ff48b0',gold:'#ffe800',blend:'screen',pagefg:'#f2efe8',line:'rgba(255,232,0,.35)'}},
    {k:'laut',n:'Laut',desc:'Coral and mint on navy stock',c:{ground:'#0f1428',sheet:'#1d2340',ink:'#9be3df',accent:'#ff7477',gold:'#82d8d5',blend:'screen',pagefg:'#eef2f6',line:'rgba(130,216,213,.35)'}},
  ]});
