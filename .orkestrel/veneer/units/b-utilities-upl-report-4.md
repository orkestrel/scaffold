# UTIL-PLACEMENT (`upl`) report, round 4

Executor: `builder` on Sonnet, a native Claude subagent, the sole writer in
`/home/user/veneer-upl` (branch `unit/upl`, uncommitted over `e4e6a40`). Brief:
`/home/user/veneer-upl/tmp/units/upl-brief-4.md`, superseding `upl-brief-3.md` for this round; the
earlier briefs stay in place unedited.

Deviation state: no stop taken. Every finding closed with the tree's own facts; the geometric cap
mutation reddens at the width comparison the brief predicts; both patches apply to `e4e6a40` with
`git apply --check`.

## History the retained logs carry

`/home/user/scaffold/.orkestrel/veneer/units/upl-instruments-3/fresh-run.log.txt` is round 3's
first, uncorrected `fresh.sh` run, before that round's self-correction, retained beside the
corrected `fresh-run-2.log.txt` the round-3 report cites:

- **A format failure.** `format exit=1 :: Format issues found in above 1 files. Run without
  --check to fix.`
- **A passing `check`.** `check exit=0`, with no diagnostic, on the same run whose format gate
  failed and whose patch reversal, named next, failed.
- **A failed patch reversal.** `reverse unlisted exit=0` followed by `reverse shared exit=1`, with
  `error: patch failed: guides/veneer.md:4305` and `error: guides/veneer.md: patch does not apply`,
  and the same failure repeating against every file the shared patch touches on the `apply-check`
  lines that follow. This run's fresh copy predates round 3's self-correction, so the mismatch this
  reversal exposes sits between that stage's fresh copy and the shared patch it applied; the
  round-3 report's own account of the self-correction (re-applying
  `tests/src/styles/utilities/position.test.ts`, `tests/src/styles/utilities/sizing.test.ts`, and
  `tests/app/browser/sections/SizingSection.test.ts` directly to the worktree) is what turned this
  run's log into the clean `fresh-run-2.log.txt` the round-3 report cites.
- **The run that read `TS2724` and `TS7031`.** The round-3 report's § Deviation state names these
  diagnostics from the first `check` run against the land copy directly (before that round built a
  fresh copy at all), while `tests/src/styles/utilities/position.test.ts`,
  `tests/src/styles/utilities/sizing.test.ts`, and `tests/app/browser/sections/SizingSection.test.ts`
  still carried their round-2 shape in the worktree.
  No log under `upl-instruments-2/` or `upl-instruments-3/` retains that run; this round searched
  both directories and reports the absence rather than a citation it cannot back.

This round's own `fresh.sh` run left every gate green on the first attempt
(`tmp/units/upl-instruments-4/fresh-run.log.txt`); no self-correction was needed.

## Findings closed

### The round delta artifact

Site: `tmp/units/upl-instruments-4/round-delta.diff` and `round-delta-shared.diff`.

Reconstructed the round-2 owned files by extracting `e4e6a40` into a scratch directory and applying
the owned hunks of `upl-2.diff` there (the whole file, because every hunk in that dump is an owned
file), then wrote `round-delta.diff` as `git diff --no-index` between that reconstruction and the
worktree, one invocation per owned file. Only `app/browser/styles/_shell.scss`,
`tests/app/browser/sections/SizingSection.test.ts`, `tests/src/styles/utilities/position.test.ts`,
and `tests/src/styles/utilities/sizing.test.ts` produced output; the `_shell.scss` hunk shows the
comment change alone (the sentence added in round 3 about the bounded height giving a percentage
height or offset a definite height to resolve against), matching round 3's F-SHELL finding with no
further edit this round.

`round-delta-shared.diff` was built the same way between two extracts of `e4e6a40`, one with the
round-3 shared and unlisted patches applied, the other with the round-4 shared and unlisted
patches applied: the sole difference is `tests/setupStyles.test.ts`, showing the `TRANSLATION_BOX`
import beside `PLACEMENT_CONTAINER` and the added assertion, which is exactly item 4's edit and
nothing else.

### The geometric cap mutation

Site: `src/styles/utilities/_sizing.scss`, the `@include utility(mw, max-width, $whole, $infix);`
line inside the Sizing mixin's step block.

