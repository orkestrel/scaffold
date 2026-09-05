I'll read the brief in full first, then follow it exactly and stay read-only.I’ll gather installed versions and primary sources in parallel, then fill the matrix from those citations.Web fetch was blocked, so I’ll record that and read installed packages plus the journal next. I’ll also try a read-only HTTP get to see if the CLI can reach the web at all.Web tools were rejected, so I’ll try a read-only HTTP get and mine installed packages for the facts the brief asks for.## Question

What do TSDoc, api-extractor and its doc model, TypeDoc, the TypeScript compiler API, oxlint (its jsdoc rules and its JS plugin API), oxfmt, and the llms.txt convention each provide for generating and checking documentation from source, at the versions this repository installs, and what do comparable ecosystems do to keep one source of truth?

## Evidence

1. **TSDoc** (`@microsoft/tsdoc` 0.16.0, transitive of `@microsoft/api-extractor`; not in root `package.json`; `@microsoft/tsdoc-config` 0.18.1 also transitive)
- Installed version and homepage: `node_modules/@microsoft/tsdoc/package.json:2` `"version": "0.16.0"` and `:19` `"homepage": "https://tsdoc.org/"`.
- Parser purpose: `node_modules/@microsoft/tsdoc/README.md:11` `This library is the reference implementation of a parser for the TSDoc syntax.`
- Standard tag syntax kinds: `node_modules/@microsoft/tsdoc/lib/configuration/TSDocTagDefinition.d.ts:7-18` `InlineTag` / `BlockTag` / `ModifierTag`.
- Block tags in `StandardTags`: `@decorator`, `@defaultValue`, `@deprecated`, `@example`, `@param`, `@privateRemarks`, `@remarks`, `@returns`, `@see`, `@throws`, `@typeParam`, `@jsx`, `@jsxRuntime`, `@jsxFrag`, `@jsxImportSource` (`node_modules/@microsoft/tsdoc/lib/details/StandardTags.js`).
- Modifier tags: `@alpha`, `@beta`, `@eventProperty`, `@experimental`, `@internal`, `@override`, `@packageDocumentation`, `@public`, `@readonly`, `@sealed`, `@virtual` (same file).
- Inline tags: `{@inheritDoc}`, `{@label}`, `{@link}` (`StandardTags.js:169-220`).
- `@remarks`: `StandardTags.d.ts:230-235` `The @remarks block tag ends the summary section, and begins the remarks section`.
- `@example`: `StandardTags.d.ts:88-89` `Indicates a documentation section that should be presented as an example` / `illustrating how to use the API.`
- `@param`: `StandardTags.d.ts:190-192` `Used to document a function parameter.` / `The @param tag is followed by a parameter name, followed by a hyphen`.
- `@returns`: `StandardTags.d.ts:241` `Used to document the return value for a function.`
- `@throws`: `StandardTags.d.ts:301` `Used to document an exception type that may be thrown by a function or property.`
- `@see`: `StandardTags.d.ts:260` `Used to build a list of references to an API item or other resource`.
- `@defaultValue`: `StandardTags.d.ts:59-60` `This block tag is used to document the default value for a field or property`.
- `@typeParam`: `StandardTags.d.ts:333-334` `Used to document a generic parameter.` / `The @typeParam tag is followed by a parameter name, followed by a hyphen`.
- `@packageDocumentation`: `StandardTags.d.ts:180-181` `Used to indicate a doc comment that describes an entire NPM package`.
- `@privateRemarks`: `StandardTags.d.ts:198-200` `A tool must omit this entire section from the API reference web site,` / `generated *.d.ts file`.
- `{@label}`: `StandardTags.d.ts:144` `The {@label} inline tag is used to label a declaration`.
- `{@link}`: `StandardTags.d.ts:155-156` `The {@link} inline tag is used to create hyperlinks to other pages`.
- `{@inheritDoc}`: `StandardTags.d.ts:107-108` `used to automatically generate an API item's documentation by` / `copying it from another API item.`
- `tsdoc.json`: `node_modules/@microsoft/tsdoc-config/README.md:16` `it is expected to be found in the same folder as` / `the **tsconfig.json** file`; schema `node_modules/@microsoft/tsdoc/schemas/tsdoc.schema.json:24-29` `tagDefinitions` / `Additional tags to support when parsing documentation comments with TSDoc.`; custom tag fields `tagName`, `syntaxKind` (`inline` | `block` | `modifier`), `allowMultiple` (`tsdoc.schema.json:64-75`).
- `TSDocParser.parseString`: `node_modules/@microsoft/tsdoc/lib/parser/TSDocParser.d.ts:13` `parseString(text: string): ParserContext`; `ParserContext.docComment` is `readonly docComment: DocComment` (`ParserContext.d.ts:35`).
- `DocComment` is the node-tree root: `DocComment.d.ts:14` `This is the root of the DocNode tree.`
- Markdown render: emitters are `PlainTextEmitter` (`PlainTextEmitter.d.ts:3` `Renders a DocNode tree as plain text`) and `TSDocEmitter` / `emitAsTsdoc()` (`DocComment.d.ts:107` `Generates a doc comment corresponding to the DocComment tree`). `DocNodeTransforms.d.ts:11-12` mentions emitting Markdown as a consumer concern, not a renderer in this package.
- `eslint-plugin-tsdoc`: not installed. Only named as a consumer in `node_modules/@microsoft/tsdoc/CHANGELOG.md:131` `which were breaking eslint-plugin-tsdoc`. What that rule checks was not in this tree.

