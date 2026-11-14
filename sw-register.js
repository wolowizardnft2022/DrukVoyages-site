/* Service worker (R-24): faster repeat visits and offline pages. Only on https or this computer; ?nosw switches it off. */
  (function(){if(!('serviceWorker' in navigator))return;if(/[?&]nosw/.test(location.search)){navigator.serviceWorker.getRegistrations().then(list=>list.forEach(r=>r.unregister())).catch(()=>{});return;}
  if(location.protocol!=='https:'&&!['localhost','127.0.0.1'].includes(location.hostname))return;
  addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));})();
