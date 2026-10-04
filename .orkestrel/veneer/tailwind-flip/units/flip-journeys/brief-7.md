# Unit flip-journeys-7 — the partition's cost and the seven journey failures

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`, in `/home/user/veneer` on branch `ccr-d15a48b1-yyyll6`. You are the sole writer for tracked files.

## Objective

Finish unit U6 from the tree the sixth run left uncommitted (`/home/user/scaffold/tmp/codex/flip-journeys-6-last.md`; the complete report `/home/user/veneer/tmp/units/flip-journeys/sixth-report.md`; the failures `/home/user/veneer/tmp/units/flip-journeys/sixth-failures.txt`), under the earlier briefs (`flip-journeys-brief.md` with its appended rulings, `flip-journeys-2` to `flip-journeys-6`) and the two tasks in § Tasks. The partition case passes at both widths with every control; the statechart rows, the 23 triples, the header reading, `check`, `lint:check`, `format:check`, and `test:setup:browser` (134) pass. `test:journey` reads 82 passed, 7 failed, 3 skipped in 628.5 s; the partition case alone takes 268.3 s inside the full run against 73.6 s focused.

## Tasks

1. **Cut the partition case's cost by reading one element per signature.** Two elements with the same tag, the same sorted class list, the same nearest `data-bs-theme` ancestor value, and the same open state carry the same declarations and the same winners; their readings differ only in layout-resolved longhands, which the skips already drop. Read the comparison on the first element of each signature and count the elements each signature covers; report the number of signatures against 8112 elements, the case's focused seconds, and its seconds inside the full run. Keep the controls and the zero-violation assertion. Keep `it.skipIf(VARIANT !== 'light-1280')` with both widths inside the case.
2. **Diagnose the seven journey failures before anything is changed.** For each (dark-1280 paired engine states `Toggle navigation lost its panel sentence`; light-390 J8 `Named region "Uploads" is not visible`; light-390 paired engine states `Shipping and delivery renders an empty panel`; light-390 accordion motion=false enter-burst waits; dark-390 paired engine states `Depot hours lost its panel sentence`; dark-390 tooltip motion=true `Refusal emitted a delayed lifecycle event`; dark-390 collapse motion=false enter-burst waits), establish the cause with a reading, not a guess:
   - Run `npm run test:journey` once with the partition case excluded (`--testNamePattern` with a negative lookahead on its title, or the exclusion mechanism the project offers; no source change) and record which of the seven still fail. A failure that clears without the partition case is load-induced (the 268 s case starves the engine's timers in the parallel variants) and is cured by task 1; report the wall time of that run as the budget reading without the partition.
   - For J8 and the two panel failures, read the element in the failing state under the face the case was on: its bounding box, `display`, `visibility`, `opacity`, `overflow` of its ancestors, and its text content; say whether the region or panel is off-screen, zero-sized, hidden, or empty, and which face and which class (a chrome replacement from U5b, a curated copy, a withheld utility, a Tailwind preflight declaration) produces that state. A reading that shows a real break under a Tailwind face is reported with the element, the longhand, the three faces' values, and the sheet rule that wins; it is not fixed in this unit (the fix unit after the falsify round owns `app/` and the sheet).
   - Record whether each failure reproduces on the committed base `a73b951` for the same case and variant (`git stash` is forbidden: read the base through `git worktree add /home/user/veneer/tmp/units/flip-journeys/base a73b951`, `npm ci` is forbidden there too, so symlink or copy `node_modules` is not allowed either; if a base run cannot be made without an install, say so and skip this step).
3. **Then run the acceptance list** of the `flip-journeys-3` brief in order and report every exit. `test:journey` must read zero failures outside the set task 2 established as pre-existing or real-break (and that set is reported, not fixed); the wall time is reported against 235 s with the partition's share.

## Scope

As the earlier briefs: owned, the showcase section of `tests/setupBrowser.ts`, the showcase describes of `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`, `tmp/units/flip-journeys/**`; the engine section and `actOnDisclosureControl` stay unchanged; `app/**`, `src/**`, the sheets, the records, and every other test file are off-limits; no timeout raised, no retry added, no case deleted; nothing committed.

## Return shape

Finding first: the signature count and the partition's seconds (focused and in the full run); the seven failures with their established causes (load, real break with its reading, pre-existing on the base, or undetermined with what is missing); the acceptance exits; the journey wall time with and without the partition; `git status --porcelain`.

## Deviation contract

As the earlier briefs; a diagnosis that needs a change outside Owned is reported, not made.
