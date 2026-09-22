I hold the **analyst lane on GPT-6 Astra**, with the objective perspective. Retain the proposed component split and add a serial integration owner. Acceptance must bind each shipped selector to its recorded declarations, resolved behavior, and specimen capture.

**Split.** Keep `badge` + `breadcrumb` + `btn-close`; `btn-group` + `btn-toolbar`; `card` + `list-group`; `pagination`; and `progress` + `spinner` + `placeholder`.

The group unit owns the transfer of group-size selectors from Button. The card unit owns the card/list combinators. The motion unit owns the different reduced-motion behaviors without forcing them through a common animation policy. These boundaries follow the source mechanisms described in terrain §§ A–C; see [Button’s size rules](/home/user/veneer/src/styles/components/_button.scss:196), [card/list composition](/home/user/veneer/node_modules/bootstrap/scss/_card.scss:46), and [spinner reduced motion](/home/user/veneer/node_modules/bootstrap/scss/_spinners.scss:79).

Use disjoint worktrees for component writing. Treat shared files as report-only and return exact patches for serial integration. Shared ownership includes files beyond those named in the brief: the showcase export assertion, section inventory, setup case tables, and capture assertions also change. See [the export assertion](/home/user/veneer/tests/app/browser/index.test.ts:8), [the section inventory](/home/user/veneer/tests/app/browser/Showcase.test.ts:60), and [the capture registry](/home/user/veneer/tests/setup.ts:91).

Start from an accepted foundation containing F5b, F5c, F6, and F7. Adding F6 to the dependency is necessary for a B-PASSIVE acceptance that claims D5: the tree still emits the right-to-left twin through [the styles build plugin](/home/user/veneer/configs/src/vite.styles.config.ts:22), and [the roadmap assigns its removal to F6](/home/user/veneer/ROADMAP.md:376). Component design can proceed before that landing; component acceptance cannot substitute for it.

Integrate each completed component slice with its shared patches before running its resolved-cascade proofs. An unregistered partial cannot pass as a shipped implementation, and importing that partial directly into its proof would bypass the [built-cascade test contract](/home/user/veneer/configs/src/vite.styles.config.ts:47).

**Naming.** Use semantic source names, retain Bootstrap’s public selectors exactly, and mirror each partial by its full relative path. Use `_close.scss` and `_button-group.scss`, consistent with the existing `_button.scss`; use singular `_placeholder.scss` and `_spinner.scss`, matching their inventory keys. A Sass namespace is an implementation name, not a compatibility alias.

The following names define the proposed files and showcase contracts.

| Inventory key | Partial under `src/styles/components/` | Proof under `tests/src/styles/components/` | Explicit `@use` namespace | Section class | Constants in `app/browser/constants.ts` |
| --- | --- | --- | --- | --- | --- |
| `badge` | `_badge.scss` | `badge.test.ts` | `badge-component` | `BadgeSection` | `BADGE_COPY`, `BADGE_SPECIMENS` |
| `breadcrumb` | `_breadcrumb.scss` | `breadcrumb.test.ts` | `breadcrumb-component` | `BreadcrumbSection` | `BREADCRUMB_COPY`, `BREADCRUMB_SPECIMENS` |
| `btn-close` | `_close.scss` | `close.test.ts` | `close-component` | `CloseSection` | `CLOSE_COPY`, `CLOSE_SPECIMENS` |
| `btn-group` | `_button-group.scss` | `button-group.test.ts` | `button-group-component` | `ButtonGroupSection` | `BUTTON_GROUP_COPY`, `BUTTON_GROUP_SPECIMENS` |
| `btn-toolbar` | `_button-group.scss` | `button-group.test.ts` | `button-group-component` | `ToolbarSection` | `TOOLBAR_COPY`, `TOOLBAR_SPECIMENS` |
| `card` | `_card.scss` | `card.test.ts` | `card-component` | `CardSection` | `CARD_COPY`, `CARD_SPECIMENS` |
| `list-group` | `_list-group.scss` | `list-group.test.ts` | `list-group-component` | `ListGroupSection` | `LIST_GROUP_COPY`, `LIST_GROUP_SPECIMENS` |
| `pagination` | `_pagination.scss` | `pagination.test.ts` | `pagination-component` | `PaginationSection` | `PAGINATION_COPY`, `PAGINATION_SPECIMENS` |
| `progress` | `_progress.scss` | `progress.test.ts` | `progress-component` | `ProgressSection` | `PROGRESS_COPY`, `PROGRESS_SPECIMENS` |
| `spinner` | `_spinner.scss` | `spinner.test.ts` | `spinner-component` | `SpinnerSection` | `SPINNER_COPY`, `SPINNER_SPECIMENS` |
| `placeholder` | `_placeholder.scss` | `placeholder.test.ts` | `placeholder-component` | `PlaceholderSection` | `PLACEHOLDER_COPY`, `PLACEHOLDER_SPECIMENS` |

