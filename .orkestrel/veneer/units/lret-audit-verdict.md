# LEDGER-RETUNE audit — verdict

The Orchestrator's reconciliation of the audit round over LEDGER-RETUNE, on one claims file (`lret-audit-claims.md`): the
objective lane, `analyst` on GPT-6 Astra (`lret-audit-objective-verdict.md`, thread
`01a0d78c-26c5-7620-a7d8-74fc62b8e0c2`); the subjective lane, `reviewer` on Opus 5.5 (`lret-audit-subjective-verdict.md`);
and `checker` on Sonnet for guide-row parity (`lret-audit-checker-lane.md`). The lanes ran blind to each other. The writer
was `opus` on Opus 5.5, so the objective lane ran on an engine that did not write the work.

**Verdict: FAIL 2, 4, 6, 7, 9; outside the claims: F1, F2, R1, R3.** The classifier's order, the union and the rows,
the witness predicate, the API split, the timing budget, and the scope hold. Round 2 carries every finding below
(`ledger-retune-brief-2.md`).

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Resolution decides | CONFIRMED | CONFIRMED | — | CONFIRMED, with R1 |
| 2 The resolver is faithful | BROKEN | UNRESOLVED | — | BROKEN |
| 3 The union and the rows | CONFIRMED | CONFIRMED | PASS | CONFIRMED |
| 4 Canonical values | BROKEN | UNRESOLVED | — | BROKEN |
| 5 Witnesses | CONFIRMED | CONFIRMED | — | CONFIRMED; claim 4 names what it does not replace |
| 6 The proofs | BROKEN | UNRESOLVED | — | BROKEN |
| 7 The API shape | CONFIRMED | BROKEN | — | BROKEN |
| 8 Timing | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 9 The guide | BROKEN | BROKEN | — | BROKEN |
| 10 Scope and gates | CONFIRMED | CONFIRMED | — | CONFIRMED |

- **Claim 2, both lanes.** The resolver's construction loses information that decides a pair:
  - `normalizeResolvedColors` rewrites a color inside a string or a URL, so two `content` values that display different
    text compare equal (objective, executed).
  - `matchesDarkScope` reads a sibling combinator's compound as an ancestor, so `[data-bs-theme=dark] + .btn` resolves
    in dark mode (objective, executed).
  - `collectContextElements` reduces `#sample` and `:where(button.page-link)` to an unqualified `div`, so a variable
    declared on those selectors is not read at its site (objective, executed).
  - The neutral host's context (a 16px font size, a 1000px containing block, no inherited color) can invent or hide a
    difference for a value that depends on context: `em`, a percentage, `inherit`, `currentColor`, and
    `-webkit-match-parent` against `inherit` on the `reboot` `th` `text-align` row (objective, by construction;
    subjective R2).
- **Claim 4, objective (executed) and subjective R3.** `scanCanonicalValues` never compares a mode-independent declaration
  inside the dark scope, so `.btn { --vn-text-body-base: red }` is not compared against the dark cell; two empty
  readings (`inherit`, `initial`) compare equal where the retired case compared their written text; and a compensating
  alias keeps a witness while the canonical token moves, which the retired retained-length case caught by comparing the
  token with the release value directly.
- **Claim 6, both lanes.** `lret-mutations.sh` filters every failure message out of its logs, so no mutation log meets
  the kill standard; no mutation is paired with any `describe('cascade ledger')` case; the probe-syntax case's inputs
  cannot distinguish a removed redundant syntax; and the context-element case has no mutation.
- **Claim 7, subjective.** `ContextElement.sibling` is a boolean named with a noun; `.claude/rules/names.md` requires an
  assertion.
- **Claim 9, both lanes.** § Reference map says colors compare as 8-bit channels whatever the notation, which is false
  for `oklch()` and `color(display-p3 …)`; § Outside the ledger says every canonical declaration is resolved against its
  cell, which claim 4 falsifies; the legend says a witness establishes that a token keeps the release value, which the
  compensating alias falsifies; § Outside the ledger's introduction lists its items in an order its paragraphs do not
  follow; and the rule for a site the release writes twice gives only the vendor-prefix example, so the `pre` and `kbd`
  `font-size` rows (`1em` to `87.5%`, `restated`) read false on first read.

## Findings outside the claims

- **F1 (subjective), accepted.** `normalizeDeclaration` in `tests/setupStyles.ts` has no consumer left, and the § Reference
  map sentence it proved (`150ms` against `0.15s`, `15%` against `15.0%`, `16%` apart) now names the resolver with no
  resolver case behind it. Round 2 retires the helper, its cases, and its export row, and adds the resolver case. The
  unit owned `tests/setupStyles.ts`, so round 2 carries it.
- **F2 (subjective), accepted.** The `reboot` `th` `text-align` row reads `retuned` for two keywords that align a header
  alike in a document whose header shares its row's direction. Round 2 rules the row through claim 2's context work; if it
  still reads `retuned`, the legend states that `retuned` compares computed values and names this row.
- **R1 (subjective referral), accepted.** The conformance `beforeAll` reads the repaint ledgers' `departures` and never
  their `undecided`, so a repaint pair the resolver cannot decide disappears; round 2 asserts both repaint `undecided`
  lists empty.
- **R3 (subjective referral), accepted as part of claim 4.**
- **R4 (subjective referral), the Orchestrator's error.** The subjective brief cited "E32 the claims file names", a field
  carried over from the MODAL brief it was derived from; the claims file names the ledger-values verdict. No ruling
  rested on it.
- **Non-blocking case notes (subjective, claim 6).** The text-only case's `dropped` row, the retuned case's uncommented
  `restated` control, the context-element case's unnamed `matchesDarkScope` proof, and the witness fixture's
  `--vn-gray-3000` and `var(--vn-container-sm)` rows. Carried by round 2, Item 8.

## Carriers

Every finding in this verdict is carried by `ledger-retune-brief-2.md`: claim 2 by Item 1, claim 4 and R3 by Item 2,
R1 by Item 3, claim 7 by Item 4, F1 by Item 5, claim 6 by Item 6, claim 9 and F2 by Item 7, and the non-blocking case
notes by Item 8. R4 needs no carrier, because no ruling rested on it.
