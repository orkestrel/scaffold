# J-BINDER audit round 4 — the subjective lane's verdict (returned 2026-09-23 by `reviewer` on Opus 5.5, native subagent, 38 tool uses, 398 s; retained from the subagent's return text)

Lane: subjective, as the brief assigns. The `reviewer` alias ran on Opus 5.5 (`claude-opus-5-5`), the engine that wrote this round and proposed the handoff, so I attacked it harder. I ran no command. Dispatch defect: none.

# J-BINDER audit round 4: subjective lane verdict

## Numbered verdicts

**1. CONFIRMED.** I ruled the shape and traced the paths from source. The objective lane owns runtime correctness.

- **The shape matches the claim** (`C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/HostSnapshot.ts`):
  - `static readonly #pending` is a `WeakMap<HTMLElement, Map<string, { owner, value, priority }>>`.
  - `#key` builds `category:name`, and `#classed` is `'classed'`.
  - `restore` forgets its records, then publishes each target.
  - It writes in four passes (tokens, the emptied `class` attribute, properties, attributes), each guarded by `#owns`.
  - In `finally` it calls `#unpublish`, which drops an element's map when the map is empty.
  - `save` calls `#take` before it reads the element. A token's first save takes the `classed` entry.
  - `Button.destroy` aborts, releases the claim, then restores.
  - `Delegate` has no `#held` and no `#restore`. `#release` calls `engine.destroy()`, `#activate` drives at once, and `#unobserve(size)` disconnects when a pass that began with an owned engine ends with none.
- **Unknown 1 (where the registry lives): the class-static field is the right home.**
  - `architecture.md` § Declaration placement bars module-scope state from an implementation file.
  - A reachable registry object would be a public surface with no consumer. Every engine reaches the handoff through `HostSnapshot`.
  - The field follows the `Button.#registry` and `Delegate.#driven` precedent, and it gives one registry per realm.
- **Unknown 3 (does deleting the entry read as the takeover): yes, and deletion is the correct mark.**
  - I tried reassigning the owner to the saving snapshot instead of deleting the entry. That breaks two paths:
    - A third snapshot saved later would take the stale original instead of reading the taker's live state.
    - The taker's own nested `restore` would skip publishing, because the key would already be present.
  - Deleting the entry makes the restoring snapshot's `#owns` return false and lets a later save read the live element. The remark's sentence ("takes the target over, and the restoring snapshot then leaves that target alone") describes what the code does.
- **Paths I traced that held:**
  - Direct destroy under a live delegate with a `class` reaction click: the replacement takes `token:active`, `classed`, and `attribute:aria-pressed`, and A skips the rest.
  - A reaction that constructs a `Button` with an already-aborted `signal`: the replacement takes the originals, restores them itself, and A skips them.
  - Nested delegates: the outer delegate's `#release` destroys the engine, the inner delegate's click acquires a replacement, and the outer `#activate` stops at `#mark`.
  - `#release` iterating `#owned` while a click re-enters and adds to the set: the added engine's host is contained, so the loop skips it.
  - In every one, the replacement holds the originals and nothing overwrites it.

**2. UNRESOLVED.**

- **What the source shows:**
  - The four proofs exist under their titles: `HostSnapshot.test.ts` around line 93, `Button.test.ts` around line 224, and `Delegate.test.ts` around lines 512 and 563.
  - No "holds a click" proof remains.
  - Every mutation row in the report has one entry in `j-binder4-mutations.json`, each named once, and a result in `j-binder4-mutation-results.json`.
  - `j-binder4-mutate.mjs` writes back each file's first-read text after every mutation.
- **Do the assertions tell each mutation from the passing case? Yes, where I checked:**
  - "#owns always true": A writes `aria-expanded="false"` over `'second'`, and `toBe('second')` fails.
  - "#take never takes": the replacement records `true`, then A removes `aria-pressed`, and `toBe('true')` reads `null`. This matches `j-binder4-red.log.txt`.
  - "never unpublished": `third` takes `second`'s stale `'false'`, and `toBe('later')` fails.
