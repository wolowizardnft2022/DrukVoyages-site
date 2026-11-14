(function(){
  const root=document.documentElement;
  if(!root.classList.contains('splash-on'))return;
  const splash=document.getElementById('introSplash'),holder=splash.querySelector('.intro-logo');
  let done=false;
  function finish(){
    if(done)return;done=true;
    // The logo travels to the masthead logo and shrinks to its height while the screen fades.
    const target=document.querySelector('#navbar .logo');
    if(target&&holder.firstChild){
      const from=holder.getBoundingClientRect(),to=target.getBoundingClientRect();
      holder.style.transform=`translate(${to.left+to.width/2-(from.left+from.width/2)}px,${to.top+to.height/2-(from.top+from.height/2)}px) scale(${Math.min(to.height/from.height,1)})`;
    }
    splash.classList.add('is-leaving');
    setTimeout(()=>{
      root.classList.remove('splash-on');splash.remove();
      // Scrolling was locked during the splash, so a #section link is honoured now.
      let target=null;try{target=location.hash&&document.querySelector(location.hash);}catch(error){}
      if(target)target.scrollIntoView({behavior:'auto',block:'start'});
      document.dispatchEvent(new Event('druk:intro-done'));
    },950);
  }
  const giveUp=setTimeout(finish,1800); // the logo did not arrive in time: go straight to the page
  fetch('img/druk-voyages-logo-animated.svg?v=20261109').then(response=>response.ok?response.text():Promise.reject(new Error(String(response.status)))).then(text=>{
    const svg=new DOMParser().parseFromString(text,'image/svg+xml').documentElement;
    if(done||svg.nodeName!=='svg')return;
    clearTimeout(giveUp);
    svg.removeAttribute('role');svg.removeAttribute('aria-label');
    const logo=document.importNode(svg,true);
    holder.append(logo);
    requestAnimationFrame(()=>logo.classList.add('lg-play'));
    setTimeout(finish,5500); // the 5-second build (styles.css --lg-t) plus a short hold
  }).catch(finish);
  splash.addEventListener('click',finish);
  addEventListener('keydown',finish,{once:true});
})();
