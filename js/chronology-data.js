
// CEN Bible Chronology Data v8
// 핵심 원칙: 시대(era)와 사건(event)을 분리한다.
// CEN Bible 2.0 통합 시에는 이 파일을 data/chronology.js 또는 data/chronology.json으로 옮기면 된다.

const CHRONOLOGY_VERSION = "v8-creation-origin-prototype";

const ERA_ORDER = [
  "창조와 원역사", "족장 시대", "출애굽과 광야", "가나안 정복", "사사 시대",
  "통일왕국", "분열왕국", "유다 멸망과 포로", "포로귀환", "신구약 중간기",
  "예수 시대", "초대교회", "종말과 새창조"
];

const ERAS = [
  {
    id:"era-origin",
    title:"창조와 원역사",
    year:"BC 4000경 ~ BC 2200경",
    scripture:"창세기 1~11장",
    summary:"창조, 인간의 타락, 죄의 확산, 심판과 구원, 민족의 흩어짐을 다루는 성경 역사의 출발점입니다.",
    people:"하나님, 아담, 하와, 가인, 아벨, 노아",
    tone:"origin",
    eventIds:["creation","adam-eve","eden-exile","cain-abel","noah-ark","babel-tower"]
  },
  {
    id:"era-patriarch",
    title:"족장 시대",
    year:"BC 2000경 ~ BC 1800경",
    scripture:"창세기 12~50장",
    summary:"하나님께서 아브라함과 그의 후손을 부르시고 언약 백성의 뿌리를 세우신 시대입니다.",
    people:"아브라함, 이삭, 야곱, 요셉",
    tone:"patriarch",
    eventIds:["abraham-call","lot-sodom","isaac-offering","jacob-ladder","jabbok-wrestling","joseph-dream","joseph-governor"]
  },
  {
    id:"era-exodus",
    title:"출애굽과 광야",
    year:"BC 1446경 ~ BC 1406경",
    scripture:"출애굽기 ~ 신명기",
    summary:"이스라엘이 애굽에서 해방되어 언약 백성으로 세워지고 광야에서 훈련받은 시대입니다.",
    people:"모세, 아론, 여호수아",
    tone:"exodus",
    eventIds:["moses-birth","burning-bush","ten-plagues","passover","red-sea","manna-quail","sinai-commandments","golden-calf","tabernacle","wilderness-40","bronze-serpent"]
  },
  {
    id:"era-conquest",
    title:"가나안 정복",
    year:"BC 1406경 ~ BC 1375경",
    scripture:"여호수아",
    summary:"이스라엘이 요단강을 건너 약속의 땅에 들어가고 가나안 땅을 분배받은 시대입니다.",
    people:"여호수아, 갈렙",
    tone:"conquest",
    eventIds:["jordan-crossing","jericho","ai-battle","sun-moon","land-allotment"]
  },
  {
    id:"era-judges",
    title:"사사 시대",
    year:"BC 1375경 ~ BC 1050경",
    scripture:"사사기, 룻기",
    summary:"왕이 없던 시대에 죄, 압제, 부르짖음, 구원이 반복된 혼란의 시기입니다.",
    people:"드보라, 바락, 기드온, 삼손, 룻, 보아스",
    tone:"judges",
    eventIds:["deborah-barak","gideon-300","samson","ruth-boaz"]
  },
  {
    id:"era-united",
    title:"통일왕국",
    year:"BC 1050경 ~ BC 931경",
    scripture:"사무엘상·하, 열왕기상 1~11장",
    summary:"사울, 다윗, 솔로몬으로 이어지는 이스라엘 왕국의 전성기입니다.",
    people:"사울, 다윗, 솔로몬",
    tone:"kingdom",
    eventIds:["saul-king","david-goliath","ark-move","david-kingdom","bathsheba","solomon-wisdom","temple-build","temple-dedication"]
  },
  {
    id:"era-divided",
    title:"분열왕국",
    year:"BC 931경 ~ BC 586경",
    scripture:"열왕기상 12장 ~ 열왕기하",
    summary:"북이스라엘과 남유다로 나뉘고, 왕들과 선지자들이 복잡하게 얽힌 시대입니다.",
    people:"엘리야, 엘리사, 이사야, 예레미야, 히스기야, 요시야",
    tone:"divided",
    eventIds:["kingdom-divide","golden-calves","carmel","naboth","elisha-miracles","jonah-nineveh","north-fall","hezekiah-reform","assyria-invasion","josiah-reform","jeremiah-tears","judah-fall"]
  },
  {
    id:"era-exile",
    title:"유다 멸망과 포로",
    year:"BC 605경 ~ BC 538경",
    scripture:"열왕기하 24~25장, 다니엘, 에스겔, 에스더",
    summary:"예루살렘과 성전이 무너지고, 포로지에서 하나님 신앙이 새롭게 붙들린 시대입니다.",
    people:"다니엘, 세 친구, 에스겔, 에스더",
    tone:"exile",
    eventIds:["daniel-friends","furnace","nebuchadnezzar-dream","lion-den","ezekiel-vision","esther-purim"]
  },
  {
    id:"era-return",
    title:"포로귀환",
    year:"BC 538경 ~ BC 430경",
    scripture:"에스라, 느헤미야, 학개, 스가랴, 말라기",
    summary:"포로에서 돌아온 유다 공동체가 성전, 율법, 성벽을 다시 세운 재건의 시대입니다.",
    people:"스룹바벨, 에스라, 느헤미야",
    tone:"return",
    eventIds:["zerubbabel-return","temple-rebuild","ezra-reform","nehemiah-wall"]
  },
  {
    id:"era-intertestamental",
    title:"신구약 중간기",
    year:"BC 400경 ~ BC 4경",
    scripture:"말라기 이후 ~ 마태복음 이전",
    summary:"기록 선지자의 활동은 멈췄지만, 헬라 문화와 로마 지배 속에서 신약의 무대가 준비된 400년 침묵기입니다.",
    people:"알렉산더 대왕, 마카비 가문, 헤롯 가문",
    tone:"silent",
    eventIds:["hellenism","alexander","maccabees","hanukkah","rome"]
  },
  {
    id:"era-jesus",
    title:"예수 시대",
    year:"BC 4경 ~ AD 30경",
    scripture:"복음서",
    summary:"예수 그리스도의 탄생, 공생애, 십자가, 부활을 통해 구약의 약속이 성취된 시대입니다.",
    people:"예수님, 세례요한, 제자들",
    tone:"jesus",
    eventIds:["jesus-birth","magi","john-baptist","jesus-baptism","temptation","calling-disciples","sermon-mount","five-loaves","walk-water","transfiguration","lazarus","triumphal-entry","last-supper","gethsemane","cross","resurrection","pentecost-promise","ascension"]
  },
  {
    id:"era-church",
    title:"초대교회",
    year:"AD 30경 ~ AD 100경",
    scripture:"사도행전, 서신서",
    summary:"성령강림 이후 복음이 예루살렘에서 로마까지 확장된 시대입니다.",
    people:"베드로, 스데반, 바울, 요한",
    tone:"church",
    eventIds:["pentecost","stephen","paul-conversion","paul-1st","jerusalem-council","paul-2nd","paul-3rd","rome-transfer","john-patmos"]
  },
  {
    id:"era-newcreation",
    title:"종말과 새창조",
    year:"미래",
    scripture:"요한계시록",
    summary:"하나님의 최종 심판과 새 하늘과 새 땅의 완성을 바라보는 성경의 결말입니다.",
    people:"요한",
    tone:"newcreation",
    eventIds:["seven-churches","seven-seals","beast-tribulation","armageddon","new-jerusalem","new-heaven-earth"]
  }
];

