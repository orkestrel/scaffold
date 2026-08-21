# Unit M1: prove the terminal tool shapes

## Role and engine

Role `builder`, engine Sonnet, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/toolbox`. You perform the assignment directly and spawn
nothing.

## Objective

`guides/toolbox.md:949` claims `tests/src/core/shapers.test.ts` covers every advertised shape,
and `promptToolShape` and `answerToolShape` (`src/core/shapers.ts:26-32`, `:43-54`) have no
describe there. Add the two describes so the sentence is true.

## Context

Authority: `AGENTS.md` and `.claude/rules/tests.md`, `.claude/rules/typescript.md`,
`.claude/rules/writing.md` in this checkout. Read the existing describes in
`tests/src/core/shapers.test.ts` first and mirror their idiom exactly — how they compile or
exercise a shape, how they assert acceptance and rejection, how cases are named.

Coverage each new describe owes, following the sibling pattern:

- `promptToolShape`: a valid sample (`to` non-empty, `schema` a JSON value); rejection of an
  empty `to`; rejection of a missing `schema`; rejection of a wrong-typed member.
- `answerToolShape`: a valid `pending` arm; a valid `answer` arm (`operation`, non-empty `id`,
  `values`); rejection of an unknown `operation`; rejection of an `answer` arm missing `id` or
  `values`; rejection of an empty `id`.

Adjust the exact member expectations to what the shapes actually declare — the declarations are
authoritative, and if a listed case contradicts them, follow the declaration and record it.

## Scope

- Owned: `tests/src/core/shapers.test.ts` only.
- Off-limits: everything else, including `guides/toolbox.md` (the sentence becomes true; it does
  not change) and `src/**`.
- The checkout is clean; no standing conditions.
- No commits, installs, or git checkout/restore/stash/reset/clean.

## Execution

You perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git status --porcelain` lists exactly the owned file.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check tests/src/core/shapers.test.ts` exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings tests/src/core/shapers.test.ts` exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:core tests/src/core/shapers.test.ts`
   passes with the new describes present; report raw totals.

## Output

The diff; raw output and exit code per criterion; any case adjusted to match the declarations
with one line saying why. No process diary.

## Deviation contract

Stop if a shape's declaration cannot support the coverage listed (that is a finding about the
shape, not yours to fix). Test naming and case ordering are yours.
