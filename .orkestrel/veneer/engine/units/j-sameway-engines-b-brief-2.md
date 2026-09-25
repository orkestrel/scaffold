# Unit J-SAMEWAY-ENGINES-B, round 2 — move the door tables into the setup module

Successor of `j-sameway-engines-b-brief.md`. Its sections stand except where this brief replaces them. Your round-1 report is `units/j-sameway-engines-b-report.md`.

**Why.** `.claude/rules/tests.md` § Helpers requires that data tables and case matrices belong in a setup file at any size, and that test registration does not. Your deviation 3 put the door tables inline in `Dropdown.test.ts`, `Tooltip.test.ts`, and `Popover.test.ts`, because round 1 made `tests/setupBrowser.ts` report-only. No other live unit writes that file now, so this round grants it.

## The obligation

- **T1.** Move every door table and case matrix these three test files declare into `tests/setupBrowser.ts` as frozen, exported, named constants, following the form of J-SAMEWAY's tables there: `MODAL_SHOW_DOORS`, `SHOW_REVERSALS`, and the rest. Name each by the rule in `.claude/rules/names.md`.
- Add each new name to the sorted export list in `tests/setupBrowser.test.ts`, as J-SAMEWAY did.
- The test files keep only registration, and every case keeps its title and assertions.
- Change nothing else.

## Scope

- **Owned:** round 1's owned files, plus `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`.
- **Off-limits:** round 1's off-limits files, except these two.
- **Commit:** your round-1 work is uncommitted in the worktree. Leave it that way. The Orchestrator commits both rounds.

## Acceptance criteria

1. `npm run check:src:browser`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:setup:browser` and the three owned test files pass in a scoped run, with the same case titles and count as round 1 (147).
3. `grep` finds no array or object literal of door rows left in the three test files.
4. The instrument's rows still resolve and read as before. Re-run it and copy its table.

## Output

Your final message holds:
- the files touched;
- each moved table's name, with the file and case that use it;
- the acceptance output verbatim;
- the instrument's table;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it.
