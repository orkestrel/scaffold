# U10/U11 absorption distillate (Cursor Grok, session e32df27d-e881-462b-9ac5-00b25c944484, journal tmp/cursor/u10u11-absorb.jsonl)

I'll absorb both checkouts directly: locate the named files, then read every compiler-touching site and its consumers.Named files exist in both fleet checkouts; `/home/user/lsp` is absent. Next I’ll read the compiler-touching sources and their consumers.Main sources are in. Next I’ll locate consumers, guide passages, scripts, and whether `setup.ts` names TypeScript.Grep from the scaffold root missed fleet consumers. I’ll search those checkouts by path and read the guide/test files that actually call this machinery.`/home/user/lsp` is absent, so `/home/user/lsp/tests/setupConformance.test.ts` is absent. The fleet copies exist: `/home/user/fleet/lsp/tests/setupConformance.test.ts` and `/home/user/fleet/lsp/tests/conformance.test.ts`. This machinery does not read doc comments.

---

## A. `/home/user/fleet/database`

### A1. `typescript` imports and `ts.` members

**`tests/setupServer.ts`**

- Type import `Diagnostic`, `Symbol as CompilerSymbol`, `TypeChecker` — `tests/setupServer.ts:10`
- Value import `* as ts from 'typescript'` — `tests/setupServer.ts:16`

`ts.` / compiler members used:

| Member | Sites |
| --- | --- |
| `ts.flattenDiagnosticMessageText` | `tests/setupServer.ts:36`, `:100` |
| `diagnostic.file`, `diagnostic.start`, `diagnostic.messageText` | `:94–100` |
| `SourceFile.getLineAndCharacterOfPosition`, `SourceFile.fileName` | `:95–98` |
| `ts.readJsonConfigFile` | `:127`, `:287` |
| `ts.sys.readFile` | `:127`, `:287` |
| `ts.parseJsonSourceFileConfigFileContent` | `:128–134`, `:288–294` |
| `ts.sys` (host) | `:130`, `:290` |
| `ts.CompilerOptions` | `:136` |
| `ts.createProgram` | `:148`, `:296–299` |
| `program.getOptionsDiagnostics` | `:150`, `:311` |
| `program.getSyntacticDiagnostics` | `:151`, `:301` |
| `program.getSemanticDiagnostics` | `:152`, `:306` |
| `ts.sys.fileExists` | `:284` |
| `program.getTypeChecker` | `:315` |
| `program.getSourceFile` | `:319` |
| `checker.getSymbolAtLocation` | `:321` |
| `checker.getExportsOfModule` | `:324` |
| `checker.getAliasedSymbol` | `:197` |
| `ts.isExportSpecifier`, `declaration.isTypeOnly` | `:174–180` |
| `ts.isNamedExports` | `:177` |
| `ts.isExportDeclaration`, `declaration.parent.parent.isTypeOnly` | `:178–183` |
| `ts.SymbolFlags.Alias` | `:196` |
| `ts.SymbolFlags.TypeAlias` + `ts.isTypeAliasDeclaration` | `:211` |
| `ts.SymbolFlags.Interface` + `ts.isInterfaceDeclaration` | `:214` |
| `ts.SymbolFlags.Class` + `ts.isClassDeclaration` | `:217` |
| `ts.SymbolFlags.Function` + `ts.isFunctionDeclaration` | `:220` |
| `ts.SymbolFlags.Variable` + `ts.isVariableDeclaration` + `ts.isVariableDeclarationList` + `ts.NodeFlags.Const` | `:224–227` |
| `symbol.declarations`, `symbol.flags`, `symbol.name` | throughout `:172–266` |
| `ts.Declaration` (param type) | `:209` |

**`tests/setupServer.test.ts`** (drives the same API to feed the helpers)

