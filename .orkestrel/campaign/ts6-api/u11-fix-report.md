# Unit report — U11-fix: the lsp import walk's fix round

The walk does what its record says. `readForbiddenNode` reads a node's own specifier, returns on a protocol-family hit, and otherwise continues through the node's members, so a family import nested under a node naming another package is found. The refusal fires on an error-severity diagnostic alone. `isSyntaxNode` and `readNodeSpecifier` have direct cases. The undetected dynamic import is "a non-literal `import()` expression" in every place it is named.

## Per finding

**1 — the walk continues past a non-family specifier.** `tests/setupConformance.ts:521-523` reads the node's own specifier, decides it through `readProtocolSpecifier`, returns only a family hit, and falls through to the member walk otherwise:

```ts
const specifier = readNodeSpecifier(node)
const forbidden = specifier === undefined ? undefined : readProtocolSpecifier(specifier)
if (forbidden !== undefined) return forbidden
```

The `@remarks` at `tests/setupConformance.ts:509` states that in the active voice. Two cases pin it: `tests/setupConformance.test.ts:134` (`reports a family specifier nested under a node that names another package`) plants `import('vscode-jsonrpc')` in the `options` argument of an `import('@orkestrel/contract', …)`, and `:142` (`reports the earlier of two family specifiers when the earlier one is nested`) adds a later top-level `vscode-jsonrpc/lib/common/message` import so the case fails on order rather than on presence.

**2 — termination no longer rests on the parser leaving `parent` unset.** The member walk is over `Object.entries` and skips a member named `parent` (`tests/setupConformance.ts:525-529`); the `@remarks` at `:509` carries the clause. Pinned at `tests/setupConformance.test.ts:161` (`reads a family specifier beneath a node carrying a parent back-link`) with an inert node record whose `parent` points at its own ancestor. This case is beyond the criteria list; it closes the skip the ruling names, which the code and the remark alone leave unmeasured.

**3 — the refusal fires on error severity alone.** `tests/setupConformance.ts:547` reads `const refusal = parsed.errors.find((error) => error.severity === 'Error')`; `OxcError.severity` is `'Error' | 'Warning' | 'Advice'` (`node_modules/rolldown/dist/shared/binding-Og__jmUi.d.mts:273`, `:279`). The `@throws` at `:539` names the severity. The existing refusal case stays (`tests/setupConformance.test.ts:150`). No case pins the filter's negative arm, because no warning-severity source could be produced — see § The warning-severity source.

**4 — the two exported helpers have direct cases.** `tests/setupConformance.test.ts:175` pins `isSyntaxNode` (a record with a string `type` passes; a record without one, a string, and `null` fail). `:182` pins `readNodeSpecifier` per arm by mapping it over `parseSync('source.ts', …).program.body`, so each arm returning `undefined` by design sits beside a control arm returning its specifier: `export const local = 1` beside the family declarations, and `import alias = rpc.Message` beside `import rpc = require('vscode-jsonrpc')`. `:201` pins the `ImportExpression` arm on both sides — `import('vscode-jsonrpc')` reads its specifier, `import(specifier)` reads none — reaching the expression through the statement's own `type` check rather than a cast. The test file imports `parseSync` from `vite` (`tests/setupConformance.test.ts:17`) to produce those nodes.

**5 — one term for the undetected dynamic import.** "A non-literal `import()` expression" appears in the case name (`tests/setupConformance.test.ts:156`), the bound's `@remarks` (`tests/setupConformance.ts:540`), and the arm's `@remarks` (`:482`).

**6 — the arm's `@remarks` is split.** `tests/setupConformance.ts:482` opens with one sentence naming the forms read, then one sentence carrying the `import` declaration's static, type-only, and bare side-effect spellings and the non-literal clause finding 5 requires.

**7 — the inverted report line.** This report's finding 1 states the walk as it stands and names the correction: the predecessor's `u11-lsp-imports-report.md:124` described a walk that continues past a non-family specifier, which the shipped code did not do; the code performs it, so the description holds against `tests/setupConformance.ts:521-529`.

## Mutation readings

Each mutation was made and reverted in one step; the reverted file matched the landed one byte for byte, SHA-256 `90ab28e08a0c83ab1d40338b395a288a81b3ce5df79ce65d76e91e30d5b21c3e`, and `npm run test:setup` returned to `Tests 28 passed (28)` after each revert.

Finding 1, with the early return restored (`if (specifier !== undefined) return readProtocolSpecifier(specifier)`):

```text
FAIL |setup| tests/setupConformance.test.ts > conformance infrastructure > reports a family specifier nested under a node that names another package
AssertionError: expected undefined to be 'vscode-jsonrpc'
FAIL |setup| tests/setupConformance.test.ts > conformance infrastructure > reports the earlier of two family specifiers when the earlier one is nested
AssertionError: expected 'vscode-jsonrpc/lib/common/message' to be 'vscode-jsonrpc'
 Test Files  1 failed | 2 passed (3)
      Tests  2 failed | 25 passed (27)
exit=1
```

Finding 2, with the `parent` skip removed:

```text
FAIL |setup| tests/setupConformance.test.ts > conformance infrastructure > reads a family specifier beneath a node carrying a parent back-link
RangeError: Maximum call stack size exceeded
 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 27 passed (28)
exit=1
```

Finding 4, with `isSyntaxNode` dropping its `type` test and the `TSImportEqualsDeclaration` arm dropping its external-reference test:

```text
FAIL |setup| tests/setupConformance.test.ts > conformance infrastructure > checks a record carrying a string type member as a syntax node
AssertionError: expected true to be false
FAIL |setup| tests/setupConformance.test.ts > conformance infrastructure > reads the specifier each declaration form names, and none from the forms naming no module
AssertionError: expected [ 'vscode-jsonrpc', …(5) ] to deeply equal [ 'vscode-jsonrpc', …(5) ]
 Test Files  1 failed | 2 passed (3)
      Tests  2 failed | 25 passed (27)
exit=1
```

## The warning-severity source

No source could be produced whose `parseSync` diagnostics carry a severity other than `'Error'` under this checkout's `vite`, so the filter's negative arm has no case and the ruling's conditional does not fire. Every diagnostic the sweep produced was `'Error'`; every other source returned an empty `errors` array. The instruments are `tmp/probe/severity.mjs`, `tmp/probe/severity2.mjs`, and `tmp/probe/severity3.mjs`, each calling `parseSync('source.ts', source)` with the reader's own default options.

Sources tried, by what they attempt:

- The suggestions the brief named: an unused label (`outer: for (const item of []) { … }`) and a duplicate `'use strict'` directive. Both returned an empty `errors` array.
- Strict-mode and legacy forms: a `with` statement, an octal literal, a legacy octal escape, `delete` of a variable, a block-scoped function declaration, a duplicate parameter name, an HTML comment opener, assignment to an imported binding, a duplicate label, a BOM prefix, a mid-file shebang. All returned an empty `errors` array.
- TypeScript forms whose diagnostic is semantic rather than syntactic: an overload with no implementation, a computed `enum` member, `#a in y` outside a class, a `.d.ts`-shaped body, `export =`, a non-null assertion, `using`, an import attribute clause, a triple-slash reference. All returned an empty `errors` array.
- Forms that do produce a diagnostic, each `'Error'`: `return` outside a function, `import { from 'x'`, an abstract method with a body, an initializer in an ambient context, a `get` accessor with a parameter, a `set` accessor with two parameters, a required parameter after an optional one, a `const` with no initializer, an initializer in an `interface`, a repeated `readonly` modifier, a repeated `accessor` modifier, `yield` outside a generator, JSX in a `.ts` source, a decimal `BigInt`, a repeated regular-expression flag.
- With `showSemanticErrors: true` (an option this reader does not pass), a redeclared binding reports `'Error'` as well.

## Criteria

Criterion 1 — the widened pattern over `tests`, `src`, `configs`:

```text
$ grep -rn "['\"]typescript['\"]" tests src configs
exit=0, and every line printed is data rather than a module specifier
```

The criterion as written does not hold, and the tree is not the reason: the widened pattern admits the LSP language identifier `'typescript'`. Its hits are `languageId: 'typescript'` in `tests/src/core/LSPClient.test.ts`, the mirror text in `tests/mirrors/metaModel.json`, and the TSDoc sample at `src/core/LSPClient.ts:68`. Filtering those out leaves no line:

```text
$ grep -rn "['\"]typescript['\"]" tests src configs | grep -vc "languageId\|metaModel.json\|LSPClient.ts:68"
0
```

Bounded to the specifier positions the criterion names — an import, a `require` call, or a dynamic import, with or without a subpath — nothing is printed:

```text
$ grep -rnE "(from|require\(|import\()[[:space:]]*['\"]typescript(/[^'\"]*)?['\"]" tests src configs
grep exit=1
```

Criterion 2 — format, lint, typecheck:

```text
$ npx oxfmt --config .oxfmtrc.json --check tests/setupConformance.ts tests/setupConformance.test.ts
All matched files use the correct format.
Finished in 20ms on 2 files using 4 threads.
oxfmt exit=0

$ npm run lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
lint exit=0

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
check exit=0
```

Criterion 3 — the suites, with the cases findings 1, 3, 4, and 5 name present and green, and the finding-1 mutation reading recorded earlier:

```text
$ npm run test:setup
 Test Files  3 passed (3)
      Tests  28 passed (28)
test:setup exit=0

$ npm run test:conformance
 Test Files  1 passed (1)
      Tests  243 passed (243)
test:conformance exit=0
```

## Tree state

```text
$ git status --short
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts

$ git diff --stat
 tests/setupConformance.test.ts | 125 ++++++++++++++++++++++++++++++++++++++++-
 tests/setupConformance.ts      | 104 ++++++++++++++++++++++------------
 2 files changed, 189 insertions(+), 40 deletions(-)
```

That diff carries U11 and this round together against `HEAD`. No commit, no install, no build, no tree-wide format or lint fix, no off-limits file touched. This round's instruments are `tmp/probe/fix-shapes.mjs`, `tmp/probe/severity.mjs`, `tmp/probe/severity2.mjs`, and `tmp/probe/severity3.mjs`.

## Flagged claims

- The filter at `tests/setupConformance.ts:547` passes a `'Warning'` or `'Advice'` entry through, and no case measures that arm because no source produces one. The claim rests on the declaration at `binding-Og__jmUi.d.mts:279` and on the sweep recorded earlier, not on a run of the arm.
- The finding-1 case plants the nested family import in `ImportExpression.options` (`node_modules/@oxc-project/types/types.d.ts:825`), which is the nesting the parser produces for the syntax `import('a', { with: import('b') })`. A family import nested under a non-family node in some other position is covered by the same code path but by no case.
- The finding-2 case builds its node record by hand, because `parseSync` populates no `parent` member. It measures the walk against the declaration's optional `parent?: Node` rather than against parser output.
- "First in source order" still rests on `Object.entries` field-insertion order for a node's own members, as the predecessor flagged. The new order case distinguishes a nested earlier hit from a later top-level one, which the `body` array orders; it does not distinguish member order within one node.
- The gate readings here are this writer's own. An independent `verifier` run is the authoritative one.
