## Verdicts

**Claim 1 — packing test derivation and control idiom.** CONFIRMED.
`tests/config.test.ts:583` derives `publishes` as `Object.getOwnPropertyDescriptor(manifest, 'private')?.value !== true`, identical to the sibling derivation at `tests/config.test.ts:487`. Line 585 asserts `expect(prepack).toBe(publishes ? 'npm run build' : undefined)`. The inline throwing control at lines 587-591 mutates a copied `scripts` record and wraps the re-assertion in `expect(() => {...}).toThrow(/expected/u)`, matching the file's existing idiom used at lines 344-355 (`keeps Vitest invocation fields...` test) and elsewhere in the file (e.g. line 355).

**Claim 2 — sentinel-env test coverage and control.** CONFIRMED.
`tests/config.test.ts:321-356` invokes every project row via `Reflect.apply(factory, undefined, [sentinel])` for `factories = projects.filter(row => typeof row === 'function')` (line 324), asserts no sentinel field's own-property value survives (lines 339-341), and the named `control` factory (line 344, `name` set to `'control'`) that returns the sentinel verbatim proves the loop throws (lines 345-355, `toThrow(/expected/u)`). Enumeration check: the root `vite.config.ts:206` registers exactly `[srcCore, srcServer, srcBin, policy, config, guides, distribution, probe]`, and each of those 8 bindings is declared as an arrow function (`vite.config.ts:32,50,97,134,145,159,171,189`). All 8 are functions, so `factories` equals the full registered project set — nothing is skipped by the `typeof row === 'function'` filter in this workspace's own configuration.

**Claim 3 — self-referential compilers pin was already the literal.** CONFIRMED.
The diff (`tmp/units/sd3.diff`) contains no hunk touching `tests/src/core/compilers.test.ts`. Reading the file now at `tests/src/core/compilers.test.ts:487` shows `expect(published.prepack).toBe('npm run build')` — already the literal form the ruling requires, not the self-referential `toBe(published.build)` the ruling described as needing repair. Since the diff made no edit here, this content was present at the baseline SD3 started from (post-SD2). Leaving the file unedited is conformant.

**Claim 4 — guide edit scope, truth, and inventory coverage.** CONFIRMED.
`guides/scaffold.md:1187-1191` shows a single sentence-level edit ("A publishing manifest carries..." → "In publishing workspaces, the emitted `prepack` script runs `npm run build`..."), with the rest of the paragraph and the surrounding passage unchanged. The sentence is true against the emitted value: `src/core/compilers.ts:428` shows `scripts.prepack = 'npm run build'` for a publishing workspace. `host.json`'s diff (`tmp/units/sd3.diff:18-46`) moves exactly two `storage` entry digests — `guides/scaffold.md` (line 26-27) and `tests/config.test.ts` (line 35-36) — plus the root aggregate digest (line 44-45), matching the two vendored paths the diff actually changed.

**Claim 5 — scope honesty.** CONFIRMED.
`tmp/units/sd3.diff` and the report's `git status --porcelain` (`tmp/codex/sd3-last.md`) both list exactly `guides/scaffold.md`, `host.json`, `tests/config.test.ts` as modified. `src/**` and `tests/src/core/templates.test.ts` (off-limits per the brief) show no hunks in the diff.

## Needs the reviewer

- None. All five claims resolved on mechanical evidence (file:line, diff hunks, grep counts).

PASS