P5 is implemented. The Process suite remains a host observation because its unrelated Windows grandchild cleanup assertion repeated red; the P5 behavior rows pass.

## Diff

```diff
--- src/core/constants.ts
+++ src/core/constants.ts
@@
 	'spawn',
 	'timeout',
+	'input',
 	'duplicate',

--- src/server/Process.ts
+++ src/server/Process.ts
@@
-	#inputEvent = false
 	#inputFault: Error | undefined
@@
-	this.#child.stdin.on('error', (cause) => this.#failInput(cause, true))
+	this.#child.stdin.on('error', (cause) => this.#failInputStream(cause))
@@
-	this.#failInput(error)
+	this.#failInputCallback(error)
@@
-	if (error !== undefined && error !== null && !this.#inputEvent) {
-		this.#inputFault = error
-	}
-	if (this.#input === 0 && this.#inputEvent) {
-		this.#inputEvent = false
-		this.#inputFault = undefined
-	}
+	if (error !== undefined && error !== null) this.#inputFault = error
+	if (this.#input === 0) this.#inputFault = undefined
@@
-	#failInput(cause: Error, emitted = false): void {
-		if (emitted && (this.#input > 0 || this.#inputFault !== undefined)) {
+	#failInputStream(cause: Error): void {
+		if (this.#child.stdin.writableEnded || this.#input > 0 || this.#inputFault !== undefined) {
 			this.#settleWrites()
 			return
 		}
+		this.#failInputCallback(cause)
+	}
+
+	#failInputCallback(cause: Error): void {
 		if (this.#failure !== undefined || this.#terminating) return

--- src/server/execution/execute.ts
+++ src/server/execution/execute.ts
@@
 	if (result.failed && strict) {
+		if (inputFailure.signal.aborted) {
+			throw new ProcessError(`Command '${result.command}' failed while writing standard input`, {
+				code: 'input',
+				context: { command: result.command, code: result.code, signal: result.signal },
+				cause: inputFailure.signal.reason,
+				result,
+			})
+		}
 		throw createExecuteError(result, cause)
 	}

--- tests/src/server/execution/execute.test.ts
+++ tests/src/server/execution/execute.test.ts
@@
 	expect(result.failed).toBe(true)
+	expect(result).toMatchObject({
+		expired: false,
+		aborted: false,
+		truncated: false,
+		code: 0,
+		signal: null,
+	})
+	expect(isProcessError(thrown) ? thrown.code : undefined).toBe('input')
+	expect(isProcessError(thrown) ? thrown.message : undefined).toBe(
+		`Command '${result.command}' failed while writing standard input`,
+	)
```

[guides/process.md](C:/Users/mikes/WebstormProjects/process/guides/process.md) now documents the `input` code, strict rejection message, and residual result signature. `ProcessErrorCode` and `isProcessError` derive the added member from `PROCESS_ERROR_CODES`; they required no separate implementation edit.

## Acceptance evidence

### Status

Before, exit `0`:

```text
 M guides/process.md
 M package.json
 M src/core/types.ts
 M src/server/Process.ts
 M src/server/execution/execute.ts
 M tests/distribution.test.ts
 M tests/src/server/Process.test.ts
 M tests/src/server/execution/execute.test.ts
```

After, exit `0`:

```text
 M guides/process.md
 M package.json
 M src/core/constants.ts
 M src/core/types.ts
 M src/server/Process.ts
 M src/server/execution/execute.ts
 M tests/distribution.test.ts
 M tests/src/server/Process.test.ts
 M tests/src/server/execution/execute.test.ts
```

The status delta is the amendment-owned `src/core/constants.ts`. `git diff --check` exited `0`.

### Formatting and lint

Final Oxfmt check, exit `0`:

```text
Checking formatting...
All matched files use the correct format.
Finished in 499ms on 8 files using 16 threads.
```

Oxlint, exit `0`:

```text
npx.cmd oxlint --config .oxlintrc.json --deny-warnings \
  src/server/Process.ts src/server/execution/execute.ts src/core/types.ts \
  src/core/errors.ts src/core/constants.ts \
  tests/src/server/execution/execute.test.ts tests/src/server/Process.test.ts
```

### Typecheck

Exit `0`:

```text
npx.cmd tsc --noEmit --project tsconfig.json
```

### Failing-first pairs

F3 mutation control changed `expired` to `true`. Exit `1`:

```text
Test Files  1 failed (1)
Tests       1 failed | 14 passed (15)

Expected: "expired": false
Received: "expired": true
```

F3 final assertion is included in the green execute run.

F7 before implementation, exit `1`:

```text
Test Files  1 failed (1)
Tests       1 failed | 14 passed (15)

Expected: "input"
Received: "spawn"
```

F7 after implementation, exit `0`:

```text
Test Files  1 passed (1)
Tests       15 passed (15)
```

### Scoped suites

Execute file, exit `0`:

```text
Test Files  1 passed (1)
Tests       15 passed (15)
Duration    2.11s
```

Focused F1/F2 behavior rows, exit `0`:

```text
Test Files  1 passed (1)
Tests       2 passed | 43 skipped (45)
Duration    917ms
```

Process file observation repeated with exit `1`:

```text
Test Files  1 failed (1)
Tests       1 failed | 42 passed | 2 skipped (45)

FAIL tests/src/server/Process.test.ts
Process > kills a grandchild through the tree while the root is still live
AssertionError: expected true to be false
tests/src/server/Process.test.ts:590
```

The repeated reading reported the same unrelated timing-sensitive Windows grandchild assertion. The Orchestrator must retake this host reading as the brief prescribes.

Guide project, exit `0`:

```text
Test Files  1 passed (1)
Tests       97 passed | 2 skipped (99)
Duration    1.67s
```

Error-code membership proof, exit `0`:

```text
Test Files  1 passed (1)
Tests       3 passed (3)
```

## Deviation

Criterion 5’s full Process-file reading is an observation rather than green because the existing Windows grandchild cleanup assertion repeated red. The P5-specific behavior rows pass, and no P5 behavior proof remains red.