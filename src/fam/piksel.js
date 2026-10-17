/* piksel: an 8-bit game title screen inside a CRT bezel. Dithered sky, pixel castle, hills, trees, floating pixel hearts, scanlines.
   Cover: PRESS START; the screen is wiped away tile by tile in a stepped diagonal. Page: the title screen with a menu of the details.
   Skin: RPG dialogue boxes with name tags. */
needFont('Press+Start+2P');
needFont('VT323');
const PS="'Press Start 2P', monospace",VT="'VT323', monospace";
let uid=0;
const R=(x,y,w,h,f)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;
function bmp(rows,x,y,map){let s='';rows.forEach((r,j)=>{for(let i=0;i<r.length;i++){const ch=r[i];if(map[ch])s+=R(x+i,y+j,1,1,map[ch])}});return s}
const HEART=['.XX.XX.','XWXXXXX','XXXXXXX','.XXXXX.','..XXX..','...X...'];
const TREE=['..GGG..','.GGgGG.','GGGGGgG','GgGGGGG','GGGGgGG','.GGGGG.','..GgG..','...T...','...T...'];
const CLOUD=['...WWWW.....','..WWWWWWW.WW','WWWWWWWWWWWW','.SSSSSSSSSS.'];
const heart=(x,y,c,s=1)=>`<g transform="translate(${x} ${y}) scale(${s})">${bmp(['.XX.XX.','XWXXXXX','XXXXXXX','.XXXXX.','..XXX..','...X...'],0,0,{X:c.accent,W:'#fff'})}${bmp(['.......','.......','......S','.....S.','....S..','...S...'],0,0,{S:c.accentS})}</g>`;
function scene(c,H=180){const r=K.rnd(11);let s='';const sky=[c.sky1,c.sky2,c.sky3,c.sky4];const bands=[0,30,58,82,H];
  // sky bands with checker dithering at each seam
  for(let i=0;i<4;i++)s+=R(0,bands[i],96,bands[i+1]-bands[i],sky[i]);
  for(let i=1;i<4;i++){for(let x=0;x<96;x+=2)s+=R(x,bands[i]-2,1,1,sky[i])+R(x+1,bands[i]-1,1,1,sky[i])+R(x+1,bands[i],1,1,sky[i-1]);for(let x=0;x<96;x+=4)s+=R(x,bands[i]-4,1,1,sky[i])}
  for(let i=0;i<46;i++){const x=Math.floor(r()*96),y=Math.floor(r()*70);s+=R(x,y,1,1,i%5?c.star:'#fff');if(i%11==0)s+=R(x-1,y,3,1,c.star)+R(x,y-1,1,3,c.star)}
  // moon or sun
  s+=bmp(['..MMM..','.MMMMm.','MMMMMmm','MMMMMMm','MMMMMMm','.MMMMm.','..MMM..'],76,60,{M:c.moon,m:c.moonS});
  s+=`<g opacity=".9">${bmp(CLOUD,6,64,{W:c.cloud,S:c.cloudS})}${bmp(CLOUD,58,44,{W:c.cloud,S:c.cloudS})}</g>`;
  // far mountains (staircase), near hills
  let m=`M0 ${H}`;for(let x=0;x<=96;x+=2){const h=Math.round(86+10*Math.sin(x/9)+6*Math.sin(x/4.3+1));m+=`V${h}H${x+2}`}s+=`<path d="${m}V${H}Z" fill="${c.mtn}"/>`;
  for(let x=0;x<96;x+=2){const h=Math.round(86+10*Math.sin(x/9)+6*Math.sin(x/4.3+1));if(h<88)s+=R(x,h,2,1,c.snow)}
  let hl=`M0 ${H}`;for(let x=0;x<=96;x+=2){const h=Math.round(108+5*Math.sin(x/7+2)+3*Math.cos(x/3));hl+=`V${h}H${x+2}`}s+=`<path d="${hl}V${H}Z" fill="${c.hill}"/>`;
  // castle
  const st=c.stone,sd=c.stoneS,ol=c.outline;let k='';
  k+=R(28,98,40,24,ol)+R(29,99,38,23,st);
  for(let x=29;x<67;x+=4)k+=R(x,96,2,2,st)+R(x,95,2,1,ol);
  [[22,84],[66,84]].forEach(([x,y])=>{k+=R(x,y,9,38,ol)+R(x+1,y+1,7,37,st)+R(x,y-3,9,3,ol);for(let i=0;i<9;i+=3)k+=R(x+i,y-4,2,2,st);k+=R(x+3,y+8,3,4,c.gold)+R(x+3,y+20,3,4,c.gold)+R(x+4,y-14,1,10,ol)+R(x+5,y-14,5,3,c.accent)+R(x+5,y-12,3,1,c.accentS)});
  k+=R(40,80,16,20,ol)+R(41,81,14,19,st);for(let i=0;i<7;i++)k+=R(40+i,80-i,16-2*i,1,i%2?c.accent:c.accentS);k+=R(47,66,2,8,ol)+R(48,66,6,3,c.gold);
  k+=R(45,86,6,6,c.gold)+R(47,86,2,6,ol);
  k+=R(43,110,10,12,ol)+R(44,108,8,2,ol)+R(45,107,6,1,ol)+R(44,111,8,11,c.door);
  for(let y=102;y<120;y+=4)for(let x=30+(y%8?2:0);x<66;x+=6)if(x<43||x>53)k+=R(x,y,3,1,sd);
  [[33,104],[58,104],[33,112],[58,112]].forEach(([x,y])=>k+=R(x,y,3,4,c.gold)+R(x,y,3,1,ol));
  s+=k;
  // ground, path, grass tufts, trees, flowers
  s+=R(0,121,96,H-121,c.grass)+R(0,121,96,1,c.grass2);
  for(let y=124;y<H;y+=3)for(let x=(y%2)*3;x<96;x+=7)s+=R(x,y,2,1,c.grass2);
  for(let i=0;i<H-121;i++){const w=10+Math.round(i*.9);s+=R(48-w/2,121+i,w,1,i%4==0?c.pathS:c.path)}
  [[4,108],[14,112],[78,110],[87,106]].forEach(([x,y])=>s+=bmp(TREE,x,y,{G:c.tree,g:c.treeS,T:c.trunk}));
  for(let i=0;i<18;i++){const x=Math.floor(r()*92)+2,y=126+Math.floor(r()*(H-130));if(Math.abs(x-48)>12+(y-121)*.45)s+=R(x,y,1,1,i%2?c.accent:c.gold)}
  return s}
