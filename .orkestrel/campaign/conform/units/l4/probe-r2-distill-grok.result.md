I'll read the brief and the repository contracts first, then follow the brief exactly in read-only mode.Next I’ll load the unit brief, audit brief, report, and evidence files so the row map is complete.I’ll map each row’s current sites, the diff hunks, and the proof files next.I’ll keep pulling remaining sites, the rest of the diff, and the old-name sweeps.I’ll sweep old names, residue, and the remaining current sites in one pass.Checking a few remaining cite targets, then I’ll write only the brief’s named sections.# Question

For every row of unit conform-probe, what does the tree at `/home/user/fleet/probe` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

# Evidence

Cited law (sentence only): patterns.md:79 `Call \`this.#emitter.destroy()\` last in the entity's \`destroy()\`.` names.md:8 `Names are public API. A consumer can predict them without documentation.` names.md:96 `` `build*` assembles a composite value from parts and is neither a factory nor a combinator named for its constituents `` AGENTS.md Design laws `Derive state. Compute facts from existing fields. Do not store a second flag or label that can drift.` typescript.md:39 `Compute derived facts instead of persisting duplicate state.` documentation.md:39 `Re-read the prose last, against what actually shipped.` writing.md:38 `Claim only what the reader can check.` portability.md:35 `Split arrived text on \`/\r\n|\n/\`. Never split on \`\n\` alone, and never split on a bare \`\r\`.` tests.md:174 `Import them from \`@orkestrel/test\`, and its Node-only helpers from \`@orkestrel/test/server\`. Write a helper of your own only where the package exports none for the job.` tests.md:180 `Extract a fixture, recorder, event factory, async wait, renderer, scenario/data builder, protocol fixture, or DOM builder as soon as it could serve another test.` tests.md:181 `Any duplicate or near-duplicate helper is a defect; consolidate it into one general form.` tests.md:182 `Export every reusable helper, fixture type, factory, constant, and guard from setup files.` tests.md:185 `Test files import shared infrastructure rather than declaring local fixture factories.` tests.md:218–223 delay rule as quoted on the row. typescript.md:80 `State a prerequisite and the failure behavior wherever the symbol has either.` architecture.md:183–185 `#` private fields first; public interface getters then methods.

## Per row

### probe-subj-1

1. **Site now.** Brief `Probe.ts:602-615`. Current `#destroy` is `src/server/Probe.ts:603-624`. Context: `602` blank; `603` `async #destroy(): Promise<void> {`; `604-616` try wrapping arming and the three `#destroyStage` awaits; `617-623` `finally { … this.#emitter.destroy() }`; `624` `}`. Guide Teardown brief `:929` is now `guides/probe.md:932-936` (`destroy()` releases the emitter last…). Test assertion is `tests/src/server/Probe.test.ts:1381-1425` (`releases the listeners`; `expect(failures.count).toBe(released)`; `expect(probe.emitter.destroyed).toBe(true)`).
2. **Diff at the site.** `src/server/Probe.ts` `@@ -601,17 +602,25 @@`. Operative repair present. Verbatim `+			this.#emitter.destroy()`. Guide `@@ -926,7 +929,11 @@` adds the Teardown emitter sentences. Probe.test `@@ -1452,7 +1379,7 @@` retitles the row; `@@ -1464,6 +1391,9 @@` and `@@ -1489,7 +1419,10 @@` add `released` and `probe.emitter.destroyed`.
3. **Old form sweep.** Row adds a call; no name/path removed. Patterns `this.#emitter.destroy` / `#emitter.destroy`: hit `src/server/Probe.ts:622`. Paths: `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md`.
4. **Report reading.** Table: `applied` — `Probe.#destroy() releases the emitter in a finally, plus the guide's Teardown entry and a proof`. Decisions cite `Probe.test.ts:1460` for `on: { error }`. That line is now a later-test comment; the hook is `tests/src/server/Probe.test.ts:1391` `on: { error: failures.handler }`. `#destroy` `finally` and Teardown match the table sentence.
5. **Proof reading.** Behavioural. Report: `npx vitest run … --project src:server -t 'destroys idempotently and releases the listeners'` red 1 failed (`probe-subj-1-red.txt`) green 1 passed (`probe-subj-1-green.txt`). Files exist. `probe-subj-1-red.txt`: `Tests  1 failed | 178 skipped (179)`. `probe-subj-1-green.txt`: `Tests  1 passed | 178 skipped (179)`.

### probe-subj-2

