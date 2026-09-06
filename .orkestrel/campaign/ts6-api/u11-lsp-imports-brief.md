# Unit brief — U11 lsp-imports (lsp): the conformance import walk on the parser Vite re-exports

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the objective lane's unit (Sol's by the routing ledger, run on Opus with the substitution recorded while the Codex bench is dark). Sole writer in `/home/user/fleet/lsp`. Perform the assignment directly and spawn nothing.

## Objective

`tests/setupConformance.ts` reads a source's forbidden protocol-family imports through the parser `vite` re-exports instead of the TypeScript compiler API, detecting the same forms it detects today and one it never pinned, with a pin per form and a control per form; nothing else about conformance changes.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and its rule map: `.claude/rules/tests.md` (§ Shared test infrastructure, § Probes), `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md` (no nested functions: a recursive walk is a module-scope function that calls itself), `.claude/rules/portability.md`, `.claude/rules/writing.md`.
2. `/home/user/scaffold/.orkestrel/campaign/ts6-api/u10u11-absorb-distillate.md` § B (the walk's forms, sites, consumers, pins) and § C.
3. The code: `tests/setupConformance.ts:37,140-150,455-540,1240-1245`, `tests/setupConformance.test.ts:60-95`, `tests/conformance.test.ts:230-242`; scaffold's precedent for a parser reader: `/home/user/scaffold/tests/setupServer.ts` (`readStatements`, the `parseSync` call and the refusal on `errors`), and the M7 reading that `parseSync` spans are UTF-16 code units (`orchestrator-measurements.md` § M7).

## What is fixed

- The reader is `parseSync(name, source)` from `vite` (`import { parseSync } from 'vite'`; the type of a node is `ESTree` from the same specifier, as scaffold's reader imports it); a source whose `errors` is non-empty is refused with the file name and the first error's message.
- `readForbiddenNode` walks the ESTree program: `ImportDeclaration.source.value` (static, type-only, and bare side-effect imports alike), `ExportNamedDeclaration.source.value` and `ExportAllDeclaration.source.value` (re-exports), `TSImportEqualsDeclaration` whose `moduleReference` is a `TSExternalModuleReference` (its `expression.value`), and `ImportExpression` whose `source` is a string `Literal` (dynamic `import('x')`); the first hit in source order wins, children are walked through the node's own enumerable object and array members, and `readProtocolSpecifier` decides the hit as it does today. Confirm each node shape against the installed `@oxc-project/types` declarations before relying on it, and record the `file:line` of each shape in the report.
- `readForbiddenImport(source, name)` and `readForbiddenSource(root)` keep their names, signatures, and return shapes; `CONFORMANCE_FORBIDDEN_SOURCE` keeps its module-load evaluation.
- `require('x')` as a call stays undetected, as today; state that bound in the function's TSDoc `@remarks`.
- Pins in `tests/setupConformance.test.ts`, one case per form, each named for what it proves: static, type-only (`import type`), bare side-effect, re-export (`export … from`), `import =`, dynamic literal; each plants a `vscode-jsonrpc` specifier and asserts the hit, and asserts `undefined` for `@orkestrel/contract` in the same form; one case asserts the refusal of a source the parser rejects (the message names the file); one case asserts a non-literal `import(expr)` and a `require('vscode-jsonrpc')` call report `undefined` (the stated bound).
- No `typescript` specifier remains in `tests/**`, `src/**`, or `configs/**` of this checkout apart from the vendored `tests/setupPolicy.ts` and the generated `tests/distribution.test.ts`, which the phase A visit replaced before this unit; confirm with the grep in criterion 1.

## Scope

- Owned: `tests/setupConformance.ts` (the import-walk region and its imports only), `tests/setupConformance.test.ts`.
- Off-limits: everything else, `tests/conformance.test.ts`, the vendored pair, `tests/distribution.test.ts`, `package.json`, `package-lock.json`, `src/**`, `guides/**` included.
- Permitted commands: scoped `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run test:setup`, `npm run test:conformance`, `npm run lint:check`, `npm run check`. Never `npm install`, `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Host facts

Linux, bash, Node v22.22.2; the checkout carries scaffold's and probe's head starts under `node_modules` (installed with `--no-save`; a bare `npm install` restores the registry copies, so never run it); the phase A visit landed before this unit and the tree is committed apart from `tmp/`.

## Unknowns

Whether `parseSync` reports `TSImportEqualsDeclaration` for `import x = require('y')` in a `.ts` source under its default options, and what node it reports for a dynamic `import()`; the unit settles both with the installed declarations and a run, and reports the shapes.

## Acceptance criteria, cheapest first

1. `grep -rn "from 'typescript'\|from \"typescript\"\|require('typescript')" tests src configs` prints nothing.
2. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:setup` exits 0 with the six form cases, the refusal case, and the bound case present and green; `npm run test:conformance` exits 0.

## Output

Write `/home/user/fleet/lsp/tmp/units/ts6-u11-lsp-imports-report.md`: each function's change in one line, the node shapes confirmed with `file:line`, each criterion with exit code and last lines, `git status --short` and `git diff --stat`, flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when `parseSync` cannot produce a node for one of the forms (name the form and the parser's output), when a criterion needs an off-limits file, or when a gate fails outside the owned files. Naming inside the walk's helpers and the test case wording are yours to decide and record.
