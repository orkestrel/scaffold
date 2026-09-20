# Instrument readings

Each row records a browser-side capability the plan depends on, the instrument that measured it,
the browser and date, and the reading. A reading here settles what an instrument can see; it
accepts no Veneer behavior.

| Question                                                                                               | Instrument                            | Browser and date                                                                     | Reading                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Does `CSSStyleDeclaration` enumerate custom properties declared in a `:root` rule read through `document.styleSheets`, inside a `@layer` block, and under a scoped selector? | [`instruments/cssom-probe.mjs`](instruments/cssom-probe.mjs) | Playwright `chromium-1234` (Chromium `151.0.7922.34`) and Edge `153.0.4234.48`, 2026-09-20 | Yes on both. `Array.from(rule.style)` lists `--vn-a` on the bare `:root` rule, `--vn-b` on the `:root` rule inside `@layer base` (reached through `CSSLayerBlockRule.cssRules`), and `--vn-c` on `[data-bs-theme="dark"]`. The control rule `.control { color: blue }` lists no custom property. |

Run an instrument from the scaffold checkout with `node .orkestrel/veneer/research/instruments/<name>.mjs`.
Each imports Playwright from scaffold's `node_modules` through a `file:///` URL, because Node on
Windows refuses a bare drive-letter path as an ESM specifier. Playwright `1.63` pins Chromium
revision `1243`, which is not installed on this host; the instruments launch the installed `1234`
build by executable path and Edge by channel. Install the pinned revision in a workspace with
`npx playwright install chromium` after `npm ci`.

Open questions U5 in [the plan](../plan.md) answers the same way: hover through the provider,
pseudo-element used values, media emulation through `cdp()`, and a pointer hold for `:active`.
