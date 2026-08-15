# A6 report — viewer freshness (Opus implementer, returned complete)

All edits predate the gate runs. Unit complete.

## Touched files

| File | Change |
| --- | --- |
| `/workspace/supervisor/app/browser/controllers/Operator.ts` | `terminal` becomes a computed over `isTerminalStatus(snapshot.workflow.status)`; stored `#terminal` ref and its four writes deleted; a clean, current-generation, non-aborted stream end performs one authoritative `refresh()` |
| `/workspace/supervisor/app/browser/types.ts` | `OperatorInterface.terminal` TSDoc restated as derived-from-snapshot |
| `/workspace/supervisor/tests/app/server/SupervisorApplication.test.ts` | Closure-barrier proof: a self-completing run's viewer close precedes a terminal `inspect` |
| `/workspace/supervisor/tests/app/browser/controllers/Operator.test.ts` | Three new proofs + `FINISHED` fixture; two existing tests re-vectored off the tail flag |
| `/workspace/supervisor/tests/app/browser/integration/setup.ts` | `createApplicationCompletionInput` — human phase then `function` phase, so the run finishes itself |
| `/workspace/supervisor/tests/app/browser/integration/journey.test.ts` | Completion journey: real self-completion under an open viewer, films `finished` |
| `/workspace/supervisor/tests/app/browser/portfolio.ts` | Registered journey state `finished` |
| `/workspace/supervisor/tests/app/browser/portfolio.test.ts` | `terminal` shell state seeded from a terminal snapshot, not a tail flag |

```
 app/browser/controllers/Operator.ts            |  36 ++++--
 app/browser/types.ts                           |   9 +-
 tests/app/browser/controllers/Operator.test.ts | 133 +++++++++++++++++++---
 tests/app/browser/integration/journey.test.ts  |  54 +++++++++
 tests/app/browser/integration/setup.ts         |  40 +++++++
 tests/app/browser/portfolio.test.ts            |  51 +++++++--
 tests/app/browser/portfolio.ts                 |  13 ++-
 tests/app/server/SupervisorApplication.test.ts |  61 ++++++++++
 8 files changed, 357 insertions(+), 40 deletions(-)
```

## Ripple measurement and ruling (brief item 3)

**Ruling taken: measured, NOT deleted.** `ApplicationTail.terminal` has consumers outside the owned list. Measured with `grep -rn --include='*.ts' --include='*.vue' --include='*.md' -e 'ApplicationTail' -e '\.terminal\b' app src tests guides demo scripts configs`:

Unowned consumers (each would need editing to delete the field):
- `app/server/MCPProjection.ts:137` — `projectObserverWatch(tail.frames, command.cursor, tail.terminal)`, which produces the MCP `observer/watch` `closed` fact
- `app/server/helpers.ts:225,314` — the `terminal` parameter that `closed` is computed from
- `app/server/ApplicationHandlers.ts:303` — the HTTP journal route's published `terminal` key
- `app/server/types.ts:9,361` — `ApplicationInterface.tail` declaration
- `app/browser/seeders.ts:5,724` — showcase seeder
- `tests/setupBrowser.ts:1451,1752,1812,1938` — `createApplicationTail` and `ScriptedClient`
- `tests/app/server/ApplicationHandlers.test.ts:190,194`, `tests/app/server/ApplicationRuntime.test.ts:166`, `tests/app/browser/seeders.test.ts:208`, `tests/app/browser/components/ContentPane.test.ts:11,35`
- `guides/src/supervisor.md:917,1235,2019,3391,3505,3521`

The field is a published server contract (the MCP `closed` fact and the journal route key), not just a browser detail. Deleting it is a server-surface change, well outside this unit. Per the brief: reported, not deleted, scope not widened. `Operator.terminal` derives from the snapshot regardless, and `Operator` no longer reads `tailed.value.terminal` at all — `open`'s subscribe decision now reads the same computed the header does, so the two can never disagree.

Brief item 5, second branch: **not triggered.** The closure barrier holds — proven, not assumed.

## Per-criterion proofs

**Criterion 1 — clean-end refresh, red then green, with the aborted-end negative.**

Real-broker proof (no injected terminal frame; a `human`→`function` workflow finishes itself on the real server while the viewer is open):

```
$ npm run test:app:browser:integration                       # RED
FAIL journey.test.ts > Completion journey > reports the run finished when the run finishes itself under the open viewer
TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
  - waiting for getByText('Run finished') to be visible
 Tests  2 failed | 13 passed (15)

$ npm run test:app:browser:integration                       # GREEN
 Test Files  3 passed (3)
      Tests  15 passed (15)
```

Controller proofs:

```
$ npx vitest run --config vite.config.ts --no-cache --project app:browser \
    tests/app/browser/controllers/Operator.test.ts                        # RED
× reports a run already finished when it was opened and watches no finished stream
    → expected false to be true
× re-inspects when the run ends its own stream and reports the finished run
    → expected [ 'build' ] to deeply equal [ 'build', 'build' ]
× lets a vanished record answer the read the stream ending asked for
    → expected [ 'build' ] to deeply equal [ 'build', 'build' ]
 Tests  3 failed | 66 passed (69)

$ (same command)                                                          # GREEN
 Tests  69 passed (69)
```

