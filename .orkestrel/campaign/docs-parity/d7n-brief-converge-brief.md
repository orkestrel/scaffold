# Brief — P.2 `d7n-brief-converge` (brief under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/brief` from the committed baseline `d8f2de0` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.8`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/brief.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/brief/guides/brief.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-brief-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/brief.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/brief.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/brief.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/brief.md type TaskOperation: guide absent source "Names the closed vocabulary of what a brief asks for."
guides/brief.md type TaskDomain: guide absent source "Names the closed vocabulary of the subject matter a brief operates on."
guides/brief.md type OutputFormat: guide absent source "Names the closed vocabulary of deliverable shapes."
guides/brief.md type RiskSeverity: guide absent source "Names the closed vocabulary of risk severities."
guides/brief.md type BriefStage: guide absent source "Names the fixed compilation phases, in pipeline order."
guides/brief.md type BriefErrorCode: guide absent source "Names the machine-readable reasons a `BriefError` carries."
guides/brief.md interface Task: guide absent source "States what the brief asks for, in one imperative sentence."
guides/brief.md interface Reference: guide absent source "Represents one referenced path and why it is listed."
guides/brief.md interface Manifest: guide absent source "Represents the disjoint file partitions of a brief."
guides/brief.md interface Outcome: guide absent source "Represents one ranked outcome — a result, never a step."
guides/brief.md interface Given: guide absent source "Represents one context fact handed to the executor — a convention, a version, a constraint value."
guides/brief.md interface Example: guide absent source "Represents one input to output exemplar — the ambiguity remover that leaves the least to interpret."
guides/brief.md interface Citation: guide absent source "Represents one external source — what it is called, where it lives, and why it is cited."
guides/brief.md interface Gap: guide absent source "Represents one unknown the brief has not resolved."
guides/brief.md interface Risk: guide absent source "Represents one pre-empted risk and the mitigation that answers it."
guides/brief.md interface Output: guide absent source "Represents the closed shape of the deliverable."
guides/brief.md interface Proof: guide absent source "Represents one mechanical, transcript-provable check."
guides/brief.md interface Brief: guide absent source "Represents the closed execution contract — a rough request with every implicit decision resolved."
guides/brief.md interface BriefInput: guide absent source "Represents one `compile()` input."
guides/brief.md interface Briefing: guide absent source "Represents the full, replayable outcome of one `compile()` call."
guides/brief.md interface Dispatch: guide absent source "Represents the subagent projection of a brief."
guides/brief.md interface InterpretStageRecord: guide absent source "Records the `interpret` phase snapshot — raw text in, an `Interpretation` out."
guides/brief.md interface DraftStageRecord: guide absent source "Records the `draft` phase snapshot — the caller's input in, an unpinned `Brief` out."
guides/brief.md interface GateStageRecord: guide absent source "Records the `gate` phase snapshot — the readiness `Subject` in, the reasoner's verdict out."
guides/brief.md interface PinStageRecord: guide absent source "Records the `pin` phase snapshot — the drafted `Brief` in, the pinned `Brief` out."
guides/brief.md type BriefStageRecord: guide absent source "Represents one pipeline phase, discriminated by `stage`."
guides/brief.md interface BriefStageFailure: guide absent source "Represents a visible marker for a phase that failed."
guides/brief.md interface BriefRecord: guide absent source "Represents a versioned, content-hashed `Brief` inside a `BriefManagerInterface`."
guides/brief.md type BriefCompilerEventMap: guide absent source "Declares the `BriefCompiler`'s push observation surface."
guides/brief.md interface BriefCompilerOptions: guide absent source "Represents the input to `createBriefCompiler`."
guides/brief.md interface BriefCompilerInterface: guide absent source "Declares the compilation orchestrator contract."
guides/brief.md type BriefManagerEventMap: guide absent source "Declares the `BriefManager`'s push observation surface."
guides/brief.md interface BriefManagerOptions: guide absent source "Represents the input to `createBriefManager`."
guides/brief.md interface BriefManagerInterface: guide absent source "Declares the brief registry contract."
guides/brief.md const TASK_OPERATIONS: guide "The `TaskOperation` values, frozen — compose with `literalOf(…)` / `parseEnum(…)`." source "Lists the `TaskOperation` values, frozen."
guides/brief.md const TASK_DOMAINS: guide "The `TaskDomain` values, frozen." source "Lists the `TaskDomain` values, frozen."
guides/brief.md const OUTPUT_FORMATS: guide "The `OutputFormat` values, frozen." source "Lists the `OutputFormat` values, frozen."
guides/brief.md const RISK_SEVERITIES: guide "The `RiskSeverity` values, frozen." source "Lists the `RiskSeverity` values, frozen."
guides/brief.md const INTERPRETATION_MEMBERS: guide "Every published `Interpretation` member name, frozen — the capture list, pinned to `keyof Interpretation`." source "Lists every published `Interpretation` member name, frozen."
guides/brief.md const DEFAULT_BRIEF_TURNS: guide "`16` — the default turn cap `briefToGoal` renders; domain-qualified to keep the barrel clean." source "Holds `16` — the default turn cap `briefToGoal` renders."
guides/brief.md const GATE_ID: guide "`'gate'` — the id of the `buildGateDefinition()` logical definition." source "Holds `'gate'` — the id of the `buildGateDefinition()` logical definition."
guides/brief.md const LINE_BREAK_PATTERN: guide "The ECMAScript line terminators a brief field refuses; unanchored and flagless-`g`." source "Matches every line terminator a brief field refuses."
guides/brief.md const SINGLE_LINE_PATTERN: guide "The positive form of `LINE_BREAK_PATTERN`, for `stringShape`'s `pattern` — the same class as `LINE_BREAK_PATTERN`, expressed the other way." source "Holds the positive form of `LINE_BREAK_PATTERN`, for the shape DSL."
guides/brief.md const BLANK_PATTERN: guide "One or more spaces and nothing else — the one exemplar side `exampleToLines` must not pad; an EMPTY side is padded like any other, because CommonMark strips a fully-blank span to nothing while an unpadded empty span leaves an unclosed backtick run." source "Matches a string of one or more spaces and nothing else."
guides/brief.md class BriefError: guide "Carries a `BriefErrorCode` and optional `context`." source "Represents the one error class this package throws."
guides/brief.md function isBriefError: guide "Narrow a caught value to a `BriefError`." source "Narrows a caught value to a `BriefError`."
guides/brief.md const isText: guide absent source "Checks whether the value is a string holding no line terminator, empty included."
guides/brief.md const isLine: guide absent source "Checks whether the value is a non-empty string holding no line terminator."
guides/brief.md const isTaskOperation: guide absent source "Checks whether the value is one of the `TaskOperation` literals."
guides/brief.md const isTaskDomain: guide absent source "Checks whether the value is one of the `TaskDomain` literals."
guides/brief.md const isOutputFormat: guide absent source "Checks whether the value is one of the `OutputFormat` literals."
guides/brief.md const isRiskSeverity: guide absent source "Checks whether the value is one of the `RiskSeverity` literals."
guides/brief.md const isTask: guide absent source "Checks whether the value is a well-formed `Task` — both vocabularies closed, statement one line."
guides/brief.md const isReference: guide absent source "Checks whether the value is a well-formed `Reference` — both members required, both single-line."
guides/brief.md const isManifest: guide absent source "Checks whether the value is a well-formed `Manifest`."
guides/brief.md const isOutcome: guide absent source "Checks whether the value is a well-formed `Outcome` — `rank` a positive integer."
guides/brief.md const isGiven: guide absent source "Checks whether the value is a well-formed `Given` — its `value` may be empty but stays one line."
guides/brief.md const isExample: guide absent source "Checks whether the value is a well-formed `Example`."
guides/brief.md const isCitation: guide absent source "Checks whether the value is a well-formed `Citation` — every member single-line."
guides/brief.md const isGap: guide absent source "Checks whether the value is a well-formed `Gap`."
guides/brief.md const isRisk: guide absent source "Checks whether the value is a well-formed `Risk` — `severity` on the closed vocabulary."
guides/brief.md const isOutput: guide absent source "Checks whether the value is a well-formed `Output` — `format` on the closed vocabulary."
guides/brief.md const isProof: guide absent source "Checks whether the value is a well-formed `Proof`."
guides/brief.md const isBrief: guide absent source "Checks whether the value satisfies the whole exact-record `Brief` contract."
guides/brief.md const textShape: guide absent source "Describes a single-line string of any length, including empty."
guides/brief.md const lineShape: guide absent source "Describes a non-empty single-line string — the shape mirror of `isLine`."
guides/brief.md const taskShape: guide absent source "Describes the `Task` shape — closed operation and domain vocabularies plus a non-empty statement."
guides/brief.md const referenceShape: guide absent source "Describes the `Reference` shape — a path and the note that justifies listing it."
guides/brief.md const manifestShape: guide absent source "Describes the `Manifest` shape — disjoint reference partitions."
guides/brief.md const outcomeShape: guide absent source "Describes the `Outcome` shape — a one-based rank, the result text, and whether it gates done."
guides/brief.md const givenShape: guide absent source "Describes the `Given` shape — one categorized context fact."
guides/brief.md const exampleShape: guide absent source "Describes the `Example` shape — one input to output exemplar."
guides/brief.md const citationShape: guide absent source "Describes the `Citation` shape — a name, a locator, and why the source is cited."
guides/brief.md const gapShape: guide absent source "Describes the `Gap` shape — an unknown, whether it blocks, and the candidates that would close it."
guides/brief.md const riskShape: guide absent source "Describes the `Risk` shape — a closed severity, the risk, and its mitigation."
guides/brief.md const outputShape: guide absent source "Describes the `Output` shape — a closed format plus its optional refinements."
guides/brief.md const proofShape: guide absent source "Describes the `Proof` shape — the claim and the command that settles it."
guides/brief.md const briefShape: guide absent source "Describes the whole `Brief` shape, section shapes composed."
guides/brief.md function buildTask: guide absent source "Assembles a `Task` from an operation, a domain, and a statement."
guides/brief.md function buildReference: guide absent source "Assembles a `Reference` from a path and the note that justifies listing it."
guides/brief.md function buildManifest: guide absent source "Assembles a `Manifest`, defaulting every absent partition to an empty list."
guides/brief.md function buildOutcome: guide absent source "Assembles an `Outcome` from a rank and its result text."
guides/brief.md function buildGiven: guide absent source "Assembles a `Given` from a category, a name, and a value."
guides/brief.md function buildExample: guide absent source "Assembles an `Example` from an exemplar input and its expected output."
guides/brief.md function buildCitation: guide absent source "Assembles a `Citation` from a name, a URL, and the note that justifies citing it."
guides/brief.md function buildGap: guide absent source "Assembles a `Gap` from the section it belongs to and the question that would close it."
guides/brief.md function buildRisk: guide absent source "Assembles a `Risk` from a severity, what could go wrong, and the mitigation that answers it."
guides/brief.md function buildOutput: guide absent source "Assembles an `Output` from a format plus its optional refinements."
guides/brief.md function buildProof: guide absent source "Assembles a `Proof` from what the check settles and the command that settles it."
guides/brief.md function buildBrief: guide absent source "Assembles a `Brief` from a `Task` plus section overrides."
guides/brief.md function buildGateDefinition: guide absent source "Assembles the fail-closed readiness gate as a reasons `LogicalDefinition`."
guides/brief.md function briefToMarkdown: guide "Project a `Brief` into the copy-ready agent prompt — sections in authority order, paths referenced, never inlined; an empty section is omitted." source "Projects a brief into the copy-ready agent prompt."
guides/brief.md function briefToGoal: guide "Project a `Brief` into a `/goal` completion condition — the proofs' commands verbatim plus a turn cap defaulting to `DEFAULT_BRIEF_TURNS`." source "Projects a brief into a `/goal` completion condition."
guides/brief.md function briefToDispatch: guide "Project a `Brief` into a `Dispatch` — `manifest.edit` becomes the owned set, `locked` and `forbidden` do-not-touch, and `authority` the ranked precedence list." source "Projects a brief into a subagent `Dispatch`."
guides/brief.md function briefToSubject: guide "Project a `Brief` into a reasons `Subject` of readiness measures the gate rules read." source "Projects a brief into the reasons `Subject` of readiness measures the gate reads."
guides/brief.md function briefToHash: guide "The canonical structural digest of a brief's content, with `trace` and `hash` stripped first." source "Computes the canonical structural digest of a brief's content."
guides/brief.md function briefToTrace: guide "The one-line census `pinBrief` stamps on — operation/domain, outcomes, blocking-over-total gaps, proofs; re-derived by `BriefManager` to reconcile an inbound `trace`." source "Renders the one-line census `pinBrief` stamps onto a brief."
guides/brief.md function briefToContent: guide "The canonical TEXT the hash describes — the identity two briefs must share to be the same brief, since eight hex digits are not identity." source "Renders the canonical text of exactly what a brief's hash describes."
guides/brief.md function findUnmetRules: guide "The readiness rules a brief fails, measured in CODE — the gate's decision, which `compile` makes rather than delegating to a borrowed engine." source "Lists the readiness rules a brief fails, computed directly from its own measures."
guides/brief.md function pinBrief: guide "Return a fresh `Brief` with `trace` and `hash` filled — deterministic, no clocks, no run-specific data, idempotent, and deeply frozen." source "Returns a fresh brief with `trace` and `hash` derived from its own content."
guides/brief.md function snapshotBrief: guide "One deeply owned, deeply frozen, validated reading of a `Brief` — the door `pinBrief`, `BriefManager`, `briefToMarkdown`, `briefToGoal`, and `briefToDispatch` cross." source "Returns a deeply owned, deeply frozen copy of a brief, refusing anything off-contract."
guides/brief.md function captureValue: guide "A primitive passes through; an object a structured clone refuses becomes a frozen plain view of its own enumerable members, each named published member read once." source "Captures one stable, frozen view of a foreign contract value."
guides/brief.md function assertBrief: guide "Narrow unknown data to a `Brief` by IDENTITY, throwing `BriefError` `INVALID` when the guard refuses." source "Narrows unknown data to a `Brief`, throwing when it is off-contract."
guides/brief.md function exampleToLines: guide "Render one `Example` as markdown lines — a single-line pair becomes one row, a multi-line pair becomes a fenced block." source "Renders one exemplar as markdown lines."
guides/brief.md function validateBrief: guide "The semantic pass over an already-shape-valid brief; returns a reasons `ReasonValidationResult`, never throws." source "Runs the semantic pass over an already-shape-valid brief."
guides/brief.md function countSentences: guide "The sentence count of a statement — `validateBrief` errors when it is not exactly one." source "Counts the sentences a statement holds."
guides/brief.md function findBlockingGaps: guide "The gaps with `blocking: true`; non-empty means the gate MUST fail closed." source "Lists the gaps that block emission."
guides/brief.md function findManifestOverlaps: guide "The paths appearing in more than one manifest partition, once each." source "Lists the paths appearing in more than one manifest partition."
guides/brief.md function findUngrantedAuthority: guide "The authority paths no partition opens — every ranked path must appear in `read`, `edit`, or `locked`, because the executor cannot obey what it cannot open." source "Lists the authority paths the manifest never grants access to."
guides/brief.md function findUnpairedGaps: guide "The open gaps past the assumption count — the discipline is exactly one recorded assumption per open gap." source "Lists the open gaps with no assumption to stand on."
guides/brief.md function deriveStatement: guide "Derive one imperative statement from free text — whitespace collapsed, first letter raised, terminator appended; `undefined` for empty or whitespace-only text." source "Derives one imperative statement from free text."
guides/brief.md function deriveTask: guide "Derive a `Task` from an interprets `Intent` through CALLER action and domain vocabularies; `undefined` when either side is unmapped." source "Derives a `Task` from an interprets `Intent` through the caller's vocabularies."
guides/brief.md function deriveGivens: guide "Derive `Given[]` from an interprets `Entity[]` — each becomes a `{ category: 'extracted', name, value }` fact." source "Derives `Given[]` from an interprets `Entity[]`."
guides/brief.md function deriveGaps: guide "Derive `Gap[]` from an interprets `Ambiguity[]` — REQUIRED ambiguities become BLOCKING gaps, the rest open." source "Derives `Gap[]` from an interprets `Ambiguity[]`."
guides/brief.md function errorToMessage: guide "Render a value thrown by a stage into the message a `BriefStageFailure` carries — TOTAL, because it runs inside the `catch` that contains a stage failure." source "Renders a value thrown by a stage into a message."
guides/brief.md function freezeDeep: guide "Freeze a value and everything reachable from it, cycles included — `Object.freeze` is shallow, so a frozen record's nested arrays stayed writable." source "Freezes a value and everything reachable from it."
guides/brief.md function freezeBranch: guide "Freeze one branch against a shared visited set — the recursion `freezeDeep` drives." source "Freezes one branch of a value graph, skipping what the visited set already holds."
guides/brief.md function parseBrief: guide "Parse a JSON string into a `Brief`, or `undefined` on invalid JSON or a shape that fails `isBrief`." source "Parses a JSON string into a `Brief`."
guides/brief.md function createBriefCompiler: guide absent source "Creates a compilation orchestrator."
guides/brief.md function createBriefManager: guide absent source "Creates a brief registry."
guides/brief.md function createBriefContract: guide absent source "Compiles `briefShape` into a guard, parser, JSON Schema, and seeded generator bundle."
guides/brief.md class BriefCompiler: guide "The compilation orchestrator — runs the `interpret` → `draft` → `gate` → `pin` pipeline and owns or borrows the interpret pipeline and the gate's `Reason`." source "Implements the compilation orchestrator — the `[interpret, draft, gate, pin]` pipeline."
guides/brief.md class BriefManager: guide "The self-owning, versioned and content-hashed brief registry — record ids default to each brief's own content hash." source "Implements the self-owning, versioned and content-hashed brief registry."
guides/brief.md BriefCompilerInterface.compile: guide absent source absent
guides/brief.md BriefCompilerInterface.gate: guide absent source absent
guides/brief.md BriefCompilerInterface.destroy: guide absent source absent
guides/brief.md BriefManagerInterface.has: guide absent source absent
guides/brief.md BriefManagerInterface.brief: guide absent source absent
guides/brief.md BriefManagerInterface.briefs: guide absent source absent
guides/brief.md BriefManagerInterface.add: guide absent source absent
guides/brief.md BriefManagerInterface.remove: guide absent source absent
guides/brief.md BriefManagerInterface.destroy: guide absent source absent
guides/brief.md pitch: readme absent tagline "A synchronous, deterministic specification compiler on top of the `@orkestrel/reason` engine. A rough request compiles into a `Brief` — a closed, JSON-serializable execution contract another agent can run with no interpretation left to do — and every downstream artifact is PROJECTED from that one source of truth, never authored separately. FORWARD: raw text runs through an injected `@orkestrel/interpret` pipeline, its `Interpretation` is drafted into brief sections (intent to `task`, entities to `givens`, ambiguities to `gaps`), caller-supplied sections merge OVER the draft, the fail-closed gate is evaluated as a reasons `LogicalDefinition` — a traceable verdict, never an ad-hoc `if` — and a passing brief is pinned (`trace` and `hash` derived, never authored). REVERSE: `briefToMarkdown` / `briefToGoal` / `briefToDispatch` project the pinned brief into its downstream views. Nothing here is an LLM, provider, or agent: the markdown a projection renders is FOR an external model, never consumed internally. A brief with blocking gaps yields a visible INCOMPLETE `Briefing` carrying the questions, because a half-specified brief is worse than a question. Every discriminant names its axis, never `kind` or `type`: `stage` splits the pipeline phases, `severity` splits risks, `code` splits coded errors — and a record whose container already fixes what it is, like a referenced path, or whose candidate vocabulary was neither closed nor disjoint, like a cited source, carries no discriminant at all. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 133
exit 1
```

## Facts for brief (taken 2026-09-07T20:58Z by facts.sh)

- Checkout `/home/user/fleet/brief`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `d8f2de0`, status: clean
- `package.json`: version `0.0.8`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 31 | summary 24 | banned 7 | tests/setup.ts(24) tests/src/core/helpers.test.ts(2) src/core/types.ts(2) src/core/helpers.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    5:| Concept | Spec                   | Source                    | Tests                                 |
    6:| ------- | ---------------------- | ------------------------- | ------------------------------------- |
    7:| Brief   | [`brief.md`](brief.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
- Guide `guides/brief.md`: 1245 lines. Headings:
    1:# Brief
    34:## Surface
    85:### Types
    131:### Constants
    177:### Errors
    204:### Validators
    282:### Shapers
    350:### Builders
    442:### Helpers
    559:### Parsers
    582:### Factories
    620:### Entities
    627:## Methods
    635:#### `BriefCompilerInterface`
    680:#### `BriefManagerInterface`
    714:## Contract
    890:## Patterns
    892:### Compiling a rough request
    960:### Failing closed — the blocking path
    1010:### Gating through the reason engine
    1085:### Projecting the downstream artifacts
    1116:### Narrowing an untrusted brief
    1139:### Serving briefs at a tool boundary
    1163:### Storing briefs by their own identity
    1186:### Practices
    1224:## Tests
    1238:## See also
- Table headers in `guides/brief.md` (a header row is the row before a `| ---` row):
    87: | Type                     | Kind      | Shape                                                                                                                                                                                                                                               |
    133: | API                      | Kind  | Summary                                                                                                                                                                                                                                                  |
    179: | API            | Kind     | Summary                                            |
    221: | API               | Kind  | Narrows to                                                                        |
    296: | API              | Kind  | Builds…                                                                                            |
    363: | API                   | Kind     | Builds…                                                                                                                                                               |
    448: | API                      | Kind     | Summary                                                                                                                                                                |
    561: | API          | Kind     | Summary                                                                                             |
    584: | API                   | Kind     | Builds…                                                                                        |
    622: | API             | Kind  | Summary                                                                                                                                                     |
    641: | Method    | Returns         | Behavior                                                                                                                        |
    689: | Method    | Returns                    | Behavior                                                                                      |
- Rows of any `### Entities` table (the Kind cell):
    624:  `BriefCompiler` | class
    625:  `BriefManager`  | class
