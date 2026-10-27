/* kertas (redesign): handmade papers in three colours, torn by hand and stacked, with a cream card on top
   held by a cotton thread and a real wax seal.
   Cover: touch the seal, it lifts away and the papers slide apart: the card rises, the coloured sheets fall away.
   Page: the same stack, larger, with the names on the cream card. Skin: torn-edged cotton cards with a strip of
   coloured handmade paper peeking above each one. */
// a torn edge all round: a polygon in % with a small hand-torn wobble; seed keeps every sheet different
const kpTorn=(seed,amp=1.6,n=44)=>{const r=rng(seed),pts=[];
  // low-frequency wander plus fine jitter, like paper torn along a wet ruler
  const edge=()=>{const p1=r()*6,p2=r()*6,f1=2+r()*2,f2=5+r()*3;return t=>amp*(.55+.28*Math.sin(t*f1+p1)+.14*Math.sin(t*f2*2.3+p2)+(r()-.5)*.55)};
  const T=edge(),R=edge(),B=edge(),Lf=edge(),k=Math.round(n*1.3);
  for(let i=0;i<=n;i++)pts.push([i/n*100,T(i/n*6.28)]);
  for(let i=1;i<=k;i++)pts.push([100-R(i/k*6.28)*.8,i/k*100]);
  for(let i=n-1;i>=0;i--)pts.push([i/n*100,100-B(i/n*6.28)]);
  for(let i=k-1;i>0;i--)pts.push([Lf(i/k*6.28)*.8,i/k*100]);
  return `polygon(${pts.map(([x,y])=>`${Math.min(100,Math.max(0,x)).toFixed(2)}% ${Math.min(100,Math.max(0,y)).toFixed(2)}%`).join(',')})`};
