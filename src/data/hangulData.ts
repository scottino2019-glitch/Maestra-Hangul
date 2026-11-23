export type ModuleId =
  | 'vowels_basic'
  | 'consonants_basic'
  | 'consonants_double'
  | 'vowels_compound';

export interface LetterException {
  title: string;
  position: string;
  rule: string;
  exampleWord: string;
  exampleReading: string;
  exampleMeaning: string;
}

export interface LetterExample {
  word: string;
  reading: string;
  meaning: string;
  syllableNote: string;
}

export interface HangulLetter {
  id: string;
  char: string;
  nameKo: string;
  speakSyllable: string;
  romanization: string;
  italianApprox: string;
  category: ModuleId;
  lessonNumber: number;
  teacherSpeech: string;
  mouthTip: string;
  mnemonicTitle: string;
  mnemonicStory: string;
  strokes: string[];
  exceptions: LetterException[];
  examples: LetterExample[];
  quickCombos: string[];
}

export interface LessonModule {
  id: ModuleId;
  number: string;
  title: string;
  subtitle: string;
  imagePath: string;
  teacherIntro: string;
}

export const LESSON_MODULES: LessonModule[] = [
  {
    id: 'vowels_basic',
    number: '01',
    title: 'Vocali Semplici',
    subtitle: '10 vocali fondamentali · Cielo, Terra e Persona',
    imagePath: '/src/assets/images/mnemonic_vowels_sky_1795460621637.jpg',
    teacherIntro:
      'Iniziamo come fanno i bambini in Corea: dal sole che sorge, dalla linea piatta della terra e da una persona in piedi. Ogni lineetta indica la direzione della voce!',
  },
  {
    id: 'consonants_basic',
    number: '02',
    title: 'Consonanti Base',
    subtitle: '14 forme della bocca · Lingua, labbra e gola',
    imagePath: '/src/assets/images/mnemonic_consonants_basic_1795460620101.jpg',
    teacherIntro:
      'Le consonanti coreane non sono disegni casuali: re Sejong ha disegnato la forma esatta della lingua, dei denti e delle labbra quando pronunci il suono!',
  },
  {
    id: 'consonants_double',
    number: '03',
    title: 'Consonanti Doppie',
    subtitle: '5 suoni tesi (Ssang-jaeum) · Energia senza soffio',
    imagePath: '/src/assets/images/mnemonic_double_tense_1795460624653.jpg',
    teacherIntro:
      'Quando vedi due lettere gemelle vicine, trattieni un istante il fiato in gola e poi lascia uscire un suono secco, forte e deciso, senza aria davanti alla mano!',
  },
  {
    id: 'vowels_compound',
    number: '04',
    title: 'Vocali Composte',
    subtitle: '11 dittonghi e combinazioni · Unioni di suoni',
    imagePath: '/src/assets/images/mnemonic_exceptions_bridge_1795460622180.jpg',
    teacherIntro:
      'Mettiamo insieme due vocali che già conosciamo per creare suoni nuovi. Qui scopriremo anche quali vocali oggi si pronunciano uguali e le 4 regole speciali di ㅢ!',
  },
];

