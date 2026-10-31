# Задание: Unità 9 — листки стр. 45–46 (L31)

Источник: учебник, стр. 45–46 («Che cosa faresti?», упр. C, 6A, 6B).
Весь контент ниже уже проверен валидатором (`node scripts/validate-content.mjs` → ok) на копии репозитория `c19baa3`.
Ничего не придумывай и не переводи сам — вставляй данные **как есть**.

## Общие правила
- Соблюдай CLAUDE.md. Делай только то, что здесь написано.
- **Сохраняй форматирование JSON-файлов** (отступы, порядок ключей). Правь точечно, не переформатируй файлы целиком — в diff должны быть только изменённые строки.
- Не коммить. В конце — отчёт (см. шаг 7).

## Шаг 1. Словарь — `src/content/a2/ru/vocab.json`
1a. Удалить слово **w654** («il Giorno dei morti», lesson "extra") — это дубль w513. Ссылок на w654 в коде нет (проверено).
1b. У **w513** («il Giorno dei Morti») поменять `"group": 8` → `"group": 13` (Le feste).
1c. Добавить в конец массива `words` 24 слова (партия **L31**):

```json
[
  {
    "id": "w724",
    "it": "stasera",
    "ru": "сегодня вечером",
    "uk": "сьогодні ввечері",
    "en": "this evening, tonight",
    "pos": "adverb",
    "group": 12,
    "example": "Stasera guarderei un bel film in TV.",
    "lesson": "L31"
  },
  {
    "id": "w725",
    "it": "la torta",
    "ru": "торт",
    "uk": "торт",
    "en": "cake",
    "pos": "noun",
    "gender": "f",
    "plural": "le torte",
    "group": 6,
    "example": "Mangerei volentieri una fetta di torta al cioccolato.",
    "lesson": "L31"
  },
  {
    "id": "w726",
    "it": "la fetta (di)",
    "ru": "кусок, ломтик (чего-то)",
    "uk": "шматок, скибка (чогось)",
    "en": "slice (of)",
    "pos": "noun",
    "gender": "f",
    "plural": "le fette",
    "group": 6,
    "example": "Mangerei volentieri una fetta di torta al cioccolato.",
    "lesson": "L31"
  },
  {
    "id": "w727",
    "it": "il cioccolato",
    "ru": "шоколад; al cioccolato — шоколадный",
    "uk": "шоколад; al cioccolato — шоколадний",
    "en": "chocolate; al cioccolato — chocolate (cake…)",
    "pos": "noun",
    "gender": "m",
    "group": 6,
    "example": "Mangerei volentieri una fetta di torta al cioccolato.",
    "lesson": "L31"
  },
  {
    "id": "w728",
    "it": "il finestrino",
    "ru": "окно (в машине, поезде, автобусе)",
    "uk": "вікно (в авто, поїзді, автобусі)",
    "en": "window (of a car, train, bus)",
    "pos": "noun",
    "gender": "m",
    "plural": "i finestrini",
    "group": 7,
    "example": "Scusi, aprirebbe il finestrino, per favore?",
    "lesson": "L31"
  },
  {
    "id": "w729",
    "it": "la finestra",
    "ru": "окно (в доме)",
    "uk": "вікно (в домі)",
    "en": "window (of a building)",
    "pos": "noun",
    "gender": "f",
    "plural": "le finestre",
    "group": 5,
    "example": "Scusate, chiudereste la finestra?",
    "lesson": "L31"
  },
  {
    "id": "w730",
    "it": "il tavolo",
    "ru": "стол",
    "uk": "стіл",
    "en": "table",
    "pos": "noun",
    "gender": "m",
    "plural": "i tavoli",
    "group": 5,
    "example": "Chi mi aiuterebbe a spostare questo tavolo?",
    "lesson": "L31"
  },
  {
    "id": "w731",
    "it": "il bicchiere",
    "ru": "стакан, бокал",
    "uk": "склянка, келих",
    "en": "glass",
    "pos": "noun",
    "gender": "m",
    "plural": "i bicchieri",
    "group": 6,
    "example": "Scusa, mi porteresti un bicchiere d'acqua?",
    "lesson": "L31"
  },
  {
    "id": "w732",
    "it": "gli gnocchi",
    "ru": "ньокки (итальянские клёцки)",
    "uk": "ньокі (італійські галушки)",
    "en": "gnocchi",
    "pos": "noun",
    "gender": "m",
    "plural": "sing.: lo gnocco",
    "group": 6,
    "example": "Oggi mangerei volentieri un piatto di gnocchi.",
    "lesson": "L31"
  },
  {
    "id": "w733",
    "it": "l'acqua gasata",
    "ru": "газированная вода",
    "uk": "газована вода",
    "en": "sparkling water",
    "pos": "noun",
    "gender": "f",
    "group": 6,
    "example": "Sì, certamente! La vuoi gasata?",
    "lesson": "L31"
  },
  {
    "id": "w734",
    "it": "dare una mano (a qualcuno)",
    "ru": "помочь (кому-то), букв. «дать руку»",
    "uk": "допомогти (комусь), букв. «дати руку»",
    "en": "to give (someone) a hand",
    "pos": "expression",
    "aux": "avere",
    "participle": "dato",
    "base": "w125",
    "group": 1,
    "example": "Non ti preoccupare: ti do una mano io!",
    "lesson": "L31"
  },
  {
    "id": "w735",
    "it": "non ti preoccupare",
    "ru": "не волнуйся",
    "uk": "не хвилюйся",
    "en": "don't worry",
    "pos": "expression",
    "base": "w044",
    "group": 4,
    "example": "Non ti preoccupare: ti do una mano io!",
    "lesson": "L31"
  },
  {
    "id": "w736",
    "it": "essere a dieta",
    "ru": "быть на диете",
    "uk": "бути на дієті",
    "en": "to be on a diet",
    "pos": "expression",
    "aux": "essere",
    "participle": "stato",
    "base": "w039",
    "group": 10,
    "example": "Mangerei volentieri un piatto di gnocchi, ma sono a dieta.",
    "lesson": "L31"
  },
  {
    "id": "w737",
    "it": "l'impegno",
    "ru": "дело, обязательство (на это время)",
    "uk": "справа, зобов'язання (на цей час)",
    "en": "commitment, engagement",
    "pos": "noun",
    "gender": "m",
    "plural": "gli impegni",
    "group": 11,
    "example": "Ci fermeremmo volentieri, ma abbiamo un impegno urgente.",
    "lesson": "L31"
  },
  {
    "id": "w738",
    "it": "impegnato",
    "ru": "занятый",
    "uk": "зайнятий",
    "en": "busy",
    "pos": "adjective",
    "forms": "impegnato (м) – impegnata (ж) – impegnati / impegnate (мн.)",
    "group": 11,
    "example": "Mi dispiace, ma domenica sono già impegnato.",
    "lesson": "L31"
  },
  {
    "id": "w739",
    "it": "libero",
    "ru": "свободный",
    "uk": "вільний",
    "en": "free",
    "pos": "adjective",
    "forms": "libero (м) – libera (ж) – liberi / libere (мн.)",
    "group": 12,
    "example": "Luca, saresti libero domenica sera?",
    "lesson": "L31"
  },
  {
    "id": "w740",
    "it": "urgente",
    "ru": "срочный",
    "uk": "терміновий",
    "en": "urgent",
    "pos": "adjective",
    "forms": "urgente (м/ж) – urgenti (мн.)",
    "group": 11,
    "example": "Abbiamo un impegno urgente.",
    "lesson": "L31"
  },
  {
    "id": "w741",
    "it": "subito",
    "ru": "сразу, сейчас же",
    "uk": "одразу, зараз же",
    "en": "right away, immediately",
    "pos": "adverb",
    "group": 12,
    "example": "Sì, subito.",
    "lesson": "L31"
  },
  {
    "id": "w742",
    "it": "certamente",
    "ru": "конечно",
    "uk": "звичайно",
    "en": "certainly, of course",
    "pos": "adverb",
    "group": 12,
    "example": "Sì, certamente! La vuoi gasata?",
    "lesson": "L31"
  },
  {
    "id": "w743",
    "it": "la libreria",
    "ru": "книжный магазин (≠ biblioteca — библиотека)",
    "uk": "книгарня (≠ biblioteca — бібліотека)",
    "en": "bookshop (≠ biblioteca — library)",
    "pos": "noun",
    "gender": "f",
    "plural": "le librerie",
    "group": 7,
    "example": "Potresti provare alla Libreria Feltrinelli.",
    "lesson": "L31"
  },
  {
    "id": "w744",
    "it": "la biblioteca",
    "ru": "библиотека (≠ libreria — книжный магазин)",
    "uk": "бібліотека (≠ libreria — книгарня)",
    "en": "library (≠ libreria — bookshop)",
    "pos": "noun",
    "gender": "f",
    "plural": "le biblioteche",
    "group": 7,
    "example": "Studio in biblioteca.",
    "lesson": "L31"
  },
  {
    "id": "w745",
    "it": "tagliare",
    "ru": "резать; стричь",
    "uk": "різати; стригти",
    "en": "to cut",
    "pos": "verb",
    "aux": "avere",
    "participle": "tagliato",
    "group": 1,
    "example": "Avrei bisogno di tagliare i capelli.",
    "lesson": "L31"
  },
  {
    "id": "w746",
    "it": "andare da (qualcuno)",
    "ru": "идти к кому-то (к врачу, парикмахеру)",
    "uk": "іти до когось (до лікаря, перукаря)",
    "en": "to go to someone's (doctor, hairdresser)",
    "pos": "expression",
    "aux": "essere",
    "participle": "andato",
    "base": "w058",
    "group": 7,
    "example": "Io andrei da Aldo Coppola.",
    "lesson": "L31"
  },
  {
    "id": "w747",
    "it": "il cinema",
    "ru": "кино, кинотеатр",
    "uk": "кіно, кінотеатр",
    "en": "cinema",
    "pos": "noun",
    "gender": "m",
    "plural": "i cinema",
    "group": 1,
    "example": "Saresti libero domenica sera per andare al cinema?",
    "lesson": "L31"
  }
]
```

