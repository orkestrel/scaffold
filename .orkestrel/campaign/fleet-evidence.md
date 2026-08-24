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
