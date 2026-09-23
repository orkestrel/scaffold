# J-BINDER audit round 3 — the subjective lane's verdict (returned 2026-09-23 by `reviewer` on Opus 5.5, native subagent, 58 tool uses, 453 s; retained from the subagent's return text)

Lane: subjective, as the brief assigns. The `reviewer` alias ran on Opus 5.5 (`claude-opus-5-5`), the engine that wrote this round, so I attacked it harder. I ran no command. Dispatch defect: none.

# J-BINDER audit round 3: subjective lane verdict

## Numbered verdicts

**1. CONFIRMED** (ruled from the source; the objective lane owns this claim).
- In `C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/helpers.ts`, `resolveOptions`:
  - It reads `element.getAttribute(attributes[key])` for each key of `parsers`.
  - It layers defaults, then the declared attributes, then the constructor object.
  - It skips a constructor value that is `undefined`.
  - It reads no prefix and no JSON attribute.
  - It throws `AppError(code, { attribute: name, tag })`.
- `resolveVocabulary(code, defaults, guard, overrides)` builds one mutable local and freezes it once. `Button`, `ColorMode`, and `Delegate` all call it in the new order.
- A grep for `OPTION_PREFIX` over `src/**`, `tests/src/**`, `tests/setupBrowser.ts`, and `app/**` in the worktree finds nothing.
- Mutations named and checked:
  - "Attribute table ignored" (`data-bs-${key}`) makes the replaced-name proof read 5 where it expects 7.
  - "`undefined` applied" in `resolveOptions` fails the `toStrictEqual({ toggle: true, delay: 5 })` assertion.
  - The real `resolveVocabulary` mutation (`j-binder3-mutations-2.json`) makes the `Reflect.set(overrides, 'transition', undefined)` case throw.
  - The assertions tell each mutation apart from the passing case.

**2. BROKEN** on the residual clause. The mechanism clauses hold.
- **What holds:**
  - `Button.destroy` aborts, releases, then restores.
  - `HostSnapshot.restore` forgets its records, then writes tokens, removes each empty `class` attribute, writes properties, and writes attributes last. The class remarks state that order.
  - `Delegate#restore` sets `#held`, destroys the engine, and drives each held host through `#drive`, which calls a fresh `Button.find`.
  - The source is consistent with each red reading in `j-binder3-red.log.txt`:
    - Under the old order, a reaction's `new Button` throws `BUTTON_HOST_OWNED`, so `errors.calls` is not empty.
    - Under the old order, a dead engine's `toggle` leaves `events.count` at 1.
    - Writing in save order produces the `['aria-expanded', 'style', …]` record list.
  - Mutation "click driven at once" and the token-reaction proof: the fresh engine records `aria-pressed="true"`, and the old engine then removes it. So `getAttribute('aria-pressed')` reads null, and the assertion `toBe('true')` fails.
- **What fails, part 1: the residual reaches further than the report bounds it.** I traced this from the source and did not run it.
  - **Direct destroy under a live delegate.** A consumer runs `Button.find(host)?.destroy()` on an engine the delegate acquired, and the guide invites this ("drops every engine you destroyed directly"). A custom element's reaction to the token write then clicks the host. The trace:
    - `Delegate#activate` runs with `#held` undefined, because the delegate is not the one restoring.
    - `#drive` constructs a new `Button`, whose snapshot records `aria-pressed="true"`, the old engine's value.
    - The old restoration then removes `aria-pressed`.
    - The host ends pressed with no `aria-pressed`.
    - When the replacement is destroyed later, it writes `aria-pressed="true"` back onto an unpressed host, and that stale value stays.
  - **Nested delegates.** An outer delegate restores a host it acquired, and the reaction's click is heard first by an inner delegate constructed later. The inner delegate is not holding, so the same defect follows.
  - The report's bound ("constructs a replacement itself") misses both paths. The hold is per-delegate state, but the hazard is per-host snapshot state.
- **What fails, part 2: my ruling on the closure.**
  - The brief's example closure, stopping the old restoration when the host acquires another owner, is cheap but not correct. The replacement has already recorded the half-restored value as its original, so its own `destroy` still writes the stale value later.
  - A correct closure exists inside `HostSnapshot`. While a snapshot restores, it publishes its pending originals, keyed by element and target. A `save` of a pending target during that window takes the pending original, including the `class`-attribute bit. The restoring snapshot then skips each target another snapshot took over.
  - That closure:
    - covers every engine class and every path (direct, delegate, nested, reaction);
    - adds no public surface;
    - makes `#held` and `#restore` unnecessary, so `#release` could call `engine.destroy()` directly.
  - The Orchestrator decides whether that cost is "cheap". It needs its own proofs.
  - Failing that, the limit must be stated, and it is stated nowhere today. A grep of `src/browser/*.ts` and the guide finds no such sentence. `HostSnapshotInterface.restore`, `ButtonInterface.destroy`, the `HostSnapshot` remarks, and § Ownership and restoration all omit it.
