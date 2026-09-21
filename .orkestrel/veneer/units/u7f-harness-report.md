# U7f-harness report

## Readme paragraph

Run `node u7f-harness.mjs` from the scaffold checkout root. It drives managed Chromium
(through the Playwright installation at `veneer/node_modules/playwright`) over Elements' built
showcase at `#/button`, and writes the portfolio to `tmp/capture/elements/`, emptying that
directory first. It drives two selectors: the primary Variants specimen
`#button-variants button.primary` (`ButtonPage.vue:100-108`, the button.primary inside the
`#button-variants` section) for rest, focus, hover, and active, and the toggle host
`#button-toggle button.primary` (`ButtonPage.vue:694`, the button.primary inside the
`#button-toggle` section) for pressed — `#button-toggle` itself is a `<section>`, not the button,
so the brief's `#button-toggle` names that section rather than a button id. The showcase did not
boot from a `file://` URL (module script or fetch refusal), so the script falls back to a minimal
`node:http` static server bound to an ephemeral loopback port, torn down after every run. The
focus walk pressed Tab 51 times before reaching the primary specimen at every variant, well under
the 60-press bound.

## Run console output

```text
U7f-harness complete.
Output directory: C:/Users/mikes/WebstormProjects/scaffold/tmp/capture/elements
- file:// boot: the showcase did NOT boot from file:// (module script or fetch refusal); fell back to a minimal node:http static server on an ephemeral port.
- Selectors used: variants-section specimen "#button-variants button.primary" (ButtonPage.vue:100-108, the button.primary inside #button-variants), pressed host "#button-toggle button.primary" (ButtonPage.vue:694, the button.primary inside #button-toggle). #button-toggle itself is a <section>, not the button; the brief's "#button-toggle" names that section.
```

No console or page-error messages were captured from the showcase page at any variant (each
`<variant>-console.json` file reads `[]`).

## Output directory listing

```text
dark-1280-console.json          2 bytes
dark-1280-steps.jsonl           707 bytes
dark-1280.txt                   636 bytes
dark-390-console.json           2 bytes
dark-390-steps.jsonl            705 bytes
dark-390.txt                    636 bytes
elements-button-primary-active--dark-1280.png    948 bytes
elements-button-primary-active--dark-390.png     942 bytes
elements-button-primary-active--light-1280.png   949 bytes
elements-button-primary-active--light-390.png    950 bytes
elements-button-primary-focus--dark-1280.png     107437 bytes
elements-button-primary-focus--dark-390.png      44410 bytes
elements-button-primary-focus--light-1280.png    106975 bytes
elements-button-primary-focus--light-390.png     44045 bytes
elements-button-primary-hover--dark-1280.png     924 bytes
elements-button-primary-hover--dark-390.png      953 bytes
elements-button-primary-hover--light-1280.png    976 bytes
elements-button-primary-hover--light-390.png     930 bytes
elements-button-primary-pressed--dark-1280.png   105024 bytes
elements-button-primary-pressed--dark-390.png    46155 bytes
elements-button-primary-pressed--light-1280.png  104729 bytes
elements-button-primary-pressed--light-390.png   46333 bytes
elements-button-primary-rest--dark-1280.png      99524 bytes
elements-button-primary-rest--dark-390.png       39729 bytes
elements-button-primary-rest--light-1280.png     104501 bytes
elements-button-primary-rest--light-390.png      39832 bytes
light-1280-console.json         2 bytes
light-1280-steps.jsonl          709 bytes
light-1280.txt                  636 bytes
light-390-console.json          2 bytes
light-390-steps.jsonl           707 bytes
light-390.txt                   636 bytes
steps-all.jsonl                 2828 bytes
unknowns.txt                    515 bytes
```

Every reachable state (`rest`, `pressed`, `focus`, `hover`, `active`) produced a frame at all four
variants (`light-1280`, `light-390`, `dark-1280`, `dark-390`) — twenty frames total, none reported
absent. Every variant carries its `.txt` ARIA snapshot (636 bytes, non-empty) and its
`<variant>-steps.jsonl` step log; `steps-all.jsonl` concatenates every variant's steps in run
order.

## Frames opened and what each shows

- `elements-button-primary-rest--light-1280.png`: the light-theme showcase at the button page,
  scrolled to top, showing the "Variants" section with the unpressed `Primary` button in its
  normal (rest) painted state — no hover ring, no focus ring, no pressed styling. Confirms the
  `light` theme applied and the rest capture carries no incidental interaction state.
- `elements-button-primary-pressed--dark-1280.png`: the dark-theme showcase scrolled to the
  "useButton — toggle composable" section, showing the toggle button reading "On — click to turn
  off," "Live state: `active = true`," and an event-log entry
  `elements:button:toggle → active: true`. Confirms the `dark` theme applied, the pressed click
  landed on the real toggle host, and `aria-pressed` mirrored to the visible state before the
  frame was shot.

## Unknowns as found

- **`file://` boot**: the showcase did not boot from a `file://` URL — the probe navigation timed
  out waiting for `#button-variants` to become visible (module script or fetch refusal under
  `file:`). The script fell back to its minimal `node:http` static server, serving
  `elements/dist/showcase/` on an ephemeral `127.0.0.1` port, torn down in the `finally` block on
  every exit path.
- **`#button-toggle` viewport reach at 390**: not an issue in practice — the harness scrolls
  implicitly through Playwright's full-page screenshot and explicit locator waits rather than
  needing the toggle host inside the initial viewport; `toggleHost.waitFor({ state: 'visible' })`
  and `.click()` auto-scroll the element into view before acting, and this succeeded at both `390`
  and `1280` widths across both themes.
- **Exact selectors**: `#button-variants button.primary` for the Variants specimen driving rest,
  focus, hover, and active (`ButtonPage.vue:100-108`: the `v-for` variant button whose `:class="v"`
  resolves to `primary` for the first entry in `VARIANTS`), and `#button-toggle button.primary`
  for the pressed host (`ButtonPage.vue:694`: `<button ref="toggleBtn" type="button" class="primary"
  @elements:button:toggle="logToggle">`). The brief names `#button-toggle` as "the pressed host",
  but that id belongs to the surrounding `<section>`, not the `<button>` itself — the harness
  resolves the button as a descendant of that section.
- **Tab bound**: the focus walk reached the primary specimen after 51 presses at every variant
  (well inside the 60-press bound named in the brief), because the Variants section's primary
  button sits after every preceding focusable element on the page (nav links, filter input,
  earlier button rows).

## `git status --porcelain` of the scaffold checkout

```text
(empty)
```

Nothing is tracked or untracked under `tmp/`, which the root `.gitignore` file excludes; the run
left no trace in `git status`.
