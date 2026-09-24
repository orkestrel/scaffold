# PREFLIGHT-HOST (`pl`) audit round 1 — the Orchestrator's verdict

Claims: `pl-audit-claims.md`. Lanes, blind on that one file: the objective lane, `analyst` on GPT-6 Astra
(`pl-audit-objective-verdict.md`); the subjective lane, `reviewer` on Opus 5.5 (`pl-audit-subjective-verdict.md`); the
checker on Sonnet (`pl-audit-checker-verdict.md`). The unit was written by `opus` on Opus 5.5.

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 2 Classification | BROKEN | BROKEN | — | Report defect: the non-root `tab-size` rows are inherited consequences; the comparison holds |
| 3 Comparison | BROKEN | BROKEN | — | BROKEN: coverage and title |
| 4 Emulation | CONFIRMED | CONFIRMED | — | CONFIRMED within the stated bound |
| 5 Mutations | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 Tables and helper | CONFIRMED | BROKEN | — | BROKEN: the inline dimension tuple and its three names |
| 7 Guide | BROKEN | BROKEN | — | BROKEN: three false sentences |
| 8 Law and report | BROKEN | BROKEN | BROKEN | Code law holds; report defects accepted on the record |

- **Claim 3.** The objective lane: the proof reads Veneer's elements layer only inside the reset's movement population,
  so a declared longhand the reset never touches (the `table` `caption-side` in `_table.scss`) goes unasserted. The
  subjective lane: the case title promises every move held to a recorded value, where heights compare by content
  extent, and "under Chromium 153" names a build the case never ran on.
- **Claim 6.** The dimension row type is written inline in two exported declarations, and one slot carries three names.
- **Claim 7.** "Every measured move is a row" excludes no height; "reads the same under both" where the readings differ
  and the verdict is what agrees; the stand-in presented as the build's own defaults.
- **Claim 8.** The report's tallies, "new", tokens without nouns, and lint and check exits absent from their logs are
  accepted on the record by the user's instruction to put implementation first. The service reading predates the lint
  restructure, so the successor re-runs it.

## Referrals

| Referral | Ruling | Carrier |
| --- | --- | --- |
| R1: the guide says the universal rule declares the tab size | Confirmed from `pl-classify.out.txt` | PREFLIGHT-HOST round 2 |
| R2: D45 still says the proof asserts the standalone value differs | Confirmed | The Orchestrator amends D45 in `decisions-round-2.md` |
| R3: the service reading predates the lint restructure | Confirmed | PREFLIGHT-HOST round 2 re-runs it |
| R4: a staged `@layer base.defaults` might leave the control green | Open; settle by a run | PREFLIGHT-HOST round 2 |
| R5: the dimension exemption matches `height` on every tag, and the reset declares `height: auto` on `img` and `video` | Confirmed as unbounded | PREFLIGHT-HOST round 2 |

VERDICT: FAIL 3, 6, 7; outside the claims: none — carried by PREFLIGHT-HOST round 2 (`b-preflight-host-brief-2.md`).
