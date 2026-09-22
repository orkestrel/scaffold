# B-PASSIVE-A — audit claims

Subject: the B-PASSIVE-A unit's uncommitted writes in `/home/user/veneer-ba` over `3a9202a`
(`badge`, `breadcrumb`, `btn-close`), written by `opus` from
`/home/user/veneer-ba/tmp/units/b-passive-a-brief.md` under the family record
`/home/user/veneer-ba/tmp/units/b-passive-family.md`, the baseline addendum
`b-passive-baseline.md`, and the design `b-passive-design-verdict.md` (staged after the unit
returned; report deviation 6). Evidence: `/home/user/scaffold/tmp/audit/ba.diff` (the whole diff,
untracked files as additions), `ba-status.txt`, the report `ba-report.md`, the frames under
`/home/user/veneer-ba/tmp/capture/states/`, the inventory
`/home/user/veneer-ba/tests/fixtures/oracle/inventory.json`, and the release stylesheet
`/home/user/veneer-ba/node_modules/bootstrap/dist/css/bootstrap.css`. Every lane rules each claim
CONFIRMED, BROKEN, or UNRESOLVED with `file:line` evidence; a claim about a proof is ruled on the
mutation named and whether the assertions distinguish it. Ruling D15 (the shared-block sweep's
recalibration) settles the report's deviation 1: the three overlaps are coincidences and no mixin
lands; rule nothing on that patch.

1. **The partials.** `_badge.scss`, `_breadcrumb.scss`, and `_close.scss` open `@layer components`
   and emit every selector the inventory records under the three keys, the four header combinators
   (`.alert-dismissible .btn-close` and the toast, modal, and offcanvas twins) authored absent;
   `--bs-breadcrumb-font-size` is read once and declared nowhere (Bootstrap's own shape); the close
   mark is the recorded data URI literal; the barrel appends the three lines in family ruling 8's
   order.
2. **Token rulings.** Each value in the report's per-value table follows the ceiling (a `--vn-*`
   token only where it already resolves to the recorded value; a `--bs-*` global byte for byte;
   `em`-relative values, opacities, the focus shadow, and the data URI as literals); rule in
   particular on `--bs-btn-close-focus-shadow` kept as the literal
   `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` against the design verdict's ruling that focus shadows
   bind the way `_button.scss` binds them (the report: neither `--vn-focus-width` nor
   `--vn-focus-color` resolves to the recorded value), and on the five `tokenized` and four
   `dropped` rows.
3. **The proofs.** `badge.test.ts` (10 cases), `breadcrumb.test.ts` (10), `close.test.ts` (17)
   read the relative box, the centered inline layout, the empty collapse, the button offset, the
   trail's inset and divider, the wrapping row, the close control's box, mark, opacity walk through
   rest, hover, and focus (after `waitForAnimations`), both refusals, the inversion filter in each
   mode, and the token, override (through a consumer stylesheet loaded with `scene.load`, because
   a component variable declared on the element is unreachable from an ancestor), factor (set on
   the document element), and mode readings; the case tables are frozen, inventoried, and bound to
   the inventory in `tests/setupStyles.test.ts` under `describe('passive component case tables')`;
   each lane names, for three cases of its choosing, the mutation the case distinguishes.
4. **The showcase and the registry.** `BadgeSection`, `BreadcrumbSection`, `CloseSection` render
   the specimens from frozen rows with no inline style; badges and the inverted close sit in a
   `.table-dark` cell so the frame region is not one color; `.btn .badge` renders in no specimen
   (a `.btn` outside the Button region reddened the showcase assertion at the time) and
   `.badge:empty` registers no scenario (a zero box); six rows join `CASCADE_KEYS`; `CLOSE_KEYS`
   carries `close-control-hover` and `close-control-focus` placed by the journey case; the
   `close-inverted` scenario replaced `close-on-dark` (the grammar bans a mode token); the frames
   the report lists were written (68 files).
5. **The accounting.** The three keys are in `listed` and gain a selector and a variable row each in
   § Compatibility; `guides/ledger/departures.md` gains the `badge` table (one row), the
   `breadcrumb` table (two rows), six rows appended to the `btn` table (the `.btn-close*` rules
   attributed to `btn` because the inventory records them under `btn` too and the ladder answers
   the first shipped key), and two stale `btn` rows struck (`--bs-btn-close-filter` at `:root` and
   `[data-bs-theme=light]`); no addition row; fourteen `Passive` deferral rows struck and the four
   `Overlays` rows kept; rule whether attributing `.btn-close*` to `btn` rather than `btn-close` is
   what the most-specific-key ladder (landed by VALIDATION) yields once both keys ship; the
   conformance gate (`17 passed`) is UNRESOLVED until the Orchestrator's own run.
6. **The guide.** `### Breadcrumb classes`, `### Badge classes`, `### Close classes` sit in barrel
   order after `### Helper classes` in the `### Table classes` voice; three § Files rows; a
   § Showcase sentence; four stem rows and three proof links in § Tests; the prose follows
   `writing.md`; no `guides/ledger/` path; the guide's whitespace-ignoring diff is 114 lines.
7. **The deviations.** Deviation 2 (the shipped-key Set literal gains `badge`, `breadcrumb`,
   `btn-close`), deviation 3 (`ButtonSection.test.ts` around line 68 excludes `btn-close*` as the
   `btn-close` key's classes rather than button variants), and deviation 4 (the journey's keyboard
   cases at their budget; the Breadcrumb section trimmed to two specimens with three links; every
   variant green alone with `CAPTURE=1`) are each outside the unit's scope as claimed, and the
   patches are correct; deviation 7 (`close-inverted`) is the grammar's own refusal honoured.
8. **Scope is honest.** The status lists owned and shared files only; `_mixins.scss`,
   `_button.scss`, `_grid.scss`, `_icon-link.scss`, `tests/setupServer.test.ts`,
   `ButtonSection.test.ts`, the vendored files untouched; `tmp/probe/` deleted;
   `tests/setup.test.ts` carries the one authorized line rewrite and the literal additions; the
   substitution for the missing design verdict did not diverge from the verdict's ruling on the
   unit's specimens (read `b-passive-design-verdict.md` against the specimens shipped).
9. **Gates.** `format:check`, `lint:check`, `check`, `build:src`, `test:src:styles` (453),
   `test:conformance`, `test:guides`, `test:policy` green per the report; `test:setup` red on
   deviations 1 and 2 alone; `test:app` red on deviation 3 alone; the journey green per variant
   with `CAPTURE=1` (26 each) and red concurrently; `npm test` not run.
