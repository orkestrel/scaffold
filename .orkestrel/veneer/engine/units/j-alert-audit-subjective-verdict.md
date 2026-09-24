# J-ALERT audit round 1 — the subjective lane's verdict (returned 2026-09-24 by `reviewer` on Opus 5.5, native subagent, 47 tool uses, 458 s; retained verbatim from the subagent's return text)

Subjective lane. I am `reviewer` on Opus 5.5 (`claude-opus-5-5`), reached as a native Claude subagent. I read the diff, status, report, patches, mutation log, gate log, terrain record, and decisions E6–E14, plus the worktree's `Alert.ts`, `Delegate.ts`, `Button.ts`, `Collapse.ts`, `types.ts`, the guide, and Bootstrap 5.3.8's `alert.js` and `component-functions.js`. I ran nothing. The Orchestrator's replay (`j-alert-mutations-orchestrator.log.txt`) was absent while I read.

## Numbered verdicts

**1. UNRESOLVED.** The construction and lifetime mechanism holds against the source. Only the instrument-row clause is undecided.
- **What held:** `Alert.constructor` refuses a non-`HTMLElement` host with `ALERT_HOST_INVALID` carrying `readTag(host)`. It resolves all three groups through `resolveVocabulary` with `ALERT_OPTION_INVALID` before `Alert.#registry.claim`, keeps only `#classes`, binds through `bindEventMap` with `isAlertEvent`, and handles the signal the way `Button` and `Collapse` do. `destroy` calls `#release` (abort, then registry release) before `#snapshot.restore()`.
- **Attack that failed:** I looked for validation running after the claim. "refuses a group value … before claiming the host" asserts `Alert.find(host)` is undefined after each refusal. Moving the claim above `resolveVocabulary` would make that assertion fail.
- **What would settle it:** the Orchestrator's replay of the rows the claim names (the unit's own log lines 19–25).

**2. UNRESOLVED.** Every door in the close sequence holds when I trace it. Only "each door proof reddens under its instrument row" waits on the replay.
- **Traces that held:**
  - A `close` listener that closes the alert again runs the whole inner close synchronously when there is no fade. The outer call then reads `#refused` as aborted.
  - With a fade, the inner call holds `#closing`, so the outer call is refused.
  - A reaction at the `shown` removal that destroys the alert or re-adds `shown` fails `#holds`.
  - During the fade, `settleAnimations` resolves on abort, and `#holds` is read again.
  - At the removal door, a reinsertion is caught by `host.isConnected` and a destruction by `#holds`.
  - A `closed` listener that destroys the alert is caught by the aborted check. A `closed` listener that calls `close` again is refused by `#closing`.
- **No door admits a state the call then writes over.** After any door returns `false`, nothing is written.
- **A single boolean `#closing` suffices.** It is set only after the post-dispatch refusal read, so no second close can pass while one holds it.
- **Mutations I checked by reading the assertions:**
  - Dropping `|| host.isConnected` dispatches `closed` and releases the alert. The reinsertion case asserts `events.calls` holds only `close.vn.alert` and that `Alert.find(host)` still returns the alert, so it would fail.
  - Setting `#closing` before the dispatch leaves the flag stuck after a prevented close. The prevention case's later `toBe(true)` would fail.

**3. BROKEN, on part (d).**
- **(a) holds.** Bootstrap's `_destroyElement` calls `dispose` after `closed` (`alert.js` `_destroyElement`), and the catalog row says "disposes the instance". The alternative, calling `destroy` on completion, would write `show` back onto the removed host. `HostSnapshot`'s temporary static `#pending` state is filled only during a restoration (`#publish`), so a snapshot that is never restored leaks nothing. The guide lists (a) as a departure.
- **(b) holds.** As traced under claim 2, an identity like `Collapse`'s `#change` could never differ, so it would be dead code under E6. A stored flag is also needed: the host's tokens cannot tell "in flight" apart from "had no `show` to begin with", so the state cannot be derived.
- **(d) breaks.** The campaign already ruled on this. `j-collapse-audit-verdict.md` § Referrals ruled, R3: "`{Entity}Vocabulary` for every entity: … every later entity declares its own." `Delegate.#alert` instead carries an inline `{ classes; attributes; selectors }` type beside `#button: ButtonVocabulary` and `#collapse: CollapseVocabulary`. The report calls the interface "optional", which contradicts that record.
  - **Right looks like:** return an exact `src/browser/types.ts` patch adding `AlertVocabulary`, mirroring `CollapseVocabulary` (`classes: AlertClassMap`, `attributes: AlertAttributeMap`, `selectors: AlertSelectorMap`, with TSDoc in the same form). Add its guide § Surface row. Type `Delegate.#alert` as `AlertVocabulary` and drop the imports the inline type needed.
- **(c)** belongs to the objective lane. I do not rule it.

