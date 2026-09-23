# Terrain brief — B-COLLAPSE … B-SCROLLSPY (Cursor Grok, read-only)

Route `grok` on Cursor Grok (`grok-4.7-high`), `--mode=ask`, read-only, rooted at `/home/user/veneer`
(the session branch tip `402c033`; CLOSE-GUIDE has not landed, so `guides/veneer.md`,
`tests/guides.test.ts`, and `tests/src/styles/integration.test.ts` will move after this reading;
cite every site by symbol or heading and give a line only as approximate). Perform the reading
directly and spawn nothing. Capture `git status --porcelain` before and after; any change is a
deviation. Return evidence with `file:line` pointers and no raw file dumps, no decisions, no design,
no edits. Never read `dist/`, `node_modules/bootstrap/dist/`, `tmp/`, or a lockfile. Quote at most
twelve lines per site.

## Question

What does the interactive family B-COLLAPSE … B-SCROLLSPY require, and what does each site say
today? The family owns the keys `collapse`, `collapsing`, `accordion`, `nav`, `navbar`, `dropdown`,
and `scrollspy`, with the Collapse, Dropdown, Tab, and ScrollSpy plugin obligations
(`ROADMAP.md` § The family queue, the **B-COLLAPSE … B-SCROLLSPY** entry). The tree holds Bootstrap
`5.3.8` under `node_modules/bootstrap/` (`grep '"bootstrap"' package.json` →
`"bootstrap": "5.3.8"`). The engine today is `src/browser/{types,constants,helpers,validators,
Button,ColorMode,Delegate}.ts` (`ls src/browser`), and the only `@orkestrel/*` runtime dependency
is `@orkestrel/contract` (`grep '"@orkestrel/' package.json` → `"@orkestrel/contract": "^0.0.17"`
under `dependencies`; `src/browser/validators.ts` and `src/core/errors.ts` import from it).

## Evidence sought

A. **The oracle surface per key.** For each key, the selectors, declarations, custom properties,
   keyframes, and at-rule conditions Bootstrap records: read `node_modules/bootstrap/scss/`
   `_transitions.scss` (the `collapse` and `collapsing` rules), `_accordion.scss`, `_nav.scss`,
   `_navbar.scss`, and `_dropdown.scss`, and report whether any SCSS file carries `scrollspy`.
   Per key: the selector list, the custom-property list (`--bs-accordion-*`, `--bs-nav-*`,
   `--bs-navbar-*`, `--bs-dropdown-*`), every `[data-bs-theme="dark"]` retune, every
   `prefers-reduced-motion` branch, every `/* rtl:` comment, and the `.dropdown-toggle` and
   `.navbar` rules that other partials already carry or defer. Then how the ledger binds a key:
   `ORACLE_BINDINGS`, `LAYER_COMPONENTS`, `FORM_PARTIALS`, and `LEDGER_INVENTORY` in
   `tests/setupServer.ts` (quote the entry shape and one existing entry, and name what a new key
   adds to each), and every guide row under `### Deferred selectors` and `### Departures from the
   workspace rows` whose owner cell reads `Disclosure` or `Navigation` (quote each row).
B. **The plugin obligations.** From `node_modules/bootstrap/js/src/collapse.js`, `dropdown.js`,
   `tab.js`, `scrollspy.js`, and the `base-component.js` and `util/` modules they import: per
   plugin, a table of obligation → `file:line`, covering the data attributes read, the config
   defaults and their types, the public methods, the events fired (name each and mark the
   cancelable pre-change one), the keyboard keys handled, every ARIA attribute written, the focus
   moves, how transition completion is read, what `dropdown.js` takes from Popper (the placement
   options, the modifiers, the auto-close and boundary config), how `scrollspy.js` uses
   `IntersectionObserver` and its `rootMargin` and `threshold` defaults, and what each plugin
   does on `dispose`. Report whether the tree records these obligations anywhere today (grep
   `plugin`, `Collapse`, `Dropdown`, `Tab`, `ScrollSpy`, and `Scrollspy` under `guides/`, `tests/`,
   and `ROADMAP.md`).
