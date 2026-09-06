# Unit report — U3-fix-2

## Files touched

- `.claude/rules/workspace.md`
- `src/core/templates.ts`
- `tests/src/core/compilers.test.ts`
- `tests/config.test.ts`

## Per edit

1. **The waiver's home.** Moved the placement waiver sentence ("so no `configs/types.ts` exists for
   one to import: each keeps its own types, data, and functions in its one file, and the
   centralized-kind placement in `.claude/rules/architecture.md` does not reach a leaf") into the
   leaves bullet, and deleted the waiver sentence and the "extend that waiver…" clause from the
   `configs/policy.ts` bullet, which now ends at "…is the only form that resolves in all of them."
2. **One vocabulary for the rewrite.** Made the browser seed's two comment lines byte-identical to
   the server seed's: "a specifier the tarball does not carry" and "own published root export."
3. **One assertion over the comment.** Replaced the two straddling `toContain` calls in
   `tests/src/core/compilers.test.ts` with one `toContain` over the full two-line comment, `\n`
   between the lines, matching edit 2's exact text.
4. **No sentinel, no derived flag.** Replaced `extractorResolved`/`extractorPath` with one
   `let extractorPath: string | undefined`, assigned in `try`, `undefined` in `catch`. Both skips
   now read `extractorPath === undefined` / `extractorPath !== undefined`, and the existence
   assertion narrows with `if (extractorPath === undefined) throw new Error(...)` before
   `existsSync`.
5. **The proof's scratch.** The roll-up proof case now builds its fixture workspace with
   `createPolicyScratch({ prefix: 'orkestrel-config-rollup-' })`, writes the project and sources
   through `scratch.write`, takes `workspace` from `scratch.path`, and closes with
   `scratch.destroy()` in `finally`. Removed the `mkdirSync(resolve(root, 'tmp'))`,
   `mkdtempSync`, per-file `writeFileSync` calls, and `rmSync` from this case. No import became
   unused: `mkdirSync`, `mkdtempSync`, `writeFileSync`, and `rmSync` remain used by other cases in
   the same file (lines 672, 722, 1600-1608, 1639, 1688, 1691, 1729).
6. **The scratch's removal, proven.** Added a `before`/`after` `readdirSync(tmpdir())` snapshot
   filtered to names beginning `orkestrel-declarations-`, taken before the builds and after the
   builds plus the `serve` control, asserting every post-build name was already present
   beforehand — proving the hook's temporary declaration emit is removed in its `finally`.
7. **The prototype case.** Added one true `isExtractorModule` case using
   `Object.setPrototypeOf(() => undefined, { invoke: () => undefined })` and its `prepare` twin,
   with a comment naming that it proves the guard reads through the prototype chain. The guard
   returned `true` for this case; no deviation triggered.

## Unknown answered

Edit 5's unknown: whether the extractor or Vite accepts a fixture root under `os.tmpdir()`. It
does. `npm run test:config` collected and passed the roll-up case with the scratch directory (under
`os.tmpdir()`, outside the repository) as both the `tsconfig.json` project root and the Vite build
root; the extractor's `packageJsonFullPath` reading and Vite's `build()` both tolerated it.

## Commands run

- `npx oxfmt --config .oxfmtrc.json --check .claude/rules/workspace.md src/core/templates.ts tests/src/core/compilers.test.ts tests/config.test.ts`
  → `All matched files use the correct format. Finished in 290ms on 4 files using 4 threads.`
- `npx oxlint --config .oxlintrc.json --deny-warnings src/core/templates.ts tests/src/core/compilers.test.ts tests/config.test.ts`
  → exit 0, no output, after renaming the two `filter` callback parameters from `name` to `entry` to
  clear an `eslint(no-shadow)` warning against the outer `name` binding.
- `npx tsc --noEmit --project tsconfig.json` → exit 0, no output.
- `npm run test:src:core` → `Test Files 9 passed (9)` / `Tests 385 passed (385)`.
- `npm run test:config` (600000 ms foreground timeout) → `Test Files 1 failed (1)` /
  `Tests 1 failed | 110 passed | 1 skipped (112)`. The one failure is
  `root configuration > keeps the committed host inventory aligned with the vendored checkout
  bytes`, reporting `.claude/rules/workspace.md` and `tests/config.test.ts` as stale against
  `host.json`, which is untouched per Scope and off-limits — the brief named this row's reddening
  as an expected report item rather than a stop condition, since edits 1 and 4 changed vendored
  files this row diffs against `host.json`.

## Acceptance criteria

1. PASS — `oxfmt --check` exits 0 on the four owned files.
2. PASS — `oxlint --deny-warnings` exits 0 on the three source/test files.
3. PASS — `grep -n "extractorResolved\|either vendored leaf\|extend that waiver"
   .claude/rules/workspace.md tests/config.test.ts` prints nothing;
   `grep -c "source path the tarball" src/core/templates.ts` prints `0`.
4. PASS — `tsc --noEmit --project tsconfig.json` exits 0.
5. PASS — `npm run test:src:core` exits 0, `385 passed (385)`.
6. FAIL (reported per brief) — `npm run test:config` exits non-zero: the host-inventory row reddens
   because `.claude/rules/workspace.md` and `tests/config.test.ts` moved while `host.json` did not.
   Every other case in the project passed (`110 passed | 1 skipped` beside the one failure). The
   brief names this as the expected outcome to report rather than a defect to fix, since `host.json`
   is off-limits and this unit does not own it.

## Deviations

None against the Deviation contract's stop conditions (edit 5, edit 7, an out-of-scope-file need,
or a scoped run reddening a case outside the edits). The host-inventory row is the row the brief
itself flagged as a possible red result to report, not an unscoped or unexpected reddening.
