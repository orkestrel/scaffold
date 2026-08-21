Unit G-fix is implemented. All acceptance criteria exited 0 after the required failing-first proofs.

## Diff

```diff
diff --git a/guides/program.md b/guides/program.md
index 24989dc..2edc261 100644
--- a/guides/program.md
+++ b/guides/program.md
@@ -653,6 +653,14 @@ aggregate-gate evaluation (when configured) to have produced no errors.
 
 A standalone `Program`:
 
+- reads the caller's definition once into an owned snapshot, runs construction
+  assertions against that copy, seals its plain-object graph, and exposes only the
+  sealed copy; a `Map`, `Set`, or `Date` reached through a reason `Check.value` is
+  cloned but its contents remain mutable because the seal cannot reach its internal
+  slots
+- refuses a value that structured cloning cannot copy, or a non-empty typed array
+  that cannot be frozen, with `ProgramError('DEFINITION')` and the host error as its
+  cause
 - borrows an injected reason engine or creates one shared quantitative-plus-logical engine
 - injects that engine into any internally created qualifier and rater
 - borrows independently injected qualifier and rater instances
diff --git a/src/core/programs/Program.ts b/src/core/programs/Program.ts
index c0b6824..fb47be8 100644
--- a/src/core/programs/Program.ts
+++ b/src/core/programs/Program.ts
@@ -60,10 +60,15 @@ import {
  * quantitative-plus-logical engine, injects it into the qualifier and rater it
  * creates, and destroys only what it owns. A definition failure during
  * construction (an invalid definition under `options.validate`) tears down
- * whatever the constructor had already allocated before throwing. `destroy()`
- * is idempotent and REENTRANCY-SAFE — the destroyed flag is set BEFORE any
- * teardown or the `destroy` event fires, so a listener that re-enters
- * `destroy()` is a no-op — and tears the emitter down last.
+ * whatever the constructor had already allocated before throwing. Construction
+ * snapshots the caller's definition once, runs the always-on assertions against
+ * that snapshot, and seals its plain-object graph before exposure. A `Map`, `Set`,
+ * or `Date` reached through a reason `Check.value` is cloned but remains mutable
+ * because its contents live in internal slots. Uncloneable values and non-empty
+ * typed arrays are refused with `ProgramError('DEFINITION')` and the host error
+ * as its cause. `destroy()` is idempotent and REENTRANCY-SAFE — the destroyed
+ * flag is set BEFORE any teardown or the `destroy` event fires, so a listener
+ * that re-enters `destroy()` is a no-op — and tears the emitter down last.
  */
 export class Program implements ProgramInterface {
 	readonly #emitter: Emitter<ProgramEventMap>
@@ -83,10 +88,29 @@ export class Program implements ProgramInterface {
 	readonly definition: ProgramDefinition
 
 	constructor(definition: ProgramDefinition, options?: ProgramOptions) {
-		assertProgramDefinition(definition)
-		this.id = definition.id
-		this.name = definition.name
-		this.definition = definition
+		let snapshot: ProgramDefinition
+		try {
+			snapshot = structuredClone(definition)
+		} catch (cause) {
+			const error = new ProgramError('DEFINITION', 'Program definition could not be cloned')
+			Object.defineProperty(error, 'cause', { configurable: true, value: cause, writable: true })
+			throw error
+		}
+		assertProgramDefinition(snapshot)
+		this.id = snapshot.id
+		this.name = snapshot.name
+		this.definition = snapshot
+		try {
+			this.#seal()
+		} catch (cause) {
+			const error = new ProgramError(
+				'DEFINITION',
+				'Program definition could not be sealed',
+				snapshot.id,
+			)
+			Object.defineProperty(error, 'cause', { configurable: true, value: cause, writable: true })
+			throw error
+		}
 		this.#emitter = new Emitter({
 			...(options?.on === undefined ? {} : { on: options.on }),
 			...(options?.error === undefined ? {} : { error: options.error }),
@@ -110,7 +134,7 @@ export class Program implements ProgramInterface {
 			const validation = this.validate()
 			if (!validation.valid) {
 				this.destroy()
-				throw new ProgramError('DEFINITION', validation.errors.join('; '), definition.id)
+				throw new ProgramError('DEFINITION', validation.errors.join('; '), snapshot.id)
 			}
 		}
 	}
@@ -276,4 +300,16 @@ export class Program implements ProgramInterface {
 			throw new ProgramError('DESTROYED', 'Program has been destroyed', this.id)
 		}
 	}
+
+	#seal(): void {
+		const pending: object[] = [this.definition]
+		while (pending.length > 0) {
+			const value = pending.pop()
+			if (value === undefined || Object.isFrozen(value)) continue
+			Object.freeze(value)
+			for (const child of Object.values(value)) {
+				if (child !== null && typeof child === 'object') pending.push(child)
+			}
+		}
+	}
 }
diff --git a/src/core/types.ts b/src/core/types.ts
index dbeb510..c387d95 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -124,7 +124,13 @@ export interface Tally {
  * final decision. An omitted `rating` authors an ELIGIBILITY-ONLY program — the
  * rater is never invoked, an eligible subject resolves to `'eligible'` (or
  * `'conditional'` under an applied condition or scoped restriction), status is
- * never `'unrated'`, and decisions remain reachable through `authority`.
+ * never `'unrated'`, and decisions remain reachable through `authority`. Program
+ * construction clones the definition and seals its plain-object graph. A `Map`,
+ * `Set`, or `Date` reached through a reason `Check.value` is cloned, but its
+ * contents remain mutable because the seal cannot reach its internal slots. A
+ * value that structured cloning cannot copy, or a non-empty typed array that
+ * cannot be frozen, is refused with `ProgramError('DEFINITION')` and the host
+ * error attached as its cause.
  */
 export interface ProgramDefinition {
 	readonly id: string
diff --git a/tests/src/core/programs/Program.test.ts b/tests/src/core/programs/Program.test.ts
index a2adc02..96cfb6e 100644
--- a/tests/src/core/programs/Program.test.ts
+++ b/tests/src/core/programs/Program.test.ts
@@ -148,6 +155,127 @@ describe('Program', () => {
+	describe('definition ownership', () => {
+		it('leaves cloned Map contents mutable because the seal cannot reach internal slots', () => {
+			const source = new Map([['before', 'owned']])
+			const authority = logicalDefinition('map-authority', 'Map authority', [
+				rule('map-value', [atom('candidate', 'equals', source)], atom('accepted', 'equals', true)),
+			])
+			const program = createProgram(
+				programDefinition('map-definition', 'Map definition', standardQualification, undefined, {
+					authority,
+				}),
+			)
+			const premise = program.definition.authority?.rules[0]?.premises[0]
+			if (premise?.form !== 'atom') throw new Error('Expected the stored premise to be an atom')
+			const value = premise.check.value
+			if (!(value instanceof Map)) throw new Error('Expected the stored check value to be a Map')
+
+			expect(value).not.toBe(source)
+			value.set('after', 'mutable')
+			// Object.freeze cannot reach a Map's internal entry slots, so the documented limit stays mutable.
+			expect(value.get('after')).toBe('mutable')
+			program.destroy()
+		})
+
+		it('contains an uncloneable function check value as DEFINITION with its cause', () => {
+			// Constructs a function-valued Check.value and asserts coded containment.
+		})
+
+		it('contains an unfreezable typed-array check value as DEFINITION with its cause', () => {
+			// Constructs a Uint8Array-valued Check.value and asserts coded containment.
+		})
+
+		it('keeps behavior unchanged after the caller mutates the source definition', () => {
+			// Existing owned-snapshot proof.
+		})
+
+		it('freezes the stored plain-object graph', () => {
+			// Existing plain-object freeze proof.
+		})
+	})
```

