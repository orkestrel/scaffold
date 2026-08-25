# Unit VISIT-workspace — report

Every acceptance criterion closed. No deviation.

## The advisory as taken

`npx --no-install scaffold audit` at `/home/user/orkestrel/workspace`, run first, non-table lines
verbatim:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 126 planned paths drifted from the plan. Audit compared bytes at 101, existence at 19, and nothing at 6. The plan does not own 7 further paths beneath its groups.
```

The `setup:` advisory names one module, so the proof work list was `tests/setup.test.ts` alone.
`tests/setupPolicy.ts` drew no advisory because `tests/policy.test.ts` covers it.

## The proof file and what each case asserts

`/home/user/orkestrel/workspace/tests/setup.test.ts` proves `tests/setup.ts`, whose exports are
`createThrowingGetterRecord`, `createRevokedProxy`, `buildWorkspaceSnapshot`, and
`assertWorkspaceStoreContract`. The module is host-independent, so the `setup` project's Node
environment reaches every contract and no half of it defers to another project.

Cases, by the contract each pins:

- **`createThrowingGetterRecord` seats an own enumerable accessor that throws when the named
  property is read.** The second route is the property descriptor and `Reflect.has`, neither of
  which invokes the getter; the read is what throws. This is the shape `tests/src/core/helpers.test.ts`
  relies on when it drives the total guards.
- **`createThrowingGetterRecord` leaves every other property absent.** A guard reading a different
  key gets `undefined` and no throw.
- **`createRevokedProxy` returns an object-typed value whose every trapped operation throws a
  `TypeError`.** `typeof` succeeds while a read, a `has`, and `Object.keys` each throw.
- **`buildWorkspaceSnapshot` defaults its id to `scratch` and carries a supplied id through.** The
  store battery calls it with `work`, `alpha`, and `beta`, so both halves are load-bearing.
- **`buildWorkspaceSnapshot` carries the text file then the binary file, in the order the store
  battery asserts.** Paths, the text arm's body, and the binary arm's data and MIME are literal
  expectations, not re-derivations. The battery's own path-order assertion rests on this.
- **`buildWorkspaceSnapshot` is pure JSON.** `roundTripJSON` from `@orkestrel/test` is a second
  route the module cannot share, and it is what the stores' driver-swap parity proofs rest on.
- **`buildWorkspaceSnapshot` returns an independent value on each call.** Equal by structure,
  distinct by reference, so no case leaks state into another.
- **`assertWorkspaceStoreContract` takes a fresh store for every case it registered.** The battery
  is invoked with a `Map`-backed store written in the proof file — a minimal real implementation of
  `WorkspaceStoreInterface`, so the battery is not proven against the same production store the
  mirrored store suites already drive it with. The battery's own cases passing is the proof that it
  registers live assertions; the recorded store list proves it registered more than one case and
  repeated no store.

Production behavior is not re-proven here, no case is a census of exported names, and `describe`,
`it`, and `expect` stay in the proof file.

## Mutation control

One control for the one proof file. The `buildWorkspaceSnapshot` path-order expectation was
reversed in place, `npm run test:setup` was run, and the expectation was restored.

Failing line:

```text
FAIL  |setup| tests/setup.test.ts > buildWorkspaceSnapshot > carries the text file then the binary file, in the order the store battery asserts
AssertionError: expected [ 'src/main.ts', 'icon.png' ] to deeply equal [ 'icon.png', 'src/main.ts' ]
 Tests  1 failed | 11 passed (12)
