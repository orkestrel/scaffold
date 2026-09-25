# Unit J-CASCADE, round 2 — bound when each completed event arrives, and count a kill only on an assertion

Successor of `j-cascade-brief.md`. Its sections stand except where this brief replaces them.

**What the audit found** (`units/j-cascade-audit-objective-verdict.md`, `analyst` on Astra, thread `01a0d638-c72d-7610-8c17-c23a04951f26`; the checker passed, `units/j-cascade-audit-checker-verdict.md`):
- **Claim 3 fails.** No motion-factor case bounds when the completed event arrives. An engine that waits a fixed 1000ms, reading neither animations nor tokens, passes all five cases. At factor `0` it still completes eventually, and at factor `4` it records `finished` near 600ms before completing near 1000ms.
- **The instrument's refusal rule is a denylist.** `verdict` labels any failed case `KILLED` unless its message matches a refused signature, so a collected case failing with `Error: boom` would count as a kill.

Claim 1's failure, the custom-vocabulary `.is-fading` case in `Alert.test.ts`, is the Orchestrator's wording error: that case correctly loads its own rule. It needs no change.

The branch `unit/cascade` now carries a merge of Veneer `main` `4cd56a8` over your commits `4765f6f` and `a963585`. Work on that tip, and run no merge yourself.

## The obligations

- **R1: each motion-factor case bounds the arrival.** In each of the five cases (Alert, Tab, Toast, Tooltip, and Popover):
  - at factor `0`, assert that the completed event and the call's resolution arrive before one frame passes, for example by racing the call against `waitForFrame()`;
  - at factor `4`, assert that the event arrives after the transition's `finished` and before one further frame passes.

  Use no timer and no fake clock.
- **R2: the instrument counts a kill only on an assertion.** A failed case counts as `KILLED` only when its failure message names an assertion failure, meaning `AssertionError` or the expect library's own assertion message. Any other failure reads `REFUSED`, whatever it names. Add:
  - a row `FIXED`, which replaces `settleAnimations`' body with a fixed 1000ms wait and must be killed in every motion-factor case;
  - a demonstration row that plants a thrown `Error('boom')` and must read `REFUSED`.

  Re-run every row.

## Scope

As round 1, with round 1's owned files. The guide is unchanged this round.

## Output

Your final message holds:
- the files touched;
- R1's cases with their readings under the `FIXED` row, verbatim;
- the instrument's rule;
- the mutation table from the log;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it.
