# Unit guide-fixup-2 — restore the ruled "declaring file" predicate in `Source.#locate`

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`Source.methods(name)` resolves from the first file whose located head for the name has a body or
has bases, as round-1 ruling F1 states; an empty head with no bases is skipped and the scan
continues to a later file or falls through to a same-named class, both pinned by tests; the bound
that a bases-only head counts as declared is stated in the guide.

## Context

**Finding** (round-2 objective lane, claim 12, in
`/home/user/scaffold/.orkestrel/campaign/fix/units/guide-audit-verdict.md`): the fix-up made any
located head a declaration, so `#locate` in `/home/user/fleet/guide/src/core/sources/Source.ts`
stops at the first file holding `export interface X {` even when that head has an empty body and
no bases. Before the unit, an empty `export interface Widget {}` beside `export class Widget {
render() {} }` returned `['render']`, and an empty first file plus a later file declaring the same
name with members returned the later file's members; both now return `[]`.

**Ruling.** Keep `extractDeclaration` as it is (a located head with an empty body is still a
`Declaration` at the leaf; its test at `tests/src/core/helpers.test.ts` "separates an empty
declared body from an absent declaration" stays). In `Source.#locate`, treat a located declaration
whose `body` and `bases` are both empty as not declaring and keep scanning; when no file declares
the name that way, the existing fallbacks (the same-named class shape; `undefined` for no head)
apply as before the unit. Add two cases to `tests/src/core/sources/Source.test.ts`, each built
from real source text: an empty `export interface X {}` in the first module file and
`export interface X { … }` with members in a later file yields the later file's members; an empty
`export interface Widget {}` beside `export class Widget { render() {} }` yields `['render']`. State
in `guides/guide.md`'s extraction-model paragraph (around `:317-341`) and in the
`SourceInterface.methods` remark in `src/core/types.ts` that a head with bases and no body counts
as declared, so a same-named class behind it is not consulted (the bound round-1 F3 recorded).

**Law.** `AGENTS.md`; `.claude/rules/tests.md` (real source text, no fixture that restates the
members); `.claude/rules/documentation.md` § Parity.

**Host.** Linux, bash. Repository `/home/user/fleet/guide` at commit `b015704`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, `node_modules` installed. A fleet sweep is running on
this host and may run `npm run check` in this checkout concurrently; a red reading of your own
gates during that window is re-run once after it, and you report both readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/core/sources/Source.ts`, `src/core/types.ts` (the `methods` remark only),
`guides/guide.md` (the extraction-model paragraph only), `tests/src/core/sources/Source.test.ts`.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, `src/core/helpers.ts`, every other file, every
other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Write the two tests first
and run `npm run test:src` to record them failing (quote the failing count), then change
`#locate`, then the prose, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: the changed lines of `Source.ts` (before and after); the two test titles with the
failing-first count and the passing count; the prose sentences added; each gate command with its
exit code and an excerpt for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when restoring the predicate breaks an existing test whose expectation the ruling
did not anticipate, or when a gate fails for a cause you cannot attribute after the re-run.

## Acceptance criteria

1. The two new tests exist, failed before the `#locate` change, and pass after it.
2. `Source.#locate` skips a located declaration whose `body` and `bases` are both empty.
3. The guide paragraph and the `methods` remark state the bases-only bound.
4. The gate chain exits 0.
5. `git status --short` lists only owned files.
