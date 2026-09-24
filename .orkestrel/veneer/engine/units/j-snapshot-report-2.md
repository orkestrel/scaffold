# J-SNAPSHOT round 2 report

Retained 2026-09-24 from the writer's returned report (`opus` on Opus 5.5, agent ae8fdf37c94c55f5e, round 2 under `j-snapshot-brief-2.md`, worktree `tmp/worktrees/snapshot`). The instrument table the report carried verbatim is retained beside it as `j-snapshot-mutations-2.log.txt` (and its controls log as `j-snapshot-mutations-2-controls.log.txt`), copied byte for byte from the worktree; the report's copy is replaced by that pointer and nothing else is changed.

**Outcome:** Round 2's obligations S1' to S5', F2, and the wording bounds are done. The full scoped chain exits 0, and the browser suite is 649 of 649. Every instrument row is `EXACT` or `JOINED`, and the log ends with `receipt: restored byte for byte`. No deviation is open.

Runs used Chromium 153.0.8010.12. I made no call to the `prove` tool.

The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot`. I kept round 1's source at `tmp/j-snapshot/HostSnapshot.round1.ts` for the red readings.

## Files touched

- `src/browser/HostSnapshot.ts`:
  - Every departure now removes the attribute against the shared first reading.
  - `#hold` and `#depart` are gone. They are folded into instance methods `#join(element, attribute)` and `#leave(element, attribute): boolean`, which reach `#presence` directly. The static `#join` and `#leave` are deleted.
  - Both `?? new Map()` calls carry an explicit type argument.
  - The comments state the removal rule, the `written` mark as set before the write, and the current throw sentence.
- `src/browser/types.ts`: the `HostSnapshotInterface.restore` remarks (diff below).
- `guides/veneer.md`: § Ownership and restoration, and the `#### Tab`, `#### Dropdown`, `#### Carousel`, and `#### Modal` sentences (diff summarized below).
- `tests/src/browser/HostSnapshot.test.ts`:
  - The R1 case is added.
  - The Dropdown reproduction keeps its observer's deliveries.
  - Five titles are changed: the four F2 cases and the `once` title.
- `tests/src/browser/Modal.test.ts`: round 1's patch, which you applied. I made no further change.
- Under `tmp/j-snapshot/`: `mutations-2.py` with its logs, `acceptance-2.sh` with its logs, and the `widen/` type probe.

## Per obligation

**S1': every departure removes against the shared reading.**
- `#leave` returns `!record.present` on every departure.
- It forgets the record, and the element's map when that is empty, after the last holder leaves.
- `restore` removes the attribute when that return is true and the class list or inline style is empty.

The case is `removes the class attribute of a trigger a button restoration leaves empty while a collapse on the same trigger stays live`. It uses a real `Button` and `Collapse` on one `<button>` that has no `class` attribute. The button toggles on, the collapse hides then shows, the button toggles off (leaving `class=""`), and `button.destroy()` runs. The case then asserts that the collapse is still live and that `trigger.hasAttribute('class')` is false.

Red reading, with `npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts` against round 1's source:
```
 FAIL  |src:browser (chromium)| tests/src/browser/HostSnapshot.test.ts:618:2 > HostSnapshot > removes the class attribute of a trigger a button restoration leaves empty while a collapse on the same trigger stays live
AssertionError: expected true to be false // Object.is equality
 ❯ tests/src/browser/HostSnapshot.test.ts:636:40
 Test Files  1 failed (1)
      Tests  1 failed | 30 passed (31)
```
Green reading, same command after the fix:
```
 Test Files  1 passed (1)
      Tests  31 passed (31)
```
The four round-1 S1 cases stay green. Modal's case also stays green (`GREEN? … Modal.test.ts | 0 failed of 40`).

**S2': the proof repair.**
- The observer now keeps its deliveries in an array: `const delivered: MutationRecord[] = []`, filled by `new MutationObserver((records) => delivered.push(...records))`.
- After `await dropdown.hide()`, the case asserts `expect(delivered).toEqual([])` and then `expect(observer.takeRecords()).toEqual([])`.
- The reading at the nested return, `[[null, null]]`, is kept.

