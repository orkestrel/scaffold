I'll read the brief first, then collect only the bounded read-only evidence it asks for.Authority files and the installed Vitest surface are next; I'll stay inside the brief's read-only bounds.Next Iâ€™ll load the remaining skill references and guides, then map Vitestâ€™s installed public surface.Iâ€™ll inspect Vitestâ€™s installed package exports and the guides-workflow passage next.Iâ€™ll read the CLI parser, `provide`, and the official Vitest docs next.# Unit d7n-guides-cli-map â€” evidence

Installed subject: Guide `C:/Users/mikes/WebstormProjects/guide/node_modules/vitest@4.1.11` and Vite `8.2.2`. Public Node surface is `vitest/node` â†’ `dist/node.d.ts` / `dist/node.js`. Bin is `vitest.mjs` â†’ `dist/cli.js`. `cac` is a bundled chunk, not a package export.

---

## Question

Does the exported Vitest CLI/parser support registering a custom option before parse, or a supported option carrying arbitrary user arguments through workers? Distinguish public exports from private chunks. Name exact signatures.

### Evidence

Public `vitest/node` exports `parseCLI`, `startVitest`, `createVitest`. It does not export `createCLI` or `cac`.

```112:118:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/node.d.ts
interface CliParseOptions {
	allowUnknownOptions?: boolean;
}
declare function parseCLI(argv: string | string[], config?: CliParseOptions): {
	filter: string[];
	options: CliOptions;
};
```

```264:264:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/node.d.ts
export { ... parseCLI, ... startVitest, createVitest, ... };
```

```5:6:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/node.js
export { ... j as createVitest, ... s as startVitest } from './chunks/cli-api.CnMVyzaz.js';
export { p as parseCLI } from './chunks/cac.uFydS1Z4.js';
```

Bin parse has no custom-option hook:

```11:11:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/cli.js
createCLI().parse();
```

Private `createCLI` builds a fixed `cliOptionsConfig` and passes `CliParseOptions` through as cac command config. There is no `option()` registration parameter on `parseCLI`.

```2215:2268:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/cac.uFydS1Z4.js
function createCLI(options = {}) {
	const cli = cac("vitest");
	addCliOptions(cli, cliOptionsConfig);
	cli.command("run [...filters]", void 0, options).action(run);
	// ...
}
function parseCLI(argv, config = {}) {
	const arrayArgs = typeof argv === "string" ? splitArgv(argv) : argv;
	if (arrayArgs[0] !== "vitest") throw new Error(`Expected "vitest" as the first argument, received "${arrayArgs[0]}"`);
	let { args, options } = createCLI(config).parse(arrayArgs, { run: false });
	return { filter: args, options };
}
```

Unknown flags throw unless `allowUnknownOptions` is set. Name `"--"` is skipped:

```401:407:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/cac.uFydS1Z4.js
checkUnknownOptions() {
	if (!this.config.allowUnknownOptions) {
		for (const name of Object.keys(options)) {
			if (name !== "--" && !this.hasOption(name) && !globalCommand.hasOption(name)) {
				throw new CACError(`Unknown option \`${name.length > 1 ? `--${name}` : `-${name}`}\``);
