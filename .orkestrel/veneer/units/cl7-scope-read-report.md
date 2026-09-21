# CL7 scope read — report

Executor: `checker` on native Sonnet, read-only, under `units/cl7-scope-read-brief.md`, reading
`units/cl7-brief.md` against the Veneer checkout at `c1c81a4` with CL6's completed change in the
working tree. Its amendments are folded into `units/cl7-brief-2.md`.

Rows 1, 2, 7, and 8 hold. Rows 3, 4, 5, and 6 amend.

The decisive findings:

- **The sweep's population includes the mixins file itself.** `scanStyleBlocks` scans every
  partial under `src/styles/` recursively, and `_mixins.scss` sits directly under that root and
  matches the pattern. So a block the new container partial shares with any existing partial,
  including one already in the mixins file, is exactly what the sweep flags, and the remedy needs
  the file brief 1 put off-limits. The read calls this a real collision path rather than a
  hypothetical one. **Brief 2 grants that file up front**, because this is the shape that stopped
  CL5c mid-unit.
- **The gutter coincidence is bounded to two consumers.** No partial under `src/styles/` reads
  the space scale's twelfth member through a variable. Its only consumers are its registry entry
  in `src/core/constants.ts` and the density-rescaling assertion in
  `tests/src/styles/tokens.test.ts`, which pins it against the scale's index law at two density
  factors. The measurement is therefore named rather than searched.
- **The key needs at least one shipped variable row and one shipped selector row**, because its
  projected properties list carries the two gutter properties and the empty-properties branch is
  therefore unavailable. The read quotes the deciding branch.
- **The terrain map's line citations into the mixins file and the styles setup module are stale**
  after CL6, though every fact holds; the map also names the viewport visitor's module with the
  wrong extension. Re-locate by name.
- **Four sections now extend the shared base**, not three, because CL6 added one. The button
  section still implements the contract directly. CL7's section becomes the fifth.
