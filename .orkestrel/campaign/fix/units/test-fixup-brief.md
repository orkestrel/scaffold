# Unit test-fixup — rename `resolveColor` to `parseCSSColor` in `@orkestrel/test`

## Role and engine

`builder` on Claude Sonnet, reached as a native subagent. You perform the assignment directly and
spawn nothing.

## Objective

The helper the `test` unit landed as `resolveColor` (from `rgba`) is named `parseCSSColor`
everywhere in the package — source, tests, guide — because the landed vocabulary in scaffold's
`.claude/rules/names.md` defines `resolve*` as picking an effective value from options and
defaults, and this helper coerces a CSS color expression through a live probe to
`Color | undefined`, which is the `parse*` contract.

## Context

**Evidence.** `/home/user/fleet/test/src/browser/helpers.ts` exports `resolveColor(value: string):
Color | undefined` beside `parseColor` (which parses a computed `rgb()`/`rgba()`/`color(srgb …)`
string). The barrel `/home/user/fleet/test/src/browser/index.ts` star-exports helpers. The guide
`/home/user/fleet/test/guides/test.md` carries its Surface row, fence, and prose. The `test`
unit's report at `/home/user/scaffold/tmp/units/breaking/test-report.md` names every site it
touched. The ruling: `/home/user/scaffold/.orkestrel/campaign/fix/breaking-plan.md` § Naming and
shape rulings, row `test s11-37`.

**Law.** `AGENTS.md`; `.claude/rules/names.md` (the vendored copy predates the vocabulary; the
ruling above is the text to follow); `.claude/rules/documentation.md` § Parity.

**Host.** Linux, bash. Repository `/home/user/fleet/test` on branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed.
Do not run `npm install`.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/browser/helpers.ts`, `src/browser/index.ts` (only if it names the symbol),
`tests/src/browser/**`, `guides/test.md`, `tests/guides.test.ts` (only where it names the symbol).

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every other file, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Rename the declaration,
every reference under `src`, `tests`, and `guides` (including `{@link}` targets, `@example`
lines, and the guide's Surface row and fences), then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: the files touched; `rg -n 'resolveColor' src tests guides` output (expected
empty); each gate command with its exit code and an excerpt for any failure; `git diff --stat`;
`git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when `parseCSSColor` already exists, when the policy sweep gates `parse*` names to a
`parsers.ts` this package does not have, or when a gate fails for a cause you cannot attribute.

## Acceptance criteria

1. `rg -n '\bresolveColor\b' src tests guides` returns no hit; `rg -n '\bparseCSSColor\b' src guides`
   returns the declaration and the guide row.
2. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`
   exit 0 (the browser project's timing is an observation).
3. `git status --short` lists only owned files.

## Review evidence

The actual diff and the actual status output at return.