Load the button-group partial once for its keys. The `progress-component` namespace disambiguates the component from the elements-layer module already loaded by [the stylesheet barrel](/home/user/veneer/src/styles/index.scss:41). The naming forms follow [the naming contract](/home/user/scaffold/.claude/rules/names.md:170); partial resolution follows [the mirror contract](/home/user/scaffold/.claude/rules/tests.md:9).

Keep section classes under `app/browser/sections/` and their proofs under `tests/app/browser/sections/`. Reuse `SpecimenSection` and the existing readonly `MarkupSpecimen` contract; constants remain centralized and frozen. See [the specimen renderer](/home/user/veneer/app/browser/sections/SpecimenSection.ts:29), [the existing section specialization](/home/user/veneer/app/browser/sections/TableSection.ts:12), and [the markup contract](/home/user/veneer/app/browser/types.ts:25).

**Showcase.** Give each key a named subject region. Unit boundaries describe work ownership; they do not supply useful showcase subjects. Cross-key specimens, such as a card containing a list group, can cover multiple inventory entries while retaining an explicit subject for each capture.

Require a coverage matrix keyed by inventory selector and condition, with the proof case, subject, pseudo-element where applicable, specimen, and capture step. Every emitted selector must have an exercised match and a capture. Retained foreign-family deferrals require absence proofs; capturing markup for an unshipped selector cannot prove its styling. Terrain § A identifies the selector population, while [the inventory records conditions on selector entries](/home/user/veneer/tests/fixtures/oracle/inventory.json:196).

The following specimens cover the required mechanisms.

| Key | Required specimens and driven states |
| --- | --- |
| `badge` | Populated and empty badges; badge within `.btn`; wrapping pressure and text sizing; direct padding, color, and radius overrides. Capture the empty badge’s containing specimen so its absence has visible context. |
| `breadcrumb` | A named navigation containing adjacent items and an active item; wrapped content; the default divider and a consumer divider override. Read and capture the separator’s `::before` treatment. |
| `btn-close` | Rest, hover, keyboard focus, native `disabled`, `.disabled`, and `.btn-close-white`; document light/dark and nested theme islands. Include a usable accessible name and the surrounding background. |
| `btn-group` | Horizontal and vertical arrangements; a solitary child and positional children; nested groups; checked and focused `.btn-check` labels; hover, focus, held active, and `.active`; small and large group sizes. Include a `.dropdown-toggle` child to exercise the exclusion in the ordinary radius selector, without shipping split-toggle rules. |
| `btn-toolbar` | A named toolbar containing groups, shown wide and under wrapping pressure. Keep the deferred input-group relationship out of the shipping claim. |
| `card` | Body/title/subtitle/text/link composition; direct `hr`; headers and footers; list group as first child, last child, and between caps; header tabs/pills and active nav-link composition; full/top/bottom images and image overlays; grouped cards on each side of `576px`, including nested cards. |
| `list-group` | Ordinary and numbered lists; solitary and adjacent items; active, native-disabled, and class-disabled items; anchor and button actions at hover/focus/held active; flush lists; unconditional horizontal layout and every named breakpoint variant; each Bootstrap contextual role; card composition. |
| `pagination` | Small, default, and large pagination; first/interior/last links; hover/focus; active and disabled states applied directly to the link and through its parent; direct token overrides. |
| `progress` | Empty, partial, and complete bars; labels and overflow; striped and animated bars; stacked segments with different widths; height override; normal and reduced motion. |
| `spinner` | Border and grow variants, their small forms, inherited color, and size/speed overrides; normal and reduced motion; representative animation phases with an accessible status label. |
| `placeholder` | Default, extra-small, small, and large forms; `.placeholder.btn::before`; glow and wave; inherited color; normal and reduced motion, including sampled animation phases. |

