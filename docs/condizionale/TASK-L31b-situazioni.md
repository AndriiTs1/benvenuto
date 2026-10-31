# Задание: ситуации в упражнениях «Uso» — по-итальянски с переводом

Проблема: в cu-01…cu-10 (набор `g5-condizionale-uso`) ситуация показана только на языке объяснений (RU/UK/EN), а варианты ответа — по-итальянски. Студенту непонятно.
Решение: ситуация показывается **по-итальянски крупно**, под ней — **перевод** мелко через `<Tr>`. После ответа всё как сейчас (Risposta corretta → tr → why).

## Общие правила
- Соблюдай CLAUDE.md. Делай только то, что здесь написано.
- Предыдущие изменения (задание TASK-L31) ещё **не закоммичены** — не трогай и не откатывай их.
- Сохраняй форматирование JSON (отступ 1 пробел, без перевода строки в конце, порядок ключей). В diff — только изменённые строки.
- Не коммить. В конце — отчёт (шаг 6).

## Шаг 1. Данные — `src/content/a2/esercizi.json`
1a. Каждому из cu-01…cu-10 добавить поле `situationIt` (ставить сразу **после** `situation`). Значения — как есть:

```json
{
  "cu-01": "Il tuo amico è sempre stanco. Dagli un consiglio gentile.",
  "cu-02": "Sei al bar. Chiedi un caffè in modo gentile.",
  "cu-03": "Chiedi a una persona che non conosci (Lei) di chiudere la finestra.",
  "cu-04": "Parli di un sogno: vuoi visitare Roma.",
  "cu-05": "La tua amica sta male. Dalle un consiglio: «al posto tuo…»",
  "cu-06": "In classe chiedi un foglio a un compagno.",
  "cu-07": "Dici la tua opinione in modo gentile: è meglio aspettare.",
  "cu-08": "Esprimi un desiderio: l'estate prossima, un viaggio in Sicilia.",
  "cu-09": "Chiedi all'insegnante (Lei) di ripetere, in modo gentile.",
  "cu-10": "Fabio vuole lasciare il lavoro. Dagli un consiglio gentile."
}
```

1b. У этих упражнений заменить **целиком** поле `situation` (ru, uk, en) на новые значения. У cu-01, cu-04, cu-07 `situation` **не менять**.

```json
{
  "cu-02": {
    "ru": "Ты в баре. Вежливо попроси кофе.",
    "uk": "Ти в барі. Ввічливо попроси каву.",
    "en": "You're at the bar. Politely ask for a coffee."
  },
  "cu-03": {
    "ru": "Попроси незнакомого человека (Lei) закрыть окно.",
    "uk": "Попроси незнайому людину (Lei) зачинити вікно.",
    "en": "Ask a stranger (Lei) to close the window."
  },
  "cu-05": {
    "ru": "Подруге плохо. Дай ей совет: «на твоём месте…»",
    "uk": "Подрузі погано. Дай їй пораду: «на твоєму місці…»",
    "en": "Your friend feels unwell. Give her advice: “if I were you…”"
  },
  "cu-06": {
    "ru": "На уроке просишь у одноклассника лист.",
    "uk": "На уроці просиш в однокласника аркуш.",
    "en": "In class you ask a classmate for a sheet of paper."
  },
  "cu-08": {
    "ru": "Вырази желание: следующим летом — поездка на Сицилию.",
    "uk": "Вислови бажання: наступного літа — поїздка на Сицилію.",
    "en": "Express a wish: next summer, a trip to Sicily."
  },
  "cu-09": {
    "ru": "Вежливо попроси учителя (Lei) повторить.",
    "uk": "Ввічливо попроси вчителя (Lei) повторити.",
    "en": "Politely ask the teacher (Lei) to repeat."
  },
  "cu-10": {
    "ru": "Фабио хочет уйти с работы. Дай ему мягкий совет.",
    "uk": "Фабіо хоче піти з роботи. Дай йому м’яку пораду.",
    "en": "Fabio wants to quit his job. Give him gentle advice."
  }
}
```

## Шаг 2. Типы — `src/content/a2/esercizi.ts`
- В `VoceChoice` добавить `situationIt?: string`.
- В тип `VoceEsercizio` (ветка choice) добавить `situationIt?: string`.
- В `getEsercizi` передавать `situationIt: v.situationIt`.
- Обновить комментарий в начале файла: «situation (solo choice, facoltativa): situationIt — la situazione in italiano; situation — la sua traduzione nella lingua delle spiegazioni».

## Шаг 3. Плеер — `src/components/esercizi/PlayerEsercizi.tsx`
Компонент `Situazione` (сейчас ~строка 267) переделать так:
- принимает `situazioneIt: string` и `traduzione` (то, что сейчас `situazione`);
- карточка та же: `rounded-2xl bg-card p-4`;
- внутри сначала `<p lang="it" id="esercizio-frase" tabIndex={-1} className="text-[19px] leading-snug font-medium outline-none md:text-[20px]">{situazioneIt}</p>` — основной цвет текста;
- под ним `<Tr locale={traduzione.lingua} as="p" size="sm" className="mt-1.5 block">{traduzione.testo}</Tr>`;
- `id="esercizio-frase"` теперь стоит только на итальянском тексте (фокус после «Avanti» остаётся на нём).
В строке ~163 условие: показывать `Situazione`, если у voce есть `situation` **и** `situationIt`; иначе `Frase`, как сейчас.
Никаких новых цветов и стилей — только существующие классы и `<Tr>`.

## Шаг 4. Валидатор — `scripts/validate-content.mjs` (раздел esercizi, блок `conSituazione`)
- если есть `situation` → обязательно непустое `situationIt`, иначе ошибка `${dove} situation senza situationIt`;
- в `situationIt` нет кириллицы (`/[\u0400-\u04FF]/`), иначе ошибка `${dove} situationIt non è in italiano`;
- если есть `situationIt` без `situation` → ошибка `${dove} situationIt senza situation`.

## Шаг 5. Тесты — `tests/condizionale.spec.ts`, тест «esercizi uso» (язык en)
- `#esercizio-frase` → `toHaveText("Il tuo amico è sempre stanco. Dagli un consiglio gentile.")`;
- добавить проверку: виден перевод `"Your friend is always tired. Give gentle advice."`;
- остальное в тесте не менять (3 кнопки, неверный ответ, «Soft advice → dovresti»).

Запустить по порядку и исправить ошибки:
```
node scripts/validate-content.mjs
npm run lint
npm run build
npm run test:layout
```

## Шаг 6. Отчёт
Список изменённых файлов; сколько упражнений получили `situationIt` (ожидается 10); результаты 4 проверок. Не коммить.
