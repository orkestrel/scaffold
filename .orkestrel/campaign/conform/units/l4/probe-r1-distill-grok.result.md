I'll read the brief and the repository contracts first, then follow the brief exactly in read-only mode.The brief is a read-only distillate. I'll load its named inputs next and map each row against the tree.Inputs are loaded. Next I’ll read the report and cited law, then sweep each row against the tree and the diff.I'll pull current sites, diff hunks, and old-form sweeps in parallel so each row has `file:line` evidence.I'll keep mapping remaining sites, proof files, and the across-unit sweeps.## Question

For every row of unit conform-probe, what does the tree at `/home/user/fleet/probe` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

Law sentences cited (canon `/home/user/scaffold`): patterns.md:79 `Call \`this.#emitter.destroy()\` last in the entity's \`destroy()\`.` · names.md:8 `Names are public API. A consumer can predict them without documentation.` · names.md:96 `` `build*` assembles a composite value from parts and is neither a factory nor a combinator named for its constituents `` · AGENTS.md:64 `**Derive state.** Compute facts from existing fields. Do not store a second flag or label that can drift.` · typescript.md:39 `Compute derived facts instead of persisting duplicate state.` · documentation.md:39 `Re-read the prose last, against what actually shipped.` · writing.md:38 `Claim only what the reader can check.` · portability.md:35 `Split arrived text on \`/\r\n|\n/\`. Never split on \`\n\` alone, and never split on a bare \`\r\`.` · tests.md:174 `Import them from \`@orkestrel/test\`, and its Node-only helpers from \`@orkestrel/test/server\`. Write a helper of your own only where the package exports none for the job.` · tests.md:180–182 extract/consolidate/export helpers · tests.md:185 `Test files import shared infrastructure rather than declaring local fixture factories.` · tests.md:218–223 delay/condition · typescript.md:80 `State a prerequisite and the failure behavior wherever the symbol has either.` · architecture.md:183 `#` private fields first.

### probe-subj-1

1. **Site now.** Brief `Probe.ts:602-615` is now `src/server/Probe.ts:603-623`. Context:

```602:624:src/server/Probe.ts
	}

	async #destroy(): Promise<void> {
		try {
			try {
				await this.#arming
			} catch {}
			// …
			await Promise.all([
				this.#destroyStage(this.#type),
				this.#destroyStage(this.#lint),
				this.#destroyStage(this.#runtime),
			])
		} finally {
			this.#emitter.destroy()
		}
	}
```

Guide Teardown brief `:929` is now `guides/probe.md:933-937`: `destroy()` releases the emitter last, including on failed teardown; `probe.emitter.destroyed` reads true. Test: `tests/src/server/Probe.test.ts:1381-1425` `destroys idempotently and releases the listeners its host registered` asserts `failures.count` unchanged after a post-destroy `prove` and `probe.emitter.destroyed === true`.

2. **Diff at the site.** `src/server/Probe.ts` `@@ -601,17 +602,25 @@`. Operative repair present: `+			this.#emitter.destroy()` inside `+		} finally {`. Guide `@@ -926,7 +930,11 @@` adds the Teardown sentences. `tests/src/server/Probe.test.ts` `@@ -1452,7 +1379,7 @@` and `@@ -1489,7 +1419,10 @@` retitle and add the post-destroy listener assertions.

3. **Old form sweep.** Row adds; no name removed. Pattern `#emitter.destroy` over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md` (exclude `node_modules`): `src/server/Probe.ts:622`; vendored `guides/emitter.md:166,206` outside the named paths.

4. **Report reading.** Table: `applied` — `` `Probe.#destroy()` releases the emitter in a `finally`, plus the guide's Teardown entry and a proof ``. Tree carries that. Report decision cites `Probe.test.ts:1460` for `on: { error }`; that line is now `let closing: Promise<void> | undefined` (`:1460`). The hook is `tests/src/server/Probe.test.ts:1391` `on: { error: failures.handler }`.

5. **Proof reading.** Report: `npx vitest run … --project src:server -t 'destroys idempotently and releases the listeners'` red 1 failed (`probe-subj-1-red.txt`) green 1 passed (`probe-subj-1-green.txt`). Files exist. `probe-subj-1-red.txt:29` `Tests  1 failed | 178 skipped (179)`. `probe-subj-1-green.txt:7` `Tests  1 passed | 178 skipped (179)`.

### probe-subj-2

1. **Site now.** Brief `helpers.ts:596-618` is now `src/server/helpers.ts:596-619`. First sentence `Builds the fresh sibling path a revision's file is written at, preserving the test's resolution directory.` `:597-598`. `@returns The absolute sibling path` `:603`. Example names `buildRevisionPath` `:609`. Export `export function buildRevisionPath(workspace: string, path: string, revision: string): string` `:614`. Call sites: `src/server/Probe.ts:32,277-278`; `src/server/stages/RuntimeStage.ts:35,449`. Guide row `guides/probe.md:218` (brief `:214`).

