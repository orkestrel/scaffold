# J-TOOLTIP round 5 (the landing round): report

Retained 2026-09-24 from the writer's returned report (`opus` on Opus 5.5, agent ac01697e5b3344cdc, under `j-tooltip-brief-5.md`, worktree `tmp/worktrees/tooltip`). The instrument table is retained as `j-tooltip-mutations-5.log.txt` and its one-line-per-row summary as `j-tooltip-mutations-5-rows.txt`; the red reading as `j-tooltip-round5-red.log.txt`; the chain as `j-tooltip-acceptance-5.sh` and `-5.log.txt`.

I've finished round 5 (the landing round), with no commit. The merge with `main` is resolved with both sides kept, the three door repairs and the promotion bound are in, and the reviewer items are folded except B7. The landing chain exited 0 at every step. One gap is below.

**Open: B7 ("the two case titles").** Neither `j-tooltip-audit-4-subjective-verdict.md` nor `j-tooltip-audit-4-verdict.md` exists under `.orkestrel/veneer/`, so I couldn't tell which two titles the reviewer meant. I retitled the two cases this round made wrong or incomplete: the hide-takeover case and the P3 case. If the reviewer named different cases, B7 is still open. The other reviewer items came from the brief's own wording.

## Merge resolution (L1)
`main` is at `c21fd17`; J-OFFCANVAS has not landed. I resolved the conflicts in these four files and staged them with `git add` so no path is unmerged. Nothing is committed.
- **`src/browser/helpers.ts` (one hunk at the end of the file):** both sides had appended functions. I kept the tooltip's `buildTip`, `fillSlot`, and `writeContent`, then `main`'s `readScrollbarWidth`. The imports merged on their own into one block.
- **`tests/src/browser/helpers.test.ts`, import hunk:** kept `fillSlot` from the tooltip side and `main`'s `matchesDisabled`. I dropped `isDisabled` because `main` renamed it and nothing exports it any more.
- **`tests/src/browser/helpers.test.ts`, end hunk:** kept the tooltip's `buildTip`, `fillSlot`, and `writeContent` describe blocks, then `main`'s `readScrollbarWidth` block.
- **`tests/src/browser/index.test.ts` (two hunks):** each hunk keeps both names in sorted order: `isTooltipEvent` with `matchesDisabled`, and `parseTrigger` with `readClosest`.
- **`guides/veneer.md` (one block, the § Surface table):** the Compatibility table was already resolved by your script.
  - I used `main`'s rows and order, and inserted each tooltip-only row after its predecessor on the tooltip side.
  - The `PlacementInput` and `TooltipSelectorMap` summaries come from the tooltip side, which changed them. The `computeNeighbor` summary comes from `main`.
  - I dropped the tooltip side's duplicate `computeNeighbor` row, which `main` had removed, and its `isDisabled` row.
  - I ran oxfmt on that one file. The guide now differs from `main` by +308/−3, all in tooltip content.
- **`types.ts`:** merged on its own and has no duplicated declaration.
- **No tooltip helper duplicates a landed one**, so nothing was deleted.

All three `closest` calls in `Tooltip.ts` now go through `readClosest`:
- the modal ancestor lookup in the constructor;
- `#resolveContainer`, as `readClosest(host, '[aria-modal="true"]') ?? body`;
- `#acquire`, as `readClosest(target, descendants, this.#host)` plus the check that the match isn't the host itself.

