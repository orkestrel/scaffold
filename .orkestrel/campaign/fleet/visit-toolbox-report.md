# VISIT-toolbox report

## Advisory taken

`npx --no-install scaffold audit` reported, before this visit:

```
scripts: The manifest at . declares a planned script with a differing value: test:guides.
  Keep the declared value unchanged or replace it with the planned value: "test:guides"
  declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned
  "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts,
  tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering
  the module of the same name.
dependencies: typescript declares major 6, while the registry serves major 7.
```

Plus a `manifest` table listing foreign/stale/missing orchestration paths under the retired
`orkestrel-human-journey` name and `.claude/agents/codex.md` / `.codex/agents/claude.toml`. Left
alone, per the brief.

## Proof files

`tests/setup.test.ts` proves the host-independent `tests/setup.ts` fixtures every `src:core`
suite relies on:

- `createTestDatabase` returns a distinct, closable live database on each call.
- `createTestDefinition` builds the one fixed mixed-column, `primary`-mapped,
  single/multi-column indexed, non-integer-versioned fixture, and threads a caller `id` through
  the same shape.
- `createTestTaskController` wires a real `TaskController` over the default `p`/`t` workflow with
  `input: {}` and `attempt: 1`, and threads a caller `signal`/`input` into that same real
  controller (abort observed through `waitForAbort`).
- `RecordingWorkflowStore` records committed snapshots, returns the latest match by `id`, and
  rejects the configured leading `set` attempts (`checkpoint refused`) before committing, while
  `attempts` counts every call including rejected ones.
- `ScriptedProvider` replays scripted turns in order and repeats the last one, honors an
  already-aborted signal with a `ProviderAbortError` partial, and throws its configured
  `failure` instead of streaming.
- `MalformedAgent` returns a `generate()` result whose typed-`string` `content` is a `number` at
  runtime, and delegates `status`/`emitter` to a real wrapped agent.

`tests/setupServer.test.ts` proves the Node-only `tests/setupServer.ts` fixtures the `src:server`
suites rely on, using real Web Streams `Response`/`ReadableStream` objects (no framework spy or
fake clock):

- `createTestTimer` arms deadlines without a real host timer, fires only the requested index, and
  leaves every other armed entry untouched.
- `createTestTimer` counts a cancelled deadline and never fires it after cancellation.
- `readAvailable` decodes the bytes a real stream has pushed within its idle window, across two
  separate reads.
- `readAvailable` returns an empty string once a real stream has closed with nothing pending, and
  when a `Response` carries no body.

## Mutation controls

- `tests/setup.test.ts`: mutated `expect(definition.id).toBe('warehouse')` to
  `expect(definition.id).toBe('mutated-control')`. Failing line:
  `AssertionError: expected 'warehouse' to be 'mutated-control'` at
  `tests/setup.test.ts:49:25` (`createTestDefinition threads a caller id through the same fixed
  shape`). Restored; `diff` against the pre-mutation copy confirmed no residue.
- `tests/setupServer.test.ts`: mutated `expect(first).toBe('first-chunk')` to
  `expect(first).toBe('mutated-control')`. Failing line:
  `AssertionError: expected 'first-chunk' to be 'mutated-control'` at
  `tests/setupServer.test.ts:42:17` (`readAvailable decodes the bytes a real stream has pushed
  within its idle window`). Restored; `diff` against the pre-mutation copy confirmed no residue.

## Visit order taken

1. Wrote both proof files.
2. Adopted the planned `test:guides` value through `npm pkg set` (added `--no-cache`).
3. Ran `npx --no-install scaffold repair --groups manifest`, which wrote `test:setup`:
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`.
4. Adopted the planned `test` chain through `npm pkg set`, placing `test:setup` between
   `test:config` and `test:guides`:
   `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm
   run test:guides`.
5. Ran the full `npx --no-install scaffold repair` clean. It regenerated `vite.config.ts` (11
   lines added — the `setup` project) plus 48 further vendored orchestration paths outside this
   unit's scope, unrelated to `test`/`setup:` (agent role files, skill files, `CLAUDE.md`,
   `.agents/orchestration.md`). The only foreign paths it reported and left untouched are the ones
   named in the brief as the Orchestrator's to remove.
6. Ran `npm run format`, which reformatted `tests/setup.test.ts` only (import-wrap on the
   `ScriptedProvider.generate` calls' `MessageInterface` argument, which needed an `id` field the
   original draft omitted).

## Retained differing values

`repair` named no further retained differing script values beyond `test:guides` and the `test`
chain already adopted per the fixed visit order.

## Gates, each read bare

- `npm run format:check`: `All matched files use the correct format.` (165 files)
- `npm run lint:check`: exits clean, no output.
- `npm run check`: `tsc --noEmit --project tsconfig.json && npm run check:src` — no diagnostics on
  the root project, `check:src:core`, or `check:src:server`.
- `npm run build`: `src:core` and `src:server` both built (`dist/src/core/index.cjs`,
  `dist/src/server/index.js`/`.cjs`), declaration bundling completed for each.
- `npm test`: `test:src` 445 passed (9 files), `test:policy` 93 passed (1 file), `test:config` 46
  passed (1 file), `test:setup` 17 passed (2 files), `test:guides` 28 passed (1 file).

`npx --no-install scaffold audit` at exit reports no `setup:` and no `scripts:` advisory; only the
fleet-wide `dependencies: typescript declares major 6` line and the unchanged orchestration
manifest table (foreign paths named in the brief) remain.

## Files touched

- `/home/user/orkestrel/toolbox/tests/setup.test.ts` (new)
- `/home/user/orkestrel/toolbox/tests/setupServer.test.ts` (new)
- `/home/user/orkestrel/toolbox/package.json` (`test:guides`, `test:setup`, `test` — plus the
  pre-existing re-pin to `scaffold` ^0.0.52, already dirty at dispatch)
- `/home/user/orkestrel/toolbox/package-lock.json` (already dirty at dispatch; unchanged by this
  unit beyond what `repair`/`format` touched, if anything)
- `/home/user/orkestrel/toolbox/vite.config.ts` (regenerated by `scaffold repair`: `setup`
  project added)
- 48 further vendored orchestration paths regenerated by the full `scaffold repair` run (agent
  role files, skill files, `CLAUDE.md`, `.agents/orchestration.md`, `.claude/rules/documentation.md`)
  — outside this unit's owned-file list but produced by the mandated `repair` step; the
  Orchestrator's diff capture is the authority on their exact contents.

No commit made.
