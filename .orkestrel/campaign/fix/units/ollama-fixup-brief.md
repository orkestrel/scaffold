# Unit ollama-fixup — name the error options for the class that takes them

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/ollama` at commit `6a92c05` names the options type of `OllamaHTTPError` in the
`{Entity}Options` form of the entity that takes it.

## Context

**Finding and ruling.** The objective lane found `OllamaErrorOptions` (`src/server/types.ts:152`)
naming an entity the package does not export — the sole error entity is `OllamaHTTPError`
(`src/server/errors.ts:29`) — while `.claude/rules/names.md` § Type-level identifiers fixes the form
as `{Entity}Options`. Ruling (amending the s18-34 carrier's name): `OllamaErrorOptions` →
`OllamaHTTPErrorOptions` at `src/server/types.ts:144-154` (the declaration and its TSDoc),
`src/server/errors.ts:6,32`, the guide Surface row at `guides/ollama.md:69` and any prose naming
it, and `tests/src/server/errors.test.ts:1,6,12`; keep imports sorted. Nothing else moves.

Recorded, no change: s18-09 stands refused under the external-mirror rule; the wire member
`type: 'function'` on `WireChatRequest` against the vocabulary's "never `type` as a member name"
clause is a names.md question for scaffold (a declared wire body mirrors the field it serializes);
the vendored `guides/agent.md`, `guides/budget.md`, and `guides/ndjson.md` mirrors refresh at the
re-pin.

**Law.** `AGENTS.md`; `.claude/rules/names.md`; `.claude/rules/documentation.md` § Parity. Read
the copies under `node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's
`.claude/rules/` differs.

**Host.** Linux, bash. Repository `/home/user/fleet/ollama` at commit `6a92c05`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the closure staged. Do not run `npm install`. `test:service` (a live daemon) and
`test:distribution` are outside `npm test`.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/server/types.ts`, `src/server/errors.ts`, `guides/ollama.md`,
`tests/src/server/errors.test.ts` — at the sites the rename reaches.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the rename, sweep
`OllamaErrorOptions` word-boundary and case-insensitively over `src`, `tests`, `guides/ollama.md`,
`README.md`, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: the finding closed with the file and line of each change, or stopped with the
deviation; the sweep result; each gate command with its exit code and an excerpt for any
failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the new name collides with an existing export, or when a gate fails for a
cause you cannot attribute after the re-run.

## Acceptance criteria

1. `rg -n 'OllamaErrorOptions' src tests guides/ollama.md README.md` returns no hit;
   `OllamaHTTPErrorOptions` is declared in `types.ts`, consumed by the constructor, documented in
   the guide row, and imported by the test.
2. The gate chain exits 0.
3. `git status --short` lists only owned files.
