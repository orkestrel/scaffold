<!-- workflow wf_45a3007b-190, agent a72eeedafd5730c18, captured from journal.jsonl, 2026-09-06 -->

# Report — ts6-m8m13: the oxlint JS plugin context and `RuleTester` over TypeScript source

## Setup

`/home/user/scaffold/node_modules/oxlint/package.json` names `bin/oxlint` (a Node script importing `dist/cli.js`) and the `exports` map `./plugins-dev` at `dist/plugins-dev.js` with types at `dist/plugins-dev.d.ts`. Version `1.80.0`. A `jsPlugins` entry's `specifier` can name a `.ts` file directly; oxlint loads it without a separate build step.

Instrument at `<scratch>/plugin.ts` exports `CONTEXT_PROBE_RULE`, `PLACEMENT_PROBE_RULE`, and a default plugin object `{ meta: { name: 'probe' }, rules: { 'context-probe': ..., 'placement-probe': ... } }`, matching the shape `configs/policy.ts` uses. Every accessed member is read through a `safe()` guard that reports `absent` or `threw:<message>` instead of throwing.

## Run 1 — CLI, `--format json`

Workspace `<scratch>/ws/` with `.oxlintrc.json`:

```json
{
	"plugins": ["typescript"],
	"jsPlugins": [{ "name": "probe", "specifier": "../plugin.ts" }],
	"rules": { "probe/context-probe": "error" }
}
```

and `src/core/thing.ts` carrying the doc comment, the exported function, interface, type alias, enum, an `import type { Plugin } from 'vite'`, and a line comment.

Command, run from `<scratch>/ws/`:

```
node /home/user/scaffold/node_modules/oxlint/bin/oxlint --config .oxlintrc.json --format json .
```

`exit=1` (diagnostics reported at configured `error` severity). The `Program` diagnostic's message, split by field:

- `filename="/tmp/.../ws/src/core/thing.ts"` — the absolute path.
- `physicalFilename` — the same absolute path.
- `cwd="/tmp/.../ws"` — the workspace root oxlint ran from.
- `getFilename()` — a function is present and returns the same absolute path as `filename`.
- `contextKeys=["id","options","report"]` — `filename`, `physicalFilename`, `cwd`, `sourceCode`, and `getFilename` are not own-enumerable keys of `context`; they resolve as accessors or prototype members, not through `Object.keys`.
- `typeofSourceCode=object`, non-absent.
- `sourceCodeKeys` lists `text`, `hasBOM`, `ast`, `isESTree`, `scopeManager`, `visitorKeys`, `parserServices`, `lines`, `lineStartIndices`, `tokensAndComments`, `getText`, `getAncestors`, `getLines`, `getRange`, `getLoc`, `getNodeByRangeIndex`, `getLocFromIndex`, `getIndexFromLoc`, `getAllComments`, `getCommentsBefore`, `getCommentsAfter`, `getCommentsInside`, `commentsExistBetween`, `getJSDocComment`, `isGlobalReference`, `getDeclaredVariables`, `getScope`, `markVariableAsUsed`, `getTokens`, `getFirstToken`, `getFirstTokens`, `getLastToken`, `getLastTokens`, `getTokenBefore`, `getTokenOrCommentBefore`, `getTokensBefore`, `getTokenAfter`, `getTokenOrCommentAfter`, `getTokensAfter`, `getTokensBetween`, `getFirstTokenBetween`, `getFirstTokensBetween`, `getLastTokenBetween`, `getLastTokensBetween`, `getTokenByRangeStart`, `isSpaceBetween`, `isSpaceBetweenTokens`, `getDisableDirectives`.
- `sourceCodeTextLength=309` — the full source text length.
- `allComments=["* Greets. "," a line comment"]` — both the doc comment and the line comment, through `getAllComments()`.
- `astCommentsLength=2` — matches `getAllComments()`.
- `linesLength=20` — the line count.

`ExportNamedDeclaration` on the function: `exportKind="value"`, `declarationType="FunctionDeclaration"`, `range=[51,119]`, `locStart={"line":4,"column":0}`, `textSlice="export function greet(name: string): str"`. `jsDocComment` reports `threw:\`sourceCode.getJSDocComment\` is not supported at present (and deprecated)` — the member exists on `sourceCode` but throws when called. `commentsBefore=["* Greets. "]` — the doc comment is reachable through `getCommentsBefore(node)` instead.

