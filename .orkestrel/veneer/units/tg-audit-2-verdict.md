# Audit verdict — TOGGLES (`tg`), round 2 (the fix round)

Subject: the round-2 claims in `tg-audit-2-claims.md` over the worktree `/home/user/veneer-tg` (the owned files over `a658879`), `tg-2.diff`, `tg-2-status.txt`, `tg-shared-2.patch`, `b-collapse-tg-report-2.md`, and `tg-instruments-2/`. The unit was written by `opus` on Opus 5.5.

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (thread `01a0cf83-a371-7051-8691-c664b8aa7efa`, `codex-queue-14.sh`) | `tg-audit-2-objective-verdict.md` | `FAIL 3, 7; outside the claims: REPORT-COUNTS` |
| Subjective | `reviewer` on Opus 5.5 | `tg-audit-2-subjective-verdict.md` | `FAIL 1, 6, 7; outside the claims: caret-side-name` |
| Checker | `checker` on Sonnet | `tg-audit-2-checker-verdict.md` | `FAIL 1; outside the claims: none` |

Every lane ran on the one claims file, blind. The checker's brief named commands its allowlist cannot run; the Orchestrator took those readings in `tg-audit-2-settling.txt`.

## Reconciliation

1. **Delta and scope: CONFIRMED.** The objective lane matched the status and the diff byte for byte, matched the index hashes to the `a658879` blobs, and ran `git apply --check` (exit 0). The checker's and the reviewer's UNRESOLVED sub-clauses (the hashes and the apply check) close on the Orchestrator's readings in `tg-audit-2-settling.txt`: each `rev-parse a658879:<path>` equals the patch's `index` base hash, and the apply check exits 0.
2. **The guide: CONFIRMED.** Every lane found each ruled sentence as ruled. The reviewer's presentation drift stands as a finding: the opening paragraph's re-wrap left a 125-column line (`tg-shared-2.patch:209`). Carried to round 3 as a re-flow with no wording change.
3. **Doc blocks, comments, and the empty-toggle probe: FAIL, carried.** The comment's narrowed limit is confirmed from the source (`_dropdown.scss` clears only the `::after` `margin-left` value; the split rule clears the `::before` `margin-right` value) and from the objective lane's in-memory compilation. The empty-toggle readings themselves rest on the report alone: the probe was deleted (`b-collapse-tg-report-2.md:117-123`), which `.claude/rules/quality.md` § Instruments forbids for an instrument that settled a claim. Ruling: round 3 adopts the probe as a committed case in `button-group.test.ts` reading an empty plain toggle and an empty split toggle under the `.dropstart` wrapper, and the `dropstart-caret-rule-omitted` mutation is recorded red on it.
4. **The case tables: CONFIRMED on the claim; the `side` field is ruled wrong.** Placement, rows, freezing, derivation, and every table control hold in every lane. The reviewer's outside finding `caret-side-name` holds: `side` names a margin property in `BUTTON_GROUP_CARET_CASES` while `sides` names the caret's border sides in the source table one declaration earlier and in the DROPDOWN cases of the same test file, so one term names two concepts in one file. The round-1 subjective prescription that introduced the name is wrong. Ruling: rename the field to `margin` in the table, its TSDoc, the `it.each` title and destructuring, and the binding case, and title the binding case "caret margins".
5. **The guard and the proofs' readings: CONFIRMED.** Every round-1 mutation reddens on the reading the matrix states, the logs' line numbers match the final bytes, and the given ruling on the `group-size-on-buttons` gap stands in both lanes (a size class on the toggle alone cannot satisfy the button-size selector; the group-form mutations already redden on unsized buttons).
6. **The gates: CONFIRMED.** Each log exits 0 with the stated count. The reviewer's ordering clause closes on the settling readings: every owned file's modification time precedes the gate run's start at 18:11:06 UTC.
7. **Law and report: BROKEN, carried.** The code-law checks hold in every lane. The writing defects, each carried to round 3:
   - (a) `b-collapse-tg-report-2.md:229` "Every run above" (both lanes);
   - (b) `tg-shared-2.patch:1522` "The last row" names a row by its position (both lanes);
   - (c) `tg-shared-2.patch:1397-1399` the ambiguous "which" beside rows reading 9, 6, and 12 (reviewer);
   - (d) `tg-2.diff:52-54` the "as … does" clause attached to "sit" (reviewer);
   - (e) `tg-shared-2.patch:218` "the release expects" gives software a human faculty; the round-1 prescription is wrong (reviewer);
   - (f) `tg-shared-2.patch:23-24` and `:85` "announces `aria-expanded="false"`" leaves the token with no noun; the round-1 prescription is wrong (reviewer);
   - (g) the new TSDoc's bare field tokens as sentence subjects at `tg-shared-2.patch:1394`, `:1439`, and `:1517` (objective lane). The reviewer held them as the file's own convention; the rule outranks existing code, the fix is a noun per token, and the base file's older blocks are CLOSE-OUT's token-noun sweep, so the objective lane's reading stands for the four new tables;
   - (h) the caret comment's `margin-left`, `::before`, and `margin-right` tokens without nouns at `button-group.test.ts:319` and `:321` (objective lane).
   - Outside the claims, **REPORT-COUNTS** (objective lane): `b-collapse-tg-report-2.md:13` "One reading moved" tallies a growable set. The round-3 report names the reading directly.

## Findings outside the claims

- `caret-side-name` (reviewer): carried, see claim 4.
- `REPORT-COUNTS` (objective lane): carried, see claim 7.

## Referrals ruled

- The retained round-2 report names launch paths at lines 9 to 11 and 373 (`tmp/units/tg-shared.patch`, `../../units/tg-shared-2.patch`). That residue is the Orchestrator's retention rewrite, not the unit's; the file stays as the lanes audited it, and the round-3 report names the retained paths once.
- No capture portfolio was supplied, so the report's sentence that the `Split dropstart` frame shows the split rule is NOT-EVIDENCED. No claim rests on it; the Orchestrator reads that frame at the landing's regeneration.
- The report cites `vitest list` for the case titles and retains no list log; the reviewer checked the titles against the diffs. Round 3 retains the list.
- The density case restating the element template, the removed `slice(1)` filter, `BUTTON_GROUP_SPLIT_FORMS` in `tests/setupStyles.ts`, and the round-2 matrix without the Specimen and Capture columns: attacked and held by the reviewer; no carrier.

## Carriers

Every carried finding is an item of `tg-brief-3.md` (`builder` on Sonnet): claim 2's re-flow, claim 3's adopted case, claim 4's rename, and claim 7's (a) to (h) with REPORT-COUNTS. The base file's older TSDoc blocks with bare field tokens are CLOSE-OUT's token-noun sweep, beside the NAV carrier already recorded there.

VERDICT: FAIL 3, 4, 7; outside the claims: caret-side-name, REPORT-COUNTS
