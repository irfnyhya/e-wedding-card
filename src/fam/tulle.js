/* tulle: a deckled handmade-paper invitation wrapped in a band of sheer tulle, gathered at the front under a gold wax seal
   with a small sprig of dried baby's breath tucked beneath it.
   Cover: tap the seal (or "Buka Jemputan"); the seal lifts, the tulle slides down off the card and the card comes forward.
   Page: the unwrapped card lying on the loose tulle, seal and sprig resting at its corner.
   Skin: deckled paper cards, each heading set on a soft gathered strip of tulle. */
needFont('Allura');
// dried gypsophila: fine forking stems ending in clusters of tiny florets. Drawn in a 100x150 box, base at (50,148).
function tlBaby(seed,c){const R=rng(seed),st=[],fl=[],bud=[];
  const P=(x,y)=>`${x.toFixed(1)} ${y.toFixed(1)}`;
  const floret=(x,y,s)=>{fl.push([x,y,s])};
  // a pedicel cluster: a few very short stalks with a floret at each end
  const cluster=(x,y,a,n)=>{for(let i=0;i<n;i++){const aa=a+(R()-.5)*1.9,l=3.5+R()*5,x2=x+Math.cos(aa)*l,y2=y+Math.sin(aa)*l;
    st.push(`<path d="M${P(x,y)}L${P(x2,y2)}" stroke-width=".28"/>`);(R()<.18?bud:fl).push([x2,y2,.75+R()*.45])}};
  const branch=(x,y,a,len,depth)=>{const bend=(R()-.5)*.5,x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len,cx=x+Math.cos(a+bend)*len*.55,cy=y+Math.sin(a+bend)*len*.55;
    st.push(`<path d="M${P(x,y)}Q${P(cx,cy)} ${P(x2,y2)}" stroke-width="${(.62-depth*.15).toFixed(2)}"/>`);
    if(depth<2){const k=depth?2:3;for(let i=0;i<k;i++){const t=.45+i*.22+R()*.08,bx=x+(x2-x)*t,by=y+(y2-y)*t,s=i%2?1:-1;
      branch(bx,by,a+s*(.45+R()*.35),len*(.34+R()*.16),depth+1)}}
    cluster(x2,y2,a,depth===2?3+Math.floor(R()*2):4+Math.floor(R()*3))};
  const n=6;for(let i=0;i<n;i++){const a=-Math.PI/2+(-.5+i/(n-1))*.95+(R()-.5)*.12;branch(50+(R()-.5)*2,148,a,62+R()*58,0)}
  const flo=fl.map(([x,y,s])=>{const r=1.15*s;let p='';for(let k=0;k<5;k++){const q=k/5*Math.PI*2+R();p+=`<circle cx="${(x+Math.cos(q)*r*.62).toFixed(2)}" cy="${(y+Math.sin(q)*r*.62).toFixed(2)}" r="${(r*.62).toFixed(2)}"/>`}
    return `<g>${p}<circle class="ctr" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(r*.3).toFixed(2)}"/></g>`}).join('');
  const bd=bud.map(([x,y,s])=>`<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(.7*s).toFixed(2)}"/>`).join('');
  return `<svg class="tu-baby" viewBox="0 0 100 150" ${NS}><g fill="none" stroke="${c.stem}" stroke-linecap="round">${st.join('')}</g>
    <g class="tu-flo" fill="${c.flo}" stroke="${c.floEdge}" stroke-width=".18">${flo}</g><g fill="${c.bud}">${bd}</g></svg>`}
