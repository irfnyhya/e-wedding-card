/* garis: a brush-pen drawing of a jasmine sprig on heavy cotton card, the type letterpressed into it.
   Cover: the card stands on the table in a paper belly band. Tap "Buka Jemputan" and the band slides off.
   Page: the card with its reply cards tucked under it. Skin: cotton cards with a pressed rule and a small sprig. */
// a tapered brush stroke along one cubic: thin at both ends, full in the middle, slightly heavier on the down-stroke
const gsB=(P,t)=>{const u=1-t;return [0,1].map(k=>u*u*u*P[0][k]+3*u*u*t*P[1][k]+3*u*t*t*P[2][k]+t*t*t*P[3][k])};
function gsStroke(P,w,n=30,lead=.75){const L=[],R=[];
  for(let i=0;i<=n;i++){const t=i/n,a=gsB(P,Math.max(0,t-.01)),b=gsB(P,Math.min(1,t+.01)),p=gsB(P,t);
    let dx=b[0]-a[0],dy=b[1]-a[1];const m=Math.hypot(dx,dy)||1;dx/=m;dy/=m;
    const hw=w*(.1+.9*Math.pow(Math.sin(Math.PI*Math.pow(t,lead)),.75));
    L.push([p[0]-dy*hw,p[1]+dx*hw]);R.push([p[0]+dy*hw,p[1]-dx*hw])}
  const f=q=>q[0].toFixed(2)+' '+q[1].toFixed(2);
  return 'M'+L.map(f).join('L')+'L'+R.reverse().map(f).join('L')+'Z'}
const gsDir=(deg,r)=>[Math.cos(deg*Math.PI/180)*r,Math.sin(deg*Math.PI/180)*r];
// a leaf: two strokes from base to tip and a short midrib; bend curls the whole leaf sideways
function gsLeaf(x,y,ang,len,wd,w,bend=0){const [dx,dy]=gsDir(ang,1),px=-dy,py=dx,pt=(a,s)=>[x+dx*len*a+px*(wd*s+bend*len*a*a),y+dy*len*a+py*(wd*s+bend*len*a*a)],tip=pt(1,0);
  return gsStroke([[x,y],pt(.25,1.1),pt(.7,.85),tip],w)+gsStroke([[x,y],pt(.3,-1),pt(.72,-.7),tip],w*.8)+gsStroke([[x,y],pt(.3,.05),pt(.55,0),pt(.74,0)],w*.42)}
// a jasmine flower: five rounded petals looping out from the centre, a dot of a throat
function gsFlower(x,y,r,rot,w){let d='';for(let i=0;i<5;i++){const a=rot+i*72+(i%2?5:-4),[dx,dy]=gsDir(a,1),px=-dy,py=dx,rr=r*(i%3?.9:1);
    const P=(f,s)=>[x+dx*rr*f+px*r*s,y+dy*rr*f+py*r*s];
    d+=gsStroke([P(.2,.04),P(.62,.62),P(1.12,.34),P(1.06,-.04)],w,22,.8)+gsStroke([P(1.06,-.04),P(1.02,-.42),P(.58,-.5),P(.2,-.05)],w*.75,22)}
  return d+`M${x+2.6} ${y}a2.6 2.6 0 1 0 -5.2 0a2.6 2.6 0 1 0 5.2 0Z`}
function gsBud(x,y,ang,len,w){const [dx,dy]=gsDir(ang,1),px=-dy,py=dx;
  return gsStroke([[x,y],[x+dx*len*.8+px*len*.45,y+dy*len*.8+py*len*.45],[x+dx*len*1.15,y+dy*len*1.15],[x+dx*len,y+dy*len]],w,20)+gsStroke([[x+dx*len,y+dy*len],[x+dx*len*.9-px*len*.42,y+dy*len*.9-py*len*.42],[x+dx*len*.2-px*len*.1,y+dy*len*.2-py*len*.1],[x,y]],w*.8,20)}
const GS_D=(()=>{let d='';
  d+=gsStroke([[76,248],[98,200],[82,128],[114,70]],2.3,44,.55);           // main stem
  d+=gsStroke([[88,164],[64,144],[50,116],[49,98]],1.5);                   // left branch
  d+=gsStroke([[94,130],[122,122],[146,110],[152,98]],1.4);                // right branch
  d+=gsStroke([[100,104],[84,92],[76,74],[78,56]],1.1);                     // bud stalk, left
  d+=gsStroke([[140,113],[156,116],[168,108],[172,96]],1);                 // bud stalk, right
  d+=gsLeaf(84,224,198,52,13,1.4,.12)+gsLeaf(90,202,-22,56,14,1.45,-.1)+gsLeaf(87,180,214,40,10,1.3,.15)
    +gsLeaf(62,142,172,30,8,1.15,-.12)+gsLeaf(98,114,-58,36,9,1.2,.12)+gsLeaf(124,121,64,30,8,1.1,-.15);
  d+=gsFlower(116,50,23,-84,1.3)+gsFlower(48,82,18,-58,1.2)+gsFlower(154,82,17,-100,1.15);
  d+=gsBud(78,56,-96,15,1.05)+gsBud(172,96,-62,13,1);
  return d})();
