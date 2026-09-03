# Audit verdict — unit conform-budget (2026-09-03)

Workflow `wf_7aac4ec2-e19` (`instruments/audit.workflow.js`, packages sse and budget). Lanes: `reviewer` on Claude Opus 5 holding the objective lane as the recorded substitution for the dark GPT-5.6 Sol bench (`codex` absent from PATH, probed 07:24 UTC); `checker` on Claude Sonnet. Fix rounds: `implementer` on Claude Opus 5. Subject: the checkpointed unit at 654fe45 on top of the dependency-pass commit 3bf73d5, with the fix rounds' uncommitted edits. Brief: `briefs/conform-budget-audit-brief.md`; report: `reports/conform-budget-report.md`; evidence: `units/conform-budget.diff.txt`, `units/conform-budget.status.txt`.

| Round | Objective lane | Checker | Outcome |
| --- | --- | --- | --- |
| 1 | FAIL | PASS | fix round 1 adopted the lane's prescriptions |
| 2 | FAIL | PASS | fix round 2 adopted the lane's prescriptions (F1 filtering half; F2 recorded) |
| 3 | FAIL 8 | PASS | claims 1 to 7 and 9 CONFIRMED; claim 8 UNRESOLVED on its first conjunct |

## The third round's objective verdict (immutable; the verbatim text is in the workflow journal)

Claims 1 to 7 and 9 CONFIRMED with file:line evidence, each attacked (repairs read against the shipped bytes, sweeps re-run and their population re-derived, the sixth-getter parity risk, a fleet-wide serialization grep over the four real consumers, a line-count reconciliation attributing package.json and package-lock.json to the dependency-pass commit 3bf73d5). Claim 8's second conjunct CONFIRMED (no `.skip`, `.only`, `.todo`, retry, or inflated timeout); its first conjunct UNRESOLVED because the dispatch supplied no verifier reading and the brief instructs that ruling. Finding F3: the byte-identical `guides/budget.md` mirrors in agent, middleware, ollama, and workflow are stale against the unit's guide, and the report's § Shared-file patches reads "None". Referrals R2 (`src/core/types.ts:6-7` still states the `id` default as prose) and R3 (`defineThrowingProperty` mutates its argument, the signature budget-obj-6 prescribed). Observations: `tests/guides.test.ts:2` and `:37` use `below` and `:2` states a count; `guides/README.md` § Dependency reference names two mirrors while the folder carries five; `tests/guides.test.ts:211-212` names array items by position.

Terminal line returned: `VERDICT: FAIL 8; outside the claims: F3`

## Orchestrator's ruling

- Claim 8: the seam is structural, not a defect. A read-only lane cannot produce the independent gate reading the claim requires, so three rounds could never close it; the settling condition is the Orchestrator's deciding run at landing (`instruments/land-conform.mjs`), which the handoff names as the verifier's equivalent. The landing ran format:check, lint:check, check, build, and test; every gate exited 0, and the unit committed and pushed.
- F3: no hand edit. A vendored dependency guide is a mirror that refreshes rather than rewrites (`.claude/rules/documentation.md` § Parity), and the campaign's standing rule is that mirrors refresh at re-pin. Carrier: the publish wave's per-layer re-pin and mirror refresh (`HANDOFF.md` § What to publish, item 3). The report's § Shared-file patches is read as "no hand patch; refresh at re-pin".
- R2: a defect in budget's own TSDoc outside the row's named sites. Carrier: budget's follow-on builder unit (Task 7) rewrites `src/core/types.ts:6-7` as `Default: a random UUID.`
- R3: retained. The helper defines a throwing property on an object the calling test constructs inline for that purpose, the `define` verb names the mutation, and every call site constructs its literal on the call line, so no caller-owned value outlives the call. The follow-on unit states the mutation in the helper's TSDoc.
- Observations: carried to the same follow-on unit (the `below` and count sentence at `tests/guides.test.ts:2` and `:37`, the ordinal sentence at `:211-212`, the mirror list in `guides/README.md` § Dependency reference).
- Fix round 2's process note — the round-1 unit removed budget's whole `tmp/` directory rather than its one probe file — stands as a recorded process defect with no recoverable command; the tree was clean and nothing a gate runs depends on that directory.

Ruling: ACCEPT at landing on the deciding gate run.

Terminal: `VERDICT: PASS` (claim 8 settled by the landing's independent run; F3 carried; R2, R3, and the observations carried)
