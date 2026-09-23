# Unit B-FORMS-CLOSE-SPECIMENS (`bfs`) report

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-bfs` (detached at `d02bd46`).
Nothing committed. Deviation state: no stop. One criterion (criterion 2) is red for a reason outside the
unit; see the criterion 2 entry.

## Diff summary

The worktree's `git status --porcelain` output:

```text
 M app/browser/constants.ts
 M tests/app/browser/integration.test.ts
 M tests/app/browser/sections/InputGroupSection.test.ts
 M tests/setup.ts
```

The worktree's `git diff --stat` output:

```text
 app/browser/constants.ts                           | 52 +++++++++++---
 tests/app/browser/integration.test.ts              | 67 ++++++++++++++---
 .../app/browser/sections/InputGroupSection.test.ts | 62 +++++++++++++---
 tests/setup.ts                                     | 83 +++++++++++++---------
 4 files changed, 207 insertions(+), 57 deletions(-)
```

- `app/browser/constants.ts`: `INPUT_GROUP_SPECIMENS` adds `Input group valid tooltip` and
  `Input group invalid tooltip` directly after `Input group validation`. Both entries come from one
  state list. The doc block drops "No specimen renders a validation tooltip" and says that the second group is the
  room the tooltip hangs over and that the overlap is the release's positioning. `INPUT_GROUP_COPY`
  names the tooltip pair. The tooltip clause in the `VALIDATION_SPECIMENS` remark points at the Input
  group section.
- `tests/setup.ts`: `CaptureSubject` adds both names in alphabetical order.
  `CASCADE_KEYS` adds `input-group-valid-tooltip` (`.is-valid ~ .valid-tooltip`, `display`) and
  `input-group-invalid-tooltip` (`.is-invalid ~ .invalid-tooltip`, `display`). The doc block
  describes the population by its rule and names no member. It keeps the blank-frame measurement
  and ties it to the date (2026-09-22) and to the Layout, Table, and Links specimens it was
  taken on. A new paragraph covers a key that paints outside its host's box.
- `tests/app/browser/integration.test.ts`: the rest case is renamed. It reads both tooltip keys as
  `block` in light and dark. On the lifted copy it reads each tooltip's bottom edge against the
  frame's bottom edge, and it reads the hit at a point inside both the tooltip and the following
  group's button. The input-group focus comment now reads the shared-border model. A second comment
  in the rest case that named "role links" now names no member.
- `tests/app/browser/sections/InputGroupSection.test.ts`: the file loads the cascade in `beforeAll`,
  using the `ButtonSection.test.ts` pattern. The test lists both tooltip specimens and counts the
  groups in each specimen. For each tooltip specimen it asserts `.has-validation` on the first
  group, the tooltip as that group's last child, `aria-describedby` equal to the tooltip `id`,
  `readStates` equal to `['described']`, `isRendered(tooltip)`, and a second group that starts with
  a `.btn` and ends with a `.form-control`. The null tooltip query is gone. The unique-name check
  now covers the new controls and buttons.

Decisions recorded under the deviation contract:

- The markup names are `Open handle`, `Claim`, and `Claimed handle` for the valid specimen, and
  `Taken handle`, `Suggest`, and `Suggested handle` for the invalid one. The tooltip ids are
  `open-tooltip-handle-tooltip` and `taken-tooltip-handle-tooltip`.
- The tooltip pair renders last in the section, after `Input group validation`.

## Failing-first evidence

The markup test was written before the markup. The command was
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/InputGroupSection.test.ts`.

- Before the specimens landed: `Tests  1 failed | 1 passed (2)`. The failing test was
  `renders every group specimen through the shared section contract`, which expected both tooltip
  names.
- After: `Tests  2 passed (2)`.

Each new journey reading was reddened with a temporary mutation of the specimen markup. The file
was then restored byte-equal, checked with `cmp` against a saved copy. The command was
`npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-1280 -t "reads every resting cascade key"`.

