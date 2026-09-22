Per-claim mechanical rulings (evidence: `/home/user/scaffold/tmp/audit/ba.diff`, `ba-status.txt`, `ba-report.md`, `/home/user/veneer-ba/tests/fixtures/oracle/inventory.json`).

**Claim 1 (partials).** CONFIRMED.
- `_badge.scss`, `_breadcrumb.scss`, `_close.scss` each open `@layer components` (ba.diff:567, 611, 663).
- Every declared selector in `_badge.scss`/`_breadcrumb.scss`/`_close.scss` matches the inventory's `badge`/`breadcrumb`/`btn-close` selector sets (inventory.json:65078-65167, 66316-66424, 67398-67704) except the four header combinators `.alert-dismissible .btn-close`, `.toast-header .btn-close`, `.modal-header .btn-close`, `.offcanvas-header .btn-close`, which are absent from the diff (confirmed no such selector text in ba.diff:663-718).
- `--bs-breadcrumb-font-size` read once (`font-size: var(--bs-breadcrumb-font-size);`, ba.diff around line matching `_breadcrumb.scss`) and declared nowhere — matches inventory's `.breadcrumb` declarations, which list every custom property except that one (inventory.json:65082-65146).
- The close mark data URI (ba.diff:676) is byte-identical to the inventory's recorded `--bs-btn-close-bg` value (inventory.json:67439).
- Barrel order: `@use 'components/breadcrumb'; @use 'components/badge'; @use 'components/close';` after `vr` (ba.diff:727-729).

**Claim 5 (accounting).** CONFIRMED for the countable parts, UNRESOLVED for the judgment clause and the gate reading, per the claims file's own instruction.
- `listed` literal gains `badge`, `breadcrumb`, `btn-close` at sorted alphabetic positions (ba.diff:1120-1126: badge, blockquote, breadcrumb, btn, btn-close, col — correctly ordered).
- `departures.md` diff shows one `badge` row, two `breadcrumb` rows, six rows appended to `btn`, and two `btn` rows struck (ba.diff:231-265), matching the report's per-member counts.
- Fourteen deferral rows struck (ba.diff:495-513, counted: `.btn .badge`, `.btn-close`, `:hover`, `:focus`, `:disabled`, `.disabled`, `.btn-close-white`, and seven `--bs-btn-close-*` rows) with the four Overlays rows (`.alert-dismissible .btn-close`, `.toast-header .btn-close`, `.modal-header .btn-close`, `.offcanvas-header .btn-close`) visibly retained, unstruck, in the same diff hunk.
- No addition row appears in the diff, matching the report.
- The most-specific-key-ladder attribution question is a design/correctness judgment, not a mechanical count: UNRESOLVED, referred to the objective/subjective lanes.
- The conformance gate's `17 passed` reading rests only on the writer's report (`ba-report.md:101-102`); no independent run evidence is in the supplied slice, so per the Checker brief and the rule that a writer's self-report is never authoritative, this is UNRESOLVED until the Orchestrator's own run, exactly as the claims file states.

**Claim 6 (guide).** CONFIRMED for the checkable parts.
- Heading order: `### Breadcrumb classes`, `### Badge classes`, `### Close classes` appear in that order after `### Helper classes`/before `### Deferred selectors` (ba.diff:411-487), matching the barrel's `breadcrumb, badge, close` order (ba.diff:727-729).
- Banned-term sweep (`should`, `simply`, `just`, `easy`, `currently`, `via`, `e.g.`, `etc.`, case-insensitive) over the whole diff: no matches (Grep run, zero hits).
- Removed guide lines in `guides/veneer.md`'s diff are confined to the repadded § Files table (ba.diff:277-403, a column-width realignment) and the fourteen struck § Deferred selectors rows (ba.diff:495-513, counted above); no other removal appears in the guide's diff hunks as supplied.
- Four stem rows (`breadcrumb-trail`, `badge-counter`, `close-control`, `close-inverted`) added to the capture-name table (ba.diff:544-547) and three proof links added to § Tests (ba.diff:555-557: breadcrumb, badge, close `.test.ts` links).
- No `guides/ledger/` path appears in the `guides/veneer.md` diff hunk (checked; only `guides/ledger/departures.md` is a separate file in the diff, not a path string inside `veneer.md`).

**Claim 8 (scope).** CONFIRMED.
- `ba-status.txt` lists only the files the brief's Scope names as owned (partials, section files, their proofs, `src/styles/index.scss`, `app/browser/{Showcase,constants,index}.ts`, `guides/veneer.md`, `guides/ledger/departures.md`, `tests/conformance.test.ts`, `tests/setup.ts`, `tests/setupStyles.ts`, and their test files) or shared (none listed as modified besides owned/shared per brief).
- `_mixins.scss`, `_button.scss`, `_grid.scss`, `_icon-link.scss`, `tests/setupServer.test.ts`, `tests/app/browser/sections/ButtonSection.test.ts` do not appear in `ba-status.txt` or `ba.diff` (grep for those paths in the diff returned only the diff's own `_button.scss`/`_grid.scss`/`_icon-link.scss` hunks under Deviation 1's reported patch text, which is prose inside `ba-report.md`, not a tracked change in `ba.diff`/`ba-status.txt`) — confirmed untouched in the actual diff.
- `tmp/probe/` is absent from `ba-status.txt` (not listed at all, consistent with "empty or absent").
- `tests/setup.test.ts` diff shows exactly one import/export-literal addition (`CLOSE_KEYS`, ba.diff:1129-1148), consistent with "the one authorized line rewrite and the literal additions."
- The design-verdict substitution claim ("did not diverge from the verdict's ruling on the unit's specimens") requires reading a file (`b-passive-design-verdict.md`) that the claims file itself and report Deviation 6 state is absent from the worktree. This sub-clause is UNRESOLVED: it cannot be checked against a file that does not exist, and no substitute evidence for it is in the supplied slice.

**Export-name probe.** Ran: no new function or constant export was added to `tests/**` in this diff beyond data-table constants (`BREADCRUMB_SELECTORS`, `BADGE_SELECTORS`, `CLOSE_SELECTORS`, etc., appended to `tests/setupStyles.ts`) and section-copy/specimen constants in `app/browser/constants.ts` — none of these collide with or shadow a name in `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` or `.../server/index.d.ts` (no matching identifiers found by name). CONFIRMED no export collision.

**Findings outside the claims:** none found within the scope of the evidence read (`ba.diff`, `ba-status.txt`, `ba-report.md`, inventory.json). Not exhaustively re-verified: claims 2, 3, 4, 7, 9 (token rulings, proof case counts, showcase/registry, deviations, gates) were not independently re-run or line-verified in this pass — treat those as not covered by this checker's evidence pull, distinct from a ruling.

VERDICT: FAIL 5 (partial: ladder-attribution sub-clause and the `17 passed` conformance reading are UNRESOLVED, not CONFIRMED), 8 (partial: design-verdict-divergence sub-clause is UNRESOLVED against a missing file); outside the claims: none