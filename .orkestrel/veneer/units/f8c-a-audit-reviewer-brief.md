# Audit lane — `reviewer` on Opus, subjective lane, F8c-A READERS

`reviewer` on Opus (native subagent, clean context). You hold the **subjective** lane (API feel,
naming, TSDoc voice, the shape a proof author meets) over the claims in
`/home/user/scaffold/tmp/audit/f8c-a-audit-claims.md`, which names the evidence; the design is
`/home/user/veneer-f8b/tmp/units/f8c-design-verdict.md` (rulings 1, 2, 3, 5, 7). The subject tree
is the worktree `/home/user/veneer-f8b` (uncommitted writes over `d9c03a2`); read the actual diff
`/home/user/scaffold/tmp/audit/f8c-a.diff` and the status `/home/user/scaffold/tmp/audit/f8c-a-status.txt`,
and the report `/home/user/scaffold/tmp/audit/f8c-a-report.md`. Law: `/home/user/scaffold/AGENTS.md`
and `/home/user/scaffold/.claude/rules/{names,tests,typescript,architecture,patterns,workspace,writing}.md`.
Read-only; edit nothing, run nothing, spawn nothing. Use absolute paths.

Beyond the claims, rule on: the entity and member names (`SheetReader.statement`, `order`, `layers`,
`names`, `selectors`, `properties`, `declarations`; `StageManager.open`, `mount`, `load`, `read`,
`properties`, `clear`, `destroy`, `connected`) against `names.md` § Fixed lifecycle vocabulary and
the single-word law; the helper names (`scanReadiness`, `verifyReadiness`, `compileProfile`,
`resolveBrowserExecutable`, `collectSharedNames`, `collectImportantNames`) under `{verb}{Noun}`;
the constants (`CASCADE_PATH`, `CANDIDATES_PATH`, `READINESS_INPUT`, `CANDIDATE_FLOOR`,
`STAGE_TIMEOUT`); whether the `root` parameter on `verifyReadiness` and `StageManager` is a seam a
proof needs or a leak of test convenience into the contract; whether `connected` is a derived fact
or a stored flag that can drift; the case titles in `tests/setupServer.test.ts` and
`tests/setupService.test.ts` (named for what they prove, one idea each); the TSDoc and comments
against `writing.md` (no `should`, no counts, no `currently`/`now`, no `simply`); and whether the
`setupService.ts` module reads as the service convention `tests.md` and `workspace.md` describe.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`,
findings outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
