# Задание L35: «Con questo tempo…» — 15 слов, 16 упражнений, новый блок 5 в «Uso» + коммит и push

Листок Unità 11, упр. A и B (желания в condizionale). Данные проверены валидатором (`node scripts/validate-content.mjs` → ok) на копии `94c35b5`. Вставляй **как есть**.

## Общие правила
- Соблюдай CLAUDE.md. Делай только то, что здесь написано.
- Сохраняй форматирование JSON (отступ 1 пробел, без перевода строки в конце). В diff — только добавленные строки.
- Коммит и push — только если все проверки шага 6 прошли.

## Шаг 1. Словарь — `src/content/a2/ru/vocab.json`
Добавить в конец `words` 15 слов (партия **L35**, w806–w820):
```json
[
 {
  "id": "w806",
  "it": "il tempaccio",
  "ru": "ужасная погода",
  "uk": "жахлива погода",
  "en": "awful weather",
  "pos": "noun",
  "gender": "m",
  "note": "-accio = плохой: tempo → tempaccio",
  "group": 9,
  "example": "Che tempaccio! Con questo tempo tornerei a letto.",
  "lesson": "L35"
 },
 {
  "id": "w807",
  "it": "fare quattro passi",
  "ru": "немного прогуляться",
  "uk": "трохи прогулятися",
  "en": "to go for a short walk",
  "pos": "expression",
  "aux": "avere",
  "participle": "fatto",
  "group": 1,
  "example": "Con questo tempo farei quattro passi.",
  "lesson": "L35"
 },
 {
  "id": "w808",
  "it": "prendere il sole",
  "ru": "загорать",
  "uk": "засмагати",
  "en": "to sunbathe",
  "pos": "expression",
  "aux": "avere",
  "participle": "preso",
  "base": "w057",
  "group": 8,
  "example": "Prenderei un caffè e prenderei il sole.",
  "lesson": "L35"
 },
 {
  "id": "w809",
  "it": "caldissimo",
  "ru": "очень жаркий",
  "uk": "дуже спекотний",
  "en": "very hot",
  "pos": "adjective",
  "forms": "caldissimo (м) – caldissima (ж) – caldissimi / caldissime (мн.)",
  "group": 9,
  "example": "È una giornata caldissima.",
  "lesson": "L35"
 },
 {
  "id": "w810",
  "it": "la sveglia",
  "ru": "будильник",
  "uk": "будильник",
  "en": "alarm clock",
  "pos": "noun",
  "gender": "f",
  "plural": "le sveglie",
  "group": 1,
  "example": "Sono le sette, suona la sveglia.",
  "lesson": "L35"
 },
 {
  "id": "w811",
  "it": "suonare",
  "ru": "звонить (о будильнике, звонке); играть (на инструменте)",
  "uk": "дзвонити (про будильник, дзвінок); грати (на інструменті)",
  "en": "to ring; to play (an instrument)",
  "pos": "verb",
  "aux": "avere",
  "participle": "suonato",
  "group": 1,
  "example": "Suona la sveglia.",
  "lesson": "L35"
 },
 {
  "id": "w812",
  "it": "rumoroso",
  "ru": "шумный",
  "uk": "галасливий",
  "en": "noisy",
  "pos": "adjective",
  "forms": "rumoroso (м) – rumorosa (ж) – rumorosi / rumorose (мн.)",
  "group": 7,
  "example": "La città è rumorosa e piena di smog.",
  "lesson": "L35"
 },
 {
  "id": "w813",
  "it": "pieno di",
  "ru": "полный (чего-то)",
  "uk": "повний (чогось)",
  "en": "full of",
  "pos": "adjective",
  "forms": "pieno (м) – piena (ж) – pieni / piene (мн.)",
  "group": 12,
  "example": "La città è piena di smog.",
  "lesson": "L35"
 },
 {
  "id": "w814",
  "it": "lo smog",
  "ru": "смог",
  "uk": "смог",
  "en": "smog",
  "pos": "noun",
  "gender": "m",
  "group": 9,
  "example": "La città è piena di smog.",
  "lesson": "L35"
 },
 {
  "id": "w815",
  "it": "l'aria",
  "ru": "воздух",
  "uk": "повітря",
  "en": "air",
  "pos": "noun",
  "gender": "f",
  "group": 9,
  "example": "Respirerei volentieri un po' d'aria pulita.",
  "lesson": "L35"
 },
 {
  "id": "w816",
  "it": "respirare",
  "ru": "дышать",
  "uk": "дихати",
  "en": "to breathe",
  "pos": "verb",
  "aux": "avere",
  "participle": "respirato",
  "group": 10,
  "example": "Respirerei volentieri un po' d'aria pulita.",
  "lesson": "L35"
 },
 {
  "id": "w817",
  "it": "pulito",
  "ru": "чистый",
  "uk": "чистий",
  "en": "clean",
  "pos": "adjective",
  "forms": "pulito (м) – pulita (ж) – puliti / pulite (мн.)",
  "group": 5,
  "example": "Respirerei un po' d'aria pulita.",
  "lesson": "L35"
 },
 {
  "id": "w818",
  "it": "la piscina",
  "ru": "бассейн",
  "uk": "басейн",
  "en": "swimming pool",
  "pos": "noun",
  "gender": "f",
  "plural": "le piscine",
  "group": 8,
  "example": "Vorrei andare in piscina.",
  "lesson": "L35"
 },
 {
  "id": "w819",
  "it": "il compleanno",
  "ru": "день рождения",
  "uk": "день народження",
  "en": "birthday",
  "pos": "noun",
  "gender": "m",
  "plural": "i compleanni",
  "group": 13,
  "example": "Domani è il vostro compleanno.",
  "lesson": "L35"
 },
 {
  "id": "w820",
  "it": "qualche + sing.",
  "ru": "несколько; какой-нибудь",
  "uk": "кілька; якийсь",
  "en": "some, a few",
  "pos": "adjective",
  "note": "после qualche — всегда ед. ч.: qualche amica, qualche giorno",
  "group": 12,
  "example": "Telefonerei a qualche amica.",
  "lesson": "L35"
 }
]
```

