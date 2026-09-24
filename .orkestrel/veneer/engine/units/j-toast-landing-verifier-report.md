# J-TOAST landing — the verifier's gate report on Veneer `main` `e8251cf` (Sonnet, retained verbatim 2026-09-24)

Brief: `j-toast-landing-verifier-brief.md`. The Orchestrator's ruling: accepted; every red row is a standing Chromium 153 reading named in `host-chromium-153-reading.md` (the accordion and navbar `background-size` serialization, the preflight `select | height` and table border rows), and no new red row exists.

---

## Gate report — J-TOAST landing (Veneer `main` at `e8251cf`)

| Row | Exit code | Summary |
|---|---|---|
| `git log --oneline -1` | 0 | `e8251cf Merge branch 'main' into unit/toast` |
| `git status --short` | 0 | empty (clean tree) |
| `npm run format:check` | 0 | All 425 files correctly formatted |
| `npm run lint:check` | 0 | no output (clean) |
| `npm run check` | 0 | `tsc` (core, browser, styles) and `vue-tsc` (app browser) all clean |
| `npm run build` | 0 | src (core, browser, styles) and app browser builds succeeded |
| `npm test` | 1 | Test Files 2 failed \| 103 passed (105); Tests 2 failed \| 1226 passed (1228) |
| `npm run test:app` | 0 | Test Files 50 passed (50); Tests 149 passed (149) |
| `npm run test:journey` | 0 | Test Files 4 passed (4); Tests 180 passed (180) |
| `npm run test:config` | 0 | Test Files 1 passed (1); Tests 173 passed \| 1 skipped (174) |
| `npm run test:setup` | 0 | Test Files 4 passed (4); Tests 281 passed (281) |
| `npm run test:setup:browser` | 0 | Test Files 1 passed (1); Tests 67 passed (67) |
| `npm run test:policy` | 0 | Test Files 1 passed (1); Tests 109 passed \| 1 skipped (110) |
| `npm run test:conformance` | 0 | Test Files 1 passed (1); Tests 22 passed (22) |
| `npm run test:guides` | 0 | Test Files 1 passed (1); Tests 19 passed (19) |
| `npm run test:service` | 1 | Test Files 1 failed \| 2 passed (3); Tests 1 failed \| 17 passed (18) |

### Red rows

**`npm test`** — two failures, both named as standing rows in `host-chromium-153-reading.md` (Second standing row and the accordion row under the J-TYPES entry):

1. `tests/src/styles/components/accordion.test.ts:110`
   ```
   AssertionError: expected '20px auto' to be '20px'
   ```
   Standing: yes — matches the accordion `background-size` row (Chromium 153 serializes `20px` as `20px auto`).

2. `tests/src/styles/components/navbar.test.ts:63`
   ```
   AssertionError: expected '100% auto' to be '100%'
   ```
   Standing: yes — matches the "Second standing row" navbar `background-size` entry.

**`npm run test:service`** — one failure, the preflight row:

`tests/service/tailwind/preflight.test.ts` — "keeps every property the elements layer declares, and records every property the profile moves"
```
AssertionError: expected [ …(195) ] to deeply equal [ …(199) ]
-   "select | height | 18px",
+   "select | height | 21px",
```
(diff also drops the four `table | border-*-color` rows, matching the recorded table absence)
Standing: yes — matches the preflight row retained in "Struck rows" (2026-09-23, later): "The preflight row stays… reads `select | height | 21px` against `18px` and the four `table | border-*-color` rows absent."

### Overall verdict

RED, but every red row is a standing host-Chromium-153 reading named in `.orkestrel/veneer/engine/units/host-chromium-153-reading.md`, with no new red row outside that record. The J-TOAST landing introduces no new gate failure.

### Head commit and status

```
e8251cf Merge branch 'main' into unit/toast
```
`git status --short` returned empty — clean working tree.

### Anomalies

- The `HostSnapshot` suite's expected `SyntaxError: Failed to execute 'toggle' on 'DOMTokenList'` diagnostic appeared as noted in the brief and did not affect any exit code; `test:setup:browser` passed 67/67.
- `npm test`'s stderr is dominated by benign Vite "externalized for browser compatibility" warnings unrelated to any failing assertion.
