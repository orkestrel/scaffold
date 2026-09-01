# U3j checker report (checker / Sonnet; immutable; brief `u3j-checker-brief.md`)

1. Items 1 to 5 landed verbatim — met. Item 1 TSDoc (`src/core/helpers.ts:1930-1933`) character-identical to the brief; item 2 guide row sentence exact; item 3 title `applies the supplied pattern rather than the shape's own to decide the match` with the body unchanged; item 4 clause removed so the paragraph reads "...and no exported class contributes any. A count stated here drifted..."; item 5 `tests/setup.ts:788` reads "...functions were exported and no assertion failed."
2. U3j hunks are the only differences from `u3i-diff.patch` beyond table re-padding — met. `src/core/ContractCompiler.ts`, `src/core/combinators.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/integration.test.ts` byte-identical; `src/core/helpers.ts` differs only at item 1; `guides/contract.md` only at items 2 and 4 plus header and separator re-padding with unchanged cell content; `tests/src/core/helpers.test.ts` only at item 3; `tests/setup.ts` only at item 5.
3. Sweeps — met. `\b(above|below)\b` and the vocabulary pattern over `src/core/helpers.ts` hit only pre-existing lines outside the edit range (1418, 1457, 1795; 952, 1372, 1508, 1836); the five U3j-added text blocks carry no hit. `grep -c "twice per call"`: `src/core/helpers.ts` 0, `guides/contract.md` 0, `tests/src/core/helpers.test.ts` 1 (the declared-pattern pin's title at `:3288`).
4. Report `Tests` lines match criteria 3 and 4 — met: `235 passed (235)` and `65 passed (65)`.

Verdict: PASS

Referrals: none