## Шаг 2. Упражнения — `src/content/a2/esercizi.json`, набор `"topic": "g5-condizionale-uso"`
2a. В конец `items` (станет 80). `answer` у choice = 0 — порядок плеер перемешивает сам:
```json
[
 {
  "id": "cu-65",
  "type": "fill",
  "task": {
   "ru": "Выбери желание: поставь глагол в condizionale.",
   "uk": "Вислови бажання: постав дієслово в condizionale.",
   "en": "Express a wish: put the verb in the condizionale."
  },
  "it": "Che bella giornata! Con questo tempo ___.",
  "hint": "uscire",
  "answers": [
   "uscirei"
  ],
  "why": {
   "ru": "-ire: uscir- + -ei.",
   "uk": "-ire: uscir- + -ei.",
   "en": "-ire: uscir- + -ei."
  },
  "tr": {
   "ru": "Какой прекрасный день! В такую погоду я бы вышел из дома.",
   "uk": "Який чудовий день! У таку погоду я б вийшов з дому.",
   "en": "What a lovely day! In this weather I'd go out."
  }
 },
 {
  "id": "cu-66",
  "type": "fill",
  "task": {
   "ru": "Выбери желание: поставь глагол в condizionale.",
   "uk": "Вислови бажання: постав дієслово в condizionale.",
   "en": "Express a wish: put the verb in the condizionale."
  },
  "it": "Che bella giornata! Con questo tempo ___ quattro passi.",
  "hint": "fare",
  "answers": [
   "farei"
  ],
  "why": {
   "ru": "fare → far- (a остаётся) + -ei.",
   "uk": "fare → far- (a лишається) + -ei.",
   "en": "fare → far- (keeps the a) + -ei."
  },
  "tr": {
   "ru": "Какой прекрасный день! В такую погоду я бы немного прогулялся.",
   "uk": "Який чудовий день! У таку погоду я б трохи прогулявся.",
   "en": "What a lovely day! In this weather I'd go for a short walk."
  }
 },
 {
  "id": "cu-67",
  "type": "fill",
  "task": {
   "ru": "Выбери желание: поставь глагол в condizionale.",
   "uk": "Вислови бажання: постав дієслово в condizionale.",
   "en": "Express a wish: put the verb in the condizionale."
  },
  "it": "Che bella giornata! Con questo tempo mi ___ al bar.",
  "hint": "fermarsi (io)",
  "answers": [
   "fermerei"
  ],
  "why": {
   "ru": "Возвратный: mi + fermer- + -ei.",
   "uk": "Зворотне: mi + fermer- + -ei.",
   "en": "Reflexive: mi + fermer- + -ei."
  },
  "tr": {
   "ru": "Какой прекрасный день! В такую погоду я бы зашёл в бар.",
   "uk": "Який чудовий день! У таку погоду я б зайшов у бар.",
   "en": "What a lovely day! In this weather I'd stop at a bar."
  }
 },
 {
  "id": "cu-68",
  "type": "fill",
  "task": {
   "ru": "Выбери желание: поставь глагол в condizionale.",
   "uk": "Вислови бажання: постав дієслово в condizionale.",
   "en": "Express a wish: put the verb in the condizionale."
  },
  "it": "Che bella giornata! Con questo tempo ___ un caffè e il sole.",
  "hint": "prendere",
  "answers": [
   "prenderei"
  ],
  "why": {
   "ru": "-ere: prender- + -ei.",
   "uk": "-ere: prender- + -ei.",
   "en": "-ere: prender- + -ei."
  },
  "tr": {
   "ru": "Какой прекрасный день! В такую погоду я бы выпил кофе и позагорал.",
   "uk": "Який чудовий день! У таку погоду я б випив кави й позасмагав.",
   "en": "What a lovely day! In this weather I'd have a coffee and sunbathe."
  }
 },
 {
  "id": "cu-69",
  "type": "fill",
  "task": {
   "ru": "Выбери желание: поставь глагол в condizionale.",
   "uk": "Вислови бажання: постав дієслово в condizionale.",
   "en": "Express a wish: put the verb in the condizionale."
  },
  "it": "Che tempaccio! Con questo tempo ___ a letto.",
  "hint": "tornare",
  "answers": [
   "tornerei"
  ],
  "why": {
   "ru": "-are: a → e: torner- + -ei.",
   "uk": "-are: a → e: torner- + -ei.",
   "en": "-are: a → e: torner- + -ei."
  },
  "tr": {
   "ru": "Какая ужасная погода! В такую погоду я бы вернулся в постель.",
   "uk": "Яка жахлива погода! У таку погоду я б повернувся в ліжко.",
   "en": "What awful weather! In this weather I'd go back to bed."
  }
 },
 {
  "id": "cu-70",
  "type": "fill",
  "task": {
   "ru": "Выбери желание: поставь глагол в condizionale.",
   "uk": "Вислови бажання: постав дієслово в condizionale.",
   "en": "Express a wish: put the verb in the condizionale."
  },
  "it": "Che tempaccio! Con questo tempo ___ un libro.",
  "hint": "leggere",
  "answers": [
   "leggerei"
  ],
  "why": {
   "ru": "-ere: legger- + -ei.",
   "uk": "-ere: legger- + -ei.",
   "en": "-ere: legger- + -ei."
  },
  "tr": {
   "ru": "Какая ужасная погода! В такую погоду я бы почитал книгу.",
   "uk": "Яка жахлива погода! У таку погоду я б почитав книжку.",
   "en": "What awful weather! In this weather I'd read a book."
  }
 },
 {
  "id": "cu-71",
  "type": "fill",
  "task": {
   "ru": "Выбери желание: поставь глагол в condizionale.",
   "uk": "Вислови бажання: постав дієслово в condizionale.",
   "en": "Express a wish: put the verb in the condizionale."
  },
  "it": "Che tempaccio! Con questo tempo ___ un film alla TV.",
  "hint": "guardare",
  "answers": [
   "guarderei"
  ],
  "why": {
   "ru": "-are: a → e: guarder- + -ei.",
   "uk": "-are: a → e: guarder- + -ei.",
   "en": "-are: a → e: guarder- + -ei."
  },
  "tr": {
   "ru": "Какая ужасная погода! В такую погоду я бы посмотрел фильм по телевизору.",
   "uk": "Яка жахлива погода! У таку погоду я б подивився фільм по телевізору.",
   "en": "What awful weather! In this weather I'd watch a film on TV."
  }
 },
 {
  "id": "cu-72",
  "type": "fill",
  "task": {
   "ru": "Выбери желание: поставь глагол в condizionale.",
   "uk": "Вислови бажання: постав дієслово в condizionale.",
   "en": "Express a wish: put the verb in the condizionale."
  },
  "it": "Che tempaccio! Con questo tempo ___ a qualche amica.",
  "hint": "telefonare",
  "answers": [
   "telefonerei"
  ],
  "why": {
   "ru": "-are: a → e: telefoner- + -ei.",
   "uk": "-are: a → e: telefoner- + -ei.",
   "en": "-are: a → e: telefoner- + -ei."
  },
  "tr": {
   "ru": "Какая ужасная погода! В такую погоду я бы позвонила какой-нибудь подруге.",
   "uk": "Яка жахлива погода! У таку погоду я б подзвонила якійсь подрузі.",
   "en": "What awful weather! In this weather I'd call a friend or two."
  }
 },
 {
  "id": "cu-73",
  "type": "fill",
  "task": {
   "ru": "Выбери желание: поставь глагол в condizionale.",
   "uk": "Вислови бажання: постав дієслово в condizionale.",
   "en": "Express a wish: put the verb in the condizionale."
  },
  "it": "Che tempaccio! Con questo tempo mi ___ un po'.",
  "hint": "rilassarsi (io)",
  "answers": [
   "rilasserei"
  ],
  "why": {
   "ru": "Возвратный: mi + rilasser- + -ei.",
   "uk": "Зворотне: mi + rilasser- + -ei.",
   "en": "Reflexive: mi + rilasser- + -ei."
  },
  "tr": {
   "ru": "Какая ужасная погода! В такую погоду я бы немного расслабился.",
   "uk": "Яка жахлива погода! У таку погоду я б трохи розслабився.",
   "en": "What awful weather! In this weather I'd relax a little."
  }
 },
 {
  "id": "cu-74",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери желание.",
   "uk": "Прочитай ситуацію та обери бажання.",
   "en": "Read the situation and choose the wish."
  },
  "situation": {
   "ru": "В офисе много работы.",
   "uk": "В офісі багато роботи.",
   "en": "There's a lot of work to do at the office."
  },
  "situationIt": "In ufficio c'è molto lavoro da fare.",
  "options": [
   "Farei volentieri una pausa.",
   "Faccio volentieri una pausa.",
   "Farò volentieri una pausa."
  ],
  "answer": 0,
  "why": {
   "ru": "Желание → condizionale: farei. faccio — presente, farò — futuro.",
   "uk": "Бажання → condizionale: farei. faccio — presente, farò — futuro.",
   "en": "A wish → condizionale: farei. faccio is presente, farò is futuro."
  },
  "tr": {
   "ru": "Я бы с удовольствием сделал перерыв.",
   "uk": "Я б охоче зробив перерву.",
   "en": "I'd gladly take a break."
  }
 },
 {
  "id": "cu-75",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери желание.",
   "uk": "Прочитай ситуацію та обери бажання.",
   "en": "Read the situation and choose the wish."
  },
  "situation": {
   "ru": "Семь часов, звонит будильник.",
   "uk": "Сьома година, дзвонить будильник.",
   "en": "It's seven o'clock, the alarm is ringing."
  },
  "situationIt": "Sono le sette, suona la sveglia.",
  "options": [
   "Vorrei dormire ancora un po'.",
   "Volevo dormire ancora un po'.",
   "Vorrò dormire ancora un po'."
  ],
  "answer": 0,
  "why": {
   "ru": "Желание сейчас → vorrei. volevo — imperfetto, vorrò — futuro.",
   "uk": "Бажання зараз → vorrei. volevo — imperfetto, vorrò — futuro.",
   "en": "A wish now → vorrei. volevo is imperfetto, vorrò is futuro."
  },
  "tr": {
   "ru": "Я бы хотел поспать ещё немного.",
   "uk": "Я б хотів поспати ще трохи.",
   "en": "I'd like to sleep a bit longer."
  }
 },
 {
  "id": "cu-76",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери желание.",
   "uk": "Прочитай ситуацію та обери бажання.",
   "en": "Read the situation and choose the wish."
  },
  "situation": {
   "ru": "Город шумный и полон смога.",
   "uk": "Місто галасливе й повне смогу.",
   "en": "The city is noisy and full of smog."
  },
  "situationIt": "La città è rumorosa e piena di smog.",
  "options": [
   "Respirerei volentieri un po' d'aria pulita.",
   "Respiro volentieri un po' d'aria pulita.",
   "Ho respirato volentieri un po' d'aria pulita."
  ],
  "answer": 0,
  "why": {
   "ru": "Желание → condizionale: respirerei.",
   "uk": "Бажання → condizionale: respirerei.",
   "en": "A wish → condizionale: respirerei."
  },
  "tr": {
   "ru": "Я бы с удовольствием подышал чистым воздухом.",
   "uk": "Я б охоче подихав чистим повітрям.",
   "en": "I'd gladly breathe some clean air."
  }
 },
 {
  "id": "cu-77",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери желание.",
   "uk": "Прочитай ситуацію та обери бажання.",
   "en": "Read the situation and choose the wish."
  },
  "situation": {
   "ru": "Друзья уезжают на выходные на море.",
   "uk": "Друзі їдуть на вихідні на море.",
   "en": "Your friends are leaving for a weekend at the seaside."
  },
  "situationIt": "Gli amici partono per un fine settimana al mare.",
  "options": [
   "Andrei volentieri anch'io.",
   "Andavo volentieri anch'io.",
   "Andrò volentieri anch'io."
  ],
  "answer": 0,
  "why": {
   "ru": "Желание → andrei. andavo — imperfetto, andrò — futuro.",
   "uk": "Бажання → andrei. andavo — imperfetto, andrò — futuro.",
   "en": "A wish → andrei. andavo is imperfetto, andrò is futuro."
  },
  "tr": {
   "ru": "Я бы тоже с удовольствием поехал.",
   "uk": "Я б теж охоче поїхав.",
   "en": "I'd gladly go too."
  }
 },
 {
  "id": "cu-78",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери желание.",
   "uk": "Прочитай ситуацію та обери бажання.",
   "en": "Read the situation and choose the wish."
  },
  "situation": {
   "ru": "Через несколько недель начинаются каникулы.",
   "uk": "За кілька тижнів починаються канікули.",
   "en": "The holidays start in a few weeks."
  },
  "situationIt": "Fra poche settimane cominciano le vacanze.",
  "options": [
   "Visiterei volentieri la Sicilia.",
   "Visiterò volentieri la Sicilia.",
   "Ho visitato volentieri la Sicilia."
  ],
  "answer": 0,
  "why": {
   "ru": "Желание, а не план → condizionale: visiterei.",
   "uk": "Бажання, а не план → condizionale: visiterei.",
   "en": "A wish, not a plan → condizionale: visiterei."
  },
  "tr": {
   "ru": "Я бы с удовольствием посетил Сицилию.",
   "uk": "Я б охоче відвідав Сицилію.",
   "en": "I'd gladly visit Sicily."
  }
 },
 {
  "id": "cu-79",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери желание.",
   "uk": "Прочитай ситуацію та обери бажання.",
   "en": "Read the situation and choose the wish."
  },
  "situation": {
   "ru": "Завтра ваш день рождения. Ответьте от «мы».",
   "uk": "Завтра ваш день народження. Відповідайте від «ми».",
   "en": "Tomorrow is your birthday. Answer with «noi»."
  },
  "situationIt": "Domani è il vostro compleanno. Rispondete con «noi».",
  "options": [
   "Vorremmo fare una festa.",
   "Vorreste fare una festa.",
   "Vorremo fare una festa."
  ],
  "answer": 0,
  "why": {
   "ru": "vostro → отвечаем noi: -emmo (две m). vorremo — futuro, vorreste — voi.",
   "uk": "vostro → відповідаємо noi: -emmo (дві m). vorremo — futuro, vorreste — voi.",
   "en": "vostro → answer with noi: -emmo (double m). vorremo is futuro, vorreste is voi."
  },
  "tr": {
   "ru": "Мы бы хотели устроить праздник.",
   "uk": "Ми б хотіли влаштувати свято.",
   "en": "We'd like to have a party."
  }
 },
 {
  "id": "cu-80",
  "type": "fill",
  "task": {
   "ru": "Выбери желание: поставь глагол в condizionale.",
   "uk": "Вислови бажання: постав дієслово в condizionale.",
   "en": "Express a wish: put the verb in the condizionale."
  },
  "it": "Domani è il nostro compleanno: ___ volentieri tutti gli amici.",
  "hint": "invitare (noi)",
  "answers": [
   "inviteremmo"
  ],
  "why": {
   "ru": "noi → -emmo (две m): inviter- + -emmo.",
   "uk": "noi → -emmo (дві m): inviter- + -emmo.",
   "en": "noi → -emmo (double m): inviter- + -emmo."
  },
  "tr": {
   "ru": "Завтра наш день рождения: мы бы с удовольствием пригласили всех друзей.",
   "uk": "Завтра наш день народження: ми б охоче запросили всіх друзів.",
   "en": "Tomorrow is our birthday: we'd gladly invite all our friends."
  }
 }
]
```
2b. В конец массива `blocchi` этого набора добавить **блок 5** (16 упражнений):
```json
{
 "id": "5",
 "titolo": {
  "it": "Con questo tempo… Desideri",
  "ru": "В такую погоду… Желания в ситуациях",
  "uk": "У таку погоду… Бажання в ситуаціях",
  "en": "In this weather… Wishes in situations"
 },
 "items": [
  "cu-65",
  "cu-66",
  "cu-67",
  "cu-68",
  "cu-69",
  "cu-70",
  "cu-71",
  "cu-72",
  "cu-73",
  "cu-74",
  "cu-75",
  "cu-76",
  "cu-77",
  "cu-78",
  "cu-79",
  "cu-80"
 ]
}
```

