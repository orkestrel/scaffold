# U4 fix round 1 — successor to u4-brief.md, carrying audit round 1 (three lanes)

Six reconciled items. Granted beyond the original owned set: `app/browser/constants.ts` (the tone
map's home), `app/browser/components/CommandBar.vue` + its test (item 6). All decisions made.

1. **Ordering is (created, id), stated honestly.** Sol executed a reorder: equal `created` values
   tie-break by id, so a same-millisecond insertion can land between existing rows. Orchestrator
   ruling: no upstream ordinal and no retained order (the derivation ruling stands); the order IS
   the pure function (created ascending, id ascending) — deterministic across reloads and
   clients, with movement possible only inside a same-ms tie. Rewrite the component comment to
   state exactly that bound (drop the arrival-stability prose), and pin the tie case in the test
   as deterministic (alpha renders before zulu whichever arrived first).
2. **The decayed badge decays.** A last-seen-running departed row paints a byte-identical primary
   badge to a live one. Give the ended tense its own quieted tone through the central map
   (`ROW_TONE`'s `skipped` shape is the precedent), applied to departed rows' badges only; the
   open-row override and the id/"Last seen" text treatment are correct and untouched.
3. **The error state announces once.** Its `role="alert"` and the `role="status"` line currently
   restate each other. In that arm only: the status line carries "No runs are listed." and the
   liveness sentence stays with the alert. The partial arm is right as shipped — untouched.
4. **Prove keyboard reach for real.** The test calls `first?.focus()` before asserting, so Tab
   failure is concealed. Deterministic starting focus, real Tab traversal to the row, assert
   focus arrived, Enter opens. No programmatic focus on the asserted path.
5. **No timer settling.** `waitForDelay()` in the OpenPanel demotion test violates the no-timer
   rule — replace with an observable convergence wait (the shared reactive wait).
6. **CommandBar derives from the manager.** Sol proved the one-shot `roster.read()` is a
   correctness defect: its failure leaves valid controls disabled permanently while
   `operator.roster.snapshot` holds the commands. Delete the private read and ref; derive
   advertised commands reactively from the manager's snapshot; commands legitimately advertise on
   the first frame — update the tests to identify and deliver a frame. Smallest coherent change.

Probe preservation: Sol's tie-reorder construction becomes the item-1 tie test; the failing
CommandBar read path becomes a test proving controls advertise once the snapshot arrives even
when a read would have failed.

Gates: scoped converge; the owned suites by path; the Orchestrator runs the chain. The known
carried red (ApplicationView caption sweep) stays U5's.
Output: diffs, per-item proofs, git status --porcelain. No diary.
