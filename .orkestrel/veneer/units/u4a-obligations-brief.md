# Unit U4a-obligations — Bootstrap 5.3.8 JavaScript behavior obligations, from source

## Role and engine

`grok` on Cursor Grok 4.6, reached through the Cursor CLI in `--mode=ask`. You are the engine
reading this brief inside your own CLI: perform the assignment directly and spawn nothing. You are
read-only: edit nothing, run nothing, and return evidence with `file:line` pointers, never raw file
dumps, decisions, or design.

## Question

For each Bootstrap 5.3.8 JavaScript component, what behavior does the official source commit to:
data attributes, option keys with their defaults and types, static and instance methods, event
names with their cancelability, keyboard handling, dismissal rules, initialization forms, and the
shared utilities each one depends on?

## Context

Read these, at absolute paths, and nothing outside them:

- `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` — the installed official
  source at version 5.3.8 (`package.json` in the parent directory states the version; quote it).
  Component files: `alert.js`, `button.js`, `carousel.js`, `collapse.js`, `dropdown.js`,
  `modal.js`, `offcanvas.js`, `popover.js`, `scrollspy.js`, `tab.js`, `toast.js`, `tooltip.js`;
  the base `base-component.js`; the utilities `util/backdrop.js`, `util/component-functions.js`,
  `util/config.js`, `util/focustrap.js`, `util/index.js`, `util/sanitizer.js`, `util/scrollbar.js`,
  `util/swipe.js`, `util/template-factory.js`; the DOM layer `dom/data.js`, `dom/event-handler.js`,
  `dom/manipulator.js`, `dom/selector-engine.js`.
- `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/dist/js/bootstrap.esm.js` only to
  confirm the exported names and the version banner on its first lines.

Do not read anything under `C:/Users/mikes/WebstormProjects/veneer/src`, `app`, or `tests`, and
nothing in any other repository. The obligations come from the official artifact alone.

## Evidence to return, per component

1. **Identity.** `NAME`, `DATA_KEY`, `EVENT_KEY`, and the `Default` and `DefaultType` objects
   verbatim as key, default value, and declared type, with `file:line`.
2. **Data attributes.** Every `data-bs-*` attribute the component reads through
   `Manipulator.getDataAttributes` or a selector (`data-bs-toggle`, `data-bs-target`,
   `data-bs-dismiss`, `data-bs-slide`, and the rest), the selector string that binds it, and the
   document-level delegated handler that reacts to it, with `file:line`.
3. **Methods.** Every static method (`getInstance`, `getOrCreateInstance`, `jQueryInterface`,
   `clearMenus`, and the rest) and every instance method on the class, with the guard that makes it
   a no-op (`_isShown`, `_isTransitioning`, `disabled`) and `file:line`.
4. **Events.** Every event name the component triggers, in the order it fires, with whether the
   trigger checks `defaultPrevented` (cancelable) and the payload keys (`relatedTarget`, `clickEvent`,
   `direction`, `from`, `to`), with `file:line`.
5. **Keyboard.** Every key the component handles (`Escape`, `ArrowUp`, `ArrowDown`, `ArrowLeft`,
   `ArrowRight`, `Home`, `End`, `Tab`, `Space`) and what each does, with `file:line`.
6. **Dismissal and outside interaction.** Click-outside, `Escape`, `backdrop` `static` behavior,
   `keyboard` option, `autohide`, and `focus` handling, with `file:line`.
7. **Transitions.** Where the component reads a transition through `executeAfterTransition` and
   `getTransitionDurationFromElement`, which class names it adds and removes in what order
   (`show`, `showing`, `hiding`, `fade`, `collapsing`, `collapse`, `active`), and the
   `TRANSITION_END` emulation, with `file:line`.
8. **Shared utilities.** For `backdrop.js`, `focustrap.js`, `scrollbar.js`, `swipe.js`,
   `sanitizer.js`, `template-factory.js`, `config.js`, `event-handler.js`, `selector-engine.js`,
   `data.js`, and `manipulator.js`: the exported surface, the options each takes, and which
   components construct them, with `file:line`.
9. **Initialization forms.** Constructor signature, `enableDismissTrigger`, `defineJQueryPlugin`,
   the `DOMContentLoaded` wiring in `util/index.js`, and the `data-bs-*` auto-initialization for
   tooltip, popover, and scrollspy, with `file:line`.

## Bound

Read only the paths above. Stop when every component and utility has its rows. Return no more than
a conformance ledger needs to assign each obligation to a unit or an exclusion.

## Output

Return only, in this order: `Question` (one line); `Evidence` (the per-component rows in the order
listed under § Evidence to return, `file:line` on every claim, one `###` heading per component and
per utility); `Distillate` (one table per component: `Obligation | Kind | Source` where `Kind` is one
of `attribute`, `option`, `method`, `event`, `keyboard`, `dismissal`, `transition`, `initialization`);
`Unknowns` (every row not reached); `Journal` (your session id); `Deviation` (anything that stopped
you). No process diary.
