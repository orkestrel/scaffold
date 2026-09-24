# OFFCANVAS (`oc`) round 3 report

Round 3 carries O-d, O-e, and O-f from the round-2 audit (`oc-audit-2-verdict.md`), plus the
sweep fixes named in the Sweep section. Every gate the brief names exits 0 on the rebuilt validation
copy, and the `oc-shared-3.patch` file passes `git apply --check` on a fresh extract of `2a3f223`. It
supersedes the `oc-shared-2.patch` file whole.

Against round 2, with whitespace ignored, the shared patch differs at these guide sites alone:

- the Offcanvas `plugin` row (O-d, O-e, and a sweep fix)
- the ramp paragraph (O-e)
- the backdrop sentence (a sweep fix)

The compatibility table's padding also moves, because the row's width changes and the `oxfmt`
formatter re-pads that table. Among the owned files, the `_navbar.scss` comment changes (O-f).

Unit: `opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-oc`, base `2a3f223`. No bench
lane ran, so no journal applies. Every file named here is in `/home/user/veneer-oc/tmp/units/` unless
the path says otherwise.

## Fixes

### O-d: the trigger, dismiss, and Escape clauses as calls with their cancellation

File: `guides/veneer.md`, the Offcanvas `plugin` row (shared).

**The toggle trigger.**

- Before: "a `[data-bs-toggle="offcanvas"]` trigger toggles the panel its `data-bs-target` or `href`
  attribute names unless the trigger is disabled, hides another open panel first, and returns focus to
  the trigger after the panel's `hidden.bs.offcanvas` event while the trigger is visible"
- After: "a `[data-bs-toggle="offcanvas"]` trigger, unless it is disabled, calls the `hide` method of
  another open panel, which that panel's `hide.bs.offcanvas` event can cancel, then calls the `toggle`
  method of the panel its `data-bs-target` or `href` attribute names, and returns focus to itself after
  that panel's `hidden.bs.offcanvas` event while the trigger is still visible"
- Source, in the `offcanvas.js` file:
  - the disabled return at line 239
  - the `EventHandler.one(target, EVENT_HIDDEN, …)` focus return behind the `isVisible(this)` check at
    lines 243–245
  - the `alreadyOpen` lookup and its `hide()` call at lines 251–253
  - the `data.toggle(this)` call at line 257
  - the `hide` method's return on a prevented `hideEvent` at line 135

**The dismiss trigger.**

- Before: "a `[data-bs-dismiss="offcanvas"]` trigger hides its panel"
- After: "a `[data-bs-dismiss="offcanvas"]` trigger, unless it is disabled, calls the `hide` method of
  the panel it names, or of the `.offcanvas` ancestor it sits in"
- Source:
  - the `enableDismissTrigger(Offcanvas)` call at line 274 of the `offcanvas.js` file
  - in the `util/component-functions.js` file, the disabled return at line 21, the
    `getElementFromSelector(this) || this.closest(…)` target at line 25, and the `instance[method]()`
    call at line 29

**The `Escape` key and the backdrop press.**

- Before: "the `hidePrevented.bs.offcanvas` event in place of the `hide.bs.offcanvas` event on a static
  backdrop's click or on the `Escape` key under `keyboard: false`, the `Escape` key hiding the panel
  otherwise"
- After: "under the `keyboard` option the `Escape` key calls the `hide` method, and without it the key
  fires the `hidePrevented.bs.offcanvas` event; a press on the backdrop calls the `hide` method, and
  under the `'static'` value fires the `hidePrevented.bs.offcanvas` event instead"
- Source:
  - the keydown listener's `this._config.keyboard` branch at lines 201–206 of the `offcanvas.js` file
  - the backdrop click callback's `'static'` branch at lines 169–170 of the `offcanvas.js` file
  - the `EVENT_MOUSEDOWN` listener at line 139 of the `util/backdrop.js` file, which makes the backdrop
    input a press rather than a click

**The load and resize clauses.** The sweep found these unconditional as well, so they take the same
call form.

- Before: "the window's `load` event shows each `.offcanvas.show` panel, and its `resize` event hides
  each shown responsive panel whose `position` value is no longer `fixed`"
- After: "the window's `load` event calls the `show` method of each `.offcanvas.show` panel, and its
  `resize` event calls the `hide` method of each shown responsive panel whose computed `position`
  property is no longer the `fixed` value"
- Source: the load handler at lines 260–262 and the resize handler with its `position !== 'fixed'`
  check at lines 266–268 of the `offcanvas.js` file.

Every other clause of the row keeps its content.

### O-e: the bare values take their nouns

- **The plugin row, the `fixed` value.** This is part of the resize clause shown under O-d.
- **The plugin row, the `keyboard: false` setting.** The `Escape` clause shown under O-d reads
  "without it" after naming the `keyboard` option, so the bare setting is gone.
- **The plugin row, the defaults.**
  - Before: "`backdrop: true`, `keyboard: true`, and `scroll: false` defaults, the `backdrop` option
    taking the `'static'` value as well"
  - After: "the `backdrop` and `keyboard` options default to true and the `scroll` option to false, and
    the `backdrop` option also takes the `'static'` value"
  - Source: the `Default` object at lines 50–52 of the `offcanvas.js` file.
