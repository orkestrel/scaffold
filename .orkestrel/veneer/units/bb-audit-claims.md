# B-PASSIVE-B — audit claims

Subject: the B-PASSIVE-B unit's uncommitted writes in `/home/user/veneer-bb` over `3a9202a`
(`btn-group`, `btn-toolbar`), written by `opus` from
`/home/user/veneer-bb/tmp/units/b-passive-b-brief.md` under the family record
`/home/user/veneer-bb/tmp/units/b-passive-family.md`, the baseline addendum
`b-passive-baseline.md`, and the design `b-passive-design-verdict.md`. Evidence:
`/home/user/scaffold/tmp/audit/bb.diff` (the whole diff, untracked files as additions),
`bb-status.txt`, the report `bb-report.md` (its § Coverage matrix maps every inventory selector),
the frames under `/home/user/veneer-bb/tmp/capture/states/`, the inventory
`/home/user/veneer-bb/tests/fixtures/oracle/inventory.json`, and the release stylesheet
`/home/user/veneer-bb/node_modules/bootstrap/dist/css/bootstrap.css`. Every lane rules each claim
CONFIRMED, BROKEN, or UNRESOLVED with `file:line` evidence; a claim about a proof is ruled on the
mutation named and whether the assertions distinguish it.

1. **The partial.** `src/styles/components/_button-group.scss` opens `@layer components` after
   `@use '../tokens'` and emits every selector the inventory records under `btn-group` and
   `btn-toolbar` except the six the guide keeps deferred (`.btn-toolbar .input-group` to Forms; the
   five `dropdown-toggle-split` forms to Disclosure), each with Bootstrap's declarations byte for
   byte (`var(--bs-border-radius)` and `calc(-1 * var(--bs-border-width))` as recorded, which
   `_tokens.scss` declares over `--vn-radius-base` and `--vn-border-width`); the `:not(.dropdown-toggle)`
   exclusions ship; the barrel line sits at its order position; the report's reading `recorded 38,
   shipped 34, missing []` reproduces.
2. **No ledger row.** The comparison reports no departure and no addition for either key; the
   existing `btn`-attributed rows for `.btn-group-lg > .btn` and `.btn-group-sm > .btn` are
   unchanged — rule whether attributing those two selectors to `btn` rather than `btn-group` is what
   the ladder (most specific shipped key: `btn-group-lg` is not a key; `btn-group` and `btn` are)
   yields, and whether it stays stable when both keys ship.
3. **The proof.** `tests/src/styles/components/button-group.test.ts` reads each shipped selector's
   treatment through the installed cascade readers inside the rendered region, pairs a plain child
   against a `.dropdown-toggle` sibling for the exclusion, reads the wrapping toolbar at a controlled
   width, and reads the check group's ring through `readRing(input, label)`; the report names no
   mutation per case, so each lane names, for three cases of its choosing, the mutation the case
   distinguishes and whether the assertions distinguish it.
4. **The showcase and the registry.** `ButtonGroupSection` renders the specimens the report names
   (check group, horizontal, vertical, nested, small, large, wide toolbar, crowded toolbar) from
   frozen rows with no inline style; `CASCADE_KEYS` gains one rest scenario per specimen;
   `GROUP_KEYS` carries `check-group-checked` and `check-group-focus`; `CaptureState` gains
   `checked` (the baseline addendum names that extension); the journey cases drive the focus and
   place the frames; the four-variant capture wrote the frames the report lists (132 files).
5. **The accounting.** Both keys are in `listed` at sorted positions; § Compatibility gains their
   rows; the 32 `Passive`-owned deferral rows the report lists are struck and the six Forms and
   Disclosure rows stay; `guides/ledger/*` untouched; the conformance gate (`17 passed`) is
   UNRESOLVED until the Orchestrator's own run.
6. **The guide.** The class sections sit in barrel order in the `### Table classes` voice; the
   § Files row names the partial and its proof; the prose follows `writing.md`; no `guides/ledger/`
   path; ignoring whitespace the guide diff is the added rows and sections plus the struck rows.
7. **The blockers and the rewrites.** Blocker 1 (the shipped-key Set literal) and Blocker 3
   (`tests/app/browser/sections/ButtonSection.test.ts` around line 72 excluding `btn-toolbar` as a
   grouping container rather than a variant) are outside the unit's scope as claimed and each patch
   is correct; Blocker 2 (`.btn-toolbar` and `.row` share `display: flex` and `flex-wrap: wrap`) is
   measured correctly and is the family design round's to settle (rule nothing on the mixin name);
   the rewrite of `tests/app/browser/Showcase.test.ts` scoping the `.btn` population to
   `section[aria-label="Buttons"] .btn` preserves the assertion's intent (the Buttons region renders
   exactly `BUTTON_SPECIMENS`) while the whole-host `main` assertion after it still reads every
   button; the reorder of `toggles a native host and an anchor host through the keyboard` (anchor
   first, removing the document wrap: 30816 ms to 5546 ms alone) still drives and asserts both
   hosts, and the case split keeps every assertion.
8. **Scope is honest.** The status lists owned and shared files only; `_grid.scss`, `_mixins.scss`,
   `ButtonSection.test.ts`, `tests/setupServer.test.ts`, the vendored files untouched; `tmp/probe/`
   deleted; `tests/setup.test.ts` carries the one authorized line rewrite and the export literal.
9. **Gates.** `format:check`, `lint:check`, `check`, `build:src`, `test:src:styles` (446),
   `test:conformance`, `test:guides`, `test:policy`, `test:journey` (108 passed) green per the
   report; `CAPTURE=1` per variant green (27 each); `test:setup` red on Blockers 1 and 2 alone;
   `test:app` red on Blocker 3 alone; `npm test` not run.
