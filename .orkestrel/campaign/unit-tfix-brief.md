# Unit T-fix: toolbox shaper proof depth (batch audit F7)

## Role and engine

Role `builder`, engine Sonnet, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/toolbox`. Fully specified below. You perform the assignment
directly and spawn nothing.

## The finding

The `promptToolShape` and `answerToolShape` proofs (`tests/src/core/shapers.test.ts:22-77`)
carry accept/reject/round-trip only, while every sibling in the file carries more:
`agentToolShape` has an `expectTypeOf` structural lock (line 83) and a compiled-schema
assertion (lines 122-132); `workspaceToolShape` has both (lines 216, 306-328);
`workflowStepsShape` has the schema assertion (lines 206-209). Beside that,
`guides/toolbox.md:109-110` claims the prompt tool's `schema` slot carries "the whole
`@orkestrel/form` document as exact JSON" and the answer arm's `values` is "a record as
exact JSON", and no assertion rejects a non-JSON value in either slot.

## The edits

1. `tests/src/core/shapers.test.ts`: bring the two proofs to sibling depth — an
   `expectTypeOf` structural lock and a compiled-schema assertion for each, following the
   `agentToolShape` and `workspaceToolShape` cases as the exact pattern.
2. Same file: one reject pin per guide claim — a prompt tool whose `schema` slot carries a
   non-JSON value (a function is the vector) is refused by the compiled guard, and an answer
   whose `values` carries a non-JSON value is refused. If either guard ADMITS the vector,
   stop and report per the deviation contract — that is a product finding that the guide
   over-claims, not a test to weaken.
3. `guides/toolbox.md:109-110`: no edit if both pins pass. If the unit stops on a guard
   admitting the vector, the guide edit belongs to the successor round, not to you.

## Scope

- Owned: `tests/src/core/shapers.test.ts`. `guides/toolbox.md` is named for context and is
  off-limits to edit.
- Standing entries: everything `git status --porcelain` lists at your start.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries plus the owned file;
   report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned file exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core`
   exits 0; totals reported.

## Output

The diff; raw output and exit code per criterion; any deviation. No process diary.

## Deviation contract

Stop on: a compiled guard admitting a non-JSON vector (report the exact vector and the
guard's answer); a criterion unreachable. Test naming and placement within the file are
yours: decide, record, carry on.