- H1 blockquote (`guides/brief.md`):
    3: > A synchronous, deterministic specification compiler on top of the `@orkestrel/reason`
    4: > engine. A rough request compiles into a **`Brief`** — a closed, JSON-serializable
    5: > execution contract another agent can run with no interpretation left to do — and every
    6: > downstream artifact is PROJECTED from that one source of truth, never authored
    7: > separately. FORWARD: raw text runs through an injected `@orkestrel/interpret` pipeline,
    8: > its `Interpretation` is drafted into brief sections (intent to `task`, entities to
    9: > `givens`, ambiguities to `gaps`), caller-supplied sections merge OVER the draft, the
    10: > fail-closed gate is evaluated as a reasons `LogicalDefinition` — a traceable verdict,
    11: > never an ad-hoc `if` — and a passing brief is pinned (`trace` and `hash` derived, never
    12: > authored). REVERSE: `briefToMarkdown` / `briefToGoal` / `briefToDispatch` project the
    13: > pinned brief into its downstream views. Nothing here is an LLM, provider, or agent: the
    14: > markdown a projection renders is FOR an external model, never consumed internally. A
    15: > brief with blocking gaps yields a visible INCOMPLETE `Briefing` carrying the questions,
    16: > because a half-specified brief is worse than a question. Every discriminant names its
    17: > axis, never `kind` or `type`: `stage` splits the pipeline phases, `severity` splits
    18: > risks, `code` splits coded errors — and a record whose container already fixes what it is,
    19: > like a referenced path, or whose candidate vocabulary was neither closed nor disjoint, like
    20: > a cited source, carries no discriminant at all.
    21: > Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    23: You cannot make a model's sampling deterministic from a prompt, but you can make the TASK
    24: deterministic: resolve every implicit decision ahead of time and pin the result with
