<!-- Retained from content-layout-design-analyst-last.md. Bench lane: analyst on Astra (objective design lane, blind to the planner), codex exec read-only -C C:/Users/mikes/WebstormProjects/scaffold, journal content-layout-design-analyst.jsonl, thread 01a0c308-48b7-7c51-b08b-57909eabce19, exit 0, 2026-09-21. -->

Recommend implementing every assigned Content/layout mechanism, retaining the ledger’s contextual Reboot exclusions, and using Bootstrap geometry where Elements has no equivalent. Closure must distinguish source inspection, browser proof, and captured acceptance.

Paths below use `V` for `C:/Users/mikes/WebstormProjects/veneer`, `E` for `C:/Users/mikes/WebstormProjects/elements`, and `S` for `C:/Users/mikes/WebstormProjects/scaffold`.

**Proposed units**

Each mechanism owns its named SCSS, mirrored styles tests, showcase section, and mirrored section test. Shared files remain report-only for executors: return exact patches for serial integration. This follows `S/.agents/orchestration.md:225` and `:278`.

The shared integration scope includes:

- `V/src/styles/{_tokens.scss,_theme.scss,_mixins.scss,index.scss}`, `src/core/constants.ts`, and their affected tests.
- `V/app/browser/{types.ts,constants.ts,index.ts,Showcase.ts}`, shell styles, and application composition tests.
- `V/tests/setup*.ts`, their export and behavior proofs, `tests/conformance.test.ts`, `tests/app/browser/integration.test.ts`, and `tests/distribution.test.ts`.
- `V/guides/veneer.md`, guide parity, and the campaign ledger and evidence records.

Land token names and contracts with their first consumer. Do not create a public browser engine for passive CSS. Preserve the existing styles export and application section family. The current section composition and styles entry provide those integration points. (`V/app/browser/Showcase.ts:66`; `V/src/styles/index.scss:1`; `V/package.json:40`.)

1. **Proof and inventory contract — Astra; prerequisite**

   **Own:** `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/index.test.ts`, `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts`.

   Freeze an exact partition of the assigned inventory into implementation obligations, permanent exclusions, and named cross-family deferrals. Include selectors whose spelling does not match their inventory root, such as `.caption-top`, and navbar-owned container selectors. (`S/.orkestrel/veneer/research/inventory.json:18793`; `:7614`.)

   Extend conformance to understand permanent exclusions explicitly. The current scanner subtracts deferrals but has no exclusion input; shipping `reboot` under that contract would demand the excluded selectors. Keep exclusions separate from temporary deferrals, validate their inventory membership, and require their absence throughout the compiled cascade. Reuse the existing PostCSS parse and selector normalization. (`V/tests/setupConformance.ts:623`.)

   Complete root scoping of Button oracle actions before another section lands. `driveOracle` resolves the recorded host under its root, but its action table still uses document-wide accessible-name actions. Prove isolation with duplicate names in unrelated sections. (`V/tests/setupBrowser.ts:221`; `:285`; `S/.orkestrel/veneer/u7c-audit-verdict.md:80`.)

   **Acceptance:** targeted red/green proofs reject an omitted owned selector, an emitted exclusion, an invalid deferral, an unscoped action, and a false shipped component population. Include setup export assertions in the brief.

2. **Reboot foundation — Astra; depends on Proof and inventory contract**

   **Own:** `elements/_reboot.scss`, `_html.scss`, `_body.scss`, `_button.scss`, `_hr.scss`; their mirrored styles tests; `sections/RebootSection.ts` and its test.

   Own universal and attribute repairs, body defaults, horizontal rules, form-control repairs, fieldset/legend/label, summary affordance, and the remaining nonexcluded Reboot selectors after the Typography, Links, Media, and Tables partitions. Preserve Button’s accepted treatment while adding shared control repairs.

   Land `[hidden] { display: none !important }` here. Make body-compatible variables affect rendered consumers; declaration alone is insufficient. The current body consumes canonical variables directly, while the ledger also requires compatible body-variable behavior. (`V/src/styles/elements/_body.scss:3`; `S/.orkestrel/veneer/research/ledger.md:554`; `:557`; `:558`.)

   **Guide rows:** owned Reboot behavior, variable-consumption proofs, and the retained body-size difference. Keep the aggregate `reboot` selector row open until its contributing mechanisms close.

   **Acceptance:** prove global border-box geometry, body margin removal, canonical and compatible overrides, control inheritance, textarea resize direction, enabled/disabled cursor behavior, and hidden layout/focus absence. Remove `hidden` and prove normal rendering returns. Run Button regression proofs against the rebuilt cascade.

