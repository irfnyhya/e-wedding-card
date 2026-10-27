/* orkid: "Orkid". An art-nouveau gatefold in heavy coloured cotton stock. The two doors are foil-stamped with
   phalaenopsis sprays on whiplash stems and a Mucha-style halo, and an arch window is die-cut through both doors so
   the names on the cream inner card show through. A vellum belly band holds the doors shut, with the guest's name
   printed on it and a gold wax seal on its lower edge. The envelope it came in lies underneath.
   Cover: tap the seal, the band slips down and the doors swing open. Page: the inside of the gatefold, doors folded back.
   Skin: cream inner-card panels with a foil arch hairline, foil orchid over spaced nouveau caps. */
needFont('Federo');
let okN=0;
const okf=v=>(+v).toFixed(1);
// the card is drawn in a 300 x 470 box; the arch window is cut through both doors
const OK_WIN='M72 284V146C72 98 108 70 150 58C192 70 228 98 228 146V284Z';
const okWinOff=d=>`M${72-d} ${284+d}V146C${72-d} ${98-d*.8} ${108-d*.6} ${70-d*1.05} 150 ${58-d*1.1}C${192+d*.6} ${70-d*1.05} ${228+d} ${98-d*.8} ${228+d} 146V${284+d}Z`;
const OK_DOORL=K.uri(`<svg ${NS} viewBox="0 0 300 470" preserveAspectRatio="none"><path fill-rule="evenodd" d="M0 0H149.6V470H0ZM72 284V146C72 98 108 70 150 58V284Z"/></svg>`);
const OK_DOORR=K.uri(`<svg ${NS} viewBox="0 0 300 470" preserveAspectRatio="none"><path fill-rule="evenodd" d="M150.4 0H300V470H150.4ZM150 58C192 70 228 98 228 146V284H150Z"/></svg>`);
// one phalaenopsis: three sepals, two broad petals, a frilled lip; drawn for a foil mask (outline + light fill)
const OK_SEP='M0 0C-3.4-4-3.8-10-.2-13C3.6-10.2 3.6-4 0 0Z';
const OK_PET='M0 0C-1.6-5.4-6.6-9.8-11-8.4C-14.6-7.2-14.4-1.6-10.6 1.2C-7.4 3.6-3 2.6 0 0Z';
const OK_LIP='M0 1.2C-2.6 1.6-4.6 4.2-3.6 6.8C-3 8.6-1.4 9.8 0 9.2C1.4 9.8 3 8.6 3.6 6.8C4.6 4.2 2.6 1.6 0 1.2Z';
let okM=0;
// filled foil petals; a mask cuts fine engraved lines into them (petal edges, inner contours, veins)
const okFlower=(x,y,s,r)=>{const P=(d,t,e='')=>`<path d="${d}" transform="${t}"${e}/>`,parts=[[OK_SEP,''],[OK_SEP,'rotate(128)'],[OK_SEP,'rotate(-128)'],[OK_PET,'rotate(8)'],[OK_PET,'scale(-1 1) rotate(8)']],id='okm'+(++okM);
  return `<g transform="translate(${okf(x)} ${okf(y)}) rotate(${r}) scale(${s})">
  <mask id="${id}" maskUnits="userSpaceOnUse" x="-20" y="-20" width="40" height="40"><rect x="-20" y="-20" width="40" height="40" fill="#fff"/>
    <g fill="none" stroke="#000">
      <g stroke-width="${okf(1.3/s)}">${parts.slice(0,3).map(([d,t])=>P(d,t)).join('')}</g>
      <g stroke-width="${okf(.8/s)}">${parts.map(([d,t])=>P(d,t+' scale(.66)')).join('')}${parts.map(([d,t])=>P(d,t+' scale(.36)')).join('')}</g>
      <path d="M0-2.4V-9M-2.4-.8L-8.6-3M2.4-.8L8.6-3M-1.4-1.6L-6-7M1.4-1.6L6-7" stroke-width="${okf(.6/s)}"/>
      <path d="M-1.6 5.6C-.6 6.8.6 6.8 1.6 5.6" stroke-width="${okf(.3/s)}"/><circle r="1.6" stroke-width="${okf(.34/s)}"/>
    </g></mask>
  <g mask="url(#${id})" stroke="none">${parts.map(([d,t])=>P(d,t)).join('')}<path d="${OK_LIP}"/><circle r="1.6"/></g></g>`};