## Шаг 2. Грамматика «Uso del condizionale» — `src/content/a2/{ru,uk,en}/lezioni.json`, урок `g5-condizionale-uso`
2a. `tables[0]` (случай 1 «Dare consigli…»): **добавить в конец `items`** по 2 пары:

```json
{
  "ru": [
    {
      "a": "Dove posso trovare l'ultimo libro di Wilbur Smith? — Potresti provare alla Libreria Feltrinelli.",
      "tr": "Где мне найти последнюю книгу Уилбура Смита? — Ты мог бы попробовать в книжном магазине Feltrinelli."
    },
    {
      "a": "Avrei bisogno di tagliare i capelli: conosci un buon parrucchiere? — Io andrei da Aldo Coppola.",
      "tr": "Мне нужно подстричься: знаешь хорошего парикмахера? — Я бы пошла к Альдо Копполе."
    }
  ],
  "uk": [
    {
      "a": "Dove posso trovare l'ultimo libro di Wilbur Smith? — Potresti provare alla Libreria Feltrinelli.",
      "tr": "Де мені знайти останню книжку Вілбура Сміта? — Ти міг би спробувати в книгарні Feltrinelli."
    },
    {
      "a": "Avrei bisogno di tagliare i capelli: conosci un buon parrucchiere? — Io andrei da Aldo Coppola.",
      "tr": "Мені треба підстригтися: знаєш доброго перукаря? — Я б пішла до Альдо Копполи."
    }
  ],
  "en": [
    {
      "a": "Dove posso trovare l'ultimo libro di Wilbur Smith? — Potresti provare alla Libreria Feltrinelli.",
      "tr": "Where can I find Wilbur Smith's latest book? — You could try the Feltrinelli bookshop."
    },
    {
      "a": "Avrei bisogno di tagliare i capelli: conosci un buon parrucchiere? — Io andrei da Aldo Coppola.",
      "tr": "I need a haircut: do you know a good hairdresser? — I'd go to Aldo Coppola."
    }
  ]
}
```

