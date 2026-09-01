# Campaign context block (pasted into every unit brief of the second contract performance campaign)

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`, `quality.md`; skill: none unless the brief names one; guide `/home/user/contract/guides/contract.md`.

**Host.** Linux container, bash, 4 CPUs, node v22.22.2, npm 10. Working path `/home/user/contract` (git branch `claude/method-memoization-contracts-yus26p`, baseline commit named in the brief, clean tree at dispatch). Outbound HTTPS goes through a proxy; nothing in a unit needs the network. Foreground commands are capped at 10 minutes. `oxfmt` and `oxlint` are the formatter and linter (`npm run format:check`, `npm run lint:check`); `npm run check` is the typecheck; scoped tests run as `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <test file>`. A whole-suite run (`npm test`) takes minutes and is an observation, never a criterion, for a unit.

**Gates the Orchestrator runs after the unit exits.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, in that order, plus the paired A/B and the answer-parity differential against the 0.0.15 dist. A unit reports its own scoped readings; the authoritative runs are the Orchestrator's.

**Standing conditions.** No file is expected dirty at dispatch. No gate is red at the baseline. No role commits, pushes, installs, or runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Write instruments only under `/home/user/contract/tmp/` (gitignored) and remove them before returning. Never read or print credentials or environment values.

**Measurement doctrine for this campaign.** Every performance claim rests on the Orchestrator's paired A/B (6 fresh processes, load order swapped, admission: median across replicates ≤ 0.95 and every replicate ≤ 0.98 on the target family) and on the answer-parity differential reading IDENTICAL. A unit never claims a magnitude; it reports what it measured under what conditions.

**Test doctrine.** Real implementations only: no mocks, spies, module replacement, or fake clocks. A pin is named for what it proves, never for the control that specified it. A behaviour change lands with the test that turns red without it: record the exact command and its failing count before the fix, then the same command green after it.

**Retention.** The Orchestrator copies the brief and the returned report to `/home/user/scaffold/.orkestrel/contract/`. The unit writes its report as its final message.

# Unit U2 — success-path allocations in `readValue` and a bounded `preview` fast path

## Role and engine

`implementer` on Opus 5, native Claude subagent, clean context (objective work class; Opus substitutes for the Sol bench the user excluded). Perform the assignment directly and spawn nothing.

## Objective

Two helper-level changes in `src/core/helpers.ts` that preserve every published answer, throw, and `received` text: `readValue` keeps every eager read and builds its context object and `ContractError` only on refusal; `preview` renders a short quoted string through one whole-string `JSON.stringify` and keeps the per-character walk for everything else.

## Context

**Evidence.** Baseline commit: `e81ba64` (the accepted U1 checkpoint on `claude/method-memoization-contracts-yus26p`; `git -C /home/user/contract status --porcelain` → empty at dispatch). `readValue` sits at `src/core/helpers.ts` (`grep -n '^export function readValue' src/core/helpers.ts`); `preview` at `grep -n '^export function preview' src/core/helpers.ts`. `PREVIEW_LIMIT` is `64` in `src/core/constants.ts`. Guide rows: `readValue` at `guides/contract.md:215` ("The copy reads OWN fields only … so no refusal this module authors carries — or retains by identity — a value its caller never supplied"), `preview` at line 602. Pins: `tests/src/core/helpers.test.ts:524` (readValue describe), `:573` (a polluted `Object.prototype` field stays out of the published context for `path`, `shape`, `limit`, `received`), `:603` (the sharper half at a public door); the `preview` describe in the same file.

**Measurements.** Dist-level surgeries (`/home/user/scaffold/.orkestrel/contract/instruments/a2c-patch.mjs`, `a11-patch.mjs`) read in 6 fresh processes against the 0.0.15 dist: A2c audit-medium median 0.866 (every replicate ≤ 0.895), audit-deep 0.871 (≤ 0.887), parse-medium 0.959; A11 explain-medium on an invalid value 0.819 (≤ 0.836); parity IDENTICAL for both; `preview` boundary equivalence IDENTICAL over ASCII, escapes, surrogate pairs, a lone surrogate, lengths 62/63/64/200, and symbols (`results/a11-boundary.out`). The scoped helpers suite runs in about 3.4 s.

**Control identifiers.** The dist probes are A2c and A11. Name every test for what it proves, never for a probe.

**Standing conditions.** None beyond the campaign block.

## Mechanism (fixed by the design round)

### `readValue`

1. Keep the single own-only spread projection `{ path: undefined, shape: undefined, limit: undefined, received: undefined, ...source }` inside the existing eager `attempt`, exactly where it is, so every own enumerable key of `context` is still read there (a throwing getter on any own key, advertised or not, still refuses with `readValue: options could not be read`), and a polluted `Object.prototype` still contributes nothing. Build that projection only when `source` is defined.
2. Keep the `code` narrowing and the `reader`/`subject` reads inside the same `attempt`. Return from it one flat record: `reader`, `subject`, `code`, and the owned projection (or `undefined`).
3. Move the construction of the published `context` object (the four conditional spreads) and the `ContractError` into the failure branch after `attempt(callback)`. The published error is byte-identical: same message, same `code`, same `context` keys in the same order, same `cause`.
4. Do not add named reads through `Object.hasOwn`; do not drop the spread; do not change `ReadValueOptions` or `ContractErrorContext`.

### `preview`

1. For a string value (`quoted`), when `source.length <= PREVIEW_LIMIT`, encode once: `const whole = INTRINSICS.stringify(source)`. When `whole.length <= PREVIEW_LIMIT`, return `whole`. Otherwise fall through to the existing per-character walk unchanged. Derive and state in the TSDoc why the predicate is exact: the walk appends every token when the encoded inner length is at most `PREVIEW_LIMIT - 2` and then closes the quote, which is exactly `whole`; at inner length `PREVIEW_LIMIT - 1` the walk closes with `…`, so `whole.length === PREVIEW_LIMIT + 1` correctly takes the walk.
2. The `source.length` gate keeps the documented promise that enormous primitive text is never fully traversed.
3. Symbols keep the walk unchanged (their output is unquoted text `JSON.stringify` cannot produce).

## Unknowns

None.

## Scope

**Owned.** `src/core/helpers.ts` (`readValue`, `preview`, and their TSDoc), `tests/src/core/helpers.test.ts`, `guides/contract.md` (only if a sentence in the `readValue` or `preview` row states construction timing or the traversal bound in a way the change makes false; report if you find none needs to move).

**Shared (report-only).** None.

**Off-limits.** Every other file, including `src/core/types.ts` and `src/core/constants.ts`.

**What asserts the state this change ends.** Derive by running the scoped helpers suite after each change. Expected to stay green: `helpers.test.ts:524–620` (readValue cases including the four pollution cases at `:573` and the door case at `:603`), the `preview` describe. A pin going red is a deviation.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or history-rewriting git command. Instruments only under `/home/user/contract/tmp/`, removed before returning.

## Execution

Perform the assignment directly and spawn nothing.

## Tests to add (named for what they prove)

- a throwing getter on an unadvertised own context key still refuses the read with `readValue: options could not be read` (this is the pin the readValue mutation probe turns red);
- a refused read publishes the same context keys, in the same order, and the same cause as before (assert on a fixture carrying all four fields plus one absent field);
- a successful read with a context carrying every field returns the callback value unchanged;
- a string whose escaped form crosses `PREVIEW_LIMIT` renders identically through the fast path and the walk (compare against a hand-derived expectation, at inner lengths `PREVIEW_LIMIT - 2`, `PREVIEW_LIMIT - 1`, and `PREVIEW_LIMIT`);
- a lone surrogate and a surrogate pair render the same as before;
- a string longer than `PREVIEW_LIMIT` is not fully encoded (prove through a value whose length is far past the limit and whose output is the clipped walk result; this is the pin the preview mutation probe turns red when the `source.length` gate is removed);
- a symbol still renders unquoted.

Real values only; no spies. Follow the surrounding case style.

## Red/green proof (record the exact commands and counts)

Two mutation probes, each: remove the load-bearing line, run the scoped helpers suite, record the failing count, restore, record green. For `readValue`: remove the `...source` spread from the eager projection (the unadvertised-key test must fail). For `preview`: remove the `source.length <= PREVIEW_LIMIT` gate (the not-fully-encoded test must fail). Record the baseline count before your edits.

## Output

Return, as your final message: each mechanism as landed in two sentences; the exact scoped command with baseline, each mutation-red, and final green counts; the `git status --porcelain` output; any guide sentence changed, quoted; any deviation. No process diary.

## Deviation contract

Stop and report on: a pin going red; a needed change outside the owned files; a formatter or lint failure you cannot converge on your owned files. Decide, record, and carry on from: TSDoc wording, test placement, the exact form of the flat record's field names.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. The scoped helpers suite exits 0 with the added tests present and both mutation probes recorded red then green.
5. `npm run test:guides` exits 0.
6. `git status --porcelain` lists only the owned files.

**Observations, not criteria.** `npm test`; timing.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after the unit returns and supplies them to the audit lanes with this brief and the report.
