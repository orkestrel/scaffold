# Unit brief — U10-fix: the database readers' fix round

## Role and engine

`builder`, Sonnet, a native Claude Code subagent: every edit below is exact. Sole writer in `/home/user/fleet/database`, whose tree carries U10's uncommitted work. Perform the assignment directly and spawn nothing. This brief succeeds `tmp/units/ts6-u10-database-readers-brief.md`, which stays in force wherever this brief is silent.

## Objective

The round-1 findings close: a compiler child that a signal ended is refused rather than read as clean; a failed `--showConfig` is refused rather than dropping the caller's aliases; a destructured export declarator refuses rather than vanishing; the names that broke the naming rules are corrected; the dead fixture members and the under-named case titles are fixed; and the TSDoc states the rule the code performs.

## Read first

`/home/user/scaffold/.orkestrel/campaign/ts6-api/u10-audit-objective.md` (findings F1 to F6), `u10-audit-subjective.md` (findings 1 to 8), `u10-audit-verdict.md`, and the code at `tests/setupServer.ts` and `tests/setupServer.test.ts` as U10 left them. Then `.claude/rules/names.md` § Fixed derivation/construction forms and § General vocabulary.

## Edits, each exact

1. **A signal-ended compiler child is refused** (objective F1). In `readProjectDiagnostics`, after `if (compiled.error !== undefined) throw compiled.error`, add: `if (compiled.signal !== null) throw new Error(\`The compiler ended on signal ${compiled.signal} before it finished\`)`. Add a case to `describe('readProjectDiagnostics')` in the test file that proves the refusal shape is reachable: drive `readProjectDiagnostics` over a scratch project whose `extends` names a config file that does not exist and assert the thrown message names the compiler's refusal (the stderr or options path this already reports), and add a comment above the signal guard stating that no case ends the child on a signal because the host cannot do so deterministically. Do not fake the signal.
2. **A failed `--showConfig` is refused** (objective F2). In `readProjectAliases`, after the `spawnSync` call, add: `if (printed.error !== undefined) throw printed.error`, then `if (printed.status !== 0) throw new Error(\`The compiler refused to print the configuration of ${configPath}: ${\`${printed.stderr ?? ''}${printed.stdout ?? ''}\`.trim()}\`)`. Add a case in `describe('readProjectAliases')` that calls it over a config path that does not exist and asserts the throw names that path.
3. **A destructured export declarator refuses** (objective F3). In `readDeclaredNames`, when a `VariableDeclaration` declarator's `id.type` is not `'Identifier'`, make `readDeclaredNames` return `undefined` for a declarator whose `id` is not an `Identifier` (its return type becomes `readonly string[] | undefined`), and at each caller (`resolveEntrySymbol` and `shapeEntrySymbols`) treat `undefined` as `classifyEntryDeclaration` returning `undefined` does: throw the existing `has unsupported declaration` message with the entry and the name (in `shapeEntrySymbols`, the name is the declaration's first bound name or, absent one, the statement's type). Add a case in `describe('readDeclaredNames')` for `export const { a, b } = value` returning `undefined` and one in `describe('shapeEntrySymbols')` asserting the `unsupported declaration` refusal for it. Update the function's TSDoc `@returns`.
4. **Names.** Rename `matchGuideFences` to `attributeGuideFences` (subjective 3) at its declaration, its TSDoc, its call site in `checkGuideFences`, and the test `describe` title. Rename `resolveEntrySymbol` to `resolveExportKeywords` (subjective 4, the Orchestrator's ruling) at its declaration, TSDoc, both call sites, and the test `describe`. Rename `parseModuleSource` to `scanModuleSource` (subjective 7, the Orchestrator's ruling: a function returning a record with an in-band refusal is not the `parse*` coercion form) at its declaration, its TSDoc and `@example`, its call site in `readModuleStatements`, and the test `describe` and imports. Replace `ParsedModule.module: boolean` with `readonly form: 'module' | 'script'` (subjective 5: the parser's own axis as an external-value union), assigned from `parsed.program.sourceType`, read in `shapeEntrySymbols` as `if (parsed.form !== 'module')`, and in the test at the `.module` assertions (`.form` against `'module'` and `'script'`); update the interface TSDoc.
5. **Dead fixture members** (subjective 1). Remove `path` and `root` from `EntryModuleInterface` and from `readEntryModule`'s return, leaving `{ parsed, scratch }`; remove the `path` local if it is then unused.
6. **Case titles** (subjective 2). Retitle: `:253` to `reports the explicit type-only forms, star and named alike, and clears an ordinary value export`; `:308` to `follows a re-export to the module that declares it, reads a local declaration in place, and stops on a visited module`; `:361` to `refuses a default export, a type-only export, an unsupported declaration, and a script source`; `:552` to `attributes a diagnostic to the fence it names, an imported fault to the first fence, and a file-less one likewise`. Replace the typographic apostrophes in the titles at `:155` and `:404` with rewordings that need none: `separates an ES module from a script and reports the refusal the parser gives` and `reads the aliases this workspace declares as absolute targets`.
7. **The budget comment** (subjective 8). Move the compiler-budget comment at the test file's `:406-411` to the file header comment, stating that every compiler-driving block carries the `30_000` budget and why, and leave a one-line pointer at its old place.
8. **TSDoc against code** (objective F6). In `readProjectAliases`'s `@remarks`, replace the sentence beginning `The compiler prints each target relative to the project it declared them in` with: `Each target is resolved against the invoked configuration's own directory, which is where this package declares its aliases; a target declared by a base configuration in another directory would resolve wrongly, and this reader states no support for that shape.`

## Scope

- Owned: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/guides.test.ts` (import names only, if a renamed helper is imported there; it is not expected to be).
- Off-limits: everything else.
- Permitted commands: `npx oxfmt --config .oxfmtrc.json --write <owned file>`, `npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:guides`. Never `npm install`, `npm run build`, a tree-wide `format` or lint `--fix`, a discard-class git command, or a commit.

## Acceptance criteria, cheapest first

1. `grep -n "parseModuleSource\|matchGuideFences\|resolveEntrySymbol\|readonly module: boolean" tests/setupServer.ts tests/setupServer.test.ts tests/guides.test.ts` prints nothing; `grep -n "scanModuleSource\|attributeGuideFences\|resolveExportKeywords\|readonly form: 'module' | 'script'" tests/setupServer.ts` prints at least one line each.
2. `npx oxfmt --config .oxfmtrc.json --check tests/setupServer.ts tests/setupServer.test.ts` exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run test:setup` exits 0 with the cases edits 1, 2, and 3 name present and green, and with each shown red before its guard landed (make the edit to the test first, run, then land the guard; record both readings).
4. `npm run test:guides` exits 0.

## Output

Write `/home/user/fleet/database/tmp/units/ts6-u10-fix-report.md`: each edit with `file:line` before and after, the red-then-green readings for edits 1 to 3, each criterion with exit code and last lines, `git status --short` and `git diff --stat` against `HEAD` (U10 and this round together). Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a quoted site does not match, when a gate fails outside the owned files, or when a case cannot be made red before its guard. Wording inside a TSDoc sentence and the exact phrasing of a thrown message beyond the fixed words are yours.