Use whole-specimen frames throughout: complete navigation, group, toolbar, card composition, list, progress track, or loading-status context. Preserve background, theme scope, and responsive containing width. Register frames as `<scenario>--<theme>-<viewport>[-<step>]`, with accessibility artifacts for each specimen and variant. Do not substitute a crop of a link, bar, or spinner for its containing specimen. The existing capture relocation rationale makes preserving context material; see [the capture-key contract](/home/user/veneer/tests/setup.ts:69).

Ship card-header combinators because their declarations are self-contained on card composition. Do not claim that this supplies navigation behavior. This follows the existing treatment of foreign class references in [the helper guide](/home/user/veneer/guides/veneer.md:286) and Bootstrap’s [card-header rules](/home/user/veneer/node_modules/bootstrap/scss/_card.scss:134).

**Elements layer.** Retain `progress { vertical-align: baseline; }` in `elements`; place `.progress`, `.progress-stacked`, their descendants, and their keyframes in `components`. Importing modules with the same basename does not merge their responsibilities. The established order puts components after elements; see [the layer declaration](/home/user/veneer/src/styles/_tokens.scss:4) and [the native progress partial](/home/user/veneer/src/styles/elements/_progress.scss:1).

Add no other bare-element rule for this family. In particular, do not introduce native progress appearance replacement, vendor fill pseudo-elements, role-based group styling, or structural breadcrumb/card inference from Elements. Terrain § D records those alternatives; they conflict with the explicit-class boundary in [the guide](/home/user/veneer/guides/veneer.md:205).

Prove the native progress treatment remains present and that class-level progress layout comes from the components layer. Also prove class control on native buttons and lists. Lower-layer declarations can remain effective when a component omits the property: bare buttons carry transitions, focus shadows, and disabled opacity in [the element partial](/home/user/veneer/src/styles/elements/_button.scss:19). Any required component reset must be measured, owned by that component, and accounted in the ledger; a showcase-only override cannot close this gap.

**Deferred rows.** Retire deferrals by exact emitted name, across every inventory key containing that name. Inventory overlap does not justify duplicate CSS or a surviving deferral. Terrain §§ A–B describes the overlap, and [the presence scanner](/home/user/veneer/tests/setupServer.ts:833) applies deferrals across matching keys.

The units have the following deferral responsibilities.

| Unit | Retire | Retain absent |
| --- | --- | --- |
| B-MARKS | `.btn .badge`; `.btn-close`, its hover/focus/native-disabled/class-disabled states, and `.btn-close-white`; the `--bs-btn-close-*` deferrals listed in the guide. The filter already ships and has no deferral to retire. | `.alert-dismissible .btn-close`, `.toast-header .btn-close`, `.modal-header .btn-close`, `.offcanvas-header .btn-close`, owned by Overlays. |
| B-GROUPS | Every Passive-owned group and toolbar row: horizontal/vertical bases, child layout and state stacking, border overlap, positional radii, nested groups, and `.btn-toolbar`. The group-size twins already ship and have no deferral to retire. | `.btn-toolbar .input-group`, owned by Forms; `.btn-group > .btn.dropdown-toggle-split:first-child`, `.btn-sm + .dropdown-toggle-split`, `.btn-lg + .dropdown-toggle-split`, and their group-size counterparts, owned by Disclosure. |
| B-SURFACES | No existing Passive deferral in the cited table belongs to these keys. Add their shipped compatibility obligations. | Existing foreign-family deferrals. |
| B-PAGES | No existing Passive deferral in the cited table belongs to pagination. Add its shipped compatibility obligations. | Existing foreign-family deferrals. |
| B-MOTION | `.placeholder.btn::before`. | Existing foreign-family deferrals. |

