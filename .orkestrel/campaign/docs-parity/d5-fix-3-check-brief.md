# Check brief — D5-fix-3 seed-findings (mechanical conformance)

## Role and engine

`checker`, Sonnet, a native Claude Code subagent. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing. Rule on every claim with PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing.

## Subject and evidence

Unit D5-fix-3 (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-3-brief.md`, items M1 to M4, each fixed by `d5-fix-2-audit-objective.md` § Findings outside the claims F1 to F4); its report `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-3-report.md`; the evidence `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-3.diff.txt` and `d5-fix-3.status.txt` (the whole uncommitted tree); the changed files at their new state under `/home/user/scaffold`; the installed declaration `/home/user/scaffold/node_modules/@orkestrel/guide/dist/src/core/index.d.ts` (`collectSummaries` at about `:174-188`, `replaceSummary`'s byte-for-byte clause at about `:1859-1863`); `/home/user/scaffold/AGENTS.md` § Writing.

## Claims

1. **M1.** `scripts/docs.ts` declares `collectCells` and calls it where `collectSummaries` was declared and called, and the name `collectSummaries` appears nowhere in the seed; the doc block's sentence still describes what the function gathers.
2. **M2.** The overlap fixture's child guide carries a third Surface row documenting the parent's `frame` declaration with the parent's cell text byte-identical; the overlap case asserts the closing line with `written:` one less than `disagreements found:` and one `wrote ` line, keeps the whole-file assertion and the clean re-report, and the report records the measured closing line.
3. **M3.** Two cases exist beside the pitch case: one over a manifest with no `name`, one over a manifest naming a guide the index does not carry; each asserts the exact line array with no `pitch` line and the exit code; each is named for what it proves.
4. **M4.** `guides/scaffold.md`'s write-run paragraph names `written:` and `reported:` and what each counts, in one sentence, with each code token followed by a noun and no count of a growable set.
5. **Scope honesty.** `d5-fix-3.status.txt` equals `d5-fix-2.status.txt`'s set (no file added or removed); `scripts/docs.ts` moved only by M1; `guides/scaffold.md` only by M4; `tests/src/core/compilers.test.ts` only by M2 and M3; `host.json` by digests alone.
6. **Report honesty.** Every `file:line` the report cites matches the files at their new state; every criterion carries an exit code and last lines; the observation records `disagreements found: 316`; no count of a growable set in the prose.

## Output

Per claim, the verdict and its evidence. Then findings outside the claims, each with `file:line`. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