- Room and stacking: `padding-bottom: 3rem` on the valid tooltip, and `z-index: 6` on the invalid
  specimen's button. Result: `Tests  1 failed | 37 skipped (38)`. The filter assertion listed the
  valid tooltip at `edge: 112.59375 > floor: 76` and the invalid tooltip with the button as its
  `hit`.
- Display: `display: none` on the tooltip. The result was `expected 'none' to be 'block'` at the
  first tooltip display assertion.
- Section visibility: `display: none` on the tooltip, with the `[style]` null check removed from
  the test for this run only and then restored. The result was `expected false to be true` at
  `expect(isRendered(tooltip)).toBe(true)`.

## Acceptance criteria

1. **Pass.** The format, lint, and type checks all exit 0 on the final tree:
   - `npx oxfmt --check app/browser/constants.ts tests/setup.ts tests/app/browser/integration.test.ts tests/app/browser/sections/InputGroupSection.test.ts`
     printed `All matched files use the correct format.` and exited 0.
   - `npm run format:check` printed `All matched files use the correct format.` over 287 files and
     exited 0.
   - `npm run lint:check` exited 0.
   - `npm run check` exited 0.
2. **Red outside this unit's scope.** `npm run test:setup` exits 1 with
   `Tests  7 failed | 212 passed (219)`. Every failure reads a build artifact that does not exist
   in this worktree: `ENOENT ... dist/src/styles/index.css`, `ENOENT ... dist/src/core/index.js`,
   and `The built cascade dist/src/styles/index.css is missing`. `ls dist` reports
   `No such file or directory`. The failing files are `tests/setupService.test.ts`,
   `tests/setupServer.test.ts`, and `tests/setupStyles.test.ts`. None of them reads a file this
   unit touched. I did not run `npm run build`: the permission floor bars a concurrent executor
   from a tree-wide build, and `bft` is live. The file this criterion protects is green:
   `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`
   gave `Tests  21 passed (21)`, so the uniqueness case passes. The Orchestrator's run after a
   build decides this criterion.
3. **Pass.** `npm run test:app` exits 0 with `Test Files  27 passed (27)` and
   `Tests  63 passed (63)`.
4. **Pass.** The specimen shape matches the criterion, as the diff and the section test show. Each
   tooltip specimen is `.input-group.has-validation` containing the `@` addon, then
   `.form-control.is-{state}` with a unique `aria-label` and
   `aria-describedby="{id}-tooltip"`, then `.{state}-tooltip#{id}-tooltip` as the last child. A
   second `.input-group` follows with `.btn` first and `.form-control` second. The markup has no
   inline style.
5. **Pass.** `CaptureSubject`, the registry rows, and the rewritten doc block are in the
   `tests/setup.ts` diff.
6. **Pass.** The rest case title is
   `reads every resting cascade key the same on its lifted frame as in the showcase, in light and dark`.
   The following readings come from every variant's artifact: `edge 68.59375`, `floor 76`,
   `shared true`, and `hit "tooltip"` for both keys in both modes.
7. **Pass.** `npm run test:journey` exits 0 with `Test Files  4 passed (4)` and
   `Tests  152 passed (152)`. The final run was taken after the last edit, with light-390 frames
   on disk. The portfolio-frame case passed as well, so no Standing-conditions exception applied.
   No existing case changed its result.

The stacking reading uses the installed `readHit` export from `@orkestrel/test/browser`, not a
direct `document.elementFromPoint` call. `readHit` hit-tests the centre of the element it is given.
The case passes it the following group's button and asserts that this centre lies strictly inside
the tooltip's box, so the point read is inside both boxes. Declaring a separate
`elementFromPoint` helper would duplicate an installed export, which the brief forbids.

## Observations

