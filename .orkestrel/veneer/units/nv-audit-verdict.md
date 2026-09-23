# Audit verdict — NAV (`nv`), round 1 (2026-09-23)

Subject: `nv.diff` against `87ff1d0` in `/home/user/veneer-nv`, `nv-status.txt`, `nv-shared.patch`, the report `b-collapse-nv-report.md`; claims `nv-audit-claims.md`; effective brief `nv-brief-2.md` (successor of `b-collapse-nv-brief.md`). Lanes: the objective lane on `reviewer` on Opus 5.5 (`nv-audit-objective-verdict.md`), substituted for `analyst` on Astra (Codex bench dark on quota, recorded this round); the subjective lane on `reviewer` on Opus 5.5 (`nv-audit-subjective-verdict.md`); `checker` on Sonnet (`nv-audit-checker-verdict.md`); blind on one claims file. The writer was `opus`, whose alias served `claude-opus-5` (ROADMAP § Routing; the report's "Opus 5.5" names the role's engine, which settles the objective lane's and the subjective lane's R-5 referral); both lanes ran on the writer's engine family under the recorded substitution.

| Claim | Objective | Subjective | Checker | Reconciled |
| --- | --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The partial and the cascade | CONFIRMED (the `tokens.$dark` sub-clause vacuous) | CONFIRMED (exhaustiveness referred) | — | CONFIRMED; the claims file named a dark retune that does not exist, a claims-file fault recorded here |
| 3 The cascade proof | BROKEN on the matrix rows | CONFIRMED on substance (R-1) | — | BROKEN: rows name unrun mutations |
| 4 The section and specimens | CONFIRMED | BROKEN (`show` on the item) | — | BROKEN: the `Nav tabs` open-menu markup is not the release's |
| 5 The capture rows | UNRESOLVED (journey) | UNRESOLVED | UNRESOLVED | UNRESOLVED: registry confirmed; the journey is settled at landing |
| 6 The tables and the ledger | BROKEN (partition after DROPDOWN) | UNRESOLVED | UNRESOLVED | BROKEN: the `withheld` predicate reddens once DROPDOWN's `Navbar` rows land |
| 7 The guide content | CONFIRMED (R17 referral) | BROKEN (script-behaviour sentence) | — | BROKEN: one sentence and one partial comment state script behaviour |
| 8 Law and report | CONFIRMED (counts recorded) | BROKEN (one sentence; table cells) | CONFIRMED | BROKEN on the `--bs-nav-link-font-size` sentence; the table cells stand |

## Rulings

- **Claim 3.** The proof holds and the matrix does not. Round 2 adds one executed mutation per row the objective lane names (`.nav-underline .nav-link.active` selector dropped, `.nav-fill .nav-item` rule dropped, `.nav-pills .nav-link` `border-radius` dropped, `.nav-pills .nav-link.active` paint dropped, `.nav-tabs` `border-bottom` dropped), runs them, and rewrites those rows to name the executed mutation and the case that went red. R-1: the logs the report cites are retained under `nv-instruments/` (`mutate-final-1.log.txt`, `mutate-final-2.log.txt`); the second log covers the rows after the cap-killed first run.
- **Claim 4.** The subjective lane's reading stands: `dropdown.js` writes `show` on the toggle and the menu, never on the item. Round 2 renders the open-menu tab as `dropdown.js` leaves it (`nav-item dropdown`; `nav-link dropdown-toggle show` with `aria-expanded="true"`; `dropdown-menu show` with `data-bs-popper="static"`) and gives the `.nav-tabs .nav-item.show .nav-link` rule its own plain tab item, the way the pills and underline specimens carry theirs. The section proof, the docblock, the copy, and the `nav-tabs` frame follow.
- **Claim 5.** The registry content is confirmed by every lane. The journey reading is the landing chain's per-variant regeneration; round 2 runs all four variants in its validation copy as an observation.
- **Claim 6.** The objective lane's finding stands and DROPDOWN lands first. Round 2 bounds `withheld` to the nav key by owner and name (`row.owner === 'Navbar' && row.name.includes('.nav-link')`, the `.input-group` precedent in `tests/setupStyles.test.ts`), and proves it by applying DROPDOWN's seven `Navbar` deferral rows to the validation copy's guide: `npm run test:setup` red before the change, green after. The subjective lane's R-4 (`test:conformance`) is settled by the validation-copy run round 2 records.
- **Claim 7.** The sentence "…which is how the tab whose menu is open reads" and the partial comment repeating it state script behaviour (R17). Round 2 ends the guide sentence at "…in the tabs, pills, and underline forms." and rewrites the comment to "A link whose item carries the `show` class paints as the active one." The objective lane's R17 referral on the Tab and ScrollSpy sentence is ruled permitted: it names an engine obligation, the family form the `plugin` rows take, and claims no shipped behaviour.
- **Claim 8.** The `--bs-nav-link-font-size` sentence takes the subjective lane's form: "The `.nav-link` rule reads `--bs-nav-link-font-size`, and no rule declares it; `--bs-nav-link-font-weight` is declared empty, as the release leaves them". The Compatibility cells with a bare file path keep the sibling rows' form (the `pagination` row), per the CLOSE-GUIDE sweep ruling; one carrier for the whole table is CLOSE-OUT. The counts the objective lane and the subjective lane's F2 record are the report's; round 2's report states none.
- **F1 (objective).** The conformance order-case comment overclaims. Round 2 writes "and the nav partial joins the block at the release's position between the button group and the card".
- **F1 (subjective).** One term for the tab geometry everywhere: "Each tab overlaps the strip's bottom border by one border width, so the active tab's bottom border covers the strip line where the two meet." in the guide, the partial comment, and the proof title.
- **R-2 (subjective).** The Tab `plugin` cell omits the `show` class and the `active` class `tab.js` writes on a dropdown toggle. Round 2 adds them after reading the installed `bootstrap/js/src/tab.js`.
- **`test:policy` timeout.** The landing chain's own run decides it, as ruled for every unit.

## Carriers

Every finding is carried by `nv-brief-3.md` (the fix round on `opus`): claims 3, 4, 6, 7, 8, the objective F1, the subjective F1 and F2, and R-2. Claim 5's journey is the landing's. The `Nav` deferral row DROPDOWN's guide carries is dropped at NAV's landing by the Orchestrator's integration edit (the family's D4 ruling), with the dropdown partition predicate DROPDOWN's round 2 extends now.

VERDICT: FAIL 3, 4, 6, 7, 8; outside the claims: F1 (objective), F1 and F2 (subjective), R-2 — carried by the fix round
