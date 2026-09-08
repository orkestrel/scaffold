# Brief — ts6-m8m13 (the oxlint JS plugin context and `RuleTester` over TypeScript source)

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Scratch folder: `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/m8m13/` (create it). Read `/home/user/scaffold/tmp/units/ts6-common-host.md` first and follow it.

## Objective

Measure what the installed oxlint 1.80.0 gives a JavaScript plugin rule: whether the rule sees the linted file's path, the source text, the comments, and TypeScript-only nodes; and whether `RuleTester` from `oxlint/plugins-dev` parses TypeScript source and passes a filename. The plan moves placement rules keyed on the file name, and a doc-comment control, into `configs/policy.ts`; this measurement decides whether that home works.

## Read first

`/home/user/scaffold/node_modules/oxlint/package.json` (the `bin` and `exports` fields), `/home/user/scaffold/node_modules/oxlint/dist/index.d.ts`, `/home/user/scaffold/node_modules/oxlint/dist/plugins-dev.d.ts`, `/home/user/scaffold/configs/policy.ts` (the vendored plugin: its `PolicyContext` interface names `report` alone today), `/home/user/scaffold/tests/config.test.ts:700-800` (the `RuleTester` usage with `languageOptions: { parserOptions: { lang: 'ts' } }`), and `/home/user/scaffold/.oxlintrc.json` (`jsPlugins`, and how `policy/*` rules are enabled per `files` glob).

## Instrument

Write `<scratch>/plugin.ts` (a plugin in the shape `configs/policy.ts` uses, loaded by oxlint directly as TypeScript) with a rule `context-probe` that reports, as message text, everything a placement rule or a doc-comment control needs, each guarded so a missing member reports `absent` rather than throwing: on `Program`: `context.filename`, `context.physicalFilename`, `context.cwd`, the result of `context.getFilename?.()`, `Object.keys(context)`, `typeof context.sourceCode`, `Object.keys(context.sourceCode ?? {})`, `context.sourceCode?.text?.length`, `context.sourceCode?.getAllComments?.()?.map((c) => c.value)`, `context.sourceCode?.ast?.comments?.length`, `context.sourceCode?.lines?.length`; on `ExportNamedDeclaration`: `node.exportKind`, `node.declaration?.type`, `node.range`, `node.loc?.start`, `context.sourceCode?.getText?.(node)?.slice(0, 40)`, and the doc comment attached to the node through `context.sourceCode?.getJSDocComment?.(node)?.value` and through `getCommentsBefore?.(node)`; on `TSInterfaceDeclaration`, `TSTypeAliasDeclaration`, `TSEnumDeclaration`, and `FunctionDeclaration`: the node type and `node.id?.name`, and for the function its `params.map((p) => p.type)` and `returnType?.typeAnnotation?.type`.

## Runs

1. **The CLI.** A scratch workspace `<scratch>/ws/` with `.oxlintrc.json` (`jsPlugins: [{ name: 'probe', specifier: '../plugin.ts' }]`, `rules: { 'probe/context-probe': 'error' }`, `plugins: ['typescript']`) and `src/core/thing.ts` containing: a `/** Greets. */` doc comment above `export function greet(name: string): string`, `export interface Shape { readonly size: number }`, `export type Mode = 'fast' | 'slow'`, `export enum Level { Low = 1 }`, `import type { Plugin } from 'vite'`, and a line comment. Run `node <oxlint bin> --config .oxlintrc.json --format json .` from `ws/` and keep the JSON; then run the same with `--format default`.
2. **`RuleTester`.** `<scratch>/tester.test.mjs` (or `.ts` run through `node --experimental-strip-types`, whichever the tester needs; record which) that imports `RuleTester` from `/home/user/scaffold/node_modules/oxlint/dist/plugins-dev.js` and the plugin, constructs it with `{ languageOptions: { parserOptions: { lang: 'ts' } } }`, and runs one `invalid` case with the same source, `filename: 'src/core/thing.ts'`, and `errors` left permissive so the messages print; capture what the tester reports and whether it accepts `filename`. If the tester needs a test framework (`describe`/`it` assignment as `tests/config.test.ts` does), supply minimal functions that print.
3. **A file-name-keyed rule.** Add a second rule `placement-probe` that reports when `context.filename` ends with `types.ts` and the node is a `FunctionDeclaration`; run the CLI over `src/core/types.ts` (a function inside) and `src/core/helpers.ts` (the same function) and show one reports and the other does not.

## Output

`report.md` with each run's exact command and output, a table of what the context exposes (member → present or absent, with the value's shape), the answer to whether `RuleTester` parses TypeScript and honours `filename`, whether a doc comment is reachable from a rule and by which member, and `Unknowns`. Retain `plugin.ts`, `ws/`, and `tester.test.mjs`.
