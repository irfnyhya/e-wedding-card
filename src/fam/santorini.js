/* santorini: a fine ink-line illustration of the Oia cliffside with loose watercolour washes, on deckled cotton paper
   inside a gold-foil hairline frame. Cubic houses with drawn edges and hatched shade sides, barrel-vaulted cave houses,
   stairs, arched doorways, louvred shutters, wrought-iron balcony rails, terracotta pots, two plain blue domes,
   bougainvillea drawn as clusters of tiny bracts, the caldera cliff and a sailboat on the Aegean.
   Cover: names in script in the sky above the domes; tap and the view pans slowly down the cliff to the sea, then fades.
   Page: an ink-line whitewashed arch window with a dome, framing the names over a watercolour view of the caldera.
   Skin: deckled whitewash cards with a painted blue trim, a gold hairline, an ink dome vignette on each heading. */
needFont('Italianno');
const hx=h=>{h=h.replace('#','');if(h.length===3)h=h.replace(/./g,'$&$&');return [0,2,4].map(i=>parseInt(h.substr(i,2),16))};
const mix=(a,b,t)=>{const A=hx(a),B=hx(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const f1=v=>+v.toFixed(1);
let uid=0;

function cols(th){const c={...th.c};c.paper=c.paper||c.sheet;c.line=c.line||c.ink;c.house=c.house||c.paper;c.hatch=c.hatch||c.line;
  c.dome=c.dome||'#2f5fa6';c.win=c.win||c.dome;c.pink=c.pink||'#c8327a';c.pinkD=mix(c.pink,'#3a0a20',.35);c.ochre=c.ochre||'#c98f52';c.rust=c.rust||'#a8543a';
  c.pot=c.pot||'#b8603a';c.leaf=c.leaf||'#5a7a3a';c.sea=c.sea||'#2e6aa8';c.sea2=c.sea2||mix(c.sea,'#0a1a3a',.35);c.sky1=c.sky1||'#a9cbe8';c.sky2=c.sky2||'#f3e6d0';
  c.wa=c.wa??.62;return c}

/* ---------- drawing kit (ink layer) ---------- */
const L=(c,d,w=.8,extra='')=>`<path d="${d}" fill="none" stroke="${c.line}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
function hatch(c,x0,x1,yTop,yBot,step=2.6){let d='';for(let x=x0+1.2;x<x1-.6;x+=step){const t=(x-x0)/(x1-x0);d+=`M${f1(x)} ${f1(yTop(t)+1)}V${f1(yBot-1)}`}return L(c,d,.4,'opacity=".7"')}
/* windows and doors also add their watercolour to the wash list W */
function windowShut(c,W,x,y,w,h,lit){W.push(`<rect x="${f1(x+.6)}" y="${f1(y+.6)}" width="${f1(w)}" height="${f1(h)}" fill="${lit?c.lit:c.win}" opacity="${lit?.95:.75}"/>`);
  let d=`M${f1(x)} ${f1(y)}h${f1(w)}v${f1(h)}h${f1(-w)}Z M${f1(x+w/2)} ${f1(y)}v${f1(h)}`;for(let yy=y+2;yy<y+h-1;yy+=1.9)d+=`M${f1(x+.8)} ${f1(yy)}h${f1(w/2-1.4)}M${f1(x+w/2+.6)} ${f1(yy)}h${f1(w/2-1.4)}`;
  return L(c,d,.45)+L(c,`M${f1(x-1.2)} ${f1(y+h+.8)}h${f1(w+2.4)}`,.7)}
function archDoor(c,W,x,y,w,h,col){const r=w/2;W.push(`<path d="M${f1(x)} ${f1(y+h)}V${f1(y+r)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(x+w)} ${f1(y+r)}V${f1(y+h)}Z" fill="${col||c.dome}" opacity=".7"/>`);
  let d=`M${f1(x)} ${f1(y+h)}V${f1(y+r)}A${f1(r)} ${f1(r)} 0 0 1 ${f1(x+w)} ${f1(y+r)}V${f1(y+h)}`;for(let xx=x+w/4;xx<x+w-.5;xx+=w/4)d+=`M${f1(xx)} ${f1(y+r*.3+Math.abs(xx-x-r)*.4)}V${f1(y+h)}`;
  return L(c,d,.5)+L(c,`M${f1(x-2)} ${f1(y+r)}A${f1(r+2)} ${f1(r+2)} 0 0 1 ${f1(x+w+2)} ${f1(y+r)}`,.45)}
function rail(c,x,y,w){let d=`M${f1(x)} ${f1(y)}h${f1(w)}M${f1(x)} ${f1(y+7)}h${f1(w)}`;for(let xx=x+1.5;xx<x+w;xx+=3)d+=`M${f1(xx)} ${f1(y)}v7`;
  for(let xx=x+6;xx<x+w-4;xx+=12)d+=`M${f1(xx)} ${f1(y+3.5)}c1.6-1.6 3.2 0 1.6 1.4`;return L(c,d,.4)}
function pot(c,W,x,y,s=1){W.push(`<path d="M${f1(x-3.4*s)} ${f1(y-6*s)}h${f1(6.8*s)}l${f1(-1*s)} ${f1(6*s)}h${f1(-4.8*s)}Z" fill="${c.pot}"/>`,`<circle cx="${f1(x)}" cy="${f1(y-9*s)}" r="${f1(4.4*s)}" fill="${c.leaf}" opacity=".7"/>`);
  return L(c,`M${f1(x-3.4*s)} ${f1(y-6*s)}h${f1(6.8*s)}l${f1(-1*s)} ${f1(6*s)}h${f1(-4.8*s)}Z M${f1(x-3.8*s)} ${f1(y-6*s)}h${f1(7.6*s)}`,.5)+
   L(c,`M${f1(x)} ${f1(y-6*s)}c-1-3-3-4-4-5M${f1(x)} ${f1(y-6*s)}c0-3 1-5 3-6M${f1(x)} ${f1(y-6*s)}c1-2 3-3 5-3M${f1(x-1)} ${f1(y-7*s)}c-2-1-3-3-3-5`,.4)}
function bougain(c,W,cx,cy,rx,ry,seed,hang=0){const R=rng(seed);W.push(`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx*.8)}" ry="${f1(ry*.75)}" fill="${c.pink}" opacity=".32"/>`);
  let o='',lv='';const n=Math.round(rx*ry*.8);for(let i=0;i<n;i++){const a=R()*Math.PI*2,d=Math.sqrt(R());let x=cx+Math.cos(a)*rx*d,y=cy+Math.sin(a)*ry*d;if(hang&&R()<.4){const k=R();y+=k*hang;x+=Math.sin(k*3+seed)*rx*.35}
    const s=.75+R()*.6,rot=R()*120;
    if(R()<.2){lv+=`M${f1(x)} ${f1(y)}c${f1(1.4*s)} ${f1(-1.2*s)} ${f1(3*s)} ${f1(-1*s)} ${f1(3.6*s)} ${f1(.2*s)}c${f1(-1.4*s)} ${f1(1*s)} ${f1(-2.8*s)} ${f1(.8*s)} ${f1(-3.6*s)} ${f1(-.2*s)}Z`;continue}
    o+=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><path d="M0 0C-1.2-.8-1.6-2.2-.6-3.2C.2-2.6.4-1.4 0 0C.6-1.2 1.8-1.8 3-1.4C2.6-.2 1.4.4 0 0C1.2.4 1.6 1.6 1 2.8C-.2 2.4-.6 1.2 0 0Z" fill="${R()<.5?c.pink:mix(c.pink,'#ffffff',.3)}" stroke="${c.pinkD}" stroke-width=".25"/></g>`}
  return `<path d="${lv}" fill="${c.leaf}" stroke="${mix(c.leaf,'#000000',.4)}" stroke-width=".2" opacity=".85"/>${o}`}
/* a cubic house: front face (drawn edges), hatched side, flat parapet or barrel vault */
function cube(c,W,R,o){const {x,y,w,h}=o,side=o.side||0,vault=o.vault;let s='';
  const front=vault?`M${x} ${y+h}V${y+w*.32}Q${x+w/2} ${f1(y-w*.08)} ${x+w} ${y+w*.32}V${y+h}Z`:`M${x} ${y+h}V${y+1.5}Q${x} ${y} ${x+1.5} ${y}H${x+w-1.5}Q${x+w} ${y} ${x+w} ${y+1.5}V${y+h}Z`;
  s+=`<path d="${front}" fill="${o.tint||c.house}"/>`;if(o.tint)W.push(`<path d="${front}" fill="${o.tint}" opacity=".5"/>`);
  if(side){const ty=t=>(vault?y+w*.32:y)+side*.5*t;s+=`<path d="M${x+w} ${vault?y+w*.32:y}L${x+w+side} ${f1((vault?y+w*.32:y)+side*.5)}V${y+h}H${x+w}Z" fill="${c.house}"/>`+hatch(c,x+w,x+w+side,ty,y+h)+L(c,`M${x+w} ${vault?y+w*.32:y}L${x+w+side} ${f1((vault?y+w*.32:y)+side*.5)}V${y+h}`,.6)}
  s+=L(c,front.replace(/Z$/,''),.75);
  if(!vault)s+=L(c,`M${x+1} ${y+2.6}H${x+w-1}`,.35,'opacity=".7"');else s+=L(c,`M${x+2} ${f1(y+w*.32+1.6)}Q${x+w/2} ${f1(y-w*.08+3)} ${x+w-2} ${f1(y+w*.32+1.6)}`,.35,'opacity=".7"');
  (o.win||[]).forEach(([fx,fy,ww,hh])=>{s+=windowShut(c,W,x+w*fx-ww/2,y+h*fy,ww,hh,o.lit&&R()<.8)});
  if(o.door){const [fx,dw,dh]=o.door;s+=archDoor(c,W,x+w*fx-dw/2,y+h-dh,dw,dh,R()<.5?c.dome:c.rust)}
  if(o.rail)s+=rail(c,x+2,y-7,w-4);
  (o.pots||[]).forEach(fx=>{s+=pot(c,W,x+w*fx,y,.8)});
  return s}
function dome(c,W,cx,by,r){const dh=r*.36;let s=`<path d="M${f1(cx-r-5)} ${f1(by+dh)}V${f1(by)}H${f1(cx+r+5)}V${f1(by+dh)}" fill="${c.house}"/>`+L(c,`M${f1(cx-r-5)} ${f1(by+dh)}V${f1(by)}H${f1(cx+r+5)}V${f1(by+dh)}M${f1(cx-r-6)} ${f1(by)}h${f1(2*r+12)}`,.7);
  {let sl='';for(let i=0;i<5;i++){const xx=cx-r*.7+i*r*.35,w=Math.max(2.4,r*.08),t=by+dh*.22,b=by+dh*.82;sl+=`M${f1(xx-w)} ${f1(b)}V${f1(t+w)}A${f1(w)} ${f1(w)} 0 0 1 ${f1(xx+w)} ${f1(t+w)}V${f1(b)}`;W.push(`<path d="M${f1(xx-w)} ${f1(b)}V${f1(t+w)}A${f1(w)} ${f1(w)} 0 0 1 ${f1(xx+w)} ${f1(t+w)}V${f1(b)}Z" fill="${c.win}" opacity=".6"/>`)}s+=L(c,sl,.45)}
  const d=`M${f1(cx-r)} ${f1(by)}A${f1(r)} ${f1(r*1.02)} 0 0 1 ${f1(cx+r)} ${f1(by)}Z`;s+=`<path d="${d}" fill="${c.house}"/>`;
  W.push(`<path d="M${f1(cx-r*.82)} ${f1(by-1)}A${f1(r*.95)} ${f1(r)} 0 0 1 ${f1(cx+r+1)} ${f1(by-1)}Z" fill="${c.dome}" opacity=".88"/>`,`<path d="M${f1(cx+r*.2)} ${f1(by-1)}A${f1(r*.7)} ${f1(r*.95)} 0 0 1 ${f1(cx+r)} ${f1(by-1)}Z" fill="${c.sea2}" opacity=".45"/>`);
  let rb='';for(let i=1;i<10;i++){const t=i/10,x=cx-r+2*r*t;rb+=`M${f1(x)} ${f1(by)}Q${f1(cx+(x-cx)*.62)} ${f1(by-r*.98)} ${f1(cx)} ${f1(by-r*1.02)}`}
  s+=L(c,d,.8)+L(c,rb,.35,'opacity=".75"')+L(c,`M${f1(cx-r*.9)} ${f1(by-r*.42)}Q${f1(cx)} ${f1(by-r*.5)} ${f1(cx+r*.9)} ${f1(by-r*.42)}`,.3,'opacity=".6"');
  s+=L(c,`M${f1(cx)} ${f1(by-r*1.02)}v-5`,.8)+`<circle cx="${f1(cx)}" cy="${f1(by-r*1.02-7)}" r="2.2" fill="${c.house}" stroke="${c.line}" stroke-width=".6"/>`;return s}
function stairs(c,x,y,n,dx,dy,dir=1){let d='',p=`M${f1(x)} ${f1(y)}`;for(let i=0;i<n;i++){p+=`h${f1(dx*dir)}v${f1(dy)}`}d+=p;
  let rl=`M${f1(x)} ${f1(y-9)}L${f1(x+n*dx*dir)} ${f1(y-9+n*dy)}`;return L(c,d,.55)+L(c,rl,.45)+L(c,Array.from({length:n},(_,i)=>`M${f1(x+i*dx*dir+dx*dir/2)} ${f1(y-9+(i+.5)*dy)}v${f1(9)}`).join(''),.3)}
function boat(c,W,x,y,s){W.push(`<path d="M${x} ${y}m-14 0h28l-4 4h-20Z" fill="${c.house}" opacity=".8"/>`,`<path d="M${x+2} ${y+6}c-30 2-60 4-90 3" stroke="${c.sky2}" stroke-width="2" fill="none" opacity=".5"/>`);
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-30L15-2Z M-1-27L-13-2H-1Z" fill="${c.house}"/>${L(c,'M-14 0h28l-4 4h-20Z M0 0V-31 M1-29L15-2H1Z M-1-27L-13-2H-1Z',.6)}${L(c,'M3-22l8 18M-2-20l-8 16',.3,'opacity=".6"')}</g>`}

