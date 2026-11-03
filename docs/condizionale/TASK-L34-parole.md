# Задание L34: 5 слов с листка «Volentieri» (упр. B и E) + коммит и push

Упражнения B и E уже есть в приложении (Uso del condizionale → Blocco 2 · Desideri). Добавляем **только слова**, которых нет в словаре.
Данные проверены валидатором (`node scripts/validate-content.mjs` → ok) на копии `9a474c0`. Вставляй **как есть**.

## Общие правила
- Соблюдай CLAUDE.md. Делай только то, что здесь написано.
- Сохраняй форматирование JSON (отступ 1 пробел, без перевода строки в конце). В diff — только добавленные строки.
- Коммит и push — только если все проверки шага 3 прошли.

## Шаг 1. Словарь — `src/content/a2/ru/vocab.json`
Добавить в конец массива `words` 5 слов (партия **L34**, w801–w805):
```json
[
 {
  "id": "w801",
  "it": "il panino",
  "ru": "бутерброд, булочка",
  "uk": "бутерброд, булочка",
  "en": "sandwich, roll",
  "pos": "noun",
  "gender": "m",
  "plural": "i panini",
  "group": 6,
  "example": "Ho fame: mangerei volentieri un panino.",
  "lesson": "L34"
 },
 {
  "id": "w802",
  "it": "giocare a carte",
  "ru": "играть в карты",
  "uk": "грати в карти",
  "en": "to play cards",
  "pos": "expression",
  "aux": "avere",
  "participle": "giocato",
  "group": 1,
  "example": "Giocherei volentieri a carte.",
  "lesson": "L34"
 },
 {
  "id": "w803",
  "it": "la birra",
  "ru": "пиво",
  "uk": "пиво",
  "en": "beer",
  "pos": "noun",
  "gender": "f",
  "plural": "le birre",
  "group": 6,
  "example": "Ho sete: berrei volentieri una birra.",
  "lesson": "L34"
 },
 {
  "id": "w804",
  "it": "qualcosa (di + agg.)",
  "ru": "что-нибудь, что-то (+ какое)",
  "uk": "щось (+ яке)",
  "en": "something",
  "pos": "pronoun",
  "group": 12,
  "example": "Ho voglia di mangiare qualcosa di speciale.",
  "lesson": "L34"
 },
 {
  "id": "w805",
  "it": "speciale",
  "ru": "особенный, особый",
  "uk": "особливий",
  "en": "special",
  "pos": "adjective",
  "forms": "speciale (м/ж) – speciali (мн.)",
  "group": 12,
  "example": "Ho voglia di mangiare qualcosa di speciale.",
  "lesson": "L34"
 }
]
```

## Шаг 2. Проверка данных
В vocab.json 801 слово (796 + 5), из них L34 — 5.

## Шаг 3. Проверки (по порядку, исправить ошибки)
```
node scripts/validate-content.mjs
npm run lint
npm run build
npm run test:layout
```

## Шаг 4. Коммит и push
```
git add src docs/condizionale
git status
```
Без `docs/AUDIT*.md`. Затем:
```
git commit -m "Vocabolario: parole L34 (panino, giocare a carte, birra, qualcosa, speciale)"
git push
```

## Шаг 5. Отчёт
Изменённые файлы, число слов, результаты 4 проверок, вывод `git push`.
