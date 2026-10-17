/* komik: an inked comic-book page. Panels with brush borders, Ben-Day dots, caption boxes and sound-effect lettering;
   scenery only (a city skyline at dusk, two rings, a bunch of roses), never faces or people.
   Cover: the comic page; pull the dog-eared corner and the page turns over. Page: a comic-book front cover. Skin: panel-framed sections. */
needFont('Comic+Neue:ital,wght@0,400;0,700;1,700');
const BA="'Bangers', cursive",CN="'Comic Neue', cursive";
let uid=0;
const fit=(s,max,fs,k=.5)=>Math.min(fs,max/Math.max(1,(s||'').length*k));
const dotsPat=(id,col,step,r,ang=20)=>`<pattern id="${id}" width="${step}" height="${step}" patternUnits="userSpaceOnUse" patternTransform="rotate(${ang})"><circle cx="${step/2}" cy="${step/2}" r="${r}" fill="${col}"/></pattern>`;
const box=(x,y,w,h,ink)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linejoin="round"/>`;
function caption(x,y,w,lines,c,fs=8.6){const h=lines.length*fs*1.25+8;return `<g><rect x="${x+2}" y="${y+2}" width="${w}" height="${h}" fill="${c.ink}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c.gold}" stroke="${c.ink}" stroke-width="1.6"/>
  ${lines.map((t,i)=>`<text x="${x+6}" y="${(y+5+fs*(i+1)*1.18).toFixed(1)}" class="km-cap" font-size="${fs}" fill="${c.ink}">${t}</text>`).join('')}</g>`}
const sparkle=(x,y,s,c)=>`<path d="M${x} ${y-s}Q${x} ${y} ${x+s} ${y}Q${x} ${y} ${x} ${y+s}Q${x} ${y} ${x-s} ${y}Q${x} ${y} ${x} ${y-s}Z" fill="#fff" stroke="${c.ink}" stroke-width="1"/>`;
function rays(cx,cy,n,R,col,op=1){let d='';for(let i=0;i<n;i++){const a0=i/n*Math.PI*2,a1=(i+.5)/n*Math.PI*2;d+=`M${cx} ${cy}L${(cx+Math.cos(a0)*R).toFixed(1)} ${(cy+Math.sin(a0)*R).toFixed(1)}L${(cx+Math.cos(a1)*R).toFixed(1)} ${(cy+Math.sin(a1)*R).toFixed(1)}Z`}return `<path d="${d}" fill="${col}" opacity="${op}"/>`}
function speed(cx,cy,n,r0,r1,ink){let d='';const r=K.rnd(n*7);for(let i=0;i<n;i++){const a=i/n*Math.PI*2+r()*.1,q=r0+r()*14;d+=`M${(cx+Math.cos(a)*q).toFixed(1)} ${(cy+Math.sin(a)*q).toFixed(1)}L${(cx+Math.cos(a)*r1).toFixed(1)} ${(cy+Math.sin(a)*r1).toFixed(1)}`}return `<path d="${d}" stroke="${ink}" stroke-width=".8" opacity=".75"/>`}
function skyline(x0,y0,w,h,c,seed){const r=K.rnd(seed);let b='',win='',x=x0;
  while(x<x0+w){const bw=10+r()*20,bh=h*(.25+r()*.55);const top=y0+h-bh;b+=`<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}"/>`;
    for(let wy=top+5;wy<y0+h-6;wy+=6)for(let wx=x+3;wx<x+bw-4;wx+=5)if(r()<.38)win+=`<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="2.2" height="3"/>`;x+=bw+1.2}
  const tx=x0+w*.68;b+=`<path d="M${tx-7} ${y0+h}V${y0+h*.3}l3-6h8l3 6V${y0+h}Z M${tx} ${y0+h*.3-6}V${y0+4}"/><path d="M${tx} ${y0+4}V${y0+h*.2}" stroke="${c.ink}" stroke-width="1.6"/>`;
  return `<g fill="${c.ink}">${b}</g><g fill="${c.gold}">${win}</g>`}
