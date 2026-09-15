# Unit D4-2b — `@orkestrel/scaffold`: the `catalog` floor (successor to D4-2)

Successor to `tmp/units/D42-scaffold-catalog-floor-brief.md` (staged beside this file). Read it in
full first; it stays the brief. This file records the one correction and wins over the sentence it
amends.

## Role and engine

`sol` route: GPT-6 Astra, a `workspace-write` `codex exec` rooted at
`C:/Users/mikes/WebstormProjects/scaffold`. Perform the assignment directly and spawn nothing. You
are the sole writer in this checkout while this unit runs.

## Why a successor

D4-2 stopped during instruction loading (thread `01a0a47a-2c21-7381-b667-804a4fe42c58`): the
brief's deviation contract said "stop on a D4-1 file you must change" while its Owned list
granted `guides/scaffold.md`, a file D4-1b had also touched (one Surface row). The contract was
over-broad; the Orchestrator's error, not the unit's.

## Amendment

Replace the deviation contract's first stop condition with: **stop on a file D4-1b changed that is
outside your Owned list** (`src/core/constants.ts`, `src/core/compilers.ts`, `src/core/helpers.ts`,
`src/server/helpers.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`,
`tests/src/core/**`, `tests/src/server/helpers.test.ts`, `tests/src/server/Materializer.test.ts`,
`host.json`). `guides/scaffold.md` is yours to edit serially: keep D4-1b's `REFERENCE_PATHS`
Surface row and every other line as they are, and add the `catalog` and `audit` prose and your
own Surface rows. `tests/src/server/Materializer.test.ts` is D4-1b's too and is on your Owned
list: add cases, keep D4-1b's.

Everything else in D4-2 is unchanged. The scaffold gates after D4-1b are all green on the host
(`D41b-scaffold-gates-orchestrator.log.txt`: core 411, server 444 + 6 skipped, bin 253); the
sandbox will show the `Ollama setup` failures named in D4-1b's report — sandbox observations, not
yours.
