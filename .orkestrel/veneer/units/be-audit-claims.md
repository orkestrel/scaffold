# B-PASSIVE-E — audit claims

Subject: the B-PASSIVE-E unit's uncommitted writes in `/home/user/veneer-be` over `3a9202a`
(`progress`, `spinner`, `placeholder`), written by `opus` from
`/home/user/veneer-be/tmp/units/b-passive-e-brief.md` under the family record
`/home/user/veneer-be/tmp/units/b-passive-family.md`, the baseline addendum
`b-passive-baseline.md`, and the design `b-passive-design-verdict.md` (staged into that worktree
after the unit returned; the unit worked without it, report D1). Evidence:
`/home/user/scaffold/tmp/audit/be.diff` (the whole diff, untracked files as additions),
`be-status.txt`, the report `be-report.md`, the frames under
`/home/user/veneer-be/tmp/capture/states/`, the inventory
`/home/user/veneer-be/tests/fixtures/oracle/inventory.json`, and the release stylesheet
`/home/user/veneer-be/node_modules/bootstrap/dist/css/bootstrap.css`. Every lane rules each claim
CONFIRMED, BROKEN, or UNRESOLVED with `file:line` evidence; a claim about a proof is ruled on the
mutation named and whether the assertions distinguish it.

1. **The partials.** `_progress.scss`, `_spinner.scss`, and `_placeholder.scss` open
   `@layer components` after `@use '../tokens'` and emit every selector, declaration, custom
   property, and keyframe the inventory records under the three keys, less the prefixed mask aliases
   the ledger records as dropped; `.progress-bar-animated` takes `animation: none` under the
   `reduced-motion` mixin, the spinner speed pair `1.5s` under the preference with the animation
   still running, and the placeholder glow and wave gate nothing (family ruling 3, provisional on
   the user's word); the barrel appends the three `@use` lines with `as progress-component`; the
   elements-layer `progress { vertical-align: baseline }` rule is untouched and the class family
   selects no bare `progress`.
2. **Token rulings.** Each value in the report's per-value table (`be-token-table.txt` beside the
   report) is a token the shipped partials already bind or a permitted literal; rule in particular
   whether `--bs-progress-bar-bg: #0d6efd` bound to `var(--vn-palette-blue)` is the right binding
   when the release derives it from `$primary` and the tree's precedent (`_button.scss`, the RANGE
   partial's thumb fill) binds `#0d6efd` to `var(--vn-color-primary-base)`; whether the stripe
   gradient and the wave mask bound to `--vn-palette-white-rgb` and `--vn-palette-black-*` follow
   the same rule; no `--vn-*` token was added.
3. **The proofs.** `tests/src/styles/components/{progress,spinner,placeholder}.test.ts` read the
   token beside the property it drives, the override (written on an ancestor first and shown
   shadowed, then on the component and shown followed), the factor (progress radius), and the mode,
   with durations read from the animation timeline; `PROGRESS_*`, `SPINNER_*`, and `PLACEHOLDER_*`
   case tables are frozen, inventoried, and bound to the inventory in `tests/setupStyles.test.ts`;
   every case's doc comment names the mutation it catches — rule on three cases of your choosing
   whether the named mutation is distinguished.
4. **The showcase and the registry.** `ProgressSection`, `SpinnerSection`, and `PlaceholderSection`
   render the specimens from frozen `*_COPY` and `*_SPECIMENS` rows with no inline style, constructed
   in alphabetical region order; ten scenarios join `CASCADE_KEYS` with their subjects in
   `CaptureSubject`; `Grow spinner` and `Small grow spinner` register no scenario because the resting
   frame is the animation's first step (`scale(0)` at `opacity: 0`, report D6: an empty declared
   region and uniform frames) — rule whether the measurement holds and whether a bordered host is the
   family's call; the `Button placeholder` specimen carries `tabindex="-1"` and `aria-hidden="true"`
   with no `href` (report D10) — rule whether that is Bootstrap's documented shape and right for a
   specimen the section proof reads.
5. **The accounting.** The three keys are in `listed` at sorted positions; § Compatibility gains a
   selector row per key and a variable row for `progress` and `spinner` (`placeholder` records no
   property); the departure rows are the three `placeholder` rows and five `progress` rows the report
   lists, with `-webkit-mask-image` and `-webkit-mask-size` `dropped` (report D8, on the
   `-webkit-backface-visibility` precedent in § Helper classes) — rule whether dropping the prefixed
   mask aliases is sound for the browsers the guide supports; no addition row; the deferral row
   `` `.placeholder.btn::before` `` is struck; the conformance gate is UNRESOLVED until the
   Orchestrator's own run.
6. **The guide.** `### Progress classes`, `### Spinner classes`, `### Placeholder classes` sit in
   barrel order after `### Helper classes` in the `### Table classes` voice; a § Files row per
   partial; a § Showcase paragraph names the regions and the declined grow-spinner frames; § Tests
   stem rows per scenario; the prose follows `writing.md` (no counts, no `should`, sentence-case
   headings); no `guides/ledger/` path; the only removed content in the guide is the struck
   deferral row (report D7, the formatter's repadding).
7. **The deviations.** D2 (the shipped-key Set literal in `tests/setupServer.test.ts`), D3 (the
   shared-block sweep's four overlaps), D4 (`tests/app/browser/Showcase.test.ts` line ~103 comparing
   every `.btn` name against `BUTTON_SPECIMENS`), and D5 (the journey traversal case at 15.9 s with
   the three sections against 10.0 s without, alone on `light-1280`) are each outside the unit's
   scope as claimed, each measurement reproduces from the diff, and each exact patch is correct as
   written (rule on D5's `vite.config.ts` patch: that file is vendored by scaffold, so the budget
   belongs in `configs/app/vite.journey.config.ts`).
8. **Scope is honest.** The status lists owned and shared files only; `_mixins.scss`, `_vr.scss`,
   `_button.scss`, `elements/_figure.scss`, the vendored files, `tests/setup.test.ts` untouched;
   `tmp/probe/` holds no residue of the `tmp/probe/styles` scratch tree; the unit's substitution for
   the missing design verdict (report D1) did not diverge from the verdict's ruling on this unit's
   specimens — read `b-passive-design-verdict.md` ruling 5 against the specimens shipped.
9. **Gates.** `format:check`, `lint:check`, `check`, `build:src`, `test:src:styles` (464 passed),
   `test:conformance`, `test:guides`, `test:policy` green per the report; `test:setup` red on D2
   and D3 alone; `test:app` red on D4 alone with the section proofs green scoped; `test:journey`
   red on D5 and green at `--testTimeout=120000` with `CAPTURE=1`; `npm test` not run.
