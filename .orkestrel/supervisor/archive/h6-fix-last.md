Implemented H6’s six fix items from baseline `7ebb93d`.

### Touched files

Production:

- [HistoryManager.ts](/workspace/supervisor/app/browser/controllers/HistoryManager.ts)
- [types.ts](/workspace/supervisor/app/browser/types.ts)
- [HistoryView.vue](/workspace/supervisor/app/browser/components/HistoryView.vue)
- [OpenPanel.vue](/workspace/supervisor/app/browser/components/OpenPanel.vue)
- [ApplicationView.vue](/workspace/supervisor/app/browser/ApplicationView.vue)

Proofs and fixtures:

- [HistoryManager.test.ts](/workspace/supervisor/tests/app/browser/controllers/HistoryManager.test.ts)
- [HistoryView.test.ts](/workspace/supervisor/tests/app/browser/components/HistoryView.test.ts)
- [OpenPanel.test.ts](/workspace/supervisor/tests/app/browser/components/OpenPanel.test.ts)
- [ApplicationView.test.ts](/workspace/supervisor/tests/app/browser/ApplicationView.test.ts)
- [integration.test.ts](/workspace/supervisor/tests/app/browser/integration/integration.test.ts)
- [integration/setup.ts](/workspace/supervisor/tests/app/browser/integration/setup.ts)
- [setupBrowser.ts](/workspace/supervisor/tests/setupBrowser.ts)

Diffstat: **12 files, 244 insertions, 96 deletions**.

### Closure

| Item | Result |
|---|---|
| 1 | `changed` now keys ordered `(id, updated)` departures, remains true during first-page refresh and `older()`, and re-baselines only on a successful current-generation first page. |
| 2 | Session-retention copy now says runs remain marked “Last seen” for the rest of the session. |
| 3 | Whitespace is used only to detect clearing; leading/trailing spaces otherwise reach history unchanged. |
| 4 | Disclosure visibly says “Open by id”; selected `bi-folder2-open`. |
| 5 | `ContentPane` remains mounted behind a neutral native-hidden wrapper, preserving register and scroll state without disturbing operator state. |
| 6 | Partial/count/submit strings match the brief exactly. |

### Proof coverage

Item 1 manager proofs bind:

- start and identical redelivery → unchanged;
- departure → changed;
- unrelated roster activity and `older()` → remains changed;
- empty departure baseline → clean;
- in-flight first-page read → remains changed until resolution;
- stale-generation read → cannot re-baseline;
- absent initial roster snapshot → guarded false.

The component proof binds the new sentence and manual Refresh behavior. The promoted integration regression carries: History → start → no affordance → stop → affordance → Refresh → cleared and listed.

Item 5’s component proof narrows to transcript-only, scrolls away from the newest entry, enters History, returns, and verifies the same feed node, register selection, and scroll position.

### Gate evidence

- `npm run format:check` → `All matched files use the correct format.`
- `npm run lint:check` → exit 0, no warnings.
- `npm run check` → all root, src, and app TypeScript projects passed.
- `npm run build` → src core/server and app browser/server built successfully.
- `npm run test:policy` → **1 file, 17 tests passed**.
- `git diff --check` → exit 0.

Awaiting native Orchestrator execution because this sandbox denies required listeners:

- `app:browser`
- `app:browser:integration`
- Full seven-project acceptance: `src:core`, `src:server`, `app:core`, `app:browser`, `app:browser:integration`, `app:server`, `policy`
- Changed/loading/Back-journey capture portfolio

### Guide parity delta

`guides/**` remained untouched as required. `npm run test:guides` reports the existing baseline drift: **8 failed, 296 passed**. Exact failures are 77 undocumented exports; missing `list` for three store tables; missing `ApplicationInterface.history`; and phantom `destroy`/`roster` method rows.

For this fix specifically, the guide still lacks `HistoryManager` entirely, including the departure-based `changed` semantics and `older()` non-rebaseline rule, and its component inventory still omits `HistoryView` and misdescribes `OpenPanel`.

Implementation deviations: none.

### `git status --porcelain`

```text
 M app/browser/ApplicationView.vue
 M app/browser/components/HistoryView.vue
 M app/browser/components/OpenPanel.vue
 M app/browser/controllers/HistoryManager.ts
 M app/browser/types.ts
 M tests/app/browser/ApplicationView.test.ts
 M tests/app/browser/components/HistoryView.test.ts
 M tests/app/browser/components/OpenPanel.test.ts
 M tests/app/browser/controllers/HistoryManager.test.ts
 M tests/app/browser/integration/integration.test.ts
 M tests/app/browser/integration/setup.ts
 M tests/setupBrowser.ts
```