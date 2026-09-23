# Audit verdict — UTIL-SPACER (`us`), round 2 (2026-09-23)

Subject: `us-2.diff` against `87ff1d0` in `/home/user/veneer-us`, `us-2-status.txt`, `us-shared-2.patch`, the report `b-utilities-us-report-2.md`; claims `us-audit-2-claims.md`; effective brief `us-brief-3.md`. Lanes: the objective lane on `reviewer` on Opus 5.5 (`us-audit-2-objective-verdict.md`), substituted for `analyst` on Astra (Codex bench dark on quota, recorded this round); the subjective lane on `reviewer` on Opus 5.5 (`us-audit-2-subjective-verdict.md`); `checker` on Sonnet (`us-audit-2-checker-verdict.md`, claims 1, 4, 6, 7); blind on one claims file. The writer was `opus` on the same engine family under the recorded substitution. The unit's run logs, which the claims file wrongly called unretained (a claims-file fault), sit under `us-instruments/logs/` from this reconciliation, with the built cascades under `us-instruments/built/`.

| Claim | Objective | Subjective | Checker | Reconciled |
| --- | --- | --- | --- | --- |
| 1 Delta and scope | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The `$state` mechanism | CONFIRMED (executed logs) | CONFIRMED (derived) | — | CONFIRMED |
| 3 The classless infix | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 The built cascade unchanged | UNRESOLVED | UNRESOLVED | UNRESOLVED | CONFIRMED by the Orchestrator's run: `us-instruments/logs/orchestrator-digests.txt` reads `df76aab7…ed765` for the worktree's `dist/src/styles/index.css`, for `round1-built-index.css`, and for `round1-index.css`; `orchestrator-compare.txt` prints no missing or changed baseline rule |
| 5 Specimens and the Layout proof | CONFIRMED (executed logs) | CONFIRMED (the deviation is the right call) | — | CONFIRMED; the `col-12` wrap deviation is accepted |
| 6 Service proofs and the patch | CONFIRMED (control logs) | CONFIRMED | UNRESOLVED (controls) | CONFIRMED; the checker's open runs are the retained control logs |
| 7 Law and report | BROKEN (counts) | BROKEN (counts) | BROKEN (counts; the § Tailwind deviation) | BROKEN on the report's counts, retained as returned; the "§ Tailwind rewording" deviation clause was a claims-file fault |

## Rulings

- **M1 and SC1 (the § Styles mixin-contract paragraph).** False at this landing: `_gap.scss` writes the gutter classes by hand and `_link.scss` writes `css-var` utilities and an important offset by hand. The replacement is the objective lane's mechanism-only wording with the subjective lane's gutter sentence: "The `utility` mixin in the `src/styles/_mixins.scss` file writes a utility key's classes, and the `utility-variable` mixin writes a utility entry whose value is a `--bs-*` custom property alone, as a release `css-var` utility is. The `src/styles/utilities/_gap.scss` partial writes its gap keys through the `utility` mixin; its gutter classes are the release's grid classes rather than utility entries, and stay hand-written with normal declarations." The universal clause is deleted. Carrier: the round-3 regeneration (`us-brief-4.md`, decision 3a as corrected mid-flight).
- **SC2 (the ambiguous `it`).** The subjective lane's wording. Carrier: round 3 (decision 3b).
- **M2 (counts in shipped prose).** The guide's "two longhands" sentence takes the objective lane's wording (carrier: round 3, decision 3d); the `LayoutSection.test.ts` comments take "lays a plain item and its neighbor out" and "The leading item and its neighbor" (carrier: the landing's integration edit on the owned file, verified by the landing checker).
- **SC3 (the header comment "a second class").** The guide's wording, "adds a class after the base class". Carrier: the landing's integration edit on `src/styles/_mixins.scss`.
- **R-A (the `gap-0` step's touching items).** A zero step renders no gap; the `gap-steps` frames at 390 and 1280 are read at the landing's capture regeneration as an observation, not a defect.
- **R-B (the family record and R4).** Settled at this reconciliation: `b-utilities-family.md` ruling 2 carries the landed signatures with `$state`, the classless infix, and UTIL-TEXT's and UTIL-PAINT's consumers; `b-utilities-design-verdict.md` R4 carries a dated amendment.
- **R-C (the round-3 brief).** The "§ Guide text" reference was a brief fault, corrected mid-flight; the conformance order case merges into the existing helper-order case at `c3ac297` (decision 2); the fragment the round-2 report called orphaned does not exist at the head (the paragraph beginning "Every Bootstrap utility Veneer ships carries the `!important`" reads whole at `c3ac297`), so no carrier is owed.
- **R-a (`tests/setupServer.test.ts`).** The brief binds: the file is report-only for every unit (its dash-proof list gains each unit's keys); `b-utilities-family.md` ruling 12 is corrected.
- **R-b and R-D.** The logs are retained; claim 4 is settled by the Orchestrator's own run, recorded in the table.
- **Claim 7.** The report's counts stand on the record; round 3's report states none.

## Carriers

Round 3 (`us-brief-4.md` with the mid-flight decisions 2, 3a, 3b, and 3d) carries M1/SC1, SC2, and the guide half of M2 inside the regenerated patch; the landing's integration edits carry SC3 and the comment half of M2, with a landing checker on the exact texts; the family record and the design verdict carry R-B and R-a as amended here; the capture regeneration carries R-A as an observation.

VERDICT: FAIL 7; outside the claims: M1/SC1, SC2, SC3, M2 — carried by round 3 and the landing's integration edits
