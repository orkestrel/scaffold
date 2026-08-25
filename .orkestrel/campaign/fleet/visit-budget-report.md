# Unit VISIT-budget — report

Role and engine: `implementer` on Claude Opus 5, native subagent. Nothing spawned beyond the
suites' own runs. No git state changed and nothing committed.

## The advisory as taken

`npx --no-install scaffold audit` at `/home/user/orkestrel/budget`, run first, before any edit:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The `setup:` advisory names one module, so the proof work list is one file: `tests/setup.test.ts`
for `tests/setup.ts`. The `dependencies:` advisory is the fleet-wide item the brief scopes out.
The drift table reported 48 of 126 planned paths drifted, including the foreign
`orkestrel-human-journey` paths, `.claude/agents/codex.md`, and `.codex/agents/claude.toml` that
the brief leaves to the Orchestrator.

## The proof file

`/home/user/orkestrel/budget/tests/setup.test.ts` — new. `tests/setup.ts` exports
`captureContractError`, `selectCharge`, and `isBrowserVuePath`. Six cases, one per behavioral
contract, no name census and no production behavior re-proven.

**`captureContractError`**

- *returns the thrown contract error itself, narrowed* — the expected error is constructed in the
  proof with `new ContractError('Budget maximum exceeds its ceiling', { code: 'range', context: …
  })` from `@orkestrel/contract`, a route the module cannot share: it neither builds nor inspects
  that value, it only relays it. The case asserts identity with `toBe`, then reads `code` and
  `context.limit` with no guard, so `npm run check` is the second instrument holding the declared
  `ContractError` return.
- *refuses a thrown value that is not a contract error* — a `TypeError` and a thrown string both
  raise `Expected a ContractError`. One contract, two inputs: class membership decides, not
  throwability.
- *refuses an operation that completes without throwing* — a distinct contract, because the
  underlying `captureError` returns `undefined` for a completed thunk. A suite asserting a refusal
  must fail rather than receive an absent error.

**`selectCharge`**

- *returns every charge unchanged, including negative zero and NaN* — the identity charge selector
  every `Budget` suite passes as `consume`, asserted over the boundary values a selector can
  silently normalize: `0`, `-0`, `2.5`, `-3`, `Number.EPSILON`, `Number.MAX_VALUE`,
  `Number.MIN_SAFE_INTEGER`, both infinities, and `NaN`. `toBe` compares with `Object.is`, so a
  `-0` widened to `0` and a lost `NaN` both redden.

**`isBrowserVuePath`**

