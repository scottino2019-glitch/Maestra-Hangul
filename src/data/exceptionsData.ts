export interface ExceptionPair {
  written: string;
  spoken: string;
  romanization: string;
  meaning: string;
  note: string;
}

export interface ExceptionRule {
  id: string;
  number: string;
  title: string;
  koreanName: string;
  shortRule: string;
  teacherExplanation: string;
  kidMetaphor: string;
  pairs: ExceptionPair[];
}

export const EXCEPTION_RULES: ExceptionRule[] = [
  {
    id: 'batchim_7',
    number: '01',
    title: 'Le 7 Voci del Batchim (Neutralizzazione)',
    koreanName: '받침의 대표음',
    shortRule: 'Tutte le consonanti finali si riducono a soli 7 suoni: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ.',
    teacherExplanation:
      'Quando una consonante scende al piano di sotto della sillaba (Batchim) e non c’è nessuna vocale subito dopo, non puoi far uscire il soffio d’aria! Per questo motivo 27 possibili lettere finali si trasformano in appena 7 suoni bloccati. In particolare: ㅅ, ㅆ, ㅈ, ㅊ, ㅌ e ㅎ in fondo si fermano tutte come una "t" muta (ㄷ)!',
    kidMetaphor:
      'Immagina 27 bambini che devono entrare in solo 7 casette colorate quando finisce la sillaba: tutte quelle che fanno aria o sibili (ㅅ, ㅈ, ㅊ, ㅌ) si siedono nella casetta silenziosa della "T"!',
    pairs: [
      {
        written: '부엌',
        spoken: '부억',
        romanization: 'bu-eok',
        meaning: 'Cucina',
        note: 'ㅋ finale perde il soffio e diventa ㄱ bloccata',
      },
      {
        written: '꽃',
        spoken: '꼳',
        romanization: 'kkot',
        meaning: 'Fiore',
        note: 'ㅊ finale si trasforma in "t" muta bloccata',
      },
      {
        written: '낮',
        spoken: '낟',
        romanization: 'nat',
        meaning: 'Giorno',
        note: 'ㅈ finale si blocca come "t" muta',
      },
      {
        written: '옷',
        spoken: '옫',
        romanization: 'ot',
        meaning: 'Vestito',
        note: 'ㅅ finale non sibila più: diventa "t" muta',
      },
      {
        written: '앞',
        spoken: '압',
        romanization: 'ap',
        meaning: 'Davanti',
        note: 'ㅍ finale chiude le labbra senza soffio come ㅂ',
      },
    ],
  },
  {
    id: 'liaison',
    number: '02',
    title: 'Il Ponte Sonoro (Liaison / Legamento)',
    koreanName: '연음법칙',
    shortRule: 'Se il Batchim è seguito dal cerchietto muto ㅇ, la consonante salta nella sillaba dopo!',
    teacherExplanation:
      'Questa è la regola più bella e naturale del coreano! Il cerchietto ㅇ all’inizio della sillaba successiva è una sedia vuota: la consonante che era bloccata sotto alla sillaba prima ne approfitta, attraversa il ponte e prende il posto di ㅇ tornando a suonare chiara e completa!',
    kidMetaphor:
      'La consonante sotto è stanca di stare al piano di sotto: appena vede la casetta vuota del cerchietto muto ㅇ davanti a sé, fa un saltello e ci entra dentro!',
    pairs: [
      {
        written: '한국어',
        spoken: '한구거',
        romanization: 'han-gu-geo',
        meaning: 'Lingua coreana',
        note: 'ㄱ di 국 salta al posto di ㅇ in 어 → 거',
      },
      {
        written: '먹어요',
        spoken: '머거요',
        romanization: 'meo-geo-yo',
        meaning: 'Mangia / Mangio',
        note: 'ㄱ di 먹 salta in 어 → 거',
      },
      {
        written: '옷이',
        spoken: '오시',
        romanization: 'o-shi',
        meaning: 'Il vestito (soggetto)',
        note: 'ㅅ di 옷 salta su 이 e si legge "shi"!',
      },
      {
        written: '꽃이',
        spoken: '꼬치',
        romanization: 'kko-chi',
        meaning: 'Il fiore (soggetto)',
        note: 'ㅊ di 꽃 salta su 이 e recupera il suo soffio "chi"!',
      },
      {
        written: '일요일',
        spoken: '이료일',
        romanization: 'i-ryo-il',
        meaning: 'Domenica',
        note: 'ㄹ di 일 salta su 요 diventando una R leggera',
      },
    ],
  },
  {
    id: 'aspiration',
    number: '03',
    title: 'La Scintilla Aspirata (Fusione con ㅎ)',
    koreanName: '거센소리되기',
    shortRule: 'ㅎ + ㄱ, ㄷ, ㅂ, ㅈ (in qualsiasi ordine) si fondono in ㅋ, ㅌ, ㅍ, ㅊ!',
    teacherExplanation:
      'La lettera ㅎ è fatta di puro soffio! Quando tocca da vicino ㄱ, ㄷ, ㅂ o ㅈ (sia prima che dopo), regala loro tutto il suo vento trasformandole subito nelle corrispondenti consonanti aspirate: ㄱ+ㅎ=ㅋ, ㄷ+ㅎ=ㅌ, ㅂ+ㅎ=ㅍ, ㅈ+ㅎ=ㅊ.',
    kidMetaphor:
      'ㅎ è una nuvoletta di vento: quando abbraccia una consonante normale, le dà un super-soffio e la fa diventare esplosiva!',
    pairs: [
      {
        written: '좋다',
        spoken: '조타',
        romanization: 'jo-ta',
        meaning: 'Essere buono',
        note: 'ㅎ + ㄷ si fondono in ㅌ!',
      },
      {
        written: '많다',
        spoken: '만타',
        romanization: 'man-ta',
        meaning: 'Essere tanto',
        note: 'ㅎ del doppio batchim ㄶ + ㄷ → ㅌ',
      },
      {
        written: '축하해요',
        spoken: '추카해요',
        romanization: 'chu-ka-hae-yo',
        meaning: 'Congratulazioni!',
        note: 'ㄱ + ㅎ si fondono in ㅋ',
      },
      {
        written: '어떻습니까',
        spoken: '어떠씀니까',
        romanization: 'eo-tteo-sseum-ni-kka',
        meaning: 'Com’è? (formale)',
        note: 'ㅎ davanti a ㅅ rafforza il suono',
      },
    ],
  },
  {
    id: 'nasalization',
    number: '04',
    title: 'L’Effetto Naso (Nasalizzazione)',
    koreanName: '비음화',
    shortRule: 'ㄱ, ㄷ, ㅂ davanti a ㄴ o ㅁ diventano suoni nasali: ㅇ(ng), ㄴ(n), ㅁ(m)!',
    teacherExplanation:
      'Prova a dire velocemente "b-n" o "k-m" senza fermarti: è faticoso! Per questo i coreani trasformano le consonanti dure (ㄱ, ㄷ, ㅂ) nelle loro cugine nasali dolci (ㅇ, ㄴ, ㅁ) ogni volta che incontrano una consonante nasale (ㄴ o ㅁ).',
    kidMetaphor:
      'Quando una consonante dura incontra le amiche del naso (ㄴ e ㅁ), si mette anche lei a parlare col naso per fare squadra!',
    pairs: [
      {
        written: '감사합니다',
        spoken: '감사함니다',
        romanization: 'gam-sa-ham-ni-da',
        meaning: 'Grazie',
        note: 'ㅂ prima di ㄴ diventa ㅁ!',
      },
      {
        written: '한국말',
        spoken: '한궁말',
        romanization: 'han-gung-mal',
        meaning: 'Parlata coreana',
        note: 'ㄱ prima di ㅁ diventa ㅇ (ng)!',
      },
      {
        written: '작년',
        spoken: '장년',
        romanization: 'jang-nyeon',
        meaning: 'L’anno scorso',
        note: 'ㄱ prima di ㄴ diventa ㅇ (ng)!',
      },
      {
        written: '없는',
        spoken: '엄는',
        romanization: 'eom-neun',
        meaning: 'Che non c’è',
        note: 'ㅂ finale di 없 prima di ㄴ diventa ㅁ!',
      },
    ],
  },
  {
    id: 'lateralization',
    number: '05',
    title: 'Il Fiume Fluido (Lateralizzazione)',
    koreanName: '유음화',
    shortRule: 'Quando ㄴ e ㄹ si toccano (ㄴ+ㄹ oppure ㄹ+ㄴ), diventano entrambe ㄹ+ㄹ (L doppia)!',
    teacherExplanation:
      'Passare dalla "n" alla "r" o dalla "l" alla "n" fa inciampare la lingua. Così il coreano sceglie la via più morbida e scorrevole: entrambe le lettere diventano una doppia "L" dolce e fluida!',
    kidMetaphor:
      'Il serpente del fiume ㄹ tocca la casetta ㄴ e la trasforma in acqua corrente: tutte e due scorrono come una lunga "L-L"!',
    pairs: [
      {
        written: '신라',
        spoken: '실라',
        romanization: 'shil-la',
        meaning: 'Regno di Silla',
        note: 'ㄴ + ㄹ → ㄹ + ㄹ ("shil-la")',
      },
      {
        written: '설날',
        spoken: '설랄',
        romanization: 'seol-lal',
        meaning: 'Capodanno lunare',
        note: 'ㄹ + ㄴ → ㄹ + ㄹ ("seol-lal")',
      },
      {
        written: '연락',
        spoken: '열락',
        romanization: 'yeol-lak',
        meaning: 'Contatto / Chiamata',
        note: 'ㄴ + ㄹ → ㄹ + ㄹ ("yeol-lak")',
      },
      {
        written: '관리',
        spoken: '괄리',
        romanization: 'gwal-li',
        meaning: 'Gestione',
        note: 'ㄴ + ㄹ → ㄹ + ㄹ ("gwal-li")',
      },
    ],
  },
  {
    id: 'palatalization',
    number: '06',
    title: 'La Magia della "I" (Palatalizzazione)',
    koreanName: '구개음화',
    shortRule: 'ㄷ o ㅌ in Batchim seguite dal suffisso 이 diventano ㅈ (j) e ㅊ (ch)!',
    teacherExplanation:
      'Quando la punta della lingua finisce una sillaba con ㄷ o ㅌ e subito dopo deve dire "이" (i), scivola naturalmente indietro sul palato trasformando ㄷ+이 in [지] e ㅌ+이 in [치]!',
    kidMetaphor:
      'La "I" è una fata gentile: quando tocca la dura ㄷ o ㅌ alla fine della sillaba, la trasforma in una dolce ㅈ o ㅊ!',
    pairs: [
      {
        written: '같이',
        spoken: '가치',
        romanization: 'ga-chi',
        meaning: 'Insieme',
        note: 'ㅌ + 이 → 치 (una delle parole più usate!)',
      },
      {
        written: '굳이',
        spoken: '구지',
        romanization: 'gu-ji',
        meaning: 'Apposta / Proprio',
        note: 'ㄷ + 이 → 지',
      },
      {
        written: '해돋이',
        spoken: '해도지',
        romanization: 'hae-do-ji',
        meaning: 'Alba (sorgere del sole)',
        note: 'ㄷ + 이 → 지',
      },
    ],
  },
  {
    id: 'double_batchim',
    number: '07',
    title: 'I Gemelli Sotto (Doppio Batchim)',
    koreanName: '겹받침',
    shortRule: 'Con 2 consonanti sotto, davanti a consonante ne resta solo 1; davanti a vocale saltano divise!',
    teacherExplanation:
      'Alcune sillabe coreane hanno DUE consonanti sedute in fondo insieme (come 닭, 없다, 앉다, 읽다). Se la sillaba finisce lì o dopo c’è una consonante, se ne pronuncia UNA sola (spesso la prima: 앉→안, 없→업, ma in 닭/읽/삶 si pronuncia la seconda: 닭→닥, 삶→삼!). Ma se dopo c’è una vocale con ㅇ muto, la prima resta giù e la seconda salta sopra!',
    kidMetaphor:
      'Due amici seduti su una sedia stretta sotto la sillaba: se non c’è posto davanti, uno si nasconde; ma se vedono il cerchio vuoto ㅇ dopo, il secondo amico fa un salto e va a sedersi lì!',
    pairs: [
      {
        written: '닭',
        spoken: '닥',
        romanization: 'dak',
        meaning: 'Pollo',
        note: 'ㄺ da solo si legge ㄱ [닥]',
      },
      {
        written: '닭이',
        spoken: '달기',
        romanization: 'dal-gi',
        meaning: 'Il pollo (soggetto)',
        note: 'Con 이 dopo: ㄹ resta sotto e ㄱ salta su 이 → [달기]!',
      },
      {
        written: '없다',
        spoken: '업따',
        romanization: 'eop-tta',
        meaning: 'Non esserci',
        note: 'ㅄ prima di consonante perde la ㅅ → [업따]',
      },
      {
        written: '없어요',
        spoken: '업써요',
        romanization: 'eop-sseo-yo',
        meaning: 'Non c’è / Non ho',
        note: 'Con 어 dopo: ㅂ resta sotto e ㅅ salta diventando tesa [업써요]!',
      },
      {
        written: '읽고',
        spoken: '일꼬',
        romanization: 'il-kko',
        meaning: 'Legge e...',
        note: 'Eccezione speciale di 읽: davanti a ㄱ si legge la ㄹ [일꼬] invece di [익꼬]!',
      },
    ],
  },
  {
    id: 'vowel_mergers',
    number: '08',
    title: 'Le Vocali Gemelle e i 4 Volti di ㅢ',
    koreanName: '모음의 실제 발음',
    shortRule: 'ㅐ≈ㅔ, ㅙ≈ㅚ≈ㅞ nel parlato; ㅢ cambia lettura in base alla posizione.',
    teacherExplanation:
      'Infine, ecco i segreti delle vocali nel coreano di tutti i giorni: (1) ㅐ ed ㅔ suonano ormai quasi identiche ("e"); (2) ㅙ, ㅚ e ㅞ si pronunciano tutte "we" ("ue"); (3) ㅖ dopo una consonante (계, 례, 혜) si semplifica quasi sempre in "e"; (4) ㅢ si legge "eu-i" solo all’inizio con ㅇ, diventa "i" dopo consonante (희망→히망) e diventa "e" come particella di possesso (나의→나에)!',
    kidMetaphor:
      'Proprio come in italiano la "e" aperta e chiusa spesso si somigliano al telefono, anche in coreano alcune vocali gemelle condividono lo stesso vestito sonoro!',
    pairs: [
      {
        written: '외국',
        spoken: '웨국',
        romanization: 'we-guk',
        meaning: 'Paese estero',
        note: 'ㅚ si pronuncia sempre "we", mai "oi"!',
      },
      {
        written: '시계',
        spoken: '시게',
        romanization: 'shi-ge',
        meaning: 'Orologio',
        note: '계 in seconda sillaba si semplifica in "ge"',
      },
      {
        written: '희망',
        spoken: '히망',
        romanization: 'hi-mang',
        meaning: 'Speranza',
        note: 'ㅢ dopo consonante ㅎ perde ㅡ e diventa "i"',
      },
      {
        written: '우리의 집',
        spoken: '우리에 집',
        romanization: 'u-ri-e jip',
        meaning: 'La nostra casa',
        note: 'La particella di possesso 의 ("di") si legge "e"',
      },
    ],
  },
];