const EVENTS = {
  "creation":{
    title:"창조", era:"창조와 원역사", year:"태초, 기원전 약 4000년 이상", scripture:"창세기 1~2장",
    place:"천지, 하늘과 땅, 우주와 지구 전체",
    people:["하나님","아담","하와","천사들","동물들"],
    summary:"하나님이 태초에 천지와 만물을 창조하시고, 6일 동안 창조를 이루신 뒤 7일째 안식하신 사건입니다.",
    core:["1일: 빛과 어둠을 나누심","2일: 궁창, 하늘과 물을 나누심","3일: 땅과 바다, 식물을 창조하심","4일: 해와 달과 별을 만드심","5일: 바다 생물과 하늘의 새를 창조하심","6일: 동물과 사람을 창조하시고 복 주심","7일: 하나님이 안식하시고 그 날을 복되게 하심"],
    meaning:["하나님은 창조주이시며 모든 것의 주권자이심","모든 존재는 하나님의 말씀으로 창조됨","사람은 하나님의 형상대로 창조되어 특별한 가치를 가짐","창조는 선하며 하나님께 영광을 돌리기 위한 것임"],
    connect:["유월절","성막","십자가","성찬","새창조"],
    visual:"우주, 지구, 하늘, 바다, 육지, 생명체",
    image:"assets/infographics/01_creation.png"
  },
  "adam-eve":{
    title:"아담과 하와", era:"창조와 원역사", year:"태초, 창조 직후", scripture:"창세기 2장",
    place:"에덴동산",
    people:["하나님","아담","하와"],
    summary:"하나님께서 사람을 흙으로 지으시고 생기를 불어넣으시며, 아담과 하와를 통해 인류와 가정의 시작을 세우신 사건입니다.",
    core:["아담이 흙으로 지음받음","하나님이 생기를 불어넣으심","에덴동산을 맡기심","하와가 아담의 돕는 배필로 지음받음","부부와 가정의 기원이 세워짐"],
    meaning:["인간은 하나님의 형상으로 창조된 존귀한 존재","노동과 돌봄은 창조 질서 안에 있음","남자와 여자는 하나님 앞에서 함께 부름받은 존재","가정과 관계의 시작을 보여줌"],
    connect:["창조","에덴동산 추방","가정","그리스도와 교회"],
    visual:"에덴동산, 생명나무, 아담과 하와",
    image:"assets/infographics/02_adam_eve.png"
  },
  "eden-exile":{
    title:"에덴동산 추방", era:"창조와 원역사", year:"태초 이후", scripture:"창세기 3장",
    place:"에덴동산, 동산 동쪽",
    people:["하나님","아담","하와","뱀"],
    summary:"아담과 하와가 하나님의 명령을 어기고 선악과를 먹음으로 죄가 세상에 들어오고, 인간이 에덴동산에서 추방된 사건입니다.",
    core:["뱀이 하와를 유혹함","아담과 하와가 선악과를 먹음","죄와 두려움과 숨음이 시작됨","하나님이 심판을 선언하심","가죽옷과 여자의 후손 약속이 주어짐","에덴동산에서 추방됨"],
    meaning:["죄는 하나님과 인간, 인간과 인간, 인간과 자연의 관계를 깨뜨림","심판 중에도 구원의 약속이 주어짐","여자의 후손 약속은 복음의 첫 실마리로 이해됨","인간은 스스로 생명에 이를 수 없음을 보여줌"],
    connect:["창조","가인과 아벨","십자가","새예루살렘"],
    visual:"에덴동산, 선악과, 추방, 그룹과 불칼",
    image:"assets/infographics/03_eden_exile.png"
  },
  "cain-abel":{
    title:"가인과 아벨", era:"창조와 원역사", year:"타락 이후 초기 인류 시대", scripture:"창세기 4장",
    place:"에덴 동쪽, 놋 땅",
    people:["가인","아벨","하나님"],
    summary:"가인이 동생 아벨을 죽인 인류 최초의 살인 사건으로, 죄가 인간관계 안으로 확산되는 모습을 보여줍니다.",
    core:["가인과 아벨이 제물을 드림","하나님이 아벨과 그의 제물은 받으심","가인이 분노함","가인이 아벨을 죽임","하나님이 가인에게 죄를 물으심","가인이 땅에서 떠돌게 됨"],
    meaning:["죄는 예배와 관계 안에서도 드러남","질투와 분노가 살인으로 이어질 수 있음","하나님은 억울한 피의 소리를 들으심","심판 중에도 보호의 표가 주어짐"],
    connect:["에덴동산 추방","제사","피","의인 아벨","십자가"],
    visual:"두 형제, 제단, 들판, 놋 땅",
    image:"assets/infographics/04_cain_abel.png"
  },
  "noah-ark":{
    title:"노아의 방주", era:"창조와 원역사", year:"홍수 시대, 기원전 약 2500년경 전후", scripture:"창세기 6~9장",
    place:"온 땅, 방주, 아라랏 산",
    people:["하나님","노아","노아의 가족","셈","함","야벳"],
    summary:"세상의 죄악이 가득한 가운데 하나님이 홍수로 심판하시되, 노아와 그의 가족을 방주로 구원하신 사건입니다.",
    core:["세상의 죄악이 가득함","노아가 하나님의 명령을 따라 방주를 지음","홍수가 온 땅을 덮음","방주 안의 노아 가족과 생명들이 보존됨","물이 줄고 방주가 아라랏에 머묾","하나님이 무지개 언약을 주심"],
    meaning:["하나님은 죄를 심판하시는 분","심판 중에도 구원의 길을 예비하심","믿음과 순종은 생명을 보존하는 길이 됨","무지개는 하나님의 언약과 긍휼의 표징"],
    connect:["창조","심판","언약","세례","구원"],
    visual:"방주, 홍수, 아라랏 산, 무지개",
    image:"assets/infographics/05_noah_ark.png"
  },
  "babel-tower":{
    title:"바벨탑", era:"창조와 원역사", year:"홍수 이후, 기원전 약 2200년경 전후", scripture:"창세기 11장",
    place:"시날 평지, 바벨",
    people:["시날 사람들","하나님"],
    summary:"사람들이 자기 이름을 내고 흩어짐을 피하려고 탑을 쌓았으나, 하나님이 언어를 혼잡하게 하셔서 온 땅에 흩으신 사건입니다.",
    core:["사람들이 시날 평지에 모임","성읍과 탑을 쌓으려 함","자기 이름을 내고 흩어짐을 피하려 함","하나님이 내려오셔서 보심","언어가 혼잡해짐","사람들이 온 땅에 흩어짐"],
    meaning:["인간의 교만과 자기중심적 문명을 보여줌","하나님 없이 하나가 되려는 시도는 무너짐","언어와 민족의 흩어짐 배경을 설명함","오순절 성령강림과 복음의 회복 흐름으로 연결됨"],
    connect:["노아의 방주","아브라함의 부르심","오순절","열방","복음"],
    visual:"시날 평지, 탑, 흩어진 사람들, 언어",
    image:"assets/infographics/06_babel_tower.png"
  }
};

