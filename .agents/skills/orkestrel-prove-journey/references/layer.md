# The journey layer

Route every journey step through the published layer. Treat a journey that works around a missing
capability by reaching for a selector as a layer defect.

## The vocabulary

Import the vocabulary from the entries that publish it: `@orkestrel/test` for what is
host-independent, and `@orkestrel/test/browser` for what drives a browser. Every name this reference
teaches is in the following fence, and a name absent from it is a name to verify against the
installed entry before writing it.

```ts
import type { TextWaitOptions, WaitOptions } from '@orkestrel/test'
import { waitForText } from '@orkestrel/test'
import type { StateOptions, StorageOptions, WebStorageInterface } from '@orkestrel/test/browser'
import {
	ACCESSIBLE_ROLES,
	FOCUSABLE_SELECTOR,
	build,
	clearStorage,
	clickAccessible,
	clickAccessibleWithin,
	clickDisclosure,
	commitInput,
	createDragEvent,
	createJournal,
	createPointerEvent,
	createStorage,
	describeFocus,
	describeTree,
	fillAccessible,
	isOutsideViewport,
	isReachable,
	isRendered,
	mount,
	pressKeys,
	readFocus,
	readHit,
	readName,
	readPage,
	readPerception,
	readRefusal,
	readRole,
	readStates,
	readText,
	readValue,
	removeDatabase,
	render,
	resolveAccessible,
	resolveRendered,
	traverseAccessible,
	typeAccessible,
	typeInput,
	waitForAnimations,
	waitForFrame,
	waitForState,
} from '@orkestrel/test/browser'
```

## Import, never implement

Import every journey helper from `@orkestrel/test/browser`, and every host-independent wait and
table type from `@orkestrel/test`. Write one of your own only where those entries publish none for
the act.

- Place a helper you write in the workspace's browser test setup module, export it from there, and
  name it for the human act it performs. Prove that module with `tests/setupBrowser.test.ts`, which
  runs in the browser-enabled `setup:browser` project.
- Read the package's own exports before writing anything. A helper that renames a published one is a
  defect under `AGENTS.md`, and a second implementation of one drifts from the first.
- Code every journey against the vocabulary in this file, which is the published one. Diagnose a
  target that stops resolving here, and fix it in the application.

## What it drives

- Drive the real browser through the installed Vitest browser provider. The published verbs import
  `page` and `userEvent` from `vitest/browser`; the `@vitest/browser/context` specifier is
  deprecated and is not the import a workspace helper uses.
- Never dispatch a constructed event from a journey. The published `createPointerEvent`,
  `createDragEvent`, `typeInput`, and `commitInput` serve a unit test whose subject is the handler;
  a journey drives input through `clickAccessible`, `clickAccessibleWithin`, `clickDisclosure`,
  `typeAccessible`, `fillAccessible`, `traverseAccessible`, and `pressKeys`.
- Send every key sequence — Enter, Escape, arrows, modifiers, and combinations — through
  `pressKeys`, which is the published verb for it.
- Yield with `waitForFrame` where a step needs the browser to paint before the next reading. Never
  guard a fact with a fixed delay.

## Which helpers take an element

A journey verb resolves its own target from role and accessible name, and refuses an element, a
component instance, or a selector from the caller. A reader, a fixture builder, and a capture each
take one, because their subject is a node the caller already holds.

| Population                                                                                                                                                                                                                                                          | Takes an element |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `resolveAccessible`, `resolveRendered`, `clickAccessible`, `clickAccessibleWithin`, `clickDisclosure`, `typeAccessible`, `fillAccessible`, `traverseAccessible`, `pressKeys`, `waitForState`, `readRefusal`, `readPerception`, `readPage`, `readFocus`, `readValue` | No               |
| `readText`, `readRole`, `readName`, `readStates`, `describeTree`, `describeFocus`, `isReachable`, `isRendered`, `readHit`, `waitForAnimations`                                                                                                                      | Yes              |
| `readContrast`, `readRing`, `readLayers`, `readBackdrop`, `readStyle`, `readToken`, `readPixels`, `readClasses`, `readCensus`, `extractStyles`, `extractOrphans`, `readRows`                                                                                        | Yes              |
| `mount`, `typeInput`, `commitInput`, `captureFrame`, and a portfolio's `place`                                                                                                                                                                                      | Yes              |

- Never pass an element to a verb from a journey step. Read a step that would pass one as a missing
  verb, and add the verb instead.
- `waitForState` resolves its control afresh on every reading, so it takes the role and the name
  rather than a node. `waitForAnimations` takes the element, because an animation belongs to a
  subtree rather than to a name.
- `createStorage` and `clearStorage` take neither: one returns a store the test hands the
  application, and the other empties the browser's own surfaces.

