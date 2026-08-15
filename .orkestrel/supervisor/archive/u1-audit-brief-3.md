# U1 audit round 3 — successor to u1-audit-brief-2.md; the closing round

Subject: commit `a261b6d` (chain 3390fa0 → 173dffa → 77849bc → a261b6d), the fix-round-4 diff
(9 files) atop the round-2-audited base. Both lanes on Opus (Sol wrote every round). This round
decides whether U1 is ACCEPTED — the narrow brief attacks only round 4's fresh decisions; the
round-2 confirmations stand as established.

## Already established (Orchestrator-verified)

- Round 2: claims 2-6 CONFIRMED by both lanes; claim 7 settled by the Orchestrator's full-chain
  run; only round-4's items were open.
- At `a261b6d` (Orchestrator-run): `test:src` 232/232, `test:app` 599/599, `test:policy` 17/17,
  `test:guides` red on exactly the declared 20-export + 3-phantom-row set (U7's carrier;
  `LiveViewerInterface: destroy` joined it because `destroy` moved to the parent interface).
- `LiveViewer.#read` is `async`, so its throw reaches `next()` callers as a rejection —
  behaviorally identical to RosterViewer's explicit reject (Orchestrator-verified against both
  sources).

## Review evidence

Diff `/home/user/scaffold/tmp/redesign/u1.diff` (full chain; round 4 is the tail 9 files);
status `u1-status.txt`; gate log `u1-gates.log` (FIX4 ACCEPT section); writer report
`/home/user/scaffold/tmp/codex/u1-fix4-last.md`; brief `u1-brief-5.md`; the tree at `a261b6d`.

## Claims

CONFIRMED requires naming the failed attack; undecidable = UNRESOLVED + the settling run.

1. **The instrument is now two-sided and binding.** After `start()` every one of the seven
   subscriptions is asserted present (counts 2 for the five the persistence observer shares, 1
   for pause/resume — verify the writer's deviation reasoning against the persistence observer's
   actual subscriptions), and deleting ANY application subscription fails a test. The
   pause/resume wire proof drives real `paused: true`/`false` snapshots through an attached
   viewer.
2. **`ViewerInterface<T>` is the one home.** Both viewer interfaces extend it; no anonymous
   `{ events; destroy }` structural type survives (check `#pump` and `ApplicationRosterPumpHandler`);
   the single-consumer obligation is stated exactly once and inherited; placement and TSDoc obey
   the rules.
3. **One misuse, one answer.** Both viewers reject an overlapping read with the same typed error
   shape; both promises settle on destroy in both classes' tests; no production path can trigger
   the refusal.
4. **The seam rename is true.** `ClientRequestHandler`'s method union is exactly what
   `Client.#request` accepts (verify against its implementation and every caller); the roster
   passes `'GET'` at its call site; no `ClientRosterReadHandler` remnant; TSDoc truthful.
5. **Accept U1.** The whole chain at `a261b6d` is the roster capability the amended REDESIGN.md
   describes, U2 can bind today, and nothing in round 4 regressed a round-2-confirmed property.

## Threshold

This is the closing round: a finding now is the last cheap one. Findings outside claims at the
BROKEN standard only. Verdict shape per `/workspace/supervisor/.agents/skills/orkestrel-falsify/SKILL.md`;
one terminal line. No process diary.
