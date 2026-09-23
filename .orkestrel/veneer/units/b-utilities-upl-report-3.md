# UTIL-PLACEMENT (`upl`) report, round 3

Executor: `builder` on Sonnet, a native Claude subagent, the sole writer in
`/home/user/veneer-upl` (branch `unit/upl`, uncommitted over `e4e6a40`). Brief:
`/home/user/veneer-upl/tmp/units/upl-brief-3.md`, superseding `upl-brief-2.md`.

Deviation state: one self-correction taken and closed inside this round, no stop taken. Building
the land copy's edits directly under `tmp/probe/land` without also mirroring the owned-file edits
(the `SIZE_STEP_CASES` rename, the `sizing.test.ts` container composition, and the
`TRANSLATION_BOX` substitution in `position.test.ts`) into the worktree left the first `fresh.sh`
run red on `check` (`tests/app/browser/sections/SizingSection.test.ts(7,10): error TS2724`), because
the fresh copy syncs owned files from the worktree, not from the land copy. Found and fixed inside
this round: the three owned files were re-applied directly in the worktree, and the corrected `fresh.sh`
run gave every gate green (`logs/fresh-check.log.txt` after the fix reads no diagnostic). No other
stop condition fired: the earlier findings each resolved with the tree's own facts, and every patch
still applies to `e4e6a40` with `git apply --check`.

## Findings closed

### F-CAP: the width cap's visibility

Site: `app/browser/constants.ts`, the `Maximum sizes` entry of `SIZING_SPECIMENS`, and its remark.

Before: `'<div class="viewport"><p><span class="placeholder vw-100 mw-100" aria-hidden="true"></span></p><div class="h-50">…'`

After: `'<div class="viewport"><p class="w-50"><span class="placeholder vw-100 mw-100" aria-hidden="true"></span></p><div class="h-50">…'`

The remark gains: "The line inside the frame is half the frame's width, so a box the width cap does
not hold runs past the line to the frame's edge, where the frame clips it, and the capped box stops
at the line."

The section mutation `max-width-cap-dropped` (`tools/mutations-round3.sh`) removes ` mw-100` from
that span in the fresh copy. It reddens the cap case and its neighbors:
`SizingSection > renders every declared specimen through the shared section contract`,
`sizes the steps against their container and the viewport sizes against the viewport at the 390
variant`, and the 1280 variant (`3 failed | 10 passed (13)`,
`logs/mutations/max-width-cap-dropped.log.txt`). The control `control-sections-3` is green
(`13 passed (13)`, `logs/mutations/control-sections-3.log.txt`).

`tools/caps-reading.sh`, re-run after the change: at 390, `CAPS 390 [[195,195],[192,192]]
[390,390,896,896] 390`; at 1280, `CAPS 1280 [[640,640],[192,192]] [1280,1280,896,896] 1280`. The
capped box now reads half the frame's width at each variant (195 at 390, 640 at 1280) because its
containing block is the new `.w-50` line rather than the frame itself; the viewport-sized box beside
it still reads the full viewport, and the page never widens past the variant. The proof's own
assertion (`for (const [capped, limit] of reading.caps) expect(capped).toBe(limit)`) compares the
cap against its own containing block's `clientWidth` rather than against a fixed value, so both the
before and the after readings hold the proof at `4 passed (4)`.

### Claim 5: the binding case's independent memberships

Site: `tests/setupStyles.test.ts`, the case `binds the placement steps, values, and fixtures to the
inventory, the ramp, and the journey`.

Added, after the existing `OFFSET_EDGES` loop: a derivation of the required offset edges from every
unconditioned inventory selector matching `^\.(top|bottom|start|end)-` (the edge is the text before
the first hyphen after the dot), asserted against `OFFSET_EDGES` sorted; a derivation of the
required viewport cases from the inventory names `.vw-100`, `.vh-100`, `.min-vw-100`, and
`.min-vh-100`, asserted against `VIEWPORT_SIZE_CASES`'s names sorted; and
`expect(STICKY_SCROLLER.offset).toBeGreaterThan(0)` with `expect(STICKY_SCROLLER.style).toContain('overflow: auto')`.

Controls, each red on the binding case alone with the round-2 controls (`control-setup-styles-3`,
`110 passed (110)`) still green:

- `edges-emptied` (`OFFSET_EDGES` frozen to `[]`): `1 failed | 109 passed (110)`,
  `logs/mutations/edges-emptied.log.txt`.
