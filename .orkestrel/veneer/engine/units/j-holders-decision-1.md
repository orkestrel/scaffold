# J-HOLDERS — a decision sent to the unit in flight (2026-09-25)

It was sent to the running writer as a message after dispatch. It changes acceptance criterion 5 of `j-holders-brief.md`, and nothing else.

The instrument counts a kill only when the failing case's message names an assertion failure: `AssertionError`, or the expect library's own assertion message. It reads every other failure as REFUSED, whatever that failure names. This replaces the brief's list of refused causes. The J-CASCADE audit (`units/j-cascade-audit-objective-verdict.md`) found that such a list still admits a thrown `Error('boom')` as a kill. One demonstration row plants `throw new Error('boom')` and reads REFUSED. `plan.md` § Landing procedure carries the rule.
