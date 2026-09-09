I'll read the carrier brief and the governing orchestration files first, then collect only the bounded read-only capability evidence it asks for.The carrier points at the capability brief. I'll read that next and stay inside its read-only bounds.The carrier overrides launch prep: I’ll answer the capability question from live package manifests and the local `guides.test.ts` host pieces. Next I’ll read the required rules, skill, and the test file.Next I’ll inspect the sibling Guide repo and the installed Guide, Test, Contract, and Scaffold declarations for those host pieces.Installed packages and the sibling Guide repo are in reach. I’ll read their manifests, exports, and the declarations that could cover those local host pieces.Guide’s `scripts/docs.ts` and `tests/guides.test.ts` look like the closest host shells. I’ll read those plus Contract, Test/server, and Scaffold environment declarations.**Local host and runner glue in `tests/guides.test.ts` is mostly uncovered by published Guide, Test/server, Contract, and Scaffold APIs.** Guide already covers pure inventory consumption, concept-index parsing, in-memory inspect/rewrite, and preformatted finding text. Test/server already covers reading named files and directories into that inventory. Contract covers the record guard used on `package.json`. Scaffold covers adding a published `server` source environment. Glob expansion, short-name pitch selection, stdout reporting, programmatic Vitest lifecycle, raise-without-lowering exit, and disk write-then-reread stay local.

Installed versions read on this checkout: Scaffold `C:/Users/mikes/WebstormProjects/scaffold/package.json` declares `@orkestrel/guide` `^0.0.17`, `@orkestrel/test` `^0.0.13`, `@orkestrel/contract` `^0.0.16`. Installed under that tree: Guide `0.0.18`, Test `0.0.14`, Contract `0.0.17`. Sibling Guide `C:/Users/mikes/WebstormProjects/guide/package.json` is also `0.0.18`.

## Capability table

| Host piece still local in `tests/guides.test.ts` | Declared/installed cover | Absent from those published surfaces |
| --- | --- | --- |
| Inventory reading | Test/server `readInventory(root, targets, options?)` reads named files and directories into `Record<path, text>` (`InventoryOptions`: `extensions`, `exclude`). Guide `Source` / `createParity` consume that record and do not touch disk. | No glob expander. Test/server `index.d.ts` has no `glob` member. Local `readWorkspaceInventory` still runs `globSync(['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'])` then passes the hits to `readInventory`. Guide `scripts/docs.ts` has a separate local glob+`readFileSync` helper; that file is not in Guide `exports`. |
| Manifest parsing | Guide `parseManifest(markdown, directory)` reads the `## By concept` table into `ManifestEntry` rows. Scaffold already calls it. | `parseManifest` does not read `package.json`. |
| Short-name / pitch selection | Guide `ParityPitch` is `{ readme, spec }` supplied by the caller. Contract `isRecord` narrows a parsed object. | No exported short-name reader and no `guides/${name}.md` selector. Local `readShortName` (`JSON.parse` + `isRecord` + slice after `/`) and `selectPitch` remain in the test file. Guide `scripts/docs.ts` duplicates a disk `readShortName`; not exported. |
| Finding rendering | Guide `ParityFinding` is `{ spec?, text }` with `text` already complete. `inspect()` and `rewrite().findings` emit those objects. `formatDrift` / `formatSide` / `identifyDrift` format `Drift`, not stdout. | No stdout/CLI reporter. Local `reportFindings` writes `${prefix}${finding.text}\n` and returns whether the list was non-empty. Drift `text` from `formatDrift` does not start with `spec`, so the local prefix adds it. |
| Vitest result / lifecycle | None on Guide, Test/server, Contract, or Scaffold published barrels. Test peers `vitest` `^4.1.11` and exports recorders, scratch, inventory, journeys — not a runner. | Local `runGuides` (`createVitest` from `vitest/node`, `start()`, `close()` in `finally`) and `matchesPassed` (`testModules` non-empty, no `unhandledErrors`, every `module.state() === 'passed'`). Sibling Guide `test:guides` is `vitest run --project guides`, not this programmatic trio. |
| Exit preservation | Scaffold `src/bin/main.ts` assigns `process.exitCode` from `CLI.execute`. `CLI` returns a code and does not assign one. `EXIT_CLEAN` / `EXIT_DRIFT` / `EXIT_USAGE` live in unpublished `src/bin/constants.ts`. | No exported raise-without-lowering helper. Local `raiseExit` only raises when the current numeric code is missing or lower. Guide `scripts/docs.ts` assigns `process.exitCode` directly. |
| Explicit rewrite / reread | Guide `Parity.rewrite(direction)` is in-memory, no disk: returns `{ changes: { path, content }[], findings }`. After mutating an in-memory map it constructs another `Parity` over that map. | No disk writer and no disk reread. Local `main` `writeFileSync`s each change, then `readWorkspaceInventory` again, re-parses, re-inspects, and re-`rewrite`s. Guide `scripts/docs.ts` writes and does not reread. Scaffold `src/server` inventory/rewrite is vendored-host / target materialization, not guides-parity. |

## Guide generated environments

Sibling Guide checkout generates only published **core**.

- `exports`: `.` → `dist/src/core`, plus `./package.json`. No `./server` or `./browser`.
- Scripts: `check:src:core`, `build:src:core`, `test:src:core`. No `check:src:server`.
- Configs present: `configs/src/vite.core.config.ts`, `configs/src/tsconfig.core.json`.
- No `src/server`, `src/browser`, or `app/` tree.
- Concept index source column is `src/core` only (`guides/README.md`).

Guide `files` is `dist/src` + `README.md`. `scripts/docs.ts` and `tests/guides.test.ts` stay in the checkout; they are not package exports.

