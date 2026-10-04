U5b is implemented. The three faces, 23 specimens, chrome replacements, app tests, and standalone showcase build are complete. All acceptance gates passed. The final setup-suite observation has 9 failures in U6-owned showcase describes. Nothing was committed.

The tests read these compositions in document order:

| Face | Button label | Connected showcase styles |
| --- | --- | --- |
| `bootstrap` | Bootstrap only | `veneer-bootstrap` |
| `unexcluded` | Tailwind without the layer | `veneer-unexcluded`, immediately followed by `veneer-bootstrap` |
| `tailwindcss` | Tailwind with the layer | `veneer-tailwindcss` alone |

The tests cover all six directed face transitions, repeated selection, pressed states, status text, host stylesheet preservation, teardown, and restart defaults.

U4’s reverse-order finding, relied upon here, was:

> Reverse-order measurements find **no differing longhands on the witness elements** and no incompatible class-delta differences across the shared names and `RELATION_WIDTHS`.

The page therefore serves `[unexcluded, built]` as ruled.

Chrome counts before and after:

| Kind | Before | After |
| --- | ---: | ---: |
| Fragment figures | 223 `card h-100 mb-0` | 234 `card flex-fill mb-0` |
| Their fragment columns with added `d-flex` | 0 | 234 |
| Rendered figures, including factory figures | 297 | 308 |
| Bodies with `align-content-start align-items-start` | 104 using `gap-3` | 115 using `row-gap-3 column-gap-3` |
| Bodies with `align-items-start` | 87 using `gap-3` | 87 using `row-gap-3 column-gap-3` |
| Bodies with `align-content-start align-items-center` | 8 using `gap-3` | 8 using `row-gap-3 column-gap-3` |
| Total direct bodies with replaced gaps | 199 | 210 |
| Header rows with replaced gaps | 2 | 2 |
| Recipe block border | 1 `border` | 1 four-side replacement |
| Recipe block radius | 1 `rounded` | 1 `rounded-2` |
| Chrome `card-body.w-100` | 0 | 0 |

The factory figure class site and both matrix-column branches were updated. The eleven added specimens account for the increased figure and body counts. Non-Tailwind fragments have no changes beyond classes and formatting.

Both P4 runs passed:

| Reading | 1280 px | 390 px |
| --- | ---: | ---: |
| Column `display`: `block` → `flex` | 308 | 308 |
| Figure `flex-grow`: `0` → `1` | 308 | 308 |
| Figure `min-height`: `0px` → `auto` | 308 | 308 |
| Figure `min-block-size`: `0px` → `auto` | 308 | 308 |
| Total longhand departures | 1232 | 1232 |
| Other longhand departures | 0 | 0 |
| Box departures | 0 | 0 |
| Replaced-name chrome census | 0 | 0 |

At 390 px, the real Stylesheets group measures `366 × 52` at `(12, 78.875)`:

| Button | x | y | Width | Height |
| --- | ---: | ---: | ---: | ---: |
| Bootstrap only | 12 | 78.875 | 91.1875 | 52 |
| Tailwind without the layer | 102.1875 | 78.875 | 146.609375 | 52 |
| Tailwind with the layer | 247.796875 | 78.875 | 130.203125 | 52 |

`buttonsWrap: false`; `overflow: false`. Comparing [run 1](/home/user/veneer/tmp/units/flip-showcase/out/p4.run1.json) with [run 2](/home/user/veneer/tmp/units/flip-showcase/out/p4.json) returned exit `0`: byte-identical.

Caption 3.20 uses the scoped-cell branch verbatim:

> Every face: each cell's bottom border takes the table's border color. With the layer, a scoped copy of the reboot's cell rule holds it against preflight, which gives a bare cell's border the text color.

The live border-color triple confirms it:

| Face | Bare `td` border-bottom-color | `table` border-bottom-color |
| --- | --- | --- |
| Bootstrap only | `rgb(222, 226, 230)` | `rgb(222, 226, 230)` |
| Tailwind without the layer | `rgb(222, 226, 230)` | `rgb(222, 226, 230)` |
| Tailwind with the layer | `rgb(222, 226, 230)` | `rgb(222, 226, 230)` |

All 23 caption texts, their `code` and `strong` descendants, and the ordered titles matched the copy document. Existing specimen slugs were retained; new slugs did not collide. The figure-image specimen reuses the existing hills SVG data URI at `160 × 80`. The P4 copy uses `replaceChrome`, `mountPage`, `readSurface`, `startServer`, `launchBrowser`, and `writeJSON`.

