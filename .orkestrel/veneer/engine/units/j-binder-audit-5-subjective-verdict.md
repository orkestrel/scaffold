# J-BINDER audit round 5 — the subjective lane's verdict, held by `reviewer` on Opus 5.5 (returned 2026-09-23, native subagent, 44 tool uses, 513 s; retained verbatim from the subagent's return text)

Lane: subjective, as the brief assigns. The `reviewer` alias ran on Opus 5.5 (`claude-opus-5-5`), the engine that wrote this round and proposed per-invocation ownership, so I attacked that half harder. I ran no command. Dispatch defect: none. The claims file names `j-binder-mutations-5-orchestrator.log.txt`, which is not on disk yet; the claim itself places that run after the lanes return.

# J-BINDER audit round 5: subjective lane verdict

## Numbered verdicts

**1. CONFIRMED.** I ruled the shape from source. The objective lane owns runtime correctness.

- **`Button.toggle`** (`C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/Button.ts`, around lines 97–107):
  - It reads `this.#controller.signal.aborted` before `classList.toggle`, again after it, and again after the `aria-pressed` write.
  - Each read returns `this.pressed`. Nothing is written or dispatched after a destruction.
- **The constructor and `destroy`:**
  - The constructor only saves (a read) and binds listeners. Its aborted-signal path ends in `destroy`.
  - `destroy` aborts, releases the claim, then restores. Nothing follows the restoration.
- **`ColorMode`** (`ColorMode.ts`, around lines 63–77):
  - `apply` reads `#original === undefined` before and after `setAttribute`.
  - `toggle` is `apply` followed by `return this.mode`, with no destroyed branch.
  - `destroy` sets `#original` to `undefined` before its one write, so a re-entrant `destroy` returns early.
