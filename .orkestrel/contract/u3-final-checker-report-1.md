# U3 final tree checker report, run 1 (checker / Sonnet; immutable; brief `u3-final-checker-brief.md`)

**Verdict: FAIL**

1. Forbidden syntax and writing rules on added lines — syntax met (swept `+` lines across the seven changed files; the only anonymous callback is `() => readPattern(pattern)` at `src/core/helpers.ts:640`, passed directly as the `readValue` argument). Vocabulary sweep (pattern `\b(should|simply|just|currently|via|e\.g\.|i\.e\.|etc\.)\b`, case-insensitive, added lines of the same files) clean. Cross-reference sweep (pattern `\b(above|below)\b`, added lines) — **not met**: two added comments in `tests/src/core/helpers.test.ts` use `above` as a cross-reference:
   - `tests/src/core/helpers.test.ts:2992` — `// really dropped them, so the repeated answers above are the strip rather` (in the `describe('ownPattern')` block).
   - `tests/src/core/helpers.test.ts:3254` — `// rebuild does fault, so the empty report above is the argument being` (in `applies the supplied pattern instead of re-reading the shape`).
   Both lines are unchanged carryover from the U3f diff (`u3f-diff.patch:333,396`); the prior checker report missed them and flagged only `src/core/helpers.ts:1996`. Re-dispatchable instruction: replace `the repeated answers above` with a form using `earlier`, and replace `the empty report above` with a form naming the referent.
2. The Orchestrator's edit is the only change at `src/core/helpers.ts:1996` relative to the U3f diff — met: one differing line across every `src/core/helpers.ts` hunk (`names the \`limit\` below,` → `names the fault's \`limit\`,`).
3. The U3g bump is exactly the two named literal changes — met: `tests/src/core/integration.test.ts:967` `216` → `217` (the file is absent from the U3f diff); `guides/contract.md:256` `**216 rows**` → `**217 rows**` in one further hunk; the other guide hunks are byte-identical to U3f.
4. Items 1 to 6, 8, and 9 of the prior brief hold on the final diff — met (`ownPattern` at `src/core/helpers.ts:640`; `index.ts` absent from status; call sites `ContractCompiler.ts:1428` and `:1753`, `combinators.ts:1037`; guide row `guides/contract.md:245`; auditor comment `ContractCompiler.ts:1432-1440`; test hunks additive beyond the U3g bump; seven files in status, `types.ts` and `index.ts` absent; touched guide rows true of the code). `matchOf` keeps its inline form and stays exempt.

Referrals: none.
