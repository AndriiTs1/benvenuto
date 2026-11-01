# Задание L32: листки «Cosa faresti?» — словарь, диалог, 27 упражнений + коммит и push

Весь контент ниже уже проверен валидатором (`node scripts/validate-content.mjs` → ok) на копии репозитория `d94f6cc`.
Ничего не придумывай и не переводи сам — вставляй данные **как есть**.

## Общие правила
- Соблюдай CLAUDE.md. Делай только то, что здесь написано.
- Сохраняй форматирование JSON (отступ 1 пробел, без перевода строки в конце, порядок ключей). В diff — только добавленные строки.
- Коммит и push — только если все проверки шага 6 прошли.

## Шаг 1. Словарь — `src/content/a2/ru/vocab.json`
Добавить в конец массива `words` 32 слова (партия **L32**, w748–w779):

```json
[
 {
  "id": "w748",
  "it": "il concorrente",
  "ru": "участник (игры, конкурса)",
  "uk": "учасник (гри, конкурсу)",
  "en": "contestant",
  "pos": "noun",
  "gender": "m",
  "plural": "i concorrenti",
  "group": 11,
  "example": "Un concorrente ha vinto 150.000 euro.",
  "lesson": "L32"
 },
 {
  "id": "w749",
  "it": "beato lui! / beata lei!",
  "ru": "везёт же ему! / ей!",
  "uk": "щастить же йому! / їй!",
  "en": "lucky him! / lucky her!",
  "pos": "expression",
  "group": 4,
  "example": "Beato lui! Sarebbe bello vincere così tanti soldi.",
  "lesson": "L32"
 },
 {
  "id": "w750",
  "it": "almeno",
  "ru": "хотя бы, по крайней мере",
  "uk": "хоча б, принаймні",
  "en": "at least",
  "pos": "adverb",
  "group": 12,
  "example": "Viaggerei almeno un anno intero.",
  "lesson": "L32"
 },
 {
  "id": "w751",
  "it": "intero",
  "ru": "целый",
  "uk": "цілий",
  "en": "whole, entire",
  "pos": "adjective",
  "forms": "intero (м) – intera (ж) – interi / intere (мн.)",
  "group": 12,
  "example": "Viaggerei almeno un anno intero.",
  "lesson": "L32"
 },
 {
  "id": "w752",
  "it": "smettere di + inf.",
  "ru": "перестать, бросить (что-то делать)",
  "uk": "перестати, кинути (щось робити)",
  "en": "to stop (doing)",
  "pos": "verb",
  "aux": "avere",
  "participle": "smesso",
  "irregular": "причастие",
  "group": 1,
  "example": "Smetterei di lavorare e mi dedicherei allo studio.",
  "lesson": "L32"
 },
 {
  "id": "w753",
  "it": "dedicarsi a",
  "ru": "посвятить себя (чему-то)",
  "uk": "присвятити себе (чомусь)",
  "en": "to devote oneself to",
  "pos": "verb",
  "aux": "essere",
  "participle": "dedicato",
  "group": 11,
  "example": "Mi dedicherei allo studio.",
  "lesson": "L32"
 },
 {
  "id": "w754",
  "it": "magari",
  "ru": "может быть; хорошо бы",
  "uk": "можливо; добре було б",
  "en": "maybe; if only",
  "pos": "adverb",
  "group": 12,
  "example": "Preferirei restare in Europa, magari in Spagna.",
  "lesson": "L32"
 },
 {
  "id": "w755",
  "it": "il costo della vita",
  "ru": "стоимость жизни",
  "uk": "вартість життя",
  "en": "cost of living",
  "pos": "noun",
  "gender": "m",
  "group": 7,
  "example": "Là il costo della vita è molto più basso.",
  "lesson": "L32"
 },
 {
  "id": "w756",
  "it": "altrimenti",
  "ru": "иначе",
  "uk": "інакше",
  "en": "otherwise",
  "pos": "conjunction",
  "group": 12,
  "example": "Adesso non hanno soldi, altrimenti tornerebbero in Africa.",
  "lesson": "L32"
 },
 {
  "id": "w757",
  "it": "la gara",
  "ru": "соревнование, гонка",
  "uk": "змагання, перегони",
  "en": "race, competition",
  "pos": "noun",
  "gender": "f",
  "plural": "le gare",
  "group": 1,
  "example": "Con una moto migliore vinceresti tutte le gare.",
  "lesson": "L32"
 },
 {
  "id": "w758",
  "it": "fare il bagno",
  "ru": "купаться",
  "uk": "купатися",
  "en": "to have a swim; to take a bath",
  "pos": "expression",
  "aux": "avere",
  "participle": "fatto",
  "group": 8,
  "example": "Faremmo il bagno al mare tutti i giorni.",
  "lesson": "L32"
 },
 {
  "id": "w759",
  "it": "ottimo",
  "ru": "отличный",
  "uk": "чудовий",
  "en": "excellent",
  "pos": "adjective",
  "forms": "ottimo (м) – ottima (ж) – ottimi / ottime (мн.)",
  "group": 3,
  "example": "Giovanni sarebbe un ottimo padre.",
  "lesson": "L32"
 },
 {
  "id": "w760",
  "it": "contento",
  "ru": "довольный, радостный",
  "uk": "задоволений, радісний",
  "en": "happy, pleased",
  "pos": "adjective",
  "forms": "contento (м) – contenta (ж) – contenti / contente (мн.)",
  "group": 4,
  "example": "Saresti contento di fare un viaggio con me?",
  "lesson": "L32"
 },
 {
  "id": "w761",
  "it": "il gatto / il gattino",
  "ru": "кот / котёнок",
  "uk": "кіт / кошеня",
  "en": "cat / kitten",
  "pos": "noun",
  "gender": "m",
  "plural": "i gatti / i gattini",
  "group": 2,
  "example": "Vorremmo un gattino, ma non possiamo tenerlo in casa.",
  "lesson": "L32"
 },
 {
  "id": "w762",
  "it": "venire a trovare (qualcuno)",
  "ru": "прийти в гости, навестить",
  "uk": "прийти в гості, провідати",
  "en": "to come and visit (someone)",
  "pos": "expression",
  "aux": "essere",
  "participle": "venuto",
  "base": "w658",
  "group": 1,
  "example": "Quando potrei venire a trovarti?",
  "lesson": "L32"
 },
 {
  "id": "w763",
  "it": "le ferie",
  "ru": "отпуск (на работе)",
  "uk": "відпустка (на роботі)",
  "en": "holidays (from work)",
  "pos": "noun",
  "gender": "f",
  "plural": "sing.: la feria (raro)",
  "group": 11,
  "example": "Avrei quattro settimane di ferie all'anno.",
  "lesson": "L32"
 },
 {
  "id": "w764",
  "it": "a testa",
  "ru": "с человека, на каждого",
  "uk": "з людини, на кожного",
  "en": "each, per person",
  "pos": "expression",
  "group": 12,
  "example": "Dovreste pagare 50 euro a testa.",
  "lesson": "L32"
 },
 {
  "id": "w765",
  "it": "il premio",
  "ru": "приз, премия",
  "uk": "приз, премія",
  "en": "prize",
  "pos": "noun",
  "gender": "m",
  "plural": "i premi",
  "group": 8,
  "example": "Chi inviteresti in un viaggio-premio per due persone?",
  "lesson": "L32"
 },
 {
  "id": "w766",
  "it": "al massimo",
  "ru": "максимум",
  "uk": "максимум",
  "en": "at most",
  "pos": "expression",
  "group": 12,
  "example": "Spenderei al massimo 100 franchi.",
  "lesson": "L32"
 },
 {
  "id": "w767",
  "it": "un paio di",
  "ru": "пара (чего-то); несколько",
  "uk": "пара (чогось); кілька",
  "en": "a pair of; a couple of",
  "pos": "expression",
  "group": 12,
  "example": "Quanto spenderesti per un paio di scarpe?",
  "lesson": "L32"
 },
 {
  "id": "w768",
  "it": "le scarpe",
  "ru": "обувь, туфли",
  "uk": "взуття, туфлі",
  "en": "shoes",
  "pos": "noun",
  "gender": "f",
  "plural": "sing.: la scarpa",
  "group": 3,
  "example": "Quanto spenderesti per un paio di scarpe?",
  "lesson": "L32"
 },
 {
  "id": "w769",
  "it": "regalare",
  "ru": "дарить",
  "uk": "дарувати",
  "en": "to give (as a gift)",
  "pos": "verb",
  "aux": "avere",
  "participle": "regalato",
  "group": 2,
  "example": "A chi regaleresti 1.000 euro?",
  "lesson": "L32"
 },
 {
  "id": "w770",
  "it": "abbassare",
  "ru": "опускать, понижать",
  "uk": "опускати, знижувати",
  "en": "to lower",
  "pos": "verb",
  "aux": "avere",
  "participle": "abbassato",
  "group": 7,
  "example": "Scusi, potrebbe abbassare un po' il finestrino?",
  "lesson": "L32"
 },
 {
  "id": "w771",
  "it": "fare un favore (a qualcuno)",
  "ru": "сделать одолжение (кому-то)",
  "uk": "зробити послугу (комусь)",
  "en": "to do (someone) a favour",
  "pos": "expression",
  "aux": "avere",
  "participle": "fatto",
  "group": 1,
  "example": "Mi faresti un favore?",
  "lesson": "L32"
 },
 {
  "id": "w772",
  "it": "il cellulare",
  "ru": "мобильный телефон",
  "uk": "мобільний телефон",
  "en": "mobile phone",
  "pos": "noun",
  "gender": "m",
  "plural": "i cellulari",
  "group": 1,
  "example": "Mi presteresti il tuo cellulare?",
  "lesson": "L32"
 },
 {
  "id": "w773",
  "it": "la chiamata",
  "ru": "звонок",
  "uk": "дзвінок",
  "en": "(phone) call",
  "pos": "noun",
  "gender": "f",
  "plural": "le chiamate",
  "group": 1,
  "example": "Mi presteresti il cellulare per fare una chiamata?",
  "lesson": "L32"
 },
 {
  "id": "w774",
  "it": "lentamente",
  "ru": "медленно",
  "uk": "повільно",
  "en": "slowly",
  "pos": "adverb",
  "group": 12,
  "example": "Potreste parlare più lentamente?",
  "lesson": "L32"
 },
 {
  "id": "w775",
  "it": "in affitto",
  "ru": "в аренду, съёмный",
  "uk": "в оренду, орендований",
  "en": "rented, for rent",
  "pos": "expression",
  "group": 5,
  "example": "Prendereste un appartamento in affitto con me?",
  "lesson": "L32"
 },
 {
  "id": "w776",
  "it": "il compagno / la compagna",
  "ru": "одноклассник; товарищ; партнёр",
  "uk": "однокласник; товариш; партнер",
  "en": "classmate; companion; partner",
  "pos": "noun",
  "gender": "m",
  "plural": "i compagni / le compagne",
  "group": 2,
  "example": "Chiedi un foglio a un compagno.",
  "lesson": "L32"
 },
 {
  "id": "w777",
  "it": "sicuro",
  "ru": "уверенный; надёжный",
  "uk": "впевнений; надійний",
  "en": "sure; safe",
  "pos": "adjective",
  "forms": "sicuro (м) – sicura (ж) – sicuri / sicure (мн.)",
  "group": 4,
  "example": "Sono sicura che Giovanni sarebbe un ottimo padre.",
  "lesson": "L32"
 },
 {
  "id": "w778",
  "it": "l'informazione",
  "ru": "информация, сведение",
  "uk": "інформація, відомість",
  "en": "information",
  "pos": "noun",
  "gender": "f",
  "plural": "le informazioni",
  "group": 11,
  "example": "Giorgio ti darebbe tutte le informazioni utili.",
  "lesson": "L32"
 },
 {
  "id": "w779",
  "it": "non saprei",
  "ru": "не знаю (мягко, вежливо)",
  "uk": "не знаю (м'яко, ввічливо)",
  "en": "I wouldn't know (soft «I don't know»)",
  "pos": "expression",
  "group": 4,
  "example": "Resteresti in Italia? — Non saprei.",
  "lesson": "L32"
 }
]
```

