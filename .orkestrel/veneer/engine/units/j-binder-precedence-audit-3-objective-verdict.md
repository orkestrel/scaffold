# J-BINDER-PRECEDENCE audit round 3 — the objective lane's verdict, held by `reviewer` on Opus 5.5 (returned 2026-09-23, native subagent, 41 tool uses, 564 s; retained verbatim from the subagent's return text; the lanes swapped because Astra wrote the unit)

Objective lane, held by `reviewer` on Opus 5.5 (the `opus` alias served `claude-opus-5-5`). This is a review of the source, the diff, and the retained records. I ran no command. Every trace is my own derivation. The only executed readings are the writer's own run journal at `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-binder-precedence-3.jsonl`, the Orchestrator's gate log, and the Orchestrator's readTag probe log.

1. **BROKEN.** Every clause holds under interleavings A and B, under the inherited-stamp case, and on every restoration path where no write throws. The throwing-write path, which the suite already tests, contradicts two clauses.
   - **Sites and wording.** The precedence sentence is verbatim at the `HostSnapshot` class remark, the `#publish` comment, the `HostSnapshotInterface.restore` remark, and the guide around line 559. The removal sentence is verbatim at the class remark, the interface remark, and the guide. The Orchestrator's gate log records the old-sentence grep at exit 1. The retitled overlap proof matches both of its halves.
   - **Interleaving A.** The case "writes its own recorded value…" follows my round-1 trace. `earlier` writes `data-state` back and withdraws it. Its `data-other` removal then starts `later`, which publishes into an empty slot and writes `earlier`. This matches "writes its own recorded value".
   - **Interleaving B.** `earlier` publishes `classed` at stamp 0 and replaces `later`'s stamp 1. It judges the removal on `['show']` and withdraws. `later`'s `classed` write-back then finds no entry, and the host ends at `class=""`. This matches "judges … once, after its own token … writes".
   - **Inherited stamp.** `replacement` takes stamp 1 from `first`, replaces `middle`'s stamp 3, and writes `original`. This matches "a taken value keeping the order".
   - **Unknown 1: yes, it holds for presence entries.**
     - `classed?.stamp ?? stamp` and `styled?.stamp ?? stamp` pass on the taken stamp.
     - When no `classed` entry is pending (its owner has written it back), the save reads presence from the host with a fresh stamp. That fresh read is itself the recording the value came from.
     - Presence records are not targets (see the `#classed` comment), so the sentence says nothing about them. The code applies the same rule, and the two presence-stamp cases pin it.
   - **Failing interleaving (the throwing write).** Consumer snapshots on a custom element that observes `class`:
     - `Z` saves token `''` (stamp 0) and property `height` (stamp 1, absent), then writes `height: 10px`.
     - `X` saves token `show` (stamp 2) and `height` (stamp 3, recording `10px`), then writes `show` and `height: 20px`.
     - `X.restore()` toggles `show`, and the reaction calls `Z.restore()`.
     - `Z` publishes `height` at stamp 1, replacing `X`'s entry (1 < 3). Its `classList.toggle('', false)` then throws `SyntaxError`, and its `finally` withdraws `height`.
     - The reaction reports the exception instead of propagating it, so `X` continues. `X`'s `#writeBack` finds no `height` entry and skips it.
     - Result: `height` ends at `20px`. No restoration writes it back, so "the restoration holding the earliest recording of that target writes it back" is false. `X` did not throw, yet it lost its property, so "the tokens and properties themselves are always restored" is false.
     - The same "always restored" clause also fails for a single snapshot, using the vector the suite's own case "withdraws every target it has not written back when a write throws" uses: a `''` token saved before a property leaves the property unrestored.
     - Under the landing's first-started rule, `X` would have written `10px`, so the stamp introduced this loss. It is reachable only through the public `HostSnapshot` with a malformed token, because `Button` validates tokens with `isClassToken`.
   - **Smallest correct fix (prose).**
     - At the class remark, the interface remark, and the guide, replace "the tokens and properties themselves are always restored" with "the tokens and properties themselves are restored unless a write throws".
     - At the four precedence sites, add: "A restoration whose write throws withdraws every target it has not written back, a target whose earliest recording it held included, so no restoration writes that target back."
     - Pin the preceding trace as an executed case, the way A and B are pinned. That case fails under the mutation that ignores the stamp.
     - Code alternative for the Orchestrator: have `save` refuse a token `classList.toggle` would reject, which removes the only throw vector. This changes the existing throw case, so it goes beyond this round's scope.

