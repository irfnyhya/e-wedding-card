/* piksel (round 7): a handheld game console photographed on linen like a product shot. Its little screen shows a
   public-domain painting re-drawn as pixel art (Hokusai, Monet, Hassam, a Chinese album leaf), with the names in a game dialogue box.
   Cover: tap "Buka Jemputan" and the view moves into the screen until it fills the phone.
   Page: the pixel painting as a framed screen, the names, and a game menu that leads to the sections.
   Skin: matte cards with stepped pixel corners and pixel-type labels. */
needFont('Silkscreen');
// The paintings are re-drawn once in the browser: shrunk to an 80 x 72 grid, posterised with an ordered dither,
// and shown with crisp pixels. The Game Boy colourway maps the same picture to four greens.
const PX_ART={fuji:{src:'pd-paint-hokusai-fuji.jpg',box:[0,.12,1,.92]},poppies:{src:'pd-paint-monet-poppies.jpg',box:[0,.22,1,.92]},loquat:{src:'pd-asia-4.jpg',box:[.1,.02,1,.84]},
  roses:{src:'pd-still-4.jpg',box:[.12,.15,.92,.723]},bouquet:{src:'pd-bouquet.jpg',box:[.1,.12,.9,.664]},birds:{src:'pd-asia-3.jpg',box:[.1,.42,.75,.953]},
  tail:{src:'pd-asia-2.jpg',box:[.1,.12,.7,.367]},plate:{src:'pd-asia-1.webp',fit:'#e4ebf1'}};
const PX_GB=[[15,56,15],[48,98,48],[139,172,15],[155,188,15]];
let pxCss=null;   // created on first render in the browser; the engine is also imported on the server
const pxDone=new Set();
function pxMake(art,pal){const id=art+'-'+pal;if(pxDone.has(id)||!PX_ART[art]||typeof document==='undefined'||typeof Image==='undefined')return;if(!pxCss){pxCss=document.createElement('style');document.head.appendChild(pxCss)}pxDone.add(id);const a=PX_ART[art],img=new Image();
  img.onload=()=>{try{const W=80,H=72,iw=img.naturalWidth,ih=img.naturalHeight,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');
    g.imageSmoothingQuality='high';if(a.fit){g.fillStyle=a.fit;g.fillRect(0,0,W,H);const dh=H*.9,dw=dh*iw/ih;g.drawImage(img,(W-dw)/2,(H-dh)/2,dw,dh)}else g.drawImage(img,a.box[0]*iw,a.box[1]*ih,(a.box[2]-a.box[0])*iw,(a.box[3]-a.box[1])*ih,0,0,W,H);
    const d=g.getImageData(0,0,W,H),p=d.data,B=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
    for(let y=0;y<H;y++)for(let x=0;x<W;x++){const k=(y*W+x)*4,t=(B[(y%4)*4+x%4]/16-.5);
      if(pal==='gb'){const R=p[k]/255,G=p[k+1]/255,Bl=p[k+2]/255,l=(G+Bl)/2*1.1-R*.25+.1,q=Math.max(0,Math.min(3,Math.round(l*3.8-.55+t*.3))),c=PX_GB[q];p[k]=c[0];p[k+1]=c[1];p[k+2]=c[2]}
      else for(let i=0;i<3;i++){const v=p[k+i]/255,lv=6;p[k+i]=Math.round(Math.max(0,Math.min(lv,Math.round(v*lv+t*.4)))*255/lv)}}
    g.putImageData(d,0,0);const u=cv.toDataURL('image/png');pxCss.textContent+=`.inv i.px-art-${id}{background-image:url(${u})}`}catch(e){}};img.src=A+a.src}
