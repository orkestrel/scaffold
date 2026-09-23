# Unit ALERT (`al`) report, round 2

Executor: `opus` on Opus 5.5, native Claude subagent, sole writer in `/home/user/veneer-al` over
`c3ac297`. Brief: `/home/user/scaffold/.orkestrel/veneer/units/al-brief-2.md`.

Deviation state: no stop. Every finding the brief carries is closed, and every acceptance criterion
closed on the validation copy `tmp/probe/base`. That copy was deleted after its logs landed in
`/home/user/scaffold/.orkestrel/veneer/units/al-instruments-2/`. A brief fact disagrees with the tree (§ Choices and disagreements),
and it is not a stop condition.

## Touched files

These owned files are edited in place and stay untracked in the worktree:

- `src/styles/components/_alert.scss`: the dismissible comment writes "right", carries the 8b inset
  sentence, and states that the room and the placement are physical.
- `tests/src/styles/components/alert.test.ts`: the geometry key is read as `right`; the dismissible
  case is renamed "reserves the right padding…", mounts a positioned cover, and reads hits through
  the `readHit` reader beside its `z-index` reading; the placement comment is written in physical
  terms.
- `tests/app/browser/sections/AlertSection.test.ts`: the close-control comment says the control is
  named through its `aria-label` attribute.
- `app/browser/sections/AlertSection.ts`: unchanged since round 1.
- `/home/user/scaffold/.orkestrel/veneer/units/al-shared-2.patch`: the revised shared patch. It replaces the whole of `al-shared.patch`.
- `/home/user/scaffold/.orkestrel/veneer/units/al-instruments-2/`: the scripts, the mutation files, and the logs.

The shared patch touches every file on the brief's Shared row and no other file. This round changes
the following shared files relative to round 1:

- `tests/setupStyles.ts`: the `end` key becomes `right`, and the remarks use field nouns.
- `tests/setupStyles.test.ts`: the binding case reads the `right` key.
- `app/browser/constants.ts`: the `ALERT_SPECIMENS` TSDoc uses the nouns the verdict rules, and the
  `CLOSE_COPY` sentence is corrected.
- `guides/veneer.md`: the dismissible paragraph, the departure bullet, the showcase sentence, the
  proof sentence, and the plugin row.

The other shared files carry round 1's hunks unchanged.

Diffstat. The owned files are all additions: `_alert.scss` 69 lines, `alert.test.ts` 252,
`AlertSection.ts` 20, and `AlertSection.test.ts` 92. The shared patch
(`git -C tmp/probe/base diff --stat`) reports `13 files changed, 280 insertions(+), 13 deletions(-)`.
Its SHA-256 is `6c32eb15eac2b64e3148c06b7fcd982dbd4f6d4abf808c278fe66408c2fec3a0`.

## Findings: site, before, after

**Claim 3, the mutation logs.** Every mutation and the control ran again against the shipped
`alert.test.ts` on the copy `tmp/probe/base`, using the retained `run.sh` script. See
§ Mutation table. No change to the test was owed for this claim.

**7a, the R17 sentence in the guide's `### Alert classes` section:**

- Before: "…and a dismissible alert whose close control announces the dismissal it performs."
- After: "…and a dismissible alert whose close control is named through its `aria-label`
  attribute."

**7a, the `CLOSE_COPY` paragraph in `app/browser/constants.ts`:**

- Before: "…whose visible text names the notice, while the control announces the dismissal it
  performs."
- After: "…whose visible text names the notice, while the control is named through its aria-label
  attribute."
- The sentence keeps the Close copy's shape. It uses no backticks, because the paragraph renders
  as visible text and no copy paragraph in the file carries a code span. The Close section proof is
  green (§ Gates, the `section` gate).

**7b, physical direction.** These sites change:

- Guide dismissible paragraph. Before: "reserves room at the alert's end … against the top and end
  edges". After: "reserves room at the alert's right … against the top and right edges", followed
  by "The room and the control's placement are physical, so they sit at the right whatever the
  document's writing direction."
- Guide departure bullet. Before: "`3rem` for the dismissible end padding". After: "`3rem` for the
  dismissible right padding".
- `_alert.scss` comment. Before: "The end padding reserves the room…". After: "The right padding
  reserves the room…", with "The room and the placement are physical, so they sit at the right
  whatever the document's writing direction."
