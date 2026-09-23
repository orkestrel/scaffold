# J-BINDER audit round 2 — the subjective lane's verdict (returned 2026-09-23 by `reviewer` on Opus 5.5, native subagent, 45 tool uses, 416 s; retained from the subagent's return text)

Lane: subjective, as the brief assigns. The alias served Opus 5.5 (`claude-opus-5-5`). This model family also wrote the round, so I attacked it harder for that reason.

# J-BINDER audit round 2: subjective lane verdict

**Dispatch defect:** none. The brief asks for the verdict as my final message and assigns no command.

## Numbered verdicts

**1. CONFIRMED.**
- A grep over `src/browser/**`, `tests/src/browser/**`, and `guides/veneer.md` in the worktree matched none of `Snapshot`, `isHost`, `generateId`, `BUTTON_ACTIVE`, `BUTTON_SELECTOR`, `BUTTON_PRESSED`, `COLOR_MODE_ATTRIBUTE`, `CONFIG_ATTRIBUTE`, or `LINK_ATTRIBUTE`. The leftover hits are the fixture string at `tests/src/browser/helpers.test.ts` (around line 374) and two prose mentions of `isInstance` (the `isButtonEvent` remark in `validators.ts` and a guide line).
- All three `instanceOf(HTMLElement)` calls sit inside function bodies: the `Button` constructor, `Delegate#activate`, and the filter in `readTargets`.
- The installed declarations match the unit's reason. `node_modules/@orkestrel/contract/dist/src/core/index.d.ts` declares `isInstance<C>(value, ctor): value is InstanceType<C & AnyConstructor<object>>` and `instanceOf<C …>(ctor): Guard<InstanceType<C>>`.
- Attack that failed: I looked for a module-scope `instanceOf(HTMLElement)` in any `src/browser` file, and found none.
- The `TS2345` and `TS2322` texts themselves rest only on the unit's report. The declarations are consistent with them.

**2. CONFIRMED.**
- The tables, freezing, and types are in `constants.ts` as claimed.
- `resolveVocabulary` iterates only `defaults` keys, skips `undefined`, throws `AppError(code, { key })` on a guard failure, and returns `Object.freeze({ ...resolved })`.
- `Button` resolves both groups before `#registry.claim`. `ColorMode` resolves before its first `getAttribute`. `Delegate` resolves before `addEventListener`.
- `Button` reads only `#classes.pressed`, and `aria-pressed` is inline. A table is stored only where a member reads it after construction:
  - `Button` keeps `#classes`, which the `pressed` getter and `toggle` read.
  - `Button` validates `selectors` and discards it.
  - `ColorMode` keeps `#attributes`, which `mode`, `apply`, and `destroy` read.
  - `Delegate` keeps `#button`, which it reads per click.
- Unknown 1 ruling: one resolver is right. `resolveClasses`, `resolveAttributes`, and `resolveSelectors` would differ only in the guard they pass, so they would be rename wrappers (`AGENTS.md` § No superfluous wrappers). The four positional parameters read acceptably, because each has a distinct type and a swap does not compile. Its parameter order disagrees with `resolveOptions`, which is finding F2.
- Attacks that failed: a caller edits the group after construction (the Button and ColorMode vocabulary cases distinguish the "kept by reference" mutation); a refused value leaves a claim (the refusal case asserts `Button.find(host)` is undefined).

**3. CONFIRMED** (from the source; the objective lane owns this claim).
- `isClassToken` is `typeof === 'string'` plus `/^[^\t\n\f\r ]+$/`, which is exactly the DOM's ASCII whitespace set.
- `isAttributeName` and `isSelector` run their platform call inside a `try`. A missing `document` also lands in the `catch`, so both are total.
- Each proof distinguishes its named mutation:
  - "Whitespace admitted" fails `isClassToken('is pressed')`.
  - "Admit every string" fails `isAttributeName('')`.
  - The `CSS.supports` swap fails `isSelector('.nav, .list-group')`. The proof carries its own control: `expect(CSS.supports('selector(.nav, .list-group)')).toBe(false)`.

