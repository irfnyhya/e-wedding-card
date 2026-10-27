/* ================= kit for the families in src/fam (rounds 6+) =================
   Each src/fam/<key>.js runs inside its own (()=>{ ... })() so its consts stay private.
   Use FAMILY() to register; it fills FAMILIES, THEMES, FAM2 and SKINS in one call. */
const FAM_FONTS=new Set();
function needFont(spec){FAM_FONTS.add(spec)}   // Google Fonts css2 "family=" value, e.g. 'Press+Start+2P' or 'Playfair+Display:ital,wght@0,400;1,400'
/* FAMILY({key,name,meaning,blurb,fonts:{d,s,b},ms,page,cover,skin,themes:[{k,n,desc?,c:{ground,sheet,ink,accent,gold,cover,...},extra?}]}) */
function FAMILY(f){
  // a redesign of an older family replaces it: same key, same colourway ids, so published cards keep working
  if(FAMILIES[f.key]){for(let i=THEMES.length-1;i>=0;i--)if(THEMES[i].fam===f.key)THEMES.splice(i,1);delete SKINS[f.key]}
  FAMILIES[f.key]={name:f.name,meaning:f.meaning,blurb:f.blurb,f:f.fonts};
  FAM2[f.key]={ms:f.ms||1200,page:f.page,cover:f.cover};
  if(f.skin)SKINS[f.key]=f.skin;
  f.themes.forEach(t=>{const th=T2(`${f.key}-${t.k}`,f.key,t.n,t.desc||`${t.n} ${f.meaning.toLowerCase()}`,{cover:t.c.accent,...t.c},t.extra||{});THEMES.push(th);THEME[th.id]=th});
}
/* small helpers every family may use */
const K={
  // inner-page sections, for skins
  secs:el=>$$('.sheet > .sec',el),
  cards:el=>el.classList.add('cardsecs'),
  // n points around a circle, for rosettes, scallops and stars
  ring:(n,r,cx=0,cy=0,rot=-Math.PI/2)=>Array.from({length:n},(_,i)=>{const a=rot+i/n*Math.PI*2;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r,a]}),
  star:(n,R,r,cx=0,cy=0)=>{let d='';for(let i=0;i<n*2;i++){const a=-Math.PI/2+i/(n*2)*Math.PI*2,rr=i%2?r:R;d+=(i?'L':'M')+(cx+Math.cos(a)*rr).toFixed(2)+' '+(cy+Math.sin(a)*rr).toFixed(2)}return d+'Z'},
  scallop:(n,R,depth,cx=0,cy=0)=>{let d='';for(let i=0;i<n;i++){const a0=i/n*Math.PI*2,a1=(i+1)/n*Math.PI*2,am=(a0+a1)/2;const p=a=>[(cx+Math.cos(a)*R).toFixed(2),(cy+Math.sin(a)*R).toFixed(2)];const [x0,y0]=p(a0),[x1,y1]=p(a1);const qx=(cx+Math.cos(am)*(R+depth)).toFixed(2),qy=(cy+Math.sin(am)*(R+depth)).toFixed(2);d+=(i?'':'M'+x0+' '+y0)+`Q${qx} ${qy} ${x1} ${y1}`}return d+'Z'},
  rnd:seed=>rng(seed),
  initials:o=>{const [a,b]=coverNames(o);return[(a||'A')[0],(b||'A')[0]]},
  uri:svgUriSq,   // svg string -> url('data:...') safe inside style="" attributes
  foilBg:'url(assets/foil.jpg) 0 0/240px,var(--gold)',
};
