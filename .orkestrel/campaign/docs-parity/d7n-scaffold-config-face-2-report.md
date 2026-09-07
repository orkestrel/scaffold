# Report — `d7n-scaffold-config-face-2`

## Changes

`/home/user/scaffold/tests/config.test.ts:2139-2201`: kept the first round's face walk and
reworded errors, and replaced the root assertion. The case now reads `rootDir` from
`declaredOptions` through `Object.getOwnPropertyDescriptor`, throws `The ${face} project declares
no rootDir` when it is not a string, binds `expectedRoot` from `resolve(dirname(project),
declaredRootDir)`, and asserts `scope.root` against that expected root instead of against
`src/<face>`.

### The case, as it now stands

```ts
	it('reads the compiler scope and fixed extractor override a declaration roll-up requires', () => {
		const compiler = createRequire(import.meta.url).resolve('typescript/bin/tsc')
		// The order mirrors ENVIRONMENTS in src/core/constants.ts; a server-only workspace vendors
		// no core project, so this walks to the first face the workspace actually carries.
		const faces = ['core', 'browser', 'server']
		const face = faces.find((candidate) =>
			existsSync(resolve(root, `configs/src/tsconfig.${candidate}.json`)),
		)
		if (face === undefined) throw new Error('The workspace declares no face project')
		const project = resolve(root, `configs/src/tsconfig.${face}.json`)
		const declared: unknown = JSON.parse(readFileSync(project, 'utf8'))
		if (typeof declared !== 'object' || declared === null) {
			throw new Error(`The ${face} project is not a TypeScript configuration record`)
		}
		const declaredOptions: unknown = Object.getOwnPropertyDescriptor(
			declared,
			'compilerOptions',
		)?.value
		if (typeof declaredOptions !== 'object' || declaredOptions === null) {
			throw new Error(`The ${face} project carries no compiler options`)
		}
		const declaredLib: unknown = Object.getOwnPropertyDescriptor(declaredOptions, 'lib')?.value
		const declaredTypes: unknown = Object.getOwnPropertyDescriptor(declaredOptions, 'types')?.value
		if (!configHelpers.isStringList(declaredLib) || !configHelpers.isStringList(declaredTypes)) {
			throw new Error(`The ${face} project declares no lib or types`)
		}
		const declaredRootDir: unknown = Object.getOwnPropertyDescriptor(
			declaredOptions,
			'rootDir',
		)?.value
		if (typeof declaredRootDir !== 'string') {
			throw new Error(`The ${face} project declares no rootDir`)
		}
		const expectedRoot = resolve(dirname(project), declaredRootDir)

		const scope = configHelpers.parseProjectScope(
			configHelpers.readCompilerOutput(compiler, ['--showConfig', '-p', project]),
			project,
		)
		if (scope === undefined) throw new Error('The core project resolved no compiler scope')
		// The compiler lowercases every resolved library name, so the committed project is the
		// second mechanism this reading is compared against rather than the reading itself.
		expect(scope.lib.map((entry) => entry.toLowerCase())).toStrictEqual(
			declaredLib.map((entry) => entry.toLowerCase()),
		)
		expect(scope.types).toStrictEqual(declaredTypes)
		expect(scope.root).toBe(expectedRoot)
```

The rest of the case (the four `parseProjectScope` refusal checks, the `readCompilerOutput`
failure on an absent project, the `isStringList` checks, and the extractor-override assertion)
is unchanged from the committed tree.

## Scoped validation

1. `git status --short` in `/home/user/scaffold`:
```
 M tests/config.test.ts
```
Only the owned file changed.

2. `npm run format:check`:
```
All matched files use the correct format.
Finished in 12567ms on 223 files using 4 threads.
```
Exit `0`.

`npx oxlint --config .oxlintrc.json --deny-warnings tests/config.test.ts`: no output, exit `0`.

3. `npm run test:config` in the scratch copy
(`/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/p24-sqlite-config`,
edited `tests/config.test.ts` copied over from the scaffold checkout):
```
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
```
Exit `0`. The target case resolves `face === 'server'` and passes against the workspace's own
declared `rootDir: "../../src"`.

4. `npm run test:config` in `/home/user/scaffold`:
```
 FAIL  |config| tests/config.test.ts > root configuration > keeps the committed host inventory aligned with the vendored checkout bytes
Error: The committed host inventory is stale at tests/config.test.ts
 Test Files  1 failed (1)
      Tests  1 failed | 171 passed | 1 skipped (173)
```
The only red line is the host-inventory case, expected per the brief: editing this vendored file
moves the digest `host.json` commits over its bytes, and regenerating `host.json` is out of this
unit's scope. The target case (`reads the compiler scope and fixed extractor override a
declaration roll-up requires`) passes here, resolving `face === 'core'`.

## Shared-file patches

None.

## Deviation report

None. The scratch copy reds on no case other than the host-inventory one (it does not red on the
host-inventory case at all, since that fixture predates the edit there), and the declared
`rootDir` is present in both trees (`../../src/core` in `/home/user/scaffold`'s
`configs/src/tsconfig.core.json`, `../../src` in `/home/user/fleet/sqlite`'s
`configs/src/tsconfig.server.json`).