2. **CONFIRMED.** Each pinned case matches the round-1 interleaving it names and ends where that trace ends.
   - **The attribute case.** It has A's exact shape and ends at `earlier`, the value `X`'s engine wrote.
   - **The Button case.** It follows the door I traced for a Button and a Collapse. Here a consumer snapshot stands in for the Collapse and records `collapsed` with presence true. `Button.destroy()` judges the removal on `['collapsed']` and withdraws the record. The `aria-pressed` removal then runs `later.restore()`. The case reads `[['collapsed']]` and ends at `class=""`.
   - **The B case.** It ends at `class=""` after reading `[['show']]`.
   - **Mutations.**
     - Omitting `#withdraw` in `#writeBack` leaves `earlier`'s stamp-0 entry in place. `later` loses the comparison, skips, and `data-state` reads `original` instead of `earlier`. The `getAttribute('data-state')` assertion tells this apart (journal line 49).
     - Removing an empty `class` attribute at the end of each restoration removes `class=""` in both class cases. The `getAttribute('class') === ''` assertion tells this apart (journal line 51, `null` for `''` twice).
     - Each mutation was applied on its own and reddens its case by itself. Neither is caught only by these cases:
       - omitting the withdrawal also changes "records the live element…";
       - the removal mutation also removes the original `class=""` in "removes the class attribute it found absent…".
   - **Unknown.** `Button` is the only caller of `save` in `src`. It saves one token and one attribute at construction and restores only in `destroy`, so B needs consumer snapshots. The tokens in the B case are valid.

3. **CONFIRMED.** The fix closes both mutations that survived round 1.
   - **Style handoff.**
     - Unmutated: inside `first`'s `removeProperty`, `second` takes `height` (absent) and `styled` (absent). Its restore then removes the `style` attribute.
     - Mutation: `element.hasAttribute('style')` replaces the take branch. `second` reads the `style=""` still present during the write and records presence true, so the attribute survives.
     - The `hasAttribute('style') === false` assertion tells this apart (journal line 53).
   - **Class presence stamp.**
     - Unmutated: `replacement` inherits stamp 0 for `classed` and replaces `middle`'s stamp 1. It judges with presence absent and removes the empty attribute.
     - Mutation: the plain `stamp` gives `replacement` stamp 2, so it loses. `middle` judges with presence true and leaves `class=""`.
     - The `hasAttribute('class') === false` assertion tells this apart (journal line 55).
   - **Style presence stamp.** This is the same trace on `styled`. The `hasAttribute('style') === false` assertion tells it apart (journal line 57).
   - **Green after.** The Orchestrator's gate run passed 151 of 151.

4. **CONFIRMED.**
   - `readTag` assigns `value instanceof Element ? value.tagName : undefined` to `unknown` and returns the tag only when `typeof tag === 'string'`. The `@returns` sentence is verbatim.
   - The proxy case asserts `hostile instanceof Element` and then `readTag(hostile)` undefined.
   - The red reading is recorded twice: journal line 36 ("expected 23 to be undefined") and the Orchestrator's probe log (`readTag(proxy)=23`).
   - **Attacks that failed:**
     - a `String` object as `tagName` (`typeof` is `'object'`, so undefined);
     - a throwing getter, a revoked proxy, or a throwing `getPrototypeOf` trap (all caught);
     - `instanceof HTMLElement` in place of `Element` (the `svg` assertion reddens);
     - removing the `try` (the case with the throwing prototype trap reddens).
   - **Cross-realm element.** It fails this realm's `instanceof` and reads undefined. That was the round-1 bound, but the round-3 `@returns` sentence now contradicts it (F1).

5. **CONFIRMED.**
   - The `emitEvent` example passes `null`. `detail: T` and `cancelable: boolean` are both required, so the stop over the requested omission was correct.
   - Guide lines around 544 to 567 stay within the paragraph's width.
   - The Orchestrator's run shows oxfmt exit 0 on `guides/veneer.md` and `test:guides` at 19 of 19.