- `viewport-cases-emptied` (`VIEWPORT_SIZE_CASES` frozen to `[]`): `1 failed | 109 passed (110)`,
  `logs/mutations/viewport-cases-emptied.log.txt`.
- `scroller-offset-zero` (`STICKY_SCROLLER.offset` `200` → `0`): `1 failed | 109 passed (110)`,
  `logs/mutations/scroller-offset-zero.log.txt`.

Each log's `# red:` line names the binding case alone.

### F-FIXTURE: the fixtures

`tests/setupStyles.ts` exports `TRANSLATION_BOX = 'width: 100px; height: 40px'`, frozen (a string,
trivially), documented "Carries the inline box the translation proofs read their offsets from."

`tests/src/styles/utilities/position.test.ts`: the translation case (`centers a box on each axis
with the translation entries`) and the later-value case (`resolves a later value over an earlier
one inside an entry`) read `style="${TRANSLATION_BOX}"` in place of the inline
`style="width: 100px; height: 40px"`, at every occurrence in both cases.

`tests/src/styles/utilities/sizing.test.ts` around the `auto` step case: composes
`` `<div style="${PLACEMENT_CONTAINER}; display: flex; align-items: flex-start">…` `` in place of
the restated container literal `'<div style="width: 400px; height: 200px; display: flex;
align-items: flex-start">…'`.

`TRANSLATION_BOX` is added to the export-list case (between `THEME_DARK_ADDITIONS` and
`TYPE_DISPLAY_CASES`, code-point order) and to the binding case's freeze list.

### F-ROWS: the compatibility rows

Site: `guides/veneer.md` § Compatibility, the `fixed`, `sticky`, and `translate-middle` rows.

Before: "reading `--vn-stack-fixed`"; "reading `--vn-stack-sticky`"; "Every official
`.translate-middle` selector ships…"

After: "reading the `--vn-stack-fixed` token"; "reading the `--vn-stack-sticky` token"; "The
official `.translate-middle`, `.translate-middle-x`, and `.translate-middle-y` selectors ship…"

### F-SETUP: the setup names and order

`SIZE_STEP_CASES` renamed to `SIZING_STEP_CASES` at every site: the constant and its TSDoc in
`tests/setupStyles.ts`; the consumers `tests/setupStyles.test.ts`,
`tests/src/styles/utilities/sizing.test.ts`, and `tests/app/browser/sections/SizingSection.test.ts`;
the export-list entry.

`OFFSET_STEP_CASES`'s TSDoc, before: "Lists the offset steps in the release's map order." After:
"Lists the position offset steps in the release's map order."

"class stem" renamed to "class prefix" (and "class stems" to "class prefixes") in each TSDoc the
round-2 patch added: the `SIZING_ENTRY_CASES`, `OFFSET_EDGES`, and `POSITION_ENTRY_CASES` doc
comments in `tests/setupStyles.ts`. No other site in the tree carries the round-2-added phrase.

`tests/setupStyles.test.ts`'s export literal and import list: `PLACEHOLDER_MARKUP`,
`PLACEHOLDER_SELECTORS`, `PLACEHOLDER_SIZE_CASES`, `PLACEMENT_BOX`, `PLACEMENT_CONTAINER`,
`POSITION_ENTRY_CASES`, `POSITION_VALUES`, `PROGRESS_MARKUP`, `PROGRESS_SELECTORS`,
`PROGRESS_VARIABLE_CASES` in that code-point order (the import list carried no `PLACEMENT_BOX`
entry before or after, since that file never references it directly; only the export-literal
string was moved for `PLACEMENT_BOX`, and both places were corrected for `PLACEMENT_CONTAINER`).

### F-SHELL: the shell comment

Site: `app/browser/styles/_shell.scss`, the `.viewport` comment.

Added, after "it leaves room for a default dialog at the narrowest variant.": "The bounded height
also gives a percentage height or offset a definite height to resolve against, so the `Edge
offsets`, `Centered translation`, `Stacking levels`, and `Height steps` specimens use the frame for
that reason."

### The ledger table's position

