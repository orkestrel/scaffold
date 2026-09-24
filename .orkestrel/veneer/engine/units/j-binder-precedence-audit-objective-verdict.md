# J-BINDER-PRECEDENCE audit round 1 — the objective lane's verdict, held by `reviewer` on Opus 5.5 (returned 2026-09-23, native subagent, 35 tool uses, 507 s; retained verbatim from the subagent's return text; the lanes swapped because Astra wrote the unit)

Objective lane, held by `reviewer` on Opus 5.5 (the `opus` alias served `claude-opus-5-5`). This is a source-and-platform review: I ran no test, mutation, or probe. Each trace below is a derivation from the worktree source, the diff, and the retained logs.

1. **BROKEN.** The mechanism matches the claim. `#order` is class-static. Each record's stamp is `taken?.stamp ?? stamp`. Each `#classes` or `#styles` entry takes `classed?.stamp ?? stamp` or `styled?.stamp ?? stamp`. `#publish` replaces an entry only when `stamp < entry.stamp`. `#take` returns the whole entry. The diff leaves `#writeBack`, `#withdraw`, the self-take, and the `finally` walk untouched. The sentence stands in the class remark, the `#publish` comment, `HostSnapshotInterface.restore`, and the guide. The only "started first" hit is the test title's own clause, and the brief asked for it. The contract sentence and the retitled proof still promise more than the code delivers, in two interleavings. Neither one is a regression: the landing's first-started rule produces the same result in both.
   - **Interleaving A: the earlier-saved restoration has already written the target back.** This one breaks the precedence sentence.
     - Setup: a custom element observes `data-other`, with `data-state="original"`. Snapshot `X` saves `data-state` and then `data-other`, and its engine writes both. Snapshot `Z` saves `data-state` (recording `x`) and writes `z`. A one-shot reaction on `data-other` calls `Z.restore()`.
     - Trace: `X.restore()` writes `data-state` back to `original` and withdraws it. Its `data-other` write then fires the reaction. `Z.#publish` finds no `attribute:data-state` entry, so `Z` becomes owner and writes `x`.
     - Result: the target ends at `x`, the value `X`'s engine wrote, although `X` saved first and its restoration started first. This contradicts the sentence ("…the restoration whose snapshot saved that target first writes it back, because that snapshot recorded the value…") and the title of the test "restores a target two snapshots saved to the value the snapshot that saved it first recorded, whichever restoration started first".
     - The same door reaches the motivating Button and Collapse case on the `classed` record. Take a custom-element trigger with no `class` attribute that observes `aria-pressed` and destroys the collapse. The Button saves first (`active`, presence absent). The Collapse saves second (`collapsed` at `C:/Users/mikes/WebstormProjects/veneer-collapse/src/browser/Collapse.ts`, around line 323, presence present). `Button.destroy()` removes `active`, judges `classed` on `['collapsed']`, and withdraws it. Its `aria-pressed` removal then runs `Collapse.destroy()`. The Collapse's `classed` publishes into an empty slot with presence true, so the trigger ends `class=""`.
   - **Interleaving B, R8's other face: a later token write empties the list after the removal was judged.** This one contradicts the guide.
     - Setup: `X` saves token `a` (`class` absent) and adds it. `Z` saves `b` and `t`, both at stamps earlier than `X`'s later save of `t`, and adds them. `X` then saves `t`, recording it present. A one-shot reaction on `class` calls `X.restore()`.
     - Trace: `Z.restore()` removes `b` and fires the reaction. `X` takes over `classed` (earlier stamp), removes `a`, and skips `t`, because `Z` owns it at the earlier stamp. It judges on `['t']` and does not remove the attribute. `Z` then removes `t`, finds `classed` withdrawn, and skips it.
     - Result: `class=""` on an element that never had one. This contradicts the new guide sentence "An attribute recorded as absent is removed when its restored token or property list is empty" (`C:/Users/mikes/WebstormProjects/veneer-precedence/guides/veneer.md`, around line 548) and the class remark's "removes an attribute the engine's writes created when no token remains in it".
   - **R8 ruling.** The claim's R8 reading is true: the removal is judged after the writing restoration's own token writes, a later overlapping token write can recreate the attribute, and the second half of the classed case shows it. The guide states only that recreation half. For a Button and a Collapse sharing a trigger, both R8 faces are unreachable, because each engine writes one token on the trigger and the reaction fires inside that one write. Interleaving A is reachable for that pair, so the bound as documented is acceptable for R8 alone and not for the pair.
   - **Smallest correct fix.** Bound the sentence at the class remark, the `#publish` comment, `HostSnapshotInterface.restore`, and the guide to "targets neither restoration has yet written back". State that a restoration publishing a target another restoration already wrote back writes its own recorded value. Replace the recreation-only R8 sentence with the fact that removal is judged once, after the writing restoration's token or property writes. Retitle the overlap proof, and add executed cases pinning A and B.
   - **Alternative for the Orchestrator.** A mechanism fix is possible: keep a written-back marker carrying the stamp until the writer's `finally`. `#publish` refuses a later stamp against it. `#take` and `#writeBack` treat it as absent, which keeps R1's read-the-host rule. That fix must also coordinate the removal judgment (the original R8 invariant), because otherwise B's `class=""` survives it.
   - **Unknown 1.** Yes, a snapshot can hold a fresh stamp for one target and an older inherited stamp for another. This does no harm: `#publish` compares stamps only within one key across snapshots, and restore order is fixed by category.
   - **Unknown 2.** When a first token save takes a pending token entry but finds no pending `classed` entry, the `classed` stamp is the save's fresh counter value. That is right: the presence is then read from the live host at that save, so its order is that save's. The window exists only inside B, after the `classed` owner wrote back while another restoration still owns a token.
   - **Round-4 to round-8 paths.** The handoff, the re-entered restoration, R1's already-written target, the self-take, and the single-snapshot throwing write each publish into an empty slot, so the stamp leaves their outcomes unchanged. The stamp changed one outcome. An earlier-stamped inner restoration can replace an outer entry and then throw before writing it back. Its `finally` withdraws the entry, the outer then skips it, and no restoration writes the target back. The outer keeps running because a reaction's exception is reported, not propagated. The landing's outer restoration would have written it. Only a malformed token passed to the public `HostSnapshot` reaches this, because the engines validate tokens with `isClassToken`.
   - **A third snapshot saving inside a write.** The `replacement` in "preserves the save order of a value taken from a pending restoration" inherits stamp 1, replaces `middle`'s entry at stamp 3, and writes `original`.
   - **Proof binding (derived from the source).**
     - Overlap case, first half: stamp ignored (or `>` in place of `<`) reads `started` and ends `earlier`. It was red on the landing, which asserted `started`/`earlier` green.
     - Overlap case, second half: unconditional replacement reads `earlier` where `started` is expected. Presence-instead-of-owner in `#writeBack` also reads `earlier`. Presence-instead-of-owner in `#withdraw` lets `started`'s `finally` delete `earlier`'s entry, so the case ends `started`.
     - Classed case: stamp ignored leaves `class=""`.
     - Inherited-stamp case: discarding the taken stamp ends at `first`.
     - Each assertion tells its mutation apart from the passing run.

