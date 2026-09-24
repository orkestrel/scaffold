# Unit MODAL (`md`) round 2 report

Round 2 carries fixes M1 to M6 from `md-audit-verdict.md` into the round-1 owned files and into a
revised shared patch, `.orkestrel/veneer/units/md-shared-2.patch`, which supersedes `md-shared.patch` whole. Every
gate the criteria name exits 0 on the rebuilt validation copy. Each mutation this round adds reddens
the case it names. The revised patch passes `git apply --check` on a fresh extract of `2a3f223`, and
it differs from the round-1 patch only at the M1 to M6 sites.

This report withdraws the round-1 statement that the fullscreen rule set had to be written twice.
The objective lane and the subjective lane each broke that reason. The shape stays as round 1 wrote
it, because the successor unit RAMP-DOWN collapses the down-walk in the `_modal.scss`,
`_table.scss`, and `_offcanvas.scss` partials.

## Fixes

### M1: the fullscreen specimens carry the direction word

Sites: the `app/browser/constants.ts` file and the `tests/setup.ts` file.

- In the `app/browser/constants.ts` file, the `MODAL_SPECIMENS` constant's derived name reads
  ``name: `Fullscreen modal ${step} down`,`` where it read ``name: `Fullscreen modal ${step}`,``.
- In the `tests/setup.ts` file, the `CaptureSubject` union changes each `'Fullscreen modal sm'` to
  `'xxl'` member to `'Fullscreen modal sm down'` to `'Fullscreen modal xxl down'`.
- In the same file, each matching `CASCADE_KEYS` row's scenario changes from `'fullscreen-modal-sm'`
  … `'fullscreen-modal-xxl'` to `'fullscreen-modal-sm-down'` … `'fullscreen-modal-xxl-down'`, with its
  subject renamed to match.

The proofs name no specimen by a literal string: the section proof and the capture-registry case read
every name from the `MODAL_SPECIMENS` constant and the `CASCADE_KEYS` table. The guide names no ramp
specimen, so the guide has no string to rename.

Proof: the mutation `M1 specimen names without the direction word` restores the old names in the
constants file alone. It reddens `renders every dialog state and class inside a frame through the
shared section contract`, whose registry check pairs each specimen with its `CASCADE_KEYS` row. The
gate `npm run check` also types each row's subject against the renamed `CaptureSubject` union.

### M2: the variable row and the shadow comment

Site: the `modal` variable row in the guide's § Compatibility table.
- Before: "…each one is read beside the property it drives in the
  `tests/src/styles/components/modal.test.ts` proof."
- After: "…each one that a rule applies is read beside the property it drives in the
  `tests/src/styles/components/modal.test.ts` proof; the `--bs-modal-box-shadow` property is declared
  and applied by no rule."

Site: the `src/styles/components/_modal.scss` partial, the comment that precedes the
`breakpoint-up(sm)` block.
- Before: "From the small boundary up the dialog takes a wider margin and a deeper shadow, and it is
  capped at the width its size class names and centered in the modal."
- After: "From the small boundary up the dialog takes a wider margin, and it is capped at the width
  its size class names and centered in the modal."

Proof: `grep -n "box-shadow" src/styles/components/_modal.scss` returns only the variable's
declarations, on the `.modal` rule and on its `(width >= 576px)` twin. No rule applies that
variable, so the row and the comment claim nothing for it.

### M3: the Modal plugin row and the fade-alone sentence

Site: the Modal `plugin` row in the guide's § Compatibility table.

- Before: "Modal: a `[data-bs-toggle="modal"]` trigger opens the dialog it names; …"
- After, as the row reads in the patch:

> Modal: a `[data-bs-dismiss="modal"]` trigger hides the dialog it names, or the `.modal` ancestor it
> sits in; a `[data-bs-toggle="modal"]` trigger toggles the dialog it names, hides any other shown
> dialog first, and returns focus to itself after the dialog hides while the trigger is still
> visible; the `backdrop`, `focus`, and `keyboard` options default to true, and the `backdrop` option
> also takes the `'static'` value; the `toggle`, `show`, `hide`, `handleUpdate`, and `dispose`
> methods; the cancelable `show.bs.modal` and `hide.bs.modal` events, then the `shown.bs.modal` and
> `hidden.bs.modal` events; under the `keyboard` option the `Escape` key hides the dialog unless the
> `hide.bs.modal` event is prevented, and without it the key fires the cancelable
> `hidePrevented.bs.modal` event and bounces the dialog through the `modal-static` class unless that
> event is prevented; a press beside the dialog makes the same bounce under the `'static'` value and
> hides the dialog under a true `backdrop` option; the inline `display` style, the `role` and
> `aria-modal` attributes set on show and removed on hide, and the `aria-hidden` attribute set on
> hide; the `modal-open` class on the body; the `Backdrop` utility adds the backdrop's `show` class,
> and adds its `fade` class only when the modal carries the `fade` class; the `FocusTrap` utility
> holds focus inside the dialog only under the `focus` option; the `ScrollBarHelper` utility locks
> the body's scroll. Owner: J-ENGINE.