// a band of sheer tulle gathered at its middle: the outline pinches in, the folds run into the pinch
function tlBand(uid,loose){const W=200,H=96,cy=48,pin=loose?20:10;
  const top=`M0 6C62 7 78 ${cy-pin} 100 ${cy-pin}C122 ${cy-pin} 138 7 200 5`,bot=`L200 91C138 90 122 ${cy+pin} 100 ${cy+pin}C78 ${cy+pin} 62 89 0 90Z`;
  const R=rng(uid*7+3),broad=[],fine=[];
  // folds: uneven spacing; broad soft light/shade bands plus a few fine creases, all running into the pinch
  const fold=(t,arr,stroke,w,op)=>{const yl=6+t*84,yr=5+t*86+(R()-.5)*4,yp=cy-pin+t*pin*2+(R()-.5)*1.2,sag=(R()-.5)*6;
    arr.push(`<path d="M0 ${yl.toFixed(1)}C${(50+sag).toFixed(1)} ${(yl+(yp-yl)*.2).toFixed(1)} ${(78+sag/2).toFixed(1)} ${yp.toFixed(1)} 100 ${yp.toFixed(1)}C${(122-sag/2).toFixed(1)} ${yp.toFixed(1)} ${(150-sag).toFixed(1)} ${(yr+(yp-yr)*.2).toFixed(1)} 200 ${yr.toFixed(1)}" stroke="${stroke}" stroke-width="${w.toFixed(1)}" opacity="${op.toFixed(2)}"/>`)};
  let t=.03;while(t<.97){const light=R()<.55;fold(t,broad,light?'#fff':'#5a4434',light?5+R()*7:3+R()*5,light?.3+R()*.35:.07+R()*.08);t+=.06+R()*.1}
  for(let i=0;i<7;i++)fold(.08+R()*.84,fine,R()<.5?'#fff':'#5a4434',.35+R()*.4,R()<.5?.7:.16);
  const folds=[`<g filter="url(#tlb${uid})">${broad.join('')}</g>`,`<g filter="url(#tlf${uid})">${fine.join('')}</g>`];
  return `<svg class="tu-tulle" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" ${NS}><defs>
    <clipPath id="tlc${uid}"><path d="${top}${bot}"/></clipPath>
    <linearGradient id="tlg${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".2" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#fff" stop-opacity=".34"/><stop offset=".8" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity=".52"/></linearGradient>
    <linearGradient id="tlh${uid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3c2d23" stop-opacity=".16"/><stop offset=".07" stop-color="#3c2d23" stop-opacity="0"/><stop offset=".93" stop-color="#3c2d23" stop-opacity="0"/><stop offset="1" stop-color="#3c2d23" stop-opacity=".16"/></linearGradient>
    <radialGradient id="tlp${uid}"><stop offset="0" stop-color="#4a3628" stop-opacity=".16"/><stop offset="1" stop-color="#4a3628" stop-opacity="0"/></radialGradient>
    <pattern id="tln${uid}" width="2.4" height="2.1" patternUnits="userSpaceOnUse"><path d="M0 1.05L.6 0H1.8L2.4 1.05L1.8 2.1H.6Z" fill="none" stroke="#fff" stroke-width=".2" opacity=".3"/></pattern>
    <filter id="tlb${uid}" x="-5%" y="-10%" width="110%" height="120%"><feGaussianBlur stdDeviation="2"/></filter><filter id="tlf${uid}" x="-5%" y="-10%" width="110%" height="120%"><feGaussianBlur stdDeviation=".45"/></filter></defs>
    <g clip-path="url(#tlc${uid})"><rect width="${W}" height="${H}" fill="url(#tlg${uid})"/><rect width="${W}" height="${H}" fill="url(#tln${uid})"/>
    <g fill="none">${folds.join('')}</g><rect width="${W}" height="${H}" fill="url(#tlh${uid})"/><ellipse cx="100" cy="${cy}" rx="30" ry="${pin+10}" fill="url(#tlp${uid})"/></g>
    <path d="${top}" fill="none" stroke="#fff" stroke-width=".9" opacity=".85"/><path d="${bot.replace(/^L/,'M').replace(/Z$/,'')}" fill="none" stroke="#fff" stroke-width=".9" opacity=".8"/></svg>`}
