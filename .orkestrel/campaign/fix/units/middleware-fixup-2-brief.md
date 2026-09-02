# Unit middleware-fixup-2 — close the fix-round audit's open items

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

The middleware fix-round audit's two open claims are settled by runs you quote, and its two
guide-versus-test gaps are closed, in `/home/user/fleet/middleware` at commit `ec186e4`.

## Context

**Findings, each with its ruling.**

1. **Claim 5 (UNRESOLVED) — the red runs were reported, not transcribed.** Ruling: re-apply each
   recorded revert, run the file, quote the failing line and count, and restore the line exactly.
   (a) In `src/core/middlewares.ts`, temporarily reinstate a `DELETE` short-circuit at the top of
   the session handler `createSession` returns (a branch that answers `204` and skips the
   terminal when `context.method === 'DELETE'`), run
   `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/middlewares.test.ts`,
   quote the failure of "installs no route of its own on DELETE …" and the count, then remove
   the plant so `git diff -- src/core/middlewares.ts` is empty. (b) In
   `src/core/stores/DatabaseSessionStore.ts`, temporarily delete the `validateSessionLimits(options)`
   call in the constructor, run the same command over
   `tests/src/core/stores/DatabaseSessionStore.test.ts tests/src/core/factories.test.ts`, quote
   the three failures and the count, then restore the line so `git diff -- src/core/stores/DatabaseSessionStore.ts`
   is empty.
2. **F1 — `guides/middleware.md:840-847`.** The test index rows for
   `DatabaseSessionStore.test.ts` and `factories.test.ts` no longer name what those files prove.
   Ruling: extend the `DatabaseSessionStore.test.ts` row with "construction guards, rebuild
   through the injected restore step, and the fail-closed read of a row stored under the earlier
   cursor columns", and the `factories.test.ts` row with "`createDatabaseSessionStore` construction
   guard", in the row's existing voice.
3. **F2 — `tests/src/core/stores/DatabaseSessionStore.test.ts:209`.** The guide (`:675-676`)
   claims the refused row "stays in place until the table is migrated or recreated" and nothing
   asserts it after `store.get`. Ruling: after the `store.get` expectation add
   `expect(await driver.read('sessions', 'a')).toMatchObject({ lastSeen: 0, createdAt: 0 })`.

**Law.** `AGENTS.md`; `.claude/rules/tests.md`; `.claude/rules/documentation.md` § Parity.

**Host.** Linux, bash. Repository `/home/user/fleet/middleware` at commit `ec186e4`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. Other gate chains run on this host concurrently; if
`npm test` fails on a timing-suspect test, re-run `npm run test:src` once and report both
readings.

**Standing conditions.** The `it.todo` at `tests/src/server/helpers.test.ts:1186` and the
platform `runIf` cases are pre-existing and outside this unit.

## Unknowns

none.

## Scope

**Owned.** `guides/middleware.md` (the two index rows only),
`tests/src/core/stores/DatabaseSessionStore.test.ts` (the one assertion only); `src/core/middlewares.ts`
and `src/core/stores/DatabaseSessionStore.ts` for the temporary plants only, restored exactly.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Run finding 1's two plants
and restores first, then apply findings 2 and 3, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: for each plant — the exact plant, the quoted failing line and count, and the
`git diff` proof of the restore; the two guide rows after the edit; the added assertion's line;
each gate command with its exit code and an excerpt for any failure; `git diff --stat`;
`git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a plant does not redden the named test, or when a gate fails for a cause you
cannot attribute after the re-run.

## Acceptance criteria

1. Both plants reddened exactly the named tests, and `git diff` over the two source files is
   empty after the restores.
2. The two guide index rows name the added proofs.
3. The earlier-column test asserts the row is still present after `store.get`.
4. The gate chain exits 0.
5. `git status --short` lists only `guides/middleware.md` and the test file.
