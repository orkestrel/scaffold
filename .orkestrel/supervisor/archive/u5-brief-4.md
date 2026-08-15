# U5 micro round, second dispatch — successor to u5-brief-3.md

What changed and why: the first dispatch's brief assumed the two target tests render a rail row
to click. They do not — both mount with the bare `render()` helper, which carries no roster, so
no `Open build` button exists (the builder's deviation report, verified: sibling tests that
click that row all seed the roster first via `renderFleet(...)` at lines 207, 222, 237,
313-314). The correction: seed the roster the way the siblings do, then make the same
substitution.

## Role and engine

`builder`. Sole serial writer in `/workspace/supervisor` from clean committed baseline
**419aafb**. Perform directly, spawn nothing, no commits/pushes/installs.

## The change

In `tests/app/browser/ApplicationView.test.ts`, in exactly these two tests:

1. `places focus in the content that took over and returns it to the row it came from`: replace
   the bare `await render()` mount with the same roster-seeded mount the sibling drawer tests
   use (`renderFleet` with the fixture those siblings pass — copy their exact call shape), then
   replace `await attached?.open('build')` with `userEvent.click` on the rail row button whose
   accessible name begins `Open build`, and `attached?.select(PHASE)` with `userEvent.click` on
   the rendered stack row for `PHASE`. Keep every assertion and the existing comment.
2. `brings the closed drawer back out to return focus to the row below lg`: same substitution —
   roster-seeded mount, then `userEvent.click` the rail row (below `lg` it sits inside the
   drawer, which is the landing state). Keep every assertion.

Touch nothing else. If the roster-seeded mount changes an early assertion's truth (for example
an element that now exists earlier), stop and report the failing output verbatim — do not
weaken or reorder assertions.

## Scope

**Owned:** `tests/app/browser/ApplicationView.test.ts` only. Everything else off-limits.
Forbidden: the standing list; no new helpers; no assertion weakening; no fixture invention —
reuse the file's existing fixtures exactly.

## Acceptance criteria

1. Neither named test contains `attached?.open` or `attached?.select`; both seed the roster via
   the file's existing fixture idiom and drive state through `userEvent` presses on rendered
   rows.
2. `npm run test:app:browser -- tests/app/browser/ApplicationView.test.ts` green (all 27), run
   from `/workspace/supervisor`.

## Output

The diff, the test command and its summary line, `git status --porcelain`, deviations or none.
