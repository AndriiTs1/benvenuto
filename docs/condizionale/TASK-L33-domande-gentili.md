# Задание L33: вежливые вопросы и советы — словарь, формулы, 17 упражнений + коммит и push

Весь контент ниже уже проверен валидатором (`node scripts/validate-content.mjs` → ok) на копии репозитория `5ea4dfd`.
Ничего не придумывай и не переводи сам — вставляй данные **как есть**.

## Общие правила
- Соблюдай CLAUDE.md. Делай только то, что здесь написано.
- Сохраняй форматирование JSON (отступ 1 пробел, без перевода строки в конце, порядок ключей). В diff — только добавленные строки (плюс новое поле `note` в шаге 2b).
- Коммит и push — только если все проверки шага 6 прошли.

## Шаг 1. Словарь — `src/content/a2/ru/vocab.json`
Добавить в конец массива `words` 21 слово (партия **L33**, w780–w800):
```json
[
 {
  "id": "w780",
  "it": "il passante",
  "ru": "прохожий",
  "uk": "перехожий",
  "en": "passer-by",
  "pos": "noun",
  "gender": "m",
  "plural": "i passanti",
  "group": 7,
  "example": "Chiedete l'ora a un passante.",
  "lesson": "L33"
 },
 {
  "id": "w781",
  "it": "il vicino / la vicina",
  "ru": "сосед / соседка",
  "uk": "сусід / сусідка",
  "en": "neighbour",
  "pos": "noun",
  "gender": "m",
  "plural": "i vicini / le vicine",
  "note": "il vicino di tavolo — сосед по столику",
  "group": 2,
  "example": "Chiedete ai vostri vicini di fare silenzio.",
  "lesson": "L33"
 },
 {
  "id": "w782",
  "it": "fare silenzio",
  "ru": "вести себя тихо, не шуметь",
  "uk": "поводитися тихо, не шуміти",
  "en": "to be quiet",
  "pos": "expression",
  "aux": "avere",
  "participle": "fatto",
  "group": 5,
  "example": "Scusate, potreste fare un po' di silenzio?",
  "lesson": "L33"
 },
 {
  "id": "w783",
  "it": "il rumore",
  "ru": "шум",
  "uk": "шум",
  "en": "noise",
  "pos": "noun",
  "gender": "m",
  "plural": "i rumori",
  "group": 5,
  "example": "Vi dispiacerebbe fare meno rumore?",
  "lesson": "L33"
 },
 {
  "id": "w784",
  "it": "piano",
  "ru": "тихо; медленно",
  "uk": "тихо; повільно",
  "en": "quietly; slowly",
  "pos": "adverb",
  "group": 12,
  "example": "Le dispiacerebbe parlare un po' più piano?",
  "lesson": "L33"
 },
 {
  "id": "w785",
  "it": "l'ufficio turistico",
  "ru": "туристический офис",
  "uk": "туристичний офіс",
  "en": "tourist office",
  "pos": "noun",
  "gender": "m",
  "plural": "gli uffici turistici",
  "group": 7,
  "example": "Dove si trova l'ufficio turistico?",
  "lesson": "L33"
 },
 {
  "id": "w786",
  "it": "indicare",
  "ru": "показывать (дорогу), указывать",
  "uk": "показувати (дорогу), вказувати",
  "en": "to show, to point out",
  "pos": "verb",
  "aux": "avere",
  "participle": "indicato",
  "group": 7,
  "example": "Scusi, potrebbe indicarmi l'ufficio turistico?",
  "lesson": "L33"
 },
 {
  "id": "w787",
  "it": "Le dispiacerebbe + inf.?",
  "ru": "Вас не затруднит…? (вежливо)",
  "uk": "Вам не важко було б…? (ввічливо)",
  "en": "Would you mind…? (polite)",
  "pos": "expression",
  "base": "w236",
  "group": 4,
  "example": "Scusi, Le dispiacerebbe non fumare?",
  "lesson": "L33"
 },
 {
  "id": "w788",
  "it": "sarebbe così gentile da + inf.?",
  "ru": "не будете ли Вы так любезны…?",
  "uk": "чи не були б Ви такі люб'язні…?",
  "en": "would you be so kind as to…?",
  "pos": "expression",
  "base": "w334",
  "group": 4,
  "example": "Sarebbe così gentile da ripetere più lentamente?",
  "lesson": "L33"
 },
 {
  "id": "w789",
  "it": "saprebbe dirmi…?",
  "ru": "не подскажете…? (вежливо)",
  "uk": "чи не підкажете…? (ввічливо)",
  "en": "could you tell me…? (polite)",
  "pos": "expression",
  "group": 7,
  "example": "Scusi, saprebbe dirmi che ore sono?",
  "lesson": "L33"
 },
 {
  "id": "w790",
  "it": "che ore sono? / che ora è?",
  "ru": "который час?",
  "uk": "котра година?",
  "en": "what time is it?",
  "pos": "expression",
  "group": 12,
  "example": "Scusi, saprebbe dirmi che ore sono?",
  "lesson": "L33"
 },
 {
  "id": "w791",
  "it": "il museo",
  "ru": "музей",
  "uk": "музей",
  "en": "museum",
  "pos": "noun",
  "gender": "m",
  "plural": "i musei",
  "group": 7,
  "example": "Potrebbe dirmi dov'è il Museo Archeologico?",
  "lesson": "L33"
 },
 {
  "id": "w792",
  "it": "ripetere",
  "ru": "повторять",
  "uk": "повторювати",
  "en": "to repeat",
  "pos": "verb",
  "aux": "avere",
  "participle": "ripetuto",
  "group": 11,
  "example": "Potrebbe ripetere, per favore?",
  "lesson": "L33"
 },
 {
  "id": "w793",
  "it": "risolvere",
  "ru": "решать (проблему)",
  "uk": "розв'язувати (проблему)",
  "en": "to solve",
  "pos": "verb",
  "aux": "avere",
  "participle": "risolto",
  "irregular": "причастие",
  "group": 11,
  "example": "Gli altri danno consigli su come risolvere il problema.",
  "lesson": "L33"
 },
 {
  "id": "w794",
  "it": "consigliare",
  "ru": "советовать",
  "uk": "радити",
  "en": "to advise, to recommend",
  "pos": "verb",
  "aux": "avere",
  "participle": "consigliato",
  "group": 11,
  "example": "Ti consiglierei di venire a maggio.",
  "lesson": "L33"
 },
 {
  "id": "w795",
  "it": "ricordare",
  "ru": "помнить; запоминать",
  "uk": "пам'ятати; запам'ятовувати",
  "en": "to remember",
  "pos": "verb",
  "aux": "avere",
  "participle": "ricordato",
  "group": 11,
  "example": "Non riesco a ricordare le parole nuove.",
  "lesson": "L33"
 },
 {
  "id": "w796",
  "it": "il capo",
  "ru": "начальник",
  "uk": "начальник",
  "en": "boss",
  "pos": "noun",
  "gender": "m",
  "plural": "i capi",
  "group": 11,
  "example": "Il mio capo mi fa lavorare troppo.",
  "lesson": "L33"
 },
 {
  "id": "w797",
  "it": "il mezzo (di trasporto)",
  "ru": "транспорт, средство передвижения",
  "uk": "транспорт, засіб пересування",
  "en": "means of transport",
  "pos": "noun",
  "gender": "m",
  "plural": "i mezzi",
  "group": 7,
  "example": "Con che mezzo vieni? — In treno.",
  "lesson": "L33"
 },
 {
  "id": "w798",
  "it": "dappertutto",
  "ru": "везде, повсюду",
  "uk": "скрізь, усюди",
  "en": "everywhere",
  "pos": "adverb",
  "group": 12,
  "example": "In centro potresti andare dappertutto a piedi.",
  "lesson": "L33"
 },
 {
  "id": "w799",
  "it": "il battello",
  "ru": "кораблик, теплоход",
  "uk": "кораблик, теплохід",
  "en": "boat (on a lake)",
  "pos": "noun",
  "gender": "m",
  "plural": "i battelli",
  "group": 8,
  "example": "Faresti un giro in battello sul lago.",
  "lesson": "L33"
 },
 {
  "id": "w800",
  "it": "i dolci",
  "ru": "сладости, десерты",
  "uk": "солодощі, десерти",
  "en": "sweets, desserts",
  "pos": "noun",
  "gender": "m",
  "plural": "sing.: il dolce",
  "group": 6,
  "example": "Mangerei meno dolci.",
  "lesson": "L33"
 }
]
```

