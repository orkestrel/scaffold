# The journey layer

Route every journey step through the published layer. Treat a journey that works around a missing
capability by reaching for a selector as a layer defect.

## Import, never implement

Import every journey helper from `@orkestrel/test/browser`. Write one of your own only where that
package publishes none for the act.

- Place a helper you write in the workspace's browser test setup module, export it from there, and
  name it for the human act it performs.
- Read the package's own exports before writing anything. A helper that renames a published one is a
  defect under `AGENTS.md`, and a second implementation of one drifts from the first.
- Code every journey against the vocabulary in this file, which is the published one. Diagnose a
  target that stops resolving here, and fix it in the application.

## What it drives

- Drive the real browser through the installed Vitest browser provider. The published verbs import
  `page` and `userEvent` from `vitest/browser`; the `@vitest/browser/context` specifier is
  deprecated and is not the import a workspace helper uses.
- Never dispatch a constructed event from a journey. The published `createPointerEvent`,
  `createDragEvent`, `typeInput`, and `commitInput` serve a unit test whose subject is the handler; a
  journey drives input through `clickAccessible`, `clickAccessibleWithin`, `clickDisclosure`,
  `typeAccessible`, `fillAccessible`, `pressKeys`, and `traverseAccessible` only.
- Yield with `waitForFrame` where a step needs the browser to paint before the next reading. Never
  guard a fact with a fixed delay.

## Which helpers take an element

A journey verb resolves its own target from role and accessible name, and refuses an element, a
component instance, or a selector from the caller. A reader, a fixture builder, and a capture each
take one, because their subject is a node the caller already holds.

| Population                                                                                                                                                                                                                           | Takes an element |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `resolveAccessible`, `resolveRendered`, `clickAccessible`, `clickAccessibleWithin`, `clickDisclosure`, `typeAccessible`, `fillAccessible`, `pressKeys`, `traverseAccessible`, `readPerception`, `readPage`, `readFocus`, `readValue` | No               |
| `readText`, `readRole`, `readName`, `readStates`, `describeTree`, `describeFocus`, `isReachable`, `isRendered`                                                                                                                       | Yes              |
| `readContrast`, `readRing`, `readLayers`, `readBackdrop`, `readStyle`, `readToken`, `readPixels`, `readClasses`, `extractStyles`, `extractOrphans`, `readRows`                                                                       | Yes              |
| `mount`, `typeInput`, `commitInput`, `captureFrame`, and a portfolio's `place`                                                                                                                                                       | Yes              |

Never pass an element to a verb from a journey step. Read a step that would pass one as a missing
verb, and add the verb instead.

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
- Count a control a person can scroll to as reachable, and one that stays outside the viewport after
  the scroll as unreachable.

### The failure voices

Assert the one voice the case means. Never write an assertion that accepts more than one.

| Condition                                        | The voice thrown                                                                      | Thrown by               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- | ----------------------- |
| No element carries the name                      | `No interactive element has the accessible name "<name>"`                             | `resolveRendered`       |
| Every match fails a reachability condition       | `Interactive target "<name>" is not visible and focus-reachable`                      | `resolveRendered`       |
| Several matches are reachable                    | `Interactive target "<name>" is ambiguous across <n> elements`                        | `resolveRendered`       |
| Still off-viewport after being scrolled to       | `Interactive target "<name>" is unreachable after scrolling`                          | `resolveAccessible`     |
| The region holds no reachable match              | `Interactive target "<name>" is not reachable inside "<region>"`                      | `clickAccessibleWithin` |
| The region holds several reachable matches       | `Interactive target "<name>" is ambiguous across <n> elements inside "<region>"`      | `clickAccessibleWithin` |
| No native disclosure is reachable under the name | `Native disclosure "<name>" is not visible and focus-reachable`                       | `clickDisclosure`       |
| Several native disclosures carry the name        | `Native disclosure "<name>" is ambiguous across <n> elements`                         | `clickDisclosure`       |
| Forward Tab never lands on the target            | `Interactive target "<name>" is not reachable through forward Tab traversal: <trail>` | `traverseAccessible`    |
| The named region is hidden                       | `Named region "<name>" is not visible`                                                | `readPerception`        |
| Several named regions carry the name             | `Named region "<name>" is ambiguous across <n> elements`                              | `readPerception`        |
| The resolved control renders no value            | `Interactive target "<name>" does not carry a value`                                  | `readValue`             |

- Report an absent control and a present-but-unreachable one as different findings: absence names
  a missing control, and unreachability names the interface gating one that exists.
- Report ambiguity as a finding about the surface. Quote the match count from the message, and
  re-target the journey by role or region.
- Read the package's own voice table before asserting a message this file does not list. A workspace
  that transcribes a voice by memory asserts a sentence the package does not throw.

## Role vocabulary

Never infer a role from markup. Confirm the computed role in the browser with `readRole` whenever a
target stops resolving, and read the exposed name with `readName` and the exposed state with
`readStates` beside it.

- A `list`-bearing input computes `combobox`, not `textbox`. Attaching native suggestion machinery
  to a field is a role change: re-target every journey that names that field, and read a resolver
  miss immediately after such a change as this before treating the element as missing.
- Always target a tab by its role. A tab and its panel collide on a bare name by construction,
  because the panel is labelled by its tab.
- Drive a `<summary>` with `clickDisclosure`, which applies the same reachability conditions and
  throws its own voices. The provider's role locators do not resolve it, because it is exposed as a
  native disclosure rather than through a role.

## Region-scoped resolution

Reach for `clickAccessibleWithin(region, role, name)` where a short verb such as `Add` repeats
across a page, and where a rendered status completes a control's accessible name. It applies the
same reachability conditions inside the region and names the region in every voice it throws.

## Input and traversal

| Verb                         | Contract                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `typeAccessible(name, text)` | Focus the field, select all, delete, then send real keystrokes. Escape the provider's key syntax in the text. |
| `fillAccessible(name, text)` | Replace the value in one operation for text too long to type. The real element still publishes real input.    |
| `pressKeys(keys)`            | Send a provider keyboard sequence for Enter, arrows, modifiers, and combinations.                             |
| `traverseAccessible(name)`   | Move focus by forward Tab from wherever focus is, and return the target after focus lands on it.              |

- Reach for `typeAccessible` where the keystrokes are part of what the journey claims, and
  `fillAccessible` where the text is only a payload the person pastes.
- Let `traverseAccessible` end the walk. It counts a step only where focus lands, stops at one
  complete cycle of the tab order, carries the trail of what focus reached in its voice, and holds a
  cap above the cycle so a page with no tab order fails instead of hanging.
- Never call the browser's focus method to place focus, and never hold a node reference across
  traversal steps. A framework may replace the node between resolution and focus arrival.

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
- Record what a journey did with `createJournal`, started inside the journey and stopped in a
  `finally`. Its `steps` and `output` are the evidence a failing journey hands back, and the input
  the run's written artifact composes.

## The capture hook

`createPortfolio` is the capture door and `place(state, element?)` is the hook.
[captures.md](captures.md) owns the registry, the variant matrix, and the proofs that read what it
wrote.
