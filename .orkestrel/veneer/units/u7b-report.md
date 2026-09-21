<!-- Retained from u7b-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7b.jsonl, thread 01a0c1cf-d569-7140-8e47-d0a6d15c56bd, exit 0, 2026-09-21. Implementation complete and every gate exit 0; one deviation on the error contract (native TypeError against the AppError rule) for the Orchestrator's ruling. -->

U7b implementation report — 2026-09-20

The engine, delegation, and browser proofs are implemented, and every required gate exits 0. The unit stops on an error-contract scope conflict: Button uses native `TypeError` for constructor refusals, while scaffold requires `AppError`. Resolving that conflict requires an error declaration outside the owned files or an orchestrator ruling.

Role: `sol` on Astra. Baseline: `91e5906`. No agents were spawned. No commits, installations, scaffold repairs, manifest edits, configuration edits, or prohibited Git operations ran.

**Diff per file**

The changes are recorded as follows.

| File | Change |
| --- | --- |
| `src/browser/types.ts` | Adds `ButtonDetail`, `ButtonEventMap`, `ButtonHooks`, `ButtonOptions`, `ButtonInterface`, `DelegateOptions`, and `DelegateInterface` with readonly properties. |
| `src/browser/constants.ts` | Adds `BUTTON_TOGGLE`, `BUTTON_SELECTOR`, and `BUTTON_ACTIVE`. |
| `src/browser/helpers.ts` | Adds `emitEvent` for synchronous bubbling, non-cancelable dispatch and `bindEventMap` for signal-bound, typed button hooks. |
| `src/browser/validators.ts` | Adds `isButtonHost` and `isButtonEvent`, including refusal when hostile prototype or payload access throws. |
| `src/browser/Button.ts` | Adds live class-derived state, exclusive ownership, ordered class/attribute/event writes, hook teardown, exact restoration, idempotent destruction, and inert toggles after destruction. Constructor errors remain native `TypeError`; see the deviation. |
| `src/browser/Delegate.ts` | Adds consumer-constructed root delegation, native click cancellation, disabled refusal, per-host reuse, and teardown of listeners and owned engines. |
| `src/browser/index.ts` | Star-exports the helpers and classes through the existing browser barrel. |
| `tests/src/browser/Button.test.ts` | Proves native and anchor hosts, contradictory and absent ARIA state, ordered mutations, event semantics, hook release, exact restoration, consumer edits, detached hosts, ownership refusal and reconstruction, destruction during dispatch, independent hosts, and programmatic disabled toggles. |
| `tests/src/browser/Delegate.test.ts` | Proves child clicks, cancellation, reuse, dynamic insertion, disabled variants, exact root-listener registration, listener and engine release, removed-host restoration, root containment, fragment roots, and SVG refusal. |
| `tests/src/browser/helpers.test.ts` | Proves synchronous dispatch, payload identity, bubbling, non-cancelability, hook binding and abort, absent hooks, and malformed-event refusal. |
| `tests/src/browser/validators.test.ts` | Proves the host and event guards, including hostile access. |
| `tests/src/browser/index.test.ts` | Extends the export equality and retains the import-listener proof and its imported-listener control. |
| `u7b-report.md` | Records the result, decisions, controls, gates, and unresolved deviation. |

The actual tracked diff plus Git-generated addition diffs are retained in `tmp/u7b/changes.diff`. Gate and control output is retained in `tmp/u7b/verification.log.txt`. The Windows Edge launcher is `tmp/u7b/edge.cmd`.

**Ownership and ancillary decisions**

Button holds ownership in `static readonly #hosts = new WeakSet<HTMLElement>()`. This keeps lifecycle state runtime-private inside the class, without publishing mutable ownership data from the constants module. The case “refuses invalid hosts and concurrent ownership then permits reconstruction” proves refusal, release, reconstruction, and that destroying an old instance again cannot release its replacement's ownership.

Delegate keeps its lookup in a private `WeakMap<HTMLElement, Button>`. A private set retains the engines it must destroy, including engines whose hosts leave the root. Destruction aborts the root listener, destroys the retained engines, empties the set, and replaces the lookup map.

The helper names follow the brief. The domain guards are `isButtonHost` and `isButtonEvent`. Host validation uses the current realm's `HTMLElement`, as the design specifies. Hook binding validates the custom-event payload before invoking the typed callback.

The existing population case “exports the color-mode surface without registering document or window listeners” is renamed “exports the browser surface without registering document or window listeners”. Its equality gains `BUTTON_ACTIVE`, `BUTTON_SELECTOR`, `BUTTON_TOGGLE`, `Button`, `Delegate`, `bindEventMap`, `emitEvent`, `isButtonEvent`, and `isButtonHost`. Each name joined the expectation in the step that exported it.

The declared Contract package remains a development dependency. Its inspected declarations provide no `AppError`, `emitEvent`, or `bindEventMap`. The implementation adds no runtime dependency. Test recorders and DOM builders come from the installed `@orkestrel/test` 0.0.18 surface.

**Incremental checks**

After types, constants/helpers, Button, Delegate, and proofs, the following commands each exited 0:

```text
npm.cmd run check:src:browser
npm.cmd run test:src:browser
```

