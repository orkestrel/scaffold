# Audit verdict — unit conform-contract (2026-09-03)

Workflow `wf_85114e16-814` (`instruments/layer.workflow.js`, packages contract and test, the re-dispatch after the stop of `wf_0ab7f3dd-d5f`). Lanes: `reviewer` on Claude Opus 5 holding the objective lane as the recorded substitution for the dark GPT-5.6 Sol bench (`codex` absent from PATH, probed 07:24 UTC); `checker` on Claude Sonnet. Writer: `implementer` on Claude Opus 5 (the resumed unit and two fix rounds). Subject: the checkpoint commit 01f3390 (the stopped implementer's partial edits) plus the unit's uncommitted changes, judged as one unit against the baseline f38a649. Brief: `briefs/conform-contract-brief.md` (successor of `conform-contract-brief-1.md`); report: `reports/conform-contract-report.md`; evidence: `units/conform-contract.diff.txt`, `units/conform-contract.status.txt`; lane verdicts: `units/l0b/*-contract-*.json`.

| Round | Objective lane | Checker | Outcome |
| --- | --- | --- | --- |
| 1 | FAIL 2 9 (F1: the guide's § Tests list omitted the four added suites; F2 to F5 successor rows) | FAIL 3 7 | fix round 1 |
| 2 | FAIL 3 4 (F6: § Breaking's mirror enumeration false and `@orkestrel/mcp` absent; F7 campaign identifiers in test names; F8 to F10 record findings) | PASS | fix round 2 |
| 3 | FAIL 6 (F-A: § Breaking omitted `@orkestrel/brief` and under-named `@orkestrel/workflow`; F-B, F-C, F-D record extensions; referrals R1 to R3) | PASS | the round budget spent; F-A to F-D applied at landing as prescribed |

## Orchestrator's rulings

- **Claim 6 / F-A**: the lane's own wider pattern (`[A-Za-z_$][\w$]*\.type\b` over `src` and `tests` fleet-wide, ruled by receiver type) is the re-derivation; the report's § Breaking now carries the `@orkestrel/brief` entry (`tests/src/core/shapers.test.ts:304`), the twelve further `@orkestrel/workflow` sites, and the cleared packages by the read that cleared them. No fleet checkout carries an `app/` directory. The consumer edits are carried: database in `briefs/conform-database-brief.md` (with the `RowOf` criterion R3 names), workflow and brief to their L4 briefs at reconcile, mcp as a mirror refresh.
- **F-B, F-C, F-D**: applied at landing exactly as prescribed — § Successor rows item 2 extended with the named sites, the `tests` count row re-run with the full word set and its hits routed for ruling by sense, `guides/contract.md:870` added to the retained list, and item 1 extended with the internal-comment population and its first two sites.
- **R1** (the `description` grant): the brief's Owned row is amended to name `description`, which contract-subj-6 names and the template already grants; the unit's edit stands.
- **R2** (the brief's § Consumers list): read as the round-3 lane re-derived it; recorded in the brief's successor note.
- **R3** (sequencing): brief and workflow receive consumer units with the corrected patch lists before contract publishes (the publish wave re-pins in layer order, so a consumer's gates run against the released contract before its own release); database's `types.ts:463-466` edit carries a criterion that reads the resolved `RowOf`.
- Claims 4 and 8 as read by the lanes are the writer's transcriptions; the failing-first proofs are recorded in the report's § Failing-first evidence and the deciding run at landing settles the gate chain.

Ruling: ACCEPT at landing on the deciding gate run (`instruments/land-conform.mjs`: format:check, lint:check, check, build, test), recorded in the landing commit. The successor rows (items 1 to 4) and the `guides/contract.md` banned-sense residue contract-subj-5 could not reach go to contract's follow-on unit (`ledgers/followons.md`).

Terminal: `VERDICT: PASS`
