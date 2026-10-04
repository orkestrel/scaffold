The reduced-motion backdrop focus defect is fixed. `awaitTransition` retains Bootstrap 5.3.8’s computed duration + delay + 5 ms fallback when no CSS transition runs. The empty animation collection cannot resolve the wait early. Abort still resolves immediately and releases the timer/listener; the existing native-transition path is unchanged.

Reviewed every caller: Alert, Backdrop, Carousel, Collapse, Modal, Offcanvas, Tab, Tip, and Toast. Their completion writes remain guarded by abort or destruction. Tests cover the idle computed bound, reduced-motion deferral, abort during that bound, and offcanvas teardown with and without reduced motion. The real CDP backdrop test verifies trusted input and retained opener focus in both realms, and parks the pointer at `(-1, -1)` in `finally`.

The departure measurement changed only `modal:overlap:2:click`. No row became equal and none was deleted. The engine’s shared lock still skips Bootstrap’s repeated overflow/padding saves and retains compensation until the final owner closes. That accounts for every remaining difference. The padded waits restore the dialog/backdrop write order; 11 engine paths move, and 53 paths retain their values. All 64 reasons state the shared-lock cause.

The following table accounts for every affected ledger row. A property denotes both `.before` and `.after` rows on each recorded side; `added[0]` and `removed[0]` denote single rows. Indices identify `writes[index]`. The opposite side of each ledger row is `<absent>`. An unchanged index means only the reason changed. Values remain exactly as measured.

| Element / property | Bootstrap index | Engine index, old → final | Measured before → after, or node value |
| --- | --- | --- | --- |
| `$` / `data-bs-overflow` | 1 | absent | `<unset>` → `hidden` |
| `$` / `data-bs-padding-right` | 2 | absent | `<unset>` → `0px` |
| `$` / `class` | 3 | 1 → 1 | `["modal-open"]` → `["modal-open"]` |
| `$/div[4]` / `added[0]` | 4 | 2 → 2 | `{"parent":"$","tag":"div","classes":["fade","modal-backdrop","show"]}` |
| `$/div[4]` / `class` | 5 | 3 → 3 | `["fade","modal-backdrop"]` → `["fade","modal-backdrop","show"]` |
| `$/div[1]` / `style` | 6 | 4 → 4 | `[["display","block",""]]` → `[["display","none",""]]` |
| `$/div[1]` / `aria-hidden` | 7 | 5 → 5 | `<unset>` → `true` |
| `$/div[1]` / `aria-modal` | 8 | 6 → 6 | `true` → `<unset>` |
| `$/div[1]` / `role` | 9 | 7 → 7 | `dialog` → `<unset>` |
| `$/div[3]` / `class` | 10 | 8 → 8 | `["fade","modal-backdrop","show"]` → `["fade","modal-backdrop"]` |
| `$/div[2]` / `style` | 11 | 10 → 9 | `<unset>` → `[["display","block",""]]` |
| `$/div[2]` / `aria-hidden` | 12 | 11 → 10 | `true` → `<unset>` |
| `$/div[2]` / `aria-modal` | 13 | 12 → 11 | `<unset>` → `true` |
| `$/div[2]` / `role` | 14 | 13 → 12 | `<unset>` → `dialog` |
| `$/div[2]` / `class` | 15 | 14 → 13 | `["fade","modal"]` → `["fade","modal","show"]` |
| `$/div[3]` / `removed[0]` | 16 | 9 → 14 | `{"parent":"$","tag":"div","classes":["fade","modal-backdrop"]}` |
| `$` / `class` | 17 | 15 → 15 | `["modal-open"]` → `[]` |
| `$` / `data-bs-overflow` | 18 | absent | `hidden` → `<unset>` |
| `$` / `data-bs-padding-right` | 19 | absent | `0px` → `<unset>` |

Evidence: `tmp/codex/motion-wait-transcript.json` contains both complete transcripts; `motion-wait-ledger-fates.txt` enumerates every old/final path. The initial `npm run test:src:browser` returned 1 with 781 passed and 2 modal-ledger failures. After re-derivation, the touched suites passed 91 tests and the full source-browser gate passed 786 tests, including every family’s bidirectional ledger checks and row controls.

The regression command was identical for red and green:

```text
node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:browser tests/src/browser/Offcanvas.test.ts -t "keeps opener focus after a real reduced-motion backdrop press in both realms" --reporter=verbose
```

| Run | Exit | Result |
| --- | --- | --- |
| Instant-completion branch restored | 1 | 1 failed, 24 filtered; Bootstrap retained opener focus, Veneer focused `main` |
| Padded wait restored | 0 | 1 passed, 24 filtered; both realms retained opener focus |

Logs are `tmp/codex/motion-wait-red.{log,err}` and `motion-wait-green.{log,err}`.

The journey gate required an additional test-helper repair in `tests/setupBrowser.ts`: await selected-pane opacity before reading its text, then drain its animation; await removal of the toast’s `.showing` class before the next action records events. An empty animation set does not imply that the padded callback completed. The original journey run returned 1 with 58 passed and 2 failed; the tab failure reproduced alone. The repaired focused run passed both cases:

```text
node node_modules/vitest/vitest.mjs run --config configs/app/vite.journey.config.ts --project journey:dark-1280 --project journey:dark-390 -t "drives the 'tab' table|drives the 'toast' table" --reporter=verbose
```

Evidence is in `tmp/codex/motion-wait-test-journey.err`, `motion-wait-journey-isolated.{log,err}`, and `motion-wait-journey-waits.{log,err}`. No further engine behavior changed.

The required gates completed on Windows; each exit code was read directly.

| Command | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run build` | 0 | Passed |
| `npm run test:src:browser` | 0 | 786 passed |
| `npm run test:setup:browser` | 0 | 102 passed |
| `npm run test:app:browser` | 0 | 226 passed |
| `npm run test:journey` | 0 | 60 passed |
| `npm run test:guides` | 0 | 15 passed |
| `npm run test:policy` | 0 | 119 passed, 1 existing skip: substitution table absent from this host |
| `npm run build:showcase` | 0 | Rebuilt `showcase/browser.html` |
| `git diff --check` | 0 | Passed |

Deviation: the required journey gate exposed the readiness assumptions described earlier, so this unit also repairs those waits. The optional installed discovery utility returned 1: its initial JSON parse encountered a Vite diagnostic; its rerun misclassified browser project suffixes and omitted separately configured journeys. The required executable gates establish collection and results instead. No scaffold-owned file changed.

Commit: `fe1d7a99145f392d0c638d88e2726705ef202330`. The commit message names every rewritten departure path. `git status --porcelain` is empty. `tmp/codex/showcase-proofs-4-draft.patch` remains unapplied and outside the commit. No push, publication, installation, or subagent was used.