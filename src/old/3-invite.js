<script>
/* ================= utilities ================= */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const NS='xmlns="http://www.w3.org/2000/svg"';
const svgUri=s=>`url("data:image/svg+xml,${encodeURIComponent(s)}")`;
function rng(seed){let s=seed>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
const ICON={
  cal:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  rsvp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg>',
  gift:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="9" width="16" height="11" rx="1"/><path d="M3 9h18M12 9v11M12 9S10.5 4 8 4.5 7 9 12 9zm0 0s1.5-5 4-4.5S17 9 12 9z"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>',
  music:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
  mute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l4 6M21 9l-4 6"/></svg>',
  wish:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5h16v11H8l-4 4z"/></svg>',
  env:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" style="width:15px;height:15px"><path d="M3 7l9 6 9-6M3 6h18v12H3z"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z"/></svg>'
};

/* ================= ornaments ================= */
function hibiscus(x,y,r,c1,c2,rot=0){
  let s=`<g transform="translate(${x} ${y}) rotate(${rot})">`;
  for(let i=0;i<5;i++) s+=`<path d="M0 0 C ${-r*.75} ${-r*.35} ${-r*.6} ${-r*1.05} 0 ${-r} C ${r*.6} ${-r*1.05} ${r*.75} ${-r*.35} 0 0Z" fill="${c1}" transform="rotate(${i*72})" opacity=".95"/>`;
  for(let i=0;i<5;i++) s+=`<path d="M0 0 L ${-r*.08} ${-r*.5} L ${r*.08} ${-r*.5}Z" fill="${c2}" opacity=".5" transform="rotate(${i*72})"/>`;
  s+=`<circle r="${r*.2}" fill="${c2}"/><path d="M0 0 Q ${r*.25} ${-r*.5} ${r*.2} ${-r*.95}" stroke="#e9c46a" stroke-width="${Math.max(1.4,r*.05)}" fill="none"/>`;
  for(let i=0;i<5;i++) s+=`<circle cx="${r*.2+Math.cos(i)*r*.08}" cy="${-r*.95+Math.sin(i*2)*r*.08}" r="${r*.035+1}" fill="#f3d27a"/>`;
  return s+'</g>';
}
function blossom(x,y,r,c1,c2){
  let s=`<g transform="translate(${x} ${y})">`;
  for(let i=0;i<6;i++) s+=`<ellipse cy="${-r*.55}" rx="${r*.38}" ry="${r*.58}" fill="${c1}" transform="rotate(${i*60})"/>`;
  return s+`<circle r="${r*.25}" fill="${c2}"/></g>`;
}
const leaf=(x,y,len,ang,c,w=.34)=>`<path d="M0 0 Q${len/2} ${-len*w} ${len} 0 Q${len/2} ${len*w} 0 0Z" fill="${c}" transform="translate(${x} ${y}) rotate(${ang})"/>`;
function floralCorner(p){
  return `<svg ${NS} viewBox="0 0 240 200">`+
    leaf(4,70,96,-24,p.g1)+leaf(24,18,92,8,p.g2)+leaf(96,6,74,30,p.g1)+leaf(0,128,74,-58,p.g2)+leaf(150,0,64,12,p.g2)+leaf(40,150,50,-80,p.g1)+
    hibiscus(66,58,50,p.c1,p.c2,-12)+blossom(146,44,22,p.c3,p.c2)+blossom(28,132,20,p.c3,p.c2)+blossom(186,14,12,p.c1,p.c2)+blossom(110,96,10,p.c3,p.c2)+
    `<circle cx="200" cy="40" r="3" fill="${p.c1}"/><circle cx="12" cy="176" r="3" fill="${p.c1}"/></svg>`;
}
function eucalyptus(p){
  const pts=[],P0=[0,0],P1=[150,30],P2=[210,215];
  const q=(t)=>[(1-t)**2*P0[0]+2*(1-t)*t*P1[0]+t*t*P2[0],(1-t)**2*P0[1]+2*(1-t)*t*P1[1]+t*t*P2[1]];
  let s=`<svg ${NS} viewBox="0 0 240 220"><path d="M0 0 Q150 30 210 215" stroke="${p.stem}" stroke-width="2" fill="none"/>`;
  let i=0;for(let t=.06;t<.97;t+=.085,i++){const [x,y]=q(t);const off=i%2?17:-17;const r=15-t*6;
    s+=`<ellipse cx="${x+off*.6}" cy="${y-off*.5}" rx="${r}" ry="${r*.85}" fill="${i%3?p.g1:p.g2}" opacity=".93"/>`;}
  s+=`<path d="M30 6 Q80 80 70 150" stroke="${p.stem}" stroke-width="1.5" fill="none"/>`;
  for(let t=.15;t<1;t+=.17){const y=6+t*144,x=30+Math.sin(t*3)*40;s+=leaf(x,y,30,(t*200)%2?-30:200,p.g2,.28)}
  return s+'</svg>';
}
function songketBand(c,flip){
  let s=`<svg ${NS} viewBox="0 0 360 84" ${flip?'style="transform:scaleY(-1)"':''}><rect width="360" height="16" fill="${c}" opacity=".18"/><path d="M0 18H360M0 22H360" stroke="${c}" stroke-width="1"/>`;
  for(let x=12;x<360;x+=24){s+=`<path d="M${x} 24 L${x+10} 34 L${x} 44 L${x-10} 34Z" fill="none" stroke="${c}" stroke-width="1.2"/><path d="M${x} 30 L${x+4} 34 L${x} 38 L${x-4} 34Z" fill="${c}"/>`;}
  s+=`<path d="M0 47H360" stroke="${c}" stroke-width="1"/>`;
  for(let x=0;x<360;x+=24){s+=`<path d="M${x} 49 L${x+24} 49 L${x+12} 82Z" fill="none" stroke="${c}" stroke-width="1.1"/><path d="M${x+6} 49 L${x+18} 49 L${x+12} 68Z" fill="${c}" opacity=".55"/>`;}
  return s+'</svg>';
}
function starsTop(c){
  const r=rng(7);let s=`<svg ${NS} viewBox="0 0 360 230"><defs><mask id="moonm"><rect width="360" height="230" fill="#fff"/><circle cx="306" cy="58" r="30" fill="#000"/></mask></defs><circle cx="290" cy="70" r="34" fill="${c}" mask="url(#moonm)"/>`;
  for(let i=0;i<22;i++){const x=r()*360,y=r()*200,k=1.5+r()*4.5;s+=`<path d="M${x} ${y-k}L${x+k*.3} ${y-k*.3}L${x+k} ${y}L${x+k*.3} ${y+k*.3}L${x} ${y+k}L${x-k*.3} ${y+k*.3}L${x-k} ${y}L${x-k*.3} ${y-k*.3}Z" fill="${c}" opacity="${.4+r()*.6}"/>`}
  return s+'</svg>';
}
function archFrame(c){
  return `<svg ${NS} viewBox="0 0 360 640" preserveAspectRatio="none" style="width:100%;height:100%"><path d="M28 640 V250 C28 130 110 76 180 34 C250 76 332 130 332 250 V640" fill="none" stroke="${c}" stroke-width="1.4" vector-effect="non-scaling-stroke"/><path d="M40 640 V256 C40 142 118 92 180 52 C242 92 320 142 320 256 V640" fill="none" stroke="${c}" stroke-width=".8" opacity=".6" vector-effect="non-scaling-stroke"/></svg>`;
}
function tileBand(p,flip){
  let s=`<svg ${NS} viewBox="0 0 360 52" ${flip?'style="transform:scaleY(-1)"':''}><rect width="360" height="44" fill="${p.paper}"/>`;
  for(let x=0;x<360;x+=44){const cx=x+22,cy=22;
    s+=`<rect x="${x+1}" y="1" width="42" height="42" fill="none" stroke="${p.t}" stroke-width="1"/>`;
    s+=`<path d="M${x+1} 1h10a10 10 0 0 1-10 10zM${x+43} 1h-10a10 10 0 0 0 10 10zM${x+1} 43h10a10 10 0 0 0-10-10zM${x+43} 43h-10a10 10 0 0 1 10-10z" fill="${p.p}"/>`;
    [[0,-8],[8,0],[0,8],[-8,0]].forEach(([dx,dy])=>s+=`<circle cx="${cx+dx}" cy="${cy+dy}" r="7" fill="${p.t}" opacity=".85"/>`);
    s+=`<circle cx="${cx}" cy="${cy}" r="5" fill="${p.p}"/><circle cx="${cx}" cy="${cy}" r="2" fill="${p.y}"/>`;}
  return s+`<path d="M0 47H360" stroke="${p.t}" stroke-width="2"/><path d="M0 51H360" stroke="${p.p}" stroke-width="1"/></svg>`;
}
function kraftTop(c){
  let s=`<svg ${NS} viewBox="0 0 360 110"><path d="M-10 18 Q180 70 370 18" stroke="${c}" stroke-width="2" fill="none" stroke-dasharray="7 3"/>`;
  [[70,34],[180,44],[290,34]].forEach(([x,y],i)=>{s+=`<path d="M${x} ${y} V${y+22}" stroke="${c}" stroke-width="1"/><path d="M${x} ${y+42} C${x-16} ${y+30} ${x-12} ${y+18} ${x} ${y+26} C${x+12} ${y+18} ${x+16} ${y+30} ${x} ${y+42}Z" fill="${i==1?'#a3472f':c}" opacity=".85"/>`});
  return s+'</svg>';
}
function babysBreath(c,stem){
  const r=rng(11);let s=`<svg ${NS} viewBox="0 0 360 120">`;
  for(let k=0;k<2;k++){const bx=k?330:30;for(let i=0;i<6;i++){const ex=bx+(r()-.5)*90,ey=20+r()*60;s+=`<path d="M${bx} 120 Q${(bx+ex)/2} ${ey+40} ${ex} ${ey}" stroke="${stem}" stroke-width="1" fill="none"/>`;for(let j=0;j<5;j++)s+=`<circle cx="${ex+(r()-.5)*14}" cy="${ey+(r()-.5)*14}" r="${1.5+r()*2}" fill="${c}"/>`}}
  return s+'</svg>';
}
function lavenderSprigs(p){
  const r=rng(5);let s=`<svg ${NS} viewBox="0 0 360 200">`;
  const sprig=(x0,ang)=>{let o='';for(let k=0;k<3;k++){const a=(ang+(k-1)*12)*Math.PI/180,len=150+k*14,ex=x0+Math.sin(a)*len,ey=200-Math.cos(a)*len;
    o+=`<path d="M${x0} 200 L${ex} ${ey}" stroke="${p.stem}" stroke-width="1.4"/>`;
    for(let t=.45;t<1;t+=.055){const x=x0+Math.sin(a)*len*t,y=200-Math.cos(a)*len*t,side=(t*100|0)%2?1:-1;o+=`<ellipse cx="${x+side*4}" cy="${y}" rx="3.2" ry="5.5" fill="${r()>.5?p.c1:p.c2}" transform="rotate(${side*25} ${x+side*4} ${y})"/>`}}return o};
  s+=sprig(20,22)+sprig(340,-22);return s+'</svg>';
}
function decoFan(c,flip){
  let s=`<svg ${NS} viewBox="0 0 360 150" ${flip?'style="transform:scaleY(-1)"':''}>`;
  [36,54,72].forEach(r=>s+=`<path d="M${180-r} 0 A${r} ${r} 0 0 0 ${180+r} 0" fill="none" stroke="${c}" stroke-width="1.2"/>`);
  for(let a=12;a<=168;a+=12){const rad=a*Math.PI/180,r1=82,r2=a%24?118:138;s+=`<path d="M${180+Math.cos(rad)*r1} ${Math.sin(rad)*r1} L${180+Math.cos(rad)*r2} ${Math.sin(rad)*r2}" stroke="${c}" stroke-width="1"/>`}
  s+=`<path d="M0 8H96M264 8H360M0 14H80M280 14H360M0 20H64M296 20H360" stroke="${c}" stroke-width="1"/><path d="M180 92 l6 6 -6 6 -6 -6z" fill="${c}"/>`;
  return s+'</svg>';
}
function divider(c){return `<svg ${NS} viewBox="0 0 160 14" style="width:140px;height:auto"><path d="M0 7H66M94 7H160" stroke="${c}" stroke-width="1"/><path d="M80 1l6 6-6 6-6-6z" fill="${c}"/><circle cx="70" cy="7" r="1.6" fill="${c}"/><circle cx="90" cy="7" r="1.6" fill="${c}"/></svg>`}

/* ================= designs ================= */
const lattice=c=>svgUri(`<svg ${NS} width="24" height="24"><path d="M12 0L24 12 12 24 0 12z" fill="none" stroke="${c}" stroke-opacity=".14"/></svg>`);
const star8=c=>svgUri(`<svg ${NS} width="56" height="56"><g fill="none" stroke="${c}" stroke-opacity=".16"><rect x="16" y="16" width="24" height="24"/><rect x="16" y="16" width="24" height="24" transform="rotate(45 28 28)"/><circle cx="28" cy="28" r="5"/><path d="M0 0L8 8M56 0L48 8M0 56L8 48M56 56L48 48"/></g></svg>`);
const noise=svgUri(`<svg ${NS} width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .2  0 0 0 0 .1  0 0 0 .22 0"/></filter><rect width="220" height="220" filter="url(#n)"/></svg>`);

const THEMES=[
 {id:'songket',name:'Songket Diraja',cat:'tradisional',desc:'Maroon and gold, with the pucuk rebung motif',fx:'gold',
  v:{bg:'#5a1020',ink:'#f6e7c8',names:'#f3d38a',accent:'#d9b25f',line:'rgba(217,178,95,.28)',card:'rgba(0,0,0,.16)',btn:'#d9b25f',btnInk:'#3d0a15',dock:'#4a0c1a'},
  f:{display:"'Cinzel', serif",script:"'Great Vibes', cursive",body:"'Cormorant Garamond', serif"},pattern:lattice('#d9b25f'),
  orn:t=>({top:songketBand(t.accent),bot:songketBand(t.accent,1)})},
 {id:'bungaraya',name:'Taman Bunga Raya',cat:'floral',desc:'Hibiscus and blossoms on blush paper',fx:'petals',
  v:{bg:'#fff6f2',ink:'#4a2e2e',names:'#8e3b46',accent:'#c0646f',line:'rgba(192,100,111,.22)',card:'#ffffff',btn:'#c0646f',btnInk:'#fff'},
  f:{display:"'Cormorant Garamond', serif",script:"'Great Vibes', cursive",body:"'Cormorant Garamond', serif"},
  orn:()=>({tl:floralCorner({g1:'#8fae8b',g2:'#b7cdb0',c1:'#e8798a',c2:'#b6455a',c3:'#f6c1bd'}),br:floralCorner({g1:'#8fae8b',g2:'#b7cdb0',c1:'#e8798a',c2:'#b6455a',c3:'#f6c1bd'})})},
 {id:'moden',name:'Garis Moden',cat:'moden',desc:'Black ink, white space, fine lines',fx:'none',
  v:{bg:'#fbfbfa',ink:'#161616',names:'#161616',accent:'#161616',line:'#e1e1de',card:'#ffffff',btn:'#161616',btnInk:'#fff',radius:'0px',cardRadius:'0px'},
  f:{display:"'Jost', sans-serif",script:"'Italiana', serif",body:"'Jost', sans-serif"},
  orn:()=>({frame:true})},
 {id:'sage',name:'Daun Sage',cat:'floral',desc:'Eucalyptus branches in soft sage',fx:'leaves',
  v:{bg:'#f2f4ee',ink:'#2f3b30',names:'#3e5a3f',accent:'#6f8a68',line:'rgba(111,138,104,.28)',card:'#ffffff',btn:'#6f8a68',btnInk:'#fff'},
  f:{display:"'Lora', serif",script:"'Parisienne', cursive",body:"'Lora', serif"},
  orn:()=>({tl:eucalyptus({g1:'#8ea886',g2:'#b5c7ad',stem:'#6f8a68'}),br:eucalyptus({g1:'#8ea886',g2:'#b5c7ad',stem:'#6f8a68'})})},
 {id:'malam',name:'Malam Berbintang',cat:'mewah',desc:'Crescent moon over a midnight sky',fx:'stars',
  v:{bg:'linear-gradient(180deg,#0e1838 0%,#1c2b5a 60%,#2a3870 100%)',ink:'#e9e6f5',names:'#f2dc9b',accent:'#e7c77a',line:'rgba(231,199,122,.24)',card:'rgba(255,255,255,.06)',btn:'#e7c77a',btnInk:'#14204a',dock:'#121e44'},
  f:{display:"'Marcellus', serif",script:"'Pinyon Script', cursive",body:"'Marcellus', serif"},
  orn:t=>({top:starsTop(t.accent)})},
 {id:'zamrud',name:'Zamrud Islamik',cat:'islamik',desc:'Emerald arch with eight-point stars',fx:'gold',
  v:{bg:'#0e4a3c',ink:'#f1ead7',names:'#f1ead7',accent:'#d6b56b',line:'rgba(214,181,107,.26)',card:'rgba(0,0,0,.14)',btn:'#d6b56b',btnInk:'#0b3329',dock:'#0b3d31'},
  f:{display:"'Cinzel', serif",script:"'Amiri', serif",body:"'Amiri', serif"},pattern:star8('#d6b56b'),
  orn:t=>({arch:archFrame(t.accent)})},
 {id:'nyonya',name:'Jubin Nyonya',cat:'tradisional',desc:'Peranakan tiles in teal and rose',fx:'none',
  v:{bg:'#fdf8ef',ink:'#233a4a',names:'#b23a62',accent:'#2a8586',line:'rgba(42,133,134,.25)',card:'#ffffff',btn:'#b23a62',btnInk:'#fff'},
  f:{display:"'DM Serif Display', serif",script:"'DM Serif Display', serif",body:"'Lora', serif"},
  orn:()=>({top:tileBand({paper:'#fdf8ef',t:'#2a8586',p:'#d6668b',y:'#e9b949'}),bot:tileBand({paper:'#fdf8ef',t:'#2a8586',p:'#d6668b',y:'#e9b949'},1)})},
 {id:'kraft',name:'Kertas Kraft',cat:'moden',desc:'Kraft paper, twine and baby’s breath',fx:'none',
  v:{bg:'#c9a67b',ink:'#3a2817',names:'#3a2817',accent:'#6b3f1d',line:'rgba(58,40,23,.22)',card:'rgba(255,250,240,.42)',btn:'#6b3f1d',btnInk:'#f8efe0',dock:'#c09c70'},
  f:{display:"'Libre Baskerville', serif",script:"'Tangerine', cursive",body:"'Libre Baskerville', serif"},pattern:noise,
  orn:t=>({top:kraftTop(t.accent),bot:babysBreath('#fbf6ec','#7c6146')})},
 {id:'lavender',name:'Lavender Senja',cat:'floral',desc:'Lilac dusk with lavender sprigs',fx:'lavender',
  v:{bg:'linear-gradient(180deg,#f6f1fb 0%,#e8def5 100%)',ink:'#3d3150',names:'#5e4588',accent:'#8a6bb8',line:'rgba(138,107,184,.25)',card:'rgba(255,255,255,.7)',btn:'#8a6bb8',btnInk:'#fff',dock:'#efe8f8'},
  f:{display:"'Cormorant Garamond', serif",script:"'Tangerine', cursive",body:"'Cormorant Garamond', serif"},
  orn:()=>({bot:lavenderSprigs({stem:'#7d8f6a',c1:'#9b7fd1',c2:'#b9a2e3'})})},
 {id:'noir',name:'Emas Noir',cat:'mewah',desc:'Art deco gold on black',fx:'gold',
  v:{bg:'#0d0d0d',ink:'#efe6cf',names:'#e3c27a',accent:'#c9a24a',line:'rgba(201,162,74,.28)',card:'rgba(255,255,255,.04)',btn:'#c9a24a',btnInk:'#0d0d0d',radius:'2px',cardRadius:'2px'},
  f:{display:"'Cinzel', serif",script:"'Italiana', serif",body:"'Cormorant Garamond', serif"},
  orn:t=>({top:decoFan(t.accent),bot:decoFan(t.accent,1)})},
];
const THEME=Object.fromEntries(THEMES.map(t=>[t.id,t]));
const CATS=[['all','All'],['tradisional','Traditional'],['floral','Floral'],['islamik','Islamic'],['moden','Modern'],['mewah','Luxe']];
const swatchBg=t=>t.v.bg.startsWith('linear')?t.v.bg:`linear-gradient(160deg, ${t.v.bg} 55%, ${t.v.accent} 160%)`;

/* ================= copy ================= */
const DAYS={ms:['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],en:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']};
const MONTHS={ms:['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'],en:['January','February','March','April','May','June','July','August','September','October','November','December']};
const T={
 ms:{ev:{walimah:'Walimatul Urus',kahwin:'Majlis Perkahwinan',bertandang:'Majlis Bertandang',resepsi:'Majlis Resepsi'},open:'Buka Jemputan',to:'Kepada',
  salam:'Assalamualaikum W.B.T. & Salam Sejahtera',
  intro:(h,side)=>side==='couple'?`Dengan penuh kesyukuran ke hadrat Ilahi, kami dengan segala hormatnya menjemput Dato' | Datin | Tuan | Puan | Encik | Cik serta seisi keluarga ke majlis perkahwinan kami`:`Dengan penuh kesyukuran ke hadrat Ilahi, kami<br><b class="person" style="display:block;margin:10px 0;font-size:17px">${h}</b>dengan segala hormatnya menjemput Dato' | Datin | Tuan | Puan | Encik | Cik serta seisi keluarga ke majlis perkahwinan ${side==='bride'?'puteri':'putera'} kesayangan kami`,
  with:'dengan pasangannya',when:'Tarikh & Masa',date:'Tarikh',time:'Masa',venue:'Tempat',loc:'Lokasi',dress:'Kod pakaian',count:'Menghitung Hari',units:['Hari','Jam','Minit','Saat'],done:'Majlis telah berlangsung. Terima kasih atas doa anda.',
  sched:'Aturcara Majlis',gallery:'Galeri',doaT:'Doa',doa:'Ya Allah, berkatilah majlis ini. Kurniakanlah kebahagiaan dan rahmat-Mu kepada kedua mempelai, satukanlah hati mereka dalam kasih sayang, dan jadikanlah mereka pasangan yang sakinah, mawaddah wa rahmah.',
  rsvp:'Kehadiran',rsvpSub:d=>`Mohon sahkan kehadiran anda sebelum ${d}.`,name:'Nama',phone:'No. telefon',yes:'Hadir',no:'Tidak hadir',pax:'Bilangan orang',send:'Hantar',
  thanks:n=>`Terima kasih, ${n}. Maklum balas anda telah direkodkan.`,closed:'Tempoh RSVP telah tamat.',
  wishes:'Ucapan',wishPh:'Tulis ucapan dan doa anda',sendWish:'Hantar ucapan',noWish:'Jadilah yang pertama menghantar ucapan.',
  gift:'Salam Kaut',giftSub:'Kehadiran dan doa anda adalah hadiah yang paling bermakna. Bagi yang ingin menghulurkan sumbangan:',copy:'Salin',copied:'Disalin',
  contact:'Hubungi',dock:['Kalendar','Lokasi','RSVP','Hadiah','Hubungi'],addCal:'Simpan ke Google Calendar',maps:'Google Maps',waze:'Waze',
  previewNote:'Pratonton sahaja. RSVP akan direkodkan apabila kad diterbitkan.',made:'Kad digital oleh Sanding',
  ampm:(h)=>h<12?'pagi':h<14?'tengah hari':h<19?'petang':'malam'},
 en:{ev:{walimah:'The Wedding of',kahwin:'The Wedding of',bertandang:'Wedding Reception',resepsi:'Wedding Reception'},open:'Open Invitation',to:'Dear',
  salam:'Assalamualaikum & warm greetings',
  intro:(h,side)=>side==='couple'?`With gratitude to the Almighty, we warmly invite you and your family to celebrate our wedding`:`With gratitude to the Almighty,<br><b class="person" style="display:block;margin:10px 0;font-size:17px">${h}</b>request the pleasure of your company at the wedding of their beloved ${side==='bride'?'daughter':'son'}`,
  with:'with',when:'Date & Time',date:'Date',time:'Time',venue:'Venue',loc:'Location',dress:'Dress code',count:'Counting Down',units:['Days','Hours','Mins','Secs'],done:'The celebration has taken place. Thank you for your prayers.',
  sched:'Programme',gallery:'Gallery',doaT:'A Prayer',doa:'May Allah bless this union, fill their home with love and mercy, and make them a family of sakinah, mawaddah and rahmah.',
  rsvp:'RSVP',rsvpSub:d=>`Kindly reply by ${d}.`,name:'Name',phone:'Phone',yes:'Attending',no:'Can’t attend',pax:'Number of guests',send:'Send reply',
  thanks:n=>`Thank you, ${n}. Your reply has been saved.`,closed:'RSVP is now closed.',
  wishes:'Wishes',wishPh:'Write your wishes for the couple',sendWish:'Send wish',noWish:'Be the first to send a wish.',
  gift:'Money Gift',giftSub:'Your presence and prayers are the greatest gift. If you would like to send a gift:',copy:'Copy',copied:'Copied',
  contact:'Contact',dock:['Calendar','Location','RSVP','Gift','Contact'],addCal:'Save to Google Calendar',maps:'Google Maps',waze:'Waze',
  previewNote:'Preview only. Replies are saved once the card is published.',made:'Digital card by Sanding',ampm:()=>''}
};
function fmtDate(iso,lang,withDay=true){if(!iso)return'';const d=new Date(iso+'T00:00:00');if(isNaN(d))return'';return (withDay?DAYS[lang][d.getDay()]+', ':'')+`${d.getDate()} ${MONTHS[lang][d.getMonth()]} ${d.getFullYear()}`}
function fmtShort(iso){if(!iso)return'';const [y,m,d]=iso.split('-');return `${d}.${m}.${y}`}
function fmtTime(t,lang){if(!t)return'';let [h,m]=t.split(':').map(Number);if(lang==='en'){const ap=h>=12?'PM':'AM';const hh=h%12||12;return `${hh}:${String(m).padStart(2,'0')} ${ap}`}const hh=h>12?h-12:h;return `${hh}.${String(m).padStart(2,'0')} ${T.ms.ampm(h)}`}
function calUrl(o){const s=new Date(`${o.date}T${o.start||'11:00'}:00+08:00`),e=new Date(`${o.date}T${o.end||'16:00'}:00+08:00`);if(isNaN(s))return'#';const f=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${T[o.lang].ev[o.eventTitle]} ${coverNames(o).join(' & ')}`)}&dates=${f(s)}/${f(e)}&location=${encodeURIComponent(o.venue+', '+o.address)}`}
const mapsUrl=o=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((o.venue||'')+' '+(o.address||''))}`;
const wazeUrl=o=>`https://waze.com/ul?q=${encodeURIComponent((o.venue||'')+' '+(o.address||''))}&navigate=yes`;
const coverNames=o=>o.side==='groom'?[o.groomShort,o.brideShort]:[o.brideShort,o.groomShort];
const waNum=p=>{let d=String(p||'').replace(/\D/g,'');if(d.startsWith('0'))d='6'+d;return d};

