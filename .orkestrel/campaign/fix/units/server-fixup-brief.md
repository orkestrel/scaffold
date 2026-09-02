# Unit server-fixup — close the server unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/server` at commit `b32615d` spells its error code in the fleet's casing, names its
coding-selection leaf with the vocabulary's `resolve*` prefix, and states the `SSE_HEADERS` merge
rule and the `Stream` entity in the guide's voice.

## Context

**Findings, each with its ruling.**

1. **Both lanes — `ServerErrorCode`.** `src/server/types.ts:491` declares `'status'` while every
   fleet `*ErrorCode` union spells its members `UPPER_SNAKE` (`SSEErrorCode = 'OVERFLOW'`,
   `SQLiteErrorCode`, `IndexedDBErrorCode`, `TemplateErrorCode`, `WebSocketErrorCode`). Ruling:
   `'STATUS'`. Carry `src/server/types.ts:491` and the `@remarks` at `:732`, the throw at
   `src/server/Server.ts:193`, `tests/src/server/Server.test.ts:113`,
   `tests/src/server/errors.test.ts:94-128`, and the guide's Types row at `guides/server.md:161`
   and contract item near `:252`. Leave `ServerStatus`'s lowercase phase values alone.
2. **Subjective F4, ruled by the Orchestrator (who named the symbol) — `pickCoding`.** The
   vocabulary glosses `resolve*` as "picks the effective value from options and defaults", and
   this package already spells that job `resolveSecure`, `resolveOrigin`, `resolveSecurityHeader`.
   Ruling: `pickCoding` → `resolveCoding` at `src/server/helpers.ts:605,652,653,656,678,698`,
   `src/server/Negotiator.ts:2,47`, `tests/src/server/helpers.test.ts:33,548,562-573`, the guide
   Helpers row at `guides/server.md:100`, and the tests index at `:665`. Keep imports sorted.
3. **Subjective R1 — `guides/server.md:73`.** The `SSE_HEADERS` Constants row says a `Stream`
   "always sets" these headers, while `tests/src/server/Stream.test.ts:31-32` proves a caller
   repeating an exact key replaces the value. Ruling: the row reads "The SSE response headers a
   `Stream` merges under any caller `headers` — a caller repeating one of these exact keys
   replaces its value."
4. **Subjective R2 — `src/server/Stream.ts:6`.** The class TSDoc opens with a verb phrase while
   every other entity class in the package opens with a noun phrase and the guide's Entities row
   names it "The Server-Sent-Events handle over a streaming `Response`". Ruling: the first
   sentence reads "The Server-Sent-Events handle over an open, fetch-standard streaming
   `Response`."; leave the rest of the block.

Recorded, no change: the report's carrier omission (middleware adopts in its own unit, running);
the report's line counts for the two new files; the `compute*` names and the Stream member set
stand; the bare `Error` at `src/server/helpers.ts:106` and the `should` at `guides/server.md:404`
are pre-existing; the abort mirror's `openStream` fence belongs upstream.

**Law.** `AGENTS.md`; `.claude/rules/names.md` (§ Standalone helpers as quoted in
`/home/user/scaffold/tmp/units/breaking/server-brief.md` § Vocabulary); `.claude/rules/documentation.md`
§ Parity; `.claude/rules/writing.md`.

**Host.** Linux, bash. Repository `/home/user/fleet/server` at commit `b32615d`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged. Do not run `npm install`. The `it.skipIf(!BINDS_IPV6)` case is pre-existing.
Other gate chains run on this host concurrently; if `npm test` fails on a timing-suspect test,
re-run `npm run test:src` once and report both readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/server/types.ts`, `src/server/Server.ts`, `src/server/helpers.ts`,
`src/server/Negotiator.ts`, `src/server/Stream.ts`, `guides/server.md`, `README.md` if it names
either symbol, `tests/src/server/Server.test.ts`, `tests/src/server/errors.test.ts`,
`tests/src/server/helpers.test.ts` — each only at the sites the findings name.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the findings in
order, run the word-boundary and inflected sweep for `pickCoding` and `'status'` (as a code
literal, not the `ServerStatus` phase or the `status` property) over `src`, `tests`,
`guides/server.md`, `README.md`, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the sweep and every hit classified; each gate command with its exit code and an excerpt
for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a rename collides with an existing export, or when a gate fails for a cause you
cannot attribute after the re-run. Decide, record, and carry on from the wording of a sentence.

## Acceptance criteria

1. `ServerErrorCode` is `'STATUS'` and no `'status'` code literal survives in `src`, `tests`, or
   the guide.
2. `rg -n 'pickCoding' src tests guides/server.md README.md` returns no hit; `resolveCoding` is
   exported and both doors call it.
3. The `SSE_HEADERS` row states the merge rule and the `Stream` block opens with the noun phrase.
4. The gate chain exits 0.
5. `git status --short` lists only owned files.
