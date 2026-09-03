### brief

- `required` — `reports/conform-interpret-report.md:186-207` — `/home/user/fleet/brief/src/core/constants.ts:70`, `/tests/setup.ts:93,167-171,242,313,380`
```diff
-	'complete',
+	// removed
```
```diff
-			extract: () => ({ intent: { action, domain, confidence: 1 }, numbers: [3], complete: true }),
+			extract: () => ({ intent: { action, domain, confidence: 1 }, numbers: [3] }),
```
```diff
-				complete: false,
```
```diff
-	get complete(): boolean {
-		return false
-	}
-
```

- `required` — `reports/conform-interpret-report.md:235-250` — `/home/user/fleet/brief/tests/setup.test.ts:109-110,144`
```diff
-		expect(result.complete).toBe(true)
+		expect(result.failures).toEqual([])
```
```diff
-		expect(interpretation.complete).toBe(false)
+		expect(interpretation.failures).toEqual([])
```

- `prose` — `reports/conform-interpret-report.md:255-257` — `/home/user/fleet/brief/guides/interpret.md`
```text
a vendored byte-identical mirror. Refresh it from the released @orkestrel/interpret guide rather than editing it; the removal of complete and the rename to renderSubject each move it.
```

- `required` — `reports/conform-reason-report.md:190-207` — `/home/user/fleet/brief/tests/setup.ts:...`
```diff
-	conclusion: true,
```
```diff
-	conclusion: false,
```

- `mirror` — `reports/conform-reason-report.md:247` — `/home/user/fleet/brief/guides/reason.md`
```text
Every row that names `guides/reason.md` moved it. Copy the file verbatim into `/home/user/fleet/{program,interpret,rater,qualifier,brief}/guides/reason.md`.
```

- `required` — `reports/conform-contract-report.md:247` — `/home/user/fleet/brief/tests/src/core/shapers.test.ts:304`
```diff
-	expect(briefShape.type).toBe('object')
+	expect(briefShape.category).toBe('object')
```