2. **CONFIRMED.**
   - **Mechanism.** The property branch takes `styled` or reads `hasAttribute('style')`. Restore runs tokens, `class` removal, properties, `style` removal (`!present && element.style.length === 0 && element.hasAttribute('style')`), then attributes. The TSDoc and the guide say the same.
   - **Attacks.**
     - A host without `style`: `removeProperty` leaves the block empty, the guard passes, and the attribute is removed.
     - `style=""`: presence is recorded true, so the attribute is kept.
     - An unrelated consumer property: `length` is 1, so nothing is removed.
     - An invalid property write never creates the attribute: `hasAttribute` is false, so nothing happens.
     - A consumer removing its own later property counts as a net-nothing edit, and removal is consistent with the contract.
   - **Presence read on Chromium 153.** Blink's `Element::removeAttribute` looks up an unsynchronized (dirty) inline-style attribute in the attribute list and does not find it. It clears the inline properties and returns with the attribute still dirty. The next read then materializes `style=""`. So the read is needed on Chromium. On an engine that serializes eagerly the read does no harm. This rests on Blink source knowledge, not a run.
   - **Mutation binding.** Each is told apart by `bare.hasAttribute('style')`, `empty.getAttribute('style')`, or `edited`'s `width` and attribute:
     - omitting the read leaves the synced `style=""`, and the assertion's own `hasAttribute` performs the sync;
     - ignoring the recorded presence removes `empty`'s attribute;
     - dropping the length check removes `edited`'s attribute, and `width` with it.
   - The write-order case's added `'style'` record binds that the removal happens at all. The report alone evidences the red-first runs; they agree with the derivation.

3. **CONFIRMED.**
   - `options?.[key] !== undefined` skips parsing. `{ delay: 0 }` resolves to `0` without a throw. A truthiness mutation (`if (options?.[key])`) would parse `invalid` and throw, so the `0` operand discriminates.
   - With `options` undefined, the helper throws `PROBE_OPTION_INVALID`.
   - With `{ delay: undefined }`, the attribute is parsed and kept. This is the contract's reading, because "a constructor value that is `undefined` keeps the layer beneath it". The key-presence mutation (`key in options`) is reddened by the existing "skips a constructor value that is undefined" case (expects `5`).
   - The landing threw on the new case's first call. The report's reading of `1 failed | 27 passed (28)` agrees with the file's 28 cases, which the builder's round-2 run counted.