The current guide contains 46 curation rows. Their rendered witnesses are mapped below; grouped entries enumerate separate guide rows. [The full mapping](/home/user/veneer/tmp/units/flip-showcase/curation.md) records every matched page location.

| Form | Curation row(s) | Rendered witness |
| --- | --- | --- |
| reboot | `modal-title`, `offcanvas-title` | Tailwind modal and offcanvas titles |
| reboot | `popover-header` | Popovers |
| reboot | `card-title`, `card-text` | Tailwind card; Card |
| reboot | `accordion-header` | Accordion; Engine states |
| reboot | `pagination` | Tailwind pagination; Pagination |
| reboot | `placeholder-glow` | Placeholders |
| reboot | `stretched-link` | Stretched link |
| reboot | `visually-hidden-focusable` | Skip link; Visually hidden |
| reboot | `alert-link` | Tailwind alert link; Alerts |
| reboot | `card-link` | Card image |
| reboot | `icon-link` | Icon link; Card image |
| reboot | `link-primary`, `link-secondary`, `link-success`, `link-danger`, `link-dark` | Colored links, light surface |
| reboot | `link-warning`, `link-info`, `link-light` | Colored links, dark surface |
| reboot | `link-body-emphasis` | Colored links, emphasis; contents and breadcrumb |
| reboot | `lead` | Typography inline |
| reboot | `display-1`, `display-2`, `display-3`, `display-4`, `display-5` | Typography display |
| reboot | `list-unstyled` | Tailwind stack; Typography lists |
| reboot | `focus-ring` | Focus ring |
| restore | `svg:where(.bi)` | Tailwind icon |
| restore | `img:where(.figure-img)` | Tailwind figure image; Figures |
| restore | `img:where(.img-fluid)` | Images; Figures |
| restore | `img:where(.card-img)` | Card overlay |
| restore | `img:where(.card-img-top)` | Card image and group |
| restore | `img:where(.card-img-bottom)` | Card overlay |
| restore | `input:where(.form-check-input)` | Tailwind checkbox; Checks and radios |
| restore | `input:where(.btn-check)` | Checks and radios toggles |
| restore | `input:where(.form-range)` | Range |
| restore | `button:where(.accordion-button)` | Accordion; Engine states |
| scoped | `:where(.table) thead` | Tailwind table; Tables |
| scoped | `:where(.table) tbody` | Tailwind table; Tables |
| scoped | `:where(.table) tfoot` | **Not rendered anywhere on the page** |
| scoped | `:where(.table) tr` | Tailwind table; Tables |
| scoped | `:where(.table) th` | Tailwind table; Tables |
| scoped | `:where(.table) td` | Tailwind table; Tables |

No specimen was invented for the absent `tfoot` row.

The case inventory follows. Parameterized titles represent all their rows. A disk copy is available in [cases.md](/home/user/veneer/tmp/units/flip-showcase/cases.md).

For `tests/app/browser/Showcase.test.ts`:

| Status | Case | Change |
| --- | --- | --- |
| Kept | destroys only its own toasts and preserves a toast registered by the engine first | Unchanged |
| Amended | mounts the page under the Bootstrap face and the light color mode | Five buttons; both Tailwind sheets initially absent |
| Added | holds the recipe compile alone under the tailwindcss face | Recipe text, sole sheet, repeat selection, return to Bootstrap |
| Added | inserts the unexcluded compile directly before the Bootstrap sheet under the unexcluded face | Text, adjacency, status, repeat selection, return |
| Added | moves between every pair of faces through the Stylesheets buttons | Six transitions, composition, button states, status, detached controls |
| Added | leaves a host stylesheet in place under each face | Preserves host content, position, and head restoration |
| Amended | writes the selected color mode to data-bs-theme on the root element | New face label and status |
| Amended | reads every header button at 4.5:1 or more, pressed or not, in both color modes | Five buttons; all three faces in dark mode |
| Amended | restores the title, a %s data-bs-theme, the head, and the body on destroy | Traverses both Tailwind faces |
| Amended | ignores a click on the header of a destroyed mount, also after a second start | New face label |
| Amended | mounts a fresh page under the defaults on a second start after destroy | New label; final recipe-alone composition |
| Amended | restarts a mounted page instead of mounting a second one | New face label |
| Kept | shows the example toast and follows the example dialog through the engine until destroyed | Unchanged |
| Kept | keeps the page in place for a placeholder link and a specimen form, and follows an in-page anchor | Unchanged |
| Kept | releases the main-region guard on destroy | Unchanged |
| Kept | destroys the mount on pagehide and listens again after the next start | Unchanged |
| Deleted | inserts the Tailwind compile directly before the Bootstrap sheet under the Tailwind face | Replaced by the two composition cases; the old recipe-plus-Bootstrap composition is forbidden |

