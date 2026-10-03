# Unit browser-elements — The elements checkout as API guidance for the veneer browser engine

## Role and engine

`grok` on Cursor Grok 4.7 Extra High (`grok-4.7-xhigh`), reached as the Cursor transport (the contract file `cursor.md` in the transports folder of the scaffold checkout at `C:\Users\mikes\WebstormProjects\scaffold`). Executor: BENCH_ENGINE. The bench runs read-only (`--mode=ask`); write nothing.

## Objective

Distill the `elements` checkout's browser factories into guidance for the veneer browser engine: the API shapes the user wants (options, returned instances, events, state attributes), the native browser mechanism each factory builds on, and the platform facts its comments and guides record, each cited to its file and line, so the design round can take the shape and the lessons without copying the code. Veneer's engine is plain JavaScript in `src/browser`, a drop-in replacement for Bootstrap 5.3.8's JavaScript on Bootstrap's own classes and data attributes; the Vue surface wraps that engine in Vue reactivity later, so the `create*` factories are the subject and the `use*` Vue adapters are out of scope. Elements is informational guidance, never a source to copy.

## Context

- **Evidence.** The checkout at `C:/Users/mikes/WebstormProjects/elements` (main at `3b41900`, 2026-06-09). Read these: the guides `C:/Users/mikes/WebstormProjects/elements/guides/composables.md` (79 KB; its § Patterns describes the factories, and its § Shipped catalog and § Per-composable reference describe each factory under the matching `use*` name), `C:/Users/mikes/WebstormProjects/elements/guides/surfaces.md` (39 KB), and `C:/Users/mikes/WebstormProjects/elements/guides/components.md` (68 KB; § Composable pairings and § Surface families only); the source `C:/Users/mikes/WebstormProjects/elements/src/browser/types.ts` (2672 lines; read the per-factory option, instance, and event-map interfaces from line 990 on), `C:/Users/mikes/WebstormProjects/elements/src/browser/constants.ts` (700 lines: the event maps, selectors, data-attribute markers, timing tokens), `C:/Users/mikes/WebstormProjects/elements/src/browser/events.ts`, `C:/Users/mikes/WebstormProjects/elements/src/browser/helpers.ts` (2278 lines; read the sections on events, transition coordination, body-scroll lock, focus, placement, and roving), and every file in the factories folder `C:/Users/mikes/WebstormProjects/elements/src/browser/factories` (20 factories: `createAlert`, `createAside`, `createButton`, `createCarousel`, `createDetails`, `createDialog`, `createDrag`, `createDrop`, `createFocus`, `createForm`, `createMenu`, `createNav`, `createPointer`, `createPopover`, `createSelect`, `createTable`, `createTabs`, `createTheme`, `createToast`, `createTooltip`). The map `tmp/units/browser-map.txt` in the veneer checkout lists every file with its line count and the headings of the guides. Skip the Vue adapters in the composables folder entirely (the user's ruling: the engine is plain JavaScript; the Vue surface wraps it later), and skip the inspector folder, `schema.ts`, `taxonomy.ts`, `traversals.ts`, `patterns.ts`, `tokens.ts`, and the core folder.
- **Law.** `AGENTS.md` § Writing and the rule file `writing.md` in the rules folder of the scaffold checkout: no `should`, `simply`, `just`, `currently`, `now`, `new`, `latest`, `via`, `e.g.`, `i.e.`, `etc.`; present tense; a number only as a count read from the source.
- **Installed primitives.** none; this is a reading lane.
- **Host.** Windows 11; working directory `C:\Users\mikes\WebstormProjects\veneer`; the elements checkout is a sibling directory; the bench is read-only; no network is needed.
- **Standing conditions.** none.

## Unknowns

Where a factory comment states a browser behavior without a measurement (a Chromium version, a timing), report it as the comment's claim with its file:line, not as a fact.

## Scope

- **Owned.** none; the lane writes nothing.
- **Shared (report-only).** none.
- **Off-limits.** Everything in the veneer checkout other than `tmp/units/browser-map.txt` and this brief; the excluded elements files and folders named in Evidence, the composables folder first among them.
- **Made false by this change.** none.
- **Tools and limits.** Reading only; no command that writes.

## Execution

Perform the reading yourself and spawn nothing. Read the guides and `types.ts` first, then the factories, before writing the first slice.

## Output

The distillate in slices, because one final message is cut near 11 KB. The first final message of this session is SLICE 0. Each later turn of the session asks for one slice by number; answer with that slice alone, under 10 KB, with no preamble and no process diary, starting with the slice heading on its own line. Cite every fact as `<path>:<line>` relative to the elements checkout.

The slice headings are fixed:

- SLICE 0 `## Conventions`: what a `create*` factory owns (the adapters are out of scope; name only that the factory is the whole logic and the adapter is plumbing, with the guide's line), the `@vue/reactivity` dependency and what veneer, which has no reactivity dependency in `src/browser`, takes from it (the readonly-state idea and the `effectScope` disposal idea, not the library); the option shape (one-word keys, grouped `dismiss`, `delay`, `trigger`, `scroll`, `autoplay`, `intersection`, the `on` hook map, `initial`); the returned instance shape (readonly state, `show`, `hide`, `toggle`, `update`, `refresh`, `destroy`, idempotent destroy, `assertCleanDispose`); the event model (`elements:{source}:{verb}` CustomEvents on the host, cancelable `show` and `hide` through `dispatch`, informational `open`, `close`, `place`, `prevent`, `activate`, `deactivate` through `emit`, the fixed verb vocabulary, `bindEventMap` over `on`); the state-attribute scheme (`data-{name}-open`, `data-{name}-closing`, the allow-listed globals, `inert` over `aria-hidden`); the transition coordination (`runTransition` with its fallback timeout, `hasTransitionDuration`, `waitForFrame`, the reflow idiom, `@starting-style`, `transition-behavior: allow-discrete`, the dual-attribute gating and the four invariants of the open and closed lifecycle); the body-scroll lock (counter, `paddingRight`, the body attribute); the element gating (`assertElement`).
- SLICE 1 `## Dialog, aside, and focus`: `createDialog` (`showModal` and `show`, `cancel` and `close` bridges, `suppressNativeClose`, the backdrop-click rect test, `dismiss.backdrop` `'static'`, the non-modal scroll lock), `createAside` (the `<aside popover>` drawer, `beforetoggle` and `toggle` bridges, the `popover` mode option, what the strip removed and why), `createFocus` (the tab trap).
- SLICE 2 `## Popover, tooltip, menu, and select`: `createPopover` (`popover="manual"`, `showPopover({ source })`, the explicit `anchor-name` and `position-anchor` pair and why both, inline `position-area` with `align-self` and `justify-self` per placement, `position-try-fallbacks`, `data-popover-side` resolved after a frame, the triggers, the outside-pointerdown dismiss with the touch guard, the Escape dismiss, the `aria-haspopup`, `aria-controls`, `aria-expanded` wiring and restore), `createTooltip` (hover and focus always on, the touch toggle, `role="tooltip"`, `[popover=hint]`), `createMenu` (composes `createPopover`; `aria-expanded` and `aria-haspopup="menu"`; item-click dismiss and `select`; arrow, Home, and End roving; the `flip` threshold as `max-block-size` and `--set-menu-flip`), `createSelect` (only its composition over `createMenu` and its native mirror; skip the filter and IME detail).
- SLICE 3 `## Details, tabs, nav, alert, button, toast, and carousel`: `createDetails` (`[open]`, the summary-click veto through `preventDefault`, the async `toggle` resync, the accordion `deactivate` through sibling events, the `interpolate-size` and `::details-content` animation stance), `createTabs` (`aria-selected` as the source of truth, `aria-controls`, `[hidden]` on panes, roles added when absent, the indicator custom properties, no transition wait and why), `createNav` (IntersectionObserver, `aria-current="location"`, root detection, `rootMargin` from `offset`), `createAlert` (`data-alert-open`, `aria-hidden` after close, `[data-alert-dismiss]`), `createButton` (`aria-pressed`), `createToast` (the `[popover]` host with `role="status"`, the autohide timer with hover and focus pause, the deck stack, the swipe through `createPointer`), `createCarousel` (index and cycling refs, the four Bootstrap class names it keeps, `aria-selected` on indicators, the cancel-mid-flight class cleanup, autoplay `ride`, `pause`, `interval`, `wrap`, keyboard, swipe threshold).
- SLICE 4 `## Platform facts and the mapping to Bootstrap`: (a) a table of every platform fact a comment or guide records, with its file:line and whether the source measured it or asserts it: the Chrome 148+ `@starting-style` cascade-tier leakage and the one-specificity-step rule, `hidePopover()` firing no `transitionend` without a changing property and the fallback timeout, the mobile padding-band dialog click, `position-try-fallbacks` re-evaluation only on the popover's own layout change, `showPopover({ source })` implicit anchor against the explicit `anchor-name` for `anchor()`, `inert` against `aria-hidden` with focused descendants, `beforetoggle` for `<details>` arriving later than for popover, `invalid` not bubbling, `scrollbar-gutter` and fixed descendants, `position: absolute` over the top-layer `fixed` default, `position-visibility: anchors-visible`, the `overlay` and `display` transitions; (b) a mapping table from each Bootstrap 5.3.8 plugin (alert, button, carousel, collapse, dropdown, modal, offcanvas, popover, scrollspy, tab, toast, tooltip) to the elements factory that plays the same role (`createAlert`, `createButton`, `createCarousel`, `createDetails`, `createMenu`, `createDialog`, `createAside`, `createPopover`, `createNav`, `createTabs`, `createToast`, `createTooltip`), with the native mechanism elements uses, the Bootstrap classes or attributes elements keeps (the carousel's four class names, `aria-pressed`, `aria-selected`) or drops (`.show`, `.fade`, `.active` on nav links, the backdrop element, Popper), and the file:line of each.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a named file cannot be read. Settle ancillary choices (column order, grouping inside a slice) yourself and record them at the end of SLICE 0.

## Acceptance criteria

1. Every slice cites `<path>:<line>` relative to the elements checkout for every fact; the dispatch skill's `cite.ts --root C:\Users\mikes\WebstormProjects\elements` resolves every citation (the Orchestrator runs it).
2. SLICE 0 covers every convention listed; SLICE 1 to 3 cover every named factory; SLICE 4 carries both tables with one row per Bootstrap plugin.
3. A fact without a citation is struck; nothing is written from memory of elements or of Bootstrap.

**Observations, not criteria.** none.

## Review evidence

The slices as returned and the journals `tmp/cursor/browser-elements*.jsonl`.
