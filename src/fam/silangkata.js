/* silangkata: the weekend puzzle page of a broadsheet, folded on a desk beside a fountain pen.
   The couple's names cross in the grid, printed by hand in ink; the other answers (the day, the venue, the month) wait to be filled.
   Cover: tap "Buka Jemputan"; the pen lifts away and the rest of the answers ink in, then the page clears.
   Page: the solved puzzle set as a newspaper column with the names as the headline. Skin: newsprint columns with a thick-thin rule under each heading. */
needFont('Old+Standard+TT:ital,wght@0,400;0,700;1,400');
needFont('Caveat:wght@600');
let skN=0;
const SK_CLEAN=s=>String(s||'').normalize('NFD').replace(/[^A-Za-z]/g,'').toUpperCase();
const SK_EXTRA={
  ms:[['NIKAH','Ijab dan kabul menjadikannya sah'],['CINTA','Rasa yang menyatukan dua hati'],['KASIH','Sayang yang tidak berbelah bahagi'],['SETIA','Teguh pada janji'],['RESTU','Izin dan doa ibu bapa'],['JODOH','Ketentuan Ilahi'],['DOA','Dipohon buat kedua mempelai'],['KEKAL','Hingga ke syurga'],['BAHAGIA','Yang didoakan buat pengantin'],['SAH','Kata saksi selepas lafaz'],['AKAD','Ikatan yang dimeterai']],
  en:[['NIKAH','The marriage contract'],['LOVE','What joins two hearts'],['VOWS','Promises made today'],['UNION','Two become one'],['BLESSED','How we feel'],['DUA','Prayers for the couple'],['JOY','Shared on this day'],['HEART','Given, not lent'],['FOREVER','How long it lasts'],['HOME','Built together']]};
