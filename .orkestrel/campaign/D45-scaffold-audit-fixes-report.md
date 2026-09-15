## Touched files

Implemented the assigned changes in:

- `src/server/helpers.ts`, `types.ts`, and `constants.ts`
- `tests/setupPolicy.ts`, `setupPolicy.test.ts`, and `policy.test.ts`
- `tests/setupServer.ts` and `tests/src/server/helpers.test.ts`
- `guides/scaffold.md`
- `tests/distribution.test.ts` — printed example only
- `package.json` — `build:host` string only

## Git diff --stat

The scoped reading includes inherited changes.

```text
 guides/scaffold.md               | 152 +++++++++--
 package.json                     |   4 +-
 src/server/helpers.ts            | 215 +++++++++++++--
 src/server/types.ts              |  31 ++-
 tests/distribution.test.ts       |  62 ++++-
 tests/policy.test.ts             | 281 +++++++++++++++++++-
 tests/setupPolicy.test.ts        | 263 +++++++++++++++++-
 tests/setupPolicy.ts             | 430 +++++++++++++++++++++++++++++-
 tests/setupServer.ts             | 199 ++++++++++----
 tests/src/server/helpers.test.ts | 558 ++++++++++++++++++++++++++++++++++-----
 10 files changed, 2017 insertions(+), 178 deletions(-)
```

Removing the inherited `INVENTORY_NAME` addition returns `src/server/constants.ts` to HEAD.

## Status

Implementation is complete. Full server acceptance remains pending the Orchestrator’s rebuild and host verification.

The starting/final tracked-file hash comparison found changes only in the owned paths. Inherited off-limits changes remain untouched.

## Baseline readings

Before implementation, this command exited **0**, reporting **13 passed**:

```text
npm.cmd run test:setup -- tests/setupPolicy.test.ts
```

## Red-then-green evidence

The export-pin command reported **14 failed → 14 passed**:

```text
npm.cmd run test:setup -- tests/setupPolicy.test.ts --testNamePattern 'accounts for|refuses an unresolved setup|refuses unsupported setup'
```

Each pin ran red, then green:

- Planted namespace, const declarators, let declarators, enum, class, interface, type, and function exports
- Re-export list and local export list
- Star barrel over a namespace
- Setup star export over a namespace
- Unresolved setup star export refusal
- Unsupported setup export and malformed-source refusal

The server-pin command reported **3 failed → 3 passed**:

```text
npm.cmd run test:src:server -- --testNamePattern 'no inventory unless|establishment is asked for|missing guide module'
```

Its pins cover:

- Missing inventory refusal without establishment
- Explicit baseline establishment
- Missing Guide module refusal through a controlled Node resolver

## Acceptance readings

The executed gates produced these results.

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run format:check` | 0 | Passed |
| `npm.cmd run lint:check` | 0 | Passed |
| `npm.cmd run check` | 0 | Passed |
| `npm.cmd run test:policy` | 0 | 102 passed |
| `npm.cmd run test:setup` | 0 | 110 passed; 2 skipped |
| `npm.cmd run test:guides` | 0 | 23 passed |
| `npm.cmd run test:src:server` | 1 | 454 passed; 10 failed; 6 skipped |
| `git diff --check` | 0 | Passed |

The server failures comprise the documented Ollama sandbox failures and:

```text
readHostFloor > reads the default host floor and hydrates as the default materializer does
ScaffoldError: The vendored host cannot read the declared file at .claude/agents/orkestrel.md
```

That catalog’s starting hash already differed from its recorded inventory digest.

The following control exited **0**, reporting **451 passed; 19 skipped**:

```text
npm.cmd run test:src:server -- --testNamePattern '^(?!.*(?:Ollama setup|reads the default host floor)).*$'
```

## Rulings recorded

- Vite’s existing parser accounts for exports; unreadable forms report `surface` violations. Guide still supplies ownership evidence.
- Missing inventory requires `establish: true`; collision shrinkage remains accepted and growth refused.
- Library reporting defaults to silence; `build:host` supplies the stderr sink.
- `readSurfaceBaseline(root, name)` uses `HOST_INVENTORY_PATH`.
- Missing `@orkestrel/guide` produces `ScaffoldError('TARGET', …)`.
- Policy fixtures use `createPolicyScratch`; the barrel regex carries `_PATTERN`.

## Deviation state

Spawned nothing. Added no dependencies. Wrote no off-limits files. Build and inventory regeneration were not run, as instructed.

Probe returned `MCP tool call requires approval, but approval policy is never`. No receipt was issued. Vitest ran normally; no loader substitution was needed.
<!-- Orchestrator: sol route, GPT-6 Astra, workspace-write codex exec rooted at scaffold; journal tmp/codex/D45-scaffold-audit-fixes.jsonl, thread 01a0a4fd-8893-7152-b973-e226bcaed09f, 2026-09-15T12:14:33Z to 12:28:22Z (829 s), exit 0. -->
