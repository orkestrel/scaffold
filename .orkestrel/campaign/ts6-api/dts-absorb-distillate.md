<!-- Grok (Cursor, cursor-grok-4.6-high), session 383ac720-9d19-4b72-9a0b-e7a9e5f09580, journal tmp/cursor/ts6-dts-absorb.jsonl, 2026-09-06 01:11:23 to 01:19:40 UTC, exit 0 -->

I'll read the brief in full first, then follow it exactly as a read-only pass.The brief is a read-only absorption pass. I'll locate every named package and consumer file, then read them at the pointers given.`vite-plugin-dts` is a thin wrapper; the real emit/rollup lives in `unplugin-dts`. I’ll search those `dist/` files and the api-extractor sources next.I'll read the emit, rollup, and TypeScript-loading sections in `unplugin-dts`, then the api-extractor files the brief names.## Emit path

`vite-plugin-dts` 5.0.3 is a re-export of `unplugin-dts/vite`. The emit engine is `unplugin-dts` 1.0.3.

```8:9:/home/user/scaffold/node_modules/vite-plugin-dts/dist/index.mjs
export { default } from 'unplugin-dts/vite';
export { editSourceMapDir } from 'unplugin-dts';
```

The compiler object is the workspace `typescript` loaded with `createRequire` from the plugin file. If that package has no `createProgram` (TypeScript 7+), it falls back to `@typescript/typescript6`. There is no bundled compiler in the plugin. Scaffold's workspace package is `typescript` 6.0.3.

```32:51:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
	function loadTs() {
	  try {
	    const ts = require_("typescript");
	    if (typeof ts.createProgram === "function") {
	      return ts;
	    }
	  } catch {
	  }
	  try {
	    const ts = require_("@typescript/typescript6");
	    if (typeof ts.createProgram === "function") {
	      return ts;
	    }
	  } catch {
	  }
	  throw new Error(
	    '[unplugin-dts] The installed "typescript" package does not provide the JavaScript Compiler API ...
```

There is no language service. The `ts` processor is `ts.createProgram`. The `vue` processor wraps that with `@volar/typescript` `proxyCreateProgram` and `@vue/language-core` (in-process; not the `vue-tsc` CLI).

```21:25:/home/user/scaffold/node_modules/unplugin-dts/dist/chunks/ts.mjs
function createParsedCommandLine(_ts, host, configPath) {
  const config = ts.readJsonConfigFile(configPath, host.readFile);
  return ts.parseJsonSourceFileConfigFileContent(config, host, dirname(configPath), {}, configPath);
}
const createProgram = ts.createProgram;
```

```45:55:/home/user/scaffold/node_modules/unplugin-dts/dist/chunks/vue.mjs
const createProgram = proxyCreateProgram(ts, ts.createProgram, (ts2, options) => {
  const { configFilePath } = options.options;
  const vueOptions = typeof configFilePath === "string" ? createParsedCommandLine(ts2, ts2.sys, slash(configFilePath)).vueOptions : getDefaultCompilerOptions();
  const vueLanguagePlugin = createVueLanguagePlugin(
    ts2, options.options, vueOptions, (id) => id
  );
  return { languagePlugins: [vueLanguagePlugin] };
});
```

Source files are selected by `tsconfigPath` (else `ts.findConfigFile`). `include` / `exclude` come from plugin options if set, else the tsconfig `include`/`files`/`exclude` (default include `**/*`, default exclude `node_modules/**`). Vite `lib.entry` values are always added. A `@rollup/pluginutils` filter then drops anything outside those globs. Scaffold faces pass an explicit tsconfig and do not pass `include`.

```1079:1138:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
    const configPath = tsconfigPath ? ensureAbsolute(tsconfigPath, root) : ts.findConfigFile(root, ts.sys.fileExists);
    const content = configPath ? createParsedCommandLine(ts, ts.sys, configPath) : void 0;
    ...
    const include = computeGlobs(
      options.include,
      [...ensureArray(content?.raw.include ?? []), ...ensureArray(content?.raw.files ?? [])],
      "**/*"
    );
    ...
    const rootNames = [
      ...new Set(
        Object.values(entries).map((entry) => ensureAbsolute(entry, root)).concat(content?.fileNames.filter(filter) || []).map(normalizePath)
      )
    ];
```

