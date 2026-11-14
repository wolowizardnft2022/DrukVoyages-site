/* CHATBOT SCRIPT
  Self-contained widget logic for opening/closing chat, storing provider prefs,
  retrieving relevant KB entries, calling AI providers, and falling back to
  built-in answers when no provider is enabled.
*/
(function(){
'use strict';

/* ── Knowledge base (embedded for client-side RAG) ──
  Add concise factual entries here to improve chatbot answers without changing
  the UI. retrieve() searches these records by keyword.
*/
const KB=[
  {id:'d1',t:"Tiger's Nest — Paro Taktsang",c:"Tiger's Nest Paro Taktsang most iconic landmark Bhutan. Cliff face 900m above Paro Valley 3120m elevation. Guru Padmasambhava Guru Rinpoche flew on tigress 8th century meditated 3 months body imprint in rock. Monastery built 1694 rebuilt after fire 1998. Hike 4 hours return. Cliff-side cafe halfway. Photography allowed on trails not inside monastery. Modest dress required shoulders knees covered."},
  {id:'d2',t:'Punakha Dzong',c:'Punakha Dzong most beautiful dzong fortress monastery Bhutan built 1637 Zhabdrung Ngawang Namgyal. Confluence Mo Chhu Mother River Pho Chhu Father River. Winter residence Je Khenpo senior monk. Punakha Tsechu festival. Punakha Suspension Bridge 160m longest Bhutan leads to Chimi Lhakhang. Elevation 1200m warmest lowest valley ideal winter. King Jigme Khesar Royal Wedding 2011.'},
  {id:'d3',t:'Thimphu Capital',c:"Thimphu capital world's only capital without traffic lights traffic policeman decorated booth. Buddha Dordenma 51.5m bronze Buddha. Tashichho Dzong government throne room. National Folk Heritage Museum. Changangkha Lhakhang 15th century. Takin preserve national animal. Traditional archery. Royal Textile Academy. Norzin Lam main shopping. Weekend market. Elevation 2334m."},
  {id:'d4',t:'Bumthang Spiritual Heartland',c:'Bumthang four valleys Chhumey Tang Ura Choekhor spiritual heartland Bhutan. Kurjey Lhakhang Guru Rinpoche body imprint 8th century. Jambay Lhakhang 659 AD Tibetan King Songtsen Gampo. Jakar Dzong largest dzong Bhutan. Tamzhing Lhakhang. Apple orchards buckwheat pancakes yak cheese Bumthang weaving. Elevation 2800m+.'},
  {id:'d5',t:'Phobjikha Valley Crane Sanctuary',c:'Phobjikha Valley glacial wildlife sanctuary. Endangered black-necked crane Grus nigricollis Trung Trung sacred bird longevity. 600 cranes winter October to February migrate Tibet. Gangtey Monastery Nyingmapa. Black-Necked Crane Information Centre. Crane Festival November traditional dances. Electric lines buried underground conservation. Elevation 2900m.'},
  {id:'d6',t:'Haa Valley',c:'Haa Valley remote least visited opened tourists 2002. Pristine forests traditional villages slow pace life. Lhakhang Karpo White Temple Lhakhang Nagpo Black Temple 7th century. Yak herders. Haa Festival nomadic culture annually. Very few tourists authentic experience.'},
  {id:'p1',t:"Visa, Entry & Licensed Guides",c:"Visa: every visitor except Indian nationals needs a visa applied for online before travel; Druk Voyages arranges it once your trip is confirmed. Passport valid 6+ months, photo, travel insurance, confirmed stay. One-time visa fee (USD 40 at the time of writing), separate from the nightly SDF. Indian nationals enter with passport or voter ID and receive an entry permit. Tourists must be accompanied by a licensed Bhutanese guide when touring, including monuments and travel between districts; every Druk Voyages journey includes a licensed guide and private driver. Rules can change; the team confirms current requirements for your nationality."},
  {id:'p2',t:"Sustainable Development Fee SDF Cost",c:"Sustainable Development Fee (SDF), set by the Royal Government of Bhutan: USD 100 per person per night for international visitors (since September 2023). Children 6 to 12 pay half (USD 50), under 6 free. Indian nationals INR 1,200 per person per night. Funds free healthcare, education and conservation (High Value, Low Impact tourism). Included in Druk Voyages package prices. Government fees can change; the team confirms the current rate when you book."},
  {id:'p3',t:"Flights to Bhutan",c:"Paro International Airport is Bhutan's only international airport. Two Bhutanese airlines fly there: Drukair (Royal Bhutan Airlines) and Bhutan Airlines, connecting cities such as Delhi, Kolkata, Bagdogra, Kathmandu, Bangkok, Singapore and Dhaka (routes vary by season). Only specially certified pilots fly the mountain approach; flights operate in daylight and weather can delay them. Overland entry from India at Phuentsholing, Gelephu or Samdrup Jongkhar. Flights are not included in packages; we advise on connections."},
  {id:'p4',t:'Best Time to Visit Seasons',c:'Spring March-May 5 stars: rhododendrons bloom Himalayan peaks clear Paro Tsechu festival 10-20°C. Autumn September-November 5 stars: crystal clear views golden valleys Thimphu Tsechu peak season book 6 months ahead. Monsoon June-August 3 stars: lush greenery fewer crowds lower rates 20-30% occasional rain waterfalls spectacular. Winter December-February 4 stars: snow dzongs black-necked cranes Phobjikha uncrowded 0-15°C.'},
  {id:'p5',t:'Currency Money Payments',c:'Bhutanese Ngultrum BTN pegged 1:1 Indian Rupee. Indian Rupees widely accepted. USD EUR exchange banks airport. ATMs Thimphu Paro scarce rural areas. Credit cards larger hotels restaurants Thimphu Paro. Cash essential rural Bhutan. Druk Voyages payments USD bank transfer major credit cards. Tips appreciated guide BTN 500-1000/day driver BTN 300-500/day.'},
  {id:'p6',t:'Altitude Sickness',c:"Bhutan valleys 200m subtropical south to 7000m+ northern peaks. Tourist destinations 1200m Punakha to 3000m upper Paro. Tiger's Nest 3120m. Druk Path Trek 4100m+. Altitude sickness AMS real risk above 3000m. Symptoms headache nausea fatigue dizziness. Prevention ascend slowly hydrated avoid alcohol first 2 days consider Diamox acetazolamide consult doctor. Our itineraries include acclimatisation. Guides trained recognise AMS."},
  {id:'p7',t:'Dotsho Hot Stone Bath Experience',c:'Dotsho traditional hot stone bath river stones heated fire hours until red-hot placed wooden bathtub water. Medicinal herbs artemisia added minerals therapeutic soak. Treats arthritis hypertension stomach disorders stress. Sessions 45-60 minutes meditative deeply relaxing best outdoors under mountain stars. Druk Voyages arranges authentic Dotsho local families Bumthang Paro not commercial spa versions.'},
  {id:'p8',t:'Tsechu Festivals',c:'Tsechu 10th day Dzongkha festivals honour Guru Rinpoche. Famous: Paro Tsechu spring 5 days, Thimphu Tsechu autumn 3 days, Punakha Drubchen Tsechu spring, Bumthang Tsechu autumn. Cham dances sacred masked dances monks deities defeating evil. Atsara clowns comic relief wisdom. Thongdrel massive sacred applique thangka unveiled dawn liberation through sight. Druk Voyages front-row viewing backstage access.'},
  {id:'a1',t:"About Druk Voyages",c:"Druk Voyages: 100% Bhutanese-owned and operated travel company on Norzin Lam, Thimphu (licence #TCB-2009-142). Founded 15+ years ago by local Bhutanese; 4,800+ guests; 98% satisfaction; carbon-neutral since 2018. All guides, drivers and staff are Bhutanese. 12 itineraries across culture, festivals, trekking, wellness, photography and honeymoon; small groups (usually 4–8 guests); every itinerary can be customised."},
  {id:'a2',t:'Contact Booking Process',c:'Druk Voyages contact: Email hello@drukvoyages.bt Phone +975 17 000 000 Office Norzin Lam Thimphu Bhutan. Hours Monday-Saturday 9am-6pm Bhutan Standard Time UTC+6. Booking: enquiry form → personalised itinerary 24 hours → confirm → visa docs → 30% deposit → balance 60 days before travel. Payment bank transfer Visa Mastercard USD. Cancellation: full refund 60+ days 50% refund 30-60 days no refund under 30 days. Group 8+ get 10% discount.'},
];
/* Itineraries come from the page's own ITINERARIES / ITINERARY_SIGNALS (R-23), so the offline guide always matches the cards. */
if(typeof ITINERARIES!=='undefined')KB.push(...ITINERARIES.map(it=>{const s=(typeof ITINERARY_SIGNALS!=='undefined'&&ITINERARY_SIGNALS[it.id])||{};return{id:'i'+it.id,t:`${it.title} (${it.duration})`,c:[`${it.title}: ${it.duration} ${it.tag} itinerary, ${/^\$/.test(it.price)?'from '+it.price+' per person':'custom quote'}, ${it.groupSize}, ${it.difficulty}.`,s.route?'Route: '+s.route.join(' → ')+'.':'',s.bestTime?'Best time: '+s.bestTime+'.':'',it.desc,'Highlights: '+(it.highlights||[]).join(', ')+'.',(it.days||[]).map(d=>`Day ${d.n}: ${d.t}. ${d.d}`).join(' ')].join(' ')};}));

/* ── Keyword retrieval ──
  Lightweight search over KB. It returns the most relevant entries for the
  user's question and feeds them into the AI prompt or static fallback.
*/
function retrieve(query,k=4){
  const words=query.toLowerCase().replace(/[^\w\s]/g,' ').split(/\s+/).filter(w=>w.length>2);
  const stopwords=new Set(['what','when','how','the','and','for','are','can','you','tell','about','is','do','need','have','any','our','your','that','this','from','with','will','was','has','been']);
  const kw=words.filter(w=>!stopwords.has(w));
  if(!kw.length)return KB.slice(0,k);
  return KB.map(doc=>{
    const text=(doc.t+' '+doc.c).toLowerCase();
    const score=kw.reduce((s,w)=>{
      const re=new RegExp(w,'g');
      return s+(text.match(re)||[]).length;
    },0);
    return{doc,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,k).map(x=>x.doc);
}

/* ── Chat state and provider configuration ──
  Values are persisted in localStorage so returning visitors keep their chosen
  provider, Groq key, and Ollama Cloud model.
*/
// The first entry (empty id) is the server's own model (CHAT_MODEL, Gemma 4 by default), run by the local
// Ollama. Cloud models need Ollama Cloud credits on the server's account; if one is unavailable the server
// answers with its own model instead.
const OLLAMA_CLOUD_MODELS=[
  {id:'',label:'Gemma4 (local)'},
  {id:'glm-5.3-flash:cloud',label:'GLM 5.3 Flash Cloud'},
  {id:'gpt-oss:120b-cloud',label:'GPT-OSS 120B Cloud'},
  {id:'kimi-k2.6:cloud',label:'Kimi K2.6 Cloud'},
  {id:'gemma4:31b-cloud',label:'Gemma 4 31B Cloud'},
];

let history=[],isOpen=false,busy=false;
/* The conversation survives page reloads and moving around the site for this browser tab (sessionStorage, R-24); it is
   gone when the tab closes. Restored messages are shown through the same escaping as live ones. */
const CHAT_STORE='druk-chat-session';
function saveConversation(){try{const kept=history.filter(m=>m.content!=='[fallback]').slice(-20);if(kept.length)sessionStorage.setItem(CHAT_STORE,JSON.stringify(kept));else sessionStorage.removeItem(CHAT_STORE);}catch(_err){}}
function restoreConversation(){
  let saved=[];try{saved=JSON.parse(sessionStorage.getItem(CHAT_STORE)||'[]');}catch(_err){return false;}
  if(!Array.isArray(saved))return false;
  saved=saved.filter(m=>m&&['user','assistant'].includes(m.role)&&typeof m.content==='string'&&m.content.trim()).map(m=>({role:m.role,content:m.content.slice(0,4000)})).slice(-20);
  if(!saved.length)return false;
  welcome();history=saved;saved.forEach(m=>m.role==='user'?userMsg(m.content):botMsg(m.content));qr.style.display='none';
  return true;
}
let aiProvider='groq',groqKey='',ollamaModel=OLLAMA_CLOUD_MODELS[0].id,providerChosen=false;
try{
  providerChosen=Boolean(localStorage.getItem('druk-chat-provider'));
  aiProvider=localStorage.getItem('druk-chat-provider')||'groq';
  groqKey=localStorage.getItem('druk-groq-key')||'';
  ollamaModel=localStorage.getItem('druk-ollama-model')||OLLAMA_CLOUD_MODELS[0].id;
}catch(_){}

const fab=document.getElementById('chatFab');
const win=document.getElementById('chatWin');
const msgs=document.getElementById('chatMsgs');
const inp=document.getElementById('chatInput');
const snd=document.getElementById('chatSend');
const badge=document.getElementById('chatBadge');
const qr=document.getElementById('chatQR');
const setup=document.getElementById('chatSetup');
const status=document.getElementById('chatStatus');
const powered=document.getElementById('chatPowered');
const providerSelect=document.getElementById('chatProviderSelect');
const groqInput=document.getElementById('groqKeyInput');
const groqSetupPanel=document.getElementById('groqSetupPanel');
const ollamaModelSelect=document.getElementById('ollamaModelSelect');
const ollamaSetupPanel=document.getElementById('ollamaSetupPanel');

function ts(){return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});}
function hasAIProviderEnabled(){return aiProvider==='ollama'||!!groqKey;}
function currentCloudModel(){return OLLAMA_CLOUD_MODELS.find(model=>model.id===ollamaModel)||OLLAMA_CLOUD_MODELS[0];}
function saveChatPrefs(){
  try{
    localStorage.setItem('druk-chat-provider',aiProvider);
    localStorage.setItem('druk-groq-key',groqKey);
    localStorage.setItem('druk-ollama-model',ollamaModel);
    localStorage.removeItem('druk-ollama-key');
  }catch(_){}
}
const CHAT_EN={"chatFab":"Chat with Pema","chatDialog":"Pema, Your Guide","chatMessage":"Message","chatEnabled":"AI enabled","chatPoweredBy":"Powered by {provider} · {model} · Druk Voyages","invalidKey":"Invalid key — Groq keys start with gsk_","invalidGroq":"Your Groq API key seems invalid. Click ⚙ to update it, or I’ll answer from the travel guide.","offlineOllama":"The AI service is temporarily unavailable. I’ll answer from the travel guide.","welcome":"Tashi Delek! 🙏 I’m Pema, your guide to Bhutan. Ask me about treks, dzongs, seasons, or planning your journey. How can I help?","chatGeneric":"Please contact **hello@drukvoyages.bt** or call **+975 17 000 000** for help planning your Bhutan journey.","chatIntro":"Tell me about your interests, travel dates and preferred pace, and I can help you explore our journeys.","chatPricing":"Published itinerary prices start at **$3,290** for the 8-day Classic journey. Some routes require a custom quote. Contact **hello@drukvoyages.bt** to confirm inclusions and pricing for your dates.","chatVisa":"For visa and entry arrangements for your nationality and travel dates, contact **hello@drukvoyages.bt**. Our local team can help you plan the next steps.","chatSeasons":"Spring (March–May) and autumn (September–November) are popular for cultural journeys and trekking. Winter offers quieter valleys and seasonal crane watching. Weather and mountain conditions vary; our team can help with your dates.","chatTreks":"Explore the **12-day Druk Path** journey or **13-day Jomolhari Base Camp** itinerary. Both include time in Bhutan beyond the trekking stages. Tell us about your experience and fitness so we can suggest a suitable pace.","chatNest":"Paro Taktsang, known as **Tiger’s Nest**, sits on cliffs above Paro. Set aside a dedicated hiking day and take the ascent slowly. Your guide will help you choose a pace suited to the weather and altitude.","chatFestivals":"Our festival journeys include Paro and Thimphu Tshechu celebrations. Festival dates and programmes change each year; we shape your route around the confirmed calendar.","chatContact":"Reach us at **hello@drukvoyages.bt** or **+975 17 000 000**, or use the enquiry form on this page.","quickItineraries":"Which itineraries would you recommend?","quickSeasons":"When is the best time to visit Bhutan?","quickPricing":"How much does a Bhutan trip cost?","quickNest":"Tell me about Tiger’s Nest.","quickVisa":"How can you help with visa arrangements?"};
const chatLanguage=()=>typeof activeLanguage!=='undefined'?activeLanguage:'en';
const chatText=(key,vars={})=>window.DRUK_L10N?.text(key,vars,chatLanguage())||(CHAT_EN[key]||key).replace(/\{(\w+)\}/g,(m,k)=>vars[k]??m);
function updateChatMeta(){
  const labels=(window.DRUK_L10N?.catalog(chatLanguage())?.page||window.DRUK_I18N?.[chatLanguage()])?.chatUi||{online:'Online · Druk Voyages',powered:'Pema · Druk Voyages AI travel guide'};
  if(hasAIProviderEnabled()){
    if(aiProvider==='ollama'){
      const model=currentCloudModel();
      status.textContent=`${chatText('chatEnabled')} · Ollama · ${model.label}`;
      powered.textContent=chatText('chatPoweredBy',{provider:'Ollama',model:model.label});
    }else{
      status.textContent=`${chatText('chatEnabled')} · Groq · GPT-OSS 120B`;
      powered.textContent=chatText('chatPoweredBy',{provider:'Groq',model:'GPT-OSS 120B'});
    }
  }else{
    status.textContent=labels.online||'Online · Druk Voyages';
    powered.textContent=labels.powered||'Pema · Druk Voyages AI travel guide';
  }
}
window.DRUK_CHAT_REFRESH_LANGUAGE=()=>{updateChatMeta();for(const node of msgs.children){if(node._translationKey){const bubble=node.querySelector?.('.cm-bbl');if(bubble)bubble.innerHTML=escapeChatText(chatText(node._translationKey)).replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');}}};
function renderProviderSetup(selectedProvider=aiProvider){
  const provider=selectedProvider==='ollama'?'ollama':'groq';
  providerSelect.value=provider;
  groqSetupPanel.style.display=provider==='groq'?'block':'none';
  ollamaSetupPanel.style.display=provider==='ollama'?'block':'none';
  groqInput.value=groqKey;
  ollamaModelSelect.value=ollamaModel;
}

OLLAMA_CLOUD_MODELS.forEach(model=>{
  const option=document.createElement('option');
  option.value=model.id;
  option.textContent=model.label;
  ollamaModelSelect.appendChild(option);
});
if(!OLLAMA_CLOUD_MODELS.some(model=>model.id===ollamaModel))ollamaModel=OLLAMA_CLOUD_MODELS[0].id;
renderProviderSetup();
updateChatMeta();
// With no provider chosen yet (or Groq without a key), use the server's Ollama when the server says it is up.
// On static hosting there is no /api, so the chat stays in its built-in travel-guide mode.
if(!providerChosen||(aiProvider==='groq'&&!groqKey)){
  fetch(`${API_URL}/api/chat/status`,{signal:AbortSignal.timeout(4000)})
    .then(res=>res.ok?res.json():null)
    .then(info=>{
      if(!info?.ollama||(aiProvider==='groq'&&groqKey))return;
      aiProvider='ollama';
      if(info.model)OLLAMA_CLOUD_MODELS[0].label=`${info.model.charAt(0).toUpperCase()}${info.model.slice(1)} (local)`;
      const first=ollamaModelSelect.querySelector?.('option');if(first)first.textContent=OLLAMA_CLOUD_MODELS[0].label;
      renderProviderSetup();updateChatMeta();
    })
    .catch(()=>{});
}

function chatToggle(){
  isOpen=!isOpen;
  fab.classList.toggle('open',isOpen);
  win.classList.toggle('open',isOpen);
  if(isOpen){
    badge.style.display='none';
    if(!msgs.children.length&&!restoreConversation())welcome();
    setTimeout(()=>inp.focus(),300);
  }
}
window.chatToggle=chatToggle;
fab.addEventListener('click',chatToggle);

function welcome(){botMsg(chatText('welcome'),'welcome');}

function escapeChatText(text){
  return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function botMsg(text,translationKey){
  const d=document.createElement('div');
  d.className='cm bot';
  d._translationKey=translationKey;
  d.innerHTML=`<div class="cm-av" aria-hidden="true"><svg><use href="#s-lotus"/></svg></div><div><div class="cm-bbl">${escapeChatText(text).replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</div><span class="cm-time">${ts()}</span></div>`;
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}
function userMsg(text){
  const d=document.createElement('div');
  d.className='cm usr';
  d.innerHTML=`<div><div class="cm-bbl">${escapeChatText(text)}</div><span class="cm-time cm-time-right">${ts()}</span></div>`;
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}
function showTyping(){
  const d=document.createElement('div');d.className='cm bot';d.id='typingRow';
  d.innerHTML='<div class="cm-av" aria-hidden="true"><svg><use href="#s-lotus"/></svg></div><div class="typing"><div class="tdot"></div><div class="tdot"></div><div class="tdot"></div></div>';
  msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;
}
function hideTyping(){const t=document.getElementById('typingRow');if(t)t.remove();}

/* ── AI API calls ──
  Groq is called directly from the browser with the visitor's key. Ollama Cloud
  requests go through API_URL so no visitor key is required.
*/
/* The server's grounded prompt (POST /api/chat/context, R-23): the same knowledge base, retrieval and accuracy rules as
   the server's own model. Falls back to the in-page guide only when the server cannot be reached (static hosting). */
async function serverGrounding(language){
  try{
    const res=await fetch(`${API_URL}/api/chat/context`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language,messages:history.slice(-8)}),signal:AbortSignal.timeout(20000)});
    if(!res.ok)return null;
    const data=await res.json();
    return typeof data.system==='string'&&data.system.trim()?data.system:null;
  }catch(_err){return null;}
}
/* Without an AI provider: the server's answer, from its model if it is up or from the knowledge base if not. */
async function serverGuideAnswer(language){
  try{
    const res=await fetch(`${API_URL}/api/chat`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language,messages:history.slice(-8)}),signal:AbortSignal.timeout(12000)});
    if(!res.ok)return null;
    const data=await res.json();
    return typeof data.reply==='string'&&data.reply.trim()?data.reply.trim():null;
  }catch(_err){return null;}
}
async function callGroq(systemPrompt,messages){
  const res=await fetch('https://api.groq.com/openai/v1/chat/completions',{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':`Bearer ${groqKey}`},
    body:JSON.stringify({
      model:'openai/gpt-oss-120b',
      messages:[{role:'system',content:systemPrompt},...messages],
      max_completion_tokens:1024,
      reasoning_effort:'low',
      temperature:0.3,
    }),
    signal:AbortSignal.timeout(30000),
  });
  if(!res.ok){const e=await res.text();throw new Error(`Groq ${res.status}: ${e}`);}
  const j=await res.json();
  const reply=j.choices?.[0]?.message?.content;
  if(typeof reply!=='string'||!reply.trim())throw new Error('Groq returned an empty reply');
  return reply.trim();
}
async function callOllamaCloud(messages,language='en'){
  const res=await fetch(`${API_URL}/api/chat`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      model:ollamaModel||undefined,
      language,
      messages,
    }),
    // The server may need up to two minutes to load its model on a cold start.
    signal:AbortSignal.timeout(150000),
  });
  if(!res.ok){const e=await res.text();throw new Error(`Ollama ${res.status}: ${e}`);}
  const j=await res.json();
  if(typeof j.reply!=='string'||!j.reply.trim())throw new Error('Ollama returned an empty reply');
  // Offline replies are the server's answers from the knowledge base (real prices, days and fees), so show them as is.
  return j.reply.trim();
}

