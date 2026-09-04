# Verdict — unit conform-probe, audit round 1

**Lane held:** OBJECTIVE — correctness, constraints, and what the code and contracts actually permit. Recorded substitution for the dark Sol bench; my own engine wrote the subject. Read-only. Every sweep cited was re-run with Grep/Read/Glob against `/home/user/fleet/probe`; none is taken from the report or the distillate.

## Per-claim verdicts

**1. Every row is `applied`, `stopped`, or `noop` with evidence; no row silently skipped — CONFIRMED.**
Every row of the unit brief's § Rows and § Fleet rows carries a disposition. I verified both `noop` rows independently rather than from the report: `isBrowserVuePath` matches nothing in any `.ts` file under `/home/user/fleet/probe`; `readonly id: string` in `src` occurs only at `/home/user/fleet/probe/src/core/types.ts:342`, inside `export interface Verdict` declared at `:340`, so no implementation class carries the field shape fleet-F2 names. Each `applied` row maps to a hunk in `/home/user/work/evidence/conform-probe.diff`.

**2. Each `applied` row implements the refuter's operative repair — REFUTED (probe-obj-5, the line-1412 sub-repair).**

Failing input: the polled condition holds before the event it names.

- `/home/user/fleet/probe/tests/setupServer.ts:148-151` emits, in order, `const record = openSync('closed', 'w')`, `closeSync(0)`, `writeSync(record, …)`, `closeSync(record)`.
- `/home/user/fleet/probe/tests/src/server/stages/LintStage.test.ts:1302-1306` polls `() => scratch.read('closed') !== undefined` under the description `'the lint fixture to record the standard input it closed'`.
- `/home/user/fleet/probe/node_modules/@orkestrel/test/dist/src/server/index.d.ts:331` declares `read(target: string): string | undefined`, returning contents and `undefined` only when no file can be read. An empty file returns `''`, which satisfies `!== undefined`.

So `openSync` at `:148` creates the marker, and the condition can be satisfied in the window between `:148` and the `closeSync(0)` at `:149` — before the close the condition is named for. The refuter's operative repair placed the marker after the close (`add writeFileSync('closed', uri)` beside the `closeSync(0)`); the writer's decision 8 reordered it for descriptor safety and did not record that the reordering inverts the marker's meaning.

Why it matters: probe-obj-5 exists to replace a fixed `waitForDelay(250)` with a condition that holds only once the thing it names has happened. A condition satisfiable before that event is the same race in a new spelling. Two prose claims are false against the shipped code for the same reason: `/home/user/fleet/probe/tests/setupServer.ts:62-63` ("records the URI in `closed` afterwards, so a test writes again only after the close has landed") and the row comment at `/home/user/fleet/probe/tests/src/server/stages/LintStage.test.ts:1299-1301`.

What right looks like — either form closes it, keeping decision 8's descriptor discipline:
- Poll the record rather than the file: change `LintStage.test.ts:1304` to `() => (scratch.read('closed') ?? '') !== ''`, and reword `setupServer.ts:63` and `LintStage.test.ts:1299-1301` to say the record's contents land after the close.
- Or make existence follow the close: open the record under a name the test does not poll, and `renameSync` it to `closed` after `closeSync(record)` at `setupServer.ts:151`, leaving the condition as written.

Re-run probe-obj-5's planted control against the shipped budget after the change.

