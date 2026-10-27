/* garis: a single continuous pen line on cream cotton stock, a rose bouquet tied with a bow, drawn without lifting the pen.
   Cover: a debossed card with the drawing almost finished; touch it and the line completes itself, then the page fades in.
   Page: a small line drawing over the names. Skin: one-line flourishes under each heading on debossed cards. */
needFont('Mrs+Saint+Delafield');
needFont('Jost:wght@300;400;500');
const SCR="'Mrs Saint Delafield', cursive",CG="'Cormorant Garamond', serif",JO="'Jost', sans-serif";
// Catmull-Rom through points -> smooth cubic path
function smooth(p,t=.5){let d=`M${p[0][0].toFixed(1)} ${p[0][1].toFixed(1)}`;for(let i=0;i<p.length-1;i++){const a=p[i-1]||p[i],b=p[i],c=p[i+1],e=p[i+2]||c;
  const c1=[b[0]+(c[0]-a[0])*t/3,b[1]+(c[1]-a[1])*t/3],c2=[c[0]-(e[0]-b[0])*t/3,c[1]-(e[1]-b[1])*t/3];d+=`C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`}return d}
// a rose: spiral outward from the centre with soft petal lobes, ending on the outer cup at angle `end`
function rose(cx,cy,R,turns,ph,end){const out=[];const N=Math.round(turns*16);for(let i=1;i<=N;i++){const t=i/N,a=ph+t*turns*Math.PI*2,r=R*(.12+.88*Math.pow(t,.9))*(1+.1*Math.sin(a*2.5));out.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r*.86])}
  out.push([cx+Math.cos(end)*R*1.05,cy+Math.sin(end)*R*.95]);return out}
function leaf(x,y,dx,dy,w){const L=Math.hypot(dx,dy),nx=-dy/L*w,ny=dx/L*w;return [[x+dx*.45+nx,y+dy*.45+ny],[x+dx,y+dy],[x+dx*.45-nx,y+dy*.45-ny],[x+1,y+1]]}
const BOUQUET=(()=>{const P=[];const add=a=>a.forEach(q=>P.push(q));
  add([[50,254],[70,248],[88,232],[100,212]]);
  add([[88,204],[70,196],[64,208],[78,214],[100,210]]);                      // bow, left loop
  add([[120,200],[136,192],[140,206],[124,214],[104,212]]);                  // bow, right loop
  add([[114,226],[124,244],[116,238],[101,212]]);                            // ribbon tail curls back
  add([[94,190],[84,160],[72,128],[64,104]]);                                // stem to the first rose
  add(rose(62,90,24,2.6,Math.PI*.9,Math.PI*.3));
  add([[80,116],[90,140]]);add(leaf(90,140,-30,14,8));                       // leaf
  add([[86,128],[78,154]]);add(leaf(78,154,-22,-4,6));
  add([[92,140],[102,106],[108,82]]);add(rose(110,64,28,2.9,0,Math.PI*.45));
  add([[124,86],[132,74],[138,60]]);add(rose(140,52,9,1.4,Math.PI*1.2,Math.PI*.6));   // a bud
  add([[146,64],[150,84]]);add(rose(152,100,20,2.2,Math.PI,Math.PI*.65));
  add([[144,122],[140,132]]);add(leaf(140,132,30,4,8));
  add([[132,140],[130,128]]);add(rose(128,130,11,1.6,Math.PI*1.5,Math.PI*.9));
  add([[120,146],[112,152]]);add(leaf(112,152,24,22,6));
  add([[104,142],[98,130]]);add(rose(90,128,15,1.9,Math.PI*1.4,Math.PI*.95));
  add([[78,140],[60,148]]);add(rose(52,146,7,1.2,0,Math.PI*.2));             // a small bud low left
  add([[60,156],[80,168],[96,190],[104,214],[106,236],[100,250],[112,258],[134,254],[154,244]]);
  return smooth(P)})();
