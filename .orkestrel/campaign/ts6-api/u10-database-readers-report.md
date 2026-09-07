# Unit report — U10 database-readers (database)

`tests/setupServer.ts` and `tests/setupServer.test.ts` name no `typescript` specifier. Guide fences
are typechecked by the workspace's own `tsc` run as a process over one scratch project, entry
surfaces are read by the parser `vite` re-exports after that same `tsc` proves the graph, and
`tests/guides.test.ts` is unchanged — its imports (`checkGuideFences`, `deriveEntrySurfaces`,
`tempTypeScriptProject`) all kept their names, so the unit's third owned file took no edit.

## Each function's change

`tests/setupServer.ts`

- `formatCompilerDiagnostics` (`:61`) — joins probe `Diagnostic.message` instead of
  `ts.flattenDiagnosticMessageText`; the scanner already joined each elaboration line.
- `checkCompilerDiagnostics` (`:71`) — unchanged body over probe's `Diagnostic`.
- `parseModuleSource` (`:93`) — new leaf: `parseSync(name, source)` from `vite`, returning
  `{ module, refusal, statements }`. `module` is the parser's own `sourceType`.
- `readModuleStatements` (`:111`) — new leaf: reads one module file and refuses what the parser
  refuses, naming the file.
- `resolveModuleFile` (`:133`) — new leaf: drops a `.js` / `.mjs` / `.cjs` suffix, then tries each
  source extension and each directory entry file.
- `readDeclaredNames` (`:153`) — new leaf: every binding one top-level declaration carries,
  including the several a `const A = 1, B = 2` declares.
- `readExportName` (`:181`) — new leaf: the identifier or arbitrary string name one specifier node
  carries.
- `isTypeOnlyExport` (`:197`) — parser-shaped: `(statement, specifier)` over
  `ExportNamedDeclaration | ExportAllDeclaration`, reading `exportKind` on the statement and on the
  specifier. It is called only on specifier and `export *` forms, because the parser also marks a
  declaration-carrying `export interface` / `export type` / `export declare const` statement with a
  `type` export kind (measured, see Readings).
- `classifyEntryDeclaration` (`:214`) — parser-shaped: one `ESTree.Statement`, no symbol. Same
  keyword set; `let`, `var`, `enum`, and `namespace` still read `undefined`.
- `resolveEntrySymbol` (`:239`) — parser-shaped: `(path, name, entry, visited)` returning the
  keywords one exported name resolves to, following specifier re-exports and `export *`, with a
  cycle set. Returns an empty list when the module gives the name nothing; its caller raises
  `has no declaration`.
- `shapeEntrySymbols` (`:298`) — parser-shaped: `(path, entry, visited)` returning one module's
  whole surface, recursing `export *`, refusing a default export, a type-only form, an unsupported
  declaration, and a source the parser reads as a script (`Missing TypeScript module`).
- `readProjectAliases` (`:377`) — new leaf: `tsc --showConfig -p <config>` read through probe's
  `parseProjectConfig`, lowering each declared `paths` target to an absolute path.
- `readProjectDiagnostics` (`:418`) — new leaf: writes the scratch project, spawns the compiler,
  and reads its printed output with probe's `scanDiagnostics`.
- `checkEntryDiagnostics` (`:468`) — new leaf: filters to the caller's `src` tree as before, then
  fails closed under `TypeScript options`, `TypeScript syntax`, and `TypeScript semantics`.
- `locateGuideFences` (`:503`) — unchanged.
- `matchGuideFences` (`:537`) — new leaf: the fences one diagnostic reads against.
- `formatGuideFenceDiagnostic` (`:556`) — same signature, same 1-based arithmetic, reading
  `diagnostic.path` and `diagnostic.range.start` instead of `diagnostic.file` and `diagnostic.start`.
- `checkGuideFences` (`:587`) — writes each fence as today, merges the caller's declared aliases
  with the three `@orkestrel/database*` entries, and runs the compiler **once** over every fence
  instead of once per fence.