/* ── Smart static fallback ──
  Used when AI is not configured or an API call fails. Keep these responses
  short and conversion-oriented.
*/
function fallbackKey(query){return window.DRUK_CHAT_LOCALE?.topic(query)||(/price|cost/i.test(query)?'chatPricing':/visa/i.test(query)?'chatVisa':/tiger|nest/i.test(query)?'chatNest':/season|when/i.test(query)?'chatSeasons':/trek|hike/i.test(query)?'chatTreks':'chatGeneric');}
function staticFallback(query){return chatText(fallbackKey(query));}

/* ── Main send flow ──
  Reads user input, shows typing state, selects AI or fallback mode, appends
  the response, and restores the send button when complete.
*/
async function chatSend(override){
  const text=(override||inp.value).trim().slice(0,800);
  if(!text||busy)return;
  inp.value='';inp.style.height='auto';
  qr.style.display='none';
  userMsg(text);
  history.push({role:'user',content:text});saveConversation();
  busy=true;snd.disabled=true;showTyping();

  try{
    let reply,guideKey;
    if(hasAIProviderEnabled()){
      // RAG: retrieve relevant chunks
      const chunks=retrieve(text,4);
      const context=chunks.map((c,i)=>`[Source ${i+1}: ${c.t}]\n${c.c}`).join('\n\n---\n\n');
      const responseLanguages={en:'English',ja:'Japanese',zh:'Simplified Chinese',ko:'Korean',es:'Spanish',fr:'French',vi:'Vietnamese',pt:'Portuguese'};
      const sys=`You are Pema, the warm AI travel assistant for Druk Voyages — Bhutan's most trusted travel agency in Thimphu. Be friendly, concise (under 120 words unless asked for detail), and passionate about Bhutan. Use "Tashi Delek!" for greetings. Guide users toward the enquiry form or calling +975 17 000 000 when appropriate. Answer in ${responseLanguages[chatLanguage()]||'English'} unless the visitor asks for another language.

ANSWER ONLY from this CONTEXT. If the answer isn't here, direct to hello@drukvoyages.bt.

CONTEXT:
${context}`;
      reply=aiProvider==='ollama'
        ?await callOllamaCloud(history.slice(-8),chatLanguage())
        :await callGroq(await serverGrounding(chatLanguage())||sys,history.slice(-8));
    }else{
      // No AI provider: the server still answers from its knowledge base (R-23). Only when there is no server
      // (static hosting) or it is slow does the built-in topic reply stand in.
      reply=await serverGuideAnswer(chatLanguage());
      if(!reply){await new Promise(r=>setTimeout(r,800));reply=staticFallback(text);guideKey=fallbackKey(text);}
    }
    hideTyping();
    botMsg(reply,hasAIProviderEnabled()?undefined:guideKey);
    history.push({role:'assistant',content:reply});saveConversation();
    updateChatMeta();
  }catch(err){
    hideTyping();
    console.warn('[Chat]',err.message);
    if(/401|403|invalid_api_key|unauthorized/i.test(err.message)){
      if(aiProvider==='groq'){
        groqKey='';
        botMsg(chatText('invalidGroq'),'invalidGroq');
      }else{
        botMsg(chatText('offlineOllama'),'offlineOllama');
      }
      saveChatPrefs();
      updateChatMeta();
    }else{
      botMsg(staticFallback(text),fallbackKey(text));
    }
    history.push({role:'assistant',content:'[fallback]'});saveConversation();
  }finally{busy=false;snd.disabled=false;inp.focus();}
}
window.chatSend=chatSend;

