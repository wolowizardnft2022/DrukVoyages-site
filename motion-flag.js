try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches){document.documentElement.classList.add('splash-on');if(!location.hash&&'scrollRestoration' in history){history.scrollRestoration='manual';scrollTo(0,0);}}}catch(error){}
/* Lazy backgrounds (R-11). Browsers cannot lazy-load CSS background photos, so every section's photos used to download with the
   page (about 2 MB). While <html> has .lazy-bg, a section's backgrounds stay off (styles.css "Lazy backgrounds") until the section
   comes within a screen and a half of the viewport and gets .is-near. The class and the observer live in this one file, so if it
   fails to load, nothing is ever hidden. Printing shows everything. */
try{if('IntersectionObserver' in window){
  var lazyRoot=document.documentElement;lazyRoot.classList.add('lazy-bg');
  document.addEventListener('DOMContentLoaded',function(){
    var sections=document.querySelectorAll('main > section:not(.hero), .finale');
    var near=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-near');near.unobserve(entry.target);}});},{rootMargin:'150% 0px'});
    sections.forEach(function(section){near.observe(section);});
    addEventListener('beforeprint',function(){lazyRoot.classList.remove('lazy-bg');});
  },{once:true});
}}catch(error){document.documentElement.classList.remove('lazy-bg');}
