# Unit U3-policy — successor brief 4: the portable index assertion

## What changed and why

This brief supersedes `tmp/units/u3-policy-brief-3.md` for the remainder of the unit; the earlier
briefs stand except where this one says otherwise. The third objective review
(`units/u3-policy-review-report-3.md`) confirmed every claim and found that the literal index list
this unit asserts is not portable. `tests/policy.test.ts` is vendored: `host.json` copies it
byte-identical into every target and `scaffold repair` restores it there, so an assertion pinning
this checkout's own `guides/README.md` census turns `test:policy` red in Veneer, Test, and every
other target for no policy defect. That defect is mine, from brief 1 § 5, not the builder's.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`; commit nothing; do not touch `host.json`.

## Scope

**Owned.** `tests/policy.test.ts`, `tests/setupPolicy.ts`. **Off-limits.** Everything else.

## Execution

1. **Portable assertion (finding 7).** In `tests/policy.test.ts`, replace the literal
   `expect(readPolicyIndex(root)).toEqual([...])` with assertions that hold in any target: every
   name `readPolicyIndex(root)` returns resolves to an existing `guides/<name>.md` file (use the
   file predicate the module already has); the returned names are distinct; and the workspace's own
   guide name (`readPolicyPackage(root)`) is among them. Keep every other assertion in the case.
2. **Order and dedup in a scratch root (finding 7).** Prove first-link order and the dedupe where
   the rest of the file proves mechanism: add a `PolicyControl` row, or a case using the scratch
   helper the file already uses for a crafted root, whose `guides/README.md` links `beta.md`,
   `alpha.md`, then `beta.md` again, and assert `readPolicyIndex` returns `['beta', 'alpha']`. Put
   it wherever the file's existing shape puts a mechanism proof over a crafted root; match that
   shape rather than inventing one.
3. **Link forms (finding 8).** Decide and record: either widen `POLICY_INDEX_LINK` to admit an
   optional title (`](tokens.md "Tokens")`) and optional angle brackets (`](<tokens.md>)`), with a
   case for each form, or narrow the constant's description sentence to the exact form it accepts
   and add a control row pinning an excluded form as unaccounted. Take the widening: an index
   written with a title is ordinary Markdown and a target would be reported for no defect.
4. **Membership string (finding 9).** The `ignores an index link written inside a fence` row
   claims fenced blocks and code spans while its fixture writes only a fence. Add the code-span
   fixture as a second row (`ignores an index link written inside a code span`, whose
   `guides/README.md` carries its only `](console.md)` inside a backtick span) and narrow each
   row's membership to the region it writes.
5. Format the owned files by path, then `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run test:policy`, `npm run test:setup`, `npm run test:config`,
   `npm run test:guides`; record each command's final lines (`test:config` may report the
   inventory stale at owned files; the Orchestrator rebuilds).

## Output

Write `tmp/units/u3-policy-report-4.md` and return its content: the diff summary; each new row's or
case's reading; each gate's exit code and final lines; deviations in the usual shape.

## Deviation contract

Stop and report on: a gate red after your own fix; a need to edit an off-limits file; a scratch
helper that cannot write a crafted `guides/README.md` (name what it cannot do). Decide and carry on
from: the row labels, the fixture guide names, and wording.

## Acceptance criteria

1. No assertion in `tests/policy.test.ts` names a guide of this checkout that another target would
   not have.
2. A crafted-root proof pins first-link order and the dedupe.
3. `POLICY_INDEX_LINK` admits a titled and an angle-bracketed target, each with a case.
4. `format:check`, `lint:check`, `check`, `test:policy`, `test:setup`, `test:guides` exit 0.
5. `git status --porcelain` lists only `host.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
   `guides/scaffold.md`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
