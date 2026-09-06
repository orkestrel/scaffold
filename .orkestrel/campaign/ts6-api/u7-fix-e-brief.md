# Unit brief — U7-fix-e: the guide table and the serialization fixture's race (probe)

Follows `u7-fix-d-brief.md`. Carries the fix-d verifier's two red readings (`u7-fix-d-verify-report.md` § 2 and § 6) and the Orchestrator's readings (`orchestrator-measurements.md` § The serialization fixture; `u7-serialization-solo.log.txt`, green alone). Two edits, fully specified.

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in `/home/user/fleet/probe` for the life of this unit.

## Objective

Make the guide's method table formatter-clean and true of the mirrored read, and give the serialization fixture a wait that clears the first project's resolution on a contended host.

## Context

- Read first: `.claude/rules/tests.md` § Expensive proofs (at `/home/user/scaffold/.claude/rules/`; probe's checkout has none), then `tests/src/server/Probe.test.ts` case `serializes project resolution against a live type inspection` (about lines 883 to 960) and `src/server/Probe.ts` `prove` and `#resolve` (about lines 140 to 160 and 552 to 570: a claim's project is resolved through the same admission the type inspection holds, so a second claim's resolution queues behind whichever the first claim is in when the second arrives).
- Measured, 2026-09-06: `tsc --showConfig` for one project costs about 100 ms idle and more under load, and the type stage now refreshes its mirror before that read; the fixture waits 100 ms after the first claim before proving the second and rewrites the second project on disk 20 ms after that, so under a saturated host the second claim queues behind the first claim's resolution rather than its inspection and reads the project before the rewrite. The case passed alone (`u7-serialization-solo.log.txt`) and failed under load in the fix-d verifier's run.
- The guide's `TypeStageInterface` method table (about lines 259 to 263) fails `oxfmt --check` after fix-d widened the `inspect` row, and its `resolve` row still reads "against the workspace copy of that project", which fix-a made false (the digest is read against the mirrored copy with the mirror as the current directory).
- The tree is dirty with U7 and fixes a to d, uncommitted; commit nothing.

## Scope

Owned: `guides/probe.md` (the `TypeStageInterface` method table only, and the formatter's re-padding of it), `tests/src/server/Probe.test.ts` (the case named above only). Off-limits: everything else.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no tree-wide `format` or lint `--fix`; `npx oxfmt --config .oxfmtrc.json --write guides/probe.md` is permitted for the table's padding alone, and you confirm with `git diff guides/probe.md` that the formatter moved table padding and the `resolve` row only.

## Edits

1. **The `resolve` row.** In the guide's `TypeStageInterface` method table, the `resolve` row's "read from the compiler's own `--showConfig` printout against the workspace copy of that project" becomes "read from the compiler's own `--showConfig` printout against the mirrored copy of that project, with the mirror as the current directory". Then run `npx oxfmt --config .oxfmtrc.json --write guides/probe.md` so the table's padding matches the widened rows, and confirm the diff touches that table alone.
2. **The fixture's wait.** In the case `serializes project resolution against a live type inspection`, the `await waitForDelay(100)` between `probe.prove(first)` and `probe.prove(second)` becomes `await waitForDelay(1_000)`, with a comment above it stating: the first claim's project resolution costs about 100 ms idle and more under load, and the second claim must queue behind the first claim's inspection rather than its resolution, so the wait clears the resolution on a contended host; the inspection of the heavy drafts outlasts it by seconds. Leave the 20 ms wait before the rewrite as it is.

## Output

Write `tmp/units/ts6-u7-fix-e-report.md` with the lines before and after, the `git diff --stat`, every criterion with PASS or FAIL and its evidence, and any deviation.

## Deviation contract

Stop and report when the formatter's write moves anything outside the method table, or when the case is not as the brief describes.

## Acceptance criteria (cheap first)

1. `npx oxfmt --config .oxfmtrc.json --check guides/probe.md tests/src/server/Probe.test.ts` exits 0.
2. `grep -n "against the workspace copy" guides/probe.md` prints nothing.
3. `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/server/Probe.test.ts` exits 0, and `npx tsc --noEmit --project tsconfig.json` exits 0.
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Probe.test.ts -t "serializes project resolution"` exits 0; report its duration.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` exits 0.

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you exit; write nothing under `.orkestrel/`.
