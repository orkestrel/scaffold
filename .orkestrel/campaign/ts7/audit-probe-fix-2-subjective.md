<!-- workflow wf_742cd5c9-418, agent aeb02ec727dc82bf7, captured from journal.jsonl -->

**Lane held: subjective** (design fit, guide voice, vocabulary, test names). Objective questions are referred, not adjudicated.

## Per-claim verdicts

**1. The nine edits read at their sites; every amended sentence obeys the writing law — REFUTED (second clause).**

Sites, read in `/home/user/fleet/probe`: edit 1 at `src/core/types.ts:231` ("Names the tool versions the target workspace's own manifests publish."), edit 2 at `guides/probe.md:456`, edit 3 at `src/server/Probe.ts:687` ("is the case the `^7.0.0` term admits." — `package.json:120` declares `"typescript": "^6.0.3 || ^7.0.0"`, so the named term exists), edit 4 at `tests/src/core/errors.test.ts:188-190` with the sorted import at `:17`, edit 5 at `src/core/types.ts:248-253`, edit 6 at `guides/probe.md:212`, edit 7 at `guides/probe.md:662-665` (wrapped under 100 columns), edit 9 at `tests/setupServer.ts:193-194` and the four gated rows. Edit 8's site reads its recorded successor's shape (`src/server/helpers.ts:445-446`), which the audit brief's § Subject accounts for.

The writing clause fails at `guides/probe.md:456`:

```
  own dependencies, and reports the versions those manifests publish on `Verdict.toolchain`. A verdict predicts
```

The only manifest the sentence names is "the target workspace's `package.json`" (line 455), singular — and that file publishes ranges, not tool versions. The demonstrative "those manifests" therefore points at a referent that makes the sentence false, and the reader has to supply "each tool's own manifest" from a different section. That breaks `.claude/rules/writing.md` § Sentence and paragraph order ("Name the noun after `this`, `these`, or `it` wherever the reader could attach the pronoun to another referent") and `AGENTS.md` § Writing ("Word every sentence so the reader understands it on the first read"). Right looks like: "…never from its own dependencies, and reports the version each tool's own manifest publishes on `Verdict.toolchain`." Secondary: the amended line runs past 110 columns where its neighbours (455, 457) wrap near 99, because edit 2 replaced text without the rewrap edit 7 was given.

**2. The `Toolchain` doc block states one account, made true by `Probe.#version` — CONFIRMED.**

`src/core/types.ts:231` (summary), `:236-237` (`@remarks`: "Every member names the version that tool's own manifest publishes in the target workspace"), and `:248`, `:250`, `:252` (members) all locate the version in a manifest inside the target workspace rather than in the module a stage loaded; the `@remarks` bridged paragraph at `:237-240` holds that reading against the bridged case rather than contradicting it. `src/server/Probe.ts:96-99` builds all three members from `#version`, and `#version` at `:642-653` reads `readWorkspaceManifest(this.#workspace, name).contents.version`, which resolves `<name>/package.json` from the workspace root (`src/server/helpers.ts:474-477`, `:370-373`). True for `typescript`, `oxlint`, and `vitest` alike. See finding F4 on the members' spelling.

**3. The guide states that same account at the four named sites, with no sentence left in the "resolved versions the stage ran" vocabulary; the `loadWorkspaceModule` `cause` clause is true — REFUTED.**

- Surface row `guides/probe.md:43` states the account precisely ("the versions each tool's own manifest publishes in the target workspace, read from those manifests rather than from the module a stage loaded"), and the bridge bullet closes on the same account at `:478-481`.
- The prerequisite bullet `:454-457` does not state the account: it names only the workspace's `package.json` and then defers to "those manifests" (see claim 1).
- The receipt grammar bullet `:663` states a third spelling — "Each version is the one the target workspace's manifest publishes" — singular, and without "each tool's own", immediately after naming three tool fields. A reader takes it as one manifest, which is the reading the Surface row exists to rule out.
- The old vocabulary survives at `:110`: "`isToolchain` … Admits a record carrying every resolved tool version." That row sits on the same page as `:43`'s "read from those manifests rather than from the module a stage loaded", so the guide contradicts its own term.
- The `cause` clause at `:212` ("carrying the native fault as `cause` where one was raised") is true: `src/server/helpers.ts:454-455` omits `cause` when `bridged.success`, which is the bridge that loads and cannot serve.

**4. The loader's two branches read one shape and `check` is green — UNRESOLVED.**

