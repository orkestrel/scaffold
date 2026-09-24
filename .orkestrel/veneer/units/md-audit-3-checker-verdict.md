Log corroborates report's gate table (this is a lane-read log, not the writer's self-report, so it counts as evidence).

Verdict

**Verdict — orkestrel-falsify shape**

1. **Scope and delta.** CONFIRMED. `md-3-status.txt:1-4` lists exactly the four round-1 owned paths, all untracked. The interdiff `md-3-shared-interdiff.txt:1,453,467` (`diff -ru` headers) shows exactly three touched files — `guides/veneer.md`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts` — matching the Modal `plugin` row, the stacking paragraph, the `MODAL_SIZE_CASES` TSDoc line, and the binding case's comment, plus the table padding shown at `md-shared-3.patch:531-549` (widened Obligation column). The sub-clause "`md-3.diff` equals `md-2.diff`" is **UNRESOLVED**: both files' opening five lines match (`md-3.diff:1-5`, `md-2.diff:1-5`), but full byte equality needs `diff -q` or a checksum, which this checker cannot run; the Orchestrator takes that reading. Separately, the report cites the comparison target as `.orkestrel/veneer/units/md-instruments/md-2.diff` (`b-modal-md-report-3.md:13,191`), a path that does not exist — the real file is `.orkestrel/veneer/units/md-2.diff`. That is a report-citation defect, carried below as an outside finding.

2. **M7.** CONFIRMED. The row text at `md-shared-3.patch:743` matches the claim verbatim. Every clause is borne out in `modal.js`: click handler `339`; `alreadyOpen`/`OPEN_SELECTOR` lookup and `.hide()` call `360-362` (`OPEN_SELECTOR` constant confirmed at the file's selector block); cancelable `hide` returning early on `defaultPrevented` `123,128,130`; `data.toggle(this)` at `367` on the target from `getElementFromSelector(this)` at `340`; `toggle` delegating to `hide`/`show` at `94-95`, each returning early at `107` and `130`; focus restorer registered `346-357`, gated on `isVisible(this)` at `353`. No clause promises an unconditional visibility change.

3. **M8.** CONFIRMED. The paragraph at `md-shared-3.patch:287-291` carries the exact wording. Per-file: `_dropdown.scss:21,50`; `_offcanvas.scss:5,37` and the drawer-backdrop literal `_offcanvas.scss:120`; `_modal.scss:12,38` (modal z-index) and `115,120` (backdrop z-index via `overlay-backdrop`); `_popover.scss:3,25`; `_tooltip.scss:4,18`; `_toasts.scss:3,41,44`; `helpers/_position.scss:8,16,27,33` (fixed and sticky literals). All lines read exactly as the report states.

4. **M9.** CONFIRMED. `md-shared-3.patch:1322` reads "Below the small boundary no dialog is capped"; `md-shared-3.patch:1134` reads "the cap at the small boundary". A grep sweep of the owned files (`ModalSection.ts`, `_modal.scss`, `ModalSection.test.ts`, `modal.test.ts`) for the positional-word set found no boundary/cap/step/rung named by position outside the ruled exceptions (`modal.test.ts:216-219,319` bindings/identifiers, `:420` "narrowest variant"; `ModalSection.test.ts:189` "narrowest and widest variant"), consistent with the report's own accounting.

5. **Law and report.** CONFIRMED. The three touched hunks (`md-3-shared-interdiff.txt:4-10,456-463,470-476`) are prose/comment-only — no `any`, `as` beyond none present, `!`, suppression, or nested function is introduced. The report's gate table matches the independently-read log `md-gates-3.txt:1-8` command-for-command, exit code, and result text. A substitution sweep of `b-modal-md-report-3.md` for the banned-term table found no hit. Every count the report states (gate results, `126`/`19`/`109`/`1`/`22`, the stat line `16 files changed, 917 insertions(+), 223 deletions(-)`) is a cited measurement or quotation, not a bare count.

**Findings outside the claims, ruled**

- **report-path (BROKEN).** `b-modal-md-report-3.md:13` and `:191` cite `.orkestrel/veneer/units/md-instruments/md-2.diff`; that path does not exist (confirmed by `Glob`). The real prior-round diff is `.orkestrel/veneer/units/md-2.diff`. Carrier: none named by this round's brief; route to whichever unit next touches the round-3 report.

**Counts the report states, listed:** `126` (`setupStyles.test.ts` passed), `19` (guides), `109 passed | 1 skipped` (policy, `110` total), `22` (conformance); stat `16 files changed, 917 insertions(+), 223 deletions(-)`.

VERDICT: FAIL 1; outside the claims: report-path
