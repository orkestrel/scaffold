# Baseline evidence — Rough Notes, 2026-09-16

Taken by the Orchestrator on a clean tree at `d5b1ac1`-equivalent tip `27cd1b7`, before any
redesign edit. Every reading below names the command that produced it.

## Gates

```
npm run format:check   RED   — tests/app/browser/styles/mixins.test.ts
npm run lint:check     GREEN
npm run check          GREEN
npm run test:app       GREEN — 39 files, 102 passed, 1 skipped
npm run test:policy    GREEN — 111 passed
npm run test:config    GREEN — 46 passed
```

## The declared capture variants

Command, once per variant:

```
VITE_VARIANT=<variant> npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/integration.test.ts
```

| Variant      | Result                      |
| ------------ | --------------------------- |
| `light-1280` | 18 passed                   |
| `dark-1280`  | 3 failed, 15 passed         |
| `light-390`  | 4 failed, 13 passed, 1 skip |
| `dark-390`   | 5 failed, 12 passed, 1 skip |

`npm test` runs `--project app:browser` without `VITE_VARIANT`, so it only ever runs `light-1280`.
Three of the four declared variants are red and no gate in the chain reads them.

Distinct failures, with the exact reported message:

- **V1** `dark-1280`, `dark-390` — `expected 'No interactive element has the access…' to be undefined`
  at `tests/app/browser/integration.test.ts:234`. The theme control cannot be resolved by its
  dark-mode accessible name after `app.theme(true)`.
- **V2** `light-390`, `dark-390` — `Interactive target "Shop" is not visible and focus-reachable`.
  At 390 the site destinations live only inside the closed offcanvas.
- **V3** `light-390`, `dark-390` — `Interactive target "Skip to content" is not reachable through
  forward Tab traversal`, with the traversal walking offcanvas links straight into footer links:
  `A:Shop > A:Contact > A:Get started > A:RoughNotes-Pro > A:Advantage-Plus > …`.
- **V4** `dark-390` — `expected '' to be 'payment-customer'`. The payment error-summary link does
  not move focus to the field it names.
- **V5** every red variant — the capture family's own completeness proof fails because the states
  its failed journeys would have placed were never placed.

## The captured portfolio

`tmp/capture/states/<state>--<variant>.png`, written by the same commands with `VITE_CAPTURE=true`.
`light-1280` is complete at 13 states; the red variants are short by the states their failed
journeys own.

## The resolved-style matrix

`tmp/journeys/light-1280.txt` records three readings for the whole surface:

```
contrast | Shop catalog | 15.538
contrast | Subscribe free | 5.763
ring | Subscribe free | 21.000
```

## Sass

`npm run build` and every capture run emit 313 repetitive deprecation warnings traced to
`app/browser/styles/index.scss:2`, which reaches Bootstrap through `@import`.
