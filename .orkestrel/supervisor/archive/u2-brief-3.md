# U2 fix round 1 — successor to u2-brief-2.md

Two Orchestrator-verified findings from the acceptance run (your sandbox denies listeners; both
are invisible to you). Test-side fixes only; no product source changes.

## Finding 1 — the integration harness imports the Vue-bound barrel from a Vue-less project

```text
FAIL |app:browser:integration| both test files, at import analysis:
"contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files."
File: app/browser/ApplicationView.vue (pulled transitively)
```

`app/browser/index.ts` re-exports `factories.js`, which imports `ApplicationView.vue`; your new
`import { BrowserApplicationError, isApplicationRoster } from '@app/browser'` in
`tests/app/browser/integration/setup.ts` therefore pulls the `.vue` file into the Node-side
integration project, which has no Vue plugin (correctly — it drives a real browser, it does not
mount components). Fix in the harness: import the two symbols from their owning module files
(`errors` and `validators`) in whatever form the workspace alias and lint rules permit for test
files, not from the barrel. Do not make the barrel Vue-free and do not touch the vite config —
the barrel's Vue binding is the browser package working as designed.

## Finding 2 — the login command-sequence assertion predates the feature it now observes

```text
FAIL |app:browser (chromium)| tests/app/browser/controllers/Operator.test.ts:162
expected [ 'login', 'session', 'roster:watch' ] to deeply equal [ 'login', 'session' ]
```

The recorded `roster:watch` after login is exactly criterion 3 working (the manager starts on
session adoption). Update the assertion to the new true sequence. Sweep the same file for any
other command-sequence assertion the manager's lifecycle now extends (logout/abort ordering), and
update those the same way — name each one you touch in the report.

## Gates

Static gates in your sandbox; the Orchestrator runs the browser and integration projects as
acceptance.

## Output

The diffs; `git status --porcelain`; one line per finding; deviations or none.
