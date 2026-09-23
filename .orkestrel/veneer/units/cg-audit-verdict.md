# Audit verdict — CLOSE-GUIDE (`cg`), round 1 (2026-09-23)

Subject: `cg.diff` against `88684bc` in `/home/user/veneer-cg`, `cg-status.txt`, the report `close-guide-report.md`, and the ledger `close-guide-sweep.md`; claims `cg-audit-claims.md`; effective brief `close-guide-brief-2.md` (successor of `close-guide-brief.md` after the user's turn interrupt killed the first run). Lanes: the objective lane on `reviewer` on Opus 5.5 (`cg-audit-objective-verdict.md`), substituted for `analyst` on Astra because the Codex bench is dark on quota (ROADMAP § Standing conditions, 2026-09-23 13:34 UTC); the subjective lane on `reviewer` on Opus 5.5 (`cg-audit-subjective-verdict.md`); `checker` on Sonnet (`cg-audit-checker-verdict.md`). The lanes ran blind on one claims file. The writer was `opus` on Opus 5; both lanes ran on the writer's engine under the recorded substitution.

| Claim | Objective | Subjective | Checker | Reconciled |
| --- | --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED; the gate clause UNRESOLVED | CONFIRMED on the record. The gate clause is the verifier chain's, not a reading lane's: claims-file fault, recorded. |
| 2 § Showcase | CONFIRMED | CONFIRMED; referrals (a) and (b) | — | CONFIRMED. (a) and (b) fixed at integration (see the integration rulings). |
| 3 § Customization | CONFIRMED | CONFIRMED; F1 | — | CONFIRMED. F1 fixed at integration. |
| 4 The barrel | CONFIRMED (precision note: `Bootstrap source order` is a `describe` block whose single case pins the order) | CONFIRMED | — | CONFIRMED. The guide's "case" wording stays; the link reaches the block. |
| 5 § Tests | CONFIRMED | CONFIRMED; referral (e) | — | CONFIRMED. (e) dropped on the record: a `Frame` cell is prose, and the registry carries no frame field a gate could compare it against. |
| 6 § Styles fragment | CONFIRMED | CONFIRMED | — | CONFIRMED. |
| 7 The sweep | CONFIRMED, with ledger-label notes | CONFIRMED on substance; referral (c) | UNRESOLVED (sampled, no full rerun) | CONFIRMED. The Orchestrator reran the unit's sweep instrument over the worktree guide (195 hits, one unruled hit permitted by the ledger, no prose link without `see`; `cg-orchestrator-sweep.json`), which settles the population the checker could not rerun. The ledger labels outside R7's set (rows 202, 532, 534 "permitted as a CSS declaration"; row 265 "permitted as a table cell" on a prose hit; row 135 `[multiple]` ruled then edited away) are faults of the retained ledger, recorded here; no guide change follows. Claims-file fault: claim 7 asked a read-only lane for a full rerun. |
| 8 Law, gates, report | BROKEN: two code tokens with no noun (`guides/veneer.md:835` `_tokens.scss`; `:284` `li`, `ol`, `ul`) | CONFIRMED; F2 | CONFIRMED; the gate exits UNRESOLVED | BROKEN, fixed at integration (both lines). The gate exits are the verifier chain's. |

Findings outside the claims: F1 (§ Customization names a range-thumb reading that § Form range classes says has no resolved reading) and F2 (§ Departures calls a departure kind a "value"), both from the subjective lane; both fixed at integration.

Referrals: (a) the order rule's "one per section" is ambiguous — fixed at integration by dropping the phrase; (b) the Form label region's specimen paragraph had two homes — fixed at integration by moving it to § Form label classes in the Close pattern; (c) ledger labels — recorded against the retained ledger, see claim 7; (d) every gate exit rests on the writer's report — the verifier chain (`verify-cg.sh`: refresh, regeneration, and the main-branch gates) takes the executed runs at landing; (e) dropped, see claim 5; (f) the recipe case title over-claimed its population — fixed at integration (the case is now `holds the palette paints it reads through the brand retune and moves each with the palette entry`); (g) dispatch and retention — the brief's terrain citation (§ 4 for the driven-key lists; §§ 1, 2, 3, 5, and 7 applied) is a dispatch fault, recorded; the retained report's launch paths are rewritten to the retained names; the unit's instruments (`sweep.py`, `rule.py`, `classify.py`, `ledger.py`, `split.awk`, `reflow.py`, `rep.py`) are retained under `cg-instruments/`, and its baseline copy `base.md` is the guide at `88684bc` (`git show 88684bc:guides/veneer.md`), not retained.

## Integration rulings

The Orchestrator applied the exact returned text as one integration edit in `/home/user/veneer-cg` through `cg-integration.py` (anchor-refusing), captured as `cg-integration.diff` (the edit alone) and `cg-2.diff` (the whole worktree against `88684bc`, with `cg-2-status.txt`). The edit carries no new type, mechanism, behaviour, or acceptance criterion; a `checker` on Sonnet verifies it before the landing (`cg-landing-checker-brief.md`, `cg-landing-checker-verdict.md`).

- Claim 8b: "such as the `li` element under the `ol` and `ul` elements." (the paragraph rewrapped at 100 columns).
- Claim 8a: "the `_tokens.scss` partial already declares each of those".
- F1: "the range thumb's declared paint resolved on a stand-in element because Chromium withholds the part's computed style".
- F2: "a `tokenized` row routes the release value through a Veneer token, an `aliased` row reads another compatibility variable in its place, a `fallback` row keeps the release value behind a `var()` fallback, a `dropped` row writes no declaration at all, and a `declared` row writes the value in a form or at a value the other members do not name."
- (a): "After the Showcase region, the regions render in the order the `Showcase` class constructs them; see [showcase mounting and destruction](../tests/app/browser/Showcase.test.ts), which pins that order."
- (b): the § Showcase paragraph beginning "The Form label region carries" is removed, and § Form label classes gains "The showcase's Form label region carries a label above its control with the help text the control names as its description, and a horizontal label level with the control beside it at each size and as the legend of a group." before its proof paragraph.
- (f): the case title in `tests/src/styles/integration.test.ts` reads "holds the palette paints it reads through the brand retune and moves each with the palette entry".

Round deviations: the subjective lane and the objective lane both ran on Opus 5.5 under the recorded bench-dark substitution; no lane was skipped.

VERDICT: FAIL 8; outside the claims: F1, F2 — every finding closed by the integration edit, pending the landing checker and the verifier chain