1. **Site now.** Brief `helpers.ts:596-618`. Current TSDoc+export `src/server/helpers.ts:596-618`: first sentence `Builds the fresh sibling path a revision's file is written at, preserving the test's resolution directory.`; `@returns The absolute sibling path`; example calls `buildRevisionPath`; `export function buildRevisionPath(workspace: string, path: string, revision: string): string`. Call sites: `src/server/Probe.ts:33` import, `277-278`; `src/server/stages/RuntimeStage.ts:36` import, `449`. Guide row `guides/probe.md:218` `` `buildRevisionPath` `` … `Builds the fresh sibling path one runtime inspection writes its specification to.` Tests: `tests/src/server/helpers.test.ts:10,114,213,344-348`; `tests/src/server/stages/RuntimeStage.test.ts:30,65,1590` (and the remaining call sites the repair named).
2. **Diff at the site.** `src/server/helpers.ts` `@@ -594,23 +594,24 @@`. Verbatim `+ * Builds the fresh sibling path a revision's file is written at, preserving the test's resolution` / `+ * @returns The absolute sibling path` / `+export function buildRevisionPath(workspace: string, path: string, revision: string): string {`. Probe `@@ -29,8 +29,8 @@` and `@@ -273,8 +274,8 @@`; RuntimeStage `@@ -32,8 +32,8 @@` and `@@ -440,7 +446,7 @@`; guide `@@ -211,7 +215,7 @@` `` `buildRevision## Question

For every row of unit conform-probe, what does the tree at `/home/user/fleet/probe` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

Cited law (one sentence per row):

- probe-subj-1 — `patterns.md:79`: `Call \`this.#emitter.destroy()\` last in the entity's \`destroy()\`.`
- probe-subj-2 — `names.md:8`: `Names are public API. A consumer can predict them without documentation.`; `names.md:96`: `\`build*\` assembles a composite value from parts and is neither a factory nor a combinator named for its constituents`
- probe-subj-5 — `AGENTS.md` Design laws: `Derive state. Compute facts from existing fields. Do not store a second flag or label that can drift.`; `typescript.md:39`: `Compute derived facts instead of persisting duplicate state.`
- probe-subj-6 — `documentation.md:39`: `Re-read the prose last, against what actually shipped.`; `writing.md:38`: `Claim only what the reader can check.`
- probe-obj-1 — `portability.md:35`: `Split arrived text on \`/\r\n|\n/\`. Never split on \`\n\` alone, and never split on a bare \`\r\`.`
- probe-obj-2 — `tests.md:174`: `Import them from \`@orkestrel/test\`, and its Node-only helpers from \`@orkestrel/test/server\`. Write a helper of your own only where the package exports none for the job.`
- probe-obj-3 / probe-obj-4 — `tests.md:180-181`: `Extract a fixture… as soon as it could serve another test.` / `Any duplicate or near-duplicate helper is a defect; consolidate it into one general form.`; `tests.md:185`: `Test files import shared infrastructure rather than declaring local fixture factories.`
- probe-obj-5 — `tests.md:218-223`: `Use it to yield, never to wait for something another process produces.` … `Wait until a named condition holds instead…`
- probe-obj-6 — `tests.md:182`: `Export every reusable helper, fixture type, factory, constant, and guard from setup files.`
- probe-obj-7 — `typescript.md:80`: `State a prerequisite and the failure behavior wherever the symbol has either.`
- fleet-F2 — `architecture.md:183-185`: `#` private fields first; public interface getters then methods.

### probe-subj-1

1. **Site now.** Brief `Probe.ts:602-615` is now `603-623`. `#destroy()` wraps the prior body in `try`/`finally` and calls `this.#emitter.destroy()` unguarded.

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
			// …
			this.#emitter.destroy()
		}
	}
```

Guide Teardown brief `:929` is now `932-936`: `destroy()` releases the emitter last; `probe.emitter.destroyed` reads true. Proof at `tests/src/server/Probe.test.ts:1381-1425` (`destroys idempotently and releases the listeners its host registered`; `expect(failures.count).toBe(released)`; `expect(probe.emitter.destroyed).toBe(true)`).

2. **Diff at the site.** `src/server/Probe.ts` `@@ -601,17 +602,25 @@`. Operative text present verbatim: `+			this.#emitter.destroy()`. Guide `@@ -926,7 +929,11 @@`. Test title `@@ -1452,7 +1379,7 @@` `+		'destroys idempotently and releases the listeners its host registered'`.

3. **Old form sweep.** Row adds a call; removes no name. Paths `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md`: no renamed token. Pattern n/a; hits 0.

4. **Report reading.** Table: `applied` — ``Probe.#destroy()` releases the emitter in a `finally`, plus the guide's Teardown entry and a proof``. Tree carries that. Decisions cite `Probe.test.ts:1460` for `on: { error }` — that hook is now `1391` (`on: { error: failures.handler }`). `:1460` does not carry that hook.

5. **Proof reading.** Behavioural. Report: `npx vitest run … --project src:server -t 'destroys idempotently and releases the listeners'` — red 1 failed (`probe-subj-1-red.txt`) / green 1 passed (`probe-subj-1-green.txt`). Files exist. Quoted Tests lines: red `Tests  1 failed | 178 skipped (179)`; green `Tests  1 passed | 178 skipped (179)`.

### probe-subj-2

1. **Site now.** Brief `helpers.ts:596-618` is now `596-619`. Export is `buildRevisionPath`.

```596:618:src/server/helpers.ts
/**
 * Builds the fresh sibling path a revision's file is written at, preserving the test's resolution
 * directory.
 * …
 * @returns The absolute sibling path
 * …
 * 	buildRevisionPath('/srv/checkout', 'tmp/probe/greeting.test.ts', '4821-9f0c'),
 */
export function buildRevisionPath(workspace: string, path: string, revision: string): string {
```

Call sites now: `Probe.ts:33` import, `277-278` `buildRevisionPath(...)`; `RuntimeStage.ts:36` import, `449` `buildRevisionPath(...)`. Guide row `guides/probe.md:218` `` `buildRevisionPath` ``, wording still `Builds the fresh sibling path one runtime inspection writes its specification to.` Tests: `helpers.test.ts:10,114,213,344-348`; `RuntimeStage.test.ts:30` import and call sites including `62+`.

2. **Diff at the site.** `helpers.ts` `@@ -594,23 +594,24 @@`. Verbatim `+ * Builds the fresh sibling path a revision's file is written at, preserving the test's resolution`; `+ * @returns The absolute sibling path`; `+export function buildRevisionPath(...)`. Also `Probe.ts` `@@ -29,8 +29,8 @@` `+	buildRevisionPath,`; `@@ -273,8 +274,8 @@`; `RuntimeStage.ts` `@@ -32,8 +32,8 @@` and `@@ -440,7 +446,7 @@`; guide `@@ -211,7 +215,7 @@` `+| \`buildRevisionPath\``.

3. **Old form sweep.** Patterns `createRevisionFile` (word-boundary) and `\bcreateRevisionFile(s|d|ing)?\b` (case-insensitive) over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md`: no hit. (Fleet `guides/probe.md` mirrors still carry `createRevisionFile`; those paths are outside this sweep.)

4. **Report reading.** Table: `applied` — ``createRevisionFile` renamed to `buildRevisionPath` across source, tests, and the guide row``. Tree and diff carry that. Sweep table: `createRevisionFile` over `TREE` no match; inflection row over `PROSE` no match — agrees with field 3 on the named prose/src/tests set.

5. **Proof reading.** Naming row. Report sweep as above; field 3 agrees (0 hits on the required paths). Named captures exist: `probe-subj-2-green.txt` `Tests  82 passed (82)`; `probe-subj-2-guides.txt` `Tests  13 passed (13)`.

