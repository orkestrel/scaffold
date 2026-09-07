# Brief — P.1 `d7n-template-prep` (template's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/template` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `592277e`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

template's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== template 2026-09-07T15:33:24Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
74:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 963ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### template (592277e, version 0.0.6, guide range ^0.0.17, head start 0.0.18)
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
-- docs
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
-- check
   tests/guides.test.ts(120,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(123,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(127,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(142,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(157,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 8 ⎯⎯⎯⎯⎯⎯⎯
   +     "summary": "Tests whether a template id is registered.",
    Test Files  1 failed (1)
         Tests  8 failed | 23 passed (31)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 0 | summary 0 | banned 0 | .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for template (taken 2026-09-07T15:38Z by facts.sh)

- Checkout `/home/user/fleet/template`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `592277e`, status: clean
- `package.json`: version `0.0.6`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    113:			const members = source.methods(group.interface)
    120:					expect(findMissing(members, group.methods)).toEqual([])
    123:					expect(findMissing(group.methods, members)).toEqual([])
    127:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    142:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    145:		for (const group of guide.methods()) {
    155:							? source.examples(group.interface)
    156:							: source.examples(group.interface).concat(source.examples(entity))
    157:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    169:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 235:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.6"` → `"version": "0.0.7"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-template-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