- `required` — `reports/conform-guide-report.md:154-163` — `/home/user/fleet/brief/tests/guides.test.ts:166,190`
```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

- `mirror` — `reports/conform-guide-report.md:174-177` — `/home/user/fleet/brief/guides/guide.md`
```text
every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.
```

- `mirror` — `reports/conform-emitter-report.md:143` — `/home/user/fleet/brief/guides/emitter.md`
```text
The patch is not a text edit but a mirror refresh: copy emitter's `guides/emitter.md` at this tip over each sibling's copy, per `.claude/rules/documentation.md` § Parity ("Refresh a mirror rather than rewriting it"). Schedule it with the publish wave.
```

- `mirror` — `reports/conform-contract-report.md:249-250` — `/home/user/fleet/brief/guides/contract.md`
```text
Refresh the mirror from the published guide after this package releases; do not hand-edit it, per `.claude/rules/documentation.md` § Parity.
```

### probe

- `required` — `reports/conform-guide-report.md:169-172` — `/home/user/fleet/probe/tests/guides.test.ts`
```text
probe/tests/guides.test.ts carries no `symbol.kind` line, so it needs no edit.
```

- `mirror` — `reports/conform-guide-report.md:174-177` — `/home/user/fleet/probe/guides/guide.md`
```text
every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.
```

- `mirror` — `reports/conform-emitter-report.md:143` — `/home/user/fleet/probe/guides/emitter.md`
```text
The patch is not a text edit but a mirror refresh: copy emitter's `guides/emitter.md` at this tip over each sibling's copy, per `.claude/rules/documentation.md` § Parity ("Refresh a mirror rather than rewriting it"). Schedule it with the publish wave.
```

- `mirror` — `reports/conform-contract-report.md:249-250` — `/home/user/fleet/probe/guides/contract.md`
```text
Refresh the mirror from the published guide after this package releases; do not hand-edit it, per `.claude/rules/documentation.md` § Parity.
```

### program

- `required` — `reports/conform-qualifier-report.md:200-250` — `/home/user/fleet/program/src`, `/tests`
```diff
-import { findRule, interpolateMessage, logicalPremises } from '@orkestrel/qualifier'
+import { findRule, interpolateMessage, ruleToPremises } from '@orkestrel/qualifier'
```
```diff
-			premises: logicalPremises(rule, working, evaluator, labels),
+			premises: ruleToPremises(rule, working, evaluator, labels),
```
```diff
-import { createQualifier, qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition, createQualifier, createRuling } from '@orkestrel/qualifier'
```
```diff
-import { qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'
```
```diff
-import { qualificationDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition } from '@orkestrel/qualifier'
```
```diff
-import { rulingDefinition } from '@orkestrel/qualifier'
+import { createRuling } from '@orkestrel/qualifier'
```
```text
Rename every remaining whole-word `qualificationDefinition` to `createQualificationDefinition` and every `rulingDefinition` to `createRuling` at the listed source and test sites.
```

- `prose` — `reports/conform-qualifier-report.md:275-306` — `/home/user/fleet/program/README.md:31,50,56`, `/guides/program.md:38,57,63,279,770,786,792,821,832,876,890`
```diff
-import { qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'
```
```diff
-`interpolateMessage`, `findRule`, and `logicalPremises` (all public qualifier exports,
+`interpolateMessage`, `findRule`, and `ruleToPremises` (all public qualifier exports,
```

- `required` — `reports/conform-rater-report.md:117-125` — `/home/user/fleet/program/tests`, `/README.md`, `/guides/program.md`
```text
Replace every whole-word `lineDefinition` with `buildLineDefinition` and every whole-word `ratingDefinition` with `buildRatingDefinition` in `tests/setup.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/programs/Program.test.ts`, `README.md`, and `guides/program.md`. Re-sort each affected named-import list.
```

- `prose` — `reports/conform-rater-report.md:121-122` — `/home/user/fleet/program/README.md:32,63,71`, `/guides/program.md:39,70,78,800-802`
```text
README.md:32 and guides/program.md:39 replace the old imports; remaining whole-word call sites use the corresponding build* names.
```

- `mirror` — `reports/conform-rater-report.md:123` — `/home/user/fleet/program/guides/rater.md`
```text
Refresh `guides/rater.md` from this package's `guides/rater.md` rather than hand-editing it.
```

- `mirror` — `reports/conform-reason-report.md:247` — `/home/user/fleet/program/guides/reason.md`
```text
Every row that names `guides/reason.md` moved it. Copy the file verbatim into `/home/user/fleet/{program,interpret,rater,qualifier,brief}/guides/reason.md`.
```

- `required` — `reports/conform-guide-report.md:154-163` — `/home/user/fleet/program/tests/guides.test.ts:120`
```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

- `mirror` — `reports/conform-guide-report.md:174-177` — `/home/user/fleet/program/guides/guide.md`
```text
every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.
```

- `mirror` — `reports/conform-emitter-report.md:143` — `/home/user/fleet/program/guides/emitter.md`
```text
The patch is not a text edit but a mirror refresh: copy emitter's `guides/emitter.md` at this tip over each sibling's copy, per `.claude/rules/documentation.md` § Parity ("Refresh a mirror rather than rewriting it"). Schedule it with the publish wave.
```

- `mirror` — `reports/conform-contract-report.md:249-250` — `/home/user/fleet/program/guides/contract.md`
```text
Refresh the mirror from the published guide after this package releases; do not hand-edit it, per `.claude/rules/documentation.md` § Parity.
```

### worker

- `required` — `reports/conform-queue-report.md:156-230` — `/home/user/fleet/worker/src/core/types.ts`, `src/core/Worker.ts`, `src/server/types.ts`, `src/server/Dispatch.ts`, `src/server/helpers.ts`, `src/server/NodeWorker.ts`
```diff
-import type { QueueEntryOptions, QueueExecution, QueueStoreInterface } from '@orkestrel/queue'
+import type { QueueContext, QueueEntryOptions, QueueStoreInterface } from '@orkestrel/queue'
```
```diff
-	execution: QueueExecution,
+	context: QueueContext,
```
```diff
-import type { QueueEntryOptions, QueueExecution } from '@orkestrel/queue'
+import type { QueueContext, QueueEntryOptions } from '@orkestrel/queue'
```
```diff
-	async #handle(input: TInput, execution: QueueExecution): Promise<TResult> {
+	async #handle(input: TInput, context: QueueContext): Promise<TResult> {
```
```diff
-import type { QueueExecution, QueueStoreInterface } from '@orkestrel/queue'
+import type { QueueContext, QueueStoreInterface } from '@orkestrel/queue'
```
```diff
-	readonly handler: (input: TInput, execution: QueueExecution) => Promise<TResult> | TResult
+	readonly handler: (input: TInput, context: QueueContext) => Promise<TResult> | TResult
```
```diff
-import type { QueueExecution } from '@orkestrel/queue'
+import type { QueueContext } from '@orkestrel/queue'
```
```diff
-	readonly #execution: QueueExecution
+	readonly #context: QueueContext
```
```diff
-		execution: QueueExecution,
+		context: QueueContext,
```
```diff
-import type { QueueExecution } from '@orkestrel/queue'
+import type { QueueContext } from '@orkestrel/queue'
```
```diff
-	execution: QueueExecution,
+	context: QueueContext,
```
```diff
-import type { QueueExecution, QueueStoreInterface } from '@orkestrel/queue'
+import type { QueueContext, QueueStoreInterface } from '@orkestrel/queue'
```
```diff
-	#handle(input: TInput, thread: NodeThread, execution: QueueExecution): Promise<TResult> {
+	#handle(input: TInput, thread: NodeThread, context: QueueContext): Promise<TResult> {
```

- `prose` — `reports/conform-queue-report.md:274-279` — `/home/user/fleet/worker/guides/worker.md:19,98,103,149,152,199,204,198,280,283,427`
```text
Substitute `QueueExecution` → `QueueContext` and `execution` → `context` in the `WorkerHandler` shape row and the `ServeWorkerOptions` Surface row, and read the listed prose sites by sense for the same substitution.
```

- `mirror` — `reports/conform-guide-report.md:154-163` — `/home/user/fleet/worker/tests/guides.test.ts:139`
```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

- `mirror` — `reports/conform-guide-report.md:174-177` — `/home/user/fleet/worker/guides/guide.md`
```text
every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.
```

- `mirror` — `reports/conform-emitter-report.md:143` — `/home/user/fleet/worker/guides/emitter.md`
```text
The patch is not a text edit but a mirror refresh: copy emitter's `guides/emitter.md` at this tip over each sibling's copy, per `.claude/rules/documentation.md` § Parity ("Refresh a mirror rather than rewriting it"). Schedule it with the publish wave.
```

- `mirror` — `reports/conform-contract-report.md:249-250` — `/home/user/fleet/worker/guides/contract.md`
```text
Refresh the mirror from the published guide after this package releases; do not hand-edit it, per `.claude/rules/documentation.md` § Parity.
```

- `mirror` — `reports/conform-database-report.md:181-186` — `/home/user/fleet/worker/guides/database.md`
```text
The vendored `guides/database.md` mirror moved in `@orkestrel/worker`. Each refreshes at re-pin; none was hand-edited.
```

### workflow

- `required` — `reports/conform-queue-report.md:235-247` — `/home/user/fleet/workflow/src/core/Runner.ts`
```diff
-import type { QueueExecution, QueueInterface } from '@orkestrel/queue'
+import type { QueueContext, QueueInterface } from '@orkestrel/queue'
```
```diff
-	#dispatch(unit: RunnerUnit<TInput>, execution: QueueExecution): Promise<TResult> | TResult {
+	#dispatch(unit: RunnerUnit<TInput>, context: QueueContext): Promise<TResult> | TResult {
```

- `required` — `reports/conform-contract-report.md:230-243` — `/home/user/fleet/workflow/tests/src/core/shapers.test.ts:18-120`
```diff
-		expect(taskShape.properties.id).toMatchObject({ type: 'string', min: 1 })
+		expect(taskShape.properties.id).toMatchObject({ category: 'string', min: 1 })
-		expect(behavior.type === 'optional' && behavior.inner).toMatchObject({
+		expect(behavior.category === 'optional' && behavior.inner).toMatchObject({
```
```text
Rename the listed `type` literals and `.type` reads at lines 18, 19, 20, 21, 23, 24, 25, 34, 35, 36, 42, 48, 49, 53, 54, 55, 63, 64, 73, 75, 78, 79, 89, 100, 105, 111, 119, and 120 to `category`.
```

- `required` — `reports/conform-guide-report.md:154-163` — `/home/user/fleet/workflow/tests/guides.test.ts:131`
```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

- `mirror` — `reports/conform-guide-report.md:174-177` — `/home/user/fleet/workflow/guides/guide.md`
```text
every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.
```

- `mirror` — `reports/conform-emitter-report.md:143` — `/home/user/fleet/workflow/guides/emitter.md`
```text
The patch is not a text edit but a mirror refresh: copy emitter's `guides/emitter.md` at this tip over each sibling's copy, per `.claude/rules/documentation.md` § Parity ("Refresh a mirror rather than rewriting it"). Schedule it with the publish wave.
```

- `mirror` — `reports/conform-contract-report.md:249-250` — `/home/user/fleet/workflow/guides/contract.md`
```text
Refresh the mirror from the published guide after this package releases; do not hand-edit it, per `.claude/rules/documentation.md` § Parity.
```

- `mirror` — `reports/conform-database-report.md:181-186` — `/home/user/fleet/workflow/guides/database.md`
```text
The vendored `guides/database.md` mirror moved in `@orkestrel/workflow`. Each refreshes at re-pin; none was hand-edited.
```

### agent

- `required` — `reports/conform-queue-report.md:249-262` — `/home/user/fleet/agent/src/core/helpers.ts`
```diff
-import type { QueueExecution } from '@orkestrel/queue'
+import type { QueueContext } from '@orkestrel/queue'
```
```diff
-	execution: QueueExecution,
+	context: QueueContext,
```

- `required` — `reports/conform-guide-report.md:154-163` — `/home/user/fleet/agent/tests/guides.test.ts:120`
```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

- `mirror` — `reports/conform-guide-report.md:174-177` — `/home/user/fleet/agent/guides/guide.md`
```text
every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.
```

- `mirror` — `reports/conform-emitter-report.md:143` — `/home/user/fleet/agent/guides/emitter.md`
```text
The patch is not a text edit but a mirror refresh: copy emitter's `guides/emitter.md` at this tip over each sibling's copy, per `.claude/rules/documentation.md` § Parity ("Refresh a mirror rather than rewriting it"). Schedule it with the publish wave.
```

- `mirror` — `reports/conform-contract-report.md:249-250` — `/home/user/fleet/agent/guides/contract.md`
```text
Refresh the mirror from the published guide after this package releases; do not hand-edit it, per `.claude/rules/documentation.md` § Parity.
```

- `mirror` — `reports/conform-database-report.md:181-186` — `/home/user/fleet/agent/guides/database.md`
```text
The vendored `guides/database.md` mirror moved in `@orkestrel/agent`. Each refreshes at re-pin; none was hand-edited.
```

- `mirror` — `reports/conform-workspace-report.md:213-218` — `/home/user/fleet/agent/guides/workspace.md`
```text
`.claude/rules/documentation.md` requires refreshing a mirror rather than rewriting it, so these are a re-propagation obligation after `@orkestrel/workspace` publishes, not a hand patch.
```

### ollama

- `required` — `reports/conform-guide-report.md:154-163` — `/home/user/fleet/ollama/tests/guides.test.ts:120`
```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

- `mirror` — `reports/conform-guide-report.md:174-177` — `/home/user/fleet/ollama/guides/guide.md`
```text
every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.
```

- `mirror` — `reports/conform-contract-report.md:249-250` — `/home/user/fleet/ollama/guides/contract.md`
```text
Refresh the mirror from the published guide after this package releases; do not hand-edit it, per `.claude/rules/documentation.md` § Parity.
```

- `mirror` — `reports/conform-workspace-report.md:213-218` — `/home/user/fleet/ollama/guides/workspace.md`
```text
`.claude/rules/documentation.md` requires refreshing a mirror rather than rewriting it, so these are a re-propagation obligation after `@orkestrel/workspace` publishes, not a hand patch.
```

- `no edit` — `reports/conform-router-report.md:176-178`
```text
None. No consumer-side edit is obliged.
```

### toolbox

- `required` — `reports/conform-terminal-report.md:165-183` — `/home/user/fleet/toolbox/src/server/terminals/TerminalBridge.ts:136`
```diff
-		if (result.error.reason === 'terminal') return Response.json(result, { status: 404 })
+		if (result.error.reason === 'target') return Response.json(result, { status: 404 })
```

- `mirror` — `reports/conform-terminal-report.md:182-184` — `/home/user/fleet/toolbox/guides/terminal.md:282,465`
```text
A mirror is refreshed by toolbox's next re-vendor of the published guide, not edited by hand.
```

- `required` — `reports/conform-workspace-report.md:188-210` — `/home/user/fleet/toolbox/src/core/factories.ts`, `/src/core/types.ts`
```diff
- * `Workspace` raised by the live workspace (`MODALITY` / `PATTERN` / `RANGE`) PROPAGATE
- * uncaught. The range edit is the FLAT `'splice'` op: its four flat caret integers are
+ * `WorkspaceError` raised by the live workspace (`MISSING` / `MODALITY` / `PATTERN` / `RANGE`)
+ * PROPAGATE uncaught. The range edit is the FLAT `'splice'` op: its four flat caret integers are
```
```diff
  * the end is clamped. An inverted / sub-1 range throws `RANGE`; a binary target throws
- * `MODALITY`.
+ * `MODALITY`; a missing target throws `MISSING`.
```

- `mirror` — `reports/conform-workspace-report.md:213-218` — `/home/user/fleet/toolbox/guides/workspace.md`
```text
`.claude/rules/documentation.md` requires refreshing a mirror rather than rewriting it, so these are a re-propagation obligation after `@orkestrel/workspace` publishes, not a hand patch.
```

- `required` — `reports/conform-guide-report.md:154-163` — `/home/user/fleet/toolbox/tests/guides.test.ts:125`
```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

- `mirror` — `reports/conform-guide-report.md:174-177` — `/home/user/fleet/toolbox/guides/guide.md`
```text
every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.
```

- `mirror` — `reports/conform-contract-report.md:249-250` — `/home/user/fleet/toolbox/guides/contract.md`
```text
Refresh the mirror from the published guide after this package releases; do not hand-edit it, per `.claude/rules/documentation.md` § Parity.
```

- `mirror` — `reports/conform-database-report.md:181-186` — `/home/user/fleet/toolbox/guides/database.md`
```text
The vendored `guides/database.md` mirror moved in `@orkestrel/toolbox`. Each refreshes at re-pin; none was hand-edited.
```

### mcp

- `required` — `reports/conform-guide-report.md:154-163` — `/home/user/fleet/mcp/tests/guides.test.ts:641`
```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

- `mirror` — `reports/conform-guide-report.md:174-177` — `/home/user/fleet/mcp/guides/guide.md`
```text
every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.
```

- `mirror` — `reports/conform-contract-report.md:249-251` — `/home/user/fleet/mcp/guides/contract.md`
```text
Its only obligation is the mirror refresh.
```

- `mirror` — `reports/conform-emitter-report.md:143` — `/home/user/fleet/mcp/guides/emitter.md`
```text
The patch is not a text edit but a mirror refresh: copy emitter's `guides/emitter.md` at this tip over each sibling's copy, per `.claude/rules/documentation.md` § Parity ("Refresh a mirror rather than rewriting it"). Schedule it with the publish wave.
```

- `mirror` — `reports/conform-websocket-report.md:181-190` — `/home/user/fleet/mcp/guides/websocket.md`
```text
`/home/user/fleet/mcp/guides/websocket.md` and `/home/user/fleet/browser/guides/websocket.md` are byte mirrors of this package's guide. They carry the old constant names, the old `parseWebSocketCanonical` row, and the un-narrowed `sec-websocket-key` fences. Re-vendor both after `@orkestrel/websocket` publishes.
```

- `no edit` — `reports/conform-router-report.md:176-178`
```text
None. No consumer-side edit is obliged.
```

### server

- `required` — `reports/conform-guide-report.md:154-163` — `/home/user/fleet/server/tests/guides.test.ts:120`
```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

- `mirror` — `reports/conform-guide-report.md:174-177` — `/home/user/fleet/server/guides/guide.md`
```text
every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.
```

- `mirror` — `reports/conform-emitter-report.md:143` — `/home/user/fleet/server/guides/emitter.md`
```text
The patch is not a text edit but a mirror refresh: copy emitter's `guides/emitter.md` at this tip over each sibling's copy, per `.claude/rules/documentation.md` § Parity ("Refresh a mirror rather than rewriting it"). Schedule it with the publish wave.
```

- `mirror` — `reports/conform-contract-report.md:249-250` — `/home/user/fleet/server/guides/contract.md`
```text
Refresh the mirror from the published guide after this package releases; do not hand-edit it, per `.claude/rules/documentation.md` § Parity.
```

- `no edit` — `reports/conform-router-report.md:176-178`
```text
None. No consumer-side edit is obliged.
```

## Unknowns

- Missing reports: `reports/conform-codec-report.md`, `reports/conform-server-report.md`.
- No target-named reports were present for `brief`, `probe`, `program`, `worker`, `workflow`, `agent`, `ollama`, `toolbox`, or `mcp`.

## Journal

## Deviation

None. No tree change was made or observed.