These assignments follow [the group deferrals](/home/user/veneer/guides/veneer.md:350), [the cross-family boundaries](/home/user/veneer/guides/veneer.md:367), and [the badge, close, and placeholder rows](/home/user/veneer/guides/veneer.md:388).

If a unit intentionally ships a previously deferred name, its integration patch must delete that exact deferral and add the applicable shipping evidence in the same landing. For a foreign-owned name, preserve the agreed boundary and remove the accidental emission. An addition row cannot legitimize a selector while its deferral remains: [the scanner explicitly rejects that state](/home/user/veneer/tests/setupServer.ts:858).

Add shipped selector obligations for every B-PASSIVE key and shipped variable obligations wherever its inventory property map is nonempty. Do not invent variable obligations for `btn-toolbar` or `placeholder`. Update the conformance list in the same integration; see [the shipped-key collector](/home/user/veneer/tests/setupServer.ts:802) and [the literal list](/home/user/veneer/tests/conformance.test.ts:80).

**Departures and additions.** Treat the ledger as accounting, not authorization to import Mailbox features. Adopt no Mailbox-specific capability in B-PASSIVE. Retain matching Bootstrap behavior and record necessary tokenization or layer-control differences at their exact selector, property, and condition.

The candidate rulings are as follows.

| Candidate from terrain § D | Proposed ruling |
| --- | --- |
| `.btn-close-white` and the dark close filter | Retain Bootstrap’s existing class and `--bs-btn-close-filter` mechanism. Neither is an addition. Refuse Mailbox’s `--bs-btn-close-white-filter` property and direct-filter theme selectors; see [Bootstrap close](/home/user/veneer/node_modules/bootstrap/scss/_close.scss:49) and [Mailbox close](/home/user/mailbox/src/styles/_close.scss:48). |
| Close glyph converted to a mask | Refuse for this baseline. Retain the recorded background asset and filter contract. Correct the guide’s prospective mask wording in the close unit’s shared patch; see [the guide’s asset proposal](/home/user/veneer/guides/veneer.md:790). |
| Named inline-size containers on card, list group, and toolbar | Refuse the extra containment declarations and any dependent container queries. They change layout without an oracle counterpart; see terrain § D and [Mailbox’s card containment](/home/user/mailbox/src/styles/_card.scss:18). |
| `.card-flush`, `.card-frame`, extra card tokens, and default card shadow | Refuse. Retain `.list-group-flush`, which Bootstrap does carry. A declared `--bs-card-box-shadow` does not authorize a `box-shadow` declaration when Bootstrap’s disabled-shadow configuration emits none; see terrain § A and [Mailbox’s card shadow](/home/user/mailbox/src/styles/_card.scss:54). |
| Default badge fill, `.filled`, `.pill`, badge background/line-height tokens | Refuse. Preserve the recorded badge properties and its absence of a default background declaration; see [Bootstrap badge](/home/user/veneer/node_modules/bootstrap/scss/_badge.scss:6) and [Mailbox badge](/home/user/mailbox/src/styles/_badge.scss:10). |
| Empty badge suppression and `.btn .badge` positioning | Retain: these are Bootstrap behavior, including `top: -1px`; see [Bootstrap’s rules](/home/user/veneer/node_modules/bootstrap/scss/_badge.scss:28). |
| Empty declaration of `--bs-breadcrumb-font-size` | Refuse. Preserve the consumer reference without inventing the declaration that the pinned inventory omits; see terrain § A and [the breadcrumb source](/home/user/veneer/node_modules/bootstrap/scss/_breadcrumb.scss:6). |
| Adjacent list-item border collapse | Retain Bootstrap’s exact border and active-overlap behavior; see [the list rules](/home/user/veneer/node_modules/bootstrap/scss/_list-group.scss:83). |
| Group active stacking at `z-index: 2` and secondary-specific stacking | Refuse. Bootstrap specifies `1` for the group’s interactive children; see [Bootstrap grouping](/home/user/veneer/node_modules/bootstrap/scss/_button-group.scss:15) and [Mailbox grouping](/home/user/mailbox/src/styles/_button-group.scss:38). |
| Fixed `0.625rem` progress stripe displacement and native progress reset | Refuse. Retain `var(--bs-progress-height)` displacement and the existing native element rule; see [Bootstrap progress](/home/user/veneer/node_modules/bootstrap/scss/_progress.scss:5). |
| Placeholder pause, `.skeleton`, additional shimmer keyframes, and placeholder timing tokens | Refuse. Bootstrap’s glow and wave continue under reduced motion; see [Bootstrap placeholders](/home/user/veneer/node_modules/bootstrap/scss/_placeholders.scss:28) and [Mailbox placeholders](/home/user/mailbox/src/styles/_placeholder.scss:100). |
| Spinner slowdown | Retain Bootstrap’s `0.75s` normal duration and `1.5s` reduced-motion duration. Refuse the Elements `.spinner` vocabulary and `spinner-rotate` keyframe; see terrain § D and [the pinned spinner values](/home/user/veneer/tests/fixtures/oracle/inventory.json:612). |
| Right-to-left comments, flips, and alternate output | Refuse under D5, including the comment embedded in [Bootstrap’s rotation keyframe](/home/user/veneer/node_modules/bootstrap/scss/_spinners.scss:19). |
| Mailbox-specific forced-color treatments | Refuse as baseline additions. Measure the supported host behavior without copying Mailbox’s extra selectors and declarations; see [Mailbox close treatments](/home/user/mailbox/src/styles/_close.scss:69). |