**4. UNRESOLVED.** The route holds against the source. Only the instrument-row clause waits on the replay.
- **What held:**
  - `#activate` runs `#conflicts`, then `#routeButton`, `#routeCollapse`, and `#routeAlert`.
  - `#routeAlert` calls `#dismiss(event, target, Alert, selectors.dismiss, classes, attributes)`.
  - `#dismiss` resolves the trigger through `#closest`. It prevents the default for an `HTMLAnchorElement` or `HTMLAreaElement` trigger before any other read, which matches `component-functions.js`.
  - `#dismissed` returns nothing for the `disabled` token or attribute. Otherwise it returns `readTarget(...) ?? closest(.host)`, and only inside the root.
  - `#dismiss` checks the abort, then marks the host. `#discard`, `#owned`, `#acquire`, and `#mark` admit the alert.
- **All sixteen named cases are present** in `Delegate.test.ts`. The `Delegate` class remark states the route, the generalized refusal, and the release.
- **Mutation I checked:** removing the root check in `#dismissed` would let the nested delegate in "leaves an alert outside its root alone" close `#away`. That case asserts `#away` stays in place with its tokens, so it would fail. F1 covers the shape of this route.

**5. UNRESOLVED.** The tables, guard, and barrel hold. Only the instrument-row clause waits on the replay.
- **What held:** `isAlertEvent` is `try { isInstance(value, CustomEvent) && value.detail === null }` and narrows to `AlertEventMap['close']`, the same form as `isCollapseEvent`. The four tables are frozen with the terrain record's defaults, and `ALERT_ATTRIBUTES.target` reuses `TARGET_ATTRIBUTE`. There is no `ALERT_DEFAULTS`, which E6 requires. The barrel exports `./Alert.js`, and `index.test.ts` lists the six names.
- **The rows** (the unit's log lines 24 and 54–57) wait on the replay.

**6. BROKEN.** Three guide sentences state facts the code contradicts, and the returned patch set is incomplete.
- **What held:**
  - All six § Surface rows are present.
  - The Alert fence imports `@orkestrel/veneer/browser`.
  - `#### Alert` states the sequence, the release, the tables, the events, the takeover reading, the route with its refusal, and the departures. The departures are complete against `alert.js` for every material behaviour.
  - The `plugin` row reads `shipped`, its Proof is `tests/src/browser/Alert.test.ts`, and its Obligation text is unchanged.
- **The § Surface rows `AlertAttributeMap` ("Names the attribute an alert reads") and `AlertSelectorMap` ("Names the selector an alert matches with") are false.** Their TSDoc in `types.ts`, and `AlertOptions.attributes` ("Replaces the attribute name the alert reads") and `AlertOptions.selectors` ("Replaces the selector the alert matches with"), are false the same way. The implementation keeps neither group, and the unit's own `#### Alert` says "the alert keeps neither" and "it reads no attribute from its host".
  - The brief's Shared row required "a summary … sentence the implementation makes false: return an exact patch". `Button` sets the precedent for exactly this case: `ButtonSelectorMap` and `ButtonOptions.selectors` read "the delegate routes button clicks by; a button constructed directly matches with none".
  - **Right looks like:** a `types.ts` patch rewording these four summaries in that `Button` form (the delegate's dismiss route reads or matches; an alert constructed directly reads or matches none). Return the matching guide § Surface rows with it so `findDrift` parity holds.
- **The § Delegation carve-out understates the gap.** In the ownership paragraph, "at the observer delivery that follows a removal it restores and releases every host it acquired that the root no longer contains" is false for an alert that completed its close. At that delivery `#discard` drops the released engine, and `#release` never restores it. The `show` token stays removed, which is the intended behaviour.
  - **Right looks like:** the § Delegation update that W5 carries must also state that an alert which completed its close is dropped without being restored. It is not only the refusal sentence.

**7. CONFIRMED.**
- "reads the shipped alert declarations …" mounts `_alert.scss?inline`. It proves the sheet applied (`position: relative`) and reads `transitionDuration` of `0s` and no animations. Adding a `.fade` transition to the shipped partial would fail it.
- The fade proof loads `alertCascade` and the test-local `fade` rule. It asserts the `opacity` transition and the order `[['finished'], ['closed.vn.alert']]`. Dropping the `settleAnimations` await dispatches `closed` synchronously and reverses that order.
- The no-fallback case loads no sheet. It asserts `closed` precedes a `waitForDelay(0)` timer, and a fallback timer after the settle would reverse that.
- The `describe` comment and each case's `scene.load` calls state which sheet each case reads.

**8. UNRESOLVED.**
- **What held:**
  - The status lists the eight modified files and the two added files, and no off-limits file.
  - The Orchestrator's `j-alert-gates.log.txt` reads exit 0 for `check:src:browser`, oxlint, oxfmt, `test:src:browser` (243 passed), `test:guides`, `test:policy`, the three builds, `test:conformance`, `test:setup`, and the tree-wide `check`.
  - My sweeps of the diff's added lines found no `.bs.` wire name. They found no `any`, `as`, non-null `!`, `@ts-`, `eslint-disable`, access modifier, or default export. They found no row that `writing.md` § Substitutions bans unconditionally. Every hit in the permitted-sense rows ("above" for the DOM hierarchy, "once" as one time, "new" as a constructor) was used in its permitted sense.
  - Every invoked element guard the unit added reads `isInstance`. The report records that no `prove` call was made.
- **What waits:** the unit's own mutation log shows 56 rows reading `EXACT` or `JOINED`, four `GREEN?` rows at 0 failed, and the receipt. That log is the writer's own artifact. The replay settles it.

## Findings outside the claims

**F1. The shared dismiss resolver's two private methods have misleading names.** In `src/browser/Delegate.ts`:
- `#dismiss` dismisses nothing. It resolves the trigger, prevents the anchor default, and marks the host, and its own comment says "Resolves the host…". `#routeAlert` does the closing.
- `#dismissed` is a past participle but returns `HTMLElement | undefined`.
- **Why it matters:**
  - `names.md` § Value-level identifiers fixes "Method: camelCase bare verb" and "Boolean: camelCase adjective/past participle", and § General vocabulary says "methods are verbs".
  - The landed code uses the participle form for boolean predicates only: `#refused` in both `Alert` and `Collapse`. So `this.#dismissed(dismiss, …)` in `#conflicts` reads as a predicate.
  - The brief makes this the resolution the Modal and Toast routes will reuse, so the names spread to three routes unless they are fixed here.
- **Right looks like:** rename `#dismiss` to a verb for what it does, such as `#reach` (its comment already says "reaches"). Rename `#dismissed` to a resolver name that does not read as a predicate, such as `#locate`. Update the call in `#conflicts` and both comments.

## Attacked and held

- **Destroying the alert inside a `closed` listener writes `show` back on the removed host and resolves `false`.** This is a common cleanup idiom, and the result looks like a defect. It is the documented door ("A listener to `closed.vn.alert` that destroys the alert …"). `Collapse` behaves the same way when a `hidden` listener destroys it.
- **An anchor dismiss trigger has its default prevented even when an earlier route's listener destroyed the delegate during the click.** `#dismiss` prevents before it reads the abort. `#routeCollapse` has the same order, so this matches the landed pattern.
- **Nothing reads after the `closed` dispatch except the lifetime.** A `closed` listener that reinserts the host or re-adds `show` still gets `true`. This matches `Collapse`, whose completions return `!aborted` after the completed event.
- **The alert accepts `attributes` and `selectors` and keeps neither.** This is the landed `Button` pattern, and the guide states it. Only the TSDoc drift in claim 6 remains.

## Referrals

- **R1, to the objective lane.** "closes an alert through a trusted click on its close control, moving focus nowhere" has no control for its focus assertion.
  - The fixture's only focusable element is the trigger, which leaves with the alert. `host.focus()` on a `div` without `tabindex` does nothing.
  - So `document.activeElement === document.body` holds under any mutation that moves focus to the host or the trigger.
  - The instrument names no focus mutation for this case. A focusable element outside the alert in the fixture would give the assertion something to catch.
- **R2, to the Orchestrator.** `#closest` centralizes "closest match inside the root". `#routeButton` and `#routeCollapse` still inline the same `target.closest` and `this.#root.contains` pair.
  - The brief barred the unit from editing those routes, and J-ISINSTANCE rewrites those lines on `main`.
  - Under E6 (no duplicate path), route both through `#closest` at the landing merge.

## Bounds

- **Returned `@returns` patch:** "the alert's tokens or its place in the document read the change as taken over" gives tokens a faculty. "was in flight" also disagrees with the guide's "is in flight".
- **§ Examples lead-in:** it says "over a dismissible alert", but the fence's host carries no `alert-dismissible` class.
- **`AlertClassMap` summary:** "each default is the token the cascade selects on" sits beside the unit's own "each default is the token Bootstrap's markup carries" and its statement that the shipped cascade declares no `.fade` rule.
- **Departure bullet "A completed close keeps the alert's end state …":** Bootstrap keeps the end state too. The only departure is that a later `close` resolves `false` where Bootstrap throws.
- **Case title "writes, removes, and tests only the replacing class tokens …":** the case writes nothing.
- **`#dismiss` parameter types:** they mix `Pick<AlertClassMap, …>` with the generic `AttributeMap<'target'>`. `route: typeof Alert` must be widened when the Modal or Toast route reuses it.
- **Unlisted edge departure:** a dismiss trigger that resolves to no alert throws a `TypeError` in Bootstrap. The delegate does nothing. `#### Collapse` does not list its equivalent either.

VERDICT: FAIL 1, 2, 3, 4, 5, 6, 8; outside the claims: F1