2b. `tables[1]` (первая таблица «Полезные формулы» / «Корисні формули» / её en-аналог): добавить в конец `items`:

```json
{
  "ru": {
    "a": "potresti + infinito",
    "tr": "ты мог бы… (совет)"
  },
  "uk": {
    "a": "potresti + infinito",
    "tr": "ти міг би… (порада)"
  },
  "en": {
    "a": "potresti + infinito",
    "tr": "you could… (advice)"
  }
}
```

и добавить этой таблице поле `note` (в ней сейчас нет `note`):

```json
{
  "ru": "{{Potresti}} — и совет, и просьба: {{Potresti provare}} {{alla libreria.}} (совет) · {{Potresti aiutarmi?}} (просьба). Внимание: {{la libreria}} — книжный магазин, {{la biblioteca}} — библиотека.",
  "uk": "{{Potresti}} — і порада, і прохання: {{Potresti provare}} {{alla libreria.}} (порада) · {{Potresti aiutarmi?}} (прохання). Увага: {{la libreria}} — книгарня, {{la biblioteca}} — бібліотека.",
  "en": "{{Potresti}} is both advice and a request: {{Potresti provare}} {{alla libreria.}} (advice) · {{Potresti aiutarmi?}} (request). Careful: {{la libreria}} is a bookshop, {{la biblioteca}} is a library."
}
```

2c. В `mistakes` заменить запись с `"wrong": "Mi dai un foglio?"` (сейчас right = «Mi darebbe…», путает tu и Lei) на:

```json
{
  "ru": {
    "wrong": "Mi dai un foglio?",
    "right": "Mi daresti un foglio?",
    "why": "вежливее — {{condizionale}}: {{dai}} → {{daresti}}"
  },
  "uk": {
    "wrong": "Mi dai un foglio?",
    "right": "Mi daresti un foglio?",
    "why": "ввічливіше — {{condizionale}}: {{dai}} → {{daresti}}"
  },
  "en": {
    "wrong": "Mi dai un foglio?",
    "right": "Mi daresti un foglio?",
    "why": "more polite — {{condizionale}}: {{dai}} → {{daresti}}"
  }
}
```

