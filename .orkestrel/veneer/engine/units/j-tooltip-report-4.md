# J-TOOLTIP round 4 (resumed): T9 report

Retained 2026-09-24 from the resumed writer's returned report (`opus` on Opus 5.5, agent ac01697e5b3344cdc, under `j-tooltip-brief-4.md` and `j-tooltip-brief-4-resume.md`, worktree `tmp/worktrees/tooltip`). The instrument table the report carried is retained beside it as `j-tooltip-mutations-4.log.txt`, copied byte for byte from the worktree, and the report's table is replaced by that pointer; nothing else is changed. The collided run's stdout is retained as `j-tooltip-mutations-4-collided.stdout.txt`, the red reading as `j-tooltip-round4-red.log.txt`, the promotion probe as `j-tooltip-probe-promotion.log.txt`.

Round 4 is complete. The E18 mechanism is in `Tooltip.ts`. Every T7 case is present and green. The instrument's final whole run has no `ERR` rows, one explainable `MISSED` row, every `GREEN?` row at 0 failed, and ends `receipt: restored byte for byte`. The `acceptance-4.sh` chain exits 0 at every step. Against the base, round 4 changed only the four owned files; the other 13 files in the status match the retained round-3 diff exactly.

Before anything else, you need to know that **the tree I inherited was mutated.** The stopped writer's second instrument run (11:05 to 11:21) collided with a second copy of itself running at the same time, and it left four mutations in the source. The evidence is `tmp/j-tooltip/mutations-4-collided.stdout.txt`, which ends `receipt: DIGEST MISMATCH`. I restored each file to that run's own recorded "digest before" and checked the hashes. Two of the four files are off-limits to this unit:
- **`Tooltip.ts`:** had `|| this.#blocked()` dropped after the show dispatch, and destroy's `this.#release(() => false)` deleted. Restored from `Tooltip-round4.ts.txt`, hash `be9c2a16…`.
- **`Placement.ts` (off-limits):** had the arrow axis swapped (`vertical ? 'top' : 'left'`). I reversed that one line, giving hash `f254f6b8…`. The file's diff against the base now equals the retained round-3 diff.
- **`helpers.ts` (off-limits):** had `wrapper.innerHTML = template` in place of the sanitizer call. I reversed that one line, giving hash `ef02efcc…`, which also equals the round-3 diff.

The resume note was also out of date. `mutations-4.py` already existed with a clean first run (`mutations-4-first.log.txt`), and `acceptance-4.sh` had already run once at 11:08. No process was still running in this worktree when I started.

## Files touched this session
- **`src/browser/Tooltip.ts`:** I checked T1 to T5 against the brief and they hold. I made two edits:
  - The show's old-tip `#discard` is now one step: `#apply(change, undefined, () => this.#discard())`.
  - The hide's discard is now `#apply(change, undefined, () => left.push(this.#discard()))`, and the hide stops when `left[0] !== true`. The behaviour is unchanged; this makes the checker's mechanical claim hold literally.
- **`src/browser/types.ts`:** `TooltipEventMap.hide` no longer says "whose prevention refuses the hide", because that clause contradicted O1. It now reads "dispatched before the `shown` token leaves." followed by the O1 sentence, verbatim.
- **`tmp/j-tooltip/mutations-4.py`:** the hide row is re-anchored to the discard step, and the header records the resume and the collision.
- **New logs in `tmp/j-tooltip/`:** `round4-red-4.log.txt`, `round4-green-3.log.txt`, `mutations-4-targeted.log.txt`, `probe-promotion-2.log.txt`, and `Tooltip-round4-resumed.ts.txt`.

The guide needed nothing: the door paragraph with the release sentence and the O1 text in the `hide` row were already in place.

## T1 to T8 obligations and their cases
- **T1 (the primitive):** `#apply(change, shown, write)`, `#holds(change, shown)`, and no `#holding`.
  - Every forward platform write, dispatch, element move, and sanitizer call in `show`, `#conceal`, `#build`, and `#occupy` is an `#apply` callback.
  - The one construction, `#place`, is followed by publication and then `#holds(change, false)`.
  - The remaining bare calls are undo calls on stop paths, for the checker to rule on: the refused promotion's `#discard`, and the build's release-on-stop and catch release.