function rings(cx,cy,s,c){const ring=(x,y,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot})"><ellipse rx="${26*s}" ry="${11*s}" fill="none" stroke="${c.ink}" stroke-width="${9*s}"/><ellipse rx="${26*s}" ry="${11*s}" fill="none" stroke="${c.gold}" stroke-width="${5.6*s}"/><path d="M${-20*s} ${-7*s}A${26*s} ${11*s} 0 0 1 ${12*s} ${-10.4*s}" fill="none" stroke="#fff" stroke-width="${1.6*s}" stroke-linecap="round"/></g>`;
  return `${ring(cx-14*s,cy+4*s,-18)}${ring(cx+14*s,cy-2*s,16)}<g transform="translate(${cx+6*s} ${cy-20*s}) scale(${s})"><path d="M-8 0l4-6h8l4 6-8 9z" fill="#fff" stroke="${c.ink}" stroke-width="1.4" stroke-linejoin="round"/><path d="M-8 0h16M-4-6l-1 6 5 9 5-9-1-6" fill="none" stroke="${c.ink}" stroke-width=".7"/></g>`}
function rose(x,y,r,c){return `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${c.accent}" stroke="${c.ink}" stroke-width="1.6"/><path d="M${-r*.15} ${-r*.1}c${r*.2} ${-r*.35} ${r*.55} ${-r*.1} ${r*.45} ${r*.25}s${-r*.6} ${r*.45} ${-r*.8} ${0}S${-r*.45} ${-r*.8} ${r*.25} ${-r*.75}s${r*.75} ${r*.55} ${r*.5} ${r*.9}" fill="none" stroke="${c.ink}" stroke-width="1.3" stroke-linecap="round"/></g>`}
const leaf=(x,y,l,rot,c)=>`<path d="M0 0C${l*.3} ${-l*.35} ${l*.75} ${-l*.3} ${l} 0C${l*.75} ${l*.3} ${l*.3} ${l*.35} 0 0Z" transform="translate(${x} ${y}) rotate(${rot})" fill="${c.leaf}" stroke="${c.ink}" stroke-width="1.3"/>`;
function title(n1,n2,x,y,c,max,fs){const f1=fit(n1,max,fs),f2=fit(n2,max,fs);const t=(s,yy,f,col)=>{let ex='';for(let i=4;i>0;i--)ex+=`<text x="${x+i}" y="${yy+i}" text-anchor="middle" class="km-t" font-size="${f.toFixed(1)}" fill="${c.ink}" stroke="${c.ink}" stroke-width="3" stroke-linejoin="round">${s}</text>`;
   return ex+`<text x="${x}" y="${yy}" text-anchor="middle" class="km-t" font-size="${f.toFixed(1)}" fill="${col}" stroke="${c.ink}" stroke-width="3" stroke-linejoin="round" paint-order="stroke">${s}</text><text x="${x}" y="${yy}" text-anchor="middle" class="km-t" font-size="${f.toFixed(1)}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width=".8" transform="translate(-1 -1)">${s}</text>`};
  return {svg:t(esc(n1.toUpperCase()),y,f1,c.accent)+`<text x="${x}" y="${(y+f1*.62).toFixed(1)}" text-anchor="middle" class="km-t" font-size="${(f1*.5).toFixed(1)}" fill="${c.gold}" stroke="${c.ink}" stroke-width="2.4" paint-order="stroke">&amp;</text>`+t(esc(n2.toUpperCase()),y+f1*.62+f2*.9,f2,c.accent),h:f1*.62+f2*.9}}
function burstStar(cx,cy,R,c,lines,fs){return `<g transform="rotate(-8 ${cx} ${cy})"><path d="${K.star(14,R,R*.72,cx+2.5,cy+2.5)}" fill="${c.ink}"/><path d="${K.star(14,R,R*.72,cx,cy)}" fill="#fff" stroke="${c.ink}" stroke-width="1.8" stroke-linejoin="round"/>
  ${lines.map((t,i)=>`<text x="${cx}" y="${(cy+(i-(lines.length-1)/2)*fs*1.05+fs*.36).toFixed(1)}" text-anchor="middle" class="km-t" font-size="${fs}" fill="${i?c.ink:c.accent}">${t}</text>`).join('')}</g>`}