- *accepts a browser SFC path in each separator family* — `app/browser/components/BudgetPanel.vue`,
  the same path with `\`, a mixed-separator form, and `app/browser/App.vue`. The helper normalizes
  the separator itself rather than reading the host's, so both families are asserted on every host
  rather than probed from `path.sep`; the proof states that in a comment.
- *refuses a sibling environment and a prefix lookalike* — siblings `app/server/…`, `app/core/…`,
  and `src/browser/…`; lookalikes `app/browser-tools/…`, `app/browsers/…`, the bare `app/browser`,
  the unrooted `tests/app/browser/…`, and the backslash form of the lookalike. Every expectation is
  a stated literal, never a re-derivation of the module's own `startsWith` test.

`describe`, `it`, and `expect` stay out of `tests/setup.ts`; the proof imports the module and
asserts. No file under `src/**`, `guides/**`, `tests/setup*.ts`, or any other test file was touched.

## Mutation controls

One control per subject, each breaking a copy of the assertion's expectation in the proof file,
each restored immediately after its failing run. `npm run test:setup` is the command.

| Control | Mutation | Failing line |
| --- | --- | --- |
| `captureContractError` | `expect(captured.code).toBe('range')` → `.toBe('bound')` | `AssertionError: expected 'range' to be 'bound' // Object.is equality` at `tests/setup.test.ts:25:25` |
| `selectCharge` | added `expect(selectCharge(-0)).toBe(0)` beside the loop | `AssertionError: expected -0 to be +0 // Object.is equality` at `tests/setup.test.ts:71:28` |
| `isBrowserVuePath` | `expect(isBrowserVuePath('app/browser-tools/BudgetPanel.vue')).toBe(false)` → `.toBe(true)` | `AssertionError: expected false to be true // Object.is equality` at `tests/setup.test.ts:91:65` |

Each control run closed `Tests 1 failed | 5 passed (6)`. After all three restorations the same
command closes `Test Files 1 passed (1)` / `Tests 6 passed (6)`, and `npm run format:check` passes
on the restored file, so no mutation survives.

## The visit

Order run: proof written → `test:guides` adopted → full `repair` (blocked) → `repair --groups
manifest` → `test` chain adopted → full `repair` clean → `npm run format` → gates.

- `test:guides` set through `npm pkg set` to the planned
  `vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`.
- The first full `repair` blocked its `configs` group exactly as the brief predicted:
  `TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project
  the planned configuration registers: setup. No chain from test or prepublishOnly invokes it.` It
  wrote nothing, including nothing from the `manifest` group.
- `repair --groups manifest` wrote `test:setup` as
  `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`, closing
  `1 written, 1 unchanged, 0 removed in ..`.
- `test` chain adopted through `npm pkg set` to
  `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run
  test:guides`, matching the installed scaffold's compiler, which places `test:setup` between
  `test:config` and `test:guides`.
- The full `repair` then ran clean: `49 written, 78 unchanged, 0 removed in ..`. It added the
  `setup` project to `vite.config.ts` (`include: ['tests/setup*.test.ts']`,
  `setupFiles: ['./tests/setup.ts']`, Node, browser disabled) and registered it between `config`
  and `guides` in the projects list.

**Retained differing values repair named: none.** The clean full `repair` and the exit audit both
report no `scripts:` advisory. The only advisory left is the out-of-scope
`dependencies: typescript declares major 6, while the registry serves major 7.`, plus the seven
foreign orchestration paths the brief leaves to the Orchestrator.

## Gates

Each run bare from `/home/user/orkestrel/budget`, in order.

| Gate | Closing line |
| --- | --- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 2517ms on 137 files using 4 threads.` (exit 0) |
| `npm run lint:check` | no diagnostics printed (exit 0) |
| `npm run check` | no diagnostics printed across `tsc --noEmit --project tsconfig.json` and `check:src:core` (exit 0) |
| `npm run build` | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` after `✓ built in 2.93s` (exit 0) |
| `npm test` | `test:src` 131 passed (4 files); `test:policy` 93 passed (1 file); `test:config` 46 passed (1 file); `test:setup` 6 passed (1 file); `test:guides` 18 passed (1 file); exit 0 |

## Acceptance criteria

1. **Met.** The exit `npx --no-install scaffold audit` reports no `setup:` advisory and no
   `scripts:` advisory. Its drift line reads `0 of 126 planned paths drifted from the plan.`
2. **Met.** Every gate closes green, each read bare, in the preceding table.
3. **Met.** One mutation control per subject in the single proof file, each with its failing line,
   all restored and re-proven green.

## Observations

- The blocked `repair` advisory contains a false clause. It printed `test:setup is already
  declared, so the gate is missing rather than the script` while `test:setup` was absent from the
  manifest — `npm pkg get scripts` immediately after that run showed no such key, and the final
  diff adds it. Following the message alone would leave an operator hunting a chain edit for a
  script that does not exist. Scaffold 0.0.52 appears to read the clause off the planned manifest
  rather than the declared one.
- `npm pkg set` appended `test:setup` after `prepack` rather than at the planned key position.
  `repair` and the exit audit both accept it, so script key order is outside the plan's check.

## Deviation state

No deviation. Every reported module was provable under the fixed shape, and no gate failed.

## Files touched

- `/home/user/orkestrel/budget/tests/setup.test.ts` — new; the proof for `tests/setup.ts`.
- `/home/user/orkestrel/budget/package.json` — `test:guides` adopted, `test` chain adopted,
  `test:setup` written by `repair`; the `@orkestrel/scaffold` `^0.0.52` re-pin arrived dirty.
- `/home/user/orkestrel/budget/vite.config.ts` — `setup` project written and registered by
  `repair`.
- `/home/user/orkestrel/budget/package-lock.json` — arrived dirty from the re-pin; untouched here.
- The `orchestration` group files `repair` regenerated: `CLAUDE.md`, `.agents/**`, `.claude/**`,
  `.codex/**` as listed by `git status`.
