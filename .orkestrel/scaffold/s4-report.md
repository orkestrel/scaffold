S4 implementation is complete. The scoped acceptance criteria passed.

**Done / not done.** The criteria close as follows.

| Criterion | Result |
| --- | --- |
| Formatting and lint | Done. `npm.cmd run format:check` and `npm.cmd run lint:check` exited 0. |
| Typechecking and prohibited syntax | Done. `npm.cmd run check` exited 0. Added TypeScript contains no explicit `any`, type assertion, non-null assertion, or suppression. |
| Hazard census | Done. The comment distinguishes factory-derived replacement and nested cases from the repeated-name case built with vendored helpers. It explains that no emitted base repeats a plugin name. |
| Predicate and recorded red | Done. Non-string names and named structural promises fail against the original predicate and pass against the repair. |
| Red-runner assertions | Done. The shared runner reads Vitest's JSON report, checks the exact case title and assertion failure, requires the expected executed population, and rejects startup, termination, and collection failures. |
| Mutation restoration | Done. Mutations occur inside restoring `try` blocks. Each hardened mutation script's header states that forced termination bypasses `finally` and can leave mutations behind. |
| Relocation control | Done. The control asserts equal capture lengths before asserting different bytes. |
| Instrument reruns | Done. Every hardened instrument exited 0; results follow. |
| Scoped tests | Done. `npm.cmd run test:src:core`: `422 passed (422)`. `npm.cmd run test:config`: `172 passed \| 1 skipped (173)`. |
| Vendored files and build inventory | Done. `npm.cmd run build` exited 0. The diff over every `HOST_PATHS` entry and `host.json` is empty. The inventory's SHA-256 before and after the build is `E395E384197192950A60C9233C2612BE1BFCF685AAB494717278A4CC0F35D519`. |

**The predicate.** `isNamedPlugin` requires a non-null, non-array object, excludes objects carrying callable `then`, and checks that `name` is a string. It remains unexported with the `{ name: string }` target.

The structural exclusion replaces `instanceof Promise`. The installed Vite declaration admits structural promises; a native-instance check misses them. The regression uses bound methods from a real promise and asserts opaque identity on the base and override sides. Contract's installed promise-like guard also requires `catch` and `finally`; it does not match this callable-`then` exclusion, and generated workspaces do not universally declare Contract.

The template and its exact-text expectation changed together. `node tmp/units/s3-adopt.mjs` printed `Regenerated vite.config.ts`. The byte-identity test passed without changing its expectation. No pinned span in `tests/src/core/templates.test.ts` required an S4 edit.

**The reds.** The initial regression command was:

```text
npm.cmd run test:src:core -- -t 'preserves non-string plugin names without selecting them|preserves named structural promises without selecting them'
```

Before the repair, it exited 1 with `2 failed | 420 skipped (422)`. After the repair, the same command exited 0 with `2 passed | 420 skipped (422)`.

The replay instruments produced these measured results. Each named-case run executes Vitest through `process.execPath` and `node_modules/vitest/vitest.mjs`.

| Command | Mutated result | Restored result |
| --- | --- | --- |
| `node tmp/units/s3-red-1-selection.mjs` | `exit 1 — 1 failed \| 421 skipped (422)`; named case: `installs one override entry at one base position` | `exit 0 — 1 passed \| 421 skipped (422)` |
| `node tmp/units/s3-red-2-pinning.mjs` | `exit 1 — 1 failed \| 421 skipped (422)`; named case: `emits every browser workspace configuration for a showcase selection and for none` | `exit 0 — 1 passed \| 421 skipped (422)` |
| `node tmp/units/s4-red-predicate.mjs` | Each predicate case separately: `exit 1 — 1 failed \| 421 skipped (422)` | Each predicate case separately: `exit 0 — 1 passed \| 421 skipped (422)` |

**The hardened instruments.** The selection and pinning rerun outputs are recorded in the preceding table. The remaining commands exited 0 with the following output.

`node tmp/units/s3-red-3-identity.mjs` reported:

```text
rival reading: mapped names pass = true; identity at the base position passes = false
real selection: mapped names pass = true; identity at the base position passes = true
```

`node tmp/units/s3-relocation-control.mjs` reported:

```text
Baseline captured: 3882177 bytes
Control captured: 3882177 bytes; the comparison against it fails.
The restored tree captures the baseline bytes; the real comparison passes.
```

`node tmp/units/s3-effective.mjs` reported:

```text
vite.config.ts:  — unmoved by the fix = true
configs/src/vite.core.config.ts: orkestrel-output-boundary, orkestrel-environment-boundary, orkestrel-declaration-rollup — unmoved by the fix = true
configs/src/vite.server.config.ts: orkestrel-output-boundary, orkestrel-environment-boundary, orkestrel-declaration-rollup — unmoved by the fix = true
configs/src/vite.bin.config.ts: orkestrel-output-boundary — unmoved by the fix = true
No materialized wrapper changed its effective plugin selection.
```

`node tmp/units/s4-runner-control.mjs` reported:

```text
The named-case runner refuses an empty collection despite Vitest exiting 0.
```

The identity instrument covers the factory replacement position. The relocation instrument covers its declared configuration-selection matrix and this repository's artifacts. The effective-selection instrument compares plugin names for the materialized wrappers only. These results do not claim whole-configuration equivalence or restoration after forced termination.

**Observations.** The runs used Windows on 2026-09-16. PowerShell refused the `npm.ps1` shim; commands used `npm.cmd`. The build reported API Extractor's bundled TypeScript version warning and Vite's output-format warning, then exited 0. `git diff --check` passed. No whole-suite run, installation, commit, push, version bump, or publication occurred.

**What remains unclosed.** No S4 implementation criterion remains open. The Orchestrator retains final acceptance and the authoritative whole-suite run. No probe receipt was issued.

Automatic approval review rejected `probe.prove` with: `MCP tool call requires approval, but approval policy is never`. The report therefore rests on the directly executed regression and mutation runs, not an MCP proof receipt.