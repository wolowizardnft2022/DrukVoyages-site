(function(root){
  'use strict';
  const topics=[
    ['chatPricing',/price|cost|how much|expensive|pricing|料金|費用|价格|费用|多少钱|가격|비용|precio|cuesta|coût|prix|chi phí|giá|tốn|bao nhiêu|preço|custo|custa/i],
    ['chatVisa',/visa|ビザ|签证|비자|visado|thị thực|visto/i],
    ['chatNest',/tiger|nest|taktsang|タクツァン|タイガー|虎穴|虎巢|탁상|타이거|nido|nid|tổ hổ|ninho/i],
    ['chatSeasons',/best time|when|season|季節|時期|いつ|シーズン|季节|季節|什么时候|언제|계절|época|temporada|cuándo|saison|quand|période|mùa|khi nào|época|estação|quando/i],
    ['chatTreks',/trek|hike|walk|トレック|ハイク|徒步|远足|트레킹|하이킹|senderismo|randonnée|đi bộ|caminhada/i],
    ['chatFestivals',/festival|tsechu|tshechu|mask|祭|节庆|節慶|축제|lễ hội/i],
    ['chatContact',/book|contact|enquir|予約|連絡|联系|聯繫|예약|연락|reserv|contact|liên hệ|đặt/i],
    ['chatIntro',/itinerar|journey|旅程|旅行|行程|여행|일정|itinéra|hành trình|roteiro|hello|こんにちは|你好|안녕|hola|bonjour|xin chào|olá/i],
  ];
  function topic(query){return topics.find(([,pattern])=>pattern.test(query))?.[0]||'chatGeneric';}
  if(typeof module!=='undefined'&&module.exports)module.exports={topic};else root.DRUK_CHAT_LOCALE={topic};
})(typeof window!=='undefined'?window:{});