The program is forced to declaration emit in memory: `declaration: true`, `emitDeclarationOnly: true`, `outDir: "."`, `declarationDir: "."`. `program.emit(..., writeFile, undefined, true)` writes into an `outputFiles` map, not onto disk. Disk writes happen later under Vite `build.outDir` (plugin `outDirs`, defaulting to that).

```1004:1012:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
const fixedCompilerOptions = {
  noEmit: false,
  declaration: true,
  emitDeclarationOnly: true,
  ...
  outDir: ".",
  declarationDir: "."
};
```

```1264:1270:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
        const { emitSkipped, diagnostics } = this.program.emit(
          sourceFile,
          (name, text) => {
            outputFiles.set(
              resolve(publicRoot, relative(outDir, ensureAbsolute(name, outDir))),
              text
            );
```

Layout: `publicRoot` is `compilerOptions.rootDir` when set (scaffold sets it). Otherwise composite uses the tsconfig directory; TypeScript ≥ 6 with no `rootDir` uses the tsconfig directory; else the common directory of emittable files (`queryPublicPath`). `entryRoot` defaults to `publicRoot` (or that common directory under the TS 6 implicit-rootDir branch). Each memory path is rewritten as `resolve(outDir, relative(entryRoot, filePath))`.

```1155:1160:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
    const sourcePublicPath = queryPublicPath(emittableSourceFiles);
    const useTs6ImplicitRootDir = !compilerOptions.rootDir && !(compilerOptions.composite && compilerOptions.configFilePath) && compare(ts.version, "6.0.0", ">=") && !!configPath;
    let publicRoot = compilerOptions.rootDir ? ensureAbsolute(resolveConfigDir(compilerOptions.rootDir, root), root) : ...
    let entryRoot = options.entryRoot || (useTs6ImplicitRootDir ? sourcePublicPath || publicRoot : publicRoot);
```

Server tsconfig `include` is only `src/server/**`. Core is not a root file, so `program.emit` is never asked for `src/core`. Core `.d.ts` is not produced in the server outDir.

```8:17:/home/user/scaffold/configs/src/tsconfig.server.json
		"rootDir": "../../src",
		"outDir": "../../dist/src"
	},
	"include": [
		"../../src/server/**/*.cts",
		...
	]
```

## Rollup configuration

`bundleTypes: true` and `bundleTypes: { ... }` share one builder, `bundleDtsFiles`. A boolean supplies empty `extractorConfig` / `bundledPackages` / `invokeOptions` / `configPath`.

Reconstructed `configObject` passed to `ExtractorConfig.prepare` (then `Extractor.invoke`):

```json
{
  "bundledPackages": undefined,
  "projectFolder": "<vite root = workspace>",
  "mainEntryPointFilePath": "<typesPath, overwritten in place>",
  "compiler": {
    "tsconfigFilePath": "<the face tsconfigPath>",
    "overrideTsconfig": {
      "$schema": "http://json.schemastore.org/tsconfig",
      "compilerOptions": "<getTsConfig(tsconfigPath).compilerOptions; module Preserve rewritten to ESNext>"
    }
  },
  "apiReport": { "enabled": false, "reportFileName": "<unscopedPackageName>.api.md" },
  "docModel": { "enabled": false },
  "dtsRollup": {
    "enabled": true,
    "publicTrimmedFilePath": "<same path as mainEntryPointFilePath>"
  },
  "tsdocMetadata": { "enabled": false },
  "messages": {
    "compilerMessageReporting": { "default": { "logLevel": "none" } },
    "extractorMessageReporting": { "default": { "logLevel": "none" } }
  }
}
```

Omitted fields and what `ExtractorConfig.prepare` fills: `bundledPackages` becomes `[]`; `newlineKind` is unset so Windows `crlf`; `dtsRollup.untrimmedFilePath` / `alphaTrimmedFilePath` / `betaTrimmedFilePath` expand to `""` and are not written; `compiler.typescriptCompilerFolder` is not an `ExtractorConfig` field (invoke-only). `overrideTsconfig` present means the on-disk tsconfig is not read; `parseJsonConfigFileContent` uses `projectFolder` as base.