## Criterion 1: status scope

Before, exit code 0:

```text
 M guides/program.md
 M package.json
 M src/core/helpers.ts
 M src/core/programs/Program.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/programs/Program.test.ts
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

After, exit code 0:

```text
 M guides/program.md
 M package.json
 M src/core/helpers.ts
 M src/core/programs/Program.ts
 M src/core/types.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/programs/Program.test.ts
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

Only the owned `src/core/types.ts` file was added to the standing entries.

## Criterion 2: scoped format and lint

Formatter, exit code 0:

```text
Checking formatting...

All matched files use the correct format.
Finished in 447ms on 4 files using 16 threads.
npm notice run @orkestrel/program@0.0.9 npx
npm notice run oxfmt --config .oxfmtrc.json --check src/core/programs/Program.ts src/core/types.ts guides/program.md tests/src/core/programs/Program.test.ts
```

Linter, exit code 0:

```text
npm notice run @orkestrel/program@0.0.9 npx
npm notice run oxlint --config .oxlintrc.json --deny-warnings src/core/programs/Program.ts src/core/types.ts guides/program.md tests/src/core/programs/Program.test.ts
```

## Criterion 3: TypeScript

Exit code 0:

```text
npm notice run @orkestrel/program@0.0.9 npx
npm notice run tsc --noEmit --project tsconfig.json
```

