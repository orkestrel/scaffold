# Unit CLOSE-OUT report, round 2 (the `xo` unit prefix)

The `opus` role on Opus 5.5, as a native subagent in the `/home/user/veneer-xo` worktree (the
`unit/xo` branch, with the round-1 edits over the `ec98064` commit). Nothing committed, installed, or
pushed. The unit hit no deviation. The `xo-unscoped.patch` file stands unchanged.

## X-a: the carousel populations

- Change: in the `tests/app/browser/sections/CarouselSection.test.ts` file, each population filters
  the names in the `CAROUSEL_SPECIMENS` table through a class selector run on the mounted specimen
  that the `readSpecimen` helper returns:
  - indicated carousels: the `.carousel-indicators` selector;
  - captioned carousels: the `.carousel-caption` selector;
  - inverted carousels: the `.carousel.carousel-dark` selector;
  - fading carousels: the `.carousel.carousel-fade` selector;
  - advancing carousels: the `.carousel-item-next` selector.

  No population reads the markup string. The comments say that membership holds whatever order or
  company a class keeps in its class list.
- Controls: the `.orkestrel/veneer/units/xo-instruments/xo-plant-carousel-2.py` script plants a copy of the captioned specimen
  into the table alone.
  - The `reordered` control puts an inert `vn-control` class ahead of each class the populations
    read.
  - The `extra` control puts the inert class after each of them.
  - Each copy carries the defects that make membership observable: its first indicator loses the
    active state, and its carousel takes the `carousel-dark` class over the dark pictures, so its
    black captions fail the 4.5:1 floor.
- Red runs against the round-1 proof, which used the string predicates:
  - The reordered control enters neither population. The indicator case and the caption case both
    stay green.
  - The extended control misses the indicator population, so the indicator case stays green. It
    enters the caption population, because the caption predicate matched a prefix, so the caption
    case fails.
- Runs against the selector proof:
  - Each control fails the indicator case with the
    `expected [ [ '#control-carousel', …(2) ], …(2) ] to deeply equal …` message.
  - Each control fails the caption case with the
    `expected [ { …(3) }, { …(3) }, { …(3) } ] to deeply equal []` message.
  - So each control enters both populations.
- In every planted run, the advancing case also fails. That is the pre-existing failure whenever any
  specimen is added, which OVERLAY-FRAMES carries.
- Green: the carousel gate in § Gates.

## X-b: the stated link order

The changes are in the `.orkestrel/veneer/units/xo-shared-2.patch` file, which replaces the `xo-shared.patch`
file entirely.

- The § Showcase clause still states the barrel load order, and covers only the utility regions
  and the `### … utilities` sections. The § Tests clause is restated as the order the list has: the
  utility links follow the sections that document them. Each section's own proof comes first, and
  the helper and companion proofs that section documents follow it.
- The stretched link helper link moved beside the icon link, ratio, and vertical rule links. It
  takes the position § Helper classes gives it: after the icon link link and before the ratio link.
- Every other hunk matches the round-1 shared patch.

## X-c: the ledger key

- Change: the `holds each compatibility ledger row once` case in the `tests/guides.test.ts` file keys
  each row by its `component`, `category`, `obligation`, and `proof` fields. The key leaves out the `status`
  field.
- Red run against the round-1 key, which compared whole rows: I planted a copy of the toggle
  obligation's ledger row whose Status cell reads `shipped`. The `npm run test:guides` command exits 0
  with the `Tests  20 passed (20)` line, so the round-1 key missed that copy.
- Runs against the key without Status:
  - The same Status-only copy exits 1 with the `Tests  1 failed | 19 passed (20)` line.
  - A verbatim copy also exits 1 with the `Tests  1 failed | 19 passed (20)` line.
  - Each failure is the `holds each compatibility ledger row once` case alone.
  - On the unmodified guide, the `npm run test:guides` command exits 0.

## Gates

The following gates ran; each entry gives the command, its exit, and its result line.

| Where | Command | Exit | Result line |
| --- | --- | --- | --- |
| Worktree | `npx oxfmt --config .oxfmtrc.json --check`, run over every changed owned file | 0 | `All matched files use the correct format.` |
| Worktree | `npm run lint:check` | 0 | silent |
| Worktree | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts` | 0 | `Tests  7 passed (7)` |
| Worktree | `npm run test:guides` | 0 | `Tests  20 passed (20)` |
| Scratch | `npm run check` | 0 | silent past the script echo |
| Scratch | `npm run test:guides` | 0 | `Tests  20 passed (20)` |
| Scratch | `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md` | 0 | `All matched files use the correct format.` |

The scratch copy sat under the `tmp/probe/` directory, with the `xo-shared-2.patch` and
`xo-unscoped.patch` patches applied. It was deleted after the runs. Its logs are the
`.orkestrel/veneer/units/xo-instruments/xo-2-scratch-*.log.txt` files.

## Artifacts

The unit's artifacts are these files under the `/home/user/veneer-xo/tmp/units/` directory.

- The `xo-2.diff` file and the `xo-2-status.txt` file: the owned changes and the worktree status. The
  diffstat line reads `16 files changed, 334 insertions(+), 199 deletions(-)`.
- The `xo-shared-2.patch` file: the `guides/veneer.md` changes against the `ec98064` commit. It
  passes the `git apply --check` command.
- The `xo-mutations-2.log.txt` file: each planted run's site, diff, command, exit, summary line, and
  failing case names. Each run's full output is in its `xo-mutation-<label>.log.txt` file.
- The instruments are the `xo-mutate-2.sh`, `xo-mutate-py-2.sh`, and `xo-plant-carousel-2.py`
  scripts.

## Touched files in this round

The following files changed in round 2.

- The `tests/app/browser/sections/CarouselSection.test.ts` file: every population comes from class
  selectors on the mounted specimens.
- The `tests/guides.test.ts` file: the ledger key leaves out the Status cell.
- The shared guide patch, `xo-shared-2.patch`: the restated § Tests clause and the moved stretched
  link helper link.