## Шаг 3. Исправления в существующих упражнениях — `src/content/a2/esercizi.json`
- **cf-24**: `options` → `["Andremo", "Andremmo", "Andaremo"]` (слово стоит в начале фразы — нужна заглавная). `answer` остаётся 1.
- **cu-22**: `it` → `"Fa freddo. → ___ volentieri a letto."` (о погоде — **fa** freddo, не «è freddo»; так и в теме g5-meteo).
- **cu-28**: `it` → `"Fa molto caldo. → ___ volentieri al mare."`

## Шаг 4. Новое поле перевода `tr` в упражнениях
Цель: после ответа студент видит перевод всей фразы на своём языке.

4a. `src/content/a2/esercizi.ts`: в `VoceFill` и `VoceChoice` добавить необязательное `tr?: Tradotto`; в `getEsercizi` передавать его в плеер через `tradotto(v.tr, locale)` (как `task`); в тип `VoceEsercizio` — `tr?: TestoTradotto`.
4b. `src/components/esercizi/PlayerEsercizi.tsx`: в блоке после ответа, **между** «Risposta corretta…» и `why`, если `voce.tr` есть — выводить его через `<Tr locale={voce.tr.lingua} as="p" size="sm" className="mt-2 block">`. Без новых цветов и стилей.
4c. `scripts/validate-content.mjs` (раздел esercizi): если у voce есть `tr` — он должен иметь непустые ru, uk, en (как `why`), иначе ошибка `${dove} tr senza …`.
4d. Добавить `tr` к 42 существующим упражнениям (cf-01…cf-32, cu-01…cu-10). Ключ — id упражнения, значение — поле `tr`. У cu-11…cu-28 `tr` **не добавлять** — перевод уже есть в их `why`.

