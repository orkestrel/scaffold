# Campaign context block (pasted into every unit brief of the second contract performance campaign)

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`, `quality.md`; skill: none unless the brief names one; guide `/home/user/contract/guides/contract.md`.

**Host.** Linux container, bash, 4 CPUs, node v22.22.2, npm 10. Working path `/home/user/contract` (git branch `claude/method-memoization-contracts-yus26p`, baseline commit named in the brief, clean tree at dispatch). Outbound HTTPS goes through a proxy; nothing in a unit needs the network. Foreground commands are capped at 10 minutes. `oxfmt` and `oxlint` are the formatter and linter (`npm run format:check`, `npm run lint:check`); `npm run check` is the typecheck; scoped tests run as `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <test file>`. A whole-suite run (`npm test`) takes minutes and is an observation, never a criterion, for a unit.

**Gates the Orchestrator runs after the unit exits.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, in that order, plus the paired A/B and the answer-parity differential against the 0.0.15 dist. A unit reports its own scoped readings; the authoritative runs are the Orchestrator's.

**Standing conditions.** No file is expected dirty at dispatch. No gate is red at the baseline. No role commits, pushes, installs, or runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Write instruments only under `/home/user/contract/tmp/` (gitignored) and remove them before returning. Never read or print credentials or environment values.

**Measurement doctrine for this campaign.** Every performance claim rests on the Orchestrator's paired A/B (6 fresh processes, load order swapped, admission: median across replicates ≤ 0.95 and every replicate ≤ 0.98 on the target family) and on the answer-parity differential reading IDENTICAL. A unit never claims a magnitude; it reports what it measured under what conditions.

**Test doctrine.** Real implementations only: no mocks, spies, module replacement, or fake clocks. A pin is named for what it proves, never for the control that specified it. A behaviour change lands with the test that turns red without it: record the exact command and its failing count before the fix, then the same command green after it.

**Retention.** The Orchestrator copies the brief and the returned report to `/home/user/scaffold/.orkestrel/contract/`. The unit writes its report as its final message.

# Unit U3f — fix round for U3: one owned-pattern helper, honest documentation of the supplied argument, the read-count pin

Successor of `u3-pattern-brief.md` (U3, report `u3-pattern-report.md`). What changed and why: the audit round (`u3-audit-verdict.md`) found the guide row and TSDoc promising, unconditionally, that a caller's `lastIndex` never moves and that the report is identical with or without the argument, while the supplied-argument path applies its argument as given; found the compile-time capture duplicated in both leaves and at `stringOf`; found the auditor leaf's comment mis-stating the schema leaf's boundary; and ruled the omitted-argument path's two reads of `shape.pattern` (was three) an accepted improvement that needs a pin and a sentence.

## Role and engine

`implementer` on Opus 5, native Claude subagent, clean context (naming and documentation voice; Opus substitutes for the excluded Sol bench). Perform the assignment directly and spawn nothing.

## Objective

The three sites that rebuild a declaration's pattern through a coded `readValue` refusal (`stringOf` in `src/core/combinators.ts`, the auditor and reporter string leaves in `src/core/ContractCompiler.ts`) call one exported helper in `src/core/helpers.ts`; `createStringFaults`'s TSDoc and guide row state the supplied argument's prerequisite and failure behaviour and the `limit`'s source truthfully; a pin binds the two-reads discipline; the leaf comment states what is true.

## Context

**Evidence.** Dirty tree over checkpoint `163490f` with U3's edits (`git status --porcelain`: `guides/contract.md`, `src/core/ContractCompiler.ts`, `src/core/helpers.ts`, `tests/src/core/compilers.test.ts`, `tests/src/core/helpers.test.ts`); that is the state you correct. Reproductions (`/home/user/scaffold/.orkestrel/contract/results/u3-referrals.out`): on this tree `createStringFaults` reads a hand-rolled shape's `pattern` accessor twice per call (three on the checkpoint), and `createStringFaults({ type: 'string', pattern: /^abc$/ }, 'abc', [], /^abc$/g)` answers `0 faults @ lastIndex 3`, then `1 @ 0`, then `0 @ 3` across three calls. Sites: `src/core/combinators.ts:1033-1043` (`stringOf`: `readValue(() => readPattern(source), 'stringOf', { subject: 'pattern', code: 'pattern', context: { shape: 'string' } })`); `src/core/ContractCompiler.ts:1437-1446` and `:1761-1770` (the leaves, same triple with readers `compileAuditor` / `compileReporter`); `matchOf` at `combinators.ts:985-989` uses no `context` and stays as it is. `ownShape` in `src/core/cloners.ts` is the package's precedent for a verb-first `own…` helper that returns an owned copy. The schema leaf at `ContractCompiler.ts:727-733` reads the accessor with a bare `readPatternSource` and throws an explicit `ContractError('compileSchema: pattern source could not be read', { code: 'pattern', context: { shape: 'string' } })` — it does not use `readValue`.

**Standing conditions.** Dirty tree as stated. `guides/contract.md` carries U3's `createStringFaults` row and formatter re-padding.

## Mechanism (fixed by the audit reconciliation)

1. **One helper.** Add to `src/core/helpers.ts`, beside `readPattern`, an exported `{verb}{Noun}` helper — `ownPattern(pattern: RegExp, reader: string): RegExp` unless `.claude/rules/names.md` gives you a reason to choose another single verb; state the reason in the report if you do — whose body is exactly `readValue(() => readPattern(pattern), reader, { subject: 'pattern', code: 'pattern', context: { shape: 'string' } })`. TSDoc: the rebuild is stateless (`g`/`y` stripped) so one result answers every value alike and a compiled door can hold it for the plan's life; `@throws {ContractError}` coded `pattern` as `<reader>: pattern could not be read` when the source or flags cannot be read. Replace the inline construction at the three sites with a call to it, keeping each site's reader name so every published refusal message is unchanged. `matchOf` stays untouched.
2. **Vocabulary.** The leaves and `stringOf` name the helper's result `pattern`; keep `stateless` inside `createStringFaults` for the resolved value (it names the property that makes sharing safe). Do not rename `owned` in `matchOf`.
3. **Comment.** Replace the auditor leaf's clause "so the read runs through the same boundary the schema leaf uses for the same accessor" with "so an unreadable source or flags refuses with the same `pattern` code and `{ shape: 'string' }` context the schema leaf publishes"; the reporter leaf's comment refers to the auditor's and stays consistent.
4. **`createStringFaults` TSDoc** (`src/core/helpers.ts`, the remark and `@param`): qualify the `lastIndex` sentence to the declaration's pattern — "The declaration's pattern is applied through an OWNED stateless rebuild ({@link readPattern}) asked through {@link matchesPattern}, so the shape's own pattern never moves a caller's `lastIndex` and no caller-writable member decides whether the value matched." Add: "The `limit` text is read from the applied rebuild, so it names the pattern that decided the match; the shape's `pattern` is read once per call for that rebuild." Extend the `@param pattern` with the prerequisite and its failure behaviour: "Must be a {@link readPattern} result for this shape's own pattern; supplied, it decides the match, the `limit` text, and whether a pattern fault is reported at all, and `shape.pattern` is not read. A pattern carrying `g` or `y` moves the caller's `lastIndex` and makes repeated answers for one value disagree. Default: rebuilt from `shape` on every call."
5. **Guide row** (`guides/contract.md`, the `createStringFaults` row): mirror the same three statements — qualify the `lastIndex` clause to the declaration's pattern; replace "Omit the argument and the helper rebuilds from the shape on every call; the report is identical either way, `limit` text included, because `readPattern` preserves `source` exactly" with "Supply the rebuild of this same shape's own pattern, built through `readPattern`, and the report matches the omitted form, `limit` text included, because `readPattern` preserves `source` exactly; the helper applies whatever pattern it is handed and never re-reads `shape.pattern`, so a supplied pattern decides the match, the `limit` text, and whether a pattern fault is reported at all, and a `g` or `y` pattern makes repeated answers for one value disagree"; state that the `limit` is read from the applied rebuild. Add a Helper-table row for the new helper beside `readPattern`. Run `npx oxfmt --config .oxfmtrc.json --write guides/contract.md` after editing so the table re-pads.
6. **Pins** (`tests/src/core/helpers.test.ts`): in the `createStringFaults` describe, add `reads a hand-rolled shape's pattern accessor once per call for the rebuild that also names the limit` — a counting accessor returning the same `RegExp` on every read, value failing the pattern, assert the fault's `limit` and that `reads` equals the number the landed code performs (2: the `=== undefined` test and the rebuild); in a describe for the new helper, add `rebuilds a pattern statelessly and refuses through the reader's coded error when the pattern cannot be read` — a `g`/`y` pattern rebuilt without those flags and matching repeatedly with the caller's `lastIndex` untouched, and a `Proxy` over a `RegExp` (the captured `source` getter refuses an incompatible receiver) refusing as `ContractError` coded `pattern` with the message `<reader>: pattern could not be read`. Keep every existing pin.

