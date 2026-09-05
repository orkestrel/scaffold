<!-- workflow wf_742cd5c9-418, agent a40eb3657d6095477, captured from journal.jsonl -->

## Per-claim verdicts — objective lane (recorded substitution for the dark Sol bench)

**1. REFUTED.** Edits at their sites read as written for `src/core/types.ts:231` and `:248-253`, `src/server/Probe.ts:685-687` ("the `^7.0.0` term admits"), `guides/probe.md:212` and `:662-665`, `tests/src/core/errors.test.ts:190`, and the gate rows (claim 5). Edit 8 reads as `ts7-probe-fix-3-brief.md` prescribes rather than as `ts7-probe-fix-2-brief.md` prescribes — accounted by the audit brief's recorded supersession, so not a failure ground. The failure ground is the second conjunct: `guides/probe.md:455-456` does not obey `.claude/rules/writing.md` § Sentence and paragraph order.

- `guides/probe.md:455-456`: "probe reads each of them from the target workspace's `package.json`, never from its own dependencies, and reports the versions those manifests publish on `Verdict.toolchain`." The demonstrative `those manifests` has no plural antecedent; the only manifest the sentence names is the workspace's `package.json`. The rule requires naming the noun wherever the reader could attach the pronoun to another referent, and here the wrong referent is the reading the sentence hands the reader. Why it matters: the amended clause was written to fix exactly this account and instead states a false one (see claim 2's evidence).
- What right looks like: "probe resolves each of them from the target workspace, never from its own dependencies, and reports the version each tool's own installed manifest publishes on `Verdict.toolchain`."
- Also at `guides/probe.md:456`: the line runs to 111 columns while its sibling lines in the same bullet wrap near 100. Edit 7 rewrapped the receipt bullet; edit 2's line was left unwrapped. Rewrap at a word boundary.

**2. REFUTED.** `Probe.#version` (`src/server/Probe.ts:642-653`) calls `readWorkspaceManifest(this.#workspace, name)`, which resolves `<name>/package.json` from the target workspace (`src/server/helpers.ts:474-477`) — the installed tool's own manifest, never the workspace's `package.json`. The doc block does not state one account of that:

- `src/core/types.ts:236` (the `@remarks`) states it correctly: "the version that tool's own manifest publishes in the target workspace".
- `src/core/types.ts:248`, `:250`, `:252` state a different one: "the version the target workspace's own manifest publishes". Read literally, that names the workspace's `package.json`, which publishes a range (`^6.0.3 || ^7.0.0`) and never `typescript`'s version. `Probe.#version` does not make that sentence true for any of the three tools.
- `src/core/types.ts:231` (the summary line) says "the target workspace's own manifests publish", pluralizing a manifest the workspace has one of, which reads as the workspace's file rather than the tools'.
- Why it matters: a consumer checking `Verdict.toolchain` against the file the doc names finds a range, not a version, and the bridged case the `@remarks` explains is exactly where the two readings diverge (7.x declared, 7.0.2 installed, 6.x judging).
- What right looks like: give all four sentences the `@remarks` wording — for example `:248` as "Names the `typescript` version that tool's own installed manifest publishes in the target workspace."

**3. REFUTED.** The `Toolchain` Surface row (`guides/probe.md:40`) and the bridge bullet (`:478-481`) state the account correctly ("the version each tool's own manifest publishes in the target workspace"). Two of the named sites do not, and one sentence remains in the old vocabulary:

- `guides/probe.md:455-456` — the referent defect ruled under claim 1; the account it states is the workspace's `package.json`.
- `guides/probe.md:663` — "Each version is the one the target workspace's manifest publishes". Same mis-naming as `src/core/types.ts:248`. What right looks like: "Each version is the one that tool's own installed manifest publishes in the target workspace".
- `guides/probe.md:110` — the `isToolchain` row still reads "Admits a record carrying every resolved tool version", the vocabulary the round retired. What right looks like: "Admits a record carrying every tool version the target workspace's installed manifests publish", changed together with its TSDoc twin (see F1).
- CONFIRMED sub-clause: the `loadWorkspaceModule` row's `cause` clause is true. `guides/probe.md:212` says "carrying the native fault as `cause` where one was raised"; `src/server/helpers.ts:455` spreads `cause` only under `!bridged.success`, so a bridge that loads and cannot serve raises none and the refusal carries none — which `tests/src/server/helpers.test.ts:721` asserts with `expect(refused).not.toHaveProperty('cause')`.

**4. UNRESOLVED.** The shape conjunct is CONFIRMED from the file; the gate conjunct rests only on the writer's report, which is a claim rather than evidence, and I run no command.

