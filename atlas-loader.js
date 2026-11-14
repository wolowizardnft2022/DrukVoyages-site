/* Atlas loader.
  The map is far down the page and needs ~330 KB of geography data plus a ~200 KB relief
  image, so its scripts load only when the section comes within about two screens of view
  (or immediately, if IntersectionObserver is missing). Geography loads before the map.
  Once it has started, the map is handed the language the visitor is already reading.
*/
(function(){
  const section=document.getElementById('bhutan-map');
  const files=['bhutan-geography.js?v=20261113-dzongkhags','bhutan-map.js?v=20261114-photos1'];
  let started=false;
  function loadAtlas(){
    if(started)return;started=true;
    files.forEach((file,i)=>{
      const script=document.createElement('script');
      script.src=file;script.async=false;
      if(i===files.length-1)script.onload=()=>{if(typeof activeLanguage!=='undefined'&&activeLanguage!=='en')window.DRUK_SET_ATLAS_LANGUAGE?.(activeLanguage);};
      document.body.appendChild(script);
    });
  }
  if(!section||!('IntersectionObserver' in window)){loadAtlas();return;}
  const watcher=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){watcher.disconnect();loadAtlas();}},{rootMargin:'200% 0px'});
  watcher.observe(section);
})();
