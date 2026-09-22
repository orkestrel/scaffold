# Unit F7 CAPTURE — brief 3 (the Orchestrator's assertion fix)

Successor to `tmp/units/f7-brief-2.md`. What changed: the fix round's objective audit (`analyst` on
GPT-6 Astra, `/home/user/scaffold/.orkestrel/veneer/units/f7-fix-audit-analyst-verdict.md`) ruled
claim 4 BROKEN: the journey proof's `expect(primary).toContain('button "Primary"')` and the setup
proof's `expect(body).toContain('button "Toggle"')` read the whole artifact body, so a tree half
reduced to its fallback still passes while the focus half carries the control. Every other claim held.
The Orchestrator writes this fix itself as a briefed, owned, and audited part; the auditor is Astra.

## Role and engine

The Orchestrator on Opus (served Opus 5), writing in `/home/user/veneer-f7`.

## Obligation

Restrict each tree assertion to the section before `focus:`:
`tests/app/browser/integration.test.ts` reads
`expect(primary.slice(0, primary.indexOf('focus:'))).toContain('button "Primary"')` and
`tests/setupBrowser.test.ts` reads
`expect(body.slice(0, body.indexOf('focus:'))).toContain('button "Toggle"')`. Nothing else changes.

## Control

Mutate `describeSubject` in `tests/setupBrowser.ts` so the tree half is always its fallback
(`No element in this subject carries a role.`) while the focus half is untouched; `npm run
test:setup:browser` and `npm run test:journey` must fail on exactly the two proofs; restore the
file to its digest and both must pass. Instrument: the Orchestrator's `f7-claim4-control.sh`, log
`f7-claim4-control.log.txt`, both retained under `.orkestrel/veneer/units/`.

## Scope

Owned: the two assertion lines. Off-limits: everything else.

## Acceptance criteria

1. `git diff` against the fix round's tree touches exactly two lines in the two named files.
2. The control's mutated run fails both proofs and the restored run passes.
3. `npm run lint:check` and `npm run format:check` exit 0.