const pxArt=(c,cls='')=>{pxMake(c.art,c.pal);return `<i class="px-art px-art-${c.art}-${c.pal} ${cls}"></i>`};
const pxVars=c=>`--shell:${c.shell};--bezel:${c.bezel};--btn:${c.btn};--surface:${c.surface}`;
const pxScreen=(o,c,L,dialog)=>`<div class="px-screen">${pxArt(c)}${dialog?`<div class="px-dlg"><b>${dialog}</b></div>`:''}<i class="px-glass"></i></div>`;
FAMILY({key:'piksel',name:'Piksel',meaning:'Pixel console',
  blurb:'A handheld game console resting on linen, its screen showing a famous painting re-drawn in pixels with your names in a dialogue box. The view moves into the screen to open the card.',
  fonts:{d:"'Silkscreen', monospace",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<section class="page pg-piksel2${c.light?' px-light':''}" style="${pxVars(c)}"><div class="px-linen"></div>
      <div class="px-frame reveal">${pxScreen(o,c,L,'')}<p class="px-cap">${esc(c.credit)}</p></div>
      <p class="px-k kicker reveal d1">${ev(o,L)}</p>
      <h1 class="px-names reveal d1">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
      <p class="px-date reveal d2">${esc(fmtDate(o.date,o.lang))}${o.venue?`<br><i>${esc(o.venue)}</i>`:''}</p>
      <nav class="px-menu reveal d3">
        <a data-go="when" href="#">${en?'Event details':'Butiran majlis'}</a>
        ${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}
        <a data-go="loc" href="#">${en?'Location':'Lokasi'}</a></nav></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    const dpad=`<i class="px-dpad"><i></i></i>`;
    return `<div class="cover cv-piksel2${c.light?' px-light':''}" style="${pxVars(c)}"><div class="px-linen"></div>
      <p class="px-k px-top">${ev(o,L)}</p>
      <div class="px-con">
        <div class="px-rim"><span>OFF</span><span>ON</span></div>
        <div class="px-bezel"><span class="px-led"></span><small class="px-bat">${en?'POWER':'KUASA'}</small>
          ${pxScreen(o,c,L,`${esc(n1)} ${en?'and':'dan'} ${esc(n2)}`)}<p class="px-model">${esc(fmtShort(o.date))}</p></div>
        <p class="px-brand"><b>Sanding</b> <span>KAD KAHWIN</span></p>
        ${dpad}<i class="px-ab b"><small>B</small></i><i class="px-ab a"><small>A</small></i>
        <i class="px-ss s1"><small>SELECT</small></i><i class="px-ss s2"><small>START</small></i>
        <i class="px-grille"></i>
      </div>
      <div class="px-foot">${guest?`<p class="px-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="px-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;pxMake(c.art,c.pal);['shell','bezel','btn','surface'].forEach(k=>el.style.setProperty('--'+k,c[k]));el.classList.toggle('px-light',!!c.light);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'malam',n:'Malam',desc:'Midnight console, a Dutch flower painting in pixels',c:{ground:'#10131d',surface:'#1b2030',sheet:'#1b2132',ink:'#e9ecf4',accent:'#e8eefc',gold:'#e46d8c',pagefg:'#e9ecf4',shell:'#2c3553',bezel:'#161a28',btn:'#d9637f',art:'roses',pal:'full',credit:'After a Dutch flower still life',cover:'#2c3553'}},
    {k:'senja',n:'Senja',desc:'Dusty-rose console, Hokusai’s red Fuji',c:{ground:'#2d1c24',surface:'#3a2630',sheet:'#33222b',ink:'#f6ebe6',accent:'#f7e6de',gold:'#e8a07f',pagefg:'#f6ebe6',shell:'#cf9f98',bezel:'#3b2a30',btn:'#9c3b45',art:'fuji',pal:'full',credit:'After Hokusai, Fine Wind, Clear Morning',cover:'#cf9f98'}},
    {k:'siang',n:'Siang',desc:'Cream console on pale blue linen, Monet’s poppy field',c:{ground:'#dbe3ea',surface:'#dfe6ec',sheet:'#f7f7f3',ink:'#2a2f38',accent:'#2a3550',gold:'#c4523f',pagefg:'#2a2f38',shell:'#e4dfd3',bezel:'#5d6272',btn:'#b8455a',art:'poppies',pal:'full',credit:'After Claude Monet, a poppy field',light:'1',cover:'#e4dfd3'}},
    {k:'gameboy',n:'Game Boy',desc:'Classic grey console, Hokusai’s Fuji in four greens',c:{ground:'#d7d6cf',surface:'#dcdbd3',sheet:'#f3f2ec',ink:'#28301f',accent:'#0f380f',gold:'#7a2a5a',pagefg:'#28301f',shell:'#c9c6bc',bezel:'#5a5d6e',btn:'#8a2f5c',art:'fuji',pal:'gb',credit:'After Hokusai, in four shades of green',light:'1',cover:'#9bbc0f'}},
    {k:'pastel',n:'Pastel',desc:'Lilac console, two bullfinches from a Japanese print',c:{ground:'#f1e6ec',surface:'#f2e8ee',sheet:'#fdf8fa',ink:'#3d2f45',accent:'#4a3560',gold:'#c9718f',pagefg:'#3d2f45',shell:'#cfc4e2',bezel:'#5b5470',btn:'#e08aa6',art:'birds',pal:'full',credit:'After a Japanese print, two bullfinches',light:'1',cover:'#cfc4e2'}},
    {k:'hutan',n:'Hutan',desc:'Forest-green console, a Dutch bouquet',c:{ground:'#121a15',surface:'#1c2720',sheet:'#1b261f',ink:'#e8f0ea',accent:'#eef5ef',gold:'#c9a35a',pagefg:'#e8f0ea',shell:'#405c4a',bezel:'#18211b',btn:'#c9a35a',art:'bouquet',pal:'full',credit:'After Jan van Huysum, flowers in a vase',cover:'#405c4a'}},
    {k:'salji',n:'Salji',desc:'White console on cool linen, a blue-and-white dish',c:{ground:'#d5dde6',surface:'#dae1e9',sheet:'#f8fafc',ink:'#253041',accent:'#2b3a55',gold:'#5b8bc0',pagefg:'#253041',shell:'#eef0f1',bezel:'#4a5266',btn:'#5b8bc0',art:'plate',pal:'full',credit:'After a blue-and-white porcelain dish',light:'1',cover:'#eef0f1'}},
    {k:'emas',n:'Emas',desc:'Mustard console, a Chinese album leaf of loquats',c:{ground:'#22190f',surface:'#2c2116',sheet:'#2a2017',ink:'#f5ecdc',accent:'#f7ead2',gold:'#d9b25a',pagefg:'#f5ecdc',shell:'#d3a94f',bezel:'#2e2418',btn:'#7a3b2a',art:'loquat',pal:'full',credit:'After a Chinese album leaf, loquats and a bird',cover:'#d3a94f'}},
  ]});
