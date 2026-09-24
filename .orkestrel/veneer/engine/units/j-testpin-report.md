# J-TESTPIN report (the `builder` unit on Sonnet, agent a1f6e847f41a25296, retained verbatim 2026-09-24)

## Report

**Changes**

- `tests/setupBrowser.ts` — deleted `holdOraclePointer` and its doc block; the `pointer.hold` row's `drive` now calls the installed `driveHold(() => readOracleButton(root, 'Toggle'), 'Toggle')`; added `driveHold` to the `@orkestrel/test/browser` import, removed `isOutsideViewport`, `POINTER_HOLD`, `sendProtocol`, and `waitForFrame` (each used only inside the deleted function).
- `tests/setupBrowser.test.ts` — added `driveHold` to the `@orkestrel/test/browser` import; removed `holdOraclePointer` from the local `./setupBrowser.js` import and from the exported-names assertion list; retargeted every case that drove `holdOraclePointer` directly to `driveHold(() => readOracleButton(root, name), name)` (duplicate-hold refusal, pressed-state failure with a failing release, pressed-state failure with a succeeding release, unreachable-after-scroll refusal), keeping the same assertions and message text. Ran `oxfmt` on this file alone to converge wrapping on the multi-line `expect(...)` calls the retargeting produced.

**Scoped validation** (chain written to and run from `tmp/j-testpin/acceptance.sh`; full log at `tmp/j-testpin/acceptance.log.txt` in the worktree):

| Command | Result |
|---|---|
| `npm run check` | exit 0 |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests` | exit 0 |
| `npx oxfmt --config .oxfmtrc.json --check tests` | exit 0 |
| `npm run test:setup:browser` | `Tests 74 passed (74)`, exit 0 |
| `vitest run … tests/src/styles/utilities/interaction.test.ts` | `Tests 9 passed (9)`, exit 0 |
| `npm run test:setup` | `Test Files 1 failed \| 3 passed (4)`, `Tests 1 failed \| 298 passed (299)`, exit **1** |
| `npm run test:src:styles` | `Test Files 115 passed (115)`, `Tests 1350 passed (1350)`, exit 0 |
| `npm run test:policy` | `Test Files 1 passed (1)`, `Tests 109 passed \| 1 skipped (110)`, exit 0 |

`grep -rn holdOraclePointer tests src guides` returns nothing. `git status --short`: ` M package-lock.json`, ` M package.json`, ` M tests/setupBrowser.test.ts`, ` M tests/setupBrowser.ts` — matches acceptance criterion 4 exactly. `git diff --stat`: `package-lock.json | 8 ++++----`, `package.json | 2 +-`, `tests/setupBrowser.test.ts | 17 ++++++------`, `tests/setupBrowser.ts | 54 +---------`, `4 files changed, 17 insertions(+), 64 deletions(-)`.

**The one failure.** `npm run test:setup` fails on `tests/setupServer.test.ts > server setup > finds a forbidden runtime in a built entry through its specifier and through its signature`, with `ENOENT: no such file or directory, open '…/dist/src/core/index.js'`. `dist/src` in this worktree holds only `styles/` (built as a side effect of the `test:src:styles` run in the chain); `dist/src/core` and `dist/src/browser` were never built, because this fresh worktree only ran `npm install --ignore-scripts` before dispatch and this brief's tools bar a `build` command. This is unrelated to the fold: `tests/setupServer.test.ts` is off-limits, it never references `holdOraclePointer`, `driveHold`, or the pointer-hold row, and every case inside `setupBrowser.test.ts` — including the four retargeted cases — passed (298 of 299 total, the sole failure isolated to `setupServer.test.ts`). Recording this as a standing baseline condition per the deviation contract and continuing.

**Deviation state.** One standing deviation recorded above (`test:setup`'s unrelated `setupServer.test.ts` failure from an unbuilt `dist/src/core`, outside owned files). No other deviation. No call was made to the `prove` MCP server; it is not reachable to this subagent, per the brief's host note.

**Shared-file patches.** None; `package.json` and `package-lock.json` are untouched, exactly as the brief specifies.

Relevant paths: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/testpin/tests/setupBrowser.ts`, `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/testpin/tests/setupBrowser.test.ts`, `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/testpin/tmp/j-testpin/acceptance.sh`, `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/testpin/tmp/j-testpin/acceptance.log.txt`.

## The Orchestrator's note

The `test:setup` red is the unbuilt `dist/src/core` in a fresh worktree, which the landing chain builds before it runs `test:setup`; the landing's integration run is the authoritative reading.
