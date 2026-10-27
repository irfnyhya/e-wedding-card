/* wau: the Kelantan moon kite (wau bulan) made as a cut-paper object: a coloured base sheet, a gold foil sheet with a row of
   punched eyelets, and an ivory top sheet cut with awan-larat scrolls, each layer lifted on its own shadow; silk tassels at the
   wing tips and the bow string across the shoulders. It hangs on a plain sky-tinted paper with plenty of room around it.
   Cover: tap "Buka Jemputan" and the wau rises away. Page: the wau resting over the top of a deckled card with the names.
   Skin: ivory cards with a gold hairline and a small cut-paper rosette over each heading. */
const WAU='M100 14C122 30 134 58 128 92C150 92 178 86 196 70C192 104 160 128 118 132C116 150 118 166 124 184C146 182 168 178 186 168C178 220 140 252 100 252C60 252 22 220 14 168C32 178 54 182 76 184C82 166 84 150 82 132C40 128 8 104 4 70C22 86 50 92 72 92C66 58 78 30 100 14Z';
const wF=v=>(+v).toFixed(1);
const wSc=s=>`transform="translate(100 136) scale(${s}) translate(-100 -136)"`;
// awan larat: a leaf-tipped curling scroll
const CURL='M0 0c6-10 20-12 26-4s0 18-9 16-8-11-1-12';
const wCurls=(list,w)=>list.map(([x,y,r,s,k=1])=>`<path d="${CURL}" transform="translate(${x} ${y}) rotate(${r}) scale(${s*k} ${k})" stroke-width="${wF(w/k)}"/>`).join('');
// right-half scroll positions, mirrored for the left
const W_CURLS=[[112,104,10,-1,.9],[142,100,-8,-1,.9],[166,92,-20,-1,.7],[110,52,60,-1,.6],[114,196,170,-1,.9],[140,206,150,-1,.85],[160,196,128,-1,.7],[108,160,100,-1,.6]];
const wMirror=list=>list.flatMap(([x,y,r,s,k])=>[[x,y,r,s,k],[200-x,y,-r,-s,k]]);
const wMask=(inner)=>K.uri(`<svg ${NS} viewBox="0 0 200 266"><defs><mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="266">${inner}</mask></defs><rect width="200" height="266" mask="url(#m)"/></svg>`);
// layer 1: the coloured base sheet
const W_M1=wMask(`<path d="${WAU}" fill="#fff"/>`);
// layer 2: gold foil, inset, with punched eyelets near its edge
const W_M2=wMask(`<path d="${WAU}" ${wSc(.92)} fill="#fff"/><path d="${WAU}" ${wSc(.875)} fill="none" stroke="#000" stroke-width="2.3" stroke-dasharray="0 5.2" stroke-linecap="round"/>`);
// layer 3: ivory top sheet cut with scrolls, a rosette at the head, lozenges down the spine and a crescent slit on the tail
const petals=K.ring(8,9,100,60).map(([x,y,a])=>`<ellipse cx="${wF(x)}" cy="${wF(y)}" rx="4.6" ry="2.2" transform="rotate(${wF(a*180/Math.PI)} ${wF(x)} ${wF(y)})"/>`).join('');
const loz=[96,110,124,138,152,166].map(y=>`<path d="M100 ${y-4.5}l3.4 4.5-3.4 4.5-3.4-4.5z"/>`).join('');
const W_M3=wMask(`<path d="${WAU}" ${wSc(.82)} fill="#fff"/><g fill="none" stroke="#000" stroke-linecap="round">${wCurls(wMirror(W_CURLS),2.3)}</g>
  <g fill="#000">${petals}<circle cx="100" cy="60" r="2.6"/>${loz}</g><circle cx="100" cy="60" r="15" fill="none" stroke="#000" stroke-width="1.3"/>
  <path d="M46 196C66 224 134 224 154 196" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round"/><path d="M60 206C76 220 124 220 140 206" fill="none" stroke="#000" stroke-width="1" stroke-dasharray="0 4" stroke-linecap="round"/>`);
