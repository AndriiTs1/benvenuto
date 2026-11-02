# Задание: разбить большие тесты на блоки по направлениям + коммит и push

## Проблема
Большие темы — это один длинный тест (до 64 упражнений вперемешку). Студент не видит конца, не понимает, что тренирует, и не может повторить одну часть. Кнопка упражнений стоит в самом низу длинной теории.

## Решение
У тем, где больше 20 упражнений, упражнения делятся на **блоки по направлениям** (5–20 упражнений в блоке). У каждого блока своя страница, свой прогресс, свой «Continua». Темы с ≤ 20 упражнениями остаются одним тестом, как сейчас.

Блоки уже составлены и проверены: каждое упражнение ровно в одном блоке, размеры 8–20.

| Тема (slug) | Блоки |
|---|---|
| condizionale-presente-le-forme (52) | 18 · 19 · 15 |
| uso-del-condizionale (64) | 9 · 20 · 17 · 18 |
| il-futuro-semplice (43) | 16 · 15 · 12 |
| c-e-ci-sono (44) | 12 · 19 · 13 |
| il-passato-prossimo (26) | 14 · 12 |
| che-tempo-fa (22) | 14 · 8 |

## Общие правила
- Соблюдай CLAUDE.md (дизайн, мобильный центр, `<Tr>` для переводов, итальянский интерфейс, токены цветов). Новых пакетов не ставить.
- Сохраняй форматирование JSON. Сами упражнения (`items`) не менять и не переставлять.
- Ответы студента (`benvenuto` progress по id упражнений) должны сохраниться: счётчики «X/N» считаются по тем же id.
- Коммит и push — только если все проверки шага 10 прошли.