### probe-subj-5

1. **Site now.** Brief `Probe.ts:78-79` (`#destroyed = false`) gone. Current `78-81` is a comment plus `#closing` only. Brief `176-181` (`this.#destroyed = true`) gone. Current `destroy()`:

```178:182:src/server/Probe.ts
	destroy(): Promise<void> {
		if (this.#closing !== undefined) return this.#closing
		this.#closing = this.#destroy()
		return this.#closing
	}
```

Reads now `this.#closing !== undefined` at `Probe.ts:142,198,501,523`. Same deletion in `TypeStage.ts` (class `:52`; `#closing` `:65`; `destroy` `:127-131`; reads `:134,:137,:199,:201,:261`), `LintStage.ts` (class `:54`; `#closing` `:65`; `destroy` `:98-102`; reads `:105,:118,:242`), `RuntimeStage.ts` (class `:112`; `#closing` `:124`; `destroy` `:150-154`; reads `:157,:164,:658`). No `get #destroyed()` accessor in any of the four.

2. **Diff at the site.** `Probe.ts` `@@ -75,8 +75,10 @@` deletes `#destroyed = false`; `@@ -175,7 +177,6 @@` deletes `this.#destroyed = true`; four read hunks replace with `#closing !== undefined`. Parallel hunks in `TypeStage.ts`, `LintStage.ts`, `RuntimeStage.ts`. Operative repair (delete field, derive from `#closing`) is in the `-`/`+` lines. No `get #destroyed()` added.

3. **Old form sweep.** `#destroyed` over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md`: no hit. Inflections `#destroyeds|#destroyeded|#destroyeding|#Destroyed`: no hit.

4. **Report reading.** Table: `applied` — ``#destroyed` deleted from `Probe`, `TypeStage`, `LintStage`, `RuntimeStage`; every read derived``. Tree matches. Decisions: no `get #destroyed()` — tree matches. Sweep: `#destroyed` over `src` no match — agrees.

5. **Proof reading.** Behavioural (planted). Report: plant `#closing === undefined` at entry guard of all four — red `99 failed, 21 passed` (`probe-subj-5-planted-red.txt`); restored `119 passed, 1 standing failure` (`probe-subj-5-restored-green.txt`). Files exist. Quoted: red `Tests  99 failed | 21 passed (120)`; restored `Tests  1 failed | 119 passed (120)`. Per-file greens named in the report exist (`probe-subj-5-typestage-green.txt` `Tests  24 passed (24)`, lint `30`, runtime `40`, probe `26`).

### probe-subj-6

1. **Site now.** Brief `guides/probe.md:619-620` is now `620-623`.

```620:623:guides/probe.md
This claim carries no absolute string, so `verdict.digest` is the same in any workspace that runs
it. Change the control's `reason` and the digest changes with it, because the reason is part of the
control the digest covers. The tool versions and the project digest in the receipt are this
workspace's, and `tests/guides.test.ts` re-runs this claim and asserts the token this page carries.
```

Cost block at `:1002` still `Each was taken on 2026-08-20,` — the sentence the repair leaves.

2. **Diff at the site.** `guides/probe.md` `@@ -617,7 +620,7 @@`. Verbatim `+workspace's, and \`tests/guides.test.ts\` re-runs this claim and asserts the token this page carries.` Finder's extra clause `so the line is current with the workspace at every gate run` is absent from `+` lines.

3. **Old form sweep.** `taken on 2026-08-20` over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md`: one hit, `guides/probe.md:1002`. Inflections n/a (dated phrase).

4. **Report reading.** Table: `applied` — `The receipt paragraph drops the stale date and names the gate that re-runs the claim`. Tree matches. Sweep table: one hit `guides/probe.md:1002` Cost measurement — agrees with field 3; that line still carries `taken on 2026-08-20`.

5. **Proof reading.** Documentation row. Report sweep agrees with field 3.

### probe-obj-1

1. **Site now.** Brief `main.ts:8` still line 8.

```7:9:src/bin/main.ts
	if (!isProbeError(error)) throw error
	console.error(`[${error.origin}] ${error.code}: ${error.message.split(/\r\n|\n/u).join(' ')}`)
	process.exitCode = 1
```

Test `tests/src/bin/main.test.ts:241-245` reads that source for `split(/\\r\\n|\\n/u)` and absence of `\\r?` and `|\\r/`.

2. **Diff at the site.** `src/bin/main.ts` `@@ -5,6 +5,6 @@`. Verbatim `+.split(/\r\n|\n/u)`. Test hunk `@@ -232,6 +232,19 @@`.

3. **Old form sweep.** `/\r?\n|\r/` and `split(/\r?\n|\r/u)` over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md`: no hit. (`tests/setupPolicy.ts:1257` has `split(/\r\n|\r|\n/u)`, a different pattern, vendored.)

4. **Report reading.** Table: `applied` — `The entry splits on \`/\r\n|\n/u\`, with the row that reads the rule``. `main.ts:8` carries that. Report also: `probe-obj-1 has no behavioural proof available` while the proofs table lists a red/green pair for the source-reading test.

5. **Proof reading.** Report command `npx vitest run … --project src:bin -t 'splits a reported message'` — red 1 failed / green 1 passed. Files exist. Red `Tests  1 failed | 15 skipped (16)`; green `Tests  1 passed | 15 skipped (16)`. Red body shows the old split still in source at plant time.

### probe-obj-2

1. **Site now.** Brief `setupServer.ts:48-61` (`isProcessLive`) gone. That span is now `createLintFixture` TSDoc (`40-72`) / `createLintFixture` (`73`). `isProcessLive` is not a symbol in the tree. `LintStage.test.ts:6` `import { createScratch, isRunning } from '@orkestrel/test/server'`. Calls at `911,915,940,947,964,980,985,1011,1033,1063,1167`. `setupServer.test.ts` import list has no `isProcessLive`; `isProcessLive` rows deleted.

2. **Diff at the site.** `setupServer.ts` `@@ -45,19 +216,38 @@` replaces `isProcessLive` with `readChildEnding`. `-export function isProcessLive`. LintStage import/call hunks `@@ -1039,11 +908,11 @@` and siblings replace `isProcessLive` with `isRunning`. `setupServer.test.ts` `@@ -3,14 +3,85 @@` `-	isProcessLive,`. Operative repair (delete helper, no `isRunning` import in `setupServer.ts`, import `isRunning` in LintStage.test.ts, delete setupServer.test.ts rows) is in the `+`/`-` lines. Finder's `isRunning` import in `setupServer.ts` is absent.

3. **Old form sweep.** `isProcessLive` word-boundary: no hit. `\b(isProcessLive|isProcessLives|isProcessLived|isProcessLiving)\b` case-insensitive over the five paths: no hit.

4. **Report reading.** Table: `applied` — ``isProcessLive` deleted; every site reads `isRunning` from `@orkestrel/test/server` ``. Tree matches. Sweep table no match — agrees.

