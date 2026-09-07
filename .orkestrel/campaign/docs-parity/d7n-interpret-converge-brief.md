# Brief — P.2 `d7n-interpret-converge` (interpret under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/interpret` from the committed baseline `6414e9c` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.13`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/interpret.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/interpret/guides/interpret.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-interpret-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/interpret.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/interpret.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/interpret.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/interpret.md type ProvenanceCategory: guide absent source "Names how one `FieldMapping` / `Entity` value was obtained."
guides/interpret.md type InterpretStage: guide absent source "Names the fixed pipeline phases an `InterpretInterface#interpret` run produces one `StageRecord` for, in order."
guides/interpret.md type InterpretErrorCode: guide absent source "Names the coded misuse / failure conditions thrown as an `InterpretError` or carried on a `StageFailure`."
guides/interpret.md interface EntityMapping: guide absent source "Represents one entity-extraction rule inside a `Template`: which literal alias phrases identify a value, and which subject field it lands on."
guides/interpret.md interface FieldDefault: guide absent source "Represents a fallback value a `Template` fills onto a field left unresolved by extraction."
guides/interpret.md interface ComputedField: guide absent source "Represents a declaratively computed field: evaluate `expression` against the entities already resolved for this interpretation, and land the result on `field`."
guides/interpret.md interface Template: guide absent source "Represents a named, versionable interpretation template: which intents it answers, how to mine entities for it, its fallback data, its computed fields, and the reasons `Definition` it ultimately produces a `Subject` for."
guides/interpret.md interface Provenance: guide absent source "Describes how one value landed — its origin category plus an optional strategy detail."
guides/interpret.md interface Intent: guide absent source "Represents the classified action + domain for one interpretation, with a combined confidence."
guides/interpret.md interface Entity: guide absent source "Represents one value assigned to a template's entity mapping, with its provenance and confidence."
guides/interpret.md interface Ambiguity: guide absent source "Represents an unresolved field surfaced as a human-readable question, never bare prose."
guides/interpret.md interface FieldMapping: guide absent source "Represents one audited field of the built subject — its resolved value, provenance, and confidence."
guides/interpret.md interface TextChange: guide absent source "Represents one normalization substitution applied to the raw text."
guides/interpret.md interface StageRecord: guide absent source "Represents a structured input/output snapshot of one pipeline phase."
guides/interpret.md interface StageFailure: guide absent source "Represents a visible marker for a stage that threw, carrying its coded reason."
guides/interpret.md interface NormalizeResult: guide absent source "Represents the `Normalizer` stage's output: the cleaned text plus every substitution applied."
guides/interpret.md interface ExtractResult: guide absent source "Represents the `Extractor` stage's output: intent classification plus raw numbers."
guides/interpret.md interface ClarifyResult: guide absent source "Represents the `Clarifier` stage's output: resolved entities plus any remaining ambiguities."
guides/interpret.md interface FormatResult: guide absent source "Represents the `Formatter` stage's output: the refined natural-language prompt."
guides/interpret.md interface GenerateResult: guide absent source "Represents the `Generator` stage's output: the built subject/definition pair plus its full field audit."
guides/interpret.md interface Interpretation: guide absent source "Represents the full, replayable outcome of one `interpret()` call."
guides/interpret.md interface TemplateRecord: guide absent source "Represents a versioned, content-hashed `Template` as held by a `TemplateManagerInterface`."
guides/interpret.md interface SubjectRecord: guide absent source "Represents a versioned, content-hashed `Subject` as held by a `SubjectManagerInterface`."
guides/interpret.md interface DefinitionRecord: guide absent source "Represents a versioned, content-hashed `Definition` as held by a `DefinitionManagerInterface`."
guides/interpret.md type InterpretEventMap: guide absent source "Represents the push observation surface of an `InterpretInterface`."
guides/interpret.md type RecordEventMap: guide absent source "Represents the push observation surface shared by every record registry — an id-keyed collection, so `add` / `remove` are the events (never ordered-list `append`/`prepend`)."
guides/interpret.md type TemplateManagerEventMap: guide absent source "Represents the push observation surface of a `TemplateManagerInterface`."
guides/interpret.md type SubjectManagerEventMap: guide absent source "Represents the push observation surface of a `SubjectManagerInterface`, whose `add` carries the own-minted record id."
guides/interpret.md type DefinitionManagerEventMap: guide absent source "Represents the push observation surface of a `DefinitionManagerInterface`."
guides/interpret.md type InterpretContextEventMap: guide absent source "Represents the push observation surface of an `InterpretContextInterface`."
guides/interpret.md type NarratorFormatter: guide absent source "Represents a pure formatting function for one lexicon `value()` unit."
guides/interpret.md interface Lexicon: guide absent source "Represents caller-injected wording data for the reverse direction — mechanism, never policy. Every phrase, label, and template string a `Narrator` renders is DATA supplied here, never a core literal."
guides/interpret.md interface NarratorOptions: guide absent source "Represents the options for `createNarrator` / the `Narrator` constructor."
guides/interpret.md interface NormalizerOptions: guide absent source "Represents the options for `createNormalizer` / the `Normalizer` constructor."
guides/interpret.md interface ExtractorOptions: guide absent source "Represents the options for `createExtractor` / the `Extractor` constructor."
guides/interpret.md interface ClarifierOptions: guide absent source "Represents the options for `createClarifier` / the `Clarifier` constructor."
guides/interpret.md interface FormatterOptions: guide absent source "Represents the options for `createFormatter` / the `Formatter` constructor."
guides/interpret.md interface TemplateManagerOptions: guide absent source "Represents the options for `createTemplateManager` / the `TemplateManager` constructor — the initial seed collection."
guides/interpret.md interface SubjectManagerOptions: guide absent source "Represents the options for `createSubjectManager` / the `SubjectManager` constructor — the initial seed collection."
guides/interpret.md interface DefinitionManagerOptions: guide absent source "Represents the options for `createDefinitionManager` / the `DefinitionManager` constructor — the initial seed collection."
guides/interpret.md interface RecordStamp: guide absent source "Represents the identity, version, and content hash a `RecordManagerInterface` derives for one record before its concrete shape is built."
guides/interpret.md type RecordFunction: guide absent source "Builds one concrete record from the `RecordStamp` its registry derived and the value that record holds."
guides/interpret.md interface RecordManagerOptions: guide absent source "Represents the options for the `RecordManager` constructor."
guides/interpret.md interface RecordManagerInterface: guide absent source "Represents the shared registry engine every record manager composes — the `Map`, the content-hash and version rule, the batch `remove` overloads, and teardown."
guides/interpret.md interface RecordOptions: guide absent source "Represents the per-call options for the record a manager's `add` mints."
guides/interpret.md interface InterpretContextOptions: guide absent source "Represents the options for `createInterpretContext` / the `InterpretContext` constructor."
guides/interpret.md interface InterpretOptions: guide absent source "Represents the options for `createInterpret` / the `Interpret` constructor."
guides/interpret.md interface NormalizerInterface: guide absent source "Represents the `Normalizer` stage contract: raw text in, cleaned text + applied changes out."
guides/interpret.md interface ExtractorInterface: guide absent source "Represents the `Extractor` stage contract: template-agnostic intent classification + raw number mining."
guides/interpret.md interface ClarifierInterface: guide absent source "Represents the `Clarifier` stage contract: resolve carry-over, defaults, and computed fields against a set of already-assigned entities, surfacing ambiguities for anything required that stays unresolved."
guides/interpret.md interface FormatterInterface: guide absent source "Represents the `Formatter` stage contract: render the refined natural-language prompt for a matched template."
guides/interpret.md interface GeneratorInterface: guide absent source "Represents the `Generator` stage contract: build the final subject/definition pair plus its field audit."
guides/interpret.md interface NarratorInterface: guide absent source "Represents the `Narrator` contract — a stateless, TOTAL, lexicon-driven rendering engine for the reverse direction."
guides/interpret.md interface TemplateManagerInterface: guide absent source "Represents the template registry — a self-owning, versioned/hashed record-holder with the singular/plural accessor pair and the batch `remove` overloads."
guides/interpret.md interface SubjectManagerInterface: guide absent source "Represents the subject registry — a self-owning, versioned/hashed record-holder that mints its own record ids (a `Subject` carries none)."
guides/interpret.md interface DefinitionManagerInterface: guide absent source "Represents the definition registry — a self-owning, versioned/hashed record-holder."
guides/interpret.md interface InterpretContextInterface: guide absent source "Represents the cross-turn interpretation context: a capped, replayable history plus the subject/definition registries carry-over reads from."
guides/interpret.md interface InterpretInterface: guide absent source "Represents the interpretation orchestrator — the sole public entry point, mirroring `reasons`' `Reason` orchestrator shape."
guides/interpret.md const DEFAULT_INTERPRET_SIMILARITY: guide "`0.8` — default fuzzy alias-match score threshold for `createInterpret` / `matchAlias`." source "Names the default `similarity` for `createInterpret` / `matchAlias` — the fuzzy alias-match score threshold (0..1)."
guides/interpret.md const DEFAULT_INTERPRET_FLOOR: guide "`0.3` — default minimum intent confidence a template match must clear." source "Names the default `floor` for `createInterpret` / `matchTemplate` — the minimum intent confidence a template match (or the classified intent itself) must clear."
guides/interpret.md const DEFAULT_INTERPRET_HISTORY: guide "`16` — default `history` cap for an `InterpretContext`'s `previous()` ring buffer." source "Names the default `history` cap for an `InterpretContext`'s `previous()` ring buffer."
guides/interpret.md const PROVENANCE_CATEGORIES: guide "Every `ProvenanceCategory` literal, frozen — the one home `isProvenance` checks the union from." source "Lists every `ProvenanceCategory` literal, frozen — the one home the result guards check the union from, so a new category added to `types.ts` is added here rather than silently rejected by `isProvenance`."
guides/interpret.md const INTERPRET_STAGES: guide "Every `InterpretStage` literal in pipeline order, frozen — the one home the stage guards check from." source "Lists every `InterpretStage` literal in pipeline order, frozen — the one home the result guards check the union from."
guides/interpret.md const INTERPRET_ERROR_CODES: guide "Every `InterpretErrorCode` literal, frozen — the one home `isStageFailure` checks the union from." source "Lists every `InterpretErrorCode` literal, frozen — the one home the result guards check the union from."
guides/interpret.md const CONFIDENCE_EXACT: guide "`1` — confidence for an exact keyword-proximity entity match." source "Names the confidence assigned to an exact keyword-proximity entity match."
guides/interpret.md const CONFIDENCE_ALIAS: guide "`0.9` — confidence for an exact alias-phrase entity match." source "Names the confidence assigned to an exact alias-phrase entity match."
guides/interpret.md const CONFIDENCE_COLLECT: guide "`0.9` — confidence when a single entity mapping collects every extracted number." source "Names the confidence assigned when a single entity mapping collects every extracted number."
guides/interpret.md const CONFIDENCE_POSITIONAL: guide "`0.7` — confidence for a positional (order-based) entity match fallback." source "Names the confidence assigned to a positional (order-based) entity match fallback."
guides/interpret.md const CONFIDENCE_CARRIED: guide "`0.7` — confidence for a same-domain carried-over field." source "Names the confidence assigned to a same-domain carried-over field."
guides/interpret.md const CONFIDENCE_DEFAULT: guide "`1` — confidence for a template default fill." source "Names the confidence assigned to a template default fill."
guides/interpret.md const CONFIDENCE_COMPUTED: guide "`0.9` — confidence for a successfully resolved computed field." source "Names the confidence assigned to a successfully resolved computed field."
guides/interpret.md const NUMBER_PATTERN: guide "The shared numeric-entity extraction `RegExp` — leading `$`, thousands commas, decimal, `%`." source "Holds the numeric-entity extraction pattern shared by `extractNumbers` and `assignEntities` — an optional leading `$`, thousands-comma-grouped digits, an optional decimal fraction, and an optional trailing `%`."
guides/interpret.md const UNSAFE_FIELD_SEGMENTS: guide "`['__proto__', 'prototype', 'constructor']` — prototype-pollution-unsafe field-path segments." source "Lists the prototype-pollution-unsafe field-path segments — `setField` refuses to write ANY path containing one, returning its input unchanged."
guides/interpret.md const DEFAULT_CONTRACTIONS: guide "Neutral built-in contraction expansions for `Normalizer`." source "Holds the neutral built-in contraction expansions for `Normalizer` — small on purpose; callers merge their own map over this one."
guides/interpret.md const DEFAULT_LEXICON: guide "The neutral default `Lexicon` a `Narrator` merges caller data over — the reverse-direction lines plus the forward `prompt.*` / `ambiguity.*` lines." source "Holds the neutral default `Lexicon` a `Narrator` merges caller data over."
guides/interpret.md class InterpretError: guide "Carries an `InterpretErrorCode` + optional `context`." source "Represents an error thrown by the interprets layer."
guides/interpret.md function isInterpretError: guide "Narrow a caught value to an `InterpretError`." source "Narrows an unknown caught value to an `InterpretError`."
guides/interpret.md function isEntityMapping: guide absent source "Determines whether a value is an `EntityMapping` — a literal alias-phrase extraction rule pointing at a subject field."
guides/interpret.md function isFieldDefault: guide absent source "Determines whether a value is a `FieldDefault` — a fallback value a `Template` fills onto an unresolved field."
guides/interpret.md function isComputedField: guide absent source "Determines whether a value is a `ComputedField` — a declaratively computed field carrying a reasons `SymbolicExpression` tree."
guides/interpret.md function isTemplate: guide absent source "Determines whether a value is a `Template` — a named, versionable interpretation template."
guides/interpret.md function isProvenance: guide absent source "Determines whether a value is an open `Provenance` result record."
guides/interpret.md function isIntent: guide absent source "Determines whether a value is an open `Intent` result record."
guides/interpret.md function isEntity: guide absent source "Determines whether a value is an open `Entity` result record."
guides/interpret.md function isFieldMapping: guide absent source "Determines whether a value is an open `FieldMapping` result record."
guides/interpret.md function isAmbiguity: guide absent source "Determines whether a value is an open `Ambiguity` result record."
guides/interpret.md function isStageRecord: guide absent source "Determines whether a value is an open `StageRecord` result record."
guides/interpret.md function isStageFailure: guide absent source "Determines whether a value is an open `StageFailure` result record."
guides/interpret.md function isInterpretation: guide absent source "Determines whether a value is an open `Interpretation` result record."
guides/interpret.md function escapeRegExp: guide "Escape every regex metacharacter so text matches literally when compiled into a `RegExp`." source "Escapes every regex metacharacter in `text` so it matches literally when compiled into a `RegExp`."
guides/interpret.md function setField: guide "Copy-on-write write a value at a (possibly nested) field path — prototype-pollution-safe." source "Writes a value at a (possibly nested) field path on a subject, copy-on-write."
guides/interpret.md function applyReplacements: guide "Replace every whole-word occurrence of a map's keys with their values." source "Replaces every whole-word occurrence of a map's keys with their values."
guides/interpret.md function collapseWhitespace: guide "Collapse every run of whitespace to a single space and trim the ends." source "Collapses every run of whitespace to a single space and trims the ends."
guides/interpret.md function tokenize: guide "Split text into lowercase tokens, stripping punctuation outside a numeric/currency-safe allowlist." source "Splits text into lowercase tokens, stripping punctuation outside a small numeric/currency-safe allowlist."
guides/interpret.md function extractNumbers: guide "Mine every numeric literal from text." source "Mines every numeric literal from text — optional leading `$`, thousands commas, an optional decimal fraction, an optional trailing `%`."
guides/interpret.md function assignEntities: guide "Assign already-extracted numbers to a matched template's entity mappings." source "Assigns already-extracted numbers to a matched template's entity mappings."
guides/interpret.md function classifyIntent: guide "Classify the action + domain intent of text against caller-supplied vocabularies." source "Classifies the action + domain intent of a text against caller-supplied vocabularies."
guides/interpret.md function scoreSimilarity: guide "Bigram (Dice coefficient) string similarity, case-insensitive." source "Measures bigram (Dice coefficient) string similarity, case-insensitive."
guides/interpret.md function matchAlias: guide "The best `scoreSimilarity` a token achieves against a list of aliases, gated by a threshold." source "Returns the best `scoreSimilarity` a token achieves against a list of aliases, gated by a threshold."
guides/interpret.md function canonicalize: guide "Render a value into a canonical, key-order-stable string." source "Renders a value into a canonical, key-order-stable string — the pre-image of `digestValue`."
guides/interpret.md function canonicalizeNode: guide "Render one node into its canonical string against the object ancestors already on the recursion path — the leaf behind `canonicalize`." source "Renders one node of a value into its canonical, key-order-stable string, against the object ancestors already on the recursion path."
guides/interpret.md function digestValue: guide "Compute a canonical structural digest (FNV-1a, 8-hex-digit) of a pure-JSON value." source "Computes a canonical structural digest of a pure-JSON value — a key-order- stable FNV-1a hash rendered as an 8-hex-digit string."
guides/interpret.md function scoreTemplate: guide "Score how well a classified intent matches one template's domain + action." source "Scores how well a classified intent matches one template's domain + action."
guides/interpret.md function matchTemplate: guide "Find the best-scoring added template for a classified intent, gated by a confidence floor." source "Finds the best-scoring added template for a classified intent, gated by a confidence floor."
guides/interpret.md function variablesOf: guide "Collect every variable name referenced by a symbolic expression tree." source "Collects every variable name referenced by a symbolic expression tree, in first-occurrence order."
guides/interpret.md function resolveExpression: guide "Evaluate a symbolic expression tree against resolved bindings." source "Evaluates a symbolic expression tree against resolved bindings."
guides/interpret.md function renderSubject: guide "Render a one-line, display-neutral description of a reasons `Subject`, through an injected `Narrator`." source "Renders a one-line, display-neutral description of a reasons `Subject`, through an injected `Narrator`."
guides/interpret.md function parseTemplate: guide "Parse a JSON string into a `Template`, or `undefined` on invalid JSON or a shape that fails `isTemplate`." source "Parses a JSON string into a `Template`, or `undefined` on invalid JSON or a shape that fails `isTemplate`."
guides/interpret.md function createInterpret: guide absent source "Creates an interpretation orchestrator."
guides/interpret.md function createNormalizer: guide absent source "Creates a text normalizer."
guides/interpret.md function createExtractor: guide absent source "Creates a template-agnostic intent classifier and number extractor."
guides/interpret.md function createClarifier: guide absent source "Creates a clarifier — carry-over, defaults, and computed-field resolution against an assigned entity set."
guides/interpret.md function createFormatter: guide absent source "Creates a prompt formatter."
guides/interpret.md function createGenerator: guide absent source "Creates a subject/definition generator."
guides/interpret.md function createTemplateManager: guide absent source "Creates a template registry."
guides/interpret.md function createSubjectManager: guide absent source "Creates a subject registry."
guides/interpret.md function createDefinitionManager: guide absent source "Creates a definition registry."
guides/interpret.md function createInterpretContext: guide absent source "Creates a cross-turn interpretation context."
guides/interpret.md function createNarrator: guide absent source "Creates a lexicon-driven reverse-direction rendering engine."
guides/interpret.md class Interpret: guide "The interpretation orchestrator — runs the `[normalize, extract, clarify, format, generate]` pipeline, owns the template registry and context, exposes the reverse direction." source "Implements the interpretation orchestrator — the sole public entry point of the `interprets` module, mirroring the reasons `Reason` orchestrator shape."
guides/interpret.md class Narrator: guide "A stateless, total, lexicon-driven rendering engine for the reverse direction." source "Implements a stateless, TOTAL, lexicon-driven rendering engine for the reverse direction — the reverse-direction mirror of the forward `Formatter`'s `verbs` seam, supplying mechanism rather than wording policy."
guides/interpret.md class Normalizer: guide "The `Normalizer` stage — contraction/abbreviation/correction substitutions plus whitespace collapse." source "Implements the normalize stage: applies contraction, abbreviation, and correction substitutions in order, then collapses whitespace."
guides/interpret.md class Extractor: guide "The `Extractor` stage — template-agnostic intent classification plus numeric mining." source "Implements the extract stage: template-agnostic intent classification plus raw numeric-entity mining."
guides/interpret.md class Clarifier: guide "The `Clarifier` stage — same-domain carry-over, defaults, and dependency-ordered computed fields." source "Implements the clarify stage: resolves same-domain carry-over, template defaults, and declaratively computed fields against an already-assigned entity set, surfacing an `Ambiguity` for every required mapping that stays unresolved."
guides/interpret.md class Formatter: guide "The `Formatter` stage — renders the refined natural-language prompt." source "Implements the format stage: renders the refined natural-language prompt for a matched template."
guides/interpret.md class Generator: guide "The `Generator` stage — builds the final subject/definition pair plus its field audit." source "Implements the generate stage: builds the final `Subject` from a fully resolved entity set, plus its complete field audit."
guides/interpret.md class RecordManager: guide "The shared registry engine every record manager composes — the collection, the content hash, the version rule, and teardown." source "Implements the shared registry engine behind every record manager in this module — it owns the `Map`, the content-hash and version rule, the batch `remove` overloads, and teardown."
guides/interpret.md class TemplateManager: guide "The self-owning, versioned/hashed template registry." source "Implements the template registry — a self-owning, versioned and content-hashed record-holder for the `Template`s an `Interpret` orchestrator matches against."
guides/interpret.md class SubjectManager: guide "The self-owning, versioned/hashed subject registry that mints its own record ids." source "Implements the subject registry — a self-owning, versioned and content-hashed record-holder that mints its OWN record identity for every `Subject` (a `Subject` carries no `id` field of its own)."
guides/interpret.md class DefinitionManager: guide "The self-owning, versioned/hashed definition registry." source "Implements the definition registry — a self-owning, versioned and content-hashed record-holder for the reasons `Definition`s an interpretation produces."
guides/interpret.md class InterpretContext: guide "Cross-turn interpretation context — a capped, replayable history plus the subject/definition registries." source "Implements the cross-turn interpretation context — a capped, replayable history of completed `Interpretation`s plus the subject and definition registries carry-over reads from."
guides/interpret.md NormalizerInterface.normalize: guide absent source absent
guides/interpret.md ExtractorInterface.extract: guide absent source absent
guides/interpret.md ClarifierInterface.clarify: guide absent source absent
guides/interpret.md FormatterInterface.format: guide absent source absent
guides/interpret.md GeneratorInterface.generate: guide absent source absent
guides/interpret.md NarratorInterface.phrase: guide absent source absent
guides/interpret.md NarratorInterface.label: guide absent source absent
guides/interpret.md NarratorInterface.line: guide absent source absent
guides/interpret.md NarratorInterface.value: guide absent source absent
guides/interpret.md NarratorInterface.describe: guide absent source absent
guides/interpret.md NarratorInterface.narrate: guide absent source absent
guides/interpret.md RecordManagerInterface.has: guide absent source absent
guides/interpret.md RecordManagerInterface.record: guide absent source absent
guides/interpret.md RecordManagerInterface.records: guide absent source absent
guides/interpret.md RecordManagerInterface.add: guide absent source absent
guides/interpret.md RecordManagerInterface.remove: guide absent source absent
guides/interpret.md RecordManagerInterface.destroy: guide absent source absent
guides/interpret.md TemplateManagerInterface.has: guide absent source absent
guides/interpret.md TemplateManagerInterface.template: guide absent source absent
guides/interpret.md TemplateManagerInterface.templates: guide absent source absent
guides/interpret.md TemplateManagerInterface.add: guide absent source absent
guides/interpret.md TemplateManagerInterface.remove: guide absent source absent
guides/interpret.md TemplateManagerInterface.destroy: guide absent source absent
guides/interpret.md SubjectManagerInterface.has: guide absent source absent
guides/interpret.md SubjectManagerInterface.subject: guide absent source absent
guides/interpret.md SubjectManagerInterface.subjects: guide absent source absent
guides/interpret.md SubjectManagerInterface.add: guide absent source absent
guides/interpret.md SubjectManagerInterface.remove: guide absent source absent
guides/interpret.md SubjectManagerInterface.destroy: guide absent source absent
guides/interpret.md DefinitionManagerInterface.has: guide absent source absent
guides/interpret.md DefinitionManagerInterface.definition: guide absent source absent
guides/interpret.md DefinitionManagerInterface.definitions: guide absent source absent
guides/interpret.md DefinitionManagerInterface.add: guide absent source absent
guides/interpret.md DefinitionManagerInterface.remove: guide absent source absent
guides/interpret.md DefinitionManagerInterface.destroy: guide absent source absent
guides/interpret.md InterpretContextInterface.previous: guide absent source absent
guides/interpret.md InterpretContextInterface.entities: guide absent source absent
guides/interpret.md InterpretContextInterface.add: guide absent source absent
guides/interpret.md InterpretContextInterface.clear: guide absent source absent
guides/interpret.md InterpretContextInterface.destroy: guide absent source absent
guides/interpret.md InterpretInterface.interpret: guide absent source absent
guides/interpret.md InterpretInterface.add: guide absent source absent
guides/interpret.md InterpretInterface.remove: guide absent source absent
guides/interpret.md InterpretInterface.template: guide absent source absent
guides/interpret.md InterpretInterface.templates: guide absent source absent
guides/interpret.md InterpretInterface.describe: guide absent source absent
guides/interpret.md InterpretInterface.narrate: guide absent source absent
guides/interpret.md InterpretInterface.destroy: guide absent source absent
guides/interpret.md pitch: readme absent tagline "A synchronous, deterministic bidirectional bridge between natural language and the `@orkestrel/reason` engine. FORWARD: raw text is normalized (contraction/abbreviation/correction substitutions), extracted (template-agnostic intent classification + numeric mining), matched against an added `Template`, its numbers assigned to the template's entity mappings, clarified (same-domain carry-over, defaults, dependency-ordered computed fields), formatted into a refined natural-language prompt, then generated into a `Subject` + `Definition` pair ready for `Reason.reason`. REVERSE: a `Definition` / `Subject` / `ReasonResult` renders to display-neutral prose through a lexicon-driven `Narrator`, complementing (never duplicating) rater's `describe*` family. Nothing here is an LLM, provider, or agent — the `prompt` a result carries is FOR an external model, never consumed internally. Every discriminant names its axis, never `kind` / `type`: `stage` splits the `[normalize, extract, clarify, format, generate]` pipeline phases, `category` splits provenance, and `code` splits coded errors. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 180
exit 1
```

## Facts for interpret (taken 2026-09-07T21:06Z by facts.sh)

- Checkout `/home/user/fleet/interpret`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `6414e9c`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 13 | summary 12 | banned 1 | tests/setup.ts(12) tests/src/core/stages/Normalizer.test.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept   | Spec                           | Source                    | Tests                                 |
    8:| --------- | ------------------------------ | ------------------------- | ------------------------------------- |
    9:| Interpret | [`interpret.md`](interpret.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                          |
    14:| ---------- | ------------------------------ |
    15:| `src/core` | [`interpret.md`](interpret.md) |
- Guide `guides/interpret.md`: 1009 lines. Headings:
    1:# Interpret
    22:## Surface
    73:### Types
    136:### Constants
    194:### Errors
    211:### Validators
    300:### Helpers
    418:### Parsers
    434:### Factories
    510:### Entities
    527:## Methods
    537:#### `NormalizerInterface`
    550:#### `ExtractorInterface`
    567:#### `ClarifierInterface`
    642:#### `FormatterInterface`
    675:#### `GeneratorInterface`
    713:#### `NarratorInterface`
    751:#### `RecordManagerInterface`
    796:#### `TemplateManagerInterface`
    842:#### `SubjectManagerInterface`
    870:#### `DefinitionManagerInterface`
    906:#### `InterpretContextInterface`
    944:#### `InterpretInterface`
- Table headers in `guides/interpret.md` (a header row is the row before a `| ---` row):
    75: | Type                         | Kind      | Shape                                                                                                                                                                                                                                                     |
    138: | API                            | Kind  | Summary                                                                                                                                             |
    196: | API                | Kind     | Summary                                               |
    227: | API                | Kind     | Narrows to                                                                                                                                                                                    |
    305: | API                  | Kind     | Summary                                                                                                                                |
    424: | API             | Kind     | Summary                                                                                                   |
    436: | API                       | Kind     | Builds…                                                                                    |
    512: | API                 | Kind  | Summary                                                                                                                                                                       |
    539: | Method      | Returns           | Behavior                                                                           |
    552: | Method    | Returns         | Behavior                                                      |
    569: | Method    | Returns         | Behavior                                                                                                                                                                                                                                                                   |
    644: | Method   | Returns        | Behavior                                                                                                                     |
    677: | Method     | Returns          | Behavior                                                                                                               |
    718: | Method     | Returns  | Behavior                                                                                                |
    761: | Method    | Returns                | Behavior                                                                                          |
    803: | Method      | Returns                       | Behavior                                                                                            |
    848: | Method     | Returns                      | Behavior                                                                                         |
    875: | Method        | Returns                         | Behavior                                                                                                  |
    913: | Method     | Returns                     | Behavior                                                                                         |
    957: | Method      | Returns                 | Behavior                                                                                                                             |
- Rows of any `### Entities` table (the Kind cell):
    514:  `Interpret`         | class
    515:  `Narrator`          | class
    516:  `Normalizer`        | class
    517:  `Extractor`         | class
    518:  `Clarifier`         | class
    519:  `Formatter`         | class
    520:  `Generator`         | class
    521:  `RecordManager`     | class
    522:  `TemplateManager`   | class
    523:  `SubjectManager`    | class
    524:  `DefinitionManager` | class
    525:  `InterpretContext`  | class