- `ALERT_DISMISSIBLE_GEOMETRY` in `tests/setupStyles.ts`. Before: `end: 48`. After: `right: 48`.
- The key's readers. Before: `ALERT_DISMISSIBLE_GEOMETRY.end * 2` and `const { end, block, inline,
  lift }` in `alert.test.ts`, and `const { end, … }` with `end / 16` in `tests/setupStyles.test.ts`.
  After: `.right * 2`, `const { right, block, inline, lift }`, and `right / 16`.
- The `alert.test.ts` case title and comment (owned, and aligned to the same ruling). Before:
  "reserves the end padding…" and "at the top and the end. A control placed from the start edge
  instead meets the start border and leaves the end corner empty." After: "reserves the right
  padding…" and "at the top and the right. A control placed from the left edge instead meets the
  left border and leaves the right corner empty."

**8a, the nouns:**

- Plugin row. Before: "`close` removes the `show` class and waits on the transition only when the
  alert carries `fade`". After: "the `close` method removes the `show` class and waits on the
  transition only when the alert carries the `fade` class".
- Table remarks. Before: "`end` is the alert's own end padding… `block` and `inline` are… `lift`
  is…". After: "The `right` field is the alert's own right padding… The `block` and `inline` fields
  are… the `lift` field is…".
- `ALERT_SPECIMENS` TSDoc. Before: "one `light` and one `dark`" and "No specimen carries `fade` or
  `show`". After: "one `light` scenario and one `dark` scenario" and "No specimen carries the `fade`
  class or the `show` class".
- The compatibility cells ending on the proof's path are unchanged.

**8b, the inset comment.** Before: "the control's inset is the release's `1.25` multiple of the block
inset beside the inline one, each written over the density token the alert's own inset reads."
After: "The control's block inset is the release's `1.25` multiple of its inline inset, and each is
written over the density token the alert's own inset reads."

**R2, the hit reading.** The dismissible case mounts
`<span data-cover style="position: absolute; inset: 0; z-index: 1"></span>` inside the alert. This
is positioned content one stacking level up that spans the alert. The case asserts the following,
immediately before its `z-index` reading:

```ts
expect(readHit(alert)).toBe(cover)
expect(readHit(control)).toBe(control)
expect(readStyle(control, 'z-index')).toBe(lift)
```

The `readHit(alert)` line guards that the cover is present over the alert. The `readHit(control)`
line binds "above the content" to a measurement. The `lift-sunk` and `lift-dropped` mutations each fail at
`alert.test.ts:223:27`, which is the `readHit(control)` line:
`AssertionError: expected <span data-cover …(1)></span> to be <button type="button" …(2)></button>`.
With the declaration dropped, the control keeps `position: absolute` at no level of its own, so the
level-one cover takes the hit. For that reason, the cover is in the mount rather than plain text
alone.

The guide's proof sentence ends "…and the close control's placement and its stacking over
positioned content beside a control inside a plain alert.", so the sentence describes what the proof
reads.

## Failing-first

The key rename went into the type before its readers. On the copy, `tests/setupStyles.ts` was renamed and the readers
were not, and then `npx tsc --noEmit --project tsconfig.json` ran. It exited 2 and reported
`Property 'end' does not exist on type 'Readonly<{ right: 48; block: 20; inline: 16; lift: "2"; }>'`
at `tests/setupStyles.test.ts(2367,11)`, `alert.test.ts(101,77)`, and `alert.test.ts(206,11)`
(round 1's lines). The log is `logs/rename-first.tsc.log.txt`. After the readers followed, the
`check` gate exited 0.

The hit reading is an added assertion that is green against the shipped partial. The `lift-sunk` and
`lift-dropped` mutations show that it can fail.

## Mutation table

Each row ran `bash run.sh <name>` from `/home/user/scaffold/.orkestrel/veneer/units/al-instruments-2/`. For each row, the script
copied `mutations/<name>.scss` over the copy's partial and ran `npm run build:src:styles`. It then
ran `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/alert.test.ts`.
The `derive.py` script derives each mutation file from the shipped partial through the edit the table names. Every log's
`RUN` line reads ` RUN  v4.1.11 /home/user/veneer-al/tmp/probe/base`. Case locations are
`alert.test.ts` lines in the shipped file. The failing assertion is the `❯` frame in the log.

| Mutation | Executed edit | Log | Red case (location) | Failing assertion |
| --- | --- | --- | --- | --- |
| `control` | shipped partial | `logs/control.log.txt` | none: `Tests  28 passed (28)` | — |
| `slot-literal` | `--bs-alert-padding-x: 1rem` | `logs/slot-literal.log.txt` | `reads '--bs-alert-padding-x' from its own token` (59:2); `rescales the box with the density and radius factors` (94:2) | 65, 106 |
| `literal-padding` | `padding: 1rem 1rem` | `logs/literal-padding.log.txt` | `moves the padding through a consumer scope…` (74:2); `rescales the box…` (94:2) | 88, 106 |
| `position-dropped` | `.alert` `position: relative` removed | `logs/position-dropped.log.txt` | `pads, spaces, and rounds the box…` (35:2); `reserves the right padding and pins the close control…` (207:2) | 40, 233 |
| `heading-dropped` | `.alert-heading` rule removed | `logs/heading-dropped.log.txt` | `carries a rule for every shipped alert name` (28:2); `paints the heading in the alert text color…` (118:2) | 32, 128 |
| `link-dropped` | `.alert-link` rule removed | `logs/link-dropped.log.txt` | `carries a rule…` (28:2); `weights the link and paints it from its own slot…` (132:2); `paints the %s alert from its own role aliases` for every role in light and in dark (153:23) | 32, 139, 178, 188 |
| `dismissible-literal` | `padding-right: 3rem` | `logs/dismissible-literal.log.txt` | `rescales the box…` (94:2) | 108 |
| `close-left` | `right: 0` written `left: 0` | `logs/close-left.log.txt` | `reserves the right padding and pins the close control…` (207:2) | 234 |
| `close-plain-alert` | combinator written `.alert .btn-close` | `logs/close-plain-alert.log.txt` | `carries a rule…` (28:2); `leaves a close control inside a plain alert in flow` (238:2) | 32, 246 |
| `lift-sunk` | `z-index: 2` written `z-index: -1` | `logs/lift-sunk.log.txt` | `reserves the right padding and pins the close control…` (207:2) | 223 (the hit reading) |
| `lift-dropped` | `z-index: 2` removed | `logs/lift-dropped.log.txt` | `reserves the right padding and pins the close control…` (207:2) | 223 (the hit reading) |
| `role-alias` | `.alert-info` reads `--bs-primary-*` | `logs/role-alias.log.txt` | `paints the info alert…` in light and in dark (153:23) | 175 |
| `role-literal` | `.alert-warning` written as literals | `logs/role-literal.log.txt` | `paints the warning alert…` in light and in dark (153:23) | 175 |
| `loop-roles` | loop over `tokens.$roles` | `logs/loop-roles.log.txt` | `emits no variant for the role Bootstrap 5.3.8 does not name` (192:2) | 200 |
| `loop-roles` (conformance) | same partial, `npm run test:conformance` | `logs/loop-roles.conformance.log.txt` | `records every emitted name the official inventory lacks` and `reports an unrecorded literal declaration on a shipped rule as a declaration addition`, each carrying `alert \| .alert-tertiary \| — \| selector` | — |

The run's summary is `logs/run.log.txt`. Each build log is `logs/<name>.build.log.txt`. After the
run, the shipped partial was restored and rebuilt (`restored exit=0`).

## R19 proof matrix

The pinned inventory records no `condition` field and no `media` entry for `alert`, so the matrix
has selector rows only. Case names come from `tests/src/styles/components/alert.test.ts`, and every
mutation named in the matrix is a row of the preceding table.

| Selector | Case | Distinguishing mutation (measured red) | Specimen | Scenario |
| --- | --- | --- | --- | --- |
| `.alert` | `pads, spaces, and rounds the box…`; `reads $property from its own token`; `moves the padding through a consumer scope…`; `rescales the box with the density and radius factors` | `slot-literal` (token and factor cases); `literal-padding` (consumer-scope and factor cases); `position-dropped` (box case and dismissible case) | `Role alerts`, `Linked alert`, `Dismissible alert` | `role-alerts` |
| `.alert-heading` | `paints the heading in the alert text color…` | `heading-dropped` (that case and the containment case) | `Linked alert` | `linked-alert` |
| `.alert-link` | `weights the link and paints it from its own slot…`; each role case's link reading | `link-dropped` (that case, the containment case, and every role case) | `Linked alert` | `linked-alert` |
| `.alert-dismissible` | `reserves the right padding and pins the close control to the top-right corner above the content`; `rescales the box…` | `dismissible-literal` (factor case) | `Dismissible alert` | `dismissible-alert` |
| `.alert-dismissible .btn-close` | `reserves the right padding and pins the close control…`; `leaves a close control inside a plain alert in flow`; `close.test.ts` `carries a rule for every shipped close name and none for a deferred combinator` | `close-left` (dismissible case); `close-plain-alert` (plain-alert case and containment case); `lift-sunk` and `lift-dropped` (dismissible case, at the hit reading) | `Dismissible alert` | `dismissible-alert` |
| `.alert-{role}` for each role | `paints the %s alert from its own role aliases` in light and in dark; `emits no variant for the role Bootstrap 5.3.8 does not name` | `role-alias` (info, both modes); `role-literal` (warning, both modes); `loop-roles` (the tertiary case, and the conformance additions case) | `Role alerts` | `role-alerts` |

This round changes the following rows relative to round 1:

- In the `.alert-dismissible` and `.alert-dismissible .btn-close` rows, the case title reads "right".
- The `.alert-dismissible .btn-close` row adds the `lift-sunk` and `lift-dropped` mutations.

## Gates

`gates.sh` ran on the validation copy after `stage.sh` applied the patch and copied the owned files.
Its summary is `logs/gates.log.txt`, and each gate has its own log:

- `npm run format:check`: exit 0, `All matched files use the correct format.`
- `npm run lint:check`: exit 0 (no diagnostics).
- `npm run check`: exit 0.
- `npm run build:src`: exit 0.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/alert.test.ts tests/src/styles/components/close.test.ts`:
  exit 0, `Tests  45 passed (45)`.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AlertSection.test.ts tests/app/browser/sections/CloseSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts`:
  exit 0, `Tests  9 passed (9)`.
- `npm run test:guides`: exit 0, `Tests  19 passed (19)`.
- `npm run test:policy`: exit 0, `Tests  109 passed | 1 skipped (110)`. The skip is the vendored
  `skipIf` case at `tests/policy.test.ts` line 716, which is present at `c3ac297`.
- `npm run test:setup`: exit 0, `Tests  251 passed (251)`.
- `npm run test:conformance`: exit 0, `Tests  22 passed (22)`.

Every vitest log's `RUN` line names `/home/user/veneer-al/tmp/probe/base`.

The worktree's scoped check over the owned files is recorded in `logs/worktree-scoped.log.txt`:
`npx oxfmt --config .oxfmtrc.json --check <owned files>` exited 0 with `All matched files use the
correct format.`, and `npx oxlint --config .oxlintrc.json --deny-warnings <owned files>` exited 0.

## `git apply --check`

`check.sh` does the following, and its log is `logs/apply-check.log.txt`:

1. Writes the patch from the copy's tracked diff.
2. Reverses the patch and removes the owned files.
3. Proves `git -C tmp/probe/base status --porcelain` is empty and the tree equals `c3ac297`'s tree
   (`3e87fe08292705b63b060135c874e2f69e7171ea` for each).
4. Runs the check.

The check line reads as follows:

```text
$ git -C tmp/probe/base apply --check /home/user/scaffold/.orkestrel/veneer/units/al-shared-2.patch
exit=0
```

The patch's file list is `app/browser/Showcase.ts`, `app/browser/constants.ts`,
`app/browser/index.ts`, `guides/veneer.md`, `src/styles/index.scss`,
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`,
`tests/setupServer.test.ts`, `tests/setupStyles.test.ts`, and `tests/setupStyles.ts`. That list
equals the Shared row.

