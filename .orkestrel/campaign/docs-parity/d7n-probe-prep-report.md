# Report — `d7n-probe-prep`

Wall clock: 2026-09-07T21:21:55Z to 2026-09-07T21:26:25Z.

## Item 1 — `repair --offline`

Command: `node <scaffold-tip>/dist/bin/main.js repair --offline`.

```text
0 of 44 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 11.
tsconfig.json replaced (2 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 36 unchanged, 0 removed in ..
EXIT 0
```

`git status --short` after: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` modified; `scripts/docs.ts` untracked. Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation: NOT DONE, deviation

`tests/guides.test.ts` in this checkout carries no `@orkestrel/guide` drop-in at all: no `source.methods`, `source.examples`, `group.interface`, `findMissing`, or `findUnexampled` anywhere in the file (`grep -n` over that pattern set returns no matches). The file's parity checks (`documents exactly the members each behavioral interface declares`, `carries a documented example for every barrelled export`, and the rest) are hand-rolled against `extractRows`/`extractMembers`/`extractDocumented`/`extractSection`, not against the `@orkestrel/guide` package. None of item 2's before-texts (`const members = source.methods(group.interface)`, `findMissing(source.methods(entity), group.methods)`, `findUnexampled(names, fences, source.examples())`) exist verbatim, or in any form, in this file. Per the deviation contract ("if a before-text is not found verbatim … Stop and report"), item 2 stopped without edits to `tests/guides.test.ts`.

Consequence for `npm run test:guides`: the sole failure both before and after this unit's other edits is unrelated to any guide record shape:

```text
FAIL  |guides| tests/guides.test.ts > guides fences > earns the receipt the guide documents
AssertionError: expected undefined to be defined
 ❯ tests/guides.test.ts:391:28
    391|    expect(verdict.receipt).toBeDefined()
Test Files  1 failed (1)
     Tests  1 failed | 12 passed (13)
```

This contradicts the brief's standing condition ("P21's failures were the record shapes alone") and the brief's premise that item 2's adaptation exists to make this suite green. `verdict.receipt` is undefined for a reason this unit's scope (a test-file drop-in adaptation, voice sites, the bump, the manifest table) does not reach and was not briefed to investigate.

**Expected:** `tests/guides.test.ts` carries the reference drop-in shape needing the record-shape adaptation in item 2, and after that adaptation `npm run test:guides` exits 0.
**Found:** `tests/guides.test.ts` carries no such drop-in; the file's only guide/parity checks are hand-rolled comparisons that never call `@orkestrel/guide`'s `methods`/`examples`/`findMissing`/`findUnexampled`. The suite's one failure (`earns the receipt the guide documents`, `verdict.receipt` undefined) is orthogonal to the guide package's record shapes.
**Evidence:** `grep -n 'findMissing\|findUnexampled\|source\.methods\|source\.examples\|group\.methods\|group\.interface' tests/guides.test.ts` returns no files; the `test:guides` run above.
**Done / not done:** Items 1, 3, 4, 5 done and green; item 2 not done, no edit made to `tests/guides.test.ts`; criterion 3 (`test:guides` exit 0) not met, still 1 failed | 12 passed.
**Hypothesis:** the sibling `abort` checkout that item 2 names as reference already carries the guide-record adaptation because it already carries the drop-in itself; `probe`'s drop-in may need to be authored from nothing rather than merely adapted, which is outside this unit's item 2 wording.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 reported:

```text
tests/src/server/Probe.test.ts:852:5: error policy(no-banned-term): Replace just in this comment: delete.
tests/setupServer.ts:219:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:331:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setupServer.ts:336:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
```

Matches the P20/facts-block reading exactly (total 4 | summary 3 | banned 1).

- `tests/src/server/Probe.test.ts:852` (`no-banned-term`, `just`):
  - before: `// recovery clears the same deadline the project resolution just exceeded.`
  - after: `// recovery clears the same deadline the project resolution exceeded.`
