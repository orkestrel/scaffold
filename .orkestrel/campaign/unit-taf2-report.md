Unit TAF2 complete. Both findings closed, all criteria green, no deviation.

## Touched files

| File | Change |
| ---- | ------ |
| `C:\Users\mikes\WebstormProjects\test\src\browser\helpers.ts` | Adds the exported `readLayers` leaf, rebuilds `readBackdrop` on it, and replaces `contrast`'s two-walk comparison with an opaque-termination reading from one walk. |
| `C:\Users\mikes\WebstormProjects\test\tests\src\browser\helpers.test.ts` | Adds the 64-layer regression pin to `contrast` and a `readLayers` block covering an empty stack, a transparent layer left out, opaque termination, and the deep stack. |
| `C:\Users\mikes\WebstormProjects\test\tests\src\server\helpers.test.ts` | Strengthens the file-source refusal to pin `code`, `syscall`, and `errno`, and records why identity is unreachable. |
| `C:\Users\mikes\WebstormProjects\test\guides\test.md` | Adds the `readLayers` Surface row, corrects the `contrast` refusal and `readBackdrop` mechanism prose, and updates the reader lists and coverage inventory. |

`src/browser/types.ts`, `src/browser/index.ts`, and `tests/guides.test.ts` were not edited: `Color` already declares the shape (`readonly Color[]` needs no new named type), the browser barrel is `export *`, and guide parity passes with the Surface row alone.

## Diffstat (this unit only)

The repository baseline is uncommitted, so `git diff` over these paths carries earlier units. This delta was measured against reconstructed pre-unit copies:

```text
src/browser/helpers.ts            | +60 -34
tests/src/browser/helpers.test.ts | +63  -0
tests/src/server/helpers.test.ts  |  +8  -2
guides/test.md                    | +30 -18
```

## Diff, mechanism hunks

`src/browser/helpers.ts` — the new leaf, `readBackdrop` rebuilt on it, and the refusal:

```diff
+export function readLayers(element: Element): readonly Color[] {
+	const layers: Color[] = []
+	for (let node: Element | null = element; node !== null; node = node.parentElement) {
+		const layer = parseColor(getComputedStyle(node).backgroundColor)
+		if (layer === undefined || layer[3] === 0) continue
+		layers.push(layer)
+		if (layer[3] &gt;= 1) break
+	}
+	return Object.freeze(layers)
+}
+
 export function readBackdrop(element: Element, floor: Color): Color {
-	const layers: Color[] = []
-	for (let node: Element | null = element; node !== null; node = node.parentElement) {
-		const layer = parseColor(getComputedStyle(node).backgroundColor)
-		if (layer === undefined || layer[3] === 0) continue
-		layers.push(layer)
-		if (layer[3] &gt;= 1) break
-	}
-	return layers.reduceRight((back, front) =&gt; blendColor(front, back), floor)
+	return readLayers(element).reduceRight((back, front) =&gt; blendColor(front, back), floor)
 }
```

```diff
 export function contrast(element: Element, floor?: Color): number {
 	const foreground = parseColor(getComputedStyle(element).color)
 	if (foreground === undefined) throw new Error('Computed foreground color is unavailable')
-	const backdrop = readBackdrop(element, floor ?? CANVAS_COLOR)
-	if (floor === undefined) {
-		const probed = readBackdrop(element, [0, 0, 0, 1])
-		if (probed.some((channel, index) =&gt; channel !== backdrop[index])) {
-			throw new Error('Computed background color is unavailable')
-		}
+	const layers = readLayers(element)
+	const deepest = layers.at(-1)
+	if (floor === undefined &amp;&amp; (deepest === undefined || deepest[3] &lt; 1)) {
+		throw new Error('Computed background color is unavailable')
 	}
+	const backdrop = layers.reduceRight(
+		(back, front) =&gt; blendColor(front, back),
+		floor ?? CANVAS_COLOR,
+	)
 	return measureContrast(blendColor(foreground, backdrop), backdrop)
 }
```

`tests/src/server/helpers.test.ts`:

```diff
-				// The `code` is what pins the rethrow: a fresh error written here would satisfy
-				// `toThrow(Error)` just as well, and the caller would lose the host's own refusal.
+				// The host-populated fields are what pin the rethrow. Object identity is unreachable
+				// without an injection seam admitting a known refusal, and this fallback rethrows an
+				// error the host constructed, so `syscall` and `errno` are the discriminator: a fresh
+				// error written here carries neither, and `code` alone is a field anyone can copy.
+				// `syscall` names the call the fallback rethrows from and `errno` is host-varying, so
+				// its value is read as the number the host reported rather than pinned to one.
 				const refusal = captureError(() =&gt; createLink(path, source))
 				expect(refusal).toBeInstanceOf(Error)
 				expect(refusal).toHaveProperty('code', 'EPERM')
+				expect(refusal).toHaveProperty('syscall', 'symlink')
+				expect(refusal).toHaveProperty('errno', expect.any(Number))
```

The guide's hunks are the `readLayers` Surface row after `measureContrast`; the `contrast` refusal sentence changed from "refuses a stack where nothing from the element upwards paints" to "refuses every stack whose walk reaches no fully opaque layer"; a new `readLayers` paragraph replacing the removed sentence "which is how `contrast` tells an unpainted stack from one that genuinely resolves to the floor's own color"; `readLayers` added to the two reader enumerations; and the coverage inventory extended with the deep-stack and `readLayers` cases.

## Criterion evidence, in order

