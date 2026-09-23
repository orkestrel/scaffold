# B-COLLAPSE … B-SCROLLSPY family record — the rulings and obligations every unit reads

This record is the one home of the family's rulings. A unit brief points here and restates none of
it. Where this record and the tree disagree, the tree wins and the unit stops and reports. The
measurements live in `b-collapse-terrain-report.md` (§ A the oracle surface per key, § E the shipped
styles pattern, § H the files the family makes false); the design rulings in
`../b-collapse-design-verdict.md` (R1 to R19); every B-PASSIVE ruling in `b-passive-family.md`
and `b-passive-baseline.md` still binds unless a ruling here amends it; ruling D41 in
`decisions-round-2.md` bounds the family to cascade keys with every state rendered statically.

## The units

| Unit | Keys | Partials under `src/styles/components/` | Sections under `app/browser/sections/` | Wave |
| --- | --- | --- | --- | --- |
| COLLAPSE (`co`) | `collapse`, `collapsing` | `_collapse.scss` | `CollapseSection.ts` | 1 |
| DROPDOWN (`dd`) | `dropdown` | `_dropdown.scss` | `DropdownSection.ts` | 1 |
| NAV (`nv`) | `nav` | `_nav.scss` | `NavSection.ts` (and the card specimens' release markup) | 1 |
| ACCORDION (`ac`) | `accordion` | `_accordion.scss` | `AccordionSection.ts` | 2 |
| TOGGLES (`tg`) | the Disclosure deferral rows | `_button-group.scss`, `_input-group.scss` (existing) | `ButtonGroupSection.ts`, `InputGroupSection.ts` specimens (existing) | 2 |
| NAVBAR (`nb`) | `navbar`, the `$assets` retirement | `_navbar.scss`; `_tokens.scss` and `_theme.scss` for the retirement | `NavbarSection.ts` | 2 |

Every unit runs in its own worktree from the commit the launch names, in parallel with its wave's
siblings, on `opus`. A mirrored proof `tests/src/styles/components/<stem>.test.ts` and a section
proof `tests/app/browser/sections/<Name>Section.test.ts` exist per partial and per section.

## Rulings that bind every unit

1. **Bootstrap's set exactly (D2, D6).** The built cascade emits every selector, declaration,
   custom property, and at-rule condition the pinned inventory records for the key
   (`tests/fixtures/oracle/inventory.json`; the inventory, not the Sass file, is the authority, so a
   selector recorded under the key that another partial's file writes in the release still belongs
   to the key's accounting), less the deferred names the guide keeps, and nothing else. A Sass
   branch the pinned build does not emit (`.navbar-light`, a `$dropdown-padding-y == 0` branch)
   earns no rule. Every difference takes a `#### <key>` table row under `### Departures`; every
   extra name takes a `### Additions` row.
2. **States at rest (R1).** Every state class renders in a resting specimen with the class in
   markup; no specimen carries an inline style (the journey's census refuses one), so `.collapsing` and `.collapsing.collapse-horizontal` render no specimen and no frame and are proved on probe elements from their declared and resolved values (the Orchestrator's ruling of 2026-09-23 to the COLLAPSE unit, D17); driven rows only for hover and focus
   readings that change the paint; no `CaptureState` member is added; no unit writes engine code, an
   event, a listener, an observer, or a behavioural proof (D41).
3. **No right-to-left support (D5); physical properties (D11).** The caret's `margin-left` and
   border sides are physical; no `/* rtl:` comment ships.
4. **Motion.** The `transition` mixin and the `REDUCED_MOTION` constant carry every recorded
   transition and its reduced-motion branch; a proof reads the declared and the resolved value and
   the `0s` reading under `stageMedia(REDUCED_MOTION)`; nothing waits on a transition.
5. **Tokens.** Bind a value to an existing `--vn-*` token where one matches (`--vn-stack-dropdown`
   for `--bs-dropdown-zindex`, the space, size, radius, border, and shadow tokens); introduce no
   token to complete the baseline; a literal colour takes `color-mix()` over the palette as
   `_tokens.scss` writes `translucent` (R13); keep component-variable overrides on their declaring
   scope and prove a wrapper override moves the consumer.
6. **Dark retunes on component rules (R3).** Read `tokens.$dark` from the component rule; delete the
   unit's own `$assets` rows in the same patch; the Condition cell is `—`.
7. **Forced colours (R15).** `forced-ring` beside every shadow focus ring the family ships, each an
   `### Additions` row under `@media (forced-colors: active)`.
8. **The barrel (R11).** Insert the `@use` line at Bootstrap's position after B-PASSIVE-ORDER's
   order (`collapse`, `dropdown` before `button-group`; `nav`, `navbar` between `button-group` and
   `card`; `accordion` between `card` and `breadcrumb`); the partial opens `@layer components` after
   the `@use` lines it reads (`../tokens` only where it reads the Sass API, `../mixins` only where it
   includes a mixin; an unread `@use` is a dead load, D18); return the conformance order case's
   expected-list extension as a patch.
9. **The showcase.** One `SpecimenSection` subclass per region in the `TableSection.ts` shape, fed
   by `<KEY>_COPY` and `<KEY>_SPECIMENS` in `app/browser/constants.ts` (report-only patch), appended
   after `InputGroupSection` in the barrel order (R18 names); every recorded selector rendered by a
   specimen, with these exceptions recorded here: the `.collapsing` classes render no specimen (rule 2); the `.navbar-expand-* .offcanvas` rules are proved
   without a specimen until the Offcanvas unit of B-MODAL … B-CAROUSEL supplies one (R10), and the
   `navbar-expand-xl` and `-xxl` expanded states have no frame under the 390 and 1280 variants (R16).
10. **Room for positioned parts (R4).** A shown menu sits inside a wrapper that reserves its room in
    its own direction; the wrapper is the registered resting subject; the journey's hanging-key
    branch is not changed.
11. **The registries.** Resting rows in `CASCADE_KEYS` and driven rows in `DRIVEN_KEYS`
    (`tests/setup.ts`, report-only patch appended at the registry's end in landing order), subjects
    added to `CaptureSubject`, the stem rule of the family close (`b-passive-close-design-verdict.md`
    R1) obeyed; frames through `FRAMES.page` in the journey (report-only patch).
12. **The guide (R17).** One `### <Region> classes` section per component in barrel order (Collapse
    covers `collapsing`); the `#### <key>` tables under `### Departures`; `### Additions` rows; the
    `### Files` row; the § Compatibility `selector` and `variable` rows and the `plugin` rows (R8);
    a section states the classes are set in markup and points at § Compatibility for the plugin;
    every code token takes its noun (`.claude/rules/writing.md` § Code tokens); all of it a
    report-only patch while another unit owns the guide, and owned where the launch grants it.
13. **Shared and off-limits files.** Report-only for every unit: `src/styles/index.scss`,
    `src/styles/_tokens.scss` (ACCORDION and NAVBAR only), `tests/setup.ts`, `tests/setup.test.ts`,
    `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`,
    `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
    `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `app/browser/constants.ts`,
    `app/browser/Showcase.ts`, `app/browser/index.ts`, `guides/veneer.md`, `ROADMAP.md`.
    Off-limits for every unit: every other unit's owned files, `src/browser/**`, `src/core/**`,
    `tests/src/browser/**`, `tests/setupServer.ts`, `tests/fixtures/**` (COLLAPSE's Tailwind
    fixtures excepted), the manifests and lockfile, `README.md`, `tests/setupPolicy.ts`, and
    `tests/policy.test.ts`.
14. **Gates, cheap first.** Scoped `oxfmt`, `format:check`, `lint:check`, `check`, `build:src`,
    `test:setup`, the scoped styles and section proofs, `test:conformance`, `test:guides`,
    `test:policy`; the journey and `CAPTURE=1` are observations the Orchestrator's chain takes.
15. **The proof matrix (R19).** The report carries a matrix from every recorded selector and
    condition of the key to the proof case, the distinguishing mutation, the specimen, and the
    capture scenario.
16. **Plugin obligations (R8).** COLLAPSE adds the Collapse row, DROPDOWN the Dropdown row, NAV the
    Tab and ScrollSpy rows, each naming J-ENGINE as owner; nothing claims a behaviour.
17. **Tailwind (R14).** COLLAPSE adds `collapse` to the exclusion line, both fixtures, and the recipe
    fences, and reads `.collapse.show` visible in the consumer profile.

## Host facts

Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
Chromium installed; a `CAPTURE=1` journey run of one variant takes about two minutes; the journey's
variants are 390 and 1280 in light and dark; `visitBreakpoint` reads a boundary at the boundary
and one pixel below it; `driveTraversal` stops at the first element it reaches twice.
