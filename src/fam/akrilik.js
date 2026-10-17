/* akrilik: an arched clear acrylic panel with mirror-gold lettering and white-ink florals, floating over a soft
   blurred floral backdrop with its shadow; on the cover it sits in a frosted sleeve.
   Opening: the panel slides up out of the sleeve as the sleeve drops away. Page: the panel standing, names in mirror gold.
   Skin: frosted-glass cards over soft colour, mirror-gold headings. */
let uid=0;
const vv=c=>`--blob1:${c.blob1};--blob2:${c.blob2};--inkw:${c.inkw}`;
const lines=(c,id=++uid)=>`<svg class="ak-lines" viewBox="0 0 100 150" preserveAspectRatio="none" fill="none"><path d="M6 146V50A44 44 0 0 1 94 50V146Z" stroke="url(#akg${id})" stroke-width="1.2" vector-effect="non-scaling-stroke"/><path d="M9 143V50.5A41 41 0 0 1 91 50.5V143Z" stroke="url(#akg${id})" stroke-width=".6" vector-effect="non-scaling-stroke"/>
  <defs><linearGradient id="akg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3c8"/><stop offset=".3" stop-color="${c.gold}"/><stop offset=".5" stop-color="#6e4c16"/><stop offset=".7" stop-color="#f6dc96"/><stop offset="1" stop-color="${c.gold}"/></linearGradient></defs></svg>`;
function backdrop(th){const c=th.c;return `<div class="ak-bd"><i class="ak-blob a"></i><i class="ak-blob b"></i>
  ${FL(th.fl,'width:56%;left:-24%;top:-7%;transform:rotate(-18deg)','ak-fl')}${FL(th.fl2,'width:52%;right:-24%;bottom:-6%;transform:rotate(160deg)','ak-fl')}${FL(th.fl,'width:30%;right:-12%;top:8%;transform:rotate(40deg)','ak-fl b')}</div>`}
function panel(o,th,L,full){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
  return `<span class="ak-pan">${lines(c)}
   ${ENG(th.eng,'width:38%;left:-9%;bottom:-3%;transform:rotate(12deg)','ak-ink')}${ENG(th.eng,'width:30%;right:-2%;top:16%;transform:scaleX(-1) rotate(-30deg)','ak-ink')}
   <span class="ak-in"><span class="ak-k ak-mg">${ev(o,L)}</span><span class="ak-n ak-mg">${esc(n1)}<i>&amp;</i>${esc(n2)}</span>
    <span class="ak-rule"><i></i><b></b><i></i></span><span class="ak-d ak-mg">${esc(fmtDate(o.date,o.lang))}</span>
    ${o.hijri?`<span class="ak-hj ak-mg">${esc(o.hijri)}</span>`:''}${full?`<span class="ak-v ak-mg">${esc(o.venue)}</span><span class="ak-t ak-mg">${en?'From':'Mulai'} ${esc(fmtTime(o.start,o.lang))}</span>`:`<span class="ak-v ak-mg">${esc(o.venue)}</span>`}</span>
   <span class="ak-glare"></span></span>`}
