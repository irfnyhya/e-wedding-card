/* kalendar: a vintage Malaysian tear-off calendar (kalendar koyak) on a printed backing board hung from a nail.
   Each sheet: month band, big date, day in Malay and English, Hijri date in Rumi and Jawi, and a small month grid.
   Opening: the title sheet and the day before flip up over the binding, leaving the wedding date; then it fades.
   Page: the date sheet large, the date circled in ink and a pencilled note. Skin: calendar-tab headings on perforated cards. */
needFont('Oswald:wght@400;500;600');
let uid=0;
const MS=['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'];
const EN=['January','February','March','April','May','June','July','August','September','October','November','December'];
const DMS=['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],DEN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const HJ={muharram:'محرم',safar:'صفر',rabiulawal:'ربيع الأول',rabiulakhir:'ربيع الآخر',jamadilawal:'جمادى الأولى',jamadilakhir:'جمادى الآخرة',rejab:'رجب',syaaban:'شعبان',ramadan:'رمضان',syawal:'شوال',zulkaedah:'ذو القعدة',zulhijjah:'ذو الحجة'};
const AR=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const day=(o,off=0)=>{const d=new Date((o.date||'2026-12-19')+'T00:00:00');if(isNaN(d))return null;d.setDate(d.getDate()+off);return d};
// Hijri for the sheet: the given text for the day itself, one less on the day before
function hijri(o,off){const m=(o.hijri||'').match(/^(\d+)\s+([A-Za-z' ]+?)\s+(\d+)/);if(!m)return {r:o.hijri||'',j:''};
  const n=+m[1]+off;if(n<1)return {r:'',j:''};const key=m[2].toLowerCase().replace(/[^a-z]/g,''),ar=HJ[key]||'';
  return {r:`${n} ${m[2]} ${m[3]}H`,j:ar?`${AR(n)} ${ar} ${AR(m[3])}`:''}}
function miniMonth(d,mark){const y=d.getFullYear(),m=d.getMonth(),first=new Date(y,m,1).getDay(),n=new Date(y,m+1,0).getDate();
  let s='<span class="kl-mm">'+['A','I','S','R','K','J','S'].map((x,i)=>`<b${i===0?' class="su"':''}>${x}</b>`).join('');
  for(let i=0;i<first;i++)s+='<i></i>';for(let k=1;k<=n;k++){const wd=(first+k-1)%7;s+=`<i class="${wd===0?'su':''} ${k===mark?'on':''}">${k}</i>`}return s+'</span>'}
const doy=d=>Math.round((d-new Date(d.getFullYear(),0,1))/864e5)+1;
// one calendar sheet. kind: 'title' | 'day'
function sheet(o,L,off,kind,cls=''){const d=day(o,off),en=o.lang==='en';if(!d)return '';
  const mon=(en?EN:MS)[d.getMonth()],wd=d.getDay(),h=hijri(o,off),[n1,n2]=coverNames(o);
  const band=`<span class="kl-band"><span>${d.getFullYear()}</span><b>${mon}</b><span>${en?'Day':'Hari'} ${doy(d)}</span></span>`;
  if(kind==='title')return `<span class="kl-sheet kl-title ${cls}">${band}<span class="kl-perf"></span>
     <span class="kl-tk">${en?'Save the date':'Simpan tarikh'}</span><span class="kl-tn">${esc(n1)}<i>&amp;</i>${esc(n2)}</span>
     <span class="kl-orn"></span><span class="kl-tsub">${ev(o,L)}</span>${miniMonth(day(o,0),day(o,0).getDate())}</span>`;
  return `<span class="kl-sheet ${wd===0?'red':''} ${cls}">${band}<span class="kl-perf"></span>
     <span class="kl-big">${d.getDate()}</span>
     <span class="kl-day"><b>${DMS[wd]}</b><i>${DEN[wd]}</i></span>
     <span class="kl-hj"><span>${esc(h.r)}</span>${h.j?`<span class="kl-jw" lang="ar" dir="rtl">${h.j}</span>`:''}</span>
     ${miniMonth(d,d.getDate())}</span>`}
const NAIL=`<svg viewBox="0 0 120 60"><path d="M60 10L14 58M60 10L106 58" stroke="#3a2a1a" stroke-width="1" fill="none" opacity=".7"/><circle cx="60" cy="9" r="5" fill="#8d8a84"/><circle cx="58.6" cy="7.6" r="2" fill="#e8e6e0"/></svg>`;
const CORNER=K.uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" stroke="#000" stroke-width="1"><path d="M2 38V8a6 6 0 0 1 6-6h30"/><path d="M6 38V12a6 6 0 0 1 6-6h26" stroke-width=".6"/><path d="M12 12c6 0 9 3 9 8M12 12c0 6 3 9 8 9" stroke-width=".7"/><circle cx="12" cy="12" r="2" fill="#000"/><path d="M24 6c2 2 5 2 7 0M6 24c2 2 2 5 0 7" stroke-width=".6"/></svg>`);
FAMILY({key:'kalendar',name:'Kalendar',meaning:'Tear-off calendar',
  blurb:'A vintage tear-off calendar on a printed board; touch it and the sheets flip over to the wedding date.',
  fonts:{d:"'Oswald', 'Jost', sans-serif",s:"'Pinyon Script', cursive",b:"'Cormorant Garamond', serif"},ms:1600,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',d=day(o,0);
    const note=`${en?'Walimah':'Walimah'} ${esc(n1)} &amp; ${esc(n2)} — ${esc(fmtTime(o.start,o.lang))}, ${esc(o.venue)}`;
    return `<section class="page pg-kalendar" style="--board:${th.c.board};--bind:${th.c.bind}"><div class="kl-wall"></div>
     <p class="kl-pk reveal">${ev(o,L)}</p><h1 class="names reveal">${esc(n1)}<span class="amp">&amp;</span>${esc(n2)}</h1>
     <div class="kl-ppad reveal d1"><span class="kl-bind"><i></i><i></i></span>${sheet(o,L,0,'day','kl-psheet')}
      <svg class="kl-circle" viewBox="0 0 200 140" preserveAspectRatio="none"><path d="M40 30C70 6 150 8 170 40S160 128 96 130 18 104 22 66 64 18 118 16" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></svg>
      <span class="kl-note">${note}</span><span class="kl-stack"></span></div>
     </section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),c=th.c,en=o.lang==='en';
    return `<div class="cover cv-kalendar" style="--board:${c.board};--bind:${c.bind};--kl-cn:${CORNER}"><div class="kl-wall"></div><span class="kl-nail">${NAIL}</span>
     <div class="kl-board"><i class="kl-cn tl"></i><i class="kl-cn tr"></i><i class="kl-cn bl"></i><i class="kl-cn br"></i>
      <div class="kl-head kl-fade"><p class="kl-k">${ev(o,L)}</p><p class="kl-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p></div>
      <${tag} class="kl-pad" ${attr} aria-label="${L.open}"><span class="kl-stack"></span>
       ${sheet(o,L,0,'day','s3')}${sheet(o,L,-1,'day','s2')}${sheet(o,L,-2,'title','s1')}<span class="kl-bind"><i></i><i></i></span></${tag}>
      <div class="kl-foot kl-fade">${guest?`<p class="kl-to"><span>${L.dear}</span><b>${esc(guest)}</b></p>`:''}<p class="kl-hint">${en?'Open invitation':'Buka Jemputan'}</p></div></div></div>`},
  skin(el,o,th){K.cards(el);el.style.setProperty('--bind',th.c.bind);el.style.setProperty('--board',th.c.board);const d=day(o,0),en=o.lang==='en';
    $$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(h&&!h.dataset.kl){h.dataset.kl=1;h.insertAdjacentHTML('beforebegin',`<i class="kl-tab" aria-hidden="true"><b>${d?(en?EN:MS)[d.getMonth()].slice(0,3):''}</b><span>${String(i+1).padStart(2,'0')}</span></i>`)}
      s.insertAdjacentHTML('afterbegin','<span class="kl-sbind" aria-hidden="true"></span>')})},
  themes:[
    {k:'merah',n:'Merah',desc:'Classic red numerals on cream',c:{ground:'#2f4b4a',sheet:'#fbf6e9',ink:'#2a2622',accent:'#b3202a',gold:'#b08a3e',pagefg:'#f3ecdc',board:'#e8d9b8',bind:'#7a1a1f'}},
    {k:'hitam',n:'Hitam',desc:'Black numerals, kraft board',c:{ground:'#2b2826',sheet:'#f8f4ea',ink:'#1d1b19',accent:'#1d1b19',gold:'#a8823c',pagefg:'#efe8da',board:'#c9a77a',bind:'#1f1d1b'}},
    {k:'biru',n:'Biru',desc:'Navy numerals on a blue wall',c:{ground:'#3e5a78',sheet:'#fbf9f2',ink:'#1f2733',accent:'#1f3f75',gold:'#b39050',pagefg:'#f2f0e8',board:'#dfe3e4',bind:'#1f3f75'}},
    {k:'hijau',n:'Hijau',desc:'Bottle green and gold',c:{ground:'#e4dccb',sheet:'#fbf7ec',ink:'#23302a',accent:'#1f5a42',gold:'#a8823c',pagefg:'#23302a',board:'#cfdac8',bind:'#1f5a42'}},
    {k:'marun',n:'Marun',desc:'Maroon on a rose wall',c:{ground:'#e9d3cd',sheet:'#fdf7f0',ink:'#2e1d1f',accent:'#7c1c32',gold:'#a8794a',pagefg:'#2e1d1f',board:'#ead9c8',bind:'#5c1426'}},
    {k:'kunyit',n:'Kunyit',desc:'Turmeric board, ink-black',c:{ground:'#3a3328',sheet:'#fdf8eb',ink:'#27231c',accent:'#a3301f',gold:'#c79a32',pagefg:'#f3ead3',board:'#e2b347',bind:'#2b261f'}},
    {k:'senja',n:'Senja',desc:'Dusk violet and coral',c:{ground:'#4a3a5c',sheet:'#fdf8f2',ink:'#2c2430',accent:'#c0443a',gold:'#c79a62',pagefg:'#f5eef5',board:'#ead7cf',bind:'#4a3a5c'}},
    {k:'krim',n:'Krim',desc:'Sepia on ivory, linen wall',c:{ground:'#ede5d6',sheet:'#fffcf4',ink:'#3a2e22',accent:'#8a4b22',gold:'#a8823c',pagefg:'#3a2e22',board:'#e3d4b8',bind:'#6b3f1f'}},
  ]});
