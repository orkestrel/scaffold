# J-BINDER audit round 1 — the subjective lane's verdict (returned 2026-09-23 by reviewer on Opus 5.5, native subagent `claude-opus-5-5[1m]`, 46 tool uses, 537 s; retained verbatim from the subagent's final message, HTML entities decoded)

---

Subjective lane, held by `reviewer` on Opus 5.5 (served model `claude-opus-5-5[1m]`). Opus 5.5 also wrote this unit.

**1. Ownership (R4): CONFIRMED.**
- **Attack:** I looked for a second claim that overwrites the owner, a stranger's release that succeeds, and a claim that lands after a hook is bound. None exists.
- **`Registry`:** in `C:/Users/mikes/WebstormProjects/veneer-binder/src/browser/Registry.ts`, `claim` checks `#owners.has` before `set` and throws `AppError(…, this.#code, { tag })`. `release` returns `get(host) === engine && delete(host)`.
- **`Button`:** in `Button.ts`, the constructor calls `Button.#registry.claim` after the `isHost` refusal and before `Snapshot.save` and `bindEventMap`. `destroy` releases the claim, and `static find` reads the registry.
- **Mutations:** the assertions in `Registry.test.ts` and in the `Button.test.ts` case "finds the live engine…" tell each named mutation apart from the passing code. Examples: `release(host, stranger)` expects `false`, and after a replacing claim `refused.success` would be `true`. The mutation runs themselves are the unit's own record. To confirm, you would apply each one and run `npm run test:src:browser -- tests/src/browser/Registry.test.ts` and the same command for `tests/src/browser/Button.test.ts`.

**2. Restoration (R4): CONFIRMED.**
- **Attack:** I looked for a second save that overwrites the first, an empty attribute recorded as absent, a lost property priority, and records surviving `restore`. None held.
- **Source:** in `Snapshot.ts`, `save` returns early on the `some(...)` match, and a token save sets `#classes` once per element. `restore` removes or sets each attribute, toggles each token, sets each property with its priority, removes a `class` attribute recorded absent when the list is empty, and then clears both stores. `Button` saves `BUTTON_ACTIVE` and `BUTTON_PRESSED` in its constructor and calls `restore` in `destroy`.
- **Mutations:** the assertions in `Snapshot.test.ts` tell each named mutation apart. The runs are the unit's own record, with the same settling command against `Snapshot.test.ts`.

**3. Delegation (R5): BROKEN.**
- **Failing interleaving:** all within one task, for example one async test body:
  1. `host.click()` — the delegate acquires the host.
  2. `host.remove()`
  3. `await Promise.resolve()`
  4. `root.append(host)`

  The removal queues the observer's delivery microtask before the `await` continuation. `#release` therefore runs first, finds the host outside the root, destroys the engine, and restores the host. After step 4, `Button.find(host)` is `undefined` and the pressed state is gone.
- **Evidence:** the diff's own green case "restores removed hosts at the observer delivery after their removal and releases their ownership" runs `remove()`, then `await Promise.resolve()`, then asserts the host is restored. It passes in your run (`j-binder-gates.log.txt`, 101 passed). That proves the release finishes within one awaited microtask of the same task.
- **What goes false:** claim 3's clause "a host removed and reinserted within one task keeps its engine". Also the guide § Engine › Delegation sentence "A host removed and reinserted within one task keeps its engine and its state…", the case title "keeps the engine and the state of a host removed and reinserted in one task", and R5's wording.
- **Smallest fix:** leave the code unchanged. Restate the guarantee as "removed and reinserted in the same synchronous run, before the observer's delivery microtask" in the guide and the case title. Add a boundary case to `tests/src/browser/Delegate.test.ts`: remove, `await Promise.resolve()`, reinsert, then assert `Button.find(host)` is `undefined` and the host is restored. That case is also the settling run.
- **Held within this claim:**
  - `static #driven: WeakMap<Event, WeakSet<HTMLElement>>` and `Button`'s `static #registry` are the right home for cross-instance state. A class file can't hold module-scope state, and a live instance isn't `constants.ts` data. Both are keyed weakly, so neither leaks.
  - The next-click release is gone from `#activate`.
  - `destroy` aborts, disconnects, and destroys every owned engine.

