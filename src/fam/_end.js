
/* ================= after all families: refresh lookups, load extra fonts, QA hook ================= */
THEMES.forEach(t=>{THEME[t.id]=t});
CATS=[['all','All'],...Object.entries(FAMILIES).filter(([k])=>THEMES.some(t=>t.fam===k)).map(([k,f])=>[k,f.name])];
if(FAM_FONTS.size){const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?'+[...FAM_FONTS].map(f=>'family='+f).join('&')+'&display=swap';document.head.appendChild(l)}
/* live counts in the marketing copy */
(()=>{const fams=new Set(THEMES.map(t=>t.fam)).size;const W=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'],T10=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  const word=n=>n===100?'one hundred':n<20?W[n]:T10[Math.floor(n/10)]+(n%10?'-'+W[n%10]:'');
  const put=()=>{$$('[data-count="designs"]').forEach(e=>e.textContent=THEMES.length);$$('[data-count="fams-word"]').forEach(e=>e.textContent=word(fams));$$('[data-count="Fams-word"]').forEach(e=>{const w=word(fams);e.textContent=w[0].toUpperCase()+w.slice(1)})};
  document.readyState==='loading'?addEventListener('DOMContentLoaded',put):put()})();
/* ?qa=<template id>&at=cover|open|<section> shows one card full screen, for screenshots */
(()=>{const q=new URLSearchParams(location.search),id=q.get('qa');if(!id)return;
  const at=q.get('at')||'cover';
  const st=document.createElement('style');st.textContent='#inv-root .inv-overlay{right:auto!important;width:390px!important;max-width:390px!important}';document.head.appendChild(st);
  addEventListener('DOMContentLoaded',()=>setTimeout(async()=>{
    openInvite({...SAMPLE,template:id,x_gallery:false},{guest:'Pak Long Hashim',autoplay:false,closeLabel:'←'});
    if(at==='cover')return;
    await new Promise(r=>setTimeout(r,300));document.querySelector('#inv-root [data-open]')?.click();
    const inv=document.querySelector('#inv-root .inv');
    await new Promise(r=>setTimeout(r,(FAM2[THEME[id]?.fam]?.ms||1200)+1400));
    inv.querySelectorAll('.reveal').forEach(e=>{e.style.animation='none';e.style.opacity=1});
    if(at!=='open'){const sc=inv.querySelector('.scroller'),s=inv.querySelector(`[data-s="${at}"]`);if(sc&&s){sc.style.scrollBehavior='auto';sc.scrollTop=s.getBoundingClientRect().top-sc.getBoundingClientRect().top+sc.scrollTop-8}}
  },400));
})();