- Type import `Diagnostic`, `Symbol as CompilerSymbol`, `TypeChecker` — `tests/setupServer.test.ts:1`
- Value import `* as ts from 'typescript'` — `:10`
- `ts.createProgram` — `:88`, `:126`
- `ts.ScriptTarget.ESNext` — `:92`, `:128`
- `ts.ModuleKind.ESNext` — `:93`
- `ts.ModuleResolutionKind.Bundler` — `:94`
- `program.getTypeChecker` — `:98`
- `program.getSourceFile` — `:99`
- `checker.getSymbolAtLocation` — `:100`
- `checker.getExportsOfModule` — `:101`
- `program.getSemanticDiagnostics` — `:130`
- `declaration.getSourceFile().fileName` — `:326`

### A2. Compiler-touching exported functions

**`formatCompilerDiagnostics(diagnostics: readonly Diagnostic[]): string`** — `tests/setupServer.ts:34–38`

- Maps each diagnostic through `ts.flattenDiagnosticMessageText(..., '\n')`, joins with `\n`.
- Output: newline-delimited message text; empty input → `''`.

**`checkCompilerDiagnostics(phase: string, diagnostics: readonly Diagnostic[]): void`** — `:46–49`

- Returns if `diagnostics.length === 0`; else throws `` `${phase} failed:\n${formatCompilerDiagnostics(diagnostics)}` ``.

**`formatGuideFenceDiagnostic(diagnostic, fence, root): string`** — `:87–102`

- If `diagnostic.file` and `diagnostic.start` exist: `getLineAndCharacterOfPosition`; if that file is the fence file, add `position.line` to `fence.line`; append `[relative(root, file):line:col]` (1-based).
- Message via `ts.flattenDiagnosticMessageText`.
- Output: `` `Fence ${ordinal} (guide line ${line})${location}: ${message}` ``.

**`locateGuideFences`** (`:59–77`) does not call `ts.*`. It locates fence bodies in the guide string and names `fence-NN.ts` paths. `checkGuideFences` uses it.

**`checkGuideFences(config: string, document: string, fences: readonly string[]): void`** — `:111–164`

1. Throws if `fences.length === 0` (`:116`).
2. Resolves `config`; `root = dirname(configPath)`; `mkdirSync(join(root, 'tmp'))`; scratch `createScratch({ parent: tmp, prefix: 'database-guide-' })` (`:117–121`).
3. `locateGuideFences`; writes each fence as `${source}\nexport {}\n` (`:123–126`).
4. Reads **the caller tsconfig** with `ts.readJsonConfigFile` + `ts.parseJsonSourceFileConfigFileContent(..., { noEmit: true }, configPath)` (`:127–135`).
5. Overlays `noEmit: true` and `paths` mapping `@orkestrel/database`, `/browser`, `/server` onto `src/{core,browser,server}/index.ts` (`:136–145`).
6. Per fence: `ts.createProgram({ rootNames: [fence.path], options })`; concatenates options + syntactic + semantic diagnostics (`:147–153`).
7. Formats with `formatGuideFenceDiagnostic`; throws joined messages (`:154–160`).
8. `scratch.destroy()` in `finally` (`:161–163`).

Inputs: package (or scratch) tsconfig path, full guide text, fence bodies. Module resolution uses that config plus the overlaid package paths; other specifiers resolve through the compiler host (workspace `node_modules`). Output: `void`, or throw.

**`isTypeOnlyExport(symbol: CompilerSymbol): boolean`** — `:172–186`

Walks `symbol.declarations`. True for: specifier `isTypeOnly`; specifier whose named-exports parent is a type-only `ExportDeclaration`; an `ExportDeclaration` that is itself type-only. Ordinary value re-exports are false.

**`resolveEntrySymbol(checker, symbol): CompilerSymbol`** — `:195–198`

If `(symbol.flags & ts.SymbolFlags.Alias) === 0`, return `symbol`; else `checker.getAliasedSymbol(symbol)`.

**`classifyEntryDeclaration(symbol, declaration): ExportKeyword | undefined`** — `:207–232`

