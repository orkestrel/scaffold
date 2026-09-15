<!-- D4-2b — sol (GPT-6 Astra, codex exec workspace-write -C scaffold), thread 01a0a47b-f835-7811-8ed5-4c1e4582c71f; journal tmp/codex/D42b-scaffold-catalog-floor.jsonl; 2026-09-15 09:53–10:10Z. Retained from --output-last-message. -->

## Touched files

Implemented the catalog fallback and audit questions. Full acceptance remains non-green pending host inventory regeneration and the documented sandbox failures.

| File | Change |
|---|---|
| `src/server/Materializer.ts` | Writes absent mirrors from verified hosted guides; preserves write preconditions; reports advisory guide differences. |
| `src/server/types.ts` | Documents mirror fallback and preservation. |
| `src/bin/CLI.ts` | Performs guide-only catalog operations during membership outages and reports truthful provenance. |
| `src/bin/types.ts` | Defines partial catalog results with omitted membership evidence and a `note`. |
| `src/bin/helpers.ts` | Reads catalog names from verified value hosts. |
| `tests/src/bin/CLI.test.ts` | Proves fallback, partial operations, provenance, and non-blocking audit output. |
| `tests/src/server/Materializer.test.ts` | Proves hosted writes, observation refusal, and mirror preservation during repair. |
| `guides/scaffold.md` | Documents catalog fallback, partial results, and audit questions; preserves D4-1b’s Surface row. |

## Diff and status

The following output includes inherited D4-1b and Orchestrator changes. This unit shares `guides/scaffold.md` and `tests/src/server/Materializer.test.ts` with D4-1b. Other paths outside the touched-file table remain inherited.

`git diff --stat` returned:

```text
 .agents/templates/brief.md            |   9 +
 .claude/rules/tests.md                |  40 ++++-
 guides/scaffold.md                    |  25 ++-
 host.json                             | 303 +++++++++++++++++++++++++++++++++-
 src/bin/CLI.ts                        | 141 ++++++++++------
 src/bin/helpers.ts                    |  13 +-
 src/bin/types.ts                      |  16 +-
 src/core/compilers.ts                 |  11 +-
 src/core/constants.ts                 |  27 ++-
 src/core/helpers.ts                   |   2 +-
 src/server/Materializer.ts            |  92 +++++++++--
 src/server/helpers.ts                 |  46 +++++-
 src/server/types.ts                   |   4 +
 tests/setupServer.test.ts             |  16 +-
 tests/setupServer.ts                  |  88 ++++++----
 tests/src/bin/CLI.test.ts             | 218 +++++++++++++++++++++++-
 tests/src/core/compilers.test.ts      |  13 ++
 tests/src/core/helpers.test.ts        |  24 ++-
 tests/src/server/Materializer.test.ts | 123 ++++++++++++++
 tests/src/server/helpers.test.ts      |  61 +++++++
 20 files changed, 1127 insertions(+), 145 deletions(-)
```

`git status --porcelain` returned:

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

The baseline commands produced:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run check` | 0 | Passed. |
| `npm.cmd run test:src:server` | 1 | 435 passed, 9 documented Ollama failures, 6 skipped. |
| `npm.cmd run test:src:bin` | 0 | 253 passed. |

## Behavioral evidence

The fallback command ran **3 failed → 3 passed**:

```text
npm.cmd run test:src:bin -- --testNamePattern 'hosted floor|hosted catalog membership'
```

It covers these titles:

- `writes a missing guide from the hosted floor after a guide 404 and reports drift`
- `writes declared guides from the hosted floor after network refusal without catalog or version writes`
- `uses hosted catalog membership for all during a registry outage and excludes the target guide`

The Materializer command ran **2 failed → 2 passed**:

```text
npm.cmd run test:src:server -- --testNamePattern 'hosted bytes for an absent|differing foreign mirrors'
```

It covers these titles:

- `writes hosted bytes for an absent failed mirror and refuses a changed absence observation`
- `reports differing foreign mirrors as non-blocking catalog questions and preserves them during repair`

The retained-behavior command ran **3 failed under deliberate mutations → 3 passed after restoration**. The mutations substituted hosted bytes for live content and overwrote present mirrors:

```text
npm.cmd run test:src:bin -- --testNamePattern 'regenerates the package table and the guide mirrors|reports a guide the host could not answer|skips a guide the host does not publish'
```

It covers these titles:

- `regenerates the package table and the guide mirrors from the endpoints it was given`
- `reports a guide the host could not answer for as drift, naming the package`
- `skips a guide the host does not publish and completes the catalog`

The command-level audit proof ran **1 failed with questions disabled → 1 passed after restoration**:

```text
npm.cmd run test:src:bin -- --testNamePattern 'keeps guide difference questions'
```

Its title is `keeps guide difference questions non-blocking and excludes the target guide during audit`.

## Unknown’s reading

No Mirror member is needed. Its existing `observed` bytes and the Materializer’s transaction preconditions express the required write constraint. The Materializer resolves hosted bytes when a failed mirror’s observation records absence; present mirrors retain their bytes and unresolved upstream verdict.

## Acceptance readings

The final commands produced:

| Command | Exit | Reading |
|---|---:|---|
| `npm.cmd run lint:check` | 0 | Passed. |
| `npm.cmd run check` | 0 | Passed. |
| `npm.cmd run test:src:server` | 1 | 436 passed, 10 failed, 6 skipped. |
| `npm.cmd run test:src:bin` | 1 | 252 passed, 5 failed. |
| `npm.cmd run test:guides` | 0 | 23 passed. |
| `npm.cmd run format:check` | 0 | Passed. |
| `git diff --check` | 0 | Passed. |
| `node tmp/codex/D42b-scope.mjs` | 0 | Unowned tracked changes match the inherited diff; the control detects an altered `host.json` diff. |

The server failures comprise the baseline Ollama failures and the default-host integrity test. The bin failures concern default-host baselines. The guide edit invalidates its recorded digest:

```text
ScaffoldError: The vendored host cannot read the declared file at guides/scaffold.md
```

## Deviation state

No off-limits file was edited. No agents were spawned, packages added, or version changed.

Full acceptance requires the Orchestrator’s assigned `host.json` regeneration, followed by the acceptance commands. The documented Ollama sandbox failures still require host verification. Probe MCP remained unavailable as specified; evidence comes from executed tests and mutation controls.