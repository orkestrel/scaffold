# PASSIVE-FRAMES (`fp`) report

Unit PASSIVE-FRAMES (`fp`), `opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-fp`
(branch `unit/fp`, baseline `cf5e447`, clean at dispatch). Nothing is committed.

## Result

Every state P14 names has a frame, except the hover faces of the `Light`, `Dark`, `Outline light`,
and `Outline dark` Button hosts. The filename law refuses a stem carrying a theme word, and each of
those subjects' stems is one. That row is stopped and reported under § Deviation. Every other row is
done, every added proof ran red first and reddens on its named mutation, and the capture runs at
`light-1280` and at `dark-390` write every added frame and pass the journey.

## Touched files

- `app/browser/constants.ts`: adds the `Disabled buttons` and `Pressed roles` specimens to the
  `BUTTON_GROUP_SPECIMENS` table, the `Large placeholder` specimen to the `PLACEHOLDER_SPECIMENS`
  table, and the `List group role actions` and `List group role selection` specimens to the
  `LIST_GROUP_SPECIMENS` table, with TSDoc for each. The role list is written once and mapped into
  the roles, role action, and role selection specimens.
- `tests/setup.ts`: adds the subjects to the `CaptureSubject` type, the `grown` member to the
  `CaptureState` type, the resting rows to the `CASCADE_KEYS` table, the driven rows to the
  `DRIVEN_KEYS` table, and the `MODE_TOKEN` constant. Rewrites the `CASCADE_KEYS` TSDoc paragraph
  that declined the grow spinners so it names their `grown` rows.
- `tests/setup.test.ts`: adds the Button role subjects, the `Link` subject, and the grow spinner
  subjects to the driven-row exemption, each group with its reason; adds `MODE_TOKEN` to the export
  list; reads the mode-token law through the `MODE_TOKEN` constant instead of a second copy of the
  pattern.
- `tests/app/browser/integration.test.ts`: adds the role pointer case, the link button case, the
  grow spinner case, and the role action case, after the list-group action case.
- `tests/app/browser/sections/ButtonGroupSection.test.ts`: loads the cascade; adds the disabled
  forms case and the pressed faces case; extends the rendered-name list.
- `tests/app/browser/sections/PlaceholderSection.test.ts`: loads the cascade; adds the step case;
  extends the rendered-name list.
- `tests/app/browser/sections/ListGroupSection.test.ts`: loads the cascade; adds the role rows case;
  extends the rendered-name list.

The diffstat against `cf5e447`, from `git diff --stat`:

```text
 app/browser/constants.ts                           |  74 +++-
 tests/app/browser/integration.test.ts              | 374 +++++++++++++++++++++
 .../browser/sections/ButtonGroupSection.test.ts    | 121 ++++++-
 .../app/browser/sections/ListGroupSection.test.ts  |  86 ++++-
 .../browser/sections/PlaceholderSection.test.ts    |  63 +++-
 tests/setup.test.ts                                |  24 +-
 tests/setup.ts                                     | 104 +++++-
 7 files changed, 825 insertions(+), 21 deletions(-)
```

## Rows

Frames are under `/home/user/veneer-fp/tmp/capture/states/`, named
`<scenario>--<variant>.png`, for the `light-1280` and `dark-390` variants.

**Grow spinners.** The driven rows are `grow-spinner-grown` (subject `Grow spinner`) and
`small-grow-spinner-grown` (subject `Small grow spinner`), under the `grown` state added to the
`CaptureState` type. The journey case "holds each grow spinner at the keyframe that paints its whole
disc and photographs the disc" takes its population from the `SPINNER_SPECIMENS` table. It lifts each
specimen into a padded wrapper, reads the keyframe whose opacity is `1` off the running
`KeyframeEffect` object, pauses the animation at that keyframe's offset, and shoots the frame. It then
reads back `paused`, opacity `1`, and transform `none`, and confirms the showcase spinner is
`running` again after it is put back. No `stageMedia` call wraps these shots, because the
reduced-motion preference changes the duration under a held time.

**Disabled buttons.** The resting row is `disabled-buttons` (selector `.btn:disabled`, property
`opacity`). The specimen renders an enabled host and then one host per form the Button partial dims:
the native attribute, the `disabled` class on a button that is not natively disabled, an anchor
announcing `aria-disabled="true"` without the class, an anchor inside a disabled fieldset, and the
label of a disabled `.btn-check` input. The section case reads the form list off the shipped rule
through the `findRule` function. It asserts that each selector reaches exactly one host, that each
dimmed host resolves the `DISABLED_OPACITY` value and `pointer-events: none`, that the enabled host
resolves `1` and `auto`, and that only the enabled host takes a tab stop. The `.btn-check` form is in
the specimen because the partial writes it and the critic's list names it.

