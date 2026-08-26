# Fix round — audit round 1 repairs

Units FA, FB, FT, FC, FL, FP, F9 returned 2026-08-26, every acceptance met, no deviations beyond
recorded in-scope judgments.

- **FA scaffold** (implementer): portability frontmatter widened to its governed populations; the
  case-fold and permission-bit rule lines replaced with the measured forms; the architecture
  sweep-section bullets split and corrected (rule-map parity its own bullet, populations named by
  their globs, count removed, `EOL` import form added); rule-map parity retagged to a `rules`
  `PolicyRule` member with failing-first control evidence (2 failed | 108 → 110 passed); the
  workflow's phantom `test:integration` step deleted with the Node-floor comment added;
  `host.json` restaged; policy 110, config 46, format/lint/check green.
- **FB browser** (implementer): `close` bullet and guide rows take the endpoint-owner wording;
  contracts 12/13 corrected; `ensures` gone; `#adoptedPid`→`#servingPid`,
  `#adoptEndpointOwner`→`#takeEndpointOwner` (one term per concept — `adopt()` keeps the public
  ownership sense); `COOPERATIVE_SIGTERM` exported from `tests/setupServer.ts` and consumed by
  both gating sites. Item-7 ruling by instrument: the removed transport-loss liveness probe was
  unreachable dead code (`ChildProcess.kill(0)` returns `false` on ESRCH; the only reachable
  `catch` branch, EPERM, misclassified a live process), proven by an `Atomics.wait` probe holding
  the exit event undelivered — old and new paths agree in the disputed window; invariant stated
  beside the deferral. Browser.test 108 | 1 under default Edge discovery; all gates green; no
  leaks. Shared-file patch for `src/server/helpers.ts` TSDoc returned and applied serially by the
  Orchestrator.
- **FT terminal / FC console / FL lsp** (builders): stale `CONTROL_NAMES` prose completed; the
  contradictory console guide sentence corrected; lsp fences fully declared with imports; each
  repo's workflow gains the Node-floor comment; all scoped gates green.
- **FP probe** (builder): `Overlay` constructor takes `OverlayOptions` (`{ readonly sensitive?:
  boolean }`) declared in `types.ts`; call sites, tests, and guide updated; 31 scoped tests plus
  all gates green.
- **F9** (builder): the Node-floor comment added in sea, mcp, test, and process workflows —
  every fleet workflow now records the limit.
- Orchestrator-owned closures: B5 revert-proof counts and PR0 control naming appended to their
  reports; fleet probe extended with per-inspector foreign-root controls (all red as controls, the
  fleet reading stays empty; one malformed plant caught by its own control and rewritten).

Audit round 1 closes: every broken claim repaired by adopted prescription (with failing-first or
instrument evidence where the prescription touched behavior), every finding carried, nothing
dropped.