Each clause was checked against the worktree's `node_modules/bootstrap/js/src` files:
- **The dismiss trigger:** `enableDismissTrigger(Modal)` in the `modal.js` file, and the
  `getElementFromSelector(this) || this.closest('.modal')` target in the
  `util/component-functions.js` file.
- **The toggle trigger:** the data API calls `data.toggle(this)`, first hides the `.modal.show`
  element it finds, and registers the focus restorer, `if (isVisible(this)) this.focus()`, on the
  `hidden` event.
- **The option defaults:** the `Default` object and the `DefaultType` object.
- **The methods:** the `toggle`, `show`, `hide`, `dispose`, and `handleUpdate` methods.
- **The events:** the `show` and `hide` event constants, each read through its `defaultPrevented`
  field.
- **The `Escape` key:** the `keydown.dismiss` handler calls the `hide` method under the `keyboard`
  option, and otherwise calls the `_triggerBackdropTransition` method. That method returns early when
  the `hidePrevented.bs.modal` event is prevented.
- **A press beside the dialog:** the `click.dismiss` handler takes the same transition for the
  `'static'` value, and calls the `hide` method for a true `backdrop` option.
- **The attributes:** the `_showElement` method sets the attributes, and the `_hideModal` method
  removes them.
- **The body class:** the `CLASS_NAME_OPEN` constant.
- **The backdrop fade:** the `util/backdrop.js` file adds the `fade` class only under its
  `isAnimated` option, which the modal passes as `_isAnimated()`, the modal's own `fade` class.
- **The focus trap:** `if (this._config.focus) this._focustrap.activate()`.

Site: the region paragraph of the guide's `### Modal classes` section.
- Before: "…that backdrop paints nothing, so its frame would be the frame of the dialog without it, and
  the capture registry declines it."
- After: "…that backdrop paints nothing, so it renders the same frame as the dialog alone, and the
  capture registry declines it."

Proof: `npm run test:guides` and `npm run test:conformance` exit 0 on the copy. The conformance
compatibility case reads the rewritten row.

### M4: the stacking paragraph

Site: the paragraph under the stacking table in the guide.
- Before: "Bootstrap declares each rung as a variable on its component's rule; a component Veneer ships
  binds that variable to its rung, and the Alias column names each binding."
- After: "Bootstrap declares each rung except the sticky and fixed levels as a variable on its
  component's rule, and writes those levels as literals in its position helpers; a component Veneer
  ships binds that variable to its rung, and the Alias column names each binding."

Proof: `npm run test:guides` exits 0 on the copy.

### M5: counted and ambiguous forms

The sweep read every line the patch and the owned files add. It matched the `both`, `two`, `twice`,
`several`, `once`, `pair`, and `static dialog` forms, plus the number words. Each match was ruled as
the following list states.

- **The `MODAL_SELECTORS` TSDoc** in the `tests/setupStyles.ts` file:
  - Before: "The release records several of these twice: the modal root and the dialog again from the
    small boundary up, the extra-large size again at each of its two boundaries, and the entrance
    transition again under the reduced-motion query."
  - After: "The release records the modal root and the dialog again from the small boundary up, the
    extra-large size at the large boundary and again at the extra-large one, and the entrance
    transition again under the reduced-motion query; the list carries each name once."
- **The comment that precedes the `beforeAll` hook** in the `ModalSection.test.ts` file:
  - Before: "…so both stylesheets have to be in the document…"
  - After: "…so the published cascade and the shell's stylesheet have to be in the document…"
- **The `MODAL_SPECIMENS` TSDoc** in the `app/browser/constants.ts` file:
  - Before: "because a static dialog traps nothing" and "The size and fullscreen specimens are
    derived from one source list, so the steps cannot drift apart."
  - After: "because a dialog rendered at rest traps nothing" and "The fullscreen specimens are
    derived from one list of breakpoint names, so the steps cannot drift apart."
