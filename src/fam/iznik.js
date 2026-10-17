/* iznik: a large Ottoman tile panel in underglaze cobalt, turquoise, emerald and raised tomato red on white fritware.
   A cobalt inscription band carries the names in white; below, a cypress entwined with flowering prunus stands between
   sweeping saz leaves, tulips, carnations and hyacinths, all inside a palmette border. The panel rests on a marble sill.
   Cover: tap the panel and it slides down behind the sill. Page: a tulip spray framing the names. Skin: tulip-headed tiles. */
const hx=h=>{h=h.replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const f1=v=>+v.toFixed(1);
let uid=0;
const svg=(w,h,body)=>`<svg ${NS} width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

/* ---- motifs (base at 0,0, growing upward) ---- */
const tulip=(c,s=1,a=0,x=0,y=0)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)}) scale(${s})"><path d="M0 0C-6-1-8.4-8-7.2-15.6C-5.4-12.4-3.2-11.4-2-13.4C-2.2-17.4-1-20 0-23C1-20 2.2-17.4 2-13.4C3.2-11.4 5.4-12.4 7.2-15.6C8.4-8 6-1 0 0Z" fill="${c.red}" stroke="${c.ink}" stroke-width=".55"/>
  <path d="M-3.4-2.6C-4.6-6.6-4.6-10-4.2-12.6M3.4-2.6C4.6-6.6 4.6-10 4.2-12.6M0-2V-18" fill="none" stroke="${c.sheet}" stroke-width=".55" opacity=".85"/><path d="M-2.4 0.6H2.4L1.6 2.6H-1.6Z" fill="${c.green}" stroke="${c.ink}" stroke-width=".4"/></g>`;
const carnation=(c,s=1,a=0,x=0,y=0)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)}) scale(${s})"><path d="M-3 0C-4-3-4-6-3-8.4H3C4-6 4-3 3 0Z" fill="${c.cobalt}" stroke="${c.ink}" stroke-width=".45"/>
  <path d="M-3.2-8.4C-10-10-13.2-16-11.4-22L-8.6-19.2-6.6-24.4-3.4-20.2 0-26.4 3.4-20.2 6.6-24.4 8.6-19.2 11.4-22C13.2-16 10-10 3.2-8.4Z" fill="${c.red}" stroke="${c.ink}" stroke-width=".55"/>
  <path d="M0-9.4V-22M-2-9.6L-6-20M2-9.6L6-20M-3.4-9.8L-9-17M3.4-9.8L9-17" stroke="${c.sheet}" stroke-width=".45" opacity=".85"/><path d="M-9-14C-4-12 4-12 9-14" fill="none" stroke="${c.cobalt}" stroke-width=".6"/></g>`;
const hyacinth=(c,s=1,a=0,x=0,y=0)=>{let b='';for(let i=0;i<8;i++){const yy=-6-i*3.6,side=i%2?1:-1;b+=`<path d="M0 ${f1(yy)}C${side*2} ${f1(yy-.6)} ${side*4.6} ${f1(yy+.6)} ${side*5} ${f1(yy+2.6)}C${side*3.4} ${f1(yy+3.4)} ${side*1.4} ${f1(yy+2)} 0 ${f1(yy+.4)}Z" fill="${c.cobalt}" stroke="${c.ink}" stroke-width=".35"/>`}
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)}) scale(${s})"><path d="M0 0V-36" stroke="${c.green}" stroke-width="1"/>${b}<circle cy="-36.5" r="1.6" fill="${c.cobalt}" stroke="${c.ink}" stroke-width=".35"/></g>`};
const blossom=(c,s=1,x=0,y=0)=>`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${[0,72,144,216,288].map(a=>`<path d="M0 0C-2.4-1.6-2.8-4.6 0-6.4C2.8-4.6 2.4-1.6 0 0Z" transform="rotate(${a})" fill="${c.sheet}" stroke="${c.cobalt}" stroke-width=".6"/>`).join('')}<circle r="1.5" fill="${c.red}" stroke="${c.ink}" stroke-width=".3"/></g>`;
const rosetteR=(c,s=1,x=0,y=0)=>`<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${Array.from({length:8},(_,i)=>`<path d="M0-3C-2.4-4-3-7.4 0-9.6C3-7.4 2.4-4 0-3Z" transform="rotate(${i*45})" fill="${i%2?c.tq:c.cobalt}" stroke="${c.ink}" stroke-width=".4"/>`).join('')}<circle r="3.4" fill="${c.red}" stroke="${c.ink}" stroke-width=".45"/><circle r="1.2" fill="${c.sheet}"/></g>`;
/* a serrated saz leaf grown along a cubic centreline */
function saz(c,P,W,fill,serr=1){const pts=[];for(let i=0;i<=40;i++){const t=i/40,u=1-t;const x=u*u*u*P[0]+3*u*u*t*P[2]+3*u*t*t*P[4]+t*t*t*P[6],y=u*u*u*P[1]+3*u*u*t*P[3]+3*u*t*t*P[5]+t*t*t*P[7];
    const dx=-3*u*u*P[0]+3*(u*u-2*u*t)*P[2]+3*(2*u*t-t*t)*P[4]+3*t*t*P[6],dy=-3*u*u*P[1]+3*(u*u-2*u*t)*P[3]+3*(2*u*t-t*t)*P[5]+3*t*t*P[7],l=Math.hypot(dx,dy)||1;pts.push([x,y,-dy/l,dx/l,t])}
  const w=t=>W*Math.pow(Math.sin(Math.PI*Math.min(1,t*1.05)),.75)*(1-.25*t);
  const L=pts.map(([x,y,nx,ny,t],i)=>{const ww=w(t)*(serr&&i%2&&i>2&&i<38?1.18:1);return [x+nx*ww,y+ny*ww]}),R=pts.map(([x,y,nx,ny,t])=>[x-nx*w(t),y-ny*w(t)]);
  const d='M'+L.map(p=>f1(p[0])+' '+f1(p[1])).join('L')+'L'+R.reverse().map(p=>f1(p[0])+' '+f1(p[1])).join('L')+'Z';
  const mid='M'+pts.map(p=>f1(p[0])+' '+f1(p[1])).join('L');
  const inner='M'+pts.slice(4,34).map(([x,y,nx,ny,t])=>f1(x+nx*w(t)*.45)+' '+f1(y+ny*w(t)*.45)).join('L');
  const veins=pts.filter((p,i)=>i>3&&i<37&&i%3===0).map(([x,y,nx,ny,t])=>{const ww=w(t),tx=ny,ty=-nx;return `M${f1(x)} ${f1(y)}L${f1(x+nx*ww*.8+tx*ww*.5)} ${f1(y+ny*ww*.8+ty*ww*.5)}M${f1(x)} ${f1(y)}L${f1(x-nx*ww*.8+tx*ww*.5)} ${f1(y-ny*ww*.8+ty*ww*.5)}`}).join('');
  return `<path d="${d}" fill="${fill}" stroke="${c.ink}" stroke-width=".6" stroke-linejoin="round"/><path d="${veins}" fill="none" stroke="${c.sheet}" stroke-width=".4" opacity=".55"/><path d="${mid}" fill="none" stroke="${c.tq}" stroke-width="1"/><path d="${inner}" fill="none" stroke="${c.sheet}" stroke-width=".45" opacity=".7"/>`}