/* ---------- the full scene, 390 x 1520 ---------- */
function scene(c,id,night){const W=[],B=[],R=rng(11);let ink='';
  const hor=318;
  // far caldera: horizon, Thirasia outline
  B.push(`<rect x="-20" y="-20" width="430" height="${hor+10}" fill="url(#sk${id})"/>`,`<rect x="-20" y="${hor}" width="430" height="140" fill="${c.sea}" opacity=".32"/>`,`<path d="M-10 ${hor}C40 ${hor-14} 90 ${hor-24} 140 ${hor-16}S220 ${hor-6} 260 ${hor-12}S340 ${hor-26} 400 ${hor-10}V${hor}Z" fill="${c.ochre}" opacity=".45"/>`);
  ink+=L(c,`M-10 ${hor}C40 ${hor-14} 90 ${hor-24} 140 ${hor-16}S220 ${hor-6} 260 ${hor-12}S340 ${hor-26} 400 ${hor-10}`,.55)+L(c,`M0 ${hor}H390`,.4);
  for(let i=0;i<12;i++){const y=hor+6+i*6;ink+=L(c,`M${f1(20+R()*300)} ${y}h${f1(10+R()*24)}`,.3,'opacity=".55"')}
  ink+=L(c,'M300 196q4-4 8 0q4-4 8 0M326 210q3-3 6 0q3-3 6 0M58 236q3-3 6 0q3-3 6 0',.55);
  [[70,262,70,10],[290,248,84,12],[190,282,60,8]].forEach(([x,y,w,h])=>{B.push(`<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="${c.cloud||'#ffffff'}" opacity=".7"/>`,`<ellipse cx="${x+w*.3}" cy="${y-h*.7}" rx="${w*.5}" ry="${h*.9}" fill="${c.cloud||'#ffffff'}" opacity=".6"/>`);ink+=L(c,`M${x-w*.8} ${y+h*.6}C${x-w*.5} ${y-h*.4} ${x-w*.1} ${y-h*.2} ${x+w*.05} ${y-h*.6}S${x+w*.6} ${y-h*1.6} ${x+w*.75} ${y-h*.3}`,.35,'opacity=".55"')});
  B.push(`<path d="M-10 ${hor+16}C80 ${hor+8} 200 ${hor+20} 400 ${hor+12}V600H-10Z" fill="${c.ochre}" opacity=".28"/>`);
  if(night){let st='';for(let i=0;i<40;i++)st+=`<circle cx="${f1(R()*390)}" cy="${f1(150+R()*150)}" r="${f1(.4+R()*.7)}" fill="${c.lit}" opacity="${f1(.4+R()*.5)}"/>`;ink+=st+`<path d="M330 120a16 16 0 1 0 9 28a12 12 0 1 1-9-28Z" fill="${c.lit}" opacity=".9"/>`}
  // back row: small houses along the ridge
  [[ -6,330,46,40,{side:6,win:[[.5,.35,7,9]]}],[44,336,38,34,{vault:1}],[86,328,50,44,{side:7,win:[[.3,.4,6,8],[.72,.4,6,8]],rail:1}],[240,330,44,40,{vault:1,side:5}],[290,326,52,44,{side:7,win:[[.5,.36,7,9]],pots:[.2,.8]}],[348,334,50,40,{win:[[.4,.4,6,8]]}]]
    .forEach(([x,y,w,h,o])=>{ink+=cube(c,W,R,{x,y,w,h,...o,lit:night})});
  [[-4,372,58,46,{side:6,win:[[.5,.35,7,9]],pots:[.5]}],[54,378,44,40,{vault:1,door:[.5,10,16]}],[100,370,60,50,{side:7,win:[[.3,.35,6,8],[.72,.35,6,8]]}],[196,376,52,44,{vault:1,side:6,door:[.5,11,18]}],[250,368,64,50,{side:7,win:[[.3,.35,7,9],[.7,.35,7,9]],rail:1}],[318,380,80,44,{win:[[.3,.4,6,8],[.7,.4,6,8]]}]]
    .forEach(([x,y,w,h,o])=>{ink+=cube(c,W,R,{x,y,w,h,...o,lit:night})});
  // the domes and their buildings
  ink+=cube(c,W,R,{x:96,y:420,w:132,h:110,side:12,win:[[.2,.36,9,13],[.5,.36,9,13],[.8,.36,9,13]],door:[.5,18,30],lit:night});
  ink+=dome(c,W,162,420,46);
  ink+=cube(c,W,R,{x:268,y:462,w:76,h:80,side:8,win:[[.3,.3,7,10],[.7,.3,7,10]],lit:night});ink+=dome(c,W,306,462,24);
  ink+=cube(c,W,R,{x:-8,y:440,w:96,h:96,side:9,win:[[.3,.3,8,11],[.68,.3,8,11]],door:[.5,15,26],rail:1,pots:[.15],lit:night});
  ink+=bougain(c,W,92,436,22,12,3,26);
  // middle rows stepping down
  const rows=[[540,[[-12,540,70,62,{vault:1,side:7,door:[.5,14,24]}],[60,546,86,56,{side:8,win:[[.25,.3,7,10],[.75,.3,7,10]],rail:1,pots:[.5]}],[150,552,62,52,{vault:1,door:[.5,13,22]}],[216,544,70,60,{side:8,win:[[.5,.3,8,11]],pots:[.15,.85]}],[290,552,104,58,{side:0,win:[[.2,.32,7,10],[.5,.32,7,10],[.8,.32,7,10]],rail:1}]]],
    [610,[[0,612,80,60,{side:8,win:[[.3,.32,7,10]],door:[.75,13,22]}],[86,618,64,52,{vault:1,side:6,door:[.5,13,22]}],[156,610,88,62,{side:9,win:[[.25,.3,7,10],[.7,.3,7,10]],rail:1}],[252,616,60,56,{vault:1,door:[.5,13,22]}],[316,612,80,60,{side:0,win:[[.5,.3,8,11]],pots:[.3,.7]}]]],
    [690,[[-10,692,90,62,{side:8,win:[[.25,.3,7,10],[.7,.3,7,10]],rail:1,pots:[.5]}],[88,698,70,54,{vault:1,door:[.5,14,24]}],[166,690,74,62,{side:8,win:[[.5,.3,8,11]]}],[248,696,64,56,{vault:1,side:6,door:[.5,13,22]}],[318,690,80,62,{win:[[.3,.3,7,10],[.75,.3,7,10]],pots:[.2]}]]],
    [770,[[4,772,74,58,{vault:1,side:7,door:[.5,14,24]}],[86,770,92,60,{side:9,win:[[.25,.3,7,10],[.72,.3,7,10]],rail:1}],[188,778,66,52,{vault:1,door:[.5,13,22]}],[262,770,72,60,{side:8,win:[[.5,.3,8,11]],pots:[.5]}],[340,776,60,54,{vault:1,door:[.5,12,20]}]]],
    [846,[[-8,848,80,54,{side:7,win:[[.5,.3,7,10]]}],[80,852,70,50,{vault:1,door:[.5,13,22]}],[158,846,84,56,{side:8,win:[[.3,.3,7,10],[.72,.3,7,10]],rail:1}],[252,852,70,50,{vault:1,side:6,door:[.5,12,20]}],[328,848,70,54,{win:[[.5,.3,7,10]],pots:[.3]}]]]];
  rows.forEach(([ry,hs],ri)=>{hs.forEach(([x,y,w,h,o])=>{const t=R();ink+=cube(c,W,R,{x,y,w,h,...o,lit:night,tint:t<.18?mix(c.house,c.ochre,.4):t<.26?mix(c.house,c.pink,.22):null})});
    ink+=stairs(c,ri%2?236:142,ry-2,5,4,4,ri%2?-1:1)});
  ink+=bougain(c,W,214,546,16,10,7,22)+bougain(c,W,10,612,18,10,9,24)+bougain(c,W,316,616,16,9,13,20)+bougain(c,W,150,692,14,9,17,18)+bougain(c,W,262,772,16,9,19,22)+bougain(c,W,70,850,14,8,23,16)+bougain(c,W,388,546,16,10,29,20);
  // caldera cliff
  const cliffTop='M-10 900C40 896 90 908 140 902S240 894 290 904S370 898 400 902';
  B.push(`<path d="${cliffTop}V1150C340 1140 300 1158 250 1150S150 1132 110 1146S30 1150-10 1140Z" fill="${c.ochre}" opacity=".7"/>`,`<path d="M-10 960C60 970 120 950 200 966S330 958 400 970V1040C320 1030 240 1050 160 1036S40 1040-10 1032Z" fill="${c.rust}" opacity=".55"/>`,`<path d="M-10 1060C80 1072 160 1056 240 1070S360 1062 400 1072V1130C300 1120 200 1140 100 1128S20 1130-10 1126Z" fill="${mix(c.rust,c.line,.3)}" opacity=".35"/>`);
  ink+=L(c,cliffTop,.7);let strata='';for(let i=0;i<16;i++){const y=914+i*14,ofs=R()*40;strata+=`M${f1(-10+ofs)} ${y}C${f1(60+ofs)} ${f1(y-5)} ${f1(120+ofs)} ${f1(y+6)} ${f1(190+ofs)} ${y}M${f1(220+ofs*.5)} ${f1(y+4)}C${f1(270+ofs)} ${f1(y-3)} ${f1(330)} ${f1(y+5)} 400 ${f1(y)}`}ink+=L(c,strata,.35,'opacity=".7"');
  let crag='';for(let i=0;i<34;i++){const x=R()*390,y=920+R()*210;crag+=`M${f1(x)} ${f1(y)}l${f1(2+R()*3)} ${f1(3+R()*4)}`}ink+=L(c,crag,.4,'opacity=".75"');
  // a few cave houses cut into the cliff top and the zigzag path
  [[30,906,36,26],[150,910,32,24],[300,906,40,28]].forEach(([x,y,w,h])=>{ink+=cube(c,W,R,{x,y,w,h,vault:1,door:[.5,10,16],lit:night})});
  ink+=L(c,'M220 908L250 940L196 976L262 1012L208 1050L250 1086L230 1120',.55)+L(c,'M226 908L256 940L202 976L268 1012L214 1050L256 1086L236 1120',.35);
  // the sea
  const sea=1130;B.push(`<path d="M-10 ${sea}C80 ${sea+10} 160 ${sea-6} 250 ${sea+6}S360 ${sea} 400 ${sea+4}V1540H-10Z" fill="url(#se${id})"/>`);
  ink+=L(c,`M-10 ${sea}C80 ${sea+10} 160 ${sea-6} 250 ${sea+6}S360 ${sea} 400 ${sea+4}`,.7);
  let wv='';for(let i=0;i<120;i++){const y=sea+16+R()*370,x=R()*390,w=4+R()*14*(1+(y-sea)/300);wv+=`M${f1(x)} ${f1(y)}q${f1(w/4)} -1.4 ${f1(w/2)} 0t${f1(w/2)} 0`}ink+=L(c,wv,.35,'opacity=".7"');
  // Ammoudi rock and the sailboat
  W.push(`<path d="M40 ${sea+60}c10-14 30-20 46-14 8 4 10 10 6 16Z" fill="${c.rust}" opacity=".7"/>`);ink+=L(c,`M40 ${sea+60}c10-14 30-20 46-14 8 4 10 10 6 16Z M50 ${sea+56}l8-6M64 ${sea+52}l8 4`,.6);
  ink+=boat(c,W,262,sea+190,1.25);
  return `<defs><linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.sky1}"/><stop offset="1" stop-color="${c.sky2}"/></linearGradient>
    <linearGradient id="se${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(c.sea,c.sky2,.3)}"/><stop offset=".35" stop-color="${c.sea}"/><stop offset="1" stop-color="${c.sea2}"/></linearGradient>
    <filter id="wc${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="3" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9" result="d"/><feGaussianBlur in="d" stdDeviation=".7"/></filter></defs>
   <g filter="url(#wc${id})" opacity="${c.wa}">${B.join('')}</g>${ink}<g filter="url(#wc${id})" opacity="${c.wa}" style="mix-blend-mode:${c.dark?'screen':'multiply'}">${W.join('')}</g>`}

