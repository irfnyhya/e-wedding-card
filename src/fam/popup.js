/* popup: a real pop-up card. Cut paper layers (far trees, the mosque, frangipani in front) stand up from the fold
   in front of a starry back panel, with a gold crescent hung on a thread.
   Cover: the card closed, a die-cut arch in its front showing the night sky. Tap "Buka Jemputan" and the front
   folds down to become the floor while the paper layers stand up. Page: the open card above the names.
   Skin: cards of coloured stock with a scored fold line and a small cut-paper dome. */
const puSvg=(vb,body)=>K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><path fill-rule="evenodd" d="${body}"/></svg>`);
// an arched window or door, as a hole: x,y = bottom left
const puArch=(x,y,w,h)=>{const r=w/2;return `M${x} ${y}V${y-h+r}C${x} ${y-h+r*.3} ${x+r*.6} ${y-h+r*.15} ${x+r} ${y-h}C${x+w-r*.6} ${y-h+r*.15} ${x+w} ${y-h+r*.3} ${x+w} ${y-h+r}V${y}Z`};
// onion dome: base from x0 to x1 at y, tip at y-h
const puDome=(x0,x1,y,h)=>{const w=x1-x0,c=(x0+x1)/2;return `M${x0} ${y}C${x0-w*.08} ${y-h*.42} ${c-w*.28} ${y-h*.62} ${c} ${y-h}C${c+w*.28} ${y-h*.62} ${x1+w*.08} ${y-h*.42} ${x1} ${y}Z`};
const puMinaret=(x,w,top)=>{const c=x+w/2;return `M${x} 232V${top+70}H${x-3}V${top+64}H${x+w+3}V${top+70}H${x+w}V232Z`+
  `M${x+1} ${top+64}V${top+34}H${x-3}V${top+28}H${x+w+3}V${top+34}H${x+w-1}V${top+64}Z`+puDome(x,x+w,top+28,20)+`M${c-.7} ${top+9}V${top-2}H${c+.7}V${top+9}Z`};
const PU_MOSQUE=(()=>{let d='';
  d+='M66 232V150H234V232Z';                                     // prayer hall
  for(let x=66;x<234;x+=8)d+=`M${x} 151V146H${x+5}V151Z`;          // parapet teeth
  d+='M108 152V112H192V152Z';                                    // drum
  d+=puDome(102,198,113,74)+'M149.2 40V22H150.8V40Z'+'M150 26a3 3 0 1 0 .01 0Z';
  d+=puDome(72,112,151,30)+puDome(188,228,151,30)+'M91.4 122V112H92.6V122ZM207.4 122V112H208.6V122Z';
  d+=puMinaret(32,18,72)+puMinaret(250,18,72);
  // holes: door, hall windows, drum windows, minaret slits
  d+=puArch(134,232,32,42);[82,104,180,202].forEach(x=>{d+=puArch(x,214,14,30)});
  [118,134,150,166,182].forEach(x=>{d+=puArch(x-5,146,10,18)});
  [41,259].forEach(x=>{d+=puArch(x-3,196,6,16)+puArch(x-3,160,6,12)});
  return puSvg('0 0 300 232',d)})();
const PU_FAR=(()=>{let d='M0 150V108';const r=rng(7);let x=0;
  while(x<300){const w=14+r()*16,h=8+r()*12;d+=`Q${x+w/2} ${108-h*1.6} ${x+w} 108`;x+=w}
  d+='V150Z';
  d+=puDome(18,44,96,22)+'M18 110V96H44V110Z'+puDome(258,282,98,20)+'M258 110V98H282V110Z';
  return puSvg('0 0 300 150',d)})();
// frangipani and palm fronds in front, open in the middle so the door shows
const PU_FRONT=(()=>{let d='';const leaf=(x,y,a,l,w)=>{const c=Math.cos(a),s=Math.sin(a),px=-s,py=c;
    return `M${x} ${y}Q${x+c*l*.5+px*w} ${y+s*l*.5+py*w} ${x+c*l} ${y+s*l}Q${x+c*l*.5-px*w} ${y+s*l*.5-py*w} ${x} ${y}Z`};
  [[-.2,-2.2,70,13],[-.2,-1.7,78,14],[-.2,-1.2,64,12],[-.2,-2.7,56,11],[-.2,-.8,50,10]].forEach(([dx,a,l,w])=>{d+=leaf(30,124,a,l,w);d+=leaf(270,124,Math.PI-a,l,w)});
  d+='M0 124V112Q20 92 44 108Q60 96 76 112Q86 104 98 116V124ZM300 124V112Q280 92 256 108Q240 96 224 112Q214 104 202 116V124Z';
  return puSvg('0 0 300 124',d)})();
const PU_FLOWERS=(()=>{let d='';const fl=(x,y,r,rot)=>{for(let i=0;i<5;i++){const a=rot+i*Math.PI*2/5,c=Math.cos(a),s=Math.sin(a);
    d+=`M${x} ${y}Q${x+c*r*1.1-s*r*.55} ${y+s*r*1.1+c*r*.55} ${x+c*r} ${y+s*r}Q${x+c*r*.4+s*r*.35} ${y+s*r*.4-c*r*.35} ${x} ${y}Z`}};
  fl(22,96,9,.3);fl(52,104,7.5,1);fl(10,116,7,2);fl(278,96,9,.6);fl(248,104,7.5,1.4);fl(290,116,7,2.2);
  return puSvg('0 0 300 124',d)})();
const PU_DOME_ICON=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 50"><path d="${puDome(14,46,40,30)}M12 40H48V50H12ZM29.4 10V2H30.6V10Z"/></svg>`);
const puCard=(o,L,open)=>{const [n1,n2]=coverNames(o);
  return `<div class="pu-card${open?' is-open':''}">
    <div class="pu-back"><i class="pu-arc"></i><i class="pu-moon"><b></b></i></div>
    <div class="pu-cover"><div class="pu-out"><i class="pu-rim"></i>
        <div class="pu-ctxt"><p class="pu-k">${ev(o,L)}</p><p class="pu-cn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="pu-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
      <div class="pu-inside"></div></div>
    <div class="pu-lay pu-far"><i style="-webkit-mask-image:${PU_FAR};mask-image:${PU_FAR}"></i></div>
    <div class="pu-lay pu-mosque"><i style="-webkit-mask-image:${PU_MOSQUE};mask-image:${PU_MOSQUE}"></i></div>
    <div class="pu-lay pu-front"><i style="-webkit-mask-image:${PU_FRONT};mask-image:${PU_FRONT}"></i></div>
    <div class="pu-lay pu-flowers"><i style="-webkit-mask-image:${PU_FLOWERS};mask-image:${PU_FLOWERS}"></i></div>
  </div>`};
