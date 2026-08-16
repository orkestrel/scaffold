# Unit: debrief-sweep — A-campaign record absorption

Role: `grok`. Engine: Cursor Grok (`cursor-grok-4.6-high`). Read-only absorption. Return
distilled evidence with pointers, never decisions, never raw dumps.

## Objective

Sweep the A-campaign record at `.orkestrel/debrief/record/` (35 markdown files) and return
the evidence rows the debrief needs, each with a verbatim quote and a `file:line` pointer.

## Context

The A-campaign closed ten exit items; `a-acceptance.md` names them. Units A6-A11 each left
brief/report/verdict files. `a-plan.md` holds the plan and its process laws. `a0-*` hold the
absorb round. `a-design-*` hold the two design lanes.

## Questions — return one section per question

1. **Deviations.** Every deviation report or stop-and-report in the record: quote the exact
   sentence, name the unit, and quote the recovery that followed it.
2. **Audit rounds.** For every verdict file: the exact terminal line (`AUDIT:` / `REVIEW:` /
   `REVERIFY:` ...), which numbered claims failed, and whether a later file shows them
   closed. Name any round that produced zero substantive findings.
3. **Durations and caps.** Every place the record states an estimated versus observed time,
   cap, or timeout, verbatim.
4. **Retained findings.** Every finding the record explicitly defers to a future round,
   verbatim, with the capability it was recorded against.
5. **Instruction friction.** Every sentence that attributes lost time, a failed dispatch, or
   a wrong turn to the wording of a rule, role charter, skill, or the orchestration
   contract, verbatim.
6. **Re-runnability.** For each unit A6-A11: whether its brief, report, and verdict all
   exist under `record/`, and every path the record cites that is NOT under `record/`
   (session scratchpad, tmp, workspace paths), quoted.

## Scope

Read only `.orkestrel/debrief/record/**`. Off-limits: `.orkestrel/debrief/ledger.md`,
`tmp/**`, everything else. No decisions, no design, no edits.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Six sections mirroring the questions. Each row: `file:line`, short verbatim quote, one-line
context. End with `Unknowns:` listing unresolved facts.
