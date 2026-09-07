# Audit brief — U11 lsp-imports (round 1)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: whether the walk reads as one mechanism with the recursion at module scope, the helper names, the `@remarks` bound's wording, the case names), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: whether each import form the brief names is detected and controlled, whether the ESTree node shapes the report cites exist in the installed `@oxc-project/types`, whether the parser refusal fires on a rejected source, false greens), and `checker` (Sonnet: the acceptance criteria as stated, scope honesty against the status file, no `typescript` specifier left in the owned files). Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Unit U11 moved `lsp`'s conformance import walk off the TypeScript compiler API onto the parser `vite` re-exports, detecting the same forbidden protocol-family import forms and one it never pinned, with a pin and a control per form. Its brief: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u11-lsp-imports-brief.md`; its report: `u11-lsp-imports-report.md`; the absorption: `u10u11-absorb-distillate.md` § B and § C. Governing files: `/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/typescript.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/portability.md`, `.claude/rules/writing.md`.

## Review evidence

The actual diff and status of the lsp checkout: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u11-lsp-imports.diff.txt` and `u11-lsp-imports.status.txt`. Read the diff in full; read the changed files under `/home/user/fleet/lsp` at their new state where the diff is not enough, and the installed `@oxc-project/types` declaration under `/home/user/fleet/lsp/node_modules/@oxc-project/types/` for the node shapes the report cites.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. No `typescript` specifier remains in `tests/setupConformance.ts` or `tests/setupConformance.test.ts`, the reader is `parseSync` from `vite`, and a source whose `errors` is non-empty is refused with the file name and the first error's message.
2. The walk detects the static import, the type-only import, the bare side-effect import, the `export … from` re-export in both named and star forms, `import x = require('y')`, and the dynamic `import('x')` with a string literal, taking the first hit in source order; each form has a case planting a `vscode-jsonrpc` specifier and a control asserting `undefined` for `@orkestrel/contract` in the same form.
3. `require('x')` as a call and a non-literal `import(expr)` report `undefined`, the bound is stated in the function's `@remarks`, and a case asserts it.
4. `readForbiddenImport`, `readForbiddenSource`, and `CONFORMANCE_FORBIDDEN_SOURCE` keep their names, signatures, return shapes, and module-load evaluation; `tests/conformance.test.ts` is unchanged.
5. The node shapes the report cites (`ImportDeclaration`, `ExportNamedDeclaration`, `ExportAllDeclaration`, `TSImportEqualsDeclaration` with `TSExternalModuleReference`, `ImportExpression`) exist in the installed types at the `file:line` the report gives, and the walk reads the fields those shapes declare.
6. The recursion is a module-scope function, no nested function declaration was added, and no `any`, assertion, or non-null assertion appears.
7. Nothing outside the owned files changed; the report's claims match the diff; every criterion's evidence is present.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