Reading: the rule at `guides/veneer.md` § Departures ("One table follows per component, in the
order the shipped keys sort") does not describe a single global sort key; measured against the
`#### ` headings at `e4e6a40`, the component tables from `blockquote` through `table` (excluding the
form-validation cluster that follows `table`, which the base commit already orders by a different,
narrative grouping) sort alphabetically by component name, and `fixed` and `sticky` (added by an
earlier round of this campaign) already sit at their alphabetically correct positions inside that
run (`fixed` between `figure` and `g`; `sticky` between `row-gap` and `table`). `position` sorts
alphabetically between `offset` and `reboot` in that same run (`offset` < `position` < `reboot`),
so the `#### position` table moved there, from its earlier position between `placeholder` and
`icon-link`, which sits outside the alphabetical run entirely.

### Claim 2: the log headers

`tools/mutate.py` (copied to `tmp/units/upl-instruments-3/tools/mutate.py`) now writes, into each
mutation log's header: `# copy: <root>` naming the fresh-copy path the run executed in, and
`# sha256 before: <digest>` and `# sha256 after restore: <digest>` for the mutated file, computed
before the mutation is applied and after the restore in `finally`, with `# equal=True` or
`# equal=False`. Every log this round records `equal=True`. The header write moved after the
`finally` block so the restored file's digest is available before the header is composed.

## Instruments

`/home/user/veneer-upl/tmp/units/upl-instruments-3/`:

- `tools/`: copied from `upl-instruments-2/tools`, with every `upl-instruments-2`,
  `upl-shared-2.patch`, and `upl-unlisted-2.patch` path rewritten to its round-3 name; `mutate.py`
  rewritten for the SHA-256 header fields; `mutations-round3.sh` added, running the round's own
  controls and mutations (`control-sections-3`, `max-width-cap-dropped`, `control-setup-styles-3`,
  `edges-emptied`, `viewport-cases-emptied`, `scroller-offset-zero`).
- `logs/`: `fresh-<gate>.log.txt` per gate (from the corrected `fresh.sh` run) and
  `logs/mutations/<name>.log.txt` per control and mutation.
- `round-delta.diff`: each owned file round 2 against round 3, derived from `tmp/units/upl-2.diff`'s
  full-file dump reconstructed against the worktree's current owned files, plus `git diff` for the
  shell partial.
- `round-delta-shared.diff`: round 2's shared and unlisted patches applied to a fresh `e4e6a40` copy,
  against round 3's, over every shared and unlisted file.
- `fresh-run-2.log.txt`: the corrected, fully green gate-chain run this report cites.

`tmp/probe/` was rebuilt several times over the round (`land`, `fresh`, and throwaway verification
copies for the self-correction and the final `git apply --check`) and was deleted before this report
was written.

## Failing-first and after

- The `check` gate. Before the self-correction, the fresh copy's `check` gave exit 2 with the
  `TS2724` and `TS7031` diagnostics named in § Deviation state. After re-applying the three owned
  files' round-3 edits directly to the worktree and rebuilding the fresh copy: exit 0, no diagnostic
  (`logs/fresh-check.log.txt`).
- `max-width-cap-dropped` and the setup binding-case controls: each is a first red the round adds; no
  earlier run of these exact mutations exists.

## Gates on the fresh copy

`tools/fresh.sh`, the corrected run (`fresh-run-2.log.txt`), after the self-correction:

| Gate | Command | Exit | Result line |
| --- | --- | --- | --- |
| format | `npm run format:check` | 0 | `All matched files use the correct format.` |
| lint | `npm run lint:check` | 0 | no diagnostic |
| check | `npm run check` | 0 | no diagnostic |
| build | `npm run build:src` | 0 | build succeeded |
| style proofs | `npx vitest … tests/src/styles/utilities/sizing.test.ts tests/src/styles/utilities/position.test.ts tests/src/styles/utilities/visually-hidden.test.ts tests/src/styles/utilities/visibility.test.ts tests/src/styles/components/position.test.ts` | 0 | `Tests  42 passed (42)` |
| setup tables | `npx vitest … --project setup tests/setupStyles.test.ts` | 0 | `Tests  110 passed (110)` |
| section proofs | `npx vitest … --project app:browser tests/app/browser/sections/SizingSection.test.ts tests/app/browser/sections/PositionSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Tests  18 passed (18)` |
| test:conformance | `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| test:service | `npm run build:src:styles && npm run test:service` | 0 | `Tests  18 passed (18)` |
| test:guides | `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| test:policy | `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| test:setup | `npm run test:setup` | 0 | `Tests  251 passed (251)` |
| test:setup:browser | `npm run test:setup:browser` | 0 | `Tests  66 passed (66)` |

`git apply --check` lines from `fresh-run-2.log.txt`: `apply-check shared at base exit=0`,
`apply-check unlisted at base exit=0`, and, after both patches were reversed and the tracked files
other than the owned shell partial read back at the base (`tracked files other than the owned shell
partial at base exit=0`), `apply-check shared after return to base exit=0` and `apply-check unlisted
after return to base exit=0`. A separate final check against a fresh `e4e6a40` stage (untouched by
any run) gave the same two `apply-check` results.

## Touched files

Owned, edited directly in the worktree: `app/browser/styles/_shell.scss` (modified, tracked);
`tests/src/styles/utilities/position.test.ts` (the `TRANSLATION_BOX` import and substitution);
`tests/src/styles/utilities/sizing.test.ts` (the `SIZING_STEP_CASES` rename and the
`PLACEMENT_CONTAINER` composition); `tests/app/browser/sections/SizingSection.test.ts` (the
`SIZING_STEP_CASES` rename). Unchanged from round 2: `src/styles/components/_position.scss`,
`src/styles/utilities/_position.scss`, `src/styles/utilities/_sizing.scss`,
`src/styles/utilities/_visibility.scss`, `src/styles/utilities/_visually-hidden.scss`,
`app/browser/sections/PositionSection.ts`, `app/browser/sections/SizingSection.ts`,
`app/browser/sections/VisibilitySection.ts`, `tests/app/browser/sections/PositionSection.test.ts`,
`tests/app/browser/sections/VisibilitySection.test.ts`,
`tests/src/styles/components/position.test.ts`, `tests/src/styles/utilities/visibility.test.ts`,
`tests/src/styles/utilities/visually-hidden.test.ts`.

Report-only patches, each a `git diff` with an `index` line per file against `e4e6a40`, superseding
the round-2 patches whole:

- `tmp/units/upl-shared-3.patch`, file list equal to the Shared row named in
  `b-utilities-upl-brief.md` and `upl-brief-2.md`.
- `tmp/units/upl-unlisted-3.patch`: `tests/setupBrowser.test.ts` alone, unchanged from round 2 (no
  round-3 finding touched it, so the patch is byte-identical to `upl-unlisted-2.patch`; the SHA-256
  values match: `d025920ecd5aa4f21e5fe9e7c047b8014d52dc1dc67703e60439dc215b429c90`).

SHA-256: `upl-shared-3.patch`
`7b83afc0afee344deba3dad4009b53027867845a8bf8e161a6bb6c3401883c04`; `upl-unlisted-3.patch`
`d025920ecd5aa4f21e5fe9e7c047b8014d52dc1dc67703e60439dc215b429c90`.

Review evidence: `tmp/units/upl-3.diff` (`git diff` for `_shell.scss`, then `git diff --no-index
/dev/null <path>` per untracked owned file) and `tmp/units/upl-3-status.txt` (`git -C
/home/user/veneer-upl status --porcelain`).

## What this round could not close

- The `#### ` heading order after `table` and before `placeholder` (the form-validation cluster and
  the `card`, `breadcrumb`, `pagination`, `badge`, `progress`, `list-group`, `btn-close` group) does
  not follow the same alphabetical rule as the `blockquote`–`table` run; § The ledger table's
  position records that reading without correcting the cluster, because the brief scopes only the
  `#### position` table's placement and names no other heading as a finding to close.
- `TABLE_RESPONSIVE_CASES`'s non-zero breakpoint filter is not routed through `BREAKPOINT_INFIXES`
  (round-2 deviation, item 4); this round carries no finding against it and does not touch it.

`tests/setupBrowser.test.ts` sits outside the Shared row, unchanged from round 2, returned again as
`tmp/units/upl-unlisted-3.patch`. The shared and unlisted patches both apply cleanly to `e4e6a40`
with `git apply --check`. The section proofs' execution population is one viewport under the
`app:browser` project at each of two variant widths (390 and 1280); the journey covers those
variants. The frame contains and clips a viewport-sized box while the percentage caps (the width and
height maximum sizes) resolve against their containing blocks, which is why the width cap's box now
reads half the frame's width once its containing block is the `.w-50` line rather than the frame
itself; the viewport units stay viewport-relative regardless of that containing block.