2. **Diff at the site.** `src/server/helpers.ts` `@@ -594,23 +594,24 @@`. Verbatim `+ * Builds the fresh sibling path a revision's file is written at, preserving the test's resolution` / `+ * directory.` · `+ * @returns The absolute sibling path` · `+ * 	buildRevisionPath('/srv/checkout', 'tmp/probe/greeting.test.ts', '4821-9f0c'),` · `+export function buildRevisionPath(workspace: string, path: string, revision: string): string {`. Also `Probe.ts` `@@ -29,8 +29,8 @@` and `@@ -273,8 +274,8 @@`; `RuntimeStage.ts` `@@ -32,8 +32,8 @@` and `@@ -440,7 +446,7 @@`; `guides/probe.md` `@@ -211,7 +215,7 @@` `+ | \`buildRevisionPath\`` keeping “Builds the fresh sibling path…”.

3. **Old form sweep.** Patterns `createRevisionFile`, case-insensitive `createRevisionFile(s|d|ing)?` over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md`: **no hit**. (Fleet `guides/probe.md` mirrors still carry `createRevisionFile` at `:210`; excluded from this field’s path list.)

4. **Report reading.** `applied` — `` `createRevisionFile` renamed to `buildRevisionPath` across source, tests, and the guide row ``. Matches tree. Sweep table `createRevisionFile` → no match: agrees.

5. **Proof reading.** Naming row. Report sweep empty; field 3 agrees. Control files `probe-subj-2-green.txt:10` `Tests  82 passed (82)`; `probe-subj-2-guides.txt:11` `Tests  13 passed (13)`.

### probe-subj-5

1. **Site now.** Brief `Probe.ts:78-79` (`#closing` then `#destroyed = false`) is now comment + `#closing` only at `src/server/Probe.ts:78-81` (no `#destroyed`). Brief `:176-181` `destroy()` is `src/server/Probe.ts:178-182`: assigns `#closing` with no `#destroyed = true`. Same shape: `TypeStage.ts:62-65,127-131`; `LintStage.ts:62-65,98-102`; `RuntimeStage.ts:121-124,150-154`. Reads are `this.#closing !== undefined` at Probe `:142,:179,:198,:501,:523`; TypeStage `:128,:134,:137,:199,:201,:261`; LintStage `:99,:105,:118,:242`; RuntimeStage `:151,:157,:164,:658`. No `get #destroyed()`.

2. **Diff at the site.** `Probe.ts` `@@ -75,8 +75,10 @@` deletes `-	#destroyed = false`; `@@ -175,7 +177,6 @@` deletes `-		this.#destroyed = true`; read replacements `@@ -137,7 +139,7 @@`, `@@ -194,7 +195,7 @@`, `@@ -497,7 +498,7 @@`, `@@ -519,7 +520,7 @@`. Parallel hunks in `TypeStage.ts`, `LintStage.ts`, `RuntimeStage.ts`. Repair text `this.#closing !== undefined` present on every `+` read.

3. **Old form sweep.** `#destroyed` over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md`: **no hit**. Inflections `#destroyeds|#destroyeded|#destroyeding`: **no hit**.

4. **Report reading.** `applied` — `` `#destroyed` deleted from `Probe`, `TypeStage`, `LintStage`, `RuntimeStage`; every read derived ``. Matches. Decision “No `get #destroyed()` accessor” matches tree. `ProbeServer.ts:93` still `if (this.#closing !== undefined) throw createDestroyedError('probe server')`.

5. **Proof reading.** Planted-wrong: `#closing === undefined` at entry guards. `probe-subj-5-planted-red.txt:1564` `Tests  99 failed | 21 passed (120)`. Restored `probe-subj-5-restored-green.txt:41` `Tests  1 failed | 119 passed (120)` (standing arming failure). Per-file greens: TypeStage `:10` 24 passed; LintStage 30; RuntimeStage 40; Probe 26.

### probe-subj-6

1. **Site now.** Brief `guides/probe.md:619-620` is now `:621-624`:

```621:624:guides/probe.md
This claim carries no absolute string, so `verdict.digest` is the same in any workspace that runs
it. Change the control's `reason` and the digest changes with it, because the reason is part of the
control the digest covers. The tool versions and the project digest in the receipt are this
workspace's, and `tests/guides.test.ts` re-runs this claim and asserts the token this page carries.
```

Cost date still at `guides/probe.md:1003` “Each was taken on 2026-08-20,” (repair: leave that measurement).

2. **Diff at the site.** `guides/probe.md` `@@ -617,7 +621,7 @@`. Verbatim `+workspace's, and \`tests/guides.test.ts\` re-runs this claim and asserts the token this page carries.` Date dropped. Finder’s extra clause “so the line is current with the workspace at every gate run” is **absent** (refuter brevity).

3. **Old form sweep.** Phrase `taken on 2026-08-20` over named paths: `guides/probe.md:1003` (Cost). Receipt paragraph: **no hit**.

4. **Report reading.** `applied` — `The receipt paragraph drops the stale date and names the gate that re-runs the claim`. Receipt paragraph matches. Cost date remains, as the repair required.

5. **Proof reading.** Documentation row. Report: no count deleted, number-word sweep did not fire. Field 3: receipt date gone; Cost date remains. Sweep agreement on the receipt sentence: yes.

### probe-obj-1

1. **Site now.** Brief `src/bin/main.ts:8` still line 8:

```7:9:src/bin/main.ts
	if (!isProbeError(error)) throw error
	console.error(`[${error.origin}] ${error.code}: ${error.message.split(/\r\n|\n/u).join(' ')}`)
	process.exitCode = 1
```

Test `tests/src/bin/main.test.ts:241-245` reads that source.

