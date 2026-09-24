# AP-TYPE audit round 1 — checker verdict (`checker` on Sonnet)

Confirmed the inline continuity pattern repeats in `font.test.ts`, `type.test.ts`, `mixins.test.ts`, `fieldset.test.ts` — the exact judgment call the report flags.

I have sufficient evidence now for claims 1, 7, 8, 9, and 10.

## Checker verdict — AP-TYPE audit round 1 (claims 1, 7, 8, 9, 10)

**Claim 1 (Scope and gates).** CONFIRMED.
- `apt-status.txt` lists exactly the brief's owned files (`_mixins.scss`, `_type.scss`, `_fieldset.scss`, `_heading.scss`, `_font.scss`, the five owned test files, `tests/src/styles/fixtures/mixins.scss`, `mixins.test.ts`) and shared files (`guides/veneer.md`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`). No off-limits or unowned file appears. `/home/user/scaffold/.orkestrel/veneer/units/apt-status.txt:1-14`.
- `test:src:styles` exit 0, 1439 passed — `apt-instruments/apt-gate-test-src-styles.log.txt:8207-8212`.
- `test:setup` 320 passed on rerun — `apt-instruments/apt-gate-test-setup-2.log.txt:31-36`; first run's 5 failures are hook/test timeouts only (`Hook timed out in 10100ms`, `Test timed out in ...ms`), no assertion failures — `apt-instruments/apt-gate-test-setup.log.txt:33-113`.
- `test:conformance` 26 passed, exit 0 — `apt-instruments/apt-gate-test-conformance-2.log.txt:10-15`.
- `test:guides` 20 passed, exit 0 — `apt-instruments/apt-gate-test-guides-2.log.txt:10-15`.
- `format:check`, `lint:check`, `check` all exit 0 — `apt-instruments/apt-gate-format-check.log.txt:9`, `apt-gate-lint-check.log.txt:5`, `apt-gate-check.log.txt:29`.

**Claim 7 (Failing first).** CONFIRMED.
- Baseline run: "Test Files 5 failed (5) / Tests 34 failed | 39 passed (73)" — `apt-instruments/apt-baseline-proofs.log.txt:115-116`, matching "34 failed of 73 collected" exactly.
- The three named baseline-passing proofs (default legend, `h6` 12px retune, `<h1 class="fs-6">`) are absent from the failing list in the log excerpt read (lines 1-756); `mixins.test.ts` fails to load (`[sass] Undefined mixin`, line 163-176), consistent with the report's explanation. The claim that "each proof that passed on the baseline is one the guard mutation reddens" cannot be fully cross-checked against `apt-mutation-guard.log.txt` in this pass — UNRESOLVED on that sub-clause; the Orchestrator should diff the guard-mutation failing set against this baseline-passing set.

**Claim 8 (Moved pins).** CONFIRMED on the sites read.
- `font.test.ts` and `type.test.ts` use `visitBreakpoint` with explicit numeric widths (1280, 1401, 1199/1200/390 via `FLUID_WIDTHS`) rather than the project default (414) — `/home/user/veneer-apt/tests/src/styles/utilities/font.test.ts:38,65,95,230,303,340`. Expectations are exact numeric `toBeCloseTo`/`toBe` values, not ranges, per `apt-instruments/apt-baseline-proofs.log.txt` assertion text (e.g., line 524, 650). No deleted pin found in the sites read.

**Claim 9 (Guide).** CONFIRMED.
- The Additions-table rows for `h5`, `h6`, `.h5`, `.h6`, `.fs-5`, `.fs-6` font-size caps at `@media (width >= 1200px)` exist exactly as claimed — `apt-shared.patch:441-442,450,452-454`.
- The font prose states the rule and the 1.25rem floor, matching `computeFluidSize`'s floor (`1.125 * root` at root 16 = 1.25rem) and the 1200px boundary — `apt-shared.patch:14-22` vs `apt-shared.patch:588-591`.
- The departure-bullet prose is present and reads "The size classes follow the release's rule over Veneer's heading scale" — `apt-shared.patch:37`. No banned term (`.claude/rules/writing.md` substitution table) and no count of a growing population found in the new prose read.
- `test:conformance` (the gate that checks ledger rows against the compiled cascade) passed at 26/26 — `apt-instruments/apt-gate-test-conformance-2.log.txt:10-15` — corroborating "every changed ledger row equals the conformance gate's reading," though the checker did not itself re-run the conformance diff cell-by-cell; the gate-pass evidence is accepted, not an independent recomputation.

**Claim 10 (Law).** PARTIALLY CONFIRMED / one REFERRAL.
- No `any`, `as <Type>` assertion, non-null assertion (`!.`/`!;`/`!)`), `@ts-*` suppression, or `eslint-disable` found in `apt.diff` — grep of the diff for these tokens returned only prose occurrences of the English word "as" inside comments (e.g. `apt.diff:21,96,149,222,447,614`), never a type assertion. CONFIRMED.
- No new top-level `function` or module-scope arrow-function declaration found in the diff via the pattern searched. CONFIRMED on the sites read (searched `apt.diff` only; did not separately re-diff `tests/setupStyles.ts` module scope beyond the shared-patch excerpt read, which shows only the exported `computeFluidSize` function and frozen constant tables — no hidden helper).
- Test titles read (`computes the size the responsive font size rule resolves at each viewport width`, `resolves the size class of the 'h1' level to the size its heading class resolves at each journey viewport`, etc.) are named for what they prove, not for a control identifier. CONFIRMED on the sites read.
- **REFERRAL**: the sub-clause "the inline 1199-to-1200 continuity check … is either acceptable repetition or a duplication the consolidation law requires to move to one shared helper" is a design judgment about `.claude/rules/quality.md`'s consolidation law, not a mechanical fact. Confirmed the duplication itself exists verbatim-pattern in four files: `tests/src/styles/utilities/font.test.ts:81`, `tests/src/styles/components/type.test.ts:132,135`, `tests/src/styles/mixins.test.ts:266`, `tests/src/styles/elements/fieldset.test.ts:44`. Whether this crosses the consolidation threshold is referred to the subjective lane (`reviewer`)/Orchestrator, not ruled here.
- Sass and TypeScript naming against `.claude/rules/names.md`/`styles.md` (`fluid`, `font-size` mixin, `heading-size` retained) were not independently re-derived against the full rule text in this pass beyond what the report asserts; treat that portion as UNRESOLVED pending a direct rule-by-rule read, which this pass did not complete given scope.

**Findings outside the named claims:** none found (BROKEN standard: none).

**Counts the report states, listed:** `test:src:styles` 1439 passed (115 files); `test:setup` 320 passed (rerun); `test:conformance` 26 passed; `test:guides` 20 passed; baseline 34 failed / 39 passed of 73 collected; mutation counts 3, 2, 38, 40, 40, 10, 11 failed respectively; proofs log 119 passed.

VERDICT: FAIL 10; outside the claims: none