const puVars=c=>`--p1:${c.p1};--p2:${c.p2};--p3:${c.p3};--p4:${c.p4};--p5:${c.p5}`;
FAMILY({key:'popup',name:'Pop-up',meaning:'Pop-up card',
  blurb:'A cut-paper pop-up card: open it and the mosque, the far trees and the frangipani stand up from the fold under a hanging gold crescent.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-popup${th.c.dark?' pu-dk':''}" style="${puVars(th.c)}"><div class="pu-table"></div>
      <div class="pu-stage reveal">${puCard(o,L,true)}</div>
      <div class="pu-txt"><p class="pu-k kicker reveal d1">${ev(o,L)}</p><h1 class="pu-names reveal d1">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1>
        <p class="pu-date reveal d2">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="pu-ven reveal d2">${esc(o.venue)}</p>`:''}
        <a class="pu-pill reveal d3" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a></div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en';
    return `<div class="cover cv-popup${th.c.dark?' pu-dk':''}" style="${puVars(th.c)}"><div class="pu-table"></div>
      <div class="pu-stage">${puCard(o,L,false)}</div>
      <div class="pu-foot">${guest?`<p class="pu-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="pu-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);const c=th.c;el.style.setProperty('--p1',c.p1);el.style.setProperty('--p2',c.p2);el.style.setProperty('--p4',c.p4);el.style.setProperty('--pudome',PU_DOME_ICON);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'nila',n:'Nila',desc:'Ivory mosque under an indigo sky',c:{ground:'#e6e0d4',sheet:'#fbf7ee',ink:'#232638',accent:'#2b3266',gold:'#c09a4e',pagefg:'#232638',p1:'#273063',p2:'#f8f2e4',p3:'#8f93b8',p4:'#3f6b55',p5:'#fbf4e2'}},
    {k:'zamrud',n:'Zamrud',desc:'Cream mosque under an emerald sky',c:{ground:'#e4e2d6',sheet:'#fbf9f1',ink:'#1f2b25',accent:'#1d5a44',gold:'#b8954a',pagefg:'#1f2b25',p1:'#1b5541',p2:'#fbf5e6',p3:'#86a893',p4:'#6f8f55',p5:'#fff6dc'}},
    {k:'marun',n:'Marun',desc:'Blush mosque under a maroon sky',c:{ground:'#ece1d9',sheet:'#fdf8f3',ink:'#2e1c20',accent:'#7a1f33',gold:'#bf9157',pagefg:'#2e1c20',p1:'#6e1c2e',p2:'#fbefe6',p3:'#b88a8f',p4:'#5e7a52',p5:'#fde6da'}},
    {k:'senja',n:'Senja',desc:'Dusk coral sky, lilac trees',c:{ground:'#efe3dc',sheet:'#fffaf6',ink:'#33262e',accent:'#b0463f',gold:'#c3955a',pagefg:'#33262e',p1:'#d9806a',p2:'#fff6ec',p3:'#b9a2c9',p4:'#6f8a6a',p5:'#ffe9d2'}},
    {k:'laut',n:'Laut',desc:'White mosque on a sea-blue sky',c:{ground:'#e2e9ec',sheet:'#fbfdfd',ink:'#1d2f3a',accent:'#2a5f80',gold:'#b7974f',pagefg:'#1d2f3a',p1:'#3a7a9c',p2:'#ffffff',p3:'#a3c8d3',p4:'#4f8a76',p5:'#f6f2dc'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric mosque on deep teal',c:{ground:'#ece4cf',sheet:'#fffaee',ink:'#2a2a22',accent:'#1f5560',gold:'#b5862c',pagefg:'#2a2a22',p1:'#1f5560',p2:'#f6e3b0',p3:'#6f9a9a',p4:'#5a7a3a',p5:'#fff6dc'}},
    {k:'malam',n:'Malam',desc:'Gold mosque on a midnight card',c:{ground:'#151a2b',sheet:'#f7f3ea',ink:'#1d2232',accent:'#26305a',gold:'#d6b25c',pagefg:'#efe9da',p1:'#0f1630',p2:'#ead28e',p3:'#34416e',p4:'#2a4c3e',p5:'#f3e6c0',dark:1}},
    {k:'jambu',n:'Jambu',desc:'Blush sky, white mosque, sage leaves',c:{ground:'#f2e6e5',sheet:'#fffafa',ink:'#3a2729',accent:'#a54b5f',gold:'#bf946a',pagefg:'#3a2729',p1:'#d4909a',p2:'#fffaf6',p3:'#c7d3bd',p4:'#6f8c6c',p5:'#ffe6ea'}},
  ]});