## Шаг 1. Данные — `src/content/a2/esercizi.json`
В 6 наборов добавить поле `blocchi` **после** `items` (порядок упражнений в блоке = порядок в списке `items` блока):
```json
{
 "g5-condizionale-forme": [
  {
   "id": "1",
   "titolo": {
    "it": "Verbi regolari",
    "ru": "Правильные глаголы",
    "uk": "Правильні дієслова",
    "en": "Regular verbs"
   },
   "items": [
    "cf-01",
    "cf-02",
    "cf-03",
    "cf-04",
    "cf-05",
    "cf-06",
    "cf-07",
    "cf-08",
    "cf-09",
    "cf-10",
    "cf-33",
    "cf-34",
    "cf-35",
    "cf-36",
    "cf-37",
    "cf-38",
    "cf-39",
    "cf-40"
   ]
  },
  {
   "id": "2",
   "titolo": {
    "it": "Verbi irregolari",
    "ru": "Неправильные глаголы",
    "uk": "Неправильні дієслова",
    "en": "Irregular verbs"
   },
   "items": [
    "cf-11",
    "cf-12",
    "cf-13",
    "cf-14",
    "cf-15",
    "cf-16",
    "cf-17",
    "cf-18",
    "cf-19",
    "cf-20",
    "cf-21",
    "cf-22",
    "cf-41",
    "cf-42",
    "cf-43",
    "cf-44",
    "cf-45",
    "cf-46",
    "cf-47"
   ]
  },
  {
   "id": "3",
   "titolo": {
    "it": "Futuro o condizionale? Rispondi",
    "ru": "Futuro или condizionale? Ответь на вопросы",
    "uk": "Futuro чи condizionale? Дай відповідь",
    "en": "Futuro or condizionale? Answer"
   },
   "items": [
    "cf-23",
    "cf-24",
    "cf-25",
    "cf-26",
    "cf-27",
    "cf-28",
    "cf-29",
    "cf-30",
    "cf-31",
    "cf-32",
    "cf-48",
    "cf-49",
    "cf-50",
    "cf-51",
    "cf-52"
   ]
  }
 ],
 "g5-condizionale-uso": [
  {
   "id": "1",
   "titolo": {
    "it": "Consigli e opinioni",
    "ru": "Советы и мнения",
    "uk": "Поради й думки",
    "en": "Advice and opinions"
   },
   "items": [
    "cu-01",
    "cu-05",
    "cu-07",
    "cu-10",
    "cu-54",
    "cu-55",
    "cu-56",
    "cu-57",
    "cu-58"
   ]
  },
  {
   "id": "2",
   "titolo": {
    "it": "Desideri",
    "ru": "Желания",
    "uk": "Бажання",
    "en": "Wishes"
   },
   "items": [
    "cu-04",
    "cu-08",
    "cu-11",
    "cu-12",
    "cu-13",
    "cu-14",
    "cu-15",
    "cu-16",
    "cu-17",
    "cu-18",
    "cu-19",
    "cu-20",
    "cu-21",
    "cu-22",
    "cu-23",
    "cu-24",
    "cu-25",
    "cu-26",
    "cu-27",
    "cu-28"
   ]
  },
  {
   "id": "3",
   "titolo": {
    "it": "Richieste gentili: tu, Lei, voi",
    "ru": "Вежливые просьбы: tu, Lei, voi",
    "uk": "Ввічливі прохання: tu, Lei, voi",
    "en": "Polite requests: tu, Lei, voi"
   },
   "items": [
    "cu-02",
    "cu-03",
    "cu-06",
    "cu-09",
    "cu-41",
    "cu-42",
    "cu-43",
    "cu-44",
    "cu-45",
    "cu-46",
    "cu-47",
    "cu-48",
    "cu-49",
    "cu-50",
    "cu-51",
    "cu-52",
    "cu-53"
   ]
  },
  {
   "id": "4",
   "titolo": {
    "it": "Completa e rispondi",
    "ru": "Дополни и ответь",
    "uk": "Доповни й дай відповідь",
    "en": "Complete and answer"
   },
   "items": [
    "cu-29",
    "cu-30",
    "cu-31",
    "cu-32",
    "cu-33",
    "cu-34",
    "cu-35",
    "cu-36",
    "cu-37",
    "cu-38",
    "cu-39",
    "cu-40",
    "cu-59",
    "cu-60",
    "cu-61",
    "cu-62",
    "cu-63",
    "cu-64"
   ]
  }
 ],
 "g5-futuro-semplice": [
  {
   "id": "1",
   "titolo": {
    "it": "Le forme",
    "ru": "Формы futuro",
    "uk": "Форми futuro",
    "en": "The forms"
   },
   "items": [
    "fu-01",
    "fu-02",
    "fu-03",
    "fu-04",
    "fu-05",
    "fu-06",
    "fu-07",
    "fu-08",
    "fu-09",
    "fu-10",
    "fu-11",
    "fu-12",
    "fu-13",
    "fu-14",
    "fu-15",
    "fu-16"
   ]
  },
  {
   "id": "2",
   "titolo": {
    "it": "Rispondi alle domande",
    "ru": "Ответь на вопросы",
    "uk": "Дай відповідь на питання",
    "en": "Answer the questions"
   },
   "items": [
    "fu-17",
    "fu-18",
    "fu-19",
    "fu-20",
    "fu-21",
    "fu-22",
    "fu-23",
    "fu-24",
    "fu-37",
    "fu-38",
    "fu-39",
    "fu-40",
    "fu-41",
    "fu-42",
    "fu-43"
   ]
  },
  {
   "id": "3",
   "titolo": {
    "it": "Irregolari e ripasso",
    "ru": "Неправильные глаголы и повторение",
    "uk": "Неправильні дієслова й повторення",
    "en": "Irregular verbs and review"
   },
   "items": [
    "fu-25",
    "fu-26",
    "fu-27",
    "fu-28",
    "fu-29",
    "fu-30",
    "fu-31",
    "fu-32",
    "fu-33",
    "fu-34",
    "fu-35",
    "fu-36"
   ]
  }
 ],
 "g5-esserci": [
  {
   "id": "1",
   "titolo": {
    "it": "C'è o ci sono? Scrivi",
    "ru": "C'è или ci sono? Напиши форму",
    "uk": "C'è чи ci sono? Напиши форму",
    "en": "C'è or ci sono? Write the form"
   },
   "items": [
    "ec-01",
    "ec-02",
    "ec-03",
    "ec-04",
    "ec-05",
    "ec-06",
    "ec-07",
    "ec-08",
    "ec-09",
    "ec-10",
    "ec-11",
    "ec-12"
   ]
  },
  {
   "id": "2",
   "titolo": {
    "it": "Esserci, essere o stare?",
    "ru": "Esserci, essere или stare? Выбери",
    "uk": "Esserci, essere чи stare? Обери",
    "en": "Esserci, essere or stare?"
   },
   "items": [
    "ec-13",
    "ec-14",
    "ec-15",
    "ec-16",
    "ec-17",
    "ec-18",
    "ec-19",
    "ec-20",
    "ec-21",
    "ec-22",
    "ec-23",
    "ec-24",
    "ec-25",
    "ec-29",
    "ec-30",
    "ec-31",
    "ec-32",
    "ec-33",
    "ec-34"
   ]
  },
  {
   "id": "3",
   "titolo": {
    "it": "Ieri, oggi, domani",
    "ru": "Вчера, сегодня, завтра: в разных временах",
    "uk": "Учора, сьогодні, завтра: у різних часах",
    "en": "Yesterday, today, tomorrow"
   },
   "items": [
    "ec-26",
    "ec-27",
    "ec-28",
    "ec-35",
    "ec-36",
    "ec-37",
    "ec-38",
    "ec-39",
    "ec-40",
    "ec-41",
    "ec-42",
    "ec-43",
    "ec-44"
   ]
  }
 ],
 "g5-passato-prossimo-base": [
  {
   "id": "1",
   "titolo": {
    "it": "Scrivi la forma",
    "ru": "Напиши форму",
    "uk": "Напиши форму",
    "en": "Write the form"
   },
   "items": [
    "pp-01",
    "pp-02",
    "pp-03",
    "pp-04",
    "pp-05",
    "pp-09",
    "pp-10",
    "pp-12",
    "pp-16",
    "pp-17",
    "pp-18",
    "pp-19",
    "pp-20",
    "pp-21"
   ]
  },
  {
   "id": "2",
   "titolo": {
    "it": "Scegli la forma",
    "ru": "Выбери форму",
    "uk": "Обери форму",
    "en": "Choose the form"
   },
   "items": [
    "pp-06",
    "pp-07",
    "pp-08",
    "pp-11",
    "pp-13",
    "pp-14",
    "pp-15",
    "pp-22",
    "pp-23",
    "pp-24",
    "pp-25",
    "pp-26"
   ]
  }
 ],
 "g5-meteo": [
  {
   "id": "1",
   "titolo": {
    "it": "Piove, nevica, fa…: scrivi",
    "ru": "Piove, nevica, fa…: напиши форму",
    "uk": "Piove, nevica, fa…: напиши форму",
    "en": "Piove, nevica, fa…: write the form"
   },
   "items": [
    "me-01",
    "me-02",
    "me-03",
    "me-04",
    "me-05",
    "me-06",
    "me-07",
    "me-08",
    "me-09",
    "me-10",
    "me-11",
    "me-12",
    "me-13",
    "me-14"
   ]
  },
  {
   "id": "2",
   "titolo": {
    "it": "Scegli",
    "ru": "Выбери правильный вариант",
    "uk": "Обери правильний варіант",
    "en": "Choose the right option"
   },
   "items": [
    "me-15",
    "me-16",
    "me-17",
    "me-18",
    "me-19",
    "me-20",
    "me-21",
    "me-22"
   ]
  }
 ]
}
```
(ключ — `topic` набора; значение — массив для поля `blocchi`)