Flag ∩ node-kind pairs only: TypeAlias+`TypeAliasDeclaration` → `'type'`; Interface+`InterfaceDeclaration` → `'interface'`; Class+`ClassDeclaration` → `'class'`; Function+`FunctionDeclaration` → `'function'`; Variable+`VariableDeclaration` whose list has `NodeFlags.Const` → `'const'`. Else `undefined` (`let`, enum, namespace, etc.).

**`shapeEntrySymbols(checker, exported, entry): readonly SurfaceSymbol[]`** — `:242–267`

1. Throws on `exported.name === 'default'` (`:247–248`).
2. Throws if `isTypeOnlyExport` (`:250–252`).
3. `target = resolveEntrySymbol`; throws if no declarations (`:253–257`).
4. Classifies each declaration; throws on `undefined` keyword (`:258–264`).
5. Returns one `{ name: exported.name, keyword }` per distinct keyword (`:266`).

**`deriveEntrySurfaces(config: string, entries: readonly string[]): ReadonlyMap<string, readonly SurfaceSymbol[]>`** — `:276–334`

1. For each entry, `resolve(dirname(configPath), entry)`; `ts.sys.fileExists` or throw `Missing TypeScript entry` (`:280–286`).
2. Parse the **caller tsconfig** with `{ noEmit: true }` overlay (`:287–295`).
3. `ts.createProgram({ rootNames, options: { ...parsed.options, noEmit: true } })` (`:296–299`).
4. Filter syntactic/semantic diagnostics to files under `resolve(dirname(configPath), 'src')` (keep file-less diagnostics; drop paths that `relative` as `..` or absolute) (`:300–310`).
5. Fail-closed: options, then syntax, then semantics via `checkCompilerDiagnostics` (`:311–313`).
6. `getTypeChecker`; per entry `getSourceFile` → `getSymbolAtLocation` → `getExportsOfModule` → `shapeEntrySymbols` (`:315–326`).
7. Sort by `name` then `keyword`; map **caller entry strings** → sorted symbols (`:327–333`).

Live consumer input: `join(ROOT, 'tsconfig.json')` (`tests/guides.test.ts:117`) — `/home/user/fleet/database/tsconfig.json` (`target`/`module` ESNext, `moduleResolution` bundler, `strict`, `noEmit`, `skipLibCheck`, path aliases `@src/*` only). Scratch tests use `tempTypeScriptProject`’s tsconfig (`strict`, ESNext, bundler, `noEmit`, `include: ['src/**/*.ts']`) at `tests/setupServer.ts:349–358`.

Output: `ReadonlyMap<entryPath, readonly { name, keyword }[]>`.

**`tempTypeScriptProject`** (`:342–366`) does not call `ts.*`. It writes the scratch tsconfig plus caller files (`prefix: 'database-typescript-'`) and returns `{ scratch, config }`. Compiler functions read that config.

### A3. Consumers in `tests/**` and `guides/**`

Function names never appear in `guides/*.md`. Callers:

**`tests/guides.test.ts:66`** imports `checkGuideFences`, `deriveEntrySurfaces`, `tempTypeScriptProject`.

- Module load: `deriveEntrySurfaces(join(ROOT, 'tsconfig.json'), entryPaths)` where `entryPaths` are `${directory}/index.ts` for unique manifest source dirs (`:113–117`). Asserts bijection: `findMissingSymbols(surface, guide.surface())` and the reverse (`:611–616`) — every compiler-resolved public export is a `## Surface` row and every row is a real entry export.
- `describe('compiler entry surfaces')` (`:137–289`): nested barrels + stable keyword order; add/remove/rename/keyword; unreachable sibling ignored; colliding `export *` and missing re-export throw `TypeScript semantics failed`; `it.each` rejects `let`, `default`, `type-only`, `enum`, `namespace`; missing entry / non-module file / syntax throw the matching strings.
- `describe('executable guide fences')` (`:291–349`): planted stale option key, incomplete `ColumnSchema`, nonexistent method `database.connect()`, removed `generateKey` — each `checkGuideFences(package tsconfig, ...)` throws `` Fence 1 (guide line ${line}) ``.
- Per-manifest: `checkGuideFences(join(ROOT, 'tsconfig.json'), guide text, ts fence bodies)` must not throw (`:664–675`). Comment at `:352–353`: `noEmit` proves names resolve only; trailing `// value` comments are not read.