Added to `tools/mutate.py`'s run list (invoked directly rather than through a group script) the
mutation `max-width-rule-dropped`: that line removed. Ran the Sizing section proof
(`tests/app/browser/sections/SizingSection.test.ts` beside `PositionSection.test.ts` and
`VisibilitySection.test.ts`, the `app:browser` project) in the fresh copy. `app/browser/main.ts`
imports `../../src/styles/index.scss` directly, so the `app:browser` project compiles the SCSS live
through Vite rather than reading `dist/src/styles/index.css`; the section proofs therefore needed
no rebuild for this mutation, unlike the `styles`-project mutations that read the built file.

Reading: `2 failed | 11 passed (13)`, both failures at the width comparison
(`for (const [capped, limit] of reading.caps) expect(capped).toBe(limit)`):
`expected 390 to be 195` at the 390 variant and `expected 1280 to be 640` at the 1280 variant. With
the rule dropped, the `.mw-100` box no longer caps against its containing block, so it grows to the
viewport width (390, 1280) instead of holding at half the frame's width (195, 640). Logged as
`logs/mutations/max-width-rule-dropped.log.txt`. The unmutated control from this round's own
`fresh.sh` run (the `sections` gate, `18 passed (18)`) is green beside it.

`max-width-cap-dropped` and its log (`logs/mutations/max-width-cap-dropped.log.txt`) are kept from
round 3, unchanged.

`tools/caps-reading.sh`, re-run in the fresh copy as `caps-reading-4.log.txt`: at 390, `CAPS 390
[[195,195],[192,192]] [390,390,896,896] 390`; at 1280, `CAPS 1280 [[640,640],[192,192]]
[1280,1280,896,896] 1280`. The unmutated cap reads half the frame's width at each variant, matching
round 3's reading with no drift.

### The round-2 setup controls re-run

Ran `setup-share-wrong`, `setup-level-wrong`, `setup-infix-dropped`, `setup-clip-wrong`,
`setup-width-wrong`, and `start-unfocused` through `mutate.py` in the fresh copy, with the exact
edits and commands `upl-instruments-2/tools/mutations.sh` lines 77 to 82 give. Each reddens the
case its round-2 log names, with the unmutated `setup-styles` and `setup-browser` controls
(`control-setup-styles-4`, `control-setup-browser-4`) green beside them, under
`logs/setup/`:

| Control | Reading | Red case |
| --- | --- | --- |
| `control-setup-styles-4` | `110 passed (110)` | none |
| `control-setup-browser-4` | `66 passed (66)` | none |
| `setup-share-wrong` | `1 failed \| 109 passed (110)` | `binds the placement steps, values, and fixtures to the inventory, the ramp, and the journey` |
| `setup-level-wrong` | `1 failed \| 109 passed (110)` | the same binding case |
| `setup-infix-dropped` | `2 failed \| 108 passed (110)` | `binds table case families and maximum widths to the inventory and ramp`, and the binding case |
| `setup-clip-wrong` | `1 failed \| 109 passed (110)` | the binding case |
| `setup-width-wrong` | `1 failed \| 109 passed (110)` | the binding case |
| `start-unfocused` | `1 failed \| 65 passed (66)` | `mounts a focused start control, so a traversal reaches the first control mounted after it` |

### The translation fixture's binding

Site: `tests/setupStyles.test.ts`, the case `binds the placement steps, values, and fixtures to the
inventory, the ramp, and the journey`.

`TRANSLATION_BOX` imported beside `PLACEMENT_CONTAINER`. In the binding case, directly after
`expect(PLACEMENT_CONTAINER).toContain('position: relative')`, added
`expect(TRANSLATION_BOX).toMatch(/^width: \d+px; height: \d+px$/u)`.

Control `translation-box-malformed` (`TRANSLATION_BOX` set to `'width: 100px'` in place of
`'width: 100px; height: 40px'`): `1 failed | 109 passed (110)`, red on the binding case alone
(`logs/setup/translation-box-malformed.log.txt`).

## Instruments

`/home/user/veneer-upl/tmp/units/upl-instruments-4/`:

- `tools/`: copied from `upl-instruments-3/tools`, with every `upl-instruments-3`,
  `upl-shared-3.patch`, and `upl-unlisted-3.patch` path rewritten to its round-4 name; a
  `caps-reading-4.sh` copy of `caps-reading.sh` pointed at the fresh copy in place of the land copy.
- `logs/`: `fresh-<gate>.log.txt` per gate, `logs/mutations/<name>.log.txt` for
  `max-width-rule-dropped` and the kept `max-width-cap-dropped`, `logs/setup/<name>.log.txt` for the
  round-2 controls' re-run and `translation-box-malformed`, and `caps-reading-4.log.txt`.
- `round-delta.diff` and `round-delta-shared.diff`, both described in § Findings closed.
- `fresh-run.log.txt`: this round's gate-chain run, fully green on the first attempt.

`tmp/probe/` and the scratch extracts this round built outside the worktree were deleted before
this report was written.

## Gates on the fresh copy

`tools/fresh.sh`, `fresh-run.log.txt`:

| Gate | Command | Exit | Result line |
| --- | --- | --- | --- |
| format | `npm run format:check` | 0 | `All matched files use the correct format.` |
| lint | `npm run lint:check` | 0 | no diagnostic |
| check | `npm run check` | 0 | no diagnostic |
| build | `npm run build:src` | 0 | build succeeded |
| style proofs | `npx vitest --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/sizing.test.ts tests/src/styles/utilities/position.test.ts tests/src/styles/utilities/visually-hidden.test.ts tests/src/styles/utilities/visibility.test.ts tests/src/styles/components/position.test.ts` | 0 | `Tests  42 passed (42)` |
| setup tables | `npx vitest --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `Tests  110 passed (110)` |
| section proofs | `npx vitest --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SizingSection.test.ts tests/app/browser/sections/PositionSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` | 0 | `Tests  18 passed (18)` |
| `test:conformance` | `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `test:service` | `npm run build:src:styles && npm run test:service` | 0 | `Tests  18 passed (18)` |
| `test:guides` | `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `test:policy` | `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `test:setup` | `npm run test:setup` | 0 | `Tests  251 passed (251)` |
| `test:setup:browser` | `npm run test:setup:browser` | 0 | `Tests  66 passed (66)` |

`git apply --check` lines from `fresh-run.log.txt`: `apply-check shared at base exit=0`,
`apply-check unlisted at base exit=0`, and, after both patches were reversed and the tracked files
other than the owned shell partial read back at the base (`tracked files other than the owned shell
partial at base exit=0`), `apply-check shared after return to base exit=0` and `apply-check unlisted
after return to base exit=0`.

## Touched files

Owned files: unchanged from round 3 (`git diff e4e6a40 -- app/browser/styles/_shell.scss` and the
untracked owned files match the round-3 report's § Touched files exactly; this round carries no
owned-file finding).

Report-only patches, each a `git diff` with an `index` line per file against `e4e6a40`, superseding
the round-3 shared patch whole:

- `tmp/units/upl-shared-4.patch`, file list equal to the Shared row named in
  `b-utilities-upl-brief.md`, `upl-brief-2.md`, and `upl-brief-3.md`; retained at
  `/home/user/scaffold/.orkestrel/veneer/units/upl-shared-4.patch`.
- `tmp/units/upl-unlisted-4.patch`: `tests/setupBrowser.test.ts` alone, byte-identical to
  `upl-unlisted-3.patch` (no round-4 finding touched it).

SHA-256: `upl-shared-4.patch`
`5f44125fa7e9c9d9c0a0fdc5250cc46bd929e8437657e4db46f969e301520c88`; `upl-unlisted-4.patch`
`d025920ecd5aa4f21e5fe9e7c047b8014d52dc1dc67703e60439dc215b429c90`.

Review evidence: `tmp/units/upl-4.diff` (`git diff` for `_shell.scss`, then `git diff --no-index
/dev/null <path>` per untracked owned file) and `tmp/units/upl-4-status.txt` (`git -C
/home/user/veneer-upl status --porcelain`).

## What this round could not close

Nothing named by this round's items was left open. The round-3 report's own § What this round
could not close (the heading order after `table` and before `placeholder`, and
`TABLE_RESPONSIVE_CASES`'s non-zero breakpoint filter) still stands; this round carries no finding
against either and does not touch them.
