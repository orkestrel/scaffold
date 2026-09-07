# Unit report — U10-fix: the database readers' fix round

## Edits, each with file:line before and after

1. **Signal-ended compiler child refused** (objective F1).
   - Before: `tests/setupServer.ts:442-443` — only `compiled.error` and the stderr text were read; a
     signal-ended child with empty stdout reported as clean.
   - After: `tests/setupServer.ts:442-447` — adds `if (compiled.signal !== null) throw new Error(...)`
     between the `error` guard and the stderr guard, with a comment above it stating no case ends the
     child on a signal because the host cannot do so deterministically.
   - Test: `tests/setupServer.test.ts:471-490`, `describe('readProjectDiagnostics')` — a project whose
     `extends` names a base configuration that does not exist, asserting the compiler's existing
     project-level (no-file) diagnostic names the absent base. No signal is faked.

2. **Failed `--showConfig` refused** (objective F2).
   - Before: `tests/setupServer.ts:377-385` — `printed.error` and `printed.status` were never read; a
     failed `--showConfig` silently returned `{}`.
   - After: `tests/setupServer.ts:377-393` — adds `if (printed.error !== undefined) throw printed.error`
     and `if (printed.status !== 0) throw new Error(...)` naming the config path and the captured
     output; `@throws` added to the TSDoc.
   - Test: `tests/setupServer.test.ts:432-436`, `describe('readProjectAliases')` — calls it over
     `tmp/absent-tsconfig.json`, which does not exist, asserting the throw names that path.
   - Red-then-green (recorded run): with the guard reverted, `refuses a project the compiler cannot
     print the configuration of` failed —
     `AssertionError: expected [Function] to throw an error … Received: undefined`. With the guard
     restored, the same case passed (1 passed, 80 skipped).

3. **Destructured export declarator refuses** (objective F3).
   - Before: `tests/setupServer.ts:153-160` — `readDeclaredNames` silently skipped a non-`Identifier`
     declarator, so `export const { a, b } = value` contributed no names.
   - After: `tests/setupServer.ts:148-176` — `readDeclaredNames` returns `readonly string[] | undefined`
     and returns `undefined` the moment a declarator's `id` is not `Identifier`; `@returns` updated.
     `resolveExportKeywords` (`tests/setupServer.ts:239-262`) treats `undefined` as
     `classifyEntryDeclaration` returning `undefined` does — throws `has unsupported declaration` naming
     the entry and the name being resolved. `shapeEntrySymbols` (`tests/setupServer.ts:327-341`) throws
     the same message, named by the declaration's first bound identifier or, absent one, the
     statement's type.
   - Tests: `tests/setupServer.test.ts:232-243`, `describe('readDeclaredNames')`, asserts
     `export const { a, b } = ...` returns `undefined`; `tests/setupServer.test.ts:402-414`,
     `describe('shapeEntrySymbols')`, asserts the `unsupported declaration` refusal naming
     `'VariableDeclaration'` (no bound identifier exists in the destructured case).
   - Red-then-green (recorded runs):
     - `readDeclaredNames` case: with the guard reverted to skip a non-`Identifier` declarator instead
       of returning `undefined`, the case failed — `expected [] to be undefined`. Restored, the case
       passed.
     - `shapeEntrySymbols` case: with the same revert, the case failed —
       `expected [Function] to throw an error … Received: undefined`. Restored, the case passed.

4. **Names.**
   - `matchGuideFences` → `attributeGuideFences`: declaration and TSDoc `tests/setupServer.ts:565-579`,
     call site `tests/setupServer.ts:652`, test `describe` `tests/setupServer.test.ts:583`.
   - `resolveEntrySymbol` → `resolveExportKeywords`: declaration `tests/setupServer.ts:239-262`, both
     call sites (recursive, `:278`, `:283`; from `shapeEntrySymbols`, `:371`), test `describe`
     `tests/setupServer.test.ts:307`.
   - `parseModuleSource` → `scanModuleSource`: declaration, TSDoc, and `@example`
     `tests/setupServer.ts:76-94`, call site in `readModuleStatements` `:113`, call site in
     `checkEntryDiagnostics` `:520`, test `describe` and import `tests/setupServer.test.ts:35,156`.
   - `ParsedModule.module: boolean` → `readonly form: 'module' | 'script'`: interface
     `tests/setupServer.ts:45-53`, assignment `tests/setupServer.ts:94-102`
     (`parsed.program.sourceType === 'module' ? 'module' : 'script'`), read site in
     `shapeEntrySymbols` `:306` (`if (parsed.form !== 'module')`), test assertions
     `tests/setupServer.test.ts:161,164,178`.

