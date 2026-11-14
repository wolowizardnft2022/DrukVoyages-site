/* MAIN PAGE SCRIPT
  Controls the language switcher, itinerary cards, detail modal, gallery
  lightbox, hero slider, mobile navigation, and enquiry form.
*/

/* ── DATA ──
  Source data for itinerary cards and modals. To add a package, add one object
  here and include matching translations in translations.js when needed.
*/
const ITINERARIES=[
  {id:1,category:'classic',tag:'Classic',title:'Bhutan Highlights — The Royal Trail',duration:'8 Days',groupSize:'Max 8',difficulty:'Moderate',price:'$3,290',image:'img/web/maps-image/dzongs_of_bhutan/Paro Tasktsang.jpg',desc:"Perfect introduction covering Tiger's Nest, Punakha Dzong and Thimphu — balancing cultural immersion with stunning landscapes.",highlights:["Tiger's Nest",'Punakha Dzong','Dochula Pass','National Museum'],days:[{n:1,t:'Paro Arrival & Valley Walk',d:"Welcome ceremony, afternoon stroll through Paro's farmhouses and old market."},{n:2,t:"Tiger's Nest Hike",d:'Full-day ascent to Paro Taktsang (3,120m). Packed lunch at the cliff café.'},{n:3,t:'Thimphu Exploration',d:'Tashichho Dzong, Buddha Dordenma, Folk Heritage Museum, traditional archery.'},{n:4,t:'Dochula Pass & Drive to Punakha',d:'108 memorial chortens in morning mist; breathtaking Himalayan panorama.'},{n:5,t:'Punakha Dzong & Suspension Bridge',d:'Most beautiful dzong at the confluence of two rivers, built in 1637.'},{n:6,t:'Haa Valley Detour',d:'Remote valley opened to tourists in 2002. Visit Lhakhang Karpo and Nagpo.'},{n:7,t:'Paro Market & Farmhouse Dinner',d:'Handicraft shopping, red rice wine, authentic ema datshi with a local family.'},{n:8,t:'Farewell & Departure',d:'Morning meditation walk, airport transfer with blessing scarves (khata).'}]},
  {id:2,category:'festival',tag:'Festival',title:'Paro Tsechu — Sacred Mask Dances',duration:'10 Days',groupSize:'Max 6',difficulty:'Easy',price:'$4,150',image:'img/web/pema-gyamtsho-NJ6kmB2-w0w-unsplash.jpg',desc:"Sacred Cham mask dances, giant thangka unveilings, and thousand-year-old rituals at Bhutan's most vibrant festival.",highlights:['Cham Mask Dances','Thongdrel Unveiling','Backstage Access','Cultural Workshops'],days:[{n:1,t:'Arrival & Festival Briefing',d:'Welcome dinner with our cultural expert. Festival etiquette orientation.'},{n:2,t:'Pre-Festival Village Walks',d:'Explore Paro town as locals prepare traditional costumes and offerings.'},{n:3,t:'Tsechu Day 1 — Opening Ceremonies',d:'Front-row viewing of opening mask dances, hosted by the Royal Court.'},{n:4,t:'Tsechu Day 2 — Cham Dances',d:'Black Hat Drubchen and deer dance. Backstage access to meet performers.'},{n:5,t:'Tsechu Day 3 — Thongdrel Unveiling',d:'Pre-dawn gathering for the sacred unfurling of the giant appliqué thangka.'},{n:6,t:'Punakha Post-Festival',d:'Drive through Dochula Pass — 108 chortens in lingering festival spirit.'},{n:7,t:'Punakha Dzong & Chimi Lhakhang',d:'Fertility temple of the Divine Madman Drukpa Kunley.'},{n:8,t:'Bumthang Journey',d:"Drive east to Bhutan's spiritual heartland. Jakar Dzong and Jambay Lhakhang."},{n:9,t:'Bumthang Valley Hikes',d:'Kurjey Lhakhang, apple orchards, traditional black-weaving workshops.'},{n:10,t:'Return to Paro & Departure',d:'Mountain flight, blessing ceremony, farewell gifts.'}]},
  {id:3,category:'trek',tag:'Trekking',title:'Druk Path Trek — The Royal Way',duration:'12 Days',groupSize:'Max 8',difficulty:'Challenging',price:'$5,200',image:'img/web/raimond-klavins-gi7tWn0F58s-unsplash.jpg',desc:'Walk the ancient trail from Paro to Thimphu through high-altitude lakes, rhododendron forests, and yak herding grounds.',highlights:['High-Altitude Lakes','Himalayan Views','Yak Herding','Forest Camping'],days:[{n:1,t:'Paro Arrival & Acclimatisation',d:'Gentle valley walk, early bedtime to prepare for altitude.'},{n:2,t:"Tiger's Nest Warm-Up Hike",d:'Altitude acclimatisation and spiritual preparation for the trek.'},{n:3,t:'Trek Day 1 — Paro to Jangchhulakha (4,100m)',d:'First ascent through pine forests. Camp with views of Jomolhari.'},{n:4,t:'Trek Day 2 — to Jimilangtso Lake',d:'Highland plateau, first high-altitude lake, wild yak sightings.'},{n:5,t:'Trek Day 3 — to Simkotha Lake',d:'Three sacred lakes used by monks for ritual meditation.'},{n:6,t:'Trek Day 4 — to Phajoding Monastery',d:'Ancient hermitage clinging to the hillside above Thimphu.'},{n:7,t:'Rest Day at Phajoding',d:'Meditation session with resident monks.'},{n:8,t:'Descent to Thimphu',d:"Final forest descent into the world's only capital without traffic lights."},{n:9,t:'Thimphu Culture Day',d:'Buddha Dordenma, medicine institute, contemporary art gallery.'},{n:10,t:'Punakha River Rewards',d:'River picnic at the dzong after trail days.'},{n:11,t:'Recovery & Spa Day',d:'Traditional hot stone bath, Sowa Rigpa treatments.'},{n:12,t:'Paro Departure',d:'Mountain flight (weather permitting), farewell ceremony.'}]},
  {id:4,category:'wellness',tag:'Wellness',title:'The Bhutan Soul Reset',duration:'9 Days',groupSize:'Max 4',difficulty:'Easy',price:'$4,800',image:'img/web/raul-taciu-V5ACl0d6wHU-unsplash.jpg',desc:'Sowa Rigpa healing, silent meditation retreats, hot stone baths, and mindful monastic living.',highlights:['Sowa Rigpa','Silent Meditation','Hot Stone Baths','Monastic Stays'],days:[{n:1,t:'Paro Arrival — Digital Detox Begins',d:'Phones stored. Receive traditional gho/kira. Evening breathing exercises.'},{n:2,t:'Sowa Rigpa Consultation',d:'Traditional Bhutanese medicine assessment and personalised herbal plan.'},{n:3,t:"Tiger's Nest Mindful Pilgrimage",d:'Slow, contemplative ascent. Sit in silence. No schedule, no rush.'},{n:4,t:'Punakha — Riverside Meditation',d:'Dawn yoga at Mo Chhu river, Tibetan singing bowl therapy.'},{n:5,t:'Bumthang Silent Retreat Day 1',d:'Farmhouse retreat. First of two silent days.'},{n:6,t:'Bumthang Silent Retreat Day 2',d:'Forest bathing, nature walks in silence, journalling.'},{n:7,t:'Dotsho — Hot Stone Bath Ceremony',d:'Traditional bath heated with fire-blessed river stones. Deeply healing.'},{n:8,t:'Paro Valley Reintegration',d:'Share your experience with our guide. Final thangka painting class.'},{n:9,t:'Departure with Intention',d:'Personalised wellness prescription and Bhutanese herbal remedies.'}]},
  {id:5,category:'classic',tag:'Photography',title:'Bhutan Through the Lens',duration:'14 Days',groupSize:'Max 5',difficulty:'Moderate',price:'$5,900',image:'img/web/truly-bhutan-XdjhBoNgRPY-unsplash.jpg',desc:'Golden hour and blue hour locations guided by a professional Bhutanese photographer.',highlights:['Golden Hour Shoots','Festival Access','Remote Villages','Landscape Photography'],days:[{n:1,t:'Arrival & Gear Check',d:"Meet your photography guide. Scout Paro's iconic ring road bridge."},{n:2,t:"Pre-Dawn Tiger's Nest",d:'4am departure — mist rising over the monastery in first light.'},{n:3,t:'Paro Valley Farm Life',d:'Farmers, children, monks in morning documentary light.'},{n:4,t:'Thimphu Architecture',d:'Dzongs, chortens, the giant bronze Buddha.'},{n:5,t:'Dochula Pass Sunrise',d:'108 chortens emerging from cloud at 3,100m.'},{n:6,t:'Punakha River Portraits',d:'Fishermen, monks, dzong at dusk reflections.'},{n:7,t:'Haa Valley Hidden Gems',d:'Yak herders, ancient temples, unchanged village life.'},{n:8,t:'Phobjikha Wetlands',d:'Black-necked cranes at dawn, golden hour panoramas.'},{n:9,t:'Trongsa Dzong',d:"Royal Family's ancestral hilltop fortress."},{n:10,t:'Bumthang Sacred Sites',d:"Eight centuries of sacred art photographed."},{n:11,t:'Village Homestay Day 1',d:'Embedded with a local family — intimate photographic essay.'},{n:12,t:'Village Homestay Day 2',d:'Community rituals, cooking, livestock.'},{n:13,t:'Post-Processing Workshop',d:'Lightroom session editing your best shots.'},{n:14,t:'Final Exhibition & Departure',d:'Print your top 5 shots for the farewell viewing.'}]},
  {id:6,category:'festival',tag:'Honeymoon',title:'Royal Bhutan Honeymoon',duration:'11 Days',groupSize:'Couple Only',difficulty:'Easy',price:'$6,500',image:'img/web/pema-gyamtsho-e1u8YFRXXvY-unsplash.jpg',desc:"Private dzong dinners, luxury mountain lodges, hot spring bathing, and exclusive sacred site access.",highlights:['Private Dzong Dinner','Luxury Lodges',"Couples' Spa",'Sunrise Balloon'],days:[{n:1,t:'Royal Welcome',d:'Flower petals, private butler, champagne on your mountain balcony.'},{n:2,t:'Sunrise Balloon Over Paro',d:'Private hot air balloon flight at dawn over the Paro Valley.'},{n:3,t:"Tiger's Nest Love Pilgrimage",d:'Guided ascent with a monk who blesses your union.'},{n:4,t:'Private Punakha Dzong Sunset',d:'After-hours candlelit dinner in the dzong courtyard.'},{n:5,t:'Spa Day at Amankora',d:"Couples' Sowa Rigpa treatments, hot stone bath, herbal massage."},{n:6,t:'Phobjikha Romantic Picnic',d:'Champagne and locally sourced mountain fare.'},{n:7,t:'Haa Valley Escape',d:'Remote and rarely visited — your private Himalayan love story.'},{n:8,t:'Bumthang Heritage Night',d:'Private dinner with butter lamp ceremony and folk music.'},{n:9,t:'Thimphu Art & Culture',d:'Commission a personalised thangka as a wedding keepsake.'},{n:10,t:'Farewell Luxury Evening',d:'Rooftop dining under Himalayan stars, blessing ceremony.'},{n:11,t:'Departure with Memories',d:'Personalised journey book and Bhutanese gifts at the airport.'}]}
];

/* Practical route details used by the cards, the itinerary modal, and the
   Journey Compass. These are deliberately pacing notes, not fixed promises:
   road conditions, festival dates, permits and weather are confirmed per trip. */
const ITINERARY_SIGNALS={
  1:{route:['Paro','Thimphu','Punakha','Haa','Paro'],bestTime:'Mar–May · Sep–Nov',practical:'A balanced first visit with several mountain-road transfers. Tiger’s Nest involves a sustained uphill walk; the route is adjusted for weather and acclimatisation.',plannerTags:['culture','nature']},
  2:{route:['Paro','Punakha','Bumthang','Paro'],bestTime:'Festival dates vary annually',practical:'Festival programmes and viewing arrangements are confirmed after the official calendar is released. Expect early starts, crowds and long, joyfully ceremonial days.',plannerTags:['culture','photography']},
  3:{route:['Paro','Jangchhulakha','Jimilangtso','Phajoding','Thimphu'],bestTime:'Apr–May · Oct–Nov',practical:'This high-altitude trek needs a conservative acclimatisation plan, suitable footwear and flexibility for mountain weather. Daily walking distances are adapted to the group.',plannerTags:['trekking','nature']},
  4:{route:['Paro','Punakha','Bumthang','Paro'],bestTime:'Mar–May · Sep–Nov',practical:'Designed for a quiet pace. Meditation, traditional wellness treatments and hot-stone baths are arranged around local availability rather than a rigid daily timetable.',plannerTags:['wellness','nature']},
  5:{route:['Paro','Thimphu','Punakha','Haa','Phobjikha','Bumthang'],bestTime:'Oct–Nov for clear light',practical:'A small group format leaves room for changing light and local events. Respectful photography guidance is included for monasteries, people and festival settings.',plannerTags:['photography','culture','nature']},
  6:{route:['Paro','Punakha','Phobjikha','Haa','Thimphu'],bestTime:'Mar–May · Sep–Nov',practical:'A private, slower-paced route with room for lodge downtime and optional gentle walks. Experiences are shaped around confirmed access and the couple’s interests.',plannerTags:['wellness','culture']}
};

