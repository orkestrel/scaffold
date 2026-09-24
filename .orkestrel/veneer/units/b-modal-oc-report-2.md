# OFFCANVAS (`oc`) round 2 report

Round 2 carries every fix the round-1 audit ruled (`oc-audit-verdict.md`, O-a to O-c). Every gate
the brief names exits 0 on the rebuilt validation copy, and `oc-shared-2.patch` passes
`git apply --check` on a fresh extract of `2a3f223`. The patch supersedes `oc-shared.patch` whole.
Ignoring whitespace, it differs from `oc-shared.patch` only at the O-a to O-c sites. The whitespace
difference is the compatibility table's padding: the rewritten Offcanvas `plugin` row is wider than
the table's column, so the `oxfmt` formatter re-pads that table (see Decisions).

Unit: `opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-oc`, base `2a3f223`. No bench
lane ran, so no journal applies. Every file named here is in `/home/user/veneer-oc/tmp/units/`
unless the path says otherwise.

## Fixes

### O-a: the priority case says what it compares

File: the `tests/conformance.test.ts` file (shared, in the patch).

- Before: `it('carries the priority the release writes on every declaration both sheets make, and adds none', () => {`
- After: `it("compares each sheet's set of priorities for every selector and property both sheets declare", () => {`

The case body and its comment are as round 1 wrote them. Reading: the `inline-panel-fill-flag-dropped-priority`
run in the `oc-mutations-2.log.txt` log reddens the retitled case, and the gate run in the
`oc-gates-2.log.txt` log passes it. The condition-keyed comparison is the LEDGER unit's.

### O-b: the section failing-first run, the transition-state runs, and the probe control

**The section failing-first run keeps every export and collects every case.** The
`section-failing-first-specimens-emptied` run empties the `OFFCANVAS_SPECIMENS` table and removes
the `Navbar with offcanvas` entry from the `NAVBAR_SPECIMENS` table in the `app/browser/constants.ts`
file. Every export stays, so the import graph stays whole. The run collects every Offcanvas and Navbar
section case. These cases fail:

- `renders a shown panel at each edge and a shown responsive panel at each breakpoint through the shared section contract`
- `renders each panel shown inside its own frame, with the placement or breakpoint its name states`
- `renders one backdrop, beside the start panel inside its frame and beneath it`
- `announces each panel as a dialog named by its title with no modal state, and names each close control`
- `renders every navbar form and every state set in markup through the shared section contract`

The destruction cases pass, as they read no specimen. With the patch, the same command exits 0.

The frame case and the dialog case passed over an empty table in round 1, so each now requires a
specimen. In the `tests/app/browser/sections/OffcanvasSection.test.ts` file:

- Before, the frame case:
  `for (const { name } of OFFCANVAS_SPECIMENS) {`
- After, the frame case:
  ```ts
  // An empty specimen table would pass every reading this walk takes, so the walk first
  // requires a specimen to read.
  expect(OFFCANVAS_SPECIMENS).not.toStrictEqual([])
  for (const { name } of OFFCANVAS_SPECIMENS) {
  ```
- Before, the dialog case: `expect(panels).toHaveLength(OFFCANVAS_SPECIMENS.length)`
- After, the dialog case: `expect(panels).not.toStrictEqual([])` and then that line

**The engine's transition-state rules each have a run of their own.**

- `showing-rule-dropped` removes the `&.showing` selector from the transform key and the visibility key in the `$nested` map.
  It fails `paints a panel carrying "'showing'" when the state shows it and keeps the slide while the
  state leaves it` and `writes the recorded offcanvas selectors and no other rule on their classes`.
- `hiding-rule-dropped` removes the `&.hiding` selector from the visibility key. It fails
  `paints a panel carrying "'hiding'" when the state shows it and keeps the slide while the state
  leaves it` and the written-selectors case.

The R19 matrix row for the `.offcanvas.showing` and `.offcanvas.hiding` selectors therefore reads:

| Recorded selector | Condition | Case | Distinguishing mutation | Specimen | Scenario |
| --- | --- | --- | --- | --- | --- |
| `.offcanvas.showing` | none | the `showing` state case; the written-selectors case | `showing-rule-dropped` | none: the engine writes it | no frame; the registry declines it |
| `.offcanvas.hiding` | none | the `hiding` state case; the written-selectors case | `hiding-rule-dropped` | none: the engine writes it | no frame; the registry declines it |

The round-1 matrix's other rows stand.