## Шаг 2. Грамматика «Uso del condizionale» — `src/content/a2/{ru,uk,en}/lezioni.json`, урок `g5-condizionale-uso`
2a. `tables[3]` («2. Chiedere qualcosa in modo gentile»): добавить в конец `items`:
```json
{
 "ru": [
  {
   "a": "Scusi, saprebbe dirmi dov'è il Museo Archeologico?",
   "tr": "Извините, не подскажете, где Археологический музей?"
  },
  {
   "a": "Scusi, Le dispiacerebbe non fumare?",
   "tr": "Извините, Вас не затруднит не курить?"
  }
 ],
 "uk": [
  {
   "a": "Scusi, saprebbe dirmi dov'è il Museo Archeologico?",
   "tr": "Вибачте, чи не підкажете, де Археологічний музей?"
  },
  {
   "a": "Scusi, Le dispiacerebbe non fumare?",
   "tr": "Вибачте, Вам не важко було б не курити?"
  }
 ],
 "en": [
  {
   "a": "Scusi, saprebbe dirmi dov'è il Museo Archeologico?",
   "tr": "Excuse me, could you tell me where the Archaeological Museum is?"
  },
  {
   "a": "Scusi, Le dispiacerebbe non fumare?",
   "tr": "Excuse me, would you mind not smoking?"
  }
 ]
}
```
2b. `tables[4]` (формулы сразу после него — там сейчас «Potresti / Potrebbe + infinito?», «Mi daresti…», «Vorrei…»): добавить в конец `items`:
```json
{
 "ru": [
  {
   "a": "Saprebbe dirmi…?",
   "tr": "Не подскажете…?"
  },
  {
   "a": "Le dispiacerebbe + infinito?",
   "tr": "Вас не затруднит…?"
  },
  {
   "a": "Sarebbe così gentile da + infinito?",
   "tr": "Не будете ли Вы так любезны…?"
  },
  {
   "a": "Vorrei sapere…",
   "tr": "Я хотел бы узнать…"
  }
 ],
 "uk": [
  {
   "a": "Saprebbe dirmi…?",
   "tr": "Чи не підкажете…?"
  },
  {
   "a": "Le dispiacerebbe + infinito?",
   "tr": "Вам не важко було б…?"
  },
  {
   "a": "Sarebbe così gentile da + infinito?",
   "tr": "Чи не були б Ви такі люб'язні…?"
  },
  {
   "a": "Vorrei sapere…",
   "tr": "Я хотів би дізнатися…"
  }
 ],
 "en": [
  {
   "a": "Saprebbe dirmi…?",
   "tr": "Could you tell me…?"
  },
  {
   "a": "Le dispiacerebbe + infinito?",
   "tr": "Would you mind…?"
  },
  {
   "a": "Sarebbe così gentile da + infinito?",
   "tr": "Would you be so kind as to…?"
  },
  {
   "a": "Vorrei sapere…",
   "tr": "I'd like to know…"
  }
 ]
}
```
и добавить этой таблице поле `note` (сейчас его нет):
```json
{
 "ru": "{{dispiacere}} работает как {{piacere}}: {{Ti dispiacerebbe…?}} (tu) · {{Le dispiacerebbe…?}} (Lei) · {{Vi dispiacerebbe…?}} (voi).",
 "uk": "{{dispiacere}} працює як {{piacere}}: {{Ti dispiacerebbe…?}} (tu) · {{Le dispiacerebbe…?}} (Lei) · {{Vi dispiacerebbe…?}} (voi).",
 "en": "{{dispiacere}} works like {{piacere}}: {{Ti dispiacerebbe…?}} (tu) · {{Le dispiacerebbe…?}} (Lei) · {{Vi dispiacerebbe…?}} (voi)."
}
```
2c. Добавить в конец `mistakes`:
```json
{
 "ru": [
  {
   "wrong": "Scusi, saprebbe dov'è il museo?",
   "right": "Scusi, saprebbe dirmi dov'è il museo?",
   "why": "вежливая формула — {{saprebbe dirmi…?}} («не подскажете…?»)"
  },
  {
   "wrong": "Dové il museo?",
   "right": "Dov'è il museo?",
   "why": "{{dov'è}} = {{dove}} + {{è}}: апостроф и {{è}}"
  }
 ],
 "uk": [
  {
   "wrong": "Scusi, saprebbe dov'è il museo?",
   "right": "Scusi, saprebbe dirmi dov'è il museo?",
   "why": "ввічлива формула — {{saprebbe dirmi…?}} («чи не підкажете…?»)"
  },
  {
   "wrong": "Dové il museo?",
   "right": "Dov'è il museo?",
   "why": "{{dov'è}} = {{dove}} + {{è}}: апостроф і {{è}}"
  }
 ],
 "en": [
  {
   "wrong": "Scusi, saprebbe dov'è il museo?",
   "right": "Scusi, saprebbe dirmi dov'è il museo?",
   "why": "the polite formula is {{saprebbe dirmi…?}} (“could you tell me…?”)"
  },
  {
   "wrong": "Dové il museo?",
   "right": "Dov'è il museo?",
   "why": "{{dov'è}} = {{dove}} + {{è}}: apostrophe and {{è}}"
  }
 ]
}
```