5. **Proof reading.** Behavioural. Report: `npx vitest run … LintStage.test.ts tests/setupServer.test.ts` — red `6 failed, 27 passed` / green `33 passed`. Files exist. Red `Tests  6 failed | 27 passed (33)`; green `Tests  33 passed (33)`. Red names `isProcessLive is not a function`.

### probe-obj-3

1. **Site now.** Brief `LintStage.test.ts:55-134` `SERVER` gone. Current `36`: `const FIXTURE = createLintFixture().files`. Brief `Probe.test.ts:33-70, 76-107` local programs gone. Current `35` `const STALLING = createLintFixture({ budget: 300_000 })`; `41` `const ORDERED = createLintFixture({ budget: 300_000, delay: 100 })`. Builder `tests/setupServer.ts:73` `export function createLintFixture`. Writer `83`; parser `frame()` `88-99`; `writeFileSync('server.pid'…)` `79`; budget `80`; `unanswered-initialize` writes `initialized` `122-124`; `PROBE_CLOSES_INPUT` `147-151`. Manifest literals replaced by `createLintFixture(…).files` / `.manifest`.

2. **Diff at the site.** `setupServer.ts` `@@ -6,6 +7,176 @@` adds the builder (`+export function createLintFixture`). `Probe.test.ts` `@@ -22,89 +22,23 @@` replaces `ORDERED`/`STALLING` arrays. `LintStage.test.ts` `@@ -29,116 +31,9 @@` deletes `SERVER`. Operative extras present: `budget` option, unconditional `server.pid`. `ORDERED`/`STALLING` names remain as wrappers.

3. **Old form sweep.** `const SERVER = `: no hit (`tests/guides.test.ts:169` is `SERVER_TYPES`). `const ORDERED = `: `tests/src/server/Probe.test.ts:41`. `const STALLING = `: `tests/src/server/Probe.test.ts:35`. `Content-Length: ' + Buffer.byteLength`: `tests/setupServer.ts:83` only. `JSON.parse(buffer.subarray`: `tests/setupServer.ts:97` only.

4. **Report reading.** Table: `applied` — `One \`createLintFixture\` replaces \`SERVER\`, \`ORDERED\`, \`STALLING\`, and every manifest literal`. `SERVER` program gone; `ORDERED`/`STALLING` names remain as `createLintFixture(...)` calls. Sweep table: `function readHostEnding|const SERVER = |const ORDERED = \[|const STALLING = \[` one hit `tests/setupServer.ts:283` (the `ORDERED = [` / `STALLING = [` alternatives miss the wrapper form). Field 3 still sees `const ORDERED =` / `const STALLING =` at `Probe.test.ts:41,35`.

5. **Proof reading.** Planted builder. Report: builder drops `server.pid` and `delay` — red `2 failed, 7 passed` (`probe-obj-3-builder-planted-red.txt`); green `9 passed` (`probe-obj-3-builder-green.txt`). Files exist. Quoted: red `Tests  2 failed | 7 passed (9)`; green `Tests  9 passed (9)`. Additional greens named exist (`probe-obj-3-lintstage-green.txt` `30`; `probe-obj-3-probe-green.txt` `26`; framing variants same counts).

### probe-obj-4

1. **Site now.** Brief `LintStage.test.ts:213-228` local `readHostEnding` gone (`@@ -204,29 +99,6 @@` in the diff). Moved to `tests/setupServer.ts:283` `export async function readHostEnding`. Beside it: `Ending` `219-222`; `readChildEnding` `234-238`; `describeEnding` `247-249`. `LintStage.test.ts:11-15` imports `describeEnding`, `readHostEnding`. Phrase sites wrap `describeEnding(await readHostEnding(...))` at `1172-1173,1347`. `main.test.ts` import `describeEnding, readChildEnding, readSignalEnding`; `1028` `describeEnding(ending)`; `1037` `readChildEnding(child)`.

2. **Diff at the site.** `setupServer.ts` `@@ -82,20 +267,52 @@` adds `readHostEnding`. `LintStage.test.ts` deletes the local function. Operative repair: keep `process.kill` door, `spawn` readiness, optional signal; `describeEnding` leaf. Finder's kill-door parameter on `readSignalEnding` is absent. Shared spawn leaf is absent; `readChildEnding` shares only the exit read (report Decision 11).

3. **Old form sweep.** `function readHostEnding` over `tests`: one hit `tests/setupServer.ts:283` (moved). No declaration in `LintStage.test.ts`. Name `readHostEnding` also at `setupServer.test.ts:13,97,100` and `LintStage.test.ts:15,1172,1173,1347`.

