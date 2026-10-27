/* jam: an engraved hunter-case pocket watch on its chain.
   Cover: the closed watch, engine-turned (guilloche) lid with a monogram cartouche, knurled rim, crown and bow, a curb chain.
   Opening: the lid springs open on its hinge to show the enamel dial, hands set at the start time, then everything fades.
   Page: the open dial with the names inside the chapter ring. Skin: Roman-numeral bezels on headings, chain dividers. */
let uid=0;
const f=v=>(+v).toFixed(2);
const pt=(r,deg,cx=100,cy=100)=>{const a=(deg-90)*Math.PI/180;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r]};
const gv=c=>`--g1:${c.g1};--g2:${c.g2};--g3:${c.g3}`;
const ROM=['XII','I','II','III','IIII','V','VI','VII','VIII','IX','X','XI'];
const ROMN=n=>{let r='';for(const [a,t] of [[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']])while(n>=a){r+=t;n-=a}return r};
const metal=(id,c)=>`<linearGradient id="m${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.g1}"/><stop offset=".35" stop-color="${c.g2}"/><stop offset=".55" stop-color="${c.g1}"/><stop offset=".8" stop-color="${c.g3}"/><stop offset="1" stop-color="${c.g2}"/></linearGradient>
  <radialGradient id="r${id}" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="${c.g1}"/><stop offset=".55" stop-color="${c.g2}"/><stop offset="1" stop-color="${c.g3}"/></radialGradient>
  <radialGradient id="s${id}" cx="34%" cy="26%" r="45%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`;
const knurl=(r0,r1,n,col,w=.5)=>{let s='';for(let i=0;i<n;i++){const [a,b]=pt(r0,i*360/n),[x,y]=pt(r1,i*360/n);s+=`M${f(a)} ${f(b)}L${f(x)} ${f(y)}`}return `<path d="${s}" stroke="${col}" stroke-width="${w}"/>`};
// the lid front: knurled rim, bead row, engine-turned rosette field, polished cartouche with a wreath and the monogram
function lidFront(c,id,mono){let rose='';for(let i=0;i<60;i++){const [x,y]=pt(54,i*6);rose+=`<circle cx="${f(x)}" cy="${f(y)}" r="30"/>`}
  let beads='';for(let i=0;i<72;i++){const [x,y]=pt(90.5,i*5);beads+=`<circle cx="${f(x)}" cy="${f(y)}" r="1.25"/>`}
  let leaves='';for(let i=0;i<28;i++){if(i===0||i===14)continue;const d=i*360/28,[x,y]=pt(33,d);leaves+=`<ellipse cx="${f(x)}" cy="${f(y)}" rx="1.4" ry="3.6" transform="rotate(${d+(i<14?30:-30)} ${f(x)} ${f(y)})"/>`}
  return `<svg viewBox="0 0 200 200"><defs>${metal(id,c)}<clipPath id="cf${id}"><circle cx="100" cy="100" r="86"/></clipPath><mask id="mk${id}"><rect width="200" height="200" fill="#fff"/><circle cx="100" cy="100" r="40" fill="#000"/></mask></defs>
   <circle cx="100" cy="100" r="100" fill="url(#m${id})"/>${knurl(95.5,99.6,160,c.g3,.6)}
   <circle cx="100" cy="100" r="95" fill="none" stroke="${c.g3}" stroke-width=".7"/><circle cx="100" cy="100" r="93.6" fill="none" stroke="${c.g1}" stroke-width=".5"/>
   <g fill="url(#r${id})" stroke="${c.g3}" stroke-width=".35">${beads}</g>
   <circle cx="100" cy="100" r="87" fill="url(#r${id})" stroke="${c.g3}" stroke-width=".7"/>
   <g clip-path="url(#cf${id})" mask="url(#mk${id})" fill="none"><g stroke="${c.g3}" stroke-width=".42" opacity=".75">${rose}</g><g stroke="${c.g1}" stroke-width=".3" opacity=".6" transform="translate(.5 .6)">${rose}</g></g>
   <circle cx="100" cy="100" r="40" fill="url(#m${id})" stroke="${c.g3}" stroke-width=".8"/><circle cx="100" cy="100" r="37.5" fill="none" stroke="${c.g3}" stroke-width=".4"/>
   <g fill="${c.g3}" opacity=".8">${leaves}</g>
   <text x="100" y="101" text-anchor="middle" dominant-baseline="central" font-family="Pinyon Script, cursive" font-size="27" fill="${c.g3}">${mono}</text>
   <text x="100.6" y="101.7" text-anchor="middle" dominant-baseline="central" font-family="Pinyon Script, cursive" font-size="26" fill="${c.g1}" opacity=".35">${mono}</text>
   <circle cx="100" cy="100" r="100" fill="url(#s${id})"/></svg>`}
// the inside of the lid: polished, with an engraved inscription (date)
function lidBack(c,id,o){const d=new Date((o.date||'2026-01-01')+'T00:00:00'),ins=isNaN(d)?'':`${d.getDate()} · ${ROMN(d.getMonth()+1)} · ${d.getFullYear()}`;
  return `<svg viewBox="0 0 200 200"><defs>${metal('b'+id,c)}</defs><circle cx="100" cy="100" r="100" fill="url(#rb${id})"/>${knurl(95.5,99.6,160,c.g3,.6)}
   <circle cx="100" cy="100" r="88" fill="none" stroke="${c.g3}" stroke-width=".6"/><circle cx="100" cy="100" r="84" fill="none" stroke="${c.g3}" stroke-width=".35"/>
   <text x="100" y="92" text-anchor="middle" font-family="Pinyon Script, cursive" font-size="20" fill="${c.g3}">${esc(K.initials(o).join(' & '))}</text>
   <text x="100" y="116" text-anchor="middle" font-family="Cinzel, serif" font-size="9" letter-spacing="2" fill="${c.g3}">${ins}</text></svg>`}
// the enamel dial: railroad minute track, Roman chapters, small seconds, Breguet hands at the start time
function dial(c,id,o,hands=true,mid=''){let tr='';for(let i=0;i<60;i++){const [a,b]=pt(i%5?84:82,i*6),[x,y]=pt(87.5,i*6);tr+=`M${f(a)} ${f(b)}L${f(x)} ${f(y)}`}
  const nums=ROM.map((n,i)=>{const [x,y]=pt(71,i*30);return `<text x="${f(x)}" y="${f(y)}" transform="rotate(${i*30} ${f(x)} ${f(y)})" text-anchor="middle" dominant-baseline="central">${n}</text>`}).join('');
  let ss='';for(let i=0;i<30;i++){const [a,b]=pt(i%5?13.6:12.4,i*12,100,138),[x,y]=pt(15.5,i*12,100,138);ss+=`M${f(a)} ${f(b)}L${f(x)} ${f(y)}`}
  const [h,m]=(o.start||'11:00').split(':').map(Number),ha=((h%12)+(m||0)/60)*30,ma=(m||0)*6;
  const hand=(len,w,ang,moon)=>`<g transform="rotate(${ang} 100 100)"><path d="M100 ${100+14}L${100+w} 100L100.5 ${100-len+ (moon?12:0)}L99.5 ${100-len+(moon?12:0)}L${100-w} 100Z" fill="${c.hand}"/>${moon?`<circle cx="100" cy="${100-len+18}" r="5" fill="none" stroke="${c.hand}" stroke-width="1.8"/><path d="M100 ${100-len+13}L100 ${100-len}" stroke="${c.hand}" stroke-width="1.1" stroke-linecap="round"/>`:''}</g>`;
  return `<svg viewBox="0 0 200 200"><defs>${metal('d'+id,c)}<radialGradient id="e${id}" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="${c.enamel}"/><stop offset=".85" stop-color="${c.enamel}"/><stop offset="1" stop-color="${c.g1}"/></radialGradient></defs>
   <circle cx="100" cy="100" r="100" fill="url(#md${id})"/>${knurl(95.5,99.6,160,c.g3,.6)}<circle cx="100" cy="100" r="94" fill="none" stroke="${c.g3}" stroke-width=".8"/>
   <circle cx="100" cy="100" r="91" fill="url(#e${id})" stroke="${c.g3}" stroke-width=".6"/>
   <circle cx="100" cy="100" r="87.5" fill="none" stroke="${c.dink}" stroke-width=".5"/><circle cx="100" cy="100" r="84" fill="none" stroke="${c.dink}" stroke-width=".35"/><path d="${tr}" stroke="${c.dink}" stroke-width=".55"/>
   <g font-family="Cinzel, serif" font-size="12.5" fill="${c.dink}">${nums}</g>
   ${mid}
   ${hands?`<circle cx="100" cy="138" r="15.5" fill="none" stroke="${c.dink}" stroke-width=".45"/><path d="${ss}" stroke="${c.dink}" stroke-width=".45"/><path d="M100 138L100 125" stroke="${c.hand}" stroke-width=".8"/>
   <text x="100" y="66" text-anchor="middle" font-family="Cinzel, serif" font-size="5.2" letter-spacing="1.6" fill="${c.dink}">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</text>
   ${hand(48,2.6,ha,true)}${hand(70,2,ma,true)}<circle cx="100" cy="100" r="3.6" fill="${c.hand}"/><circle cx="100" cy="100" r="1.4" fill="url(#rd${id})"/>`:''}
   <circle cx="100" cy="100" r="91" fill="url(#sd${id})" opacity=".4"/></svg>`}
// crown, pendant and bow
const bow=(c,id)=>`<svg viewBox="0 0 60 70"><defs>${metal('w'+id,c)}</defs><path d="M30 6C12 6 6 22 10 36" fill="none" stroke="url(#mw${id})" stroke-width="5" stroke-linecap="round"/><path d="M30 6C48 6 54 22 50 36" fill="none" stroke="url(#mw${id})" stroke-width="5" stroke-linecap="round"/>
  <path d="M30 6C12 6 6 22 10 36M30 6C48 6 54 22 50 36" fill="none" stroke="${c.g3}" stroke-width=".5"/>
  <rect x="19" y="28" width="22" height="16" rx="3" fill="url(#mw${id})" stroke="${c.g3}" stroke-width=".6"/>${Array.from({length:10},(_,i)=>`<path d="M${21+i*2} 29V43" stroke="${c.g3}" stroke-width=".5"/>`).join('')}
  <path d="M24 44H36L35 56H25Z" fill="url(#rw${id})" stroke="${c.g3}" stroke-width=".6"/><rect x="22" y="55" width="16" height="6" rx="1.5" fill="url(#mw${id})" stroke="${c.g3}" stroke-width=".5"/></svg>`;
// a curb chain along a cubic curve: alternate flat and edge-on links, ending in a T-bar
function chain(c,id,P,tbar=true){const B=(t,i)=>{const u=1-t;return u*u*u*P[0][i]+3*u*u*t*P[1][i]+3*u*t*t*P[2][i]+t*t*t*P[3][i]};
  let pts=[],L=0,prev=[B(0,0),B(0,1)];const N=400;const cum=[0];for(let k=1;k<=N;k++){const p=[B(k/N,0),B(k/N,1)];L+=Math.hypot(p[0]-prev[0],p[1]-prev[1]);cum.push(L);prev=p}
  const step=6.2,n=Math.floor(L/step);let s='',j=0;
  for(let i=0;i<=n;i++){const d=i*step;while(j<N&&cum[j+1]<d)j++;const t=j/N,x=B(t,0),y=B(t,1),x2=B(Math.min(1,t+.01),0),y2=B(Math.min(1,t+.01),1),a=Math.atan2(y2-y,x2-x)*180/Math.PI;
    s+=i%2?`<ellipse cx="${f(x)}" cy="${f(y)}" rx="4.3" ry="1.3" transform="rotate(${f(a)} ${f(x)} ${f(y)})" fill="url(#mc${id})" stroke="${c.g3}" stroke-width=".35"/>`
           :`<ellipse cx="${f(x)}" cy="${f(y)}" rx="4.4" ry="2.9" transform="rotate(${f(a)} ${f(x)} ${f(y)})" fill="none" stroke="url(#mc${id})" stroke-width="1.5"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="4.4" ry="2.9" transform="rotate(${f(a)} ${f(x)} ${f(y)})" fill="none" stroke="${c.g3}" stroke-width=".3"/>`}
  const e=P[3];return `<defs>${metal('c'+id,c)}</defs><g filter="url(#ch${id})">${s}${tbar?`<g transform="translate(${e[0]} ${e[1]}) rotate(-20)"><rect x="-16" y="-2" width="32" height="4" rx="2" fill="url(#mc${id})" stroke="${c.g3}" stroke-width=".4"/><circle cx="-16" cy="0" r="3" fill="url(#mc${id})" stroke="${c.g3}" stroke-width=".4"/><circle cx="16" cy="0" r="3" fill="url(#mc${id})" stroke="${c.g3}" stroke-width=".4"/></g>`:''}</g>
   <filter id="ch${id}" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="1" dy="2.4" stdDeviation="1.4" flood-opacity=".35"/></filter>`}
const LINKS=c=>K.uri(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.g1}"/><stop offset=".5" stop-color="${c.g2}"/><stop offset="1" stop-color="${c.g3}"/></linearGradient></defs><ellipse cx="5" cy="5" rx="5.6" ry="3.4" fill="none" stroke="url(#g)" stroke-width="1.6"/><ellipse cx="15" cy="5" rx="5.2" ry="1.4" fill="url(#g)" stroke="${c.g3}" stroke-width=".4"/></svg>`);
FAMILY({key:'jam',name:'Jam Saku',meaning:'Pocket watch',
  blurb:'An engraved gold hunter-case pocket watch on its chain; touch it and the lid springs open on the hour.',
  fonts:{d:"'Cinzel', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1600,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid;
    return `<section class="page pg-jam" style="${gv(c)}"><div class="jam-bg"></div>
     <p class="jam-k reveal">${ev(o,L)}</p>
     <div class="jam-pd reveal"><svg class="jam-pchain" viewBox="0 0 300 300">${chain(c,'p'+id,[[150,-82],[80,-110],[0,-70],[-40,10]],false)}${chain(c,'q'+id,[[150,-82],[220,-110],[300,-70],[340,10]],false)}</svg>
      <span class="jam-bow">${bow(c,'p'+id)}</span>${dial(c,'p'+id,o,false)}
      <div class="jam-pin"><h1 class="names">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1><p class="jam-at">${en?'From':'Mulai'} ${esc(fmtTime(o.start,o.lang))}</p></div></div>
     <div class="jam-meta reveal d2"><div class="jam-rule"><i></i><b>${(()=>{const d=new Date((o.date||'')+'T00:00:00');return isNaN(d)?'':ROMN(d.getDate())})()}</b><i></i></div>
      <p class="jam-date">${esc(fmtDate(o.date,o.lang))}</p>${o.hijri?`<p class="jam-hj">${esc(o.hijri)}</p>`:''}<p class="jam-ven">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',id=++uid,mono=esc(K.initials(o).join(''));
    return `<div class="cover cv-jam" style="${gv(c)}"><div class="jam-bg"></div>
     <div class="jam-head jam-fade"><p class="jam-k">${ev(o,L)}</p><p class="jam-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div>
     <${tag} class="jam-w" ${attr} aria-label="${L.open}">
      <svg class="jam-chain" viewBox="0 0 200 200">${chain(c,id,[[100,-52],[196,-70],[250,70],[168,236]])}</svg>
      <span class="jam-bow">${bow(c,id)}</span><span class="jam-case"></span>
      <span class="jam-dial">${dial(c,id,o)}</span>
      <span class="jam-lid"><span class="jam-lf">${lidFront(c,id,mono)}</span><span class="jam-lb">${lidBack(c,id,o)}</span></span>
      <span class="jam-hinge"></span></${tag}>
     <div class="jam-foot jam-fade"><p class="jam-date">${esc(fmtDate(o.date,o.lang))} <i>·</i> ${esc(fmtTime(o.start,o.lang))}</p>
      ${guest?`<p class="jam-to"><span>${L.dear}</span><b>${esc(guest)}</b></p>`:''}<p class="jam-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--jam-links',LINKS(th.c));
    $$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(h&&!$('.jam-h',h))h.insertAdjacentHTML('afterbegin',`<i class="jam-h">${ROMN(i+1)}</i>`);
      if(i)s.insertAdjacentHTML('beforebegin','<div class="jam-div" aria-hidden="true"><i></i></div>')})},
  themes:[
    {k:'emas',n:'Emas',desc:'Yellow gold on bottle green',c:{ground:'#17322a',sheet:'#fbf7ec',ink:'#1f2620',accent:'#1d4a3c',gold:'#c9a24e',pagefg:'#f1ead6',g1:'#fbe7a6',g2:'#d0a24a',g3:'#7c5719',enamel:'#fbf8ef',dink:'#1f1d1a',hand:'#1f3d78'}},
    {k:'hitam',n:'Hitam',desc:'Gold watch on black linen',c:{ground:'#141416',sheet:'#f5f1e8',ink:'#1a1a1c',accent:'#3b3226',gold:'#d2ab5a',pagefg:'#efe7d5',g1:'#fde9ad',g2:'#d4a64f',g3:'#7d561a',enamel:'#fbf8f0',dink:'#1c1b18',hand:'#203c74',line:'rgba(59,50,38,.22)'}},
    {k:'marun',n:'Marun',desc:'Rose gold on oxblood',c:{ground:'#3e1520',sheet:'#fcf4ee',ink:'#2d1a1d',accent:'#7a2236',gold:'#d8a283',pagefg:'#f7e6dd',g1:'#fbe0cf',g2:'#d49c80',g3:'#87513b',enamel:'#fdf8f3',dink:'#2b1b18',hand:'#2b3a6e',line:'rgba(122,34,54,.2)'}},
    {k:'nila',n:'Nila',desc:'Silver watch on midnight blue',c:{ground:'#18213f',sheet:'#f4f5f8',ink:'#1b2036',accent:'#2b3c78',gold:'#b9bfcc',pagefg:'#e9ecf5',g1:'#ffffff',g2:'#bfc4cf',g3:'#5f6573',enamel:'#fbfbf9',dink:'#1b1e28',hand:'#1f3f8c',line:'rgba(43,60,120,.2)'}},
    {k:'gading',n:'Gading',desc:'Gold on ivory linen',c:{ground:'#ece3d1',sheet:'#fffaf1',ink:'#2a241c',accent:'#6b4a1e',gold:'#a8823c',pagefg:'#2a241c',g1:'#fbe6a4',g2:'#cd9f48',g3:'#7a5419',enamel:'#fffdf8',dink:'#24201a',hand:'#213e7a'}},
    {k:'jambu',n:'Jambu',desc:'Rose gold on blush',c:{ground:'#efd8d2',sheet:'#fffaf7',ink:'#3a2427',accent:'#8a3b4c',gold:'#b07a5e',pagefg:'#3a2427',g1:'#fde3d3',g2:'#d39c80',g3:'#83503a',enamel:'#fffcf9',dink:'#2e1d1d',hand:'#2a3a70',line:'rgba(138,59,76,.2)'}},
    {k:'sage',n:'Sage',desc:'Brass on soft sage',c:{ground:'#cfd8c6',sheet:'#fbfaf3',ink:'#25302a',accent:'#3e5a46',gold:'#94783c',pagefg:'#25302a',g1:'#f4e2a6',g2:'#c69c4e',g3:'#755620',enamel:'#fdfcf6',dink:'#1f2620',hand:'#243f74',line:'rgba(62,90,70,.22)'}},
    {k:'kelabu',n:'Kelabu',desc:'Silver on dove grey',c:{ground:'#d9dadd',sheet:'#fbfbfa',ink:'#23262c',accent:'#3a4458',gold:'#7d828d',pagefg:'#23262c',g1:'#ffffff',g2:'#c3c7cf',g3:'#5d626d',enamel:'#fcfcfa',dink:'#1d2026',hand:'#1f3f8c',line:'rgba(58,68,88,.2)'}},
  ]});