2. **api-extractor and its doc model** (`@microsoft/api-extractor` 7.59.0; `@microsoft/api-extractor-model` 7.33.11; `@microsoft/api-documenter` not installed; `vite-plugin-dts` 5.0.3 / `unplugin-dts` 1.0.3)
- Installed version: `node_modules/@microsoft/api-extractor/package.json:3` `"version": "7.59.0"`; homepage `:30` `"homepage": "https://api-extractor.com"`.
- Purpose: `README.md:31-32` `Generate *.d.ts rollups with trimming according to release type` / `Output API documentation in a portable format`.
- `docModel.enabled`: `IConfigFile.d.ts:177-181` `export interface IConfigDocModel` / `enabled: boolean`; template `api-extractor-template.json:217-221` `"docModel": {` / `"enabled": true`.
- Default `.api.json` path: `api-extractor-defaults.json:25-27` `"docModel": {` / `"apiJsonFilePath": "<projectFolder>/temp/<unscopedPackageName>.api.json"`.
- Other doc-model keys: `apiJsonFilePath`, `includeForgottenExports`, `projectFolderUrl`, `releaseTagsToTrim` (`IConfigFile.d.ts:189-218`).
- `@microsoft/api-extractor-model` 7.33.11: `package.json:3-4` `"version": "7.33.11"` / `"A helper library for loading and saving the .api.json files"`. Load API: `README.md:15-18` `const apiPackage: ApiPackage = apiModel.loadPackage('example.api.json');`. TSDoc on items: `ApiDocumentedItem.d.ts:12` `docComment: string;` and `:28` `get tsdocComment(): tsdoc.DocComment | undefined`.
- API report is Markdown: `api-extractor-defaults.json:19` `"reportFileName": "<unscopedPackageName>.api.md"`.
- `@microsoft/api-documenter`: not in `node_modules`. Model README `README.md:58-59` points at it as `a complete project that uses these APIs to generate an API reference web site`. Per-symbol Markdown layout and whether that layout is configurable were not in this tree.
- `vite-plugin-dts` does not expose `rollupTypes`. It uses `bundleTypes`: `node_modules/vite-plugin-dts/README.md:46` `You just need to install @microsoft/api-extractor and set bundleTypes: true`.
- `unplugin-dts` 1.0.3 option: `unplugin-dts.PNIpryzr.d.ts:266-272` `Rollup type declaration files after emitting them.` / `Powered by @microsoft/api-extractor`; `bundleTypes?: boolean | {`.
- Invoke path: `unplugin-dts.BU1tibsL.mjs:525` `const { Extractor, ExtractorConfig } = await import('@microsoft/api-extractor');` then `:549-554` `docModel: { enabled: false }` / `dtsRollup: { enabled: true, publicTrimmedFilePath: ... }` then `:584` `return Extractor.invoke(config, {`.
- TSDoc in rolled-up `.d.ts`: `DtsRollupGenerator.js:62-65` writes `collector.workingPackage.tsdocParserContext.sourceRange.toString()`; `:285-294` injects `declarationMetadata.tsdocParserContext.sourceRange.toString()` as the comment prefix. `@privateRemarks` is specified to be omitted from generated `.d.ts` (`StandardTags.d.ts:198-200`). Trimming comments are separate: `IConfigFile.d.ts:279-282` `omitTrimmingComments`.