## Шаг 3. Тесты
- `tests/esercizi.spec.ts`, тест «argomento uso: i 4 blocchi prima della spiegazione»: теперь **5** блоков (название теста и ожидаемое число).
- `tests/tempi.spec.ts`: `"Studiati 0/2 · Esercizi 0/116"` → `"Studiati 0/2 · Esercizi 0/132"`.
- Если ещё где-то жёстко записаны 4 блока uso / 64 / 116 — поправить так же и указать в отчёте.

## Шаг 4. Проверка данных
- vocab.json: 816 слов (801 + 15), L35 — 15;
- uso: 80 упражнений, блоки 9 · 20 · 17 · 18 · 16; всего condizionale 132;
- у всех 16 новых упражнений есть `tr`; у cu-74…cu-79 есть `situationIt`.

## Шаг 5. Посмотреть глазами
`npm run dev` → `/a2/esercizi/uso-del-condizionale/5`: «Blocco 5 di 5», 1 / 16. Блок 4 в конце показывает «Blocco successivo →» на блок 5.

## Шаг 6. Проверки (по порядку, исправить ошибки)
```
node scripts/validate-content.mjs
npm run lint
npm run build
npm run test:layout
```

## Шаг 7. Коммит и push
```
git add src tests docs/condizionale
git status
```
Без `docs/AUDIT*.md`. Затем:
```
git commit -m "Unità 9: Con questo tempo… — parole L35, blocco 5 (16 esercizi, uso 80)"
git push
```

## Шаг 8. Отчёт
Изменённые файлы, числа из шага 4, результаты 4 проверок, вывод `git push`.
