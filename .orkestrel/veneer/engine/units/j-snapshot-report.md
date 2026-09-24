# J-SNAPSHOT report

Retained 2026-09-24 from the writer's returned report (`opus` on Opus 5.5, agent ae8fdf37c94c55f5e, round 1, base `afae42c`, worktree `tmp/worktrees/snapshot`). The mutation table the report carried verbatim is retained beside it as `j-snapshot-mutations.log.txt`, copied byte for byte from the worktree's `tmp/j-snapshot/mutations.log.txt`; the report's copy is replaced by that pointer and nothing else is changed. The Orchestrator applied the returned `Modal.test.ts` patch to the worktree after the report arrived (see the Orchestrator's note at the end).

**Outcome:** S1 to S4 are built and green in `HostSnapshot.test.ts`, and the mutation instrument ends with `restored byte for byte`. There is one deviation. `tests/src/browser/Modal.test.ts` has a case that asserts the old E13 bound, so it goes red. That file is report-only, so its patch is returned under Shared-file patches. Until that patch is applied, the whole browser suite shows 1 failed and 647 passed. All runs used Chromium 153.0.8010.12. I made no call to the `prove` tool, because its server is not reachable from a subagent.

## Files touched

Worktree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot`

- `src/browser/HostSnapshot.ts`:
  - A presence record for `class` and for `style`, shared by every snapshot that saves on an element. It replaces the per-snapshot `classed` and `styled` entries and their stamps.
  - The re-entry hand-off: a nested restore also writes what the interrupted restore still owns.
  - A `written` mark on the entry whose write is running, so a nested restore does not write it again.
  - Remarks rewritten to state the closed behaviour.
- `tests/src/browser/HostSnapshot.test.ts`: the two cases that pinned the bound now assert the closed behaviour, and six cases are new. It also imports `scene`, with an `afterEach` that clears it.
- `src/browser/types.ts`: only the `HostSnapshotInterface.restore` remarks changed (diff below).
- `guides/veneer.md`:
  - § Ownership and restoration: both bounded sentences are replaced with the closed behaviour.
  - `#### Dropdown`: the re-entry bound sentence now states the closed behaviour.
  - Modal's presence paragraph: the bound is replaced with the closed behaviour.
- Instruments and logs, all under `tmp/j-snapshot/` (git ignores this folder): `mutations.py`, `acceptance.sh`, `chromium.mjs`, `modal_patch.py`, and the logs.

## Per obligation

**S1: the shared presence record.**
- The record lives in a static `#presence: WeakMap<HTMLElement, Map<'class' | 'style', { present, holders }>>`.
- The first save reads `hasAttribute`, and each later save adds its snapshot as a holder.
- Only the last holder to leave judges the removal. It leaves after its own token or property writes.
- When a snapshot saves again during its own restore, it takes its holding back (`#hold`). That restore then leaves the judgment to the snapshot's next restore.