**4. CONFIRMED.**
- `Delegate.ts`:
  - It routes by `this.#button.selectors.trigger`.
  - It drives through `Button.find(host) ?? this.#acquire(new Button(host, this.#button))`.
  - It keys the mark as `WeakMap<Event, WeakMap<object, WeakSet<HTMLElement>>>` with `Button` as the route.
  - `#release(delivered)` drops an engine when `Button.find(engine.host) !== engine`, and also releases uncontained hosts when `delivered` is true.
  - It disconnects the observer only when `size > 0 && this.#owned.size === 0`.
- The retitled case and the boundary case both exist.
- Unknown 4 ruling: the `Delegate` remarks and `### Delegation` state the drop "at each click and each delivery" in a form a consumer can rely on. `#release(false)` runs before the target check, so the drop happens on every click that reaches the root, not only routed clicks, and the prose matches that.
- Mutations named and checked:
  - "No prune at activation" reddens the destroyed-engine case, through the `other.click()` assertion on `disconnects.count` reaching 2.
  - "Observer never observes" reddens the boundary case.
  - A mutation that ignores the route in `#mark` reddens no case. That half of the key has no proof; brief B3 allowed this (see referral R6).

**5. CONFIRMED** (from the source; the objective lane owns this claim).
- `emitEvent` is one `dispatchEvent(new CustomEvent(...))` call.
- `BUTTON_EVENTS` is typed `EventWire<ButtonEventMap, 'button'>`, and `toggle` passes `false`.
- `bindEventMap` carries `TEntity`.
- `readTargets` reads `attributes.target`, then `href`.
- `resolveOptions` has the stated signature and no config branch.
- `generateId` is gone.
- The signal abort and already-aborted paths are both in the constructor.
- The claim is literally true. Its design fit is refuted outside the claims (F1).

**6. UNRESOLVED.**
- The red-first log and both results files are the unit's own instrument output.
- The Orchestrator's re-run log `j-binder-mutations-2-orchestrator.log.txt` does not exist yet in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- Settled by: that re-run reproducing a sample of the recorded reddening.

**7. BROKEN.**
- What holds:
  - § Surface parity (`test:guides` reads 19 of 19 at `j-binder-gates-2.log.txt` line 65).
  - The once-per-click-and-route sentence.
  - The same-synchronous-run sentence.
  - The destroyed-engine drop.
  - `find` on every engine class.
  - No mirroring.
  - Pre-change events cancelable, completed events not.
- What fails: the claim's final clause. The `resolveOptions` paragraph under `## Engine` (around guide line 431, "A declared key is a one-word option key, and its attribute is the prefix the function takes followed by the key; the prefix defaults to the `OPTION_PREFIX` constant") and the `OPTION_PREFIX` § Surface row state a fixed derivation, prefix plus key.
- The landed maps in `C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/types.ts` make each option attribute a replaceable per-key name. Most of those names are not prefix plus key:
  - `DropdownAttributeMap.dismiss` defaults to `data-bs-auto-close`, and `static` (which feeds `placement.static`) to `data-bs-display`.
  - `TooltipAttributeMap.animated` defaults to `data-bs-animation`, and `descendants` to `data-bs-selector`.
  - `ScrollSpyAttributeMap.smooth` defaults to `data-bs-smooth-scroll`.
  - `CollapseAttributeMap.parent` is documented as "the panel attribute that feeds the `parent` option".
- The paragraph also contradicts the guide's own `### Vocabulary`: "Every … attribute name an engine reads … is a default you can replace", and "A key names … the option an attribute feeds".
- Smallest fix: F1.