```534:589:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
  const configObject = {
    bundledPackages,
    projectFolder: root,
    mainEntryPointFilePath: entryPath,
    compiler: {
      tsconfigFilePath: tsconfigPath,
      overrideTsconfig: {
        $schema: "http://json.schemastore.org/tsconfig",
        compilerOptions
      }
    },
    ...
    dtsRollup: {
      enabled: true,
      publicTrimmedFilePath: outputPath ?? resolve(outDir, fileName)
    },
    ...
  };
  if (configPath) {
    mergeObjects(configObject, ExtractorConfig.loadFile(configPath));
  }
  if (Object.keys(extractorConfig).length) {
    mergeObjects(configObject, extractorConfig);
  }
  const config = ExtractorConfig.prepare({
    configObject,
    configObjectFullPath,
    packageJsonFullPath: tryGetPkgPath(configObjectFullPath)
  });
  return Extractor.invoke(config, {
    localBuild: false,
    showVerboseMessages: false,
    showDiagnostics: false,
    typescriptCompilerFolder: libFolder,
    ...invokeOptions
  });
```

Merge order: internal object, then `bundleTypes.configPath` file if set (default lookup `./api-extractor.json` only when `configPath` is passed; a boolean `bundleTypes` does not load a file), then `bundleTypes.extractorConfig` via deep `mergeObjects`.

`packageJsonFullPath` is `tryGetPkgPath(resolve(root, "api-extractor.json"))`, which walks parents until `package.json`. For this repo that is `/home/user/scaffold/package.json`. Collector refuses to run without that file. Working package name is `@orkestrel/scaffold`.

```287:304:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
function tryGetPkgPath(beginPath) {
  ...
  const pkgPath = resolve(beginPath, "package.json");
  if (existsSync(pkgPath)) {
    pkgPathCache.set(beginPath, pkgPath);
    return pkgPath;
  }
  ...
  return tryGetPkgPath(parentDir);
}
```

```101:110:/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/collector/Collector.js
        if (!this.extractorConfig.packageFolder || !this.extractorConfig.packageJson) {
            throw new Error('Unable to find a package.json file for the project being analyzed');
        }
        this.workingPackage = new WorkingPackage_1.WorkingPackage({
            packageFolder: this.extractorConfig.packageFolder,
            packageJson: this.extractorConfig.packageJson,
            entryPointSourceFile
        });
```

`compilerOptions` handed to `overrideTsconfig` are `getTsConfig(configPath)` (JSON `extends` merge), not the in-memory emit options (`outDir: "."`, `fixedCompilerOptions`). CompilerState then deletes `outDir` and `declarationDir`, and the analysis file list is only `.d.ts` paths: the entry plus tsconfig `fileNames` (empty here because `overrideTsconfig` has no `include`).

```61:90:/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/api/CompilerState.js
        let tsconfig = extractorConfig.overrideTsconfig;
        let configBasePath = extractorConfig.projectFolder;
        ...
        delete commandLine.options.outDir;
        delete commandLine.options.declarationDir;
        const inputFilePaths = commandLine.fileNames.concat(extractorConfig.mainEntryPointFilePath);
        const analysisFilePaths = _generateFilePathsForAnalysis(inputFilePaths);
        const program = ts.createProgram(analysisFilePaths, commandLine.options, compilerHost);
```

Core face extra merge: `extractorConfig.compiler.overrideTsconfig.compilerOptions.types = ['node']`.

```12:22:/home/user/scaffold/configs/src/vite.core.config.ts
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.core.json'),
				bundleTypes: {
					extractorConfig: {
						compiler: {
							overrideTsconfig: {
								compilerOptions: { types: ['node'] },
							},
						},
					},
				},
			}),
```

Server face: `bundleTypes: true` (no extractor overlay). Single Vite lib entry → one `bundleEntry(typesPath)`. `typesPath` is package.json `types`/`exports.types` if a string, else `outDir/index.d.ts`. This package's `exports["."].types` is nested under `import`, so `findTypesPath` misses it and the server rollup entry is `dist/src/server/index.d.ts`.

## External-versus-inlined rule

Server source imports `@src/core`. The plugin's default `pathsToAliases` turns that into a relative specifier from the emitting file (tsconfig `paths` `@src/core` → `./src/core/index.ts`).