- **T2 (the build):** content values resolve first, with a door read after each. `buildTip`, the fade/shown token removal, the `auto` and class tokens, `fade`, and `id` are separate steps. `#occupy` runs its release as a step, publishes the origin record, then runs `fillSlot` as a step. The final release is a step, and each stop and each throw returns the unfinished tip's content.
- **T3 (publication and promotion):** the show publishes, then appends, links, and dispatches `inserted` as steps. It then places, publishes, and reads `#holds(change, false)`, adds the `shown` token as a step, reads `#holds(change, true)` after the wait, and releases and dispatches.
- **T4 (discard and conceal):** `#discard(): boolean` follows the ruling. `#conceal` follows the door order, stops on a false report, and reads the door before it releases.
- **T5 (`fill`):** a `fill` made while a change is in flight refuses before it releases anything.
- **T6 (interface and guide):** see the `types.ts` diff and the guide paragraph sections.
- **T7 (the proofs):** the cases start around line 1625 of `Tooltip.test.ts`: P1 to P7, the token-marking variant of P5, fill during a build, the throwing function and sanitizer, the `hidden`-listener re-entry, and the upgraded custom tip.
  - The retained door cases are re-pointed. They sit around lines 1258, 1298, 1321, and 1390, and the instrument names them by title.
  - The claim-2 timing assertion (`restored.calls` read the moment the nested `destroy()` returns) and the claim-4 call-count assertion (`recordCalls` on `getAttribute`) are present.
  - The claim-7 fixture is present: a dialog carrying `x-modal` only, a decoy carrying the default `modal` token, and "conflicting values" in the wording.
- **T8 (the instrument):** see the instrument table section.

## Red and green readings
The command for both readings was `npm run test:src:browser -- tests/src/browser/Tooltip.test.ts`.

**My red reading** (`round4-red-4.log.txt`) ran with `Tooltip.ts` replaced by `Tooltip-round3.ts.txt`, which is byte-equal to the round-3 file retained in `j-tooltip-3.diff`. The file was restored afterwards to hash `73204fe1…`.
```
 Test Files  1 failed (1)
      Tests  10 failed | 41 passed (51)
```
These cases failed, each with its first failing line:
- P1: `expected true to be false`
- P2: `expected true to be false`
- P3: `expected true to be false`
- P4: `expected [ [ false ] ] to deeply equal [ [ true ] ]`
- The P5 token-marking variant: `expected true to be false`
- P6: `expected [ [ 2 ], [ +0 ] ] to deeply equal [ [ +0 ] ]`
- P7: `expected null to be <div id="elsewhere"></div>`
- Fill during a build: `expected true to be false`
- Throwing content: `expected <div class="tooltip-inner">…(1)</div> to be <div id="home"></div>`
- Upgraded custom tip: `expected [ [ 1, false, 3, '' ], …(4) ] to deeply equal [ [ 1, false, +0, '' ], …(4) ]`

**The stopped writer's red readings** cover the same set:
- `round4-red.log.txt` and `round4-red-2.log.txt` are from earlier versions of the file.
- `round4-red-3.log.txt` ran at 10:50 and read 10 failed of 51.
- `round4-p1-round3.log.txt` reddens P1 alone.
- `round4-tipcase-red.log.txt` reddens an earlier three-column shape of the custom-tip case.

**No red reading against the round-3 source** is possible for P5 (an `inserted` listener moves the tip) or for the `hidden`-listener re-entry case. Round 3 already read the container after `inserted` and already released the change before dispatching `hidden`. Each is bound by its instrument row instead, as the resume note allows: "P5 the inserted step reads no container" is JOINED, and "the completion releases after dispatch" is EXACT.

**Green** (`round4-green-3.log.txt`): `Tests  51 passed (51)`.

## `types.ts` diff (round 4 against round 3)
```diff
-	/** Names the `shown.vn.tooltip` event, dispatched after the tip's transition settles; it is not cancelable. */
+	/** Names the `shown.vn.tooltip` event, dispatched after the tip's transition settles; it is not cancelable. The change is released before this event is dispatched, so a listener may start another change; that change does not undo the completion already announced. */
-	/** Names the `hide.vn.tooltip` event, whose prevention refuses the hide. */
+	/** Names the `hide.vn.tooltip` event, dispatched before the `shown` token leaves. Prevention refuses an ordinary hide; after a prevented platform hide has re-promoted this tip once, its next platform close conceals it despite prevention. */
-	/** Names the `hidden.vn.tooltip` event, dispatched after the tip is removed; it is not cancelable. */
+	/** Names the `hidden.vn.tooltip` event, dispatched after the tip is removed; it is not cancelable. The change is released before this event is dispatched, so a listener may start another change; that change does not undo the completion already announced. */
-	/** Names the `inserted.vn.tooltip` event, dispatched after the tip enters its container; it is not cancelable. */
+	/** Names the `inserted.vn.tooltip` event, dispatched after the tip enters its container; it is not cancelable. A listener can reach the tip through the trigger's `aria-describedby` attribute; a tip a listener moves out of its container is left where the listener put it, by the show, a hide, and destruction alike. */
 show @remarks, added paragraph:
+	 * A listener, a content function, the sanitizer, or a custom element's reaction that runs during the
+	 * call can destroy the tooltip, start a hide, or move the tip; the call then resolves false, writes
+	 * and dispatches nothing more, and leaves the tip where that code put it.
 hide, added:
+	 * @remarks
+	 * A listener or reaction that moves the tip during the hide, including a listener to the platform's
+	 * closing `beforetoggle` event, takes the tip over: the call resolves false, dispatches no `hidden`
+	 * event, and leaves the tip there.
 fill @returns:
+	 ... false when the tooltip is destroyed or a change is in flight, writing nothing, or when a shown tip's rebuild is refused because ...
```