**`tests/setupServer.test.ts`** pins every helper (A4). No other `tests/**` file imports `./setupServer`.

Helpers used only from the pin file (plus internal composition): `formatCompilerDiagnostics`, `checkCompilerDiagnostics`, `formatGuideFenceDiagnostic`, `isTypeOnlyExport`, `resolveEntrySymbol`, `classifyEntryDeclaration`, `shapeEntrySymbols`.

### A4. Pin cases in `setupServer.test.ts`

| Case | Fixture / planted control | Proves |
| --- | --- | --- |
| `formatCompilerDiagnostics` / flattens every diagnostic (`:147–158`) | scratch `export const limit: number = 'five'` | one line per diagnostic; contains assignability text; `[]` → `''` |
| `checkCompilerDiagnostics` / silent then throw (`:162–176`) | same | `[]` returns `undefined`; throw starts `Entry semantics failed:\n` and includes assignability |
| `formatGuideFenceDiagnostic` / adds diagnostic line (`:216–232`) | two-line fence source; `fence.line = 8` | `Fence 2 (guide line 9)` |
| `formatGuideFenceDiagnostic` / foreign file (`:234–248`) | diagnostic file ≠ fence path | keeps guide line 4; `[index.ts:1:14]` |
| `checkGuideFences` / no fences (`:252–261`) | empty `fences` | throws `has no executable TypeScript fences` |
| `checkGuideFences` / every fence compiles (`:263–270`) | `GUIDE` + `FIRST_FENCE`/`SECOND_FENCE` | returns `undefined` |
| `checkGuideFences` / names failing fence (`:272–288`) | planted `BROKEN_FENCE` (`'text'` assigned to `number`) | `Guide TypeScript fences failed:`; `Fence 2 (guide line 8)`; not `Fence 1` |
| `isTypeOnlyExport` (`:292–309`) | `export { build }`; `export type { Shape }`; `export { type Label }` | value false; both type-only forms true |
| `resolveEntrySymbol` (`:313–333`) | re-export `build` + local `LIMIT` | alias resolves to `shapes.ts`; local identity |
| `classifyEntryDeclaration` (`:337–357`) | class/function/const/interface/type/`let` | `['class','function','const','interface','type', undefined]` |
| `shapeEntrySymbols` / merged name (`:361–380`) | `interface Engine` + `const Engine` | two symbols, keywords `const` and `interface` |
| `shapeEntrySymbols` / refusals (`:382–404`) | default + `export type { Shape }` + `export let counter` | default / type-only / unsupported declaration |
| `deriveEntrySurfaces` / sorted surface (`:408–433`) | `export *` + class/function/const + second entry | keys preserved; sorted `name:keyword` |
| `deriveEntrySurfaces` / missing path (`:435–444`) | `src/absent.ts` | `Missing TypeScript entry 'src/absent.ts'` |
| `deriveEntrySurfaces` / src fault (`:446–457`) | type error in `src/index.ts` | `TypeScript semantics failed:` |
| `deriveEntrySurfaces` / outside `src` (`:459–472`) | planted `lib/broken.ts` re-exported from `src` | ignores that diagnostic; still `{ BROKEN, const }` |
| `tempTypeScriptProject` (`:476–485`) | writes `src/index.ts` | `tsconfig.json` has `strict`+`noEmit`; destroy removes tree |

`GUIDE` / `FIRST_FENCE` / `SECOND_FENCE` / `BROKEN_FENCE` are the planted guide controls (`:47–62`).

### A5. Guide passages

