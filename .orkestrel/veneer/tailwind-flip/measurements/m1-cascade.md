# M1 cascade mechanics

Chromium `141.0.7390.37` (from `browser.version()`, launched with `executablePath` `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` because the bundled Playwright expects `chromium_headless_shell-1243`, which is absent). 213 readings, each a fresh `page.setContent` with one inline `<style>` per sheet in the stated order; values are read from `getComputedStyle` by iterating its indexed longhand names.

Order statement: `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;`. Compat statement: `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities, compat;`.

Definitions: BS is `.x { margin-top: 16px !important }`; TW is `@layer utilities { .x { margin-top: 12px } }`; RESET is `@layer reset { .x { margin-top: 4px } }`.

## Class sets

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

The class sets have these sizes: shared 209, shared utilities 192, shared components 17; category sizes components 608, composables 8, modifiers 144, utilities 1265. Shared components: `caption-top`, `col-1`, `col-10`, `col-11`, `col-12`, `col-2`, `col-3`, `col-4`, `col-5`, `col-6`, `col-7`, `col-8`, `col-9`, `col-auto`, `collapse`, `container`, `table`.

## Findings

- Unlayered `!important` beats layered normal in both source orders: a.1 and a.2 read 16px.
- Layered `!important` beats unlayered `!important` in both source orders and from either layer: b.1 to b.4 read 12px.
- Among layered importants the earlier layer wins regardless of source order: b.5 and b.6 (reset 4px !important against utilities 12px !important) read 4px.
- `revert-layer !important` in any of the 10 statement layers reads 0px (user agent) beside BS and TW, in both sheet positions; in `compat` (last layer) it reads 12px, the utilities value.
- `revert-layer !important` never rolls back to the unlayered BS value: d3.rli.compat (RESET, BS, compat rollback) reads 4px, skipping BS 16px; each reading rolls back to the nearest earlier layer that declares the property (d.rli: reset 0px, base 4px, bootstrap 4px, utilities 4px, compat 12px).
- `revert-layer` without `!important` reads 16px in every layer beside BS (c.rln, d.rln, d3.rln): a normal declaration loses to the unlayered `!important`.
- Without BS, normal `revert-layer` rolls back as well: d2.rln.utilities reads 4px (the later same-layer rule beats TW and rolls back to reset) and d2.rln.compat reads 12px; d2.rln in reset, base, and bootstrap reads 12px because utilities TW outranks those layers.
- `revert !important`, `unset !important`, and `initial !important` read 0px in every layer, including `compat`, in both positions.
- `inherit !important` reads the parent's value in every layer in both positions: margin-top 7px (explicit inheritance applies to a non-inherited property) and color rgb(7, 7, 7); the controls without the L sheet read 16px and rgb(16, 16, 16).
- Unlayered `.card .x` 20px beats layered normal TW (20px), loses to unlayered BS `!important` (16px), and loses to layered utilities `!important` (12px), in both source orders.
- Preflight `@layer base { * { margin: 0 } }` overrides an `h1` rule in layer reset (0px) and loses to the same rule in layer bootstrap (8px), in both source orders; the bare `h1` UA margin-bottom reads 21.44px.
- `@layer base { [hidden] { display: none !important } }` beats unlayered `.d-flex { display: flex !important }` in both orders (none); with both unlayered, the later rule wins: [hidden] first reads flex, [hidden] second reads none.

## Baselines

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

| Reading | Element.property | Sheets in order | Value | Expected |
| --- | --- | --- | --- | --- |
| 0.ua | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` | **0px** | 0px |
| 0.bs | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.x { margin-top: 16px !important }` | **16px** | 16px |
| 0.tw | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer utilities { .x { margin-top: 12px } }` | **12px** | 12px |
| 0.reset | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` | **4px** | 4px |

## a. Unlayered important against layered normal

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

| Reading | Element.property | Sheets in order | Value | Expected |
| --- | --- | --- | --- | --- |
| a.1 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` | **16px** | 16px |
| a.2 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer utilities { .x { margin-top: 12px } }` → `.x { margin-top: 16px !important }` | **16px** | 16px |

## b. Layered important against unlayered important

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

| Reading | Element.property | Sheets in order | Value | Expected |
| --- | --- | --- | --- | --- |
| b.1 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px !important } }` | **12px** | 12px |
| b.2 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer utilities { .x { margin-top: 12px !important } }` → `.x { margin-top: 16px !important }` | **12px** | 12px |
| b.3 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.x { margin-top: 16px !important }` → `@layer reset { .x { margin-top: 12px !important } }` | **12px** | 12px |
| b.4 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 12px !important } }` → `.x { margin-top: 16px !important }` | **12px** | 12px |
| b.5 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px !important } }` → `@layer reset { .x { margin-top: 4px !important } }` | **4px** | 4px |
| b.6 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px !important } }` → `@layer utilities { .x { margin-top: 12px !important } }` → `.x { margin-top: 16px !important }` | **4px** | 4px |