4. **Report reading.** Table: `applied` — ``readHostEnding` moved to `setupServer.ts` beside `readChildEnding` and `describeEnding` ``. Tree matches (`283` beside `234` and `247`). Sweep table hit `tests/setupServer.ts:283` — agrees.

5. **Proof reading.** Behavioural. Report: `npm run test:setup` — red `3 failed, 4 passed` / green `7 passed`. Files exist. Red `Tests  3 failed | 4 passed (7)`; green `Tests  7 passed (7)`. Also `probe-obj-4-lintstage-green.txt` `Tests  30 passed (30)`.

### probe-obj-5

1. **Site now.** Brief lines moved:

| Brief | Now | Form |
| --- | --- | --- |
| 463 | `LintStage.test.ts:333-337` | `waitForCondition('the lint fixture to admit the first document', () => scratch.read('admitted') !== undefined, { budget: 10_000, interval: 20 })` |
| 1067 | `938-942` | `waitForCondition(..., () => !isRunning(owned), { budget: 10_000, interval: 20 })` |
| 1212 | `1088-1092` | `waitForCondition('the lint fixture to record the initialize it never answers', () => scratch.read('initialized') !== undefined, …)` |
| 1257 | `1137` | `await waitForDelay(250)` still, with comment `1135-1136` |
| 1282 | `1165-1169` | `waitForCondition(..., () => !isRunning(owned), …)` |
| 1412 | `1303-1307` | `waitForCondition('the lint fixture to record the standard input it closed', () => (scratch.read('closed') ?? '') !== '', { budget: 10_000, interval: 20 })` |

Remaining `waitForDelay` in this file: `155,159,429,1137`.

2. **Diff at the site.** `LintStage.test.ts` `@@ -460,7 +327,14 @@`, `@@ -1064,12 +933,18 @@`, `@@ -1207,9 +1082,14 @@`, `@@ -1278,12 +1158,19 @@`, `@@ -1409,7 +1296,15 @@`. Line 1257 sleep not replaced. Fixture `initialized` write and `closed` record in `createLintFixture` `+` lines. Condition is contents `!== ''`, not mere existence.

3. **Old form sweep.** No renamed token. `waitForDelay(250)` remains at `LintStage.test.ts:1137` (struck row) and other unlisted sleeps `155,159,429`.

4. **Report reading.** Table: `applied` — `Five sleeps became named conditions; the refuted sixth stands`. Tree matches. Fix round 1 cites `LintStage.test.ts:1305` polling `(scratch.read('closed') ?? '') !== ''` — that expression is now `1305`. Cites `setupServer.ts:62-64` PROBE_CLOSES_INPUT prose — present. Cites `setupServer.ts:147-148` descriptor comment — now `147-148`.

5. **Proof reading.** Planted. Report shipped-budget plant: command `npx vitest run … LintStage.test.ts` — red `1 failed, 29 passed` (`probe-obj-5-planted-red2.txt`); green `30 passed` (`probe-obj-5-green2.txt`). Files exist. Red `Tests  1 failed | 29 passed (30)` and `Condition "the lint fixture to record the standard input it closed" did not hold within 10000ms`; green `Tests  30 passed (30)`. Superseded captures `probe-obj-5-planted-red.txt` / `probe-obj-5-restored-green.txt` also exist (`3 failed, 27 passed` / `30 passed`).

### probe-obj-6

1. **Site now.** Brief `setupServer.ts:98-112` is now `315-329` `export function probeRefusedTargets(): boolean` with TSDoc `297-314`. `REFUSED_RUNTIME_TARGETS` at `334`. Proof `setupServer.test.ts:19-24`.

2. **Diff at the site.** `setupServer.ts` `@@ -82,20 +267,52 @@` converts the `//` block to TSDoc and `+export function probeRefusedTargets`. `setupServer.test.ts` adds the classify row.

3. **Old form sweep.** Row adds `export`; removes no name. Hits 0.

4. **Report reading.** Table: `applied` — ``probeRefusedTargets` exported with TSDoc and its own proof``. Tree matches (`export function` at `315`; test at `19-24`).

5. **Proof reading.** Behavioural. Report: `npm run test:setup` — red `1 failed, 3 passed` / green `4 passed`. Files exist. Red `Tests  1 failed | 3 passed (4)` (`probeRefusedTargets is not a function`); green `Tests  4 passed (4)`.

### probe-obj-7

1. **Site now.** Brief `RuntimeStage.ts:167` overlay mint is now `173` `const overlay = new Overlay()` (no options). Class `@remarks` now `70-74`:

```70:74:src/server/stages/RuntimeStage.ts
 * This stage mints its overlay with the default exact-match sensitivity, because it declares no
 * file-name case sensitivity to Vite. A covered path whose spelling an importer wrote differs from
 * the recorded candidate path is therefore served by whatever answers first, and `#misses` reports
 * it as `The workspace configuration served this module before the runtime overlay` with origin
 * `workspace` rather than leaving it answered silently.
```

Guide brief `:183-191` is now `188-195`: `TypeStage` sentence then `RuntimeStage` sentence then folding sentence.

2. **Diff at the site.** `RuntimeStage.ts` `@@ -67,6 +67,11 @@` adds the remarks sentences. Guide `@@ -186,9 +186,13 @@`. Overlay call itself unchanged (`new Overlay()` still un-optioned).

3. **Old form sweep.** Row adds prose; removes no name. Hits 0.

4. **Report reading.** Table: `applied` — ``RuntimeStage` `@remarks` and the guide state the exact-match overlay and its miss report``. Tree matches. Report: `RuntimeStage.test.ts:893` already drives the `workspace` issue — current nearby row `895` `it('reports when workspace configuration serves a covered module before the overlay'`.

5. **Proof reading.** Documentation/prerequisite row. No old-form sweep required beyond field 3 (empty). Report records existing test rather than a new failing-first pair.

### fleet-F1

1. **Site now.** `tests/setup.ts:1-3` exports `WORKSPACE_ROOT` only; no `isBrowserVuePath`. `tests/setup.test.ts` proves `WORKSPACE_ROOT`. Glob `src/browser/**`, `app/browser/**`, `tests/setupBrowser.ts`: 0 files.

2. **Diff at the site.** No hunk touches `tests/setup.ts` or `tests/setup.test.ts`.

3. **Old form sweep.** `isBrowserVuePath` over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md`: no hit.

4. **Report reading.** Table: `noop` — ``tests/setup.ts` declares no `isBrowserVuePath`, and this workspace has no browser environment``. Evidence paragraph matches the tree. `grep -c` claim not re-run as that shell; Grep equivalent is 0.