3. **TypeDoc**
- Not installed under `node_modules/`. `typedoc.org` was not fetched. `--json`, `typedoc-plugin-markdown`, custom themes, extra tags, license, and dependency surface were not read from a primary source.

4. **TypeScript compiler API** (`typescript` 6.0.3)
- Installed version: `node_modules/typescript/package.json:5` `"version": "6.0.3"`.
- `ts.getJSDocTags`: `typescript.d.ts:8750` `function getJSDocTags(node: Node): readonly JSDocTag[];`
- `ts.getJSDocCommentsAndTags`: `typescript.d.ts:8889` `function getJSDocCommentsAndTags(hostNode: Node): readonly (JSDoc | JSDocTag)[];`
- `Symbol.getDocumentationComment`: `typescript.d.ts:6548` `getDocumentationComment(typeChecker: TypeChecker | undefined): SymbolDisplayPart[];`
- `Symbol.getJsDocTags`: `typescript.d.ts:6549` `getJsDocTags(checker?: TypeChecker): JSDocTagInfo[];`
- `Signature.getDocumentationComment` / `getJsDocTags`: `typescript.d.ts:6864-6865` same shapes (`getJsDocTags(): JSDocTagInfo[]` with no checker argument).
- `ts.displayPartsToString`: `typescript.d.ts:11426` `function displayPartsToString(displayParts: SymbolDisplayPart[] | undefined): string;`
- `JSDocTagInfo`: `typescript.d.ts:10798-10799` `name: string;` / `text?: SymbolDisplayPart[];`
- Declaration emit vs JSDoc: `CompilerOptions.removeComments?: boolean` at `typescript.d.ts:7103`; `PrinterOptions.removeComments?: boolean` at `:8180`; `stripInternal?: boolean` at `:7119`. The installed `.d.ts` does not state that `tsc --declaration` copies JSDoc into `.d.ts` when `removeComments` is omitted. TypeScript handbook / repository docs were not fetched.

