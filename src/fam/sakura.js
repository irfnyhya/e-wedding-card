/* sakura: a sumi-e cherry branch. A gnarled ink branch brushed across textured paper, pale pink blossoms
   with fine stamens, a few buds, and a red seal with the couple's initials.
   Cover: touched, a few petals drift down and the branch slides away. Page: the branch across the top.
   Skin: one long sheet of paper with dry-brush ink dividers and a blossom on each heading. */
needFont('Allura');
const q=n=>+n.toFixed(1);
let U=0;
// a tapered brush stroke along a skeleton: [[x,y,w],...]
function stroke(pts){const L=[],R=[];for(let i=0;i<pts.length;i++){const [x,y,w]=pts[i],p=pts[Math.max(0,i-1)],n=pts[Math.min(pts.length-1,i+1)];let dx=n[0]-p[0],dy=n[1]-p[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;L.push([x-dy*w/2,y+dx*w/2]);R.push([x+dy*w/2,y-dx*w/2])}
  const sm=a=>a.map(([x,y],i)=>i?`L${q(x)} ${q(y)}`:`M${q(x)} ${q(y)}`).join('');return sm(L)+R.reverse().map(([x,y])=>`L${q(x)} ${q(y)}`).join('')+'Z'}
function limb(x0,y0,x1,y1,w0,w1,bend,seed,n=14){const R=rng(seed),pts=[];for(let i=0;i<=n;i++){const t=i/n,b=Math.sin(t*Math.PI)*bend,dx=x1-x0,dy=y1-y0,l=Math.hypot(dx,dy);
    pts.push([x0+dx*t-dy/l*b+(R()-.5)*3,y0+dy*t+dx/l*b+(R()-.5)*3,Math.max(.6,(w0+(w1-w0)*t)*(.82+R()*.36))])}return pts}
// the branch: main limb from the left edge, sub-branches and twigs; returns ink path, wash path, moss dots and blossom spots
function branchParts(){const S=[],W=[],spots=[];
  const add=(a,wash)=>{S.push(stroke(a));if(wash)W.push(stroke(a.map(([x,y,w])=>[x+2,y+3,w*1.7])));return a};
  const at=(a,t)=>a[Math.round(t*(a.length-1))];
  const main=add(limb(-30,96,300,222,22,5,-26,3,18),1);
  const tip=add(limb(...at(main,1).slice(0,2),412,236,5,.8,6,4,10));
  const b1=add(limb(...at(main,.32).slice(0,2),214,30,9,1.2,22,5,12),1);
  const b2=add(limb(...at(main,.58).slice(0,2),236,318,7,1,-18,6,12));
  const b3=add(limb(...at(main,.86).slice(0,2),352,150,5,.8,10,7,10));
  const t1=add(limb(...at(b1,.55).slice(0,2),246,96,3,.6,6,8,6));
  const t2=add(limb(...at(b2,.5).slice(0,2),184,300,2.6,.6,-6,9,6));
  const t3=add(limb(...at(main,.45).slice(0,2),160,236,3,.6,8,10,6));
  const t4=add(limb(...at(tip,.4).slice(0,2),372,286,2.4,.6,-6,11,6));
  // blossoms sit near the ends and along the younger wood
  [[b1,.8],[b1,.98],[t1,.95],[t1,.5],[main,.7],[main,.92],[b2,.75],[b2,.98],[t2,.95],[b3,.7],[b3,.98],[tip,.6],[tip,.98],[t3,.95],[t4,.98],[main,.38],[b1,.45]].forEach(([a,t],i)=>{const [x,y]=at(a,t);spots.push([x,y,i])});
  const R=rng(21);let moss='';[main,b1,b2].forEach(a=>a.forEach(([x,y,w],i)=>{if(i%3===1&&w>3)moss+=`M${q(x+(R()-.5)*w)} ${q(y-w/2-1)}l${q(R()*2)} ${q(-1.6-R()*1.5)}`}));
  return {ink:S.join(''),wash:W.join(''),moss,spots}}
const BR=branchParts();
function blossom(x,y,r,rot,c,id,open=1){const P=`M0 0C${q(-r*.62)} ${q(-r*.28)} ${q(-r*.66)} ${q(-r*.98)} ${q(-r*.2)} ${q(-r*1.04)}L0 ${q(-r*.86)}L${q(r*.2)} ${q(-r*1.04)}C${q(r*.66)} ${q(-r*.98)} ${q(r*.62)} ${q(-r*.28)} 0 0Z`;
  let st='';for(let i=0;i<14;i++){const a=i/14*Math.PI*2+.2,l=r*(.42+(i%3)*.08);st+=`<path d="M0 0L${q(Math.cos(a)*l)} ${q(Math.sin(a)*l)}" stroke="${c.stamen}" stroke-width=".35"/><circle cx="${q(Math.cos(a)*l)}" cy="${q(Math.sin(a)*l)}" r=".75" fill="${c.anther}"/>`}
  return `<g transform="translate(${q(x)} ${q(y)}) rotate(${rot}) scale(${open} 1)">${[0,72,144,216,288].map(a=>`<path d="${P}" transform="rotate(${a})" fill="url(#${id}p)" stroke="${c.petalE}" stroke-width=".35"/>`).join('')}<circle r="${q(r*.22)}" fill="${c.heart}" opacity=".85"/>${st}</g>`}
function bud(x,y,r,rot,c){return `<g transform="translate(${q(x)} ${q(y)}) rotate(${rot})"><ellipse cx="0" cy="${q(-r)}" rx="${q(r*.62)}" ry="${q(r)}" fill="${c.petalD}"/><ellipse cx="${q(-r*.15)}" cy="${q(-r*1.15)}" rx="${q(r*.25)}" ry="${q(r*.5)}" fill="#fff" opacity=".4"/><path d="M0 1L${q(-r*.5)} ${q(-r*.5)}M0 1L${q(r*.5)} ${q(-r*.5)}M0 1V${q(r*.8)}" stroke="${c.ink}" stroke-width="1.1" opacity=".75"/></g>`}
function branchSvg(c,cls){const id=`sk${++U}`,R=rng(41);let bl='';
  BR.spots.forEach(([x,y,i])=>{const k=i%5;if(k===3){bl+=bud(x+(R()-.5)*6,y+(R()-.5)*6,4+R()*1.5,(R()-.5)*90,c)}else{bl+=blossom(x+(R()-.5)*12,y+(R()-.5)*12,10.5+R()*5,R()*72,c,id,k===4?.62:1)}});
  bl+=blossom(150,128,11,20,c,id)+bud(268,74,4.5,30,c)+bud(330,206,5,-40,c)+blossom(196,206,10,40,c,id,.7)+blossom(232,52,12,10,c,id)+blossom(250,300,11,50,c,id)+blossom(392,232,11,30,c,id,.7)+bud(222,24,4.5,-20,c)+blossom(118,150,9,60,c,id,.6);
  return `<svg class="${cls}" viewBox="0 0 400 360" ${NS}><defs>
   <radialGradient id="${id}p" cx="0" cy="0" r="16" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c.petalD}"/><stop offset=".45" stop-color="${c.petal}"/><stop offset="1" stop-color="${c.petalL}"/></radialGradient>
   <filter id="${id}i" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feTurbulence type="fractalNoise" baseFrequency=".012 .35" numOctaves="3" seed="8"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -1.5 1.62" result="m"/><feComposite in="d" in2="m" operator="in"/></filter>
   <filter id="${id}w"><feGaussianBlur stdDeviation="2.4"/></filter>
   <filter id="${id}s" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation=".35"/></filter></defs>
   <path d="${BR.wash}" fill="${c.ink}" opacity=".16" filter="url(#${id}w)"/>
   <g filter="url(#${id}i)"><path d="${BR.ink}" fill="${c.ink}"/></g>
   <path d="${BR.moss}" stroke="${c.ink}" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
   <g filter="url(#${id}s)">${bl}</g></svg>`}
function petal1(c){return `<svg viewBox="-10 -12 20 22" ${NS}><path d="M0 8C-6 5 -8 -4 -3 -9L0 -6.8L3 -9C8 -4 6 5 0 8Z" fill="${c.petal}" stroke="${c.petalE}" stroke-width=".4"/><path d="M0 7C-1 2 -1 -2 0 -6" stroke="${c.petalD}" stroke-width=".5" fill="none" opacity=".6"/></svg>`}
function seal(o,c,cls){const [a,b]=K.initials(o),id=`ss${++U}`;
  return `<svg class="${cls}" viewBox="0 0 60 60" ${NS}><defs><filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="12"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -1.3 1.45" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter></defs>
   <g filter="url(#${id})"><rect x="3" y="3" width="54" height="54" rx="4" fill="${c.seal}"/><rect x="7" y="7" width="46" height="46" rx="2" fill="none" stroke="${c.paper}" stroke-width="1.4"/>
   <text x="30" y="27" text-anchor="middle" font-family="Cormorant Garamond, serif" font-weight="600" font-size="19" fill="${c.paper}">${esc(a)}</text><text x="30" y="47" text-anchor="middle" font-family="Cormorant Garamond, serif" font-weight="600" font-size="19" fill="${c.paper}">${esc(b)}</text>
   <path d="M30 29.5V32" stroke="${c.paper}" stroke-width="1.2"/></g></svg>`}
const FLECK=(()=>{const R=rng(77);let d='';for(let i=0;i<70;i++){const x=R()*400,y=R()*760,r=.6+R()*R()*3.4,n=4+Math.floor(R()*3);let p='';for(let k=0;k<n;k++){const a=k/n*Math.PI*2+R(),rr=r*(.5+R()*.7);p+=(k?'L':'M')+q(x+Math.cos(a)*rr)+' '+q(y+Math.sin(a)*rr)}d+=p+'Z'}
  return K.uri(`<svg ${NS} viewBox="0 0 400 760"><path d="${d}"/></svg>`)})();
const DIV=c=>K.uri(`<svg ${NS} width="300" height="30" viewBox="0 0 300 30"><defs><filter id="f" x="-2%" y="-20%" width="104%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".02 .8" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.5"/>
  <feTurbulence type="fractalNoise" baseFrequency=".01 .45" numOctaves="3" seed="9"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.8 1.7" result="m"/><feComposite in2="m" operator="in"/></filter></defs>
  <path d="M8 17C60 10 120 12 170 14C220 16 262 13 292 15C262 17 210 21 160 20C100 19 50 20 8 17Z" fill="${c.ink}" filter="url(#f)"/></svg>`);
const pal=c=>({ink:c.ink2||c.ink,petal:c.petal||'#f6c6d3',petalL:c.petalL||'#fdf0f3',petalD:c.petalD||'#e58aa6',petalE:c.petalE||'#e9a9bb',heart:c.heart||'#d0577c',stamen:c.stamen||'#b04a62',anther:c.anther||'#8a2a3e',seal:c.seal||c.accent,paper:c.sheet});
FAMILY({key:'sakura',name:'Sakura',meaning:'Cherry blossom ink',
  blurb:'A sumi-e ink cherry branch in pale pink bloom across textured paper, signed with a red seal; touch it and the branch drifts away.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Allura', 'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),c=pal(th.c),en=o.lang==='en';
    return `<section class="page pg-sakura" style="--div:${DIV(c)};--fleck:${FLECK}"><div class="sakura-paper"></div><i class="sakura-fl"></i>${branchSvg(c,'sakura-pbr')}
     <div class="sakura-ptxt"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <i class="sakura-div reveal d2"></i><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="sakura-v reveal d3">${esc(o.venue)}</p>${seal(o,c,'sakura-pseal reveal d3')}</div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=pal(th.c),en=o.lang==='en';
    const pts=[[62,44,30,'-20deg','40px','150px'],[78,30,-15,'60deg','-30px','190px'],[34,54,10,'-80deg','50px','140px'],[86,48,40,'110deg','-20px','170px'],[52,22,-30,'30deg','30px','220px']];
    return `<div class="cover cv-sakura" style="--div:${DIV(c)};--fleck:${FLECK}"><div class="sakura-paper"></div><i class="sakura-fl"></i>
     <div class="sakura-br">${branchSvg(c,'sakura-cbr')}</div>
     ${pts.map(([x,y,r,rr,dx,dy],i)=>`<i class="sakura-pt" style="left:${x}%;top:${y}%;--r:${r}deg;--rr:${rr};--dx:${dx};--dy:${dy};--dl:${(i*.08).toFixed(2)}s">${petal1(c)}</i>`).join('')}
     <div class="sakura-txt"><p class="sakura-k">${ev(o,L)}</p><p class="sakura-n">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><i class="sakura-div"></i><p class="sakura-d">${esc(fmtDate(o.date,o.lang))}</p><p class="sakura-vn">${esc(o.venue)}</p></div>
     <div class="sakura-foot">${guest?`<p class="sakura-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<${tag} class="sakura-seal" ${attr} aria-label="${L.open}">${seal(o,c,'')}</${tag}><p class="sakura-hint">${en?'Touch the seal to open':'Sentuh cop untuk membuka'}</p></div></div>`},
  skin(el,o,th){el.style.setProperty('--div',DIV(pal(th.c)));el.style.setProperty('--fleck',FLECK);const c=pal(th.c);
    const bl=`<svg viewBox="-16 -16 32 32" ${NS}><defs><radialGradient id="skh" cx="0" cy="0" r="14" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${c.petalD}"/><stop offset=".45" stop-color="${c.petal}"/><stop offset="1" stop-color="${c.petalL}"/></radialGradient></defs>${blossom(0,0,13,10,c,'skh').replace(/url\(#skh\)/g,'url(#skh)')}</svg>`;
    $$('.sec h2',el).forEach(h=>h.insertAdjacentHTML('afterbegin',`<i class="sakura-hb">${bl}</i>`));
    K.secs(el).forEach((s,i)=>{if(i)s.insertAdjacentHTML('afterbegin','<i class="sakura-sd"></i>')})},
  themes:[
    {k:'jambu',n:'Jambu',desc:'Pink blossom, black ink, rice paper',c:{ground:'#f5f0e8',sheet:'#fbf8f2',ink:'#2a2624',accent:'#b8475f',gold:'#a88a50',pagefg:'#2a2624',ink2:'#1f1b19'}},
    {k:'malam',n:'Yozakura',desc:'Night blossom on indigo paper',c:{ground:'#18203a',sheet:'#1d2643',ink:'#ece6f0',accent:'#f2b8c8',gold:'#c9b38a',pagefg:'#ece6f0',ink2:'#cfd4e6',seal:'#c8364f',petal:'#f1c4d2',petalL:'#fff2f5',petalD:'#d9849e',line:'rgba(236,230,240,.2)'}},
    {k:'putih',n:'Putih',desc:'White blossom, grey ink',c:{ground:'#f3f2ef',sheet:'#fbfbf9',ink:'#2f2f33',accent:'#7a5a66',gold:'#9a8f80',pagefg:'#2f2f33',ink2:'#3a3a3e',petal:'#f8eef0',petalL:'#ffffff',petalD:'#e8c6cf',heart:'#c98a9c',seal:'#b8364a'}},
    {k:'merah',n:'Beni',desc:'Deep rose blossom, vermilion seal',c:{ground:'#f6eee6',sheet:'#fcf7f1',ink:'#2b2422',accent:'#a3283e',gold:'#a88a50',pagefg:'#2b2422',ink2:'#1e1816',petal:'#ec9cb2',petalL:'#fbdbe4',petalD:'#d0587c',heart:'#a62a4e',seal:'#c8352f'}},
    {k:'kunyit',n:'Kunyit',desc:'Blossom on warm turmeric paper',c:{ground:'#efe2c4',sheet:'#f7eed8',ink:'#2d261c',accent:'#a3424f',gold:'#9a7a3e',pagefg:'#2d261c',ink2:'#231c13'}},
    {k:'sage',n:'Sage',desc:'Blossom on sage-green paper',c:{ground:'#e3e8dc',sheet:'#f3f5ee',ink:'#283028',accent:'#a04860',gold:'#8a8a5a',pagefg:'#283028',ink2:'#1f261f'}},
    {k:'hitam',n:'Sumi',desc:'Pale blossom on charcoal paper',c:{ground:'#1b1a19',sheet:'#232120',ink:'#efe9e2',accent:'#efb3c3',gold:'#c3ad8a',pagefg:'#efe9e2',ink2:'#d8d2ca',seal:'#c43a46',petal:'#f0c7d2',petalL:'#fff4f6',petalD:'#d88ea4',line:'rgba(239,233,226,.2)'}},
    {k:'ungu',n:'Fuji',desc:'Lilac blossom on dove paper',c:{ground:'#eeebf1',sheet:'#f8f6fa',ink:'#2b2834',accent:'#7b4f8f',gold:'#9a8a9a',pagefg:'#2b2834',ink2:'#24212c',petal:'#e4cdea',petalL:'#f8f0fa',petalD:'#c29ad0',heart:'#8e5aa2',stamen:'#7a4a8a',anther:'#5a2a6a'}},
  ]});