## The resolver

`resolveAccessible(name)` resolves across the published interactive roles, and
`resolveAccessible(role, name)` resolves within exactly the named role. `resolveRendered` sits
beneath it and applies the same match without the scroll, so an act does not fail on a target the
act itself scrolls into view.

- Match the accessible name exactly, never a substring.
- Read `ACCESSIBLE_ROLES` for the bare-name search set and `FOCUSABLE_SELECTOR` for what the layer
  counts as focusable, rather than restating either list in a workspace.
- Read reachability with `isReachable` and rendering with `isRendered` where a test needs the
  condition rather than the throw. A reachable match is connected, passes a visibility check that
  honours opacity and CSS, has a box with non-zero width and height, carries a `tabIndex` of at
  least zero, matches neither `:disabled` nor `[aria-disabled="true"]`, and has no `[inert]`
  ancestor.
- Read a `true` from either predicate for a subject inside a shadow root as the element's own
  answer. Each asks `closest` for the `aria-hidden` ancestor and the `[inert]` ancestor, and
  `closest` never crosses a shadow boundary, so ask the host separately where the ancestor attribute
  is the subject.
- Count a control a person can scroll to as reachable, and one that stays outside the viewport after
  the scroll as unreachable. Reach for `isOutsideViewport` where the rectangle itself is the
  subject.
- Ask `readHit` where the question is what paints at a control's centre. A node it returns is no
  proof of a cover: a `pointer-events: none` cover is absent from the hit test, and an element in a
  shadow tree retargets to its host.

### The failure voices

Assert the one voice the case means. Never write an assertion that accepts more than one.

| Condition                                        | The voice thrown                                                                         | Thrown by               |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------- |
| No element carries the name                      | `No interactive element has the accessible name "<name>"`                                | `resolveRendered`       |
| Every match fails a reachability condition       | `Interactive target "<name>" is not visible and focus-reachable`                         | `resolveRendered`       |
| Several matches are reachable                    | `Interactive target "<name>" is ambiguous across <n> elements`                           | `resolveRendered`       |
| Still off-viewport after being scrolled to       | `Interactive target "<name>" is unreachable after scrolling`                             | `resolveAccessible`     |
| The region holds no reachable match              | `Interactive target "<name>" is not reachable inside "<region>"`                         | `clickAccessibleWithin` |
| The region holds several reachable matches       | `Interactive target "<name>" is ambiguous across <n> elements inside "<region>"`         | `clickAccessibleWithin` |
| No native disclosure is reachable under the name | `Native disclosure "<name>" is not visible and focus-reachable`                          | `clickDisclosure`       |
| Several native disclosures carry the name        | `Native disclosure "<name>" is ambiguous across <n> elements`                            | `clickDisclosure`       |
| Forward Tab never lands on the target            | `Interactive target "<name>" is not reachable through forward Tab traversal: <trail>`    | `traverseAccessible`    |
| The named region is hidden                       | `Named region "<name>" is not visible`                                                   | `readPerception`        |
| Several named regions carry the name             | `Named region "<name>" is ambiguous across <n> elements`                                 | `readPerception`        |
| The resolved control renders no value            | `Interactive target "<name>" does not carry a value`                                     | `readValue`             |
| A key sequence reached nothing                   | `Key sequence "<keys>" was sent with nothing focused`                                    | `pressKeys`             |
| The state never arrived or never left            | `Condition "<subject>" did not hold within <n>ms (waited <n>ms) (last states: <states>)` | `waitForState`          |
| The animation subject is in no document          | `Animation subject is not connected`                                                     | `waitForAnimations`     |
| The paint never stopped moving                   | `Animation "<subject>" did not settle within <n>ms (waited <n>ms): <animations>`         | `waitForAnimations`     |
| The sentence never arrived                       | `Condition "<description>" did not hold within <n>ms (waited <n>ms)`                     | `waitForText`           |
| A host withholds a storage operation             | `Access is denied for <operation> "<key>"`                                               | `createStorage`         |
| A write ran past the declared quota              | `No room is left for <key>`                                                              | `createStorage`         |
| A style reading has no computed color            | `Computed foreground color is unavailable`                                               | `readContrast`          |
| A class census walked nothing                    | `Class census walked no element`                                                         | `readCensus`            |
| A contrast control cannot straddle its bar       | `Contrast control cannot straddle the bar <bar>`                                         | `buildContrast`         |
| A database deletion was blocked                  | `IndexedDB database "<name>" is blocked by an open connection`                           | `removeDatabase`        |

- Report an absent control and a present-but-unreachable one as different findings: absence names
  a missing control, and unreachability names the interface gating one that exists.
