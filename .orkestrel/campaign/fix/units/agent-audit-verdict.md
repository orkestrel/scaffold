# Audit verdict — unit breaking-agent

Bench: Sol dark; objective and subjective lanes on the writer's engine (Opus 5) in clean
contexts, told so; `checker` and `verifier` on Sonnet. Subject: commit `df12fab`
(`units/agent.diff`, `units/agent-report.md` with the Orchestrator's corrections,
`units/agent-report.json`), then the fix-up at `f0c4979` (`units/agent-fixup-brief.md`,
`units/agent-fixup-report.md`, `units/agent-fixup.diff`, `units/agent-fixup.status`, checker lane
`units/agent-fixup-audit-checker-brief.md`). The subjective lane ran: two discriminant renames,
an event rename, a run-state restructuring, a cascade rename family, and four bare data types,
above the wide-unit trigger. The unit ran against `workflow-bcf8ab4.tgz` and re-staged on
`workflow-9f00455.tgz` before its audit; its tree names none of the symbols the workflow fix-up
moved.

| Claim | Objective | Subjective | Checker | Verifier | Orchestrator |
| --- | --- | --- | --- | --- | --- |
| 1 rows (referral s18, s08-12, -13, -14, -19, -22, -23, -28, -29; the s08-16, -24, -21 carriers; the report amendment; the carry) | CONFIRMED (F6 on the carry row's silence) | — | CONFIRMED | — | stands; the omitted carriers are no-ops, recorded in the report |
| 2 no old name; the new contracts in `types.ts` | BROKEN (`chunk.type` in the `createAgent` example) | — | CONFIRMED | — | closed by the fix-up |
| 3 ruled form (the run outcome returned, `#pump` driving by hand, `#trim` returning the latch; the constructor collapse complete) | CONFIRMED | CONFIRMED | — | — | stands |
| 4 no alias or shim | CONFIRMED | CONFIRMED | — | — | stands |
| 5 guide rows, `INTERNAL` empty, executed assertions for `fault` | — | BROKEN (seven residues) | CONFIRMED | — | closed by the fix-up |
| 6 only owned files | CONFIRMED | — | CONFIRMED | — | stands |
| 7 gates | — | — | CONFIRMED as quoted | GREEN (606 src; policy 111; config 46; setup 34; guides 83) | stands |
| 8 nothing hidden | BROKEN (the s08-12 row claimed an example it never reached) | — | — | — | closed by the report correction |

Rulings of record: `attachUserImages`, `#trim(messages, latch)`, the deleted duplicate hydrate
tests, and `InstructionManagerInterface.format` beside `InstructionManagerOptions.format` and
`InstructionInterface.format` stand as the subjective lane recommends; the `RunOutcome` remark
stops calling a published type internal (objective F5); the seeded `RunOutcome` in `#pump` is a
masked-not-surfaced guard recorded for a future drive change (F4); `InstructionInterface.format`
as a string beside the object-shaped manager members is a successor row for the per-item level;
the stale vendored `guides/workflow.md` and `guides/budget.md` mirrors refresh at the re-pin
(the W-END `mirror-refresh` row, blocked while publishing is held).

Fix round (`builder` on Sonnet, `f0c4979`): the `createAgent` example switches on `category`; the
`estimateMessages` TSDoc and the fence comment name `consumer`; the image examples return the
placeholder their input carries (`<payload>`, extended to the two self-consistent sibling sites
so the sweep holds under one convention); the `AgentJobError` row names the `partial` policy; the
`open` and `snapshot` rows name the `snapshot` seam and option; the `RunOutcome` remark states
what the value is. Landed with the full chain green (`instruments/land-fixup.mjs`, log
`land-fixup.log`). Checker on the fix-up: PASS, claim 5 UNRESOLVED on the report's bare script
labels and settled by the landing chain.

Recorded for the next change: `guides/agent.md` `consume` as a method reference stands; the
`README.md` `guides/src/` links (the `readme-links` sweep); the `AgentEventMap` Types row gained
`exhaust` in place while the row was rewritten.

Terminal lines: objective `FAIL 2, 8` and subjective `FAIL 5` closed by the fix-up and the report
correction; checker PASS on both rounds; verifier GREEN. **Verdict: PASS.** The unit closes
**applied** for every row. Tip packed: `agent-f0c4979.tgz`.