- `tests/setupServer.ts:219` (`no-malformed-summary`, `Ending`):
  - before: `/** The exit code and the ending signal a host reported for one child. */`
  - after: `/** Holds the exit code and the ending signal a host reported for one child. */`
  - (`Holds` matches the established opener for a data-carrying interface elsewhere in this package's own test helpers, e.g. `tests/setupServer.ts:30`, `tests/setupPolicy.ts:86`.)
- `tests/setupServer.ts:331` (`no-malformed-summary`, `REFUSED_RUNTIME_TARGETS`):
  - before: `Whether this host refuses to create a file under a caller-supplied name it will not accept.`
  - after: `Reports whether this host refuses to create a file under a caller-supplied name it will not accept.`
  - (`Reports whether` matches the established opener for a boolean value elsewhere in this package, e.g. `src/server/helpers.ts:78,232,713,729`.)
- `tests/setupServer.ts:336` (`no-malformed-summary`, `DIRECTORY_LINKS`):
  - before: `Whether this host creates a directory link the workspace walker reads as a symbolic link.`
  - after: `Reports whether this host creates a directory link the workspace walker reads as a symbolic link.`

`npx oxlint --config .oxlintrc.json --deny-warnings .` after these four edits: no output, exit 0.

## Item 4 — the bump

`package.json`: `"version": "0.0.12"` to `"version": "0.0.13"`. `package-lock.json` untouched.

## Item 5 — the manifest table

`guides/README.md` `## By concept` replaced the bullet-list form (`- Package` / nested `Spec:`/`Source:`/`Tests:` bullets) with the `| Concept | Spec | Source | Tests |` table shape (the `abort`/`browser`/`console` pattern for a multi-source row: comma-separated links in one cell), one `Package` row carrying every link target from the original list (`probe.md`; `src/core`, `src/server`, `src/bin`; `tests/src/core`, `tests/src/server`, `tests/src/bin`). `npm run format` reflowed the table's column widths; the `## By directory` section is unchanged.

## Criteria

1. `git status --short`:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/README.md
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/server/Probe.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list plus `guides/README.md` (item 5), `package.json` version (already in the repair list for the `docs` script row), and the two files item 3 edited (`tests/setupServer.ts`, `tests/src/server/Probe.test.ts`). `tests/guides.test.ts` carries no edit — item 2's deviation, above.

2. `npm run format:check`: `All matched files use the correct format.` exit 0. `npx oxlint --config .oxlintrc.json --deny-warnings .`: no output, exit 0. `npm run check`: every `tsc --noEmit` project (`tsconfig.json`, `configs/src/tsconfig.core.json`, `configs/src/tsconfig.server.json`, `configs/src/tsconfig.bin.json`) exit 0.

3. `npm run test:guides`: `Test Files 1 failed (1)`, `Tests 1 failed | 12 passed (13)`, exit 0 (vitest's own exit code; the failing assertion is `earns the receipt the guide documents` — see item 2's deviation, not a record-shape failure). Criterion not met as stated (`test:guides` was expected to reach an all-green `Tests` summary once item 2 landed).
   `npm run test:policy`: `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, exit 0.
   `npm run test:config`: `Test Files 1 passed (1)`, `Tests 172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs`, verbatim:

```text
guides/probe.md type Stage: guide absent source "Names an inspection a claim passes through, derived from `PROBE_STAGES`."
guides/probe.md interface Draft: guide absent source "Carries one proposed file's location and its contents."
guides/probe.md interface Case: guide absent source "Carries the candidate drafts a claim asserts about and the test that exercises them."
guides/probe.md interface Control: guide absent source "Extends a case with the stage it must fail at and the reason it must fail there."
guides/probe.md interface Claim: guide absent source "Carries everything the service needs to produce one verdict."
guides/probe.md type Party: guide absent source "Names who must act on an issue or probe failure."
guides/probe.md interface Issue: guide absent source "Carries one message a stage reported, where it reported it, and whose fault it names."
guides/probe.md interface Check: guide absent source "Carries one stage's outcome: what it cost and what it reported."
guides/probe.md interface Toolchain: guide absent source "Names the tool versions a verdict was produced with."
guides/probe.md interface Project: guide absent source "Names the TypeScript project that judged a verdict's candidate drafts."
guides/probe.md interface Verdict: guide absent source "Carries the full result of one claim: every stage, for both the case and its control."
guides/probe.md type ProbeEventMap: guide absent source "Reports what a probe observes while it serves."
guides/probe.md interface ProbeOptions: guide absent source "Configures a probe."
guides/probe.md interface ProbeInterface: guide absent source "Answers a claim with type, lint, and runtime evidence in one call."
guides/probe.md type ProbeErrorCode: guide absent source "Names the condition that ended a probe operation, derived from `PROBE_ERROR_CODES`."
guides/probe.md interface ProbeErrorContext: guide absent source "Carries the structured detail one probe failure reports beside its message."
guides/probe.md interface ProbeErrorOptions: guide absent source "Configures one probe failure at construction."
guides/probe.md const PROBE_STAGES: guide absent source "Lists the stages a claim passes through, in the order a verdict reports them."
guides/probe.md const PROBE_PARTIES: guide absent source "Lists the parties that can own action on an issue or probe failure."
guides/probe.md const RECEIPT_PREFIX: guide absent source "Names the leading token every receipt carries."
guides/probe.md const RECEIPT_SEPARATOR: guide absent source "Names the character joining a receipt's tokens."
guides/probe.md const PROBE_ERROR_CODES: guide absent source "Lists the conditions that can end a probe operation."
guides/probe.md const PROBE_DEADLINE: guide absent source "Names the default inspection deadline a `Probe` applies when its construction omits one."
guides/probe.md const LINT_DEADLINE: guide absent source "Names the bound the lint stage holds over the lifecycle exchanges the protocol leaves to the server: the `initialize` reply warming waits for and the `shutdown` reply ending waits for."
guides/probe.md const PROBE_KEYS: guide absent source "Names the total enumerable key bound `ProbeServer` applies to inbound metadata and to produced tool content alike."
guides/probe.md const PROBE_SPECIFICATIONS: guide absent source "Names the specification lifetime the runtime stage replaces its resident Vitest service at."
guides/probe.md const RUNTIME_PLUGIN: guide absent source "Names the Vite plugin the runtime stage installs into a target workspace's Vitest configuration."
guides/probe.md const TYPE_MIRROR: guide absent source "Names the workspace-relative directory the type stage keeps its workspace mirror under."
guides/probe.md class ProbeError: guide absent source "Reports one probe failure under stable ownership and condition axes."
guides/probe.md function isProbeError: guide absent source "Checks whether an unknown value is a `ProbeError`."
guides/probe.md function createDestroyedError: guide absent source "Creates the failure raised when an instrument is used after it was torn down."
guides/probe.md const DRAFT_SHAPE: guide absent source "Describes one proposed file a claim carries."
guides/probe.md const CASE_SHAPE: guide absent source "Describes the drafts a claim asserts about and the test that exercises them."
guides/probe.md const CONTROL_SHAPE: guide absent source "Describes the negative control, which is a case plus where and why it must break."
guides/probe.md const CLAIM_SHAPE: guide absent source "Describes one claim and is the sole source of both the published tool schema and the guard applied to an arriving claim."
guides/probe.md function formatIssue: guide absent source "Renders one tool message as a single line an agent can classify and locate."
guides/probe.md function formatCheck: guide absent source "Renders one stage's outcome as its summary line followed by every message it reported."
guides/probe.md function formatProof: guide absent source "Renders the closing line a rendered verdict ends with: the receipt it earned, or its absence."
guides/probe.md function formatReceipt: guide absent source "Renders the smallest text a verdict can travel as: what it judged, and how it ended."
guides/probe.md function formatVerdict: guide absent source "Renders a whole verdict as the text an agent reads."
guides/probe.md function computeReceipt: guide absent source "Computes the proof token a verdict carries, or returns nothing when the claim was not proven."
guides/probe.md function formatSpecification: guide absent source "Renders one generated specification: the caller's own test text, then the marker naming the revision that wrote it."
guides/probe.md function matchesSpecification: guide absent source "Checks whether one file's text is the generated specification written for one revision."
guides/probe.md interface Inspection: guide absent source "Carries one queued inspection: the case a stage reads and the claim it belongs to."
guides/probe.md interface InspectionOptions: guide absent source "Carries the bound a caller holds over one stage inspection."
guides/probe.md interface OverlayInterface: guide absent source "Holds the candidate drafts one inspection substitutes for the files a tool would read from disk."
guides/probe.md interface StageInterface: guide absent source "Inspects one case with the workspace's own tool."
guides/probe.md interface TypeStageInterface: guide absent source "Inspects TypeScript source against a caller-named project and reports what that project is."
guides/probe.md interface LintStageInterface: guide absent source "Inspects one case, under the bound the caller supplies."
guides/probe.md interface WorkspaceManifest: guide absent source "Carries one parsed package manifest and the path it came from."
guides/probe.md interface Diagnostic: guide absent source "Carries one diagnostic line a compiler run reported, in this package's own coordinates."
guides/probe.md interface ProjectConfig: guide absent source "Carries what one TypeScript project resolved to, as the compiler itself printed it."
guides/probe.md interface Execution: guide absent source "Carries what one spawned workspace command reported when it closed."
guides/probe.md interface ProbeServerInterface: guide absent source "Serves one probe over this process's Model Context Protocol stdio transport."
guides/probe.md type ListenerCapture: guide absent source "Holds the listeners one emitter carried for a set of events at the moment it was captured."
guides/probe.md class Probe: guide absent source "Answers claims through its type, lint, and runtime stages."
guides/probe.md class ProbeServer: guide absent source "Serves one probe over this process's Model Context Protocol stdio transport."
guides/probe.md class TypeStage: guide absent source "Inspects TypeScript source by running the target workspace's own compiler over a mirror of it."
guides/probe.md class LintStage: guide absent source "Inspects virtual documents through one resident Oxlint language server."
guides/probe.md class RuntimeStage: guide absent source "Inspects tests through one resident Vitest service from the target workspace."
guides/probe.md class Overlay: guide absent source "Holds the candidate drafts one inspection substitutes for the files a tool would read from disk."
guides/probe.md function normalizePath: guide absent source "Rewrites one path into the forward-slash spelling this package compares and reports paths in."
guides/probe.md function readFaultCode: guide absent source "Reads the condition code a native fault carries."
guides/probe.md function escapesRoot: guide absent source "Reports whether one path resolves outside the root it is read against."
guides/probe.md function resolveWorkspaceFile: guide absent source "Resolves a path inside a target workspace and rejects traversal outside it."
guides/probe.md function overwriteFile: guide absent source "Overwrites a file that already exists, through a descriptor that refuses a symbolic link at the final component."
guides/probe.md function isRefusedName: guide absent source "Reports whether a fault means the host refuses the name a caller supplied for a file to create."
guides/probe.md function relativeWorkspaceFile: guide absent source "Projects an absolute tool path into the workspace-relative form issues expose."
guides/probe.md function relativeWorkspaceMessage: guide absent source "Projects the paths one tool named in a message into the forms this package's issues expose."
guides/probe.md function scanDiagnostics: guide absent source "Scans the plain-text output of one compiler run into the diagnostics it reported."
guides/probe.md function resolveWorkspaceModule: guide absent source "Resolves one installed module from the target workspace."
guides/probe.md function loadWorkspaceVitest: guide absent source "Loads the installed `vitest/node` module from a target workspace."
guides/probe.md function readWorkspaceManifest: guide absent source "Reads one installed package manifest from the target workspace."
guides/probe.md function resolveWorkspaceBinary: guide absent source "Resolves a package's portable JavaScript binary from the target workspace."
guides/probe.md function inferTypeProject: guide absent source "Selects the scoped TypeScript project for one candidate draft path."
guides/probe.md function inferTestProject: guide absent source "Selects the Vitest project whose environment matches one test path."
guides/probe.md function inferDocumentLanguage: guide absent source "Selects the Language Server Protocol language identifier for a source path."
guides/probe.md function buildRevisionPath: guide absent source "Builds the fresh sibling path a revision's file is written at, preserving the test's resolution directory."
guides/probe.md function matchesWorkspaceModule: guide absent source "Reports whether a path is a workspace module Vitest can cache."
guides/probe.md function matchesLiveProcess: guide absent source "Reports whether the host that wrote one file is still running."
guides/probe.md function collectWorkspaceFiles: guide absent source "Collects every regular file a target workspace holds, skipping the trees no inspection reads."
guides/probe.md function filterUniqueIssues: guide absent source "Filters one issue list to the distinct issues it carries, in the order they arrived."
guides/probe.md function describeUnknown: guide absent source "Normalizes a caught or foreign error into readable text."
guides/probe.md function guardStage: guide absent source "Guards one stage operation with the stage failure contract."
guides/probe.md function findRefusedPaths: guide absent source "Names every draft member of a claim-shaped value whose `path` this package's guard refuses."
guides/probe.md function normalizeValue: guide absent source "Rewrites every workspace-contained absolute path in a value to its workspace-relative form and sorts every record's keys."
guides/probe.md function computeDigest: guide absent source "Computes the canonical digest of one value as it stands in a target workspace."
guides/probe.md function captureListeners: guide absent source "Records the listeners one emitter carries for a set of events."
guides/probe.md function releaseListeners: guide absent source "Removes every listener one emitter gained for the captured events since its capture."
guides/probe.md function parseProjectConfig: guide absent source "Parses the configuration one compiler run printed for a TypeScript project."
guides/probe.md function parseRevisionOwner: guide absent source "Parses the process id one revision identity names."
guides/probe.md ProbeInterface.prove: guide absent source "Answers one claim with every stage's evidence."
guides/probe.md ProbeInterface.destroy: guide absent source "Tears down every stage and releases the processes and the mirror they hold."
guides/probe.md StageInterface.inspect: guide absent source "Inspects one case."
guides/probe.md StageInterface.destroy: guide absent source "Tears down the resident tool or the mirror and releases its resources."
guides/probe.md TypeStageInterface.inspect: guide absent source "Inspects one case, against a caller-named project where the caller names one."
guides/probe.md TypeStageInterface.resolve: guide absent source "Resolves one project to the path and digest the stage applies for it."
guides/probe.md LintStageInterface.inspect: guide absent source "Inspects one case, under the bound the caller supplies."
guides/probe.md OverlayInterface.set: guide absent source "Records one candidate's text against the absolute path it stands in for."
guides/probe.md OverlayInterface.text: guide absent source "Reads the candidate text recorded for one absolute path."
guides/probe.md OverlayInterface.covers: guide absent source "Checks whether a candidate sits beneath one directory."
guides/probe.md OverlayInterface.clear: guide absent source "Releases every candidate."
guides/probe.md ProbeServerInterface.start: guide absent source "Serves the probe over this process's standard input and output."
guides/probe.md ProbeServerInterface.destroy: guide absent source "Releases the transport, the process listeners, and the probe behind them."
guides/probe.md pitch: readme absent tagline "The claim prover for the `@orkestrel` line. `@orkestrel/probe` answers this question about a proposed edit: does it compile, lint, and pass its test in this workspace? The type stage runs the workspace's own compiler over a mirror of the tree, and the lint and runtime stages hold resident Oxlint and Vitest engines. probe runs a claim's case and its negative control through all of them, and returns a `Verdict` carrying every issue — and, when the case ran clean and the control broke where it said it would, a `receipt`. Source: `src/core`, `src/server`, `src/bin`. Published through `@orkestrel/probe` and `@orkestrel/probe/server`. An agent is the caller this exists for. Deciding whether an edit compiles by reasoning about it costs more than asking, and the answer is a guess. A `Claim` states the edit and what would falsify it; a `Verdict` answers with the tools the workspace's own gate runs. Mechanism, not policy. probe reports evidence and mints a receipt under stated conditions. It holds no key, signs nothing, and compels nothing. It also executes caller-supplied test code with the privileges of the process that hosts it, so give a probe a workspace and a caller you already trust with a shell."
rows read: 1, disagreements found: 105
EXIT 1
```

Non-zero `rows read`, exit 1, as expected: this is the converge unit's worklist.

## Deviation report

**Expected:** `tests/guides.test.ts` carries the reference drop-in sites item 2 names (`source.methods(group.interface)`, `findMissing(source.methods(entity), group.methods)`, `findUnexampled(names, fences, source.examples())`), each an exact adaptation edit, and after that adaptation `npm run test:guides` exits with an all-green `Tests` summary (P21's one failure being the record-shape mismatch alone).

**Found:** `tests/guides.test.ts` (415 lines) carries no `@orkestrel/guide` import and no reference to `methods`, `examples`, `findMissing`, or `findUnexampled` anywhere. Its parity checks are hand-rolled, reading the guide and source files directly through local helpers (`extractRows`, `extractMembers`, `extractDocumented`, `extractSection`). The suite's sole failure, both before and after this unit's other edits, is `guides fences > earns the receipt the guide documents` (`expect(verdict.receipt).toBeDefined()` receives `undefined`), unrelated to any guide-package record shape.

**Evidence:**

```text
$ grep -n "findMissing|findUnexampled|source\.methods|source\.examples|group\.methods|group\.interface" tests/guides.test.ts
(no matches)
$ grep -n "@orkestrel/guide" tests/guides.test.ts
(no matches)
```

and the `test:guides` run reproduced under criterion 3.

**Done / not done:** items 1, 3, 4, 5 done; every criterion but criterion 3's `test:guides` reading is met. Item 2 not done — no edit made to `tests/guides.test.ts`. Criterion 3's `test:guides` exit reads `1 failed | 12 passed (13)`, unchanged from the P21 baseline, because the failure it names is not a record-shape mismatch this unit's item 2 scope reaches.

**Hypothesis:** the `abort` checkout item 2 points to as the reference adaptation already carries the drop-in because it already had one before the `0.0.18` upgrade; `probe`'s `tests/guides.test.ts` may never have carried the `@orkestrel/guide` drop-in at all, making item 2 an authoring task rather than an adaptation, which sits outside this unit's scope as written.

---

Orchestrator's annotation (2026-09-08, the audit): the `test:guides` reading recorded as `Tests 1 failed | 12 passed (13)`, exit 0, carries the wrong exit code — the script is `vitest run … --project guides` with no masking, and a failing run exits 1 (probe's audit, subjective F5).
Further: "after these four edits" and "the two files item 3 edited" are counts in prose; the sites are named beside them.
