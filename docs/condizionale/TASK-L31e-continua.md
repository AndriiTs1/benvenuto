# Задание: исправление регулярки + «Continua / Ricomincia» в упражнениях + коммит и push

## Общие правила
- Соблюдай CLAUDE.md. Делай только то, что здесь написано.
- Изменения из TASK-L31d ещё **не закоммичены** — не трогай и не откатывай их, они войдут в этот же коммит.
- Сохраняй форматирование JSON. Новых пакетов не ставить.

## Шаг 1. Регулярка в `scripts/validate-content.mjs` (доработка TASK-L31d)
В JavaScript `\b` работает только с латиницей, поэтому `\bстр` и `\bупр` никогда не срабатывают.
Заменить `\bстр` → `(?<![а-яёіїєґ])стр` и `\bупр` → `(?<![а-яёіїєґ])упр` (флаг `i` оставить).
Проверка: временно вставить в `task.ru` упражнения cu-29 текст `"см. стр. 46"`, потом `"(упр. C)"` — каждый раз валидатор должен выдать ошибку. После проверки вернуть данные как были.

## Шаг 2. Продолжение с места остановки — `src/components/esercizi/PlayerEsercizi.tsx`

### Проблема
Плеер не помнит, где студент остановился. После перезагрузки страницы, закрытия вкладки или возврата позже упражнения начинаются с «1 / N», хотя половина уже пройдена.

### 2a. Сохранение круга
Ключ localStorage: `benvenuto.giro.a2` — объект `{ [topicId]: GiroSalvato }`.
```ts
type GiroSalvato = {
  ids: string[];                         // giroIds
  pos: number;
  esiti: Record<string, Esito>;
  ordini: Record<string, number[]>;      // ordiniOpzioni
  completo: boolean;
};
```
- Чтение и запись — через функции в `src/lib/progress.ts` (`leggiGiro(topicId)`, `salvaGiro(topicId, giro)`, `cancellaGiro(topicId)`), по образцу существующих `leggi` / `scrivi`: всё в `try/catch`, без ошибок в приватном режиме.
- В `Giro`: `useEffect` сохраняет текущий круг при каждом изменении `giroIds`, `pos`, `esiti`, `ordiniOpzioni`, `completo` — **только если** `pos > 0 || есть хотя бы один ответ` и круг не закончен.
- Круг закончен (`pos >= giro.length`) → `cancellaGiro(topicId)`.
- `ricomincia(...)` → `cancellaGiro(topicId)` и новый круг, как сейчас.

### 2b. Восстановление при открытии
- В `Giro` при первом рендере (компонент уже рендерится только в браузере) прочитать `leggiGiro(topicId)`.
- Сохранённый круг **годится**, только если: все `ids` есть в текущих `voci`; у каждого choice-упражнения из `ids` есть `ordini[id]` нужной длины (`options.length`); `0 < pos < ids.length` или есть ответы. Иначе — `cancellaGiro` и обычный старт с 1 (содержимое могло измениться).
- Если годится — сначала показать **экран выбора** вместо упражнения:
  - карточка `rounded-3xl bg-card px-4 py-8 text-center` (как в `Finale`):
    - крупно `{pos} / {ids.length}` (класс как у счёта в `Finale`, с `id="esercizio-frase" tabIndex={-1}`);
    - под ним `text-[17px] text-label-2`: `esercizi fatti`;
  - кнопка `CAPSULA`: `Continua dal {pos + 1}` → восстановить `giroIds`, `pos`, `esiti`, `ordiniOpzioni`, `completo` из сохранённого и показать упражнение `pos + 1`;
  - кнопка `CAPSULA_2`: `Ricomincia` → `cancellaGiro` и новый полный круг с 1 (как `ricomincia(false)`).
- Тексты интерфейса на итальянском (как «Avanti», «Ripeti»), без новых цветов и стилей.
- Счётчик `{pos + 1} / {N}` в шапке на экране выбора **не показывать**.
- Фокус после «Continua» — на `#esercizio-frase` текущего упражнения (как после «Avanti»).
- Смена языка (`router.refresh()`) не должна сбрасывать круг и не должна заново показывать экран выбора.

### 2c. Комментарий
Над `Giro` дописать: «Il giro in corso si salva in localStorage (benvenuto.giro.a2): riaprendo la pagina si sceglie Continua o Ricomincia».

## Шаг 3. Тесты — `tests/esercizi.spec.ts`
Новый тест «riapro la pagina: Continua dal punto giusto, Ricomincia da 1» на `/a2/esercizi/uso-del-condizionale` (cookie `bv_lang = ru`):
1. ответить на упражнение 1 (`Dovresti dormire di più.`), нажать «Avanti»; ответить на упражнение 2 (`Vorrei un caffè.`), нажать «Avanti» → видно `3 / 40`;
2. `page.reload()` → видны `2 / 40`, `esercizi fatti`, кнопки `Continua dal 3` и `Ricomincia`;
3. «Continua dal 3» → видно `3 / 40`;
4. `page.reload()` → «Ricomincia» → видно `1 / 40`;
5. `page.reload()` → экрана выбора нет, сразу `1 / 40`.

Существующие тесты (в т.ч. «cambio lingua durante il giro») должны проходить. Если какой-то тест открывает упражнения после другого в том же контексте и спотыкается об экран выбора — очищать `localStorage` в начале таких тестов, а не менять логику.

## Шаг 4. Проверки (по порядку, исправить ошибки)
```
node scripts/validate-content.mjs
npm run lint
npm run build
npm run test:layout
```

## Шаг 5. Коммит и push
Только если все 4 проверки прошли:
```
git add scripts src tests docs/condizionale
git status
```
В списке не должно быть `docs/AUDIT*.md`. Затем:
```
git commit -m "Esercizi: Continua / Ricomincia; niente riferimenti al libro di testo (cu-29–34, In breve, validatore)"
git push
```

## Шаг 6. Отчёт
Изменённые файлы, что сделано по шагам 1–3, результаты 4 проверок, вывод `git status` и `git push`.
