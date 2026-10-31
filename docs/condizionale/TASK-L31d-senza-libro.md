# Задание: убрать из приложения все ссылки на учебник

## Правило
У студентов приложения **нет нашего учебника**. В видимых текстах приложения не должно быть слов «учебник / підручник / textbook» и номеров страниц или упражнений учебника («стр. 46», «упр. C», «p. 46»).
Служебные поля, которые на экран не выводятся (`source` в `grammar.json`, флаг `SHOW_TEXTBOOK_CONTENT`, файлы в `docs/`), **не трогать**.

Поиск по `src` нашёл видимые ссылки только в двух местах (ниже). В `grammar.json` `textbook_table` есть только у `g5-imperfetto-vs-passato`, но на экране его нет: у темы есть lezione v2, а v1 не показывается.

## Общие правила
- Соблюдай CLAUDE.md. Делай только то, что здесь написано.
- Сохраняй форматирование JSON (отступ 1 пробел, без перевода строки в конце, порядок ключей). В diff — только изменённые строки.
- Не коммить. В конце — отчёт (шаг 5).

## Шаг 1. Упражнения — `src/content/a2/esercizi.json`
У **cu-29 … cu-34** (6 упражнений, набор `g5-condizionale-uso`) заменить поле `task` целиком на:
```json
{
 "ru": "Поставь глагол в condizionale.",
 "uk": "Постав дієслово в condizionale.",
 "en": "Put the verb in the condizionale."
}
```

## Шаг 2. Грамматика — урок `g5-condizionale-forme`, поле `inBreve`
Заменить две строки массива `inBreve`, в которых есть «(в учебнике: …)» / «(у підручнику: …)» / «(textbook: …)» — это строки про `condizionale presente` и `condizionale passato` (индексы 2 и 3). Новый текст для каждого языка:

**ru** (`src/content/a2/ru/lezioni.json`)
- `"**{{condizionale presente}}** (другое название: {{condizionale semplice}}) — «бы» сейчас или в будущем"`
- `"**{{condizionale passato}}** (другое название: {{condizionale composto}}) — «бы» в прошлом"`

**uk** (`src/content/a2/uk/lezioni.json`)
- `"**{{condizionale presente}}** (інша назва: {{condizionale semplice}}) — «б» зараз або в майбутньому"`
- `"**{{condizionale passato}}** (інша назва: {{condizionale composto}}) — «б» у минулому"`

**en** (`src/content/a2/en/lezioni.json`)
- `"**{{condizionale presente}}** (also called {{condizionale semplice}}) — “would” now or in the future"`
- `"**{{condizionale passato}}** (also called {{condizionale composto}}) — “would have” in the past"`

Остальные строки `inBreve` не менять.

## Шаг 3. Защита на будущее — `scripts/validate-content.mjs`
Добавить проверку: в `src/content/a2/{ru,uk,en}/lezioni.json` и в `src/content/a2/esercizi.json` ни одна строка (рекурсивно по всем значениям, **кроме** ключа `source`) не содержит:
`/учебник|підручник|textbook|libro di testo|\bстр\.\s*\d|\bупр\.|\bp\.\s*\d|\bpag\.\s*\d/i`
Ошибка: `<файл>: riferimento al libro di testo — "<фрагмент до 60 символов>"`.
Проверить, что после шагов 1–2 валидатор проходит, а если временно вернуть старый текст cu-29, он ловит ошибку (потом вернуть исправление).

## Шаг 4. Проверки (по порядку, исправить ошибки)
```
node scripts/validate-content.mjs
npm run lint
npm run build
npm run test:layout
```
Потом поиск, который должен ничего не найти:
```
grep -rniE "учебник|підручник|textbook|стр\. ?[0-9]|упр\." src/content/a2/esercizi.json src/content/a2/*/lezioni.json
```

## Шаг 5. Отчёт
Изменённые файлы, сколько строк заменено, вывод последнего `grep`, результаты 4 проверок. Не коммить.