function comicPage(o,th,L,guest){const c=th.c,u=++uid,[n1,n2]=coverNames(o),en=o.lang==='en';const d=new Date((o.date||'2026-01-01')+'T00:00:00'),dd=String(d.getDate()).padStart(2,'0'),mm=String(d.getMonth()+1).padStart(2,'0'),yy=String(d.getFullYear()).slice(2);
  const T=title(n1,n2,150,420,c,250,48);
  return `<svg class="km-art" viewBox="0 0 300 560" aria-hidden="true"><defs>${dotsPat('kd'+u,c.sky,4.2,1.5)}${dotsPat('kp'+u,c.pink,4.4,1.7,-15)}${dotsPat('ky'+u,c.accent,4.6,1.2,10)}
   <linearGradient id="kg${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="km${u}"><rect x="0" y="0" width="300" height="200" fill="url(#kg${u})"/></mask>
   <clipPath id="c1${u}"><rect x="12" y="38" width="276" height="134"/></clipPath><clipPath id="c2${u}"><rect x="12" y="178" width="132" height="150"/></clipPath><clipPath id="c3${u}"><rect x="150" y="178" width="138" height="150"/></clipPath><clipPath id="c4${u}"><rect x="12" y="334" width="276" height="200"/></clipPath></defs>
   <text x="12" y="26" class="km-cap" font-size="8.5" fill="${c.ink}">${en?'PAGE':'HALAMAN'} 1</text><text x="150" y="27" text-anchor="middle" class="km-t" font-size="15" fill="${c.ink}">${ev(o,L).toUpperCase()}</text><text x="288" y="26" text-anchor="end" class="km-cap" font-size="8.5" fill="${c.ink}">NO. ${dd}</text>
   <g clip-path="url(#c1${u})"><rect x="12" y="38" width="276" height="134" style="fill:color-mix(in srgb,${c.gold} 55%,#fff)"/><rect x="12" y="38" width="276" height="134" fill="url(#kd${u})" mask="url(#km${u})"/>
    <circle cx="96" cy="128" r="34" fill="${c.accent}" stroke="${c.ink}" stroke-width="1.6"/>
    <path d="M40 82q10-6 20 0q8-6 16 0" fill="none" stroke="${c.ink}" stroke-width="1.2"/><path d="M200 66q8-5 16 0q7-5 14 0" fill="none" stroke="${c.ink}" stroke-width="1.2"/>
    ${skyline(12,96,276,76,c,5)}<rect x="12" y="166" width="276" height="6" fill="${c.ink}"/></g>${box(12,38,276,134,c.ink)}
   ${caption(18,44,124,[en?'ONE FINE DAY, IN THE':'PADA SUATU HARI,',en?'HEART OF THE CITY...':'DI TENGAH KOTA...'],c)}
   <g clip-path="url(#c2${u})"><rect x="12" y="178" width="132" height="150" fill="${c.gold}"/>${speed(78,258,46,26,120,c.ink)}${rings(78,262,1.15,c)}${sparkle(40,214,6,c)}${sparkle(122,300,5,c)}${sparkle(116,224,3.5,c)}</g>${box(12,178,132,150,c.ink)}
   <g transform="rotate(-12 60 206)"><text x="60" y="212" text-anchor="middle" class="km-t" font-size="30" fill="${c.ink}" transform="translate(2.5 2.5)">TING!</text><text x="60" y="212" text-anchor="middle" class="km-t" font-size="30" fill="#fff" stroke="${c.ink}" stroke-width="2" paint-order="stroke">TING!</text></g>
   <g clip-path="url(#c3${u})"><rect x="150" y="178" width="138" height="150" style="fill:color-mix(in srgb,${c.pink} 40%,#fff)"/><rect x="150" y="178" width="138" height="150" fill="url(#kp${u})"/>
    <g stroke="${c.ink}" stroke-width="1.6" fill="none"><path d="M219 330L206 270M219 330l4-64M219 330l18-56M219 330l-30-52"/></g>
    ${leaf(208,300,22,-150,c)}${leaf(224,296,20,-30,c)}${leaf(214,282,16,-120,c)}
    ${rose(206,264,15,c)}${rose(236,270,13,c)}${rose(222,240,14,c)}${rose(190,280,11,c)}${rose(250,248,10,c)}
    <path d="M206 310l26 0-6 10h-14z" fill="${c.gold}" stroke="${c.ink}" stroke-width="1.4"/></g>${box(150,178,138,150,c.ink)}
   ${caption(156,184,126,[en?'TWO HEARTS,':'DUA HATI,',en?'ONE PROMISE.':'SATU JANJI.'],c)}
   <g clip-path="url(#c4${u})"><rect x="12" y="334" width="276" height="200" fill="#fff"/>${rays(150,434,28,260,c.gold)}<rect x="12" y="334" width="276" height="200" fill="url(#ky${u})" opacity=".18"/>
    <g transform="translate(0 ${(-T.h/2+12).toFixed(1)})">${T.svg}</g></g>${box(12,334,276,200,c.ink)}
   ${caption(18,340,140,[ev(o,L).toUpperCase()],c,8.2)}
   ${burstStar(246,374,30,c,[`${dd}.${mm}`,`'${yy}`],13)}
   ${caption(18,guest?486:506,guest?178:160,guest?[(en?'SPECIAL FOR: ':'KHAS UNTUK: ')+esc(guest.toUpperCase()),(en?'AT ':'DI ')+esc(o.venue.toUpperCase())]:[(en?'AT ':'DI ')+esc(o.venue.toUpperCase())],c,8)}
   <text x="12" y="550" class="km-cap" font-size="7.5" fill="${c.ink}">${esc(fmtDate(o.date,o.lang)).toUpperCase()} &#183; ${esc(fmtTime(o.start,o.lang)).toUpperCase()}</text></svg>`}
function coverArt(o,th,L){const c=th.c,u=++uid,[n1,n2]=coverNames(o),en=o.lang==='en';const d=new Date((o.date||'2026-01-01')+'T00:00:00'),dd=String(d.getDate()).padStart(2,'0'),mm=String(d.getMonth()+1).padStart(2,'0'),yy=d.getFullYear();
  const T=title(n1,n2,150,92,c,262,52),mon=(fmtDate(o.date,o.lang).split(' ')[2]||'').slice(0,3).toUpperCase();
  return `<svg class="km-art" viewBox="0 0 300 560" aria-hidden="true"><defs>${dotsPat('qd'+u,c.sky,4.2,1.5)}${dotsPat('qp'+u,c.pink,4.4,1.7,-15)}</defs>
   <rect x="0" y="0" width="300" height="560" fill="${c.sky}"/><rect x="0" y="0" width="300" height="560" fill="url(#qd${u})" opacity=".55"/>
   ${rays(150,300,36,420,'#fff',.22)}
   <rect x="0" y="0" width="300" height="${(T.h+96).toFixed(0)}" fill="${c.sheet}"/><path d="M0 ${(T.h+96).toFixed(0)}h300" stroke="${c.ink}" stroke-width="3"/>
   <rect x="10" y="10" width="54" height="40" fill="#fff" stroke="${c.ink}" stroke-width="2"/><text x="37" y="27" text-anchor="middle" class="km-t" font-size="12" fill="${c.ink}">NO. ${dd}</text><text x="37" y="43" text-anchor="middle" class="km-cap" font-size="8" fill="${c.ink}">${mon} ${yy}</text>
   <text x="286" y="24" text-anchor="end" class="km-cap" font-size="8" fill="${c.ink}">${en?'SPECIAL EDITION':'EDISI ISTIMEWA'}</text><text x="286" y="36" text-anchor="end" class="km-cap" font-size="8" fill="${c.accent}">${ev(o,L).toUpperCase()}</text>
   ${T.svg}
   <g transform="translate(0 ${(T.h-110).toFixed(0)})">
   ${speed(150,300,60,70,240,c.ink)}
   <circle cx="150" cy="300" r="74" fill="${c.gold}" stroke="${c.ink}" stroke-width="2.4"/><circle cx="150" cy="300" r="74" fill="url(#qp${u})" opacity=".45"/>${rings(150,304,2.1,c)}
   ${sparkle(86,250,9,c)}${sparkle(222,352,7,c)}${sparkle(214,246,5,c)}
   ${leaf(48,430,40,-60,c)}${leaf(70,440,34,-100,c)}${rose(40,404,20,c)}${rose(78,416,16,c)}${rose(56,380,13,c)}
   ${leaf(252,430,40,-120,c)}${leaf(230,440,34,-80,c)}${rose(260,404,20,c)}${rose(222,416,16,c)}${rose(244,380,13,c)}
   ${burstStar(236,206,34,c,[en?'YOU\'RE':'ANDA',en?'INVITED!':'DIJEMPUT!'],11)}</g>
   <rect x="0" y="474" width="300" height="86" fill="${c.ink}"/><rect x="0" y="474" width="300" height="5" fill="${c.accent}"/>
   <text x="150" y="502" text-anchor="middle" class="km-t" font-size="19" fill="${c.gold}">${esc(fmtDate(o.date,o.lang)).toUpperCase()}</text>
   <text x="150" y="522" text-anchor="middle" class="km-cap" font-size="10" fill="#fff">${esc(fmtTime(o.start,o.lang)).toUpperCase()} &#183; ${esc(o.venue.toUpperCase())}</text></svg>`}
FAMILY({key:'komik',name:'Komik',meaning:'Comic book page',
  blurb:'An inked comic-book page of panels, Ben-Day dots, caption boxes and a TING! of two rings over a dusk skyline; the dog-eared corner turns the page.',
  fonts:{d:BA,s:BA,b:CN},ms:1350,
  page(o,th,L){return `<section class="page pg-komik"><div class="km-cover reveal">${coverArt(o,th,L)}</div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-komik"><div class="km-desk"></div><div class="km-pg"><div class="km-front">${comicPage(o,th,L,guest)}<i class="km-paper"></i>
     <${tag} class="km-ear" ${attr} aria-label="${L.open}"><i></i><span>${en?'Turn':'Selak'} &#8594;</span></${tag}></div><div class="km-back"></div></div></div>`},
  skin(el,o,th){K.cards(el);['sky','pink','leaf'].forEach(k=>el.style.setProperty('--'+k,th.c[k]));$$('.sheet > .sec',el).forEach((s,i)=>s.classList.add(['km-a','km-b','km-c'][i%3]))},
  themes:[
    {k:'klasik',n:'Klasik',desc:'Red, yellow and sky blue on newsprint',c:{ground:'#1e2a45',sheet:'#f8f1dc',ink:'#141414',accent:'#e23b2e',gold:'#ffd23f',sky:'#3d8ee0',pink:'#f28cb1',leaf:'#3f9a4a',pagefg:'#f8f1dc',line:'rgba(20,20,20,.5)'}},
    {k:'pop',n:'Pop',desc:'Magenta and cyan on yellow',c:{ground:'#ffd23f',sheet:'#fffaf0',ink:'#151515',accent:'#ff3e8a',gold:'#fff15a',sky:'#2fc2e6',pink:'#ff9ccb',leaf:'#27b45a',pagefg:'#151515',line:'rgba(21,21,21,.5)'}},
    {k:'noir',n:'Noir',desc:'Greyscale ink with a red accent',c:{ground:'#0e0e0e',sheet:'#ecebe6',ink:'#111111',accent:'#c8102e',gold:'#e9e2c8',sky:'#7a808a',pink:'#bdbdbd',leaf:'#6a6a6a',pagefg:'#ecebe6',line:'rgba(17,17,17,.5)'}},
    {k:'pastel',n:'Pastel',desc:'Rose, butter and baby blue',c:{ground:'#f3d9e3',sheet:'#fffaf3',ink:'#2b2026',accent:'#ef5f86',gold:'#ffe08a',sky:'#8ec9ee',pink:'#f7b2c8',leaf:'#6fbf8e',pagefg:'#3a2530',line:'rgba(43,32,38,.45)'}},
    {k:'laut',n:'Laut',desc:'Orange and gold on a teal night',c:{ground:'#0f3b4d',sheet:'#fbf3df',ink:'#14181c',accent:'#ff7a3d',gold:'#ffd166',sky:'#2bb3c0',pink:'#ff9eb5',leaf:'#2e8b57',pagefg:'#fbf3df',line:'rgba(20,24,28,.5)'}},
    {k:'ungu',n:'Ungu',desc:'Violet, lemon and cyan',c:{ground:'#2a1b4a',sheet:'#fbf6ee',ink:'#16121f',accent:'#9b5de5',gold:'#fee440',sky:'#00bbf9',pink:'#f15bb5',leaf:'#00b98f',pagefg:'#f5effc',line:'rgba(22,18,31,.5)'}},
    {k:'vintaj',n:'Vintaj',desc:'Faded sepia golden-age print',c:{ground:'#4a3624',sheet:'#efe2c4',ink:'#2b1d12',accent:'#b5442a',gold:'#e6b95a',sky:'#6f9ab0',pink:'#d98b7e',leaf:'#6b8a4a',pagefg:'#efe2c4',line:'rgba(43,29,18,.5)'}},
    {k:'hijau',n:'Hijau',desc:'Leaf green, sun yellow and coral',c:{ground:'#e3ecd9',sheet:'#fffdf4',ink:'#17201a',accent:'#f0643c',gold:'#ffd43b',sky:'#4dabf7',pink:'#ff8fa3',leaf:'#2f9e44',pagefg:'#1d2b1f',line:'rgba(23,32,26,.5)'}},
  ]});
