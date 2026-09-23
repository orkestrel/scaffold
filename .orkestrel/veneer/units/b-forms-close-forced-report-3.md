# Unit B-FORMS-CLOSE-FORCED (`bff`), round 3 report

The validation forced-colours case passes alone and in its whole file. It reaches focus with the
file's own ring-case pattern (`control.focus()` and then `pressKeys('{ArrowRight}')`) instead of
forward Tab traversal. Its readings and its `:focus-visible` assertion are unchanged.

Writer: `opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bff`.
Rounds 1 and 2 stay in the worktree uncommitted and untouched.

## Failing run before the edit

The case failed alone with the traversal error. The command was
`npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/validation.test.ts -t "forced-colors outline"`.
It exited 1, and its output was:

```text
 ❯ |[object Object] (chromium)| tests/src/styles/components/validation.test.ts (21 tests | 1 failed | 19 skipped) 945ms
     × keeps the forced-colors outline on a focused 'valid' control, because the state ring writes no outline 759ms
 FAIL  ... validation.test.ts:379:2 > validation classes > keeps the forced-colors outline on a focused 'valid' control, because the state ring writes no outline
Error: Interactive target "Stated entry" is not reachable through forward Tab traversal:
 ❯ driveTraversal node_modules/@orkestrel/test/dist/src/browser/index.js:890:7
 ❯ tests/src/styles/components/validation.test.ts:387:10
      Tests  1 failed | 1 passed | 19 skipped (21)
```

The `valid` row runs first and fails with an empty trail. The `invalid` row runs after it and
passes. This matches the round-2 hypothesis: traversal needs a focused start, and a fresh frame has
none.

## Diff of the case (round 3 over round 2)

The following diff is the whole round-3 change to
`tests/src/styles/components/validation.test.ts`:

```diff
@@ imports from '@orkestrel/test/browser'
 	stageMedia,
-	traverseAccessible,
 } from '@orkestrel/test/browser'
@@ 'keeps the forced-colors outline on a focused $state control, because the state ring writes no outline'
 			const gauge = requireValue(container.querySelector('#focus-gauge'), 'No focus gauge')
-			expect(await traverseAccessible('Stated entry')).toBe(control)
+			// Focus is reached the way the ring cases reach it: the control takes focus and a key press
+			// follows, so it matches `:focus-visible` even as the first case in a fresh frame.
+			control.focus()
+			await pressKeys('{ArrowRight}')
 			expect(control.matches(':focus-visible')).toBe(true)
 			expect(readStyle(control, 'outline-style')).toBe('none')
```

The `traverseAccessible` import leaves with the call. Round 1 added it for this case alone, a grep
of the file found no other use, and `oxlint --deny-warnings` refuses an unused import. The
`pressKeys` import was already present.

## Decisions

- **Focus mechanism.** The case uses the file's `focus()` pattern, as the deviation contract
  allows. The file's ring cases already assert `:focus-visible` after that pattern, so the case
  keeps its `:focus-visible` assertion and reaches it the same way.
- **Case identity.** The `traverseAccessible` assertion `toBe(control)` is gone. It proved only that
  traversal reached the control. `requireValue` still binds `control` to the mounted input, and the
  `:focus-visible` assertion reads that same element.

## Criteria

1. **Before the edit.** The criterion's command exited 1 with the traversal error (see Failing run
   before the edit): `Tests  1 failed | 1 passed | 19 skipped (21)`.
2. **After the edit.**
   - The same command exited 0: `Tests  2 passed | 19 skipped (21)`.
   - `npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/validation.test.ts`
     exited 0: `Test Files  1 passed (1)`, `Tests  21 passed (21)`.
   - The readings (`none`, `solid`, the gauge width, `none`) and the `:focus-visible` assertion are
     byte-identical to round 2, as the preceding diff shows. The comment names how focus is reached.
3. **Static gates.**
   - `npx oxfmt --check tests/src/styles/components/validation.test.ts` exited 0: "All matched files
     use the correct format."
   - `npm run lint:check` exited 0.
   - `npm run check` exited 0.

## Observation

The scoped five-file styles run exited 0: `Test Files  5 passed (5)`, `Tests  99 passed (99)`. It
ran `npx vitest run --config configs/src/vite.styles.config.ts --no-cache` over the
`form-check`, `form-control`, `form-range`, `form-select`, and `validation` test files under
`tests/src/styles/components/`.

## Touched files

- `tests/src/styles/components/validation.test.ts`: the forced-colours case reaches focus with the
  file's `focus()` pattern, and the unused `traverseAccessible` import is removed.
- `tmp/units/bff-report-3.md`: this report.

The worktree diffstat against `ccb10a7`, which still includes rounds 1 and 2, is
`14 files changed, 474 insertions(+), 200 deletions(-)`. `validation.test.ts` accounts for
`113 ++++++-` of that total.

## Shared-file patches and deviation state

- Shared-file patches: none.
- Deviation: none. The case reaches `:focus-visible` through the file's own pattern.

## Claims flagged as weakest

- The fix depends on a host behaviour: after programmatic `focus()` and a key press, Chromium
  matches `:focus-visible`. The file's ring cases rely on the same behaviour, and both runs in
  criterion 2 confirm it. If a different browser engine were added to the project, this dependency
  would need checking there.