function chatQuick(text){if(!isOpen)chatToggle();setTimeout(()=>chatSend(CHAT_EN[text]?chatText(text):text),350);}
window.chatQuick=chatQuick;

function chatClear(){if(busy)return;history=[];saveConversation();msgs.innerHTML='';qr.style.display='flex';welcome();}
window.chatClear=chatClear;

function chatSetupToggle(){
  setup.style.display=setup.style.display==='none'||!setup.style.display?'block':'none';
  if(setup.style.display==='block')renderProviderSetup();
}
window.chatSetupToggle=chatSetupToggle;

function chatSaveKey(){
  if(busy)return;
  aiProvider=providerSelect.value==='ollama'?'ollama':'groq';
  if(aiProvider==='ollama'){
    ollamaModel=ollamaModelSelect.value;
  }else{
    const key=groqInput.value.trim();
    if(!key.startsWith('gsk_')){alert(chatText('invalidKey'));return;}
    groqKey=key;
  }
  saveChatPrefs();
  setup.style.display='none';
  updateChatMeta();
  msgs.innerHTML='';history=[];saveConversation();qr.style.display='flex';
  welcome();
  chatSend(chatText('quickItineraries'));
}
window.chatSaveKey=chatSaveKey;

providerSelect.addEventListener('change',()=>{
  renderProviderSetup(providerSelect.value);
});

inp.addEventListener('input',()=>{inp.style.height='auto';inp.style.height=Math.min(inp.scrollHeight,100)+'px';});
inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();chatSend();}});

// Auto-show after 12s
setTimeout(()=>{if(!isOpen){badge.style.display='flex';}},3000);
})();