- `deriveEntrySurfaces` (`:644`) — existence check, then `checkEntryDiagnostics`, then the parser
  walk per entry, deduplicated by `@orkestrel/guide`'s `computeSymbolKey` and sorted by name then
  keyword. Signature and return shape unchanged.
- `tempTypeScriptProject` (`:682`) and everything after it — unchanged.

`tests/setupServer.test.ts` — every compiler-symbol fixture (`readEntryProgram`, `findExport`,
`firstDeclaration`) is replaced by `readEntryModule` and `readNamedExports`, which parse a real
written module off disk; `readDiagnostics` now drives `readProjectDiagnostics` over a real project.
Each new leaf gained a block. The fixtures and controls named in the brief are all present:
`export { build }` against `export type { Shape }` and `export { type Label }`; the merged `Engine`;
the `let` / `default` / type-only refusals; the missing entry; the `src` fault; the outside-`src`
diagnostic ignored; the sorted surface; the planted `BROKEN_FENCE`.

## The `scanDiagnostics` declaration reading

`node_modules/@orkestrel/probe/dist/src/server/index.d.ts:130` and `:1245`, probe 0.0.12:

```ts
export declare interface Diagnostic {
	readonly path?: string
	readonly range?: LSPRange
	readonly message: string
}
export declare function scanDiagnostics(text: string): readonly Diagnostic[]
```

`path` and `range` are absent together and `path` is "spelled as the compiler printed it, relative
to the directory the run started in". `range` holds the zero-based UTF-16 point, with `end` equal to
`start`. `message` joins every elaboration line. That is the file, the point, and the message a
fence diagnostic needs, so no gap and no local reader. `parseProjectConfig` (`:778`) carries
`compilerOptions` as `unknown`, so `readProjectAliases` narrows it with `in`, `typeof`,
`Array.isArray`, and `Reflect.get` into `unknown` — no `any`, no assertion.

Both runs set the compiler's working directory to the caller config's own directory, so every
printed path resolves against that directory and `relative(root, file)` reads as before.

## The scratch config shapes written

Entry graph, written under `<config dir>/tmp/database-project-*/tsconfig.json`:

```json
{ "extends": "<caller config>", "compilerOptions": { "noEmit": true }, "files": ["<entry>", "..."], "include": [] }
```

Guide fences, same location, with the alias overlay:

```json
{
  "extends": "<caller config>",
  "compilerOptions": { "noEmit": true, "paths": { "<caller's own aliases, absolute>": ["..."],
    "@orkestrel/database": ["<root>/src/core/index.ts"],
    "@orkestrel/database/browser": ["<root>/src/browser/index.ts"],
    "@orkestrel/database/server": ["<root>/src/server/index.ts"] } },
  "files": ["<fence>", "..."], "include": []
}
```

Both are run as `node <workspace tsc> --noEmit --pretty false -p <scratch>/tsconfig.json`, with the
scratch destroyed in `finally`.

## Readings

The two unknowns the brief named, and the measurement that settled a third.

- **`paths` in a scratch config that extends the package config, under TypeScript 6.0.3.** Absolute
  targets resolve with no `baseUrl`. A fence importing `@orkestrel/database` resolved and a fence
  importing a name the server barrel does not export reported
  `Module '"@orkestrel/database/server"' has no exported member 'generateKey'.` — the probe ran
  before any edit.
- **A derived `paths` replaces the inherited set rather than merging with it.** The same probe with
  the overlay alone and the caller's `@src/*` aliases dropped reported
  `Cannot find module '@src/core' or its corresponding type declarations.` in
  `src/server/compilers.ts` and every server module beside it. That is why `readProjectAliases`
  exists: the overlay carries the caller's own aliases forward. Reading them costs one
  `tsc --showConfig`, measured at 130 ms to 148 ms.
- **The parser marks a declaration-carrying type export with a `type` export kind.**
  `export interface Shape {}`, `export type Label = string`, and `export declare const D: number`
  each parse to an `ExportNamedDeclaration` with `exportKind: 'type'` and a non-null `declaration`,
  while `export { type Label } from './x.js'` carries `exportKind: 'value'` on the statement and
  `'type'` on the specifier. So `isTypeOnlyExport` is called only on specifier and `export *` forms,
  and the declaration branch classifies instead.