const EVENT_SUMMARIES = {
  "창조":"하나님이 태초에 천지와 만물을 창조하신 사건입니다.",
  "아담과 하와":"인류 최초의 남자와 여자가 창조되고, 사람과 가정의 시작이 세워진 사건입니다.",
  "에덴동산 추방":"죄로 인해 인간이 에덴에서 쫓겨나지만, 구원의 약속이 처음 암시된 사건입니다.",
  "가인과 아벨":"가인이 아벨을 죽이며 죄가 인간관계 안으로 확산된 사건입니다.",
  "노아의 방주":"홍수 심판 가운데 노아와 그의 가족을 방주로 구원하신 사건입니다.",
  "바벨탑":"인간의 교만으로 언어가 혼잡해지고 민족들이 흩어진 사건입니다.",
};

// 나머지 시대 사건은 먼저 칩과 미리보기용으로 유지한다.
// 상세 탭카드는 인포그래픽이 확보되는 순서대로 EVENTS에 추가하면 된다.
const ALL_EVENT_TITLES = {
  "abraham-call":"아브라함의 부르심","lot-sodom":"롯과 소돔","isaac-offering":"이삭 번제","jacob-ladder":"야곱의 사닥다리","jabbok-wrestling":"얍복강 씨름","joseph-dream":"요셉의 꿈","joseph-governor":"요셉의 애굽 총리 등극",
  "moses-birth":"모세의 탄생","burning-bush":"떨기나무 소명","ten-plagues":"10재앙","passover":"유월절","red-sea":"홍해 도하","manna-quail":"만나와 메추라기","sinai-commandments":"시내산 십계명","golden-calf":"금송아지 사건","tabernacle":"성막 건축","wilderness-40":"광야 40년","bronze-serpent":"놋뱀 사건",
  "jordan-crossing":"요단강 도하","jericho":"여리고 함락","ai-battle":"아이성 전투","sun-moon":"해와 달이 멈춤","land-allotment":"가나안 땅 분배",
  "deborah-barak":"드보라와 바락","gideon-300":"기드온 300용사","samson":"삼손","ruth-boaz":"룻과 보아스",
  "saul-king":"사울 왕 즉위","david-goliath":"다윗과 골리앗","ark-move":"언약궤 이동","david-kingdom":"다윗 왕국","bathsheba":"밧세바 사건","solomon-wisdom":"솔로몬의 지혜","temple-build":"성전 건축","temple-dedication":"성전 봉헌",
  "kingdom-divide":"왕국 분열","golden-calves":"금송아지 우상","carmel":"엘리야 갈멜산 대결","naboth":"나봇의 포도원","elisha-miracles":"엘리사의 기적","jonah-nineveh":"요나와 니느웨","north-fall":"북이스라엘 멸망","hezekiah-reform":"히스기야 개혁","assyria-invasion":"앗수르 침공","josiah-reform":"요시야 개혁","jeremiah-tears":"예레미야의 눈물","judah-fall":"남유다 멸망",
  "daniel-friends":"다니엘과 세 친구","furnace":"풀무불 사건","nebuchadnezzar-dream":"느부갓네살의 꿈","lion-den":"사자굴 사건","ezekiel-vision":"에스겔 환상","esther-purim":"에스더와 부림절",
  "zerubbabel-return":"스룹바벨 귀환","temple-rebuild":"성전 재건","ezra-reform":"에스라 율법개혁","nehemiah-wall":"느헤미야 성벽 재건",
  "hellenism":"헬라 제국 등장","alexander":"알렉산더 대왕","maccabees":"마카비 혁명","hanukkah":"하누카 절기","rome":"로마 제국 등장",
  "jesus-birth":"예수 탄생","magi":"동방박사","john-baptist":"세례요한","jesus-baptism":"예수 세례","temptation":"광야 시험","calling-disciples":"제자 부르심","sermon-mount":"산상수훈","five-loaves":"오병이어","walk-water":"물 위를 걸으심","transfiguration":"변화산 사건","lazarus":"나사로 부활","triumphal-entry":"예루살렘 입성","last-supper":"최후의 만찬","gethsemane":"겟세마네 기도","cross":"십자가","resurrection":"부활","pentecost-promise":"오순절 약속","ascension":"승천",
  "pentecost":"오순절 성령강림","stephen":"스데반 순교","paul-conversion":"바울 회심","paul-1st":"1차 선교여행","jerusalem-council":"예루살렘 공의회","paul-2nd":"2차 선교여행","paul-3rd":"3차 선교여행","rome-transfer":"로마 압송","john-patmos":"밧모섬 요한",
  "seven-churches":"일곱 교회","seven-seals":"일곱 인","beast-tribulation":"짐승과 환난","armageddon":"아마겟돈","new-jerusalem":"새예루살렘","new-heaven-earth":"새 하늘과 새 땅"
};


