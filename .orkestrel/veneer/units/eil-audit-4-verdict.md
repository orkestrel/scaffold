# E-ID-LAYOUT audit, round 4 — the Orchestrator's reconciliation (2026-09-25)

Claims: `eil-audit-4-claims.md`. Lanes: the objective lane, `analyst` on GPT-6 Astra (`eil-audit-4-objective-verdict.md`,
thread `01a0d614-5019-7b20-9b7f-d226087e4ed7`), and the subjective lane, `reviewer` on Opus 5.5 (`eil-audit-4-subjective-verdict.md`), blind to each
other. The round was written by `opus` on Opus 5.5.

| Claim | Objective | Subjective | Ruling |
| --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | Held; L1 closed. |
| 2 | CONFIRMED | BROKEN | Broken on the title: the rendered title "ends the figure at the footer edge and starts the next block 16px later inside 'a centered figure'" names the figure twice and places the following block inside the figure, where the fixture mounts it as the figure's sibling. Both lanes agree the height assertion distinguishes the restored flex figure and the paragraph offset does not; that bound stands as recorded. L8. |
| 3 | CONFIRMED | CONFIRMED | Held on the figure height; both lanes bound the flex control to the height reading (subjective referral R1). |
| 4 | CONFIRMED | CONFIRMED | Held; L2 and L3 closed. |
| 5 | CONFIRMED | CONFIRMED | Held. |

| Finding | Source | Ruling | Carrier |
| --- | --- | --- | --- |
| L8: the placement case's title | subjective, claim 2 | Holds; the lane's title verbatim. | E-ID-LAYOUT round 5 (`e-id-layout-brief-5.md`) |
| L9 (F1): the `d-block` captioned-image holder names a flow change that no longer happens and cannot fail apart from the bare holder | subjective | Holds; the lane's replacement holder, a class-chosen flex column. | E-ID-LAYOUT round 5 |
| L10 (R3): `figure.test.ts` cites `calibration-content.md`, a campaign file no Veneer path resolves | subjective referral | Holds; a Veneer test cites no campaign record. | E-ID-LAYOUT round 5 |
| L11 (R2): the mutation script's restore check compares the backup with the copy just made from it, so it cannot fail | subjective referral | Holds for the instrument; the objective lane matched the live diff to the retained diff, which proves the tree restored. Later briefs require the restore check to compare the file's digest before the mutation with its digest after the restore. | The E-ID-LAYOUT round-5 brief's execution step |
| R4: the report names a status path that does not exist | subjective referral | Report prose; the retained status is `eil-4-status.txt`. | Closed at retention |

VERDICT: FAIL 2; outside the claims: L9, L10
