/* angsa: "Tasik Angsa". A keepsake box covered in moiré silk, seen from above. Set into its lid, on an oval of Belgian
   needle lace (public domain), is a small painted lake (Monet's water lilies / Hassam's water garden; public domain) in a
   gilt bezel ringed with seed pearls; a foiled swan sits above it. A satin ribbon runs round the lid, a gilt-edged name
   card rests on it, and a ribbon pull-tab at the front reads "Buka Jemputan".
   Cover: tap the lid and it lifts off the box, showing the card lying on tissue inside.
   Page: the inside of the box: the card on tissue, the lake cameo, the lace and a strand of pearls laid beside it.
   Skin: gilt-edged cream cards on silk, a script heading over a short row of pearls. */
needFont('Alex+Brush');
let agN=0;
// a ring of seed pearls round an ellipse (in a 100 x 100*k box), each lit from the top left
const agPearls=(n,rx,ry,k)=>{const id='agp'+(++agN);let s='';for(let i=0;i<n;i++){const a=i/n*Math.PI*2;s+=`<circle cx="${(50+Math.cos(a)*rx).toFixed(2)}" cy="${(50*k+Math.sin(a)*ry).toFixed(2)}" r="1.6" fill="url(#${id})"/>`}
  return `<svg class="ags-pearls" viewBox="0 0 100 ${100*k}" aria-hidden="true"><defs><radialGradient id="${id}" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#f4efe8"/><stop offset=".85" stop-color="#cfc4b8"/><stop offset="1" stop-color="#a99d92"/></radialGradient></defs>${s}</svg>`};
