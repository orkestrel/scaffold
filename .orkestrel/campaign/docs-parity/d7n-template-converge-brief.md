# Brief — P.2 `d7n-template-converge` (template under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/template` from the committed baseline `67df803` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.7`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/template.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/template/guides/template.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-template-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/template.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/template.md` and `README.md`; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/template.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/template.md type MissingPolicy: guide absent source "Names how `TemplateInterface#fill` handles an unresolved required placeholder."
guides/template.md type TemplateFillValues: guide absent source "Represents the values a `TemplateInterface#fill` / `#validate` call resolves placeholders against."
guides/template.md type TemplateManagerEventMap: guide absent source "Declares the push observation surface of a `TemplateManagerInterface` — an id-keyed registry, so `register` / `remove` are the events (never ordered-list `append`/`prepend`)."
guides/template.md type TemplateErrorCode: guide absent source "Names the coded misuse / failure conditions thrown as a `TemplateError`."
guides/template.md interface TemplatePlaceholder: guide absent source "Represents one placeholder a `TemplateDefinition`'s `content` declares — its lookup name, an optional field path into the values record, whether it is required, and a literal fallback."
guides/template.md interface TemplateDefinition: guide absent source "Represents a named, versionable template record — pure data, no behavior."
guides/template.md interface TemplateFillOptions: guide absent source "Carries the per-call options for `TemplateInterface#fill` / `TemplateManagerInterface#fill`."
guides/template.md interface TemplateFillContext: guide absent source "Carries the full option bag `fillTemplate` takes — the per-call `TemplateFillOptions` plus the declared placeholders tokens resolve against."
guides/template.md interface TemplateTokenResolution: guide absent source "Represents one `{{name}}` token's resolution — the single token rule `fillTemplate` and `TemplateInterface#validate` share."
guides/template.md interface TemplateRegisterOptions: guide absent source "Carries the options for `TemplateManagerInterface#register`."
guides/template.md interface TemplateValidationResult: guide absent source "Reports the outcome of `TemplateInterface#validate` — which required placeholders are unresolved, and which supplied values are unused."
guides/template.md interface TemplateOptions: guide absent source "Carries the options for `createTemplate` / the `Template` constructor."
guides/template.md interface TemplateQuery: guide absent source "Represents a query for `TemplateManagerInterface#find` — every supplied field must match."
guides/template.md interface TemplateInterface: guide absent source "Declares the template contract — exact bijection with `Template`."
guides/template.md interface TemplateManagerOptions: guide absent source "Carries the options for `createTemplateManager` / the `TemplateManager` constructor."
guides/template.md interface TemplateManagerInterface: guide absent source "Declares the template registry — a self-owning, id-keyed record-holder with singular/plural accessors and batch overloads."
guides/template.md const FILL_PATTERN: guide "The shared `{{name}}` / escaped-`\\{{` substitution `RegExp` behind `fill` and `validate`." source "Holds the single-pass `{{name}}` substitution pattern shared by `Template#fill` and `Template#validate`."
guides/template.md const DEFAULT_MISSING_POLICY: guide "`'error'` — default `missing` policy when unspecified." source "Holds the default `missing` policy for `Template#fill` / `TemplateManager#fill` when unspecified."
guides/template.md const DEFAULT_LOCALE: guide "`'en-US'` — default `locale` for finite-number formatting when unspecified." source "Holds the default `locale` for `Template#fill` / `TemplateManager#fill` when unspecified."
guides/template.md const UNSAFE_FIELD_SEGMENTS: guide "`['__proto__', 'constructor', 'prototype']` — prototype-pollution-unsafe field-path segments." source "Lists the prototype-pollution-unsafe field-path segments — a fill lookup refuses to resolve ANY path containing one, treating the placeholder as unresolved."
guides/template.md class TemplateError: guide "Carries a `TemplateErrorCode` + optional `context`." source "Represents an error thrown by the template layer."
guides/template.md function isTemplateError: guide "Narrow a caught value to a `TemplateError`." source "Narrows an unknown caught value to a `TemplateError`."
guides/template.md function formatValue: guide "Format a resolved fill value — finite numbers get locale thousands grouping, everything else String-coerces." source "Formats a resolved fill value for substitution into a template's `content`."
guides/template.md function resolveSafeField: guide "Resolve a field path against a values record, refusing any path touching an unsafe segment." source "Resolves a field path against a fill-values record, refusing any path that touches a prototype-pollution-unsafe segment."
guides/template.md function resolveToken: guide "Resolve one `{{name}}` token — the single rule `fillTemplate` and `validate` both apply." source "Resolves one `{{name}}` token against the declared placeholders and the fill-values record."
guides/template.md function fillTemplate: guide "Substitute every `{{name}}` token in `content` against `values`, in a single pass." source "Substitutes every `{{name}}` token in `content` in a single pass."
guides/template.md function placeholderShape: guide "Build the `@orkestrel/contract` object shape describing a template's declared placeholders." source "Builds the `@orkestrel/contract` object shape describing a template's declared placeholders."
guides/template.md function createTemplate: guide absent source "Creates a template."
guides/template.md function createTemplateManager: guide absent source "Creates a template registry."
guides/template.md class Template: guide "Implements `TemplateInterface` exactly — a named, versionable `{{name}}` template." source "Represents a named, versionable template — `{{name}}` tokens in `content`, filled against a values record."
guides/template.md class TemplateManager: guide "Implements `TemplateManagerInterface` exactly — the self-owning, id-keyed registry." source "Represents the template registry — a self-owning, id-keyed record-holder for the `TemplateInterface` instances a consumer registers, looks up, fills, and validates by id, with singular/plural accessors, batch `remove` overloads, and emitter ownership."
guides/template.md TemplateInterface.definition: guide absent source absent
guides/template.md TemplateInterface.fill: guide absent source absent
guides/template.md TemplateInterface.validate: guide absent source absent
guides/template.md TemplateInterface.parameters: guide absent source absent
guides/template.md TemplateManagerInterface.register: guide absent source absent
guides/template.md TemplateManagerInterface.template: guide absent source absent
guides/template.md TemplateManagerInterface.templates: guide absent source absent
guides/template.md TemplateManagerInterface.find: guide absent source absent
guides/template.md TemplateManagerInterface.has: guide absent source absent
guides/template.md TemplateManagerInterface.remove: guide absent source absent
guides/template.md TemplateManagerInterface.clear: guide absent source absent
guides/template.md TemplateManagerInterface.destroy: guide absent source absent
guides/template.md TemplateManagerInterface.fill: guide absent source absent
guides/template.md TemplateManagerInterface.validate: guide absent source absent
guides/template.md TemplateManagerInterface.parameters: guide absent source absent
guides/template.md pitch: readme absent tagline "A named, versionable template layer: `{{name}}` tokens in a `content` string, resolved against a values record by a single-pass fill engine, and registered/looked-up by id through a self-owning `TemplateManager`. `validate` predicts `fill`'s `'error'`-policy outcome exactly — a token it reports `missing` is precisely a token that would throw. Every fill lookup is prototype-pollution-safe: any field-path segment in `UNSAFE_FIELD_SEGMENTS` (`__proto__` / `constructor` / `prototype`) is refused before `resolveField` is ever called. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 47
exit 1
```

## Facts for template (taken 2026-09-07T15:53Z by facts.sh)

- Checkout `/home/user/fleet/template`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `67df803`, status: clean
- `package.json`: version `0.0.7`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 0 | summary 0 | banned 0 | 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept  | Spec                         | Source                    | Tests                                 |
    8:| -------- | ---------------------------- | ------------------------- | ------------------------------------- |
    9:| Template | [`template.md`](template.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                        |
    14:| ---------- | ---------------------------- |
    15:| `src/core` | [`template.md`](template.md) |
- Guide `guides/template.md`: 259 lines. Headings:
    1:# Template
    13:## Surface
    33:### Types
    54:### Constants
    77:### Errors
    94:### Helpers
    119:### Shapers
    134:### Factories
    153:### Entities
    160:## Methods
    169:#### `TemplateInterface`
    192:#### `TemplateManagerInterface`
    235:## Tests
    254:## See also
- Table headers in `guides/template.md` (a header row is the row before a `| ---` row):
    35: | Type                       | Kind      | Shape                                                                                                                                                                       |
    56: | API                      | Kind  | Summary                                                                                       |
    79: | API               | Kind     | Summary                                             |
    99: | API                | Kind     | Summary                                                                                                      |
    124: | API                | Kind     | Summary                                                                                     |
    136: | API                     | Kind     | Builds…                                                                 |
    155: | API               | Kind  | Summary                                                                             |
    171: | Method       | Returns                                | Behavior                                                                                     |
    204: | Method       | Returns                                | Behavior                                                                                            |
- Rows of any `### Entities` table (the Kind cell):
    157:  `Template`        | class
    158:  `TemplateManager` | class
