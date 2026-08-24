# Audit PD4 — byte-identical control refusal (probe)

Role: analyst. Engine: GPT-5.6 Sol. Read-only: audit, never edit. Attempt REFUTATION of each
claim; CONFIRMED needs the evidence that convinced you, BROKEN needs the exact failing input
and the smallest correct fix. Terminal line: `PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/orkestrel/probe` (baseline 5a23316,
writer Claude Opus 5). Diff captured at `/home/user/scaffold/tmp/units/pd4.diff`; the writer's
report is in the campaign record's terms: admission check `#admit` at `src/server/Probe.ts:616`
called from `prove` at `:135`; the ruling is
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` ruling 2. Supplied host
evidence (Orchestrator-run): `tests/src/server/Probe.test.ts` complete and green,
`check:src:server` green.

## Claims

1. `#admit` refuses exactly byte-identity: it projects each side to `{ files, test }` (so
   `stage` and `reason` cannot rescue an identical file set) and compares through the real
   `computeDigest`; a control differing by one byte anywhere in `files` or `test` is admitted.
   No relatedness approximation beyond identity entered.
2. The refusal fires before any stage runs, before arming is awaited, with
   `origin: 'claimant'`, `code: 'refused'`, and the precedence matches the existing `#support`
   refusals; the `@throws` documentation moved to `ProbeInterface.prove` and the `Claim` remark
   widened to the whole case.
3. The red-first pin binds: red showed the identical control reaching the workspace's arming
   failure (proof it got past the absent admission), green shows the refusal; the near-miss
   controls (one byte apart in a candidate draft; one byte apart in the test) are admitted and
   reach arming — the negative controls prove admission is not over-broad.
4. The eleven repaired fixtures still measure their original subjects: `varyDraft` appends one
   inert comment line, and no repaired fixture's assertion weakened (sample at least three
   across different subjects — deadlines, queue order, teardown — and verify their assertions
   are unchanged apart from the varied control).
5. The digest equality cannot be defeated through the projection: `computeDigest(workspace,
   case)` reads `files` and `test` only (read its implementation) — no claim member outside the
   projection influences the digest, and no member inside it escapes comparison.
6. The diff obeys the repository laws in its reach (no `any`, no assertions, `#` privacy,
   module-scope helper placement for `varyDraft` per the test-file conventions, TSDoc forms).

## Method

Read the diff and sources; you can run scoped read-only commands and non-spawning scoped tests.
If a run is denied, judge from source and say so per claim.

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
