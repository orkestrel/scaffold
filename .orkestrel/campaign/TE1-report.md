# Unit TE1 report — test: Windows-gated proofs

Implementer (Opus 5) returned 2026-08-26. Acceptance met.

- New proofs in `tests/src/server/helpers.test.ts`: cross-drive/UNC foreign-root refusal for
  `resolveContained` (gated on `FOREIGN_ROOTS`, a load-time filter over spellings whose `relative`
  answer is absolute on this host), and `readInventory` key-shape (walked and named doors both
  yield `/` keys, gated on `NATIVE_SEPARATOR_DIFFERS`). Gates cite the mechanism reading, never
  the platform name.
- Comment at `src/server/helpers.ts:43-45` restated as the actual mechanism (no behavior change).
- Scoped run: 68→70 passed, 4 skipped unchanged; both cases verbose-listed as executed.
- Host readings recorded (relative on `Z:\` and UNC spellings absolute; no second drive; sep `\`).
- Gates: check, format:check (149 files), lint:check green; observation test:policy 93 green.