// loose fibres and inclusions, the look of handmade cotton/mulberry paper
const kpFib=(seed,col,n=70)=>{const r=rng(seed);let d='';
  for(let i=0;i<n;i++){const x=r()*300,y=r()*300,a=r()*Math.PI*2,l=6+r()*22,b=(r()-.5)*10;
    const x2=x+Math.cos(a)*l,y2=y+Math.sin(a)*l,cx=(x+x2)/2+b,cy=(y+y2)/2-b;
    d+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${col}" stroke-width="${(.35+r()*.5).toFixed(2)}" fill="none" opacity="${(.25+r()*.45).toFixed(2)}"/>`}
  for(let i=0;i<14;i++)d+=`<circle cx="${(r()*300).toFixed(1)}" cy="${(r()*300).toFixed(1)}" r="${(.4+r()*.9).toFixed(2)}" fill="${col}" opacity=".35"/>`;
  return K.uri(`<svg ${NS} width="300" height="300" viewBox="0 0 300 300">${d}</svg>`)};
// one sheet: the torn edge shows a paler fibrous core around the coloured paper
const kpSheet=(cls,col,seed,style='')=>`<div class="kt2-sh ${cls}" style="--c:${col};${style}"><i class="kt2-core" style="clip-path:${kpTorn(seed+7,2.2)}"></i><i class="kt2-pap" style="--fib:${kpFib(seed,'rgba(255,255,255,.85)')};clip-path:${kpTorn(seed,1.6)}"></i></div>`;
const kpThread=()=>`<svg class="kt2-thread" viewBox="0 0 300 20" preserveAspectRatio="none"><path d="M-4 9C60 12 110 7 150 10S240 13 304 8" fill="none" stroke="#f3ece0" stroke-width="1.6"/><path d="M-4 11C70 9 120 13 150 11S230 8 304 12" fill="none" stroke="#e9dfcf" stroke-width="1.3"/><path d="M-4 9C60 12 110 7 150 10S240 13 304 8" fill="none" stroke="rgba(0,0,0,.18)" stroke-width=".5" stroke-dasharray="1.2 1.6"/></svg>`;
const kpMono=o=>{const j=String(o.jawi||'').trim();if(j)return `<span class="kt2-jw">${esc(j)}</span>`;const [a,b]=K.initials(o);return `${esc(a)}<i>&amp;</i>${esc(b)}`};
const kpStack=(th,big)=>{const [a,b,c]=th.layers;return kpSheet('kt2-l3',c,big?31:11,'')+kpSheet('kt2-l2',b,big?32:12,'')+kpSheet('kt2-l1',a,big?33:13,'')};
FAMILY({key:'kertas',name:'Kertas',meaning:'Torn paper',
  blurb:'Three hand-torn handmade papers stacked under a cream card, tied with cotton thread and a wax seal. Touch the seal and the papers slide apart.',
  fonts:{d:"'Cormorant Garamond', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-kertas2"><div class="kt2-table"></div>
      <div class="kt2-stack big reveal">${kpStack(th,true)}
        <div class="kt2-card"><i class="kt2-pap" style="--c:var(--sheet);--fib:${kpFib(41,'rgba(120,100,80,.5)',50)};clip-path:${kpTorn(44,1.1,30)}"></i>
          <div class="kt2-in"><p class="kt2-k kicker">${ev(o,L)}</p><h1 class="kt2-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</h1>
          <p class="kt2-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="kt2-ven">${esc(o.venue)}</p>`:''}</div></div>
        <span class="kt2-seal kt2-seal-s" style="--seal:url(${A}seal-${th.seal}.webp)"><span>${kpMono(o)}</span></span>
      </div>
      <div class="kt2-acts reveal d2"><a class="kt2-pill" data-go="when" href="#">${en?'Event details':'Maklumat Majlis'}</a>${o.x_rsvp?`<a class="kt2-pill kt2-ghost" data-go="rsvp" href="#">RSVP</a>`:''}</div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-kertas2"><div class="kt2-table"></div>
      ${guest?`<p class="kt2-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:'<p class="kt2-to kt2-to-k"><small>'+ev(o,L)+'</small></p>'}
      <div class="kt2-stack">${kpStack(th,false)}
        <div class="kt2-card"><i class="kt2-pap" style="--c:var(--sheet);--fib:${kpFib(21,'rgba(120,100,80,.5)',50)};clip-path:${kpTorn(24,1.2,30)}"></i>
          <div class="kt2-in"><p class="kt2-k">${ev(o,L)}</p><p class="kt2-cn">${esc(n1)}<span>&amp;</span>${esc(n2)}</p><p class="kt2-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div></div>
        ${kpThread()}
        <${tag} class="kt2-seal" ${attr} aria-label="${L.open}" style="--seal:url(${A}seal-${th.seal}.webp)"><span>${kpMono(o)}</span></${tag}>
      </div>
      <p class="kt2-hint">${en?'Open invitation':'Buka Jemputan'}</p></div>`},
  skin(el,o,th,L){K.cards(el);const [a,b,c]=th.layers;el.style.setProperty('--l1',a);el.style.setProperty('--l2',b);el.style.setProperty('--l3',c);
    el.style.setProperty('--kfib',kpFib(5,'rgba(120,100,80,.45)',40));
    $$('.sheet > .sec',el).forEach((s,i)=>{s.style.setProperty('--tear',kpTorn(60+i,1.4,22));s.style.setProperty('--strip',[a,b,c][i%3])});
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(x=>x.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${x.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'bumi',n:'Bumi',desc:'Ochre, terracotta and mocha papers, gold seal',c:{ground:'#e9e1d4',sheet:'#fbf6ec',ink:'#33291f',accent:'#6b4a3a',gold:'#b5593b',pagefg:'#33291f'},extra:{layers:['#c9a36e','#b5593b','#6b4a3a'],seal:'emas'}},
    {k:'sage',n:'Sage',desc:'Cream, sage and forest papers, ivory seal',c:{ground:'#e6e6dc',sheet:'#fbfaf3',ink:'#2e3329',accent:'#4f5d47',gold:'#8a9a7c',pagefg:'#2e3329'},extra:{layers:['#d7d2bd','#a8b59a','#4f5d47'],seal:'gading'}},
    {k:'laut',n:'Laut',desc:'Sand, dusty blue and navy papers on slate',c:{ground:'#2b3446',sheet:'#fbfaf6',ink:'#26303f',accent:'#1d2b4a',gold:'#7d95b4',pagefg:'#eef1f5'},extra:{layers:['#e6d6b8','#7d95b4','#1d2b4a'],seal:'emas'}},
    {k:'mawar',n:'Mawar',desc:'Blush, rose and burgundy papers, ivory seal',c:{ground:'#efe2dc',sheet:'#fffaf6',ink:'#3a2328',accent:'#5a1a2a',gold:'#b87878',pagefg:'#3a2328'},extra:{layers:['#efd1c9','#c98b8b','#5a1a2a'],seal:'gading'}},
    {k:'lavender',n:'Lavender',desc:'Silver, lilac and charcoal papers',c:{ground:'#e7e5ec',sheet:'#fbfaff',ink:'#2f2d36',accent:'#3f3d46',gold:'#8f84bb',pagefg:'#2f2d36'},extra:{layers:['#d9d6e2','#a79bd1','#3f3d46'],seal:'gading'}},
    {k:'karang',n:'Karang',desc:'Peach, coral and teal papers, gold seal',c:{ground:'#f0e4da',sheet:'#fffaf5',ink:'#22302f',accent:'#0f6b6b',gold:'#d9765e',pagefg:'#22302f'},extra:{layers:['#f6cdb3','#ef8a72','#0f6b6b'],seal:'emas'}},
    {k:'pandan',n:'Pandan',desc:'Mustard, leaf and pandan papers on deep green',c:{ground:'#1f3a2d',sheet:'#fbf8f1',ink:'#26332b',accent:'#0d4a32',gold:'#c9a43f',pagefg:'#eef0e6'},extra:{layers:['#c9a43f','#7fa36a','#0d4a32'],seal:'emas'}},
    {k:'kopi',n:'Kopi Susu',desc:'Latte, caramel and espresso papers, red seal',c:{ground:'#3a2a22',sheet:'#fbf6ee',ink:'#33271f',accent:'#6b4a3a',gold:'#a07a5a',pagefg:'#f3e9dd'},extra:{layers:['#c9a982','#a07a5a','#5a3f30'],seal:'merah'}},
    {k:'hujan',n:'Biru Hujan',desc:'Mist, rain-blue and slate papers, blue seal',c:{ground:'#e3e7ea',sheet:'#fbfbf8',ink:'#26303a',accent:'#3a5570',gold:'#6f8aa6',pagefg:'#26303a'},extra:{layers:['#c3d0dc','#8fa7bd','#3a5570'],seal:'biru'}},
    {k:'fajar',n:'Fajar',desc:'Apricot, rose and plum papers, ivory seal',c:{ground:'#f3e5dc',sheet:'#fffaf6',ink:'#3a2530',accent:'#a3465f',gold:'#e0946a',pagefg:'#3a2530'},extra:{layers:['#f0b88c','#d9708a','#4a2238'],seal:'gading'}},
  ]});