2. **Diff at the site.** `src/bin/main.ts` `@@ -5,6 +5,6 @@`. Verbatim `+	console.error(\`[${error.origin}] ${error.code}: ${error.message.split(/\\r\\n|\\n/u).join(' ')}\`)`. Also `tests/src/bin/main.test.ts` `@@ -232,6 +232,19 @@` adds the source-reading row (Where did not name that file).

3. **Old form sweep.** `split(/\r?\n|\r/u)` over named paths: **no hit**. `tests/setupPolicy.ts:1257` has different `/\r\n|\r|\n/u` (vendored; still under `tests/`).

4. **Report reading.** `applied` — `The entry splits on \`/\r\n|\n/u\`, with the row that reads the rule`. Matches `:8` and `:241-245`. Report also says the row cannot drive the reporter; the test is source containment, not a spawned `\r` message.

5. **Proof reading.** Report records red/green anyway: `probe-obj-1-red.txt:39` `Tests  1 failed | 15 skipped (16)`; `probe-obj-1-green.txt:7` `Tests  1 passed | 15 skipped (16)`. Files exist.

### probe-obj-2

1. **Site now.** Brief `tests/setupServer.ts:48-61` (`isProcessLive`) **deleted**. That span is now `LintFixtureOptions` TSDoc (`tests/setupServer.ts:10-28`). `isProcessLive` **no hit** in tree. `tests/src/server/stages/LintStage.test.ts:6` `import { createScratch, isRunning } from '@orkestrel/test/server'`. Calls at `:911,:915,:940,:947,:964,:980,:985,:1011,:1033,:1063,:1167`. `tests/setupServer.test.ts` import list has no `isProcessLive`.

2. **Diff at the site.** `tests/setupServer.ts` `@@ -45,19 +215,38 @@` replaces `isProcessLive` TSDoc/body with `Ending` / `readChildEnding`. No `+isRunning` import in `setupServer.ts` (refuter: do not add unused import). `LintStage.test.ts` `@@ -3,14 +3,16 @@` `+import { createScratch, isRunning } from '@orkestrel/test/server'`. `setupServer.test.ts` `@@ -3,14 +3,85 @@` drops `-	isProcessLive,`; `@@ -43,18 +114,17 @@` drops the `isProcessLive` expects.

3. **Old form sweep.** `isProcessLive` and `isProcessLive(s|d|ing)` case-insensitive over named paths: **no hit**.

4. **Report reading.** `applied` — `` `isProcessLive` deleted; every site reads `isRunning` from `@orkestrel/test/server` ``. Matches. Sweep table no match: agrees.

5. **Proof reading.** `probe-obj-2-red.txt:85` `Tests  6 failed | 27 passed (33)`; `probe-obj-2-green.txt:7` `Tests  33 passed (33)`. Field 3 agrees with report sweep.

### probe-obj-3

1. **Site now.** Brief `LintStage.test.ts:55-134` `SERVER` **gone**; `tests/src/server/stages/LintStage.test.ts:36` `const FIXTURE = createLintFixture().files`. Brief `Probe.test.ts:33-70,76-107` array programs **gone**; wrappers `tests/src/server/Probe.test.ts:35` `const STALLING = createLintFixture({ budget: 300_000 })` and `:41` `const ORDERED = createLintFixture({ budget: 300_000, delay: 100 })`. Builder `tests/setupServer.ts:72` `export function createLintFixture`. Writer `:82`; parser `:87-98` `frame()`; `writeFileSync('server.pid'…)` `:78`; budget `` `${options?.budget ?? 60_000}` `` `:79`.

2. **Diff at the site.** `tests/setupServer.ts` `@@ -6,6 +7,175 @@` first `+` `+/** Selects what one built Oxlint language server fixture publishes and how long it answers. */` then `createLintFixture`. `LintStage.test.ts` `@@ -29,116 +31,9 @@` deletes `SERVER`. `Probe.test.ts` `@@ -22,89 +22,23 @@` `+import { createLintFixture } from '../../setupServer.js'`. Manifest literals replaced in later hunks (`@@ -603,10 +537,9 @@` etc.).

3. **Old form sweep.** `const SERVER = `: **no hit**. `const ORDERED = [` / `const STALLING = [`: **no hit**. Identifiers `ORDERED`/`STALLING` remain as wrappers (`Probe.test.ts:35,41`). `Content-Length: ' + Buffer.byteLength`: `tests/setupServer.ts:82` only. `JSON.parse(buffer.subarray`: `tests/setupServer.ts:96` only. Agrees with report sweep (report’s `function readHostEnding|const SERVER = |…` also hits moved `readHostEnding` at `tests/setupServer.ts:282`).

4. **Report reading.** `applied` — `One \`createLintFixture\` replaces \`SERVER\`, \`ORDERED\`, \`STALLING\`, and every manifest literal`. Program text replaced; `ORDERED`/`STALLING` names remain as builder calls.

5. **Proof reading.** Plant: `probe-obj-3-builder-planted-red.txt:130` `Tests  2 failed | 7 passed (9)`; green `:11` `Tests  9 passed (9)`. File greens: LintStage 30, Probe 26, framing variants same.

### probe-obj-4