5. **oxlint** (`oxlint` 1.80.0)
- Installed version: `node_modules/oxlint/package.json:3` `"version": "1.80.0"`; docs URL `:13` `"homepage": "https://oxc.rs/docs/guide/usage/linter"`.
- jsdoc rules present in `configuration_schema.json`: `jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-blank-blocks`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-throws-description`, `jsdoc/require-throws-type`, `jsdoc/require-yields`, `jsdoc/require-yields-description`, `jsdoc/require-yields-type` (`configuration_schema.json:3532-3751`).
- Named checks from the brief: `require-param`, `require-returns`, `check-tag-names`, `require-property`, `no-defaults` exist. `jsdoc/check-param-names` has no entry in that schema (adjacent names are `check-property-names` and `require-param-name`).
- `definePlugin` / `defineRule`: no matches in `node_modules/oxlint/`. Public JS export is `defineConfig` (`dist/index.d.ts:7014-7016`). Plugins load as default export: `dist/lint.js:17819` `let plugin = (await import(url)).default`; `registerPlugin` reads `plugin.rules` and `plugin.meta.name` (`lint.js:17838-17840`).
- Rule `create(context)`: `plugins-dev.d.ts:4005` `create: (context: Context) => VisitorObject`.
- `context.report`: `plugins-dev.d.ts:3835` `report(this: void, diagnostic: Diagnostic): void;`
- `context.sourceCode`: `plugins-dev.d.ts:3481` `readonly sourceCode: Readonly<{`.
- Comment text: `CommentType.value: string` (`plugins-dev.d.ts:1315-1318`); `getAllComments(): CommentType[]` (`:2697`); `getCommentsBefore` (`:2715`); also `getCommentsAfter`, `getCommentsInside`, `getJSDocComment` (`:2740-2756`).
- JS plugin languages: `plugins-dev.d.ts:4129` `type Language = "js" | "jsx" | "ts" | "tsx" | "dts";` — Markdown is not in that union.
- Stability: `configuration_schema.json:59-60` `JS plugins, allows usage of ESLint plugins with Oxlint.` and `Note: JS plugins are in alpha and not subject to semver.`

6. **oxfmt** (`oxfmt` 0.65.0)
- Installed version: `node_modules/oxfmt/package.json:3` `"version": "0.65.0"`; docs URL `:13` `"homepage": "https://oxc.rs/docs/guide/usage/formatter"`.
- Languages named on option descriptions in `configuration_schema.json`: JavaScript/JSX/TypeScript/TSX; JSON/JSONC/JSON5; YAML; CSS/Less/SCSS; HTML/Vue/Angular/Handlebars/MJML; GraphQL; TOML; Markdown/MDX; Svelte (optional). Embedded fences: `embeddedLanguageFormatting` `:26-27` `Control whether to format embedded parts` / `Languages: JS, JSX, TS, TSX, HTML, Vue, Angular, Svelte, Markdown, MDX`.
- JSDoc formatting: `configuration_schema.json:75-76` `Enable JSDoc comment formatting.` / `When enabled, JSDoc comments are normalized and reformatted:` — default Disabled; languages JS, JSX, TS, TSX. Comment bodies other than JSDoc are not given a dedicated key.
- Config keys on `Oxfmtrc.properties`: `arrowParens`, `bracketSameLine`, `bracketSpacing`, `embeddedLanguageFormatting`, `endOfLine`, `experimentalOperatorPosition`, `htmlWhitespaceSensitivity`, `ignorePatterns`, `insertFinalNewline`, `jsdoc`, `jsxSingleQuote`, `objectWrap`, `overrides`, `printWidth`, `proseWrap`, `quoteProps`, `semi`, `singleAttributePerLine`, `singleQuote`, `sortImports`, `sortPackageJson`, `sortTailwindcss`, `svelte`, `tabWidth`, `trailingComma`, `useTabs`, `vueIndentScriptAndStyle` (`configuration_schema.json:6-207`).
- Ignore: `ignorePatterns` uses gitignore-style globs (`:62-63`). No `prettierignore` / `.prettierignore` key in `node_modules/oxfmt/`.

7. **llms.txt and agent-facing documentation**
- `llmstxt.org` was not fetched. Proposed format, `llms-full.txt`, and adopters were not read from a primary source.
- Model Context Protocol docs were not fetched. Whether MCP defines a documentation-resource convention for tools was not read from a primary source.

8. **Single-source precedents**
- Rust `rustdoc` / doc-tests, Go `go doc` / `Example`, Python docstrings / Sphinx autodoc / doctest, Elixir ExDoc / doctests, Deno/JSR `deno doc`, and Java Javadoc primary-source URLs were not fetched. Those packages are not in this `node_modules`.

9. **Prose linting tools**
- Vale (vale.sh), `textlint`, and `markdownlint` primary sources were not fetched. None are installed under `node_modules/`. Runtime and whether they can read TypeScript comment text were not verified here.

10. **Markdown from data in JavaScript without new dependencies**
- `nodejs.org` documentation was not fetched. Installed Node type declarations (`@types/node`) list core modules from `assert` through `zlib` in `node_modules/@types/node/index.d.ts:36-116` with no `markdown` module. That is the installed stand-in for “no built-in Markdown renderer.”

## Distillate

| tool | parses TSDoc | generates Markdown | lints prose | formats Markdown | runs examples | new dependency | installed version |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `@microsoft/tsdoc` | yes (parser + DocComment tree) | no (plain text / TSDoc emit only) | no | no | no | transitive of api-extractor | 0.16.0 |
| `@microsoft/tsdoc-config` | configures tags for the parser | no | no | no | no | transitive | 0.18.1 |
| `@microsoft/api-extractor` | yes (feeds the doc model and rollup comments) | API report `.api.md`; not a guide generator | no | no | no | already declared | 7.59.0 |
| `@microsoft/api-extractor-model` | yes (`tsdocComment` on items) | no (loads `.api.json`) | no | no | no | transitive of api-extractor | 7.33.11 |
| `@microsoft/api-documenter` | unreached | unreached | no | unreached | unreached | not installed | not installed |
| `vite-plugin-dts` / `unplugin-dts` | via api-extractor when `bundleTypes` | no | no | no | no | already declared (`vite-plugin-dts`) | 5.0.3 / 1.0.3 |
| TypeDoc | unreached | unreached | unreached | unreached | unreached | not installed | not installed |
| TypeScript compiler API | JSDoc APIs, not the TSDoc parser | no | no | no | no | already declared | 6.0.3 |
| oxlint | jsdoc plugin (JSDoc-oriented rules) | no | JSDoc structure rules, not banned-word prose | no | no | already declared | 1.80.0 |
| oxfmt | no | no | no | yes (Markdown/MDX named on options) | no | already declared | 0.65.0 |
| llms.txt | unreached | unreached | unreached | unreached | unreached | not installed | not installed |
| Vale | unreached | unreached | unreached | unreached | unreached | not installed | not installed |
| textlint | unreached | unreached | unreached | unreached | unreached | not installed | not installed |
| markdownlint | unreached | unreached | unreached | unreached | unreached | not installed | not installed |
| rustdoc / go doc / Sphinx / ExDoc / deno doc / Javadoc | unreached | unreached | unreached | unreached | unreached | not installed | not installed |

Precedent rows were not reached on the web and are not in this install, so no shared-pattern claims from primary sources are stated.

## Unknowns

- Web reach: first URL fetched was `https://tsdoc.org/` via WebFetch; the harness returned `User Rejected` and no body. WebSearch for oxlint jsdoc rules was likewise `User Rejected`. Installed packages under `/home/user/scaffold/node_modules/` were readable.
- Row 1: tsdoc.org pages not read; `eslint-plugin-tsdoc` behavior not in tree. Used `node_modules/@microsoft/tsdoc` and `node_modules/@microsoft/tsdoc-config`.
- Row 2: api-extractor.com pages not read; `@microsoft/api-documenter` not installed, so Markdown-per-symbol layout and configurability unverified. Used `node_modules/@microsoft/api-extractor`, `api-extractor-model`, `vite-plugin-dts`, `unplugin-dts`.
- Row 3: TypeDoc — web not reached, not installed.
- Row 4: TypeScript handbook / repository docs not reached. Signatures from `node_modules/typescript/lib/typescript.d.ts`. Whether `tsc --declaration` preserves JSDoc by default remains unverified in those typings.
- Row 5: oxc.rs linter docs not reached. Used `node_modules/oxlint`.
- Row 6: oxc.rs formatter docs not reached. Used `node_modules/oxfmt`.
- Row 7: llmstxt.org and MCP docs not reached.
- Row 8: rustdoc, go doc, Sphinx, ExDoc, deno doc, Javadoc primary sources not reached.
- Row 9: vale.sh, textlint, markdownlint primary sources not reached.
- Row 10: Node.js documentation site not reached; used `@types/node` module list as the installed stand-in.

## Journal

`/home/user/scaffold/tmp/cursor/docs-research.jsonl`  
session id: `43b1dc08-413c-41f2-ab96-6a65e288c597`

## Deviation

none