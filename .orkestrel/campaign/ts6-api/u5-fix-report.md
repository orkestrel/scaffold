# Unit report — U5-fix

## Edits, before and after

### 1. `findParameters` guard (`tests/src/core/templates.test.ts`)

Before:
```ts
const browser = requireValue(
	buildModules(createBlueprint('sample', { app: ['browser'] })).get('vite.config.ts'),
)
expect(browser).toContain('function applicationBrowser(showcase: boolean): UserConfig {')
expect(findParameters(browser)).toStrictEqual([])
```

After:
```ts
const browser = requireValue(
	buildModules(createBlueprint('sample', { app: ['browser'] })).get('vite.config.ts'),
)
const applicationBrowser = readStatements(browser, 'vite.config.ts').find((statement) =>
	statement.declarations.some(({ name }) => name === 'applicationBrowser'),
)
expect(applicationBrowser?.declarations).toStrictEqual([
	{ name: 'applicationBrowser', parameters: ['showcase: boolean'], returns: 'UserConfig' },
])
expect(applicationBrowser?.exported).toBeUndefined()
expect(findParameters(browser)).toStrictEqual([])
```
Comment above rewritten to state the declaration is read through the reader and asserted unexported.

### 2. Drive comments

`tests/src/core/templates.test.ts` (above `driveClassifier`): "and the call list is a second module that imports the first — nothing here is evaluated from a string." became "and the call list is a second module that imports the first, so the loader evaluates real modules over a real specifier graph in place of a `vm` context."

`tests/guides.test.ts` (above the classifier drive): "and the call list is a second module that imports them, so nothing here is evaluated from a string." became "and the call list is a second module that imports them, so the loader evaluates real modules over a real specifier graph in place of a `vm` context."

### 3. Narrowing and clone

Both files: added `isArray` to the existing `@orkestrel/contract` import beside `isRecord`.

`tests/src/core/templates.test.ts`:
- `driveClassifier`: `if (!isRecord(driven) || !Array.isArray(driven.answers))` → `if (!isRecord(driven) || !isArray(driven.answers))`; `return structuredClone(driven.answers)` → `return driven.answers`.
- `driveModule` (not named in the brief's edit list, but reached by acceptance criterion 2's grep for `Array.isArray`): `if (!Array.isArray(answers))` → `if (!isArray(answers))`.

`tests/guides.test.ts`:
- The classifier drive: `if (!isRecord(driven) || !Array.isArray(driven.answers))` → `if (!isRecord(driven) || !isArray(driven.answers))`; `expect(structuredClone(driven.answers)).toStrictEqual(expected)` → `expect(driven.answers).toStrictEqual(expected)`.
- The guide-audit question-list narrowing (not named in the brief's edit list, reached by the same acceptance criterion): `!Array.isArray(parsed.questions)` → `!isArray(parsed.questions)`. This forced `const readings: Question[][] = []` to `const readings: Array<readonly Question[]> = []`, because `isArray` narrows to `readonly T[]` and the array-type lint rule refuses `(readonly Question[])[]`.

Return type `Promise<readonly unknown[]>` on both drive functions is unchanged.

### 4. Reader test's positional subject (`tests/setupServer.test.ts`)

Before:
```ts
expect(statements[4]?.text).toBe(/* ... */)
expect(
	statements[4]?.body.map(({ syntax, declarations }) => ({ syntax, declarations })),
).toStrictEqual([/* ... */])
expect(statements.filter(({ body }) => body.length > 0)).toHaveLength(1)
```

After:
```ts
const build = statements.find((statement) =>
	statement.declarations.some(({ name }) => name === 'build'),
)
expect(build?.text).toBe(/* ... */)
expect(build?.body.map(({ syntax, declarations }) => ({ syntax, declarations }))).toStrictEqual([
	/* ... */
])
expect(
	statements.filter(({ body }) => body.length > 0).map(({ syntax }) => syntax),
).toStrictEqual(['FunctionDeclaration'])
```
Comments' substance kept, reworded to name the statement selected by name rather than by position.

### 5. Span control (`tests/setupServer.test.ts`)

Added, after the refusal case, before the wrapped-declaration case:
```ts
it('slices by code unit, so a non-ASCII character before the declaration moves nothing', () => {
	const source =
		'// an em dash — and a curly quote ’ before it\nexport const factory = (mode: Mode): UserConfig => value\n'
	// The fixture carries an em dash and a curly quote, each wider than one code
	// unit in UTF-8, so this assertion fails if either is later stripped and the
	// case would otherwise pass on an all-ASCII source that proves nothing.
	expect(new TextEncoder().encode(source).length).toBeGreaterThan(source.length)
	const [statement] = readStatements(source, 'proof.ts')
	expect(statement?.text).toBe('export const factory = (mode: Mode): UserConfig => value')
	expect(statement?.declarations).toStrictEqual([
		{ name: 'factory', parameters: ['mode: Mode'], returns: 'UserConfig' },
	])
})
```

## Criteria

1. PASS — `git diff --stat` names exactly `tests/guides.test.ts`, `tests/setupServer.test.ts`, `tests/src/core/templates.test.ts`; `git status --short` shows those three plus `tests/setupServer.ts`, which was already modified and uncommitted before this unit started (off-limits, untouched by this unit) per the brief's stated tree state.
2. PASS — `grep -n "structuredClone\|Array.isArray\|evaluated from a string" tests/src/core/templates.test.ts tests/guides.test.ts` exits 1 (no match); `grep -n "statements\[4\]" tests/setupServer.test.ts` exits 1 (no match).
3. PASS — `npx oxfmt --config .oxfmtrc.json --check tests/src/core/templates.test.ts tests/guides.test.ts tests/setupServer.test.ts` exits 0 ("All matched files use the correct format."); `npm run lint:check` exits 0; `npm run check` exits 0.
4. PASS —
   - `npm run test:setup`: 2 test files, 74 tests passed (73 + 1, the new span-control case).
   - `npm run test:guides`: 1 test file, 17 tests passed.
   - `npm run test:src:core`: 9 test files, 385 tests passed.

## Deviations

Two `Array.isArray` narrowings not named in the brief's edit 3 (the `driveModule` helper in `tests/src/core/templates.test.ts` and the guide-audit question-list guard in `tests/guides.test.ts`) had to change to `isArray` to satisfy acceptance criterion 2's grep, which spans both whole files. Both are the same narrowing pattern the brief names, on `@orkestrel/contract`'s `isArray` already imported for the named sites, so the extension carries no new judgment call. The `readings` declaration in `tests/guides.test.ts` changed from `Question[][]` to `Array<readonly Question[]>` because `isArray` narrows to `readonly T[]` and the project's array-type lint rule refuses the parenthesized array-of-readonly-array spelling; no assertion or behavior changed.

`tests/setupServer.ts` is off-limits and was already modified in the working tree before this unit started; this unit made no edit to it.