3. **Typography — Opus; depends on Reboot foundation**

   **Own:** `elements/_headings.scss`, `_paragraphs.scss`, `_lists.scss`, `_code.scss`, `_text.scss`, `_blockquote.scss`; `components/_typography.scss`; mirrored styles tests; `sections/TypographySection.ts` and its test.

   Cover headings, paragraphs, lists and descriptions, code/pre/kbd/samp/var, address, quotations, small/mark, and the assigned typography classes. Adapt Elements’ measurements without importing contextual selectors. Elements uses contextual paragraph spacing and nested code/list treatments that cannot become Veneer’s bare-tag composition. (`E/src/styles/elements/_p.scss:12`; `_code.scss:46`; `_ul.scss:46`; `_ol.scss:34`.)

   **Guide rows:** `h1`–`h6`, `lead`, `display`, `blockquote`, `initialism`, `mark`, `small`, `list-unstyled`, `list-inline`, and the owned Reboot obligations. These roots belong to this family. (`S/.orkestrel/veneer/research/ledger.md:19`.)

   **Acceptance:** compare tag and explicit-class treatments; prove context independence with equal inherited inputs, heading geometry, wrapping, list indentation, code overflow, and display behavior across its responsive transition. Capture Elements heading and typography specimens before recording calibration as measured. (`E/app/browser/pages/HeadingsPage.vue:69`; `TypographyPage.vue:64`.)

4. **Links — Opus; depends on Reboot foundation**

   **Own:** `elements/_a.scss`, `components/_links.scss`; mirrored styles tests; `sections/LinksSection.ts` and its test.

   Land `a:not([href]):not([class])` and its hover reset here. Implement the entire assigned `link` inventory, including opacity, underline opacity, offsets, and role colors. The no-href hover selector is an explicit inventory member. (`S/.orkestrel/veneer/research/inventory.json:3906`; `:3932`; `S/.orkestrel/veneer/units/content-layout-scout-report.md:15`.)

   **Guide rows:** `link` selector/variable rows and Reboot anchor accessibility and variable obligations.

   **Acceptance:** real Tab/Enter navigation, hover, focus-visible, inherited no-href color and decoration, and explicit-class escape from that reset. Override compatible color and opacity on the target while an adjacent link remains unchanged. Measure Elements’ link appearance and motion before choosing calibrated departures. (`E/src/styles/elements/_a.scss:61`; `:111`; `:168`.)

5. **Images and figures — Opus; depends on Reboot foundation and Typography**

   **Own:** `elements/_img.scss`, `_svg.scss`, `_figure.scss`, `_figcaption.scss`; `components/_images.scss`, `_figures.scss`; mirrored styles tests; `sections/MediaSection.ts` and its test.

   **Guide rows:** `img`, `figure`, and their Reboot contributions. Preserve `.img-fluid`, `.img-thumbnail`, `.figure`, `.figure-img`, and `.figure-caption`. (`S/.orkestrel/veneer/units/content-layout-scout-report.md:16`.)

   **Acceptance:** intrinsic-size and constrained-size geometry, preserved image proportions, thumbnail border/radius, figure spacing, caption contrast, and explicit class control. Use local deterministic media. Compare relevant Elements specimens without treating that page’s wider video/audio/embed feature set as assigned work. (`E/app/browser/pages/MediaPage.vue:122`; `E/src/styles/elements/_figure.scss:10`; `_figcaption.scss:9`.)

6. **Containers — Astra; depends on Reboot foundation**

   **Own:** `components/_containers.scss`; mirrored styles tests; `sections/ContainersSection.ts` and its test.

   **Guide rows:** `container` selector/variable rows, source attribution, and explicit navigation deferrals for `.navbar > .container`, `.container-fluid`, `.container-sm`, `.container-md`, `.container-lg`, `.container-xl`, and `.container-xxl`. These combinations occur in the container inventory; they must not disappear from the partition. (`S/.orkestrel/veneer/research/inventory.json:7614`.)

   **Acceptance:** fluid width, centering, gutter padding, responsive maximum widths, and nested local-token reset. Independently expect Bootstrap’s 540px, 720px, 960px, 1140px, and 1320px maxima at their applicable thresholds. (`V/node_modules/bootstrap/scss/_variables.scss:503`.)