## Scaffold way to add a server source environment

Put `'server'` on the blueprint `src` axis.

- `Environment` is `'core' | 'browser' | 'server'`.
- `createBlueprint(name, { src: ['core', 'server'] })` fills omitted fields; default `src` is `[]`.
- `SRC_MATRIX.server` plans `configs/src/vite.server.config.ts`, `configs/src/tsconfig.server.json`, Vitest project `src:server`, export subpath `./server`, formats `es` and `cjs`.
- `blueprintToSourceArtifacts` emits a birth `src/${environment}/index.ts` for each `blueprint.src` member.
- `srcToExports(['core', 'server'])` keys `.`, `./server`, `./package.json`.

That is the supported published-library path. `APP_MATRIX.server` is a separate private `app` axis (`app/server/main.ts`), not a published `src/server` face.

## Unknowns and execution limits

- Static reading only. No gates, no spawn, no install, no `createVitest` run, no glob-vs-directory probe of `readInventory`.
- Sibling Guide `package.json` at version `0.0.18` declares `@orkestrel/contract` `^0.0.16` and `@orkestrel/markdown` `^0.0.13`. Scaffold’s installed `@orkestrel/guide@0.0.18` `package.json` declares `@orkestrel/contract` `^0.0.17` and `@orkestrel/markdown` `^0.0.14`. Same version string, different ranges; installed Guide is a published `dist/` tree, not a link to the sibling `src/`.
- Test and Contract evidence is from installed declarations under the scaffold and Guide trees (`0.0.14` / `0.0.17`), not from those packages’ sibling source checkouts.
- `jsonShape` in Contract captures `JSON.parse` inside the shape DSL. No `parseJson` export was present on the installed Contract barrel.
- Whether `readInventory` would accept a glob string as a target was not executed; the declared contract is named files and walked directories.

## File:line evidence

**Local host pieces** (`C:/Users/mikes/WebstormProjects/scaffold/tests/guides.test.ts`)

- Inventory glob + `readInventory`: `31:34`
- Short-name from `package.json`: `36:48`
- Pitch spec `guides/${name}.md`: `51:57`
- Finding stdout: `75:82`
- Vitest pass predicate: `84:90`
- `createVitest` / `start` / `close`: `92:106`
- Raise-without-lowering: `108:113`
- Disk rewrite then reread: `149:176`
- Native vs Vitest branch: `464:473`
- Script: `package.json` `test:guides` → `node --experimental-strip-types tests/guides.test.ts`

**Guide published (installed `0.0.18` + sibling source)**

- I/O-free: `C:/Users/mikes/WebstormProjects/guide/src/core/sources/Source.ts:26:33`
- `parseManifest`: `C:/Users/mikes/WebstormProjects/guide/src/core/parsers.ts:30:75`
- `ParityFinding`: `C:/Users/mikes/WebstormProjects/guide/src/core/types.ts:176:181`
- `rewrite` without disk: `C:/Users/mikes/WebstormProjects/guide/src/core/types.ts:268:274`
- In-memory rewrite then in-memory re-inspect: `C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:123:159`
- Drift finding text is `formatDrift(drift)` without spec: `C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:432:436`
- `createParity`: `C:/Users/mikes/WebstormProjects/guide/src/core/factories.ts:117:119`
- Exports core only: `C:/Users/mikes/WebstormProjects/guide/package.json:31:43`
- Workspace seed (not exported): `C:/Users/mikes/WebstormProjects/guide/scripts/docs.ts:89:95` (local inventory), `103:116` (local short-name), `439:452` (write, no reread, direct `exitCode`)
- Guide’s own gate uses Test/server `readInventory` with directory targets, not globs: `C:/Users/mikes/WebstormProjects/guide/tests/guides.test.ts:30:36`

**Test/server (installed `0.0.14`)**

- `readInventory` / `InventoryOptions`: `C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/test/dist/src/server/index.d.ts:178:188` and `314:328`
- Exports `./`, `./browser`, `./server`; no Vitest runner symbol on those barrels
- Guide-installed Test is the same version `0.0.14`

**Contract (installed `0.0.17`)**

- `isRecord`: `C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/contract/dist/src/core/index.d.ts:3291`
- Used locally at `tests/guides.test.ts:45`

**Scaffold**

- `Environment`: `C:/Users/mikes/WebstormProjects/scaffold/src/core/types.ts:3:4`
- `ENVIRONMENTS` / `SRC_MATRIX.server`: `C:/Users/mikes/WebstormProjects/scaffold/src/core/constants.ts:13:13` and `59:67`
- `createBlueprint` default `src: []`, example `src: ['core', 'server']`: `C:/Users/mikes/WebstormProjects/scaffold/src/core/factories.ts:40:55`
- Source artifact per `src` environment: `C:/Users/mikes/WebstormProjects/scaffold/src/core/compilers.ts:1137:1147`
- `srcToExports(['core', 'server'])`: `C:/Users/mikes/WebstormProjects/scaffold/src/core/compilers.ts:156:160`
- Guide of that path: `C:/Users/mikes/WebstormProjects/scaffold/guides/scaffold.md:757:774`
- Bin exit assign (not a library export): `C:/Users/mikes/WebstormProjects/scaffold/src/bin/main.ts:12:14`
- `CLI` returns a code: `C:/Users/mikes/WebstormProjects/scaffold/src/bin/CLI.ts:117:120`
- Published exports: `.` (core) and `./server` (materializer/upstream), `C:/Users/mikes/WebstormProjects/scaffold/package.json:35:56` — no guides-command runner on either barrel
