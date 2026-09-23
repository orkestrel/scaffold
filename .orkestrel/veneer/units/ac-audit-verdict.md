# Audit verdict — ACCORDION (`ac`), round 1

Subject: `ac.diff`, `ac-status.txt`, `ac-shared.patch`, and `b-collapse-ac-report.md` over `a658879` in `/home/user/veneer-ac`, against `ac-audit-claims.md`.

## Lanes

- `analyst` on GPT-6 Astra (objective): `ac-audit-objective-verdict.md`, journal `tmp/codex/ac-audit-analyst.jsonl`, thread `01a0cf58-0d71-7c43-be8f-d9b3248d58c8`, `VERDICT: FAIL 3, 7, 8; outside the claims: F-counts`.
- `reviewer` on Opus 5.5 (subjective): `ac-audit-subjective-verdict.md`, `VERDICT: FAIL 3, 7, 8; outside the claims: S1, S2`.
- `checker` on Sonnet (claims 1, 5, 7, 8): `ac-audit-checker-verdict.md`, `VERDICT: FAIL 7; outside the claims: none`.

## Reconciliation

Claims 1, 2, 4, 5, and 6 are CONFIRMED by every lane that ruled them: the analyst compiled the patched stylesheet in memory against the inventory (the theme-key chevron rule included, the dark scope declaring no accordion variable), ran the repository's ledger comparison on that compile with a planted `letter-spacing` control, and confirmed D2's direction (`COMPONENT_DARK_ASSETS` names the variables that leave the theme scope; `BOOTSTRAP_DARK_VARIABLES` keeps naming the upstream ones) and the `AccordionLengthCase` interface's home in the setup module (`FormRangeCase`, `InputGroupCase`, and `FormControlCase` are the precedent). The given rulings on D1, D3, the `1.25rem` literal (ruling 5: every `--vn-size-*` token in the components is a font size, so binding padding to `--vn-size-5` would cross axes), the `color-mix` ring, and the section's placement stand.

Claim 3 is UNRESOLVED (both lanes): the failing-first reading with the empty partial (`29 failed | 1 passed (30)`) has no retained log, and it is the only red evidence for C4's `--bs-accordion-btn-padding-x` and `-padding-y` rows (`padding-y-literal` reddens C15 alone). The fix round retains an executed empty-partial control log and adds a mutation `button-padding-literal` (the button's padding written as `1rem 1.25rem`, the slot reads dropped) logged red on those C4 rows. The reviewer's referral on `built-selectors.mjs` (no retained output) is carried the same way: the fix round retains that reader's output.

Claim 7 is BROKEN (every lane): the token-noun rule fails at the stacking declarations ("lifts to `z-index: 2`" and "`z-index: 3`"), the duration ("resolves to `0s`"), the length and factor ("the release's `1rem`", "rescales with `--vn-factor-density`"), the palette token ("mixes `--vn-palette-blue`"), and the rewritten retained-variables pair's bare variable names. The compliant forms the lanes name: "a `z-index` value of `2`", "a `0s` duration", "the release's `1rem` length", "the `--vn-factor-density` factor", "the `--vn-palette-blue` token", "the `--bs-navbar-toggler-icon-bg` variable", and "the `--bs-form-select-bg-img`, … variables".

Claim 8 is BROKEN (the analyst and the reviewer): the same rule fails in the partial comment ("the release's `1.25rem`, because"), the specimen doc block ("its panel carries `show`", "carries `collapsed`", "through `aria-expanded`", "through `aria-controls`"), and `tests/setupStyles.ts` (bare selectors in a comment and "`source` is"); the report's D1 sentence says every worktree diagnostic is a missing export where `wt-check.log.txt` also carries the implicit-any and untyped-call consequences of those exports (the ruling holds; the sentence names the root cause instead); the report's final application, guide, and policy reruns have no retained log; the `h3` choice's reason argues for `h2` (S1); the report's tallies (the line counts, "both names", "both transitions", "both subjects", "twice each", "one timing failure") are the analyst's F-counts, a report defect the round-2 report must not repeat (the round-1 report is retained as returned).

S1 (the reviewer) is carried: the specimen headers in `ACCORDION_SPECIMENS` and `ACCORDION_MARKUP` become `<h2 class="accordion-header">`, the release's own markup, because the page carries one `h1` and a region has no heading of its own; the partial and every proof read `.accordion-header`, so nothing else moves. S2 (the reviewer) is carried: `Accordion items` becomes `Accordion base` (`accordion-base`, `accordion-base-focus`) across `CaptureSubject`, `CASCADE_KEYS`, `DRIVEN_KEYS`, the journey case, the section proof's name lists, and the doc block, because the family names a plain variant `<Region> base` (`List group base` beside `List group flush`); the brief supplied the name, so the finding is the brief's.

Not carried, ruled here: the `neighbor` and `neighbour` spellings the base already mixes are a CLOSE-OUT sweep, not this unit's; the release's documentation page and the capture portfolio were not in the evidence, and the landing's regeneration is the Orchestrator's reading of the frames.

## Carriers

Every finding is carried by `ac-brief-2.md` (the fix round on `opus`, audited by `analyst` on Astra as the objective lane, `reviewer` as the subjective lane, and a checker): claim 3's evidence, claims 7 and 8, S1, S2, and the report's counts.

VERDICT: FAIL 3, 7, 8; outside the claims: F-counts, S1, S2 — carried by the fix round
