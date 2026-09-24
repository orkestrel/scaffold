# Unit MODAL (`md`) report

The `modal` key ships in the worktree `/home/user/veneer-md` (base `2a3f223`) with its header
combinator, the `overlay-backdrop` mixin, the dialog stack bindings, the Modal region, the mirrored
proofs, the ledger rows, and the guide section. Every gate the criteria name reads green on the
validation copy, and the shared patch applies cleanly to a fresh extract of `2a3f223`. The
Orchestrator's mid-campaign note 1 (`w2-w3-note-1.md`) is applied: its rules are listed under
"Note 1" in this report.

## Touched files

Owned files, written in the worktree (all untracked; `git status --porcelain` is in
`.orkestrel/veneer/units/md-status.txt`):

| File | Summary |
| --- | --- |
| `src/styles/components/_modal.scss` | Every recorded modal rule in the components layer, the `.modal-header .btn-close` combinator included, with the backdrop written through the `overlay-backdrop` mixin and the dialog and backdrop levels bound to the dialog rungs. |
| `tests/src/styles/components/modal.test.ts` | The style proof: the written selectors, the box, the stack, the space slots and density, the content paint in each mode, the header control, the caps, the fullscreen ramp, placement, motion, the static bounce, and the backdrop. |
| `app/browser/sections/ModalSection.ts` | The Modal region section over `MODAL_COPY` and `MODAL_SPECIMENS`. |
| `tests/app/browser/sections/ModalSection.test.ts` | The section proof: the region contract, the frame and classes, the backdrop in `Shown modal` alone, the names and the absent modality, the frame fit at each variant, and destruction. |

Shared files, returned as `.orkestrel/veneer/units/md-shared.patch` (a unified diff against `2a3f223`, appended
to this file after the report):

| File | Summary |
| --- | --- |
| `src/styles/index.scss` | Loads `components/modal` after `components/close`. |
| `src/styles/_mixins.scss` | Appends the `overlay-backdrop` block verbatim as the brief fixes it, after the `utility-variable` mixin. |
| `tests/src/styles/mixins.test.ts` | Adds the backdrop mixin case beside the declaration-mixin cases. |
| `tests/src/styles/fixtures/mixins.scss` | Adds the `.vn-fixture-backdrop` class the mixin case mounts (see "Deviation state"). |
| `tests/setupStyles.ts` | Moves `.modal-header .btn-close` from `CLOSE_DEFERRED` to `CLOSE_SELECTORS`; adds `MODAL_FULLSCREEN_CASES`, `MODAL_SELECTORS`, `MODAL_STACK`, `MODAL_SPACE_CASES`, `MODAL_SIZE_CASES`, and `MODAL_GEOMETRY`. |
| `tests/setupStyles.test.ts` | Adds the modal tables to the import and export lists and a `modal case tables` block binding each table to the inventory by derivation; the close partition case is unchanged. |
| `tests/setup.ts` | Adds the modal `CaptureSubject` members, the resting `CASCADE_KEYS` rows, and the decline paragraph for the backdrop carrying the `fade` class alone; no `DRIVEN_KEYS` row. |
| `tests/app/browser/integration.test.ts` | Adds `MODAL_SPECIMENS` to the import and to the declared-subject population. |
| `tests/app/browser/Showcase.test.ts` | Adds the `Modal` region label and `MODAL_SPECIMENS` after the Accordion entries. |
| `tests/app/browser/index.test.ts` | Adds `MODAL_COPY`, `MODAL_SPECIMENS`, and `ModalSection` to the sorted export list. |
| `tests/conformance.test.ts` | Adds `'modal'` to the `listed` literal and to the order case after `'close'`. |
| `tests/setupServer.test.ts` | Adds `'modal'` to the dash-proof component set. |
| `app/browser/constants.ts` | Adds `MODAL_COPY` and `MODAL_SPECIMENS` after `CLOSE_SPECIMENS`. |
| `app/browser/Showcase.ts` | Imports `ModalSection` and constructs it after `AccordionSection`. |
| `app/browser/index.ts` | Re-exports `ModalSection` after `AccordionSection`. |
| `guides/veneer.md` | The § Files row, the `### Modal classes` section, the `#### modal` ledger table, the `modal` selector and variable rows and the Modal `plugin` row, the deleted `.modal-header .btn-close` deferral row, the stacking Alias cells and paragraph, the § Showcase sentence and paragraph, and the § Tests links. |

