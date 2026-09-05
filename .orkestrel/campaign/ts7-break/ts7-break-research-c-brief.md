# Unit ts7-break-research-c — the declaration build and the fence transpile without a 6.x or 5.x compiler of our own

`researcher` on Sonnet, a native Claude Code subagent with `WebFetch` and `WebSearch`. Perform the assignment directly and spawn nothing. Read-only. Primary sources first (the projects' GitHub repositories and changelogs, the registry API at `registry.npmjs.org`, the Node documentation), secondary sources named as such. Cite every fact with its URL. Today is 2026-09-05.

## Question

Scaffold's published environments roll their declarations into one `index.d.ts` through `vite-plugin-dts` 5.0.3 (`unplugin-dts` 1.0.3 or 1.1.0), which needs a compiler with `createProgram` (it falls back to `@typescript/typescript6` under 7) and hands the rollup to `@microsoft/api-extractor` 7.59.0, which bundles its own TypeScript 5.9.3. The fleet's test suites transpile TypeScript fences with the 6.x `transpileModule`. For a fleet on TypeScript 7 only, what emits and rolls up declarations, and what transpiles a fence?

## Rows

1. **`unplugin-dts` / `vite-plugin-dts`:** the latest versions on the registry today, whether any release or open pull request supports TypeScript 7 or `tsgo` (a `compiler`/`tsgo` option, a native-preview path), and what the maintainer has said.
2. **`@microsoft/api-extractor`:** the latest version and its bundled `typescript` pin today, any statement or issue on TypeScript 7 support, and whether it can consume declarations `tsc` 7 emitted (with the `typescriptCompilerFolder` left unset, its bundled 5.9.3 parses the `.d.ts` files) — is that a supported path, and does its bundled compiler count as a dependency of ours on a 5.x compiler?
3. **`rolldown-plugin-dts` and `tsdown`:** the latest versions, their `tsgo` support (the option name, what it requires — `@typescript/native-preview` or the `typescript` 7 package —, whether it bundles declarations from `tsgo`'s `--declaration` output or drives `tsgo` itself), whether they run inside Vite 8 (rolldown-based) as a plugin or only under `tsdown`, and what a rolled-up `index.d.ts` from them looks like against api-extractor's (re-exports, `declare module`, preserved TSDoc).
4. **`tsc` 7 declaration emit:** `--declaration --emitDeclarationOnly -p configs/src/tsconfig.core.json` under 7.0.2 — supported per the feature matrix, and any known differences in the emitted `.d.ts` (the "declaration emit differs greatly, intentionally" statement) that a consumer of the rolled-up file would see.
5. **Fence transpile:** `node:module`'s `stripTypeScriptTypes` in Node 22.22.2 — its stability index, the `mode: 'strip'` versus `'transform'` behaviour over an `enum`, a `namespace`, a parameter property, `import x = require()`, and `export =`, the `sourceMap`/`sourceUrl` options, and whether the output runs under `vm` and as an ESM data URL; plus `node --experimental-strip-types`/default type stripping in Node 22 for running a `.ts` fence directly.

## Output

`## Evidence` per row with citations; `## Distillate` naming the shortest bridge-free path for declarations and for fences; `## Unknowns`. No process diary. End with `Deviation: none` or the deviation.
