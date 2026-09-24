# Unit J-HELPERS — round 2 (the fix round before the audit)

Successor of `j-helpers-brief.md`, which stays in force for everything this brief does not change. What changed and why: the Orchestrator's own gate run over the worktree (`j-helpers-gates.log.txt`) read every scoped gate green and the tree-wide typecheck red on three lines of the new `Delegate.test.ts` cases, and the round-1 report (`j-helpers-report.md`) raised three items the Orchestrator rules here. The audit lanes run on this round's result, not on round 1.

## Role and engine

`opus` on Opus 5.5, the same native subagent, the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/helpers`.

## The rulings on the round-1 items

1. **The `types.ts` patch** (the `DropdownSelectorMap.trigger` TSDoc) integrates at the landing as a report-only patch, as in W2. Keep it in the report unchanged; the `, :disabled` grep hit at that line is expected until then.
2. **Untitled `@example` blocks are correct.** The brief's "titled" wording was the Orchestrator's error: `documentation.md` pairs a titled example with a guide heading of that title, and none of these helpers has one. No change.
3. **The § Compatibility row edit is refused.** The row of kind `method` listing Bootstrap's `util/index.js` exports records what Bootstrap ships, and Bootstrap ships `isDisabled`; a Bootstrap name quoted in a § Compatibility row is not a Veneer export and never was (`getUID`, `isElement`, and the rest of that row are not exports either), so acceptance criterion 2's grep was too wide there. Restore that row to its `main` text (`git show main:guides/veneer.md`, the row starting `| engine           | method         | util/index.js:`), byte for byte.

## The obligations

- **A. The row.** Restore the § Compatibility `util/index.js` row to `main`'s text. Every other guide edit of round 1 stands.
- **B. The tree-wide typecheck.** `npm run check` (the root `tsconfig.json` project, then `check:src`, then `check:app`) exits 0. Round 1 reads:
  ```
  tests/src/browser/Delegate.test.ts(2350,43): error TS2769: No overload matches this call. … Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  tests/src/browser/Delegate.test.ts(2351,62): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  tests/src/browser/Delegate.test.ts(2352,25): error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'HTMLElement'.
  ```
  Narrow with the declared guards (`requireValue` from `@orkestrel/test`, `isInstance` from `@orkestrel/contract`), never with `!` or `as`. Run `npm run check` from the worktree root and record its exit; it is a criterion in this round.
- **C. The acceptance grep.** In `tmp/j-helpers/acceptance.sh`, the `grep-retired` step reads `isDisabled` over `src` and `tests` whole and over `guides/veneer.md` with the `util/index.js` row excluded (`grep -v "| engine           | method         | util/index.js"`), and its pass condition stays "matches nothing". Re-run the whole chain and the instrument after A and B, and report both verbatim; the instrument's rows re-anchor only where line shifts require it.

## Scope, execution, output, deviation contract, acceptance criteria

As `j-helpers-brief.md`, with criterion 1 extended by `npm run check` exit 0 and criterion 2 read with the row exclusion of item C. Return the report as your final message in the round-1 shape: the files touched in this round, A to C with their evidence verbatim, the mutation table verbatim, every acceptance command's output verbatim with `npm run check` among them, `git status --short` and `git diff --stat`, the `types.ts` patch, the deviation state. No process diary. Perform the assignment directly and spawn nothing.
