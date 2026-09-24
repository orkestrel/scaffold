# J-SNAPSHOT round 3 report

Retained 2026-09-24 from the writer's returned report (`opus` on Opus 5.5, agent ae8fdf37c94c55f5e, round 3 under `j-snapshot-brief-3.md`, worktree `tmp/worktrees/snapshot`). The instrument table is retained beside it as `j-snapshot-mutations-3.log.txt` (and its controls log as `j-snapshot-mutations-3-controls.log.txt`), copied byte for byte from the worktree; the report's abbreviated copy is replaced by that pointer and nothing else is changed.

**Outcome:** Round 3's obligations are done, and the scoped chain ran once and exited 0 on every step. The browser suite ran 651 of 651. Every instrument row is `EXACT` or `JOINED`, including the S1'' row on the new case, and the log ends with `receipt: restored byte for byte`. No deviation is open.

Runs used Chromium 153.0.8010.12. I made no call to the `prove` tool.

The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot`. Round 2's source is kept at `tmp/j-snapshot/HostSnapshot.round2.ts` for the red reading.

## Files touched

- `src/browser/HostSnapshot.ts`:
  - `restore` captures `held`, the presence records it holds when its writes begin. Its class and style cleanup loops walk `held` through a new `#absent`.
  - `#absent` departs a record the restore still holds, through `#leave`. For a record a re-entrant save took back into `#joined`, it reads `present` without departing, so the snapshot keeps that record for its next restore.
  - The class remarks now read "whose record reads the attribute absent", and state the record's lifetime and the take-back case.
  - The `#join` comment is repaired.
- `src/browser/types.ts`: the `HostSnapshotInterface.restore` remarks (diff below).
- `guides/veneer.md`: § Ownership and restoration and the `#### Tab` sentence.
- `tests/src/browser/HostSnapshot.test.ts`: the S1'' case, the S2'' destroy variant, and the three renamed fixtures.
- `tests/src/browser/Modal.test.ts`: unchanged since round 1's applied patch.
- Under `tmp/j-snapshot/`: `mutations-3.py` with its logs, `acceptance-3.sh` with its logs, and `HostSnapshot.round2.ts`.

## Per obligation

**S1'': the take-back cleanup.**

The case is `removes the class attribute its own writes left empty when a save during its restoration takes its share back`. It runs the objective lane's sequence:
1. The element starts with no `class` attribute.
2. `first` saves `active`, and the element gains it.
3. `second` saves `collapsed`, the element gains it, and `second` restores, which leaves `active`.
4. A one-shot class reaction calls `first.save(active)` and then `toggle('active', false)`.
5. `first.restore()` runs.

The case asserts that the attribute is absent. It then adds `active` back and asserts that `first`'s next restore also leaves no attribute. That next restore writes the taken-back recording, departs the holding it kept, and removes the empty attribute.

Red reading, with `npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts` against round 2's source:
```
 FAIL  |src:browser (chromium)| tests/src/browser/HostSnapshot.test.ts:668:2 > HostSnapshot > removes the class attribute its own writes left empty when a save during its restoration takes its share back
AssertionError: expected true to be false // Object.is equality
 ❯ tests/src/browser/HostSnapshot.test.ts:695:37
 Test Files  1 failed (1)
      Tests  1 failed | 31 passed (32)
```
Green reading, same command after the fix, before the S2'' variant was added:
```
 Test Files  1 passed (1)
      Tests  32 passed (32)
```
The final file runs 33 passed of 33 (`GREEN?` row). The existing take-back case and the R1 case stay green. The instrument's `LANDED` row swaps in round 2's source over the final file, and exactly this case fails.

**S2'': the Dropdown path.**
- **Finding:** `Dropdown.test.ts` has no case where a reaction to `Placement`'s restoration calls `destroy()` during the dropdown's own destruction. Its destroy-inside-destroy case, 'completes its restoration when a destroy called from the closing promotion runs inside its own destroy', calls the nested destroy from a `beforetoggle` listener. That listener runs before the placement's restoration begins.
- **Added**, beside the `hide()` reproduction: `restores the whole placement and the dropdown before a destroy a reaction to the placement popover restoration calls inside the dropdown destruction returns`.
  - It drives `dropdown.destroy()`, and the menu's `popover` removal reaction calls `destroy()` again.
  - It reads `[null, null, null, 'dropdown-menu']` at the nested return: the side attribute, the menu `style`, the toggle's `aria-expanded`, and the menu `className`.
  - It uses the same recorder assertions as the `hide()` case: `delivered` is empty after a microtask, and `takeRecords()` is empty.
- **Proof the variant binds:** dropping the hand-off reddens it (`expected [ [ 'bottom', null, null, …(1) ] ]`), and so does the late-write control.

**S3'': the sentences.**
- In `types.ts` and § Ownership and restoration, the shared-record sentence gains its lifetime: "The record is read at the first of those saves while no snapshot holds it, and forgotten after the last snapshot holding it restores, so a later save reads the element again."
- The 70-word removal sentence is split into two: "…removes it when its own token or property writes leave it empty. No complete set of restorations, …, and no partial one leaves the attribute present and empty unless a write throws."
- `#### Tab` now reads "…destruction leaves the list with the values the other tab wrote, because no two tabs share the recording of one target."
- The class remarks say "whose record reads the attribute absent" and state the take-back case.
- The `#join` comment reads "…takes that holding back, and the snapshot then leaves the record at its next restoration, the one that writes the saved target."
- The `written` comment already said the mark "is set before the write runs"; it is unchanged.
- The § Ownership paragraph is rewrapped to 100 columns.