// a single swan, foil-stamped: body, raised wing, curved neck
const AG_SWAN=`<svg class="ags-swan" viewBox="0 0 64 40" aria-hidden="true"><path d="M20 30.5C24 36 44 37.5 55 28.5C51 29.2 47.5 28.4 45.5 26.4C49.5 26.8 53 25.2 55.5 22C49 22.4 42 22 37 25C33 27.5 27 29.8 20 30.5Z"/><path d="M41.5 26C45 21 50 17.5 58 16.5C53.5 19.5 50 22.8 47.5 26.5Z" opacity=".85"/><path class="n" d="M21.5 30C16 25.5 14.5 18.5 17 12.5C18.8 8.3 23.6 7.8 24.6 11"/><path d="M24.2 9.6C25.2 9.9 25.9 10.8 26 11.9L30.4 13.4L25.4 13.2C24.6 13.4 23.6 12.9 23.3 11.8Z"/><path class="w" d="M8 34.5C18 33 26 36.5 36 35.6C44 35 50 33 58 33.6"/></svg>`;
const agDP=o=>{const d=new Date((o.date||'')+'T00:00:00');if(isNaN(d))return null;return {d:d.getDate(),y:d.getFullYear(),mon:MONTHS[o.lang][d.getMonth()],day:DAYS[o.lang][d.getDay()]}};
const agCameo=(cls)=>`<span class="ags-cameo ${cls||''}"><span class="ags-lake"></span>${agPearls(96,46.5,46.5*1.26,1.26)}</span>`;
const agVars=c=>`--silk:${c.silk};--rib:${c.rib};--art:url(${A}${c.art});--ap:${c.ap}`;
FAMILY({key:'angsa',name:'Tasik Angsa',meaning:'Keepsake box',
  blurb:'A silk keepsake box with a painted lake set in pearls and lace on its lid, a satin ribbon and a gilt-edged name card. The lid lifts to open it.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Alex Brush', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',c=th.c,[n1,n2]=coverNames(o),p=agDP(o),t=[fmtTime(o.start,o.lang),fmtTime(o.end,o.lang)].filter(Boolean).join(' – ');
    return `<section class="page pg-angsa${c.dark?' ags-dk':''}" style="${agVars(c)}"><i class="ags-ground"></i>
      <div class="ags-inbox reveal"><i class="ags-tissue"></i>
        <img class="ags-lace pg" src="${A}pd-obj-lace-oval.webp" alt="">
        <img class="ags-strand" src="${A}pd-obj-pearls.webp" alt="">
        <div class="ags-card">
          ${agCameo('pg')}
          ${o.bismillah?`<p class="ags-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
          <p class="ags-k kicker">${ev(o,L)}</p>
          <h1 class="ags-names names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
          ${p?`<p class="ags-date"><span>${esc(p.day)}</span><b>${p.d}</b><span>${esc(p.mon)} ${p.y}</span></p>`:''}
          ${o.hijri?`<p class="ags-sm">${esc(o.hijri)}</p>`:''}${t?`<p class="ags-sm">${esc(t)}</p>`:''}
          ${o.venue?`<p class="ags-ven">${esc(o.venue)}</p>`:''}
          <div class="ags-links"><a data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}<a data-go="loc" href="#">${en?'Location':'Lokasi'}</a></div>
        </div>
      </div>
    </section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c,[n1,n2]=coverNames(o),p=agDP(o);
    return `<div class="cover cv-angsa${c.dark?' ags-dk':''}" style="${agVars(c)}"><i class="ags-ground"></i>
      <div class="ags-box">
        <div class="ags-base"><i class="ags-tissue"></i><span class="ags-incard"><span class="ags-k">${ev(o,L)}</span><span class="ags-ln">${esc(n1)}<br><i>&amp;</i> ${esc(n2)}</span></span></div>
        <${tag} class="ags-lid" ${attr}>
          <span class="ags-silk"></span><span class="ags-pipe"></span>
          <img class="ags-lace" src="${A}pd-obj-lace-oval.webp" alt="">
          ${agCameo()}
          ${AG_SWAN}
          <span class="ags-rib"></span>
          <span class="ags-label">
            <span class="ags-k">${ev(o,L)}</span>
            <span class="ags-ln">${esc(n1)} <i>&amp;</i> ${esc(n2)}</span>
            ${p?`<span class="ags-ld">${p.d} · ${esc(p.mon)} · ${p.y}</span>`:''}
            ${guest?`<span class="ags-to"><small>${L.dear}</small><b>${esc(guest)}</b></span>`:''}
          </span>
          <span class="ags-tab"><span>${en?'Open invitation':'Buka Jemputan'}</span></span>
        </${tag}>
      </div>
    </div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;['silk','rib'].forEach(k=>el.style.setProperty('--'+k,c[k]));el.classList.toggle('ags-dk',!!c.dark);
    const pg=$('.pg-angsa',el),ph=pg&&$('.couple-ph.front',pg),img=ph&&$('img',ph),lake=pg&&$('.ags-cameo .ags-lake',pg);
    // with a couple photo, the photo takes the lake's place inside the pearls
    if(img&&lake){img.className='ags-photo';img.removeAttribute('style');lake.appendChild(img);ph.remove()}
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Blush silk box, rose ribbon, a lily pond',c:{ground:'#f2e6e3',sheet:'#fffaf6',ink:'#40303a',accent:'#97506a',gold:'#c9a46c',pagefg:'#40303a',silk:'#efd6d6',rib:'#b06a7e',art:'pd-monet.jpg',ap:'30% 80%'}},
    {k:'lavender',n:'Lavender',desc:'Lilac silk, violet ribbon',c:{ground:'#ebe5f0',sheet:'#fdfbfe',ink:'#363049',accent:'#65538f',gold:'#c3a872',pagefg:'#363049',silk:'#e0d7ee',rib:'#7a67a6',art:'pd-monet.jpg',ap:'70% 70%'}},
    {k:'biru',n:'Biru Kabus',desc:'Mist blue silk, a pale morning lake',c:{ground:'#e4ebf0',sheet:'#fbfdfe',ink:'#29343f',accent:'#45668a',gold:'#bfa36c',pagefg:'#29343f',silk:'#d6e2ed',rib:'#58799e',art:'pd-monet.jpg',ap:'20% 90%'}},
    {k:'pic',n:'Pic',desc:'Peach silk, a golden-hour pond',c:{ground:'#f6e8dd',sheet:'#fffbf7',ink:'#41302b',accent:'#a55c44',gold:'#cda06a',pagefg:'#41302b',silk:'#f3dac8',rib:'#c27a5d',art:'pd-monet.jpg',ap:'50% 60%'}},
    {k:'gading',n:'Gading',desc:'Ivory silk, gold ribbon, a water garden',c:{ground:'#eeeadf',sheet:'#fffdf8',ink:'#37332c',accent:'#6e5d36',gold:'#bf9f5e',pagefg:'#37332c',silk:'#eee7d8',rib:'#b89a5e',art:'pd-paint-hassam-water.jpg',ap:'50% 85%'}},
    {k:'mawar',n:'Mawar',desc:'Rose silk, deep pink ribbon',c:{ground:'#f0dcde',sheet:'#fff8f8',ink:'#432a31',accent:'#8a3a54',gold:'#c79b6a',pagefg:'#432a31',silk:'#ebc8cf',rib:'#93405a',art:'pd-monet.jpg',ap:'60% 85%'}},
    {k:'sage',n:'Sage',desc:'Sage silk, a green morning pond',c:{ground:'#e4e9df',sheet:'#fbfcf8',ink:'#2e3a30',accent:'#536d4b',gold:'#bda26a',pagefg:'#2e3a30',silk:'#dce4d3',rib:'#6c8a62',art:'pd-paint-hassam-water.jpg',ap:'30% 90%'}},
    {k:'malam',n:'Malam',desc:'Plum silk box at night, a moonlit pond',c:{ground:'#2b2130',sheet:'#fdf8fb',ink:'#382c3a',accent:'#7d4a72',gold:'#cfae74',pagefg:'#f6ecf3',silk:'#4b3352',rib:'#caa3bf',art:'pd-monet.jpg',ap:'50% 70%',dark:1}},
  ]});