7. **Grid and gutters — Astra; depends on Containers**

   **Own:** `components/_grid.scss`, `_gutters.scss`; mirrored styles tests; `sections/GridSection.ts` and its test.

   **Guide rows:** `row`, `col`, `offset`, `g`, `gx`, and `gy`. Keep optional CSS Grid outside this assignment: the pinned inventory does not contain its `.grid`, `g-col`, or `g-start` roots. (`S/.orkestrel/veneer/units/content-layout-scout-report.md:9`; `:18`.)

   **Acceptance:** independently calculated column widths, auto and equal columns, row-column variants, wrapping, offsets and responsive offset resets, negative row margins, column padding, vertical gutters, zero gutters, and nested rows. Prove that changing `gx` leaves vertical geometry unchanged and changing `gy` leaves horizontal geometry unchanged. Use logical declarations while preserving the required LTR geometry. (`V/node_modules/bootstrap/scss/mixins/_grid.scss:5`; `:68`; `:102`; `:114`; `V/tests/src/styles/index.test.ts:28`.)

8. **Tables — Astra; depends on Reboot foundation and Typography**

   **Own:** `elements/_table.scss`, `_caption.scss`; `components/_tables.scss`; mirrored styles tests; `sections/TablesSection.ts` and its test.

   **Guide rows:** `table`, including `.caption-top`, responsive wrappers, role variants, and its Reboot contribution.

   **Acceptance:** prove cell geometry, captions, borders, borderless/divider/small variants, row and column striping, hover and active combinations, nested-table isolation, and responsive overflow. Assert state precedence from independent expectations: state overrides type, which overrides base. Read the painted cell background and inset shadow, not just custom-property strings. Bootstrap’s implementation uses that fallback and paint chain. (`V/node_modules/bootstrap/scss/_tables.scss:7`; `:33`; `:59`; `:162`.)

   Calibrate compact spacing and state surfaces against Elements’ table specimens. Keep sorting, resizing, expansion, and selection engines outside this CSS unit. Elements’ table source contains such additional behavior, so copying the entire partial would expand scope. (`E/src/styles/elements/_table.scss:35`; `:60`; `:68`.)

9. **Icon links — Opus; depends on Links**

   **Own:** `components/_icon-link.scss`; mirrored styles tests; `sections/IconSection.ts` and its test.

   **Guide rows:** `icon-link`, including read-only transform behavior.

   **Acceptance:** `.bi` child geometry, gap, underline paint, real hover and keyboard focus, consumer transform override, entry/exit motion, reversal, and reduced motion. Preserve the helper’s underline-opacity fallback distinction from ordinary links. (`V/node_modules/bootstrap/scss/helpers/_icon-link.scss:5`; `:9`; `:18`.)

10. **Ratio and vertical rule — Astra; depends on Media and Reboot foundation**

    **Own:** `components/_ratio.scss`, `_vr.scss`; mirrored styles tests; `sections/RatioSection.ts`, `sections/RuleSection.ts`, and their tests.

    **Guide rows:** `ratio` and `vr`.

    **Acceptance:** ratio geometry for every inventoried variant, a custom compatible ratio, nested isolation, pseudo-element padding, and child filling. Preserve the bare helper’s behavior when no ratio is supplied; do not invent a default ratio. Prove vertical-rule width, current-color paint, opacity, minimum height, and flex stretching. (`V/node_modules/bootstrap/scss/helpers/_ratio.scss:3`; `:22`; `S/.orkestrel/veneer/units/content-layout-scout-report.md:20`.)

