# Check brief — U7-fix-d (probe): the round-2 checker lane and the fix-d closure in one dispatch

## Lane

`checker`, Sonnet, one clean context. Read only this brief and the evidence it names, run no command, edit nothing, and return per-claim verdicts. Perform the assignment directly and spawn nothing. The round-2 checker lane died on a session limit before returning, so this dispatch carries its claims together with the fix-d edits; the two reviewer lanes returned PASS on every round-2 claim (`u7-fix-audit-subjective.md`, `u7-fix-audit-objective.md`).

## Subject

The whole U7 change in probe after fixes a, b, c, and d: the briefs `u7-fix-a-brief.md`, `u7-fix-b-brief.md`, `u7-fix-c-brief.md`, `u7-fix-d-brief.md` and their reports, under `/home/user/scaffold/.orkestrel/campaign/ts6-api/`; the round-2 audit brief `u7-fix-audit-brief.md` (its claims 1 to 13) and the verdict draft `u7-fix-audit-verdict.md`. Governing files: `/home/user/scaffold/AGENTS.md` (the same contract governs probe) and `/home/user/scaffold/.claude/rules/` (`tests.md`, `typescript.md`, `names.md`, `writing.md`); probe's checkout carries no `.claude/rules/` directory of its own.

## Review evidence

The whole U7 change as the actual diff and status of the probe checkout after fix-d: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u7-fix-d.diff.txt` and `u7-fix-d.status.txt`; the fix-d slice alone is `u7-fix-d.slice.diff.txt` (an interdiff whose `a/` side is the tree after fix-c). Read the changed files under `/home/user/fleet/probe` at their new state where the diff is not enough.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. Each of the round-2 audit brief's claims 1 to 13 holds mechanically on the tree as it stands (read that brief's claim text; rule each by its letter on the code, the tests, and the guide).
2. Fix-d edit 1: the `inspect` row of the guide's `TypeStageInterface` method table and the `TypeStage` class TSDoc both carry the drafted-`.json` exception in the words the brief fixes.
3. Fix-d edits 2 to 7: the `destroy` `@returns` line in `src/core/types.ts` reads "after every stage has released its resources"; the `OverlayInterface` remarks name the runtime stage's resolver as the holder and state that the type and lint stages hold none, re-wrapped; the `RuntimeStage.ts` comment and the guide bullet at about line 1004 sit inside their widths; the skip reads `it.runIf(LINKS)`; the digest sentence in the guide is split as prescribed.
4. Fix-d edit 8: `TypeStage.#inspect` resolves every selected project's configuration before any draft is placed, its comment says why, and a test pins that a fresh stage's digest after inspecting a claim that drafts its own project file equals the digest another stage read without drafts.
5. Fix-d edit 9: a test pins a `claimant` issue at the drafted `.json` path over a workspace with `resolveJsonModule` — or the report records the no-location refusal with the compiler's stdout under Deviation.
6. Fix-d edit 10: two tests over a stub compiler pin the `instrument`/`malformed` fault messages for the exit-3 and the signal-ended runs — or the report records the refusal the brief names.
7. Fix-d edits 12 and 13: the renamed `scanDiagnostics` case says what it proves with no non-BMP wording; the expiry case's budget is `PROBE_DEADLINE`, its message assertion reads the same constant, and its comment states the contended-host reason; no other budget changed.
8. Nothing outside the four fix briefs' owned files changed, `package.json`, `package-lock.json`, and every vendored file are untouched, and each report's file list, criteria, and deviations match the diff.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
