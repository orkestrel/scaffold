LANE: eir-audit-2-reviewer

I held the subjective lane. `builder` wrote this work on Sonnet, not my engine. My tools are read-only, so I ran no mutation myself. Every mutation reading I cite comes from a retained log; where no log exists, I say that I worked the reading out from source.

1. **Button group — CONFIRMED.**
   - The comment matches the brief word for word. `/home/user/veneer-eir/tests/src/styles/components/button-group.test.ts:581-583` holds the exact text of `/home/user/scaffold/.orkestrel/veneer/units/e-id-record-brief-2.md:21-23`, split across three comment lines.
   - `:587` asserts `border-left-width` of `3`, under the scope at `:567` (`--bs-border-width:3px`).
   - Each clause of the comment is true of the readings asserted around it:
     - "carry the Button family's own radius … where Button put them": `:584-586` reads the first child's corner at `6` while the group reads `11` (`:578`).
     - "their border width reads the retuned `--bs-border-width`": `:587` reads `3`.
     - "as the overlap does": `:579` reads `-3`, and `:557` pins the overlap expression `calc(-1 * var(--bs-border-width))`.
     - "one shared line": this follows from `:579` and `:587` together, because the pull-back equals the border width.
   - Round-1 claim 5 is closed. The comment no longer contradicts the assertion under it.
   - Mutation: set `/home/user/veneer-eir/src/styles/components/_button.scss:23` back to `var(--vn-border-width)`.
     - The child's border then reads the root alias, 1px, which the scope does not touch.
     - The retained log shows the value on the shipped tree: `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/eir-test-src-styles.log.txt:8199-8208` reads "expected 3 to be 1" at `:587`.
     - The `1` under the mutation is the `ca83afb` baseline's own pinned value. I derived it; no round-2 run recorded it.
     - The assertion's `3` against `1` tells the mutation apart from the passing tree.

2. **Toggle — CONFIRMED.**
   - `/home/user/veneer-eir/tests/src/styles/components/button.test.ts:392-397` checks three things after Tab and before Space:
     - Tab reaches the input (`:393`).
     - The input matches `:focus-visible` (`:394`).
     - The label's ring reads `[[0, 0, 0, 3]]` (`:395-397`).
   - The post-Space reads at `:398-403` are unchanged from round 1 (`eir.diff:162-167`).
   - Mutation: delete `.btn-check:focus-visible + .btn` at `_button.scss:99`.
     - `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-mutation-toggle.log.txt:78-97` fails at `:395:90` with "expected [ [] ] to deeply equal [ [ +0, +0, +0, 3 ] ]". The run filtered to this one case (`:106`, "1 failed | 84 skipped").
     - No rival selector can paint that ring. The label is not the active element (`:393`), so `.btn:focus-visible` cannot match. `.btn-check:checked:focus-visible + .btn` (`:105`) does not apply while the box is unchecked.
     - The assertions tell the mutation apart from the passing tree.
     - The sed pattern in `eir-2-mutation.sh:15` matches the single-tab selector line, and the failure itself shows the mutation reached the CSS.
   - The title now states what the case proves. "Keeps the label focus paint" is true because the ring is read both before and after the toggle, and "from the keyboard" is proved by Tab (`:393`) and Space (`:399`). Round-1 claim 6 is closed.
   - `:394` and `:400` are preconditions: they attribute the ring to keyboard focus. No CSS mutation reddens them, and they do not claim to be the proof.

3. **Table cells — CONFIRMED.**
   - `/home/user/veneer-eir/tests/src/styles/elements/tr.test.ts:46-52` reads `border-bottom-width` `3px` on a `td` under `--bs-border-width: 3px`.
   - Mutation: `_tr.scss:12` reads `--vn-border-width` again.
     - `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-mutation-tr.log.txt:77-83` fails at `:51:49` with "expected '1px' to be '3px'".
     - The assertion tells the mutation apart from the passing tree.
   - The 1px default control already exists at `:29`.
   - The title follows the form of the sibling `hr` case (`hr.test.ts`, "moves the top border to a scope-set --bs-border-width"), so the two proofs share one vocabulary.
   - The worktree `_tr.scss:12` is restored.