**4. Events (R2, R3): CONFIRMED.**
- **Attack:** I looked for a cancelable flag that is ignored, a return value other than `dispatchEvent`'s, a hook bound outside the wire table, a guard bypass, and a surviving `BUTTON_TOGGLE`.
- **Source:** in `helpers.ts`, `emitEvent` returns `host.dispatchEvent(event)` and defines each record field with `enumerable: true`. `bindEventMap` iterates `wire`, skips absent hooks, and runs `guard(event)` before the hook. `BUTTON_EVENTS` is `Object.freeze({ toggle: 'toggle.vn.button' })` typed `EventWire<ButtonEventMap>`. `Button.toggle` passes `false` for the cancelable flag and returns early after abort.
- **Rename sweep:** `isButtonHost|BUTTON_TOGGLE` over the worktree, excluding `node_modules`, returns no hit.

**5. Motion (R6): CONFIRMED.**
- **Attack:** I looked for an unfiltered infinite or paused animation, `Promise.all` in place of `allSettled`, a missing re-read, a missing abort race, and a leaked abort listener.
- **Source:** in `helpers.ts`, `settleAnimations` filters on `playState === 'running'` and finite `endTime`, and races `allSettled` against `aborted`. It loops while the signal is not aborted, so an already-aborted signal skips the loop. The `finally` block calls `controller.abort()`, which removes the listener. `reflow` reads `getBoundingClientRect()`.
- **Mutations:** the `helpers.test.ts` assertions tell each named mutation apart. For example, "no re-read" leaves the `tall` transition in `getAnimations()`, and "abort not raced" times out. Your gates log shows 101 of 101 passing on Chromium 153.0.8010.12.

**6. Selectors and ids (R15): CONFIRMED.**
- **Attack:** I compared `readTargets` line by line with `getSelector` in `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/dom/selector-engine.js` and `parseSelector` in `util/index.js`. They match on absent, empty, and bare-`#` fallback, the `#`-or-`.` gate, the full-URL fragment, the bare `#`, and the per-part `CSS.escape` regex.
- **Departures:** the function uses `trigger.ownerDocument` instead of the global document and returns HTML elements only. The guide records the HTML-only departure.
- **`generateId`:** it draws two `Uint32` values, and each value's base-36 form fits in 7 characters (`1z141z3` is the maximum), so the suffix is 14 characters with no uniqueness loop.

**7. Options (R11): CONFIRMED.**
- **Home and shape:** `resolveOptions` can't be `parse*`, because it throws, and `names.md` makes `parse*` non-throwing. It can't be `read*`, because it coerces, and `read*` never coerces. `names.md` defines `resolve*` as "picks the effective value from options and defaults", which is exactly this job. A single table-driven engine shared by every entity satisfies `AGENTS.md` ("one shared engine"). It reuses the contract's `Parser`, `parseJSONAs`, and `isRecord` directly, with no wrapper. `helpers.ts` is its correct kind file, and E10 records the ruling.
- **Behaviour:** `attribute ?? config[key]` gives R11's and Bootstrap's `_mergeConfigObj` order.
- **Mutations:** the merge-order case tells apart "config beats attributes" (`delay` would be 5), "falsy dropped", "constructor first" (`label` would be `attribute`), and "undeclared admitted" (a `parent` key appears). The runs are the unit's own record.
- **Forward shape gaps:** see the referrals to the Orchestrator.

**8. Names live in constants (E9): CONFIRMED.**
- **Attack:** I extracted every string literal from `Button.ts`, `Delegate.ts`, `helpers.ts`, `validators.ts`, `Registry.ts`, and `Snapshot.ts`.
- **Result:** the executable literals are platform names (`click`, `abort`, `running`, `class`), selector syntax (`#`, `.`, `,`), `SnapshotCategory` discriminants, Orkestrel error codes and messages, and module specifiers. Every Bootstrap literal found sits in TSDoc or a comment, never in code that reads or writes the DOM.