function cypress(c,x,y,h){const w=h*.13,sh=(k,dy=0)=>`M0 ${f1(-h*.02*k+dy)}C${f1(w*.75*k)} ${f1(-h*.28)} ${f1(w*.55*k)} ${f1(-h*.78)} 0 ${f1(-h+h*.08*(1-k))}C${f1(-w*.55*k)} ${f1(-h*.78)} ${f1(-w*.75*k)} ${f1(-h*.28)} 0 ${f1(-h*.02*k+dy)}Z`;
  let sc='';for(let i=0;i<22;i++){const yy=-h*(.08+i*.039),ww=w*.5*Math.sin(Math.PI*(.06+i*.042))*.95;for(let j=-2;j<=2;j++){const xx=j*ww*.42;if(Math.abs(xx)>ww*.9)continue;sc+=`M${f1(xx-2.2)} ${f1(yy)}q2.2 -2.6 4.4 0`}}
  return `<g transform="translate(${x} ${y})"><path d="${sh(1)}" fill="${c.cobalt}" stroke="${c.ink}" stroke-width=".7"/><path d="${sh(.8)}" fill="${c.cyp}"/><path d="${sh(.55)}" fill="${c.cypIn}"/>
  <path d="${sc}" fill="none" stroke="${c.sheet}" stroke-width=".45" opacity=".75"/><path d="M0 ${f1(-h*.04)}V${f1(-h*.94)}" stroke="${c.ink}" stroke-width=".4" opacity=".4"/></g>`}