For `tests/app/browser/constants.test.ts`:

| Status | Case | Change |
| --- | --- | --- |
| Kept | routes every registry leaf to a first-matching row | Unchanged |
| Kept | gives every row at least one leaf it wins | Unchanged |
| Kept | gives every composable to the engine section and no other category there | Unchanged |
| Kept | titles every matrix row for its concept, uniquely within its section, and no fragment row | Unchanged |
| Kept | splits borders, corners, text, and flex into one concept per matrix | Unchanged |
| Kept | names only declared sections, and never mixes matrix and fragment rows in one section | Unchanged |
| Added | leads the Tailwind section with the three faces | Exact title and lead |
| Kept | carries unique ids and unique titles | Unchanged |
| Amended | places every section in a declared group, every group holding one at least | Group title `Tailwind` |
| Kept | routes no registry class to a section of the interactions group | Unchanged |
| Kept | lists sections group by group, in group order | Unchanged |
| Kept | reads fragments only for sections that own no matrix row | Unchanged |
| Kept | is sorted, unique, and disjoint from the registry | Unchanged |
| Kept | writes exactly the registry classes the engine fixture records, in both directions | Unchanged |
| Kept | names written classes no registry rule reacts to only in the engine lead | Unchanged |
| Kept | covers every module the proposal names and shows each in declared sections | Unchanged |
| Amended | labels the stylesheet and color-mode buttons and titles the page | Three face entries in prescribed order |

For `tests/app/browser/factories.test.ts`:

| Status | Case | Change |
| --- | --- | --- |
| Kept | creates the inline %s glyph hidden from assistive technology | Unchanged |
| Kept | refuses a name the icon templates do not ship | Unchanged |
| Kept | declares a template set that the ownership table uses in full | Unchanged |
| Kept | renders a %s specimen carrying %s exactly once | Unchanged |
| Kept | names exactly the shapes that show their class as text | Unchanged |
| Kept | draws textless fills and labels a box with its class | Unchanged |
| Kept | keeps the %s chips legible at 390 px | Unchanged |
| Kept | places the shown class on the element the shape names | Unchanged |
| Kept | draws a side on its own and a width, color, or removal beside the full border | Unchanged |
| Kept | frames a fixed white, light, black, or dark token on the opposite fixed surface | Unchanged |
| Kept | keeps the licensed light, white, dark, and black text frames readable in the %s color mode | Unchanged |
| Kept | draws the bare shape that a framed specimen holds | Unchanged |
| Kept | wraps the table in a named, keyboard-scrollable region | Unchanged |
| Kept | heads the value column and every infix column, and heads each row with its value | Unchanged |
| Kept | renders every family name once, in the cell of its value and infix | Unchanged |
| Kept | hides the Value column below sm only where a base-only specimen reads its whole class | Unchanged |
| Kept | labels the empty value and leaves an absent cell empty | Unchanged |
| Amended | labels a card figure by its caption title and lists the classes in its caption | Figure uses `flex-fill` |
| Kept | lists each module with the classes it writes, where they show, and what the engine adds | Unchanged |
| Kept | keeps disabled engine triggers in their Bootstrap focus order after boot and the frozen alert off the dismiss route | Unchanged |
| Kept | orders shadows by size and leaves contextual colors and shadows on the page surface | Unchanged |
| Kept | gives wrapping flex specimens separate lines and free cross-axis space | Unchanged |
| Kept | keeps overflow visible outside its frame and hints before the specimen scrollers | Unchanged |
| Amended | labels a matrix section by its heading and holds one figure per family | `col-xl-12 d-flex` |
| Amended | gives each templated row its figure and a base-only family a half-width column | `col d-flex` |
| Kept | hints that a matrix with infix columns scrolls below the xl breakpoint, and no other | Unchanged |
| Kept | draws a different row gap in every row of the row-gap matrix | Unchanged |
| Kept | lists each caption class as its own unbreakable token in every figure | Unchanged |
| Kept | opens the engine section with the engine table | Unchanged |
| Kept | renders the heading and lead alone for a section with no specimen source | Unchanged |
| Kept | renders each class as its own unbreakable code token in a wrapping row | Unchanged |
| Kept | links every section by title under its group label, in page order | Unchanged |
| Kept | leaves out a group with no section | Unchanged |
| Kept | presses only the selected choice and names the group | Unchanged |
| Amended | presses %s and %s and reads them in the status line | Six face/theme rows |
| Amended | builds the skip link, banner, controls, contents region, and main landmark | Three face labels, exact header gap classes, no header `gap-3` |
| Kept | keeps the sticky contents inside its scrolling box from the lg breakpoint | Unchanged |
| Kept | heads every group and renders every section in page order | Unchanged |
| Amended | carries only registry, engine marker, icon, and Tailwind class tokens, no style attribute, and unique ids | Also checks unexcluded shell tokens |

