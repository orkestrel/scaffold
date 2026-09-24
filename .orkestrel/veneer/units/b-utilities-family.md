# B-UTILITIES family record — the rulings and obligations every unit reads

This record is the one home of the family's rulings. A unit brief points here and restates none of
it. Where this record and the tree disagree, the tree wins and the unit stops and reports. The
measurements live in `b-utilities-terrain-report.md` (§ A the map, § B the helpers, § C the gap
pattern, § E the tokens, § G sizing, § H the files the family makes false) and the design brief's
restated intersection and inventory reading; the design rulings in
`../b-utilities-design-verdict.md` (R1 to R17); every B-PASSIVE ruling in `b-passive-family.md`
and `b-passive-baseline.md` still binds unless a ruling here amends it.

## The units

| Unit | Mechanism | Partials | Region and section | Wave |
| --- | --- | --- | --- | --- |
| UTIL-SPACER (`us`) | the mixins; `gap`, `column-gap`; the Tailwind contract; the utilities-order case | `_mixins.scss` (the `utility` and `utility-variable` mixins), `utilities/_gap.scss` | Layout (gap specimens appended) | 1 |
| UTIL-PAINT (`up`) | role paint, opacity locals, borders, radius | `utilities/_background.scss`, `utilities/_border.scss` | Background, Border | 2 |
| UTIL-TEXT (`ut`) | text formatting and colour, `.text-bg-*`, truncation, the `link` relocation | `utilities/_text.scss`, `utilities/_color.scss`, `utilities/_link.scss` (moved), `components/_text-truncation.scss` | Text, Color | 2 |
| UTIL-FONT (`uf`) | font family, size, style, weight, line height | `utilities/_font.scss` | Type (appended) | 2 |
| UTIL-SPACING (`usp`) | margin, padding, pointer events, user select | `utilities/_spacing.scss`, `utilities/_interaction.scss` | Spacing, Interaction | 2 |
| UTIL-DISPLAY (`ud`) | display with print, flex, alignment, order, stacks | `utilities/_display.scss`, `utilities/_flex.scss`, `utilities/_vertical-align.scss`, `components/_stacks.scss` | Display, Flex | 2 |
| UTIL-PLACEMENT (`upl`) | sizing, position, offsets, stacking, visibility, visually hidden | `utilities/_sizing.scss`, `utilities/_position.scss`, `utilities/_visually-hidden.scss`, `utilities/_visibility.scss`, `components/_position.scss` as `position-component` | Sizing, Position, Visibility | 2 |
| UTIL-FLOW (`ufl`) | float, clearfix, overflow, object fit, stretched link | `utilities/_float.scss`, `utilities/_overflow.scss`, `utilities/_object-fit.scss`, `components/_clearfix.scss`, `components/_stretched-link.scss` | Float, Overflow, Object fit; Links (appended) | 2 |
| UTIL-EFFECT (`ue`) | shadow, opacity, focus ring | `utilities/_shadow.scss`, `utilities/_opacity.scss`, `components/_focus-ring.scss` | Shadow, Opacity, Focus ring | 2 |

Every unit runs in its own worktree from the commit the launch names, on `opus`; wave 2 runs in
parallel after UTIL-SPACER lands. A mirrored proof `tests/src/styles/<dir>/<stem>.test.ts` and a
section proof `tests/app/browser/sections/<Name>Section.test.ts` exist per partial and per section
(the policy mirror law).

## Rulings that bind every unit

1. **Bootstrap's set exactly (D2, D6).** The built cascade emits every selector, declaration,
   custom property, and at-rule condition the pinned inventory records for the key
   (`tests/fixtures/oracle/inventory.json`), less nothing (no utility is deferred), and nothing
   else; every difference takes a `#### <key>` table row under `### Departures`; every extra name
   takes a `### Additions` row; no negative margin ships (R9); the `rtl: false` wrapper comments
   never ship (D5).
2. **The mixins (R4, as UTIL-SPACER landed them).** Every utility partial writes its entries
   through `utility($class, $properties, $values, $infix: '', $responsive: false, $locals: (),
   $state: ())` and `utility-variable($class, $variable, $values, $state: ())` in the release's map
   order inside one `breakpoint-each` walk; each pseudo-class in `$state` emits `.NAME-PSEUDO:PSEUDO`
   directly after the base rule with the same body, and an empty `$class` drops the infix's leading
   hyphen (`.md-KEY`); a partial writes no utility entry's `!important` by hand. UTIL-TEXT's link
   entries (`.link-opacity-N-hover:hover` and `.link-underline-opacity-N-hover:hover` through
   `utility-variable` with `$state`, `.link-offset-N-hover:hover` through `utility` with `$state`)
   and UTIL-PAINT's `css-var` utilities are the mixins' first shipped consumers after the gap keys.
