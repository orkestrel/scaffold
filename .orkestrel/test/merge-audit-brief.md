# Unit M-audit — falsification round on the merged 0.0.5

Role: `analyst`. Engine: GPT-5.6 Sol, journaled CLI, read-only sandbox rooted at
`/home/user/test` (HEAD `15abe9e`, the merge of the two parallel campaigns). Perform the
assignment directly and spawn nothing. Your sandbox denies socket binds; behavioral
loopback claims may rest on the committed suites plus source, and the Orchestrator's
executed evidence: core 41/41 and server 84/84 green post-merge, guides 11/11 on the
reconciled file.

## Authority

`.claude/rules/quality.md` Falsification; the `orkestrel-falsify` value set and
`VERDICT:` terminal line (skill in the scaffold checkout at
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md`).

## Context

Session A (this one) shipped createTeardown/createLoopback, audited FAIL 7,8,10 → fixed
at `9b1f1e2`. Session B shipped createHostileValues, published to npm as 0.0.4 at commit
`b6dcd56` (reachable in this clone). `15abe9e` merges both; `guides/test.md` was
reconciled per the rulings in
`/home/user/scaffold/.orkestrel/test/guide-merge-brief.md` (readable). The registry
serves 0.0.4.

## Claims — attempt to refute each

1. Every value and type the published 0.0.4 exports (per `b6dcd56`'s barrels) exists in
   `15abe9e` with identical declaration and behavior; nothing from session B was lost or
   altered in the merge — `createHostileValues` and its TSDoc are byte-identical to
   `b6dcd56`'s, and session B's tests (including `isSerializableRecord` in
   `tests/setup.ts`) run unmodified.
2. Every export of `9b1f1e2` (session A's audited state) exists in `15abe9e` unchanged —
   `createTeardown`, `createLoopback`, their types, their suites.
3. The merged guide rules every Limits candidate exactly once: the hostile row ships on
   the three-member evidence; raw invocation is ruled only by the standalone `invokeRaw`
   row; the ephemeral-port fixture-server row is absent (shipped); no candidate appears
   in two rows with different verdicts.
4. Guide parity holds and every count sentence is true against source: 26 exports, 16
   values, 10 types; every rule cross-reference resolves to the rule it means (rules 10
   teardown, 11 loopback, 12 hostile corpus).
5. No live-state roster survives anywhere in the guide: no per-package list of
   superseded-copy carriers for scratch members or `captureError` (membership evidence
   inside a Limits row's count is permitted, per the row convention).
6. `package.json` is 0.0.5, correct against a registry serving 0.0.4.

## Scope

Read-only. Off-limits: `tmp/**`, `node_modules/**` beyond reading installed
declarations, credentials.

## Output

The `orkestrel-falsify` verdict shape: per-claim CONFIRMED/BROKEN/UNRESOLVED/
NOT-EVIDENCED with file:line evidence, findings outside the claims, one terminal
`VERDICT:` line.