- H1 blockquote (`guides/template.md`):
    3: > A named, versionable template layer: `{{name}}` tokens in a `content`
    4: > string, resolved against a values record by a single-pass fill engine, and
    5: > registered/looked-up by id through a self-owning `TemplateManager`.
    6: > `validate` predicts `fill`'s `'error'`-policy outcome exactly
    7: > — a token it reports `missing` is precisely a token that would throw. Every
    8: > fill lookup is prototype-pollution-safe: any field-path segment in
    9: > `UNSAFE_FIELD_SEGMENTS` (`__proto__` / `constructor` / `prototype`) is
    10: > refused before `resolveField` is ever called. Source: [`src/core`](../src/core).
    11: > Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    13: ## Surface
    15: Create a template, fill it against a values record, then register it in a
- README (`README.md`) first lines:
    # @orkestrel/template
    
    A stateful template registry and filler with typed placeholders — `{{name}}`
    tokens in a `content` string, resolved against a values record by a
    single-pass fill engine, and registered and looked up by id through
    `TemplateManager`. Every fill lookup refuses a prototype-pollution-unsafe
    field path: any segment in `UNSAFE_FIELD_SEGMENTS` (`__proto__`,
    `constructor`, `prototype`) is refused before the record is ever read. Part of
    the `@orkestrel` line.
    
    ## Install
    
