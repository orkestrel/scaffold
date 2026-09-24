# Report — TEST-DRIVEHOLD (the `builder` unit on Sonnet, agent a92de97c1720e205a, retained 2026-09-24)

**Diff of `driveHold` and its doc block** (`src/browser/helpers.ts`):
```diff
 * @throws Thrown when a pointer is already held, the resolver refuses, the target stays outside
- * the viewport after scrolling, or the press misses. A missed press that also fails to release
- * carries the release rejection as its cause.
+ * the viewport after scrolling, the frame wait fails, the pressed-state read fails, or the press
+ * misses. A frame wait or pressed-state read that fails releases the pointer before the refusal,
+ * and a failure whose release also fails carries the release rejection as its cause.
 *
 * @remarks
 * This is the one pointer drive every hold verb shares: ... the trusted move
- * and press, the marker, a frame wait, and the `:active` read-back that releases before refusing a
- * missed press. The refusal precedes resolution, so a double hold is refused before an absent
- * name is.
+ * and press, the marker, and the frame wait and the `:active` read-back that both release before
+ * refusing. The refusal precedes resolution, so a double hold is refused before an absent name is.
 ...
 	document.documentElement.setAttribute(POINTER_HOLD, `${String(x)}x${String(y)}`)
-	await waitForFrame()
-	if (!target.matches(':active')) {
+	try {
+		await waitForFrame()
+		if (!target.matches(':active'))
+			throw new Error(`Interactive target "${name}" did not enter the pressed state`)
+	} catch (error) {
 		try {
 			await releasePointer()
 		} catch (cause) {
-			throw new Error(`Interactive target "${name}" did not enter the pressed state`, { cause })
+			throw new Error(error instanceof Error ? error.message : String(error), { cause })
 		}
-		throw new Error(`Interactive target "${name}" did not enter the pressed state`)
+		throw error
 	}
 }
```

**Added case** (`tests/src/browser/helpers.test.ts`, inside `describe('driveHold')`): `'releases the pointer and rethrows when the pressed-state read fails after the marker is written'` — a real fixture button whose own `matches` data property throws `read refused`; asserts the rejection, that `POINTER_HOLD` is absent afterward, and that a following `driveHold` on a fresh button succeeds and is released.

**Red reading** (before the fix, `helpers.ts` stashed): `npm run test:src:browser -- tests/src/browser/helpers.test.ts -- -t driveHold` → `Test Files 1 failed (1)` / `Tests 1 failed | 343 passed | 2 expected fail (346)`, failing on `expected true to be false` for the `POINTER_HOLD` check.

**Green reading** (fix restored): `npm run test:src:browser -- tests/src/browser/helpers.test.ts -- -t driveHold` → `Test Files 1 passed (1)` / `Tests 344 passed | 2 expected fail (346)`.

**Guide sentence** (`guides/test.md`, around the `driveTraversal`/`driveHold` paragraph):
```
`driveTraversal` is that loop over any resolver, and `driveHold` is the one pointer drive every hold
verb shares, releasing the pointer before refusing when the frame wait or the pressed-state read
fails, as well as when the press misses; each verb supplies its resolver and the name its refusals
voice.
```

**Version edits**: `package.json` `version`: `0.0.22` → `0.0.23`. `package-lock.json` root `version` and `packages[""].version`: `0.0.22` → `0.0.23` (both). No other field changed in either file.

**Chain exit lines** (`tmp/drivehold/acceptance.log.txt`):
- `EXIT:0 for npm run format:check` — "All matched files use the correct format."
- `EXIT:0 for npm run lint:check` — no findings.
- `EXIT:0 for npm run check` — `tsc` clean across `tsconfig.json` and core/browser/server projects.
- `EXIT:0 for npm run build` — core, browser, server built; `Analysis will use the bundled TypeScript version 5.9.3` API Extractor notice only, not an error.
- `EXIT:0 for npm test`:
  - `test:src`: `Test Files 7 passed (7)` / `Tests 661 passed | 2 expected fail | 9 skipped (672)`
  - `test:policy`: `Test Files 1 passed (1)` / `Tests 109 passed | 1 skipped (110)`
  - `test:config`: `Test Files 1 passed (1)` / `Tests 173 passed | 1 skipped (174)`
  - `test:setup`: `Test Files 2 passed (2)` / `Tests 21 passed (21)`
  - `test:setup:browser`: `Test Files 1 passed (1)` / `Tests 6 passed (6)`
  - `test:guides`: `Test Files 1 passed (1)` / `Tests 50 passed | 1 skipped (51)`

**`git status --short`:**
```
 M guides/test.md
 M package-lock.json
 M package.json
 M src/browser/helpers.ts
 M tests/src/browser/helpers.test.ts
```

**`git diff --stat`:**
```
 guides/test.md                    |  4 +++-
 package-lock.json                 |  4 ++--
 package.json                      |  2 +-
 src/browser/helpers.ts            | 21 ++++++++++++---------
 tests/src/browser/helpers.test.ts | 18 ++++++++++++++++++
 5 files changed, 36 insertions(+), 13 deletions(-)
```

**Deviation state**: none. The `prove` MCP server was not called (not reachable to this subagent, per the brief's standing condition). The hostile `matches` read was arranged on the real fixture element as a data property, no mock or spy of project-owned behavior. No install, commit, push, or publish performed.