- H1 blockquote (`guides/interpret.md`):
    3: > A synchronous, deterministic bidirectional bridge between natural language
    4: > and the `@orkestrel/reason` engine. FORWARD: raw text is
    5: > **normalized** (contraction/abbreviation/correction substitutions),
    6: > **extracted** (template-agnostic intent classification + numeric mining),
    7: > matched against an added **`Template`**, its numbers **assigned** to
    8: > the template's entity mappings, **clarified** (same-domain carry-over,
    9: > defaults, dependency-ordered computed fields), **formatted** into a
    10: > refined natural-language prompt, then **generated** into a `Subject` +
    11: > `Definition` pair ready for `Reason.reason`. REVERSE: a `Definition` /
    12: > `Subject` / `ReasonResult` renders to display-neutral prose through a
    13: > lexicon-driven `Narrator`, complementing (never duplicating) rater's
    14: > `describe*` family. Nothing here is an LLM, provider, or agent — the
    15: > `prompt` a result carries is FOR an external model, never consumed
    16: > internally. Every discriminant names its axis, never `kind` / `type`:
    17: > `stage` splits the `[normalize, extract, clarify, format, generate]` pipeline
    18: > phases, `category` splits provenance, and
    19: > `code` splits coded errors. Source: [`src/core`](../src/core).
    20: > Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    22: ## Surface
    24: Add a template, interpret text through the normalize/extract/clarify/format/generate