/* ---------- the page view: an arch window onto the caldera ---------- */
function pageArt(c,id,night){const W=[],R=rng(5);let ink='';const ax=46,aw=208,ay=150,H=520,sill=470;
  const win=`M${ax} ${sill}V${ay+aw/2}A${aw/2} ${aw/2} 0 0 1 ${ax+aw} ${ay+aw/2}V${sill}Z`;
  W.push(`<path d="${win}" fill="url(#psk${id})"/>`,`<rect x="${ax}" y="404" width="${aw}" height="${sill-404}" fill="${c.sea}" opacity=".85"/>`,`<path d="M${ax} 404C${ax+40} 392 ${ax+80} 388 ${ax+110} 396S${ax+170} 402 ${ax+aw} 398V404H${ax}Z" fill="${c.ochre}" opacity=".6"/>`);
  ink+=L(c,`M${ax} 404C${ax+40} 392 ${ax+80} 388 ${ax+110} 396S${ax+170} 402 ${ax+aw} 398`,.5);let wv='';for(let i=0;i<26;i++){const y=412+R()*52,x=ax+6+R()*(aw-30);wv+=`M${f1(x)} ${f1(y)}q3-1.2 6 0t6 0`}ink+=L(c,wv,.35,'opacity=".7"');
  ink+=boat(c,W,ax+160,446,.8)+L(c,`M${ax+40} 300q4-4 8 0q4-4 8 0M${ax+60} 312q3-3 6 0q3-3 6 0`,.5);
  if(night){let st='';for(let i=0;i<22;i++)st+=`<circle cx="${f1(ax+10+R()*(aw-20))}" cy="${f1(ay+20+R()*200)}" r="${f1(.4+R()*.6)}" fill="${c.lit}" opacity=".8"/>`;ink+=st}
  // the wall around the window, its reveal and sill
  const wall=`M10 120H290V${H-14}H10Z`;
  const body=`<path fill-rule="evenodd" d="${wall}${win}" fill="${c.house}"/>`;
  ink+=L(c,`M10 120H290M10 120V${H-14}M290 120V${H-14}`,.7)+L(c,win,.9)+L(c,`M${ax-10} ${sill}V${ay+aw/2}A${aw/2+10} ${aw/2+10} 0 0 1 ${ax+aw+10} ${ay+aw/2}V${sill}`,.5);
  ink+=hatch(c,ax,ax+7,()=>ay+aw/2,sill,2.2)+L(c,`M${ax+7} ${sill}V${ay+aw/2}A${aw/2-7} ${aw/2-7} 0 0 1 ${ax+aw-7} ${ay+aw/2}`,.4,'opacity=".7"');
  W.push(`<path d="M${ax+aw-7} ${sill}V${ay+aw/2}A${aw/2-7} ${aw/2-7} 0 0 0 ${ax+aw/2} ${ay+7}A${aw/2} ${aw/2} 0 0 1 ${ax+aw} ${ay+aw/2}V${sill}Z" fill="${c.sea2}" opacity=".18"/>`);
  ink+=L(c,`M${ax-18} ${sill}H${ax+aw+18}V${sill+10}H${ax-18}Z`,.7)+hatch(c,ax-18,ax+aw+18,()=>sill+10,sill+16,3);
  ink+=pot(c,W,ax+aw-4,sill,1.4)+pot(c,W,ax+aw-24,sill,1.1);
  // dome and drum above
  ink+=dome(c,W,150,118,52);
  ink+=bougain(c,W,ax-12,ay+34,22,14,31,30)+bougain(c,W,ax-22,ay+120,13,12,37,46)+bougain(c,W,ax+22,ay-2,20,9,41,6)+bougain(c,W,ax+aw-6,sill-22,16,12,43,0);
  ink+=L(c,`M${ax-30} ${ay+300}C${ax-28} ${ay+200} ${ax-22} ${ay+100} ${ax-6} ${ay+40}C${ax+4} ${ay+16} ${ax+24} ${ay+2} ${ax+44} ${ay-2}`,.7);
  return `<defs><linearGradient id="psk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.sky1}"/><stop offset="1" stop-color="${c.sky2}"/></linearGradient>
    <filter id="pwc${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="3" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="8" result="d"/><feGaussianBlur in="d" stdDeviation=".6"/></filter></defs>
   <g filter="url(#pwc${id})" opacity="${c.wa}">${W.slice(0,3).join('')}</g>${body}${ink}<g filter="url(#pwc${id})" opacity="${c.wa}" style="mix-blend-mode:${c.dark?'screen':'multiply'}">${W.slice(3).join('')}</g>`}