- **One-variant capture.** The capture command was
  `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390`.
  It exited 0 with `Tests  38 passed (38)`. The run wrote the following frames:

  | Frame | Size |
  | --- | --- |
  | `input-group-valid-tooltip--light-390.png` | 390 x 76, 4595 bytes, region `{x 0, y 39.59, w 146.34, h 29}`, variation 0.9868 |
  | `input-group-invalid-tooltip--light-390.png` | 390 x 76, 5085 bytes, region `{x 0, y 39.59, w 183.52, h 29}`, variation 0.9904 |

  Each frame shows the validated group, the green or red tooltip below it, and the second group
  under the tooltip. The tooltip covers the second group's button. Each accessibility artifact lists
  `textbox "Open handle" [described]`, `button "Claim"`, and `textbox "Claimed handle"` for the
  valid specimen, and the matching names for the invalid one.
- **Capture location.** The portfolio directory is `tmp/capture/states`, which git ignores. It is
  not `tests/fixtures/portfolio/`, and no frame is tracked in git. The journey runs created
  `tmp/capture/`, which did not exist before, and I left it in place: 584 files, including the
  light-390 frames. It contains no tracked change.
- **Room and stacking values.** Both tooltips measure 29 px tall and start 1.6 px below the first
  group, at y 39.59. They end at y 68.59, 7.4 px above the bottom of the second group at y 76. The
  valid tooltip is 146 px wide and the invalid one 184 px. The button is 66 px or 83 px wide, so its
  centre lies inside the tooltip at 390 and 1280 alike.
- **Other keys' geometry.** I measured every key's copy against its frame. The `form-floating-filled`,
  `form-floating-disabled`, and `form-floating-plaintext` labels extend 6.8 px above the top of their
  frames. So the room reading is limited to the tooltip keys and does not claim every key sits
  inside its frame. No key extends below its frame.
- I did not run the whole `npm test`, because it includes the setup project, which needs `dist/`.

## Unknown: traversal stops

The new controls add no stop to any existing traversal case. All 152 journey tests passed without
edits to any traversal case. The Input group section renders last in the showcase, and the input
group focus case starts from the `Input group addons` control and reaches `Dispatch address` before
the tooltip specimens. The six new stops (a control, a button, and a control in each tooltip
specimen) sit at the end of the document, after every traversal target.

## Guide sentence for § Input group classes

Land this sentence as the last sentence of § Input group classes, after the sentence that describes
the `Input group button` page frame:

```text
The capture journey writes a resting element frame of the `Input group valid tooltip` and `Input group invalid tooltip` specimens, each a validated group whose revealed tooltip hangs over the button-led group the specimen renders beneath it, and reads that each tooltip ends inside its frame and paints over the button it covers, whose `z-index: 2` sits under the tooltip's `z-index: 5`.
```

`npm run test:guides` passes on this tree without the sentence: `Tests  18 passed (18)`. Record
only: the § Tests stem table lacks the two tooltip stems, and that finding is carried by the
existing B-PASSIVE-CLOSE row.

## Weakest claims

- **Criterion 2** is not green in this worktree. My reading that the 7 failures come only from the
  missing `dist/` rests on their error text, not on a post-build run.
- **`readHit` for `elementFromPoint`.** The brief names `document.elementFromPoint`. The case
  reaches it through the installed `readHit` export, at the button's centre. A reviewer who reads
  the criterion literally can call this a deviation.
- **"Names no member".** The `CASCADE_KEYS` doc block still names the grow spinners as the
  specimen it declines. They are not members, so I kept the pointer to `spinner.test.ts`. The
  blank-frame measurement names the Layout, Table, and Links specimens, because that is where it
  was measured, as criterion 5 requires.
- **Tooltip detection.** The rest case finds tooltip keys with
  `copy.matches('.valid-tooltip, .invalid-tooltip')`. A later tooltip key under another class would
  get no room or stacking reading. The exact-keys assertion on the `hung` map fails if either
  current key stops being read, but it does not require a reading for a new key.
- **Section test stylesheet.** `InputGroupSection.test.ts` loads the whole cascade so that
  `isRendered` means something. Every other assertion in that file passed unchanged under the
  cascade.
