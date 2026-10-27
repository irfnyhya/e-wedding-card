/* rococo: "Kotak Mutiara". A keepsake box rather than a card: a shallow box whose lid is covered in pastel moire
   silk and edged with gilt paper. Set into the lid is a cream oval card framed by an antique Belgian needle-lace
   doily, the names written in a swash script. A woven silk ribbon wraps the box and runs through a small gilt plaque,
   a cotton tag with the guest's name hangs from it, and an antique seed-pearl necklace lies across the corner.
   Cover: tap the plaque and the lid lifts away. Page: the open box from above, the invitation resting on tissue
   with the pearls. Skin: cream cards with concave rococo corners, script headings over a row of pearls. */
needFont('Monsieur+La+Doulaise');
const rcFitP=o=>{const [a,b]=coverNames(o);const n=Math.max(String(a).length,String(b).length,1);return `font-size:${Math.min(13,104/n).toFixed(2)}cqi`};
const rcFit=o=>{const [a,b]=coverNames(o);const n=Math.max(String(a).length,String(b).length,1);return `font-size:${Math.min(11,78/n).toFixed(2)}cqi`};
const rcNames=(o,tag,st='')=>{const [n1,n2]=coverNames(o);return `<${tag} class="rc-names"${st?` style="${st}"`:''}><span>${esc(n1)}</span><em>${o.lang==='en'?'and':'dan'}</em><span>${esc(n2)}</span></${tag}>`};
const rcVars=c=>`--lid:${c.lid};--lining:${c.lining||c.lid};--rcdamask:${rcDamask(c)}`;
// lining paper: a small damask repeat in fine gold line
const rcDamask=c=>K.uri(`<svg ${NS} width="40" height="56" viewBox="0 0 40 56"><g fill="none" stroke="${c.gold}" stroke-width=".6" opacity=".75"><path d="M20 6C27 14 27 22 20 28C13 22 13 14 20 6Z"/><path d="M20 28C24 34 30 34 32 30M20 28C16 34 10 34 8 30"/><path d="M20 12V24"/><path d="M0 50C6 46 6 40 0 36M40 50C34 46 34 40 40 36"/></g><circle cx="20" cy="48" r="1.2" fill="${c.gold}" opacity=".7"/></svg>`);
const rcRose=(n,st)=>`<img class="rc-fl" src="${A}flower-${n}.webp" alt="" style="${st}">`;
FAMILY({key:'rococo',name:'Kotak Mutiara',meaning:'Silk keepsake box',
  blurb:'A silk-covered keepsake box with a lace-framed oval card set in the lid, a woven ribbon, a name tag and antique pearls. The lid lifts away to show the invitation inside.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Monsieur La Doulaise', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const en=o.lang==='en',c=th.c,[d,m,y]=fmtShort(o.date).split('.');
    return `<section class="page pg-rococo${c.dark?' rc-dark':''}" style="${rcVars(c)}"><i class="rc-silk"></i>
      <div class="rc-base"><i class="rc-tissue"></i></div>
      <img class="rc-pearls pg" src="${A}pd-obj-pearls.webp" alt="">
      <img class="rc-pressed" src="${A}pd-obj-pressed-flower.webp" alt="">
      <div class="rc-card reveal">
        ${o.bismillah?`<p class="rc-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
        <p class="rc-k kicker">${ev(o,L)}</p>
        ${rcNames(o,'h1',rcFitP(o))}
        <div class="rc-date"><span>${esc(fmtDate(o.date,o.lang).split(',')[0])}</span><b>${esc(d)}</b><span>${esc(fmtDate(o.date,o.lang,false).replace(/^\d+\s*/,''))}</span></div>
        ${o.hijri?`<p class="rc-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="rc-ven">${esc(o.venue)}</p>`:''}
        <div class="rc-pills"><a class="rc-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="rc-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c,[d,m,y]=fmtShort(o.date).split('.');
    return `<div class="cover cv-rococo${c.dark?' rc-dark':''}" style="${rcVars(c)}"><i class="rc-silk"></i>
      ${c.dark?'':rcRose(c.fl||'blush-rose','left:-14cqi;top:54%;width:46cqi;transform:rotate(-24deg)')}
      <div class="rc-boxwrap">
        <div class="rc-tray"><i class="rc-inner"></i><i class="rc-tissue"></i><div class="rc-tcard"><p class="rc-k">${ev(o,L)}</p>${rcNames(o,'p',rcFit(o))}</div><img class="rc-tpress" src="${A}pd-obj-pressed-flower.webp" alt=""></div>
        <div class="rc-lid">
          <div class="rc-top">
            <div class="rc-oval"><img class="rc-lace" src="${A}pd-obj-lace-oval.webp" alt=""><div class="rc-ovc">
              <p class="rc-k">${ev(o,L)}</p>${rcNames(o,'p',rcFit(o))}<p class="rc-cd">${esc(d)} <i>·</i> ${esc(m)} <i>·</i> ${esc(y)}</p></div></div>
          </div>
          <div class="rc-ribbon"></div>
          <img class="rc-pearls" src="${A}pd-obj-pearls.webp" alt="">
        </div>
      </div>
      ${guest?`<div class="rc-tag"><i class="rc-string"></i><p><small>${L.dear}</small><b>${esc(guest)}</b></p></div>`:''}
      <${tag} class="rc-open" ${attr}><span>${en?'Open invitation':'Buka Jemputan'}</span></${tag}>
    </div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('rc-dark',!!c.dark);el.style.setProperty('--lid',c.lid);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'merah',n:'Merah Bata',desc:'Rose-brick silk box on blush silk',c:{ground:'#ead6cf',sheet:'#fbf4ea',ink:'#4a2a22',accent:'#8a3b2c',gold:'#b08850',pagefg:'#4a2a22',lid:'#c98f86',fl:'cabbage-rose'}},
    {k:'jambu',n:'Jambu',desc:'Blush silk box on pale pink silk',c:{ground:'#f1e1de',sheet:'#fdf7f2',ink:'#4a2a32',accent:'#9a4258',gold:'#b8935a',pagefg:'#4a2a32',lid:'#e6b9bf',fl:'blush-rose'}},
    {k:'perang',n:'Perang',desc:'Cafe-au-lait silk box on linen',c:{ground:'#e2d6c2',sheet:'#fbf5e8',ink:'#3e2e20',accent:'#6b4a2e',gold:'#a8854c',pagefg:'#3e2e20',lid:'#c7ab8a',fl:'wild-rose'}},
    {k:'sage',n:'Sage',desc:'Sage silk box on cream silk',c:{ground:'#e2e5d8',sheet:'#fbf8ee',ink:'#2f3628',accent:'#4f6b44',gold:'#a8904f',pagefg:'#2a3024',lid:'#a9b897',fl:'white-roses'}},
    {k:'biru',n:'Biru',desc:'Powder-blue silk box on pearl silk',c:{ground:'#e1e6ec',sheet:'#fbf9f3',ink:'#24304a',accent:'#2f4672',gold:'#a88d55',pagefg:'#22304a',lid:'#a9bdd3',fl:'blush-rose'}},
    {k:'marun',n:'Marun',desc:'Wine silk box on wine velvet',c:{ground:'#33121a',sheet:'#fbf3e8',ink:'#4a2a22',accent:'#8a3226',gold:'#c09a5c',pagefg:'#f3e2d6',lid:'#7c2a36',dark:1}},
    {k:'hitam',n:'Hitam',desc:'Black silk box on black velvet',c:{ground:'#151313',sheet:'#faf3e6',ink:'#3e2e20',accent:'#73422c',gold:'#c4a064',pagefg:'#eee3d0',lid:'#2c2726',dark:1}},
    {k:'nila',n:'Nila',desc:'Navy silk box on midnight velvet',c:{ground:'#161d33',sheet:'#fbf8f0',ink:'#24304a',accent:'#2c4270',gold:'#c2a266',pagefg:'#e6e9f2',lid:'#2c3a62',dark:1}},
  ]});
