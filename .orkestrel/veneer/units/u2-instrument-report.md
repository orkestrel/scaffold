# U2-instrument report (builder, native Sonnet, 2026-09-20, 115 s)

File: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/research/calibration.mjs` (`node --check` passes).

Constants as written:

- `SPECIMENS` (frozen array, one entry per row): `body-copy`, `heading-h1`..`heading-h6`, `button-bare`, `button-primary`, `button-subtle`, `button-small`, `button-large`, `button-disabled`, `dialog-modal`, `dialog-nonmodal`, `details`, `popover`, `popover-hint`, `aside-drawer` — each with `route`, `reach` (`{ role, name }` or `{ css }`), and `states`.
- `STATES`: `rest`, `hover`, `focus-visible`, `active`, `disabled`, `open`, `closed`.
- `PROPERTIES`: `font-family`, `font-size`, `line-height`, `font-weight`, `padding-top`, `padding-right`, `padding-bottom`, `padding-left`, `border-top-width`, `border-top-left-radius`, `color`, `background-color`, `border-top-color`, `box-shadow`, `outline`, `transition-property`, `transition-duration`, `transition-timing-function`, `opacity`, `transform`, `translate`.
- `MOTIONS` (frozen array): `dialog-modal-open/close`, `dialog-nonmodal-open/close`, `details-open/close`, `popover-open/close`, `popover-hint-open/close`, `drawer-open/close`, each naming its `specimenId` and `direction`.

Three places most likely to need a selector adjustment if the map's reach was wrong:

1. `popover` (`id: 'popover'`) uses `[popover]:not([popover="hint"])` as its CSS reach rather than the map's accessible-name route, because the popover panel itself has no button role; if the showcase panel carries a different attribute shape this selector will not match.
2. `details`'s `open`/`close` controls both reuse the summary's accessible name as a toggle target (native disclosure has one control for both directions); if the built showcase renders the summary text differently this breaks both directions at once.
3. `dialog-modal` and `dialog-nonmodal` share the reach selector `dialog` scoped only by page navigation state, not by which dialog is open; if the route renders more than one `<dialog>` simultaneously reachable, the locator can resolve ambiguously and needs a more specific selector (for example, keyed by the open trigger's `aria-controls` or a role/heading-scoped lookup).
