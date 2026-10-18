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
  let ctx=null,out=null,timer=null,cur=null,step=0,next=0,noise=null;
  const mtof=m=>440*2**((m-69)/12);
  function impulse(){const len=ctx.sampleRate*2.6,b=ctx.createBuffer(2,len,ctx.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len)**2.6}return b}
  function setup(){if(ctx)return;ctx=new (window.AudioContext||window.webkitAudioContext)();out=ctx.createGain();out.gain.value=.0;const dry=ctx.createGain();dry.gain.value=.75;const rv=ctx.createConvolver();rv.buffer=impulse();const wet=ctx.createGain();wet.gain.value=.42;out.connect(dry).connect(ctx.destination);out.connect(rv).connect(wet).connect(ctx.destination);
    noise=ctx.createBuffer(1,ctx.sampleRate*.4,ctx.sampleRate);const nd=noise.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1}
  // a brushed ride / snare swish: filtered noise with a soft tail
  function brush(t,vel,dur=.18,hp=5200){const src=ctx.createBufferSource();src.buffer=noise;const f=ctx.createBiquadFilter();f.type='highpass';f.frequency.value=hp;const g=ctx.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vel,t+.006);g.gain.exponentialRampToValueAtTime(.0005,t+dur);src.connect(f).connect(g).connect(out);src.start(t);src.stop(t+dur+.02)}
  function tone(m,t,dur,vel,kind){const f=mtof(m);const g=ctx.createGain();g.connect(out);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vel,t+(kind==='keys'?.02:.008));g.gain.exponentialRampToValueAtTime(.0008,t+dur);
    const parts=kind==='bell'?[[1,1,'sine'],[3,.18,'sine'],[4.2,.06,'sine']]:kind==='gong'?[[1,1,'sine'],[2.76,.35,'sine'],[5.4,.12,'sine']]:kind==='bass'?[[1,1,'sine'],[2,.35,'triangle'],[3,.06,'sine']]:kind==='keys'?[[1,1,'sine'],[2,.18,'sine'],[4,.04,'sine']]:kind==='vibe'?[[1,1,'sine'],[4,.1,'sine'],[10,.02,'sine']]:[[1,1,'triangle'],[2,.25,'sine'],[3,.08,'sine']];
    parts.forEach(([r,a,w])=>{const o=ctx.createOscillator(),og=ctx.createGain();o.type=w;o.frequency.value=f*r;og.gain.value=a;o.connect(og).connect(g);o.start(t);o.stop(t+dur+.05)})}
  const TR={
    musicbox:{label:'Music box',spb:.3,fn(s,t){const ch=[[60,64,67],[57,60,64],[53,57,60],[55,59,62]][(s>>3)%4];const arp=[0,1,2,1,2,0,1,2];tone(ch[arp[s%8]]+12,t,1.4,.12,'bell');
      const mel=[76,null,74,72,74,null,76,null,72,null,71,72,74,null,null,null,77,null,76,74,72,null,74,null,71,null,72,74,72,null,null,null];const n=mel[s%32];if(n)tone(n+12,t,2.2,.1,'bell');if(s%8===0)tone(ch[0]-12,t,2.4,.12,'bell')}},
    gamelan:{label:'Gamelan',spb:.34,fn(s,t){const sc=[62,64,67,69,71,74,76,79];const bal=[0,2,1,3,2,4,3,1, 4,5,3,4,2,1,2,0];tone(sc[bal[s%16]],t,1.8,.11,'gong');if(s%2)tone(sc[(bal[s%16]+2)%8]+12,t,.9,.05,'gong');if(s%16===0)tone(38,t,5,.22,'gong');if(s%4===2)tone(50,t,1.6,.08,'gong')}},
    piano:{label:'Piano ballad',spb:.42,fn(s,t){const ch=[[53,60,65,69],[50,57,62,65],[46,53,58,62],[48,55,60,64]][(s>>3)%4];if(s%8===0)tone(ch[0]-12,t,3.2,.16,'piano');const pat=[1,2,3,2,1,2,3,2];tone(ch[pat[s%8]],t,2.4,.09,'piano');
      const mel=[null,null,81,null,79,null,77,null, null,null,77,null,76,null,74,null, null,null,74,null,72,null,70,null, 72,null,null,null,null,null,null,null];const n=mel[s%32];if(n)tone(n,t,2.6,.1,'piano')}},
    // soft swing trio in F: ii-V-I with 9th/13th voicings, walking bass, brushed ride, vibraphone melody (~100 bpm, swung 8ths)
    jazz:{label:'Jazz',spb:s=>s%2?.2:.4,fn(s,t){const bar=(s>>3)%8,i=s%8;
      const CH=[[58,62,65,69],[52,58,62,69],[57,60,64,67],[53,57,60,64],[58,62,65,69],[52,58,62,69],[57,60,64,67],[57,60,64,67]];
      const BS=[[43,46,50,49],[36,40,43,40],[41,43,45,39],[38,41,45,42],[43,46,50,49],[36,40,43,40],[41,45,48,45],[41,43,45,42]];
      if(i%2===0)tone(BS[bar][i>>1],t,.55,.2,'bass');
      if(i===0||i===3)CH[bar].forEach((m,k)=>tone(m,t+k*.008,i===0?.45:.8,.045,'keys'));
      if([0,2,3,4,6,7].includes(i))brush(t,i===2||i===6?.03:.018,i===3||i===7?.12:.22);
      if(i===2||i===6)brush(t,.022,.32,1800);
      const MEL=[[null,null,74,72,70,null,69,null],[null,null,67,null,69,null,70,null],[69,null,null,null,67,null,64,null],[65,null,null,null,null,null,62,null],
                 [null,null,65,67,69,null,70,null],[72,null,null,null,70,null,69,null],[67,null,64,null,65,null,null,null],[null,null,null,null,null,null,null,null]];
      const n=MEL[bar][i];if(n)tone(n+12,t,MEL[bar][i+1]==null?2.2:.9,.07,'vibe')}},
    // senja: an original wistful solo-piano jazz waltz (3/4) in A minor / C major, with gentle rubato
    senja:{label:'Senja (piano waltz)',spb:s=>{const i=s%6,bar=(s/6|0)%16;return (i===0?.29:.26)*(bar%4===3&&i>3?1.18:1)},fn(s,t){const bar=(s/6|0)%16,i=s%6;
      // Am9 | Dmaj7/F# | Fmaj7 | E7sus-E7 | Am9 | D9 | Gmaj7 | Cmaj7 | Fmaj7 | Bm7b5 | E7 | Am9 | Dm9 | G13 | Cmaj9 | Esus-E
      const R=[45,42,41,40,45,38,43,36,41,47,40,45,38,43,36,40];
      const V=[[55,59,60,64],[54,57,61,64],[57,60,64,65],[56,59,62,64],[55,59,60,64],[54,57,60,64],[54,57,59,62],[55,59,62,64],[57,60,64,67],[57,59,62,65],[56,59,62,64],[55,59,60,64],[53,57,60,64],[53,57,59,64],[55,59,62,64],[56,59,62,64]];
      if(i===0){tone(R[bar]-12,t,2.4,.14,'piano');tone(R[bar],t+.02,2,.07,'piano')}
      if(i===2||i===4)V[bar].forEach((m,k)=>tone(m,t+k*.012,1.1,.035,'piano'));
      const MEL=[[76,null,77,79,null,81],[null,null,79,null,76,null],[77,null,null,76,74,72],[71,null,null,null,null,null],
                 [76,null,77,79,null,84],[null,null,83,null,81,null],[79,null,null,78,79,81],[76,null,null,null,null,null],
                 [77,null,76,77,null,81],[null,null,79,null,77,null],[76,null,null,74,null,71],[72,null,null,null,76,null],
                 [77,null,null,76,null,74],[null,null,null,null,72,74],[76,null,null,null,null,null],[null,null,71,null,72,74]];
      const n=MEL[bar][i];if(n){let d=1;for(let k=i+1;k<6&&MEL[bar][k]==null;k++)d++;tone(n+12,t,Math.min(3,.32*d+.6),.085,'piano')}}}
  };
  function loop(){while(next<ctx.currentTime+.25){TR[cur].fn(step,next);const sp=TR[cur].spb;next+=typeof sp==='function'?sp(step):sp;step++}}
  return{tracks:TR,current:()=>cur,
    play(id){if(!TR[id])return;try{setup()}catch(e){return}ctx.resume();if(cur===id&&timer)return;this.stop(true);cur=id;step=0;next=ctx.currentTime+.08;out.gain.cancelScheduledValues(ctx.currentTime);out.gain.setValueAtTime(out.gain.value,ctx.currentTime);out.gain.linearRampToValueAtTime(.9,ctx.currentTime+1.2);timer=setInterval(loop,60);loop()},
    stop(quick){if(timer){clearInterval(timer);timer=null}if(ctx&&out&&!quick){out.gain.setValueAtTime(out.gain.value,ctx.currentTime);out.gain.linearRampToValueAtTime(0,ctx.currentTime+.4)}if(!quick)cur=null},
    playing:()=>!!timer};
})();

function copyText(text,ok){const done=()=>ok&&ok();try{navigator.clipboard.writeText(text).then(done,()=>fallback())}catch(e){fallback()}
  function fallback(){const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}ta.remove();done()}}