**Hover faces of the filled and outline roles beyond primary.** The driven rows are
`<stem>-hover` for `Secondary`, `Tertiary`, `Success`, `Info`, `Warning`, `Danger`,
`Outline primary`, `Outline secondary`, `Outline tertiary`, `Outline success`, `Outline info`,
`Outline warning`, and `Outline danger`. The journey case "repaints each role beyond the filled
primary under the pointer, photographs each hover the registry names, and holds each on its pressed
twin" takes its population from the `BUTTON_SPECIMENS` table: every single-role host other than the
link and the filled primary. Each host is lifted into a `p-2` wrapper. The case carries the
structural guard before each pointer placement and stages reduced motion around each shot. It reads
back `:hover` and the hovered fill after the shot. It asserts that every hover leaves the rest fill
and that only a mode-token stem goes unframed. It pushes the unframed names to the artifact. The
light and dark roles are driven and read with no frame; see § Deviation.

**Active faces of the filled and outline roles.** The resting row is `pressed-roles` (selector
`.btn.active`, property `background-color`). The specimen renders every single-role class of the
Button table carrying the `active` class and `aria-pressed="true"`, fills and outlines in vertical
groups, light and dark roles included. The `active` class selects the declaration block a held
pointer selects. The role pointer case holds every role host beyond the filled primary and asserts
that its held background, color, and border equal the pressed twin's, so this one frame is the held
face of every role. The section case takes the role population from the cascade's own rules that
retune the `--bs-btn-active-bg` property, and asserts that the specimen renders each role once,
pressed and announced, off its resting fill. The design choice is a specimen row rather than a held
frame per role. The reason is the mode-token law, which would refuse a held frame of the light and
dark roles, while a held frame per role would repeat this frame's paint for the others.

**The `btn-link` hover, focus, and active states.** The driven rows are `link-hover`, `link-focus`,
and `link-active` (subject `Link`). The journey case "drives the link button to hover, to focus, and
to a press on its lifted host, and photographs each state" follows the `nav-underline-focus` pattern.
The host is lifted into a `p-2` wrapper and every frame is shot on the wrapper. The case carries the
structural guard before each pointer placement. Focus is reached by `focus()` followed by an
`ArrowRight` key press. The case asserts `:focus-visible`, a `box-shadow` ring that is not `none`,
and that the ring's reach lies inside the frame on every edge. The case asserts that each placed
scenario is registered. The FOCUS-FRAME evidence about the `auto` outline does not apply here: the
`.btn-link:focus-visible` rule paints through the `focus-ring` mixin, which writes `outline: none`
and a `box-shadow` ring, and the `link-focus--dark-390.png` frame shows the ring.