Diffstat: the owned files hold 264, 568, 20, and 253 lines (`_modal.scss`, `modal.test.ts`,
`ModalSection.ts`, `ModalSection.test.ts`). `git apply --stat` on the patch reads
`16 files changed, 895 insertions(+), 223 deletions(-)`; of those deletions, the compatibility
table's re-padding accounts for the bulk (see "Deviation state").

Review evidence: `.orkestrel/veneer/units/md.diff` (the worktree diff against `2a3f223` plus each new file through
`git diff --no-index /dev/null`) and `.orkestrel/veneer/units/md-status.txt`.

## Ledger rows the gate measured

The conformance ledger measured these departures on the validation copy before the guide recorded
them (`records every measured value difference in the guide ledger` listed them as unrecorded), and
the `#### modal` table records them verbatim. The gate measured no addition and no
`.modal-header .btn-close` row, because the combinator's declarations equal the release's.

```text
modal | .modal | --bs-modal-zindex | — | 1055 | var(--vn-stack-dialog-base) | tokenized
modal | .modal | --bs-modal-padding | — | 1rem | var(--vn-space-8) | tokenized
modal | .modal | --bs-modal-margin | — | 0.5rem | var(--vn-space-4) | tokenized
modal | .modal | --bs-modal-header-padding-x | — | 1rem | var(--vn-space-8) | tokenized
modal | .modal | --bs-modal-header-padding-y | — | 1rem | var(--vn-space-8) | tokenized
modal | .modal | --bs-modal-header-padding | — | 1rem 1rem | var(--vn-space-8) var(--vn-space-8) | tokenized
modal | .modal | --bs-modal-title-line-height | — | 1.5 | var(--vn-line-body) | tokenized
modal | .modal | --bs-modal-footer-gap | — | 0.5rem | var(--vn-space-4) | tokenized
modal | .modal-backdrop | --bs-backdrop-zindex | — | 1050 | var(--vn-stack-dialog-backdrop) | tokenized
modal | .modal-backdrop | --bs-backdrop-bg | — | #000 | var(--vn-palette-black-base) | tokenized
```

The tokenization of the space and line-height slots follows the landed Dropdown, Card, Alert, and
Carousel rows, where a length that a Veneer space token already resolves reads that token. The
`1.75rem` wide margin, the widths, the `0.3s` duration, and the `0.5` backdrop opacity stay literal.

## Built cascade against the inventory

The built cascade (`dist/src/styles/index.css` on the validation copy) carries every selector the
inventory records under the `modal` key, and no other rule on the modal classes. The
`writes the recorded modal selectors and no other rule on their classes` case reads this in the
browser against `MODAL_SELECTORS`, and the `modal case tables` block binds `MODAL_SELECTORS` to
`oracle.components.modal.selectors` as a set. The conformance presence, ledger, and deferral gates
hold the declarations. The selectors are the following list:

`.modal` (unconditioned and at `(width >= 576px)`), `.modal-dialog` (unconditioned and at
`(width >= 576px)`), `.modal.fade .modal-dialog` (unconditioned and under
`(prefers-reduced-motion: reduce)`), `.modal.show .modal-dialog`, `.modal.modal-static .modal-dialog`,
`.modal-dialog-scrollable`, `.modal-dialog-scrollable .modal-content`,
`.modal-dialog-scrollable .modal-body`, `.modal-dialog-centered`, `.modal-content`,
`.modal-backdrop`, `.modal-backdrop.fade`, `.modal-backdrop.show`, `.modal-header`,
`.modal-header .btn-close`, `.modal-title`, `.modal-body`, `.modal-footer`, `.modal-footer > *`,
`.modal-sm` at `(width >= 576px)`, `.modal-lg` and `.modal-xl` at `(width >= 992px)`, `.modal-xl` at
`(width >= 1200px)`, and `.modal-fullscreen` unconditioned with its `.modal-content`,
`.modal-header`, `.modal-footer`, and `.modal-body` combinators, plus the same rule set for each
`.modal-fullscreen-{sm,md,lg,xl,xxl}-down` class under `(width < 576px)`, `(width < 768px)`,
`(width < 992px)`, `(width < 1200px)`, and `(width < 1400px)`.

