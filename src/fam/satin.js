/* satin: a heavy cotton invitation card with letterpress type and a wax seal, resting on draped silk satin.
   The satin is lit procedurally: a stretched noise height-map, blurred, lit by an SVG diffuse + specular light,
   so the folds catch a real sheen instead of reading as stripes.
   Cover: a loose fold of satin lies over the foot of the card; tap "Buka Jemputan" and it is drawn away.
   Page: the card alone on the satin. Skin: cotton cards with debossed headings on the satin. */
let stN=0;
// one satin drape. seed and angle change the folds; c holds the theme colours (literal hex, no vars, so it also works as a data URI)
function satinSvg(c,seed,rot,cls,w=400,h=800){const u=++stN,el=c.elev||52,kd=(1/Math.sin(el*Math.PI/180)).toFixed(3);
  return `<svg class="${cls}" ${NS} viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><defs>
  <filter id="stf${u}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="${c.fx||'0.0016 0.0062'}" numOctaves="2" seed="${seed}"/>
    <feGaussianBlur stdDeviation="7"/>
    <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.25 0 0 0 -.1" result="h"/>
    <feDiffuseLighting in="h" surfaceScale="${c.depth||30}" diffuseConstant="${kd}" lighting-color="#fff" result="d"><feDistantLight azimuth="235" elevation="${el}"/></feDiffuseLighting>
    <feSpecularLighting in="h" surfaceScale="${c.depth||30}" specularConstant="${c.spec||.9}" specularExponent="${c.sexp||14}" lighting-color="${c.sheen}" result="s"><feDistantLight azimuth="235" elevation="30"/></feSpecularLighting>
    <feGaussianBlur in="s" stdDeviation="4" result="sb"/>
    <feGaussianBlur in="d" stdDeviation="3.5" result="db"/>
    <feComposite in="SourceGraphic" in2="db" operator="arithmetic" k1="1" result="m"/>
    <feComposite in="m" in2="sb" operator="arithmetic" k2="1" k3="${c.sk||.8}"/>
    <feComposite in2="SourceAlpha" operator="in"/>
  </filter>
  <radialGradient id="stv${u}" cx=".42" cy=".38" r=".85"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${c.vig||.3}"/></radialGradient></defs>
  <g transform="rotate(${rot} ${w/2} ${h/2})"><rect x="${-w}" y="${-h/2}" width="${w*3}" height="${h*2}" fill="${c.satin}" filter="url(#stf${u})"/></g>
  <rect width="${w}" height="${h}" fill="url(#stv${u})"/></svg>`}
// the fold of satin thrown over the foot of the card: same cloth, its own folds, a rolled hem catching the light
function satinThrow(c){const u=++stN,el=c.elev||52,kd=(1/Math.sin(el*Math.PI/180)).toFixed(3);
  const hem='M-10 14C60 6 120 22 190 62S320 124 410 116';
  return `<svg class="sa-throwsvg" ${NS} viewBox="0 0 400 380" preserveAspectRatio="none"><defs>
  <filter id="stt${u}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.0028 0.008" numOctaves="2" seed="${c.seed+7}"/>
    <feGaussianBlur stdDeviation="7"/>
    <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.25 0 0 0 -.1" result="h"/>
    <feDiffuseLighting in="h" surfaceScale="${c.depth||30}" diffuseConstant="${kd}" lighting-color="#fff" result="d"><feDistantLight azimuth="235" elevation="${el}"/></feDiffuseLighting>
    <feSpecularLighting in="h" surfaceScale="${c.depth||30}" specularConstant="${c.spec||.9}" specularExponent="${c.sexp||14}" lighting-color="${c.sheen}" result="s"><feDistantLight azimuth="235" elevation="30"/></feSpecularLighting>
    <feGaussianBlur in="s" stdDeviation="4" result="sb"/>
    <feGaussianBlur in="d" stdDeviation="3.5" result="db"/>
    <feComposite in="SourceGraphic" in2="db" operator="arithmetic" k1="1" result="m"/>
    <feComposite in="m" in2="sb" operator="arithmetic" k2="1" k3="${c.sk||.8}"/>
    <feComposite in2="SourceAlpha" operator="in"/>
  </filter>
  <filter id="stb${u}" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>
  <clipPath id="stc${u}"><path d="${hem}L410 400L-10 400Z"/></clipPath></defs>
  <g clip-path="url(#stc${u})"><g transform="rotate(-24 200 190)"><rect x="-300" y="-300" width="1000" height="1000" fill="${c.satin}" filter="url(#stt${u})"/></g>
    <path d="${hem}" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="22" filter="url(#stb${u})" transform="translate(0 26)"/>
    <path d="${hem}" fill="none" stroke="${c.sheen}" stroke-opacity="${c.hemlite||.75}" stroke-width="7" filter="url(#stb${u})" transform="translate(0 9)"/></g></svg>`}
const stMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="sa-jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `${esc(a)}<i>&amp;</i>${esc(b)}`};
const stSeal=(o,c)=>`<i class="sa-seal" style="background-image:url(${A}seal-${c.seal}.webp)"><span>${stMono(o)}</span></i>`;
FAMILY({key:'satin',name:'Satin',meaning:'Card on silk satin',
  blurb:'A heavy cotton card with letterpress type and a wax seal, resting on softly draped silk satin. A fold of satin is drawn aside to open it.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-satin">${satinSvg(c,c.seed,c.rot,'sa-bed')}<i class="sa-sheen"></i>
      <div class="sa-card sa-big reveal"><div class="sa-face">
        ${o.bismillah?'<p class="sa-bis">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>':''}
        <p class="sa-k kicker">${ev(o,L)}</p>
        <h1 class="sa-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
        <i class="sa-rule"></i>
        <p class="sa-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="sa-hj">${esc(o.hijri)}</p>`:''}
        ${o.venue?`<p class="sa-ven">${esc(o.venue)}</p>`:''}
        ${stSeal(o,c)}</div></div>
      <a class="sa-pill reveal d2" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-satin">${satinSvg(c,c.seed,c.rot,'sa-bed')}<i class="sa-sheen"></i>
      <div class="sa-card sa-cc"><div class="sa-face">
        <p class="sa-k">${ev(o,L)}</p>
        <p class="sa-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
        <i class="sa-rule"></i>
        <p class="sa-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p>
        ${stSeal(o,c)}</div></div>
      <div class="sa-throw">${satinThrow(c)}</div>
      <div class="sa-foot">${guest?`<p class="sa-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="sa-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;
    el.style.setProperty('--satinbg',K.uri(satinSvg(c,c.seed+3,c.rot,'',400,900)));
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Cotton card on ivory satin',c:{ground:'#e8dfcf',sheet:'#fcfaf4',ink:'#3a342c',accent:'#6f5a3c',gold:'#b0925a',pagefg:'#3a342c',satin:'#e9e0cf',sheen:'#fffaf0',spec:.55,seal:'emas',seed:11,rot:-28}},
    {k:'emas',n:'Emas',desc:'Cotton card on champagne satin',c:{ground:'#dcc6a2',sheet:'#fdf9f1',ink:'#3b3023',accent:'#7a5a2e',gold:'#b08a48',pagefg:'#3b3023',satin:'#d9c29c',sheen:'#fff3da',spec:.6,seal:'emas',seed:4,rot:-34}},
    {k:'jambu',n:'Jambu',desc:'Cotton card on blush satin',c:{ground:'#e8cdc6',sheet:'#fffaf7',ink:'#3d2a2a',accent:'#8e4f58',gold:'#b38f5a',pagefg:'#3d2a2a',satin:'#e5c4bc',sheen:'#fff1ec',spec:.55,seal:'emas',seed:23,rot:-26}},
    {k:'sage',n:'Sage',desc:'Cotton card on sage satin',c:{ground:'#bcc6b0',sheet:'#fbfbf5',ink:'#2c3227',accent:'#4c5d42',gold:'#a58f58',pagefg:'#262c22',satin:'#b6c1aa',sheen:'#f6fbee',spec:.55,seal:'gading',seed:31,rot:-30}},
    {k:'biru',n:'Biru',desc:'Cotton card on dusty blue satin',c:{ground:'#a9b8c8',sheet:'#fbfcfc',ink:'#24303d',accent:'#3f5872',gold:'#a8915e',pagefg:'#1f2a36',satin:'#a5b5c6',sheen:'#f1f7ff',spec:.55,seal:'gading',seed:8,rot:-32}},
    {k:'marun',n:'Marun',desc:'Cotton card on burgundy satin',c:{ground:'#4e1420',sheet:'#fbf6ee',ink:'#3a2024',accent:'#6e1e2c',gold:'#b8935a',pagefg:'#f6e9df',satin:'#6a1b29',sheen:'#ffc9c4',spec:.85,sexp:18,sk:.75,depth:34,vig:.4,hemlite:.5,seal:'emas',seed:17,rot:-30}},
    {k:'zamrud',n:'Zamrud',desc:'Cotton card on emerald satin',c:{ground:'#0f3428',sheet:'#fbf8ef',ink:'#20302a',accent:'#1f4d3c',gold:'#b5965a',pagefg:'#ecf1e8',satin:'#165140',sheen:'#c9f2de',spec:.85,sexp:18,sk:.75,depth:34,vig:.4,hemlite:.5,seal:'emas',seed:27,rot:-28}},
    {k:'nila',n:'Nila',desc:'Cotton card on midnight satin',c:{ground:'#121a2f',sheet:'#fbf9f4',ink:'#1e2433',accent:'#27365c',gold:'#b49a62',pagefg:'#e9ecf4',satin:'#1d2a4a',sheen:'#cfdcff',spec:.85,sexp:18,sk:.75,depth:34,vig:.45,hemlite:.5,seal:'gading',seed:5,rot:-34}},
  ]});