No `guides/*.md` names these functions. Passages that describe the machinery’s *job*:

- `guides/database.md:433–439` — DOC ↔ PUBLIC ENTRY bijection: Surface rows ↔ reachable barrel exports, “compiler-resolved and exhaustive in both directions”.
- `guides/database.md:2430` — `tests/guides.test.ts` is the `## Surface` ↔ compiler-resolved public-entry bijection across `src/core`, `src/server`, `src/browser`, plus fail-closed temporary-project coverage for barrel resolution and unsupported exports.

Fence compilation is implied by `tests/guides.test.ts` (A3), not by a named `checkGuideFences` guide sentence. Closest neighboring text:

- `guides/guide.md:3–6` and `:220–239` — `@orkestrel/guide` `Source` scanners use **no TypeScript compiler API**; warns against “a second projector built on the TypeScript compiler”.
- `guides/guide.md:403–409` — example presence via fence name **or** leading JSDoc `@example`; “fence and JSDoc **content** are never checked”. That is the guide toolkit, not `setupServer.ts`.
- `guides/scaffold.md:1523–1526` — scaffold’s own parity: named imports in TypeScript fences resolve; it does **not** typecheck a whole fence. That is the vendored scaffold guide, not this package’s `checkGuideFences` (which *does* typecheck fences).

**Doc-comment reading:** absent in `tests/setupServer.ts` / `tests/setupServer.test.ts`. No `getJSDoc*`, `getDocumentationComment`, or `displayPartsToString`. JSDoc in `guides/guide.md` is the text-scanner projector, not this compiler walk.

### A6. Fixtures / scratch tsconfigs

- **Written by `tempTypeScriptProject`:** `tsconfig.json` + caller files under `database-typescript-*` (`tests/setupServer.ts:346–361`). Destroyed by tests.
- **Written by `checkGuideFences`:** `join(packageRoot, 'tmp')` then `database-guide-*` scratch; `fence-NN.ts` bodies (`:119–126`). Destroyed in `finally`.
- **Read by live `deriveEntrySurfaces` / `checkGuideFences`:** `/home/user/fleet/database/tsconfig.json` (`tests/guides.test.ts:117`, `:346`, `:667`).
- No committed fixture tsconfig besides that package config.

---

## B. `/home/user/fleet/lsp`

### B1. `typescript` imports and `ts.` members

**`tests/setupConformance.ts`**

- Default import `ts from 'typescript'` — `tests/setupConformance.ts:37`
- `ts.Node` — `:473`
- `ts.isImportDeclaration`, `ts.isExportDeclaration` — `:475`
- `ts.isStringLiteral` — `:477`, `:485`, `:495`
- `ts.isImportEqualsDeclaration`, `ts.isExternalModuleReference` — `:482–483`
- `ts.isCallExpression` — `:490`
- `ts.SyntaxKind.ImportKeyword` — `:491`
- `node.forEachChild` (instance walk, not `ts.forEachChild`) — `:500–502`
- `ts.createSourceFile` — `:518`
- `ts.ScriptTarget.Latest`, `ts.ScriptKind.TS` — `:518`

**`tests/setupConformance.test.ts`** and **`tests/conformance.test.ts`**: no `typescript` import; they call the helpers.

### B2. Import walk

**`readProtocolSpecifier(specifier: string): string | undefined`** — `:459–464` (no `ts.*`). Returns the specifier if it equals or is a subpath of `vscode-languageserver-protocol`, `vscode-languageserver-types`, or `vscode-jsonrpc` (`PROTOCOL_FAMILY` `:146–150`).

**`readForbiddenNode(node: ts.Node): string | undefined`** — `:473–504`

Detects, first hit in `forEachChild` source order:

| Form | Detected | How |
| --- | --- | --- |
| Static `import` / `export … from` (including type-only and bare side-effect `import 'x'`) | yes | `ImportDeclaration` or `ExportDeclaration` with string `moduleSpecifier` (`:475–479`) |
| `import = require(...)` (`ImportEquals` + `ExternalModuleReference`) | yes | `:482–487` |
| Dynamic `import('literal')` | yes | `CallExpression` whose expression kind is `ImportKeyword`, one argument, string literal (`:489–497`) |
| `require('…')` as a call | **no** | only `ImportKeyword`, not an identifier `require` |
| Non-literal `import(expr)` | **no** | argument must be `StringLiteral` |

Returns `readProtocolSpecifier(text)` on a hit, else recurses children (`:499–503`).

**`readForbiddenImport(source: string, name = 'source.ts'): string | undefined`** — `:513–520`

`ts.createSourceFile(name, source, ScriptTarget.Latest, /*setParentNodes*/ true, ScriptKind.TS)` then `readForbiddenNode`. No program, no checker. Output: first forbidden specifier or `undefined`.

**`readForbiddenSource(root: string): string | undefined`** — `:529–537`

`globSync(['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.mts', 'src/**/*.cts'], { cwd: root })`; per file `readForbiddenImport(utf8, path)`; first hit as `` `${path}:${specifier}` ``.

**`CONFORMANCE_FORBIDDEN_SOURCE = readForbiddenSource(WORKSPACE_PATH)`** at import time (`:1242–1243`).

Consumers:

- `tests/setupConformance.test.ts:88–90` — `readForbiddenImport("import {} from 'vscode-jsonrpc'\n")` is `'vscode-jsonrpc'`; `import {} from '@orkestrel/contract'` is `undefined`.
- `tests/conformance.test.ts:236–240` — `readConformanceDrift('src imports', CONFORMANCE_FORBIDDEN_SOURCE, 'boundary', undefined)` must be `undefined` (no forbidden src import).

### B3. Pin cases and planted control

Import-walk pins:

- `reports a forbidden import from TypeScript syntax` (`tests/setupConformance.test.ts:88–91`) — planted `vscode-jsonrpc` vs allowed `@orkestrel/contract`. Only the static `import {} from` form is pinned. Type-only, side-effect, `import =`, `import()`, and `require` are unpinned.
- `keeps the upstream protocol family out of src imports` (`tests/conformance.test.ts:236–240`) — live walk of `src/**`.

Other cases in `setupConformance.test.ts` pin metaModel/digest helpers, not the compiler walk. The byte-perturbed mirror (`:72–86`) is a digest control, not an import-walk control.

### B4. Guide passages

No `guides/*.md` names `readForbiddenImport` / `readForbiddenNode` / `readForbiddenSource`, or describes an import AST walk.

`guides/lsp.md:293–301` describes the conformance **metaModel** mirror, digest pins, and `tests/setupConformance.ts` constants. It does not describe parsing TypeScript imports. `guides/lsp.md` has no Tests section.

---

## C. Scripts and `tests/setup.ts`

**Database** (`package.json:73–91`):

- `test:setup` — `vitest run … --project setup` (`:91`)
- `test:guides` — `vitest run … --project guides` (`:80`)
- `test:conformance` — **absent**
- `test` chains `test:setup` and `test:guides` (`:73`)

Vite: `setup` includes `tests/setup*.test.ts` (`vite.config.ts:168`); `guides` includes `tests/guides.test.ts` (`:179`).

**LSP** (`package.json:66–74`):

- `test:setup` — `--project setup` (`:71`)
- `test:guides` — `--project guides` (`:73`)
- `test:conformance` — `--project conformance` (`:74`)
- `test` chains all three (`:66`)

Vite: `setup` includes `tests/setup*.test.ts` (`vite.config.ts:126`); `conformance` includes `tests/conformance.test.ts` (`:151`).

**`tests/setup.ts` names `typescript`:** no, in either checkout.

- Database `tests/setup.ts:1–24` — core/contract/emitter imports only; whole-file search has no `typescript`.
- LSP `tests/setup.ts:1–4` — only `resolveRoot` / `WORKSPACE_ROOT`.

