# Unit TEST-MATRICES — every module-level data table in the test package's tests moves to its setup module

## Role and engine

`builder` on Sonnet, a native Claude subagent, the sole writer in the worktree `/home/user/test-tm` (the `@orkestrel/test` repository, detached at `7104241`, the T4 TEST-CLIP round-3 commit; `node_modules` is a hard-linked copy of the main checkout's). You are the executor that opens this brief. Every edit is specified; a choice this brief does not make is not the unit's to make.

## Objective

No test file under `tests/` declares a module-level data table or case matrix: each one is a frozen, documented export of the setup module its test file already imports from, and each test reads it through that import.

## Context

**Evidence.** The T4 round-2 audit on Astra (`/home/user/scaffold/.orkestrel/veneer/units/t4-audit-2-objective-verdict.md`, claim 5) found inline matrices at the head of `tests/src/browser/helpers.test.ts`; `/home/user/scaffold/.claude/rules/tests.md` states "Data tables and case matrices belong in a setup file at any size; test registration does not" and "Export every reusable helper, fixture type, factory, constant, and guard from setup files". A search over `tests/**/*.test.ts` for module-level `const NAME = [` and `const NAME = Object.freeze([` declarations (the Orchestrator's grep at `7104241`) returned: `tests/src/browser/helpers.test.ts` (`VARIANTS`, `IMPLICIT_ROLE_CASES`, `FIELD_ROLE_CASES`), `tests/src/browser/factories.test.ts` (`STATES`, `VARIANTS`), `tests/src/server/helpers.test.ts` (`TEMPORARY_VARIABLES`, `FOREIGN_ROOT_SPELLINGS`), `tests/distribution.test.ts` (`PING`, `MODULE_EXTENSIONS`, `DECLARATION_EXTENSIONS`, `RESOLUTIONS`, `FORMATS`), and `tests/guides.test.ts` (`FENCE_LANGUAGES`). Re-run that search yourself first over every `tests/**/*.test.ts` file, extended to module-level `const` declarations whose initializer is an array or object literal of data (not a function, not a scalar string, number, or boolean), and treat your list as the population; report any member the Orchestrator's list missed.

**Law.** `/home/user/scaffold/AGENTS.md` (read it first); `/home/user/scaffold/.claude/rules/tests.md`, `typescript.md`, `names.md`, `writing.md`, `architecture.md`; skill: none; guide: `guides/test.md` in the worktree (no guide edit is expected: these are test-internal tables).

**Installed primitives.** `@orkestrel/contract` and this package's own `src/`; a helper duplicating one of their exports is a defect. No helper is added by this unit.

**Host.** Linux, bash, working path `/home/user/test-tm`. Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` and `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers` first in every shell. Never write under `node_modules` (its files are hard links into the main checkout).

**Measurements.** None beyond the search above.

**Control identifiers.** None.

**Standing conditions.** An audit reads `/home/user/test` while you work; never touch that checkout. A Veneer capture probe loads the container, so re-run a timing failure alone once before believing it and report both readings.

## Unknowns

None.

## The edits

- For each table in the population: move the declaration to the setup module its test file imports from (`tests/setupBrowser.ts` for `tests/src/browser/**`, `tests/setupServer.ts` for `tests/src/server/**`, `tests/setup.ts` for `tests/distribution.test.ts`, `tests/guides.test.ts`, and `tests/src/core/**`), exported under the same name, wrapped in `Object.freeze` with every nested row or tuple frozen, typed `readonly` as today, and preceded by a TSDoc summary in the setup file's form (for `IMPLICIT_ROLE_CASES` and `FIELD_ROLE_CASES`, carry the existing comment about expectations written out rather than read back into the TSDoc). Replace the declaration in the test file with the import.
- The two `VARIANTS` tables become one export: where their rows are equal, export one table and import it in both files; where they differ, export both under names that say what each holds, and report the names.
- Where an exported name collides with an existing export of the setup module, stop and report.
- Every table the test files import stays read exactly as before: no row, value, or order changes, and no assertion changes.

## Scope

**Owned.** `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupServer.ts`, and the test files in the population.

**Shared (report-only).** None.

**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` (vendored by `@orkestrel/scaffold`; a table there is not this unit's), every `src/**` file, `guides/**`, `package.json`, and `package-lock.json`.

**What asserts the state this change ends.** `tests/setup.test.ts`, `tests/setupBrowser.test.ts`, and `tests/setupServer.test.ts` if they enumerate a setup module's exports; run them and extend an enumeration the new exports make false.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; format owned files by path with `npx oxfmt --write <paths>`; no tree-wide `format` or `lint --fix`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return, as your final message: the population you found (file and name per table) and where each moved; each gate's full command and result line: `npx oxfmt --write <owned paths>`, `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src` (or the package's scripts that run every project the moved tables serve; name them), and `npm run test:guides`; `git status --porcelain`. Write the report with no count of a growable set and a noun after every code token.

## Deviation contract

`/home/user/scaffold/.agents/orchestration.md` § Deviation protocol. Settle by yourself: where an export sits in its setup module, the TSDoc wording, and line wrapping. Stop and report on a name collision, on a test whose reading changes, and on a gate red for a cause outside these edits.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0.
2. The test projects that run the moved tables and the guides project exit 0.
3. The search over `tests/**/*.test.ts` for a module-level data table returns nothing.

## Review evidence

The Orchestrator captures `git -C /home/user/test-tm diff 7104241` and `git -C /home/user/test-tm status --porcelain` at hand-back as `tm.diff` and `tm-status.txt`, beside the report `tm-report.md`.
