## Touched files

Implemented the assigned changes in:

- `src/core/constants.ts` and `src/core/compilers.ts`
- `src/bin/types.ts` and `src/bin/CLI.ts`
- `src/server/Materializer.ts`
- `tests/setupServer.ts`
- `tests/src/core/constants.test.ts`
- `tests/src/bin/CLI.test.ts`
- `tests/src/server/Materializer.test.ts`
- `guides/scaffold.md`
- `guides/README.md` — seed sentence only

The existing core barrel exposes the constant. The typecheck and bin runs identified no affected consumer in `src/bin/helpers.ts`.

## Git diff --stat

The scoped reading includes inherited changes:

```text
 guides/README.md                      |  16 ++-
 guides/scaffold.md                    | 199 ++++++++++++++++++++++-----
 src/bin/CLI.ts                        | 158 ++++++++++++++--------
 src/bin/types.ts                      |  30 +++--
 src/core/compilers.ts                 |   9 +-
 src/core/constants.ts                 |  39 ++++--
 src/server/Materializer.ts            |  94 +++++++++++--
 tests/setupServer.ts                  | 199 ++++++++++++++++++++-------
 tests/src/bin/CLI.test.ts             | 246 ++++++++++++++++++++++++++++++++--
 tests/src/core/constants.test.ts      |   8 ++
 tests/src/server/Materializer.test.ts | 235 +++++++++++++++++++++++++-------
 11 files changed, 997 insertions(+), 236 deletions(-)
```

## Status

Implementation is complete. Full acceptance remains pending the Orchestrator's inventory regeneration and host verification.

The starting/final tracked-file SHA-256 comparison reported `unowned: []`. The status retained the inherited modifications and untracked mirrors. The baseline is recorded in `D46-inherited.json` and `D46-inherited.diff` beside this report.

## Baseline readings

The pre-implementation `npm.cmd run test:src:bin` run exited 1: 252 passed; 5 failed. Its failures were in the default host-floor scenarios. The direct reader reported:

```text
ScaffoldError: The vendored host cannot read the declared file at .claude/agents/orkestrel.md
```

After the contract change, `npm.cmd run check` exited 2, locating the result producers and consumers in `src/bin/CLI.ts` and `tests/src/bin/CLI.test.ts`. With the changed pins and the preceding implementation, `npm.cmd run test:src:bin` exited 1: 248 passed; 9 failed. See `D46-contract-check.log` and `D46-contract-bin.log`.

## Red-then-green evidence

The following command reported 4 failed, then 4 passed:

```text
npm.cmd run test:src:bin -- --testNamePattern 'regenerates the package table|widens the fetch|persists the offline half|keeps guide difference questions'
```

Its pins cover completed catalog membership, the `--all` result, omitted membership after an incomplete overwrite, and the CLI question field and message. See `D46-red-bin.log` and `D46-green-bin.log`.

The following command reported 1 failed, then 1 passed:

```text
npm.cmd run test:src:server -- --testNamePattern 'reports differing foreign mirrors'
```

It pins `field: 'guides'`, the path-bearing messages, non-blocking questions, and preserved mirrors. See `D46-red-server.log` and `D46-green-server.log`.

The following command reported 1 failed, then 1 passed:

```text
npm.cmd run test:src:bin -- --testNamePattern 'keeps the floor ranges'
```

It distinguishes completed fleet membership evidence from the separate version read, whose foreign-tool refusal remains in top-level `overwrite.releases`. See `D46-red-membership.log` and `D46-green-membership.log`.

The core run also passed the seed constant's membership and freeze pin and the existing compiler seed-guide and target-guide exclusion pins.

## Acceptance readings

The final commands produced these results:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run format:check` | 0 | Passed |
| `npm.cmd run lint:check` | 0 | Passed |
| `npm.cmd run check` | 0 | Passed, including environment checks |
| `npm.cmd run test:src:core` | 0 | 412 passed |
| `npm.cmd run test:src:bin` | 1 | 252 passed; 5 failed, matching the baseline |
| `npm.cmd run test:src:server` | 1 | 454 passed; 10 failed; 6 skipped |
| `npm.cmd run test:guides` | 0 | 23 passed |
| `git diff --check` | 0 | Passed |

The server failures comprise the documented `Ollama setup` failures and the stale `readHostFloor` inventory reading. The bin failures retain these baseline titles:

- takes the host live when every declared digest matches and takes the floor when the repository is dark
- asks the repository for no canon path while fetching a drifted vendored one
- writes the same distributed new baseline when transport forces it and when offline selects it
- makes offline audit answer drift alone and offline repair match a forced floor write
- runs the overwrite floor half offline and refuses its catalog half

The following controls exclude the named baseline failures without changing test declarations:

```text
npm.cmd run test:src:bin -- --testNamePattern '^(?!.*(?:takes the host live|asks the repository for no canon|writes the same distributed new baseline|makes offline audit answer|runs the overwrite floor half offline)).*$'
npm.cmd run test:src:server -- --testNamePattern '^(?!.*(?:Ollama setup|reads the default host floor)).*$'
```

The bin control exited 0 with 252 passed and 5 skipped. The server control exited 0 with 451 passed and 19 skipped. Logs are `D46-control-bin.log` and `D46-control-server.log`.

## Rulings recorded

- `SEED_GUIDE_PATHS` owns the frozen seed membership. The compiler, checkout fixture, TSDoc, Surface row, and seed prose use that name.
- `CatalogResult.membership` groups `entries`, `dropped`, and `releases`. Catalog exit status and human reporting test that entity's presence. `note` explains the refusal.
- `overwrite` omits membership when its catalog work cannot complete. Its top-level releases preserve the separate version read; nested releases measure fleet ranges against the completed catalog read.
- Mirror questions carry `field: 'guides'` and name their path in the message.
- The JSON excerpt uses the admitted `text` fence label; the guide gate rejected `json` before that correction and passed afterward.

## Deviation state

Spawned nothing. Added no dependencies. Wrote no off-limits files. Build and inventory regeneration were not run, as instructed. The bin acceptance criterion remains unmet because its baseline also reaches the stale inventory documented for the server suite.

Probe returned `MCP tool call requires approval, but approval policy is never`. No receipt was issued. The evidence consists of the executed Vitest runs.

PowerShell refused `D46-gates.ps1` because script execution is disabled. The acceptance commands ran directly through `npm.cmd`; no execution policy changed. Vitest needed no loader substitution.