/* ================= music (original tracks synthesised in the browser) ================= */
const Music=(()=>{
  let ctx=null,out=null,timer=null,cur=null,step=0,next=0;
  const mtof=m=>440*2**((m-69)/12);
  function impulse(){const len=ctx.sampleRate*2.6,b=ctx.createBuffer(2,len,ctx.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len)**2.6}return b}
  function setup(){if(ctx)return;ctx=new (window.AudioContext||window.webkitAudioContext)();out=ctx.createGain();out.gain.value=.0;const dry=ctx.createGain();dry.gain.value=.75;const rv=ctx.createConvolver();rv.buffer=impulse();const wet=ctx.createGain();wet.gain.value=.42;out.connect(dry).connect(ctx.destination);out.connect(rv).connect(wet).connect(ctx.destination)}
  function tone(m,t,dur,vel,kind){const f=mtof(m);const g=ctx.createGain();g.connect(out);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vel,t+.008);g.gain.exponentialRampToValueAtTime(.0008,t+dur);
    const parts=kind==='bell'?[[1,1,'sine'],[3,.18,'sine'],[4.2,.06,'sine']]:kind==='gong'?[[1,1,'sine'],[2.76,.35,'sine'],[5.4,.12,'sine']]:[[1,1,'triangle'],[2,.25,'sine'],[3,.08,'sine']];
    parts.forEach(([r,a,w])=>{const o=ctx.createOscillator(),og=ctx.createGain();o.type=w;o.frequency.value=f*r;og.gain.value=a;o.connect(og).connect(g);o.start(t);o.stop(t+dur+.05)})}
  const TR={
    musicbox:{label:'Music box',spb:.3,fn(s,t){const ch=[[60,64,67],[57,60,64],[53,57,60],[55,59,62]][(s>>3)%4];const arp=[0,1,2,1,2,0,1,2];tone(ch[arp[s%8]]+12,t,1.4,.12,'bell');
      const mel=[76,null,74,72,74,null,76,null,72,null,71,72,74,null,null,null,77,null,76,74,72,null,74,null,71,null,72,74,72,null,null,null];const n=mel[s%32];if(n)tone(n+12,t,2.2,.1,'bell');if(s%8===0)tone(ch[0]-12,t,2.4,.12,'bell')}},
    gamelan:{label:'Gamelan',spb:.34,fn(s,t){const sc=[62,64,67,69,71,74,76,79];const bal=[0,2,1,3,2,4,3,1, 4,5,3,4,2,1,2,0];tone(sc[bal[s%16]],t,1.8,.11,'gong');if(s%2)tone(sc[(bal[s%16]+2)%8]+12,t,.9,.05,'gong');if(s%16===0)tone(38,t,5,.22,'gong');if(s%4===2)tone(50,t,1.6,.08,'gong')}},
    piano:{label:'Piano ballad',spb:.42,fn(s,t){const ch=[[53,60,65,69],[50,57,62,65],[46,53,58,62],[48,55,60,64]][(s>>3)%4];if(s%8===0)tone(ch[0]-12,t,3.2,.16,'piano');const pat=[1,2,3,2,1,2,3,2];tone(ch[pat[s%8]],t,2.4,.09,'piano');
      const mel=[null,null,81,null,79,null,77,null, null,null,77,null,76,null,74,null, null,null,74,null,72,null,70,null, 72,null,null,null,null,null,null,null];const n=mel[s%32];if(n)tone(n,t,2.6,.1,'piano')}}
  };
  function loop(){while(next<ctx.currentTime+.25){TR[cur].fn(step,next);step++;next+=TR[cur].spb}}
  return{tracks:TR,current:()=>cur,
    play(id){if(!TR[id])return;try{setup()}catch(e){return}ctx.resume();if(cur===id&&timer)return;this.stop(true);cur=id;step=0;next=ctx.currentTime+.08;out.gain.cancelScheduledValues(ctx.currentTime);out.gain.setValueAtTime(out.gain.value,ctx.currentTime);out.gain.linearRampToValueAtTime(.9,ctx.currentTime+1.2);timer=setInterval(loop,60);loop()},
    stop(quick){if(timer){clearInterval(timer);timer=null}if(ctx&&out&&!quick){out.gain.setValueAtTime(out.gain.value,ctx.currentTime);out.gain.linearRampToValueAtTime(0,ctx.currentTime+.4)}if(!quick)cur=null},
    playing:()=>!!timer};
})();