The brief’s explicit Bootstrap-first instruction governs the motion conflict with [the generic animation rule](/home/user/scaffold/.claude/rules/styles.md:49): progress stops, spinners slow, and placeholders continue. State this in the unit brief so the writer does not add a blanket animation reset.

Reuse existing tokens when their meanings match. Keep literal color definitions and embedded color assets centralized in `_tokens.scss`; record differences introduced by runtime token references. Preserve empty custom-property values where the oracle declares them. Iterate Bootstrap’s role set through [`tokens.$aliased`](/home/user/veneer/src/styles/_tokens.scss:9), avoiding accidental `.list-group-item-tertiary` emission.

Move group-size selector ownership without changing its existing tokenized behavior. Extract shared sizing declarations into `_mixins.scss` and keep direct-size and grouped-size consumers aligned; cross-partial `@extend` is prohibited by [the styles contract](/home/user/scaffold/.claude/rules/styles.md:45). Retain or update the corresponding measured departures instead of silently resetting Button’s established sizes.

**Proof shape.** Pair declaration accounting with resolved browser assertions. The F5b comparison must bind selector, declaration, custom-property, keyframe, and condition coverage; browser proofs must distinguish an incorrect value from a missing rule. Terrain §§ A and E supply the inventory population, not a substitute for those assertions.

Use the installed exports directly from `@orkestrel/test/browser`:

- `build`, `mount`, and `render` for real nodes; `readStyle`, `readPixels`, `readToken`, and `readRootToken` for computed values; `parseCSSColor` and `matchesColor` for paint. See [the resolved readers](/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2239).
- `readRules` and `findKeyframes` for CSSOM evidence. `findRule` is a substring lookup returning the first match, so it cannot establish selector completeness or the winning declaration; see [its contract](/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1183).
- `hoverAccessible`, `holdAccessibleWithin`, `traverseAccessibleWithin`, `pressKeys`, and `releasePointer` for real interaction. The scoped exports exist in the installed package despite the roadmap’s pending-release wording; see [scoped hold](/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1392) and [scoped traversal](/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2912).
- `stageMedia({ motion: false })` and `releaseMedia` for reduced motion; `stagePane` and `releasePane` for viewport conditions; `waitForAnimations` for finite transitions. That helper excludes infinite animations, so spinner and placeholder proofs need timeline observations and phase assertions; see [the animation wait contract](/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2958).
- `createPortfolio`, `captureFrame`, `describeTree`, `readStates`, and `readFrame` for the accepted F7 capture contract. Reuse its pixel guard and subject handling; see [portfolio construction](/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts:882).

