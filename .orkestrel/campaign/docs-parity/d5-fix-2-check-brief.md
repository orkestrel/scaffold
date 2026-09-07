# Check brief — D5-fix-2 seed-close (mechanical conformance)

## Role and engine

`checker`, Sonnet, a native Claude Code subagent. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing. Rule on every claim with PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing.

## Subject and evidence

Unit D5-fix-2 (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-2-brief.md`, items L1 to L13); its report `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-2-report.md`; the whole-tree evidence `/home/user/scaffold/.orkestrel/campaign/docs-parity/d5-fix-2.diff.txt` and `d5-fix-2.status.txt`; the changed files at their new state under `/home/user/scaffold`; `/home/user/scaffold/AGENTS.md` § Writing and `.claude/rules/writing.md`.

## Claims

1. **L8 to L11 land as the brief words them.** `guides/scaffold.md`'s exit-code sentence reads "outside `--to`" and names the missing-index exit; the pitch paragraph names `guides/<name>.md` selected by the manifest's short name and the three silent cases; `scripts/docs.ts` carries no count of a growable set in any comment; the next-step line reads `next: npm run format` in the seed and in every expectation; `.claude/rules/workspace.md`'s vendored-imports bullet reads "a `node:` module, or a package `BASE_DEV_DEPENDENCIES` declares." and no other line of the file moved beyond D4's table and D5-fix's bullet.
2. **Scope honesty.** `d5-fix-2.status.txt` lists only D4's five, D5's, D5-fix's, the Orchestrator's two patched files (`src/core/constants.ts`, `tests/setupServer.ts`), and D5-fix-2's owned files (`scripts/docs.ts`, `src/core/constants.ts`, `src/core/compilers.ts`, `guides/scaffold.md`, `.claude/rules/workspace.md`, `tests/distribution.test.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/helpers.test.ts` or `tests/src/core/constants.test.ts` if touched, `host.json`); `tests/distribution.test.ts` moved by one row; `src/core/compilers.ts` moved only at the two read sites; no off-limits file moved.
3. **The inventory.** `host.json` moved by digests, the `scripts/docs.ts` entry, and the membership digest alone; the report records one digest across a second `build:inventory`.
4. **Report honesty.** Every `file:line` in `d5-fix-2-report.md` matches the files at their new state; its renumbering table names each D5 and D5-fix citation this round moved with the new range; every criterion carries an exit code and last lines; no count of a growable set in the prose; the observations are recorded with output.

## Output

Per claim, the verdict and its evidence. Then findings outside the claims, each with `file:line`. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
