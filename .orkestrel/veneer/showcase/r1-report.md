Committed `8a84e5f1ab3a68e49de48296589e591cefa29c05`. The working tree is clean. Both required trailers are present. Nothing was pushed.

The findings are closed as follows:

| Finding | Change and proof |
|---|---|
| Population | [Matrix assertion](/home/user/veneer/tests/app/browser/integration.test.ts:529) compares the complete ordered IDs against `GROUPS` expanded through `SECTIONS`, excluding Tailwind. Every variant read **79 blocks, zero departures**. |
| Pseudos | [Collector](/home/user/veneer/tests/setupBrowser.ts:710) derives candidates from preflight, checks generation, and retains list markers. [Setup proofs](/home/user/veneer/tests/setupBrowser.test.ts:325) cover candidate equality, search fields, filled placeholders, hidden/detached elements, and backdrops. |
| Unexcluded compile | Every `TAILWIND_READINGS` row has a measured control value. The [matrix control](/home/user/veneer/tests/app/browser/integration.test.ts:601) asserts every row and records its reading. |
| Face/theme pairs | [Pair scenarios](/home/user/veneer/tests/setupBrowser.ts:1086) reach all four combinations through both header buttons. They assert pressed states, status text, padding, and body background. The journey checks each harness’s object and markup tallies. |
| Caption numbers | [Captions](/home/user/veneer/app/browser/sections/tailwindcss.html:26) retain the measured padding, margin, and gap numbers. Unchecked counts and dimensions were removed, including the numeric breakpoint. Spacing explicitly attributes preservation to Bootstrap’s `!important`. [Showcase](/home/user/veneer/showcase/browser.html) was rebuilt and committed. |

The negative controls produced these results:

| Control | Red evidence | Restored result |
|---|---|---|
| A: omit `containers` from expected population | Exit **1**; two matrix failures: received `+ "containers"` | Both width-specific population assertions passed; final journey gate passed |
| B: filled placeholder field | Exit **1**; one failure: expected `[]`, received `["::placeholder"]` | Same scoped command: exit **0**, one passed |
| C: remove control sheet | Exit **1**; expected `32px`, `collapse`, `1280px`; received `12px`, `visible`, `1140px` | Same scoped command: exit **0**, two passed |
| C: omit paired button actions | All four pair names appeared in `harness.failures` | Restored pair harness passed in every variant |
| D: force caption spacing to `15px` | Exit **1**; J4 expected `16px`, received `15px` | Restored J4 passed in every variant |

These were the commands, each preceded by the required PATH/environment export:

```sh
# A
flock /home/user/.wave/journey.lock ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --project journey:light-390 --project journey:light-1280 -t 'R1 measures|reads the resolved values'

# B
./node_modules/.bin/vitest run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts -t 'collects only the pseudo-elements'

# C
flock /home/user/.wave/journey.lock ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --project journey:light-1280 -t 'reads the resolved values|drives the stylesheet-set'

# D
flock /home/user/.wave/journey.lock ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --project journey:light-1280 -t 'J4 compares'
```

The unexcluded values were measured before pinning, then verified in both themes:

| Subject / property | 390 px | 1280 px |
|---|---|---|
| Padding button / `padding-left` | `32px` | `32px` |
| `.mt-3` / `margin-top` | `16px` | `16px` |
| `.gap-4` / `column-gap` | `24px` | `24px` |
| `.collapse` / `display` | `block` | `block` |
| `.collapse` / `visibility` | `collapse` | `collapse` |
| `.container` / `padding-left` | `12px` | `12px` |
| `.container` / `max-width` | `none` | `1280px` |
| Pill button / `border-top-left-radius` | `800px` | `800px` |
| `.grid` / `display` | `grid` | `grid` |
| `.md:flex` / `display` | `block` | `flex` |
| `.mt-[1rem]` / `margin-top` | `16px` | `16px` |
| `img` / `display` | `block` | `block` |
| `ul` / `list-style-type` | `none` | `none` |
| `[hidden]` / `display` | `none` | `none` |

Pair witnesses read Bootstrap/Tailwind padding as `12px`/`32px`, and light/dark backgrounds as `#fff`/`#212529`.

Search decoration followed the brief’s allowed contingency: on both search fields, a pseudo-only `opacity: 0.123` rule still produced computed opacity **`1`**, matching the input. The candidate remains excluded with a comment and a regression proof.

All final gates passed:

| Gate | Exit | Result |
|---|---:|---|
| `npm run build` | 0 | Package and app builds passed |
| `npm run build:showcase` | 0 | Showcase rebuilt |
| `npm run format:check` | 0 | 355 files checked |
| `npm run lint:check` | 0 | No diagnostics |
| `npm run check` | 0 | All compiler projects passed |
| `npm run test:app:browser` | 0 | 8 files; 218 passed |
| `npm run test:setup:browser` | 0 | 2 files; 72 passed |
| `flock /home/user/.wave/journey.lock npm run test:journey` | 0 | 4 variants; 48 passed |
| `flock /home/user/.wave/journey.lock env CAPTURE=1 npm run test:journey` | 0 | 4 variants; 48 passed |
| `npm run test:policy` — final retry under the lock | 0 | 119 passed; 1 existing skip |

The capture set contains **304 files**, exactly equal to the baseline: no additions or omissions. Every filename is `{state}--{variant}.png`, with variants `light-390`, `light-1280`, `dark-390`, and `dark-1280`, and these states:

```text
accordion, alerts, arrival, background, badge, borders, breadcrumb,
button-group, buttons, card, carousel, checks-radios, clearfix,
close-button, collapse, color-background, colored-links, columns,
containers, contents-index, display, dropdowns, engine-states, figures,
flex, float, floating-labels, focus-ring, form-controls, form-layout,
grid, group-rhythm, gutters, icon-link, images, input-group, interactions,
link-utilities, list-group, live-components, modal, navbar, navs-tabs,
object-fit, offcanvas, opacity, overflow, pagination, placeholders,
popovers, position-helpers, position-utilities, progress, range, ratio,
select, shadows, sizing, spacing, spinners, stacks, stretched-link,
tables, tailwindcss, tailwindcss-face, text, text-truncation, toasts,
tooltips, typography, validation, vertical-align, vertical-rule,
visibility, visually-hidden, z-index
```

Two verification issues were resolved. The initial setup gate failed because the navbar search field was hidden at the fixture width; setting that proof to 1280 px with viewport cleanup changed **1 failed / 71 passed** to **72 passed**. A concurrent policy rerun exceeded its existing five-second timeout; serialized execution passed without source changes in **2.37 seconds**. The policy skip concerns the absent repository-local writing canon.

No unowned files or known out-of-scope failures were changed. Measurements used **Chromium 141.0.7390.37**, under the [documented engine bound](/home/user/veneer/configs/browsers.ts:280).