# Audit verdict — DROPDOWN (`dd`), round 1 (2026-09-23)

Subject: `dd.diff` against `87ff1d0` in `/home/user/veneer-dd`, `dd-status.txt`, `dd-shared.patch`, `dd-shared-post-bpo.patch`, the report `b-collapse-dd-report.md`; claims `dd-audit-claims.md`; effective brief `dd-brief-2.md` (successor of `b-collapse-dd-brief.md`). Lanes: the objective lane on `reviewer` on Opus 5.5 (`dd-audit-objective-verdict.md`), substituted for `analyst` on Astra (Codex bench dark on quota, recorded this round); the subjective lane on `reviewer` on Opus 5.5 (`dd-audit-subjective-verdict.md`); `checker` on Sonnet (`dd-audit-checker-verdict.md`); blind on one claims file. The writer was `opus`, whose alias served `claude-opus-5`; both lanes ran on the writer's engine family under the recorded substitution.

| Claim | Objective | Subjective | Checker | Reconciled |
| --- | --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The partial | CONFIRMED (built cascade read in `g2-8.log.txt`) | UNRESOLVED (built cascade) | — | CONFIRMED; the objective lane's built-cascade reading settles the subjective lane's open item |
| 3 The cascade proof | BROKEN | BROKEN | — | BROKEN: the named mutations never ran |
| 4 The section and specimens | BROKEN (no viewport) | NOT-EVIDENCED (no viewport) | — | BROKEN: the containment case runs at the runner's default width only |
| 5 The capture rows | UNRESOLVED | UNRESOLVED | BROKEN (journey clause) | UNRESOLVED: rows confirmed; the journey is settled at landing |
| 6 The tables and the ledger | BROKEN (partition predicate) | UNRESOLVED | BROKEN (the `Nav` row still live) | BROKEN on the predicate; the `Nav` row stays until NAV lands |
| 7 The guide content | BROKEN | BROKEN | — | BROKEN: the plugin cell's close, the § Tests links, the R8 sentence |
| 8 Law and report | BROKEN (three token nouns) | UNRESOLVED (replica 2 results) | CONFIRMED | BROKEN on the token nouns; replica 2's results are in `g2-*.log.txt` |

## Rulings

- **Claim 3.** Round 2 adds the mutations the objective lane names to the instrument and runs each: `centering-added`, `active-rule-dropped`, `disabled-rule-dropped`, `header-rule-dropped`, `divider-rule-dropped`, `item-text-rule-dropped`, `position-swapped`, and `sm-end-boundary` (moving `.dropdown-menu-sm-end` alone). The report's table names the case each one reddens.
- **Claim 4.** Round 2 wraps the containment measurement in `visitBreakpoint(390, …)` and `visitBreakpoint(1280, …)` and keeps the `room-dropped` mutation red at both widths.
- **Claim 5.** The rows are confirmed. The journey reading is the landing chain's per-variant regeneration; round 2 runs all four variants in its validation copy as an observation.
- **Claim 6.** The objective lane's ordering constraint stands: the `Nav` deferral row can drop only after `_nav.scss` lands, and DROPDOWN lands first. So the row stays in DROPDOWN's patch, round 2 extends the partition predicate with `|| selector.startsWith('.nav-tabs')` now (inert while the row withholds the selector, proved by the validation copy), and NAV's landing drops the row. The subjective lane's referral on the three `declared` caret-site ledger rows is settled by the bidirectional ledger gate both replicas ran green: the rows are the gate's own measurement.
- **Claim 7.** The plugin cell ends "Owner: J-ENGINE.". The § Tests hunk adds `[the dropdown classes](../tests/src/styles/components/dropdown.test.ts)` in the style-proof list and `[dropdown specimens](../tests/app/browser/sections/DropdownSection.test.ts)` in the application-proof list, each in alphabetical position. The R8 sentence takes NAV's wording verbatim, "A `plugin` row records a behavior J-ENGINE owns, while the classes that behavior sets ship in the cascade and render in markup.", and the COLLAPSE and NAV patches drop theirs at integration because DROPDOWN lands first. The `.dropdown-menu-end` sentence gains its `data-bs-popper` condition. The placement-attribute sentence is ruled permitted under R17: it describes the attribute's origin and claims no Veneer behaviour.
- **Claim 8.** "the `raised` flag", "the `source` field", "through its `aria-label` attribute". The counts the lanes record are the report's; round 2's report states none.
- **F1 (objective).** The `it.each(TEXT_MODES)` case's light instance cannot fail. Round 2 runs the case over the dark mode alone and names it for what it proves.
- **F1 (subjective).** The copy reads "a menu shown below, above, and beside its toggle, and from each centered wrapper" and adds "Hover or focus an item to compare its states."
- **F2 (subjective).** `$centered` becomes `raised` with one polarity (`true` means the caret sits above the baseline, `vertical-align: 0.255em`), with the header comment "whether the caret sits above the baseline rather than on it".
- **The patch base.** The guide hunks are stale against the head after CLOSE-GUIDE and B-PASSIVE-ORDER-GUIDE moved the sections, the same finding COLLAPSE's round 2 carried. Round 2 regenerates one patch against `c3ac297` in the post-BPO form.

## Carriers

Every finding is carried by `dd-brief-3.md` (the fix round on `opus`): claims 3, 4, 6, 7, 8, the objective F1, and the subjective F1, F2, and F3. Claim 5's journey is the landing's. The `Nav` row drop is NAV's landing.

VERDICT: FAIL 3, 4, 6, 7, 8; outside the claims: F1 (objective), F1, F2, and F3 (subjective) — carried by the fix round
