# Checker brief — D2-fix-3 and the third round's unresolved mechanical claims

## Lane

`checker`, Sonnet, mechanical conformance. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing.

## Subject and evidence

The fourth round's brief `/home/user/scaffold/.orkestrel/campaign/docs-parity/d2-fix-3-brief.md` and report `/home/user/scaffold/.orkestrel/campaign/docs-parity/d2-fix-3-report.md`; the third round's brief `/home/user/scaffold/.orkestrel/campaign/docs-parity/d2-fix-2-brief.md` and report `/home/user/scaffold/.orkestrel/campaign/docs-parity/d2-fix-2-report.md`. The evidence, at absolute paths: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d2-fix-3.diff.txt` and `/home/user/scaffold/.orkestrel/campaign/docs-parity/d2-fix-3.status.txt` (the whole uncommitted guide tree against its base `37d6cf8`); the changed files at their new state under `/home/user/fleet/guide`.

## Claims (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. J1, J3: the two `src/core/helpers.ts` sentences read exactly as the fourth round's brief quotes.
2. J2: the comment above the corpus member control reads as quoted.
3. J4: the `collectKeys` guide row names both closes and the reader prose states the other-keyword close.
4. J5, J6: the `extractExampleMethods` expectation and the last-opener case are present as specified.
5. The third round's H4 and H5: no `above` or `below` pointer remains in `src/core/`, `guides/guide.md`, `tests/src/core/`, or `tests/guides.test.ts`; `extractBlocks` and `extractSummary` replace `readBlocks` and `readSummary` at every site.
6. Scope and reports: the status file lists exactly `guides/guide.md`, `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/guides.test.ts`, `tests/src/core/helpers.test.ts`; every `file:line` the fourth round's report cites matches the files at their new state; the fourth round's report carries the two corrected citations (`.claude/rules/architecture.md:298`, `src/core/helpers.ts:1093-1107`); no count of a growable set appears in either report's prose; the `collectKeys` and `extractBodyLines` guide rows exist.

## Output

Per claim, the verdict and its evidence. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
