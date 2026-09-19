I held the **objective design lane**. Use the installed readers and wait helpers; preserve the modal resolver’s refusal. This is a source-supported proposal, with browser proof still required.

The governing distinction permits this correction. `layer.md:108–123` allows readers to take an element the caller already holds, while a journey verb resolves its own target. Its node-retention ban concerns traversal (`layer.md:221`). Therefore, resolve the Menu trigger before opening, retain it solely for observation, and continue every interaction through role and accessible name. Check `isConnected` when reading the retained trigger.

The smallest implementation shape is:

```ts
// Compact opening; keep the existing wide-viewport refusal branch.
const trigger = resolveAccessible('button', COPY.menu)
await clickAccessible('button', COPY.menu)
await waitForCondition(
	'Menu announces its completed opening',
	() => trigger.isConnected && readStates(trigger).includes('expanded'),
	{ budget: 4_000 },
)
await waitForAnimations(document.body, { budget: 4_000 })

// Compact closing; keep the existing wide-viewport refusal branch.
await clickAccessible('button', COPY.close)
await retryUntil(
	'Menu returns reachable and collapsed',
	() => readStates(resolveAccessible('button', COPY.menu)),
	(states) => states.includes('collapsed'),
	{ budget: 4_000 },
)
await waitForAnimations(document.body, { budget: 4_000 })
```

This composition has distinct contracts:

- `readStates` reads authored attributes without resolving reachability: installed `browser/index.js:875`, declaration `browser/index.d.ts:2037`.
- `waitForState` resolves afresh and propagates resolver refusal immediately: `browser/index.js:999–1030`, declaration `browser/index.d.ts:2515–2547`. It cannot observe the outside trigger while this modal is shown.
- `retryUntil` retries producer errors and returns the satisfying reading: `core/index.js:323`, declaration `core/index.d.ts:544`. Closing requires this convergence because the trigger remains unreachable during hiding.
- `waitForAnimations` observes finite running animations throughout a subtree: `browser/index.js:1065`. Its declaration explicitly demonstrates `document.body` (`browser/index.d.ts:2479`), which also covers Bootstrap’s backdrop without identifying a private node.

Retain the authored `shown`/`hidden` binding in `App.vue:57–63,154`. Bootstrap removes `aria-modal` in its hide-completion callback before dispatching `hidden` (`bootstrap/js/src/offcanvas.js:145–155`). Animation completion alone cannot replace that lifecycle convergence; Bootstrap also has a transition fallback timer (`bootstrap/js/src/util/index.js:229–256`).

When opening resolves, the person must perceive the named Menu dialog, its destinations, and its reachable dismissal. Assert its rendered text through `readPerception(COPY.menu)` and resolve the expected dialog action. The retained trigger’s expansion corroborates that perception; it doesn’t establish it. Keep the exact outside-trigger refusal assertion. The existing post-open assertion that calls `resolveAccessible(COPY.menu)` in `tests/setupBrowser.test.ts:99` must change alongside the helper.

When closing resolves, the trigger must resolve and announce `collapsed`; Close must return its exact unreachable voice, and `readPerception(COPY.menu)` must refuse as `Named region "Menu" is not visible`. These assertions distinguish closing from a still-open dialog whose animation stopped. See `layer.md:322–331` and the perception implementation at `browser/index.js:655`.

Require this independent browser probe in a frozen checkout, with the diagnostic Vue override:

```powershell
npx vitest run --config tmp/probe/r-b-setup/vite.config.ts --no-cache --reporter=verbose --project "setup:browser*" -t "opens and closes compact navigation and resolves only the modal action"
```

Extend that named proof to record real `shown`/`hidden` events, named perception, resolver refusals, and finite running animations at helper resolution. Exercise normal motion and reduced motion. Capture the transition through the journey, with its artifact, as `decide.md:83–99` requires.

Use negative controls that omit the opening click and omit the closing click; the corresponding destination assertion must fail. Remove the authored `shown` state update and the `hidden` state update separately; their corresponding settle must fail while collection remains valid. These runs settle whether the proposed composition truthfully waits across Bootstrap’s lifecycle and paint.

No browser probe ran in this lane. The named diagnostic log confirms the original opening refusal (`setup-diagnostic.log.txt:305–315`), but doesn’t prove the correction. No upstream contract change is justified before this composition is tested.
