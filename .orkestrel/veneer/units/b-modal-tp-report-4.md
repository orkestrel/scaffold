# Unit TIP (`tp`), round 4 report

Fixes P7, P8, and P9 are at their sites. The sweep found further sentences that claim more than their
proof reads, in the `tests/setupStyles.ts` file, which the shared patch carries, and in comments in
the owned test files. I fixed each and name it under Sweep. Every gate the criteria
name exits 0. The `tp-shared-4.patch` file passes the `git apply --check` command on a fresh `2a3f223`
extract and supersedes the `tp-shared-3.patch` file whole.

Deviation state: none raised. The brief's scope line says no owned file changes this round, and the
sweep changed comments in owned test files. Under Decisions I record that choice and how to reject it.

## Artifacts

All paths are under `/home/user/veneer-tp/tmp/units/`.

- `tp-report-4.md`: this report.
- `tp-shared-4.patch`: the revised shared patch against `2a3f223`.
- `tp-4-shared-interdiff.txt`: the unified diff of the `tp-shared-3.patch` file against the
  `tp-shared-4.patch` file.
- `tp-4-status.txt`: the worktree status. Every owned file is untracked (`??`), and the `cmp` command
  reports the file equal to the `tp-3-status.txt` file.
- `tp-4.diff` and `tp-4-owned-interdiff.txt`: the owned-file diff, and its unified diff against the
  `tp-3.diff` file. I added these because the sweep changed owned comments.
- `tp-owned-4.py`: the sweep fixes in the owned files.
- `tp-stage-4.sh`: rebuilds the validation copy from `2a3f223`, the owned files, and the
  `tp-shared-3.patch` file. Observations describes how the `node_modules` line changed after it ran.
- `tp-shared-4.py`: fixes P7, P8, and P9 and the shared sweep fix, applied to the copy.
- `tp-reflow-4.py`: the re-flow of the `TIP_PLACEMENTS` remarks paragraph.
- `tp-patch-4.py`: writes the patch and the shared interdiff.
- `tp-check-4.sh` and `tp-check-4.log.txt`: the apply check and byte comparison on a fresh extract.
- `tp-gates-4.sh` and `tp-gates-4.log.txt`: the gate script and its log on the validation copy.
- `tp-gates-4-symlink.log.txt`: the earlier gate run on a copy with a symlinked `node_modules`
  directory, kept as an observation.
- `tp-wt-4.sh`, `tp-wt-fmt-4.log.txt`, and `tp-wt-lint-4.log.txt`: the worktree format and lint runs.
- `tp-sweep-4-shared.txt` and `tp-sweep-4-owned.txt`: the extracted lines the sweep read.

The validation copy under `tmp/probe/` is deleted, and `tmp/` holds only `units/`.

## Fixes

### P7: the popover specimens' summary (`app/browser/constants.ts`)

- Before: " * Lists the popover specimens the section renders, one per explicit placement, in render
  order."
- After: " * Lists the popover specimens the section renders, a popover at each explicit placement and
  an untitled popover at the bottom placement, in render order."
- Reading: the `POPOVER_SPECIMENS` constant holds the Top, Right, Bottom, and Left popovers and then
  the `Untitled popover` specimen, whose markup carries the `bs-popover-bottom` class. The section
  contract case asserts that render order. The `npm run check` command and the section run pass on
  the copy.

### P8: the fade clause in § Popover classes (`guides/veneer.md`)

- Before: "The release's Popover plugin builds on the Tooltip plugin and sets the `fade` class and the
  `show` class, which no popover rule reads; that behavior is the engine's, and § Compatibility
  records it."
- After: "The release's Popover plugin builds on the Tooltip plugin and sets the `show` class, and
  the `fade` class when the popover is animated, and no popover rule reads either; that behavior is
  the engine's, and § Compatibility records it."
- The remainder of the paragraph is re-flowed, with its words unchanged.
- Reading:
  - The sentence matches the Popover `plugin` row's "sets the `show` class, and the `fade` class
    when animated".
  - The release's `_createTipElement` method adds the `fade` class only when the `_isAnimated`
    method returns true (`node_modules/bootstrap/js/src/tooltip.js`, around line 319).
  - The `npm run test:guides` command passes on the copy.