11. **Integrated closure — serial integration, independent verification and review**

    **Own:** final shared-file integration, `tests/app/browser/integration.test.ts`, `tests/distribution.test.ts`, guide parity, and the campaign’s rendered-contract ledger and receipts.

    Compose the mechanism sections through the existing application root. Extend the existing journey entry; do not assume a new integration file will run under journey variants. The journey configuration currently declares light/dark at 390px and 1280px. (`V/configs/app/vite.journey.config.ts:7`; `S/.claude/rules/workspace.md:153`.)

    **Acceptance:** every owned selector and variable has a truthful partition and proof; every applicable rendered contract has an independent expectation and artifact; the installed vanilla consumer exercises the packed standalone CSS offline; managed Chromium and Edge have separate receipts. Run the prescribed gate chain and obtain implementation audits and the Orchestrator’s ruling. Captured appearance requires the campaign’s surface-review ruling. (`S/.orkestrel/veneer/plan.md:111`; `:554`; `:565`; `:572`; `:573`; `:575`.)

**Parallel and serial order**

After the proof foundation closes, Typography, Links, and Containers can develop disjoint leaves in isolated checkouts against the same committed baseline. Media follows Typography; Grid follows Containers; Tables follows Typography; Icon links follow Links; Ratio and vertical rule follow their named prerequisites.

Shared token, registry, setup, barrel, shell, guide, and journey patches integrate serially before a unit’s acceptance run. Parallel leaf completion does not establish acceptance. Keep capture generation serial and regenerate the final portfolio after the last change affecting its rendering. (`S/.agents/orchestration.md:269`; `:278`; `S/.orkestrel/veneer/u7f-verdict.md:58`.)

**Token proposal**

Use the existing grouped registry convention: a group’s own value uses `base`; SCSS owns values and TypeScript owns names. Treat the Elements values below as calibration candidates until a rendered reading supports them. The guide already distinguishes `elements`, `bootstrap`, and `derived` sources. (`V/guides/veneer.md:292`; `:297`; `:312`.)