**9. E6 and fleet names: CONFIRMED.**
- **Removals:** in the worktree, excluding `node_modules`, a sweep for `isButtonHost`, `BUTTON_TOGGLE`, `@deprecated`, `#buttons`, `#hosts`, and "shaped around Button" hits only the off-limits `ButtonSection.test.ts` message line. The removed guide paragraph is gone in the diff.
- **Fleet collision attack:** I searched `C:/Users/mikes/WebstormProjects/veneer-binder/node_modules/@orkestrel/scaffold/dist/host/guides/*.md` for every new export name. The positive control found `Snapshot` (`scaffold.md` around line 74) and `isHost` (around line 381), and nothing else matched.
- **Wrappers:** no new export wraps a `@orkestrel/contract` or `@orkestrel/test` export except `isHost`, which E10 rules on.

**10. Scope, parity, and proofs: BROKEN.**
- **Failing input:** the clause "every new assertion names a mutation it distinguishes" is false by the report's own § Mutations table. These new cases have no row:
  - In `Snapshot.test.ts`: "restores an empty attribute distinctly from an absent one" and "restores class token membership and keeps every token the snapshot never recorded".
  - In `Registry.test.ts`: "records the claiming engine and finds it by host" and "keeps one record per registry, so separate registries claim one host independently".
  - In `helpers.test.ts`: "dispatches a bubbling non-cancelable event whose prevention changes nothing", "binds nothing for absent hooks or an aborted signal", and "resolves in a microtask when the element has no running animation".
  - In `Button.test.ts`: the `Object.isFrozen(BUTTON_EVENTS)` assertion.
- **Smallest fix:** name and run one mutation per unlisted case. Examples: `getAttribute(name) || undefined`, a static `#owners`, and an unfrozen table.
- **The rest of the claim:**
  - Held: the status list, the patch file `j-binder-patch-buttonsection.diff`, the § Surface rows, the unchanged `RegistryInterface` and `SnapshotInterface` tables, `## Engine` with its subsections placed after § Examples as R18 requires, and the gate outcomes in your log.
  - Unresolved, because only the unit's report evidences it: the Delegate red-first reading of 4 failed of 16. To settle it, put the seed `Delegate.ts` from `1868007` under the rewritten `Delegate.test.ts` in a scratch copy and run `npm run test:src:browser -- tests/src/browser/Delegate.test.ts`.

## Findings outside the claims

**F1. E9's parameter seam is not built.**
- **What is wrong:** `decisions.md` E9 records that J-BINDER was told to "read each through one parameter so the override lands as a parameter rather than a rewrite". Instead, these readers import the names directly:
  - `readTargets(trigger)` in `helpers.ts` reads `TARGET_ATTRIBUTE` and `LINK_ATTRIBUTE`.
  - `resolveOptions` reads `CONFIG_ATTRIBUTE` and `OPTION_PREFIX`.
  - `Button.ts` reads `BUTTON_ACTIVE` and `BUTTON_PRESSED`.
  - `Delegate.ts` reads `BUTTON_SELECTOR`.

  The report's own table says "(no parameter yet)".
- **Why it matters:** these helpers are the ones every component calls. If they land without the parameter, each later override becomes a signature change across every component, which is the rewrite E9 exists to prevent.
- **What right looks like:** in J-BINDER round 2, after J-ENGINE-SHAPE fixes the vocabulary shape, each leaf takes the names it reads as arguments whose defaults are the constants. Hold the landing until then. The alternative is that you record that J-ENGINE-SHAPE supersedes the in-flight instruction.

