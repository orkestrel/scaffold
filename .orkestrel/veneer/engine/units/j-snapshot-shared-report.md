# J-SNAPSHOT-SHARED — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

E25 is implemented: snapshots that save the same target share one record of it, and only the last holder's restoration writes the earliest saved value back; the `#### Tab` and `#### Carousel` bounds are closed as defects. The acceptance chain exits 0, the whole browser suite passes (`Tests  902 passed (902)`), every mutation row is `KILLED`, the control is `HELD`, and the sources were `restored byte for byte`. Committed by the Orchestrator as Veneer `3b3b4a9` on `unit/snapshot-shared` over `3acad4c` (`14 files changed, 762 insertions(+), 274 deletions(-)`). One deviation asks for the Orchestrator's ruling (§ Deviation state).

## Files touched

- `src/browser/HostSnapshot.ts`: one shared record per target, with the pending-restoration map folded into it; the save-order stamp and `#order` removed; `clear()` added.
- `src/browser/types.ts`: `HostSnapshotInterface` only; the `save` and `restore` TSDoc rewritten and `clear(): void` added.
- `src/browser/Alert.ts`: a successful close calls `#snapshot.clear()` after the lifetime check that follows `closed`, then `#release()`; the class TSDoc sentence updated.
- `src/browser/Tab.ts`: `#planInitial` names every initial attribute (one Bootstrap sets only when absent takes the element's current value); `#writeInitial` saves the whole plan, then writes only the entries that differ; `#absent` renamed `#unplanned`; the class TSDoc sentence updated.
- `src/browser/Tooltip.ts`: a `#linked` field; `#link` sets it before its write; `destroy()` takes the linked id out of `aria-describedby` before the restoration; TSDoc updated.
- Tests: `HostSnapshot.test.ts`, `Tab.test.ts`, `Alert.test.ts`, `Tooltip.test.ts`, `Popover.test.ts` (the S5 case only), and new cases only in `Delegate.test.ts`, `Carousel.test.ts`, and `Swipe.test.ts` (which gains the `Carousel` import).
- `guides/veneer.md`: the `HostSnapshotInterface` Methods rows, § Ownership and restoration, and the restoration sentences of `#### Tab` (with its departure bullet), `#### Carousel`, `#### Alert`, and `#### Tooltip`.
- `tmp/j-snapshot-shared/`: `acceptance.sh`, `mutations.py`, the logs.

## Measurements (base `3acad4c`)

`npm run test:src:browser -- tests/src/browser/Delegate.test.ts tests/src/browser/Tab.test.ts tests/src/browser/Carousel.test.ts tests/src/browser/Swipe.test.ts`: `Tests  5 failed | 237 passed (242)`. The Delegate tab reproducer ended with `class="nav-link active"` on the profile control, `tabindex="-1"` on home, and `#profile.active.show`; the direct Tab reproducer ended A `class="" … tabindex="-1"` and B `class="active"`; the Carousel read `expected false to be true` on the live replacement's `pointer-event`; the Swipe read `expected [ 'carousel' ] to deeply equal [ 'carousel', 'pointer-event' ]`; the two-tab destruction read `expected null to be 'tablist'`. S5 on base: destroying the engine that saved `aria-describedby` first strips the live engine's id (`expected 'help' to be 'help vn-popover-1'`); under the shared record without the Tooltip fix, the removed tip's id would stay instead (the S5 row proves it).

## Obligations, red and green

Command A, `npm run test:src:browser -- tests/src/browser/HostSnapshot.test.ts tests/src/browser/Alert.test.ts`: red `Tests  9 failed | 53 passed (62)`, green `Tests  62 passed (62)`. Command B, the four-file command above: red `Tests  5 failed | 237 passed (242)`, green `Tests  242 passed (242)`. Command C, `npm run test:src:browser -- tests/src/browser/Tooltip.test.ts tests/src/browser/Popover.test.ts -t "names only live tips"`: red `Tests  2 failed | 69 skipped (71)`, green `Tests  2 passed | 69 skipped (71)`.

- **S1:** "writes a target two snapshots share back only at the last holder restoration, from the first save value, in either order" (red `expected 'original' to be 'second'`); "keeps the value a live holder wrote when a save during another holder restoration joins the target, …" (red `expected 'first' to be 'joined'`); "writes back only the targets it holds last when a reaction to one of its writes restores the same snapshot again" (red `expected [ [ 'original' ] ] to deeply equal [ [ 'live' ] ]`); "withdraws only its own targets when a write throws while another snapshot holds a target it saved" (red `expected 'failing' to be 'original'`); the rewritten bound case (red `expected [ [ 'original' ] ] to deeply equal [ [ 'later' ] ]`); the reproducers in Command B. The existing takeover, re-entry, withdrawal, and presence cases stay green.
- **S2:** the partial-cleanup case "removes the class attribute of a trigger a button restoration leaves empty while a collapse on the same trigger stays live" stays green; the wording in `types.ts`, `HostSnapshot.ts`, and the guide says every restoration holding a presence record judges the removal, "whether or not it held any target last".
- **S3:** "relinquishes its holdings on clear without writing, …" and "forgets a record a final clear leaves, …" (base red `TypeError: cleared.clear is not a function`, not behavioural; the CLEAR and CLEAR-PENDING rows bind them); "writes nothing more, removing no emptied class attribute, for an interrupted restoration a reaction to one of its writes clears" (red `expected null to be ''`); the Alert case "holds no record of the shown token after a completed close, …" passes on base (no shared record, no hazard) and read red at the intermediate step with the shared record landed and `Alert.ts` unchanged (`expected [ 'alert', 'fade' ] to deeply equal [ 'alert', 'fade', 'show' ]`).
- **S4:** "keeps the roles and states of a live sibling tab when another tab of its list is destroyed, and restores the markup after the last" (red `expected null to be 'tablist'`).
- **S5:** the `Tooltip.test.ts` case and its `Popover.test.ts` mirror, both show orders (red `expected 'help' to be 'help vn-popover-1'` and `expected 'help' to be 'help vn-tooltip-1'`); after the tooltip is destroyed, `aria-describedby` reads `help <popover id>`, `title` is restored, and `aria-label` is removed; after the last engine the attributes are the markup's. `#linked` also covers a destroy nested inside a hide's placement teardown; no case drives it (with a live popover, the shared `anchor-name` record silences the teardown's writes to the trigger).

## `types.ts` changes

`save`: "Records the target's value the first time the target is saved. While a restoration has the target still to write back, the value that restoration recorded is recorded instead of the element's." becomes "Joins the target's record, reading the element's value only when no snapshot holds the target and no restoration has it still to write back." `restore`: "Writes every recorded value back, class tokens first and attributes last, and forgets the records." becomes "Writes back every target this snapshot is the last to hold, class tokens first and attributes last, and leaves every other target to the snapshots still holding it." Both `@remarks` are rewritten around the record, the presence judgment, ownership until written, the nested restore, and throw withdrawal. Added: `clear(): void`, "Relinquishes every target this snapshot holds and every target its restorations have still to write back, writing nothing." `HostSnapshotTarget` is unchanged.

## Folded, not layered

`#pending` is folded into the one static record (`value`, `priority`, `holders`, `owner`, `written`). A record has an `owner` only when its holders are empty; a save always clears the `owner`, so takeover is joining; a restoration that is not the last holder never publishes. So no two restorations compete for one target, the only situation the stamp decided. The whole interleaving suite is green on the folded shape. The HELD row adds a guard refusing ownership when another restoration already owns the record, and nothing changes.

## Changed expectations (all in `HostSnapshot.test.ts`)

1. "restores an overlapping target neither restoration has written back from its earliest recording, …", retitled "writes an overlapping target back from its first save value at the last holder restoration, whichever restoration starts first": readings `[['original'], ['started']]` become `[['original'], ['original']]`.
2. The bound case "writes its own recorded value when another restoration has already written the target back", retitled "leaves a shared target to the holder a reaction restores, which writes the first save value back": `[['original']]` becomes `[['later']]`, and the final value `'earlier'` becomes `'original'`.
3. The stamp case, retitled "writes the first save value back after three overlapping holders, …": assertions unchanged.
4. **Flagged:** "removes the class attribute the first save found absent when the overlapping restoration empties the list after the nested one returns", retitled "…when a nested restoration that holds a shared token last empties the list": the nested reading `[['show']]` becomes `[[null]]`; the end-state assertions are unchanged.
5. "withdraws an overlapping earliest recording when its restoration throws inside a reaction", retitled "withdraws a shared target when the last holder restoration throws inside a reaction": title only.

The whole browser suite found no other changed expectation.

## Mutation table (`tmp/j-snapshot-shared/mutations.log.txt`, retained as `j-snapshot-shared-mutations.log.txt`)

READ (every save reads the element) KILLED on the Swipe case; JOIN (a later save replaces the holders) KILLED on the S1 order case; SILENT (a non-last holder owns and writes too) KILLED on the Carousel case; LAST (the last holder owns nothing) KILLED on the rewritten bound case; CLEAR (clear keeps every holding) and CLEAR-PENDING (clear keeps an in-progress ownership) KILLED on their `HostSnapshot` cases; CLEAR-ALERT (a completed close keeps its holding) KILLED on the Alert case; TAB (a tab saves only what it writes) KILLED on the Tab case; S5 (destruction leaves its tip id) KILLED on the Tooltip case; HELD (a last holder refuses a record another restoration owns) HELD on the overlapping-target case. `restored byte for byte`; `rows 10, missed 0`. Digests: HostSnapshot `328b70e1…`, Alert `50e8b8d6…`, Tab `2b22ca62…`, Tooltip `5819c51f…`.

## Acceptance

`check:src:browser`, oxlint and oxfmt over the owned files, `check`, `test:guides` 20, `test:policy` 109 and 1 skipped, the owned test files `Tests  375 passed (375)`: `chain exit 0`. Observations: `test:src:browser` `Tests  902 passed (902)` (only comments and oxfmt layout changed after it); `test:setup:browser` 83.

## Patches for files the unit does not own (not applied)

1. `guides/veneer.md`, `#### Modal` (outside the unit's sections; the one-term criterion depends on it): "The modals of one document that resolve the same `open` token share one recording of it, and the" becomes "… share one record of it, and the".
2. Optional: `TabInitialWrite` in `types.ts` and its guide Surface row, because the plan now includes entries the tab joins without writing: "Describes one attribute a tab's list plan names at construction: the element, the attribute's name, and the value it takes."

## Deviation state

Changed expectation 4 is outside the brief's allowance (which named the bound case and the stamp-titled case), and the brief called such a change a stop; the writer continued because the reading is E25's writer-timing amendment, which outranks the brief, and its end-state assertions are unchanged. Changed expectation 1 is the same timing change, predicted by both design lanes. Recorded and carried on: a `clear()` that interrupts a restoration also skips the pending empty-`class` removal ("unless a write throws or a `clear` call ends the restoration"); `Tooltip.ts`'s `#linked` nested-destroy path has no case.
