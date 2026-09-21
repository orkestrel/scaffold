# Unit CL3b — fix round (brief 3)

Succeeds `cl3b-brief-2.md`, which with `cl3b-brief.md` beneath it stays in
force for everything this brief does not name. Both are left unedited. What changed and why: the
round-1 audit (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl3b-audit-verdict.md`)
confirmed every claim on the lanes that could rule on it, the verifier's chain is green on both
browsers, and one defect forces this round.

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), HEAD `9bb306e` with CL3b's eighteen files
uncommitted in the working tree (the state round 1 ruled on). Perform the assignment directly
and spawn nothing. Run no `git checkout`, `restore`, `stash`, `reset`, or `clean`; commit
nothing; push nothing.

## The finding

**Analyst 9.** Your two new cases in `tests/src/styles/tokens.test.ts` (the muted and raised
token case at about line 467, and the shorter stack and code rhythm case at about line 515)
declare `it.each(['light', 'dark'])` inline. `tests/setupStyles.ts` already exports `TEXT_MODES`
for exactly that, and `.claude/rules/tests.md` puts a case matrix in a setup file at any size.
This is the rule CL3's round 1 raised and its round 2 landed across the element proofs; these
two cases are the last inline matrices in the styles suite.

A third inline matrix sits in the same file at about line 439, the `code calibration tokens`
case CL3 landed: the element proofs were moved in CL3's round 2 but this file was not in that
round's owned set. It is in yours, and it takes the same fix.

Fix: import `TEXT_MODES` and register all three cases with it. Change nothing else in the file:
the assertions, the expected values, and the anchor proof stay as they are. `TEXT_MODES` is
already exported, so `tests/setupStyles.ts` and `tests/setupStyles.test.ts` are untouched.

Then sweep the styles suite for any other inline mode matrix or expected-value table the earlier
rounds did not reach (`tests/src/styles/**`), and report what the sweep covered and found. Fix
what the sweep finds only where the fix needs no file outside this brief's owned set; report
anything else rather than editing it.

## Scope

Owned: `tests/src/styles/tokens.test.ts`, `cl3b-report-2.md`. Off-limits: everything
else, including every other CL3b file, `tests/setupStyles.ts`, and `tests/setupStyles.test.ts`.

## Execution

1. The fix, then `npm run test:src:styles` green with the same counts as round 1
   (`Test Files 30 passed (30)`, `Tests 162 passed (162)`), and a plant proving the cases still
   bind: set one expected value wrong, read the red counts, restore, read green.
2. The sweep, recorded.
3. Gates, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run build`, `npm run test:src:styles`, `npm run test:setup`, then
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`.

Host: Windows, Git Bash; `npm run <name>`; the `src:styles` project loads the built cascade, so
rebuild with `npm run build:src:styles` after any `.scss` edit (this round edits none).

## Output

Write `cl3b-report-2.md` in the Veneer checkout and return it: the change as landed
with its site, the sweep's population and result, the red-then-green pair with its counts, each
gate's exit code and final lines on both engines, the actual `git diff --stat` and
`git status --porcelain --untracked-files=all` (CL3b's eighteen paths and nothing new), and the
plant's removal.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: how the sweep is recorded.
Stop on: a gate red after your own fix inside the owned file; a sweep finding whose fix needs a
file outside the owned set (report it instead).

## Acceptance criteria

1. No inline mode matrix or expected-value table remains in `tests/src/styles/tokens.test.ts`;
   all three cases read `TEXT_MODES`.
2. The sweep is recorded with its population and its result.
3. `npm run test:src:styles` reports the round-1 counts on both browsers, and the plant reddened
   the cases.
4. Every gate in item 3 exits 0.
5. The status lists CL3b's eighteen paths and nothing else.
