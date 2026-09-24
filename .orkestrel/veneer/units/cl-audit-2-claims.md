# Audit claims — LEDGER (`cl`), round 2

Subject: round 2's record — `cl-2.diff` and `cl-2-status.txt` (the worktree `/home/user/veneer-cl`
against `42fd88e`), the revised shared patch `cl-shared-2.patch` (one unified diff against `42fd88e` that
supersedes `cl-shared.patch` whole), the report `b-cross-cl-report-2.md`, and the round-2 records under
`cl-instruments/` (`cl-mutations-2.log.txt`, `cl-mutate-3.py` and its JSON specs, `cl-setup-green-2.log.txt`,
`cl-measure-2.log.txt`, `cl-width-2.log.txt`, `cl-guide-2.py`, `cl-scratch-2.sh`, `cl-gates-2.sh`, and the
`cl-gate-round2-*` logs) — against the successor brief `b-cross-cl-brief-2.md` (L-a to L-c), the round-1
verdict `cl-audit-verdict.md` and its lane verdicts, and round 1's record. The unit was written by
`opus` on Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line`
evidence, and before confirming a claim about a proof names the mutation that would make the proof fail
and whether its assertions distinguish that mutation from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
verdict's rulings stand, and every claim it confirmed stays confirmed unless round 2 changed its
subject; the Orchestrator's apply check (`cl-shared-2.patch` on a fresh `42fd88e` extract, exit 0)
settles the apply clause; the width criterion's exclusion of table rows is admitted, because a Markdown
table row cannot wrap and the brief lets the § Files table reflow; the rewritten § Additions `Category`
sentence is in scope, because removing the category made it false.

1. **Scope and delta.** `cl-2-status.txt` lists round 1's owned paths and nothing else; against round 1,
   the shared patch changes only `guides/veneer.md` and the conformance case title.
2. **L-a: the guide.** Every added prose line wraps at 100 columns (`cl-width-2.log.txt`); the rewritten
   § Files row names the tables `tests/setupServer.ts` reads, and each table it names is one that module
   reads; the routing, treatment, `Category`, and § Tests sentences read true against the code.
3. **L-b: the TSDoc and the title.** Every member token in the TSDoc round 1 added or round 2 edited
   carries its noun; the retitled presence case names the recorded animations, and the old title
   appears nowhere else.
4. **L-c: the refusal.** The `collectAdditions` function throws for any animation the inventory records
   under no shipped key, the withheld key's animation included; the `keyframes` member is gone from the
   `AdditionCategory` type and the `isAdditionCategory` guard with no remaining consumer; the plants P1 to
   P3 each redden the case the log names, and the assertions distinguish each; P4 and P5 redden the
   conformance cases the log names; the measurement finds no shipped key that records animations without
   a shipped selector row.
5. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report quotes each gate's result line from its log, states no
   temporal word, and follows every code token with its noun; the lane lists every count the report
   states, for the record.