Negative (green throughout, it is the guard): `reads nothing further when the reader releases the subscription instead of the run ending it` — after `logout()` the inspect count stays at 1 and `live` is false.

Item 5 first branch: `lets a vanished record answer the read the stream ending asked for` asserts `ended === true`, `terminal === false`, `fault === undefined`, rows retained. The rendered sentence for that state is the existing gone-run voice, already proved in `ContentPane.test.ts` (`marks an ended run as ended and says what stays readable` → "Run ended" badge + "stay readable"; `lets the vanished-record fact answer for a run that also finished` → asserts "Run finished" does **not** render). I did not add a render assertion because `ContentPane.test.ts` is not owned.

**Criterion 2 — computed, not stored.** `readonly #terminal = computed(...)` reading `isTerminalStatus(snapshot.workflow.status)`. `grep -n '#terminal' app/browser/controllers/Operator.ts` returns only the computed declaration, the getter, and the one subscribe-decision read in `open`. No assignment anywhere.

**Criterion 3 — ruling executed.** See above: measured, exceeds owned list, stop-reported, field retained.

**Criterion 4 — registered portfolio frame.** `finished` added to `JOURNEY_STATES`; four frames generated in the capture run:
```
tests/app/browser/__screenshots__/portfolio/finished-{narrow,wide}-{light,dark}.png   (59.7–107.7 kB each)
```
`finished-wide-light.png` shows the `Run finished` badge, header status `completed`, both phases completed, and the rail row reading "Last seen · completed" — the two surfaces the filmed defect showed disagreeing now agree. The journey's own registry audit (`leaves one frame for every registered journey state and variant, and no other`) passes at 16 frames.

**Criterion 5 — gates.**

| Command | Result |
| --- | --- |
| `npm run check` | green (all six projects) |
| `npm run test:app:server` | **217 passed (217)** (baseline 216) |
| `npx vitest run … --project app:browser:integration` | **15 passed (15)** (baseline 14) |
| `npx vitest run … --project app:browser` | **2 failed \| 450 passed (452)** — both failures in the unowned `ContentPane.test.ts`; see deviation |
| `npm run test:guides` / `test:policy` | 374 passed / 17 passed |
| `oxfmt --check` + `oxlint --deny-warnings`, scoped to the 8 owned files | clean, exit 0 |

Baselines taken before any edit at 311c9b5: app:browser 449/449, integration 14/14, app:server 216/216 — all green, so every failure below is mine.

```
$ git status --porcelain
 M app/browser/controllers/Operator.ts
 M app/browser/types.ts
 M tests/app/browser/controllers/Operator.test.ts
 M tests/app/browser/integration/journey.test.ts
 M tests/app/browser/integration/setup.ts
 M tests/app/browser/portfolio.test.ts
 M tests/app/browser/portfolio.ts
 M tests/app/server/SupervisorApplication.test.ts
```
(`tests/**/__screenshots__/` is gitignored at `.gitignore:33`, so the frames do not appear.)

## Deviation: criterion 5 cannot close from the owned list

**Expected:** `--project app:browser` green using owned files alone.
**Found:** 2 failures, both in `tests/app/browser/components/ContentPane.test.ts`, which the brief neither owns nor marks off-limits.

```
× ContentPane.test.ts:135 > states that a run opened after it finished has a complete story
× ContentPane.test.ts:151 > lets the vanished-record fact answer for a run that also finished
```

Cause: its `render(…, finished)` helper expresses "already finished" as `tail: success(createApplicationTail([], true))` on top of a **running** snapshot (line 35). The ruled mechanism makes that combination unreachable — terminality now lives only in the snapshot status. This is a fixture correction the ruling forces, not a design choice. I did not edit it: unowned files are report-only.

**Patch A (required for green, unrun by me):**