1. **Site now.** Brief `LintStage.test.ts:213-228` local `readHostEnding` **deleted**. Export `tests/setupServer.ts:282-294` `export async function readHostEnding(signal?: NodeJS.Signals): Promise<Ending>` uses `process.kill`, `child.once('spawn')`, `stdio: 'ignore'`. Beside it: `readChildEnding` `:233`, `describeEnding` `:248`, `readSignalEnding` `:259` (signature unchanged). LintStage.test.ts imports `:12,:15` and calls `:1172-1173,:1346` wrapped in `describeEnding`. `main.test.ts:22` imports `describeEnding, readChildEnding, readSignalEnding`; `:1019,:1023` still `readSignalEnding`; `:1031` `describeEnding(ending)`; `:1040` `readChildEnding(child)`.

2. **Diff at the site.** `LintStage.test.ts` `@@ -204,29 +99,6 @@` deletes local helper. `setupServer.ts` `@@ -67,14 +256,9 @@` and following add `Ending`/`readChildEnding`/`describeEnding`/`readHostEnding`. `main.test.ts` `@@ -19,7 +19,7 @@`, `@@ -1015,7 +1028,7 @@`, `@@ -1024,11 +1037,7 @@`.

3. **Old form sweep.** Name `readHostEnding` **not removed** (moved). `function readHostEnding` in `LintStage.test.ts`: **no hit**. Hits: `tests/setupServer.ts:282`; `tests/setupServer.test.ts:13,79,82`; `tests/src/server/stages/LintStage.test.ts:15,1172,1173,1346`.

4. **Report reading.** `applied` — `` `readHostEnding` moved to `setupServer.ts` beside `readChildEnding` and `describeEnding` ``. Matches. Report says `main.test.ts:1006,:1010` unchanged as `readSignalEnding`: current calls `:1019,:1023` (lines moved).

5. **Proof reading.** `probe-obj-4-red.txt:50` `Tests  3 failed | 4 passed (7)`; `probe-obj-4-green.txt:11` `Tests  7 passed (7)`; LintStage green 30.

### probe-obj-5

1. **Site now.** Brief lines mapped: `:463` → `LintStage.test.ts:333-337` `waitForCondition('the lint fixture to admit the first document', () => scratch.read('admitted') !== undefined, …)`. `:1067` → `:938-942` `!isRunning(owned)`. `:1212` → `:1088-1092` `scratch.read('initialized') !== undefined`. `:1257` **kept** as `:1137` `await waitForDelay(250)` with comment `:1135-1136`. `:1282` → `:1165-1168` `!isRunning(owned)`. `:1412` → `:1302-1306` `scratch.read('closed') !== undefined`. Other `waitForDelay` remain at `:155,:159,:429`.

2. **Diff at the site.** `LintStage.test.ts` `@@ -460,7 +327,14 @@`, `@@ -1064,12 +933,18 @@`, `@@ -1207,9 +1082,14 @@`, `@@ -1278,12 +1158,19 @@`, `@@ -1409,7 +1296,14 @@`. First `+` of the admitted hunk is the `waitForCondition` call. No hunk replaces `:1257`.

3. **Old form sweep.** Row does not rename a symbol. Fixed sleeps named in the five replaced sites: those five are `waitForCondition`. Remaining `waitForDelay(250)` at `:1137` is the struck sixth row.

4. **Report reading.** `applied` — `Five sleeps became named conditions; the refuted sixth stands`. Matches `:333,:938,:1088,:1137,:1165,:1302`.

5. **Proof reading.** Plant `probe-obj-5-planted-red.txt:49` `Tests  3 failed | 27 passed (30)` (conditions named in FAIL bodies). Restored `:7` `Tests  30 passed (30)`. Agrees.

### probe-obj-6

1. **Site now.** Brief `setupServer.ts:98` is now `tests/setupServer.ts:314` `export function probeRefusedTargets(): boolean`. TSDoc `:296-313`. Cache `:333` `export const REFUSED_RUNTIME_TARGETS: boolean = probeRefusedTargets()`. Proof `tests/setupServer.test.ts:19-25` boolean + equality to fresh call.

2. **Diff at the site.** `tests/setupServer.ts` near `@@ -82,20 +266,52 @@` (later in that expansion) `+export function probeRefusedTargets(): boolean {`. `setupServer.test.ts` `@@ -3,14 +3,85 @@` first added case is this classifier.

3. **Old form sweep.** No rename; added `export`. `function probeRefusedTargets` without export: **no hit**.

4. **Report reading.** `applied` — `` `probeRefusedTargets` exported with TSDoc and its own proof ``. Matches `:314` and `:19-25`.

5. **Proof reading.** `probe-obj-6-red.txt:26` `Tests  1 failed | 3 passed (4)`; `probe-obj-6-green.txt:11` `Tests  4 passed (4)`.

### probe-obj-7

1. **Site now.** Brief `RuntimeStage.ts:167` `new Overlay()` is now `src/server/stages/RuntimeStage.ts:173` `const overlay = new Overlay()`. Remarks brief `:52-106` now include `:70-74` exact-match / `#misses` / origin `workspace`. Guide brief `:183-191` now `guides/probe.md:188-193` `RuntimeStage` sentence immediately after `TypeStage` sentence, before folding.

2. **Diff at the site.** `RuntimeStage.ts` `@@ -67,6 +67,11 @@` verbatim `+ * This stage mints its overlay with the default exact-match sensitivity…` and `#misses` / `workspace`. `guides/probe.md` `@@ -186,9 +186,13 @@` adds the `RuntimeStage` sentence. No change to `new Overlay()` at the mint site.