```json
{
  "cf-01": {
    "ru": "Я на твоём месте учился бы больше.",
    "uk": "Я на твоєму місці вчився б більше.",
    "en": "If I were you, I'd study more."
  },
  "cf-02": {
    "ru": "Ты бы выпил со мной кофе?",
    "uk": "Ти випив би зі мною кави?",
    "en": "Would you have a coffee with me?"
  },
  "cf-03": {
    "ru": "Марта уехала бы завтра, но у неё нет билета.",
    "uk": "Марта поїхала б завтра, але в неї немає квитка.",
    "en": "Marta would leave tomorrow, but she has no ticket."
  },
  "cf-04": {
    "ru": "Мы бы купили дом побольше.",
    "uk": "Ми б купили більший будинок.",
    "en": "We would buy a bigger house."
  },
  "cf-05": {
    "ru": "Вы бы прочитали эту книгу?",
    "uk": "Ви б прочитали цю книжку?",
    "en": "Would you (all) read this book?"
  },
  "cf-06": {
    "ru": "Дети спали бы весь день.",
    "uk": "Діти спали б цілий день.",
    "en": "The children would sleep all day."
  },
  "cf-07": {
    "ru": "Я бы заплатил картой.",
    "uk": "Я б заплатив карткою.",
    "en": "I'd pay by card."
  },
  "cf-08": {
    "ru": "Ты бы искал другую работу?",
    "uk": "Ти шукав би іншу роботу?",
    "en": "Would you look for another job?"
  },
  "cf-09": {
    "ru": "Мы бы начали сразу.",
    "uk": "Ми б почали одразу.",
    "en": "We would start right away."
  },
  "cf-10": {
    "ru": "Они бы с удовольствием поели пиццу.",
    "uk": "Вони б охоче з'їли піцу.",
    "en": "They would gladly eat pizza."
  },
  "cf-11": {
    "ru": "Я был бы рад тебе помочь.",
    "uk": "Я був би радий тобі допомогти.",
    "en": "I'd be happy to help you."
  },
  "cf-12": {
    "ru": "Ты бы сделал кое-что для меня?",
    "uk": "Ти зробив би дещо для мене?",
    "en": "Would you do something for me?"
  },
  "cf-13": {
    "ru": "Ей было бы лучше на море.",
    "uk": "Їй було б краще на морі.",
    "en": "She would feel better at the seaside."
  },
  "cf-14": {
    "ru": "Мы бы с удовольствием поехали в горы.",
    "uk": "Ми б охоче поїхали в гори.",
    "en": "We would gladly go to the mountains."
  },
  "cf-15": {
    "ru": "Мне нужен был бы совет.",
    "uk": "Мені потрібна була б порада.",
    "en": "I would need some advice."
  },
  "cf-16": {
    "ru": "Вы не могли бы закрыть дверь?",
    "uk": "Ви не могли б зачинити двері?",
    "en": "Could you (all) close the door?"
  },
  "cf-17": {
    "ru": "Тебе стоило бы больше спать.",
    "uk": "Тобі варто було б більше спати.",
    "en": "You should sleep more."
  },
  "cf-18": {
    "ru": "Я бы не знал, что сказать.",
    "uk": "Я б не знав, що сказати.",
    "en": "I wouldn't know what to say."
  },
  "cf-19": {
    "ru": "Они бы пошли с нами?",
    "uk": "Вони б пішли з нами?",
    "en": "Would they come with us?"
  },
  "cf-20": {
    "ru": "Я бы хотел стакан воды.",
    "uk": "Я б хотів склянку води.",
    "en": "I'd like a glass of water."
  },
  "cf-21": {
    "ru": "Мы бы остались здесь ещё на час.",
    "uk": "Ми б залишилися тут ще на годину.",
    "en": "We would stay here another hour."
  },
  "cf-22": {
    "ru": "Он бы с удовольствием выпил пива.",
    "uk": "Він би охоче випив пива.",
    "en": "He would gladly have a beer."
  },
  "cf-23": {
    "ru": "Завтра мы поедем на море: билеты у нас уже есть.",
    "uk": "Завтра ми поїдемо на море: квитки в нас уже є.",
    "en": "Tomorrow we'll go to the seaside: we already have the tickets."
  },
  "cf-24": {
    "ru": "Мы бы поехали на море, но идёт дождь.",
    "uk": "Ми б поїхали на море, але йде дощ.",
    "en": "We would go to the seaside, but it's raining."
  },
  "cf-25": {
    "ru": "На вашем месте мы бы работали меньше.",
    "uk": "На вашому місці ми б працювали менше.",
    "en": "If we were you, we'd work less."
  },
  "cf-26": {
    "ru": "Я бы заплатил картой.",
    "uk": "Я б заплатив карткою.",
    "en": "I'd pay by card."
  },
  "cf-27": {
    "ru": "Она бы начала сразу.",
    "uk": "Вона б почала одразу.",
    "en": "She would start right away."
  },
  "cf-28": {
    "ru": "Ты бы испёк торт к празднику?",
    "uk": "Ти спік би торт на свято?",
    "en": "Would you make a cake for the party?"
  },
  "cf-29": {
    "ru": "Они бы пришли с удовольствием.",
    "uk": "Вони б охоче прийшли.",
    "en": "They would gladly come."
  },
  "cf-30": {
    "ru": "Не мог бы ты мне помочь, пожалуйста?",
    "uk": "Не міг би ти мені допомогти, будь ласка?",
    "en": "Could you help me, please?"
  },
  "cf-31": {
    "ru": "Мне бы хотелось учиться пению.",
    "uk": "Мені хотілося б учитися співу.",
    "en": "I'd like to study singing."
  },
  "cf-32": {
    "ru": "Я бы хотел кофе, пожалуйста.",
    "uk": "Я б хотів каву, будь ласка.",
    "en": "I'd like a coffee, please."
  },
  "cu-01": {
    "ru": "Тебе стоило бы больше спать.",
    "uk": "Тобі варто було б більше спати.",
    "en": "You should sleep more."
  },
  "cu-02": {
    "ru": "Я бы хотел кофе.",
    "uk": "Я б хотів каву.",
    "en": "I'd like a coffee."
  },
  "cu-03": {
    "ru": "Не могли бы Вы закрыть окно?",
    "uk": "Чи не могли б Ви зачинити вікно?",
    "en": "Could you close the window?"
  },
  "cu-04": {
    "ru": "Мне бы хотелось побывать в Риме.",
    "uk": "Мені хотілося б побувати в Римі.",
    "en": "I'd like to visit Rome."
  },
  "cu-05": {
    "ru": "На твоём месте я бы сходил к врачу.",
    "uk": "На твоєму місці я б пішов до лікаря.",
    "en": "If I were you, I'd go to the doctor."
  },
  "cu-06": {
    "ru": "Ты не дашь мне лист?",
    "uk": "Даси мені аркуш?",
    "en": "Would you give me a sheet of paper?"
  },
  "cu-07": {
    "ru": "Мне кажется, лучше было бы подождать.",
    "uk": "Мені здається, краще було б почекати.",
    "en": "I think it would be better to wait."
  },
  "cu-08": {
    "ru": "Следующим летом я бы с удовольствием поехал на Сицилию.",
    "uk": "Наступного літа я б охоче поїхав на Сицилію.",
    "en": "Next summer I'd gladly go to Sicily."
  },
  "cu-09": {
    "ru": "Не могли бы Вы повторить, пожалуйста?",
    "uk": "Чи не могли б Ви повторити, будь ласка?",
    "en": "Could you repeat that, please?"
  },
  "cu-10": {
    "ru": "Фабио, тебе стоило бы поговорить с начальником.",
    "uk": "Фабіо, тобі варто було б поговорити з начальником.",
    "en": "Fabio, you should talk to the boss."
  }
}
```

