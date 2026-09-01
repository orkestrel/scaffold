# Campaign context block (pasted into every unit brief of the second contract performance campaign)

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`, `quality.md`; skill: none unless the brief names one; guide `/home/user/contract/guides/contract.md`.

**Host.** Linux container, bash, 4 CPUs, node v22.22.2, npm 10. Working path `/home/user/contract` (git branch `claude/method-memoization-contracts-yus26p`, baseline commit named in the brief, clean tree at dispatch). Outbound HTTPS goes through a proxy; nothing in a unit needs the network. Foreground commands are capped at 10 minutes. `oxfmt` and `oxlint` are the formatter and linter (`npm run format:check`, `npm run lint:check`); `npm run check` is the typecheck; scoped tests run as `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <test file>`. A whole-suite run (`npm test`) takes minutes and is an observation, never a criterion, for a unit.

**Gates the Orchestrator runs after the unit exits.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, in that order, plus the paired A/B and the answer-parity differential against the 0.0.15 dist. A unit reports its own scoped readings; the authoritative runs are the Orchestrator's.

**Standing conditions.** No file is expected dirty at dispatch. No gate is red at the baseline. No role commits, pushes, installs, or runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Write instruments only under `/home/user/contract/tmp/` (gitignored) and remove them before returning. Never read or print credentials or environment values.

**Measurement doctrine for this campaign.** Every performance claim rests on the Orchestrator's paired A/B (6 fresh processes, load order swapped, admission: median across replicates ≤ 0.95 and every replicate ≤ 0.98 on the target family) and on the answer-parity differential reading IDENTICAL. A unit never claims a magnitude; it reports what it measured under what conditions.

**Test doctrine.** Real implementations only: no mocks, spies, module replacement, or fake clocks. A pin is named for what it proves, never for the control that specified it. A behaviour change lands with the test that turns red without it: record the exact command and its failing count before the fix, then the same command green after it.

**Retention.** The Orchestrator copies the brief and the returned report to `/home/user/scaffold/.orkestrel/contract/`. The unit writes its report as its final message.

# Unit U3 — compile-time pattern capture for the diagnostic string leaves

## Role and engine

`implementer` on Opus 5, native Claude subagent, clean context (objective work class with a documentation-voice tail; Opus substitutes for the Sol bench the user excluded). Perform the assignment directly and spawn nothing.

## Objective

The compiled auditor and reporter rebuild a string leaf's stateless pattern once at compile time and hand it to `createStringFaults`, which gains an optional trailing `pattern` parameter and stays the single source of the string refinement report; every published fault, its order, its `limit` text, and the shape accessor's fresh-`RegExp` contract are unchanged.

## Context

**Evidence.** Baseline commit: `163490f` (the accepted U2 checkpoint on `claude/method-memoization-contracts-yus26p`; `git -C /home/user/contract status --porcelain` → empty at dispatch). Note one fact that moved since this brief was drafted: `readValue` now reads its options once into a flat record and builds the published context only on refusal (U2), which changes nothing about how you call it at compile time. Sites: `src/core/ContractCompiler.ts:1426` (auditor `case 'string'`, calling `createStringFaults(node, value, path)` at `:1434`) and `:1740` (reporter `case 'string'`, `createStringFaults(node, parsed, path)` at `:1749`); the compile-time read idiom for a pattern already exists in the schema case at `:720–732` (`readPatternSource(owned.pattern)` with a coded `ContractError` on an unreadable source). `createStringFaults` sits in `src/core/helpers.ts` (`grep -n '^export function createStringFaults'`), checking `shape.pattern` through `readPattern(shape.pattern)` and `matchesPattern`, and reading `readPatternSource(shape.pattern)` for the `limit` field. `readPattern` strips only `g` and `y` and preserves `source` exactly, so `readPatternSource` of the rebuild equals `readPatternSource` of the shape's accessor value. `owned` in the compiler is the compiler's own clone (`ownShape`), whose `pattern` accessor yields a fresh frozen `RegExp` with identical `source` and `flags` on every read (`ShapeCloner.#captureString`), so a compile-time capture and a call-time read are value-identical. Guide rows: `createStringFaults` at `guides/contract.md:597` (it names the owned stateless rebuild), the shape accessor contract at lines 391, 395, and 700 (untouched by this unit).

**Measurements.** A dist-level surgery of this mechanism (`/home/user/scaffold/.orkestrel/contract/instruments/a3b-patch.mjs`) read in 6 fresh processes against the 0.0.15 dist: audit-deep median 0.908 (every replicate ≤ 0.945), explain-deep 0.887 (≤ 0.910), audit-medium neutral; parity IDENTICAL (`results/multi-a3b.out`, `results/parity-a3b.out`). Scoped suites: helpers 3.4 s; compilers larger (report its time).

**Control identifiers.** The dist probe is A3b. Name every test for what it proves.