3. **Old form sweep.** No rename. `sensitiv|case-fold` still in `guides/probe.md:137,177,183-193,261`.

4. **Report reading.** `applied` — `` `RuntimeStage` `@remarks` and the guide state the exact-match overlay and its miss report ``. Matches. Report cites `RuntimeStage.test.ts:893`; current `:893-894` `reports when workspace configuration serves a covered module before the overlay` — **carries what the report says**.

5. **Proof reading.** Documentation row. Report: existing test at `:893` drives the quoted workspace issue. Field 3: no old-name removal.

### fleet-F1

1. **Site now.** `tests/setup.ts:1-3` `export const WORKSPACE_ROOT = resolveRoot(import.meta)`. `tests/setup.test.ts:4-7` proves that export. No `src/browser`, `app/browser`, `tests/setupBrowser.ts` (glob 0). `isBrowserVuePath`: **no hit** in the tree.

2. **Diff at the site.** Status/diff: **no** `tests/setup.ts` / `tests/setup.test.ts` hunk.

3. **Old form sweep.** `isBrowserVuePath` over named paths: **no hit**.

4. **Report reading.** `noop` — `` `tests/setup.ts` declares no `isBrowserVuePath`, and this workspace has no browser environment ``. Evidence: `grep -c` 0; `WORKSPACE_ROOT` sole export; `ls -d` absent. Tree matches. Report “one export” is `WORKSPACE_ROOT`.

5. **Proof reading.** Placement. Field 3 agrees (0 hits). No proof file required.

### fleet-F2

1. **Site now.** Report class lines: `ProbeError` `src/core/errors.ts:28`; `Overlay` `src/server/Overlay.ts:32`; `Probe` `src/server/Probe.ts:63`; `ProbeServer` `src/server/ProbeServer.ts:51`; `LintStage` `:54`; `RuntimeStage` `:112`; `TypeStage` `:52` — each is `export class …`. `readonly id:` in `src/**` only `src/core/types.ts:342` (`Verdict`). `get id(` in `src/**`: **no hit**. No public `readonly id: string` field on an implementation class.

2. **Diff at the site.** No class-order hunks for `id`.

3. **Old form sweep.** N/A (noop). `readonly id` field shape: no implementation hit.

4. **Report reading.** `noop` — `No implementation class declares a public \`readonly id\` field`. Cited lines still name those `export class` declarations. `types.ts:342` still `Verdict.id`.

5. **Proof reading.** Field 3: no old name to remove. Agrees.

---

### Scope

Status (`/home/user/work/evidence/conform-probe.status`), each vs brief § Scope:

| Path | Tag |
|---|---|
| `guides/probe.md` | owned |
| `src/bin/main.ts` | owned |
| `src/server/Probe.ts` | owned |
| `src/server/helpers.ts` | owned |
| `src/server/stages/LintStage.ts` | owned |
| `src/server/stages/RuntimeStage.ts` | owned |
| `src/server/stages/TypeStage.ts` | owned |
| `tests/setupServer.test.ts` | owned |
| `tests/setupServer.ts` | owned |
| `tests/src/bin/main.test.ts` | owned |
| `tests/src/server/Probe.test.ts` | owned |
| `tests/src/server/helpers.test.ts` | owned |
| `tests/src/server/stages/LintStage.test.ts` | owned |
| `tests/src/server/stages/RuntimeStage.test.ts` | owned |

No status path is shared or off-limits. `package-lock.json`, `node_modules`, vendored tests, `.claude/**`: not in status.

Hunks whose **file** no row **Where** names (file `@@` first `+` line):

