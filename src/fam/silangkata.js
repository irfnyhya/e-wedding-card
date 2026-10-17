/* silangkata: a criss-cross puzzle on newsprint where the couple's names cross.
   Cover: the puzzle page with its clues and a pencil; touching the grid writes the names into the squares (about 1.2 s).
   Page: the solved grid with clues that give the day, date and venue. Skin: headings set in answer boxes. */
needFont('Caveat:wght@400;600');
needFont('Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900');
needFont('Jost:wght@300;400;500;600');
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
function skGrid(P,mode){const nameCells=P.cells.filter(c=>c.nm).sort((p,q)=>p.y-q.y||p.x-q.x);const step=1.05/Math.max(1,nameCells.length);
  return `<span class="silangkata-grid" style="--cols:${P.cols};--rows:${P.rows}">${P.cells.map(c=>{const fill=mode==='page'||c.nm;
    const dl=c.nm?(nameCells.indexOf(c)*step).toFixed(2):0;
    return `<span class="silangkata-c${c.nm?' nm':''}" style="left:${(c.x*100/P.cols).toFixed(3)}%;top:${(c.y*100/P.rows).toFixed(3)}%">${c.num?`<i>${c.num}</i>`:''}${fill?`<b class="silangkata-l" style="--d:${dl}s">${c.ch}</b>`:''}</span>`}).join('')}</span>`}
function skClues(P,en,full){const li=w=>`<li class="${w.info?'inf':''}${w.nm?' nm':''}"><b>${w.num}</b><span>${esc(w.clue)}${full&&!w.nm?'':` <em>(${w.w.length})</em>`}</span></li>`;
  const ac=P.words.filter(w=>!w.dir).sort((p,q)=>p.num-q.num),dn=P.words.filter(w=>w.dir).sort((p,q)=>p.num-q.num);
  return `<div class="silangkata-clues"><div><h4>${en?'Across':'Mendatar'}</h4><ol>${ac.map(li).join('')}</ol></div><div><h4>${en?'Down':'Menurun'}</h4><ol>${dn.map(li).join('')}</ol></div></div>`}
const SK_PENCIL=(c,u)=>`<svg class="silangkata-pencil" viewBox="0 0 320 26" aria-hidden="true"><defs><linearGradient id="skp${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a3a"/><stop offset=".35" stop-color="#1b1b1b"/><stop offset=".36" stop-color="#2a2a2a"/><stop offset=".65" stop-color="#141414"/><stop offset=".66" stop-color="#232323"/><stop offset="1" stop-color="#0c0c0c"/></linearGradient>
  <linearGradient id="skf${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6e7b8"/><stop offset=".45" stop-color="${c.gold}"/><stop offset="1" stop-color="#6b5226"/></linearGradient></defs>
  <path d="M40 3H262V23H40z" fill="url(#skp${u})"/><path d="M40 3L8 13 40 23z" fill="#e8cfa4"/><path d="M8 13l9-2.8v5.6z" fill="#2a2a2a"/><path d="M40 3l-6 3 6 2-6 3 6 2-6 3 6 2-6 3 6 3" fill="none" stroke="#c9ad80" stroke-width=".6"/>
  <path d="M262 2.4h26v21.2h-26z" fill="url(#skf${u})"/><path d="M266 2.4v21.2M270 2.4v21.2M280 2.4v21.2M284 2.4v21.2" stroke="#6b5226" stroke-width=".7"/>
  <path d="M288 3.4h22a6 6 0 0 1 6 6v7.2a6 6 0 0 1-6 6h-22z" fill="${c.accent}"/><path d="M288 6h22" stroke="#fff" stroke-opacity=".25" stroke-width="1.4"/>
  <path d="M60 9.4h110" stroke="${c.gold}" stroke-width=".6" opacity=".8"/></svg>`;