- **The `guides` project's load-time reading.** `deriveEntrySurfaces` over the three real entries
  measured 2607 ms in an isolated probe run and 2613 ms as that probe's own case. In the two
  `npm run test:guides` runs the reporter's whole import phase read 3.31 s and 4.83 s, against a
  suite duration of 42.87 s and 50.14 s. The load is not inside a case, so no case budget bounds it.

The parser reader was checked against the mechanism it replaces before the test file moved. A
throwaway probe ran the committed compiler-API `deriveEntrySurfaces` beside the new one over
`/home/user/fleet/database/tsconfig.json` and the three real entries, comparing
`computeSymbolKey` lists:

```
src/core/index.ts new 88 old 88      only new: []   only old: []
src/browser/index.ts new 11 old 11   only new: []   only old: []
src/server/index.ts new 36 old 36    only new: []   only old: []
```

## Criteria, cheapest first

1. **No `typescript` specifier.**
   `grep -rn "from 'typescript'\|from \"typescript\"\|require('typescript')" tests src configs`
   printed nothing; grep exit 1 (no match).
2. **Format, lint, typecheck.**
   `npx oxfmt --config .oxfmtrc.json --check tests/setupServer.ts tests/setupServer.test.ts tests/guides.test.ts`
   → `All matched files use the correct format.`, exit 0.
   `npm run lint:check` → exit 0, no output.
   `npm run check` → exit 0, last line `tsc --noEmit -p configs/src/tsconfig.server.json`.
3. **Both suites.**
   `npm run test:setup` → exit 0, `Test Files  3 passed (3)` / `Tests  78 passed (78)` /
   `Duration  36.22s`.
   `npm run test:guides` → exit 0, `Test Files  1 passed (1)` / `Tests  84 passed (84)` /
   `Duration  50.14s`.
4. **The planted controls are cases, not one-off runs.**
   `checkGuideFences > names the failing fence and its guide line, and only that fence` asserts
   `/^Guide TypeScript fences failed:\n/`, `Fence 2 (guide line 8)`, and not `Fence 1`.
   `deriveEntrySurfaces > fails closed on a colliding star re-export` plants
   `export * from './a.js'` beside `export * from './b.js'` over one shared name and asserts
   `/TypeScript semantics failed:/`. Both are in `tests/setupServer.test.ts` and both pass.

## The instruments were proved able to fail

Two planted batches in `tests/setupServer.ts`, each run through `npm run test:setup`, then restored
from a copy taken before planting. The restored file is byte-identical to the accepted one and
`npx oxfmt --check` passes over it.

Batch one — `let` classified as `const`; statement-level `exportKind` ignored; an unmatched
diagnostic spread over every fence; the semantics and syntax buckets swapped; the fence line not
advanced; the directory entry candidate removed; every source read as a module. Result:
`Tests  11 failed | 67 passed (78)`, reddening `parseModuleSource`, `resolveModuleFile`,
`isTypeOnlyExport`, `classifyEntryDeclaration`, `shapeEntrySymbols > refuses a default export…`,
both `checkEntryDiagnostics` cases, `matchGuideFences`, `formatGuideFenceDiagnostic > adds the
diagnostic line…`, and both fail-closed `deriveEntrySurfaces` cases.

Batch two — cross-module specifier re-exports not followed; the duplicate fold keyed by index
instead of by symbol; every fence reading every diagnostic; `readProjectAliases` returning nothing.
Result: `Tests  4 failed | 74 passed (78)`, reddening exactly `resolveEntrySymbol > follows a
re-export…`, `readProjectAliases > reads this workspace's own aliases…`, `checkGuideFences > names
the failing fence…`, and `deriveEntrySurfaces > reads one symbol for a name two star paths reach…`.

## Tree state