ITINERARIES.push(
  {id:7,category:'classic',tag:'Culture & Craft',title:'Bumthang — Valleys of Sacred Stories',duration:'10 Days',groupSize:'Max 8',difficulty:'Easy',price:'Custom quote',image:'img/web/pema-gyamtsho-eEENbiyVSuI-unsplash.jpg',desc:'A slower passage through central Bhutan: monastery courtyards, weaving villages, apple orchards and the four valleys that make up Bumthang.',highlights:['Jakar Dzong','Jambay Lhakhang','Tang Valley','Traditional Crafts'],days:[{n:1,t:'Arrive in Paro',d:'Settle into the valley and meet your local guide for a practical briefing on altitude, roads and cultural etiquette.'},{n:2,t:'Paro’s Sacred Sites',d:'Visit Kyichu Lhakhang and explore Paro’s traditional streets before an easy acclimatisation walk.'},{n:3,t:'Dochula to Punakha',d:'Cross Dochula Pass, with its 108 chortens, and descend toward the warmer Punakha Valley.'},{n:4,t:'Punakha and Chimi Lhakhang',d:'See Punakha Dzong at the Pho Chhu and Mo Chhu rivers, then walk through rice fields to Chimi Lhakhang.'},{n:5,t:'Over the Pele La to Trongsa',d:'Travel east through changing forest and mountain scenery; visit the commanding Trongsa Dzong if timing allows.'},{n:6,t:'Into Bumthang',d:'Cross Yotong La and arrive in Bumthang, Bhutan’s cultural heartland, with time for a gentle village walk.'},{n:7,t:'Jakar, Jambay and Kurjey',d:'Explore Jakar Dzong, Jambay Lhakhang and Kurjey Lhakhang with context from your Bhutanese guide.'},{n:8,t:'Tang Valley Stories',d:'Spend the day in the quieter Tang Valley, visiting farms, heritage sites and small craft workshops where available.'},{n:9,t:'Ura Village and Mountain Roads',d:'Follow the high valley road to Ura, known for its distinctive stone houses and open pastoral landscape.'},{n:10,t:'Return Transfer or Departure',d:'Continue by road or domestic connection according to the final transport plan, with timings kept deliberately flexible.'}]},
  {id:8,category:'classic',tag:'Slow Travel',title:'Haa & Paro — Hidden Valley Days',duration:'6 Days',groupSize:'Max 6',difficulty:'Easy',price:'Custom quote',image:'img/web/pema-gyamtsho-d5L8nPxssTI-unsplash.jpg',desc:'A soft-paced introduction to western Bhutan, following old valley roads, white temples and everyday farm life between Paro and Haa.',highlights:['Chele La Pass','Haa Valley','Lhakhang Karpo','Paro Farmhouse'],days:[{n:1,t:'Paro Arrival and Valley Orientation',d:'Ease into Bhutan with a short walk through the valley and a guide-led introduction to local customs.'},{n:2,t:'Paro Heritage Walk',d:'Visit Kyichu Lhakhang, the National Museum area and Paro town’s traditional shopfronts.'},{n:3,t:'Chele La to Haa',d:'Drive over Chele La, one of Bhutan’s highest road passes, to the compact and peaceful Haa Valley.'},{n:4,t:'Haa Valley Temples and Village Life',d:'Visit Lhakhang Karpo and Lhakhang Nagpo, then spend time with a local host where arrangements are possible.'},{n:5,t:'Return to Paro',d:'Travel back through mountain forest and enjoy a relaxed farmhouse meal or cooking session in the Paro Valley.'},{n:6,t:'Taktsang Viewpoint or Departure',d:'Choose a gentle viewpoint walk or a morning at leisure before airport transfer.'}]},
  {id:9,category:'trek',tag:'High Himalaya',title:'Jomolhari Trek — Mountains & Yak Pastures',duration:'13 Days',groupSize:'Max 8',difficulty:'Challenging',price:'Custom quote',image:'img/web/raimond-klavins-_1fC0xkDBuU-unsplash.jpg',desc:'A classic high-Himalayan route below sacred Jomolhari, combining remote camps, yak-herding country and several days to adjust to altitude.',highlights:['Jangothang Camp','Yak Pastures','High Passes','Paro Valley'],days:[{n:1,t:'Arrive in Paro',d:'Meet the trekking team and rest after arrival; hydration and a slow first day set the tone.'},{n:2,t:'Paro Acclimatisation Walk',d:'A guided walk, gear check and discussion of the trek’s elevation profile and leave-no-trace approach.'},{n:3,t:'Drive to Shana and Begin',d:'Travel up the Paro Valley and start walking through blue pine forest beside the river.'},{n:4,t:'Trail to Thangthangka',d:'Follow the valley gradually upward; camp routines and pacing are introduced by the support team.'},{n:5,t:'Arrive at Jangothang',d:'Reach the high camp beneath Jomolhari after a steady ascent through yak pasture and alpine terrain.'},{n:6,t:'Acclimatisation Day',d:'Take an optional short hike or rest day at Jangothang, allowing the group to adapt before higher passes.'},{n:7,t:'Cross toward Lingshi',d:'Trek over a high pass when conditions allow, then descend into a broad valley of stone houses and pasture.'},{n:8,t:'Lingshi to Shodu',d:'Continue through remote mountain country with a route selected for the group’s condition and the weather.'},{n:9,t:'Shodu to Barshong',d:'Walk through forested sections and camp near the remnants of an old dzong site.'},{n:10,t:'Forest Descent',d:'Descend gradually through rhododendron and conifer forest toward the roadhead.'},{n:11,t:'Return to Thimphu',d:'Rejoin the road, travel to Thimphu and enjoy a restorative hot-stone bath if desired.'},{n:12,t:'Thimphu Culture Day',d:'A relaxed capital day with time for handicrafts, the Buddha Dordenma area or quiet café stops.'},{n:13,t:'Paro Departure',d:'Transfer to Paro for departure, with an extra buffer night added when flight schedules or weather call for it.'}]},
  {id:10,category:'festival',tag:'Festival & Craft',title:'Thimphu Tsechu — Rituals in the Capital',duration:'8 Days',groupSize:'Max 8',difficulty:'Easy',price:'Custom quote',image:'img/web/pexels-harsh-35168279.jpg',desc:'Built around Bhutan’s best-known capital festival, this journey pairs public Tsechu days with Paro, Punakha and a close look at living craft traditions.',highlights:['Tsechu Ceremonies','Zorig Chusum Crafts','Punakha Dzong','Paro Heritage'],days:[{n:1,t:'Arrive in Paro',d:'Settle in, meet your guide and review festival etiquette, photography boundaries and the final event programme.'},{n:2,t:'Paro to Thimphu',d:'Travel to the capital with stops at traditional bridges, chortens and a local lunch en route.'},{n:3,t:'Thimphu Craft Traditions',d:'Visit craft studios and, where open, the National Institute for Zorig Chusum to understand Bhutan’s thirteen traditional arts.'},{n:4,t:'Tsechu Day One',d:'Attend the day’s public ceremonies and masked dances, with context from your guide on the stories and symbols being performed.'},{n:5,t:'Tsechu Day Two',d:'Return for a different programme of dances and time to explore the market atmosphere around the event.'},{n:6,t:'Dochula and Punakha',d:'Leave the capital for the 108 chortens at Dochula and continue into the river valleys of Punakha.'},{n:7,t:'Punakha Dzong and Paro',d:'Visit the dzong from its riverside approach before returning to Paro for a final evening.'},{n:8,t:'Departure',d:'Airport transfer or an optional extra day in Paro, depending on the confirmed festival and flight schedule.'}]},
  {id:11,category:'wellness',tag:'Wellbeing',title:'Forest, Farmhouse & Hot-Stone Bath',duration:'8 Days',groupSize:'Max 6',difficulty:'Easy',price:'Custom quote',image:'img/web/ugyen-tenzin-7tnEpts6UXU-unsplash.jpg',desc:'A practical reset built from short walks, mountain air, warm local food and slow evenings in Paro, Punakha and Phobjikha.',highlights:['Forest Walks','Dotsho Bath','Gangtey Valley','Farmhouse Cooking'],days:[{n:1,t:'Arrive and Unpack Slowly',d:'Settle into Paro with a calm first evening and a simple orientation to the week ahead.'},{n:2,t:'Paro Valley Mindful Walk',d:'Choose a gentle riverside or hillside walk, with time to visit a temple or simply pause over tea.'},{n:3,t:'Punakha River Valley',d:'Travel over Dochula and settle near Punakha; the afternoon is intentionally left open for rest.'},{n:4,t:'Farmhouse Cooking and Fields',d:'Learn the basics of a Bhutanese meal with a local host and walk through nearby fields at an unhurried pace.'},{n:5,t:'Gangtey and Phobjikha',d:'Follow the road to the broad glacial valley of Phobjikha, a place known for quiet trails and open views.'},{n:6,t:'Gangtey Nature Trail',d:'Walk a suitable section of the Gangtey Nature Trail, then take time for reading, journalling or a local hot-stone bath.'},{n:7,t:'Return to Paro',d:'Travel back through the mountains, stopping only when the group feels like it — the point is to leave white space.'},{n:8,t:'Departure with a Lighter Pace',d:'A final breakfast and airport transfer, or extend with extra nights if a slower return feels right.'}]},
  {id:12,category:'classic',tag:'Wildlife & Culture',title:'Phobjikha — Cranes, Valleys & Village Life',duration:'7 Days',groupSize:'Max 8',difficulty:'Easy',price:'Custom quote',image:'img/web/bhutannaturephotography-common-cranes-6922803.jpg',desc:'A seasonal journey into the wide Phobjikha Valley, combining responsible crane observation with Punakha’s river heritage and Paro’s sacred landscape.',highlights:['Black-Necked Cranes','Gangtey Nature Trail','Punakha Rivers','Paro Taktsang'],days:[{n:1,t:'Arrive in Paro',d:'Meet your guide and prepare for a gentle first day in the valley.'},{n:2,t:'Paro to Punakha',d:'Cross Dochula and visit Punakha Dzong, set where the Pho Chhu and Mo Chhu meet.'},{n:3,t:'Into Phobjikha Valley',d:'Drive to the broad glacial valley and visit the crane information centre when it is open.'},{n:4,t:'Cranes and Gangtey Walks',d:'Observe black-necked cranes from designated areas during their season, then walk a gentle section of the Gangtey Nature Trail.'},{n:5,t:'Village and Monastery Day',d:'Explore Gangtey village and monastery surroundings, with a locally paced visit to farms or craft makers where possible.'},{n:6,t:'Return to Paro',d:'Travel west through the mountains, pausing for landscapes, tea and road-side chortens.'},{n:7,t:'Taktsang Viewpoint or Departure',d:'Choose a Tiger’s Nest viewpoint walk, a full hike if suitable, or head directly to the airport.'}]}
);

Object.assign(ITINERARY_SIGNALS,{
  7:{route:['Paro','Punakha','Trongsa','Bumthang'],bestTime:'Mar–May · Sep–Nov',practical:'Central Bhutan is reached by scenic but long mountain roads. This itinerary keeps spare time in the plan so the journey feels like part of the experience.',plannerTags:['culture','nature']},
  8:{route:['Paro','Chele La','Haa','Paro'],bestTime:'Mar–May · Sep–Nov',practical:'An easy western Bhutan route with short walking options. Chele La’s high elevation can be cold even when the valley below is warm.',plannerTags:['culture','nature','wellness']},
  9:{route:['Paro','Shana','Jangothang','Lingshi','Thimphu'],bestTime:'Apr–May · Oct–Nov',practical:'A demanding high-altitude trek requiring permits, fit trekkers and a flexible weather window. The support crew handles camping logistics and a safe, deliberate pace.',plannerTags:['trekking','nature']},
  10:{route:['Paro','Thimphu','Punakha','Paro'],bestTime:'Timed to official Tsechu dates',practical:'Tsechu dates and programmes change by year. Expect public settings, early starts and respectful dress; all attendance is based on the confirmed festival calendar.',plannerTags:['culture','photography']},
  11:{route:['Paro','Punakha','Phobjikha','Paro'],bestTime:'Mar–May · Sep–Nov',practical:'A low-intensity route for guests who prefer short walks and unstructured evenings. Local treatments and farmhouse visits are subject to availability.',plannerTags:['wellness','nature','culture']},
  12:{route:['Paro','Punakha','Phobjikha','Paro'],bestTime:'Late autumn to late winter',practical:'Black-necked cranes are observed seasonally and from respectful distances. Exact timing varies by year, so the route is confirmed around the migration period.',plannerTags:['wildlife','nature','culture','photography']}
});