## Resting rows and subjects

No `DRIVEN_KEYS` row: the journey drives no modal state.

| Scenario | Subject | Selector | Property |
| --- | --- | --- | --- |
| `shown-modal` | `Shown modal` | `.modal:has(+ .modal-backdrop) .modal-dialog` | `transform` |
| `static-modal` | `Static modal` | `.modal-static .modal-dialog` | `transform` |
| `scrollable-modal` | `Scrollable modal` | `.modal-dialog-scrollable` | `height` |
| `centered-modal` | `Centered modal` | `.modal-dialog-centered` | `min-height` |
| `small-modal` | `Small modal` | `.modal-sm` | `max-width` |
| `large-modal` | `Large modal` | `.modal-lg` | `max-width` |
| `extra-large-modal` | `Extra large modal` | `.modal-xl` | `max-width` |
| `fullscreen-modal` | `Fullscreen modal` | `.modal-fullscreen` | `width` |
| `fullscreen-modal-sm` … `-xxl` | `Fullscreen modal sm` … `xxl` | `.modal-fullscreen-{infix}-down` | `width` |

Each row's selector sits inside the dialog's own modal, so the journey's hanging-key branch
(`box.top >= host.bottom`) does not fire for it. The decline paragraph in `CASCADE_KEYS` records
the backdrop carrying the `fade` class alone. The modal partial reads neither the `showing` class
nor the `hiding` class, so M2 declines nothing else for this key.

## R19 proof matrix

Every selector below is proved in `tests/src/styles/components/modal.test.ts` unless another file is
named. "Specimen" and "Scenario" name the Modal region specimen and the capture row that render it.

| Recorded selector and condition | Case | Distinguishing mutation (logged) | Specimen | Scenario |
| --- | --- | --- | --- | --- |
| every recorded selector, each condition | `writes the recorded modal selectors and no other rule on their classes` | `mixin show block dropped`, `scrollable height dropped`, `static rule dropped`, `combinator on the modal`, `fullscreen gated up` | all | all |
| `.modal` (box, `display: none`) | `hides a modal at rest and lays a shown one over the whole viewport as a scrolling layer` | the display stand-in dropped from the markup (section) | every specimen | every modal row |
| `.modal` `--bs-modal-zindex`, `.modal-backdrop` `--bs-backdrop-zindex` | `stacks the modal and the backdrop on the dialog rungs and follows a wrapper retuning them` | `dialog rung literal`, `backdrop rung literal` | `Shown modal` | `shown-modal` |
| `.modal` space slots | `reads $property from its own token`, `rescales the insets, the dialog margin, and the footer gap with the density factor` | `density literal` | every specimen | every modal row |
| `.modal-dialog`, `.modal-content`, `.modal-header`, `.modal-title`, `.modal-body`, `.modal-footer`, `.modal-footer > *` | `lays the content out as a rounded column of header, body, and footer`; `paints the content, its edge, and its dividers from the body aliases` in light and dark | `literal content colour` | every specimen | every modal row |
| `.modal-header .btn-close` | `fits the header control into the header inset and leaves a control outside the header alone`; `follows a retune of the header inset on the modal` | `combinator on the modal` | every specimen | every modal row |
| `.modal` and `.modal-dialog` at `(width >= 576px)`, `.modal-sm` at `576px`, `.modal-lg` and `.modal-xl` at `992px`, `.modal-xl` at `1200px` | `caps the $name dialog at each boundary its size names`, read through `visitBreakpoint` one pixel below and at each boundary | `sm boundary shifted to md`, `lg boundary shifted to md` | `Shown modal`, `Small modal`, `Large modal`, `Extra large modal` | `shown-modal`, `small-modal`, `large-modal`, `extra-large-modal` |
| `.modal-fullscreen` and combinators (unconditioned) | `fills the viewport with the modal-fullscreen dialog only where its class applies` at each `VIEWPORT_WIDTHS` reading | `fullscreen gated up` (extra rule) | `Fullscreen modal` | `fullscreen-modal` |
| `.modal-fullscreen-{infix}-down` and combinators under `(width < boundary)` | the same case for each `MODAL_FULLSCREEN_CASES` entry, one pixel below and at the boundary | `fullscreen gated up` | `Fullscreen modal sm` … `xxl` | `fullscreen-modal-sm` … `-xxl` |
| `.modal-dialog-centered` | `centers the content of a centered dialog in the modal and leaves a plain dialog at the top` | `centered alignment dropped` | `Centered modal` | `centered-modal` |
| `.modal-dialog-scrollable` and its content and body combinators | `holds a scrollable dialog inside the modal and scrolls its body between a fixed header and footer`; the section's frame-fit case | `scrollable height dropped`; `scrollable body short` (section) | `Scrollable modal` | `scrollable-modal` |
| `.modal.fade .modal-dialog`, its `(prefers-reduced-motion: reduce)` twin, `.modal.show .modal-dialog` | `starts a fading dialog from its entrance offset and settles it when shown, with no motion under the reduced-motion preference` (`stageMedia`, `collectMediaConditions`) | `transition without the mixin` | every specimen | every modal row |
| `.modal.modal-static .modal-dialog` | `scales a static dialog over the settled one` | `static rule dropped` | `Static modal` | `static-modal` |
| `.modal-backdrop`, `.modal-backdrop.fade`, `.modal-backdrop.show` | `covers the viewport in the black token, transparent while fading and at its opacity when shown` | `mixin show block dropped` | `Shown modal` (fade and show); the `fade`-alone backdrop has no frame, reason recorded in `CASCADE_KEYS` | `shown-modal` |
| the `overlay-backdrop` mixin (every declaration) | `tests/src/styles/mixins.test.ts`: `paints the backdrop at its stacking level and fill, transparent while fading and at its opacity when shown` | `mixin declaration dropped`, `mixin show block dropped` | — | — |

