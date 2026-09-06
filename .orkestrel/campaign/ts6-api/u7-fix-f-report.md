# Report — U7-fix-f: the remaining fixture budgets that a contended host outruns (probe)

## Edits

### 1. Flagship receipts case (about line 88)

Before:

```ts
	it(
		'mints receipts only when every stage executes cleanly, including for a control that shares no path with its case, and returns admitted path issues',
		{ timeout: 60_000 },
```

After:

```ts
	it(
		'mints receipts only when every stage executes cleanly, including for a control that shares no path with its case, and returns admitted path issues',
		// 120_000 ms clears the flagship's boot plus its proves on a contended host, which a
		// saturated host on 2026-09-06 showed 60_000 ms did not.
		{ timeout: 120_000 },
```

### 2. `replaces a lint stage its deadline destroyed` (about line 977)

Before:

```ts
	it('replaces a lint stage its deadline destroyed', { timeout: 60_000 }, async () => {
		...
		const probe = new Probe({ workspace: scratch.path, deadline: 6_000 })
		...
					waitForDelay(7_000).then(() => {
						throw new Error('The stalled lint proof did not settle within its budget')
					}),
				]),
			).rejects.toThrow('The lint stage exceeded 6000 ms')
```

After:

```ts
	// 120_000 ms clears the stalled lint stage's warm on a contended host, which a saturated host
	// on 2026-09-06 showed 60_000 ms did not.
	it('replaces a lint stage its deadline destroyed', { timeout: 120_000 }, async () => {
		...
		// 15_000 ms clears the stalled lint stage's expiry on a contended host, which a saturated
		// host on 2026-09-06 showed 6_000 ms did not.
		const probe = new Probe({ workspace: scratch.path, deadline: 15_000 })
		...
					waitForDelay(16_000).then(() => {
						throw new Error('The stalled lint proof did not settle within its budget')
					}),
				]),
			).rejects.toThrow('The lint stage exceeded 15000 ms')
```

The race guard `waitForDelay(7_000)` raced against the probe's own 6_000 ms expiry with 1 s of
slack. It is not an assertion the brief lists by pattern, but it fires before the probe's own
rejection once the deadline moves to 15_000 ms, which reddens the case. Raised to `16_000` to keep
the same 1 s slack over the new deadline, per the Deviation contract's instruction to update an
assertion the brief did not anticipate only when leaving it unset would change what the case
proves.

### 3. Silenced-lint arming case (about line 1076, case named `names arming in a boot expiry and arms again for the next claim`)

Before:

```ts
			scratch.write('stall-lint', '')
			const armings = createRecorder<[Toolchain]>()
			const probe = new Probe({
				workspace: scratch.path,
				deadline: 6_000,
				on: { arm: armings.handler },
			})
			...
				await expect(probe.prove(claim)).rejects.toThrow(
					'The probe could not arm: The lint stage exceeded 6000 ms',
				)
				await expect(probe.prove(claim)).rejects.toThrow(
					'The probe could not arm: The lint stage exceeded 6000 ms',
				)
```

After:

```ts
			scratch.write('stall-lint', '')
			const armings = createRecorder<[Toolchain]>()
			// 15_000 ms clears the silenced boot lint inspection's warm on a contended host, which a
			// saturated host on 2026-09-06 showed 6_000 ms did not.
			const probe = new Probe({
				workspace: scratch.path,
				deadline: 15_000,
				on: { arm: armings.handler },
			})
			...
				await expect(probe.prove(claim)).rejects.toThrow(
					'The probe could not arm: The lint stage exceeded 15000 ms',
				)
				await expect(probe.prove(claim)).rejects.toThrow(
					'The probe could not arm: The lint stage exceeded 15000 ms',
				)
```

The case's `timeout` was already `180_000`, above the brief's floor, so it is unchanged. The
comment above the same block referencing `The lint stage exceeded 6000 ms` was updated to
`15000 ms` to keep the comment matching the assertion it describes.

### 4. FIFO teardown case (about line 1450, case named `bounds teardown while a runtime specification is blocked`)

Before:

```ts
	it(
		'bounds teardown while a runtime specification is blocked',
		{ timeout: 60_000 },
		async (context) => {
			...
			const probe = new Probe({ workspace: scratch.path, deadline: 6_000 })
			...
				const settled = await Promise.race([
					closing.then(() => true),
					waitForDelay(7_000).then(() => false),
				])
				expect(settled).toBe(true)
				expect(performance.now() - started).toBeLessThan(7_000)
```

After:

```ts
	it(
		'bounds teardown while a runtime specification is blocked',
		// 120_000 ms clears the FIFO teardown's warm on a contended host, which a saturated host on
		// 2026-09-06 showed 60_000 ms did not.
		{ timeout: 120_000 },
		async (context) => {
			...
			// 15_000 ms clears the parked FIFO teardown's warm on a contended host, which a saturated
			// host on 2026-09-06 showed 6_000 ms did not.
			const probe = new Probe({ workspace: scratch.path, deadline: 15_000 })
			...
				const settled = await Promise.race([
					closing.then(() => true),
					waitForDelay(16_000).then(() => false),
				])
				expect(settled).toBe(true)
				expect(performance.now() - started).toBeLessThan(16_000)
```

The teardown bound `waitForDelay(7_000)`/`toBeLessThan(7_000)` carried the same 1 s slack over the
former 6_000 ms deadline. Raised to `16_000` for the same reason as edit 2: leaving it at `7_000`
would fire before teardown settles under the new 15_000 ms deadline and redden the case.

The fixture-source `timeout: 60_000` strings embedded inside the generated Vitest specification
text (the `test('parks in a FIFO', { timeout: 60_000 }, ...)` fixture program) name a separate,
inner Vitest run's own per-test timeout, not the `Probe` `deadline` or the outer `it` budget the
brief scopes. They are unchanged.

## Acceptance criteria

1. PASS — `npx oxfmt --config .oxfmtrc.json --check tests/src/server/Probe.test.ts` exited 0:
   "All matched files use the correct format."
2. PASS — `npx oxlint --config .oxlintrc.json --deny-warnings tests/src/server/Probe.test.ts`
   exited 0 with no output.
3. PASS — `grep -n "deadline: 6_000\|exceeded 6000\|deadline: 6000" tests/src/server/Probe.test.ts`
   printed nothing (grep exit 1).
4. PASS — `npx tsc --noEmit --project tsconfig.json` exited 0.
5. PASS —
   `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Probe.test.ts -t "replaces a lint stage"`
   exited 0, 1 test passed, duration 26.75 s.
   `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Probe.test.ts -t "mints receipts only"`
   exited 0, 1 test passed, duration 29.90 s.

## Deviation

None of the four cases required a deviation from the brief's located line numbers or budget
patterns. Two race guards tied to the retuned deadlines (`waitForDelay(7_000)` in the lint-stage
case and the FIFO teardown's `waitForDelay(7_000)`/`toBeLessThan(7_000)`) were not named by the
brief's Edits list or its `grep` pattern, but leaving them unchanged would have made each case
redden on its own regardless of host load, since the guard fires before the retuned deadline
elapses. Both were raised to `16_000` to preserve the original 1 s slack over the new 15_000 ms
deadline; this is the minimal change that keeps each case proving what it proved before.