## c. Rollback and wide keywords per layer beside BS and TW

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

Sheet order "after": statement, BS, TW, L sheet. Sheet order "before": statement, L sheet, BS, TW. For L = compat the statement is the compat statement. The color rows replace BS and TW with `.x { color: rgb(16, 16, 16) !important }` and `@layer utilities { .x { color: rgb(12, 12, 12) } }`.

| Declaration in @layer L | reset after | reset before | base after | base before | bootstrap after | bootstrap before | theme after | theme before | elements after | elements before | components after | components before | surfaces after | surfaces before | composables after | composables before | modifiers after | modifiers before | utilities after | utilities before | compat after | compat before |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `revert-layer !important` | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 12px | 12px |
| `revert-layer` | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px | 16px |
| `revert !important` | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px |
| `unset !important` | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px |
| `initial !important` | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px | 0px |
| `inherit !important (margin-top, parent 7px)` | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px | 7px |
| `inherit !important (color, parent rgb(7, 7, 7))` | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) | rgb(7, 7, 7) |

Controls without an L sheet:

| Reading | Body | Sheets in order | Value |
| --- | --- | --- | --- |
| c.ihi.base0 | `<div style="margin-top: 7px; color: rgb(7, 7, 7)"><div class="x"></div></div>` | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` | **16px** |
| c.ihc.base0 | `<div style="margin-top: 7px; color: rgb(7, 7, 7)"><div class="x"></div></div>` | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.x { color: rgb(16, 16, 16) !important }` → `@layer utilities { .x { color: rgb(12, 12, 12) } }` | **rgb(16, 16, 16)** |

## d. Rollback targets with RESET, BS, and TW

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

| Reading | Sheets in order | Value | Source of value |
| --- | --- | --- | --- |
| d.rli.reset | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer reset { .x { margin-top: revert-layer !important } }` | **0px** | user agent |
| d.rln.reset | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer reset { .x { margin-top: revert-layer } }` | **16px** | unlayered BS |
| d.rli.base | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer base { .x { margin-top: revert-layer !important } }` | **4px** | reset (RESET) |
| d.rln.base | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer base { .x { margin-top: revert-layer } }` | **16px** | unlayered BS |
| d.rli.bootstrap | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer bootstrap { .x { margin-top: revert-layer !important } }` | **4px** | reset (RESET) |
| d.rln.bootstrap | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer bootstrap { .x { margin-top: revert-layer } }` | **16px** | unlayered BS |
| d.rli.utilities | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer utilities { .x { margin-top: revert-layer !important } }` | **4px** | reset (RESET) |
| d.rln.utilities | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer utilities { .x { margin-top: revert-layer } }` | **16px** | unlayered BS |
| d.rli.compat | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities, compat;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer compat { .x { margin-top: revert-layer !important } }` | **12px** | utilities (TW) |
| d.rln.compat | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities, compat;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer compat { .x { margin-top: revert-layer } }` | **16px** | unlayered BS |

### d2. Supplementary: RESET and TW without BS

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

| Reading | Sheets in order | Value | Source of value |
| --- | --- | --- | --- |
| d2.rli.reset | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer reset { .x { margin-top: revert-layer !important } }` | **0px** | user agent |
| d2.rln.reset | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer reset { .x { margin-top: revert-layer } }` | **12px** | utilities (TW) |
| d2.rli.base | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer base { .x { margin-top: revert-layer !important } }` | **4px** | reset (RESET) |
| d2.rln.base | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer base { .x { margin-top: revert-layer } }` | **12px** | utilities (TW) |
| d2.rli.bootstrap | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer bootstrap { .x { margin-top: revert-layer !important } }` | **4px** | reset (RESET) |
| d2.rln.bootstrap | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer bootstrap { .x { margin-top: revert-layer } }` | **12px** | utilities (TW) |
| d2.rli.utilities | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer utilities { .x { margin-top: revert-layer !important } }` | **4px** | reset (RESET) |
| d2.rln.utilities | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer utilities { .x { margin-top: revert-layer } }` | **4px** | reset (RESET) |
| d2.rli.compat | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities, compat;` → `@layer reset { .x { margin-top: 4px } }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer compat { .x { margin-top: revert-layer !important } }` | **12px** | utilities (TW) |
| d2.rln.compat | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities, compat;` → `@layer reset { .x { margin-top: 4px } }` → `@layer utilities { .x { margin-top: 12px } }` → `@layer compat { .x { margin-top: revert-layer } }` | **12px** | utilities (TW) |