3. **Tokens (R2).** Bind only where the ruling names a token; write every release `var(--bs-*)`
   byte for byte; keep every other value a literal; add no token; prove a retune moves the
   consumer and, for the space scale, that density moves it.
4. **Layers (R5).** An important helper sits in the `utilities` layer ahead of the utility partials;
   a normal helper sits in `components` in the release's `_helpers.scss` order; the barrel's
   utilities block follows the release's map order; each unit inserts its `@use` lines at those
   positions and returns the order case's expected-list extension as a patch.
5. **Priorities (R6).** Properties important, locals and `css-var` declarations normal, helpers as
   recorded; each proof reads the priority over an unlayered rule and the `@layer utilities`
   escape.
6. **Dark axis (R11).** No mode rule in a utility partial; the tiers read the theme's `--bs-*`
   aliases; each proof reads inside a dark island.
7. **Tailwind (R10).** Each unit measures every shared name it ships against Tailwind's longhands
   (the expanded declarations through the installed compiler in the consumer proof), adds each to
   `tests/fixtures/tailwind/markup.html`, and returns its exclusion-line names; the line and its
   copies (`tests/setup.css`, `consumer.css`, `preflight.css`, the guide's recipe fences) integrate
   as a set union; the consumer proof reads each name resolving to the cascade's declaration.
8. **The showcase (R12).** A region per mechanism named for the release's documentation page, one
   `SpecimenSection` subclass per region fed by `<KEY>_COPY` and `<KEY>_SPECIMENS`, constructed
   after `VisibilitySection` and before `NavbarSection` in barrel order (re-baselined 2026-09-24
   against `2a3f223`, where NAVBAR landed its component region after the utility regions); a specimen shows a ramp, a responsive behaviour,
   or a driven state and composes only classes shipped at the launch commit plus its own; a hidden
   or viewport subject takes visible context; `.vw-100`, `.fixed-*`, and `.sticky-*` render inside a
   shell `.viewport` frame that paints nothing (UTIL-PLACEMENT owns it).
9. **The registries (R13).** One resting `CASCADE_KEYS` row per specimen, focus reveals in
   `DRIVEN_KEYS`, subjects in `CaptureSubject`, the family close's stem rule obeyed, frames through
   `FRAMES.page` in the journey, all as report-only patches appended in landing order.
10. **The proof shape (R14).** Every proof reads the token and its retune, the factor or its
    absence, the mode, every infix at its boundary and one pixel below through `visitBreakpoint`,
    the cross-entry order, the priority over an unlayered rule, and the escape; the report carries
    the coverage matrix, the shared-name table, and the precedence cases with their mutations.
11. **The guide (R15).** One `### <Page> utilities` section per region in the voice of
    `### Table classes`, the helpers documented beside their mechanism; a `### Files` row per
    partial; the compatibility rows; the `#### <key>` tables; the Additions rows; the § Tests
    links; every code token with its noun; a report-only patch while another unit owns the guide.
12. **Shared and off-limits files.** Report-only for every unit: `src/styles/index.scss`,
    `tests/setupServer.test.ts` (the dash-proof list's key entries, as every unit's brief grants
    it; the UTIL-SPACER round-2 audit's R-a settled the record against the brief),
    `src/styles/_mixins.scss` (except UTIL-SPACER), `tests/setup.ts`, `tests/setup.test.ts`,
    `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/conformance.test.ts`,
    `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
    `tests/app/browser/integration.test.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`,
    `app/browser/index.ts`, `tests/setup.css`, `tests/fixtures/tailwind/*` (except UTIL-SPACER),
    `guides/veneer.md`, `ROADMAP.md`. Off-limits for every unit: every other unit's owned files,
    `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/fixtures/oracle/**`,
    `tests/setupServer.ts`, `src/styles/_theme.scss`,
    `src/styles/_tokens.scss`, `src/styles/elements/**`, `src/browser/**`, `src/core/**`,
    `configs/**`, `vite.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`,
    `README.md`.
13. **Gates, cheap first.** Scoped `oxfmt`, `format:check`, `lint:check`, `check`, `build:src`,
    `test:setup`, the owned proofs under the styles project, the section proofs,
    `test:conformance`, `test:guides`, `test:policy`; `build:src:styles && test:service` for a unit
    that ships a shared name; the journey and `CAPTURE=1` are the Orchestrator's observations.
14. **Forced colours (R16).** `.focus-ring:focus` includes `forced-ring`, an Additions row.
15. **A stop condition.** A unit that needs the `attributeSelector` ladder in `tests/setupServer.ts`
    to change stops and reports.

## Host facts

Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
Chromium installed; a `CAPTURE=1` journey run of one variant takes about two minutes; the journey's
variants are 390 and 1280 in light and dark; `visitBreakpoint` reads a boundary at the boundary and
one pixel below it; `stageMedia` stages `print`, `forced`, and the reduced-motion preference.