5. **Proof reading.** Placement/noop. Field 3 agrees (0 hits). No proof file required.

### fleet-F2

1. **Site now.** Classes at report paths: `ProbeError` `src/core/errors.ts:28` (`override readonly name`, no `id` field); `Overlay` `Overlay.ts:32` (`#revision` first); `Probe` `Probe.ts:63` (`#workspace` first); `ProbeServer` `ProbeServer.ts:51` (`#probe` first); `LintStage` `LintStage.ts:54`; `RuntimeStage` `RuntimeStage.ts:112`; `TypeStage` `TypeStage.ts:52`. `readonly id: string` only at `src/core/types.ts:342` (`Verdict`). No `get id(` in `src`.

2. **Diff at the site.** No hunk adds `get id` or `#id`.

3. **Old form sweep.** Public `readonly id` data field on those classes: no hit. `readonly id` in `src`: `src/core/types.ts:342` only.

4. **Report reading.** Table: `noop` — `No implementation class declares a public \`readonly id\` field`. Class list and `types.ts:342` cite match the tree.

5. **Proof reading.** Placement/noop. Field 3 agrees.

### Scope

Status paths (`/home/user/work/evidence/conform-probe.status`), tagged against the brief's § Scope:

| Path | Tag |
| --- | --- |
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

14 entries, all owned. None shared. None off-limits. Conversation-start `git status` lists the same 14 `M` paths.

Hunks whose **file** no row **Where** names (Where names `Probe.ts`, `helpers.ts`, `guides/probe.md`, `main.ts`, `setupServer.ts`, `LintStage.test.ts`, `Probe.test.ts`, `RuntimeStage.ts`, `tests/setup.ts`; not `LintStage.ts`, `TypeStage.ts`, `setupServer.test.ts`, `main.test.ts`, `helpers.test.ts`, `RuntimeStage.test.ts`):

