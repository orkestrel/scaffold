# Unit sea-skip fix round 2 — the round-2 objective lane's prescriptions, adopted verbatim

## Role and engine

Orchestrator-owned, applied directly in `/home/user/fleet/sea` at 20:48 UTC (`.agents/orchestration.md` § Orchestrator and executor: a one-line fix is worked directly). Each edit is the objective lane's own prescription, so `.claude/rules/quality.md` § Rounds and verdicts closes the round with a mutation probe in place of a third audit lane.

## Objective

Close the round-2 objective lane's refutation of claim 9 and its findings O1, O2, and O3 (`units/followon/sea-skip-r2-objective-opus.md`).

## Edits

- O1 — `tests/setupServer.test.ts:384`: `expect(commands.length).toBe(without.readUInt32LE(16))` becomes `expect(commands.length).toBe(parseMachoLoadCommands(roomy).length - 1)`.
- O2 — `guides/sea.md:36`: "a defect the injector reports against a write it already made" becomes "a defect the injector reports against its own construction or a write it already made".
- O3 — `src/server/types.ts:353-354`: "no room for the entry, or a `__LINKEDIT` layout it does not support" becomes "no room for a new section entry or load command, or a `__LINKEDIT` layout it does not support", keeping the em-dash column and the continuation indent.
- Claim 9 — `units/followon/sea-skip-report.md`: the § The sites row states that fix round 1 moved `:1332` and `:1402`; the round-2 integration note drops its tally.

## Mutation probe

Write `tmp/probe/linkedit.test.ts` with a control (the replaced assertion) and a pin (the adopted assertion); mutate `tests/setupServer.ts:741` to `const linkeditPresent = true`; run `npm run test:probe` and require the control green and the pin red; restore the line; run the probe again and require both green; delete the probe; run `npm run test:setup` and require exit 0; run `npx oxfmt --config .oxfmtrc.json --check` over the three edited files.

## Scope

Owned: the four files named under Edits. Off-limits: every other file. The landing's gate chain proves the tree.

## Acceptance

The probe's captures under `/home/user/work/evidence/sea-skip-proofs/fix2-*.txt` read as the report's § Fix round 2 states, and the landing's gates exit 0.