## Scope

**Owned.** `src/core/helpers.ts`, `src/core/combinators.ts` (the `stringOf` site only), `src/core/ContractCompiler.ts` (the two string leaves and the import list), `tests/src/core/helpers.test.ts`, `tests/src/core/combinators.test.ts` (only if a `stringOf` refusal pin needs the unchanged message re-asserted; expected: no change), `guides/contract.md`.

**Off-limits.** Every other file, including `src/core/types.ts`, `src/core/index.ts` (the barrel star-exports `helpers.ts` already), and `matchOf`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or history-rewriting git command; undo an edit only by editing.

## Execution

Perform the assignment directly and spawn nothing.

## Red/green proof (record the commands and counts)

The read-count pin: record it against the checkpoint's three-read shape by temporarily restoring `readPatternSource(shape.pattern)` for the `limit` (the pin must read 3 and fail), then restore and record green. The helper's refusal pin binds by construction (a `Proxy` receiver); record its green run.

## Output

Return, as your final message: the helper's signature and name with its reason; the three call sites as landed (one line each); the TSDoc `@param` and the guide row sentences as landed, quoted; the scoped helpers and combinators suite commands with counts (baseline, mutation red, final green); `git status --porcelain` and `git diff --stat`; any deviation. No process diary.

## Deviation contract

Stop and report on: a pre-existing pin going red; a needed change outside the owned files; a formatter or lint failure you cannot converge; a name `.claude/rules/names.md` refuses that you cannot replace within `{verb}{Noun}`. Decide, record, and carry on from: TSDoc wording beyond the quoted sentences, test placement, the guide row's placement beside `readPattern`.

## Acceptance criteria

1. `grep -c "readValue(() => readPattern" src/core/combinators.ts src/core/ContractCompiler.ts` reports 0 in each file (the inline construction is gone from the three sites); `matchOf` still carries its own `readValue` (grep `'matchOf', {` present).
2. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
3. The scoped helpers suite exits 0 with the two new pins present and the read-count pin recorded red then green; the scoped combinators and compilers suites exit 0.
4. `npm run test:guides` exits 0 (the new helper's row passes parity).
5. `git status --porcelain` lists only the owned files.

## Review evidence

The Orchestrator re-runs the pattern-fault record, parity, and the paired A/B, and dispatches one objective audit lane on the successor claims plus `checker` and `verifier`.