- README (`README.md`) first lines:
    # @orkestrel/brief
    
    A synchronous, deterministic specification compiler. A rough request compiles into a
    `Brief` — a closed, JSON-serializable execution contract another agent can run with no
    interpretation left to do — and every downstream artifact (the prompt a model reads, a
    completion condition, a subagent dispatch) is projected from that one source of truth.
    
    A brief with blocking gaps never emits. The readiness gate is a `@orkestrel/reason`
    `LogicalDefinition`, so every verdict carries a traceable account of which check missed.
    
    ```sh
    npm install @orkestrel/brief
- `## Patterns` fences, each with its nearest preceding heading:
    38: fence under "## Surface"
    152: fence under "### Constants"
    184: fence under "### Errors"
    242: fence under "### Validators"
    313: fence under "### Shapers"
    379: fence under "### Builders"
    477: fence under "### Helpers"
    565: fence under "### Parsers"
    594: fence under "### Factories"
    647: fence under "#### `BriefCompilerInterface`"
    698: fence under "#### `BriefManagerInterface`"
    902: fence under "### Compiling a rough request"
    966: fence under "### Failing closed — the blocking path"
    1017: fence under "### Gating through the reason engine"
    1089: fence under "### Projecting the downstream artifacts"
    1122: fence under "### Narrowing an untrusted brief"
    1144: fence under "### Serving briefs at a tool boundary"
    1165: fence under "### Storing briefs by their own identity"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:35:export function createBriefCompiler(options?: BriefCompilerOptions): BriefCompilerInterface {
    src/core/factories.ts:54:export function createBriefManager(options?: BriefManagerOptions): BriefManagerInterface {
    src/core/factories.ts:79:export function createBriefContract(): ContractInterface<Brief> {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/BriefCompiler.ts:64:export class BriefCompiler implements BriefCompilerInterface {
    src/core/BriefManager.ts:34:export class BriefManager implements BriefManagerInterface {
    src/core/errors.ts:23:export class BriefError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/BriefCompiler.ts:1
    src/core/cloners.ts:2
    src/core/factories.ts:3
    src/core/BriefManager.ts:1
    src/core/helpers.ts:37
    src/core/parsers.ts:1
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    21:} from '@orkestrel/guide'
    158:		const groups = guide.methods()
    162:			const members = source.methods(group.interface).map((method) => method.name)
    165:			expect(findMissing(documented, members)).toStrictEqual([])
    166:			expect(findMissing(members, documented)).toStrictEqual([])
    169:				findMissing(
    170:					source.methods(implementation).map((method) => method.name),
    203:			findUnexampled(
    206:				source.examples().map((example) => example.name),
    210:			findUnexampled(
    213:				source.examples().map((example) => example.name),
    216:		for (const group of guide.methods()) {
    219:			const examples = source.examples(implementation).map((example) => example.name)
    220:			expect(findUnexampled(documented, fences, examples)).toStrictEqual([])
    341:					findMissing(
- `## Tests` paragraph naming checks: 1224:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-brief-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/brief.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/brief.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-brief-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
