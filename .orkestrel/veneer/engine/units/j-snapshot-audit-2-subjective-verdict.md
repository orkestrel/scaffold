# J-SNAPSHOT audit round 2 — the subjective lane's verdict (`reviewer`, Opus 5.5, agent ab27c00b1b4bba731, retained verbatim 2026-09-24)

**Lane:** subjective. I held it as `reviewer` on Opus 5.5 (served as `claude-opus-5-5`), native and read-only, and ran no command. Opus 5.5 also wrote this unit.

**Dispatch defects**
- My brief again names "the delegate route as an API", `Delegate.ts`, `constants.ts`, `validators.ts`, `parsers.ts`, `helpers.ts`, and Bootstrap's sources. This unit has no delegate route and touches none of those files.
- `j-snapshot-gates-2.log.txt` again carries another unit's greps (`bs-wire-grep`, `plugin-rows`, `long-lines`).
- Round 1's verdict recorded both leftovers and said the round-2 briefs would be patched. I ruled on neither.

## Numbered verdicts

**1. CONFIRMED.**
- **Source check:** `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot/src/browser/HostSnapshot.ts` matches the claim at every named site.
  - `#leave` (around line 228) returns false when the snapshot is not leaving the record. It filters `#leaving`, removes this snapshot from the holders, forgets the record (and the element's map when it empties), and returns `!record.present` on every departure.
  - `restore` removes `class` when the list is empty (around line 159). It removes `style` when the inline style is empty and the attribute is present (around line 171).
  - The `finally` block leaves every remaining record without removing anything (around line 186).
- **The mutation and whether the case catches it:** round 1's `#leave` (`tmp/j-snapshot/HostSnapshot.round1.ts`, around lines 309–320) returns false while any holder remains. In the new R1 case the collapse still holds the record, so `class=""` stays, and `expect(trigger.hasAttribute('class')).toBe(false)` fails as "expected true to be false". That matches the recorded red reading. The green half is in the Orchestrator's gate run (649 passed).
- **Attacks that failed:**
  - An early departure followed by a later holder's token restore: `classList.toggle(name, false)` and `style.removeProperty` on an element without the attribute create no attribute. `toggle(name, true)` re-creates it, and the later departure removes it again when empty.
  - A record that read the attribute present: every `#leave` returns false, so nothing is removed.
  - The consumer adds a token between two saves: the list stays non-empty at each departure, so the consumer's token and the attribute survive.
  - A nested restore during the class-removal loop: the loop iterates the array it captured, and `#leave` re-checks the live `#leaving`, so nothing is left twice.

**2. CONFIRMED.**
- **Source check:** in the Dropdown reproduction, `delivered` collects every delivery. The observer is attached inside the reaction, before the outer restoration resumes. After the `await` the case asserts `delivered` is `[]`, then `takeRecords()` is `[]`, and `[[null, null]]` is kept.
- **The mutation and whether the case catches it:** a late `data-popper-placement` write happens synchronously before `hide()` settles. Its observer microtask is queued before the `await` resumes, so the record lands in `delivered` and the case fails. Round 1's shape threw deliveries away and its `takeRecords()` then read empty, which the `MISSED` control row shows.
- **Attacks that failed:**
  - A write after `takeRecords`: no write runs in the case after that point.
  - A target the filter excludes: no `attributeFilter` is set, and the menu and toggle both sit under `root`.

**3. CONFIRMED.**
- **Source check:**
  - `#hold`, `#depart`, the static `#join`/`#leave`, and the `owner` parameter are gone.
  - `#presence` is read only in its declaration, in `#join` (around lines 211 and 221), and in `#leave` (around lines 236 and 243).
  - `save` calls `#join` for `'class'` and `'style'` (around lines 128–129).
  - Both `new Map` calls carry type arguments (around lines 212 and 271). Every other `#pending` read goes through the typed `get`.
- **The widening probe:** the typed control line reports `TS2322`. The untyped reading is the writer's own, but the known subtype reduction of `Map<K, V> | Map<any, any>` to `Map<any, any>` agrees with it.
- **Names:** `#join`/`#leave`, `#joined`/`#leaving` now use one term for one action at one layer.

**4. BROKEN.** Two sentences state behaviour the code contradicts.
- **4a — `#### Tab`** (`guides/veneer.md`, around lines 1231–1233): "…and no two engines share the recording of one target."
  - The shipped code shares recordings across engines. `Modal.#opened` (`Modal.ts`, around lines 85 and 423–436) keeps one `HostSnapshot` for the body's `open` token, held by every modal that resolves it. `ScrollLock.#locks` (around line 35) and `Isolation.#claims` (around lines 34 and 123) do the same.
  - The guide contradicts itself: its own Modal paragraph (around line 2049) says "The modals of one document that resolve the same `open` token share one recording of it."
  - The clause also repeats the paragraph's earlier sentence "Each tab records a value when it first writes it" (around line 1225).
  - **What right looks like:** end the sentence at "…destruction leaves the list with the values the other tab wrote." or scope it to tabs: "because no two tabs share the recording of one target".
- **4b — the shared-record sentence has no lifetime.** Locations: `types.ts`, `HostSnapshotInterface.restore` remarks (around lines 346–349), and § Ownership and restoration (around lines 822–824).
  - Both say "Every snapshot that saves a class token on an element shares one record of whether the element carried a `class` attribute, read at the first of those saves." Neither says when the record ends. Only the class remarks say "the record is forgotten after the last of those snapshots restores".
  - **The interleaving that shows it:**
    1. A host has no `class` attribute.
    2. Snapshot A saves `active`, reading the attribute as absent, then restores. The record is forgotten.
    3. The consumer writes `class=""`.
    4. Snapshot B saves `show`. `#join` finds no record and reads the attribute present.
    5. B restores. `#leave` returns false, so `class=""` stays.
  - Read as written, the sentence says B shares A's absent reading and the consumer's attribute is removed. The code keeps it.
  - **What right looks like:** add the lifetime to both sentences: "…read at the first of those saves while no snapshot holds the record, and forgotten after the last snapshot holding it restores, so a later save reads the element again."
- **Attacks that failed:**
  - "judges" and temporal `once` are gone from the owned prose. "writes a target once" means one time, which is permitted.
  - The four F2 titles name no removed mechanism.
  - The `#### Carousel` sentence matches `Swipe.ts`: the constructor saves `pointer` (around line 67), and `destroy` restores it.
  - The `#### Modal` sentence holds for two tokens released in either order.
  - The `#### Dropdown` sentence holds against the folded code: `Dropdown.destroy` (around line 250) and `Placement.destroy` (around line 187) both still restore when called again during their own restoration.
  - No edited sentence still promises the last-holder rule.

**5. UNRESOLVED.**
- **Open clause:** the Orchestrator's replay, `j-snapshot-mutations-2-orchestrator.log.txt`, is absent. The replay settles every row reading, including the rows claims 1 and 2 cite.
- **What I confirmed:**
  - The writer's log carries `LANDED` at 1 failed of 31, the named `EXACT` and `JOINED` rows (the written-mark row at 44 against 1), `GREEN?` at 31, 35, and 40, matching digests, and the receipt. The controls log ends with the same receipt.
  - The gate log shows every listed gate at exit 0.
  - The status lists the five owned files and nothing else.
  - The added lines carry no `any`, `as` assertion, non-null `!`, `@ts-` directive, `eslint-disable`, access modifier, default export, or nested function declaration.
  - `HostSnapshot.ts` holds one class plus imports.
  - The report records no `prove` call.

## Findings fitting no claim

**F1 — test fixture tag names name a removed mechanism (E6: "no marker of an earlier shape").**
- **Where:** in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/snapshot/tests/src/browser/HostSnapshot.test.ts`:
  - `'vn-probe-snapshot-class-presence-stamp'` (around line 829);
  - `'vn-probe-snapshot-style-presence-stamp'` (around line 863);
  - `'vn-probe-snapshot-classed'` (around line 94), which names the deleted `#classed` key.
- **What is wrong:** presence records now hold `{ present, holders }` and carry no stamp. This round retitled these same cases under F2 because they named the stamp mechanism, but the fixture names still name it.
- **What right looks like:** name each fixture for what the case builds, for example `vn-probe-snapshot-class-overlap`, `vn-probe-snapshot-style-overlap`, and `vn-probe-snapshot-shared-class`.

## Attacked and held

- **A snapshot that saves during its own restoration without writing** (the take-back leaves `class=""`) cannot happen in shipped engines. Every engine calls `restore` only from `destroy`, after the abort, and reads the abort before it saves (`Dropdown.#refused`). `Modal` and `ScrollLock` restore their shared snapshot once, at the last release.
- **A live engine emptying the list after a partial restoration:** in the reverse R1 order, the collapse's `show` leaves `class=""` after the button's destruction. That empty list comes from the collapse's own write, not a restoration. The collapse's later restoration removes the attribute.
- **`holders` against `#joined`/`#leaving`:** they are not a derivable duplicate. No registry of snapshots exists to recompute holders from, and the record needs holders to stay alive while any snapshot still holds it.

## Referrals (to the objective lane)

- **R1 — repeated inline types.** S4' wrote each private shape a second time.
  - The `#pending` entry shape and the presence-record shape each appear twice verbatim.
  - `{ element, attribute }` appears twice, and `'class' | 'style'` six times.
  - Round 1 referred the same repetition, and the reconciled verdict gave it no carrier.
  - Rule whether `typescript.md` ("Put every reusable … type alias in the nearest authoritative `*/types.ts`") reaches these. Weigh that a `types.ts` home would make them public through the barrel.
  - A `let` declaration narrowed by assignment might avoid the type argument without repeating the shape.
- **R2 — the Dropdown proof drives a different path.** The `#### Dropdown` sentence describes a `destroy` called from a reaction during destruction's own restoration. The `HostSnapshot.test.ts` reproduction drives `hide()`. Check whether `Dropdown.test.ts` (around line 968) covers the destroy-within-destroy path, or whether the sentence rests on a path no test runs.

## Bounds (wording only, no finding)

- **Class remarks:** "Every restoration that recorded the attribute absent" (around line 18) implies only the first saver removes. The contract's wording is "whose record reads the attribute absent".
- **Removal sentence:** in § Ownership and in `types.ts` it is one sentence of about 70 words, and "after those writes are done" repeats the timing "when … leave it empty" already gives.
- **Modal paragraph:** it uses "presence record", a term § Ownership never introduces.
- **Carousel:**
  - The added sentence restates the preceding clause with a condition added.
  - "the destroyed carousel's swipe" and "the first swipe" name one thing two ways.
- **`#join` comment:** "until the restoration that writes the target that save records" is garbled.
- **`written`:** the name reads "written", while its comment says "whether its write has started".
- **Array spelling:** `#published: readonly HostSnapshotTarget[]` sits beside `ReadonlyArray<…>` elsewhere in the class.
- **Dropdown antecedent:** in the `#### Dropdown` paragraph, "that restoration" still has no clear antecedent. This was carried from round 1.

VERDICT: FAIL 4, 5; outside the claims: F1
