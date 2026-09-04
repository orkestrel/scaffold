# Unit conform-agent fix round 1 — the surviving old names, the unit-authored property arrows, three prose sites, the full-population count sweep

## Role and engine

`builder` on Claude Sonnet (native Claude Code subagent; a fully specified unit), the sole writer in `/home/user/fleet/agent`, also owning the unit's report file `/home/user/scaffold/tmp/units/conform/conform-agent-report.md`. Perform the assignment directly and spawn nothing.

## Objective

Close round 1: the checker's refutation of claim 3 with its two referrals (`/home/user/scaffold/.orkestrel/campaign/conform/units/l56/agent-r1-checker-grok.result.md`) and the objective lane's refutations of claims 3 and 4 with its findings O-1 to O-3 and referrals R-1 to R-3 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l56/agent-objective-r1.md`). Rulings: the checker's referral 1 — the manager, provider, and options `format` members are `ContextSectionFormat` homonyms, not the renamed per-item member, and stay; the checker's referral 2 and R-1 — the property-arrow shape is cleared at the sites this unit authored or edited (named under Sites), and the pre-existing shape across `tests/**` is a next-matrix row the Orchestrator records; R-2 — the vendored `guides/queue.md` mirror refreshes at the wave, outside this unit; R-3 — a number word whose sentence names the members it counts is permitted, and the report records the full-population sweep with every hit ruled.

## Context

`/home/user/scaffold/AGENTS.md` § Writing and § Design laws (no nested functions: a function is exempt only as an argument passed directly to a call or `new`, or as method, `get`, or `set` syntax; a module-scope factory returning the function directly is exempt); `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (`since` causal → `because`); `/home/user/scaffold/.claude/rules/documentation.md` § Parity.

Standing conditions: the checkout carries the conform-agent unit's uncommitted edits (40 paths under `git status --short`). The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, `.oxlintrc.json`, every `guides/<dependency>.md` mirror) is off-limits, and so is every line of `src/**`, `tests/**`, and `guides/**` this brief does not name. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites it or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <file>`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rnE <pattern> <paths>`, `ls`, `cat`, `sed -n`.

## Sites and edits

- **Claim 3** — `src/core/instructions/InstructionManager.ts:31`: `{@link InstructionInput.format}` → `{@link InstructionInput.override}`. `src/core/AgentContext.ts:181`: `no per-item format` → `` no per-item `override` ``. `tests/src/core/factories.test.ts:298`: `` `execution.signal` (build(input, execution.signal)) `` → `` `context.signal` (build(input, context.signal)) ``.
- **Claim 4** — after those edits, run and record in the report's § Sweeps, with the pattern and the paths: `InstructionInput\.format|InstructionInterface\.format|item\.format|per-item .{0,3}format` and `\bexecution\b` (case-insensitive) over `src/`, `tests/` (minus the vendored set), `guides/agent.md`, `guides/README.md`, and `README.md`; rule every hit (the English word `execution` is permitted; `tests/setupPolicy.ts` is vendored). Record the homonym ruling for `\bformat\b` (the `ContextSectionFormat` members at `InstructionManager.ts:58,81` and their kin stay).
- **Referral 2 and R-1** — clear the property-arrow shape at the sites this unit authored or edited: `tests/setup.ts:442` (`summarize: async (messages) => …` → method syntax `async summarize(messages) { … }`), `tests/setup.ts:738` (`{ format: { render: () => managerRender } }` → method syntax `{ format: { render() { return managerRender } } }`), `tests/src/core/Agent.test.ts:1953` and `:1998` (`match: () => { throw … }` → method syntax `match() { throw … }`). Where a method-syntax form changes a type the site must satisfy, stop and report.
- **O-1** — `guides/agent.md:1122`: cut the `isConversationSnapshot` guard clause from the `MemoryConversationStore.test.ts` row (that file keeps the `isToolCall` element check; describe it), and add a `tests/src/core/validators.test.ts` row in the same list naming `isMessage`, `isSection`, and `isConversationSnapshot` and what each case proves (read the file's `it` titles). Where `tests/guides.test.ts` quotes the edited row, change the transcription in the same edit.
- **O-2** — `tests/setup.ts:77-78`: the `format` option's TSDoc reads `` `format` — a provider-default {@link ContextFormat}; `undefined` when unset, so an agnostic provider reports no framing. ``
- **O-3** — `guides/agent.md:512`: `since` → `because`.
- **R-3** — run `\b(one|two|three|four|five|six|seven|eight|nine|ten)\b`, case-insensitive, over `src/**`, `guides/agent.md`, `guides/README.md`, and `README.md`, and record every hit in the report's § Sweeps with its ruling (permitted where the sentence names the members or states a quantity of the operation; otherwise rewrite it and record the rewrite).
- **Report** — append `## Fix round 1` naming both lane files, each edit with `file:line` before and after, the recorded sweeps, and the rulings.

## Scope

Owned: the lines named under Sites in `src/core/instructions/InstructionManager.ts`, `src/core/AgentContext.ts`, `tests/src/core/factories.test.ts`, `tests/setup.ts`, `tests/src/core/Agent.test.ts`, `guides/agent.md`, and `tests/guides.test.ts`; any prose line the R-3 sweep rewrites (record each); the report. Shared: none. Off-limits: every other line, every other edit the unit made, and the vendored set.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each edit with `file:line` before and after; each recorded sweep with its pattern, paths, hits, and rulings; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:guides`, and the scoped runs over `tests/src/core/Agent.test.ts` and `tests/src/core/factories.test.ts`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens, when a method-syntax rewrite fails a type the site must satisfy, or when a named site does not read as this brief quotes it. Decide, record, and carry on for an ancillary question: the exact wording of a rewritten sentence, the title of a guide row.

## Acceptance criteria

1. `grep -rnE 'InstructionInput\.format|per-item .{0,3}format|execution\.signal' src tests guides/agent.md` returns nothing.
2. `grep -nE 'summarize: async|render: \(\) =>|match: \(\) =>' tests/setup.ts tests/src/core/Agent.test.ts` returns nothing.
3. `grep -n 'since `generate' guides/agent.md` returns nothing; `grep -n 'validators.test.ts' guides/agent.md` returns a row; `grep -n 'ONLY when supplied' tests/setup.ts` returns nothing.
4. The gates and scoped runs exit 0; `git status --short` lists the unit's 40 paths and nothing new.