- README (`README.md`) first lines:
    # @orkestrel/interpret
    
    A synchronous, deterministic bidirectional bridge between
    natural language and the [`@orkestrel/reason`](https://github.com/orkestrel/reason)
    engine. FORWARD: raw text is normalized, classified into an intent, matched
    against an added `Template`, mined for numeric entities, clarified
    (carry-over / defaults / computed fields), formatted into a refined prompt,
    then generated into a `Subject` + `Definition` pair ready for
    `Reason.reason`. REVERSE: a `Definition` / `Subject` / `ReasonResult`
    renders to display-neutral prose through a lexicon-driven `Narrator`.
    Nothing here is an LLM, provider, or agent. Environment-agnostic — no I/O,
    no browser or server assumptions. Part of the `@orkestrel` line.
- `## Patterns` fences, each with its nearest preceding heading:
    27: fence under "## Surface"
    158: fence under "### Constants"
    201: fence under "### Errors"
    242: fence under "### Validators"
    326: fence under "### Helpers"
    346: fence under "### Helpers"
    369: fence under "### Helpers"
    428: fence under "### Parsers"
    450: fence under "### Factories"
    543: fence under "#### `NormalizerInterface`"
    556: fence under "#### `ExtractorInterface`"
    573: fence under "#### `ClarifierInterface`"
    604: fence under "#### `ClarifierInterface`"
    648: fence under "#### `FormatterInterface`"
    681: fence under "#### `GeneratorInterface`"
    727: fence under "#### `NarratorInterface`"
    770: fence under "#### `RecordManagerInterface`"
    812: fence under "#### `TemplateManagerInterface`"
    857: fence under "#### `SubjectManagerInterface`"
    884: fence under "#### `DefinitionManagerInterface`"
    921: fence under "#### `InterpretContextInterface`"
    968: fence under "#### `InterpretInterface`"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:78:export function createInterpret(options?: InterpretOptions): InterpretInterface {
    src/core/factories.ts:96:export function createNormalizer(options?: NormalizerOptions): NormalizerInterface {
    src/core/factories.ts:117:export function createExtractor(options?: ExtractorOptions): ExtractorInterface {
    src/core/factories.ts:135:export function createClarifier(options?: ClarifierOptions): ClarifierInterface {
    src/core/factories.ts:152:export function createFormatter(options?: FormatterOptions): FormatterInterface {
    src/core/factories.ts:168:export function createGenerator(): GeneratorInterface {
    src/core/factories.ts:193:export function createTemplateManager(options?: TemplateManagerOptions): TemplateManagerInterface {
    src/core/factories.ts:215:export function createSubjectManager(options?: SubjectManagerOptions): SubjectManagerInterface {
    src/core/factories.ts:236:export function createDefinitionManager(
    src/core/factories.ts:256:export function createInterpretContext(
    src/core/factories.ts:281:export function createNarrator(options?: NarratorOptions): NarratorInterface {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/stages/Formatter.ts:54:export class Formatter implements FormatterInterface {
    src/core/stages/Extractor.ts:28:export class Extractor implements ExtractorInterface {
    src/core/stages/Normalizer.ts:34:export class Normalizer implements NormalizerInterface {
    src/core/stages/Generator.ts:57:export class Generator implements GeneratorInterface {
    src/core/stages/Clarifier.ts:71:export class Clarifier implements ClarifierInterface {
    src/core/managers/RecordManager.ts:54:export class RecordManager<TValue, TRecord extends RecordStamp> implements RecordManagerInterface<
    src/core/managers/SubjectManager.ts:37:export class SubjectManager implements SubjectManagerInterface {
    src/core/managers/DefinitionManager.ts:36:export class DefinitionManager implements DefinitionManagerInterface {
    src/core/managers/TemplateManager.ts:49:export class TemplateManager implements TemplateManagerInterface {
    src/core/InterpretContext.ts:41:export class InterpretContext implements InterpretContextInterface {
    src/core/Narrator.ts:36:export class Narrator implements NarratorInterface {
    src/core/errors.ts:18:export class InterpretError extends Error {
    src/core/Interpret.ts:95:export class Interpret implements InterpretInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/stages/Formatter.ts:1
    src/core/stages/Extractor.ts:1
    src/core/stages/Normalizer.ts:1
    src/core/stages/Generator.ts:1
    src/core/stages/Clarifier.ts:1
    src/core/validators.ts:12
    src/core/factories.ts:11
    src/core/helpers.ts:18
    src/core/managers/RecordManager.ts:1
    src/core/managers/SubjectManager.ts:1
    src/core/managers/DefinitionManager.ts:1
    src/core/managers/TemplateManager.ts:1
    src/core/InterpretContext.ts:1
    src/core/parsers.ts:1
    src/core/Narrator.ts:1
    src/core/errors.ts:1
    src/core/Interpret.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    20:} from '@orkestrel/guide'
    107:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    113:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    158:		for (const group of guide.methods()) {
    159:			const members = source.methods(group.interface).map((method) => method.name)
    167:					expect(findMissing(members, documented)).toEqual([])
    170:					expect(findMissing(documented, members)).toEqual([])
    176:							: findMissing(
    177:									source.methods(entity).map((method) => method.name),
    195:				findUnexampled(
    198:					source.examples().map((example) => example.name),
    203:		for (const group of guide.methods()) {
    208:					? source.examples(group.interface).map((example) => example.name)
    212:							.concat(source.examples(entity).map((example) => example.name))
    219:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    231:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-interpret-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/interpret.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/interpret.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-interpret-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
