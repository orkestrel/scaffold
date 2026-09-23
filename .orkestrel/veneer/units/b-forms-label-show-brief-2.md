# Unit B-FORMS-LABEL-SHOW (`bfw`), round 2 — the registry case's class-led selector and the remaining criteria

Successor to `b-forms-label-show-brief.md` (round 1, unedited). What changed and why: round 1
stopped on the shared `tests/setup.test.ts` case "describes each photographed cascade key by its
specimen, its element, and its property", which rejects the `legend.col-form-label` selector
ruling E fixes for the `form-label-legend` row because it accepts only a selector that starts with
`.`; the Orchestrator rules for the writer's recommended shared patch and grants that file for it.
Round 1 also lacked a `dist/`, which the Orchestrator has built in the worktree since, and its
journey's matrix case fails without `bfl`'s partial, which the Orchestrator records as expected.

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bfw` (the round-1
worktree over `dd855e9`, holding round 1's uncommitted writes, which this round builds on and never
discards; `dist/` is built now). Perform the assignment directly and spawn nothing. Use absolute
paths under `/home/user/veneer-bfw`, run every npm and npx command from there, and run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The registry case accepts a class-led selector qualified by an element and still refuses a bare
element selector, the `form-label-legend` row keeps ruling E's `legend.col-form-label` selector,
and the round-1 criteria the missing `dist/` blocked are green.

## Context

**Evidence.** `tests/setup.test.ts` around line 152: the check
`key.subject.length === 0 || !key.selector.startsWith('.') || key.property.length === 0`. The
writer's probe of the replacement `!/^[a-z]*\./u.test(key.selector)` passed the case (21 of 21)
and still rejects `legend`. The round-1 report is `b-forms-label-show-report.md`.

**Law.** As round 1. **Installed primitives.** As round 1. **Host.** As round 1.

**Standing conditions.** The journey's "matrix > reads the mounted class and style populations…"
case fails in every variant because the worktree carries no `_form-label.scss` (the `bfl` unit's
partial); the Orchestrator's integrated run settles it. Report that case's reading as an
observation. The worktree is dirty with round 1's writes by design.

## Unknowns

none.

## Scope

**Owned.** Round 1's owned files, plus `tests/setup.test.ts` (the one check and its comment only),
`tmp/units/bfw-report-2.md`.

**Shared (report-only).** As round 1, minus `tests/setup.test.ts`.

**Off-limits.** As round 1.

**What asserts the state this change ends.** `tests/setup.test.ts` (the check; Owned).

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bfw-report-2.md`: the diff against round 1, each criterion with its command and
result line, and the claims you flag as weakest. Return the same content as your final message.

## Deviation contract

Stop and report on a criterion needing a file outside Owned. Decide, record, and carry on for the
check's comment wording.

## Acceptance criteria

1. `tests/setup.test.ts`: the check reads `!/^[a-z]*\./u.test(key.selector)` (a selector led by a
   class, with or without an element qualifier) and its comment says so and says a bare element
   selector is refused; the `form-label-legend` row keeps `legend.col-form-label`.
2. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
3. `npm run test:setup` exits 0 and `npm run test:app` exits 0.
4. `npm run test:journey` fails only on the matrix case named under Standing conditions, in every
   variant; report every other case green.

**Observations, not criteria.** As round 1.

## Review evidence

The diff against `dd855e9` and the status, this report, and round 1's report.