**The cascade probe has a negative control.** The `oc-cascade-probe-2.cjs.txt` instrument reads its
stylesheet path from its arguments, and it exits 1 on a missing or an extra site. Its log,
`oc-cascade-2.log.txt`, records these runs:

- Over the built cascade: no missing site, no extra site, exit 0.
- Over a copy whose bare `.offcanvas.offcanvas-top` rule is renamed: it reports
  `.offcanvas.offcanvas-top` missing and the renamed site extra, exit 1.
- Over a copy with a planted `.offcanvas.oc-planted` rule: it reports the planted site extra, exit 1.

### O-c: the plugin row, the navbar paragraph, the stacking bound, the breakpoint term, the utility reading, and the comments

**The plugin row is checked against the release source.** I checked each clause of the
Offcanvas `plugin` row against the `node_modules/bootstrap/js/src/offcanvas.js` file at the worktree.
The row keeps the Carousel and Alert rows' form and ends "Owner: J-ENGINE."

- Before: `Offcanvas: a [data-bs-toggle="offcanvas"] trigger toggles its panel; the backdrop, keyboard, and scroll options; …; the cancelable show and hide events, then the shown, hidden, and hidePrevented events; Escape key hiding; …`
- After:

  > Offcanvas: a `[data-bs-toggle="offcanvas"]` trigger toggles the panel its `data-bs-target` or
  > `href` attribute names unless the trigger is disabled, hides another open panel first, and
  > returns focus to the trigger after the panel's `hidden.bs.offcanvas` event while the trigger is
  > visible; a `[data-bs-dismiss="offcanvas"]` trigger hides its panel; the window's `load` event
  > shows each `.offcanvas.show` panel, and its `resize` event hides each shown responsive panel
  > whose `position` value is no longer `fixed`; `backdrop: true`, `keyboard: true`, and
  > `scroll: false` defaults, the `backdrop` option taking the `'static'` value as well; the
  > `toggle`, `show`, `hide`, and `dispose` methods; the cancelable `show.bs.offcanvas` and
  > `hide.bs.offcanvas` events, then the `shown.bs.offcanvas` and `hidden.bs.offcanvas` events after
  > the panel's transition ends; the `hidePrevented.bs.offcanvas` event in place of the
  > `hide.bs.offcanvas` event on a static backdrop's click or on the `Escape` key under
  > `keyboard: false`, the `Escape` key hiding the panel otherwise; the `showing` class while the
  > panel slides in and the `hiding` class while it slides out; the `aria-modal` and
  > `role="dialog"` attributes while the panel is shown, and a blur on hide; the `Backdrop` utility
  > appending the `.offcanvas-backdrop` element to the panel's parent, the `FocusTrap` utility unless
  > the `scroll` option is set without a backdrop, and the `ScrollBarHelper` utility unless the
  > `scroll` option is set. Owner: J-ENGINE.

The source each clause rests on:

- The `Default` object: the defaults.
- The data-api click handler: the disabled check, the `alreadyOpen` hide, and the
  `EventHandler.one(target, EVENT_HIDDEN)` focus return behind the `isVisible` check.
- The `enableDismissTrigger(Offcanvas)` call: the dismiss trigger.
- The `EVENT_LOAD_DATA_API` handler over the `OPEN_SELECTOR` constant: the panels shown on load.
- The `EVENT_RESIZE` handler over `[aria-modal][class*=show][class*=offcanvas-]` and its `position`
  check: the panels hidden on resize.
- The `_initializeBackDrop` click callback and the `EVENT_KEYDOWN_DISMISS` listener: the
  `hidePrevented.bs.offcanvas` event.
- The `_queueCallback(…, true)` calls: the events after the transition ends.
- The `_initializeFocusTrap` method, the `!this._config.scroll || this._config.backdrop` check, and
  the `ScrollBarHelper` calls: the utilities.

**The navbar paragraph credits the rule that does the work.** In `### Navbar classes`:

- Before: "…the release's `!important` flags on its size, visibility, fill, border, and transform win
  over the fixed, hidden, and sliding state the panel's own classes write, although the offcanvas
  partial loads after this one."
- After: "The expanded bar also turns an offcanvas panel into part of its row. The bar's rule for the
  panel is more specific than the panel's own `.offcanvas` rule, so it unfixes the panel and shows it,
  grows it into the row, and drops its header. The offcanvas partial writes its placement rules later
  at the same specificity as the bar's rule, and the release's `!important` flags on the panel's
  width, height, border, and transform win over them."