export interface EarQuizItem {
  id: string;
  mode: 'minimal_pairs' | 'exceptions' | 'all_letters';
  promptSpeak: string;
  promptHint: string;
  correctOption: string;
  options: {
    label: string;
    sublabel: string;
  }[];
  teacherFeedback: string;
}

export const EAR_QUIZ_ITEMS: EarQuizItem[] = [
  {
    id: 'mp-1',
    mode: 'minimal_pairs',
    promptSpeak: '가',
    promptHint: 'Ascolta con attenzione: c’è soffio d’aria o tensione?',
    correctOption: '가',
    options: [
      { label: '가', sublabel: 'ㄱ morbida/leggera (ga)' },
      { label: '카', sublabel: 'ㅋ con forte soffio (ka)' },
      { label: '까', sublabel: 'ㄲ tesa senza aria (kka)' },
    ],
    teacherFeedback:
      'Era 가 (ㄱ)! Suona dolce e leggera, senza il forte sbuffo d’aria di 카 (ㅋ) né la tensione stretta in gola di 까 (ㄲ).',
  },
  {
    id: 'mp-2',
    mode: 'minimal_pairs',
    promptSpeak: '카',
    promptHint: 'Senti lo sbuffo d’aria che uscirebbe sulla mano?',
    correctOption: '카',
    options: [
      { label: '가', sublabel: 'ㄱ morbida (ga)' },
      { label: '카', sublabel: 'ㅋ aspirata (ka)' },
      { label: '까', sublabel: 'ㄲ tesa (kka)' },
    ],
    teacherFeedback:
      'Era 카 (ㅋ)! La barretta dentro la lettera ricorda il soffio d’aria potente che muove un foglio davanti alla bocca.',
  },
  {
    id: 'mp-3',
    mode: 'minimal_pairs',
    promptSpeak: '까',
    promptHint: 'Ascolta la consonante iniziale: è compatta e scattante?',
    correctOption: '까',
    options: [
      { label: '가', sublabel: 'ㄱ morbida (ga)' },
      { label: '카', sublabel: 'ㅋ aspirata (ka)' },
      { label: '까', sublabel: 'ㄲ tesa (kka)' },
    ],
    teacherFeedback:
      'Era 까 (ㄲ)! Le due gemelle trattengono il fiato un attimo in gola e scattano con un suono secco senza aria.',
  },
  {
    id: 'mp-4',
    mode: 'minimal_pairs',
    promptSpeak: '어',
    promptHint: 'Fai attenzione alla forma delle labbra: aperte rilassate o a cerchio?',
    correctOption: '어',
    options: [
      { label: '어', sublabel: 'ㅓ aperta rilassata (eo)' },
      { label: '오', sublabel: 'ㅗ rotonda chiusa (o)' },
      { label: '우', sublabel: 'ㅜ stretta (u)' },
    ],
    teacherFeedback:
      'Era 어 (ㅓ)! La "o" aperta con labbra rilassate. 오 (ㅗ) invece è più chiusa e rotonda con le labbra a bacio.',
  },
  {
    id: 'mp-5',
    mode: 'minimal_pairs',
    promptSpeak: '오',
    promptHint: 'Ascolta bene il colore della vocale: il sole sopra la terra!',
    correctOption: '오',
    options: [
      { label: '어', sublabel: 'ㅓ aperta rilassata (eo)' },
      { label: '오', sublabel: 'ㅗ rotonda chiusa (o)' },
      { label: '으', sublabel: 'ㅡ piatta sorridente (eu)' },
    ],
    teacherFeedback:
      'Era 오 (ㅗ)! Suono tondo e raccolto, fatto arrotondando bene le labbra in avanti.',
  },
  {
    id: 'mp-6',
    mode: 'minimal_pairs',
    promptSpeak: '타',
    promptHint: 'Confronta i tre gradi di T/D: morbida, aspirata o tesa?',
    correctOption: '타',
    options: [
      { label: '다', sublabel: 'ㄷ morbida (da/ta)' },
      { label: '타', sublabel: 'ㅌ con soffio (ta)' },
      { label: '따', sublabel: 'ㄸ tesa (tta)' },
    ],
    teacherFeedback:
      'Era 타 (ㅌ)! I tre gradini della E ci ricordano di soffiare tanta aria dopo il tocco della lingua.',
  },
  {
    id: 'mp-7',
    mode: 'minimal_pairs',
    promptSpeak: '싸',
    promptHint: 'Scegli tra S dolce/ariosa e S forte italiana!',
    correctOption: '싸',
    options: [
      { label: '사', sublabel: 'ㅅ dolce ariosa (sa)' },
      { label: '싸', sublabel: 'ㅆ forte e netta (ssa)' },
      { label: '자', sublabel: 'ㅈ dolce (ja)' },
    ],
    teacherFeedback:
      'Era 싸 (ㅆ)! È la S forte e brillante identica alla nostra "s" di "sasso", molto più energica di 사.',
  },
  {
    id: 'mp-8',
    mode: 'minimal_pairs',
    promptSpeak: '파',
    promptHint: 'Ascolta le labbra: quanto soffio d’aria esce?',
    correctOption: '파',
    options: [
      { label: '바', sublabel: 'ㅂ morbida (ba/pa)' },
      { label: '파', sublabel: 'ㅍ esplosiva con soffio (pa)' },
      { label: '빠', sublabel: 'ㅃ tesa senza aria (ppa)' },
    ],
    teacherFeedback:
      'Era 파 (ㅍ)! Le colonne del tempio fanno uscire un forte soffio d’aria dalle labbra.',
  },
  {
    id: 'ex-1',
    mode: 'exceptions',
    promptSpeak: '같이',
    promptHint: 'Senti "ga-chi": quale parola coreana si scrive in modo diverso da come suona?',
    correctOption: '같이',
    options: [
      { label: '같이', sublabel: 'Palatalizzazione (ㅌ + 이 → 치)' },
      { label: '가티', sublabel: 'Scrittura fonetica letterale' },
      { label: '가지', sublabel: 'Melanzana / Ramo (ga-ji)' },
    ],
    teacherFeedback:
      'Bravissimo! Si pronuncia [가치] ma si scrive 같이 ("insieme"): quando ㅌ incontra 이 diventa sempre "chi"!',
  },
  {
    id: 'ex-2',
    mode: 'exceptions',
    promptSpeak: '합니다',
    promptHint: 'Ascolta la nasale "ham-ni-da": qual è la grafia corretta?',
    correctOption: '합니다',
    options: [
      { label: '함니다', sublabel: 'Grafia sbagliata (solo fonetica)' },
      { label: '합니다', sublabel: 'Nasalizzazione (ㅂ + ㄴ → ㅁ + ㄴ)' },
      { label: '합미다', sublabel: 'Scrittura inventata' },
    ],
    teacherFeedback:
      'Esatto, si scrive 합니다! La ㅂ in fondo a 합 incontra ㄴ e si trasforma magicamente in "m" all’orecchio!',
  },
  {
    id: 'ex-3',
    mode: 'exceptions',
    promptSpeak: '한국어',
    promptHint: 'Senti "han-gu-geo": ricorda la regola del Ponte Sonoro (Liaison)!',
    correctOption: '한국어',
    options: [
      { label: '한국어', sublabel: 'Liaison: ㄱ salta su 어' },
      { label: '한구거', sublabel: 'Solo trascrizione della pronuncia' },
      { label: '한극어', sublabel: 'Vocale errata' },
    ],
    teacherFeedback:
      'Perfetto! Si scrive 한국어 ("lingua coreana"), ma grazie al Ponte Sonoro la ㄱ di 국 salta sul cerchietto muto 어 e si legge [한구거]!',
  },
  {
    id: 'ex-4',
    mode: 'exceptions',
    promptSpeak: '좋다',
    promptHint: 'Senti "jo-ta": la ㅎ si è fusa con la consonante successiva!',
    correctOption: '좋다',
    options: [
      { label: '조타', sublabel: 'Solo pronuncia' },
      { label: '좋다', sublabel: 'Aspirazione (ㅎ + ㄷ → ㅌ)' },
      { label: '졷다', sublabel: 'Batchim errato' },
    ],
    teacherFeedback:
      'Esatto, 좋다 ("essere buono")! Quando ㅎ abbraccia ㄷ, le regala tutto il soffio facendola suonare come ㅌ [조타]!',
  },
  {
    id: 'ex-5',
    mode: 'exceptions',
    promptSpeak: '시간',
    promptHint: 'Senti "shi-gan": ricorda la vocale trasformatrice ㅣ!',
    correctOption: '시간',
    options: [
      { label: '시간', sublabel: 'ㅅ + ㅣ si legge sempre "shi"' },
      { label: '시깐', sublabel: 'Doppia consonante errata' },
      { label: '치간', sublabel: 'Suono errato' },
    ],
    teacherFeedback:
      'Bravissimo! Si scrive 시간 ("tempo/ora"): davanti a ㅣ, la ㅅ si ammorbidisce sempre in "shi"!',
  },
  {
    id: 'ex-6',
    mode: 'exceptions',
    promptSpeak: '외국',
    promptHint: 'Senti "we-guk": ricorda la trappola di ㅗ + ㅣ!',
    correctOption: '외국',
    options: [
      { label: '외국', sublabel: '외 si legge "we" (mai "oi")' },
      { label: '오국', sublabel: 'Vocale semplice ㅗ' },
      { label: '위국', sublabel: 'Vocale ㅟ (wi)' },
    ],
    teacherFeedback:
      'Ottimo orecchio! 외국 ("paese estero") usa ㅚ che nel coreano moderno si pronuncia sempre "we"!',
  },
];
