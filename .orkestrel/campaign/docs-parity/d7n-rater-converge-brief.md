# Brief — P.2 `d7n-rater-converge` (rater under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/rater` from the committed baseline `39c6042` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.14`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/rater.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/rater/guides/rater.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-rater-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/rater.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/rater.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/rater.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/rater.md type Stage: guide absent source "Names a worksheet derivation step stage."
guides/rater.md type RaterErrorCode: guide absent source "Names a coded `RaterError` programmer-error code."
guides/rater.md type TotalHandler: guide absent source "Represents a pure total port over resolved lines."
guides/rater.md interface LineDefinition: guide absent source "Represents one rateable line — a quantitative definition joined to display metadata."
guides/rater.md interface RatingDefinition: guide absent source "Represents a pure authored rating — a named, ordered set of lines."
guides/rater.md interface Evidence: guide absent source "Represents a checked-evidence row rendered into a display-neutral sentence."
guides/rater.md interface WorksheetFactor: guide absent source "Represents a resolved quantitative factor, joined to its authored metadata."
guides/rater.md interface WorksheetGroup: guide absent source "Represents a resolved quantitative group, joined to its authored metadata."
guides/rater.md interface Step: guide absent source "Represents a display-neutral worksheet derivation step."
guides/rater.md interface Worksheet: guide absent source "Represents a quantitative definition joined to its result — the rating audit trail."
guides/rater.md interface LineResult: guide absent source "Represents one line's rating outcome."
guides/rater.md interface RatingResult: guide absent source "Represents a rated outcome across every line of one `rate` call."
guides/rater.md type RaterEventMap: guide absent source "Represents the push observation surface of a `RaterInterface`."
guides/rater.md interface RaterOptions: guide absent source "Configures `createRater` and the `Rater` constructor."
guides/rater.md interface RaterInterface: guide absent source "Represents the rating orchestrator over the shared quantitative reasoning engine."
guides/rater.md class RaterError: guide "Carries a `RaterErrorCode` (`DEFINITION` / `MISMATCH` / `DESTROYED`) + optional `context`." source "Represents a coded programmer error thrown by the rating layer."
guides/rater.md function isRaterError: guide "Narrow a caught value to a `RaterError`." source "Narrows a caught value to a `RaterError`."
guides/rater.md const isStage: guide absent source "Determines whether a value is a `Stage` literal."
guides/rater.md function isLineDefinition: guide absent source "Determines whether a value is an exact `LineDefinition` record."
guides/rater.md function isRatingDefinition: guide absent source "Determines whether a value is an exact `RatingDefinition` record."
guides/rater.md function isEvidence: guide absent source "Determines whether a value is an open result-side `Evidence` object."
guides/rater.md function isWorksheetFactor: guide absent source "Determines whether a value is an open `WorksheetFactor` result object."
guides/rater.md function isWorksheetGroup: guide absent source "Determines whether a value is an open `WorksheetGroup` result object."
guides/rater.md function isStep: guide absent source "Determines whether a value is an open `Step` result object."
guides/rater.md function isWorksheet: guide absent source "Determines whether a value is an open `Worksheet` result object."
guides/rater.md function isLineResult: guide absent source "Determines whether a value is an open `LineResult` object."
guides/rater.md function isRatingResult: guide absent source "Determines whether a value is an open `RatingResult` object."
guides/rater.md function buildLineDefinition: guide "Build a `LineDefinition` from id / name / rate (`overrides` merged over the defaults)." source "Builds a `LineDefinition`."
guides/rater.md function buildRatingDefinition: guide "Build a `RatingDefinition` from id / name / lines (`overrides` merged over the defaults)." source "Builds a `RatingDefinition`."
guides/rater.md function buildEvidence: guide "Build an `Evidence` row from an evaluated `Check`." source "Builds an `Evidence` row from an evaluated `Check`."
guides/rater.md function buildEvidenceRows: guide "Build one evidence row per authored check of a quantitative factor, joined to its result." source "Builds one evidence row per authored check of a quantitative factor, joined to that check's evaluated result."
guides/rater.md function buildWorksheetFactor: guide "Join one authored quantitative factor to its evaluated `FactorResult`." source "Joins one authored quantitative factor to its evaluated `FactorResult`."
guides/rater.md function buildWorksheetGroup: guide "Join one authored quantitative group to its evaluated `GroupResult`." source "Joins one authored quantitative group to its evaluated `GroupResult`."
guides/rater.md function buildWorksheetStep: guide "Build one display-neutral `Step` row." source "Builds one display-neutral `Step` row."
guides/rater.md function buildWorksheetSteps: guide "Build the ordered `Step` rows for a resolved `Worksheet`." source "Builds the ordered `Step` rows for a resolved `Worksheet`."
guides/rater.md function buildWorksheet: guide "Join a `QuantitativeDefinition` and its `QuantitativeResult` into a `Worksheet` — the rating audit trail." source "Joins a `QuantitativeDefinition` and its `QuantitativeResult` into a `Worksheet` — the rating audit trail."
guides/rater.md function buildLineResult: guide "Build a rated `LineResult` from a line's evaluated `QuantitativeResult`." source "Builds a rated `LineResult` from a line's evaluated `QuantitativeResult`."
guides/rater.md function sumAmounts: guide "Sum defined line amounts." source "Sums defined line amounts."
guides/rater.md function createRater: guide absent source "Creates a rating orchestrator."
guides/rater.md class Rater: guide "The rating orchestrator — owns (or receives) the shared quantitative reasoning engine and projects results into the rating domain vocabulary." source "Orchestrates rating — owns (or receives) the shared quantitative reasoning engine and projects results into the rating domain vocabulary."
guides/rater.md RaterInterface.rate: guide absent source absent
guides/rater.md RaterInterface.destroy: guide absent source absent
guides/rater.md pitch: readme absent tagline "A typed quantitative rating layer over `@orkestrel/reason`'s shared engine: authored lines — each a plain reason `QuantitativeDefinition` joined to display metadata — are rated against a subject (a plain data record) to produce a `LineResult` per line (an `amount` plus its `Worksheet` audit trail) and one `RatingResult` (every line's outcome plus a derived `total`). The caller decides WHICH lines to rate for a subject — `Rater` only rates the lines it is given and reports what each one resolved to; it performs NO evaluation arithmetic of its own. Rating never mutates its inputs: every result is a fresh object. `Rater` either receives an injected `ReasonInterface` (never destroyed by `Rater`) or builds and OWNS its own quantitative-only engine (`bail: false`), destroyed in `destroy()`. An injected engine MUST be able to dispatch a quantitative definition — one it cannot dispatch surfaces the engine's own error, never wrapped by this package. Every `rate` call fires once through `Rater`'s typed `emitter`. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 43
exit 1
```

## Facts for rater (taken 2026-09-07T21:18Z by facts.sh)

- Checkout `/home/user/fleet/rater`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `39c6042`, status: clean
- `package.json`: version `0.0.14`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 15 | summary 15 | banned 0 | tests/setup.ts(15) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                   | Source                    | Tests                                 |
    8:| ------- | ---------------------- | ------------------------- | ------------------------------------- |
    9:| Rater   | [`rater.md`](rater.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                  |
    14:| ---------- | ---------------------- |
    15:| `src/core` | [`rater.md`](rater.md) |
- Guide `guides/rater.md`: 294 lines. Headings:
    1:# Rater
    17:## Surface
    62:### Types
    82:### Errors
    99:### Validators
    137:### Helpers
    238:### Factories
    254:### Entities
    260:## Methods
    267:#### `RaterInterface`
- Table headers in `guides/rater.md` (a header row is the row before a `| ---` row):
    64: | Type               | Kind      | Shape                                                                                                                                                           |
    84: | API            | Kind     | Summary                                                                                    |
    111: | API                  | Kind     | Checks                                                                                                                                                                      | Leaves unchecked and why                                                                                                         |
    142: | API                     | Kind     | Summary                                                                                                   |
    240: | API           | Kind     | Builds…                                                                   |
    256: | API     | Kind  | Summary                                                                                                                                       |
    274: | Method    | Returns        | Behavior                                                                                        |
- Rows of any `### Entities` table (the Kind cell):
    258:  `Rater` | class