- **Further sites the sweep found** in the `modal.test.ts` file:
  - "because two properties resolving to one another stay equal" became "because a slot and the
    token it reads stay equal".
  - "changes one of the two readings" became "changes one of those readings".

The sweep kept these matches, each for the reason given:
- The `pair` word in the backdrop comment and the guide sentence names its members, the `fade`
  class and the `show` class.
- The `once each` wording counts no set.
- The specimen sample strings "split across two barges" and "counted twice at the quay" are fixture
  data.

Proof: `npm run test:policy` exits 0 on the copy.

### M6: the dialog markup and the fixture fill

Site: the `tests/src/styles/components/modal.test.ts` file and the `tests/setupStyles.ts` file.
- **The markup constant:** the module-scope `DIALOG` constant leaves the test file. The
  `tests/setupStyles.ts` file exports the same string as the `MODAL_MARKUP` constant, with its own
  TSDoc, beside the modal case tables. The test file imports it, and its fixture cases read
  `${MODAL_MARKUP}` in each template where they read `${DIALOG}`.
- **The export list:** the `tests/setupStyles.test.ts` file adds the `'MODAL_MARKUP'` entry to its
  export-key list.

Site: the `tests/src/styles/fixtures/mixins.scss` file and the `tests/src/styles/mixins.test.ts`
file.
- **The fixture:** before, `@include overlay-backdrop(7, rgb(1, 2, 3), 0.25);`. After,
  `@include overlay-backdrop(7, var(--vn-palette-teal), 0.25);`. A comment names the fill as a
  palette token Veneer retains from Bootstrap.
- **The mixin case:** before, `expect(readStyle(backdrop, 'background-color')).toBe('rgb(1, 2, 3)')`.
  After, `expect(matchesColor(readStyle(backdrop, 'background-color'), readRootToken('--vn-palette-teal'))).toBe(true)`,
  with the `readRootToken` export added to the import.

Proof: every M6 mutation turned red. The retained dropped-declaration runs are the fill declaration
and the placement declaration, and each reddens `paints the backdrop at its stacking level and fill,
transparent while fading and at its opacity when shown`. A fixture passing the black token reddens
the same case, which shows the case reads the teal token's value. The shared markup without its
footer reddens the density, layout, colour, and fullscreen cases that read it.

## Mutation log

`.orkestrel/veneer/units/md-instruments/md-mutations-2.log.txt` is the log that `.orkestrel/veneer/units/md-instruments/md-mutate-2.py` wrote. Each entry
names the site, the command as it ran, the exits, the summary, and every failing case name. The
script ran each mutation on the validation copy and restored the file after it.

| Mutation | Command | Exits | Summary |
| --- | --- | --- | --- |
| `M6 mixin fill declaration dropped` | `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/mixins.test.ts` | build 0, test 1 | `Tests  1 failed \| 10 passed (11)` |
| `M6 mixin placement declaration dropped` | the same command | build 0, test 1 | `Tests  1 failed \| 10 passed (11)` |
| `M6 fixture fill passed as the black token` | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/mixins.test.ts` | test 1 | `Tests  1 failed \| 10 passed (11)` |
| `M6 shared dialog markup without its footer` | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/modal.test.ts` | test 1 | `Tests  10 failed \| 19 passed (29)` |
| `M1 specimen names without the direction word` | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/ModalSection.test.ts` | test 1 | `Tests  1 failed \| 5 passed (6)` |

The failing case names are in the log.

## Gates on the rebuilt validation copy

The copy `tmp/probe/md-base/` was rebuilt from `git archive 2a3f223`, with `node_modules`
hard-linked, the round-1 shared patch applied, the owned files copied over, and the round-2 changes
made. The copy was deleted after the readings. `.orkestrel/veneer/units/md-instruments/md-gates-2.sh` ran the gates, each log is
in `.orkestrel/veneer/units/md-instruments/md-gates-2/`, and the summary is `.orkestrel/veneer/units/md-instruments/md-gates-2.txt`.

| Command, as it ran | Result |
| --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check <every touched file>` | exit 0, `All matched files use the correct format.` |
| `npx oxlint --config .oxlintrc.json --deny-warnings <every touched .ts file>` | exit 0 |
| `npm run build:src` | exit 0 |
| `npm run check` | exit 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/modal.test.ts tests/src/styles/components/close.test.ts tests/src/styles/mixins.test.ts` | exit 0, `Tests  57 passed (57)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/ModalSection.test.ts` | exit 0, `Tests  6 passed (6)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | exit 0, `Tests  5 passed (5)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts tests/setup.test.ts` | exit 0, `Tests  146 passed (146)` |
| `npm run test:conformance` | exit 0, `Tests  22 passed (22)` |
| `npm run test:guides` | exit 0, `Tests  19 passed (19)` |
| `npm run test:policy` | exit 0, `Tests  109 passed \| 1 skipped (110)` |

