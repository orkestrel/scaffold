# Brief — P.1 `d7n-reason-prep` (reason's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/reason` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `e019d0c`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

reason's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== reason 2026-09-07T15:33:20Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
78:		"@orkestrel/guide": "^0.0.17",
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
### reason (e019d0c, version 0.0.9, guide range ^0.0.17, head start 0.0.18)
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
   tests/src/core/reasoners/InferentialReasoner.test.ts(1)
   src/core/types.ts(1)
   src/core/reasoners/SymbolicReasoner.ts(1)
   src/core/builders/managers/FactorManager.ts(1)
-- docs
   guides/reason.md FactorManagerInterface.factor: guide absent source absent
   guides/reason.md FactorManagerInterface.factors: guide absent source absent
   guides/reason.md FactorManagerInterface.append: guide absent source absent
   guides/reason.md FactorManagerInterface.prepend: guide absent source absent
   guides/reason.md FactorManagerInterface.replace: guide absent source absent
   guides/reason.md FactorManagerInterface.remove: guide absent source absent
   guides/reason.md FactorManagerInterface.destroy: guide absent source absent
   guides/reason.md RuleManagerInterface.rule: guide absent source absent
   guides/reason.md RuleManagerInterface.rules: guide absent source absent
   guides/reason.md RuleManagerInterface.append: guide absent source absent
   guides/reason.md RuleManagerInterface.prepend: guide absent source absent
   guides/reason.md RuleManagerInterface.replace: guide absent source absent
   guides/reason.md RuleManagerInterface.remove: guide absent source absent
   guides/reason.md RuleManagerInterface.seat: guide absent source absent
   guides/reason.md RuleManagerInterface.destroy: guide absent source absent
   guides/reason.md EquationManagerInterface.equation: guide absent source absent
   guides/reason.md EquationManagerInterface.equations: guide absent source absent
   guides/reason.md EquationManagerInterface.append: guide absent source absent
   guides/reason.md EquationManagerInterface.prepend: guide absent source absent
   guides/reason.md EquationManagerInterface.replace: guide absent source absent
   guides/reason.md EquationManagerInterface.remove: guide absent source absent
   guides/reason.md EquationManagerInterface.seat: guide absent source absent
   guides/reason.md EquationManagerInterface.destroy: guide absent source absent
   guides/reason.md FactManagerInterface.fact: guide absent source absent
   guides/reason.md FactManagerInterface.facts: guide absent source absent
   guides/reason.md FactManagerInterface.append: guide absent source absent
   guides/reason.md FactManagerInterface.prepend: guide absent source absent
   guides/reason.md FactManagerInterface.replace: guide absent source absent
   guides/reason.md FactManagerInterface.remove: guide absent source absent
   guides/reason.md FactManagerInterface.seat: guide absent source absent
   guides/reason.md FactManagerInterface.destroy: guide absent source absent
   guides/reason.md InferenceManagerInterface.inference: guide absent source absent
   guides/reason.md InferenceManagerInterface.inferences: guide absent source absent
   guides/reason.md InferenceManagerInterface.append: guide absent source absent
   guides/reason.md InferenceManagerInterface.prepend: guide absent source absent
   guides/reason.md InferenceManagerInterface.replace: guide absent source absent
   guides/reason.md InferenceManagerInterface.remove: guide absent source absent
   guides/reason.md InferenceManagerInterface.seat: guide absent source absent
   guides/reason.md InferenceManagerInterface.destroy: guide absent source absent
   guides/reason.md VariableManagerInterface.variable: guide absent source absent
   guides/reason.md VariableManagerInterface.variables: guide absent source absent
   guides/reason.md VariableManagerInterface.add: guide absent source absent
   guides/reason.md VariableManagerInterface.remove: guide absent source absent
   guides/reason.md VariableManagerInterface.seat: guide absent source absent
   guides/reason.md VariableManagerInterface.destroy: guide absent source absent
   guides/reason.md DefinitionBuilderInterface.build: guide absent source absent
   guides/reason.md DefinitionBuilderInterface.merge: guide absent source absent
   guides/reason.md DefinitionBuilderInterface.clear: guide absent source absent
   guides/reason.md DefinitionBuilderInterface.destroy: guide absent source absent
   guides/reason.md SubjectBuilderInterface.field: guide absent source absent
   guides/reason.md SubjectBuilderInterface.fields: guide absent source absent
   guides/reason.md SubjectBuilderInterface.set: guide absent source absent
   guides/reason.md SubjectBuilderInterface.remove: guide absent source absent
   guides/reason.md SubjectBuilderInterface.merge: guide absent source absent
   guides/reason.md SubjectBuilderInterface.clear: guide absent source absent
   guides/reason.md SubjectBuilderInterface.repeat: guide absent source absent
   guides/reason.md SubjectBuilderInterface.build: guide absent source absent
   guides/reason.md SubjectBuilderInterface.destroy: guide absent source absent
   guides/reason.md pitch: readme absent tagline "A synchronous, deterministic reasoning engine: declarative, JSON-serializable definitions are evaluated against subjects (plain data records) to produce traceable results. Four strategies behind one dispatch surface — `quantitative` (factor-based numeric scoring), `logical` (rule-based boolean deduction with forward / backward chaining), `symbolic` (algebraic equation solving by variable isolation), `inferential` (fact derivation with unification variables and proof trees) — each a `ReasonerInterface` registered on the thin `Reason` orchestrator, with three injectable operators (`Evaluator` / `Transformer` / `Aggregator`) doing the shared arithmetic. Every result is a fresh object carrying `success`, a human-readable `trace`, and accumulated `errors`; nothing mutates its inputs. The design stance is data in, data out, no surprises: definitions are pure data (built by hand or with the shipped value factories), the orchestrator holds NO strategy logic (dispatch is a registry lookup by the `reasoning` discriminant), the operators are total (an unknown comparison surfaces as a `CheckResult.error`, an unknown math operation is a no-op, divide-by-zero is `NaN` — never a throw), and a reasoner never assumes `validate` ran — a malformed definition yields a failure RESULT, reserving throws for caller misuse (a coded `ReasonError`). On top of the evaluation engine sits the definitions & subjects capability layer: a pure copy-on-write helper family that changes / extends / merges / round-trips definitions as data, and two brand-guarded workspace builders — `DefinitionBuilder` (one self-owning manager per collection) and `SubjectBuilder` (one flat collection) — that accumulate state through named methods and `build()` a fresh plain payload on demand. Building happens OUTSIDE the engine: `reason` and `validate` take only the plain data, so a builder's `build()` output is passed at the call site. Deliberately absent: async reasoners, definition persistence, and probabilistic strategies beyond the multiplicative `confidence` of inferential facts. Source: `src/core`. Surfaced through the `@src/core` barrel."
   rows read: 1, disagreements found: 372
   exit 1