const gsDraw=(cls='')=>`<svg class="gs-art ${cls}" viewBox="22 18 162 234" aria-hidden="true"><path d="${GS_D}"/></svg>`;
const gsSprig=()=>`<svg class="gs-sprig" viewBox="22 18 162 234" aria-hidden="true"><path d="${GS_D}"/></svg>`;
FAMILY({key:'garis',name:'Garis Tunggal',meaning:'Brush-pen drawing',
  blurb:'A brush-pen jasmine sprig on heavy cotton card with letterpressed type, wrapped in a paper band that slides off when guests open it.',
  fonts:{d:"'Marcellus', serif",s:"'Cormorant Garamond', serif",b:"'Cormorant Garamond', serif"},ms:1300,
  page(o,th,L){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<section class="page pg-garis ${th.c.dark?'gs-dk':''}" style="--band:${th.c.band};--bandfg:${th.c.bandfg}"><div class="gs-table"></div>
      <div class="gs-suite">
        <div class="gs-card gs-main reveal"><div class="gs-in">${gsDraw()}
          <p class="gs-k kicker">${ev(o,L)}</p><p class="gs-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
          <p class="gs-date">${esc(fmtDate(o.date,o.lang))}</p>${o.venue?`<p class="gs-ven">${esc(o.venue)}</p>`:''}</div></div>
        <a class="gs-card gs-small gs-a reveal d2" data-go="when" href="#"><small>${en?'Event':'Butiran'}</small><b>${en?'Details':'Majlis'}</b></a>
        ${o.x_rsvp?`<a class="gs-card gs-small gs-b reveal d3" data-go="rsvp" href="#"><small>${en?'Kindly reply':'Sudi hadir?'}</small><b>RSVP</b></a>`:''}
      </div></section>`},
  cover(o,th,L,guest,tag,attr){const [n1,n2]=coverNames(o),en=o.lang==='en';
    return `<div class="cover cv-garis ${th.c.dark?'gs-dk':''}" style="--band:${th.c.band};--bandfg:${th.c.bandfg}"><div class="gs-table"></div>
      ${guest?`<p class="gs-to"><small>${L.dear}</small><b>${esc(guest)}</b></p>`:''}
      <div class="gs-card gs-cv${guest?'':' gs-noguest'}"><div class="gs-in">${gsDraw()}
        <p class="gs-k">${ev(o,L)}</p><p class="gs-names">${esc(n1)}<span>&amp;</span>${esc(n2)}</p>
        <p class="gs-date">${esc(fmtShort(o.date)).replace(/\./g,' · ')}</p></div>
        <${tag} class="gs-band" ${attr}><span>${en?'Open invitation':'Buka Jemputan'}</span></${tag}></div></div>`},
  skin(el,o,th,L){K.cards(el);el.classList.toggle('gs-dark',!!th.c.dark);const sc=$('.scroller',el);
    $$('.sheet > .sec h2',el).forEach(h=>{if(!h.querySelector('.gs-sprig'))h.insertAdjacentHTML('afterbegin',gsSprig())});
    $$('[data-go]',el).forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const s=$(`[data-s="${a.dataset.go}"]`,el);if(s&&sc)sc.scrollTo({top:s.offsetTop+s.offsetParent.offsetTop-10,behavior:'smooth'})}))},
  themes:[
    {k:'krim',n:'Krim',desc:'Sepia ink on cream cotton',c:{ground:'#e3dbcc',sheet:'#f8f3e9',ink:'#2b2622',accent:'#7a5c3c',gold:'#b8925a',pagefg:'#2b2622',band:'#c9b79a',bandfg:'#3b2f22'}},
    {k:'sage',n:'Sage',desc:'Forest ink on white cotton, sage band',c:{ground:'#d3d7c8',sheet:'#f7f6f0',ink:'#28332a',accent:'#4f6448',gold:'#a99060',pagefg:'#26302a',band:'#8e9f84',bandfg:'#f7f6f0'}},
    {k:'jambu',n:'Jambu',desc:'Plum ink on blush cotton',c:{ground:'#ead9d3',sheet:'#fcf6f3',ink:'#3b2a2d',accent:'#8e4c58',gold:'#c09a6a',pagefg:'#3b2a2d',band:'#d3a3a6',bandfg:'#3b2a2d'}},
    {k:'biru',n:'Biru',desc:'Navy ink on bright white',c:{ground:'#d5dce4',sheet:'#fbfbf9',ink:'#1f2a3a',accent:'#2f4a6c',gold:'#a3a8b4',pagefg:'#1f2a3a',band:'#2f4a6c',bandfg:'#f4f1ea'}},
    {k:'terakota',n:'Terakota',desc:'Rust ink on warm cotton',c:{ground:'#dcc3b0',sheet:'#faf2ea',ink:'#43271b',accent:'#9c4a2f',gold:'#b8864a',pagefg:'#3d2318',band:'#a85a3c',bandfg:'#faf2ea'}},
    {k:'hitam',n:'Hitam',desc:'Ivory ink and gold foil on black card',c:{ground:'#1b1a19',sheet:'#262422',ink:'#ece4d6',accent:'#d2b47e',gold:'#c9a978',pagefg:'#ece4d6',band:'#e8dfcf',bandfg:'#262422',dark:1}},
    {k:'hijau',n:'Hijau',desc:'Cream ink and gold foil on bottle green',c:{ground:'#0f1e18',sheet:'#1b3129',ink:'#efe7d6',accent:'#d6b97f',gold:'#d1b47a',pagefg:'#efe7d6',band:'#efe7d6',bandfg:'#1b3129',dark:1}},
    {k:'nila',n:'Nila',desc:'Pearl ink and gold foil on midnight',c:{ground:'#0e1626',sheet:'#18243b',ink:'#e8e2d4',accent:'#d0b884',gold:'#c7b07a',pagefg:'#e8e2d4',band:'#e8e2d4',bandfg:'#18243b',dark:1}},
  ]});