## Шаг 2. `src/content/a2/esercizi.ts`
- Тип `Blocco = { id: string; titolo: { it: string } & Tradotto; items: string[] }`; `Insieme.blocchi?: Blocco[]`.
- `blocchi(topicId, locale)` → `[{ numero, titoloIt, titolo: TestoTradotto, ids }]` или `[]`.
- `getEsercizi(locale, slug, blocco?)`: если у набора есть блоки и передан номер — вернуть только упражнения блока **в порядке блока**, плюс `blocco: { numero, totale, titoloIt, titolo, successivo?: { numero, titoloIt } }`. Неверный номер → `null`.
- `PARAMETRI_BLOCCHI: { slug, blocco }[]` для `generateStaticParams` и proxy.

## Шаг 3. Маршруты
- Новая страница `src/app/a2/esercizi/[slug]/[blocco]/page.tsx`: плеер только с упражнениями блока (как `[slug]/page.tsx`, с `generateStaticParams` из `PARAMETRI_BLOCCHI`).
- `src/app/a2/esercizi/[slug]/page.tsx`: если у темы есть блоки — вместо плеера страница выбора: заголовок темы + `ElencoBlocchi` (шаг 4) + ссылка «Torna all'argomento». Без блоков — как сейчас.
- `src/proxy.ts`: `/a2/esercizi/<slug>/<n>` существует только если у темы есть блоки и `n` от 1 до числа блоков; иначе 404.