```1099:1108:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
    if (pathsToAliases && resolvedBaseUrl && paths) {
      aliases.push(
        ...parseTsAliases(
          ensureAbsolute(
            resolveConfigDir(resolvedBaseUrl, root),
            configPath ? dirname(configPath) : root
          ),
          paths
        )
      );
    }
```

```778:792:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
function transformAlias(importer, dir, aliases, aliasesExclude) {
  ...
      const replacement = isAbsolute(alias.replacement) ? normalizePath(relative(dir, alias.replacement)) : normalizePath(alias.replacement);
      ...
      const resultPath = normalizedPath.startsWith(".") ? normalizedPath : `./${normalizedPath}`;
```

The plugin does not hand api-extractor a file list of core declarations. Analysis files are the server entry `.d.ts` plus whatever that program resolves. Core is outside server `include`, so it is never emitted into `dist/src/server`. `copyDtsFiles` defaults to false for Vite; `bundleTypes` only copies `.d.ts` already in the program.

Inlining is not a `projectFolder` containment test. ExportAnalyzer asks TypeScript whether the specifier is an external library. Unresolved specifiers are treated as external. `bundledPackages` (empty here) is the only way a named package is pulled in and inlined.

```207:235:/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/analyzer/ExportAnalyzer.js
    _isExternalModulePath(importOrExportDeclaration, moduleSpecifier) {
        ...
        const resolvedModule = TypeScriptInternals_1.TypeScriptInternals.getResolvedModule(this._program, importOrExportDeclaration.getSourceFile(), moduleSpecifier, mode);
        if (resolvedModule === undefined) {
            return true;
        }
        const packageName = resolvedModule.packageId?.name;
        if (packageName !== undefined && this._bundledPackageNames.has(packageName)) {
            return false;
        }
        ...
        return resolvedModule.isExternalLibraryImport;
    }
```

`projectFolder` is the Vite root (workspace). It is the token/base folder for config paths. `packageFolder` is the directory of that root `package.json` (same package for core and server). WorkingPackage treats every file that is not this package as external; a resolved relative import to `dist/src/core/index.d.ts` would still be the working package and would be inlined.

```13:16:/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/collector/WorkingPackage.js
 * If API Extractor is invoked on a project,
 * we refer to that project as being the "working package".  There is exactly one
 * "working package" for the duration of this analysis.  Any files that do not belong to
 * the working package are referred to as "external"
```

Why the relative core import is kept: server `rootDir` is `src`, `entryRoot` follows it, so each server file is written under `outDir` with a `server/` prefix (`relative(src, src/server/…)` + `dist/src/server`). The alias rewrite computed `../core/index.ts` from the source folder `src/server`. From `dist/src/server/server/*.d.ts` that specifier does not land on `dist/src/core/index.d.ts` (even though a prior `build:src:core` left that file on disk). `getResolvedModule` is undefined → external `AstImport` whose `modulePath` is the original specifier. The rollup emits that specifier unchanged:

```50:61:/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/generators/DtsEmitHelpers.js
        const importPrefix = astImport.isTypeOnlyEverywhere ? 'import type' : 'import';
        switch (astImport.importKind) {
            case AstImport_1.AstImportKind.DefaultImport:
                ...
                writer.writeLine(` from '${astImport.modulePath}';`);
```

`beforeWriteFile` then rewrites only the final `dist/src/server/index.d.ts`:

```15:18:/home/user/scaffold/configs/src/vite.server.config.ts
				beforeWriteFile: (path, content) => ({
					content: /[\\/]dist[\\/]dist[\\/]src[\\/]server[\\/]index\.d\.ts$/.test(path)
						? content.replaceAll(/(?:\.\.\/)+core\/index\.[jt]s/g, '@orkestrel/scaffold')
						: content,
				}),
```

Wait, I must not typo the regex. The actual file is:

```15:18:/home/user/scaffold/configs/src/vite.server.config.ts
				beforeWriteFile: (path, content) => ({
					content: /[\\/]dist[\\/]src[\\/]server[\\/]index\.d\.ts$/.test(path)
						? content.replaceAll(/(?:\.\.\/)+core\/index\.[jt]s/g, '@orkestrel/scaffold')
						: content,
				}),
```

That hook also runs on the pre-rollup write of that same path. The barrel `src/server/index.ts` only re-exports sibling modules, so the pre-rollup entry does not itself contain the core specifier; the rewrite that matches the comment (“on the final roll-up only”) is the post-extractor `writeOutput` of the rolled file. Shipped header:

```1:15:/home/user/scaffold/dist/src/server/index.d.ts
import { Audit } from '@orkestrel/scaffold';
import { CatalogEntry } from '@orkestrel/scaffold';
...
import { Snapshot } from '@orkestrel/scaffold';
```

If a relative `../core/index.js` from a file at `dist/src/server/*.d.ts` (no extra `server/` segment) resolved to `dist/src/core/index.d.ts`, `isExternalLibraryImport` would be false and the core rollup would be inlined into the server face. Empty `bundledPackages` would not stop that; `bundledPackages` only forces named packages inward.

## Post-processing in order

No `banner` / `footer` option exists in `unplugin-dts` 1.0.3 or 1.1.0.

Order inside `Runtime.emitOutput` then the plugin hook:

1. **`copyDtsFiles` / `bundleTypes` copy** — every program `.d.ts` in the filter is copied into `outputFiles` when either flag is on (`bundleTypes` forces this). Vite default `copyDtsFiles` is false.
2. **`program.emit`** for remaining root files into the memory map.
3. **`transformCode` per declaration file** (before disk write): `pathsToAliases` rewrites specifiers; `clearPureImport` (default true) drops side-effect `import 'x'`; `staticImport` (forced true when `bundleTypes`) turns `import("mod").T` into a top-level `import { T } from 'mod'` (not `import type`); `cleanVueFileName` strips `.vue` in specifiers and output names; `replaceUnresolvedVLS` when bundling. Prepended imports are always `import { … }`, never `import type`.
4. **`.d.cts` / `.d.mts`** — `transformDtsPath` / `transformSourceMappingURL` using each `outDirs` `moduleFormat` (`cjs` → `.d.cts`, `esm` → `.d.mts`, else `.d.ts`). Scaffold does not set `moduleFormat`; `package.json` copies `index.d.ts` → `index.d.cts` after Vite.
5. **`beforeWriteFile`** — can change path/content or skip (`false`). Then **`strictOutput`** (default true) drops writes whose directory is not under the target `outDir`.
6. Source-map rewrite for emit maps.
7. **`insertTypesEntry`** (forced true when `bundleTypes`) — synthetic `export * from './…'` at `typesPath` when that path is not already the emitted entry.
8. **`bundleTypes`** — api-extractor overwrite of `typesPath`; then **unlink every other emitted file**; then re-read the rollup, append collected `declare module` blocks, **`beforeWriteFile` again**, write.
9. Extra `outDirs` copies (with map path rewrite via `editSourceMapDir`).
10. Plugin **`afterBuild(emittedFiles)`**. `afterRollup` runs per extractor result inside step 8.

```1315:1316:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
    const staticImport = bundleTypes ? true : staticImportOpt;
```

```939:944:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
  let prependImports = "";
  importMap.forEach((importSet, libName) => {
    prependImports += `import { ${Array.from(importSet).join(", ")} } from '${libName}';
`;
  });
```

```1584:1596:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
          await runParallel(cpus().length, Array.from(emittedFiles.keys()), (f) => unlink(f));
          removeDirIfEmpty(outDir);
          emittedFiles.clear();
          const declared = declareModules.join("\n");
          await runParallel(cpus().length, [...rollupFiles], async (filePath) => {
            await writeOutput(
              filePath,
              await readFile(filePath, "utf-8") + (declared ? `\n${declared}` : ""),
              dirname(filePath),
              ...
```

```1907:1920:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
      const emittedFiles = await runtime.emitOutput({ ... beforeWriteFile, afterRollup });
      if (typeof afterBuild === "function") {
        await unwrapPromise(afterBuild(emittedFiles));
      }
```

## typescriptCompilerFolder

The plugin always passes `getTsLibFolder()`: `local-pkg` `getPackageInfoSync("typescript")?.rootPath` from the process cwd — the workspace TypeScript install (6.0.3), not api-extractor’s nested compiler.

```253:256:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
function getTsLibFolder() {
  const libFolder = tryGetPackageInfo("typescript")?.rootPath;
  return libFolder && normalizePath(libFolder);
}
```

