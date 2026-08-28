# Verification round 2 summary (slices s01-s11 plus mcp recorded exceptions, 2026-08-28)

Workflow `wf_bc8d51eb-52f`, identical terms to round 1: two blind Claude Opus 5 lanes per group
and an xhigh judge on every disagreement. Every agent completed; no lane returned empty. Compact
verdicts: `r2-verdicts.json`. Full per-lane rulings with evidence: `r2-lanes.json`. The h12
supplement (s11b) is ruled separately in `../h12-audit-verdict.md`.

## Outcome over the 335 verdicts

- DRIFT, repair stands: 206
- DRIFT-RESHAPE, violation real but the repair corrected: 73
- INVALID: 37
- EXCEPTION: 19
- Lane disagreements resolved by judges: 90

The judges also re-ruled the mcp audit's own recorded exceptions: the `MCPProgressReporter`
extra-surface exemption and the `_options` signature-compatibility exemptions flipped to DRIFT
(a guide passage is not an exemption source against the parity rule, and the `_` bullet's
operative directive is "remove the parameter when signature compatibility does not require it"),
while the arrow-function transport fields flipped to INVALID (the ban is scoped to function
bindings inside bodies) and the `is*`-predicate placements were upheld as EXCEPTION under the
Kind purity clause.

## Consolidated standing across both rounds and the h12 supplement

Verdicts in total: 624. Fix inventory: 345 DRIFT with repairs as written plus 154 DRIFT-RESHAPE
with corrected repairs. No fix work: 91 INVALID and 34 EXCEPTION. The registers, the open
objective referrals, and the fleet-level decisions (TSDoc voice migration or rule amendment;
the `patterns.md` batch-operations conflict with `guides/workspace.md`; the `architecture.md`
kind-purity conflict with `guides/html.md`'s guard families) gate on the user's scope ruling
before any fix unit dispatches.
