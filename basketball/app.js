const menuButton=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('#mobile-nav');
function closeMenu(){mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false')}
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';mobileMenu.hidden=open;menuButton.setAttribute('aria-expanded',String(!open))});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
const tabs=[...document.querySelectorAll('[role="tab"]')];
function selectTab(tab,focus=false){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected});if(focus)tab.focus()}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();selectTab(tabs[next],true)})});
const lightbox=document.querySelector('#lightbox');
const lightboxImage=document.querySelector('#lightbox-image');
let lastTrigger;
document.querySelectorAll('[data-zoom]').forEach(trigger=>trigger.addEventListener('click',()=>{lastTrigger=trigger;lightboxImage.src=trigger.dataset.zoom;lightboxImage.alt=trigger.dataset.caption;document.querySelector('#lightbox-caption').textContent=trigger.dataset.caption;lightbox.showModal();document.documentElement.classList.add('no-scroll')}));
document.querySelector('#lightbox-close')?.addEventListener('click',()=>lightbox.close());
lightbox?.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close()}});
lightbox?.addEventListener('close',()=>{document.documentElement.classList.remove('no-scroll');lastTrigger?.focus({preventScroll:true})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton?.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus()}});
window.matchMedia('(min-width:951px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
