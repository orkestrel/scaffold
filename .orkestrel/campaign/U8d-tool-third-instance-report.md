<!-- U8d — builder (Sonnet, native), the third-instance pin the A8b reviewer referred. Retained from the completion notification, 2026-09-15 (89 s, 22 tool uses). -->

Test: `tests/src/core/tools/ToolManager.test.ts:338` — `publishes the third instance a removal listener installs during a replacement`.

Red (`ToolManager.ts:72` mutated to `!== undefined`): `AssertionError: expected [ Array(2) ] to deeply equal [ [ Tool{ name: 'echo', …(5) } ] ]` at `:354` (`expect(recorders.add.calls).toEqual([[third]])`); `Tests 1 failed | 89 skipped (90)`. Green (`=== tools` restored): `Tests 1 passed | 89 skipped (90)`.

`git diff --stat`: nine files (the U8a/U8b/U8c standing state) with `ToolManager.test.ts` at 359 insertions; `ToolManager.ts` hunk count 4 before and after (35 insertions, 3 deletions unchanged) — byte-identical restore. `npm run test:src:core` exit 0, 90 tests over 6 files; `lint:check` 0; `format:check` 0. `guides/tool.md` `## Tests` sentence gained the clause "a third instance a removal listener installs during a replacement". `tmp/probe/` removed. Deviation: none.