Every other `applied` row implements its operative repair, checked against the diff and the tree:
- probe-subj-1 — `finally { this.#emitter.destroy() }` at `/home/user/fleet/probe/src/server/Probe.ts:603-623`, unguarded, after the stage teardowns; guide entry at `guides/probe.md:933-937`; the assertion at `tests/src/server/Probe.test.ts:1391-1425`.
- probe-subj-2 — `buildRevisionPath` at `src/server/helpers.ts:614` with the signature and the rewritten first sentence, `@returns`, and `@example`; every call site and import in `src` and `tests` takes it.
- probe-subj-5 — `#destroyed` deleted from all four classes; every read is `this.#closing !== undefined`; no accessor added. I re-derived the window analysis rather than accepting it: each `#destroy()` reaches a suspension before any read (`Probe.ts:603` awaits `#arming`; `LintStage.ts:134-135` awaits a foreign `client.destroy()`, whose only synchronous callback is `#retire` at `LintStage.ts:172-173`, which writes `#ending` and reads neither field; `TypeStage` awaits `#typescript.catch`; `RuntimeStage`'s unlink prefix reads neither field). The derivation is sound.
- probe-subj-6 — receipt sentence at `guides/probe.md:621-624` drops the date and names the gate; `guides/probe.md:1003` retains the Cost date, as the repair directed.
- probe-obj-1 — `src/bin/main.ts:8` splits on `/\r\n|\n/u`; nothing else changed.
- probe-obj-2 — `isProcessLive` deleted with no unused import added to `setupServer.ts`; `LintStage.test.ts:6` imports `isRunning` from `@orkestrel/test/server`; the `isProcessLive` rows are deleted from `setupServer.test.ts` rather than repointed.
- probe-obj-3 — one `createLintFixture` at `tests/setupServer.ts:72`, carrying the self-exit budget (`:79`) and the `server.pid` announcement (`:78`) the refuter added to the finder's list, one framing writer (`:82`) and one parser (`:87-98`); every manifest literal is built from it. I checked the consolidation is behaviour-preserving for the rows it now serves: `Probe.test.ts` uses only `PROBE_SILENT` (`:996`, `:1007`) and `stall-lint` (`:1081`, `:1119`), both handled identically by the shared program, and reads `probe-lint.log` only in the ORDERED row that writes it first (`:1595-1597`).
- probe-obj-4 — `readHostEnding` moved to `tests/setupServer.ts` keeping its `process.kill` door, `spawn`-event readiness, and optional-signal control; `describeEnding` exported beside it; `readSignalEnding`'s signature untouched at its `main.test.ts` call sites. See O-2 for the one clause not carried.
- probe-obj-6 — `export function probeRefusedTargets` with the comment converted to TSDoc, and its own proof in `setupServer.test.ts`.
- probe-obj-7 — `RuntimeStage.ts:67-74` and `guides/probe.md:186-193` state the exact-match reading and the miss report. Both are true against the code: `RuntimeStage.ts:173` mints `new Overlay()`, `TypeStage.ts:160` mints `new Overlay({ sensitive: … })`, and `RuntimeStage.ts:579-583` emits that exact message with `origin: 'workspace'`.

**3. No old name survives — CONFIRMED.**
I re-ran the sweeps rather than reading them. `createRevisionFile`, `isProcessLive`, and `#destroyed`, word-boundary and case-insensitive with `-s`/`-ed`/`-ing`, read empty across `src`, `tests`, `guides/probe.md`, `guides/README.md`, and `README.md`. `buildRevisionPath` resolves at `src/server/helpers.ts:614`, `src/server/Probe.ts:32,277,278`, `src/server/stages/RuntimeStage.ts:35,449`, `guides/probe.md:218`, and every test site. The writer's recorded `#destroyed` sweep names `src/` alone, which is the only population a `#`-private field can occupy, so the narrower record is correct scoping rather than a shortfall. See O-3 for the recorded inflection sweeps.

**4. Every behavioural row carries a failing-first proof; every placement, naming, or documentation row carries the sweep that proves the old form gone — REFUTED (probe-subj-6).**

The proof half holds. Every capture the report names exists under `/home/user/work/evidence/probe-proofs/` and its counts match the report exactly, and I read the red bodies to confirm each names its own defect rather than an unrelated failure: `probe-subj-1-red.txt:8-9` fails the row's own assertion (`expected 1 to be +0`); `probe-obj-2-red.txt` fails on the deleted symbol at each repointed site; `probe-obj-5-planted-red.txt:9,22,35` names each condition in its own words, which is what the rule requires of an expired budget; `probe-subj-5-planted-red.txt:1564` and `probe-obj-3-builder-planted-red.txt:130` carry their planted controls.

The sweep half fails for one row. probe-subj-6 is a documentation row whose old form is the sentence ending `taken on 2026-08-20` in the receipt paragraph, and the report's § Sweeps table records no sweep for it.

Why it matters: the unit brief's § Method step 2 requires that sweep beside the gate, and the report is the unit's result — the writer's final message was lost, so an unrecorded sweep is an unrecorded sweep.

What right looks like: add to `/home/user/scaffold/tmp/units/conform/conform-probe-report.md` § Sweeps the row `taken on 2026-08-20` over `guides/probe.md`, `guides/README.md`, `README.md`, with the result I measured: one hit, `guides/probe.md:1003`, the Cost measurement the row's repair leaves in place; the receipt paragraph reads empty.

**5. Guide parity holds; no `AGENTS §` citation survives in the touched files — CONFIRMED.**
`guides/probe.md:218` carries the renamed row with its signature and its existing description. `guides/README.md` and `README.md` name neither helper. `tests/guides.test.ts` transcribes neither, so no fence moved. The added guide prose is true against the code at every point I checked: the Teardown entry (`guides/probe.md:933-937`) against `src/server/Probe.ts:603-623`, the `sensitive` paragraph (`guides/probe.md:186-193`) against `RuntimeStage.ts:173,579-583` and `TypeStage.ts:160`. `guides/probe.md` carries no `AGENTS §` citation; its only `AGENTS.md` mention is the reference link at `:1063`. The `AGENTS §N` citations in this tree sit in vendored dependency-guide mirrors, which are outside the unit.

**6. Every breaking change named with its consumers and the exact consumer edit — CONFIRMED.**
The rename of `createRevisionFile` to `buildRevisionPath` on `@orkestrel/probe/server` is the unit's only published-surface change; the report names it under § Breaking. The rest of the diff moves private fields, test infrastructure, and prose. `helpers.ts` reaches the barrel through `export * from './helpers.js'`, so the rename is the published change and nothing else left the barrel.

**7. Diff touches only Owned files; off-limits untouched; no shim — CONFIRMED.**
Every path in `/home/user/work/evidence/conform-probe.status` sits under the brief's Owned set. `package-lock.json`, `node_modules`, `configs/**`, `scripts/**`, and the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts` appear in neither the status nor the diff. No compatibility alias or re-export was added: `createRevisionFile` resolves nowhere.

**8. No `.skip`, `.only`, `.todo`, retry, or inflated timeout added — CONFIRMED. Gate reading — NOT-EVIDENCED.**
A sweep over the diff's added lines for `.skip(`, `.only(`, `.todo(`, `retry`, `retries`, `TODO`, `FIXME`, `XXX`, `HACK`, and `debugger` returns nothing. No line carrying `timeout` was added or removed except two prose comments (`conform-probe.diff:540,952`); every `{ timeout: N }` in the touched test files is a context line. The `createLintFixture` budgets reproduce the values the replaced programs carried (`60_000` default, `300_000` for the Probe rows), and each new `waitForCondition` budget of `10_000` sits under its enclosing test timeout (`LintStage.test.ts:316/336`, `923/941`, `1072/1091`, `1149/1168`, `1269/1305`), so the condition's own description reaches the reader before the runner's timeout does.

The independent gate reading is the Orchestrator's deciding run at landing, which no read-only lane can take: **NOT-EVIDENCED**, and the landing settles it. I did not treat the report's § Gates table as evidence.

**9. Nothing hidden; the report's disposition table matches the diff — CONFIRMED.**
No TODO, FIXME, deferred row, commented-out code, or debug residue entered the tree. The one comment added inside the fixture's program-text array (`conform-probe.diff:672-673`, shipped at `tests/setupServer.ts:146-147`) is an added TypeScript comment about the generated program, not commented-out code. Every row of the report's table corresponds to a hunk I located in the diff or, for the two `noop` rows, to a tree state I re-measured.

## Findings outside the claims

**O-1. `guides/probe.md:258` tables a method `LintStageInterface` does not declare.** `src/server/types.ts:240-250` declares `LintStageInterface extends StageInterface` with `inspect` alone; `destroy` is inherited and already tabled under `StageInterface` at `guides/probe.md:244`. The `TypeStageInterface` table at `guides/probe.md:246-251` correctly omits it, so the two tables disagree about the same convention. `.claude/rules/documentation.md` § Parity requires "The table's methods exactly match the interface's call-signature members." Pre-existing: neither table is in this unit's diff, and `.claude/rules/quality.md` fixes scope at start, so this belongs to a successor brief rather than to this round.

**O-2. probe-obj-4's `spawn` clause is neither implemented nor recorded.** The operative repair asked to "factor the shared mechanics both need — spawn, await exit, read `{ code, signal }` — into one exported leaf beside them that each calls." `tests/setupServer.ts:237-241` factors the exit reading as `readChildEnding`; the `spawn` stays duplicated at `readSignalEnding` (`:259-260`) and `readHostEnding` (`:305-306`), which spawn different programs with different stdio and different readiness signals. The departure is defensible — a leaf parameterized over those would be the superfluous wrapper `AGENTS.md` § Design laws refuses, and the same refuter refused a kill-door parameter in this row for that reason — but the report's § Decisions records it nowhere, and the deviation contract makes an ancillary decision the writer's to record. Add the decision, or factor the spawn and say why.

**O-3. Two recorded sweeps are narrower than claim 3's wording.** The report's § Sweeps records a case-insensitive inflection sweep for `createRevisionFile` and none for `isProcessLive` or `#destroyed`. I ran both and they read empty, so no tree state changes; the record is what is short. Add the two rows if the round retains the report as its sweep evidence.

## Referrals

**R-1. The dispatch names an addendum that does not exist.** `/home/user/scaffold/tmp/units/conform/conform-probe-brief-addendum.md` is absent; `Glob` over `tmp/units/conform/conform-probe*` returns only `conform-probe-brief.md`, `conform-probe-audit-brief.md`, and `conform-probe-report.md`. I ruled against the brief alone. If the addendum amended or added rows, my claim-1 and claim-2 rulings are against an incomplete row set and want re-running. No verdict from me.

**R-2. probe-obj-5's planted control and the shipped tree differ in the budget value.** `probe-obj-5-planted-red.txt:9,22,35` reports `did not hold within 2000ms`, while the shipped conditions carry `{ budget: 10_000 }`. The control still proves the conditions are real and self-describing, so this is not a defect I can name; whether a fresh planted control at the shipped budget is required before landing is the Orchestrator's call. It costs one re-run and would fold into the claim-2 fix.

**R-3. The whole-suite `npm test` reading.** The report records eight failures on the standing arming failure and argues the reading is load-sensitive. I can neither run nor contradict it. `.agents/orchestration.md` § Writing concurrency puts the deciding run with the Orchestrator after the unit exits.

VERDICT: FAIL 2, 4; outside the claims: O-1, O-2, O-3
