# Gate report — roughnotes acceptance run

## Gate 1: `npm run format:check`
PASS (exit 0). `oxfmt` reports "All matched files use the correct format." across 123 files.

## Gate 2: `npm run lint:check`
PASS (exit 0). `oxlint --deny-warnings` reports no findings.

## Gate 3: `npm run check`
PASS (exit 0). `tsc --noEmit --project tsconfig.json`, `tsc --noEmit -p configs/app/tsconfig.core.json`, and `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` all completed with no diagnostics.

## Gate 4: `npm run build`
PASS (exit 0). `vite build` emitted `dist/app/browser/assets/index-hhVhdyP4.css` at 323.24 kB and `dist/app/browser/assets/index-JgmjezLh.js` at 507.37 kB. Build reported a non-failing informational warning (expected): "Some chunks are larger than 500 kB after minification" and a `[PLUGIN_TIMINGS]` diagnostic — both are Rolldown/Vite build-reporter notices, not failures.

## Gate 5: `npm test`
PASS (exit 0). Per-project counts:
- app: 43 files passed, 192 tests passed
- journey (four variants): 4 files passed, 76 tests passed, 4 skipped (80 total)
- policy: 1 file passed, 111 tests passed
- config: 1 file passed, 46 tests passed
- setup: 1 file passed, 3 tests passed
- conformance: 1 file passed, 12 tests passed

Non-failing stderr during the app run (expected): two `[Vue warn]` lines from `tests/app/browser/composables/useApplication.test.ts:12` — the test asserts a thrown error when `APPLICATION_KEY` is absent, and Vue logs the injection warning and the unhandled setup error as part of that same expected failure path.

## `git status --short`
Dirty by design, as instructed. Modified: `app/browser/components/{ContactForm,ContactView,HomeView,NewsletterView,PaymentForm,PaymentView,SubscribeForm,SubscribeView}.vue`, `app/browser/constants.ts`, `guides/README.md`, and six matching test files under `tests/app/browser/components/`. Untracked: four campaign artifacts under `.orkestrel/roughnotes/`.

## `git diff --check`
PASS (exit 0). No whitespace-error output.

## Extra check: `deprecat` sweep (case-insensitive) across the complete build output and complete test output
Count: 0.

## Extra check: built CSS asset byte size
`dist/app/browser/assets/index-hhVhdyP4.css` = 323,241 bytes = 323.24 kB. Matches the required 323.24 kB.

## Extra check: retired-sentence sweep (tree-wide, excluding `node_modules`, `dist`, `tmp`, `.orkestrel`)
Every hit below sits inside `not.toContain(...)` negative bindings in test files; none is drift.

| Sentence | Count | Locations |
| --- | --- | --- |
| `could not be sent` | 2 | `tests/app/browser/components/ContactForm.test.ts:75`, `tests/app/browser/components/SubscribeForm.test.ts:73` |
| `could not be recorded` | 1 | `tests/app/browser/components/PaymentForm.test.ts:74` |
| `You are subscribed` | 0 | none |
| `is recorded on this device` | 0 | none |
| `Print and digital delivery is recorded` | 0 | none |
| `answers on the number` | 1 | `tests/app/browser/components/ContactView.test.ts:83` |
| `Nothing was sent off this device` | 0 | none |
| `Fixture only` | 3 | `tests/app/browser/components/ContactForm.test.ts:25`, `tests/app/browser/components/PaymentForm.test.ts:25`, `tests/app/browser/components/SubscribeForm.test.ts:25` |

(`.orkestrel/roughnotes/*.md` campaign notes carry additional references to these retired sentences in prose and are excluded from the sweep scope per instruction.)

## Anomalies
None observed. No flakes, no cache weirdness on this run.

## Overall verdict
GREEN. Every gate passed on its own merit; `git diff --check` is clean; the deprecation sweep is zero; the CSS asset matches the required size exactly; every retired-sentence hit is a negative-binding test assertion, not drift.

GATES: GREEN
