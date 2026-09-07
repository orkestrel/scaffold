# Unit report — U11 lsp-imports (lsp)

`tests/setupConformance.ts` reads forbidden protocol-family imports through the `vite` parser re-export. The `typescript` specifier is gone from this checkout's `tests`, `src`, and `configs`, and the baseline `no-restricted-imports` diagnostic is cleared.

## Touched files

- `/home/user/fleet/lsp/tests/setupConformance.ts` — the import walk now runs on `parseSync` from `vite`; `import ts from 'typescript'` replaced by `import { parseSync } from 'vite'` and `import type { ESTree } from 'vite'`, and `isArray` added to the existing `@orkestrel/contract` import.
- `/home/user/fleet/lsp/tests/setupConformance.test.ts` — the single static-import pin replaced by a case per form, a parser-refusal case, and a case pinning the undetected bound.

## Each function's change

- `isSyntaxNode(value: unknown): value is ESTree.Node` — added; a record carrying a string `type` member is a parser node, which is how an `unknown` member reached in the walk narrows without an assertion.
- `readNodeSpecifier(node: ESTree.Node): string | undefined` — added; a `switch` over `node.type` returns the specifier the node itself writes, for `ImportDeclaration`, `ExportAllDeclaration`, `ExportNamedDeclaration` with a non-null `source`, `TSImportEqualsDeclaration` over a `TSExternalModuleReference`, and `ImportExpression` whose `source` is a string `Literal`.
- `readForbiddenNode(node: unknown): string | undefined` — kept its name; the `ts` predicate chain and `node.forEachChild` recursion replaced by a walk that recurses through arrays (`isArray`) and records (`isRecord`), reads the node's own specifier through `readNodeSpecifier`, and decides it through the unchanged `readProtocolSpecifier`. The parameter widened from `ts.Node` to `unknown` because the walk reaches arbitrary members; the first hit in source order still wins.
- `readForbiddenImport(source, name = 'source.ts'): string | undefined` — kept its name, signature, and return shape; `ts.createSourceFile` replaced by `parseSync(name, source)`, and a non-empty `errors` now throws `` `The parser refused ${name}: ${refusal.message}` `` (scaffold's wording in `/home/user/scaffold/tests/setupServer.ts:891`). The TSDoc gained `@throws` and an `@remarks` stating the bound: a `require('x')` call and a non-literal `import(expr)` stay undetected.
- `readForbiddenSource(root): string | undefined` — unchanged apart from `@throws`, which now names the parser refusal alongside the read failure.
- `readProtocolSpecifier` and `CONFORMANCE_FORBIDDEN_SOURCE` — unchanged; the constant still evaluates at module load.

## Node shapes confirmed

Confirmed against the installed declarations at `/home/user/fleet/lsp/node_modules/@oxc-project/types/types.d.ts`, and against the parser's own output (`node tmp/probe/import-shapes.mjs`, `node tmp/probe/extensions.mjs`, `node tmp/probe/node-record.mjs`).

| Shape | Declaration | Read |
| --- | --- | --- |
| `ImportDeclaration` | `types.d.ts:830` | `source: StringLiteral` (`:833`), so the static, type-only, and bare side-effect spellings share one arm; `importKind` distinguishes them and this reader ignores it |
| `ExportNamedDeclaration` | `types.d.ts:876` | `source: StringLiteral \| null` (`:880`), so a local `export` without a source falls through to the member walk |
| `ExportAllDeclaration` | `types.d.ts:893` | `source: StringLiteral` (`:896`) |
| `TSImportEqualsDeclaration` | `types.d.ts:1605` | `moduleReference: TSModuleReference` (`:1608`), narrowed to `TSExternalModuleReference` (`:1615`) whose `expression` is a `StringLiteral` (`:1617`) |
| `ImportExpression` | `types.d.ts:822` | `source: Expression` (`:824`), so a literal source is read and `import(name)` is not |
| `StringLiteral` | `types.d.ts:942` | `type` is `"Literal"`, not `"StringLiteral"`, so the `ImportExpression` arm checks `type === 'Literal'` and `typeof value === 'string'` |
| `Program` | `types.d.ts:4` | member of `Node` (`types.d.ts:1729-1730`), so `readForbiddenNode(parsed.program)` enters the walk at the program |
| `ESTree` | `/home/user/fleet/lsp/node_modules/rolldown/dist/utils-index.d.mts:3` | `import * as ESTree from "@oxc-project/types"`, re-exported by `vite` (`node_modules/vite/dist/node/index.d.ts:10`, `:4069`) |

The unknown the brief named is settled. `parseSync` reports `TSImportEqualsDeclaration` for `import rpc = require('vscode-jsonrpc')` in a `.ts` source under its default options, and `ImportExpression` for a dynamic `import()`, whose `source` is the `Literal` node for `import('x')` and an `Identifier` for `import(name)`. Two further readings the walk rests on: parser nodes are plain objects with no `parent` back-link and no cycle, so the generic member walk terminates; and `parseSync` returns its refusals in `errors` rather than throwing, so the refusal is this reader's own. The `.ts`, `.tsx`, `.mts`, and `.cts` extensions `readForbiddenSource` globs all parse without error.

## Criteria

Criterion 1 — no `typescript` specifier under `tests`, `src`, `configs`:

```text
$ grep -rn "from 'typescript'\|from \"typescript\"\|require('typescript')" tests src configs
grep exit=1
```

Nothing printed. The vendored `tests/setupPolicy.ts` and the generated `tests/distribution.test.ts` carry none either, so the exemption the brief allowed was not needed.

Criterion 2 — format, lint, typecheck:

```text
$ npx oxfmt --config .oxfmtrc.json --check tests/setupConformance.ts tests/setupConformance.test.ts
All matched files use the correct format.
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

Criterion 3 — the suites:

```text
$ npm run test:setup
 Test Files  3 passed (3)
      Tests  22 passed (22)
test:setup exit=0

$ npm run test:conformance
 Test Files  1 passed (1)
      Tests  243 passed (243)
test:conformance exit=0
```

## Failing first

The baseline red the brief named, before any edit (`tmp/probe/lint-baseline.txt`):

```text
$ npm run lint:check
tests/setupConformance.ts:37:1: error eslint(no-restricted-imports): 'typescript' import is restricted from being used by a pattern. help: the in-process compiler API is not a surface the fleet uses
lint exit=1
```

The pins landed before the implementation and ran against the compiler-API reader (`tmp/probe/setup-red.txt`):

```text
$ npm run test:setup
 FAIL  |setup| tests/setupConformance.test.ts > conformance infrastructure > refuses source the parser rejects, naming the file
AssertionError: expected [Function] to throw an error
 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 21 passed (22)
exit=1
```

Only the refusal case reddened there, because `ts.createSourceFile` reports no parse error. The form cases and the bound case passed against the old reader, which is the honest reading: those forms were detected and unpinned, apart from `export * from`, which the old `ts.isExportDeclaration` branch also covered.

Control for the form cases, run after the implementation landed and reverted immediately: every arm of `readNodeSpecifier` returned `undefined`, and `npm run test:setup` reported exactly the form cases red — `reports a static import`, `a type-only import`, `a bare side-effect import`, `a re-export`, `an import assignment`, `a dynamic import` — with the refusal and bound cases still green (`Tests 6 failed | 16 passed (22)`). The reverted file is byte-identical to the landed one; `npx oxfmt --check`, `npm run lint:check`, `npm run check`, and `npm run test:setup` were all re-run green after the revert, and the diff in this report is the restored state.

## Tree state

```text
$ git status --short
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts

$ git diff --stat
 tests/setupConformance.test.ts |  54 ++++++++++++++++++++--
 tests/setupConformance.ts      | 102 ++++++++++++++++++++++++++---------------
 2 files changed, 116 insertions(+), 40 deletions(-)
```

No commit, no install, no build, no tree-wide format or lint fix, no off-limits file touched. The instruments and gate logs sit under `/home/user/fleet/lsp/tmp/probe/` (`import-shapes.mjs`, `extensions.mjs`, `node-record.mjs`, and the baseline, red, and green logs).

## Decisions inside the discretion the brief granted

- The refusal message copies scaffold's `readStatements` wording, so one refusal sentence serves the fleet's parser readers.
- The re-export case pins `export { … } from` and `export * from` together, because both are the re-export form and `ExportAllDeclaration` had no pin before this unit.
- The refusal pin asserts the prefix `The parser refused broken.ts:` rather than the parser's own message text, so a parser release that rewords its diagnostic does not redden a pin about this reader.
- `readForbiddenNode` walks children even after reading a specifier that is not protocol-family. The old reader returned at that point. No form nests an import inside a node that names a specifier, so the reachable behaviour is unchanged and the walk is now uniform.

## Flagged claims

- `isSyntaxNode` asserts `ESTree.Node` from a structural check its body cannot fully establish: any record with a string `type` member passes. Its population is the parser's own tree, where that is exactly the node test, and the predicate keeps the walk free of type assertions. An auditor who wants the guard narrower would have to enumerate the node type strings, which would then drift against the parser's own union.
- `Object.values` order carries "source order" for the member walk. It is the parser's field insertion order, which places `body` and other child arrays before `start` and `end`, and each array is in source order. No case in this unit distinguishes it from a strict positional order.