- Report ambiguity as a finding about the surface. Quote the match count from the message, and
  re-target the journey by role or region.
- Assert a `DOMException` on its `name` as well as its message. A withheld storage operation raises
  `SecurityError` and a write past the quota raises `QuotaExceededError`, which is the pair a denied
  or full origin raises.
- Never assert a `could not be resolved` sentence. Each one is narrowing the resolver needs under
  `noUncheckedIndexedAccess`, and no surface reaches it.
- Read a refused bound as a test defect rather than a finding. The wait family validates its budget
  and its interval and names the argument the caller passed, under the subject `Wait` or
  `Animation`.
- Read the package's own voice table before asserting a message this file does not list. A workspace
  that transcribes a voice by memory asserts a sentence the package does not throw.

## Input and traversal

| Verb                         | Contract                                                                                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `typeAccessible(name, text)` | Focus the field, select all, delete, then send real keystrokes. Escape the provider's key syntax in the text.                                                             |
| `fillAccessible(name, text)` | Replace the value in one operation for text too long to type. The real element still publishes real input.                                                                |
| `pressKeys(keys)`            | Send a key sequence to whatever holds focus, and refuse the sequence where the document body holds focus or nothing does. `{` opens a key name and `[` opens a code name. |
| `traverseAccessible(name)`   | Move focus by forward Tab from wherever focus is, and return the target after focus lands on it.                                                                          |

- Reach for `typeAccessible` where the keystrokes are part of what the journey claims, and
  `fillAccessible` where the text is only a payload the person pastes.
- Bring focus about first — through `traverseAccessible`, `clickAccessible`, or `typeAccessible` —
  and then press. The refusal is what `pressKeys` adds over the provider's own keyboard call: a key
  sent to the body reaches no control, and every assertion after it reads a surface the key never
  touched.
- Escape the sequence yourself where the sequence is the subject. Reach for `typeAccessible` where
  the text is the subject and the key syntax is in the way.
- Let `traverseAccessible` end the walk. It counts a step only where focus lands, stops at one
  complete cycle of the tab order, carries the trail of what focus reached in its voice, and holds a
  cap above the cycle so a page with no tab order fails instead of hanging.
- Never call the browser's focus method to place focus, and never hold a node reference across
  traversal steps. A framework may replace the node between resolution and focus arrival.

## The waits

| Wait                                             | Parks on                                    | Returns                             |
| ------------------------------------------------ | ------------------------------------------- | ----------------------------------- |
| `waitForText(description, read, text, options?)` | A reading the caller supplies               | The first reading that satisfies it |
| `waitForState(name, state, options?)`            | What one control announces                  | The states read at resolution       |
| `waitForState(role, name, state, options?)`      | The same, resolved within one exact role    | The states read at resolution       |
| `waitForAnimations(element, options?)`           | Each running animation's `finished` promise | Nothing                             |
| `waitForFrame()`                                 | One `requestAnimationFrame`                 | Nothing                             |

- Scope `waitForText`'s reader as narrowly as the claim. Read a named region through
  `readPerception` for an arrival assertion, and reach for `readPage` only where the claim is about
  the whole page. A wait over the page resolves on the sentence wherever it lands.
- Carry the replaced sentence in `absent` whenever a value replaces another. A screen swapping one
  sentence for another passes through a frame carrying both, so a wait naming the arrival alone
  resolves on the frame the departing sentence is still painted in.
- Pass `exact` where the reading must equal the sentence rather than contain it. An empty
  expectation is refused rather than satisfied.
- Spell a state for `waitForState` the way `readStates` reports it: `expanded`, `collapsed`,
  `disabled`, `current`, `invalid`, `checked`, `required`, `readonly`, `described`, `busy`, and the
  valued forms `pressed=<value>`, `selected=<value>`, and `live=<value>`.
- Pass `absent: true` to `waitForState` where the claim is that the state went away, and read the
  returned states rather than taking a second reading afterwards.
- Take `waitForState` as the published replacement for a settle keyed to a framework's own class
  names. Where the control announces nothing, the finding is the surface's: give it `aria-expanded`,
  `aria-pressed`, or `aria-busy` rather than reading the classes a stylesheet happens to use.
- Take every style, contrast, and capture reading after `waitForAnimations` on the element whose
  paint was moving. A reading taken mid-transition reports an interpolated frame no state of the
  interface paints.
- Read a `waitForAnimations` timeout naming an animation that never finishes as a finding about the
  reading rather than a budget to lengthen. It excludes an animation declaring infinite iterations,
  a finished one filling its target, and a paused one, so a wait that resolves is a claim about the
  paint that was moving.

## Reading a refusal

`readRefusal(name)` and `readRefusal(role, name)` return the sentence `resolveRendered` raised, or
`undefined` where the target resolved. Each rethrows a value that is not an `Error`.

