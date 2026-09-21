
# CL6 scope read — report

Executor: `checker` on native Sonnet, read-only, under `units/cl6-scope-read-brief.md`, reading
`units/cl6-brief.md` against the Veneer checkout at `4f817db` with CL5c's completed change in the
working tree. Its amendments are folded into `units/cl6-brief-2.md`.

Rows 1, 2, 3, 4, 6, and 7 hold. Row 5 holds and found a consumer outside the brief's owned set;
row 8 amends the owned set because of it.

The decisive findings:

- **The key needs a variable row.** `collectShippedComponents` admits a component when its
  selector rows are non-empty and all shipped, and when either its variable rows are non-empty and
  all shipped or its variable rows are empty and the projected properties list is empty. This
  key's projected list carries the two opacity properties, so the empty branch is unavailable and
  at least one shipped variable row is required. `scanCompatibilityPresence` then requires every
  projected property present in the cascade, so both need coverage.
- **The retune moves the link-styled button.** `src/styles/components/_button.scss` gives that
  button the link base and hover tokens, and `tests/src/styles/components/button.test.ts` asserts
  the readings they produce today. Brief 1 scoped both files out while its criterion 3 forbade any
  consumer outside the owned set from moving, which made that criterion unsatisfiable.
- **The one ledger-derived case** is the listed array in `tests/conformance.test.ts`, which reads
  the whole compatibility table.
- **The terrain map's line numbers into the token and mixin files are stale** by roughly six lines,
  because CL5c landed its mark tokens and mixin ahead of the link block in both. Every fact the
  map states was re-confirmed; only the citations moved.