export const HANGUL_LETTERS: HangulLetter[] = [
  // ==================== 01. VOCALI SEMPLICI (10) ====================
  {
    id: 'a',
    char: 'ㅏ',
    nameKo: '아',
    speakSyllable: '아',
    romanization: 'a',
    italianApprox: 'Come la "a" aperta di "mare" o "casa"',
    category: 'vowels_basic',
    lessonNumber: 1,
    teacherSpeech:
      'Eccoci alla prima lettera del nostro viaggio! Guarda la linea verticale: è una persona in piedi che guarda verso destra, dove sorge il sole del mattino. Quando vede la luce, apre bene la bocca e dice: "Aaa!"',
    mouthTip: 'Apri la bocca in modo naturale e rilassato, tenendo la lingua bassa e piatta.',
    mnemonicTitle: 'Il Sole ad Est',
    mnemonicStory:
      'La stanghetta punta a destra (Est, dove nasce il sole): apri la bocca grande di stupore e pronuncia "A"!',
    strokes: ['M 44 16 L 44 84', 'M 44 49 L 74 49'],
    exceptions: [
      {
        title: 'Non si scrive mai da sola',
        position: 'Inizio sillaba',
        rule: 'In coreano una vocale non può stare nuda all’inizio di una sillaba: bisogna sempre mettere il cerchietto muto ㅇ davanti, così si scrive 아.',
        exampleWord: '아기',
        exampleReading: 'a-gi',
        exampleMeaning: 'Bambino piccolo / bebè',
      },
    ],
    examples: [
      { word: '아기', reading: 'a-gi', meaning: 'Bebè', syllableNote: '아 (a) + 기 (gi)' },
      { word: '사과', reading: 'sa-gwa', meaning: 'Mela', syllableNote: '사 (sa) + 과 (gwa)' },
      { word: '바나나', reading: 'ba-na-na', meaning: 'Banana', syllableNote: '바 (ba) + 나 (na) + 나 (na)' },
    ],
    quickCombos: ['아', '가', '나', '다', '마', '사'],
  },
  {
    id: 'ya',
    char: 'ㅑ',
    nameKo: '야',
    speakSyllable: '야',
    romanization: 'ya',
    italianApprox: 'Come "ia" rapida in "piano" o "ia-ia-o"',
    category: 'vowels_basic',
    lessonNumber: 2,
    teacherSpeech:
      'Vedi la nostra "ㅏ"? Ora ha DUE lineette verso destra! In coreano, ogni volta che aggiungi una seconda stanghetta a una vocale base, stai aggiungendo una piccola "i" veloce davanti al suono. Così "a" diventa subito "ya"!',
    mouthTip: 'Parti con la lingua alta come per dire "i", poi scivola subito sulla "a" aperta in un solo colpo.',
    mnemonicTitle: 'Due Raggi di Sole',
    mnemonicStory:
      'Due lineette verso destra = il doppio di energia! Aggiungi una "i" guizzante davanti alla "a": YA!',
    strokes: ['M 42 16 L 42 84', 'M 42 38 L 72 38', 'M 42 60 L 72 60'],
    exceptions: [
      {
        title: 'Sillaba unica, non due vocali separate',
        position: 'In qualsiasi parola',
        rule: 'Non pronunciare "i-a" staccato in due battiti: è un solo suono fluido e veloce, come in "piatto".',
        exampleWord: '야구',
        exampleReading: 'ya-gu',
        exampleMeaning: 'Baseball',
      },
    ],
    examples: [
      { word: '야구', reading: 'ya-gu', meaning: 'Baseball', syllableNote: '야 (ya) + 구 (gu)' },
      { word: '야채', reading: 'ya-chae', meaning: 'Verdure', syllableNote: '야 (ya) + 채 (chae)' },
      { word: '하얀색', reading: 'ha-yan-saek', meaning: 'Colore bianco', syllableNote: '하 (ha) + 얀 (yan) + 색 (saek)' },
    ],
    quickCombos: ['야', '갸', '냐', '샤', '쟈', '햐'],
  },
  {
    id: 'eo',
    char: 'ㅓ',
    nameKo: '어',
    speakSyllable: '어',
    romanization: 'eo',
    italianApprox: 'Una "o" molto aperta e rilassata (come in "porta"), senza arrotondare le labbra!',
    category: 'vowels_basic',
    lessonNumber: 3,
    teacherSpeech:
      'Attenzione, questa è la lettera più importante per non avere accento straniero! La stanghetta punta a sinistra. Per pronunciarla bene, apri la bocca come per dire "a", ma tira leggermente indietro la lingua per dire "o" SENZA fare il bacino con le labbra!',
    mouthTip: 'Labbra rilassate e ovali (NON a cerchietto), bocca leggermente aperta, suono che viene dal centro della gola.',
    mnemonicTitle: 'Guarda Indietro: Oh!',
    mnemonicStory:
      'La freccetta guarda a sinistra, verso chi ci chiama alle spalle. Ti giri sorpreso con la bocca rilassata: "Eo?!"',
    strokes: ['M 30 49 L 58 49', 'M 58 16 L 58 84'],
    exceptions: [
      {
        title: 'Differenza fondamentale tra ㅓ e ㅗ',
        position: 'Sempre',
        rule: 'In italiano abbiamo una sola lettera "o", ma in coreano ㅓ (labbra rilassate, aperta) e ㅗ (labbra strette a cerchio) cambiano completamente il significato delle parole!',
        exampleWord: '어머니',
        exampleReading: 'eo-meo-ni',
        exampleMeaning: 'Mamma (con labbra rilassate)',
      },
    ],
    examples: [
      { word: '어머니', reading: 'eo-meo-ni', meaning: 'Mamma', syllableNote: '어 (eo) + 머 (meo) + 니 (ni)' },
      { word: '버스', reading: 'beo-seu', meaning: 'Autobus', syllableNote: '버 (beo) + 스 (seu)' },
      { word: '서울', reading: 'seo-ul', meaning: 'Seoul', syllableNote: '서 (seo) + 울 (ul)' },
    ],
    quickCombos: ['어', '거', '너', '더', '머', '서'],
  },
  {
    id: 'yeo',
    char: 'ㅕ',
    nameKo: '여',
    speakSyllable: '여',
    romanization: 'yeo',
    italianApprox: 'Una "i" rapida seguita dalla "o" aperta rilassata (io aperto)',
    category: 'vowels_basic',
    lessonNumber: 4,
    teacherSpeech:
      'Usiamo il nostro trucco magico! Vedi la "ㅓ" con due trattini verso sinistra? Aggiungiamo una "i" veloce davanti alla "eo" rilassata e otteniamo "yeo"!',
    mouthTip: 'Inizia con la "i" sorridente e apri subito verso la "o" rilassata senza arrotondare le labbra.',
    mnemonicTitle: 'Doppia Sorpresa a Sinistra',
    mnemonicStory:
      'Due lineette a sinistra della persona: "i" + "eo" = YEO, come la volpe coreana "Yeou"!',
    strokes: ['M 28 38 L 58 38', 'M 28 60 L 58 60', 'M 58 16 L 58 84'],
    exceptions: [
      {
        title: 'Non chiudere le labbra in ㅛ',
        position: 'Sempre',
        rule: 'Ricorda di mantenere le labbra rilassate sul finale: se arrotondi le labbra diventa ㅛ (yo) e cambi parola!',
        exampleWord: '여우',
        exampleReading: 'yeo-u',
        exampleMeaning: 'Volpe',
      },
    ],
    examples: [
      { word: '여우', reading: 'yeo-u', meaning: 'Volpe', syllableNote: '여 (yeo) + 우 (u)' },
      { word: '별', reading: 'byeol', meaning: 'Stella', syllableNote: 'ㅂ + ㅕ + ㄹ (sillaba unica)' },
      { word: '여름', reading: 'yeo-reum', meaning: 'Estate', syllableNote: '여 (yeo) + 름 (reum)' },
    ],
    quickCombos: ['여', '겨', '녀', '며', '벼', '혀'],
  },
  {
    id: 'o',
    char: 'ㅗ',
    nameKo: '오',
    speakSyllable: '오',
    romanization: 'o',
    italianApprox: 'Come una "o" ben chiusa e rotonda (come in "sole")',
    category: 'vowels_basic',
    lessonNumber: 5,
    teacherSpeech:
      'Guarda come cambia il disegno: la linea lunga è sdraiata piatta, come la Terra, e un piccolo raggio di sole spunta SOPRA l’orizzonte. Fai un bel cerchietto stretto con le labbra e soffia una "O" rotonda e dolce!',
    mouthTip: 'Arrotonda bene le labbra in avanti come se stessi per fischiare o mandare un bacio.',
    mnemonicTitle: 'Il Sole Sopra la Terra',
    mnemonicStory:
      'Il trattino sale verso il cielo sopra la linea della terra: bocca tonda a cerchietto, suono chiaro "O"!',
    strokes: ['M 50 32 L 50 62', 'M 18 62 L 82 62'],
    exceptions: [
      {
        title: 'Posizione grafica nella sillaba',
        position: 'Dopo una consonante',
        rule: 'Le vocali verticali (ㅏ, ㅓ, ㅣ) si mettono a DESTRA della consonante (가), mentre le vocali orizzontali come ㅗ si mettono SOTTO la consonante (고)!',
        exampleWord: '오리',
        exampleReading: 'o-ri',
        exampleMeaning: 'Anatra',
      },
    ],
    examples: [
      { word: '오리', reading: 'o-ri', meaning: 'Anatra', syllableNote: '오 (o) + 리 (ri)' },
      { word: '고양이', reading: 'go-yang-i', meaning: 'Gatto', syllableNote: '고 (go) + 양 (yang) + 이 (i)' },
      { word: '소', reading: 'so', meaning: 'Mucca', syllableNote: 'ㅅ + ㅗ (sopra/sotto)' },
    ],
    quickCombos: ['오', '고', '노', '도', '모', '소'],
  },
  {
    id: 'yo',
    char: 'ㅛ',
    nameKo: '요',
    speakSyllable: '요',
    romanization: 'yo',
    italianApprox: 'Come "io" in "fiore" con la "o" ben arrotondata',
    category: 'vowels_basic',
    lessonNumber: 6,
    teacherSpeech:
      'Ecco la sorella maggiore di ㅗ! Ha due piccoli raggi che puntano verso il cielo sopra la linea della terra. Aggiungiamo la solita "i" veloce prima della "o" tonda: "yo"!',
    mouthTip: 'Parti da "i" e subito sporgi le labbra in un piccolo cerchio per chiudere con una "o" stretta.',
    mnemonicTitle: 'Due Candeline sulla Torta',
    mnemonicStory:
      'Due trattini in piedi sulla linea orizzontale sembrano due candeline accese: soffia dolce "YO"!',
    strokes: ['M 39 30 L 39 62', 'M 61 30 L 61 62', 'M 18 62 L 82 62'],
    exceptions: [
      {
        title: 'La particella della gentilezza!',
        position: 'Fine frase',
        rule: 'Sentirai tantissimo 요 alla fine delle frasi coreane: è la sillaba magica che rende ogni frase educata e gentile!',
        exampleWord: '안녕하세요',
        exampleReading: 'an-nyeong-ha-se-yo',
        exampleMeaning: 'Ciao / Buongiorno (gentile)',
      },
    ],
    examples: [
      { word: '요리', reading: 'yo-ri', meaning: 'Cucina / cucinare', syllableNote: '요 (yo) + 리 (ri)' },
      { word: '교실', reading: 'gyo-sil', meaning: 'Aula scolastica', syllableNote: '교 (gyo) + 실 (sil)' },
      { word: '우표', reading: 'u-pyo', meaning: 'Francobollo', syllableNote: '우 (u) + 표 (pyo)' },
    ],
    quickCombos: ['요', '교', '뇨', '묘', '쇼', '효'],
  },
  {
    id: 'u',
    char: 'ㅜ',
    nameKo: '우',
    speakSyllable: '우',
    romanization: 'u',
    italianApprox: 'Come la "u" italiana di "luna"',
    category: 'vowels_basic',
    lessonNumber: 7,
    teacherSpeech:
      'Ora il trattino punta verso il BASSO, sotto la linea della terra! Immagina delle gocce di pioggia che scendono giù verso il terreno, oppure una radice che cresce sottoterra. Stringi le labbra in avanti e pronuncia "U"!',
    mouthTip: 'Labbra sporgenti e molto raccolte a tubicino, esattamente come la "u" italiana.',
    mnemonicTitle: 'Goccia Sotto la Nuvola',
    mnemonicStory:
      'La linea piatta è una nuvola e il trattino scende giù come una goccia d’acqua: Uuu!',
    strokes: ['M 18 40 L 82 40', 'M 50 40 L 50 74'],
    exceptions: [
      {
        title: 'Scrittura verticale della sillaba',
        position: 'Con consonante sopra',
        rule: 'Proprio come ㅗ, anche ㅜ si mette sempre SOTTO la consonante (구, 누, 무), mai di fianco!',
        exampleWord: '우유',
        exampleReading: 'u-yu',
        exampleMeaning: 'Latte',
      },
    ],
    examples: [
      { word: '우유', reading: 'u-yu', meaning: 'Latte', syllableNote: '우 (u) + 유 (yu)' },
      { word: '우산', reading: 'u-san', meaning: 'Ombrello', syllableNote: '우 (u) + 산 (san)' },
      { word: '구름', reading: 'gu-reum', meaning: 'Nuvola', syllableNote: '구 (gu) + 름 (reum)' },
    ],
    quickCombos: ['우', '구', '누', '두', '무', '수'],
  },
  {
    id: 'yu',
    char: 'ㅠ',
    nameKo: '유',
    speakSyllable: '유',
    romanization: 'yu',
    italianApprox: 'Come "iu" in "fiume" o "piuma"',
    category: 'vowels_basic',
    lessonNumber: 8,
    teacherSpeech:
      'Quando vedi due goccioline che scendono sotto la linea piatta, aggiungi una "i" veloce davanti alla "u" e ottieni "yu"! In Corea spesso scrivono "ㅠㅠ" nei messaggi per disegnare due occhi che piangono!',
    mouthTip: 'Sorridi per la "i" iniziale e subito sporgi le labbra strette per la "u".',
    mnemonicTitle: 'Due Lacrimucce Simpatiche',
    mnemonicStory:
      'Sembra un visino triste che fa "iuuu" con due goccioline che scendono giù!',
    strokes: ['M 18 40 L 82 40', 'M 39 40 L 39 74', 'M 61 40 L 61 74'],
    exceptions: [
      {
        title: 'Suono unico fluido',
        position: 'In qualsiasi posizione',
        rule: 'Non pronunciarla come due sillabe ("i-u"): scivola in un unico movimento veloce verso la "u".',
        exampleWord: '유리',
        exampleReading: 'yu-ri',
        exampleMeaning: 'Vetro',
      },
    ],
    examples: [
      { word: '우유', reading: 'u-yu', meaning: 'Latte', syllableNote: '우 (u) + 유 (yu)' },
      { word: '유리', reading: 'yu-ri', meaning: 'Vetro', syllableNote: '유 (yu) + 리 (ri)' },
      { word: '뉴스', reading: 'nyu-seu', meaning: 'Notizie / Telegiornale', syllableNote: '뉴 (nyu) + 스 (seu)' },
    ],
    quickCombos: ['유', '규', '뉴', '뮤', '슈', '휴'],
  },
  {
    id: 'eu',
    char: 'ㅡ',
    nameKo: '으',
    speakSyllable: '으',
    romanization: 'eu',
    italianApprox: 'Non esiste in italiano! Sembra un "uh" pronunciato sorridendo coi denti vicini',
    category: 'vowels_basic',
    lessonNumber: 9,
    teacherSpeech:
      'Fermati un secondo su questa linea dritta e piatta: è la Terra! Per dirla come un vero coreano, fai un grande sorriso orizzontale tenendo gli angoli della bocca tirati indietro, quasi a denti chiusi, e fai uscire un suono piatto dalla gola: "eu"!',
    mouthTip: 'Tira gli angoli della bocca lateralmente come una linea piatta (NON arrotondare MAI le labbra come per "u"!).',
    mnemonicTitle: 'La Linea dell’Orizzonte',
    mnemonicStory:
      'La bocca diventa piatta e dritta esattamente come questa linea orizzontale: tira i lati e dì "EU"!',
    strokes: ['M 16 50 L 84 50'],
    exceptions: [
      {
        title: 'La vocale "cuscinetto" delle parole straniere',
        position: 'Prestiti linguistici',
        rule: 'Quando il coreano adatta parole inglesi o italiane con due consonanti vicine (come "bus" o "ice cream"), inserisce ㅡ come cuscinetto leggero: 버스 (beo-seu), 아이스크림 (a-i-seu-keu-rim)!',
        exampleWord: '크리스마스',
        exampleReading: 'keu-ri-seu-ma-seu',
        exampleMeaning: 'Natale',
      },
    ],
    examples: [
      { word: '으르렁', reading: 'eu-reu-reong', meaning: 'Ringhio', syllableNote: '으 (eu) + 르 (reu) + 렁 (reong)' },
      { word: '그림', reading: 'geu-rim', meaning: 'Disegno / Quadro', syllableNote: '그 (geu) + 림 (rim)' },
      { word: '하늘', reading: 'ha-neul', meaning: 'Cielo', syllableNote: '하 (ha) + 늘 (neul)' },
    ],
    quickCombos: ['으', '그', '느', '드', '므', '스'],
  },
  {
    id: 'i',
    char: 'ㅣ',
    nameKo: '이',
    speakSyllable: '이',
    romanization: 'i',
    italianApprox: 'Esattamente come la "i" italiana di "riso"',
    category: 'vowels_basic',
    lessonNumber: 10,
    teacherSpeech:
      'L’ultima delle 10 vocali base è la più elegante: una persona dritta in piedi tra Cielo e Terra! Si pronuncia esattamente come la nostra "i" italiana, chiara e sorridente.',
    mouthTip: 'Angoli della bocca leggermente tirati in un sorriso, lingua alta verso il palato.',
    mnemonicTitle: 'La Persona in Piedi',
    mnemonicStory:
      'Dritta come un bastoncino o una persona in piedi che sorride felice: "Iii!"',
    strokes: ['M 50 14 L 50 86'],
    exceptions: [
      {
        title: 'Effetto trasformatore su ㅅ e ㄷ/ㅌ',
        position: 'Dopo ㅅ, ㅆ, ㄷ, ㅌ',
        rule: 'La vocale ㅣ è molto potente! Quando sta dopo ㅅ la trasforma in "sci" (시 = shi, non si!). E alla fine di parola dopo ㄷ/ㅌ in batchim, li trasforma in "gi/ci" (같이 → 가치)!',
        exampleWord: '시간',
        exampleReading: 'shi-gan',
        exampleMeaning: 'Tempo / Ora (시 si legge "shi"!)',
      },
    ],
    examples: [
      { word: '이', reading: 'i', meaning: 'Dente / Numero due', syllableNote: 'ㅇ muto + ㅣ (i)' },
      { word: '기차', reading: 'gi-cha', meaning: 'Treno', syllableNote: '기 (gi) + 차 (cha)' },
      { word: '비', reading: 'bi', meaning: 'Pioggia', syllableNote: 'ㅂ + ㅣ (bi)' },
    ],
    quickCombos: ['이', '기', '니', '미', '시', '지'],
  },

  // ==================== 02. CONSONANTI BASE (14) ====================
  {
    id: 'g',
    char: 'ㄱ',
    nameKo: '기역',
    speakSyllable: '가',
    romanization: 'g / k',
    italianApprox: 'A metà tra "c" dura di "casa" e "g" dolce di "gatto"',
    category: 'consonants_basic',
    lessonNumber: 11,
    teacherSpeech:
      'Benvenuti alle consonanti! Il re Sejong disegnò ㄱ guardando la lingua vista di lato mentre si alza dietro per toccare il velo del palato. All’inizio della parola suona più secca (quasi una K leggera senza soffio), ma in mezzo a due vocali diventa morbida come una G di "gatto"!',
    mouthTip: 'Alza la parte posteriore della lingua contro il palato molle, poi rilascia senza spingere troppa aria.',
    mnemonicTitle: 'Il Gancio o Falce (Giyeok)',
    mnemonicStory:
      'Sembra una pistola giocattolo o un gancio curvo appeso al muro: "G-G-Gancio!"',
    strokes: ['M 24 26 L 76 26 L 76 80'],
    exceptions: [
      {
        title: 'Suono secco all’inizio, morbido in mezzo',
        position: 'Inizio parola vs tra vocali',
        rule: 'All’inizio (가구) la prima ㄱ è quasi "k" leggera (ka), mentre la seconda ㄱ tra due vocali diventa "g" dolce (gu) → "ka-gu"!',
        exampleWord: '가구',
        exampleReading: 'ka-gu',
        exampleMeaning: 'Mobili',
      },
      {
        title: 'Suono stoppato in Batchim (fondo sillaba)',
        position: 'Batchim finale',
        rule: 'Quando ㄱ sta sotto la sillaba (es. 책), blocchi la lingua sul palato ma NON fai uscire l’aria finale: resta una "k" muta trattenuta!',
        exampleWord: '책',
        exampleReading: 'chaek (k bloccata)',
        exampleMeaning: 'Libro',
      },
      {
        title: 'Si trasforma in "ng" davanti a ㄴ/ㅁ',
        position: 'Prima di ㄴ o ㅁ',
        rule: 'Per comodità della lingua, ㄱ prima di ㄴ o ㅁ diventa nasale [ㅇ / ng]!',
        exampleWord: '한국말',
        exampleReading: 'han-gung-mal',
        exampleMeaning: 'Lingua coreana',
      },
    ],
    examples: [
      { word: '가방', reading: 'ka-bang', meaning: 'Zaino / Borsa', syllableNote: '가 (ka) + 방 (bang)' },
      { word: '고기', reading: 'ko-gi', meaning: 'Carne', syllableNote: '고 (ko) + 기 (gi)' },
      { word: '수박', reading: 'su-bak', meaning: 'Anguria', syllableNote: '수 (su) + 박 (bak trattenuto)' },
    ],
    quickCombos: ['가', '거', '고', '구', '그', '기'],
  },
  {
    id: 'n',
    char: 'ㄴ',
    nameKo: '니은',
    speakSyllable: '나',
    romanization: 'n',
    italianApprox: 'Esattamente come la "n" italiana di "naso"',
    category: 'consonants_basic',
    lessonNumber: 12,
    teacherSpeech:
      'Ecco il compagno perfetto di ㄱ, ma ribaltato! Disegna la punta della tua lingua che tocca gli alveoli dietro i denti superiori. È facilissima perché si legge quasi sempre esattamente come la nostra "N" di "naso"!',
    mouthTip: 'Appoggia la punta della lingua dietro gli incisivi superiori e lascia vibrare l’aria dal naso.',
    mnemonicTitle: 'Il Naso di Profilo (Nieun)',
    mnemonicStory:
      'Guarda bene la forma: sembra un naso disegnato di profilo! "N" come Naso!',
    strokes: ['M 28 24 L 28 76 L 78 76'],
    exceptions: [
      {
        title: 'Quando incontra ㄹ diventa "L"!',
        position: 'Accanto a ㄹ',
        rule: 'Attenzione: se ㄴ si trova subito prima o dopo ㄹ, non riesci a dirle insieme velocemente, così si trasformano tutte e due in una bella "L" doppia!',
        exampleWord: '신라',
        exampleReading: 'shil-la',
        exampleMeaning: 'Antico regno di Silla',
      },
    ],
    examples: [
      { word: '나무', reading: 'na-mu', meaning: 'Albero', syllableNote: '나 (na) + 무 (mu)' },
      { word: '나비', reading: 'na-bi', meaning: 'Farfalla', syllableNote: '나 (na) + 비 (bi)' },
      { word: '눈', reading: 'nun', meaning: 'Occhio / Neve', syllableNote: 'ㄴ + ㅜ + ㄴ' },
    ],
    quickCombos: ['나', '너', '노', '누', '느', '니'],
  },
  {
    id: 'd',
    char: 'ㄷ',
    nameKo: '디귿',
    speakSyllable: '다',
    romanization: 'd / t',
    italianApprox: 'A metà tra "t" dolce senza aria e "d" di "dado"',
    category: 'consonants_basic',
    lessonNumber: 13,
    teacherSpeech:
      'Aggiungendo un tetto sopra ㄴ otteniamo ㄷ! Il tetto significa che chiudi completamente l’aria con la lingua prima di rilasciarla. A inizio parola ricorda una "t" morbida senza soffio; tra due vocali invece suona esattamente come la nostra "d"!',
    mouthTip: 'Premi la punta della lingua dietro i denti superiori bloccando l’aria, poi rilascia con dolcezza.',
    mnemonicTitle: 'La Porta Chiusa (Digeut)',
    mnemonicStory:
      'Sembra una porta o una finestra aperta su un lato, come una grande lettera "D" squadrata!',
    strokes: ['M 26 24 L 74 24', 'M 26 24 L 26 76 L 76 76'],
    exceptions: [
      {
        title: 'All’inizio è più "t", in mezzo è "d"',
        position: 'Inizio vs tra vocali',
        rule: 'In 다리 (ponte/gamba) la prima sillaba suona leggermente sorda (ta-ri), mentre in 바다 (mare) la ㄷ tra due vocali diventa sonora: "ba-da"!',
        exampleWord: '바다',
        exampleReading: 'ba-da',
        exampleMeaning: 'Mare',
      },
      {
        title: 'Quando incontra 이 (이) diventa "ㅈ"!',
        position: 'Batchim prima di 이',
        rule: 'Se ㄷ finale si trova prima del suffisso 이, si palatalizza e si legge come una "g" dolce di gelato!',
        exampleWord: '굳이',
        exampleReading: 'gu-ji',
        exampleMeaning: 'Apposta / Proprio',
      },
    ],
    examples: [
      { word: '다리', reading: 'ta-ri', meaning: 'Ponte / Gamba', syllableNote: '다 (ta) + 리 (ri)' },
      { word: '바다', reading: 'ba-da', meaning: 'Mare', syllableNote: '바 (ba) + 다 (da)' },
      { word: '포도', reading: 'po-do', meaning: 'Uva', syllableNote: '포 (po) + 도 (do)' },
    ],
    quickCombos: ['다', '더', '도', '두', '드', '디'],
  },
  {
    id: 'r',
    char: 'ㄹ',
    nameKo: '리을',
    speakSyllable: '라',
    romanization: 'r / l',
    italianApprox: 'Un tocco veloce tra "r" e "l" all’inizio; "l" piena alla fine (Batchim)',
    category: 'consonants_basic',
    lessonNumber: 14,
    teacherSpeech:
      'Questa lettera è sinuosa come un serpentello o un fiume! E la sua pronuncia è proprio doppia come una curva: quando sta SOPRA o tra due vocali, tocca il palato una sola volta veloce (come la R leggera di "caro"); ma quando sta SOTTO in fondo alla sillaba (Batchim), diventa una L bella piena!',
    mouthTip: 'Per la R coreana dai un colpetto leggero e singolo con la lingua sul palato (mai arrotolata forte come in italiano). Per la L finale appoggia la lingua ferma.',
    mnemonicTitle: 'Il Serpente o Fiume (Rieul)',
    mnemonicStory:
      'Serpeggia come una strada a zig-zag o un serpente: R-R-Rattlesnake / L-L-Lungo!',
    strokes: ['M 24 22 L 74 22 L 74 48 L 26 48 L 26 78 L 76 78'],
    exceptions: [
      {
        title: 'Cambia suono tra inizio e Batchim!',
        position: 'Inizio vs Finale',
        rule: 'Regola d’oro: ㄹ + vocale = "r" leggera (라 = ra); vocale + ㄹ sotto = "l" piena (발 = bal)! Se ci sono due ㄹ di fila tra sillabe (몰라), si legge "mol-la" (doppia L)!',
        exampleWord: '달',
        exampleReading: 'dal',
        exampleMeaning: 'Luna (finisce con L piena!)',
      },
      {
        title: 'All’inizio delle parole straniere',
        position: 'Inizio parola',
        rule: 'In coreano puro poche parole iniziano con ㄹ, ma nei prestiti sì (es. 라디오 = ra-di-o). Non far vibrare la R forte all’italiana, basta un colpetto!',
        exampleWord: '라면',
        exampleReading: 'ra-myeon',
        exampleMeaning: 'Ramen',
      },
    ],
    examples: [
      { word: '라면', reading: 'ra-myeon', meaning: 'Ramen / Noodles', syllableNote: '라 (ra) + 면 (myeon)' },
      { word: '오리', reading: 'o-ri', meaning: 'Anatra', syllableNote: '오 (o) + 리 (ri)' },
      { word: '물', reading: 'mul', meaning: 'Acqua', syllableNote: 'ㅁ + ㅜ + ㄹ (L finale)' },
    ],
    quickCombos: ['라', '러', '로', '루', '르', '리'],
  },
  {
    id: 'm',
    char: 'ㅁ',
    nameKo: '미음',
    speakSyllable: '마',
    romanization: 'm',
    italianApprox: 'Esattamente come la "m" italiana di "mamma"',
    category: 'consonants_basic',
    lessonNumber: 15,
    teacherSpeech:
      'Guarda questo quadratino perfetto: è la bocca chiusa vista di fronte! Quando chiudi bene entrambe le labbra e fai uscire il suono dal naso, esce una "M" dolcissima. Non ha eccezioni strane: si legge sempre M!',
    mouthTip: 'Chiudi delicatamente entrambe le labbra e fai risuonare la voce nel naso.',
    mnemonicTitle: 'La Bocca Quadrata (Mieum)',
    mnemonicStory:
      'Una bocca quadrata che si apre per mangiare una mela: "M-M-Mamma!"',
    strokes: ['M 26 24 L 26 76', 'M 26 24 L 74 24 L 74 76', 'M 26 76 L 74 76'],
    exceptions: [
      {
        title: 'Nessuna eccezione nascosta!',
        position: 'Ovunque',
        rule: 'ㅁ è la consonante più fedele del coreano: che sia all’inizio, in mezzo o in Batchim (엄마, 김치, 밤), suona sempre come una chiara "m"!',
        exampleWord: '엄마',
        exampleReading: 'eom-ma',
        exampleMeaning: 'Mamma',
      },
    ],
    examples: [
      { word: '모자', reading: 'mo-ja', meaning: 'Cappello', syllableNote: '모 (mo) + 자 (ja)' },
      { word: '마음', reading: 'ma-eum', meaning: 'Cuore / Animo', syllableNote: '마 (ma) + 음 (eum)' },
      { word: '김밥', reading: 'gim-bap', meaning: 'Gimbap (riso arrotolato)', syllableNote: '김 (gim) + 밥 (bap)' },
    ],
    quickCombos: ['마', '머', '모', '무', '므', '미'],
  },
  {
    id: 'b',
    char: 'ㅂ',
    nameKo: '비읍',
    speakSyllable: '바',
    romanization: 'b / p',
    italianApprox: 'Tra "p" morbida senza soffio e "b" di "barca"',
    category: 'consonants_basic',
    lessonNumber: 16,
    teacherSpeech:
      'Vedi il nostro quadratino della bocca ㅁ? Qui ha due corna o due braccia che vanno in su, come un bicchiere pieno d’acqua! All’inizio della parola sembra una "p" leggera (senza sputare aria), mentre in mezzo alle vocali diventa una bella "b" sonora!',
    mouthTip: 'Chiudi le labbra e poi aprile di colpo con pochissima aria.',
    mnemonicTitle: 'Il Bicchiere d’Acqua (Bieup)',
    mnemonicStory:
      'Sembra un secchiello o un bicchiere mezzo pieno (B-B-Bicchiere)!',
    strokes: ['M 26 20 L 26 78', 'M 74 20 L 74 78', 'M 26 50 L 74 50', 'M 26 78 L 74 78'],
    exceptions: [
      {
        title: 'Inizio = P morbida, tra vocali = B',
        position: 'Inizio vs mezzo',
        rule: 'In 바보 (sciocco), la prima ㅂ è più sorda (pa) e la seconda tra vocali è una B piena (bo) → "pa-bo"!',
        exampleWord: '바보',
        exampleReading: 'pa-bo',
        exampleMeaning: 'Sciocchino',
      },
      {
        title: 'Diventa "M" davanti a ㄴ/ㅁ!',
        position: 'Prima di ㄴ o ㅁ',
        rule: 'Ecco l’eccezione più celebre del coreano: in 합니다, la ㅂ finale incontra 니 (ㄴ) e si trasforma magicamente in M! Si legge [함니다]!',
        exampleWord: '감사합니다',
        exampleReading: 'gam-sa-ham-ni-da',
        exampleMeaning: 'Grazie mille (si legge ham-ni-da!)',
      },
    ],
    examples: [
      { word: '바다', reading: 'ba-da', meaning: 'Mare', syllableNote: '바 (ba) + 다 (da)' },
      { word: '나비', reading: 'na-bi', meaning: 'Farfalla', syllableNote: '나 (na) + 비 (bi)' },
      { word: '밥', reading: 'bap', meaning: 'Riso cotto / Pasto', syllableNote: 'ㅂ + ㅏ + ㅂ (p bloccata)' },
    ],
    quickCombos: ['바', '버', '보', '부', '브', '비'],
  },
  {
    id: 's',
    char: 'ㅅ',
    nameKo: '시옷',
    speakSyllable: '사',
    romanization: 's / sh / t',
    italianApprox: 'S dolce soffice (come in "sole"); diventa "SC" prima di ㅣ!',
    category: 'consonants_basic',
    lessonNumber: 17,
    teacherSpeech:
      'Guarda questo disegno appuntito: rappresenta i denti visti di lato oppure una montagna! La ㅅ coreana non è affilata e dura come la nostra "s" di "sasso": è più dolce e ariosa, quasi sussurrata. Ma attento alle sue due grandi eccezioni!',
    mouthTip: 'Avvicina la lingua ai denti inferiori lasciando passare un filo d’aria morbido e leggero.',
    mnemonicTitle: 'La Montagna o Tenda (Shiot)',
    mnemonicStory:
      'Sembra la cima di una montagna o una persona che cammina in salita: "S-S-Salita!"',
    strokes: ['M 50 20 L 22 78', 'M 47 46 L 78 78'],
    exceptions: [
      {
        title: 'Diventa "SH" (SC) davanti a ㅣ, ㅑ, ㅕ, ㅛ, ㅠ!',
        position: 'Prima di vocali con "i"',
        rule: 'Quando ㅅ incontra ㅣ (o qualsiasi vocale che inizia con y: ㅑ, ㅕ, ㅛ, ㅠ, ㅟ), si pronuncia "SC" di "sciarpa"! Mai dire "si" duro!',
        exampleWord: '시계',
        exampleReading: 'shi-gye',
        exampleMeaning: 'Orologio (si legge "shi-gye"!)',
      },
      {
        title: 'In Batchim si legge "T" bloccata!',
        position: 'Fondo sillaba (Batchim)',
        rule: 'Quando ㅅ sta in fondo alla sillaba (es. 옷, 빗), NON sibila più: la lingua tocca i denti e blocca l’aria diventando una "t" muta! Ma se dopo c’è una vocale (옷이), salta avanti e torna "s/sh" [오시]!',
        exampleWord: '옷',
        exampleReading: 'ot (t bloccata)',
        exampleMeaning: 'Vestito',
      },
    ],
    examples: [
      { word: '사과', reading: 'sa-gwa', meaning: 'Mela', syllableNote: '사 (sa) + 과 (gwa)' },
      { word: '시간', reading: 'shi-gan', meaning: 'Tempo / Ora', syllableNote: '시 (shi!) + 간 (gan)' },
      { word: '수박', reading: 'su-bak', meaning: 'Anguria', syllableNote: '수 (su) + 박 (bak)' },
    ],
    quickCombos: ['사', '서', '소', '수', '스', '시'],
  },
  {
    id: 'ng',
    char: 'ㅇ',
    nameKo: '이응',
    speakSyllable: '아',
    romanization: '- / ng',
    italianApprox: 'MUTO all’inizio della sillaba · Suono nasale "NG" in fondo (Batchim)',
    category: 'consonants_basic',
    lessonNumber: 18,
    teacherSpeech:
      'Ecco la lettera camaleonte dell’alfabeto coreano! Il cerchietto rappresenta la gola aperta vista da dentro. Ha due personalità opposte: quando sta ALL’INIZIO (sopra o a sinistra), è completamente MUTO — serve solo a reggere la vocale! Ma quando scende SOTTO (in Batchim), suona come la "ng" di "gong" o "sing"!',
    mouthTip: 'In Batchim, appoggia il dorso della lingua sul palato molle (come per dire G) ma lascia uscire la voce dal naso.',
    mnemonicTitle: 'Il Cerchio Camaleonte (Ieung)',
    mnemonicStory:
      'All’inizio è uno zero vuoto (0 = nessun suono!). In fondo diventa un tamburo che risuona: "NG-GONG!"',
    strokes: ['M 50 22 A 28 28 0 1 0 49.9 22 Z'],
    exceptions: [
      {
        title: 'Muto sopra/sinistra vs "NG" sotto!',
        position: 'Inizio vs Batchim',
        rule: 'In 아기 la ㅇ iniziale non si legge (è solo "a-gi"). In 방 invece, la prima consonante è ㅂ e la ㅇ è in fondo, quindi si legge "bang"!',
        exampleWord: '강아지',
        exampleReading: 'gang-a-ji',
        exampleMeaning: 'Cucciolo di cane',
      },
    ],
    examples: [
      { word: '아이', reading: 'a-i', meaning: 'Bambino', syllableNote: '아 (a) + 이 (i) — entrambe ㅇ mute' },
      { word: '강', reading: 'gang', meaning: 'Fiume', syllableNote: 'ㄱ + ㅏ + ㅇ (ng finale)' },
      { word: '고양이', reading: 'go-yang-i', meaning: 'Gatto', syllableNote: '양 (yang) + 이 (i muta)' },
    ],
    quickCombos: ['아', '앙', '잉', '옹', '웅', '영'],
  },
  {
    id: 'j',
    char: 'ㅈ',
    nameKo: '지읒',
    speakSyllable: '자',
    romanization: 'j / ch',
    italianApprox: 'Tra "c" dolce di "ciao" (senza aria) e "g" dolce di "gelato"',
    category: 'consonants_basic',
    lessonNumber: 19,
    teacherSpeech:
      'Vedi la montagna ㅅ? Se ci metti un cappellino orizzontale sopra, ottieni ㅈ! Proprio come ㄱ e ㄷ, all’inizio della parola suona più sorda (una "c" dolce di "ciao" ma trattenuta), mentre tra due vocali diventa morbida come la "g" di "gioco"!',
    mouthTip: 'Appoggia la parte centrale della lingua al palato duro e rilascia dolce senza soffiare aria.',
    mnemonicTitle: 'La Montagna col Cappello (Jieut)',
    mnemonicStory:
      'ㅅ si è messa un cappello piatto in testa per ripararsi dalla pioggia: "G-G-Giro!"',
    strokes: ['M 22 24 L 78 24', 'M 50 24 L 22 78', 'M 48 48 L 78 78'],
    exceptions: [
      {
        title: 'Suono diverso tra inizio e centro',
        position: 'Inizio vs tra vocali',
        rule: 'In 자주 (spesso) la prima è più simile a "cia" morbido, la seconda tra vocali è "giu" di "giubbotto"!',
        exampleWord: '모자',
        exampleReading: 'mo-ja',
        exampleMeaning: 'Cappello',
      },
      {
        title: 'In Batchim diventa "T" bloccata!',
        position: 'Fondo sillaba',
        rule: 'Anche ㅈ quando cade sotto in fondo alla sillaba (es. 낮 = giorno) perde la dolcezza e si neutralizza in una "t" bloccata [낟]!',
        exampleWord: '낮',
        exampleReading: 'nat',
        exampleMeaning: 'Giorno (opposto di notte)',
      },
    ],
    examples: [
      { word: '자동차', reading: 'ja-dong-cha', meaning: 'Automobile', syllableNote: '자 (ja) + 동 (dong) + 차 (cha)' },
      { word: '사자', reading: 'sa-ja', meaning: 'Leone', syllableNote: '사 (sa) + 자 (ja)' },
      { word: '모자', reading: 'mo-ja', meaning: 'Cappello', syllableNote: '모 (mo) + 자 (ja)' },
    ],
    quickCombos: ['자', '저', '조', '주', '즈', '지'],
  },
  {
    id: 'ch',
    char: 'ㅊ',
    nameKo: '치읓',
    speakSyllable: '차',
    romanization: 'ch',
    italianApprox: 'Come "c" dolce di "ciao" ma con un FORTE soffio d’aria!',
    category: 'consonants_basic',
    lessonNumber: 20,
    teacherSpeech:
      'Ecco un trucco meraviglioso del re Sejong: quando vedi una lineetta in più aggiunta sopra una consonante, significa SOFFIO D’ARIA (aspirazione)! Metti una mano davanti alla bocca: mentre pronunci ㅈ non devi sentire aria, ma quando pronunci ㅊ devi sentire un bel soffio caldo sul palmo: "CHAA!"',
    mouthTip: 'Come ㅈ, ma spingi fuori con forza un soffio d’aria dai polmoni nel momento in cui stacchi la lingua.',
    mnemonicTitle: 'Il Cappello con la Piuma (Chieut)',
    mnemonicStory:
      'Ha una piuma sopra il cappello di ㅈ che svolazza quando soffi forte: "CH-CH-Ciao!"',
    strokes: ['M 50 12 L 50 24', 'M 22 26 L 78 26', 'M 50 26 L 22 78', 'M 48 50 L 78 78'],
    exceptions: [
      {
        title: 'In Batchim diventa sempre "T" bloccata',
        position: 'Fondo sillaba',
        rule: 'In fondo alla sillaba non si può soffiare aria, quindi 꽃 (fiore) si legge [꼳] con "t" bloccata! Ma se segue una vocale (꽃이), il soffio torna: [꼬치]!',
        exampleWord: '꽃',
        exampleReading: 'kkot (t bloccata)',
        exampleMeaning: 'Fiore',
      },
    ],
    examples: [
      { word: '치즈', reading: 'chi-jeu', meaning: 'Formaggio', syllableNote: '치 (chi) + 즈 (jeu)' },
      { word: '기차', reading: 'gi-cha', meaning: 'Treno', syllableNote: '기 (gi) + 차 (cha)' },
      { word: '친구', reading: 'chin-gu', meaning: 'Amico', syllableNote: '친 (chin) + 구 (gu)' },
    ],
    quickCombos: ['차', '처', '초', '추', '츠', '치'],
  },
  {
    id: 'k',
    char: 'ㅋ',
    nameKo: '키읔',
    speakSyllable: '카',
    romanization: 'k',
    italianApprox: 'Come una "K / C dura" esplosiva con tanto soffio d’aria',
    category: 'consonants_basic',
    lessonNumber: 21,
    teacherSpeech:
      'Riconosci la forma di ㄱ? Ora c’è una barretta orizzontale in mezzo! È la sorella aspirata di ㄱ: immagina un foglio di carta davanti alla bocca — quando dici 카 (ka), il foglio deve muoversi per lo sbuffo d’aria!',
    mouthTip: 'Blocca l’aria dietro con la lingua e poi esplodi con un forte soffio: K-ha!',
    mnemonicTitle: 'La Chiave Aspirata (Kieuk)',
    mnemonicStory:
      'La ㄱ ha messo una barra extra come una chiave dentata: K-K-Key! (E in chat si scrive ㅋㅋㅋ per ridere: ke-ke-ke!)',
    strokes: ['M 24 24 L 76 24 L 76 78', 'M 26 50 L 76 50'],
    exceptions: [
      {
        title: 'In Batchim perde l’aria (suona come ㄱ)',
        position: 'Fondo sillaba',
        rule: 'In fondo a una sillaba (es. 부엌 = cucina), non puoi rilasciare il soffio d’aria, quindi ㅋ si legge esattamente come una ㄱ bloccata [부억]!',
        exampleWord: '부엌',
        exampleReading: 'bu-eok',
        exampleMeaning: 'Cucina',
      },
    ],
    examples: [
      { word: '코', reading: 'ko', meaning: 'Naso', syllableNote: 'ㅋ + ㅗ (ko aspirato)' },
      { word: '카메라', reading: 'ka-me-ra', meaning: 'Fotocamera', syllableNote: '카 (ka) + 메 (me) + 라 (ra)' },
      { word: '키위', reading: 'ki-wi', meaning: 'Kiwi', syllableNote: '키 (ki) + 위 (wi)' },
    ],
    quickCombos: ['카', '커', '코', '쿠', '크', '키'],
  },
  {
    id: 't',
    char: 'ㅌ',
    nameKo: '티읕',
    speakSyllable: '타',
    romanization: 't',
    italianApprox: 'Come una "T" italiana con un forte soffio d’aria (t-ha)',
    category: 'consonants_basic',
    lessonNumber: 22,
    teacherSpeech:
      'Vedi la forma della lettera E maiuscola? È la nostra ㄷ con una stanghetta in più nel mezzo! Quella barra ci ricorda subito di aggiungere un forte sbuffo d’aria mentre stacchiamo la lingua dai denti: "T-HA!"',
    mouthTip: 'Premi la punta della lingua contro i denti superiori e rilascia con uno sbuffo d’aria deciso.',
    mnemonicTitle: 'La Scala o Doppia E (Tieut)',
    mnemonicStory:
      'Sembra una lettera E o tre gradini dritti: T-T-Torre che sbuffa aria!',
    strokes: ['M 26 24 L 74 24', 'M 26 50 L 70 50', 'M 26 24 L 26 76 L 76 76'],
    exceptions: [
      {
        title: 'Quando incontra 이 (이) diventa "ㅊ"!',
        position: 'Batchim prima di 이',
        rule: 'Eccezione famosissima! Se una parola finisce con ㅌ (come 같) ed è seguita da 이, NON si dice "ga-ti", ma si fonde in "ga-chi" [가치]!',
        exampleWord: '같이',
        exampleReading: 'ga-chi',
        exampleMeaning: 'Insieme (si legge "ga-chi"!)',
      },
    ],
    examples: [
      { word: '토끼', reading: 'to-kki', meaning: 'Coniglio', syllableNote: '토 (to aspirata) + 끼 (kki)' },
      { word: '타조', reading: 'ta-jo', meaning: 'Struzzo', syllableNote: '타 (ta) + 조 (jo)' },
      { word: '토마토', reading: 'to-ma-to', meaning: 'Pomodoro', syllableNote: '토 (to) + 마 (ma) + 토 (to)' },
    ],
    quickCombos: ['타', '터', '토', '투', '트', '티'],
  },
  {
    id: 'p',
    char: 'ㅍ',
    nameKo: '피읖',
    speakSyllable: '파',
    romanization: 'p',
    italianApprox: 'Come una "P" italiana esplosiva con forte soffio d’aria (p-ha)',
    category: 'consonants_basic',
    lessonNumber: 23,
    teacherSpeech:
      'Guarda i due pilastri romani! Questa lettera ha un’energia incredibile: chiudi le labbra e poi falle esplodere come se stessi spegnendo le candeline della torta: "P-HA!" Non diventa MAI "b", resta sempre una P potente!',
    mouthTip: 'Premi le labbra una contro l’altra e rilascia con una spinta d’aria energica.',
    mnemonicTitle: 'Le Colonne del Tempio (Pieup)',
    mnemonicStory:
      'Sembra la lettera greca Pi greco (π) o le colonne di un palazzo: P-P-Palazzo!',
    strokes: ['M 20 26 L 80 26', 'M 36 26 L 36 74', 'M 64 26 L 64 74', 'M 20 74 L 80 74'],
    exceptions: [
      {
        title: 'In Batchim suona come ㅂ bloccata',
        position: 'Fondo sillaba',
        rule: 'In fondo alla sillaba (es. 앞 = davanti) le labbra restano chiuse e non esce aria [압]. Ma se segue una vocale (앞에), torna il soffio pieno [아페]!',
        exampleWord: '앞에',
        exampleReading: 'a-pe',
        exampleMeaning: 'Davanti (liaison aspirata)',
      },
    ],
    examples: [
      { word: '포도', reading: 'po-do', meaning: 'Uva', syllableNote: '포 (po aspirata) + 도 (do)' },
      { word: '피자', reading: 'pi-ja', meaning: 'Pizza', syllableNote: '피 (pi) + 자 (ja)' },
      { word: '파란색', reading: 'pa-ran-saek', meaning: 'Colore blu', syllableNote: '파 (pa) + 란 (ran) + 색 (saek)' },
    ],
    quickCombos: ['파', '퍼', '포', '푸', '프', '피'],
  },
  {
    id: 'h',
    char: 'ㅎ',
    nameKo: '히읗',
    speakSyllable: '하',
    romanization: 'h',
    italianApprox: 'Una "H" aspirata leggera (come in inglese "hello" o una risata "ha-ha")',
    category: 'consonants_basic',
    lessonNumber: 24,
    teacherSpeech:
      'Eccoci all’ultima consonante base, ed è simpaticissima! Guarda: il cerchietto ㅇ della gola ora indossa un cappello elegante con una piumetta sopra! Sbuffa aria calda dalla gola come quando ridi "Ha-ha-ha!" — ma attenzione, tra vocali diventa timida e sparisce!',
    mouthTip: 'Lascia la gola aperta e fai uscire un soffio d’aria leggero e caldo prima della vocale.',
    mnemonicTitle: 'L’Omino col Cappello che Ride (Hieut)',
    mnemonicStory:
      'Un omino buffo con un cappello a tesa larga che ride di gusto: "Ha-ha-ha!"',
    strokes: ['M 50 12 L 50 24', 'M 22 30 L 78 30', 'M 50 44 A 20 20 0 1 0 49.9 44 Z'],
    exceptions: [
      {
        title: 'Sparisce spesso tra due vocali!',
        position: 'In mezzo alle vocali',
        rule: 'Nel parlato naturale coreano, ㅎ tra due vocali (o dopo ㄴ/ㄹ/ㅁ) diventa leggerissima o quasi muta: 좋아요 si sente molto simile a [조아요]!',
        exampleWord: '좋아요',
        exampleReading: 'jo-a-yo',
        exampleMeaning: 'Va bene / Mi piace (ㅎ quasi muta)',
      },
      {
        title: 'Trasforma ㄱ, ㄷ, ㅂ, ㅈ in lettere aspirate!',
        position: 'Accanto a ㄱ/ㄷ/ㅂ/ㅈ',
        rule: 'Quando ㅎ incontra ㄱ, ㄷ, ㅂ o ㅈ, dà loro tutto il suo soffio e si fondono in ㅋ, ㅌ, ㅍ, ㅊ! Esempio celebre: 좋다 si legge [조타]!',
        exampleWord: '좋다',
        exampleReading: 'jo-ta',
        exampleMeaning: 'Essere buono (ㅎ+ㄷ → ㅌ!)',
      },
    ],
    examples: [
      { word: '하늘', reading: 'ha-neul', meaning: 'Cielo', syllableNote: '하 (ha) + 늘 (neul)' },
      { word: '호랑이', reading: 'ho-rang-i', meaning: 'Tigre', syllableNote: '호 (ho) + 랑 (rang) + 이 (i)' },
      { word: '하마', reading: 'ha-ma', meaning: 'Ippopotamo', syllableNote: '하 (ha) + 마 (ma)' },
    ],
    quickCombos: ['하', '허', '호', '후', '흐', '히'],
  },

  // ==================== 03. CONSONANTI DOPPIE (5) ====================
  {
    id: 'kk',
    char: 'ㄲ',
    nameKo: '쌍기역',
    speakSyllable: '까',
    romanization: 'kk',
    italianApprox: 'Una "C" dura (come "casa") molto tesa e secca, ZERO aria!',
    category: 'consonants_double',
    lessonNumber: 25,
    teacherSpeech:
      'Attenzione a non confonderle con le doppie italiane lunghe! In coreano ㄲ non è una consonante lunga, ma TESA. Stringi leggermente la gola, trattieni l’aria per un microsecondo e lascia scattare una C dura precisa e cristallina: "KKA!"',
    mouthTip: 'Irrigidisci la radice della lingua contro il palato senza far uscire alcun soffio d’aria.',
    mnemonicTitle: 'Due Ganci Gemelli (Ssang-giyeok)',
    mnemonicStory:
      'Due gemelli che saltano in sync: un suono compatto, elastico e senza soffio!',
    strokes: ['M 16 26 L 46 26 L 46 78', 'M 54 26 L 84 26 L 84 78'],
    exceptions: [
      {
        title: 'In Batchim suona uguale a ㄱ semplice',
        position: 'Fondo sillaba',
        rule: 'In fondo alla sillaba (es. 밖 = fuori), ㄲ suona come una ㄱ bloccata [박]. Ma se dopo c’è una vocale (밖에), torna la forza doppia [바께]!',
        exampleWord: '밖에',
        exampleReading: 'ba-kke',
        exampleMeaning: 'Fuori',
      },
    ],
    examples: [
      { word: '꼬리', reading: 'kko-ri', meaning: 'Coda', syllableNote: '꼬 (kko) + 리 (ri)' },
      { word: '토끼', reading: 'to-kki', meaning: 'Coniglio', syllableNote: '토 (to) + 끼 (kki)' },
      { word: '꽃', reading: 'kkot', meaning: 'Fiore', syllableNote: 'ㄲ + ㅗ + ㅊ' },
    ],
    quickCombos: ['까', '꺼', '꼬', '꾸', '끄', '끼'],
  },
  {
    id: 'tt',
    char: 'ㄸ',
    nameKo: '쌍디귿',
    speakSyllable: '따',
    romanization: 'tt',
    italianApprox: 'Una "T" forte e netta (come in "tutto"), senza soffio d’aria',
    category: 'consonants_double',
    lessonNumber: 26,
    teacherSpeech:
      'Metti la punta della lingua ben ferma dietro i denti, accumula un po’ di tensione e lascia scattare una "T" secca e pulita: "TTA!". Ricorda la prova della mano: non devi sentire aria uscire!',
    mouthTip: 'Punta della lingua premuta con forza dietro gli incisivi superiori, rilascio netto senza aspirazione.',
    mnemonicTitle: 'Due Porte Gemelle (Ssang-digeut)',
    mnemonicStory:
      'Due porte serrate che si aprono di scatto tutte insieme: "TTA!"',
    strokes: ['M 16 24 L 46 24', 'M 16 24 L 16 76 L 46 76', 'M 54 24 L 84 24', 'M 54 24 L 54 76 L 84 76'],
    exceptions: [
      {
        title: 'Non esiste mai in Batchim!',
        position: 'Fondo sillaba',
        rule: 'Buona notizia: ㄸ (così come ㅃ e ㅉ) non appare MAI alla fine di una sillaba coreana!',
        exampleWord: '딸기',
        exampleReading: 'ttal-gi',
        exampleMeaning: 'Fragola',
      },
    ],
    examples: [
      { word: '딸기', reading: 'ttal-gi', meaning: 'Fragola', syllableNote: '딸 (ttal) + 기 (gi)' },
      { word: '떡', reading: 'tteok', meaning: 'Tortino di riso', syllableNote: 'ㄸ + ㅓ + ㄱ' },
      { word: '따뜻하다', reading: 'tta-tteu-ta-da', meaning: 'Essere caldo/tiepido', syllableNote: '따 (tta) + 뜻 (tteut) + 하 (ha) + 다 (da)' },
    ],
    quickCombos: ['따', '떠', '또', '뚜', '뜨', '띠'],
  },
  {
    id: 'pp',
    char: 'ㅃ',
    nameKo: '쌍비읍',
    speakSyllable: '빠',
    romanization: 'pp',
    italianApprox: 'Una "P" secca e decisa (come in "pappa"), senza soffio d’aria',
    category: 'consonants_double',
    lessonNumber: 27,
    teacherSpeech:
      'Premi le labbra una contro l’altra come quando stai per fare uno schiocco: poi aprile di scatto dicendo "PPA!". È diversa da ㅂ (più morbida) e da ㅍ (che soffia aria)!',
    mouthTip: 'Labbra ben serrate con tensione prima del rilascio secco.',
    mnemonicTitle: 'Due Bicchieri Affiancati (Ssang-bieup)',
    mnemonicStory:
      'Due secchielli stretti vicini che schioccano: "P-P-Pane!" (빵 in coreano vuol dire proprio pane!)',
    strokes: [
      'M 14 22 L 14 78', 'M 44 22 L 44 78', 'M 14 50 L 44 50', 'M 14 78 L 44 78',
      'M 56 22 L 56 78', 'M 86 22 L 86 78', 'M 56 50 L 86 50', 'M 56 78 L 86 78',
    ],
    exceptions: [
      {
        title: 'Mai usata in Batchim',
        position: 'Fondo sillaba',
        rule: 'Anche ㅃ vive solo all’inizio delle sillabe; non dovrai mai preoccuparti di leggerla sotto una vocale!',
        exampleWord: '아빠',
        exampleReading: 'a-ppa',
        exampleMeaning: 'Papà',
      },
    ],
    examples: [
      { word: '아빠', reading: 'a-ppa', meaning: 'Papà', syllableNote: '아 (a) + 빠 (ppa)' },
      { word: '빵', reading: 'ppang', meaning: 'Pane', syllableNote: 'ㅃ + ㅏ + ㅇ' },
      { word: '뽀뽀', reading: 'ppo-ppo', meaning: 'Bacetto', syllableNote: '뽀 (ppo) + 뽀 (ppo)' },
    ],
    quickCombos: ['빠', '뻐', '뽀', '뿌', '쁘', '삐'],
  },
  {
    id: 'ss',
    char: 'ㅆ',
    nameKo: '쌍시옷',
    speakSyllable: '싸',
    romanization: 'ss',
    italianApprox: 'Esattamente la "S" forte e affilata di "sasso" o "sole" italiano!',
    category: 'consonants_double',
    lessonNumber: 28,
    teacherSpeech:
      'Ecco una sorpresa bellissima per noi italiani: mentre la ㅅ singola è morbida e ariosa, la doppia ㅆ è la NOSTRA vera "S" forte e decisa di "sasso"! Ma attenzione: anche lei davanti a ㅣ diventa una "SC" forte, e in fondo alla sillaba diventa "T"!',
    mouthTip: 'Tendendo la punta della lingua vicino ai denti, produci un sibilo netto e brillante.',
    mnemonicTitle: 'Due Cime Gemelle (Ssang-shiot)',
    mnemonicStory:
      'Due montagne vicine dove il vento fischia forte e chiaro: "SSS!"',
    strokes: ['M 32 22 L 14 78', 'M 30 48 L 48 78', 'M 68 22 L 50 78', 'M 66 48 L 86 78'],
    exceptions: [
      {
        title: 'In Batchim finale si legge "T" (ma scatta se c’è vocale!)',
        position: 'Batchim',
        rule: 'In 있다 (esserci), ㅆ in fondo si blocca come una "t" [읻따]; ma in 있어요 (c’è) salta subito sulla vocale dopo e fa sentire la doppia S: [이써요]!',
        exampleWord: '있어요',
        exampleReading: 'i-sseo-yo',
        exampleMeaning: 'C’è / Ho',
      },
      {
        title: 'Con ㅣ diventa "SC" forte',
        position: 'Prima di ㅣ',
        rule: 'In 씨 (seme/Signor) diventa una "sci" bella decisa [sshi]!',
        exampleWord: '아저씨',
        exampleReading: 'a-jeo-sshi',
        exampleMeaning: 'Signore',
      },
    ],
    examples: [
      { word: '쓰기', reading: 'sseu-gi', meaning: 'Scrittura', syllableNote: '쓰 (sseu) + 기 (gi)' },
      { word: '비싸요', reading: 'bi-ssa-yo', meaning: 'È costoso', syllableNote: '비 (bi) + 싸 (ssa) + 요 (yo)' },
      { word: '싸움', reading: 'ssa-um', meaning: 'Litigio', syllableNote: '싸 (ssa) + 움 (um)' },
    ],
    quickCombos: ['싸', '써', '쏘', '쑤', '쓰', '씨'],
  },
  {
    id: 'jj',
    char: 'ㅉ',
    nameKo: '쌍지읒',
    speakSyllable: '짜',
    romanization: 'jj',
    italianApprox: 'Una "C" dolce molto tesa (tra "ciao" e "z" dolce), zero aria',
    category: 'consonants_double',
    lessonNumber: 29,
    teacherSpeech:
      'L’ultima delle cinque gemelle! Premi la lingua contro il palato duro e falla scattare con forza compatta senza soffiare aria: "JJA!". Sentirai che suono brillante e croccante!',
    mouthTip: 'Lingua ben premuta contro il palato, rilascio secco e teso senza aspirazione.',
    mnemonicTitle: 'Due Cappelli Gemelli (Ssang-jieut)',
    mnemonicStory:
      'Due fratellini col cappello piatto che saltano insieme: "JJA!"',
    strokes: [
      'M 14 26 L 46 26', 'M 30 26 L 14 78', 'M 28 50 L 46 78',
      'M 54 26 L 86 26', 'M 70 26 L 54 78', 'M 68 50 L 86 78',
    ],
    exceptions: [
      {
        title: 'Non esiste in Batchim',
        position: 'Fondo sillaba',
        rule: 'Anche ㅉ non appare mai sotto la sillaba come consonante finale!',
        exampleWord: '짜장면',
        exampleReading: 'jja-jang-myeon',
        exampleMeaning: 'Spaghetti in salsa nera',
      },
    ],
    examples: [
      { word: '짜요', reading: 'jja-yo', meaning: 'È salato', syllableNote: '짜 (jja) + 요 (yo)' },
      { word: '찌개', reading: 'jji-gae', meaning: 'Stufato coreano', syllableNote: '찌 (jji) + 개 (gae)' },
      { word: '쪽지', reading: 'jjok-ji', meaning: 'Bigliettino', syllableNote: '쪽 (jjok) + 지 (ji)' },
    ],
    quickCombos: ['짜', '쩌', '쪼', '쭈', '쯔', '찌'],
  },

  // ==================== 04. VOCALI COMPOSTE (11) ====================
  {
    id: 'ae',
    char: 'ㅐ',
    nameKo: '애',
    speakSyllable: '애',
    romanization: 'ae',
    italianApprox: 'Come la "E" aperta di "festa" o "caffè"',
    category: 'vowels_compound',
    lessonNumber: 30,
    teacherSpeech:
      'Guarda come nascono le vocali composte: prendi ㅏ ("a") e uniscila a ㅣ ("i")! Un tempo suonava come "ai", ma nel coreano moderno si fonde in una bella "E" aperta di "festa"!',
    mouthTip: 'Apri la bocca un po’ più larga di una normale E italiana e pronuncia una "e" aperta.',
    mnemonicTitle: 'A + I fanno una E aperta',
    mnemonicStory:
      'La lettera sembra proprio una "H" stretta! Ricorda: ㅏ + ㅣ = "E" aperta!',
    strokes: ['M 36 16 L 36 84', 'M 36 50 L 60 50', 'M 62 16 L 62 84'],
    exceptions: [
      {
        title: 'Nel parlato moderno suona quasi uguale a ㅔ!',
        position: 'Sempre',
        rule: 'Ecco il segreto che ogni insegnante rivela: oggi quasi tutti i coreani pronunciano ㅐ ed ㅔ praticamente nello stesso identico modo (una "e")! Quindi bisogna memorizzare come si scrivono le parole.',
        exampleWord: '개',
        exampleReading: 'gae',
        exampleMeaning: 'Cane (si scrive con ㅐ, distinto da 게 = granchio)',
      },
    ],
    examples: [
      { word: '개', reading: 'gae', meaning: 'Cane', syllableNote: 'ㄱ + ㅐ' },
      { word: '개구리', reading: 'gae-gu-ri', meaning: 'Rana', syllableNote: '개 (gae) + 구 (gu) + 리 (ri)' },
      { word: '사과', reading: 'sa-gwa', meaning: 'Mela (confronto)', syllableNote: 'Confronta con 배 (bae = pera)' },
    ],
    quickCombos: ['애', '개', '내', '배', '새', '해'],
  },
  {
    id: 'yae',
    char: 'ㅒ',
    nameKo: '얘',
    speakSyllable: '얘',
    romanization: 'yae',
    italianApprox: 'Come "ie" aperta in "ieri"',
    category: 'vowels_compound',
    lessonNumber: 31,
    teacherSpeech:
      'Prendiamo la nostra ㅐ e aggiungiamo un secondo trattino nel mezzo: così diventa ㅒ! Si legge "ye" (come "ie" di "ieri"), ed è piuttosto rara ma utilissima per dire "questo bambino / questa storia"!',
    mouthTip: 'Parti da "i" veloce e apri verso una "e" aperta.',
    mnemonicTitle: 'H con Doppio Ponte',
    mnemonicStory:
      'Due ponticelli tra le due linee verticali: aggiungi la "i" davanti e dici "YE"!',
    strokes: ['M 36 16 L 36 84', 'M 36 38 L 62 38', 'M 36 60 L 62 60', 'M 62 16 L 62 84'],
    exceptions: [
      {
        title: 'Quasi identica a ㅖ nel parlato',
        position: 'Sempre',
        rule: 'Proprio come ㅐ e ㅔ, oggi ㅒ suona identica a ㅖ ("ye"). Si usa in pochissime parole famose come 얘기 (storia/chiacchiera)!',
        exampleWord: '얘기',
        exampleReading: 'yae-gi',
        exampleMeaning: 'Storia / Chiacchierata',
      },
    ],
    examples: [
      { word: '얘기', reading: 'yae-gi', meaning: 'Storia / Racconto', syllableNote: '얘 (yae) + 기 (gi)' },
      { word: '얘', reading: 'yae', meaning: 'Questo ragazzo/a (colloquiale)', syllableNote: 'ㅇ + ㅒ' },
      { word: '걔', reading: 'gyae', meaning: 'Quel ragazzo/a lì', syllableNote: 'ㄱ + ㅒ' },
    ],
    quickCombos: ['얘', '걔', '냬', '섀', '쟤', '햬'],
  },
  {
    id: 'e',
    char: 'ㅔ',
    nameKo: '에',
    speakSyllable: '에',
    romanization: 'e',
    italianApprox: 'Come la "e" chiusa italiana di "mela" o "pera"',
    category: 'vowels_compound',
    lessonNumber: 32,
    teacherSpeech:
      'Questa è formata da ㅓ + ㅣ! Mentre in ㅐ la stanghetta sta dentro, qui la stanghetta guarda verso sinistra (fuori). Si legge "e" esattamente come la nostra vocale italiana!',
    mouthTip: 'Bocca moderatamente aperta, esattamente come la normale "e" italiana.',
    mnemonicTitle: 'Freccetta a Sinistra + Bastoncino',
    mnemonicStory:
      'ㅓ + ㅣ = "E" normale e chiara, come "elefante"!',
    strokes: ['M 24 50 L 48 50', 'M 48 16 L 48 84', 'M 68 16 L 68 84'],
    exceptions: [
      {
        title: 'Suono uguale a ㅐ ma scrittura diversa',
        position: 'Sempre',
        rule: 'In coreano moderno 에 (e) e 애 (ae) si sentono praticamente uguali, ma cambiare lettera cambia significato: 게 = granchio, 개 = cane!',
        exampleWord: '게',
        exampleReading: 'ge',
        exampleMeaning: 'Granchio (distinto da 개 = cane)',
      },
    ],
    examples: [
      { word: '네', reading: 'ne', meaning: 'Sì', syllableNote: 'ㄴ + ㅔ' },
      { word: '세계', reading: 'se-gye', meaning: 'Mondo', syllableNote: '세 (se) + 계 (gye)' },
      { word: '레몬', reading: 're-mon', meaning: 'Limone', syllableNote: '레 (re) + 몬 (mon)' },
    ],
    quickCombos: ['에', '게', '네', '세', '메', '헤'],
  },
  {
    id: 'ye',
    char: 'ㅖ',
    nameKo: '예',
    speakSyllable: '예',
    romanization: 'ye',
    italianApprox: 'Come "ie" in "piede" (ma spesso dopo consonante si legge solo "e"!)',
    category: 'vowels_compound',
    lessonNumber: 33,
    teacherSpeech:
      'Ecco ㅕ + ㅣ: si legge "ye" (come "ie" in "piede")! Ma attenzione: ha un trucco speciale nel parlato quotidiano quando si trova dopo una consonante!',
    mouthTip: 'Inizia da "i" veloce e passa subito a una "e" chiara.',
    mnemonicTitle: 'Due Stanghette + Bastoncino',
    mnemonicStory:
      'ㅕ + ㅣ = YE! È la sillaba usata per dire "예" (Sì formale) ed "예쁘다" (Bello/a)!',
    strokes: ['M 24 38 L 48 38', 'M 24 60 L 48 60', 'M 48 16 L 48 84', 'M 68 16 L 68 84'],
    exceptions: [
      {
        title: 'Dopo una consonante (tranne ㅇ/ㄹ) si legge spesso "E"!',
        position: 'Dopo consonanti come ㄱ, ㅅ, ㅎ, ㅍ',
        rule: 'Eccezione d’oro da vero madrelingua: in 시계 (orologio) o 세계 (mondo) o 지혜 (saggezza), la sillaba con ㅖ si pronuncia quasi sempre senza la "y", cioè [시게], [세게], [지헤]!',
        exampleWord: '시계',
        exampleReading: 'shi-gye → spesso shi-ge',
        exampleMeaning: 'Orologio',
      },
    ],
    examples: [
      { word: '예', reading: 'ye', meaning: 'Sì (formale) / Esempio', syllableNote: 'ㅇ + ㅖ' },
      { word: '예쁘다', reading: 'ye-ppeu-da', meaning: 'Essere carino/bello', syllableNote: '예 (ye) + 쁘 (ppeu) + 다 (da)' },
      { word: '시계', reading: 'shi-gye / shi-ge', meaning: 'Orologio', syllableNote: '시 (shi) + 계 (gye/ge)' },
    ],
    quickCombos: ['예', '계', '녜', '셰', '폐', '혜'],
  },
  {
    id: 'wa',
    char: 'ㅘ',
    nameKo: '와',
    speakSyllable: '와',
    romanization: 'wa',
    italianApprox: 'Come "ua" in "guanto" o "acqua"',
    category: 'vowels_compound',
    lessonNumber: 34,
    teacherSpeech:
      'Guarda che logica perfetta: metti sotto la "ㅗ" (o tonda) e a destra la "ㅏ" (a aperta). Se le pronunci una dopo l’altra velocemente ("o-a!"), nasce subito "WA"!',
    mouthTip: 'Parti con le labbra strette a cerchio per ㅗ e aprile di colpo per ㅏ: WA!',
    mnemonicTitle: 'O + A = Meraviglia "WA!"',
    mnemonicStory:
      'ㅗ abbraccia ㅏ: quando vedi una cosa bellissima esclami proprio "와! (Wa!)"',
    strokes: ['M 36 30 L 36 62', 'M 14 62 L 56 62', 'M 64 18 L 64 84', 'M 64 50 L 86 50'],
    exceptions: [
      {
        title: 'Armonia delle vocali (Yang + Yang)',
        position: 'Sempre',
        rule: 'In coreano ㅗ (luminosa) sposa sempre ㅏ (luminosa), mai ㅓ! Così ㅘ è facilissima da ricordare perché guarda in alto e a destra.',
        exampleWord: '사과',
        exampleReading: 'sa-gwa',
        exampleMeaning: 'Mela',
      },
    ],
    examples: [
      { word: '사과', reading: 'sa-gwa', meaning: 'Mela / Scusa', syllableNote: '사 (sa) + 과 (gwa)' },
      { word: '과자', reading: 'gwa-ja', meaning: 'Biscotto / Snack', syllableNote: '과 (gwa) + 자 (ja)' },
      { word: '화요일', reading: 'hwa-yo-il', meaning: 'Martedì', syllableNote: '화 (hwa) + 요 (yo) + 일 (il)' },
    ],
    quickCombos: ['와', '과', '놔', '봐', '솨', '화'],
  },
  {
    id: 'wae',
    char: 'ㅙ',
    nameKo: '왜',
    speakSyllable: '왜',
    romanization: 'wae',
    italianApprox: 'Come "ue" in "guerra" o "quello"',
    category: 'vowels_compound',
    lessonNumber: 35,
    teacherSpeech:
      'Uniamo ㅗ ("o") con ㅐ ("e" aperta): mettendole insieme veloci otteniamo "WAE", esattamente come "ue" di "quello"! Ed è proprio la parola coreana per chiedere "Perché?!" (왜?)',
    mouthTip: 'Cerchietto piccolo iniziale e subito apertura verso una "e" chiara.',
    mnemonicTitle: 'Perché?! (왜)',
    mnemonicStory:
      'Quando un bambino curioso chiede sempre "왜? 왜?" (Perché? Perché?), usa proprio questa vocale!',
    strokes: ['M 32 30 L 32 62', 'M 12 62 L 50 62', 'M 56 18 L 56 84', 'M 56 50 L 76 50', 'M 78 18 L 78 84'],
    exceptions: [
      {
        title: 'Suona quasi uguale a ㅚ e ㅞ!',
        position: 'Coreano moderno',
        rule: 'Grande notizia per l’orecchio: nel coreano parlato di oggi, ㅙ, ㅚ e ㅞ si pronunciano tutte e tre "we" (ue)! La differenza sta solo nell’ortografia.',
        exampleWord: '돼지',
        exampleReading: 'dwae-ji',
        exampleMeaning: 'Maialino',
      },
    ],
    examples: [
      { word: '왜', reading: 'wae', meaning: 'Perché?', syllableNote: 'ㅇ + ㅙ' },
      { word: '돼지', reading: 'dwae-ji', meaning: 'Maiale', syllableNote: '돼 (dwae) + 지 (ji)' },
      { word: '괜찮아요', reading: 'gwaen-cha-na-yo', meaning: 'Va tutto bene', syllableNote: '괜 (gwaen) + 찬 (cha) + 아 (a) + 요 (yo)' },
    ],
    quickCombos: ['왜', '괘', '돼', '쇄', '좨', '홰'],
  },
  {
    id: 'oe',
    char: 'ㅚ',
    nameKo: '외',
    speakSyllable: '외',
    romanization: 'oe / we',
    italianApprox: 'Come "ue" in "quercia"',
    category: 'vowels_compound',
    lessonNumber: 36,
    teacherSpeech:
      'Guarda l’aspetto di ㅚ: è formata da ㅗ ("o") + ㅣ ("i"). Potresti pensare che si legga "oi", MA ATTENZIONE: questa è una famosa eccezione del coreano moderno! Oggi non si dice "oi", ma si legge "WE" (ue), esattamente come ㅙ e ㅞ!',
    mouthTip: 'Parti arrotondato e scivola veloce sulla "e" chiara ("ue"). Non dire mai "oi"!',
    mnemonicTitle: 'La Trappola di O + I → WE!',
    mnemonicStory:
      'Sembra O + I, ma nella bocca coreana si è trasformata in "WE" (come "ue" di questo)!',
    strokes: ['M 38 30 L 38 62', 'M 14 62 L 58 62', 'M 68 18 L 68 84'],
    exceptions: [
      {
        title: 'NON leggerla "oi"!',
        position: 'Sempre',
        rule: 'È l’errore numero 1 di chi inizia: 외국인 (straniero) NON è "oi-guk-in", ma [웨구긴] "we-gu-gin"!',
        exampleWord: '외국인',
        exampleReading: 'we-gu-gin',
        exampleMeaning: 'Straniero (mai dire "oi"!)',
      },
    ],
    examples: [
      { word: '외국', reading: 'we-guk', meaning: 'Estero / Paese straniero', syllableNote: '외 (we) + 국 (guk)' },
      { word: '왼쪽', reading: 'wen-jjok', meaning: 'Lato sinistro', syllableNote: '왼 (wen) + 쪽 (jjok)' },
      { word: '회사', reading: 'hwe-sa', meaning: 'Azienda / Ufficio', syllableNote: '회 (hwe) + 사 (sa)' },
    ],
    quickCombos: ['외', '괴', '뇌', '되', '쇠', '회'],
  },
  {
    id: 'wo',
    char: 'ㅝ',
    nameKo: '워',
    speakSyllable: '워',
    romanization: 'wo',
    italianApprox: 'Come "uo" di "uomo" con la "o" aperta rilassata',
    category: 'vowels_compound',
    lessonNumber: 37,
    teacherSpeech:
      'Ecco la compagna ombrosa di ㅘ: unisce ㅜ ("u") sotto e ㅓ ("o" aperta) a destra. Dille insieme in un solo respiro: "u" + "eo" = "WO"!',
    mouthTip: 'Parti con labbra strette per ㅜ e apri rilassato verso ㅓ senza chiudere il finale.',
    mnemonicTitle: 'U + Eo = WO!',
    mnemonicStory:
      'La pioggia ㅜ incontra ㅓ a sinistra: insieme fanno "WO", come in "고마워요" (Grazie)!',
    strokes: ['M 14 38 L 56 38', 'M 36 38 L 36 74', 'M 50 56 L 70 56', 'M 70 18 L 70 84'],
    exceptions: [
      {
        title: 'Armonia delle vocali (Yin + Yin)',
        position: 'Sempre',
        rule: 'ㅜ punta in giù e ㅓ punta a sinistra: si sposano sempre tra di loro (mai ㅜ con ㅏ)!',
        exampleWord: '고마워요',
        exampleReading: 'go-ma-wo-yo',
        exampleMeaning: 'Grazie (amichevole)',
      },
    ],
    examples: [
      { word: '고마워요', reading: 'go-ma-wo-yo', meaning: 'Grazie', syllableNote: '고 (go) + 마 (ma) + 워 (wo) + 요 (yo)' },
      { word: '원숭이', reading: 'won-sung-i', meaning: 'Scimmia', syllableNote: '원 (won) + 숭 (sung) + 이 (i)' },
      { word: '더워요', reading: 'deo-wo-yo', meaning: 'Fa caldo', syllableNote: '더 (deo) + 워 (wo) + 요 (yo)' },
    ],
    quickCombos: ['워', '궈', '눠', '뭐', '줘', '훠'],
  },
  {
    id: 'we',
    char: 'ㅞ',
    nameKo: '웨',
    speakSyllable: '웨',
    romanization: 'we',
    italianApprox: 'Come "ue" in "quello"',
    category: 'vowels_compound',
    lessonNumber: 38,
    teacherSpeech:
      'Uniamo ㅜ ("u") ed ㅔ ("e"): il suono è proprio identico a quello scritto! "U" + "E" = "WE". Si usa moltissimo nelle parole moderne prese dall’inglese come "wedding" o "sweater"!',
    mouthTip: 'Parti dalla "u" raccolta e apri subito su una "e" chiara.',
    mnemonicTitle: 'U + E = WE naturale',
    mnemonicStory:
      'La più intuitiva del gruppo delle tre gemelle (ㅙ, ㅚ, ㅞ): si legge proprio "u-e"!',
    strokes: ['M 12 38 L 48 38', 'M 30 38 L 30 74', 'M 44 54 L 62 54', 'M 62 18 L 62 84', 'M 80 18 L 80 84'],
    exceptions: [
      {
        title: 'Terza gemella di ㅙ e ㅚ',
        position: 'Sempre',
        rule: 'ㅙ, ㅚ e ㅞ suonano oggi uguali ("we"). ㅞ è la forma preferita per scrivere parole straniere come 웨이터 (cameriere) o 스웨터 (maglione)!',
        exampleWord: '스웨터',
        exampleReading: 'seu-we-teo',
        exampleMeaning: 'Maglione',
      },
    ],
    examples: [
      { word: '웨딩', reading: 'we-ding', meaning: 'Matrimonio (wedding)', syllableNote: '웨 (we) + 딩 (ding)' },
      { word: '스웨터', reading: 'seu-we-teo', meaning: 'Maglione', syllableNote: '스 (seu) + 웨 (we) + 터 (teo)' },
      { word: '웬일', reading: 'wen-il', meaning: 'Che succede? / Come mai?', syllableNote: '웬 (wen) + 일 (il)' },
    ],
    quickCombos: ['웨', '궤', '눼', '쉐', '줴', '훼'],
  },
  {
    id: 'wi',
    char: 'ㅟ',
    nameKo: '위',
    speakSyllable: '위',
    romanization: 'wi',
    italianApprox: 'Come "ui" in "qui" o "pinguino"',
    category: 'vowels_compound',
    lessonNumber: 39,
    teacherSpeech:
      'Questa è facilissima e molto musicale: metti insieme ㅜ ("u") ed ㅣ ("i") e pronunciale veloci in un fiato: "WI!" (come "ui" in "pinguino")!',
    mouthTip: 'Labbra strette per "u" che si aprono subito in un sorriso per "i".',
    mnemonicTitle: 'Suono Sottile "WI!"',
    mnemonicStory:
      'ㅜ + ㅣ = "UI!" Proprio la parola coreana 위 significa "SOPRA / IN ALTO"!',
    strokes: ['M 14 38 L 58 38', 'M 36 38 L 36 74', 'M 70 18 L 70 84'],
    exceptions: [
      {
        title: 'Con ㅅ diventa "SHWI" morbido',
        position: 'Dopo ㅅ o ㅆ',
        rule: 'Quando sta dopo ㅅ (come 쉬다 = riposare), la "i" della vocale addolcisce la ㅅ in un soffice "shwi"!',
        exampleWord: '쉬어요',
        exampleReading: 'shwi-eo-yo',
        exampleMeaning: 'Si riposa / È facile',
      },
    ],
    examples: [
      { word: '위', reading: 'wi', meaning: 'Sopra / Stomaco', syllableNote: 'ㅇ + ㅟ' },
      { word: '가위', reading: 'ga-wi', meaning: 'Forbici', syllableNote: '가 (ga) + 위 (wi)' },
      { word: '다람쥐', reading: 'da-ram-jwi', meaning: 'Scoiattolo', syllableNote: '다 (da) + 람 (ram) + 쥐 (jwi)' },
    ],
    quickCombos: ['위', '귀', '뒤', '쉬', '쥐', '휘'],
  },
  {
    id: 'ui',
    char: 'ㅢ',
    nameKo: '의',
    speakSyllable: '의',
    romanization: 'ui / i / e',
    italianApprox: 'All’inizio "eu-i" veloce · Con consonante diventa "I" · Come particella diventa "E"!',
    category: 'vowels_compound',
    lessonNumber: 40,
    teacherSpeech:
      'Siamo arrivati all’ultima lettera, la numero 40 — ed è la regina delle eccezioni! È formata da ㅡ ("eu") + ㅣ ("i"). Perché è famosa? Perché cambia lettura in ben 4 situazioni diverse! Vediamole subito una per una come veri esperti.',
    mouthTip: 'Nella prima posizione, fai il sorriso piatto di ㅡ e scivola subito sulla "i": eu-i!',
    mnemonicTitle: 'La Vocale Camaleonte (4 Voci)',
    mnemonicStory:
      'ㅡ + ㅣ cambia vestito a seconda di dove si siede nella parola: all’inizio è "eui", altrove diventa "i" o "e"!',
    strokes: ['M 14 54 L 62 54', 'M 74 18 L 74 84'],
    exceptions: [
      {
        title: 'Regola 1: Prima sillaba con ㅇ → "EU-I"',
        position: 'Inizio parola (의사)',
        rule: 'Quando sta all’inizio della parola con ㅇ muto, si legge pienamente "eu-i"!',
        exampleWord: '의사',
        exampleReading: 'eui-sa',
        exampleMeaning: 'Medico / Dottore',
      },
      {
        title: 'Regola 2: Dopo una consonante → diventa "I"!',
        position: 'Con consonante (희망)',
        rule: 'Se prima di ㅢ c’è una vera consonante (come ㅎ in 희망 = speranza), il suono ㅡ cade e si legge semplicemente "I": [히망]!',
        exampleWord: '희망',
        exampleReading: 'hi-mang',
        exampleMeaning: 'Speranza (si legge hi-mang!)',
      },
      {
        title: 'Regola 3: Non all’inizio con ㅇ → spesso "I"',
        position: 'Seconda/terza sillaba (주의)',
        rule: 'Dentro una parola dopo la prima sillaba (es. 주의 = attenzione), nel parlato si semplifica spesso in "i": [주이]!',
        exampleWord: '주의',
        exampleReading: 'ju-i',
        exampleMeaning: 'Attenzione / Cautela',
      },
      {
        title: 'Regola 4: Come particella di possesso ("di") → "E"!',
        position: 'Particella grammaticale 나의',
        rule: 'Quando 의 collega due parole per indicare possesso ("di", es. 나의 책 = il libro di me / il mio libro), si legge semplicemente "E" [나에]!',
        exampleWord: '나의 친구',
        exampleReading: 'na-e chin-gu',
        exampleMeaning: 'Il mio amico (si legge na-e!)',
      },
    ],
    examples: [
      { word: '의자', reading: 'eui-ja', meaning: 'Sedia', syllableNote: '의 (eui) + 자 (ja)' },
      { word: '의사', reading: 'eui-sa', meaning: 'Dottore', syllableNote: '의 (eui) + 사 (sa)' },
      { word: '희망', reading: 'hi-mang', meaning: 'Speranza', syllableNote: '희 (hi!) + 망 (mang)' },
    ],
    quickCombos: ['의', '희', '늬', '믜', '싀', '틔'],
  },
];