The cases that pin it:
- `removes the class attribute the first save found absent when a restoration a button write starts restores the last token` (interleaving A)
- `removes the class attribute the first save found absent when the overlapping restoration empties the list after the nested one returns` (interleaving B)
- `removes the class attribute of a trigger a button and a collapse share when the button restoration destroys the collapse` (real `Button` and `Collapse`)
- `removes a class or style attribute the first save found absent once every snapshot that saved on the element restores, in either order` (the sequential case, which is Modal's)
- Guard for the take-back: `keeps its share of the class record for a token it saves during its own restoration until it restores that token`

**S2: the write-back re-entry.**
- A nested `restore()` on the same snapshot walks every target that the snapshot's unfinished restores published (`#published`). It writes each one with the value held in its pending entry.
- It also leaves every presence record that those restores still hold (`#leaving`).
- The interrupted call, when it resumes, finds each target withdrawn and writes nothing more.
- An entry whose write is still running is marked `written`, and a nested restore skips it.

The cases that pin it:
- `writes every target an interrupted restoration still owns before a restore a reaction to one of its writes calls on the same snapshot returns`
- The Dropdown reproduction: `restores the whole placement before a dropdown destroy a reaction to the placement popover restoration calls returns`
- Guard for the `written` mark: `writes a target once when a reaction to that write restores the same snapshot again`

**Red reading.** Command: `npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts`, against the landed `HostSnapshot.ts`, before the fix:
```
 Test Files  1 failed (1)
      Tests  6 failed | 24 passed (30)
```
The failures were the four S1 red cases (`AssertionError: expected true to be false`), `expected [ [ 'changed', null, null ] ] to deeply equal [ [ 'two', null, null ] ]`, and `expected [ [ 'bottom', null ] ] to deeply equal [ [ null, null ] ]`. After this run I added the reverse order to the sequential case, so the instrument's `LANDED` row repeats the red reading on the final file (next section). The two guard cases pass on the landed source, as expected for guards.

**Green reading.** The same command after the fix:
```
 Test Files  1 passed (1)
      Tests  30 passed (30)
```

**S3: the bounded sentences.** They now state the closed behaviour in the class remarks, in `types.ts`, in § Ownership and restoration, and in `#### Dropdown` and `#### Modal`. `test:guides` is green.

**S4: the instrument.** The mutation table is retained as `j-snapshot-mutations.log.txt` (a `LANDED` row reading 6 failed of 30 against the landed source, then the rows "the presence record withdrawn early", "the removal judged per snapshot again", "the presence read at restore time rather than save time", "the record a save during its own restoration takes back is dropped" (`EXACT`), "the re-entry hand-off dropped" twice (`JOINED`, once read on the Dropdown reproduction), "the lifetime read dropped" (`EXACT`, 44 writes where 1 is expected), the `GREEN?` rows for `HostSnapshot.test.ts` at 30 and `Dropdown.test.ts` at 35, the digests agreeing, and `receipt: restored byte for byte`).

## Unknowns' answers

1. **Where the presence record lives.** It lives in its own static `WeakMap` keyed by element (`#presence`), not in `#pending`. The two have different lifetimes:
   - A presence record lasts from the first save until the last holder's token or property step.
   - A `#pending` entry exists only while a restore runs, and a save that takes it withdraws it.

   This is the smaller change: `classed`, `styled`, and their presence stamps leave `#pending`, and target stamps and precedence are untouched.
2. **The re-entry shape.** I chose the hand-off. The nested invocation completes the interrupted one's writes. The interrupted invocation stops through its existing ownership check before each target; that check is the "lifetime read" in this shape.
   - I added no separate "stop after the nested call" read. Every target the nested call writes is withdrawn, so such a read would change no outcome.
   - The hand-off needs the `written` mark. Without it, a reaction that runs on every write recurses: the "lifetime read dropped" row counts 44 writes where 1 is expected.
   - Takeover, first-save precedence, and the stamps are unchanged. The Dropdown suite is 35 of 35 green.

## `types.ts` change

```diff
@@ -343,27 +343,32 @@ export interface HostSnapshotInterface {
 	 *
 	 * @remarks
 	 * An attribute or a property recorded as absent is removed, and a class token recorded as absent
-	 * is taken off the list. State the snapshot never recorded keeps every consumer edit. A token's
-	 * first save for an element also records whether the element carried a `class` attribute, and a
-	 * property's first save records whether it carried a `style` attribute. The
-	 * writes run in a fixed order: class tokens, then the removal of each `class` attribute the
-	 * snapshot recorded as absent and the tokens left empty, then inline properties, then the removal
-	 * of each `style` attribute recorded as absent and left empty by the properties, and attributes
-	 * last. The snapshot owns what its restoration publishes: the targets it has still to write back,
-	 * each withdrawn as soon as it is written back. A snapshot saved for one of those targets while the restoration
-	 * runs, this snapshot included, records the value the restoration recorded rather than the
-	 * half-restored element, and the restoration then leaves that target to it.
+	 * is taken off the list. State the snapshot never recorded keeps every consumer edit. Every
+	 * snapshot that saves a class token on an element shares one record of whether the element
+	 * carried a `class` attribute, read at the first of those saves, and every snapshot that saves an
+	 * inline property shares one such record of its `style` attribute. The writes run in a fixed
+	 * order: class tokens, then the removal of a `class` attribute recorded as absent that the tokens
+	 * left empty, then inline properties, then the removal of a `style` attribute recorded as absent
+	 * that the properties left empty, and attributes last. Only the last snapshot holding a record
+	 * judges that removal, once its token or property writes are done, so no order of restorations,
+	 * overlapping or one after another, by engines of any class leaves the attribute present and
+	 * empty unless a write throws. The snapshot owns what its restoration publishes: the targets it
+	 * has still to write back, each withdrawn as soon as it is written back. A snapshot saved for one
+	 * of those targets while the restoration runs, this snapshot included, records the value the
+	 * restoration recorded rather than the half-restored element, and the restoration then leaves
+	 * that target to it.
 	 * Where two restorations overlap on a target neither has yet written back, the restoration
 	 * holding the earliest recording of that target writes it back, a taken value keeping the order
 	 * of the recording it came from, because the earliest recording holds the value the target
 	 * carried before either engine wrote it. A restoration that publishes a target another
 	 * restoration already wrote back writes its own recorded value.
-	 * A restoration whose write throws withdraws every target it has not written back, a target
-	 * whose earliest recording it held included, so no restoration writes that target back.
-	 * Each restoration judges the removal of a `class` or `style` attribute it recorded as absent
-	 * once, after its own token or property writes, so an overlapping or later restoration by another
-	 * engine can leave that attribute present and empty; the tokens and properties themselves are
-	 * restored unless a write throws.
+	 * A restore that a reaction to one of the restoration's writes calls on the same snapshot, as an
+	 * engine's `destroy` does, writes back every target the interrupted restoration still owns, so
+	 * nothing the snapshot recorded is left to write when that call returns, and the interrupted
+	 * restoration then writes nothing more.
+	 * A restoration whose write throws withdraws every target it has not written back, those of a
+	 * restoration it interrupted and a target whose earliest recording it held included, so no
+	 * restoration writes that target back.
 	 * @example
```

## Chain output (from `tmp/j-snapshot/acceptance.log.txt`, with each command's tail from its `chain-*.log.txt`)

```
Chromium 153.0.8010.12
check-src-browser exit=0 :: npm run check:src:browser
check exit=0 :: npm run check
oxlint exit=0 :: npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser
oxfmt exit=0 :: npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md
test-src-browser exit=1 :: npm run test:src:browser
test-guides exit=0 :: npm run test:guides
test-policy exit=0 :: npm run test:policy
```
- **`check:src:browser` and `check`:** `tsc` and `vue-tsc` printed only npm notices and no diagnostics.
- **oxlint:** printed no findings. A throwaway file containing `any` and `as` drew three errors, which shows the instrument is live. I deleted that file.
- **oxfmt:** `All matched files use the correct format.` and `Finished in 12555ms on 48 files using 16 threads.`
- **`test:src:browser`:**
  ```
   FAIL  |src:browser (chromium)| tests/src/browser/Modal.test.ts:608:2 > Modal > leaves an empty class attribute on the body when two modals holding different open tokens release in the order they took them
  AssertionError: expected null to be '' // Object.is equality
   Test Files  1 failed | 21 passed (22)
        Tests  1 failed | 647 passed (648)
     Duration  42.61s
  ```
  The `SyntaxError ... token provided must not be empty` on stderr predates this unit. It comes from the throwing-overlap case, and the baseline run printed it too.
- **`test:guides`:** `Test Files 1 passed (1)`, `Tests 19 passed (19)`.
- **`test:policy`:** `Test Files 1 passed (1)`, `Tests 109 passed | 1 skipped (110)`.

## Status and diffstat

```
 M guides/veneer.md
 M src/browser/HostSnapshot.ts
 M src/browser/types.ts
 M tests/src/browser/HostSnapshot.test.ts
 guides/veneer.md                       |  42 ++---
 src/browser/HostSnapshot.ts            | 274 +++++++++++++++++++--------------
 src/browser/types.ts                   |  37 +++--
 tests/src/browser/HostSnapshot.test.ts | 234 +++++++++++++++++++++++++++-
 4 files changed, 431 insertions(+), 156 deletions(-)
```

## Shared-file patches

**`tests/src/browser/Modal.test.ts`.** This case asserted the E13 bound. The red run received `null`, which shows the patched assertion holds. The patch is also saved at `tmp/j-snapshot/modal.patch`.
```diff
@@ -605,7 +605,7 @@ describe('Modal', () => {
 		expect(document.querySelectorAll('body > [inert]')).toHaveLength(0)
 	})

-	it('leaves an empty class attribute on the body when two modals holding different open tokens release in the order they took them', async () => {
+	it('removes the class attribute the body lacked when two modals holding different open tokens release in the order they took them', async () => {
 		const root = scene.mount(`
 			<div id="first" class="modal"><div class="modal-dialog"></div></div>
 			<div id="second" class="modal"><div class="modal-dialog"></div></div>`)
@@ -628,8 +628,7 @@ describe('Modal', () => {
 		expect(await one.hide()).toBe(true)
 		expect(Array.from(body.classList)).toEqual(['is-open'])
 		expect(await two.hide()).toBe(true)
-		// The E13 bound: the second restoration recorded the attribute present, so it keeps it empty.
-		expect(body.getAttribute('class')).toBe('')
+		expect(body.hasAttribute('class')).toBe(false)
 	})
```
No patch is needed for `tests/setupBrowser.ts` or `ROADMAP.md`.

## Deviation state

**Stopped, then completed and reported.** This falls under the brief's deviation contract: "a scoped check red you cannot close inside the owned files".
- **Expected:** every consumer suite stays green without edits.
- **Found:** `Modal.test.ts`, in the case titled `leaves an empty class attribute on the body…`, asserts the E13 bound, which this unit closes.
- **Done:** every obligation is done, and the fix is the patch in the previous section. The whole-suite green criterion is not met until that patch is applied.

**Needs a carrier (outside this brief's obligations, left unedited).** Two more guide sentences name J-SNAPSHOT-SHARED as the unit that closes a different bound: one shared record per saved target across engines.
- `#### Tab`, near "J-SNAPSHOT-SHARED closes that bound after W2 with one record per saved target across engines".
- `#### Carousel`, near "a bound the shared per-host record of J-SNAPSHOT-SHARED closes": a carousel's `pointer` token is written over by the old swipe's restoration.

Neither is the presence bound or the re-entry bound, and this unit does not close either one. After it lands, both sentences will promise work from a unit that did not do it.

No off-limits file or engine file was edited. `Dropdown.ts`'s own comment on the nested destroy is still accurate.

## The Orchestrator's integration note (2026-09-24)

The returned `modal.patch` file carries the header `+++ b/tmp/j-snapshot/Modal.test.ts`, so `git apply` in the worktree deleted `tests/src/browser/Modal.test.ts` and left the copy under `tmp/`. The Orchestrator restored the file from `HEAD` (`git show HEAD:tests/src/browser/Modal.test.ts > tests/src/browser/Modal.test.ts`) and copied the writer's patched copy `tmp/j-snapshot/Modal.test.ts` over it, having first read that the patched copy differs from `HEAD` in exactly the two hunks the report shows (title and the two assertion lines). The retained `j-snapshot-modal.patch` is the writer's file as returned. The Orchestrator's scoped gate run (`j-snapshot-gates.log.txt`) is the reading over the tree with the patch applied.
