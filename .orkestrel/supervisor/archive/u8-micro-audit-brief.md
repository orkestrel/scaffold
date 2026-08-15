# U8 micro-round confirm — Sol, round 3 at this seam

Successor to `u8-fix-audit-brief.md`. Writer: the Opus `implementer` from baseline 4a78ccd
(commit pending at dispatch — audit the range `4a78ccd..HEAD`). This is round 3 at the U8 seam;
the surface is exactly the three micro items, so confirm or break them and nothing else — the
earlier claims are settled on the record in
`/home/user/scaffold/.orkestrel/supervisor/u8-audit-reconciliation.md`.

## Route

`analyst`, engine **GPT-5.6 Sol**, journaled `codex exec`, read-only sandbox, in
`/workspace/supervisor`. You are already inside the codex CLI; launch nothing. The sandbox denies
listeners; the acceptance log `/home/user/scaffold/tmp/redesign/u8-micro-acceptance.log` is the
executed record. Writer report (non-authoritative):
`/home/user/scaffold/tmp/redesign/u8-micro-report.md`.

## Claims

1. **A `th` names its axis.** `resolveRole` resolves `scope="row"` → `rowheader` and
   `scope="col"` → `columnheader`; a scopeless `th` keeps `columnheader` with the limit stated;
   the regenerated trees show `rowheader "Attempt 1"` where `TaskView.vue` renders
   `scope="row"`, and the discriminating probe (`columnheader "Attempt"` beside
   `rowheader "Attempt 1"`) can fail.
2. **No scripted drive bypasses the journal.** Every capture scenario's drive flows through an
   action-and-record helper; the `open` journal carries the run-opening press; read each
   scenario's steps artifact against its code and name any drive still outside the journal.
3. **No function is declared or assigned inside a method body** in `Journal` (or anywhere the
   diff touches); the handlers are class-field initializers; watch/restore behavior is unchanged
   (forwarding proved by the writer's release probe, which failed when restore was broken).
4. **Scope and gates.** The diff touches only `tests/setupBrowser.ts` and
   `tests/app/browser/portfolio.test.ts`; the pre-existing readers above the fix-round additions
   in `setupBrowser.ts` are byte-identical against 4a78ccd; the acceptance log's eleven steps
   all exit 0.

## Output

Per claim CONFIRMED / BROKEN (failing input, file:line, smallest fix) / UNRESOLVED /
NOT-EVIDENCED, one terminal line per `orkestrel-falsify`. No process diary.
