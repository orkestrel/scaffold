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
