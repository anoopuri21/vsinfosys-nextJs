function initAmbientTilt(){
  if(matchMedia('(pointer: coarse)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const area=document.querySelector('[data-hero-art]');const orb=area?.querySelector('.orb');if(!area||!orb)return;
  let targetX=0,targetY=0,currentX=0,currentY=0,frame=0;
  const render=()=>{currentX+=(targetX-currentX)*.075;currentY+=(targetY-currentY)*.075;orb.style.transform=`rotateX(${currentY}deg) rotateY(${currentX}deg) scale(1.015)`;if(Math.abs(targetX-currentX)>.01||Math.abs(targetY-currentY)>.01)frame=requestAnimationFrame(render);else frame=0};
  area.addEventListener('pointermove',event=>{const rect=area.getBoundingClientRect();targetX=((event.clientX-rect.left)/rect.width-.5)*10;targetY=-((event.clientY-rect.top)/rect.height-.5)*10;if(!frame)frame=requestAnimationFrame(render)});
  area.addEventListener('pointerleave',()=>{targetX=0;targetY=0;if(!frame)frame=requestAnimationFrame(render)});
}
export function initInteractions(){
  initAmbientTilt();
  const aiButtons=[...document.querySelectorAll('[data-ai-mode]')];const workflow=document.querySelector('[data-workflow]');if(workflow)workflow.dataset.mode='before';aiButtons.forEach(button=>button.addEventListener('click',()=>{aiButtons.forEach(item=>item.classList.toggle('is-active',item===button));if(workflow)workflow.dataset.mode=button.dataset.aiMode}));
  const layers=[...document.querySelectorAll('[data-layer]')];const stack=document.querySelector('[data-glass-stack]');if(stack)stack.dataset.active='0';layers.forEach(item=>{const activate=()=>{layers.forEach(x=>x.classList.toggle('is-active',x===item));if(stack)stack.dataset.active=item.dataset.layer};item.addEventListener('mouseenter',activate);item.addEventListener('focusin',activate);item.addEventListener('click',activate)});
  document.querySelectorAll('[data-accordion] article').forEach(article=>{const button=article.querySelector('button');const panel=article.querySelector('.accordion-panel');button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';document.querySelectorAll('[data-accordion] article').forEach(other=>{const b=other.querySelector('button'),p=other.querySelector('.accordion-panel');b.setAttribute('aria-expanded','false');b.querySelector('span').textContent='+';p.hidden=true});if(!open){button.setAttribute('aria-expanded','true');button.querySelector('span').textContent='−';panel.hidden=false}})});
}