Assert the following resolved effects.

| Proof subject | Required value assertions |
| --- | --- |
| Badge, breadcrumb, close | Badge relative font/padding geometry, empty display, and button offset; breadcrumb physical spacing, divider content/color, wrapping, and active color; close content-box geometry, asset/filter, opacity `0.5`/`0.75`/`1`/`0.25`, disabled pointer behavior, and focus-shadow geometry. |
| Groups and toolbar | Flex direction, child growth/width, physical negative margins, each outer and joined radius, `z-index: 1`, group-size equivalence to direct Button sizes, and toolbar wrapping. Keep the existing [direct/group size proof](/home/user/veneer/tests/src/styles/components/button.test.ts:209) effective after relocation. |
| Cards and lists | Cap/body spacing, image sizing, overlay bounds, group joins, and card/list border inheritance; numbered counters; item adjacency and active overlap; horizontal geometry below and at each breakpoint; action-state and contextual paint on native and anchor hosts. |
| Pagination | Size-specific padding/font/radius, negative border overlap, hover stacking `2`, focus/active stacking `3`, direct/parent state equivalence, disabled pointer behavior, focus shadow, and transition collapse under reduced motion. |
| Progress | Track height, segment widths, stacked overflow and child width `100%`, stripe image/size/displacement, normal `width 0.6s ease` transition, `1s` stripe animation, and reduced-motion transition/animation removal. |
| Spinner | Dimensions, small-border width, transparent right border, inherited paint, named keyframe effects, normal `0.75s` duration, and reduced `1.5s` duration while animation remains active. |
| Placeholder | Minimum heights `1em`, `0.6em`, `0.8em`, and `1.2em`; opacity `0.5`; button pseudo-content; glow opacity `0.2`; wave gradient, mask size, and displacement; normal and reduced-motion `2s` animation behavior. |

Run theme-sensitive assertions under explicit light and dark scopes, nested opposite-mode islands, and outside siblings. Override component variables and assert the consumer property changes. Use independently pinned values or independently rendered Bootstrap references, with the foundation’s recorded token departures applied explicitly; do not compare a component only with its own token expression.

Exercise card groups around `576px` and each list-group boundary at `576px`, `768px`, `992px`, `1200px`, and `1400px`. Inspect enclosing conditions even though the inventory’s `media` arrays are empty. Reuse the existing breakpoint mechanism while accounting for its condition spelling; see [the breakpoint mixins](/home/user/veneer/src/styles/_mixins.scss:93).

**Risks.** The principal risks are shared-file integration gaps, inherited element treatments, lost duplicate-key accounting, incorrect responsive joins, and flattened motion behavior. Catch them with exact membership assertions and value mutations, rather than screenshots or selector-presence checks alone. Mutations must preserve test collection and make the named assertion fail.

For the unit table, `C(stem)` means `src/styles/components/_<stem>.scss` and its matching `tests/src/styles/components/<stem>.test.ts`. `S(Name)` means `app/browser/sections/<Name>Section.ts` and its matching `tests/app/browser/sections/<Name>Section.test.ts`.

The shared integration set comprises `src/styles/index.scss`, `_tokens.scss`, and `_mixins.scss`; their affected mirrored proofs; `guides/veneer.md`; `tests/conformance.test.ts`; the affected fixed `tests/setup*.ts` modules and their proofs; `app/browser/constants.ts`, `types.ts`, `index.ts`, and `Showcase.ts`; `tests/app/browser/index.test.ts`, `Showcase.test.ts`, and `integration.test.ts`; and the F7 registry in `tests/setup.ts`. `ROADMAP.md` remains report-only for the Orchestrator. Vendored policy files, the oracle fixture, manifests, and build configuration remain outside these component units.