**F2. Capabilities land with no consumer.**
- **What is wrong:** a grep of `veneer-binder` `{src,app}/**/*.{ts,vue}` shows these exports used only in their defining files (`helpers.ts`, `constants.ts`), with no consumer in `src` or `app`: `settleAnimations`, `reflow`, `readTarget`, `readTargets`, `generateId`, `resolveOptions`, `TARGET_ATTRIBUTE`, `LINK_ATTRIBUTE`, `CONFIG_ATTRIBUTE`, and `OPTION_PREFIX`.
- **Rules it conflicts with:** `AGENTS.md` § Design laws "Minimal public API", `architecture.md` § System constraints, the design verdict's exit criterion 2 ("each with its first consumer"), and E6's audit assertion "no unreferenced export".
- **Where it comes from:** the verdict's units table caused this, so it is a conflict between the plan and the law. `AGENTS.md` requires surfacing it.
- **What right looks like:** land these helpers and constants in the same landing as J-COLLAPSE, their first consumer. Move `generateId` to the unit whose component first writes an id; R15 makes it the `getUID` carrier, and that points to J-TOOLTIP.

## Attacked and held

- **`readTarget` as a one-line delegate:** it held. It narrows the result to one element, R15 makes it the carrier for `getElementFromSelector`, and several planned callers need it. It is not a rename wrapper.
- **`reflow` as a wrapper around `getBoundingClientRect`:** it held. It names the forced-layout invariant and narrows the return to `void` (R6).
- **Mirrored detail fields shadowing `Event` prototype accessors:** this matches Bootstrap's own hydration, so it is not a departure.
- **`Delegate` still hard-wires `Button`:** R5 lands each route with its component, and the guide describes one route honestly.
- **`helpers.ts` importing `AppError`:** the leaf pair may import error classes.
- **The generic `Registry` message:** the code carries the class identity, and the guide documents the code rather than the message.

## Referrals

To the objective lane:
- **Dead engines in `#owned`:** if a consumer destroys a delegate-acquired engine directly (`Button.find(host)?.destroy()`), it stays in `Delegate`'s `#owned` set. The next click acquires a second engine. Nothing in `#activate`, `#acquire`, or `#release` removes destroyed engines, so the set grows with each cycle until the host leaves the root.
- **Weak `resolveOptions` proofs:** the `'[false]'` config assertion can't tell whether arrays are admitted (`Object.hasOwn([false], 'toggle')` is `false`). No case asserts that a `false` or `0` passed in the constructor object survives the merge.
- **Class order:** in `Button.ts`, `static find` sits before the getters (`architecture.md` § Class order).

To the Orchestrator:
- **J-COLLAPSE brief drift:** the draft `j-collapse-brief.md` still grants `parsers.ts` and `parseCollapseAttributes` (against E10) and names the wire events `show.bs.collapse` and the rest (against E11). Re-derive it before dispatch.
- **Tooltip and Popover options:** R11 says Tooltip and Popover read no `data-bs-config`, but `resolveOptions` always reads `CONFIG_ATTRIBUTE` and has no way to skip it. Rule on this before J-TOOLTIP, or under J-ENGINE-SHAPE.
- **Click marking:** `#mark` keys on the click and the host, not the click and the route. Once a second route exists, a host carrying two routes is driven by only one of them per click. Rule on the key before the dismiss route lands.
- **Documenting `static find`:** every engine class gets a static `find`, but it has no § Methods home, because those tables are per interface. Rule on where it is documented.
- **Config error context:** when a declared key inside `data-bs-config` fails coercion, the `resolveOptions` error names `data-bs-config` but not the failing key.

## Bounds

- **Engine intro, wire names:** the guide § Engine intro says "Bootstrap's … wire event names are the engine's defaults … such as `BUTTON_EVENTS`". That table carries `toggle.vn.button`, and E11 makes every wire name `.vn.`.
- **Engine intro, "defaults":** the same sentence calls the names "defaults", which implies an override the code lacks (see F1).
- **Engine intro, departures:** "the departure is stated with the member: `destroy` replaces `dispose`", but the `ButtonInterface.destroy` TSDoc names no `dispose`.
- **Events:** "The `toggle.vn.button` event has no Bootstrap counterpart, so it keeps its Veneer name" rests on reasoning that E11 makes stale.
- **§ Surface intro:** "The browser entry publishes the color-mode controller" is stale.
- **`emitEvent` example:** the `@example` uses `'show.bs.collapse'`, against E11.
- **`Delegate` remarks:** "the engine the host's class finds for it" — name the engine class's static `find` method instead.

VERDICT: FAIL 3, 10; outside the claims: F1, F2
