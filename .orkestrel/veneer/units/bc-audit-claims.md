# B-PASSIVE-C — audit claims

Subject: the B-PASSIVE-C unit's uncommitted writes in `/home/user/veneer-bc` over `3a9202a`
(`card`, `list-group`), written by `opus` from `/home/user/veneer-bc/tmp/units/b-passive-c-brief.md`
under the family record `/home/user/veneer-bc/tmp/units/b-passive-family.md` (ruling 8 amended by
D18: a partial loads only the modules it reads), the baseline addendum `b-passive-baseline.md`, and
the design `b-passive-design-verdict.md` (with amendment D17 at its end; the unit read the retained
copy, report D5). Evidence: `/home/user/scaffold/tmp/audit/bc.diff` (the whole diff, untracked files
as additions), `bc-status.txt`, the report `bc-report.md`, the frames under
`/home/user/veneer-bc/tmp/capture/states/`, the inventory
`/home/user/veneer-bc/tests/fixtures/oracle/inventory.json`, and the release stylesheet
`/home/user/veneer-bc/node_modules/bootstrap/dist/css/bootstrap.css`. Every lane rules each claim
CONFIRMED, BROKEN, or UNRESOLVED with `file:line` evidence; a claim about a proof is ruled on the
mutation named and whether the assertions distinguish it. Ruling D15 (the shared-block sweep)
settles report D2: the four overlaps are coincidences and no mixin lands; rule nothing on that patch.
Family ruling 4's ceiling admits a `--vn-*` token only where it already resolves to the recorded
value, so `#0d6efd` binds to `var(--vn-palette-blue)`; rule the per-value table on that ceiling.

1. **The partials.** `_card.scss` and `_list-group.scss` open `@layer components` after the `@use`
   lines they read and emit every selector and custom property the inventory records under `card`
   and `list-group` and nothing else (no containment, no `box-shadow` on `.card`, no `.card-flush`,
   no `.card-frame`, no `-tertiary` variant, no right-to-left output); the `.card > .list-group`
   combinators are authored in `_card.scss` alone; the card group sits under the tree's
   `breakpoint-up(sm)` mixin and the horizontal ramp under `breakpoint-each`; the contextual roles
   come through `tokens.$aliased`; the barrel appends both lines after `@use 'components/vr'`; the
   report's built-cascade reading (`card: recorded selectors=36 missing=[]`, `list-group: 67
   missing=[]`) reproduces.
2. **Token rulings.** Each of the twelve `tokenized` rows names an existing `--vn-*` token that
   resolves to the recorded value (`--vn-space-8` for `1rem`, `--vn-space-4` for `0.5rem`,
   `--vn-space-6` for `0.75rem`, `--vn-palette-white-base` for `#fff`, `--vn-palette-blue` for
   `#0d6efd`); every `--bs-*` global and every structural value is written as the release writes it;
   no token was added; the guide states the palette consequence (a role retune does not move the
   selected row) and the proof `reads $property from its own token` reads it.
3. **The proofs.** `card.test.ts` (24 cases) and `list-group.test.ts` (33 cases) read every recorded
   site per the report's coverage matrix, including the card-group and horizontal boundaries at
   `boundary - 1`, `boundary`, `boundary + 1` derived from `GRID_BREAKPOINT_CASES`, the
   `-tertiary` absence, and the token, override (shadowed on an ancestor, then the component),
   factor, and mode readings; the case tables are frozen, inventoried, and bound in
   `tests/setupStyles.test.ts` with the recorded conditions read back through `parseMediaWidth`;
   each lane names, for three cases of its choosing, the mutation the case distinguishes.
4. **The showcase and the registry.** `CardSection` and `ListGroupSection` render the specimens
   from frozen rows (the breakpoint ramp and the role list mapped from source lists) with no inline
   style; the base specimens are `Card base` and `List group base` (a specimen may not share a
   region's name); the eight roles share one `List group roles` specimen (a stem may carry no mode
   token); 21 rest rows join `CASCADE_KEYS`; `LIST_GROUP_KEYS` carries the three driven scenarios
   as element frames of the specimen moved to the document's start and restored in `finally`
   (report D7: a page frame scrolls under a pointer that does not move, an in-place element frame
   is uniform at 390) — rule whether that departure from the family note is sound; the `Card rule`
   key reads `.card` and `border-bottom-color` rather than the one-pixel `hr` region (D8); the
   244 files the report lists were written; the hover and focus driven frames are recorded as an
   honest identity (one slot pair for both states).
5. **The accounting.** `card` and `list-group` are in `listed` at sorted positions; § Compatibility
   gains a selector and a variable row per key; `guides/ledger/departures.md` gains the seven `card`
   and five `list-group` rows the report lists; no addition row; no deferral row struck (none names
   either key); the conformance gate (`17 passed`) is UNRESOLVED until the Orchestrator's own run.
6. **The guide.** `### Card classes` and `### List group classes` sit in barrel order after
   `### Helper classes` in the `### Table classes` voice; a § Files row per partial after `_vr.scss`;
   the prose follows `writing.md`; no `guides/ledger/` path; the only guide content change beyond
   insertions is the § Files repadding (D4).
7. **The deviations.** D1 (the shipped-key Set literal gains `card` and `list-group`) is outside the
   unit's scope as claimed and the patch is correct; D3 (the one authorized `tests/setup.test.ts`
   rewrite) and D6 (specimen names, the role specimen, the lane names, the `href`-less links kept
   out of the tab order) are ancillary choices the unit could settle — rule on the `href`-less card
   links and header navigations as a showcase reader and an assistive-technology user meet them.
8. **Scope is honest.** The status lists owned and shared files only; `_mixins.scss`, `_ratio.scss`,
   `elements/_figure.scss`, `tests/setupServer.test.ts`, the vendored files untouched; no
   `tmp/probe/` residue; `tests/setup.test.ts` carries the authorized rewrite, the export row, and a
   new case `drives a state only for a specimen the resting registry already photographs`.
9. **Gates.** `format:check`, `lint:check`, `check`, `build:src`, `test:src:styles` (473),
   `test:app` (30), `test:conformance`, `test:guides`, `test:policy`, `test:journey` (104), and
   `CAPTURE=1 test:journey` (104, 244 files) green per the report; `test:setup` red on D1 and D2
   alone; the traversal cases measured at 9.3 s and 5.5 s with the sections against 7.1 s and 5.1 s
   without — UNRESOLVED pending the Orchestrator's runs.