```1563:1563:/home/user/scaffold/node_modules/unplugin-dts/dist/shared/unplugin-dts.BU1tibsL.mjs
              libFolder: getTsLibFolder(),
```

Api-extractor’s program is always `require("typescript")` from **its own** dependency `typescript` 5.9.3 (`/home/user/scaffold/node_modules/@microsoft/api-extractor/node_modules/typescript`). `typescriptCompilerFolder` only overrides `compilerHost.getDefaultLibLocation` to `<folder>/lib` (the `lib.*.d.ts` tree). It does not swap the compiler engine.

```138:142:/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/api/CompilerState.js
    if (options && options.typescriptCompilerFolder) {
        const typescriptCompilerLibFolder = path.join(options.typescriptCompilerFolder, 'lib');
        compilerHost.getDefaultLibLocation = () => typescriptCompilerLibFolder;
    }
```

```39:47:/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-dts/api/Extractor.d.ts
     * Specifies an alternate folder path to be used when loading the TypeScript system typings.
     * ...
     * API Extractor uses its own TypeScript compiler engine to analyze your project.
```

If the option is omitted, `getDefaultLibLocation` stays the bundled 5.9.3 `lib/`. If it points at a TypeScript that ships no `lib.*.d.ts`, the 5.9.3 engine still runs and fails when it cannot load those default libs. Workspace 6.0.3 still ships `lib/lib.*.d.ts`. Invoke also logs that analysis uses the bundled compiler version (`Extractor.js` `_checkCompilerCompatibility`).

## import type rule

Api-extractor emits `import type` iff that `AstImport` was type-only in **every** reference. The first sighting sets the flag from the clause; a later value import clears it.

```72:81:/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/analyzer/AstImport.js
     * This is set to true ONLY if the type-only form is used in *every* reference to this AstImport.
    isTypeOnlyEverywhere;
```

```739:744:/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/analyzer/ExportAnalyzer.js
            if (!options.isTypeOnly) {
                astImport.isTypeOnlyEverywhere = false;
            }
```

```51:51:/home/user/scaffold/node_modules/@microsoft/api-extractor/lib-commonjs/generators/DtsEmitHelpers.js
        const importPrefix = astImport.isTypeOnlyEverywhere ? 'import type' : 'import';
```

The plugin flow that makes a plugin rollup use `import` while a direct extractor run uses `import type`:

- Scaffold tsconfig has `verbatimModuleSyntax: true`, so `tsc --declaration` keeps `import type` where the source used it (`src/server/helpers.ts`, `validators.ts`, `Materializer.ts` type-only `@src/core`; `WriteTransaction.ts` also has a value import from `@src/core`).
- Before extractor, `transformCode` with `staticImport` forced on rebuilds every named import as `import { … } from '…'` with no `type`, and converts `import()` types the same way. Extractor then sees value imports for those specifiers.
- Direct extractor on raw `tsc` emit would keep `isTypeOnlyEverywhere` for symbols that were type-only in every `.d.ts`.

That is the difference a 7.0.2 measurement of `import` vs `import type` is looking at.

## Process or pre-emitted modes

No `tsgo`, `native-preview`, `@typescript/native-preview`, `execFile`, `spawn`, or `child_process` in `vite-plugin-dts` or `unplugin-dts` `dist/` (5.0.3 / 1.0.3 or 5.1.0 / 1.1.0). `tsc` appears only as documentation/keywords/`tsconfigPath`. Emit is in-process `createProgram` + `program.emit`. Rollup is in-process `Extractor.invoke`. There is no mode that runs the compiler as a process and no mode that takes a pre-emitted `.d.ts` tree as the only input. `copyDtsFiles` only copies `.d.ts` already in the TypeScript program (hand-written declarations among sources).

## 5.0.3 versus 5.1.0

Published `vite-plugin-dts` / `unplugin-dts` tarballs contain no `CHANGELOG.md`. Behavioural `dist/` differences that touch the questions:

- Wrapper `vite-plugin-dts` remains a re-export; the engine bump is `unplugin-dts` 1.0.3 → 1.1.0.
- Emit: 1.1.0 adds an optional `createCompilerHost` source-file cache (`DTS_DISABLE_SOURCE_FILE_CACHE`); still `ts.createProgram` + `program.emit`. Vue processor adds synthetic root `.d.ts` files, `needsModuleResolutionFallback`, and `releaseSourceFile` — not used by scaffold core/server.
- Rollup `bundleDtsFiles` / `ExtractorConfig` object is the same shape.
- `insertTypesEntry`: 1.1.0 tracks empty `export {}` entries and skips bundling them; 1.0.3 does not. Scaffold barrels are not empty.
- `glob-to-regexp` in 1.1.0 is for native watch ignore globs, not rollup.
- TypeScript loader, `getTsLibFolder`, `staticImport` coalescing, `beforeWriteFile` order, and `typescriptCompilerFolder` invoke field are unchanged.

## Reproduction recipe

A script that aims at the same single-file rollup without the in-process compiler API:

**Emit (per face, instead of `program.emit`).** Run `tsc --declaration --emitDeclarationOnly -p configs/src/tsconfig.core.json` and the server twin. That writes under each tsconfig `outDir`/`rootDir` (`dist/src/core/**`, `dist/src/server/**` with `rootDir` `src` so server files land at `dist/src/server/**`). Do not include `src/core` in the server program. `verbatimModuleSyntax` will keep `@src/core` / `import type` as `tsc` emitted them.

**Layout / alias step the plugin does and `tsc` does not.** Before extractor:

- Rewrite tsconfig `paths` (`@src/core` → relative `../core/index.ts` from each file), matching `pathsToAliases` / `parseTsAliases` / `transformAlias`.
- Drop pure side-effect imports (`clearPureImport`).
- If matching plugin text: coalesce named imports to `import { … }` (`staticImport` forced on). Skipping this step is what restores extractor `import type`.
- Place files so `entryRoot` matches the plugin (`rootDir`): server files under `dist/src/server` with the `server/` prefix the plugin uses, or accept that a flat `dist/src/server/*.d.ts` with `../core/index.js` **will resolve** to `dist/src/core/index.d.ts` and **inline core**.

**package.json.** Invoke extractor with `packageJsonFullPath` = workspace `package.json` (Collector requires it). `projectFolder` = workspace root. Do not set `bundledPackages` to `@orkestrel/scaffold`.

**Extractor invoke** (one call per face), matching the plugin object:

- `mainEntryPointFilePath` / `dtsRollup.publicTrimmedFilePath` = `dist/src/core/index.d.ts` or `dist/src/server/index.d.ts`
- `compiler.overrideTsconfig.compilerOptions` = `getTsConfig` merge of that face tsconfig (core: also `types: ['node']`); delete `outDir`/`declarationDir` as CompilerState does
- `apiReport.enabled` / `docModel.enabled` / `tsdocMetadata.enabled` false; message logLevels `none`
- `newlineKind` unset → `crlf` (plugin does this)
- `invoke`: `localBuild: false`; `typescriptCompilerFolder` = workspace `typescript` package root if you want the plugin’s lib folder (engine remains api-extractor’s 5.9.3)

**After extractor.** Delete the other emitted `.d.ts` in that outDir. Run the face `beforeWriteFile` on the rollup path (server/browser: replace `(?:\.\./)+core/index.[jt]s` with the package name). Copy `index.d.ts` → `index.d.cts` as `package.json` `build:src:core` / `build:src:server` do. No banner/footer.

A naïve `tsc` + extractor **without** the alias rewrite leaves `@src/core` in the `.d.ts`. Extractor’s `overrideTsconfig` still carries `paths`, so that specifier can resolve to `src/core/index.ts` (`isExternalLibraryImport` false) and inline core source into the server rollup.

## Unknowns

- `CHANGELOG.md` is not in the installed `vite-plugin-dts` 5.0.3 / 5.1.0 or `unplugin-dts` 1.0.3 / 1.1.0 trees; 5.1.0 differences above are from `dist/` only.
- Intermediate pre-rollup files are deleted after bundling, so the extra `server/` segment and the exact pre-extractor specifier (`../core/index.ts` vs `.js`) are inferred from emit layout + `transformAlias`, not read from a leftover file.
- Whether TypeScript 6 `getResolvedModule` would still resolve a flat `dist/src/server` → `../core/index.ts` to `dist/src/core/index.d.ts` under `moduleResolution: bundler` + `allowImportingTsExtensions` was not executed here.
- Api-extractor sources live under `lib-commonjs/` (Node `main`), not `lib/` as the brief named.