## Шаг 3. Упражнения — `src/content/a2/esercizi.json`
В конец `items` набора `"topic": "g5-condizionale-uso"` (станет 64). `answer` у choice = 0 — порядок плеер перемешивает сам:
```json
[
 {
  "id": "cu-48",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Спроси у прохожего, как пройти к Археологическому музею.",
   "uk": "Запитай перехожого, як дійти до Археологічного музею.",
   "en": "Ask a passer-by how to get to the Archaeological Museum."
  },
  "situationIt": "Chiedi a un passante come arrivare al Museo Archeologico.",
  "options": [
   "Scusi, potrebbe dirmi come arrivare al museo?",
   "Scusa, puoi dirmi come arrivare al museo?",
   "Dimmi come arrivare al museo!"
  ],
  "answer": 0,
  "why": {
   "ru": "Прохожий — незнакомый → Lei: potrebbe.",
   "uk": "Перехожий — незнайомий → Lei: potrebbe.",
   "en": "A passer-by is a stranger → Lei: potrebbe."
  },
  "tr": {
   "ru": "Извините, не могли бы Вы сказать, как дойти до музея?",
   "uk": "Вибачте, чи не могли б Ви сказати, як дійти до музею?",
   "en": "Excuse me, could you tell me how to get to the museum?"
  }
 },
 {
  "id": "cu-49",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Спроси время у прохожего.",
   "uk": "Запитай час у перехожого.",
   "en": "Ask a passer-by the time."
  },
  "situationIt": "Chiedi l'ora a un passante.",
  "options": [
   "Scusi, saprebbe dirmi che ore sono?",
   "Scusi, saprebbe che ore sono?",
   "Scusi, sapresti dirmi che ore sono?"
  ],
  "answer": 0,
  "why": {
   "ru": "Вежливая формула — saprebbe dirmi…? Прохожий → Lei (не sapresti).",
   "uk": "Ввічлива формула — saprebbe dirmi…? Перехожий → Lei (не sapresti).",
   "en": "The polite formula is saprebbe dirmi…? A passer-by → Lei (not sapresti)."
  },
  "tr": {
   "ru": "Извините, не подскажете, который час?",
   "uk": "Вибачте, чи не підкажете, котра година?",
   "en": "Excuse me, could you tell me what time it is?"
  }
 },
 {
  "id": "cu-50",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Попроси соседей (voi) не шуметь.",
   "uk": "Попроси сусідів (voi) не шуміти.",
   "en": "Ask your neighbours (voi) to be quiet."
  },
  "situationIt": "Chiedi ai tuoi vicini (voi) di fare silenzio.",
  "options": [
   "Scusate, potreste fare un po' di silenzio?",
   "Scusate, potrebbe fare un po' di silenzio?",
   "Fate silenzio!"
  ],
  "answer": 0,
  "why": {
   "ru": "Несколько соседей → voi: potreste.",
   "uk": "Кілька сусідів → voi: potreste.",
   "en": "Several neighbours → voi: potreste."
  },
  "tr": {
   "ru": "Извините, не могли бы вы немного потише?",
   "uk": "Вибачте, чи не могли б ви трохи тихіше?",
   "en": "Excuse me, could you be a bit quieter?"
  }
 },
 {
  "id": "cu-51",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Попроси учителя (Lei) говорить медленнее.",
   "uk": "Попроси вчителя (Lei) говорити повільніше.",
   "en": "Ask the teacher (Lei) to speak more slowly."
  },
  "situationIt": "Chiedi all'insegnante (Lei) di parlare più lentamente.",
  "options": [
   "Le dispiacerebbe parlare più lentamente?",
   "Ti dispiacerebbe parlare più lentamente?",
   "Vi dispiacerebbe parlare più lentamente?"
  ],
  "answer": 0,
  "why": {
   "ru": "Учитель → Lei: Le dispiacerebbe…? (Ti — для tu, Vi — для voi.)",
   "uk": "Учитель → Lei: Le dispiacerebbe…? (Ti — для tu, Vi — для voi.)",
   "en": "The teacher → Lei: Le dispiacerebbe…? (Ti is for tu, Vi for voi.)"
  },
  "tr": {
   "ru": "Вас не затруднит говорить медленнее?",
   "uk": "Вам не важко було б говорити повільніше?",
   "en": "Would you mind speaking more slowly?"
  }
 },
 {
  "id": "cu-52",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Попроси соседа по столику (Lei) не курить.",
   "uk": "Попроси сусіда за столиком (Lei) не курити.",
   "en": "Ask the person at the next table (Lei) not to smoke."
  },
  "situationIt": "Chiedi al vicino di tavolo (Lei) di non fumare.",
  "options": [
   "Scusi, sarebbe così gentile da non fumare?",
   "Scusi, saresti così gentile da non fumare?",
   "Scusi, sarà così gentile da non fumare?"
  ],
  "answer": 0,
  "why": {
   "ru": "Незнакомый → Lei: sarebbe così gentile da + инф. (sarà — futuro).",
   "uk": "Незнайомий → Lei: sarebbe così gentile da + інф. (sarà — futuro).",
   "en": "A stranger → Lei: sarebbe così gentile da + inf. (sarà is the futuro)."
  },
  "tr": {
   "ru": "Извините, не будете ли Вы так любезны не курить?",
   "uk": "Вибачте, чи не були б Ви такі люб'язні не курити?",
   "en": "Excuse me, would you be so kind as not to smoke?"
  }
 },
 {
  "id": "cu-53",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Спроси у прохожего, где находится туристический офис.",
   "uk": "Запитай перехожого, де туристичний офіс.",
   "en": "Ask a passer-by where the tourist office is."
  },
  "situationIt": "Chiedi a un passante dove si trova l'ufficio turistico.",
  "options": [
   "Scusi, saprebbe dirmi dove si trova l'ufficio turistico?",
   "Scusi, saprà dirmi dove si trova l'ufficio turistico?",
   "Scusa, sai dove si trova l'ufficio turistico?"
  ],
  "answer": 0,
  "why": {
   "ru": "saprà — futuro, sai — на «ты». Прохожий → Lei: saprebbe.",
   "uk": "saprà — futuro, sai — на «ти». Перехожий → Lei: saprebbe.",
   "en": "saprà is the futuro, sai is informal. A passer-by → Lei: saprebbe."
  },
  "tr": {
   "ru": "Извините, не подскажете, где находится туристический офис?",
   "uk": "Вибачте, чи не підкажете, де туристичний офіс?",
   "en": "Excuse me, could you tell me where the tourist office is?"
  }
 },
 {
  "id": "cu-54",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Друг не может запомнить новые слова. Дай ему совет.",
   "uk": "Друг не може запам'ятати нові слова. Дай йому пораду.",
   "en": "A friend can't remember new words. Give him advice."
  },
  "situationIt": "Un amico non riesce a ricordare le parole nuove. Dagli un consiglio.",
  "options": [
   "Dovresti ripeterle ogni giorno.",
   "Dovrai ripeterle ogni giorno.",
   "Hai dovuto ripeterle ogni giorno."
  ],
  "answer": 0,
  "why": {
   "ru": "Совет → condizionale: dovresti.",
   "uk": "Порада → condizionale: dovresti.",
   "en": "Advice → condizionale: dovresti."
  },
  "tr": {
   "ru": "Тебе стоило бы повторять их каждый день.",
   "uk": "Тобі варто було б повторювати їх щодня.",
   "en": "You should repeat them every day."
  }
 },
 {
  "id": "cu-55",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Начальник подруги заставляет её слишком много работать. Дай совет: «на твоём месте…»",
   "uk": "Начальник подруги змушує її забагато працювати. Дай пораду: «на твоєму місці…»",
   "en": "A friend's boss makes her work too much. Give advice: “if I were you…”"
  },
  "situationIt": "Il capo di un'amica la fa lavorare troppo. Dalle un consiglio: «al posto tuo…»",
  "options": [
   "Al posto tuo gli parlerei subito.",
   "Al posto tuo gli parlerò subito.",
   "Al posto tuo gli parlo subito."
  ],
  "answer": 0,
  "why": {
   "ru": "Al posto tuo + condizionale: parlerei.",
   "uk": "Al posto tuo + condizionale: parlerei.",
   "en": "Al posto tuo + condizionale: parlerei."
  },
  "tr": {
   "ru": "На твоём месте я бы сразу с ним поговорил.",
   "uk": "На твоєму місці я б одразу з ним поговорив.",
   "en": "If I were you, I'd talk to him right away."
  }
 },
 {
  "id": "cu-56",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Друг говорит: «Аренда слишком дорогая». Дай ему совет.",
   "uk": "Друг каже: «Оренда надто дорога». Дай йому пораду.",
   "en": "A friend says: “The rent is too expensive.” Give him advice."
  },
  "situationIt": "Un amico dice: «L'affitto è troppo caro». Dagli un consiglio.",
  "options": [
   "Potresti cercare un appartamento fuori città.",
   "Potrai cercare un appartamento fuori città.",
   "Hai potuto cercare un appartamento fuori città."
  ],
  "answer": 0,
  "why": {
   "ru": "Совет-идея → potresti + инфинитив.",
   "uk": "Порада-ідея → potresti + інфінітив.",
   "en": "Suggestion → potresti + infinitive."
  },
  "tr": {
   "ru": "Ты мог бы поискать квартиру за городом.",
   "uk": "Ти міг би пошукати квартиру за містом.",
   "en": "You could look for a flat outside town."
  }
 },
 {
  "id": "cu-57",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "У подруги постоянно болит голова. Дай ей совет.",
   "uk": "У подруги постійно болить голова. Дай їй пораду.",
   "en": "A friend always has a headache. Give her advice."
  },
  "situationIt": "Un'amica ha sempre mal di testa. Dalle un consiglio.",
  "options": [
   "Dovresti andare dal medico.",
   "Dovevi andare dal medico.",
   "Dovrai andare dal medico."
  ],
  "answer": 0,
  "why": {
   "ru": "Совет сейчас → dovresti. dovevi — imperfetto, dovrai — futuro.",
   "uk": "Порада зараз → dovresti. dovevi — imperfetto, dovrai — futuro.",
   "en": "Advice now → dovresti. dovevi is imperfetto, dovrai is futuro."
  },
  "tr": {
   "ru": "Тебе стоило бы сходить к врачу.",
   "uk": "Тобі варто було б піти до лікаря.",
   "en": "You should go to the doctor."
  }
 },
 {
  "id": "cu-58",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Друг говорит: «Я поправился». Что бы ты сделал на его месте?",
   "uk": "Друг каже: «Я погладшав». Що б ти зробив на його місці?",
   "en": "A friend says: “I've put on weight.” What would you do in his place?"
  },
  "situationIt": "Un amico dice: «Sono ingrassato». Cosa faresti tu al suo posto?",
  "options": [
   "Io farei più sport e mangerei meno dolci.",
   "Io farò più sport e mangerò meno dolci.",
   "Io facevo più sport e mangiavo meno dolci."
  ],
  "answer": 0,
  "why": {
   "ru": "«Что бы ты сделал» → condizionale: farei, mangerei.",
   "uk": "«Що б ти зробив» → condizionale: farei, mangerei.",
   "en": "“What would you do” → condizionale: farei, mangerei."
  },
  "tr": {
   "ru": "Я бы больше занимался спортом и ел меньше сладкого.",
   "uk": "Я б більше займався спортом і їв менше солодкого.",
   "en": "I'd do more sport and eat fewer sweets."
  }
 },
 {
  "id": "cu-59",
  "type": "fill",
  "task": {
   "ru": "Сделай вопрос вежливым: поставь глагол в condizionale.",
   "uk": "Зроби питання ввічливим: постав дієслово в condizionale.",
   "en": "Make the question polite: put the verb in the condizionale."
  },
  "it": "Scusi, ___ dirmi che ore sono?",
  "hint": "sapere (Lei)",
  "answers": [
   "saprebbe"
  ],
  "why": {
   "ru": "sapere → sapr- + -ebbe (Lei).",
   "uk": "sapere → sapr- + -ebbe (Lei).",
   "en": "sapere → sapr- + -ebbe (Lei)."
  },
  "tr": {
   "ru": "Извините, не подскажете, который час?",
   "uk": "Вибачте, чи не підкажете, котра година?",
   "en": "Excuse me, could you tell me what time it is?"
  }
 },
 {
  "id": "cu-60",
  "type": "fill",
  "task": {
   "ru": "Сделай вопрос вежливым: поставь глагол в condizionale.",
   "uk": "Зроби питання ввічливим: постав дієслово в condizionale.",
   "en": "Make the question polite: put the verb in the condizionale."
  },
  "it": "Scusate, ___ fare un po' di silenzio?",
  "hint": "potere (voi)",
  "answers": [
   "potreste"
  ],
  "why": {
   "ru": "potere → potr- + -este (voi).",
   "uk": "potere → potr- + -este (voi).",
   "en": "potere → potr- + -este (voi)."
  },
  "tr": {
   "ru": "Извините, не могли бы вы немного потише?",
   "uk": "Вибачте, чи не могли б ви трохи тихіше?",
   "en": "Excuse me, could you be a bit quieter?"
  }
 },
 {
  "id": "cu-61",
  "type": "fill",
  "task": {
   "ru": "Сделай вопрос вежливым: поставь глагол в condizionale.",
   "uk": "Зроби питання ввічливим: постав дієслово в condizionale.",
   "en": "Make the question polite: put the verb in the condizionale."
  },
  "it": "Scusi, Le ___ non fumare?",
  "hint": "dispiacere",
  "answers": [
   "dispiacerebbe"
  ],
  "why": {
   "ru": "dispiacere как piacere: Le (Вам) + 3-е лицо — dispiacerebbe.",
   "uk": "dispiacere як piacere: Le (Вам) + 3-тя особа — dispiacerebbe.",
   "en": "dispiacere works like piacere: Le (to you) + 3rd person — dispiacerebbe."
  },
  "tr": {
   "ru": "Извините, Вас не затруднит не курить?",
   "uk": "Вибачте, Вам не важко було б не курити?",
   "en": "Excuse me, would you mind not smoking?"
  }
 },
 {
  "id": "cu-62",
  "type": "fill",
  "task": {
   "ru": "Сделай вопрос вежливым: поставь глагол в condizionale.",
   "uk": "Зроби питання ввічливим: постав дієслово в condizionale.",
   "en": "Make the question polite: put the verb in the condizionale."
  },
  "it": "Scusi, ___ così gentile da ripetere?",
  "hint": "essere (Lei)",
  "answers": [
   "sarebbe"
  ],
  "why": {
   "ru": "essere → sar- + -ebbe (Lei).",
   "uk": "essere → sar- + -ebbe (Lei).",
   "en": "essere → sar- + -ebbe (Lei)."
  },
  "tr": {
   "ru": "Извините, не будете ли Вы так любезны повторить?",
   "uk": "Вибачте, чи не були б Ви такі люб'язні повторити?",
   "en": "Excuse me, would you be so kind as to repeat?"
  }
 },
 {
  "id": "cu-63",
  "type": "fill",
  "task": {
   "ru": "Сделай вопрос вежливым: поставь глагол в condizionale.",
   "uk": "Зроби питання ввічливим: постав дієслово в condizionale.",
   "en": "Make the question polite: put the verb in the condizionale."
  },
  "it": "Vi ___ fare meno rumore?",
  "hint": "dispiacere",
  "answers": [
   "dispiacerebbe"
  ],
  "why": {
   "ru": "Vi (вам, voi) + dispiacerebbe — глагол всегда в 3-м лице.",
   "uk": "Vi (вам, voi) + dispiacerebbe — дієслово завжди в 3-й особі.",
   "en": "Vi (to you all) + dispiacerebbe — the verb is always 3rd person."
  },
  "tr": {
   "ru": "Вас не затруднит шуметь поменьше?",
   "uk": "Вам не важко було б шуміти менше?",
   "en": "Would you mind making less noise?"
  }
 },
 {
  "id": "cu-64",
  "type": "fill",
  "task": {
   "ru": "Сделай вопрос вежливым: поставь глагол в condizionale.",
   "uk": "Зроби питання ввічливим: постав дієслово в condizionale.",
   "en": "Make the question polite: put the verb in the condizionale."
  },
  "it": "___ sapere dove si trova l'ufficio turistico.",
  "hint": "volere (io)",
  "answers": [
   "vorrei"
  ],
  "why": {
   "ru": "volere → vorr- + -ei. Vorrei sapere… — вежливо «я хотел бы узнать».",
   "uk": "volere → vorr- + -ei. Vorrei sapere… — ввічливо «я хотів би дізнатися».",
   "en": "volere → vorr- + -ei. Vorrei sapere… is a polite “I'd like to know”."
  },
  "tr": {
   "ru": "Я хотел бы узнать, где находится туристический офис.",
   "uk": "Я хотів би дізнатися, де туристичний офіс.",
   "en": "I'd like to know where the tourist office is."
  }
 }
]
```

