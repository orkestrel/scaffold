Held the **subjective design lane on GPT-5.6 Sol**, substituting unavailable Opus. This is a design recommendation from source and supplied failure evidence; I ran no tests against the active writer.

**Keep acting reachability strict. Permit observation of the trigger already resolved before opening, and pair that observation with the visible dialog outcome.** No upstream API change is necessary for this bounded application correction.

The governing boundary permits this distinction. `references/layer.md:106–122` explicitly allows readers, including `readStates`, to receive a held element, while verbs resolve their own reachable target. Its retained-node prohibition at `layer.md:221` concerns traversal steps. `.claude/rules/tests.md:291–292` permits DOM attributes and prohibits private state. Roughnotes’ guide expressly says the trigger’s attribute remains a settle observation even when focus moves into the dialog (`tmp/recovery/roughnotes/guides/README.md:150–156`).

Use this smallest implementation shape in the existing helpers:

- **Opening:** resolve `button / Menu` before the click. Click through `clickAccessible`. Use published `waitForCondition` to observe `trigger.isConnected && readStates(trigger).includes('expanded')`. Then await `waitForAnimations(document.body)` and assert the named dialog’s rendered menu text through `readPerception(COPY.menu)`. Assert the reachable dismissal and the exact refusal of the covered masthead trigger.
- **Closing:** click the reachable dismissal unconditionally. Use published `waitForCondition` with `readRefusal('button', COPY.menu) === undefined` to await restored trigger reachability. Then use `waitForState('button', COPY.menu, 'collapsed')`, followed by `waitForAnimations(document.body)`. Assert that `readPerception(COPY.menu)` refuses with `Named region "Menu" is not visible`.
- Apply the same closing sequence wherever `followSite` waits for compact-menu dismissal. Keep navigation’s visible destination assertion beside that sequence.

The published animation example uses `document.body`; this also covers the backdrop without resolving a private CSS class (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2479`). Keep the existing `openSite` and `closeSite` names. Add no observation-mode switch, new public helper, or stored menu handle.

The behavior these primitives actually permit explains the correction:

- `waitForState` resolves through `resolveRendered` on every reading and propagates a reachability refusal immediately (`dist/src/browser/index.js:999–1031`; declaration at `index.d.ts:2525–2534`). It therefore cannot observe the masthead trigger during opening or while closing still withholds it.
- `readStates` reads authored ARIA state without acting or resolving a target (`index.js:875–901`).
- `waitForCondition` propagates predicate errors; it doesn’t retry resolver failures (`dist/src/core/index.js:239–255`). Closing must therefore poll `readRefusal`, rather than repeatedly call a resolver inside its predicate.
- `waitForAnimations` measures motion, not destination identity (`dist/src/browser/index.js:1065–1119`). Named dialog perception remains necessary.

When opening resolves, the person can perceive the menu heading and destinations, use its dismissal, and encounter the modal boundary. The expansion assertion proves the authored lifecycle announcement; it doesn’t prove a screen reader announced that change. When closing resolves, the menu is concealed, the masthead trigger is reachable and announces collapse, and the observed finite animations have finished. `App.vue:57–63,154` ties the announcement to `shown` and `hidden`.

**Require a browser probe on a frozen snapshot before adopting this shape.** The remaining uncertainty is its timing through the installed provider, including backdrop completion. Run the named setup proof after updating its unreachable-trigger assertion to use a pre-opening observation:

```powershell
npx vitest run --config tmp/probe/r-b-setup/vite.config.ts --no-cache --reporter=verbose --project "setup:browser" -t "opens and closes compact navigation and resolves only the modal action"
```

Run from `tmp/recovery/roughnotes`. Record the dialog perception, trigger states, exact modal refusal, and settled captures for opening and closing. Omit the opening click and require the opening destination assertion to fail. Omit dismissal and require the closing assertion to fail. Move expansion to opening start and verify that the helper still waits for motion to finish. Make the covered masthead control reachable without renaming it and require the refusal assertion to fail.

A replaced trigger must cause an honest failure through the connection guard; this local observation does not acquire `waitForState`’s generic node-replacement semantics. The supplied log establishes the prescribed settle failure at `tmp/units/setup-diagnostic.log.txt:305–312`; it provides no evidence that the proposed correction passes.
