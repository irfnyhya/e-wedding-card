/* anggur: "Baldu Anggur". A deep velvet suite photographed flat on velvet: a velvet envelope lined with songket (Rijksmuseum,
   CC0), a cream die-cut card with a scalloped, pierced edge and a gold-foil wreath crest, and a silk ribbon tied in a bow.
   Cover: tap "Buka Jemputan"; the bow slips loose, the envelope slides away and the card lifts and straightens.
   Page: the scalloped card with its crest, the envelope corner behind it, the bow on its corner.
   Skin: scalloped cream cards on velvet, script headings over a small foil wreath. */
needFont('Great+Vibes');
let agN=0;
// a laurel wreath (two branches meeting under the monogram), drawn white for use as a mask over gold foil
const AG_WREATH=(()=>{let g='';const n=11;
  [1,-1].forEach(sd=>{let d='';const X=x=>sd>0?x:100-x;
    for(let i=0;i<=n;i++){const t=(96+i*13.2)*Math.PI/180,x=50+40*Math.cos(t),y=52+40*Math.sin(t),al=t*180/Math.PI+90;
      d+=(i?'L':'M')+X(x).toFixed(2)+' '+y.toFixed(2);
      if(i>0){[1,-1].forEach(o=>{const lx=x+o*Math.cos(t)*3.4,ly=y+o*Math.sin(t)*3.4,r=(al-90+o*32)*sd;
        g+=`<ellipse cx="${X(lx).toFixed(2)}" cy="${ly.toFixed(2)}" rx="1.7" ry="4.4" transform="rotate(${(sd>0?al+o*32-90+180:-(al+o*32-90+180)).toFixed(1)} ${X(lx).toFixed(2)} ${ly.toFixed(2)})"/>`;void r})}}
    g+=`<path d="${d}" fill="none" stroke="#fff" stroke-width=".9"/>`});
  return `<svg ${NS} viewBox="0 0 100 100"><g fill="#fff">${g}<path d="M43 93l7-3.2 7 3.2-7 2.6z"/><circle cx="50" cy="7.6" r="1.5"/></g></svg>`})();
const AG_WREATH_URI=svgUriSq(AG_WREATH);
// the silk bow: two loops and two tails with a satin sheen. c = theme colours (literal hex)
function agBow(c){const u=++agN,g=`url(#agr${u})`,h=`url(#agh${u})`;
  return `<svg class="agr-bow" ${NS} viewBox="0 0 200 160"><defs>
    <linearGradient id="agr${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.rib0}"/><stop offset=".35" stop-color="${c.rib}"/><stop offset=".5" stop-color="${c.ribl}"/><stop offset=".62" stop-color="${c.rib}"/><stop offset="1" stop-color="${c.rib0}"/></linearGradient>
    <linearGradient id="agh${u}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.rib0}"/><stop offset=".45" stop-color="${c.ribl}"/><stop offset="1" stop-color="${c.rib0}"/></linearGradient>
    <filter id="ags${u}" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".45"/></filter></defs>
    <g filter="url(#ags${u})">
    <path d="M96 78C80 104 66 128 40 156L58 158C76 132 90 108 101 82Z" fill="${g}"/>
    <path d="M104 78C118 106 128 128 150 154L134 159C116 132 106 108 99 82Z" fill="${g}"/>
    <path d="M98 76C78 52 34 30 16 46C2 60 18 88 52 92C70 94 86 88 98 80Z" fill="${g}"/>
    <path d="M98 76C80 60 44 44 30 54C22 62 36 80 60 84C76 86 88 82 98 80Z" fill="${c.rib0}" opacity=".45"/>
    <path d="M102 76C122 52 166 30 184 46C198 60 182 88 148 92C130 94 114 88 102 80Z" fill="${g}"/>
    <path d="M102 76C120 60 156 44 170 54C178 62 164 80 140 84C124 86 112 82 102 80Z" fill="${c.rib0}" opacity=".45"/>
    <path d="M24 52C40 40 70 52 92 70" fill="none" stroke="${c.ribl}" stroke-opacity=".7" stroke-width="2"/>
    <path d="M176 52C160 40 130 52 108 70" fill="none" stroke="${c.ribl}" stroke-opacity=".6" stroke-width="2"/>
    <rect x="88" y="68" width="24" height="20" rx="7" fill="${h}"/></g></svg>`}
const agMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="agr-ini jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `<span class="agr-ini">${esc(a)}<i>&amp;</i>${esc(b)}</span>`};
const agCrest=o=>`<div class="agr-crest"><i class="agr-wreath" style="-webkit-mask-image:${AG_WREATH_URI};mask-image:${AG_WREATH_URI}"></i>${agMono(o)}</div>`;
const agNames=(o,tag='p')=>{const [n1,n2]=coverNames(o);return `<${tag} class="agr-names"><span>${esc(n1)}</span><em>&amp;</em><span>${esc(n2)}</span></${tag}>`};
const agVars=c=>`--env:${c.env};--rib:${c.rib};--lf:${c.lf||'none'}`;
// the velvet envelope seen from the back with its flap opened flat; the inside of the flap is lined with songket
const agEnv=cls=>`<div class="agr-env ${cls}"><i class="agr-flap"><i class="agr-liner" style="background-image:url(${A}pd-textile-2.jpg)"></i></i><i class="agr-pocket"></i></div>`;
FAMILY({key:'anggur',name:'Baldu Anggur',meaning:'Velvet suite',
  blurb:'A velvet invitation suite laid flat on velvet: a songket-lined velvet envelope, a scalloped cream card with a gold-foil crest and a silk bow. The bow slips loose and the card lifts to open.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Great Vibes', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const en=o.lang==='en',c=th.c;
    return `<section class="page pg-anggur ${c.light?'agr-light':''}" style="${agVars(c)}"><i class="agr-vel"></i>${agEnv('pe')}
      <div class="agr-cardw big reveal"><div class="agr-card"><div class="agr-in">
        ${agCrest(o)}${o.bismillah?'<p class="agr-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="agr-k kicker">${ev(o,L)}</p>${agNames(o,'h1')}
        <p class="agr-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="agr-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="agr-ven">${esc(o.venue)}</p>`:''}</div></div>${agBow(c)}</div>
      <div class="agr-pills reveal d2"><a class="agr-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="agr-pill ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',c=th.c;
    return `<div class="cover cv-anggur ${c.light?'agr-light':''}" style="${agVars(c)}"><i class="agr-vel"></i>${agEnv('ce')}
      <div class="agr-cardw cc"><div class="agr-card"><div class="agr-in">${agCrest(o)}<p class="agr-k">${ev(o,L)}</p>${agNames(o)}<p class="agr-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div></div>
      <i class="agr-band"></i>${agBow(c)}
      <div class="agr-foot">${guest?`<p class="agr-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="agr-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.classList.toggle('agr-light',!!c.light);el.style.setProperty('--env',c.env);el.style.setProperty('--rib',c.rib);
    $$('.sheet > .sec > h2',el).forEach(h=>{if(!h.querySelector('.agr-mini'))h.insertAdjacentHTML('beforebegin',`<i class="agr-mini" style="-webkit-mask-image:${AG_WREATH_URI};mask-image:${AG_WREATH_URI}"></i>`)});
    // a couple photo sits in a scalloped oval under the crest
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'marun',n:'Marun',desc:'Burgundy velvet, ivory card, champagne ribbon',c:{ground:'#3a0f1a',sheet:'#f8f1e4',ink:'#3a1f24',accent:'#6e1c2c',gold:'#b8924e',pagefg:'#f5e6da',env:'#5a1626',rib:'#e4d3b6',rib0:'#a68d68',ribl:'#fff6e4'}},
    {k:'delima',n:'Delima',desc:'Crimson velvet, cream card, blush ribbon',c:{ground:'#4a0d16',sheet:'#fbf3ea',ink:'#3c1c20',accent:'#8a1e2c',gold:'#bf9550',pagefg:'#f8e8e0',env:'#6c1422',rib:'#ecc9c2',rib0:'#b0827a',ribl:'#fff0ec'}},
    {k:'ungu',n:'Ungu',desc:'Plum velvet, ivory card, lilac ribbon',c:{ground:'#2a1028',sheet:'#f8f2ec',ink:'#36222f',accent:'#5e2650',gold:'#b8935a',pagefg:'#f2e4ec',env:'#45193f',rib:'#d9c8d8',rib0:'#9a8298',ribl:'#fbf2fb'}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald velvet, ivory card, ivory ribbon',c:{ground:'#0d2a20',sheet:'#f7f2e5',ink:'#1f3029',accent:'#1d4a38',gold:'#b8964e',pagefg:'#e8eee2',env:'#154434',rib:'#ece3cf',rib0:'#a99e86',ribl:'#fffaf0'}},
    {k:'nila',n:'Nila',desc:'Midnight velvet, white card, silver ribbon',c:{ground:'#111a33',sheet:'#f7f6f2',ink:'#222838',accent:'#2c3b66',gold:'#b49b62',pagefg:'#e8ebf3',env:'#1c2a50',rib:'#d7dbe2',rib0:'#8d939e',ribl:'#ffffff'}},
    {k:'hitam',n:'Hitam',desc:'Black velvet, ivory card, burgundy ribbon',c:{ground:'#121011',sheet:'#f7f1e6',ink:'#2a2224',accent:'#5e1a26',gold:'#b8924e',pagefg:'#efe5dc',env:'#221d1f',rib:'#7a1e2e',rib0:'#3e0c16',ribl:'#c25a6a'}},
    {k:'jambu',n:'Jambu',desc:'Dusty rose velvet, cream card, burgundy ribbon',c:{ground:'#b98b8b',sheet:'#fdf7f2',ink:'#3e2526',accent:'#7a2836',gold:'#a8834c',pagefg:'#2e1a1c',env:'#a26f72',rib:'#6e1a2a',rib0:'#3a0a14',ribl:'#b4505e',light:1}},
    {k:'sage',n:'Sage',desc:'Sage velvet, ivory card, moss ribbon',c:{ground:'#97a48c',sheet:'#fbf9f1',ink:'#27302a',accent:'#3a4d38',gold:'#a58c52',pagefg:'#1f271f',env:'#7f8e74',rib:'#3e5038',rib0:'#1e2a1c',ribl:'#7c9070',light:1}},
  ]});
