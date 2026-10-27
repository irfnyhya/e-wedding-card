/* bauhaus: a letterpress card in the manner of a 1920s Dessau print. Two inks and black on soft cotton stock:
   one large disc, one black bar, one small square, everything else is type on a strict grid.
   Cover: a folded card lying on the table; tap it and the front panel swings open on its fold.
   Page: the inside spread, the disc carried over, names in light lowercase Jost, a spec table set like a colophon.
   Skin: cotton-paper cards, each headed by a black bar, a small coloured square and a light lowercase title. */
needFont('Jost:ital,wght@0,300;0,400;0,500;1,300;1,400');
const pad=n=>String(n).padStart(2,'0');
const bhD=o=>{const d=new Date((o.date||'2026-01-01')+'T00:00:00');return isNaN(d)?{dd:'',mm:'',yy:''}:{dd:pad(d.getDate()),mm:pad(d.getMonth()+1),yy:String(d.getFullYear())}};
// names are set large: shrink long ones so each fits one line of the card
const bhFs=(n1,n2,max,k)=>Math.min(max,k/Math.max(5,(n1||'').length,(n2||'').length+2));
FAMILY({key:'bauhaus',name:'Bauhaus',meaning:'Modernist letterpress card',
  blurb:'A folded letterpress card in the 1920s Bauhaus manner: one disc, one black bar and the names set in light lowercase. The front swings open on its fold.',
  fonts:{d:"'Jost', sans-serif",s:"'Jost', sans-serif",b:"'Jost', sans-serif"},ms:1350,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',{dd,mm,yy}=bhD(o),fs=bhFs(n1,n2,21,108);
    return `<section class="page pg-bauhaus${th.c.dark?' bx-dk':''}" style="--c3:${th.c.c3}"><i class="bx-paper"></i>
      <i class="bx-disc bx-pdisc"></i><i class="bx-ring bx-pring"></i><i class="bx-bar bx-pbar"></i><i class="bx-sq bx-psq"></i>
      <div class="bx-pmain">
        <p class="bx-k kicker reveal">${ev(o,L)}</p>
        <h1 class="names bx-nm reveal d1" style="font-size:${fs}cqi">${esc(n1)}<span><em>&amp;</em> ${esc(n2)}</span></h1>
        ${o.hosts?`<p class="bx-host reveal d2"><span>${en?'Hosted by':'Anjuran'}</span>${esc(o.hosts)}</p>`:''}
        <div class="bx-spec reveal d2">
          <a data-go="when" href="#"><span>${en?'Date':'Tarikh'}</span><b>${esc(fmtDate(o.date,o.lang))}</b>${o.hijri?`<small>${esc(o.hijri)}</small>`:''}</a>
          <a data-go="sched" href="#"><span>${en?'Time':'Masa'}</span><b>${esc(fmtTime(o.start,o.lang))}${o.end?` – ${esc(fmtTime(o.end,o.lang))}`:''}</b></a>
          <a data-go="loc" href="#"><span>${en?'Venue':'Tempat'}</span><b>${esc(o.venue)}</b>${o.address?`<small>${esc(o.address)}</small>`:''}</a>
        </div>
        <nav class="bx-links reveal d3"><a data-go="when" href="#"><i></i>${en?'Details':'Butiran'}</a>${o.x_rsvp?`<a data-go="rsvp" href="#"><i></i>RSVP</a>`:''}<a data-go="loc" href="#"><i></i>${en?'Map':'Lokasi'}</a></nav>
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',{dd,mm,yy}=bhD(o),fs=bhFs(n1,n2,17,88);
    return `<div class="cover cv-bauhaus${th.c.dark?' bx-dk':''}" style="--c3:${th.c.c3}"><i class="bx-table"></i>
      ${guest?`<p class="bx-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
      <${tag} class="bx-stage" ${attr} aria-label="${L.open}">
        <span class="bx-card">
          <span class="bx-inside"><i class="bx-paper"></i><span class="bx-ik">${en?'with love':'dengan kasih'}</span></span>
          <span class="bx-front"><i class="bx-paper"></i>
            <i class="bx-ring"></i><i class="bx-disc"></i><i class="bx-bar"></i><i class="bx-sq"></i>
            <span class="bx-top"><span>${ev(o,L)}</span><span>${dd}·${mm}</span></span>
            <span class="bx-cn" style="font-size:${fs}cqi">${esc(n1)}<span><em>&amp;</em> ${esc(n2)}</span></span>
            <span class="bx-cd"><span>${esc(fmtDate(o.date,o.lang))}</span><span>${esc(o.venue)}</span></span>
            <span class="bx-col"><span>${en?'Printed invitation':'Kad jemputan'}</span><span>No. ${dd}/${mm}/${yy.slice(2)}</span></span>
          </span>
        </span>
        <span class="bx-btn">${en?'Open invitation':'Buka Jemputan'}</span>
      </${tag}></div>`},
  skin(el,o,th){K.cards(el);el.classList.toggle('bx-dk',!!th.c.dark);el.style.setProperty('--c3',th.c.c3);const sc=$('.scroller',el);
    $$('.sheet > .sec',el).forEach((s,i)=>{const h=$('h2',s);if(!h)return;h.insertAdjacentHTML('afterbegin',`<b class="bx-no">${pad(i+1)}</b>`)});
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=a.dataset.go;
      if(k==='loc'){$('[data-dock="loc"]',el)?.click();return}
      const s=$(`[data-s="${k}"]`,el)||$('[data-s="when"]',el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'klasik',n:'Klasik',desc:'Vermilion and black on cream, on a dark table',c:{ground:'#2b2925',sheet:'#efe8d9',ink:'#1b1a18',accent:'#c8402b',gold:'#1f4c8f',c3:'#e2a823',pagefg:'#efe8d9',line:'rgba(27,26,24,.8)'}},
    {k:'kertas',n:'Kertas',desc:'Cobalt and black on white cotton',c:{ground:'#d9d4ca',sheet:'#f4f1ea',ink:'#1a1a1a',accent:'#22509a',gold:'#c8402b',c3:'#e2a823',pagefg:'#1a1a1a',line:'rgba(26,26,26,.8)'}},
    {k:'terakota',n:'Terakota',desc:'Terracotta and teal on sand',c:{ground:'#3a2a21',sheet:'#ece2cf',ink:'#2a211c',accent:'#b9562f',gold:'#2d5c56',c3:'#d39b35',pagefg:'#ece2cf',line:'rgba(42,33,28,.8)'}},
    {k:'lumut',n:'Lumut',desc:'Olive and rust on linen',c:{ground:'#ded7c5',sheet:'#f2ecdd',ink:'#23261f',accent:'#5d6b34',gold:'#a8462f',c3:'#d9ac45',pagefg:'#23261f',line:'rgba(35,38,31,.8)'}},
    {k:'nila',n:'Nila',desc:'Cobalt and orange on cream, on navy',c:{ground:'#16213a',sheet:'#eee7d6',ink:'#16213a',accent:'#2a5fae',gold:'#e0582f',c3:'#eebf43',pagefg:'#eee7d6',line:'rgba(22,33,58,.8)'}},
    {k:'jambu',n:'Jambu',desc:'Rose and navy on blush',c:{ground:'#ead6ce',sheet:'#f8f1e8',ink:'#2a1f25',accent:'#c9566c',gold:'#2b4785',c3:'#e9a23a',pagefg:'#2a1f25',line:'rgba(42,31,37,.8)'}},
    {k:'hitam',n:'Hitam',desc:'Vermilion and ivory on black stock',c:{ground:'#0e0e0d',sheet:'#1e1d1b',ink:'#ece5d6',accent:'#d6492f',gold:'#e3b23a',c3:'#3f78cc',pagefg:'#ece5d6',line:'rgba(236,229,214,.6)',dark:'1'}},
    {k:'sage',n:'Sage',desc:'Coral and pine on pale sage',c:{ground:'#a3ad99',sheet:'#f1efe5',ink:'#1e2a24',accent:'#cf6a3c',gold:'#2f5a4c',c3:'#e2bb55',pagefg:'#16201b',line:'rgba(30,42,36,.8)'}},
  ]});