## Repairs
- **L2 (the rebuild's reads of the settled tip):** `show` reads `const held = this.shown ? true : undefined` before its dispatch.
  - After the `show.vn.tooltip` dispatch it checks `#holds(change, held)`, so a listener that moves the settled tip or removes its `shown` token stops the call.
  - After the old tip's discard it runs `if ((held === true && !left) || !this.#holds(change, undefined)) return false`.
  - The discard's report stops only a rebuild. A tip left over from an earlier stopped show is cleared without blocking the next show.
- **L3 (the teardown's token read):** `#discard(hiding: boolean)`. When `hiding` is true, the tip is removed only if it is still in its container and lacks the `shown` token. `#conceal` passes `true`; destruction, the rebuild, and the refused promotion pass `false`.
- **L4 (the promotion bound):** stated in the guide's door text (split after the release sentence, per B9), in the class TSDoc, in the `show` remarks, and as a new item in the departures list. The P3 case now asserts the bound: the tip stays `:popover-open` after the show resolves `false`, and after `destroy()` it is closed, has no `popover` attribute, and is still in `elsewhere`.
- **L5 (the reviewer's wording):**
  - **S2:** the restoration sentence now describes the closed behaviour, and a new case proves it: "completes the restoration before a destroy a reaction to one of its writes calls returns". A throwaway probe showed the first restoration write is `aria-label`, so the case really tests the nested restore. Its log is `probe-restore.log.txt`, and the probe file was deleted.
  - **S3:** the guide and the `#change` comment now say a hide takes a show over only after its `shown` token write. The hide-takeover case asserts that a hide started from an `inserted` listener resolves `false`.
  - **ORC1:** the arrays that carried values out of steps are gone. `emitEvent`, `buildTip`, and `#discard` now use the call-then-`#holds` form.
  - **ORC3:** "hides it despite prevention" and "can start another change" are in the types, the class TSDoc, and the guide.
  - **The causal `since`** is now `because`.
  - **B4:** the `show` remarks now exclude the build's release of the elements it moved.

## Red and green readings
The command for every reading was `npm run test:src:browser -- tests/src/browser/Tooltip.test.ts`. Round 4's source has hash `73204fe1…`, confirmed with `git show HEAD:src/browser/Tooltip.ts`.
- **`round5-red.log.txt`, against round 4's source:** `Tests 3 failed | 51 passed (54)`. The move case, the token case, and the L3 case each failed with `expected true to be false`.
- **`round5-red-2.log.txt`:** round 4's source was swapped in, then the round-5 file (hash `554e12fd…`) restored and its hash re-checked. `Tests 4 failed | 52 passed (56)`. These cases failed:
  - "stops a rebuild whose show listener moves the settled tip into another container…"
  - "stops a rebuild whose show listener takes the shown token from the settled tip…"
  - "stops a rebuild whose old tip a closing beforetoggle listener moves during its removal…"
  - "resolves a hide false and leaves the tip shown where it is when a closing beforetoggle listener adds its shown token back"
- **Why the third case was added:** it binds the discard-report row. In the two show-listener cases the dispatch's read stops the call first, so they can't tell whether the discard's report is read.
- **Green:** `round5-green-3.log.txt` reads `Tests 120 passed (120)` across the Tooltip, helpers, and index test files. The Tooltip file alone has 56 cases, all passing in the landing chain.

## Instrument (`tmp/j-tooltip/mutations-5.py`, one whole run)
`mutations-5.py` is generated from `mutations-4.py` by `round5_instrument.py`, and `round5_anchors.py` confirmed every row's edit anchor and case name matched before the run.
- **Overall:** 56 rows EXACT, 41 JOINED, and 1 MISSED. The log ends `receipt: restored byte for byte`.
- **The MISSED row:** "the id step reads no door" (0 failed of 56). It is indistinguishable, not unreachable: the next step's read catches the destruction before anything observable is written.
- **`GREEN?` rows, all 0 failed:** Tooltip 56, Placement 18, NativeSanitizer 7, helpers 61, validators 28, parsers 24, index 3.
- **The three new rows are all EXACT**, each failing on `expected true to be false`:
  - "the rebuild's dispatch reads no tip"
  - "the rebuild ignores the old tip's report"
  - "the teardown reads no token"
- **Re-anchored rows:**
  - "the show re-reads no refusal after its dispatch" and "the modal hide is not heard" follow the construction form and the call's new line breaks.
  - "the show completion reads no door" is anchored by its comment and names the retitled case.
  - "a refused promotion is not cleaned up" uses `#discard(false)`.
  - The removal mutation shared by P2, P7, and the wait row matches the new token clause.
  - "the container ignores aria-modal" and "the modal ancestor is found by the default token" match the `readClosest` form.
- The full table is in `tmp/j-tooltip/rows5.txt`, one line per row, and the raw log is `mutations-5.log.txt`.

## Landing chain (`tmp/j-tooltip/acceptance-5.sh`, one run)
```
chromium 153.0.8010.12
format exit=0 | npm run format:check
lint exit=0 | npm run lint:check
check exit=0 | npm run check
guides exit=0 | npm run test:guides
policy exit=0 | npm run test:policy
browser exit=0 | npm run test:src:browser
core exit=0 | npm run build:src:core
styles exit=0 | npm run build:src:styles
build exit=0 | npm run build:src:browser
conformance exit=0 | npm run test:conformance
setup exit=0 | npm run test:setup
```
The test steps reported: guides 19 passed; policy 109 passed and 1 skipped; browser 731 passed; conformance 24 passed; setup 299 passed.

## Status and diffstat
There are no unmerged paths. Apart from the staged merge (104 files, +12746/−1893 against `HEAD`), the only round-5 working changes are ` M src/browser/Tooltip.ts`, `MM src/browser/types.ts`, and ` M tests/src/browser/Tooltip.test.ts`. There are no untracked files outside `tmp/`.
- **Against `HEAD`:** `Tooltip.ts` +/−128, `Tooltip.test.ts` 167, `types.ts` 58 (which includes `main`'s merged edits).
- **Against `main`:** `guides/veneer.md` +308/−3, `helpers.ts` 106, `helpers.test.ts` 115, `index.test.ts` 18, `types.ts` 48.

## Deviations and observations
- **Local package is older than the lockfile:** `package.json` on `main` asks for `@orkestrel/test` `^0.0.23`, but this worktree's `node_modules` has 0.0.22. I didn't install anything. The chain still passes because 0.0.22 already exports `driveHold`. An `npm install --ignore-scripts` after your commit would bring it in line.
- **The E18 `show` remark is looser than the code:** "start a hide" stops a call only during a rebuild's dispatch or after the `shown` token write; before that write the hide resolves `false`. I left the verbatim sentence as it is. The guide's new departure item names only destruction and moving the tip.
- **The guide script doesn't hold the final departure wording:** `round5_guide.py` holds the guide edits, but I then reworded that departure item inline to drop "starts a hide" and to replace a Bootstrap claim I couldn't support. The shipped wording is "Bootstrap's `show` method continues its sequence after its `inserted.bs.tooltip` event whatever a listener did", which I checked against `tooltip.js`.
- I made no `prove` call.

## The Orchestrator's notes

- B7: the reviewer's two titles were the throwing-sanitizer case ("returns the moved elements home before a throwing sanitizer rejects it") and the memoisation case around the failed-descendant read; the writer retitled the hide-takeover and P3 cases instead. B7 is carried to J-POPOVER's prose pass in `plan.md` with the round-4 bounds.
- `main` moved to `0fdadf4` (the styles session's landing) while this round ran, and J-OFFCANVAS lands over it before the tooltip; the tooltip's branch merges `main` once more before its landing audit, so the landing diff this report's "Against `main`" numbers describe is superseded by that merge.