## Criterion 4: failing-first pairs

Function-valued check before the fix, exit code 1:

```text
 RUN  v4.1.10 C:/Users/mikes/WebstormProjects/program

-------x----------------------------------------------------

 Test Files  1 failed (1)
      Tests  1 failed | 59 skipped (60)

 FAIL  |src:core| tests/src/core/programs/Program.test.ts > Program > definition ownership > contains an uncloneable function check value as DEFINITION with its cause
AssertionError: expected DOMException{ stack: 'DataCloneError…' } to match object { code: 'DEFINITION', …(1) }

- Expected
+ Received

- {
-   "cause": ObjectContaining {
-     "name": "DataCloneError",
-   },
-   "code": "DEFINITION",
+ DataCloneError {
+   "message": "() => undefined could not be cloned.",
  }
```

The same function-valued check after the fix, exit code 0:

```text
 RUN  v4.1.10 C:/Users/mikes/WebstormProjects/program

-------·----------------------------------------------------

 Test Files  1 passed (1)
      Tests  1 passed | 59 skipped (60)
   Duration  422ms (transform 124ms, setup 212ms, import 55ms, tests 4ms, environment 0ms)
```

Typed-array-valued check before the fix, exit code 1:

```text
 RUN  v4.1.10 C:/Users/mikes/WebstormProjects/program

--------x---------------------------------------------------

 Test Files  1 failed (1)
      Tests  1 failed | 59 skipped (60)

 FAIL  |src:core| tests/src/core/programs/Program.test.ts > Program > definition ownership > contains an unfreezable typed-array check value as DEFINITION with its cause
AssertionError: expected TypeError: Cannot freeze array buffer vie… to match object { code: 'DEFINITION', …(1) }

- Expected
+ Received

- {
-   "cause": Any<TypeError>,
-   "code": "DEFINITION",
+ TypeError {
+   "message": "Cannot freeze array buffer views with elements",
  }
```

The same typed-array-valued check after the fix, exit code 0:

```text
 RUN  v4.1.10 C:/Users/mikes/WebstormProjects/program

--------·---------------------------------------------------

 Test Files  1 passed (1)
      Tests  1 passed | 59 skipped (60)
   Duration  427ms (transform 133ms, setup 214ms, import 57ms, tests 4ms, environment 0ms)
```

The `Map` residual proof exited 0:

```text
 RUN  v4.1.10 C:/Users/mikes/WebstormProjects/program

------·-----------------------------------------------------

 Test Files  1 passed (1)
      Tests  1 passed | 59 skipped (60)
   Duration  416ms (transform 122ms, setup 207ms, import 51ms, tests 6ms, environment 0ms)
```

## Criterion 5: `src:core`

Exit code 0:

```text
 RUN  v4.1.10 C:/Users/mikes/WebstormProjects/program

··························································································································································································································

 Test Files  6 passed (6)
      Tests  218 passed (218)
   Duration  556ms (transform 717ms, setup 1.12s, import 436ms, tests 305ms, environment 1ms)
```

## Criterion 6: guides

Exit code 0:

```text
 RUN  v4.1.10 C:/Users/mikes/WebstormProjects/program

·······················

 Test Files  1 passed (1)
      Tests  23 passed (23)
   Duration  527ms (transform 101ms, setup 199ms, import 82ms, tests 97ms, environment 0ms)
```

Deviation: none.