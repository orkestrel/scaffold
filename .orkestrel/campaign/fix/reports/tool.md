# Fix report: tool

## Dispositions

- **s18-06** applied (src/core/tools/ToolManager.ts, src/core/types.ts, guides/tool.md, tests/src/core/tools/ToolManager.test.ts): Re-verified the any-succeeds seed at ToolManager.ts:73 in the current tree, then applied the finding's repair line: `let removed = true` with `if (!this.#tools.delete(name)) removed = false`. Rewrote the `types.ts` batch `@returns` to "True if every named tool was present; false otherwise", corrected the guide `remove` row and the batch-removal fence comment (verified by running the fence against the built dist: `remove('echo')` true, `remove(['now','ghost'])` false), and reshaped the pinning test to assert true only when every name was present.
- **s18-16** applied (src/core/helpers.ts, src/core/index.ts, src/core/tools/ToolManager.ts, guides/tool.md, tests/src/core/helpers.test.ts): Created `src/core/helpers.ts` exporting `toolToDefinition(tool: ToolInterface): ToolDefinition` with the private method's body verbatim, removed `#definition`, called the helper from `definitions()`, and added `export * from './helpers.js'` to the barrel between `types.js` and `validators.js` (matching the workspace and console barrels). Added a Helpers section to the guide Surface for parity and a unit test covering the name-only projection, summary-over-description advertising, description fallback, key order, schema identity by reference, and per-call freshness.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1820ms on 41 files using 4 threads. (First run flagged guides/tool.md table padding; converged with npm run lint then npm run format, then re-ran the non-mutating chain.)
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics, exit 0
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics, exit 0
- npm run build: pass — 8 modules transformed. dist/src/core/index.js 6.80 kB; dist/src/core/index.cjs 7.20 kB; built in 2.22s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 5 files / 53 tests passed; policy 1 file / 111 passed; config 1 file / 46 passed; setup 1 file / 4 passed; guides 1 file / 23 passed

## Diffstat

```text
 guides/tool.md                           | 28 ++++++++++++++++++----------
 src/core/index.ts                        |  1 +
 src/core/tools/ToolManager.ts            | 21 ++++-----------------
 src/core/types.ts                        |  2 +-
 tests/src/core/tools/ToolManager.test.ts | 12 +++++++-----
 5 files changed, 31 insertions(+), 33 deletions(-)

Untracked (not in `git diff --stat`, not staged per the brief):
 ?? src/core/helpers.ts          (36 lines)
 ?? tests/src/core/helpers.test.ts (58 lines)
```

- dist moves: true

## Deviations

1. Lane conflict on the empty batch (s18-06), resolved by the finding's classification rather than left open. The DRIFT-RESHAPE lane's amendment would special-case `remove([])` to `false` to preserve ToolManager.test.ts:633; the DRIFT lane's amendment flips that assertion to `true`. The finding is classified DRIFT, so per the brief its `repair:` line stands as written, and that line ("initialise `let removed = true`") makes `remove([])` return `true` vacuously. Fleet precedent agrees and carries no empty-batch special case: workspace/src/core/workspaces/WorkspaceManager.ts:108, brief/src/core/BriefManager.ts:104, program/src/core/programs/ProgramManager.ts:133, terminal/src/core/TerminalManager.ts:234 all seed `let removed = true` and falsify on a failed drop. The vendored patterns.md § Batch operations rule states only "returns true only when all succeed" and does not rule on `[]`. Applied `remove([]) === true` and pinned it in the test. Flagging it because the lanes genuinely disagree on this detail.

2. Observation, not applied: repeated names in one batch now report false. `remove(['a', 'a'])` deletes on the first pass and misses on the second, so all-succeed semantics return `false` for a set the registry did remove. brief/src/core/BriefManager.ts:100-107 carries a comment recording exactly this defect and deduplicates with `new Set(target)` before iterating. The s18-06 repair line names no deduplication, so I did not add it — this belongs to a successor finding against the same capability.
