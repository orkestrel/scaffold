<!-- workflow wf_b7025f01-4d1, agent abd2b7e7b09637c18, retained 2026-09-20 -->

These are all top-level exported function declarations, not nested functions — no defect. This confirms the law check found no forbidden syntax hits.

Now assembling the final verdict table.

## Claim | Check | PASS/FAIL | Site

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 1 | `import type { ESTree } from 'vite'` precedes every value import in `tests/setupConformance.ts` | PASS | `tests/setupConformance.ts:7` (type import), value imports start `:8` |
| 2 | `parseSync('module.ts', text, { preserveParens: false })`; four parenthesized-form assertions each expect `['bootstrap']` | PASS | `tests/setupConformance.ts:124`; `tests/setupConformance.test.ts:141-144` |
| 3 | `collectLayer` throws `The named sheets carry no Veneer cascade`, `@throws` line agrees, old text absent from the file, one `toThrow` on new text in test file, old text's remaining occurrences are `requireValue` messages elsewhere | PASS | `tests/setupBrowser.ts:367-368,381` (thrown text and doc); grep for old text in `tests/setupBrowser.ts` — no match; `tests/setupBrowser.test.ts:234-236` (`toThrow`); old text remains at `tests/setupBrowser.test.ts:212`, `tests/src/styles/tokens.test.ts:31,51`, `tests/src/styles/index.test.ts:8,29` |
| 4 | `app/browser/Showcase.ts` carries no `behaviour`; line 45 reads `behavior` | PASS | `app/browser/Showcase.ts:45`; grep for `behaviour` — no match |
| 5 | Added lines carry no `any`, non-null assertion, type assertion outside `as const`, `@ts-` directive, `eslint-disable`, default export, or nested function | PASS | grep of `u1-conform-diff-3.patch.txt` added lines — no hits; every `+function` hit is a top-level `export function` (lines 1147, 1549, 1578, 1853, 1867, 1888, 1935, 1953, 1969, 1995) |
| 6 | `tmp/audit/u1-conform-status-3.txt` equals round-2 status row for row; blob pairs differing from round-2 patch are exactly the five brief-4-owned files, and among untracked hunks only `app/browser/Showcase.ts` differs, by one word | PASS | `tmp/audit/u1-conform-status-3.txt` vs `.orkestrel/veneer/units/u1-conform-status-2.txt` — identical; differing `index` pairs: `tests/setupBrowser.test.ts` (round3 `226bff3..9ee444b` vs round2 `226bff3..1bf76c2`), `tests/setupBrowser.ts` (`1f03355..73e3853` vs `1f03355..1138d77`), `tests/setupConformance.test.ts` (`2898b63..80a6282` vs `2898b63..aa648f6`), `tests/setupConformance.ts` (`4fafa73..d79ccb4` vs `4fafa73..5d03050`), untracked `app/browser/Showcase.ts` (`0000000..dc9e5f0` vs `0000000..fe433f6`, diff-3.patch:2244 `behavior` vs diff-2.patch.txt:2244 `behaviour`); untracked `src/browser/ColorMode.ts`, `tests/app/browser/Showcase.test.ts`, `tests/setupListeners.ts`, `tests/src/browser/ColorMode.test.ts` carry identical blob hashes in both patches (unchanged) |
| 7 | Gates (Orchestrator-ruled, not mechanically checkable by this checker) | not run — no gate output supplied to this checker | n/a |

No file's blob pair differs from round 2 outside brief 4's scope (`tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `app/browser/Showcase.ts`).