/* inline SVG snippets for itinerary cards */
const SVG_CLOCK=`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="7" x2="12" y2="12"/><line x1="12" y1="12" x2="16" y2="15"/></svg>`;
const SVG_PPL=`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="9" cy="7" r="3"/><path d="M3 21C3 17 6 14 9 14C12 14 15 17 15 21"/><circle cx="18" cy="8" r="2.5"/><path d="M15.5 14C17 13.5 19 13.5 20.5 14.5C22 15.5 22.5 18 22.5 21"/></svg>`;
const SVG_BOOT=`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20L5 8L9 4L14 8L18 6L20 10L20 20Z"/><line x1="5" y1="20" x2="20" y2="20"/></svg>`;

/* ── LANGUAGE STATE ──
  activeLanguage is the current page language. pendingLanguage is used while the
  translation disclaimer is open, before the visitor confirms the change.
*/
let activeLanguage='en';
let activeCategory='all';
let pendingLanguage=null;
try{activeLanguage=localStorage.getItem('druk-language')||'en';}catch(_err){}
if(!Object.hasOwn(window.DRUK_I18N,activeLanguage))activeLanguage='en';

function locale(){return window.DRUK_L10N.catalog(activeLanguage)?.page||window.DRUK_I18N[activeLanguage]||window.DRUK_I18N.en;}
function tr(key,vars={}){return window.DRUK_L10N.text(key,vars,activeLanguage);}
function setText(selector,value){const el=document.querySelector(selector);if(el&&value!==undefined)el.textContent=value;}
function setHtml(selector,value){const el=document.querySelector(selector);if(el&&value!==undefined)el.innerHTML=value;}
function setTextList(selector,values){document.querySelectorAll(selector).forEach((el,i)=>{if(values[i]!==undefined)el.textContent=values[i];});}
function setHtmlList(selector,values){document.querySelectorAll(selector).forEach((el,i)=>{if(values[i]!==undefined)el.innerHTML=values[i];});}
function setTextIn(parent,selector,value){const el=parent.querySelector(selector);if(el&&value!==undefined)el.textContent=value;}
function localizedItinerary(it){
  const translated=locale().itineraries[it.id-1];
  return window.DRUK_L10N.details({...it,...(translated?{tag:translated[0],title:translated[1],desc:translated[2]}:{})},activeLanguage);
}
function localizedDuration(value){const days=value.match(/\d+/);return days?`${days[0]} ${locale().ui.days}`:value;}
function localizedGroup(value){
  if(value==='Couple Only')return locale().ui.couple;
  const size=value.match(/\d+/);
  return size?`${locale().ui.max} ${size[0]}`:value;
}
function localizedDifficulty(value){return locale().ui.difficulties[value]||value;}
function syncLanguageSelects(language){document.querySelectorAll('[data-language-select]').forEach(select=>select.value=language);}
function getLanguageLabel(language){const option=document.querySelector(`#desktopLanguage option[value="${language}"]`);return option?option.textContent:language;}
function getJourneySignals(id){return window.DRUK_L10N.signals(ITINERARY_SIGNALS[id],id,activeLanguage);}
function routeGraphic(route,compact=false){const stops=route.map(stop=>window.DRUK_L10N.place(stop,activeLanguage));return `<span class="route-graphic${compact?' route-graphic-compact':''}" aria-label="${tr('routeLabel',{route:stops.join(', ')})}">${stops.map((stop,index)=>`<span class="route-stop"><i></i><b>${stop}</b>${index<stops.length-1?'<em></em>':''}</span>`).join('')}</span>`;}
/* Translation disclaimer flow.
  Non-English language changes show a warning first; English applies directly.
*/
function requestLanguageChange(language){
  if(language===activeLanguage){syncLanguageSelects(activeLanguage);return;}
  if(language==='en'){
applyLanguage(language);
if(mNav.classList.contains('open'))closeMobileNav();
return;
  }
  pendingLanguage=language;
  document.getElementById('translationDisclaimerLanguage').textContent=tr('continueLanguage',{name:getLanguageLabel(language)});
  document.getElementById('translationDisclaimer').classList.add('open');
  document.body.style.overflow='hidden';
  document.getElementById('agreeTranslation').focus();
}
function hideTranslationDisclaimer(){
  document.getElementById('translationDisclaimer').classList.remove('open');
  document.body.style.overflow=mNav.classList.contains('open')?'hidden':'';
}
function cancelLanguageChange(){
  pendingLanguage=null;
  syncLanguageSelects(activeLanguage);
  hideTranslationDisclaimer();
}
function agreeLanguageChange(){
  if(!pendingLanguage)return;
  const language=pendingLanguage;
  pendingLanguage=null;
  applyLanguage(language);
  hideTranslationDisclaimer();
  if(mNav.classList.contains('open'))closeMobileNav();
}
function closeTranslationDisclaimer(e){if(e.target===document.getElementById('translationDisclaimer'))cancelLanguageChange();}

/* Itinerary card rendering.
  Builds the visible package cards from ITINERARIES, so content edits should be
  made in the data array instead of editing generated HTML.
*/
var instantCards=false;
function renderCards(data){
  const ui=locale().ui;
  document.getElementById('itineraryGrid').innerHTML=data.map(original=>{
const it=localizedItinerary(original);
return `
<article class="icard" style="view-transition-name:icard-${it.id}">
  <button type="button" class="icard-image-link wm" data-act="openModal" data-arg="${it.id}" aria-label="${ui.view}: ${it.title.replace(/"/g,'&quot;')}"><img class="icard-img" src="${it.image}" alt="${it.title.replace(/"/g,'&quot;')}" loading="lazy" width="600" height="400"/></button>
  <div class="icard-overlay">
    <div class="icard-tag">${it.tag}</div>
    <h3 class="icard-title">${it.title}</h3>
    <div class="icard-meta">
      <span>${SVG_CLOCK}${localizedDuration(it.duration)}</span>
      <span>${SVG_PPL}${localizedGroup(it.groupSize)}</span>
      <span>${SVG_BOOT}${localizedDifficulty(it.difficulty)}</span>
    </div>
    <div class="icard-footer">
      <button type="button" class="icard-detail-btn" data-act="openModal" data-arg="${it.id}">${ui.view}</button>
    </div>
  </div>
</article>`}).join('');
  // A filter re-render is animated by the view transition, so it skips the scroll reveal.
  if(!instantCards)observeReveal(document.getElementById('itineraryGrid'));
}

/* Itinerary category filtering.
  Called by the tab buttons in the itinerary section.
*/
function filterItineraries(cat,btn){
  activeCategory=cat;
  document.querySelectorAll('.itab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-pressed','false');});
  btn.classList.add('active');
  btn.setAttribute('aria-pressed','true');
  // Cards that stay glide to their new places; the rest fade (View Transitions, where supported).
  const render=()=>{instantCards=true;renderCards(cat==='all'?ITINERARIES:ITINERARIES.filter(i=>i.category===cat));instantCards=false;};
  if(document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.startViewTransition(render);else render();
}

/* Journey Compass.
   This is a thoughtful short-listing tool, not a pretend booking engine: it
   turns a few preferences into three sensible starting routes. */
let finderInterest='culture';
function itineraryDays(it){const match=it.duration.match(/\d+/);return match?Number(match[0]):9;}
function matchesSeason(signals,season){
  const months={spring:['mar','apr','may'],summer:['jun','jul','aug'],autumn:['sep','oct','nov'],winter:['dec','jan','feb']};
  const bestTime=(signals.seasonKey||signals.bestTime).toLowerCase();
  return (months[season]||[]).some(month=>bestTime.includes(month));
}
function finderReason(it,signals,days,season){
  const f=locale().finderUi||{matches:'matches your focus',timing:'fits your timing',seasonMatch:'works well in your season',flexReason:'a flexible starting point'};
  const reasons=[];
  if(signals.plannerTags.includes(finderInterest))reasons.push(f.matches);
  if(Math.abs(itineraryDays(it)-days)<=2)reasons.push(f.timing);
  if(season!=='any'&&matchesSeason(signals,season))reasons.push(f.seasonMatch);
  return reasons.length?reasons.join(' · '):f.flexReason;
}
function renderFinder(){
  const f={...(locale().finderUi||{days:'days',results:'Your three closest routes',trek:'Trek',tour:'Tour',custom:'Custom'}),suggested:tr('finderView')};
  const days=Number(document.getElementById('tripDays').value);
  const season=document.getElementById('tripSeason').value;
  document.getElementById('tripDaysValue').textContent=`${days} ${f.days}`;
  const matches=ITINERARIES.map(original=>{
    const it=localizedItinerary(original);
    const signals=getJourneySignals(it.id);
    let score=0;
    if(signals.plannerTags.includes(finderInterest))score+=8;
    score+=Math.max(0,5-Math.abs(itineraryDays(it)-days));
    if(season!=='any')score+=matchesSeason(signals,season)?4:0;
    return {it,signals,score};
  }).sort((a,b)=>b.score-a.score||itineraryDays(a.it)-itineraryDays(b.it)).slice(0,3);
  document.getElementById('finderResults').innerHTML=`<div class="finder-results-head"><span>${f.results}</span><span>${days} ${f.days} · ${document.querySelector('#tripSeason option:checked').textContent}</span></div>${matches.map(({it,signals})=>`<button type="button" class="finder-match" data-finder-itinerary="${it.id}"><span class="finder-match-top"><span class="finder-match-tag">${it.tag}</span><span>${localizedDuration(it.duration)}</span></span><strong>${it.title}</strong><div class="finder-match-route">${routeGraphic(signals.route,true)}</div><small>${finderReason(it,signals,days,season)}</small><b class="finder-match-arrow">${f.suggested} <i>↗</i></b></button>`).join('')}`;
  document.querySelectorAll('[data-finder-itinerary]').forEach(button=>button.addEventListener('click',()=>openModal(Number(button.dataset.finderItinerary))));
}
document.querySelectorAll('.interest-chip').forEach(chip=>chip.addEventListener('click',()=>{
  finderInterest=chip.dataset.interest;
  document.querySelectorAll('.interest-chip').forEach(item=>{const active=item===chip;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
  renderFinder();
}));
document.getElementById('tripDays').addEventListener('input',renderFinder);
document.getElementById('tripSeason').addEventListener('change',renderFinder);
document.getElementById('customJourneyBtn').addEventListener('click',()=>{
  const preferred=document.querySelector('.interest-chip.active').textContent.trim().toLowerCase();
  const select=document.getElementById('itinerary');
  select.value='Custom / Other';
  document.getElementById('message').value=tr('customMessage',{days:document.getElementById('tripDays').value,focus:preferred});
  document.getElementById('duration').value=document.getElementById('tripDays').value;
  handoffToEnquiry(['itinerary','duration','message']);
});

/* Enquiry hand-off (PRD R-14). Every "plan" path — the hero bar, an itinerary, the compass —
   fills the form itself, then calls this: glide to the form, mark the fields that were filled,
   confirm with a toast, and put the cursor in the first required field that is still empty. */
function handoffToEnquiry(filledIds){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enquiry=document.getElementById('enquiry');
  const glide=()=>enquiry.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
  // Wait for the glide to end (scrollend, or a timeout where it is unsupported).
  const wait=()=>{let done=false;const once=()=>{if(done)return;done=true;settle();};window.addEventListener('scrollend',once,{once:true});setTimeout(once,reduce?50:1600);};
  let settled=false,retries=0;
  const settle=()=>{
    if(settled)return;
    // The page can grow mid-glide (the atlas loads on approach), leaving the form short of the top.
    const offset=enquiry.getBoundingClientRect().top-(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)||0);
    if(Math.abs(offset)>8&&retries++<2){glide();wait();return;}
    settled=true;
    filledIds.forEach((id,i)=>{
      const group=document.getElementById(id)?.closest('.form-group');if(!group)return;
      group.classList.remove('is-prefilled');void group.offsetWidth;
      group.style.setProperty('--i',i);group.classList.add('is-prefilled');
    });
    const next=[...document.querySelectorAll('#enquiryForm [required]')].find(field=>!field.value.trim());
    (next||document.getElementById('submitBtn')).focus({preventScroll:true});
  };
  glide();wait();
  showToast(tr('prefilled'));
}

/* Itinerary detail modal.
  Looks up the itinerary by id and fills the hidden modal shell in the HTML.
*/
let itineraryTrigger=null,activeItineraryId=null;
/* PDF brochures are pre-built by scripts/build-brochures.js into brochures/ (English only).
   This name must match brochureFile() in that script; a test checks every file exists. */
function brochureFile(it){
  const slug=it.title.split(' — ')[0].normalize('NFKD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/['’]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  return `druk-voyages-${it.id}-${slug}.pdf`;
}
function openModal(id){
  activeItineraryId=id;
  const original=ITINERARIES.find(i=>i.id===id);if(!original)return;
  const it=localizedItinerary(original);
  const signals=getJourneySignals(id);
  const ui=locale().ui;
  const detailLabels=locale().itineraryLabels||{route:'Route sketch',bestFor:'Best for',planner:'Local planner’s note'};
  document.getElementById('modalHeroImg').src=it.image;
  document.getElementById('modalHeroImg').alt=it.title;
  document.getElementById('modalTag').textContent=it.tag;
  document.getElementById('modalTitle').textContent=it.title;
  document.getElementById('modalMeta').innerHTML=`<span>${localizedDuration(it.duration)}</span><span>${localizedGroup(it.groupSize)}</span><span>${localizedDifficulty(it.difficulty)}</span>`;
  document.getElementById('modalDesc').textContent=it.desc;
  document.getElementById('modalRoute').innerHTML=`<span class="modal-detail-label">${detailLabels.route}</span>${routeGraphic(signals.route)}<span class="modal-best-time">${detailLabels.bestFor}: ${signals.bestTime}</span>`;
  document.getElementById('modalPractical').innerHTML=`<span class="modal-detail-label">${detailLabels.planner}</span><p>${signals.practical}</p>`;
  const brochure=document.getElementById('modalBrochure');
  brochure.href=`brochures/${brochureFile(original)}`;
  brochure.setAttribute('download',brochureFile(original));
  brochure.querySelector('span').textContent=tr('downloadBrochure');
  document.getElementById('modalDays').innerHTML=`<h4>${ui.dayByDay}</h4>`+it.days.map(d=>`<div class="day-item"><div class="day-num">${d.n}</div><div class="day-info"><strong>${d.t}</strong><span>${d.d}</span></div></div>`).join('');
  document.getElementById('modalOverlay').classList.remove('closing');
  document.getElementById('modalOverlay').classList.add('open');
  if(!itineraryTrigger||!document.getElementById('modalOverlay').contains(document.activeElement))itineraryTrigger=document.activeElement;
  document.body.style.overflow='hidden';
  document.getElementById('modalDismiss').focus();
}
/* Overlays leave the way they came in: .closing plays the exit (styles.css "Flows and motion"),
   then .open comes off. Re-opening during the exit cancels it by removing .closing. */
function dismissOverlay(overlay){
  if(!overlay.classList.contains('open'))return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){overlay.classList.remove('open');return;}
  overlay.classList.add('closing');
  setTimeout(()=>{if(overlay.classList.contains('closing'))overlay.classList.remove('open','closing');},260);
}
function closeItineraryModal(){dismissOverlay(document.getElementById('modalOverlay'));document.body.style.overflow='';if(itineraryTrigger)itineraryTrigger.focus();}
/* "Plan this journey": carry the open itinerary into the enquiry form instead of making the
   visitor find the form and retype it. Journey types are the enquiry form's option values. */