C. **The shipped engine pattern.** In `src/browser/`: the `ButtonHooks`, `ButtonEventMap`,
   `ButtonDetail`, `ButtonOptions`, `ButtonInterface`, `DelegateOptions`, `DelegateInterface`,
   `ColorModeOptions`, and `ColorModeInterface` shapes in `types.ts`; `emitEvent` and
   `bindEventMap` in `helpers.ts`; every guard in `validators.ts`; the `Button` and `Delegate`
   classes (construction, options, `destroy`, abort-driven cleanup, restore-on-destroy); the
   `ROADMAP.md` § Rulings paragraph opening "Build every entity on explicit construction" (quote it
   whole); the guide sentences under `## Surface` and `## Methods` that name B-COLLAPSE or say the
   helpers stay Button-shaped (quote them); and the proof pattern in `tests/src/browser/Button.test.ts`
   and `Delegate.test.ts` (the project they run in per `configs/` and `vite.config.ts`, the real-DOM
   setup, how events and hooks are asserted). Name every `@orkestrel/contract` export the engine
   uses and where.
D. **Elements and Mailbox mechanisms.** In `/home/user/elements/src/browser/` and
   `/home/user/mailbox/src/browser/` (each has `composables/`, `factories/`, `inspector/`,
   `helpers.ts`, `types.ts`, and `constants.ts`; Elements also `patterns.ts`, `traversals.ts`,
   `modifiers.ts`, `events.ts`, `taxonomy.ts`): every mechanism for disclosure or collapse,
   menu or dropdown, tabs, scroll tracking or `IntersectionObserver`, placement or anchoring, focus
   management, transition-end reading, and reduced-motion gating (grep `collapse|disclosure|
   dropdown|menu|tab|scrollspy|IntersectionObserver|placement|anchor|focus|transitionend|
   reduced-motion`), each as `file:line` with two lines on what it does and which of lifecycle,
   cancellation, focus, motion, and cleanup it covers. Then the `ROADMAP.md` § Tenets product tenet
   on the engine (the paragraphs opening "Build the interaction engine" and "Keep framework
   integration outside the engine": quote them) and any Elements guide section ruling on the
   appearance or motion of these components (`ls /home/user/elements/guides` and grep the same
   words).
E. **The shipped styles pattern for a key.** One worked example the family copies: the
   `_pagination.scss` partial, its `@use` line in `src/styles/index.scss` (list the whole `@use`
   order), `app/browser/sections/PaginationSection.ts` and its specimen constants in
   `app/browser/constants.ts`, its registration in `app/browser/Showcase.ts`,
   `tests/src/styles/components/pagination.test.ts` and
   `tests/app/browser/sections/PaginationSection.test.ts`, the `CASCADE_KEYS` and `DRIVEN_KEYS`
   rows for pagination in `tests/setup.ts` with the `CaptureSubject` members they need, the frame
   entries in `FRAMES`, the guide `### Pagination classes` section and its `#### pagination` table
   (quote the table header and one row), and the `### Departures` and `### Additions` row shapes.
   Also how a driven state is photographed today: the `driveTraversal` walk, the `Button` active
   or focus scenario if one exists, and whether any registered scenario opens or closes something
   (grep `open`, `expanded`, `show` in `tests/setup.ts`).
F. **The rulings that bind the family.** `ROADMAP.md` § Exit criterion items 3, 4, and 7 (quote);
   every § Carriers row whose text names B-COLLAPSE, Disclosure, Navigation, `navbar`, `dropdown`,
   or Scrollspy (quote each row whole); every § Rulings bullet naming the engine, Popper,
   `IntersectionObserver`, focus, or motion (quote); and every decision in
   `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` that names the engine, an
   interactive component, or Delegate (quote its number and text). Name the `ROADMAP.md` § Standing
   conditions rows a writer of this family will hit.
G. **Sizing.** Line counts of each Bootstrap SCSS and JS source in A and B; line counts of
   `_pagination.scss`, `_button-group.scss`, `PaginationSection.ts`, `ButtonGroupSection.ts`,
   their proofs, and `Button.ts`, `Delegate.ts`, `Button.test.ts`, `Delegate.test.ts` as comparables.
H. **Files the family makes false.** Every enumerating assertion over the shipped keys or the
   engine surface: grep `'pagination'` and `'btn-group'` under `tests/` and `src/styles/index.scss`,
   `Showcase.ts` and its proof, `tests/conformance.test.ts`, the guide `### Files` table and
   `## Showcase` region paragraph, `src/browser/index.ts` and `tests/src/browser/index.test.ts`, and
   the guide `## Surface` and `## Methods` tables; name each file and the assertion. Name
   `tests/setupPolicy.ts` and `tests/policy.test.ts` as vendored and off-limits, and say what each
   reads that a new engine file or guide section would trip (banned terms, TSDoc voice, the
   `{@link}` rule, the fence import rule).

## Output

One distillate with a section per lettered item, each fact with a `file:line` pointer (line
approximate, symbol or heading named), contradictions between the guide, the roadmap, and the code
called out, and a closing list of unresolved inputs. No design, no recommendation, no edits.