- `src/server/stages/LintStage.ts` `@@ -59,13 +59,15 @@` `+	// The teardown latch and the destroyed reading are one field: \`destroy\` assigns it before the`
- `src/server/stages/LintStage.ts` `@@ -95,13 +97,12 @@` `+		if (this.#closing !== undefined) throw createDestroyedError('lint stage')`
- `src/server/stages/LintStage.ts` `@@ -114,7 +115,7 @@` `+		if (this.#closing !== undefined) throw createDestroyedError('lint stage')`
- `src/server/stages/LintStage.ts` `@@ -238,7 +239,7 @@` `+		if (this.#closing !== undefined) return createDestroyedError('lint stage')`
- `src/server/stages/TypeStage.ts` `@@ -59,9 +59,11 @@` `+	// The teardown latch and the destroyed reading are one field: \`destroy\` assigns it before the`
- `src/server/stages/TypeStage.ts` `@@ -124,16 +126,15 @@` `+		if (this.#closing !== undefined) throw createDestroyedError('type stage')`
- `src/server/stages/TypeStage.ts` `@@ -195,9 +196,9 @@` `+		if (this.#closing !== undefined) throw createDestroyedError('type stage')`
- `src/server/stages/TypeStage.ts` `@@ -257,7 +258,7 @@` `+		if (this.#destroyed)` replaced by `+		if (this.#closing !== undefined) throw createDestroyedError('type stage')`
- `tests/setupServer.test.ts` `@@ -3,14 +3,85 @@` `+	REFUSED_RUNTIME_TARGETS,`
- `tests/setupServer.test.ts` `@@ -43,18 +114,17 @@` `+			// The child's own exit event is what proves the kill landed on the announced process: it`
- `tests/src/bin/main.test.ts` `@@ -19,7 +19,7 @@` `+import { describeEnding, readChildEnding, readSignalEnding } from '../../setupServer.js'`
- `tests/src/bin/main.test.ts` `@@ -232,6 +232,19 @@` `+	// The reporter flattens a multi-line refusal onto one stderr line, so what it treats as a line`
- `tests/src/bin/main.test.ts` `@@ -1015,7 +1028,7 @@` `+\t\t\t\t\t\`this host ends a child holding its own ${delivery.signal} handler as ${describeEnding(ending)}, so child.kill runs no handler here and the entry's graceful teardown cannot be reached\`,`
- `tests/src/bin/main.test.ts` `@@ -1024,11 +1037,7 @@` `+				const exited = readChildEnding(child)`
- `tests/src/server/helpers.test.ts` `@@ -7,9 +7,9 @@` `+	buildRevisionPath,`
- `tests/src/server/helpers.test.ts` `@@ -111,7 +111,7 @@` `+				buildRevisionPath(ROOT, 'tmp/probe/greeting.test.ts', '4821-9f0c'),`
- `tests/src/server/helpers.test.ts` `@@ -210,7 +210,7 @@` `+		const generated = buildRevisionPath(ROOT, 'tmp/probe/greeting.test.ts', \`${process.pid}-1f0c\`)`
- `tests/src/server/helpers.test.ts` `@@ -341,11 +341,11 @@` `+	it('builds sibling revision paths with and without extensions', () => {`
- `tests/src/server/stages/RuntimeStage.test.ts` `@@ -27,7 +27,7 @@` `+import { RuntimeStage, buildRevisionPath, normalizePath } from '@src/server'`
- `tests/src/server/stages/RuntimeStage.test.ts` `@@ -62,7 +62,7 @@` `+		const file = buildRevisionPath(`
- same file `@@ -1587,7 +1587,7 @@` `+		const orphan = buildRevisionPath(scratch.path, 'tmp/probe/orphan.test.ts', orphanRevision)`
- `@@ -1597,7 +1597,7 @@` `+		const live = buildRevisionPath(`
- `@@ -1607,7 +1607,7 @@` `+		const authored = buildRevisionPath(`
- `@@ -1615,7 +1615,7 @@` `+		const drafted = buildRevisionPath(`
- `@@ -1624,7 +1624,7 @@` `+		const arming = buildRevisionPath(`
- `@@ -1632,7 +1632,7 @@` `+		const boot = buildRevisionPath(`
- `@@ -1642,7 +1642,7 @@` `+		const adjacent = buildRevisionPath(`
- `@@ -1651,7 +1651,7 @@` `+		const serving = buildRevisionPath(`

(`LintStage.ts`/`TypeStage.ts` are in subj-5 **Repair**, not Where. `helpers.test.ts`/`RuntimeStage.test.ts` are in subj-2 Repair. `setupServer.test.ts`/`main.test.ts` are in obj-2/3/4/6 Repair.)

### Residue

