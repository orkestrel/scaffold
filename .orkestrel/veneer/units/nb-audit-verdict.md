# Audit verdict — NAVBAR (`nb`), round 1

Subject: `nb.diff`, `nb-status.txt`, `nb-shared.patch`, `nb-offlimits.patch`, `nb-retirement.patch`, and `b-collapse-nb-report.md` over `a658879` in `/home/user/veneer-nb`, against `nb-audit-claims.md`.

## Lanes

- `analyst` on GPT-6 Astra (objective): `nb-audit-objective-verdict.md`, journal `tmp/codex/nb-audit-analyst.jsonl`, thread `01a0cf6a-5034-7fc3-8a75-9514b1f94086`, `VERDICT: FAIL 2, 3, 5, 7, 8; outside the claims: REPORT-COUNTS, INLINE-CASE-TABLES`.
- `reviewer` on Opus 5.5 (subjective): `nb-audit-subjective-verdict.md`, `VERDICT: FAIL 1, 2, 3, 4, 5, 7, 8; outside the claims: none`.
- `checker` on Sonnet (claims 1, 5, 7, 8): `nb-audit-checker-verdict.md`, `VERDICT: PASS`.

## Reconciliation

Claim 1 holds on the delta (every lane) and is BROKEN in the claims file's removal list (the reviewer): the `nav case tables` partition driven by `readDeferrals()` and the base theme case's two toggler-icon assertions are removals the claim did not name. Recorded against the claims file; no carrier.

Claim 2 holds on the cascade (the analyst's in-memory compilation, the mixin emitting the same `.nav` declarations, the ramp's widths, no `.navbar-light` rule, D2 and D3) and is UNRESOLVED on its evidence clause (both lanes): `nb-gates.log.txt` keeps the build's summary line only, so the built-output reading the report states (`navbar-light` absent, each `@media (width>=Npx){.navbar-expand-*` block present) was never retained. The fix round retains that reading as a log.

Claim 3 holds on every retained mutation (both lanes read each log against its assertion) and is UNRESOLVED on the theme runs (both lanes): the theme case red against the `a658879` case and the retirement asset case's red and green pair rest on the report alone. The fix round retains those runs' logs. The reviewer's instrument notes (the mislabelled `nb-mutate.py` and `nb-mutate3.py` edits, the "no-infix at `sm`" wrap of the whole loop, the two padding runs before the red one) are recorded; none changes a result.

Claim 4 is BROKEN (the reviewer), and the given ruling on the class specimen's surface is overruled: the `.card[data-bs-theme="dark"]` wrapper sets `--bs-emphasis-color-rgb` to white, so a plain `.navbar` inside it already paints its brand white and the `navbar-inverted-class` row's reading stays `rgb(255, 255, 255)` with the `.navbar-dark` rule deleted; the specimen photographs the attribute's paint, not the class's. The fix: the class bar carries `data-bs-theme="light"` (`<nav class="navbar navbar-dark" data-bs-theme="light" …>`, the release's documented color-scheme form), so the class paints the white text over the card's dark surface and the brand reads near-black when the rule is gone; the section proof asserts the attribute; the `NAVBAR_SPECIMENS` doc block and the guide's region sentence say why. The attribute specimen keeps its card. `NAVBAR_COPY.paragraph` says "each state set in markup" (the attribute is not a class).

Claim 5 holds on the registry (both lanes) and is UNRESOLVED on the journey evidence (both lanes): no journey log and no census-control log is retained. The fix round retains the journey runs on both variants (with the census reading recorded as red until ACCORDION lands, and the stage-only probe's green) and the frames are the Orchestrator's at the landing.

Claim 6 is CONFIRMED (both lanes; the analyst reproduced the ledger rows and the retirement's simulated state in memory).

Claim 7 is BROKEN (every lane on the nouns): "answer to `--vn-factor-density`", "read `--vn-size-5`", "mixes over `--vn-palette-white-base`", "retunes `--bs-accordion-btn-icon` and …", and the retained pair's opening variables take their nouns; the § Dropdown classes sentence names the tab menu too ("the tab and navbar menu names ship from the nav and navbar partials"; the `.nav-tabs .dropdown-menu` name is recorded under the `dropdown` key and ships from the nav partial), and the same wording is carried into the TOGGLES landing's resolution of that sentence; the literal-inset sentence is split into two.

Claim 8 is BROKEN (both lanes): the partial comment "A link carrying `show` is the toggle of an open menu, and it paints as the current link." restates the script-meaning wording NAV's fix round removed and lacks its noun ("A link carrying the `show` class paints as the current link."); "carry `show`" in the specimen doc block and the setup comment takes "the `show` class"; the `nav-list` mixin comment's "direction" is false for `.nav` (`flex-wrap`), so it reads "and its flex flow"; the setup doc comments' "once each" and "twice" tallies name the unconditional and reduced-motion occurrences instead; the report's "disjoint" claim about the expand classes is false (an element can carry the no-infix and a breakpoint class together) and is dropped, the identical declarations justifying the order; the report's `build:src` row states a reading no log carries; D6, D7, and D8 lack their fields; the card choice and the dropdown cell change are unbounded; REPORT-COUNTS (the tallies the analyst lists) are a report defect the round-2 report must not repeat (the round-1 report is retained as returned).

INLINE-CASE-TABLES (the analyst): the dark class and attribute case matrix declared inline in `navbar.test.ts` moves to `tests/setupStyles.ts` (as `NAVBAR_DARK_SPELLING_CASES`, frozen and documented, bound in the freeze case) under `.claude/rules/tests.md`.

Attacked and held (the reviewer): the D5 names; the `container-fluid` wrappers; the `Navbar opened` name; the guide's B-MODAL pointer; the ledger's mix spacing; the text inset token; the `breakpoint-each` order. The reviewer's referrals: R16 and family ruling 9 are corrected in this session's records (the `xl` bar expands at 1280); the `Navbar expanded` bar's horizontal overflow at 390 and the `Navbar scroll` clamp's absence from the frames are the Orchestrator's capture readings at the landing, recorded there; the NAV precedent's missing nouns ("answer to `--vn-factor-density`" in § Nav classes, "carry `show`" in NAV's doc block) are a CLOSE-OUT sweep carrier, recorded in the plan.

## Carriers

Every finding is carried by `nb-brief-2.md` (the fix round on `opus`, audited by `analyst` on Astra as the objective lane, `reviewer` as the subjective lane, and a checker): the retained readings (claims 2, 3, and 5), the class specimen's surface and the copy (claim 4), the guide nouns and sentences (claim 7), the comments, the mixin comment, the tallies, and the report (claim 8), and the dark-spelling matrix. Claim 1's removal list is recorded against the claims file. The NAV nouns are CLOSE-OUT's.

VERDICT: FAIL 2, 3, 4, 5, 7, 8; outside the claims: REPORT-COUNTS, INLINE-CASE-TABLES — carried by the fix round; claim 1 recorded against the claims file