const okBud=(x,y,s,r)=>`<g transform="translate(${okf(x)} ${okf(y)}) rotate(${r}) scale(${s})" stroke-width="${okf(.7/s)}"><path d="M0 0C-3.2-1-4-5-1.6-7.6C0-9 1.4-8 1.8-6.4C2.8-3.6 2.4-.6 0 0Z" fill-opacity=".85"/></g>`;
const okLeaf=(x,y,len,r,flip)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${len/80} ${flip?-len/80:len/80})" stroke-width="${okf(56/len)}"><path d="M0 0C12-11 38-17 64-15C72-14.4 80-12 82-10C70-4 48 4 26 6C14 7 4 5 0 0Z" fill-opacity=".3"/><path d="M2-1C24-7 52-11 80-10.4M14-3.6L22-9M30-6L38-12.2M46-8L54-13.4M18 1.6L28-4.6M36 2.2L44-6.6" fill="none" stroke-width="${okf(30/len)}"/></g>`;
// the foil artwork for both doors (left half drawn, mirrored); everything black so it can be used as a mask
function okDoorArt(){
  const half=`
    <path d="M34 466C20 420 42 382 34 334C28 296 22 258 26 220C30 180 36 150 50 120C62 96 82 74 112 52" fill="none" stroke-width="2"/>
    <path d="M37 466C25 422 45 384 37 336C31 298 25 260 29 222" fill="none" stroke-width=".6"/>
    ${okFlower(36,230,2.05,-14)}${okFlower(34,176,2.2,-2)}${okFlower(50,126,2.05,12)}${okFlower(80,86,1.75,26)}${okBud(108,58,1.6,62)}${okBud(122,50,1.25,76)}
    ${okBud(30,292,1.3,-120)}
    ${okLeaf(32,466,120,-12,0)}${okLeaf(34,464,96,-46,0)}${okLeaf(30,466,74,-84,1)}
    <path d="M10 10H140M14 14H140M10 10V460M14 14V456" fill="none" stroke-width=".7"/>
    <path d="M10 460H140M14 456H140" fill="none" stroke-width=".7"/>
    <path d="M4 4H146V466H4Z" fill="none" stroke-width=".35"/>
    <path d="M10 40C24 40 40 26 40 10M14 34C26 32 34 24 34 14" fill="none" stroke-width=".6"/><circle cx="20" cy="20" r="2.4"/>
`;
  return `<svg ${NS} viewBox="0 0 300 470"><g stroke="#000" fill="#000" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="150" cy="176" r="122" fill="none" stroke-width=".9"/><circle cx="150" cy="176" r="127" fill="none" stroke-width=".4"/>
    
    <path d="${okWinOff(4)}" fill="none" stroke-width="1"/><path d="${okWinOff(8)}" fill="none" stroke-width=".45"/>
    ${half}<g transform="translate(300 0) scale(-1 1)">${half}</g>
    <path d="M150 20C146 28 146 34 150 40C154 34 154 28 150 20Z"/><circle cx="150" cy="16" r="2"/></g></svg>`}
