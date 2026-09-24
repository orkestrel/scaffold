# UTIL-SPACING (`usp`) round 2 report

`opus` on Opus 5.5 ran as the native subagent in `/home/user/veneer-usp` (branch `unit/usp` from
`2a3f223`). Every fix from S1 to S7 is at its site, and every acceptance criterion reads green. No
stop condition fired.

The revised shared patch `.orkestrel/veneer/units/usp-shared-2.patch` supersedes `usp-shared.patch` whole
(SHA-256 `a44fe3a5d78b7451dc982a7bfcb03fbcc13d58cfd2f621d5175114c73c00bec9`). The
`git apply --check` command exits 0 for it on a fresh extract of `2a3f223`.

## Fixes

### S1: derived auto-margin and side populations

The fix is in `tests/app/browser/sections/SpacingSection.test.ts`. The before and after code is
in `.orkestrel/veneer/units/usp-instruments/usp-2-owned-interdiff.txt`.

Before:

- The auto-margin case iterated a literal list of classes, from `'ms-auto'` to `'m-auto'`.
- The case read each card's room as a positional tuple.
- The `.me-auto` card was held only to `me?.[3] === 0`.
- The `.my-auto` card was held only to top equal to bottom.
- The geometry case built its expected margins from the literal side array
  `['top', 'right', 'bottom', 'left']`.

After:

- A module constant `SIDES` reads the shorthand entry's `sides` field from
  `SPACING_SIDE_CASES`. The geometry case writes
  `expected: SIDES.map((side) => (sides.includes(side) ? 24 : 0))`.
- The auto-margin case builds a map keyed by class. Each class is
  `SPACING_SIDE_CASES.map(({ suffix }) => \`m${suffix}-auto\`)`, and each reading holds the
  `top`, `right`, `bottom`, and `left` rooms. For the card after it, the reading also holds the
  `gap` and `trail` rooms.
- Each class keeps a bespoke expectation:
  - `m-auto`: top equals bottom, left equals right, and each is greater than zero.
  - `mx-auto`: left equals right.
  - `my-auto`: top equals bottom and is greater than zero, where the stretch default reads zero on
    each side.
  - `mt-auto`: bottom is zero and top is greater than zero.
  - `me-auto`: left is zero. The card after it trails the line's end by zero and sits past the card
    at a gap greater than zero.
  - `mb-auto`: top is zero and bottom is greater than zero.
  - `ms-auto`: right is zero and left is greater than zero.

The `.my-auto` reading keeps the specimen's `ratio-4x3` context. The `stretch` default there fills
the line's height, so the reading reads zero room on each side. The added greater-than-zero
expectation is what separates the auto margin from that default. The specimen markup ships unchanged.

The proving reading is `.orkestrel/veneer/units/usp-instruments/usp-mutations-2.log.txt`. Each auto margin was written as zero by
a later important rule in the utilities layer, and the case then ran alone with the command
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SpacingSection.test.ts -t "pushes each auto-margin card to the end, the start, or the middle of its line"`.

| Member written as zero | Test exit | Result line | Failing assertion |
| --- | --- | --- | --- |
| `.m-auto` rule (`margin: 0 !important`) | 1 | `Tests  1 failed \| 4 skipped (5)` | `expected [ +0, +0 ] to deeply equal [ +0, 105 ]` |
| `.mx-auto` rule (`margin-right` and `margin-left` at `0 !important`) | 1 | `Tests  1 failed \| 4 skipped (5)` | `expected 1 to be 207` |
| `.my-auto` rule (`margin-top` and `margin-bottom` at `0 !important`) | 1 | `Tests  1 failed \| 4 skipped (5)` | `expected 0 to be greater than 0` |
| `.mt-auto` rule (`margin-top: 0 !important`) | 1 | `Tests  1 failed \| 4 skipped (5)` | `expected [ +0, false ] to deeply equal [ +0, true ]` |
| `.me-auto` rule (`margin-right: 0 !important`) | 1 | `Tests  1 failed \| 4 skipped (5)` | `expected [ +0, 253, false ] to deeply equal [ +0, +0, true ]` |
| `.mb-auto` rule (`margin-bottom: 0 !important`) | 1 | `Tests  1 failed \| 4 skipped (5)` | `expected [ +0, false ] to deeply equal [ +0, true ]` |
| `.ms-auto` rule (`margin-left: 0 !important`) | 1 | `Tests  1 failed \| 4 skipped (5)` | `expected [ 321, false ] to deeply equal [ +0, true ]` |
| none (restored) | 0 | `Tests  1 passed \| 4 skipped (5)` | — |

### S2: the guide's token nouns and the density sentence

These fixes are in `guides/veneer.md`, carried by the shared patch.

- In § Tailwind, the sentence "…and Veneer declares each of those with `!important`." reads
  "…and Veneer declares each of those with the `!important` flag."
- In § Tailwind, the sentence "…because Tailwind names those utilities `pointer-events-none`,
  `pointer-events-auto`, and `select-*`." reads "…because Tailwind writes those as the
  `pointer-events-none`, `pointer-events-auto`, and `select-*` utilities."
- In `### Spacing utilities`, the clause "…so the `--vn-factor-density` token moves every margin
  and padding step with the components, and a retuned `--vn-space-8` token moves the `.m-3` and
  `.p-3` classes on every side." reads "…so the `--vn-factor-density` token moves the margin and
  padding the `1` to `5` steps set, and a retuned `--vn-space-8` token moves the margin the `.m-3`
  rule sets and the padding the `.p-3` rule sets on every side."

