# U2 audit round 1 — browser RosterManager

## Subject

Commit `85a1257` in `/workspace/supervisor` (baseline `a261b6d`, the accepted U1). Chain: U2
implement (Sol thread 01a000f6) + two test-side fix rounds (barrel-free integration imports;
`networkidle` unreachable post-U1, six wait sites moved to concrete conditions).

## What the round decides

Whether U3 (reload restore — same files: `Operator.ts`, stores) and U4 (the rail, which renders
this manager's facts) build on it.

## Already established (Orchestrator-verified; do not re-run)

- Full chain green at `85a1257`: src 232/232, app 607/607 (59 files, integration included),
  policy 17/17; guides red on exactly the grown parity set (`tmp/redesign/u2-gates.log`, U2 FIX2
  section — the enumerated 24-name list plus the 3 phantom rows).
- U1's contract facts (complete snapshots, rich entries, single-consumer viewers, server never
  ends a stream on logout) audited and accepted at `a261b6d`.
- The Vue-bound-barrel and networkidle findings were Orchestrator-diagnosed and are fixed; the
  wait law is recorded in REDESIGN.md.

## Review evidence

Diff `/home/user/scaffold/tmp/redesign/u2.diff` (1126 lines); status `u2-status.txt`; gate log
`u2-gates.log`; writer reports `/home/user/scaffold/tmp/codex/u2-last.md`, `u2-fix1-last.md`,
`u2-fix2-last.md`; briefs `u2-brief.md`, `u2-brief-2.md`, `-3`, `-4`; design record
`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md`; the tree at `85a1257`.

## Numbered claims

CONFIRMED requires naming the failed attack; undecidable = UNRESOLVED + settling run. No hedging.

1. **Lifecycle truth.** The manager starts on session adoption (login and adopted-session
   identify), never restarts or aborts on workflow open/close/replace, aborts on logout as the
   ONLY termination (server serves until disconnect), restarts on the next login, and `destroy()`
   settles the owned loop — proven against the real composed server, not a stub.
2. **Facts, not labels.** `snapshot`/`live`/`fault` are independent; every UI state (loading,
   ideal, partial, error) is derivable from them; no stored second status label anywhere; `fault`
   clears exactly per its TSDoc ("next start or snapshot"); a stream failure retains the last
   good snapshot.
3. **Expiry is not a fault.** An `AUTH` stream refusal crosses `RosterExpiryHandler` exactly
   once, is idempotent to a second refusal, does not set `fault`, and the composition root's
   transition preserves the open-workflow memory U3 needs. Non-`AUTH` failures set `fault` and
   never cross the handler.
4. **No polling, one consumer.** No timer, interval, `Date.now()` loop, or reconnect-by-clock in
   the diff; `retry()` is the only recovery and it is explicit; the manager owns the sole
   consumption loop of its stream (nothing else iterates it); abort cannot orphan the loop.
5. **Placement, naming, scope.** New types in `app/browser/types.ts` first; `RosterManager` in
   controllers beside its siblings, one class per file; factory + barrel rows correct;
   `RosterExpiryHandler` and every new name obey the naming rules with true TSDoc; `Operator`
   wiring is the smallest coherent change; the touched set is the owned set plus the two
   integration-harness files (flagged fallout — rule on each); no forbidden constructs.
6. **The red set is exactly the declared set.** Enumerate the guides failure at `85a1257`
   yourself against the gate log: the grown export list and 3 phantom rows, nothing else.
7. **Ship it.** U3 can bind (`Operator.ts`/stores untouched by anything that precludes
   restore-on-reload) and U4 can render from these facts today.

## Unknowns

Whether the manager's behaviour under a mid-`start()` synchronous client throw is covered; if
undecidable, UNRESOLVED with the settling run.

## Threshold

A finding now costs one round; the same finding after U4 renders costs the rail. Verdict shape
per `/workspace/supervisor/.agents/skills/orkestrel-falsify/SKILL.md`; one terminal line. No
process diary.