function screenSvg(c,H,cls){const u=++uid;return `<svg class="${cls}" viewBox="0 0 96 ${H}" preserveAspectRatio="xMidYMax slice" shape-rendering="crispEdges" aria-hidden="true">${scene(c,H)}
   ${heart(9,48,c)}${heart(82,78,c,.8)}${heart(14,92,c,.6)}</svg>`}
const scan='<i class="px-scan"></i><i class="px-glass"></i>';
FAMILY({key:'piksel',name:'Piksel',meaning:'8-bit title screen',
  blurb:'An 8-bit game title screen in a CRT bezel: a dithered sky, pixel castle and hearts, the names as the game title and PRESS START; the screen wipes away tile by tile.',
  fonts:{d:PS,s:PS,b:VT},ms:1550,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<section class="page pg-piksel" style="--tx:${c.tx||'#fff'};--ol:${c.outline};--tsh:${c.tsh||c.outline};--accentS:${c.accentS};--n:${Math.max(6,(n1||'').length,(n2||'').length)}"><div class="px-bezel reveal"><div class="px-screen">${screenSvg(c,150,'px-scene')}${scan}
     <div class="px-ptitle"><p class="px-k">${ev(o,L)}</p></div></div></div>
     <h1 class="names px-nm reveal d1"><span>${esc(n1)}</span><i class="px-h"></i><span>${esc(n2)}</span></h1>
     <div class="px-menu reveal d1"><p><b>&#9654;</b><span>${en?'DATE':'TARIKH'}</span><em>${esc(fmtDate(o.date,o.lang))}</em></p><p><b></b><span>${en?'TIME':'MASA'}</span><em>${esc(fmtTime(o.start,o.lang))}${o.end?' - '+esc(fmtTime(o.end,o.lang)):''}</em></p><p><b></b><span>${en?'MAP':'LOKASI'}</span><em>${esc(o.venue)}</em></p></div>
     <p class="px-copy reveal d2">&#169; ${esc(String(new Date((o.date||'2026')+'T00:00:00').getFullYear()))} ${esc(n1)} &amp; ${esc(n2)}</p></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';const d=new Date((o.date||'2026-01-01')+'T00:00:00');
    const hi=String(d.getDate()).padStart(2,'0')+String(d.getMonth()+1).padStart(2,'0')+String(d.getFullYear()).slice(2);
    let tiles='';for(let y=0;y<16;y++)for(let x=0;x<8;x++)tiles+=`<i style="--d:${(x+y)*38}ms"></i>`;
    return `<div class="cover cv-piksel" style="--tx:${c.tx||'#fff'};--ol:${c.outline};--tsh:${c.tsh||c.outline};--accentS:${c.accentS};--n:${Math.max(6,(n1||'').length,(n2||'').length)}"><div class="px-case"><div class="px-screen">${screenSvg(c,180,'px-scene')}
     <div class="px-hud"><span>1UP <b>00${hi.slice(0,4)}</b></span><span>HI <b>${hi}</b></span></div>
     <div class="px-title"><p class="px-k">${ev(o,L)}</p><p class="px-nm"><span>${esc(n1)}</span><i class="px-h"></i><span>${esc(n2)}</span></p></div>
     <div class="px-low">${guest?`<p class="px-p1">${en?'PLAYER 1':'PEMAIN 1'}: <b>${esc(guest)}</b></p>`:''}
      <${tag} class="px-start" ${attr} aria-label="${L.open}">&#9654; PRESS START</${tag}>
      <p class="px-info">${esc(fmtShort(o.date))} &#183; ${esc(o.venue)}</p><p class="px-c">&#169; ${d.getFullYear()} ${esc(n1)} &amp; ${esc(n2)}</p></div>
     ${scan}</div><i class="px-led"></i></div><div class="px-wipe">${tiles}</div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--frame',th.c.frame);el.style.setProperty('--box',th.c.sheet)},
  themes:[
    {k:'malam',n:'Malam',desc:'Night sky, violet horizon, pink hearts',c:{ground:'#06070f',sheet:'#101a4a',ink:'#ffffff',accent:'#ff4f79',accentS:'#b8244a',gold:'#ffd447',sky1:'#0b1030',sky2:'#1c2463',sky3:'#3d348b',sky4:'#7a4fa8',star:'#c9c4ff',moon:'#fff3c4',moonS:'#e0c87a',cloud:'#8e86c9',cloudS:'#5d55a0',mtn:'#2a2558',snow:'#c9c4ff',hill:'#1d3b4a',stone:'#9aa3b5',stoneS:'#6b7488',outline:'#1b1a2e',door:'#2b1c12',grass:'#2e8b57',grass2:'#1f6b43',path:'#c9a86a',pathS:'#a8874f',tree:'#1f6b43',treeS:'#2e8b57',trunk:'#5b3a22',frame:'#ffffff',pagefg:'#ffffff',line:'rgba(255,255,255,.3)'}},
    {k:'senja',n:'Senja',desc:'Sunset over the castle',c:{ground:'#140b1c',sheet:'#3a1838',ink:'#fff4e8',accent:'#ff3d6e',accentS:'#a8173f',gold:'#ffd166',sky1:'#2b1c4f',sky2:'#6b2a6a',sky3:'#c4486a',sky4:'#ffa060',star:'#ffd1e0',moon:'#fff0a8',moonS:'#ffc35a',cloud:'#ff9a8a',cloudS:'#c45a6a',mtn:'#5a2a5a',snow:'#ffb3a0',hill:'#3a2a4a',stone:'#e3c9a8',stoneS:'#b39470',outline:'#2a1424',door:'#2a1424',grass:'#3c7a3c',grass2:'#2c5e2c',path:'#e0b070',pathS:'#b88a50',tree:'#2c5e2c',treeS:'#3c7a3c',trunk:'#5a3a24',frame:'#ffd166',pagefg:'#fff4e8',line:'rgba(255,244,232,.3)'}},
    {k:'siang',n:'Siang',desc:'Bright blue day, white dialogue boxes',c:{ground:'#cfe8ff',sheet:'#ffffff',ink:'#1a1a2e',accent:'#e83c5a',accentS:'#a3203a',gold:'#ffc83d',sky1:'#3d8bff',sky2:'#5fa8ff',sky3:'#8fd0ff',sky4:'#c8ecff',star:'#cfe6ff',moon:'#fff6b0',moonS:'#ffd84a',cloud:'#ffffff',cloudS:'#b8d8f0',mtn:'#6f8fb5',snow:'#ffffff',hill:'#4caf50',stone:'#d8d8d8',stoneS:'#a8a8a8',outline:'#2a2a3a',door:'#5a3a22',grass:'#5ccf5c',grass2:'#3d9e3d',path:'#e8c88a',pathS:'#c8a46a',tree:'#2e8b3e',treeS:'#4caf50',trunk:'#7a4a2a',frame:'#1a1a2e',pagefg:'#1a1a2e',line:'rgba(26,26,46,.3)'}},
    {k:'gameboy',n:'Game Boy',desc:'Four shades of pea green',c:{ground:'#8bac0f',sheet:'#9bbc0f',ink:'#0f380f',accent:'#0f380f',accentS:'#306230',gold:'#306230',sky1:'#9bbc0f',sky2:'#9bbc0f',sky3:'#8bac0f',sky4:'#8bac0f',star:'#8bac0f',moon:'#306230',moonS:'#0f380f',cloud:'#9bbc0f',cloudS:'#306230',mtn:'#306230',snow:'#8bac0f',hill:'#306230',stone:'#8bac0f',stoneS:'#306230',outline:'#0f380f',door:'#0f380f',grass:'#8bac0f',grass2:'#306230',path:'#9bbc0f',pathS:'#8bac0f',tree:'#0f380f',treeS:'#306230',trunk:'#0f380f',frame:'#0f380f',tx:'#0f380f',tsh:'#c4d86a',pagefg:'#0f380f',line:'rgba(15,56,15,.35)'}},
    {k:'pastel',n:'Pastel',desc:'Candy sky and a pearl castle',c:{ground:'#f6e6f2',sheet:'#fff5fb',ink:'#4a2f63',accent:'#ff6fa5',accentS:'#d0407a',gold:'#ffd27a',sky1:'#c8b6ff',sky2:'#e0c3fc',sky3:'#ffd6e8',sky4:'#fff0f5',star:'#ffffff',moon:'#ffffff',moonS:'#ffd6e8',cloud:'#ffffff',cloudS:'#f2c6de',mtn:'#b8a4e3',snow:'#ffffff',hill:'#9ad8b8',stone:'#ffffff',stoneS:'#e6d6f0',outline:'#6b4a8a',door:'#8a5aa8',grass:'#a8e6c4',grass2:'#7cc9a0',path:'#ffe4b8',pathS:'#f2c890',tree:'#7cc9a0',treeS:'#a8e6c4',trunk:'#a8806a',frame:'#6b4a8a',pagefg:'#4a2f63',line:'rgba(74,47,99,.3)'}},
    {k:'hutan',n:'Hutan',desc:'Forest night with firefly hearts',c:{ground:'#05110d',sheet:'#0f2a22',ink:'#e8fff4',accent:'#ff6b6b',accentS:'#b83a3a',gold:'#ffd166',sky1:'#071712',sky2:'#0d2a20',sky3:'#1f4d3a',sky4:'#4a7f52',star:'#d8ffd0',moon:'#f4ffd8',moonS:'#c8e09a',cloud:'#3a6a50',cloudS:'#244a38',mtn:'#163a2c',snow:'#8ac49a',hill:'#123024',stone:'#a8b8a0',stoneS:'#788870',outline:'#0a1a12',door:'#2a1a10',grass:'#2a6a3a',grass2:'#1a4a28',path:'#b89a5a',pathS:'#8a7040',tree:'#0f3a1f',treeS:'#1f5a30',trunk:'#4a2e1a',frame:'#ffd166',pagefg:'#e8fff4',line:'rgba(232,255,244,.3)'}},
    {k:'salji',n:'Salji',desc:'Blue winter dusk and snowfields',c:{ground:'#0a1426',sheet:'#142640',ink:'#eef4ff',accent:'#ff5577',accentS:'#b8304c',gold:'#ffe08a',sky1:'#1b2a4a',sky2:'#2c4a7a',sky3:'#4a6fa5',sky4:'#9cc0e8',star:'#ffffff',moon:'#ffffff',moonS:'#c8dcf0',cloud:'#d8e8ff',cloudS:'#8aa8d0',mtn:'#3a5a8a',snow:'#ffffff',hill:'#c8dcf0',stone:'#b8c8dc',stoneS:'#8898b0',outline:'#1a2238',door:'#3a2a24',grass:'#eef4ff',grass2:'#c8dcf0',path:'#a8b8d0',pathS:'#8898b0',tree:'#1f4a3a',treeS:'#ffffff',trunk:'#4a3a2a',frame:'#ffffff',pagefg:'#eef4ff',line:'rgba(238,244,255,.3)'}},
    {k:'emas',n:'Emas',desc:'Golden desert evening',c:{ground:'#140c08',sheet:'#2a1a10',ink:'#fff2d8',accent:'#ff5a5a',accentS:'#b0302a',gold:'#ffd27a',sky1:'#2a1a3a',sky2:'#6a2a4a',sky3:'#d9822b',sky4:'#ffd27a',star:'#ffe8c0',moon:'#fff4d0',moonS:'#ffcc66',cloud:'#ffb870',cloudS:'#c87a3a',mtn:'#8a4a3a',snow:'#ffb870',hill:'#b86a3a',stone:'#f0d8a8',stoneS:'#c0a070',outline:'#3a2010',door:'#3a2010',grass:'#e0b060',grass2:'#c09040',path:'#f4d49a',pathS:'#d8b070',tree:'#4a7a3a',treeS:'#6a9a4a',trunk:'#6a4a2a',frame:'#ffd27a',pagefg:'#fff2d8',line:'rgba(255,242,216,.3)'}},
  ]});
