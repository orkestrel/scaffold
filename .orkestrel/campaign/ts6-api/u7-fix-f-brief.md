# Unit brief — U7-fix-f: the remaining fixture budgets that a contended host outruns (probe)

Follows `u7-fix-e-brief.md`. Carries the fix-e verifier's two red rows (`u7-fix-e-verify-report.md` § 6), both timing class under a saturated host: the flagship receipts case timed out at its 60 s budget, and `replaces a lint stage its deadline destroyed` expired the type stage's warm at its 6 s budget. The whole file passed alone twice today (`u7-probe-solo.log.txt`, `u7-fix-probe-solo.log.txt`).

## Role and engine

`builder`, Sonnet. Perform the assignment directly and spawn nothing. You are the sole writer in `/home/user/fleet/probe` for the life of this unit.

## Objective

Give every remaining fixture budget in `tests/src/server/Probe.test.ts` the room a contended host needs, without changing what each case proves: a stalled stage still expires, a parked teardown still parks, and the flagship proves still prove.

## Context

- Read first: `.claude/rules/tests.md` § Expensive proofs (at `/home/user/scaffold/.claude/rules/`; size a budget from a contended run), then the cases named under Edits in `tests/src/server/Probe.test.ts`.
- Measured, 2026-09-06: under a host with a load average above 4 on four processors, the type stage's warm over a small scratch workspace exceeded 6 s, and the flagship case's boot plus its proves exceeded 60 s; alone, the same rows pass with room.
- The tree is dirty with U7 and fixes a to e, uncommitted; commit nothing.

## Scope

Owned: `tests/src/server/Probe.test.ts`, the budgets and the assertions that name them in the cases Edits lists, nothing else. Off-limits: everything else.

No `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, no commit, no install, no tree-wide `format` or lint `--fix`.

## Edits

1. **The flagship receipts case** (`mints receipts only when every stage executes cleanly, including for a control that shares no path with its case, and returns admitted path issues`, about line 88): `{ timeout: 60_000 }` becomes `{ timeout: 120_000 }`.
2. **`replaces a lint stage its deadline destroyed`** (about line 975): the case's `timeout: 60_000` becomes `timeout: 120_000`, `deadline: 6_000` becomes `deadline: 15_000`, and every assertion in the case that names the budget (the `exceeded 6000 ms` message, a `deadline: 6000` context) names 15,000 instead. The lint fixture stalls, so the case still proves the expiry and the replacement.
3. **The silenced-lint arming case** (the case around line 1095 whose comment says the marker silences every document so arming fails): `deadline: 6_000` becomes `deadline: 15_000`, with every assertion naming the budget updated the same way, and its `timeout` raised to `180_000` if it is lower.
4. **The FIFO teardown case** (the case around line 1469 that parks a generated specification on a FIFO): `deadline: 6_000` becomes `deadline: 15_000`, with every assertion naming the budget updated the same way, and its `timeout` raised to `120_000` if it is lower.
5. Above each retuned budget add or extend a one-line comment stating that the budget clears the stage's warm on a contended host, which a saturated host on 2026-09-06 showed the earlier value did not. Change no other budget.

## Output

Write `tmp/units/ts6-u7-fix-f-report.md` with the lines before and after per edit, every criterion below with PASS or FAIL and its evidence, and any deviation.

## Deviation contract

Stop and report when a case is not where the brief says, when an assertion names the budget in a form the brief did not anticipate and you cannot update it without changing what the case proves, or when a retuned case reddens alone.

## Acceptance criteria (cheap first)

1. `npx oxfmt --config .oxfmtrc.json --check tests/src/server/Probe.test.ts` exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/server/Probe.test.ts` exits 0.
3. `grep -n "deadline: 6_000\|exceeded 6000\|deadline: 6000" tests/src/server/Probe.test.ts` prints nothing.
4. `npx tsc --noEmit --project tsconfig.json` exits 0.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Probe.test.ts -t "replaces a lint stage"` exits 0, and the same for `-t "mints receipts only"`; report each duration.

## Review evidence

The Orchestrator captures `git diff` and `git status --short` after you exit; write nothing under `.orkestrel/`.
