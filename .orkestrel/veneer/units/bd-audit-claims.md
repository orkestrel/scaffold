# B-PASSIVE-D — audit claims

Subject: the B-PASSIVE-D unit's uncommitted writes in `/home/user/veneer-bd` over `3a9202a`
(`pagination`), written by `opus` from `/home/user/veneer-bd/tmp/units/b-passive-d-brief.md` under
the family record `/home/user/veneer-bd/tmp/units/b-passive-family.md`, the baseline addendum
`b-passive-baseline.md`, and the design `b-passive-design-verdict.md` (staged after the unit
returned; report deviation 3). Evidence: `/home/user/scaffold/tmp/audit/bd.diff` (the whole diff,
untracked files as additions), `bd-status.txt`, the report `bd-report.md`, the frames under
`/home/user/veneer-bd/tmp/capture/states/`, the inventory
`/home/user/veneer-bd/tests/fixtures/oracle/inventory.json`, and the release stylesheet
`/home/user/veneer-bd/node_modules/bootstrap/dist/css/bootstrap.css`. Every lane rules each claim
CONFIRMED, BROKEN, or UNRESOLVED with `file:line` evidence; a claim about a proof is ruled on the
mutation named and whether the assertions distinguish it.

1. **The partial.** `src/styles/components/_pagination.scss` opens `@layer components` after
   `@use '../mixins' as *` (no `../tokens`, which it would not read) and emits every selector the
   inventory records under `pagination`, the `.page-link` transition through the `transition` mixin
   with its reduced-motion twin, the state pairs as two-selector rules, the size classes inline; the
   barrel line sits after `@use 'components/vr'`; the report's built-cascade reading (every recorded
   selector PRESENT) reproduces.
2. **Token rulings.** Each value in the report's per-value table is a token the ceiling admits
   (family ruling 4: a `--vn-*` token only where it already resolves to the recorded value) or a
   permitted literal; rule in particular on `#0d6efd` bound to `var(--vn-palette-blue)` (the report:
   `--vn-color-primary-base` is `oklch(0.48 0.255 264)`, so the ceiling bars the role token) against
   the tree's precedent binding the active fill to the primary role, and on the focus shadow written
   as `0 0 0 0.25rem color-mix(in srgb, var(--vn-palette-blue) 25%, transparent)` with the `0.25rem`
   literal (the report: `--vn-focus-width` is `0.1875rem`) against the design verdict's ruling that
   focus shadows take `.btn`'s binding; whether the thirteen `tokenized` rows follow.
3. **The proof.** `tests/src/styles/components/pagination.test.ts` (16 cases) reads every recorded
   selector into the components layer, the direct and parent state forms alike, the border collapse
   between adjacent items, the sizes' padding, font, and radius, the hover lift, the focus ring as a
   measurable shadow, the reduced-motion collapse under the staged preference, and the token,
   override (ancestor shadowed, then the strip), factor, and mode readings; the case tables
   `PAGINATION_*` are frozen, inventoried, and bound to the inventory; each lane names, for three
   cases of its choosing, the mutation the case distinguishes and whether the assertions distinguish
   it.
4. **The showcase and the registry.** `PaginationSection` extends `SpecimenSection` with specimens
   from `PAGINATION_SPECIMENS` derived from one source list; the resting specimen is `Page strip`
   (report deviation 5: a specimen named `Pagination` collided with the region); five rest scenarios
   join `CASCADE_KEYS`; `PAGINATION_KEYS` carries `page-strip-hover` and `page-strip-focus` placed
   with `FRAMES.page` by the journey case that drives them, which moves the specimen to the
   document's start and restores it in `finally` (report deviation 6) — rule whether that move is
   sound; `active` and `disabled` are rest frames under `active-page` and `disabled-page` (report
   deviation 4) — rule whether that satisfies family ruling 10; the frames the report lists were
   written.
5. **The accounting.** `pagination` is in `listed` at its sorted position; § Compatibility gains a
   selector and a variable row; `guides/ledger/departures.md` gains the thirteen `tokenized` rows
   under `#### \`pagination\`` between `offset` and `reboot` (sorted, the file's own order); no
   addition row; no deferral row struck (none names the key); the conformance gate (`17 passed`) is
   UNRESOLVED until the Orchestrator's own run.
6. **The guide.** `### Pagination classes` sits after `### Helper classes` in the `### Table classes`
   voice; the § Files row follows `_icon-link.scss`; the prose follows `writing.md`; no
   `guides/ledger/` path; the only guide content change beyond insertions is the § Files table's
   repadding (report deviation 2).
7. **The patches.** Patch A (the shipped-key Set literal gains `'pagination',` between `offset` and
   `ratio`) and Patch B (`.pagination` shares `padding-left: 0` and `list-style: none` with
   `.list-unstyled, .list-inline` in `_list.scss`; a `list-reset` mixin measured byte-identical at
   `style: 'expanded'`) are each outside the unit's scope as claimed and each measurement
   reproduces; the mixin question is the family design round's (rule nothing on the name).
8. **Scope is honest.** The status lists owned and shared files only; `_list.scss`, `_mixins.scss`,
   `tests/setupServer.test.ts`, the vendored files untouched; no scratch sweep test or scratch copy
   remains; `tests/setup.test.ts` carries the one authorized line rewrite and the literal additions;
   the unit's substitution for the missing design verdict did not diverge from the verdict's ruling
   on its specimens (read `b-passive-design-verdict.md` against the specimens shipped).
9. **Gates.** `format:check`, `lint:check`, `check`, `build:src`, `test:src:styles` (432),
   `test:app` (28), `test:conformance`, `test:guides`, `test:policy` green per the report;
   `test:setup` red on Patch A and Patch B alone; `CAPTURE=1 npm run test:journey` red on the
   pre-existing Button traversal cases with every variant green alone (26 each) and the probe
   showing the case slower without the section than with it; `npm test` not run.
