export function initScrollExperience(){
  const progress=document.querySelector('[data-page-progress]');
  const art=document.querySelector('[data-hero-art]');
  let ticking=false;
  const update=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    const ratio=max>0?Math.min(1,scrollY/max):0;
    if(progress)progress.style.transform=`scaleX(${ratio})`;
    if(art&&!document.documentElement.classList.contains('reduce-motion')&&innerWidth>900){art.style.transform=`translate3d(0,${Math.min(scrollY*.09,65)}px,0)`}
    ticking=false;
  };
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});update();
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
  const themes=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)document.body.dataset.theme=entry.target.dataset.theme||'dark'}),{rootMargin:'-45% 0px -45% 0px'});
  document.querySelectorAll('[data-theme]').forEach(section=>themes.observe(section));
}
