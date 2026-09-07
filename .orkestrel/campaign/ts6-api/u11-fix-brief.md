# Unit brief — U11-fix: the lsp import walk's fix round

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent, holding the objective lane's unit (Sol's by the routing ledger, run on Opus with the substitution recorded while the Codex bench is dark). Sole writer in `/home/user/fleet/lsp`, whose tree carries U11's uncommitted work. Perform the assignment directly and spawn nothing. This brief succeeds `tmp/units/ts6-u11-lsp-imports-brief.md`, which stays in force wherever this brief is silent.

## Objective

The walk does what its record says: it reads a node's own specifier, decides a protocol-family hit there, and otherwise continues through the node's members, so a family import nested under a node that names a non-family specifier is found; the refusal fires on error-severity diagnostics alone; the two exported helpers have direct cases; the prose names the undetected dynamic import one way; and the round-1 findings close.

## Read first

`/home/user/scaffold/.orkestrel/campaign/ts6-api/u11-audit-subjective.md`, `u11-audit-objective.md`, `u11-audit-checker.md`, `u11-verify-report.md`, and your predecessor's report `tmp/units/ts6-u11-lsp-imports-report.md`; then the code as U11 left it: `tests/setupConformance.ts` (`isSyntaxNode` at 473, `readNodeSpecifier` at 484, `readForbiddenNode` at 505 to 528, `readForbiddenImport` at 530 to 548, `readForbiddenSource` at 557), `tests/setupConformance.test.ts` (the cases at 84 to 140), and the installed declarations `node_modules/@oxc-project/types/types.d.ts` (`parent?: Node` on every node interface, `ImportExpression.options` at 825) and `node_modules/rolldown/dist/shared/binding-*.d.mts` (`OxcError.severity`).

## Findings and rulings

1. **The walk returns on any read specifier, while the report and the `@remarks` at `:509` describe a walk that continues** (both lanes, claim 7). Ruling: the code adopts the recorded behaviour. In `readForbiddenNode`, a read specifier is decided through `readProtocolSpecifier`; a family hit returns; a non-family specifier falls through to the member walk. Rewrite the `@remarks` in the active voice to state it: the walk reads a node's own specifier first and decides a family hit there; otherwise it recurses through the node's arrays and records. Pin it with two cases named for what they prove: a source whose first specifier is `@orkestrel/contract` and whose second is `vscode-jsonrpc` reports the second (the non-family node does not end the walk), and a source carrying two family specifiers reports the first in source order.
2. **Termination rests on the parser leaving `parent` unset** (subjective referral on claim 5). Ruling: the member walk skips a member named `parent` by name, and the `@remarks` states it in one clause.
3. **The refusal throws on any diagnostic severity** (objective finding). Ruling: `readForbiddenImport` refuses on an entry whose `severity` is `'Error'` alone; the existing refusal case stays; add a case for the filter's shape if a warning-severity source can be produced through `parseSync` under the checkout's `vite` (try an unused label or a duplicate `use strict`), and record in the report whether one could be, with the source tried.
4. **The two exported helpers have no direct case** (both lanes). Ruling: `tests/setupConformance.test.ts` pins `isSyntaxNode` (a record with a string `type` passes; a record without one, a string, and `null` fail) and `readNodeSpecifier` per arm through `parseSync`-produced nodes, including the two arms that return `undefined` by design — `ExportNamedDeclaration` with no `source` (`export const x = 1`) and `TSImportEqualsDeclaration` over a non-external reference (`import a = ns.b`) — each beside a control arm that returns its specifier.
5. **Three terms for the undetected dynamic import** (subjective finding B). Ruling: the term is "a non-literal `import()` expression" in the case name, the bound's `@remarks`, and the arm's `@remarks`.
6. **The `@remarks` at `:482` is one sixty-word sentence** (subjective finding C). Ruling: split it into a sentence naming the four forms and one clause for the `import` declaration's three spellings.
7. **The report line at `u11-lsp-imports-report.md:124` inverted the code.** Ruling: your report states the walk as it now is, and names finding 1's correction explicitly.

## Scope

As the U11 brief: owned `tests/setupConformance.ts` (the import-walk region, its imports, its TSDoc) and `tests/setupConformance.test.ts`; everything else off-limits; the same permitted commands (`npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run test:setup`, `npm run test:conformance`, `npm run lint:check`, `npm run check`); never `npm install`, `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -rn "['\"]typescript['\"]" tests src configs` prints nothing (the widened pattern covers every import and require spelling).
2. `npx oxfmt --config .oxfmtrc.json --check tests/setupConformance.ts tests/setupConformance.test.ts` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:setup` exits 0 with the cases findings 1, 3, 4, and 5 name present and green, and with the two finding-1 cases shown red under the early return restored (a mutation you make and revert in the same step, recorded with both readings); `npm run test:conformance` exits 0.

## Output

Write `/home/user/fleet/lsp/tmp/units/ts6-u11-fix-report.md`: per finding what changed with `file:line`, the mutation readings, the warning-severity source tried, each criterion with exit code and last lines, `git status --short` and `git diff --stat` against `HEAD` (U11 and this round together), flagged claims. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when the parser cannot produce a node a case needs, when a criterion needs an off-limits file, or when a gate fails outside the owned files. Case wording and helper-internal naming are yours.
