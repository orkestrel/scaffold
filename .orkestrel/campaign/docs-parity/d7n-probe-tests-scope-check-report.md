# Probe test landing scope checker

Ownership: CONFIRMED. The status and diff against 135aab7 list only
tests/src/server/Probe.test.ts.

Meaning: UNRESOLVED; subjective referral. The adapted drafts use function value
under helpers.ts. Assertions, reasons, projects, deadlines, and stage declarations
are unchanged in the diff. createHeavyDraft still creates a bare probe-heavy path
containing an exported HEAVY const at Probe.test.ts:48. Its type-stage deadline likely
prevents lint, but the brief's every-candidate wording needs an explicit scope ruling.

Evidence: UNRESOLVED. The initial red server log, final server and guide logs, and
typecheck log support their readings. Format and lint output logs were not retained,
so those claims rested on the writer report at this check.

Scope ruling: CONFIRMED. The changes stay inside the owned file. Project names,
receipt assertions, timeout and deadline values, stage declarations, ordering
assertions, and portability subprocess setup remain intact. Only candidate paths,
draft text, and formatting changed. Evidence: Probe.test.ts:769, :1688, and :1962.

The result projection records denied shell-chain and sandbox-disable requests. They
are process deviations, not evidence of successful bypass or source-scope expansion.

VERDICT: FAIL on meaning completeness and missing format/lint receipts.

The Orchestrator retained the returned claims with prose-only normalization. The
substantive findings remain unchanged.
