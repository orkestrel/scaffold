# VISIT-worker report

## Advisory as taken (first `npx --no-install scaffold audit`)

```
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep
the declared value unchanged or replace it with the planned value: "test:guides" declares
"vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run
--config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts,
tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering the
module of the same name. The proof's subject is behavior only this workspace can assert, so
scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

Plus the 48-of-131-drifted path table naming the retired `orkestrel-human-journey` foreign
paths and the stale `orchestration`-group files — all listed under the `orchestration` group,
none `setup:` or `scripts:`. `dependencies: typescript declares major 6` is fleet-wide and out
of scope per the brief.

## Proof files written

**`tests/setup.test.ts`** covers `tests/setup.ts`:

- `TestQueueStore`: a `save` invokes its hook once before/independent of the stored entry, the
  entry is retrievable through `load`, and a store built with no hooks object still saves
  without throwing (the optional-chained hook contract).
- `TestQueueStore`: `remove` and `clear` each invoke their hook once and mutate the in-memory
  record — `remove` drops one entry, `clear` empties the map.
- `PoolOptionsProbe`: each getter (`max`, `on`, `error`, `create`, `destroy`, `validate`)
  records exactly one read, in that property order, and returns the configured value.
- `PoolOptionsProbe`: `replace` swaps the backing values so every subsequent getter read
  returns the new configuration.

**`tests/setupServer.test.ts`** covers `tests/setupServer.ts`:

- `postRun` / `ThreadReply`: posting a run envelope to a real worker thread (the existing
  `tests/src/server/fixtures/double.ts` fixture) resolves `ThreadReply`'s promise with a frozen,
  `id`-matched copy of the reply.
- `postRun` / `ThreadReply`: a worker thread that exits before replying (the existing
  `fixtures/crash.ts` fixture, driven with a negative input) rejects the pending promise with
  an "exited before replying" error.
- `tempDatabasePath`: returns a real on-disk path under an owned scratch directory (not yet
  written), and `cleanup` removes the underlying allocation; the cleanup is idempotent.
- `NodeWorkerOptionsProbe`: each getter (`script`, `input`, `result`, `workerData`,
  `concurrency`, `retries`, `timeout`, `store`) records exactly one read, in that property
  order, and returns the configured value.
- `NodeWorkerOptionsProbe`: `replace` swaps the backing values so subsequent getter reads
  return the new configuration.

Every `setupBrowser`/`setupService` split and DOM-driving-half carve-out named in the brief is
inapplicable here: this target has no `setupBrowser.ts` or `setupService.ts`, only `setup.ts`
(host-independent) and `setupServer.ts` (Node-only), both proven directly.

## `test:guides` and the `test` chain adopted

- `scripts.test:guides` set through `npm pkg set` to the planned value carrying `--no-cache`:
  `vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`.
- `npx --no-install scaffold repair --groups manifest` wrote `scripts.test:setup`:
  `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`.
- `scripts.test` adopted through `npm pkg set`, placing `test:setup` between `test:config` and
  `test:guides`:
  `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides`.

## `scaffold repair` (full, clean run)

The full `repair` after the manifest-group step reported `0 of 131 planned paths drifted from
the plan` against the `orchestration` group, listing only the seven `foreign` paths under the
retired `orkestrel-human-journey` name and `.claude/agents/codex.md` /
`.codex/agents/claude.toml` — left alone per the brief, for the Orchestrator to remove at
commit. It wrote 49 files (including `vite.config.ts`, which gained the `setup` project — 11
lines added) and left 83 unchanged. No retained differing script value beyond `test:guides` and
the `test` chain was named; the repair ran straight through with no other manifest advisory.

## Mutation controls

One control per proof file, restored after observing the failure.

- `tests/setup.test.ts` — line 22, changing the expected `input` from `'x'` to `'MUTATED'` in
  the `TestQueueStore` save/hook case failed:
  `AssertionError: expected [ { id: 'a', input: 'x', … } ] to deeply equal [ { id: 'a', input: 'MUTATED', … } ]`
  at `tests/setup.test.ts:22:30`. Restored; `npm run test:setup` green again.
- `tests/setupServer.test.ts` — line 26, changing the expected reply `value` from `42` to `999`
  in the `postRun`/`ThreadReply` happy-path case failed:
  `AssertionError: expected { id: 'job-1', ok: true, value: 42 } to deeply equal { id: 'job-1', ok: true, value: 999 }`
  at `tests/setupServer.test.ts:26:18`. Restored; `npm run test:setup` green again.

## Gate closing lines

- `npm run format:check` → `All matched files use the correct format.` (172 files)
- `npm run lint:check` → exits clean, no output.
- `npm run check` → `tsc --noEmit --project tsconfig.json && npm run check:src` (`check:src:core`,
  `check:src:server`) all exit clean, no diagnostics.
- `npm run build` → `build:src:core` and `build:src:server` both built and copied their `.d.cts`
  files; no build-log violations.
- `npm test` → `test:src` `Test Files 6 passed (6)` / `Tests 106 passed (106)`; `test:policy`
  `1 passed (1)` / `93 passed (93)`; `test:config` `1 passed (1)` / `46 passed (46)`;
  `test:setup` `2 passed (2)` / `9 passed (9)`; `test:guides` `1 passed (1)` / `14 passed (14)`.

## Acceptance

1. `npx --no-install scaffold audit` at exit reports no `setup:` advisory (and no `scripts:`
   advisory) — confirmed above.
2. Every gate closed green, each read bare — confirmed above.
3. One mutation-control failing line reported per proof file, both restored — confirmed above.

No deviation. `package.json` and `package-lock.json` remain dirty from the pre-dispatch
`scaffold ^0.0.52` re-pin (kept, not reverted), plus the `test:guides`/`test` script edits and
the `scaffold repair`-written `test:setup` script. `vite.config.ts` carries the `repair`-written
`setup` project. `src/**`, `guides/**`, `tests/setup*.ts`, and every other test file were left
untouched.