## Шаг 4. Тесты — только счётчики
- `tests/condizionale.spec.ts`: `"1 / 47"` → `"1 / 64"`.
- `tests/esercizi.spec.ts`: все `/ 47` → `/ 64`.
- `tests/tempi.spec.ts`: `"Studiati 0/2 · Esercizi 0/99"` → `"Studiati 0/2 · Esercizi 0/116"`.
Если ещё где-то жёстко записаны 47 / 99 для condizionale — поправить так же и указать в отчёте.

## Шаг 5. Проверка данных
- в vocab.json 796 слов (775 + 21), из них L33 — 21;
- forme 52, uso 64, всего condizionale 116;
- у всех 17 новых упражнений есть `tr`; у cu-48…cu-58 есть `situationIt`.

## Шаг 6. Проверки (по порядку, исправить ошибки)
```
node scripts/validate-content.mjs
npm run lint
npm run build
npm run test:layout
```

## Шаг 7. Коммит и push
```
git add scripts src tests docs/condizionale
git status
```
В списке не должно быть `docs/AUDIT*.md`. Затем:
```
git commit -m "Unità 9: domande gentili e consigli — parole L33, formule, 17 esercizi (uso 64)"
git push
```

## Шаг 8. Отчёт
Изменённые файлы, числа из шага 5, результаты 4 проверок, вывод `git status` и `git push`.
