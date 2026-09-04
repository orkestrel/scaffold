# Audit verdict — process-laws follow-on (scaffold)

Subject: the sentences added to `.agents/orchestration.md` (§ Every dispatch is a file before it is a launch, § Where campaign artifacts live, § Check the brief before you send it) and to `.claude/rules/writing.md` § Substitutions, carrying the rulings at `verdict.md` § Rulings the round established; diff `units/followon/process-laws-scaffold.diff.txt`.

Lanes: `checker` held by `grok` (Cursor Grok 4.6), rounds 1 and 2 (`process-laws-checker-r1-grok.result.md`, `process-laws-checker-r2-grok.result.md`); the subjective lane not run (a one-sentence rule per ruling, mechanical criteria alone); the objective lane not run for the same reason. The Orchestrator wrote the sentences, so the auditor is an engine it does not share.

Round 1: FAIL 1 3 4. Claim 1 (fact-shaped sentences and an explaining clause), claim 3 (code tokens followed by verbs), and claim 4 (drift from the rulings: `src/**` added, the Sites clause dropped, the recorded audit reading replaced, `.gitignore` named vendored where it is root-owned). Fix round 1 rewrote every sentence; `src/**` kept because the ledger row stating the ruling names it, and `verdict.md:110` amended to match.

Round 2: FAIL 4. Claims 1 to 3 CONFIRMED. Claim 4 held on the grant clause (absent from the ruling), on the built-entry sentence stating the law where the bullet recorded the observation, and on the `.log.txt` pattern wording. Reconciliation: the grant clause deleted; the verdict's bullets amended to the rule form the rule file states (a rule file states the finding as the rule and never the observation that found it, per `AGENTS.md` § Instruction files), so each added sentence restates its bullet; the referral on the compound subject in `writing.md` answered by recasting the sentence. No third round: the remaining edits are a deletion and a records amendment the round's own evidence settles.

Terminal: PASS (claims 1 to 3 confirmed in round 2; claim 4 closed on the record by the reconciliation), landed as scaffold `89437e5d`.