FAMILY({key:'silangkata',name:'Silang Kata',meaning:'Crossword puzzle',
  blurb:'A criss-cross puzzle on newsprint where the couple’s names cross; touch the grid and the names are written in, the clues giving the date and venue.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1650,
  page(o,th,L){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en',P=skBuild(o);
    return `<section class="page pg-silangkata" style="--pen:${c.pen}"><div class="silangkata-desk"></div>
     <div class="silangkata-paper reveal"><div class="silangkata-mast"><span>${en?'Solution':'Jawapan'}</span><b>${en?'Crossword':'Silang Kata'}</b><span>No. ${esc((fmtShort(o.date)||'').replace(/\./g,''))}</span></div>
      <p class="silangkata-sub">${ev(o,L)}</p><h1 class="names silangkata-names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1>
      <div class="silangkata-wrap">${skGrid(P,'page')}</div>${skClues(P,en,true)}
      <p class="silangkata-foot">${esc(o.address||'')}</p></div></section>`},
  cover(o,th,L,guest,tag,attr){const c=th.c,en=o.lang==='en',P=skBuild(o);
    return `<div class="cover cv-silangkata" style="--pen:${c.pen}"><div class="silangkata-desk"></div>
     <div class="silangkata-paper"><div class="silangkata-mast"><span>${en?'Special edition':'Edisi istimewa'}</span><b>${en?'Crossword':'Silang Kata'}</b><span>No. ${esc((fmtShort(o.date)||'').replace(/\./g,''))}</span></div>
      <p class="silangkata-sub">${ev(o,L)} · ${esc(fmtDate(o.date,o.lang))}</p>
      <p class="silangkata-q">${en?'Who are the happy couple?':'Siapakah mempelai kita?'}</p>
      <${tag} class="silangkata-tap" ${attr} aria-label="${L.open}">${skGrid(P,'cover')}</${tag}>
      ${skClues(P,en,false)}
      <div class="silangkata-bot"><div class="silangkata-coupon"><p class="silangkata-ch">${en?'Entry coupon':'Kupon penyertaan'}</p>
        <p class="silangkata-cl"><span>${en?'Name':'Nama'}</span><b>${guest?esc(guest):'&nbsp;'}</b></p>
        <p class="silangkata-cl"><span>${en?'Reply by':'Jawab sebelum'}</span><b>${esc(o.deadline?fmtDate(o.deadline,o.lang,false):fmtDate(o.date,o.lang,false))}</b></p></div>
       <p class="silangkata-hint">${en?'Touch the grid to solve':'Sentuh grid untuk menjawab'}</p></div></div>
     ${SK_PENCIL(c,++skN)}</div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--pen',th.c.pen);
    $$('.sec',el).forEach((s,i)=>{s.classList.add('silangkata-sec');const h=$('h2',s);if(!h)return;const t=h.textContent.trim();
      let first=true;h.innerHTML=t.split(/\s+/).map(w=>`<span class="silangkata-w">${[...w].map(ch=>{const out=`<span class="silangkata-bx">${first?`<i>${i+1}</i>`:''}${esc(ch)}</span>`;first=false;return out}).join('')}</span>`).join('');h.classList.add('silangkata-h')})},
  themes:[
    {k:'kertas',n:'Kertas',desc:'Newsprint on a walnut desk, blue pen',c:{ground:'#3a322a',sheet:'#f2ecdf',ink:'#1c1a17',accent:'#a3222b',gold:'#b08a4a',pagefg:'#efe7d6',pen:'#1f3a8a',line:'rgba(28,26,23,.28)'}},
    {k:'biru',n:'Biru',desc:'Cool white paper, blue ink',c:{ground:'#d7dde5',sheet:'#f7f5ef',ink:'#1a2233',accent:'#2350a0',gold:'#9c7a3c',pagefg:'#1a2233',pen:'#2350a0',line:'rgba(26,34,51,.28)'}},
    {k:'merah',n:'Merah',desc:'Red pen on cream, maroon desk',c:{ground:'#5b1c1f',sheet:'#f6efe4',ink:'#221a18',accent:'#b0242c',gold:'#b8914c',pagefg:'#f6efe4',pen:'#b0242c',line:'rgba(34,26,24,.28)'}},
    {k:'hitam',n:'Hitam',desc:'Black ink, gold pencil, night desk',c:{ground:'#151515',sheet:'#efebe2',ink:'#161616',accent:'#161616',gold:'#c8a25a',pagefg:'#ece5d6',pen:'#161616',line:'rgba(22,22,22,.3)'}},
    {k:'hijau',n:'Hijau',desc:'Green ink on pale paper',c:{ground:'#d4dbcd',sheet:'#f6f4ea',ink:'#1e2a22',accent:'#2f6b4f',gold:'#a48748',pagefg:'#24302a',pen:'#2f6b4f',line:'rgba(30,42,34,.28)'}},
    {k:'jambu',n:'Jambu',desc:'Rose ink on blush paper',c:{ground:'#eed9d6',sheet:'#fdf8f3',ink:'#2f2226',accent:'#b65466',pen:'#8a2f4a',gold:'#b08a55',pagefg:'#4a3036',line:'rgba(47,34,38,.26)'}},
    {k:'sepia',n:'Sepia',desc:'Aged newsprint, brown ink',c:{ground:'#e3d7bf',sheet:'#efe3c9',ink:'#2e2214',accent:'#7a4a22',gold:'#8c6a34',pagefg:'#3a2a1a',pen:'#4a2c16',line:'rgba(46,34,20,.3)'}},
    {k:'nila',n:'Nila',desc:'Indigo pen on a midnight desk',c:{ground:'#16213a',sheet:'#f3efe6',ink:'#181d2a',accent:'#3b4f8f',gold:'#c4a25e',pagefg:'#e8e4da',pen:'#22336b',line:'rgba(24,29,42,.28)'}},
  ]});
