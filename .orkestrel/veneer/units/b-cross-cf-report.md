# Unit FADE (`cf`) report

The transition key ships: the `_fade.scss` partial writes the `.fade` rule, its reduced-motion
twin, and the `.fade:not(.show)` rule; the `Fade` region renders a shown and a hidden card body;
the guide carries the `### Fade classes` section, the `transition` compatibility row, the
`#### transition` ledger table, and every rewritten sentence. Every brief criterion exits 0 on the
scratch copy with the `cf-shared.patch` file applied.

**Deviation: a stop condition was reached and is not fixed.** The `transition` row in
§ Compatibility makes the case "skips engine and CSS obligations whose Proof cell is a dash" in
the `tests/setupServer.test.ts` file false. That file is off-limits (LEDGER's), so it is not
edited. Evidence: `npm run test:setup` on the scratch copy exits 1 with the result line
`Tests  1 failed | 286 passed (287)`, and the received set carries `"transition"`
(`.orkestrel/veneer/units/cf-instruments/cf-gate-9.log.txt`). The exact fix is `.orkestrel/veneer/units/cf-instruments/cf-offlimits.patch`, which adds
`'transition',` between `'top',` and `'translate-middle',` in that case's set. With it applied on
the scratch copy, `npm run test:setup` exits 0 with `Tests  287 passed (287)`
(`.orkestrel/veneer/units/cf-instruments/cf-setup-offlimits.log.txt`). It applies to the worktree with `git apply --check`.
Hypothesis: the brief's Shared list omitted this enumerating assertion. It is not a criterion of
this brief.

## Orchestrator note

The unit read the PAGE-FRAME note that the Orchestrator sent after dispatch
(`/home/user/scaffold/.orkestrel/veneer/units/pf-design-verdict.md`). The unit complies with it:

- The unit adds no call of the `page` method of the `FrameManager` class.
- The `Fade shown` and `Fade hidden` frames are `CASCADE_KEYS` rows. The journey shoots each one
  through the `place` method over a lifted specimen, as it shoots every resting cascade key.
- No comment the unit wrote states that a frame covers the whole document.
- The `tests/setupBrowser.ts` file is untouched.

## Emitted rules

`npm run build:src` exits 0. The built `dist/src/styles/index.css` file carries these rules in the
components layer, ahead of the `.collapse:not(.show)` rule:

```css
.fade{transition:opacity var(--vn-motion-feedback) linear}@media (prefers-reduced-motion:reduce){.fade{transition:none}}.fade:not(.show){opacity:0}
```

## Touched files

The unit wrote these owned files in the worktree:

- `src/styles/components/_fade.scss`: the `.fade` rule through the `transition` mixin at the
  `opacity var(--vn-motion-feedback) linear` value, and the `.fade:not(.show)` rule.
- `tests/src/styles/components/fade.test.ts`: the browser proof of the partial.
- `app/browser/sections/FadeSection.ts`: the `Fade` region over the `TRANSITION_COPY` and
  `TRANSITION_SPECIMENS` constants.
- `tests/app/browser/sections/FadeSection.test.ts`: the section proof.

The `.orkestrel/veneer/units/cf-shared.patch` file carries these shared edits against `42fd88e`:

- `src/styles/index.scss`: the `@use 'components/fade';` line ahead of the collapse line.
- `tests/conformance.test.ts`: `'transition'` in the `listed` literal; the order case's stem map
  widened to lists, with the `transitions` stem mapped to `['fade', 'collapse']`, and its comment.
- `tests/setupStyles.ts`: the `FADE_SELECTORS` and `FADE_COMPONENT_CASES` tables.
- `tests/setupStyles.test.ts`: the `FADE_SELECTORS` and `FADE_COMPONENT_CASES` names in the export
  list, and a `fade case tables` block that
  binds the selector table to the selectors the inventory records under the `transition` key alone
  and binds each component case's classes to its own key's and the `transition` key's vocabulary.
- `tests/setup.ts`: the `Fade shown` and `Fade hidden` subjects, their `CASCADE_KEYS` rows, and a
  TSDoc paragraph for a key whose rule rests transparent.
- `app/browser/constants.ts`: the `TRANSITION_COPY` and `TRANSITION_SPECIMENS` constants.
- `app/browser/Showcase.ts` and `app/browser/index.ts`: the `FadeSection` class ahead of the
  `CollapseSection` class.
- `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, and
  `tests/app/browser/integration.test.ts`: the region, the exports, and the declared specimen list.
- `guides/veneer.md`: the § Files row, `### Fade classes`, the § Compatibility row, the
  `#### transition` table, the rewritten sentences, the § Showcase paragraph, and the § Tests links.

The `tests/setup.test.ts` file needs no edit: no case there enumerates subjects.

## Diffstat

- Owned (`.orkestrel/veneer/units/cf.diff`, SHA-256 `8f432b40…c1f50f541cd`): `_fade.scss` +25,
  `fade.test.ts` +218, `FadeSection.ts` +20, `FadeSection.test.ts` +111; 374 insertions.
- Shared (`.orkestrel/veneer/units/cf-shared.patch`, SHA-256 `9d6c5862…a8135134`): 251 insertions and 28
  deletions; `guides/veneer.md` +106 with 19 deletions, `tests/setupStyles.test.ts` +52,
  `tests/setupStyles.ts` +36, `app/browser/constants.ts` +31, `tests/conformance.test.ts` +21 with
  9 deletions, `tests/setup.ts` +21, and the app files +1 to +3 each.
- A fresh `git archive 42fd88e` extract with the shared patch applied through `patch -p1` and the
  owned files copied in was byte-identical to the validated scratch copy (`diff -rq`, excluding
  `node_modules`, `dist`, and `.git`).
- `.orkestrel/veneer/units/cf-status.txt`: the owned paths untracked, and nothing else.

## Unknowns

**The ledger key of each compound fade selector.** A probe run through the `attributeSelector`
function on the scratch copy, with `transition` shipped, read (`.orkestrel/veneer/units/cf-instruments/cf-ladder.log.txt`,
instrument `.orkestrel/veneer/units/cf-instruments/cf-ladder.test.ts.txt`):

| Selector                    | Recording keys           | Ledger key   |
| --------------------------- | ------------------------ | ------------ |
| `.fade`                     | `transition`             | `transition` |
| `.fade:not(.show)`          | `transition`             | `transition` |
| `.modal.fade .modal-dialog` | `transition`, `modal`     | `modal`      |
| `.modal-backdrop.fade`      | `transition`, `modal`     | `modal`      |
| `.offcanvas-backdrop.fade`  | `transition`, `offcanvas` | `offcanvas`  |

The exact tier answers the dialog compound (the `modal` class), and the prefix tier answers each
backdrop. The `collectValueGaps` walk skips the compounds under `transition` because the owning
key records them identically, so the gate printed no compound row. This matches X1 and M5.

**The frame convention.** The region reuses the Collapse region's card wrapper, not the shell's
`viewport` frame that the Toast and Modal regions use. The `viewport` frame exists for fixed and
absolute descendants, and the `.fade` rule positions nothing. The card reserves the body's box, so
the hidden frame is the card header over an empty body. The `CASCADE_KEYS` row for `Fade hidden`
reads the `.card:has(> .fade:not(.show))` selector and its `height` property, the
`collapse-hidden` pattern. A region declared on the transparent body paints one color, and the
journey's frame guard refuses a one-color region as a blank.

## Terrain at `42fd88e`

Each fact the brief measured at `a9dff19` holds at `42fd88e`:

- The inventory's `components.transition` entry records the brief's selectors.
- The `transition` mixin writes `transition: none` under the reduced-motion condition.
- The `--vn-motion-feedback` token is `calc(150ms * var(--vn-factor-motion))`.
- The order case mapped the `transitions` stem to `'collapse'`.
- The search `grep -rn -o 'class="[^"]*\bfade\b[^"]*"' app/browser/*.ts` returns the modal
  (`modal fade show`), the modal backdrop, and the offcanvas backdrop (`fade show` each), and the
  distinct `carousel-fade` class. No specimen carries the `fade` class without the `show` class.

## Coverage matrix

This matrix lists each recorded `transition` selector, the partial that writes it, and the cases
that read it. "M" rows refer to the mutation log.

| Recorded selector (condition)                     | Partial         | Proof case in `fade.test.ts`                                                       | Mutation it distinguishes                                                              |
| ------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `.fade` (none)                                    | `_fade.scss`    | declares the transition over the motion token…                                     | M2 duration written as a literal                                                       |
| `.fade` (none)                                    | `_fade.scss`    | rescales the transition with the published motion factor                           | M2 duration written as a literal                                                       |
| `.fade` (none)                                    | `_fade.scss`    | yields the transition to the collapsing rule…                                      | M4 partial loaded after collapse (conformance order case reddens too)                  |
| `.fade` (`prefers-reduced-motion: reduce`)        | `_fade.scss`    | transitions the opacity linearly… under the reduced-motion preference              | M3 reduced-motion twin dropped                                                         |
| `.fade` (`prefers-reduced-motion: reduce`)        | `_fade.scss`    | declares the transition over the motion token…                                     | M3 reduced-motion twin dropped                                                         |
| `.fade:not(.show)` (none)                         | `_fade.scss`    | writes the recorded fade selectors and no other rule…                              | M1 state dropped; M6 added `.fade.show` rule; M8 dark retune                           |
| `.fade:not(.show)` (none)                         | `_fade.scss`    | hides an element carrying the fade class… keeps the hidden box and hit target      | M1 state dropped; M5 bare `.fade` rule; M7 hidden state out of hit testing             |
| `.fade:not(.show)` (none)                         | `_fade.scss`    | fades each component the release animates…                                         | M1 state dropped (alert and popover read opaque)                                       |
| `.fade:not(.show)` (none)                         | `_fade.scss`    | resolves every state the same inside a dark island…                                | M1 state dropped; M8 dark retune                                                       |
| `.modal.fade .modal-dialog` (none and reduced)    | `_modal.scss`   | none here; `modal.test.ts` "starts a fading dialog…", ledger key `modal`           | outside this unit                                                                      |
| `.modal-backdrop.fade` (none)                     | `_modal.scss`   | none here; `modal.test.ts` backdrop case, ledger key `modal`                       | outside this unit                                                                      |
| `.offcanvas-backdrop.fade` (none)                 | `_offcanvas.scss` | none here; `offcanvas.test.ts` backdrop case, ledger key `offcanvas`             | outside this unit                                                                      |

The section proof `FadeSection.test.ts` reddens on S1 (the shown specimen drops the `show` class),
S2 (the hidden specimen gains it), and S3 (the hidden body leaves the flow).

## Failing-first runs

Each added case ran red before the code it proves existed:

- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/fade.test.ts`,
  scratch copy without the partial or its `@use` line: exit 1, `Tests  8 failed (8)`, each case an
  assertion failure (`.orkestrel/veneer/units/cf-instruments/cf-red-fade.log.txt`; repeated with every other edit in place,
  `.orkestrel/veneer/units/cf-instruments/cf-nopartial-fade.log.txt`). The same command with the partial exits 0,
  `Tests  8 passed (8)`.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FadeSection.test.ts`:
  at `42fd88e` with the test file alone, exit 1, the file fails to collect with
  `SyntaxError: The requested module '/app/browser/index.ts' does not provide an export named 'FadeSection'`
  (`.orkestrel/veneer/units/cf-instruments/cf-base-section.log.txt`). With the section and without the partial, exit 1,
  `Tests  1 failed | 2 passed (3)`; the failing case is "renders each body in the state its
  specimen names…" (`.orkestrel/veneer/units/cf-instruments/cf-nopartial-section.log.txt`).
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`
  at `42fd88e` with the patched test file: exit 1, `Tests  3 failed | 139 passed (142)`: the export
  list case and the `fade case tables` cases (`.orkestrel/veneer/units/cf-instruments/cf-base-setupstyles.log.txt`).
- `npm run test:conformance` with the `listed` literal, the stem map, the row, and the table in
  place and without the partial: exit 1, `Tests  3 failed | 19 passed (22)`: the shipped-key case,
  the stale-departure case, and the order case (`.orkestrel/veneer/units/cf-instruments/cf-nopartial-conformance.log.txt`).
  Before the `#### transition` table existed: exit 1, `Tests  1 failed | 21 passed (22)`
  (`.orkestrel/veneer/units/cf-instruments/cf-conformance-1.log.txt`).

## Gates

The `.orkestrel/veneer/units/cf-instruments/cf-gates.sh` script ran each command on the scratch copy with the shared patch
applied. Its record is `.orkestrel/veneer/units/cf-instruments/cf-gates.log.txt`, with each full log in
`.orkestrel/veneer/units/cf-instruments/cf-gate-<n>.log.txt`.

| Command                                                                                                                                                                 | Exit | Result line                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | --------------------------------------------------- |
| `npm run format:check`                                                                                                                                                  | 0    | `Finished in 11068ms on 419 files using 4 threads.` |
| `npm run lint:check`                                                                                                                                                    | 0    | none; oxlint prints nothing on a clean run          |
| `npm run check`                                                                                                                                                         | 0    | none; `tsc` and `vue-tsc` print nothing when clean  |
| `npm run build:src`                                                                                                                                                     | 0    | `✓ built in 2.05s`                                  |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/fade.test.ts`                                          | 0    | `Tests  8 passed (8)`                               |
| `npm run test:conformance`                                                                                                                                              | 0    | `Tests  22 passed (22)`                             |
| `npm run test:guides`                                                                                                                                                   | 0    | `Tests  19 passed (19)`                             |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FadeSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Tests  8 passed (8)` |
| `npm run test:setup` (observation)                                                                                                                                      | 1    | `Tests  1 failed \| 286 passed (287)`: the deviation |
| `npm run test:policy` (observation)                                                                                                                                     | 0    | `Tests  109 passed \| 1 skipped (110)`              |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` (observation)                                                                     | 0    | `Tests  1288 passed (1288)`                         |

These scratch-copy conditions affect how to read the gates:

- The scratch copy sat at `tmp/probe/cf-copy`: a `git archive 42fd88e` extract, a hard-linked
  `node_modules` directory, the shared edits, and the owned files. The copy is deleted.
- Inside the worktree's `tmp/` directory, the worktree's `.gitignore` file excludes every file in
  the copy. `npm run format:check` exits 2 with `Expected at least one target file`
  (`.orkestrel/veneer/units/cf-instruments/cf-format-1.log.txt`). An empty `.git` directory at the copy's root makes the copy
  its own ignore root. After that, `oxfmt` checked 419 files and flagged the unformatted owned tests
  (`.orkestrel/veneer/units/cf-instruments/cf-format-2.log.txt`), and a planted `any` and `debugger` in a copy-only file made
  `npm run lint:check` exit 1 (`.orkestrel/veneer/units/cf-instruments/cf-lint-plant.log.txt`). So the formatter and the linter
  each can fail on the copy. The plant is removed.
- The owned files were formatted with `oxfmt` scoped to those files alone.

## Mutation log

The `.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt` file (SHA-256 `95dafe13…c9ddc4e`) records each run's site,
diff, command, build and test exits, summary, and failing cases. The instruments are
`.orkestrel/veneer/units/cf-instruments/cf-mutations.sh` and `.orkestrel/veneer/units/cf-instruments/cf-mutations-2.sh`. Each mutated file was restored from
its saved original, and the control runs are green.

| Mutation                                   | Site                                    | Test exit | Summary                                   | Failing cases                                                                                   |
| ------------------------------------------ | --------------------------------------- | --------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------- |
| M1 the `:not(.show)` state dropped         | `_fade.scss`, the hidden-state rule     | 1         | `Tests  5 failed \| 3 passed (8)`         | selectors; declarations; hides…; fades each component…; dark island                             |
| M2 the duration written as a literal       | `_fade.scss`, the `.fade` rule          | 1         | `Tests  2 failed \| 6 passed (8)`         | declarations; rescales with the motion factor                                                   |
| M3 the reduced-motion twin dropped         | `_fade.scss`, the `.fade` rule          | 1         | `Tests  2 failed \| 6 passed (8)`         | declarations; transitions… under the reduced-motion preference                                  |
| M4 the partial loaded after collapse       | `index.scss`, the `@use` lines          | 1         | `Tests  1 failed \| 7 passed (8)`         | yields the transition to the collapsing rule…; `test:conformance` exit 1, the order case        |
| M5 the hidden state as a bare `.fade` rule | `_fade.scss`, the hidden-state rule     | 1         | `Tests  5 failed \| 3 passed (8)`         | selectors; declarations; hides…; fades each component…; dark island                             |
| M6 an added `.fade.show` rule              | `_fade.scss`                            | 1         | `Tests  1 failed \| 7 passed (8)`         | selectors                                                                                       |
| M7 the hidden state out of hit testing     | `_fade.scss`, the hidden-state rule     | 1         | `Tests  1 failed \| 7 passed (8)`         | hides… keeps the hidden box and hit target                                                      |
| M8 a dark retune of the hidden state       | `_fade.scss`                            | 1         | `Tests  2 failed \| 6 passed (8)`         | selectors; dark island                                                                          |
| S1 shown specimen drops `show`             | `constants.ts`, `Fade shown`            | 1         | `Tests  2 failed \| 1 passed (3)`         | shared section contract; each body in the state its specimen names                              |
| S2 hidden specimen gains `show`            | `constants.ts`, `Fade hidden`           | 1         | `Tests  2 failed \| 1 passed (3)`         | shared section contract; each body in the state its specimen names                              |
| S3 hidden body leaves the flow (`d-none`)  | `constants.ts`, `Fade hidden`           | 1         | `Tests  1 failed \| 2 passed (3)`         | each body in the state its specimen names                                                       |
| Controls                                   | none                                    | 0         | `Tests  8 passed (8)`, `Tests  3 passed (3)` | none                                                                                         |

M1 to M4 are the mutations the brief names; M5 to M8 and S1 to S3 are the ones the case comments
name.

## Ledger rows

The gate printed this row before the table existed (`.orkestrel/veneer/units/cf-instruments/cf-conformance-1.log.txt`, case
"records every measured value difference in the guide ledger"):

```text
transition | .fade | transition | — | opacity 0.15s linear | opacity var(--vn-motion-feedback) linear | tokenized
```

The `#### transition` table records it, placed ahead of `#### dropdown`, where the landed tables
follow the release's passive order. The additions gates printed no row, and the presence scan
passed with `transition` shipped.

## Sentence search and rewrites

The search `grep -n -i "fade" guides/veneer.md` at `42fd88e` covered the whole guide. Each hit
that stated or implied that no Veneer rule reads the `fade` class is rewritten:

- § Alert classes. Before: "No showcase specimen carries the `fade` class or the `show` class, and
  every alert rule paints the same without them." After: "No alert rule reads the `fade` class or
  the `show` class, and no showcase specimen carries either. The `.fade` rule that § Fade classes
  describes holds an alert carrying the `fade` class transparent until the `show` class joins it,
  so the plugin's dismissal, which removes the `show` class, fades the alert out before it removes
  the alert."
- § Toast classes. Before: "The engine also sets the `fade` class, which no Veneer rule reads."
  After: "The engine also sets the `fade` class when the toast is animated, and the `.fade` rule
  that § Fade classes describes transitions the toast's opacity, so the toast fades out as it
  gains the `showing` class and fades in as it loses it."
- § Tooltip classes. Before: "No tooltip rule reads the `fade` class the plugin sets on an
  animated tip." After: "No tooltip rule reads the `fade` class the plugin sets on an animated tip;
  the `.fade` rule that § Fade classes describes transitions the tip's opacity, so an animated tip
  fades between its transparent rest and the opacity the `show` class gives it."
- § Popover classes. Before: "…sets the `show` class, and the `fade` class when the popover is
  animated, and no popover rule reads either; that behavior is the engine's, and § Compatibility
  records it." After: "…sets the `show` class, and the `fade` class when the popover is animated.
  No popover rule reads either class; the `.fade` rule that § Fade classes describes holds an
  animated popover transparent until the `show` class joins it and fades it in and out. Setting
  the classes is the engine's behavior, and § Compatibility records it."
- § Outside the ledger, the Elements decision. Before: "The popover key ships no motion, because
  no popover rule the release records reads the `fade` class or the `show` class, so that asymmetry
  is recorded as an Elements decision for its owners: J-ENGINE opens and closes a popover, and
  CROSS-FADE ships the `.fade` rule." After: "The popover key ships no motion of its own: no
  popover rule the release records reads the `fade` class or the `show` class, and the `.fade` rule
  that § Fade classes describes fades an animated popover in and out alike. That asymmetry is
  recorded as an Elements decision for its owner, J-ENGINE, which opens and closes a popover."

The "fades each component the release animates…" case executes the alert, toast, tooltip, and
popover claims. These hits stay true and are left unchanged:

- § Popover classes: the region renders no `fade` class or `show` class.
- § Modal classes and § Offcanvas classes: the backdrop and dialog compounds.
- § Showcase: the declined backdrop frames.
- The § Surface and § Methods rows about the engine's fade.
- The floating label's text fade.
- Every `carousel-fade` hit.
- The engine rows in § Compatibility.

## Ancillary decisions

- The hidden specimen's body carries the `aria-hidden="true"` attribute. The hidden state leaves
  text in the accessible tree, and invisible text that is read out is an accessibility defect in
  the showcase. The guide and the specimen TSDoc state the reason.
- The specimens are `Fade shown` and `Fade hidden`, each a `card-body` element carrying the fade
  classes under a `card-header` element. The region sits ahead of the Collapse region, which is the
  release order.
- `FADE_COMPONENT_CASES` pairs the alert, toast, tooltip, and popover with the class sets at each
  end of their fade. It sits in the `tests/setupStyles.ts` module, per note 1's case-population
  rule.
- The fade proof's selector filter keeps selectors whose classes are the `fade` class and the
  `show` class alone. The compounds that the modal and offcanvas partials write fall outside it.

## Observations

- These comments stay literally true and are outside this unit's scope: the comment in
  `tests/src/styles/components/popover.test.ts` ("No popover rule reads the `fade` class…"), the
  `ALERT_SPECIMENS` and `POPOVER_SPECIMENS` TSDoc in `app/browser/constants.ts`, and the comments
  in the `AlertSection`, `ToastSection`, and `PopoverSection` tests. Each speaks of that key's
  rules, and none claims that no Veneer rule reads the `fade` class.
- The whole styles suite (`Tests  1288 passed (1288)`) shows that no landed proof reddens with
  `.fade` shipped. The modal proof's fading dialog and the mixin fixture's backdrop still read
  their recorded values.
- The `tests/app/browser/integration.test.ts` edit, `npm run test:service`, the journey, and
  `CAPTURE=1` were not run; the brief names them as the Orchestrator's runs. The Tailwind
  shared-name question for the `fade` class was not measured.
- The `tmp/probe/` directory is deleted. Retained instruments: `cf-gates.sh`, `cf-mutations.sh`,
  `cf-mutations-2.sh`, `cf-guide.py` to `cf-guide-4.py` (the guide edits after the table rows),
  and `cf-ladder.test.ts.txt`. The `index.scss`, `conformance.test.ts`, `setupStyles*`,
  `setup.ts`, and app-file edits were made directly on the copy, and `cf-shared.patch` is their
  record.
- Nothing was committed, installed, or written outside the worktree's `tmp/units/`, the owned
  files, and the deleted `tmp/probe/` copy.