const JOURNEY_TYPES={Photography:'Photography Tour',Honeymoon:'Honeymoon Package',classic:'Classic Highlights',festival:'Festival Journey',trek:'Himalayan Trekking',wellness:'Wellness Retreat'};
document.getElementById('modalPlan').addEventListener('click',()=>{
  const original=ITINERARIES.find(i=>i.id===activeItineraryId);if(!original)return;
  const days=itineraryDays(original);
  document.getElementById('itinerary').value=JOURNEY_TYPES[original.tag]||JOURNEY_TYPES[original.category]||'Custom / Other';
  document.getElementById('duration').value=days;
  document.getElementById('message').value=tr('itineraryMessage',{title:localizedItinerary(original).title,days});
  itineraryTrigger=null; // focus moves on to the form, not back to the card
  closeItineraryModal();
  handoffToEnquiry(['itinerary','duration','message']);
});
function closeModal(e){if(e.target===document.getElementById('modalOverlay'))closeItineraryModal();}

/* Gallery lightbox.
  Stores the last opened gallery item so keyboard focus can return there after
  the lightbox closes.
*/
let lastGalleryTrigger=null;
function openGalleryLightbox(img){
  lastGalleryTrigger=img.closest('.gallery-item');
  document.getElementById('galleryLightboxImg').src=img.src;
  document.getElementById('galleryLightboxImg').alt=img.alt;
  document.getElementById('galleryLightboxTitle').textContent=img.alt;
  document.getElementById('galleryLightboxCaption').textContent=img.dataset.caption;
  document.getElementById('galleryLightbox').classList.remove('closing');
  document.getElementById('galleryLightbox').classList.add('open');
  document.body.style.overflow='hidden';
  document.querySelector('.gallery-lightbox-close').focus();
}
function closeGalleryLightbox(e){
  const lightbox=document.getElementById('galleryLightbox');
  if(e&&e.target!==lightbox)return;
  dismissOverlay(lightbox);
  document.body.style.overflow='';
  if(lastGalleryTrigger)lastGalleryTrigger.focus();
}
document.querySelectorAll('.gallery-item').forEach(item=>{
  const img=item.querySelector('img');
  item.setAttribute('role','button');
  item.setAttribute('tabindex','0');
  item.setAttribute('aria-label',`View ${img.alt}`);
  item.addEventListener('click',()=>openGalleryLightbox(img));
  item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openGalleryLightbox(img);}});
});

/* Page translation application.
  Pulls translated strings from translations.js and writes them into existing
  elements. Dynamic itinerary cards are rerendered at the end.
*/
let languageRevision=0;
async function applyLanguage(language){
  const revision=++languageRevision;
  const nextLanguage=window.DRUK_I18N[language]?language:'en';
  try{await window.DRUK_L10N.load(nextLanguage);}catch(error){syncLanguageSelects(activeLanguage);showToast(tr('translationError'));console.error('[Translation]',error);return;}
  if(revision!==languageRevision)return;
  activeLanguage=nextLanguage;
  const l=locale();
  const ui=l.ui;
  const x=l.extraUi||{disclaimerTitle:'Translation Notice',disclaimerText:'Translations are provided for convenience. For itinerary details or important information, please consult the English version or contact us.',cancel:'Cancel',agree:'Agree',privacy:'Privacy',terms:'Terms',compass:'The Journey Compass',compassTitle:'Find Your Bhutan Rhythm',preferences:'Journey preferences',live:'Live match',drawn:'What are you drawn to?',culture:'Living culture',nature:'Wild landscapes',trekking:'Trekking',wellness:'Stillness & wellness',wildlife:'Wildlife',photography:'Photography',travelDays:'Travel days',season:'Likely travel season',flexible:'I am flexible',routeCustom:'I want a route made for me',routeResults:'Your three closest routes',routeView:'View route',mapTitle:'Bhutan map',chatInput:'Ask anything about Bhutan…',chatSend:'Send',chatSettings:'Settings',chatClear:'Clear',chatClose:'Close',mapZoom:'Map zoom',mapPlaces:'Places to discover',mapGuide:'Place guide'};
  document.documentElement.lang=activeLanguage;
  const atlasSection=document.getElementById('bhutan-map');if(atlasSection)atlasSection.lang=activeLanguage;
  document.title=l.meta;
  document.querySelector('meta[name="description"]').content=l.description;
  try{localStorage.setItem('druk-language',activeLanguage);}catch(_err){}
  document.querySelectorAll('[data-language-select]').forEach(select=>{select.value=activeLanguage;select.setAttribute('aria-label',ui.language);});
  setTextList('.logo-text .tagline',[l.tagline,l.tagline]);
  setText('.about-logo-motto',l.tagline);
  setTextList('.nav-links a:not([data-map-nav]):not([data-nav-i18n])',l.menu);
  setTextList('.mobile-nav>a:not([data-map-nav]):not([data-nav-i18n])',l.menu);
  document.querySelectorAll('[data-nav-i18n]').forEach(link=>{link.textContent=tr(link.dataset.navI18n);});
  document.querySelectorAll('[data-ui-text]').forEach(node=>{node.textContent=tr(node.dataset.uiText);});
  document.getElementById('mobilePlanBar').textContent=document.querySelector('.nav-links .nav-cta').textContent;
  const mapNavLabels={en:'Explore Bhutan',ja:'ブータン地図',zh:'探索不丹',ko:'부탄 지도',es:'Explora Bután',fr:'Explorer le Bhoutan',vi:'Khám phá Bhutan',pt:'Explore o Butão'};
  document.querySelectorAll('[data-map-nav]').forEach(link=>{link.textContent=mapNavLabels[activeLanguage]||mapNavLabels.en;});
  setText('.hero-eyebrow',l.hero[0]);renderHeroMotto();setTextList('.hero .hero-btns a',[l.hero[3],l.hero[4]]);setText('.scroll-hint span',l.hero[5]);
  setTextList('.stat-label',l.stats);
  document.querySelectorAll('.marquee-item').forEach((el,i)=>{const node=[...el.childNodes].find(child=>child.nodeType===3);if(node)node.nodeValue=l.marquee[i%l.marquee.length];});
  setHtmlList('.about-emblem',l.gnhPillars);setHtml('.about-badge .lbl',l.about[0]);setText('.about-text .section-label',l.about[1]);setHtml('.about-text .section-title',l.about[2]);setTextList('.about-text>p',[l.about[3],l.about[4]]);const more=l.aboutMore||window.DRUK_I18N.en.aboutMore;setText('.about-lede',more[0]);document.querySelectorAll('.about-promise').forEach((item,i)=>{setTextIn(item,'h3',more[1+i*2]);setTextIn(item,'p',more[2+i*2]);});setText('.about-cta',more[7]);const gnh=l.aboutGnh||window.DRUK_I18N.en.aboutGnh;setText('.about-gnh-intro .section-label',gnh[0]);setText('.about-gnh-intro h3',gnh[1]);setText('.about-gnh-intro p',gnh[2]);setTextList('.feature-item span',l.about.slice(5));
  setText('#itineraries .section-label',l.journeys[0]);setHtml('#itineraries .section-title',l.journeys[1]);setTextList('.itab',l.journeys.slice(2));
  setText('#gallery .section-label',l.gallery[0]);setHtml('#gallery .section-title',l.gallery[1]);setText('#gallery .gallery-intro p',l.gallery[2]);
  setText('#experiences .section-label',l.experience[0]);setHtml('#experiences .section-title',l.experience[1]);document.querySelectorAll('.exp-card').forEach((card,i)=>{setTextIn(card,'h3',l.experience[i+2][0]);setTextIn(card,'p',l.experience[i+2][1]);});
  setText('.calendar-section .section-label',l.planning[0]);setHtml('.calendar-section .section-title',l.planning[1]);setText('.calendar-header p',l.planning[2]);document.querySelectorAll('.season-card').forEach((card,i)=>{setTextIn(card,'.season-name',l.planning[i+3][0]);setTextIn(card,'.season-months',l.planning[i+3][1]);setTextIn(card,'.season-desc',l.planning[i+3][2]);});
  setText('.enquiry-info .section-label',l.enquiry[0]);setHtml('.enquiry-info h2',l.enquiry[1]);setText('.enquiry-info>p',l.enquiry[2]);setText('.contact-item:last-child span',l.enquiry[3]);setTextList('.enquiry-form label',l.enquiry.slice(4,13));setText('#itinerary option',l.enquiry[13]);document.querySelectorAll('#itinerary option:not(:first-child)').forEach((option,i)=>option.textContent=l.enquiry[14][i]);document.getElementById('message').placeholder=l.enquiry[15];setText('#submitBtn',l.enquiry[16]);
  setText('.testimonials .section-label',l.testimonials[0]);setHtml('.testimonials .section-title',l.testimonials[1]);setTextList('.testi-card:not([data-guest]) .testi-text',l.testimonials.slice(2,5));setTextList('.testi-card:not([data-guest]) .testi-from',l.testimonials.slice(5,8));
  setText('.cta-section .section-label',l.cta[0]);setHtml('.cta-section h2',l.cta[1]);setText('.cta-section p',l.cta[2]);setTextList('.cta-section .hero-btns a',l.cta.slice(3));
  setText('.footer-brand>p',l.footer[0]);setTextList('.footer-col h4',l.footer.slice(1,4));setTextList('.footer-col:nth-child(2) li a',l.footer[4]);setText('.footer-col:nth-child(4) li:last-child span',l.footer[5]);setText('.footer-bottom>span:first-child',l.footer[6]);setText('.footer-bottom-links a',l.footer[9]);
  setTextList('.footer-bottom-links a',[l.footer[9]]);
  setText('.translation-dialog-label',x.disclaimerTitle);setText('#translationDisclaimerTitle',x.disclaimerTitle);setText('#translationDisclaimerText',x.disclaimerText);setText('.translation-dialog-cancel',x.cancel);setText('.translation-dialog-agree',x.agree);
  setText('.finder-intro .section-label',x.compass);setText('.finder-intro h2',x.compassTitle);setText('.finder-panel-top>span:first-child',x.preferences);const live=document.querySelector('.finder-live');if(live)live.innerHTML=`<i></i> ${x.live}`;setText('.finder-fieldset legend',x.drawn);setTextList('.interest-chip',[x.culture,x.nature,x.trekking,x.wellness,x.wildlife,x.photography]);setText('.finder-range-label>span',x.travelDays);setText('.finder-season>span',x.season);setText('#tripSeason option[value="any"]',x.flexible);['spring','summer','autumn','winter'].forEach((key,i)=>{const season=l.planning[i+3];setText(`#tripSeason option[value="${key}"]`,`${season[0]} · ${season[1]}`);});const custom=document.getElementById('customJourneyBtn');if(custom)custom.innerHTML=`${x.routeCustom} <span>↗</span>`;
  const chatLocale=l.chatUi||{provider:'AI Provider',key:'Groq API Key',save:'Save & Enable AI',quick:['Best itineraries','Best time','Pricing',"Tiger's Nest",'Visa info']};
  document.getElementById('chatFab').setAttribute('aria-label',`Chat with Pema`);document.getElementById('chatWin').setAttribute('aria-label',`Pema, ${x.compass}`);document.getElementById('chatInput').placeholder=x.chatInput;document.getElementById('chatInput').setAttribute('aria-label',x.chatInput);document.getElementById('chatSend').setAttribute('aria-label',x.chatSend);setText('.chat-name',chatLocale.name||'Pema · Your Guide');setText('#chatSetup label[for="chatProviderSelect"]',chatLocale.provider);setText('#chatSetup label[for="groqKeyInput"]',chatLocale.key);setText('#chatSetup>button',chatLocale.save);setTextList('.chat-qr .qr',chatLocale.quick);document.querySelectorAll('.chat-hbtn')[0]?.setAttribute('aria-label',x.chatSettings);document.querySelectorAll('.chat-hbtn')[1]?.setAttribute('aria-label',x.chatClear);document.querySelectorAll('.chat-hbtn')[2]?.setAttribute('aria-label',x.chatClose);setText('#chatPowered',chatLocale.powered||'Pema · Druk Voyages AI travel guide');
  document.getElementById('hamburger').setAttribute('aria-label',ui.menu);setText('.modal-close-btn',ui.close);document.getElementById('modalDismiss').setAttribute('aria-label',ui.close);document.querySelectorAll('.hero-dot').forEach((dot,i)=>dot.setAttribute('aria-label',`${ui.slide} ${i+1}`));
  const atlasTitle=document.getElementById('atlasTitle');if(atlasTitle)atlasTitle.textContent=x.mapTitle;window.DRUK_SET_ATLAS_LANGUAGE?.(activeLanguage);window.DRUK_CHAT_REFRESH_LANGUAGE?.();
  renderCards(activeCategory==='all'?ITINERARIES:ITINERARIES.filter(i=>i.category===activeCategory));
  renderFinder();
  applyCompleteTranslations();
  syncPlanBar();
  setTestiLabels();
  window.renderTeam?.();
  if(typeof refreshEmerge==='function')refreshEmerge();
}