The paragraphs these fixes touch were re-flowed to the guide's 100-column width. The proving
readings are:

- `.orkestrel/veneer/units/usp-instruments/usp-2-shared-interdiff.txt` shows these sentences and their re-flow.
- The `npm run test:guides` command, the `npm run test:policy` command, and the `oxfmt` check
  read green in the gates.

### S3: nouns for the importance token, the `auto` field, and the boolean values

These fixes span the owned proofs and the shared setup file.

- In `tests/src/styles/utilities/spacing.test.ts` and `tests/src/styles/utilities/interaction.test.ts`,
  the escape comment "An unlayered `!important` sorts after every layered one" reads "An unlayered
  `!important` declaration sorts after every layered one". The comment was re-flowed.
- In the `SPACING_PROPERTY_CASES` doc block of `tests/setupStyles.ts`, carried by the shared
  patch, "If `auto` is `true`, the property's entries also write the `auto` step; if `false`, they
  write the numbered steps alone." reads "If the `auto` field holds the `true` value, the
  property's entries also write the `auto` step; if it holds the `false` value, they write the
  numbered steps alone."

A sweep covered every comment line the owned files add, the doc blocks of the `SPACING_STEP_CASES`,
`SPACING_PROPERTY_CASES`, and `SPACING_SIDE_CASES` tables and of the `USER_SELECT_VALUES` and
`POINTER_EVENTS_VALUES` tables, the `constants.ts` doc blocks, and the guide sections the patch
adds. Each code token in those lines is followed by its noun. The comment in the
`_interaction.scss` partial already reads "its `none` and `auto` keys", which has the noun, so the
partial is unchanged.

### S4: `initial` renamed `prefix`

The `SPACING_PROPERTY_CASES` table in `tests/setupStyles.ts` renames its `initial` field to
`prefix`, and its doc block reads "each with the prefix its classes open with". The
`SPACING_SIDE_CASES` doc block reads "A class opens with the property's prefix and the entry's
suffix".

The readers were renamed in the same change:

- The binding case in `tests/setupStyles.test.ts`: its comment and its destructuring, as
  `({ prefix })`, `{ property, prefix, auto }`, and `` `${prefix}${suffix}` ``.
- Every reader in `tests/src/styles/utilities/spacing.test.ts`.

A search for the `initial` field over the owned files and the patched setup files returns no hit.

The proving reading is a run with the margin row's `prefix` field written as `'p'`. The setup proof
reads `test exit 1`, `Tests  1 failed | 121 passed (122)`, and the binding case fails with
`expected [ 'p', 'p', 'pb', 'pb', 'pe', …(9) ] to deeply equal [ 'm', 'mb', 'me', 'ms', 'mt', …(9) ]`.
The restored run reads `Tests  122 passed (122)` (`usp-mutations-2.log.txt`). The existing token and
side table mutations still redden the renamed case, each with the result line
`Tests  1 failed | 121 passed (122)`.

### S5: the value-key wording

These fixes are in `guides/veneer.md`, `### Interaction utilities`.

- "The user-select key and the release's pointer-events entry ship whole" reads "The `user-select`
  key and the release's pointer-events entry ship whole".
- "…and the `none` and `auto` keys are what tell the two apart." reads "…and the `none` and `auto`
  value keys are what tell the two apart." The paragraph was re-flowed.

The proving reading is `usp-2-shared-interdiff.txt`.

### S6: the Interaction copy

The fix is to the `INTERACTION_COPY` constant in `app/browser/constants.ts`, carried by the shared
patch. The paragraph reads:

- Before: "Click each line to compare how much text one press selects, then point at each link: a
  click passes through the link that takes no pointer events and reaches the links that take them."
- After: "Click each line to compare how much text one press selects, then click each link: a click
  on the link that takes no pointer events lands on what lies beneath it, and a click on each other
  link reaches that link."

The proving reading is the Interaction section proof, which reads the paragraph against the
constant and reads green. Its hit-test case reads the line beneath the `.pe-none` link and each
`.pe-auto` link itself, which is what the sentence states.

### S7: a negative control for the cascade census

The instrument `.orkestrel/veneer/units/usp-instruments/usp-cascade-2.mjs` takes the cascade path as its argument. It exits 1 when
any of its checks finds a member:

- a recorded selector missing from the cascade;
- a selector present that the inventory does not record;
- a repeated site;
- a normal property declaration;
- a custom property.

