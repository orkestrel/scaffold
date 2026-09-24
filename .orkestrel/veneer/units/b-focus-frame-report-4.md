# FOCUS-FRAME (`ff`) report, round 4

The zero-clamp gap is closed: a new row in `RING_WORN_CASES` in `tests/setup.ts` fails when the `0` is dropped from the maximum, and the suite passes with the helper unchanged.

- **The row.** The shadow is `color(srgb 0.1 0.2 0.3) 0px 0px 0px -3px`, the outline is solid, `1px` wide, at a `-4px` offset, and the expected reach is 0. Each row in the `RingWornCase` interface now carries an `offset` field (the existing rows read `0px`), and the worn-pair proof in `tests/setup.test.ts` reads it. The row's TSDoc says why it exists.
- **Red.** With `Math.max(0, outline, ...shadows)` changed to `Math.max(outline, ...shadows)`, `npm run test:setup` exits 1 with `Tests  1 failed | 304 passed (305)` (log: `.orkestrel/veneer/units/ff-instruments/ff-mut4-no-zero-clamp.log.txt`). The failing case is "reads the larger of a ring shadow and an outline worn together", with `expected [ 3, 5, -3 ] to strictly equal [ 3, 5, +0 ]`. The file was then restored.
- **Green.** `npm run test:setup` exits 0 with `Tests  305 passed (305)` (log: `.orkestrel/veneer/units/ff-instruments/ff-4-gate-setup.log.txt`). The formatter check on the two changed files, `oxlint --deny-warnings` on them, and `tsc --noEmit -p tsconfig.json` also exit 0.
- **Artifacts.** `.orkestrel/veneer/units/ff-4.diff` holds all rounds against `e4a6d7c` (1287 insertions and 323 deletions). `.orkestrel/veneer/units/ff-4-status.txt` lists `tests/app/browser/integration.test.ts`, `tests/setup.ts`, and `tests/setup.test.ts` as modified, and nothing else.