- **What leaves it open:**
  - The red and green readings and the mutation results are the unit's own instrument output.
  - `j-binder-mutations-4-orchestrator.log.txt` does not exist yet. Settled by: that re-run reproducing a sample of the recorded reddening.
  - One clause has no proof binding it (see referral R2).

**3. CONFIRMED on the claim's clauses.**

- `HostSnapshotInterface.restore` (`src/browser/types.ts`, around lines 270–285) states the order and the handoff.
- `ButtonInterface.destroy` (around line 82) states release before restore. That matches `Button.destroy`, around lines 105–111.
- The § Methods cells at `guides/veneer.md` around lines 213 and 234 equal those descriptions.
- The class remark states the synchronous-reaction limit and says an observer delivery is a microtask.
- Attack tried: I compared each sentence to the four write passes and to `#publish`, `#owns`, and `#take`. No clause the claim names is false.
- A separate sentence in the same remark is contradicted by the code. It is F1.

**4. CONFIRMED.**

- **The renames landed:**
  - `AttributeMap<TKey>` is declared (`types.ts`, around line 180) and used in `helpers.ts` at `readTarget`, `readTargets`, and `resolveOptions`.
  - `ParserMap<T, TKey>` is declared with TSDoc (around line 192) and is `resolveOptions`'s `parsers` type.
  - `CallRecordingInterface` is in `tests/setupBrowser.ts` (around line 928).
- **The guide follows:** the § Surface rows and the `## Engine` sentence (around lines 437–444) match D4 and D5.
- **Attacks tried:**
  - My grep for `AttributeMap`, `ParserMap`, or `CallRecordingInterface` over `node_modules/@orkestrel/scaffold/dist/host/guides` found no fleet collision.
  - My grep for `AttributeNames` and `CallRecording` over `src/browser`, `tests/src/browser`, and `tests/setupBrowser.ts` found no residue.
- **The private types ruling holds.**
  - `architecture.md` § Declaration placement governs module-scope declarations, and a field annotation is not one.
  - Neither type is public.
  - The repetition is a bound.

**5. CONFIRMED on the named interleavings. Unknown 2 is ruled below.**

- **Attacks that failed:**
  - A reaction inside `save`: it only reads the DOM, and a read triggers no reaction.
  - A reaction inside `#take`: it touches no DOM.
  - `restore` re-entered on the same snapshot: `#records` is already cleared, so the call does nothing.
  - A taker's `restore` nested inside the reaction: it publishes the deleted key as its own, writes it, withdraws it, and A skips it.
  - A nested `#unpublish` emptying the element's map: A's later `#owns` returns false, and its `finally` finds no map.
- **Unknown 2 ruling: carry the edge in the J-COLLAPSE brief, not on `HostSnapshotInterface.restore` now.**
  - The edge is unreachable with one engine class per host.
  - Its right precedence is undecided. Letting the first publisher keep the target is correct only when that snapshot also saved first. When the nested snapshot saved first, it holds the true original, and the host ends at the outer snapshot's recorded value, which is the nested engine's written state.
  - A limit sentence written today would go stale when the first real pair decides that precedence.
- **J-COLLAPSE's brief must state the edge more widely than the report does.**
  - Every token save records the element's shared `classed` key.
  - So any two engine classes that both write class tokens on one host, such as a Button host that is also a collapse trigger with `collapsed`, share a target, even when their token names differ.
  - J-COLLAPSE is the first unit that makes that pair constructible.

**6. CONFIRMED.**

- **The guide's paragraphs:**
  - § Delegation (around lines 516–519) and § Ownership and restoration (around lines 537–551) describe the handoff.
  - A grep for `held`, `hold`, and `` `Snapshot` `` in the guide and for `#held`, `#settle`, and `Snapshot` in `src/browser` and `tests/src/browser` found no residue.
- **The surface:**
  - `index.ts` exports `HostSnapshot.js` and has no `Snapshot` re-export (E6).
  - The `ParserMap` and `AttributeMap` rows are present.
- **The added lines:** a grep of the diff's added lines for `any`, ` as `, a non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, and `@deprecated` matched prose only.
- **Established by the Orchestrator and not re-run:** the status, the gates, and the patch checks.

