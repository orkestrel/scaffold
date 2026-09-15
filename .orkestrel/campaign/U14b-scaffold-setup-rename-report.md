<!-- U14b-scaffold — builder (Sonnet, native), the three caller files U14's brief left out. Retained from the completion notification, 2026-09-15 (81 s, 13 tool uses). -->

**Import lines, before → after:**

- `tests/src/server/Materializer.test.ts` (line 42): `readErrorCode,` → `captureScaffoldCode,` (member position unchanged within the import block).
- `tests/src/server/Upstream.test.ts` (line 22): `readErrorCode,` → `captureScaffoldCode,`
- `tests/src/server/WriteTransaction.test.ts` (line 17): `import { readErrorCode, SCRATCH_PREFIX } from '../../setupServer.js'` → `import { captureScaffoldCode, SCRATCH_PREFIX } from '../../setupServer.js'`

**Call sites renamed** (`grep -c "captureScaffoldCode"` per file, post-rename, includes the import):

- `tests/src/server/Materializer.test.ts`: 31
- `tests/src/server/Upstream.test.ts`: 6
- `tests/src/server/WriteTransaction.test.ts`: 24

`npx oxfmt --config .oxfmtrc.json <the three files>` ran after the rename; it re-wrapped lines whose call now exceeds the print width but did not reorder the import members (the source files' import blocks were not alphabetically sorted before the rename either, so oxfmt left that order as-is).

`git diff --stat` for the three files:

```
tests/src/server/Materializer.test.ts     | 209 ++++++++++++++++++++++++------
tests/src/server/Upstream.test.ts         |  16 ++-
tests/src/server/WriteTransaction.test.ts |  60 +++++----
3 files changed, 213 insertions(+), 72 deletions(-)
```

**`npm run check`**: exit 0, no diagnostics.

**`npm run test:src:server -- tests/src/server/Materializer.test.ts tests/src/server/Upstream.test.ts tests/src/server/WriteTransaction.test.ts`**: `Test Files 3 passed (3)`, `Tests 141 passed | 3 skipped (144)`.

**`npx oxlint --config .oxlintrc.json --deny-warnings <the three files>`**: exit 0, no output.

**`npx oxfmt --config .oxfmtrc.json --check <the three files>`**: `All matched files use the correct format.`, exit 0.

**Tree-wide `grep -rn "readErrorCode" tests/ --include=*.ts`**: no matches (exit 1). No line imports `readErrorCode` from `@orkestrel/test/server` either, so nothing to report there.

**Deviation state**: none. Only the three owned files changed (`git status --porcelain` shows the rest of the working tree unchanged from the dirty baseline the brief names).
