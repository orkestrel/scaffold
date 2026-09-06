# Brief — ts6-dts-research

## Role and engine

`researcher`, Sonnet, a native Claude Code subagent with web fetch and search (the Cursor bench's web tools are refused in this container, so this row runs on the native lane; the ladder step is recorded). Read-only in every checkout. Perform the assignment directly and spawn nothing.

## Objective

Answer, from primary sources with citations (URL and the date you read it), whether the fleet can keep one declaration file per published face in `dist/` without any use of the in-process `typescript` JavaScript API, and which of the candidate chains does it: the installed `vite-plugin-dts`, a `tsc --declaration --emitDeclarationOnly` emit rolled up by `@microsoft/api-extractor`, or `rolldown-plugin-dts`. The owner keeps `typescript` at 6.0.3 today and wants the later move to 7 to be one range change; a chain that calls `createProgram` or any other in-process compiler API on TypeScript 7 breaks, because 7 ships no JavaScript API.

## Context

Installed: `vite-plugin-dts` 5.0.3 in `/home/user/scaffold`, 5.1.0 in `/home/user/fleet/console`; `unplugin-dts` 1.0.3; `@microsoft/api-extractor` 7.59.0 (read its `package.json` `dependencies.typescript`); `vite` 8.2.2; `typescript` 6.0.3. The consumers: `/home/user/scaffold/configs/src/vite.core.config.ts` and `vite.server.config.ts` (read them). A parallel Grok lane reads the installed code; you read upstream.

## Questions

1. `vite-plugin-dts` and `unplugin-dts` upstream (qmhc/vite-plugin-dts, unplugin/unplugin-dts on GitHub; the npm registry pages): the releases after 5.1.0 and 1.0.3, whether any release or open pull request supports TypeScript 7, `tsgo`, or `@typescript/native-preview`, and what the maintainers say about TypeScript 7 in issues. Quote the issue titles and dates.
2. `@microsoft/api-extractor` upstream (microsoft/rushstack): the TypeScript version it bundles at 7.59.x and the support statement for `.d.ts` input emitted by a newer compiler; any issue about reading TypeScript 6.x emit; any issue or plan about `tsgo` or TypeScript 7; the documented semantics of `typescriptCompilerFolder`, `bundledPackages`, `projectFolder`, and `dtsRollup`; the rule that decides `import type` versus `import` in a rollup.
3. TypeScript 6.0 release notes: whether declaration emit syntax changed from 5.9 in any way a 5.9 parser rejects; TypeScript 7.0 release notes: whether `tsc --declaration --emitDeclarationOnly` is supported by the native compiler and whether the package ships `lib.*.d.ts` files.
4. `rolldown-plugin-dts` (sxzz/rolldown-plugin-dts): its modes (`tsc`, `oxc` isolated declarations, `tsgo`), whether it can take pre-emitted `.d.ts` files and bundle them into one file, its dependencies (does it need `typescript` in-process in its default mode), its Vite 8 compatibility, and whether Vite 8's `build.lib` has any declaration option of its own.
5. `dts-bundle-generator`, `tsup`, and `tsdown` as bundlers of an existing `.d.ts` tree: one row each with the in-process dependency named; these need an owner's request to adopt, so rule them as alternatives only.

## Output

A capability matrix with rows: single file per face; runs on TypeScript 6.0.3 today; runs unchanged on TypeScript 7 (no in-process API); keeps a relative core import external on a server or browser face; supports a post-write rewrite; dependency footprint; and columns: `vite-plugin-dts` 5.1.0, `tsc` emit + `api-extractor` 7.59.0, `rolldown-plugin-dts`, `dts-bundle-generator`/`tsup`/`tsdown`. Then a one-paragraph ruling with the evidence, the open questions the Orchestrator must measure locally, and a citation list. Name a fetch that failed with its error and move on.