## Шаг 4. Список блоков — новый компонент `src/components/esercizi/ElencoBlocchi.tsx`
- Строки в стиле списков на странице Unità (`Elenco` / `RigaElenco` / `TestoRiga`, если их можно переиспользовать):
  - сверху мелко `Blocco {n}` (label-2), заголовок — `titoloIt` (`lang="it"`), под ним перевод через `<Tr>`;
  - справа счётчик `X/N` по ответам (как `ConteggioEsercizi`, без слова «Esercizi»);
  - ссылка на `/a2/esercizi/<slug>/<n>`.
- Над списком подпись секции `Esercizi · {всего}`.

## Шаг 5. Страница темы — `src/app/a2/grammatica/[slug]/page.tsx`
- Блок «Esercizi» показывать **дважды**: сразу **после шапки** (до теории) и **в конце** (где сейчас).
- Тема с блоками → `ElencoBlocchi`. Тема без блоков → существующая карточка «Esercizi · N» (та же ссылка, что сейчас).

## Шаг 6. Страница Unità — `src/app/a2/grammatica/unita/[n]/page.tsx`
Под строкой темы, у которой есть блоки, — строки её блоков (с отступом, в том же `Elenco`): `Blocco n` · `titoloIt` · перевод · счётчик `X/N` → ссылка на блок. Темы без блоков — без изменений.

## Шаг 7. Плеер — `src/components/esercizi/PlayerEsercizi.tsx`
- Новый проп `chiave` (ключ сохранения): `topicId` для темы без блоков, `` `${topicId}#${n}` `` для блока. `leggiGiro` / `salvaGiro` / `cancellaGiro` / `salvaMigliore` используют `chiave`.
- Для блока: под названием темы строка `Blocco {n} di {totale} · {titoloIt}` (label-2) и перевод названия через `<Tr size="sm">`.
- При открытии блока темы с блоками один раз вызвать `cancellaGiro(topicId)` — старое сохранение «на всю тему» больше не нужно.
- `Finale`: если есть `successivo` — первой кнопкой `CAPSULA` ссылка `Blocco successivo →` на `/a2/esercizi/<slug>/<n+1>`, тогда «Ripeti» — `CAPSULA_2`. Последний блок — как сейчас. «Torna all'argomento» остаётся.

## Шаг 8. Валидатор — `scripts/validate-content.mjs` (раздел esercizi)
- у набора с > 20 упражнениями обязательны `blocchi`;
- если `blocchi` есть: каждый id из `items` ровно в одном блоке, неизвестных id нет; в блоке 5–20 упражнений; `id` блоков — "1", "2", … по порядку; у `titolo` непустые it, ru, uk, en.

## Шаг 9. Тесты
- Обновить тесты, которые **проходят упражнения** тем с блоками: открывать `/a2/esercizi/<slug>/<n>` и проверять счётчики блока. Ориентиры: первый блок forme начинается с cf-01 («studierei»), первый блок uso — с cu-01 (ситуация «Il tuo amico è sempre stanco…»), блок 1 passato — с pp-01. Тест Continua/Ricomincia — на `/a2/esercizi/uso-del-condizionale/1` с ответами, взятыми из данных этого блока.
- Тесты вёрстки (`centrato`, `fondo`, `navigazione`), которые открывают `/a2/esercizi/<slug>` тем с блоками, оставить на странице выбора и добавить в `centrato.spec.ts` одну страницу блока (`/a2/esercizi/uso-del-condizionale/2`).
- Новые тесты: (а) страница темы uso показывает 4 блока **до** теории; (б) в конце блока 1 uso есть «Blocco successivo →», он ведёт на блок 2; (в) `/a2/esercizi/uso-del-condizionale/9` → 404; (г) страница Unità 9 показывает строки блоков.

## Шаг 10. Проверки (по порядку, исправить ошибки)
```
node scripts/validate-content.mjs
npm run lint
npm run build
npm run test:layout
```

## Шаг 11. Коммит и push
```
git add scripts src tests docs/condizionale
git status
```
Без `docs/AUDIT*.md`. Затем:
```
git commit -m "Esercizi a blocchi: temi grandi divisi per argomento (≤ 20), Blocco successivo, elenco in cima all'argomento"
git push
```

## Шаг 12. Отчёт
Изменённые и новые файлы, что сделано по шагам 2–9, результаты 4 проверок, вывод `git push`.
