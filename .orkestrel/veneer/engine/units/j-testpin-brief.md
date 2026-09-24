# Unit J-TESTPIN — route the oracle hold through `@orkestrel/test` 0.0.23's `driveHold`

## Role and engine

`builder` on Sonnet, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/testpin` (branch `unit/testpin`, base `afae42c`). Perform the assignment directly and spawn nothing.

## Objective

Veneer's browser test setup holds the oracle button through the installed `driveHold`, the copied pointer sequence is gone, the orphaned imports are gone, and the setup proof and the styles interaction suite are green.

## Context

**Already done by the Orchestrator in this worktree (do not redo).** `package.json` pins `"@orkestrel/test": "^0.0.23"` (line 102) and `npm install --ignore-scripts` installed it: `package-lock.json` reads `"node_modules/@orkestrel/test": { "version": "0.0.23", "resolved": "https://registry.npmjs.org/@orkestrel/test/-/test-0.0.23.tgz"` (around line 778); `node_modules/@orkestrel/test/package.json` reads `"version": "0.0.23"`. The status reads ` M package-lock.json` and ` M package.json`; both stay as they are.

**The installed surface.** `node_modules/@orkestrel/test/dist/src/browser/index.d.ts:1027` declares `export declare function driveHold(resolve: () => HTMLElement, name: string): Promise<void>;` — it holds the pointer on the element the resolver returns, releases the pointer on any failure after its marker write (the 0.0.23 change), and refuses when a pointer is already held.

**The copy.** `tests/setupBrowser.ts` `holdOraclePointer(root, name)` (around line 927, doc block from line 917) repeats `driveHold`'s sequence with the resolver fixed to `readOracleButton(root, name)`. Its callers: the oracle table row `{ action: 'pointer.hold', name: 'Toggle', drive: (root: ParentNode) => holdOraclePointer(root, 'Toggle') }` (around line 875) and `tests/setupBrowser.test.ts` (grep `holdOraclePointer` there for its cases). `tests/src/styles/utilities/interaction.test.ts` already imports `driveHold` from `@orkestrel/test/browser` (line 4) and calls `driveHold(() => line, ...)` (line 71). The imports `isOutsideViewport`, `POINTER_HOLD`, `sendProtocol`, and `waitForFrame` in `tests/setupBrowser.ts` (lines 19, 24, 29, 33) are used by `holdOraclePointer` alone; `releasePointer` stays used by the `pointer.release` row (line 877).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Design laws ("No superfluous wrappers": a wrapper that forwards 1:1 is removed and its consumer updated; "Fold trivial one-use logic into its caller"), § Non-negotiable rules; `.claude/rules/tests.md`, `typescript.md`, `writing.md`. Skill: none. E6: no alias or shim.

**Host.** Windows 11, Git Bash, the worktree root; `npm.cmd` and `npx.cmd` resolve as `npm` and `npx`; Chromium 153 through Playwright; `npm run test:setup:browser` runs the browser setup proof (check `package.json` scripts for the exact name; `npm run test:setup` runs the setup proofs); `npm run test:src:styles -- tests/src/styles/utilities/interaction.test.ts` runs the interaction file (check the script name the same way). The `prove` MCP server is not reachable to a subagent; record that you made no call.

## Obligations

- **P1 The fold.** Delete `holdOraclePointer` and its doc block. The oracle table row's `drive` becomes `(root: ParentNode) => driveHold(() => readOracleButton(root, 'Toggle'), 'Toggle')`. Add `driveHold` to the `@orkestrel/test/browser` import list; remove `isOutsideViewport`, `POINTER_HOLD`, `sendProtocol`, and `waitForFrame` from it when no other site in the file uses them (grep first; keep any that another site uses). If `holdOraclePointer` is exported and a guide or another file names it, report that site instead of editing it.
- **P2 The proof.** In `tests/setupBrowser.test.ts`, the cases that drove `holdOraclePointer` directly now drive the `pointer.hold` row's `drive` (or `driveHold(() => readOracleButton(root, 'Toggle'), 'Toggle')` directly) and keep asserting that the oracle button enters `:active` and that `releasePointer()` releases it; a case that asserted the copied sequence's own refusal messages asserts the installed verb's messages (the same text: `Interactive target "<name>" did not enter the pressed state`, `Pointer is already held at <x>x<y>`). Delete a case that proves only the deleted function's existence.
- **P3 The gates.** Scoped while you work: `npm run check`, `npx oxlint --config .oxlintrc.json --deny-warnings tests`, `npx oxfmt --config .oxfmtrc.json --check tests`, the setup browser proof, the interaction file. Once at the end: `npm run test:setup`, `npm run test:src:styles`, `npm run test:policy`. Write the chain to `tmp/j-testpin/acceptance.sh` and run the file.

## Scope

**Owned.** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tmp/j-testpin/**`. `package.json` and `package-lock.json` are the Orchestrator's changes in this tree; leave them.

**Off-limits.** Every other file, `tests/setupPolicy.ts` and `tests/policy.test.ts` included.

**Tools and limits.** No install, commit, push, or discarding git command; no tree-wide `format` or lint `--fix`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report as your final message: the diff of `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, the verbatim exit line of every chain command with each test run's last two lines, `git status --short`, `git diff --stat`, and the deviation state. No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Stop and report when `holdOraclePointer` has a caller outside the owned files, when a setup proof case cannot be retargeted without a new helper, or when a gate outside the owned files is red at the baseline (record it as standing and continue).

## Acceptance criteria

1. `npm run check`, oxlint, and oxfmt exit 0.
2. `holdOraclePointer` is absent from the tree (`grep -rn holdOraclePointer tests src guides` empty); `driveHold` is imported and called in the `pointer.hold` row; no unused import remains.
3. The setup browser proof, `npm run test:setup`, `npm run test:src:styles`, and `npm run test:policy` exit 0.
4. The status lists `package.json`, `package-lock.json`, `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts` only.