## Шаг 2. Грамматика «Uso del condizionale» — `src/content/a2/{ru,uk,en}/lezioni.json`, урок `g5-condizionale-uso`
2a. `tables[1]` (первая «Полезные формулы», та, где уже есть `potresti + infinito`): добавить в конец `items`:
```json
{
 "ru": {
  "a": "Non saprei.",
  "tr": "не знаю (мягко, вежливо)"
 },
 "uk": {
  "a": "Non saprei.",
  "tr": "не знаю (м'яко, ввічливо)"
 },
 "en": {
  "a": "Non saprei.",
  "tr": "I wouldn't know (a soft “I don't know”)"
 }
}
```
2b. Добавить **новую таблицу в конец** массива `tables` (после «3. Esprimere desideri» и её формул):
```json
{
 "ru": {
  "type": "pairs",
  "title": "{{Dialogo}} · {{Cosa faresti?}} · Что бы ты сделал?",
  "sep": "",
  "items": [
   {
    "a": "Sara: Hai visto? Un signore ha vinto 100.000 franchi a un gioco televisivo!",
    "tr": "Сара: Видел? Один мужчина выиграл 100 000 франков в телеигре!"
   },
   {
    "a": "Marco: Beato lui! Tu cosa faresti con tutti quei soldi?",
    "tr": "Марко: Везёт же ему! А ты что бы сделала со всеми этими деньгами?"
   },
   {
    "a": "Sara: Prima di tutto smetterei di lavorare per un anno e viaggerei in Sud America.",
    "tr": "Сара: Прежде всего я бы перестала работать на год и путешествовала бы по Южной Америке."
   },
   {
    "a": "Marco: Io invece comprerei un piccolo appartamento e regalerei qualcosa ai miei genitori.",
    "tr": "Марко: А я бы купил небольшую квартиру и подарил бы что-нибудь родителям."
   },
   {
    "a": "Sara: E dove vivresti? In città o in montagna?",
    "tr": "Сара: А где бы ты жил? В городе или в горах?"
   },
   {
    "a": "Marco: Non saprei… Magari in un paese vicino al lago. E tu torneresti a casa dopo il viaggio?",
    "tr": "Марко: Не знаю… Может быть, в городке у озера. А ты вернулась бы домой после поездки?"
   },
   {
    "a": "Sara: Sì, ma prima farei un corso di cucina in Italia!",
    "tr": "Сара: Да, но сначала я бы прошла курс кулинарии в Италии!"
   }
  ],
  "note": "Все глаголы «бы» — в {{condizionale}}: {{faresti}}, {{smetterei}}, {{viaggerei}}, {{comprerei}}, {{vivresti}}, {{torneresti}}, {{farei}}. {{Non saprei}} — мягкое «не знаю»."
 },
 "uk": {
  "type": "pairs",
  "title": "{{Dialogo}} · {{Cosa faresti?}} · Що б ти зробив?",
  "sep": "",
  "items": [
   {
    "a": "Sara: Hai visto? Un signore ha vinto 100.000 franchi a un gioco televisivo!",
    "tr": "Сара: Бачив? Один чоловік виграв 100 000 франків у телегрі!"
   },
   {
    "a": "Marco: Beato lui! Tu cosa faresti con tutti quei soldi?",
    "tr": "Марко: Щастить же йому! А ти що б зробила з усіма цими грошима?"
   },
   {
    "a": "Sara: Prima di tutto smetterei di lavorare per un anno e viaggerei in Sud America.",
    "tr": "Сара: Насамперед я б перестала працювати на рік і подорожувала б Південною Америкою."
   },
   {
    "a": "Marco: Io invece comprerei un piccolo appartamento e regalerei qualcosa ai miei genitori.",
    "tr": "Марко: А я б купив невелику квартиру й подарував би щось батькам."
   },
   {
    "a": "Sara: E dove vivresti? In città o in montagna?",
    "tr": "Сара: А де б ти жив? У місті чи в горах?"
   },
   {
    "a": "Marco: Non saprei… Magari in un paese vicino al lago. E tu torneresti a casa dopo il viaggio?",
    "tr": "Марко: Не знаю… Можливо, у містечку біля озера. А ти повернулася б додому після подорожі?"
   },
   {
    "a": "Sara: Sì, ma prima farei un corso di cucina in Italia!",
    "tr": "Сара: Так, але спочатку я б пройшла курс кулінарії в Італії!"
   }
  ],
  "note": "Усі дієслова «б» — у {{condizionale}}: {{faresti}}, {{smetterei}}, {{viaggerei}}, {{comprerei}}, {{vivresti}}, {{torneresti}}, {{farei}}. {{Non saprei}} — м'яке «не знаю»."
 },
 "en": {
  "type": "pairs",
  "title": "{{Dialogo}} · {{Cosa faresti?}} · What would you do?",
  "sep": "",
  "items": [
   {
    "a": "Sara: Hai visto? Un signore ha vinto 100.000 franchi a un gioco televisivo!",
    "tr": "Sara: Did you see? A man won 100,000 francs on a TV game show!"
   },
   {
    "a": "Marco: Beato lui! Tu cosa faresti con tutti quei soldi?",
    "tr": "Marco: Lucky him! What would you do with all that money?"
   },
   {
    "a": "Sara: Prima di tutto smetterei di lavorare per un anno e viaggerei in Sud America.",
    "tr": "Sara: First of all I'd stop working for a year and travel around South America."
   },
   {
    "a": "Marco: Io invece comprerei un piccolo appartamento e regalerei qualcosa ai miei genitori.",
    "tr": "Marco: I, on the other hand, would buy a small flat and give my parents something."
   },
   {
    "a": "Sara: E dove vivresti? In città o in montagna?",
    "tr": "Sara: And where would you live? In the city or in the mountains?"
   },
   {
    "a": "Marco: Non saprei… Magari in un paese vicino al lago. E tu torneresti a casa dopo il viaggio?",
    "tr": "Marco: I wouldn't know… Maybe in a village by the lake. And would you come home after the trip?"
   },
   {
    "a": "Sara: Sì, ma prima farei un corso di cucina in Italia!",
    "tr": "Sara: Yes, but first I'd do a cooking course in Italy!"
   }
  ],
  "note": "Every “would” verb is in the {{condizionale}}: {{faresti}}, {{smetterei}}, {{viaggerei}}, {{comprerei}}, {{vivresti}}, {{torneresti}}, {{farei}}. {{Non saprei}} is a soft “I don't know”."
 }
}
```
2c. Добавить в конец `mistakes`:
```json
{
 "ru": {
  "wrong": "Chi verreste con me al cinema?",
  "right": "Chi verrebbe con me al cinema?",
  "why": "после {{chi}} — всегда 3-е лицо ед. ч., как {{lui/lei}}"
 },
 "uk": {
  "wrong": "Chi verreste con me al cinema?",
  "right": "Chi verrebbe con me al cinema?",
  "why": "після {{chi}} — завжди 3-тя особа одн., як {{lui/lei}}"
 },
 "en": {
  "wrong": "Chi verreste con me al cinema?",
  "right": "Chi verrebbe con me al cinema?",
  "why": "after {{chi}} always the 3rd person singular, like {{lui/lei}}"
 }
}
```