## Шаг 5. 12 новых упражнений (упр. C учебника)
Добавить в конец `items` набора `"topic": "g5-condizionale-uso"` (станет 40 упражнений):

```json
[
  {
    "id": "cu-29",
    "type": "fill",
    "task": {
      "ru": "Поставь глагол в condizionale (учебник, стр. 46, упр. C).",
      "uk": "Постав дієслово в condizionale (підручник, с. 46, вправа C).",
      "en": "Put the verb in the condizionale (textbook, p. 46, ex. C)."
    },
    "it": "Chi mi ___ a spostare questo tavolo?",
    "hint": "aiutare",
    "answers": [
      "aiuterebbe"
    ],
    "why": {
      "ru": "Chi = 3-е лицо (как lui/lei) → -ebbe. -are: a → e.",
      "uk": "Chi = 3-тя особа (як lui/lei) → -ebbe. -are: a → e.",
      "en": "Chi = 3rd person (like lui/lei) → -ebbe. -are: a → e."
    },
    "tr": {
      "ru": "Кто помог бы мне передвинуть этот стол?",
      "uk": "Хто допоміг би мені пересунути цей стіл?",
      "en": "Who would help me move this table?"
    }
  },
  {
    "id": "cu-30",
    "type": "fill",
    "task": {
      "ru": "Поставь глагол в condizionale (учебник, стр. 46, упр. C).",
      "uk": "Постав дієслово в condizionale (підручник, с. 46, вправа C).",
      "en": "Put the verb in the condizionale (textbook, p. 46, ex. C)."
    },
    "it": "Scusate, ___ la finestra?",
    "hint": "chiudere",
    "answers": [
      "chiudereste"
    ],
    "why": {
      "ru": "Scusate → обращаемся к voi → -este.",
      "uk": "Scusate → звертаємося до voi → -este.",
      "en": "Scusate → we're speaking to voi → -este."
    },
    "tr": {
      "ru": "Извините, не закрыли бы вы окно?",
      "uk": "Вибачте, чи не зачинили б ви вікно?",
      "en": "Excuse me, would you (all) close the window?"
    }
  },
  {
    "id": "cu-31",
    "type": "fill",
    "task": {
      "ru": "Поставь глагол в condizionale (учебник, стр. 46, упр. C).",
      "uk": "Постав дієслово в condizionale (підручник, с. 46, вправа C).",
      "en": "Put the verb in the condizionale (textbook, p. 46, ex. C)."
    },
    "it": "Oggi ___ volentieri un piatto di gnocchi, ma sono a dieta.",
    "hint": "io, mangiare",
    "answers": [
      "mangerei"
    ],
    "why": {
      "ru": "-giare: i выпадает → manger- + -ei.",
      "uk": "-giare: i випадає → manger- + -ei.",
      "en": "-giare: the i drops → manger- + -ei."
    },
    "tr": {
      "ru": "Сегодня я бы с удовольствием съел тарелку ньокки, но я на диете.",
      "uk": "Сьогодні я б охоче з'їв тарілку ньокі, але я на дієті.",
      "en": "Today I'd gladly eat a plate of gnocchi, but I'm on a diet."
    }
  },
  {
    "id": "cu-32",
    "type": "fill",
    "task": {
      "ru": "Поставь глагол в condizionale (учебник, стр. 46, упр. C).",
      "uk": "Постав дієслово в condizionale (підручник, с. 46, вправа C).",
      "en": "Put the verb in the condizionale (textbook, p. 46, ex. C)."
    },
    "it": "Scusa, mi ___ un bicchiere d'acqua?",
    "hint": "portare",
    "answers": [
      "porteresti"
    ],
    "why": {
      "ru": "Scusa → обращаемся к tu → -esti (к Lei было бы: porterebbe).",
      "uk": "Scusa → звертаємося до tu → -esti (до Lei було б: porterebbe).",
      "en": "Scusa → we're speaking to tu → -esti (to Lei it would be: porterebbe)."
    },
    "tr": {
      "ru": "Слушай, не принёс бы ты мне стакан воды?",
      "uk": "Слухай, чи не приніс би ти мені склянку води?",
      "en": "Excuse me, would you bring me a glass of water?"
    }
  },
  {
    "id": "cu-33",
    "type": "fill",
    "task": {
      "ru": "Поставь глагол в condizionale (учебник, стр. 46, упр. C).",
      "uk": "Постав дієслово в condizionale (підручник, с. 46, вправа C).",
      "en": "Put the verb in the condizionale (textbook, p. 46, ex. C)."
    },
    "it": "Ci ___ volentieri a casa vostra, ma abbiamo un impegno urgente.",
    "hint": "fermarsi",
    "answers": [
      "fermeremmo"
    ],
    "why": {
      "ru": "Ci = noi (возвратный fermarsi) → -emmo.",
      "uk": "Ci = noi (зворотне fermarsi) → -emmo.",
      "en": "Ci = noi (reflexive fermarsi) → -emmo."
    },
    "tr": {
      "ru": "Мы бы с удовольствием задержались у вас, но у нас срочное дело.",
      "uk": "Ми б охоче затрималися у вас, але в нас термінова справа.",
      "en": "We would gladly stay at your place, but we have something urgent to do."
    }
  },
  {
    "id": "cu-34",
    "type": "fill",
    "task": {
      "ru": "Поставь глагол в condizionale (учебник, стр. 46, упр. C).",
      "uk": "Постав дієслово в condizionale (підручник, с. 46, вправа C).",
      "en": "Put the verb in the condizionale (textbook, p. 46, ex. C)."
    },
    "it": "Luca, ___ libero domenica sera per andare al cinema?",
    "hint": "essere",
    "answers": [
      "saresti"
    ],
    "why": {
      "ru": "Обращаемся к Луке на tu; essere → sar- + -esti.",
      "uk": "Звертаємося до Луки на tu; essere → sar- + -esti.",
      "en": "Speaking to Luca with tu; essere → sar- + -esti."
    },
    "tr": {
      "ru": "Лука, ты был бы свободен в воскресенье вечером, чтобы сходить в кино?",
      "uk": "Луко, ти був би вільний у неділю ввечері, щоб піти в кіно?",
      "en": "Luca, would you be free on Sunday evening to go to the cinema?"
    }
  },
  {
    "id": "cu-35",
    "type": "choice",
    "task": {
      "ru": "Выбери подходящий ответ.",
      "uk": "Обери відповідну відповідь.",
      "en": "Choose the right reply."
    },
    "it": "Chi mi aiuterebbe a spostare questo tavolo? — ___",
    "options": [
      "Mi dispiace, ma domenica sono già impegnato.",
      "Non ti preoccupare: ti do una mano io!",
      "ma sono a dieta."
    ],
    "answer": 1,
    "why": {
      "ru": "Просят помочь → «Не волнуйся, я помогу». dare una mano = помочь.",
      "uk": "Просять допомогти → «Не хвилюйся, я допоможу». dare una mano = допомогти.",
      "en": "Someone asks for help → \"Don't worry, I'll help\". dare una mano = to help."
    },
    "tr": {
      "ru": "Кто помог бы мне передвинуть этот стол? — Не волнуйся: я тебе помогу!",
      "uk": "Хто допоміг би мені пересунути цей стіл? — Не хвилюйся: я тобі допоможу!",
      "en": "Who would help me move this table? — Don't worry: I'll give you a hand!"
    }
  },
  {
    "id": "cu-36",
    "type": "choice",
    "task": {
      "ru": "Выбери подходящий ответ.",
      "uk": "Обери відповідну відповідь.",
      "en": "Choose the right reply."
    },
    "it": "Scusate, chiudereste la finestra? — ___",
    "options": [
      "Mi dispiace, ma domenica sono già impegnato.",
      "ma sono a dieta.",
      "Sì, subito."
    ],
    "answer": 2,
    "why": {
      "ru": "Вежливая просьба → короткое согласие: «Да, сейчас».",
      "uk": "Ввічливе прохання → коротка згода: «Так, зараз».",
      "en": "Polite request → short yes: \"Yes, right away\"."
    },
    "tr": {
      "ru": "Извините, не закрыли бы вы окно? — Да, сейчас.",
      "uk": "Вибачте, чи не зачинили б ви вікно? — Так, зараз.",
      "en": "Excuse me, would you close the window? — Yes, right away."
    }
  },
  {
    "id": "cu-37",
    "type": "choice",
    "task": {
      "ru": "Выбери подходящий ответ.",
      "uk": "Обери відповідну відповідь.",
      "en": "Choose the right reply."
    },
    "it": "Oggi mangerei volentieri un piatto di gnocchi, ___",
    "options": [
      "Sì, certamente! La vuoi gasata?",
      "ma sono a dieta.",
      "Sì, subito."
    ],
    "answer": 1,
    "why": {
      "ru": "Желание + «но…»: съел бы, но я на диете.",
      "uk": "Бажання + «але…»: з'їв би, але я на дієті.",
      "en": "Wish + \"but…\": I'd eat them, but I'm on a diet."
    },
    "tr": {
      "ru": "Сегодня я бы с удовольствием съел тарелку ньокки, но я на диете.",
      "uk": "Сьогодні я б охоче з'їв тарілку ньокі, але я на дієті.",
      "en": "Today I'd gladly eat a plate of gnocchi, but I'm on a diet."
    }
  },
  {
    "id": "cu-38",
    "type": "choice",
    "task": {
      "ru": "Выбери подходящий ответ.",
      "uk": "Обери відповідну відповідь.",
      "en": "Choose the right reply."
    },
    "it": "Scusa, mi porteresti un bicchiere d'acqua? — ___",
    "options": [
      "Sì, certamente! La vuoi gasata?",
      "ma abbiamo un impegno urgente.",
      "Mi dispiace, ma domenica sono già impegnato."
    ],
    "answer": 0,
    "why": {
      "ru": "La = l'acqua: «Тебе газированную?» подходит только к воде.",
      "uk": "La = l'acqua: «Тобі газовану?» пасує лише до води.",
      "en": "La = l'acqua: \"Do you want it sparkling?\" only fits water."
    },
    "tr": {
      "ru": "Слушай, не принёс бы ты мне стакан воды? — Да, конечно! Тебе газированную?",
      "uk": "Слухай, чи не приніс би ти мені склянку води? — Так, звичайно! Тобі газовану?",
      "en": "Would you bring me a glass of water? — Yes, of course! Do you want it sparkling?"
    }
  },
  {
    "id": "cu-39",
    "type": "choice",
    "task": {
      "ru": "Выбери подходящий ответ.",
      "uk": "Обери відповідну відповідь.",
      "en": "Choose the right reply."
    },
    "it": "Ci fermeremmo volentieri a casa vostra, ___",
    "options": [
      "Non ti preoccupare: ti do una mano io!",
      "Sì, certamente! La vuoi gasata?",
      "ma abbiamo un impegno urgente."
    ],
    "answer": 2,
    "why": {
      "ru": "Желание + «но…»: остались бы, но есть срочное дело.",
      "uk": "Бажання + «але…»: залишилися б, але є термінова справа.",
      "en": "Wish + \"but…\": we'd stay, but we have something urgent."
    },
    "tr": {
      "ru": "Мы бы с удовольствием задержались у вас, но у нас срочное дело.",
      "uk": "Ми б охоче затрималися у вас, але в нас термінова справа.",
      "en": "We would gladly stay at your place, but we have something urgent to do."
    }
  },
  {
    "id": "cu-40",
    "type": "choice",
    "task": {
      "ru": "Выбери подходящий ответ.",
      "uk": "Обери відповідну відповідь.",
      "en": "Choose the right reply."
    },
    "it": "Luca, saresti libero domenica sera per andare al cinema? — ___",
    "options": [
      "Mi dispiace, ma domenica sono già impegnato.",
      "ma sono a dieta.",
      "Sì, certamente! La vuoi gasata?"
    ],
    "answer": 0,
    "why": {
      "ru": "Спрашивают про воскресенье → «Жаль, в воскресенье я уже занят».",
      "uk": "Питають про неділю → «Шкода, у неділю я вже зайнятий».",
      "en": "The question is about Sunday → \"Sorry, I'm already busy on Sunday\"."
    },
    "tr": {
      "ru": "Лука, ты был бы свободен в воскресенье вечером, чтобы сходить в кино? — Жаль, но в воскресенье я уже занят.",
      "uk": "Луко, ти був би вільний у неділю ввечері, щоб піти в кіно? — Шкода, але в неділю я вже зайнятий.",
      "en": "Luca, would you be free on Sunday evening to go to the cinema? — Sorry, but I'm already busy on Sunday."
    }
  }
]
```

## Шаг 6. Валидатор и тесты
6a. `scripts/validate-content.mjs` (раздел vocab): проверку повторов `it` сделать **без учёта регистра** (`w.it.toLowerCase()`), чтобы ловить дубли вроде «Giorno dei Morti / Giorno dei morti».
6b. `tests/condizionale.spec.ts`: в тесте «esercizi uso» `"1 / 28"` → `"1 / 40"`.
6c. В `tests/condizionale.spec.ts` добавить тест: язык ru, страница `/a2/esercizi/condizionale-presente-le-forme`, ввести «studierei», Enter → в `role=status` виден перевод «Я на твоём месте учился бы больше.»
6d. Запустить по порядку и исправить ошибки:
```
node scripts/validate-content.mjs
npm run lint
npm run build
npm run test:layout
```

## Шаг 7. Отчёт
Выведи: список изменённых файлов; число слов в vocab.json (ожидается 743 = 720 − 1 + 24); число упражнений в g5-condizionale-uso (40) и всего с `tr` (54); результаты всех 4 проверок. Не коммить.
