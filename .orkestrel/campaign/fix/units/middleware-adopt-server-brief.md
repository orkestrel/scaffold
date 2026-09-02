# Unit middleware-adopt-server — adopt server's renamed symbols in middleware

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/middleware` at commit `ea723c4` typechecks against the accepted `@orkestrel/server`
tip `b32615d`, whose `clientRateKey` is `computeClientKey` and whose `ConnectionInfo` is
`Connection`.

## Context

The server unit's objective audit lane found middleware imports both renamed symbols; the
re-staged closure confirms it — `npm run check` exits 2 with:

```text
src/core/helpers.ts(15,10): error TS2305: Module '"@orkestrel/server"' has no exported member 'clientRateKey'.
src/core/types.ts(2,2): error TS2724: '"@orkestrel/server"' has no exported member named 'ConnectionInfo'. Did you mean 'Connection'?
```

Sites: `src/core/helpers.ts:15` (import), `:25` (TSDoc), `:42` (call); `src/core/types.ts:2`
(import), `:278` (`readonly connection?: ConnectionInfo`); `tests/src/core/helpers.test.ts:83`
(case title "collapses an IPv6 client IP to its /64 network via clientRateKey" — rename the
symbol and replace `via` with `through`); `guides/middleware.md:91` (the `ConnectionState` row) and
`:422` (prose naming `clientRateKey`). Ruling: adopt both names at every site; change nothing
else. Keep imports sorted case-insensitively.

**Law.** `AGENTS.md`; `.claude/rules/writing.md`; `.claude/rules/documentation.md` § Parity.

**Host.** Linux, bash. Repository `/home/user/fleet/middleware` at commit `ea723c4`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged including server `b32615d` (`node /home/user/work/verify-stage.mjs middleware`).
Do not run `npm install`. The `it.todo` at `tests/src/server/helpers.test.ts:1186` and the platform
`runIf` cases are pre-existing. Other gate chains run on this host concurrently; if `npm test`
fails on a timing-suspect test, re-run `npm run test:src` once and report both readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/core/helpers.ts`, `src/core/types.ts`, `tests/src/core/helpers.test.ts`,
`guides/middleware.md` — each only at the sites named.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the renames, run the
word-boundary and inflected sweep for `clientRateKey` and `ConnectionInfo` over `src`, `tests`,
`guides/middleware.md`, `README.md`, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: each site changed (file:line); the sweep and every hit classified; each gate
command with its exit code and an excerpt for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when `npm run check` reports a red beyond the two errors above, or when a gate fails
for a cause you cannot attribute after the re-run.

## Acceptance criteria

1. `rg -n 'clientRateKey|ConnectionInfo' src tests guides/middleware.md README.md` returns no hit.
2. The gate chain exits 0.
3. `git status --short` lists only owned files.