| Missing binding | Proposed canonical binding and default | Calibration/source |
|---|---|---|
| `--bs-link-opacity` | `--vn-link-opacity: 1`; derive utility fractions from it. Use consumer fallbacks rather than an unconditional root `--bs-link-opacity` declaration. | Bootstrap ordinary-link fallback. A root compatible value of `1` would also replace icon-link’s `.5` fallback. (`S/.orkestrel/veneer/units/content-layout-scout-report.md:50`; `V/node_modules/bootstrap/scss/helpers/_icon-link.scss:5`.) |
| `--bs-link-underline-opacity` | `--vn-link-underline-opacity: 1`; derive the utility fractions. | Bootstrap; no Elements utility-scale equivalent identified. (`S/.orkestrel/veneer/units/content-layout-scout-report.md:51`.) |
| `--bs-body-text-align` | `--vn-text-align: start`; body consumes the compatible override with this fallback. | Proposed explicit default; record that Bootstrap’s root declaration is conditional rather than claiming an existing Bootstrap root alias. (`S/.orkestrel/veneer/units/content-layout-scout-report.md:52`.) |
| `--bs-gutter-x` | `--vn-gutter-x: var(--vn-space-12)` | Bootstrap 1.5rem geometry; Elements has no matching gutter contract. (`S/.orkestrel/veneer/units/content-layout-scout-report.md:53`; `:82`.) |
| `--bs-gutter-y` | `--vn-gutter-y: 0`; local row/container initialization | Bootstrap baseline; utility classes supply vertical spacing. (`V/node_modules/bootstrap/scss/mixins/_grid.scss:6`.) |
| `--bs-table-color-type` | `--vn-table-text-category: initial` | Preserve Bootstrap’s native invalid-value fallback slot; this is mechanism state, not a palette color. (`V/node_modules/bootstrap/scss/_tables.scss:7`.) |
| `--bs-table-bg-type` | `--vn-table-surface-category: initial` | Same fallback contract. (`V/node_modules/bootstrap/scss/_tables.scss:8`.) |
| `--bs-table-color-state` | `--vn-table-text-state: initial` | Same fallback contract. (`V/node_modules/bootstrap/scss/_tables.scss:9`.) |
| `--bs-table-bg-state` | `--vn-table-surface-state: initial` | Same fallback contract. (`V/node_modules/bootstrap/scss/_tables.scss:10`.) |
| `--bs-table-color` | `--vn-table-text-base: var(--vn-text-body-base)` | Adapt Elements’ current-color text to the owned theme register. (`E/src/styles/elements/_table.scss:31`.) |
| `--bs-table-bg` | `--vn-table-surface-base: transparent` | Elements; record the difference from Bootstrap’s body-background default. (`E/src/styles/elements/_table.scss:32`; `V/node_modules/bootstrap/scss/_variables.scss:739`.) |
| `--bs-table-border-color` | `--vn-table-border: var(--vn-border-color)` | Derived from the calibrated border token. (`E/src/styles/elements/_table.scss:33`.) |
| `--bs-table-accent-bg` | `--vn-table-surface-accent: transparent` | Bootstrap fallback mechanism. (`V/node_modules/bootstrap/scss/_variables.scss:740`.) |
| `--bs-table-striped-color` | `--vn-table-text-striped: var(--vn-table-text-base)` | Derived; verify painted contrast with the striped surface. |
| `--bs-table-striped-bg` | `--vn-table-surface-striped`: border color at 12%, transparent remainder | Elements candidate. (`E/src/styles/elements/_table.scss:50`.) |
| `--bs-table-active-color` | `--vn-table-text-active: var(--vn-table-text-base)` | Derived; verify composed contrast. |
| `--bs-table-active-bg` | `--vn-table-surface-active`: border color at 35%, transparent remainder | Elements candidate. (`E/src/styles/elements/_table.scss:55`.) |
| `--bs-table-hover-color` | `--vn-table-text-hover: var(--vn-table-text-base)` | Derived; verify composed contrast. |
| `--bs-table-hover-bg` | `--vn-table-surface-hover`: border color at 25%, transparent remainder | Elements candidate. (`E/src/styles/elements/_table.scss:45`.) |
| `--bs-aspect-ratio` | `--vn-ratio-square: 100%`, `--vn-ratio-standard: 75%`, `--vn-ratio-wide: 56.25%`, `--vn-ratio-cinema: calc(100% * 9 / 21)`; variants bind the compatible property locally | Bootstrap geometry; no Elements equivalent identified. Preserve a custom compatible value and absence on an unqualified helper. (`V/node_modules/bootstrap/scss/helpers/_ratio.scss:9`; `:22`.) |
| `--bs-icon-link-transform` | `--vn-icon-transform: translate3d(.25em, 0, 0)` | Bootstrap; Elements has no matching helper specimen. (`V/node_modules/bootstrap/scss/_variables.scss:468`; `S/.orkestrel/veneer/units/content-layout-scout-report.md:20`.) |
| Spacing at 1.5rem and 3rem | `--vn-space-12: calc(1.5rem * var(--vn-factor-density))`; `--vn-space-24: calc(3rem * var(--vn-factor-density))` | Extend the existing index × .125rem scale only at consumed members. (`V/src/styles/_tokens.scss:222`; `S/.orkestrel/veneer/units/content-layout-scout-report.md:57`.) |
| Display sizes | `--vn-display-1: 5rem`, `-2: 4.5rem`, `-3: 4rem`, `-4: 3.5rem`, `-5: 3rem`, `-6: 2.5rem` as terminal sizes; retain Bootstrap’s responsive sizing curve | Bootstrap; Elements’ ordinary heading scale does not supply display specimens. (`V/node_modules/bootstrap/scss/_variables.scss:662`; `E/src/styles/elements/_h1-h6.scss:78`.) |

Initialize table and gutter bindings at each component root through centralized defaults. Prove canonical overrides, compatible overrides, fallbacks, cycles, nested components, and unchanged neighbors. Do not assume an inherited alias recomputes after a descendant changes its canonical input. (`V/src/styles/_mixins.scss:76`; `S/.orkestrel/veneer/plan.md:103`; `:565`.)

The owning units must also bind their consumed ancillary values: container maxima; display weight; image/figure geometry; table padding; icon gap, opacity, size, timing and easing; vertical-rule opacity. For icon motion, recommend Bootstrap’s 200ms `ease-in-out` until a measured alternative is proposed, with factor control and reduced-motion proof. (`V/node_modules/bootstrap/scss/_variables.scss:464`.)

**Breakpoint and capture proof**