/* Hero plan bar.
  Mirrors the enquiry form's translated labels and options (keeping any choice already made),
  and on submit copies the answers into the enquiry form and scrolls there.
*/
function syncPlanBar(){
  const fields=[['planStyle','itinerary'],['planArrival','arrival'],['planGuests','guests']];
  fields.forEach(([own,source])=>{
    document.querySelector(`label[for="${own}"]`).textContent=document.querySelector(`label[for="${source}"]`).textContent;
    const ownField=document.getElementById(own),sourceField=document.getElementById(source);
    if(ownField.tagName==='SELECT'){const kept=ownField.value;ownField.innerHTML=sourceField.innerHTML;if(kept)ownField.value=kept;}
  });
  document.querySelector('#planBar button').textContent=document.querySelector('.nav-cta').textContent;
}
document.getElementById('planBar').addEventListener('submit',event=>{
  event.preventDefault();
  document.getElementById('itinerary').value=document.getElementById('planStyle').value;
  document.getElementById('arrival').value=document.getElementById('planArrival').value;
  document.getElementById('guests').value=document.getElementById('planGuests').value;
  handoffToEnquiry(['itinerary','arrival','guests'].filter(id=>document.getElementById(id).value));
});

const englishGallery=[...document.querySelectorAll('.gallery-item img')].map(img=>[img.alt,img.dataset.caption]);
function applyCompleteTranslations(){
  window.DRUK_L10N.apply(activeLanguage);
  setText('#atlasTitle',tr('mapTitle'));
  document.getElementById('chatFab').setAttribute('aria-label',tr('chatFab'));
  document.getElementById('chatWin').setAttribute('aria-label',tr('chatDialog'));
  document.querySelectorAll('.hero-dot').forEach((dot,i)=>dot.setAttribute('aria-label',tr('slide',{count:i+1})));
  heroPause.setAttribute('aria-label',tr(heroPaused?'resume':'pause'));
  const destinations=['Paro Valley','Thimphu','Punakha','Bumthang','Haa Valley','Phobjikha'];
  document.querySelectorAll('.footer-col:nth-child(3) li a').forEach((link,i)=>link.textContent=window.DRUK_L10N.place(destinations[i],activeLanguage));
  const chatLabels=locale().extraUi||{chatSettings:'Settings',chatClear:'Clear',chatClose:'Close'};
  document.querySelectorAll('.chat-hbtn').forEach((button,i)=>button.title=[chatLabels.chatSettings,chatLabels.chatClear,chatLabels.chatClose][i]);
  window.DRUK_COUNTRY_PICKER?.refresh();
  const gallery=window.DRUK_L10N.catalog(activeLanguage)?.gallery||englishGallery;
  document.querySelectorAll('.gallery-item').forEach((item,i)=>{const img=item.querySelector('img');img.alt=gallery[i][0];img.dataset.caption=gallery[i][1];item.setAttribute('aria-label',tr('galleryView',{name:img.alt}));});
  if(document.getElementById('modalOverlay').classList.contains('open')&&activeItineraryId)openModal(activeItineraryId);
  if(document.getElementById('galleryLightbox').classList.contains('open')&&lastGalleryTrigger)openGalleryLightbox(lastGalleryTrigger.querySelector('img'));
  window.DRUK_CHAT_REFRESH_LANGUAGE?.();
}

/* Hero slider.
  Background images are defined in styles.css. This block rotates active slides,
  creates the dot controls, and swaps the hero headline motto.
*/
const slides=document.querySelectorAll('.hero-slide');
const HERO_IMAGES=[
  'img/web/homepage_slides/615796-1920x1282-desktop-hd-bhutan-background-photo.jpg',
  'img/web/homepage_slides/1.jpg',
  'img/web/homepage_slides/4.jpg',
  'img/web/homepage_slides/717072-2560x1707-desktop-hd-paro-valley-bhutan-background.jpg',
  'img/web/homepage_slides/2.jpg'
];
slides[0].style.backgroundImage=`url("${HERO_IMAGES[0]}")`;
const dotsEl=document.getElementById('heroDots');
const heroTitle=document.querySelector('.hero h1');
let cur=0;
slides.forEach((_,i)=>{const d=document.createElement('button');d.type='button';d.className='hero-dot'+(i===0?' active':'');d.setAttribute('aria-label',`Slide ${i+1}`);d.setAttribute('aria-pressed',String(i===0));d.onclick=()=>{goTo(i);syncHeroTimer();};dotsEl.appendChild(d);});
function renderHeroMotto(){
  const copy=locale();
  const fallback=window.DRUK_I18N.en;
  const description=document.querySelector('.hero-desc');
  heroTitle.innerHTML=(copy.heroMottos||fallback.heroMottos)[cur];
  // Each motto rises out of its own slide's photograph.
  heroTitle.style.setProperty('--emerge-img',`url("${HERO_IMAGES[cur]}")`);
  if(typeof refreshEmerge==='function')refreshEmerge(heroTitle);
  description.textContent=(copy.heroDescriptions||fallback.heroDescriptions)[cur];
  [heroTitle,description].forEach(element=>element.classList.remove('hero-title-reveal'));
  void heroTitle.offsetWidth;
  [heroTitle,description].forEach(element=>element.classList.add('hero-title-reveal'));
}
function goTo(i){slides[cur].classList.remove('active');dotsEl.children[cur].classList.remove('active');dotsEl.children[cur].setAttribute('aria-pressed','false');cur=i;slides[cur].style.backgroundImage=`url("${HERO_IMAGES[cur]}")`;slides[cur].classList.add('active');dotsEl.children[cur].classList.add('active');dotsEl.children[cur].setAttribute('aria-pressed','true');renderHeroMotto();}
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const heroPause=document.getElementById('heroPause');
let heroPaused=reducedMotion.matches,timer;
function syncHeroTimer(){clearInterval(timer);if(!heroPaused&&!document.hidden)timer=setInterval(()=>goTo((cur+1)%slides.length),8000);heroPause.setAttribute('aria-pressed',String(heroPaused));heroPause.setAttribute('aria-label',tr(heroPaused?'resume':'pause'));}
heroPause.addEventListener('click',()=>{heroPaused=!heroPaused;syncHeroTimer();});
document.addEventListener('visibilitychange',syncHeroTimer);
reducedMotion.addEventListener('change',()=>{heroPaused=reducedMotion.matches;syncHeroTimer();});
syncHeroTimer();

/* Sticky navigation state.
  Adds .scrolled after the page moves down so CSS can tighten the header.
*/
window.addEventListener('scroll',()=>{document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60);});
/* The masthead can outgrow --nav-h (large text settings, long translations). Its real height is
   published as --nav-actual, and --nav-space (styles.css) takes the larger of the two for the hero
   padding, anchor offsets and the mobile menu. */
if('ResizeObserver' in window){const navbarEl=document.getElementById('navbar');new ResizeObserver(()=>document.documentElement.style.setProperty('--nav-actual',navbarEl.offsetHeight+'px')).observe(navbarEl);}

/* Wayfinding (docs/TASKS.md T4, T8, T9).
  Scrollspy marks the nav link for the section in view with aria-current. On phones a plan
  bar offers the enquiry once the hero has scrolled away, and hides while the enquiry form
  or footer is on screen. Back-to-top appears after the first screen. All three are
  enhancements: without IntersectionObserver the links still work.
*/
document.addEventListener('DOMContentLoaded',()=>{
  if(!('IntersectionObserver' in window))return;
  const navLinks=[...document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta), .mobile-nav > a[href^="#"]:not(.m-cta)')];
  const sections=[...new Set(navLinks.map(link=>link.getAttribute('href')))].map(hash=>document.querySelector(hash)).filter(Boolean);
  const visible=new Map();
  const markCurrent=()=>{
    const current=sections.filter(section=>visible.get(section)).sort((a,b)=>visible.get(b)-visible.get(a))[0];
    navLinks.forEach(link=>{
      if(current&&link.getAttribute('href')==='#'+current.id)link.setAttribute('aria-current','true');
      else link.removeAttribute('aria-current');
    });
  };
  const spy=new IntersectionObserver(entries=>{
    entries.forEach(entry=>visible.set(entry.target,entry.isIntersecting?entry.intersectionRatio:0));
    markCurrent();
  },{rootMargin:'-35% 0px -55% 0px',threshold:[0,.25,.5,.75,1]});
  sections.forEach(section=>spy.observe(section));

  const planBar=document.getElementById('mobilePlanBar');
  const backToTop=document.getElementById('backToTop');
  // The floating Plan My Trip bar hides wherever planning already happens: the hero, both plan steps and the footer.
  const state={hero:true,plan:false,enquiry:false,footer:false};
  const sync=()=>{
    const showPlan=!state.hero&&!state.plan&&!state.enquiry&&!state.footer;
    planBar.classList.toggle('is-shown',showPlan);
    planBar.setAttribute('aria-hidden',String(!showPlan));
    planBar.tabIndex=showPlan?0:-1;
    backToTop.classList.toggle('is-shown',!state.hero);
    backToTop.tabIndex=state.hero?-1:0;
  };
  const watch=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{state[entry.target.dataset.watch]=entry.isIntersecting;});
    sync();
  });
  [['hero','.hero'],['plan','#journey-finder'],['enquiry','#enquiry'],['footer','footer']].forEach(([key,selector])=>{
    const element=document.querySelector(selector);
    if(element){element.dataset.watch=key;watch.observe(element);}
  });
  backToTop.addEventListener('click',()=>{
    window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    document.getElementById('mainContent').focus({preventScroll:true});
  });
},{once:true});

