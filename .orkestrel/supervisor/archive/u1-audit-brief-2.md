# U1 audit round 2 — successor to u1-audit-brief.md

## Subject and chain

`/workspace/supervisor`, branch `claude/orkestrel-test-package-0m1m8u`, commit `77849bc`
(chain `3390fa0` → `173dffa` U1+fix1 → `77849bc` fix rounds 2+3). All writing by Sol; this round
therefore runs both lanes on Opus per the fix-round auditor rule.

| Round | Claimed to close |
| --- | --- |
| Audit round 1 | FAIL both lanes — reconciled in `tmp/redesign/u1-audit-reconcile-notes.md` |
| Fix round 2 (`u1-brief-3.md`) | Nine reconciled items: lifecycle publish, one grant predicate, viewer read semantics, four naming/TSDoc repairs, close() deletion, read() seam collapse, pump event parameter, 401 stream proof, drain comment |
| Fix round 3 (`u1-brief-4.md`) | Two Orchestrator-found failures in round 2's own new tests: settlement-tolerant destroy assertion; stateful SSEReader |

## What the round decides

Whether the U1 chain is ACCEPTED and U2 dispatches against its contract. This is the round that
closes U1 or provokes round 3.

## Already established (Orchestrator-verified; do not re-run)

- Round-1 claims 1, 3, 4, 6, 7, 10, 12 CONFIRMED (see reconcile notes); their subjects unchanged
  by rounds 2+3 except where a new claim below names them.
- Post-fix acceptance in the Orchestrator's environment: `test:app:server` 209/209,
  `test:app:browser` 307/307, full chain red only on 3 guide-parity tests
  (`tmp/redesign/u1-gates.log`, FIX3 sections).
- Forbidden-construct sweep of the full chain diff: clean.
- REDESIGN.md amended (waiting struck, created rename, U7 carriers) at scaffold `774a57b`.

## Review evidence

Diff `tmp/redesign/u1.diff` (3390fa0→77849bc, 2339 lines); status `tmp/redesign/u1-status.txt`;
gate log `tmp/redesign/u1-gates.log`; writer reports `tmp/codex/u1-fix2-last.md`,
`u1-fix3-last.md`; briefs `u1-brief-3.md`, `u1-brief-4.md`; reconcile notes; the tree at
`77849bc`. All tmp paths under `/home/user/scaffold/`.

## Numbered claims — attack the fix rounds' own rulings

CONFIRMED requires naming the attack that failed. Undecidable = UNRESOLVED + the settling run.
No hedging toward consensus.

1. **Lifecycle publish binds and does not leak.** Emitter attach in `start()` / detach in
   `#release` is symmetric under every exit (completion, failure, stop, destroy); a released
   workflow's emitter retains no publish listener; the one-run `[] → pending → running` proof
   would fail if any lifecycle event stopped publishing.
2. **Refusing concurrent reads is sound and honest.** The refusal is explicit and typed, the SSE
   pump structurally cannot trigger it, both promises settle on destroy, and no consumer of
   `RosterViewerInterface.events` anywhere iterates concurrently.
3. **`close()` deletion left no orphan.** No reference to `close`/`#closing` survives on the
   roster path; no call site needed drain-then-end semantics; `LiveBroker.close(workflow)` (the
   workflow-channel drain) is untouched and uncontaminated.
4. **One predicate, no third door.** `allowsWorkflow` is a pure exported tested leaf; both filter
   sites route through it; no other membership decision exists in the tree.
5. **The server sub-entity mirrors the contract.** `handlers.roster.{read,live}` mirrors
   `handlers.units` and `client.roster.{read,watch}`; `subscribe` is gone everywhere; every new
   or renamed public name (`RosterSnapshotHandler`, `ApplicationRosterPumpHandler`,
   `ApplicationRosterHandlers`, `created`, `WorkflowStatus` use) obeys the naming rules with
   TSDoc that is true; no `started` or `WorkflowSnapshot['status']` remnant anywhere.
6. **SSEReader binds.** Consecutive frames in one chunk arrive as ordered separate messages, none
   dropped, remainder carried; no call site still passes a raw `ReadableStreamDefaultReader`; the
   settlement-tolerant destroy assertion cannot mask a hang (test-timeout loud) nor accept any
   rejection other than the verified termination error.
7. **The red set is exactly the 19+2 parity names** the fix-2 report lists, and nothing else, in
   the Orchestrator's FIX3 gate sections.
8. **Ship it.** As the roster capability the amended REDESIGN.md describes: coherent, no
   accumulated damage, U2 can bind to this contract today.

## Unknowns

None the Orchestrator knows of that the round needs; report anything the evidence cannot decide
as UNRESOLVED with its settling run.

## The threshold

A finding is worth more than a clean pass — U2 dispatches on this verdict. Findings outside the
claims enter only at the BROKEN standard. Return the orkestrel-falsify verdict shape
(`/workspace/supervisor/.agents/skills/orkestrel-falsify/SKILL.md`): numbered verdicts, findings
outside claims, one terminal line. No process diary.
