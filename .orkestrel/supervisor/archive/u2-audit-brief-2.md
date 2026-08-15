# U2 audit round 2 — successor to u2-audit-brief.md; the closing round

Subject: commit `8753701` (chain a261b6d → 85a1257 → 8753701), the fix-round-3 diff atop the
round-1-audited base. Sol wrote every round, so both lanes run on Opus. This round decides
whether U2 is ACCEPTED and U3 dispatches on the same files.

## Already established (Orchestrator-verified)

- Round 1: claims 4, 6 CONFIRMED by the engine lanes; claim 1 lifecycle truth confirmed
  subjectively with the analyst's two evidence gaps now closed as fix items; claim 6's
  enumeration settled by the Orchestrator's run.
- At `8753701` (Orchestrator-run): src 232/232, app 613/613 (59 files), policy 17/17, guides red
  on exactly the 23-name + 3-phantom set (`tmp/redesign/u2-gates.log`, U2 FIX3 section).
- The scope accounting is reconciled (three integration files, all ruled fallout); `retry()`
  survives collapse into `start()` (reviewer's ruling: start resets the expiry latch and fires
  unconditionally; retry does neither).

## Review evidence

Diff `/home/user/scaffold/tmp/redesign/u2.diff` (full chain); `u2-status.txt`; `u2-gates.log`;
writer reports `tmp/codex/u2-last.md`, `u2-fix1/2/3-last.md`; briefs `u2-brief*.md`; the tree at
`8753701`. All tmp paths under `/home/user/scaffold/`.

## Claims — attack round 3's own decisions

CONFIRMED requires naming the failed attack; undecidable = UNRESOLVED + settling run.

1. **`departed` is true decay memory.** Entries the latest snapshot dropped, last-seen state,
   newest departure first; reset by session start and `clear()`; preserved by `retry()`/`abort()`;
   an id re-entering the roster leaves it; the reconciliation cannot duplicate an id or resurrect
   stale state when departures interleave with faults and retries; the TSDoc says exactly this.
2. **Session adoption is clean.** `start()` (session) clears `snapshot` AND `departed`; user B's
   window can never read user A's rows under any interleaving including a faulted attach;
   `retry()` retention is untouched; the A-expiry/B-login proof binds.
3. **`destroy()` is idempotent and joining.** Concurrent and repeated destroys return one
   settled promise, join the owned loop exactly once, and cannot race `start()`/`retry()` into a
   leaked loop; the sync-throwing `watch()` is contained with `#task` never rejecting.
4. **The deletions are complete and safe.** No `createRosterManager` remnant anywhere; the
   removed `AUTH`-path fault assignment was genuinely unreachable (verify the argument from the
   loop structure); the consolidated wait helper and scriptable roster fixture in
   `tests/setupBrowser.ts` replaced every local duplicate with no behavioral loss.
5. **Accept U2.** The whole chain at `8753701` is the manager the amended REDESIGN describes;
   nothing regressed a round-1-confirmed property; U3 (same files) and U4 (renders
   `snapshot`+`departed`+`live`+`fault`) can bind today.

## Threshold

Closing round; a finding now is the last cheap one. Findings outside claims at the BROKEN
standard only. Verdict shape per `/workspace/supervisor/.agents/skills/orkestrel-falsify/SKILL.md`;
one terminal line. No process diary.
