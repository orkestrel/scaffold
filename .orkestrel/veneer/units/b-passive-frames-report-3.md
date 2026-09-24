# PASSIVE-FRAMES (`fp`) report, round 3

This report covers unit PASSIVE-FRAMES (`fp`), run by `opus` on Opus 5.5 as a native subagent in
`/home/user/veneer-fp`, on branch `unit/fp` from `cf5e447`. The three items brief 3 carries are closed. Nothing is
committed.

## Changes

**The disabled check (claim 4).**
- **Change:** the disabled case in `tests/app/browser/sections/ButtonGroupSection.test.ts` asserts that each host
  carries exactly one variant class. It then asserts that every host carries the same one.
- **Red run:** the mutation gives every host of the `Disabled buttons` specimen the `btn-primary btn-secondary`
  class pair. The disabled case then fails at the one-class assertion (`ButtonGroupSection.test.ts:287`).
  - Reason: `expected [ …(6) ] to strictly equal []`.
  - Result: exit 1, `Tests  1 failed | 7 passed (8)`, with the file restored byte for byte.
  - Log: `.orkestrel/veneer/units/fp-instruments/fp-mutations-3.log.txt`. Driver: `.orkestrel/veneer/units/fp-instruments/fp-mutate-3.py`.

**The bar (F-B).**
- **`DRIVEN_CONTRAST` TSDoc (`tests/setup.ts`):** states that the constant holds the least luminance ratio a
  photographed driven fill keeps from its row's rest fill. It places the bar above the unphotographed list-group
  presses (`dark` role 1.08 at the `dark-390` variant, `light` role 1.01 at the `light-1280` variant). It places the
  bar below the photographed fills (1.45 to 2.12).
- **Case comment (`tests/app/browser/integration.test.ts`):** states that each row's driven fill is read against its
  rest as a luminance ratio, and that the photographed fills each clear the bar.
- **Removed:** the audit history and the perceptual claim, from both sites.

**The guide (R-B).** `fp-shared-3.patch` supersedes `fp-shared-2.patch` whole. Its § Tests sentence reads "the
registry proof refuses that stem through its mode-token pattern", and it no longer backticks the `MODE_TOKEN`
constant. Nothing else in the patch changed.

## Gates

Each worktree gate ran in `/home/user/veneer-fp` through `.orkestrel/veneer/units/fp-instruments/fp-gate-2.sh`, which writes the command at the
head of its log and the exit at its foot.

| Log | Command | Exit | Result line |
| --- | --- | --- | --- |
| `fp-3-sections.log.txt` | `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/sections/ButtonGroupSection.test.ts` | 0 | `Tests  8 passed (8)` |
| `fp-3-format.log.txt` | `npx oxfmt --config .oxfmtrc.json --check tests/app/browser/sections/ButtonGroupSection.test.ts tests/setup.ts tests/app/browser/integration.test.ts` | 0 | `All matched files use the correct format.` |
| `fp-3-lint.log.txt` | `npm run lint:check` | 0 | no diagnostic printed |
| `fp-3-check.log.txt` | `npm run check` | 0 | no diagnostic printed |
| `fp-3-guides.log.txt` | `npm run test:guides`, run in `tmp/probe/fp-scratch`, a copy of the worktree with `fp-shared-3.patch` applied and `node_modules` hard-linked. The copy is deleted. | 0 | `Tests  20 passed (20)` |

## Evidence

These files are under `/home/user/veneer-fp/tmp/units/`:

- `fp-3.diff`: all rounds against `cf5e447`, with `7 files changed, 1003 insertions(+), 49 deletions(-)`.
- `fp-3-status.txt`: the same owned files as round 2.
- `fp-shared-3.patch`.
- `fp-mutations-3.log.txt`.
- The `fp-3-*.log.txt` gate logs.

No row is stopped.