Use `page.viewport(width, height)` from `vitest/browser` in styles proofs. The installed Test declaration explicitly directs breakpoint work there; `stagePane` is capture staging and `releasePane` restores its prior viewport. Do not use that pair as a persistent resize helper. (`V/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2715`; `V/node_modules/@vitest/browser/context.d.ts:816`.)

For each breakpoint at 576px, 768px, 992px, 1200px, and 1400px:

- Test immediately below, exactly at, and immediately above the boundary.
- Assert the actual viewport, applicable media condition, and independently expected consumer geometry.
- Restore the original viewport in cleanup, including failure paths.
- Cover responsive table wrappers and display sizing as well as containers and grid.

Keep the existing 390px/1280px journey portfolio as its photography axis; it does not establish breakpoint correctness. (`V/configs/app/vite.journey.config.ts:7`; `V/src/styles/_tokens.scss:275`.)

| Mechanism | Proposed capture states |
|---|---|
| Reboot | `reboot-baseline`, `reboot-controls`, `reboot-hidden`, `reboot-restored` |
| Typography | `typography-headings`, `typography-display`, `typography-prose`, `typography-lists`, `typography-code` |
| Links | `links-rest`, `links-hover`, `links-focus`, `links-nohref`, `links-overrides` |
| Images | `images-intrinsic`, `images-fluid`, `images-thumbnail` |
| Figures | `figures-caption`, `figures-wrapped` |
| Containers | `containers-fluid`, `containers-constrained`, `containers-nested` |
| Grid | `grid-equal`, `grid-numbered`, `grid-auto`, `grid-wrapped`, `grid-offset`, `grid-nested` |
| Gutters | `gutters-zero`, `gutters-horizontal`, `gutters-vertical`, `gutters-overridden` |
| Tables | `tables-base`, `tables-striped`, `tables-hover`, `tables-active`, `tables-bordered`, `tables-responsive`, `tables-nested` |
| Icon links | `icon-link-rest`, `icon-link-hover`, `icon-link-focus`, `icon-link-overridden` |
| Ratio | `ratio-variants`, `ratio-custom`, `ratio-nested` |
| Vertical rule | `vr-inline`, `vr-stretched`, `vr-overridden` |

Attach theme, viewport, browser, source specimen, resolved-style rows, and accessible evidence to each applicable capture. Record motion separately from settled images. Passive mechanisms need passive observations, not invented statecharts. (`S/.orkestrel/veneer/plan.md:556`; `:569`; `:572`.)

**Exclusions to report**

Record these exact exclusions with reasons in the guide’s Compatibility section and the campaign ledger. Require compiled-CSS absence proofs. Report them at their owning unit’s acceptance; rejection reopens the corresponding obligation. The ledger already names this population. (`S/.orkestrel/veneer/research/ledger.md:585`; `S/.orkestrel/veneer/plan.md:113`.)

| Excluded selector | Owning unit | Reason |
|---|---|---|
| `ol ol` | Typography | Changes a list through its ancestor tag. |
| `ul ul` | Typography | Changes a list through its ancestor tag. |
| `ol ul` | Typography | Changes a list through a different ancestor list tag. |
| `ul ol` | Typography | Changes a list through a different ancestor list tag. |
| `pre code` | Typography | Removes code treatment through tag composition. |
| `a > code` | Links | Changes code through its parent anchor tag. |
| `kbd kbd` | Typography | Changes keyboard text through nesting. |
| `legend + *` | Reboot foundation | Changes a sibling through adjacency to a legend. |

Propose no exclusion for containers, grid, gutters, `[hidden]`, or no-href anchors. Navbar-container combinations are navigation deferrals, with owners and reasons, rather than permanent exclusions. Optional CSS Grid remains outside the assigned inventory rather than being presented as an excluded shipped capability. (`S/.orkestrel/veneer/research/inventory.json:7614`; `S/.orkestrel/veneer/units/content-layout-scout-report.md:9`.)

**Risk register**

