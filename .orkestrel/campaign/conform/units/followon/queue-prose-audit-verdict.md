# Audit verdict: unit queue-prose

Subject: the follow-on unit in `/home/user/fleet/queue` on the landed tip `7c560b8` (brief `briefs/followon/queue-prose-brief.md`, report `units/followon/queue-prose-report.md`, result `units/followon/queue-prose-result.md`), a `builder` on Claude Sonnet: the positional `below` pointers at `tests/src/core/stores/DatabaseQueueStore.test.ts:194` and `tests/guides.test.ts:47`, the `four-method` tally at `tests/src/core/stores/MemoryQueueStore.test.ts:12`, and the `QueueContext` doc sentence at `src/core/types.ts:106`.

## Lanes

No lane ran. The unit changes four prose lines, and the Orchestrator read the diff (`git -C /home/user/fleet/queue diff`: four one-line hunks, each the rewrite the brief's Evidence names verbatim) against the brief's rows, `AGENTS.md` § Writing, and `.claude/rules/writing.md` § Code tokens, references, and links. Dispatching a checker for four comment lines spends a lane on what one read settles; `.agents/orchestration.md` § Orchestrator and executor names a one-line fix as direct work, and this unit is four of them. The deviation from the audit step — no checker, no objective lane — is recorded here with that reason.

## Rulings

- Each site reads the prescribed text: `following` for `below`, the internal-name assertion named for its position, the tally deleted, and the doc sentence naming the context.
- The `above|below` sweep's remaining hits sit in the vendored `tests/policy.test.ts` and `tests/setupPolicy.ts`, outside the population, and are the scaffold host-inventory rows already recorded.

## Structural claims

The gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/queue`, recorded in `units/land-followon.log`, and the landing commit named in the state table.

## Terminal

PASS (Orchestrator's read of the four-hunk diff), the deciding run at landing read every gate exit 0 (landed as queue `818debe`).
