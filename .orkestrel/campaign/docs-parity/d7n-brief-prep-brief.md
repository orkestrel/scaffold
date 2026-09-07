# Brief — P.1 `d7n-brief-prep` (brief's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/brief` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `4c71834`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

brief's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== brief 2026-09-07T16:43:45Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
81:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 1s
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### brief (4c71834, version 0.0.7, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 27 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(24)
   tests/src/core/helpers.test.ts(2)
   src/core/types.ts(2)
   src/core/helpers.ts(1)
   src/core/constants.ts(1)
   src/core/BriefManager.ts(1)
-- docs
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
-- check
   tests/guides.test.ts(164,23): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(165,23): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(167,23): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(196,44): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(197,54): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(202,26): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  2 failed | 18 passed (20)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 69ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(4) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(4) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 31 | summary 24 | banned 7 | tests/setup.ts(24) tests/src/core/helpers.test.ts(2) src/core/types.ts(2) src/core/helpers.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+100,	+     "message": "prose carries no banned term: leverage (use)",	+     "path": "guides/brief.md"
+552,	+     "message": "prose carries no banned term: simply (delete)",	+     "path": "guides/brief.md"
+1119,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "guides/brief.md"
+1119,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "guides/brief.md"
+1120,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "guides/brief.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for brief (taken 2026-09-07T16:44Z by facts.sh)

- Checkout `/home/user/fleet/brief`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `4c71834`, status: clean
- `package.json`: version `0.0.7`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    162:			const declared = source.methods(group.interface)
    164:			expect(findMissing(group.methods, declared)).toStrictEqual([])
    165:			expect(findMissing(declared, group.methods)).toStrictEqual([])
    167:			expect(findMissing(source.methods(implementation), group.methods)).toStrictEqual([])
    196:		expect(findUnexampled(functions, fences, source.examples())).toStrictEqual([])
    197:		expect(findUnexampled(['neverDocumented'], fences, source.examples())).toStrictEqual([
    200:		for (const group of guide.methods()) {
    202:			expect(findUnexampled(group.methods, fences, source.examples(implementation))).toStrictEqual(
    325:					findMissing(
- `## Tests` paragraph naming checks: 1224:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.7"` → `"version": "0.0.8"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-brief-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
