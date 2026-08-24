# Audit W3 — bounded createTeardown adoption (probe)

Role: checker. Read-only mechanical conformance review. Attempt REFUTATION of each claim;
CONFIRMED needs evidence, BROKEN needs the failing reading and the smallest fix. Terminal
line: `PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/orkestrel/probe` (baseline fb6d698,
writer: native builder). Diff at `/home/user/scaffold/tmp/units/w3.diff` (long — read it
whole). The ruling: `createTeardown` adoption is bounded to `finally` blocks holding MORE
THAN ONE teardown call; single-call blocks stay byte-identical. Supplied host evidence
(Orchestrator-run): every scoped suite the writer ran green, plus the two spawning suites
green on host after a fresh build (the lint stage suite and the bin suite complete).

## Claims

1. **Ordering preserved.** Read the installed `createTeardown` declaration
   (`node_modules/@orkestrel/test/dist/src/core/index.d.ts`) and confirm its `destroy()`
   runs handlers newest-first; then verify, by sampling at least six converted blocks across
   different files, that each conversion registers handlers in the REVERSE of the original
   statement order, so execution order is unchanged.
2. **Failure semantics strengthened, never changed where swallowing was the point.** A
   converted block now aggregates handler failures instead of an early throw skipping the
   rest; the skipped blocks whose original teardown deliberately swallowed its own failure
   (`.catch(() => {})`) stay byte-identical — verify each skip in the writer's ledger
   against the file.
3. **The bound holds.** Every remaining multi-call `finally` block in the owned files is in
   the skip ledger with a valid reason; no single-call block was converted; the
   block-bodied-arrow wrappers exist only where a handler's return type is not
   `void | Promise<void>`.
4. **No assertion weakened.** No test's assertions changed — the diff touches teardown
   blocks and imports only (the one sync→async `it` callback change is teardown-driven and
   alters no assertion).
5. Scope honesty and law conformance: only the seven named test files moved; no off-limits
   file; no `any`, no type assertions, explicit `.js` import extensions.

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
