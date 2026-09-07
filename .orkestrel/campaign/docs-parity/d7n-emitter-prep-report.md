# Report — `d7n-emitter-prep`

Wall clock: 2026-09-07T15:07:49Z to 2026-09-07T15:11:00Z.

## Item 1 — `repair --offline`

Command: `node <scaffold-tip>/dist/bin/main.js repair --offline`

Output:

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

`git status --short` immediately after:

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

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Hunk (methods loop):

```diff
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
```

Hunk (examples case, "documents an example for every Surface function"):

```diff
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
```

Hunk (examples loop):

```diff
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
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
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

No other change to `tests/guides.test.ts`. The import-walk `findMissing(names, surface)` call
(already-strings arguments) was left unchanged, per the brief.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1, before edits, printed:

```
src/core/Emitter.ts:12:1: error policy(no-banned-term): Replace just in this comment: delete.
src/core/Emitter.ts:119:3: error policy(no-banned-term): Replace just in this comment: delete.
```

Both are `policy/no-banned-term` diagnostics naming `just` (no `policy/no-malformed-summary`
diagnostic was printed, matching the standing conditions' `summary 0 | banned 2`). The line-12
diagnostic points at the doc-block comment opening (`/**` at line 12); the banned term inside that
block sits at line 25.

`src/core/Emitter.ts` — line 25, sent by the line-12 doc-block diagnostic:

```diff
- *   surfaces (not just the first), and with no `error` handler a throw is swallowed
+ *   surfaces (not only the first), and with no `error` handler a throw is swallowed
```

`src/core/Emitter.ts` — line 119, sent by the line-119 diagnostic:

```diff
-		// rethrown, never stopping a sibling. EVERY throwing listener surfaces, not just the first.
+		// rethrown, never stopping a sibling. EVERY throwing listener surfaces, not only the first.
```

`npx oxlint --config .oxlintrc.json --deny-warnings .` after these two edits printed nothing (exit
0).

`npm run test:policy` (before the prose-sweep edits) reported the `prose` rule naming:

```
{ "line": 55, "message": "prose carries no banned term: just (delete)", "path": "README.md" }
{ "line": 91, "message": "prose carries no banned term: just (delete)", "path": "guides/emitter.md" }
```

Matching the standing conditions' recorded reading exactly. Both lines are in scope (the Owned row
"the lines the prose sweep names in `guides/**` and `README.md`").

`README.md` — line 55:

```diff
-runs regardless, and every throw surfaces (not just the first).
+runs regardless, and every throw surfaces (not only the first).
```

`guides/emitter.md` — line 91:

```diff
-3. **Listener isolation routes errors.** … EVERY throwing listener surfaces (not just the first); with no `error` handler, a throw is swallowed silently. …
+3. **Listener isolation routes errors.** … EVERY throwing listener surfaces (not only the first); with no `error` handler, a throw is swallowed silently. …
```

No diagnostic named an off-limits file. No other line in either file was changed.

## Item 4 — the bump

`package.json`:

```diff
-	"version": "0.0.9",
+	"version": "0.0.10",
```

`package-lock.json` was not touched.

## Criteria, cheapest first

1. `git status --short` after `npm run format` (run once, to converge before `format:check`):

```
 M .oxlintrc.json
 M README.md
 M configs/helpers.ts
 M configs/policy.ts
 M guides/emitter.md
 M package.json
 M src/core/Emitter.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is exactly the P21 repair list plus `tests/guides.test.ts`, plus the three files item 3
edited (`src/core/Emitter.ts`, `README.md`, `guides/emitter.md`), plus `package.json` (`version`).
`.oxlintrc.json` and `package.json` were already in the repair list; `package.json` carries both
the repair unit's `docs` script row and this unit's version bump. Item 3's `src/core/Emitter.ts`
diagnostic and `README.md`/`guides/emitter.md` prose-sweep hits are the files item 3 edited, listed
with their diagnostics above.

2. Gates, in order:

```
$ npm run format:check
Checking formatting...
All matched files use the correct format.
Finished in 3671ms on 38 files using 4 threads.
EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
(no output)
EXIT 0

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
EXIT 0
```

3. Test suites:

```
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  20 passed (20)
EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
EXIT 0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
EXIT 0
```

4. `npm run docs`, verbatim, exits 1 (expected — the converge unit's worklist):

```
guides/emitter.md function createEmitter: guide "Create an `EmitterInterface<TMap>`, optionally with initial `on` hooks." source "Creates a typed event emitter — the foundational observable primitive."
guides/emitter.md function extractKeys: guide "Extract an object's own enumerable keys, typed as its key union." source "Extracts the own enumerable keys of a mapped object, typed as its key union."
guides/emitter.md class Emitter: guide "The typed synchronous emitter; entities own one as `#emitter`." source "Implements a typed synchronous event emitter — the foundational observable primitive of the codebase. Stateful entities OWN one as a `#emitter` field and expose it through `readonly emitter`; they never inherit from it."
guides/emitter.md type EventMap: guide absent source "Maps each event name to the argument tuple its listeners receive."
guides/emitter.md type EmitterHandler: guide absent source "Represents a listener for one event's argument tuple."
guides/emitter.md type EmitterErrorHandler: guide absent source "Represents the emitter's OWN listener-error handler — invoked when a listener throws during `emit`, with the caught error and the (stringified) event name."
guides/emitter.md type EmitterHooks: guide absent source "Declares the initial event listeners for an emitter — the reserved `on` option: a partial map of event name to its handler, wired at construction."
guides/emitter.md interface EmitterOptions: guide absent source "Configures `createEmitter` and the `Emitter` constructor."
guides/emitter.md interface EmitterInterface: guide absent source "Represents a typed synchronous event emitter — the foundational observable primitive. Entities OWN one as `#emitter` and expose `readonly emitter`; they never inherit from it."
guides/emitter.md EmitterInterface.on: guide absent source "Registers a listener for an event. Does nothing after `destroy()`."
guides/emitter.md EmitterInterface.once: guide absent source "Registers a listener that removes itself after its first call. Does nothing after `destroy()`."
guides/emitter.md EmitterInterface.off: guide absent source "Removes a listener registered for an event, including one registered through `once`."
guides/emitter.md EmitterInterface.emit: guide absent source "Invokes an event's listeners synchronously, in registration order. Does nothing after `destroy()`."
guides/emitter.md EmitterInterface.count: guide absent source "Returns the live listener count."
guides/emitter.md EmitterInterface.clear: guide absent source "Drops registered listeners, leaving the emitter usable and `destroyed` unchanged."
guides/emitter.md EmitterInterface.destroy: guide absent source "Tears down the emitter: drops every listener and sets `destroyed` to `true`. Idempotent."
guides/emitter.md pitch: readme absent tagline "The foundational observable primitive: a typed, synchronous event emitter. Every stateful entity in the codebase — a queue, a database table, an agent — that has lifecycle transitions or observable operations owns one `Emitter<TMap>` as a `#emitter` field and exposes it through a `readonly emitter` property; consumers subscribe through `entity.emitter.on(...)`. Composition, never inheritance: an entity threads its event map and an optional error handler into the emitter and otherwise forgets it exists. It is deliberately small. There is no scheduler — `emit` fires listeners in the current tick, in registration order. There is no listener cap, no `max`-listeners warning, and no `console` output. `on` returns `void`, not an `Unsubscribe`. What it does carry is the one invariant a fan-out primitive can't omit: a throwing listener is isolated so it can never take down its siblings or the emit loop. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 17
EXIT 1
```

Matches the P21 reading exactly, confirming the worklist is unchanged by this unit's edits.

## Deviations

None. `repair` wrote only the P21 list, every before-text was found verbatim, no voice diagnostic
named an off-limits file, `test:policy` reddened only on the two recorded lines in `guides/**` and
`README.md`, and every gate other than `docs` read green after the items.