- `src/server/stages/LintStage.ts @@ -59,13 +59,15` first `+`: `+	// The teardown latch and the destroyed reading are one field: \`destroy\` assigns it before the`
- `src/server/stages/LintStage.ts @@ -95,13 +97,12` first `+`: `+		if (this.#closing !== undefined) throw createDestroyedError('lint stage')`
- `src/server/stages/LintStage.ts @@ -114,7 +115,7` first `+`: `+		if (this.#closing !== undefined) throw createDestroyedError('lint stage')`
- `src/server/stages/LintStage.ts @@ -238,7 +239,7` first `+`: `+		if (this.#closing !== undefined) return createDestroyedError('lint stage')`
- `src/server/stages/TypeStage.ts @@ -59,9 +59,11` first `+`: `+	// The teardown latch and the destroyed reading are one field: \`destroy\` assigns it before the`
- `src/server/stages/TypeStage.ts @@ -124,16 +126,15` first `+`: `+		if (this.#closing !== undefined) throw createDestroyedError('type stage')`
- `src/server/stages/TypeStage.ts @@ -195,9 +196,9` first `+`: `+		if (this.#closing !== undefined) throw createDestroyedError('type stage')`
- `src/server/stages/TypeStage.ts @@ -257,7 +258,7` first `+`: `+		if (this.#closing !== undefined) throw createDestroyedError('type stage')`
- `tests/setupServer.test.ts @@ -3,14 +3,85` first `+`: `+	REFUSED_RUNTIME_TARGETS,`
- `tests/setupServer.test.ts @@ -43,18 +114,17` first `+`: `+			// The child's own exit event is what proves the kill landed on the announced process: it`
- `tests/src/bin/main.test.ts @@ -19,7 +19,7` first `+`: `+import { describeEnding, readChildEnding, readSignalEnding } from '../../setupServer.js'`
- `tests/src/bin/main.test.ts @@ -232,6 +232,19` first `+`: `+	// The reporter flattens a multi-line refusal onto one stderr line, so what it treats as a line`
- `tests/src/bin/main.test.ts @@ -1015,7 +1028,7` first `+`: ``+					\`this host ends a child holding its own ${delivery.signal} handler as ${describeEnding(ending)}, so child.kill runs no handler here and the entry's graceful teardown cannot be reached\`,``
- `tests/src/bin/main.test.ts @@ -1024,11 +1037,7` first `+`: `+				const exited = readChildEnding(child)`
- `tests/src/server/helpers.test.ts @@ -7,9 +7,9` first `+`: `+	buildRevisionPath,`
- `tests/src/server/helpers.test.ts @@ -111,7 +111,7` first `+`: `+				buildRevisionPath(ROOT, 'tmp/probe/greeting.test.ts', '4821-9f0c'),`
- `tests/src/server/helpers.test.ts @@ -210,7 +210,7` first `+`: `+		const generated = buildRevisionPath(ROOT, 'tmp/probe/greeting.test.ts', \`${process.pid}-1f0c\`)`
- `tests/src/server/helpers.test.ts @@ -341,11 +341,11` first `+`: `+	it('builds sibling revision paths with and without extensions', () => {`
- `tests/src/server/stages/RuntimeStage.test.ts @@ -27,7 +27,7` first `+`: `+import { RuntimeStage, buildRevisionPath, normalizePath } from '@src/server'`
- `tests/src/server/stages/RuntimeStage.test.ts @@ -62,7 +62,7` first `+`: `+		const file = buildRevisionPath(`
- remaining RuntimeStage.test.ts hunks `@@ -1587` … `@@ -1651`: first `+` each is a `buildRevisionPath(` call.

(Repair text of probe-subj-5 names `LintStage.ts` / `TypeStage.ts`; repair text of probe-subj-2 / obj-1 / obj-4 names the test files. Where fields do not.)

Guide hunk `@@ -251,7 +255,6` deletes LintStageInterface `destroy` row — file `guides/probe.md` is Where-named (other rows); first change is a `-` line, no `+`.

### Residue

**Diff `+` lines** (pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`):

- `conform-probe.diff` ≈70: `+	console.error(\`[${error.origin}] ${error.code}: ${error.message.split(/\\r\\n|\\n/u).join(' ')}\`)`
- ≈548: `+	 * child rather than any exchange. Size it above the timeout of every row that drives it.`
- ≈961: `+// longest row's timeout, so a row reads the ending it drove rather than the server leaving on its`

No `+` hit for `.skip(`, `.only(`, `.todo(`, `retry`, `TODO`, `FIXME`, `debugger`.

**Tree `src` and `tests`**, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

`src`: `src/bin/main.ts:8` `console.error`; `src/server/Probe.ts:14,21,238,241,479,480,481,487,489,493,502,503,511,521,581,587` (`timeout` / `retry` comments); `src/server/helpers.ts:396,431` `console.log` in TSDoc examples; `src/server/stages/LintStage.ts:50,152` `timeout`; `src/server/types.ts:38,143,232,237`; `src/server/Overlay.ts:28` `console.log`; `src/core/errors.ts:95` `retrying`; `src/core/types.ts:371,378,403,442`. No `TODO`/`FIXME` in `src`. No `.skip(` / `.only(` / `.todo(` in `src`.

`tests` (same pattern): `tests/setupServer.ts:14` `timeout`; `tests/guides.test.ts:380` `{ timeout: 300_000 }`; `tests/src/bin/main.test.ts:281,501,590,652,724,803,816,851,867,873,909,1014,1029`; `tests/src/server/Probe.test.ts:31,90,104,203,318,358,392,449,588,627,707,769,879,965,983,984,1062,1142,1197,1258,1259,1329,1346,1383,1434,1454,1467,1474,1524,1626,1694,1760,1803,1842,1846,1871` (`timeout`, fixture `test.skip`/`test.todo`/`describe.skip` text, `retry` in titles/comments, `console.log`, `context.skip`); `tests/src/server/stages/LintStage.test.ts:85,86,209,211-213,221,227,237,256,259,269,287,296,304,316,355,384,392,445,471,503,519,546,559,569,584,593,603,616,657,662,667,678,686,700,710,720,728,742,752,762,770,784,787,794,795,801,811,841,846,858,891,923,972,994,1042,1072,1111,1149,1194,1237,1269,1280,1341` (`timeout`, `debugger` as lint subject, `console.log` in fixture programs, `context.skip`, `no-debugger` rules); `tests/src/server/stages/RuntimeStage.test.ts:96,132,177,225,271,311,318,333,359,366,411,419,477,509,540,581,614,656,681,724,750,791,821,862,895,933,965,1006,1029,1063,1143,1162,1199,1209,1291,1386,1431,1472,1489,1526`; `tests/src/server/stages/TypeStage.test.ts:28,85,123,153,186,212,263,297,320,344,383,453,512,554,611,719,758`; `tests/src/server/ProbeServer.test.ts:107,124,152,196,214,223,239,283,329`. `tests/setupServer.test.ts`, `tests/src/server/helpers.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`: no hit.

### Parity

Diff does not touch `src/**/types.ts`. Class files touched: `Probe.ts`, `LintStage.ts`, `RuntimeStage.ts`, `TypeStage.ts`.

| Entity | Interface call-signature members | Guide `## Methods` rows |
| --- | --- | --- |
| Probe / `ProbeInterface` | `prove` `src/core/types.ts:471`; `destroy` `:477` | `guides/probe.md:236` `prove`; `:237` `destroy` |
| TypeStage / `TypeStageInterface` | `inspect` `src/server/types.ts:209`; `resolve` `:218` (plus inherited `StageInterface.destroy` `:182`) | `guides/probe.md:250` `inspect`; `:251` `resolve` (inherited `destroy` under `StageInterface` `:244`) |
| LintStage / `LintStageInterface` | `inspect` `src/server/types.ts:250` (plus inherited `destroy` `:182`) | `guides/probe.md:257` `inspect` only. Diff `@@ -251,7 +255,6` deleted a `destroy` row from this table. |
| RuntimeStage / `StageInterface` | `inspect` `:168`; `destroy` `:182` | `guides/probe.md:243` `inspect`; `:244` `destroy` |

Readonly data:

| Interface | Properties | Guide Surface / Entities |
| --- | --- | --- |
| `ProbeInterface` | `emitter` `src/core/types.ts:448`; `toolchain` `:450` | Surface `guides/probe.md:48` `its readonly \`emitter\` and \`toolchain\` are data`; Entities `Probe` `:166` |
| `StageInterface` (Lint/Type/Runtime) | `stage` `src/server/types.ts:149`; `progress` `:160` | Surface `:139`; Entities `TypeStage` `:168`, `LintStage` `:169`, `RuntimeStage` `:170` |
| Getters on classes | `Probe.ts:129` `get emitter`, `:133` `get toolchain`; `TypeStage.ts:83,87`; `LintStage.ts:86,90`; `RuntimeStage.ts:138,142` | same Surface rows |

Backticked identifiers in **guide sentences** the diff added, vs barrels `src/server/index.ts` / `src/core/index.ts` (both `export *`):

| Identifier | Where added | Barrel |
| --- | --- | --- |
| `RuntimeStage` | `guides/probe.md:189` | `src/server/index.ts:8` `export * from './stages/RuntimeStage.js'` |
| `workspace` (origin) | `:192` | not an export |
| `` `The workspace configuration served this module before the runtime overlay` `` | `:192-193` | message string, not an export |
| `tests/guides.test.ts` | `:623` | path, not an export |
| `destroy()` | `:932` | method on exported `Probe` (`index.ts:4`) |
| `ProbeOptions.on` | `:934` | `ProbeOptions` via `src/core/index.ts:1` `export * from './types.js'` |
| `probe.emitter` | `:934` | property on exported `Probe` |
| `probe.emitter.destroyed` | `:935` | `destroyed` on dependency `EmitterInterface`, not this package's barrel |
| `prove` | `:936` | method on exported `Probe` |
| `ProbeServer.destroy` | `:936` | `src/server/index.ts:5` `export * from './ProbeServer.js'` |

Table cell added (not a sentence): `` `buildRevisionPath` `` `guides/probe.md:218` — `src/server/index.ts:2` `export * from './helpers.js'`.

### Gates

Report § Gates, quoted:

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format, 68 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | root project and the three scoped projects |
| `npm run build` | 0 | `dist/bin/main.js` 0.41 kB, and the core and server bundles |
| `npm test` | 1 | 8 failed, 221 passed, 229 total; see the observation |

### Breaking

Report § Breaking: `` `buildRevisionPath` replaces the published `createRevisionFile` on `@orkestrel/probe/server`. `` No consumer edit. Grep for `from '@orkestrel/probe'` recorded as only this package. Rename earns a version bump.

Word-boundary `createRevisionFile` over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/probe`, and vendored `guides/probe.md` mirrors: no hit. (Mirrors under `/home/user/fleet/*/guides/probe.md` still contain `` `createRevisionFile` `` at line 210; those paths are excluded.)

### Writing sweep

Over diff `+` lines in `guides/**`, `README.md`, doc comments in `src/**`, test titles and comments in `tests/**`:

Vocabulary `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` (case-insensitive): no hit in those prose `+` lines. (`+	return new Promise<Ending>` / `+		await new Promise<void>` / `+		… throw new Error(…)` at `setupServer.ts` are code, not titles/comments/TSDoc.)

Count `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`: no hit on any diff `+` line.

## Distillate

- probe-subj-1: `Probe.ts:603-623` `#emitter.destroy()` in `finally`; guide `:932-936`; test `:1381-1425` | diff present yes | old form hits 0 | report matches yes (Decisions cite `Probe.test.ts:1460` now `:1391`)
- probe-subj-2: `helpers.ts:614` `buildRevisionPath`; guide `:218` | diff present yes (verbatim TSDoc/`@returns`) | old form hits 0 | report matches yes
- probe-subj-5: `#destroyed` gone; `#closing !== undefined` at the four classes | diff present yes | old form hits 0 | report matches yes
- probe-subj-6: `guides/probe.md:622-623` date dropped; Cost `:1002` retains `taken on 2026-08-20` | diff present yes (refuter text, not finder's extra clause) | old form hits 1 (`:1002`) | report matches yes
- probe-obj-1: `main.ts:8` `split(/\r\n|\n/u)` | diff present yes | old form hits 0 | report matches yes (table vs later “no behavioural proof” sentence disagree with each other; tree matches the table)
- probe-obj-2: `isProcessLive` gone; `isRunning` at LintStage.test.ts | diff present yes | old form hits 0 | report matches yes
- probe-obj-3: `createLintFixture` at `setupServer.ts:73`; `SERVER` gone; `ORDERED`/`STALLING` wrappers remain `:35,:41` | diff present yes | old form hits 2 (`const ORDERED =`, `const STALLING =`) | report matches partial (table says those names replaced; wrappers remain)
- probe-obj-4: `readHostEnding` at `setupServer.ts:283`; local LintStage copy gone | diff present yes | old form hits 0 at Where; name lives at new site | report matches yes
- probe-obj-5: five `waitForCondition` (now `:333,:938,:1088,:1165,:1303`); `:1137` `waitForDelay(250)` stands | diff present yes | old form hits 1 at struck site `:1137` plus unlisted sleeps `:155,:159,:429` | report matches yes
- probe-obj-6: `export function probeRefusedTargets` `setupServer.ts:315` | diff present yes | old form hits 0 | report matches yes
- probe-obj-7: remarks `RuntimeStage.ts:70-74`; guide `:189-193`; mint still `new Overlay()` `:173` | diff present yes | old form hits 0 | report matches yes
- fleet-F1: no `isBrowserVuePath`; no browser env | diff present no (noop) | old form hits 0 | report matches yes
- fleet-F2: no public `readonly id` on implementation classes; `types.ts:342` `Verdict` only | diff present no (noop) | old form hits 0 | report matches yes

Scope tags: 14 status paths, all **owned**; 0 shared; 0 off-limits.

Residue `+`: `console.error` `main.ts`; `timeout` in `createLintFixture` TSDoc and Probe.test.ts STALLING comment. Tree: timeout/`debugger`/`console.`/`context.skip`/`retry` hits listed above; no `TODO`/`FIXME` in `src`; no `.only(`.

Writing: no vocabulary hit in prose `+` lines; no count-pattern hit.

Parity: Probe `prove`/`destroy` ↔ guide `:236-237`; TypeStage `inspect`/`resolve` ↔ `:250-251`; LintStage `inspect` only ↔ `:257` (diff removed `destroy` row); RuntimeStage `inspect`/`destroy` ↔ `:243-244`. Data: `emitter`/`toolchain`; `stage`/`progress`. Added sentence backticks: `RuntimeStage` exported; `buildRevisionPath` exported via helpers barrel; `workspace` origin and receipt path and `emitter.destroyed` are not this package's barrel exports.

## Unknowns

- Live `git status` / `git diff HEAD` were not re-run; status/diff compared as the supplied evidence files against the tree via Read/Grep. Conversation-start status matched the evidence status file.
- `grep -c isBrowserVuePath` and `ls -d src/browser …` from the report were not executed as those shells; Glob/Grep equivalents were used.
- Fleet `from '@orkestrel/probe'` consumer grep named in § Breaking was not re-run; `createRevisionFile` was swept over fleet `src`/`tests` and `scaffold/src` only.
- `probe-subj-5-restored-green.txt` still contains the standing arming failure; whether that equals the brief's baseline set was not re-measured here.
- Inflection sweeps for `#destroyed` used `#destroyeds|#destroyeded|#destroyeding`; a broader `destroyed` token sweep was not used (it would hit lawful `createDestroyedError` / `code: 'destroyed'`).

## Journal

leave this line for the driver.

## Deviation

No tree change from this pass (read-only: Read/Grep/Glob only; no Write/Edit/Delete; no mutating shell). Every named input file was readable. Sweeps ran as ripgrep over the named paths, not as the report's exact `grep` invocations. Gates were not re-run. `tests/setupPolicy.ts:1257` `\r\n|\r|\n` was observed while sweeping tests and is vendored/off-limits for the unit.