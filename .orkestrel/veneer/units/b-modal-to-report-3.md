# Unit TOAST (`to`) round 3 report

Fix T7 is in place: every `TOAST_SLOT_CASES` row's token is proved to be the token its slot reads, including where another token declares the same length. The proof retunes the row's token alone on a wrapper and requires the slot to follow. Deviation state: none.

Role and engine: `opus` on Opus 5.5, native Claude subagent, worktree `/home/user/veneer-to` at `2a3f223`. Brief: `b-modal-to-brief-3.md`. Verdict: `to-audit-2-verdict.md`.

- **Owned file changed:** `tests/src/styles/components/toast.test.ts` alone.
- **Shared patch:** `.orkestrel/veneer/units/to-shared-3.patch` is byte-identical to the `to-shared-2.patch` file. The `cmp` command reports no difference, and `git apply --check` of it on a fresh `git archive 2a3f223` extract exits 0.
- **Gates:** every gate the brief names exits 0.

## T7: the token-identity proof

**File.** `tests/src/styles/components/toast.test.ts`, the `toast box` slot case. The brief left the choice of file open. I placed the retune assertion in the style proof, because only a browser reading resolves a token that a wrapper retunes. The `toast case tables` case in the `tests/setupStyles.test.ts` file keeps its round-2 length binding unchanged.

**Before:**

```ts
it.each(TOAST_SLOT_CASES)('reads $property from its own token', ({ property, token, pixels }) => {
	const host = scene.mount(
		`<div class="toast show">Oak shipment<span data-probe style="display:block;width:var(${property})"></span></div>`,
	)
	const toast = requireValue(host.querySelector('.toast'), 'No toast')
	expect(readToken(toast, property)).toBe(readToken(toast, token))
	expect(readPixels(requireValue(toast.querySelector('[data-probe]'), 'No probe'), 'width')).toBe(
		pixels,
	)
})
```

**After:**

```ts
// The mutation this catches is a row naming a token the slot does not read. Tokens can declare
// the same length, as the `--vn-gutter-x`, `--vn-size-6`, and `--vn-gap-4` tokens each declare
// the `1.5rem` length, so a length reading cannot tell them apart. A wrapper that retunes the
// row's token alone can: the slot follows the retune only when it reads that token.
it.each(TOAST_SLOT_CASES)(
	'reads $property from its own token and follows a retune of that token alone',
	({ property, token, pixels }) => {
		const host = scene.mount(
			`<div class="toast show">Oak shipment<span data-probe style="display:block;width:var(${property})"></span></div><div data-retune style="${token}: 37px"><div class="toast show">Ash shipment<span data-probe style="display:block;width:var(${property})"></span></div></div>`,
		)
		const [rest, retuned] = [...host.querySelectorAll('.toast')]
		const toast = requireValue(rest, 'No toast')
		const moved = requireValue(retuned, 'No retuned toast')
		expect(readToken(toast, property)).toBe(readToken(toast, token))
		expect(
			readPixels(requireValue(toast.querySelector('[data-probe]'), 'No probe'), 'width'),
		).toBe(pixels)
		expect(pixels).not.toBe(37)
		expect(
			readPixels(requireValue(moved.querySelector('[data-probe]'), 'No retuned probe'), 'width'),
		).toBe(37)
	},
)
```

The round-2 comment that sits between the `readToken` assertion and the first width assertion stays. The before and after blocks leave it out.

The wrapper declares a distinct `37px` length for the row's token and nothing else. It is part of the mounted fixture, so the `scene.clear` call in the `afterEach` hook removes it, and nothing is restored by hand. The `expect(pixels).not.toBe(37)` guard keeps the retuned length distinct from every row's resting length.

**Reading.** The rebuilt validation copy ran the style proof command, with verbose output in the mutation runs and dot output in the gate. Each mutated row changes only the `tests/setupStyles.ts` file. Every run is retained in the `.orkestrel/veneer/units/to-instruments/to-mutations-3.log.txt` file:

| Mutation to `TOAST_SLOT_CASES` | Proof | Exit | Summary | Failing case |
| --- | --- | --- | --- | --- |
| none | style proof | 0 | `Tests 17 passed (17)` | — |
| spacing row names the `--vn-size-6` token | style proof | 1 | `Tests 1 failed \| 16 passed (17)` | toast box › reads `'--bs-toast-spacing'` from its own token and follows a retune of that token alone |
| spacing row names the `--vn-gap-4` token | style proof | 1 | `Tests 1 failed \| 16 passed (17)` | the same case |
| spacing row names the `--vn-size-6` token | setup proof | 0 | `Tests 122 passed (122)` | none |
| spacing row names the `--vn-gap-4` token | setup proof | 0 | `Tests 122 passed (122)` | none |
| padding-x row names the `--vn-space-8` token | style proof | 1 | `Tests 1 failed \| 16 passed (17)` | toast box › reads `'--bs-toast-padding-x'` from its own token and follows a retune of that token alone |

For the `--vn-size-6` substitution, a separate run captured the failing assertion: `expected 24 to be 37` at the `toast.test.ts:102:5` site, which is the retuned probe's width. The retune assertion is therefore the one that fails. The `readToken` equality and the resting length both hold, because both tokens declare the `1.5rem` length.

The setup-proof rows show that the length binding in the `tests/setupStyles.test.ts` file still accepts both substitutions, as the verdict ruled. The style proof now carries token identity.

**Mutation log.** The `.orkestrel/veneer/units/to-instruments/to-mutations-3.log.txt` file records, for each run, the mutated site with its old and new text, the command, the exit, the summary, and the failing case names. A closing entry records the failing assertion for the `--vn-size-6` substitution. No run rebuilt the cascade, because each mutated site is a test table the proof reads from source. The instrument is the `.orkestrel/veneer/units/to-instruments/to-mutate-3.py` file.

## Gates on the rebuilt validation copy

The `.orkestrel/veneer/units/to-instruments/to-sync-3.sh` script rebuilt the validation copy under `tmp/probe/base`. It took a `git archive 2a3f223` extract, ran `cp -al node_modules`, applied the `to-shared-2.patch` file, and copied the owned files over the result. The `.orkestrel/veneer/units/to-instruments/to-gates-3.sh` script ran each gate, with its logs in the `.orkestrel/veneer/units/to-instruments/to-logs-3/` directory. The copy is deleted.

| Command, as it ran | Exit | Result |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned and shared files | 0 | all matched files formatted |
| `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned and shared files | 0 | no findings |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | `✓ built` for core, browser, and styles |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/toast.test.ts tests/src/styles/components/close.test.ts` | 0 | `Tests 34 passed (34)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `Tests 122 passed (122)` |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)` |
| `npm run test:guides` | 0 | `Tests 19 passed (19)` |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)` |

In the worktree, `npm run format:check` exits 0 ("All matched files use the correct format.") and `npm run lint:check` exits 0.

These runs were not part of this round: `npm run test:setup` as a whole, the journey, `CAPTURE=1`, `test:service`, and the whole styles project. The brief assigns them to the Orchestrator at landing.

## Record

- **Instrument locations.** Every round-3 instrument and log sits under `tmp/units/` (retained under `.orkestrel/veneer/units/to-instruments/`) with the `to` prefix, and nothing was written into the session scratchpad. The npm 11 `PATH` entry was read from the scratchpad, as the brief allows.
- **A stray reject file, removed.** A `patch` call I ran to spot-check the restored copy wrote a `-.rej` reject file into the worktree root. I removed that file by its own path and then re-ran both worktree gates, which exited 0. `to-3-status.txt` was captured after the removal and lists the owned files alone.

## Review evidence

- `.orkestrel/veneer/units/to-3.diff`: the `git diff 2a3f223` output, which is empty for tracked files, plus each owned file through `git diff --no-index /dev/null`. Against the `to-2.diff` file, the one change is the slot case in `toast.test.ts` shown under T7.
- `.orkestrel/veneer/units/to-3-status.txt`: the `git status --porcelain` output, which lists the owned files alone.
- `.orkestrel/veneer/units/to-shared-3.patch`: byte-identical to the `to-shared-2.patch` file.
- `.orkestrel/veneer/units/to-instruments/to-mutations-3.log.txt`: the mutation log.
- `.orkestrel/veneer/units/to-instruments/to-report-3.md`: this report.