For `tests/app/browser/helpers.test.ts`:

| Status | Case | Change |
| --- | --- | --- |
| Kept | reads every registry leaf in the order a second walk reads them | Unchanged |
| Kept | reads a lone name, an empty group, and nested groups in key order | Unchanged |
| Kept | refuses a node that is neither a name nor a group | Unchanged |
| Kept | lets a narrower prefix listed first win over the broader one | Unchanged |
| Kept | matches the prefix itself or the prefix before a hyphen, and nothing else | Unchanged |
| Kept | lets a row with values own only those values, at any infix | Unchanged |
| Kept | puts a fixed white or light token on a dark surface and a black or dark one on a light surface | Unchanged |
| Kept | leaves adaptive and colored tokens on the page surface | Unchanged |
| Kept | reads an infix that another segment follows as the column | Unchanged |
| Kept | reads a trailing infix as a value unless the family names that infix with a value | Unchanged |
| Kept | reads the prefix itself as the empty base value and refuses a name outside the family | Unchanged |
| Amended | names the face by its button label and the color mode by its value | Renamed “stylesheet set” to “face”; six exact status expectations |
| Kept | keeps every row in order, gives each name to its first match, and drops unmatched names | Unchanged |
| Kept | lays the display family out as value rows against the base, breakpoint, and print columns | Unchanged |
| Kept | places bare infix columns of the grid and leaves absent cells empty | Unchanged |
| Kept | names the prefix, its values, and its infixes as the family uses them | Unchanged |
| Kept | creates a detached element with its classes added once and its text | Unchanged |

For `tests/app/browser/sections/integration.test.ts`:

| Status | Case | Change |
| --- | --- | --- |
| Amended | %s shows every class it owns and only admitted classes | `flex-fill` figures inside `d-flex` columns |
| Added | places each Tailwind specimen in the copy order with its caption title | Exact 23-title sequence; swapping columns rejects the sequence |
| Added | keeps chrome classes off every replaced name | Chrome census; planted `h-100` detected and removed |
| Kept | reports a removed owned class, a planted class, a style attribute, and a hidden element | Unchanged |
| Kept | keeps every frozen-state specimen off the engine routes, and reports a planted route | Unchanged |
| Kept | admits the icon tokens the icon templates name, and no other bi- token | Unchanged |

For `tests/app/browser/index.test.ts`:

| Status | Case | Change |
| --- | --- | --- |
| Kept | exports the showcase constants, templates, helpers, factories, and entity | File unchanged |

Gate results:

| Command | Exit | Result |
| --- | ---: | --- |
| Baseline `npm run test:app:browser` | 0 | 226 passed |
| Baseline `npm run test:setup:browser` | 1 | 127 passed, 1 failed |
| `npm run check:app:browser` | 0 | Passed |
| `npm run check` | 0 | All projects passed |
| `npm run lint:check` | 0 | Passed |
| `npm run format:check` | 0 | 357 files passed |
| Final `npm run test:app:browser` | 0 | 234 passed across 8 files |
| `npm run build:app:browser` | 0 | Built |
| P4 run 1 | 0 | Passed |
| P4 run 2 | 0 | Passed |
| `cmp` of P4 outputs | 0 | Identical |
| Copy/curation/live-reading audit | 0 | 23 captions matched; mapping recorded |
| `npm run build:showcase` | 0 | Built |
| Final `npm run test:setup:browser` | 1 | 119 passed, 9 failed |
| Bootstrap digest verification | 0 | Unchanged |
| Final `git diff --check` | 0 | Clean |

