# Last changes: budget

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `aa92b5f`, merge base with `origin/main` `4832970`, layer L1, declared version 0.0.8, registry version 0.0.8.

## Commits since origin/main

```text
924edf4 2026-08-28 Update every dependency to the published latest
a5d9e0c 2026-08-28 Adopt the catalog and guide mirrors for the wave
9df037f 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
e12d580 2026-09-01 Apply the verified src-audit fixes
8e061e3 2026-09-01 Adopt the renamed guide helpers in the parity test
ff2659b 2026-09-02 Apply the breaking rows in budget
e91addf 2026-09-02 Point the README at the guide the package ships
aa92b5f 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md      | 17 +++++++++--------
 README.md                        |  4 ++--
 package.json                     |  6 +++---
 src/core/Budget.ts               |  8 ++++----
 src/core/factories.ts            | 16 ++++++++--------
 src/core/helpers.ts              | 38 +++++++++++++++++++-------------------
 src/core/types.ts                | 52 ++++++++++++++++++++++++++--------------------------
 src/core/validators.ts           | 16 ++++++++--------
 tests/guides.test.ts             | 22 +++++++++++-----------
 tests/setup.test.ts              |  2 +-
 tests/setup.ts                   |  2 +-
 tests/src/core/Budget.test.ts    | 62 +++++++++++++++++++++++++++++++-------------------------------
 tests/src/core/factories.test.ts | 12 ++++++------
 tests/src/core/helpers.test.ts   | 18 +++++++++---------
 14 files changed, 138 insertions(+), 137 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/types.ts b/src/core/types.ts
index 7e833e6..ea962ea 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,68 +1,68 @@
 /**
- * Options for constructing a cumulative budget.
+ * Represents the options for constructing a cumulative budget.
  *
  * @remarks
- * `max` is a finite nonnegative ceiling. `consume` extracts the finite
+ * `max` is a finite nonnegative ceiling. `consumer` extracts the finite
  * nonnegative charge from each domain value. Omitted `id` values generate a
  * random UUID, and an optional native parent `signal` participates in the
  * exposed composite signal.
  *
  * @example
  * ```ts
- * const options: BudgetOptions<number> = { max: 100, consume: (value) => value }
+ * const options: BudgetOptions<number> = { max: 100, consumer: (value) => value }
  * ```
  */
 export interface BudgetOptions<T> {
-	/** Trace label for the budget; omission generates a random UUID. */
+	/** Holds the trace label for the budget; omission generates a random UUID. */
 	readonly id?: string
-	/** Finite nonnegative cumulative ceiling. */
+	/** Holds the finite nonnegative cumulative ceiling. */
 	readonly max: number
-	/** Extract the finite nonnegative charge from a consumed value. */
-	readonly consume: (value: T) => number
-	/** Native parent signal composed with the budget's owned exhaustion signal. */
+	/** Extracts the finite nonnegative charge from a consumed value. */
+	readonly consumer: (value: T) => number
+	/** Holds the native parent signal composed with the budget's owned exhaustion signal. */
 	readonly signal?: AbortSignal
 }
 
 /**
- * A cumulative cost handle whose native signal aborts at its ceiling.
+ * Represents a cumulative cost handle whose native signal aborts at its ceiling.
  *
  * @example
  * ```ts
  * const budget: BudgetInterface<number> = createBudget({
  * 	max: 100,
- * 	consume: (value) => value,
+ * 	consumer: (value) => value,
  * })
  * budget.consume(25)
  * ```
  */
 export interface BudgetInterface<T> {
-	/** Stable trace label. */
+	/** Holds the stable trace label. */
 	readonly id: string
-	/** Current native owned-or-parent-composed observation signal. */
+	/** Holds the current native owned-or-parent-composed observation signal. */
 	readonly signal: AbortSignal
-	/** Validated finite nonnegative ceiling. */
+	/** Holds the validated finite nonnegative ceiling. */
 	readonly max: number
-	/** Cumulative finite nonnegative accepted charges. */
+	/** Holds the cumulative finite nonnegative accepted charges. */
 	readonly consumed: number
-	/** Nonnegative headroom derived from `max` and `consumed`. */
+	/** Holds the nonnegative headroom derived from `max` and `consumed`. */
 	readonly remaining: number
-	/** Whether the cumulative tally has reached or exceeded `max`. */
+	/** Indicates whether the cumulative tally has reached or exceeded `max`. */
 	readonly exhausted: boolean
 	/**
-	 * Re-arm a fresh signal without resetting the cumulative tally.
+	 * Re-arms a fresh signal without resetting the cumulative tally.
 	 *
 	 * @returns Nothing
 	 */
 	start(): void
 	/**
-	 * Validate and atomically add the charge extracted from a domain value.
+	 * Validates and atomically adds the charge extracted from a domain value.
 	 *
 	 * @param value - Domain value passed to the configured consumer
 	 * @returns Nothing
 	 */
 	consume(value: T): void
 	/**
-	 * Reset the tally and re-arm a fresh signal.
+	 * Resets the tally and re-arms a fresh signal.
 	 *
 	 * @returns Nothing
 	 */
@@ -70,7 +70,7 @@ export interface BudgetInterface<T> {
 }
 
 /**
- * Token-usage field selected as the charge for a token budget.
+ * Names the token-usage field selected as the charge for a token budget.
  *
  * @example
  * ```ts
@@ -80,7 +80,7 @@ export interface BudgetInterface<T> {
 export type TokenScope = 'completion' | 'total' | 'prompt'
 
 /**
- * Options for constructing a token budget.
+ * Represents the options for constructing a token budget.
  *
  * @remarks
  * `scope` defaults to `completion`. All other fields have the same strict
@@ -92,18 +92,18 @@ export type TokenScope = 'completion' | 'total' | 'prompt'
  * ```
  */
 export interface TokenBudgetOptions {
-	/** Trace label for the budget; omission generates a random UUID. */
+	/** Holds the trace label for the budget; omission generates a random UUID. */
 	readonly id?: string
-	/** Finite nonnegative token ceiling. */
+	/** Holds the finite nonnegative token ceiling. */
 	readonly max: number
-	/** Token usage field charged per provider response. */
+	/** Names the token usage field charged per provider response. */
 	readonly scope?: TokenScope
-	/** Native parent signal composed with the budget's owned exhaustion signal. */
+	/** Holds the native parent signal composed with the budget's owned exhaustion signal. */
 	readonly signal?: AbortSignal
 }
 
 /**
- * Canonical finite nonnegative token counts reported for one provider call.
+ * Represents the canonical finite nonnegative token counts reported for one provider call.
  *
  * @example
  * ```ts
```
