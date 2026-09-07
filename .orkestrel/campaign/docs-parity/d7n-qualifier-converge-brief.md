# Brief — P.2 `d7n-qualifier-converge` (qualifier under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/qualifier` from the committed baseline `daea207` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.14`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/qualifier.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/qualifier/guides/qualifier.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-qualifier-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/qualifier.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/qualifier.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/qualifier.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/qualifier.md type Eligibility: guide absent source "Represents the eligibility outcome axis."
guides/qualifier.md type QualificationEffect: guide absent source "Represents an authored ruling's eligibility impact."
guides/qualifier.md type QualificationPass: guide absent source "Represents one ordered derivation or rule pass."
guides/qualifier.md type QualificationProjection: guide absent source "Represents one pass's internal working projection."
guides/qualifier.md type QualificationContext: guide absent source "Represents the internal projection record stored under `QUALIFICATION_KEY`."
guides/qualifier.md interface RulingInput: guide absent source "Carries the optional fields `createRuling` accepts."
guides/qualifier.md interface QualificationInput: guide absent source "Carries the optional fields `createQualificationDefinition` accepts."
guides/qualifier.md interface Ruling: guide absent source "Represents an authored consequence for one rule in one logical pass."
guides/qualifier.md interface Premise: guide absent source "Represents display-neutral evidence for one condition, in one of two authoring modes. A CHECKED premise carries `field` and `comparison`; a DESCRIBED premise carries neither and renders from `description` instead. The checked form renders only when `field` and `comparison` are BOTH present, and `description` then goes unused; a premise missing either half of the checked pair renders as described instead. `met` is three-state: `true` (met), `false` (not met), or absent (not evaluated, rendered as unknown)."
guides/qualifier.md interface Finding: guide absent source "Represents one resolved ruling."
guides/qualifier.md interface Derivation: guide absent source "Represents one quantitative pass's audit result."
guides/qualifier.md interface QualificationDefinition: guide absent source "Represents a pure authored qualification definition."
guides/qualifier.md interface QualificationResult: guide absent source "Represents one subject's complete qualification outcome."
guides/qualifier.md type QualifierErrorCode: guide absent source "Represents a coded `QualifierError` programmer-error code."
guides/qualifier.md interface QualifierErrorContext: guide absent source "Represents the structured payload a `QualifierError` carries."
guides/qualifier.md type QualifierEventMap: guide absent source "Represents the push observation surface of a `QualifierInterface`."
guides/qualifier.md interface QualifierOptions: guide absent source "Carries the options for `createQualifier` / the `Qualifier` constructor."
guides/qualifier.md interface QualifierInterface: guide absent source "Owns or borrows one reason engine and returns eligibility."
guides/qualifier.md const DEFAULT_QUALIFIER_VALIDATE: guide "`true` — validate authored definitions before qualification." source "Holds the default definition validation policy for `createQualifier` / `Qualifier.qualify`."
guides/qualifier.md const QUALIFICATION_KEY: guide "`'qualification'` — the reserved internal projection namespace." source "Names the reserved internal projection namespace a pass's working projection is written under."
guides/qualifier.md const ELIGIBILITY_PRECEDENCE: guide "Severity order: `ineligible`, `referral`, `eligible`." source "Lists the eligibility severities in order — most to least severe."
guides/qualifier.md const EFFECT_ELIGIBILITIES: guide "Eligibility impact by `QualificationEffect`; `condition` remains eligible." source "Maps each `QualificationEffect` to its eligibility impact; `condition` remains eligible."
guides/qualifier.md class QualifierError: guide "Carries a `QualifierErrorCode` and an optional context record." source "Represents a coded programmer error thrown by the qualifier layer."
guides/qualifier.md function isQualifierError: guide "Safely narrows a caught value to `QualifierError`." source "Narrows a caught value to a `QualifierError`."
guides/qualifier.md const isEligibility: guide absent source "Determines whether a value is an `Eligibility` literal."
guides/qualifier.md const isQualificationEffect: guide absent source "Determines whether a value is a `QualificationEffect` literal."
guides/qualifier.md function isEligibilityRecord: guide absent source "Determines whether a value is an open string-keyed record of `Eligibility` values."
guides/qualifier.md function isPremise: guide absent source "Determines whether a value is an open result-side `Premise`."
guides/qualifier.md function isFinding: guide absent source "Determines whether a value is an open result-side `Finding`."
guides/qualifier.md function isDerivation: guide absent source "Determines whether a value is an open result-side `Derivation`."
guides/qualifier.md function isQualificationResult: guide absent source "Determines whether a value is an open `QualificationResult` returned by a qualifier."
guides/qualifier.md function isRuling: guide absent source "Determines whether a value is an exact `Ruling` record."
guides/qualifier.md function isQualificationPass: guide absent source "Determines whether a value is a `QualificationPass` (a quantitative or logical definition)."
guides/qualifier.md function isQualificationDefinition: guide absent source "Determines whether a value is an exact `QualificationDefinition` record."
guides/qualifier.md function interpolateMessage: guide "Interpolate `{{dotted.path}}` tokens against a subject." source "Interpolates `{{dotted.path}}` tokens in a message template against a subject."
guides/qualifier.md function renderComparison: guide "Render one comparison as a display-neutral phrase." source "Renders a `Premise` comparison as a display-neutral verb phrase."
guides/qualifier.md function renderValue: guide "Render scalar and structured expected values." source "Renders a structured or scalar expected value display-neutrally."
guides/qualifier.md function renderPremise: guide "Render one premise as a sentence." source "Renders one `Premise` into a display-neutral sentence."
guides/qualifier.md function checkToPremise: guide "Join an authored `Check` and evaluated `CheckResult`." source "Builds a `Premise` from an authored `Check` and its evaluated `CheckResult`."
guides/qualifier.md function ruleToPremises: guide "Re-evaluate one rule's atoms into rich premise evidence." source "Builds rich premises for one fired `Rule` by walking its premise atoms and re-evaluating each against the working subject."
guides/qualifier.md function findRule: guide "Locate one authored rule by id." source "Locates an authored `Rule` by id."
guides/qualifier.md function reasonResultToProjection: guide "Project one reason result into the internal qualification namespace." source "Projects one reason result into the internal qualification namespace."
guides/qualifier.md function quantitativeResultToDerivation: guide "Project a quantitative result into a `Derivation`." source "Projects a quantitative result into a `Derivation` audit record."
guides/qualifier.md function qualificationToRecord: guide "Wrap a `QualificationContext` under `QUALIFICATION_KEY`." source "Wraps a `QualificationContext` under `QUALIFICATION_KEY`."
guides/qualifier.md function mergeQualificationContext: guide "Copy-on-write merge one pass projection into the context." source "Merges one pass projection into the context, copy-on-write."
guides/qualifier.md function rulingToFinding: guide "Join a ruling, rule result, subject, and evaluator into a finding." source "Joins a ruling, its logical rule result, the pass, the pre-projection subject, and an evaluator into a `Finding`."
guides/qualifier.md function deriveFindingEligibility: guide "Derive eligibility from applied findings." source "Derives global eligibility from applied, unscoped findings."
guides/qualifier.md function combineEligibilities: guide "Return the most severe eligibility in a list." source "Returns the most severe `Eligibility` in a list."
guides/qualifier.md function deriveScopeEligibilities: guide "Derive one eligibility per finding scope." source "Derives one eligibility per finding scope."
guides/qualifier.md function describeMissingReferences: guide "Describe each ruling whose pass or rule does not exist." source "Describes each ruling whose pass or rule does not exist or whose pass is not logical, and each pass id shadowing the reserved `QUALIFICATION_KEY`."
guides/qualifier.md function hasReservedKey: guide "Whether a subject already owns `QUALIFICATION_KEY`." source "Determines whether a subject already owns the reserved `QUALIFICATION_KEY`."
guides/qualifier.md function assertSubject: guide "Narrow and reject malformed or reserved-key subjects." source "Asserts a value is a valid qualification `Subject`, narrowing it in place."
guides/qualifier.md function mapEngineError: guide "Map an engine throw to a typed `QualifierError`." source "Maps an engine throw caught while running one pass to a typed `QualifierError`."
guides/qualifier.md function describeEmptyLogicalPasses: guide "Describe each logical pass carrying no rulings." source "Describes each logical pass carrying no rulings."
guides/qualifier.md function describeUnreadDerivations: guide "Describe each quantitative pass never read by a later pass." source "Describes each quantitative pass never read by a later pass."
guides/qualifier.md function createQualifier: guide absent source "Creates one qualifier over a reason engine."
guides/qualifier.md function createQualificationDefinition: guide absent source "Creates a `QualificationDefinition`."
guides/qualifier.md function createRuling: guide absent source "Creates a `Ruling` — one authored consequence for one rule in one pass."
guides/qualifier.md class Qualifier: guide "Owns or borrows one reason engine, validates definitions, runs ordered passes, and returns eligibility." source "Runs ordered passes over one reason engine and returns eligibility."
guides/qualifier.md QualifierInterface.qualify: guide absent source "Qualifies one subject against one authored definition."
guides/qualifier.md QualifierInterface.validate: guide absent source "Validates one authored definition semantically, without running it."
guides/qualifier.md QualifierInterface.destroy: guide absent source "Destroys this qualifier, idempotently."
guides/qualifier.md pitch: readme absent tagline "A synchronous, deterministic eligibility engine. Pure, JSON-serializable `QualificationDefinition`s contain ordered `passes` (`quantitative` derivations and `logical` rulings) and are evaluated against subjects through one injected `@orkestrel/reason` engine. The result is a fresh `QualificationResult` with global `eligibility`, optional scoped eligibility, evidence-rich `findings`, quantitative `derivations`, a trace, and accumulated errors. `Qualifier` stops at eligibility — it reports whether and where a subject may proceed, never calculates line amounts, builds worksheets, totals rates, emits notices, decides authority, or aggregates a batch. Qualification never mutates its inputs: every result is a fresh object. The internal working projection under `QUALIFICATION_KEY` is discarded after each call and must never be forwarded to a downstream consumer. A failed qualification, a global `ineligible`, and a global `referral` are terminal — a caller that runs qualification ahead of a downstream step stops there. A scoped restriction removes only that named scope from what the caller selects next, so an excluded scope is never evaluated merely to discard its outcome. `Qualifier` either receives an injected `ReasonInterface` (never destroyed by `Qualifier`) or builds and OWNS its own engine (`bail: false`), destroyed in `destroy()`. An injected engine MUST be able to dispatch both quantitative and logical definitions — one it cannot dispatch surfaces `QualifierError('ENGINE')` wrapping the engine's throw. Every `qualify` call fires through `Qualifier`'s typed `emitter`. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 63
exit 1
```

## Facts for qualifier (taken 2026-09-07T21:13Z by facts.sh)

- Checkout `/home/user/fleet/qualifier`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `daea207`, status: clean
- `package.json`: version `0.0.14`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 15 | summary 15 | banned 0 | tests/setup.ts(15) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept   | Spec                           | Source                    | Tests                                 |
    8:| --------- | ------------------------------ | ------------------------- | ------------------------------------- |
    9:| Qualifier | [`qualifier.md`](qualifier.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                          |
    14:| ---------- | ------------------------------ |
    15:| `src/core` | [`qualifier.md`](qualifier.md) |
- Guide `guides/qualifier.md`: 826 lines. Headings:
    1:# Qualifier
    30:## Surface
    68:### Types
    98:### Constants
    112:### Errors
    142:### Validators
    210:### Helpers
    337:### Factories
    367:### Entities
    373:## Methods
    375:#### `QualifierInterface`
    410:## Contract
    412:### Qualification order
    447:### Eligibility
    471:### Scopes
    497:### Validation
    522:## Patterns
    524:### Quantitative derivation before logical eligibility
    587:### Scoped exclusion
    621:### Conditions do not block downstream work
    640:### Referral blocks downstream work
    652:### Engine injection
    683:### Observing
    699:### Caller composition
    722:### Batch aggregates
    743:### Scoped eligibility drives selection
    791:## Tests
    814:## Practices
- Table headers in `guides/qualifier.md` (a header row is the row before a `| ---` row):
    70: | Type                      | Kind      | Shape                                                                                                                                                                                                             |
    100: | API                          | Kind  | Summary                                                                    |
    114: | API                | Kind     | Summary                                                        |
    153: | API                         | Kind     | Posture | Checks                                                                                           | Leaves unchecked and why                                                                                              |
    215: | API                              | Kind     | Summary                                                              |
    339: | API                             | Kind     | Builds                       |
    369: | API         | Kind  | Summary                                                                                                 |
    382: | Method     | Returns                  | Behavior                                                                                                   |
    451: | Effect        | Eligibility  |
- Rows of any `### Entities` table (the Kind cell):
    371:  `Qualifier` | class