- **The ramp paragraph in `### Offcanvas classes`.**
  - Before: "sets the `--bs-offcanvas-height` variable to `auto` and the `--bs-offcanvas-border-width`
    variable to `0` there"
  - After: "sets the `--bs-offcanvas-height` variable to the `auto` value and the
    `--bs-offcanvas-border-width` variable to the `0` value there"
  - The rest of the paragraph re-flows.

### O-f: the navbar partial's comment states what wins

File: `src/styles/components/_navbar.scss` (owned), the comment above the expand walk.

- Before: "The `!important` flags are the release's own, so the expanded content and panel win over the
  hidden state their own classes write."
- After: "The bar's more specific rule unfixes the panel and shows it, and the release's `!important`
  flags on the panel's width, height, border, and transform, and its important visibility declaration,
  win over the placement and hidden rules the offcanvas partial writes. The collapsible content's
  important display declaration wins over the hidden state its collapse class writes."

I checked each clause against the built cascade of the validation copy. The reading is in the
`oc-3-navbar-cascade-reading.txt` file.

- The `.navbar-expand-lg .offcanvas` rule sits under the `(width>=992px)` condition in the components
  layer. It writes `position:static` without the flag, and it flags each of `visibility:visible`,
  `border:0`, `width:auto`, `height:auto`, and `transform:none` as important.
- The `.offcanvas` rule writes `position:fixed` and `visibility:hidden` without the flag, at a lower
  specificity than the bar's rule.
- The `.offcanvas.offcanvas-end` and `.offcanvas.offcanvas-top` rules write the width, height, border,
  and transform at the bar rule's specificity. They sit later in the built file: offset 176914 and
  177095 against offset 126720.
- The `.navbar-expand-lg .navbar-collapse` rule flags `display:flex` as important, over the
  `.collapse:not(.show)` rule's `display:none` declaration.

The comment re-flows and makes no rule change.

## Sweep

I swept every line that rounds 1 and 2 added for another unconditional behaviour clause and for a
bare token.

- **The load and resize clauses** in the plugin row take the call form, as O-d shows.
- **The `Backdrop` utility clause** in the plugin row gains its condition.
  - Before: "the `Backdrop` utility appending the `.offcanvas-backdrop` element to the panel's parent"
  - After: "…to the panel's parent under the `backdrop` option"
  - Source: the `Boolean(this._config.backdrop)` visibility at line 178 of the `offcanvas.js` file,
    and the `isVisible` return at line 66 of the `util/backdrop.js` file.
- **The backdrop sentence in `### Offcanvas classes`** gains the same condition.
  - Before: "The script appends the backdrop to the panel's parent carrying the `fade` class and then
    adds the `show` class."
  - After: "Under the `backdrop` option the script appends the backdrop to the panel's parent carrying
    the `fade` class and then adds the `show` class."
  - The paragraph re-flows.

Every remaining code token at a line end takes its noun on the next line, or ends a list whose noun
follows. The `overlay-backdrop` mixin's comment stays verbatim, as the family verdict fixes it.

## Gates

Each command ran exactly as written here. The `oc-gates-3.log.txt` file carries each command's
verbatim result line and exit code.

The validation copy is `/home/user/veneer-oc/tmp/probe/base`. It was built from `git archive 2a3f223`,
with the `node_modules` directory hard-linked, the owned files copied over it, and the revised patch
applied. I deleted it after the runs.

| Command | Where | Result | Exit |
| --- | --- | --- | --- |
| `npm run format:check` | worktree | All matched files use the correct format. | 0 |
| `npm run lint:check` | worktree | no diagnostic | 0 |
| `npm run format:check` | validation copy | All matched files use the correct format. | 0 |
| `npm run lint:check` | validation copy | no diagnostic | 0 |
| `npm run check` | validation copy | no diagnostic | 0 |
| `npm run build:src` | validation copy | each build `✓ built` | 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/offcanvas.test.ts tests/src/styles/components/close.test.ts tests/src/styles/components/navbar.test.ts` | validation copy | every case passed | 0 |
| `npm run test:conformance` | validation copy | every case passed | 0 |
| `npm run test:guides` | validation copy | every case passed | 0 |
| `npm run test:policy` | validation copy | every case passed apart from the suite's own skipped case | 0 |
| `git apply --check .orkestrel/veneer/units/oc-shared-3.patch` | fresh `git archive 2a3f223` extract at `/home/user/veneer-oc/tmp/probe/oc-fresh-2a3f223` | clean | 0 |

## Evidence files

- `oc-shared-3.patch`: the revised shared patch against `2a3f223`.
- `oc-3-shared-interdiff.txt`: the shared files at round 2 against round 3. It shows the diff with
  whitespace ignored, then the full diff.
- `oc-3.diff`: the worktree against `2a3f223`, with the added files rendered.
- `oc-3-status.txt`: the worktree's `git status --porcelain` output.
- `oc-gates-3.log.txt`
- `oc-3-navbar-cascade-reading.txt`

## Decisions

- **The compatibility table re-pads.** The plugin row's width changes, so the `oxfmt` formatter
  re-pads that table's rows and delimiter. The whitespace-ignored interdiff shows the row alone
  changing in that table. I treated this as the re-flow the deviation contract grants.
- **O-d wording.** The row follows the landed Modal row's calls-and-cancellation form. It keeps the
  events clause, the classes clause, the attributes clause, and the utilities clause as round 2 wrote
  them, apart from the `Backdrop` condition the sweep adds.

No stop condition fired.