**F1: the fixtures.** Three fixtures are renamed for what each case builds:
- `vn-probe-snapshot-classed` became `vn-probe-snapshot-shared-class`.
- `vn-probe-snapshot-class-presence-stamp` became `vn-probe-snapshot-class-overlap`.
- `vn-probe-snapshot-style-presence-stamp` became `vn-probe-snapshot-style-overlap`.

**The instrument.** `tmp/j-snapshot/mutations-3.py` carries round 2's rows plus the new rows below. On its first `--controls` run the runner left one mutation in the source (the Deviation state section says how). I restored it and fixed the runner, and both logs quoted here come from the fixed runner.

## `types.ts` diff (the `HostSnapshotInterface.restore` remarks, against `HEAD`)

The remarks now carry the shared-record sentence with its lifetime ("The record is read at the first of those saves while no snapshot holds it, and forgotten after the last snapshot holding it restores, so a later save reads the element again."), the fixed write order, the removal rule split in two ("Every restoration whose record reads the attribute absent removes it when its own token or property writes leave it empty. No complete set of restorations, in any order and overlapping or one after another, by engines of any class, and no partial one leaves the attribute present and empty unless a write throws."), the ownership and precedence sentences, the same-snapshot re-entry sentence, and the throwing-withdrawal sentence reaching an interrupted restoration. The full hunk is in `j-snapshot-3.diff`.

## Instrument (`tmp/j-snapshot/mutations-3.log.txt`, retained as `j-snapshot-mutations-3.log.txt`)

A `LANDED` row against `tmp/j-snapshot/HostSnapshot.round2.ts` (1 failed of 33, the S1'' case); "the removal only at the last holder (round 1 rule)" (`EXACT`, the R1 case); "the presence record withdrawn early" (`JOINED`, read twice); "each save reads the element again" (`JOINED`, read three times); "the presence read at restore time rather than save time" (`JOINED`); "the taken-back record is not read (the S1 repair of round 3)" (`EXACT`, the S1'' case); "round 2 cleanup restored (the cleanup walks the live leaving list and departs only) (the S1 repair of round 3)" (`EXACT`, the S1'' case); "the take-back of a holding a save during its own restoration makes is dropped" (`JOINED`); "the re-entry hand-off dropped" (`JOINED`, read four times, the destroy-inside-destroy Dropdown variant included); "the written mark not read" (`EXACT`, 44 writes where 1 is expected); "a late side write after the outer popover removal returns (the S2 negative control)" (`JOINED`, the hide reproduction named and the destroy variant joined); `GREEN?` rows at 0 failed for `HostSnapshot.test.ts` (33), `Dropdown.test.ts` (35), and `Modal.test.ts` (40); matching digests; `receipt: restored byte for byte`. The controls log (`j-snapshot-mutations-3-controls.log.txt`) reads `MISSED exit=0 | the late side write against the round-1 proof shape (deliveries discarded, no delivered assertion) | … | 0 failed of 33`, the expected reading (the proof shape round 2 replaced cannot see the late write), and ends with the same receipt.

## Scoped chain (`tmp/j-snapshot/acceptance-3.log.txt`, retained as `j-snapshot-acceptance-3.log.txt`, run once)

```
Chromium 153.0.8010.12
check-src-browser exit=0 :: npm run check:src:browser
check exit=0 :: npm run check
oxlint exit=0 :: npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
oxfmt exit=0 :: npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
test-src-browser exit=0 :: npm run test:src:browser
test-guides exit=0 :: npm run test:guides
test-policy exit=0 :: npm run test:policy
done
```
The per-command logs report: browser `Test Files 22 passed (22)`, `Tests 651 passed (651)`; guides `19 passed (19)`; policy `109 passed | 1 skipped (110)`; oxfmt `All matched files use the correct format.`; `tsc` and oxlint no diagnostics.

## Status and diffstat

```
 M guides/veneer.md
 M src/browser/HostSnapshot.ts
 M src/browser/types.ts
 M tests/src/browser/HostSnapshot.test.ts
 M tests/src/browser/Modal.test.ts
 guides/veneer.md                       |  70 ++++---
 src/browser/HostSnapshot.ts            | 306 +++++++++++++++++-----------
 src/browser/types.ts                   |  39 ++--
 tests/src/browser/HostSnapshot.test.ts | 362 +++++++++++++++++++++++++++++++--
 tests/src/browser/Modal.test.ts        |   5 +-
 5 files changed, 601 insertions(+), 181 deletions(-)
```

## Deviation state

None open.

The first `--controls` run of `mutations-3.py` left `HostSnapshot.ts` mutated:
- **Cause:** the control's test-file anchor matched twice, because the destroy variant also carries the recorder, so `apply` raised partway through. It raised after it had already written the late-write edit into `HostSnapshot.ts`, so `row` never received the originals to restore.
- **Undo:** I reversed exactly that edit. The file's digest then matched the run's `digest before` (`7c019de9…`).
- **Runner fix:** `row` now records each file's original bytes before `apply` makes its first edit to that file, so a failed edit still restores every file it touched. The control's test-file anchors now carry their count of 2.
- **Rerun:** both runs quoted here come from the fixed runner, and both end with `receipt: restored byte for byte`. The chain ran after them.

This round touched only the owned files.