// v9 보강 데이터: 인포그래픽의 6.핵심사건(흐름), 7.관련성경, 9.지도/시각자료를 상세 화면 중심축으로 사용
const EVENT_ENRICH = {
  "creation": {
    flowTitle: "6일 창조의 기록",
    flow: [
      ["1일째","빛을 창조하시고 빛과 어둠을 나누심","빛"],
      ["2일째","궁창을 만드시고 하늘과 물을 나누심","하늘과 물"],
      ["3일째","땅과 바다를 나누시고 식물과 나무를 창조하심","땅·바다·식물"],
      ["4일째","해와 달과 별을 만드심","해·달·별"],
      ["5일째","바다의 생물과 하늘의 새를 창조하심","바다 생물·새"],
      ["6일째","땅의 동물과 사람을 창조하시고 복 주심","동물·사람"],
      ["7일째","하나님이 안식하시고 그 날을 복되게 하심","안식"]
    ],
    scriptureRefs: [
      ["창세기 1:1","태초에 하나님이 천지를 창조하시니라"],
      ["창세기 1:31","하나님이 지으신 모든 것을 보시니 보시기에 심히 좋았더라"],
      ["창세기 2:2","하나님이 그가 하시던 일을 일곱째 날에 마치시니"]
    ],
    visualItems: ["우주","지구","하늘","바다","육지","생명체"]
  },
  "adam-eve": {
    flowTitle: "사람과 가정의 시작",
    flow: [
      ["흙","하나님이 흙으로 사람을 지으심","흙"],
      ["생기","생기를 불어넣으셔서 사람이 생령이 됨","생기"],
      ["동산","아담을 에덴동산에 두어 다스리고 지키게 하심","에덴"],
      ["명령","선악을 알게 하는 나무의 열매를 금하심","선악과"],
      ["하와","아담의 갈빗대로 하와를 지으심","하와"],
      ["가정","남자와 여자가 한 몸을 이루는 질서를 세우심","가정"]
    ],
    scriptureRefs: [
      ["창세기 2:7","생기를 그 코에 불어넣으시니 사람이 생령이 되니라"],
      ["창세기 2:15","그것을 경작하며 지키게 하시고"],
      ["창세기 2:24","둘이 한 몸을 이룰지로다"]
    ],
    visualItems: ["에덴동산","생명나무","아담","하와","선악과"]
  },
  "eden-exile": {
    flowTitle: "타락과 추방의 흐름",
    flow: [
      ["유혹","뱀이 하나님의 말씀을 의심하게 함","뱀"],
      ["불순종","아담과 하와가 선악과를 먹음","선악과"],
      ["숨음","죄로 인해 두려워하며 숨음","나무 사이"],
      ["심문","하나님이 아담과 하와를 부르심","하나님의 부르심"],
      ["심판","뱀, 여자, 남자에게 심판을 선언하심","심판"],
      ["약속","여자의 후손 약속이 주어짐","후손 약속"],
      ["추방","에덴동산에서 쫓겨나고 그룹과 불칼이 길을 지킴","동산 동쪽"]
    ],
    scriptureRefs: [
      ["창세기 3:6","그 열매를 따먹고 자기와 함께 있는 남편에게도 주매"],
      ["창세기 3:15","여자의 후손은 네 머리를 상하게 할 것이요"],
      ["창세기 3:24","그룹들과 두루 도는 불 칼을 두어 생명나무의 길을 지키게 하시니라"]
    ],
    visualItems: ["에덴동산","선악과","뱀","가죽옷","그룹과 불칼"]
  },
  "cain-abel": {
    flowTitle: "죄가 관계로 번지는 흐름",
    flow: [
      ["제물","가인과 아벨이 하나님께 제물을 드림","제단"],
      ["응답","하나님이 아벨과 그의 제물은 받으심","아벨의 제물"],
      ["분노","가인이 몹시 분하여 안색이 변함","분노"],
      ["경고","하나님이 죄가 문에 엎드렸다고 경고하심","죄의 경고"],
      ["살인","가인이 들에서 아벨을 죽임","들판"],
      ["심판","가인이 땅에서 떠도는 자가 됨","놋 땅"],
      ["표","하나님이 가인을 보호하는 표를 주심","가인의 표"]
    ],
    scriptureRefs: [
      ["창세기 4:4","여호와께서 아벨과 그의 제물은 받으셨으나"],
      ["창세기 4:7","죄가 문에 엎드려 있느니라"],
      ["창세기 4:10","네 아우의 핏소리가 땅에서부터 내게 호소하느니라"]
    ],
    visualItems: ["제단","들판","피","놋 땅","가인의 표"]
  },
  "noah-ark": {
    flowTitle: "심판과 구원의 흐름",
    flow: [
      ["타락","세상에 죄악이 가득함","죄악"],
      ["은혜","노아가 하나님께 은혜를 입음","노아"],
      ["방주","하나님의 명령대로 방주를 지음","방주"],
      ["홍수","큰 깊음의 샘과 하늘의 창이 열림","홍수"],
      ["보존","방주 안에서 노아 가족과 생명이 보존됨","방주 안"],
      ["아라랏","방주가 아라랏 산에 머묾","아라랏"],
      ["언약","무지개를 언약의 표로 주심","무지개"]
    ],
    scriptureRefs: [
      ["창세기 6:8","그러나 노아는 여호와께 은혜를 입었더라"],
      ["창세기 7:23","오직 노아와 그와 함께 방주에 있던 자들만 남았더라"],
      ["창세기 9:13","내가 내 무지개를 구름 속에 두었나니"]
    ],
    visualItems: ["방주","홍수","비둘기","아라랏 산","무지개"]
  },
  "babel-tower": {
    flowTitle: "교만과 흩어짐의 흐름",
    flow: [
      ["이동","사람들이 동방으로 옮기다가 시날 평지를 만남","시날"],
      ["건설","벽돌과 역청으로 성읍과 탑을 쌓음","벽돌"],
      ["교만","자기 이름을 내고 흩어짐을 피하려 함","높은 탑"],
      ["강림","하나님이 내려오셔서 보심","하나님의 강림"],
      ["혼잡","언어를 혼잡하게 하심","언어 혼잡"],
      ["흩어짐","사람들이 온 지면에 흩어짐","열방"],
      ["연결","오순절과 열방 복음의 회복으로 연결됨","오순절"]
    ],
    scriptureRefs: [
      ["창세기 11:4","우리 이름을 내고 온 지면에 흩어짐을 면하자"],
      ["창세기 11:7","그들의 언어를 혼잡하게 하자"],
      ["창세기 11:9","여호와께서 거기서 그들을 온 지면에 흩으셨더라"]
    ],
    visualItems: ["시날 평지","바벨탑","언어","흩어진 민족","오순절 연결"]
  }
};