// the bow string, the spine stick, the tassels and a stitched edge line: fine strokes over the paper
const wTassel=(x,y,s)=>Array.from({length:6},(_,i)=>`<path d="M${x} ${y}q${wF(s*(i-2.5)*1.1)} 14 ${wF(s*(i-2.5)*2.4+s*3)} 34"/>`).join('');
const wLines=()=>`<svg class="wu-lines" viewBox="0 0 200 266" aria-hidden="true">
  <path d="M8 66Q100 34 192 66" fill="none" style="stroke:var(--ink)" stroke-width=".6" opacity=".7"/>
  <path d="${WAU}" ${wSc(.965)} fill="none" style="stroke:var(--sheet)" stroke-width=".55" stroke-dasharray="1.6 1.8" opacity=".75"/>
  <g fill="none" style="stroke:var(--gold)" stroke-width=".55">${wTassel(196,70,1)}${wTassel(4,70,-1)}</g>
  <circle cx="196" cy="70" r="2.4" style="fill:var(--accent)"/><circle cx="4" cy="70" r="2.4" style="fill:var(--accent)"/></svg>`;
const wKite=()=>`<span class="wu-kite"><span class="wu-l l1"><i></i></span><span class="wu-l l2"><i></i></span><span class="wu-l l3"><i></i></span>${wLines()}</span>`;
const W_ROS=K.uri(`<svg ${NS} viewBox="-20 -20 40 40">${K.ring(8,10,0,0).map(([x,y,a])=>`<ellipse cx="${wF(x)}" cy="${wF(y)}" rx="8" ry="3.6" transform="rotate(${wF(a*180/Math.PI)} ${wF(x)} ${wF(y)})"/>`).join('')}<circle r="4.2"/></svg>`);
const wVars=`--wm1:${W_M1};--wm2:${W_M2};--wm3:${W_M3};--wros:${W_ROS}`;
FAMILY({key:'wau',name:'Wau',meaning:'Moon kite',
  blurb:'A Kelantan wau bulan made of layered cut paper, ivory scrolls over gold foil over colour, with silk tassels, floating in a calm paper sky. It rises away to open.',
  fonts:{d:"'Marcellus', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-wau2" style="${wVars}"><i class="wu-sky"></i>
      <div class="wu-pk reveal">${wKite()}</div>
      <div class="wu-cardw reveal d1"><div class="wu-card">
        <p class="wu-k kicker">${ev(o,L)}</p><h1 class="wu-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <i class="wu-rule"></i><p class="wu-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="wu-ven">${esc(o.venue)}</p>`:''}</div></div>
      <a class="wu-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-wau2" style="${wVars}"><i class="wu-sky"></i>
      <div class="wu-head"><p class="wu-k">${ev(o,L)}</p><p class="wu-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="wu-d">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
      <div class="wu-fly"><i class="wu-str"></i>${wKite()}</div>
      <div class="wu-foot">${guest?`<p class="wu-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="wu-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.cssText+=';'+wVars;const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah',desc:'Red wau on a dusk-blue paper sky',c:{ground:'#2a4466',sheet:'#fbf6ea',ink:'#2a2320',accent:'#a8242c',gold:'#c9a050',pagefg:'#f3ecdf'}},
    {k:'kuning',n:'Kuning Diraja',desc:'Royal yellow wau on deep blue',c:{ground:'#1c2f52',sheet:'#fff8e8',ink:'#2a2320',accent:'#d39c1c',gold:'#c9a050',pagefg:'#f3ecdf'}},
    {k:'hijau',n:'Hijau',desc:'Emerald wau on warm clay',c:{ground:'#94543f',sheet:'#fbf6ea',ink:'#20261f',accent:'#1f5e44',gold:'#c9a050',pagefg:'#fff6ec'}},
    {k:'biru',n:'Biru',desc:'Indigo wau on a pale morning sky',c:{ground:'#c5d6e4',sheet:'#fdfaf2',ink:'#1d2533',accent:'#22407a',gold:'#b8924a',pagefg:'#1d2533'}},
    {k:'ungu',n:'Ungu',desc:'Plum wau on lilac paper',c:{ground:'#d9d0e2',sheet:'#fdf9f4',ink:'#2a2330',accent:'#6b2d5c',gold:'#b8924a',pagefg:'#2a2330'}},
    {k:'jingga',n:'Jingga',desc:'Orange wau on a sea-teal paper',c:{ground:'#2f5f6c',sheet:'#fff8ec',ink:'#2a2320',accent:'#cf6129',gold:'#d6ab55',pagefg:'#f3f0e6'}},
    {k:'malam',n:'Malam',desc:'Black-and-gold wau on night paper',c:{ground:'#131a2c',sheet:'#f6efdc',ink:'#1b1712',accent:'#7a1d2b',gold:'#cfa651',pagefg:'#efe6d0'}},
    {k:'pastel',n:'Pastel',desc:'Blush wau on a pale sky',c:{ground:'#e3e9ee',sheet:'#fffdf8',ink:'#3a2f2b',accent:'#c27482',gold:'#b5975a',pagefg:'#3a2f2b'}},
  ]});
