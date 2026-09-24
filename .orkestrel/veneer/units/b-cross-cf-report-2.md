# Unit FADE (the `cf` prefix), round 2 report

Round 2 carries the F-a, F-b, F-c, and F-d items of the `b-cross-cf-brief-2.md` brief, and every
criterion exits 0. The scratch copy carries the `cf-shared-2.patch` file and the unchanged
`cf-offlimits.patch` file. The `cf-shared-2.patch` file replaces the `cf-shared.patch` file whole.
No row needed a cascade change, so the `_fade.scss` partial is unchanged. Nothing was committed or
pushed.

## F-a: the tab pane and the modal

The `FADE_COMPONENT_CASES` table gains these rows in the `tests/setupStyles.ts` module:

```ts
Object.freeze({
	component: 'nav',
	hidden: 'tab-pane fade active',
	shown: 'tab-pane fade active show',
}),
Object.freeze({ component: 'modal', hidden: 'modal fade', shown: 'modal fade show' }),
```

The fade proof's component case iterates the table, so it reads the added rows with no change to
its body. The binding case in the `tests/setupStyles.test.ts` file iterates the table as well. It
holds each class of the added rows to the vocabulary of the row's own key (the `nav` key or the `modal` key) and
of the `transition` key, as it does for the table's other rows. The binding case also checks each
entry's freeze through the entry it iterates, rather than searching the table again for the entry
it holds, which settles the subjective lane's optional note.

These sentences are rewritten, each shown before and after:

- **The § Nav sentence in the `guides/veneer.md` guide.**
  - Before: "A tab pane stays hidden until it carries the `active` class."
  - After: "A tab pane stays hidden until it carries the `active` class, and a pane carrying the
    `fade` class stays transparent until the `show` class joins it."
- **The Tests sentence in § Fade classes.**
  - Before: "…the collapsing rule's transition on an element carrying the fade and collapsing
    classes, the fade on each component the release animates, and every state inside a dark
    island."
  - After: "…the collapsing rule's transition on an element carrying the fade and collapsing
    classes, the fade on the alert, toast, tooltip, popover, tab pane, and modal, and every state
    inside a dark island."
- **The case title in the `fade.test.ts` proof.**
  - Before: "fades each component the release animates, and leaves each shown component its own
    opacity"
  - After: "fades the alert, toast, tooltip, popover, tab pane, and modal, and leaves each shown
    component its own opacity"
- **The case comment in the `fade.test.ts` proof.**
  - Before: "The mutation this catches is the hidden state dropped, which leaves an animated alert
    or popover painting before the engine shows it."
  - After: "The mutation this catches is the hidden state dropped, which leaves an animated alert,
    popover, tab pane, or modal painting at the transparent end of its fade."
- **The table's TSDoc summary.**
  - Before: "Pairs each component an engine fades with the classes it carries at each end of the
    fade, each set carrying the `fade` class."
  - After: "Pairs the alert, the toast, the tooltip, the popover, the tab pane, and the modal with
    the classes each carries at each end of the fade the release's plugin for it runs, each set
    carrying the `fade` class."
- **The table's TSDoc remarks.**
  - Before: "Each hidden set is the one the component carries at the transparent end of the fade
    the release's plugin runs on it. The alert and the popover rest hidden through the fade rule
    alone, the tooltip through its own resting opacity, and the toast through the `showing` class
    the plugin writes for the length of the fade."
  - After: "Each hidden set is the one the component carries at the transparent end of that fade.
    The alert, the popover, the tab pane, and the modal rest transparent through the fade rule
    alone, the tooltip through its own resting opacity, and the toast through the `showing` class
    the plugin writes for the length of the fade. The tab pane's sets carry the `active` class,
    because the Tab plugin adds that class, which displays a pane, ahead of the `show` class, which
    fades the pane in. The backdrop the modal and offcanvas plugins fade answers to a compound rule
    its own component's partial writes, and the modal and offcanvas proofs read it."

The Tab plugin sets the `active` class in its `_activate` method and the `show` class in the
completion callback that method queues. The evidence is the
`node_modules/bootstrap/js/src/tab.js` file, the `_activate` and `_deactivate` methods.

## F-b: the registry remark

The paragraph the unit adds to the `CASCADE_KEYS` TSDoc in the `tests/setup.ts` module is scoped to
the fade key's hidden state.

- Before: "A key whose recorded rule writes the `opacity: 0` declaration at rest names the wrapper
  that reserves the element's box through a `:has()` selector over that element, and reads the
  wrapper's `height` property: the transparent element keeps its box, so a region declared on it
  paints the wrapper's one fill and the frame guard refuses it as a blank, while the wrapper's
  region carries its header and its edges around the reserved empty box. The component's cascade
  proof reads the transparent element itself."