// greedy criss-cross builder: names cross first, then the day, the venue and wedding words where they fit
function skBuild(o){const en=o.lang==='en',[a,b]=coverNames(o),n1=SK_CLEAN(a).slice(0,11)||'A',n2=SK_CLEAN(b).slice(0,11)||'B';
  const MAX=11,cells=new Map(),words=[],key=(x,y)=>x+','+y,get=(x,y)=>cells.get(key(x,y));
  let bb={x0:0,y0:0,x1:-1,y1:-1};
  const can=(w,x,y,dir,needCross=true)=>{const dx=dir?0:1,dy=dir?1:0;let cross=0;
    if(get(x-dx,y-dy)||get(x+dx*w.length,y+dy*w.length))return -1;
    for(let i=0;i<w.length;i++){const cx=x+dx*i,cy=y+dy*i,c=get(cx,cy);
      if(c){if(c.ch!==w[i]||c.dir[dir])return -1;cross++}
      else if(get(cx+dy,cy+dx)||get(cx-dy,cy-dx))return -1}
    if(needCross&&!cross&&words.length)return -1;
    const x0=Math.min(bb.x0,x),y0=Math.min(bb.y0,y),x1=Math.max(bb.x1,x+dx*(w.length-1)),y1=Math.max(bb.y1,y+dy*(w.length-1));
    if(x1-x0+1>MAX||y1-y0+1>MAX)return -1;return cross};
  const put=(w,x,y,dir,meta)=>{const dx=dir?0:1,dy=dir?1:0;
    for(let i=0;i<w.length;i++){const k=key(x+dx*i,y+dy*i);const c=cells.get(k)||{ch:w[i],dir:[0,0],nm:0};c.dir[dir]=1;if(meta.nm)c.nm=meta.nm;cells.set(k,c)}
    bb={x0:Math.min(bb.x0,x),y0:Math.min(bb.y0,y),x1:Math.max(bb.x1,x+dx*(w.length-1)),y1:Math.max(bb.y1,y+dy*(w.length-1))};words.push({w,x,y,dir,...meta})};
  const best=(w)=>{let top=null;
    for(const [k,c] of cells){const [cx,cy]=k.split(',').map(Number);
      for(let i=0;i<w.length;i++){if(w[i]!==c.ch)continue;
        for(const dir of [0,1]){if(c.dir[dir])continue;const x=dir?cx:cx-i,y=dir?cy-i:cy;const cr=can(w,x,y,dir);if(cr<1)continue;
          const mx=(bb.x0+bb.x1)/2,my=(bb.y0+bb.y1)/2,dist=Math.abs(x+(dir?0:w.length/2)-mx)+Math.abs(y+(dir?w.length/2:0)-my);
          const sc=cr*6-dist;if(!top||sc>top.sc)top={x,y,dir,sc}}}}
    return top};
  put(n1,0,0,0,{nm:1,clue:en?'One half of the happy couple':'Mempelai yang berbahagia'});
  let p2=null;for(let i=0;i<n2.length&&!p2;i++)for(let j=0;j<n1.length&&!p2;j++){const jj=(j+Math.floor(n1.length/2))%n1.length;if(n1[jj]===n2[i]&&can(n2,jj,-i,1)>0)p2={x:jj,y:-i,dir:1}}
  if(!p2&&can(n2,0,2,0,false)>=0)p2={x:0,y:2,dir:0};
  if(p2)put(n2,p2.x,p2.y,p2.dir,{nm:2,clue:en?'Has found the other half':'Pasangan hatinya'});
  const d=new Date((o.date||'')+'T00:00:00'),ok=!isNaN(d),lang=en?'en':'ms';
  const info=[];
  if(ok)info.push([SK_CLEAN(DAYS[lang][d.getDay()]),(en?'The big day: ':'Hari bahagia: ')+fmtDate(o.date,o.lang,false)+(o.start?', '+fmtTime(o.start,o.lang):'')]);
  const vw=String(o.venue||'').split(/\s+/).map(SK_CLEAN).find(w=>w.length>=3&&w.length<=9);
  if(vw)info.push([vw,(en?'Where we gather: ':'Bertempat di ')+(o.venue||'')]);
  if(ok)info.push([SK_CLEAN(MONTHS[lang][d.getMonth()]).slice(0,9),(en?'Month of the wedding, ':'Bulan majlis, tahun ')+d.getFullYear()]);
  for(const [w,cl] of [...info,...SK_EXTRA[lang]]){if(words.length>=8)break;if(words.some(x=>x.w===w))continue;const p=best(w);if(p)put(w,p.x,p.y,p.dir,{clue:cl,info:info.some(i=>i[0]===w)})}
  // normalise and number
  const cols=bb.x1-bb.x0+1,rows=bb.y1-bb.y0+1;words.forEach(w=>{w.x-=bb.x0;w.y-=bb.y0});
  const out=[...cells].map(([k,c])=>{const [x,y]=k.split(',').map(Number);return {x:x-bb.x0,y:y-bb.y0,...c}});
  const starts=[...new Set(words.map(w=>w.y*100+w.x))].sort((p,q)=>p-q);
  words.forEach(w=>w.num=starts.indexOf(w.y*100+w.x)+1);
  out.forEach(c=>{const i=starts.indexOf(c.y*100+c.x);c.num=i<0?0:i+1});
  return {cols,rows,cells:out,words}}
const skNo=o=>{const d=new Date((o.date||'')+'T00:00:00');return isNaN(d)?'1':String(d.getDate())+String(d.getMonth()+1).padStart(2,'0')};
const skVars=c=>`--pen:${c.pen};--rule:${c.line}`;
function skGrid(P,mode){const rest=P.cells.filter(c=>!c.nm).sort((p,q)=>p.y-q.y||p.x-q.x),step=.9/Math.max(1,rest.length);
  return `<div class="sk-grid ${mode}" style="--cols:${P.cols};--rows:${P.rows}">${P.cells.map(c=>{
    const dl=c.nm?0:(.15+rest.indexOf(c)*step).toFixed(2);
    return `<span class="sk-c" style="left:${(c.x*100/P.cols).toFixed(3)}%;top:${(c.y*100/P.rows).toFixed(3)}%">${c.num?`<i>${c.num}</i>`:''}<b class="sk-l${c.nm?' nm':' x'}" style="--d:${dl}s">${c.ch}</b></span>`}).join('')}</div>`}