**Standing conditions.** None beyond the campaign block.

## Mechanism (fixed by the design round)

1. `createStringFaults(shape, value, path, pattern?)` in `src/core/helpers.ts`: the fourth parameter is the stateless rebuild of the same shape's own pattern, typed `RegExp | undefined`. Inside the existing `readValue` body: `const stateless = pattern ?? (shape.pattern === undefined ? undefined : readPattern(shape.pattern))`; the check becomes `if (stateless !== undefined && !matchesPattern(stateless, value))` and the `limit` reads `readPatternSource(stateless)`. `min` and `max` keep reading the shape at call time. Fault order `min`, `max`, `pattern` is unchanged. Update the TSDoc: the parameter is the compiler's one-time rebuild of the shape's own pattern; omitted, the helper rebuilds from the shape as before. Keep the `@throws` and the single-source remarks true.
2. In `#auditOf` `case 'string'` and `#reportOf` `case 'string'` (`ContractCompiler.ts`), capture at compile time, beside `refined`: `const pattern = owned.pattern === undefined ? undefined : readValue(() => readPattern(owned.pattern), 'compileAuditor' /* or 'compileReporter' */, { subject: 'pattern', code: 'pattern', context: { shape: 'string' } })`, and pass it as the fourth argument. Import `readPattern` from `./helpers.js` (already exported). The `readValue` wrap is mandatory: `readPattern` throws on an unreadable source or flags, and the compiler publishes only `ContractError`.
3. Nothing else changes: the parser and guard string cases, `createNumberFaults`, the shape accessor, and `readPattern` itself stay as they are.

## Unknowns

None.

## Scope

**Owned.** `src/core/helpers.ts` (`createStringFaults` and its TSDoc), `src/core/ContractCompiler.ts` (the auditor and reporter `case 'string'` blocks and the import list), `tests/src/core/helpers.test.ts`, `tests/src/core/compilers.test.ts`, `guides/contract.md` (the `createStringFaults` row moves with the signature: it now states the optional pre-captured stateless pattern and that the compiled doors supply it once per compile).

**Shared (report-only).** None.

**Off-limits.** Every other file, including `src/core/types.ts` (no public type changes: the parameter is a plain `RegExp`).

**What asserts the state this change ends.** Derive by running the scoped helpers and compilers suites after the change. Expected to stay green: `helpers.test.ts:2892` (createStringFaults cases), `compilers.test.ts:3686` (parser re-applies refinements), every pattern-fault case in `compilers.test.ts` (grep `constraint: 'pattern'`). A pin going red is a deviation.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or history-rewriting git command. Instruments only under `/home/user/contract/tmp/`, removed before returning.

## Execution

Perform the assignment directly and spawn nothing.

## Tests to add (named for what they prove)

- `createStringFaults` with a supplied stateless pattern and the same call without it produce byte-identical faults for the same shape, including the `limit` text and the order `min`, `max`, `pattern` (fixture: a shape with all three refinements and a value failing all three);
- `createStringFaults` applies a supplied pattern rather than re-reading the shape (fixture: shape pattern `/^a$/`, supplied pattern `/^b$/`, value `'b'` → no pattern fault; this is the pin the mutation probe turns red);
- a supplied pattern carrying the `g` flag from a caller is applied without moving any `lastIndex` on that caller's object (the helper receives the rebuild, so assert the rebuild path: a sticky or global caller pattern passed through `readPattern` matches repeatedly with `lastIndex` unchanged);
- a compiled auditor and a compiled reporter over a pattern-refined string shape report a pattern fault with the same `limit` text and path as the 0.0.15 tree (assert the exact fault object).

Real values only; no spies.

## Red/green proof (record the exact commands and counts)

Mutation probe: in `createStringFaults`, replace `stateless` in the check with `readPattern(shape.pattern)` when `shape.pattern` is defined (that is, ignore the supplied argument); run the scoped helpers suite and record the failing count (the supplied-pattern test must fail); restore and record green. Record the baseline counts of both scoped suites before your edits.

## Output

Return, as your final message: the mechanism as landed in two sentences; the new signature; the exact scoped commands with baseline, mutation-red, and final green counts and the compilers suite's duration; the `git status --porcelain` output; the guide row as changed, quoted; any deviation. No process diary.

## Deviation contract

Stop and report on: a pin going red; a needed change outside the owned files, including `types.ts`; a formatter or lint failure you cannot converge on your owned files. Decide, record, and carry on from: TSDoc wording, the reader name passed to the compile-time `readValue`, test placement.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. The scoped helpers suite and the scoped compilers suite exit 0 with the added tests present and the mutation probe recorded red then green.
5. `npm run test:guides` exits 0.
6. `git status --porcelain` lists only the owned files.

**Observations, not criteria.** `npm test`; timing.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after the unit returns and supplies them to the audit lanes with this brief and the report.