Negative control: a late write of `data-popper-placement="late"` after the outer `removeAttribute('popover')` returns. It reddens the case as `EXACT`, failing with `expected [ MutationRecord{} ] to deeply equal []`.

A separate control run confirms the objective lane's claim-2 derivation. It applies the same late write to round 1's proof shape, where deliveries are discarded and nothing asserts them, and the late write goes undetected: `MISSED exit=0 … 0 failed of 31` (`tmp/j-snapshot/mutations-2-controls.log.txt`).

**S3': the sentences.**
- The judging rule is rewritten in the class remarks, in `types.ts`, in § Ownership and restoration, and in `#### Modal`: every restoration whose record reads the attribute absent removes it when its own writes leave it empty. Neither a complete set of restorations nor a partial one leaves the attribute present and empty.
- The temporal `once` became `after` in `types.ts`, in the guide paragraph, and in the case title.
- `#### Tab` and `#### Carousel` now state their bounds without the campaign unit name:
  - Tab: each snapshot records a value when its own engine first writes it, and no two engines share the recording of one target.
  - Carousel: where the markup has no `pointer` token, the destroyed carousel's swipe recorded it absent, the new carousel's swipe records it present, and the first swipe's restoration removes it, which leaves the live carousel without the token.

Sweep over the added lines of the five owned files (`git diff HEAD -U0`, saved as `tmp/j-snapshot/added-2.txt`). The pattern was `\b(should|simply|easy|easier|just|currently|now|new|latest|utili[sz]e|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|since|once|above|below|please|sanity check|dummy|blacklist|whitelist|master|slave|judge[sd]?|judging|ensure|guarantee|J-SNAPSHOT)\b`, case-insensitive. Its hits:
- Every `new` hit is a code keyword, which is permitted as data.
- "joined since its last restoration" uses `since` in its temporal sense, which is permitted.
- "writes a target once" means one time, which is permitted.
- "the restoration that writes the new target" used `new` as a descriptive word. I reworded it to "the target that save records".

A follow-up `grep -niE "judg|\bonce\b|J-SNAPSHOT|#hold|#depart"` over `HostSnapshot.ts`, `HostSnapshot.test.ts`, the `types.ts` section, and § Ownership and restoration returns only the one-time "writes a target once".

**S4': the type argument.** Both `new Map()` calls, in `#join` and in `#publish`, now carry explicit type arguments. The R3 answer is in the Unknown section.

**S5': the fold.** `#hold` and `#depart` are gone. `#join` holds the membership check, the take-back, the first reading, and the holder addition. `#leave` holds the membership check, the holder removal, the forgetting, and the return value. The `#joined` and `#leaving` fields stay. The comments describe each method once.

**F2: the titles.** They now read:
- `writes every target and removes the class attribute when a reaction that saves a target during a token write restores the same snapshot`
- `removes the style attribute after a snapshot saved inside a restoration property write restores`
- `removes the class attribute after three overlapping restorations, one saved inside another token write, have all restored`
- `removes the style attribute after three overlapping restorations, one saved inside another property write, have all restored`
- `…found absent after every snapshot that saved on the element restores, in either order`

## Unknown: does `?? new Map()` widen the type? (R3)

**The widening is real.** The probe is `tmp/j-snapshot/widen/probe.ts` (retained as `j-snapshot-widen-probe.ts`), typechecked with `npx tsc --noEmit -p tmp/j-snapshot/widen/tsconfig.json`. That config extends `configs/src/tsconfig.browser.json` with its own `include` and an empty `exclude`.

The probe assigns the entry read from each pattern to a `number`. The two untyped `?? new Map()` reads, one for `#presence` and one for `#pending`, compile without error. Only the typed control line fails:
```
tmp/j-snapshot/widen/probe.ts(21,9): error TS2322: Type '{ readonly present: boolean; } | undefined' is not assignable to type 'number'.
exit=2
```
So `records` in round 1's `#join` and `pending` in the landed `#publish` were `Map<any, any>`, and those bodies went unchecked. Both are now typed.

## `types.ts` diff (`HostSnapshotInterface.restore` remarks only)