- **No other write sequence lacks the re-check.** I searched `src/browser` for `setAttribute`, `removeAttribute`, `classList.*`, `style.*`, `dispatchEvent`, `append`, and `remove(`. The only write sites outside the three engines are in `HostSnapshot.restore`. `Delegate` performs no DOM write after it calls `engine.toggle()`.
- **The claim-1 proof** (`tests/src/browser/Button.test.ts`, case "stops a toggle whose own token write destroys the button…", around line 272) asserts `results` equals `[[false]]`, that `find` returns the third engine, that the third engine is unpressed, that the host has no `aria-pressed`, and that only one event fired.
- **Unknown 4 (can a component unit apply the guide's rule without the round-4 verdict?): yes for attribute and class writes.** The sentence around line 557 of `guides/veneer.md` names the trigger, the action, and two consequences a reader can check. Two gaps remain:
  - § Ownership and restoration never says what a "reaction" is. That is a bound.
  - The rule does not cover synchronous listener dispatch. That is referral R2.
- **Attacks that failed:**
  - A destruction during `new Button` in `Delegate.#activate`: the constructor writes nothing, so no reaction can run there.
  - A destruction during the `ColorMode` constructor's `apply`: the controller is not reachable until the constructor returns.

**2. BROKEN, on the design clause the brief gives this lane.** Every factual clause holds. The ruling is that the entry's owner becomes the snapshot. The landed per-call `invocation` object therefore breaks E6 ("superfluous stuff … dead code") and the derive-state law.

- **The facts hold** (`C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/HostSnapshot.ts`):
  - `restore` creates `const invocation = {}` (around line 99).
  - It publishes each record's key and the `classed` key under that object. `#publish` keeps the first publisher.
  - `#writeBack` writes only while it owns the entry, then withdraws the key.
  - `finally` walks the call's own `records` and `classes`.
  - `#take` withdraws through `entry.invocation`.
  - The re-entry, R1, R2, and throwing-write cases exist in `tests/src/browser/HostSnapshot.test.ts`, around lines 137, 168, 204, and 233.
- **Why no interleaving tells the two owners apart.** The two owners give different results only when one call acts on a key that another live call of the same snapshot owns. Three facts of the class rule that out:
  1. `restore` is synchronous. A nested call always finishes before the outer call resumes, so only the innermost call ever acts.
  2. `restore` clears `#records` and `#classes` before it publishes. A key therefore enters a nested call's captured lists only through a save made after the outer call started.
  3. Every first save calls `#take` before it records, and `#take` withdraws whatever entry exists for that key.

  A nested call's keys are therefore never keys the outer call still owns. The outer call's `#writeBack` and `finally` touch only its own captured keys, and those keys are either absent or owned by another snapshot by the time the outer call resumes. This argument depends only on synchronous nesting, so it holds for any source of re-entry: a custom-element reaction, a listener, or anything else.
- **The measurement agrees.** The unit's mutation `const invocation = this` (`j-binder5-mutations.json`, "entries owned by the snapshot, not the invocation") reads 12 passed of 12 in `j-binder5-mutation-results.json`. Its scope was `HostSnapshot.test.ts` alone (a bound). By the trace above, the `Button` and `Delegate` suites cannot redden it either.
- **What the per-call object buys: only a local argument, which the class makes redundant.** The re-entry proof is bound by the captured-list walk: "a nested restore withdraws every entry on the element" reads 1 of 13 red. The captured lists cannot be removed, because `#pending` is a `WeakMap` and `finally` cannot enumerate it. So the lists stay, and once they stay, the token has no observable effect.
- **The comment around lines 97–98 credits the wrong mechanism.** It says the token is what makes a nested restore withdraw only its own targets. The captured lists do that.
- **Does "each restoration invocation owns the targets" still hold with the snapshot as owner?** Yes, as behaviour. Each call writes and withdraws exactly the targets it captured, and no other call of the same snapshot can write or withdraw them.
- **Smallest correct change:**
  - In `restore`, delete `const invocation = {}` and its comment, and pass `this` as the owner.
  - Rename the `#pending` entry field `invocation: object` to `owner: HostSnapshot`. Rename the `invocation: object` parameters of `#publish`, `#writeBack`, and `#withdraw` to `owner: HostSnapshot`.
  - `#take` withdraws through `entry.owner`.
  - Rewrite the `restore` comment so it names the load-bearing mechanism: `finally` walks this call's captured records, and every save made in between took its target first.
  - Change "restoration invocation" and "invocation" to "restoration" in the `HostSnapshotInterface.restore` remark (`types.ts`, around line 279) and in the class remark's second paragraph.
  - Drop the "entries owned by the snapshot" mutation row, which becomes the code.
- **What over-correcting would break:**
  - Keep the owner comparison in `#writeBack` and `#withdraw`. It carries the first-publisher rule across snapshots and stops one snapshot's `finally` from withdrawing another's entry. "A taken target not skipped" reads 5 of 76 red.
  - Keep the captured-list walk in `finally`.

**3. BROKEN, on one guide sentence.** Every other sentence the claim names is true of the round-5 code.

- **The failing sentence.** `C:/Users/mikes/WebstormProjects/veneer-binder/guides/veneer.md`, around lines 551–553: "An engine constructed in reaction to any restoration write therefore records the host as it was before the destroyed engine touched it."
  - Round 5's withdraw-after-write (R1) makes this false whenever the reaction edits the host first.
  - The failing state is the suite's own R1 case (`HostSnapshot.test.ts`, around lines 168–202). `show` was absent before `first` touched the host. The reaction adds `show` and then saves it through `second`. After `second.restore()`, the test asserts `['show']`, so `second` recorded a state the host never had before the destroyed engine touched it.
  - The same happens at engine level: a Button host whose reaction to the `aria-pressed` write adds `active` and then constructs `new Button(host)`.
  - The sentence also contradicts its own premise, the preceding clause "a target already written back is read from the host".
  - **Right:** "An engine constructed in reaction to any restoration write therefore records none of the destroyed engine's writes: it takes each value the restoration has still to write back, and reads each target already written back from the host, edits you made included; no later write of the destroyed engine overwrites it."
  - **Carrier:** fold this into the claim-2 unit, not a separate prose round.
- **The sentences that hold:**
  - `save`'s description (`types.ts`, around line 259) matches `#take` and the § Methods `save` cell (guide, around line 233) word for word.
  - The `restore` remark's sentences on `classed` (`!classed && element.classList.length === 0`, and `hasAttribute('class')` or the taken `classed` entry), withdraw-after-write, self-take, and first-publisher all match the code.
  - The class remark's sentences all match the code.
- **Unknown 2: the two-sentence `save` description is the right shape.**
  - The handoff changes what `save` records, so it is a required fact. `writing.md` § Structure keeps a required fact in the main flow.
  - `documentation.md` makes the parity cell equal to the whole description paragraph.
  - `policy/no-malformed-summary` reads only the first sentence.
  - The passive "is recorded instead" is a wording bound.
- **Unknown 3: "restoration" and "restoration invocation" name one concept, a single call of `restore`.** The artifacts use a third term as well: "invocation" alone in the class remark and the comments. Unifying the three is a bound, and claim 2's ruling makes "restoration" the natural single term.

**4. UNRESOLVED.**

- **What source and files show:**
  - `j-binder5-red.log.txt` reads `Tests 5 failed | 127 passed (132)` with the five titles the claim names, so the report's "six" is one too many.
  - The Orchestrator's `j-binder-gates-5.log.txt` records `134 passed (134)`.
  - Every row in the report has an entry in `j-binder5-mutations.json` or `-2.json` and a matching result.
  - `j-binder5-mutate.mjs` writes each file's pre-edit text back after every run, around lines 16–17 and 37.
- **For each new proof, the mutation that must make it fail, and whether the assertions tell that mutation apart:**

  | Proof | Mutation | Assertions that tell it apart |
  | --- | --- | --- |
  | `Button` claim-1 proof | no re-check after the token write | B writes `aria-pressed` and dispatches, so `results` would read `[[true]]`, `hasAttribute('aria-pressed')` would be true, and `events.count` would be 2. Yes. |
  | `Button` `aria-pressed` proof | no re-check after the `aria-pressed` write | `events.count` would be 1. A mutation returning `pressed` instead of `this.pressed` also fails `toBe(false)`. Yes. |
  | `ColorMode` proof | no re-check after the attribute write | storage would read `'dark'`, and `toBe('light')` fails. Yes. |
  | Re-entry proof | nested restore withdraws every entry on the element | `data-state` stays `'changed'`. Yes. The proof does not tell the token apart from the snapshot, and nothing can (claim 2). |
  | R1 proof | a written target not withdrawn until the end | `second` takes the stale absent `show`, and the `['show']` assertion fails. Yes. |
  | R2 proof | a snapshot never takes its own pending entry | the first restore writes `'false'`, and `toBe('true')` fails. Yes. |
  | Throwing-write proof | pending targets never unpublished | `later` takes `'false'`, and `toBe('true')` fails. Yes. |

- **What leaves the claim open:**
  - The red readings and the mutation results are the unit's own instrument output.
  - `j-binder-mutations-5-orchestrator.log.txt` does not exist.
  - **Settled by:** that re-run reproducing a sample of the recorded reddening.

**5. CONFIRMED.**

- **Unknown 1:** `toggle` returns `this.pressed` on every mid-write path (`Button.ts`, around lines 102 and 104). The claim-1 proof records `false`.
- **The moved tallies match the files:**

  | Row | Round 4 (`j-binder4-mutation-results.json`) | Round 5 (`j-binder5-mutation-results.json`) | Added |
  | --- | --- | --- | --- |
  | a pending original not taken | 4/71 | 6/76 | the claim-1 and R2 proofs |
  | a taken target not skipped | 4/71 | 5/76 | R2 |
  | attributes before tokens | 2/48 | 4/53 | R1 and R2 |
  | Button: restore before releasing the claim | 5/62 | 6/64 | claim 1 |
  | the class-attribute record not handed over | 4/71 | 4/76 | none |

  The `Delegate`, `resolveOptions`, `resolveVocabulary`, and `recordCalls` rows are unchanged.
- **"Never unpublished" holds from source, independent of the files.** Every captured key reaches `#writeBack`, which either writes and withdraws or does not own the key. So `finally` changes the state only when a write throws. Without `finally`, the throwing case leaves `attribute:aria-expanded` published, and `later` takes `'false'`.
- **Bound:** the tallies themselves rest on the unit's files, and their re-run is claim 4's.

**6. CONFIRMED.**

- **The Orchestrator's run** (`j-binder-gates-5.log.txt`):
  - Every scoped gate exits 0: 134/134, policy, guides 19/19, and the build.
  - The ownership grep exits 1, which is the pass.
  - The old-name grep hits only the guide's Bootstrap `.bs.` conformance rows, around lines 91–97.
  - `check` is red on the three app files alone, around lines 128–131.
  - Every patch `apply --check` exits 0.
- **My residue grep** over `src/browser` and `tests` found no `Snapshot` without `Host`, `isHost`, `isButtonHost`, `#owns`, `#unpublish`, `BUTTON_ACTIVE`, `BUTTON_TOGGLE`, or `@deprecated`. The pattern was `[^t]Snapshot\b|isHost|isButtonHost|#owns|#unpublish|owner|@deprecated|BUTTON_ACTIVE|BUTTON_TOGGLE|BUTTON_SELECTOR\b|COLOR_MODE_ATTRIBUTE\b`. The only `BUTTON_SELECTOR` hits are in the off-limits app tests.
- **The status** equals the owned set.
- **E6:** the claim assigns the per-call `invocation` object to claim 2, which rules it out.

## Findings outside the claims

None.

## Attacked and held

- **A nested restore of another snapshot T while T owns a key the nested call of S captured:** S cannot publish it and skips it. The result is the same under either owner.
- **Re-entry from sources other than custom-element reactions** (listeners, `popover` removal, focus fixup): the claim-2 argument depends only on synchronous nesting, so it holds.
- **The `classed` key under a nested call of the same snapshot:** the first token save in the nested period takes it, so the outer call cannot collide with it.
- **Snapshot as owner under R2:** `#take` still withdraws the restoring snapshot's own entry, and the outer call skips it.
- **Adjacent behaviour that looks like a defect and is correct:** the throwing restore leaves `aria-expanded` as `'true'` and forgets the records. The class remark says "Restoring forgets the records first", and the test pins that behaviour.

## Referrals

- **R1 (to the objective lane): a reaction that calls the same engine's mutating method again, rather than destroying it, resumes the outer call with a stale local.**
  - **Interleaving:** the host is a custom element observing `class`, and a one-shot reaction to the first class change calls `button.toggle()`.
    - The outer `toggle` adds `active`, and `pressed` is `true`.
    - The inner `toggle` removes `active`, writes `aria-pressed="false"`, and dispatches `{ pressed: false }`.
    - The outer call resumes, not aborted, writes `aria-pressed="true"`, and dispatches `{ pressed: true }`.
    - The host ends with no `active`, `aria-pressed="true"`, and a last event claiming `true`.
  - `ColorMode.apply` re-entered with the other mode ends with the attribute and storage disagreeing in the same way.
  - Evidence: `Button.ts` around lines 101–105; `ColorMode.ts` around lines 65–69.
  - Rule whether this is reachable and whether it is owed now.
- **R2 (to the Orchestrator, for J-COLLAPSE's brief): the liveness rule covers writes, not synchronous event dispatch.**
  - A listener to a cancelable `show.vn.collapse` event runs inside `emitEvent` and can call `destroy`. A collapse that keeps writing afterwards repeats claim 1's defect through a door the guide's sentence (around line 557) does not name.
  - `Button` escapes this only because its dispatch is its last step. Even so, `toggle` then returns the written `pressed` rather than the live host state that the mid-write path returns.
- **R3 (to the Orchestrator): this is the third audit round at the snapshot-ownership seam.**
  - `quality.md` § Rounds and verdicts sets that as the budget.
  - The claim-2 change removes code, the prescription is exact, and the existing proofs bind every remaining mechanism. It can therefore close with a mutation probe rather than another cross-engine round.
  - The brief-5 criterion `owner: this` / `owner === this` is superseded by the claim-2 ruling. Retire it in the successor brief.

## Bounds (wording; no change owed)

- **One term:** "restoration invocation", "restoration", and "invocation" alternate across `types.ts`, the class remark, the comments, and the guide. Use "restoration" throughout.
- **"The first to publish it"** (`types.ts` around line 283; guide around line 554) uses an implementation verb the contract never introduces. "The restoration that started first" means the same thing.
- **"A snapshot saved for one of those targets"** is a save through a snapshot, not a saved snapshot. "The value the invocation recorded" is a value the snapshot recorded and the restoration holds.
- **`save`'s second sentence** is passive and repeats "recorded". "The first time the target is saved" reads false after a `restore` has forgotten the records.
- **The interface remark** omits that the `class`-attribute record passes over. The class remark states it.
- **§ Ownership and restoration** never says a reaction is a custom element's reaction, which runs inside every attribute, class, style, and child-list write.
- **`HostSnapshot.ts`, around line 37:** one comment line runs far past the others.
- **Claim 2's 0-of-12 reading** covered `HostSnapshot.test.ts` alone.

VERDICT: FAIL 2, 3, 4; outside the claims: none
