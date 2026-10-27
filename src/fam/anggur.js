/* anggur: "Baldu Anggur". A keepsake invitation box covered in crushed grape-coloured velvet, standing on draped satin.
   The lid has an oval window with a bevelled gilt rim; behind it a cotton card with a gold-foil laurel crest and the names.
   A gold-and-pearl necklace (Met Museum, CC0) lies across one corner. On the box's front a small brass label holder holds a
   slip with the guest's name: that is what the guest touches.
   Cover: the lid lifts on its hinge and swings up out of view, showing the card lying in the satin bed.
   Page: looking into the open box: the satin-lined lid behind, the card in its bed, three silk ribbon markers for the details.
   Skin: cotton cards set in a velvet mount, Italiana capitals under a small foil laurel. */
needFont('Great+Vibes');needFont('Italiana');
// a laurel wreath (two branches meeting under the monogram), drawn white for use as a mask over gold foil
const AG_WREATH=(()=>{let g='';const n=11;
  [1,-1].forEach(sd=>{let d='';const X=x=>sd>0?x:100-x;
    for(let i=0;i<=n;i++){const t=(96+i*13.2)*Math.PI/180,x=50+40*Math.cos(t),y=52+40*Math.sin(t),al=t*180/Math.PI+90;
      d+=(i?'L':'M')+X(x).toFixed(2)+' '+y.toFixed(2);
      if(i>0){[1,-1].forEach(o=>{const lx=x+o*Math.cos(t)*3.4,ly=y+o*Math.sin(t)*3.4;
        g+=`<ellipse cx="${X(lx).toFixed(2)}" cy="${ly.toFixed(2)}" rx="1.7" ry="4.4" transform="rotate(${(sd>0?al+o*32-90+180:-(al+o*32-90+180)).toFixed(1)} ${X(lx).toFixed(2)} ${ly.toFixed(2)})"/>`})}}
    g+=`<path d="${d}" fill="none" stroke="#fff" stroke-width=".9"/>`});
  return svgUriSq(`<svg ${NS} viewBox="0 0 100 100"><g fill="#fff">${g}<path d="M43 93l7-3.2 7 3.2-7 2.6z"/><circle cx="50" cy="7.6" r="1.5"/></g></svg>`)})();
const agMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="agr-ini jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `<span class="agr-ini">${esc(a)}<i>&amp;</i>${esc(b)}</span>`};
const agCrest=(o,cls='')=>`<div class="agr-crest ${cls}"><i class="agr-wreath" style="-webkit-mask-image:${AG_WREATH};mask-image:${AG_WREATH}"></i>${agMono(o)}</div>`;
const agNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="agr-names"><span>${esc(n1)}</span><em>&amp;</em><span>${esc(n2)}</span></${tag}>`};
const agVars=c=>`--vel:${c.vel};--satin:${c.satin};--rib:${c.rib}`;
const AG_PEARLS=`<img class="agr-pearls" src="${A}pd-obj-pearls.webp" alt="">`;
const agSatin=`<i class="agr-satin"></i>`;
FAMILY({key:'anggur',name:'Baldu Anggur',meaning:'Velvet keepsake box',
  blurb:'A keepsake box in crushed grape velvet on draped satin, the names on a card behind an oval gilt window, pearls across one corner and the guest’s name in a brass label holder. The lid lifts to open.',
  fonts:{d:"'Italiana', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-anggur ${c.light?'agr-light':''}" style="${agVars(c)}">${agSatin}
      <div class="agr-open-box"><div class="agr-lining">${agCrest(o,'alin')}</div>
        <div class="agr-tray"><div class="agr-bed">
          <div class="agr-card apc reveal"><div class="agr-cin">${agCrest(o)}${o.bismillah?'<p class="agr-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
            <p class="agr-k kicker">${ev(o,L)}</p>${agNames(o,'h1')}
            <p class="agr-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="agr-hj">${esc(o.hijri)}</p>`:''}
            ${o.venue?`<p class="agr-ven">${esc(o.venue)}</p>`:''}</div></div>
          <div class="agr-marks reveal d2"><a data-go="when" href="#">${en?'Details':'Butiran'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP</a>`:''}<a data-go="loc" href="#">${en?'Location':'Lokasi'}</a></div>
        </div></div></div>${AG_PEARLS}</section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-anggur ${c.light?'agr-light':''}" style="${agVars(c)}">${agSatin}
      <div class="agr-box">
        <div class="agr-inside"><div class="agr-card aic"><div class="agr-cin">${agCrest(o)}${agNames(o)}</div></div></div>
        <div class="agr-front"><${tag} class="agr-holder" ${attr}><span class="agr-slip">${guest?`<small>${L.dear}</small><b>${esc(guest)}</b>`:''}<em>${en?'Open invitation':'Buka Jemputan'}</em></span></${tag}></div>
        <div class="agr-lid"><div class="agr-lidtop"><div class="agr-win"><div class="agr-card awc"><div class="agr-cin">${agCrest(o)}<p class="agr-k">${ev(o,L)}</p>${agNames(o)}<p class="agr-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div></div></div><i class="agr-lidin"></i></div>
      </div>${AG_PEARLS}</div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('agr-light',!!c.light);el.style.setProperty('--vel',c.vel);el.style.setProperty('--satin',c.satin);el.style.setProperty('--rib',c.rib);
    $$('.sheet > .sec > h2',el).forEach(h=>{if(!h.previousElementSibling||!h.previousElementSibling.classList.contains('agr-mini'))h.insertAdjacentHTML('beforebegin',`<i class="agr-mini" style="-webkit-mask-image:${AG_WREATH};mask-image:${AG_WREATH}"></i>`)});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'marun',n:'Anggur',desc:'Grape velvet box on burgundy satin',c:{ground:'#2a0d17',satin:'#3e1220',vel:'#4e1430',sheet:'#f8f1e4',ink:'#3a1f24',accent:'#5e1838',gold:'#c09a52',pagefg:'#f5e6da',rib:'#5e1838'}},
    {k:'delima',n:'Delima',desc:'Pomegranate velvet box on crimson satin',c:{ground:'#3a0b12',satin:'#52121c',vel:'#6a1222',sheet:'#fbf3ea',ink:'#3c1c20',accent:'#7e1a28',gold:'#c49a56',pagefg:'#f8e8e0',rib:'#7e1a28'}},
    {k:'ungu',n:'Ungu',desc:'Plum velvet box on aubergine satin',c:{ground:'#1f0c1e',satin:'#2e1430',vel:'#4a1d46',sheet:'#f8f2ec',ink:'#36222f',accent:'#56204c',gold:'#c09a5e',pagefg:'#f2e4ec',rib:'#56204c'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald velvet box on deep green satin',c:{ground:'#0a2019',satin:'#103026',vel:'#14453a',sheet:'#f7f2e5',ink:'#1f3029',accent:'#174a3a',gold:'#c09c56',pagefg:'#e8eee2',rib:'#174a3a'}},
    {k:'nila',n:'Nila',desc:'Midnight velvet box on navy satin',c:{ground:'#0c1328',satin:'#141e3c',vel:'#1d2b58',sheet:'#f7f6f2',ink:'#222838',accent:'#24346a',gold:'#bea468',pagefg:'#e8ebf3',rib:'#24346a'}},
    {k:'hitam',n:'Hitam',desc:'Black velvet box, grape ribbon, charcoal satin',c:{ground:'#0f0d0e',satin:'#1c191b',vel:'#1e1a1d',sheet:'#f7f1e6',ink:'#2a2224',accent:'#4e1a34',gold:'#c09a56',pagefg:'#efe5dc',rib:'#4e1a34'}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose velvet box on blush satin',c:{ground:'#e8d2cc',satin:'#e2c4bc',vel:'#a86a74',sheet:'#fdf7f2',ink:'#3e2526',accent:'#7a2a3c',gold:'#a8834c',pagefg:'#2e1a1c',rib:'#7a2a3c',light:1}},
    {k:'sage',n:'Sage',desc:'Sage velvet box on pale linen satin',c:{ground:'#dfe2d4',satin:'#d3d8c6',vel:'#7a8a6e',sheet:'#fbf9f1',ink:'#27302a',accent:'#3a4d38',gold:'#a58c52',pagefg:'#1f271f',rib:'#3a4d38',light:1}},
  ]});
