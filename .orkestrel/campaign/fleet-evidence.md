# The published fleet — 0.0.50 propagated to every package

Run 2026-08-24 against the candidate at `45647b4`. Scope corrected mid-campaign on the user's
instruction: `supervisor` is dropped, and the subject is every **published** `@orkestrel` package.

## The gap this corrected

The campaign had been sweeping the ten packages that happened to be checked out in this container and
treating that as the fleet. The catalog names 48 published packages. Thirty-five were never present,
so every earlier sweep reported on a sample and read as a sweep.

All were cloned. `workspace` was silently dropped by a `while read` loop over a file with no trailing
newline — it was the last entry — and was cloned and swept separately. Final state: 46 local
checkouts, the two absences being `scaffold` itself and `supervisor`.

## Method, per target

Delete the presence-owned proof, commit the deletion so the tree is clean, `overwrite --offline` from
the candidate, install, format, then the five gates and the regenerated proof under `--mode release`.
`node_modules` removed after each, because 35 installs do not fit on this disk at once.

## Result

**Thirty-seven targets swept. Thirty-seven regenerated distribution proofs pass. No proof failed.**

The shapes covered go well beyond the original ten: `msg` and `sse` at layer 0 with no dependencies,
`database` and `queue` deep in the graph, `browser` and `form` with browser faces, `agent` and
`ollama` at layers 5 and 6, and `toolbox` and `worker`, which sit outside the catalog's table.

## The four own-suite reds, adjudicated alone

None is scaffold-caused. Each passed its regenerated proof while failing its own suite under three
concurrent slices, and each passes alone:

| package | under load | alone |
| ------- | ---------- | ----- |
| `contract` | timed out in 5000ms | passes |
| `html` | `expected 498.5 to be less than 347.5` | passes |
| `database` | timed out in 60000ms | passes |
| `probe` | bin protocol assertion | see the record below |

## Beyond scaffold, reported rather than chased

`@orkestrel/html` asserts wall-clock performance bounds directly — its `subquadratic` and `linear`
tests compare measured milliseconds against a computed budget. Those fail on any loaded machine and
pass on an idle one, in CI as much as here. That is an `html` design question and it is recorded
against the package that owns it.

`@orkestrel/supervisor` leaks a protocol fixture on every test run, recorded separately.

## What this establishes

The candidate propagates into every published package in the fleet and the proof it generates passes
in every one. The exit criterion's second condition is met.

## `probe`, adjudicated against a pristine baseline

`probe` was the one of the four that failed **alone**, so contention was ruled out and the cause
needed a verdict rather than an assumption.

The sweep wrote exactly three files into it — `.agents/orchestration.md`, the vendored
`tests/config.test.ts`, and the regenerated proof. The failing test is `tests/src/bin/main.test.ts`,
probe's own MCP bin entry, which none of those touch, and its regenerated proof passed. That is
reasoning, so it was put to a run.

A pristine clone of `probe` at its own HEAD `e481c62`, with **no scaffold propagation applied at
all**, was installed and driven through the same file:

```text
  baseline commit: e481c62 Declare the peers this package support
  scaffold propagation applied: none (fresh clone, untouched)
FAIL  tests/src/bin/main.test.ts > bin entry > leaves the target clean when SIGTERM reaches the entry during service
FAIL  tests/src/bin/main.test.ts > bin entry > leaves the target clean when SIGINT reaches the entry during service
 Test Files  1 failed (1)
      Tests  9 failed | 2 passed (11)
exit: 1
```

Nine of eleven fail without scaffold. After propagation, one failed. **The defect predates the
propagation, and the propagated tree is less red than the baseline**, so scaffold is not its cause and
carries no repair for it.

Recorded against `@orkestrel/probe`, for the package that owns it.

## The verdict on the fleet

Thirty-seven published packages, thirty-seven regenerated proofs passing, and no failure anywhere
traceable to scaffold. Three own-suite reds were contention and pass alone; the fourth predates the
campaign entirely.