**1. `git status --porcelain`** — identical before and after; the unit added nothing. Standing entries at start and at end (both readings identical): ` M guides/test.md`, `D  package-lock.json`, ` M package.json`, ` M src/browser/constants.ts`, ` M src/browser/factories.ts`, ` M src/browser/helpers.ts`, ` M src/browser/types.ts`, ` M src/core/helpers.ts`, ` M src/core/types.ts`, ` M src/server/factories.ts`, ` M src/server/helpers.ts`, ` M src/server/types.ts`, ` M tests/guides.test.ts`, ` M tests/setupServer.ts`, ` M tests/src/browser/factories.test.ts`, ` M tests/src/browser/helpers.test.ts`, ` M tests/src/core/helpers.test.ts`, ` M tests/src/server/factories.test.ts`, ` M tests/src/server/helpers.test.ts`, `?? package-lock.json`. Exit 0.

**2. Scoped format and lint** over `src/browser/helpers.ts src/browser/types.ts src/browser/index.ts guides/test.md tests/src/browser/helpers.test.ts tests/src/server/helpers.test.ts tests/guides.test.ts`:

```text
Checking formatting...
All matched files use the correct format.
Finished in 635ms on 7 files using 16 threads.
FMT_EXIT=0
```

`oxlint --config .oxlintrc.json --deny-warnings` over the same files minus the guide printed no diagnostics. `LINT_EXIT=0`.

**3. `npx.cmd tsc --noEmit --project tsconfig.json`** — no output. `TSC_EXIT=0`.

**4. Failing-first pairs.**

Pair A, command `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser -t 'rounded to the floor itself'`, test `contrast &gt; refuses a deep translucent stack whose composite has rounded to the floor itself`.

Red, against the two-walk `contrast`:

```text
 FAIL  |src:browser (chromium)| tests/src/browser/helpers.test.ts:1047:2 &gt; contrast &gt; refuses a deep translucent stack whose composite has rounded to the floor itself
AssertionError: expected [Function] to throw an error
- Expected: null
+ Received: undefined
 Test Files  1 failed | 1 skipped (2)
      Tests  1 failed | 132 skipped (133)
EXIT=1
```

Green, after the single-walk refusal:

```text
 Test Files  1 passed | 1 skipped (2)
      Tests  1 passed | 132 skipped (133)
EXIT=0
```

Pair B, command `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server -t 'refuses a source that exists as a file'`, test `createLink &gt; refuses a source that exists as a file and leaves the link path empty`. The plant is the audit's exact escape, `Object.assign(new Error('EPERM'), { code: 'EPERM' })` substituted for the captured refusal.

Control, plant in place against the weak assertions — the escape passes, so the old pin does not bind:

```text
 Test Files  1 passed | 1 skipped (2)
      Tests  1 passed | 115 skipped (116)
EXIT=0
```

Red, plant in place against the strengthened assertions:

```text
 FAIL  |src:server| tests/src/server/helpers.test.ts &gt; createLink &gt; refuses a source that exists as a file and leaves the link path empty
AssertionError: expected Error: EPERM { code: 'EPERM' } to have property "syscall" with value 'symlink'
- Expected: "symlink"
+ Received: undefined
 Test Files  1 failed | 1 skipped (2)
      Tests  1 failed | 115 skipped (116)
EXIT=1
```

Green, plant removed:

```text
 Test Files  1 passed | 1 skipped (2)
      Tests  1 passed | 115 skipped (116)
EXIT=0
```

The plant's removal is confirmed in the tree: `grep -rn "Object.assign(new Error" tests/ src/` returns nothing (exit 1), and the final block reads `const refusal = captureError(() =&gt; createLink(path, source))`.

**5. Per-project runs**, `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project &lt;name&gt;`:

```text
src:browser  Test Files 2 passed (2)   Tests 137 passed (137)              EXIT=0
src:server   Test Files 2 passed (2)   Tests 107 passed | 9 skipped (116)  EXIT=0
guides       Test Files 1 passed (1)   Tests  13 passed (13)               EXIT=0
```

The browser project was 132 before this unit and is 137 after; the added cases are the 64-layer `contrast` pin and the four `readLayers` cases. The nine `src:server` skips are the pre-existing `FILE_LINKS` conditional set on this Windows host. The `src:browser` run prints unhandled-error noise from the pre-existing journal test in `tests/src/browser/factories.test.ts`, which is deliberate and unrelated.

The bounded cases the brief protects all stayed green in those runs: the translucent-over-opaque case, both supplied-floor cases, the shallow translucent-only refusal, and `readBackdrop`'s floor-by-identity case.

## Judgment calls recorded

- **No new type.** `readLayers` returns `readonly Color[]`; `Color` already declares the element. A named alias would have been a type with no contract of its own.
- **`contrast` folds the stack it read** rather than calling `readBackdrop` again, because the brief fixes one walk. That repeats a single `reduceRight` expression between the two functions; a second exported leaf to hold the fold would have expanded the API past the brief's one export.
- **`errno` is pinned as a number, not a value.** Probed on this host, `symlinkSync` on a file source throws own keys `errno`, `code`, `syscall`, `path`, `dest`, with `code: 'EPERM'`, `syscall: 'symlink'`, `errno: -4048`. The `errno` value is host-varying, so the test reads the number the host reported instead of pinning `-4048`.
- **Guide prose rewrapped** where adding `readLayers` pushed a line past the surrounding column; no non-table line I wrote exceeds 100 characters.

## Deviation

None. No shared or off-limits file was written, so there are no patches to hand back. Probes and reconstructed pre-unit copies were written only to the session scratchpad, never to the subject tree.