# Report — unit guide-regex

## Failing-first proof

Command: `npm run test:src:core -- tests/src/core/helpers.test.ts`

Before the regex change: 2 failed, 223 passed (225 total).

```
FAIL  |src:core| tests/src/core/helpers.test.ts > extractMemberMethods > counts an optional method whose type params precede the parameter list
AssertionError: expected [] to deeply equal [ 'transaction' ]

FAIL  |src:core| tests/src/core/helpers.test.ts > extractExampleMethods > collects an optional method whose type params precede the parameter list
AssertionError: expected [] to deeply equal [ 'transaction' ]

Test Files  1 failed (1)
     Tests  2 failed | 223 passed (225)
```

After the regex change: 225 passed (225 total), 0 failed.

```
Test Files  1 passed (1)
     Tests  225 passed (225)
```

## Diff hunks

```diff
diff --git a/src/core/helpers.ts b/src/core/helpers.ts
index 7751c38..3bd648a 100644
--- a/src/core/helpers.ts
+++ b/src/core/helpers.ts
@@ -1192,7 +1192,7 @@ export function extractMemberMethods(lines: readonly string[]): readonly string[]
 	const methods: string[] = []
 
 	for (const line of extractSourceLines(lines.join('\n'))) {
-		const method = line.code.match(/^\t(?:async )?\*?(\w+)(<.*>)?\??\(/)
+		const method = line.code.match(/^\t(?:async )?\*?(\w+)\??(<.*>)?\(/)
 		if (method?.[1] !== undefined) methods.push(method[1])
 	}
 
@@ -1525,7 +1525,7 @@ export function extractExampleMethods(lines: readonly string[]): readonly string[]
 	const seen = new Set<string>()
 
 	for (const line of extractExampleLines(extractSourceLines(lines.join('\n')))) {
-		const method = line.code.match(/^\t(?:async )?\*?(\w+)(<.*>)?\??\(/)
+		const method = line.code.match(/^\t(?:async )?\*?(\w+)\??(<.*>)?\(/)
 		const name = method?.[1]
 		if (isNonEmptyString(name) && !seen.has(name)) {
 			seen.add(name)
```

Both new tests were added to `tests/src/core/helpers.test.ts`:

- `extractMemberMethods > counts an optional method whose type params precede the parameter list`, using `'\ttransaction?<R>(scope: DriverScope<R>): Promise<R>'`.
- `extractExampleMethods > collects an optional method whose type params precede the parameter list`, using the same member preceded by an `@example` JSDoc block.

Both keep the existing `records?(` and `fold<T extends X<Y>>(` cases in the same `describe` blocks, so `name?(` and `name<T>(` coverage remains.

## Gate commands and exit codes

| Command | Exit code |
| --- | --- |
| `npm run test:src:core -- tests/src/core/helpers.test.ts` | 0 (225 passed) |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run test:guides` | 0 (27 passed) |

## Sweep result

Searched `src/core/helpers.ts` for the pattern `(<.*>)?\??\(` (any regex of that shape). The only two matches are the two named sites at lines 1195 and 1528, both already repaired. No other site of this shape exists in the file.

## TSDoc and guide review

Read the TSDoc above both `extractMemberMethods` (`src/core/helpers.ts:1177`) and `extractExampleMethods` (`src/core/helpers.ts:1508`, adjacent block). Both describe the optional form as `records?(` and `walk(): void`-style examples; neither states the wrong precedence order between `?` and `<...>`, so neither became false and neither needed amendment. `guides/guide.md` was checked for prose about these two functions; it carries no sentence asserting the reversed-precedence shape, so no amendment was required there. `tests/guides.test.ts` was not touched because no fence transcription of either function changed.

## Touched files

- `src/core/helpers.ts` — regex repair at both sites (`extractMemberMethods`, `extractExampleMethods`).
- `tests/src/core/helpers.test.ts` — one new test case added to each function's `describe` block.

`guides/guide.md` and `tests/guides.test.ts` were reviewed and required no change.

## Deviations

None. The repair matched the brief exactly, both sites carry `/^\t(?:async )?\*?(\w+)\??(<.*>)?\(/`, and the sweep found no additional site outside the two named.
