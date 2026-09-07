# Brief — P.2 `d7n-probe-converge` (probe under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/probe` from the committed baseline `1c150f6` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the voice sites fixed; version `0.0.13`; the drop-in NOT present — see § Standing conditions found at P.1). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/probe.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/probe/guides/probe.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-probe-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/probe.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/probe.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/probe.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.
- **probe's suite** keeps its hand-rolled proofs and gains the three cases and a `manifest lists at least one guide` assertion (ruling 7); P.1 turned `## By concept` into the table `parseManifest` reads.
- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

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
guides/probe.md interface LintStageInterface: guide absent source "Inspects one case under a bound the caller supplies."
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
exit 1
```

## Facts for probe (taken 2026-09-07T21:28Z by facts.sh)

- Checkout `/home/user/fleet/probe`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `1c150f6`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 4 | summary 3 | banned 1 | tests/setupServer.ts(3) tests/src/server/Probe.test.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    5:| Concept | Spec                   | Source                                                                            | Tests                                                                                                                 |
    6:| ------- | ---------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
    7:| Package | [`probe.md`](probe.md) | [`src/core`](../src/core), [`src/server`](../src/server), [`src/bin`](../src/bin) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server), [`tests/src/bin`](../tests/src/bin) |
- Guide `guides/probe.md`: 1122 lines. Headings:
    1:# Probe
    27:## Surface
    29:### Contracts
    54:### Constants
    72:### Errors
    83:### Shapes
    97:### Validators
    116:### Formatters and the token
    131:### Server contracts
    164:### The engine
    194:### Server helpers
    229:### Server parsers
    239:## Methods
    243:#### `ProbeInterface`
    250:#### `StageInterface`
    257:#### `TypeStageInterface`
    264:#### `LintStageInterface`
    270:#### `OverlayInterface`
    279:#### `ProbeServerInterface`
    286:## What a probe proves
    374:## Failures
    437:## Prerequisites
    485:## Registering the server
    591:## The claim that earns a receipt
    649:## Reading a receipt
    690:## What a receipt does not vouch for
    742:## What containment reaches
    811:## What the lint stage does not see
    826:## How the lint stage speaks the protocol
    873:## What the runtime overlay serves
    908:## Lifecycle
    1043:## Cost
    1079:## Tests
    1112:## See also
- Table headers in `guides/probe.md` (a header row is the row before a `| ---` row):
    34: | Name                | Kind      | Shape / Purpose                                                                                                                                                                                                                                                                                                                         |
    58: | Name                   | Kind  | Value / Purpose                                                                                                            |
    77: | Name                   | Kind     | Signature                                           | Behavior                                                                                                                                  |
    90: | Name            | Kind  | Describes                                                                               |
    102: | Name          | Kind     | Signature                                | Behavior                                                                                                                                                       |
    120: | Name                   | Kind     | Signature                                                 | Behavior                                                                                                                                                                                                |
    135: | Name                   | Kind      | Shape / Purpose                                                                                                                                                                                                                                                                                                                                                                                              |
    168: | Name           | Kind  | Implements             | Purpose                                                                                                                                                                                                                                                                     |
    198: | Name                       | Kind     | Signature                                                               | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
    234: | Name                 | Kind     | Signature                                      | Behavior                                                                                                                                                                                                             |
    245: | Method    | Returns            | Behavior                                                                                                                                                   |
    252: | Method    | Returns          | Behavior                                                                                                                                                                                   |
    259: | Method    | Returns            | Behavior                                                                                                                                                                                                                                                                     |
    266: | Method    | Returns          | Behavior                                                                                                                                                                                                                 |
    272: | Method   | Returns               | Behavior                                                                                                                                                                  |
    281: | Method    | Returns         | Behavior                                                                                                                                                                                                |
    405: | Party        | Code        | Raised when                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
    1051: | What                                                                     | Measured                     |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/probe.md`):
    3: > **The claim prover for the `@orkestrel` line.** `@orkestrel/probe` answers this question about a
    4: > proposed edit: does it compile, lint, and pass its test in this workspace? The type stage runs
    5: > the workspace's own compiler over a mirror of the tree, and the lint and runtime stages hold
    6: > resident Oxlint and Vitest engines. probe runs a claim's case and its negative control through
    7: > all of them, and returns a `Verdict` carrying every issue — and, when the case ran clean and the
    8: > control broke where it said it would, a `receipt`. Source: [`src/core`](../src/core),
    9: > [`src/server`](../src/server), [`src/bin`](../src/bin). Published through `@orkestrel/probe` and
    10: > `@orkestrel/probe/server`.
    11: >
    12: > **An agent is the caller this exists for.** Deciding whether an edit compiles by reasoning about
    13: > it costs more than asking, and the answer is a guess. A `Claim` states the edit and what would
    14: > falsify it; a `Verdict` answers with the tools the workspace's own gate runs.
    15: >
    16: > **Mechanism, not policy.** probe reports evidence and mints a receipt under stated conditions. It
    17: > holds no key, signs nothing, and compels nothing. It also **executes caller-supplied test code
    18: > with the privileges of the process that hosts it**, so give a probe a workspace and a caller you
    19: > already trust with a shell.