function skClues(P,en){const li=w=>`<li><b>${w.num}</b> ${esc(w.clue)} <em>(${w.w.length})</em></li>`;
  const ac=P.words.filter(w=>!w.dir).sort((p,q)=>p.num-q.num),dn=P.words.filter(w=>w.dir).sort((p,q)=>p.num-q.num);
  return `<div class="sk-clues"><div><h4>${en?'Across':'Mendatar'}</h4><ol>${ac.map(li).join('')}</ol></div><div><h4>${en?'Down':'Menurun'}</h4><ol>${dn.map(li).join('')}</ol></div></div>`}
// a fountain pen: black resin barrel and cap, gold clip and bands, a two-tone nib
const skPen=u=>`<svg class="sk-pen" viewBox="0 0 400 40" aria-hidden="true"><defs>
  <linearGradient id="skr${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4743"/><stop offset=".18" stop-color="#d9d4cb" stop-opacity=".9"/><stop offset=".3" stop-color="#2a2826"/><stop offset=".7" stop-color="#121110"/><stop offset="1" stop-color="#050505"/></linearGradient>
  <linearGradient id="skg${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3cf"/><stop offset=".35" stop-color="#d6b066"/><stop offset=".7" stop-color="#8a6a2c"/><stop offset="1" stop-color="#5a4318"/></linearGradient></defs>
  <path d="M2 20L40 12.6 40 27.4Z" fill="url(#skg${u})"/><path d="M2 20L24 17.6 24 22.4Z" fill="#cfd2d6" opacity=".55"/><path d="M4 20H30" stroke="#3a2c10" stroke-width=".6"/><circle cx="28" cy="20" r="1.3" fill="#3a2c10"/>
  <path d="M40 12.2H72L76 11V29L72 27.8H40Z" fill="url(#skr${u})"/><path d="M44 13.6v12.8M48 13.6v12.8" stroke="#000" stroke-opacity=".35" stroke-width=".5"/>
  <path d="M76 9.8H210V30.2H76Z" fill="url(#skr${u})"/>
  <path d="M206 8.6H222V31.4H206Z" fill="url(#skg${u})"/><path d="M210 8.6v22.8M218 8.6v22.8" stroke="#5a4318" stroke-width=".6"/>
  <path d="M222 8.6H382Q396 8.6 396 20Q396 31.4 382 31.4H222Z" fill="url(#skr${u})"/>
  <path d="M370 8.6h5v22.8h-5z" fill="url(#skg${u})"/>
  <path d="M236 5.6H354Q362 5.6 362 9.4V11.2H244Q238 11.2 236 9Z" fill="url(#skg${u})"/><circle cx="244" cy="8.4" r="2.6" fill="url(#skg${u})" stroke="#5a4318" stroke-width=".4"/></svg>`;