The complete `npm run check` output was:

```text
> @orkestrel/veneer@0.0.1 check
> tsc --noEmit --project tsconfig.json && npm run check:src && npm run check:app

> @orkestrel/veneer@0.0.1 check:src
> npm run check:src:core && npm run check:src:browser && npm run check:src:bootstrap && npm run check:src:tailwindcss && npm run check:src:styles && npm run check:src:vue

> @orkestrel/veneer@0.0.1 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json

> @orkestrel/veneer@0.0.1 check:src:browser
> tsc --noEmit -p configs/src/tsconfig.browser.json

> @orkestrel/veneer@0.0.1 check:src:bootstrap
> tsc --noEmit -p configs/src/tsconfig.bootstrap.json

> @orkestrel/veneer@0.0.1 check:src:tailwindcss
> tsc --noEmit -p configs/src/tsconfig.tailwindcss.json

> @orkestrel/veneer@0.0.1 check:src:styles
> tsc --noEmit -p configs/src/tsconfig.styles.json

> @orkestrel/veneer@0.0.1 check:src:vue
> tsc --noEmit -p configs/src/tsconfig.vue.json

> @orkestrel/veneer@0.0.1 check:app
> npm run check:app:core && npm run check:app:browser && npm run check:app:vue

> @orkestrel/veneer@0.0.1 check:app:core
> tsc --noEmit -p configs/app/tsconfig.core.json

> @orkestrel/veneer@0.0.1 check:app:browser
> vue-tsc --noEmit -p configs/app/tsconfig.browser.json

> @orkestrel/veneer@0.0.1 check:app:vue
> vue-tsc --noEmit -p configs/app/tsconfig.vue.json
```

The only changed line in `tests/setupBrowser.ts`, authorized by the final Orchestrator ruling, is:

```ts
	unexcluded: 'Tailwind without the layer',
```

Formatting was limited to the five owned browser TypeScript files, all section HTML fragments, the five amended app test files, and `tests/setupBrowser.ts`. `live-components.html` was included in formatting but remained unchanged.

Every edited tracked file appears in the final porcelain listing below. All paths there resolve against `/home/user/veneer`. The files created under `/home/user/veneer/tmp/units/flip-showcase/` are:

```text
app-1.err
app-1.log
app-1.log.pid
audit.ts
baseline-app.err
baseline-app.log
baseline-app.log.pid
baseline-setup.err
baseline-setup.log
baseline-setup.log.pid
before-chrome.json
before-sha256.txt
browser.ts
build-app.err
build-app.log
build-app.log.pid
build-showcase.err
build-showcase.log
build-showcase.log.pid
cases.md
cases.ts
check.err
check.log
check.log.pid
chromium.txt
copy.json
curation.md
edit-chrome.ts
edit-section.ts
edit-tests.ts
foreign-files.txt
format.err
format.log
format.log.pid
inspect.ts
lib.ts
lint.err
lint.log
lint.log.pid
out/after-chrome.json
out/audit.json
out/p4.json
out/p4.run1.json
p4-1.err
p4-1.log
p4-1.log.pid
p4-2.err
p4-2.log
p4-2.log.pid
p4.ts
prepare-p4.ts
setup-final.err
setup-final.log
setup-final.log.pid
snapshot.ts
types.ts
```

`showcase/browser.html` SHA-256:

```text
Before: 75b071b4f0fae21748f66abe3ce939214a492186e0df14c202c1ab7d95c69d16
After:  2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699
```

Its generated stamp is:

```html
		<meta name="build-id" content="dfe758b71986a10d0c72c5c1b3962ed15923c644b2016e5f924b1163fe24b132" />
```

The other pinned digests remain unchanged:

```text
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f  dist/src/bootstrap/index.css
d28b2580bb0542e89dffc8736e00b8127901bc8b107ca57dca98f19485358799  app/browser/recipe.json
```

Every setup-suite failure is listed here. All are showcase describes owned by U6; there were no non-showcase failures.

