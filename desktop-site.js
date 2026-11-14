/* "Desktop site" on a phone: the browser sends a desktop identity but would still lay the page out at phone width
     (width=device-width), so the mobile layout showed. A desktop browser identity on a small touch screen means the visitor
     asked for the desktop site: lay the page out 1280px wide (the full desktop layout) and let the browser zoom out to fit. */
  (function(){try{var mobile=/Mobi|Android|iPhone|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent)||(navigator.userAgentData&&navigator.userAgentData.mobile);
  var touch=navigator.maxTouchPoints>0||'ontouchstart' in window;
  if(!mobile&&touch&&Math.min(screen.width,screen.height)<600){document.documentElement.classList.add('desktop-request');document.querySelector('meta[name="viewport"]').setAttribute('content','width=1280');}}catch(e){}})();