`ExportNamedDeclaration` on the interface, type alias, and enum: `commentsBefore=[]` for each (none carry a doc comment in the fixture); `declarationType` reports `TSInterfaceDeclaration`, `TSTypeAliasDeclaration`, `TSEnumDeclaration` respectively, so a rule can discriminate a TypeScript-only declaration from `node.declaration.type` on the wrapping `ExportNamedDeclaration`.

`TSInterfaceDeclaration`, `TSTypeAliasDeclaration`, `TSEnumDeclaration` each fire their own visitor independently of `ExportNamedDeclaration`, each with `idName` set to `Shape`, `Mode`, `Level`.

`FunctionDeclaration` fires with `idName="greet"`, `paramTypes=["Identifier"]` (the parameter node's own `type`, not a type-annotation type; `param.typeAnnotation` was not probed separately), and `returnTypeType="TSStringKeyword"` — the `string` return annotation resolves to a real TypeScript AST node under `returnType.typeAnnotation.type`.

## Run 2 — CLI, `--format default`

Same command with `--format default` instead of `--format json`; `exit=1`. The default formatter renders the same message strings inside its span-diagram output (`Found 0 warnings and 10 errors`, `Finished in 149ms on 1 file with 70 rules using 4 threads`). No additional field is exposed beyond what `--format json` carries; the default format only changes presentation.

## Run 3 — a file-name-keyed rule

`PLACEMENT_PROBE_RULE` reports on `FunctionDeclaration` when `context.filename` ends with `types.ts`. `<scratch>/ws/src/core/types.ts` and `<scratch>/ws/src/core/helpers.ts` each declare the identical `export function greet(name: string): string { ... }`.

Command, run from `<scratch>/ws/`:

```
node /home/user/scaffold/node_modules/oxlint/bin/oxlint --config .oxlintrc2.json --format json src/core/types.ts src/core/helpers.ts
```

`exit=1`. Output carries one diagnostic, for `src/core/types.ts` alone: `placement rule fired for /tmp/.../ws/src/core/types.ts`. `src/core/helpers.ts` reports no diagnostic. `context.filename` in the CLI path distinguishes files by name reliably.

## Run 4 — `RuleTester`

`<scratch>/tester.test.mjs`, run as `node tester.test.mjs` (plain ECMAScript module; no `--experimental-strip-types` needed — the module imports `plugin.ts` directly and Node v22.22.2 ran the file unmodified). It imports `RuleTester` from `/home/user/scaffold/node_modules/oxlint/dist/plugins-dev.js`, assigns minimal `describe`/`it` functions that record and print, constructs `new RuleTester({ languageOptions: { parserOptions: { lang: 'ts' } } })`, and runs one `invalid` case with the fixture's function source, `filename: 'src/core/thing.ts'`, and `errors: [{}, {}]` (declared as two, on purpose, to make the mismatch print every reported diagnostic).

`exit=0` (the script itself does not throw; `it()` catches the tester's own assertion failure and records it). The test failed with `Should have 2 errors but had 3`, and the failure's dump is the useful measurement:

- `RuleTester` parses the TypeScript source. The `FunctionDeclaration`'s `returnTypeType` field reads `TSStringKeyword` in the dumped diagnostic, so `TSInterfaceDeclaration`, `TSTypeAliasDeclaration`, `TSEnumDeclaration`, and typed function nodes are reachable under `RuleTester` the same way as under the CLI.
- `RuleTester` does **not** honour the `filename` test-case field as a path relative to the caller's own working directory. The dumped `Program` message reports `filename="/home/user/scaffold/node_modules/oxlint/src/core/thing.ts"` and `cwd="/home/user/scaffold/node_modules/oxlint"` — the oxlint package's own installed directory, with the declared `filename` value appended as a suffix. `RuleTester` resolves a relative `filename` against its own internal base directory (inside the oxlint package), not against the caller's `cwd` or the test file's location.

## What the context exposes

| Member | Present or absent | Shape |
| --- | --- | --- |
| `context.filename` | present | string, absolute path under the CLI; under `RuleTester`, the declared `filename` resolved against the oxlint package's own directory rather than the caller's directory |
| `context.physicalFilename` | present | string, identical to `filename` in every run |
| `context.cwd` | present | string, the linted workspace root under the CLI; the oxlint package directory under `RuleTester` |
| `context.getFilename()` | present, callable | returns the same string as `context.filename` |
| `Object.keys(context)` | `["id", "options", "report"]` | `filename`, `physicalFilename`, `cwd`, `sourceCode`, `getFilename` exist and read correctly but are not own-enumerable keys |
| `typeof context.sourceCode` | `object` | non-absent |
| `Object.keys(context.sourceCode)` | listed under Run 1 | includes `text`, `getAllComments`, `getCommentsBefore`, `getJSDocComment`, `ast`, `lines` |
| `context.sourceCode.text.length` | present | number, `309` for the fixture |
| `context.sourceCode.getAllComments()` | present, callable | array of `{ value }`; captures both a doc comment and a line comment |
| `context.sourceCode.ast.comments.length` | present | number, matches `getAllComments()` |
| `context.sourceCode.lines.length` | present | number |
| `node.exportKind` (`ExportNamedDeclaration`) | present | `"value"` or `"type"` |
| `node.declaration.type` | present | `FunctionDeclaration`, `TSInterfaceDeclaration`, `TSTypeAliasDeclaration`, `TSEnumDeclaration`, `VariableDeclaration` |
| `node.range`, `node.loc.start` | present | array and object respectively |
| `context.sourceCode.getText(node)` | present, callable | string slice of source |
| `context.sourceCode.getJSDocComment(node)` | present as a member, throws when called | `sourceCode.getJSDocComment is not supported at present (and deprecated)` |
| `context.sourceCode.getCommentsBefore(node)` | present, callable | array of `{ value }`; the working path to a doc comment |
| `TSInterfaceDeclaration` / `TSTypeAliasDeclaration` / `TSEnumDeclaration` visitors | present, each fires independently | `node.id.name` gives the declared name |
| `FunctionDeclaration.params[].type` | present | the parameter node's own AST type (for example `Identifier`); no separate probe of `param.typeAnnotation` was run |
| `FunctionDeclaration.returnType.typeAnnotation.type` | present | a real TypeScript type-annotation node type (for example `TSStringKeyword`) |

## Answers

A placement rule keyed on the file name works from `context.filename` under the CLI: Run 3 shows one of two identically-shaped files firing and the other not. A doc-comment control is reachable, but only through `context.sourceCode.getCommentsBefore(node)`; `getJSDocComment` exists as a member and throws every time it is called, so a rule must not depend on it.

`RuleTester` parses TypeScript source correctly with `{ languageOptions: { parserOptions: { lang: 'ts' } } }` — every TypeScript-only node type probed (`TSInterfaceDeclaration`, `TSTypeAliasDeclaration`, `TSEnumDeclaration`, a typed `FunctionDeclaration`) resolves the same way it does under the CLI. `RuleTester` does not honour a test case's `filename` as a real workspace path: it resolves the value against the oxlint package's own installed directory rather than against the caller's `cwd`, so a `RuleTester`-driven test cannot exercise a placement rule that checks a filename against the caller's own workspace layout — only the literal string value of `filename` is available to the rule, not a path meaningful outside the oxlint package.

## Unknowns

Whether a `RuleTester` `filename` string without a leading path segment (for example bare `thing.ts`, or an absolute path) changes the resolution behavior was not probed; only `'src/core/thing.ts'` was tried. Whether `param.typeAnnotation.typeAnnotation.type` (the actual declared parameter type, as opposed to the parameter node's own AST type) is reachable was not probed directly; only `params.map((p) => p.type)` was measured, which reports the parameter node's own kind (`Identifier`) rather than its type annotation. Whether oxlint's `RuleTester` exposes a documented way to override its base directory for `filename` resolution was not read from source; the observation rests on the one dumped diagnostic message, not on the tester's own implementation.

## Retained files

`<scratch>/plugin.ts`, `<scratch>/ws/` (`.oxlintrc.json`, `.oxlintrc2.json`, `src/core/thing.ts`, `src/core/types.ts`, `src/core/helpers.ts`), `<scratch>/tester.test.mjs`, all under `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/m8m13/`. `report.md` could not be written to the scratch folder — the harness refuses a subagent report file — so this text is the full report; the Orchestrator should capture this response verbatim as `report.md` if the file is needed on disk.
