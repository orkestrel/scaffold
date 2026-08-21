# R5s — admit accessor properties in the policy plugin's method walk

## Role and engine

You are the Sol implementer (GPT-5.6 Sol), `codex exec` `workspace-write`, rooted at
`/home/user/scaffold`, sole writer on branch `claude/test-helpers-consolidation-35cprs` from a
clean committed baseline. Perform this directly; spawn nothing. The sandbox denies network and
mounts `.git` read-only.

## Objective

Close the measured gap in `policy(no-nested-functions)`: an object-literal getter or setter is
instance-bound member work the rule's own message directs writers toward, and the walk flags it
because the admission covers only `method === true`.

## Authority

`/home/user/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `tests.md`, `architecture.md`.

## Measured facts — do not re-derive

- `configs/policy.ts:125` admits `parent.type === 'MethodDefinition' || (parent.type === 'Property' && parent.method === true)`.
  A getter parses as `Property` with `kind: 'get'`, `method: false`, so it falls through and is
  reported. Downstream evidence: unchanged `@orkestrel/test` 0.0.8 factories
  (`get count()`, `get header()`, `get states()`) go red under 0.0.47 while method shorthand in
  the same literals passes.
- The plugin's own suite carries no case ruling on accessors either way (searched
  `tests/src/core/`, `configs/`), and scaffold's own source uses getters only as class members —
  the object-literal case was outside the instrument's certified population.
- `configs/policy.ts` is in the vendored host inventory (`src/core/constants.ts:147`), so the
  repository copy is the template: one edit serves the repo and the published `dist/host`.
- The plugin is proven from `tests/config.test.ts`.

## Owned files

- `configs/policy.ts`
- `tests/config.test.ts`

Off-limits: everything else.

## The work

1. In `isPolicyMethod` (or the smallest equivalent seam), admit a `FunctionExpression` whose
   parent is a `Property` with `kind` of `get` or `set`, alongside the existing admissions.
   `MethodDefinition` already carries class accessors; confirm rather than assume — if a class
   getter reaches the walk another way, cover it with the same admission and say so.
2. Prove it in `tests/config.test.ts`, following the file's existing idiom for exercising the
   plugin: a fixture with an object-literal getter and setter inside a factory function body that
   the rule must not report, and a negative control in the same fixture — a function expression
   assigned to a variable inside a body — that the rule must still report at its exact location.
   The control is what makes the case evidence.
3. Sweep your admission against the rule's other users: `hasPolicyFunctionAncestor` treats
   `isPolicyMethod` parents as method boundaries — reason through, and cover with the proof, what
   a function nested *inside* a getter body must still report.

## Deviation contract

Stop and report when the fix requires a file outside the owned list, or when the existing proof
idiom in `tests/config.test.ts` cannot host the fixture. Ancillary calls are yours.

## Output

`Delivered` · `Validation` (exact commands, exit codes) · `Controls` · `Decisions` ·
`Deviations` (or none) · `Flags`.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:config` exit 0 with the new cases collected; the control case proven to report.
3. `git status` shows changes only in owned files.
4. No banned token, no stated count.