- H1 blockquote (`guides/qualifier.md`):
    3: > A synchronous, deterministic **eligibility engine**.
    4: > Pure, JSON-serializable `QualificationDefinition`s contain ordered `passes`
    5: > (`quantitative` derivations and `logical` rulings) and are evaluated against
    6: > subjects through one injected `@orkestrel/reason` engine. The result is a fresh
    7: > `QualificationResult` with global `eligibility`, optional scoped eligibility,
    8: > evidence-rich `findings`, quantitative `derivations`, a trace, and accumulated
    9: > errors.
    10: >
    11: > `Qualifier` stops at eligibility — it reports whether and where a subject may
    12: > proceed, never calculates line amounts, builds worksheets, totals rates, emits
    13: > notices, decides authority, or aggregates a batch. Qualification never mutates
    14: > its inputs: every result is a fresh object. The internal working projection under
    15: > `QUALIFICATION_KEY` is discarded after each call and must never be forwarded to
    16: > a downstream consumer. A failed qualification, a global `ineligible`, and a
    17: > global `referral` are terminal — a caller that runs qualification ahead of a
    18: > downstream step stops there. A scoped restriction removes only that named scope
    19: > from what the caller selects next, so an excluded scope is never evaluated merely
    20: > to discard its outcome.
    21: >
    22: > `Qualifier` either receives an injected `ReasonInterface` (never destroyed by
    23: > `Qualifier`) or builds and OWNS its own engine (`bail: false`), destroyed in
    24: > `destroy()`. An injected engine MUST be able to dispatch both quantitative and
    25: > logical definitions — one it cannot dispatch surfaces `QualifierError('ENGINE')`
    26: > wrapping the engine's throw. Every `qualify` call fires through `Qualifier`'s
    27: > typed `emitter`. Source: [`src/core`](../src/core). Surfaced
    28: > through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    30: ## Surface
    32: Create a qualifier, author a definition, and qualify a subject:
- README (`README.md`) first lines:
    # @orkestrel/qualifier
    
    A typed **eligibility engine** over [`@orkestrel/reason`](https://github.com/orkestrel/reason):
    authored **passes** — quantitative derivations and logical rule gates — run in order
    against a **subject** (a plain data record) to produce **findings** (evidence-rich
    ruling outcomes), **derivations** (quantitative audit trails), and **eligibility**
    (global plus per-scope). The caller supplies the definition; `Qualifier` only
    evaluates what it is given. Qualification never mutates its inputs — every result is
    a fresh object. Environment-agnostic — no I/O, no browser or server assumptions.
    Part of the `@orkestrel` line.
    
    ## Install
- `## Patterns` fences, each with its nearest preceding heading:
    34: fence under "## Surface"
    126: fence under "### Errors"
    166: fence under "### Validators"
    245: fence under "### Helpers"
    310: fence under "### Helpers"
    345: fence under "### Factories"
    388: fence under "#### `QualifierInterface`"
    427: fence under "### Qualification order"
    433: fence under "### Qualification order"
    441: fence under "### Qualification order"
    463: fence under "### Eligibility"
    477: fence under "### Scopes"
    486: fence under "### Scopes"
    529: fence under "### Quantitative derivation before logical eligibility"
    592: fence under "### Scoped exclusion"
    614: fence under "### Scoped exclusion"
    623: fence under "### Conditions do not block downstream work"
    632: fence under "### Conditions do not block downstream work"
    642: fence under "### Referral blocks downstream work"
    660: fence under "### Engine injection"
    685: fence under "### Observing"
    704: fence under "### Caller composition"
    728: fence under "### Batch aggregates"
    749: fence under "### Scoped eligibility drives selection"
    774: fence under "### Scoped eligibility drives selection"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:36:export function createQualifier(options?: QualifierOptions): QualifierInterface {
    src/core/factories.ts:61:export function createQualificationDefinition(
    src/core/factories.ts:94:export function createRuling(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/Qualifier.ts:54:export class Qualifier implements QualifierInterface {
    src/core/errors.ts:18:export class QualifierError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/Qualifier.ts:4
    src/core/factories.ts:3
    src/core/helpers.ts:21
    src/core/types.ts:3
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    52:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    58:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    103:		for (const group of guide.methods()) {
    104:			const members = source.methods(group.interface).map((method) => method.name)
    112:					expect(findMissing(members, documented)).toEqual([])
    115:					expect(findMissing(documented, members)).toEqual([])
    121:							: findMissing(
    122:									source.methods(entity).map((method) => method.name),
    140:				findUnexampled(
    143:					source.examples().map((example) => example.name),
    148:		for (const group of guide.methods()) {
    153:					? source.examples(group.interface).map((example) => example.name)
    157:							.concat(source.examples(entity).map((example) => example.name))
    164:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    176:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 791:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-qualifier-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/qualifier.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/qualifier.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-qualifier-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