```

A lone `--` parks the remainder on `options["--"]` and strips it from option parse:

```560:575:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/cac.uFydS1Z4.js
const doubleDashesIndex = argv.indexOf("--");
if (doubleDashesIndex > -1) {
	argsAfterDoubleDashes = argv.slice(doubleDashesIndex + 1);
	argv = argv.slice(0, doubleDashesIndex);
}
const options = { "--": argsAfterDoubleDashes };
```

`cliOptionsConfig` has no `to` key. `--project` is registered. `testNamePattern` shorthand is `-t`, not `--to`. Config `env` exists on `UserConfig` but CLI `env: null` is skipped by `if (option)`.

Worker payload carries `providedContext` from `project.getProvidedContext()`, not leftover CLI keys:

```3738:3751:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js
context: {
	files: specs.map(...),
	providedContext: project.getProvidedContext(),
	workerId: workerId++,
	environment
}
```

`TestProject.provide` refuses non-`structuredClone` values:

```10723:10730:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js
provide = (key, value) => {
	try { structuredClone(value); }
	catch (err) {
		throw new Error(`Cannot provide "${key}" because it's not serializable.`, { cause: err });
	}
	this._provided[key] = value;
};
```

Official index: https://vitest.dev/ (from installed README).

### Distillate

Public parser is `parseCLI(argv, { allowUnknownOptions?: boolean })`. It does not accept custom option definitions. Custom `option()` / `createCLI` live in a private chunk. The bin calls `createCLI().parse()` with unknown options refused. `--` is a cac remainder bucket, not a typed `CliOptions` field and not a worker channel. Values that reach workers through a public API go through serializable `provide` / `inject` (or config `provide`). `--to` is not a registered flag.

---

## Question

Which public API can launch the guides project with validated arguments, receive its result, close its resources, and provide the selected direction to test code before it reads inventory? Map `startVitest` / `createVitest` / `provide` or their actual installed equivalents.

### Evidence

```110:125:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/node.d.ts
declare function startVitest(mode: VitestRunMode, cliFilters?: string[], options?: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;
declare function createVitest(mode: VitestRunMode, options: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions): Promise<Vitest>;
```

`CliOptions` extends `UserConfig` and includes `project?: string | string[]` (`reporters.d.DtoKVV2s.d.ts` around the `project?` field). That is the same axis as `--project guides`.

`createVitest` constructs `Vitest`, starts Vite, returns the instance; it does not run tests. `startVitest` calls `prepareVitest` â†’ `createVitest`, then `ctx.start(cliFilters)`, returns `Vitest` (not `TestRunResult`), and in `finally` calls `ctx.close()` unless `shouldKeepServer()` (`!!this.config?.watch`).

```14275:14290:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js
async function createVitest(mode, options, viteOverrides = {}, vitestOptions = {}) {
	const ctx = new Vitest(mode, deepClone(options), vitestOptions);
	const server = await createViteServer(...);
	return ctx;
}
```

```14596:14645:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js
async function startVitest(...) {
	const ctx = await prepareVitest(...);
	...
	await ctx.start(cliFilters);
	return ctx;
	...
	finally {
		if (!ctx?.shouldKeepServer()) {
			await ctx.close();
		}
	}
}
```

```1377:1491:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/reporters.d.DtoKVV2s.d.ts
start(filters?: string[]): Promise<TestRunResult>;
close(): Promise<void>;
exit(force?: boolean): Promise<void>;
```

```929:932:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/reporters.d.DtoKVV2s.d.ts
interface TestRunResult {
	testModules: TestModule[];
	unhandledErrors: unknown[];
}
```

Provide / inject:

- `Vitest.provide: <T extends keyof ProvidedContext & string>(key: T, value: ProvidedContext[T]) => void` â€” forwards to root project (`cli-api.CnMVyzaz.js` `this.getRootProject().provide(key, value)`).
- `TestProject.provide` â€” same signature; `getRootProject()` throws until the Vite server exists.
- `UserConfig.provide?: Partial<ProvidedContext>` â€” copied in `_configureServer` via `this.provide(...)` before tests run.
- `inject` from `vitest`: `declare function inject<T extends keyof ProvidedContext & string>(key: T): ProvidedContext[T]` (`dist/index.d.ts`). Runtime: `getWorkerState().providedContext[key]`.
- `ProvidedContext` is an empty interface (`traces.d.D2T_R8rx.d.ts`); typed keys need declaration merging.
- `globalSetup` files load through the project runner; `setup?.(this)` receives the `TestProject`. `initializeGlobalSetup` runs before `pool.runTests`.

Config-time `provide` is applied when the server is configured (`_configureServer`). Caller-side `Vitest.provide` is available after `createVitest` returns and before `start()`. `startVitest` does not yield that gap: it starts tests immediately.

### Distillate

Launch + filter: `createVitest` / `startVitest` with `options.project` (same as `--project`). Result object: `Vitest.start()` â†’ `TestRunResult`. Resource close: `close()` / `exit()`; `startVitest` already closes in run mode. Direction into test code: serializable `provide` then `inject`, or config `provide`, or `globalSetup` calling `project.provide` before the pool runs. `startVitest` does not return `TestRunResult` and does not leave an open instance in non-watch mode.

---

## Question

Can Vitest load a test file through its own runner while the npm command uses that file as a native Node entry? Name the actual import/alias/TS-loading constraints from the installed declarations/source.

### Evidence

Default test execution uses Viteâ€™s module runner. Native `import()` is the `experimental.viteModuleRunner === false` path:

```3332:3347:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/reporters.d.DtoKVV2s.d.ts
* Controls whether Vitest uses Vite's module runner to run the code or fallback to the native `import`.
* If Node.js cannot process the code, consider registering [module loader](https://nodejs.org/api/module.html#customization-hooks) via `execArgv`.
* @default true
viteModuleRunner?: boolean;
* If module runner is disabled, Vitest uses a module loader to transform files to support
* `import.meta.vitest` and `vi.mock`.
nodeLoader?: boolean;
```

```11012:11013:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js
this.runner = this._config.experimental.viteModuleRunner === false
	? new NativeModuleRunner(this._config.root)
	: new ServerModuleRunner(environment, this._fetcher, this._config);
```

`NativeModuleRunner.import` is Node ESM `import(pathToFileURL(path))` after `resolveModule` / `pathe` resolve â€” no Vite transform, no Vite alias graph:

```27:33:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/nativeModuleRunner.BIakptoF.js
async import(moduleId) {
	const path = resolveModule(moduleId, { paths: [this.root] }) ?? resolve(this.root, moduleId);
	return import(pathToFileURL(path + queryParams).toString());
}
```

Public host import after the server exists:

```1331:1335:C:/Users/mikes/WebstormProjects/guide/node_modules/vitest/dist/chunks/reporters.d.DtoKVV2s.d.ts
* Import a file using Vite module runner. The file will be transformed by Vite and executed in a separate context.
import<T>(moduleId: string): Promise<T>;
```

Vite config load (used by `createVitest`):

```3859:3859:C:/Users/mikes/WebstormProjects/guide/node_modules/vite/dist/node/index.d.ts
export declare function loadConfigFromFile(..., configLoader?: "bundle" | "runner" | "native")
```

Vitest CLI `configLoader` is documented as `bundle` (esbuild) or `runner` (experimental), Vite `>= 6.1.0` (`node.d.ts` `CliOptions.configLoader`).

Published entries are JS: `vitest.mjs`, `dist/cli.js`, `dist/node.js`. `package.json` `exports["./src/*"]` maps to `./src/*`, but `files` does not include `src/`.

Guide `engines.node` is `>=22.12.0`. Vitest `engines.node` is `^20.0.0 || ^22.0.0 || >=24.0.0`.

An npm script whose command is `node <file>` is Node loading that file. Vitest collection is a later `runner.import` of collected specs. Those are different loaders. Vite aliases and TS transform apply only on the Vite-runner path (default). Native Node entry loading of `.ts` is Nodeâ€™s own type-stripping / loader story, which the installed `viteModuleRunner` remark defers to `execArgv` customization hooks when Node cannot process the code.

### Distillate

Vitest can load `tests/guides.test.ts` through its runner (`ServerModuleRunner` by default, or `NativeModuleRunner` if that flag is off). That is independent of npm pointing `node` at the same path. A native Node entry must be something Node can `import` before `vitest/node` exists; aliases and TS transform are Vite-runner facts, not Node facts. `Vitest.import` is only valid after `createVitest` has a server.

---

## Question

What documented CLI boundary handles `--` and unknown arguments? Does passing `--to` require intercepting it before Vitest's parser?

### Evidence

Supplied run: `npm run test:guides -- --to guide` â†’ `CACError: Unknown option `--to`` before collection. That matches bin `createCLI().parse()` with default `allowUnknownOptions` unset, and `cliOptionsConfig` having no `to`.

cac `--` (installed parser, not a Vitest-typed flag): remainder after a `--` token that is still in Vitestâ€™s argv is stored as `options["--"]` and is not subjected to `Unknown option`. The npm run that produced the error forwarded `--to` as a Vitest option, so that cac `--` token did not reach Vitest.

Public programmatic escape: `parseCLI(argv, { allowUnknownOptions: true })` skips `checkUnknownOptions`. Parsed unknown keys land on the returned `options` object as camelCase (`--to` â†’ `to`). `CliOptions` / `UserConfig` do not declare `to` or `"--"`. Worker context does not take those leftover keys.

Official site listed by the installed README: https://vitest.dev/. Type comment for host API: https://vitest.dev/api/advanced/vitest#getsourcemodulediagnostic. Node loader remark: https://nodejs.org/api/module.html#customization-hooks.

### Distillate

The Vitest bin parser refuses `--to` before collection. Interception before that parser is required on the current `vitest run ...` npm script path. A `--` remainder is only a Vitest/cac boundary when a `--` token is still present in Vitest argv. `parseCLI(..., { allowUnknownOptions: true })` is the public parse-time alternative; it does not by itself inject `to` into workers.

---

## Unknowns

- Verbatim text of https://vitest.dev/guide/cli (and whether it documents `--` / unknown options). Live fetch of vitest.dev was refused in this session; claims above are from installed 4.1.11 / Vite 8.2.2.
- Whether a leftover `options.to` or `options["--"]` survives `resolveConfig` onto `ResolvedConfig` / `SerializedConfig`. Not traced past parse and worker-context construction.
- When `tests/guides.test.ts` reads inventory relative to config evaluation vs worker `inject`. That file was out of this read set.
- npmâ€™s own `--` forwarding rules were not read from npm docs; the CACError is the observation that `--to` arrived as a Vitest option.

## Deviation

None. No edits, tests, credential reads, campaign journals, or engine spawn. Product source unread beyond the briefâ€™s Vitest/Vite/public-docs bound.