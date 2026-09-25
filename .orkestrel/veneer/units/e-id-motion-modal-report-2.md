# E-ID-MOTION-MODAL round 2: report

`opus` on Opus 5.5, native Claude subagent, sole writer in `/home/user/veneer-mmod` over Veneer
`73326c7` with round 1 uncommitted. Brief: `e-id-motion-modal-brief-2.md`. Every Evidence reading
matched the tree before the first edit. Every gate in Acceptance exits 0, and every plant fails with
an `AssertionError` and restores byte-identically. Deviation state: none. The ancillary choices are
listed at the end.

## Items

**Item 1, claim 7 (a).** The backdrop paragraph in § Modal classes.
- Before: "…and writes the fade's transition on the `.modal-backdrop.fade` compound through the
  `transition` mixin, so the offcanvas backdrop takes the same motion and neither backdrop moves under
  the reduced-motion preference."
- After: "…and writes the fade's transition on the backdrop's `.fade` compound through the
  `transition` mixin, so the backdrop runs no transition under the reduced-motion preference. The
  offcanvas backdrop includes the same mixin, so it takes the same motion and runs no transition under
  that preference either."

**Item 2, claim 7 (b).** Same paragraph. Dropped the appositive.
- Before: "…on the `--vn-ease-out` curve, the host's own timing, in place of the `.fade` rule's
  feedback duration…"
- After: "…on the `--vn-ease-out` curve in place of the `.fade` rule's feedback duration…"

**Item 3, claim 7 (c).** The dialog paragraph.
- Before: "scales the dialog to a `1.02` factor on the same transition"
- After: "grows the dialog to a `1.02` scale on the same transition"

**Item 4, claim 7 (d).** The dialog paragraph.
- Before: "because the barrel loads the modal partial after the fade partial at one specificity"
- After: "because the two rules tie on specificity in the `components` layer and the barrel loads the
  modal partial after the fade partial"

**Item 5, R1.** The dialog paragraph, plus the two comments that made the same claim.
- Guide before: "A modal without the `fade` class holds its opacity, so no transition runs on it."
- Guide after: "On a modal without the `fade` class, an engine writes no opacity, so no transition
  runs as the engine shows or hides that modal."
- `src/styles/components/_modal.scss` comment on the `.modal` rule. Before: "A modal without that
  class holds its opacity, so the transition runs on no other modal." After: "On a modal without that
  class, an engine writes no opacity, so no transition runs as the engine shows or hides that modal."
- `modal.test.ts` comment above the host case's plain-modal control. Before: "A modal without the
  `fade` class holds its opacity, so the host's transition runs on none." After: "A modal without the
  `fade` class holds its opacity as the `show` class joins, so no transition runs on it." This now
  states what that control drives.

**Item 6, claim 7 (e), and the wraps.**
- The offcanvas Reason cell in § Tokens › § Additions (the `.offcanvas-backdrop.fade { transition }`
  row). Before: "…fades the backdrop on the panel timing the modal host fades on, in place of…" After:
  "…fades the backdrop over the `--vn-motion-panel` duration on the `--vn-ease-out` curve, in place
  of…". The cell is padded to its column width.
- The `overlay-backdrop` comment in `src/styles/_mixins.scss`. Before: "…over the panel duration on
  the ease-out curve, the timing the modal host fades on, in place of…" After: "…over the
  `--vn-motion-panel` duration on the `--vn-ease-out` curve in place of…"
- Re-wrapped at 100 columns with no word changes: the offcanvas paragraph under `## Engine` (the
  sentence "Under reduced motion the cascade writes `transition: none` on both…"), and the
  `offcanvas.test.ts` proof paragraph in § Offcanvas classes. The `## Engine` hunk changes only the
  wrap of its last two lines. The engine session owns that section.

**Item 7, F2 and F3, and the comment clause.**
- Offcanvas backdrop case title. Before: "fades the backdrop in over the panel duration on the ease-out
  curve, rescaled by the motion factor and still under the reduced-motion preference". After: "fades
  the backdrop in over the panel duration on the ease-out curve, doubles it at a doubled motion
  factor, and runs none at a zero factor or under the reduced-motion preference".