let tlN=0;
const tlMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="tu-jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `${esc(a)}<i>&amp;</i>${esc(b)}`};
const tlSeal=(o,c,tag,attr,L)=>`<${tag} class="tu-seal" ${attr||''} ${L?`aria-label="${L.open}"`:''} style="--seal:url(${A}seal-${c.seal}.webp)"><span>${tlMono(o)}</span></${tag}>`;
const tlBabyC=c=>({stem:c.stem||'#8d8a6c',flo:'#fffdf7',floEdge:'rgba(120,108,90,.55)',bud:'#efe6d2'});
FAMILY({key:'tulle',name:'Tulle',meaning:'Sheer tulle wrap',
  blurb:'A deckled handmade-paper card wrapped in sheer tulle, tied at the front with a gold wax seal and a sprig of baby’s breath. The seal lifts and the tulle slides away.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Allura', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c,u=++tlN;
    return `<section class="page pg-tulle${c.dark?' tu-dark':''}" style="--hi:${c.hi}"><div class="tu-ground"></div>
      <div class="tu-loose reveal">${tlBand(u,true)}</div>
      <div class="tu-pwrap reveal d1"><div class="tu-shadow"><div class="tu-paper tu-pcard"><div class="tu-rule"></div>
        ${o.bismillah?'<p class="tu-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="tu-k kicker">${ev(o,L)}</p>
        <h1 class="tu-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <p class="tu-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="tu-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="tu-ven">${esc(o.venue)}</p>`:''}</div></div>
        <div class="tu-rest">${tlBaby(u*13+5,tlBabyC(c))}${tlSeal(o,c,'span','','')}</div></div>
      <a class="tu-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',u=++tlN;
    return `<div class="cover cv-tulle${c.dark?' tu-dark':''}" style="--hi:${c.hi}"><div class="tu-ground"></div>
      <div class="tu-stage">
        <div class="tu-card"><div class="tu-shadow"><div class="tu-paper"><div class="tu-rule"></div>
          <p class="tu-k">${ev(o,L)}</p><p class="tu-cn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
          <p class="tu-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div></div>
        <div class="tu-band">${tlBand(u,false)}</div>
        <div class="tu-tie">${tlBaby(u*13+1,tlBabyC(c))}${tlSeal(o,c,tag,attr,L)}</div>
      </div>
      <div class="tu-foot">${guest?`<p class="tu-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<p class="tu-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('tu-dark',!!th.c.dark);el.style.setProperty('--hi',th.c.hi);el.style.setProperty('--tlband',K.uri(tlBand(900,false)));
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Ivory paper in white tulle on cream silk',c:{ground:'#ebe5da',sheet:'#fffdf7',ink:'#3a342b',accent:'#76664b',gold:'#b39555',pagefg:'#3a342b',seal:'emas',hi:'#fffaf0'}},
    {k:'jambu',n:'Jambu',desc:'Ivory paper in white tulle on blush silk',c:{ground:'#eedad3',sheet:'#fffaf6',ink:'#3e2d2d',accent:'#955a60',gold:'#b8925a',pagefg:'#3e2d2d',seal:'emas',hi:'#fff4ef'}},
    {k:'pasir',n:'Pasir',desc:'Cream paper in white tulle on champagne silk',c:{ground:'#e6d8c2',sheet:'#fffaf0',ink:'#3b3226',accent:'#86683f',gold:'#b8975a',pagefg:'#3b3226',seal:'emas',hi:'#fff6e6'}},
    {k:'sage',n:'Sage',desc:'Ivory paper in white tulle on sage silk',c:{ground:'#dce1d3',sheet:'#fdfcf6',ink:'#2d3129',accent:'#56664c',gold:'#a88f55',pagefg:'#2d3129',seal:'emas',hi:'#f6f8f0',stem:'#7f8a66'}},
    {k:'biru',n:'Biru',desc:'White paper in white tulle on dusty blue silk',c:{ground:'#d6dee6',sheet:'#fdfdfb',ink:'#26303c',accent:'#4b6080',gold:'#b0925a',pagefg:'#26303c',seal:'emas',hi:'#f4f8fb'}},
    {k:'ungu',n:'Ungu',desc:'White paper in white tulle on lilac silk',c:{ground:'#e2dbe6',sheet:'#fdfbfd',ink:'#342e3d',accent:'#6c5b84',gold:'#b39660',pagefg:'#342e3d',seal:'emas',hi:'#faf6fc'}},
    {k:'koko',n:'Koko',desc:'Cream paper in white tulle on mocha silk',c:{ground:'#55433a',sheet:'#fcf7ef',ink:'#3a2c24',accent:'#6f4f3b',gold:'#c4a167',pagefg:'#f4eadd',seal:'emas',hi:'#8a7366',dark:'1'}},
    {k:'marun',n:'Marun',desc:'Ivory paper in white tulle on wine silk',c:{ground:'#4d1d27',sheet:'#fdf8f3',ink:'#3a2228',accent:'#7a2a3a',gold:'#c6a066',pagefg:'#f6e9e5',seal:'emas',hi:'#83505a',dark:'1'}},
  ]});
