# J-TAB landing — the verifier's report on Veneer `main` `f377579` (`verifier` on Sonnet, native subagent, read-only, 18 tool uses, 414 s; briefed by `j-tab-landing-verifier-brief.md`; retained verbatim from the subagent's return)

## Gate Report — J-TAB landing on Veneer `main`

Checkout: `C:/Users/mikes/WebstormProjects/veneer`. Head commit: `f377579 Merge branch 'main' into unit/tab`. `git status --short`: empty (clean tree).

| Row | Command | Exit code | Summary |
|---|---|---|---|
| 1 | `git log --oneline -1` | 0 | `f377579 Merge branch 'main' into unit/tab` |
| 2 | `git status --short` | 0 | empty |
| 3 | `npm run format:check` | 0 | 405 files, all correctly formatted |
| 4 | `npm run lint:check` | 0 | no output, no warnings/errors |
| 5 | `npm run check` | 0 | all `tsc`/`vue-tsc` projects clean |
| 6 | `npm run build` | 0 | all `src`/`app` targets built |
| 7 | `npm test` | 1 | Test Files 2 failed \| 103 passed (105); Tests 2 failed \| 1226 passed (1228) |
| 8 | `npm run test:app` | 0 | Test Files 50 passed (50); Tests 149 passed (149) |
| 9 | `npm run test:journey` | 0 | Test Files 4 passed (4); Tests 180 passed (180) |
| 10 | `npm run test:config` | 0 | Test Files 1 passed (1); Tests 173 passed \| 1 skipped (174) |
| 11 | `npm run test:setup` | 0 | Test Files 4 passed (4); Tests 281 passed (281) |
| 12 | `npm run test:setup:browser` | 0 | Test Files 1 passed (1); Tests 67 passed (67) |
| 13 | `npm run test:policy` | 0 | Test Files 1 passed (1); Tests 109 passed \| 1 skipped (110) |
| 14 | `npm run test:conformance` | 0 | Test Files 1 passed (1); Tests 22 passed (22) |
| 15 | `npm run test:guides` | 0 | Test Files 1 passed (1); Tests 19 passed (19) |
| 16 | `npm run test:service` | 1 | Test Files 1 failed \| 2 passed (3); Tests 1 failed \| 17 passed (18) |

### Red rows

**Row 7 — `npm test`, `tests/src/styles/components/accordion.test.ts:110`**
```
AssertionError: expected '20px auto' to be '20px'
```
Owning file: `tests/src/styles/components/accordion.test.ts:110`. Standing — `host-chromium-153-reading.md` § "New standing row (2026-09-23, the J-TYPES rounds 5 to 10 landing)" names this exact assertion and expected/received pair.

**Row 7 — `npm test`, `tests/src/styles/components/navbar.test.ts:63`**
```
AssertionError: expected '100% auto' to be '100%'
```
Owning file: `tests/src/styles/components/navbar.test.ts:63`. Standing — `host-chromium-153-reading.md` § "Second standing row (2026-09-23, the J-BINDER-PRECEDENCE landing)" names this exact assertion and expected/received pair.

**Row 16 — `npm run test:service`, `tests/service/tailwind/preflight.test.ts:156`**
```
AssertionError: expected [ …(195) ] to deeply equal [ …(199) ]
- "select | height | 18px"      (expected)
+ "select | height | 21px"      (received)
- "table | border-bottom-color | oklch(0.208 0.042 265.755)"  (expected, missing on this host)
- "table | border-left-color | oklch(0.208 0.042 265.755)"
- "table | border-right-color | oklch(0.208 0.042 265.755)"
- "table | border-top-color | oklch(0.208 0.042 265.755)"
```
Owning file: `tests/service/tailwind/preflight.test.ts:156`. Standing — `host-chromium-153-reading.md` § "Struck rows" names this exact `select | height` and `table | border-*-color` divergence as the still-open preflight row.

### Overall verdict

Not GREEN by raw exit code (`npm test` and `npm run test:service` both exit 1), but every red assertion matches a row `host-chromium-153-reading.md` records as a standing, pre-existing Chromium 153 divergence, none introduced by this landing. Per that file's own accounting, the chain is green except those three standing rows. No new red row appeared.

### Anomalies

- The `Module "fs"/"path"/"source-map-js"/"url" has been externalized for browser compatibility` warnings appear throughout every browser-suite run (rows 7-16); these are Vite client-externalization notices, not failures, and none of the listed suites' pass/fail counts are affected by them.
- `HostSnapshot`'s expected `SyntaxError: Failed to execute 'toggle' on 'DOMTokenList'` diagnostic (named in the brief as non-failing) was not separately isolated in the captured excerpts but is consistent with the console noise observed; no suite reported it as a failing assertion.

---

The Orchestrator's reading: the chain is green except the three standing host rows (`host-chromium-153-reading.md`); the landing stands and is pushed at `f377579`.
