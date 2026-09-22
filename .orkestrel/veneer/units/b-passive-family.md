# B-PASSIVE family record — the rulings and obligations every B-PASSIVE unit reads

This record is the one home of the family's rulings. A unit brief points here and restates none of
it. Where this record and the tree disagree, the tree wins and the unit stops and reports. The
measurements live in `b-passive-terrain-report.md` (§ A the oracle surface per key, § B the shipped
pattern, § C what ships, § D Elements and Mailbox, § E sizing); the design rulings in
`b-passive-design-verdict.md`; the accounting contract in F5b's report (`f5b-report.md` § Per
obligation and § Answers) as landed on main; the capture contract in F7's report (`f7-report.md`
§ Per obligation) as landed on main.

## The units

| Unit        | Keys                                | Partials under `src/styles/components/`             | Sections under `app/browser/sections/`                          |
| ----------- | ----------------------------------- | --------------------------------------------------- | --------------------------------------------------------------- |
| B-PASSIVE-A | `badge`, `breadcrumb`, `btn-close`  | `_badge.scss`, `_breadcrumb.scss`, `_close.scss`    | `BadgeSection.ts`, `BreadcrumbSection.ts`, `CloseSection.ts`    |
| B-PASSIVE-B | `btn-group`, `btn-toolbar`          | `_button-group.scss`                                | `ButtonGroupSection.ts`                                         |
| B-PASSIVE-C | `card`, `list-group`                | `_card.scss`, `_list-group.scss`                    | `CardSection.ts`, `ListGroupSection.ts`                         |
| B-PASSIVE-D | `pagination`                        | `_pagination.scss`                                  | `PaginationSection.ts`                                          |
| B-PASSIVE-E | `progress`, `spinner`, `placeholder` | `_progress.scss`, `_spinner.scss`, `_placeholder.scss` | `ProgressSection.ts`, `SpinnerSection.ts`, `PlaceholderSection.ts` |

Every unit runs in its own worktree from the commit the launch prompt names, in parallel with its
siblings, on `opus`. A mirrored proof `tests/src/styles/components/<stem>.test.ts` and a section proof
`tests/app/browser/sections/<Name>Section.test.ts` exist per partial and per section. The
`btn-toolbar` key lives in `_button-group.scss` with `btn-group` (Bootstrap's own file), with one
`ButtonGroupSection` carrying both keys' specimens.

## Rulings that bind every unit

1. **Bootstrap's set exactly (D2, D6).** For each key, the built cascade emits every selector,
   declaration, custom property, keyframe, and at-rule condition the oracle inventory records for
   that key (`b-passive-terrain-report.md` § A), less the deferred names the guide keeps (ruling 6),
   and nothing else. Every difference the accounting comparison reports takes a `### Departures`
   row; every extra name takes a `### Additions` row (ruling 5). Refuse every Mailbox and Elements
   behaviour the design verdict's ruling 8 lists; ship Bootstrap's own `.btn .badge` offset and the
   spinner's reduced-motion slowdown as recorded.
2. **No right-to-left support (D5).** The inventory's `rtl` fields are gone; no `/* rtl:ignore */`
   comment ships; no flipped output exists.
3. **The reduced-motion ruling.** Bootstrap's recorded behaviour under `prefers-reduced-motion:
   reduce` ships as recorded and no more: the progress bar's transition and animation stop, the
   spinner slows to `1.5s`, the placeholder's glow and wave continue. Write the transition and the
   reduced-motion pair through the `transition` mixin in `src/styles/_mixins.scss` where Bootstrap
   writes a transition; write the reduced-motion speed override for the spinner through the
   `reduced-motion` mixin; add no blanket `animation: none` to placeholder (the styles rule's
   animation line governs Veneer's own animations, not a recorded Bootstrap one — the design
   verdict's ruling 9, provisional on the user's word).
4. **Tokenizing ceiling.** Route a value onto a `--vn-*` token only where that token already exists
   and already resolves to Bootstrap's recorded value (read `src/styles/_tokens.scss` and
   `_mixins.scss`); otherwise write Bootstrap's literal and record nothing. Add no token to
   `_tokens.scss`. A Bootstrap value that already references a `--bs-*` global the tree declares
   (`var(--bs-border-color-translucent)`, `var(--bs-body-color)`, `var(--bs-secondary-bg)`,
   `var(--bs-box-shadow-inset)`, `var(--bs-border-radius)`) matches byte for byte and records nothing.
   Iterate Bootstrap's role set through the tokens module's role list the way `_button.scss` does,
   never a literal list, and never emit a `-tertiary` variant Bootstrap lacks.
5. **The accounting loop.** After the partial compiles, run `npm run build:src && npm run
   test:conformance`: the `cascade ledger` describe prints every departure row to add and every stale
   row to strike (`component | selector | property | condition | bootstrap | veneer | departure`) and
   every addition row (`component | name | category`). Write each departure row under `### Departures`
   in the component's own `#### <key>` table (create the table under the heading in barrel order when
   the key is new), with the `departure` member the comparison names; write each addition row under
   `### Additions` as ``| `<component>` | `<name>` | <category> | <reason sentence>. |``, the reason a
   full sentence bound to the partial. Re-run until the four ledger gates and the deferral gate are
   green. A rule the comparison cannot attribute to a shipped key (no class prefix matches) is outside
   the ledger and needs no row; `attributeSelector` in `tests/setupServer.ts` is the rule, and a unit
   that needs it to change stops and reports.