## Шаг 3. Упражнения — `src/content/a2/esercizi.json`
3a. В конец `items` набора `"topic": "g5-condizionale-forme"` (станет 52):
```json
[
 {
  "id": "cf-33",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale (правильные глаголы).",
   "uk": "Постав дієслово в condizionale (правильні дієслова).",
   "en": "Put the verb in the condizionale (regular verbs)."
  },
  "it": "E tu ___ una casa in Italia o nel tuo paese?",
  "hint": "comprare",
  "answers": [
   "compreresti"
  ],
  "why": {
   "ru": "tu → -esti; -are: a → e.",
   "uk": "tu → -esti; -are: a → e.",
   "en": "tu → -esti; -are: a → e."
  },
  "tr": {
   "ru": "А ты купил бы дом в Италии или в своей стране?",
   "uk": "А ти купив би дім в Італії чи у своїй країні?",
   "en": "And would you buy a house in Italy or in your own country?"
  }
 },
 {
  "id": "cf-34",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale (правильные глаголы).",
   "uk": "Постав дієслово в condizionale (правильні дієслова).",
   "en": "Put the verb in the condizionale (regular verbs)."
  },
  "it": "Mi piacciono molto le lingue, le ___ tutte.",
  "hint": "studiare (io)",
  "answers": [
   "studierei"
  ],
  "why": {
   "ru": "io → -ei; studiare → studier-.",
   "uk": "io → -ei; studiare → studier-.",
   "en": "io → -ei; studiare → studier-."
  },
  "tr": {
   "ru": "Мне очень нравятся языки, я бы выучил их все.",
   "uk": "Мені дуже подобаються мови, я б вивчив їх усі.",
   "en": "I really like languages, I'd study them all."
  }
 },
 {
  "id": "cf-35",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale (правильные глаголы).",
   "uk": "Постав дієслово в condizionale (правильні дієслова).",
   "en": "Put the verb in the condizionale (regular verbs)."
  },
  "it": "Adesso non hanno soldi, altrimenti ___ in Africa.",
  "hint": "tornare",
  "answers": [
   "tornerebbero"
  ],
  "why": {
   "ru": "loro → -ebbero; -are: a → e.",
   "uk": "loro → -ebbero; -are: a → e.",
   "en": "loro → -ebbero; -are: a → e."
  },
  "tr": {
   "ru": "Сейчас у них нет денег, иначе они вернулись бы в Африку.",
   "uk": "Зараз у них немає грошей, інакше вони повернулися б до Африки.",
   "en": "They have no money now, otherwise they'd go back to Africa."
  }
 },
 {
  "id": "cf-36",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale (правильные глаголы).",
   "uk": "Постав дієслово в condizionale (правильні дієслова).",
   "en": "Put the verb in the condizionale (regular verbs)."
  },
  "it": "Qui guadagniamo poco, in nord Europa ___ di più.",
  "hint": "guadagnare (noi)",
  "answers": [
   "guadagneremmo"
  ],
  "why": {
   "ru": "noi → -emmo (две m). С одной m (guadagneremo) — это futuro.",
   "uk": "noi → -emmo (дві m). З однією m (guadagneremo) — це futuro.",
   "en": "noi → -emmo (double m). With one m (guadagneremo) it's the futuro."
  },
  "tr": {
   "ru": "Здесь мы зарабатываем мало, на севере Европы мы зарабатывали бы больше.",
   "uk": "Тут ми заробляємо мало, на півночі Європи ми заробляли б більше.",
   "en": "We earn little here; in northern Europe we'd earn more."
  }
 },
 {
  "id": "cf-37",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale (правильные глаголы).",
   "uk": "Постав дієслово в condizionale (правильні дієслова).",
   "en": "Put the verb in the condizionale (regular verbs)."
  },
  "it": "Voi ___ un appartamento in affitto con me e Leo?",
  "hint": "prendere",
  "answers": [
   "prendereste"
  ],
  "why": {
   "ru": "voi → -este; у -ere e остаётся: prender-.",
   "uk": "voi → -este; у -ere e лишається: prender-.",
   "en": "voi → -este; -ere keeps the e: prender-."
  },
  "tr": {
   "ru": "Вы бы сняли квартиру вместе со мной и Лео?",
   "uk": "Ви б винайняли квартиру разом зі мною та Лео?",
   "en": "Would you rent a flat with me and Leo?"
  }
 },
 {
  "id": "cf-38",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale (правильные глаголы).",
   "uk": "Постав дієслово в condizionale (правильні дієслова).",
   "en": "Put the verb in the condizionale (regular verbs)."
  },
  "it": "Con una moto migliore tu ___ tutte le gare.",
  "hint": "vincere",
  "answers": [
   "vinceresti"
  ],
  "why": {
   "ru": "tu → -esti; vincere → vincer-.",
   "uk": "tu → -esti; vincere → vincer-.",
   "en": "tu → -esti; vincere → vincer-."
  },
  "tr": {
   "ru": "С мотоциклом получше ты выигрывал бы все гонки.",
   "uk": "З кращим мотоциклом ти вигравав би всі перегони.",
   "en": "With a better motorbike you'd win every race."
  }
 },
 {
  "id": "cf-39",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale (правильные глаголы).",
   "uk": "Постав дієслово в condizionale (правильні дієслова).",
   "en": "Put the verb in the condizionale (regular verbs)."
  },
  "it": "Io ___ sempre, lei non uscirebbe mai.",
  "hint": "uscire",
  "answers": [
   "uscirei"
  ],
  "why": {
   "ru": "io → -ei; -ire: uscir-.",
   "uk": "io → -ei; -ire: uscir-.",
   "en": "io → -ei; -ire: uscir-."
  },
  "tr": {
   "ru": "Я бы всё время куда-то ходил, а она не выходила бы никогда.",
   "uk": "Я б весь час кудись ходив, а вона не виходила б ніколи.",
   "en": "I'd always go out, she'd never go out."
  }
 },
 {
  "id": "cf-40",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale (правильные глаголы).",
   "uk": "Постав дієслово в condizionale (правильні дієслова).",
   "en": "Put the verb in the condizionale (regular verbs)."
  },
  "it": "Io uscirei sempre, lei non ___ mai.",
  "hint": "uscire",
  "answers": [
   "uscirebbe"
  ],
  "why": {
   "ru": "lei → -ebbe.",
   "uk": "lei → -ebbe.",
   "en": "lei → -ebbe."
  },
  "tr": {
   "ru": "Я бы всё время куда-то ходил, а она не выходила бы никогда.",
   "uk": "Я б весь час кудись ходив, а вона не виходила б ніколи.",
   "en": "I'd always go out, she'd never go out."
  }
 },
 {
  "id": "cf-41",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale. У dare, fare, stare остаётся a.",
   "uk": "Постав дієслово в condizionale. У dare, fare, stare лишається a.",
   "en": "Put the verb in the condizionale. dare, fare, stare keep the a."
  },
  "it": "Penso che Giorgio ti ___ tutte le informazioni utili.",
  "hint": "dare",
  "answers": [
   "darebbe"
  ],
  "why": {
   "ru": "dare → dar- (a остаётся) + -ebbe.",
   "uk": "dare → dar- (a лишається) + -ebbe.",
   "en": "dare → dar- (keeps the a) + -ebbe."
  },
  "tr": {
   "ru": "Думаю, Джорджо дал бы тебе всю полезную информацию.",
   "uk": "Думаю, Джорджо дав би тобі всю корисну інформацію.",
   "en": "I think Giorgio would give you all the useful information."
  }
 },
 {
  "id": "cf-42",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale. У dare, fare, stare остаётся a.",
   "uk": "Постав дієслово в condizionale. У dare, fare, stare лишається a.",
   "en": "Put the verb in the condizionale. dare, fare, stare keep the a."
  },
  "it": "Gli studenti ___ volentieri una piccola pausa.",
  "hint": "fare",
  "answers": [
   "farebbero"
  ],
  "why": {
   "ru": "fare → far- (a остаётся) + -ebbero.",
   "uk": "fare → far- (a лишається) + -ebbero.",
   "en": "fare → far- (keeps the a) + -ebbero."
  },
  "tr": {
   "ru": "Студенты с удовольствием сделали бы небольшой перерыв.",
   "uk": "Студенти охоче зробили б невелику перерву.",
   "en": "The students would gladly take a short break."
  }
 },
 {
  "id": "cf-43",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale. У dare, fare, stare остаётся a.",
   "uk": "Постав дієслово в condizionale. У dare, fare, stare лишається a.",
   "en": "Put the verb in the condizionale. dare, fare, stare keep the a."
  },
  "it": "Sto così bene qui, che ci ___ tutta la vita.",
  "hint": "stare (io)",
  "answers": [
   "starei"
  ],
  "why": {
   "ru": "stare → star- (a остаётся) + -ei.",
   "uk": "stare → star- (a лишається) + -ei.",
   "en": "stare → star- (keeps the a) + -ei."
  },
  "tr": {
   "ru": "Мне здесь так хорошо, что я остался бы тут на всю жизнь.",
   "uk": "Мені тут так добре, що я залишився б тут на все життя.",
   "en": "I feel so good here that I'd stay here all my life."
  }
 },
 {
  "id": "cf-44",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale. У dare, fare, stare остаётся a.",
   "uk": "Постав дієслово в condizionale. У dare, fare, stare лишається a.",
   "en": "Put the verb in the condizionale. dare, fare, stare keep the a."
  },
  "it": "Sono sicura che Giovanni ___ un ottimo padre.",
  "hint": "essere",
  "answers": [
   "sarebbe"
  ],
  "why": {
   "ru": "essere → sar- + -ebbe.",
   "uk": "essere → sar- + -ebbe.",
   "en": "essere → sar- + -ebbe."
  },
  "tr": {
   "ru": "Я уверена, что Джованни был бы отличным отцом.",
   "uk": "Я впевнена, що Джованні був би чудовим батьком.",
   "en": "I'm sure Giovanni would be an excellent father."
  }
 },
 {
  "id": "cf-45",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale. У dare, fare, stare остаётся a.",
   "uk": "Постав дієслово в condizionale. У dare, fare, stare лишається a.",
   "en": "Put the verb in the condizionale. dare, fare, stare keep the a."
  },
  "it": "Voi ___ tutta la vita con una persona che non vi ama?",
  "hint": "stare",
  "answers": [
   "stareste"
  ],
  "why": {
   "ru": "stare → star- + -este.",
   "uk": "stare → star- + -este.",
   "en": "stare → star- + -este."
  },
  "tr": {
   "ru": "Вы бы прожили всю жизнь с человеком, который вас не любит?",
   "uk": "Ви б прожили все життя з людиною, яка вас не кохає?",
   "en": "Would you spend your whole life with someone who doesn't love you?"
  }
 },
 {
  "id": "cf-46",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale. У dare, fare, stare остаётся a.",
   "uk": "Постав дієслово в condizionale. У dare, fare, stare лишається a.",
   "en": "Put the verb in the condizionale. dare, fare, stare keep the a."
  },
  "it": "Io e Anna ___ il bagno al mare tutti i giorni.",
  "hint": "fare",
  "answers": [
   "faremmo"
  ],
  "why": {
   "ru": "Io e Anna = noi → far- + -emmo.",
   "uk": "Io e Anna = noi → far- + -emmo.",
   "en": "Io e Anna = noi → far- + -emmo."
  },
  "tr": {
   "ru": "Мы с Анной купались бы в море каждый день.",
   "uk": "Ми з Анною купалися б у морі щодня.",
   "en": "Anna and I would swim in the sea every day."
  }
 },
 {
  "id": "cf-47",
  "type": "fill",
  "task": {
   "ru": "Поставь глагол в condizionale. У dare, fare, stare остаётся a.",
   "uk": "Постав дієслово в condizionale. У dare, fare, stare лишається a.",
   "en": "Put the verb in the condizionale. dare, fare, stare keep the a."
  },
  "it": "Tu ___ contento di fare un viaggio in Cina con me?",
  "hint": "essere",
  "answers": [
   "saresti"
  ],
  "why": {
   "ru": "essere → sar- + -esti.",
   "uk": "essere → sar- + -esti.",
   "en": "essere → sar- + -esti."
  },
  "tr": {
   "ru": "Ты был бы рад съездить со мной в Китай?",
   "uk": "Ти був би радий поїхати зі мною до Китаю?",
   "en": "Would you be happy to take a trip to China with me?"
  }
 },
 {
  "id": "cf-48",
  "type": "fill",
  "task": {
   "ru": "Ответь на вопрос в condizionale. Внимание: лицо меняется (tu → io, voi → noi, io → tu).",
   "uk": "Дай відповідь у condizionale. Увага: особа змінюється (tu → io, voi → noi, io → tu).",
   "en": "Answer in the condizionale. Careful: the person changes (tu → io, voi → noi, io → tu)."
  },
  "it": "Dove andresti in vacanza d'estate? — ___ al mare in Sardegna.",
  "hint": "andare",
  "answers": [
   "andrei"
  ],
  "why": {
   "ru": "Вопрос на tu → ответ io. andare → andr- + -ei.",
   "uk": "Питання на tu → відповідь io. andare → andr- + -ei.",
   "en": "Question with tu → answer with io. andare → andr- + -ei."
  },
  "tr": {
   "ru": "Куда бы ты поехал летом в отпуск? — Я бы поехал на море на Сардинию.",
   "uk": "Куди б ти поїхав улітку у відпустку? — Я б поїхав на море на Сардинію.",
   "en": "Where would you go on holiday in summer? — I'd go to the seaside in Sardinia."
  }
 },
 {
  "id": "cf-49",
  "type": "fill",
  "task": {
   "ru": "Ответь на вопрос в condizionale. Внимание: лицо меняется (tu → io, voi → noi, io → tu).",
   "uk": "Дай відповідь у condizionale. Увага: особа змінюється (tu → io, voi → noi, io → tu).",
   "en": "Answer in the condizionale. Careful: the person changes (tu → io, voi → noi, io → tu)."
  },
  "it": "Voi vorreste un gattino? — Lo ___, ma non possiamo tenerlo in casa.",
  "hint": "volere",
  "answers": [
   "vorremmo"
  ],
  "why": {
   "ru": "Вопрос на voi → ответ noi. volere → vorr- + -emmo.",
   "uk": "Питання на voi → відповідь noi. volere → vorr- + -emmo.",
   "en": "Question with voi → answer with noi. volere → vorr- + -emmo."
  },
  "tr": {
   "ru": "Вы бы хотели котёнка? — Хотели бы, но нам нельзя держать его дома.",
   "uk": "Ви б хотіли кошеня? — Хотіли б, але нам не можна тримати його вдома.",
   "en": "Would you like a kitten? — We would, but we can't keep it at home."
  }
 },
 {
  "id": "cf-50",
  "type": "fill",
  "task": {
   "ru": "Ответь на вопрос в condizionale. Внимание: лицо меняется (tu → io, voi → noi, io → tu).",
   "uk": "Дай відповідь у condizionale. Увага: особа змінюється (tu → io, voi → noi, io → tu).",
   "en": "Answer in the condizionale. Careful: the person changes (tu → io, voi → noi, io → tu)."
  },
  "it": "Quando potrei venire a trovarti? — ___ venire sabato prossimo.",
  "hint": "potere",
  "answers": [
   "potresti"
  ],
  "why": {
   "ru": "Вопрос про io → ответ tu. potere → potr- + -esti.",
   "uk": "Питання про io → відповідь tu. potere → potr- + -esti.",
   "en": "Question about io → answer with tu. potere → potr- + -esti."
  },
  "tr": {
   "ru": "Когда я мог бы зайти к тебе в гости? — Ты мог бы прийти в следующую субботу.",
   "uk": "Коли я міг би прийти до тебе в гості? — Ти міг би прийти наступної суботи.",
   "en": "When could I come and visit you? — You could come next Saturday."
  }
 },
 {
  "id": "cf-51",
  "type": "fill",
  "task": {
   "ru": "Ответь на вопрос в condizionale. Внимание: лицо меняется (tu → io, voi → noi, io → tu).",
   "uk": "Дай відповідь у condizionale. Увага: особа змінюється (tu → io, voi → noi, io → tu).",
   "en": "Answer in the condizionale. Careful: the person changes (tu → io, voi → noi, io → tu)."
  },
  "it": "Quanti giorni di ferie avresti? — ___ quattro settimane all'anno.",
  "hint": "avere",
  "answers": [
   "avrei"
  ],
  "why": {
   "ru": "Вопрос на tu → ответ io. avere → avr- + -ei.",
   "uk": "Питання на tu → відповідь io. avere → avr- + -ei.",
   "en": "Question with tu → answer with io. avere → avr- + -ei."
  },
  "tr": {
   "ru": "Сколько дней отпуска у тебя было бы? — У меня было бы четыре недели в год.",
   "uk": "Скільки днів відпустки в тебе було б? — У мене було б чотири тижні на рік.",
   "en": "How many days off would you have? — I'd have four weeks a year."
  }
 },
 {
  "id": "cf-52",
  "type": "fill",
  "task": {
   "ru": "Ответь на вопрос в condizionale. Внимание: лицо меняется (tu → io, voi → noi, io → tu).",
   "uk": "Дай відповідь у condizionale. Увага: особа змінюється (tu → io, voi → noi, io → tu).",
   "en": "Answer in the condizionale. Careful: the person changes (tu → io, voi → noi, io → tu)."
  },
  "it": "Chi potrebbe fare questo lavoro? — Ivan ___ farlo molto bene.",
  "hint": "potere",
  "answers": [
   "potrebbe"
  ],
  "why": {
   "ru": "Ivan = lui → potr- + -ebbe.",
   "uk": "Ivan = lui → potr- + -ebbe.",
   "en": "Ivan = lui → potr- + -ebbe."
  },
  "tr": {
   "ru": "Кто мог бы сделать эту работу? — Иван мог бы сделать её очень хорошо.",
   "uk": "Хто міг би зробити цю роботу? — Іван міг би зробити її дуже добре.",
   "en": "Who could do this job? — Ivan could do it very well."
  }
 }
]
```
3b. В конец `items` набора `"topic": "g5-condizionale-uso"` (станет 47). Поле `answer` у всех = 0 — порядок вариантов плеер перемешивает сам:
```json
[
 {
  "id": "cu-41",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Попроси незнакомого мужчину (Lei) немного опустить окно.",
   "uk": "Попроси незнайомого чоловіка (Lei) трохи опустити вікно.",
   "en": "Ask a gentleman (Lei) to lower the window a little."
  },
  "situationIt": "Chiedi a un signore (Lei) di abbassare un po' il finestrino.",
  "options": [
   "Scusi, potrebbe abbassare un po' il finestrino?",
   "Scusa, potresti abbassare un po' il finestrino?",
   "Abbassa il finestrino!"
  ],
  "answer": 0,
  "why": {
   "ru": "Незнакомый signore → Lei: potrebbe.",
   "uk": "Незнайомий signore → Lei: potrebbe.",
   "en": "A gentleman you don't know → Lei: potrebbe."
  },
  "tr": {
   "ru": "Извините, не могли бы Вы немного опустить окно?",
   "uk": "Вибачте, чи не могли б Ви трохи опустити вікно?",
   "en": "Excuse me, could you lower the window a little?"
  }
 },
 {
  "id": "cu-42",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Попроси друга сделать тебе одолжение.",
   "uk": "Попроси друга зробити тобі послугу.",
   "en": "Ask a friend to do you a favour."
  },
  "situationIt": "Chiedi a un amico di farti un favore.",
  "options": [
   "Mi faresti un favore?",
   "Mi farebbe un favore?",
   "Mi fareste un favore?"
  ],
  "answer": 0,
  "why": {
   "ru": "Друг → tu: faresti. Mi = мне.",
   "uk": "Друг → tu: faresti. Mi = мені.",
   "en": "A friend → tu: faresti. Mi = me."
  },
  "tr": {
   "ru": "Не сделаешь мне одолжение?",
   "uk": "Чи не зробиш мені послугу?",
   "en": "Would you do me a favour?"
  }
 },
 {
  "id": "cu-43",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Спроси директора своего банка (Lei), сколько тебе платить каждый месяц.",
   "uk": "Запитай директора свого банку (Lei), скільки тобі платити щомісяця.",
   "en": "Ask your bank manager (Lei) how much you have to pay each month."
  },
  "situationIt": "Chiedi al direttore della tua banca (Lei) quanto devi pagare ogni mese.",
  "options": [
   "Scusi, quanto dovrei pagare ogni mese?",
   "Scusi, quanto dovrebbe pagare ogni mese?",
   "Scusi, quanto dovresti pagare ogni mese?"
  ],
  "answer": 0,
  "why": {
   "ru": "Платишь ты → dovrei (io). Вежливость к директору — в «Scusi».",
   "uk": "Платиш ти → dovrei (io). Ввічливість до директора — у «Scusi».",
   "en": "You are the one paying → dovrei (io). The politeness is in «Scusi»."
  },
  "tr": {
   "ru": "Извините, сколько мне нужно было бы платить каждый месяц?",
   "uk": "Вибачте, скільки мені треба було б платити щомісяця?",
   "en": "Excuse me, how much would I have to pay each month?"
  }
 },
 {
  "id": "cu-44",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Спроси друга, куда он хочет пойти ужинать сегодня вечером.",
   "uk": "Запитай друга, куди він хоче піти вечеряти сьогодні ввечері.",
   "en": "Ask a friend where he wants to go for dinner tonight."
  },
  "situationIt": "Chiedi a un amico dove vuole andare a cena stasera.",
  "options": [
   "Dove vorresti andare a cena stasera?",
   "Dove vorrebbe andare a cena stasera?",
   "Dove vorrei andare a cena stasera?"
  ],
  "answer": 0,
  "why": {
   "ru": "Друг → tu: vorresti.",
   "uk": "Друг → tu: vorresti.",
   "en": "A friend → tu: vorresti."
  },
  "tr": {
   "ru": "Куда бы ты хотел пойти ужинать сегодня вечером?",
   "uk": "Куди б ти хотів піти вечеряти сьогодні ввечері?",
   "en": "Where would you like to go for dinner tonight?"
  }
 },
 {
  "id": "cu-45",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Попроси подругу одолжить тебе телефон, чтобы позвонить.",
   "uk": "Попроси подругу позичити тобі телефон, щоб подзвонити.",
   "en": "Ask a friend to lend you her phone to make a call."
  },
  "situationIt": "Chiedi a un'amica se ti presta il suo cellulare per fare una chiamata.",
  "options": [
   "Mi presteresti il tuo cellulare per fare una chiamata?",
   "Mi presterebbe il suo cellulare per fare una chiamata?",
   "Ti presterei il mio cellulare per fare una chiamata?"
  ],
  "answer": 0,
  "why": {
   "ru": "Подруга → tu: presteresti. Mi = мне.",
   "uk": "Подруга → tu: presteresti. Mi = мені.",
   "en": "A friend → tu: presteresti. Mi = me."
  },
  "tr": {
   "ru": "Не одолжишь мне свой телефон позвонить?",
   "uk": "Чи не позичиш мені свій телефон подзвонити?",
   "en": "Would you lend me your phone to make a call?"
  }
 },
 {
  "id": "cu-46",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Попроси одноклассников (voi) говорить медленнее.",
   "uk": "Попроси однокласників (voi) говорити повільніше.",
   "en": "Ask your classmates (voi) to speak more slowly."
  },
  "situationIt": "Chiedi ai tuoi compagni (voi) di parlare più lentamente.",
  "options": [
   "Potreste parlare più lentamente?",
   "Potresti parlare più lentamente?",
   "Potrebbero parlare più lentamente?"
  ],
  "answer": 0,
  "why": {
   "ru": "Несколько человек → voi: potreste.",
   "uk": "Кілька людей → voi: potreste.",
   "en": "Several people → voi: potreste."
  },
  "tr": {
   "ru": "Не могли бы вы говорить помедленнее?",
   "uk": "Чи не могли б ви говорити повільніше?",
   "en": "Could you speak more slowly?"
  }
 },
 {
  "id": "cu-47",
  "type": "choice",
  "task": {
   "ru": "Прочитай ситуацию и выбери, что сказать.",
   "uk": "Прочитай ситуацію та обери, що сказати.",
   "en": "Read the situation and choose what to say."
  },
  "situation": {
   "ru": "Спроси друзей, кто пойдёт с тобой в кино сегодня вечером.",
   "uk": "Запитай друзів, хто піде з тобою в кіно сьогодні ввечері.",
   "en": "Ask your friends who's coming to the cinema with you tonight."
  },
  "situationIt": "Chiedi ai tuoi amici chi viene con te al cinema stasera.",
  "options": [
   "Chi verrebbe con me al cinema stasera?",
   "Chi verreste con me al cinema stasera?",
   "Chi verrei con me al cinema stasera?"
  ],
  "answer": 0,
  "why": {
   "ru": "После chi — всегда 3-е лицо ед. ч.: verrebbe.",
   "uk": "Після chi — завжди 3-тя особа одн.: verrebbe.",
   "en": "After chi always use the 3rd person singular: verrebbe."
  },
  "tr": {
   "ru": "Кто пошёл бы со мной в кино сегодня вечером?",
   "uk": "Хто пішов би зі мною в кіно сьогодні ввечері?",
   "en": "Who would come to the cinema with me tonight?"
  }
 }
]
```

## Шаг 4. Тесты — только счётчики
- `tests/condizionale.spec.ts`: `"1 / 32"` → `"1 / 52"`; `"1 / 40"` → `"1 / 47"`; название теста «32 voci» → «52 voci».
- `tests/esercizi.spec.ts` (тест Continua/Ricomincia): все `/ 40` → `/ 47`.
- `tests/tempi.spec.ts`: `"Studiati 0/2 · Esercizi 0/72"` → `"Studiati 0/2 · Esercizi 0/99"`.
Если ещё где-то жёстко записаны 32 / 40 / 72 для condizionale — поправить так же и указать в отчёте.

## Шаг 5. Проверка данных
- в vocab.json 775 слов (743 + 32), из них L32 — 32;
- forme 52, uso 47, всего condizionale 99;
- у всех 27 новых упражнений есть `tr`; у cu-41…cu-47 есть `situationIt`.

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
git commit -m "Unità 9: Cosa faresti? — parole L32, dialogo, 27 esercizi (forme 52, uso 47)"
git push
```

## Шаг 8. Отчёт
Изменённые файлы, числа из шага 5, результаты 4 проверок, вывод `git status` и `git push`.
