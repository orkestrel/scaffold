# Audit verdict — U2 policy-plugin, round 1 (2026-09-06)

Lanes run: subjective (`reviewer`, Opus 5), objective (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet), and `verifier` (Sonnet). Every lane the brief named ran; none returned empty. Verifier: `GATES: GREEN` after `npm run build` regenerated `host.json` (`u2-verify-report.md`).

## Per claim

| Claim | Subjective | Objective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 to 9 | PASS | PASS | PASS | closed |
| 10 names | FAIL: `PLACEMENT_RULE` and `reportPlacement` use the family's name for one member; siblings take their message id's noun | PASS | PASS | FAIL, carried: rename to `FUNCTION_RULE` and `reportFunction` |
| 11 flagged claims | FAIL on the suffix match; the stricter `.tsx` edge and the `parent` walk hold | FAIL on the suffix match, with a reproducing path inside the population (`src/server/execution/nested/src/server/execution/thing.ts`) | PASS | FAIL, carried: anchor `isPolicyDomain` to `context.cwd` and compare the registered folder by equality |
| 12 no sweep import | PASS | PASS | PASS | closed; the brief's shared-register sentence has no remaining subject |
| 13 the applied prose | FAIL: pronouns and the ambient sentence attribute sweep proofs to the plugin and deny the code's mechanism | FAIL: the same sentences, plus line 137's "every rule" (three rules carry no ambient guard) | PASS | FAIL, carried: the sentence set in the fix brief |

## Findings outside the claims, each with its ruling

- Objective: `tests/policy.test.ts:343` is named for placement it no longer proves. Carried: rename.
- Objective: the `scripts/read.ts` absence assertion has no evidence its input arrived. Carried: plant a `debugger` statement there and assert its diagnostic beside the absence.
- Objective: `.claude/rules/workspace.md:128`, `.claude/rules/tests.md:53`, and `guides/scaffold.md:1790` still say the sweep proves the placement law. Carried in the fix unit; the U6 draft carries no copy of this finding.
- Objective: the report says `isPolicyAmbient` opens every report function; it opens every moved reporter. Prose in a retained report; recorded here, no carrier.
- Objective referral: whether `POLICY_WIRING_RULES` grows to the plugin's placement rules. Ruled: no. That register names rules that hold at top-level error severity everywhere and may not be overridden; the placement and line-ending rules are population-scoped by law, so their wiring proof is a population reading, consolidated under the next finding.
- Subjective F1: `createPolicyViolation` became a wrapper adding nothing while two sites build the record as literals. Carried: an optional `line` parameter and both sites routed through it.
- Subjective F2: the population parity case re-implements the configuration reading inline. Carried: an exported population reader in `tests/setupPolicy.ts` with its own controls, called by the case.

Dropped: nothing. Every finding has one carrier, the U2-fix brief.

## Routing of the fix round

The writer was the Opus `implementer`, the Orchestrator's engine, and the Sol bench is dark, so the fix is routed to `builder` on Sonnet with every edit prescribed exactly, and its auditor is a clean-context Opus `reviewer` plus the `checker` — an engine that did not write the fix, per the fix-round law.

VERDICT: FAIL 10, 11, 13 — fix round U2-fix dispatched
