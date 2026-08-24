# Re-baseline 3 — after R8 (2026-08-24)

R8 moved the transport contracts and returned a blocking patch pair: without a `HOST_PATHS`
entry for `.agents/transports`, a regeneration drops the moved contracts from the vendored set
while the vendored driver charters keep pointing at them. R8 also observed that the same edit
shape closes re-baseline 2's template vendoring.

Rulings:

- **R11 is satisfied by integration.** The `HOST_PATHS` additions (`.agents/templates`,
  `.agents/transports`) and the `tests/distribution.test.ts` rows for
  `.agents/templates/brief.md`, `.agents/transports/claude.md`, and
  `.agents/transports/codex.md` (with the two old transport rows deleted) landed as exact
  integration patches in R8's commit, validated by the scoped core typecheck and the policy
  sweep. R11 is struck from the queue.
- The integration regeneration order is fixed: `npm run build` (the `src/core` constant moved),
  then `npm run build:host` and `npm run build:inventory`, then `test:config` and the full
  gates.

Open carriers, restated: the R4 fix round (audit prescriptions, next commit); the pre-existing
`easier` at `.claude/agents/reviewer.md:40` and the pre-existing `below` in the
align-packages load list, both for the final integration sweep; R9 and R10 still queued.
