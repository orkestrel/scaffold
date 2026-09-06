# Report — U7-fix-c: the resident-engine generalizations U7-fix-b could not reach (probe)

## Edits

### 1. `src/server/Probe.ts` (line 300)

Before:

```
				reason: 'the imported type changed after the resident type host cached it',
```

After:

```
				reason: 'the imported type changed on disk between the two inspections',
```

### 2. `src/server/types.ts` (lines 346-347)

Before:

```
 * it, which is why there is no verb that stops serving and leaves the resident engines running: a
 * probe nothing is reading from holds its resident tools for nobody.
```

After:

```
 * it, which is why there is no verb that stops serving and leaves the stages standing: a probe
 * nothing is reading from holds its tools and its mirror for nobody.
```

### 3. `src/server/types.ts` (line 383)

Before:

```
	 * @returns A promise that settles after the probe releases its resident engines
```

After:

```
	 * @returns A promise that settles after the probe releases every stage's tool and mirror
```

### 4. `src/core/types.ts` (line 460)

Before:

```
	 * answers before the resident stages are awaited, so it reads the same in every workspace state.
```

After:

```
	 * answers before any stage is awaited, so it reads the same in every workspace state.
```

### 5. `src/core/types.ts` (line 476)

Before:

```
	 * Tears down the resident engines and releases the processes they hold.
```

After:

```
	 * Tears down every stage and releases the processes and the mirror they hold.
```

## Acceptance criteria

1. `npx oxfmt --config .oxfmtrc.json --check src/server/Probe.ts src/server/types.ts src/core/types.ts` — PASS. Exit 0. Output: "All matched files use the correct format."
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/server/Probe.ts src/server/types.ts src/core/types.ts` — PASS. Exit 0. No output.
3. `grep -n "resident type host\|resident engines\|resident stages" src/server/Probe.ts src/server/types.ts src/core/types.ts` — PASS. Prints nothing (grep exit 1, no matches).
4. `npx tsc --noEmit --project tsconfig.json` — PASS. Exit 0. No output.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` — PASS. Exit 0. "Test Files 1 passed (1)", "Tests 13 passed (13)".

## Deviations

None. All five sentences were found exactly as the brief quoted them, at the lines named.
