# Unit reason-fixup — close the reason unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

The findings the objective and subjective lanes raised outside their claims are closed as ruled in
`@orkestrel/reason` at commit `a42bd0f`.

## Context

**Findings, each with its ruling.**

1. **Objective F1 — `tests/src/core/builders/DefinitionBuilder.test.ts:312-318`.** `seat`'s
   DESTROYED path is proven only through the `Collection`-delegating managers; `VariableManager`
   (`src/core/builders/managers/VariableManager.ts:63`) runs its own `#ensureAlive()` before
   assigning and no test drives `variables.seat(...)` after `variables.destroy()`. Ruling: add a
   case beside `:312` that destroys `definition.variables`, calls `definition.variables.seat({})`,
   and asserts `error.code === 'DESTROYED'`, in the same shape as the existing case.
2. **Subjective R1, ruled apply — `src/core/types.ts:1191` and `src/core/builders/managers/VariableManager.ts:65`.**
   `VariableManagerInterface.seat(items: Readonly<Record<string, number>>)` borrows the list
   word `items` for a name-keyed record whose interface otherwise says `variables`. The s07-17
   ruling fixed the method name, not its parameter. Ruling: `seat(variables: Readonly<Record<string, number>>)`
   on the interface and the class; the five list managers keep `items`. Carry the TSDoc `@param`
   and any guide Methods-row text that names the parameter.
3. **Subjective required change — `guides/reason.md:936`.** The `seat` example sits after
   `const payload = draft.build()` and before `draft.destroy()`, where it teaches nothing. Ruling:
   move the `draft.groups.seat([...])` line to precede `const payload = draft.build()` (never above
   the `reason.reason(...)` call at `:932`, whose `// 40 — (10 + 25) + 5` comment depends on the
   groups built earlier), and give it the comment
   `// swap a whole collection in one silent step — an authoring surface's "load this revision"`.
4. **Subjective R2, ruled apply — `guides/reason.md:98`.** The Value factories intro orients by an
   in-repository file ("The other half of `factories.ts`:"), which a consumer never sees. Ruling:
   the sentence opens on the concept: "Plain-data constructors for the declarative definition
   vocabulary — no lifecycle, no emitter, no identity. Reach for the entity factories earlier when
   you need a working instance instead."
5. **Subjective observation, ruled in — `tests/src/core/factories.test.ts` header.** It says the
   value factories come first and the entity factories follow, the inverse of `src/core/factories.ts`
   and the guide. Ruling: drop the positional language from the header (name what the file covers
   without ordering it).
6. **Subjective observation, ruled in — `README.md:65`.** The link names `guides/src/reason.md`,
   which does not exist. Ruling: `guides/reason.md` in the text and the target.

Recorded, no change: `guides/reason.md:128` keeps "below" in a rewritten sentence while the guide
uses the locator throughout (a prose sweep item); no fence in this package executes; direct `seat`
coverage on `equations`, `facts`, and `inferences` reaches the method through `merge` only.

**Law.** `AGENTS.md`; `.claude/rules/names.md`; `.claude/rules/tests.md`;
`.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`.

**Host.** Linux, bash. Repository `/home/user/fleet/reason` at commit `a42bd0f`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. Build a throwaway probe, where you need one, under
the system temporary directory, never under the checkout. Other gate chains run on this host
concurrently; if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once and
report both readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/core/types.ts` (the one `seat` signature), `src/core/builders/managers/VariableManager.ts`
(the `seat` signature and its TSDoc), `guides/reason.md` (the named sites only),
`tests/src/core/builders/DefinitionBuilder.test.ts` (the new case only),
`tests/src/core/factories.test.ts` (the header only), `README.md:65`.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Write the finding-1 case
first and run `npm run test:src -- DefinitionBuilder` to confirm it passes against the current
`#ensureAlive()` (quote the count; then plant a temporary removal of that guard line in
`VariableManager.ts`, a file you own, run the case to see it fail, quote the failure, and restore
the line exactly). Then apply findings 2 to 6 and run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the finding-1 counts with and without the planted removal; each gate command with its
exit code and an excerpt for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the parity test rejects the renamed parameter, or when a gate fails for a cause
you cannot attribute after the re-run. Decide, record, and carry on from the wording of a comment.

## Acceptance criteria

1. The `variables.seat` DESTROYED case exists, fails under the planted guard removal, and passes
   after the restore.
2. `VariableManagerInterface.seat` and `VariableManager.seat` name their parameter `variables`.
3. The guide fence reads seat, then build, then destroy, and the Value factories intro names no
   file.
4. `rg -n 'guides/src/reason.md' README.md` returns no hit.
5. The gate chain exits 0.
6. `git status --short` lists only owned files.