- H1 blockquote (`guides/rater.md`):
    3: > A typed quantitative rating layer over `@orkestrel/reason`'s shared engine: authored
    4: > **lines** — each a plain reason `QuantitativeDefinition` joined to display metadata —
    5: > are rated against a **subject** (a plain data record) to produce a `LineResult` per
    6: > line (an `amount` plus its `Worksheet` audit trail) and one `RatingResult` (every
    7: > line's outcome plus a derived `total`). The caller decides WHICH lines to rate for a
    8: > subject — `Rater` only rates the lines it is given and reports what each one resolved
    9: > to; it performs NO evaluation arithmetic of its own. Rating never mutates its inputs:
    10: > every result is a fresh object. `Rater` either receives an injected `ReasonInterface`
    11: > (never destroyed by `Rater`) or builds and OWNS its own quantitative-only engine
    12: > (`bail: false`), destroyed in `destroy()`. An injected engine MUST be able to dispatch
    13: > a quantitative definition — one it cannot dispatch surfaces the engine's own error,
    14: > never wrapped by this package. Every `rate` call fires once through `Rater`'s typed
    15: > `emitter`. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    17: ## Surface
    19: Create a rater, rate one subject against a list of lines (or a full rating
- README (`README.md`) first lines:
    # @orkestrel/rater
    
    A typed **quantitative rating layer** over [`@orkestrel/reason`](https://github.com/orkestrel/reason):
    authored **lines** — each a plain reason `QuantitativeDefinition` joined to display
    metadata — are rated against a **subject** (a plain data record) to produce a
    `LineResult` per line (an `amount` plus its `Worksheet` audit trail) and one
    `RatingResult` (every line's outcome plus a derived `total`). The caller decides
    which lines to rate; `Rater` only evaluates what it is given. Rating never mutates
    its inputs — every result is a fresh object. Environment-agnostic — no I/O, no
    browser or server assumptions. Part of the `@orkestrel` line.
    
    ## Install
- `## Patterns` fences, each with its nearest preceding heading:
    22: fence under "## Surface"
    89: fence under "### Errors"
    124: fence under "### Validators"
    159: fence under "### Helpers"
    176: fence under "### Helpers"
    190: fence under "### Helpers"
    247: fence under "### Factories"
    279: fence under "#### `RaterInterface`"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:18:export function createRater(options?: RaterOptions): RaterInterface {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/Rater.ts:47:export class Rater implements RaterInterface {
    src/core/errors.ts:18:export class RaterError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/validators.ts:10
    src/core/factories.ts:1
    src/core/helpers.ts:11
    src/core/Rater.ts:1
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    65:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    71:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    116:		for (const group of guide.methods()) {
    117:			const members = source.methods(group.interface).map((method) => method.name)
    125:					expect(findMissing(members, documented)).toEqual([])
    128:					expect(findMissing(documented, members)).toEqual([])
    134:							: findMissing(
    135:									source.methods(entity).map((method) => method.name),
    153:				findUnexampled(
    156:					source.examples().map((example) => example.name),
    161:		for (const group of guide.methods()) {
    166:					? source.examples(group.interface).map((example) => example.name)
    170:							.concat(source.examples(entity).map((example) => example.name))
    177:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    189:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-rater-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/rater.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/rater.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-rater-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