- **Required change:**
  - Where: `src/browser/HostSnapshot.ts` (`save` and `restore`), `src/browser/Delegate.ts` (`#restore` and `#held`), and `guides/veneer.md` § Ownership and restoration.
  - Wrong: an engine constructed in reaction to a token or property write records a half-restored host and is then overwritten. This path is reachable through supported delegate configurations.
  - Why it matters: every component unit restores through `HostSnapshot`, and the stale `aria-*` values it leaves are wrong for assistive technology.
  - Right: either land the snapshot handoff, with proofs for a direct destroy under a live delegate and for nested delegates, and collapse the delegate's hold; or state the limit, with its full reach, on `HostSnapshotInterface.restore`, `ButtonInterface.destroy`, and in § Ownership and restoration.

**3. CONFIRMED.**
- `recordCalls(prototype, name)` returns `{ recorder, restore }`.
- `restore` redefines the saved original. `defineProperty` keeps the existing `enumerable` attribute, so a second call is identical to the first.
- `recordListeners` is built on it, and `Delegate.test.ts` "drops an engine a consumer destroyed…" calls it.
- A grep for `defineProperty`, `prototype.x =`, and `Reflect.set(` over `tests/src/browser` finds only `Reflect.set` on option objects, not on prototypes.
- `j-binder3-setuptest.diff` adds the export entry and the recorder case.
- Mutation checked: "original not called" reddens no owned proof (`j-binder3-mutation-results.json`, 22 of 22 pass). Only the off-limits patch's case tells it apart, so C3 closes only when that patch integrates.
- The name is finding F1.

**4. BROKEN.**
- **What holds:**
  - The four private methods exist and split as claimed.
  - `#mark(route: typeof Button)` is typed.
  - `ButtonSelectorMap`, `ButtonOptions.selectors`, the `BUTTON_SELECTORS` doc block, and its guide row agree word for word.
  - The `readTarget` and `readTargets` examples pass `{ target: TARGET_ATTRIBUTE }` with the comment.
  - The guide has the "once per click for each entity whose selector matches" sentence and the `signal` sentence.
  - `ButtonVocabulary` is a sound per-entity data interface in the `{Entity}{Noun}` form that `ButtonDetail` and `HostSnapshotTarget` use.
  - `NoInfer` reads well: `TKey` comes from `parsers`, and a missing key reports on the `attributes` argument.
- **What fails, part 1: the name `AttributeNames` breaks `names.md`.** Unknown 1 ruling:
  - `names.md` § Type-level identifiers says "Never pluralize type names." `EventHooks` is a landed precedent, not a licence for a new plural.
  - `AttributeNames` also breaks "One concept, one term": the entity-level key-to-attribute-name map is already `{Entity}AttributeMap`.
  - Right: `AttributeMap<TKey>`. Each `CollapseAttributeMap` is then an `AttributeMap<keyof CollapseAttributeMap>`.
  - Carry the rename to `helpers.ts`, the § Surface row, and the guide sentence "an `AttributeNames` value" under `## Engine`.
  - The unit re-runs the `surface` policy check for a fleet collision.
- **What fails, part 2: an inline type remains on a public signature.**
  - `resolveOptions`' parameter `parsers: { readonly [TName in TKey]: Parser<T[TName]> }` in `helpers.ts` is an inline mapped object type. It is the twin of the table this round named.
  - Right: declare it in `types.ts` with a singular name, for example `ParserMap<T, TKey extends keyof T & string>`, "Maps each declared option key to the parser that coerces its attribute value". Add TSDoc and a § Surface row, and use it in `resolveOptions`.

**5. UNRESOLVED.**
- The red log, the mutation files, and the result files are the unit's own instrument output.
- The report's rows map to entries, with two caveats:
  - Two entries share the name "resolveVocabulary: an undefined supplied value applied" and carry different edits and results. See referral R6.
  - The `recordCalls` rows rest on a deleted probe file.
- The instrument restores each edited file from its first read, `tests/setupBrowser.ts` included.
- `j-binder-mutations-3-orchestrator.log.txt` does not exist in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`. Settled by: that re-run reproducing a sample of the recorded reddening.

**6. BROKEN.**
- **What holds:**
  - The § Surface rows (`OPTION_PREFIX` gone; `AttributeNames` and `ButtonVocabulary` added; the summaries equal their paragraphs).
  - The status matches the owned set.
  - The gates, as the Orchestrator established.
  - A grep of the diff's added lines finds no `any`, `as`, non-null `!`, `@ts-`, `eslint-disable`, or access modifier; the only matches are prose.
  - I found no alias, re-export, or fallback (E6).
  - The § Delegation hold sentence and the § Ownership and restoration order sentence state what the code does.
- **What fails: the nested-option sentence contradicts the landed maps.**
  - Where: `C:/Users/mikes/WebstormProjects/veneer-binder/guides/veneer.md`, `## Engine`, the `resolveOptions` paragraph (around line 440): "An option that sits inside a group, such as a placement or a dismissal setting, has no attribute-table key of its own".
  - Wrong: in `types.ts`, `DropdownAttributeMap.static` feeds `placement.static`, `DropdownAttributeMap.offset` feeds `placement.offset`, and `ModalAttributeMap.escape` feeds `dismiss.escape`. Design verdict R11 maps attribute keys "to option paths".
  - Right: state that such an option has an attribute-table key but no top-level option key of that name, so the resolver cannot pair them by one key. The first engine that declares one rules how the attribute's value projects into the group.

