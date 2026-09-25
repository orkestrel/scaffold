# J-CONCERNS-A audit — the checker job

## Role and engine

`grok` on Cursor Grok holds the `checker` job: read-only and in ask mode. Perform the assignment directly and spawn nothing. You read files and run no command. Paths are relative to `C:/Users/mikes/WebstormProjects/`.

## Read first

- `scaffold/.orkestrel/veneer/engine/units/j-concerns-a-audit-claims.md`, the claims.
- `scaffold/AGENTS.md` and `scaffold/.claude/rules/tests.md`.

## The subject

- The unit's net diff: `scaffold/.orkestrel/veneer/engine/units/j-concerns-a-2.diff`, with its status in `j-concerns-a-2-status.txt` in the same directory.
- The whole test files at the unit's tip. They are the worktree copies at `veneer/tmp/worktrees/concerns-a/tests/src/browser/ScrollSpy.test.ts` and `Button.test.ts`, which the Orchestrator committed as `bcea965` with a clean status.
- Bootstrap's sources in `veneer/node_modules/bootstrap/js/src/`.
- The reports `j-concerns-a-report.md` and `j-concerns-a-report-2.md`, and the replay log `j-concerns-a-mutations-orchestrator-2.log.txt`, in the same units directory.

## Your claims

Rule claims 7 and 8 only. The objective lane rules the rest.
- **Claim 7:** read the diff and the two files against `tests.md` rule by rule. Name each rule you checked, and each added line that breaks one.
- **Claim 8:** open each Bootstrap file at each cited line, and quote the line that supports or contradicts the report.

## Output

Give a per-claim ruling: CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence. Then list the `tests.md` rules you checked. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