FAMILY({key:'santorini',name:'Santorini',meaning:'Aegean village',
  blurb:'A fine ink-and-watercolour drawing of Oia on deckled cotton paper; touch it and the view pans slowly down the cliff to the sea.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Italianno', cursive",b:"'Cormorant Garamond', serif"},ms:1700,
  page(o,th,L){const [n1,n2]=coverNames(o),c=cols(th),id='p'+(++uid);
    return `<section class="page pg-santorini${c.dark?' st-dark':''}" style="--st-fg:${c.skyfg||c.accent};--st-fg2:${c.skyink||c.ink};--st-paper:${c.paper}">
     <div class="st-card"><i class="st-paper"></i><svg class="st-art" viewBox="0 0 300 520" preserveAspectRatio="xMidYMid meet">${pageArt(c,id,c.night)}</svg><i class="st-foil"></i><i class="st-foil in"></i>
      <div class="st-ptxt"><p class="kicker reveal">${ev(o,L)}</p><h1 class="names reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
       <div class="st-rule reveal d2"><i></i><b></b><i></i></div><p class="caps reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="small it reveal d3">${esc(o.venue)}</p></div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=cols(th),id='c'+(++uid);
    return `<div class="cover cv-santorini${c.dark?' st-dark':''}" style="--st-fg:${c.skyfg||c.accent};--st-fg2:${c.skyink||c.ink};--st-paper:${c.paper}">
     <div class="st-card"><i class="st-paper"></i><${tag} class="st-tap" ${attr} aria-label="${L.open}"><span class="st-scene"><svg viewBox="0 0 390 1520" preserveAspectRatio="xMidYMin slice">${scene(c,id,c.night)}</svg></span></${tag}>
      <i class="st-foil"></i><i class="st-foil in"></i>
      <div class="st-head"><p class="st-k">${ev(o,L)}</p><p class="st-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="st-d">${esc(fmtDate(o.date,o.lang))}</p></div>
      <div class="st-foot">${guest?`<p class="st-to">${L.dear}<b>${esc(guest)}</b></p>`:''}<p class="st-hint">${en?'Touch the view to see the sea':'Sentuh pemandangan untuk melihat laut'}</p></div></div></div>`},
  skin(el,o,th){K.cards(el);const c=cols(th),W=[];
    const vig=`<svg ${NS} viewBox="96 60 108 66"><defs><filter id="w"><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5"/></filter></defs>__W__${dome(c,W,150,118,40)}</svg>`;
    el.style.setProperty('--st-dome',K.uri(vig.replace('__W__','').replace('</svg>',`<g filter="url(#w)" opacity="${c.wa}" style="mix-blend-mode:${c.dark?'screen':'multiply'}">${W.join('')}</g></svg>`)));
    el.style.setProperty('--st-trim',K.uri(`<svg ${NS} viewBox="0 0 400 14" preserveAspectRatio="none"><defs><filter id="t" x="-2%" y="-50%" width="104%" height="200%"><feTurbulence type="fractalNoise" baseFrequency=".05 .4" numOctaves="3" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="6"/></filter></defs><rect x="2" y="3" width="396" height="8" fill="${c.dome}" opacity=".75" filter="url(#t)"/></svg>`));
    const W2=[];const fl=`<svg ${NS} viewBox="0 0 90 60"><defs><filter id="w"><feTurbulence type="fractalNoise" baseFrequency=".07" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5"/></filter></defs>__W__${L(c,'M90 6C70 8 50 14 36 26S16 48 10 58',.7)}${bougain(c,W2,58,16,22,10,3,10)}${bougain(c,W2,26,40,12,9,5,8)}</svg>`;
    el.style.setProperty('--st-flower',K.uri(fl.replace('__W__',`<g filter="url(#w)" opacity="${c.wa}">${W2.join('')}</g>`)));
    el.style.setProperty('--st-blue',c.dark?c.skyfg:c.dome);el.style.setProperty('--st-paper',c.paper);
    $$('.sec h2',el).forEach(h=>{h.classList.add('st-h2');h.insertAdjacentHTML('afterbegin','<i class="st-hd"></i>')});
    $$('.sheet > .sec',el).forEach((s,i)=>s.insertAdjacentHTML('afterbegin',`<i class="st-sp"></i><i class="st-tr"></i>${i%2===0?'<i class="st-fl"></i>':''}`))},
  themes:[
    {k:'siang',n:'Siang',desc:'Midday blue over the caldera',c:{ground:'#dfe7ee',sheet:'#fbf8f1',ink:'#26303e',accent:'#25508e',gold:'#b8954e',line:'#2f3a4a',dome:'#2c62ae',sky1:'#9cc4e6',sky2:'#eef0ea',sea:'#2a6cb0',pagefg:'#26303e'}},
    {k:'fajar',n:'Fajar',desc:'Dawn pink and pearl',c:{ground:'#f1e1de',sheet:'#fdf7f3',ink:'#3e2c34',accent:'#a23a5e',gold:'#b98a62',line:'#4a3640',dome:'#4a6aa8',sky1:'#f2bcc0',sky2:'#fbe8d6',sea:'#6a86b8',pink:'#d2487e',ochre:'#d9a07a',pagefg:'#3e2c34'}},
    {k:'emas',n:'Senja Emas',desc:'Golden hour on white walls',c:{ground:'#ead9b8',sheet:'#fdf6e6',ink:'#3a2c1c',accent:'#8a4a1c',gold:'#b8873a',line:'#4a3622',dome:'#2d5492',sky1:'#f0b866',sky2:'#fbe6bc',sea:'#3a5f92',ochre:'#d79a48',rust:'#b0583a',house:'#fff8ea',pagefg:'#3a2c1c'}},
    {k:'senja',n:'Senja Ungu',desc:'Dusk violet and rose',c:{ground:'#d9d0e2',sheet:'#faf6f8',ink:'#2e2638',accent:'#5a3c7e',gold:'#a8889a',line:'#382e44',dome:'#3e4a92',sky1:'#9a8cc4',sky2:'#f2c8c4',sea:'#4a4e8e',pink:'#c43c86',ochre:'#c4907e',pagefg:'#2e2638'}},
    {k:'malam',n:'Malam',desc:'Night with lit windows',c:{ground:'#0b1222',sheet:'#18223a',paper:'#18223a',ink:'#e8e0cc',accent:'#f1d79a',gold:'#d8b66a',line:'#d9d2c0',house:'#22304e',dome:'#3a64b0',win:'#2a3a5e',lit:'#ffd27a',sky1:'#0e1830',sky2:'#3a4a78',cloud:'#4a5a88',sea:'#14284e',sea2:'#0a1428',ochre:'#6a5a6e',rust:'#4a3a4e',pink:'#b0407a',leaf:'#3a5a3a',pot:'#8a4a3a',skyfg:'#f1d79a',skyink:'#e8e0cc',pagefg:'#ece4d0',dark:1,night:1,wa:.8}},
    {k:'sage',n:'Sage',desc:'Sage shutters and olive leaves',c:{ground:'#e2e6da',sheet:'#fbfaf3',ink:'#2c3428',accent:'#4a6a46',gold:'#a8985e',line:'#34402e',dome:'#5a8a74',win:'#7a9a6a',sky1:'#c4d8cc',sky2:'#f2efe0',sea:'#4a8a8a',pink:'#c25a82',ochre:'#c8a874',leaf:'#5a7a3e',pagefg:'#2c3428'}},
    {k:'dakwat',n:'Dakwat',desc:'Ink-only monochrome',c:{ground:'#e6e3dc',sheet:'#fbfaf6',ink:'#1e1e22',accent:'#1e1e22',gold:'#9a9286',line:'#1e1e22',dome:'#5a5e66',win:'#7a7e86',pink:'#8a8a90',ochre:'#b8b2a6',rust:'#8e8880',pot:'#9a948c',leaf:'#6a6e66',sea:'#6a7078',sky1:'#cfd0d2',sky2:'#f2f0ea',wa:.5,pagefg:'#1e1e22'}},
    {k:'nila',n:'Emas Nila',desc:'Gold foil linework on navy',c:{ground:'#0c1630',sheet:'#13214a',paper:'#13214a',ink:'#e9dcb8',accent:'#e2c27a',gold:'#d9b466',line:'#d4b26a',house:'#182a58',dome:'#1e3a7a',win:'#22386e',lit:'#e2c27a',sky1:'#13214a',sky2:'#1d3266',cloud:'#2a3e74',sea:'#1a3268',sea2:'#0e1a3a',ochre:'#2a3a6a',rust:'#22305e',pink:'#7a3a6a',leaf:'#2a4a4a',pot:'#5a3a3a',skyfg:'#e2c27a',skyink:'#e9dcb8',pagefg:'#ece0c0',dark:1,wa:.7}},
  ]});