6. **UNRESOLVED.**
   - **Confirmed from the Orchestrator's gate log and the status file:**
     - the status lists the eight owned files;
     - `check:src:browser`, oxlint, oxfmt, `test:src:browser` (8 files, 151 of 151), `test:guides` (19), `test:policy` (109 passed, 1 skipped), and `build:src:browser` all exit 0;
     - the greps read as brief 3 fixes them;
     - `check exit=0`.
   - **E6 holds.** The diff adds no `any`, type-assertion `as`, non-null `!`, `@ts-`, `eslint-disable`, access modifier, or parameter property. `readTag` adds an exception boundary and narrowing, so it is not a wrapper, and `Button`'s inline block is deleted. `index.ts` exports it through `export * from './helpers.js'`.
   - **Report.** Report 3 names the thread id, the journal path, and the refused `prove` call.
   - **Open.** `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-precedence-mutations-3-orchestrator.log.txt` does not exist. The only `*mutations-3*` log is J-BINDER's, taken on tree `cea3359`. The replay clause (the styled-take, the two presence-stamp, the `readTag` guard, and the withdrawal mutations, with every source restored byte for byte) therefore has no independent evidence. That log settles the claim.
   - **Minor.** The gate log does not print the Chromium version.

**Findings fitting no claim**

- **F1: the `readTag` `@returns` sentence is false for a cross-realm element.** (`C:/Users/mikes/WebstormProjects/veneer-precedence/src/browser/helpers.ts`, `readTag`'s `@returns`.)
  - **What is wrong.** The sentence lists the only cases that return undefined: "the value is not an element, its tag name is not a string, or reading it throws". An element from a same-origin iframe is an element, has a string tag, and does not throw, yet it fails this realm's `instanceof Element` and reads undefined. In the other direction, `Object.create(Element.prototype, { tagName: { value: 'DIV' } })` is not an element, yet it returns `'DIV'`.
  - **Why it matters.** `.claude/rules/documentation.md` treats a false behaviour sentence as a defect of the same kind as a wrong return value.
  - **What right looks like.** Change the `@returns` sentence to: "The value's string tag name, or undefined when the value fails this realm's `instanceof Element` check, its tag name is not a string, or reading it throws." Add a case asserting undefined for an element created in an iframe's document.

**Attacked and held**

- **A reaction to a target's own write.** The target is written but not yet withdrawn. The docs define owned targets as "the targets it has still to write back, each withdrawn as soon as it is written back", and the handoff cases rely on that window. Read that way, sentence 1 governs the window:
  - an earlier-stamped inner restoration replaces the entry and writes its own value;
  - a later-stamped inner restoration skips, and the outer value stands.
- **Nested restorations.** A nested restoration always finishes before the outer one resumes, so an inner restoration that replaces an entry writes it, unless it throws.
- **Chains of stamps.** A chain of takes carries the original stamp. `<` and `<=` still cannot be told apart.
- **Test isolation.** The custom-element names are unique per case. `onTestFinished(() => button.destroy())` is idempotent.

**Referrals**

- **To the Orchestrator:**
  - The brief's "Already established" section cites a replay log that is absent (claim 6).
  - The claims file says "a prose finding is recorded as a bound, never as a finding". The brief admits a sentence that the code or the platform contradicts. F1 and claim 1's clauses fall under the brief's admission, so you rule on that classification.
- **To the subjective lane:** the wording of the fixes for claim 1 and F1.

**Bounds**

- **The "because" clause.** It is false where one consumer snapshot saves a target again after its own restoration and then overlaps a snapshot that recorded its first write: the earliest recording then holds that snapshot's own earlier write. Engines restore once, in `destroy`, so only reuse of a public snapshot reaches this.
- **"Judges … once".** In practice this means at most once. A restoration whose presence record loses to an earlier recording never judges, and the earlier recording's presence decides.
- **Not pinned.** Two outcomes follow from the traces but no executed case pins them:
  - the window of a target's own write;
  - interleaving A on `styled`.
- **Evidence limits.** Every mutation reading here is either derived or read from the writer's journal. None is independently replayed.

VERDICT: FAIL 1, 6; outside the claims: F1
