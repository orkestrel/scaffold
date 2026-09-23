# Audit verdict — NAVBAR (`nb`), round 2 (the fix round)

Subject: the round-2 claims in `nb-audit-2-claims.md` over the worktree `/home/user/veneer-nb` (the owned files over `a658879`), `nb-2.diff`, `nb-2-status.txt`, `nb-shared-2.patch`, `nb-offlimits-2.patch`, `nb-retirement-2.patch`, `b-collapse-nb-report-2.md`, and `nb-instruments-2/`. The unit was written by `opus` on Opus 5.5.

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (`codex-queue-17.sh`) | `nb-audit-2-objective-verdict.md` | `FAIL 1, 5, 8; outside the claims: INLINE-CASE-TABLES, REPORT-COUNTS` |
| Subjective | `reviewer` on Opus 5.5 | `nb-audit-2-subjective-verdict.md` | `FAIL 1, 5, 7, 8; outside the claims: MODE-SCHEME, TOKENS-ICONS-HEADER, LENGTH-SENTENCE, NAV-HALF, REPORT-COUNTS, INLINE-LOOPS` |
| Checker | `checker` on Sonnet | `nb-audit-2-checker-verdict.md` | `FAIL 1, 2, 7; outside the claims: inline-loop classification` |

Every lane ran on the one claims file, blind. The checker's and the reviewer's command sub-clauses are settled in `nb-audit-2-settling.txt`.

## Reconciliation

1. **Delta and scope: CONFIRMED, with the claim corrected.** Every file-set clause holds in every lane; the shared and off-limits patches apply (exit 0) and their index bases equal the `a658879` blobs (the objective lane and the settling readings). The objective lane breaks the claim's own wording, rightly: the retirement patch's base is the simulated post-ACCORDION state (D6), so its index bases are not `a658879` blobs, and the off-limits patch adds the mixin invocation to NAV's partial under the D2 ruling. Both are defects of the claim, not of the unit; the claim is corrected in the round-3 claims.
2. **The retained readings: CONFIRMED** in every lane (the checker's unopened logs were read by the other lanes).
3. **The class specimen's surface: CONFIRMED** in every lane; the settling run and the section assertions distinguish the mutations. The reason sentences' term is ruled under MODE-SCHEME.
4. **The copy and the titles: CONFIRMED.**
5. **The guide, the comments, and the doc blocks: BROKEN, carried.** Every named rewrite is present. The token-noun clause fails at the same sites in both lanes: "records `.nav-link`", "`.card-header-tabs .nav-link.active` is recorded", "records `.navbar-toggler`" (the `NAV_SELECTORS` and `NAVBAR_SELECTORS` doc comments), and the reviewer's two `{@link NAVBAR_MARKUP}` sites without the noun "constant". Carried to round 3.
6. **The dark-spelling matrix: CONFIRMED** in every lane; every control distinguishes its mutation, and the browser proof's independence from row order is recorded honestly.
7. **The proof matrix and the gates: CONFIRMED.** Every mutation is distinguished by a named assertion (the objective lane's table); the outside stop is recorded at `mutations.log.txt:10`; the worktree's `check` exits 2 on owned-file diagnostics alone (the settling reading).
8. **Law and report: BROKEN, record-only.** The code-law checks hold in every lane. The report states counts ("two sentences", "both inverted specimens", "Three of my runs", "both variants"), leaves bare tokens, omits an Evidence field in D4 and D5, and abbreviates the retirement commands. The round-3 report is written under the rule; the round-2 report stays as audited.

## Findings outside the claims, ruled

- **INLINE-CASE-TABLES / INLINE-LOOPS** (both lanes): the consumer tuples inside the dark-spelling case, the `[viewport, expanded]` tuples, and the `[selector, moves]` tuples are static case matrices that `.claude/rules/tests.md` places in a setup file at any size. Carried to round 3 as three frozen, documented tables. The reviewer's referral that the same shape sits in landed `nav.test.ts` and `input-group.test.ts` is CLOSE-OUT's carrier, recorded in the plan.
- **MODE-SCHEME** (reviewer): "scheme" names a concept the guide calls a mode and a light island; the round-1 prescription that introduced it was wrong. Carried to round 3 with the reviewer's replacement text.
- **TOKENS-ICONS-HEADER** (reviewer): the `$icons` comment calls the toggler icon one value across the modes while the same block and the partial give it a dark value. Carried.
- **LENGTH-SENTENCE** and **NAV-HALF** (reviewer): carried with the replacement text.
- **REPORT-COUNTS** (both lanes): record-only; the round-3 report states none.

## Carriers

Every carried finding is an item of `nb-brief-3.md` (`builder` on Sonnet). The off-limits and retirement patches carry no finding and return unchanged.

VERDICT: FAIL 5, 8; outside the claims: INLINE-CASE-TABLES, MODE-SCHEME, TOKENS-ICONS-HEADER, LENGTH-SENTENCE, NAV-HALF, REPORT-COUNTS