const OK_ART=K.uri(okDoorArt());
// a small orchid for headings and rules (also a mask)
const OK_SPRIG=K.uri(`<svg ${NS} viewBox="0 0 120 34"><g stroke="#000" fill="#000" stroke-linecap="round"><path d="M4 26C24 30 40 18 60 18S96 30 116 26" fill="none" stroke-width=".8"/><path d="M14 30C30 31 44 23 60 22S90 31 106 30" fill="none" stroke-width=".45"/>${okFlower(60,14,1,0)}${okBud(78,18,.8,70)}${okBud(42,18,.8,-70)}</g></svg>`);
// envelope liner: a small repeat of whiplash lines and dots
const OK_LINER=c=>K.uri(`<svg ${NS} width="44" height="44" viewBox="0 0 44 44"><g fill="none" stroke="${c.gold}" stroke-width=".7" opacity=".9"><path d="M0 22C11 22 11 0 22 0M22 44C33 44 33 22 44 22"/><circle cx="22" cy="22" r="2.2" fill="${c.gold}" stroke="none"/></g></svg>`);
const okVars=c=>`--door:${c.door};--env:${c.env||c.sheet};--okart:${OK_ART};--okdl:${OK_DOORL};--okdr:${OK_DOORR};--oksprig:${OK_SPRIG};--okliner:${OK_LINER(c)};--oklbl:${c.light?c.accent:c.sheet}`;
const okFitP=o=>{const [a,b]=coverNames(o);const n=Math.max(String(a).length,String(b).length,1);return `font-size:${Math.min(10.6,120/n).toFixed(2)}cqi`};
const okFit=o=>{const [a,b]=coverNames(o);const n=Math.max(String(a).length,String(b).length,1);return `font-size:${Math.min(9.8,82/n).toFixed(2)}cqi`};
const okNames=(o,tag,st='')=>{const [n1,n2]=coverNames(o);return `<${tag} class="ok-names"${st?` style="${st}"`:''}><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
const okMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<b class="ok-jw">${esc(j)}</b>`;const [a,b]=K.initials(o);return `<b>${esc(a)}</b><b>${esc(b)}</b>`};
const okDate=o=>{const [d,m,y]=fmtShort(o.date).split('.');return `<span>${esc(d)}</span><i></i><span>${esc(m)}</span><i></i><span>${esc(y)}</span>`};
FAMILY({key:'orkid',name:'Orkid',meaning:'Nouveau gatefold',
  blurb:'An art-nouveau gatefold in coloured cotton, foil-stamped with orchid sprays, an arch window cut through the doors to show the names, held shut by a vellum band and a gold seal.',
  fonts:{d:"'Federo', sans-serif",s:"'Federo', sans-serif",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const en=o.lang==='en',day=fmtDate(o.date,o.lang).split(',')[0];
    return `<section class="page pg-orkid${th.c.dark?' ok-dark':''}" style="${okVars(th.c)}"><i class="ok-bg"></i>
      <div class="ok-open-wrap reveal">
        <div class="ok-wing l"><i class="ok-foil"></i></div><div class="ok-wing r"><i class="ok-foil"></i></div>
        <div class="ok-inside">
          <svg class="ok-arch" viewBox="0 0 300 200" preserveAspectRatio="none" ${NS} aria-hidden="true"><path d="M18 200V96C18 52 80 22 150 12C220 22 282 52 282 96V200" vector-effect="non-scaling-stroke"/><path d="M24 200V98C24 57 84 28 150 18C216 28 276 57 276 98V200" vector-effect="non-scaling-stroke" class="t"/></svg>
          <i class="ok-sprig"></i>
          ${o.bismillah?`<p class="ok-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
          <p class="ok-k kicker">${ev(o,L)}</p>
          ${okNames(o,'h1',okFitP(o))}
          <div class="ok-dblock"><small>${esc(day)}</small><p class="ok-num">${okDate(o)}</p>${o.hijri?`<small class="hj">${esc(o.hijri)}</small>`:''}</div>
          ${o.venue?`<p class="ok-ven">${esc(o.venue)}</p>`:''}
          <div class="ok-pills"><a class="ok-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="ok-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
          <i class="ok-foot"></i>
        </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',u=++okN;
    return `<div class="cover cv-orkid${th.c.dark?' ok-dark':''}" style="${okVars(th.c)}"><i class="ok-bg"></i>
      <div class="ok-env"><i class="ok-liner"></i><i class="ok-envfront"></i></div>
      <div class="ok-gf"><div class="ok-gf3">
        <div class="ok-inner">
          <svg class="ok-cast" viewBox="0 0 300 470" preserveAspectRatio="none" ${NS} aria-hidden="true"><defs><filter id="okb${u}" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3"/></filter></defs><path d="${OK_WIN}" transform="translate(1 3)" fill="none" stroke="#000" stroke-width="6" filter="url(#okb${u})" opacity=".55"/></svg>
          <svg class="ok-arc" viewBox="0 0 300 470" ${NS} aria-hidden="true"><path id="oka${u}" d="${okWinOff(-14).replace(/Z$/,'')}" fill="none"/><text><textPath href="#oka${u}" startOffset="50%" text-anchor="middle">${ev(o,L)}</textPath></text></svg>
          <div class="ok-wtxt">${okNames(o,'p',okFit(o))}<p class="ok-cd">${okDate(o)}</p>${o.venue?`<p class="ok-cv">${esc(o.venue)}</p>`:''}</div>
        </div>
        <div class="ok-door l"><i class="ok-foil"></i><i class="ok-seam"></i></div>
        <div class="ok-door r"><i class="ok-foil"></i><i class="ok-seam"></i></div>
        <div class="ok-band"><p>${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:`<small>${en?'Together with their families':'Dengan penuh kesyukuran'}</small><b>${esc(fmtDate(o.date,o.lang))}</b>`}</p></div>
      </div></div>
      <${tag} class="ok-open" ${attr} aria-label="${en?'Open invitation':'Buka Jemputan'}"><i class="ok-seal" style="--seal:url(${A}seal-${th.c.seal||'emas'}.webp)"><span>${okMono(o)}</span></i><span class="ok-lbl">${en?'Open invitation':'Buka Jemputan'}</span></${tag}>
    </div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('ok-dark',!!c.dark);
    el.style.setProperty('--door',c.door);el.style.setProperty('--oksprig',OK_SPRIG);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Rose cotton gatefold, gold foil orchids',c:{ground:'#ead7d2',sheet:'#fbf6ee',ink:'#3d2c2e',accent:'#7e3150',gold:'#b8955a',pagefg:'#3d2c2e',door:'#b77888',env:'#f3e6df',seal:'emas'}},
    {k:'sage',n:'Sage',desc:'Sage cotton gatefold, gold foil orchids',c:{ground:'#d6dccd',sheet:'#fbf8f0',ink:'#2f3529',accent:'#46583a',gold:'#b39558',pagefg:'#283022',door:'#7d9070',env:'#eef0e6',seal:'emas'}},
    {k:'gading',n:'Gading',desc:'Ivory cotton gatefold, gold foil orchids',c:{ground:'#d9cfbe',sheet:'#fffcf5',ink:'#3a3128',accent:'#6e5233',gold:'#a8854a',pagefg:'#3a3128',door:'#efe5d2',env:'#f7f1e5',seal:'emas',light:1}},
    {k:'ungu',n:'Ungu',desc:'Lilac cotton gatefold, gold foil orchids',c:{ground:'#ddd1e2',sheet:'#fbf7f4',ink:'#352a3a',accent:'#5a2d68',gold:'#b49461',pagefg:'#2f2434',door:'#7c5c8c',env:'#efe7f0',seal:'emas'}},
    {k:'pic',n:'Pic',desc:'Apricot cotton gatefold, gold foil orchids',c:{ground:'#f0dccb',sheet:'#fdf8f0',ink:'#3e2d25',accent:'#8a4630',gold:'#b38d55',pagefg:'#3e2d25',door:'#cf8f72',env:'#f8ebe0',seal:'emas'}},
    {k:'zamrud',n:'Zamrud',desc:'Forest-green gatefold on deep green',c:{ground:'#18352b',sheet:'#f9f4e8',ink:'#283229',accent:'#2c5240',gold:'#c3a265',pagefg:'#efe8d8',door:'#24493a',env:'#e9e2cf',seal:'emas',dark:1}},
    {k:'nila',n:'Nila',desc:'Midnight-blue gatefold on navy',c:{ground:'#1b2440',sheet:'#faf7f1',ink:'#262b3a',accent:'#33406e',gold:'#c4a868',pagefg:'#ebe8f1',door:'#2c3864',env:'#e7e4dc',seal:'gading',dark:1}},
    {k:'marun',n:'Marun',desc:'Wine gatefold on deep wine',c:{ground:'#3d1520',sheet:'#fbf5ee',ink:'#3a2427',accent:'#7a2033',gold:'#c7a063',pagefg:'#f6e9df',door:'#6f2335',env:'#efe2d8',seal:'emas',dark:1}},
  ]});