Every component unit’s acceptance includes its shared patches being integrated, scoped style and showcase proofs passing through the built cascade, accounting closure, and complete F7 specimen evidence. The following table adds the unit-specific criteria and risks.

| Unit | Keys | Owned files | Shared files | Depends on | Acceptance criteria | Risks |
| --- | --- | --- | --- | --- | --- | --- |
| B-MARKS | `badge`, `breadcrumb`, `btn-close` | `C(badge)`, `C(breadcrumb)`, `C(close)`; `S(Badge)`, `S(Breadcrumb)`, `S(Close)` | Shared integration set, report-only | Accepted foundation | All nondeferred selectors and properties covered; close theme islands and white override resolve correctly; empty badge and divider captured; matching Passive deferrals retired. | Bare-button effects leak into close; empty values disappear; asset/filter behavior is replaced; overlay rules ship accidentally. |
| B-GROUPS | `btn-group`, `btn-toolbar` | `C(button-group)`; existing `C(button)` for size-selector transfer and proof adjustment; `S(ButtonGroup)`, `S(Toolbar)` | Shared integration set, including the shared sizing mixin and cases | Accepted foundation | Direct/group sizes remain equal with their recorded bindings; nested/vertical joins and state stacking match; toolbar wraps; Forms and Disclosure selectors remain absent. | Duplicated sizing declarations; cross-module `@extend`; incorrect positional corners; Mailbox stacking copied. |
| B-SURFACES | `card`, `list-group` | `C(card)`, `C(list-group)`; `S(Card)`, `S(ListGroup)` | Shared integration set | Accepted foundation | Card owns shared combinators once; each inventory key accounts for them; group and horizontal boundaries pass; contextual roles match Bootstrap’s set; no containment or default shadow addition. | Duplicate combinator emission; breakpoint-only holes; accidental tertiary variant; native-button disabled paint survives. |
| B-PAGES | `pagination` | `C(pagination)`; `S(Pagination)` | Shared integration set | Accepted foundation | Direct and parent state forms resolve equally; sizes, joined borders, focus, and reduced-motion transition pass; complete navigation frames and accessible current-page state recorded. | Testing only a parent state; incorrect stacking; active paint leaking into disabled cases; missing endpoint radii. |
| B-MOTION | `progress`, `spinner`, `placeholder` | `C(progress)`, `C(spinner)`, `C(placeholder)`; `S(Progress)`, `S(Spinner)`, `S(Placeholder)`; `tests/src/styles/elements/progress.test.ts` for coexistence | Shared integration set | Accepted foundation | Keyframe declarations and effects match; stacked progress resolves; component-specific reduced-motion behavior passes; native progress remains unchanged; vendor-prefix differences are accounted; no right-to-left comment ships. | Blanket animation removal; waiting for infinite animation completion; fixed stripe displacement; prefixed mask declarations dropped silently. |
| B-INTEGRATE | The complete B-PASSIVE family | The shared integration set | `ROADMAP.md`, report-only | Accepted foundation; each component slice before its integration; all slices before family closure | Apply exact patches serially; retain full-path mirrors; update shipped-key and showcase membership; reject stale ledger/deferral rows; run the family gate chain and rule the complete capture portfolio. | Proofs run against stale built CSS; shared exports omitted; deferrals removed without implementation; ledger rows accepted without matching effects. |

At family closure, run `format:check → lint:check → check → build → test`, then the F7 capture-enabled journey command, on the host that can launch Chromium. Record Chromium’s build with the evidence. The analyst sandbox’s listener restriction leaves browser acceptance to that host run; source review does not establish those results. The family-level gate schedule follows [the roadmap protocol](/home/user/veneer/ROADMAP.md:319), and the scripts resolve through [the package manifest](/home/user/veneer/package.json:60).

PROPOSAL: Retain the mechanism-based component split, integrate shared files serially after the foundation closes, and accept B-PASSIVE only when its nondeferred Bootstrap surface has exact accounting, resolved-value proofs, and complete specimen captures.