/* Scroll reveal.
  Section headings and cards fade up as they enter the viewport. Nothing is hidden until
  .motion-ready is on <html>, which is only added when IntersectionObserver exists and the
  visitor has not asked for reduced motion. renderCards() calls observeReveal() for re-rendered
  itinerary cards; `var` keeps that call safe if it runs before setup.
*/
var revealObserver=null;
const REVEAL_SELECTOR='.section-label, .bento-tile, .stat-tile, .about-promise, .icard, .exp-card, .season-card, .gallery-item, .testi-slider';
/* Living titles (PRD R-13). Titles are split into word spans so each word can rise out of a
   photograph in turn (styles in the "Living titles" block of styles.css). applyLanguage() and the
   hero slideshow rewrite these titles with innerHTML, so they call refreshEmerge() afterwards. */
const EMERGE_SELECTOR='.hero h1, .section-title, .enquiry-info h2, .cta-content h2';
var emergeObserver=null;
function splitEmerge(title){
  if(title.querySelector('.w'))return;
  let index=0;
  const walk=node=>[...node.childNodes].forEach(child=>{
    if(child.nodeType===1){walk(child);return;}
    if(child.nodeType!==3||!child.nodeValue.trim())return;
    const fragment=document.createDocumentFragment();
    // Intl.Segmenter finds words in languages written without spaces (ja, zh); whitespace is the fallback.
    const parts=window.Intl&&Intl.Segmenter?[...new Intl.Segmenter(document.documentElement.lang||'en',{granularity:'word'}).segment(child.nodeValue)].map(s=>s.segment):child.nodeValue.split(/(\s+)/);
    let last=null;
    for(const part of parts){
      if(!part)continue;
      if(!part.trim()){fragment.append(part);last=null;continue;}
      // Punctuation rides with the word before it, so a comma never wraps onto a line alone.
      if(last&&!/[\p{L}\p{N}]/u.test(part)){last.textContent+=part;continue;}
      const word=last=document.createElement('span');
      word.className='w';
      word.style.setProperty('--w',index++);
      word.textContent=part;
      fragment.append(word);
    }
    child.replaceWith(fragment);
  });
  walk(title);
}
function refreshEmerge(root){
  const titles=root&&root.matches&&root.matches(EMERGE_SELECTOR)?[root]:document.querySelectorAll(EMERGE_SELECTOR);
  titles.forEach(title=>{
    title.classList.add('emerge');
    splitEmerge(title);
    if(emergeObserver&&!title.classList.contains('is-live'))emergeObserver.observe(title);
  });
}
function observeReveal(root){
  if(!revealObserver||!root)return;
  root.querySelectorAll(REVEAL_SELECTOR).forEach(element=>{
    // Stagger siblings in rows of up to four.
    element.style.setProperty('--i',Array.prototype.indexOf.call(element.parentElement.children,element)%4);
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  if(!('IntersectionObserver' in window)||!matchMedia('(prefers-reduced-motion: no-preference)').matches)return;
  revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  }),{rootMargin:'0px 0px -8% 0px'});
  document.documentElement.classList.add('motion-ready');
  observeReveal(document);
  emergeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add('is-live');
    emergeObserver.unobserve(entry.target);
  }),{rootMargin:'0px 0px -12% 0px'});
  refreshEmerge();
  // Logo loop: build (.lg-play, 2.6s), hold the finished logo for 5s, scatter (.lg-out, 0.8s), repeat.
  // It runs only while the logo is on screen and the tab is visible, and rebuilds when it returns.
  const LOGO_BUILD=2600,LOGO_HOLD=5000,LOGO_SCATTER=800;
  function loopLogo(logo){
    let timer=0,onScreen=false;
    const build=()=>{logo.classList.remove('lg-play','lg-out');void logo.getBoundingClientRect();logo.classList.add('lg-play');timer=setTimeout(scatter,LOGO_BUILD+LOGO_HOLD);};
    const scatter=()=>{logo.classList.add('lg-out');timer=setTimeout(build,LOGO_SCATTER);};
    const sync=()=>{clearTimeout(timer);if(onScreen&&!document.hidden)build();};
    new IntersectionObserver(entries=>{const visible=entries.some(entry=>entry.isIntersecting);if(visible!==onScreen){onScreen=visible;sync();}}).observe(logo);
    document.addEventListener('visibilitychange',sync);
  }
  // The About logo moves its parts (knot, bolt, dragon, letters; styles.css "Animated logo").
  // As About approaches, the static logo image is swapped for the tagged inline SVG built by
  // scripts/build-reversed-logo.js. Reduced motion, no JavaScript or a failed fetch keep the image.
  // Season effects (styles.css "Season effects"): petals, rain, leaves or snow over each season photo.
  // Particles get stable pseudo-random placement, sizes and speeds, and move only while the card is on screen.
  const SEASON_FX={spring:{shape:'petal',count:14,size:[8,14],time:[11,18],drift:[-12,18],o:.95},summer:{shape:'rain',count:40,size:[16,30],time:[.9,1.6],drift:[0,0],o:.8},autumn:{shape:'leaf',count:12,size:[12,20],time:[9,15],drift:[-18,12],o:.95},winter:{shape:'snow',count:36,size:[2,6],time:[12,22],drift:[-10,10],o:.85}};
  const seasonObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('fx-live',entry.isIntersecting)));
  document.querySelectorAll('.season-card').forEach(card=>{
    const season=Object.keys(SEASON_FX).find(name=>card.classList.contains(name));if(!season)return;
    const fx=SEASON_FX[season];
    const layer=document.createElement('span');layer.className=`season-fx season-fx-${fx.shape}`;layer.setAttribute('aria-hidden','true');
    const pick=(n,salt)=>{const v=Math.sin((n+1)*12.9898+salt*78.233)*43758.5453;return v-Math.floor(v);};
    const between=([low,high],n,salt)=>low+(high-low)*pick(n,salt);
    for(let i=0;i<fx.count;i++){
      const particle=document.createElement('i');
      const time=between(fx.time,i,2);
      particle.style.cssText=`--x:${(pick(i,1)*100).toFixed(1)}%;--s:${between(fx.size,i,3).toFixed(1)}px;--d:${time.toFixed(2)}s;--delay:-${(pick(i,4)*time).toFixed(2)}s;--drift:${between(fx.drift,i,5).toFixed(1)}cqw;--spin:${Math.round(between([-260,260],i,6))}deg;--o:${(fx.o*(.55+.45*pick(i,7))).toFixed(2)}`;
      layer.append(particle);
    }
    card.prepend(layer);
    seasonObserver.observe(card);
  });
  // Gallery tilt (styles.css "Gallery in 3D"): on pointer devices a photo leans toward the pointer and lifts,
  // with a glare where the pointer is. One update per frame; the photo settles back when the pointer leaves.
  const galleryGrid=document.querySelector('.gallery-grid');
  if(galleryGrid&&matchMedia('(hover: hover) and (pointer: fine)').matches){
    let tiltFrame=0,tilted=null;
    const settle=item=>{item.classList.remove('is-tilting');['--rx','--ry','--gx','--gy'].forEach(name=>item.style.removeProperty(name));};
    galleryGrid.addEventListener('pointermove',event=>{
      const item=event.target.closest('.gallery-item');if(!item)return;
      if(tilted&&tilted!==item)settle(tilted);
      tilted=item;cancelAnimationFrame(tiltFrame);
      tiltFrame=requestAnimationFrame(()=>{
        const box=item.getBoundingClientRect(),x=(event.clientX-box.left)/box.width,y=(event.clientY-box.top)/box.height;
        item.classList.add('is-tilting');
        item.style.setProperty('--rx',`${((.5-y)*12).toFixed(2)}deg`);item.style.setProperty('--ry',`${((x-.5)*14).toFixed(2)}deg`);
        item.style.setProperty('--gx',`${(x*100).toFixed(1)}%`);item.style.setProperty('--gy',`${(y*100).toFixed(1)}%`);
      });
    });
    galleryGrid.addEventListener('pointerleave',()=>{cancelAnimationFrame(tiltFrame);if(tilted)settle(tilted);tilted=null;});
  }
  // Poster wall: each column holds one set of photos; a second copy makes the drift seamless
  // (the column moves by exactly half its height, then repeats).
  document.querySelectorAll('.wall-col').forEach(column=>column.append(...[...column.children].map(tile=>tile.cloneNode(true))));
  const logoTile=document.querySelector('.about-logo');
  if(logoTile){
    const logoObserver=new IntersectionObserver(entries=>{
      if(!entries.some(entry=>entry.isIntersecting))return;
      logoObserver.disconnect();
      fetch('img/druk-voyages-logo-animated.svg?v=20261109').then(response=>response.ok?response.text():Promise.reject(new Error(String(response.status)))).then(text=>{
        const svg=new DOMParser().parseFromString(text,'image/svg+xml').documentElement;
        const image=logoTile.querySelector('img');
        if(svg.nodeName!=='svg'||!image)return;
        svg.setAttribute('aria-label',image.alt);
        const logo=document.importNode(svg,true);
        image.replaceWith(logo);
        loopLogo(logo);
      }).catch(()=>{});
    },{rootMargin:'100% 0px'});
    logoObserver.observe(logoTile);
  }
  // After the intro splash, replay the hero motto's rise so it is seen rather than finished behind the splash.
  document.addEventListener('druk:intro-done',()=>{const motto=document.querySelector('.hero h1');if(!motto)return;motto.classList.remove('is-live');void motto.offsetWidth;motto.classList.add('is-live');});
  // The hero copy drifts up and fades as the photograph scrolls away.
  const hero=document.querySelector('.hero');
  let heroFrame=0;
  const trackHero=()=>{heroFrame=0;hero.style.setProperty('--hero-scroll',Math.min(1,Math.max(0,window.scrollY/hero.offsetHeight)).toFixed(3));};
  window.addEventListener('scroll',()=>{if(!heroFrame)heroFrame=requestAnimationFrame(trackHero);},{passive:true});
  trackHero();
  const counter=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    countUp(entry.target);
    counter.unobserve(entry.target);
  }),{threshold:.6});
  document.querySelectorAll('.stat-num[data-count]').forEach(element=>counter.observe(element));
},{once:true});

