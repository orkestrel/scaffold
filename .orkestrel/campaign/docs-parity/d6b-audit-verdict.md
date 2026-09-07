# D6b template-rename — audit verdict

## Round 1 (2026-09-07)

Lanes: subjective `reviewer` (Opus 5, the writer's engine, the Sol bench dark; the objective lane did not run because the unit is a rename with no behaviour change and the checker reads its mechanical claims), `checker` (Sonnet), and the landing `verifier` (Sonnet) on `landing-verify-brief.md`; Workflow `wf_5c42eb2b-adf`, blind. Records: `d6b-audit-subjective.md` (FAIL 1, 2), `d6b-audit-checker.md` (FAIL 5), `landing-verify-report.md` (`GATES: GREEN`: the whole chain under npm 11, every project green, the distribution proof red on exactly the expected case, the configs audit aligned).

### Reconciled

- Checker 2, 3, 4 PASS: the rename is whole, no behaviour moved, the scope is exact.
- Subjective 1 FAIL, upheld: `bundled` names a mechanism rather than the browser condition the exports map answers, asserts an action nothing performs at the guard site outside any browser drive, and collides with the Vite-bundle sense already in the same proof and the bundled-browser sense in `configs/browsers.ts`; `browsable` derives from the condition the way `importable` and `requirable` do. `loadable` beside `requirable`: the lane's fallback is taken — `loadable` stays, and the comments that separate the two facts are repaired. Carrier: D6b-fix O1, O3, O4.
- Subjective 2 FAIL, upheld: the comments at `:1475` and `:1836-1841` name the old terms, and the leading comment dropped two relative pronouns. Carrier: D6b-fix O3, O4 (the `:1836-1841` comment agrees once the member is `browsable`).
- Subjective findings: the member order separated `requirable` from `loadable` (D6b-fix O2); `readDeclaration`'s string members keep their nouns (recorded, no change).
- Checker 5 FAIL: counts in the report; corrected in the retained report.
- Dropped on the record: none.

VERDICT: FAIL 1, 2, 5 — D6b-fix briefed; the landing waits on its closure (checker and the landing verifier again).
