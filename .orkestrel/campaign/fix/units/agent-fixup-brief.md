# Unit agent-fixup — close the agent unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

`@orkestrel/agent` at commit `df12fab` names no moved symbol in any example, TSDoc, or guide
row, and distinguishes the `partial` policy from the `partial` result flag wherever both appear.

## Context

**Findings, each with its ruling.** Apply in this order.

1. **Subjective 1 — the `createAgent` example.** `src/core/factories.ts:393` reads
   `if (chunk.type === 'token')`; `AgentChunk` discriminates on `category`. Ruling:
   `chunk.category === 'token'`.
2. **Subjective 2 — `estimateMessages` TSDoc.** `src/core/helpers.ts:159` and `:171` name the
   removed `BudgetOptions.consume` option key ("the default `consume` estimator", "supplies its
   own `consume` to `createBudget`"). Ruling: `consumer` at both, matching `guides/agent.md:436`.
3. **Subjective 3 — the fence comment.** `guides/agent.md:260` reads "consume = a token estimator,
   max = the context window" over a fence that writes `consumer:`. Ruling: "consumer = a token
   estimator, max = the context window".
4. **Subjective 4 — `collectImageData` example.** `src/core/helpers.ts:667-668` takes
   `content: { base64: '<payload>', … }` and returns `// ['<base64>']`. Ruling: `// ['<payload>']`.
5. **Subjective 5 — the `AgentJobError` row.** `guides/agent.md:508` reads "when a job ended
   `partial` and `partial` is false". Ruling: "when a job ended partial and the `partial` policy
   is `false`", matching `src/core/errors.ts:60`.
6. **Subjective 6 — the `open` Methods row.** `guides/agent.md:751` says a conversation is
   "HYDRATED from the `store` through the seed seam"; s08-24 deleted the positional seed. Ruling:
   "through the `snapshot` seam".
7. **Subjective 7 — the `snapshot` Methods row.** `guides/agent.md:739` reads "the durable
   analogue of the seed". Ruling: "the durable analogue of the `snapshot` option", matching
   `src/core/types.ts:1802`.

8. **Objective F5 — a published type whose TSDoc calls it internal.** `src/core/types.ts:841-842`
   describes `RunOutcome` as "the INTERNAL precursor to the settled `AgentResult` … not a
   caller-facing shape" while `src/core/index.ts` star-exports it and the parity `INTERNAL` list is
   empty, so it is documented public surface. Ruling: the remark states what the value is — the
   settled outcome one run returns before the agent folds it into `AgentResult` — without
   calling it internal or caller-facing; keep the rest of the block.

Recorded, no change: `attachUserImages`, the `#trim(messages, latch)` parameter, the deleted
duplicate hydrate tests, and `InstructionManagerInterface.format` beside
`InstructionManagerOptions.format` stand as the subjective lane recommends;
`InstructionInterface.format` being a `string` beside the object-shaped manager members is a
successor row for the per-item level; the `README.md` `guides/src/` links are the `readme-links`
sweep's.

**Law.** `AGENTS.md`; `.claude/rules/documentation.md`; `.claude/rules/typescript.md`;
`.claude/rules/writing.md`. Read the copies under
`node_modules/@orkestrel/scaffold/dist/host/claude/rules/` if the checkout's `.claude/rules/`
differs.

**Host.** Linux, bash. Repository `/home/user/fleet/agent` at commit `df12fab`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the closure staged. Do not run `npm install`. Other gate chains run on this host
concurrently; if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once and
report both readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/types.ts` (the `RunOutcome`
remark only), `guides/agent.md` — each only at the named sites.

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror, every other file,
every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply the findings in
order, run the word-boundary sweep and the case-insensitive inflected sweep for `chunk.type`,
`delta.type`, `consume` (as an option key, not the method), `seed seam`, `analogue of the seed`,
and `<base64>` over `src`, `tests`, `guides/agent.md`, `README.md`, classifying every hit, then
run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the sweep and every hit classified; each gate command with its exit code and an
excerpt for any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when a gate fails for a cause you cannot attribute after the re-run. Decide,
record, and carry on from the wording of a sentence.

## Acceptance criteria

1. `rg -n 'chunk\.type|delta\.type' src tests guides/agent.md README.md` returns no hit.
2. `rg -n '`consume`' src guides/agent.md` returns only method references; the two TSDoc sites
   and the fence comment read `consumer`.
3. `rg -n 'seed seam|analogue of the seed|<base64>' src guides/agent.md` returns no hit; the
   `AgentJobError` row names the `partial` policy; `rg -n 'INTERNAL precursor' src` returns no hit.
4. The gate chain exits 0.
5. `git status --short` lists only owned files.