- `## Patterns` fences, each with its nearest preceding heading:
    18: fence under "## Surface"
    63: fence under "### Constants"
    84: fence under "### Errors"
    106: fence under "### Helpers"
    128: fence under "### Shapers"
    141: fence under "### Factories"
    178: fence under "#### `TemplateInterface`"
    218: fence under "#### `TemplateManagerInterface`"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:27:export function createTemplate(options: TemplateOptions): TemplateInterface {
    src/core/factories.ts:50:export function createTemplateManager(options?: TemplateManagerOptions): TemplateManagerInterface {
    src/core/templates/TemplateManager.ts:47:export class TemplateManager implements TemplateManagerInterface {
    src/core/templates/Template.ts:35:export class Template implements TemplateInterface {
    src/core/errors.ts:17:export class TemplateError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/shapers.ts:1
    src/core/factories.ts:2
    src/core/helpers.ts:4
    src/core/templates/TemplateManager.ts:3
    src/core/templates/Template.ts:5
    src/core/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    23:} from '@orkestrel/guide'
    61:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    67:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    112:		for (const group of guide.methods()) {
    113:			const members = source.methods(group.interface).map((method) => method.name)
    121:					expect(findMissing(members, documented)).toEqual([])
    124:					expect(findMissing(documented, members)).toEqual([])
    130:							: findMissing(
    131:									source.methods(entity).map((method) => method.name),
    149:				findUnexampled(
    152:					source.examples().map((example) => example.name),
    157:		for (const group of guide.methods()) {
    162:					? source.examples(group.interface).map((example) => example.name)
    166:							.concat(source.examples(entity).map((example) => example.name))
    173:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    185:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 235:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/template.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/template.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-template-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