## Guide door paragraph (`#### Tooltip` in `guides/veneer.md`)
The paragraph is the subjective lane's part 5 plus the release sentence. The E13 sentence is unchanged, and the class TSDoc carries the same text in its own paragraph. The `hide` row of the event table reads: "Before the `shown` token leaves; prevention refuses an ordinary hide, and after a prevented platform hide has re-promoted this tip once, its next platform close conceals it despite prevention".
> A call runs each write, dispatch, element move, and sanitizer call of its change as one step. After every step, every content function, and every await, it reads that the tooltip is live and that no later call started. From the tip's insertion until its removal, it also reads that the tip is in the container it went into and carries the `shown` token exactly when the call expects it: from the show's token write on, and until the hide's token removal. A build calls every content function before it writes anything. A call that finds any of these false stops, writing, moving, and dispatching nothing more, and resolves `false`. A build that stops returns every element it moved into the unfinished tip, and a tip that other code moved stays where that code put it. Destruction, a hide's removal, and a content element's return move a node only while it is still where the tooltip put it. A tip or an element that a listener or reaction moved, including a listener to the platform's closing `beforetoggle` event, is left there, and every attribute the tooltip wrote is still restored. The change is released before its completed event is dispatched, so a listener may start another change, and that change is never undone.

## Instrument table

Retained as `j-tooltip-mutations-4.log.txt` (the final whole run, `Tooltip.ts` at hash `73204fe1…`): the door rows ("the door reads no container" `JOINED`, "the door reads no token" `EXACT`, "the show re-reads no refusal after its dispatch" `EXACT`, "the inserted step reads no door" `JOINED`, "a show runs while a change is in flight" `JOINED`, "the build reads no door after a content function" `EXACT`, "the hide removes a tip a reaction moved during the wait" `JOINED`, "the show completion reads no door" `EXACT`), the P rows (P1 `EXACT`; P2 two rows `JOINED` and `EXACT`; P3 `EXACT`; P4 `EXACT`; P5 `JOINED`; P6 `EXACT`; P7 `JOINED`), "fill runs while a change is in flight" `EXACT`, "a throw returns nothing home" `EXACT`, "the completion releases after dispatch" `EXACT`, the token-write rows ("the token removal step reads no door", "the token step reads no door", "the fade token step reads no door" `EXACT`; "the id step reads no door" `MISSED`, see the observations), the round-3 carries ("no record precedes the move" `JOINED`, "the origin is captured before the move and published after it" `EXACT`, "the allowlist moves href from the a element to every element" `JOINED` in `NativeSanitizer.test.ts`, "a failing descendant is not recorded" `EXACT`, "the modal ancestor is found by the default token" `EXACT`), every other round-3 row carried by name, the `GREEN?` rows at 0 failed for `Tooltip.test.ts` (51), `Placement.test.ts` (18), `NativeSanitizer.test.ts` (7), `helpers.test.ts` (45), `validators.test.ts` (28), `parsers.test.ts` (24), and `index.test.ts` (3), and `receipt: restored byte for byte`.

Five round-3 rows were renamed and re-anchored rather than dropped:
- "the show dispatch door is dropped" became "the show re-reads no refusal after its dispatch".
- "the inserted door is dropped" became "the inserted step reads no door".
- "the build reads no door between a content function and its move" became "the build reads no door after a content function".
- "hide removes a relocated tip" became "the hide removes a tip a reaction moved during the wait".
- "the allowlist admits a global href" became the corrected claim-6 row.