function vine(c,x,y,h){const w=h*.12;let d=`M${x} ${y}`;const bl=[];for(let i=1;i<=40;i++){const t=i/40,yy=y-h*t*.86,xx=x+Math.sin(t*Math.PI*3.2)*w*.75*(1-t*.55);d+=`L${f1(xx)} ${f1(yy)}`;if(i%5===0)bl.push([xx,yy])}
  return `<path d="${d}" fill="none" stroke="${c.ink}" stroke-width=".7"/>${bl.map(([a,b],i)=>`<path d="M${f1(a)} ${f1(b)}l${i%2?6:-6} -3" stroke="${c.ink}" stroke-width=".5"/>`+blossom(c,.78,a+(i%2?7:-7),b-3.5)).join('')}`}

/* the floral field, 264 x 354, origin at its top-left */
const hatayi=(c,s,x,y,a=0)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${a}) scale(${s})">${Array.from({length:10},(_,i)=>`<path d="M0-7C-3.4-8-4.6-12.4-2-15.4C-1-13.6 1-13.6 2-15.4C4.6-12.4 3.4-8 0-7Z" transform="rotate(${i*36})" fill="${c.red}" stroke="${c.ink}" stroke-width=".45"/>`).join('')}
  <circle r="8" fill="${c.sheet}" stroke="${c.ink}" stroke-width=".5"/>${Array.from({length:8},(_,i)=>`<path d="M0-2C-2-3-2.4-5.6 0-7.2C2.4-5.6 2-3 0-2Z" transform="rotate(${i*45+22.5})" fill="${c.cobalt}" stroke="${c.ink}" stroke-width=".3"/>`).join('')}<circle r="2.2" fill="${c.tq}" stroke="${c.ink}" stroke-width=".35"/></g>`;
const stem=(c,d,w=.9)=>`<path d="${d}" fill="none" stroke="${c.green}" stroke-width="${w}" stroke-linecap="round"/>`;
const leafl=(c,x,y,a,s=1)=>`<path d="M0 0C3-2.6 8-2.6 11 0C8 2.6 3 2.6 0 0Z" transform="translate(${x} ${y}) rotate(${a}) scale(${s})" fill="${c.green}" stroke="${c.ink}" stroke-width=".4"/>`;
function field(c){const half=`
   ${saz(c,[6,354,0,300,30,262,92,290],10,c.green)}
   ${stem(c,'M40 354C40 320 30 280 24 254')}${stem(c,'M56 354C60 300 76 250 70 196')}${stem(c,'M66 246C56 224 44 196 40 166')}${stem(c,'M70 230C84 200 96 170 98 136')}
   ${stem(c,'M24 354C20 336 16 320 12 304')}${stem(c,'M92 354C96 320 100 290 104 262')}${stem(c,'M40 166C30 140 24 120 24 100')}${stem(c,'M40 166C52 130 60 100 60 76')}
   ${stem(c,'M24 100C24 80 28 64 32 50')}${stem(c,'M60 76C74 60 90 50 100 46')}
   ${saz(c,[8,226,10,150,40,104,104,96],8.5,c.cobalt)}
   ${leafl(c,56,300,-110,1)}${leafl(c,66,272,-60,.9)}${leafl(c,34,300,-120,.9)}${leafl(c,44,190,-70,.8)}${leafl(c,86,190,-50,.8)}${leafl(c,30,130,-110,.8)}${leafl(c,58,108,-60,.7)}
   ${carnation(c,1.1,-12,24,254)}${tulip(c,1.35,4,70,196)}${tulip(c,.95,-28,12,304)}${hyacinth(c,1,6,104,262)}
   ${carnation(c,.95,-8,40,166)}${tulip(c,1.05,18,98,136)}${hatayi(c,1.15,24,92)}${tulip(c,.95,-10,60,76)}${tulip(c,.8,-24,32,50)}${carnation(c,.8,40,100,46)}
   ${hyacinth(c,.75,-14,12,226)}${blossom(c,.75,86,316)}${blossom(c,.7,10,176)}${blossom(c,.65,78,96)}${blossom(c,.6,46,24)}${blossom(c,.6,112,182)}${blossom(c,.55,8,30)}`;
  return `${half}<g transform="translate(264 0) scale(-1 1)">${half}</g>
   ${cypress(c,132,352,292)}${vine(c,132,350,280)}
   <path d="M0 354C30 344 60 348 90 342S150 336 174 342 236 346 264 354Z" fill="${c.green}" stroke="${c.ink}" stroke-width=".5" opacity=".9"/>
   ${tulip(c,1.05,0,132,46)}${blossom(c,.6,120,40)}${blossom(c,.6,144,40)}`}

/* border tile: cobalt ground, white five-petal rosettes alternating with red palmettes, turquoise leaves */
function borderTile(c,vert){const t=`<rect width="28" height="18" fill="${c.bd}"/><path d="M0 1.2H28M0 16.8H28" stroke="${c.sheet}" stroke-width=".9"/>
  <path d="M0 9C5 4 9 4 14 9S23 14 28 9" fill="none" stroke="${c.tq}" stroke-width=".8"/>${blossom({...c,cobalt:c.ink},.9,7,9)}
  <g transform="translate(21 9) rotate(90)"><path d="M0 4C-4 3-6-1-4-5C-3-3-2-2-1.4-2.6C-2-5-1-7 0-8.6C1-7 2-5 1.4-2.6C2-2 3-3 4-5C6-1 4 3 0 4Z" fill="${c.red}" stroke="${c.sheet}" stroke-width=".5"/></g>
  <path d="M12 6C13 4.6 14.6 4.2 16 4.6C15 6 13.6 6.4 12 6Z" fill="${c.tq}"/><path d="M26 12C27 10.6 28.6 10.2 30 10.6" fill="none"/>`;
  return vert?svg(18,28,`<g transform="translate(18 0) rotate(90)">${t}</g>`):svg(28,18,t)}

function cols(th){const c={...th.c};c.cobalt=c.cobalt||c.accent;c.cyp=c.cyp||mix(c.green,'#0a2a1c',.35);c.cypIn=mix(c.tq,c.green,.35);c.bd=c.bd||c.cobalt;return c}
function panel(c,id,n1,n2,ev,dt){const Ln=n1.length+n2.length+3,fs=Math.min(30,206/(Ln*.42));
  let joints='';for(let x=18+66;x<282;x+=66)joints+=`M${x} 18V482`;for(let y=482-66;y>18;y-=66)joints+=`M18 ${y}H282`;
  let cloud='';[-1,1].forEach(s=>{cloud+=`<path d="M${150+s*118} 69C${150+s*108} 56 ${150+s*96} 60 ${150+s*98} 70S${150+s*114} 82 ${150+s*104} 86" transform="" fill="none" stroke="${c.tq}" stroke-width="1.1"/>`+blossom(c,.9,150+s*108,46)+blossom(c,.9,150+s*108,96)});
  return `<defs><pattern id="bh${id}" width="28" height="18" patternUnits="userSpaceOnUse">${borderTile(c).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</pattern>
    <pattern id="bv${id}" width="18" height="28" patternUnits="userSpaceOnUse">${borderTile(c,1).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</pattern>
    <linearGradient id="gl${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient></defs>
   <rect width="300" height="500" fill="${c.sheet}"/>
   <rect x="0" y="0" width="300" height="18" fill="url(#bh${id})"/><rect x="0" y="482" width="300" height="18" fill="url(#bh${id})"/><rect x="0" y="0" width="18" height="500" fill="url(#bv${id})"/><rect x="282" y="0" width="18" height="500" fill="url(#bv${id})"/>
   ${[[0,0],[282,0],[0,482],[282,482]].map(([x,y])=>`<rect x="${x}" y="${y}" width="18" height="18" fill="${c.bd}"/>${rosetteR(c,.85,x+9,y+9)}`).join('')}
   <rect x="18" y="18" width="264" height="104" fill="${c.band||c.cobalt}"/><rect x="23" y="23" width="254" height="94" fill="none" stroke="${c.tq}" stroke-width="1"/><rect x="26" y="26" width="248" height="88" fill="none" stroke="${c.sheet}" stroke-width=".5" opacity=".7"/>
   ${cloud}
   <text x="150" y="42" text-anchor="middle" font-family="Marcellus,serif" font-size="6.6" letter-spacing="2.6" fill="${c.tq2}">${ev}</text>
   <g text-anchor="middle" font-family="${c.sf}" fill="${c.sheet}"><text x="150" y="${f1(66+fs*.22)}" font-size="${f1(fs)}">${esc(n1)} <tspan font-family="'Cormorant Garamond',serif" font-style="italic" font-size="${f1(fs*.55)}" fill="${c.tq2}">&amp;</tspan> ${esc(n2)}</text></g>
   <text x="150" y="${f1(98+fs*.1)}" text-anchor="middle" font-family="Marcellus,serif" font-size="7" letter-spacing="2.4" fill="${c.sheet}" opacity=".85">${dt}</text>
   <rect x="18" y="122" width="264" height="8" fill="${c.sheet}"/><path d="M18 126H282" stroke="${c.red}" stroke-width="3" stroke-dasharray="4 3"/><path d="M18 122.4H282M18 129.6H282" stroke="${c.ink}" stroke-width=".5"/>
   <g transform="translate(18 130) scale(1 ${f1(352/354*1000)/1000})">${field(c)}</g>
   <path d="${joints}" stroke="${c.joint}" stroke-width=".7" opacity=".55"/>
   <rect width="300" height="500" fill="url(#gl${id})"/>
   <rect x=".5" y=".5" width="299" height="499" fill="none" stroke="${c.ink}" stroke-width="1"/><path d="M18 18H282V482H18Z" fill="none" stroke="${c.ink}" stroke-width=".6"/>`}
/* page: a tulip spray arching around the names */
function spray(c){const side=`<path d="M150 470C110 466 70 440 52 390C36 344 40 280 50 230C58 190 80 150 112 120" fill="none" stroke="${c.green}" stroke-width="1.3"/>
   ${saz(c,[150,474,96,474,60,430,46,380],9,c.green)}${saz(c,[52,300,26,270,30,232,58,212],7,c.cobalt)}${saz(c,[112,122,92,120,74,128,62,140],4.5,c.tq,0)}
   ${[[46,402,-160],[42,350,-200],[44,234,-140],[60,196,-120],[90,142,-70],[78,160,-150],[40,300,-30]].map(([x,y,a])=>leafl(c,x,y,a,.9)).join('')}
   ${tulip(c,1.25,-72,40,330)}${carnation(c,1.1,-52,46,262)}${tulip(c,1.05,-32,62,192)}${hyacinth(c,.95,-62,54,424)}${hatayi(c,.85,40,372)}
   ${blossom(c,.8,72,456)}${blossom(c,.7,30,288)}${blossom(c,.7,80,164)}${blossom(c,.6,58,236)}${tulip(c,.95,-12,112,122)}${rosetteR(c,.85,90,142)}
   ${stem(c,'M48 250C34 246 24 240 16 232',.8)}${tulip(c,.8,-60,16,232)}${stem(c,'M46 410C34 420 26 432 22 446',.8)}${carnation(c,.8,-120,22,446)}`;
  return `${side}<g transform="translate(300 0) scale(-1 1)">${side}</g>${tulip(c,1.35,0,150,86)}${carnation(c,.85,-34,136,98)}${carnation(c,.85,34,164,98)}${hatayi(c,1.05,150,474)}`}

FAMILY({key:'iznik',name:'Iznik',meaning:'Ottoman tile panel',
  blurb:'A great Iznik tile panel of cypress, saz leaves, tulips and carnations in cobalt, turquoise and raised red; it slides down behind its marble sill.',
  fonts:{d:"'Marcellus', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),c=cols(th);
    return `<section class="page pg-iznik" style="--iz-bh:${K.uri(borderTile(c))};--iz-bv:${K.uri(borderTile(c,1))};--iz-bd:${c.bd};--iz-tq:${c.tq};--iz-joint:${c.joint}">
     <div class="iz-tiles"></div><svg class="iz-spray" viewBox="0 0 300 500" preserveAspectRatio="xMidYMid meet">${spray(c)}</svg>
     <div class="iz-ptxt"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
      <div class="iz-rule reveal d2"><i></i><svg viewBox="-8 -8 16 16">${rosetteR(c,.8)}</svg><i></i></div>
      <p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=cols(th),id='c'+(++uid);c.sf="'Pinyon Script',cursive";
    return `<div class="cover cv-iznik"><div class="iz-wall"></div>
     <div class="iz-top"><p class="iz-k">${en?'Kindly join us':'Dengan penuh kesyukuran'}</p></div>
     <div class="iz-win"><${tag} class="iz-panel" ${attr} aria-label="${L.open}"><svg viewBox="0 0 300 500" preserveAspectRatio="xMidYMax meet">${panel(c,id,n1||'',n2||'',ev(o,L),esc(fmtDate(o.date,o.lang)))}</svg></${tag}></div>
     <div class="iz-sill"><i class="top"></i><i class="front"></i></div>
     <div class="iz-foot">${guest?`<p class="iz-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="iz-hint">${en?'Touch the tiles to open':'Sentuh jubin untuk membuka'}</p></div></div>`},
  skin(el,o,th){K.cards(el);const c=cols(th);
    el.style.setProperty('--iz-bh',K.uri(borderTile(c)));el.style.setProperty('--iz-bv',K.uri(borderTile(c,1)));el.style.setProperty('--iz-bd',c.bd);el.style.setProperty('--iz-tq',c.tq);el.style.setProperty('--iz-joint',c.joint);
    el.style.setProperty('--iz-tulip',K.uri(`<svg ${NS} viewBox="-22 -30 44 34"><path d="M0 2C-8-2-14-4-20-2C-14-8-6-8 0 2Z" fill="${c.green}" stroke="${c.ink}" stroke-width=".5"/><path d="M0 2C8-2 14-4 20-2C14-8 6-8 0 2Z" fill="${c.green}" stroke="${c.ink}" stroke-width=".5"/>${tulip(c,1.1)}</svg>`));
    el.style.setProperty('--iz-ros',K.uri(`<svg ${NS} viewBox="-10 -10 20 20"><rect x="-10" y="-10" width="20" height="20" fill="${c.bd}"/>${rosetteR(c,.9)}</svg>`));
    $$('.sec h2',el).forEach(h=>{h.classList.add('iz-h2');h.insertAdjacentHTML('afterbegin','<i class="iz-ht"></i>')});
    $$('.sheet > .sec',el).forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="iz-cn tl"></i><i class="iz-cn tr"></i><i class="iz-cn bl"></i><i class="iz-cn br"></i>'))},
  themes:[
    {k:'klasik',n:'Klasik',desc:'Cobalt, turquoise and tomato red on white',c:{ground:'#e7dfd0',sheet:'#fbfaf5',ink:'#1d2a3a',accent:'#1f3f8f',gold:'#a89a80',tq:'#2a9ea2',tq2:'#8fd6d4',red:'#c4382c',green:'#2f8656',joint:'#9aa3a8',pagefg:'#2b2a2c'}},
    {k:'biru',n:'Biru Putih',desc:'Blue-and-white early Iznik',c:{ground:'#dfe3e6',sheet:'#fbfbf8',ink:'#16264a',accent:'#1d3a86',gold:'#9aa2ac',tq:'#4f86c6',tq2:'#b9d2f0',red:'#1d3a86',green:'#2b55a6',joint:'#a3aab4',pagefg:'#1d2433'}},
    {k:'firus',n:'Firus',desc:'Turquoise and sage, Damascus style',c:{ground:'#dfe7e2',sheet:'#fbfbf6',ink:'#1e3436',accent:'#1c7d84',gold:'#9aa79e',tq:'#36aab0',tq2:'#bfeaea',red:'#6d4a8a',green:'#6f9a63',cobalt:'#1e5f8a',band:'#1c7d84',bd:'#1c7d84',joint:'#9fb0ab',pagefg:'#22302f'}},
    {k:'merah',n:'Merah Bata',desc:'Raised red on a brick-red wall',c:{ground:'#5a2621',sheet:'#fbf8f1',ink:'#1f2430',accent:'#b8322a',gold:'#c9a678',tq:'#2a9ea2',tq2:'#9fdcda',red:'#c4382c',green:'#2f8656',cobalt:'#203f8a',band:'#9a2e26',joint:'#a2a6a8',pagefg:'#f6e9da',dark:1}},
    {k:'malam',n:'Malam',desc:'The panel on a midnight wall',c:{ground:'#141c2e',sheet:'#fbfaf5',ink:'#1b2638',accent:'#1f3f8f',gold:'#b9b2a4',tq:'#2a9ea2',tq2:'#8fd6d4',red:'#c4382c',green:'#2f8656',joint:'#9aa3a8',pagefg:'#eef0f2',dark:1}},
    {k:'zamrud',n:'Zamrud',desc:'Emerald border, cobalt flowers',c:{ground:'#20372d',sheet:'#fbfaf3',ink:'#1b2a26',accent:'#1f6b47',gold:'#bfae86',tq:'#2a9ea2',tq2:'#a8e0d6',red:'#c4382c',green:'#2f8656',cobalt:'#1f3f8f',bd:'#1f6b47',band:'#1f6b47',joint:'#9fa8a2',pagefg:'#eef0e8',dark:1}},
    {k:'ungu',n:'Ungu',desc:'Manganese purple and sage',c:{ground:'#e6e0e8',sheet:'#fcfbf8',ink:'#2a2236',accent:'#5e3f7e',gold:'#a49cae',tq:'#3a9a9a',tq2:'#d6c6ea',red:'#7a4790',green:'#6a9468',cobalt:'#3b3f86',bd:'#4a3a74',joint:'#aaa3b2',pagefg:'#2a2236'}},
    {k:'gading',n:'Gading',desc:'Ivory fritware, soft cobalt',c:{ground:'#ede4d2',sheet:'#fbf5e8',ink:'#2a2a34',accent:'#2c4c8c',gold:'#b09a72',tq:'#3fa3a0',tq2:'#bfe3df',red:'#c25a3a',green:'#4f8a5a',bd:'#2c4c8c',joint:'#b0a894',pagefg:'#2e2a26'}},
  ]});