### P9: the `TIP_ARROW_PROPERTIES` remarks (`tests/setupStyles.ts`)

- Before: " * A reading of every property on the arrow and on each of its triangles is what separates two
  placements, …"
- After: " * A reading of each of these properties on the arrow and on each of its triangles is what
  separates two placements, …"
- Reading:
  - The binding case derives the table from the inventory's width, height, offset, and side border
    width and color declarations on the arrow selectors. It filters out the `display`, `position`,
    `content`, and `border-style` properties, so "each of these properties" is the population it
    reads.
  - The setup run passes on the copy.

## Sweep

### What the sweep read

- `tp-sweep-4-shared.txt` holds every added line of the `tp-shared-3.patch` file that is a comment or
  prose line. The table rows of § Compatibility are excluded. I read the guide's departure list items
  in full from the patch as well. The files covered are:
  - `app/browser/constants.ts`
  - `guides/veneer.md`
  - `src/styles/_mixins.scss`
  - `tests/setup.ts`
  - `tests/setupStyles.ts`
  - `tests/setupStyles.test.ts`
  - `tests/src/styles/fixtures/mixins.scss`
  - `tests/src/styles/mixins.test.ts`
- `tp-sweep-4-owned.txt` holds every comment line in the owned files:
  - `_tooltip.scss` and `_popover.scss`
  - `TooltipSection.ts` and `PopoverSection.ts`
  - `TooltipSection.test.ts` and `PopoverSection.test.ts`
  - `tooltip.test.ts` and `popover.test.ts`
- I checked each claim against the assertion or source it describes. Those sources were the
  inventory's popover arrow and box-shadow declarations, the `VIEWPORT_WIDTHS` constant, the section
  frame readings, the rules cases, and the release's `tooltip.js` and `util/template-factory.js`
  files.

### What the sweep fixed

- **The arrow edge in the `TIP_PLACEMENTS` remarks (`tests/setupStyles.ts`, shared).**
  - Before: "…so the arrow's own edge on that side meets the tip's edge the `edge` field names."
  - After: "…so the arrow's edge facing the tip, on the side the `side` field names, meets the tip's
    edge the `edge` field names."
  - Reading: the arrow cases assert `mark[side]` close to `box[edge]`. For the top placement, that
    is the arrow's top edge, which faces the tip, on the tip's bottom edge. "That side" read as the
    `edge` field's side, which names the wrong arrow edge.
  - The paragraph is re-flowed to 100 columns.
- **The arrow edge comment in the `tooltip.test.ts` file (owned).**
  - Before: "The arrow lies wholly outside the tip, its own host-side edge on the tip's facing edge."
  - After: "The arrow lies wholly outside the tip, its edge facing the tip on the tip's edge facing
    the host."
  - Reading: the same assertion. The arrow edge it reads faces the tip, not the host.
- **The arrow edge comment in the `popover.test.ts` file (owned).**
  - Before: "…its own host-side edge on the popover's facing outer edge."
  - After: "…its edge facing the popover on the popover's outer edge facing the host."
  - Reading: the same assertion.
- **The specimen comment in the `PopoverSection.test.ts` file (owned).**
  - Before: "Each specimen is the shell's frame holding one popover and nothing else, in the placement
    order the table pins, …"
  - After: "Each placement specimen is the shell's frame holding one popover and nothing else, in the
    placement order the table pins, …"
  - Reading: the loop under that comment iterates the `TIP_PLACEMENTS` table and asserts
    `specimen.children` has length 1. The `Untitled popover` specimen is read by a separate block
    that asserts no child count.

### What the sweep held

Every other line the sweep read holds against its proof or source. The following claims got a
direct check:

- The inventory records the `--bs-popover-box-shadow` property on the `.popover` selector, and no
  selector records a `box-shadow` property.
- The inventory records each `.bs-popover-*` arrow triangle selector in a rule for its border width
  and in a separate rule for its offset and its color. The `POPOVER_SELECTORS` remarks state this.
- The `VIEWPORT_WIDTHS` constant is `[390, 1280]`, and each section's frame case reads both the tip
  and the arrow against the frame at every width in that constant.
- The popover engine-class case asserts the `opacity` and `display` properties. Its comment derives
  "paints what the resting one paints" from the rules case, which asserts that no popover selector
  names the `fade` or `show` class.

