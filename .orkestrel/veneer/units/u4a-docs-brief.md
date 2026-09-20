# Unit U4a-docs — Bootstrap 5.3 documented JavaScript and theming contract

## Role and engine

`researcher` on native Sonnet. You are a native subagent: perform the assignment directly and
spawn nothing. You are read-only and you write no file; your final message is the distillate.
This job is Grok's by default; it runs here because the Cursor print-mode lane cannot reach the
web, and that substitution is recorded in the campaign's routing ledger.

## Question

For each Bootstrap 5.3 JavaScript component and for its color-mode and Reboot contracts, what does
the official documentation commit to: data attributes, option tables with defaults and types,
methods, events, keyboard behavior, dismissal rules, accessibility notes, and the CSS variables
each component documents?

## Context

Fetch these pages, at these URLs, and nothing else:

- `https://getbootstrap.com/docs/5.3/getting-started/javascript/`
- `https://getbootstrap.com/docs/5.3/components/alerts/`
- `https://getbootstrap.com/docs/5.3/components/buttons/`
- `https://getbootstrap.com/docs/5.3/components/carousel/`
- `https://getbootstrap.com/docs/5.3/components/collapse/`
- `https://getbootstrap.com/docs/5.3/components/dropdowns/`
- `https://getbootstrap.com/docs/5.3/components/modal/`
- `https://getbootstrap.com/docs/5.3/components/offcanvas/`
- `https://getbootstrap.com/docs/5.3/components/popovers/`
- `https://getbootstrap.com/docs/5.3/components/scrollspy/`
- `https://getbootstrap.com/docs/5.3/components/navs-tabs/`
- `https://getbootstrap.com/docs/5.3/components/toasts/`
- `https://getbootstrap.com/docs/5.3/components/tooltips/`
- `https://getbootstrap.com/docs/5.3/customize/color-modes/`
- `https://getbootstrap.com/docs/5.3/content/reboot/`

Read nothing in any local repository. The contract comes from the official pages alone; a page that
does not load is an unknown, never a guess.

## Evidence to return, per page

1. **Options.** The option table verbatim: name, type, default, description, with the page URL and
   the heading it sits under.
2. **Methods.** The method table: name and description, plus every asynchronous-method note and
   every "returns to the caller before the transition ends" note.
3. **Events.** The event table: name, description, and whether the page says it can be prevented.
4. **Data attributes and markup.** Every `data-bs-*` attribute the page shows and the minimal
   markup the page gives as the component's baseline, including required classes and `aria-*`
   attributes.
5. **Keyboard and accessibility.** Every documented key, every focus rule, and every accessibility
   note or warning.
6. **CSS variables.** The component's documented `--bs-*` variables list and the Sass variables
   and maps the page names, with the version note ("Added in v5.2.0" and the like).
7. **Color modes.** From the color-modes page: the `data-bs-theme` attribute contract, the built-in
   mode names, the nested-scope rule, the documented `color-mode()` mixin and the JavaScript
   toggler the page shows, and every CSS variable list it gives.
8. **Reboot.** From the reboot page: each element the page restyles, the rule it documents, and
   the CSS variables it names.

## Bound

Fetch only the URLs above. Stop when every page has its rows or is named unknown. Return no more
than a conformance ledger needs to pair each documented obligation with the source reading a
separate lane takes from `bootstrap/js/src`.

## Output

Return only, in this order: `Question` (one line); `Evidence` (one `###` heading per page, rows in
the order listed under § Evidence to return, the page URL on every claim); `Distillate` (one table
per component: `Obligation | Kind | Page` where `Kind` is one of `attribute`, `option`, `method`,
`event`, `keyboard`, `dismissal`, `accessibility`, `variable`); `Unknowns` (every page or row not
reached, with the fetch error verbatim); `Deviation` (anything that stopped you). No process diary.
