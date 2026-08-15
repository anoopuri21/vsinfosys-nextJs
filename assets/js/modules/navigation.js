export function initNavigation(){
  const header=document.querySelector('[data-header]');
  const toggle=document.querySelector('[data-menu-toggle]');
  const menu=document.querySelector('[data-mobile-menu]');
  const close=()=>{toggle?.setAttribute('aria-expanded','false');header?.classList.remove('menu-open');if(menu)menu.hidden=true;document.body.style.overflow=''};
  const open=()=>{toggle?.setAttribute('aria-expanded','true');header?.classList.add('menu-open');if(menu)menu.hidden=false;document.body.style.overflow='hidden'};
  toggle?.addEventListener('click',()=>toggle.getAttribute('aria-expanded')==='true'?close():open());
  menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  const update=()=>header?.classList.toggle('is-scrolled',scrollY>32);
  update();addEventListener('scroll',update,{passive:true});

  const motionToggle=document.querySelector('[data-motion-toggle]');
  const label=document.querySelector('[data-motion-label]');
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const stored=localStorage.getItem('vs-motion');
  const reduced=stored?stored==='reduced':media.matches;
  const apply=value=>{document.documentElement.classList.toggle('reduce-motion',value);motionToggle?.setAttribute('aria-pressed',String(value));if(label)label.textContent=value?'Motion off':'Motion on';localStorage.setItem('vs-motion',value?'reduced':'full')};
  apply(reduced);
  motionToggle?.addEventListener('click',()=>apply(!document.documentElement.classList.contains('reduce-motion')));
}