**List group role action hover and active states.** The resting row is
`list-group-role-actions` (selector `.list-group-item-action.list-group-item-primary`, property
`background-color`). The driven rows are `list-group-role-actions-hover` and
`list-group-role-actions-active`. The journey case "drives every role action to hover and to a
press on the lifted specimen, and photographs a hovered and a pressed role" hovers and presses every
role row and reads each fill. It photographs the hover on the first row and the press on the last
row. It asserts that no other row paints a hover or focus state at either shot, that every role
leaves its rest fill, and that each role's hover fill is its own. Each role's hover and press share
one slot pair (`action-hover-bg` and `action-active-bg` both read the role's `border-subtle` token),
so the frames are one role's hover beside another role's press. The case reads every role and
photographs those two rows.

**List group role active state.** The resting row is `list-group-role-selection` (selector
`.list-group-item-primary.active`, property `background-color`). The specimen renders each role row
carrying the `active` class and `aria-current="true"`. The section case takes the role population
from the cascade's rules that retune the `--bs-list-group-active-bg` property. It asserts one action
row and one selected row per role, in that order, each on its own role. Each selected row paints off
its resting fill, and each action row rests on the resting role fill.

**The `placeholder-lg` step.** The resting row is `large-placeholder` (selector
`.placeholder + .placeholder-lg`, property `min-height`). The specimen sets a default bar and a
`placeholder-lg` bar on the same column, top-aligned, at the `fs-1` size, with its foot padded. The
padding gives the frame guard a floor; the first capture without it refused the frame as blank. The
section case reads both `em` floors off the cascade and asserts that the rendered height ratio equals
the declared ratio, with equal widths and one top edge.

Frame paths for each variant are listed here, with `<variant>` standing for `light-1280` or
`dark-390`:

```text
disabled-buttons--<variant>.png
pressed-roles--<variant>.png
large-placeholder--<variant>.png
list-group-role-actions--<variant>.png
list-group-role-selection--<variant>.png
secondary-hover--<variant>.png          tertiary-hover--<variant>.png
success-hover--<variant>.png            info-hover--<variant>.png
warning-hover--<variant>.png            danger-hover--<variant>.png
outline-primary-hover--<variant>.png    outline-secondary-hover--<variant>.png
outline-tertiary-hover--<variant>.png   outline-success-hover--<variant>.png
outline-info-hover--<variant>.png       outline-warning-hover--<variant>.png
outline-danger-hover--<variant>.png
link-hover--<variant>.png  link-focus--<variant>.png  link-active--<variant>.png
list-group-role-actions-hover--<variant>.png  list-group-role-actions-active--<variant>.png
grow-spinner-grown--<variant>.png  small-grow-spinner-grown--<variant>.png
```

## Failing-first proofs

The section proofs ran red before the specimens existed, with this command:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/PlaceholderSection.test.ts tests/app/browser/sections/ListGroupSection.test.ts
```

- The red run was exit 1, `Tests  7 failed | 7 passed (14)` (`.orkestrel/veneer/units/fp-instruments/fp-red-sections.log.txt`).
- The green run was exit 0, `Tests  14 passed (14)` (`.orkestrel/veneer/units/fp-instruments/fp-green-sections.log.txt`).
- The red cases were "dims each disabled form the button partial writes on a host of its own, beside
  an enabled host", "renders the pressed face of every role the cascade ships, filled and outline, in
  one specimen", "sets the large step beside the default step, as wide and on one top edge, at the
  ratio the two floors declare", and "renders an action row and a selected row for every role the
  cascade ships, each on its own role". The rendered-name cases in each file also ran red, because
  their lists name the added specimens.

The journey proofs ran red before the specimens and the registry rows existed, with this command:

```text
npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project "journey:light-1280*" -t "repaints each role beyond|drives the link button|holds each grow spinner|drives every role action"
```

- The red run was exit 1, `Tests  4 failed | 46 skipped (50)` (`.orkestrel/veneer/units/fp-instruments/fp-red-journey.log.txt`).
- The green run was exit 0, `Tests  4 passed | 46 skipped (50)` (`.orkestrel/veneer/units/fp-instruments/fp-green-journey.log.txt`).

The link case's first red run passed, because a disabled portfolio does not refuse an unregistered
scenario. The case gained a registry assertion before the red run retained here.

## Mutations

The mutation log is `.orkestrel/veneer/units/fp-instruments/fp-mutations.log.txt`, and the driver is `.orkestrel/veneer/units/fp-instruments/fp-mutate.py`.
The driver restores each file byte for byte and records `restored: True`. Each mutation sits in an
owned file and reddens the proof it names, with `Tests  1 failed` and nothing else:

- M1 removes the fieldset's `disabled` attribute and reddens the disabled forms case.
- M2 removes the `active` class from the pressed hosts and reddens the pressed faces case.
- M3 aligns the step pair at `align-items-end` and reddens the step case.
- M4 removes the `active` class from the selected role rows and reddens the role rows case.
- M5 gives the pressed twins the `disabled` attribute and reddens the role pointer case on the
  twin-face assertion.
- M6 drops the `secondary-hover` row from the registry and reddens the role pointer case on the
  mode-token assertion.
- M7 lifts the link into a wrapper with no padding and reddens the link case on the ring-inside
  assertion.
- M8 holds the grow spinner at time `0` and reddens the grow spinner case.
- M9 gives every role action row the primary role and reddens the role action case on the
  distinct-hover assertion.
- M10 drops the `Link` subject from the exemption and reddens the driven-row case of the
  `tests/setup.test.ts` file.
- M11 takes the role press in the fitted layout and reddens the role action case. M11 is the defect
  the first `light-1280` capture showed: a neighbouring row painted its hover in the pressed frame.
  The fix stages the pane before the hold and asserts that no other row paints hover or focus at
  either shot.

## Gates

Every command ran in `/home/user/veneer-fp` with npm 11 on `PATH` and
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. The styles were built first with `npm run build:src`,
which exited 0.

| Command | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check app/browser/constants.ts tests/setup.ts tests/setup.test.ts tests/app/browser/integration.test.ts tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/PlaceholderSection.test.ts tests/app/browser/sections/ListGroupSection.test.ts` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no diagnostic printed |
| `npm run check` | 0 | no diagnostic printed |
| `npm run test:setup` | 0 | `Tests  299 passed (299)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser` over the Button, Button group, Placeholder, Spinner, List group, Card, Badge, Breadcrumb, Close, Pagination, and Progress section proofs and `tests/app/browser/Showcase.test.ts` | 0 | `Tests  38 passed (38)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-1280*"` | 0 | `Tests  50 passed (50)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:dark-390*"` | 0 | `Tests  50 passed (50)` |
| `npm run test:guides`, in a scratch copy of the worktree under `tmp/probe/` with `fp-shared.patch` applied | 0 | `Tests  20 passed (20)` |

The logs for these runs are `fp-format.log.txt`, `fp-lint.log.txt`, `fp-check.log.txt`,
`fp-test-setup.log.txt`, `fp-test-app.log.txt`, `fp-capture-light-1280.log.txt`,
`fp-capture-dark-390.log.txt`, and `fp-test-guides.log.txt`, all under `tmp/units/`. The capture
chain is `.orkestrel/veneer/units/fp-instruments/fp-capture.sh`. The scratch copy was deleted after the run, as were the other
probe directories.

## Shared-file patch

The patch `.orkestrel/veneer/units/fp-shared.patch` targets `guides/veneer.md` and applies to `cf5e447`. It makes
these edits:

- § Collapse classes drops the clause that compared the declined closing panel to the grow
  spinners, because the grow spinners are no longer declined.
- § Showcase rewrites the grow-spinner paragraph to state the `grown` frames and link the showcase
  journeys.
- § Tests adds a paragraph stating the mode-token limit. The `Light`, `Dark`, `Outline light`, and
  `Outline dark` hosts are driven and read with no hover frame. Their pressed faces are photographed
  through the `Pressed roles` specimen.

The § Showcase paragraph sits outside the passive class sections the brief names. It is included
because this unit's change makes the paragraph false.

## Deviation

**Stopped row: the hover faces of the light and dark Button roles.**

- Expected: a hover frame of each filled and outline role beyond primary.
- Found: the `names each scenario for its own subject` and `carries no mode token in a scenario`
  cases of the `tests/setup.test.ts` file together refuse `light-hover`, `dark-hover`,
  `outline-light-hover`, and `outline-dark-hover`. A driven scenario must start with its subject's
  stem, and the stem of each of those subjects carries a theme word the `MODE_TOKEN` pattern
  matches.
- Evidence: the role pointer case drives and reads those four hosts. Its artifact entry
  `role pointer paint` lists them as `unframed`. The case asserts that only mode-token stems go
  unframed, and mutation M6 shows that assertion reddens on a non-mode stem.
- Done: every other hover row, and the active faces of every role including light and dark through
  the `Pressed roles` frame.
- Not done: the four hover frames.
- Hypothesis: a ruling is needed between renaming those Button specimens, which breaks the stem
  pairing with the Bootstrap portfolio, admitting a stated role-word exception to the mode-token
  law, and recording the four faces as unframed.

**Decided within scope.** These choices were recorded and the unit carried on:

- The active faces are shown by one pressed-roles specimen row, bound to the held face by a journey
  assertion, rather than a held frame per role.
- The disabled forms, including the `.btn-check` form, are in one specimen.
- The list-group role frames are the first row's hover and the last row's press, and every role is
  read.
- The placeholder pair sits at the `fs-1` size with a padded foot.
- The specimen labels are `Enabled action`, `Disabled attribute`, `Disabled class`,
  `Disabled anchor`, `Disabled fieldset`, `Disabled check`, `Pressed <role>`, and `<role> action`.
- The added cases sit after the list-group action case.
- The `MODE_TOKEN` constant consolidates the pattern the role case and the registry proof share.

## Observations

- One `npm run test:setup` run timed out at the `records and reads official control state` case of
  the `tests/setupServer.test.ts` file (`Test timed out in 10100ms`). This unit does not touch that
  file. The same command exited 0 on the next run and on every run after it.
- The critic's list also names the `.btn-check + .btn:hover` suppression and the `.btn.show` face.
  The brief's work list names neither, so neither is framed. The critic assigns `.btn.show` to the
  dropdown family's portfolio.
- The frames show readings owned by other rows. The selected `light` role row carries a light label
  on a grey fill (`list-group-role-selection--light-1280.png`), which is the P4 class. The dark link
  ring is faint (`link-focus--dark-390.png`), which is the P2 class.
- The other capture variants, the whole suite, and `npm run test:service` were not run; they are the
  Orchestrator's at landing.

## Review evidence

The review evidence is under `/home/user/veneer-fp/tmp/units/`: `fp.diff`, `fp-status.txt`,
`fp-shared.patch`, `fp-report.md`, and `fp-mutations.log.txt`. The frames are under
`/home/user/veneer-fp/tmp/capture/states/`.