## Findings outside the claims

**F1: the interface says every emptied `class` attribute is removed, and the code keeps one the element already carried.**

- **Where:** `C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/types.ts`, the `HostSnapshotInterface.restore` remarks (around line 276): "class tokens, then the removal of each `class` attribute the tokens left empty".
- **Wrong:** `HostSnapshot.restore` removes the attribute only when the snapshot recorded it absent: `if (!classed && element.classList.length === 0)`. An element that carried `class=""` before the engine's first token write keeps it. The `HostSnapshot.test.ts` case "removes the class attribute it found absent…" asserts `empty.getAttribute('class')` is `''`. The interface also never says that a token's first save records whether the `class` attribute is present.
- **Why it matters:** this sentence is the contract every component unit restores through. The class remark and the guide already qualify it with "the engine's writes created".
- **Right:** "…then the removal of each `class` attribute the snapshot recorded as absent and the tokens left empty…". Carry the same qualifier into any sentence that restates it.

## Attacked and held

- **The class-static registry against a module helper or a reachable registry object:** held, as ruled under claim 1.
- **Deletion against owner reassignment as the takeover mark:** reassignment breaks a third save and a nested restore, so deletion holds.
- **A replacement constructed during a restoration with an already-aborted `signal`:** held.
- **Re-entry into `Delegate#release`'s set iteration through a reaction click:** held.
- **`Delegate.destroy` during a restoration:** the listener is aborted first, so no re-entrant acquire reaches the destroyed delegate.
- **The observer across a reaction click:** `#unobserve` compares against the captured size, and `#acquire` re-observes.

## Referrals

- **R1 (to the objective lane): an already-written target stays published until `finally`.** Traced from source, not run.
  - `restore` publishes every record up front and withdraws entries only in `finally`, so a target A has already written back can still be taken.
  - Trace: A's last write is the `aria-pressed` removal. A reaction to it first adds `active` to the host (a consumer edit made after A restored the token), then constructs `new Button(host)`.
  - The replacement takes `token:active` as absent and `classed` as absent, although the live host carries both. Its later `destroy` reverts the consumer's edit.
  - Without a restoration in flight, the same save reads `active` as present.
  - Rule whether this is a defect. If it is, the fix is to withdraw each target right after its write (and `classed` after the class pass). That fix also makes every "still to write back" sentence literal.
- **R2 (to the objective lane): the `entry.owner === this` clause in `#take` has no proof.**
  - The "pending original not taken" mutation replaces the whole condition, and no narrower mutation exists.
  - The clause fires only when a snapshot saves during its own restoration. That is reachable through a consumer-constructed `HostSnapshot`, which the barrel exports.
  - Rule which behavior is right, then add a proof or accept the clause as unbound.
- **R3 (to the Orchestrator): two retained files with near-identical names.**
  - The retained folder holds both `j-binder-mutations-4.json` (one row, "settleAnimations: abort not raced", from an earlier series) and `j-binder4-mutations.json`, which is this round's list.
  - Name the right file in the claim-2 re-run so the sample does not run against the wrong one.

## Bounds (taste; no change owed)

- **"Still to write back":** the interface remark, the guide (§ Delegation and § Ownership and restoration), and the `Delegate` remark say "still to write back" or "not yet written back". The code keeps written targets published until `finally`, which R1 rules on.
- **The `classed` entry:** it carries a boolean as `''` or `undefined`, with `priority: ''`, so that it can share the entry shape.
- **Repeated type:** the `{ value, priority }` pair recurs in the `#records`, `#pending`, and `#take` annotations.
- **The `#take` comment:** it does not say that withdrawing the entry is what makes the restoring snapshot skip the target and lets a later save read the element.
- **`HostSnapshotInterface.save`:** its description ("Records the target's value…") does not mention the handoff. Only the `restore` remarks state it.
- **`#unobserve`:** the name borrows the verb of `ResizeObserver.unobserve` for a conditional `disconnect`.

VERDICT: FAIL none; outside the claims: F1
