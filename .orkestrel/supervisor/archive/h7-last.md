Implemented H7a–c with no commits and no `src/core` changes.

### Touched files

```text
app/browser/components/HistoryView.vue
app/browser/controllers/HistoryManager.ts
app/browser/seeders.ts
app/browser/services/ClientHistory.ts
app/browser/types.ts
app/core/helpers.ts
app/core/parsers.ts
app/core/types.ts
app/server/SupervisorApplication.ts
tests/app/browser/components/HistoryView.test.ts
tests/app/browser/controllers/HistoryManager.test.ts
tests/app/browser/controllers/Operator.test.ts
tests/app/browser/services/ClientHistory.test.ts
tests/app/core/helpers.test.ts
tests/app/core/parsers.test.ts
tests/app/server/ApplicationRoutes.test.ts
tests/app/server/SupervisorApplication.test.ts
```

```text
17 files changed, 245 insertions(+), 56 deletions(-)
```

| Layer | Closure |
|---|---|
| Contract/parser/leaf | Added `HistoryQuery.name`, bounded free-text parsing, and `matchesRunName`; slash/backslash accepted, blank/control/oversize rejected. |
| Server join | Added case-insensitive name matching to the existing snapshot qualification guard. Prefix and name combine with AND; exactly one store page is read. |
| Manager/transport | Added `HistoryFilter`, replaced `prefix` with `filter`, transported `name`, normalized all-blank filters to `undefined`, and preserved both halves across retry/older. |

### Proofs

```text
npm run test:app:core
Test Files  4 passed (4)
Tests       106 passed (106)
```

```text
npm run test:src:core
Test Files  14 passed (14)
Tests       178 passed (178)
```

```text
npx vitest run tests/app/server/SupervisorApplication.test.ts \
  tests/app/server/ApplicationRoutes.test.ts \
  --config vite.config.ts --no-cache --reporter=dot --project app:server

Test Files  2 passed (2)
Tests       4 passed (4)
```

The server proofs cover the unique name match, empty page with cursor, later-page first match, prefix/name AND, authorization, and real dispatcher query flow.

```text
npm run format:check → exit 0
npm run lint:check   → exit 0
npm run check        → exit 0
npm run build        → exit 0
npm run test:policy  → 17 passed
```

Scope audits:

```text
if git diff -- src/core | grep -n .; then exit 1; else echo 'no src/core diff'; fi
no src/core diff

if git diff -- guides | grep -n .; then exit 1; else echo 'no guides diff'; fi
no guides diff

rg old HistoryManager prefix consumers
zero old manager-prefix consumers
```

Browser suites awaiting the Orchestrator’s listener-capable bench:

- `tests/app/browser/controllers/HistoryManager.test.ts`
- `tests/app/browser/services/ClientHistory.test.ts`
- `tests/app/browser/controllers/Operator.test.ts`
- `tests/app/browser/components/HistoryView.test.ts`
- Full `npm run test:app:browser` and browser integration projects

The minimal mechanical [HistoryView.vue](/workspace/supervisor/app/browser/components/HistoryView.vue:51) edits are lines 51, 74, 83, 143, 270, and 275; no copy, field, or structure was added.

Guide parity remains intentionally off-limits. H7 adds exactly two missing exported symbols to the existing parity backlog: `HistoryFilter` and `matchesRunName`. The guide also still needs the new name-query validation, AND join/page law, and manager filter contract documented.

An additional out-of-scope `test:src:server` run had 20 failures confined to untouched provider subprocess-fixture suites; no H7 or `src/core` files were implicated.

### Status

```text
 M app/browser/components/HistoryView.vue
 M app/browser/controllers/HistoryManager.ts
 M app/browser/seeders.ts
 M app/browser/services/ClientHistory.ts
 M app/browser/types.ts
 M app/core/helpers.ts
 M app/core/parsers.ts
 M app/core/types.ts
 M app/server/SupervisorApplication.ts
 M tests/app/browser/components/HistoryView.test.ts
 M tests/app/browser/controllers/HistoryManager.test.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/services/ClientHistory.test.ts
 M tests/app/core/helpers.test.ts
 M tests/app/core/parsers.test.ts
 M tests/app/server/ApplicationRoutes.test.ts
 M tests/app/server/SupervisorApplication.test.ts
```

No implementation deviations.