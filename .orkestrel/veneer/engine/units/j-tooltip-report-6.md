# J-TOOLTIP round 6 (the second merge): report

Retained 2026-09-24 from the writer's returned report (`opus` on Opus 5.5, agent ac01697e5b3344cdc, under `j-tooltip-brief-6.md`, worktree `tmp/worktrees/tooltip`; the chain as `j-tooltip-acceptance-6.sh` and `-6.log.txt`).

I've finished round 6: the merge with `main` at `2d95b37` is resolved with both sides kept, and the full landing chain passed once with every step at exit 0. Nothing is committed, and `git merge --abort` was not run.

## Resolution per file
In every file I placed the offcanvas side first and the tooltip side after it. The one exception is the sorted list in `index.test.ts`, which follows sort order. Offcanvas is already on `main` and the tooltip lands after it, so this matches each file's append-as-landed convention. It also makes the landing diff against `main` pure additions. The brief's other suggested order (offcanvas after tooltip) was open to me; I chose landing order.

- **`src/browser/index.ts` (one hunk):** `main`'s `export * from './Offcanvas.js'`, then the tooltip's `./sanitizers/NativeSanitizer.js` and `./Tooltip.js`.
- **`src/browser/constants.ts` (one hunk):** `main`'s `OFFCANVAS_EVENTS`, `_CLASSES`, `_ATTRIBUTES`, `_SELECTORS`, and `_DEFAULTS`, closed with their own `})`. Then the tooltip's `TOOLTIP_*` tables and the sanitizer allowlist, which close with the shared `})`. The import block had merged on its own and carries both sides' types.
- **`src/browser/validators.ts` (two hunks):**
  - Imports: `OffcanvasEventMap` then `SanitizeTargetInterface`, in alphabetical order.
  - Guards: `main`'s `isOffcanvasEvent` with its own `catch` and closing brace, then the tooltip's `isTooltipEvent` and `isSanitizeTarget`.
- **`tests/src/browser/index.test.ts` (two hunks, sorted list):**
  - `'NativeSanitizer'` from the tooltip side, then the `OFFCANVAS_*` names and `'Offcanvas'` from `main`.
  - `'isOffcanvasEvent'` from `main`, then `'isSanitizeTarget'` from the tooltip side.
- **`guides/veneer.md` (two blocks; your script had already resolved the Compatibility table):**
  - Examples: `main`'s `Offcanvas` fence, then the tooltip's `Tooltip` fence.
  - Engine sections: `#### Offcanvas` from `main`, then `#### Tooltip`, so the order is Toast, Offcanvas, Tooltip, then `## Styles`.
  - The Surface table had merged on its own. It holds 283 rows with no duplicate names, and both engines' rows are present.
  - I ran oxfmt on this file alone.
- **Unchanged:** the styles landing and every non-conflicted file. `parsers.ts` and `types.ts` merged on their own.

All five files are staged, and `git diff --name-only --diff-filter=U` returns nothing.

## Landing chain (`tmp/j-tooltip/acceptance-6.sh`, one run)
```
chromium 153.0.8010.12
format exit=0 | npm run format:check
lint exit=0 | npm run lint:check
check exit=0 | npm run check
guides exit=0 | npm run test:guides
policy exit=0 | npm run test:policy
browser exit=0 | npm run test:src:browser
core exit=0 | npm run build:src:core
styles exit=0 | npm run build:src:styles
build exit=0 | npm run build:src:browser
conformance exit=0 | npm run test:conformance
setup exit=0 | npm run test:setup
```
The test steps reported these counts:
- **guides:** 20 passed (20)
- **policy:** 109 passed, 1 skipped (110)
- **browser:** 799 passed (799)
- **conformance:** 26 passed (26)
- **setup:** 318 passed (318)

## `git status --short`
`git status` lists the whole staged merge, because every incoming `main` change is staged while a merge is in progress. The five resolved files are among those entries, all staged:
- `M  guides/veneer.md`
- `M  src/browser/constants.ts`
- `M  src/browser/index.ts`
- `M  src/browser/validators.ts`
- `M  tests/src/browser/index.test.ts`

The other staged entries are `main`'s own changes: `Offcanvas.ts` and its tests, Backdrop, Isolation, Delegate, the styles and app files, the setup files, and `ROADMAP.md`. There are no unstaged changes, and nothing untracked outside `tmp/`.

## `git diff --stat MERGE_HEAD` (the landing diff)
```
 guides/veneer.md                                   |  311 ++-
 src/browser/Placement.ts                           |   46 +-
 src/browser/Tooltip.ts                             |  844 ++++++++
 src/browser/constants.ts                           |  181 ++
 src/browser/helpers.ts                             |  106 +-
 src/browser/index.ts                               |    2 +
 src/browser/parsers.ts                             |  137 +-
 src/browser/sanitizers/NativeSanitizer.ts          |   45 +
 src/browser/types.ts                               |   48 +-
 src/browser/validators.ts                          |   55 +
 tests/src/browser/Placement.test.ts                |   54 +
 tests/src/browser/Tooltip.test.ts                  | 2205 ++++++++++++++++++++
 tests/src/browser/helpers.test.ts                  |  115 +-
 tests/src/browser/index.test.ts                    |   18 +
 tests/src/browser/parsers.test.ts                  |  102 +
 .../src/browser/sanitizers/NativeSanitizer.test.ts |  182 ++
 tests/src/browser/validators.test.ts               |   75 +
 17 files changed, 4496 insertions(+), 30 deletions(-)
```

## Deviation state
There are none: no engine logic or test assertion changed, the two sides never disagreed about behaviour, and no gate went red. I made no `prove` call.