Section-proof mutations, each reddening `tests/app/browser/sections/ModalSection.test.ts`: the
display stand-in dropped, the dialog claiming modality, a backdrop in every specimen, the engine's
body class in a specimen, a specimen outside the frame, an unnamed close control, and a short
scrollable body.

## Failing-first and mutation record

The logs are `.orkestrel/veneer/units/md-instruments/md-failfirst.log.txt` and `.orkestrel/veneer/units/md-instruments/md-mutations.log.txt`. Each log entry
names the mutated site, the command, the build and test exits, the summary line, and every failing
case name. The mutations ran on the validation copy, which each run restored.

Failing first:

- Before the partial: with the `@use 'components/modal'` line removed from the copy's barrel,
  `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/modal.test.ts tests/src/styles/components/close.test.ts`
  exited 1 with `Tests  30 failed | 16 passed (46)`: every modal case, plus the close case
  `carries a rule for every shipped close name and none for a deferred combinator` (the moved
  combinator had no rule). After the fix, the styles gate over these two files and the mixin proof
  exits 0 with `Tests  57 passed (57)` (`.orkestrel/veneer/units/md-instruments/md-gates/styles.log.txt`).
- Before the mixin: with the `overlay-backdrop` block removed from the copy's `_mixins.scss` file,
  `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/mixins.test.ts`
  exited 1: the fixture failed to compile, so the file failed to import (`Tests  no tests`). After
  the fix the file passes.
- Before the ledger rows: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project conformance`
  with the compatibility rows present and no `#### modal` table reported the departures quoted
  in "Ledger rows the gate measured" as unrecorded. That run also failed
  `bundles no forbidden runtime into a published JavaScript entry` with `ENOENT` on
  `dist/src/core/index.js`, because the copy had not yet run `npm run build:src`; after that build
  the case passes.
- Early in the unit, the centered case passed against the barrel without the partial, because a
  static block dialog is as tall as its content and so sits centered in it. The case now also
  requires each modal to be as tall as the viewport, and the failing-first run above reddens it.

Mutations (each reddens the named case and no unrelated case; the summaries are the logged ones):

