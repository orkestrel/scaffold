# Audit PD2 — re-warm recovery + stage fault doors (probe)

Role: checker. Read-only mechanical conformance review. Attempt REFUTATION of each claim from
the actual diff and sources; CONFIRMED needs the evidence that convinced you, BROKEN needs the
exact failing reading and the smallest correct fix. End with one terminal line: `PASS` or
`FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/orkestrel/probe` (baseline commit 12809a9,
writer GPT-5.6 Sol). The diff is captured at `/home/user/scaffold/tmp/units/pd2.diff`; the
writer's report is `/home/user/scaffold/tmp/codex/pd2-resume-last.md`; the ruling is
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` rulings 3 and 4. Supplied host
evidence (Orchestrator-run, authoritative): stage suites 82/82, Probe+ProbeServer 34/34,
`check:src:server` exit 0.

## Claims

1. `RuntimeStage` holds `#vitest: Promise<Vitest> | undefined`; a rejected warm or replacement
   clears the slot identity-checked (a newer resident is not clobbered by an older rejection);
   the next `inspect` warms fresh; a failed fresh warm clears again and rejects THAT inspection
   with the coded translation — no loop inside one call, no permanently rejected stage.
2. A warm failure of the workspace's own `vite.config.ts` reports `origin: 'workspace'`,
   `code: 'malformed'`, with `cause`; every other escaping non-`ProbeError` in `inspect`,
   `resolve`, and `destroy` across the runtime, type, and lint stages reports
   `origin: 'instrument'`, `code: 'malformed'`, with `cause` (ruling 4's one-door-per-stage).
3. The named unwrapped sites from the evidence are covered: `createSpecification` before the
   try, `#invalidate`'s Vitest calls, and the language-service calls.
4. The success-only recycle counter reset and close-then-warm replacement do not change the
   documented recycle bound (64 written specifications), and the sentinel-file fixture pin
   (config throws while the sentinel exists, recovery after removal) is present and drives the
   real path.
5. The tests added are red-first bound: each new pin's red record in the report names a
   mechanism whose removal (not an unrelated breakage) produced the red.
6. No off-limits file moved: the diff touches only the three stage files and their three test
   files; `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, guides, and
   `src/server/Probe.ts` are untouched.
7. The code obeys the repository laws in the diff's reach: no `any`, no assertions, no nested
   function declarations, `#` fields, one-word public members, centralized helpers exported and
   tested where extracted.

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
