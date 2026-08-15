U1 implementation is complete. Static gates, build, policy, and focused U1 tests pass. Full browser/real-server verification is blocked by the sandbox refusing loopback listeners; unrelated provider-fixture tests also fail in this environment.

## Touched files + diffstat

Aggregate including untracked files: **37 files, 954 insertions, 90 deletions**.

Tracked `git diff --stat`:

```text
 app/browser/components/CommandBar.vue           |  2 +-
 app/browser/helpers.ts                          | 11 +++
 app/browser/index.ts                            |  1 +
 app/browser/seeders.ts                          | 27 +++++--
 app/browser/services/Client.ts                  | 38 ++++++++--
 app/browser/services/LiveStream.ts              | 33 ++++++---
 app/browser/types.ts                            | 39 ++++++++--
 app/browser/validators.ts                       | 21 +++++-
 app/core/constants.ts                           |  6 ++
 app/core/types.ts                               | 20 ++++-
 app/server/ApplicationHandlers.ts               | 26 ++++++-
 app/server/ApplicationRoutes.ts                 |  6 ++
 app/server/ApplicationServer.ts                 |  1 +
 app/server/LiveBroker.ts                        |  9 ++-
 app/server/SupervisorApplication.ts             | 40 +++++++---
 app/server/index.ts                             |  2 +
 app/server/types.ts                             | 29 +++++++-
 tests/app/browser/ApplicationView.test.ts       |  2 +-
 tests/app/browser/components/CommandBar.test.ts |  2 +-
 tests/app/browser/seeders.test.ts               |  4 +-
 tests/app/browser/services/Client.test.ts       |  4 +-
 tests/app/browser/services/LiveStream.test.ts   | 56 ++++++++++++--
 tests/app/browser/validators.test.ts            | 10 ++-
 tests/app/server/ApplicationHandlers.test.ts    | 71 ++++++++++++++++++
 tests/app/server/ApplicationRoutes.test.ts      |  2 +-
 tests/app/server/ApplicationServer.test.ts      | 97 ++++++++++++++++++++-----
 tests/app/server/MCPProjection.test.ts          |  6 +-
 tests/app/server/middlewares.test.ts            |  1 +
 tests/app/setup.ts                              | 24 ++++++
 tests/setupBrowser.ts                           | 38 ++++++++--
 30 files changed, 538 insertions(+), 90 deletions(-)
```

Untracked additions:

```text
 30 app/browser/services/ClientRoster.ts
 49 app/server/RosterBroker.ts
 95 app/server/RosterViewer.ts
 23 tests/app/browser/services/ClientRoster.test.ts
104 tests/app/server/RosterBroker.test.ts
 30 tests/app/server/RosterViewer.test.ts
 85 tests/app/server/SupervisorApplication.test.ts
```

## Complete `app/core/types.ts` diff

```diff
diff --git a/app/core/types.ts b/app/core/types.ts
index d954c8d..7a5c26b 100644
--- a/app/core/types.ts
+++ b/app/core/types.ts
@@ -97,9 +97,18 @@ export interface Executor {
 	readonly commands: readonly ExecutorCommand[]
 }
 
+/** One live workflow projected for roster discovery without another inspection request. */
+export interface ApplicationRun {
+	readonly id: string
+	readonly status: WorkflowSnapshot['status']
+	readonly paused: boolean
+	readonly started: number
+	readonly updated: number
+}
+
 /** The live authorized workflows and registered executor commands. */
 export interface ApplicationRoster {
-	readonly runs: readonly string[]
+	readonly runs: readonly ApplicationRun[]
 	readonly executors: readonly Executor[]
 }
 
@@ -198,6 +207,15 @@ export interface LiveViewerInterface {
 	destroy(): void
 }
 
+/** A subscribed, coalescing view of complete authorized roster snapshots. */
+export interface RosterViewerInterface {
+	readonly events: AsyncIterable<ApplicationRoster>
+	/** End the viewer after its already-admitted snapshot has been consumed. */
+	close(): void
+	/** Discard the pending snapshot, settle a parked consumer as done, and release the viewer. */
+	destroy(): void
+}
+
 /** A typed prompt reply serialized through the supervisor's string reply seam. */
 export interface PromptAnswer {
 	readonly form: PromptType
```

## `git status --porcelain`

```text
 M app/browser/components/CommandBar.vue
 M app/browser/helpers.ts
 M app/browser/index.ts
 M app/browser/seeders.ts
 M app/browser/services/Client.ts
 M app/browser/services/LiveStream.ts
 M app/browser/types.ts
 M app/browser/validators.ts
 M app/core/constants.ts
 M app/core/types.ts
 M app/server/ApplicationHandlers.ts
 M app/server/ApplicationRoutes.ts
 M app/server/ApplicationServer.ts
 M app/server/LiveBroker.ts
 M app/server/SupervisorApplication.ts
 M app/server/index.ts
 M app/server/types.ts
 M tests/app/browser/ApplicationView.test.ts
 M tests/app/browser/components/CommandBar.test.ts
 M tests/app/browser/seeders.test.ts
 M tests/app/browser/services/Client.test.ts
 M tests/app/browser/services/LiveStream.test.ts
 M tests/app/browser/validators.test.ts
 M tests/app/server/ApplicationHandlers.test.ts
 M tests/app/server/ApplicationRoutes.test.ts
 M tests/app/server/ApplicationServer.test.ts
 M tests/app/server/MCPProjection.test.ts
 M tests/app/server/middlewares.test.ts
 M tests/app/setup.ts
 M tests/setupBrowser.ts
?? app/browser/services/ClientRoster.ts
?? app/server/RosterBroker.ts
?? app/server/RosterViewer.ts
?? tests/app/browser/services/ClientRoster.test.ts
?? tests/app/server/RosterBroker.test.ts
?? tests/app/server/RosterViewer.test.ts
?? tests/app/server/SupervisorApplication.test.ts
```