| Mutation | Summary line |
| --- | --- |
| `dialog rung literal` | `Tests  1 failed \| 28 passed (29)` |
| `backdrop rung literal` | `Tests  1 failed \| 28 passed (29)` |
| `mixin show block dropped` | `Tests  3 failed \| 37 passed (40)` |
| `mixin declaration dropped` | `Tests  1 failed \| 10 passed (11)` |
| `lg boundary shifted to md` | `Tests  2 failed \| 27 passed (29)` |
| `sm boundary shifted to md` | `Tests  5 failed \| 24 passed (29)` |
| `fullscreen gated up` | `Tests  6 failed \| 23 passed (29)` |
| `centered alignment dropped` | `Tests  1 failed \| 28 passed (29)` |
| `scrollable height dropped` | `Tests  2 failed \| 27 passed (29)` |
| `transition without the mixin` | `Tests  1 failed \| 28 passed (29)` |
| `static rule dropped` | `Tests  2 failed \| 27 passed (29)` |
| `combinator on the modal` | `Tests  2 failed \| 27 passed (29)` |
| `literal content colour` | `Tests  2 failed \| 27 passed (29)` |
| `density literal` | `Tests  2 failed \| 27 passed (29)` |
| `display stand-in dropped` (section) | `Tests  4 failed \| 2 passed (6)` |
| `dialog claims modality` (section) | `Tests  1 failed \| 5 passed (6)` |
| `backdrop in every specimen` (section) | `Tests  1 failed \| 5 passed (6)` |
| `engine body class in a specimen` (section) | `Tests  1 failed \| 5 passed (6)` |
| `specimen outside the frame` (section) | `Tests  3 failed \| 3 passed (6)` |
| `close control unnamed` (section) | `Tests  1 failed \| 5 passed (6)` |
| `scrollable body short` (section) | `Tests  2 failed \| 4 passed (6)` |

The `writes the recorded modal selectors` case also reddens under the mutations that drop or add a
rule, as it exists to.

## Gates on the validation copy

The copy was `git archive 2a3f223` with `node_modules` hard-linked, the owned files copied over, and
the shared patch applied; it was deleted before this report. Logs are under `.orkestrel/veneer/units/md-instruments/md-gates/`
and the summary is `.orkestrel/veneer/units/md-instruments/md-gates.txt`.

| Gate | Result |
| --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check <every touched file>` | exit 0, `All matched files use the correct format.` |
| `npx oxlint --config .oxlintrc.json --deny-warnings <every touched .ts file>` | exit 0 |
| `npm run build:src` | exit 0 |
| `npm run check` | exit 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/modal.test.ts tests/src/styles/components/close.test.ts tests/src/styles/mixins.test.ts` | exit 0, `Tests  57 passed (57)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ModalSection.test.ts` | exit 0, `Tests  6 passed (6)` |
| the same project over `Showcase.test.ts` and `index.test.ts` | exit 0, `Tests  5 passed (5)` |
| `npm run test:conformance` | exit 0, `Tests  22 passed (22)` |
| `npm run test:guides` | exit 0, `Tests  19 passed (19)` |
| `npm run test:policy` | exit 0, `Tests  109 passed \| 1 skipped (110)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts tests/setupServer.test.ts` | exit 0, `Tests  227 passed (227)` |

In the worktree, `npm run format:check` and `npm run lint:check` exit 0
(`.orkestrel/veneer/units/md-instruments/md-worktree-format.log.txt`, `.orkestrel/veneer/units/md-instruments/md-worktree-lint.log.txt`).

Observations, not criteria:

- `npm run test:app` on the copy exited 0 with `Tests  118 passed (118)` before the note-1
  refactors; after them only the section, Showcase, and index proofs were re-read.
- `npm run test:setup` on the copy under load once failed
  `records and reads official control state and rejects contradicted or absent obligation steps`
  on its 10100 ms timeout; `tests/setupServer.test.ts` alone then passed (`Tests  101 passed (101)`),
  and the final setup reading passed. This is a timing reading for the Orchestrator to re-run.
- The journey, `CAPTURE=1`, `test:service`, and the whole styles project were not run.

