/* kotak: a linen/kraft gift box tied with glossy satin ribbon, a hand-tied bow and a kraft gift tag for the guest.
   Opening: the bow unties (loops fall slack, the ribbons slide off the lid) and the lid lifts away over tissue.
   Page: a paper card with a satin ribbon crossing it and a small bow. Skin: satin ribbon-banner headings. */
let uid=0;
function bow(c,id,small){const g=`url(#rg${id})`,gl=`url(#rl${id})`;
  const loopL='M100 70C82 44 46 18 24 30C6 42 14 80 38 86C60 92 86 80 100 70Z',foldL='M100 70C78 58 48 46 30 52C44 64 70 72 100 70Z';
  const tailL='M95 78C88 100 74 128 58 152L70 147L77 160C88 132 100 104 106 80Z',tailR='M105 78C114 98 130 120 150 140L137 142L138 156C122 130 108 104 96 80Z';
  return `<svg class="kt-bowsvg" viewBox="0 0 200 165"><defs>
   <linearGradient id="rg${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.ribLo}"/><stop offset=".22" stop-color="${c.rib}"/><stop offset=".42" stop-color="${c.ribHi}"/><stop offset=".6" stop-color="${c.rib}"/><stop offset=".85" stop-color="${c.ribLo}"/><stop offset="1" stop-color="${c.rib}"/></linearGradient>
   <linearGradient id="rl${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.ribLo}"/><stop offset=".3" stop-color="${c.rib}"/><stop offset=".5" stop-color="${c.ribHi}"/><stop offset=".7" stop-color="${c.rib}"/><stop offset="1" stop-color="${c.ribLo}"/></linearGradient>
   <filter id="rf${id}"><feGaussianBlur stdDeviation="1.6"/></filter><filter id="rs${id}" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="1" dy="4" stdDeviation="3" flood-opacity=".38"/></filter></defs>
   <g filter="url(#rs${id})">
   <g class="kt-tails"><path d="${tailL}" fill="${gl}"/><path d="${tailR}" fill="${gl}"/>
    <path d="M97 84C90 104 78 126 66 146" stroke="${c.ribHi}" stroke-width="2" fill="none" opacity=".55" filter="url(#rf${id})"/><path d="M104 84C114 104 126 120 140 134" stroke="${c.ribHi}" stroke-width="2" fill="none" opacity=".5" filter="url(#rf${id})"/></g>
   <g class="kt-loops"><path d="${loopL}" fill="${g}"/><path d="${loopL}" fill="${g}" transform="translate(200 0) scale(-1 1)"/>
    <path d="${foldL}" fill="${c.ribLo}" opacity=".55"/><path d="${foldL}" fill="${c.ribLo}" opacity=".55" transform="translate(200 0) scale(-1 1)"/>
    <path d="M92 62C76 40 50 26 32 34" stroke="${c.ribHi}" stroke-width="3" fill="none" opacity=".7" filter="url(#rf${id})"/><path d="M108 62C124 40 150 26 168 34" stroke="${c.ribHi}" stroke-width="3" fill="none" opacity=".7" filter="url(#rf${id})"/>
    <path d="M30 76C40 84 58 84 74 78M170 76C160 84 142 84 126 78" stroke="${c.ribLo}" stroke-width="1" fill="none" opacity=".6"/>
    <rect x="88" y="56" width="24" height="30" rx="8" fill="${gl}"/><path d="M93 60C97 68 97 76 93 82M107 60C103 68 103 76 107 82" stroke="${c.ribLo}" stroke-width="1" fill="none" opacity=".7"/>
    <path d="M96 59C99 66 99 74 97 83" stroke="${c.ribHi}" stroke-width="1.6" fill="none" opacity=".6"/></g></g></svg>`}