FAMILY({key:'silangkata',name:'Silang Kata',meaning:'Weekend crossword',
  blurb:'The weekend crossword page of a newspaper, folded on a desk beside a fountain pen, with the couple’s names crossing in the grid in ink.',
  fonts:{d:"'Old Standard TT', serif",s:"'Old Standard TT', serif",b:"'Old Standard TT', serif"},ms:1500,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',P=skBuild(o);
    return `<section class="page pg-silangkata2${th.c.dark?' sk-dark':''}" style="${skVars(th.c)}"><div class="sk-desk"></div>
    <div class="sk-paper sk-pp reveal"><i class="sk-crease"></i>
      <p class="sk-dl"><span>${en?'Weekend edition':'Edisi Hujung Minggu'}</span><span>${en?'Puzzle':'Teka-teki'} No. ${skNo(o)}</span></p>
      <p class="sk-k kicker">${ev(o,L)}</p>
      <h1 class="names sk-names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1>
      <p class="sk-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="sk-ven">${esc(o.venue)}</p>`:''}
      <i class="sk-tt"></i>
      ${skGrid(P,'pg')}
      <div class="sk-pills"><a class="sk-pill" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="sk-pill" data-go="rsvp" href="#">RSVP</a>`:''}</div>
    </div></section>`},
  cover(o,th,L,guest,tag,attr){const en=o.lang==='en',P=skBuild(o),u=++skN;
    return `<div class="cover cv-silangkata2${th.c.dark?' sk-dark':''}" style="${skVars(th.c)}"><div class="sk-desk"></div>
    <div class="sk-paper sk-cp"><i class="sk-crease"></i>
      <p class="sk-dl"><span>${en?'Weekend edition':'Edisi Hujung Minggu'}</span><span>${esc(fmtShort(o.date))}</span></p>
      <h2 class="sk-title">${en?'The Crossword':'Silang Kata'}</h2>
      <p class="sk-deck">${ev(o,L)} · No. ${skNo(o)}</p>
      ${skGrid(P,'cv')}${skClues(P,en)}
    </div>
    <div class="sk-penw">${skPen(u)}</div>
    <div class="sk-foot">${guest?`<p class="sk-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}<${tag} class="sk-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.setAttribute('style',(el.getAttribute('style')||'')+';'+skVars(th.c));el.classList.toggle('sk-dark',!!th.c.dark);
    const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'kertas',n:'Kertas',desc:'Newsprint on a walnut desk, blue-black ink',c:{ground:'#3a3029',sheet:'#f1ebdd',ink:'#1c1a17',accent:'#1c1a17',gold:'#a8884a',pagefg:'#efe7d6',pen:'#1f2f6b',line:'rgba(28,26,23,.5)',dark:'1'}},
    {k:'biru',n:'Biru',desc:'Cool white paper on a pale blue desk, blue ink',c:{ground:'#d5dce5',sheet:'#f8f6f0',ink:'#1a2233',accent:'#23417e',gold:'#9c7a3c',pagefg:'#1a2233',pen:'#23417e',line:'rgba(26,34,51,.5)',dark:''}},
    {k:'merah',n:'Merah',desc:'Cream paper on a maroon desk, red ink',c:{ground:'#561a1e',sheet:'#f6efe3',ink:'#221a18',accent:'#8e1f29',gold:'#b8914c',pagefg:'#f6efe4',pen:'#8e1f29',line:'rgba(34,26,24,.5)',dark:'1'}},
    {k:'hitam',n:'Hitam',desc:'Newsprint on a black desk, black ink',c:{ground:'#151515',sheet:'#eeeae0',ink:'#161616',accent:'#161616',gold:'#c8a25a',pagefg:'#ece5d6',pen:'#161616',line:'rgba(22,22,22,.5)',dark:'1'}},
    {k:'hijau',n:'Hijau',desc:'Pale paper on a sage desk, green ink',c:{ground:'#d2d9cb',sheet:'#f6f4ea',ink:'#1e2a22',accent:'#2c5a43',gold:'#a48748',pagefg:'#24302a',pen:'#2c5a43',line:'rgba(30,42,34,.5)',dark:''}},
    {k:'jambu',n:'Jambu',desc:'Blush paper on a rose desk, plum ink',c:{ground:'#ead6d3',sheet:'#fdf8f3',ink:'#2f2226',accent:'#7a2f45',gold:'#b08a55',pagefg:'#3a262c',pen:'#7a2f45',line:'rgba(47,34,38,.48)',dark:''}},
    {k:'sepia',n:'Sepia',desc:'Aged newsprint on oak, brown ink',c:{ground:'#d9ccb2',sheet:'#efe4cb',ink:'#2e2214',accent:'#6a3f1c',gold:'#8c6a34',pagefg:'#3a2a1a',pen:'#4a2c16',line:'rgba(46,34,20,.5)',dark:''}},
    {k:'nila',n:'Nila',desc:'Newsprint on a midnight desk, indigo ink',c:{ground:'#151f36',sheet:'#f2eee5',ink:'#181d2a',accent:'#2c3d74',gold:'#c4a25e',pagefg:'#e8e4da',pen:'#22336b',line:'rgba(24,29,42,.5)',dark:'1'}},
  ]});
