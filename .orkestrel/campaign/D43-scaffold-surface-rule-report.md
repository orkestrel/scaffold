<!-- D4-3 — sol (GPT-6 Astra, codex exec workspace-write -C scaffold), thread 01a0a490-55e6-71a1-932e-1098f45100f1; journal tmp/codex/D43-scaffold-surface-rule.jsonl; 2026-09-15 10:15–10:31Z. Retained from --output-last-message. -->

## Touched files

Implemented the `surface` rule within the owned files:

- `tests/setupPolicy.ts` — sweep, hosted-guide checks, declaration locations, and fixtures.
- `tests/policy.test.ts` — physical controls and workspace integration.
- `tests/setupPolicy.test.ts` — helper and population-boundary proofs.
- `guides/scaffold.md` — policy behavior and setup-export documentation.

Temporary scope evidence resides in `tmp/codex/D43-scope.mjs`, `D43-inherited.json`, and `D43-inherited.diff`.

## Git diff --stat

This output includes inherited changes.

```text
 .agents/templates/brief.md            |   9 +
 .claude/rules/tests.md                |  40 ++++-
 guides/scaffold.md                    |  54 +++++-
 host.json                             | 303 +++++++++++++++++++++++++++++++-
 src/bin/CLI.ts                        | 141 +++++++++------
 src/bin/helpers.ts                    |  13 +-
 src/bin/types.ts                      |  16 +-
 src/core/compilers.ts                 |  11 +-
 src/core/constants.ts                 |  27 ++-
 src/core/helpers.ts                   |   2 +-
 src/server/Materializer.ts            |  92 ++++++++--
 src/server/helpers.ts                 |  46 ++++-
 src/server/types.ts                   |   4 +
 tests/policy.test.ts                  | 279 ++++++++++++++++++++++++++++-
 tests/setupPolicy.test.ts             | 166 +++++++++++++++++-
 tests/setupPolicy.ts                  | 319 +++++++++++++++++++++++++++++++++-
 tests/setupServer.test.ts             |  16 +-
 tests/setupServer.ts                  |  88 +++++++---
 tests/src/bin/CLI.test.ts             | 218 ++++++++++++++++++++++-
 tests/src/core/compilers.test.ts      |  13 ++
 tests/src/core/helpers.test.ts        |  24 ++-
 tests/src/server/Materializer.test.ts | 123 +++++++++++++
 tests/src/server/helpers.test.ts      |  61 +++++++
 23 files changed, 1912 insertions(+), 153 deletions(-)
```

## Git status --porcelain

The status output preserves inherited paths.

```text
 M .agents/templates/brief.md
 M .claude/rules/tests.md
 M guides/scaffold.md
 M host.json
 M src/bin/CLI.ts
 M src/bin/helpers.ts
 M src/bin/types.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/server/Materializer.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/policy.test.ts
 M tests/setupPolicy.test.ts
 M tests/setupPolicy.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/helpers.test.ts
?? .orkestrel/
?? guides/supervisor.md
```

## Baseline readings

The baseline commands produced these results.

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run check` | 0 | Passed |
| `npm.cmd run test:policy` | 0 | 91 passed |

## Red-then-green controls

The **required-control command** ran with **8 failed → 8 passed** before the added boundary controls:

```text
npm.cmd run test:policy -- --testNamePattern 'surface policy controls'
```

The **boundary-control command** ran with **3 failed → 3 passed**:

```text
npm.cmd run test:policy -- --testNamePattern 'quoted relative barrel|target catalog row absent|checkout instead of'
```

Each named control produced the following reading.

| Test title | Command | Red → green |
|---|---|---|
| rejects a planted barrel name owned by another hosted guide | Required-control | 1 failed → 1 passed |
| rejects a setup export even when its own hosted guide claims it | Required-control | 1 failed → 1 passed |
| grandfathers a barrel name only through its own hosted guide | Required-control | 1 failed → 1 passed |
| excludes vendored setup exports while inspecting target setup exports | Required-control | 1 failed → 1 passed |
| refuses a barrel statement outside the relative star-export population | Required-control | 1 failed → 1 passed |
| refuses missing hosted evidence and incomplete checkout guide coverage | Required-control | 1 failed → 1 passed |
| reads the scaffold checkout guides when no installed host exists | Required-control | 1 failed → 1 passed |
| orders surface diagnostics by normalized path, line, name, and owner | Required-control | 1 failed → 1 passed |
| accepts a quoted relative barrel target containing a space | Boundary-control | 1 failed → 1 passed |
| refuses a target catalog row absent from the installed guides | Boundary-control | 1 failed → 1 passed |
| reads a scaffold checkout instead of an installed scaffold copy | Boundary-control | 1 failed → 1 passed |

The final combined control run passed **11 tests**.

## Checkout policy reading

`npm.cmd run test:policy` exited **1**, with **101 passed and 1 failed**. Its sole violation is the expected P7 hit:

```text
tests/setupServer.ts:1083
surface name belongs to one package: readErrorCode (test)
```

This finding remains assigned to **U14-scaffold**. The inherited declaration is at line 1083 rather than the measurement’s line 1081.

## Acceptance commands

The final checks produced these results.

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run format:check` | 0 | Passed |
| `npm.cmd run lint:check` | 0 | Passed |
| `npm.cmd run check` | 0 | Passed |
| `npm.cmd run test:policy -- --testNamePattern 'surface policy controls'` | 0 | 11 passed |
| `npm.cmd run test:setup -- tests/setupPolicy.test.ts` | 0 | 13 passed |
| `npm.cmd run test:guides` | 0 | 23 passed |
| `npm.cmd run test:src:server -- --testNamePattern 'imports only Orkestrel packages every workspace declares'` | 0 | 1 passed |
| `git diff --check` | 0 | Passed |
| `node tmp/codex/D43-scope.mjs` | 0 | `{"unownedChanges":[]}` |

## Deviation state

No stop-trigger occurred. No agents were spawned, dependencies added, version changed, or off-limits files edited.

Lint forbids importing the TypeScript compiler API. The barrel check therefore uses the declared Vite `parseSync` API; Guide still enumerates names. Setup-export documentation sits outside the library Surface table, preserving library parity.

**D4-1b finding:** `stageHost` checks catalog-guide coverage but lacks the required cross-guide collision-growth refusal. That source change remains outside this unit. Host inventory regeneration also remains outside this unit.

Probe MCP could not execute: its tool required approval, while this session’s approval policy is `never`. No Probe receipt was obtained; the evidence consists of the executed tests reported here.