### d3. Supplementary: RESET and BS without TW

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

| Reading | Sheets in order | Value | Source of value |
| --- | --- | --- | --- |
| d3.rli.reset | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer reset { .x { margin-top: revert-layer !important } }` | **0px** | user agent |
| d3.rln.reset | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer reset { .x { margin-top: revert-layer } }` | **16px** | unlayered BS |
| d3.rli.base | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer base { .x { margin-top: revert-layer !important } }` | **4px** | reset (RESET) |
| d3.rln.base | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer base { .x { margin-top: revert-layer } }` | **16px** | unlayered BS |
| d3.rli.bootstrap | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer bootstrap { .x { margin-top: revert-layer !important } }` | **4px** | reset (RESET) |
| d3.rln.bootstrap | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer bootstrap { .x { margin-top: revert-layer } }` | **16px** | unlayered BS |
| d3.rli.utilities | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: revert-layer !important } }` | **4px** | reset (RESET) |
| d3.rln.utilities | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer utilities { .x { margin-top: revert-layer } }` | **16px** | unlayered BS |
| d3.rli.compat | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities, compat;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer compat { .x { margin-top: revert-layer !important } }` | **4px** | reset (RESET) |
| d3.rln.compat | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities, compat;` → `@layer reset { .x { margin-top: 4px } }` → `.x { margin-top: 16px !important }` → `@layer compat { .x { margin-top: revert-layer } }` | **16px** | unlayered BS |

## e. Specificity against layers

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

| Reading | Element.property | Sheets in order | Value | Expected |
| --- | --- | --- | --- | --- |
| e.1 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.card .x { margin-top: 20px }` → `@layer utilities { .x { margin-top: 12px } }` | **20px** | 20px |
| e.1r | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer utilities { .x { margin-top: 12px } }` → `.card .x { margin-top: 20px }` | **20px** | 20px |
| e.2 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.card .x { margin-top: 20px }` → `.x { margin-top: 16px !important }` | **16px** | 16px |
| e.2r | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.x { margin-top: 16px !important }` → `.card .x { margin-top: 20px }` | **16px** | 16px |
| e.3 | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.card .x { margin-top: 20px }` → `@layer utilities { .x { margin-top: 12px !important } }` | **12px** | 12px |
| e.3r | `.x` margin-top | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer utilities { .x { margin-top: 12px !important } }` → `.card .x { margin-top: 20px }` | **12px** | 12px |

## f. Preflight against reboot by layer

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

| Reading | Element.property | Sheets in order | Value | Expected |
| --- | --- | --- | --- | --- |
| f.0 | `h1` margin-bottom | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` | **21.44px** |  |
| f.1 | `h1` margin-bottom | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer base { * { margin: 0 } }` → `@layer reset { h1 { margin-bottom: 8px } }` | **0px** | 0px |
| f.1r | `h1` margin-bottom | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer reset { h1 { margin-bottom: 8px } }` → `@layer base { * { margin: 0 } }` | **0px** | 0px |
| f.2 | `h1` margin-bottom | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer base { * { margin: 0 } }` → `@layer bootstrap { h1 { margin-bottom: 8px } }` | **8px** | 8px |
| f.2r | `h1` margin-bottom | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer bootstrap { h1 { margin-bottom: 8px } }` → `@layer base { * { margin: 0 } }` | **8px** | 8px |

## g. Layered important against unlayered important on hidden

Probe: `/home/user/veneer/tmp/probes/flip/m1-cascade/probe.ts`. Output: `/home/user/veneer/tmp/probes/flip/m1-cascade/output.json`.

| Reading | Element.property | Sheets in order | Value | Expected |
| --- | --- | --- | --- | --- |
| g.1 | `div` display | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `@layer base { [hidden] { display: none !important } }` → `.d-flex { display: flex !important }` | **none** | none |
| g.1r | `div` display | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.d-flex { display: flex !important }` → `@layer base { [hidden] { display: none !important } }` | **none** | none |
| g.2 | `div` display | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `[hidden] { display: none !important }` → `.d-flex { display: flex !important }` | **flex** | flex |
| g.2r | `div` display | `@layer reset, base, bootstrap, theme, elements, components, surfaces, composables, modifiers, utilities;` → `.d-flex { display: flex !important }` → `[hidden] { display: none !important }` | **none** | none |