/* ================= ambient particles ================= */
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;
function startFx(canvas,type,accent){
  if(type==='none'||REDUCED)return;
  const c=canvas.getContext('2d');let W=0,H=0,dpr=Math.min(2,devicePixelRatio||1);
  const size=()=>{W=canvas.clientWidth;H=canvas.clientHeight;canvas.width=W*dpr;canvas.height=H*dpr;c.setTransform(dpr,0,0,dpr,0,0)};size();
  const N=type==='stars'?40:16,P=[];
  const pal={petals:['#f4a7b2','#f7c6c0','#e8798a'],leaves:['#8ea886','#b5c7ad','#a7bb9c'],lavender:['#9b7fd1','#c4b0ea','#b9a2e3'],gold:[accent],stars:['#fff6d6',accent]}[type]||[accent];
  const spawn=(init)=>({x:Math.random()*W,y:init?Math.random()*H:(type==='gold'?H+10:-10),r:type==='stars'?Math.random()*1.4+.4:type==='gold'?Math.random()*1.8+.6:Math.random()*4+4,
    vy:type==='gold'?-(Math.random()*.25+.1):type==='stars'?0:Math.random()*.5+.35,vx:(Math.random()-.5)*.3,a:Math.random()*6.28,va:(Math.random()-.5)*.04,ph:Math.random()*6.28,col:pal[Math.random()*pal.length|0]});
  for(let i=0;i<N;i++)P.push(spawn(true));
  let last=performance.now();
  function frame(now){if(!canvas.isConnected)return;if(canvas.clientWidth!==W||canvas.clientHeight!==H)size();const dt=Math.min(3,(now-last)/16.7);last=now;c.clearRect(0,0,W,H);
    for(const p of P){p.ph+=.02*dt;p.a+=p.va*dt;p.y+=p.vy*dt;p.x+=(p.vx+Math.sin(p.ph)*.35)*dt*(type==='stars'?0:1);
      if(p.y>H+20||p.y<-20){Object.assign(p,spawn(false))}
      c.save();c.translate(p.x,p.y);c.fillStyle=p.col;
      if(type==='stars'||type==='gold'){c.globalAlpha=.35+.65*Math.abs(Math.sin(p.ph*1.4));c.beginPath();c.arc(0,0,p.r,0,6.29);c.fill();if(type==='gold'){c.globalAlpha*=.25;c.beginPath();c.arc(0,0,p.r*3,0,6.29);c.fill()}}
      else{c.rotate(p.a);c.globalAlpha=.75;c.beginPath();c.ellipse(0,0,p.r*(type==='lavender'?.4:.55),p.r,0,0,6.29);c.fill()}
      c.restore()}
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
}

/* ================= sample content (used for gallery previews) ================= */
const SAMPLE={id:'sample',slug:'contoh',template:'songket',lang:'ms',fx:'auto',bismillah:true,useAccent:false,accent:'#c08a2e',
  brideFull:'Nur Aisyah Humaira binti Ahmad Faizal',brideShort:'Aisyah',groomFull:'Muhammad Aiman Hakimi bin Rahman',groomShort:'Aiman',
  hosts:'Ahmad Faizal bin Yusof & Siti Khadijah binti Ismail',side:'bride',eventTitle:'walimah',
  date:'2026-12-19',hijri:'8 Rejab 1448H',start:'11:00',end:'16:00',venue:'Dewan Seri Melati',address:'Jalan Kristal 7/62, Seksyen 7, 40000 Shah Alam, Selangor',dress:'Maroon & emas',
  schedule:[{time:'11:00',label:'Ketibaan tetamu'},{time:'12:30',label:'Ketibaan pengantin'},{time:'13:00',label:'Makan beradab & bacaan doa'},{time:'16:00',label:'Majlis bersurai'}],
  x_rsvp:true,maxPax:5,deadline:'2026-12-05',x_wishes:true,x_music:true,music:'musicbox',x_gallery:false,photos:[],x_gift:true,bank:'Maybank',accName:'Nur Aisyah Humaira',accNo:'1621 8840 3317',qr:'',
  x_contacts:true,contacts:[{name:'Ahmad Faizal',role:'Bapa pengantin',phone:'012-345 6789'},{name:'Hafiz',role:'Abang pengantin',phone:'019-876 5432'}],x_guestlinks:false};
const SAMPLE_WISHES=[{id:'s1',name:'Mak Ngah Rosnah',msg:'Selamat pengantin baru Aisyah & Aiman. Semoga berkekalan hingga ke jannah.',at:Date.now()-3600e3},{id:'s2',name:'Farah (rakan sekolah)',msg:'Tahniah! Tak sabar nak datang. Semoga bahagia selalu.',at:Date.now()-7200e3},{id:'s3',name:'Keluarga Encik Zul',msg:'Barakallahu lakuma. Semoga dimurahkan rezeki.',at:Date.now()-86400e3}];

/* ================= invitation renderer =================
   mode: 'thumb' (cover only, static) | 'preview' (editor/gallery, nothing saved) | 'live' (guests, saves RSVP + wishes) */
function renderInvite(host,o,opts={}){
  const mode=opts.mode||'preview',L=T[o.lang]||T.ms,th=THEME[o.template]||THEMES[0],v={...th.v};
  if(o.useAccent&&o.accent){v.accent=o.accent;v.btn=o.accent;v.names=o.accent}
  const orn=th.orn(v);
  const el=document.createElement('div');el.className=`inv ${mode}`;
  const style={'--i-bg':v.bg,'--i-ink':v.ink,'--i-names':v.names,'--i-accent':v.accent,'--i-line':v.line,'--i-card':v.card,'--i-btn':v.btn,'--i-btn-ink':v.btnInk,'--i-dock':v.dock||'',
    '--i-display':th.f.display,'--i-script':th.f.script,'--i-body':th.f.body,'--i-pattern':th.pattern||'none','--i-radius':v.radius||'999px','--i-card-radius':v.cardRadius||'12px'};
  Object.entries(style).forEach(([k,val])=>val&&el.style.setProperty(k,val));
  const [n1,n2]=coverNames(o);
  const guest=opts.guest||(mode!=='live'&&o.x_guestlinks?(o.lang==='en'?'Mr Ahmad & family':'Encik Ahmad & keluarga'):'');
  const ornHTML=()=>`${orn.top?`<div class="orn top">${orn.top}</div>`:''}${orn.bot?`<div class="orn bot">${orn.bot}</div>`:''}${orn.tl?`<div class="orn corner-tl">${orn.tl}</div>`:''}${orn.br?`<div class="orn corner-br" style="transform:rotate(180deg)">${orn.br}</div>`:''}${orn.arch?`<div class="orn" style="inset:0">${orn.arch}</div>`:''}${orn.frame?`<div class="orn" style="inset:16px;border:1px solid var(--i-line)"></div>`:''}`;
  const isScriptSerif=['nyonya','zamrud'].includes(th.id);
  const initials=`${(n1||'?')[0]}<span style="font-size:.6em;margin:0 4px">&amp;</span>${(n2||'?')[0]}`;
  const coverInner=`<div class="bgpat"></div>${ornHTML()}
    ${o.template==='moden'||o.template==='noir'?`<div class="monogram">${initials}</div>`:''}${o.template==='zamrud'?`<div class="monogram arch">${initials}</div>`:''}
    <p class="kicker">${esc(L.ev[o.eventTitle]||L.ev.walimah)}</p>
    <h1 class="names" style="${isScriptSerif?'font-size:clamp(40px,13cqi,52px);font-style:italic':''}">${esc(n1||'Nama')}<span class="amp">&amp;</span>${esc(n2||'Nama')}</h1>
    ${divider(v.accent)}
    <p class="date">${esc(fmtDate(o.date,o.lang).toUpperCase())}</p>
    ${guest?`<p class="to">${L.to}<b>${esc(guest)}</b></p>`:''}
    ${mode==='thumb'?`<span class="open-btn" aria-hidden="true">${ICON.env}${L.open}</span>`:`<button type="button" class="open-btn" data-open>${ICON.env}${L.open}</button>`}`;
  if(mode==='thumb'){el.innerHTML=`<div class="cover">${coverInner}</div>`;host.replaceChildren(el);return el}

  const p1=o.side==='groom'?o.groomFull:o.brideFull,p2=o.side==='groom'?o.brideFull:o.groomFull;
  const deadline=o.deadline?fmtDate(o.deadline,o.lang,false):'';
  const rsvpClosed=o.deadline&&new Date(o.deadline+'T23:59:59+08:00')<new Date();
  const photos=(o.photos||[]).filter(Boolean);
  const contacts=(o.contacts||[]).filter(c=>c.name||c.phone);
  const dock=[['cal',ICON.cal,L.dock[0]],['loc',ICON.pin,L.dock[1]],o.x_rsvp&&['rsvp',ICON.rsvp,L.dock[2]],o.x_gift&&['gift',ICON.gift,L.dock[3]],o.x_contacts&&contacts.length&&['contact',ICON.phone,L.dock[4]],!o.x_rsvp&&o.x_wishes&&['wishes',ICON.wish,L.wishes]].filter(Boolean);
  const maxPax=Math.max(1,Math.min(20,+o.maxPax||1));
  const uid=(renderInvite.n=(renderInvite.n||0)+1);
  el.innerHTML=`<div class="bgpat"></div><canvas class="fx" aria-hidden="true"></canvas>
  <div class="scroller">
    <section class="sec" style="padding-top:${orn.top?'110px':'70px'};min-height:62%;justify-content:center">${orn.top?`<div class="orn top">${orn.top}</div>`:''}${orn.tl?`<div class="orn corner-tl" style="width:48%">${orn.tl}</div>`:''}
      <p class="kicker reveal">${esc(L.ev[o.eventTitle]||L.ev.walimah)}</p>
      <p class="big reveal" style="font-size:clamp(44px,14cqi,58px)${isScriptSerif?';font-style:italic':''}">${esc(n1)} <span style="color:var(--i-accent)">&amp;</span> ${esc(n2)}</p>
      <p class="kicker reveal" style="letter-spacing:.2em">${esc(fmtShort(o.date))}</p></section>
    <section class="sec" data-s="intro">
      ${o.bismillah?`<p class="bismillah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>`:''}
      <p class="small" style="letter-spacing:.06em">${esc(L.salam)}</p>
      <p>${L.intro(esc(o.hosts),o.side)}</p>
      <p class="person" style="margin-top:6px">${esc(p1)}</p>
      <p class="small" style="font-style:italic">${L.with}</p>
      <p class="person">${esc(p2)}</p>
    </section>
    <section class="sec" data-s="when">
      <h2>${L.when}</h2>${divider(v.accent)}
      <div class="info-grid">
        <div class="full"><span>${L.date}</span><b>${esc(fmtDate(o.date,o.lang))}</b>${o.hijri?`<br><span style="text-transform:none;letter-spacing:.04em;margin-top:2px">${esc(o.hijri)}</span>`:''}</div>
        <div><span>${L.time}</span><b>${esc(fmtTime(o.start,o.lang))}</b></div><div><span>&nbsp;</span><b>${esc(fmtTime(o.end,o.lang))}</b></div>
        <div class="full"><span>${L.venue}</span><b>${esc(o.venue)}</b><p class="small" style="margin:6px auto 0">${esc(o.address)}</p></div>
        ${o.dress?`<div class="full"><span>${L.dress}</span><b>${esc(o.dress)}</b></div>`:''}
      </div>
      <div class="ibtns"><a class="ibtn" href="${mapsUrl(o)}" target="_blank" rel="noopener">${ICON.pin}${L.maps}</a><a class="ibtn" href="${wazeUrl(o)}" target="_blank" rel="noopener">${ICON.pin}${L.waze}</a><a class="ibtn" href="${calUrl(o)}" target="_blank" rel="noopener">${ICON.cal}${L.dock[0]}</a></div>
    </section>
    <section class="sec" data-s="count"><h2>${L.count}</h2><div class="count" data-count>${L.units.map(u=>`<div><b>0</b><span>${u}</span></div>`).join('')}</div></section>
    ${(o.schedule||[]).filter(s=>s.label).length?`<section class="sec"><h2>${L.sched}</h2>${divider(v.accent)}<ul class="timeline">${o.schedule.filter(s=>s.label).map(s=>`<li><b>${esc(fmtTime(s.time,o.lang))}</b><span>${esc(s.label)}</span></li>`).join('')}</ul></section>`:''}
    ${o.x_gallery&&photos.length?`<section class="sec"><h2>${L.gallery}</h2><div class="gallery">${photos.map(p=>`<img src="${p}" alt="">`).join('')}</div></section>`:''}
    ${o.bismillah?`<section class="sec"><h2>${L.doaT}</h2><p style="font-style:italic">${L.doa}</p></section>`:''}
    ${o.x_rsvp?`<section class="sec" data-s="rsvp"><h2>${L.rsvp}</h2>${deadline?`<p class="small">${L.rsvpSub(esc(deadline))}</p>`:''}<div data-rsvp style="width:100%;display:flex;justify-content:center"></div></section>`:''}
    ${o.x_wishes?`<section class="sec" data-s="wishes"><h2>${L.wishes}</h2>
      <form data-wishform><input name="name" required maxlength="60" placeholder="${L.name}" aria-label="${L.name}"><textarea name="msg" required maxlength="400" rows="3" placeholder="${L.wishPh}" aria-label="${L.wishPh}"></textarea><button class="submit">${L.sendWish}</button><p class="note" data-wishnote hidden></p></form>
      <div class="wishes" data-wishes></div></section>`:''}
    ${o.x_gift?`<section class="sec" data-s="gift"><h2>${L.gift}</h2><p>${L.giftSub}</p><div class="giftcard"><span class="small" style="letter-spacing:.14em;text-transform:uppercase">${esc(o.bank)}</span><span class="acc">${esc(o.accNo||'—')}</span><span>${esc(o.accName)}</span><button type="button" class="ibtn" data-copy="${esc((o.accNo||'').replace(/\s/g,''))}">${ICON.copy}<span>${L.copy}</span></button>${o.qr?`<img src="${o.qr}" alt="DuitNow QR">`:''}</div></section>`:''}
    ${o.x_contacts&&contacts.length?`<section class="sec" data-s="contact"><h2>${L.contact}</h2>${contacts.map(c=>`<div class="contact"><div><b>${esc(c.name)}</b><span>${esc(c.role)}${c.role&&c.phone?' · ':''}${esc(c.phone)}</span></div><a class="ibtn solid" href="https://wa.me/${waNum(c.phone)}" target="_blank" rel="noopener" aria-label="WhatsApp ${esc(c.name)}">${ICON.wa}</a></div>`).join('')}</section>`:''}
    <div class="foot">${L.made}</div>
    <nav class="dock" style="grid-template-columns:repeat(${dock.length},1fr)">${dock.map(([k,ic,lb])=>`<button type="button" data-dock="${k}">${ic}<span>${lb}</span></button>`).join('')}</nav>
  </div>
  <div class="cover">${coverInner}</div>
  ${o.x_music&&o.music?`<button type="button" class="music-btn" data-music hidden aria-label="Music">${ICON.music}</button>`:''}`;
  host.replaceChildren(el);
  if(mode==='preview'&&opts.opened)el.classList.add('opened');
  const scroller=$('.scroller',el);

  // open + music
  const musicBtn=$('[data-music]',el);
  const setMusicIcon=()=>{if(!musicBtn)return;const on=Music.playing();musicBtn.classList.toggle('playing',on);musicBtn.innerHTML=on?ICON.music:ICON.mute};
  $('[data-open]',el).addEventListener('click',()=>{el.classList.add('opened');if(musicBtn){musicBtn.hidden=false;if(opts.autoplay!==false){Music.play(o.music)}setMusicIcon()}});
  musicBtn?.addEventListener('click',()=>{Music.playing()?Music.stop():Music.play(o.music);setMusicIcon()});
  if(el.classList.contains('opened')&&musicBtn){musicBtn.hidden=false;setMusicIcon()}
  el.reopen=()=>{el.classList.remove('opened');scroller.scrollTop=0};
  // fx
  const fxType=o.fx==='none'?'none':th.fx;startFx($('canvas.fx',el),fxType,v.accent);
  // countdown
  const cd=$('[data-count]',el);
  if(cd){const target=new Date(`${o.date}T${o.start||'11:00'}:00+08:00`);const tick=()=>{if(!cd.isConnected){clearInterval(iv);return}const ms=target-new Date();if(isNaN(ms))return;if(ms<=0){cd.outerHTML=`<p>${L.done}</p>`;clearInterval(iv);return}
    const vals=[Math.floor(ms/864e5),Math.floor(ms/36e5)%24,Math.floor(ms/6e4)%60,Math.floor(ms/1e3)%60];$$('b',cd).forEach((b,i)=>b.textContent=String(vals[i]).padStart(2,'0'))};const iv=setInterval(tick,1000);tick()}
  // copy
  $$('[data-copy]',el).forEach(b=>b.addEventListener('click',()=>copyText(b.dataset.copy,()=>{b.querySelector('span').textContent=L.copied;setTimeout(()=>b.querySelector('span').textContent=L.copy,1600)})));
  // dock + sheets
  const sheet=(title,body)=>{const bg=document.createElement('div');bg.className='sheet-bg';bg.innerHTML=`<div class="sheet" role="dialog" aria-label="${esc(title)}"><h3>${esc(title)}</h3>${body}<button type="button" class="ibtn" data-x>${o.lang==='en'?'Close':'Tutup'}</button></div>`;bg.addEventListener('click',e=>{if(e.target===bg||e.target.closest('[data-x]'))bg.remove()});el.appendChild(bg)};
  $$('[data-dock]',el).forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.dock;
    if(k==='cal')sheet(L.dock[0],`<p class="small">${esc(fmtDate(o.date,o.lang))} · ${esc(fmtTime(o.start,o.lang))} – ${esc(fmtTime(o.end,o.lang))}</p><a class="ibtn solid" href="${calUrl(o)}" target="_blank" rel="noopener">${ICON.cal}${L.addCal}</a>`);
    else if(k==='loc')sheet(L.loc,`<p><b>${esc(o.venue)}</b><br><span class="small">${esc(o.address)}</span></p><div class="ibtns"><a class="ibtn solid" href="${mapsUrl(o)}" target="_blank" rel="noopener">${ICON.pin}${L.maps}</a><a class="ibtn solid" href="${wazeUrl(o)}" target="_blank" rel="noopener">${ICON.pin}${L.waze}</a></div>`);
    else{const s=$(`[data-s="${k}"]`,el);if(s)scroller.scrollTo({top:s.offsetTop-10,behavior:REDUCED?'auto':'smooth'})}}));

  // RSVP
  const rsvpBox=$('[data-rsvp]',el);
  if(rsvpBox){
    const done=opts.rsvpDone?.();
    if(done)rsvpBox.innerHTML=`<p class="note">${L.thanks(esc(done))}</p>`;
    else if(rsvpClosed&&mode==='live')rsvpBox.innerHTML=`<p class="note">${L.closed}</p>`;
    else{
      rsvpBox.innerHTML=`<form data-rsvpform><label for="r-name-${uid}">${L.name}</label><input id="r-name-${uid}" name="name" required maxlength="60" value="${esc(opts.guest||'')}">
        <label for="r-phone-${uid}">${L.phone}</label><input id="r-phone-${uid}" name="phone" type="tel" maxlength="20" required>
        <div class="seg" role="group"><button type="button" data-att="yes" aria-pressed="true">${L.yes}</button><button type="button" data-att="no" aria-pressed="false">${L.no}</button></div>
        <div data-paxwrap><label for="r-pax-${uid}">${L.pax}</label><select id="r-pax-${uid}" name="pax">${Array.from({length:maxPax},(_,i)=>`<option>${i+1}</option>`).join('')}</select></div>
        <button class="submit">${L.send}</button><p class="note" data-rsvpnote hidden></p></form>`;
      const f=$('form',rsvpBox);let att='yes';
      $$('[data-att]',f).forEach(b=>b.addEventListener('click',()=>{att=b.dataset.att;$$('[data-att]',f).forEach(x=>x.setAttribute('aria-pressed',x===b));$('[data-paxwrap]',f).hidden=att==='no'}));
      f.addEventListener('submit',async e=>{e.preventDefault();const note=$('[data-rsvpnote]',f);const fd=new FormData(f);const data={name:fd.get('name').trim(),phone:fd.get('phone').trim(),attending:att==='yes',pax:att==='yes'?+fd.get('pax'):0,guestLink:opts.guest||'',at:Date.now()};
        if(!opts.onRsvp){note.hidden=false;note.textContent=L.previewNote;return}
        const btn=$('.submit',f);btn.disabled=true;
        try{await opts.onRsvp(data);rsvpBox.innerHTML=`<p class="note">${L.thanks(esc(data.name))}</p>`}catch(err){btn.disabled=false;note.hidden=false;note.textContent=err.message||'Could not save.'}});
    }
  }
  // wishes
  const wl=$('[data-wishes]',el);
  if(wl){
    const draw=list=>{const vis=list.filter(w=>!w.hidden).sort((a,b)=>b.at-a.at);wl.innerHTML=vis.length?vis.map(w=>`<div class="wish"><b>${esc(w.name)}</b><p>${esc(w.msg)}</p><time>${new Date(w.at).toLocaleDateString(o.lang==='en'?'en-MY':'ms-MY',{day:'numeric',month:'short'})}</time></div>`).join(''):`<p class="small" style="text-align:center">${L.noWish}</p>`};
    if(opts.subscribeWishes){const un=opts.subscribeWishes(list=>{if(!wl.isConnected){un&&un();return}draw(list)})}else draw(mode==='preview'?SAMPLE_WISHES:[]);
    const wf=$('[data-wishform]',el);
    wf.addEventListener('submit',async e=>{e.preventDefault();const note=$('[data-wishnote]',wf);const fd=new FormData(wf);const data={name:fd.get('name').trim(),msg:fd.get('msg').trim(),at:Date.now(),hidden:false};
      if(!opts.onWish){note.hidden=false;note.textContent=L.previewNote;return}
      try{await opts.onWish(data);wf.reset();note.hidden=true}catch(err){note.hidden=false;note.textContent=err.message||'Could not save.'}});
  }
  return el;
}
function copyText(text,ok){const done=()=>ok&&ok();try{navigator.clipboard.writeText(text).then(done,()=>fallback())}catch(e){fallback()}
  function fallback(){const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}ta.remove();done()}}
</script>