function lineArt(cls){return `<svg class="${cls}" viewBox="30 24 148 240" aria-hidden="true"><path class="gr-line" d="${BOUQUET}" pathLength="1" fill="none" stroke="var(--ink)" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
// one-line flourish for the skin: a level line that makes n loops
function flourish(n,w=200){const P=[[4,12]],seg=(w-8)/(n+1);for(let i=1;i<=n;i++){const x=4+seg*i;P.push([x-seg*.3,12],[x+3,4],[x+6,11],[x-2,15],[x-6,10],[x+seg*.3,12])}P.push([w-4,12]);
  return `<svg class="gr-fl" viewBox="0 0 ${w} 20" aria-hidden="true"><path d="${smooth(P)}" fill="none" stroke="var(--ink)" stroke-width="1" stroke-linecap="round"/></svg>`}
const mono=o=>{const [a,b]=K.initials(o);return `<span class="gr-mono">${esc(a)}<i></i>${esc(b)}</span>`};
FAMILY({key:'garis',name:'Garis Tunggal',meaning:'One continuous line',
  blurb:'A rose bouquet drawn in one unbroken pen line on cream cotton stock, debossed and letterpressed; touch it and the line finishes itself.',
  fonts:{d:JO,s:SCR,b:CG},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-garis" style="--press:${th.c.press}"><div class="gr-card"><i class="gr-deb"></i>
     <div class="gr-pa reveal">${lineArt('gr-art')}</div>
     <p class="gr-k reveal d1">${ev(o,L)}</p>
     <h1 class="names gr-nm reveal d1">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     ${flourish(1,150).replace('gr-fl','gr-fl reveal d2')}
     <p class="gr-d reveal d2">${esc(fmtDate(o.date,o.lang))}</p><p class="gr-v reveal d3">${esc(fmtTime(o.start,o.lang))} &#183; ${esc(o.venue)}</p>
     ${o.hijri?`<p class="gr-h reveal d3">${esc(o.hijri)}</p>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-garis" style="--press:${th.c.press}"><div class="gr-table"></div><div class="gr-card"><i class="gr-deb"></i>
     <div class="gr-top">${mono(o)}<p class="gr-k">${ev(o,L)}</p></div>
     <${tag} class="gr-draw" ${attr} aria-label="${L.open}">${lineArt('gr-art')}</${tag}>
     <p class="gr-nm">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p>
     <p class="gr-d">${esc(fmtDate(o.date,o.lang))}</p><p class="gr-v">${esc(o.venue)}</p>
     ${guest?`<p class="gr-to">${L.dear}<b>${esc(guest)}</b></p>`:''}
     <p class="gr-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty("--press",th.c.press);$$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(h)h.insertAdjacentHTML('afterend',flourish(i%3+1,180))})},
  themes:[
    {k:'krim',n:'Krim',desc:'Sepia ink on cream cotton',c:{ground:'#e6ddcd',sheet:'#f8f3ea',ink:'#2b2622',accent:'#8a6d4b',gold:'#b8925a',press:'rgba(255,255,255,.75)',pagefg:'#2b2622',line:'rgba(43,38,34,.16)'}},
    {k:'sage',n:'Sage',desc:'Forest ink on sage-washed stock',c:{ground:'#c8cebd',sheet:'#f5f3ec',ink:'#2f3a30',accent:'#5c7055',gold:'#a99060',press:'rgba(255,255,255,.75)',pagefg:'#26302a',line:'rgba(47,58,48,.16)'}},
    {k:'jambu',n:'Jambu',desc:'Plum ink on blush cotton',c:{ground:'#ead6d0',sheet:'#fbf4f1',ink:'#3b2a2d',accent:'#a8616a',gold:'#c09a6a',press:'rgba(255,255,255,.75)',pagefg:'#3b2a2d',line:'rgba(59,42,45,.16)'}},
    {k:'biru',n:'Biru',desc:'Navy ink on bright white',c:{ground:'#cdd6e1',sheet:'#f7f8f7',ink:'#1f2a3a',accent:'#3f5a7a',gold:'#a3a8b4',press:'rgba(255,255,255,.8)',pagefg:'#1f2a3a',line:'rgba(31,42,58,.16)'}},
    {k:'terakota',n:'Terakota',desc:'Rust ink on warm cotton',c:{ground:'#d8b8a2',sheet:'#faf1e8',ink:'#4a2a1c',accent:'#b0583a',gold:'#b8864a',press:'rgba(255,255,255,.75)',pagefg:'#3d2318',line:'rgba(74,42,28,.16)'}},
    {k:'hitam',n:'Hitam',desc:'Ivory line on charcoal stock',c:{ground:'#141414',sheet:'#201f1d',ink:'#ece4d6',accent:'#c9a978',gold:'#c9a978',press:'rgba(0,0,0,.7)',pagefg:'#ece4d6',line:'rgba(236,228,214,.16)'}},
    {k:'hijau',n:'Hijau',desc:'Cream line on bottle green',c:{ground:'#10211a',sheet:'#1a3028',ink:'#efe7d6',accent:'#d1b47a',gold:'#d1b47a',press:'rgba(0,0,0,.6)',pagefg:'#efe7d6',line:'rgba(239,231,214,.16)'}},
    {k:'nila',n:'Nila',desc:'Silver-white line on midnight',c:{ground:'#0f1828',sheet:'#17233a',ink:'#e8e2d4',accent:'#c7b07a',gold:'#c0c4cc',press:'rgba(0,0,0,.6)',pagefg:'#e8e2d4',line:'rgba(232,226,212,.16)'}},
  ]});