- After: "The fade key's hidden state takes a frame: the reserved empty frame. Its rule writes the
  `opacity: 0` declaration and no other property, so the hidden card body keeps its box inside the
  card that holds it. The `Fade hidden` row therefore names that card through a `:has()` selector
  over the hidden body and reads the card's `height` property: a region declared on the transparent
  body paints the card's one fill, and the frame guard refuses a one-color region as a blank, while
  the card's region carries its header and its edges around the reserved box. What separates it
  from the transparent states this block declines is what its frame shows. The hidden fade state is
  a resting state the release's markup writes, as on every inactive tab pane, and its frame shows
  the box that state reserves inside a card that paints. The grow spinner's resting step, the
  resting tooltip, the toast carrying the `showing` class, and each backdrop carrying the `fade`
  class alone each paint nothing in a frame of their own, so a shot of any of them carries an empty
  surface and no subject. The fade proof reads the transparent body itself."

The paragraph names the grow spinner's resting step as well as the engine moments the audit
named. The same block declines that step for resting at the `opacity: 0` value, so a separator that left it
out would not hold.

## F-c: one term

The `TRANSITION_COPY` constant and the `TRANSITION_SPECIMENS` constant are renamed to the
`FADE_COPY` constant and the `FADE_SPECIMENS` constant in every file that names them:

- the `app/browser/constants.ts` module
- the `app/browser/sections/FadeSection.ts` module
- the `tests/app/browser/sections/FadeSection.test.ts` file
- the `tests/app/browser/index.test.ts` file, with the export list kept in sort order
- the `tests/app/browser/Showcase.test.ts` file
- the `tests/app/browser/integration.test.ts` file

The `grep -rn "TRANSITION_COPY\|TRANSITION_SPECIMENS"` search, run over the `*.ts` and `*.md` files
of the scratch copy, returns no hit on the renamed tree. The `transition` name stays on the inventory
key, the § Compatibility row, and the `#### transition` ledger table. The `TRANSITION_END` token
in the § Compatibility engine row is Bootstrap's own name, so it is not renamed.

## F-d: the failing-first runs

The `.orkestrel/veneer/units/cf-instruments/cf-2-red.sh` script ran the shipped fade proof and the shipped section proof on the
scratch copy with the `@use 'components/fade';` line removed, and ran both proofs again with the
line restored. Its record is the `.orkestrel/veneer/units/cf-instruments/cf-mutations-2.log.txt` file (SHA-256
a512f9c9a9b98156dfc0a6734101b1dfddfd31ddb8b8b29f12b020e2f614fc40).

| Reading | Command | Exit | Result line | Full log |
| --- | --- | --- | --- | --- |
| Fade proof, without the partial | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/fade.test.ts` | 1 | `Tests  8 failed (8)` | the `.orkestrel/veneer/units/cf-instruments/cf-2-nopartial-fade.log.txt` file |
| Section proof, without the partial | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FadeSection.test.ts` | 1 | `Tests  1 failed \| 2 passed (3)` | the `.orkestrel/veneer/units/cf-instruments/cf-2-nopartial-section.log.txt` file |
| Fade proof, with the partial | the fade proof command | 0 | `Tests  8 passed (8)` | the `.orkestrel/veneer/units/cf-instruments/cf-2-partial-fade.log.txt` file |
| Section proof, with the partial | the section proof command | 0 | `Tests  3 passed (3)` | the `.orkestrel/veneer/units/cf-instruments/cf-2-partial-section.log.txt` file |

- **Fade proof, without the partial.** Every shipped case fails, each under its shipped title. The
  failing readings of the component case carry the `nav` row and the `modal` row. Each of those rows
  reads the `["1", "all"]` pair where the `["0", "opacity"]` pair is expected for its hidden set.
  Each reads the `"all"` value where the `"opacity"` value is expected for the transition of its
  shown set. The `cf-mutations-2.log.txt`
  file quotes that diff under its "Red extract" heading.
- **Section proof, without the partial.** The case "renders each body in the state its specimen
  names, inside a card that keeps its box" fails. The contract case and the destruction case pass,
  because neither reads a value the partial writes.

The red readings ran on the scratch copy's `tests/setup.ts` module holding a draft wording of the
F-b paragraph. The module's TSDoc is outside the imports of the fade proof and the section proof, so the readings are the
same for the shipped wording.

## Gates

The `.orkestrel/veneer/units/cf-instruments/cf-2-gates.sh` script ran each gate on the scratch copy in the
`tmp/probe/cf2-copy` directory. That copy was a `git archive 42fd88e` extract with the `cf-shared-2.patch`
file and the `cf-offlimits.patch` file applied, the owned files copied in, a hard-linked
`node_modules` directory, and an empty `.git` directory. The empty directory makes the copy its own
ignore root. The script's record is the `.orkestrel/veneer/units/cf-instruments/cf-2-gates.log.txt` file, and each full log is
a `.orkestrel/veneer/units/cf-instruments/cf-2-gate-<n>.log.txt` file.

