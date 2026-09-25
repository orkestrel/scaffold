# E-ID-RECORD round 2 report

Successor to `e-id-record-brief.md` / `/home/user/scaffold/.orkestrel/veneer/units/e-id-record-report.md`, addressing the round-1 audit's
FAIL items (objective claim 5, subjective claims 5 and 6, findings F1 and F2).

## Changes

1. **Button group.** `tests/src/styles/components/button-group.test.ts`, case "moves every reading
   a consumer retunes those compatibility variables to": the `border-left-width` expectation now
   reads `3` (was `1`), and the comment above it is replaced with: "The children carry the Button
   family's own radius, so the retune leaves each child's corners where Button put them; their
   border width reads the retuned `--bs-border-width`, as the overlap does, so the pulled-back
   child still paints one shared line."
2. **Toggle.** `tests/src/styles/components/button.test.ts`'s keyboard toggle case now asserts
   `input.matches(':focus-visible')` and the label's `[[0, 0, 0, 3]]` ring immediately after Tab
   and before Space, in addition to the existing post-Space reads of the same two properties.
3. **Table cells.** `tests/src/styles/elements/tr.test.ts` gains "moves a cell bottom border to a
   scope-set --bs-border-width": a scope setting `--bs-border-width: 3px` moves a table cell's
   `border-bottom-width` to `3px`.
4. **Guide.**
   - `guides/veneer.md`'s Button binding table: the `--bs-btn-border-width` row now reads
     `var(--bs-border-width)` (was `var(--vn-border-width)`), matching `_button.scss:23`.
   - The `--vn-state-stripe` token row's Source cell now reads verbatim: "`bootstrap` — retained
     `$table-striped-bg-factor`, kept below the table's 7.5% hover and 10% active overlays."
5. Evidence for each mutation is under `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/`, named `eir-2-mutation-<name>.log.txt`.

## Mutation table

Recorded by `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-mutation.sh`, which copies the current file, applies one mutation,
rebuilds `dist/src/styles`, runs the targeted case, restores the file from the copy, and confirms
the restore is byte-identical with `sha256sum`.

| Mutation | Assertion it reddens | Reading | Log | Restore |
| --- | --- | --- | --- | --- |
| `_button.scss`: remove `.btn-check:focus-visible + .btn,` from the focus-ring selector list (line 99) | `button.test.ts`'s toggle case, the new pre-Space `expect(extractShadowLayers(...)).toEqual([[0, 0, 0, 3]])` | Test exited 1 (red): the label shows no ring after Tab while unchecked, failing at the pre-Space ring assertion | `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-mutation-toggle.log.txt` | `sha256sum` before/after matched |
| `_tr.scss`: `border-bottom` reverted to `var(--vn-border-width) var(--vn-border-style) var(--vn-border-color)` | `tr.test.ts`'s new "moves a cell bottom border to a scope-set --bs-border-width" | Test exited 1 (red): the scope-set `--bs-border-width: 3px` no longer reaches the cell, so `border-bottom-width` stays `1px` against the required `3px` | `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-mutation-tr.log.txt` | `sha256sum` before/after matched |

## Gate table

| Gate | Exit | Log | Passing count |
| --- | --- | --- | --- |
| `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check .` (`npm run format:check`) | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-format.log.txt` | "All matched files use the correct format." |
| `npm run lint:check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-lint.log.txt` | no diagnostics |
| `npm run check` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-check.log.txt` | all `tsc`/`vue-tsc` projects clean |
| `npm run test:src:styles` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-test-src-styles.log.txt` | "Test Files 115 passed (115)", "Tests 1435 passed (1435)" |
| `npm run test:conformance` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-test-conformance.log.txt` | "Test Files 1 passed (1)", "Tests 26 passed (26)" |
| `npm run test:guides` | 0 | `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-test-guides.log.txt` | "Test Files 1 passed (1)", "Tests 20 passed (20)" |

## Files

- `/home/user/scaffold/.orkestrel/veneer/units/eir-2.diff` — full `git diff ca83afb`.
- `/home/user/scaffold/.orkestrel/veneer/units/eir-2-status.txt` — `git status --short`.
- `/home/user/scaffold/.orkestrel/veneer/units/eir-instruments/r2/eir-2-mutation.sh` — the mutation/restore runner.
