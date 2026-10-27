/* tiket: a cloth-bound passport with a foil-stamped guilloche rosette, and a boarding pass tucked inside it.
   Cover: tap "Buka Jemputan" and the pass slides up out of the passport. Page: the full boarding pass, printed on security paper
   with guilloche bands, a perforated stub and a barcode; the passport lies under it. Skin: security-paper cards with a guilloche rule. */
needFont('Old+Standard+TT:ital,wght@0,400;0,700;1,400');
// guilloche rosette: overlapping hypotrochoids, drawn once per size and reused
const tkRoseCache={};
function tkRose(sw=.32){if(tkRoseCache[sw])return tkRoseCache[sw];let p='';
  const curve=(R,r,d,ph,N=720)=>{let s='';const k=(R-r)/r,T=Math.PI*2*r/gcd(R,r);for(let i=0;i<=N;i++){const t=i/N*T;
    const x=100+(R-r)*Math.cos(t+ph)+d*Math.cos(k*t+ph),y=100+(R-r)*Math.sin(t+ph)-d*Math.sin(k*t+ph);s+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)}return s};
  function gcd(a,b){return b?gcd(b,a%b):a}
  p+=`<path d="${curve(60,9,34,0)}"/><path d="${curve(60,9,34,Math.PI/24)}"/><path d="${curve(40,8,18,0,560)}" opacity=".8"/>`;
  return tkRoseCache[sw]=`<svg viewBox="0 0 200 200" class="tp-rose" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="${sw}">${p}<circle cx="100" cy="100" r="96" stroke-width="${sw*1.6}"/><circle cx="100" cy="100" r="93.5"/><circle cx="100" cy="100" r="14"/></g></svg>`}
// guilloche band: interlaced sine waves, used as a repeating security background
const tkBand=(col,op)=>K.uri(`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="44" viewBox="0 0 240 44"><g fill="none" stroke="${col}" stroke-width=".45" opacity="${op}">${
  Array.from({length:9},(_,j)=>{let s='';for(let x=0;x<=240;x+=3){const y=22+Math.sin(x/240*Math.PI*4+j*.7)*14*Math.cos(j*.35);s+=(x?'L':'M')+x+' '+y.toFixed(2)}return `<path d="${s}"/>`}).join('')}</g></svg>`);
// a barcode, from the names so it never changes for one couple
const tkBars=o=>{const r=rng([...coverNames(o).join('')].reduce((a,c)=>a+c.charCodeAt(0),7));let x=0,s='';while(x<196){const w=1+Math.floor(r()*3.2);if(r()>.38)s+=`<rect x="${x}" y="0" width="${w}" height="30"/>`;x+=w+1}
  return `<svg class="tp-bars" viewBox="0 0 200 30" preserveAspectRatio="none" aria-hidden="true"><g fill="currentColor">${s}</g></svg>`};
const tkCode=o=>{const [a,b]=K.initials(o);return (esc(a)+esc(b)).toUpperCase()};
const tkVars=c=>`--tpband:${tkBand(c.accent,.32)};--pp:${c.cover}`;
// the passport front, cloth with foil
let tkRoseUri='';
const tkPassport=(o,L,en,cls='')=>{const [n1,n2]=coverNames(o);if(!tkRoseUri)tkRoseUri=K.uri(tkRose(.55).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace(/currentColor/g,'#000'));
  return `<div class="tp-pp ${cls}" style="--rose:${tkRoseUri}"><div class="tp-ppin">
  <p class="tp-pp1">${en?'Passport':'Pasport'}</p><p class="tp-pp2">${en?'of love':'kasih sayang'}</p>
  <i class="tp-ppr"></i>
  <p class="tp-ppn">${esc(n1)} &amp; ${esc(n2)}</p></div></div>`};
