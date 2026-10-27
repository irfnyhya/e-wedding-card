/* telegram (redesign): a vintage telegram kept like a museum piece.
   Cover: a buff window envelope on a linen desk cloth, the guest's name typed behind the glassine window,
   a rubber date stamp struck across the corner. Tap "Buka Jemputan": the envelope sinks away and the telegram rises out.
   Page: the telegram form itself, on aged cream paper in a fine engraved border, typed strips pasted on, stamped.
   Skin: cream form cards with an engraved double rule, spaced serif caps headings, typed labels. */
let tgN=0;
const tgDate=o=>{const d=new Date((o.date||'2026-01-01')+'T00:00:00'),M=(MONTHS[o.lang]||MONTHS.ms)[d.getMonth()]||'';
  return {d:String(d.getDate()).padStart(2,'0'),m:M.slice(0,3).toUpperCase(),y:String(d.getFullYear())}};
// a rubber date stamp: double ring, wording round the ring, the date across the middle; inked unevenly
function tgStamp(o,L,cls=''){const u=++tgN,{d,m,y}=tgDate(o),[n1,n2]=coverNames(o);
  const ring=`${String(ev(o,L)).replace(/<[^>]*>/g,'')} · ${n1} & ${n2} · `.toUpperCase();
  return `<svg class="tl-stamp ${cls}" viewBox="0 0 120 120" aria-hidden="true"><defs>
    <filter id="tls${u}" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="${u*7}" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="3" seed="${u*3}" result="m"/>
      <feColorMatrix in="m" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 2.15" result="ma"/>
      <feComposite in="d" in2="ma" operator="in"/></filter>
    <path id="tgr${u}" d="M60 60m-41 0a41 41 0 1 1 82 0a41 41 0 1 1 -82 0"/></defs>
    <g filter="url(#tls${u})" fill="currentColor" stroke="currentColor">
      <circle cx="60" cy="60" r="55" fill="none" stroke-width="2.2"/><circle cx="60" cy="60" r="50" fill="none" stroke-width=".9"/><circle cx="60" cy="60" r="32" fill="none" stroke-width=".9"/>
      <text font-family="'Old Standard TT',serif" font-size="9.4" letter-spacing="1.2" stroke="none"><textPath href="#tgr${u}" textLength="252" lengthAdjust="spacingAndGlyphs">${esc(ring)}</textPath></text>
      <path d="M30 51h60M30 69h60" stroke-width=".9"/>
      <text x="60" y="47" text-anchor="middle" font-family="'Special Elite',monospace" font-size="8" stroke="none" letter-spacing="1.5">${esc(y)}</text>
      <text x="60" y="65.5" text-anchor="middle" font-family="'Special Elite',monospace" font-size="15" stroke="none" letter-spacing=".5">${esc(d)} ${esc(m)}</text>
      <text x="60" y="81" text-anchor="middle" font-family="'Old Standard TT',serif" font-size="6.6" stroke="none" letter-spacing="1.6">${o.lang==='en'?'RECEIVED':'DITERIMA'}</text>
    </g></svg>`}
const tgTyped=s=>esc(String(s).toUpperCase());
const tgLines=o=>{const [n1,n2]=coverNames(o),en=o.lang==='en',t=o.start?fmtTime(o.start,o.lang):'';
  return en?[`${n1} and ${n2} to wed stop`,`${fmtDate(o.date,'en')} stop`,`${t?t+' at ':''}${o.venue||''} stop`,'please come stop bring your prayers stop']
    :[`${n1} dan ${n2} akan bernikah stop`,`${fmtDate(o.date,'ms')} stop`,`${t?t+' di ':''}${o.venue||''} stop`,'sila datang stop iringi dengan doa stop']};
