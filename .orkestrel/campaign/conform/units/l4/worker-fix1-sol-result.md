## Citation rewrites
- `src/server/factories.ts:97`
- `src/server/helpers.ts:8,10`
- `src/server/types.ts:16,79`
- `src/core/types.ts:6,18,68,83`
- `tests/src/server/handlers.test.ts:239`
- `tests/src/core/factories.test.ts:5-8`
- `tests/src/core/Worker.test.ts:33,1198,1212`
- `tests/setup.ts:5`
- `tests/setupServer.ts:3,21,39`
- `tests/guides.test.ts:3`
- `guides/worker.md:20,127,155,178,190,249-251,355`
- `guides/worker.md:570-581` — removed citation-only list item.
- `guides/README.md:3`
- `guides/README.md:60-66` — removed citation-only section.

## Claim-3 sweeps
- `spawnThread` inflections: no hits.
- `QueueExecution`: no hits.
- Dispatch inflections: permitted English senses at `src/server/Dispatch.ts:10`, `src/server/types.ts:34`, `tests/src/server/helpers.test.ts:52,537`, `guides/worker.md:225,320`.

## Isolated control pairs
- Obj7: setup test command; red `1 failed`, green `1 passed`. Captures: `obj7-control-red-isolated.txt`, `obj7-green-isolated.txt`.
- Obj8: server helper test with escaped parenthesized name; red `1 failed`, green `1 passed`. Captures: `obj8-control-red-isolated.txt`, `obj8-green-isolated.txt`.

## O1 sites
- `tests/guides.test.ts:23`: imports `isNumber`.
- `tests/setupServer.test.ts:82-152`: uses `isNumber` and recorder handlers.
- `tests/setupServer.ts:27-34`: exports `createThrowingSuccess`.
- `tests/src/server/factories.test.ts:149-216`: uses the extracted factory, recorder handlers, and non-function replacement data.

## O2 sentence
`src/server/factories.ts:104-106` names optional `on`, `error`, `workerData`, `concurrency`, `retries`, `timeout`, and `store`.

## O3 pointers
Refreshed pointers into:
- `src/server/types.ts`
- `src/server/factories.ts`
- `tests/setupServer.ts`
- `tests/guides.test.ts`

## Nested-function sweep
Only `tests/src/server/helpers.test.ts:479` matched. It is arithmetic grouping, not a function.

## git status --short
```text
 M README.md
 M guides/README.md
 M guides/worker.md
 M src/core/Worker.ts
 M src/core/factories.ts
 M src/core/types.ts
 M src/server/Dispatch.ts
 M src/server/NodeWorker.ts
 M src/server/factories.ts
 M src/server/handlers.ts
 M src/server/helpers.ts
 M src/server/index.ts
 M src/server/types.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/Worker.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/server/factories.test.ts
 M tests/src/server/fixtures/abortable.ts
 M tests/src/server/fixtures/crash.ts
 M tests/src/server/fixtures/identify.ts
 M tests/src/server/fixtures/load-throw.ts
 M tests/src/server/fixtures/slow.ts
 M tests/src/server/fixtures/throw-async.ts
 M tests/src/server/handlers.test.ts
 M tests/src/server/helpers.test.ts
```

## Gates and scoped runs
- `npm run format:check`: exit 0
- `npm run lint:check`: exit 0
- `npm run check`: exit 0
- Setup server: exit 0
- Guides: exit 0
- Server factories: exit 0
- Server helpers: exit 0
- Server handlers: exit 0
- Core factories: exit 0
- Core Worker: exit 0
- Base setup: exit 0