FAMILY({key:'akrilik',name:'Akrilik',meaning:'Acrylic card',
  blurb:'A clear arched acrylic card with mirror-gold lettering, floating over soft flowers in a frosted sleeve.',
  fonts:{d:"'Marcellus', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){return `<section class="page pg-akrilik" style="${vv(th.c)}">${backdrop(th)}<div class="ak-stand reveal"><span class="ak-sh"></span>${panel(o,th,L,true)}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-akrilik" style="${vv(th.c)}">${backdrop(th)}
     <${tag} class="ak-btn" ${attr} aria-label="${L.open}"><span class="ak-sh"></span>${panel(o,th,L,false)}
      <span class="ak-sleeve"><span class="ak-sl-in">${guest?`<span class="ak-to"><span>${L.dear}</span><b>${esc(guest)}</b></span>`:`<span class="ak-to"><b>${esc(coverNames(o).join(' & '))}</b></span>`}
       <span class="ak-sl-rule"></span><span class="ak-hint">${en?'Touch to slide the card out':'Sentuh untuk menarik kad keluar'}</span></span></span></${tag}></div>`},
  skin(el,o,th){K.cards(el);['blob1','blob2','inkw'].forEach(k=>el.style.setProperty('--'+k,th.c[k]));$$('.sheet > .sec h2',el).forEach(h=>h.classList.add('ak-mg'))},
  themes:[
    {k:'putih',n:'Putih',desc:'Ivory and blush, white roses',extra:{fl:'white-roses',fl2:'blush-rose',eng:'white-roses'},c:{ground:'#efe6df',sheet:'#fffdfb',ink:'#3a2f2a',accent:'#8a6a3a',gold:'#c9a053',pagefg:'#3a2f2a',blob1:'#f4d9cf',blob2:'#e9e2d2',inkw:'#ffffff'}},
    {k:'sage',n:'Sage',desc:'Sage green with jasmine',extra:{fl:'jasmine',fl2:'white-roses',eng:'jasmine'},c:{ground:'#d5ddcf',sheet:'#fbfcf8',ink:'#26302a',accent:'#4d6650',gold:'#bf9a4c',pagefg:'#26302a',blob1:'#b9c9b0',blob2:'#eef0e4',inkw:'#ffffff',line:'rgba(77,102,80,.22)'}},
    {k:'biru',n:'Biru',desc:'Powder blue with forget-me-nots',extra:{fl:'forget-me-not',fl2:'white-roses',eng:'forget-me-not'},c:{ground:'#d9e4ee',sheet:'#fbfdfe',ink:'#1f2c3a',accent:'#3c5e86',gold:'#c4a05a',pagefg:'#1f2c3a',blob1:'#b9cde2',blob2:'#f2f0ea',inkw:'#ffffff',line:'rgba(60,94,134,.2)'}},
    {k:'jambu',n:'Jambu',desc:'Rose pink with peonies',extra:{fl:'pink-rose',fl2:'blush-rose',eng:'pink-rose'},c:{ground:'#f2d9db',sheet:'#fffafa',ink:'#3a2629',accent:'#a24a5c',gold:'#c79a5a',pagefg:'#3a2629',blob1:'#eab8c0',blob2:'#f7ece6',inkw:'#ffffff',line:'rgba(162,74,92,.2)'}},
    {k:'pic',n:'Pic',desc:'Peach and apricot roses',extra:{fl:'wild-rose',fl2:'blush-rose',eng:'wild-rose'},c:{ground:'#f5dfcf',sheet:'#fffbf7',ink:'#3a2a22',accent:'#b0603a',gold:'#c9974e',pagefg:'#3a2a22',blob1:'#f0c3a4',blob2:'#f8efe4',inkw:'#ffffff',line:'rgba(176,96,58,.2)'}},
    {k:'ungu',n:'Ungu',desc:'Lavender with irises',extra:{fl:'iris',fl2:'anemones',eng:'iris'},c:{ground:'#e2dbeb',sheet:'#fdfbff',ink:'#2e2638',accent:'#6a4f8a',gold:'#c4a15e',pagefg:'#2e2638',blob1:'#cbbde0',blob2:'#f1eef4',inkw:'#ffffff',line:'rgba(106,79,138,.2)'}},
    {k:'malam',n:'Malam',desc:'Midnight navy, white lotus',extra:{fl:'lotus',fl2:'white-roses',eng:'lotus'},c:{ground:'#18223a',sheet:'#f7f5f0',ink:'#1d2333',accent:'#2c3d6a',gold:'#d8b464',pagefg:'#eef0f5',blob1:'#2c3f66',blob2:'#0e1526',inkw:'#e9edf6',line:'rgba(44,61,106,.2)'}},
    {k:'hitam',n:'Hitam',desc:'Black with red roses',extra:{fl:'red-rose',fl2:'cabbage-rose',eng:'red-rose'},c:{ground:'#151416',sheet:'#f6f3ee',ink:'#1b1a1c',accent:'#3a2f24',gold:'#dcb666',pagefg:'#f0ebe2',blob1:'#3a2226',blob2:'#0b0b0c',inkw:'#f1ede6',line:'rgba(58,47,36,.2)'}},
  ]});