`package.json` `"typescript"` elsewhere is the keyword (`database/package.json:11`, `lsp/package.json:12`) and `devDependencies` `^6.0.3` (`database/package.json:110`, `lsp/package.json:100`), not the host-independent setup file.

---

## Closing table

| Checkout | file:line | Name | Computes | Consumers | Tests |
| --- | --- | --- | --- | --- | --- |
| database | `tests/setupServer.ts:34` | `formatCompilerDiagnostics` | Flatten diagnostic `messageText` to newline-delimited string | 1 file | 1 |
| database | `tests/setupServer.ts:46` | `checkCompilerDiagnostics` | Throw a named phase error when any diagnostic exists | 1 file (plus internal) | 1 |
| database | `tests/setupServer.ts:87` | `formatGuideFenceDiagnostic` | Map a diagnostic onto fence ordinal, guide line, optional foreign location | 1 file (plus internal) | 2 |
| database | `tests/setupServer.ts:111` | `checkGuideFences` | Typecheck each guide fence as its own `noEmit` program against the package tsconfig with overlaid `@orkestrel/database*` paths | 2 files | 3 pin + planted-refusal `it.each` + per-guide compile |
| database | `tests/setupServer.ts:172` | `isTypeOnlyExport` | True iff an export symbol’s declarations are type-only specifier/declaration forms | 1 file (plus internal) | 1 |
| database | `tests/setupServer.ts:195` | `resolveEntrySymbol` | Follow `SymbolFlags.Alias` via `getAliasedSymbol`, else identity | 1 file (plus internal) | 1 |
| database | `tests/setupServer.ts:207` | `classifyEntryDeclaration` | Map flag∩declaration to `'type'\|'interface'\|'class'\|'function'\|'const'` or `undefined` | 1 file (plus internal) | 1 |
| database | `tests/setupServer.ts:242` | `shapeEntrySymbols` | Refuse default/type-only/unsupported; emit one `{name,keyword}` per distinct supported declaration | 1 file (plus internal) | 2 |
| database | `tests/setupServer.ts:276` | `deriveEntrySurfaces` | Build a `noEmit` program from a tsconfig, fail-closed on in-`src` diagnostics, list each entry’s sorted public `SurfaceSymbol`s | 2 files | 4 pin + 6 barrel/unsupported cases + 2 bijection assertions |
| lsp | `tests/setupConformance.ts:473` | `readForbiddenNode` | First protocol-family specifier under an AST node (static import/export, `import =`, literal `import()`) | 0 external files | 0 direct |
| lsp | `tests/setupConformance.ts:513` | `readForbiddenImport` | `createSourceFile` + `readForbiddenNode` over source text | 1 file (plus `readForbiddenSource`) | 1 |
| lsp | `tests/setupConformance.ts:529` | `readForbiddenSource` | First `path:specifier` under `src/**/*.{ts,tsx,mts,cts}` | 1 file (via `CONFORMANCE_FORBIDDEN_SOURCE`) | 1 |

Consumer counts are distinct files under `tests/**` that import the function, excluding the defining file. Test counts are dedicated `it` cases whose describe names that function, plus extra cases noted in the last column.

---

## Coverage

**Read:**  
`/home/user/fleet/database/tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/guides.test.ts`, `tests/setup.ts`, `package.json`, `tsconfig.json`, `vite.config.ts` (search), `guides/database.md`, `guides/test.md`, `guides/guide.md`, `guides/scaffold.md`;  
`/home/user/fleet/lsp/tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`, `package.json`, `vite.config.ts` (search), `guides/lsp.md`.

**Searched, not fully read:** remaining `guides/*.md` in both checkouts (no function-name hits; lsp import-walk terms absent); database/lsp `tests/**` for consumers.

**Absent:** `/home/user/lsp` (and therefore `/home/user/lsp/tests/setupConformance.test.ts`). Fleet lsp pin and conformance files exist.
