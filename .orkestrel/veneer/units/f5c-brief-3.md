# Unit F5c TOKENS-TRUTH — brief 3 (the second fix round)

Successor to `tmp/units/f5c-brief-2.md`. What changed: the fix round's objective audit (`analyst` on
GPT-6 Astra, `/home/user/scaffold/tmp/audit/f5c-fix-audit-analyst-verdict.md`) ruled two findings
that need code: claim 2 BROKEN on the `Role` branch of `collectReferenceRows`, and one finding outside
the claims, NESTED_HELPER. Every other claim held, claim 3's baseline error was the claims text's own,
and the Orchestrator's host control confirmed the dark-cell mutation reddens the value gate. This brief
carries those two findings and nothing else. The first brief and the second stay unedited.

## Role and engine

`opus` on Opus (native Claude subagent), sole writer in `/home/user/veneer-f5c`, which is a git
worktree detached at `07fc3c3` carrying the first run's writes, the Orchestrator's integration patch,
and the fix round's writes, all uncommitted. Perform the assignment directly and spawn nothing.

## Objective

`collectReferenceRows` refuses a `Role` row that states a surplus value and a `Role` table that carries
a column it does not read, and the mutation-control case holds no nested function.

## Context

- Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/{tests,typescript,architecture,names,writing}.md`.
  `architecture.md` § No nested functions: extract function declarations and assignments from bodies;
  the only exceptions are an anonymous callback passed directly as an argument and an anonymous
  function returned directly as a result.
- Guide: `guides/veneer.md` § Tokens › Reference map (the cell contract and the comparison paragraph
  you wrote in the fix round).
- The analyst's evidence, verbatim: "The `Role` branch ignores a separate dark cell and accepts surplus
  fill values. Executing a `Role | Light | Dark` table with row `` `primary` | `red` | prose `` returned
  `{token:"--vn-color-primary-base",light:"red",dark:"red"}` instead of throwing. Appending
  `` , `red` `` to the actual guide's secondary-role Fill cell also returned every row unchanged;
  replacing its existing fill with `red` changed the output, establishing the control." Sites: the
  `Role` branch in `collectReferenceRows` (`tests/setupStyles.ts`, around line 822) and the guide's
  role table (around line 551).
- NESTED_HELPER, verbatim: "`tier` is an arrow function assigned inside the test callback, violating
  the nested-function prohibition. Inline the original and mutated readings in the assertions; the
  anonymous callbacks passed directly to `find` remain permitted." Site: the case
  `states a dark value the dark cell alone decides` in `tests/setupStyles.test.ts` (around line 1319).
- Host: npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
  Chromium 141 at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`). Another
  worktree's gate chain may run beside you; a journey timing failure is the Orchestrator's reading,
  not yours.

## Obligations

### Obligation 1 — `Role` cardinality

A `Role` row's value cell states exactly one value per token the row names; a surplus value is refused
with the cell named, and the refusal reaches the caller through `collectReferenceRows`. A `Role` table
whose header carries a column the reader does not consume (`Dark` beside `Fill`, or any column
outside the header shape the reader resolves) is refused with the column named, so a dark cell can
never be silently read as the light one. Choose refusal over consumption: the roles table states one
fill both modes derive from, and the guide says so.

Two plants in `tests/setupStyles.test.ts`, each red before the reader change and green after, each
recorded with `npm run test:setup` and its failing count:

- `refuses a role cell stating a surplus value` — `REFERENCE_MARKUP` with `` , `red` `` appended to a
  role's Fill cell, asserting the throw names that role's cell.
- `refuses a role table carrying a column it does not read` — a `Role | Fill | Dark` header, asserting
  the throw names `Dark`.

Extend `REFERENCE_MARKUP` only if the existing scratch map cannot express the plant; prefer a mutated
copy inside the case, the way the dark-cell control does.

### Obligation 2 — NESTED_HELPER

Inline the `tier` readings into the assertions of `states a dark value the dark cell alone decides`.
The case keeps its two readings (the guide and the mutated copy) and its assertions; no module-scope
helper is added for one case.

## Scope

- Owned: `tests/setupStyles.ts`, `tests/setupStyles.test.ts`.
- Shared, report-only: none.
- Off-limits: everything else, including `guides/veneer.md`, `tests/src/styles/tokens.test.ts`,
  `src/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `ROADMAP.md`, and every file under
  `tmp/` other than `tmp/units/f5c-report-3.md` and your own `tmp/probe/` (delete it before
  reporting). No git command that discards a working-tree change.

## Execution

Perform the assignment directly and spawn nothing. Do not run tree-wide `format`, `lint --fix`, or
`build`; validate with `npm run format:check`, `npm run lint:check`, `npm run check`, and
`npm run test:setup`, then `npm run test:src:styles` once as an observation.

## Output

Write `tmp/units/f5c-report-3.md` and return the same text: the two red-then-green readings with
their commands and counts, the exact refusal wording, the touched files, `git status --porcelain`,
`git diff --stat`, the gate exits, deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`, and the claims you flag unverified. No process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: the refusal wording (follow
the `Reference row <first cell>: …` and `Reference row <header>: …` idioms), where the two plants sit
among the existing reference-map cases, and whether the plant mutates the scratch map in place or
through a copy.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:setup` exits 0 with the two plants present, each recorded red before the change.
3. `grep -n 'const tier' tests/setupStyles.test.ts` prints nothing.
4. `git status --porcelain` lists the fix round's six files and nothing else.

## Review evidence

The report, `git diff 07fc3c3 -- tests/setupStyles.ts tests/setupStyles.test.ts`, and the status.
