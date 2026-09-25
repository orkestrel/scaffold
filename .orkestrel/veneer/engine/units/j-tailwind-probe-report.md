# J-TAILWIND-PROBE — the writer's report (opus on Opus 5.5, 2026-09-25)

# J-TAILWIND-PROBE report

Every scenario in `PLUGIN_SCENARIOS` reads zero departures when Veneer runs under the consumer preflight profile instead of alone. The control shows the profile reached the recorder's page and changed computed styles. A planted rule shows the same path reports a stylesheet-driven difference. On this reading, no engine unit needs to follow.

## Control reading (step 5)

The `tmp/probe/tailwind-control.test.ts` file loads the collapse scenario markup twice, once per stylesheet, with the same `<link rel="stylesheet">` page shape the recorder uses. It reads the computed styles in the following table.

| Element | Property | Alone | Tailwind |
| --- | --- | --- | --- |
| `html` | `tab-size` | `8` | `4` |
| `html` | `border-top-style` | `none` | `solid` |
| `html` | `line-height` | `normal` | `24px` |
| `html` | `font-family` | `"Times New Roman"` | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, …` |
| `#header-one` (`h2.accordion-header`) | `border-top-style` | `none` | `solid` |
| `#body-one` (`.accordion-body`) | `border-top-style` | `none` | `solid` |
| `#header-one`, `#panel-body`, `#trigger`, `#body-one` | `tab-size` | `8` | `4` |

Values Veneer's own element rules declare did not move. The `line-height` value on `#header-one` stayed `36px`, and the component `font-family` stayed Veneer's stack. This matches the guide's statement that the reset arrives under Veneer's `elements` layer.

The file adds two more controls:
- **Null control:** two recordings of collapse under the alone runtime gave `nullDepartures: []`. The recorder adds no departure from run noise.
- **Planted control** (`tmp/probe/tailwind-plant.test.ts`): the compiled profile plus `#panel.show { opacity: 0; }`, recorded on collapse, gave 24 `visibility` departures on `panel` and `panel-body`. That path does report a stylesheet difference. Output is in `out/plant.departures.json`.

## How the compiled profile reaches the page

1. `compileProfile(TAILWIND_PATHS.consumer.preflight)` compiles in Node. The output is one flat 393,646-byte sheet:
   - It has no leftover `@import` rule.
   - Its only `url()` values are inline `data:` SVGs.
   - Its layer statements, in order, are `@layer properties;`, `@layer theme, reset, base, elements, components, utilities;`, `@layer theme, base, components, utilities;`, and `@layer base;`.
2. The tailwind runtime is `{ ...compileVeneerRuntime(), stylesheet: profile }`. So it carries the same `script`.
3. `recordPluginOracle` writes that `stylesheet` to `runtime.css` in its scratch directory. The `file://` page links it exactly as it links Veneer's own sheet.
4. There were no compile errors, load errors, failed requests, console errors, or page errors, and `link.sheet` was non-null on both pages.

One workaround: reading `cssRules` on a `file://` page throws `SecurityError`. My first control run exited 1 on that, so the control checks `link.sheet !== null` instead.

The built cascade that the profile imports (`dist/src/styles/index.css`) is byte-identical to the alone runtime's in-memory stylesheet (`builtEqualsAlone: true`). The only difference between the two runtimes is the Tailwind additions.

## Departures table

Every scenario was recorded under both runtimes. Each `<plugin>.departures.json` file under `tmp/j-tailwind-probe/out/` is `[]`, so the table has no rows.

| Plugin | Steps recorded | Departures |
| --- | --- | --- |
| collapse | 16 | none |
| alert | 10 | none |
| tab | 12 | none |
| scrollspy | 10 | none |
| dropdown | 18 | none |
| carousel | 14 | none |
| modal | 22 | none |
| offcanvas | 18 | none |
| toast | 14 | none |
| tooltip | 14 | none |
| popover | 16 | none |

## Reading of cause (hypothesis)

The preflight profile leaves every oracle facet unchanged: tag, class, attribute, visibility, content, parent, scroll, focus, and lock. The evidence:
- Veneer's `elements` layer sits after the `base` layer.
- The reset's moves are on properties the reader does not record: `tab-size`, border style under a zero border width, the root font and line height, and form-control box metrics.
- The null control shows the recorder is deterministic, and the planted control shows a visibility-affecting rule is caught.

This reading does not cover geometry, inline style, or opacity values. E28's limits exclude those from the oracle, and a preflight layout move there would not show up.

## Extra reading: class names Tailwind would generate

The profile scans only `markup.html`. A consumer's scan would also see the scenario classes, so I checked which of those class names Tailwind generates (`tmp/probe/tailwind-collide.test.ts`):
- **Already withheld by the exclusion line:** `collapse`, `me-auto`, and `px-3`.
- **Not withheld:** `p-3` (toast) and `w-100` (carousel).

I then compiled the profile with `@source inline("p-3 w-100")` in place of the markup line (`tmp/probe/tailwind-extended.test.ts`). Both utilities were present in the sheet, and toast and carousel read `[]` departures. The guide lists `p-*` and the width steps as names off the exclusion line that Veneer declares with `!important`.

## Commands run

Each command ran from `/c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tailwind-probe`, with its log under `tmp/j-tailwind-probe/`.

| Command | Exit code |
| --- | --- |
| `npm run build:src:styles` | 0 |
| `npm run test:probe -- tmp/probe/tailwind-control.test.ts` (first run, `cssRules` read) | 1 |
| `npm run test:probe -- tmp/probe/tailwind-control.test.ts` | 0 |
| `TAILWIND_PLUGINS=collapse,alert,tab,scrollspy,dropdown npm run test:probe -- tmp/probe/tailwind-census.test.ts` | 0 |
| `TAILWIND_PLUGINS=carousel,modal,offcanvas npm run test:probe -- tmp/probe/tailwind-census.test.ts` | 0 |
| `TAILWIND_PLUGINS=toast,tooltip,popover npm run test:probe -- tmp/probe/tailwind-census.test.ts` | 0 |
| `npm run test:probe -- tmp/probe/tailwind-plant.test.ts` | 0 |
| `npm run test:probe -- tmp/probe/tailwind-collide.test.ts` | 0 |
| `npm run test:probe -- tmp/probe/tailwind-extended.test.ts` | 0 |
| `git status --short` | 0 |

## Git status

`git status --short` prints nothing, so no tracked file changed. `git status --short --ignored` shows only `dist/`, `node_modules/`, and `tmp/`.

## Files

All probe files are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tailwind-probe/tmp/probe/`:
- `tailwind-control.test.ts`
- `tailwind-census.test.ts`
- `tailwind-plant.test.ts`
- `tailwind-collide.test.ts`
- `tailwind-extended.test.ts`

The recordings, departures, findings per slice, `control.json`, `profile.css`, `alone.css`, `collide.json`, and `extended.css` are in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tailwind-probe/tmp/j-tailwind-probe/out/`.

## Deviation state

No deviation. I settled these within the brief:
- **File layout:** one probe file per question.
- **Slicing:** three plugin slices through `TAILWIND_PLUGINS`.
- **Control check:** `link.sheet` in place of `cssRules`.
- **Extra readings:** I added the planted, null, collision, and extended readings. The brief did not name them. I ran them to show that a zero result means the path works rather than that the probe missed.