- Shape, `src/server/helpers.ts:431-446`: `const loaded: unknown = outcome.value` at `:431` guarded by `isRecord(loaded) && isFunction(loaded.createProgram)` at `:437` returning `outcome.value` at `:438`; `const served: unknown = bridged.value` at `:445` guarded identically and returning `bridged.value` at `:446`. Both aliases are `unknown`, both returns are the value `require` produced. No type assertion in the function (`src/server/helpers.ts` carries no `as` outside the pre-existing `as const` at `:793`) and no written `any`.
- The comment at `:432-436` states why the guarded alias is not the returned binding, in the terms the claim names.
- Gate: `npm run check` green is evidenced only by `/home/user/fleet/probe/tmp/units/ts7-probe-fix-3-report.md`. Supporting reasoning, not a substitute for the run: `attempt<T>(callback: () => T): Result<T>` (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts:195`) infers `T` as `any` from `createRequire`'s `require`, so both returned expressions are `any` and assignable to `typeof TypeScript | typeof VitestNode`. That is why the shape compiles where the narrowed alias did not. The Orchestrator's own `npm run check` reading settles this claim.

**5. CONFIRMED.** Every `bridged: true` call site sits inside a gated row, each file imports `DIRECTORY_LINKS`, the option's TSDoc names the gate, and no row that passes no `bridged` gained one.

- `tests/setupServer.test.ts:69` under `it.runIf(DIRECTORY_LINKS)` at `:49`, imported at `:7`.
- `tests/src/server/Probe.test.ts:614` under the gate at `:605`, imported at `:31`.
- `tests/src/server/helpers.test.ts:659` and `:664` under one gate at `:650`, imported at `:38`.
- `tests/src/server/stages/TypeStage.test.ts:272` under the gate at `:267`, imported at `:10`.
- TSDoc: `tests/setupServer.ts:191-196`, "A row passing it runs under `DIRECTORY_LINKS`, because the link is a directory link."
- Ungated rows passing no `bridged`: `tests/src/core/errors.test.ts:190`, `tests/src/server/Probe.test.ts:540` and `:563`, `tests/src/server/helpers.test.ts:680` and `:702`. The gated rows in `tests/src/server/stages/RuntimeStage.test.ts:223`, `:269`, `:1429` and the predicate rows in `tests/distribution.test.ts:791`, `:803` are pre-existing; neither file appears in the status.

**6. CONFIRMED.** `tests/src/core/errors.test.ts:188-190` carries the comment's first sentence above one call `writeWorkspaceFixture(bridgeless, { version: '7.0.2' })`; no inline `package.json`, `node_modules/typescript/package.json`, or `node_modules/typescript/index.js` write for `bridgeless` remains (the only `writeWorkspaceFixture` call in the file is `:190`, and the surrounding writes at `:178-185` are the pre-existing `workspace` fixture). The import sits at `:17`, after `../../setup.js` at `:16`. The adoption row at `:237-242` names `'workspace'`, `'malformed'`. The fixture reaches the intended condition: `createScratch` allocates under `tmpdir()` (`node_modules/@orkestrel/test/dist/src/server/index.js:603,610`), so `require('@typescript/typescript6')` from that root cannot reach this checkout's installed bridge and the loader takes the raised-fault path.

**7. CONFIRMED.** The status lists `guides/probe.md`, `package.json`, `package-lock.json`, `src/core/types.ts`, `src/server/Probe.ts`, `src/server/helpers.ts`, `src/server/stages/TypeStage.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/core/errors.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/stages/TypeStage.test.ts`, and the diff carries hunks for exactly those paths and no other. `tmp` is ignored (`/home/user/fleet/probe/.gitignore:11`), so the units' reports raise no untracked entry.

- `tests/setupPolicy.ts`, `tests/distribution.test.ts`, and `tests/guides.test.ts` are absent from the status and from the diff: unchanged.
- `package.json` carries the `@typescript/typescript6` development dependency, the optional peer entry, and the widened `typescript` peer range `^6.0.3 || ^7.0.0` — the landing units' subject, and the range `#support` reads through `collectRangeMajors`.
- `package-lock.json` carries the mirror of those three changes, the `@typescript/typescript6` and aliased `@typescript/old` entries the install adds, and the `libc` row removals recorded as accepted. Nothing else.

## Findings outside the claims

**F1. `src/core/validators.ts:198` — the guard's TSDoc keeps the retired vocabulary.** "Checks whether a value names every resolved tool version" states the account `src/core/types.ts` just replaced, and `guides/probe.md:110` mirrors it under guide parity. Why it matters: the package now describes `Toolchain` two ways, and the guide row and the TSDoc must move together or parity records the drift. `src/core/validators.ts` is outside every unit's owned set in this campaign, so it needs a carrier. What right looks like: one successor unit owning `src/core/validators.ts:198` and `guides/probe.md:110`, both restated as "names every tool version the target workspace's installed manifests publish".

**F2. `tests/setupServer.test.ts:49-63` — the fixture's default shape is proved only where directory links work.** The gate at `:49` covers the whole row, and the row's first half (`:55-63`) asserts the default, bridgeless output: the returned root, the absent bridge and `oxlint` entries, and the loaded `{ version: '7.0.2' }` entry. On a host answering `supportsDirectoryLinks()` false, the fixture every other bridgeless proof depends on goes unexercised. What right looks like: keep the bridged half gated and move `:55-63` into its own ungated `it`.

**F3. `src/server/helpers.ts:438` and `:446` — the overload's return type is unchecked by the compiler.** `attempt(() => require(...))` yields `Result<any>`, so both returned expressions are `any` and the declared `typeof TypeScript` rests on the runtime guard alone; the `unknown` alias documents the intent but constrains nothing about the returned value's type. This is the recorded shape and I raise no required change — record it so a later reader does not mistake the guard for a type-level narrowing of what is returned. The comment at `:432-436` already says as much; keep it whenever either branch moves.

VERDICT: FAIL 1, 2, 3; outside the claims: F1, F2, F3