The file lists in the formatter and linter commands are the copy's changed files, which
`.orkestrel/veneer/units/md-instruments/md-gates-2/oxfmt.log.txt` and `.orkestrel/veneer/units/md-instruments/md-gates-2/oxlint.log.txt` record in full.

In the worktree:
- `npm run format:check` exits 0 (`.orkestrel/veneer/units/md-instruments/md-2-worktree-format.log.txt`).
- `npm run lint:check` exits 0 (`.orkestrel/veneer/units/md-instruments/md-2-worktree-lint.log.txt`).

## The revised patch

The revised patch is `.orkestrel/veneer/units/md-shared-2.patch`, a unified diff against `2a3f223`.
- `git apply --check md-shared-2.patch` exits 0 in a fresh `git archive 2a3f223` extract that holds
  its own `git init` repository. A `git apply` run from inside the worktree's own repository would
  skip the extract's paths.
- Its stat reads `16 files changed, 916 insertions(+), 223 deletions(-)`.
- Applied, it reproduces the validation copy's shared files byte for byte.

A fresh extract with `md-shared.patch` applied, compared against one with `md-shared-2.patch`
applied, gives `.orkestrel/veneer/units/md-instruments/md-shared-interdiff.txt`. The interdiff touches these files:
- `app/browser/constants.ts`: M1 and M5.
- `guides/veneer.md`: M2, M3, and M4.
- `tests/setup.ts`: M1.
- `tests/setupStyles.test.ts`: M6.
- `tests/setupStyles.ts`: M5 and M6.
- `tests/src/styles/fixtures/mixins.scss`: M6.
- `tests/src/styles/mixins.test.ts`: M6.

Read with whitespace collapsed, the guide's interdiff is:
- the fade-alone sentence (M3);
- the stacking paragraph (M4);
- the `modal` variable row (M2);
- the Modal `plugin` row (M3);
- the compatibility table's divider row.

The longer plugin row widens the Obligation column, so the formatter re-pads that table again.
Integration needs a re-format of that table rather than a line merge.

## Review evidence

Files:
- `.orkestrel/veneer/units/md-2.diff`: the worktree diff against `2a3f223`, plus each owned file through
  `git diff --no-index /dev/null`.
- `.orkestrel/veneer/units/md-2-status.txt`: the worktree's status, the owned files alone, all untracked.
- `.orkestrel/veneer/units/md-shared-2.patch`: the revised shared patch.
- `.orkestrel/veneer/units/md-instruments/md-mutations-2.log.txt`: the round-2 mutation log.
- `.orkestrel/veneer/units/md-instruments/md-report-2.md`: this report.

Changes to the owned files:
- `_modal.scss`: the M2 comment.
- `modal.test.ts`:
  - the M5 comments;
  - the M6 import and the removed `DIALOG` constant.
- `ModalSection.test.ts`: the M5 comment.

## Deviation state

Nothing stopped the unit. I settled these choices as the deviation contract allows:
- **The M6 constant's name** is `MODAL_MARKUP`, beside the modal case tables in the
  `tests/setupStyles.ts` file.
- **The M6 fill** is the `--vn-palette-teal` token. No shipped backdrop uses that token, and the black
  token the shipped backdrop paints serves as the mutation that tells the readings apart.
- **The re-flowed paragraphs** are the stacking paragraph and the `MODAL_SELECTORS` TSDoc paragraph.
- **The capture registry's decline paragraph** in the `tests/setup.ts` file keeps its round-1 phrase
  "its frame would be the frame of the dialog without it". M3 names only the guide sentence, and
  criterion 4 limits the patch to the named sites. A carrier can re-word that paragraph.
- **Every instrument, log, and extract this round wrote** is under the worktree's `tmp/units/` (retained under `.orkestrel/veneer/units/md-instruments/`) or
  `tmp/probe/` folders with the `md` prefix. The session scratchpad was only read, for the npm 11
  `PATH` entry.
- **Round-1 files in the session scratchpad:** round 1 left instrument files there. This round
  neither read those files nor removed them.