**Diff `+` lines** pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`:

- `conform-probe.diff:62` `+	console.error(\`[${error.origin}] ${error.code}: ${error.message.split(/\\r\\n|\\n/u).join(' ')}\`)`
- `:540` `+	 * child rather than any exchange. Size it above the timeout of every row that drives it.`
- `:952` `+// longest row's timeout, so a row reads the ending it drove rather than the server leaving on its`

No `+` `.skip(` / `.only(` / `.todo(` / `TODO` / `FIXME` / `debugger` / `retry`.

**Tree `src` + `tests`**, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

`.only(`: no hit in `src` or `tests`.
`.todo(` / `.skip(`: `tests/src/server/Probe.test.ts:104` (fixture string `test.skip`/`test.todo`/`describe.skip`); `:1454` `context.skip(`; `LintStage.test.ts:392,:1280` `context.skip(`; `main.test.ts:1029` `context.skip(`; `RuntimeStage.test.ts:318` (same skip/todo fixture string); `:366,:419` `context.skip()` in fixture text; `:1209` `context.skip(`.
`retry`: `src/server/Probe.ts:238,:241`; `src/core/errors.ts:95`; `src/core/types.ts:371`; `tests/src/server/Probe.test.ts:1258,:1329`.
`TODO`/`FIXME` in `src`: no hit.
`console.`: `src/bin/main.ts:8`; `src/server/helpers.ts:396,:431`; `src/server/types.ts:143`; `src/core/types.ts:378,:442`; `src/server/Overlay.ts:28`; `tests/src/server/Probe.test.ts:1846`; `tests/src/server/stages/LintStage.test.ts:85,:86`. (`tests/config.test.ts:687` excluded.)
`debugger`: `LintStage.test.ts:209,211-213,227,237,259,269,296,304,593,603,662,667,678,686,710,720,728,752,762,770,787,794-795,801,811,846`.
`timeout`: `src/server/Probe.ts:14,21,479-481,487,489,493,502-503,511,521,581,587`; `src/server/stages/LintStage.ts:50,152`; `src/server/types.ts:38,232,237`; `src/core/types.ts:403`; `tests/setupServer.ts:14`; `tests/src/server/Probe.test.ts:31,90,203,318,358,392,449,588,627,707,769,879,965,983-984,1062,1142,1197,1259,1346,1383,1434,1467,1474,1524,1626,1694,1760,1803,1842,1871`; `LintStage.test.ts:221,256,287,316,355,384,445,471,503,519,546,569,584,616,657,700,742,784,841,858,891,923,972,994,1042,1072,1111,1149,1194,1237,1269,1340`; `main.test.ts:281,501,590,652,724,803,816,851,867,873,909,1014`; `RuntimeStage.test.ts:96,132,177,225,271,311,333,359,411,477,509,540,581,614,656,681,724,750,791,821,862,895,933,965,1006,1029,1063,1143,1162,1199,1291,1386,1431,1472,1489,1526`; `TypeStage.test.ts:28,85,123,153,186,212,263,297,320,344,383,453,512,554,611,719,758`; `ProbeServer.test.ts:107,124,152,196,214,223,239,283,329`; `tests/guides.test.ts:380`.

### Parity

Diff does not touch `src/**/types.ts`. Class files touched: `Probe.ts`, `LintStage.ts`, `RuntimeStage.ts`, `TypeStage.ts`.

| Entity | `types.ts` call-signatures | Guide `## Methods` |
|---|---|---|
| Probe / `ProbeInterface` | `prove` `src/core/types.ts:471`; `destroy` `:477` | `guides/probe.md:236-237` `prove`, `destroy` |
| RuntimeStage / `StageInterface` | `inspect` `src/server/types.ts:168`; `destroy` `:182` | `guides/probe.md:243-244` `inspect`, `destroy` |
| TypeStage / `TypeStageInterface` | `inspect` `:209`; `resolve` `:218` (plus inherited `destroy`) | `guides/probe.md:250-251` `inspect`, `resolve` (no `destroy` row) |
| LintStage / `LintStageInterface` | `inspect` `:250` (plus inherited `destroy`) | `guides/probe.md:257-258` `inspect`, `destroy` |

Readonly data:

| Interface | Data | Guide Surface / Entities |
|---|---|---|
| `ProbeInterface` | `emitter` `src/core/types.ts:448`; `toolchain` `:450` | Surface `guides/probe.md:48` “readonly `emitter` and `toolchain`”; Entities `Probe` `:166` |
| `StageInterface` (RuntimeStage, and inherited by Type/Lint) | `stage` `src/server/types.ts:149`; `progress` `:160` | Surface `:139`; Entities `RuntimeStage` `:170`, `TypeStage` `:168`, `LintStage` `:169` |

Backticked identifiers in **added** guide sentences (`guides/probe.md` `+` lines) vs barrels `src/core/index.ts` (`export *` types/constants/errors/validators/helpers/shapers) and `src/server/index.ts` (`export *` types/helpers/Overlay/Probe/ProbeServer/LintStage/RuntimeStage/TypeStage):

| Identifier | Barrel export? |
|---|---|
| `RuntimeStage` | yes, `src/server/index.ts:7` via `./stages/RuntimeStage.js` |
| `workspace` (origin / issue tag) | not a value export; `Party` is exported via core types |
| `The workspace configuration served this module before the runtime overlay` | message string, not an export |
| `paths` / `covers` | `OverlayInterface` members; `Overlay` exported `src/server/index.ts:3` |
| `tests/guides.test.ts` | path, not an export |
| `destroy()` / `prove` | methods on exported `Probe` / `ProbeServer` |
| `ProbeOptions.on` | `ProbeOptions` via `src/server/index.ts:1` `./types.js` |
| `probe.emitter` / `probe.emitter.destroyed` | `emitter` on `ProbeInterface`; `destroyed` is `@orkestrel/emitter`, not this barrel |
| `ProbeServer.destroy` | `ProbeServer` exported `src/server/index.ts:5` |
| `buildRevisionPath` | `export * from './helpers.js'` `src/server/index.ts:2` (name not listed in the barrel file) |
| `TypeStage` | yes, `src/server/index.ts:8` |

`tests/guides.test.ts`: no `createRevisionFile` / `buildRevisionPath` string.

### Gates

Report § Gates quoted:

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format, 68 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root project and the three scoped projects |
| `npm run build` | 0 | `dist/bin/main.js` 0.41 kB, and the core and server bundles |
| `npm test` | 1 | 8 failed, 221 passed, 229 total; see the observation |

Captures: `gate-format-check.txt:7-8` “All matched files use the correct format.” / “68 files”. `gate-lint-check.txt` header only, no diagnostics. `gate-check.txt` runs root + `check:src:core|server|bin`. `gate-build.txt:92` `dist/bin/main.js  0.41 kB`. `gate-test.txt:577` `Tests  8 failed | 221 passed (229)`.

### Breaking

Report § Breaking: `` `buildRevisionPath` replaces the published `createRevisionFile` on `@orkestrel/probe/server`. `` No consumer edit. Version bump earned.

Word-boundary `createRevisionFile` over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/probe`, and vendored `guides/probe.md` mirrors: **no hit** in those `src`/`tests` trees. (Mirrors still show `createRevisionFile` at each package’s `guides/probe.md:210`; excluded.) `scaffold/src`: no hit.

### Writing sweep

Over diff `+` lines in `guides/**`, `README.md` (none in diff), `src/**` doc comments, `tests/**` titles and comments.

Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`: **no hit** in those prose `+` lines. Code `+` lines (out of prose scope): `conform-probe.diff:738` `+	return new Promise<Ending>((settle) => {`; `:809` `+		await new Promise<void>((ready) => {`; `:813` `+		if (id === undefined) throw new Error('The probe child never reported a process id')`.

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: **no hit**.

Nearby prose `+` lines that do **not** match the count pattern (second word not in the set): `+	// The teardown latch… are one field` (`Probe.ts`/`LintStage.ts`/`RuntimeStage.ts`/`TypeStage.ts`); `+		// …it is one call taken at load` (`setupServer.test.ts`); `+		// One writer and one parser… in one place` (`setupServer.test.ts`); `+	// …onto one stderr line` / `+	// …two joined fragments` (`main.test.ts`); `+ * admits two inspections at once` (`setupServer.ts` TSDoc); `+// …admits two inspections at once` (`Probe.test.ts`).

## Distillate

- `probe-subj-1`: site now `Probe.ts:603-623` + `probe.md:933-937` + `Probe.test.ts:1381-1425` | diff present yes | old form hits 0 | report matches yes (stale `:1460` in decisions; hook now `:1391`)
- `probe-subj-2`: site now `helpers.ts:614` `buildRevisionPath` | diff present yes (verbatim TSDoc/`@returns`/export) | old form hits 0 in named paths | report matches yes
- `probe-subj-5`: site now `#destroyed` absent; reads `#closing !== undefined` | diff present yes | old form hits 0 | report matches yes
- `probe-subj-6`: site now `probe.md:623-624` (date dropped) | diff present yes (refuter text, not finder’s extra clause) | old form hits 1 (`probe.md:1003` Cost, as repair left) | report matches yes
- `probe-obj-1`: site now `main.ts:8` `/\r\n|\n/u` | diff present yes verbatim | old form hits 0 | report matches yes
- `probe-obj-2`: site now `isProcessLive` gone; `LintStage.test.ts:6` `isRunning` | diff present yes | old form hits 0 | report matches yes
- `probe-obj-3`: site now `createLintFixture` `setupServer.ts:72`; `SERVER` gone; `ORDERED`/`STALLING` wrappers `:35,:41` | diff present yes | old form hits 0 for array programs / 2 wrapper names | report matches yes on replacement of program text
- `probe-obj-4`: site now `setupServer.ts:282` `readHostEnding`; local factory gone | diff present yes | old form hits 0 in `LintStage.test.ts` body | report matches yes
- `probe-obj-5`: five `waitForCondition`; sixth `waitForDelay(250)` at `:1137` | diff present yes | old form hits 1 kept sleep | report matches yes
- `probe-obj-6`: `export function probeRefusedTargets` `:314` | diff present yes | old form hits 0 | report matches yes
- `probe-obj-7`: remarks `:70-74`; guide `:188-193`; mint `new Overlay()` `:173` | diff present yes (prose only) | old form hits 0 | report matches yes (`RuntimeStage.test.ts:893` still that case)
- `fleet-F1`: noop; no `isBrowserVuePath`; `setup.ts` exports `WORKSPACE_ROOT` | diff present no | old form hits 0 | report matches yes
- `fleet-F2`: noop; no class `readonly id` field | diff present no | old form hits 0 | report matches yes

Scope tags: 14 status paths all **owned**; 0 shared; 0 off-limits. Un-Whered files with hunks: `LintStage.ts`, `TypeStage.ts`, `setupServer.test.ts`, `main.test.ts`, `helpers.test.ts`, `RuntimeStage.test.ts` (listed above).

Residue: diff `+` hits 3 (`console.error` main.ts, two `timeout` comments). Tree: no `.only`; skip/todo as listed; many vitest `{ timeout: }` / `debugger` fixture strings / `console.` in TSDoc and one live `console.error`.

Writing: banned-word **no hit** in scoped prose `+` lines; count-pattern **no hit**.

Parity: `ProbeInterface` `prove`/`destroy` ↔ guide `:236-237`; `StageInterface` `inspect`/`destroy` ↔ `:243-244`; `TypeStageInterface` `inspect`/`resolve` ↔ `:250-251` (inherited `destroy` not in that table); `LintStageInterface` `inspect`/`destroy` ↔ `:257-258`. Data: `emitter`/`toolchain` ↔ `:48,:166`; `stage`/`progress` ↔ `:139,:168-170`. `buildRevisionPath` re-exported via `src/server/index.ts:2`. Added guide backticks as tabled; `probe.emitter.destroyed` is emitter package, not this barrel.

## Unknowns

- Gate **exit codes** are quoted from the report; capture files do not print `exit N`. Content is consistent with those exits (`format:check` clean, lint silent, `tsc` ran, `dist/bin/main.js 0.41 kB`, test `8 failed | 221 passed`).
- This lane did not re-run gates or `git status`/`git diff`; tree readings are the working tree and the supplied evidence files.
- `tests/guides.test.ts` does not mention `buildRevisionPath`; whether parity fences assert that helper by substring was not a named report claim.
- Consumer sweep did not walk `app/` trees beyond `src`/`tests` globs the brief named for Breaking (`/home/user/fleet/*/src`, `*/tests`, `scaffold/src`).
- Inflection sweep used literal `-s`/`-ed`/`-ing` suffixes on the old tokens; irregular English was not additionally generated.

## Journal

leave this line for the driver.

## Deviation

No file created, edited, or deleted by this lane. Sweeps used Read/Grep/Glob only. Every named input path opened. No evidence file unreadable. `node_modules` excluded from tree sweeps as instructed. Working-tree status at session start listed the same 14 paths as `conform-probe.status`.