The shape is confirmed by reading: `src/server/helpers.ts:431` and `:445` each annotate the alias `unknown`, `:438` and `:446` return `outcome.value` and `bridged.value`, no `as` appears in the function, and the comment at `:432-436` states why ("because the guard narrows the alias to a record carrying `createProgram` rather than to the compiler's module type the overloads return"). The gate half rests only on the `ts7-probe-fix-3` unit's own report; a writer's report is a claim, and I run no command.

**5. Every `bridged: true` row is gated, the import is present, the TSDoc names the gate, no ungated row gained it — CONFIRMED.**

`tests/setupServer.test.ts:49`/`:69`, `tests/src/server/Probe.test.ts:605`/`:614`, `tests/src/server/helpers.test.ts:650`/`:659`/`:664` (one gate over the row carrying both fixture calls), `tests/src/server/stages/TypeStage.test.ts:267`/`:272`. Imports at `tests/setupServer.test.ts:7`, `Probe.test.ts:31`, `helpers.test.ts:38`, `TypeStage.test.ts:10`. TSDoc sentence at `tests/setupServer.ts:193-194`. The only other `it.runIf(DIRECTORY_LINKS)` rows are `tests/src/server/stages/RuntimeStage.test.ts:223`, `:269`, `:1429`, in a file the status output does not list as modified. The gated rows are named for what they prove, not for the gate — `'takes the workspace compiler where it carries the API and the bridge where it does not'`, `'inspects through the bridge where the workspace compiler carries no API'`, `'serves a workspace at every major its own peer range names'`.

**6. The bridgeless workspace is built by the fixture call, and its adoption row still names `workspace`/`malformed` — CONFIRMED.**

`tests/src/core/errors.test.ts:188-190` carries the comment's first sentence above one `writeWorkspaceFixture(bridgeless, { version: '7.0.2' })` call, with no inline writes left; the drive at `:237-241` reads `['a compiler carrying no in-process API beside no bridge', 'workspace', 'malformed', () => loadWorkspaceModule(bridgeless.path, 'typescript')]`. `tests/setupServer.ts:229-238` writes that workspace with `createProgram` absent by default, which is the shape the row needs.

**7. No file outside the units' owned sets changed — UNRESOLVED.**

Mechanical scope conformance over the whole diff is the checker's and the objective lane's subject, and I cannot attribute `src/server/stages/TypeStage.ts`, `package.json`, or `package-lock.json` to a landing unit from the evidence in my slice.

## Findings outside the claims

**F1. `src/core/validators.ts:198` — the source of the guide's stale row.** "Checks whether a value names every resolved tool version." This is the sentence `guides/probe.md:110` mirrors, so the campaign's vocabulary sweep stopped one file short and the guide row cannot be fixed alone without breaking voice parity. Why it matters: the term the campaign retired survives at the public guard that admits a `Toolchain`, which is where a consumer meets the concept second. Right looks like: "Checks whether a value names a version for every tool." — with `guides/probe.md:110` restated to match.

**F2. `tests/setupServer.ts:193-194` — the TSDoc sentence names a constant where the reader needs the gate.** "Default: `false`. A row passing it runs under `DIRECTORY_LINKS`, because the link is a directory link." The pronoun "it" sits one clause after `false` and can attach there, and `DIRECTORY_LINKS` is a boolean, not something a row runs "under" — the row is gated with `it.runIf(DIRECTORY_LINKS)`. Why it matters: this sentence is the only place the fixture tells a test author what passing `bridged` obliges, so an author who misreads it writes an ungated row. Right looks like: "A row passing `bridged` is gated with `it.runIf(DIRECTORY_LINKS)`, because the link is a directory link."

**F3. Referral to the Orchestrator (objective lane is not running): `tests/setupServer.test.ts:49`.** The gate retires the whole row, and lines 54-62 of that row prove the fixture's default, link-free shape — the bare TypeScript 7 workspace, the absent bridge and `oxlint` directories, and the loaded entry's `{ version: '7.0.2' }`. On a host without directory links, the writer's default shape loses its only proof, while the assertions that need the link are at `:65-78`. Whether that coverage loss is acceptable, or the row splits at the `equipped` fixture, is a test-sufficiency ruling I do not make.

**F4. Observation on claim 2's spelling.** The `Toolchain` members (`src/core/types.ts:248`, `:250`, `:252`) say "the target workspace's own manifest publishes" while the `@remarks` two lines earlier says "that tool's own manifest publishes in the target workspace", and `guides/probe.md:43` uses the second form. The member spelling admits the reading "the workspace's `package.json`", which `guides/probe.md:455` actively reinforces. One account, three spellings; settling on the `@remarks` form in all of them would close the whole family with F1's row and claim 1's and claim 3's sites.

VERDICT: FAIL 1, 3; outside the claims: F1, F2, F3