```diff
--- a/tests/app/browser/components/ContentPane.test.ts
+++ b/tests/app/browser/components/ContentPane.test.ts
@@
-import { createUnitContext, createUnitSnapshot } from '../../../setup.js'
+import { createUnitContext, createUnitSnapshot, createWorkflowSnapshot } from '../../../setup.js'
 import { waitForDelay } from '@orkestrel/test'
 import {
 	buildElement,
 	createApplicationSnapshot,
-	createApplicationTail,
+	createSettledUnit,
 	ScriptedClient,
 } from '../../../setupBrowser.js'
@@
 const ABSENT = new BrowserApplicationError('ABSENT', 'No durable state remains', { status: 404 })
+// The same run once it is over. A finished run says so in its own snapshot status, which is the
+// only place that fact lives and the only thing the pane is told before it renders one.
+const FINISHED = createApplicationSnapshot({
+	workflow: createWorkflowSnapshot({
+		status: 'completed',
+		phases: [
+			{
+				id: 'verify',
+				name: 'Verify',
+				status: 'completed',
+				bail: true,
+				tasks: [
+					{
+						id: 'test',
+						name: 'Test',
+						status: 'completed',
+						metadata: {},
+						attempts: 1,
+						activity: { operations: [], constraints: [], updated: 1 },
+						result: {
+							workflow: { id: 'build', name: 'Build' },
+							phase: { id: 'verify', name: 'Verify', workflow: { id: 'build', name: 'Build' } },
+							task: {
+								id: 'test',
+								name: 'Test',
+								phase: { id: 'verify', name: 'Verify', workflow: { id: 'build', name: 'Build' } },
+							},
+							status: 'completed',
+							result: { success: true, value: 'ok' },
+							timestamp: 2,
+						},
+					},
+				],
+			},
+		],
+	}),
+	units: [createSettledUnit({ context: createUnitContext({ attempt: 1 }) })],
+})
@@
 async function render(ending = false, finished = false): Promise<HTMLElement> {
-	const snapshot = createApplicationSnapshot({
-		units: [createUnitSnapshot({ context: createUnitContext({ attempt: 1 }) })],
-	})
+	// A finished run is one whose snapshot status is terminal; there is no second flag to set, and
+	// no live subscription is attached to such a run.
+	const snapshot = finished
+		? FINISHED
+		: createApplicationSnapshot({
+				units: [createUnitSnapshot({ context: createUnitContext({ attempt: 1 }) })],
+			})
 	const client = new ScriptedClient({
 		answers: ending ? [success(snapshot), failure(ABSENT)] : [success(snapshot)],
-		// A run reached from completed history had already reached a terminal status in its persisted
-		// snapshot when its tail was read. That is the server's own fact, and it is why no live
-		// subscription is attached to such a run.
-		...(finished ? { tail: success(createApplicationTail([], true)) } : {}),
 	})
```

The `FINISHED` fixture text is identical to the one already compiling and running in `Operator.test.ts` and `portfolio.test.ts`. Consolidating all three into one `setupBrowser.ts` factory is the right home and is a separate unit — `tests/setupBrowser.ts` is not owned here.

## Report-only findings

**F1 — `app/browser/components/ContentPane.vue:53` now states something false.** The capture proves it: the reader watched the run finish and the pane says "This run finished before it was opened." The strict-mode locator collision in the red run surfaced it (`getByText('Run finished')` matched both the badge and that sentence). The pane cannot tell the two arrivals apart, so the sentence should stop claiming one:

```diff
--- a/app/browser/components/ContentPane.vue
+++ b/app/browser/components/ContentPane.vue
@@
-			<p v-else-if="operator.terminal" class="small text-body-secondary mb-2 flex-shrink-0">
-				This run finished before it was opened. Everything it recorded is here and complete; no
-				further command can reach it.
-			</p>
+			<p v-else-if="operator.terminal" class="small text-body-secondary mb-2 flex-shrink-0">
+				This run has finished. Everything it recorded is here and complete; no further command can
+				reach it.
+			</p>
```
Coupled assertions in the unowned `ContentPane.test.ts`: line 141 `toContain('This run finished before it was opened')` → `toContain('This run has finished')`; line 127 and line 158 `not.toContain('finished before it was opened')` → `not.toContain('This run has finished')`. Apply this only together with Patch A. The comment above that block ("A run reached from completed history was already finished when the interface asked for it") also needs re-voicing.

**F2 — `guides/src/supervisor.md` prose drift** (parity gates stay green; no backticked name moved):

```diff
@@ -1948,1951 @@
-operator re-inspects when a settlement observation arrives on the stream, after a command a
-component issued, and on an explicit `refresh`; two triggers that fire at once join one read rather
-than racing two.
+operator re-inspects when a settlement observation arrives on the stream, when that stream ends
+cleanly under a current generation, after a command a component issued, and on an explicit
+`refresh`; two triggers that fire at once join one read rather than racing two.
@@ -1959,1962 @@
-`terminal` and `ended` are different facts and neither implies the other. `terminal` is the server's
-own reading, carried on `ApplicationTail` beside the frames: it says the persisted workflow snapshot
-had already reached a terminal status when the tail was read, so the operator attaches no live
-subscription and the interface renders a finished run rather than an idle one.
+`terminal` and `ended` are different facts and neither implies the other. `terminal` is read from the
+retained snapshot's own workflow status, so it follows every inspect the operator takes and no second
+copy of it can drift: a run whose snapshot is terminal attaches no live subscription, and the
+interface renders a finished run rather than an idle one. A run that finishes while the viewer is
+open is reported from the inspect its own stream ending asks for, because that ending is the only
+announcement such a run makes — the settlement observation before it lands while the workflow is
+still running.
```

**F3 — the `signal.aborted` guard is not independently falsifiable.** I built it as ruled, and it is correct, but `#invalidate()` is the only path that aborts the controller and it always bumps the generation too. So no public-API path reaches a clean end with an aborted signal and a current generation; the negative test proves the observable rule (a released subscription reads nothing) with both guards live. Stated so an auditor does not have to rediscover it.