4. **Guide — CONFIRMED.**
   - `/home/user/veneer-eir/guides/veneer.md:7089` reads `var(--bs-border-width)`, which matches `_button.scss:23`. F1 is closed.
   - `:7058` matches `e-id-record-brief-2.md:31-32` word for word, and its content is true:
     - Hover is 7.5% (`/home/user/veneer-eir/src/styles/components/_table.scss:19,125`).
     - Active is 10% (`:17,123`).
     - The stripe is 5% (`_tokens.scss:26,90`).
   - The cell now opens with the backticked origin and an em dash, like its siblings (`:7055-7065`). It no longer names the campaign ruling. F2 is closed.
   - The cell agrees with the prose at `:7047`: "Tables use the stripe percentage and retain their own active and hover accents".
   - I found no other stale prose. The remaining `--vn-border-width` mentions (`:4490`, `:5768`, `:6065`, `:6943`, `:9659`) describe the alias, and each is still true.

5. **Scope and gates — CONFIRMED.**
   - I read "round-1 files" as the round-1 set plus the two test files that `e-id-record-brief-2.md:13-14` grants. On that reading the claim holds:
     - `/home/user/scaffold/.orkestrel/veneer/units/eir-2-status.txt` equals `eir-status.txt` plus `button-group.test.ts` and `tr.test.ts`.
   - The source files are unchanged from round 1:
     - `_button.scss` has blob `186ca5d..f2ac16e` in both diffs.
     - `_hr.scss` has `6dd6667` in both.
     - `_tr.scss` has `dbfaba0` in both.
   - The only guide changes against round 1 are `:7058` and `:7089`, compared at `eir.diff:27` against `eir-2.diff:27,43`.
   - Gate logs:
     - `eir-2-test-src-styles.log.txt:8197-8198` shows 115 of 115 files and 1435 of 1435 tests passing, with no FAIL or Unhandled line.
     - `eir-2-test-conformance.log.txt:10-11` shows 26 of 26.
     - `eir-2-test-guides.log.txt:10-11` shows 20 of 20.
   - No log prints its exit status. An exit of 0 is what a run with every test passing and no error line produces, but the literal status comes only from the writer's table. See referral R2.

**Findings outside the claims**

None.

**Attacked and held**

- **The comment's phrase "each child's corners where Button put them".** The group squares the second child's leading corners, which read `0` at `:580`, so strictly the group placed those corners, not Button. The sentence is about what the retune does: it moves no child corner to the retuned 11px, and `:580` and `:584` both hold. I judged the phrase accurate enough to stand, not a defect.
- **The duplicate tab stop.** The toggle specimen's label still carries `role="button" tabindex="0"`, which adds a second tab stop. Round 1 attacked and held this, and nothing has changed.
- **Code tokens without a following noun.** The comment and the guide cell each put a code token with no noun after it ("the retuned `--bs-border-width`", "retained `$table-striped-bg-factor`"). The guide writes tokens this way throughout (for example `guides/veneer.md:4488-4489`), so I did not file it.

**Referrals**

- **R1 (Orchestrator), about the claims file, not the subject.** Claim 5's words "lists only the round-1 files" are false if read literally: the status adds `button-group.test.ts`, which round 1 declared off-limits, and `tr.test.ts`, which round 1 owned but did not change. I ruled on the granted-scope reading. A successor claim needs to say "only the files the round-1 and round-2 briefs grant".
- **R2 (objective lane).** No retained log records the gate exit codes, or the byte-identical restore check in `eir-2-mutation.sh:25,41`, which prints to the script's stdout. Matching blobs in `eir-2.diff` and the restored worktree files corroborate the restore. Decide whether a captured exit status and restore line are owed.

VERDICT: PASS
