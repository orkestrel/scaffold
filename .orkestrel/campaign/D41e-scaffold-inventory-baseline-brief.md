# Unit D4-1e — `@orkestrel/scaffold`: finish the inventory baseline (successor to D4-1d)

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout while this unit runs.

## Why a successor

D4-1d (`D41d-scaffold-inventory-baseline-report.md`) stopped under its deviation contract because
the digest signature `computeManifestDigest(entries, roots, surface)` reaches callers its brief
listed off-limits. The Orchestrator scoped that brief by the files declaring the change instead of
the files the change makes false; this brief grants them. The tree carries D4-1d's partial edits
(`src/server/types.ts`, `src/server/constants.ts`, `src/server/helpers.ts`, `src/server/validators.ts`,
`tests/setupServer.ts`, `tests/src/server/helpers.test.ts`; the delta of the first three is
`D41d-partial-diff.patch.txt`). Continue from that state; do not restart it. The eight required
controls are red and none is green; no seed was written; `host.json` is unchanged.

The objective, the design, the seed, the guide, the law, the bench, the unknowns, and the Output
shape are D4-1d's (`D41d-scaffold-inventory-baseline-brief.md`, staged beside this file) and are not
restated. This file amends only the scope, the known remaining work, and the acceptance criteria.

## Known remaining work (from `npm run check` on the host after D4-1d)

```text
src/server/Materializer.ts(560,32): error TS2554: Expected 3 arguments, but got 2.
src/server/Upstream.ts(568,27): error TS2554: Expected 3 arguments, but got 2.
src/server/validators.ts(337,5): error TS18046: 'owners' is of type 'unknown'.   (and 337:26, 337:73, 340:16, 340:68)
src/server/validators.ts(337,40): error TS7006: Parameter 'owner' implicitly has an 'any' type.   (and 337:47, 340:31, 340:42)
src/server/validators.ts(369,2): error TS2769: No overload matches this call.
tests/setupServer.ts(2206,54): error TS2554: Expected 3 arguments, but got 2.
tests/src/server/helpers.test.ts(579..615, 1723): error TS2554: Expected 3 arguments, but got 2.
```

Beyond `check`: `tests/src/server/Materializer.test.ts:260,342`, `tests/src/server/Upstream.test.ts:883,914,990`
build digests with two arguments; `tests/distribution.test.ts:543` expects the declaration line
`computeManifestDigest([], []) // the digest of the empty membership`, which the changed TSDoc
example (`computeManifestDigest([], [], [])`) makes false — update that expectation to the new
line. Narrow the `unknown` values in `validators.ts` with the installed `@orkestrel/contract` guards
(no `any`, no assertion). `Materializer.ts:560` and `Upstream.ts:568` verify a manifest they hold,
so each passes that manifest's `surface`; nothing else in those two files changes.

## Scope

**Owned.** D4-1d's owned set (`src/server/helpers.ts`, `src/server/types.ts`,
`src/server/validators.ts`, `src/server/constants.ts`, `src/server/index.ts`, `tests/setupServer.ts`,
`tests/src/server/helpers.test.ts`, `tests/src/server/validators.test.ts`,
`tests/src/server/Materializer.test.ts`, `tests/setupServer.test.ts`, `guides/scaffold.md`,
`host.json` for the seed only, `tmp/codex/D41d-seed-inventory.mjs`) plus `src/server/Materializer.ts`
(the digest call at `:560` only), `src/server/Upstream.ts` (the digest call at `:568` only),
`tests/src/server/Upstream.test.ts`, and `tests/distribution.test.ts` (the one expected line).
**Off-limits.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, `src/bin/**`, `.claude/**`,
`.agents/**`, `.orkestrel/**` (the Orchestrator writes there while you run; it is not yours to
certify), `package.json`, `package-lock.json`, `dist/**`.

## Acceptance criteria

1. `npm.cmd run lint:check`, `check`, `format:check` exit 0.
2. `npm.cmd run test:src:server` exit 0 beyond the nine documented sandbox `Ollama setup`
   failures and the stale `readHostFloor` reading (the committed inventory's entry digests lag the
   guide edits until the Orchestrator's build), with D4-1d's eight controls green (they are red in
   the tree at launch — record the red reading from D4-1d's report and your own green).
3. `npm.cmd run test:setup` exit 0.
4. `npm.cmd run test:guides` exit 0.
5. `npm.cmd run test:distribution` — report the reading; it needs the built `dist/`, which you must
   not rebuild, so a failure naming only stale `dist/` declarations is an observation, not a stop.
6. `node tmp/codex/D41d-seed-inventory.mjs` exit 0; `host.json` carries `surface` with the
   collision count the seed read; the digest verifies under the new formula
   (`readSurfaceBaseline('host.json')` returns the set).
7. Only owned files changed beyond the inherited state.

## Output

D4-1d's Output shape, plus the seed reading.