| Risk | Required control and closure evidence |
|---|---|
| No Elements layout equivalent | Use Bootstrap as the geometry source and capture Veneer’s actual result. Obtain an explicit accepted difference for the unavailable Elements comparison; a Bootstrap comparison cannot satisfy that part of the exit criterion by itself. Elements deliberately omits `.container`, and its body/tiles grids are different mechanisms. (`E/src/styles/components/_div.scss:26`; `:127`; `E/src/styles/components/_body.scss:61`; `S/.orkestrel/veneer/plan.md:124`.) |
| Selector proof overclaim | The current test inspects the `elements` layer through `matchesLooseTagPair`; that helper permits mandated relationships and does not equate to an exact exclusion census. Add whole-cascade absence assertions, especially for `legend + *`, without weakening the existing policy. (`V/tests/src/styles/index.test.ts:23`; `V/tests/setupStyles.ts:427`; `:1578`.) |
| `[hidden]` and importance | Keep the declared layer order. Prove hidden behavior against ordinary class declarations, unlayered normal styles, and later-layer important declarations. Do not infer important-rule behavior from the normal class-override proof. (`V/src/styles/_tokens.scss:3`; `S/.orkestrel/veneer/research/ledger.md:557`.) |
| Tailwind profile remains unproved | Preserve standalone CSS as the acceptance baseline. Carry prefixed/unprefixed ownership and normal/important utility tests to the named Tailwind unit; do not claim coexistence from standalone results. The plan schedules that profile after Button and Card. (`S/.orkestrel/veneer/plan.md:592`; `:599`.) |
| Inventory presence mistaken for behavior | Add live proofs for read-only inputs, including body, heading, link, root-font-size, and icon-transform consumers. Reboot’s inventory declares no custom properties despite reading them. (`S/.orkestrel/veneer/units/content-layout-scout-report.md:13`; `:20`.) |
| Shared token inheritance | Test local aliases, nested themes, factor changes, invalid values, and target/neighbor isolation. Existing documentation already warns that a local density factor alone does not recompute inherited scale values. (`V/guides/veneer.md:335`; `S/.orkestrel/veneer/plan.md:565`.) |
| U7-style scope omissions | Each brief must include affected conformance assertions, setup export populations, token expectations, barrel tests, and guide parity. Do not defer a property that the same unit emits. U7a stopped on these mismatches. (`S/.orkestrel/veneer/plan.md:1003`; `:1027`.) |
| False capture evidence | Settle motion, capture the reached state, restore pane staging, and verify focus/hover still matches the claimed image. U7f exposed transition-time captures and staging effects on later pointer work. (`S/.orkestrel/veneer/u7f-verdict.md:25`; `:112`.) |
| Unsupported media claims | Use installed print and motion staging where applicable. Keep forced-colors browser acceptance explicitly open until an instrument supports it; do not claim a stylesheet declaration proves rendering. (`V/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1621`; `V/guides/veneer.md:671`.) |
| Reboot regression across the showcase | Re-run existing Button and shell proofs after global tag changes. Their previous acceptance predates the new cascade. The current stylesheet imports only document/body and Button treatments. (`V/src/styles/index.scss:1`.) |

**Alternatives and recommendations for reconciliation**

| Decision | Alternatives and cost | Objective recommendation |
|---|---|---|
| Layout without Elements | Bootstrap geometry supplies an independent contract; exclusion removes required layout capability. Neither creates an Elements specimen. | Implement Bootstrap geometry, record `bootstrap` provenance, and present the missing Elements comparison as an explicit acceptance difference. |
| Showcase shape | Separate mechanism sections improve ownership and evidence targeting; an aggregated Content section reduces navigation but shares more implementation and fixtures. | Use mechanism sections, with Images/Figures sharing Media and Grid/Gutters sharing Grid. Let the subjective lane determine presentation within those boundaries. |
| Typography and table appearance | Copying Elements selectors imports forbidden composition; retaining Bootstrap paint loses the intended calibration. | Adapt measured values into tag defaults and explicit classes. Keep selectors and behavior under Veneer’s rules. |
| Deferral grammar | Preserve the existing tables or unify them through a separately specified grammar change. The current scanner reads `Name / Owner / Reason`; Tokens uses `Name / Waiting on`. (`V/tests/setupConformance.ts:527`; `V/guides/veneer.md:652`.) | Leave the user’s grammar decision open. Preserve the current tables during implementation, and add permanent-exclusion handling without disguising exclusions as deferrals. |
| Ratio and token naming | Semantic names improve reading; ratio-spelled names mirror external classes more directly. | Permit the subjective lane to choose spelling, provided registry paths match emitted names and every compatible value has the same independently proved geometry. |