The remarks now read, in place of round 1's "only the last snapshot holding a record judges that removal, once its token or property writes are done": "Every restoration whose record reads the attribute absent removes it when its own token or property writes leave it empty, after those writes are done, so neither a complete set of restorations, in any order and overlapping or one after another, by engines of any class, nor a partial one leaves the attribute present and empty unless a write throws." The re-entry and throw sentences are round 1's. The full hunk is in `j-snapshot-2.diff`.

## Guide diff (`guides/veneer.md`, against `HEAD`)

- **§ Ownership and restoration:** the shared-record sentence and the removal rule replace "Only the last snapshot holding a record judges… once…"; the partial-state example (a button destroyed while a collapse stays live) is named; the rest of the paragraph is reflowed to the 100-column wrap; the re-entry and throw sentences are as in round 1.
- **`#### Tab`:** "…values the other tab wrote, because each snapshot records a value when its own engine first writes it and no two engines share the recording of one target."
- **`#### Dropdown`:** the round-1 sentence is unchanged.
- **`#### Carousel`:** "…has that token written back over. Where the markup carries no `pointer` token, the destroyed carousel's swipe recorded it absent, the constructed carousel's swipe records it present, and the first swipe's restoration then removes it, so the live carousel is left without its `pointer` token."
- **`#### Modal`:** "Modals that resolve different `open` tokens share the body's `class` presence record, as § Ownership and restoration states, so when the body carried no `class` attribute before the first took its token, each release that leaves the list empty removes the attribute, in whichever order they release."

## Instrument table

Retained as `j-snapshot-mutations-2.log.txt` (run on the final source): a `LANDED` row against `tmp/j-snapshot/HostSnapshot.round1.ts` (1 failed of 31, the R1 case), then the rows "the removal only at the last holder (round 1 rule)" (`EXACT`), "the presence record withdrawn early (forgotten at the first departure)" (`JOINED`, read twice), "each save reads the element again (the reading is not shared)" (`JOINED`, read three times), "the presence read at restore time rather than save time" (`JOINED`), "the take-back of a holding a save during its own restoration makes is dropped" (`EXACT`), "the re-entry hand-off dropped" (`JOINED`, read three times), "the written mark not read" (`EXACT`, 44 writes where 1 is expected), "a late side write after the outer popover removal returns (the S2 negative control)" (`EXACT`), the `GREEN?` rows at 0 failed for `HostSnapshot.test.ts` (31), `Dropdown.test.ts` (35), and `Modal.test.ts` (40), matching digests, and `receipt: restored byte for byte`. The controls log also ends with `receipt: restored byte for byte`.

## Scoped chain (`tmp/j-snapshot/acceptance-2.log.txt`, retained as `j-snapshot-acceptance-2.log.txt`)

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
The per-command logs report: browser `Test Files 22 passed (22)`, `Tests 649 passed (649)`; guides `19 passed (19)`; policy `109 passed | 1 skipped (110)`; oxfmt `All matched files use the correct format.`; `tsc` and oxlint no diagnostics.

After the chain, I only rewrapped the lines of the § Ownership and restoration paragraph; no wording changed. On the final file, `oxfmt --check guides/veneer.md` exits 0 and `npm run test:guides` exits 0 with `19 passed (19)`.

## Status and diffstat

```
 M guides/veneer.md
 M src/browser/HostSnapshot.ts
 M src/browser/types.ts
 M tests/src/browser/HostSnapshot.test.ts
 M tests/src/browser/Modal.test.ts
 guides/veneer.md                       |  70 ++++----
 src/browser/HostSnapshot.ts            | 289 ++++++++++++++++++++-------------
 src/browser/types.ts                   |  38 +++--
 tests/src/browser/HostSnapshot.test.ts | 267 ++++++++++++++++++++++++++++--
 tests/src/browser/Modal.test.ts        |   5 +-
 5 files changed, 491 insertions(+), 178 deletions(-)
```

## Deviation state

None.
- The R1 case went red against round 1's source, and no consumer suite reddened.
- Every file touched is owned. I edited no engine file or off-limits file, and I returned no shared-file patch.
- I settled two things myself, as the contract allowed:
  - The R1 case sits in `HostSnapshot.test.ts`.
  - The late-write control against round 1's proof shape lives in its own `--controls` log, because the brief requires every row in the main table to be `EXACT` or `JOINED`.