FAMILY({key:'telegram',name:'Telegram',meaning:'Vintage telegram',
  blurb:'A buff window envelope with the guest’s name typed behind the glassine and a rubber date stamp; the telegram inside rises out, typed strips pasted on aged paper.',
  fonts:{d:"'Old Standard TT', serif",s:"'Old Standard TT', serif",b:"'Old Standard TT', serif"},ms:1400,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',lines=tgLines(o),words=lines.join(' ').split(/\s+/).length;
    const office=String(o.address||'').split(',').map(s=>s.trim()).filter(Boolean).slice(-2,-1)[0]||'Kuala Lumpur';
    return `<section class="page pg-telegram2" style="--env:${th.c.env};--stamp:${th.c.stamp}"><div class="tl-cloth"></div>
      <div class="tl-form reveal"><div class="tl-paper">
        <div class="tl-head"><span>${en?'Posts &amp; Telegraphs':'Pos &amp; Telegraf'}</span><b>Telegram</b><span>No. ${esc(fmtShort(o.date).split('.').slice(0,2).join(''))}</span></div>
        <div class="tl-boxes"><span><i>${en?'Office of origin':'Pejabat asal'}</i>${tgTyped(office)}</span><span><i>${en?'Words':'Perkataan'}</i>${words}</span><span><i>${en?'Time':'Masa'}</i>${tgTyped(fmtTime(o.start,o.lang)||'—')}</span></div>
        <p class="tl-to"><i>${en?'To':'Kepada'}</i>${tgTyped(o.__guest||(en?'Our honoured guest':'Tetamu yang dihormati'))}</p>
        <p class="tl-k kicker">${ev(o,L)}</p><h1 class="tl-names">${esc(n1)} <span>&amp;</span> ${esc(n2)}</h1>
        <div class="tl-strips">${lines.map((l,i)=>`<span class="tl-strip" style="--r:${[-.5,.4,-.25,.55][i%4]}deg">${tgTyped(l)}</span>`).join('')}</div>
        ${o.hijri?`<p class="tl-hj">${esc(o.hijri)}</p>`:''}
        ${tgStamp(o,L,'pg')}
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-telegram2" style="--env:${th.c.env};--stamp:${th.c.stamp}"><div class="tl-cloth"></div>
      <div class="tl-top"><p class="tl-k">${ev(o,L)}</p><p class="tl-cn">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><p class="tl-cd">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
      <div class="tl-stage">
        <div class="tl-inside"><div class="tl-paper"><div class="tl-head"><span>${en?'Posts &amp; Telegraphs':'Pos &amp; Telegraf'}</span><b>Telegram</b><span>No. ${esc(fmtShort(o.date).split('.').slice(0,2).join(''))}</span></div>
          <p class="tl-k">${ev(o,L)}</p><p class="tl-in-n">${esc(n1)} <span>&amp;</span> ${esc(n2)}</p><span class="tl-strip">${tgTyped(tgLines(o)[0])}</span></div></div>
        <div class="tl-env">
          <div class="tl-mast"><small>${en?'Posts &amp; Telegraphs':'Pos &amp; Telegraf'}</small><b>Telegram</b><i>${en?'Deliver at once':'Serahan segera'}</i></div>
          <div class="tl-win"><small>${en?'To':'Kepada'}</small><span>${tgTyped(guest||(en?'Our honoured guest':'Tetamu yang dihormati'))}</span></div>
          ${tgStamp(o,L,'cv')}
        </div>
      </div>
      <div class="tl-foot"><${tag} class="tl-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty("--env",th.c.env);el.style.setProperty("--stamp",th.c.stamp);const sc=$('.scroller',el);
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'gading',n:'Gading',desc:'Buff envelope on oatmeal linen, red ink',c:{ground:'#d8ccb4',sheet:'#f7f0e0',ink:'#2a2620',accent:'#7a1b29',gold:'#a8834a',pagefg:'#2a2620',env:'#eadcbc',stamp:'#7a1b29'}},
    {k:'nila',n:'Nila',desc:'Navy desk cloth, blue-black ink',c:{ground:'#1b2540',sheet:'#f6efdf',ink:'#1f2433',accent:'#22355f',gold:'#c4a35e',pagefg:'#ece4d2',env:'#e9ddc0',stamp:'#2b4a86'}},
    {k:'marun',n:'Marun',desc:'Maroon cloth, oxblood ink',c:{ground:'#3a1219',sheet:'#f7efe1',ink:'#2d1d1c',accent:'#7a1b29',gold:'#c9a25e',pagefg:'#f1e3d2',env:'#ecdcc0',stamp:'#8f1f2e'}},
    {k:'zamrud',n:'Zamrud',desc:'Bottle green cloth, green ink',c:{ground:'#132e27',sheet:'#f5efe0',ink:'#1f2a24',accent:'#1f4f3d',gold:'#c6a560',pagefg:'#e9e3d0',env:'#e7dcbf',stamp:'#7a1b29'}},
    {k:'jambu',n:'Merah Jambu',desc:'Blush linen, rose ink',c:{ground:'#e6d2cb',sheet:'#fbf3ea',ink:'#3a2a2a',accent:'#94394f',gold:'#b38d62',pagefg:'#3a2a2a',env:'#f1e2d2',stamp:'#94394f'}},
    {k:'sage',n:'Sage',desc:'Sage linen, red stamp',c:{ground:'#cdd2c0',sheet:'#f7f3e6',ink:'#2c3027',accent:'#3f5a3c',gold:'#a48d55',pagefg:'#2c3027',env:'#ece2c8',stamp:'#7a1b29'}},
    {k:'hitam',n:'Hitam',desc:'Black cloth, black ink, red stamp',c:{ground:'#171615',sheet:'#f4eddd',ink:'#1b1916',accent:'#1b1916',gold:'#c9a35e',pagefg:'#ece4d4',env:'#e6d9bc',stamp:'#9a2230'}},
    {k:'terakota',n:'Terakota',desc:'Rust cloth, sepia ink',c:{ground:'#5e2a1a',sheet:'#f7eee0',ink:'#33261f',accent:'#8e3f1f',gold:'#d4a46a',pagefg:'#f3e3d0',env:'#efdfc4',stamp:'#8e3f1f'}},
  ]});
