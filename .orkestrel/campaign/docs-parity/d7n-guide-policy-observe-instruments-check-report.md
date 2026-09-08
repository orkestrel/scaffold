# Guide policy observation instruments check

1. O1 — CONFIRMED

Evidence: `tmp/pass/guide-policy-observe.mjs:10-20,26-38,66-105` limits fixture paths to the named files, copies `.oxlintrc.json` and `configs/policy.ts` byte-for-byte, and writes the exact inert fixture text matching `tests/config.test.ts:1755-1810`. `mkdtempSync` creates isolated temporary roots, and the output directory is supplied by the wrapper. The real binary is resolved from the guide installation and invoked without executing fixture behavior.

2. O2 — BROKEN

Evidence: `tmp/pass/guide-policy-observe.mjs:49-55` parses stdout and requires the JSON root itself to be an array. The actual config case at `tests/config.test.ts:1847-1863` parses an object and reads its `diagnostics` property, so the observer rejects the real envelope as `oxlint JSON has no diagnostics array`. Also, `run()` throws at lines 47-53 before returning its result when spawning or parsing fails, and the script writes `observation.json` only at line 141 after all runs succeed; raw stdout, stderr, status, error, and signal are therefore not retained in the output envelope on collection failure. The ordinary lint exit is otherwise represented as `status` data only after successful parsing.

3. O3 — CONFIRMED

Evidence: `tmp/pass/guide-policy-observe.sh:18-55` creates a fresh output directory under `$SCR`, captures guide status and diffs before and after, invokes the observer under `timeout 120`, and retains the wrapper log and final state through its EXIT trap. Collection failures remain nonzero, and a successful collection with changed tracked state is changed to failure. The wrapper performs no install, deletion, source repair, or docs/config mutation.

Syntax evidence: `node --check tmp/pass/guide-policy-observe.mjs` and `bash -n tmp/pass/guide-policy-observe.sh` each exited 0. No instrument body or package command ran.

VERDICT: FAIL O2; outside the claims: none
