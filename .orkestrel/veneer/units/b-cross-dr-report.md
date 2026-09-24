# Unit RESIDUE (`dr`) report

## Edits

### `tests/fixtures/oracle/inventory.json`

Before:

```json
{
	"version": "5.3.8",
	"digests": {
		"bootstrap.css": "4a50207b956a4ab943640ee993118b554a34e96a23261cfe58b9aa1807a7849b",
		"bootstrap.rtl.css": "39911412c957c60512a4b23a0ea1903ed5f3a0f9f7bb7446c55a99bb2e5f7463"
	},
```

After:

```json
{
	"version": "5.3.8",
	"digests": {
		"bootstrap.css": "4a50207b956a4ab943640ee993118b554a34e96a23261cfe58b9aa1807a7849b"
	},
```

The `bootstrap.rtl.css` entry is gone, and the `digests` object holds `bootstrap.css` alone.

### `tests/setupServer.test.ts` (the pin case)

Before:

```ts
expect(inventory.digests['bootstrap.css']).toBe(BOOTSTRAP_CSS_DIGEST)
expect(inventory.components.btn?.rules.map((rule) => rule.selector)).toContain('.btn')
```

After:

```ts
expect(inventory.digests['bootstrap.css']).toBe(BOOTSTRAP_CSS_DIGEST)
expect(Object.keys(inventory.digests)).toEqual(['bootstrap.css'])
expect(inventory.components.btn?.rules.map((rule) => rule.selector)).toContain('.btn')
```

## Failing-first run

Command, run with the assertion added and the `bootstrap.rtl.css` entry still present in
`inventory.json`:

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts
```

Red result line for the target case, retained at `.orkestrel/veneer/units/dr-instruments/dr-red.log.txt`:

```
FAIL  |setup| tests/setupServer.test.ts > server setup > pins the copied inventory release and digests and reads its component vocabulary
```

The failure sits on the `expect(Object.keys(inventory.digests)).toEqual(['bootstrap.css'])` line
(line 579 at that point). Two other cases in the same file failed for an unrelated reason: the
worktree carried no `dist/` directory yet, so `readBuiltCascade` and the forbidden-runtime scan
against a built entry each raised `ENOENT`. Building the worktree (`npm run build`) resolved both
before the acceptance-criteria gate ran; neither file `dr` owns caused that failure and neither
gate is scoped to `dr`.

## Gates

Each command as it ran, with its result line, after the `bootstrap.rtl.css` entry was removed and
`npm run build` produced `dist/`:

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts
Test Files  1 passed (1)
Tests  101 passed (101)
```

```
npm run format:check
All matched files use the correct format.
```

```
npm run lint:check
(no output; exit 0)
```

```
npm run check
(tsc --noEmit across every project and vue-tsc --noEmit; exit 0)
```

## Review evidence

- `.orkestrel/veneer/units/dr.diff` — the `git diff` output, touching only `tests/fixtures/oracle/inventory.json`
  and `tests/setupServer.test.ts`.
- `.orkestrel/veneer/units/dr-status.txt` — the `git status --porcelain` output, naming the same pair.
- `.orkestrel/veneer/units/dr-instruments/dr-red.log.txt` — the failing-first run.
- `.orkestrel/veneer/units/b-cross-dr-report.md` — this report.

## Scope

No file outside the owned pair carries a durable edit. `npm run build` populated `dist/`, which
`.gitignore` excludes and `git status --porcelain` does not list.