`git diff --check`: exit 0.

## `waiting` pricing measurement and ruling

Probe:

```text
node_modules/.bin/vitest run --config tmp/probe/vite.config.ts
Test Files  1 passed (1)
Tests       1 passed (1)
exit 0
```

Measurement:

- `status`, `paused`, `started`, and `updated` require zero I/O; they are available from live application maps and workflow snapshots.
- No unanswered-prompt count exists in those in-memory surfaces.
- Looking up waiting work without a prompt ID invokes `database.table('tickets').records()` and scans the complete ticket table in [HumanLedger.ts](/workspace/supervisor/app/server/HumanLedger.ts:38).
- Therefore `waiting` costs at least one store read/full-table scan per relevant publication rather than an in-memory lookup.

Ruling: **omit `waiting`**. The temporary probe files were removed.

## Gate commands with real output

| Command | Result |
|---|---|
| `npm run lint` | exit 0; Oxlint fix pass, no warnings |
| `npm run format` | exit 0; `Finished ... on 345 files` |
| `npm run format:check` | exit 0; `All matched files use the correct format.` |
| `npm run lint:check` | exit 0; no warnings |
| `npm run check` | exit 0; root, src/core, src/server, app/core, app/browser, and app/server checks passed |
| `npm run build` | exit 0; src core/server and app browser/server builds passed |
| `npm run test:app:core` | exit 0; 4 files, 77 tests passed |
| Focused U1 app-server tests | exit 0; 4 files, 5 tests passed |
| `npm run test:policy` | exit 0; 1 file, 17 tests passed |
| `npm run test:app:server` | exit 1; 14 files/149 tests passed, 7 files/59 tests failed; loopback-backed tests received `listen EPERM: operation not permitted 127.0.0.1`, unrelated CLI fixtures exited 64 |
| `npm run test:app:browser` | exit 1 before discovery; `listen EPERM: operation not permitted 127.0.0.1:63315`, no tests ran |
| `npm test` | exit 1 in `test:src`; 16 files/212 tests passed, 4 files/20 provider-fixture tests failed or timed out, so the chain did not reach app/policy/guides |
| `npm run test:guides` | expected U7 drift: 301 passed, 3 failed |

Exact guide-parity drift:

```text
APP_ROSTER_EVENT
APP_ROSTER_LIVE_PATH
ApplicationRun
ClientRoster
ClientRosterInterface
ClientRosterReadHandler
LiveStreamEventHandler
LiveStreamOptions
RosterBroker
RosterBrokerInterface
RosterFrameHandler
RosterViewer
RosterViewerInterface
RosterViewerOptions
isApplicationRun
resolveLiveFrameEvent
```

The other two guide failures are the documented phantom `Client.roster` method on `ClientInterface` and `Client`, now intentionally replaced by the roster property.

## Per-criterion proof pointers

1. Cookie-session `/roster/live`, complete initial roster, bearer starts, named filtering, `*` visibility, and completion removal are covered in [ApplicationServer.test.ts](/workspace/supervisor/tests/app/server/ApplicationServer.test.ts:195); execution is sandbox-blocked by loopback `EPERM`.
2. The separate broker/viewer composition is in [RosterBroker.ts](/workspace/supervisor/app/server/RosterBroker.ts:5), [RosterViewer.ts](/workspace/supervisor/app/server/RosterViewer.ts:4), and [LiveBroker.ts](/workspace/supervisor/app/server/LiveBroker.ts:24). `LiveFrame` hashes identically at HEAD and worktree: `4aa692ef36d626cb64b4ff151185471c65d8ece5752afe3b81038cfdcefeebd5`.
3. Copied named and wildcard grants are proved green in [RosterBroker.test.ts](/workspace/supervisor/tests/app/server/RosterBroker.test.ts:26); real-server named/`*` assertions are at [ApplicationServer.test.ts](/workspace/supervisor/tests/app/server/ApplicationServer.test.ts:264), blocked only by loopback `EPERM`.
4. One-pending-snapshot replacement and identical filtered suppression are green in [RosterBroker.test.ts](/workspace/supervisor/tests/app/server/RosterBroker.test.ts:50); socket-drain handling is at [ApplicationHandlers.ts](/workspace/supervisor/app/server/ApplicationHandlers.ts:318).
5. `Client.roster.read()/watch()` is defined in [ClientRoster.ts](/workspace/supervisor/app/browser/services/ClientRoster.ts:9), exposed in [types.ts](/workspace/supervisor/app/browser/types.ts:447), and consumed by [CommandBar.vue](/workspace/supervisor/app/browser/components/CommandBar.vue:179); `rg "\\.roster\\(\\)" app tests` returned `no .roster() call sites`, and browser typecheck passed.
6. Both GET and publication use [SupervisorApplication.ts](/workspace/supervisor/app/server/SupervisorApplication.ts:312); the divergence proof is green in [SupervisorApplication.test.ts](/workspace/supervisor/tests/app/server/SupervisorApplication.test.ts:11).
7. Formatting, lint, checks, build, app-core, policy, and focused U1 tests exit 0. Official browser/real-server projects cannot exit 0 because this sandbox forbids their listeners; full-suite provider fixtures also fail independently. Expected U7 guide drift is recorded exactly above.

## Deviations

None. No off-limits tracked files changed; no commits, pushes, dependency installations, or configuration changes were made. The failed listener/provider gates are execution-environment exceptions, not implementation or scope deviations.