-- check
   tests/guides.test.ts(139,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(142,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(146,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(161,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(176,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 56 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  56 failed | 38 passed (94)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 92ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(2) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(2) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 28 | summary 24 | banned 4 | tests/setup.ts(24) tests/src/core/reasoners/InferentialReasoner.test.ts(1) src/core/types.ts(1) src/core/reasoners/SymbolicReasoner.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+55,	+     "message": "prose carries no banned term: in order to (to)",	+     "path": "README.md"
+38,	+     "message": "prose carries no banned term: in order to (to)",	+     "path": "guides/reason.md"
+682,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/reason.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for reason (taken 2026-09-07T15:38Z by facts.sh)

- Checkout `/home/user/fleet/reason`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `e019d0c`, status: clean
- `package.json`: version `0.0.9`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 28 | summary 24 | banned 4 | tests/setup.ts(24) tests/src/core/reasoners/InferentialReasoner.test.ts(1) src/core/types.ts(1) src/core/reasoners/SymbolicReasoner.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                     | Source                    | Tests                                 |
    8:| ------- | ------------------------ | ------------------------- | ------------------------------------- |
    9:| Reason  | [`reason.md`](reason.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                    |
    14:| ---------- | ------------------------ |
    15:| `src/core` | [`reason.md`](reason.md) |
- Guide `guides/reason.md`: 1107 lines. Headings:
    1:# Reason
    7:## Surface
    40:### Entity factories
    62:### Orchestrator & reasoners
    72:### Operators
    80:### Entities
    96:### Value factories
    130:### Helpers
    212:### Validators
    263:### Errors
    270:### Constants
    294:### Types
    393:## Methods
    397:#### `ReasonInterface`
    411:#### `ReasonerInterface`
    421:#### `EvaluatorInterface`
    428:#### `TransformerInterface`
    435:#### `AggregatorInterface`
    441:#### `GroupManagerInterface`
    456:#### `FactorManagerInterface`
    470:#### `RuleManagerInterface`
    485:#### `EquationManagerInterface`
    500:#### `FactManagerInterface`
    515:#### `InferenceManagerInterface`
    530:#### `VariableManagerInterface`
    543:#### `DefinitionBuilderInterface`
    554:#### `SubjectBuilderInterface`
    570:## Contract
    585:## Patterns
    587:### Quantitative scoring
    655:### Numeric domains
    702:### Logical chaining — forward and backward
    746:### Symbolic solving
    794:### Inferential derivation and proof
    851:### Shaping definitions as data
    898:### The definition workspace — `DefinitionBuilder`
    986:### The subject workspace — `SubjectBuilder`
    1008:### Observing
    1045:### Narrowing untrusted definitions
    1067:### Practices
    1084:## Tests
    1102:## See also
- Table headers in `guides/reason.md` (a header row is the row before a `| ---` row):
    42: | API                          | Kind     | Summary                                                                                                                                                                          |
    64: | API                    | Kind  | Summary                                                                                                       |
    74: | API           | Kind  | Summary                                                                                                |
    84: | API                 | Kind  | Summary                                                                                                                                                                                                                     |
    100: | API                            | Kind     | Creates…                                                                                        |
    132: | API                        | Kind     | Summary                                                                                                                           |
    164: | API                           | Kind     | Summary                                                                                                                    |
    216: | API                        | Kind     | Narrows to                                                                                                                                                                                            |
    265: | API             | Kind     | Summary                                                                                                                      |
    272: | API                        | Kind  | Summary                                                                                                                                                                |
    296: | Type                          | Kind      | Shape                                                                                                                                                                                                                    |
    401: | Method      | Returns                          | Behavior                                                                              |
    415: | Method     | Returns                  | Behavior                                                                                           |
    423: | Method     | Returns                  | Behavior                                                                                         |
    430: | Method  | Returns  | Behavior                                                                                        |
    437: | Method      | Returns  | Behavior                                                                                                                |
    445: | Method    | Returns                    | Behavior                                                                                                                                                           |
    460: | Method    | Returns               | Behavior                                                                                                                                                             |
    474: | Method    | Returns             | Behavior                                                                                                                     |
    489: | Method      | Returns                 | Behavior                                                                                                                         |
    504: | Method    | Returns             | Behavior                                                                                                                     |
    519: | Method       | Returns                  | Behavior                                                                                                                          |
    534: | Method      | Returns                            | Behavior                                                                                                                                                                 |
    547: | Method    | Returns      | Behavior                                                                                                                                         |
    558: | Method    | Returns              | Behavior                                                                                                                                                                                                    |
    1027: | Entity              | Event map                   | Events                                                                                                                          |
- Rows of any `### Entities` table (the Kind cell):
    86:  `DefinitionBuilder` | class
    87:  `GroupManager`      | class
    88:  `FactorManager`     | class
    89:  `RuleManager`       | class
    90:  `EquationManager`   | class
    91:  `VariableManager`   | class
    92:  `FactManager`       | class
    93:  `InferenceManager`  | class
    94:  `SubjectBuilder`    | class
- H1 blockquote (`guides/reason.md`):
    3: > A synchronous, deterministic reasoning engine: declarative, **JSON-serializable definitions** are evaluated against **subjects** (plain data records) to produce traceable **results**. Four strategies behind one dispatch surface — `quantitative` (factor-based numeric scoring), `logical` (rule-based boolean deduction with forward / backward chaining), `symbolic` (algebraic equation solving by variable isolation), `inferential` (fact derivation with unification variables and proof trees) — each a `ReasonerInterface` registered on the thin `Reason` orchestrator, with three injectable operators (`Evaluator` / `Transformer` / `Aggregator`) doing the shared arithmetic. Every result is a fresh object carrying `success`, a human-readable `trace`, and accumulated `errors`; nothing mutates its inputs.
    4: >
    5: > The design stance is **data in, data out, no surprises**: definitions are pure data (built by hand or with the shipped value factories), the orchestrator holds NO strategy logic (dispatch is a registry lookup by the `reasoning` discriminant), the operators are total (an unknown comparison surfaces as a `CheckResult.error`, an unknown math operation is a no-op, divide-by-zero is `NaN` — never a throw), and a reasoner never assumes `validate` ran — a malformed definition yields a failure RESULT, reserving throws for caller misuse (a coded `ReasonError`). On top of the evaluation engine sits the definitions & subjects capability layer: a pure copy-on-write helper family that changes / extends / merges / round-trips definitions as data, and two brand-guarded workspace builders — `DefinitionBuilder` (one self-owning manager per collection) and `SubjectBuilder` (one flat collection) — that accumulate state through named methods and `build()` a fresh plain payload on demand. Building happens OUTSIDE the engine: `reason` and `validate` take only the plain data, so a builder's `build()` output is passed at the call site. Deliberately absent: async reasoners, definition persistence, and probabilistic strategies beyond the multiplicative `confidence` of inferential facts. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    7: ## Surface
    9: Create an orchestrator over the reasoners you need, build a definition, then evaluate subjects against it:
- README (`README.md`) first lines:
    # @orkestrel/reason
    
    A synchronous, deterministic **reasoning engine**: declarative,
    JSON-serializable **definitions** are evaluated against **subjects** (plain
    data records) to produce traceable **results**. Four strategies behind one
    dispatch surface — `quantitative` (factor-based numeric scoring), `logical`
    (rule-based boolean deduction with forward / backward chaining), `symbolic`
    (algebraic equation solving by variable isolation), `inferential` (fact
    derivation with unification variables and proof trees) — each a
    `ReasonerInterface` registered on the thin `Reason` orchestrator, with three
    injectable operators (`Evaluator` / `Transformer` / `Aggregator`) doing the
    shared arithmetic. Every result is a fresh object carrying `success`, a
- `## Patterns` fences, each with its nearest preceding heading:
    11: fence under "## Surface"
    591: fence under "### Quantitative scoring"
    634: fence under "### Quantitative scoring"
    661: fence under "### Numeric domains"
    669: fence under "### Numeric domains"
    677: fence under "### Numeric domains"
    684: fence under "### Numeric domains"
    692: fence under "### Numeric domains"
    706: fence under "### Logical chaining — forward and backward"
    750: fence under "### Symbolic solving"
    798: fence under "### Inferential derivation and proof"
    855: fence under "### Shaping definitions as data"
    902: fence under "### The definition workspace — `DefinitionBuilder`"
    943: fence under "### The definition workspace — `DefinitionBuilder`"
    990: fence under "### The subject workspace — `SubjectBuilder`"
    1012: fence under "### Observing"
    1037: fence under "### Observing"
    1049: fence under "### Narrowing untrusted definitions"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/builders/DefinitionBuilder.ts:86:export class DefinitionBuilder implements DefinitionBuilderInterface {
    src/core/builders/SubjectBuilder.ts:57:export class SubjectBuilder implements SubjectBuilderInterface {
    src/core/builders/managers/RuleManager.ts:47:export class RuleManager implements RuleManagerInterface {
    src/core/builders/managers/FactorManager.ts:57:export class FactorManager implements FactorManagerInterface {
    src/core/builders/managers/GroupManager.ts:44:export class GroupManager implements GroupManagerInterface {
    src/core/builders/managers/FactManager.ts:44:export class FactManager implements FactManagerInterface {
    src/core/builders/managers/EquationManager.ts:49:export class EquationManager implements EquationManagerInterface {
    src/core/builders/managers/InferenceManager.ts:54:export class InferenceManager implements InferenceManagerInterface {
    src/core/builders/managers/VariableManager.ts:44:export class VariableManager implements VariableManagerInterface {
    src/core/builders/managers/Collection.ts:24:export class Collection<T extends { readonly id: string }> {
    src/core/reasoners/InferentialReasoner.ts:85:export class InferentialReasoner implements ReasonerInterface {
    src/core/reasoners/LogicalReasoner.ts:70:export class LogicalReasoner implements ReasonerInterface {
    src/core/reasoners/QuantitativeReasoner.ts:64:export class QuantitativeReasoner implements ReasonerInterface {
    src/core/reasoners/SymbolicReasoner.ts:63:export class SymbolicReasoner implements ReasonerInterface {
    src/core/operators/Aggregator.ts:27:export class Aggregator implements AggregatorInterface {
    src/core/operators/Evaluator.ts:29:export class Evaluator implements EvaluatorInterface {
    src/core/operators/Transformer.ts:28:export class Transformer implements TransformerInterface {
    src/core/factories.ts:95:export function createEvaluator(options?: EvaluatorOptions): EvaluatorInterface {
    src/core/factories.ts:116:export function createTransformer(options?: TransformerOptions): TransformerInterface {
    src/core/factories.ts:137:export function createAggregator(options?: AggregatorOptions): AggregatorInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/builders/DefinitionBuilder.ts:1
    src/core/builders/SubjectBuilder.ts:1
    src/core/builders/managers/RuleManager.ts:1
    src/core/builders/managers/FactorManager.ts:1
    src/core/builders/managers/GroupManager.ts:1
    src/core/builders/managers/FactManager.ts:1
    src/core/builders/managers/EquationManager.ts:1
    src/core/builders/managers/InferenceManager.ts:1
    src/core/builders/managers/VariableManager.ts:1
    src/core/reasoners/InferentialReasoner.ts:1
    src/core/reasoners/LogicalReasoner.ts:1
    src/core/reasoners/QuantitativeReasoner.ts:1
    src/core/reasoners/SymbolicReasoner.ts:1
    src/core/operators/Aggregator.ts:1
    src/core/operators/Evaluator.ts:1
    src/core/operators/Transformer.ts:1
    src/core/validators.ts:44
    src/core/factories.ts:42
    src/core/helpers.ts:71
    src/core/Reason.ts:1
    src/core/parsers.ts:1
    src/core/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    57:} from '@orkestrel/guide'
    80:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    86:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    131:		for (const group of guide.methods()) {
    132:			const members = source.methods(group.interface)
    139:					expect(findMissing(members, group.methods)).toEqual([])
    142:					expect(findMissing(group.methods, members)).toEqual([])
    146:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    161:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    164:		for (const group of guide.methods()) {
    174:							? source.examples(group.interface)
    175:							: source.examples(group.interface).concat(source.examples(entity))
    176:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    188:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1084:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.9"` → `"version": "0.0.10"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-reason-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
