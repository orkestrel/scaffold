# J-DEMOFIX audit — the checker lane's verdict (Sonnet, retained verbatim 2026-09-24)

| Claim | Verdict | Evidence |
|---|---|---|
| 1 | CONFIRMED | `j-demofix-status.txt`:1-2 lists only `app/browser/Showcase.ts` and `tests/app/browser/Showcase.test.ts`; `j-demofix.diff` header lines 1 and 21 name the same two files and no others. |
| 2 | CONFIRMED | `j-demofix.diff` lines 8-9 remove `new EngineSection(this.#main),` from the head of the list (immediately after the `return [`), and line 17 adds it back after `new ColorModeSection(this.#main),` (line 16), with no other hunk in that file. |
| 3 | CONFIRMED | `j-demofix.diff` lines 29-37 move `'Engine'` from after `'Showcase'` to after `'Color modes'`; lines 45-53 move `...ENGINE_SPECIMENS` from the head of the specimen list to after `...COLOR_MODE_SPECIMENS`; no other hunk touches this file. The post-change file (`tests/app/browser/Showcase.test.ts:119-241`) enumerates every region in the same order `app/browser/Showcase.ts:124-183` constructs them, ending `'Color modes'` then `'Engine'` / `COLOR_MODE_SPECIMENS` then `ENGINE_SPECIMENS`. |
| 4 | CONFIRMED | `j-demofix-red-setup-browser.log.txt:124-127`: "Tests 2 failed \| 81 passed (83)" — 2 failed of 83, naming the "preserves the pressed-state failure..." (line 80) and "names the focused control..." (line 101) cases. `j-demofix-green-setup-browser.log.txt:77-78`: "Test Files 1 passed (1)" / "Tests 83 passed (83)". `j-demofix-green-journey.log.txt:4-5`: "Test Files 4 passed (4)" / "Tests 248 passed (248)". |
| 5 | CONFIRMED | Grep over `j-demofix.diff` for `any`, `as <type>`, non-null `!`, `@ts-` directives, `eslint-disable`, `vi.mock`, `vi.fn`, `vi.spyOn`, fake-timer calls returned no matches; the diff's added lines are only construction reorders and array literal reorders. |

VERDICT: PASS
