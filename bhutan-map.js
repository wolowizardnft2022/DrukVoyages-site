/* Druk Voyages map of Bhutan, in the style of a GeoLayers / After Effects map animation.
 * Geographic positions are approximate WGS84. Boundary, districts and rivers: Natural Earth 1:10m
 * (public domain) and OpenStreetMap (ODbL). Relief: Mapzen Terrain Tiles (USGS/NOAA), toned in the browser.
 * Places are for choosing a journey, not navigation.
 */
(function () {
  'use strict';
  const CULTURE = 'https://bhutan.travel/experiences-culture';
  const ADVENTURE = 'https://bhutan.travel/adventure-experiences';
  const HIKES = 'https://bhutan.travel/journal/editorial/soulful-journeys-a-step-by-step-guide';
  const geography=typeof module!=='undefined'&&module.exports?require('./bhutan-geography'):window.DRUK_GEOGRAPHY;
  if(!geography)return;
  let atlasLanguage='en';try{atlasLanguage=localStorage.getItem('druk-language')||'en';}catch(_err){}
  // Only a real language code (a stored "constructor" or "__proto__" would otherwise look up Object's own properties).
  if(!/^[a-z]{2}$/.test(atlasLanguage))atlasLanguage='en';
  const englishMapUi={categories:['All places','Monasteries','Dzongs','Culture','Valleys & passes','Treks'],come:'Come for',time:'Make time for',source:'Read about this place ↗',journey:'Explore a related journey ↗',custom:'Plan an eastern Bhutan tour ↗',count:'places',routeTour:'Cultural tour',routeTrek:'Trekking journey',all:'The whole kingdom, in perspective.'};
  let atlasText=typeof window!=='undefined'?(window.DRUK_I18N?.[atlasLanguage]?.mapUi||englishMapUi):englishMapUi;
  const categories = { all:'All places', monastery:'Monasteries', dzong:'Dzongs', culture:'Culture', nature:'Valleys & passes', trek:'Treks' };
  // Each place includes its editorial source. Point precision is deliberately
  // limited: the atlas is for choosing a journey, not locating trail junctions.
  const sites = [
    {id:'taktsang',name:"Tiger’s Nest",subtitle:'Paro Taktsang',type:'monastery',region:'Paro · Western Bhutan',lon:89.3633,lat:27.4917,journey:1,experience:'Cliffside pilgrimage',pace:'A guided day hike',desc:'A monastery clinging to the cliffs above Paro. Take the ascent slowly, pause beneath the prayer flags, and let the valley open up below you.',tip:'Allow a dedicated hiking day; the climb is steep in places.',source:ADVENTURE},
    {id:'rinpung',name:'Rinpung Dzong',subtitle:'Paro’s fortress-monastery',type:'dzong',region:'Paro · Western Bhutan',lon:89.423,lat:27.427,journey:1,experience:'Courtyards & architecture',pace:'A cultural stop',desc:'White fortress walls, timber galleries and a monastic community in the Paro valley. A rewarding introduction to Bhutan’s dzong architecture.',tip:'Explore with a guide and check which courtyards are open.',source:'https://en.wikipedia.org/wiki/Rinpung_Dzong'},
    {id:'tashichho',name:'Tashichho Dzong',subtitle:'The capital’s living heritage',type:'dzong',region:'Thimphu · Western Bhutan',lon:89.635,lat:27.4894,journey:10,experience:'Monastic & civic heritage',pace:'A cultural stop',desc:'Thimphu’s fortress-monastery brings Bhutan’s monastic and government traditions together. Look closely at the carved details and layered roofs.',tip:'Visit times depend on official and religious use.',source:'https://en.wikipedia.org/wiki/Tashichho_Dzong'},
    {id:'crafts',name:'Thimphu crafts',subtitle:'Threads of living culture',type:'culture',region:'Thimphu · Western Bhutan',lon:89.636,lat:27.477,journey:1,experience:'Weaving & traditional arts',pace:'Time to meet the makers',desc:'Discover the textiles, painting and craftsmanship that shape Bhutanese daily life. This city marker represents Thimphu’s cultural experiences, rather than a single workshop.',tip:'Ask your guide to include a weaving or artisan visit.',source:CULTURE},
    {id:'dochula',name:'Dochula Pass',subtitle:'Chortens on the ridge',type:'culture',region:'Thimphu–Punakha · Western Bhutan',lon:89.7503,lat:27.49,journey:1,experience:'108 memorial chortens',pace:'A pass-side stop or hike',desc:'A cluster of 108 chortens marks the pass between Thimphu and Punakha. Clear weather opens Himalayan views; forest paths offer a quieter way to linger.',tip:'Mountain views depend on cloud and weather.',source:'https://en.wikipedia.org/wiki/Dochula_Pass'},
    {id:'punakha',name:'Punakha Dzong',subtitle:'Palace of Great Happiness',type:'dzong',region:'Punakha · Western Bhutan',lon:89.8631,lat:27.582,journey:1,experience:'Sacred fortress architecture',pace:'A cultural stop',desc:'Founded in 1637, this landmark combines massive stone walls with richly decorated interiors. It remains an important place of Bhutanese religious and civic life.',tip:'Give yourself time for the approach and the courtyards.',source:'https://heritagesites.systems.gov.bt/application/viewheritage/1163'},
    {id:'chimi',name:'Chimi Lhakhang',subtitle:'A temple above the fields',type:'monastery',region:'Lobesa, Punakha · Western Bhutan',lon:89.8782,lat:27.527,journey:1,experience:'Village walk & temple',pace:'An easy-paced cultural visit',desc:'A hilltop temple near Lobesa in the Punakha valley. Combine the visit with a walk through the surrounding settlement and agricultural landscape.',tip:'Follow your guide’s advice on local customs.',source:'https://en.wikipedia.org/wiki/Chimi_Lhakhang'},
    {id:'gangtey',name:'Gangtey Monastery',subtitle:'Above the valley of cranes',type:'monastery',region:'Gangtey · Central Bhutan',lon:90.1652,lat:27.4843,journey:12,experience:'Nyingma Buddhist heritage',pace:'A cultural stop',desc:'Gangtey’s monastery anchors the spiritual life of the valley. Its courtyards and traditional architecture make a natural companion to a walk through Phobjikha.',tip:'Pair the monastery with the nearby nature trail.',source:'https://wangduephodrang.gov.bt/tourism/gangtey-lhakhang/'},
    {id:'phobjikha',name:'Phobjikha Valley',subtitle:'Meadows, trails & winter cranes',type:'nature',region:'Phobjikha · Central Bhutan',lon:90.1766,lat:27.4659,journey:12,experience:'Wetlands & black-necked cranes',pace:'Gentle valley walks',desc:'A broad glacial valley with farms, pine forests and wetlands. Black-necked cranes winter here, while the Gangtey nature walk offers a gentle introduction to the landscape.',tip:'Winter is the crane season; observe from a respectful distance.',source:'https://www.icimod.org/initiative/phobjikha-wetland/'},
    {id:'trongsa',name:'Trongsa Dzong',subtitle:'A fortress above the gorge',type:'dzong',region:'Trongsa · Central Bhutan',lon:90.5047,lat:27.4994,journey:7,experience:'Royal history & architecture',pace:'A cultural stop',desc:'A vast fortress-monastery overlooking the Mangde Chhu gorge. Its layered courtyards tell stories of the Wangchuck dynasty and the routes across central Bhutan.',tip:'Build time into the journey for a guided heritage visit.',source:'https://en.wikipedia.org/wiki/Trongsa_Dzong'},
    {id:'jakar',name:'Jakar Dzong',subtitle:'Overlooking the Bumthang valley',type:'dzong',region:'Bumthang · Central Bhutan',lon:90.7436,lat:27.5489,journey:7,experience:'Bumthang’s fortress heritage',pace:'A cultural stop',desc:'A hilltop dzong above Jakar, a memorable starting point for exploring Bumthang’s temples, rural settlements and sacred landscapes.',tip:'Combine the visit with a slower exploration of the valley.',source:'https://en.wikipedia.org/wiki/Jakar_Dzong'},
    {id:'kurjey',name:'Kurjey Lhakhang',subtitle:'Sacred stories of Bumthang',type:'monastery',region:'Bumthang · Central Bhutan',lon:90.7302,lat:27.5874,journey:7,experience:'Temple heritage',pace:'A quiet cultural visit',desc:'A sacred temple complex in Bumthang. Visit with a local guide who can explain the traditions and stories associated with this important place of worship.',tip:'Keep voices low and follow photography instructions.',source:'https://doc.gov.bt/wp-content/uploads/2022/11/Bumthang-book_compressed.pdf'},
    {id:'haa',name:'Lhakhang Karpo',subtitle:'Haa’s White Temple',type:'monastery',region:'Haa · Western Bhutan',lon:89.2963,lat:27.3631,journey:8,experience:'Haa valley temple heritage',pace:'A cultural stop',desc:'The White Temple is a landmark of Haa’s quieter valley. Make space for local village life as well as the temple visit.',tip:'A good companion to a journey over Chele La.',source:'https://haa.gov.bt/wp-content/uploads/2026/02/haa_geo_mapping_report.pdf'},
    {id:'chelela',name:'Chele La',subtitle:'Between Paro and Haa',type:'nature',region:'Paro–Haa · Western Bhutan',lon:89.3473,lat:27.3697,journey:8,experience:'Prayer flags & mountain views',pace:'A high pass or guided hike',desc:'A high mountain pass linking the Paro and Haa valleys. Prayer flags, cool air and forest walks give this crossing a character of its own.',tip:'Choose walks according to the day’s weather and your comfort at altitude.',source:HIKES},
    {id:'drukpath',name:'Druk Path highlands',subtitle:'A ridge-and-lake trek',type:'trek',region:'Paro–Thimphu · Western Bhutan',lon:89.515,lat:27.538,journey:3,experience:'Alpine lakes & forest ridges',pace:'A multi-day camping trek',desc:'A highland trek connecting Paro and Thimphu through forests, ridges and alpine lakes. This marker represents the trekking area, not a particular campsite.',tip:'Spring and autumn are commonly chosen; confirm trail conditions with your guide.',source:ADVENTURE},
    {id:'jangothang',name:'Jangothang',subtitle:'Jomolhari base camp',type:'trek',region:'Soe highlands · Western Bhutan',lon:89.3356,lat:27.7669,journey:9,experience:'Highland scenery & camping',pace:'A demanding multi-day trek',desc:'A highland base camp on the Jomolhari trekking journey. Mountain scenery and yak country make this a very different experience from the valley tours.',tip:'Plan acclimatisation and a route matched to your trekking experience.',source:'https://jhomolhari.com/the-trek/'},
    {id:'trashigang',name:'Trashigang Dzong',subtitle:'An eastern Bhutan discovery',type:'dzong',region:'Trashigang · Eastern Bhutan',lon:91.5514,lat:27.3368,journey:null,experience:'Eastern fortress heritage',pace:'Part of a custom eastern tour',desc:'An impressive fortress above Trashigang, founded in 1659. Explore a different side of Bhutan by making room for the towns and traditions of the east.',tip:'Ask us to create a longer journey with eastern Bhutan included.',source:'https://en.wikipedia.org/wiki/Trashigang_Dzong'},
    {id:'buddha',name:'Buddha Dordenma',subtitle:'Above the Thimphu valley',type:'culture',region:'Thimphu · Western Bhutan',lon:89.6454,lat:27.4435,journey:1,experience:'Buddhist art & valley views',pace:'A guided cultural stop',desc:'A monumental Buddha overlooking Thimphu from Kuenselphodrang. Explore the surrounding viewpoint and discover its Buddhist symbolism with a local guide.',tip:'Ask your guide about current access before visiting; restoration work may affect entry.',source:'https://bhutan.travel/journal/editorial/bhutan-is-family-friendly'},
    {id:'memorial',name:'Memorial Chorten',subtitle:'Thimphu’s place of prayer',type:'culture',region:'Thimphu · Western Bhutan',lon:89.6378,lat:27.4664,journey:1,experience:'Living Buddhist traditions',pace:'A quiet cultural visit',desc:'A white chorten with a golden spire in the heart of Thimphu. Observe daily prayer and circumambulation with your guide.',tip:'Walk clockwise and ask before photographing worshippers.',source:'https://en.wikipedia.org/wiki/Memorial_Chorten,_Thimphu'},
    {id:'museum',name:'National Museum',subtitle:'Paro’s historic watchtower',type:'culture',region:'Paro · Western Bhutan',lon:89.4256,lat:27.4287,journey:1,experience:'Bhutanese art & heritage',pace:'A museum visit',desc:'Explore Bhutanese art and cultural heritage at Ta Dzong, the historic watchtower above Rinpung Dzong in Paro.',tip:'Check opening times and photography rules with your guide.',source:'https://museums.gov.bt/our-museums/national-museum-of-bhutan'},
    {id:'gmc',name:'Gelephu Mindfulness City',subtitle:'Bhutan’s Special Administrative Region',type:'culture',region:'Gelephu · Southern Bhutan',lon:90.5,lat:26.905,journey:null,experience:'A new city in the making',pace:'A stop on a southern journey',desc:'Announced by His Majesty the King in December 2023, Gelephu Mindfulness City is a Special Administrative Region of about 2,500 km² on the border with Assam. It is planned around mindfulness, green energy and well-being, with neighbourhoods linked by forest and river corridors.',tip:'Gelephu is a road entry from India and has a domestic airport; pair a visit with the Gelephu hot springs or Royal Manas National Park.',source:'https://gmc.bt'},
  ];
  const byId=Object.fromEntries(sites.map(site=>[site.id,site]));
  const W=960,H=560,FULL=[0,0,W,H];
  const project=(lon,lat)=>[(lon-geography.bounds[0])/(geography.bounds[2]-geography.bounds[0])*W,(geography.bounds[3]-lat)/(geography.bounds[3]-geography.bounds[1])*H];
  const unproject=(x,y)=>[geography.bounds[0]+x/W*(geography.bounds[2]-geography.bounds[0]),geography.bounds[3]-y/H*(geography.bounds[3]-geography.bounds[1])];
  // The 20 dzongkhags (districts). The outlines come from Natural Earth, which uses older spellings;
  // labels use today's official names.
  const dzongkhagNames={'Tashi Yangtse':'Trashiyangtse','Lhuntshi':'Lhuentse','Bumthang':'Bumthang','Ha':'Haa','Samchi':'Samtse','Chhukha':'Chhukha','Geylegphug':'Sarpang','Shemgang':'Zhemgang','Samdrup Jongkhar':'Samdrup Jongkhar','Tashigang':'Trashigang','Thimphu':'Thimphu','Paro':'Paro','Gasa':'Gasa','Chirang':'Tsirang','Wangdi Phodrang':'Wangdue Phodrang','Daga':'Dagana','Punakha':'Punakha','Mongar':'Mongar','Tongsa':'Trongsa','Pemagatsel':'Pemagatshel'};
  // Districts shown by a newer name. Sarpang is home to Gelephu Mindfulness City, the Special Administrative Region
  // announced in December 2023; the map names it so, and its card still says Sarpang Dzongkhag.
  const dzongkhagLabels={'Sarpang':'Gelephu Mindfulness City'};
  // The longer name sits a little up and east of the district's centre, clear of the GLU airport and the Gelephu gate.
  const labelNudge={'Sarpang':[16,-14]};
  // Area centroid of a ring, in map units, so each name sits in the middle of its district.
  function centroid(ring) {
    const pts=ring.map(p=>project(...p));let area=0,cx=0,cy=0;
    for(let i=0;i<pts.length;i++){const [x0,y0]=pts[i],[x1,y1]=pts[(i+1)%pts.length],f=x0*y1-x1*y0;area+=f;cx+=(x0+x1)*f;cy+=(y0+y1)*f;}
    return area?[cx/(3*area),cy/(3*area)]:pts[0];
  }
  const dzongkhags=geography.districts.map((d,index)=>{const ring=d.rings.reduce((a,b)=>b.length>a.length?b:a);return {index,name:dzongkhagNames[d.name]||d.name,label:dzongkhagLabels[dzongkhagNames[d.name]||d.name]||null,source:d.name,rings:d.rings,at:centroid(ring)};});
  function insideRing(ring,lon,lat) {let c=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const [xi,yi]=ring[i],[xj,yj]=ring[j];if(((yi>lat)!==(yj>lat))&&lon<(xj-xi)*(lat-yi)/(yj-yi)+xi)c=!c;}return c;}
  // Which dzongkhag a point falls in (index), or -1. Outlines are Natural Earth 1:10m, so points close to a
  // district line can land on the neighbouring side.
  const dzongkhagOf=(lon,lat)=>dzongkhags.findIndex(d=>d.rings.some(r=>insideRing(r,lon,lat)));
  // More tourist spots, so every dzongkhag has places to show when it is opened. Positions are approximate.
  const spots=[['Drukgyel Dzong',89.326,27.496],['Kyichu Lhakhang',89.382,27.442],['Haa Dzong',89.283,27.385],['Tango Monastery',89.635,27.596],['Cheri Monastery',89.618,27.607],['Simtokha Dzong',89.678,27.442],['Khamsum Yulley Namgyal',89.863,27.636],['Punakha suspension bridge',89.861,27.588],['Wangdue Phodrang Dzong',89.899,27.486],['Gasa Tshachu hot springs',89.697,27.885],['Laya village',89.692,28.073],['Gasa Dzong',89.727,27.907],['Trongsa Ta Dzong',90.506,27.502],['Chendebji Chorten',90.316,27.469],['Jambay Lhakhang',90.741,27.563],['Membar Tsho (Burning Lake)',90.797,27.594],['Ura village',90.898,27.477],['Lhuentse Dzong',91.183,27.667],['Khoma weaving village',91.234,27.713],['Chorten Kora',91.497,27.611],['Bumdeling Wildlife Sanctuary',91.43,27.72],['Mongar Dzong',91.24,27.275],['Kori La pass',91.31,27.27],['Rangjung Woesel Choeling',91.655,27.358],['Merak and Sakteng',91.92,27.37],['Zangdopelri, Samdrup Jongkhar',91.505,26.82],['Yongla Goenpa',91.42,26.98],['Pemagatshel Dzong',91.42,27.04],['Royal Manas National Park',90.95,26.85],['Zhemgang Dzong',90.66,27.22],['Gelephu Tshachu hot springs',90.48,26.93],['Project 108 chortens, Mau Chhu',90.455,26.905],['Tsirang Dzong',90.12,27.02],['Daga Trashiyangtse Dzong',89.88,27.07],['Kharbandi Goenpa',89.4,26.87],['Chukha Dzong',89.54,27.11],['Samtse Dzong',89.1,26.9]].map(([name,lon,lat])=>({name,lon,lat,dz:dzongkhagOf(lon,lat)}));
  const siteDzongkhag=Object.fromEntries(sites.map(site=>[site.id,dzongkhagOf(site.lon,site.lat)]));
  const placesIn=index=>({sites:sites.filter(site=>siteDzongkhag[site.id]===index).sort((a,b)=>a.lon-b.lon),spots:spots.filter(spot=>spot.dz===index).sort((a,b)=>a.lon-b.lon)});
  // Camera view that fits a dzongkhag with a margin.
  // The view that fills the frame with one dzongkhag. The SVG slices to its frame, so a frame narrower than
  // 960:560 (aspect = frame width / height) shows less width, and the view widens to keep the district whole.
  function dzongkhagView(index,aspect=W/H) {
    const pts=dzongkhags[index].rings.flat().map(p=>project(...p));
    const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
    const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),pad=1.15;
    const dx=(x1-x0)*pad,dy=(y1-y0)*pad;
    const width=aspect<W/H?Math.max(dy,dx/aspect)*W/H:Math.max(dx,dy*aspect);
    const w=Math.min(W,Math.max(width,W/8)),h=w*H/W,cx=(x0+x1)/2,cy=(y0+y1)/2;
    return [Math.min(Math.max(cx-w/2,0),W-w),Math.min(Math.max(cy-h/2,0),H-h),w,h];
  }
  // Road entry points from India on the southern border, each marked with a small gate in Bhutanese style.
  // [name, lon, lat, label side]: the eastern label sits to the left so it stays inside the frame.
  const gates=[['Phuentsholing',89.392,26.852,1],['Gelephu',90.512,26.858,1],['Samdrup Jongkhar',91.506,26.792,-1]];
  // Bhutan's four airports: [IATA code, place name, lon, lat, label dx, label dy, anchor].
  const airports=[['PBH','Paro',89.4246,27.4032,9,14,'start'],['BUT','Bathpalathang',90.7471,27.5622,-9,-6,'end'],['YON','Yonphula',91.5145,27.2564,9,12,'start'],['GLU','Gelephu',90.4647,26.8846,-9,4,'end']];
  // Illustrated domestic flights, both ways on each route, so every airport has departures.
  const flightRoutes=[['PBH','BUT'],['PBH','YON'],['PBH','GLU'],['GLU','BUT']];
  const airportAt=code=>{const a=airports.find(row=>row[0]===code);return project(a[2],a[3]);};
  // A route is a quadratic arc bowed to the north (smaller y), like a flight line on a broadcast map.
  function flightArc(from,to) {
    const p0=airportAt(from),p1=airportAt(to);
    const dx=p1[0]-p0[0],dy=p1[1]-p0[1],len=Math.hypot(dx,dy);
    let nx=-dy/len,ny=dx/len;if(ny>0){nx=-nx;ny=-ny;}
    const c=[(p0[0]+p1[0])/2+nx*len*.22,(p0[1]+p1[1])/2+ny*len*.22];
    return {p0,c,p1,len,d:`M${p0.map(n=>n.toFixed(1)).join(' ')} Q${c.map(n=>n.toFixed(1)).join(' ')} ${p1.map(n=>n.toFixed(1)).join(' ')}`};
  }
  // Point and heading (degrees, 0 = north) on an arc at t (0–1).
  function arcPoint(arc,t) {
    const u=1-t,{p0,c,p1}=arc;
    const x=u*u*p0[0]+2*u*t*c[0]+t*t*p1[0],y=u*u*p0[1]+2*u*t*c[1]+t*t*p1[1];
    const tx=2*u*(c[0]-p0[0])+2*t*(p1[0]-c[0]),ty=2*u*(c[1]-p0[1])+2*t*(p1[1]-c[1]);
    return {x,y,heading:Math.atan2(ty,tx)*180/Math.PI+90};
  }
  // Where a route's plane is at clock time ms: out, a pause on the ground, back, a pause. Takeoff and
  // landing ease in and out. Returns null while the plane is on the ground.
  function flightState(arc,ms,offset=0) {
    const leg=3600+arc.len*16,rest=1400,cycle=2*(leg+rest),u=((ms+offset)%cycle+cycle)%cycle;
    const glide=t=>(1-Math.cos(Math.PI*t))/2;
    if(u<leg)return {t:glide(u/leg),forward:true};
    if(u>=leg+rest&&u<2*leg+rest)return {t:glide((u-leg-rest)/leg),forward:false};
    return null;
  }
  // Place photos. Most places have their own; the rest borrow a photo of the same kind of place from the site's
  // gallery and are marked as illustrative (true). Gelephu Mindfulness City is still being built, so it shows the
  // official rendering, marked as an artist's impression ('render').
  const photos={
    taktsang:['maps-image/dzongs_of_bhutan/Paro Tasktsang.jpg'],rinpung:['maps-image/dzongs_of_bhutan/PARO_RINPONG_DZONG.jpg'],tashichho:['maps-image/dzongs_of_bhutan/TASHICHHO_DZONG.jpg'],punakha:['maps-image/dzongs_of_bhutan/PUNAKHA_DZONG.jpg'],trongsa:['maps-image/dzongs_of_bhutan/TRONGSA_DZONG.jpg'],jakar:['maps-image/Jakar Dzong.jpg'],trashigang:['maps-image/dzongs_of_bhutan/TRASHIGANG_DZONG.jpg'],
    phobjikha:['bhutannaturephotography-common-cranes-6922803.jpg',true],gangtey:['raimond-klavins-gi7tWn0F58s-unsplash.jpg',true],chimi:['maps-image/chimi-lhakhang.jpg'],kurjey:['pema-gyamtsho-d5L8nPxssTI-unsplash.jpg',true],haa:['raimond-klavins-gi7tWn0F58s-unsplash.jpg',true],
    dochula:['maps-image/Dochula-pass.jpg'],chelela:['maps-image/Chele-la.jpeg'],jangothang:['nithil-dennis-_dt9MgebRcQ-unsplash.jpg',true],drukpath:['raul-taciu-ZU6Gd12DHbU-unsplash.jpg',true],
    crafts:['daniel-grandfield-Hx-jdJxVHzs-unsplash.jpg',true],museum:['maps-image/national museum.avif'],buddha:['maps-image/buddha-dordenma.jpg'],memorial:['maps-image/Memorial_Chorten,_Thimphu.jpg'],
    gmc:['maps-image/Gelephu Mindfulness City.jpg','render']
  };
  // Tourist spots with their own photo (img/maps-image): these open a photo card inside their dzongkhag.
  const spotPhotos={'Drukgyel Dzong':'Drukgyel_Dzong.jpg','Khamsum Yulley Namgyal':'Khamsum-yulley-namgyel.jpg','Simtokha Dzong':'dzongs_of_bhutan/SIMTOKHA_DZONG.jpg','Wangdue Phodrang Dzong':'dzongs_of_bhutan/WANGDUEPHODRANG_DZONG.jpg','Gasa Dzong':'dzongs_of_bhutan/GASA_DZONG.jpg','Lhuentse Dzong':'dzongs_of_bhutan/LHUNTSE_DZONG.webp','Pemagatshel Dzong':'dzongs_of_bhutan/PEMAGATSHEL_DZONG.jpg','Daga Trashiyangtse Dzong':'dzongs_of_bhutan/DAGA_DZONG.avif','Ura village':'ura-valley.jpg','Kyichu Lhakhang':'kyichu lhakhang.webp','Rangjung Woesel Choeling':'Rangjung Woesel Choeling.jpg','Merak and Sakteng':'Merak Sakteng Brokpa dance.jpg',
    'Haa Dzong':'Haa Dzong.jpg','Tango Monastery':'Tango Monastery.jpg','Cheri Monastery':'Cheri Monastery.jpg','Punakha suspension bridge':'Punakha suspension bridge.jpg','Trongsa Ta Dzong':'Trongsa Ta Dzong.jpg','Chendebji Chorten':'Chendebji Chorten.jpg','Jambay Lhakhang':'Jambay Lhakhang.jpg','Membar Tsho (Burning Lake)':'Membar Tsho Burning Lake.jpg','Khoma weaving village':'Khoma weaving village.jpg','Chorten Kora':'Chorten Kora.jpg','Bumdeling Wildlife Sanctuary':'Bumdeling Wildlife Sanctuary.jpg','Royal Manas National Park':'Royal Manas National Park.jpg','Tsirang Dzong':'Tsirang Dzong.jpg','Kharbandi Goenpa':'Kharbandi Goenpa.jpg','Chukha Dzong':'Chukha Dzong.jpg','Kori La pass':'Kori La pass.jpg','Laya village':'Laya village.jpg','Zhemgang Dzong':'Zhemgang Dzong.jpg'};
  // Photos from Wikimedia Commons: photographer, licence and file page, shown as a credit on the photo (their licences
  // require attribution). Photos the owner supplied have no entry.
  const photoCredits={
    'Haa Dzong.jpg':{"by": "Christopher J. Fynn", "licence": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Haa-Dzong_Bhutan.jpg"},
    'Tango Monastery.jpg':{"by": "Jean-Marie Hullot", "licence": "CC BY 3.0", "page": "https://commons.wikimedia.org/wiki/File:TangoMonastery.jpg"},
    'Cheri Monastery.jpg':{"by": "Christopher J. Fynn", "licence": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Cheri_Monastery_Bhutan-070317.JPG"},
    'Punakha suspension bridge.jpg':{"by": "Doug Knuth", "licence": "CC BY-SA 2.0", "page": "https://commons.wikimedia.org/wiki/File:Punakha_3-70,_suspension_bridge.jpg"},
    'Trongsa Ta Dzong.jpg':{"by": "Christopher J. Fynn", "licence": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Trongtsa_Ta_Dzong.jpg"},
    'Chendebji Chorten.jpg':{"by": "Arian Zwegers", "licence": "CC BY 2.0", "page": "https://commons.wikimedia.org/wiki/File:Chendebji_Chorten_(15221785034).jpg"},
    'Jambay Lhakhang.jpg':{"by": "Gerd Eichmann", "licence": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Bumthang-Jambay_Lhakhang-06-2015-gje.jpg"},
    'Membar Tsho Burning Lake.jpg':{"by": "Doctor 17", "licence": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Membartsho,_the_Burning_Lake,_in_Tang_Valley,_central_Bhutan.jpg"},
    'Khoma weaving village.jpg':{"by": "Ugyenlhendup", "licence": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Khoma_village,_Lhuntse_Dzongkha.jpg"},
    'Chorten Kora.jpg':{"by": "Arian Zwegers", "licence": "CC BY 2.0", "page": "https://commons.wikimedia.org/wiki/File:Tashi_Yangtse,_Chorten_Kora_(15846038265).jpg"},
    'Bumdeling Wildlife Sanctuary.jpg':{"by": "Christopher J. Fynn", "licence": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Bridge_to_Bumdeling_Sanctuary.jpg"},
    'Royal Manas National Park.jpg':{"by": "DEBANUTOSH", "licence": "CC0", "page": "https://commons.wikimedia.org/wiki/File:Manas_River_flowing_in_Bhutan.jpg"},
    'Tsirang Dzong.jpg':{"by": "Christopher J. Fynn", "licence": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Dzong_at_Damphu_Tsirang_Bhutan.jpg"},
    'Kharbandi Goenpa.jpg':{"by": "Bernard Gagnon", "licence": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Kharbandi_Gompa,_Phuentsholing_01.jpg"},
    'Chukha Dzong.jpg':{"by": "Christopher J. Fynn", "licence": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Chukha_Dzong.jpg"},
    'Rangjung Woesel Choeling.jpg':{"by": "Christopher J. Fynn", "licence": "CC BY 3.0", "page": "https://commons.wikimedia.org/wiki/File:Zangdog-Pelri-Temple_Rangjung_Trashigang_Bhutan.JPG"},
    'Merak Sakteng Brokpa dance.jpg':{"by": "Tridivadurjoy", "licence": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Brokpa_Cultural_Dance.jpg"},
    'Kori La pass.jpg':{"by": "Franzfoto", "licence": "CC BY-SA 3.0", "page": "https://commons.wikimedia.org/wiki/File:Distrikt_Mongar_-_Korela_Pass_2400_m.%C3%BC.NN..JPG"},
    'Laya village.jpg':{"by": "Sabine Blankevoort", "licence": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Traditional_parade_in_Bhutan.jpg"},
    'Zhemgang Dzong.jpg':{"by": "Kheng Singye Dorji", "licence": "CC BY-SA 4.0", "page": "https://commons.wikimedia.org/wiki/File:Zhemgang2.jpg"}
  };;
  spots.forEach(spot=>{if(spotPhotos[spot.name]){spot.photo=`img/web/maps-image/${spotPhotos[spot.name]}`;spot.credit=photoCredits[spotPhotos[spot.name]]||null;}});
  // "© Photographer · CC BY-SA 4.0", linked to the photo's Commons page.
  const photoCredit=credit=>{if(!credit)return null;const a=make('a','geo-photo-credit',`© ${credit.by} · ${credit.licence}`);a.href=credit.page;a.target='_blank';a.rel='noopener noreferrer';return a;};
  const photoFor=id=>photos[id]?{src:`img/web/${photos[id][0]}`,illustrative:photos[id][1]===true,rendering:photos[id][1]==='render'}:null;
  // The label on a borrowed photo or a rendering; null for a photo of the place itself.
  const photoLabel=picture=>picture.rendering?tr('mapPhotoRendering'):picture.illustrative?tr('mapPhotoIllustrative'):null;
  const photoAlt=(picture,name)=>picture.illustrative?'':picture.rendering?`${name} (${tr('mapPhotoRendering')})`:name;
  // The first sentence of a description, for the short text on the map (works for CJK full stops too).
  const shortText=text=>String(text||'').split(/(?<=[.!?。！？])\s*/)[0];
  // The camera tour flies west to east through the signature places.
  const tour=['taktsang','tashichho','dochula','punakha','phobjikha','trongsa','jakar','trashigang'];
  const regions=['west','central','east'];
  const regionOf=site=>site.lon<90.05?'west':site.lon<91?'central':'east';
  const placesByRegion=()=>regions.map(region=>({region,sites:sites.filter(site=>regionOf(site)===region).sort((a,b)=>a.lon-b.lon)}));
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  // A view is an SVG viewBox [x, y, width, height] that always keeps the map's 960:560 ratio and stays on the map.
  function viewAt(cx,cy,width) {const w=clamp(width,W/4,W),h=w*H/W;return [clamp(cx-w/2,0,W-w),clamp(cy-h/2,0,H-h),w,h];}
  // Inside an open dzongkhag the camera can go closer (10×) and pan; it never leaves the map.
  const MIN_DETAIL_WIDTH=W/10;
  function zoomView(current,factor,fx,fy,minWidth=MIN_DETAIL_WIDTH) {
    const w=clamp(current[2]/factor,minWidth,W),h=w*H/W,s=w/current[2];
    return [clamp(fx-(fx-current[0])*s,0,W-w),clamp(fy-(fy-current[1])*s,0,H-h),w,h];
  }
  const panView=(current,dx,dy)=>[clamp(current[0]+dx,0,W-current[2]),clamp(current[1]+dy,0,H-current[3]),current[2],current[3]];
  // Detail (OpenStreetMap roads, towns and villages, from bhutan-detail.js) that lies in one dzongkhag.
  function detailIn(index,data) {
    const d=dzongkhags[index];
    if(!d||!data)return {towns:[],villages:[]};
    const inside=([,lon,lat])=>d.rings.some(ring=>insideRing(ring,lon,lat));
    const places=data.places.filter(inside);
    return {towns:places.filter(p=>p[3]===1),villages:places.filter(p=>p[3]===2)};
  }
  function viewFor(id,zoom=2.6) {const site=byId[id];if(!site)return FULL.slice();const [x,y]=project(site.lon,site.lat);return viewAt(x,y,W/zoom);}
  const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  // Camera move between two views at progress t (0–1). Like a GeoLayers camera, a long hop between two
  // close-ups pulls back mid-flight so the viewer keeps their bearings, then pushes in again.
  function flightView(from,to,t) {
    const e=ease(clamp(t,0,1));
    const c0=[from[0]+from[2]/2,from[1]+from[3]/2],c1=[to[0]+to[2]/2,to[1]+to[3]/2];
    const distance=Math.hypot(c1[0]-c0[0],c1[1]-c0[1]);
    const lift=Math.max(0,Math.min(W-Math.max(from[2],to[2]),distance*.7));
    const width=from[2]+(to[2]-from[2])*e+lift*Math.sin(Math.PI*e);
    return viewAt(c0[0]+(c1[0]-c0[0])*e,c0[1]+(c1[1]-c0[1])*e,width);
  }
  const formatCoord=(lon,lat)=>`${lat.toFixed(2)}° N · ${lon.toFixed(2)}° E`;
  // Scale bar: the largest round distance that fits in about 120 screen pixels at this zoom.
  // One degree of longitude at Bhutan's latitude (27.5° N) is about 98.7 km.
  function scaleBar(viewWidth,stageWidth) {
    const pxPerKm=stageWidth/viewWidth*W/(geography.bounds[2]-geography.bounds[0])/98.7;
    const km=[100,50,20,10,5].find(d=>d*pxPerKm<=130)||5;
    return {km,px:km*pxPerKm};
  }
  const api={sites,categories,dzongkhags,dzongkhagOf,spots,spotPhotos,placesIn,dzongkhagView,zoomView,panView,detailIn,gates,flightRoutes,flightArc,arcPoint,flightState,airports,photoFor,shortText,tour,regions,geography,project,unproject,regionOf,placesByRegion,viewAt,viewFor,flightView,ease,formatCoord,scaleBar};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(typeof document==='undefined')return;
  const root=document.getElementById('bhutanGeo');
  if(!root)return;

  const $=id=>document.getElementById(id);
  const NS='http://www.w3.org/2000/svg';
  const svg=$('geoSvg'),card=$('geoCard'),list=$('geoPlaces'),playButton=$('geoPlay'),resetButton=$('geoReset'),coord=$('geoCoord'),scale=$('geoScale'),flightButton=$('geoFlights');
  const reducedMotion=Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  const tr=(key,vars={})=>window.DRUK_L10N?window.DRUK_L10N.text(key,vars,atlasLanguage):key;
  const localSite=site=>site&&window.DRUK_L10N?window.DRUK_L10N.site(site,atlasLanguage):site;
  const placeName=name=>window.DRUK_L10N?.place?window.DRUK_L10N.place(name,atlasLanguage):name;
  const dzName=d=>placeName(d.label||d.name);
  const categoryLabel=type=>atlasText.categories?.[Object.keys(categories).indexOf(type)]||categories[type];
  const hudName=root.querySelector('.geo-hud-name'),hudDefault=hudName.textContent;
  // A visitor who paused the flights keeps them paused on later visits (R-24); browser storage only, no cookie.
  let flightsPaused=false;try{flightsPaused=typeof localStorage!=='undefined'&&localStorage.getItem('druk-map-flights')==='paused';}catch(_err){}
  let openDz=null,overlayScale=1,flightsOn=!reducedMotion&&!flightsPaused,flightsVisible=false,flightClock=0,flightFrame=0,flightLast=0;
  let detailData=window.DRUK_DETAIL||null,detailLoading=null,detailNodes=[],roadsDrawn=false,settled=FULL.slice();
  let selectedSpot=null;
  let view=FULL.slice(),flight=0,selected=null,hovered=null,touring=false,tourStep=-1,tourTimer=null;

  function el(tag,attrs={},text) {const node=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([key,value])=>node.setAttribute(key,String(value)));if(text!==undefined)node.textContent=text;return node;}
  function make(tag,className,text) {const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}
  const linePath=points=>points.map((p,i)=>`${i?'L':'M'}${project(...p).map(n=>n.toFixed(1)).join(' ')}`).join(' ');
  const outline=linePath(geography.boundary)+'Z';

  // Layers, back to front: toned relief (dim outside Bhutan, lit inside), district lines, rivers,
  // the glowing border, neighbour names, towns, place pins, the callout, then a vignette.
  const defs=el('defs');
  const clip=el('clipPath',{id:'geoClip'});clip.appendChild(el('path',{d:outline}));
  const tone=el('filter',{id:'geoTone','color-interpolation-filters':'sRGB'});
  tone.appendChild(el('feColorMatrix',{type:'saturate',values:0}));
  const transfer=el('feComponentTransfer');
  [['feFuncR','.02 .05 .17 .56 .96'],['feFuncG','.02 .045 .14 .45 .84'],['feFuncB','.03 .05 .12 .35 .7']].forEach(([fn,values])=>transfer.appendChild(el(fn,{type:'table',tableValues:values})));
  tone.appendChild(transfer);
  const glow=el('filter',{id:'geoGlow',x:'-5%',y:'-5%',width:'110%',height:'110%'});glow.appendChild(el('feGaussianBlur',{stdDeviation:5}));
  const vignette=el('radialGradient',{id:'geoVignette',cx:'50%',cy:'50%',r:'70%'});
  vignette.append(el('stop',{offset:'55%','stop-color':'#08080a','stop-opacity':0}),el('stop',{offset:'100%','stop-color':'#08080a','stop-opacity':.85}));
  const dzClip=el('clipPath',{id:'geoDzClip'}),dzClipPath=el('path');dzClip.appendChild(dzClipPath);
  defs.append(clip,dzClip,tone,glow,vignette);
  svg.appendChild(defs);
  const relief='img/web/maps/bhutan-relief.webp',SATELLITE='img/web/maps/bhutan-satellite.webp',DETAIL_SCRIPT='bhutan-detail.js?v=20261114-villages';
  svg.appendChild(el('rect',{x:-W,y:-H,width:W*3,height:H*3,fill:'#0a0a0c'}));
  svg.appendChild(el('image',{href:relief,x:0,y:0,width:W,height:H,filter:'url(#geoTone)',class:'geo-relief-out',preserveAspectRatio:'none'}));
  const land=el('g',{'clip-path':'url(#geoClip)',class:'geo-land'});
  land.append(el('image',{href:relief,x:0,y:0,width:W,height:H,filter:'url(#geoTone)',preserveAspectRatio:'none'}),el('rect',{x:0,y:0,width:W,height:H,class:'geo-land-tint'}));
  svg.appendChild(land);
  // Detail inside an open dzongkhag: satellite imagery under OpenStreetMap roads, clipped to the district.
  const satLayer=el('g',{class:'geo-sat','clip-path':'url(#geoDzClip)','aria-hidden':true}),satImage=el('image',{x:0,y:0,width:W,height:H,preserveAspectRatio:'none'});
  satLayer.appendChild(satImage);svg.appendChild(satLayer);
  // Each dzongkhag is one shape with a visible border; clicking it opens that dzongkhag. Keyboard users get
  // the same through the dzongkhag buttons under the map, so the shapes stay out of the tab order.
  const districts=el('g',{class:'geo-districts','aria-hidden':true});
  const dzShapes=dzongkhags.map(d=>{const shape=el('path',{d:d.rings.map(r=>linePath(r)+'Z').join(' '),'data-dz':d.index});shape.addEventListener('click',()=>{stopTour();if(root.classList.contains('is-enlarged'))openDzongkhag(d.index);else liftDzongkhag(d.index);});districts.appendChild(shape);return shape;});
  // Hover lights one dzongkhag deeply; its shape moves to the top so its whole border shows over its neighbours.
  let hotDz=-1;
  districts.addEventListener('pointerover',e=>{const i=Number(e.target.dataset?.dz);if(i>=0)hotDzongkhag(i);});
  districts.addEventListener('pointerleave',()=>hotDzongkhag(-1));
  function hotDzongkhag(index){if(index===hotDz)return;hotDz=index;dzShapes.forEach((s,i)=>s.classList.toggle('is-hot',i===index));if(dzShapes[index])districts.appendChild(dzShapes[index]);townNodes.forEach((t,i)=>t.g.classList.toggle('is-hot',i===index));}
  const rivers=el('g',{class:'geo-rivers','aria-hidden':true});
  geography.rivers.forEach(r=>rivers.appendChild(el('path',{d:linePath(r),pathLength:1})));
  const roadLayer=el('g',{class:'geo-roads','clip-path':'url(#geoDzClip)','aria-hidden':true});
  svg.append(districts,rivers,roadLayer);
  svg.appendChild(el('path',{d:outline,class:'geo-border-glow',filter:'url(#geoGlow)',pathLength:1,'aria-hidden':true}));
  svg.appendChild(el('path',{d:outline,class:'geo-border',pathLength:1,'aria-hidden':true}));
  // Opening a dzongkhag darkens everything outside it (even-odd mask) and lights its border.
  const dzMask=el('path',{class:'geo-dz-mask','fill-rule':'evenodd','aria-hidden':true});
  const dzGlow=el('path',{class:'geo-dz-glow',filter:'url(#geoGlow)','aria-hidden':true}),dzLine=el('path',{class:'geo-dz-line','aria-hidden':true});
  svg.append(dzMask,dzGlow,dzLine);
  const neighbours=el('g',{class:'geo-neighbours','aria-hidden':true});
  const tibet=el('text',{x:250,y:40,'text-anchor':'middle'}),india=el('text',{x:470,y:540,'text-anchor':'middle'});neighbours.append(tibet,india);svg.appendChild(neighbours);
  const dzongkhagLayer=el('g',{class:'geo-dzongkhags','aria-hidden':true}),flightLayer=el('g',{class:'geo-flights','aria-hidden':true}),gateLayer=el('g',{class:'geo-gates'}),airportLayer=el('g',{class:'geo-airports'}),spotLayer=el('g',{class:'geo-spots','aria-hidden':true}),pinLayer=el('g',{class:'geo-pins'}),planeLayer=el('g',{class:'geo-planes','aria-hidden':true}),callout=el('g',{class:'geo-callout','aria-hidden':true});
  const detailLayer=el('g',{class:'geo-detail','aria-hidden':true});
  svg.append(dzongkhagLayer,detailLayer,flightLayer,gateLayer,airportLayer,spotLayer,pinLayer,planeLayer,callout);
  svg.appendChild(el('rect',{x:-W,y:-H,width:W*3,height:H*3,fill:'url(#geoVignette)',class:'geo-vignette','pointer-events':'none'}));

  // Dzongkhag names: faint tracked capitals in the middle of each district.
  // Tourist spots: small diamonds with names, shown only inside the open dzongkhag.
  const spotNodes=spots.map(spot=>{const [x,y]=project(spot.lon,spot.lat);const g=el('g',{class:'geo-spot','data-x':x,'data-y':y,'data-dz':spot.dz});const label=el('text',{x:8,y:3.5});g.append(el('rect',{x:-3,y:-3,width:6,height:6,transform:'rotate(45)'}),label);if(spot.photo){g.classList.add('has-photo');g.addEventListener('click',()=>{stopTour();selectSpot(spot);});}spotLayer.appendChild(g);return {g,label,spot};});
  const townNodes=dzongkhags.map(({name,label:shown,at})=>{const [dx,dy]=labelNudge[name]||[0,0];const g=el('g',{'data-x':at[0]+dx,'data-y':at[1]+dy});const label=el('text',{'text-anchor':'middle',y:3});g.appendChild(label);dzongkhagLayer.appendChild(g);return {g,label,name:shown||name};});
  // Border gates: a small gate in Bhutanese style (white pillars, a rust kemar band, a two-tier saffron roof
  // with upturned eaves and a gilded finial) where the road comes up from India, with the town's name.
  const gateNodes=gates.map(([name,lon,lat,side])=>{
    const [x,y]=project(lon,lat);
    const g=el('g',{role:'img','data-x':x,'data-y':y,class:'geo-gate'});
    const tip=el('title');
    const road=el('path',{class:'geo-gate-road',d:'M0 2 L0 26'});
    const arrow=el('path',{class:'geo-gate-arrow',d:'M-3 17 L0 13 L3 17'});
    const art=el('g',{class:'geo-gate-art'});
    art.append(
      el('rect',{class:'geo-gate-step',x:-10,y:-1,width:20,height:2}),
      el('rect',{class:'geo-gate-pillar',x:-8,y:-11,width:2.6,height:10}),
      el('rect',{class:'geo-gate-pillar',x:5.4,y:-11,width:2.6,height:10}),
      el('rect',{class:'geo-gate-band',x:-9,y:-13.4,width:18,height:2.6}),
      el('path',{class:'geo-gate-roof',d:'M-12.5 -12.6 Q-10.5 -13.4 -9.6 -15.2 L9.6 -15.2 Q10.5 -13.4 12.5 -12.6 Z'}),
      el('path',{class:'geo-gate-roof',d:'M-8.2 -15.2 Q-6.8 -16 -6 -18 L6 -18 Q6.8 -16 8.2 -15.2 Z'}),
      el('path',{class:'geo-gate-finial',d:'M-1 -18 L-1 -20.4 Q0 -22.4 1 -20.4 L1 -18 Z'})
    );
    const anchor=side>0?'start':'end';
    const label=el('text',{class:'geo-gate-name',x:side*14,y:-6,'text-anchor':anchor});
    const sub=el('text',{class:'geo-gate-sub',x:side*14,y:4,'text-anchor':anchor});
    g.append(tip,road,arrow,art,label,sub);
    gateLayer.appendChild(g);
    return {g,tip,label,sub,name};
  });
  // Flight routes (faint dashed arcs), the drawn trail behind each plane, and the planes themselves.
  const flights=flightRoutes.map(([from,to],i)=>{
    const arc=flightArc(from,to);
    flightLayer.append(el('path',{class:'geo-flight-route',d:arc.d}));
    const trail=el('path',{class:'geo-flight-trail',d:arc.d,pathLength:1,'stroke-dasharray':'0 1'});
    flightLayer.appendChild(trail);
    const plane=el('g',{class:'geo-plane',opacity:0});
    plane.append(el('path',{class:'geo-plane-shadow',d:'M0 -4.6 L0.9 -1.2 L4.4 0.9 L4.4 1.8 L0.9 0.9 L0.7 3.1 L1.9 4.1 L1.9 4.8 L0 4.2 L-1.9 4.8 L-1.9 4.1 L-0.7 3.1 L-0.9 0.9 L-4.4 1.8 L-4.4 0.9 L-0.9 -1.2 Z',transform:'translate(1.6 2.4)'}),el('path',{class:'geo-plane-body',d:'M0 -4.6 L0.9 -1.2 L4.4 0.9 L4.4 1.8 L0.9 0.9 L0.7 3.1 L1.9 4.1 L1.9 4.8 L0 4.2 L-1.9 4.8 L-1.9 4.1 L-0.7 3.1 L-0.9 0.9 L-4.4 1.8 L-4.4 0.9 L-0.9 -1.2 Z'}));
    planeLayer.appendChild(plane);
    return {arc,trail,plane,offset:i*4300};
  });
  // Airports: a plane in a dark disc with the IATA code. Each is an image with its full name for screen
  // readers and a native tooltip.
  const airportNodes=airports.map(([code,name,lon,lat,dx,dy,anchor])=>{
    const [x,y]=project(lon,lat);
    const g=el('g',{role:'img','data-x':x,'data-y':y,'data-airport':code});
    const tip=el('title');
    g.append(tip,el('circle',{r:6.5,class:'geo-airport-disc'}),el('path',{class:'geo-airport-plane',d:'M0 -4.6 L0.9 -1.2 L4.4 0.9 L4.4 1.8 L0.9 0.9 L0.7 3.1 L1.9 4.1 L1.9 4.8 L0 4.2 L-1.9 4.8 L-1.9 4.1 L-0.7 3.1 L-0.9 0.9 L-4.4 1.8 L-4.4 0.9 L-0.9 -1.2 Z'}),el('text',{x:dx,y:dy,'text-anchor':anchor},code));
    airportLayer.appendChild(g);
    return {g,tip,code,name};
  });
  // Pins pop in west to east; --i staggers the CSS animation.
  const pins=sites.slice().sort((a,b)=>a.lon-b.lon).map((site,i)=>{
    const [x,y]=project(site.lon,site.lat);
    const g=el('g',{class:'geo-pin','data-site':site.id,role:'button',tabindex:0,style:`--i:${i}`});
    const body=el('g',{class:'geo-pin-body'});body.append(el('circle',{class:'geo-pin-pulse',r:11}),el('circle',{class:'geo-pin-halo',r:7}),el('circle',{class:'geo-pin-dot',r:3.6}));
    const label=el('text',{class:'geo-pin-label',x:11,y:4,'aria-hidden':true});
    g.append(body,label);
    g.addEventListener('click',()=>{stopTour();select(site.id);});
    g.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();stopTour();select(site.id);}});
    g.addEventListener('pointerenter',()=>{hovered=site.id;drawCallout();});
    g.addEventListener('pointerleave',()=>{hovered=null;drawCallout();});
    g.addEventListener('focus',()=>{hovered=site.id;drawCallout();});
    g.addEventListener('blur',()=>{hovered=null;drawCallout();});
    pinLayer.appendChild(g);
    return {site,g,x,y,label};
  });

  // Labels keep one on-screen size while the camera zooms: each is scaled by the view width.
  // Small frames get larger labels (up to 2×) so names stay readable on a phone.
  function placeOverlays() {
    const k=view[2]/W*(stageWidth?clamp(860/stageWidth,1,2):1);
    pins.forEach(pin=>pin.g.setAttribute('transform',`translate(${pin.x.toFixed(1)} ${pin.y.toFixed(1)}) scale(${k.toFixed(4)})`));
    overlayScale=k;
    [...townNodes,...gateNodes,...airportNodes,...spotNodes,...detailNodes].forEach(t=>t.g.setAttribute('transform',`translate(${t.g.getAttribute('data-x')} ${t.g.getAttribute('data-y')}) scale(${k.toFixed(4)})`));
    const id=callout.getAttribute('data-site');
    if(id){const [x,y]=project(byId[id].lon,byId[id].lat);callout.setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${k.toFixed(4)})`);}
    positionPhoto();
  }
  function setView(next) {
    view=next;
    svg.setAttribute('viewBox',next.map(n=>n.toFixed(2)).join(' '));
    placeOverlays();
    const [lon,lat]=selected?[byId[selected].lon,byId[selected].lat]:unproject(next[0]+next[2]/2,next[1]+next[3]/2);
    coord.textContent=formatCoord(lon,lat);
    if(stageWidth){const bar=scaleBar(next[2],stageWidth);scale.firstElementChild.style.width=`${bar.px.toFixed(0)}px`;scale.lastElementChild.textContent=`${bar.km} km`;}
  }
  // The SVG fills its frame (preserveAspectRatio slice), so on a taller phone frame the height decides
  // the zoom; express that as the width a 960:560 frame would need.
  const frameWidth=(width,height)=>Math.max(width,height*W/H);
  let stageWidth=frameWidth(svg.clientWidth||0,svg.clientHeight||0),boxWidth=svg.clientWidth||0;
  // The photo card rides on the map only where there is room for it beside a pin; on phones the guide
  // card right below the map carries the photo instead.
  const photoOnMap=()=>boxWidth>=640;
  if('ResizeObserver' in window)new ResizeObserver(entries=>{const box=entries[0].contentRect;boxWidth=box.width;stageWidth=frameWidth(box.width,box.height);root.classList.toggle('has-map-photo',photoOnMap());drawCallout();setView(view);if(openDz!==null)relayoutSoon();}).observe(svg);
  function flyTo(target,duration=1500) {
    cancelAnimationFrame(flight);settled=target.slice();
    if(reducedMotion||!window.requestAnimationFrame){setView(target);return;}
    const from=view.slice(),start=performance.now();
    const step=now=>{const t=(now-start)/duration;setView(flightView(from,target,t));if(t<1)flight=requestAnimationFrame(step);};
    flight=requestAnimationFrame(step);
  }

  // The callout: a leader line rises from the pin to the place name, GeoLayers lower-third style.
  // It flips to the left near the map's right edge so it never runs off the frame.
  // While the selected place shows its photo card, its callout is just the ring; hovering another pin
  // still names that pin.
  function drawCallout() {
    const id=hovered||selected;
    callout.replaceChildren();
    if(!id){callout.removeAttribute('data-site');return;}
    const site=localSite(byId[id]);
    if(id===selected&&photoOnMap()){callout.append(el('circle',{class:'geo-callout-ring',r:9}));callout.setAttribute('data-site',id);placeOverlays();return;}
    const [x]=project(site.lon,site.lat);
    const screenX=(x-view[0])/view[2];
    const dir=screenX>.68?-1:1;
    const name=el('text',{class:'geo-callout-name',x:dir*44,y:-40,'text-anchor':dir>0?'start':'end'},site.name);
    const sub=el('text',{class:'geo-callout-sub',x:dir*44,y:-24,'text-anchor':dir>0?'start':'end'},site.subtitle);
    const leader=el('path',{class:'geo-callout-line',d:`M0 0 L${dir*24} -32 L${dir*38} -32`,pathLength:1});
    callout.append(leader,el('circle',{class:'geo-callout-ring',r:9}),name,sub);
    callout.setAttribute('data-site',id);
    callout.classList.remove('is-in');void callout.getBoundingClientRect();callout.classList.add('is-in');
    placeOverlays();
  }

  // On-map photo card: the place's picture with its name and a one-sentence description, beside the pin.
  // It is a visual echo of the guide card below (which screen readers get), so it is aria-hidden.
  const photoCard=make('div','geo-photo');photoCard.id='geoPhoto';photoCard.setAttribute('aria-hidden','true');
  const photoLine=make('div','geo-photo-line');photoLine.setAttribute('aria-hidden','true');
  $('geoStage').append(photoLine,photoCard);
  let photoTimer=0;
  function renderPhoto() {
    clearTimeout(photoTimer);
    root.classList.remove('photo-in');
    photoCard.replaceChildren();
    const site=localSite(byId[selected]);
    if(!site&&selectedSpot){
      const figure=make('figure','geo-photo-figure');
      const img=make('img');img.src=selectedSpot.photo;img.alt='';img.width=560;img.height=315;img.decoding='async';
      figure.appendChild(img);if(selectedSpot.credit)figure.appendChild(photoCredit(selectedSpot.credit));photoCard.appendChild(figure);
      const text=make('div','geo-photo-text');
      text.append(make('span','geo-kicker',`${tr('mapDzongkhag')} · ${dzName(dzongkhags[selectedSpot.dz])}`),make('strong','geo-photo-name',placeName(selectedSpot.name)));
      photoCard.appendChild(text);
      photoTimer=setTimeout(()=>{root.classList.add('photo-in');positionPhoto();},reducedMotion?0:250);
      positionPhoto();
      return;
    }
    if(!site)return;
    const picture=photoFor(site.id);
    if(picture){
      const figure=make('figure','geo-photo-figure');
      const img=make('img');img.src=picture.src;img.alt='';img.width=560;img.height=315;img.decoding='async';
      figure.appendChild(img);
      if(photoLabel(picture))figure.appendChild(make('span','geo-photo-tag',photoLabel(picture)));
      photoCard.appendChild(figure);
    }
    const text=make('div','geo-photo-text');
    text.append(make('span','geo-kicker',site.region),make('strong','geo-photo-name',site.name),make('p','geo-photo-desc',shortText(site.desc)));
    photoCard.appendChild(text);
    // Arrive after the camera has mostly landed, like a lower third.
    photoTimer=setTimeout(()=>{root.classList.add('photo-in');positionPhoto();},reducedMotion?0:1100);
    positionPhoto();
  }
  function positionPhoto() {
    if(!(selected||selectedSpot)||!photoOnMap())return;
    const anchor=selected?pins.find(p=>p.site.id===selected)?.g:spotNodes.find(n=>n.spot===selectedSpot)?.g;
    if(!anchor)return;
    const stage=$('geoStage').getBoundingClientRect(),dot=anchor.getBoundingClientRect();
    const px=dot.left+dot.width/2-stage.left,py=dot.top+dot.height/2-stage.top;
    const width=photoCard.offsetWidth||300,height=photoCard.offsetHeight||300,gap=56,pad=14;
    const right=px+gap+width<=stage.width-pad;
    const left=right?px+gap:Math.max(pad,px-gap-width);
    const top=clamp(py-height*.45,pad+60,Math.max(pad+60,stage.height-height-pad));
    photoCard.style.transform=`translate(${left.toFixed(0)}px, ${top.toFixed(0)}px)`;
    photoCard.classList.toggle('is-left',!right);
    const lineLeft=right?px+12:left+width,lineWidth=right?gap-12:px-12-(left+width);
    photoLine.style.transform=`translate(${lineLeft.toFixed(0)}px, ${py.toFixed(0)}px)`;
    photoLine.style.width=`${Math.max(0,lineWidth).toFixed(0)}px`;
  }

  // Highlight one town or village on the map (its name always shown); null clears it.
  function peekPlace(name) {
    detailNodes.forEach(n=>n.g.classList.toggle('is-peek',Boolean(name)&&n.label?.textContent===name));
    card.querySelectorAll('.geo-dz-villages button').forEach(b=>b.setAttribute('aria-pressed',String(b.textContent===name)));
  }
  // The open dzongkhag's towns and villages, A–Z, in the card. Filled once the detail data has loaded.
  function renderVillageList() {
    const box=card.querySelector('.geo-dz-villages');
    if(!box)return;
    box.replaceChildren();
    if(!detailData||openDz===null)return;
    const {towns,villages}=detailIn(openDz,detailData);
    const names=[...new Set([...towns,...villages].map(p=>p[0]))].sort((a,b)=>a.localeCompare(b));
    if(!names.length)return;
    const details=make('details');
    details.appendChild(make('summary','',tr('mapVillages',{count:names.length})));
    const list=make('ul','geo-village-list');
    names.forEach(name=>{const li=make('li');const b=make('button','',name);b.type='button';b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{const on=b.getAttribute('aria-pressed')!=='true';peekPlace(on?name:null);});li.appendChild(b);list.appendChild(li);});
    details.appendChild(list);box.appendChild(details);
  }
  function renderCard() {
    card.replaceChildren();
    const site=localSite(byId[selected]);
    if(!site&&openDz!==null){
      // Dzongkhag guide: its name, how many places, then the places (main places open their guide).
      const {sites:inside,spots:extra}=placesIn(openDz);
      if(selectedSpot){const figure=make('figure','geo-card-figure');const photo=make('img','geo-card-photo');photo.src=selectedSpot.photo;photo.alt=placeName(selectedSpot.name);photo.width=640;photo.height=360;photo.decoding='async';figure.append(photo,make('figcaption','geo-card-caption',placeName(selectedSpot.name)));if(selectedSpot.credit)figure.appendChild(photoCredit(selectedSpot.credit));card.appendChild(figure);}
      card.append(make('span','geo-kicker',dzongkhags[openDz].label?tr('mapGmcKicker'):tr('mapDzongkhag')),make('h3','',dzName(dzongkhags[openDz])),make('p','geo-card-sub',tr('mapDzongkhagCount',{count:inside.length+extra.length})));
      if(dzongkhags[openDz].label)card.appendChild(gmcUpdates(true));
      const items=make('ul','geo-dz-items');
      inside.forEach(raw=>{const s=localSite(raw);const li=make('li','is-place');const b=make('button','',s.name);b.type='button';b.addEventListener('click',()=>{stopTour();select(s.id);});li.append(b,make('span','geo-dz-note',s.subtitle));items.appendChild(li);});
      extra.forEach(spot=>{const li=make('li','is-spot');if(spot.photo){const b=make('button','',placeName(spot.name));b.type='button';b.setAttribute('aria-pressed',String(spot===selectedSpot));b.addEventListener('click',()=>{stopTour();selectSpot(spot);});li.appendChild(b);}else li.textContent=placeName(spot.name);items.appendChild(li);});
      card.appendChild(items);
      card.appendChild(make('div','geo-dz-villages'));
      renderVillageList();
      return;
    }
    if(!site){
      card.append(make('span','geo-kicker',tr('wholeKingdom')),make('h3','',tr('mapAllHeading')),make('p','geo-card-desc',tr('mapAllDescription')));
      return;
    }
    const picture=photoFor(site.id);
    if(picture){const figure=make('figure','geo-card-figure');const photo=make('img','geo-card-photo');photo.src=picture.src;photo.alt=photoAlt(picture,site.name);photo.width=640;photo.height=360;photo.loading='lazy';photo.decoding='async';figure.appendChild(photo);if(photoLabel(picture))figure.appendChild(make('span','geo-photo-tag',photoLabel(picture)));card.appendChild(figure);}
    card.append(make('span','geo-kicker',`${categoryLabel(site.type)} · ${site.region}`),make('h3','',site.name),make('p','geo-card-sub',site.subtitle),make('p','geo-card-desc',site.desc));
    if(site.tip){const tip=make('p','geo-card-tip');tip.append(make('strong','',tr('mapGuideTip')),document.createTextNode(' '+site.tip));card.appendChild(tip);}
    if(site.id==='gmc')card.appendChild(gmcUpdates(false));
    const links=make('div','geo-card-links');
    const source=make('a','',atlasText.source||'Read about this place ↗');source.href=site.source;source.target='_blank';source.rel='noopener noreferrer';
    const plan=make('a','',tr('mapPlanGuide'));plan.href='#enquiry';
    links.append(source,plan);card.appendChild(links);
  }
  // Gelephu Mindfulness City: dated news, newest first, from the language catalogues (ui.mapGmcUpdate1-4).
  // Refresh the four lines and mapGmcAsOf in all eight languages when there is news.
  function gmcUpdates(withLink) {
    const box=make('div','geo-gmc');
    box.appendChild(make('h4','geo-gmc-title',tr('mapGmcLatest')));
    // The planned international airport (official rendering), beside the airport news.
    const figure=make('figure','geo-gmc-figure');
    const airport=make('img');airport.src='img/web/maps-image/Gelephu Airport.webp';airport.alt=tr('mapGmcAirportCaption');airport.width=780;airport.height=439;airport.loading='lazy';airport.decoding='async';
    figure.append(airport,make('figcaption','',tr('mapGmcAirportCaption')));
    box.appendChild(figure);
    const items=make('ul','geo-gmc-list');
    [1,2,3,4].forEach(n=>items.appendChild(make('li','',tr(`mapGmcUpdate${n}`))));
    box.append(items,make('p','geo-gmc-asof',tr('mapGmcAsOf')));
    if(withLink){const more=make('a','geo-gmc-more',tr('mapGmcMore'));more.href='https://gmc.bt';more.target='_blank';more.rel='noopener noreferrer';box.appendChild(more);}
    return box;
  }
  function renderList() {
    list.replaceChildren();
    placesByRegion().forEach(({region,sites:group})=>{
      const block=make('div','geo-region');
      block.appendChild(make('h3','geo-region-name',tr(region)));
      const row=make('div','geo-region-places');
      group.forEach(raw=>{
        const site=localSite(raw);
        const button=make('button','',site.name);button.type='button';button.dataset.site=site.id;button.setAttribute('aria-pressed',String(site.id===selected));
        button.addEventListener('click',()=>{stopTour();select(site.id);});
        row.appendChild(button);
      });
      block.appendChild(row);list.appendChild(block);
    });
    const block=make('div','geo-region geo-dz-block');
    block.appendChild(make('h3','geo-region-name',tr('mapDzongkhags')));
    const row=make('div','geo-region-places');
    dzongkhags.map(d=>({d,label:dzName(d)})).sort((a,b)=>a.label.localeCompare(b.label)).forEach(({d,label})=>{
      const button=make('button','',label);button.type='button';button.dataset.dz=d.index;button.setAttribute('aria-pressed',String(d.index===openDz));
      button.addEventListener('click',()=>{stopTour();openDzongkhag(d.index);});
      for(const on of ['pointerenter','focus'])button.addEventListener(on,()=>hotDzongkhag(d.index));
      for(const off of ['pointerleave','blur'])button.addEventListener(off,()=>hotDzongkhag(-1));
      row.appendChild(button);
    });
    block.appendChild(row);list.appendChild(block);
  }
  function syncPins() {
    pins.forEach(pin=>{
      const site=localSite(pin.site),active=pin.site.id===selected;
      pin.g.classList.toggle('is-active',active);
      pin.g.setAttribute('aria-pressed',String(active));
      pin.g.setAttribute('aria-label',tr('mapMarker',{name:site.name,category:categoryLabel(site.type),region:site.region}));
      pin.label.textContent=site.name;
    });
    list.querySelectorAll('button[data-dz]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.dz)===openDz)));
    list.querySelectorAll('button[data-site]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.site===selected)));
    spotNodes.forEach(n=>n.g.classList.toggle('is-active',n.spot===selectedSpot));
    root.classList.toggle('has-selection',Boolean(selected||selectedSpot));
  }
  // Open a dzongkhag: the camera fits it, the rest of the country darkens, its border glows, and its
  // places and tourist spots are named on the map and listed in the guide card.
  function openDzongkhag(index,{instant=false}={}) {
    if(!dzongkhags[index])return;
    openDz=index;selected=null;hovered=null;selectedSpot=null;
    const shape=dzShapes[index].getAttribute('d');
    dzMask.setAttribute('d',`M${-W} ${-H} H${2*W} V${2*H} H${-W} Z ${shape}`);
    dzLine.setAttribute('d',shape);dzGlow.setAttribute('d',shape);dzClipPath.setAttribute('d',shape);
    if(!satImage.getAttribute('href'))satImage.setAttribute('href',SATELLITE);
    if(detailNodes.length&&detailLayer.getAttribute('data-dz')!==String(index))clearDetail();
    root.classList.add('has-dz');
    dzShapes.forEach((s,i)=>s.classList.toggle('is-open',i===index));
    townNodes.forEach((t,i)=>t.g.classList.toggle('is-open',i===index));
    spotNodes.forEach(n=>n.g.classList.toggle('in-dz',n.spot.dz===index));
    pins.forEach(p=>p.g.classList.toggle('in-dz',siteDzongkhag[p.site.id]===index));
    hudName.textContent=dzName(dzongkhags[index]);
    // The open dzongkhag gets a large map (see .has-dz in styles.css); fit the district to that frame.
    const frame=svg.getBoundingClientRect(),target=dzongkhagView(index,frame.width&&frame.height?frame.width/frame.height:W/H);
    if(!root.classList.contains('is-enlarged'))stageNode.scrollIntoView({block:'start',behavior:reducedMotion?'auto':'smooth'});
    if(instant){cancelAnimationFrame(flight);settled=target.slice();setView(target);}else flyTo(target);
    layoutLabels(index,target);
    loadDetail().then(()=>{if(openDz===index&&detailLayer.getAttribute('data-dz')!==String(index))drawDetail(index);}).catch(()=>{});
    drawCallout();renderCard();renderPhoto();syncPins();
  }
  // Detail data loads once, on the first dzongkhag opened.
  function loadDetail() {
    if(detailData)return Promise.resolve(detailData);
    if(!detailLoading)detailLoading=new Promise((resolve,reject)=>{
      const script=document.createElement('script');script.src=DETAIL_SCRIPT;script.async=true;
      script.onload=()=>{detailData=window.DRUK_DETAIL||null;if(detailData)resolve(detailData);else reject(new Error('no map detail'));};
      script.onerror=()=>{detailLoading=null;script.remove();reject(new Error('map detail did not load'));};
      document.head.appendChild(script);
    });
    return detailLoading;
  }
  const roadPath=line=>{let d='';for(let i=1;i<line.length;i+=2){const [x,y]=project(line[i],line[i+1]);d+=`${i>1?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`;}return d;};
  function drawRoads() {
    if(roadsDrawn||!detailData)return;
    roadsDrawn=true;
    const [major,secondary,minor]=[1,2,3].map(c=>detailData.roads.filter(r=>r[0]===c).map(roadPath).join(''));
    roadLayer.append(el('path',{d:major+secondary,class:'geo-road-casing'}),el('path',{d:minor,class:'geo-road geo-road-3'}),el('path',{d:secondary,class:'geo-road geo-road-2'}),el('path',{d:major,class:'geo-road geo-road-1'}));
  }
  // Towns and villages of the open dzongkhag, as markers that keep one screen size.
  function drawDetail(index) {
    clearDetail();
    if(!detailData||openDz!==index)return;
    drawRoads();
    const {towns,villages}=detailIn(index,detailData);
    const add=(kind,lon,lat,shapes,name)=>{
      const [x,y]=project(lon,lat),g=el('g',{class:`geo-${kind}`,'data-x':x.toFixed(2),'data-y':y.toFixed(2)});
      g.append(...shapes);
      let label=null;
      if(name){
        label=el('text',{x:6,y:3});label.textContent=name;g.appendChild(label);
        // Names that do not fit are hidden by layoutLabels; pointing at (or tapping) the marker shows them.
        g.prepend(el('circle',{class:'geo-hit',r:kind==='town'?7:6}));
        g.addEventListener('click',event=>{event.stopPropagation();peekPlace(g.classList.contains('is-peek')?null:name);});
      }
      detailLayer.appendChild(g);detailNodes.push({g,label,x,y,kind:kind.split(' ')[0]});
    };
    villages.forEach(([name,lon,lat])=>add('village',lon,lat,[el('circle',{r:1.9})],name));
    towns.forEach(([name,lon,lat])=>add('town',lon,lat,[el('circle',{r:3.2})],name));
    detailLayer.setAttribute('data-dz',index);
    root.classList.add('has-detail');
    placeOverlays();layoutLabels(index,settled);
    renderVillageList();
  }
  function clearDetail() {detailLayer.replaceChildren();detailLayer.removeAttribute('data-dz');detailNodes=[];root.classList.remove('has-detail');}
  // Keep the names inside an open dzongkhag from overlapping: going top to bottom, each label tries its
  // natural spot, then nudges up or down a line, then the other side, and takes the first free one.
  // Sizes are estimated in map units at the view the camera is flying to.
  function layoutLabels(index,target) {
    const k=target[2]/W*(stageWidth?clamp(860/stageWidth,1,2):1);
    // The part of the view the frame actually shows (the SVG slices to its frame); names stay inside it.
    const frame=svg.getBoundingClientRect(),aspect=frame.width&&frame.height?frame.width/frame.height:W/H;
    const shownW=aspect<W/H?target[3]*aspect:target[2],shownH=aspect<W/H?target[3]:target[2]/aspect;
    const edge=[target[0]+(target[2]-shownW)/2+4*k,target[1]+(target[3]-shownH)/2+4*k,target[0]+(target[2]+shownW)/2-4*k,target[1]+(target[3]+shownH)/2-4*k];
    const onScreen=box=>box[0]>=edge[0]&&box[2]<=edge[2]&&box[1]>=edge[1]&&box[3]<=edge[3];
    const size={pin:9.6,spot:9.6,town:9,village:7.5},radius={pin:7,spot:4,town:3.5,village:2.2};
    const items=[...pins.filter(p=>siteDzongkhag[p.site.id]===index).map(p=>({x:p.x,y:p.y,text:p.label,gap:11,kind:'pin'})),
      ...spotNodes.filter(n=>n.spot.dz===index).map(n=>{const [x,y]=project(n.spot.lon,n.spot.lat);return {x,y,text:n.label,gap:8,kind:'spot'};}),
      ...detailNodes.map(n=>({x:n.x,y:n.y,text:n.label,gap:n.kind==='town'?6:4.5,kind:n.kind}))];
    // Every marker is an obstacle; main places, spots and towns always get a name, and village
    // names show only where they fit (more of them as the camera zooms in).
    const placed=items.map(item=>{const r=radius[item.kind]*k;return [item.x-r,item.y-r,item.x+r,item.y+r];});
    const labels=[];
    const optional=item=>item.kind==='village';
    const order=item=>optional(item)?1:0;
    items.filter(item=>item.text).sort((a,b)=>order(a)-order(b)||a.y-b.y).forEach(item=>{
      const s=size[item.kind],width=Math.max(12,(item.text.textContent||'').length*s*.56),height=s+2;
      // Try free spots near the marker; a main name that finds none may cover markers (not other names),
      // and as a last resort may run past the frame edge.
      const search=(obstacles,dys,inFrame)=>{
        for(const dy of dys)for(const side of [1,-1]){
          const x0=side>0?item.x+item.gap*k:item.x-(item.gap+width)*k,box=[x0,item.y+(dy-height/2)*k,x0+width*k,item.y+(dy+height/2)*k];
          if((!inFrame||onScreen(box))&&!obstacles.some(b=>box[0]<b[2]&&box[2]>b[0]&&box[1]<b[3]&&box[3]>b[1]))return {dy,side,box};
        }
        return null;
      };
      const far=[0,-11,11,-22,22,-33,33,-44,44,-55,55];
      const chosen=optional(item)?search(placed,[0,-(s+1)/2,(s+1)/2,-(s+1),s+1,-1.5*(s+1),1.5*(s+1)],true):search(placed,far.slice(0,9),true)||search(labels,far,true)||search(labels,far,false);
      item.text.toggleAttribute('visibility',false);
      if(!chosen&&optional(item)){item.text.setAttribute('visibility','hidden');return;}
      const final=chosen||{dy:0,side:1,box:[item.x,item.y,item.x,item.y]};
      placed.push(final.box);labels.push(final.box);
      item.text.setAttribute('x',final.side*item.gap);
      item.text.setAttribute('y',final.dy+s*.36);
      item.text.setAttribute('text-anchor',final.side>0?'start':'end');
    });
  }
  function closeDzongkhag() {
    if(openDz===null)return;
    openDz=null;
    root.classList.remove('has-dz');
    [...dzShapes,...townNodes.map(t=>t.g)].forEach(n=>n.classList.remove('is-open'));
    [...spotNodes,...pins].forEach(n=>n.g.classList.remove('in-dz'));
    hudName.textContent=hudDefault;
    clearDetail();setEnlarged(false);selectedSpot=null;
  }
  // A tourist spot with a photo: open its dzongkhag if needed, then show its picture by it.
  function selectSpot(spot) {
    if(!spot?.photo)return;
    if(openDz!==spot.dz)openDzongkhag(spot.dz);
    selected=null;selectedSpot=spot;
    drawCallout();renderCard();renderPhoto();syncPins();
  }
  function select(id,{fly=true}={}) {
    selectedSpot=null;
    selected=byId[id]?id:null;
    // Choosing a place outside the open dzongkhag (or none) leaves the dzongkhag view.
    if(openDz!==null&&(!selected||siteDzongkhag[selected]!==openDz))closeDzongkhag();
    if(fly)flyTo(selected?viewFor(selected):FULL.slice());
    if(openDz!==null)layoutLabels(openDz,settled);
    drawCallout();renderCard();renderPhoto();syncPins();
  }

  // Preview tour: one pass west to east, a stop every few seconds, then back to the whole kingdom.
  // It never starts by itself, and any other choice stops it.
  function updatePlayButton() {playButton.textContent=tr(touring?'mapPreviewPause':'mapPreviewPlay');playButton.setAttribute('aria-pressed',String(touring));}
  function stopTour() {if(!touring)return;touring=false;clearTimeout(tourTimer);updatePlayButton();}
  function nextStop() {
    tourStep+=1;
    if(tourStep>=tour.length){touring=false;tourStep=-1;updatePlayButton();select(null);return;}
    select(tour[tourStep]);
    tourTimer=setTimeout(nextStop,reducedMotion?6000:5200);
  }
  playButton.addEventListener('click',()=>{
    if(touring){stopTour();return;}
    touring=true;updatePlayButton();
    if(tourStep>=tour.length-1)tourStep=-1;
    nextStop();
  });
  resetButton.addEventListener('click',()=>{stopTour();tourStep=-1;select(null);});
  // Escape steps back: from a place to its open dzongkhag, from a dzongkhag (or a place) to the whole kingdom.
  root.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    if(root.classList.contains('is-enlarged')){setEnlarged(false);return;}
    if((selected||selectedSpot)&&openDz!==null){stopTour();openDzongkhag(openDz);}
    else if(selected||openDz!==null){stopTour();select(null);}
  });

  // Exploring an open dzongkhag: zoom buttons, drag to pan, and a large (full-screen) map where the
  // mouse wheel zooms too. Outside a dzongkhag the map stays a simple, fixed view.
  const stageNode=$('geoStage');
  const zoomBox=make('div','geo-zoom');
  const iconButton=(className,svgPath)=>{const button=make('button',className);button.type='button';button.innerHTML=`<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="${svgPath}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;return button;};
  const enlargeButton=iconButton('geo-enlarge','M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4');enlargeButton.appendChild(make('span'));enlargeButton.setAttribute('aria-pressed','false');
  const zoomOutButton=iconButton('geo-zoom-out','M3 8h10'),zoomInButton=iconButton('geo-zoom-in','M3 8h10M8 3v10');
  zoomBox.append(enlargeButton,zoomOutButton,zoomInButton);
  const legend=make('div','geo-legend');legend.setAttribute('aria-hidden','true');
  const legendItems=['Highway','Road','Town','Village'].map(name=>{const item=make('span',`geo-legend-${name.toLowerCase()}`);item.append(make('i'),make('b'));legend.appendChild(item);return {item,key:`mapLegend${name}`};});
  stageNode.append(zoomBox,legend);
  let relayoutTimer=0;
  const relayoutSoon=()=>{clearTimeout(relayoutTimer);relayoutTimer=setTimeout(()=>{if(openDz!==null)layoutLabels(openDz,settled);},140);};
  function moveCamera(next) {cancelAnimationFrame(flight);settled=next;setView(next);relayoutSoon();}
  function zoomBy(factor,fx,fy) {
    if(openDz===null)return;
    const base=settled[2]===view[2]?view:settled;
    moveCamera(zoomView(base,factor,fx??base[0]+base[2]/2,fy??base[1]+base[3]/2));
  }
  zoomInButton.addEventListener('click',()=>{stopTour();zoomBy(1.6);});
  zoomOutButton.addEventListener('click',()=>{stopTour();zoomBy(1/1.6);});
  const toMap=event=>{const point=svg.createSVGPoint();point.x=event.clientX;point.y=event.clientY;const p=point.matrixTransform(svg.getScreenCTM().inverse());return [p.x,p.y];};
  svg.addEventListener('wheel',event=>{
    if(openDz===null||!root.classList.contains('is-enlarged'))return;
    event.preventDefault();
    const [x,y]=toMap(event);zoomBy(Math.exp(-clamp(event.deltaY,-120,120)*.004),x,y);
  },{passive:false});
  let drag=null,dragged=false;
  svg.addEventListener('pointerdown',event=>{
    if(openDz===null||event.button!==0)return;
    drag={id:event.pointerId,x:event.clientX,y:event.clientY,view:view.slice(),scale:svg.getScreenCTM().a};dragged=false;
  });
  svg.addEventListener('pointermove',event=>{
    if(!drag||event.pointerId!==drag.id)return;
    const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
    if(!dragged&&Math.hypot(dx,dy)<5)return;
    if(!dragged){dragged=true;stopTour();try{svg.setPointerCapture(event.pointerId);}catch(_err){}root.classList.add('is-panning');}
    cancelAnimationFrame(flight);settled=panView(drag.view,-dx/drag.scale,-dy/drag.scale);setView(settled);
  });
  const endDrag=()=>{if(!drag)return;drag=null;root.classList.remove('is-panning');if(dragged)relayoutSoon();};
  svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag);
  // A drag is not a click: it must not open the dzongkhag or place under the pointer.
  svg.addEventListener('click',event=>{if(dragged){event.stopPropagation();event.preventDefault();dragged=false;}},true);
  // native: also ask the browser for real full screen (the Enlarge button). A district lifted out of the map
  // fills the window instead, so its own transition stays visible.
  function setEnlarged(on,{native=true}={}) {
    if(on===root.classList.contains('is-enlarged'))return;
    root.classList.toggle('is-enlarged',on);
    document.documentElement.classList.toggle('geo-locked',on);
    enlargeButton.setAttribute('aria-pressed',String(on));
    labelEnlarge();
    if(on&&native&&stageNode.requestFullscreen&&!document.fullscreenElement)stageNode.requestFullscreen().catch(()=>{});
    if(!on&&document.fullscreenElement===stageNode)document.exitFullscreen().catch(()=>{});
    // Closing a lifted district goes back to the whole map, where the visitor clicked it.
    if(!on&&liftedOpen){liftedOpen=false;if(openDz!==null)select(null);window.scrollTo({top:liftScroll,behavior:'instant'});}
    relayoutSoon();
  }
  /* Clicking a district on the map lifts it out: a copy of the district, with its satellite imagery, rises
     from where it sits on the map and grows to fill the screen while the page darkens behind it. It then
     hands over to the full-window map of that district (towns, villages, roads and every tourist spot,
     zoomable), which fades in under it. Closing returns to the whole map. With reduced motion it just opens. */
  let liftedOpen=false,lifting=false,liftScroll=0;
  function liftDzongkhag(index) {
    if(lifting||!dzongkhags[index])return;
    liftScroll=window.scrollY;
    const open=()=>{liftedOpen=true;setEnlarged(true,{native:false});openDzongkhag(index,{instant:true});enlargeButton.focus({preventScroll:true});};
    const shape=dzShapes[index],from=shape.getBoundingClientRect();
    if(reducedMotion||!from.width||!from.height||!document.body.animate){open();return;}
    lifting=true;
    const box=shape.getBBox(),vw=window.innerWidth,vh=window.innerHeight,pad=Math.min(vw,vh)*.1;
    const fit=Math.min((vw-2*pad)/from.width,(vh-2*pad)/from.height);
    const to={w:from.width*fit,h:from.height*fit};to.x=(vw-to.w)/2;to.y=(vh-to.h)/2;
    const layer=make('div','geo-lift');layer.setAttribute('aria-hidden','true');
    const art=el('svg',{class:'geo-lift-art',viewBox:`${box.x} ${box.y} ${box.width} ${box.height}`});
    const clipId='geoLiftClip',d=shape.getAttribute('d'),clipShape=el('clipPath',{id:clipId});clipShape.appendChild(el('path',{d}));
    art.append(el('defs'),el('path',{d,class:'geo-lift-land'}),el('image',{href:SATELLITE,x:0,y:0,width:W,height:H,preserveAspectRatio:'none','clip-path':`url(#${clipId})`,class:'geo-lift-sat'}),el('path',{d,class:'geo-lift-glow',filter:'url(#geoGlow)'}),el('path',{d,class:'geo-lift-line'}));
    art.firstChild.appendChild(clipShape);
    Object.assign(art.style,{left:`${to.x}px`,top:`${to.y}px`,width:`${to.w}px`,height:`${to.h}px`});
    const name=make('div','geo-lift-name',dzName(dzongkhags[index]));
    layer.append(art,name);document.body.appendChild(layer);
    const ease='cubic-bezier(.2,.75,.15,1)',grow=760;
    layer.animate([{backgroundColor:'rgba(10,10,12,0)'},{backgroundColor:'rgba(10,10,12,.97)'}],{duration:grow,easing:'ease-out',fill:'forwards'});
    name.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:500,delay:grow*.45,easing:'ease-out',fill:'backwards'});
    art.animate([{transform:`translate(${from.left-to.x}px,${from.top-to.y}px) scale(${from.width/to.w})`},{transform:'none'}],{duration:grow,easing:ease}).finished.then(()=>{
      open();
      // Hold the lifted district a moment, then let the detailed map show through as it fades away.
      layer.animate([{opacity:1},{opacity:0}],{duration:520,delay:160,easing:'ease-in-out',fill:'forwards'}).finished.then(()=>{layer.remove();lifting=false;});
    },()=>{layer.remove();lifting=false;open();});
  }
  document.addEventListener('fullscreenchange',()=>{if(document.fullscreenElement!==stageNode&&root.classList.contains('is-enlarged'))setEnlarged(false);});
  enlargeButton.addEventListener('click',()=>setEnlarged(!root.classList.contains('is-enlarged')));
  function labelEnlarge() {
    const label=tr(root.classList.contains('is-enlarged')?'mapEnlargeClose':'mapEnlarge');
    enlargeButton.lastElementChild.textContent=label;enlargeButton.setAttribute('aria-label',label);
  }

  function applyLanguage() {
    labelEnlarge();
    zoomInButton.setAttribute('aria-label',tr('mapZoomIn'));zoomOutButton.setAttribute('aria-label',tr('mapZoomOut'));
    legendItems.forEach(({item,key})=>item.lastElementChild.textContent=tr(key));
    tibet.textContent=tr('tibet');india.textContent=tr('india');
    townNodes.forEach(t=>t.label.textContent=placeName(t.name));
    spotNodes.forEach(n=>n.label.textContent=placeName(n.spot.name));
    if(openDz!==null)hudName.textContent=dzName(dzongkhags[openDz]);
    gateNodes.forEach(gate=>{const name=placeName(gate.name),label=` · ${tr('mapEntry')}`;gate.label.textContent=name;gate.sub.textContent=tr('mapEntry');gate.tip.textContent=label;gate.g.setAttribute('aria-label',label);});
    flightButton.setAttribute('aria-label',tr(flightsOn?'mapFlightsPause':'mapFlightsPlay'));flightButton.lastElementChild.textContent=tr(flightsOn?'mapFlightsPause':'mapFlightsPlay');
    airportNodes.forEach(a=>{const label=tr('mapAirport',{name:placeName(a.name),code:a.code});a.tip.textContent=label;a.g.setAttribute('aria-label',label);});
    resetButton.textContent=tr('wholeKingdom');
    $('geoSvgTitle').textContent=tr('mapSvgTitle');
    $('geoSvgDesc').textContent=tr('mapSvgDesc');
    list.setAttribute('aria-label',tr('mapPlaces'));
    card.setAttribute('aria-label',tr('mapGuide'));
    updatePlayButton();renderList();renderCard();renderPhoto();syncPins();drawCallout();
  }
  window.DRUK_SET_ATLAS_LANGUAGE=language=>{
    atlasLanguage=language;
    atlasText=window.DRUK_L10N?.catalog(language)?.page?.mapUi||window.DRUK_I18N?.[language]?.mapUi||englishMapUi;
    applyLanguage();
  };

  // Flight animation: one clock that only advances while flights are on and the map is on screen, so
  // pausing freezes every plane where it is. Off entirely with reduced motion (routes still show).
  function drawFlights() {
    flights.forEach(f=>{
      const state=flightState(f.arc,flightClock,f.offset);
      if(!state){f.plane.setAttribute('opacity',0);f.trail.setAttribute('stroke-dasharray','0 1');return;}
      const p=arcPoint(f.arc,state.forward?state.t:1-state.t);
      const heading=state.forward?p.heading:p.heading+180;
      const fade=Math.min(1,state.t/.06,(1-state.t)/.06);
      f.plane.setAttribute('opacity',fade.toFixed(2));
      f.plane.setAttribute('transform',`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${heading.toFixed(1)}) scale(${(overlayScale*1.15).toFixed(4)})`);
      const done=state.t.toFixed(4);
      f.trail.setAttribute('stroke-width',(1.4*overlayScale).toFixed(3));
      f.trail.setAttribute('stroke-dasharray',state.forward?`${done} 1`:`0 ${(1-state.t).toFixed(4)} ${done} 1`);
    });
  }
  function flightTick(now) {
    if(flightLast)flightClock+=Math.min(now-flightLast,100);
    flightLast=now;drawFlights();
    flightFrame=requestAnimationFrame(flightTick);
  }
  function syncFlights() {
    const run=flightsOn&&flightsVisible&&!reducedMotion&&root.classList.contains('is-drawn');
    if(run&&!flightFrame){flightLast=0;flightFrame=requestAnimationFrame(flightTick);}
    if(!run&&flightFrame){cancelAnimationFrame(flightFrame);flightFrame=0;}
    // Paused flights fade off the map (routes and planes); Play brings them back where they left off.
    root.classList.toggle('flights-paused',!flightsOn&&!reducedMotion);
    const label=tr(flightsOn?'mapFlightsPause':'mapFlightsPlay');
    flightButton.setAttribute('aria-label',label);
    flightButton.lastElementChild.textContent=label;
  }
  flightButton.hidden=reducedMotion;
  flightButton.addEventListener('click',()=>{flightsOn=!flightsOn;try{if(flightsOn)localStorage.removeItem('druk-map-flights');else localStorage.setItem('druk-map-flights','paused');}catch(_err){}syncFlights();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{flightsVisible=entries[0].isIntersecting;syncFlights();}).observe($('geoStage'));
  else flightsVisible=true;

  applyLanguage();
  setView(FULL.slice());
  // Intro, played once when the map comes into view: the camera eases out from a close push while the
  // border draws itself, rivers follow, then the pins pop in west to east.
  function intro() {
    if(root.classList.contains('is-intro')||root.classList.contains('is-drawn'))return;
    if(reducedMotion){root.classList.add('is-drawn');syncFlights();return;}
    root.classList.add('is-intro');
    const centre=project(90.35,27.45);
    setView(viewAt(centre[0],centre[1],W/1.35));
    flyTo(FULL.slice(),3200);
    setTimeout(()=>{root.classList.remove('is-intro');root.classList.add('is-drawn');syncFlights();},4600);
  }
  if('IntersectionObserver' in window){
    const watcher=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){watcher.disconnect();intro();}},{threshold:.35});
    watcher.observe($('geoStage'));
  } else intro();
})();