- Opening prose after the blockquote (first two lines):
    21: A `Claim`, a `Verdict`, and a `receipt` carry the package. A `Claim` is the question: a case, a
    22: control that must break, and the TypeScript project both are judged under. A `Verdict` is the
- README (`README.md`) first lines:
    # @orkestrel/probe
    
    Prove a claim about a code change with type, lint, and runtime evidence, from the workspace's own
    TypeScript, Oxlint, and Vitest.
    
    A claim carries a `case` — the edit you believe is correct — and a `control`, the same edit
    deliberately broken, naming the stage it must fail at. `prove` runs every stage over the case and
    the control and returns a `Verdict`. When the case ran clean and the control broke where it said it
    would, the verdict carries a `receipt`: a one-line token naming the claim, the stage, the tool
    versions, and the TypeScript project that judged the candidates.
    
    Read [`guides/probe.md`](guides/probe.md) before you make a claim. It states the prerequisites, the
- `## Patterns` fences, each with its nearest preceding heading:
    385: fence under "## Failures"
    490: fence under "## Registering the server"
    595: fence under "## The claim that earns a receipt"
    653: fence under "## Reading a receipt"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/errors.ts:106:export function createDestroyedError(subject: string): ProbeError {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/stages/TypeStage.ts:77:export class TypeStage implements TypeStageInterface {
    src/server/stages/LintStage.ts:54:export class LintStage implements LintStageInterface {
    src/server/stages/RuntimeStage.ts:111:export class RuntimeStage implements StageInterface {
    src/server/Overlay.ts:30:export class Overlay implements OverlayInterface {
    src/server/Probe.ts:63:export class Probe implements ProbeInterface {
    src/server/ProbeServer.ts:51:export class ProbeServer implements ProbeServerInterface {
    src/core/errors.ts:28:export class ProbeError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/stages/TypeStage.ts:1
    src/server/stages/LintStage.ts:1
    src/server/stages/RuntimeStage.ts:1
    src/server/helpers.ts:28
    src/server/Overlay.ts:1
    src/server/Probe.ts:1
    src/server/ProbeServer.ts:1
    src/server/parsers.ts:2
    src/server/types.ts:12
    src/core/shapers.ts:4
    src/core/validators.ts:11
    src/core/helpers.ts:8
    src/core/constants.ts:11
    src/core/types.ts:17
    src/core/errors.ts:3
- Drop-in sites (`tests/guides.test.ts`):
- `## Tests` paragraph naming checks: 1079:## Tests — 0 lines naming a check or a code

## Standing conditions found at P.1 (the Orchestrator, 2026-09-07T21:30Z) — two items that precede the items that follow

The P.1 unit stopped on item 2 (`d7n-probe-prep-report.md` § Item 2): `tests/guides.test.ts` in this checkout carries no `@orkestrel/guide` drop-in at all. Its parity checks are hand-rolled (`extractRows`, `extractMembers`, `extractDocumented`, `extractSection` over the guide text and `src/**/types.ts`), so the sentence in § Role and engine that reads "the drop-in adapted to the record shapes" is false for probe, and every item that follows which says "the drop-in" means the file this unit writes first. Read `/home/user/fleet/probe/tests/guides.test.ts` whole before anything else.

0a. **Install the drop-in from the pilot (Rulings 11, 13, and 20).** `tests/guides.test.ts` becomes the pilot's file `/home/user/fleet/abort/tests/guides.test.ts` outside its constants block: the header comment (line 2 reads "The constants that follow are this package's own"), the constants adapted to probe (`GUIDE_SPEC` `'guides/probe.md'`; `MODULES` mapping `@orkestrel/probe` to `src/core`, `@orkestrel/probe/server` to `src/server`, `@src/core` to `src/core`, and `@src/server` to `src/server` — read a two-face sibling's map at `/home/user/fleet/server/tests/guides.test.ts` or `/home/user/fleet/sea/tests/guides.test.ts` for the exact form; `INTERNAL` `[]` with the pilot's doc block; `ROOT_FILES` with `README.md`), then the region from `const root = new URL('../', import.meta.url)` through the manifest loop's closing brace byte for byte (`/Interface$/` with no flag; the manifest assertion, the pin, the README case, the equality case inside the loop's `describe` after the methods loop, the examples case). After it, probe's own executed section: keep `describe('guides fences')` as this package's own cases (the claim transcription, the constants case, the digest case, `earns the receipt the guide documents`), the way the pilot keeps `describe('flagship fences')`. Rule on each case of the hand-rolled `describe('guides parity')`: drop a case the drop-in proves (every export documented and every documented name published, the members per interface, an example per barrelled export, the stranded-declaration sweep, the barrel resolution) and keep, appended inside `guides fences` or as a third `describe`, a case the drop-in does not cover (`names the guard the tool actually applies to an arriving claim`, `ships registry metadata and a README that are not the scaffold default`, `publishes exactly the members each implementation declares it implements` if no drop-in case reads it). Delete a helper only its dropped cases used. Record each ruling in the report.

0b. **The flagship claim earns its receipt under the vendored lint policy.** The Orchestrator proved the guide's claim through the build (`/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/probe-receipt/prove.mjs`, `new Probe({ workspace, deadline: 120_000 }).prove(CLAIM)`): the case's type and runtime stages pass and its lint stage reports one issue on `src/core/greeting.ts` — `Move this module data to constants.ts or another data-kind file.` — so `prove` returns no receipt and `earns the receipt the guide documents` reads red at the baseline (`Tests 1 failed | 12 passed (13)` in the P.1 report). The vendored policy is right and the claim adapts: a case file the policy admits, such as a function (`export function greet(): string {\n\treturn 'hi'\n}\n`, the control `export function greet(): number {\n\treturn 'hi'\n}\n`, the test importing `greet` and asserting `greet()`), with the control's reason reworded to what it proves ("a string returned as a number must not compile" or your own sentence), at every site that carries the claim as the thing a reader runs: the guide's fence (`guides/probe.md:600-612`) and its verdict sample (`:621-622`, the digest and the receipt read from a live run, the receipt's project digest included), the `Claim` contract's `@example` (`src/core/types.ts:51`), and the test's `CLAIM` and `DIGEST` (take the digest from the run, the way the digest case reads it). Run the claim through the build first (copy the Orchestrator's instrument into `tmp/d7n-probe-converge/` and edit the claim there) so the receipt is in hand before the sites change; the `Draft` example at `src/core/types.ts:29`, `isDraft` at `src/core/validators.ts:56`, and the overlay examples at `src/server/Overlay.ts:25` and `src/server/types.ts:147` illustrate a draft rather than a claim the tool runs and stay as they are unless an item below reaches their block. Acceptance adds: `npm run test:guides` exit 0 with `earns the receipt the guide documents` green, the reading quoted.

## Standing conditions

- Put every instrument you write under `tmp/d7n-probe-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/probe.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/probe.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-probe-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
