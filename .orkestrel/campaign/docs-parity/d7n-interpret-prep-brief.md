# Brief — P.1 `d7n-interpret-prep` (interpret's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/interpret` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `813b75c`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

interpret's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== interpret 2026-09-07T16:42:40Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
80:		"@orkestrel/guide": "^0.0.17",
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
### interpret (813b75c, version 0.0.12, guide range ^0.0.17, head start 0.0.18)
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
   tests/setup.ts(12)
   tests/src/core/stages/Normalizer.test.ts(1)
-- docs
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
-- check
   tests/guides.test.ts(166,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(169,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(173,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(188,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(203,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 48 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  48 failed | 47 passed (95)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 13 | summary 12 | banned 1 | tests/setup.ts(12) tests/src/core/stages/Normalizer.test.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for interpret (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/interpret`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `813b75c`, status: clean
- `package.json`: version `0.0.12`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    159:			const members = source.methods(group.interface)
    166:					expect(findMissing(members, group.methods)).toEqual([])
    169:					expect(findMissing(group.methods, members)).toEqual([])
    173:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    188:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    191:		for (const group of guide.methods()) {
    201:							? source.examples(group.interface)
    202:							: source.examples(group.interface).concat(source.examples(entity))
    203:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    215:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.12"` → `"version": "0.0.13"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-interpret-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