4. **CONFIRMED.**
   - `readTag` (`C:/Users/mikes/WebstormProjects/veneer-precedence/src/browser/helpers.ts`, symbol `readTag`) catches `instanceof`'s `[[GetPrototypeOf]]` throw, which the proxy case exercises.
   - SVG reads `svg`. `null` and the look-alike object read undefined.
   - `Button`'s inline try/catch is replaced.
   - The export-list entry and the § Surface row are present.
   - Bound: a cross-realm element reads undefined although it is an element, the same as the code it replaced.

5. **CONFIRMED.** `CollapseVocabulary` sits beside `ButtonVocabulary` with readonly `classes`, `attributes`, and `selectors`, typed by the full maps. The `expectTypeOf` equality against `Required<NonNullable<CollapseOptions[...]>>` fails if a group or a readonly modifier is removed. The § Surface row is present.

6. **CONFIRMED.**
   - The DOM standard declares `dictionary CustomEventInit : EventInit { any detail = null; }`. A member passed as `undefined` counts as not present, so the default `null` applies, whether or not the detail was omitted.
   - The Collapse, Tooltip, Popover, Alert, and Toast maps carry `CustomEvent<null>`. A grep of `src`, `tests`, and `guides` finds no `CustomEvent<undefined>` in the worktree.
   - No guard in `validators.ts` compares `detail` to `undefined`; `isButtonEvent` tests `detail !== null`. The only engine dispatch is Button's structured detail. No guide fence reads a detail from these maps.
   - Correction: the platform proof constructs the event rather than dispatching it. That is equivalent, because `emitEvent` builds its event through the same constructor.

7. **UNRESOLVED.**
   - Confirmed from `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-precedence-gates.log.txt`:
     - the status names `guides/veneer.md`, `Button.ts`, `HostSnapshot.ts`, `helpers.ts`, `types.ts`, and the three test files, and nothing else;
     - every scoped gate exits 0, including 144 of 144 in the run at 20:23:10, which follows the builder's 20:22:13 edit;
     - both greps exit 1;
     - `check exit=0`.
   - The added lines carry no `any`, `as` assertion, non-null `!`, `@ts-`, `eslint-disable`, access modifier, or parameter property. No alias or dead path remains.
   - The report records the thread id, the journal path, and the refused `prove` call.
   - Open: the Orchestrator's mutation replay, `j-binder-precedence-mutations-orchestrator.log.txt`, does not exist in the units directory. The clause saying it reproduces the reddening therefore has no evidence yet. That log, with its restoration receipt, settles the claim.

**Findings fitting no claim**

- **F1: the presence records' take branch has no proof.**
  - Two mutations survive every case in `C:/Users/mikes/WebstormProjects/veneer-precedence/tests/src/browser/HostSnapshot.test.ts`:
    - replacing `styled === undefined ? element.hasAttribute('style') : styled.value !== undefined` with `element.hasAttribute('style')`;
    - replacing `classed?.stamp ?? stamp` or `styled?.stamp ?? stamp` with `stamp`.
  - No case saves a property during a restoration, and no case takes a presence entry and then competes it in an overlap. The `classed` value branch is bound by the handoff case; the `styled` twin is not.
  - The styled branch is observable. A property saved inside a restoration's property write would read `style` as present, and its later restore would leave `style=""`.
  - Fix: add a style handoff case modelled on the class handoff case, asserting `hasAttribute('style') === false` after the second restore. Add a presence-stamp case in which a taken `classed` entry wins an overlap.

**Attacked and held**

- A self-take followed by a nested restore republishes into an empty slot, and the stamp is irrelevant there.
- Two entries never carry the same stamp, because `#take` withdraws the source. `<` and `<=` therefore cannot be told apart, and neither needs to be.
- A restoration replaced by an earlier stamp while inside its own `#writeBack` ends at the earlier value. That write lands after its own, and its `#withdraw` finds another owner and does nothing.
- `'classed'` and `'styled'` cannot collide with a `category:name` key.
- `removeAttribute('style')` behind `length === 0` drops no property.

**Referrals**

- **To the Orchestrator:** choose between the contract bound and the written-back marker for claim 1's A and B. Removal coordination is the unit's R8 ruling, which the brief turned into a reported bound, and A reaches the Button and Collapse `classed` record.
- **To the subjective lane:**
  - Guide lines around 548 and 561 run past the wrap the rest of the paragraph keeps.
  - "An attribute recorded as absent" reads as covering ordinary attributes, which are removed whatever the lists hold.
  - The `emitEvent` example in `helpers.ts` still passes `undefined` beside maps now typed `null`.
  - `CollapseVocabulary` has no consumer in this worktree; R3 schedules one in C8.

**Bounds**

- Only `CollapseEventMap` has a type proof. Reverting another map's type argument while keeping its TSDoc leaves every test and the parity gate green; the brief asked for one map.
- The Chromium style-synchronization reading rests on Blink source, not a run.
- Every red-first and mutation reading is derived here. The report is the only evidence of the runs themselves, until the Orchestrator's replay exists.

VERDICT: FAIL 1, 7; outside the claims: F1