- Reshaped readings. Each condition pushes one named reading, and the filters go into a collection
  of their own:

  ```ts
  readings.push({
  	hidden,
  	duration: sample?.duration,
  	easing: sample?.easing,
  	midpoint: sample?.midpoint,
  	settled: readStyle(backdrop, 'opacity'),
  })
  filters.push([readStyle(backdrop, 'backdrop-filter'), readStyle(backdrop, 'filter')])
  ```

  The assertions check the hidden and settled opacity as `['0', opacity]` for every condition, which
  also pins that every condition produced a reading. At rest, the duration and easing equal
  `[panel, curve]` and the midpoint lies between half the shown opacity and the shown opacity. At the
  doubled factor, the easing equals `curve` and the duration divided by `panel` is `2`. At the zero
  factor and under reduced motion, the duration, easing, and midpoint are
  `[undefined, undefined, undefined]`. Every condition reads its filters as `['none', 'none']`. The
  reduced-motion media condition on `.offcanvas-backdrop.fade` is unchanged. The hidden opacity is no
  longer used as a stand-in value.
- `modal.test.ts` entrance-case comment. Before: "…a literal duration or curve disagrees with the
  panel tokens resolved on a specimen, a second reading that could disagree with it." After: "…a
  literal duration or curve disagrees with the panel duration and curve a specimen resolves from the
  tokens apart from the dialog's rule."

**Item 8, R2.**
- The entrance case, for both its entering and its leaving sample, and the bounce case now take the
  sample, run `expect(sample).toBeDefined()`, and only then narrow it with `requireValue`. Their
  comments name the presence assertion.
- The factor case reads its durations through `requireValue` and hit the same plain `Error` under the
  no-transition plant (see the before rows in the plant table). It now asserts
  `expect(resting?.map(([duration]) => duration)).not.toContain(undefined)` and the same for
  `doubled` before reading any ratio, and its comment says so.
- Case titles are unchanged: "enters the dialog from a 0.96 scale to none over the panel duration on
  the panel curve as the show class joins, and leaves on the same timing"; "bounces a shown dialog to
  a 1.02 scale over the panel duration on the panel curve as the static class joins"; "doubles the
  running duration of the host, the dialog, and the backdrop at a doubled motion factor, and runs none
  at a zero factor or under the reduced-motion preference".

**Items 9 and 10, R3 and the gates.** See the following tables.

## Plants

Each plant ran through `mmod-instruments/r2/mmod-2-plant.sh` on the final test files. The script builds with
`npm run build:src:styles`, runs
`npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/modal.test.ts tests/src/styles/components/offcanvas.test.ts tests/src/styles/mixins.test.ts`,
restores the planted file, checks it with `cmp`, and rebuilds. The before rows ran the same plant
against round 1's `modal.test.ts`, restored from the backup through `mmod-instruments/r2/mmod-2-before.sh`,
and then restored the round-2 test file byte-identically (`test-restored=identical`).

| Plant (log) | Edit | Failing cases and error | Restore |
| --- | --- | --- | --- |
| before-no-transition (`mmod-2-plant-before-no-transition.log.txt`) | Round 1 test file; drop the `transition` include from `.modal.fade .modal-dialog` | entrance, bounce, and factor cases: `Error: No entering transition`, `Error: No bounce transition`, `Error: No transition at the resting factor`. Tests 3 failed, 108 passed (111), exit 1 | identical |
| before-no-static (`mmod-2-plant-before-no-static.log.txt`) | Round 1 test file; drop the `.modal.modal-static .modal-dialog` rule | selector case: `AssertionError`; bounce case: `Error: No bounce transition`. Tests 2 failed, 109 passed (111), exit 1 | identical |
| no-transition (`mmod-2-plant-no-transition.log.txt`) | Drop the dialog's `transition` include | entrance and bounce cases: `AssertionError: expected undefined to be defined`; factor case: `AssertionError: expected [ 250, undefined, 250 ] to not include undefined`. Tests 3 failed, 108 passed (111), exit 1 | identical |
| no-static (`mmod-2-plant-no-static.log.txt`) | Drop the static-bounce rule | selector case: `AssertionError` (selector set); bounce case: `AssertionError: expected undefined to be defined`. Tests 2 failed, 109 passed (111), exit 1 | identical |
| translate (`mmod-2-plant-translate.log.txt`) | `scale(0.96)` becomes `translate(0, -50px)` | entrance case: `AssertionError: expected 'matrix(1, 0, 0, 1, 0, -50)' to be 'matrix(0.96, 0, 0, 0.96, 0, 0)'`. Tests 1 failed, 110 passed (111), exit 1 | identical |
| backdrop-feedback (`mmod-2-plant-backdrop-feedback.log.txt`) | Drop the `transition` include from the `overlay-backdrop` mixin | modal factor case: `AssertionError: expected [] to deeply equal [ '(prefers-reduced-motion: reduce)' ]`; modal backdrop, mixin, and offcanvas backdrop cases: `AssertionError` reading `150` against `250`. Tests 4 failed, 107 passed (111), exit 1 | identical |