Baseline, taken first in the worktree: `npm run test:conformance` exit 0 (`Tests  22 passed (22)`),
and the close proof exit 0 (`Tests  17 passed (17)`).

## Accessibility-tree probe (M15)

A probe mounted a `role="dialog"` element holding a button beside a second button named
`Outside`, with and without `aria-modal="true"`, and resolved the outside button through each of
these readers:

- The installed `resolveAccessible('button', 'Outside')` function resolved the button with the
  `dialog` role alone, and refused it with `aria-modal="true"`:
  `Interactive target "Outside" is not visible and focus-reachable`.
- The Playwright locator `page.getByRole('button', { name: 'Outside' })` found the button, and a
  click reached it, with the attribute and without it. That locator ignores `aria-modal`, so it
  cannot separate those readings.

The section proof keeps the distinguishing reading: `names each dialog by its title and each close
control by its label, and claims no modality` resolves a button outside the region with the
`resolveAccessible` function, sets `aria-modal` on the shown dialog and expects the refusal, then
removes it and resolves the button again.

## Frame-fit reading

A probe mounted the Modal region at the 390 and 1280 variants and measured each specimen against its
`.viewport` frame through the `readClipEdge` function. Every frame is 384px tall and spans the
viewport's width, and its clip edge is its bottom edge. At 390, the default dialog's content runs
from 8px to 191px down the frame with the close control from 343px to 373px across and 24px to 54px
down; the scrollable dialog's content runs from 8px to 376px down with a body scrolling 305px of
content in 238px of room; the centered dialog's content runs from 101px to 284px down. At 1280 every
content box and close control also lies inside its frame. No close control is clipped, so no
specimen stopped the unit. The section proof `fits every dialog and its close control inside the
frame at the %i variant` holds this at each `VIEWPORT_WIDTHS` reading.

## Shared-name reading (M17)

The class names in the built cascade's modal rules are `btn-close`, `fade`, `modal`,
`modal-backdrop`, `modal-body`, `modal-content`, `modal-dialog`, `modal-dialog-centered`,
`modal-dialog-scrollable`, `modal-footer`, `modal-fullscreen` and its `-{infix}-down` classes,
`modal-header`, `modal-lg`, `modal-sm`, `modal-static`, `modal-title`, `modal-xl`, and `show`. None
of them sits on the exclusion line in `tests/setup.css`. A compile through the installed
`@tailwindcss/postcss` plugin, over the theme and the utilities with those names as inline sources
beside the controls `gap-3` and `container`, generated the two controls and none of the modal
names. No shared name appears, so `test:service` stays an observation.

## Guide text

The `### Modal classes` section, as the patch writes it, sits between § Close classes and
§ Carousel classes:

```markdown
The modal key ships whole: the modal and its dialog, the content with its header, title, body, and
footer, the close control the header places, the backdrop, the static bounce, the scrollable and
centered dialogs, the dialog sizes, and the fullscreen classes. Each state is a class set in
markup, and § Compatibility records the plugin that opens a dialog, closes it, and holds focus
inside it as an engine obligation.

No Veneer rule shows a modal. The `.modal` rule hides it, and an engine writes its `display` style
inline when it opens the dialog. An engine also sets the `modal-open` class on the document body
while a dialog is open, and no Veneer rule reads that class.
```

The section continues with the layout and caps, the content paint and insets, the header control,
the backdrop, the stack bindings (the `.modal` rule applies the dialog rung as the modal's `z-index`
property, and the `overlay-backdrop` mixin applies the backdrop rung), the scrollable, centered,
motion, and static paragraphs, the fullscreen classes, the departures, the region paragraph, and the
proof paragraph. The full text is in the patch.

Other guide edits:

- The § Files row reads: "The modal and its dialog, the content with its header, title, body, and
  footer, the header's close placement, the backdrop, the static, scrollable, and centered dialogs,
  the sizes, and the fullscreen classes in the components layer."
- The stacking table's dialog Alias cell reads `--bs-backdrop-zindex`, `--bs-modal-zindex`, and the
  dropdown row's cell reads "`--bs-dropdown-zindex`; no alias on the other rungs". The paragraph
  under the table carries the brief's sentence verbatim.
