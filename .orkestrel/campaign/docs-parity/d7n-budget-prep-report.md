# Report — `d7n-budget-prep`

Wall clock: 2026-09-07T15:03:43Z → 2026-09-07T15:06:23Z.

## Item 1 — `repair --offline`

Command: `node .../dist/bin/main.js repair --offline`

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

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Hunk (methods loop):

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

Hunk (examples case and examples loop):

```diff
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})

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
+		for (const group of guide.methods()) {
+			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
+			describe(`${group.interface} examples`, () => {
+				it('documents an example for every method', () => {
+					const fences = guide
+						.fences()
+						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
+						.map((fence) => fence.code)
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
+				})
+			})
+		}
```

The import-walk `findMissing(names, surface)` site was left unchanged (already string arguments).

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named exactly:

```
tests/setup.ts:6:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
tests/setup.ts:24:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
```

Both sites are in `tests/setup.ts`, in scope.

`tests/setup.ts:6` (`no-malformed-summary`):

```diff
- * Capture and narrow a contract error thrown by an operation.
+ * Captures and narrows a contract error thrown by an operation.
```

`tests/setup.ts:24` (`no-malformed-summary`):

```diff
- * Select a numeric value itself as a budget charge.
+ * Selects a numeric value itself as a budget charge.
```

Re-run after both edits: `npx oxlint --config .oxlintrc.json --deny-warnings .` exits 0, no output.

`npm run test:policy` after item 1 and the oxlint fixes named one `prose` diagnostic:

```
{
  "line": 23,
  "message": "prose carries no banned term: simply (delete)",
  "path": "guides/budget.md",
  "rule": "prose",
}
```

`guides/budget.md:23` (`policy/no-banned-term`, substitution-table row `simply` → delete):

```diff
- and `exhausted` is simply `consumed >= max` — both are live reads off the same counter.
+ and `exhausted` is `consumed >= max` — both are live reads off the same counter.
```

Re-run: `npm run test:policy` — `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`.

`npm run format` was run once, after the item 2 and item 3 edits, before the acceptance gates: `Finished in 3031ms on 40 files using 4 threads.` It touched no file outside the ones already listed here.

## Item 4 — the bump

```diff
-	"version": "0.0.9",
+	"version": "0.0.10",
```

`package-lock.json` was not touched.

## Acceptance criteria

**Criterion 1.** `git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/budget.md
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list (`.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`,
`package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
`tsconfig.json`, `scripts/docs.ts`) plus `tests/guides.test.ts` (item 2) plus the files item 3
edited (`tests/setup.ts`, `guides/budget.md`) — the same set item 3 names above with its
diagnostic — and nothing else.

**Criterion 2.**

`npm run format:check`:

```
All matched files use the correct format.
Finished in 2857ms on 40 files using 4 threads.
```

Exit 0.

`npx oxlint --config .oxlintrc.json --deny-warnings .`: no output, exit 0.

`npm run check`:

```
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
```

Exit 0 (no diagnostics printed).

**Criterion 3.**

`npm run test:guides`:

```
Test Files  1 passed (1)
     Tests  26 passed (26)
```

Exit 0. P21's five `record shapes` failures are gone; the suite passes in full against the `.0.18`
readers.

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

**Criterion 4.** `npm run docs` (verbatim, exit 1 — expected, the converge unit's worklist):

```
guides/budget.md function createBudget: guide "Create a `BudgetInterface<T>` for `max` with a `consumer`, optionally a trace `id` and a parent `signal`." source "Creates a cumulative budget whose native signal aborts at its ceiling."
guides/budget.md function createTokenConsumer: guide "Create a unary consumer that charges one selected `TokenUsage` field." source "Creates a validated token consumer for one selected usage field."
guides/budget.md function createTokenBudget: guide "Create a `BudgetInterface<TokenUsage>` charging a chosen `scope` field (`completion` default / `total` / `prompt`)." source "Creates a token budget charging one validated usage field per provider call."
guides/budget.md function isBudgetAmount: guide "Guard a finite nonnegative numeric budget amount." source "Determines whether a value is a valid budget amount."
guides/budget.md function isBudgetSignal: guide "Guard a genuine native `AbortSignal` without throwing on hostile input." source "Determines whether a value is a genuine native `AbortSignal`."
guides/budget.md function isTokenScope: guide "Guard a supported `TokenScope` field selector." source "Determines whether a value selects a supported token usage field."
guides/budget.md function isTokenUsage: guide "Guard three finite nonnegative token counts without throwing." source "Determines whether a value is readable token usage with valid numeric fields."
guides/budget.md function validateBudgetOptions: guide "Validate once-read budget options and return a fresh copy omitting absent optional keys." source "Validates and normalizes budget construction options."
guides/budget.md function validateTokenBudgetOptions: guide "Validate once-read token-budget options and return a fresh copy omitting absent optional keys." source "Validates and normalizes token-budget construction options."
guides/budget.md class Budget: guide "A cumulative consumption tally whose `signal` fires when `consumed` reaches the `max` ceiling." source "Represents a cumulative cost handle whose native `AbortSignal` aborts at its ceiling."
guides/budget.md interface BudgetOptions: guide absent source "Represents the options for constructing a cumulative budget."
guides/budget.md interface TokenBudgetOptions: guide absent source "Represents the options for constructing a token budget."
guides/budget.md interface BudgetInterface: guide absent source "Represents a cumulative cost handle whose native signal aborts at its ceiling."
guides/budget.md type TokenScope: guide absent source "Names the token-usage field selected as the charge for a token budget."
guides/budget.md interface TokenUsage: guide absent source "Represents the canonical finite nonnegative token counts reported for one provider call."
guides/budget.md BudgetInterface.start: guide absent source "Re-arms a fresh signal without resetting the cumulative tally."
guides/budget.md BudgetInterface.consume: guide absent source "Validates and atomically adds the charge extracted from a domain value."
guides/budget.md BudgetInterface.clear: guide absent source "Resets the tally and re-arms a fresh signal."
guides/budget.md pitch: readme absent tagline "The cost primitive: a cumulative consumption tally against a ceiling that exposes an `AbortSignal` firing the moment the budget is exhausted. You charge a `Budget<T>` as work spends — `consume(value)` adds to a running `consumed` total — and race its `signal` against that work to cap how much it may burn (tokens, bytes, calls). When `consumed` crosses `max`, `signal` aborts; fold it into a loop's bound so the loop stops generating after the budget is spent. This is the substrate's third bounding signal, a peer to a cancellation signal (fires on `abort()`) and a deadline signal (fires on expiry). All three are plain `AbortSignal`s by design, so an agent loop combines them into one bound with `AbortSignal.any([abort, timeout, budget])` and reacts to whichever trips first — cancel, deadline, or cost. A budget deliberately carries no Emitter, clock, or I/O: its native signal is the complete observation boundary. It is a functional counter with a signal bolted to its ceiling — nothing more, so the surface stays small. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 19
```

Exit 1, matching the P21 reading exactly.

## Deviations

None. No `repair` write landed outside the P21 list; every before-text matched verbatim; no
voice diagnostic named an off-limits file; `test:policy` reddened only on the standing-condition
line named in the brief; every other gate read green.


---

## Orchestrator annotation (slice 2 audit, 2026-09-07)

The audit read counts in this report's prose against the writing ban, and where it names a citation as stale against the tree the unit left (budget: `:51` and `:77` for `guides/budget.md:52` and `:80`; csv: `340:` for `guides/csv.md:339`) or a pin description in words the file does not carry, the tree is authoritative. The report stands as the unit's evidence with this note.
