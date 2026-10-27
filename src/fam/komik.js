/* komik (round 7): one quiet graphic-novel panel printed in two colours on newsprint.
   The art is a public-domain Japanese print of two bullfinches on a branch (pd-asia-3), screened into real halftone dots
   in the colourway's ink over a flat second colour. Lettering is hand-drawn caption caps; the names are set in a book serif.
   Cover: the printed page on a desk; tap "Buka Jemputan" and the page turns over like a leaf of the book.
   Page: the title page of chapter one, a tall panel (pd-asia-2, a long-tailed bird) beside caption boxes that lead to the sections.
   Skin: newsprint panels with an inked frame and caption-box headings. */
needFont('Kalam:wght@300;400;700');
// The art is screened once, in the browser, into a real halftone (round dots on a 45 degree screen) and kept as a mask:
// the ink colour shows through the dots, the flat second colour through the gaps. Tone: the pale paper of the print drops out,
// saturated colour (rose breasts, leaves) and the black caps read darker.
const KM_ART={birds:{src:'pd-asia-3.jpg',box:[.11,.405,.71,.975],W:600,H:624},tail:{src:'pd-asia-2.jpg',box:[.05,.13,.75,.578],W:400,H:560}};
// browser only, run once on first render (the engine is also imported on the server, where there is no document)
let kmCss=null;
const kmInit=()=>{if(kmCss||typeof document==='undefined'||typeof Image==='undefined')return;kmCss=document.createElement('style');document.head.appendChild(kmCss);
Object.entries(KM_ART).forEach(([key,a])=>{const img=new Image();img.onload=()=>{try{
  const {W,H,box}=a,iw=img.naturalWidth,ih=img.naturalHeight,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');g.filter='blur(1.2px)';
  g.drawImage(img,box[0]*iw,box[1]*ih,(box[2]-box[0])*iw,(box[3]-box[1])*ih,0,0,W,H);const px=g.getImageData(0,0,W,H).data;
  const o=document.createElement('canvas');o.width=W;o.height=H;const q=o.getContext('2d');q.fillStyle='#000';
  const P=6,c=Math.SQRT1_2,n=Math.ceil((W+H)/P)+2;
  for(let i=-n;i<n;i++)for(let j=-n;j<n;j++){const x=W/2+(i-j)*c*P,y=H/2+(i+j)*c*P;if(x<0||y<0||x>=W||y>=H)continue;
    const k=((y|0)*W+(x|0))*4,r=px[k]/255,gg=px[k+1]/255,b=px[k+2]/255,lum=.3*r+.59*gg+.11*b,sat=Math.max(r,gg,b)-Math.min(r,gg,b);
    const d=1-Math.min(1,Math.max(0,(lum-.08)/.72-sat*.5)),rad=P*.71*Math.sqrt(Math.max(0,d-.06)/.94);
    if(rad>.5){q.beginPath();q.arc(x,y,rad,0,7);q.fill()}}
  const u=o.toDataURL('image/png');kmCss.textContent+=`.inv .km-panel i.km-dots-${key}{-webkit-mask-image:url(${u});mask-image:url(${u})}`}catch(e){}};img.src=A+a.src})};