**8. UNRESOLVED.**
- What holds:
  - The status matches the owned set, and the gates are green in the Orchestrator's log.
  - Each departure names its bounding rule.
  - I found no alias, re-export, `@deprecated` tag, fallback, or wrapper.
  - The added lines carry no `any`, `as`, non-null `!`, `@ts-*`, access modifier, or parameter property. The `null` uses are DOM returns and adversarial guard inputs in tests.
- What is undecided: whether the patches are "exact and sufficient". That rests on the unit's report alone. The unit says it did not typecheck the patched app files, and it only expects `Showcase.test.ts(231,11) TS2358` to clear.
- Settled by: applying `j-binder2-app.diff` beside `j-binder-patch-buttonsection.diff` and running `npx tsc --noEmit -p tsconfig.json`.

## Findings fitting no claim

**F1: `resolveOptions` names option attributes by prefix plus key, which cannot serve the landed attribute maps.**
- **Where:** `C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/helpers.ts`, `resolveOptions` (the `prefix: string = OPTION_PREFIX` parameter and ``const name = `${prefix}${key}` ``). Also `constants.ts` `OPTION_PREFIX`, and the guide paragraph and row cited under claim 7.
- **What is wrong:**
  - Design verdict R11 says the merge reads "the attributes its resolved `attributes` table names (`parse{Entity}Attributes` takes that table)". `units/j-engine-shape-verdict.md` § Question 1 says the attribute-reading functions "receive the effective names".
  - The prefix axis cannot honour a replaced `attributes.parent`.
  - It reads names Bootstrap markup never carries, such as `data-bs-animated`, `data-bs-descendants`, and `data-bs-smooth`, wherever the one-word option key differs from Bootstrap's attribute suffix.
  - It cannot reach nested option paths such as `placement.static` or `dismiss.escape`.
  - The `prefix` parameter has no production caller. It was added this round with no consumer, against `AGENTS.md` § Minimal public API.
  - The error came from brief B2, which ordered the prefix. No design verdict holds it.
- **Why it matters:** this is the mechanism J-COLLAPSE and every later unit build on. As shipped, every entity would work around it or rewrite it.
- **What right looks like:**
  - `resolveOptions` takes the entity's resolved attribute table in place of `prefix`.
  - For each declared key it reads `element.getAttribute(attributes[key])`.
  - Delete `OPTION_PREFIX` and its § Surface row unless another consumer remains (E6).
  - Rewrite the guide paragraph to say the attribute is the one the entity's `attributes` group names for that key.
  - Replace the prefix proof with a replaced-name proof that mirrors the existing `readTargets` "reads the target attribute the table names" case.
  - Rule the nested-path mapping (Dropdown `placement.*`, Modal `dismiss.escape`) in the brief of the first unit that meets it.
- **Carrier:** the Orchestrator names exactly one unit, either a J-BINDER round 3 or J-COLLAPSE, before J-COLLAPSE dispatches.

**F2: the two sibling resolvers take their parameters in different orders.**
- **Where:** `C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/helpers.ts`, the `resolveVocabulary` signature.
- **What is wrong:** `resolveOptions(element, code, defaults, parsers, options, …)` puts the error code second. `resolveVocabulary(defaults, overrides, guard, code)` puts it last, and puts `defaults` first where the sibling has it third. Every entity constructor calls both.
- **Why it matters:** the round delivers a shared mechanism whose sibling leaves read inconsistently at every call site.
- **What right looks like:** one order across both, for example `resolveVocabulary(code, defaults, guard, overrides)`, which mirrors code, defaults, per-key check, then supplied object. Land it in the same unit as F1, because F1 reshapes `resolveOptions`.

