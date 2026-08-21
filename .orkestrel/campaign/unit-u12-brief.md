# Unit U12: mcp adopts the published teardown contract

## Role and engine

Role `implementer`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/mcp`. You perform the assignment directly and spawn nothing:
do the work yourself inside this session.

## Objective

Design round 3 (S12), converged on both lanes: delete the local generic `createTeardown<T>`
(`tests/setupServer.ts:459-471`) and its `TeardownInterface<T>` (`:429-432`), and move every
suite onto `@orkestrel/test`'s published `add`/`destroy` contract. The local disposal loop
abandons every remaining disposer when one throws, leaking the servers and sockets registered
before it; the published `destroy()` runs every handler and aggregates failures — the guarantee
mcp's own vendored `guides/test.md:563` already documents.

## Context

Authority in this checkout: `AGENTS.md`; `.claude/rules/tests.md` (no mocks for project-owned
behaviour; real resources), `.claude/rules/typescript.md`, `.claude/rules/writing.md`. The
vendored `guides/test.md` is a mirror — read-only.

Verified 2026-08-21: the installed `@orkestrel/test` copy
(`node_modules/@orkestrel/test/dist/src/core/index.d.ts`) publishes
`createTeardown(): TeardownInterface` with `{ readonly count; add(handler): void;
destroy(): Promise<void> }` — newest-first, every handler runs, single failure rethrown by
identity, several as an `AggregateError`. The consuming set (every file naming `.track(` or
`createTeardown`): `tests/setupServer.ts`, `tests/integration.test.ts`,
`tests/src/server/factories.test.ts`, `tests/src/server/handlers.test.ts`,
`tests/src/server/middlewares.test.ts`,
`tests/src/server/transports/HTTPClientTransport.test.ts`,
`tests/src/server/transports/WebSocketClientTransport.test.ts`.

## The design, fixed by the reconciled round (design3-reconciliation.md S12)

1. `tests/setupServer.ts` declares no `createTeardown` and no `TeardownInterface` afterwards.
   The reverse-order remark at `:443-452` (WebSocket detachment ordering) survives — move it to
   the suite whose ordering it explains rather than deleting it.
2. Every consuming suite imports `createTeardown` from `@orkestrel/test`, creates its list,
   registers `afterEach(() => teardown.destroy())` itself, and calls `add` IMMEDIATELY after
   acquiring each resource (a resource acquired before its `add` leaks if intervening code
   throws — order the two statements accordingly). Each
   `const x = teardown.track(await start())` becomes acquisition then registration. Reverse
   disposal order is preserved by the published contract.
3. New proof, in the suite that most naturally holds two real resources: when one disposer
   throws, every later disposer still runs and the thrown value surfaces. Use a REAL failing
   disposer — register a disposer that stops an already-stopped real server (a second
   `close()` on a closed `node:http` server errors with `ERR_SERVER_NOT_RUNNING`), never a
   stub — plus a second real resource whose disposal is observed to run. This is the guarantee
   the local helper lacked; record the command red-first ONLY if you can express it against the
   old helper before deleting it (do so: write the proof against the local helper, record the
   red — the later disposer abandoned — then convert everything and record the green).
4. No `@orkestrel/test` surface change, no new helper in `setupServer.ts` that reintroduces
   `track` under another name.

## Scope

- Owned: the consuming set listed in Context (all in `tests/`).
- Off-limits: every `src/**` file, `guides/**` (vendored mirror), `package.json` (it already
  carries this campaign's `prepack` line — leave the whole file), lockfile, every other file.
- Standing conditions: the checkout's `package.json` is modified (campaign `prepack` line) —
  leave it; `node_modules` is installed; the tree is otherwise clean.
- No commits, installs, publishes, or credential reads. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`; restore any temporary edit by rewriting
  text and prove with `git diff`. The sandbox denies network and mounts `.git` read-only. Use
  `npx.cmd` — plain `npx` is refused by PowerShell policy here.
- Sandbox limit, expected: suites that bind loopback listeners may fail inside this sandbox
  (`listen` can be denied). Scoped runs that need a listener are then reported as observations
  with their exact refusal, not chased; the Orchestrator takes the authoritative runs on the
  host after you exit. Your criteria are ordered so the non-listening gates close first.

## Acceptance criteria, in this order

1. `git status --porcelain` adds exactly the owned files to the standing entries.
2. `npx.cmd oxfmt --config .oxfmtrc.json --check` on the owned files exits 0.
3. `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the owned files exits 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
5. `grep -rn "track(\|TeardownInterface<" tests/` reports nothing (the local contract is
   gone; the published `TeardownInterface` import without a type argument is fine — adjust the
   pattern evidence accordingly and show it).
6. The failing-first pair for the aggregation proof (red against the local helper, green
   after conversion), as far as the sandbox permits its resources; where the sandbox denies the
   listener the proof needs, report the exact refusal and leave the proof in place for the
   host run.
7. Scoped suite runs for each converted file
   (`npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server <file>`
   and the integration project for `tests/integration.test.ts`) — report each result; sandbox
   listener refusals are observations, not failures of the unit.

## Output

The complete diff; raw output and exit code per criterion; the relocated remark's new home; the
failing-first pair or its sandbox-refusal record; any deviation. No process diary.

## Deviation contract

Stop on: the published contract not expressible at a call site (name it), a criterion needing
an off-limits file, or the local helper having a consumer outside the listed set. Statement
ordering, proof placement, and naming are yours: decide, record, carry on.