## Choices and disagreements

These are the ancillary choices this unit settled:

- The hit reading's shape is `readHit(alert)` against the cover, then `readHit(control)` against the
  control, just before the `z-index` reading. The cover is positioned content at `z-index: 1`. With
  plain text alone, dropping the `z-index` declaration leaves the control on top, and only
  `z-index: -1` would redden.
- The partial's comment adds the physical-direction sentence beside the 7b word change, after the
  spinner section's precedent in the guide ("The rotation is physical…").
- The guide's proof sentence names the stacking reading, so the sentence matches what the proof reads.
- The paragraph wrapping follows the formatter. `oxfmt` changed only the plugin row's trailing
  padding.
- The logs sit under `al-instruments-2/logs/`, and the mutation files sit under
  `al-instruments-2/mutations/`.

This brief fact disagrees with the tree, and the tree wins:

- The brief says `grep -rln readHit tests/src/styles/components` finds a sibling proof that calls
  `readHit`. At `c3ac297` it returns nothing. The call sites are `tests/app/browser/integration.test.ts`
  (around the `refuses a covered host` case) and `tests/setupBrowser.test.ts`, and this case follows
  their `expect(readHit(target)).toBe(cover)` shape. `readHit` is exported from
  `@orkestrel/test/browser` (`dist/src/browser/index.d.ts`), which `alert.test.ts` already imports,
  and the styles project runs it green. For that reason, the stop condition does not apply.

## Observations

- `tests/app/browser/sections/CloseSection.test.ts` is off-limits. Its comment in the inverted-control
  block still reads "the control announces the dismissal". That control's name is "Dismiss the
  inverted notice", so the comment describes a name rather than a performed action. It needs a
  carrier if the Orchestrator wants the wording aligned with the corrected `CLOSE_COPY` sentence.
- The journey and `CAPTURE=1` were not run. They belong to the Orchestrator at landing.

## Review evidence

- `/home/user/scaffold/.orkestrel/veneer/units/al-shared-2.patch`
- `/home/user/scaffold/.orkestrel/veneer/units/al-2.diff`: `git diff --no-index /dev/null <path>` for each owned file, concatenated.
- `/home/user/scaffold/.orkestrel/veneer/units/al-2-status.txt`: `git -C /home/user/veneer-al status --porcelain`, which lists the owned
  files as untracked.
- `/home/user/scaffold/.orkestrel/veneer/units/al-instruments-2/`, which holds the following:
  - `stage.sh`, `check.sh`, `run.sh`, `gates.sh`, and `derive.py`
  - `mutations/*.scss`
  - `logs/*.log.txt`