const TAG=(o,L,guest,en)=>`<span class="kt-tag"><span class="kt-hole"></span><span class="kt-tk">${guest?L.dear.replace(/\s+$/,''):(en?'With love':'Dengan kasih')}</span><b>${guest?esc(guest):esc(coverNames(o).join(' & '))}</b><span class="kt-td">${esc(fmtShort(o.date))}</span></span>`;
FAMILY({key:'kotak',name:'Kotak Hadiah',meaning:'Gift box',
  blurb:'A linen gift box tied with glossy satin ribbon and a tag for the guest; touch it and the bow unties.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    return `<section class="page pg-kotak ${c.foil?'kt-foil':''}" style="--rib:${c.rib};--ribhi:${c.ribHi};--riblo:${c.ribLo};--box:${c.box};--lidink:${c.lidink}"><div class="kt-cloth"></div>
     <div class="kt-card reveal"><span class="kt-pr"></span><span class="kt-pbow">${bow(c,'p'+id,1)}</span>
      <div class="kt-ptxt"><p class="kt-k">${ev(o,L)}</p><h1 class="names">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
       <div class="kt-rule"><i></i><b></b><i></i></div><p class="kt-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="kt-hj">${esc(o.hijri)}</p>`:''}
       <p class="kt-ven">${esc(o.venue)}</p><p class="kt-time">${en?'From':'Mulai'} ${esc(fmtTime(o.start,o.lang))}</p></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    return `<div class="cover cv-kotak ${c.foil?'kt-foil':''}" style="--rib:${c.rib};--ribhi:${c.ribHi};--riblo:${c.ribLo};--box:${c.box};--lidink:${c.lidink}"><div class="kt-cloth"></div>
     <${tag} class="kt-box" ${attr} aria-label="${L.open}"><span class="kt-base"></span>
      <span class="kt-lid"><span class="kt-frame"></span><span class="kt-mono"><span class="kt-mr"></span><b>${esc(K.initials(o).join(""))}</b></span>
       <span class="kt-txt"><span class="kt-k">${ev(o,L)}</span><span class="kt-n">${esc(n1)}<i>&amp;</i>${esc(n2)}</span><span class="kt-rule"><i></i><b></b><i></i></span><span class="kt-date">${esc(fmtDate(o.date,o.lang))}</span><span class="kt-ven">${esc(o.venue)}</span></span>
       <span class="kt-rv"></span><span class="kt-rh"></span>
       <span class="kt-bow">${bow(c,id)}</span><span class="kt-string"></span>${TAG(o,L,guest,en)}</span></${tag}>
     <p class="kt-hint">${en?'Touch the bow to untie it':'Sentuh reben untuk membuka'}</p></div>`},
  skin(el,o,th){K.cards(el);const c=th.c;[['--rib',c.rib],['--ribhi',c.ribHi],['--riblo',c.ribLo],['--box',c.box]].forEach(([k,v])=>el.style.setProperty(k,v));
    $$('.sheet > .sec',el).forEach(s=>{const h=$('h2',s);if(h&&!h.dataset.kt){h.dataset.kt=1;h.innerHTML=`<span class="kt-ban"><i class="l"></i><span>${h.innerHTML}</span><i class="r"></i></span>`}})},
  themes:[
    {k:'kraf',n:'Kraf',desc:'Kraft box, oxblood satin',c:{ground:'#e9e1d4',sheet:'#fbf7ef',ink:'#2c2420',accent:'#7a1f2b',gold:'#a8823c',pagefg:'#2c2420',box:'#c49a6c',lidink:'#3b2a1e',rib:'#8c1f2e',ribHi:'#e2808a',ribLo:'#4a0d16',line:'rgba(122,31,43,.2)'}},
    {k:'gading',n:'Gading',desc:'Ivory linen, champagne satin',c:{ground:'#d9cfc0',sheet:'#fffcf6',ink:'#2e2822',accent:'#8a6a3a',gold:'#b08d4f',pagefg:'#2e2822',box:'#f4eee2',lidink:'#7d5c26',foil:1,rib:'#d8bf92',ribHi:'#fff4dc',ribLo:'#9a7b4a'}},
    {k:'sage',n:'Sage',desc:'Sage linen, ivory satin',c:{ground:'#e8e6dc',sheet:'#fbfaf4',ink:'#26302a',accent:'#4d6650',gold:'#a8894a',pagefg:'#26302a',box:'#a9b8a0',lidink:'#f8f6ec',rib:'#efe8d8',ribHi:'#ffffff',ribLo:'#b9ae96',line:'rgba(77,102,80,.22)'}},
    {k:'jambu',n:'Jambu',desc:'Blush linen, rose satin',c:{ground:'#f3e6e2',sheet:'#fffaf8',ink:'#3a2629',accent:'#a24a5c',gold:'#b5876a',pagefg:'#3a2629',box:'#e8c4bf',lidink:'#6e2234',rib:'#c4566c',ribHi:'#f6b7c3',ribLo:'#7a2436',line:'rgba(162,74,92,.2)'}},
    {k:'nila',n:'Nila',desc:'Navy linen, gold satin',c:{ground:'#d8d6d0',sheet:'#f7f5ef',ink:'#1f2433',accent:'#22305a',gold:'#c4a15a',pagefg:'#1f2433',box:'#22305a',lidink:'#d6b46a',foil:1,rib:'#c8a25a',ribHi:'#fff0c4',ribLo:'#7a5a22',line:'rgba(34,48,90,.2)'}},
    {k:'hitam',n:'Hitam',desc:'Black linen, ivory satin',c:{ground:'#2a2826',sheet:'#f6f2ea',ink:'#1c1b1a',accent:'#2b2826',gold:'#cfae6a',pagefg:'#f1ece2',box:'#1e1d1c',lidink:'#d7b874',foil:1,rib:'#efe7d8',ribHi:'#ffffff',ribLo:'#a99e8c',line:'rgba(43,40,38,.2)'}},
    {k:'marun',n:'Marun',desc:'Burgundy linen, blush satin',c:{ground:'#3a1a20',sheet:'#fcf5ef',ink:'#2e1c1f',accent:'#6e1c2e',gold:'#d4a580',pagefg:'#f6e7df',box:'#6e1c2e',lidink:'#e6c19a',foil:1,rib:'#e9b9ae',ribHi:'#fff0ea',ribLo:'#a8685e',line:'rgba(110,28,46,.2)'}},
    {k:'biru',n:'Biru',desc:'Dusty blue linen, navy satin',c:{ground:'#eef0f0',sheet:'#fbfcfb',ink:'#1f2a36',accent:'#2b4a6e',gold:'#a8894a',pagefg:'#1f2a36',box:'#a9bccd',lidink:'#1f3554',rib:'#1f3554',ribHi:'#7d9cc8',ribLo:'#0b1626',line:'rgba(43,74,110,.2)'}},
  ]});