- The Modal `plugin` row reads: "Modal: a `[data-bs-toggle="modal"]` trigger opens the dialog it
  names; the `backdrop`, `focus`, and `keyboard` options default to true, and the `backdrop` option
  also takes the `'static'` value; the `toggle`, `show`, `hide`, and `handleUpdate` methods; the
  cancelable `show.bs.modal` and `hide.bs.modal` events, then the `shown.bs.modal` and
  `hidden.bs.modal` events, and the `hidePrevented.bs.modal` event where closing is refused; the
  `Escape` key closes the dialog, or adds the `modal-static` class where closing is refused; the
  `role` and `aria-modal` attributes and the inline `display` style on show, and the `aria-hidden`
  attribute on hide; the `modal-open` class on the body; the `Backdrop` utility adds the backdrop's
  `fade` and `show` classes, the `FocusTrap` utility holds focus inside the dialog, and the
  `ScrollBarHelper` utility locks the body's scroll. Owner: J-ENGINE."
- § Showcase names every Modal specimen among the frame users and adds the paragraph declining the
  backdrop carrying the `fade` class alone, with the specimen and cascade proof links; § Tests
  links `ModalSection.test.ts` and `modal.test.ts`.

## Note 1

- **Nouns after code tokens.** The guide section, the TSDoc in `app/browser/constants.ts` and
  `tests/setupStyles.ts`, and the comments in the owned files follow each code token with a noun.
  The `overlay-backdrop` comment block is exempt, because the brief fixes it verbatim, and it keeps
  its bare `$zindex`, `$color`, `fade`, `$opacity`, and `show` tokens.
- **Case populations out of test files.** The section proof derives its populations from
  `MODAL_SPECIMENS`, `MODAL_SELECTORS`, `MODAL_SIZE_CASES`, `MODAL_FULLSCREEN_CASES`, and
  `CASCADE_KEYS`; the style proof's fullscreen cases derive from `MODAL_FULLSCREEN_CASES` and
  `VIEWPORT_WIDTHS`. The literal `Shown modal` name remains once, as the criterion names it.
- **Retained mutation logs.** See "Failing-first and mutation record".
- **State only what a rule applies.** The guide names the rule that applies each variable: the
  `.modal-dialog` rule applies the margin and the cap, the `.modal` rule and the
  `overlay-backdrop` mixin apply the levels, and the insets and the gap name their rules.
  `--bs-modal-box-shadow` is declared and never applied, and the guide claims nothing for it.
- **Binding by derivation.** The `modal case tables` block derives every table value from the
  inventory; the restated `TOKEN_NAMES` comparison on `MODAL_STACK` was removed.

## Deviation state

No stop. These choices were settled within scope and are recorded here:

- **An unlisted file joins the patch.** The mixin case mounts a fixture class, and the fixture
  lives in `tests/src/styles/fixtures/mixins.scss`, which the brief lists neither as shared nor as
  off-limits. The patch carries its `.vn-fixture-backdrop` addition as a shared file.
- **The compatibility table is re-padded.** The Modal `plugin` row, written with a noun after each
  token, is wider than the table's Obligation column, so the formatter re-pads that whole table.
  Integration against a base where TIP, TOAST, or OFFCANVAS also added rows needs a re-format of
  that table rather than a line merge.
- **The fullscreen rules are written twice.** The unsuffixed `.modal-fullscreen` rule set is
  unconditioned, and the named classes walk the `breakpoint-down` mixin, which emits nothing at the
  zero boundary. Sass forwards no content block through `meta.apply`, and a one-caller mixin is
  refused, so the partial writes the rule set for the unsuffixed class and once inside the walk.
- **Specimen names and copy.** The specimens are `Shown modal`, `Static modal`, `Scrollable modal`,
  `Centered modal`, `Small modal`, `Large modal`, `Extra large modal`, `Fullscreen modal`, and
  `Fullscreen modal {infix}`; each dialog's title is its specimen name.

The shared patch follows.

## Shared patch

The exact shared patch is `.orkestrel/veneer/units/md-shared.patch`; the retained copy drops the appended duplicate.
