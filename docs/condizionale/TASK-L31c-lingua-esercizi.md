# Задание: упражнения не меняют язык после переключения

## Ошибка
Открываешь упражнения (например `/a2/esercizi/uso-del-condizionale`), отвечаешь на несколько, переключаешь язык RU → EN.
Переключатель показывает EN, но условие (`task`), ситуация, перевод (`tr`) и объяснение (`why`) остаются **на старом языке** до перезагрузки страницы.

## Причина
`src/components/esercizi/PlayerEsercizi.tsx`, компонент `Giro`:
```ts
const [giro, setGiro] = useState(voci);
```
`giro` хранит **копию** объектов `voci` с первого рендера. После смены языка `LanguageSwitcher` вызывает `router.refresh()`, сервер присылает новые `voci` на новом языке, но `giro` их не видит.
(По той же причине после правки данных открытая вкладка показывала старую версию упражнения.)

## Общие правила
- Соблюдай CLAUDE.md. Делай только то, что здесь написано.
- Изменения из TASK-L31 и TASK-L31b ещё **не закоммичены** — не трогай и не откатывай их.
- Не коммить. В конце — отчёт (шаг 4).

## Шаг 1. Исправление — `src/components/esercizi/PlayerEsercizi.tsx`, компонент `Giro`
Хранить в состоянии **только id** упражнений, а сами объекты брать из текущих props `voci`:
- `const [giroIds, setGiroIds] = useState(() => voci.map((v) => v.id));`
- `const perId = new Map(voci.map((v) => [v.id, v]));` и
  `const giro = giroIds.map((id) => perId.get(id)).filter((v): v is VoceEsercizio => v !== undefined);`
- в `ricomincia`: `setGiroIds(nuovo.map((v) => v.id))` вместо `setGiro(nuovo)` (логику «только ошибки» не менять).
- Всё остальное (`pos`, `esiti`, `ordiniOpzioni`, прогресс, фокус) не менять: ответы, позиция и порядок вариантов при смене языка **сохраняются**.
- Обновить комментарий над `Giro`: «Nello stato solo gli id: i testi arrivano sempre da `voci`, così dopo il cambio di lingua (router.refresh) si vedono nella lingua nuova».

## Шаг 2. Тест — `tests/esercizi.spec.ts`
Новый тест «cambio lingua durante il giro: testi nella lingua nuova, risposte conservate»:
1. cookie `bv_lang = ru`, открыть `/a2/esercizi/uso-del-condizionale`;
2. проверить, что виден текст `Прочитай ситуацию и выбери, что сказать.`;
3. нажать вариант `Dovresti dormire di più.` → в `role=status` есть `Giusto`;
4. переключить язык через кнопку `/Lingua delle spiegazioni/` → option `English`;
5. проверить: виден `Read the situation and choose what to say.`, в `role=status` есть `Soft advice → dovresti`, счётчик всё ещё `1 / 40`.

## Шаг 3. Проверки (по порядку, исправить ошибки)
```
node scripts/validate-content.mjs
npm run lint
npm run build
npm run test:layout
```

## Шаг 4. Отчёт
Изменённые файлы, что именно поменял в `Giro`, результаты 4 проверок. Не коммить.