| Run | Failing title | Classification and observed failure |
| --- | --- | --- |
| Baseline | specimen readings > reads every Tailwind reading the caption claims under both stylesheet sets | U6 showcase; expected old bare-image/list readings, received `block`/`none` |
| Final | showcase mount > prepares every journey mount at its declared viewport and color mode | U6 showcase; missing accessible name `Bootstrap with Tailwind` |
| Final | pressed readings > reads the stylesheet set and color mode the header buttons announce | U6 showcase; missing accessible name `Bootstrap with Tailwind` |
| Final | applyFace and applyTheme > select a stylesheet set and a color mode through the header buttons | U6 showcase; missing accessible name `Bootstrap with Tailwind` |
| Final | specimen readings > resolves a specimen figure by its caption title and refuses an absent or doubled one | U6 showcase; `Specimen "Collapse stays visible" names 0 figures` |
| Final | specimen readings > reads every Tailwind reading the caption claims under both stylesheet sets | U6 showcase; `Specimen "Bootstrap spacing keeps its scale" names 0 figures` |
| Final | population readings > collects the Bootstrap groups up to the Tailwind group and the contrast subjects | U6 showcase; missing level-2 heading `Bootstrap with Tailwind` |
| Final | statechart tables > censuses controls, detects an occluded pointer route, and parks real hover | U6 showcase; fixed reverse-Tab sequence leaves the skip link outside the reached set |
| Final | statechart tables > retains each failing row name and the error recorded by the harness | U6 showcase; missing accessible name `Bootstrap with Tailwind` |
| Final | statechart tables > drives every stylesheet-set and color-mode row through the header buttons | U6 showcase; transition still names `Bootstrap with Tailwind` |

Full errors are retained in [baseline-setup.err](/home/user/veneer/tmp/units/flip-showcase/baseline-setup.err) and [setup-final.err](/home/user/veneer/tmp/units/flip-showcase/setup-final.err).

No requested gate was skipped. No installs, network operations, commits, or subagents were used.

Final `git status --porcelain`:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/factories.ts
 M app/browser/helpers.ts
 M app/browser/sections/accordion.html
 M app/browser/sections/alerts.html
 M app/browser/sections/badge.html
 M app/browser/sections/breadcrumb.html
 M app/browser/sections/button-group.html
 M app/browser/sections/buttons.html
 M app/browser/sections/card.html
 M app/browser/sections/carousel.html
 M app/browser/sections/checks-radios.html
 M app/browser/sections/clearfix.html
 M app/browser/sections/close-button.html
 M app/browser/sections/collapse.html
 M app/browser/sections/color-background.html
 M app/browser/sections/colored-links.html
 M app/browser/sections/containers.html
 M app/browser/sections/dropdowns.html
 M app/browser/sections/engine-states.html
 M app/browser/sections/figures.html
 M app/browser/sections/floating-labels.html
 M app/browser/sections/focus-ring.html
 M app/browser/sections/form-controls.html
 M app/browser/sections/form-layout.html
 M app/browser/sections/icon-link.html
 M app/browser/sections/images.html
 M app/browser/sections/input-group.html
 M app/browser/sections/interactions.html
 M app/browser/sections/list-group.html
 M app/browser/sections/modal.html
 M app/browser/sections/navbar.html
 M app/browser/sections/navs-tabs.html
 M app/browser/sections/offcanvas.html
 M app/browser/sections/pagination.html
 M app/browser/sections/placeholders.html
 M app/browser/sections/popovers.html
 M app/browser/sections/position-helpers.html
 M app/browser/sections/position-utilities.html
 M app/browser/sections/progress.html
 M app/browser/sections/range.html
 M app/browser/sections/ratio.html
 M app/browser/sections/select.html
 M app/browser/sections/spinners.html
 M app/browser/sections/stacks.html
 M app/browser/sections/stretched-link.html
 M app/browser/sections/tables.html
 M app/browser/sections/tailwindcss.html
 M app/browser/sections/text-truncation.html
 M app/browser/sections/toasts.html
 M app/browser/sections/tooltips.html
 M app/browser/sections/typography.html
 M app/browser/sections/validation.html
 M app/browser/sections/vertical-rule.html
 M app/browser/sections/visibility.html
 M app/browser/sections/visually-hidden.html
 M app/browser/sections/z-index.html
 M app/browser/types.ts
 M showcase/browser.html
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/constants.test.ts
 M tests/app/browser/factories.test.ts
 M tests/app/browser/helpers.test.ts
 M tests/app/browser/sections/integration.test.ts
 M tests/setupBrowser.ts
```

No `flip-probe-3` entries appear in porcelain. Its ignored files under `/home/user/veneer/tmp/probes/flip4/` are **not mine**, were left untouched, and are listed in [foreign-files.txt](/home/user/veneer/tmp/units/flip-showcase/foreign-files.txt).