## Scoped chain (`tmp/j-tooltip/acceptance-4.sh`, run once; retained as `j-tooltip-acceptance-4.sh` and `j-tooltip-acceptance-4.log.txt`)
```
chromium 153.0.8010.12
check exit=0 | npm run check:src:browser
check-tree exit=0 | npm run check
lint exit=0 | npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
format exit=0 | npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
tooltip exit=0 | npm run test:src:browser -- tests/src/browser/Tooltip.test.ts
sanitizer exit=0 | npm run test:src:browser -- tests/src/browser/sanitizers/NativeSanitizer.test.ts
browser exit=0 | npm run test:src:browser
guides exit=0 | npm run test:guides
policy exit=0 | npm run test:policy
```
The test steps reported these counts:
- **tooltip:** `Tests 51 passed (51)`
- **sanitizer:** `Tests 7 passed (7)`
- **browser:** `Tests 695 passed (695)`, the one whole-suite run
- **guides:** `Tests 19 passed (19)`
- **policy:** `Tests 109 passed | 1 skipped (110)`

The instrument from the offcanvas worktree (`tmp/j-offcanvas/mutations-2.py`) was running on the same host during my runs.

## Status and diffstat
```
 M guides/veneer.md
 M src/browser/Placement.ts
 A src/browser/Tooltip.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/parsers.ts
 A src/browser/sanitizers/NativeSanitizer.ts
 M src/browser/types.ts
 M src/browser/validators.ts
 M tests/src/browser/Placement.test.ts
 A tests/src/browser/Tooltip.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/parsers.test.ts
 A tests/src/browser/sanitizers/NativeSanitizer.test.ts
 M tests/src/browser/validators.test.ts
 17 files changed, 4321 insertions(+), 31 deletions(-)
```
Against the base, the four owned files read: `guides/veneer.md` 297, `src/browser/Tooltip.ts` 848, `src/browser/types.ts` 45, and `tests/src/browser/Tooltip.test.ts` 2042. The 13 other files have diffs identical to the retained round-3 diff, apart from index lines. `git diff --check` is clean on the owned files.

## Observations on the brief's unknowns
- **Build-write reachability:** a supplied sanitizer that builds the tip with `document.createElement` yields an upgraded custom tip. Its attribute reactions run at the token removal, the token add, the `fade` token, the id, and the show's `shown` token. The case's readings for destroy-at 1 to 5 are `[1,false,0,''] [2,false,0,''] [3,false,0,''] [4,false,0,''] [5,false,0,'Custom']`.
  - The token removal, token, and `fade` token rows are EXACT.
  - **The id row is MISSED, and I'm reporting it as indistinguishable rather than unreachable.** The write is reached, but the next step is the occupancy's release, whose own door reads the destruction before any observable write. That fits the objective lane's "Proof limit".
  - I did not measure whether the default fragment-parsing path ever upgrades a detached tip.
- **P3's relocated tip:** I re-ran the stopped writer's probe (`probe-promotion-2.log.txt`), which matches their `probe-promotion.log.txt`. After `show()` resolves `false`:
  - The tip is in `elsewhere`, `popover="hint"`, `:popover-open` true, and `data-popper-placement="right"`.
  - Its style is `border-width: 0px; border-style: none; padding: 0px; background-color: rgba(0, 0, 0, 0); overflow: visible; position: fixed; inset: auto; margin: 0px 0px 6px; position-anchor: --vn-placement-0; position-area: top; position-try: top, right, bottom, left;`.
  - The trigger still carries `anchor-name: --vn-placement-0` and `aria-describedby="vn-tooltip-0"`.
  - So `Placement`'s constructor finished all its writes on the relocated tip, and the tip stays open.
  - After `destroy()` the tip is still in `elsewhere`, its style and `popover` attribute are gone, and the anchor and `aria-describedby` are restored.

## Deviations (every other item is done)
1. **Tree repair:** the collided run's four leftover mutations were restored, as the top of this report describes. Two of them are in the off-limits `Placement.ts` and `helpers.ts`. My targeted re-run overwrote the collided `mutations-4.log.txt` before I copied it; the collided stdout survives as `mutations-4-collided.stdout.txt`.
2. **The resume note was stale:** the instrument and one chain run already existed.
3. **P5 and the re-entry case** can't be red against round 3, because round 3 already had those behaviours. Their instrument rows bind them instead, as the resume note allows.
4. **P1's row bares the listener step as well as the final release** (the stopped writer's revision). The ruling's single mutation is caught by the next step's door, with no observable write in between.
5. **P2's first mutation reddens at an earlier assertion than the ruling named:** `hide()` resolves `true`, which fails before the `parentElement` assertion runs.
6. **`TooltipEventMap.hide` no longer carries the clause that contradicted O1.** Where the partial edit and the ruling disagreed, the ruling won.
7. **I made no `prove` call**, and I ran no build, conformance, or setup proof.
