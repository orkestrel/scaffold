# Research brief — J-ENGINE native platform survey (Cursor Grok, read-only, bounded primary sources)

Route `grok` on Cursor Grok (`grok-4.7-high`), `--mode=ask`, read-only, rooted at `/home/user/veneer`
(the session branch tip `87ff1d0`). Perform the research directly and spawn nothing. Use your web
tools for the primary sources named here; if you have no web tool, say so in the first line of the
distillate and answer from the installed sources only. Capture `git status --porcelain` before and
after; any change is a deviation. Return evidence with a source pointer per fact (a URL with its
section title, or `file:line`), no raw dumps, no decisions, no design, no edits. Never read
`dist/`, `node_modules/bootstrap/dist/`, `tmp/`, or a lockfile.

## Question

For each Bootstrap 5.3.8 plugin obligation the J-ENGINE phase must replace (Collapse, Dropdown, Tab,
ScrollSpy, Modal, Offcanvas, Tooltip, Popover, Alert, Toast, Carousel, and the `Backdrop`,
`FocusTrap`, `ScrollBarHelper`, `Swipe`, `Sanitizer`, and `TemplateFactory` utilities), which
native browser systems can carry it, what each offers and refuses, and what Chromium 141 (the
receipts' host, `ROADMAP.md` § Standing conditions) ships? Ruling D41 (`ROADMAP.md` § Rulings, the
last bullet; `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` § D41) binds the
phase to native browser systems, no runtime dependency outside `@orkestrel/*`, and each candidate
ruled on; the § Rulings paragraph opening "Build every entity on explicit construction" binds its
shape. The plugin obligations are already distilled in
`/home/user/scaffold/.orkestrel/veneer/units/b-collapse-terrain-report.md` § B (the four disclosure
plugins) and, once retained, `b-modal-terrain-report.md` § B; do not re-read the plugin sources.

## Evidence sought

A. **Platform features, one row each**, with the specification section, the MDN page, the
   Chromium version that shipped it, and the behaviour it gives and withholds: the Popover API
   (`popover`, `popovertarget`, `togglePopover`, `beforetoggle`, `toggle`, `:popover-open`, the
   top layer, light dismiss), `<dialog>` with `showModal` and `closedby`, `inert`, invoker
   commands (`command`, `commandfor`, `CommandEvent`), CSS anchor positioning (`anchor-name`,
   `position-anchor`, `position-area`, `position-try-fallbacks`, `position-visibility`),
   `@starting-style` and `transition-behavior: allow-discrete` with `display` and `overflow`
   transitions, `hidden="until-found"` and `beforematch`, `<details name>` and the `toggle` event,
   `interpolate-size` and `calc-size()` for height `auto` transitions, `IntersectionObserver` v2,
   `ResizeObserver`, `scroll-snap` with `scrollend` and `scrollIntoView` options,
   `CloseWatcher`, `AbortSignal.any` and `AbortSignal.timeout`, the Web Animations API
   (`getAnimations`, `finished`, `commitStyles`), `Element.setHTML` and the Sanitizer API,
   `scrollbar-gutter: stable`, `overscroll-behavior`, `focus({ focusVisible })`,
   `HTMLElement.togglePopover` return values, `navigator.userActivation`, and
   `matchMedia('(prefers-reduced-motion: reduce)')`.
B. **Obligation → candidate systems.** For each plugin obligation, the platform features from A
   that can carry each of lifecycle, cancellation, focus, motion, placement, dismissal, scroll
   locking, and cleanup, and the gap each leaves (for example: a `<dialog>` modal's backdrop is
   `::backdrop`, its scroll lock is not native; the Popover API's light dismiss versus Bootstrap's
   `autoClose` matrix; anchor positioning versus Popper's flip and shift; `interpolate-size`
   versus measuring `scrollHeight` for the collapse transition).
C. **Elements and Mailbox as prior art.** For each obligation, the factory that carries it in
   `/home/user/elements/src/browser/factories/` and `/home/user/mailbox/src/browser/factories/`,
   which platform feature it uses today, and the lesson its comments or guide record (grep `lesson`,
   `because`, `refuse`, `never`, `fallback` in those files and in `/home/user/elements/guides/`).
D. **The Orkestrel surface.** The exports of `@orkestrel/contract` (`node_modules/@orkestrel/contract/dist/*.d.ts`)
   and of every other `@orkestrel/*` package installed under `node_modules/@orkestrel/`
   (list them with `ls`), each with the primitives an engine could reuse (guards, emitters,
   lifecycles, abort handling, deferreds, recorders) as `file:line` pointers; name nothing outside
   what the declarations export.
E. **Bootstrap's own compatibility surface.** From `guides/veneer.md` `## Compatibility`: every
   `engine` row and the paragraphs on accepted scope, the jQuery exclusion, and the Popper
   pass-through options (quote), so the phase knows what a consumer is promised today.

## Output

One distillate with a section per lettered item, each fact with its source pointer, a per-obligation
table in B, contradictions between sources called out, and a closing list of unresolved inputs
(features whose Chromium status could not be read). No design, no recommendation, no edits.
