# Fix report: probe

## Dispositions

- **s09-01** applied (src/server/helpers.ts, src/server/stages/RuntimeStage.ts, guides/probe.md, tests/src/server/helpers.test.ts): Re-verified: the guarded-read pattern still stood at helpers.ts:89-93, :118-122, :331-335, :370-374, :413-417 and RuntimeStage.ts:769. Exported `readFaultCode(error: unknown): string | undefined` from src/server/helpers.ts, built on the same `attempt`-guarded `'code' in fault` read `isRefusedName` used, and narrowed to a string code. Rewrote `isRefusedName` onto it and replaced all six inline reads. Additive export, so non-breaking; guide `### Server helpers` row and a dedicated unit test covering a string code, a numeric code, a missing code, non-object values, a throwing `has` trap, and a throwing `code` getter.
- **s09-02** applied (src/server/helpers.ts, guides/probe.md, tests/src/server/helpers.test.ts): Re-verified: the three-clause containment test still stood verbatim at helpers.ts:73, :108, :730. Entry is headed DRIFT and the Verification judge ruled DRIFT/high while rejecting the reshape lane's decisive claim, so the finding's own repair line stands: exported `escapesRoot(root: string, target: string): boolean` computing `relative(resolve(root), resolve(root, target))` and applying the three clauses, and called it at all three sites. Each caller keeps its own `''` handling (`resolveWorkspaceFile` still refuses the empty relative path, `normalizeValue` still returns `'.'`), and the dead `remainder` local at :108 is gone. Additive export; guide row and a unit test over relative, escaping, absolute, cross-root and root-prefix-sibling paths.
- **s09-03** applied (src/core/constants.ts, src/server/stages/RuntimeStage.ts, guides/probe.md, tests/src/server/stages/RuntimeStage.test.ts): Re-verified: the bare `64` still stood at both branches of `#runner`. Added `export const PROBE_SPECIFICATIONS = 64` to src/core/constants.ts with the retention rationale and the 2026-08-20 measurement in `@remarks` and a required `@example`, read it at both branches, and added its `### Constants` guide row. Also pointed the recycle test's loop bound and its crossing-inspection name at the constant so the test tracks it. Ancillary decision: left the value stated in prose in the RuntimeStage class TSDoc, src/core/types.ts, and guides/probe.md § Cost — the repair scoped the constant, the two read sites, and the Constants row, and those sentences report a measured cost rather than declare the bound.
- **s09-04** applied (src/core/constants.ts, src/server/stages/RuntimeStage.ts, guides/probe.md): Re-verified: the literal `'orkestrel-runtime-overlay'` still stood at the plugin declaration (:374) and in `#project`'s plugin-list check (:524). Added `export const RUNTIME_PLUGIN = 'orkestrel-runtime-overlay'` to src/core/constants.ts with `@remarks` and `@example`, read it at both sites, and added its `### Constants` guide row. Additive export, wire name unchanged; no test or guide elsewhere referenced the literal.

## Gates

- npm run format:check: pass — First run reported issues in guides/probe.md and tests/src/server/helpers.test.ts (files I wrote). Converged with `npm run lint` then `npm run format`; re-run: "All matched files use the correct format. Finished in 3256ms on 68 files using 4 threads."
- npm run lint:check: pass — > oxlint --config .oxlintrc.json --deny-warnings . (no diagnostics)
- npm run check: pass — tsc --noEmit --project tsconfig.json, then check:src:core, check:src:server, check:src:bin — all clean
- npm run build: pass — vite build for core/server/bin plus the d.cts copy; "dist/bin/main.js 0.41 kB | gzip: 0.28 kB | map: 0.63 kB  ✓ built in 22ms"
- npm test: timing-suspect — Three whole-suite runs failed a wandering set of the same class: 8 failed/220 passed, then 4 failed/224 passed, then 6 failed/222 passed (228 total). Every failure roots in `LSPError: The LSP request 'initialize' exceeded its deadline` -> `ProbeError: The Oxlint language server exited with code 0` from LintStage.#warmed, a file this change does not touch. Each failing file passes alone: tests/src/server/Probe.test.ts 26/26, tests/src/bin/main.test.ts 15/15, tests/src/server/stages/RuntimeStage.test.ts 40/40, tests/src/server/helpers.test.ts 42/42, tests/guides.test.ts 13/13. Direct measurement on this idle host of `node node_modules/oxlint/bin/oxlint --lsp` answering `initialize`: 50 ms, 63 ms, 53 ms across three rounds against the 2000 ms LINT_DEADLINE bound — so the whole-suite reds are concurrency load, not the bound or this change.

## Diffstat

```text
 guides/probe.md                              |  24 +++---
 src/core/constants.ts                        |  35 +++++++++
 src/server/helpers.ts                        | 112 +++++++++++++++++----------
 src/server/stages/RuntimeStage.ts            |  20 ++---
 tests/src/server/helpers.test.ts             |  58 ++++++++++++++
 tests/src/server/stages/RuntimeStage.test.ts |  12 ++-
 6 files changed, 200 insertions(+), 61 deletions(-)
```

- dist moves: true

## Deviations

No blocking deviation; three items for the record.

1. `npm test` is not green as a whole-suite run, and I attributed the cause rather than leaving it unexplained — see the gate excerpt. The authoritative re-run belongs to an independent verifier on an idle container; every failing file passes in isolation here, and the idle-host `initialize` latency (50-63 ms) sits far under the 2000 ms `LINT_DEADLINE` the failures report exceeding.

2. s09-02 classification. The entry heading is DRIFT and the Verification judge ruled DRIFT/high while calling the DRIFT-RESHAPE lane's decisive claim false, so I applied the finding's own `repair:` line (`escapesRoot(root, target)`) rather than the reshape lane's `escapes(path)` amendment. The two lanes disagree only on the leaf's signature; the judge settled it. Recomputing `relative` inside the leaf serves all three sites, which is exactly what the judge said the reshape lane got wrong.

3. One widening inside a `#` private, applied deliberately. `RuntimeStage.#alive` read `error instanceof Error && 'code' in error && error.code === 'EPERM'` and now reads `readFaultCode(error) === 'EPERM'`, which drops the `instanceof Error` narrowing and adds the `attempt` guard. `process.kill` raises only `Error`, the method is private, and the method's own comment already states the intended rule ("A host this process may not signal reports `EPERM` and is read as alive"), so no consumer-observable behavior moves.
