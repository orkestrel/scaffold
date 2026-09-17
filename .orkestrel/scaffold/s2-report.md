Implemented S2. The requested implementation and scoped gates are complete. The required `prove` receipt is unavailable because the harness blocked the tool call.

The acceptance criteria have these results:

| Criterion | State and evidence |
| --- | --- |
| Formatting and lint | Done. `npm.cmd run format:check` and `npm.cmd run lint:check` exit 0. |
| Typechecking and permitted syntax | Done. `npm.cmd run check` exits 0. Added code uses no type assertions, non-null assertions, `any`, or suppression comments. |
| Nested plugin entries | Done. The merge never flattens. The reported nested input retains its nesting and introduces no duplicate top-level boundary name. |
| Caller entries sharing a name | Done. Entries survive in their written order, including when a base plugin shares their name. |
| Replacement position | Done. A named override replaces the matching base entry in its existing position. |
| Invocation hazard population | Done. The test reads callable rows from the default configuration export, including `distribution`. Its control merges into an unregistered plain configuration. The transcribed length assertion is gone. |
| Showcase relocation | Done. The literal and explanatory comment live in `CONFIG_TEMPLATES.factories.app.showcase`. Before and after captures are byte-identical. |
| Browser declaration control | Done. The sealed copy fails the same assertion used for the emitted declaration. |
| Refusal fields | Done. Refusal requires `command` and `mode`. The command-only regression passes; the vendored configuration suite remains unchanged. |
| Naming and test data placement | Done. `findRefusals` replaces `findRefused`. Each parameter string had a single caller, so each was folded into that caller. `tests/setup.ts` remains unchanged. |
| Asset limit explanation | Done. The emitted comment explains the browser's `0`, Vite's default, and the single-file plugin's overwrite. The value remains `4096`. |
| Scoped suites | Done. `npm.cmd run test:src:core`: 419 passed. `npm.cmd run test:config`: 172 passed, 1 skipped. |
| Vendored integrity | Done. `npm.cmd run build` exits 0. The post-build diff for `host.json` and the prohibited vendored files is empty. |

**The selection.** The merge compares the base and override plugin lists separately. For each named top-level base object, the earliest matching named override object occupies its position. Override entries not selected for a base position append in caller order. Caller duplicates remain separate entries. Arrays, promises, falsy entries, and anonymous objects pass through unchanged. The emitted comment states that an override cannot remove a base plugin.

**The reds.** These commands ran on Windows on 2026-09-16. Filtered-out tests are omitted from the measurements below.

| Exact command | Red | Green |
| --- | --- | --- |
| `npm.cmd run test:src:core -- tests/src/core/compilers.test.ts -t "preserves nested plugin\|preserves the caller plugin\|preserves opaque plugin\|merges an override carrying command"` | 4 failed, 0 passed against the inherited merge | 4 passed, 0 failed |
| `npm.cmd run test:src:core -- tests/src/core/compilers.test.ts -t "refuses the Vitest invocation record"` | 1 failed, 0 passed with the invocation refusal removed | 1 passed, 0 failed |
| `npm.cmd run test:src:core -- tests/src/core/compilers.test.ts -t "replaces a named base plugin"` | 1 failed, 0 passed with the merge returning the bare concatenation | 1 passed, 0 failed |
| `npm.cmd run test:src:core -- tests/src/core/compilers.test.ts -t "gives every application browser factory"` | 1 failed, 0 passed with the browser template declaration sealed | 1 passed, 0 failed |

The mutation runs failed at their named assertions. Each temporary mutation was undone without discarding inherited edits. The runtime tests cover this checkout's generated configuration; the unchanged byte-identity test connects that configuration to the generator.

**The template move.** Behavioral edits and their exact-text expectations landed before the relocation. The captures use the source generator across the source/application selections and showcase settings, plus this checkout's blueprint.

The capture and comparison commands were:

```text
node tmp/units/s2-generate.mjs before
node tmp/units/s2-relocate.mjs
node tmp/units/s2-generate.mjs after
git diff --no-index -- tmp/units/s2-captures/before.json tmp/units/s2-captures/after.json
```

The diff exits 0 with no output. No expectation changed for the relocation. The comparison's extra-byte control, written by `node tmp/units/s2-compare.mjs`, produces exit 1 when compared with the before capture. The whole-output and unchanged repository byte-identity cases pass.

**The refusal.** An override carrying `command` and `mode` returns the base unchanged without a diagnostic. An override carrying only `command` merges normally; the regression verifies its build setting and retained command field. The emitted comment describes the fields as the invocation-record discriminator rather than claiming that `command` alone establishes identity.

**Observations.** Regeneration changed only `vite.config.ts`; S2 changed no wrapper bytes. The core wrapper adds plugins to a base without plugins. The browser and server wrappers add the declaration-rollup plugin, whose name differs from their boundary plugins. The bin override carries no plugins, and the application wrappers pass no override. Those wrapper paths therefore retain their selection behavior. The scoped configuration suite and build pass.

The `src:core` run reports 20.79 seconds; the `config` run reports 5.76 seconds. The whole suite was not run, as instructed. The inherited wrapper edits remain in the working tree. No version, dependency, guide, or vendored source changed, and no commit, push, publication, installation, or nested agent launch occurred.

**What remains unclosed.** The registered `mcp__probe__prove` call returned exactly: “MCP tool call requires approval, but approval policy is never”. It issued no receipt and ran no proof stage. The executed regression tests and gates are local evidence; they do not substitute for that missing receipt. Independent acceptance and the authoritative whole-suite run remain with the Orchestrator.