`.orkestrel/veneer/units/usp-instruments/usp-cascade-controls-2.sh` runs it over the built cascade and over each planted copy, and its output is retained in
`usp-mutations-2.log.txt`.

| Cascade read | Command | Census exit | Reading |
| --- | --- | --- | --- |
| The built cascade | `node .orkestrel/veneer/units/usp-instruments/usp-cascade-2.mjs /home/user/veneer-usp/tmp/probe/base/dist/src/styles/index.css` | 0 | inventory 551, cascade 551, declarations 710, every finding array empty |
| A copy with the planted `.m-6{margin:4rem!important}` rule | `node .orkestrel/veneer/units/usp-instruments/usp-cascade-2.mjs /home/user/veneer-usp/tmp/probe/usp-census/extra.css` | 1 | `"extra":[".m-6@0"]` |
| A copy with the `.m-3` rule's declaration written normal | `node .orkestrel/veneer/units/usp-instruments/usp-cascade-2.mjs /home/user/veneer-usp/tmp/probe/usp-census/normal.css` | 1 | `"normal":[".m-3@0 margin"]` |

## Gates

`.orkestrel/veneer/units/usp-instruments/usp-gates-2.sh` ran every gate (`.orkestrel/veneer/units/usp-instruments/usp-gates-2.log.txt`). The worktree gates
ran in `/home/user/veneer-usp`. The rest ran in the validation copy `tmp/probe/base`, which was
built from `2a3f223`, the owned files, and the revised shared patch, and was deleted before this
report.

| Command | Exit | Result line |
| --- | --- | --- |
| `npm run format:check` (worktree) | 0 | `All matched files use the correct format.` |
| `npm run lint:check` (worktree) | 0 | no finding printed |
| `npm run check` | 0 | no error printed |
| `npm run build:src` | 0 | build completed |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/spacing.test.ts tests/src/styles/utilities/interaction.test.ts` | 0 | `Tests  22 passed (22)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SpacingSection.test.ts tests/app/browser/sections/InteractionSection.test.ts` | 0 | `Tests  8 passed (8)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `Tests  122 passed (122)` |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` (`.orkestrel/veneer/units/usp-instruments/usp-guides-2.log.txt`) |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `git apply --check .orkestrel/veneer/units/usp-shared-2.patch` (fresh `git archive 2a3f223` extract) | 0 | no output |

Observation, not a criterion (`.orkestrel/veneer/units/usp-instruments/usp-service-2.sh`, `.orkestrel/veneer/units/usp-instruments/usp-service-2.log.txt`):

- Setup: `up-unscoped-profiles-2.patch` was applied to the copy's `tests/service/tailwind/profiles.test.ts`
  (`patch exit 0`). The command was `npm run build:src:styles && npm run test:service`. The profiles
  proof was then restored from the pristine extract.
- Result: `exit 1`, `Tests  2 failed | 16 passed (18)`.
- The `declares the one order line in every profile…` case reads the whole order line where the
  patch expects `['properties']`.
- The `fills Tailwind reset only under the preflight profile` case reads `['--spacing']` where the
  patch expects the `--color-black`, `--color-white`, and `--spacing` variables.
- Cause: those expectations rest on UTIL-PAINT's names, which this copy does not carry. This
  unit's names register no custom property and read the `--spacing` variable alone. So this unit's
  names redden neither case, and the reading is the one round 1 took with the round-1 profiles patch.

## Review evidence

Each record is under `/home/user/veneer-usp/tmp/units/`:

- `usp-shared-2.patch`: the revised shared patch against `2a3f223`.
- `usp-2-shared-interdiff.txt`: the shared files each patch produces, diffed round 1 against
  round 2. It differs only at the S2, S3, S4, S5, and S6 sites and their re-flow. S1 and S7 touch no
  shared file.
- `usp-2.diff` and `usp-2-status.txt`: the owned files against `2a3f223`, and the worktree status.
  The status shows the owned files alone, each untracked.
- `usp-2-owned-interdiff.txt`: the owned files, round 1 against round 2. They differ only at the S1,
  S3, and S4 sites.
- `usp-mutations-2.log.txt`: the S1 member runs, the binding-case table runs, and the S7 census runs.
  The instruments are `usp-mutate-2.sh`, `usp-cascade-2.mjs`, and `usp-cascade-controls-2.sh`, and
  the copy builder is `usp-base-2.sh`.

## Deviations

- No stop condition fired, and no fix changed what ships beyond the case, sentence, name, or
  instrument it names.
- The `.my-auto` reading distinguishes the zero-margin mutation inside the specimen's existing
  context, through the greater-than-zero expectation, rather than through a different context. Changing
  the context would change the shipped specimen markup. This is a recorded decision under the
  deviation contract.
- The S6 wording follows the brief's sentence.
- The validation copy `tmp/probe/` was deleted. The round wrote nothing to the session scratchpad or
  the system temporary directory.