// a printed panel: flat second colour, the screened art in ink, newsprint grain, an inked frame
const kmPanel=(art,cls='',extra='')=>{kmInit();return `<div class="km-panel ${cls}"><i class="km-dots km-dots-${art}"></i><i class="km-grain"></i>${extra}</div>`}
const kmVars=c=>`--spot:${c.spot};--paper:${c.paper}`;
FAMILY({key:'komik',name:'Komik',meaning:'Graphic-novel panel',
  blurb:'A single graphic-novel panel printed in two colours on newsprint: two birds on one branch, hand-lettered captions. The page turns to open the card.',
  fonts:{d:"'Kalam', cursive",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-komik2" style="${kmVars(th.c)}"><div class="km-leaf">
      <p class="km-k kicker reveal">${ev(o,L)}</p>
      <h1 class="km-names reveal d1">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
      <div class="km-grid reveal d2">${kmPanel('tail','tall')}
        <div class="km-stack">
          <p class="km-cap"><small>${en?'The day':'Harinya'}</small>${esc(fmtDate(o.date,o.lang))}</p>
          <p class="km-cap"><small>${en?'From':'Mulai'}</small>${esc(fmtTime(o.start,o.lang))}</p>
          ${o.venue?`<p class="km-cap"><small>${en?'At':'Di'}</small>${esc(o.venue)}</p>`:''}<p class="km-more">${en?'To be continued…':'Bersambung di majlis kami…'}</p></div></div>
      <div class="km-tiles reveal d3">
        <a class="km-tile" data-go="when" href="#">${en?'Details':'Butiran'} <i>→</i></a>
        ${o.x_rsvp?`<a class="km-tile" data-go="rsvp" href="#">RSVP <i>→</i></a>`:''}
        <a class="km-tile" data-go="loc" href="#">${en?'Location':'Lokasi'} <i>→</i></a></div>
</div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-komik2" style="${kmVars(th.c)}"><div class="km-desk"></div>
      <div class="km-sheet"><div class="km-sheetin">
        <div class="km-head"><span>${ev(o,L)}</span><span>${esc(fmtShort(o.date))}</span></div>
        ${kmPanel('birds','',`<p class="km-cap km-c1">${en?'Two hearts,<br>one branch.':'Dua hati,<br>satu dahan.'}</p>`)}
        <p class="km-cn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p>
        <p class="km-more">${en?'To be continued…':'Bersambung…'}</p></div><i class="km-turn"></i></div>
      <div class="km-foot">${guest?`<p class="km-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="km-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){kmInit();K.cards(el);el.style.setProperty('--spot',th.c.spot);el.style.setProperty('--paper',th.c.paper);el.classList.toggle('km-dark',!!th.c.dark);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  // two inks per colourway: ink (line and halftone) and spot (the flat second colour)
  themes:[
    {k:'klasik',n:'Klasik',desc:'Black and vermilion on newsprint',c:{ground:'#e4d9c2',sheet:'#f4ecd9',paper:'#f4ecd9',ink:'#1e1c1a',accent:'#1e1c1a',spot:'#d0573a',gold:'#d0573a',pagefg:'#2a2622',cover:'#d0573a'}},
    {k:'pop',n:'Pop',desc:'Navy and rose on white newsprint',c:{ground:'#ece2df',sheet:'#f8f2ea',paper:'#f8f2ea',ink:'#1f2a48',accent:'#1f2a48',spot:'#e2788f',gold:'#e2788f',pagefg:'#1f2a48',cover:'#e2788f'}},
    {k:'noir',n:'Noir',desc:'Black ink and a red spot, on a dark desk',c:{ground:'#121212',sheet:'#ecebe5',paper:'#ecebe5',ink:'#141414',accent:'#141414',spot:'#b5313a',gold:'#b5313a',pagefg:'#ecebe5',dark:'1',cover:'#b5313a'}},
    {k:'pastel',n:'Pastel',desc:'Plum ink and blush on cream',c:{ground:'#f1e2e2',sheet:'#fcf5ef',paper:'#fcf5ef',ink:'#3e2d3c',accent:'#3e2d3c',spot:'#eaa7b4',gold:'#eaa7b4',pagefg:'#3e2d3c',cover:'#eaa7b4'}},
    {k:'laut',n:'Laut',desc:'Deep teal and orange, on a teal desk',c:{ground:'#0f2e38',sheet:'#f2ebdb',paper:'#f2ebdb',ink:'#123844',accent:'#123844',spot:'#e48a4e',gold:'#e48a4e',pagefg:'#efe7d6',dark:'1',cover:'#e48a4e'}},
    {k:'ungu',n:'Ungu',desc:'Aubergine and lilac, on a plum desk',c:{ground:'#221a31',sheet:'#f4eff0',paper:'#f4eff0',ink:'#2d2142',accent:'#2d2142',spot:'#a98ad8',gold:'#a98ad8',pagefg:'#eee8f2',dark:'1',cover:'#a98ad8'}},
    {k:'vintaj',n:'Vintaj',desc:'Sepia and brick on aged paper',c:{ground:'#3b2a1c',sheet:'#ecdfc2',paper:'#ecdfc2',ink:'#3a2617',accent:'#3a2617',spot:'#b9583a',gold:'#b9583a',pagefg:'#efe2c6',dark:'1',cover:'#b9583a'}},
    {k:'hijau',n:'Hijau',desc:'Forest green and mustard on cream',c:{ground:'#dfe4d2',sheet:'#f6f2e4',paper:'#f6f2e4',ink:'#1f3527',accent:'#1f3527',spot:'#d6a23e',gold:'#d6a23e',pagefg:'#1f3527',cover:'#d6a23e'}},
  ]});
