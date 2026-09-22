# F8a PROFILES — audit claims

Subject: the F8a unit's uncommitted writes in `/home/user/veneer-f8` over `6e74ec9`, written by `opus`
from `/home/user/veneer-f8/tmp/units/f8a-brief.md` under the design
`/home/user/scaffold/.orkestrel/veneer/f8-design-verdict.md`. Evidence:
`/home/user/scaffold/tmp/audit/f8a.diff` (the whole diff, untracked files included as additions),
`f8a-status.txt`, the unit's report `f8a-report.md` (its `## Resolution` section records the path
ruling: the proofs live under `tests/tailwind/`), and the gate chain log `f8a-gates.log.txt`
(complete when its last line reads `=== gates done`; read it last). Every lane rules each claim
CONFIRMED, BROKEN, or UNRESOLVED with `file:line` evidence; a claim about a proof is ruled on the
mutation named and whether the assertions distinguish it.

1. **The project.** `configs/src/vite.tailwind.config.ts` spreads `srcBrowser` the way the styles
   wrapper does, attaches `@tailwindcss/postcss` under `css.postcss`, names the project
   `src:tailwind`, includes `tests/tailwind/**/*.test.ts`, mirrors the styles project's setup files
   ending in the built cascade, and carries a plugin that writes `tmp/tailwind/candidates.txt` (one
   class name per line, read from `dist/src/styles/index.css` the way the probe reads them) on
   `configResolved`, before the profile compiles; `package.json` gains `test:src:tailwind`
   (`npm run build:src:styles && vitest run --config configs/src/vite.tailwind.config.ts …`) and
   `test:src` runs it after `test:src:styles`; `vite.config.ts` and `configs/helpers.ts` are untouched.
2. **The profile files.** `tests/setup.css` carries the order line, the composable imports with
   `source(none)` on the utilities import, `@source '../tmp/tailwind/candidates.txt'`, and the
   exclusion line naming exactly `caption-bottom caption-top col-auto col-1 … col-12 container table`
   without brace ranges; `tests/fixtures/tailwind/preflight.css` is the same with
   `@import 'tailwindcss' source(none)`; `tests/fixtures/tailwind/unexcluded.css` is `tests/setup.css`
   without its exclusion line; none imports the cascade.
3. **The profiles proof.** `tests/tailwind/profiles.test.ts` loads each profile through `?inline`
   and `scene.load` after the cascade and clears in `afterEach`; it asserts each Tailwind profile's
   sheet opens with the order line and the document's effective order stays
   `theme, reset, base, elements, components, utilities`; it pins the measured layer blocks (`[]` for
   `tailwind`, `['theme', 'base']` for `preflight`) — rule whether that reading is stronger than the
   brief's `theme` and `utilities` bullet and true of what `source(none)` plus the exclusion emit;
   it asserts the unexcluded instrument emits `.container` and `.table` and that every `.NAME` the
   instrument emits is named on the exclusion line read from `tests/setup.css?raw` (removing `col-7`
   from the line reddens it; the candidates plugin writing an empty list reddens it); it asserts the
   sheet reader returns Veneer's sheet while a Tailwind sheet is loaded and refuses the planted
   `@layer theme { :root { --tw-probe: 1 } }` sheet.
4. **The sheet reader.** `readCascadeSheet` in `tests/setupBrowser.ts` identifies Veneer's sheet by a
   `--vn-` custom property declared by a style rule inside a `theme` layer block, reaching a nested
   block; `CASCADE_PREFIX`, `collectLayerOrder`, and `collectCustomProperties` are exported, tested
   in `tests/setupBrowser.test.ts` (the reader's refusal plant, the order reading, the property
   reading), and inventoried; reverting the reader to the `theme`-block selection alone fails the
   plant; the existing `PROBE_CASCADE` cases are unchanged.
5. **The standalone case.** `tests/src/styles/index.test.ts` proves exactly one sheet carries the
   Veneer signature and no stylesheet declares a `--tw-` custom property; the report records that
   loading `tests/setup.css?inline` reddens the sheet-count reading and that a `--tw-probe` plant
   reddens both; the expected custom-property namespace set names `--lightningcss-` because the
   minifier lowers `light-dark()` — rule whether asserting that namespace is sound or a toolchain
   coupling the case should not pin.
6. **The guide.** `guides/veneer.md` § Styles gains `### Tailwind` after `### Files` with the profile
   table (profile, entry, layers, parts, proof), one recipe fence per Tailwind profile in the
   consumer's form (the order line, the imports without `source(none)`, `@source './src';`, the
   exclusion line, `@import '@orkestrel/veneer/styles';`), the sentence that the order line never
   changes, the sentence that the exclusion line is the one home of the withheld names and that the
   proof reads it from `tests/setup.css`, the supported version 4.3, and `npm run test:src:tailwind`;
   the deferral bullet in § Departures from the workspace rows is replaced by two landed rows; § Tests
   names the proof; the F6 shared-name sentence points at § Tailwind; every link resolves to
   `tests/tailwind/`; no placeholder remains. The table's "layers Tailwind fills" cells describe a
   consumer recipe scanning markup (reasoned, not measured, per the report): rule whether `theme` and
   `utilities` for `tailwind` and `theme`, `base`, and `utilities` for `preflight` are true of the
   imports each recipe carries.
7. **Scope is honest.** The status lists exactly `guides/veneer.md`, `package.json`,
   `tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`, `tests/src/styles/index.test.ts`, and the
   untracked `configs/src/vite.tailwind.config.ts`, `tests/fixtures/tailwind/`, `tests/setup.css`,
   and `tests/tailwind/`; `tests/src/tailwind/` is gone; `package-lock.json`, `src/**`,
   `tests/setupStyles.ts`, and the vendored files are untouched; `tmp/probe/` is absent;
   `grep -rn 'tests/src/tailwind' guides tests configs package.json` prints nothing.
8. **The gate chain is green**, `test:src:tailwind` included (UNRESOLVED if the log lacks
   `=== gates done` when you read it).
