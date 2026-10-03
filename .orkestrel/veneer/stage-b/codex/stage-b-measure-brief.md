# Unit stage-b-measure — measure the native surfaces stage B could add, in this Chromium

## Role and lane

`analyst` (GPT-6 Astra through `codex exec`, reasoning effort high), objective lane, read-only over the repository: edit no file under `src`, `app`, `tests`, `guides`, `configs`, or the root, other than probes you delete before returning. Perform the assignment yourself and spawn nothing. Checkout `C:\Users\mikes\WebstormProjects\veneer` at `main` `9885975`; another writer works in a separate worktree and does not touch this checkout.

## Subject

Stage B of `@orkestrel/veneer`'s browser engine adds native browser surfaces and APIs to the engine wherever it does not use them yet, as opt-in pieces of a blank-slate engine, reconciled case by case with Bootstrap 5.3.8's markup, class, data-attribute, event, and focus contracts. A design panel rules after this lane. Read first: `tmp/units/native-inventory-1.md` and `tmp/units/native-inventory-2.md` (the per-subject inventory and its unverified list), `tmp/units/native-research-agent-4.md` (the research critic's six gaps), and skim `tmp/units/native-research-agent-0.md` to `-3.md` and `-5.md` to `-10.md` (primary-source research per feature) for what the documentation claims. `tmp/codex/browser-stage-b-design-verdict.md` § D3 already measured the four first-scoped pieces (`<dialog class="modal">`, the `scrollbar-gutter` lock, `interpolate-size` collapse, `popover="manual"` floats); reuse those readings and do not repeat them.

## Measure

For each item: the presence in this Chromium with default flags (Playwright 1.63.0's Chromium 153.0.8010.12 under `npx vitest run --config vite.config.ts --project src:browser <probe>`), the behavior the design needs, a control that must fail under the same conditions, and, where a Bootstrap contract is at stake, Bootstrap's own engine on identical markup in the oracle frame (`createOracle` in `tests/setupBrowser.ts`).

1. Close-request veto. Escape on an `auto` popover, a `hint` popover, a `<dialog>` with `closedby="any"` and `"closerequest"`, and a modal dialog: whether the page can veto each (a `cancel` listener's `preventDefault`, a `beforetoggle` on hide), with and without a prior user activation, and on a repeated Escape; the event order. Then which Bootstrap `hide.bs.*` veto survives on each surface.
2. Default-flag state of the disputed features: the full `popover="hint"` model, CSS `interactivity: inert`, `focusgroup`, `interestfor` with its events and `::interest-button`, `position-visibility` and its initial value, `TransitionEvent.animation`, `document.activeViewTransition`, `ViewTransition.waitUntil`, `:target-before` and `:target-after`, and the dialog focusing steps.
3. Native scroll lock: whether a root `overflow: hidden` with `scrollbar-gutter: stable`, an `html:has(dialog:modal)` rule, or `overscroll-behavior: contain` on a dialog locks page scroll without Bootstrap's padding compensation, with `.fixed-top`, `.sticky-top`, and an overflowing modal measured, against Bootstrap's own lock.
4. Accessibility mapping through CDP `Accessibility.getFullAXTree` (with a control node of known role and state): the implicit `expanded` on `popovertarget`, `commandfor`, and `interestfor` invokers and on `<summary>`; `modal` on a `showModal` dialog; and whether an author-set `aria-expanded` or `aria-describedby`, as Bootstrap writes them, overrides or conflicts.
5. Toasts and alerts: `Element.ariaNotify` presence; a `role="status"` live region inside a shown `manual` popover in the top layer (the accessibility event or tree change it produces); and the top-layer order of a toast against a modal dialog, a dropdown, and a tooltip.
6. DOM APIs: `Element.moveBefore` (state preserved across a move, for a tip container and a body-level modal), `Element.checkVisibility` against Bootstrap's `isVisible` on its own cases, `scrollIntoView({ container })`, `focus({ focusVisible })`, and ARIA element reflection (`ariaControlsElements`, `ariaDescribedByElements`).
7. Disclosure: `hidden="until-found"` with `beforematch` on a collapse panel (find-in-page reveal, through CDP or a documented substitute); exclusive `<details name>` groups against Bootstrap's accordion siblings; `::details-content` with `interpolate-size` animation and its `transitionend` behavior.
8. Carousel and scrolling: `::scroll-marker`, `::scroll-marker-group`, `::scroll-button`, `scroll-target-group`, and `:target-current` presence and their event model, against Bootstrap's carousel indicators and controls; scroll-driven animation timelines' presence.
9. Motion: `@starting-style` with `transition-behavior: allow-discrete` on Bootstrap's `.fade` and `.show` toggles and on `display` and `overlay`, with the `getAnimations()` wait, against Bootstrap's reflow idiom; same-document View Transitions around a carousel slide and a tab switch (timing, events, interaction with reduced motion).
10. Invoker commands and `CloseWatcher`: the order of the `command` event against Bootstrap's delegated `click` handlers on one button carrying both `commandfor` and `data-bs-toggle`; `preventDefault` on `command`; the built-in commands (`show-modal`, `close`, `request-close`, `toggle-popover`, `show-popover`, `hide-popover`); custom `--` commands; and `CloseWatcher` grouping and the user-activation requirement with several watchers open.

## Output

Write the readings to `tmp/codex/stage-b-measurements.md` (and the raw readings to `tmp/codex/stage-b-measurements.json`), and return the Markdown as your final message: one section per item with the command, the probe's inputs, the control and its result, the readings (Bootstrap beside the native surface where a contract is at stake), and what the reading settles or leaves open. Then a table: item, present in 153, settles, open. Cite source lines as `path:line`. Delete every probe and confirm `git status --porcelain` is empty before returning. No process diary.

## Deviation contract

On any conflict with this brief, stop and report: expected, found, evidence, done or not done, and one hypothesis.
