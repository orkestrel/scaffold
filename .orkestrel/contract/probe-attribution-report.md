# Unit probe-attribution — report

Runs 2026-09-01, node v22.22.2, contract 859d149 dist. Instruments `cpu-attribution.mjs`,
`cpu-differential.mjs`, parser `parse-cpuprofile.mjs`; outputs `results/cpu-attribution.out`,
`results/cpu-differential.out`. Capture control: top-22 frames hold 96.8% (medium-is) and 92.1%
(deep-audit) of samples — the profile captured the workload.

## medium is(valid) — where 2327 ns/op goes (share of sampled time)

| share | frame | source |
| --- | --- | --- |
| 23.4% | anonymous `index.js:2395` | protected-read machinery near `readValue`/intrinsic wrappers |
| 11.0% | anonymous `index.js:6834` | compiled guard closure |
| 9.7% | garbage collector | per-call allocation on a boolean guard path |
| 9.2% | `collectMembers` | fresh `Set` built per call per object node (`ContractCompiler.ts:917`), one `INTRINSICS.apply` per key |
| 8.6% | `sortValues` | per-call index sort inside `readArrayEntries` (`helpers.ts:1045`) |
| 8.1% | `guards` | compiled guard driver |
| 2.3% | `matchesMember` | per-required-key membership query through `INTRINSICS.apply` |

## deep audit(valid) — where 21269 ns/op goes

| share | frame | source |
| --- | --- | --- |
| 10.3% | garbage collector | per-call allocation |
| 10.1% | anonymous `index.js:7495` | compiled audit plan closure |
| 9.1% | anonymous `index.js:2176` | `readValue` protected-read layer (`helpers.ts:759`) |
| 7.9% | `collectMembers` | per-call presence and declared sets (`ContractCompiler.ts:1443-1444`) |
| 5.6% | `attempt` | error-boundary closure + `Result` allocation per protected read (`helpers.ts:727`) |
| 2.6% | `get pattern` | shape accessor re-read per call |
| 1.4% | `readPatternFlags` | regex flags re-read per call (`helpers.ts:561`) |
| 3.1% | `preview` | string preview built on a VALID audit walk |

## Differential (with-literal vs no-literal medium object, is-valid loop)

`sortValues` persists at 8.0% with no literal member — it belongs to the object/array walk
(`readArrayEntries`), not to literal machinery. `collectMembers` drops 9.8% → 4.2% with one
fewer key. GC stays 11-14% in both.

## The mechanism (verified against source)

Per call, per object node, the compiled guard runs `enumerableKeys` (an `attempt` closure +
`Result` + `Object.freeze` of a fresh keys array per call, `helpers.ts:1151-1160`), then
`collectMembers(keys)` (fresh `Set`, one `INTRINSICS.apply` per key), then membership queries,
then per-key child guards. Per call, per array node, `readArrayEntries` (`helpers.ts:1023-1060`)
reads own names, round-trips numeric/text per index, sorts, copies into a fresh list, checks
`INTRINSICS.own` per index, and freezes the result — all inside another `attempt`.

Reading: the hostile-input hardening semantics are implemented as per-call allocation and
intrinsic `apply` indirection. The design question for the round: which of these costs can move
to compile time or to a non-allocating containment form (direct try/catch, hoisted intrinsics,
direct own-key checks, fast path for honest packed arrays with the defensive walk as fallback)
WITHOUT weakening any documented guarantee (guards never throw; exotic views refused; no
caller-visible mutation; frozen publications stay frozen).

## Coverage

Sampling profiles at default interval; inlined frames may attribute to callers; shares are of
sampled wall time in a hot loop, not of a single cold call. Cross-check against the independent
S1 source map before treating any single share as exact.