6. **Deferred names.** Delete a name's row from the guide's § Deferred selectors in the same change
   that ships the name, or do not emit the name; author foreign-owned rules absent. Retire: A —
   `.btn .badge`; `.btn-close`, `:hover`, `:focus`, `:disabled`, `.disabled`, `.btn-close-white`; the
   `--bs-btn-close-*` rows less the filter. B — every `Passive`-owned `.btn-group*`,
   `.btn-group-vertical*`, and `.btn-toolbar` row. E — `.placeholder.btn::before`. C and D — none.
   Stay deferred and are omitted from the partial: `.btn-toolbar .input-group` (Forms); the split-toggle
   selectors `.btn-group > .btn.dropdown-toggle-split:first-child`, `.btn-sm + .dropdown-toggle-split`,
   `.btn-group-sm > .btn + .dropdown-toggle-split`, `.btn-lg + .dropdown-toggle-split`,
   `.btn-group-lg > .btn + .dropdown-toggle-split` (Disclosure); `.alert-dismissible .btn-close`,
   `.toast-header .btn-close`, `.modal-header .btn-close`, `.offcanvas-header .btn-close` (Overlays).
   The `.btn-group-sm > .btn` and `.btn-group-lg > .btn` twins already ship from `_button.scss` (as
   Bootstrap's `@extend` emits them) and have no row; B authors nothing for them and owns neither
   `_button.scss` nor `button.test.ts`. `--bs-btn-close-filter` already ships from `theme-tokens`;
   its ledger rows are F5b's and A changes them only where its partial changes what the comparison
   reports.
7. **Compatibility rows and the shipped list.** For each key, add a `selector` row and, where the
   inventory's property map is non-empty, a `variable` row to § Compatibility with Status `shipped`,
   in the voice of the `btn` and `table` rows; add the key to the `listed` literal in
   `tests/conformance.test.ts`; `collectShippedComponents` and `scanCompatibilityPresence` then bind
   the key. `btn-toolbar` and `placeholder` take no variable row.
8. **The barrel and the layer.** A partial opens `@layer components` after `@use '../tokens'` and
   `@use '../mixins'`; `src/styles/index.scss` loads it with `@use 'components/<stem>'` appended after
   `@use 'components/vr'` in Bootstrap's order — `button-group`, `card`, `breadcrumb`, `pagination`,
   `badge`, `progress`, `list-group`, `close`, `spinner`, `placeholder` — with `as
   progress-component` on `progress` alone (`elements/progress` holds the namespace). A unit inserts
   its line at the position that order gives it relative to the lines already present. The
   elements-layer `progress { vertical-align: baseline }` rule stays; no other key takes a
   bare-element rule.
9. **The showcase.** One `SpecimenSection` subclass per key, the shape `TableSection.ts` sets, fed by
   `<KEY>_COPY` and `<KEY>_SPECIMENS` in `app/browser/constants.ts` (frozen; ramps derived from a
   source list and one `.map` the way `TABLE_SPECIMENS` does); re-exported from `app/browser/index.ts`;
   constructed in `app/browser/Showcase.ts` after `TableSection` in alphabetical order of region name
   (`Badge`, `Breadcrumb`, `Button group`, `Card`, `Close`, `List group`, `Pagination`, `Placeholder`,
   `Progress`, `Spinner`); the section's region name added to the `regions` literal and the specimen
   concatenation in `tests/app/browser/Showcase.test.ts` and the export literal in
   `tests/app/browser/index.test.ts` at the same alphabetical position. The specimens per key are the
   design verdict's ruling 5 list; every selector the inventory records for the key is exercised by a
   proof and rendered by a specimen at least once, and the unit's report carries the coverage matrix
   (inventory selector and condition → proof case, subject, specimen, capture scenario).
10. **The capture registry.** Register one scenario per specimen in `tests/setup.ts`'s registry the
    way F7 landed it (`CAPTURE_KEYS`, `CASCADE_KEYS`, `buildStem`): the scenario's stem is its
    specimen's stem, the subject names the specimen (one of the declared specimen tables), a frame is
    `<scenario>--<theme>-<viewport>.png` shot on the whole lifted specimen with its background, and a
    driven state (hover, focus, active, disabled, checked) is its own scenario whose stem carries the
    state, for the keys the design verdict names (btn-close, pagination, list-group actions,
    btn-group). Append the unit's scenarios at the registry's end in barrel order; the journey suite
    `tests/app/browser/integration.test.ts` places them through the frame manager like the existing
    cascade scenarios.
11. **Proof shape.** Each proof reads through the installed `@orkestrel/test` browser exports
    (`readPixels`, `readStyle`, `readToken`, `readRootToken`, `matchesColor`, `readLayers`,
    `readContrast`, `readRing`, `findRule`, `findKeyframes`, `readRules`, `stageMedia`, `releaseMedia`,
    `hoverAccessible`, `holdAccessible`, `releasePointer`, `traverseAccessible`, `pressKeys`,
    `waitForAnimations`, `describeTree`, `readStates`) and the tree's own `scene`; a helper whose job
    one of these does is a defect. Every key owes four readings: the token beside the property it
    drives; the override (set the `--bs-<key>-*` property on a wrapper and re-read); the factor where
    a value is tokenized (`--vn-factor-density`, `--vn-factor-radius`); the mode (inside
    `data-bs-theme="dark"`). Card and list-group copy `TABLE_RESPONSIVE_CASES` and
    `GRID_BREAKPOINT_CASES` with `parseMediaWidth` from `tests/setupStyles.ts` for every breakpoint
    boundary (`576px`, `768px`, `992px`, `1200px`, `1400px`). Case tables go to `tests/setupStyles.ts`
    as `<KEY>_*_CASES`, frozen, appended at the file's end in barrel order, with their freeze and
    inventory rows in `tests/setupStyles.test.ts`. `findRule` is a substring lookup and proves no
    completeness; `waitForAnimations` excludes infinite animations, so spinner and placeholder proofs
    assert from timeline readings.
12. **The guide.** One `### <Key> classes` heading per key in barrel order appended after `### Helper
    classes`, in the voice of `### Table classes`; a § Files row per partial after the `_icon-link.scss`
    row; the compatibility rows (ruling 7); the ledger rows (ruling 5); the deferral rows (ruling 6).
    Every list, table, and fence introduced by a sentence; no count of a growable set; the writing
    rules' substitution table.
13. **Shared files, append-only.** `src/styles/index.scss`, `tests/setupStyles.ts`,
    `tests/setupStyles.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.ts`,
    `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`,
    `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `app/browser/constants.ts`,
    `app/browser/Showcase.ts`, `app/browser/index.ts`, `guides/veneer.md`: a unit writes them in its own
    worktree, and every edit is an append at the anchor the rulings above name or a disjoint whole-row
    deletion (a deferral row); never a rewrite of an existing line. A unit that must rewrite a line
    stops and reports. Off-limits for every unit: `src/styles/_tokens.scss`, `_theme.scss`,
    `_mixins.scss`, `src/styles/elements/**`, `src/styles/components/*` other than the unit's own
    partials, `src/browser/**`, `src/core/**`, `tests/setupServer.ts`, `tests/setupServer.test.ts`,
    `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/fixtures/**`, `configs/**`, `vite.config.ts`,
    `tsconfig.json`, `package.json`, `package-lock.json`, `README.md`, `ROADMAP.md` (report-only).
14. **Gates a unit runs**, cheap first: scoped `oxfmt` on owned files then `npm run format:check`,
    `npm run lint:check`, `npm run check`; `npm run build:src`; `npm run test:setup` (the case tables
    and their inventory rows); `npm run test:src:styles` (the owned proofs); `npm run test:app` (the
    section proof and the showcase inventory); `npm run test:conformance` (the ledger, deferral,
    compatibility, and tag gates); `npm run test:guides`; `npm run test:policy`; `npm run test:journey`
    and `CAPTURE=1 npm run test:journey` (the registered scenarios place their frames; the report lists
    the written names). The whole-chain `npm test` is an observation.

## Host

Linux, bash, Node 22, npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
Chromium 141 at `/opt/pw-browsers`; the worktree has `node_modules` installed; a foreground command
is capped at 10 minutes; Bootstrap 5.3.8's Sass sits under `node_modules/bootstrap/scss/` for reading
only (never `@use` it; Veneer's cascade is authored, and cross-partial `@extend` is banned).