| Command | Exit | Result line |
| --- | --- | --- |
| `npm run format:check` | 0 | `Finished in 11391ms on 419 files using 4 threads.` |
| `npm run lint:check` | 0 | none; the `oxlint` linter prints nothing on a clean run |
| `npm run check` | 0 | none; the `tsc` and `vue-tsc` checkers print nothing when clean |
| `npm run build:src` | 0 | `✓ built in 2.43s` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/fade.test.ts` | 0 | `Tests  8 passed (8)` |
| `npm run test:setup` | 0 | `Tests  287 passed (287)` |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FadeSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Tests  8 passed (8)` |
| `npm run test:policy` (observation) | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` (observation) | 0 | `Tests  1288 passed (1288)` |

The `npm run test:setup` command exits 0 with the `cf-offlimits.patch` file applied. That off-limits
patch stays unchanged (SHA-256
7df554a4a78490be32cd0238a3fe77828cd24bf32e810ed77aaaae92e6403aa2).

## Review artifacts

- **The `.orkestrel/veneer/units/cf-2.diff` file** (SHA-256
  23a71534d8a6e1924f1c56c05ba564c50957128142f67d1a4d43d401422a646b) carries the owned files.
  The `git apply --numstat` command reads the following added and deleted lines per file:

  | File | Added | Deleted |
  | --- | --- | --- |
  | the `src/styles/components/_fade.scss` partial | 25 | 0 |
  | the `tests/src/styles/components/fade.test.ts` proof | 218 | 0 |
  | the `app/browser/sections/FadeSection.ts` module | 20 | 0 |
  | the `tests/app/browser/sections/FadeSection.test.ts` proof | 111 | 0 |

  Against the `cf.diff` file, round 2 changes only the component case's comment and title in the
  fade proof and the constant names in the section module and its proof.
- **The `.orkestrel/veneer/units/cf-2-status.txt` file** lists the owned paths as untracked, and nothing else.
- **The `.orkestrel/veneer/units/cf-shared-2.patch` file** (SHA-256
  d272ca9affaf4b4f4d261c64c87c37d931c6b6320b5c7f27f8831ae429556cad) targets the `42fd88e` commit. The
  `git apply --check` command accepts it on the worktree. The `git apply --numstat` command reads
  269 added lines and 29 deleted lines, per file as follows:

  | File | Added | Deleted |
  | --- | --- | --- |
  | the `guides/veneer.md` guide | 90 | 20 |
  | the `tests/setupStyles.test.ts` file | 51 | 0 |
  | the `tests/setupStyles.ts` module | 46 | 0 |
  | the `app/browser/constants.ts` module | 31 | 0 |
  | the `tests/setup.ts` module | 27 | 0 |
  | the `tests/conformance.test.ts` file | 12 | 9 |
  | the `tests/app/browser/Showcase.test.ts` file | 3 | 0 |
  | the `tests/app/browser/index.test.ts` file | 3 | 0 |
  | the `app/browser/Showcase.ts` module | 2 | 0 |
  | the `tests/app/browser/integration.test.ts` file | 2 | 0 |
  | the `app/browser/index.ts` barrel | 1 | 0 |
  | the `src/styles/index.scss` barrel | 1 | 0 |

- **The patch check.** A separate `git archive 42fd88e` extract took the `cf-shared-2.patch` file and
  the `cf-offlimits.patch` file through the `patch -p1` command, with the owned files copied in.
  The `diff -rq` command, excluding the `node_modules`, `dist`, and `.git` directories, found that
  extract byte-identical to the scratch copy the gates ran on.
- **The `.orkestrel/veneer/units/cf-instruments/cf-mutations-2.log.txt` file** holds the F-d readings.
- **Instruments:** the `.orkestrel/veneer/units/cf-instruments/cf-2-red.sh` script, the `.orkestrel/veneer/units/cf-instruments/cf-2-gates.sh` script, and
  the `.orkestrel/veneer/units/cf-instruments/cf-2-guide.py` script, which applied the § Nav and Tests sentence edits. The
  rename, the table rows, the TSDoc edits, and the binding case edit were made directly on the
  scratch copy, and the `cf-shared-2.patch` file records them.

## Observations

- The `tmp/probe/` directory is deleted.
- The report of round 1 stays the record for round 1. This report changes nothing in it.
- The capture frames for the `fade-shown` scenario and the `fade-hidden` scenario remain the
  Orchestrator's reading at landing, as the reconciled verdict rules under claim 4.