**F3: the inline `MutationObserver.prototype.disconnect` recorder should be a shared helper now.**
- **Where:** `C:/Users/mikes/WebstormProjects/veneer-binder/tests/src/browser/Delegate.test.ts`, the case "drops an engine a consumer destroyed at the next delivery or click and stops observing its root".
- **What is wrong:** it re-implements the prototype-swap recorder that `recordListeners` in `tests/setupBrowser.ts` already holds.
- **Rules:** `.claude/rules/tests.md` § Shared test infrastructure: "Extract a … recorder … as soon as it could serve another test", and "Any duplicate or near-duplicate helper is a defect". Unknown 2 ruling: extract it now, not at a second consumer.
- **What right looks like:** one general prototype-method recorder in `tests/setupBrowser.ts` that takes an action, for example a `recordCalls(prototype, name, action)` function. `recordListeners` builds on it and this case calls it.
- **Carrier:** a unit granted `tests/setupBrowser.ts`, because this unit held it report-only and returned no patch for it.

## Attacked and held

- **Nested delegates:** two delegates with different `button.classes` groups on nested roots. The inner root hears first, constructs with its own groups, and the outer delegate's mark refuses the second drive. This is correct, and the guide's "by whichever delegate hears the click first" states it.
- **Consumer-constructed engine on a dead delegate engine's host:** `find` returns the consumer's engine, and the delegate drops only its own dead entry. This is correct.
- **Button validating a `selectors` group it never reads:** this looks like dead work, but it is correct under the landed contract. Question 1 fixes one entity group that a manual construction spreads, and the comment in the `Button` constructor states the reason. The contract wording is referral R1.
- **`Delegate` re-validating inside `new Button(host, this.#button)`:** the double resolve per acquisition is redundant but harmless.
- **`readTargets` taking `{ readonly target: string }`:** the entity's resolved table passes straight in. This is good ergonomics; the placement question is referral R3.

## Referrals

- **R1 (to the Orchestrator; the contract question from Unknown 3):**
  - `ButtonOptions.selectors` ("Replaces the selector the button matches with") and the `ButtonSelectorMap` summary in `types.ts` describe a match `Button` never performs.
  - Ruling: keep the member, as Question 1's single spread group requires, and reword the TSDoc to say the delegate routes button clicks by it.
  - The `BUTTON_SELECTORS` doc block in `constants.ts` and its § Surface row follow that rewording.
- **R2 (to the objective lane):**
  - `resolveOptions` returns `{ ...defaults, ...declared, ...options }`, so an explicit `undefined` in the constructor object overwrites a default.
  - `resolveVocabulary` skips `undefined`.
  - Decide whether the project's TypeScript settings admit such a value, and whether the two must agree.
- **R3 (to the objective lane):** the public parameter type `{ readonly target: string }` on `readTargets` and `readTarget` is inline rather than declared in `types.ts`. So is the type of `Delegate`'s `#button` field. Rule this against `AGENTS.md` "ALWAYS define reusable and public types in `*/types.ts`".
- **R4 (to the Orchestrator):**
  - The `resolveVocabulary` constraint `T extends Readonly<Record<keyof T, string>>` refuses the landed `DropdownClassMap`, whose `center` member is `{ down, up }`. I derived this from the source and did not compile it.
  - So the report's ground "one leaf serves every group of every entity" is false for that map.
  - Name the J-DROPDOWN brief as the carrier to extend the leaf or rule the map.
- **R5 (to the Orchestrator):** claim 8's patch sufficiency, settled by the command named under claim 8.
- **R6 (to the Orchestrator):** the route half of `Delegate`'s static `#driven` key has no proof. Carry the proof to the first unit that adds a second route (J-COLLAPSE), by name.

## Bounds (wording and taste; no change owed this round)

- `#release(true)` and `#release(false)` read opaquely at their call sites. Two private methods would read plainer.
- The `route: object` parameter in `#mark` could be typed as the engine constructor.
- "Once per click and route" uses a term the guide never defines. "Once per click for each entity whose selector matches" would say it directly.
- The `readTargets` and `readTarget` examples write the literal `'data-bs-target'` rather than the `TARGET_ATTRIBUTE` constant.
- The guide does not mention `ButtonOptions.signal`.
- The `resolveVocabulary` loop re-spreads the table once per key.

VERDICT: FAIL 6, 7, 8; outside the claims: F1, F2, F3
