# Report — A.1 `d7n-abort-prep`

## Item 1: `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/p18/scaffold-tip/package/dist/bin/main.js repair --offline`

Summary line:

```
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (404 lines added).
9 written, 27 unchanged, 0 removed in ..
```

`git status --short` after:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P19 list exactly (`package.json` here carries only the `docs` script row `repair` added; the version bump in item 4 lands on the same file).

## Item 2: the drop-in's adaptation (`tests/guides.test.ts`)

Hunk:

```diff
@@ -91,21 +91,36 @@ for (const entry of manifest) {
 		})
 
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(
+						findMissing(
+							members,
+							group.methods.map((method) => method.name),
+						),
+					).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(
+						findMissing(
+							group.methods.map((method) => method.name),
+							members,
+						),
+					).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									group.methods.map((method) => method.name),
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -120,7 +135,13 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
@@ -133,9 +154,18 @@ for (const entry of manifest) {
 						.map((fence) => fence.code)
 					const examples =
 						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+							? source.examples(group.interface).map((example) => example.name)
+							: source
+									.examples(group.interface)
+									.map((example) => example.name)
+									.concat(source.examples(entity).map((example) => example.name))
+					expect(
+						findUnexampled(
+							group.methods.map((method) => method.name),
+							fences,
+							examples,
+						),
+					).toEqual([])
 				})
 			})
 		}
```

No extra `const` was introduced (A.3 correction: the sentence stated a count, and the subjective lane read the `group.methods` mapping repeated at three sites inside one `describe`; the fix round hoists it).

## Item 3: the voice site

`tests/src/core/Abort.test.ts:108`:

```diff
-		// the default `id` is distinct across a large batch, not just a pair.
+		// the default `id` is distinct across a large batch, not a pair.
```

## Item 4: the bump

`package.json:3`:

```diff
-	"version": "0.0.9",
+	"version": "0.0.10",
```

`package-lock.json` was not edited.

## Acceptance criteria

1. `git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tests/src/core/Abort.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P19 repair list plus `tests/guides.test.ts` and `tests/src/core/Abort.test.ts`, and nothing else.

2. `npm run format:check`:

```
Checking formatting...

All matched files use the correct format.
Finished in 3011ms on 40 files using 4 threads.
```

Exit 0.

`npx oxlint --config .oxlintrc.json --deny-warnings .`: no output, exit 0.

`npm run check`:

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

Exit 0.

3. `npm run test:guides`:

```
 Test Files  1 passed (1)
      Tests  22 passed (22)
```

Exit 0.

`npm run test:policy`:

```
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```

Exit 0.

`npm run test:config`:

```
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
```

Exit 0.

4. `npm run docs` (expected, the converge unit's worklist), verbatim:

```
> @orkestrel/abort@0.0.10 docs
> node --experimental-strip-types scripts/docs.ts

guides/abort.md function createAbort: guide "Create an `AbortInterface`, optionally with a trace `id` and a parent `signal`." source "Creates a cancellation handle — a thin, traceable wrapper over a native `AbortController` whose `signal` can be linked to a parent signal."
guides/abort.md function validateAbortOptions: guide "Validate once-read abort options and return a fresh copy omitting absent optional keys." source "Validates and normalizes abort construction options."
guides/abort.md function linkSignal: guide "Link an own `AbortSignal` to an optional parent signal, returning `AbortSignal.any([own, parent])` when a parent is given." source "Links an own `AbortSignal` to an optional parent signal."
guides/abort.md function isAbortSignal: guide "Total native-brand guard for `AbortSignal`; structural spoofs and hostile or revoked proxies fail safely." source "Determines whether a value is a native `AbortSignal`."
guides/abort.md class Abort: guide "A traceable `AbortController` wrapper whose `signal` can link to a parent." source "Represents a cancellation handle — a thin, traceable wrapper over a native `AbortController` whose exposed `signal` can be linked to a parent signal."
guides/abort.md interface AbortOptions: guide absent source "Represents the options for `createAbort` and `Abort` construction."
guides/abort.md interface AbortInterface: guide absent source "Represents a cancellation handle — a thin, traceable wrapper over a native `AbortController` whose `signal` can be linked to a parent signal."
guides/abort.md AbortInterface.abort: guide absent source "Aborts the handle, firing `signal`. Aborting is idempotent — the first reason sticks."
guides/abort.md pitch: readme absent tagline "The cancellation primitive: a thin, traceable wrapper over a native `AbortController`. An `Abort` carries a trace `id`, exposes a standard `AbortSignal` you hand to any cancellable API, and can be linked to a parent signal so it fires when either its own `abort()` is called or the parent aborts — cancellation cascades through a tree of handles with no listener bookkeeping. Async layers bound their work against a `signal`. Deliberately thin. It does not re-implement cancellation machinery — the native `AbortController` is the engine; `Abort` only adds a traceable `id` and parent-linking on top. It does not wrap the signal in a bespoke interface, so it stays interoperable with `fetch`, streams, and every Web API that already speaks `AbortSignal`. The native signal is the complete observation contract: consumers inspect `aborted` and `reason` or subscribe to its standard `abort` event. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 9
```

Exit 1 (expected; the worklist the converge unit carries forward).

No deviation.

## A.3 corrections (the Orchestrator)

`d7n-abort-prep.diff.txt` was captured before the Orchestrator's lockfile-only install, so it carries no `package-lock.json` hunk; the commit `7d8b1dd` carries the root version `0.0.10` and drops the `vite-plugin-dts` subtree (`instruments/d7/a1/lockfile.log.txt`).