5. **Dead fixture members** (subjective 1). `tests/setupServer.test.ts:95-112` —
   `EntryModuleInterface` drops `path` and `root`; `readEntryModule` returns `{ parsed, scratch }`
   only; the local `path` is kept because it is still used to build `readModuleStatements(path)`.

6. **Case titles** (subjective 2).
   - `tests/setupServer.test.ts:220`: `reports the explicit type-only forms, star and named alike,
     and clears an ordinary value export`.
   - `tests/setupServer.test.ts:274`: `follows a re-export to the module that declares it, reads a
     local declaration in place, and stops on a visited module`.
   - `tests/setupServer.test.ts:375`: `refuses a default export, a type-only export, an unsupported
     declaration, and a script source`.
   - `tests/setupServer.test.ts:584`: `attributes a diagnostic to the fence it names, an imported
     fault to the first fence, and a file-less one likewise`.
   - `tests/setupServer.test.ts:157`: `separates an ES module from a script and reports the refusal
     the parser gives`.
   - `tests/setupServer.test.ts:405`: `reads the aliases this workspace declares as absolute
     targets`.

7. **The budget comment** (subjective 8). Moved from the old per-block comment
   (previously ahead of `describe('readProjectAliases')`) to the file header,
   `tests/setupServer.test.ts:57-62`, stating every compiler-driving block carries the `30_000`
   budget and why. The old location now reads a one-line pointer,
   `tests/setupServer.test.ts:398`: `// See the file header for the compiler-budget reason every
   '30_000'-budgeted block below shares.`

8. **TSDoc against code** (objective F6). `tests/setupServer.ts:365-370` (`@remarks` on
   `readProjectAliases`) now reads: "Each target is resolved against the invoked configuration's own
   directory, which is where this package declares its aliases; a target declared by a base
   configuration in another directory would resolve wrongly, and this reader states no support for
   that shape."

## Criteria, cheapest first

1. `grep -n "parseModuleSource\|matchGuideFences\|resolveEntrySymbol\|readonly module: boolean"
   tests/setupServer.ts tests/setupServer.test.ts tests/guides.test.ts` — exit 0, no output.
   `grep -n "scanModuleSource\|attributeGuideFences\|resolveExportKeywords\|readonly form: 'module' |
   'script'" tests/setupServer.ts` — exit 0, multiple matches (`:50,91,94,113,243,278,283,371,520,573,652`).

2. `npx oxfmt --config .oxfmtrc.json --check tests/setupServer.ts tests/setupServer.test.ts` — exit 0:
   ```
   Checking formatting...
   All matched files use the correct format.
   Finished in 67ms on 2 files using 4 threads.
   ```
   `npm run lint:check` — exit 0, `oxlint --config .oxlintrc.json --deny-warnings .` produced no
   output (no violations).
   `npm run check` — exit 0, every `tsc --noEmit` step (root project, `check:src:core`,
   `check:src:browser`, `check:src:server`) completed with no diagnostics printed.

3. `npm run test:setup` — exit 0:
   ```
   Test Files  3 passed (3)
        Tests  82 passed (82)
     Duration  32.94s
   ```
   Cases from edits 1, 2, and 3 are present and green in this run. Red-then-green readings for
   edits 2 and 3 are recorded above under each edit; edit 1's added case exercises an
   already-reported refusal path rather than new branch logic, so it carries no separate revert
   reading — its correctness is the green result above plus the file-header comment recording why no
   case can drive the signal branch itself.

4. `npm run test:guides` — exit 0:
   ```
   Test Files  1 passed (1)
        Tests  84 passed (84)
     Duration  42.76s
   ```

## `git status --short` and `git diff --stat` against `HEAD` (U10 and this round together)

```
 M tests/setupServer.test.ts
 M tests/setupServer.ts
```

```
 tests/setupServer.test.ts | 680 ++++++++++++++++++++++++++++++-----------
 tests/setupServer.ts      | 760 ++++++++++++++++++++++++++++++++++------------
 2 files changed, 1070 insertions(+), 370 deletions(-)
```

No file outside `tests/setupServer.ts` and `tests/setupServer.test.ts` changed;
`tests/guides.test.ts` needed no edit because it imports none of the renamed helpers (confirmed by
the grep in criterion 1).