The failing-first command for R2 is the plant script's vitest command above. Before the fix, it read
3 failed (111) and 2 failed (111), with plain `Error` kills. After the fix, the same plants read 3
failed and 2 failed, and every kill is an `AssertionError`. With no plant, the same command reads 111
passed (`mmod-2-styles.log.txt`).

## Gates

Each log echoes its command first and ends with `exit=` and `/proc/loadavg`.

| Gate | Log | Result | Load average (1, 5, 15 min) |
| --- | --- | --- | --- |
| oxfmt `--check` over the owned files | `mmod-2-oxfmt-check.log.txt` | "All matched files use the correct format", exit 0 | 5.45 6.76 8.47 |
| `npm run lint:check` | `mmod-2-lint-check.log.txt` | exit 0 | 5.45 6.76 8.47 |
| `npm run check` | `mmod-2-check.log.txt` | exit 0 | 5.56 6.63 8.36 |
| Owned style files after `npm run build:src:styles` | `mmod-2-styles.log.txt` | build 0; Test Files 3 passed, Tests 111 passed, exit 0 | 4.45 7.83 9.10 |
| `npm run test:conformance` | `mmod-2-conformance.log.txt` | Tests 29 passed, exit 0 | 4.39 6.20 8.14 |
| `npm run test:guides` | `mmod-2-guides.log.txt` | Tests 26 passed, exit 0 | 4.10 6.08 8.08 |
| `npm run test:policy` | `mmod-2-policy.log.txt` | Tests 109 passed, 1 skipped, exit 0 | 3.93 6.01 8.05 |

`mmod-2-styles-first.log.txt` is an earlier green run, taken before the factor-case edit.

## Diffs and status

- `mmod-2.diff`: `git diff 73326c7`, round 1 and round 2 together. The following block is
  the output of `git diff --stat 73326c7`:

  ```text
   guides/veneer.md                              | 152 ++++++++------
   src/styles/_mixins.scss                       |   6 +-
   src/styles/components/_modal.scss             |  20 +-
   tests/src/styles/components/modal.test.ts     | 286 +++++++++++++++++++++-----
   tests/src/styles/components/offcanvas.test.ts |  85 ++++++++
   tests/src/styles/mixins.test.ts               |  40 +++-
   6 files changed, 474 insertions(+), 115 deletions(-)
  ```
- `mmod-instruments/r2/mmod-2-delta.diff`: this round alone, compared with the backups in
  `mmod-instruments/r2/mmod-2-backup/` taken before the first edit. `guides/veneer.md` +22 −21,
  `src/styles/_mixins.scss` +3 −3, `src/styles/components/_modal.scss` +2 −2 (comment only),
  `tests/src/styles/components/modal.test.ts` +23 −9, `tests/src/styles/components/offcanvas.test.ts`
  +38 −27. `tests/src/styles/mixins.test.ts` is unchanged this round.
- `mmod-2-status.txt`: the same modified files as round 1, all owned, with nothing
  untracked outside the ignored `tmp/`.

## Ancillary choices (settled under the deviation contract)

- Item 1 says "so neither backdrop moves". I wrote "so the backdrop runs no transition" and put the
  offcanvas backdrop's reduced-motion stop in the following sentence. "neither backdrop" would name
  the offcanvas backdrop one sentence before it is introduced, which is the forward-reference defect
  that claim 7 (b) names.
- The R1 qualification also reaches the `.modal` comment in `_modal.scss` and the plain-modal comment
  in `modal.test.ts`, because each made the same unqualified claim. The `_modal.scss` edit is to a
  comment only. No rule declaration changed.
- The R2 presence assertion also covers the entrance case's leaving sample and the factor case. The
  factor case was the third plain-`Error` kill under the dialog-transition deletion.
- The modal backdrop's Reason cell ("the panel timing the modal host fades on") is left as written.
  The brief names only the offcanvas cell, and the modal cell names its own component's host. Record
  it for the next unit that touches § Additions if one term for both cells is wanted.
- The mixins case title "…and leaves a backdrop without the fade class still" uses "still" for "not
  moving" and reads true, so it is unchanged.