## Findings outside the claims

**F1: `CallRecording` is a behavioral interface without the `Interface` suffix.**
- Where: `C:/Users/mikes/WebstormProjects/veneer-binder/tests/setupBrowser.ts`, the `CallRecording` interface (around line 928), and its use in `recordCalls`.
- Wrong: it declares `restore(): void`, and `names.md` requires the `{Entity}Interface` form for a behavioral interface, as `RecorderInterface` follows.
- Right: rename it to `CallRecordingInterface` in `tests/setupBrowser.ts`. The `recordCalls` doc block names no type, so the rename touches the declaration and the return type only.

## Attacked and held

- **Replacement at the last write:** the Button proof constructs at the `aria-pressed` removal and finds every value restored. Nothing follows that write, so the replacement's state stands.
- **Set mutation during `#release`:** an engine acquired by a held drive is visited in the same loop, found contained, and skipped.
- **The observer across a held drive:** `#acquire` re-observes a root it already observes, and `#settle` sees one engine owned, so it does not disconnect.
- **The `aria-pressed` reaction and the hold:** the "drives a live engine" proof passes when the click is driven at once, because it reacts to the last write. That matches the result files, where only "holds a click…" reddens.
- **`recordCalls` restore fidelity:** it keeps the WebIDL `enumerable: true`, and a second call is a no-op.
- **`ButtonVocabulary` passed as `ButtonOptions`:** its full maps satisfy the `Partial` groups, so a manual construction can spread it.

## Referrals

- **R1 (to the objective lane): held clicks outlive a destroyed delegate.** Traced from the source.
  - A reaction clicks the host, which is held, and then calls `delegate.destroy()`.
  - After `engine.destroy()` returns, `#restore` still runs `#drive`. It acquires a new `Button` into the cleared `#owned` and re-observes the root, so a destroyed delegate owns a live engine.
  - Rule it, and require `#restore` to drop held hosts when the controller has aborted.
- **R2 (to the objective lane):** a held host removed again before the restoration ends is acquired, toggled with an event dispatched, then restored in the same loop. Rule whether `#drive` must re-check containment.
- **R3 (to the Orchestrator; Unknown 3):** the restore order is a contract a component unit relies on. Grant `src/browser/types.ts` so it is stated on `HostSnapshotInterface.restore`, and the release-before-restore order on `ButtonInterface.destroy`. The class remarks and the guide are not the interface.
- **R4 (to the Orchestrator; Unknown 2):** the hold is Button-shaped.
  - `#held: HTMLElement[]` carries no route.
  - `#drive`, `#discard`, and `#owned` call `Button` directly.
  - J-COLLAPSE must generalize them, or drop them if claim 2's snapshot handoff lands. Name that in the J-COLLAPSE brief beside the round-2 R6.
- **R5 (to the objective lane):** settle claim 2's reach by a run on Chromium 153:
  - a consumer destroys a delegate-acquired custom element through `Button.find(host)?.destroy()`, and its `class` reaction clicks it;
  - nested delegates, where the inner one is constructed after the outer one acquired the host.
  - For each, assert `aria-pressed` after the restoration and after the replacement's `destroy`.
- **R6 (to the objective lane):** two mutation entries share the name "resolveVocabulary: an undefined supplied value applied".
  - The first, in `j-binder3-mutations.json`, rewrites the skip into a guard test. It is not the named mutation, and it reddens one case of 26.
  - The second, in `j-binder3-mutations-2.json`, is the real mutation and reddens three of 26. The report quotes the second.
  - Rule whether the record is acceptable as retained.

## Bounds (taste; no change owed)

- `Delegate#restore` reuses `restore`, which `HostSnapshot` uses for writing state back, to name "destroy under a hold". `#settle` reuses the verb of `settleAnimations` to mean "stop observing".
- `#settle(size)` makes each caller capture the size first. It exists so the disconnect count is a meaningful proof signal.
- `disconnects.recorder.count` stutters.
- `HostSnapshot#records` keeps an inline element type, the same class of type R3 removed from `Delegate#button`.
- Two guide lines are left unwrapped: the "attribute projects into the group" line (around line 442) and the § Delegation "drops every engine you destroyed directly" line (around line 517).

VERDICT: FAIL 2, 4, 6; outside the claims: F1