```

Restored: `Tests  12 passed (12)`.

## The visit

Executed in the brief's fixed order.

1. Proof written.
2. `npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`.
3. `npx --no-install scaffold repair --groups manifest` → `1 written, 1 unchanged, 0 removed in ..`,
   writing `test:setup`.
4. `npm pkg set 'scripts.test=npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides'`.
   The planned order was read from the installed compiler at
   `node_modules/@orkestrel/scaffold/dist/src/core/index.js:4290-4299`, which places
   `npm run test:setup` after `npm run test:config` and before `npm run test:guides`.
5. `npx --no-install scaffold repair` → `49 written, 78 unchanged, 0 removed in ..`. A second run
   read clean: `0 written, 127 unchanged, 0 removed in ..`. The `configs` group was no longer
   blocked, and it added the `setup` project to `vite.config.ts` and registered it in the project
   list.
6. `npm run format` → `Finished in 2650ms on 145 files using 4 threads.`

## Retained differing values repair named

None. The `test:guides` advisory was the only one, and it was adopted before the manifest repair.
The full repair named no further retained script value, and the closing audit reports no `scripts:`
advisory.

## Gates

Each run bare at `/home/user/orkestrel/workspace`, closing line and exit code:

| Gate                  | Closing line                                                   | Exit |
| --------------------- | -------------------------------------------------------------- | ---- |
| `npm run format:check` | `All matched files use the correct format.`                    | 0    |
| `npm run lint:check`   | no diagnostic emitted                                          | 0    |
| `npm run check`        | `tsc --noEmit -p configs/src/tsconfig.core.json`, no diagnostic | 0    |
| `npm run build`        | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` | 0    |
| `npm test`             | see the per-project rows that follow                           | 0    |

`npm test` per project, as reported by the run:

```text
test:src     Test Files  6 passed (6)   Tests  134 passed (134)
test:policy  Test Files  1 passed (1)   Tests   93 passed (93)
test:config  Test Files  1 passed (1)   Tests   46 passed (46)
test:setup   Test Files  1 passed (1)   Tests   12 passed (12)
test:guides  Test Files  1 passed (1)   Tests   28 passed (28)
```

## Acceptance criteria

1. **Met.** The closing `npx --no-install scaffold audit` reports no `setup:` advisory:

   ```text
   dependencies: typescript declares major 6, while the registry serves major 7.
   0 of 126 planned paths drifted from the plan. Audit compared bytes at 115, existence at 5, and nothing at 6. The plan does not own 7 further paths beneath its groups.
   ```

   The remaining `dependencies:` line is the fleet-wide advisory the brief puts out of scope.

2. **Met.** Every gate closed green, each read bare, per the preceding table.
3. **Met.** One mutation-control failing line reported, restored, and re-run green.

## Files touched

- `tests/setup.test.ts` — new; the setup-module proof described earlier.
- `package.json` — the planned `test:guides` value, the planned `test` chain, and the `test:setup`
  script `repair` wrote.
- `vite.config.ts` — the `setup` project and its entry in the project list, both written by
  `repair`.
- `package-lock.json` — arrived dirty from the scaffold ^0.0.52 re-pin; `repair` rewrote it.
- The vendored orchestration set under `.agents/`, `.claude/`, `.codex/`, and `CLAUDE.md` —
  rewritten by the full `repair`, untouched by hand.
- `tmp/units/visit-report.md` — this report, under the gitignored `tmp` directory.

Diffstat, `git diff --stat` against `HEAD` at `2e22874`:

```text
 37 files changed, 575 insertions(+), 673 deletions(-)
```

Owned-file slice of that diff:

```text
 package.json      |   9 +-
 vite.config.ts    |  13 +-
 package-lock.json | 423 +++++++++------------
```

Untracked additions include `tests/setup.test.ts` plus the vendored paths `repair` added
(`.agents/templates/`, `.agents/transports/`, `.agents/skills/orkestrel-prove-journey/`,
`.agents/skills/orkestrel-publish/`, their `.claude/skills/` bridges, and
`.agents/skills/orkestrel-debrief/references/retention.md`).

## Standing conditions, as left

- The foreign paths — the retired `orkestrel-human-journey` skill under `.agents/skills` and
  `.claude/skills`, plus `.claude/agents/codex.md` and `.codex/agents/claude.toml` — are untouched.
  `repair` removed nothing (`0 removed`), so they remain for the Orchestrator to remove at commit.
- `dist/` is gitignored and does not appear in the status.
- No git state was changed and nothing was committed.