```
$ git status --short
 M tests/setupServer.test.ts
 M tests/setupServer.ts

$ git diff --stat
 tests/setupServer.test.ts | 626 +++++++++++++++++++++++++++------------
 tests/setupServer.ts      | 724 ++++++++++++++++++++++++++++++++++------------
 2 files changed, 981 insertions(+), 369 deletions(-)
```

`tests/guides.test.ts` is untouched. Nothing outside the owned files was edited. The probes that
settled the readings are retained at `/home/user/fleet/database/tmp/u10probe/probe1.mjs` through
`probe4.mjs`; the runtime probes under `tmp/probe/` are removed.

## Flagged claims

- **A diagnostic no fence file carries reads against the guide's first fence.** One compile covers
  every fence, so the compiler names the file at fault and not the fence that reached it. The
  ordinal is then the first fence's while the appended `[file:line:col]` names the real location.
  `matchGuideFences` owns that rule and its TSDoc states it. Under the previous design, one program
  per fence attributed such a diagnostic to whichever fence was being compiled, which was a
  different guess at the same unknown. No case in either suite reaches it, because
  `npm run check` proves `src/**` clean before the guides suite runs.
- **`export *` over a module carrying a default export now refuses.** TypeScript does not carry a
  default through `export *`, so the previous reader ignored it; the parser walk refuses it with
  today's `contains unsupported default export` message. `grep -rn "export default" src/` prints
  nothing and this project's own law bans the form, so the difference is unreachable here. It can
  only turn silence into a refusal, never a wrong surface.
- **A name bound by an import and then re-exported locally refuses rather than resolving.**
  `resolveEntrySymbol` reads a local `export { a }` against the declarations in the same file, as
  the brief fixes. A name reached only through `import { a } from './x.js'` followed by
  `export { a }` yields nothing and its caller raises `has no declaration`. The three real barrels
  carry only `export *` (`grep -rn "^export" src/ --include=*.ts` shows nothing else), and no
  fixture uses the form.
- **The `formatGuideFenceDiagnostic` foreign-file pin now asserts `[index.ts:1:14]` against a
  fixture written at the project root.** The previous fixture wrote `src/index.ts` and passed
  `dirname(path)` as the root; the compiler now prints paths relative to the run directory, so the
  root the formatter receives is the run directory. The bracket text and the arithmetic the case
  proves are unchanged.
- **The `executable guide fences` cases in `tests/guides.test.ts` sit under the project's 5 s
  default and measured 1981 ms to 2333 ms.** That file is off-limits to this unit, so no budget was
  stated there. Each such case spawns one compiler process; a contended host could push one past
  the default. Compiler-driving blocks inside `tests/setupServer.test.ts` carry an explicit
  `30_000` budget with the measurement behind it recorded in a comment.
- **Timing under this unit's own exec is pessimistic.** Every duration here was taken with this
  unit's exec resident. The deciding contended reading belongs to the Orchestrator after the unit
  exits.

## Finding for the next change

**The parser-reader pattern is now duplicated between two test setups, with no shared owner.**

- `/home/user/scaffold/tests/setupServer.ts:888` — `readStatements(source, name)` calls
  `parseSync` from `vite`, refuses on `parsed.errors[0]`, and folds `program.body` into its own
  `TestStatement` / `TestDeclaration` records with export kind, specifier, and source slices.
- `/home/user/fleet/database/tests/setupServer.ts:93,111,133,153,181` — `parseModuleSource`,
  `readModuleStatements`, `resolveModuleFile`, `readDeclaredNames`, and `readExportName` call the
  same parser through the same import and answer the same class of question about the same node
  types.

They differ in what they project, not in how they read: scaffold projects a test file's declared
shapes, database projects a barrel's exported surface. The shared leaves are the parse-and-refuse
step, the module-versus-script reading, the declared-name reading, the export-name reading, and the
specifier-to-source-file resolution. `@orkestrel/test` is the package that already owns the helpers
every workspace repeats, and its server entry already carries `createScratch` and `readInventory`.
Route this against that owner in a successor change; the two copies drift the moment either
workspace meets a node form the other has not.