/* Count-up numbers.
  Animates a .stat-num from 0 to its data-count, keeping the suffix ("+", "%"), then restores
  the original text exactly (e.g. "4,800+"). Only started by the scroll-reveal setup above.
*/
function countUp(element){
  const target=Number(element.dataset.count),finalText=element.textContent,suffix=finalText.replace(/[\d,]/g,''),start=performance.now(),duration=1400;
  const step=now=>{
    const progress=Math.min((now-start)/duration,1),eased=1-Math.pow(1-progress,3);
    element.textContent=progress<1?Math.round(target*eased).toLocaleString('en-US')+suffix:finalText;
    if(progress<1)requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* "Best Time to Visit" watercolour (styles.css "Season watercolour").
  wc-ready  - set two screens ahead, so the painting downloads only when it is about to be seen;
  wc-painted - set once, the first time the section is on screen: the wash bleeds in and each card develops;
  wc-live   - set while the section is on screen, so the slow drift runs only then.
  Without IntersectionObserver everything is shown at once, unanimated. */
(()=>{
  const section=document.querySelector('.calendar-section');if(!section)return;
  if(!('IntersectionObserver' in window)){section.classList.add('wc-ready','wc-painted');return;}
  new IntersectionObserver((entries,observer)=>{if(entries.some(entry=>entry.isIntersecting)){section.classList.add('wc-ready');observer.disconnect();}},{rootMargin:'200% 0px'}).observe(section);
  new IntersectionObserver(entries=>entries.forEach(entry=>{section.classList.toggle('wc-live',entry.isIntersecting);if(entry.isIntersecting)section.classList.add('wc-painted');}),{threshold:.12}).observe(section);
})();

/* Testimonials slider.
  .testi-grid is a native scroll-snap row (styles.css): visitors swipe it, scroll it with a trackpad, or use the arrow
  buttons on each side, which move one card at a time and are disabled at either end. Nothing moves on its own.
*/
const testiTrack=document.querySelector('.testi-grid');
/* SAMPLE guest stories — placeholder copy, NOT real customer feedback.
  They render only on local previews (localhost, 127.0.0.1, file://) or with ?samples=1, and
  never on the public domain. Replace each entry with a real guest's words (with their
  permission) and move it into the static .testi-card markup above, then delete it here. */
const SAMPLE_STORIES=[
  {photo:'exp-punakha-dzong.jpg',initials:'MR',name:'Maria R.',from:'Madrid, Spain — Spring 2025',text:'Crossing the suspension bridge to Punakha Dzong with the jacarandas in bloom felt unreal. Every transfer, every meal and every guide was perfectly timed.'},
  {photo:'exp-cranes.jpg',initials:'DH',name:'David H.',from:'Sydney, Australia — Winter 2025',text:'Watching the black-necked cranes arrive in Phobjikha was the quietest, most moving morning of our trip. Our guide knew exactly where to stand.'},
  {photo:'exp-farm.jpg',initials:'LC',name:'Linh C.',from:'Hanoi, Vietnam — Autumn 2025',text:'The farmhouse stay in Paro was the highlight. We cooked ema datshi with the family and learned more about Bhutan in one evening than any guidebook could teach.'},
  {photo:'exp-tsechu.jpg',initials:'TB',name:'Thomas B.',from:'Lyon, France — Autumn 2025',text:'Front-row seats at the Thimphu Tsechu, explained mask by mask by our guide. The colours and the drums are something I will never forget.'},
  {photo:'exp-wellness.jpg',initials:'PS',name:'Priya S.',from:'Singapore — Spring 2025',text:'Meditation with a monk at dawn, a hot stone bath at dusk. I came home calmer than I have been in years. Thoughtfully paced from start to finish.'},
  {photo:'season-autumn.jpg',initials:'JK',name:'Ji-woo K.',from:'Seoul, South Korea — Autumn 2025',text:'Our honeymoon was flawless. Small surprises along the way — a candlelit dinner in Punakha, prayer flags hung in our names — made it truly ours.'},
  {photo:'season-spring.jpg',initials:'RG',name:'Rafael G.',from:'São Paulo, Brazil — Spring 2025',text:'The rhododendron forests on the Dochula trail were in full bloom. The trekking crew looked after every detail, from the tents to the hot soup at camp.'},
  {photo:'season-summer.jpg',initials:'EW',name:'Emma W.',from:'Toronto, Canada — Summer 2025',text:'Travelling in the green season was a gift: misty valleys, empty monasteries and waterfalls everywhere. The team adjusted our plan around the weather effortlessly.'},
  {photo:'season-winter.jpg',initials:'HT',name:'Hiroshi T.',from:'Osaka, Japan — Winter 2025',text:'Clear winter skies gave us views of the Himalaya from almost every pass. Warm hospitality in every town made the cold mornings easy to love.'},
  {photo:'exp-tigers-nest.jpg',initials:'AN',name:'Anna N.',from:'Berlin, Germany — Autumn 2025',text:'Our guide paced the Tiger\'s Nest hike perfectly for my parents, who are in their seventies. Reaching the top together is a memory our family will treasure.'}
];
// Local previews: this computer, a phone on the same Wi-Fi (private network address or .local name), or ?samples.
const showSampleStories=true||['localhost','127.0.0.1',''].includes(location.hostname)||/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)|\.local$/.test(location.hostname)||new URLSearchParams(location.search).has('samples');
if(showSampleStories){
  const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const stars='<svg><use href="#s-star"/></svg>'.repeat(5);
  testiTrack.insertAdjacentHTML('beforeend',SAMPLE_STORIES.map(s=>`<div class="testi-card" role="group" data-sample="true"><div class="testi-photo wm" style="--photo:url('img/cards/${s.photo}')"></div><div class="testi-body"><svg class="testi-quote-svg"><use href="#s-quote"/></svg><div class="testi-stars">${stars}</div><p class="testi-text">${esc(s.text)}</p><div class="testi-author"><div class="testi-avatar">${s.initials}</div><div><div class="testi-name">${esc(s.name)} <small>(sample)</small></div><div class="testi-from">${esc(s.from)}</div></div></div></div></div>`).join(''));
}
/* Meet the team (R-22). Add each real person to TEAM, with their consent:
     { name:'Full name', role:'founder', bio:'One or two sentences.', languages:'English, Dzongkha', photo:'img/team/name.jpg' }
   role is one of: founder, owner, manager, planner, guide, trekGuide, driver (translated in i18n page.aboutTeam.roles).
   photo is optional; without one, avatar (an illustrated SVG from scripts/build-team-avatars.js, in img/team/avatars/)
   is shown, else initials. scene is an optional animated job backdrop for the top of the card
   (img/team/scenes/, from the same script). Put photos in img/team/ and run scripts/optimize-images.py.
   SAMPLE_TEAM is placeholder people, NOT real staff: shown only on local previews (like SAMPLE_STORIES), tagged
   "(sample)". With TEAM empty, the public site shows no team block at all. */
const TEAM=[];
const SAMPLE_TEAM=[
  {name:'Karma Dorji',role:'founder',bio:'Grew up in the Paro valley and started Druk Voyages to show guests the Bhutan he knows: its festivals, farmhouses and quiet trails.',languages:'English, Dzongkha, Hindi',avatar:'img/team/avatars/karma-dorji.svg',scene:'img/team/scenes/karma-dorji.svg'},
  {name:'Pema Choden',role:'owner',bio:'Runs the company day to day and makes sure every journey keeps the pace and care our guests expect.',languages:'English, Dzongkha',avatar:'img/team/avatars/pema-choden.svg',scene:'img/team/scenes/pema-choden.svg'},
  {name:'Sonam Wangchuk',role:'manager',bio:'Turns plans into permits, flights, rooms and road times, and keeps every day on schedule.',languages:'English, Dzongkha, Nepali',avatar:'img/team/avatars/sonam-wangchuk.svg',scene:'img/team/scenes/sonam-wangchuk.svg'},
  {name:'Dechen Yangzom',role:'planner',bio:'Designs each itinerary around what moves you, from front-row festival days to silent forest retreats.',languages:'English, Dzongkha, Japanese',avatar:'img/team/avatars/dechen-yangzom.svg',scene:'img/team/scenes/dechen-yangzom.svg'},
  {name:'Tashi Penjor',role:'guide',bio:'A licensed guide who knows when the monastery bells ring and which farmhouse kitchen welcomes guests.',languages:'English, Dzongkha, French',avatar:'img/team/avatars/tashi-penjor.svg',scene:'img/team/scenes/tashi-penjor.svg'},
  {name:'Ugyen Tenzin',role:'trekGuide',bio:'Leads the high-altitude treks, from the Druk Path to Jomolhari, with a camp crew he has worked with for years.',languages:'English, Dzongkha',avatar:'img/team/avatars/ugyen-tenzin.svg',scene:'img/team/scenes/ugyen-tenzin.svg'},
  {name:'Kinley Namgay',role:'driver',bio:'Has driven the lateral road over every pass in the kingdom, and knows the best places to stop for the view.',languages:'English, Dzongkha, Hindi',avatar:'img/team/avatars/kinley-namgay.svg',scene:'img/team/scenes/kinley-namgay.svg'},
];
// Rebuilt on language change; names, bios and languages are shown exactly as written, as text.
window.renderTeam=function(){
  const block=document.getElementById('team'),grid=document.getElementById('teamGrid');if(!block||!grid)return;
  const showSampleTeam=true;
const members=[...TEAM,...((showSampleTeam||showSampleStories)?SAMPLE_TEAM.map(person=>({...person,sample:true})):[])];
  block.hidden=!members.length;if(!members.length)return;
  const copy=window.DRUK_L10N?.catalog?.(activeLanguage)?.page?.aboutTeam||{};
  const make=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;};
  if(copy.label)block.querySelector('.section-label').textContent=copy.label;
  if(copy.title){const title=block.querySelector('.about-team-title');title.textContent='';copy.title.split(/(<em>.*?<\/em>)/).forEach(part=>{const em=/^<em>(.*)<\/em>$/.exec(part);if(em)title.append(make('em','',em[1]));else if(part)title.append(part);});}
  if(copy.lede)block.querySelector('.about-team-lede').textContent=copy.lede;
  const ROLES={founder:'Founder',owner:'Owner & Managing Director',manager:'Operations Manager',planner:'Travel Planner',guide:'Cultural Guide',trekGuide:'Trekking Guide',driver:'Driver'};
  const cards=members.map(person=>{
    const card=make('li','team-card');
    if(person.scene){const scene=make('img','team-scene');scene.src=person.scene;scene.alt='';scene.setAttribute('aria-hidden','true');card.append(scene);}
    const portrait=make('div','team-portrait');
    if(person.photo||person.avatar){const img=make('img');img.src=person.photo||person.avatar;img.alt=person.photo?person.name:'';img.loading='lazy';img.width=160;img.height=160;portrait.append(img);if(!person.photo)portrait.classList.add('is-avatar');}
    else{portrait.setAttribute('aria-hidden','true');portrait.textContent=String(person.name).trim().split(/\s+/).slice(0,2).map(word=>[...word][0]||'').join('').toUpperCase();}
    const name=make('h4','team-name',person.name);if(person.sample)name.append(' ',make('small','','(sample)'));
    card.append(portrait,name,make('div','team-role',copy.roles?.[person.role]||ROLES[person.role]||person.role||''));
    if(person.bio)card.append(make('p','team-bio',person.bio));
    if(person.languages)card.append(make('div','team-langs',`${copy.speaks||'Speaks'}: ${person.languages}`));
    return card;
  });
  // Four or more people scroll past as a marquee: the cards are followed by a hidden, inert copy so the loop is
  // seamless (the track moves by half its length). It pauses on hover and focus; reduced motion shows one still row.
  const marquee=cards.length>=4;
  block.classList.toggle('is-marquee',marquee);
  grid.style.setProperty('--team-duration',`${cards.length*7}s`);
  const copies=marquee?cards.map(card=>{const copy=card.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.inert=true;copy.classList.add('is-copy');return copy;}):[];
  grid.replaceChildren(...cards,...copies);
};
window.renderTeam();
let testiCards=[...testiTrack.children];
const testiArrows=[...document.querySelectorAll('.testi-arrow')];
// One step is one card plus the gap between cards.
function testiStep(){
  const [first,second]=testiCards;
  return second?second.offsetLeft-first.offsetLeft:(first?.offsetWidth||240);
}
function syncTestiArrows(){
  const max=testiTrack.scrollWidth-testiTrack.clientWidth;
  testiArrows.forEach(arrow=>{
    const atEnd=arrow.dataset.step==='-1'?testiTrack.scrollLeft<=2:testiTrack.scrollLeft>=max-2;
    arrow.disabled=max<=2||atEnd;
  });
}
testiArrows.forEach(arrow=>arrow.addEventListener('click',()=>{
  testiTrack.scrollBy({left:Number(arrow.dataset.step)*testiStep(),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
}));
testiTrack.addEventListener('scroll',()=>requestAnimationFrame(syncTestiArrows),{passive:true});
window.addEventListener('resize',syncTestiArrows);
function setTestiLabels(){
  const total=testiCards.length;
  testiCards.forEach((card,i)=>card.setAttribute('aria-label',tr('storyN',{current:i+1,total})));
  testiArrows.forEach(arrow=>arrow.setAttribute('aria-label',tr(arrow.dataset.step==='-1'?'storyPrevious':'storyNext')));
  syncTestiArrows();
}
setTestiLabels();
/* Guest stories uploaded through a trip QR code (R-18, backend/routes/stories.js). They go ahead of the built-in
   cards, featured first (the API's order). Guests' words are set with textContent, and the photo URL must match
   the API's own pattern before it is used in CSS. If the API is missing or slow, the built-in cards simply stay. */
async function loadGuestStories(){
  let stories=[];
  try{
    const res=await fetch(`${API_URL}/api/stories`,{signal:AbortSignal.timeout(5000)});
    if(res.ok)stories=(await res.json()).stories||[];
  }catch{return;}
  const make=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;};
  const cards=stories.filter(story=>/^\/api\/stories\/photo\/[a-f0-9]{16}\.jpg$/.test(story.photo?.url||'')&&story.text&&story.name).map(story=>{
    const card=make('div','testi-card');card.setAttribute('role','group');card.dataset.guest='true';
    const photo=make('div','testi-photo wm');photo.style.setProperty('--photo',`url("${API_URL}${story.photo.url}")`);
    const body=make('div','testi-body');
    body.insertAdjacentHTML('beforeend','<svg class="testi-quote-svg"><use href="#s-quote"/></svg>');
    const stars=make('div','testi-stars');const rating=Math.min(5,Math.max(1,Math.round(Number(story.rating)||5)));
    stars.insertAdjacentHTML('beforeend','<svg><use href="#s-star"/></svg>'.repeat(rating));
    const author=make('div','testi-author');
    const initials=String(story.name).trim().split(/\s+/).slice(0,2).map(word=>[...word][0]||'').join('').toUpperCase();
    const who=make('div');who.append(make('div','testi-name',story.name),make('div','testi-from',story.from||''));
    author.append(make('div','testi-avatar',initials),who);
    body.append(stars,make('p','testi-text',story.text),author);
    card.append(photo,body);
    return card;
  });
  if(!cards.length)return;
  testiTrack.prepend(...cards);
  testiTrack.scrollLeft=0;
  testiCards=[...testiTrack.children];
  setTestiLabels();
}

/* Mobile hamburger menu.
  Opens/closes the full-screen drawer and locks body scrolling while open.
*/
const ham=document.getElementById('hamburger');
const mNav=document.getElementById('mobileNav');
ham.addEventListener('click',()=>{ham.classList.toggle('open');mNav.classList.toggle('open');const open=mNav.classList.contains('open');ham.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':'';if(open)mNav.querySelector('a')?.focus({preventScroll:true});});
function closeMobileNav(){ham.classList.remove('open');mNav.classList.remove('open');ham.setAttribute('aria-expanded','false');document.body.style.overflow='';}
window.addEventListener('resize',()=>{if(window.innerWidth>1150&&mNav.classList.contains('open'))closeMobileNav();});
document.querySelectorAll('[data-language-select]').forEach(select=>select.addEventListener('change',e=>requestLanguageChange(e.target.value)));
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(document.getElementById('translationDisclaimer').classList.contains('open'))cancelLanguageChange();else if(document.getElementById('galleryLightbox').classList.contains('open'))closeGalleryLightbox();else if(document.getElementById('modalOverlay').classList.contains('open'))closeItineraryModal();else if(mNav.classList.contains('open')){closeMobileNav();ham.focus();}});
document.addEventListener('keydown',e=>{
  if(e.key!=='Tab')return;
  const dialog=['translationDisclaimer','galleryLightbox','modalOverlay'].map(id=>document.getElementById(id)).find(el=>el.classList.contains('open'));
  if(!dialog)return;
  const controls=[...dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')].filter(el=>el.getClientRects().length);
  const first=controls[0],last=controls.at(-1);
  if(!first)return;
  if(e.shiftKey&&(document.activeElement===first||!dialog.contains(document.activeElement))){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&(document.activeElement===last||!dialog.contains(document.activeElement))){e.preventDefault();first.focus();}
});

/* Toast notifications.
  Reusable short message popup for submission feedback and future alerts.
*/
function showToast(msg,gold=false){const t=document.getElementById('toast');t.textContent=msg;t.className='toast'+(gold?' gold':'');setTimeout(()=>t.classList.add('show'),10);setTimeout(()=>t.classList.remove('show'),3500);}

/* Enquiry form submission.
  Sends the form fields to the configured API. By default production uses the
  same domain as the website; set window.DRUK_VOYAGES_API_URL for split hosting.
*/
const API_URL=(window.DRUK_VOYAGES_API_URL||window.location.origin).replace(/\/+$/,'');
loadGuestStories(); // defined with the testimonials slider above; it needs API_URL
document.getElementById('enquiryForm').addEventListener('submit',async(e)=>{
  e.preventDefault();
  const btn=document.getElementById('submitBtn');
  const msg=document.getElementById('formMsg');
  const form=e.target;
  const data=Object.fromEntries(new FormData(form));
  const phoneNumber=(data.phone||'').trim();
  const phoneCountry=(data.phoneCountry||'').trim();
  data.phone=phoneNumber.startsWith('+')
?phoneNumber
:(phoneNumber?`${phoneCountry?`${phoneCountry} `:''}${phoneNumber}`.trim():'');
  delete data.phoneCountry;
  if(!data.firstName||!data.email||!data.message){msg.className='form-msg error';msg.textContent=locale().ui.required;return;}
  btn.disabled=true;btn.textContent=locale().ui.sending;msg.className='form-msg';msg.textContent='';
  try{
const res=await fetch(`${API_URL}/api/enquiry`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
const json=await res.json();
if(res.ok){
  msg.className='form-msg success';
  msg.textContent=locale().ui.success;
  form.reset();showToast(locale().ui.toast,true);
}else{throw new Error(json.error||'Server error');}
  }catch(err){
msg.className='form-msg error';
msg.textContent=locale().ui.fail;
  }finally{btn.disabled=false;btn.textContent=locale().enquiry[16];}
});

document.querySelectorAll('#enquiryForm input,#enquiryForm textarea,#enquiryForm select').forEach(field=>{
  field.addEventListener('input',()=>field.setCustomValidity(''));
  field.addEventListener('invalid',()=>{field.setCustomValidity('');if(field.validity.valueMissing)field.setCustomValidity(tr('formRequired'));else if(field.validity.typeMismatch)field.setCustomValidity(tr('formEmail'));else if(field.validity.tooShort)field.setCustomValidity(tr('formShort',{count:field.minLength}));});
});

/* Phone country picker. #phoneCountry stays the form field (its value is the dial code the server
   receives) and the no-JavaScript fallback; its options are generated by scripts/build-country-codes.js.
   This adds a button showing the chosen flag, ISO short form and dial code, and a searchable list of
   every country with its flag (img/flags) and its name in the active language (Intl.DisplayNames).
   Selection is tracked by option, not value, because several countries share a code (+1, +7, +44…).
   Keyboard: arrows move, Enter chooses, Escape closes, typing filters by name, short form or digits. */
window.DRUK_COUNTRY_PICKER=(()=>{
  const select=document.getElementById('phoneCountry');
  if(!select)return null;
  const options=[...select.options].filter(option=>option.dataset.iso);
  const flag=iso=>`img/flags/${iso.toLowerCase()}.png`;
  const picker=document.createElement('div');
  picker.className='cc-picker';
  picker.innerHTML='<button type="button" class="cc-trigger" aria-haspopup="listbox" aria-expanded="false"><img class="cc-flag" alt="" width="24" height="18" hidden/><svg class="cc-globe" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" fill="none" stroke="currentColor"/></svg><span class="cc-iso"></span><span class="cc-dial"></span></button>'
    +'<div class="cc-panel" hidden><input type="search" class="cc-search" role="combobox" aria-expanded="true" aria-controls="ccList" aria-autocomplete="list" autocomplete="off"/><ul class="cc-list" id="ccList" role="listbox"></ul><p class="cc-empty" role="status" hidden></p></div>';
  const trigger=picker.querySelector('.cc-trigger'),panel=picker.querySelector('.cc-panel'),search=picker.querySelector('.cc-search'),list=picker.querySelector('.cc-list'),empty=picker.querySelector('.cc-empty');
  list.innerHTML=options.map((option,i)=>`<li role="option" id="cc-${option.dataset.iso}" data-index="${i}" aria-selected="false"><img src="${flag(option.dataset.iso)}" alt="" width="24" height="18" loading="lazy"/><span class="cc-name"></span><span class="cc-code">${option.dataset.iso}</span><span class="cc-num">${option.value}</span></li>`).join('');
  const items=[...list.children];
  let names=new Intl.DisplayNames(['en'],{type:'region'}),active=-1;
  const nameOf=option=>names.of(option.dataset.iso)||option.dataset.iso;
  const visible=()=>items.filter(item=>!item.hidden);
  function render(){
    const option=select.selectedOptions[0];
    const chosen=option&&option.dataset.iso?option:null;
    trigger.querySelector('.cc-flag').hidden=!chosen;
    trigger.classList.toggle('has-country',!!chosen);
    trigger.querySelector('.cc-globe').style.display=chosen?'none':'';
    if(chosen)trigger.querySelector('.cc-flag').src=flag(chosen.dataset.iso);
    trigger.querySelector('.cc-iso').textContent=chosen?chosen.dataset.iso:tr('countryCode');
    trigger.querySelector('.cc-dial').textContent=chosen?chosen.value:'';
    trigger.setAttribute('aria-label',chosen?`${tr('countryCode')}: ${nameOf(chosen)} ${chosen.value}`:tr('countryCode'));
    items.forEach(item=>item.setAttribute('aria-selected',String(options[item.dataset.index]===chosen)));
  }
  function setActive(index){
    const shown=visible();
    shown.forEach(item=>item.classList.remove('is-active'));
    active=Math.max(0,Math.min(index,shown.length-1));
    const item=shown[active];
    if(!item){search.removeAttribute('aria-activedescendant');return;}
    item.classList.add('is-active');
    search.setAttribute('aria-activedescendant',item.id);
    // Scroll the list only: scrollIntoView would also scroll the page.
    if(item.offsetTop<list.scrollTop)list.scrollTop=item.offsetTop;
    else if(item.offsetTop+item.offsetHeight>list.scrollTop+list.clientHeight)list.scrollTop=item.offsetTop+item.offsetHeight-list.clientHeight;
  }
  function filter(){
    const query=search.value.trim().toLowerCase(),digits=query.replace(/\D/g,'');
    items.forEach((item,i)=>{
      const option=options[i];
      item.hidden=!!query&&!(nameOf(option).toLowerCase().includes(query)||option.dataset.iso.toLowerCase().startsWith(query)||(digits&&option.value.replace('+','').startsWith(digits)));
    });
    empty.hidden=visible().length>0;
    setActive(0);
  }
  // The page never moves when the picker opens: the list opens upwards when there is no room below,
  // focus moves without scrolling, and on touch screens the search box is not focused automatically
  // (that would raise the keyboard and scroll the page) unless the picker was opened from a keyboard.
  function open(fromKeyboard){
    const below=window.innerHeight-trigger.getBoundingClientRect().bottom;
    picker.classList.toggle('opens-up',below<380&&trigger.getBoundingClientRect().top>below);
    panel.hidden=false;trigger.setAttribute('aria-expanded','true');
    search.value='';filter();
    const chosen=items.find(item=>item.getAttribute('aria-selected')==='true');
    if(chosen)setActive(visible().indexOf(chosen));
    if(fromKeyboard||matchMedia('(pointer: fine)').matches)search.focus({preventScroll:true});
  }
  function close(focusTrigger){
    if(panel.hidden)return;
    panel.hidden=true;trigger.setAttribute('aria-expanded','false');
    if(focusTrigger)trigger.focus({preventScroll:true});
  }
  function choose(item){
    if(!item)return;
    select.selectedIndex=[...select.options].indexOf(options[item.dataset.index]);
    select.dispatchEvent(new Event('change',{bubbles:true}));
    render();close(true);
  }
  trigger.addEventListener('click',event=>panel.hidden?open(event.detail===0):close(true));
  search.addEventListener('input',filter);
  search.addEventListener('keydown',event=>{
    if(event.key==='ArrowDown'){event.preventDefault();setActive(active+1);}
    else if(event.key==='ArrowUp'){event.preventDefault();setActive(active-1);}
    else if(event.key==='Home'){event.preventDefault();setActive(0);}
    else if(event.key==='End'){event.preventDefault();setActive(visible().length-1);}
    else if(event.key==='Enter'){event.preventDefault();choose(visible()[active]);}
    else if(event.key==='Escape'){event.preventDefault();close(true);}
    else if(event.key==='Tab')close(false);
  });
  list.addEventListener('click',event=>choose(event.target.closest('li[role=option]')));
  document.addEventListener('pointerdown',event=>{if(!picker.contains(event.target))close(false);});
  select.form?.addEventListener('reset',()=>setTimeout(render));
  select.hidden=true;
  select.before(picker);
  // Names, labels and option titles follow the page language (called from applyLanguage()).
  function refresh(){
    names=new Intl.DisplayNames([activeLanguage,'en'],{type:'region'});
    options.forEach((option,i)=>{const name=nameOf(option);option.title=`${name} (${option.value})`;items[i].querySelector('.cc-name').textContent=name;});
    search.placeholder=tr('ccSearch');search.setAttribute('aria-label',tr('ccSearch'));
    list.setAttribute('aria-label',tr('countryCode'));empty.textContent=tr('ccNone');
    render();
  }
  refresh();
  return {refresh};
})();
document.addEventListener('DOMContentLoaded',()=>{window.DRUK_L10N.capture();applyLanguage(activeLanguage);},{once:true});