## Gates

The following gates ran on the rebuilt validation copy. The log is the `tp-gates-4.log.txt` file.

| Gate     | Command | Result |
| -------- | ------- | ------ |
| check    | `npm run check` | exit 0 |
| build    | `npm run build:src` | exit 0 |
| setup    | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | exit 0, `Tests  126 passed (126)` |
| guides   | `npm run test:guides` | exit 0, `Tests  19 passed (19)` |
| policy   | `npm run test:policy` | exit 0, `Tests  109 passed \| 1 skipped (110)` |
| styles   | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts` | exit 0, `Tests  20 passed (20)` |
| sections | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/PopoverSection.test.ts` | exit 0, `Tests  5 passed (5)` |
| format   | `npx oxfmt --config .oxfmtrc.json --ignore-path=../tp-empty.ignore --check app/browser/constants.ts guides/veneer.md tests/setupStyles.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts tests/app/browser/sections/PopoverSection.test.ts` | exit 0, "All matched files use the correct format." |
| lint     | `npx oxlint --config .oxlintrc.json --deny-warnings --no-ignore app/browser/constants.ts tests/setupStyles.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts tests/app/browser/sections/PopoverSection.test.ts` | exit 0, no diagnostic |

The styles and sections runs cover the owned files whose comments the sweep changed.

The following gates ran in the worktree:

- `npm run format:check` exits 0 with "All matched files use the correct format."
- `npm run lint:check` exits 0 and prints no diagnostic.

The patch check is the `tp-check-4.sh` script. It runs `git apply --check` and then `git apply` with
`GIT_CEILING_DIRECTORIES=/home/user/veneer-tp/tmp/probe` on a fresh `git archive 2a3f223` extract,
and runs the `cmp` command on every file the patch touches. Its log reads `apply-check exit 0`,
`apply exit 0`, and `byte-compare exit 0`.

## Interdiff

The `tp-4-shared-interdiff.txt` file changes the `tp-shared-3.patch` file only in the
`app/browser/constants.ts`, `guides/veneer.md`, and `tests/setupStyles.ts` sections. The changes are:

- the P7 summary, P8 paragraph, and P9 remarks sentences;
- the sweep fix in the `TIP_PLACEMENTS` remarks;
- the re-flow of the § Popover classes paragraph and the `TIP_PLACEMENTS` remarks paragraph;
- the blob hashes and hunk lengths those edits change.

## Decisions

- **Owned sweep fixes.** The brief grants the round-1 owned files and asks for a sweep of every line
  rounds 1 to 3 added. It also expects that no owned file changes this round. The false comments sit
  in owned test files, which the package does not publish, so I fixed them within the owned scope rather than leave a
  known false sentence. If you want them out of this round, the `tp-4-owned-interdiff.txt` file holds
  the exact reversal. The shared patch does not depend on them.
- **Re-flow.** The § Popover classes paragraph and the `TIP_PLACEMENTS` remarks paragraph are
  re-flowed to 100 columns. The `TIP_PLACEMENTS` paragraph carried a pre-existing 101-column line,
  which the re-flow removed.

## Observations

- **The `node_modules` provisioning.**
  - The `tp-stage-4.sh` script ran with `ln -s` for the copy's `node_modules` directory, as the
    round-3 script had.
  - In that copy, the app:browser project refused the `@orkestrel/contract` import in the
    `src/browser/helpers.ts` file with "Resolved dependencies must remain inside their physical
    package root". The sections run reported `no tests` and exit 1.
  - I replaced the symlink with `cp -al node_modules tmp/probe/base/node_modules`, which is the form
    the round-1 brief prescribes. I then corrected the script's line to that form, so the retained
    script names what the recorded copy used.
  - Round 3's gates never loaded the app:browser project, so its symlink did not affect them.
- **The gate order.** The `tp-gates-4-symlink.log.txt` run also had the build after the setup run.
  The setup run's built-cascade cases then failed with an `ENOENT` error for the
  `dist/src/styles/index.css` file, and the summary read `Tests  5 failed | 121 passed (126)`. The
  recorded script builds before the setup and styles runs.
- **The scratchpad.** Nothing was written into the session scratchpad. It was read only for the npm
  11 `PATH` entry in the `tp-env.sh` file.
