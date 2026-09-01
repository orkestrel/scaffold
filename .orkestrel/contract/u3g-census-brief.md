# Campaign context block (pasted into every unit brief of the second contract performance campaign)

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, `writing.md`, `quality.md`; skill: none unless the brief names one; guide `/home/user/contract/guides/contract.md`.

**Host.** Linux container, bash, 4 CPUs, node v22.22.2, npm 10. Working path `/home/user/contract` (git branch `claude/method-memoization-contracts-yus26p`, baseline commit named in the brief, clean tree at dispatch). Outbound HTTPS goes through a proxy; nothing in a unit needs the network. Foreground commands are capped at 10 minutes. `oxfmt` and `oxlint` are the formatter and linter (`npm run format:check`, `npm run lint:check`); `npm run check` is the typecheck; scoped tests run as `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core <test file>`. A whole-suite run (`npm test`) takes minutes and is an observation, never a criterion, for a unit.

**Gates the Orchestrator runs after the unit exits.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, in that order, plus the paired A/B and the answer-parity differential against the 0.0.15 dist. A unit reports its own scoped readings; the authoritative runs are the Orchestrator's.

**Standing conditions.** No file is expected dirty at dispatch. No gate is red at the baseline. No role commits, pushes, installs, or runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Write instruments only under `/home/user/contract/tmp/` (gitignored) and remove them before returning. Never read or print credentials or environment values.

**Measurement doctrine for this campaign.** Every performance claim rests on the Orchestrator's paired A/B (6 fresh processes, load order swapped, admission: median across replicates ≤ 0.95 and every replicate ≤ 0.98 on the target family) and on the answer-parity differential reading IDENTICAL. A unit never claims a magnitude; it reports what it measured under what conditions.

**Test doctrine.** Real implementations only: no mocks, spies, module replacement, or fake clocks. A pin is named for what it proves, never for the control that specified it. A behaviour change lands with the test that turns red without it: record the exact command and its failing count before the fix, then the same command green after it.

**Retention.** The Orchestrator copies the brief and the returned report to `/home/user/scaffold/.orkestrel/contract/`. The unit writes its report as its final message.

# Unit U3g — move the exported-function census with the `ownPattern` export

Successor of `u3f-brief.md`. What changed and why: the independent verifier's sweep on the U3 + U3f tree reads RED on one pin, `tests/src/core/integration.test.ts:967` (`expect(OWNED_MEMBERS.length).toBe(216)`, actual 217), because the new `ownPattern` export adds one row to the corpus of exported plain functions. The pin's own comment says a new export moves the number and that moving it must be a deliberate edit in the test and in the guide together. The U3f brief's scoped criteria did not name the integration suite; that omission is the Orchestrator's and is recorded.

## Role and engine

`builder` on Sonnet, native Claude subagent, clean context (fully specified mechanical unit). Perform the assignment directly and spawn nothing.

## Objective

The census literal reads 217 in both places that state it, and the whole `src:core` project is green.

## Edits (exact)

1. `tests/src/core/integration.test.ts:967`: `expect(OWNED_MEMBERS.length).toBe(216)` → `expect(OWNED_MEMBERS.length).toBe(217)`. Change nothing else in that test; the comment beside it stays.
2. `guides/contract.md:256`: the phrase `**216 rows**` → `**217 rows**`. Change nothing else; do not reformat the file beyond what `npm run format:check` requires (a prose line outside a table needs no re-padding).

## Scope

**Owned.** `tests/src/core/integration.test.ts` (that one literal), `guides/contract.md` (that one number). **Off-limits.** Every other file and every other line. The tree is dirty with U3 + U3f edits in six files; that is the expected state.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, push, install, or history-rewriting git command.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Return: the two lines as landed; the output line of `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/integration.test.ts` (must be green) and of `npm run test:guides`; `git diff --stat`; any deviation. No process diary.

## Deviation contract

Stop and report if either literal is not found exactly as quoted, or if the integration suite reports any failure other than the census line before your edit or any failure after it.

## Acceptance criteria

1. `grep -n 'toBe(217)' tests/src/core/integration.test.ts` finds the line; `grep -n '217 rows' guides/contract.md` finds the line; `grep -c -E '\b216\b' tests/src/core/integration.test.ts guides/contract.md` reports 0 in each.
2. The scoped integration suite exits 0.
3. `npm run format:check` and `npm run test:guides` exit 0.