- Assert the exact sentence. A comparison against a substring passes for a refusal about a different
  condition, and a comparison against `undefined` alone passes on every refusal the layer throws.
- Read `undefined` as the target being reachable to an acting verb, because this drives the same
  resolver without acting.
- Never branch a journey on the reading. A journey performs its steps unconditionally and lets the
  verb's own refusal name what the interface withheld.

## Disclosures

- Drive a native `<summary>` with `clickDisclosure`, and only a native one. It applies the
  resolver's reachability conditions, throws its own voices, and resolves what the provider's role
  locators do not, because the platform exposes a native disclosure rather than a role.
- Drive an ARIA disclosure as what it is: a button. Click it with `clickAccessible`, then settle it
  with `waitForState` on the state it announces.
- Report a control that opens a panel and announces no state as a surface finding. Author
  `aria-expanded` on it rather than settling on the classes its framework toggles.
- Read a native summary's expansion with `readStates`, which reads the parent `details` element's
  own `open` where the summary declares no `aria-expanded`.

## The named bans

Each of the following reaches past the interface. The replacement is published, so the ban costs a
journey nothing.

| Never                                      | Reach for                                                    |
| ------------------------------------------ | ------------------------------------------------------------ |
| An element resolved by id or class         | `resolveAccessible`, `resolveRendered`, and the acting verbs |
| A class-list read standing in for a settle | `waitForState`, `waitForAnimations`                          |
| `document.elementFromPoint`                | `readHit`                                                    |
| `element.focus()`                          | `traverseAccessible`, `pressKeys`                            |
| A store read or a router call              | `readPerception`, `readValue`, `readStates`, `waitForText`   |

- Admit a selector only for a population that carries no role, declared in the workspace's browser
  test setup module with the reason beside it.
- Read a class-list assertion as proving nothing about the cascade. A class present in the markup
  and absent from every loaded stylesheet resolves to nothing, and the assertion passes on it.
- Take a store read or a router call as corroboration beside a rendered assertion, never in place of
  one.

## Role vocabulary

Never infer a role from markup. Confirm the computed role in the browser with `readRole` whenever a
target stops resolving, and read the exposed name with `readName` and the exposed state with
`readStates` beside it.

- A `list`-bearing input computes `combobox`, not `textbox`. Attaching native suggestion machinery
  to a field is a role change: re-target every journey that names that field, and read a resolver
  miss immediately after such a change as this before treating the element as missing.
- Always target a tab by its role. A tab and its panel collide on a bare name by construction,
  because the panel is labelled by its tab.

## Region-scoped resolution

Reach for `clickAccessibleWithin(region, role, name)` where a short verb such as `Add` repeats
across a page, and where a rendered status completes a control's accessible name. It applies the
same reachability conditions inside the region and names the region in every voice it throws.

## Perception

`readPerception(name)` returns the normalized `innerText` of exactly one visible named region,
dialog, table, tab panel, alert, or status. Quote that text in assertions.

- Read `innerText`, never `textContent`: `innerText` applies CSS transforms and leaves out content
  the layout hides. Descendant visually-hidden text stays in, which is what a screen reader
  perceives.
- Reach for `readPage` for a cross-region sentence and the vocabulary sweep, `readFocus` for the
  active element's rendered text, and `readValue` for a resolved control's rendered value. A
  perception assertion may quote that value: it is a rendered fact rather than internal state.
- Reach for `describeTree` and `describeFocus` where the subject is the accessible tree itself —
  roles, names, states, and focus order. They are the accessibility snapshot a written artifact
  composes ([decide.md](decide.md) → The rendered artifact).

## Mounting and cleanup

- Mount the shipped root component with its real provisions and return an idempotent cleanup that
  unmounts the app and removes its container. Reach for the published `mount`, `render`, and `build`
  where a fixture needs a node rather than the application.
- Undo everything a journey changed after each test: unmount, destroy the session, reset the theme,
  return the route to its entry, and clear what the application persisted with `clearStorage` and
  `removeDatabase`. Never let a journey inherit the previous journey's state.
- Hand the application a `createStorage` store where the subject is what a host withholds, and reach
  for `clearStorage` where the browser's own surfaces are the subject. The constructed store is
  backed by a map of its own, patches neither browser surface, and dispatches no `storage` event.
- Record what a journey did with `createJournal`, started inside the journey and stopped in a
  `finally`. Its `steps` and `output` are the evidence a failing journey hands back, and the input
  the run's written artifact composes.

## The capture hook

`createPortfolio` is the capture door and `place(state, element?)` is the hook.
[captures.md](captures.md) owns the registry, the variant matrix, and the proofs that read what it
wrote.
