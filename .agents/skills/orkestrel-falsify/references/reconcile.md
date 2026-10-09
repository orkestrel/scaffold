# Reconciling a round and ruling on it

The Orchestrator reconciles and accepts; no lane does. Run a finding rather than argue it.

## Reproduce before acting

- Treat a lane's finding as a hypothesis until you have run it against the built output. Reproduce every `BROKEN` and every outside finding by hand before it enters a fix brief.
- Construct the hostile input outside the `try` and guard only the call under test, so a harness fault (a missing import, a wrong arity, a `require` in ESM) crashes loudly instead of reading as the finding.
- Record which outcome the reproduction produced: confirmed and wider than reported; confirmed and bounded smaller; or evaporated because the input could not exercise what it claimed.
- Separate a dead finding from a dead vector: a vector the compiler rejects refutes the vector alone. Re-derive one the types admit and record which vector was tested.
- Apply the same discipline to your own probes; a probe whose input cannot reach the code under test reads exactly like a real pass.

## Resolve a disagreement

When lanes return opposite verdicts on one claim, reproduce first; never average them and never prefer the engine you trust more. Then name the question each lane answered.

- Both right about different objects: the claim was a universal carrying more than one subject. Split it, keep `BROKEN` on any broken subclaim (`SPLIT-CLAIM` is a note, never a verdict value), and carry the split into the successor brief.
- Both right about different halves of one claim number: split and renumber.
- One right on the mechanism, the other on the criterion: take both constraints; the reconciled ruling satisfies both.
- An argument that an input class is unreachable: run it and show the reachable consequence.

Record which engine was right and on what.

## Evidence custody

- Never edit a returned verdict, whoever wrote it.
- Write anything a lane says after seeing another lane's report as a separate file beside the verdict under `.orkestrel/<package>/`, named for the unit and the exposure, recording what was shown and to whom. That file is a durable record, never a journal: it survives the campaign sweep, and its contents are promoted into the acceptance record before the folder retires.
- Reach for such an exchange only when a specific factual question survives reproduction; scope it to that question, initiate it yourself, and run it once. Ask the lane to attack the other's evidence on that question; never ask it to resolve the disagreement, reconsider its position, or say whether the other changed its mind.

## Bound the finding

- State what is not broken and why the adjacent behavior that looks identical is correct.
- List the hostile inputs adjacent to the hole that are correctly contained.
- Where several exports answer a hostile input the same way and one is wrong, name what makes the difference.

## Bound the fix before briefing it

- Put in the fix brief what over-correcting would break. Refuse both a patch to one function that leaves the package holding two standards for the same thing, and the strictest sibling's rule adopted verbatim, which breaks a legitimate caller.
- Find the rule that fits both ends: a rule about agreement (what a reader reads, its answer must carry) that dissolves the special cases rather than enumerating them.
- Measure a proposed fix as a claim: run it against the set it must not break, including every case an earlier round pinned. Where it fails that set, document the limit on the helper that owns it and pin the limit with a test that names it.
- Where the choice is open, it has a subjective and an objective half: send it to a blind design pass before code.

## Certify an instrument

`.claude/rules/quality.md` § Instruments binds the control-population law. The procedure:

1. Write the instrument's membership rule in one sentence.
2. Name what the rule excludes and draw at least one control from there. Controls drawn only from what the instrument obviously covers prove discrimination inside the population and nothing outside it: an AST comparison blind to literal classes absent from its bodies, a call-closure pin green for a function reached only through a parameter default.
3. Write what the controls established and what they did not.

## Rule

- Every retained finding names the fix-brief item that carries it; walk the list once.
- Drop, on the record, anything no lane can substantiate against the evidence.
- Promote anything that must outlive the round into a durable artifact before the working files are swept.
- Assign the fix round's lane to an independent reviewer per `.agents/orchestration.md` § Engines. The next round's brief is this round's successor.
- Accept when the claims are satisfied on evidence (`VERDICT: PASS` against a claim set covering what the subject owns), never on green gates alone. Bound the claim set at the brief, rule on what it returned, and close; never re-run because an attack can still be imagined.
