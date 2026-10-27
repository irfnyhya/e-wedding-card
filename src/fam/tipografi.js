/* tipografi: an editorial poster set in one typeface (Bodoni Moda), printed on cotton stock with a light letterpress bite.
   Cover: the names set large, a single coloured ampersand, a hairline grid; tap "Buka Jemputan" and the sheet is lifted off the pad.
   Page: the date set large beside the names, venue in italic, two text links. Skin: one long printed page, numbered sections, hairlines only. */
const tyRoman=n=>{const m=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let s='';for(const [v,r] of m)while(n>=v){s+=r;n-=v}return s};
// split the engine's long date into day, month and year so the day can be set large
const tyDate=o=>{const f=fmtDate(o.date,o.lang),m=f.match(/(\d{1,2})\s+(\S+)\s+(\d{4})/),wd=f.split(',')[0];return m?{day:m[1],mon:m[2],yr:m[3],wd:wd===f?'':wd,full:f}:{day:'',mon:f,yr:'',wd:'',full:f}};
// names are set as large as their length allows
// estimated set width (in em) of a name in Bodoni italic: capitals are wide, spaces narrow
const tyEm=t=>[...String(t)].reduce((w,ch)=>w+(ch===' '?.26:/[MW]/.test(ch)?.95:/[A-Z]/.test(ch)?.7:/[mw]/.test(ch)?.78:/[ijlt.,']/.test(ch)?.3:.5),0);
// names are set as large as the measure allows: budget is the usable width in cqi, extra is em added to the second line
const tySize=(o,max,budget,extra=0)=>{const [a,b]=coverNames(o);return Math.max(8,Math.min(max,budget/Math.max(2.4,tyEm(a),tyEm(b)+extra))).toFixed(1)+'cqi'};
FAMILY({key:'tipografi',name:'Tipografi',meaning:'Editorial poster',
  blurb:'An editorial poster set in a single Bodoni: the names large, one coloured ampersand, hairline rules and generous white space. The sheet lifts off to open.',
  fonts:{d:"'Bodoni Moda', serif",s:"'Bodoni Moda', serif",b:"'Bodoni Moda', serif"},ms:1300,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',d=tyDate(o);
    return `<section class="page pg-tipografi2" style="--lp:${th.c.lp}"><div class="ty-paper"></div>
      <div class="ty-pg reveal">
        <div class="ty-bar"><span>${en?'Invitation':'Jemputan'}</span><span>${tyRoman(+d.yr||new Date(o.date).getFullYear()||2026)}</span></div>
        <p class="ty-k kicker">${ev(o,L)}</p>
        <h1 class="ty-pn" style="font-size:${tySize(o,17,74,1.5)}"><span>${esc(n1)}</span><span><i>&amp;</i>${esc(n2)}</span></h1>
        <div class="ty-big"><b>${esc(d.day)}</b><div><span>${esc(d.mon)} ${esc(d.yr)}</span>${d.wd?`<span>${esc(d.wd)}</span>`:''}${o.start?`<span>${esc(fmtTime(o.start,o.lang))}</span>`:''}</div></div>
        ${o.venue?`<p class="ty-ven">${esc(o.venue)}</p>`:''}
        <nav class="ty-links"><a data-go="when" href="#">${en?'Event details':'Butiran Majlis'}<i>→</i></a>${o.x_rsvp?`<a data-go="rsvp" href="#">RSVP<i>→</i></a>`:''}</nav>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',d=tyDate(o);
    return `<div class="cover cv-tipografi2" style="--lp:${th.c.lp}"><div class="ty-sheet"><div class="ty-paper"></div>
      <div class="ty-bar"><span>${ev(o,L)}</span><span>${tyRoman(+d.yr||2026)}</span></div>
      <div class="ty-names" style="font-size:${tySize(o,24,80)}"><span class="a">${esc(n1)}</span><span class="amp">&amp;</span><span class="b">${esc(n2)}</span></div>
      <div class="ty-meta"><div><small>${en?'Date':'Tarikh'}</small>${esc(d.day)} ${esc(d.mon)} ${esc(d.yr)}</div><div><small>${en?'Time':'Masa'}</small>${esc(fmtTime(o.start,o.lang))}</div>${o.venue?`<div class="w"><small>${en?'Venue':'Tempat'}</small>${esc(o.venue)}</div>`:''}</div>
      <div class="ty-foot">${guest?`<p class="ty-to"><small>${L.dear}</small>${esc(guest)}</p>`:''}<${tag} class="ty-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>
    </div></div>`},
  skin(el,o,th,L){const sc=$('.scroller',el);el.style.setProperty('--lp',th.c.lp);
    K.secs(el).forEach((s,i)=>s.dataset.no=String(i+1).padStart(2,'0'));
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    ['gading','Gading','Black ink on ivory cotton','#f3eee4','#1a1816','#1a1816'],
    ['batu','Batu','Ivory ink on stone grey','#5f5751','#f4efe6','#ead9bd',1],
    ['cili','Cili','Chilli-red ampersand on cream','#f6efe4','#1f1a17','#b3261e'],
    ['zaitun','Zaitun','Olive ink on putty','#e6e3d6','#262a1c','#5d6b3a'],
    ['kobalt','Kobalt','Cobalt ampersand on white','#f7f7f4','#16182a','#2341a8'],
    ['arang','Arang','Ivory ink on charcoal','#232220','#efe9df','#d9c7a6',1],
    ['terakota','Terakota','Terracotta ampersand on sand','#f5ece2','#2a201b','#b5593b'],
    ['sage','Sage','Sage ampersand on chalk','#f2f1ea','#262b22','#6c7b60'],
    ['biru-lembut','Biru Lembut','Dusty blue ampersand on white','#f6f7f8','#1e2632','#56708f'],
    ['marun','Marun','Maroon ampersand on blush','#f3e4e0','#2a1a1c','#6b1a2a'],
    ['champagne','Champagne','Cocoa ink on champagne','#d6c4a1','#2a2018','#6b4a3a'],
    ['zamrud','Zamrud','Gold ink on emerald','#0f3d2e','#eee9da','#d8b46a',1],
    ['mauve','Mauve','Mauve ampersand on pale rose','#f4ecec','#2a2024','#6e4a5a'],
    ['pic','Pic','Peach-brown ampersand on cream','#fcf4ed','#2a201b','#b4603f'],
    ['kunyit','Kunyit','Turmeric ampersand on cream','#f7f0e1','#2a201b','#a24a22'],
    ['lavender','Lavender','Violet ampersand on lilac white','#f6f4fa','#22202e','#6f62a8'],
    ['karang','Karang','Teal ampersand on coral white','#fcf5ef','#1d2626','#0f6b6b'],
    ['pandan','Pandan','Pandan ampersand on cream','#f6f1e2','#1d2620','#0d4a32'],
    ['kopi','Kopi','Coffee ampersand on latte','#f7efe4','#2a201b','#6b4a3a'],
    ['hujan','Hujan','Rain-blue ampersand on white','#f4f6f8','#1e2632','#3a5570'],
    ['fajar','Fajar','Rose ampersand on dawn pink','#fdf3ec','#2a1e22','#a3465f'],
  ].map(([k,n,desc,ground,ink,accent,dark])=>({k,n,desc,c:{ground,sheet:ground,ink,accent,gold:accent,pagefg:ink,cover:accent,line:dark?'rgba(255,255,255,.22)':'rgba(30,25,20,.2)',lp:dark?'rgba(0,0,0,.3)':'rgba(255,255,255,.55)'}}))});
