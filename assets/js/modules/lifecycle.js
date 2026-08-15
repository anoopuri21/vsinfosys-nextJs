const stages=[
  {kicker:'Start with intent',title:'Imagine.',copy:'Clarify the opportunity, the audience and the outcome before choosing a screen or technology.'},
  {kicker:'Create the system',title:'Build.',copy:'Turn direction into structure, interfaces, content and reliable technology.'},
  {kicker:'Release with confidence',title:'Launch.',copy:'Test the complete experience, connect the essentials and make the transition controlled.'},
  {kicker:'Keep creating value',title:'Grow.',copy:'Use search, content, measurement and iteration to keep the digital system useful.'}
];
export function initLifecycle(){
  const section=document.querySelector('[data-lifecycle]');if(!section)return;const visual=section.querySelector('[data-lifecycle-visual]');const title=section.querySelector('[data-lifecycle-title]');const copy=section.querySelector('[data-lifecycle-copy]');const kicker=section.querySelector('[data-lifecycle-kicker]');const current=section.querySelector('[data-lifecycle-current]');const rail=[...section.querySelectorAll('[data-life-step]')];let active=-1,ticking=false;
  const render=index=>{if(index===active)return;active=index;const stage=stages[index];visual.dataset.stage=index;title.textContent=stage.title;copy.textContent=stage.copy;kicker.textContent=stage.kicker;current.textContent=String(index+1).padStart(2,'0');rail.forEach((el,i)=>el.classList.toggle('is-active',i===index))};
  const update=()=>{if(innerWidth<=900){render(0);ticking=false;return}const rect=section.getBoundingClientRect();const distance=section.offsetHeight-innerHeight;const progress=Math.max(0,Math.min(1,-rect.top/Math.max(distance,1)));render(Math.min(3,Math.floor(progress*4)));ticking=false};
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});addEventListener('resize',update);update();
}
