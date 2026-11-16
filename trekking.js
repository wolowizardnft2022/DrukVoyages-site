/* Trekking page hero slideshow (R-32, T192, T193). Photos crossfade every 7 seconds and the headline changes with them; the first is in the HTML, the rest load
   just before they are shown (data-src / data-srcset). Dots pick a slide, the button pauses (WCAG 2.2.2), and the
   rotation stops while the tab is hidden. Without JavaScript the first photo simply stays. */
(function(){
  'use strict';
  const slides=[...document.querySelectorAll('#trekSlides .trek-slide')];
  const dots=document.getElementById('trekDots');
  const pause=document.getElementById('trekPause');
  if(slides.length<2||!dots||!pause)return;
  const DELAY=7000;
  const title=document.getElementById('trekTitle');
  // Each slide carries its own headline in data-title; *words* in stars become the italic accent.
  function setTitle(text){
    if(!title||!text)return;
    const parts=text.split('*');
    title.replaceChildren(...parts.map((part,i)=>{if(i%2===0)return document.createTextNode(part);const em=document.createElement('em');em.textContent=part;return em;}));
  }
  let swap=null;
  function showTitle(slide){
    if(!title)return;
    clearTimeout(swap);
    title.classList.add('is-swapping');
    swap=setTimeout(()=>{setTitle(slide.dataset.title);title.classList.remove('is-swapping');},450);
  }
  let current=0,timer=null,paused=false;
  function load(slide){
    if(!slide||!slide.dataset.src)return;
    slide.srcset=slide.dataset.srcset||'';slide.src=slide.dataset.src;
    delete slide.dataset.src;delete slide.dataset.srcset;
  }
  function show(index){
    index=(index+slides.length)%slides.length;
    if(index===current)return;
    load(slides[index]);
    slides[current].classList.remove('is-active');dots.children[current].classList.remove('active');dots.children[current].setAttribute('aria-pressed','false');
    current=index;
    slides[current].classList.add('is-active');showTitle(slides[current]);dots.children[current].classList.add('active');dots.children[current].setAttribute('aria-pressed','true');
    load(slides[(current+1)%slides.length]); // fetch the next photo in good time
  }
  function sync(){
    clearInterval(timer);timer=null;
    if(!paused&&!document.hidden)timer=setInterval(()=>show(current+1),DELAY);
    pause.setAttribute('aria-pressed',String(paused));
    pause.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');
  }
  slides.forEach((slide,i)=>{
    const dot=document.createElement('button');
    dot.type='button';dot.className='hero-dot'+(i===0?' active':'');
    dot.setAttribute('aria-label',`Photo ${i+1} of ${slides.length}`);dot.setAttribute('aria-pressed',String(i===0));
    dot.addEventListener('click',()=>{show(i);sync();});
    dots.appendChild(dot);
  });
  pause.addEventListener('click',()=>{paused=!paused;sync();});
  document.addEventListener('visibilitychange',sync);
  pause.parentElement.classList.add('is-ready');
  // Load the second photo once the page has settled, so it is ready for the first change.
  addEventListener('load',()=>load(slides[1]),{once:true});
  sync();
})();
