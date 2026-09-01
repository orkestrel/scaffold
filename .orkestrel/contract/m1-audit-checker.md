# Unit m1-audit — checker lane return

## Checker verdict — mechanical claims for m1-audit (claims 5 and 6-placement)

**Claim 5 — CONFIRMED.**
Evidence, read directly from `/home/user/contract/src/core/ContractCompiler.ts`:
- Diff scope: the report's diff (`m1-dead-memo-report.md:14-134`) touches only `src/core/ContractCompiler.ts` (`#trackGuard`/`#trackFaults` bodies) and `tests/src/core/ContractCompiler.test.ts` (two added `it` blocks). `Glob` over the live tree found no stray `.orig` or other artifact files left behind.
- No initializer on either `memo` declaration: live source line 530, `let memo: WeakMap<object, boolean> | undefined`; line 565, `let memo: WeakMap<object, readonly T[]> | undefined`. Neither carries an initializer.
- No existing assertion changed: the diff hunks touch only the `memo` declaration line and the refresh-condition line inside each method (`m1-dead-memo-report.md:29-31,40-43,48-50,57-59`); every other diff hunk is a pure test addition with no removed or altered `expect` line.
- Banned syntax: `Grep` for `as [A-Za-z]|!\.|!;|@ts-|eslint-disable` over `ContractCompiler.ts` returned only prose-comment occurrences of the word "as" (for example line 500, 623, 666, 874) — no `as` type assertion, no `!` non-null assertion, no `@ts-*` directive, no `eslint-disable` anywhere in the file, including the touched region (lines 522-586 read directly).
- No nested function declaration entered the tree: the added test code (`Object.defineProperty(..., { get: () => {...} })`) is an anonymous callback passed directly as an argument — the permitted exception under `AGENTS.md` § Design laws "No nested functions."

**Claim 6 (placement half) — CONFIRMED.**
- Mirror-rule placement: the source file is `src/core/ContractCompiler.ts`; the added cases land in `tests/src/core/ContractCompiler.test.ts` (`Glob` confirms this path exists and is the file touched), which is the exact mirrored path the rule requires — no new file, no misplaced directory.
- The two added test names, verified in the live file: `tests/src/core/ContractCompiler.test.ts:327` — `reads a shared object once per call where two slots of one node reach it`; `tests/src/core/ContractCompiler.test.ts:402` — `holds no answer about an object across two calls of one compiled guard`. Both names state the property proved (within-call reuse, cross-call isolation), not the reverse-edit control used to redden them, matching the naming instruction in `AGENTS.md`/orchestration dispatch anatomy.
- I did not rule on the accuracy of the `#trackGuard` comment describing `#trackFaults`, or on any other part of claim 6 — that is the substantive half, outside this dispatch's mechanical scope.

**Not ruled on (outside this dispatch's scope):** claims 1-4, 7, 8, and the substantive half of claim 6 (comment accuracy, TSDoc/guide contradiction). Those belong to the subjective/objective review lanes.

VERDICT: PASS — claim 5 and the placement half of claim 6 are CONFIRMED against the live tree with file:line evidence; no mechanical-law violation found in the diff's scope, syntax, or test placement.