FAMILY({key:'tiket',name:'Tiket',meaning:'Boarding pass',
  blurb:'A cloth passport with a foil guilloche rosette and a boarding pass tucked inside, printed on security paper. The pass slides out to open the card.',
  fonts:{d:"'IBM Plex Mono', monospace",s:"'Old Standard TT', serif",b:"'Old Standard TT', serif"},ms:1450,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    const f=(k,v,cls='')=>`<div class="${cls}"><span>${k}</span><b>${v}</b></div>`;
    return `<section class="page pg-tiket2" style="${tkVars(c)}"><div class="tp-table"></div>
      <div class="tp-underw">${tkPassport(o,L,en,'tp-under reveal')}</div>
      <div class="tp-passw"><div class="tp-pass reveal d1">
        <div class="tp-hd"><span>${en?'Boarding pass':'Pas menaiki'}</span><span>${tkCode(o)} ${esc(fmtShort(o.date).slice(0,5).replace('.',''))}</span></div>
        <div class="tp-body"><div class="tp-wm">${tkRose(.3)}</div>
          <p class="tp-k kicker">${ev(o,L)}</p>
          <h1 class="tp-names">${esc(n1)}<span>${en?'and':'dan'}</span>${esc(n2)}</h1>
          <div class="tp-fields">${f(en?'Date':'Tarikh',esc(fmtDate(o.date,o.lang)),'w')}${f(en?'Boarding':'Masa',esc(fmtTime(o.start,o.lang)))}${f(en?'Seat':'Tempat duduk',en?'Reserved':'Dikhaskan')}${o.venue?f(en?'Venue':'Tempat',esc(o.venue),'w'):''}</div>
        </div>
        <div class="tp-perf"></div>
        <div class="tp-stub">
          <a class="tp-go" data-go="when" href="#">${en?'Event details':'Butiran Majlis'}</a>${o.x_rsvp?`<a class="tp-go" data-go="rsvp" href="#">RSVP</a>`:''}
          ${tkBars(o)}</div>
      </div></div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en',c=th.c;
    return `<div class="cover cv-tiket2" style="${tkVars(c)}"><div class="tp-table"></div>
      ${guest?`<p class="tp-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
      <div class="tp-stage">
        <div class="tp-slip"><div class="tp-hd"><span>${en?'Boarding pass':'Pas menaiki'}</span><span>${tkCode(o)}</span></div>
          <div class="tp-slipb"><small>${ev(o,L)}</small><b>${esc(n1)} &amp; ${esc(n2)}</b><small>${esc(fmtShort(o.date)).replace(/\./g,' · ')}</small></div></div>
        ${tkPassport(o,L,en,'tp-front')}
      </div>
      <${tag} class="tp-open" ${attr}>${en?'Open invitation':'Buka Jemputan'}</${tag}></div>`},
  skin(el,o,th,L){K.cards(el);el.style.setProperty('--tpband',tkBand(th.c.accent,.32));const sc=$('.scroller',el);
    K.secs(el).forEach(s=>s.removeAttribute('data-gate'));
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    ['laut','Laut','Navy passport on a pale blue desk','#e6eaee','#1d2b4a','#1d2b4a'],
    ['merah','Merah','Burgundy passport on a linen desk','#ece4db','#7a1b29','#5e1622'],
    ['hutan','Hutan','Forest passport on a sage desk','#e4e8de','#2c5a43','#1f3a2c'],
    ['malam','Malam','Black passport on a night desk','#1f1e1c','#26262a','#141414',1],
    ['jambu','Jambu','Rose passport on a blush desk','#f3e7e3','#9b4a5e','#8a4c5a'],
    ['langit','Langit','Sky passport on a pale desk','#eaf0f4','#2f5a85','#4f7aa3'],
    ['terakota','Terakota','Clay passport on a sand desk','#f0e6dc','#a24f33','#8a3f28'],
    ['sage','Sage','Sage passport on a pale desk','#e9ebe2','#4f5d47','#5f6d55'],
    ['champagne','Champagne','Champagne passport on an ivory desk','#f2ece2','#6e542b','#7a6343'],
    ['ungu','Ungu','Plum passport on a lilac-grey desk','#ece6ea','#4a2541','#4a2541'],
    ['zamrud','Zamrud','Emerald passport on a dark green desk','#13261e','#0f3d2e','#0f3d2e',1],
    ['mauve','Mauve','Wine passport on a mauve desk','#efe5e5','#6e4a5a','#5a1a2a'],
    ['pic','Pic','Olive passport on a peach desk','#f8ece2','#a55a3b','#4f5d47'],
    ['kunyit','Kunyit','Navy passport on a turmeric desk','#f1e5c8','#a24a22','#1d2b4a'],
    ['lavender','Lavender','Slate passport on a lavender desk','#eeebf5','#5f53a0','#3f3d46'],
    ['karang','Karang','Teal passport on a coral desk','#f6e6dc','#0f6b6b','#0b4a4a'],
    ['pandan','Pandan','Pandan passport on a cream desk','#f1ecda','#0d4a32','#0d4a32'],
    ['kopi','Kopi','Coffee passport on a latte desk','#efe4d4','#6b4a3a','#3b2a22'],
    ['hujan','Hujan','Slate-blue passport on a rain-grey desk','#e8ecf0','#3a5570','#26394d'],
    ['fajar','Fajar','Plum passport on a dawn-pink desk','#f8e8e0','#a3465f','#4a2238'],
  ].map(([k,n,desc,ground,accent,cover,dark])=>({k,n,desc,c:{ground,accent,cover,sheet:'#fbf8f1',ink:'#26262a',gold:'#d2b06a',pagefg:dark?'#ece6da':'#2a2826',line:'rgba(40,40,45,.18)'}}))});
