# U3i report

## Items

1. Done — `src/core/helpers.ts` `createStringFaults` TSDoc, edited sentence at the block
   preceding `it on each answer.` (near original line 1929). Replaced the "read once per call"
   sentence with the "asks the accessor twice per call" sentence per item 1's exact text.
2. Done — `guides/contract.md`, `createStringFaults` row (originally line 598). Replaced the
   matching sentence with the item 2 text. `npm run format` re-aligned the table's column padding
   on this file, per the item's own allowance.
3. Done — `tests/src/core/helpers.test.ts`, the `it` title (originally line 3288). Renamed to
   `reads a hand-rolled shape's pattern accessor twice per call, for the presence test and for the
   rebuild that names the limit`. Body unchanged.
4. Done — `tests/src/core/helpers.test.ts`. Inserted the `it('answers from a supplied rebuild
   without asking the shape for its pattern', ...)` block immediately after the block renamed in
   item 3, separated by one blank line, exactly as specified. `readPattern` was already imported in
   this file (line 75), so no import change was needed.
5. Done — `guides/contract.md`, the membership paragraph (originally line 256). Replaced the text
   from `That last population is **217 rows**, not none:` through `...quietly falsifying this
   paragraph.` with the supplied replacement text. Every other sentence of the paragraph is
   unchanged.
6. Done — `tests/src/core/integration.test.ts`, the named import from `'@src/core'`. Added
   `ContractCompiler,` before `ContractError,` (case-insensitive `contractcompiler` sorts before
   `contracterror`; `compiler` < `error`). `npm run lint:check` and `npm run format:check` both
   accept this position — see § Alphabetical position.
7. Done — `tests/src/core/integration.test.ts`, the `documents its own composition, because a
   round asserted this corpus was empty` test. Replaced the `// The SIZE, not just the shape.`
   comment block and the `expect(OWNED_MEMBERS.length).toBe(217)` line with the item 7 text
   (`owners` array, `plain` derivation through `captured.names(core)` / `captured.get(core, name)`,
   and `expect(OWNED_MEMBERS.length).toBe(plain.length)`). Changed the following loop's header from
   the literal array to `for (const owner of owners) {`. Added `import * as core from '@src/core'`
   immediately after the closing `} from '@src/core'` of the named-import block, matching the
   precedent in `tests/src/core/compilers.test.ts` line 82 (namespace import beside named imports
   from the same module). The type checker accepted `owner === exported` with no widening — `npm
   run check` passed with no diagnostic against this line.
8. Done — `tests/setup.ts`, the TSDoc over `OWNED_MEMBERS` (originally lines 784–789). Replaced the
   `— but the corpus it sweeps is 213 rows, not none, and ... a count nobody asserts is a count
   that drifts.` block with the item 8 text.

## Alphabetical position (item 6)

Inserted `ContractCompiler,` directly before `ContractError,` (case-insensitive: `compiler` < `error`).
`npm run lint:check` exits 0 with this position and `npm run format:check`/`npm run format` do not
move it, so lint accepts `ContractCompiler` before `ContractError`.

## Criteria 4–6 exact output lines

Criterion 4 — `tests/src/core/helpers.test.ts`:
```
 Test Files  1 passed (1)
      Tests  235 passed (235)
```

Criterion 5 — `tests/src/core/integration.test.ts tests/src/core/compilers.test.ts`:
```
 Test Files  2 passed (2)
      Tests  333 passed (333)
```

Criterion 6 — `--project guides`:
```
 Test Files  1 passed (1)
      Tests  65 passed (65)
```

## Other criteria

1. `npm run format:check` — failed on first run (`guides/contract.md`, `tests/src/core/integration.test.ts`),
   ran `npx oxfmt --config .oxfmtrc.json guides/contract.md tests/src/core/integration.test.ts`,
   re-ran `npm run format:check` — exits 0, "All matched files use the correct format."
2. `npm run lint:check` — exits 0, no output beyond the command echo.
3. `npm run check` — exits 0 (`tsc --noEmit --project tsconfig.json && check:src:core`), no
   diagnostics.
7. `git -C /home/user/contract diff -U0 | grep -c '^+.*\b\(above\|below\)\b'` → `0`. Swept added
   lines case-insensitively for `should`, `simply`, `easy`, `just`, `currently`, `now`, `via`,
   `e.g.`, `i.e.`, `etc.` with `git diff -U0 | grep -iE '^\+.*\b(should|simply|easy|just|currently|now|via|e\.g\.|i\.e\.|etc\.)\b'`
   — no matches.

## Deviations

None. Every item's target text was present exactly as the brief quoted it, and every acceptance
criterion passed after the edits.

## Flagged

None — every claim in this report is backed by the command output shown above, run from
`/home/user/contract`.
