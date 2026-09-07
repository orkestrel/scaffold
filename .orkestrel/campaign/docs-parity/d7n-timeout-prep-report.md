# Report — `d7n-timeout-prep`

Wall clock: 2026-09-07T15:15:53Z (first command) to 2026-09-07T15:18:05Z (last command).

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..`

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

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Hunk 1 — methods loop:

```diff
-		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
-			const entity = group.interface.replace(/Interface$/, '')
-			describe(`${group.interface}`, () => {
-				it('documents at least one method', () => {
-					expect(group.methods.length).toBeGreaterThan(0)
-				})
-				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
-				})
-				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
-				})
-				it(`${entity} exposes no undocumented method`, () => {
-					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
-					expect(extra).toEqual([])
-				})
-			})
-		}
+		for (const group of guide.methods()) {
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
+			const entity = group.interface.replace(/Interface$/, '')
+			describe(`${group.interface}`, () => {
+				it('documents at least one method', () => {
+					expect(group.methods.length).toBeGreaterThan(0)
+				})
+				it('documents every interface method', () => {
+					expect(findMissing(members, documented)).toEqual([])
+				})
+				it('documents no phantom method', () => {
+					expect(findMissing(documented, members)).toEqual([])
+				})
+				it(`${entity} exposes no undocumented method`, () => {
+					const extra =
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
+					expect(extra).toEqual([])
+				})
+			})
+		}
```

Hunk 2 — `findUnexampled(names, fences, source.examples())` (Surface function example case) and the examples loop:

```diff
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
-		})
-
-		for (const group of guide.methods()) {
-			const entity = group.interface.replace(/Interface$/, '')
-			describe(`${group.interface} examples`, () => {
-				it('documents an example for every method', () => {
-					const fences = guide
-						.fences()
-						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
-						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
-				})
-			})
-		}
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
+		})
+
+		for (const group of guide.methods()) {
+			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			describe(`${group.interface} examples`, () => {
+				it('documents an example for every method', () => {
+					const fences = guide
+						.fences()
+						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
+						.map((fence) => fence.code)
+					const examples =
+						entity === group.interface
+							? source.examples(group.interface).map((example) => example.name)
+							: source
+									.examples(group.interface)
+									.map((example) => example.name)
+									.concat(source.examples(entity).map((example) => example.name))
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
+				})
+			})
+		}
```

The `findMissing` call whose arguments are already strings (the "imports only real exports in every `ts` fence" case, `findMissing(names, surface)`) was left unchanged, per the brief.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 exits 0 with no diagnostics: no `policy/no-malformed-summary` and no `policy/no-banned-term` hits.

`npm run test:policy` passes (`Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`); its `prose` check names no line in `guides/**` or `README.md`.

No edit made for this item; there was nothing to fix.

## Item 4 — the bump

```diff
-	"version": "0.0.9",
+	"version": "0.0.10",
```

`package-lock.json` was not edited.

## Acceptance criteria

1. `git status --short` after all items and `npm run format`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list plus `tests/guides.test.ts` (item 2) and `package.json` already carried the `docs` script row from `repair` and now also carries the version bump; item 3 edited no file.

2.
- `npm run format:check` — last lines: `All matched files use the correct format.` / `Finished in 2728ms on 41 files using 4 threads.` — exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings .` — no output — exit 0.
- `npm run check` — last line: `tsc --noEmit -p configs/src/tsconfig.core.json` with no diagnostics — exit 0.

3.
- `npm run test:guides` — `Test Files 1 passed (1)` / `Tests 26 passed (26)` — exit 0.
- `npm run test:policy` — `Test Files 1 passed (1)` / `Tests 90 passed | 1 skipped (91)` — exit 0.
- `npm run test:config` — `Test Files 1 passed (1)` / `Tests 172 passed | 1 skipped (173)` — exit 0.

4. `npm run docs` — exit 1 (expected), full worklist verbatim:

```
guides/timeout.md function createTimeout: guide "Create a `TimeoutInterface` deadline handle from `TimeoutOptions`." source "Creates a controllable deadline whose native signal aborts on expiry."
guides/timeout.md class Timeout: guide "The controllable `setTimeout` wrapper; implements `TimeoutInterface` exactly." source "Represents a controllable deadline whose native `AbortSignal` aborts when it expires."
guides/timeout.md const MAX_TIMEOUT_MS: guide "Largest accepted duration: `2_147_483_647` milliseconds." source "Names the largest timeout duration accepted by the package, in milliseconds."
guides/timeout.md function isTimeoutDuration: guide "Total validator for an integer in the inclusive timeout range." source "Determines whether a value is an accepted timeout duration."
guides/timeout.md function isTimeoutSignal: guide "Total native-brand validator for a genuine `AbortSignal`." source "Determines whether a value is a genuine native `AbortSignal`."
guides/timeout.md function validateTimeoutOptions: guide "Validate once-read timeout options and return a fresh copy omitting absent option keys." source "Validates and normalizes timeout construction options."
guides/timeout.md interface TimeoutOptions: guide absent source "Represents the options for constructing a timeout deadline."
guides/timeout.md interface TimeoutInterface: guide absent source "Represents a controllable deadline exposing a native `AbortSignal` that aborts on expiry."
guides/timeout.md TimeoutInterface.start: guide absent source "Arms or re-arms the deadline."
guides/timeout.md TimeoutInterface.clear: guide absent source "Cancels an armed deadline without aborting its signal and resets expiry state."
guides/timeout.md pitch: readme absent tagline "A controllable `setTimeout` wrapper that exposes an `AbortSignal` which fires on expiry, for racing work against a deadline. A `Timeout` carries a trace `id`, a deadline `ms`, and `start()` / `clear()` controls — arm the deadline, then race its `signal` against work to bound how long that work may run. The time-bound half of the substrate's time-and-cancellation pair. Deliberately thin: it is not a scheduler, not a debounce/throttle, not a retry policy — one `setTimeout` made re-armable, clearable, and parent-linkable. Its native `AbortSignal` is the complete observation surface; there is no separate event map. `start()` arms the deadline, `clear()` cancels it without firing, and calling `start()` again after an expiry swaps in a fresh signal, so a handle is reusable across deadlines without re-construction. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 11
```

This matches the P21 reading exactly and is the converge unit's worklist.

## Deviations

None. No `repair` path fell outside the P21 list, every before-text in item 2 matched verbatim, no voice diagnostic named an off-limits file (there were none), `test:policy` reported no red, and no gate other than `docs` read red after the items.
