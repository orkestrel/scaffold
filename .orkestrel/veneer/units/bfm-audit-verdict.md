# B-FORMS-MIXIN — round verdict (the Orchestrator's verification, 2026-09-23)

The unit applied `b-forms-mixin-brief.md` on `builder`; its report (`b-forms-mixin-report.md`)
records the two mixins after `border-reset`, the two partials routed through them (with the `@use
'../mixins' as *;` line `_input-group.scss` lacked), the byte-identity record (`cmp` exit 0 after
the substitution and again after formatting; the swapped-order control exit 1 and restored), the
Unknown's ruling (no guide sentence describes the block form), and the gates: `test:setup` green
with the duplication-floor case passing, `test:conformance` green. The Orchestrator read the diff
the report carries. A fully specified builder round with a byte-identity proof takes the
Orchestrator's reading as its review; no lane ran.

The unit stopped, correctly, on the scoped browser run: `input-group.test.ts` "squares the control
or select inside a floating wrapper on the side its neighbour sits" reads the ungrouped select's
corner against the ungrouped control's (`selected` 6 against `round` 7) and fails since the SELECT
landing, because the shipped `.form-select` rule carries `border-radius: var(--bs-border-radius)`
where the `INPUT_GROUP_ROUNDING` fixture gave both bare controls one consumer radius. The compile is
byte-identical, so the failure is the SELECT landing's, not this unit's; carrier: B-FORMS-GROUP-READ
(`builder`), which reads each field's kept corner against its own ungrouped twin until B-FORMS-CLOSE
retires the fixture after CONTROL lands (D31).

B-FORMS-MIXIN is accepted; it landed on the session branch as recorded in fold 27.

VERDICT: PASS