The earlier steps reported `3 passed` test files and `12 passed` tests. After the proofs, Chromium reported `6 passed` test files and `36 passed` tests. Only the owned TypeScript files were formatted.

**Controls**

PLANT-ORDER temporarily wrote `aria-pressed` before toggling the class. This command ran the real mutation-observer case:

```text
npm.cmd run test:src:browser -- -t "writes the class before aria-pressed on each toggle"
```

The planted run exited 1. The assertion received `[['aria-pressed', null], ['class', null]]` instead of `[['class', null], ['aria-pressed', null]]`. Its final result was:

```text
Test Files  1 failed | 5 skipped (6)
     Tests  1 failed | 35 skipped (36)
```

After restoring class-before-attribute writes, the same command exited 0:

```text
Test Files  1 passed | 5 skipped (6)
     Tests  1 passed | 35 skipped (36)
```

PLANT-LEAK temporarily removed the abort signal from Delegate's root click registration. This command ran the release case:

```text
npm.cmd run test:src:browser -- -t "registers exactly one root listener and releases the listener and its engines"
```

The planted run exited 1. A click after destruction still returned `false` from `dispatchEvent`, proving that the listener remained active and canceled the click. Its final result was:

```text
Test Files  1 failed | 5 skipped (6)
     Tests  1 failed | 35 skipped (36)
```

After restoring the abort signal, the same command exited 0:

```text
Test Files  1 passed | 5 skipped (6)
     Tests  1 passed | 35 skipped (36)
```

The filtered runs account for those skipped results; the full browser runs skip nothing. Neither control remains in the source. These controls establish mutation-order and listener-release sensitivity in Chromium. The restored implementation passes the full suite in Chromium and Edge. The brief declares `prove` blocked, so no probe receipt is claimed.

**Gate results**

Formatting, lint, typechecking, and the browser build are shared gates, independent of the selected browser. Their commands and final lines follow.

```text
npm.cmd run format:check
Exit 0
All matched files use the correct format.
Finished in 764ms on 92 files using 16 threads.

npm.cmd run lint:check
Exit 0
npm notice run @orkestrel/veneer@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .

npm.cmd run check
Exit 0
npm notice run @orkestrel/veneer@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json

npm.cmd run build:src:browser
Exit 0
dist/src/browser/index.js  8.24 kB │ gzip: 2.58 kB │ map: 13.46 kB
✓ built in 127ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
```

Managed Chromium produced these results.

```text
npm.cmd run test:src:browser
Exit 0
Test Files  6 passed (6)
     Tests  36 passed (36)
  Start at  22:43:15
  Duration  1.48s (transform 0ms, setup 97ms, import 113ms, tests 26ms, environment 0ms)

npm.cmd run test:setup:browser
Exit 0
Test Files  1 passed (1)
     Tests  15 passed (15)
  Start at  22:43:18
  Duration  1.86s (transform 0ms, setup 52ms, import 10ms, tests 874ms, environment 0ms)
```

Edge ran through `cmd /c tmp\u7b\edge.cmd <script>`, which sets `PLAYWRIGHT_CHANNEL=msedge` before invoking `npm.cmd`. The required browser suite and an additional setup-browser reading produced these results.

```text
PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:browser
Exit 0
Test Files  6 passed (6)
     Tests  36 passed (36)
  Start at  22:43:22
  Duration  7.83s (transform 0ms, setup 114ms, import 118ms, tests 34ms, environment 0ms)

PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser
Exit 0
Test Files  1 passed (1)
     Tests  15 passed (15)
  Start at  22:44:28
  Duration  8.15s (transform 0ms, setup 54ms, import 10ms, tests 895ms, environment 0ms)
```

The emitted `dist/src/browser/index.d.ts` includes the classes, interfaces, helpers, and guards. The build warning required no source or configuration change.

**Deviation — error contract**

Expected: scaffold's `.claude/rules/typescript.md`, “Errors and outcomes”, requires “Throw an AppError” for a programmer error or invalid argument.

Found: `src/browser/Button.ts:35` and `:36` throw native `TypeError` for an invalid host and duplicate live ownership. A search of `src` and the installed Contract core declarations found no `AppError`. The owned-file list includes no `errors.ts`; the architecture contract places error classes in that file.

Done: the refusals are implemented and tested as native errors; all required gates pass; the planted controls are removed.

Not done: an `AppError` declaration and its required guard. Adding them requires an off-limits file such as `src/browser/errors.ts`. The unit stops under the brief's deviation contract. No error dependency or off-limits file was added.

**Final working-tree evidence**

`git diff --check` exits 0. `git diff --exit-code -- package.json package-lock.json configs` exits 0 with no output. Git reports that its user-level ignore file is unreadable, but the status command exits 0.

The final `git status --porcelain` output is:

```text
 M src/browser/constants.ts
 M src/browser/index.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/Button.ts
?? src/browser/Delegate.ts
?? src/browser/helpers.ts
?? tests/src/browser/Button.test.ts
?? tests/src/browser/Delegate.test.ts
?? tests/src/browser/helpers.test.ts
```

The report and evidence files reside under ignored `tmp/`, so Git does not list them. Every listed path is owned by the brief.