# Audit verdict — docs-proposal round 2

Subject: `PROPOSAL.md` after fix round 1 (1292 lines). Brief: `tmp/units/docs-proposal-audit-2-brief.md`. Lanes run, blind, in Workflow `wf_16f4ba65-ada`: subjective on `reviewer` (Opus 5); objective on `reviewer` (Opus 5), the recorded substitution for the dark Sol bench; `checker` on Sonnet in addition. No lane returned empty.

Terminal lines: subjective `VERDICT: FAIL 2, 9, 10; outside the claims: F1, F2, F3`; objective `VERDICT: FAIL 2, 9, 10; outside the claims: F1 to F8`; checker `VERDICT: FAIL 6; outside the claims: none`.

Held: claim 1 (every fix 1 to 21 applied as prescribed, confirmed by all three lanes), claim 3 (every touched pointer resolves; the checker sampled 23), claim 4 (no count without its command), claim 5 (rule ids), claim 7 (refusals and probes), claim 8 (the checks tables), claim 2 (a), (b), (d); Option 2's worked example now shows the guide sentence verbatim.

Reconciliation: every remaining finding is a wording or table-cell correction with the lane's exact prescription, within the threshold the brief fixed for a serial patch by the Orchestrator, except two that needed a ruling: the README head region (subjective F1, objective F2), ruled as one region per `README.md` span, each rendered from a named guide passage, with `README.md:6-23` inside as the vendored-set paragraphs rendered from `guides/scaffold.md:15-27`; and the multi-region splice (objective 2(e) and 10), ruled settled by the objective lane's code reading — `Materializer.catalog` writes `CATALOG_AGENT_PATH` alone through `#rewrite`, `#recatalog` is private and bound to the catalog markers — so the render carries its own splice in `@orkestrel/guide`, per R4, and probe 3 becomes a settled reading with a stability proof for the first unit. The patches were applied by the Orchestrator's recorded script `instruments/round-2-patches.py` (each patch names its finding and stops on an anchor that is not found exactly once), then `oxfmt --write PROPOSAL.md`, then `oxfmt --check` (clean, 1307 lines). Round 3 confirms each patch against its prescription and runs the authoritative gates.

| Finding | Patch tag | Ruling |
| --- | --- | --- |
| subjective 2(c), objective 2(c) | `S2c` | the subjective lane's sentence adopted verbatim |
| subjective F3 | `S-F3` | code span rewritten without the trailing space |
| objective F1 | `O-F1` | prescription adopted |
| objective F3, F4; subjective F1 (pitch span) | `O-F3`, `O-F4`, `S-F1a`, `S-F1b` | pointers corrected; the pitch is `README.md:3-4` at both sites; the vendored-set pair is `README.md:6-23` |
| objective F6 | `O-F6` | `src/core/constants.ts:122-123` cited beside `guides/README.md:33-37` |
| objective F7 | `O-F7` | `table` named as read, with its pointer, at both sites |
| checker 6 | `C6a`, `C6b` | headings lower-cased after the em dash |
| subjective F1, objective F2 | `README-row`, `README-stage3` | Orchestrator ruling: one region per span with its guide source |
| objective 2(e), 10 | `splice-mech`, `splice-risk`, `probe3` | Orchestrator ruling on the objective lane's reading: the render carries its own splice |
| objective F8 | `O-F8` | closing marker qualified |
| objective 9, subjective 9 | `O9-opt1`, `O9-opt2` | both prescriptions adopted |
| objective F5 | `O-F5` | prescription adopted |
| subjective 10 | `S10` | prescription adopted |
| subjective F2 | `S-F2` | pointer dropped |
| checker (outside) | `C-roadmap` | `ROADMAP.md:127-128` at every site |