Reading: in the `oc-mutations-2.log.txt` log, the `navbar-expanded-width-flag-dropped` run reddens
the expanded-navbar cases in the offcanvas proof. Round 1's `oc-mutations.log.txt` log carries the
transform-flag and border-flag runs.

**The stacking sentence is bounded.**

- Before: "…and the panel stays over its backdrop."
- After: "…and the panel stays over its backdrop while the retuned `--vn-stack-drawer-base` token
  stays above the `--vn-stack-drawer-backdrop` token."

**The large breakpoint takes one term: "the `lg` breakpoint".** These sites said "the large step" or
"the large breakpoint":

- the Navbar paragraph in `### Navbar classes`
- the `NAVBAR_SPECIMENS` comment in the `app/browser/constants.ts` file
- the comments in the `tests/app/browser/sections/NavbarSection.test.ts` file

The same comment in the section proof also says "the region's only panel" in place of "the region's
one panel".

**The utility sentence states what ships.** The `oc-utility-reading-2.log.txt` log holds the
reading, and `oc-utility-probe-2.test.ts.txt` is the instrument. The probe loads each stylesheet into
a frame 991 and 992 pixels wide over an `.offcanvas-lg.offcanvas-end` panel and its body. Each carries
a background utility with the `!important` flag, in the utilities layer or outside every layer:

- Veneer at 992: the panel and its body read `rgba(0, 0, 0, 0)` under either utility.
- Veneer at 991: the fixed panel reads the utility's colour.
- The release at 992: the utility paints the panel (`rgb(1, 2, 3)`, `rgb(4, 5, 6)`, and the release's
  own `.bg-primary` utility's `rgb(13, 110, 253)`), and the body reads `rgba(0, 0, 0, 0)`.
- The release at 991: the utility paints the panel and the body.

Veneer ships no background utility, so each reading uses a consumer's.

The guide and the partial state what ships:

- Before (guide): "The release marks the panel's clear fill and the body's clear fill important, so
  a background utility on either does not paint the inline panel."
- After (guide): "The panel's clear fill and the body's clear fill carry the release's `!important`
  flag."
- The guide adds a departure bullet to `### Offcanvas classes`: "**An important background utility
  does not paint the inline panel.**" The bullet gives the layer reason, the release's contrary
  behaviour, the fixed panel painted in Veneer and in the release alike, the body held clear in each,
  and "The ledger records no row for this difference: the declarations are equal, and the cascade
  layer decides."
- The proof paragraph adds "an important background utility over the inline and the fixed
  `.offcanvas-lg` panel".
- The ramp comment in the `src/styles/components/_offcanvas.scss` file now reads: "The panel's and the
  body's transparent fills carry the release's `!important` flag, and in this layer that flag also
  holds the inline panel clear under an important background utility, where the release's later
  utility paints it."

The ledger gate prints no row and no category for this difference. The departures gate compares
declaration values, and the values are equal. `npm run test:conformance` exits 0 with no ledger row
added.

The utility behaviour has an executed proof. The `tests/src/styles/components/offcanvas.test.ts`
file adds the case `keeps the inline lg panel clear under an important background utility and lets it
paint the fixed panel`. The case loads a layered and an unlayered important utility, and reads the
panel through the `visitBreakpoint` helper at 991 and 992 pixels. The `inline-panel-fill-flag-dropped`
run, which removes the flag from the inline panel's fill, reddens this case alone.

**The offcanvas proof's comments take their nouns and articles.**

- "The `repeats no partial's written declaration block` case in `tests/setupStyles.test.ts` catches"
  becomes "…case in the `tests/setupStyles.test.ts` file catches".
- "the priority case in `tests/conformance.test.ts` file holds every flag the release writes" becomes
  "the priority case in the `tests/conformance.test.ts` file compares the flags each sheet writes".

**The navbar partial's stale comment is replaced.** In the `src/styles/components/_navbar.scss` file:

- Before: "The offcanvas rules turn a panel into part of the row, and ship ahead of the panel's own
  partial."
- After: "The offcanvas rules turn a panel into part of the row; the offcanvas partial writes the
  panel itself."

That comment's next sentence re-wraps and is otherwise unchanged. No rule changes.

**The sweep.** I swept every line added in the owned files and in the patch for a code token without
its noun, for a dropped article, and for the banned terms. Each remaining token that ends a line
takes its noun on the next line, or ends a list whose noun follows. The `overlay-backdrop` mixin's
comment stays verbatim as the family verdict fixes it.

## Gates on the rebuilt validation copy

The copy was `tmp/probe/base`: `git archive 2a3f223`, the `node_modules` directory hard-linked, the
owned files copied over it, and the revised patch applied. I deleted it before this report. The
`oc-gates-2.log.txt` log carries each command as it ran and its verbatim result line. Every run
reported no failed case.

| Command | Result | Exit |
| --- | --- | --- |
| `npm run format:check` (worktree) | All matched files use the correct format. | 0 |
| `npm run lint:check` (worktree) | no diagnostic | 0 |
| `npm run format:check` | All matched files use the correct format. | 0 |
| `npm run lint:check` | no diagnostic | 0 |
| `npm run check` | no diagnostic | 0 |
| `npm run build:src` | each build `✓ built` | 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | every case passed | 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/close.test.ts tests/src/styles/components/navbar.test.ts` | every case passed | 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/OffcanvasSection.test.ts tests/app/browser/sections/NavbarSection.test.ts` | every case passed | 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | every case passed | 0 |
| `npm run test:conformance` | every case passed | 0 |
| `npm run test:guides` | every case passed | 0 |
| `npm run test:policy` | every case passed apart from the suite's own skipped case | 0 |
| `git apply --check oc-shared-2.patch` on a fresh extract of `2a3f223` | clean | 0 |

`npm run test:setup` as a whole, the journey, `CAPTURE=1`, `test:service`, and the whole styles
project are yours at landing.

## Mutation log

The `oc-mutations-2.log.txt` log records each run with the mutated site, the command, the build
exit, the test exit, the summary, and the failing case names. The instrument is
`oc-mutate-2.py.txt`. Each run mutates the validation copy, runs `npm run build:src:styles`, runs the
command, and restores the copy. Every run exits 1:

- Runs O-b adds: `section-failing-first-specimens-emptied`, `showing-rule-dropped`, and
  `hiding-rule-dropped`.
- Runs for the cases this round adds or edits:
  - the new utility case: `inline-panel-fill-flag-dropped`
  - the retitled priority case: `inline-panel-fill-flag-dropped-priority`
  - the guarded frame and dialog section cases: `app-panel-without-show`,
    `app-responsive-frame-dropped`, and `app-aria-modal-added`
  - the offcanvas proof cases whose comments changed: `backdrop-without-mixin-no-states` and
    `navbar-expanded-width-flag-dropped`

## Evidence files

- `oc-shared-2.patch`: the revised shared patch against `2a3f223`.
- `oc-2.diff`: the worktree diff against `2a3f223`, with the new files rendered.
- `oc-2-status.txt`: the worktree's `git status --porcelain` at hand-back.
- `oc-2-guide-changes-ignoring-whitespace.txt`: the guide's changes against round 1 with whitespace
  ignored, which isolates the O-c sites from the table's padding.
- `oc-gates-2.log.txt`, `oc-mutations-2.log.txt`, `oc-cascade-2.log.txt`, and
  `oc-utility-reading-2.log.txt`.
- The instruments `oc-mutate-2.py.txt`, `oc-cascade-probe-2.cjs.txt`, and
  `oc-utility-probe-2.test.ts.txt`.

Round 1's files in the same folder are unchanged.

## Decisions

- **The compatibility table is re-padded.** The Offcanvas `plugin` row carries every clause the brief
  lists, and at that length it is wider than the table's column. The `oxfmt` formatter then re-pads
  every row of the table, and the `format:check` gate requires that padding. I treated this like
  re-flowing a paragraph the fix touches. With whitespace ignored, the guide's changes are the O-c
  sites alone (see `oc-2-guide-changes-ignoring-whitespace.txt`). At integration, the sibling units
  that add rows to the same table need the formatter re-run after their rows land.
- **The re-flowed paragraphs** are the `### Navbar classes` paragraph that names the offcanvas bar,
  the ramp and departure paragraphs of `### Offcanvas classes`, its proof paragraph, and the navbar
  partial's comment.
- **The report states results in words.** Round 1's audit read the result tallies in the report as
  counts. So the table says "every case passed", and the `oc-gates-2.log.txt` log carries each
  verbatim result line.
- **Out of scope, left as written:** in the navbar partial's comment, the sentence after the replaced
  one says the `!important` flags make "the expanded content and panel win over the hidden state
  their own classes write". For the panel, the bar's more specific rule is what beats the hidden
  state. The brief replaces the stale sentence alone, so that sentence stands for a later unit.

No stop condition fired.
